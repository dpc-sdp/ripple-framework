import{r as l,o as f,d as h,I as v,b as _,E as g,w as x,X as y,e as m,n as B,D as w,ar as C,T as E}from"./entry.68a6130c.js";function b(a,s,n=null){const t=l(n);return f(()=>{t.value=parseFloat(getComputedStyle(a.value).getPropertyValue(s))*1e3}),t}const S=h({__name:"RplExpandable",props:{expanded:{type:Boolean,default:!1}},setup(a){const s=a,n=l(null),t=b(n,"--rpl-motion-speed-9",420);function r(e){e.style.height="0px"}function i(e,o){e.style.height=`${e.scrollHeight}px`,setTimeout(o,t.value)}function p(e){e.style.height="auto",e.style.overflow="initial"}function u(e){e.style.height=`${e.getBoundingClientRect().height}px`,e.style.overflow="hidden"}function d(e,o){e.style.height="0px",setTimeout(o,t.value)}const c=v(()=>({"rpl-expandable":!0,["rpl-expandable--open"]:s.expanded}));return(e,o)=>(_(),g(E,{onBeforeEnter:r,onEnter:i,onAfterEnter:p,onBeforeLeave:u,onLeave:d},{default:x(()=>[y(m("div",{ref_key:"containerRef",ref:n,class:B(c.value),role:"region"},[w(e.$slots,"default")],2),[[C,e.expanded]])]),_:3}))}});export{S as _};