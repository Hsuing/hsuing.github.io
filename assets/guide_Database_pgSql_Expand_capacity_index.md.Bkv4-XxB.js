import{_ as t,c as a,o as n,k as e}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/Expand_capacity/index.md","filePath":"guide/Database/pgSql/Expand_capacity/index.md","lastUpdated":1711525185000}'),o={name:"guide/Database/pgSql/Expand_capacity/index.md"},l=e("blockquote",null,[e("p",null,"第一种：懒汉模式 直接使用系统默认表空间pg_default,不需要知道表空间的概念")],-1),s=e("blockquote",null,[e("p",null,"第二种：悲观模式"),e("p",null,"用户预先创建好文件系统目录，创建自定义表空间，再创建数据库，建库使用自定义表空间，以后使用过程中直接创建表无需关注表空间，无感知。这也是推荐比较良好的使用习惯")],-1),c=e("blockquote",null,[e("p",null,"第三种：乐观模式 不够用或者出问题再扩容 不管是使用默认表空间或者自定义表空间也有可能会出现空间满的情况，这时可以在现有库对新表指定新的表空间来满足使用。")],-1),d=[l,s,c];function p(i,_,r,u,x,f){return n(),a("div",null,d)}const h=t(o,[["render",p]]);export{g as __pageData,h as default};
