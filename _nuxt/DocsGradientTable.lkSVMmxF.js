import v from"./Swatch.DZE9pweP.js";import{g as c,a as S,b as g,c as k}from"./colour.DIMeHYpo.js";import{d as C,J as p,b as n,c as s,e as t,F as i,W as d,g as _,t as u,N as m,p as x,i as V}from"./entry.u45UXxOf.js";import{_ as w}from"./_plugin-vue_export-helper.DlAUqK2U.js";const h=a=>(x("data-v-8e2514b8"),a=a(),V(),a),y={class:"rpl-table rpl-table--no-stripes"},I={class:"rpl-table__scroll-container",tabindex:"0"},N={class:"w-full"},B=h(()=>t("thead",null,[t("tr",null,[t("th",null,"Swatch"),t("th",null,"Colour"),t("th",null,"CSS Variable")])],-1)),D=h(()=>t("thead",null,[t("tr",null,[t("th"),t("th",null,"Value"),t("th",null,"Position")])],-1)),O=C({__name:"DocsGradientTable",setup(a){const b=p(()=>{const o=c(["clr.gradient"]);return Object.keys(o).map(l=>({name:S(l),value:g(o[l]),token:k(l)}))}),f=p(()=>{let o=[];const l=c(["theme.clr.gradient"]);for(const[r,e]of Object.entries(l))o.push({value:e,position:r.split(".").pop()});return o});return(o,l)=>{const r=v;return n(),s("div",y,[t("div",I,[t("table",N,[B,t("tbody",null,[(n(!0),s(i,null,d(m(b),e=>(n(),s("tr",{key:e.name},[t("td",null,[_(r,{colour:`var(--${e.token})`},null,8,["colour"])]),t("td",null,u(e.name),1),t("td",null,u(e.token),1)]))),128))]),D,t("tbody",null,[(n(!0),s(i,null,d(m(f),e=>(n(),s("tr",{key:e.name},[t("td",null,[_(r,{colour:e.value},null,8,["colour"])]),t("td",null,u(e.value),1),t("td",null,u(e.position)+"%",1)]))),128))])])])])}}}),E=w(O,[["__scopeId","data-v-8e2514b8"]]);export{E as default};