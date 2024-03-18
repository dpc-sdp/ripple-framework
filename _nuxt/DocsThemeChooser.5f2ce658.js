import{d as p,b as n,E as y,w as f,e as d,D as h,c as r,f as g,$ as C,G as F,F as b,V as R,t as B,n as k,r as T,Q as $,g as _,C as V,M as m,a0 as q}from"./entry.1a583428.js";import{u as x}from"./rpl-lib.es.961f36b5.js";import{_ as D}from"./_plugin-vue_export-helper.c27b6911.js";const E={class:"rpl-form-label__inner"},A={key:0,class:"rpl-form-label__required rpl-type-label-small"},L=p({__name:"RplFormLabel",props:{tag:{default:"label"},isRequired:{type:Boolean,default:!1}},setup(a){return(e,t)=>(n(),y(C(e.tag),{class:"rpl-form-label rpl-type-h4-fixed"},{default:f(()=>[d("span",E,[h(e.$slots,"default")]),e.isRequired?(n(),r("span",A,"(Required)")):g("",!0)]),_:3}))}});function S(a,e,t,...o){a[t]&&typeof a[t]=="function"&&a[t](...o),e(t,...o)}const I=(a,e)=>{const t=Array.isArray(e)?e.join(","):e;return a!==!1?"[redacted]":t},O=["id","data-rpl-focus-input","name","disabled","checked","onChange"],j=["for"],w=p({__name:"RplFormOptionButtons",props:{id:{},name:{},value:{},label:{default:void 0},disabled:{type:Boolean,default:!1},perfectSquares:{type:Boolean,default:!1},onChange:{type:Function,default:()=>{}},options:{default:()=>[]},pii:{type:Boolean,default:!0}},emits:["onChange","update"],setup(a,{emit:e}){const t=a,o=F("form"),{emitRplEvent:i}=x("rpl-form-option-buttons",e),u=s=>{S(t,e,"onChange",s),i("update",{action:"update",id:t.id,label:t==null?void 0:t.label,value:I(t.pii,s),contextId:o==null?void 0:o.id,contextName:o==null?void 0:o.name},{global:!0})},c=s=>t.value===s;return(s,M)=>(n(),r("div",{class:k({"rpl-form-opt-buttons":!0,"rpl-form-opt-buttons--squares":t.perfectSquares})},[(n(!0),r(b,null,R(s.options,(l,v)=>(n(),r("div",{key:l.id,class:"rpl-form-opt-buttons-option"},[d("input",{id:l.id,class:"rpl-form-opt-buttons-option__input",type:"radio","data-rpl-focus-input":v===0?s.id:void 0,name:s.name,disabled:s.disabled||l.disabled,checked:c(l.id),onChange:Q=>u(l.id)},null,40,O),d("label",{class:"rpl-form-opt-buttons-option__label rpl-type-label",for:l.id},B(l.label),9,j)]))),128))],2))}});const N={class:"rpl-form__outer docs-theme-chooser-controls"},z={class:"docs-theme-chooser-examples"},G=p({__name:"DocsThemeChooser",setup(a){const e=T("docsTheme1"),t=o=>{e.value=o};return $("exampleTheme",e),(o,i)=>{const u=L,c=w;return n(),r(b,null,[d("div",N,[_(u,{tag:"label"},{default:f(()=>[V("Theme options")]),_:1}),_(c,{modelValue:m(e),"onUpdate:modelValue":i[0]||(i[0]=s=>q(e)?e.value=s:null),id:"theme-chooser",name:"theme-chooser",onChange:t,value:m(e),options:[{id:"docsTheme1",label:"Alt 1",value:"light"},{id:"docsTheme2",label:"Alt 2",value:"dark"},{id:"default",label:"vic.gov.au",value:"default"}]},null,8,["modelValue","value","options"])]),d("div",z,[h(o.$slots,"default",{},void 0,!0)])],64)}}});const K=D(G,[["__scopeId","data-v-058e8db5"]]);export{K as default};
