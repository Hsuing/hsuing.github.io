import{_ as i,h as o,D as p,o as f,c as m,I as a,F as k}from"./framework.PZ77rLUR.js";const w={__name:"switch6",setup(_){const s=o(!1),r=o(!1),l=o(!1),u=async c=>(await new Promise(e=>setTimeout(e,1e3)),!0),d=async c=>(await new Promise(e=>setTimeout(e,500)),c?!0:(console.error("OH, You can't change"),!1)),h=async c=>(await new Promise((e,n)=>setTimeout(()=>{console.error("OH, Something went wrong"),n()},1e3)),!0);return(c,e)=>{const n=p("sb-switch");return f(),m(k,null,[a(n,{checked:s.value,"onUpdate:checked":e[0]||(e[0]=t=>s.value=t),beforeChange:u},null,8,["checked"]),a(n,{checked:r.value,"onUpdate:checked":e[1]||(e[1]=t=>r.value=t),type:"round",beforeChange:d},null,8,["checked"]),a(n,{checked:l.value,"onUpdate:checked":e[2]||(e[2]=t=>l.value=t),type:"line",beforeChange:h},null,8,["checked"])],64)}}},v=i(w,[["__scopeId","data-v-672d7f0f"]]);export{v as default};
