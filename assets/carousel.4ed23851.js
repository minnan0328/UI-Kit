import{_ as x,r as v,a as g,o as a,b as i,d as t,j as u,w as l,F as n,e as m,k as _,g as p,v as f}from"./index.db3768ce.js";import{c as k,s as U}from"./slide.eb8253ef.js";const V={components:{carousel:k,slide:U},setup(){const h=v([{url:"",media:new URL("/Vue-UI-Kit/assets/annie-spratt-S7viz8JWxwY-unsplash.be1dc3eb.jpg",self.location).href,mediaText:"annie"},{url:"",media:new URL("/Vue-UI-Kit/assets/daiga-ellaby-ClWvcrkBhMY-unsplash.50a320f8.jpg",self.location).href,mediaText:"daiga"},{url:"",media:new URL("/Vue-UI-Kit/assets/josefin-WS5yjFjycNY-unsplash.b5bc7055.jpg",self.location).href,mediaText:"daiga"}]),w=v([{url:"https://www.pexels.com/video/black-and-white-video-of-people-853889/",media:new URL("/Vue-UI-Kit/assets/Pexels-Videos-2670.822671fb.mp4",self.location).href,mediaText:""},{url:"https://www.pexels.com/video/people-watching-a-band-854054/",media:new URL("/Vue-UI-Kit/assets/Pexels-Videos-2834.1d932ede.mp4",self.location).href,mediaText:""},{url:"https://www.pexels.com/video/video-of-people-walking-855564/",media:new URL("/Vue-UI-Kit/assets/Video-Of-People-Walking.e32f2150.mp4",self.location).href,mediaText:""}]);return{images:h,videos:w}}},b={class:"images full-images"},y=["src","alt"],T={class:"images small-images"},j=["src","alt"],I={class:"videos small-video"},L=["href"],B=["src","alt"];function K(h,w,R,c,P,S){const r=g("slide"),d=g("carousel",!0);return a(),i(n,null,[t("div",b,[u(d,null,{default:l(({currentSlide:o})=>[(a(!0),i(n,null,m(c.images,(e,s)=>_((a(),p(r,{key:s},{default:l(()=>[t("img",{src:e.media,alt:e.mediaText},null,8,y)]),_:2},1024)),[[f,s===o]])),128))]),_:1})]),t("div",T,[u(d,{navigationBtnSmall:!0},{default:l(({currentSlide:o})=>[(a(!0),i(n,null,m(c.images,(e,s)=>_((a(),p(r,{key:s},{default:l(()=>[t("img",{src:e.media,alt:e.mediaText},null,8,j)]),_:2},1024)),[[f,s===o]])),128))]),_:1})]),t("div",I,[u(d,{autoPlay:!1},{default:l(({currentSlide:o})=>[(a(!0),i(n,null,m(c.videos,(e,s)=>_((a(),p(r,{key:s},{default:l(()=>[t("a",{href:e.url,target:"_blank"},[t("video",{src:e.media,alt:e.mediaText,muted:"",autoplay:"",loop:""},null,8,B)],8,L)]),_:2},1024)),[[f,s===o]])),128))]),_:1})])],64)}const F=x(V,[["render",K],["__scopeId","data-v-95c15f95"]]);export{F as default};
