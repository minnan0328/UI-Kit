import{_ as k,r as v,a as g,o as t,b as n,d as s,j as _,w as o,F as c,e as p,p as U,i as y,k as m,g as f,v as h}from"./index.26679129.js";import{c as I,s as V}from"./slide.a36a8b76.js";const b={components:{carousel:I,slide:V},setup(){const l=v([{url:"",media:new URL("/Vue-UI-Kit/assets/annie-spratt-S7viz8JWxwY-unsplash.be1dc3eb.jpg",self.location).href,mediaText:"annie"},{url:"",media:new URL("/Vue-UI-Kit/assets/daiga-ellaby-ClWvcrkBhMY-unsplash.50a320f8.jpg",self.location).href,mediaText:"daiga"},{url:"",media:new URL("/Vue-UI-Kit/assets/josefin-WS5yjFjycNY-unsplash.b5bc7055.jpg",self.location).href,mediaText:"daiga"}]),w=v([{url:"https://www.pexels.com/video/black-and-white-video-of-people-853889/",media:new URL("/Vue-UI-Kit/assets/Pexels-Videos-2670.822671fb.mp4",self.location).href,mediaText:""},{url:"https://www.pexels.com/video/people-watching-a-band-854054/",media:new URL("/Vue-UI-Kit/assets/Pexels-Videos-2834.1d932ede.mp4",self.location).href,mediaText:""},{url:"https://www.pexels.com/video/video-of-people-walking-855564/",media:new URL("/Vue-UI-Kit/assets/Video-Of-People-Walking.e32f2150.mp4",self.location).href,mediaText:""}]);return{images:l,videos:w}}},x=l=>(U("data-v-4ca0111f"),l=l(),y(),l),T={class:"images full-images"},j=["src","alt"],L=x(()=>s("p",null,"\u4E0D\u555F\u7528\u81EA\u52D5\u8F2A\u64AD",-1)),S={class:"images small-images"},B=["src","alt"],K=x(()=>s("p",null,"\u5F71\u7247",-1)),R={class:"videos small-video"},P=["href"],W=["src","alt"];function C(l,w,F,d,N,Y){const r=g("slide"),u=g("carousel",!0);return t(),n(c,null,[s("div",T,[_(u,null,{default:o(({currentSlide:i})=>[(t(!0),n(c,null,p(d.images,(e,a)=>m((t(),f(r,{key:a},{default:o(()=>[s("img",{src:e.media,alt:e.mediaText},null,8,j)]),_:2},1024)),[[h,a===i]])),128))]),_:1})]),L,s("div",S,[_(u,{autoPlay:!1,navigationBtnSmall:!0},{default:o(({currentSlide:i})=>[(t(!0),n(c,null,p(d.images,(e,a)=>m((t(),f(r,{key:a},{default:o(()=>[s("img",{src:e.media,alt:e.mediaText},null,8,B)]),_:2},1024)),[[h,a===i]])),128))]),_:1})]),K,s("div",R,[_(u,null,{default:o(({currentSlide:i})=>[(t(!0),n(c,null,p(d.videos,(e,a)=>m((t(),f(r,{key:a},{default:o(()=>[s("a",{href:e.url,target:"_blank"},[s("video",{src:e.media,alt:e.mediaText,muted:"",autoplay:"",loop:"",playsInline:""},null,8,W)],8,P)]),_:2},1024)),[[h,a===i]])),128))]),_:1})])],64)}const D=k(b,[["render",C],["__scopeId","data-v-4ca0111f"]]);export{D as default};