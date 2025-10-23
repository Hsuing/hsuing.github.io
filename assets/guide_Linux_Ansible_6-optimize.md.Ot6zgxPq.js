import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.Ansible优化","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Ansible/6-optimize.md","filePath":"guide/Linux/Ansible/6-optimize.md","lastUpdated":1730456937000}'),l={name:"guide/Linux/Ansible/6-optimize.md"},p=e(`<h1 id="_1-ansible优化" tabindex="-1">1.Ansible优化 <a class="header-anchor" href="#_1-ansible优化" aria-label="Permalink to &quot;1.Ansible优化&quot;">​</a></h1><h2 id="_1-1-关闭facts" tabindex="-1">1.1 关闭facts <a class="header-anchor" href="#_1-1-关闭facts" aria-label="Permalink to &quot;1.1 关闭facts&quot;">​</a></h2><p>只需要在playbook文件中加上<code>&quot;gather_facts: False&quot;</code> 或者 <code>&quot;gather_facts: No&quot;</code>即可</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">hosts</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">remote_user</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">gather_facts</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">False</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">tasks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">this is a test</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">shell</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">echo &quot;haha&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">hosts</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">remote_user</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">gather_facts</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">False</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">tasks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">this is a test</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">shell</span><span style="color:#24292E;">: </span><span style="color:#032F62;">echo &quot;haha&quot;</span></span></code></pre></div><h2 id="_1-2-开启ssh-pipelining" tabindex="-1">1.2 开启SSH pipelining <a class="header-anchor" href="#_1-2-开启ssh-pipelining" aria-label="Permalink to &quot;1.2 开启SSH pipelining&quot;">​</a></h2><p>pipeline是openssh的一个特性，<code>ssh pipelining</code> 是一个加速Ansible执行速度的简单方法。</p><p>在ansible执行每个任务的整个流程中，有一个过程是将临时任务文件put到远程的ansible客户机上，然后通过<code>ssh</code>连接过去远程执行这个任务。 如果开启了pipelining，一个任务的所有动作都在一个<code>ssh</code>会话中完成，也会省去<code>sftp</code>到远端的过程，它会直接将要执行的任务在<code>ssh</code>会话中进行。</p><p>ssh<code>pipelining 默认是关闭!!!!之所以默认关闭是为了兼容不同的</code>sudo<code>配置，主要是 requiretty 选项。如果不使用</code>sudo<code>，建议开启！！！ 打开此选项可以减少ansible执行没有传输时</code>ssh<code>在被控机器上执行任务的连接数。 不过，如果使用</code>sudo<code>，必须关闭requiretty选项。</code>修改/etc/ansible/ansible.cfg 文件可以开启pipelining</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ vim /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">........</span></span>
<span class="line"><span style="color:#e1e4e8;">pipelining = True</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ vim /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#24292e;">........</span></span>
<span class="line"><span style="color:#24292e;">pipelining = True</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p><strong>如果在ansible中使用<code>sudo</code>命令的话(<code>ssh user@host sudo cmd</code>)，需要在被控节点的<code>/etc/sudoers</code>中禁用<code>&quot;requiretty&quot;</code>!!!!</strong></p><p>之所以要设置<code>/etc/sudoers</code>中的requiretty，是因为<code>ssh</code>远程执行命令时，它的环境是非登录式非交互式shell，默认不会分配<code>tty</code>，没有<code>tty</code>，<code>ssh</code>的<code>sudo</code>就无法关闭密码回显(使用 &quot;-tt&quot;选项强制SSH分配<code>tty</code>)。所以出于安全考虑，<code>/etc/sudoers</code>中默认是开启requiretty的，它要求只有拥有<code>tty</code>的用户才能使用<code>sudo</code>，也就是说<code>ssh</code>连接过去不允许执行<code>sudo</code>。 可以通过visudo编辑配置文件，注释该选项来禁用它。</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ grep requiretty /etc/sudoers　　</span></span>
<span class="line"><span style="color:#e1e4e8;"># Defaults  requiretty</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ grep requiretty /etc/sudoers　　</span></span>
<span class="line"><span style="color:#24292e;"># Defaults  requiretty</span></span></code></pre></div><h2 id="_1-3-开启长连接" tabindex="-1">1.3 开启长连接 <a class="header-anchor" href="#_1-3-开启长连接" aria-label="Permalink to &quot;1.3 开启长连接&quot;">​</a></h2><p>Ansible中控机的SSH -V版本高于5.6时, 就可以使用ControlPersist来提高<code>ssh</code>连接速度，从而提高ansible执行效率</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ vim /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">..........</span></span>
<span class="line"><span style="color:#e1e4e8;">ssh_args = -C -o ControlMaster=auto -o ControlPersist=5d</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：ConrolPersist=5d, 这个参数是设置整个长连接保持时间为5天。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ vim /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#24292e;">..........</span></span>
<span class="line"><span style="color:#24292e;">ssh_args = -C -o ControlMaster=auto -o ControlPersist=5d</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 注意：ConrolPersist=5d, 这个参数是设置整个长连接保持时间为5天。</span></span></code></pre></div><h2 id="_1-4-取消交互" tabindex="-1">1.4 取消交互 <a class="header-anchor" href="#_1-4-取消交互" aria-label="Permalink to &quot;1.4 取消交互&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#79B8FF;">........</span></span>
<span class="line"><span style="color:#B392F0;">host_key_checking</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">False</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># 打开注释即可</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 取消ssh的yes和no的交互：</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/.ssh/config</span></span>
<span class="line"><span style="color:#B392F0;">UserKnownHostsFile</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/dev/null</span></span>
<span class="line"><span style="color:#B392F0;">ConnectTimeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span></span>
<span class="line"><span style="color:#B392F0;">StrictHostKeyChecking</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">no</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#B392F0;">或者直接ssh时增加一个参数</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ssh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">StrictHostKeyChecking=no</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p22</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root@10.4.7.101</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#005CC5;">........</span></span>
<span class="line"><span style="color:#6F42C1;">host_key_checking</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">False</span><span style="color:#24292E;">          </span><span style="color:#6A737D;"># 打开注释即可</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 取消ssh的yes和no的交互：</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/.ssh/config</span></span>
<span class="line"><span style="color:#6F42C1;">UserKnownHostsFile</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/dev/null</span></span>
<span class="line"><span style="color:#6F42C1;">ConnectTimeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span></span>
<span class="line"><span style="color:#6F42C1;">StrictHostKeyChecking</span><span style="color:#24292E;"> </span><span style="color:#032F62;">no</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">或者直接ssh时增加一个参数</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ssh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">StrictHostKeyChecking=no</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p22</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root@10.4.7.101</span></span></code></pre></div><h1 id="_2-完整配置" tabindex="-1">2.完整配置 <a class="header-anchor" href="#_2-完整配置" aria-label="Permalink to &quot;2.完整配置&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"># config file for ansible -- http://ansible.com/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[defaults]</span></span>
<span class="line"><span style="color:#e1e4e8;">forks = 20</span></span>
<span class="line"><span style="color:#e1e4e8;">host_key_checking = False</span></span>
<span class="line"><span style="color:#e1e4e8;">remote_user = root</span></span>
<span class="line"><span style="color:#e1e4e8;">roles_path = roles/</span></span>
<span class="line"><span style="color:#e1e4e8;">gathering = smart</span></span>
<span class="line"><span style="color:#e1e4e8;">fact_caching = jsonfile</span></span>
<span class="line"><span style="color:#e1e4e8;">fact_caching_connection = $HOME/ansible/facts</span></span>
<span class="line"><span style="color:#e1e4e8;">fact_caching_timeout = 600</span></span>
<span class="line"><span style="color:#e1e4e8;">log_path = $HOME/ansible.log</span></span>
<span class="line"><span style="color:#e1e4e8;">nocows = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">callback_whitelist = profile_tasks</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[privilege_escalation]</span></span>
<span class="line"><span style="color:#e1e4e8;">become = False</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[ssh_connection]</span></span>
<span class="line"><span style="color:#e1e4e8;">ssh_args = -o ControlMaster=auto -o ControlPersist=600s -o ServerAliveInterval=60</span></span>
<span class="line"><span style="color:#e1e4e8;">control_path = %(directory)s/%%h-%%r</span></span>
<span class="line"><span style="color:#e1e4e8;">pipelining = True</span></span>
<span class="line"><span style="color:#e1e4e8;">timeout = 10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /etc/ansible/ansible.cfg</span></span>
<span class="line"><span style="color:#24292e;"># config file for ansible -- http://ansible.com/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[defaults]</span></span>
<span class="line"><span style="color:#24292e;">forks = 20</span></span>
<span class="line"><span style="color:#24292e;">host_key_checking = False</span></span>
<span class="line"><span style="color:#24292e;">remote_user = root</span></span>
<span class="line"><span style="color:#24292e;">roles_path = roles/</span></span>
<span class="line"><span style="color:#24292e;">gathering = smart</span></span>
<span class="line"><span style="color:#24292e;">fact_caching = jsonfile</span></span>
<span class="line"><span style="color:#24292e;">fact_caching_connection = $HOME/ansible/facts</span></span>
<span class="line"><span style="color:#24292e;">fact_caching_timeout = 600</span></span>
<span class="line"><span style="color:#24292e;">log_path = $HOME/ansible.log</span></span>
<span class="line"><span style="color:#24292e;">nocows = 1</span></span>
<span class="line"><span style="color:#24292e;">callback_whitelist = profile_tasks</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[privilege_escalation]</span></span>
<span class="line"><span style="color:#24292e;">become = False</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[ssh_connection]</span></span>
<span class="line"><span style="color:#24292e;">ssh_args = -o ControlMaster=auto -o ControlPersist=600s -o ServerAliveInterval=60</span></span>
<span class="line"><span style="color:#24292e;">control_path = %(directory)s/%%h-%%r</span></span>
<span class="line"><span style="color:#24292e;">pipelining = True</span></span>
<span class="line"><span style="color:#24292e;">timeout = 10</span></span></code></pre></div>`,18),o=[p];function c(t,r,i,y,d,h){return n(),a("div",null,o)}const g=s(l,[["render",c]]);export{u as __pageData,g as default};
