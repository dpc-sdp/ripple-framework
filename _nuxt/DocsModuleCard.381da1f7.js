import{_ as l}from"./RplPromoCard.vue.4771d7ad.js";import{u}from"./asyncData.3dc6c1a1.js";import{d as i,Z as p,b as c,E as d,w as _,e as f,t as w,M as r,q as y}from"./entry.9f03b674.js";import"./index.14eb3938.js";import"./RplImage.css.8156592a.js";import"./RplTextLink.css.dce77e72.js";import"./RplLink.vue.e76b328a.js";import"./useRippleEvent.b39ad4ef.js";import"./ready.f5f645f1.js";const A=i({__name:"DocsModuleCard",props:{moduleSlug:{}},async setup(n){let o,t;const e=n,{data:a}=([o,t]=p(async()=>u(`module-info-${e.moduleSlug}`,async()=>await y(`framework/modules/${e.moduleSlug}/_module`).findOne()||null)),o=await o,t(),o);return(s,C)=>{const m=l;return c(),d(m,{title:r(a).name,url:`/framework/modules/${e.moduleSlug}`},{default:_(()=>[f("p",null,w(r(a).description),1)]),_:1},8,["title","url"])}}});export{A as default};