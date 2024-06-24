import{_ as M}from"./RplLink.vue.CuZNYqgs.js";import{u as E}from"./useRippleEvent.CLk9MC4X.js";import{d as h,b as i,G as N,w as $,c as d,f as x,e as b,t as y,n as w,g as f,F as I,W as S,Q as V,r as A,J as T,N as g,m as z,v as P,a1 as q,D as G}from"./entry.BCKNaJHL.js";import{_ as J}from"./RplIcon.vue.CnsOlwz7.js";import{_ as Q}from"./RplExpandable.vue.CkxhEtXe.js";import W from"./DocsNavLink.DKN9zE-J.js";import{u as j}from"./useDocsNavigation.BmFOvvhU.js";import{_ as H}from"./_plugin-vue_export-helper.DlAUqK2U.js";import"./nuxt-link.DQ-da3NY.js";import"./asyncData.DZECWcgq.js";const K={key:0,class:"rpl-icon--child"},O=h({__name:"RplVerticalNavLink",props:{text:{},href:{},active:{type:Boolean,default:!1},showChildIcon:{type:Boolean,default:!1}},emits:["itemClick"],setup(v,{emit:a}){const t=v,u=a,{emitRplEvent:r}=E("rpl-vertical-nav",u),c=()=>{r("itemClick",{action:"click",text:t.text,value:t.href})};return(s,o)=>{const l=M;return i(),N(l,{url:s.href,class:w({"rpl-vertical-nav__item":!0,"rpl-vertical-nav__item--active":s.active,"rpl-vertical-nav__link":!0,"rpl-u-focusable-block":!0}),onClick:c},{default:$(()=>[s.showChildIcon?(i(),d("span",K)):x("",!0),b("span",null,y(s.text),1)]),_:1},8,["url","class"])}}}),U={class:"rpl-vertical-nav__item rpl-vertical-nav__toggle rpl-u-focusable-block"},X={class:"rpl-vertical-nav__toggle-text"},Y={class:"rpl-vertical-nav__toggle-icon","aria-hidden":"true"},Z=h({__name:"RplVerticalNavToggle",props:{text:{}},setup(v){return(a,t)=>(i(),d("button",U,[b("span",X,y(a.text),1),b("span",Y,[f(J,{name:"icon-chevron-down",size:"xs"})])]))}}),B=h({__name:"RplVerticalNavList",props:{items:{},level:{},toggleLevels:{},isExpanded:{type:Function},toggleId:{type:Function},toggleItem:{type:Function}},emits:["itemClick"],setup(v,{emit:a}){const t=v,u=a,{emitRplEvent:r}=E("rpl-vertical-nav",u),c=l=>{const p=t.level>Math.max(t.toggleLevels,2);return l===0&&t.level-1<=t.toggleLevels?!1:p},s=l=>l.items&&t.level<=t.toggleLevels,o=l=>{r("itemClick",{index:t.level,...l})};return(l,p)=>{const m=B;return i(),d("ul",{class:w(`
      rpl-vertical-nav__list
      rpl-vertical-nav__list--level-${l.level}
      rpl-type-p-small
    `)},[(i(!0),d(I,null,S(l.items,(e,_)=>{var k;return i(),d("li",{key:_,class:w({"rpl-vertical-nav__list-item":!0,"rpl-vertical-nav__list-item--expanded":l.isExpanded(e.id)})},[s(e)?(i(),d(I,{key:0},[f(Z,{id:l.toggleId(e.id),text:e.text,onClick:n=>l.toggleItem(e)},null,8,["id","text","onClick"]),f(Q,{"aria-labelledby":`rpl-vertical-nav-${e.id}-toggle`,"aria-hidden":!l.isExpanded(e.id),expanded:l.isExpanded(e.id),class:"rpl-vertical-nav__list-item-children"},{default:$(()=>[f(m,V(t,{items:e.items,level:t.level+1,onItemClick:o}),null,16,["items","level"])]),_:2},1032,["aria-labelledby","aria-hidden","expanded"])],64)):(i(),d(I,{key:1},[f(O,{text:e.text,href:e.url,active:(e==null?void 0:e.active)&&!((k=e.items)!=null&&k.some(n=>n.active)),"show-child-icon":c(_),tabindex:l.isExpanded(e.id)?"0":"-1",onItemClick:p[0]||(p[0]=n=>o(n))},null,8,["text","href","active","show-child-icon","tabindex"]),e.items?(i(),N(m,V({key:0},t,{items:e.items,level:t.level+1,onItemClick:o}),null,16,["items","level"])):x("",!0)],64))],2)}),128))],2)}}});function ee(v,a){const t=A(v);function u(s){return t.value.includes(s)}function r(){return t.value.length===a}function c(s){u(s)==!1?t.value.push(s):t.value=t.value.filter(o=>o!=s)}return{isItemExpanded:u,isAllExpanded:r,toggleItem:c}}const te={class:"rpl-vertical-nav rpl-u-screen-only"},le={key:0,class:"rpl-vertical-nav__heading rpl-type-h3-fixed"},se=h({__name:"RplVerticalNav",props:{title:{default:void 0},items:{},toggleLevels:{default:1}},emits:["toggleMenuItem","navigate"],setup(v,{emit:a}){const t=v,u=a,{emitRplEvent:r}=E("rpl-vertical-nav",u),c=T(()=>{let e=[];const _=(n,D=!1,F=1)=>{var R;const L=F+1;return n.active&&e.push(n.id),n.url&&((R=n.items)!=null&&R.length)&&D?{...n,items:[{id:n.id,text:n.text,url:n.url,active:n.active&&!n.items.some(C=>C.active)},...(n.items||[]).map(C=>_(C,L<=t.toggleLevels,L))]}:n},k=(t.items||[]).map(n=>_(n,!0));return{active:e,items:k}}),{isItemExpanded:s,toggleItem:o}=ee(c.value.active,c.value.items.length),l=e=>`rpl-vertical-nav-${e}-toggle`,p=e=>{o(e.id),r("toggleMenuItem",{id:l(e.id),action:s(e.id)?"open":"close",text:e.text,name:t==null?void 0:t.title},{global:!0})},m=e=>{r("navigate",{...e,name:t==null?void 0:t.title},{global:!0})};return(e,_)=>(i(),d("nav",te,[e.title?(i(),d("h3",le,y(e.title),1)):x("",!0),f(B,{items:c.value.items,level:1,"toggle-levels":e.toggleLevels,"is-expanded":g(s),"toggle-id":l,"toggle-item":p,onItemClick:m},null,8,["items","toggle-levels","is-expanded"])]))}}),ne=h({__name:"DocsContentNavigation",async setup(v){let a,t;const u=z(),{sections:r,hideModulesSection:c}=P(),s=u.params.slug[0],o=([a,t]=q(()=>j([s||"design-system"],{layout:{$ne:"module"}})),a=await a,t(),a),l=o==null?void 0:o.map(p=>{var m;return{...p,url:(m=p.items)!=null&&m.length?null:p.url}});return(p,m)=>{const e=se,_=W;return i(),d("div",null,[f(e,{items:g(l)},null,8,["items"]),g(c)?x("",!0):(i(),N(_,{key:0,url:g(s)==="framework"?"/design-system/about/what-is-ripple":"/framework",icon:"icon-link-external-square-filled",iconPosition:"end",class:"docs-section-link"},{default:$(()=>[G(y(g(s)==="framework"?g(r)["design-system"].title:g(r).framework.title),1)]),_:1},8,["url"]))])}}}),_e=H(ne,[["__scopeId","data-v-18cbb85e"]]);export{_e as default};