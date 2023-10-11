import{_ as d}from"./RplIcon.vue.f0d50763.js";import{d as k,b as a,c,f as s,E as o,e as b,D,F as _,I as L,w as r,V as P,n as m,g as R,C as f,t as h,$ as B}from"./entry.c5146540.js";import{_ as V}from"./RplTextLink.css.6e7291ea.js";import{u as g}from"./useRippleEvent.d0b5c6c5.js";const w={key:0,class:"rpl-icon--child"},E={class:"rpl-list__label"},C=k({__name:"RplListContent",props:{iconName:{default:void 0},iconColour:{default:"default"},depth:{default:0},iconPlacement:{default:"before"}},setup(u){return(n,t)=>(a(),c(_,null,[n.depth>0?(a(),c("span",w)):s("",!0),n.iconName&&n.iconPlacement==="before"?(a(),o(d,{key:1,name:n.iconName,colour:n.iconColour,class:"rpl-list__icon"},null,8,["name","colour"])):s("",!0),b("span",E,[D(n.$slots,"default")]),n.iconName&&n.iconPlacement==="after"?(a(),o(d,{key:2,name:n.iconName,colour:n.iconColour,class:"rpl-list__icon"},null,8,["name","colour"])):s("",!0)],64))}}),I=k({__name:"RplList",props:{items:{default:()=>[]},type:{default:"ul"},itemClass:{default:""},containerClass:{default:""},depth:{default:0},maxDepth:{default:null},iconPlacement:{default:"before"},withLinkIds:{type:Boolean,default:!1}},emits:["itemClick"],setup(u,{emit:n}){const t=u,{emitRplEvent:y}=g("rpl-list",n),N=L(()=>t.maxDepth!==null?t.depth<t.maxDepth:!0),v=(e,p)=>{y("itemClick",{action:"click",value:e.url,text:e.text,index:p+1,type:e==null?void 0:e.type})};return(e,p)=>{const $=I;return e.items.length>0?(a(),o(B(e.type),{key:0,class:m(["rpl-list__items",e.containerClass?e.containerClass:null]),"data-depth":e.depth},{default:r(()=>[(a(!0),c(_,null,P(e.items,(l,i)=>(a(),c("li",{key:i,class:m(["rpl-list__item",e.itemClass?e.itemClass:null])},[l.url?(a(),o(V,{key:0,id:e.withLinkIds?l.id:void 0,url:l.url,class:"rpl-list__link",onClick:()=>v(l,i)},{default:r(()=>[R(C,{"icon-name":l==null?void 0:l.icon,"icon-colour":l==null?void 0:l.iconColour,"icon-placement":e.iconPlacement,depth:e.depth},{default:r(()=>[f(h(l.text),1)]),_:2},1032,["icon-name","icon-colour","icon-placement","depth"])]),_:2},1032,["id","url","onClick"])):(a(),o(C,{key:1,"icon-name":l==null?void 0:l.icon,"icon-colour":l==null?void 0:l.iconColour,"icon-placement":e.iconPlacement,depth:e.depth},{default:r(()=>[f(h(l.text),1)]),_:2},1032,["icon-name","icon-colour","icon-placement","depth"])),N.value&&l.items?(a(),o($,{key:`${e.depth}-${i}`,items:l.items,"item-class":e.itemClass,"container-class":"rpl-list__items--sub",depth:e.depth+1},null,8,["items","item-class","depth"])):s("",!0)],2))),128))]),_:1},8,["class","data-depth"])):s("",!0)}}});export{I as _};
