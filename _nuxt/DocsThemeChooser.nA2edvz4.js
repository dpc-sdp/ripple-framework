import{d as m,b as r,G as y,w as h,e as i,E as b,c as d,f as C,a2 as R,H as k,F as v,W as B,t as F,n as T,r as $,R as q,g as f,D as V,N as _,a3 as E}from"./entry.BCKNaJHL.js";import{u as D}from"./rpl-lib.es.B66Bg2pp.js";import{_ as x}from"./_plugin-vue_export-helper.DlAUqK2U.js";const A={class:"rpl-form-label__inner"},S={key:0,class:"rpl-form-label__required rpl-type-label-small"},I=m({__name:"RplFormLabel",props:{tag:{default:"label"},isRequired:{type:Boolean,default:!1}},setup(o){return(e,t)=>(r(),y(R(e.tag),{class:"rpl-form-label rpl-type-h4-fixed"},{default:h(()=>[i("span",A,[b(e.$slots,"default")]),e.isRequired?(r(),d("span",S,"(Required)")):C("",!0)]),_:3}))}});function L(o,e,t,...a){o[t]&&typeof o[t]=="function"&&o[t](...a),e(t,...a)}const N=(o,e)=>{const t=Array.isArray(e)?e.join(","):e;return o!==!1?"[redacted]":t},j=["id","data-rpl-focus-input","name","disabled","checked","onChange"],w=["for"],O=m({__name:"RplFormOptionButtons",props:{id:{},name:{},value:{},label:{default:void 0},disabled:{type:Boolean,default:!1},perfectSquares:{type:Boolean,default:!1},onChange:{type:Function,default:()=>{}},options:{default:()=>[]},pii:{type:Boolean,default:!0}},emits:["onChange","update"],setup(o,{emit:e}){const t=o,a=e,s=k("form"),{emitRplEvent:u}=D("rpl-form-option-buttons",a),p=l=>{L(t,a,"onChange",l),u("update",{action:"update",id:t.id,label:t==null?void 0:t.label,value:N(t.pii,l),contextId:s==null?void 0:s.id,contextName:s==null?void 0:s.name},{global:!0})},c=l=>t.value===l;return(l,U)=>(r(),d("div",{class:T({"rpl-form-opt-buttons":!0,"rpl-form-opt-buttons--squares":t.perfectSquares})},[(r(!0),d(v,null,B(l.options,(n,g)=>(r(),d("div",{key:n.id,class:"rpl-form-opt-buttons-option"},[i("input",{id:n.id,class:"rpl-form-opt-buttons-option__input",type:"radio","data-rpl-focus-input":g===0?l.id:void 0,name:l.name,disabled:l.disabled||n.disabled,checked:c(n.id),onChange:W=>p(n.id)},null,40,j),i("label",{class:"rpl-form-opt-buttons-option__label rpl-type-label",for:n.id},F(n.label),9,w)]))),128))],2))}}),z={class:"rpl-form__outer docs-theme-chooser-controls"},G={class:"docs-theme-chooser-examples"},H=m({__name:"DocsThemeChooser",setup(o){const e=$("docsTheme1"),t=a=>{e.value=a};return q("exampleTheme",e),(a,s)=>{const u=I,p=O;return r(),d(v,null,[i("div",z,[f(u,{tag:"label"},{default:h(()=>[V("Theme options")]),_:1}),f(p,{modelValue:_(e),"onUpdate:modelValue":s[0]||(s[0]=c=>E(e)?e.value=c:null),id:"theme-chooser",name:"theme-chooser",onChange:t,value:_(e),options:[{id:"docsTheme1",label:"Alt 1",value:"light"},{id:"docsTheme2",label:"Alt 2",value:"dark"},{id:"default",label:"vic.gov.au",value:"default"}]},null,8,["modelValue","value","options"])]),i("div",G,[b(a.$slots,"default",{},void 0,!0)])],64)}}}),P=x(H,[["__scopeId","data-v-058e8db5"]]);export{P as default};