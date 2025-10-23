import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.cmake安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/4-postgis.md","filePath":"guide/Database/pgSql/base/plugin/4-postgis.md","lastUpdated":1711706009000}'),p={name:"guide/Database/pgSql/base/plugin/4-postgis.md"},l=n(`<p>环境：</p><p>centos7</p><p>postgresql12</p><p>postgis3.0.1</p><p>posgis3.0.1 依赖</p><p><a href="https://postgis.net/2020/02/20/postgis-3.0.1/" target="_blank" rel="noreferrer">https://postgis.net/2020/02/20/postgis-3.0.1/</a></p><p>The PostGIS Team is pleased to release PostGIS 3.0.1.</p><p>Best served with <a href="https://www.postgresql.org/docs/12/release-12-2.html" target="_blank" rel="noreferrer">PostgreSQL 12.2</a>, GEOS 3.8.0, SFCGAL 1.3.7, GDAL 3.0.4, PROJ 6.3.1, protobuf-c 1.3.3, json-c 0.13.1.</p><h1 id="_1-cmake安装" tabindex="-1">1.cmake安装 <a class="header-anchor" href="#_1-cmake安装" aria-label="Permalink to &quot;1.cmake安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://github.com/Kitware/CMake/releases/download/v3.16.8/cmake-3.16.8.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf cmake-3.16.8.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd cmake-3.16.8</span></span>
<span class="line"><span style="color:#e1e4e8;">./bootstrap --prefix=/usr/local/cmake</span></span>
<span class="line"><span style="color:#e1e4e8;">gmake</span></span>
<span class="line"><span style="color:#e1e4e8;">gmake install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://github.com/Kitware/CMake/releases/download/v3.16.8/cmake-3.16.8.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf cmake-3.16.8.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd cmake-3.16.8</span></span>
<span class="line"><span style="color:#24292e;">./bootstrap --prefix=/usr/local/cmake</span></span>
<span class="line"><span style="color:#24292e;">gmake</span></span>
<span class="line"><span style="color:#24292e;">gmake install</span></span></code></pre></div><h1 id="_2-安装geos" tabindex="-1">2.安装GEOS <a class="header-anchor" href="#_2-安装geos" aria-label="Permalink to &quot;2.安装GEOS&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://download.osgeo.org/geos/geos-3.8.1.tar.bz2</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -jxf geos-3.8.1.tar.bz2</span></span>
<span class="line"><span style="color:#e1e4e8;">cd geos-3.8.1</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --prefix=--prefix=/data/apps/pgsql/12/plus/geos-3.8.1</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://download.osgeo.org/geos/geos-3.8.1.tar.bz2</span></span>
<span class="line"><span style="color:#24292e;">tar -jxf geos-3.8.1.tar.bz2</span></span>
<span class="line"><span style="color:#24292e;">cd geos-3.8.1</span></span>
<span class="line"><span style="color:#24292e;">./configure --prefix=--prefix=/data/apps/pgsql/12/plus/geos-3.8.1</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><h1 id="_3-安装proj" tabindex="-1">3.安装proj <a class="header-anchor" href="#_3-安装proj" aria-label="Permalink to &quot;3.安装proj&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget http://download.osgeo.org/proj/proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd proj-6.3.2</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure  --prefix=/usr/local/proj-6.3.2</span></span>
<span class="line"><span style="color:#e1e4e8;"># 编译时遇到下面的问题，说是sqlite版本太低！编译成功再进行下一步！</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget http://download.osgeo.org/proj/proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd proj-6.3.2</span></span>
<span class="line"><span style="color:#24292e;">./configure  --prefix=/usr/local/proj-6.3.2</span></span>
<span class="line"><span style="color:#24292e;"># 编译时遇到下面的问题，说是sqlite版本太低！编译成功再进行下一步！</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><h2 id="_3-1安装sqlite3" tabindex="-1">3.1安装sqlite3 <a class="header-anchor" href="#_3-1安装sqlite3" aria-label="Permalink to &quot;3.1安装sqlite3&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget http://www.sqlite.org/2020/sqlite-autoconf-3320200.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget http://www.sqlite.org/2020/sqlite-autoconf-3320200.tar.gz</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]#yum remove sqlite-devel</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# tar zxvf sqlite-autoconf-3320200.tar.gz -C /usr/src</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]#yum remove sqlite-devel</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# tar zxvf sqlite-autoconf-3320200.tar.gz -C /usr/src</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]#cd sqlite-autoconf-3320200/ ./configure --prefix=/usr/local/sqlite</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]#cd sqlite-autoconf-3320200/ ./configure --prefix=/usr/local/sqlite</span></span></code></pre></div><p>替换版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mv /usr/bin/sqlite3 /usr/bin/sqlite3_old</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/sqlite/bin/</span></span>
<span class="line"><span style="color:#e1e4e8;">ln -s /usr/local/sqlite/bin/sqlite3 /usr/bin/sqlite3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mv /usr/bin/sqlite3 /usr/bin/sqlite3_old</span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/sqlite/bin/</span></span>
<span class="line"><span style="color:#24292e;">ln -s /usr/local/sqlite/bin/sqlite3 /usr/bin/sqlite3</span></span></code></pre></div><p>共享库修改，注意sqlite的安装路径</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">export LD_LIBRARY_PATH=&quot;/usr/local/sqlite/lib&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">export LD_LIBRARY_PATH=&quot;/usr/local/sqlite/lib&quot;</span></span></code></pre></div><p>查看sqlite版本信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@beta postgis-3.0.1]# sqlite3 --version</span></span>
<span class="line"><span style="color:#e1e4e8;">3.32.2 2020-06-04 12:58:43 ec02243ea6ce33b090870ae55ab8aa2534b54d216d45c4aa2fdbb00e86861e8c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@beta postgis-3.0.1]# sqlite3 --version</span></span>
<span class="line"><span style="color:#24292e;">3.32.2 2020-06-04 12:58:43 ec02243ea6ce33b090870ae55ab8aa2534b54d216d45c4aa2fdbb00e86861e8c</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">find / -name sqlite3.pc</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/sqlite/lib/pkgconfig/sqlite3.pc</span></span>
<span class="line"><span style="color:#e1e4e8;">复制</span></span>
<span class="line"><span style="color:#e1e4e8;">cp /usr/local/lib/pkgconfig/sqlite3.pc /usr/lib64/pkgconfig/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">find / -name sqlite3.pc</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/sqlite/lib/pkgconfig/sqlite3.pc</span></span>
<span class="line"><span style="color:#24292e;">复制</span></span>
<span class="line"><span style="color:#24292e;">cp /usr/local/lib/pkgconfig/sqlite3.pc /usr/lib64/pkgconfig/</span></span></code></pre></div><h2 id="_3-2安装proj" tabindex="-1">3.2安装proj <a class="header-anchor" href="#_3-2安装proj" aria-label="Permalink to &quot;3.2安装proj&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget http://download.osgeo.org/proj/proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd proj-6.3.2</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure  --prefix=/data/apps/pgsql/12/plus/proj-6.3.2</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget http://download.osgeo.org/proj/proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf proj-6.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd proj-6.3.2</span></span>
<span class="line"><span style="color:#24292e;">./configure  --prefix=/data/apps/pgsql/12/plus/proj-6.3.2</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><h1 id="_4-安装gdal" tabindex="-1">4.安装GDAL <a class="header-anchor" href="#_4-安装gdal" aria-label="Permalink to &quot;4.安装GDAL&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://download.osgeo.org/gdal/3.0.4/gdal-3.0.4.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf gdal-3.0.4.tar.gz </span></span>
<span class="line"><span style="color:#e1e4e8;">cd gdal-3.0.4 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta gdal-3.0.4]# ./configure  --prefix=/data/apps/pgsql/12/plus/gdal-3.0.4 --with-proj=/data/apps/pgsql/12/plus/proj-6.3.2  --with-pg=/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta gdal-3.0.4]# make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://download.osgeo.org/gdal/3.0.4/gdal-3.0.4.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf gdal-3.0.4.tar.gz </span></span>
<span class="line"><span style="color:#24292e;">cd gdal-3.0.4 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta gdal-3.0.4]# ./configure  --prefix=/data/apps/pgsql/12/plus/gdal-3.0.4 --with-proj=/data/apps/pgsql/12/plus/proj-6.3.2  --with-pg=/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#24292e;">[root@beta gdal-3.0.4]# make &amp;&amp; make install</span></span></code></pre></div><h1 id="_5-安装protubuf" tabindex="-1">5.安装protubuf <a class="header-anchor" href="#_5-安装protubuf" aria-label="Permalink to &quot;5.安装protubuf&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./configure: No such file or directory</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install automake</span></span>
<span class="line"><span style="color:#e1e4e8;">autoreconf -i</span></span>
<span class="line"><span style="color:#e1e4e8;">下载地址</span></span>
<span class="line"><span style="color:#e1e4e8;">https://github.com/protocolbuffers/protobuf/issues/6599</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://github.com/protocolbuffers/protobuf/releases/download/v3.15.3/protobuf-all-3.15.3.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta protobuf-3.15.2]#./configure  --prefix=/data/apps/pgsql/12/plus/protobuf-3.15.2</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export PKG_CONFIG_PATH=/data/apps/pgsql/12/plus/protobuf-3.15.2/lib/pkgconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./configure: No such file or directory</span></span>
<span class="line"><span style="color:#24292e;">yum install automake</span></span>
<span class="line"><span style="color:#24292e;">autoreconf -i</span></span>
<span class="line"><span style="color:#24292e;">下载地址</span></span>
<span class="line"><span style="color:#24292e;">https://github.com/protocolbuffers/protobuf/issues/6599</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget https://github.com/protocolbuffers/protobuf/releases/download/v3.15.3/protobuf-all-3.15.3.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta protobuf-3.15.2]#./configure  --prefix=/data/apps/pgsql/12/plus/protobuf-3.15.2</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export PKG_CONFIG_PATH=/data/apps/pgsql/12/plus/protobuf-3.15.2/lib/pkgconfig</span></span></code></pre></div><h1 id="_6-安装protobuf-c" tabindex="-1">6.安装protobuf-c <a class="header-anchor" href="#_6-安装protobuf-c" aria-label="Permalink to &quot;6.安装protobuf-c&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://github.com/protobuf-c/protobuf-c/releases/download/v1.3.3/protobuf-c-1.3.3.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -xzvf  protobuf-c-1.3.3.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd protobuf-c-1.3.3</span></span>
<span class="line"><span style="color:#e1e4e8;">export PKG_CONFIG_PATH=/usr/local/protobuf-3.11.4/lib/pkgconfig</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure  --prefix=/data/apps/pgsql/12/plus/protobuf-c-1.3.3</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://github.com/protobuf-c/protobuf-c/releases/download/v1.3.3/protobuf-c-1.3.3.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -xzvf  protobuf-c-1.3.3.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd protobuf-c-1.3.3</span></span>
<span class="line"><span style="color:#24292e;">export PKG_CONFIG_PATH=/usr/local/protobuf-3.11.4/lib/pkgconfig</span></span>
<span class="line"><span style="color:#24292e;">./configure  --prefix=/data/apps/pgsql/12/plus/protobuf-c-1.3.3</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><h1 id="_7-安装sfcgal-1-3-7" tabindex="-1">7.安装SFCGAL 1.3.7 <a class="header-anchor" href="#_7-安装sfcgal-1-3-7" aria-label="Permalink to &quot;7.安装SFCGAL 1.3.7&quot;">​</a></h1><p>由于SFCGAL需要依赖Boost、CGAL、GMP、MPFR这四个软件，所以具体总共需要安装以下四个软件</p><p>boost-devel.x86_64</p><p>gmp-devel.x86_64</p><p>mpfr-devel.x86_64</p><p>CGAL-4.14</p><p>为了安装<code>pgrouting3.0.2</code>需要安装boost<code>1.53</code>以上,使用<code>yum install boost boost-devel</code>只能安装版本<code>1.53</code>, 我使用源码安装的是<code>1.68</code></p><h2 id="安装boost" tabindex="-1">安装boost <a class="header-anchor" href="#安装boost" aria-label="Permalink to &quot;安装boost&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://dl.bintray.com/boostorg/release/1.68.0/source/boost_1_68_0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -xzvf boost_1_68_0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd boost_1_68_0</span></span>
<span class="line"><span style="color:#e1e4e8;">./bootstrap.sh </span></span>
<span class="line"><span style="color:#e1e4e8;">./b2 install --with=all</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install gmp-devel.x86_64</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install mpfr-devel.x86_64</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://dl.bintray.com/boostorg/release/1.68.0/source/boost_1_68_0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -xzvf boost_1_68_0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd boost_1_68_0</span></span>
<span class="line"><span style="color:#24292e;">./bootstrap.sh </span></span>
<span class="line"><span style="color:#24292e;">./b2 install --with=all</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install gmp-devel.x86_64</span></span>
<span class="line"><span style="color:#24292e;">yum install mpfr-devel.x86_64</span></span></code></pre></div><h2 id="安装cgal" tabindex="-1">安装CGAL <a class="header-anchor" href="#安装cgal" aria-label="Permalink to &quot;安装CGAL&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://git</span></span>
<span class="line"><span style="color:#e1e4e8;">hub.com/CGAL/cgal/releases/download/releases%2FCGAL-4.14.3/CGAL-4.14.3.tar.xz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta plus]# cd CGAL-4.14.3/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta CGAL-4.14.3]#mkdir build &amp;&amp; cd build</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta build]#cmake -DCGAL_HEADER_ONLY=OFF -DCMAKE_BUILD_TYPE=Release ..</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta build]#make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://git</span></span>
<span class="line"><span style="color:#24292e;">hub.com/CGAL/cgal/releases/download/releases%2FCGAL-4.14.3/CGAL-4.14.3.tar.xz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta plus]# cd CGAL-4.14.3/</span></span>
<span class="line"><span style="color:#24292e;">[root@beta CGAL-4.14.3]#mkdir build &amp;&amp; cd build</span></span>
<span class="line"><span style="color:#24292e;">[root@beta build]#cmake -DCGAL_HEADER_ONLY=OFF -DCMAKE_BUILD_TYPE=Release ..</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta build]#make &amp;&amp; make install</span></span></code></pre></div><h2 id="安装pcre" tabindex="-1">安装pcre <a class="header-anchor" href="#安装pcre" aria-label="Permalink to &quot;安装pcre&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://ftp.pcre.org/pub/pcre/pcre-8.44.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -xzvf  pcre-8.44.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd pcre-8.44</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --enable-utf8 --prefix=/data/apps/pgsql/12/plus/pcre-8.44</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make intall</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;/data/apps/pgsql/12/plus/pcre-8.44/lib&quot; &gt; /etc/ld.so.conf.d/pcre-8.44.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ldconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://ftp.pcre.org/pub/pcre/pcre-8.44.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -xzvf  pcre-8.44.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd pcre-8.44</span></span>
<span class="line"><span style="color:#24292e;">./configure --enable-utf8 --prefix=/data/apps/pgsql/12/plus/pcre-8.44</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make intall</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;/data/apps/pgsql/12/plus/pcre-8.44/lib&quot; &gt; /etc/ld.so.conf.d/pcre-8.44.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ldconfig</span></span></code></pre></div><p>遇到以下这个问题：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">c++: internal compiler error: Killed (program cc1plus)</span></span>
<span class="line"><span style="color:#e1e4e8;">Please submit a full bug report</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">c++: internal compiler error: Killed (program cc1plus)</span></span>
<span class="line"><span style="color:#24292e;">Please submit a full bug report</span></span></code></pre></div><p>解决方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sudo dd if=/dev/zero of=/swapfile bs=64M count=16</span></span>
<span class="line"><span style="color:#e1e4e8;">#count的大小就是增加的swap空间的大小，64M是块大小，所以空间大小是bs*count=1024MB</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo mkswap /swapfile</span></span>
<span class="line"><span style="color:#e1e4e8;">#把刚才空间格式化成swap格式</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 0600 /swapfile  </span></span>
<span class="line"><span style="color:#e1e4e8;">#该目录权限，不改的话，在下一步启动时会报“swapon: /swapfile: insecure permissions 0644, 0600 suggested.”错误</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo swapon /swapfile</span></span>
<span class="line"><span style="color:#e1e4e8;">#使用刚才创建的swap空间</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sudo dd if=/dev/zero of=/swapfile bs=64M count=16</span></span>
<span class="line"><span style="color:#24292e;">#count的大小就是增加的swap空间的大小，64M是块大小，所以空间大小是bs*count=1024MB</span></span>
<span class="line"><span style="color:#24292e;">sudo mkswap /swapfile</span></span>
<span class="line"><span style="color:#24292e;">#把刚才空间格式化成swap格式</span></span>
<span class="line"><span style="color:#24292e;">chmod 0600 /swapfile  </span></span>
<span class="line"><span style="color:#24292e;">#该目录权限，不改的话，在下一步启动时会报“swapon: /swapfile: insecure permissions 0644, 0600 suggested.”错误</span></span>
<span class="line"><span style="color:#24292e;">sudo swapon /swapfile</span></span>
<span class="line"><span style="color:#24292e;">#使用刚才创建的swap空间</span></span></code></pre></div><h2 id="sfcgal-1-3-7" tabindex="-1">SFCGAL-1.3.7 <a class="header-anchor" href="#sfcgal-1-3-7" aria-label="Permalink to &quot;SFCGAL-1.3.7&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget  https://github.com/Oslandia/SFCGAL/archive/v1.3.7.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf SFCGAL-1.3.7.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd SFCGAL-1.3.7  </span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir build &amp;&amp; cd build </span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/cmake/bin/cmake -DCMAKE_INSTALL_PREFIX=/data/apps/pgsql/12/plus/sfcgal-1.3.7 ..</span></span>
<span class="line"><span style="color:#e1e4e8;">make  &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">swapoff -a</span></span>
<span class="line"><span style="color:#e1e4e8;">#详细的用法可以：swapoff --help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta json-c-json-c-0.13.1-20180305]# ./configure --prefix=/data/apps/pgsql/12/plus/json0.13.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget  https://github.com/Oslandia/SFCGAL/archive/v1.3.7.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf SFCGAL-1.3.7.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd SFCGAL-1.3.7  </span></span>
<span class="line"><span style="color:#24292e;">mkdir build &amp;&amp; cd build </span></span>
<span class="line"><span style="color:#24292e;">/usr/local/cmake/bin/cmake -DCMAKE_INSTALL_PREFIX=/data/apps/pgsql/12/plus/sfcgal-1.3.7 ..</span></span>
<span class="line"><span style="color:#24292e;">make  &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">swapoff -a</span></span>
<span class="line"><span style="color:#24292e;">#详细的用法可以：swapoff --help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta json-c-json-c-0.13.1-20180305]# ./configure --prefix=/data/apps/pgsql/12/plus/json0.13.1</span></span></code></pre></div><h1 id="_8-安装postgis" tabindex="-1">8.安装PostGIS <a class="header-anchor" href="#_8-安装postgis" aria-label="Permalink to &quot;8.安装PostGIS&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./configure --prefix=/data/apps/pgsql/12/plus/postgis-3.1.1 --with-gdalconfig=/data/apps/pgsql/12/plus/gdal-3.0.4/bin/gdal-config --with-pgconfig=/data/apps/pgsql/12/bin/pg_config --with-geosconfig=/data/apps/pgsql/12/plus/geos-3.8.1/bin/geos-config --with-projdir=/data/apps/pgsql/12/plus/proj-6.3.2 --with-xml2config=/data/apps/pgsql/12/plus/libxml2/bin/xml2-config --with-jsondir=/data/apps/pgsql/12/plus/json0.13.1 --with-protobufdir=/data/apps/pgsql/12/plus/protobuf-3.15.2 --with-sfcgal=/data/apps/pgsql/12/plus/sfcgal-1.3.7/bin/sfcgal-config --with-pcredir=/data/apps/pgsql/12/plus/pcre-8.44</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./configure --prefix=/data/apps/pgsql/12/plus/postgis-3.1.1 --with-gdalconfig=/data/apps/pgsql/12/plus/gdal-3.0.4/bin/gdal-config --with-pgconfig=/data/apps/pgsql/12/bin/pg_config --with-geosconfig=/data/apps/pgsql/12/plus/geos-3.8.1/bin/geos-config --with-projdir=/data/apps/pgsql/12/plus/proj-6.3.2 --with-xml2config=/data/apps/pgsql/12/plus/libxml2/bin/xml2-config --with-jsondir=/data/apps/pgsql/12/plus/json0.13.1 --with-protobufdir=/data/apps/pgsql/12/plus/protobuf-3.15.2 --with-sfcgal=/data/apps/pgsql/12/plus/sfcgal-1.3.7/bin/sfcgal-config --with-pcredir=/data/apps/pgsql/12/plus/pcre-8.44</span></span></code></pre></div><h1 id="_9-安装pgrouting" tabindex="-1">9.安装PgRouting <a class="header-anchor" href="#_9-安装pgrouting" aria-label="Permalink to &quot;9.安装PgRouting&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget  https://github.com/pgRouting/pgrouting/releases/download/v3.0.2/pgrouting-3.0.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf pgrouting-3.0.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd pgrouting-3.0.2</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir build &amp;&amp; cd build </span></span>
<span class="line"><span style="color:#e1e4e8;">cmake ..</span></span>
<span class="line"><span style="color:#e1e4e8;">make</span></span>
<span class="line"><span style="color:#e1e4e8;">make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget  https://github.com/pgRouting/pgrouting/releases/download/v3.0.2/pgrouting-3.0.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf pgrouting-3.0.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd pgrouting-3.0.2</span></span>
<span class="line"><span style="color:#24292e;">mkdir build &amp;&amp; cd build </span></span>
<span class="line"><span style="color:#24292e;">cmake ..</span></span>
<span class="line"><span style="color:#24292e;">make</span></span>
<span class="line"><span style="color:#24292e;">make install</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@beta json-c-json-c-0.13.1-20180305]# cat /etc/ld.so.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">#添加如下东西</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/geos-3.8.1/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/proj-6.3.2/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/json0.13.1/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/protobuf-c-1.3.3/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/sfcgal-1.3.7/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/pgsql/12/plus/sfcgal-1.3.7/lib64</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta json-c-json-c-0.13.1-20180305]#ldconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@beta json-c-json-c-0.13.1-20180305]# cat /etc/ld.so.conf</span></span>
<span class="line"><span style="color:#24292e;">#添加如下东西</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/geos-3.8.1/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/proj-6.3.2/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/json0.13.1/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/protobuf-c-1.3.3/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/sfcgal-1.3.7/lib</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/pgsql/12/plus/sfcgal-1.3.7/lib64</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta json-c-json-c-0.13.1-20180305]#ldconfig</span></span></code></pre></div><h1 id="_10-创建postgis扩展" tabindex="-1">10.创建postgis扩展 <a class="header-anchor" href="#_10-创建postgis扩展" aria-label="Permalink to &quot;10.创建postgis扩展&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create database gistest;</span></span>
<span class="line"><span style="color:#e1e4e8;">\\c gistest</span></span>
<span class="line"><span style="color:#e1e4e8;">create extension postgis;</span></span>
<span class="line"><span style="color:#e1e4e8;">#如果安装了sfcgal，创建扩展测试下</span></span>
<span class="line"><span style="color:#e1e4e8;">create extension postgis_sfcgal;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create extension pgrouting;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gistest=# select ST_distance(point(111.11,22.2)::geometry,point(111.11,22.4)::geometry);</span></span>
<span class="line"><span style="color:#e1e4e8;">    st_distance     </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0.1999999999999993</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">显示上面结果，插件安装成功</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create database gistest;</span></span>
<span class="line"><span style="color:#24292e;">\\c gistest</span></span>
<span class="line"><span style="color:#24292e;">create extension postgis;</span></span>
<span class="line"><span style="color:#24292e;">#如果安装了sfcgal，创建扩展测试下</span></span>
<span class="line"><span style="color:#24292e;">create extension postgis_sfcgal;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create extension pgrouting;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gistest=# select ST_distance(point(111.11,22.2)::geometry,point(111.11,22.4)::geometry);</span></span>
<span class="line"><span style="color:#24292e;">    st_distance     </span></span>
<span class="line"><span style="color:#24292e;">--------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0.1999999999999993</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">显示上面结果，插件安装成功</span></span></code></pre></div>`,59),o=[l];function t(c,i,r,d,g,u){return a(),e("div",null,o)}const b=s(p,[["render",t]]);export{h as __pageData,b as default};
