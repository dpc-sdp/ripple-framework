import{u as s}from"./asyncData.7e4d743a.js";import{d as n,aw as i,ah as f}from"./entry.c5146540.js";import{u as o}from"./useGithub.231b5645.js";import"./ready.c1369ea4.js";const p=n({props:{query:{type:Object,required:!1,default:()=>({})}},async setup(a){const{fetchRelease:t}=o();if(!a.query.tag)return;const{data:u,refresh:e,pending:r}=await s(`github-release-${i(a.query)}`,()=>t(a.query));return{release:u,refresh:e,pending:r}},render({release:a,refresh:t,pending:u}){var r;const e=f();return(r=e==null?void 0:e.default)==null?void 0:r.call(e,{release:a,refresh:t,pending:u})}});export{p as default};
