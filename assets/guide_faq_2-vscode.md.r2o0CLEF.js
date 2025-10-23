import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. VsCode 配置JS代码保存自动格式化","description":"","frontmatter":{},"headers":[],"relativePath":"guide/faq/2-vscode.md","filePath":"guide/faq/2-vscode.md","lastUpdated":1760930002000}'),o={name:"guide/faq/2-vscode.md"},l=e(`<h1 id="_1-vscode-配置js代码保存自动格式化" tabindex="-1">1. VsCode 配置JS代码保存自动格式化 <a class="header-anchor" href="#_1-vscode-配置js代码保存自动格式化" aria-label="Permalink to &quot;1. VsCode 配置JS代码保存自动格式化&quot;">​</a></h1><p><code>Prettier</code> 是一个很有特色的代码格式化工具，它可以使整个代码库的格式化过程自动化。因此在设置好 <code>Prettier</code> 之后，你不再需要与同事讨论代码格式化规则、分号、换行符等问题了。它会导入你所有代码，删除所有格式，并根据其样式规则重新格式化代码</p><ol><li>在扩展工具中安装<code>Prettier</code></li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312080936514.png" alt="image-20231208093605422"></p><ol><li>设置自动保存文件 打开设置，搜索框搜索<code>files.autoSave</code> 我们把设置项属性选择为<code>onFocuschange</code></li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312080936884.png" alt=""></p><ol><li>设置默认代码格式化插件 搜索框搜索<code>editor.defaultFormatter</code>，将配置项选择为<code>Prettier</code></li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312080937463.png" alt="image-20231208093731066"></p><ol><li>设置保存时候，自动格式化</li></ol><p>搜索框搜索<code>editor.formatOnSave</code>，勾选</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312080937648.png" alt="image-20231208093756725"></p><p>可以结合<code>Eslint</code>使得代码更加规范，默认只提供代码风格检测功能，不能开启代码格式化功能</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312080938667.png" alt="image-20231208093816316"></p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>此方法配置，是全局，会把其他覆盖掉(比如有go环境)</p></div><h1 id="_2-korofileheader" tabindex="-1">2. koroFileHeader <a class="header-anchor" href="#_2-korofileheader" aria-label="Permalink to &quot;2. koroFileHeader&quot;">​</a></h1><ul><li>完整案例</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.customMade&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 输出相对路径，类似: /文件夹名称/src/index.js</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;FilePath&quot;: &quot;Do not edit&quot;, // 文件在项目中的相对路径 自动更新</span></span>
<span class="line"><span style="color:#e1e4e8;">  // Author字段是文件的创建者 可以在specialOptions中更改特殊属性</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 公司项目和个人项目可以配置不同的用户名与邮箱 搜索: gitconfig includeIf  比如: https://ayase.moe/2021/03/09/customized-git-config/</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 自动提取当前git config中的: 用户名、邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Author&quot;: &quot;git config user.name&quot;, // 同时获取用户名与邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;Author&quot;: &quot;git config user.name&quot;, // 仅获取用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;Author&quot;: &quot;git config user.email&quot;, // 仅获取邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;Author&quot;: &quot;OBKoro1&quot;, // 写死的固定值 不从git config中获取</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 版本号</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;文件版本&quot;: &quot;V1.0.0&quot;, // 文件版本号</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Date&quot;: &quot;Do not edit&quot;, // 文件创建时间(不变)</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 插件会自动将光标移动到Description选项中 方便输入 Description字段可以在specialOptions更改</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Description&quot;: &quot;&quot;, // 介绍文件的作用、文件的入参、出参。</span></span>
<span class="line"><span style="color:#e1e4e8;">  // custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 可以设置多条自定义信息 设置个性签名、留下QQ、微信联系方式、输入空行等</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;custom_string_obkoro1&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  // LastEditors、LastEditTime、FilePath将会自动更新 如果觉得时间更新的太频繁可以使用throttleTime(默认为1分钟)配置更改更新时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;LastEditors&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 文件最后编辑者 与Author字段一致</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 由于编辑文件就会变更最后编辑时间，多人协作中合并的时候会导致merge</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 可以将时间颗粒度改为周、或者月，这样冲突就减少很多。搜索变更时间格式: dateFormat</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;LastEditTime&quot;: &quot;Do not edit&quot;, // 文件最后编辑时间</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 版权声明 保留文件所有权利 自动替换年份 获取git配置的用户名和邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 版权声明获取git配置, 与Author字段一致: \${git_name} \${git_email} \${git_name_email}</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;custom_string_obkoro1_copyright&quot;: &quot;版权信息         : \${now_year} by \${git_name}, All Rights Reserved.&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  // &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by 写死的公司名/用户名, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">},</span></span>
<span class="line"><span style="color:#e1e4e8;">// 函数注释</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.cursorMode&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;函数功能&quot;: &quot;&quot;, // 函数注释生成之后，光标移动到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;param&quot;: &quot;&quot;, // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;出口参数&quot;: &quot;&quot;, // 返回值</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;函数备注&quot;: &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">},</span></span>
<span class="line"><span style="color:#e1e4e8;">// koroFileHeader插件配置</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.configObj&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;createFileTime&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;language&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // js后缀文件</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;js&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;head&quot;: &quot;/$$&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;middle&quot;: &quot; $ @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;end&quot;: &quot; $/&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      // 函数自定义注释符号：如果有此配置 会默认使用</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;functionSymbol&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;head&quot;: &quot;/******* &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;functionParams&quot;: &quot;typescript&quot; // 函数注释使用ts语言的解析逻辑</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 一次匹配多种文件后缀文件 不用重复设置</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;h/c/hpp/cpp&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;head&quot;: &quot;/*******************************************************************************&quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;middle&quot;: &quot;****&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;end&quot;: &quot;********************************************************************************/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;autoAdd&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;autoAddLine&quot;: 100,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;autoAlready&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;annotationStr&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;head&quot;: &quot;/*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;end&quot;: &quot; */&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;use&quot;: false</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;headInsertLine&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;php&quot;: 2,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sh&quot;: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;beforeAnnotation&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;文件后缀&quot;: &quot;该文件后缀的头部注释之前添加某些内容&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;afterAnnotation&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;文件后缀&quot;: &quot;该文件后缀的头部注释之后添加某些内容&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;specialOptions&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Author&quot;: &quot;作者名称&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;FilePath&quot;: &quot;文件路径&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Date&quot;: &quot;创建日期&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Description&quot;: &quot;简要说明&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;param&quot;: &quot;入口参数:&quot;, // [bug]替换后会出现多余的空格?</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;特殊字段&quot;: &quot;自定义比如LastEditTime/LastEditors&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;switch&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;newlineAddAnnotation&quot;: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;supportAutoLanguage&quot;: [],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;prohibitAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;json&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;folderBlacklist&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;node_modules&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;文件夹禁止自动添加头部注释&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;prohibitItemAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;moveCursor&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;dateFormat&quot;: &quot;YYYY-MM-DD HH:mm:ss&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;atSymbol&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;@&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;@&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;atSymbolObj&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;文件后缀&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;头部注释@符号&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;函数注释@符号&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;colon&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;: &quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;: &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;colonObj&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;文件后缀&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;头部注释冒号&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;函数注释冒号&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;filePathColon&quot;: &quot;路径分隔符替换&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;showErrorMessage&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;writeLog&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;wideSame&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;wideNum&quot;: 13,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;functionWideNum&quot;: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;CheckFileChange&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;createHeader&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;useWorker&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;designAddHead&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;headDesignName&quot;: &quot;random&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;headDesign&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;cursorModeInternalAll&quot;: {},</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;openFunctionParamsCheck&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;functionParamsShape&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;{&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;functionBlankSpaceAll&quot;: {},</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;functionTypeSymbol&quot;: &quot;*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;typeParamOrder&quot;: &quot;param&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;customHasHeadEnd&quot;: {},</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;throttleTime&quot;: 60000,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;functionParamAddStr&quot;: &quot;:&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;NoMatchParams&quot;: &quot;no show param&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 头部注释</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.customMade&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">  // 输出相对路径，类似: /文件夹名称/src/index.js</span></span>
<span class="line"><span style="color:#24292e;">  &quot;FilePath&quot;: &quot;Do not edit&quot;, // 文件在项目中的相对路径 自动更新</span></span>
<span class="line"><span style="color:#24292e;">  // Author字段是文件的创建者 可以在specialOptions中更改特殊属性</span></span>
<span class="line"><span style="color:#24292e;">  // 公司项目和个人项目可以配置不同的用户名与邮箱 搜索: gitconfig includeIf  比如: https://ayase.moe/2021/03/09/customized-git-config/</span></span>
<span class="line"><span style="color:#24292e;">  // 自动提取当前git config中的: 用户名、邮箱</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Author&quot;: &quot;git config user.name&quot;, // 同时获取用户名与邮箱</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;Author&quot;: &quot;git config user.name&quot;, // 仅获取用户名</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;Author&quot;: &quot;git config user.email&quot;, // 仅获取邮箱</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;Author&quot;: &quot;OBKoro1&quot;, // 写死的固定值 不从git config中获取</span></span>
<span class="line"><span style="color:#24292e;">  // 版本号</span></span>
<span class="line"><span style="color:#24292e;">  &quot;文件版本&quot;: &quot;V1.0.0&quot;, // 文件版本号</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Date&quot;: &quot;Do not edit&quot;, // 文件创建时间(不变)</span></span>
<span class="line"><span style="color:#24292e;">  // 插件会自动将光标移动到Description选项中 方便输入 Description字段可以在specialOptions更改</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Description&quot;: &quot;&quot;, // 介绍文件的作用、文件的入参、出参。</span></span>
<span class="line"><span style="color:#24292e;">  // custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息</span></span>
<span class="line"><span style="color:#24292e;">  // 可以设置多条自定义信息 设置个性签名、留下QQ、微信联系方式、输入空行等</span></span>
<span class="line"><span style="color:#24292e;">  &quot;custom_string_obkoro1&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  // LastEditors、LastEditTime、FilePath将会自动更新 如果觉得时间更新的太频繁可以使用throttleTime(默认为1分钟)配置更改更新时间。</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;LastEditors&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 文件最后编辑者 与Author字段一致</span></span>
<span class="line"><span style="color:#24292e;">  // 由于编辑文件就会变更最后编辑时间，多人协作中合并的时候会导致merge</span></span>
<span class="line"><span style="color:#24292e;">  // 可以将时间颗粒度改为周、或者月，这样冲突就减少很多。搜索变更时间格式: dateFormat</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;LastEditTime&quot;: &quot;Do not edit&quot;, // 文件最后编辑时间</span></span>
<span class="line"><span style="color:#24292e;">  // 版权声明 保留文件所有权利 自动替换年份 获取git配置的用户名和邮箱</span></span>
<span class="line"><span style="color:#24292e;">  // 版权声明获取git配置, 与Author字段一致: \${git_name} \${git_email} \${git_name_email}</span></span>
<span class="line"><span style="color:#24292e;">  &quot;custom_string_obkoro1_copyright&quot;: &quot;版权信息         : \${now_year} by \${git_name}, All Rights Reserved.&quot;</span></span>
<span class="line"><span style="color:#24292e;">  // &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by 写死的公司名/用户名, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#24292e;">},</span></span>
<span class="line"><span style="color:#24292e;">// 函数注释</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.cursorMode&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">  &quot;函数功能&quot;: &quot;&quot;, // 函数注释生成之后，光标移动到这里</span></span>
<span class="line"><span style="color:#24292e;">  &quot;param&quot;: &quot;&quot;, // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行</span></span>
<span class="line"><span style="color:#24292e;">  &quot;出口参数&quot;: &quot;&quot;, // 返回值</span></span>
<span class="line"><span style="color:#24292e;">  &quot;函数备注&quot;: &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">},</span></span>
<span class="line"><span style="color:#24292e;">// koroFileHeader插件配置</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.configObj&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">  &quot;createFileTime&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;language&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    // js后缀文件</span></span>
<span class="line"><span style="color:#24292e;">    &quot;js&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;head&quot;: &quot;/$$&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;middle&quot;: &quot; $ @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;end&quot;: &quot; $/&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      // 函数自定义注释符号：如果有此配置 会默认使用</span></span>
<span class="line"><span style="color:#24292e;">      &quot;functionSymbol&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;head&quot;: &quot;/******* &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#24292e;">        &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      &quot;functionParams&quot;: &quot;typescript&quot; // 函数注释使用ts语言的解析逻辑</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    // 一次匹配多种文件后缀文件 不用重复设置</span></span>
<span class="line"><span style="color:#24292e;">    &quot;h/c/hpp/cpp&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;head&quot;: &quot;/*******************************************************************************&quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#24292e;">      &quot;middle&quot;: &quot;****&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;end&quot;: &quot;********************************************************************************/&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;autoAdd&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;autoAddLine&quot;: 100,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;autoAlready&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;annotationStr&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;head&quot;: &quot;/*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;end&quot;: &quot; */&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;use&quot;: false</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;headInsertLine&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;php&quot;: 2,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sh&quot;: 2</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;beforeAnnotation&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;文件后缀&quot;: &quot;该文件后缀的头部注释之前添加某些内容&quot;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;afterAnnotation&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;文件后缀&quot;: &quot;该文件后缀的头部注释之后添加某些内容&quot;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;specialOptions&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Author&quot;: &quot;作者名称&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;FilePath&quot;: &quot;文件路径&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Date&quot;: &quot;创建日期&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Description&quot;: &quot;简要说明&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;param&quot;: &quot;入口参数:&quot;, // [bug]替换后会出现多余的空格?</span></span>
<span class="line"><span style="color:#24292e;">    &quot;特殊字段&quot;: &quot;自定义比如LastEditTime/LastEditors&quot;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;switch&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;newlineAddAnnotation&quot;: true</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;supportAutoLanguage&quot;: [],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;prohibitAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;json&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;folderBlacklist&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;node_modules&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;文件夹禁止自动添加头部注释&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;prohibitItemAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;moveCursor&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;dateFormat&quot;: &quot;YYYY-MM-DD HH:mm:ss&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;atSymbol&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;@&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;@&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;atSymbolObj&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;文件后缀&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">      &quot;头部注释@符号&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;函数注释@符号&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;colon&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;: &quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;: &quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;colonObj&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;文件后缀&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">      &quot;头部注释冒号&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;函数注释冒号&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;filePathColon&quot;: &quot;路径分隔符替换&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;showErrorMessage&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;writeLog&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;wideSame&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;wideNum&quot;: 13,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;functionWideNum&quot;: 0,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;CheckFileChange&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;createHeader&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;useWorker&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;designAddHead&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;headDesignName&quot;: &quot;random&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;headDesign&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;cursorModeInternalAll&quot;: {},</span></span>
<span class="line"><span style="color:#24292e;">  &quot;openFunctionParamsCheck&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;functionParamsShape&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;{&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;}&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;functionBlankSpaceAll&quot;: {},</span></span>
<span class="line"><span style="color:#24292e;">  &quot;functionTypeSymbol&quot;: &quot;*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;typeParamOrder&quot;: &quot;param&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;customHasHeadEnd&quot;: {},</span></span>
<span class="line"><span style="color:#24292e;">  &quot;throttleTime&quot;: 60000,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;functionParamAddStr&quot;: &quot;:&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;NoMatchParams&quot;: &quot;no show param&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.customMade&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // Author字段是文件的创建者 可以在specialOptions中更改特殊属性</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 公司项目和个人项目可以配置不同的用户名与邮箱 搜索: gitconfig includeIf  比如: https://ayase.moe/2021/03/09/customized-git-config/</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 自动提取当前git config中的: 用户名、邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Author&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 同时获取用户名与邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;Author&quot;: &quot;git config user.name&quot;, // 仅获取用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;Author&quot;: &quot;git config user.email&quot;, // 仅获取邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;Author&quot;: &quot;OBKoro1&quot;, // 写死的固定值 不从git config中获取</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Date&quot;: &quot;Do not edit&quot;, // 文件创建时间(不变)</span></span>
<span class="line"><span style="color:#e1e4e8;">    // LastEditors、LastEditTime、FilePath将会自动更新 如果觉得时间更新的太频繁可以使用throttleTime(默认为1分钟)配置更改更新时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;LastEditors&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 文件最后编辑者 与Author字段一致</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 由于编辑文件就会变更最后编辑时间，多人协作中合并的时候会导致merge</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 可以将时间颗粒度改为周、或者月，这样冲突就减少很多。搜索变更时间格式: dateFormat</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;LastEditTime&quot;: &quot;Do not edit&quot;, // 文件最后编辑时间</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 输出相对路径，类似: /文件夹名称/src/index.js</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;FilePath&quot;: &quot;Do not edit&quot;, // 文件在项目中的相对路径 自动更新</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 插件会自动将光标移动到Description选项中 方便输入 Description字段可以在specialOptions更改</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Description&quot;: &quot;&quot;, // 介绍文件的作用、文件的入参、出参。</span></span>
<span class="line"><span style="color:#e1e4e8;">    // custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 可以设置多条自定义信息 设置个性签名、留下QQ、微信联系方式、输入空行等</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;custom_string_obkoro1&quot;: &quot;&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    // 版权声明 保留文件所有权利 自动替换年份 获取git配置的用户名和邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 版权声明获取git配置, 与Author字段一致: \${git_name} \${git_email} \${git_name_email}</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by \${git_name_email}, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by 写死的公司名/用户名, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">},</span></span>
<span class="line"><span style="color:#e1e4e8;">// 函数注释</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.cursorMode&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;description&quot;: &quot;&quot;, // 函数注释生成之后，光标移动到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;param&quot;: &quot;&quot;, // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;return&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">},</span></span>
<span class="line"><span style="color:#e1e4e8;">// 插件配置项</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;fileheader.configObj&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;autoAdd&quot;: true, // 检测文件没有头部注释，自动添加文件头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;autoAddLine&quot;: 100, // 文件超过多少行数 不再自动添加头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;autoAlready&quot;: true, // 只添加插件支持的语言以及用户通过\`language\`选项自定义的注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;supportAutoLanguage&quot;: [], // 设置之后，在数组内的文件才支持自动添加</span></span>
<span class="line"><span style="color:#e1e4e8;">   // 自动添加头部注释黑名单</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;prohibitAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;json&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;prohibitItemAutoAdd&quot;: [ &quot;项目的全称禁止项目自动添加头部注释, 使用快捷键自行添加&quot; ],</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;folderBlacklist&quot;: [ &quot;node_modules&quot; ], // 文件夹或文件名禁止自动添加头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;wideSame&quot;: false, // 头部注释等宽设置</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;wideNum&quot;: 13,  // 头部注释字段长度 默认为13</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;functionWideNum&quot;: 0, // 函数注释等宽设置 设为0 即为关闭</span></span>
<span class="line"><span style="color:#e1e4e8;">   // 头部注释第几行插入</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;headInsertLine&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;php&quot;: 2 // php文件 插入到第二行</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;beforeAnnotation&quot;: {}, // 头部注释之前插入内容</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;afterAnnotation&quot;: {}, // 头部注释之后插入内容</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;specialOptions&quot;: {}, // 特殊字段自定义 比如: Author、LastEditTime、LastEditors、FilePath、Description、Date等</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;switch&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;newlineAddAnnotation&quot;: true // 默认遇到换行符(\\r\\n \\n \\r)添加注释符号</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;moveCursor&quot;: true, // 自动移动光标到Description所在行</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;dateFormat&quot;: &quot;YYYY-MM-DD HH:mm:ss&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;atSymbol&quot;: [&quot;@&quot;, &quot;@&quot;], // 更改所有文件的自定义注释中的@符号</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;atSymbolObj&quot;: {}, //  更改单独语言/文件的@</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;colon&quot;: [&quot;: &quot;, &quot;: &quot;], // 更改所有文件的注释冒号</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;colonObj&quot;: {}, //  更改单独语言/文件的冒号</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;filePathColon&quot;: &quot;路径分隔符替换&quot;, // 默认值： mac: / window是: \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;showErrorMessage&quot;: false, // 是否显示插件错误通知 用于debugger</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;writeLog&quot;: false, // 错误日志生成</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;CheckFileChange&quot;: false, // 单个文件保存时进行diff检查</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;createHeader&quot;: false, // 新建文件自动添加头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;useWorker&quot;: false, // 是否使用工作区设置</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;designAddHead&quot;: false, // 添加注释图案时添加头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;headDesignName&quot;: &quot;random&quot;, // 图案注释使用哪个图案 </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;headDesign&quot;: false, // 是否使用图案注释替换头部注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 自定义配置是否在函数内生成注释 不同文件类型和语言类型</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;cursorModeInternalAll&quot;: {}, // 默认为false 在函数外生成函数注释</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;openFunctionParamsCheck&quot;: true, // 开启关闭自动提取添加函数参数</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;functionParamsShape&quot;: [&quot;{&quot;, &quot;}&quot;], // 函数参数外形自定义 </span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;functionParamsShape&quot;: &quot;no type&quot; 函数参数不需要类型</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;functionBlankSpaceAll&quot;: {}, // 函数注释空格缩进 默认为空对象 默认值为0 不缩进</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;functionTypeSymbol&quot;: &quot;*&quot;, // 参数没有类型时的默认值</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;typeParamOrder&quot;: &quot;type param&quot;, // 参数类型 和 参数的位置自定义</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;NoMatchParams&quot;: &quot;no show param&quot;, // 没匹配到函数参数，是否显示@param与@return这两行 默认不显示param</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;functionParamAddStr&quot;: &quot;&quot;, // 在 type param 后面增加字符串 可能是冒号，方便输入参数描述</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 自定义语言注释，自定义取消 head、end 部分</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 不设置自定义配置language无效 默认都有head、end</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;customHasHeadEnd&quot;: {}, // &quot;cancel head and function&quot; | &quot;cancel head&quot; | &quot;cancel function&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;throttleTime&quot;: 60000, // 对同一个文件 需要过1分钟再次修改文件并保存才会更新注释</span></span>
<span class="line"><span style="color:#e1e4e8;">     // 自定义语言注释符号，覆盖插件的注释格式</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;language&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // js后缀文件</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;js&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;head&quot;: &quot;/$$&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;middle&quot;: &quot; $ @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;end&quot;: &quot; $/&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 函数自定义注释符号：如果有此配置 会默认使用</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;functionSymbol&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">              &quot;head&quot;: &quot;/******* &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#e1e4e8;">              &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">              &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            },</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;functionParams&quot;: &quot;typescript&quot; // 函数注释使用ts语言的解析逻辑</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">       // 一次匹配多种文件后缀文件 不用重复设置</span></span>
<span class="line"><span style="color:#e1e4e8;">       &quot;h/hpp/cpp&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;head&quot;: &quot;/*** &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 针对有特殊要求的文件如：test.blade.php</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;blade.php&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;head&quot;: &quot;&lt;!--&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;end&quot;: &quot;--&gt;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;"> // 默认注释  没有匹配到注释符号的时候使用。</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;annotationStr&quot;: { </span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;head&quot;: &quot;/*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;end&quot;: &quot; */&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;use&quot;: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">// 头部注释</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.customMade&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    // Author字段是文件的创建者 可以在specialOptions中更改特殊属性</span></span>
<span class="line"><span style="color:#24292e;">    // 公司项目和个人项目可以配置不同的用户名与邮箱 搜索: gitconfig includeIf  比如: https://ayase.moe/2021/03/09/customized-git-config/</span></span>
<span class="line"><span style="color:#24292e;">    // 自动提取当前git config中的: 用户名、邮箱</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Author&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 同时获取用户名与邮箱</span></span>
<span class="line"><span style="color:#24292e;">    // &quot;Author&quot;: &quot;git config user.name&quot;, // 仅获取用户名</span></span>
<span class="line"><span style="color:#24292e;">    // &quot;Author&quot;: &quot;git config user.email&quot;, // 仅获取邮箱</span></span>
<span class="line"><span style="color:#24292e;">    // &quot;Author&quot;: &quot;OBKoro1&quot;, // 写死的固定值 不从git config中获取</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Date&quot;: &quot;Do not edit&quot;, // 文件创建时间(不变)</span></span>
<span class="line"><span style="color:#24292e;">    // LastEditors、LastEditTime、FilePath将会自动更新 如果觉得时间更新的太频繁可以使用throttleTime(默认为1分钟)配置更改更新时间。</span></span>
<span class="line"><span style="color:#24292e;">    &quot;LastEditors&quot;: &quot;git config user.name &amp;&amp; git config user.email&quot;, // 文件最后编辑者 与Author字段一致</span></span>
<span class="line"><span style="color:#24292e;">    // 由于编辑文件就会变更最后编辑时间，多人协作中合并的时候会导致merge</span></span>
<span class="line"><span style="color:#24292e;">    // 可以将时间颗粒度改为周、或者月，这样冲突就减少很多。搜索变更时间格式: dateFormat</span></span>
<span class="line"><span style="color:#24292e;">    &quot;LastEditTime&quot;: &quot;Do not edit&quot;, // 文件最后编辑时间</span></span>
<span class="line"><span style="color:#24292e;">    // 输出相对路径，类似: /文件夹名称/src/index.js</span></span>
<span class="line"><span style="color:#24292e;">    &quot;FilePath&quot;: &quot;Do not edit&quot;, // 文件在项目中的相对路径 自动更新</span></span>
<span class="line"><span style="color:#24292e;">    // 插件会自动将光标移动到Description选项中 方便输入 Description字段可以在specialOptions更改</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Description&quot;: &quot;&quot;, // 介绍文件的作用、文件的入参、出参。</span></span>
<span class="line"><span style="color:#24292e;">    // custom_string_obkoro1~custom_string_obkoro100都可以输出自定义信息</span></span>
<span class="line"><span style="color:#24292e;">    // 可以设置多条自定义信息 设置个性签名、留下QQ、微信联系方式、输入空行等</span></span>
<span class="line"><span style="color:#24292e;">    &quot;custom_string_obkoro1&quot;: &quot;&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    // 版权声明 保留文件所有权利 自动替换年份 获取git配置的用户名和邮箱</span></span>
<span class="line"><span style="color:#24292e;">    // 版权声明获取git配置, 与Author字段一致: \${git_name} \${git_email} \${git_name_email}</span></span>
<span class="line"><span style="color:#24292e;">    &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by \${git_name_email}, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#24292e;">    // &quot;custom_string_obkoro1_copyright&quot;: &quot;Copyright (c) \${now_year} by 写死的公司名/用户名, All Rights Reserved. &quot;</span></span>
<span class="line"><span style="color:#24292e;">},</span></span>
<span class="line"><span style="color:#24292e;">// 函数注释</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.cursorMode&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;description&quot;: &quot;&quot;, // 函数注释生成之后，光标移动到这里</span></span>
<span class="line"><span style="color:#24292e;">    &quot;param&quot;: &quot;&quot;, // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行</span></span>
<span class="line"><span style="color:#24292e;">    &quot;return&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">},</span></span>
<span class="line"><span style="color:#24292e;">// 插件配置项</span></span>
<span class="line"><span style="color:#24292e;">&quot;fileheader.configObj&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;autoAdd&quot;: true, // 检测文件没有头部注释，自动添加文件头部注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;autoAddLine&quot;: 100, // 文件超过多少行数 不再自动添加头部注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;autoAlready&quot;: true, // 只添加插件支持的语言以及用户通过\`language\`选项自定义的注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;supportAutoLanguage&quot;: [], // 设置之后，在数组内的文件才支持自动添加</span></span>
<span class="line"><span style="color:#24292e;">   // 自动添加头部注释黑名单</span></span>
<span class="line"><span style="color:#24292e;">   &quot;prohibitAutoAdd&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">      &quot;json&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">   &quot;prohibitItemAutoAdd&quot;: [ &quot;项目的全称禁止项目自动添加头部注释, 使用快捷键自行添加&quot; ],</span></span>
<span class="line"><span style="color:#24292e;">   &quot;folderBlacklist&quot;: [ &quot;node_modules&quot; ], // 文件夹或文件名禁止自动添加头部注释</span></span>
<span class="line"><span style="color:#24292e;">   &quot;wideSame&quot;: false, // 头部注释等宽设置</span></span>
<span class="line"><span style="color:#24292e;">   &quot;wideNum&quot;: 13,  // 头部注释字段长度 默认为13</span></span>
<span class="line"><span style="color:#24292e;">    &quot;functionWideNum&quot;: 0, // 函数注释等宽设置 设为0 即为关闭</span></span>
<span class="line"><span style="color:#24292e;">   // 头部注释第几行插入</span></span>
<span class="line"><span style="color:#24292e;">    &quot;headInsertLine&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;php&quot;: 2 // php文件 插入到第二行</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;beforeAnnotation&quot;: {}, // 头部注释之前插入内容</span></span>
<span class="line"><span style="color:#24292e;">    &quot;afterAnnotation&quot;: {}, // 头部注释之后插入内容</span></span>
<span class="line"><span style="color:#24292e;">    &quot;specialOptions&quot;: {}, // 特殊字段自定义 比如: Author、LastEditTime、LastEditors、FilePath、Description、Date等</span></span>
<span class="line"><span style="color:#24292e;">    &quot;switch&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;newlineAddAnnotation&quot;: true // 默认遇到换行符(\\r\\n \\n \\r)添加注释符号</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;moveCursor&quot;: true, // 自动移动光标到Description所在行</span></span>
<span class="line"><span style="color:#24292e;">    &quot;dateFormat&quot;: &quot;YYYY-MM-DD HH:mm:ss&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;atSymbol&quot;: [&quot;@&quot;, &quot;@&quot;], // 更改所有文件的自定义注释中的@符号</span></span>
<span class="line"><span style="color:#24292e;">    &quot;atSymbolObj&quot;: {}, //  更改单独语言/文件的@</span></span>
<span class="line"><span style="color:#24292e;">    &quot;colon&quot;: [&quot;: &quot;, &quot;: &quot;], // 更改所有文件的注释冒号</span></span>
<span class="line"><span style="color:#24292e;">    &quot;colonObj&quot;: {}, //  更改单独语言/文件的冒号</span></span>
<span class="line"><span style="color:#24292e;">    &quot;filePathColon&quot;: &quot;路径分隔符替换&quot;, // 默认值： mac: / window是: \\</span></span>
<span class="line"><span style="color:#24292e;">    &quot;showErrorMessage&quot;: false, // 是否显示插件错误通知 用于debugger</span></span>
<span class="line"><span style="color:#24292e;">    &quot;writeLog&quot;: false, // 错误日志生成</span></span>
<span class="line"><span style="color:#24292e;">    &quot;CheckFileChange&quot;: false, // 单个文件保存时进行diff检查</span></span>
<span class="line"><span style="color:#24292e;">    &quot;createHeader&quot;: false, // 新建文件自动添加头部注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;useWorker&quot;: false, // 是否使用工作区设置</span></span>
<span class="line"><span style="color:#24292e;">    &quot;designAddHead&quot;: false, // 添加注释图案时添加头部注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;headDesignName&quot;: &quot;random&quot;, // 图案注释使用哪个图案 </span></span>
<span class="line"><span style="color:#24292e;">    &quot;headDesign&quot;: false, // 是否使用图案注释替换头部注释</span></span>
<span class="line"><span style="color:#24292e;">    // 自定义配置是否在函数内生成注释 不同文件类型和语言类型</span></span>
<span class="line"><span style="color:#24292e;">    &quot;cursorModeInternalAll&quot;: {}, // 默认为false 在函数外生成函数注释</span></span>
<span class="line"><span style="color:#24292e;">    &quot;openFunctionParamsCheck&quot;: true, // 开启关闭自动提取添加函数参数</span></span>
<span class="line"><span style="color:#24292e;">    &quot;functionParamsShape&quot;: [&quot;{&quot;, &quot;}&quot;], // 函数参数外形自定义 </span></span>
<span class="line"><span style="color:#24292e;">    // &quot;functionParamsShape&quot;: &quot;no type&quot; 函数参数不需要类型</span></span>
<span class="line"><span style="color:#24292e;">    &quot;functionBlankSpaceAll&quot;: {}, // 函数注释空格缩进 默认为空对象 默认值为0 不缩进</span></span>
<span class="line"><span style="color:#24292e;">    &quot;functionTypeSymbol&quot;: &quot;*&quot;, // 参数没有类型时的默认值</span></span>
<span class="line"><span style="color:#24292e;">    &quot;typeParamOrder&quot;: &quot;type param&quot;, // 参数类型 和 参数的位置自定义</span></span>
<span class="line"><span style="color:#24292e;">    &quot;NoMatchParams&quot;: &quot;no show param&quot;, // 没匹配到函数参数，是否显示@param与@return这两行 默认不显示param</span></span>
<span class="line"><span style="color:#24292e;">    &quot;functionParamAddStr&quot;: &quot;&quot;, // 在 type param 后面增加字符串 可能是冒号，方便输入参数描述</span></span>
<span class="line"><span style="color:#24292e;">    // 自定义语言注释，自定义取消 head、end 部分</span></span>
<span class="line"><span style="color:#24292e;">    // 不设置自定义配置language无效 默认都有head、end</span></span>
<span class="line"><span style="color:#24292e;">    &quot;customHasHeadEnd&quot;: {}, // &quot;cancel head and function&quot; | &quot;cancel head&quot; | &quot;cancel function&quot; </span></span>
<span class="line"><span style="color:#24292e;">    &quot;throttleTime&quot;: 60000, // 对同一个文件 需要过1分钟再次修改文件并保存才会更新注释</span></span>
<span class="line"><span style="color:#24292e;">     // 自定义语言注释符号，覆盖插件的注释格式</span></span>
<span class="line"><span style="color:#24292e;">    &quot;language&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        // js后缀文件</span></span>
<span class="line"><span style="color:#24292e;">        &quot;js&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;head&quot;: &quot;/$$&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;middle&quot;: &quot; $ @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;end&quot;: &quot; $/&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            // 函数自定义注释符号：如果有此配置 会默认使用</span></span>
<span class="line"><span style="color:#24292e;">            &quot;functionSymbol&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">              &quot;head&quot;: &quot;/******* &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#24292e;">              &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">              &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#24292e;">            },</span></span>
<span class="line"><span style="color:#24292e;">            &quot;functionParams&quot;: &quot;typescript&quot; // 函数注释使用ts语言的解析逻辑</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">       // 一次匹配多种文件后缀文件 不用重复设置</span></span>
<span class="line"><span style="color:#24292e;">       &quot;h/hpp/cpp&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">          &quot;head&quot;: &quot;/*** &quot;, // 统一增加几个*号</span></span>
<span class="line"><span style="color:#24292e;">          &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;end&quot;: &quot; */&quot;</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        // 针对有特殊要求的文件如：test.blade.php</span></span>
<span class="line"><span style="color:#24292e;">        &quot;blade.php&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">          &quot;head&quot;: &quot;&lt;!--&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;end&quot;: &quot;--&gt;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;"> // 默认注释  没有匹配到注释符号的时候使用。</span></span>
<span class="line"><span style="color:#24292e;"> &quot;annotationStr&quot;: { </span></span>
<span class="line"><span style="color:#24292e;">      &quot;head&quot;: &quot;/*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;middle&quot;: &quot; * @&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;end&quot;: &quot; */&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;use&quot;: false</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_3-vue插件" tabindex="-1">3. vue插件 <a class="header-anchor" href="#_3-vue插件" aria-label="Permalink to &quot;3. vue插件&quot;">​</a></h1><ul><li><p>Volar</p></li><li><p>Vue VSCode Snippets</p></li><li><p>Auto Close Tag</p></li><li><p>Vue Peek</p></li><li><p>Vite</p></li></ul><p><a href="https://juejin.cn/post/7129853180803973150#heading-0" target="_blank" rel="noreferrer">https://juejin.cn/post/7129853180803973150#heading-0</a></p><h1 id="_4-设置滚轮控制字体大小" tabindex="-1">4. 设置滚轮控制字体大小 <a class="header-anchor" href="#_4-设置滚轮控制字体大小" aria-label="Permalink to &quot;4. 设置滚轮控制字体大小&quot;">​</a></h1><ol><li>打开首选项</li><li>进入设置</li><li>搜索zoom</li><li>给滚轮缩放字体选项打上钩</li><li>完成</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404281758686.png" alt="image-20240428175801065"></p><h1 id="_5-快捷键" tabindex="-1">5. 快捷键 <a class="header-anchor" href="#_5-快捷键" aria-label="Permalink to &quot;5. 快捷键&quot;">​</a></h1><ul><li>用Ctrl + K删除行</li><li>用Ctrl + W关闭文件</li><li>用Ctrl + K, W关闭所有文件</li><li>用Alt + 上/下箭头上下移动行</li><li>用Ctrl + C复制整行,无需选中</li></ul><h1 id="_6-hadolint" tabindex="-1">6. hadolint <a class="header-anchor" href="#_6-hadolint" aria-label="Permalink to &quot;6. hadolint&quot;">​</a></h1><p>Dockerfile的代码规范检查工具hadolint</p><h1 id="_7-ai" tabindex="-1">7. ai <a class="header-anchor" href="#_7-ai" aria-label="Permalink to &quot;7. ai&quot;">​</a></h1><h2 id="_7-1-cline" tabindex="-1">7.1 Cline <a class="header-anchor" href="#_7-1-cline" aria-label="Permalink to &quot;7.1 Cline&quot;">​</a></h2><p><a href="https://github.com/cline/cline" target="_blank" rel="noreferrer">https://github.com/cline/cline</a></p><p>claude ai 插件，支持多模型</p><h2 id="_7-2-continue" tabindex="-1">7.2 Continue <a class="header-anchor" href="#_7-2-continue" aria-label="Permalink to &quot;7.2 Continue&quot;">​</a></h2><p>用作代码补全</p><h2 id="_7-3-fitten" tabindex="-1">7.3 Fitten <a class="header-anchor" href="#_7-3-fitten" aria-label="Permalink to &quot;7.3 Fitten&quot;">​</a></h2><p><a href="https://code.fittentech.com/" target="_blank" rel="noreferrer">https://code.fittentech.com/</a></p><p>代码补全挺不错的，反应速度快</p><h1 id="_8-主题" tabindex="-1">8.主题 <a class="header-anchor" href="#_8-主题" aria-label="Permalink to &quot;8.主题&quot;">​</a></h1><p>Hiberbee <a href="https://plugins.jetbrains.com/plugin/12118-hiberbee-theme" target="_blank" rel="noreferrer">Theme</a></p><h1 id="_9-settings" tabindex="-1">9. settings <a class="header-anchor" href="#_9-settings" aria-label="Permalink to &quot;9. settings&quot;">​</a></h1><p>如何找到和编辑 <code>settings.json</code>:</p><ol><li><p><strong>打开Cursor:</strong></p><p>启动Cursor 编辑器。</p></li><li><p><strong>打开命令面板:</strong></p><p>使用快捷键 <code>Ctrl + Shift + P</code> (Windows/Linux) 或 <code>Cmd + Shift + P</code> (Mac)。</p></li><li><p><strong>搜索并选择:</strong></p><p>输入&quot;Preferences: Open User Settings (JSON)&quot;，然后选择该选项。</p></li><li><p>编辑:这会打开 <code>settings.json</code> 文件，你可以在其中修改各种配置选项。</p></li></ol><h1 id="_10-oxlint-oxfmt" tabindex="-1">10. oxlint + oxfmt <a class="header-anchor" href="#_10-oxlint-oxfmt" aria-label="Permalink to &quot;10. oxlint + oxfmt&quot;">​</a></h1><p>继 <strong>oxlint</strong>（基于 Rust 的高性能 Lint 工具）之后，尤雨溪在昨天宣布，新的代码格式化工具 <strong>oxfmt</strong> 即将发布，目标是成为 Prettier 的替代方案。</p><p>Oxc 提供了 VCode 插件供开发者使用：下载官方<a href="https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Doxc.oxc-vscode" target="_blank" rel="noreferrer">VSCode 扩展</a>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pnpm add -D oxlint</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pnpm add -D oxlint</span></span></code></pre></div><h4 id="_3-1-eslint-plugin-oxlint" tabindex="-1">3.1 eslint-plugin-oxlint <a class="header-anchor" href="#_3-1-eslint-plugin-oxlint" aria-label="Permalink to &quot;3.1 eslint-plugin-oxlint&quot;">​</a></h4><p>借助 <a href="https://github.com/oxc-project/eslint-plugin-oxlint" target="_blank" rel="noreferrer">eslint-plugin-oxlint</a>，可以关闭 ESLint 中 Oxlint 已经支持的规则，这样可以在 ESLint 项目中结合 Oxlint 来进行代码 Lint，提高速度。</p><h4 id="_3-2-lint-staged" tabindex="-1">3.2 lint-staged <a class="header-anchor" href="#_3-2-lint-staged" aria-label="Permalink to &quot;3.2 lint-staged&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">json</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;lint-staged&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue,astro,svelte}&quot;: &quot;oxlint&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">json</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;lint-staged&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue,astro,svelte}&quot;: &quot;oxlint&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="_3-3-vscode-插件" tabindex="-1">3.3 VSCode 插件 <a class="header-anchor" href="#_3-3-vscode-插件" aria-label="Permalink to &quot;3.3 VSCode 插件&quot;">​</a></h4><p><a href="https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode" target="_blank" rel="noreferrer">Visual Studio Marketplace</a></p><h4 id="_3-4-vite-插件" tabindex="-1">3.4 Vite 插件 <a class="header-anchor" href="#_3-4-vite-插件" aria-label="Permalink to &quot;3.4 Vite 插件&quot;">​</a></h4><p><a href="https://github.com/52-entertainment/vite-plugin-oxlint" target="_blank" rel="noreferrer">https://github.com/52-entertainment/vite-plugin-oxlint</a></p>`,54),t=[l];function p(c,u,i,r,q,y){return n(),a("div",null,t)}const m=s(o,[["render",p]]);export{h as __pageData,m as default};
