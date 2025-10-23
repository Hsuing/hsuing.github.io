import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.创建ssh凭证","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/2-凭证.md","filePath":"guide/Linux/Jenkins/plus/2-凭证.md","lastUpdated":1720606881000}'),p={name:"guide/Linux/Jenkins/plus/2-凭证.md"},l=e(`<h1 id="_1-创建ssh凭证" tabindex="-1">1.创建ssh凭证 <a class="header-anchor" href="#_1-创建ssh凭证" aria-label="Permalink to &quot;1.创建ssh凭证&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092226703.jpg" alt="jenkinspingzheng"></p><ul><li>选择ssh</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092227261.jpg" alt="jenkinsssh"></p><ul><li>,jenkins服务器上root用户生成密钥对</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@node1 ~]# ssh-keygen -t rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating public/private rsa key pair.</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter file in which to save the key (/root/.ssh/id_rsa): </span></span>
<span class="line"><span style="color:#e1e4e8;">Enter passphrase (empty for no passphrase): </span></span>
<span class="line"><span style="color:#e1e4e8;">Enter same passphrase again: </span></span>
<span class="line"><span style="color:#e1e4e8;">Your identification has been saved in /root/.ssh/id_rsa.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your public key has been saved in /root/.ssh/id_rsa.pub.</span></span>
<span class="line"><span style="color:#e1e4e8;">The key fingerprint is:</span></span>
<span class="line"><span style="color:#e1e4e8;">bf:1e:4d:b3:0f:fb:8b:71:cd:ef:d3:70:69:a4:46:ff root@node1</span></span>
<span class="line"><span style="color:#e1e4e8;">The key&#39;s randomart image is:</span></span>
<span class="line"><span style="color:#e1e4e8;">+--[ RSA 2048]----+</span></span>
<span class="line"><span style="color:#e1e4e8;">| |</span></span>
<span class="line"><span style="color:#e1e4e8;">| |</span></span>
<span class="line"><span style="color:#e1e4e8;">| |</span></span>
<span class="line"><span style="color:#e1e4e8;">| . . |</span></span>
<span class="line"><span style="color:#e1e4e8;">| S + + .|</span></span>
<span class="line"><span style="color:#e1e4e8;">| . o =.*.|</span></span>
<span class="line"><span style="color:#e1e4e8;">| o * oo=|</span></span>
<span class="line"><span style="color:#e1e4e8;">| o B .E|</span></span>
<span class="line"><span style="color:#e1e4e8;">| .o o.+o+|</span></span>
<span class="line"><span style="color:#e1e4e8;">+-----------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@node1 ~]# cat .ssh/id_rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN OPENSSH PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#e1e4e8;">b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn</span></span>
<span class="line"><span style="color:#e1e4e8;">NhAAAAAwEAAQAAAQEAugOaOExF/P1WWVVlQyTgEeec8KVXmhgHLiwK7LHy4xD5bcxoqou8</span></span>
<span class="line"><span style="color:#e1e4e8;">jFf9P8ZCJKKHNOEp1YDR3+G75PsSh0MbLOSwGGakBdI8s+DlMgg6bHEXCu23MCsWn28ZWi</span></span>
<span class="line"><span style="color:#e1e4e8;">UkEq5s6zcwZIauofbWxQ31s6/23VRis5ychAffhJlXTDXcOz4YGyH5I2DuLfK4ZspPfsjE</span></span>
<span class="line"><span style="color:#e1e4e8;">3ZeY2o8jZYYV84WCoGjCZHzUKE5qOyn4gKNwOIr0TVxjk3HcegPVxEhiMUhlUSp06qBl+/</span></span>
<span class="line"><span style="color:#e1e4e8;">ifv5mDWsSNOIKLgiv/RzYwJvTeNbKG389Q/VInd6nsq7qxqebLBxQh198LfGR9msUSUf5W</span></span>
<span class="line"><span style="color:#e1e4e8;">8DqBXqlDXQAAA9i+O853vjvOdwAAAAdzc2gtcnNhAAABAQC6A5o4TEX8/VZZVWVDJOAR55</span></span>
<span class="line"><span style="color:#e1e4e8;">zwpVeaGAcuLArssfLjEPltzGiqi7yMV/0/xkIkooc04SnVgNHf4bvk+xKHQxss5LAYZqQF</span></span>
<span class="line"><span style="color:#e1e4e8;">0jyz4OUyCDpscRcK7bcwKxafbxlaJSQSrmzrNzBkhq6h9tbFDfWzr/bdVGKznJyEB9+EmV</span></span>
<span class="line"><span style="color:#e1e4e8;">dMNdw7PhgbIfkjYO4t8rhmyk9+yMTdl5jajyNlhhXzhYKgaMJkfNQoTmo7KfiAo3A4ivRN</span></span>
<span class="line"><span style="color:#e1e4e8;">XGOTcdx6A9XESGIxSGVRKnTqoGX7+J+/mYNaxI04gouCK/9HNjAm9N41sobfz1D9Uid3qe</span></span>
<span class="line"><span style="color:#e1e4e8;">yrurGp5ssHFCHX3wt8ZH2axRJR/lbwOoFeqUNdAAAAAwEAAQAAAQACED4qt7XjC5Bkp0zb</span></span>
<span class="line"><span style="color:#e1e4e8;">RNJzgGU+SidBn1idC4IHhCXUnQCXVjgnBCvQRr2ZcoKTU3Y6gPDs3GP3ntJtxNc8xuLLSb</span></span>
<span class="line"><span style="color:#e1e4e8;">ImYyUYp29i83C3cF3tjAecaGyqzR+QHzRhyp2u016D8XXI97GCPHG/d9ss5hvP8rqxkWAv</span></span>
<span class="line"><span style="color:#e1e4e8;">GsNA/k54mvRZd98D4T+D9hd+b8U5pOMG4ipAcs0j8DfPni3NupwHqfJyMP9B/UlDoM93Ye</span></span>
<span class="line"><span style="color:#e1e4e8;">u7bTQKy+sG0CmlLCWrvleWKGOX3xRat7eNcTWCO2oFCeExVypVv4z+/ImAr23XPIitC8LI</span></span>
<span class="line"><span style="color:#e1e4e8;">GjgqPPY8HP6xfH2lL1+IfmpVOKl7/oI4Kgo/gQN62dWFAAAAgQCchv4xik7mojvjFLAoI9</span></span>
<span class="line"><span style="color:#e1e4e8;">OEAKIrLcp1tZYf/UFMBYZcylRCS2XkOBOOwjcgxEFjCOLR8ENwl+xvvHFGe04JWhCM3V4+</span></span>
<span class="line"><span style="color:#e1e4e8;">HhJmFOxAOkBEvUy8LstyimKOAEjQbOkslDtlKxH2cz3ZhJUfR3VJVdFyuJ4JNAGTt2pkP4</span></span>
<span class="line"><span style="color:#e1e4e8;">9wNmGRbUsSlQAAAIEA6rU053oStaX8C0CQlRxs2lwUp3SORgu9sdwXKoXZvPyDNCeaWHU2</span></span>
<span class="line"><span style="color:#e1e4e8;">dAlf6P0k6Ps7iuEMAj7VNiZi0AMEpyRB+L58gGL/aPCjUO+k/xDajGOdM03KVbvU+34nbg</span></span>
<span class="line"><span style="color:#e1e4e8;">8tI7xX5AVXDHTatEzmzRrAd1Zw6ngaIcK1ApYYjFF+z41GRrcAAACBAMrji2OiZrW0PTjM</span></span>
<span class="line"><span style="color:#e1e4e8;">vpkDNz8nWNT3qOt+aHZvUY3iOcQ2hUNlkuE1jQOEgirZ4Xo+Eh6Df2WOteW6xFq4TxlJMa</span></span>
<span class="line"><span style="color:#e1e4e8;">YlxtbAfwqi+Ozjln6VZTSsgduhjXxSJa/GjZe6/+eUbrmaEerAekqpsy5HhcScNdlPS971</span></span>
<span class="line"><span style="color:#e1e4e8;">SzsH6MgRDuBKLAAAAHHJvb3RAaVpqNmNkcmJ3eXBmMWN5YnZneHlscVoBAgMEBQY=</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END OPENSSH PRIVATE KEY-----</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@node1 ~]# ssh-keygen -t rsa</span></span>
<span class="line"><span style="color:#24292e;">Generating public/private rsa key pair.</span></span>
<span class="line"><span style="color:#24292e;">Enter file in which to save the key (/root/.ssh/id_rsa): </span></span>
<span class="line"><span style="color:#24292e;">Enter passphrase (empty for no passphrase): </span></span>
<span class="line"><span style="color:#24292e;">Enter same passphrase again: </span></span>
<span class="line"><span style="color:#24292e;">Your identification has been saved in /root/.ssh/id_rsa.</span></span>
<span class="line"><span style="color:#24292e;">Your public key has been saved in /root/.ssh/id_rsa.pub.</span></span>
<span class="line"><span style="color:#24292e;">The key fingerprint is:</span></span>
<span class="line"><span style="color:#24292e;">bf:1e:4d:b3:0f:fb:8b:71:cd:ef:d3:70:69:a4:46:ff root@node1</span></span>
<span class="line"><span style="color:#24292e;">The key&#39;s randomart image is:</span></span>
<span class="line"><span style="color:#24292e;">+--[ RSA 2048]----+</span></span>
<span class="line"><span style="color:#24292e;">| |</span></span>
<span class="line"><span style="color:#24292e;">| |</span></span>
<span class="line"><span style="color:#24292e;">| |</span></span>
<span class="line"><span style="color:#24292e;">| . . |</span></span>
<span class="line"><span style="color:#24292e;">| S + + .|</span></span>
<span class="line"><span style="color:#24292e;">| . o =.*.|</span></span>
<span class="line"><span style="color:#24292e;">| o * oo=|</span></span>
<span class="line"><span style="color:#24292e;">| o B .E|</span></span>
<span class="line"><span style="color:#24292e;">| .o o.+o+|</span></span>
<span class="line"><span style="color:#24292e;">+-----------------+</span></span>
<span class="line"><span style="color:#24292e;">[root@node1 ~]# cat .ssh/id_rsa</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN OPENSSH PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#24292e;">b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn</span></span>
<span class="line"><span style="color:#24292e;">NhAAAAAwEAAQAAAQEAugOaOExF/P1WWVVlQyTgEeec8KVXmhgHLiwK7LHy4xD5bcxoqou8</span></span>
<span class="line"><span style="color:#24292e;">jFf9P8ZCJKKHNOEp1YDR3+G75PsSh0MbLOSwGGakBdI8s+DlMgg6bHEXCu23MCsWn28ZWi</span></span>
<span class="line"><span style="color:#24292e;">UkEq5s6zcwZIauofbWxQ31s6/23VRis5ychAffhJlXTDXcOz4YGyH5I2DuLfK4ZspPfsjE</span></span>
<span class="line"><span style="color:#24292e;">3ZeY2o8jZYYV84WCoGjCZHzUKE5qOyn4gKNwOIr0TVxjk3HcegPVxEhiMUhlUSp06qBl+/</span></span>
<span class="line"><span style="color:#24292e;">ifv5mDWsSNOIKLgiv/RzYwJvTeNbKG389Q/VInd6nsq7qxqebLBxQh198LfGR9msUSUf5W</span></span>
<span class="line"><span style="color:#24292e;">8DqBXqlDXQAAA9i+O853vjvOdwAAAAdzc2gtcnNhAAABAQC6A5o4TEX8/VZZVWVDJOAR55</span></span>
<span class="line"><span style="color:#24292e;">zwpVeaGAcuLArssfLjEPltzGiqi7yMV/0/xkIkooc04SnVgNHf4bvk+xKHQxss5LAYZqQF</span></span>
<span class="line"><span style="color:#24292e;">0jyz4OUyCDpscRcK7bcwKxafbxlaJSQSrmzrNzBkhq6h9tbFDfWzr/bdVGKznJyEB9+EmV</span></span>
<span class="line"><span style="color:#24292e;">dMNdw7PhgbIfkjYO4t8rhmyk9+yMTdl5jajyNlhhXzhYKgaMJkfNQoTmo7KfiAo3A4ivRN</span></span>
<span class="line"><span style="color:#24292e;">XGOTcdx6A9XESGIxSGVRKnTqoGX7+J+/mYNaxI04gouCK/9HNjAm9N41sobfz1D9Uid3qe</span></span>
<span class="line"><span style="color:#24292e;">yrurGp5ssHFCHX3wt8ZH2axRJR/lbwOoFeqUNdAAAAAwEAAQAAAQACED4qt7XjC5Bkp0zb</span></span>
<span class="line"><span style="color:#24292e;">RNJzgGU+SidBn1idC4IHhCXUnQCXVjgnBCvQRr2ZcoKTU3Y6gPDs3GP3ntJtxNc8xuLLSb</span></span>
<span class="line"><span style="color:#24292e;">ImYyUYp29i83C3cF3tjAecaGyqzR+QHzRhyp2u016D8XXI97GCPHG/d9ss5hvP8rqxkWAv</span></span>
<span class="line"><span style="color:#24292e;">GsNA/k54mvRZd98D4T+D9hd+b8U5pOMG4ipAcs0j8DfPni3NupwHqfJyMP9B/UlDoM93Ye</span></span>
<span class="line"><span style="color:#24292e;">u7bTQKy+sG0CmlLCWrvleWKGOX3xRat7eNcTWCO2oFCeExVypVv4z+/ImAr23XPIitC8LI</span></span>
<span class="line"><span style="color:#24292e;">GjgqPPY8HP6xfH2lL1+IfmpVOKl7/oI4Kgo/gQN62dWFAAAAgQCchv4xik7mojvjFLAoI9</span></span>
<span class="line"><span style="color:#24292e;">OEAKIrLcp1tZYf/UFMBYZcylRCS2XkOBOOwjcgxEFjCOLR8ENwl+xvvHFGe04JWhCM3V4+</span></span>
<span class="line"><span style="color:#24292e;">HhJmFOxAOkBEvUy8LstyimKOAEjQbOkslDtlKxH2cz3ZhJUfR3VJVdFyuJ4JNAGTt2pkP4</span></span>
<span class="line"><span style="color:#24292e;">9wNmGRbUsSlQAAAIEA6rU053oStaX8C0CQlRxs2lwUp3SORgu9sdwXKoXZvPyDNCeaWHU2</span></span>
<span class="line"><span style="color:#24292e;">dAlf6P0k6Ps7iuEMAj7VNiZi0AMEpyRB+L58gGL/aPCjUO+k/xDajGOdM03KVbvU+34nbg</span></span>
<span class="line"><span style="color:#24292e;">8tI7xX5AVXDHTatEzmzRrAd1Zw6ngaIcK1ApYYjFF+z41GRrcAAACBAMrji2OiZrW0PTjM</span></span>
<span class="line"><span style="color:#24292e;">vpkDNz8nWNT3qOt+aHZvUY3iOcQ2hUNlkuE1jQOEgirZ4Xo+Eh6Df2WOteW6xFq4TxlJMa</span></span>
<span class="line"><span style="color:#24292e;">YlxtbAfwqi+Ozjln6VZTSsgduhjXxSJa/GjZe6/+eUbrmaEerAekqpsy5HhcScNdlPS971</span></span>
<span class="line"><span style="color:#24292e;">SzsH6MgRDuBKLAAAAHHJvb3RAaVpqNmNkcmJ3eXBmMWN5YnZneHlscVoBAgMEBQY=</span></span>
<span class="line"><span style="color:#24292e;">-----END OPENSSH PRIVATE KEY-----</span></span></code></pre></div><ul><li>添加</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092227022.jpg" alt="ssh2"></p><p>添加描述，点击OK</p><p>继续编辑配置</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092227823.jpg" alt="ssh3"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092227732.jpg" alt="ssh4"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">源码浏览器，去gitlab上找到http的url：http://192.168.3.198/web/web-demo.git</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">找出gitlab的版本，输入url和版本，版本只支持2位，拉到最下面保存</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@web01 ~]# rpm -qa|grep gitlab</span></span>
<span class="line"><span style="color:#e1e4e8;">gitlab-ce-8.10.5-ce.0.el7.x86_64</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">源码浏览器，去gitlab上找到http的url：http://192.168.3.198/web/web-demo.git</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">找出gitlab的版本，输入url和版本，版本只支持2位，拉到最下面保存</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@web01 ~]# rpm -qa|grep gitlab</span></span>
<span class="line"><span style="color:#24292e;">gitlab-ce-8.10.5-ce.0.el7.x86_64</span></span></code></pre></div><p>ssh方式 把SSh地址贴到jenkins即可，不必加认证账号</p>`,14),o=[l];function c(i,t,r,A,y,h){return n(),a("div",null,o)}const b=s(p,[["render",c]]);export{g as __pageData,b as default};
