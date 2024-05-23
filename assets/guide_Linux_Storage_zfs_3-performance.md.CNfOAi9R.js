import{_ as s,c as a,o as n,R as l}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Storage/zfs/3-performance.md","filePath":"guide/Linux/Storage/zfs/3-performance.md","lastUpdated":1712053412000}'),p={name:"guide/Linux/Storage/zfs/3-performance.md"},o=l(`<h3 id="_1-禁用-atime文件访问时间" tabindex="-1">1.禁用 atime文件访问时间 <a class="header-anchor" href="#_1-禁用-atime文件访问时间" aria-label="Permalink to &quot;1.禁用 atime文件访问时间&quot;">​</a></h3><p>默认配置下，ZFS 会记录文件的最后访问时间。现实中，这个功能其实并不是很有用，但会导致大量写入并降低性能。如果你不需要知道文件访问时间，并不用任何依赖这个属性的程序的话（最常见的例子是一些邮件程序依赖 atime 来确定邮件是不是已读），我们可以关闭 atime 记录以降低磁盘写入压力</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#关闭整个存储池的访问时间记录</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">atime=off</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#关闭整个存储池的访问时间记录</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">atime=off</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="_2-启用-trim" tabindex="-1">2.启用 TRIM <a class="header-anchor" href="#_2-启用-trim" aria-label="Permalink to &quot;2.启用 TRIM&quot;">​</a></h3><p>SSD 需要时不时的 <a href="https://zh.wikipedia.org/zh-cn/Trim%E5%91%BD%E4%BB%A4" target="_blank" rel="noreferrer">TRIM</a> 来保证最佳性能与寿命</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">autotrim=on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#手动触发</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">trim</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">autotrim=on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#手动触发</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">trim</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="_3-ssd-缓存" tabindex="-1">3.SSD 缓存 <a class="header-anchor" href="#_3-ssd-缓存" aria-label="Permalink to &quot;3.SSD 缓存&quot;">​</a></h3><p>除了常规的存储 VDEV （比如 RAIDz 和 mirror）以外，ZFS 还支持一些不能当作存储空间用的特殊 VDEV：</p><ul><li><strong>cache</strong>: 也称 <strong>L2ARC</strong> ，ZFS 的高速读缓存 <ul><li>注意！ZFS 已经会用内存作为缓存了（叫 <strong>ARC</strong> ，这就是为什么 cache 叫 L2ARC，即 Level 2 ARC，二级 ARC）</li><li>因此，如果你的常用数据没那么大的话，添加这种缓存 可能完全不会提升性能</li></ul></li><li><strong>log</strong>: 也称 <strong>slog</strong> ，ZFS 的写缓存，加速 <strong>同步</strong> 写入 <ul><li>注意！slog 只影响同步写入，异步写入（比如拷贝文件）是不受影响的。一般只有非常关键的数据会要求同步写入（例如数据库程序）</li><li>因此，如果你的工况不涉及同步写入的话，添加此种缓存也 可能完全不会提升性能</li></ul></li><li><strong>special</strong>: 用来在高速盘上储存一些 ZFS 内部数据的 VDEV，不常用</li></ul><p>如果你有一块比已有存储盘快的盘（大多数情况下，SSD）且你的工况满足以上描述的话，你可以用它加速已有的存储池：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 添加一块 l2arc 盘。无需冗余，缓存离线的话 ZFS 会直接跳过 l2arc 读取阵列中的数据</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cache</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">volum</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 单写入缓存，不安全，如果缓存离线则会丢失还未写回的数据</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">volum</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 镜像写入缓存，推荐，需要两块或更多存储盘</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mirror</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">volume</span><span style="color:#E1E4E8;">s</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加一块 l2arc 盘。无需冗余，缓存离线的话 ZFS 会直接跳过 l2arc 读取阵列中的数据</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cache</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">volum</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 单写入缓存，不安全，如果缓存离线则会丢失还未写回的数据</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">volum</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 镜像写入缓存，推荐，需要两块或更多存储盘</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mirror</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">volume</span><span style="color:#24292E;">s</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="_4-升级存储池功能" tabindex="-1">4.升级存储池功能 <a class="header-anchor" href="#_4-升级存储池功能" aria-label="Permalink to &quot;4.升级存储池功能&quot;">​</a></h3><p>OpenZFS 的开发者们会时不时搞一些 exiting 的新功能出来。例如使用 <a href="https://github.com/facebook/zstd" target="_blank" rel="noreferrer">Zstd</a> 用作透明压缩算法就是通过添加 <code>zstd_compress</code> 存储池功能引入的。如果你是在新功能引入前就创建了存储池，最简单的方式就是通过升级存储池来启用所有新功能</p><blockquote><p>如果你同时使用几个不同的 OpenZFS 版本的话（比如在不同的操作系统上用同一个存储池），启用新功能可能会导致不兼容（比如在旧版本的 OpenZFS 上只能以只读挂载存储池）</p></blockquote><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Show features that can be enabled</span></span>
<span class="line"><span style="color:#6A737D;"># 显示可以开启的存储池功能</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">upgrade</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enable all new features for a specific pool</span></span>
<span class="line"><span style="color:#6A737D;"># 针对一个存储池开启所有可用功能</span></span>
<span class="line"><span style="color:#B392F0;">zpool</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">upgrade</span><span style="color:#E1E4E8;"> $POOL_NAME</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Show features that can be enabled</span></span>
<span class="line"><span style="color:#6A737D;"># 显示可以开启的存储池功能</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">upgrade</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enable all new features for a specific pool</span></span>
<span class="line"><span style="color:#6A737D;"># 针对一个存储池开启所有可用功能</span></span>
<span class="line"><span style="color:#6F42C1;">zpool</span><span style="color:#24292E;"> </span><span style="color:#032F62;">upgrade</span><span style="color:#24292E;"> $POOL_NAME</span></span></code></pre></div><h3 id="_5-使用数据集" tabindex="-1">5.使用数据集 <a class="header-anchor" href="#_5-使用数据集" aria-label="Permalink to &quot;5.使用数据集&quot;">​</a></h3><p>ZFS 有很多配置选项。我们可以根据工况调整 ZFS 以达成最佳性能表现。例如，在其他工况（比如 NAS）下很有用的内存缓存在数据库工况下就只能帮倒忙，因为现代数据库都自带了更智能内存缓存，因此这种情况下我们一般会关掉 ZFS 的缓存。但如果一个存储池需要承载不同种类的任务，因此需要截然相反的优化的话，事情就会变得棘手起来。ZFS 的解决方法是数据集（ <code>datasets</code> ），我们可以把不同任务放在不同的数据集上然后只调整这些数据集的选项，而不是整个存储池。</p><p>更棒的是，对于操作系统来说，数据集表现的就像一个独立的文件系统，所以我们可以将它们挂载到任意位置上。我们也可以对数据集打快照，并可以将快照作为一个只读文件系统挂载。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 创建数据集：</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">dataset_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建嵌套数据集，子数据集会遵循上一级的设置：</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> [-p] </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">pool_name</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">dataset_name</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">dataset_name</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示所有存储池，数据集和快照：</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 创建数据集：</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">dataset_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建嵌套数据集，子数据集会遵循上一级的设置：</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> [-p] </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">pool_name</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">dataset_name</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">dataset_name</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示所有存储池，数据集和快照：</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span></span></code></pre></div><h3 id="_6-透明压缩" tabindex="-1">6.透明压缩 <a class="header-anchor" href="#_6-透明压缩" aria-label="Permalink to &quot;6.透明压缩&quot;">​</a></h3><p>ZFS 支持自动压缩所有写入的数据。这样做不仅可以节省空间，在数据压缩高的场合甚至还可能提升存储池的吞吐量和降低 IO 负载（因为实际需要写入和读取的数据量降低了）。</p><p>目前 ZFS 支持 <code>lz4</code> （默认）， <code>gzip</code> 和 <code>zstd</code> 压缩算法。一般情况下，除非存储池中的数据已经被压缩过了（比如已压缩的视频和图片），开启 <code>lz4</code> 几乎不会错。 <code>lz4</code> 的 CPU 占用极低（相对的，压缩比相比 <code>gzip</code> 和 <code>zstd</code> 差）且对文字类工况有良好的压缩表现。而且 <code>lz4</code> 会在发现数据压缩比低时自动放弃压缩，所以即使遇到无法压缩的数据也不会有太大的性能损耗。</p><p>对于性能要求不高的存储池/数据集上我们就可以用压缩比更高但性能损耗也更高的压缩算法了（例如 <code>gzip</code> 和 <code>zstd</code> ）。这些压缩算法会消耗更多的 CPU 时间并可能降低吞吐量，但用在备份或冷数据存储池/数据集上很合适。现在一般使用 zstd，因为它能提供相对 gzip 快得多（2x）的压缩/解压缩性能，并且压缩比甚至更好</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 大多数情况下，直接将 compression 设置为 on 即可。ZFS 会默认使用 lz4</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compression=on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">dataset_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 对于冷数据，我们可以用 zstd 来节省更多空间</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compression=zstd</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">dataset_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 对于难已压缩或已经压缩过的数据，我们可以禁用压缩</span></span>
<span class="line"><span style="color:#B392F0;">zfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compression=off</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pool_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">dataset_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 大多数情况下，直接将 compression 设置为 on 即可。ZFS 会默认使用 lz4</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compression=on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">dataset_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 对于冷数据，我们可以用 zstd 来节省更多空间</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compression=zstd</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">dataset_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 对于难已压缩或已经压缩过的数据，我们可以禁用压缩</span></span>
<span class="line"><span style="color:#6F42C1;">zfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compression=off</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pool_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">dataset_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="_7-尽量让存储池使用率低于-90" tabindex="-1">7.尽量让存储池使用率低于 90% <a class="header-anchor" href="#_7-尽量让存储池使用率低于-90" aria-label="Permalink to &quot;7.尽量让存储池使用率低于 90%&quot;">​</a></h3><p>由于 ZFS 使用 CoW （写入时复制）策略，每次写入数据时 ZFS 都会在存储池中寻找一块未使用的块写入数据。这就意味着当存储池快要写满时，寻找可使用的块会越来越难。现实中，这就意味着爆增的写入延迟和爆减的吞吐量。</p><p>和 SSD 不要写满是一个原理</p><p>默认情况下，ZFS 总会保留 3.2% 的存储池容量作为应急使用（详见 [spa_slop_shift](<a href="https://openzfs.github.io/openzfs-docs/Performance" target="_blank" rel="noreferrer">https://openzfs.github.io/openzfs-docs/Performance</a> and Tuning/Module Parameters.html#spa-slop-shift)），但如果不想遇到性能问题的话，多留一点空间给 ZFS 总没错</p>`,28),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{g as __pageData,h as default};