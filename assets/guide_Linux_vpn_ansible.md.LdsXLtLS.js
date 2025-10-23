import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"Playbooks","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/ansible.md","filePath":"guide/Linux/vpn/ansible.md","lastUpdated":1701595065000}'),l={name:"guide/Linux/vpn/ansible.md"},p=n(`<h2 id="如何使用ansible-freeipa" tabindex="-1">如何使用ansible-freeipa <a class="header-anchor" href="#如何使用ansible-freeipa" aria-label="Permalink to &quot;如何使用ansible-freeipa&quot;">​</a></h2><p><strong>GIT repo</strong></p><p>目前最简单的方法是直接从github克隆控制器上的这个存储库，并从ansible-freeipa目录开始部署：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git clone https://github.com/freeipa/ansible-freeipa.git</span></span>
<span class="line"><span style="color:#e1e4e8;">cd ansible-freeipa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git clone https://github.com/freeipa/ansible-freeipa.git</span></span>
<span class="line"><span style="color:#24292e;">cd ansible-freeipa</span></span></code></pre></div><p>您可以直接在git repo的顶层目录中使用角色，但是要想使用plugins子目录中的管理模块，您必须调整<code>ansible.cfg</code>或为角色、模块或目录创建链接。</p><p>您可以改编ansible.cfg：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">roles_path   = /my/dir/ansible-freeipa/roles</span></span>
<span class="line"><span style="color:#e1e4e8;">library      = /my/dir/ansible-freeipa/plugins/modules</span></span>
<span class="line"><span style="color:#e1e4e8;">module_utils = /my/dir/ansible-freeipa/plugins/module_utils</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">roles_path   = /my/dir/ansible-freeipa/roles</span></span>
<span class="line"><span style="color:#24292e;">library      = /my/dir/ansible-freeipa/plugins/modules</span></span>
<span class="line"><span style="color:#24292e;">module_utils = /my/dir/ansible-freeipa/plugins/module_utils</span></span></code></pre></div><p>或者您可以链接目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-freeipa/roles to ~/.ansible/</span></span>
<span class="line"><span style="color:#e1e4e8;">ansible-freeipa/plugins/modules to ~/.ansible/plugins/</span></span>
<span class="line"><span style="color:#e1e4e8;">ansible-freeipa/plugins/module_utils to ~/.ansible/plugins/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-freeipa/roles to ~/.ansible/</span></span>
<span class="line"><span style="color:#24292e;">ansible-freeipa/plugins/modules to ~/.ansible/plugins/</span></span>
<span class="line"><span style="color:#24292e;">ansible-freeipa/plugins/module_utils to ~/.ansible/plugins/</span></span></code></pre></div><p><strong>RPM package</strong></p><p>Fedora29+有RPM软件包。它们将角色和模块安装到<code>roles</code>、<code>plugins/modules</code>和<code>plugins/module_utils</code>的全局Ansible目录中。因此，是否可以使用角色和模块而不必像示例剧本中那样修改名称。</p><p><strong>Ansible galaxy</strong></p><p>此命令将从galaxy获取整个集合：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-galaxy collection install freeipa.ansible_freeipa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-galaxy collection install freeipa.ansible_freeipa</span></span></code></pre></div><p>只有ansible2.9+支持使用ansible-galaxy命令安装集合。</p><p>mazer工具可用于安装ansible 2.8的集合：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mazer install freeipa.ansible_freeipa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mazer install freeipa.ansible_freeipa</span></span></code></pre></div><p>Ansible galaxy不支持在名称中使用破折号（&#39;-&#39;），并将其自动替换为下划线(&#39;_&#39;)。因此名称是<code>ansible_freeipa</code>。ansible_freeipa集合将被放置在<code>~/.ansible/collections/ansible_collections/freeipa/ansible_freeipa</code>目录中，在该目录中可以自动为该用户找到它。</p><p><code>modules</code>和<code>module_utils</code>的集合前缀所需的调整将在galaxy的ansible-freeipa版本<code>0.1.6</code>中完成。</p><h2 id="ansible库存文件" tabindex="-1">Ansible库存文件 <a class="header-anchor" href="#ansible库存文件" aria-label="Permalink to &quot;Ansible库存文件&quot;">​</a></h2><p>库存文件中最重要的部分是节点的定义、设置和管理模块。请记住使用Ansible vault作为密码。这里的示例没有使用vault来提高可读性。</p><p><strong>Master server</strong></p><p>主服务器在<code>[ipaserver]</code>组中定义：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaserver]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaserver]</span></span>
<span class="line"><span style="color:#24292e;">ipaserver.test.local</span></span></code></pre></div><p>有些变量需要设置为<code>domain</code>、<code>realm</code>、<code>admin password</code>和<code>dm password</code>。这些可以在<code>[ipaserver:vars]</code>部分中设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_realm=TEST.LOCAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_realm=TEST.LOCAL</span></span></code></pre></div><p>默认情况下，管理原则是<code>admin</code>。如果需要更改，请设置<code>ipaadmin_principal</code>。</p><p>您还可以在此处添加更多设置，例如启用DNS服务器或设置auto-forwarders：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_setup_dns=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_auto_forwarders=yes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_setup_dns=yes</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_auto_forwarders=yes</span></span></code></pre></div><p>但也要跳过包安装或防火墙配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_install_packages=no</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_setup_firewalld=no</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaserver:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_install_packages=no</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_setup_firewalld=no</span></span></code></pre></div><p>默认情况下，软件包的安装和防火墙的配置都是启用的。注意，仅仅屏蔽systemd firewalld服务来跳过firewalld配置是不够的。您需要将变量设置为<code>no</code>。</p><p>有关更多服务器设置，请查看服务器角色文档。</p><p><strong>Replica</strong></p><p>副本在<code>[ipareplicas]</code>组中定义：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplicas]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica2.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplicas]</span></span>
<span class="line"><span style="color:#24292e;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipareplica2.test.local</span></span></code></pre></div><p>如果主服务器已经部署，并且有DNS txt记录可以auto-detect服务器，那么不需要为副本部署设置<code>domain</code>或<code>realm</code>。可能需要主服务器的拓扑结构，但可能需要它的主副本集。如果需要这样做，可以在<code>[ipareplicas:vars]</code>部分中设置它，如果它将应用于<code>[ipareplicas]</code>组中的所有副本，或者也可以在<code>[ipareplicas]</code>组中的每个副本设置此选项：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplicas]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica2.test.local ipareplica_servers=ipareplica1.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplicas]</span></span>
<span class="line"><span style="color:#24292e;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipareplica2.test.local ipareplica_servers=ipareplica1.test.local</span></span></code></pre></div><p>这将从<code>ipaserver.test.local &lt;- ipareplica1.test.local &lt;- ipareplica2.test.local</code>创建一个链。</p><p>如果需要为一个副本设置多个服务器（对于回退etc.)），只需为<code>ipareplica_servers</code>使用逗号分隔的列表：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplicas_tier1]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[ipareplicas_tier2]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica2.test.local ipareplica_servers=ipareplica1.test.local,ipaserver.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplicas_tier1]</span></span>
<span class="line"><span style="color:#24292e;">ipareplica1.test.local</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[ipareplicas_tier2]</span></span>
<span class="line"><span style="color:#24292e;">ipareplica2.test.local ipareplica_servers=ipareplica1.test.local,ipaserver.test.local</span></span></code></pre></div><p>{69在第一个主条目中使用@69。</p><p>在这种情况下，您需要在行动手册中有单独的任务，首先从第1层部署副本，然后从第2层部署副本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">- name: Playbook to configure IPA replicas (tier1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  hosts: ipareplicas_tier1</span></span>
<span class="line"><span style="color:#e1e4e8;">  become: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  roles:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - role: ipareplica</span></span>
<span class="line"><span style="color:#e1e4e8;">    state: present</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- name: Playbook to configure IPA replicas (tier2)</span></span>
<span class="line"><span style="color:#e1e4e8;">  hosts: ipareplicas_tier2</span></span>
<span class="line"><span style="color:#e1e4e8;">  become: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  roles:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - role: ipareplica</span></span>
<span class="line"><span style="color:#e1e4e8;">    state: present</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">- name: Playbook to configure IPA replicas (tier1)</span></span>
<span class="line"><span style="color:#24292e;">  hosts: ipareplicas_tier1</span></span>
<span class="line"><span style="color:#24292e;">  become: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  roles:</span></span>
<span class="line"><span style="color:#24292e;">  - role: ipareplica</span></span>
<span class="line"><span style="color:#24292e;">    state: present</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- name: Playbook to configure IPA replicas (tier2)</span></span>
<span class="line"><span style="color:#24292e;">  hosts: ipareplicas_tier2</span></span>
<span class="line"><span style="color:#24292e;">  become: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  roles:</span></span>
<span class="line"><span style="color:#24292e;">  - role: ipareplica</span></span>
<span class="line"><span style="color:#24292e;">    state: present</span></span></code></pre></div><p>您可以为复制副本部署添加设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplicas:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_realm=TEST.LOCAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplicas:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_realm=TEST.LOCAL</span></span></code></pre></div><p>您还可以在此处添加更多设置，例如设置DNS或启用auto-forwarders：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplica:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_setup_dns=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_auto_forwarders=yes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplica:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_setup_dns=yes</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_auto_forwarders=yes</span></span></code></pre></div><p>如果需要跳过包安装或防火墙配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipareplicas:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica_install_packages=no</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplica_setup_firewalld=no</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipareplicas:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipareplica_install_packages=no</span></span>
<span class="line"><span style="color:#24292e;">ipareplica_setup_firewalld=no</span></span></code></pre></div><p>默认情况下，软件包的安装和防火墙的配置都是启用的。注意，仅仅屏蔽systemd firewalld服务来跳过firewalld配置是不够的。您需要将变量设置为<code>no</code>。</p><p>有关更多副本设置，请查看副本角色文档。</p><p><strong>Client</strong></p><p>客户端在[ipaclients]组中定义：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaclients]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient2.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient3.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient4.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaclients]</span></span>
<span class="line"><span style="color:#24292e;">ipaclient1.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient2.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient3.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient4.test.local</span></span></code></pre></div><p>对于简单的设置或在定义的客户端环境中，可能不需要为副本部署设置域或域。但由于拓扑结构的原因，可能需要设置客户机的主服务器。如果需要，可以在[i]中设置打包机：变量}部分如果它将应用于[ipaclients]组中的所有客户端，或者可以为[ipaclients]组中的每个客户端设置此选项：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaclients]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient1.test.local ipaclient_servers=ipareplica1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient2.test.local ipaclient_servers=ipareplica1.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient3.test.local ipaclient_servers=ipareplica2.test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient4.test.local ipaclient_servers=ipareplica2.test.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaclients]</span></span>
<span class="line"><span style="color:#24292e;">ipaclient1.test.local ipaclient_servers=ipareplica1.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient2.test.local ipaclient_servers=ipareplica1.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient3.test.local ipaclient_servers=ipareplica2.test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaclient4.test.local ipaclient_servers=ipareplica2.test.local</span></span></code></pre></div><p>如果您需要为一个客户机设置多个服务器（对于回退etc.)），只需对<code>ipaclient_servers</code>使用逗号分隔的列表。</p><p>可以为客户端部署添加设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaclients:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_realm=TEST.LOCAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaclients:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_realm=TEST.LOCAL</span></span></code></pre></div><p>为了增强安全性，可以使用auto-generatedone-time-password（OTP）。这将在使用（第一个）服务器的控制器上生成。为此，需要在控制器上安装Python gssapi绑定。要生成one-time-password：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipaclients:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclient_use_otp=yes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipaclients:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaclient_use_otp=yes</span></span></code></pre></div><p>有关更多客户端设置，请查看客户端角色文档。</p><p><strong>Cluster</strong></p><p>{<code>[ipaserver]</code>如果你想在13093上定义一个新的@93组，}那么它将是一个好的<code>[ipaclients]</code>组。这样就不需要为单个组设置<code>domain</code>、<code>realm</code>、<code>admin password</code>或<code>dm password</code>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ipacluster:children]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver</span></span>
<span class="line"><span style="color:#e1e4e8;">ipareplicas</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaclients</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[ipacluster:vars]</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaserver_realm=TEST.LOCAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ipacluster:children]</span></span>
<span class="line"><span style="color:#24292e;">ipaserver</span></span>
<span class="line"><span style="color:#24292e;">ipareplicas</span></span>
<span class="line"><span style="color:#24292e;">ipaclients</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[ipacluster:vars]</span></span>
<span class="line"><span style="color:#24292e;">ipaadmin_password=ADMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipadm_password=DMPassword1</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_domain=test.local</span></span>
<span class="line"><span style="color:#24292e;">ipaserver_realm=TEST.LOCAL</span></span></code></pre></div><p>所有这些设置都可以在<code>[ipaserver]</code>、<code>[ipareplicas]</code>和<code>[ipaclient]</code>组中使用。</p><p><strong>Topology</strong></p><p>有了这个剧本，就可以使用<code>ipatopologysegment</code>模块添加拓扑段的列表。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">- name: Add topology segments</span></span>
<span class="line"><span style="color:#e1e4e8;">  hosts: ipaserver</span></span>
<span class="line"><span style="color:#e1e4e8;">  become: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  gather_facts: false</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  vars:</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipaadmin_password: password1</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipatopology_segments:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - {suffix: domain, left: replica1.test.local, right: replica2.test.local}</span></span>
<span class="line"><span style="color:#e1e4e8;">    - {suffix: domain, left: replica2.test.local, right: replica3.test.local}</span></span>
<span class="line"><span style="color:#e1e4e8;">    - {suffix: domain, left: replica3.test.local, right: replica4.test.local}</span></span>
<span class="line"><span style="color:#e1e4e8;">    - {suffix: domain+ca, left: replica4.test.local, right: replica1.test.local}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  tasks:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - name: Add topology segment</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipatopologysegment:</span></span>
<span class="line"><span style="color:#e1e4e8;">      password: &quot;{{ ipaadmin_password }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      suffix: &quot;{{ item.suffix }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      name: &quot;{{ item.name | default(omit) }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      left: &quot;{{ item.left }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      right: &quot;{{ item.right }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      #state: present</span></span>
<span class="line"><span style="color:#e1e4e8;">      #state: absent</span></span>
<span class="line"><span style="color:#e1e4e8;">      #state: checked</span></span>
<span class="line"><span style="color:#e1e4e8;">      state: reinitialized</span></span>
<span class="line"><span style="color:#e1e4e8;">    loop: &quot;{{ ipatopology_segments | default([]) }}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">- name: Add topology segments</span></span>
<span class="line"><span style="color:#24292e;">  hosts: ipaserver</span></span>
<span class="line"><span style="color:#24292e;">  become: true</span></span>
<span class="line"><span style="color:#24292e;">  gather_facts: false</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  vars:</span></span>
<span class="line"><span style="color:#24292e;">    ipaadmin_password: password1</span></span>
<span class="line"><span style="color:#24292e;">    ipatopology_segments:</span></span>
<span class="line"><span style="color:#24292e;">    - {suffix: domain, left: replica1.test.local, right: replica2.test.local}</span></span>
<span class="line"><span style="color:#24292e;">    - {suffix: domain, left: replica2.test.local, right: replica3.test.local}</span></span>
<span class="line"><span style="color:#24292e;">    - {suffix: domain, left: replica3.test.local, right: replica4.test.local}</span></span>
<span class="line"><span style="color:#24292e;">    - {suffix: domain+ca, left: replica4.test.local, right: replica1.test.local}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  tasks:</span></span>
<span class="line"><span style="color:#24292e;">  - name: Add topology segment</span></span>
<span class="line"><span style="color:#24292e;">    ipatopologysegment:</span></span>
<span class="line"><span style="color:#24292e;">      password: &quot;{{ ipaadmin_password }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">      suffix: &quot;{{ item.suffix }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">      name: &quot;{{ item.name | default(omit) }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">      left: &quot;{{ item.left }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">      right: &quot;{{ item.right }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">      #state: present</span></span>
<span class="line"><span style="color:#24292e;">      #state: absent</span></span>
<span class="line"><span style="color:#24292e;">      #state: checked</span></span>
<span class="line"><span style="color:#24292e;">      state: reinitialized</span></span>
<span class="line"><span style="color:#24292e;">    loop: &quot;{{ ipatopology_segments | default([]) }}&quot;</span></span></code></pre></div><h1 id="playbooks" tabindex="-1">Playbooks <a class="header-anchor" href="#playbooks" aria-label="Permalink to &quot;Playbooks&quot;">​</a></h1><p>部署或取消部署服务器、副本和客户端所需的行动手册是存储库的一部分，放在playbooks文件夹中。还有一些剧本可以部署和取消部署集群。使用它们，只需添加一个库存文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">playbooks\\</span></span>
<span class="line"><span style="color:#e1e4e8;">        install-client.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        install-cluster.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        install-replica.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        install-server.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        uninstall-client.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        uninstall-cluster.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        uninstall-replica.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">        uninstall-server.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">playbooks\\</span></span>
<span class="line"><span style="color:#24292e;">        install-client.yml</span></span>
<span class="line"><span style="color:#24292e;">        install-cluster.yml</span></span>
<span class="line"><span style="color:#24292e;">        install-replica.yml</span></span>
<span class="line"><span style="color:#24292e;">        install-server.yml</span></span>
<span class="line"><span style="color:#24292e;">        uninstall-client.yml</span></span>
<span class="line"><span style="color:#24292e;">        uninstall-cluster.yml</span></span>
<span class="line"><span style="color:#24292e;">        uninstall-replica.yml</span></span>
<span class="line"><span style="color:#24292e;">        uninstall-server.yml</span></span></code></pre></div><h2 id="如何部署主服务器" tabindex="-1">如何部署主服务器 <a class="header-anchor" href="#如何部署主服务器" aria-label="Permalink to &quot;如何部署主服务器&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-playbook -v -i inventory/hosts install-server.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-playbook -v -i inventory/hosts install-server.yml</span></span></code></pre></div><p>这将部署清单文件中定义的主服务器。</p><p>如果使用Ansible vault作为密码，则需要通过以下方式调整剧本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">- name: Playbook to configure IPA servers</span></span>
<span class="line"><span style="color:#e1e4e8;">  hosts: ipaserver</span></span>
<span class="line"><span style="color:#e1e4e8;">  become: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  vars_files:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - playbook_sensitive_data.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  roles:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - role: ipaserver</span></span>
<span class="line"><span style="color:#e1e4e8;">    state: present</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">- name: Playbook to configure IPA servers</span></span>
<span class="line"><span style="color:#24292e;">  hosts: ipaserver</span></span>
<span class="line"><span style="color:#24292e;">  become: true</span></span>
<span class="line"><span style="color:#24292e;">  vars_files:</span></span>
<span class="line"><span style="color:#24292e;">  - playbook_sensitive_data.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  roles:</span></span>
<span class="line"><span style="color:#24292e;">  - role: ipaserver</span></span>
<span class="line"><span style="color:#24292e;">    state: present</span></span></code></pre></div><p>还需要在ansible-playbook命令行上提供vault密码文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-playbook -v -i inventory/hosts --vault-password-file .vaul_pass.txt install-server.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-playbook -v -i inventory/hosts --vault-password-file .vaul_pass.txt install-server.yml</span></span></code></pre></div><h2 id="如何部署复制副本" tabindex="-1">如何部署复制副本 <a class="header-anchor" href="#如何部署复制副本" aria-label="Permalink to &quot;如何部署复制副本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-playbook -v -i inventory/hosts install-replica.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-playbook -v -i inventory/hosts install-replica.yml</span></span></code></pre></div><p>这将部署清单文件中定义的复制副本。</p><h2 id="如何设置客户端" tabindex="-1">如何设置客户端 <a class="header-anchor" href="#如何设置客户端" aria-label="Permalink to &quot;如何设置客户端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-playbook -v -i inventory/hosts install-client.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-playbook -v -i inventory/hosts install-client.yml</span></span></code></pre></div><p>这将部署清单文件中定义的客户端。</p><h2 id="如何部署群集" tabindex="-1">如何部署群集 <a class="header-anchor" href="#如何部署群集" aria-label="Permalink to &quot;如何部署群集&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ansible-playbook -v -i inventory/hosts install-cluster.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ansible-playbook -v -i inventory/hosts install-cluster.yml</span></span></code></pre></div>`,88),o=[p];function i(c,t,r,d,y,v){return a(),e("div",null,o)}const h=s(l,[["render",i]]);export{g as __pageData,h as default};
