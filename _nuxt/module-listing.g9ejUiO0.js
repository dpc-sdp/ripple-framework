import le from"./DocsContentNavigation.fBW37Tbj.js";import se from"./DocsPageHeader.5F6aqgm1.js";import{d as G,r as i,J,o as oe,a as ue,Z as P,A as N,b as u,c as b,e as p,t as R,n as A,aJ as v,aK as m,E,D as U,$ as re,aL as ie,Q as pe,f as D,F as Q,W,g as h,a0 as ce,V as de,m as fe,a1 as me,G as q,w as $,N as B,a3 as be,q as ge}from"./entry.DeqpB3_2.js";import{o as ve}from"./RplImage.css.mm__LI8R.js";import{_ as z}from"./RplIcon.vue.Dq5CfrnO.js";import{u as he}from"./useRippleEvent.DnQoeuZe.js";import{_ as _e}from"./RplPromoCard.vue.gpDVoCHA.js";import ye from"./DocsCardGrid.Czkz8d0Q.js";import{_ as we}from"./AppSidebarLayout.vue.6dXzK9Ki.js";import{_ as $e}from"./AppLayout.vue.RBB69MVA.js";import{u as Oe}from"./asyncData.B7yTr4vp.js";import{u as Se}from"./head.BSRwNr6U.js";import"./RplLink.vue.pXgmxF1P.js";import"./RplExpandable.vue.D9wn69E3.js";import"./DocsNavLink.CIYNSDzC.js";import"./nuxt-link.D0ZlIaOV.js";import"./_plugin-vue_export-helper.DlAUqK2U.js";import"./useDocsNavigation.caNBmIXN.js";import"./DocsLink.Dc0vGNEI.js";import"./RplTextLink.css.Dgo4dlm2.js";import"./RplList.vue.BTBbvn8w.js";const Le=["for"],Ie={class:"rpl-search-bar__inner"},Ve=["onKeydown"],Be=["id","aria-owns","aria-expanded","placeholder"],Re=p("div",{class:"rpl-search-bar__menu"},[p("span",{class:"rpl-search-bar__menu-noresults"}," No results ")],-1),Ce=["id"],Te=["id","data-option-id","role","onKeydown","onClick"],ke={class:"rpl-search-bar__right"},Fe={type:"submit","aria-label":"search",class:"rpl-search-bar-submit rpl-u-focusable-inline"},Ae={key:0,class:"rpl-search-bar-submit__label rpl-type-label rpl-type-weight-bold"},De={class:"rpl-search-bar-submit__icon"},Ke={inheritAttrs:!1},Ne=G({...Ke,__name:"RplSearchBar",props:{variant:{default:"default"},id:{},autoFocus:{type:Boolean,default:!1},inputLabel:{default:"Search"},inputValue:{default:""},submitLabel:{type:[String,Boolean],default:"Search"},suggestions:{default:()=>[]},maxSuggestionsDisplayed:{default:10},placeholder:{default:""},globalEvents:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!1},getSuggestionVal:{type:Function,default:c=>c},getOptionLabel:{type:Function,default:c=>c},getOptionId:{type:Function,default:c=>c},isOptionSelectable:{type:Function,default:c=>!0},showLabel:{type:Boolean,default:!1},isFreeText:{type:Boolean,default:!0},submitOnClear:{type:Boolean,default:!1}},emits:["update:inputValue","submit"],setup(c,{emit:O}){const n=c,d=O,{emitRplEvent:C}=he("rpl-search-bar",d),o=i(""),T=i(null),f=i(null),_=i(null),k=i([]),S=i(null),y=J(()=>`${n.id}__menu`),l=i(!1),s=i(null),L=i(!1);oe(()=>{n.autoFocus&&(S.value=setTimeout(()=>{var e;return(e=f.value)==null?void 0:e.focus()},100))}),ue(()=>{S.value&&clearTimeout(S.value)}),ve(T,()=>{w(!1)});const F=e=>{C("submit",{action:"search",id:n.id,name:n.inputLabel,value:o.value,text:e==="button"?n.submitLabel:null,type:e},{global:n.globalEvents})},K=e=>{o.value=e.target.value,d("update:inputValue",e.target.value),l.value=!0},I=(e,t)=>{var r;const a=n.getOptionLabel(e);t&&((r=f.value)==null||r.focus()),o.value=n.getSuggestionVal(e),d("update:inputValue",e),l.value=!1,C("submit",{action:"search",id:n.id,text:n.getSuggestionVal(e),name:n.inputLabel,value:a,payload:e,type:"suggestion"},{global:n.globalEvents})},V=()=>n.getOptionId(n.suggestions[0]),g=(e=!1)=>{var t;l.value=!0,e&&((t=n.suggestions)!=null&&t.length)&&(s.value=V())},w=(e=!1)=>{var t;l.value=!1,s.value=null,e&&((t=f.value)==null||t.focus())},Z=async()=>{var e;L.value=!0,await N(),(e=f.value)==null||e.focus()},j=()=>{L.value=!1},X=async()=>{var e;d("update:inputValue",null),o.value="",n.submitOnClear&&C("submit",{action:"search",id:n.id,text:"",name:n.inputLabel,value:"",payload:null,type:"suggestion"},{global:n.globalEvents}),await N(),(e=f.value)==null||e.focus()},Y=()=>{const e=n.suggestions.findIndex(t=>n.getOptionId(t)===s.value);e<0?s.value=V():e<n.suggestions.length-1&&(s.value=n.getOptionId(n.suggestions[e+1]))},x=()=>{const e=n.suggestions.findIndex(t=>n.getOptionId(t)===s.value);e<0?s.value=V():e>0&&(s.value=n.getOptionId(n.suggestions[e-1]))},ee=e=>e>47&&e<58||e===32||e===8||e>64&&e<91||e>95&&e<112||e>185&&e<193||e>218&&e<223,te=e=>{var t;ee(e.keyCode)&&((t=f.value)==null||t.focus())},ae=e=>s.value===e,ne=e=>{const t=k.value.find(r=>r.dataset.optionId===e),a=_.value;if(a.scrollHeight>a.clientHeight){let r=a.clientHeight+a.scrollTop,M=t.offsetTop+t.offsetHeight;M>r?a.scrollTop=M-a.clientHeight:t.offsetTop<a.scrollTop&&(a.scrollTop=t.offsetTop)}t&&t.focus()};P(()=>n.inputValue,e=>{o.value=n.getSuggestionVal(e)},{immediate:!0}),P(s,async e=>{e!==null&&(await N(),ne(e))});const H=e=>e.toLowerCase().replace(/[^\w-]+/g,"-");return(e,t)=>(u(),b("form",{class:A({"rpl-search-bar":!0,[`rpl-search-bar--${e.variant}`]:!!e.variant,"rpl-search-bar--with-label":!!e.submitLabel,"rpl-search-bar--with-clear-btn":!!e.inputValue||!!o.value}),style:ce({"--local-max-items":e.maxSuggestionsDisplayed}),onSubmit:t[9]||(t[9]=m(a=>F("button"),["prevent"]))},[p("label",{class:A({"rpl-search-bar__label":!0,"rpl-u-visually-hidden":!e.showLabel,"rpl-type-h4-fixed":!0}),for:e.id},R(e.inputLabel),11,Le),p("div",Ie,[p("div",{ref_key:"containerRef",ref:T,class:"rpl-search-bar__input-wrap",onKeydown:[v(m(x,["prevent"]),["up"]),v(m(Y,["prevent"]),["down"]),t[5]||(t[5]=v(m(a=>w(!0),["prevent"]),["esc"])),t[6]||(t[6]=v(m(a=>w(!1),["exact"]),["tab"])),t[7]||(t[7]=v(m(a=>w(!1),["shift"]),["tab"]))]},[!e.isFreeText&&e.inputValue&&!L.value&&!l.value?(u(),b("div",{key:0,tabindex:"0",class:A({"rpl-search-bar__input":!0,"rpl-u-focusable-outline":!0,"rpl-u-focusable-outline--no-border":!0,"rpl-u-focusable--force-on":l.value}),onFocus:t[0]||(t[0]=a=>Z())},[E(e.$slots,"suggestion",{option:{option:e.inputValue}},()=>[U(R(e.getOptionLabel(e.inputValue)),1)])],34)):re((u(),b("input",pe({key:1},e.$attrs,{id:e.id,ref_key:"inputRef",ref:f,"onUpdate:modelValue":t[1]||(t[1]=a=>o.value=a),"aria-owns":y.value,autocomplete:"off","aria-autocomplete":"list","aria-expanded":l.value,placeholder:e.placeholder,role:"combobox",class:{"rpl-search-bar__input":!0,"rpl-u-focusable-outline":!0,"rpl-u-focusable-outline--no-border":!0,"rpl-u-focusable--force-on":l.value},type:"search",onInput:K,onFocus:t[2]||(t[2]=a=>g(!1)),onBlur:t[3]||(t[3]=a=>j()),onKeydown:t[4]||(t[4]=v(m(a=>F("enter"),["prevent"]),["enter"]))}),null,16,Be)),[[ie,o.value]]),e.showNoResults&&e.suggestions.length===0&&o.value&&l.value?E(e.$slots,"noresults",{key:2},()=>[Re]):D("",!0),e.suggestions.length&&l.value?(u(),b("div",{key:3,id:y.value,ref_key:"menuRef",ref:_,class:"rpl-search-bar__menu",role:"listbox",tabindex:"-1"},[(u(!0),b(Q,null,W(e.suggestions,a=>(u(),b("div",{id:H(e.getOptionId(a)),key:`opt-${H(e.getOptionId(a))}`,ref_for:!0,ref_key:"optionRefs",ref:k,"data-option-id":e.getOptionId(a),role:e.isOptionSelectable(a)?"option":null,class:A({"rpl-search-bar__menu-option":!0,"rpl-u-focusable-block":!0,"rpl-u-focusable--force-on":ae(e.getOptionId(a))}),tabindex:"-1",onKeydown:[v(m(r=>e.isOptionSelectable(a)&&I(a,!0),["prevent"]),["space"]),v(m(r=>e.isOptionSelectable(a)&&I(a,!0),["prevent"]),["enter"]),r=>e.isOptionSelectable(a)&&te],onClick:r=>e.isOptionSelectable(a)&&I(a,!1)},[E(e.$slots,"suggestion",{option:{option:a}},()=>[U(R(e.getOptionLabel(a)),1)])],42,Te))),128))],8,Ce)):D("",!0)],40,Ve),p("div",ke,[o.value||e.inputValue?(u(),b("button",{key:0,type:"button","aria-label":"Clear search",class:"rpl-search-bar__clear rpl-u-focusable-inline",onClick:t[8]||(t[8]=a=>X())},[h(z,{name:"icon-cancel-circle-filled"})])):D("",!0),p("button",Fe,[e.submitLabel?(u(),b("span",Ae,R(e.submitLabel),1)):D("",!0),p("span",De,[h(z,{name:"icon-search",size:"m"})])])])])],38))}}),Ee={class:"rpl-u-margin-b-8"},ot=G({__name:"module-listing",async setup(c){let O,n;const{page:d}=de();Se(d);const T=fe().params.slug[0]==="framework",{data:f}=([O,n]=me(async()=>Oe("module-listing",async()=>await ge().where({isModuleInfo:{$eq:!0}}).find())),O=await O,n(),O),_=i(""),k=J(()=>(f.value||[]).filter(S=>{const y=S.name.toLowerCase(),l=_.value.toLowerCase();return y.includes(l)}));return(S,y)=>{const l=le,s=se,L=Ne,F=_e,K=ye,I=we,V=$e;return u(),q(V,{theme:T?"module":"default"},{menuContents:$(()=>[h(l)]),default:$(()=>[h(I,{hideMobileSidebar:""},{aside:$(()=>[h(l)]),pageHeader:$(()=>[h(s,{title:B(d).title,description:B(d).description,links:B(d).links},null,8,["title","description","links"]),p("div",Ee,[h(L,{id:"listing-search",inputValue:B(_),"onUpdate:inputValue":y[0]||(y[0]=g=>be(_)?_.value=g:null)},null,8,["inputValue"])])]),default:$(()=>[h(K,null,{default:$(()=>[(u(!0),b(Q,null,W(B(k),g=>{var w;return u(),q(F,{key:g._path,title:g.name,url:`${(w=g._path)==null?void 0:w.replace(/\/_module$/,"")}`},{default:$(()=>[p("p",null,R(g.description),1)]),_:2},1032,["title","url"])}),128))]),_:1})]),_:1})]),_:1},8,["theme"])}}});export{ot as default};