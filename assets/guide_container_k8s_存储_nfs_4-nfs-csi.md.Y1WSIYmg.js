import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. nfs-csi简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/存储/nfs/4-nfs-csi.md","filePath":"guide/container/k8s/存储/nfs/4-nfs-csi.md","lastUpdated":1723536306000}'),p={name:"guide/container/k8s/存储/nfs/4-nfs-csi.md"},o=l(`<h1 id="_1-nfs-csi简介" tabindex="-1">1. nfs-csi简介 <a class="header-anchor" href="#_1-nfs-csi简介" aria-label="Permalink to &quot;1. nfs-csi简介&quot;">​</a></h1><p><a href="https://github.com/kubernetes-csi/csi-driver-nfs" target="_blank" rel="noreferrer">NFS CSI Driver</a>是K8s官方提供的CSI示例程序，只实现了CSI的最简功能，这个插件驱动本身只提供了集群中的资源和NFS服务器之间的通信层，使用这个驱动之前需要 Kubernetes 集群 1.14 或更高版本和预先存在的 NFS 服务器。</p><h2 id="_1-1-版本兼容性" tabindex="-1">1.1 版本兼容性 <a class="header-anchor" href="#_1-1-版本兼容性" aria-label="Permalink to &quot;1.1 版本兼容性&quot;">​</a></h2><p><a href="https://kubernetes-csi.github.io/docs/external-provisioner.html" target="_blank" rel="noreferrer">https://kubernetes-csi.github.io/docs/external-provisioner.html</a></p><h2 id="_1-2-优缺点" tabindex="-1">1.2 优缺点 <a class="header-anchor" href="#_1-2-优缺点" aria-label="Permalink to &quot;1.2 优缺点&quot;">​</a></h2><p>下面总结一下这几种方式</p><table><thead><tr><th>名称</th><th>优缺点</th><th></th></tr></thead><tbody><tr><td>NFS Subdir External Provisioner</td><td>只支持配置一个nfs server端</td><td>推荐使用</td></tr><tr><td>NFS CSI Driver</td><td>虽然功能上较简单，但是可以在存储类中配置nfs server端地址，较为灵活</td><td>推荐使用</td></tr></tbody></table><h1 id="_2-nfs-csi部署" tabindex="-1">2. nfs-csi部署 <a class="header-anchor" href="#_2-nfs-csi部署" aria-label="Permalink to &quot;2. nfs-csi部署&quot;">​</a></h1><h2 id="_2-1-创建rabc文件" tabindex="-1">2.1 创建rabc文件 <a class="header-anchor" href="#_2-1-创建rabc文件" aria-label="Permalink to &quot;2.1 创建rabc文件&quot;">​</a></h2><p>vim rbac-csi-nfs-controller.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs-external-provisioner-role</span></span>
<span class="line"><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;persistentvolumes&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;create&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;delete&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;persistentvolumeclaims&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;update&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;storage.k8s.io&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;storageclasses&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;events&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;create&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;update&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;patch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;storage.k8s.io&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;csinodes&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;nodes&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;coordination.k8s.io&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;leases&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;create&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;update&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;patch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs-csi-provisioner-binding</span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs-external-provisioner-role</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">storage.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">CSIDriver</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs.csi.k8s.io</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">attachRequired</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">volumeLifecycleModes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">Persistent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs-external-provisioner-role</span></span>
<span class="line"><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;persistentvolumes&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;create&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;delete&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;persistentvolumeclaims&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;update&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;storage.k8s.io&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;storageclasses&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;events&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;create&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;update&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;patch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;storage.k8s.io&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;csinodes&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;nodes&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;coordination.k8s.io&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;leases&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;create&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;update&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;patch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs-csi-provisioner-binding</span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs-external-provisioner-role</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">storage.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">CSIDriver</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs.csi.k8s.io</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">attachRequired</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">volumeLifecycleModes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">Persistent</span></span></code></pre></div><h2 id="_2-2-创建dp" tabindex="-1">2.2 创建dp <a class="header-anchor" href="#_2-2-创建dp" aria-label="Permalink to &quot;2.2 创建dp&quot;">​</a></h2><p>2.csi-nfs-controller.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostNetwork</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># controller also needs to mount nfs to create dir</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">dnsPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">serviceAccountName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nodeSelector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">kubernetes.io/os</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">linux</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># add &quot;kubernetes.io/role: master&quot; to run controller on master node</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">priorityClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">system-cluster-critical</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">tolerations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node-role.kubernetes.io/master&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">operator</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">effect</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;NoSchedule&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node-role.kubernetes.io/controlplane&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">operator</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">effect</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;NoSchedule&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-provisioner</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">k8s.gcr.io/sig-storage/csi-provisioner:v3.4.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;-v=2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--csi-address=$(ADDRESS)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--leader-election&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ADDRESS</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">400Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">20Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">liveness-probe</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">k8s.gcr.io/sig-storage/livenessprobe:v2.4.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--probe-timeout=3s</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--health-port=29652</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--v=2</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">20Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mcr.microsoft.com/k8s/csi/nfs-csi:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">capabilities</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">add</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;SYS_ADMIN&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">allowPrivilegeEscalation</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;-v=5&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--nodeid=$(NODE_ID)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--endpoint=$(CSI_ENDPOINT)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NODE_ID</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">fieldRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#85E89D;">fieldPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">spec.nodeName</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">CSI_ENDPOINT</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unix:///csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">29652</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pods-mount-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPropagation</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Bidirectional&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">20Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pods-mount-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Directory</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">emptyDir</span><span style="color:#E1E4E8;">: {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostNetwork</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># controller also needs to mount nfs to create dir</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">dnsPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">serviceAccountName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-controller-sa</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nodeSelector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">kubernetes.io/os</span><span style="color:#24292E;">: </span><span style="color:#032F62;">linux</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># add &quot;kubernetes.io/role: master&quot; to run controller on master node</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">priorityClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">system-cluster-critical</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">tolerations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;node-role.kubernetes.io/master&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">operator</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">effect</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;NoSchedule&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;node-role.kubernetes.io/controlplane&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">operator</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">effect</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;NoSchedule&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-provisioner</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">k8s.gcr.io/sig-storage/csi-provisioner:v3.4.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;-v=2&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--csi-address=$(ADDRESS)&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--leader-election&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ADDRESS</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">400Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">20Mi</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">liveness-probe</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">k8s.gcr.io/sig-storage/livenessprobe:v2.4.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--probe-timeout=3s</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--health-port=29652</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--v=2</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">20Mi</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mcr.microsoft.com/k8s/csi/nfs-csi:latest</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">capabilities</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">add</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;SYS_ADMIN&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">allowPrivilegeEscalation</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;-v=5&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--nodeid=$(NODE_ID)&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--endpoint=$(CSI_ENDPOINT)&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NODE_ID</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">fieldRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#22863A;">fieldPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">spec.nodeName</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">CSI_ENDPOINT</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unix:///csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">29652</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">healthz</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/healthz</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">healthz</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pods-mount-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPropagation</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Bidirectional&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">20Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pods-mount-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Directory</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">emptyDir</span><span style="color:#24292E;">: {}</span></span></code></pre></div><h2 id="_2-3-创建csi-nfs-node" tabindex="-1">2.3 创建csi-nfs-node <a class="header-anchor" href="#_2-3-创建csi-nfs-node" aria-label="Permalink to &quot;2.3 创建csi-nfs-node&quot;">​</a></h2><p>3.csi-nfs-node.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#6A737D;"># This YAML file contains driver-registrar &amp; csi driver nodeplugin API objects</span></span>
<span class="line"><span style="color:#6A737D;"># that are necessary to run CSI nodeplugin for nfs</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DaemonSet</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-node</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-node</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">csi-nfs-node</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostNetwork</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># original nfs connection would be broken without hostNetwork setting</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">dnsPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nodeSelector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">kubernetes.io/os</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">linux</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">tolerations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">operator</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">liveness-probe</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">k8s.gcr.io/sig-storage/livenessprobe:v2.4.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--probe-timeout=3s</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--health-port=29653</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--v=2</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">20Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">node-driver-registrar</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">k8s.gcr.io/sig-storage/csi-node-driver-registrar:v2.4.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">lifecycle</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">preStop</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">exec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;/bin/sh&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;-c&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;rm -rf /registration/csi-nfsplugin /registration/csi-nfsplugin-reg.sock&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--v=2</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">--kubelet-registration-path=/var/lib/kubelet/plugins/csi-nfsplugin/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">KUBE_NODE_NAME</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">fieldRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#85E89D;">fieldPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">spec.nodeName</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registration-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/registration</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nfs</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">capabilities</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">add</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;SYS_ADMIN&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">allowPrivilegeEscalation</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mcr.microsoft.com/k8s/csi/nfs-csi:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;-v=5&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--nodeid=$(NODE_ID)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">&quot;--endpoint=$(CSI_ENDPOINT)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NODE_ID</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">fieldRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#85E89D;">fieldPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">spec.nodeName</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">CSI_ENDPOINT</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unix:///csi/csi.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">29653</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">healthz</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;IfNotPresent&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/csi</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pods-mount-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPropagation</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Bidirectional&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">socket-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/plugins/csi-nfsplugin</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pods-mount-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Directory</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/kubelet/plugins_registry</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Directory</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registration-dir</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#6A737D;"># This YAML file contains driver-registrar &amp; csi driver nodeplugin API objects</span></span>
<span class="line"><span style="color:#6A737D;"># that are necessary to run CSI nodeplugin for nfs</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DaemonSet</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-node</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-node</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">csi-nfs-node</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostNetwork</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># original nfs connection would be broken without hostNetwork setting</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">dnsPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nodeSelector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">kubernetes.io/os</span><span style="color:#24292E;">: </span><span style="color:#032F62;">linux</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">tolerations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">operator</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Exists&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">liveness-probe</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">k8s.gcr.io/sig-storage/livenessprobe:v2.4.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--probe-timeout=3s</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--health-port=29653</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--v=2</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">20Mi</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">node-driver-registrar</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">k8s.gcr.io/sig-storage/csi-node-driver-registrar:v2.4.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">lifecycle</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">preStop</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">exec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;/bin/sh&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;-c&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;rm -rf /registration/csi-nfsplugin /registration/csi-nfsplugin-reg.sock&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--v=2</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--csi-address=/csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">--kubelet-registration-path=/var/lib/kubelet/plugins/csi-nfsplugin/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">KUBE_NODE_NAME</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">fieldRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#22863A;">fieldPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">spec.nodeName</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registration-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/registration</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nfs</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">capabilities</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">add</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;SYS_ADMIN&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">allowPrivilegeEscalation</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mcr.microsoft.com/k8s/csi/nfs-csi:latest</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;-v=5&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--nodeid=$(NODE_ID)&quot;</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">&quot;--endpoint=$(CSI_ENDPOINT)&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NODE_ID</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">fieldRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#22863A;">fieldPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">spec.nodeName</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">CSI_ENDPOINT</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unix:///csi/csi.sock</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">29653</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">healthz</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/healthz</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">healthz</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;IfNotPresent&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/csi</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pods-mount-dir</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPropagation</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Bidirectional&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">socket-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/plugins/csi-nfsplugin</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pods-mount-dir</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/pods</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Directory</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/kubelet/plugins_registry</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Directory</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registration-dir</span></span></code></pre></div><h1 id="_3-nfs-csi使用" tabindex="-1">3. nfs-csi使用 <a class="header-anchor" href="#_3-nfs-csi使用" aria-label="Permalink to &quot;3. nfs-csi使用&quot;">​</a></h1><h2 id="_3-1-静态" tabindex="-1">3.1 静态 <a class="header-anchor" href="#_3-1-静态" aria-label="Permalink to &quot;3.1 静态&quot;">​</a></h2><h2 id="_3-2-动态" tabindex="-1">3.2 动态 <a class="header-anchor" href="#_3-2-动态" aria-label="Permalink to &quot;3.2 动态&quot;">​</a></h2><p><a href="https://www.lishuai.fun/2021/08/12/k8s-nfs-pv/#/pv-x2F-pvc-%E4%BD%BF%E7%94%A8%EF%BC%88%E9%9D%99%E6%80%81%E9%85%8D%E7%BD%AE%EF%BC%89" target="_blank" rel="noreferrer">https://www.lishuai.fun/2021/08/12/k8s-nfs-pv/#/pv-x2F-pvc-使用（静态配置）</a></p>`,21),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
