import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/containerd/2-toml.md","filePath":"guide/container/containerd/2-toml.md","lastUpdated":1713620605000}'),o={name:"guide/container/containerd/2-toml.md"},l=a(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[plugins]</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.gc.v1.scheduler&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    pause_threshold = 0.02</span></span>
<span class="line"><span style="color:#e1e4e8;">    deletion_threshold = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">    mutation_threshold = 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    schedule_delay = &quot;0s&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    startup_delay = &quot;100ms&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.grpc.v1.cri&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    disable_tcp_service = true</span></span>
<span class="line"><span style="color:#e1e4e8;">    stream_server_address = &quot;127.0.0.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    stream_server_port = &quot;0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    stream_idle_timeout = &quot;4h0m0s&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    enable_selinux = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    sandbox_image = &quot;k8s.gcr.io/pause:3.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    stats_collect_period = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">    systemd_cgroup = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    enable_tls_streaming = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    max_container_log_line_size = 16384</span></span>
<span class="line"><span style="color:#e1e4e8;">    disable_cgroup = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    disable_apparmor = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    restrict_oom_score_adj = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    max_concurrent_downloads = 3</span></span>
<span class="line"><span style="color:#e1e4e8;">    disable_proc_mount = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span></span>
<span class="line"><span style="color:#e1e4e8;">      snapshotter = &quot;overlayfs&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      default_runtime_name = &quot;runc&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      no_pivot = false</span></span>
<span class="line"><span style="color:#e1e4e8;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.default_runtime]</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_type = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#e1e4e8;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.untrusted_workload_runtime]</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_type = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#e1e4e8;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes]</span></span>
<span class="line"><span style="color:#e1e4e8;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#e1e4e8;">          runtime_type = &quot;io.containerd.runc.v1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.cni]</span></span>
<span class="line"><span style="color:#e1e4e8;">      bin_dir = &quot;/opt/cni/bin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      conf_dir = &quot;/etc/cni/net.d&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      max_conf_num = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">      conf_template = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry]</span></span>
<span class="line"><span style="color:#e1e4e8;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors]</span></span>
<span class="line"><span style="color:#e1e4e8;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors.&quot;docker.io&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">          endpoint = [&quot;https://registry-1.docker.io&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.x509_key_pair_streaming]</span></span>
<span class="line"><span style="color:#e1e4e8;">      tls_cert_file = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      tls_key_file = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.internal.v1.opt&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    path = &quot;/opt/containerd&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.internal.v1.restart&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    interval = &quot;10s&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.metadata.v1.bolt&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    content_sharing_policy = &quot;shared&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.monitor.v1.cgroups&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    no_prometheus = false</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.runtime.v1.linux&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    shim = &quot;containerd-shim&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    runtime = &quot;runc&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    no_shim = false</span></span>
<span class="line"><span style="color:#e1e4e8;">    shim_debug = false</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.runtime.v2.task&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    platforms = [&quot;linux/amd64&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.service.v1.diff-service&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    default = [&quot;walking&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  [plugins.&quot;io.containerd.snapshotter.v1.devmapper&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    root_path = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    pool_name = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    base_image_size = &quot;&quot;</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">[plugins]</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.gc.v1.scheduler&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    pause_threshold = 0.02</span></span>
<span class="line"><span style="color:#24292e;">    deletion_threshold = 0</span></span>
<span class="line"><span style="color:#24292e;">    mutation_threshold = 100</span></span>
<span class="line"><span style="color:#24292e;">    schedule_delay = &quot;0s&quot;</span></span>
<span class="line"><span style="color:#24292e;">    startup_delay = &quot;100ms&quot;</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.grpc.v1.cri&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    disable_tcp_service = true</span></span>
<span class="line"><span style="color:#24292e;">    stream_server_address = &quot;127.0.0.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">    stream_server_port = &quot;0&quot;</span></span>
<span class="line"><span style="color:#24292e;">    stream_idle_timeout = &quot;4h0m0s&quot;</span></span>
<span class="line"><span style="color:#24292e;">    enable_selinux = false</span></span>
<span class="line"><span style="color:#24292e;">    sandbox_image = &quot;k8s.gcr.io/pause:3.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">    stats_collect_period = 10</span></span>
<span class="line"><span style="color:#24292e;">    systemd_cgroup = false</span></span>
<span class="line"><span style="color:#24292e;">    enable_tls_streaming = false</span></span>
<span class="line"><span style="color:#24292e;">    max_container_log_line_size = 16384</span></span>
<span class="line"><span style="color:#24292e;">    disable_cgroup = false</span></span>
<span class="line"><span style="color:#24292e;">    disable_apparmor = false</span></span>
<span class="line"><span style="color:#24292e;">    restrict_oom_score_adj = false</span></span>
<span class="line"><span style="color:#24292e;">    max_concurrent_downloads = 3</span></span>
<span class="line"><span style="color:#24292e;">    disable_proc_mount = false</span></span>
<span class="line"><span style="color:#24292e;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span></span>
<span class="line"><span style="color:#24292e;">      snapshotter = &quot;overlayfs&quot;</span></span>
<span class="line"><span style="color:#24292e;">      default_runtime_name = &quot;runc&quot;</span></span>
<span class="line"><span style="color:#24292e;">      no_pivot = false</span></span>
<span class="line"><span style="color:#24292e;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.default_runtime]</span></span>
<span class="line"><span style="color:#24292e;">        runtime_type = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#24292e;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.untrusted_workload_runtime]</span></span>
<span class="line"><span style="color:#24292e;">        runtime_type = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#24292e;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes]</span></span>
<span class="line"><span style="color:#24292e;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#24292e;">          runtime_type = &quot;io.containerd.runc.v1&quot;</span></span>
<span class="line"><span style="color:#24292e;">          runtime_engine = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">          runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">          privileged_without_host_devices = false</span></span>
<span class="line"><span style="color:#24292e;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.cni]</span></span>
<span class="line"><span style="color:#24292e;">      bin_dir = &quot;/opt/cni/bin&quot;</span></span>
<span class="line"><span style="color:#24292e;">      conf_dir = &quot;/etc/cni/net.d&quot;</span></span>
<span class="line"><span style="color:#24292e;">      max_conf_num = 1</span></span>
<span class="line"><span style="color:#24292e;">      conf_template = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry]</span></span>
<span class="line"><span style="color:#24292e;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors]</span></span>
<span class="line"><span style="color:#24292e;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors.&quot;docker.io&quot;]</span></span>
<span class="line"><span style="color:#24292e;">          endpoint = [&quot;https://registry-1.docker.io&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.x509_key_pair_streaming]</span></span>
<span class="line"><span style="color:#24292e;">      tls_cert_file = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">      tls_key_file = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.internal.v1.opt&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    path = &quot;/opt/containerd&quot;</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.internal.v1.restart&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    interval = &quot;10s&quot;</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.metadata.v1.bolt&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    content_sharing_policy = &quot;shared&quot;</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.monitor.v1.cgroups&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    no_prometheus = false</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.runtime.v1.linux&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    shim = &quot;containerd-shim&quot;</span></span>
<span class="line"><span style="color:#24292e;">    runtime = &quot;runc&quot;</span></span>
<span class="line"><span style="color:#24292e;">    runtime_root = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    no_shim = false</span></span>
<span class="line"><span style="color:#24292e;">    shim_debug = false</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.runtime.v2.task&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    platforms = [&quot;linux/amd64&quot;]</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.service.v1.diff-service&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    default = [&quot;walking&quot;]</span></span>
<span class="line"><span style="color:#24292e;">  [plugins.&quot;io.containerd.snapshotter.v1.devmapper&quot;]</span></span>
<span class="line"><span style="color:#24292e;">    root_path = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    pool_name = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    base_image_size = &quot;&quot;</span></span></code></pre></div><p>每一个顶级配置块的命名都是 <code>plugins.&quot;io.containerd.xxx.vx.xxx&quot;</code> 这种形式，其实每一个顶级配置块都代表一个插件，其中 <code>io.containerd.xxx.vx</code> 表示插件的类型，vx 后面的 xxx 表示插件的 <code>ID</code>。可以通过 <code>ctr</code> 一览无余：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#ctr plugin ls</span></span>
<span class="line"><span style="color:#e1e4e8;">TYPE                            ID                    PLATFORMS      STATUS</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.content.v1        content               -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    btrfs                 linux/amd64    error</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    devmapper             linux/amd64    error</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    aufs                  linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    native                linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    overlayfs             linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.snapshotter.v1    zfs                   linux/amd64    error</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.metadata.v1       bolt                  -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.differ.v1         walking               linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.gc.v1             scheduler             -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        containers-service    -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        content-service       -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        diff-service          -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        images-service        -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        leases-service        -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        namespaces-service    -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        snapshots-service     -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.runtime.v1        linux                 linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.runtime.v2        task                  linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.monitor.v1        cgroups               linux/amd64    ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.service.v1        tasks-service         -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.internal.v1       restart               -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           containers            -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           content               -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           diff                  -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           events                -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           healthcheck           -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           images                -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           leases                -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           namespaces            -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.internal.v1       opt                   -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           snapshots             -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           tasks                 -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           version               -              ok</span></span>
<span class="line"><span style="color:#e1e4e8;">io.containerd.grpc.v1           cri                   linux/amd64    ok</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">#ctr plugin ls</span></span>
<span class="line"><span style="color:#24292e;">TYPE                            ID                    PLATFORMS      STATUS</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.content.v1        content               -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    btrfs                 linux/amd64    error</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    devmapper             linux/amd64    error</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    aufs                  linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    native                linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    overlayfs             linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.snapshotter.v1    zfs                   linux/amd64    error</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.metadata.v1       bolt                  -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.differ.v1         walking               linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.gc.v1             scheduler             -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        containers-service    -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        content-service       -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        diff-service          -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        images-service        -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        leases-service        -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        namespaces-service    -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        snapshots-service     -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.runtime.v1        linux                 linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.runtime.v2        task                  linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.monitor.v1        cgroups               linux/amd64    ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.service.v1        tasks-service         -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.internal.v1       restart               -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           containers            -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           content               -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           diff                  -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           events                -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           healthcheck           -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           images                -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           leases                -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           namespaces            -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.internal.v1       opt                   -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           snapshots             -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           tasks                 -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           version               -              ok</span></span>
<span class="line"><span style="color:#24292e;">io.containerd.grpc.v1           cri                   linux/amd64    ok</span></span></code></pre></div><p>顶级配置块下面的子配置块表示该插件的各种配置，比如 cri 插件下面就分为 <code>containerd</code>、<code>cni</code> 和 <code>registry</code> 的配置，而 containerd 下面又可以配置各种 runtime，还可以配置默认的 runtime。</p><p>镜像加速的配置就在 cri 插件配置块下面的 registry 配置块，所以需要修改的部分如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry]</span></span>
<span class="line"><span style="color:#e1e4e8;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors]</span></span>
<span class="line"><span style="color:#e1e4e8;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors.&quot;docker.io&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">          endpoint = [&quot;https://dockerhub.mirrors.nwafu.edu.cn&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry]</span></span>
<span class="line"><span style="color:#24292e;">      [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors]</span></span>
<span class="line"><span style="color:#24292e;">        [plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors.&quot;docker.io&quot;]</span></span>
<span class="line"><span style="color:#24292e;">          endpoint = [&quot;https://dockerhub.mirrors.nwafu.edu.cn&quot;]</span></span></code></pre></div><ul><li><strong>registry.mirrors.“xxx”</strong> : 表示需要配置 mirror 的镜像仓库。例如，<code>registry.mirrors.&quot;docker.io&quot;</code> 表示配置 docker.io 的 mirror。</li><li><strong>endpoint</strong> : 表示提供 mirror 的镜像加速服务。例如，这里推荐使用西北农林科技大学提供的镜像加速服务作为 <code>docker.io</code> 的 mirror</li></ul>`,7),p=[l];function t(i,c,r,u,d,y){return n(),e("div",null,p)}const g=s(o,[["render",t]]);export{v as __pageData,g as default};
