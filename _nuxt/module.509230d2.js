import C from"./DocsModuleNavigation.0d7be3ce.js";import v from"./DocsNavLink.75a6088a.js";import k from"./DocsModuleInfo.7035dd1d.js";import h from"./DocsPageHeader.89107e31.js";import $ from"./ContentRenderer.50d6bc40.js";import{_ as w}from"./AppSidebarLayout.vue.b3715c7a.js";import{_ as D}from"./AppLayout.vue.c38a8e8e.js";import{u as N}from"./asyncData.7bf7ed1b.js";import{d as b,U as A,m as M,Z as S,E as i,w as e,b as _,g as n,C as I,M as t,e as V,f as B,q as H}from"./entry.68a6130c.js";import{u as L}from"./head.0ed9c245.js";import{_ as q}from"./_plugin-vue_export-helper.c27b6911.js";import"./useDocsNavigation.1586aade.js";import"./RplLink.vue.3fe80392.js";import"./useRippleEvent.b5ca0aae.js";import"./RplIcon.vue.d2bff4d9.js";import"./nuxt-link.49e6b0e8.js";import"./ready.26a75326.js";import"./DocsLink.9b2e99c7.js";import"./RplTextLink.css.d2446206.js";import"./ContentRendererMarkdown.2395f21a.js";import"./index.9b0bef9c.js";import"./config.3da5d236.js";import"./index.0f008ba9.js";import"./RplImage.css.3697ccaf.js";import"./RplList.vue.3d4ba8ee.js";import"./RplExpandable.vue.f04b5476.js";const P={class:"docs-sidebar-nav"},R=b({__name:"module",async setup(E){let a,m;const{page:o}=A();L(o);const s=M(),c=s.params.slug[0]==="framework",{data:p}=([a,m]=S(async()=>N(`module-info-${s.params.slug[2]}`,async()=>await H(`${s.params.slug[0]}/${s.params.slug[1]}/${s.params.slug[2]}/_module`).findOne()||null)),a=await a,m(),a);return(u,T)=>{const r=C,l=v,d=k,f=h,g=$,x=w,y=D;return _(),i(y,{theme:c?"module":"default"},{menuContents:e(()=>[n(r)]),default:e(()=>[n(x,{hideMobileSidebar:!1},{aside:e(()=>[n(l,{url:"/framework/modules/all-modules",icon:"icon-chevron-left",iconPosition:"start"},{default:e(()=>[I("All modules")]),_:1}),n(d,{module:t(p)},null,8,["module"]),V("div",P,[n(r)])]),pageHeader:e(()=>[n(f,{title:t(o).title,description:t(o).description,links:t(o).links},null,8,["title","description","links"])]),default:e(()=>[t(o)?(_(),i(g,{tag:t(o).tag||"DocsContent",key:t(o)._id,value:t(o)},null,8,["tag","value"])):B("",!0)]),_:1})]),_:1},8,["theme"])}}});const fo=q(R,[["__scopeId","data-v-2a19721d"]]);export{fo as default};
