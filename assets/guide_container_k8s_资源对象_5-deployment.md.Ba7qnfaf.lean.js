import{_ as t,c as o,o as a,k as e,a as n}from"./chunks/framework.CIzs38F0.js";const f=JSON.parse('{"title":"1.Deployment","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/资源对象/5-deployment.md","filePath":"guide/container/k8s/资源对象/5-deployment.md","lastUpdated":1713263180000}'),s={name:"guide/container/k8s/资源对象/5-deployment.md"},c=e("h1",{id:"_1-deployment",tabindex:"-1"},[n("1.Deployment "),e("a",{class:"header-anchor",href:"#_1-deployment","aria-label":'Permalink to "1.Deployment"'},"​")],-1),i=e("p",null,"​ 在Pod的上一层就是ReplicaSet控制器，它主要负责管理Pod的副本数，但通常我们并不直接使用ReplicaSet，而是使用比ReplicaSet更高一级的DepLoyment。由DepLoyment管理RepLicaSet，它会自动帮我们创建和销毁RS，有了Deployment就可以实现应用的滚动更新。",-1),l=e("p",null,[e("img",{src:"https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401231344464.png",alt:"image-20240123134342684"})],-1),p=[c,i,l];function d(r,m,_,h,y,u){return a(),o("div",null,p)}const D=t(s,[["render",d]]);export{f as __pageData,D as default};
