import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const k=JSON.parse('{"title":"1.1 连接测试","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/Redis/3-create.md","filePath":"guide/Database/Redis/3-create.md","lastUpdated":1720533756000}'),l={name:"guide/Database/Redis/3-create.md"},p=a(`<h1 id="_1-1-连接测试" tabindex="-1">1.1 连接测试 <a class="header-anchor" href="#_1-1-连接测试" aria-label="Permalink to &quot;1.1 连接测试&quot;">​</a></h1><ul><li>无密码登录</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@test redis]# redis-cli </span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; set name test   #简单的写入以恶搞字符串</span></span>
<span class="line"><span style="color:#e1e4e8;">OK</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; get name</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@test redis]# redis-cli </span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; set name test   #简单的写入以恶搞字符串</span></span>
<span class="line"><span style="color:#24292e;">OK</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; get name</span></span>
<span class="line"><span style="color:#24292e;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; exit</span></span></code></pre></div><ul><li>有密码登录</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# redis-cli -h 192.168.122.217 -p 9379 -a xxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#e1e4e8;">(empty list or set)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#在redis内部进行认证，推荐使用</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# redis-cli -h 192.168.122.217 -p 9379 </span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#e1e4e8;">(error) NOAUTH Authentication required.</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt; auth xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">OK</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#e1e4e8;">(empty list or set)</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# redis-cli -h 192.168.122.217 -p 9379 -a xxxxxx</span></span>
<span class="line"><span style="color:#24292e;">Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.</span></span>
<span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#24292e;">(empty list or set)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#在redis内部进行认证，推荐使用</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# redis-cli -h 192.168.122.217 -p 9379 </span></span>
<span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#24292e;">(error) NOAUTH Authentication required.</span></span>
<span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt; auth xxxxx</span></span>
<span class="line"><span style="color:#24292e;">OK</span></span>
<span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt; keys *</span></span>
<span class="line"><span style="color:#24292e;">(empty list or set)</span></span>
<span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt;</span></span></code></pre></div><ul><li>选择数据库</li></ul><p>语法：select number</p><p>默认是0</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">192.168.122.217:9379&gt; select 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">192.168.122.217:9379&gt; select 1</span></span></code></pre></div><h1 id="_1-2-关闭redis" tabindex="-1">1.2 关闭redis <a class="header-anchor" href="#_1-2-关闭redis" aria-label="Permalink to &quot;1.2 关闭redis&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# redis-cli shutdown</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# redis-cli shutdown</span></span></code></pre></div><h1 id="_1-3-全局key操作" tabindex="-1">1.3 全局key操作 <a class="header-anchor" href="#_1-3-全局key操作" aria-label="Permalink to &quot;1.3 全局key操作&quot;">​</a></h1><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>keys *</td><td>查看key通配符</td></tr><tr><td>del</td><td>删除给定一个或多个key</td></tr><tr><td>exists</td><td>检查是否存在</td></tr><tr><td>rename</td><td>变更key名</td></tr><tr><td>sort</td><td>键值排序，有非数字时报错</td></tr><tr><td>type</td><td>返回键所存储的类型</td></tr><tr><td>dump retore</td><td>序列化与反序列化</td></tr><tr><td>expire pexpire</td><td>秒,毫秒</td></tr><tr><td>ttl pttl</td><td>秒,毫秒返回生存时间</td></tr><tr><td>persist</td><td>取消生存实现设置</td></tr><tr><td>randomkey</td><td>返回数据库中的任意键</td></tr></tbody></table><ul><li>案例</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">删 </span></span>
<span class="line"><span style="color:#e1e4e8;">flushdb             清空当前选择的数据库 </span></span>
<span class="line"><span style="color:#e1e4e8;">del mykey mykey2        删除了两个 Keys </span></span>
<span class="line"><span style="color:#e1e4e8;">改 </span></span>
<span class="line"><span style="color:#e1e4e8;">move mysetkey 1         将当前数据库中的 mysetkey 键移入到 ID 为 1 的数据库中 </span></span>
<span class="line"><span style="color:#e1e4e8;">rename mykey mykey1     将 mykey 改名为 mykey1 </span></span>
<span class="line"><span style="color:#e1e4e8;">renamenx oldkey newkey  如果 newkey 已经存在，则无效 </span></span>
<span class="line"><span style="color:#e1e4e8;">expire mykey 100        将该键的超时设置为 100 秒</span></span>
<span class="line"><span style="color:#e1e4e8;">persist mykey       将该 Key 的超时去掉,变成持久化的键 </span></span>
<span class="line"><span style="color:#e1e4e8;">查 </span></span>
<span class="line"><span style="color:#e1e4e8;">keys my*            获取当前数据库中所有以my开头的key </span></span>
<span class="line"><span style="color:#e1e4e8;">exists mykey        若不存在,返回0;存在返回1 </span></span>
<span class="line"><span style="color:#e1e4e8;">select 0            打开 ID 为 0 的数据库 </span></span>
<span class="line"><span style="color:#e1e4e8;">ttl mykey           查看存货时间还剩下多少秒</span></span>
<span class="line"><span style="color:#e1e4e8;">type mykey          返回mykey对应的值的类型 </span></span>
<span class="line"><span style="color:#e1e4e8;">randomkey           返回数据库中的任意键</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">删 </span></span>
<span class="line"><span style="color:#24292e;">flushdb             清空当前选择的数据库 </span></span>
<span class="line"><span style="color:#24292e;">del mykey mykey2        删除了两个 Keys </span></span>
<span class="line"><span style="color:#24292e;">改 </span></span>
<span class="line"><span style="color:#24292e;">move mysetkey 1         将当前数据库中的 mysetkey 键移入到 ID 为 1 的数据库中 </span></span>
<span class="line"><span style="color:#24292e;">rename mykey mykey1     将 mykey 改名为 mykey1 </span></span>
<span class="line"><span style="color:#24292e;">renamenx oldkey newkey  如果 newkey 已经存在，则无效 </span></span>
<span class="line"><span style="color:#24292e;">expire mykey 100        将该键的超时设置为 100 秒</span></span>
<span class="line"><span style="color:#24292e;">persist mykey       将该 Key 的超时去掉,变成持久化的键 </span></span>
<span class="line"><span style="color:#24292e;">查 </span></span>
<span class="line"><span style="color:#24292e;">keys my*            获取当前数据库中所有以my开头的key </span></span>
<span class="line"><span style="color:#24292e;">exists mykey        若不存在,返回0;存在返回1 </span></span>
<span class="line"><span style="color:#24292e;">select 0            打开 ID 为 0 的数据库 </span></span>
<span class="line"><span style="color:#24292e;">ttl mykey           查看存货时间还剩下多少秒</span></span>
<span class="line"><span style="color:#24292e;">type mykey          返回mykey对应的值的类型 </span></span>
<span class="line"><span style="color:#24292e;">randomkey           返回数据库中的任意键</span></span></code></pre></div><h1 id="_1-4-数据类型" tabindex="-1">1.4 数据类型 <a class="header-anchor" href="#_1-4-数据类型" aria-label="Permalink to &quot;1.4 数据类型&quot;">​</a></h1><h2 id="_1-4-1-string-字符串" tabindex="-1">1.4.1 string（字符串） <a class="header-anchor" href="#_1-4-1-string-字符串" aria-label="Permalink to &quot;1.4.1 string（字符串）&quot;">​</a></h2><p>string 是redis最基本的类型，一个key对应一个value。一个键最大能存储512M</p><p>string 类型有如下操作(15)</p><ul><li>set</li><li>get</li><li>incr</li><li>incrby</li><li>decr</li><li>decrby</li><li>mset</li><li>mget</li><li>getset</li><li>setex</li><li>setnx</li><li>del</li><li>setrange</li><li>strlen</li><li>getrange</li></ul><ul><li>应用场景</li></ul><p>常规计数： 微博数，粉丝数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">增</span></span>
<span class="line"><span style="color:#e1e4e8;">set mykey &quot;test&quot;            为键设置新值，并覆盖原有值</span></span>
<span class="line"><span style="color:#e1e4e8;">getset mycounter 0              设置值,取值同时进行</span></span>
<span class="line"><span style="color:#e1e4e8;">setex mykey 10 &quot;hello&quot;          设置指定 Key 的过期时间为10秒,在存活时间可以获取value</span></span>
<span class="line"><span style="color:#e1e4e8;">setnx mykey &quot;hello&quot;             若该键不存在，则为键设置新值</span></span>
<span class="line"><span style="color:#e1e4e8;">mset key3  &quot;zyx&quot;  key4 &quot;xyz&quot;    批量设置键</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删</span></span>
<span class="line"><span style="color:#e1e4e8;">del mykey                   删除已有键</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">改</span></span>
<span class="line"><span style="color:#e1e4e8;">append mykey &quot;hello&quot;            若该键并不存在,返回当前 Value 的长度</span></span>
<span class="line"><span style="color:#e1e4e8;">                            该键已经存在，返回追加后 Value的长度</span></span>
<span class="line"><span style="color:#e1e4e8;">incr mykey                  值增加1,若该key不存在,创建key,初始值设为0,增加后结果为1</span></span>
<span class="line"><span style="color:#e1e4e8;">decrby  mykey  5            值减少5</span></span>
<span class="line"><span style="color:#e1e4e8;">setrange mykey 20 dd            把第21和22个字节,替换为dd, 超过value长度,自动补0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查  </span></span>
<span class="line"><span style="color:#e1e4e8;">exists mykey                    判断该键是否存在，存在返回 1，否则返回0</span></span>
<span class="line"><span style="color:#e1e4e8;">get mykey                   获取Key对应的value</span></span>
<span class="line"><span style="color:#e1e4e8;">strlen mykey                获取指定 Key 的字符长度</span></span>
<span class="line"><span style="color:#e1e4e8;">ttl mykey                   查看一下指定 Key 的剩余存活时间(秒数)</span></span>
<span class="line"><span style="color:#e1e4e8;">getrange mykey 1 20             获取第2到第20个字节,若20超过value长度,则截取第2个和后面所有的</span></span>
<span class="line"><span style="color:#e1e4e8;">mget key3 key4                  批量获取键</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">增</span></span>
<span class="line"><span style="color:#24292e;">set mykey &quot;test&quot;            为键设置新值，并覆盖原有值</span></span>
<span class="line"><span style="color:#24292e;">getset mycounter 0              设置值,取值同时进行</span></span>
<span class="line"><span style="color:#24292e;">setex mykey 10 &quot;hello&quot;          设置指定 Key 的过期时间为10秒,在存活时间可以获取value</span></span>
<span class="line"><span style="color:#24292e;">setnx mykey &quot;hello&quot;             若该键不存在，则为键设置新值</span></span>
<span class="line"><span style="color:#24292e;">mset key3  &quot;zyx&quot;  key4 &quot;xyz&quot;    批量设置键</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删</span></span>
<span class="line"><span style="color:#24292e;">del mykey                   删除已有键</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">改</span></span>
<span class="line"><span style="color:#24292e;">append mykey &quot;hello&quot;            若该键并不存在,返回当前 Value 的长度</span></span>
<span class="line"><span style="color:#24292e;">                            该键已经存在，返回追加后 Value的长度</span></span>
<span class="line"><span style="color:#24292e;">incr mykey                  值增加1,若该key不存在,创建key,初始值设为0,增加后结果为1</span></span>
<span class="line"><span style="color:#24292e;">decrby  mykey  5            值减少5</span></span>
<span class="line"><span style="color:#24292e;">setrange mykey 20 dd            把第21和22个字节,替换为dd, 超过value长度,自动补0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查  </span></span>
<span class="line"><span style="color:#24292e;">exists mykey                    判断该键是否存在，存在返回 1，否则返回0</span></span>
<span class="line"><span style="color:#24292e;">get mykey                   获取Key对应的value</span></span>
<span class="line"><span style="color:#24292e;">strlen mykey                获取指定 Key 的字符长度</span></span>
<span class="line"><span style="color:#24292e;">ttl mykey                   查看一下指定 Key 的剩余存活时间(秒数)</span></span>
<span class="line"><span style="color:#24292e;">getrange mykey 1 20             获取第2到第20个字节,若20超过value长度,则截取第2个和后面所有的</span></span>
<span class="line"><span style="color:#24292e;">mget key3 key4                  批量获取键</span></span></code></pre></div><h2 id="_1-4-2-hash-字典" tabindex="-1">1.4.2 hash（字典） <a class="header-anchor" href="#_1-4-2-hash-字典" aria-label="Permalink to &quot;1.4.2 hash（字典）&quot;">​</a></h2><p>将redis中的Hashes类型看成具有string key 和string values的map容器</p><p>所以该类型非常适合于存储值对象的信息。如username，password，age等。</p><p>如果hash中包含很少的字段，那么该类型的数据也将仅占用很少的磁盘空间。</p><p>每一个hash可以存储4294967295键值对。</p><ul><li>hset</li><li>hget</li><li>hsetnx</li><li>hmget</li><li>hmset</li><li>hlen</li><li>hdel</li><li>hexist</li><li>del</li><li>hgetall</li><li>hincby</li><li>hkeys</li><li>hvals</li></ul><p>应用场景：</p><p>存储部分变更的数据，如用户信息等。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">增</span></span>
<span class="line"><span style="color:#e1e4e8;">hset myhash field1 &quot;s&quot;    </span></span>
<span class="line"><span style="color:#e1e4e8;">若字段field1不存在,创建该键及与其关联的Hashes, Hashes中,key为field1 ,并设value为s ，若存在会覆盖原value</span></span>
<span class="line"><span style="color:#e1e4e8;">hsetnx myhash field1 s    </span></span>
<span class="line"><span style="color:#e1e4e8;">若字段field1不存在,创建该键及与其关联的Hashes, Hashes中,key为field1 ,并设value为s， 若字段field1存在,则无效</span></span>
<span class="line"><span style="color:#e1e4e8;">hmset myhash field1 &quot;hello&quot; field2 &quot;world       一次性设置多个字段</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删</span></span>
<span class="line"><span style="color:#e1e4e8;">hdel myhash field1                      删除 myhash 键中字段名为 field1 的字段</span></span>
<span class="line"><span style="color:#e1e4e8;">del myhash                          删除键</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">改  </span></span>
<span class="line"><span style="color:#e1e4e8;">hincrby myhash field 1                  给field的值加1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查</span></span>
<span class="line"><span style="color:#e1e4e8;">hget myhash field1                      获取键值为 myhash,字段为 field1 的值</span></span>
<span class="line"><span style="color:#e1e4e8;">hlen myhash                         获取myhash键的字段数量</span></span>
<span class="line"><span style="color:#e1e4e8;">hexists myhash field1                   判断 myhash 键中是否存在字段名为 field1 的字段</span></span>
<span class="line"><span style="color:#e1e4e8;">hmget myhash field1 field2 field3           一次性获取多个字段</span></span>
<span class="line"><span style="color:#e1e4e8;">hgetall myhash                          返回 myhash 键的所有字段及其值</span></span>
<span class="line"><span style="color:#e1e4e8;">hkeys myhash                        获取myhash 键中所有字段的名字</span></span>
<span class="line"><span style="color:#e1e4e8;">hvals myhash                        获取 myhash 键中所有字段的值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">增</span></span>
<span class="line"><span style="color:#24292e;">hset myhash field1 &quot;s&quot;    </span></span>
<span class="line"><span style="color:#24292e;">若字段field1不存在,创建该键及与其关联的Hashes, Hashes中,key为field1 ,并设value为s ，若存在会覆盖原value</span></span>
<span class="line"><span style="color:#24292e;">hsetnx myhash field1 s    </span></span>
<span class="line"><span style="color:#24292e;">若字段field1不存在,创建该键及与其关联的Hashes, Hashes中,key为field1 ,并设value为s， 若字段field1存在,则无效</span></span>
<span class="line"><span style="color:#24292e;">hmset myhash field1 &quot;hello&quot; field2 &quot;world       一次性设置多个字段</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删</span></span>
<span class="line"><span style="color:#24292e;">hdel myhash field1                      删除 myhash 键中字段名为 field1 的字段</span></span>
<span class="line"><span style="color:#24292e;">del myhash                          删除键</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">改  </span></span>
<span class="line"><span style="color:#24292e;">hincrby myhash field 1                  给field的值加1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查</span></span>
<span class="line"><span style="color:#24292e;">hget myhash field1                      获取键值为 myhash,字段为 field1 的值</span></span>
<span class="line"><span style="color:#24292e;">hlen myhash                         获取myhash键的字段数量</span></span>
<span class="line"><span style="color:#24292e;">hexists myhash field1                   判断 myhash 键中是否存在字段名为 field1 的字段</span></span>
<span class="line"><span style="color:#24292e;">hmget myhash field1 field2 field3           一次性获取多个字段</span></span>
<span class="line"><span style="color:#24292e;">hgetall myhash                          返回 myhash 键的所有字段及其值</span></span>
<span class="line"><span style="color:#24292e;">hkeys myhash                        获取myhash 键中所有字段的名字</span></span>
<span class="line"><span style="color:#24292e;">hvals myhash                        获取 myhash 键中所有字段的值</span></span></code></pre></div><h2 id="_1-4-3-list-列表" tabindex="-1">1.4.3 list（列表） <a class="header-anchor" href="#_1-4-3-list-列表" aria-label="Permalink to &quot;1.4.3 list（列表）&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406181535658.png" alt="1"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">增 </span></span>
<span class="line"><span style="color:#e1e4e8;">lpush mykey a b             若key不存在,创建该键及与其关联的List,依次插入a ,b， 若List类型的key存在,则插入value中</span></span>
<span class="line"><span style="color:#e1e4e8;">lpushx mykey2 e             若key不存在,此命令无效， 若key存在,则插入value中</span></span>
<span class="line"><span style="color:#e1e4e8;">linsert mykey before a a1   在 a 的前面插入新元素 a1</span></span>
<span class="line"><span style="color:#e1e4e8;">linsert mykey after e e2    在e 的后面插入新元素 e2</span></span>
<span class="line"><span style="color:#e1e4e8;">rpush mykey a b             在链表尾部先插入b,在插入a</span></span>
<span class="line"><span style="color:#e1e4e8;">rpushx mykey e              若key存在,在尾部插入e, 若key不存在,则无效</span></span>
<span class="line"><span style="color:#e1e4e8;">rpoplpush mykey mykey2      将mykey的尾部元素弹出,再插入到mykey2 的头部(原子性的操作)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删</span></span>
<span class="line"><span style="color:#e1e4e8;">del mykey               删除已有键 </span></span>
<span class="line"><span style="color:#e1e4e8;">lrem mykey 2 a              从头部开始找,按先后顺序,值为a的元素,删除数量为2个,若存在第3个,则不删除</span></span>
<span class="line"><span style="color:#e1e4e8;">ltrim mykey 0 2             从头开始,索引为0,1,2的3个元素,其余全部删除</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">改</span></span>
<span class="line"><span style="color:#e1e4e8;">lset mykey 1 e              从头开始, 将索引为1的元素值,设置为新值 e,若索引越界,则返回错误信息</span></span>
<span class="line"><span style="color:#e1e4e8;">rpoplpush mykey mykey       将 mykey 中的尾部元素移到其头部</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查</span></span>
<span class="line"><span style="color:#e1e4e8;">lrange mykey 0 -1       取链表中的全部元素，其中0表示第一个元素,-1表示最后一个元素。</span></span>
<span class="line"><span style="color:#e1e4e8;">lrange mykey 0 2            从头开始,取索引为0,1,2的元素</span></span>
<span class="line"><span style="color:#e1e4e8;">lrange mykey 0 0            从头开始,取第一个元素,从第0个开始,到第0个结束</span></span>
<span class="line"><span style="color:#e1e4e8;">lpop mykey                  获取头部元素,并且弹出头部元素,出栈</span></span>
<span class="line"><span style="color:#e1e4e8;">lindex mykey 6              从头开始,获取索引为6的元素 若下标越界,则返回nil</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">增 </span></span>
<span class="line"><span style="color:#24292e;">lpush mykey a b             若key不存在,创建该键及与其关联的List,依次插入a ,b， 若List类型的key存在,则插入value中</span></span>
<span class="line"><span style="color:#24292e;">lpushx mykey2 e             若key不存在,此命令无效， 若key存在,则插入value中</span></span>
<span class="line"><span style="color:#24292e;">linsert mykey before a a1   在 a 的前面插入新元素 a1</span></span>
<span class="line"><span style="color:#24292e;">linsert mykey after e e2    在e 的后面插入新元素 e2</span></span>
<span class="line"><span style="color:#24292e;">rpush mykey a b             在链表尾部先插入b,在插入a</span></span>
<span class="line"><span style="color:#24292e;">rpushx mykey e              若key存在,在尾部插入e, 若key不存在,则无效</span></span>
<span class="line"><span style="color:#24292e;">rpoplpush mykey mykey2      将mykey的尾部元素弹出,再插入到mykey2 的头部(原子性的操作)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删</span></span>
<span class="line"><span style="color:#24292e;">del mykey               删除已有键 </span></span>
<span class="line"><span style="color:#24292e;">lrem mykey 2 a              从头部开始找,按先后顺序,值为a的元素,删除数量为2个,若存在第3个,则不删除</span></span>
<span class="line"><span style="color:#24292e;">ltrim mykey 0 2             从头开始,索引为0,1,2的3个元素,其余全部删除</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">改</span></span>
<span class="line"><span style="color:#24292e;">lset mykey 1 e              从头开始, 将索引为1的元素值,设置为新值 e,若索引越界,则返回错误信息</span></span>
<span class="line"><span style="color:#24292e;">rpoplpush mykey mykey       将 mykey 中的尾部元素移到其头部</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查</span></span>
<span class="line"><span style="color:#24292e;">lrange mykey 0 -1       取链表中的全部元素，其中0表示第一个元素,-1表示最后一个元素。</span></span>
<span class="line"><span style="color:#24292e;">lrange mykey 0 2            从头开始,取索引为0,1,2的元素</span></span>
<span class="line"><span style="color:#24292e;">lrange mykey 0 0            从头开始,取第一个元素,从第0个开始,到第0个结束</span></span>
<span class="line"><span style="color:#24292e;">lpop mykey                  获取头部元素,并且弹出头部元素,出栈</span></span>
<span class="line"><span style="color:#24292e;">lindex mykey 6              从头开始,获取索引为6的元素 若下标越界,则返回nil</span></span></code></pre></div><h2 id="_1-4-4-set-集合" tabindex="-1">1.4.4 set（集合） <a class="header-anchor" href="#_1-4-4-set-集合" aria-label="Permalink to &quot;1.4.4 set（集合）&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406181535501.png" alt="1"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">增</span></span>
<span class="line"><span style="color:#e1e4e8;">sadd myset a b c  </span></span>
<span class="line"><span style="color:#e1e4e8;">若key不存在,创建该键及与其关联的set,依次插入a ,b,若key存在,则插入value中,若a 在myset中已经存在,则插入了 d 和 e 两个新成员。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删</span></span>
<span class="line"><span style="color:#e1e4e8;">spop myset              尾部的b被移出,事实上b并不是之前插入的第一个或最后一个成员</span></span>
<span class="line"><span style="color:#e1e4e8;">srem myset a d f        若f不存在, 移出 a、d ,并返回2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">改</span></span>
<span class="line"><span style="color:#e1e4e8;">smove myset myset2 a        将a从 myset 移到 myset2，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查</span></span>
<span class="line"><span style="color:#e1e4e8;">sismember myset a           判断 a 是否已经存在，返回值为 1 表示存在。</span></span>
<span class="line"><span style="color:#e1e4e8;">smembers myset          查看set中的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">scard myset             获取Set 集合中元素的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">srandmember myset       随机的返回某一成员</span></span>
<span class="line"><span style="color:#e1e4e8;">sdiff myset1 myset2 myset3      1和2得到一个结果,拿这个集合和3比较,获得每个独有的值</span></span>
<span class="line"><span style="color:#e1e4e8;">sdiffstore diffkey myset myset2 myset3      3个集和比较,获取独有的元素,并存入diffkey 关联的Set中</span></span>
<span class="line"><span style="color:#e1e4e8;">sinter myset myset2 myset3              获得3个集合中都有的元素</span></span>
<span class="line"><span style="color:#e1e4e8;">sinterstore interkey myset myset2 myset3  把交集存入interkey 关联的Set中</span></span>
<span class="line"><span style="color:#e1e4e8;">sunion myset myset2 myset3              获取3个集合中的成员的并集</span></span>
<span class="line"><span style="color:#e1e4e8;">sunionstore unionkey myset myset2 myset3  把并集存入unionkey 关联的Set中</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">增</span></span>
<span class="line"><span style="color:#24292e;">sadd myset a b c  </span></span>
<span class="line"><span style="color:#24292e;">若key不存在,创建该键及与其关联的set,依次插入a ,b,若key存在,则插入value中,若a 在myset中已经存在,则插入了 d 和 e 两个新成员。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删</span></span>
<span class="line"><span style="color:#24292e;">spop myset              尾部的b被移出,事实上b并不是之前插入的第一个或最后一个成员</span></span>
<span class="line"><span style="color:#24292e;">srem myset a d f        若f不存在, 移出 a、d ,并返回2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">改</span></span>
<span class="line"><span style="color:#24292e;">smove myset myset2 a        将a从 myset 移到 myset2，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查</span></span>
<span class="line"><span style="color:#24292e;">sismember myset a           判断 a 是否已经存在，返回值为 1 表示存在。</span></span>
<span class="line"><span style="color:#24292e;">smembers myset          查看set中的内容</span></span>
<span class="line"><span style="color:#24292e;">scard myset             获取Set 集合中元素的数量</span></span>
<span class="line"><span style="color:#24292e;">srandmember myset       随机的返回某一成员</span></span>
<span class="line"><span style="color:#24292e;">sdiff myset1 myset2 myset3      1和2得到一个结果,拿这个集合和3比较,获得每个独有的值</span></span>
<span class="line"><span style="color:#24292e;">sdiffstore diffkey myset myset2 myset3      3个集和比较,获取独有的元素,并存入diffkey 关联的Set中</span></span>
<span class="line"><span style="color:#24292e;">sinter myset myset2 myset3              获得3个集合中都有的元素</span></span>
<span class="line"><span style="color:#24292e;">sinterstore interkey myset myset2 myset3  把交集存入interkey 关联的Set中</span></span>
<span class="line"><span style="color:#24292e;">sunion myset myset2 myset3              获取3个集合中的成员的并集</span></span>
<span class="line"><span style="color:#24292e;">sunionstore unionkey myset myset2 myset3  把并集存入unionkey 关联的Set中</span></span></code></pre></div><h2 id="_1-4-5-sorted-set-有序集合" tabindex="-1">1.4.5 sorted set（有序集合） <a class="header-anchor" href="#_1-4-5-sorted-set-有序集合" aria-label="Permalink to &quot;1.4.5 sorted set（有序集合）&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406181535416.png" alt="3"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">增</span></span>
<span class="line"><span style="color:#e1e4e8;">zadd myzset 2 &quot;two&quot; 3 &quot;three&quot;           添加两个分数分别是 2 和 3 的两个成员</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删</span></span>
<span class="line"><span style="color:#e1e4e8;">zrem myzset one two                 删除多个成员变量,返回删除的数量</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">改</span></span>
<span class="line"><span style="color:#e1e4e8;">zincrby myzset 2 one                将成员 one 的分数增加 2，并返回该成员更新后的分数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查 </span></span>
<span class="line"><span style="color:#e1e4e8;">zrange myzset 0 -1 WITHSCORES       返回所有成员和分数,不加WITHSCORES,只返回成员</span></span>
<span class="line"><span style="color:#e1e4e8;">zrank myzset one                获取成员one在Sorted-Set中的位置索引值。0表示第一个位置</span></span>
<span class="line"><span style="color:#e1e4e8;">zcard myzset                        获取 myzset 键中成员的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">zcount myzset 1 2                   获取分数满足表达式 1 &lt;= score &lt;= 2 的成员的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">zscore myzset three                 获取成员 three 的分数</span></span>
<span class="line"><span style="color:#e1e4e8;">zrangebyscore myzset  1 2               获取分数满足表达式 1 &lt; score &lt;= 2 的成员</span></span>
<span class="line"><span style="color:#e1e4e8;">#-inf 表示第一个成员，+inf最后一个成员</span></span>
<span class="line"><span style="color:#e1e4e8;">#limit限制关键字</span></span>
<span class="line"><span style="color:#e1e4e8;">#2  3  是索引号</span></span>
<span class="line"><span style="color:#e1e4e8;">zrangebyscore myzset -inf +inf limit 2 3  返回索引是2和3的成员</span></span>
<span class="line"><span style="color:#e1e4e8;">zremrangebyscore myzset 1 2         删除分数 1&lt;= score &lt;= 2 的成员，并返回实际删除的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">zremrangebyrank myzset 0 1              删除位置索引满足表达式 0 &lt;= rank &lt;= 1 的成员</span></span>
<span class="line"><span style="color:#e1e4e8;">zrevrange myzset 0 -1 WITHSCORES        按位置索引从高到低,获取所有成员和分数</span></span>
<span class="line"><span style="color:#e1e4e8;">#原始成员:位置索引从小到大</span></span>
<span class="line"><span style="color:#e1e4e8;">      one  0  </span></span>
<span class="line"><span style="color:#e1e4e8;">      two  1</span></span>
<span class="line"><span style="color:#e1e4e8;">#执行顺序:把索引反转</span></span>
<span class="line"><span style="color:#e1e4e8;">      位置索引:从大到小</span></span>
<span class="line"><span style="color:#e1e4e8;">      one 1</span></span>
<span class="line"><span style="color:#e1e4e8;">      two 0</span></span>
<span class="line"><span style="color:#e1e4e8;">#输出结果: two  </span></span>
<span class="line"><span style="color:#e1e4e8;">       one</span></span>
<span class="line"><span style="color:#e1e4e8;">zrevrange myzset 1 3                获取位置索引,为1,2,3的成员</span></span>
<span class="line"><span style="color:#e1e4e8;">#相反的顺序:从高到低的顺序</span></span>
<span class="line"><span style="color:#e1e4e8;">zrevrangebyscore myzset 3 0             获取分数 3&gt;=score&gt;=0的成员并以相反的顺序输出</span></span>
<span class="line"><span style="color:#e1e4e8;">zrevrangebyscore myzset 4 0 limit 1 2    获取索引是1和2的成员,并反转位置索引</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">增</span></span>
<span class="line"><span style="color:#24292e;">zadd myzset 2 &quot;two&quot; 3 &quot;three&quot;           添加两个分数分别是 2 和 3 的两个成员</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删</span></span>
<span class="line"><span style="color:#24292e;">zrem myzset one two                 删除多个成员变量,返回删除的数量</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">改</span></span>
<span class="line"><span style="color:#24292e;">zincrby myzset 2 one                将成员 one 的分数增加 2，并返回该成员更新后的分数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查 </span></span>
<span class="line"><span style="color:#24292e;">zrange myzset 0 -1 WITHSCORES       返回所有成员和分数,不加WITHSCORES,只返回成员</span></span>
<span class="line"><span style="color:#24292e;">zrank myzset one                获取成员one在Sorted-Set中的位置索引值。0表示第一个位置</span></span>
<span class="line"><span style="color:#24292e;">zcard myzset                        获取 myzset 键中成员的数量</span></span>
<span class="line"><span style="color:#24292e;">zcount myzset 1 2                   获取分数满足表达式 1 &lt;= score &lt;= 2 的成员的数量</span></span>
<span class="line"><span style="color:#24292e;">zscore myzset three                 获取成员 three 的分数</span></span>
<span class="line"><span style="color:#24292e;">zrangebyscore myzset  1 2               获取分数满足表达式 1 &lt; score &lt;= 2 的成员</span></span>
<span class="line"><span style="color:#24292e;">#-inf 表示第一个成员，+inf最后一个成员</span></span>
<span class="line"><span style="color:#24292e;">#limit限制关键字</span></span>
<span class="line"><span style="color:#24292e;">#2  3  是索引号</span></span>
<span class="line"><span style="color:#24292e;">zrangebyscore myzset -inf +inf limit 2 3  返回索引是2和3的成员</span></span>
<span class="line"><span style="color:#24292e;">zremrangebyscore myzset 1 2         删除分数 1&lt;= score &lt;= 2 的成员，并返回实际删除的数量</span></span>
<span class="line"><span style="color:#24292e;">zremrangebyrank myzset 0 1              删除位置索引满足表达式 0 &lt;= rank &lt;= 1 的成员</span></span>
<span class="line"><span style="color:#24292e;">zrevrange myzset 0 -1 WITHSCORES        按位置索引从高到低,获取所有成员和分数</span></span>
<span class="line"><span style="color:#24292e;">#原始成员:位置索引从小到大</span></span>
<span class="line"><span style="color:#24292e;">      one  0  </span></span>
<span class="line"><span style="color:#24292e;">      two  1</span></span>
<span class="line"><span style="color:#24292e;">#执行顺序:把索引反转</span></span>
<span class="line"><span style="color:#24292e;">      位置索引:从大到小</span></span>
<span class="line"><span style="color:#24292e;">      one 1</span></span>
<span class="line"><span style="color:#24292e;">      two 0</span></span>
<span class="line"><span style="color:#24292e;">#输出结果: two  </span></span>
<span class="line"><span style="color:#24292e;">       one</span></span>
<span class="line"><span style="color:#24292e;">zrevrange myzset 1 3                获取位置索引,为1,2,3的成员</span></span>
<span class="line"><span style="color:#24292e;">#相反的顺序:从高到低的顺序</span></span>
<span class="line"><span style="color:#24292e;">zrevrangebyscore myzset 3 0             获取分数 3&gt;=score&gt;=0的成员并以相反的顺序输出</span></span>
<span class="line"><span style="color:#24292e;">zrevrangebyscore myzset 4 0 limit 1 2    获取索引是1和2的成员,并反转位置索引</span></span></code></pre></div><h1 id="_1-5-消息模式" tabindex="-1">1.5 消息模式 <a class="header-anchor" href="#_1-5-消息模式" aria-label="Permalink to &quot;1.5 消息模式&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Redis发布消息通常有两种模式：</span></span>
<span class="line"><span style="color:#e1e4e8;">• 队列模式（queuing）</span></span>
<span class="line"><span style="color:#e1e4e8;">• 发布-订阅模式(publish-subscribe)</span></span>
<span class="line"><span style="color:#e1e4e8;">任务队列：顾名思义，就是“传递消息的队列”。与任务队列进行交互的实体有两类，一类是生产者（producer），另一类则是消费者（consumer）。生产者将需要处理的任务放入任务队列中，而消费者则不断地从任务独立中读入任务信息并执行。</span></span>
<span class="line"><span style="color:#e1e4e8;">任务队列的好处：</span></span>
<span class="line"><span style="color:#e1e4e8;">• 松耦合。</span></span>
<span class="line"><span style="color:#e1e4e8;">生产者和消费者只需按照约定的任务描述格式，进行编写代码。</span></span>
<span class="line"><span style="color:#e1e4e8;">• 易于扩展。</span></span>
<span class="line"><span style="color:#e1e4e8;">多消费者模式下，消费者可以分布在多个不同的服务器中，由此降低单台服务器的负载</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Redis发布消息通常有两种模式：</span></span>
<span class="line"><span style="color:#24292e;">• 队列模式（queuing）</span></span>
<span class="line"><span style="color:#24292e;">• 发布-订阅模式(publish-subscribe)</span></span>
<span class="line"><span style="color:#24292e;">任务队列：顾名思义，就是“传递消息的队列”。与任务队列进行交互的实体有两类，一类是生产者（producer），另一类则是消费者（consumer）。生产者将需要处理的任务放入任务队列中，而消费者则不断地从任务独立中读入任务信息并执行。</span></span>
<span class="line"><span style="color:#24292e;">任务队列的好处：</span></span>
<span class="line"><span style="color:#24292e;">• 松耦合。</span></span>
<span class="line"><span style="color:#24292e;">生产者和消费者只需按照约定的任务描述格式，进行编写代码。</span></span>
<span class="line"><span style="color:#24292e;">• 易于扩展。</span></span>
<span class="line"><span style="color:#24292e;">多消费者模式下，消费者可以分布在多个不同的服务器中，由此降低单台服务器的负载</span></span></code></pre></div><h1 id="_1-6-redis中事物锁机制" tabindex="-1">1.6 Redis中事物锁机制 <a class="header-anchor" href="#_1-6-redis中事物锁机制" aria-label="Permalink to &quot;1.6 Redis中事物锁机制&quot;">​</a></h1><h2 id="_1-6-1-悲观锁" tabindex="-1">1.6.1 悲观锁 <a class="header-anchor" href="#_1-6-1-悲观锁" aria-label="Permalink to &quot;1.6.1 悲观锁&quot;">​</a></h2><p>12306买票，我选择了票，不管有没有付钱这张票都是我的，我把它锁上，别人就看不到了</p><h2 id="_1-6-2-乐观锁" tabindex="-1">1.6.2 乐观锁 <a class="header-anchor" href="#_1-6-2-乐观锁" aria-label="Permalink to &quot;1.6.2 乐观锁&quot;">​</a></h2><p>类似于商品秒杀，你选择之后，别人还是能看到，被人还是能付钱，谁先付钱是谁的</p><ul><li>写入Redis1000万数据</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /tmp/test1.txt | redis-cli -a 111111 --pipe</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /tmp/test1.txt | redis-cli -a 111111 --pipe</span></span></code></pre></div>`,50),o=[p];function t(c,i,y,r,d,h){return e(),n("div",null,o)}const u=s(l,[["render",t]]);export{k as __pageData,u as default};
