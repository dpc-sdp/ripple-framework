import C from"./DocsModuleNavigation.68c1293f.js";import v from"./DocsNavLink.03ffe486.js";import k from"./DocsModuleInfo.c3dfce2c.js";import h from"./DocsPageHeader.3822a4ba.js";import $ from"./ContentRenderer.f1780662.js";import{_ as w}from"./AppSidebarLayout.vue.809948c3.js";import{_ as D}from"./AppLayout.vue.46e96435.js";import{u as N}from"./asyncData.897f9bab.js";import{d as b,U as A,m as M,Z as S,E as i,w as e,b as _,g as n,C as I,M as t,e as V,f as B,q as H}from"./entry.35c879e9.js";import{u as L}from"./head.feb7b9db.js";import{_ as q}from"./_plugin-vue_export-helper.c27b6911.js";import"./useDocsNavigation.4f68f58b.js";import"./RplLink.vue.d3b6ca07.js";import"./useRippleEvent.4dbc2519.js";import"./RplIcon.vue.69924f16.js";import"./nuxt-link.f027f1ed.js";import"./ready.1db4a3ee.js";import"./DocsLink.797e7182.js";import"./RplTextLink.css.227d7d25.js";import"./ContentRendererMarkdown.d5ce9758.js";import"./index.9b0bef9c.js";import"./config.5da66e9b.js";import"./index.5b0f0823.js";import"./RplImage.css.3dc67a1d.js";import"./RplList.vue.108f9c73.js";import"./RplExpandable.vue.a06b4aaf.js";const P={class:"docs-sidebar-nav"},R=b({__name:"module",async setup(E){let a,m;const{page:o}=A();L(o);const s=M(),c=s.params.slug[0]==="framework",{data:p}=([a,m]=S(async()=>N(`module-info-${s.params.slug[2]}`,async()=>await H(`${s.params.slug[0]}/${s.params.slug[1]}/${s.params.slug[2]}/_module`).findOne()||null)),a=await a,m(),a);return(u,T)=>{const r=C,l=v,d=k,f=h,g=$,x=w,y=D;return _(),i(y,{theme:c?"module":"default"},{menuContents:e(()=>[n(r)]),default:e(()=>[n(x,{hideMobileSidebar:!1},{aside:e(()=>[n(l,{url:"/framework/modules/all-modules",icon:"icon-chevron-left",iconPosition:"start"},{default:e(()=>[I("All modules")]),_:1}),n(d,{module:t(p)},null,8,["module"]),V("div",P,[n(r)])]),pageHeader:e(()=>[n(f,{title:t(o).title,description:t(o).description,links:t(o).links},null,8,["title","description","links"])]),default:e(()=>[t(o)?(_(),i(g,{tag:t(o).tag||"DocsContent",key:t(o)._id,value:t(o)},null,8,["tag","value"])):B("",!0)]),_:1})]),_:1},8,["theme"])}}});const fo=q(R,[["__scopeId","data-v-2a19721d"]]);export{fo as default};
