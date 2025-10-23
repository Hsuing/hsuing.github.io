import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const $=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/harbor/6-api.md","filePath":"guide/container/harbor/6-api.md","lastUpdated":1729073852000}'),p={name:"guide/container/harbor/6-api.md"},l=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ grep data_volume  /app/harbor/harbor.yml    #根据配置文件查找数据存储目录</span></span>
<span class="line"><span style="color:#e1e4e8;">data_volume: /data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cd /data/registry    #进入到Harbor的数据目录下</span></span>
<span class="line"><span style="color:#e1e4e8;">$ find  docker  -type  d  -name &quot;current&quot;  | sed  &#39;s|docker/registry/v2/repositories/||g;s|/_manifests/tags/|:|g;s|/current||g&#39;  &gt;  images.list</span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat images.list</span></span>
<span class="line"><span style="color:#e1e4e8;">lidabai/busybox:1.28</span></span>
<span class="line"><span style="color:#e1e4e8;">library/prepare:v2.5.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ grep data_volume  /app/harbor/harbor.yml    #根据配置文件查找数据存储目录</span></span>
<span class="line"><span style="color:#24292e;">data_volume: /data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cd /data/registry    #进入到Harbor的数据目录下</span></span>
<span class="line"><span style="color:#24292e;">$ find  docker  -type  d  -name &quot;current&quot;  | sed  &#39;s|docker/registry/v2/repositories/||g;s|/_manifests/tags/|:|g;s|/current||g&#39;  &gt;  images.list</span></span>
<span class="line"><span style="color:#24292e;">$ cat images.list</span></span>
<span class="line"><span style="color:#24292e;">lidabai/busybox:1.28</span></span>
<span class="line"><span style="color:#24292e;">library/prepare:v2.5.1</span></span></code></pre></div><p>Harbor API v2</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cat  Harbor-image-listk-v2.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">Harbor_Address=192.168.2.250:443       #Harbor主机地址</span></span>
<span class="line"><span style="color:#e1e4e8;">Harbor_User=admin                      #登录Harbor的用户</span></span>
<span class="line"><span style="color:#e1e4e8;">Harbor_Passwd=Harbor12345              #登录Harbor的用户密码</span></span>
<span class="line"><span style="color:#e1e4e8;">Images_File=harbor-images-\`date &#39;+%Y-%m-%d&#39;\`.txt   # 镜像清单文件</span></span>
<span class="line"><span style="color:#e1e4e8;">Tar_File=/backup/Harbor-backup/                 #镜像tar包存放路径</span></span>
<span class="line"><span style="color:#e1e4e8;">set -x</span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取Harbor中所有的项目（Projects）</span></span>
<span class="line"><span style="color:#e1e4e8;">Project_List=$(curl -u admin:Harbor12345  -H &quot;Content-Type: application/json&quot; -X GET  https://192.168.2.250:443/api/v2.0/projects  -k  | python -m json.tool | grep name | awk &#39;/&quot;name&quot;: /&#39; | awk -F &#39;&quot;&#39; &#39;{print $4}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">for Project in $Project_List;do</span></span>
<span class="line"><span style="color:#e1e4e8;">   # 循环获取项目下所有的镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">    Image_Names=$(curl -u admin:Harbor12345 -H &quot;Content-Type: application/json&quot; -X GET https://192.168.2.250:443/api/v2.0/projects/$Project/repositories -k | python -m json.tool | grep name | awk &#39;/&quot;name&quot;: /&#39; | awk -F &#39;&quot;&#39; &#39;{print $4}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    for Image in $Image_Names;do</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 循环获取镜像的版本（tag)</span></span>
<span class="line"><span style="color:#e1e4e8;">        Image_Tags=$(curl -u admin:Harbor12345  -H &quot;Content-Type: application/json&quot;   -X GET  https://192.168.2.250:443/v2/$Image/tags/list  -k |  awk -F &#39;&quot;&#39;  &#39;{print $8,$10,$12}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">        for Tag in $Image_Tags;do</span></span>
<span class="line"><span style="color:#e1e4e8;">            # 格式化输出镜像信息</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &quot;$Harbor_Address/$Image:$Tag&quot;   &gt;&gt; harbor-images-\`date &#39;+%Y-%m-%d&#39;\`.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">        done</span></span>
<span class="line"><span style="color:#e1e4e8;">    done</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;">$ chmod +x Harbor-image-listk-v2.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sh Harbor-image-listk-v2.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cat  Harbor-image-listk-v2.sh</span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">Harbor_Address=192.168.2.250:443       #Harbor主机地址</span></span>
<span class="line"><span style="color:#24292e;">Harbor_User=admin                      #登录Harbor的用户</span></span>
<span class="line"><span style="color:#24292e;">Harbor_Passwd=Harbor12345              #登录Harbor的用户密码</span></span>
<span class="line"><span style="color:#24292e;">Images_File=harbor-images-\`date &#39;+%Y-%m-%d&#39;\`.txt   # 镜像清单文件</span></span>
<span class="line"><span style="color:#24292e;">Tar_File=/backup/Harbor-backup/                 #镜像tar包存放路径</span></span>
<span class="line"><span style="color:#24292e;">set -x</span></span>
<span class="line"><span style="color:#24292e;"># 获取Harbor中所有的项目（Projects）</span></span>
<span class="line"><span style="color:#24292e;">Project_List=$(curl -u admin:Harbor12345  -H &quot;Content-Type: application/json&quot; -X GET  https://192.168.2.250:443/api/v2.0/projects  -k  | python -m json.tool | grep name | awk &#39;/&quot;name&quot;: /&#39; | awk -F &#39;&quot;&#39; &#39;{print $4}&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">for Project in $Project_List;do</span></span>
<span class="line"><span style="color:#24292e;">   # 循环获取项目下所有的镜像</span></span>
<span class="line"><span style="color:#24292e;">    Image_Names=$(curl -u admin:Harbor12345 -H &quot;Content-Type: application/json&quot; -X GET https://192.168.2.250:443/api/v2.0/projects/$Project/repositories -k | python -m json.tool | grep name | awk &#39;/&quot;name&quot;: /&#39; | awk -F &#39;&quot;&#39; &#39;{print $4}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    for Image in $Image_Names;do</span></span>
<span class="line"><span style="color:#24292e;">        # 循环获取镜像的版本（tag)</span></span>
<span class="line"><span style="color:#24292e;">        Image_Tags=$(curl -u admin:Harbor12345  -H &quot;Content-Type: application/json&quot;   -X GET  https://192.168.2.250:443/v2/$Image/tags/list  -k |  awk -F &#39;&quot;&#39;  &#39;{print $8,$10,$12}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">        for Tag in $Image_Tags;do</span></span>
<span class="line"><span style="color:#24292e;">            # 格式化输出镜像信息</span></span>
<span class="line"><span style="color:#24292e;">            echo &quot;$Harbor_Address/$Image:$Tag&quot;   &gt;&gt; harbor-images-\`date &#39;+%Y-%m-%d&#39;\`.txt</span></span>
<span class="line"><span style="color:#24292e;">        done</span></span>
<span class="line"><span style="color:#24292e;">    done</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;">$ chmod +x Harbor-image-listk-v2.sh</span></span>
<span class="line"><span style="color:#24292e;">$ sh Harbor-image-listk-v2.sh</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cat image-pull.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">###使用docker从镜像文件中下载镜像——将下载的镜像进行打包保存——删除下载到本地的镜像——将封装好的镜像包移动到备份目录</span></span>
<span class="line"><span style="color:#e1e4e8;">Image_tags=$(uniq $Images_File)</span></span>
<span class="line"><span style="color:#e1e4e8;">for image_tag in $Image_tags;do</span></span>
<span class="line"><span style="color:#e1e4e8;">    image_Name=$(echo $image_tag | awk -F/ &#39;{print $3}&#39; |  awk -F: &#39;{print $1}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    image_Lable=$(echo $image_tag | awk -F/ &#39;{print $3}&#39; |  awk -F: &#39;{print $2}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    docker pull $image_tag</span></span>
<span class="line"><span style="color:#e1e4e8;">    docker save $image_tag  -o $image_Name-$image_Lable.tar</span></span>
<span class="line"><span style="color:#e1e4e8;">    docker rmi  $image_tag</span></span>
<span class="line"><span style="color:#e1e4e8;">    mv $image_Name-$image_Lable.tar  $Tar_File</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;">$ chmod +x  image-pull.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cat image-pull.sh</span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">###使用docker从镜像文件中下载镜像——将下载的镜像进行打包保存——删除下载到本地的镜像——将封装好的镜像包移动到备份目录</span></span>
<span class="line"><span style="color:#24292e;">Image_tags=$(uniq $Images_File)</span></span>
<span class="line"><span style="color:#24292e;">for image_tag in $Image_tags;do</span></span>
<span class="line"><span style="color:#24292e;">    image_Name=$(echo $image_tag | awk -F/ &#39;{print $3}&#39; |  awk -F: &#39;{print $1}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    image_Lable=$(echo $image_tag | awk -F/ &#39;{print $3}&#39; |  awk -F: &#39;{print $2}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    docker pull $image_tag</span></span>
<span class="line"><span style="color:#24292e;">    docker save $image_tag  -o $image_Name-$image_Lable.tar</span></span>
<span class="line"><span style="color:#24292e;">    docker rmi  $image_tag</span></span>
<span class="line"><span style="color:#24292e;">    mv $image_Name-$image_Lable.tar  $Tar_File</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;">$ chmod +x  image-pull.sh</span></span></code></pre></div>`,4),o=[l];function t(r,c,i,g,d,m){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{$ as __pageData,u as default};
