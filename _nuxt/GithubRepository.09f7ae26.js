import{u as s}from"./asyncData.7e4d743a.js";import{d as u,aw as i,ah as n}from"./entry.c5146540.js";import{u as p}from"./useGithub.231b5645.js";import"./ready.c1369ea4.js";const h=u({props:{query:{type:Object,required:!1,default:()=>({})}},async setup(r){const{fetchRepository:a}=p(),{data:o,refresh:e,pending:t}=await s(`github-repository-${i(r.query)}`,()=>a(r.query));return{repository:o,refresh:e,pending:t}},render({repository:r,refresh:a,pending:o}){var t;const e=n();return(t=e==null?void 0:e.default)==null?void 0:t.call(e,{repository:r,refresh:a,pending:o})}});export{h as default};
