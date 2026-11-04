import{B as ht,a as $,M as j,P as En,V as _,S as Mt,D as St,F as eu,U as Ln,b as _n,c as yn,d as as,I as xf,e as ar,f as ss,g as Mf,C as oa,L as ou,h as au,G as yt,i as rt,j as Rn,k as F,m as kt,l as Is,n as se,o as ie,p as is,q as su,r as Lt,s as iu,Q as xt,t as it,u as qt,v as vt,w as sr,x as cu,T as ir,y as cr,A as sn,z as Ve,E as pc,H as rr,J as kf,K as ma,N as ru,O as lu,R as Sf,W as hu,X as Tf,Y as Af,Z as Nf,_ as uu,$ as so,a0 as zf,a1 as Cf,a2 as Ef,a3 as Lf,a4 as Jr,a5 as _f,a6 as t0,a7 as Rf,a8 as n0,a9 as If,aa as Pf,ab as Bf,ac as Hf,ad as Ff,ae as $f,af as Gf,ag as Of}from"./three-C4iCFrFA.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const Df=6e3,lr=[];function Uf(t){return lr.push(t),t}const hr=new Promise(t=>{const n=()=>{Promise.allSettled(lr).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>t(),{timeout:1500}):setTimeout(t,100)})};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0}),setTimeout(t,Df)}),mu=()=>Promise.allSettled(lr).then(()=>{});let du=()=>{};const fu=new Promise(t=>du=t),Kf=()=>du(),Vf=t=>fetch(t,{priority:"low"}).then(n=>n.ok?n.arrayBuffer():null).catch(()=>null);function qf(){const t=window.SR_SW,n=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!t||!n||!("serviceWorker"in navigator)||hr.then(()=>navigator.serviceWorker.register(t).catch(e=>console.warn("[skyrun] sw",e)))}const e0=400,cs=t=>Math.max(0,Math.min(1,t));function io(t,n){const e=t<=n.hardAt?n.d0+(1-n.d0)*cs((t-e0)/(n.hardAt-e0)):1+.15*cs((t-n.hardAt)/3e3);return n.cap===void 0?e:Math.min(e,n.cap)}const Wf=[0,.12,.3,.5,.75];function Yf(t){let n=0;return Wf.forEach((e,o)=>{t>=e&&(n=o)}),n}function jf(t){return Math.max(-.2,.35-.55*t)}function Xf(t){return t<=1?1-.28*cs((t-.3)/.7):.72-.06*cs((t-1)/.15)}const Zf=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function Qf(t,n){return t<.5||n%2===0}const P={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,gateRadiusX:2.6,gateTailwind:10,gateScore:40,maxHp:2,reactWindow:1,shieldMinGap:3e3,shieldMaxGap:4200,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,wishLanternMul:10,wishGateV:4,wishPickV:5.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2,boostTime:5,boostMulMin:1.35,boostMulMax:1.8,boostFade:1.2,boostScoreMul:2},Qe=2;function Tt(t){return-t*P.laneGap}function ur(t,n){const e=Math.min(1,io(t,n));return P.speedStart+(P.speedMax-P.speedStart)*(1-(1-e)*(1-e))}const Wt={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function Ko(t,n,e,o){const a=Wt[t.kind];return Math.abs(o)>a.halfZ||Math.abs(n-Tt(t.lane))>=a.halfX+P.hitHalfWidth?!1:e-P.hitHalfHeight<a.hi&&e+P.hitHalfHeight>a.lo}function Jf(t,n,e){return Math.abs(n-Tt(t.lane))>=Wt[t.kind].halfX+P.hitHalfWidth?!0:e==="flare"?t.kind==="spike"||t.kind==="ridge":e==="dive"?t.kind==="bridge"||t.kind==="overhang":!1}function tg(t,n){return t.z+Wt[t.kind].halfZ<n}const ng=[P.flareHeight,0,-5.5],eg=0,gu=1,og=2;function Bo(t,n,e){return!t.some(o=>Ko(o,Tt(n),ng[e],0))}function ag(t){const n=[];for(let e=-1;e<=1;e++)for(let o=0;o<3;o++)Bo(t,e,o)&&n.push({lane:e,tier:o});return n}function o0(t){return ag(t).length}function si(t,n,e){return e?t.some(o=>(o.kind==="pillar"||o.kind==="overhang")&&o.lane===n)?"none":"any":Bo(t,n,gu)?"any":Bo(t,n,eg)?"high":Bo(t,n,og)?"low":"none"}function sg(t,n,e,o,a){const s=t.thermalV>8,c=t.low&&!s,i=(n[0].z-t.z)/t.speed,r=m=>{const d=si(n,m,s);if(d==="none")return 1/0;const g=d==="any"?0:d==="low"&&c?.3:1.5;return Math.abs(m-t.lane)+g+(e&&si(e,m,s)==="none"?.6:0)},h=[-1,0,1].filter(m=>r(m)<1/0).sort((m,d)=>r(m)-r(d))[0];if(h===void 0)return i<o+.12&&t.vert!=="flare"?["up"]:[];const u=si(n,h,s);if(h===t.lane&&u==="any")return null;const l=[],f=a&&h===t.lane&&t.pickups.some(m=>!m.taken&&m.lane===t.lane&&m.z>t.z&&m.z<n[0].z&&(u==="low"?m.v<-2:m.v>2)&&(m.z-t.z)/t.speed<.2);if(u==="high"){const m=t.vert!=="flare"||t.vertT>=P.vertIn+P.vertHold;(i<o+.12+(c?.06:0)||f)&&m&&l.push("up")}else u==="low"&&(i<o+.12||f)&&((t.alt?t.low:t.vert==="dive"&&t.vertT<P.vertIn+P.vertHold)||l.push("down"));if(h!==t.lane){const m=o+(Math.abs(h-t.lane)-1)*P.laneTime*1.3;i<=m&&l.push(h<t.lane?"left":"right")}return l}function pu(t,n){const e=new Map;for(const o of t.obstacles){const a=o.z-t.z;if(o.passed||a<-Wt[o.kind].halfZ||a>n)continue;const s=e.get(o.row)??[];s.push(o),e.set(o.row,s)}return[...e.values()].sort((o,a)=>o[0].z-a[0].z)}function a0(t){return new Set(t.filter(n=>n.kind==="pillar"||n.kind==="spike"||n.kind==="overhang").map(n=>n.lane))}function ig(t,n=.27,e=!0){if(t.mode!=="run")return[];const o=pu(t,t.speed*2.2),a=o[0],s=c=>e?rg(t,c):[];return a?sg(t,a,o[1],n,e)??s(a):cg(t)??s()}function cg(t){const n=t.gusts.find(a=>!a.taken&&!a.missed&&a.z+a.len>t.z),e=t.gates.find(a=>!a.hit&&!a.missed&&a.z>t.z);if(e&&(e.z-t.z<t.speed*.45||e.z-t.z<t.speed*1.5&&(!n||e.z<Math.max(n.z,t.z))))return e.lane===t.lane||t.laneT<1?[]:[e.lane<t.lane?"left":"right"];if(!n||n.z-t.z>t.speed*1.5)return null;if(n.lane!==t.lane)return t.laneT<1?[]:[n.lane<t.lane?"left":"right"];const o=(n.z-t.z)/t.speed;return yu(t,n.v,o)?["up"]:o>.25?[]:n.v>2&&t.vert!=="flare"?["up"]:n.v<-2&&!vu(t)?["down"]:[]}function vu(t){return t.alt?t.low:t.vert==="dive"}function yu(t,n,e){return t.alt&&t.low&&t.vert==="cruise"&&Math.abs(n)<=2&&e<.9}function rg(t,n){const e=t.pickups.find(c=>!c.taken&&c.kind==="lantern"&&c.lane===t.lane&&c.z>t.z);if(e&&t.thermalV<2){const c=(e.z-t.z)/t.speed;if(yu(t,e.v,c))return["up"];if(e.v>2&&t.vert!=="flare"&&c<.2)return["up"];if(e.v<-2&&!vu(t)&&c<.2)return["down"]}const o=t.pickups.find(c=>!c.taken&&c.z-t.z>t.speed*.35&&c.z-t.z<t.speed*1.2);if(!o||o.lane===t.lane||t.laneT<1)return[];const a=o.lane<t.lane?-1:1;return n&&a0(n).has(t.lane+a)?[]:pu(t,o.z-t.z).some(c=>a0(c).has(t.lane+a))?[]:[a<0?"left":"right"]}const lg=["mu-cang-chai","khau-pha","ha-giang","fansipan"],vc="skyrun.map";function hg(t){const n=["khau-pha","ha-giang"],e=s=>{try{return JSON.parse(t.getItem(s)??"null")}catch{return null}},o=e("skyrun.meters"),a=e("skyrun.played");return n.some(s=>typeof o?.[s]=="number"&&o[s]>0||!!t.getItem(`skyrun.best.${s}`)||Array.isArray(a)&&a.includes(s))||Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")}function ii(t){return lg.find(n=>n===t)??null}function ug(){const t=globalThis;if(t.location){const e=ii(new URLSearchParams(t.location.search).get("map"));if(e)return e;let o="mu-cang-chai";try{const a=t.localStorage;if(!a)return o;const s=ii(a.getItem(vc));if(s)return s;o=hg(a)?"khau-pha":"mu-cang-chai";try{a.setItem(vc,o)}catch{}}catch{}return o}const n=t.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return ii(n??t.process?.env?.SKYRUN_MAP)??"khau-pha"}const Bt=ug();function da(t,n,e){let o=Math.imul(t,374761393)^Math.imul(n,668265263)^Math.imul(e+1,2246822519);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function s0(t){return t*t*t*(t*(t*6-15)+10)}function N(t,n,e){const o=Math.floor(t),a=Math.floor(n),s=s0(t-o),c=s0(n-a),i=da(o,a,e),r=da(o+1,a,e),h=da(o,a+1,e),u=da(o+1,a+1,e);return i+(r-i)*s+(h-i)*c+(i-r-h+u)*s*c}function Ft(t,n,e,o){let a=0,s=1,c=0,i=1;for(let r=0;r<e;r++)a+=N(t*i,n*i,o+r*31)*s,c+=s,s*=.5,i*=2.03;return a/c}function yc(t,n,e,o){let a=0,s=1,c=0,i=1,r=1;for(let h=0;h<e;h++){const u=1-Math.abs(N(t*i,n*i,o+h*17)*2-1),l=u*u*r;r=Math.min(1,l*1.6),a+=l*s,c+=s,s*=.5,i*=2.1}return a/c}function zn(t){return t<0?0:t>1?1:t}function R(t,n,e){const o=zn((e-t)/(n-t));return o*o*(3-2*o)}function V(t,n,e){return t+(n-t)*e}const mg=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],dg=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],fg=[[430,100,270],[1520,-100,270],[2280,40,300],[2560,-40,300]],gg=[[690,90,260],[1098.4,-90,260],[1880,30,320],[2090,-30,320],[3300,-90,260]],Yt={"mu-cang-chai":{id:"mu-cang-chai",name:"Mù Cang Chải",tagline:"Thả mình từ đỉnh đồi, men sườn ruộng bậc thang, băng thung lũng Nậm Kim.",region:"mu-cang-chai",listed:!0,cycle:3100,offset:60,dayCycles:3,dayCutPhase:1200,arcs:fg,profile:{d0:0,hardAt:12e3,cap:.7,tighten:.4,shieldMaxGap:3400},routePrefix:"mc",routeVersion:3,online:!0,logRvBase:2e3,unlock:null},"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",listed:!0,cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:mg,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:{from:"mu-cang-chai",run:1e4,meters:2e4}},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",listed:!0,cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:dg,profile:{d0:.2,hardAt:5e3,tighten:1.4},routePrefix:"hg",routeVersion:3,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}},fansipan:{id:"fansipan",name:"Fansipan",tagline:"Nhảy khỏi nóc nhà Đông Dương, lao xuyên hai tầng mây, lướt trên biển mây.",region:"fansipan",listed:!0,cycle:4100,offset:20,dayCycles:2,dayCutPhase:500,arcs:gg,profile:{d0:.35,hardAt:3600,tighten:1.5,shieldMaxGap:3800},routePrefix:"fp",routeVersion:1,online:!0,logRvBase:3e3,unlock:{from:"ha-giang",score:16e3,meters:39e3}}},gt=Yt[Bt],ct=gt.cycle,_t=gt.offset,Kt=1100,bu=1320,bc=2450,wu=2700,pg=150,fo=1480,fa=1770,vg=[320,640,930];function yg(t){let n=0;for(const e of vg)n=Math.max(n,1-R(0,70,Math.abs(t-e)));return n}function i0(t){return t<Kt?0:t<bc?R(Kt,bu,t):1-R(bc,wu,t)}const bg={edge:Kt,pullOut:fo,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:i0,dive(t){const n=R(Kt+40,Kt+380,t)-R(bc-650,wu-60,t);return pg*n},sill(t){return R(760,940,t)*(1-R(1092,1108,t))},village(t,n){return n%2!==0?0:R(1600,1720,t)*(1-R(2380,2500,t))},halfWidth(t){const n=V(64,30,t<Kt?yg(t):0);return V(n,430,i0(t))},extraDepth:()=>0,reveal(t){return zn(R(fo-20,fo+60,t)*(1-R(1640,1760,t)))},drop(t){return R(Kt-25,Kt+10,t)*(1-R(fo-40,fo+20,t))},clean(t){return R(Kt-40,Kt-10,t)*(1-R(1600,1690,t))},zone(t,n){return t<Kt-60?"gorge":t<bu?"mouth":n?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},go=300,po=680,c0=2320,wg=2880,Dt=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function xu(t,n,e,o){if(t<=n)return 0;if(t>=e)return 1;const a=e-n,s=1/(a-o),c=t-n;return c<o?s*c*c/(2*o):c>a-o?1-s*(a-c)**2/(2*o):s*(c-o/2)}function xg(t){const n=Math.min(1,Math.max(0,(t-c0)/(wg-c0)))**1.5;return n*n*(3-2*n)}function ci(t){return 1-.65*R(400,680,t)+.2*R(1500,1750,t)+.45*R(2350,2700,t)}function Mg(t){return V(140,220,R(1500,1750,t))}function kg(t){return 1-R(350,650,t)+R(2650,2950,t)}function Sg(t){return 410+60*R(400,680,t)-27*R(1500,1750,t)-33*R(2700,3200,t)}function Tg(t){return t<600?-80:t<760?V(-80,-118,R(600,760,t)):t<1480?V(-118,-218,xu(t,760,1480,80)):t<2380?-218:t<4e3?V(-218,100,R(2380,2530,t)):V(100,-80,R(4e3,4100,t))}const Ag={level:Tg,cover:t=>1-.4*Dt(t,1760,2300,60)},Ng={level:()=>-350,cover:t=>Dt(t,700,2560,60),eye:{phase:1660,radius:130,swirl:3.2}},zg={edge:go,pullOut:po,archPhases:[],caves:[],tower:{phase:2640,latMin:90,latMax:250,mirror:!0},openness:ci,dive(t){return-150+300*R(go+10,po,t)+100*xu(t,760,1480,80)+180*R(1510,1740,t)-580*xg(t)},sill(t){return R(1700,1760,t)*(1-R(2300,2360,t))},village(){return 0},halfWidth(t){return V(Mg(t),V(430,1100,kg(t)),ci(t))},extraDepth(t){return Math.max(0,Sg(t)-V(150,240,ci(t)))},reveal(t){return Dt(t,2800,3200,60)},drop(t){return Dt(t,go-10,po-10,30)+Dt(t,1500,1730,25)},clean(t){return Dt(t,go-25,po+50,25)+Dt(t,1465,1815,20)+Dt(t,2315,3150,20)},road(){return 0},roadDepth(){return 0},cloud(t){return 1-.45*Dt(t,720,1480,60)-.9*Dt(t,1720,2330,60)},cloudDecks:[Ag,Ng],landmarks:[{kind:"chop-fansipan",phase:70,lat:26,drop:6}],cableLine:{from:700,to:1490,clear:38},rain:t=>Dt(t,1700,2360,70),waterLevel:-443,lanternScale:2.4,skyLanternFloor:90,hazardBeacons:!0,pilotRollMax:.85,sunGlare:.55,chaseTilt:{up:.9,lookDown:2},climbCam:.8,climbFrame:1,windRibbon:{width:.45,minAngle:.0045},speedBlur:.3,plungeTop:t=>Dt(t,340,500,40)+Dt(t,1530,1700,35),plungeSide:t=>Dt(t,560,630,35),zoneNames:{rim:"Đỉnh Fansipan",dive:"Rơi tự do",gorge:"Cáp treo giữa hai tầng mây",river:"Suối Mường Hoa",climb:"Cột gió nhiệt",valley:"Biển mây Hoàng Liên",mouth:"Mắt xoáy mây"},zoneLines:{rim:"dinh-fansipan",dive:"xuyen-may",gorge:"cap-treo",mouth:"mat-xoay-may",river:"suoi-muong-hoa",climb:"troi-khoi-may",valley:"bien-may"},zone(t){return t<go?"rim":t<po?"dive":t<1500?"gorge":t<1750?"mouth":t<2300?"river":t<2810?"climb":t<4e3?"valley":"rim"}},re=600,ga=1060,Mu=320,Cg=Mu+13;function ri(t){return R(2230,2420,t)*(1-R(3420,3520,t))}function Eg(t){if(t<300)return V(30,170,R(0,140,t));let n=170;return n=V(n,110,R(900,1150,t)),n=V(n,60,R(2200,2260,t)),V(n,30,R(3440,3520,t))}const Lg={edge:re,pullOut:ga,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:ri,dive(t){return Mu*(R(re+20,ga,t)-R(2215,2740,t))},sill(t){return R(1040,1120,t)*(1-R(2205,2260,t))},village(t){return R(2800,2900,t)*(1-R(3380,3480,t))},halfWidth(t){return V(Eg(t),430,ri(t))},extraDepth(t){if(t<2200)return 190*R(20,160,t);const n=Cg-V(150,240,ri(t));return V(190,n,R(2200,2260,t))*(1-R(2760,2900,t))},reveal(t){return R(2190,2270,t)*(1-R(2560,2700,t))},drop(t){return R(re-25,re+10,t)*(1-R(ga-40,ga+20,t))},clean(t){return R(re-40,re-10,t)*(1-R(1100,1160,t))+R(2200,2230,t)*(1-R(2700,2760,t))},road(t){return R(60,220,t)*(1-R(1700,1860,t))},roadDepth(t){return 55+28*Math.sin(t/170)+12*Math.sin(t/61+1.3)},cloud(t){return 1-R(-1,120,t)*(1-R(2250,2600,t))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zoneLines:{rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},zone(t){return t<re?"rim":t<1100?"dive":t<1900?"river":t<2200?"cave":t<2750?"climb":t<3500?"village":"gate"}},zt=180,Tn=430,pe=905,qa=1075,Wa=1400,Vo=2e3,qo=2500,Ut=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function wc(t){return 140*R(zt,Tn,t)+30*zn((t-Tn)/(850-Tn))+60*R(pe,qa,t)-90*R(1100,1380,t)+40*R(Wa,1520,t)+25*zn((t-1540)/450)-205*R(2520,3080,t)}const r0=370,Ho=t=>R(pe,pe+15,t)*(1-R(1330,1510,t)),xc=360,Ya=t=>R(zt+10,zt+30,t)*(1-R(xc-20,xc+30,t)),l0=t=>Ut(t,480,860,60)+Ut(t,1500,1960,60);function _g(t){const n=16*R(zt-45,zt,t)**2;let e=V(9.5+n,r0-wc(t),R(zt,zt+16,t));return e=V(e,17,R(xc,540,t)),e=V(e,r0-wc(t),Ho(t)),e=V(e,9.5,R(Vo-40,Vo+40,t)),V(e,12,R(qo-20,qo+40,t)*(1-R(3e3,3090,t)))}function ku(t){const n=V(12,30,Math.max(Ho(t),Ya(t)));return V(n,60,Ut(t,Vo+20,qo-20,40))}const Rg={shelf:_g,bench:ku,hill:l0,peak:t=>t<1200?130:140,rise:t=>V(220,100,l0(t)),fall:t=>V(110,140,Ut(t,Vo+20,qo-20,40)),wall:t=>R(zt-15,zt+65,t)*(1-R(460,490,t)),wallRef:()=>665,wallTop:t=>V(9.5,40,R(zt,Tn,t)),wallLip:t=>20+83*R(zt,zt+50,t)-55*R(zt+140,Tn,t),crown:t=>1-R(zt-15,zt+15,t)+R(2990,3070,t)},Ig={hillside:Rg,edge:zt,pullOut:Tn,archPhases:[],caves:[],tower:{phase:1800,latMin:90,latMax:250,mirror:!0},openness:()=>1,dive:wc,sill:()=>0,village:t=>1-Math.max(Ho(t),Ya(t)),halfWidth:t=>ku(t)+34+120*Math.max(Ho(t),Ya(t)),extraDepth:()=>120,reveal:t=>zn(1-R(60,110,t)+Ut(t,440,560,30)+Ut(t,1100,1360,40)+R(2950,3050,t)),drop:t=>Ut(t,zt-5,Tn-30,25)+.7*Ut(t,pe,qa-30,20)+.6*Ut(t,Wa,1500,20),plungeLevel:t=>Ut(t,zt+5,Tn-20,30)+.7*Ut(t,pe+5,qa-20,20),dropFx:t=>Ut(t,zt,Tn-60,20)+.8*Ut(t,pe,qa-20,15)+.5*Ut(t,Wa,1500,20),clean(t){return Math.max(1-R(500,550,t),R(860,890,t)*(1-R(1580,1610,t)),R(2470,2500,t))},road:()=>0,roadDepth:()=>0,cloud:t=>1-.6*Math.max(Ho(t),Ya(t)),cloudDepth:300,speedBlur:.45,sunGlare:.35,pilotRollMax:.7,splitS:!1,chaseTilt:{up:.6,lookDown:1.2},climbCam:.8,zoneNames:{rim:"Đỉnh La Pán Tẩn",dive:"Thả mình xuống thung",valley:"Ruộng bậc thang La Pán Tẩn",river:"Thung lũng Nậm Kim",climb:"Đồi Mâm Xôi",village:"Bản Dế Xu Phình",gate:"Cột gió về đỉnh"},zone(t){return t<zt?"rim":t<Tn?"dive":t<pe?"valley":t<Wa?"river":t<Vo?"climb":t<qo?"village":"gate"}},Su={"mu-cang-chai":Ig,"khau-pha":bg,"ha-giang":Lg,fansipan:zg},G=Su[Bt],Tu=t=>Su[t],gn=2*ct,an=_t;function Se(t,n){if(t.k===0)return{x:t.x+n*Math.sin(t.th),z:t.z+n*Math.cos(t.th),th:t.th};const e=t.th+t.k*n;return{x:t.x+(Math.cos(t.th)-Math.cos(e))/t.k,z:t.z+(Math.sin(e)-Math.sin(t.th))/t.k,th:e}}function h0(t,n){const e=[];let o=0,a=0,s=n,c=0;const i=(r,h)=>{if(r<.5)return;const u={k:h,x:o,z:a,th:s},l=Se(u,r),f=Se(u,r/2),m=Math.max(Math.hypot(f.x-o,f.z-a),Math.hypot(f.x-l.x,f.z-l.z));e.push({u0:c,len:r,k:h,x:o,z:a,th:s,bx:f.x,bz:f.z,br:m}),o=l.x,a=l.z,s=l.th,c+=r};for(const r of[1,-1]){const h=r===1?0:ct;for(const[u,l,f]of t){if(h+u-c<-.5)throw new Error(`bảng cua: cung ở pha ${u} chồng cung trước (hết ở pha ${(c-h).toFixed(1)})`);i(h+u-c,0),i(Math.abs(l)*Math.PI/180*f,r*Math.sign(l)/f)}i(h+ct-c,0)}return{segs:e,x:o,z:a}}function Pg(t){const n=h0(t,0),{segs:e,x:o,z:a}=h0(t,-Math.atan2(n.x,n.z));let s=e.length-1;for(;s>0&&e[s].u0>an;)s--;const c=Se(e[s],an-e[s].u0),i=e.reduce((u,l)=>u+l.bx,0)/e.length,r=e.reduce((u,l)=>u+l.bz,0)/e.length,h=Math.max(...e.map(u=>Math.hypot(u.bx-i,u.bz-r)+u.br));return{segs:e,endX:o,endZ:a,ox:c.x,oz:c.z,bx:i,bz:r,br:h}}const on=Pg(gt.arcs);function rs(t,n,e=on){const o=t+an,a=Math.floor(o/gn),s=o-a*gn;let c=e.segs.length-1;for(;c>0&&e.segs[c].u0>s;)c--;const i=Se(e.segs[c],s-e.segs[c].u0);return n.x=i.x+a*e.endX-e.ox,n.z=i.z+a*e.endZ-e.oz,n.yaw=i.th,n}const Bg={x:0,z:0,yaw:0},Hg={x:0,z:0,yaw:0};function aa(t,n=30){return(rs(t+n,Hg).yaw-rs(t-n,Bg).yaw)/(2*n)}function Fg(t,n,e,o,a,s){let c;if(t.k===0)c=n*Math.sin(t.th)+e*Math.cos(t.th);else{const l=Math.sign(t.k);let m=Math.atan2(l*(e+Math.sin(t.th)/t.k),-l*(n-Math.cos(t.th)/t.k))-t.th;m-=2*Math.PI*Math.round((m-t.k*t.len/2)/(2*Math.PI)),c=m/t.k}const i=c>=o-.01&&c<=a+.01;c=Math.min(a,Math.max(o,c));const r=Se(t,c),h=n-(r.x-t.x),u=e-(r.z-t.z);return s.s=c,s.dist=Math.hypot(h,u),s.lat=h*Math.cos(r.th)-u*Math.sin(r.th),i}function Z(t){return((t+_t)%ct+ct)%ct}function wn(t){return Math.floor((t+_t)/ct)}const Fo=9.5;function Xt(t){return G.village(Z(t),wn(t))}function ne(t){return Xt(t)>.97}function Qt(t){return G.openness(Z(t))}function Pt(t){return 260+30*Math.sin(t/1700)}function Y(t){return Pt(t)-G.dive(Z(t))}function Ps(t){return G.sill(Z(t))}function vn(t){return(Y(t+2)-Y(t-2))/4}function Au(t,n){return Math.max(-1.1,Math.min(1.1,Math.atan(n*n*aa(t)/9.8)))}const Oe={x:0,z:0,yaw:0};function At(t){return rs(t,Oe).yaw}function D(t,n,e,o){return rs(t,Oe),o.x=Oe.x+n*Math.cos(Oe.yaw),o.y=Y(t)+e,o.z=Oe.z-n*Math.sin(Oe.yaw),o}function bn(t){return G.halfWidth(Z(t))}function sa(t){return G.extraDepth(Z(t))}function Mc(t){return Pt(t)-V(150,240,Qt(t))-sa(t)}function $g(t){return G.reveal(Z(t))}function Gg(t){return G.drop(Z(t))}function Nu(t){return G.clean(Z(t))}function Og(t,n){const e=(Y(t+4)-Y(t-4))/8,o=(Y(t+4)-2*Y(t)+Y(t-4))/16;return 1+n*n*o/(Math.pow(1+e*e,1.5)*9.8)}const zu=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ..o .o. o.. .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Dg={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},Ug=8,Cu=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function Je(t){return t.split(" ")}function Cn(t){let n=t.seed=t.seed+1831565813|0;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}function Kg(t,n,e,o=1){const a=Zf;let s=0;for(;s<a.length-1&&t>a[s+1][0];)s++;const c=a[s],i=a[Math.min(s+1,a.length-1)],r=i[0]>c[0]?Math.max(0,Math.min(1,(t-c[0])/(i[0]-c[0]))):1,h=(e?.5:1)*(n?.6+.3*Math.min(1,t):1)*o;return{p3:(c[1]+(i[1]-c[1])*r)*h,p2:(c[2]+(i[2]-c[2])*r)*h}}const Vg=new Set(["o","u","d"]),qg=/[BLHO]/;function Wg(t,n,e,o,a,s,c){if(!n.length)return;for(let k=o-3;k<=o+3;k++)if(k!==o&&qg.test(e[k]??""))return;const{p3:i,p2:r}=Kg(io(Math.max(0,a),t.diff),s,c,t.diff.tighten),h=Cn(t),u=h<r?2:h<r+i?3:0;if(!u||o0(n)<=u)return;const l=n.some(k=>k.kind==="bridge"||k.kind==="ridge");if(l&&c)return;const f=k=>n.some(b=>(b.kind==="pillar"||b.kind==="spike"||b.kind==="overhang")&&b.lane===k),m=[-1,0,1].filter(k=>!f(k)&&(l||e[o][k+1]===".")&&![o-2,o-1,o+1].some(b=>Vg.has(e[b]?.[k+1]??""))),d=l?["pillar"]:c?["spike"]:["pillar","spike"],g=[[]];for(const k of m){const b=[];for(const w of g){b.push(w);for(const y of d)b.push([...w,{kind:y,lane:k}])}g.splice(0,g.length,...b)}const v=k=>[-1,0,1].every(b=>[...n,...k].some(w=>(w.kind==="pillar"||w.kind==="overhang")&&w.lane===b)),p=g.filter(k=>k.length&&o0([...n,...k])===u&&!v(k));p.length&&n.push(...p[Math.floor(Cn(t)*p.length)])}const u0=700,Yg=15e8,li=(t,n,e)=>!t.alt&&t.hp<P.maxHp&&n-t.shieldFromZ>=e;function to(t,n){const e=Math.max(0,n);return ur(e,t.diff)*P.cellSeconds*Xf(io(e,t.diff))}function Wo(t,n,e){const o=io(Math.max(0,e),t.diff),a=Yf(o),s=n.filter(l=>l.tier<=a&&!t.lastBag.includes(l.id)),c=s.length?s:n.filter(l=>l.tier<=a),i=jf(o),r=c.map(l=>(l.tier===a?1.4:1)/(1+i*l.tier));let h=Cn(t)*r.reduce((l,f)=>l+f,0),u=c[0];for(let l=0;l<c.length;l++)if(h-=r[l],h<=0){u=c[l];break}return t.lastBag.push(u.id),t.lastBag.length>4&&t.lastBag.shift(),u}const m0={o:0,u:P.flareHeight,d:-5.5},jg={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function be(t,n,e,o){const a=Je(n.cells),s=to(t,e);let c=!1;const i=Math.floor((e+a.length*s)/u0),r=i>Math.floor(e/u0)&&e>300&&Qf(io(e,t.diff),i);return a.forEach((h,u)=>{const l=e+(u+.5)*s,f=t.rowId++,m=ne(l),d=[];if(h==="HHH"||h==="LLL")d.push({kind:h==="HHH"?"bridge":"ridge",lane:0});else for(let b=-1;b<=1;b++){const w=jg[h[b+1]];w&&d.push({kind:m&&w==="pillar"?"spike":w,lane:b})}Wg(t,d,a,u,l,o,m);const g=b=>{t.obstacles.push({id:t.nextId++,kind:b.kind,lane:b.lane,z:l,open:o,row:f,passed:!1})};if(h==="HHH"||h==="LLL"){d.forEach(g);return}const v=d.length>0;for(let b=-1;b<=1;b++){const w=h[b+1],y=d.filter(x=>x.lane===b);if(y.forEach(g),!y.length&&w in m0){const x=a[u-1]==="HHH"||a[u-2]==="HHH",M=t.alt&&w==="o"&&x?P.flareHeight:m0[w];t.pickups.push({id:t.nextId++,kind:"lantern",lane:b,v:M,z:l,taken:!1})}}const p=[-1,0,1].filter(b=>h[b+1]==="."&&Bo(d,b,gu)),k=v?p:[];if(r&&!c&&k.length){const b=k[Math.floor(Cn(t)*k.length)],w=Cn(t),y=t.alt?w<.45?"thermal":w<.75||t.hp>=P.maxHp?"smoke":"shield":li(t,l,t.diff.shieldMaxGap??P.shieldMaxGap)||w>=.6&&li(t,l,P.shieldMinGap)?"shield":"thermal";y==="shield"&&(t.shieldFromZ=l),t.pickups.push({id:t.nextId++,kind:y,lane:b,v:0,z:l,taken:!1}),c=!0}else p.length&&li(t,l,t.diff.shieldMaxGap??P.shieldMaxGap)&&(t.shieldFromZ=l,t.pickups.push({id:Yg+f,kind:"shield",lane:p[(Math.imul(f,2654435761)>>>0)%p.length],v:0,z:l,taken:!1}))}),t.chunksSpawned++,e+a.length*s}const Eu=[{id:"cabin-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"kim-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"mom-bang",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"kim-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cabin-kim",tier:1,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"mom-doi",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-tuyet",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cabin-lien",tier:2,cells:"... ... ... .d. .d. HHH ... ... ... .d. .d. HHH ... ..."},{id:"ong-kim",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"kim-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui",tier:2,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ..."},{id:"luon-kim",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"kim-cabin-kim",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"mom-kim",tier:3,cells:"... ... L.B ... ... ... B.L ... ... ... .BL ... ..."},{id:"kim-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"kim-cabin-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Xg=["cabin-mot","kim-le","mom-bang"].map(t=>Eu.find(n=>n.id===t)),Zg=[{id:"tang-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"tang-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-suoi",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},{id:"mom-suoi",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"cua-tang",tier:1,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"mom-tang",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"tang-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"tang-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-vom",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"tang-mom-xen",tier:2,cells:"... ... B.L ... ... ... L.B ... ... ... .L. ... ..."},{id:"cau-suoi",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... B.B ... ..."},{id:"luon-tang",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vom-cau",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"tang-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-tang-gat",tier:4,cells:"... ... B.L ... ... ... LB. ... ... ... .LB ... ... ... B.L ... ..."}],Qg=[{id:"dinh-le",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"vom-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-dinh",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"song-may",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ... .B. ... ..."},{id:"cua-dinh",tier:1,cells:"... ... B.B .o. ... ... .BB ... ..."},{id:"dinh-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."},{id:"vom-dinh",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ... ... B.B ... ..."},{id:"ong-dinh",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-dinh",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"dinh-vom-dinh",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"dinh-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"to-hop-tang",tier:4,cells:"... ... B.L ... ... ... L.B ... ... ... .d. HHH ... ... ... .BL ... ..."}];function mr(t){t.mult=Math.min(P.multMax,1+t.multNear+t.multLantern)}function ia(t,n,e){t.bonus+=e,t.parts[n]+=e}function Jg(t,n){const e=P.lanternMultStep*t.streak;e>=t.multLantern?t.multLantern=e:t.multLantern+=(e-t.multLantern)*(1-Math.exp(-.016666666666666666/P.lanternMultTau)),mr(t)}function Lu(t){t.streak=0}function t1(){const t=[];return(G.cloudDecks??[]).forEach((n,e)=>{let o=-G.dive(0)-n.level(0);for(let a=1;a<=ct;a++){const s=-G.dive(a)-n.level(a);if(o!==0&&Math.sign(s)!==Math.sign(o)){const c=a-1+o/(o-s),i=!!n.eye&&Math.abs(c-n.eye.phase)<n.eye.radius;n.cover(c)>.5&&!i&&t.push({phase:c,deck:e,up:s>0})}o=s}}),t.sort((n,e)=>n.phase-e.phase)}const n1=t1();function _u(t,n){let e=Math.imul(Math.round(t)^Math.imul(n,668265261),2654435761);return e^=e>>>15,(Math.imul(e,2246822507)>>>0)/4294967296}const d0=22;function e1(t,n,e,o){const a=[];for(const s of n1){if(s.phase<=e||s.phase>=o)continue;const c=n+s.phase;if(t.gates.some(l=>Math.abs(l.z-c)<1))continue;const i=t.gusts.filter(l=>l.z<=c).at(-1),r=t.gusts.find(l=>l.z>c);let h=[-1,0,1].filter(l=>(!i||Math.abs(l-i.lane)<=1)&&(!r||Math.abs(l-r.lane)<=1));i&&c-i.z>=d0&&h.some(l=>l!==i.lane)?h=h.filter(l=>l!==i.lane):i&&c-i.z<d0&&(h=[i.lane]);const u={z:c,lane:h[Math.floor(_u(c,1)*h.length)],deck:s.deck,up:s.up,hit:!1,missed:!1};t.gates.push(u),a.push(u)}return a}function o1(t){for(const n of t.gates)if(!(n.hit||n.missed)){if(t.z<n.z)break;Math.abs(t.x-Tt(n.lane))<=P.gateRadiusX?(n.hit=!0,t.gatesHit++,t.tailwind=Math.min(P.tailwindMax,t.tailwind+P.gateTailwind),ia(t,"gust",P.gateScore*t.mult)):(n.missed=!0,t.gustChain=0,t.tailwind=0,t.surge=P.surgeMin),t.events.push({type:"cloud-gate",hit:n.hit,up:n.up})}}function a1(t,n){t.gates.length&&t.gates[0].z<n&&(t.gates=t.gates.filter(e=>e.z>=n))}const s1=[0,P.flareHeight,-5.5];function Bs(t,n,e){const o=n+e[0];if(t.gusts.some(c=>c.z===o))return;let a=Math.floor(Cn(t)*3)-1,s=0;e.forEach((c,i)=>{const r=Cn(t),h=Cn(t);i>0&&(a=Math.max(-1,Math.min(1,a+(r<.35?-1:r<.7?1:0))));let u=i===0?0:s1[h<.6?0:h<.8?1:2];t.alt&&u===0&&s<-2&&(u=P.flareHeight),s=u,t.gusts.push({id:t.nextId++,index:i,count:e.length,lane:a,v:u,z:n+c,len:P.gustLen,taken:!1,missed:!1})})}function i1(t){return t.thermalV+t.windLift}function c1(t,n,e,o){if(!o){t.tailwind=0,t.windLift=0,t.liftT=0;return}t.tailwind*=Math.exp(-n/(e?P.surgeTauNearRow:P.tailwindTau)),e&&(t.liftT=0),t.liftT=Math.max(0,t.liftT-n);const a=t.liftT>0?2.2:e?2.5:1.2;t.windLift+=((t.liftT>0?P.gustLift:0)-t.windLift)*(1-Math.exp(-n*a))}function r1(t){for(const n of t.gusts){if(n.taken||n.missed)continue;if(t.z<n.z)break;if(t.z>n.z+n.len){n.missed=!0,t.gustChain=0,t.events.push({type:"gust-miss"});continue}if(Math.abs(t.x-Tt(n.lane))>P.gustRadiusX||Math.abs(t.moveV-n.v)>P.gustRadiusV)continue;n.taken=!0,n.index===0&&(t.gustChain=0),t.gustChain++,t.gustsTaken++,t.tailwind=Math.min(P.tailwindMax,t.tailwind+P.tailwindPerGust),t.liftT=P.gustLiftTime;const e=n.index===n.count-1&&t.gustChain===n.count;ia(t,"gust",(P.gustScore+(e?P.gustChainScore:0))*t.mult),t.events.push({type:"gust",chain:t.gustChain,full:e})}o1(t)}function l1(t,n){t.gusts.length&&t.gusts[0].z+t.gusts[0].len<n&&(t.gusts=t.gusts.filter(e=>e.z+e.len>=n))}const h1=28;function f0(t,n){return t!==0?0:_u(n,2)<.5?-1:1}function u1(t,n,e){const o=t.gusts.find(u=>u.index===0&&u.z===n);if(!o)return;const a=e&&t.gusts.filter(u=>u.z<=e.z).at(-1),s=e?e.z:n-h1,c=e?a&&a.lane!==e.lane?a.lane:f0(e.lane,s):f0(o.lane,s),i=-Math.round(s);if(t.pickups.some(u=>u.id===i))return;const r=t.pickups.findIndex(u=>u.z>s),h={id:i,kind:"lantern",wish:!0,lane:c,v:e?P.wishGateV:0,z:s,taken:!1};r<0?t.pickups.push(h):t.pickups.splice(r,0,h)}const g0=[{kind:"gusts",at:310,phases:[360,420,480,540,600],wish:!0},{kind:"rows",from:800,to:1440,pool:Eu,open:!1,intro:Xg},{kind:"gusts",at:1450,phases:[1530,1600,1670],wish:!0},{kind:"rows",from:1860,to:2280,pool:Zg,open:!0},{kind:"gusts",at:2300,phases:[2380,2470,2560,2650,2740],wish:!0},{kind:"rows",from:3200,to:3960,pool:Qg,open:!0}];function m1(t,n){const e=Z(n),o=n-e;for(const[a,s]of g0.entries()){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return o+s.from+.5;const h=(s.intro&&wn(n)===0?s.intro[t.chunksSpawned]:void 0)??Wo(t,s.pool,n);return e+Je(h.cells).length*to(t,n)>s.to?o+s.to+.5:be(t,h,n,s.open)}if(e>=s.at)continue;Bs(t,o,s.phases);const c=g0.slice(a+1).find(r=>r.kind==="rows")?.from??ct,i=e1(t,o,s.at,c);return s.wish&&u1(t,o+s.phases[0],i.at(-1)),o+s.at+.5}return o+ct+.5}const Ru=(...t)=>zu.filter(n=>t.includes(n.id)),Iu=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],d1=[...Ru("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...Iu.filter(t=>t.id!=="luon-mai")],f1=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...Ru("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...Iu],g1=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],p1=Cu,v1=5;function y1(t){const n=["o..",".o.","..o"][t+1],e=[".BB","B.B","BB."][t+1];return{id:`cong-troi-${t}`,tier:0,cells:`... ... ${n} ${n} ${n} ${e} ${n} ... ...`}}const b1=[{kind:"rows",from:40,to:560,pool:d1,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:f1,open:!1},{kind:"rows",from:1990,to:2110,pool:g1,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:p1,open:!0},{kind:"gate",at:3560}];function w1(t,n){const e=Z(n),o=n-e;for(const a of b1){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const i=Wo(t,a.pool,n);return e+Je(i.cells).length*to(t,n)>a.to?o+a.to+.5:be(t,i,n,a.open)}if(e>=a.at)continue;if(a.kind==="gusts")return Bs(t,o,a.phases),o+a.at+.5;const s=Math.floor(Cn(t)*3)-1,c=Math.max(n,o+a.at-(v1+.5)*to(t,n));return Math.max(be(t,y1(s),c,!1),o+a.at+.5)}return o+ct+.5}const x1=[1140,1225,1310,1395,1480];function M1(t,n){const e=Z(n),o=to(t,n),a=Kt-30-(Ug+.5)*o;if(e<40)return n+(40-e)+.5;if(e<a){const i=Wo(t,zu,n);return e+Je(i.cells).length*o>a?n+(a-e)+.5:be(t,i,n,!1)}if(e<Kt){let i=be(t,Dg,n,!1);Bs(t,n-e,x1);const r=Z(i);return r>Kt&&r<fa&&(i+=fa-r+.5),i}if(e<fa)return n+(fa-e)+.5;const s=Wo(t,Cu,n);return e+Je(s.cells).length*o>ct-60?n+(ct-e)+40:be(t,s,n,!0)}const k1=[{id:"choi-le",tier:0,cells:"... ... B.. .o. .o. .o. .o. .o. ..B ... ..."},{id:"den-ruong",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"choi-giua",tier:0,cells:"... ... .B. o.o o.o ... ... ... .B. ... ..."},{id:"cong-ruong",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"bo-ruong",tier:1,cells:"... ... ... ... .u. .u. LLL .o. .o. ... ..."},{id:"cua-choi",tier:1,cells:"... ... B.B .o. .o. .o. ... ... .B. ... ..."},{id:"zic-zac-nhe",tier:1,cells:"... ... B.o ... ... ... ... ... o.B ... ... ... ... ... B.o ... ..."},{id:"hang-choi",tier:2,cells:"... ... .BB ... ... ... ... BB. ... ..."},{id:"bo-cong",tier:2,cells:"... ... ... .u. .u. .u. LLL ... ... ... ... B.B ... ..."},{id:"doi-doc-nhe",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... ... .d. .d. HHH ... ..."}],S1=[{id:"cau-tre",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"da-suoi",tier:0,cells:"... ... B.. .o. .o. .o. .o. .o. ..B ... ..."},{id:"den-suoi",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"ghenh",tier:1,cells:"... ... ... ... .u. .u. LLL .o. .o. ... ..."},{id:"cot-cau",tier:1,cells:"... ... B.B .o. .o. .o. ... ... .B. ... ..."},{id:"mom-suoi",tier:1,cells:"... ... L.L .u. .u. ... ... ... .L. ... ..."},{id:"cau-da",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... ... .B. ... ..."},{id:"ong-tre",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"luon-da",tier:3,cells:"... ... B.. ... ... ... ... .B. ... ... ... ... ..B ... ..."}],T1=[{id:"nha-le",tier:0,cells:"... ... B.. ... ... ... ... ... ..B ... ..."},{id:"cong-ban",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"den-ban",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"ngo-ban",tier:1,cells:"... ... .B. o.o o.o ... ... ... B.B .o. ... ..."},{id:"xom",tier:2,cells:"... ... B.B ... ... ... ... .BB ... ... ... ... B.. ... ..."}],A1=[{kind:"boost",at:300},{kind:"rows",from:560,to:850,pool:k1,open:!0},{kind:"boost",at:875},{kind:"gusts",at:1080,phases:[1120,1180,1240,1300,1360]},{kind:"rows",from:1620,to:1980,pool:S1,open:!0},{kind:"boost",at:2050},{kind:"rows",from:2100,to:2460,pool:T1,open:!0},{kind:"gusts",at:2520,phases:[2600,2680,2760,2840,2920]}];function N1(t,n){const e=Z(n),o=n-e;for(const a of A1){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const s=Wo(t,a.pool,n);return e+Je(s.cells).length*to(t,n)>a.to?o+a.to+.5:be(t,s,n,a.open)}if(!(e>=a.at))return a.kind==="boost"?o+a.at>600&&t.pickups.push({id:t.nextId++,kind:"boost",lane:Math.floor(Cn(t)*3)-1,v:0,z:o+a.at,taken:!1}):Bs(t,o,a.phases),o+a.at+.5}return o+ct+.5}const z1={"mu-cang-chai":N1,"khau-pha":M1,"ha-giang":w1,fansipan:m1},C1=z1[Bt];function E1(t){for(;t.nextChunkZ<t.z+P.spawnAheadMeters;)t.nextChunkZ=C1(t,t.nextChunkZ);const n=t.z-P.despawnBehind;t.obstacles.length&&t.obstacles[0].z<n&&(t.obstacles=t.obstacles.filter(e=>e.z>=n)),t.pickups.length&&t.pickups[0].z<n&&(t.pickups=t.pickups.filter(e=>e.z>=n)),l1(t,n),a1(t,n)}const Pu=1e9;function L1(t){const n=P.thermalTime-.6;for(let e=.5;e<n;e+=.22){const o=t.z+t.speed*1.08*e,a=t.obstacles.filter(i=>Math.abs(i.z-o)<12),s=[-1,0,1].filter(i=>!a.some(r=>Ko(r,Tt(i),P.thermalHeight,0)));if(!s.length)continue;const c=s.includes(t.lane)?t.lane:s[0];t.pickups.push({id:Pu+t.trailIds++,kind:"lantern",lane:c,v:P.thermalHeight,z:o,taken:!1})}t.pickups.sort((e,o)=>e.z-o.z)}function _1(t,n){return t.thermalV>8&&n.id<Pu?!1:!t.pickups.some(e=>e!==n&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-n.z)<.5)}function R1(t){for(const n of t.pickups){if(n.taken)continue;const e=n.z-t.z;if(e>3)break;if(e<-3){n.kind==="lantern"&&!n.wish&&e>-3-t.speed/60&&_1(t,n)&&Lu(t);continue}if(Math.abs(t.x-Tt(n.lane))<P.lanternPickRadius&&Math.abs(t.v-n.v)<(n.wish?P.wishPickV:P.lanternPickRadius))if(n.taken=!0,n.kind==="lantern"){t.lanterns++,t.streak++,t.bestStreak=Math.max(t.bestStreak,t.streak);const a=P.lanternScore*(n.wish?P.wishLanternMul:1)*t.mult*(t.smokeT>0?P.smokeLanternMul:1);ia(t,"lantern",a),t.events.push(n.wish?{type:"wish",streak:t.streak,id:n.id,points:a}:{type:"lantern",streak:t.streak,id:n.id})}else n.kind==="thermal"?(t.thermalT=P.thermalTime,t.low=!1,L1(t)):n.kind==="smoke"?(t.smokeT=P.smokeTime,t.smokes++):n.kind==="boost"?(t.boostT=P.boostTime,t.boosts++):t.hp=Math.min(P.maxHp,t.hp+1),t.events.push({type:"booster",kind:n.kind})}}function dr(t){return Math.min(1,t.boostT/P.boostFade)}function I1(t){return t.boostT<=0?1:1+(P.boostMulMin+(P.boostMulMax-P.boostMulMin)*Math.min(1,io(t.z,t.diff))-1)*dr(t)}function P1(t,n){t.smokeT=Math.max(0,t.smokeT-n),!(t.boostT<=0)&&(t.stunT>0&&(t.boostT=Math.min(t.boostT,P.boostFade)),ia(t,"boost",t.speed*n*t.mult*(P.boostScoreMul-1)*dr(t)),t.boostT=Math.max(0,t.boostT-n))}function Bu(t,n){const e=Math.sign(n-t.lane);t.lane=n,t.laneT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert=t.vert,t.events.push({type:"lane",dir:e})}function B1(t,n){t.steerX=Math.max(-7,Math.min(P.steerMax,n));const e=Hu(t.lane,t.steerX);e!==t.lane&&Bu(t,e)}function Hu(t,n){return Math.abs(n-Tt(t))<=P.laneGap*.57?t:Math.max(-1,Math.min(1,Math.round(-n/P.laneGap)))}function Fu(t,n,e,o,a,s){const c=t-e,i=n+o*c,r=Math.exp(-o*a);return s.x=e+(c+i*a)*r,s.vel=(n-o*i*a)*r,s}function $u(){return P.vertIn+P.vertHold+P.vertOut}const hi={x:0,vel:0};function H1(t,n){t.vert!=="cruise"&&(!t.alt&&t.holdDive&&t.vertT>P.vertIn&&t.vertT<P.vertIn+P.vertHold&&(t.vertT=P.vertIn+.01),t.vertT+=n,t.vertT>=(t.alt&&t.vert==="dive"?P.lowTransition:$u())&&(t.vert="cruise",t.vertT=0));const e=t.vert!=="cruise"&&t.vertT<P.vertIn+P.vertHold,o=t.low?-5.5:0,a=e?t.vert==="flare"?P.flareHeight:-5.5:o;Fu(t.moveV,t.moveVel,a,e||t.low?P.vertOmegaIn:P.vertOmegaOut,n,hi),t.moveV=hi.x,t.moveVel=hi.vel}const ui={x:0,vel:0};function mi(t,n=!1,e=gt.profile){return{mode:"ready",seed:t,alt:n,diff:e,low:!1,smokeT:0,smokes:0,boostT:0,boosts:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],gates:[],gatesHit:0,hp:P.maxHp,stunT:0,hurtRow:-1,shieldFromZ:0,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0,boost:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:wn(0)*2+1,lastBag:[],events:[]}}function F1(t){t.mode="run",t.nextChunkZ=Math.max(t.nextChunkZ,t.z+220)}function p0(t,n){if(n==="left"||n==="right"){const o=n==="left"?-1:1;if(t.laneT<P.laneTime*.6)return!1;const a=Math.max(-1,Math.min(1,t.lane+o));return t.steerX=Tt(a),a!==t.lane&&Bu(t,a),!0}const e=n==="up"?"flare":"dive";return t.alt&&e==="dive"&&t.low?!0:t.vert===e&&t.vertT<$u()-P.vertOut?!1:(t.alt&&(t.low=e==="dive"),t.vert=e,t.vertT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert="cruise",t.events.push({type:"vert",kind:e}),!0)}function $1(t,n){if(n.row!==t.hurtRow){if(t.hp>=P.maxHp&&(t.shieldFromZ=Math.max(t.shieldFromZ,t.z)),t.hp-=Jf(n,t.steerX,t.low?"dive":t.vert)||t.time-t.dodgeTime<=P.reactWindow?1:t.hp,t.hp>0){t.hurtRow=n.row,t.stunT=P.stunTime,t.hitstopT=P.hitstop,t.surge=P.surgeMin,t.combo=0,t.multNear=0,Lu(t),mr(t),t.events.push({type:"hurt",hp:t.hp,kind:n.kind});return}t.hp=0,t.mode="crash",t.crashT=0,t.hitstopT=P.hitstop*2,t.events.push({type:"crash",kind:n.kind})}}function G1(t,n,e,o,a=null){if(t.events.length=0,t.time+=o,t.mode==="over")return;if(t.mode==="crash"){t.crashT+=o,t.z+=t.speed*o*Math.max(0,1-t.crashT*1.5),t.crashT>=P.crashSeconds&&(t.mode="over");return}if(t.hitstopT>0){t.hitstopT-=o;return}const s=t.mode==="run";s&&a!==null&&B1(t,a);for(const m of s?n:[])p0(t,m)||(t.buffered=m,t.bufferT=P.bufferTime);t.buffered&&(t.bufferT-=o,(p0(t,t.buffered)||t.bufferT<=0)&&(t.buffered=null)),t.holdDive=e&&t.vert==="dive";const c=t.vert==="dive"?P.diveSpeedMul:t.vert==="flare"?P.flareSpeedMul:1,i=Math.sin(Math.atan(vn(t.z))),r=t.obstacles.some(m=>!m.passed&&m.z>t.z&&m.z<t.z+t.speed*2.5),h=t.surge>0&&r?P.surgeTauNearRow:P.surgeTau;t.surge+=(-9.8*i-t.surge/h)*o,t.surge=s?Math.max(P.surgeMin,Math.min(P.surgeMax,t.surge)):0,c1(t,o,r,s);const u=s?ur(t.z,t.diff)*c*I1(t)+t.surge+t.tailwind:24;t.speed+=(u-t.speed)*(1-Math.exp(-o*3)),t.z+=t.speed*o,s&&E1(t);const l=wn(t.z)*2+(Qt(t.z)>.5?1:0);l!==t.sectionIndex&&(t.sectionIndex=l,t.events.push({type:"section",open:l%2===1,index:l})),t.laneT=Math.min(1,t.laneT+o/P.laneTime),Fu(t.x,t.xVel,t.steerX,P.laneOmega,o,ui),t.x=ui.x,t.xVel=ui.vel,H1(t,o),t.thermalT>0&&t.thermalT<=o&&t.obstacles.some(m=>(m.kind==="bridge"||m.kind==="ridge"||m.kind==="overhang")&&m.z>t.z&&m.z<t.z+t.speed*2.2)&&(t.thermalT=o*2),t.thermalT=Math.max(0,t.thermalT-o);const f=t.thermalT>0?P.thermalHeight:0;if(t.thermalV+=(f-t.thermalV)*(1-Math.exp(-o*(t.thermalT>0?2.5:1.8))),t.v=t.thermalV+t.windLift+t.moveV,t.stunT=Math.max(0,t.stunT-o),s&&P1(t,o),s){for(const m of t.obstacles)if(!(m.passed||m.z-t.z>6)){if(Ko(m,t.x,t.v,m.z-t.z)){if(m.passed=!0,$1(t,m),t.mode==="crash")return;continue}tg(m,t.z)&&(m.passed=!0,t.time-t.dodgeTime<=P.nearMissWindow+.1&&Ko(m,t.dodgeX,t.alt?t.dodgeV:t.thermalV,0)&&(t.combo++,t.comboT=0,t.multNear=P.multStep*t.combo,mr(t),ia(t,"nearMiss",25*t.mult),t.events.push({type:"near-miss",combo:t.combo,kind:m.kind})))}R1(t),r1(t),t.comboT+=o,t.comboT>P.comboBreak&&t.combo>0&&(t.combo=0,t.multNear=0),Jg(t),t.score+=t.speed*o*t.mult}}function we(t){return Math.floor(t.score+t.bonus)}const O1=["keydown","pointerdown","pointerup","touchstart","touchend","click"],D1=1500,U1=1e3;function K1(t){let n=-1/0;t.addEventListener("statechange",()=>{t.state==="running"&&(n=performance.now())});const e=()=>{t.state!=="running"&&t.state!=="closed"&&t.resume()};for(const a of O1)window.addEventListener(a,e,{capture:!0,passive:!0});let o=-1/0;return window.addEventListener("pointermove",()=>{const a=performance.now();t.state!=="suspended"||a-o<D1||(o=a,t.resume())},{passive:!0}),{resume:e,justWoke:()=>t.state!=="running"||performance.now()-n<U1}}const V1="skyrun-audio";function q1(t,n){const e=`${Date.now()}-${Math.random()}`;let o=null;try{o=new BroadcastChannel(V1)}catch{}let a=!1;const s=()=>{t.state==="running"&&(a=!0,t.suspend())};t.addEventListener("statechange",()=>{t.state==="running"&&(a=!1,o?.postMessage(e))}),o?.addEventListener("message",i=>{i.data!==e&&s()}),addEventListener("pagehide",s);const c=()=>{a&&!document.hidden&&t.resume().catch(()=>{})};addEventListener("pageshow",i=>{i.persisted&&c()}),n&&document.addEventListener("visibilitychange",()=>{document.hidden?s():c()})}const W1=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss","festival-whoosh"],Gu=["khen-dep-lam","khen-bay-pro","khen-ai-can","pk-quay-len","pk-phe-qua","pk-nhanh-qua","pk-ky-luc-chop","pk-pha-ky-luc","tiec-suyt-ky-luc","tiec-lam-lai","tiec-xem","tiec-mot-tim","treu-moi-cat-canh","treu-khoi-dong","treu-hon-vach","treu-lai-nua","dx-bay-kieu-gi","dx-vach-dung-yen","dx-nhin-duong","dx-de-ma","dx-ky-luc-cuoi","khen-sat-rat","pk-hu-hon","khen-tay-lai-lua","pk-cay-mat","pk-gom-den"],Ou=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua","ngan-yeah","ngan-wiii","ngan-nhanh-ghe","ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ui-da","ngan-oi","ngan-ui","ngan-co-len","ngan-rang-len","ngan-ngon","ngan-them-ne","ngan-tiec-ghe","ngan-oi-khong","ngan-di-ne","ngan-len-nao","ngan-hay","ngan-ghe-chua"],fr=["treu-cabin","dx-thap-dung-yen","tiec-rot-may","tiec-nhay-lai"],Du=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may","pk-len-duong","pk-bay-thoi",...Gu,...fr,...Ou],Uu=["ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may"],Ku=["khe-da","thung-lung"],v0={"wind-loop":.6},di=new URLSearchParams(location.search).get("voice"),Y1=di&&/^[a-z_]+$/.test(di)?`audio-opts/voice/${di}`:"audio/voice",Vu=t=>Du.includes(t)?`${Y1}/${t}.mp3`:`audio/${t}.mp3`,j1=new Set(Object.values(G.zoneLines??{})),X1=[...G.zoneNames?Ku:[],...Uu.filter(t=>!j1.has(t)),...gt.region==="mu-cang-chai"?[]:["festival-whoosh"],...gt.region==="fansipan"?[]:fr],qu=new Map,Z1=fu.then(mu),Q1=[...Gu,...fr,...Ou];for(const t of[...W1,...Du]){if(X1.includes(t))continue;const n=Q1.includes(t)?Z1:fu;qu.set(t,n.then(()=>fetch(Vu(t))).then(e=>e.ok?e.arrayBuffer():null).catch(()=>null))}function J1(t){const n=new Map;for(const[e,o]of qu)o.then(async a=>{if(!a)return;const s=await t.decodeAudioData(a.slice(0)).catch(()=>null);s&&n.set(e,v0[e]?np(t,s,v0[e]):s)});return{get:e=>n.get(e),play(e,o,a={}){const s=n.get(e);if(!s)return null;const c=t.createBufferSource();c.buffer=s,c.loop=a.loop??!1,c.playbackRate.value=a.rate??1;const i=t.createGain();i.gain.value=a.vol??1;let r=c.connect(i);if(a.pan){const h=t.createStereoPanner();h.pan.value=a.pan,r=r.connect(h)}return r.connect(o),c.start(),c}}}function tp(t,n){const e=Math.floor(n*t.sampleRate),o=t.length-e;if(o<=e)return t.duration;for(let a=0;a<t.numberOfChannels;a++){const s=t.getChannelData(a);for(let c=0;c<e;c++){const i=c/e;s[c]=s[c]*Math.sqrt(i)+s[o+c]*Math.sqrt(1-i)}}return o/t.sampleRate}function np(t,n,e){const o=Math.floor(e*n.sampleRate),a=n.length-o;if(a<=o)return n;const s=t.createBuffer(n.numberOfChannels,a,n.sampleRate);for(let c=0;c<n.numberOfChannels;c++){const i=n.getChannelData(c),r=s.getChannelData(c);r.set(i.subarray(0,a));for(let h=0;h<o;h++){const u=h/o;r[h]=i[h]*Math.sqrt(u)+i[a+h]*Math.sqrt(1-u)}}return s}const ep=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9},{id:"kpop-anthem-1",label:"We Rise",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 122 bpm",file:"audio/music/kpop-anthem-1.mp3",lufs:-13.8},{id:"cophong-vocal-1",label:"Bay lên",style:"Cổ phong pop · hát tiếng Việt, đàn tranh, sáo trúc · 128 bpm",file:"audio/music/cophong-vocal-1.mp3",lufs:-13.5},{id:"cophong-edm-1",label:"Cổ phong",style:"Cổ phong EDM · đàn tranh, sáo trúc, đàn nhị, khèn · 130 bpm",file:"audio/music/cophong-edm-1.mp3",lufs:-15.1},{id:"dem-hoi-1",label:"Đêm hội đèn trời",style:"EDM lễ hội · khèn, sáo lá, đàn môi, cồng · 124 bpm",file:"audio/music/dem-hoi-1.mp3",lufs:-16.9},{id:"cophong-vinahouse-1",label:"Cổng Trời",style:"Vinahouse cổ phong · đàn tranh, sáo, chuông ngựa · 134 bpm",file:"audio/music/cophong-vinahouse-1.mp3",lufs:-15.5},{id:"kpop-anthem-2",label:"Above the Clouds",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 124 bpm",file:"audio/music/kpop-anthem-2.mp3",lufs:-15.3},{id:"kpop-hiphop-1",label:"Fly High",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 124 bpm",file:"audio/music/kpop-hiphop-1.mp3",lufs:-14.5},{id:"kpop-hiphop-2",label:"Light It Up",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 122 bpm",file:"audio/music/kpop-hiphop-2.mp3",lufs:-14.4},{id:"kpop-anthem-3",label:"Touch the Sky",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 126 bpm",file:"audio/music/kpop-anthem-3.mp3",lufs:-13.5},{id:"kpop-vocal-2",label:"Sea of Clouds",style:"K-pop dance-pop · có hát, khèn, sáo · 130 bpm",file:"audio/music/kpop-vocal-2.mp3",lufs:-12.9}],y0={"khau-pha":["music-flight","taybac-3","vinahouse-1","kpop-trap-1","dem-hoi-1"],"ha-giang":["ha-giang-1","cophong-vocal-1","cophong-edm-1","vinahouse-2","cophong-vinahouse-1"],"mu-cang-chai":["edm-vocal-1","taybac-2","kpop-dance-1","kpop-hiphop-1","kpop-hiphop-2"],fansipan:["kpop-vocal-1","kpop-anthem-1","kpop-dance-2","kpop-anthem-2","kpop-anthem-3","kpop-vocal-2"]},Wu=t=>ep.find(n=>n.id===t),Hs=t=>(y0[t]??y0["khau-pha"]).map(n=>Wu(n)),Yu="skyrun.settings",ju="skyrun.sound";function Xu(){try{const t=JSON.parse(localStorage.getItem(ju)??"{}");if(t.v===2)return{sfx:t.sfx!==!1,music:t.music!==!1};const n=t.muted===!0;return{sfx:!n,music:!n&&t.music!==!1}}catch{return{sfx:!0,music:!0}}}function op(t){try{localStorage.setItem(ju,JSON.stringify({v:2,...t}))}catch{}}const ap=["on","dim","off"];let kc="shuffle";function Yo(){try{const t=JSON.parse(localStorage.getItem(Yu)??"{}");return{music:kc,ghosts:ap.includes(t.ghosts)?t.ghosts:"on"}}catch{return{music:kc,ghosts:"on"}}}function Zu(t){t.music!==void 0&&(kc=t.music);try{const{ghosts:n}={...Yo(),...t};localStorage.setItem(Yu,JSON.stringify({ghosts:n}))}catch{}}const vo=3,sp=-13.1,ip=20,b0=32e3,cp=t=>{if(t.sampleRate<=b0)return t;try{return new OfflineAudioContext(2,1,b0)}catch{return t}},ja=Hs(Bt),rp=t=>ja.find(n=>n.id===t)??null,fi=t=>{if(t===null)return ja[0];const n=ja.filter(e=>e.id!==t);return n[Math.floor(Math.random()*n.length)]??ja[0]};function lp(t,n){const e=new Map,o=cp(t);let a=!1;hr.then(()=>a=!0);let s=!1,c=Yo().music;const i=()=>c==="shuffle"?null:rp(c);let r=fi(null),h=null;const u=g=>{let v=e.get(g.id);return v||e.set(g.id,v={bytes:Vf(g.file),buf:null,loop:0,decoding:!1}),v},l=(...g)=>{for(const v of e.keys())g.includes(v)||e.delete(v)},f=(g,v)=>{const p=u(g);return p.buf?!0:(v&&!p.decoding&&(p.decoding=!0,p.bytes.then(async k=>{const b=k&&await o.decodeAudioData(k).catch(()=>null);b&&e.get(g.id)===p&&(p.loop=tp(b,vo),p.buf=b)})),!1)},m=g=>Math.min(1.6,10**((sp-g.lufs)/20)),d=(g,v)=>{const p=t.currentTime,k=e.get(g.id),b=t.createBufferSource();b.buffer=k.buf,b.loop=!0,b.loopEnd=k.loop;const w=t.createGain();if(w.gain.setValueAtTime(0,p),w.gain.linearRampToValueAtTime(m(g),p+v),b.connect(w).connect(n),b.start(p,vo),h){const y=h.gain.gain;y.cancelScheduledValues(p),y.setValueAtTime(y.value,p),y.linearRampToValueAtTime(0,p+v),h.src.stop(p+v+.05)}h={t:g,src:b,gain:w,at:p-vo,loop:k.loop},r=i()?g:fi(g.id),l(g.id,r.id),u(r)};return{tick(g){if(!g)return;const v=i();if(!h||v&&v.id!==h.t.id){const k=v??r;(h||a||s)&&f(k,!0)&&d(k,1);return}if(v||r.id===h.t.id)return;const p=h.loop-(t.currentTime-h.at)%h.loop;f(r,p<ip)&&p<vo&&d(r,vo)},choice:()=>i()?.id??"shuffle",setChoice(g){c=g==="shuffle"||Wu(g)?g:"shuffle",Zu({music:c}),s=!0,!(i()||!h)&&(r=fi(h.t.id),l(h.t.id,r.id),u(r))},playing:()=>h?.t??null,loading:()=>{const g=i()??(h?null:r);return g&&g.id!==h?.t.id&&!e.get(g.id)?.buf?g:null},held:()=>[...e].map(([g,v])=>v.buf?`${g}:pcm`:g)}}const ca=ct*gt.dayCycles,ls=gt.dayCutPhase-_t+ca,Qu={"mu-cang-chai":"Mù Cang Chải","khau-pha":"Khau Phạ","ha-giang":"Hà Giang",fansipan:"Fansipan"};function Ju(t){return t<ls?1:2+Math.floor((t-ls)/ca)}function Sc(t){return t<=1?0:ls+(t-2)*ca}const hp={"khau-pha":0,"ha-giang":1,"mu-cang-chai":2,fansipan:3},co={value:0},gr={value:-1e9},hs={value:[-1e9,0,-1e9,0]},tm={value:-1e9};let us="khau-pha";function up(t){us=t,co.value=hp[t]}const Te=()=>us,ro=()=>co.value===1?1:0,ee=()=>co.value===2?1:0;function nm(t={}){return Object.defineProperties({...t},{REGION_MC:{enumerable:!0,get:()=>us==="mu-cang-chai"?1:!1},REGION_FP:{enumerable:!0,get:()=>us==="fansipan"?1:!1}})}const pr=`uniform float uRegionHg;
float regionIs(float id) { return float(abs(uRegionHg - id) < 0.5); }`;function em(t,n=!1){return{dusk:(n?.34:.62)*(1-R(0,.08,t))+.5*R(.52,.66,t)+.5*R(.68,.78,t)-.38*R(.95,1,t),morn:R(.03,.14,t)*(1-R(.3,.45,t))}}function mp(t){const n=Ju(t),e=Sc(n),o=Math.min(1,Math.max(0,(t-e)/(n===1?ls:ca)));return{day:n,region:Te(),u:o,...em(o,n===1)}}function dp(t){return t.u>=.95?"Rạng sáng":t.u>=.74?"Đêm đèn trời":t.u>=.56?"Hoàng hôn":t.u<.1?"Bình minh":t.u<.4?"Buổi sáng":"Chiều vàng"}function om(t){const n=t.u<.5?0:t.dusk>=.98?2:t.dusk>=.48?1:0;return(t.day-1)*3+n}function fp(t){let n=null;const e=a=>{n=a===null?null:{day:1,region:Te(),u:a,...em(a,!0)}},o=a=>{n=a===null?null:{day:1,region:Te(),u:.52+.26*a,dusk:a,morn:0}};return t.has("dusk")&&o(Number(t.get("dusk"))),t.has("clock")&&e(Number(t.get("clock"))),{at:a=>n??mp(a),forceU:e,forceDusk:o}}const w0=.7,x0=110,gp=1.6,pp=3;let Tc=null,M0=-1/0;function vp(){const t=Tc;return Tc=null,t}function yp(t){const n=new Float32Array(t).fill(Number.NaN),e={x:0,y:0,z:0};let o=Number.NaN,a=Number.NaN,s=0,c=0,i=!1,r=0,h=1;return{begin(u,l){c=l-a,i=c>0&&c<.5&&Math.abs(u-o)<60,o=u,a=l,s=l,D(u,0,pp,e);const f=At(u);r=Math.sin(f),h=Math.cos(f)},watch(u,l,f){const m=l.elements,d=m[12]-e.x,g=m[13]-e.y,v=m[14]-e.z,p=d*r+v*h,k=n[u];if(n[u]=p,!i||!(k>p)||p<=0)return;const b=(k-p)/c;if(p/b>w0||k/b<=w0)return;const w=d*h-v*r,y=Math.hypot(w,g);y>x0||Math.abs(s-M0)<gp||(M0=s,Tc={pan:-.85*Math.max(-1,Math.min(1,w/60)),near:1-y/x0,big:f})}}}const am=`
#define DECK_RELIEF 160.0
#define DECK_RIM 22.0
#define DECK_THROAT 45.0
#define DECK_ARM_RIDGE 9.0
// Phần MẮT XOÁY của độ nâng (vành, họng, tay xoắn) — tách riêng để shader đỉnh lấy độ dốc của nó cho ánh sáng (pháp tuyến nhiễu
// của shader mảnh không biết tới hình này). Không có fbm: rẻ, gọi 3 lần mỗi đỉnh.
float deckEyeLift(vec2 xz) {
  if (uEye.z <= 0.0) return 0.0;
  vec2 dE = xz - uEye.xy;
  float rE = length(dE);
  float eyeK = exp(-rE / uEye.z) * (1.0 - smoothstep(1.2 * uEye.z, 2.4 * uEye.z, rE));
  // BẪY: pow(số âm, 2.0) = NaN trong GLSL — bình phương bằng nhân.
  float rr = rE / uEye.z;
  float q = (rr - 0.7) / 0.32;
  // Gò tay xoắn ĐỨNG YÊN theo đúng tay sáng (deckEyeArms) — bản quay đều theo uTime: gò lướt qua mặt mây như sóng nước, lưới bám
  // camera lấy mẫu gò đang chạy thành mặt nhấp nhô răng cưa.
  float a = uEye.w * eyeK;
  float arms = deckEyeArms(mat2(cos(a), sin(a), -sin(a), cos(a)) * dE, rr);
  return DECK_RIM * exp(-q * q) - DECK_THROAT * exp(-rr * rr / 0.2) + eyeK * DECK_ARM_RIDGE * arms;
}
float deckLift(vec2 xz, float lvl) {
  vec2 dE = xz - uEye.xy;
  float rE = length(dE);
  float eyeK = uEye.z > 0.0 ? exp(-rE / uEye.z) * (1.0 - smoothstep(1.2 * uEye.z, 2.4 * uEye.z, rE)) : 0.0;
  float ang = uEye.w * eyeK;
  vec2 wxz = uEye.xy + mat2(cos(ang), sin(ang), -sin(ang), cos(ang)) * dE;
  vec2 p = wxz / 260.0 + DECK_DRIFT * uTime;
  float d = length(xz - cameraPosition.xz);
  float h = DECK_RELIEF * (gnFbm(p) - 0.5 + 0.35 * (gnFbm(p * 3.1 + 7.0) - 0.5) * (1.0 - smoothstep(400.0, 900.0, d)));
  h *= 1.0 - smoothstep(2500.0, 4200.0, d);
  float gap = abs(cameraPosition.y - lvl);
  float gapK = smoothstep(15.0, 110.0, gap);
  float awayK = max(smoothstep(5.0, 40.0, gap), smoothstep(150.0, 700.0, d));
  float above = smoothstep(-20.0, 20.0, cameraPosition.y - lvl);
  return max(h, 0.0) * mix(awayK, gapK, above) + min(h, 0.0) * mix(gapK, awayK, above) + deckEyeLift(xz);
}
`;function bp(t){const n=t?64:96,e=[0];for(let c=5;c<4500;c=c<50?c+5:c*(t?1.12:1.07))e.push(c);e.push(4500);const o=new Float32Array(e.length*n*3);e.forEach((c,i)=>{for(let r=0;r<n;r++){const h=r/n*Math.PI*2;o.set([c*Math.cos(h),0,c*Math.sin(h)],(i*n+r)*3)}});const a=[];for(let c=e.length-2;c>=0;c--)for(let i=0;i<n;i++){const r=c*n+i,h=c*n+(i+1)%n;a.push(r,r+n,h,h,r+n,h+n)}const s=new ht;return s.setAttribute("position",new $(o,3)),s.setIndex(a),s}const ve=8;function sm(t,n,e,o,a){const s=n-t;if(s<=1||a<=t+4)return Number.NaN;const c=Math.min(1,Math.pow((a-t)/s,1/1.5)),i=e*V(.2,.55,o);return i+c*(e-i)}function im(t,n){const e=Z(t),o=G.road(e);if(o<.02)return null;const a=Pt(t),s=Qt(t),c=a-G.roadDepth(e),i=sm(cm(t),a,bn(t),s,c);return Number.isNaN(i)?null:(n.lat=i,n.y=c,n.amount=o,n)}function cm(t){const n=Pt(t);return V(n-V(150,240,Qt(t))-sa(t),Y(t)-13,Ps(t))}const wp=2.6,xp=60,rm=[];for(const t of on.segs)t.k===0||Math.abs(t.k*t.len)<wp||rm.push({x:t.x+Math.cos(t.th)/t.k,z:t.z-Math.sin(t.th)/t.k,r:Math.abs(1/t.k)-xp,u:t.u0});function Mp(t,n,e){const o=on,a=Math.round((n+o.oz-o.bz)/o.endZ);for(let s=a-1;s<=a+1;s++)for(const c of rm){const i=s*o.endX-o.ox+c.x,r=s*o.endZ-o.oz+c.z,h=Math.hypot(t-i,n-r)/c.r;if(h>=1)continue;const u=s*gn-an+c.u,l=Pt(u)-V(150,240,Qt(u+300))-sa(u+300),f=Pt(u)+70+50*(Ft(t/70,n/70,3,91)-.5);let m=l+(f-l)*Math.pow(1-h*h,.6)+40*(Ft(t/45,n/45,3,94)-.5)*(1-h);const d=(m-l)/45+.8*(Ft(t/90,n/90,2,93)-.5);m=V(m,l+(Math.floor(d)+R(.55,1,d-Math.floor(d)))*45,.85),m>e&&(e=V(e,m,1-R(.75,1,h)))}return e}const kp=128,Sp=1024,k0=new Map,gi={s:0,lat:0,dist:0},S0=1e-6;function Tp(t,n,e,o,a){const s=Math.floor((o+an)/gn),c=Math.floor((a+an)/gn);let i=1/0;for(let h=s;h<=c;h++){const u=h*t.endX-t.ox,l=h*t.endZ-t.oz,f=h*gn-an;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||(i=Math.min(i,Math.hypot(n-u-m.bx,e-l-m.bz)+m.br))}}let r=1/0;for(let h=s;h<=c;h++){const u=h*t.endX-t.ox,l=h*t.endZ-t.oz;if(Math.hypot(n-u-t.bx,e-l-t.bz)-t.br>i+S0)continue;const f=h*gn-an;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||Math.hypot(n-u-m.bx,e-l-m.bz)-m.br>i+S0||(Fg(m,n-h*t.endX+t.ox-m.x,e-h*t.endZ+t.oz-m.z,Math.max(0,o-d),Math.min(m.len,a-d),gi),gi.dist<r&&(r=gi.dist),r<i&&(i=r))}}return r}const T0=new WeakMap;function Ap(t,n,e){let o=T0.get(t);o||T0.set(t,o=new Map);const a=n*4096+e,s=o.get(a);if(s)return s;const c=t.segs[e],i=n*t.endX-t.ox+c.x,r=n*t.endZ-t.oz+c.z,h=Math.sin(c.th),u=Math.cos(c.th),l={x:i,z:r,s0:n*gn-an+c.u0,len:c.len,k:c.k,th:c.th,sin:h,cos:u,cx:c.k===0?0:i+u/c.k,cz:c.k===0?0:r-h/c.k,r:c.k===0?0:Math.abs(1/c.k),sg:Math.sign(c.k),bx:n*t.endX-t.ox+c.bx,bz:n*t.endZ-t.oz+c.bz,br:c.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return A0(t,n,e,-1,l,"p",c.k===0),A0(t,n,e,1,l,"n",c.k===0),o.set(a,l),l}function Np(t,n,e,o,a){const s=o*Math.SQRT2/2,c=(n+.5)*o,i=(e+.5)*o,r=Math.round((i+t.oz-t.bz)/t.endZ),h=Tp(t,c,i,(r-3)*gn-an,(r+4)*gn-an),u=h+2*s+a,l=[];for(let m=r-3;m<=r+4;m++){const d=m*t.endX-t.ox,g=m*t.endZ-t.oz;if(Math.hypot(c-d-t.bx,i-g-t.bz)-t.br>u)continue;const v=t.segs.length-1;for(let p=0;p<=v;p++){const k=t.segs[p];Math.hypot(c-d-k.bx,i-g-k.bz)-k.br>u||l.push(Ap(t,m,p))}}const f=l.map(m=>({c:m,d:Math.hypot(c-m.bx,i-m.bz)-m.br}));return f.sort((m,d)=>m.d-d.d),{far:h-s>600,cands:f.map(m=>m.c)}}function A0(t,n,e,o,a,s,c){const i=t.segs.length-1;for(let r=0;r<=i;r++){e+=o,e<0?(e=i,n--):e>i&&(e=0,n++);const h=t.segs[e];if(h.k===0){if(c)continue;return}const u=n*t.endX-t.ox+h.x+Math.cos(h.th)/h.k,l=n*t.endZ-t.oz+h.z-Math.sin(h.th)/h.k;s==="p"?(a.pcx=u,a.pcz=l,a.pr=Math.abs(1/h.k)):(a.ncx=u,a.ncz=l,a.nr=Math.abs(1/h.k));return}}function N0(t,n,e,o,a,s,c){const i=Math.floor(e/a),r=Math.floor(o/a),h=(i*1000003+r)*2+s;let u=t.get(h);return u||t.set(h,u=Np(n,i,r,a,c)),u}function zp(t,n,e,o){const a=`${e}`;let s=k0.get(a);(!s||s.size>4e4)&&k0.set(a,s=new Map);const c=N0(s,o,t,n,Sp,1,e);return c.far?c.cands:N0(s,o,t,n,kp,0,e).cands}const pa=30;function ra(t,n,e,o,a=on){const s=zp(t,n,e,a);let c=1/0,i=0,r=0;for(const u of s){if(Math.hypot(t-u.bx,n-u.bz)-u.br>c+e)continue;let l,f,m=1/0;if(u.k===0){const b=t-u.x,w=n-u.z;l=b*u.sin+w*u.cos,f=b*u.cos-w*u.sin}else{const b=t-u.cx,w=n-u.cz;let x=Math.atan2(u.sg*w,-u.sg*b)-u.th;if(x-=2*Math.PI*Math.round((x-u.k*u.len/2)/(2*Math.PI)),l=x/u.k,m=Math.hypot(b,w),f=u.sg*(u.r-m),m<pa){const M=z0[r++]??={s:0,lat:0,dist:0,prom:0,core:0};M.s=u.s0+u.len/2,M.lat=0,M.dist=u.r-m,M.prom=0,M.core=1-m/pa*(m/pa)*(3-2*m/pa)}m+=u.r}if(l<-.01||l>u.len+.01)continue;const d=Math.abs(f);if(d>c+e)continue;d<c&&(c=d);const g=u.s0+Math.min(u.len,Math.max(0,l));let v=!1;for(let b=0;b<i;b++)Math.abs(o[b].s-g)<.5&&(v=!0);if(v)continue;let p=m-d;u.pr>0&&(p=Math.min(p,Math.hypot(t-u.pcx,n-u.pcz)+u.pr-d)),u.nr>0&&(p=Math.min(p,Math.hypot(t-u.ncx,n-u.ncz)+u.nr-d));const k=o[i]??={s:0,lat:0,dist:0,prom:0,core:0};k.s=g,k.lat=f,k.dist=d,k.prom=Math.max(0,p),k.core=0,i++}let h=0;for(let u=0;u<i;u++){if(o[u].dist>c+e)continue;const l=o[h],f=o[u];l.s=f.s,l.lat=f.lat,l.dist=f.dist,l.prom=f.prom,l.core=0,h++}for(let u=0;u<r;u++){const l=o[h++]??={s:0,lat:0,dist:0,prom:0,core:0},f=z0[u];l.s=f.s,l.lat=f.lat,l.dist=f.dist,l.prom=f.prom,l.core=f.core}return h}const z0=[],C0=[];function Ae(t,n,e,o){const a=ra(t,n,0,C0);for(let s=0;s<a;s++){const c=C0[s];if(c.core===0&&Math.abs(c.s-e)<=Math.abs(o)+80)return!0}return!1}const lm=380,hm=160,Cp=220,um=250,Ep=150,dt={x:0,z:0,n210:NaN,n90:NaN,roll:NaN,ridge:NaN};function Lp(t,n){dt.x=t,dt.z=n,dt.n210=dt.n90=dt.roll=dt.ridge=NaN}const _p=()=>Number.isNaN(dt.n210)?dt.n210=Ft(dt.x/210,dt.z/210,3,21):dt.n210,vr=t=>t>10?36*(_p()-.5)*R(10,90,t):0,mm=(t,n)=>t.rise?t.rise(n):Cp,dm=(t,n)=>t.fall?t.fall(n):um,$o=(t,n)=>Y(n)-t.shelf(Z(n));function Ac(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.min(t,n)-o*o*e/4}const Rp=40,Ip=.6,Pp=2.1,Bp=16;function Hp(t,n,e,o,a){if(!t.wall)return a;const s=Z(n),c=t.wall(s);if(c<=0)return a;const i=e*aa(n+t.wallRef(s)-s,150)>0?o:-o,r=t.wallLip?.(s)??Rp,h=r-i;let u=Y(n)-9.1-(h>0?Pp:Ip)*h;i>r-4&&(u-=Bp*R(.42,.62,Ft(dt.x/55,dt.z/55,2,33))*R(r-4,r+18,i));const l=Pt(n)-t.wallTop(s)+.5*vr(o);return V(a,Math.max(a,Ac(u,l,25)),c)}function Fp(t,n,e,o){const a=Z(n),s=Y(n)-t.shelf(a),c=o-t.bench(a);if(c<=0)return Number.isNaN(dt.n90)&&(dt.n90=Ft(dt.x/90,dt.z/90,2,71)),s+1.2*(dt.n90-.5);const i=Pt(n)-lm,r=aa(n,150),h=e*r>0?t.hill(a)*R(5e-4,.002,Math.abs(r)):0;let u=s+(i-s)*(1-Math.exp(-c/dm(t,a)));const l=t.crown?.(a)??0;l>0&&(u=V(u,s+(i-s)*(1-Math.exp(-((c/Ep)**2))),l));const f=s+hm*(1-Math.exp(-c/mm(t,a)));let m=V(u,f,h)+vr(c);const d=R(260,800,c);d>0&&(Number.isNaN(dt.roll)&&(dt.roll=Ft(dt.x/650,dt.z/650,3,5)),m=Math.max(m,i+d*(20+320*R(.38,.78,dt.roll))));const g=R(1200,5e3,c);return g>0&&(Number.isNaN(dt.ridge)&&(dt.ridge=yc(dt.x/3200,dt.z/3200,5,9)),m+=g*(250+1150*dt.ridge)),m}const $p=1.7,Ue=2*Math.PI,Gp=t=>t-Ue*Math.round(t/Ue),ms=[];if(G.hillside)for(const t of on.segs){if(t.k===0||Math.abs(t.k*t.len)<$p)continue;const n=t.x+Math.cos(t.th)/t.k,e=t.z-Math.sin(t.th)/t.k,o=Se(t,0),a=Se(t,t.len/2),s=Math.atan2(o.z-e,o.x-n);ms.push({cx:n,cz:e,r:Math.abs(1/t.k),len:t.len,u0:t.u0,a0:s,sgn:Math.sign(Gp(Math.atan2(a.z-e,a.x-n)-s))})}const E0=new Map;function Op(t,n,e,o){const a=e*64+n;let s=E0.get(a);if(s===void 0){s=-1/0;for(let c=0;c<=ms[n].len;c+=20)s=Math.max(s,$o(t,o+c));E0.set(a,s)}return s}function Dp(t,n,e,o,a){const s=Math.round((e+on.oz-on.bz)/on.endZ);for(let c=s-1;c<=s+1;c++)for(let i=0;i<ms.length;i++){const r=ms[i],h=c*on.endX-on.ox+r.cx,u=c*on.endZ-on.oz+r.cz,l=Math.hypot(n-h,e-u);if(l>r.r+4*um)continue;const f=c*gn-an+r.u0,m=r.r-t.bench(Z(f+r.len/2))-8,d=R(5,45,a);if(l>=m&&d<=0)continue;let g=r.sgn*(Math.atan2(e-u,n-h)-r.a0)%Ue;g<0&&(g+=Ue);const v=g*r.r;let p,k;if(v<=r.len)p=$o(t,f+v),k=t.bench(Z(f+v));else{const x=(v-r.len)/(Ue*r.r-r.len),M=f+v-Ue*r.r;p=V($o(t,f+v),$o(t,M),x),k=V(t.bench(Z(f+v)),t.bench(Z(M)),x)*(1-Math.sin(Math.PI*x))}const b=r.r-l;let w;if(b>k){const x=Op(t,i,c,f),M=V(p,x,R(m,.25*r.r,l)),z=mm(t,Z(f+Math.min(v,r.len)));w=Math.min(M+hm*(1-Math.exp(-(b-k)/z)),x+t.peak(Z(f)))+vr(b-k)}else if(b>=-k)w=p;else{const x=Pt(f)-lm;w=p+(x-p)*(1-Math.exp(-(-b-k)/dm(t,Z(f+Math.min(v,r.len)))))}const y=Math.max(o,V(o,w,d));o=l<m?V(y,w,1-R(m-30,m,l)):y}return o}const L0=200,Up=60,Kp=1.5,_0=10,Vp=1.6,pi=[];function qp(t,n,e){const o=G.hillside;Lp(t,n);const a=ra(t,n,L0,pi);let s=1/0;for(let l=0;l<a;l++){const f=pi[l];f.core===0&&f.dist<s&&(s=f.dist,e.s=f.s,e.lat=f.lat)}let c=0,i=0;for(let l=0;l<a;l++){const f=pi[l];if(f.core>0)continue;const m=(1-R(0,L0,f.dist-s))*(R(0,Up,f.prom)+1e-4);m<=0||(c+=m*Fp(o,f.s,f.lat,f.dist),i+=m)}const r=s-o.bench(Z(e.s));c=Dp(o,t,n,c/i,r);const h=$o(o,e.s)+40+Kp*Math.max(0,r);c>h-30&&(c=Ac(c,h,30)),c=Hp(o,e.s,e.lat,s,c);const u=Y(e.s)-9.1+Vp*Math.max(0,s-_0);return s<_0?c=Math.min(c,u):c>u-6&&(c=Ac(c,u,6)),e.vil=Xt(e.s)*(1-R(0,25,s-o.bench(Z(e.s)))),e.h=c,e}const R0=24,Bn=520,yo=15,Wp=14,I0=200,Yp=60,ot={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},_e={n210:()=>Number.isNaN(ot.n210)?ot.n210=Ft(ot.x/210,ot.z/210,3,21):ot.n210,n700:()=>Number.isNaN(ot.n700)?ot.n700=Ft(ot.x/700,ot.z/700,3,5):ot.n700,n500:()=>Number.isNaN(ot.n500)?ot.n500=Ft(ot.x/500,ot.z/500,2,3):ot.n500,out:()=>Number.isNaN(ot.out)?ot.out=90*yc(ot.x/800,ot.z/800,4,7)+30*(Ft(ot.x/160,ot.z/160,3,11)-.5):ot.out,far:()=>Number.isNaN(ot.far)?ot.far=250+1150*yc(ot.x/3200,ot.z/3200,5,9):ot.far,n90:()=>Number.isNaN(ot.n90)?ot.n90=Ft(ot.x/90,ot.z/90,2,71):ot.n90},ut={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function jp(t,n){const{o:e,ty:o,w:a,sill:s,fly:c,vil:i,xd:r,ra:h,rd:u}=ut,l=V(o-V(150,240,e)-r,c-13,s),f=zn(r/190),m=o-l;let d;if(t<=a){const y=a*V(.2,.55,e),x=zn((t-y)/(a-y));d=l+m*V(Math.pow(x,1.5),x*x*(3-2*x),e),e>0&&(d+=e*34*(_e.n210()-.35)*R(25,110,t))}else{const y=zn((t-a)/V(280,700,e));d=o+(V(400,-50,e)-260*f+140*(_e.n700()-.5))*(1-(1-y)*(1-y))}const g=R(a*.9,a*1.25,t),v=R(yo+8,yo+22,t)*(1-g)*(1-e),p=V(R0,R0*.5,v),k=Math.max(.7*g,.85*v)*(1-.6*f);if(k>0){const y=(d+30*(_e.n500()-.5))/p;d=V(d,(Math.floor(y)+R(.45,1,y-Math.floor(y)))*p,k)}g>0&&(d+=g*_e.out());const b=R(a+900,a+5e3,t);if(b>0&&(d+=b*_e.far()),h>.02&&n>0){const y=o-u,x=sm(l,o,a,e,y);if(!Number.isNaN(x)){const M=h*R(x-3,x-.5,t)*(1-R(x+ve+1,x+ve+4,t));M>0&&(d=Math.min(d,V(d,y-.4,M)))}}const w=i*(1-R(240,380,t));if(w>0&&(d=V(d,c-Fo+1.6*(_e.n90()-.5)-.012*Math.max(0,t-40),w)),d-=6*(1-R(0,18,t))*(d<l+20?1-s:0),t<yo){const y=V(Wp+(yo-t)*2,11+(yo-t)*.3,s);d=Math.min(d,c-V(y,Fo+.4,i))}return d}const vi=[],P0=[],B0=new Map,va=181/Bn;function Xp(t,n){const e=t*100003+n;let o=B0.get(e);if(o!==void 0)return o;const a=(t+.2+.6*N(t,n,61))*Bn,s=(n+.2+.6*N(t,n,62))*Bn,c=70+110*N(t,n,63),i=ra(a,s,0,P0)>0?P0[0]:null;if(!i||Qt(i.s)<.6||i.dist<c+45)o=null;else{const r=Mc(i.s);o={ox:a,oz:s,r:c,floor:r,peak:Pt(i.s)-200+230*N(t,n,64)}}return B0.set(e,o),o}function Zp(t,n,e){const o=Math.floor(t/Bn),a=Math.floor(n/Bn),s=t/Bn-o,c=n/Bn-a;for(let i=-1;i<=1;i++)if(!(i<0&&c+.2>=va||i>0&&1.2-c>=va))for(let r=-1;r<=1;r++){if(r<0&&s+.2>=va||r>0&&1.2-s>=va)continue;const h=o+r,u=a+i,l=(h+.2+.6*N(h,u,61))*Bn,f=(u+.2+.6*N(h,u,62))*Bn,m=Math.hypot(t-l,n-f)/(70+110*N(h,u,63));if(m>=1)continue;const d=Xp(h,u);if(!d)continue;const g=d.floor+(d.peak-d.floor)*Math.pow(1-m*m,.6);g>e&&(e=V(e,g,1-R(.8,1,m)))}return e}function Nc(t,n,e){if(!Number.isFinite(t+n))return e.h=e.s=e.lat=e.vil=NaN,e;if(G.hillside)return qp(t,n,e);ot.x=t,ot.z=n,ot.n210=ot.n700=ot.n500=ot.out=ot.far=ot.n90=NaN;const o=ra(t,n,I0,vi);let a=1/0;for(let c=0;c<o;c++){const i=vi[c];i.core===0&&i.dist<a&&(a=i.dist,e.s=i.s,e.lat=i.lat)}ut.o=ut.ty=ut.w=ut.sill=ut.fly=ut.vil=ut.xd=ut.ra=ut.rd=0;let s=0;for(let c=0;c<o;c++){const i=vi[c],r=(1-R(0,I0,i.dist-a))*(i.core>0?i.core:R(0,Yp,i.prom)+1e-4);if(r<=0)continue;s+=r,ut.o+=r*Qt(i.s),ut.ty+=r*Pt(i.s),ut.w+=r*bn(i.s),ut.sill+=r*Ps(i.s),ut.fly+=r*Y(i.s),ut.vil+=r*Xt(i.s),ut.xd+=r*sa(i.s);const h=Z(i.s);ut.ra+=r*G.road(h),ut.rd+=r*G.roadDepth(h)}return ut.o/=s,ut.ty/=s,ut.w/=s,ut.sill/=s,ut.fly/=s,ut.vil/=s,ut.xd/=s,ut.ra/=s,ut.rd/=s,e.vil=ut.vil,e.h=Mp(t,n,Zp(t,n,jp(a,e.lat))),e}const Qp={h:0,s:0,lat:0,vil:0};function lt(t,n){return Nc(t,n,Qp).h}const ce=`
// mod 289 TRƯỚC khi nhân (adviser 01/11): ván dài 9 km+ → p·456 ≈ 2,5 triệu, float32 còn bước 0,25 → fract chỉ ra
// 4 giá trị, nhiễu thành ô khối. Lưới số nguyên mod 289 vẫn liền (nhiễu lặp chu kỳ 289 ô — 2 km với ô 7 m, không lộ).
float gnHash(vec2 p) {
  p = mod(p, 289.0);
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float gnNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(gnHash(i), gnHash(i + vec2(1.0, 0.0)), u.x),
             mix(gnHash(i + vec2(0.0, 1.0)), gnHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float gnFbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += gnNoise(p) * a;
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return s / 0.9375;
}
// Ô Voronoi: x = khoảng cách tới bờ ô (F2 − F1, xấp xỉ), y = mã ngẫu nhiên 0..1 của ô (tô mỗi ô một màu).
vec2 gnPlots(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float d1 = 8.0;
  float d2 = 8.0;
  vec2 id = i;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 h = i + g;
    vec2 r = g + 0.1 + 0.8 * vec2(gnHash(h), gnHash(h + 17.3)) - f;
    float d = dot(r, r);
    if (d < d1) { d2 = d1; d1 = d; id = h; } else if (d < d2) d2 = d;
  }
  return vec2(sqrt(d2) - sqrt(d1), gnHash(id + 5.1));
}
`,yr=`
// Trôi của nhiễu tầng đặc (thang 260 m → 2,6 / 1,3 m/s thế giới; biển mây cũ 0,004 / 0,002). Mây cuộn đặt theo CÙNG trôi này
// (cloud-billows-shader.ts hub, cloud-billows.ts gốc lưới = −260 × DECK_DRIFT) — đổi một chỗ là phải đổi cả ba.
#define DECK_DRIFT vec2(0.01, 0.005)
// Tay xoắn ĐỨNG YÊN trong toạ độ đã xoắn (w = dE xoay uEye.w × eyeK, rr = r / R) — như dải mây bão thật: dải gần đứng, gió
// chảy dọc theo nó. Bản cũ sin(2θ + 6r/R − 0,6 t) quay đều trong toạ độ thế giới, xoắn NGƯỢC chiều vân mây — gò tay xoắn
// (cloud-deck-relief.ts) trượt qua mặt mây như sóng nước. −4 r/R: cùng chiều xoắn.
float deckEyeArms(vec2 w, float rr) {
  return sin(atan(w.y, w.x) * 2.0 - rr * 4.0);
}
// SỢI MÂY CHẢY quanh mắt: chảy vòng (tâm nhanh, rìa chậm — 0,35 rad/s × eyeK) + cuốn vào tâm, kiểu flow map: hai pha lệch nửa
// chu kỳ, mỗi pha xoay trong ±½ chu kỳ rồi nhảy về đúng lúc trọng số của nó bằng 0 (đổi luôn gốc nhiễu) → độ cuốn có TRẦN dù
// uTime lớn bao nhiêu. Trộn GIỮ phương sai (chia √(w0² + w1²)): trộn thẳng hai nhiễu độc lập thì giữa chu kỳ sợi nhạt hẳn — mây
// "thở" theo nhịp 8 s. Chỉ hai nhiễu đơn 16 / 30 m, không fbm: rẻ, trả (sợi 16 m, sợi 30 m) ~0..1.
#define EYE_FLOW_T 8.0
#define EYE_FLOW_W 0.35
#define EYE_FLOW_IN 0.25
vec2 deckEyeFiberPhase(vec2 w, float eyeK, float f, float cyc) {
  float a = EYE_FLOW_W * EYE_FLOW_T * eyeK * (f - 0.5);
  vec2 q = mat2(cos(a), sin(a), -sin(a), cos(a)) * w * (1.0 + EYE_FLOW_IN * eyeK * (f - 0.5));
  vec2 o = vec2(5.3, 2.9) * cyc;
  return vec2(gnNoise(q / 16.0 + o), gnNoise(q / 30.0 + 4.0 + o));
}
vec2 deckEyeFibers(vec2 w, float eyeK) {
  float t = uTime / EYE_FLOW_T;
  float f0 = fract(t);
  float w0 = 1.0 - abs(2.0 * f0 - 1.0);
  float w1 = 1.0 - w0;
  vec2 n = (deckEyeFiberPhase(w, eyeK, f0, floor(t)) - 0.5) * w0 + (deckEyeFiberPhase(w, eyeK, fract(t + 0.5), floor(t + 0.5) + 0.5) - 0.5) * w1;
  return n / sqrt(w0 * w0 + w1 * w1) + 0.5;
}
// fib trả ra để cloud-sea.ts tô sáng / tối theo sợi (không tính lại hai pha).
float deckEyeTermF(vec2 dE, float rE, float eyeK, vec2 wxz, out vec2 fib) {
  // Ngoài mắt (eyeK cắt về 0 ở 2,4 R; tầng không có mắt) thoát sớm — cả biển mây không phải tính hai pha sợi + 3 lớp gọi.
  fib = vec2(0.5);
  if (eyeK <= 0.0) return 0.0;
  vec2 w = wxz - uEye.xy;
  fib = deckEyeFibers(w, eyeK);
  float arms = deckEyeArms(w, rE / max(uEye.z, 1.0));
  // Tay xoắn bị sợi 30 m xé đứt quãng (vòng 16: tay sin trơn nhìn sượt từ khe C = vệt cong trắng sạch như vẽ vector).
  arms *= 0.45 + 1.1 * fib.y;
  return eyeK * (0.12 * arms + 0.12 * (fib.x - 0.5));
}
float deckEyeTerm(vec2 dE, float rE, float eyeK, vec2 wxz) {
  vec2 fib;
  return deckEyeTermF(dE, rE, eyeK, wxz, fib);
}
`,fm=`
// Chân vách ở độ cao mặt tầng (cloud-deck-walls.ts): 5 trạm trái / phải, z = 1 nếu trạm có vách.
uniform vec3 uWallL[5];
uniform vec3 uWallR[5];
float deckSegD(vec2 p, vec3 a, vec3 b) {
  vec2 ab = b.xy - a.xy;
  float t = clamp(dot(p - a.xy, ab) / max(dot(ab, ab), 0.001), 0.0, 1.0);
  return mix(1e9, length(p - a.xy - ab * t), a.z * b.z);
}
float deckWallDist(vec2 xz) {
  float d = 1e9;
  for (int k = 0; k < 4; k++) {
    d = min(d, deckSegD(xz, uWallL[k], uWallL[k + 1]));
    d = min(d, deckSegD(xz, uWallR[k], uWallR[k + 1]));
  }
  return d;
}
// Sờn mép tầng ở chân vách (vòng 18b — khe cáp C "dải trắng thẳng dọc vách"): TRỪ vào nhiễu độ phủ, không nhân vào alpha —
// mép tầng thành đường đồng mức của nhiễu (mép mây loang theo dens); cloud-sea.ts còn làm MỎNG phần mây trong dải theo đúng
// độ sờn. Mặt tầng không chạm vách (sờn kín 6…36 m, loang thêm 40 m — chạm là có đường giao thẳng). Bản thử đầu (nhân alpha
// theo khoảng cách) và bản lùi theo nhiễu chưa giãn: mép THẲNG song song đường gấp khúc chân vách; bản lùi tới 76 + 50 m: hở
// cả dải rừng, mép lộ thành khối. Cần GLSL_NOISE + uTime.
float deckWallErode(vec2 xz, float d) {
  if (d > 140.0) return 0.0;
  // Dốc 50 m (bản 28 m + gợn 9 m × 16 m: mép tơi nhưng SẮC như giấy xé từng mảng — v3). BẪY v4: value noise qua smoothstep
  // làm sắc = mảng VUÔNG theo trục thế giới (mép tầng thành bậc thang chữ nhật) — hai lớp nhiễu XOAY lệch trục, giãn tuyến tính.
  vec2 q1 = mat2(0.8, 0.6, -0.6, 0.8) * xz / 55.0 + uTime * 0.02;
  vec2 q2 = mat2(0.39, -0.92, 0.92, 0.39) * xz / 23.0 + 3.7;
  float w = clamp((0.65 * gnNoise(q1) + 0.35 * gnNoise(q2) - 0.28) / 0.44, 0.0, 1.0);
  float reach = 6.0 + 30.0 * w;
  return 0.45 * (1.0 - smoothstep(reach, reach + 40.0, d));
}
`,Jp=`
uniform vec4 uGate;
uniform vec2 uGateK;
#define GATE_GLOW vec3(0.45, 0.85, 1.0)
vec3 deckGate(vec2 xz) {
  if (uGateK.x <= 0.0) return vec3(0.0);
  vec2 d = xz - uGate.xy;
  float q = length(vec2(dot(d, uGate.zw) / 16.0, (d.x * uGate.w - d.y * uGate.z) / 4.2)) / (1.0 + uGateK.y);
  // Mép xé theo nhiễu 3,5 m chạy chậm — elip trơn đọc ra lỗ khoan / miếng dán.
  q += 0.24 * (gnNoise(d / 3.5 + uTime * 0.3) - 0.5);
  float hole = 1.0 - smoothstep(0.72, 1.0, q);
  float rim = exp(-(q - 1.12) * (q - 1.12) / 0.05);
  float halo = exp(-q * q / 5.0) * (1.0 - hole);
  return vec3(hole, rim, halo) * uGateK.x;
}
// Áp lên một điểm của mặt tầng: khoét lỗ, vành + quầng sáng nhịp đập (đích để nhắm, 0,8 ↔ 1 — không nhấp nháy).
void deckGateApply(inout vec3 lit, inout float alpha, vec2 xz) {
  vec3 g = deckGate(xz);
  lit += GATE_GLOW * (1.6 * g.y + 0.35 * g.z) * (0.9 + 0.1 * sin(uTime * 6.0));
  alpha = max(alpha * (1.0 - g.x), 0.92 * g.y);
}
`,t2=`
${fm}
${Jp}
vec2 deckBaseN(vec2 xz) {
  vec2 dE = xz - uEye.xy;
  float rE = length(dE);
  float eyeK = uEye.z > 0.0 ? exp(-rE / uEye.z) * (1.0 - smoothstep(1.2 * uEye.z, 2.4 * uEye.z, rE)) : 0.0;
  float ang = uEye.w * eyeK;
  vec2 wxz = uEye.xy + mat2(cos(ang), sin(ang), -sin(ang), cos(ang)) * dE;
  vec2 p = wxz / 260.0 + DECK_DRIFT * uTime;
#ifdef CLOUD_LITE
  float n = gnFbm(p);
#else
  float n = (gnFbm(p) + 0.35 * gnFbm(p * 3.1 + 7.0)) / 1.35;
#endif
  return vec2(n + deckEyeTerm(dE, rE, eyeK, wxz), eyeK);
}
// Đi tiếp dọc tia nhìn 9 / 18 m qua mặt tầng: lớp dưới đặc hơn một chút (thành lỗ dốc vào trong) và tối + lam hơn (trong
// bóng của chính mây) — trộn trước-ra-sau. Mid/low một lớp, một fbm. Trả (màu, độ đục).
vec4 deckLayers(vec3 lit, float alpha, float camD) {
  vec3 rdv = (vWorld - cameraPosition) / max(camD, 0.001);
  float reach = 1.0 / max(abs(rdv.y), 0.15);
  vec3 deep = ATM_SKY_AMBIENT * 0.5 + ATM_BOUNCE * 0.12;
  vec3 cSum = lit * alpha;
  float aSum = alpha;
#ifdef CLOUD_LITE
  const int LAYERS = 1;
#else
  const int LAYERS = 2;
#endif
  // Lớp sâu CHỈ khi nhìn chúc (|rd.y| > ~0,2): nhìn sượt (khe C, nóc mây F) lớp sâu lấy mẫu xa tới 120 m dọc tia, nhiễu
  // trơn không gợn → một tấm mây phẳng có VÀNH TRẮNG CỨNG cắt ngang khung (vòng 16, c-cable — tắt lớp sâu là hết).
  float useDeep = smoothstep(0.18, 0.42, abs(rdv.y));
  for (int k = 1; k <= LAYERS; k++) {
    float fk = float(k);
    vec2 xzk = vWorld.xz + rdv.xz * min(9.0 * fk * reach, 120.0);
    vec2 nk = deckBaseN(xzk);
    // Lớp sâu cũng sờn ở chân vách — không thì nó lấp lại đúng dải vừa sờn ở lớp trên.
    // Trong dải sờn lớp sâu tắt hẳn: bản sao lệch dọc tia của mép sờn thành THÀNH ĐỨNG (vạch dọc màn hình, ảnh 18b-v5).
    float erk = deckWallErode(xzk, deckWallDist(xzk)) * (1.0 - smoothstep(0.0, 0.12, nk.y));
    nk.x -= erk;
    float ck = uCover + 0.5 * nk.y * nk.y * nk.y - 0.035 * fk;
    float ak = 0.96 * useDeep * smoothstep(0.0, 0.45, smoothstep(ck - 0.03, ck + 0.33, nk.x)) * (1.0 - smoothstep(0.0, 0.25, erk)) * (1.0 - deckGate(xzk).x) * (1.0 - aSum);
    cSum += mix(lit, deep, 0.24 * fk) * ak;
    aSum += ak;
  }
  return vec4(cSum / max(aSum, 0.001), aSum);
}
`,n2=`
#include <fog_pars_vertex>
varying vec3 vWorld;
#ifdef CLOUD_DECK
${ce}
uniform float uTime;
uniform vec4 uEye;
${yr}
${am}
varying vec2 vEyeGrad;
#endif
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
#ifdef CLOUD_DECK
  // Sóng nóc mây + mắt xoáy (cloud-deck-relief.ts). Gốc mesh = độ cao phẳng của tầng. Độ dốc phần mắt xoáy (sai phân 3 m)
  // cho shader mảnh chiếu nắng lên vành / họng / tay xoắn.
  world.y += deckLift(world.xz, modelMatrix[3].y);
  float eye0 = deckEyeLift(world.xz);
  vEyeGrad = vec2(deckEyeLift(world.xz + vec2(3.0, 0.0)) - eye0, deckEyeLift(world.xz + vec2(0.0, 3.0)) - eye0) / 3.0;
#endif
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,e2=`
#include <fog_pars_fragment>
${ce}
uniform float uTime;
uniform float uCover;
uniform vec2 uFwd;
uniform float uUnder;
// 1 = tầng mây ĐẶC (Fansipan, cloud-decks.ts): không khoét lỗ gần camera / hành lang nhìn, độ đục không giảm khi nhìn chúc —
// biển mây cũ cố ý mỏng để thấy thung lũng khi lao; nóc mây Fansipan phải là MẶT để lướt trên và lao xuyên qua.
uniform float uSolid;
// MẮT XOÁY (Fansipan D, layout CloudDeck.eye): x, z tâm · bán kính R · góc xoắn. R = 0 ở mọi map khác = không đổi gì.
uniform vec4 uEye;
varying vec3 vWorld;
#ifdef CLOUD_DECK
${yr}
${t2}
varying vec2 vEyeGrad;
#endif
void main() {
#ifdef CLOUD_DECK
  // Mặt tầng có sóng / phễu: trên / dưới tính theo TỪNG điểm (uniform chỉ biết độ cao phẳng) — camera đã xuống dưới độ cao
  // phẳng giữa phễu mắt xoáy vẫn thấy thành phễu là nóc mây, không phải trần.
  float underV = clamp((vWorld.y - cameraPosition.y) / 6.0 + 0.5, 0.0, 1.0);
#define uUnder underV
#endif
  // Xoay toạ độ mẫu quanh tâm theo exp(-r/R): mây cuộn xoắn ốc về một lỗ (ảnh vòng 7: lỗ mây tròn trơn đọc ra cái ao).
  vec2 dE = vWorld.xz - uEye.xy;
  float rE = length(dE);
  // Cắt hẳn ngoài ~2,4 R: đuôi exp ở 400 m còn xoay 0,35 rad → vệt cung trắng tận đoạn C (ảnh vòng 8).
  float eyeK = uEye.z > 0.0 ? exp(-rE / uEye.z) * (1.0 - smoothstep(1.2 * uEye.z, 2.4 * uEye.z, rE)) : 0.0;
#ifdef CLOUD_DECK
  float ang = uEye.w * eyeK;
#else
  float ang = uEye.w * eyeK + uTime * 0.12 * eyeK;
#endif
  vec2 wxz = uEye.xy + mat2(cos(ang), sin(ang), -sin(ang), cos(ang)) * dE;
#ifdef CLOUD_DECK
  vec2 p = wxz / 260.0 + DECK_DRIFT * uTime;
#else
  vec2 p = wxz / 260.0 + vec2(uTime * 0.004, uTime * 0.002);
#endif
  // fbm ở đây trung bình 0,5, lệch chuẩn chỉ ~0,1 — nên uCover là NGƯỠNG trực tiếp (0,5 ≈ phủ một nửa,
  // 0,6 ≈ phủ ~15%), không phải tỉ lệ phủ. Bản đầu coi là tỉ lệ → ngưỡng 0,4 → mây phủ kín thành sàn đặc (t06).
  // Tầng gợn nhỏ (~24 m) chỉ khi ở gần: cú lao đưa người bay xuống 20 m trên nóc mây, nhiễu 260 m một mình thì
  // nóc mây thành tấm nhựa hồng phẳng lì (v01-p1420).
  float camD = length(vWorld - cameraPosition);
  float camNear = 1.0 - smoothstep(150.0, 600.0, camD);
  // Gần camera (< ~320 m): tầng gợn mạnh hơn + NGƯỠNG nâng lên → mặt mây VỠ thành cụm có lỗ thủng thấy ruộng/sông bên
  // dưới (anh Đức duyệt 01/11 đổi quyết định 26/10 "mây đặc dưới bụng": 6 vòng chấm đều bắt tấm mây hồng che ~60% khung
  // cú lao). Xa vẫn là biển mây liền — thước đo độ cao giữ nguyên.
  float camHole = (1.0 - smoothstep(60.0, 320.0, camD)) * (1.0 - uSolid);
#ifdef CLOUD_DECK
  // Tầng đặc: gợn 24 m mạnh hơn (0,22 → 0,34) và giữ tới ~1,4 km thay vì tắt ở 600 m — mép cụm / mép lỗ VỠ thành sợi
  // lởm chởm ở mọi tầm nhìn sượt (giám khảo: "hard-edged flat sheets", "cut-out holes with hard rims").
  float det = gnFbm(p * 11.0 + 3.0);
  float midN = gnFbm(p * 3.1 + 7.0);
  float n = (gnFbm(p) + 0.35 * midN + 0.34 * (1.0 - smoothstep(500.0, 1400.0, camD)) * (det - 0.5)) / 1.35;
#else
  float n = (gnFbm(p) + 0.35 * gnFbm(p * 3.1 + 7.0) + (0.22 + 0.2 * camHole) * camNear * (gnFbm(p * 11.0 + 3.0) - 0.5)) / 1.35;
#endif
  // Tâm mắt trống hẳn (ngưỡng +0,55), hai tay xoắn ốc dày / mỏng xen kẽ quanh lỗ.
  // Lỗ nhỏ (eyeK³: trống trong ~0,4 R) — bản eyeK² trống tới ~R, camera chúc xuống chỉ thấy hồ, không thấy mây cuộn.
#ifdef CLOUD_DECK
  vec2 eyeFib;
  n += deckEyeTermF(dE, rE, eyeK, wxz, eyeFib);
#else
  n += 0.11 * eyeK * sin(atan(dE.y, dE.x) * 2.0 + rE / max(uEye.z, 1.0) * 6.0 - uTime * 0.4);
#endif
  float cover = uCover + 0.05 * camHole + 0.5 * eyeK * eyeK * eyeK;
#ifdef CLOUD_DECK
  // ĐĨA BÃO quanh mắt (~50–400 m): mây đặc, chỉ họng hở (playtest 04/11 khung 1.380 m: lỗ nhiễu tự nhiên ngay trước mắt nhập
  // với họng thành một "cái hồ" to chiếm nửa khung — mắt xoáy đọc ra hồ có viền mây).
  cover -= 0.14 * smoothstep(0.03, 0.25, eyeK) * (1.0 - smoothstep(0.55, 0.8, eyeK));
#endif
  // Tầng đặc: mép lỗ / mép cụm mềm gấp 2,5 (0,1 → 0,25) — mép 0,1 đọc ra "giấy xé" cắt ngang vách (vòng 7–9, cả hai giám khảo).
#ifdef CLOUD_DECK
  // Dốc mép rộng thêm (0,25 → 0,33, bắt đầu dưới ngưỡng 0,03): nhìn sượt khoảng mép 40–100 m nén còn vài điểm ảnh — mép
  // phải loang dần mới đọc ra mây chứ không phải giấy cắt.
  // NHÌN SƯỢT (khe C — tầng trên / dưới cách 30–80 m, nhìn tới 500 m+): mép lỗ / mép tấm nén thành vành trắng sạch "như vector"
  // (vòng 16). Mép xé thêm nhiễu mịn ~8 m + dốc độ đục giãn gấp đôi khi nhìn sượt — mép loang mờ, không cắt.
  float graze = 1.0 - smoothstep(0.04, 0.3, abs(vWorld.y - cameraPosition.y) / max(camD, 1.0));
  n += graze * 0.12 * (gnNoise(p * 31.0 + uTime * 0.02) - 0.5) * (1.0 - smoothstep(cover, cover + 0.3, n));
  // Sát chân vách (cloud-deck-walls.ts) tầng xé mỏng dần trong ~45 m — mặt phẳng không cắt vách thành đường dao.
  float wallD = deckWallDist(vWorld.xz);
  float wallK = 1.0 - smoothstep(6.0, 48.0, wallD);
  // Trong vùng mắt xoáy (eyeK > 0, tới ~2,4 R) KHÔNG sờn: sờn theo chân vách xén tấm xoáy thành mép thẳng dọc vách (d-eye 18b).
  float wallEr = deckWallErode(vWorld.xz, wallD) * (1.0 - smoothstep(0.0, 0.12, eyeK));
  n -= wallEr + wallK * 0.07 * gnNoise(p * 23.0 + 1.7);
  // Tay xoắn mắt xoáy nhìn sượt từ khe C thành dải cong liền: nhiễu KHÔNG xoắn bẻ đứt dải.
  n += 0.07 * eyeK * (gnNoise(vWorld.xz / 22.0) - 0.5);
  // VÀNH mắt (gồ lên ở ~0,7 R, cloud-deck-relief.ts) là mây DÀY — bờ mây đặc nhận nắng quanh họng tối, không phải mép mỏng.
  float rimQ = (rE / max(uEye.z, 1.0) - 0.7) / 0.32;
  n += uEye.z > 0.0 ? 0.1 * exp(-rimQ * rimQ) : 0.0;
  float dens = smoothstep(cover - 0.03, cover + 0.33, n);
#else
  float dens = smoothstep(cover, cover + mix(0.1, 0.25, uSolid), n);
#endif
  // Hành lang thưa dọc hướng nhìn (01/11 — fresh-eyes: cú lao n-2150/n-2450 mây trắng phủ 40–60% khung): mây dưới
  // bụng vẫn còn (quyết định 26/10), nhưng dải 30–450 m phía trước quanh trục nhìn mỏng còn ~40% → lộ ruộng/sông
  // bên dưới như khe hở mây X4, khung có lớp thay vì một tấm sơn tím.
  vec2 rel = vWorld.xz - cameraPosition.xz;
  float along = dot(rel, uFwd);
  float lat = abs(rel.x * uFwd.y - rel.y * uFwd.x);
  float lane = smoothstep(20.0, 60.0, along) * (1.0 - smoothstep(380.0, 520.0, along)) * (1.0 - smoothstep(45.0, 110.0, lat));
  // Nhìn từ DƯỚI (trần mây Fansipan) thì không khoét hành lang: khe hở là để nhìn xuống đất.
  dens *= 1.0 - 0.6 * lane * (1.0 - uUnder) * (1.0 - uSolid);
#ifndef CLOUD_DECK
  if (dens < 0.01) discard;
#endif
  // Mặt phẳng tô một màu thì thành vũng sơn vàng trên đất (t09). Coi n là bản đồ độ cao của nóc mây, lấy pháp
  // tuyến từ sai phân rồi chiếu nắng bọc: sườn hướng mặt trời rực, sườn khuất + mép mỏng ngả tím của trời.
  float body = smoothstep(cover, cover + 0.22, n);
#ifdef CLOUD_LITE
  // Máy yếu: bỏ 4 lần fbm lấy pháp tuyến (mặt mây phủ nửa khung khi lao — tô điểm ảnh đắt nhất của tầng low).
  float wrap = 0.3 + 0.55 * body;
#else
  // Sai phân TIẾN (3 lần fbm thay vì 4 — adviser 01/11), độ chính xác pháp tuyến như cũ ở thang 260 m.
  float e = 0.02;
  float f0 = gnFbm(p);
  // Tầng mây đặc (Fansipan): pháp tuyến dốc gấp 3 — nóc mây phải có KHỐI (gò, rãnh) để lướt; biển mây cũ nhìn từ xa giữ 0,35.
  float nk = mix(0.35, 1.05, uSolid);
  vec3 nrm = normalize(vec3(-(gnFbm(p + vec2(e, 0.0)) - f0) / e * nk, 1.0, -(gnFbm(p + vec2(0.0, e)) - f0) / e * nk));
  float wrap = clamp((dot(nrm, ATM_SUN_DIR) + 0.4) / 1.4, 0.0, 1.0);
#endif
#ifdef CLOUD_DECK
  // Sườn vành mắt / họng / tay xoắn theo HÌNH thật (cloud-deck-relief.ts) — sườn hướng nắng sáng, sườn khuất tối.
  wrap = clamp(wrap + 0.9 * (dot(normalize(vec3(-vEyeGrad.x, 1.0, -vEyeGrad.y)), ATM_SUN_DIR) - ATM_SUN_DIR.y), 0.0, 1.0);
#endif
  // Mặt khuất tối hơn (×0,55 thay ×0,8): mây khuất nắng sáng ngang mặt được nắng thì thành tấm trắng phẳng.
  vec3 shade = ATM_SKY_AMBIENT * 0.55 + ATM_BOUNCE * 0.2;
  vec3 sunlit = ATM_SUN_LIGHT * 1.2 + ATM_GLOW * 0.25;
  vec3 lit = mix(shade, sunlit, wrap * (0.45 + 0.55 * body));
  // Tầng mây đặc: đỉnh gò sáng, rãnh giữa gò xanh lam tối — nóc mây đọc ra GÒ / SÓNG chứ không phải sàn trắng phẳng (giám khảo
  // B vòng 6: "empty white floor"). Theo nhiễu chính n (cùng thang hình gò), mặt dưới không cần.
  lit = mix(lit, mix(ATM_SKY_AMBIENT * 0.62, lit, 0.35 + 0.65 * smoothstep(cover, cover + 0.42, n)), uSolid * (1.0 - uUnder));
  // Gò mây LỚN (~800 m) + phơi sáng hạ 12% trên nóc tầng đặc: vòng 7 hai giám khảo cùng thấy nóc mây E / F "mặt phẳng trắng
  // cháy sáng" — mảng sáng / bóng cỡ đồi chia biển mây thành khối, mắt có chỗ đo khoảng cách.
  float mound = smoothstep(0.38, 0.62, gnFbm(p * 0.33 + 11.0));
  lit *= mix(1.0, mix(0.66, 1.0, mound) * 0.88, uSolid * (1.0 - uUnder));
#ifdef CLOUD_DECK
  // Bướu 24 m (cùng nhiễu chi tiết ở trên — không tốn thêm lần fbm nào) sáng đỉnh / tối hốc trong ~700 m: khung vừa bung lên
  // khỏi tầng (camera sát mặt, cụm mây cuộn gần đã chìm) nửa dưới là mặt phẳng trắng trơn — nhất là tầng mid/low không có
  // pháp tuyến (ảnh m-e-burst).
  // Sát camera (< 250 m) hốc sâu hơn (0,74 → 0,6): vừa bung lên khỏi tầng, nửa dưới khung "trắng sữa" (vòng 15).
  lit *= mix(1.0, mix(mix(0.6, 0.74, smoothstep(80.0, 250.0, camD)), 1.06, smoothstep(0.38, 0.62, det)), 1.0 - smoothstep(120.0, 700.0, camD));
  // Vòng 18 ("biển mây cháy sáng, giữ được vùng tối thật"): (1) KHE giữa các cụm mây cuộn tối theo bãi cụm — cùng công thức
  // fieldAO ở cloud-billows-shader.ts để chân cụm khớp màu; (2) nhìn sượt VỀ PHÍA MẶT TRỜI mặt tầng hạ sáng tới 30% (mặt
  // phẳng phản chiếu nắng thẳng vào mắt là chỗ trắng tinh của khung); (3) sát camera ngả lam nhẹ. Chỉ nóc tầng (uUnder 0).
  float fieldAO = 1.0 - 0.3 * smoothstep(cover + 0.06, cover + 0.24, n) * (1.0 - smoothstep(520.0, 780.0, length(vWorld.xz - cameraPosition.xz)));
  vec3 dirV = (vWorld - cameraPosition) / max(camD, 0.001);
  float sunGraze = graze * smoothstep(0.25, 0.95, dot(dirV, ATM_SUN_DIR));
  vec3 topTone = lit * fieldAO * (1.0 - 0.38 * sunGraze);
  topTone = mix(topTone * vec3(0.76, 0.8, 0.92), topTone, smoothstep(30.0, 260.0, camD));
  lit = mix(lit, topTone, 1.0 - uUnder);
  // Nhìn CHÚC (rơi D, khung đèn ước nhìn từ trên): mây cuộn đã chìm, mặt tầng đọc ra "thảm phẳng" — gò ~80 m (chính lớp nhiễu
  // thứ hai của n, không tốn thêm) sáng / tối rõ hơn.
  lit *= mix(1.0, mix(0.7, 1.06, smoothstep(0.35, 0.65, midN)), 0.6 * smoothstep(0.45, 0.85, abs(dirV.y)));
  // PHỄU mắt xoáy: thành phễu tối dần + ngả lam về tâm, tay xoắn sáng — đọc ra lốc xoáy ngay cả khi nhìn thẳng từ trên (vòng
  // 15: lỗ sáng giữa mặt mây phẳng đọc ra "sông có đảo").
  lit = mix(lit, ATM_SKY_AMBIENT * 0.3 + ATM_BOUNCE * 0.04, 0.75 * smoothstep(0.18, 0.85, eyeK));
  // Sợi mây CHẢY (deckEyeFibers) tô cả sáng / tối trên vành + thành phễu: mây đặc thì độ phủ bão hoà, sợi chỉ nằm trong mật độ
  // nên vành mắt là gò trơn một màu — "gò tuyết / thạch cao" (playtest 04/11 1.320 m).
  lit *= mix(1.0, 0.78 + 0.4 * eyeFib.x * (0.6 + 0.4 * eyeFib.y), smoothstep(0.08, 0.35, eyeK));
  // Sát chân vách: ngả về ĐÚNG màu dải mây ôm sườn của địa hình (terrain-material.ts) — hai bên mép cùng một màu thì không
  // còn vành sáng / tối chạy dọc vách.
  lit = mix(lit, mix(ATM_SKY_AMBIENT * 0.62, mix(shade, sunlit, 0.35), 0.5), 0.7 * wallK * (1.0 - uUnder));
#endif
  // Mặt dưới (trần mây): không có nắng trực tiếp — xám lam của trời, chỗ mỏng (gần mép cụm) sáng hơn như nắng xuyên.
  // Tối hẳn (×0,55) để LỖ THỦNG trên trần là chỗ sáng: bản ×0,8 sáng ngang trời → trần đọc ra "trời có mây" (ảnh vòng 2).
  lit = mix(lit, shade * (0.55 + 0.45 * (1.0 - body)) + ATM_GLOW * 0.05, uUnder);
  // Độ đục theo ĐƯỜNG NHÌN XUYÊN lớp mây: nhìn sượt (xa, gần chân trời) tia đi qua nhiều mây → đặc ~0,88; nhìn dốc
  // xuống (mép dưới khung, ngay dưới bụng) tia đi qua lớp mỏng → còn ~0,35, thấy thung lũng qua làn mây. Bản cũ alpha
  // đều 0,88 mọi góc → tấm sơn hồng phẳng che nửa dưới khung.
  float steep = abs(vWorld.y - cameraPosition.y) / max(camD, 1.0);
  float alpha = 1.0 - exp(-0.32 * dens / max(steep, 0.15));
  alpha = mix(alpha, 0.96 * smoothstep(0.0, 0.45, dens), uSolid);
#ifdef CLOUD_DECK
  alpha = 0.96 * smoothstep(0.0, 0.45 + 0.45 * graze, dens) * (1.0 - 0.45 * wallK);
  // Cửa mây (cloud-deck-glsl.ts) — lớp sâu bên dưới cũng thủng theo cùng hàm.
  deckGateApply(lit, alpha, vWorld.xz);
  // HỌNG mắt xoáy: lỗ giữa không trong suốt hẳn mà là màn hơi tối lam (độ đục 0,72) — nhìn chúc thấy giếng tối giữa phễu, không
  // phải mặt hồ + đảo sáng rõ (vòng 15 "sông có đảo"). Camera chui qua họng: sát camera 4–26 m vẫn trong suốt.
  float throat = smoothstep(0.55, 0.95, eyeK);
  lit = mix(lit, ATM_SKY_AMBIENT * 0.16 + ATM_BOUNCE * 0.03, throat * (1.0 - alpha));
  // 0,72 → 0,86 (playtest 04/11): họng giờ lõm sâu 45 m — nhìn chéo từ cuối khe C vẫn thấy rõ mặt suối qua họng = "cái hồ".
  alpha = max(alpha, 0.86 * throat);
  // Lớp sâu dọc tia nhìn (cloud-deck-glsl.ts) → lỗ có thành, mép mềm theo độ sâu.
  vec4 deckC = deckLayers(lit, alpha, camD);
  if (deckC.a < 0.01) discard;
  // Tầng đặc chỉ trong suốt sát camera (4–26 m — lúc chọc qua, làn trắng đã che): bản 12–70 m của biển mây khoét một LỖ
  // tròn ngay dưới bụng khi lướt nóc mây F cách 50 m → thấy rừng dưới đáy qua lỗ viền cứng (ảnh f-cloudtop2).
  // Trong dải sờn chân vách phần mây còn lại MỎNG dần (hơi trong) theo đúng độ sờn — mép theo nhiễu mà vẫn sắc như giấy xé
  // nếu chỉ trừ độ phủ (dốc dens ~10 m, nhìn từ 250 m còn vài điểm ảnh). Nhân sau lớp sâu để lớp sâu cũng mỏng theo.
  gl_FragColor = vec4(deckC.rgb, deckC.a * smoothstep(4.0, 26.0, camD) * (1.0 - 0.85 * smoothstep(0.0, 0.45, wallEr)));
#else
  gl_FragColor = vec4(lit, alpha * smoothstep(12.0, 70.0, camD));
#endif
  #include <fog_fragment>
}`;function gm(t,n=!1){return new Mt({vertexShader:n2,fragmentShader:e2,defines:{...t?{CLOUD_LITE:1}:{},...n?{CLOUD_DECK:1}:{}},uniforms:Ln.merge([_n.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new yn(0,1)},uUnder:{value:0},uSolid:{value:n?1:0},uEye:{value:new as},uGate:{value:new as},uGateK:{value:new yn}}]),transparent:!0,depthWrite:!1,fog:!0,side:n?St:eu})}function o2(t){const n=new _,e=gm(t),o=new j(new En(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return o.frustumCulled=!1,o.renderOrder=1,{mesh:o,veil:()=>0,update(a,s,c){const i=a.position;a.getWorldDirection(n),e.uniforms.uFwd.value.set(n.x,n.z).normalize();const r=c+250,h=Qt(r);o.position.set(i.x,Mc(r)+20+(Pt(r)-(G.cloudDepth??170)-Mc(r)-20)*h,i.z),tm.value=o.position.y,e.uniforms.uTime.value=s,e.uniforms.uCover.value=.62-.1*h+.5*(1-G.cloud(Z(r)))}}}const a2=`
#include <fog_pars_fragment>
${ce}
// three chỉ khai projectionMatrix ở shader đỉnh — khai lại để tính độ sâu của điểm trúng (cùng tên = cùng uniform).
uniform mat4 projectionMatrix;
uniform float uSide;
uniform float uTime;
varying vec3 vQuad;
varying vec4 vSphere;
varying vec3 vTone;
varying vec3 vSeed;
// Độ cao mặt tầng ĐÃ NÂNG ở chân cụm (cloud-billows-shader.ts).
varying float vBase;
// 0 = cụm nhỏ trên màn (bỏ thùy con) … 1 = cụm to gần (cloud-billows-shader.ts).
varying float vDetail;
#ifdef CLOUD_LITE
#define BILLOW_STEPS 3
#else
#define BILLOW_STEPS 5
#endif
// Nhiễu trên hướng d (đơn vị): trung bình 2–3 mặt phẳng chiếu → không có điểm kỳ dị / đường nối như toạ độ cầu. Sôi chậm
// theo thời gian (bướu đổi hình rất chậm như mây tích đang dâng).
float billowN(vec3 d) {
  vec3 p = d * 2.3 + vSeed.x * 7.1 + uTime * 0.03;
#ifdef CLOUD_LITE
  return 0.5 * (gnNoise(p.xy) + gnNoise(p.yz + 3.1));
#else
  return (gnNoise(p.xy) + gnNoise(p.yz + 3.1) + gnNoise(p.zx + 7.7)) / 3.0;
#endif
}
#ifdef CLOUD_LITE
float billowR(vec3 d) { return 0.66 + 0.34 * smoothstep(0.28, 0.72, billowN(d)); }
#else
// Bướu HAI cỡ (playtest 04/11 nóc mây 3.850 m: "cục bột"): một cỡ bướu lớn (3–4 thùy quanh cầu) đọc ra khối bột nặn — mây
// tích là súp lơ: thùy lớn mang thùy con ~2,4 lần nhỏ hơn.
// Thùy theo "billow noise" |n − 0,5| (04/11, nóc mây 3.850 m vẫn "nếp nhựa nhăn"): nhiễu trơn cho gò và rãnh tròn như nhau
// = nếp nhăn; lấy trị tuyệt đối thì mọi gò đều là THÙY tròn, rãnh giữa hai thùy là nếp gấp sắc — dáng súp lơ của mây tích.
// 1 − (1 − l)² cho thùy vòm (độ dốc ở nếp hữu hạn — tia dò vẫn hội tụ, không thủng lỗ như √l).
float lobe(float n, float k) {
  float l = clamp(abs(n - 0.5) * k, 0.0, 1.0);
  return 1.0 - (1.0 - l) * (1.0 - l);
}
float billowR(vec3 d) {
  vec3 p = d * 5.5 + vSeed.x * 3.9 - uTime * 0.02;
  float small = (gnNoise(p.xy + 1.3) + gnNoise(p.yz + 5.2) + gnNoise(p.zx + 9.4)) / 3.0;
  return 0.64 + 0.25 * lobe(billowN(d), 4.5) + 0.11 * mix(0.5, lobe(small, 5.0), vDetail);
}
#endif
void main() {
  if (vSphere.w < 0.5) discard;
  vec3 rd = normalize(vQuad - cameraPosition);
  vec3 oc = cameraPosition - vSphere.xyz;
  float b = dot(oc, rd);
  float h = b * b - (dot(oc, oc) - vSphere.w * vSphere.w);
  if (h < 0.0) discard;
  float sh = sqrt(h);
  float tFar = -b + sh;
  if (tFar < 0.0) discard;
  // Dò tia từ mặt cầu bao (bán kính lớn nhất) vào mặt sần: bước 0,85 × khoảng cách tới mặt (hàm không Lipschitz 1).
  float t = max(-b - sh, 0.0);
  vec3 P = cameraPosition + rd * t;
  vec3 dv = P - vSphere.xyz;
  float len = length(dv);
  float lr = 1.0;
  bool hit = false;
  for (int i = 0; i < BILLOW_STEPS; i++) {
    P = cameraPosition + rd * t;
    dv = P - vSphere.xyz;
    len = max(length(dv), 0.001);
    lr = billowR(dv / len);
    float sd = len - vSphere.w * lr;
    if (sd < 0.02 * vSphere.w) { hit = true; break; }
    t += sd * 0.8;
    if (t > tFar) break;
    // Hết bước mà còn sát mặt (< 10% r): coi là trúng. Bỏ hẳn như cũ thì tia chưa kịp hội tụ giữa hai bướu thành LỖ THỦNG ngay
    // trong lòng cụm, viền tối quanh lỗ (playtest 04/11: "cục bột").
    if (i == BILLOW_STEPS - 1 && sd < 0.1 * vSphere.w) hit = true;
  }
  // Tia sượt mép bướu chưa chạm sau mấy bước = khe giữa hai bướu → bỏ (chính chỗ đó làm viền vỡ, không tròn).
  if (!hit) discard;
  // Phần cầu ở phía bên kia mặt tầng: bỏ (mặt tầng vẽ sau che, hoặc lỗ mây lộ ra — cầu không được lòi qua lỗ).
  float above = (P.y - vBase) * uSide;
  if (above < 0.0) discard;
  vec3 nr = dv / len;
#ifdef CLOUD_LITE
  vec3 N = nr;
#else
  // Pháp tuyến mặt sần từ độ dốc bán kính theo hai tiếp tuyến (sai phân 0,08 rad).
  vec3 tu = normalize(cross(nr, abs(nr.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 tv = cross(nr, tu);
  float gu = (billowR(normalize(nr + tu * 0.08)) - lr) / 0.08;
  float gv = (billowR(normalize(nr + tv * 0.08)) - lr) / 0.08;
  vec3 N = normalize(nr - (gu * tu + gv * tv) / lr);
#endif
  float ndv = clamp(-dot(N, rd), 0.0, 1.0);
  float capH = clamp(above / max(vTone.z, 1.0), 0.0, 1.0);
  // Vân bông nhỏ (~1/9 bán kính) gắn trên cụm — mặt không trơn như đồ nhựa.
  vec3 lq = dv / vSphere.w * 9.0 + vSeed.x * 3.3;
  float fine = 0.5 * (gnNoise(lq.xy) + gnNoise(lq.yz + 5.7));
#ifndef CLOUD_LITE
  // Vân SÚP LƠ (vòng 18, "đống tuyết"): bướu lớn từ bán kính sần vẫn trơn như ụ tuyết — gồ vân bông 8% r lên pháp tuyến
  // qua đạo hàm màn hình (bump theo surface gradient). Cụm xa nhỏ vài điểm ảnh thì tắt (đạo hàm vân bông = nhiễu lấp lánh).
  // Chỉ đổi ánh sáng; viền / chân cụm vẫn theo ndv hình học (ndv đã tính ở trên).
  {
    vec3 dpx = dFdx(P);
    vec3 dpy = dFdy(P);
    // 0,08 → 0,05 r (04/11, nóc mây 3.850 m): gồ mạnh ở cụm to gần đọc ra NẾP NÃO / đá rỗ, không phải súp lơ.
    float bh = fine * 0.05 * vSphere.w * (1.0 - smoothstep(0.025, 0.07, length(dpx) / vSphere.w));
    vec3 r1 = cross(dpy, N);
    vec3 r2 = cross(N, dpx);
    float det = dot(dpx, r1);
    vec3 g = sign(det) * (dFdx(bh) * r1 + dFdy(bh) * r2);
    g *= min(1.0, 1.2 * abs(det) / max(length(g), 1e-12));
    vec3 Nb = abs(det) * N - g;
    if (dot(Nb, Nb) > 1e-20) N = normalize(Nb);
  }
#endif
  // Cụm đang chìm (gần camera / rìa lưới) VỠ thành mảng theo nhiễu trên mặt cụm, không còn thấu kính trắng lẻ (ảnh v12).
  if (0.5 * (fine + lr) > vSeed.y * 1.5 - 0.05) discard;
  // Chân cụm loang vào mặt tầng theo bướu + vân (không dither).
  if (capH < 0.3 * (1.0 - smoothstep(0.66, 1.0, lr)) + 0.12 * fine - 0.08) discard;
  vec3 L = ATM_SUN_DIR;
  // Cùng màu nắng / bóng với mặt tầng (cloud-sea.ts) để chân cụm hoà vào mặt phẳng không thành viền.
  vec3 shade = ATM_SKY_AMBIENT * 0.55 + ATM_BOUNCE * 0.2;
  vec3 sunlit = ATM_SUN_LIGHT * 1.2 + ATM_GLOW * 0.25;
#ifdef CLOUD_LITE
  vec3 planeCol = mix(shade, sunlit, 0.85);
  N = normalize(N + 0.5 * vec3(fine - 0.5, 0.0, billowN(nr * 1.7) - 0.5));
#else
  vec3 planeCol = mix(shade, sunlit, clamp((L.y + 0.4) / 1.4, 0.0, 1.0));
#endif
  float sunN = dot(N, L);
  float wrap = clamp((sunN + 0.35) / 1.35, 0.0, 1.0);
  // Khe giữa các bướu (bán kính nhỏ) + chân cụm tối; vân bông ±9%.
  float ao = mix(0.7, 1.0, smoothstep(0.0, 0.85, capH)) * mix(0.55, 1.0, smoothstep(0.66, 0.92, lr)) * (0.91 + 0.18 * fine);
  // Đỉnh nắng rực (wrap^1,5 + ánh trời từ trên), sườn khuất lam xám — vòng 18 hai giám khảo: "đống tuyết / bãi tuyết",
  // "giữ được vùng tối thật" → sườn khuất 0,56 → 0,46 + ngả lam.
  vec3 col = (mix(shade * 0.4 + ATM_SKY_AMBIENT * 0.04, sunlit, wrap * sqrt(wrap)) + ATM_SKY_AMBIENT * 0.22 * max(N.y, 0.0)) * ao;
  // BỤNG lam xám: sườn khuất nắng ở nửa dưới cụm — mây tích chiều có bụng xanh xám, không phải ụ trắng.
  float belly = (1.0 - wrap) * (1.0 - smoothstep(0.3, 0.85, capH)) * smoothstep(0.05, 0.28, capH);
  col = mix(col, ATM_SKY_AMBIENT * 0.27 + ATM_BOUNCE * 0.04, 0.85 * belly);
  // Chân cụm khớp mặt tầng đã tối ở khe giữa các cụm (vSeed.z = fieldAO, cùng công thức cloud-sea.ts).
  planeCol *= vSeed.z;
  if (uSide < 0.0) {
    // Túi mây treo dưới trần: không nắng trực tiếp, đầu túi hứng chút sáng hắt từ tầng dưới.
    col = shade * (0.52 + 0.26 * capH + 0.12 * wrap) * (0.91 + 0.18 * fine) + ATM_GLOW * 0.05;
    planeCol = shade * 0.55 + ATM_GLOW * 0.05;
  }
  // Chân cụm + viền bóng ngả về màu mặt tầng: viền tối quanh đĩa sáng là hình BONG BÓNG kính. Chân hoà trong ~30% dưới.
  // Mép theo fresnel loang hẳn về nền (mép mây mỏng, hơi trong — mép trắng cứng là "đống tuyết").
  col = mix(planeCol, col, smoothstep(0.0, 0.32, capH) * smoothstep(0.04, 0.55, ndv));
  // Mép TRÊN cụm (bóng in lên trời / nền xa) loang về màu sương phía sau: mép mây tích mỏng, hơi trong — viền trắng đặc
  // in lên trời là "đống tuyết" (vòng 18).
  float rimSoft = (1.0 - smoothstep(0.05, 0.5, ndv)) * smoothstep(0.35, 0.8, capH) * max(uSide, 0.0);
  col = mix(col, atmSkyColor(rd) * 0.95, 0.55 * rimSoft);
  float up = max(uSide, 0.0) * smoothstep(0.15, 0.6, capH);
  float fr = 1.0 - ndv;
  // BẪY (cả khung ĐEN ở e-burst): ndv sai số float vượt 1 → pow(số âm) = NaN → bloom nhoè NaN ra toàn màn. ndv đã kẹp.
  // Viền bạc khi nhìn về phía mặt trời + viền ẤM cam đào ở mép quay về nắng.
  col += ATM_SUN_LIGHT * 1.1 * pow(fr, 2.5) * pow(max(dot(rd, L), 0.0), 3.0) * up;
  col += ATM_GLOW * 0.8 * fr * fr * max(sunN, 0.0) * up;
  if (uSide > 0.0) {
    // Đỉnh gò / rãnh + gò lớn 800 m như mặt tầng — cụm trên rãnh tối theo rãnh.
    col = mix(ATM_SKY_AMBIENT * 0.62, col, vTone.y);
    col *= mix(0.66, 1.0, vTone.x) * 0.88;
  }
  gl_FragColor = vec4(col, 1.0);
  // Sương tính ở điểm TRÚNG trên cụm (vFogWorld là điểm trên quad).
  vec3 fogRay = P - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, P.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
  vec4 clip = projectionMatrix * viewMatrix * vec4(P, 1.0);
  gl_FragDepth = 0.5 + 0.5 * clip.z / clip.w;
}`,s2=`
#include <fog_pars_vertex>
${ce}
attribute vec3 aCell;
uniform vec2 uOrigin;
uniform float uCell;
uniform float uReach;
uniform float uDeckY;
uniform float uSide;
uniform float uCover;
uniform float uTime;
uniform vec4 uEye;
// Cửa mây (cloud-deck-glsl.ts DECK_GATE_GLSL) — chỉ cần tâm + độ hiện.
uniform vec4 uGate;
uniform vec2 uGateK;
${yr}
${fm}
${am}
varying vec3 vQuad;
varying float vBase;
varying vec4 vSphere;
varying vec3 vTone;
varying vec3 vSeed;
varying float vDetail;
void main() {
  vec2 cell = uOrigin + aCell.xy;
  float sub = aCell.z;
  float h1 = gnHash(cell + 0.37);
  float h2 = gnHash(cell + 11.7);
  float h3 = gnHash(cell + 23.1 + sub * 7.9);
  float h4 = gnHash(cell + 5.3 + sub * 3.7);
  // Lưới trôi CÙNG nhiễu của mặt tầng (p += t·(0,004; 0,002) ở thang 260 m = −1,04; −0,52 m/s thế giới): cụm đứng yên
  // trên vùng mây dày của nó, không trượt qua lỗ.
  vec2 hub = (cell + 0.5 + (vec2(h1, h2) - 0.5) * 0.7) * uCell - 260.0 * DECK_DRIFT * uTime;
  // sub 0 = lõi (khối nền thấp) · 1–3 = vai quanh lõi · 4–5 = CHÓP tròn trên vai lõi · 6–7 = cụm con NHỎ bám mép cụm (mid/low:
  // 1–2 vai, 3 chóp, không cụm con). Mây tích đọc ra súp lơ nhờ đầu tròn nhô trên khối nền + vụn nhỏ ở mép (vòng 15–16).
#ifdef CLOUD_LITE
  float turret = step(2.5, sub);
  float sat = 0.0;
#else
  float turret = step(3.5, sub) * (1.0 - step(5.5, sub));
  float sat = step(5.5, sub);
#endif
  // KIỂU cụm theo ô (vòng 16 giám khảo: "cầu đồng đều như đồ chơi"): ~45% thảm thấp rộng, ~20% tháp mây cao thưa (vòng 18: "cần cụm cao kiểu cumulus"), còn lại
  // vừa; ~12% ô bỏ trống cho biển mây có chỗ thưa chỗ dày. Tỉ lệ tháp nay theo QUẦN THỂ (mass bên dưới): 7% → 40%.
  float a = h1 * 6.2832 + sub * 2.4;
  float off = sub < 0.5 ? 0.0 : mix(mix(0.3 + 0.16 * h4, 0.14 + 0.16 * h4, turret), 0.42 + 0.18 * h4, sat);
  vec2 xz = hub + vec2(cos(a), sin(a)) * off * uCell;
  // Độ phủ như cloud-sea.ts (bỏ gợn 24 m — đã chừa biên ngưỡng +0,08 bên dưới). Lấy ở TÂM CỤM (hub), không ở từng quả cầu:
  // mỗi cầu tự xét thì lõi trên chỗ mỏng tắt còn chóp bên cạnh vẫn mọc → chóp mây LƠ LỬNG như hòn đá bay (playtest 04/11).
  vec2 dE = hub - uEye.xy;
  float rE = length(dE);
  float eyeK = uEye.z > 0.0 ? exp(-rE / uEye.z) * (1.0 - smoothstep(1.2 * uEye.z, 2.4 * uEye.z, rE)) : 0.0;
  float ang = uEye.w * eyeK;
  vec2 wxz = uEye.xy + mat2(cos(ang), sin(ang), -sin(ang), cos(ang)) * dE;
  vec2 p = wxz / 260.0 + DECK_DRIFT * uTime;
  float n = (gnFbm(p) + 0.35 * gnFbm(p * 3.1 + 7.0)) / 1.35 + deckEyeTerm(dE, rE, eyeK, wxz);
  float cover = uCover + 0.5 * eyeK * eyeK * eyeK;
  // Chỉ mọc nơi mặt tầng ĐÃ ĐỤC hẳn (alpha mặt tầng đủ ở n ≈ ngưỡng + 0,13): cụm đặc trên làn mây mỏng nhìn từ trên rơi
  // tự do B đọc ra BONG BÓNG xanh lơ lửng (ảnh v3 b-top).
  float dense = smoothstep(cover + 0.08, cover + 0.24, n);
  float mound = smoothstep(0.38, 0.62, gnFbm(p * 0.33 + 11.0));
  // QUẦN THỂ mây ~600 m (playtest 04/11 nóc mây 3.850 m: "improve art mây ấn tượng hơn" — mỗi ô một cụm cỡ gần đều = bãi
  // đá cuội trải tới chân trời): quần thể dày → cụm to hơn chồng sang ô bên + tháp mây dày → vài khối mây tích lớn dồn đống;
  // quần thể thưa → cụm teo hẳn, biển mây phẳng trống giữa các khối. Cùng không gian p (xoáy + trôi theo mặt tầng).
  float mass = smoothstep(0.4, 0.6, gnFbm(p * 0.42 + 23.0));
  // HÀNH LANG bay: khối to ngay trên hướng nhìn che tháp kim / hàng phía trước (ảnh fp-after2-3873) — dọc trục camera ±55 m
  // quần thể về mức cũ, khối lớn chỉ đứng hai bên làm khung cho đường bay. Trục lấy từ viewMatrix (hàng 3 = −hướng nhìn).
  vec2 fw = -vec2(viewMatrix[0][2], viewMatrix[2][2]);
  fw /= max(length(fw), 1e-3);
  vec2 rel = hub - cameraPosition.xz;
  float lane = (1.0 - smoothstep(55.0, 130.0, abs(dot(rel, vec2(-fw.y, fw.x))))) * smoothstep(-60.0, 0.0, dot(rel, fw));
  float tall = step(mix(mix(0.93, 0.6, mass), 0.93, lane), h2);
  float flatK = 1.0 - step(0.45, h2);
  // Cụm to / nhỏ theo ô (h2) + theo gò lớn: đỉnh gò là cụm cao tầng, rãnh là cụm bẹt — không phải bãi bánh bao đều nhau.
  // ~1/8 ô là cụm "tháp" (h2 > 0,88) cao gấp rưỡi: mây tích dựng đứng giữa biển mây cho mắt có mốc đo cỡ / khoảng cách.
  float grand = (0.7 + 0.4 * h2 + 0.4 * tall) * (0.8 + 0.35 * mound) * mix(mix(0.3, 1.3, mass) * smoothstep(0.03, 0.2, mass), 0.85, lane);
  // Cầu TO, chìm sâu (vòm thấp, rộng) chồng lấn sang ô bên: mặt mây cuộn liền thành sóng — bản cầu nhỏ cách nhau đọc ra
  // bãi bông gòn rải trên sàn. Thảm thấp lõi rộng hơn 20%; tháp: chóp to hơn 30%.
  float size = sub < 0.5 ? (0.46 + 0.12 * h3) * (1.0 + 0.2 * flatK)
    : mix(mix(0.3 + 0.12 * h3, (0.13 + 0.06 * h3) * (1.0 + 0.3 * tall), turret), 0.07 + 0.05 * h3, sat);
  // Trần mây (camera ở dưới, uSide −1): túi mây treo NHỎ hơn — trần khe C chỉ cách đầu 32–50 m.
  float r = uCell * size * mix(0.55, 1.0, dense) * grand * (uSide < 0.0 ? 0.55 : 1.0) * step(0.12, gnHash(cell + 41.3));
  // Trần mây nhìn từ dưới (khung wish 6440, vòng 18: "tầng dạng thảm"): túi treo mọi ô đều cỡ = thảm chần bông — chỉ còn ~45% ô,
  // cỡ lệch 0,7…1,3.
  if (uSide < 0.0) r *= step(0.55, gnHash(cell + 17.9)) * (0.7 + 0.6 * h3);
  // Cụm ngồi trên CỬA MÂY che mất lỗ (nhìn sượt chỉ thấy khối mây, không thấy đích) — chìm trong ~18–50 m quanh cửa.
  r *= 1.0 - uGateK.x * (1.0 - smoothstep(18.0, 50.0, length(hub - uGate.xy)));
  // Tâm cầu so với mặt tầng (theo r): lõi chìm 0,6 r (thảm 0,72) → khối nền thấp; vai chìm sâu hơn; chóp nổi (tâm +0,5…0,85 r,
  // thảm chỉ +0,2…0,35, tháp +1…1,35) để đầu tròn nhô cao hơn đỉnh lõi; cụm con mép ngồi sát mặt tầng.
  // Tháp: chóp +0,75 r → +0,3 r (playtest 04/11): chóp tâm cao 1,6 r hở hẳn khỏi đỉnh lõi ở mép lõi → quả cầu LƠ LỬNG to chắn
  // ngay đường bay nóc mây F.
  float lift = sub < 0.5 ? mix(-0.6, -0.72, flatK)
    : mix(mix(-0.5 - 0.15 * h4, (0.5 + 0.35 * h4) * (1.0 - 0.6 * flatK) + 0.3 * tall, turret), -0.15 + 0.3 * h4, sat);
  // Gần camera CHÌM xuống mặt tầng (không thành khối trắng to trước ống kính, không che người bay ngay trước camera);
  // tới rìa lưới cũng chìm dần — lưới nhảy ô theo camera mà không lộ cụm mọc / biến mất.
  // Vùng chìm rộng khi camera sát mặt tầng (vừa bung ra ở E: cụm ngang tầm mắt ngay trước mặt là bức tường), hẹp khi lướt
  // cao 50 m ở F (cụm dưới bụng là thứ phải thấy).
  float nearR = mix(60.0, 32.0, smoothstep(20.0, 70.0, abs(cameraPosition.y - uDeckY)));
  // Chân cụm trên mặt tầng ĐÃ NÂNG (sóng / phễu, cloud-deck-relief.ts) — không thì cụm lơ lửng trên rãnh, chìm dưới đỉnh sóng.
  float base = uDeckY + deckLift(xz, uDeckY);
  vec3 toBase = cameraPosition - vec3(xz.x, base, xz.y);
  float dSurf = length(toBase) - r;
  // Nhìn CHÚC từ cao (rơi tự do B, nhìn xuống mắt xoáy D): khối nổi chỉ đọc được khi nhìn sượt; nhìn thẳng xuống thì quả
  // cầu đặc trên làn mây mỏng ra bi / bong bóng kính (ảnh v4–v5 b-top) — chìm hẳn, để mặt tầng tự lo bằng bóng gò.
  float steep = abs(toBase.y) / max(length(toBase), 1.0);
  // Camera cao hơn mặt tầng > ~110 m (màn tiêu đề A, đầu cú rơi B): cụm 20–30 m chỉ còn là chấm — chìm hết.
  float keep = dense * smoothstep(0.35 * nearR, nearR, dSurf) * (1.0 - smoothstep(0.36, 0.62, steep))
    * (1.0 - smoothstep(110.0, 210.0, abs(toBase.y)))
    * (1.0 - smoothstep(0.7 * uReach, uReach, length(cameraPosition.xz - xz)))
    // Vành mắt xoáy (d-eye, vòng 18: cụm trắng góc trên trái đọc ra tuyết đè lên phễu xoáy): mặt tầng xoáy tự lo, cụm chìm.
    * (1.0 - smoothstep(0.18, 0.45, eyeK))
    // Sát chân vách (d-eye: cụm ngồi trên dải mây giữa vách và mắt xoáy, cây trên vách mọc xuyên đỉnh cụm): chìm trong 25–70 m.
    * smoothstep(25.0, 70.0, deckWallDist(xz));
  // Chìm thì CO lại cùng lúc: chỉ hạ tâm thì chỏm còn lại là thấu kính dẹt rộng — elip trắng nằm trên mặt tầng (ảnh v9).
  lift = mix(-0.95, lift, keep);
  r *= 0.35 + 0.65 * keep;
  // Cụm gần camera NHỎ hơn cụm xa (bù phối cảnh): sát mặt tầng (e-burst) cụm 40 m ở 80 m là đồi tuyết trơn che nửa khung;
  // gần là bướu nhỏ dày, xa là sóng lớn — mắt đọc ra chi tiết ở mọi tầm.
  // Dải co giãn 40–320 → 60–450 m (playtest 04/11): cụm vừa ~200 m trước mặt ở nóc mây F vẫn to gần đủ cỡ = quả cầu che hàng.
  r *= mix(0.42, 1.0, smoothstep(60.0, 450.0, length(cameraPosition.xz - xz)));
  if (keep < 0.01) r = 0.0;
  vec3 c = vec3(xz.x, base + uSide * lift * r, xz.y);
  // Quad vuông góc hướng nhìn, nửa cạnh = bán kính bóng cầu trong phối cảnh r·d/√(d² − r²).
  vec3 toC = cameraPosition - c;
  float d = max(length(toC), 0.001);
  vec3 f = toC / d;
  vec3 rt = normalize(cross(abs(f.y) > 0.98 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0), f));
  vec3 up = cross(f, rt);
  float k = r * d / sqrt(max(d * d - r * r, 0.04 * d * d)) * 1.04;
  // Thùy con chỉ khi cụm đủ to trên màn (góc r/d): cụm xa vài chục điểm ảnh mang thùy con = "bông cải xanh" (fp-after3).
  vDetail = smoothstep(0.02, 0.07, r / d);
  // CẮT quad còn phần chỏm trên mặt tầng: cầu chìm ~50% mà quad phủ cả bóng tròn → nhìn sượt quá nửa điểm ảnh chạy shader
  // rồi mới bỏ (gl_FragDepth tắt early-z — điện thoại trả tiền theo điểm ảnh). Đáy quad = đường mặt tầng chiếu lên mặt
  // quad, trừ biên phối cảnh: điểm chỏm GẦN camera hơn tâm chiếu xuống thấp hơn (camera cao hơn chỏm).
  vec3 upv = up * (up.y * uSide >= 0.0 ? 1.0 : -1.0);
  float hc = (c.y - base) * uSide;
  float hcam = max((cameraPosition.y - base) * uSide, 0.0);
  float lo = (-hc - hcam * r / max(d - r, 1.0)) / max(abs(up.y) * k, 0.001);
  // Chỉ đúng khi trục dọc quad gần trục đứng thế giới (nhìn sượt); nhìn chúc thì đường mặt tầng không nằm ngang trên quad → giữ nguyên quad.
  lo = mix(-1.0, clamp(lo - 0.04, -1.0, 0.95), smoothstep(0.6, 0.85, abs(up.y)));
  vec3 world = c + (rt * position.x + upv * mix(lo, 1.0, 0.5 + 0.5 * position.y)) * k;
  vQuad = world;
  vSphere = vec4(c, r);
  vBase = base;
  vTone = vec3(mound, 0.35 + 0.65 * smoothstep(cover, cover + 0.42, n), (1.0 + lift) * r);
  // z = bóng chung của cả bãi cụm trên mặt tầng tại chân cụm — CÙNG công thức fieldAO của cloud-sea.ts (chân cụm phải khớp màu
  // mặt tầng đã tối đi ở khe giữa các cụm).
  float fieldAO = 1.0 - 0.3 * smoothstep(cover + 0.06, cover + 0.24, n) * (1.0 - smoothstep(520.0, 780.0, length(cameraPosition.xz - xz)));
  vSeed = vec3(h3 * 7.0 + sub, keep, fieldAO);
  vec4 mvPosition = viewMatrix * vec4(world, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,i2={cell:90,rings:8,subs:8},c2={cell:110,rings:5,subs:4},r2=650;function l2(t,n){const e=n?c2:i2,o=[];for(let m=-e.rings;m<=e.rings;m++)for(let d=-e.rings;d<=e.rings;d++)if(!(m*m+d*d>(e.rings+.5)**2))for(let g=0;g<e.subs;g++)o.push(m,d,g);const a=o.length/3,s=new xf;s.setAttribute("position",new $(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),s.setIndex([0,1,2,0,2,3]),s.setAttribute("aCell",new ar(new Float32Array(o),3)),s.instanceCount=0;const c=new yn,i={value:0},r={value:1},h=t.uniforms.uTime,u={...Ln.merge([_n.fog]),uOrigin:{value:c},uCell:{value:e.cell},uReach:{value:e.cell*(e.rings+.5)},uDeckY:i,uSide:r,uTime:h,uCover:t.uniforms.uCover,uEye:t.uniforms.uEye,uGate:t.uniforms.uGate,uGateK:t.uniforms.uGateK,uWallL:t.uniforms.uWallL,uWallR:t.uniforms.uWallR},l=new Mt({vertexShader:s2,fragmentShader:a2,defines:n?{CLOUD_LITE:1}:{},uniforms:u,fog:!0,side:St}),f=new j(s,l);return f.name="cloud-billows",f.frustumCulled=!1,{mesh:f,update(m,d,g){const v=m.y-d;if(s.instanceCount=g&&Math.abs(v)<r2?a:0,s.instanceCount===0)return;const p=h.value;c.set(Math.floor((m.x+2.6*p)/e.cell),Math.floor((m.z+1.3*p)/e.cell)),i.value=d,r.value=v>=0?1:-1}}}const On=72,yi=.9,h2=.92;function u2(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");let e=11;const o=()=>(e=e*16807%2147483647)/2147483647;for(let a=0;a<70;a++){const s=32+(o()+o()-1)*24,c=1-Math.abs(s-32)/30,i=32+(o()+o()-1)*9*c+2.5*Math.sin(s/9),r=(6+16*o())*(.5+.5*c),h=1+2*o();n.save(),n.translate(s,i),n.rotate((o()-.5)*.25),n.scale(r/2,h/2);const u=n.createRadialGradient(0,0,0,0,0,1);u.addColorStop(0,`rgba(255,255,255,${.12+.22*o()*c})`),u.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=u,n.beginPath(),n.arc(0,0,1,0,Math.PI*2),n.fill(),n.restore()}n.globalCompositeOperation="destination-out";for(let a=0;a<6;a++)n.fillStyle="rgba(0,0,0,0.5)",n.beginPath(),n.ellipse(14+36*o(),32+(o()-.5)*10,2+3*o(),1+1.5*o(),0,0,Math.PI*2),n.fill();return new oa(t)}function m2(t){const n=new Mf({size:2.6,map:u2(),color:15922683,transparent:!0,depthWrite:!1,fog:!0});return n.onBeforeCompile=e=>{e.uniforms.uPilotNdc={value:t},e.vertexShader=e.vertexShader.replace("void main() {",`attribute float aSize;
attribute float aRot;
uniform vec3 uPilotNdc;
varying float vRot;
varying float vClear;
void main() {
  vRot = aRot;`).replace("gl_PointSize = size;","gl_PointSize = size * aSize;").replace("#include <fog_vertex>",`#include <fog_vertex>
  vec2 ndcP = gl_Position.xy / max(gl_Position.w, 0.001);
  float dP = length((ndcP - uPilotNdc.xy) * vec2(uPilotNdc.z, 1.0)) - gl_PointSize / 800.0;
  vClear = smoothstep(0.1, 0.32, dP);`),e.fragmentShader=e.fragmentShader.replace("void main() {",`varying float vRot;
varying float vClear;
void main() {`).replace("#include <map_particle_fragment>",`vec2 pc = gl_PointCoord - 0.5;
  float cr = cos(vRot), sr = sin(vRot);
  diffuseColor *= texture2D(map, vec2(cr * pc.x - sr * pc.y, sr * pc.x + cr * pc.y) + 0.5);
  diffuseColor.a *= vClear;`)},n.customProgramCacheKey=()=>"cloud-burst-wisp-clear",n}function d2(t){const n=new Float32Array(On*3),e=new Float32Array(On*3),o=new Float32Array(On),a=new Float32Array(On),s=new ht;s.setAttribute("position",new $(n,3)),s.setAttribute("aSize",new $(o,1)),s.setAttribute("aRot",new $(a,1));const c=m2(t),i=new ss(s,c);i.name="cloud-burst",i.frustumCulled=!1,i.renderOrder=2,s.setDrawRange(0,0);let r=yi,h=1;const u=new _,l=new _;return{object:i,fire(f,m,d,g){r=0,h=1-.6*g,s.setDrawRange(0,On),s.attributes.aSize.needsUpdate=!0,s.attributes.aRot.needsUpdate=!0,u.set(0,1,0).cross(m),u.lengthSq()<.01&&u.set(1,0,0),u.normalize(),l.copy(m).cross(u).normalize();for(let v=0;v<On;v++){const p=v/On*Math.PI*2+Math.random()*.4,k=4+5*Math.random(),b=5+10*Math.random(),w=6+8*Math.random(),y=v*3;o[v]=.5+1.5*Math.random()**2,a[v]=-p+(Math.random()-.5)*.5;for(let x=0;x<3;x++){const M=u.getComponent(x)*Math.cos(p)+l.getComponent(x)*Math.sin(p);n[y+x]=f.getComponent(x)+m.getComponent(x)*w+M*k,e[y+x]=d.getComponent(x)*h2+M*b}}},update(f){if(r>=yi){s.setDrawRange(0,0);return}r+=f;const m=Math.exp(-2.6*f);for(let g=0;g<On*3;g++)n[g]+=e[g]*f,e[g]*=m;s.attributes.position.needsUpdate=!0;const d=r/yi;c.opacity=Math.max(0,1-d)**1.3*.62,c.color.setScalar(.96*h),c.size=3.2+4*d}}}function f2(t){const n=new _(0,-.1,1),e=new _,o=new _;let a=null,s=0;return{ndc:n,update(c){!a&&t.parent&&s++%30===0&&t.parent.traverse(i=>{!a&&i.isSkinnedMesh&&(a=i)}),a?a.getWorldPosition(e):e.copy(c.position).addScaledVector(c.getWorldDirection(o),11),e.project(c),n.set(e.x,e.y,c.aspect)}}}const bi=[-60,120,300,480,660],H0=30,g2=615,p2=1215;function v2(){const t=bi.map(()=>new _),n=bi.map(()=>new _),e={x:0,y:0,z:0},o=(s,c,i)=>(D(s,c,0,e),lt(e.x,e.z)>i),a=(s,c,i,r)=>{let h=0;for(let u=15;u<=p2;u+=u<g2?H0:2*H0){if(o(s,c*u,i)){let l=u;for(let f=0;f<3;f++){const m=(h+l)/2;o(s,c*m,i)?l=m:h=m}D(s,c*l,0,e),r.set(e.x,e.z,1);return}h=u}r.set(0,0,0)};return{left:t,right:n,update(s,c){bi.forEach((i,r)=>{a(s+i,-1,c,t[r]),a(s+i,1,c,n[r])})}}}const y2=900,b2=650,wi=.5,w2=1.2,x2=.25,bo=.2,xi=.5,F0=.4;function M2(){const t=new WeakMap,n=new WeakSet,e=new _,o=new _;let a=-1e9,s=null;return{scan(c,i,r){for(const h of c?.gates??[])(h.hit||h.missed)&&!t.has(h)&&(t.set(h,i),h.missed&&(a=i)),h.hit&&!n.has(h)&&r>=h.z&&(n.add(h),s=h)},layer(c,i,r,h,u){const l=c.uniforms.uGateK.value,f=r?.gates.find(b=>b.deck===i&&b.z>h-80);if(!r||!f)return l.set(0,0),0;const m=u-(t.get(f)??u);f.hit?l.set(1-ya(wi,wi+w2,m),1.5*ya(0,wi,m)):f.missed?l.set(Math.max(0,1-m/x2),0):l.set(1-ya(b2,y2,f.z-h),0);const d=Tt(f.lane);D(f.z,d,0,e),D(f.z+2,d,0,o);const g=o.x-e.x,v=o.z-e.z,p=Math.hypot(g,v)||1;return c.uniforms.uGate.value.set(e.x,e.z,g/p,v/p),f.hit||!f.missed&&Math.abs(r.x-d)<=P.gateRadiusX?1-ya(30,55,Math.abs(h-f.z)):0},hold(c){const i=c-a;return i<0||i>bo+xi+F0?0:i<bo?i/bo:i<bo+xi?1:1-(i-bo-xi)/F0},takeTear(){const c=s;return s=null,c}}}function ya(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}const ba=700,jt={x:70,y:36,z:70},k2=new _(4,-26,0);function S2(){const t=new Float32Array(ba*3);for(let h=0;h<ba*3;h++)t[h]=Math.random();const n=new Float32Array(ba*6),e=new ht;e.setAttribute("position",new $(n,3));const o=new ou({color:13162220,transparent:!0,opacity:0,depthWrite:!1,fog:!0}),a=new au(e,o);a.frustumCulled=!1,a.renderOrder=3;const s=new _,c=new _,i=new _;let r=!1;return{object:a,update(h,u,l,f){if(a.visible=l>.02,!a.visible){r=!1;return}const m=h.position;r&&u>0&&c.subVectors(m,s).divideScalar(u),s.copy(m),r=!0,i.copy(k2).sub(c);const d=Math.min(3.2,1.6+i.length()/60);i.normalize().multiplyScalar(d);for(let g=0;g<ba;g++){const v=g*3;t[v+1]=(t[v+1]-26*u/jt.y+1)%1;const p=m.x+((t[v]*jt.x-m.x)%jt.x+jt.x)%jt.x-jt.x/2,k=m.y+t[v+1]*jt.y-jt.y/2,b=m.z+((t[v+2]*jt.z-m.z)%jt.z+jt.z)%jt.z-jt.z/2,w=g*6;n[w]=p,n[w+1]=k,n[w+2]=b,n[w+3]=p+i.x,n[w+4]=k+i.y,n[w+5]=b+i.z}e.attributes.position.needsUpdate=!0,o.opacity=.32*l*(1-.5*f)}}}const T2=18,A2=7,$0=.86,N2=1.2;let ds=!1;function z2(){const t=ds;return ds=!1,t}function C2(t,n){const e=new yt,o=bp(n),a=t.map(b=>{const w=gm(n,!0),y=new j(o,w);y.frustumCulled=!1,y.renderOrder=1,e.add(y);const x=v2();w.uniforms.uWallL={value:x.left},w.uniforms.uWallR={value:x.right};const M=l2(w,n);return e.add(M.mesh),{deck:b,mesh:y,material:w,billows:M,walls:x}});let s=0;const c=a.map(()=>-1e9),i=G.rain?S2():null;i&&e.add(i.object);const r=f2(e),h=d2(r.ndc);e.add(h.object);const u=M2(),l=new _,f=new _,m=new _,d=new _;let g=!1,v=-1,p=0,k=0;return{mesh:e,veil:()=>p,update(b,w,y,x){const M=b.position;u.scan(x,w,y);const z=Z(y);G.waterLevel!==void 0&&(gr.value=Pt(y)+G.waterLevel);const C=Math.min(.1,Math.max(0,w-k));i?.update(b,C,G.rain?.(z)??0,0),h.update(C),C>0&&d.subVectors(b.position,f).divideScalar(C).clampLength(0,120),f.copy(b.position),k=w,p=0;let E=0,T=-1;const A=d.y>0?1:-1;s++,a.forEach(({deck:L,mesh:I,material:B,billows:U,walls:W},Q)=>{const nt=L.cover(z),q=Pt(y)+L.level(z);if(Q<2&&(hs.value[Q*2]=q,hs.value[Q*2+1]=nt),I.visible=nt>.02,!I.visible){U.update(M,q,!1);return}I.position.set(M.x,q,M.z),Math.abs(M.y-q)<450&&((s+Q*2)%4===0||Math.abs(y-c[Q])>40)&&(W.update(y,q),c[Q]=y),B.uniforms.uCover.value=1.1-.75*nt,B.uniforms.uTime.value=w,B.uniforms.uUnder.value=Math.min(1,Math.max(0,(q-M.y)/6+.5));let et=0;if(L.eye){let Et=wn(y)*ct+L.eye.phase-_t;y-Et>ct/2&&(Et+=ct),D(Et,0,0,m),B.uniforms.uEye.value.set(m.x,m.z,L.eye.radius,L.eye.swirl*N2);const Rt=Math.exp(-Math.hypot(M.x-m.x,M.z-m.z)/L.eye.radius);et=Math.min(1,1.6*Rt*Rt)}const ft=u.layer(B,Q,x,y,w),J=(M.y-q)*A,Nt=(1-Math.min(1,J<0?-J/T2:J/A2))**2,Ct=nt*(1-et)*(1-ft)*Nt;Ct>E&&(E=Ct,T=Q),U.update(M,q,nt>.3)}),p=Math.max($0*E,$0*u.hold(w));const S=u.takeTear();S&&(h.fire(M,b.getWorldDirection(l),d,0),S.deck===0&&S.up&&(ds=!0)),E>.55?(g=!0,v=T):g&&E<.25&&(g=!1,h.fire(M,b.getWorldDirection(l),d,0),v===0&&A>0&&(ds=!0)),h.object.geometry.drawRange.count>0&&r.update(b)}}}const br=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],la=[.8,.3,.16],pm=[.6,.32,.22],wr=[.9,.76,.45],vm=[.88,.84,.76],E2=[.2,.45,.36],xr=[.45,.25,.14],ym=[.58,.33,.24];function H(t,n,e=.1,o=1){const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv"),a.getAttribute("normal")||a.computeVertexNormals();const s=a.getAttribute("position"),c=new Float32Array(s.count*3),i=br(n);for(let r=0;r<s.count;r++){const h=1-e/2+e*N(s.getX(r)*.8+o,s.getY(r)*.8+s.getZ(r)*.6,17);for(let u=0;u<3;u++)c[r*3+u]=i[u]*h}return a.setAttribute("color",new $(c,3)),a}const bt=t=>kt(t);function jo(t,n,e,o){const a=t.getAttribute("position"),s=t.getAttribute("color");for(let c=0;c<a.count;c++){const i=o+(1-o)*Math.min(1,Math.max(0,(a.getY(c)-n)/(e-n)));s.setXYZ(c,s.getX(c)*i,s.getY(c)*i,s.getZ(c)*i)}return t}const Mr=[1,.7,.32];function Fs(t,n,e,o,a=0,s=[.55,.2,.12]){const c=[],i=Math.max(6,Math.round(t/.45)),r=Math.max(4,Math.round(Math.hypot(n,e)/.42)),h=br(o);for(const u of[-1,1]){const l=[],f=[],m=[];for(let g=0;g<=r;g++){const v=g/r;for(let p=0;p<=i;p++){const k=(p/i-.5)*t,b=Math.pow(Math.abs(k)/(t/2),5);l.push(k,e*(1-v)+a*b*(.35+.65*v),u*n*v*(1+.06*b));const w=(p%2?1:.72)*(g%2?1:.88)*(.8+.35*N(k*.3,v*4+u,23));f.push(h[0]*w,h[1]*w,h[2]*w)}}for(let g=0;g<r;g++)for(let v=0;v<i;v++){const p=g*(i+1)+v;u>0?m.push(p,p+i+1,p+1,p+1,p+i+1,p+i+2):m.push(p,p+1,p+i+1,p+1,p+i+2,p+i+1)}const d=new ht;d.setAttribute("position",new $(new Float32Array(l),3)),d.setAttribute("color",new $(new Float32Array(f),3)),d.setIndex(m),d.computeVertexNormals(),c.push(d.toNonIndexed())}return c.push(H(new F(t+.3,.32,.42).translate(0,e+.05,0),s,.05)),bt(c)}function bm(t,n,e,o,a){const s=n/2,c=[];for(const r of[-1,1]){const h=r*t/2;r>0?c.push(h,e,-s,h,e+o,0,h,e,s):c.push(h,e,-s,h,e,s,h,e+o,0)}const i=new ht;return i.setAttribute("position",new $(new Float32Array(c),3)),i.computeVertexNormals(),H(i,a,.08)}function L2(t,n,e,o=la){const s=n-4.4-.25,c=[Fs(t,3.8,4.4,o,2.2,Mr).translate(0,s,0)];for(let i=-t/2+2;i<=t/2-2;i+=3.2)for(const r of[-2.6,2.6])c.push(H(new rt(.26,.3,s-e+6,6).translate(i,(s+e-6)/2,r),xr,.15,i));return c.push(H(new F(t-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),bt(c)}function _2(t,n={pillar:ym,wall:wr,tile:la}){const e=[];for(const o of[-1,1])e.push(H(new F(2.4,7-t+6,2.4).translate(o*11.2,(7+t-6)/2,0),n.pillar,.2,o)),e.push(H(new F(3,.5,3).translate(o*11.2,7.2,0),[.85,.8,.7],.08,o));return e.push(H(new F(22.4,1.6,1.6).translate(0,-.2,0),xr,.12)),e.push(H(new F(20,3.6,1.1).translate(0,2.4,0),n.wall,.1)),e.push(H(new F(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(H(new F(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(Fs(27,2.2,4.4,n.tile,1.6).translate(0,5.3,0)),bt(e)}function R2(){const t=[jo(H(new F(.4,3.2,10).translate(0,0,0),ym,.22),-1.6,.6,.62),Fs(10.2,.45,.35,la).rotateY(Math.PI/2).translate(0,1.6,0)];for(let n=-5;n<=5;n+=2.5)t.push(jo(H(new F(.7,3.7,.7).translate(0,.25,n),[.5,.27,.2],.15,n),-1.6,.6,.6)),t.push(H(new F(.86,.26,.86).translate(0,2.2,n),[.9,.88,.82],.06,n));return bt(t)}const I2={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function wm(t=I2){const n=[H(new rt(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),t.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([o,a,s,c],i)=>{const r=new Rn(c,1).scale(1.15,.62,1.15).translate(o,a,s);r.deleteAttribute("uv"),r.computeVertexNormals();const h=r.getAttribute("position"),u=r.getAttribute("normal"),l=new Float32Array(h.count*3);for(let f=0;f<h.count;f++){const m=N(h.getX(f)*.9+i,h.getZ(f)*.9,h.getY(f)+31),d=u.getY(f)+(m-.5)*.7,g=d<-.05?t.under[0]:d<.12?t.under[1]:m<.6?t.flower[0]:t.flower[1],v=br(g),p=.75+.35*Math.min(1,Math.max(0,(h.getY(f)-4.5)/4));l.set([v[0]*p,v[1]*p,v[2]*p],f*3)}r.setAttribute("color",new $(l,3)),n.push(r)}),bt(n)}const G0=[.5,.53,.56],Mi=[.22,.23,.25],Ke=8,xm=Math.PI/Ke,Dn=-7.4,wo=t=>new Is(t.map(([n,e])=>new yn(n,e)),Ke,xm);function O0(t,n,e,o){const a=new _().subVectors(n,t),s=new F(e,e,a.length());return s.lookAt(a),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(s,o,.03,11)}function fs(t,n,e,o){const a=[];a.push(H(wo([[2.25,.95],[1.95,1.55],[1.1,1.9],[0,1.92]]).translate(0,Dn,0),t,.05,o)),a.push(H(wo([[2.25,-.85],[2.25,-.45]]).translate(0,Dn,0),t,.05,o+1)),a.push(H(wo([[0,-1.9],[1.3,-1.9],[2,-1.5],[2.25,-.85]]).translate(0,Dn,0),n,.06,o+2)),a.push(H(wo([[2.27,-.45],[2.27,.95],[1.97,1.5]]).translate(0,Dn,0),e,.03,o+3));for(let r=0;r<Ke;r++){const h=xm+r*Math.PI*2/Ke,u=2.3/Math.cos(Math.PI/Ke),l=new F(.2,1.45,.2).rotateY(h).translate(Math.sin(h)*u*.98,Dn+.25,Math.cos(h)*u*.98);a.push(H(l,Mi,.02,o+4))}a.push(H(wo([[2.29,-.62],[2.29,-.5]]).translate(0,Dn,0),n,.02,o+5)),a.push(H(new rt(.75,1.05,.5,Ke).translate(0,Dn+2.15,0),Mi,.03,o+6));const s=new _(0,Dn+2.35,0),c=new _(.95,-2.3,0),i=new _(0,-.15,0);return a.push(O0(s,c,.3,G0),O0(c,i,.3,G0)),a.push(H(new F(.62,.55,1.5).translate(0,.05,0),Mi,.03,o+7)),bt(a)}const zc=(()=>{let t=ct,n=0;for(let e=0;e<ct;e+=5)G.zone(e,!0)==="river"&&(t=Math.min(t,e),n=Math.max(n,e));return t<n?[t,n]:[0,0]})(),Mm=[300,480];function $s(t,n,e){if(t>Pt(n)-(G.cloudDepth??170)+30)return!1;const o=Z(n);return!(o>=zc[0]&&o<=zc[1]&&Math.abs(e)<Mm[0]+40)}const D0=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],P2=[.17,.31,.09],B2=[.38,.58,.17],H2=[.6,.77,.26],F2=[.36,.25,.16],U0=[.08,.17,.1],$2=[.3,.44,.21];function gs(t){const n=t.index?t.toNonIndexed():t;return n.deleteAttribute("uv"),n}function km(t,n,e,o){t.computeVertexNormals();const a=t.getAttribute("position"),s=t.getAttribute("normal"),c=new Float32Array(a.count*3),[i,r,h]=e.map(D0),u=D0(F2);for(let l=0;l+2<a.count;l+=3){const f=(a.getX(l)+a.getX(l+1)+a.getX(l+2))/3,m=(a.getY(l)+a.getY(l+1)+a.getY(l+2))/3,d=(a.getZ(l)+a.getZ(l+1)+a.getZ(l+2))/3,g=N(f*.9+n,d*.9+m*.5,71),v=s.getY(l)+(g-.5)*.5,p=m<o&&Math.hypot(f,d)<.8,k=p?u:v<-.25?i:v<.35?r:h,b=(.88+.24*g)*(p?.8+.2*Math.min(1,m/o):1);for(let w=l;w<l+3;w++)c.set([k[0]*b,k[1]*b,k[2]*b],w*3)}return t.setAttribute("color",new $(c,3)),t}const G2=[[0,7.3,0,3.5],[2.3,6.3,.9,2.4],[-2.1,6.5,-.7,2.5],[.4,9.5,-.3,2.2]];function Xo(t,n=0){const e=[gs(new rt(.28,.48,5.6,t?5:4,1,!0).translate(0,2.6,0).rotateZ(.05))];return G2.forEach(([o,a,s,c],i)=>e.push(gs(new Rn(c,i===0?t:0).scale(1,.86,1).translate(o,a,s)))),km(kt(e),n,[P2,B2,H2],4.2)}function O2(){const t=Xo(1,3).scale(1.12,1.12,1.12),n=Xo(1,7).scale(.72,.78,.72).rotateY(1.9).translate(3.9,0,2.4);return kt([t,n])}function K0(t){const n=[gs(new rt(.22,.4,3.6,t>5?5:4,1,!0).translate(0,1.6,0))];for(const[s,c,i]of[[2.6,5,2.3],[2.15,4.6,5.3],[1.65,4.2,8.1],[1.1,3.9,10.7]])n.push(gs(new se(s,c,t,1).translate(0,i+c/2,0)));const e=kt(n);km(e,5,[U0,U0,$2],2.4);const o=e.getAttribute("position"),a=e.getAttribute("color");for(let s=0;s<o.count;s++){const c=.75+.5*Math.min(1,Math.max(0,o.getY(s)/14.6));a.setXYZ(s,a.getX(s)*c,a.getY(s)*c,a.getZ(s)*c)}return e}function D2(t,n,e,o){const a=[];for(let s=0;s<o;s++){const c=s<Math.ceil(o/2),i=c?e-.6:-12.4+1.2*(N(s,t,42)-.5),r=t*2.3+s*2.39,h=c?n(i)*.7*N(s,t,43):n(i)*.92,u=c?.2+.06*N(s*1.3,t,44):.3+.1*N(s*1.3,t,44);a.push(Xo(0,s+t).scale(u,u,u).rotateY(r).translate(Math.cos(r)*h,i,Math.sin(r)*h))}return kt(a)}const U2=250,K2=.5,V2=1.4;function q2(){return[K0(7),Xo(1),K0(5),Xo(0)]}const tn={x:0,y:0,z:0};function W2(t,n){return Math.hypot(lt(t+3,n)-lt(t-3,n),lt(t,n+3)-lt(t,n-3))/6}function Y2(t,n){const e=[],o=Math.round(n*K2);for(let a=0;a<400&&e.length<o;a++){const s=(t+N(a*.71,t,141))*U2,c=N(t,a*.37,142)<.5?-1:1,i=Math.pow(N(a*.53,t*1.7,143),2.2)*(240+560*Qt(s)),r=Math.max(bn(s)*.7,17),h=r+4+i;D(s,c*h,0,tn);const u=N(tn.x/110,tn.z/110,146)<.32,l=3+Math.floor(N(t,a*2.9,144)*5),f=u?9:14;for(let m=0;m<l&&e.length<o;m++){const d=s+(N(m*1.9,a+t,145)-.5)*f*1.4,g=Math.max(r,h+(N(a+t,m*1.3,147)-.5)*f);if(D(d,c*g,0,tn),!Ae(tn.x,tn.z,d,g))continue;const v=lt(tn.x,tn.z),p=Y(d);if(g<24&&v>p-(Ps(d)>.5?12:22)||W2(tn.x,tn.z)>V2||v<p-200||$s(v,d,g))continue;const k=N(m*.83,a+t*1.3,148)<(u?.75:.1),b=k?.85+.55*N(m,t*3.1,149):.75+.6*N(m,t*3.1,149);e.push({p:new _(tn.x,v-.5,tn.z),s:b,r:N(m,a+t,150)*6.28,kind:k?0:1})}}return e}const Sm=`
// Màu như mặt tầng mây ĐẶC nhìn từ trên (cloud-sea.ts: ngả ánh trời × 0,62 khi uSolid): bản nắng 60% ra vành KEM sáng hơn hẳn
// mặt mây bên cạnh → đường tròn cứng ở khung rơi b-top (vòng 16).
#define DECK_HUG_COLOR mix(ATM_SKY_AMBIENT * 0.62, mix(ATM_SKY_AMBIENT * 0.55 + ATM_BOUNCE * 0.2, ATM_SUN_LIGHT * 1.2 + ATM_GLOW * 0.25, 0.35), 0.5)
// Độ "mây ôm sườn" tại w (0..1), đọc uDeck = (y tầng trên, độ phủ, y tầng dưới, độ phủ) — cloud-decks.ts đặt; map không tầng
// độ phủ 0 → trả 0. Vòng 7: mặt phẳng tầng cắt núi thành đường dao → dải ±28 m. Vòng 8: dải đều thành VẠCH SƠN quanh đường đồng
// mức → loang theo nhiễu ~60 m. Vòng 16 (agent mây xác minh): "vành TRÒN cứng" ở khung rơi b-top là vách lòng chảo (~1,1 km quanh
// đỉnh) nhô lên cắt mặt tầng trên — mặt nạ nhiễu tắt nửa dải nên chỗ cắt lộ nguyên đường dao. Giờ PHÍA TRÊN mặt tầng dải cao
// tới 60 m (mạnh giảm dần, vách chìm dần vào mây) và sát mặt tầng (≤ 4–10 m) luôn bật, không qua mặt nạ nhiễu.
float deckHug(vec3 w) {
  float dU = w.y - uDeck.x;
  float dL = w.y - uDeck.z;
  // Vòng 18 (cả hai giám khảo, khe cáp treo C nhìn dọc thung): dải rộng ĐỀU (luôn bật ±4–10 m + mép trên cố định 60 m) chạy quanh
  // mọi sườn ở cùng độ cao = "vệt mây trắng thẳng cắt ngang", con đường vẽ quanh núi. Giờ: mép dải lên xuống theo nhiễu lớn ~160 m
  // (trên mặt tầng 8 → 80 m, dưới 4 → 28 m), nhiều chỗ gần như KHÔNG có dải; LƯỠI mây leo cao thêm 50 m theo nhiễu xz 40 m (trên
  // vách dựng xz đứng yên theo chiều cao → lưỡi dọc như mây trườn lên khe); chỉ ±1–3 m sát mặt phẳng luôn bật — đủ che đường dao
  // chỗ mặt tầng cắt đất (b-top, vòng 16).
  float big = gnNoise(w.xz / 160.0 + 3.3);
  float tongue = smoothstep(0.6, 0.82, gnNoise(w.xz / 40.0 + 7.1));
  float present = max(smoothstep(0.32, 0.62, big), tongue);
  float upH = mix(8.0, 80.0, smoothstep(0.35, 0.8, big)) + 50.0 * tongue;
  float dnH = mix(4.0, 28.0, present);
  float bU = 1.0 - smoothstep(2.0, dU > 0.0 ? upH : dnH, abs(dU));
  float bL = 1.0 - smoothstep(2.0, dL > 0.0 ? upH : dnH, abs(dL));
  float hug = max(uDeck.y * bU * bU, uDeck.w * bL * bL) * present;
  // Bỏ dải "luôn bật" ±1–3 m (vòng 18 lượt 2, agent mây chia đôi cảnh tìm ra): từ khi mặt tầng tự SỜN dần trước chân vách
  // (cloud-deck-glsl.ts, deckWallErode) không còn đường dao nào để che — dải đó lộ ra thành VẠCH TRẮNG THẲNG dọc vách khe cáp.
  return hug * smoothstep(0.35, 0.7, gnFbm(w.xz / 60.0 + w.y / 45.0));
}
`,no={uPilot:{value:new as(0,0,0,1)},uHazTime:{value:0}},Gs=`
uniform vec4 uPilot;
uniform float uHazTime;
// 0..1: sáng dần 100 → 45 m, tắt dưới ~15 m, nhịp nhẹ 0,8↔1. Dùng chung cho viền trong vật liệu và viền ngoài
// (hazard-outline-hull.ts). Anh Đức 02/11 (ảnh cột đá đêm): "giảm bớt vùng sáng cảnh báo va chạm, làm game hơi dễ quá
// và art nhìn giả" — bản 01/11 báo từ 140 m (~2,3 s) + nhịp 0,35↔1: vật va chạm nhấp nháy như đồ chơi, chỉ cần nhìn
// viền là né, không cần đọc hình. Giờ ~0,8–1,6 s và gần như đứng yên: vẫn phân biệt được cứng / cảnh khi nhìn kỹ.
// Khoảng cách TRƯỚC MẶT theo hướng bay, không theo z thế giới (từ 02/11 đường quay 90° / 180°): trong 100 m cua cùi chỏ
// R 170 m chỉ lệch ~6 m so với quãng. Vật ở nhánh kia của cùi chỏ (cách ngang 340 m) bị loại bằng độ lệch ngang.
float hazardAmount(vec3 world) {
  vec2 d = world.xz - uPilot.xy;
  float dz = dot(d, uPilot.zw);
  float side = abs(d.x * uPilot.w - d.y * uPilot.z);
  float a = (1.0 - smoothstep(45.0, 100.0, dz)) * smoothstep(6.0, 20.0, dz) * (1.0 - smoothstep(50.0, 80.0, side));  // edge0 > edge1 là không xác định (GLSL ES 3)
  return a * (0.8 + 0.2 * (0.5 + 0.5 * sin(uHazTime * 7.0)));
}
vec3 hazardRim(vec3 world, float fres) {
  // Chỉ viền fresnel MẢNH sát bóng vật (fres² ; bỏ lớp phủ toàn mặt 0,05, 1,1 → 0,35): bản 01/11 cột đá đêm cách 20–45 m
  // thành khối viền hồng phát sáng dày (ảnh anh Đức 02/11; thử fres × 0,45 vẫn còn quầng hồng — haz-night-45).
  return vec3(1.0, 0.16, 0.1) * hazardAmount(world) * fres * fres * 0.35;
}
`;function j2(t,n,e,o){no.uPilot.value.set(t,n,Math.sin(e),Math.cos(e)),no.uHazTime.value=o}const X2=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`,Z2=`#include <project_vertex>
  #ifdef USE_INSTANCING
  vTreeBase = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #else
  vTreeBase = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #endif`,Q2=`#ifdef USE_FOG
  if (uDeck.y + uDeck.w > 0.0) {
    float sunkU = uDeck.y * step(uDeck.x + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.x));
    float sunkL = uDeck.w * step(uDeck.z + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.z));
    float sunk = max(min(1.0, 1.25 * deckHug(vFogWorld)), max(sunkU, sunkL));
    outgoingLight = mix(outgoingLight, DECK_HUG_COLOR, sunk);
  }
  #endif
  #include <opaque_fragment>`;function Os(t){const n=new ie({vertexColors:!0,side:t.doubleSide?St:eu});return n.onBeforeCompile=e=>{e.uniforms.uLift=t.lift,t.hazard&&Object.assign(e.uniforms,no),t.deckHug&&(e.uniforms.uDeck=hs);const o=t.deckHug?`uniform vec4 uDeck;
${ce}${Sm}`:"";e.fragmentShader=`uniform float uLift;
${t.hazard?Gs:""}${o}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${t.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${t.rim.toFixed(3)} * uLift;
    ${t.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${t.windows?X2:""}
  }
  #endif`),t.deckHug&&(e.vertexShader=`varying float vTreeBase;
${e.vertexShader}`.replace("#include <project_vertex>",Z2),e.fragmentShader=`varying float vTreeBase;
${e.fragmentShader}`.replace("#include <opaque_fragment>",Q2))},n.customProgramCacheKey=()=>`backlit-${t.selfLit}-${t.rim}-${t.doubleSide?2:1}-${t.hazard?"h":""}${t.windows?"w":""}${t.deckHug?"d":""}`,n}const J2=4,tv=.026,nv=7,ev=.035;function ov(t,n){const e=new Float32Array(n*16),o=new Float32Array(n*3),a=new Float32Array(n*4);t.instanceColor||(t.instanceColor=new ar(new Float32Array(n*3).fill(1),3)),t.instanceMatrix.setUsage(is),t.instanceColor.setUsage(is);const s=t.geometry;s.boundingSphere||s.computeBoundingSphere();const c=s.boundingSphere,i=new _,r=new su;let h=0;return{clear:()=>{h=0},add(u,l){h>=n||(u.toArray(e,h*16),l.toArray(o,h*3),i.copy(c.center).applyMatrix4(u),i.toArray(a,h*4),a[h*4+3]=c.radius*u.getMaxScaleOnAxis(),h++)},flush(u,l){const f=t.instanceMatrix.array,m=t.instanceColor.array;let d=0;for(let g=0;g<h;g++)r.center.fromArray(a,g*4),r.radius=a[g*4+3]+nv+ev*r.center.distanceTo(l),u.intersectsSphere(r)&&(f.set(e.subarray(g*16,g*16+16),d*16),m.set(o.subarray(g*3,g*3+3),d*3),d++);if(t.count=d,d!==0)for(const g of[t.instanceMatrix,t.instanceColor])g.clearUpdateRanges(),g.addUpdateRange(0,d*g.itemSize),g.needsUpdate=!0}}}function av(t,n){const e=t.elements,o=n.elements;return Math.abs(e[0]/o[0]-1)<.015&&Math.abs(e[5]/o[5]-1)<.015&&Math.abs(e[8]-o[8])<.01&&Math.abs(e[9]-o[9])<.01}function sv(){const t=new iu,n=new Lt,e=new _,o=new _(Number.NaN,0,0),a=new xt,s=new xt,c=new Lt;return{frustum:t,eye:e,due(i,r){i.updateMatrixWorld(),i.getWorldPosition(e),i.getWorldQuaternion(a);const h=!(e.distanceTo(o)<=J2);return!r&&!h&&a.angleTo(s)<=tv&&av(i.projectionMatrix,c)?!1:(o.copy(e),s.copy(a),c.copy(i.projectionMatrix),t.setFromProjectionMatrix(n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse)),!0)}}}function xe(t,n,e,o,a){const s=t.getAttribute("position"),c=new Float32Array(s.count*3);for(let i=0;i<s.count;i++){const r=Math.min(1,Math.max(0,(s.getY(i)-o)/(a-o))),h=.85+.3*N(s.getX(i)*.7,s.getZ(i)*.7+s.getY(i),5);for(let u=0;u<3;u++)c[i*3+u]=Math.pow(n[u]+(e[u]-n[u])*r*r,2.2)*h}return t.setAttribute("color",new $(c,3)),t}function kr(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a),r=(N(s*1.3+e,i*1.3,9)-.5)*n;o.setXYZ(a,s*(1+r),c+r*.6,i*(1+r))}return t.computeVertexNormals(),t}function Tm(){const t=[new rt(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([o,a,s],c)=>t.push(kr(new se(o,a,7,1).toNonIndexed().translate(0,s+a/2,0),.25,c)));const e=kt(t.map(o=>o.index?o.toNonIndexed():o));return e.computeVertexNormals(),xe(e,[.05,.12,.07],[.42,.52,.2],1,14)}function Am(){const t=[new rt(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([o,a,s,c,i],r)=>t.push(kr(new Rn(c,i).translate(o,a,s),.35,r*3)));const e=kt(t);return e.computeVertexNormals(),xe(e,[.07,.13,.05],[.62,.6,.18],3,13)}function iv(){const t=[new rt(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,o,a]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])t.push(new se(e,o,5,1).toNonIndexed().translate(0,a+o/2,0));const n=kt(t);return n.computeVertexNormals(),xe(n,[.05,.12,.07],[.42,.52,.2],1,14)}function cv(){const t=[new rt(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,o,a,s,c]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])t.push(kr(new Rn(s,0).translate(e,o,a),.35,c*3));const n=kt(t);return n.computeVertexNormals(),xe(n,[.07,.13,.05],[.62,.6,.18],3,13)}function rv(){const t=[];for(const[o,a]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])t.push(new F(.4,3,.4).translate(o,1.5,a).toNonIndexed());t.push(xe(new F(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const n=new se(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();t.push(xe(n,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const o of t)o.getAttribute("color")||xe(o,[.22,.15,.09],[.3,.2,.12],0,3);const e=kt(t);return e.computeVertexNormals(),e}function lv(){const t=[];for(const n of[-2.4,0,2.4])t.push(new F(1.1,1,.1).translate(n,4.8,2.85).toNonIndexed()),t.push(new F(1.1,1,.1).translate(n,4.8,-2.85).toNonIndexed());return kt(t)}const Cc=250,hv=40,xo=1,Nm=650,nn={x:0,y:0,z:0},ki={lat:0,y:0,amount:0};function V0(t,n){return Math.hypot(lt(t+3,n)-lt(t-3,n),lt(t,n+3)-lt(t,n-3))/6}function uv(t,n){const e=[],o=[],a=ro()>.5,s=a?Math.round(n*.6):n,c=a?1.1:3.2,i=ee()>.5;i&&e.push(...Y2(t,n));for(let r=0;!i&&r<Nm*2.2&&e.length<s;r++){const h=(t+N(r*.71,t,41))*Cc,u=N(t,r*.37,42)<.5?-1:1,l=bn(h),f=Math.pow(N(r*.53,t*1.7,43),2.6)*(240+560*Qt(h)),m=Math.max(l*.7,17)+f;D(h,u*m,0,nn);const d=nn.x,g=nn.z;if(!Ae(d,g,h,m))continue;const v=lt(d,g),p=Y(h);if(m<24&&v>p-(Ps(h)>.5?12:22)||V0(d,g)>c||v<p-200||a&&u>0&&im(h,ki)&&m>ki.lat-5&&m<ki.lat+ve+6)continue;const k=.7+.9*N(r,t*3.1,44);e.push({p:new _(d,v-.5,g),s:k,r:N(r,t,45)*6.28,kind:N(d/90,g/90,46)<.55?0:1})}for(let r=0;r<40&&o.length<7;r++){const h=(t+N(r*1.31,t,51))*Cc,u=N(t,r*.91,52)<.5?-1:1,l=Math.max(bn(h)*.7,30)+N(r,t*2.3,53)*220;if(D(h,u*l,0,nn),!Ae(nn.x,nn.z,h,l))continue;const f=lt(nn.x,nn.z);V0(nn.x,nn.z)>.45||f>Y(h)-18||i&&$s(f,h,l)||o.push({p:new _(nn.x,f,nn.z),s:1,r:At(h)-u*(Math.PI/2)+(N(r,t,54)-.5),kind:0})}return{trees:e,houses:o}}const Sr={value:1},mv=Os({lift:Sr,selfLit:.2,rim:.85,deckHug:!0}),lo=Os({lift:Sr,selfLit:.2,rim:.85});function Re(t,n,e=!1){const o=e?new qt({color:"#ffb35a"}):mv,a=new vt(t,o,n);return a.count=0,a.frustumCulled=!1,a}function dv(t){const n=t.ahead,e=Math.round(Nm*t.density),o=e*(xo+n+1),a=new yt,[s,c,i,r]=ee()>.5?q2():[Tm(),Am(),iv(),cv()],h=Re(s,o),u=Re(c,o),l=Re(i,o),f=Re(r,o),m=Re(rv(),8*(xo+n+1)),d=Re(lv(),8*(xo+n+1),!0);a.add(h,u,l,f,m,d);const g=[h,u,l,f].map(T=>ov(T,o)),v=sv();let p=!0;const k=new Map;let b=Number.NaN;const w=new Lt,y=new xt,x=new _(0,1,0),M=new _,z=new it,C=new it,E=()=>{g.forEach(A=>A.clear());let T=0;for(let A=b;A<=b+xo+n;A++){let S=k.get(A);S||k.set(A,S=uv(A,e));const L=A-b>t.near-1?2:0;for(const I of S.trees){y.setFromAxisAngle(x,I.r),w.compose(I.p,y,M.set(I.s,I.s*(.9+.25*Math.sin(I.r*3)),I.s));const B=ro(),U=ee();z.setHSL(.22-.05*B+.04*U+.06*Math.sin(I.r*5),.25-.08*U,.5-.07*B+.12*Math.cos(I.r*7)),g[L+I.kind].add(w,z.multiplyScalar(2))}for(const I of S.houses)y.setFromAxisAngle(x,I.r),w.compose(I.p,y,M.set(1,1,1)),m.setMatrixAt(T,w),d.setMatrixAt(T++,w)}for(const A of[...k.keys()])(A<b-1||A>b+xo+n+1)&&k.delete(A);m.count=T,d.count=T;for(const A of[m,d])A.instanceMatrix.needsUpdate=!0;p=!0};return{group:a,update(T,A,S){const L=Math.floor((T-hv)/Cc);if(L!==b&&(b=L,E()),v.due(S,p)){for(const I of g)I.flush(v.frustum,v.eye);p=!1}Sr.value=1-.55*Math.min(1,Math.max(0,(A-.4)/.5)),d.material.color.copy(C.set("#ffb35a").multiplyScalar(.25+3.2*A*A))}}}const Ds=G.cableLine,ps=Ds?.from??0,Tr=Ds?.to??0,q0=Ds?.clear??0,Ec=[.5,.53,.56],zm=[.86,.84,.78],Cm=[1,.74,.36],vs=[.74,.14,.1],Em=[.42,.52,.6];function fv(t,n,e){let o=1/0;for(let a=n;a<=n+(Tr-ps);a+=8)D(a,0,0,e),o=Math.min(o,Math.hypot(t.x-e.x,t.z-e.z));return o}function qe(t,n,e,o,a){const s=new _().subVectors(n,t),c=new F(e,e,s.length());return c.lookAt(s),c.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(c,o,.04,a)}function Lm(t,n){const e=[],o=(s,c,i)=>{const r=(t.y+2-i)/192;return new _(t.x+s*(1.4+7.4*r),i,t.z+c*(1.4+7.4*r))},a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=t.y+2,c=0;s>t.y-n;s-=18,c++){const i=Math.max(t.y-n,s-18),r=c<3?c%2?[.92,.9,.86]:[.78,.12,.08]:Ec;a.forEach(([h,u],l)=>{const[f,m]=a[(l+1)%4];e.push(qe(o(h,u,s),o(h,u,i),.7,r,5)),e.push(qe(o(h,u,s),o(f,m,i),.25,Ec,5))})}return e}function gv(t){const n=t*ct+ps-_t,e=t*ct+Tr-_t,o=new _,a=D(n,0,0,new _);a.y=Y(n)+q0;const s=D(e,0,0,new _);s.y=Y(e)+q0;const c=[],i=new _().subVectors(s,a).cross(new _(0,1,0)).normalize();for(const m of[-1.6,0,1.6])c.push(qe(a.clone().addScaledVector(i,m),s.clone().addScaledVector(i,m),.22,[.2,.2,.22],3));const r=a.distanceTo(s),h=new _;for(let m=.08;m<1;m+=130/r)h.lerpVectors(a,s,m),!(fv(h,n,o)<30)&&(c.push(...Lm(h,190)),c.push(H(new F(9,1.6,4).translate(h.x,h.y+2.4,h.z),Ec,.05,6)));const u=Math.atan2(s.x-a.x,s.z-a.z),l=fs(vs,[.3,.08,.07],Em,8).rotateY(u),f=fs(zm,vs,Cm,9).rotateY(u);for(let m=.05,d=0;m<1;m+=70/r,d++)h.lerpVectors(a,s,m),c.push((d%2?f:l).clone().translate(h.x,h.y,h.z));return l.dispose(),f.dispose(),bt(c)}function pv(){const t=!!Ds,n=new yt,e=new Map;return{group:n,update(o){if(!t)return;const a=wn(o);for(const s of[a,a+1]){const c=s*ct+ps-_t;if(e.has(s)||c>o+2400||c+(Tr-ps)<o-200)continue;const i=new j(gv(s),lo);i.matrixAutoUpdate=!1,n.add(i),e.set(s,i)}for(const[s,c]of e)s>=a-1&&s<=a+1||(n.remove(c),c.geometry.dispose(),e.delete(s))}}}const vv=new Mt({uniforms:{...no},vertexShader:`
attribute vec3 aOutline;
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec4 mv = viewMatrix * world;
  // 0,3% chiều cao khung: dy_view = 2·f·(−z) / P[1][1] (P[1][1] đã gồm dời ống kính màn dọc). Kẹp 0,8 m cho chỗ sát.
  // 0,8% thì màn dọc đoạn cột đá thành rừng nét trắng dày lấn cả hình (ảnh f9m vòng 9); 0,6% vẫn là quầng trắng dày
  // quanh cột đá đêm — "art nhìn giả" (anh Đức 02/11).
  float t = min(0.8, 0.006 * -mv.z / projectionMatrix[1][1]);
  world.xyz += normalize(mat3(modelMatrix) * aOutline) * t;
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,fragmentShader:`
${Gs}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:sr,transparent:!0,depthWrite:!1}),W0=(t,n,e)=>`${Math.round(t*50)},${Math.round(n*50)},${Math.round(e*50)}`;function yv(t){if(t.getAttribute("aOutline"))return t;const n=t.getAttribute("position"),e=t.getAttribute("normal"),o=new Map;for(let s=0;s<n.count;s++){const c=W0(n.getX(s),n.getY(s),n.getZ(s)),i=o.get(c)??[0,0,0];i[0]+=e.getX(s),i[1]+=e.getY(s),i[2]+=e.getZ(s),o.set(c,i)}const a=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const c=o.get(W0(n.getX(s),n.getY(s),n.getZ(s))),i=Math.hypot(c[0],c[1],c[2]);a.set(i>1e-6?[c[0]/i,c[1]/i,c[2]/i]:[0,1,0],s*3)}return t.setAttribute("aOutline",new $(a,3)),t}function pn(t){const n=new j(yv(t),vv);return n.userData.hazardHull=!0,n}function bv(t,n){t&&(t.visible=n>5&&n<105)}function wv(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new oa(t)}const _m=new En(1,1).rotateX(-Math.PI/2),Rm=new qt({map:wv(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function xv(t){const n=new vt(_m,Rm,t);return n.count=0,n.frustumCulled=!1,n.renderOrder=1,n}function Ar(t,n,e){const o=new j(_m,Rm);return o.scale.set(t,1,n),o.position.y=e,o.renderOrder=1,o.updateMatrix(),o}const Nr=[.86,.66,.36],Im=[.78,.58,.32],Us=[.36,.34,.35],Pm=[.3,.29,.3],Si=[.58,.56,.53],Mv={pillar:[.52,.5,.48],wall:Nr,tile:Us},kv={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},Sv=()=>wm(kv);function Tv(){const t=[jo(H(new F(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let n=0;n<2;n++)for(let e=0;e<12;e++){const o=N(e*.73,n*1.9,61),a=-4.6+(e+.5*n)*.76,s=new F(.95,.4+.22*o,.62+.3*o).rotateX((o-.5)*.35).rotateY((o-.5)*.4),c=.78+.34*N(e,n,62);t.push(H(s.translate(0,.25+n*.46,a),[Si[0]*c,Si[1]*c,Si[2]*c],.12,e+n*13))}return bt(t)}const Av=[.3,.22,.19],Ti=[.92,.9,.84],Nv=[.8,.82,.85];function Bm(t,n){const e=[],o=new F(t.len,t.wallH+t.sink,t.width).translate(0,(t.wallH-t.sink)/2,0);e.push(jo(H(o,t.wall,.14,n),0,2.5,.72)),e.push(H(new F(t.len+.08,.7,t.width+.08).translate(0,.25,0),[.5,.44,.36],.1,n)),e.push(H(new F(t.len+.06,.45,t.width+.06).translate(0,t.wallH-.2,0),Av,.08,n)),e.push(bm(t.len,t.width,t.wallH,t.rise,t.wall)),e.push(Fs(t.len+.6,t.width/2+.35,t.rise+.25,t.tile,0,t.crest?Mr:void 0).translate(0,t.wallH-.2,0));const a=-t.width/2-.04;e.push(H(new F(1.3,2.3,.08).translate(0,1.15,a+.01),Ti,.06,n)),e.push(H(new F(1,2,.1).translate(0,1,a-.02),xr,.1,n)),e.push(H(new F(1.8,.25,.34).translate(0,.12,a-.17),[.62,.58,.52],.08,n));for(let s=0;s<t.floors;s++){const c=1.5+s*3.1;for(const i of s===0?[-t.len/2+.85,t.len/2-.85]:[-.9,.9])e.push(H(new F(.8,1,.1).translate(i,c,a),E2,.12,n+i));if(s>0&&t.balcony){const i=t.len*.78;e.push(H(new F(i,.18,.4).translate(0,c-1.05,a-.2),[.7,.66,.6],.08,n)),e.push(H(new F(i,.08,.08).translate(0,c-.15,a-.32),Ti,.05,n));for(let r=0;r<=6;r++)e.push(H(new F(.06,.82,.06).translate(-i/2+i*r/6,c-.55,a-.32),Ti,.05,n))}}if(t.tank){const s=t.wallH+t.rise+.1;e.push(H(new rt(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(t.len*.22,s+.45,0),Nv,.12,n)),e.push(H(new F(.9,.2,.7).translate(t.len*.22,s,0),[.4,.38,.36],.08,n))}return bt(e)}function Hm(t,n,e=!1){const a=e?t%2?Im:Nr:t%2?vm:wr,s=e?t%3===2?Pm:Us:t%3===2?pm:la;return Bm({len:4.4,width:5.2,wallH:n-3.2-.3,rise:3.2,wall:a,tile:s,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},t*7.1)}function wa(t,n=!1){const e=n?t?Im:Nr:t?vm:wr,o=n?t?Pm:Us:t?pm:la;return Bm({len:8-t,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:o,floors:1,sink:2.5,tank:!n,crest:!1,balcony:!n},3+t)}const eo=[.76,.6,.33],Fm=[.62,.49,.3],$m=[.5,.4,.31],An=[.56,.38,.23],jn=[.3,.2,.13],zv=[.6,.55,.46],Zo=[.68,.64,.36],Gm=[.86,.7,.36],Cv=[.06,.16,.12],Ev=[.2,.13,.08],Om=[[.88,.14,.1],[.98,.74,.12],[.18,.6,.3],[.2,.36,.78],[.88,.24,.55],[.95,.9,.8]];function Ne(t,n){const e=t.getAttribute("position"),o=t.getAttribute("color"),a=t.getAttribute("normal");for(let s=0;s+2<e.count;s+=3){const c=(e.getX(s)+e.getX(s+1)+e.getX(s+2))/3,i=(e.getY(s)+e.getY(s+1)+e.getY(s+2))/3,r=(e.getZ(s)+e.getZ(s+1)+e.getZ(s+2))/3,h=n(c,i,r,(a.getY(s)+a.getY(s+1)+a.getY(s+2))/3);for(let u=s;u<s+3;u++)o.setXYZ(u,o.getX(u)*h,o.getY(u)*h,o.getZ(u)*h)}return t}const Lv=t=>t.rise+.9*t.thick+.32;function Dm(t,n){const e=Math.hypot(t.half,t.rise),o=Math.atan2(t.rise,t.half),a=Math.max(3,Math.round(t.len/(t.shingle?1:1.25))),s=Math.max(3,Math.round(e/(t.shingle?.6:.78))),c=new F(t.len,t.thick,e,a,1,s),i=c.getAttribute("position");for(let l=0;l<i.count;l++){if(i.getZ(l)<e/2-.01)continue;const f=N(i.getX(l)*1.7+n,3.1,77);i.setZ(l,i.getZ(l)+(t.shingle?.08:.42)*(f-.45)),i.setY(l,i.getY(l)-(t.shingle?0:.18*f))}c.rotateX(o).translate(0,t.rise/2+Math.cos(o)*t.thick/2,t.half/2+Math.sin(o)*t.thick/2);const r=Ne(H(c,t.color,.12,n),(l,f,m,d)=>{const g=m/t.half,v=Math.min(.999,Math.max(0,g)),p=Math.floor(v*s),k=t.shingle?((Math.floor(l/.55)+p)%2?1:.84)*(p%2?1:.92):p%2?1:.88,b=g>.985&&d<.3?.68:d<-.3?.5:d<.3?.72:1;return k*b*(t.shingle?.9+.2*N(l*.6+n,p,78):.94+.12*N(l*.12+n,p*.3,78))}),h=t.cap??[t.color[0]*.78,t.color[1]*.74,t.color[2]*.7],u=H(new F(t.len+.2,.42,.42).rotateX(Math.PI/4).translate(0,t.rise+.9*t.thick,0),h,.08,n);return bt([r,r.clone().rotateY(Math.PI),u])}function Um(){const t=new rt(.75,1.75,2.5,9,2),n=t.getAttribute("position");for(let o=0;o<n.count;o++){const a=n.getY(o),s=(Math.abs(a)<.01?1.12:1)*(.92+.16*N(n.getX(o)*2,n.getZ(o)*2,79));n.setXYZ(o,n.getX(o)*s,a,n.getZ(o)*s)}const e=Ne(H(t.translate(0,1.15,0),Gm,.18,2),(o,a)=>a<.5?.72:Math.floor(a/.55)%2?1:.88);return bt([e,H(new se(.85,1,9,1).translate(0,2.85,0),Fm,.12,3),H(new rt(.06,.08,1.4,4,1,!0).translate(0,3.4,0),jn,.1,4)])}function _v(){const t=[];for(let n=0;n<=4;n++){const e=-5+n*2.5,o=N(n*1.3,2.2,80);t.push(H(new F(.17,1.8,.17).rotateX((o-.5)*.16).rotateZ((o-.5)*.12).translate(0,.45,e),jn,.2,n))}for(const n of[.62,1.12])t.push(H(new F(.08,.12,10.3).rotateX(.01*n).translate(.1,n,0),[.5,.41,.31],.22,n));return bt(t)}function Rv(t,n,e,o){const s=(i,r)=>{const h=i/8,u=o/2*(1-.25*h);return[.18*Math.sin(i*1.3),t-e*h,n-.35*Math.sin(h*3.2)+r*u]},c=[];for(let i=0;i<8;i+=2){const r=[];for(let u=i;u<i+2;u++){const[l,f,m,d]=[s(u,-1),s(u,1),s(u+1,-1),s(u+1,1)];if(u<7)r.push(...l,...f,...m,...m,...f,...d);else{const g=[(m[0]+d[0])/2,l[1]-.4*(l[1]-m[1]),(l[2]+f[2])/2];r.push(...l,...g,...m,...f,...d,...g,...l,...f,...g)}}const h=new ht;h.setAttribute("position",new cu(r,3)),c.push(H(h,Om[[0,1,2,4][i/2]],.12,i))}return c}function Iv(){const n=10.5+3*Math.cos(-.5),e=3*Math.sin(-.5);return bt([H(new rt(.08,.13,10.5,5,1).translate(0,5.25,0),Zo,.15,5),H(new rt(.05,.08,3,5,1).rotateX(-.5).translate(0,10.5+1.5*Math.cos(-.5),1.5*Math.sin(-.5)),Zo,.15,7),H(new se(.9,2.4,6,1).rotateX(Math.PI+-.5*1.6).translate(0,n+.2,e-.6),[.46,.56,.2],.25,6),H(new F(.05,.05,1).translate(0,n-.15,e),jn,.1,8),...Rv(n-.15,e,6.2,.95)])}const Pv=4,Km=12;function Bv(t,n,e,o,a,s){const c=o-e,i=[],r=[[t,Math.PI,0,-n/2],[t,0,0,n/2],[n,-Math.PI/2,-t/2,0],[n,Math.PI/2,t/2,0]];for(const[h,u,l,f]of r){const m=Math.max(2,Math.round(h/.36)),d=Ne(H(new En(h,c,m,1),a,.16,s+l+f),g=>{const v=Math.floor((g+h/2)/h*m);return(v%2?1:.86)*(.9+.2*N(v*1.7,s+u,81))});i.push(d.rotateY(u).translate(l,e+c/2,f))}return i}function Hv(t,n,e,o,a,s,c){const i=Math.hypot(o-n,a-e);return H(new F(s,i,s).rotateX(Math.atan2(a-e,o-n)).translate(t,(n+o)/2,(e+a)/2),c,.1,t)}function Xn(t,n){const e=[],o=t.roof,a={...o,len:t.len+1.3,...t.crest?{cap:Mr}:{}},s=t.top-Lv(a),c=s+o.rise*(1-t.width/2/o.half),i=-t.width/2;if(t.base==="plinth"){const f=Math.max(1,Math.round(t.floor/.5)),m=H(new F(t.len+.9,t.floor,t.width+.9,1,f,1).translate(0,t.floor/2,0),zv,.3,n);e.push(Ne(m,(d,g)=>(Math.floor(g/.5)%2?1:.84)*(.86+.28*N(d*.8+Math.floor(g/.5)*3.3,n,82)))),e.push(H(new F(t.len+.9,t.sink,t.width+.9).translate(0,-t.sink/2,0),[.42,.38,.32],.1,n))}else{const f=t.len>5.5?[-t.len/2+.25,0,t.len/2-.25]:[-t.len/2+.25,t.len/2-.25];for(const d of f)for(const g of[i+.25,-i-.25])e.push(H(new F(.26,t.floor+t.sink,.26).translate(d,(t.floor-t.sink)/2,g),jn,.15,d+g)),t.guards&&e.push(H(new rt(.52,.52,.08,6).translate(d,t.floor-.6,g),An,.1,d-g));e.push(H(new F(t.len+.4,.24,t.width+.4).translate(0,t.floor-.12,0),jn,.1,n));const m=Math.min(t.floor,Pv)-.15;t.skirt&&e.push(H(new F(t.len-.2,m,t.width-.2).translate(0,t.floor-.25-m/2,0),Zo,.25,n))}e.push(...Bv(t.len,t.width,t.floor,c,t.wall,n)),e.push(H(new F(t.len+.12,.3,t.width+.12).translate(0,t.floor+.15,0),jn,.1,n)),e.push(bm(t.len,t.width,c,s+o.rise-c,t.wall)),e.push(Dm(a,n).translate(0,s,0));const r=Math.min(1.9,c-t.floor-.4);e.push(H(new F(.95,r,.1).translate(0,t.floor+r/2,i-.04),Ev,.08,n));const h=t.floor+Math.min(1.5,(c-t.floor)*.55),u=t.windows<=2?[-.3,.3].slice(0,t.windows):Array.from({length:t.windows},(f,m)=>(m+.5)/t.windows-.5);for(const f of u)Math.abs(f*t.len)>.85&&e.push(H(new F(.7,.55,.1).translate(f*t.len,h,i-.04),Cv,.06,n+f));let l=i;if(t.porch){l=i-.9,e.push(H(new F(t.len,.18,.9).translate(0,t.floor-.09,i-.45),jn,.1,n)),e.push(H(new F(t.len,.08,.08).translate(0,t.floor+.9,l+.05),An,.08,n));const f=Math.max(3,Math.round(t.len/.8));for(let m=0;m<=f;m++)e.push(H(new F(.07,.9,.07).translate(-t.len/2+t.len*m/f,t.floor+.45,l+.05),An,.08,m))}if(t.ladder){for(const f of[-.38,.38])e.push(Hv(f,0,l-1.4,t.floor,l,.09,An));for(let f=1;f<=4;f++)e.push(H(new F(.85,.07,.07).translate(0,t.floor*f/5,l-1.4+1.4*f/5),An,.08,f))}if(t.firewood){const f=t.base==="plinth"?t.floor:0,m=t.base==="plinth"?i-.26:0,d=t.len*.32,g=H(new F(d,.95,.5,4,3,1).translate(t.len/2-d/2-.05,f+.475,m),[.74,.58,.38],.15,n);e.push(Ne(g,(v,p)=>(Math.floor(v/.24)+Math.floor(p/.32))%2?1:.72))}return bt(e)}function Fv(t,n){const e=n-.02,o=Math.max(0,n-Km),a=o>2,s=[.5,.34,.21];return t===0?Xn({len:5.2,width:4.2,base:"stilts",floor:3.5+o,top:e,roof:{half:3.2,rise:4.2,thick:.5,color:eo},wall:An,crest:!0,sink:6,windows:1,skirt:!0,porch:!0,ladder:!0},11):t===1?Xn({len:5.2,width:4.6,base:"stilts",floor:3.2+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:Fm},wall:s,crest:!0,sink:6,windows:0,skirt:!0,guards:!0,ladder:!0},12):t===2?Xn({len:5,width:4.8,base:a?"stilts":"plinth",floor:3+o,top:e,roof:{half:3.2,rise:4,thick:.3,color:$m,shingle:!0},wall:An,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},13):Xn({len:5,width:4.8,base:a?"stilts":"plinth",floor:2.6+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:eo},wall:s,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},14)}function Y0(t){return t===0?Xn({len:8,width:5.4,base:"plinth",floor:.9,top:7,roof:{half:3.5,rise:3,thick:.3,color:$m,shingle:!0},wall:An,crest:!1,sink:2.5,windows:3,firewood:!0},21):Xn({len:7.6,width:5,base:"stilts",floor:1.8,top:8.4,roof:{half:3.4,rise:3.4,thick:.5,color:eo},wall:[.5,.35,.22],crest:!1,sink:2.5,windows:2,porch:!0,ladder:!0,firewood:!0},22)}const $v=[[1.8,6.4],[-1.6,7.7]];function Gv(){return Xn({len:3,width:2.8,base:"stilts",floor:2.4,top:7.2,roof:{half:2.25,rise:2.6,thick:.42,color:eo},wall:An,crest:!1,sink:2,windows:0,ladder:!0},23)}const j0=5,Vm={value:0};function Ov(){const t=[];for(let n=0;n<j0;n++){const e=new Rn(.75,0);e.deleteAttribute("uv"),e.setAttribute("aPuff",new $(new Float32Array(e.getAttribute("position").count).fill(n/j0),1)),t.push(e)}return kt(t)}const Qo=new qt({color:14078150,transparent:!0,opacity:.5,depthWrite:!1});Qo.onBeforeCompile=t=>{t.uniforms.uSmokeTime=Vm,t.vertexShader=`attribute float aPuff;
uniform float uSmokeTime;
varying float vFade;
${t.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float seedP = 0.0;
  #ifdef USE_INSTANCING
  seedP = fract(instanceMatrix[3].x * 0.137 + instanceMatrix[3].z * 0.071);
  #endif
  // t: 0 = vừa lọt khỏi mái, 1 = tan hết sau ~9 m; ngọn khói ngả theo gió (t²) và uốn nhẹ.
  float t = fract(uSmokeTime * 0.11 + aPuff + seedP);
  transformed = transformed * (0.45 + 1.9 * t) + vec3(1.6 * t * t + 0.3 * sin(t * 9.0 + seedP * 6.28), 9.0 * t, 0.6 * t * t);
  vFade = smoothstep(0.0, 0.12, t) * pow(1.0 - t, 1.4);`),t.fragmentShader=`varying float vFade;
${t.fragmentShader}`.replace("#include <color_fragment>",`#include <color_fragment>
  diffuseColor.a *= vFade;`)};Qo.customProgramCacheKey=()=>"chimney-smoke";function Dv(t){Vm.value=performance.now()/1e3,Qo.opacity=.5-.28*t,Qo.color.setRGB(.66-.58*t,.62-.53*t,.56-.44*t)}const Ht=8,qm=Ht+6,xa=Ht+7,Wm=[40,8,8,12,8,22,10,14],Uv=[[13,13],[10,7.5],[9.5,7],[1.6,11],[4.5,4.5],[4,4],[0,0],[1.3,1.3]],mn=250;function Kv(t){return t?[O2(),Y0(0),Y0(1),_v(),Gv(),Um(),Ov(),Iv()]:Wm.map(()=>new ht)}const en=new _;function zr(t,n){return Math.hypot(lt(t+2.5,n)-lt(t-2.5,n),lt(t,n+2.5)-lt(t,n-2.5))/(2*2.5)}function Ie(t,n,e,o){D(t,n,0,en),en.y=lt(en.x,en.z);const a=Y(t);return!(Xt(t)>.3)||en.y>a-6||en.y<a-e||zr(en.x,en.z)>o||!Ae(en.x,en.z,t,Math.abs(n))||$s(en.y,t,n)?null:en.clone()}const X0=(t,n,e)=>At(t)+(n>0?Math.PI/2:-Math.PI/2)+(e-.5)*.6,Z0=20,$t=new _,Xa=(t,n)=>(D(t,n,0,$t),lt($t.x,$t.z));function Vv(t,n){for(let e=0;e<mn/Z0;e++){const o=n*mn+(e+.8*N(e*1.31,n,213))*Z0,a=G.zone(Z(o),!0);if(a!=="dive"&&a!=="valley"&&a!=="climb")continue;const s=Xa(o,22)>=Xa(o,-22)?1:-1,c=N(n*1.9,e*2.71,214);let i=c<.6?xa:c<.88?Ht:Ht+5;const r=G.hillside,h=(r?.wall?.(Z(o))??0)>.5?Math.max(0,(r.wallLip?.(Z(o))??0)-18):0,u=s*((i===Ht?22:15)+N(e*3.17,n,215)*8+h),l=Xa(o,u),f=Y(o);if(l<f-(i===Ht+5?10:14)||l>f+8||!Ae($t.x,$t.z,o,Math.abs(u)))continue;const m=zr($t.x,$t.z);if(m>(i===Ht?1:i===xa?2.5:.6)&&(i=xa),m>2.5)continue;const d=i===xa?At(o):N(e,n,216)*6.28;t.push({p:new _($t.x,l,$t.z),r:d,s:.85+.35*N(n,e,217),kind:i})}}function qv(t,n){for(let e=0;e<22;e++){const o=n*mn+N(e*1.13,n,218)*mn;if(G.zone(Z(o),!0)!=="river")continue;const s=(N(n*1.7,e*2.93,219)<.5?-1:1)*(4+Math.pow(N(e*3.41,n,220),1.3)*110),c=Xa(o,s);if(c>Y(o)-28||zr($t.x,$t.z)>.5||!Ae($t.x,$t.z,o,Math.abs(s))||$s(c,o,s))continue;const i=N(n*2.3,e*2.1,221),r=i<.6?Ht:i<.75?Ht+4:Ht+5;t.push({p:new _($t.x,c,$t.z),r:N(e,n,222)*6.28,s:.8+.4*N(n,e,223),kind:r})}}function Wv(t,n){const e=[];Vv(e,t),qv(e,t);const o=t*mn,a=G.zone(Z(o+mn/2),!0),s=a==="valley"||a==="climb";for(let i=0;i<Math.max(3,Math.round(n/6));i++){const r=o+N(i*.77,t,181)*mn,h=N(t,i*.41,182)<.5?-1:1,u=27+Math.pow(N(i*.53,t*1.3,183),1.6)*170;for(let l=0,f=3+Math.floor(N(t,i*2.7,184)*4);l<f;l++){const m=r+(N(l*1.9,i+t,185)-.5)*26,d=h*Math.max(21,u+(N(i+t,l*1.3,186)-.5)*24),g=Ie(m,d,30,.8);g&&e.push({p:g,r:N(l,i+t,187)*6.28,s:.75+.45*N(i,l+t,188),kind:Ht})}}const c=s?4:1;for(let i=0;i<c;i++){const r=o+(i+N(i,t,189))*(mn/c),h=N(t*1.3,i,190)<.5?-1:1,u=h*(19+Math.pow(N(i*.7,t,191),1.4)*130),l=Ie(r,u,40,.45);if(l){e.push({p:l,r:X0(r,u,N(i,t,192)),s:.9+.25*N(t,i,193),kind:Ht+4});for(let f=0;f<3;f++){const m=Ie(r+(N(f,i+t,194)-.5)*16,u+h*(4+N(i+t,f,195)*9),40,.45);m&&e.push({p:m,r:N(f,i,196)*6.28,s:.8+.4*N(i,f+t,197),kind:Ht+5})}}}for(let i=0;i<(s?6:3);i++){const r=o+N(i*1.37,t,198)*mn,h=(N(t,i*.83,199)<.5?-1:1)*(15+N(i*.61,t*1.7,200)*70),u=Ie(r,h,30,.4);u&&e.push({p:u,r:N(i,t,201)*6.28,s:.8+.45*N(t,i,202),kind:Ht+5})}for(let i=0;i<(s?1:2);i++){const r=o+(.25+.5*i)*mn+(N(t,i,203)-.5)*60,h=(N(t*1.7,i,204)<.5?-1:1)*((s?45:26)+N(t,i*3.1,205)*90);for(let u=0;u<(s?4:7);u++){const l=r+(N(u,t+i,206)-.5)*70,f=h+(N(u*1.9,t+i,207)-.5)*50,m=Math.abs(f)<30?null:Ie(l,f,14,.3);if(!m)continue;const d=(u+i)%2,g=X0(l,f,N(u,i,208));if(e.push({p:m,r:g,s:1,kind:Ht+1+d}),N(u*2.3,t+i,209)<.45){const[v,p]=$v[d];e.push({p:new _(m.x+Math.cos(g)*v,m.y+p,m.z-Math.sin(g)*v),r:0,s:1,kind:qm})}}}for(let i=0;i<(s?1:2);i++){const r=(i?1:-1)*(N(t,3.3,210)<.5?-1:1),h=o+N(t,i,211)*(mn-60);for(let u=0,l=(s?2:3)+Math.floor(N(t,i*2.3,212)*4);u<l;u++){const f=h+u*10.2,m=Ie(f,r*13.5,14,.5);m&&e.push({p:m,r:At(f),s:1,kind:Ht+3})}}return e}const me=250,Q0=1,Yv=6,Cr={value:1},jv=Os({lift:Cr,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),Ks=Os({lift:Cr,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Ai(t,n,e){return D(t,n,0,e),e.y=lt(e.x,e.z),e}function Xv(t,n){const e=[],o=t*me;if(Math.max(Xt(o),Xt(o+me/2),Xt(o+me))===0)return e;if(ee()>.5)return Wv(t,n);const a=new _,s=ro()>.5?4:0,c=(i,r)=>Xt(i)>.3&&r.y<Y(i)-6&&r.y>Y(i)-14;for(let i=0;i<n;i++){const r=o+N(i*.77,t,81)*me,u=(N(t,i*.41,82)<.5?-1:1)*(18+Math.pow(N(i*.53,t*1.3,83),1.8)*190);c(r,Ai(r,u,a))&&e.push({p:a.clone(),r:N(i,t,84)*6.28,s:.8+.5*N(t,i,85),kind:s})}for(let i=0;i<2;i++){const r=o+(.25+.5*i)*me+(N(t,i,86)-.5)*60,u=(N(t*1.7,i,87)<.5?-1:1)*(24+N(t,i*3.1,88)*90);for(let l=0;l<7;l++){const f=r+(N(l,t+i,89)-.5)*70,m=u+(N(l*1.9,t+i,90)-.5)*50;if(Math.abs(m)<17||!c(f,Ai(f,m,a)))continue;const d=At(f)+(m>0?Math.PI/2:-Math.PI/2)+(N(l,i,91)-.5)*.5;e.push({p:a.clone(),r:d,s:1,kind:s+1+l%2})}}for(let i=0;i<2;i++){const r=i?1:-1,h=o+N(t,i,92)*(me-60),u=3+Math.floor(N(t,i*2.3,93)*4);for(let l=0;l<u;l++){const f=h+l*10.2;c(f,Ai(f,r*13.5,a))&&e.push({p:a.clone(),r:At(f),s:1,kind:s+3})}}return e}function Zv(t){const n=Q0+Math.max(3,Math.round(Yv*t))+1,e=Math.round(34*Math.max(.5,t)),o=new yt,a=[wm(),wa(0),wa(1),R2(),Sv(),wa(0,!0),wa(1,!0),Tv(),...Kv(ee()>.5)],s=[34,7,7,12,34,7,7,12,...Wm].map(p=>p*n),c=a.map((p,k)=>{const b=new vt(p,k===qm?Qo:jv,s[k]);return b.count=0,b.frustumCulled=!1,b.visible=p.getAttribute("position")!==void 0,o.add(b),b}),i=xv(s.reduce((p,k)=>p+k,0));o.add(i);const r=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11],...Uv],h=new Map,u=new Lt,l=new xt,f=new _(0,1,0),m=new _,d=new _;let g=Number.NaN;const v=()=>{const p=a.map(()=>0);let k=0;for(let b=g;b<g+n;b++){let w=h.get(b);w||h.set(b,w=Xv(b,e));for(const y of w){const x=c[y.kind];if(p[y.kind]>=s[y.kind])continue;u.compose(y.p,l.setFromAxisAngle(f,y.r),m.set(y.s,y.s,y.s)),x.setMatrixAt(p[y.kind]++,u);const[M,z]=r[y.kind];M!==0&&(u.compose(m.set(y.p.x,y.p.y+.12,y.p.z),l,d.set(M*y.s,1,z*y.s)),i.setMatrixAt(k++,u))}}for(const b of[...h.keys()])(b<g-1||b>g+n)&&h.delete(b);c.forEach((b,w)=>{b.count=p[w],b.visible=b.count>0,b.instanceMatrix.needsUpdate=!0}),i.count=k,i.instanceMatrix.needsUpdate=!0};return{group:o,update(p,k){const b=Math.floor(p/me)-Q0;b!==g&&(g=b,v());const w=Math.min(1,Math.max(0,(k-.4)/.5));Cr.value=1-.6*w,Dv(w)}}}const Qv=8.05,Pe=2.05,un=32,Jv=2.4,t5=260,J0=[.2,.2,.22],Ni=[.5,.53,.56],n5=[.22,.23,.25],Ma=t=>Qv+Jv*(t/un)**2;function e5(){const t=[],n=[];for(const a of[0,Pe]){const s=a?.18:.26,c=Array.from({length:17},(i,r)=>-un+r*2*un/16).map(i=>new _(i,Ma(i)+a,0));for(let i=0;i<c.length-1;i++)t.push(qe(c[i],c[i+1],s,J0,3));for(const i of[-1,1]){const r=new _(i*un,Ma(un)+a,0);n.push(qe(r,new _(i*140,r.y+.35*(140-un),0),s,J0,3))}}const e=fs(vs,[.3,.08,.07],Em,8).rotateY(Math.PI/2),o=fs(zm,vs,Cm,9).rotateY(Math.PI/2);for(const a of[-2,-1,0,1,2]){const s=Tt(a),c=Ma(s);t.push((a%2?o:e).clone().translate(s,c,0)),t.push(qe(new _(s,c+.3,0),new _(s,c+Pe,0),.22,Ni,12)),t.push(H(new F(2.2,.45,.6).translate(s,c+Pe+.1,0),n5,.03,13))}e.dispose(),o.dispose();for(const a of[-1,1]){const s=Ma(un);n.push(...Lm(new _(a*un,s-2.6,0),t5)),n.push(H(new F(2.4,1,6).translate(a*un,s-1.1,0),Ni,.05,6));for(const c of[-1.3,1.3])n.push(H(new F(.45,Pe+1.6,.45).translate(a*un,s+Pe/2-.2,c),Ni,.05,7));n.push(H(new F(.6,.5,3.1).translate(a*un,s+Pe+.6,0),[.78,.12,.08],.05,8))}return{hazard:bt(t),scenery:bt(n)}}const zi=G.cableLine;let o5=null;function Vs(t){const n=Z(t);return!!zi&&n>=zi.from&&n<=zi.to}function a5(){const t=o5??=e5();return new yt().add(new j(t.hazard,Ks).add(pn(t.hazard)),new j(t.scenery,lo))}const Lc="skyrun.best",Go=t=>`skyrun.best.${t}`,Ym=new Map,jm=new Set;try{const t=Number(localStorage.getItem(Lc))||0;t>0&&!localStorage.getItem(Go("khau-pha"))&&!localStorage.getItem(Go("mu-cang-chai"))&&localStorage.setItem(Go("khau-pha"),JSON.stringify({m:0,score:t}))}catch{}function s5(t){try{const n=localStorage.getItem(Go(t));if(!n)return null;const e=JSON.parse(n);return{m:Number(e.m)||0,score:Number(e.score)||0}}catch{return null}}function Er(t){const n=s5(t),e=Ym.get(t);return!n||!e?n??e??null:{m:Math.max(n.m,e.m),score:Math.max(n.score,e.score)}}function Xm(t,n){Ym.set(t,n);try{localStorage.setItem(Go(t),JSON.stringify(n))}catch{}}function Lr(t){return Er(t)}function Zm(t,n){const e=Math.floor(n),o=Er(t);if(!(e<=(o?.m??0))){Xm(t,{m:e,score:o?.score??0});for(const a of jm)a()}}function i5(t){jm.add(t)}function c5(t,n,e,o=!0){const a=Er(t),s=a?.m??0,c={m:Math.max(s,Math.floor(n)),score:Math.max(a?.score??0,e)},i=Math.floor(n)>s,r=!i&&a!==null&&Math.floor(n)===s&&s>0;if(!o)return{best:a??c,record:!1,tie:!1,prevM:s};Xm(t,c);try{e>(Number(localStorage.getItem(Lc))||0)&&localStorage.setItem(Lc,String(e))}catch{}return{best:c,record:i,tie:r,prevM:s}}const tl=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua"],r5=["ngan-yeah","ngan-wiii","ngan-da-qua"],l5=["ngan-nhanh-ghe","ngan-wiii","ngan-yeah"],nl=["ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ghe-chua","ngan-hay"],h5=["ngan-ui-da","ngan-oi","ngan-ui"],_c=["ngan-co-len","ngan-rang-len","ngan-len-nao"],el=["ngan-ngon","ngan-them-ne","ngan-hay"],ol=["ngan-tiec-ghe","ngan-oi-khong"],u5=["ngan-di-ne","ngan-len-nao","ngan-yeah","cat-canh"],al={rim:tl,dive:r5,gorge:["ngan-yeah","ngan-da-qua"],mouth:["ngan-troi-oi","ngan-wiii"],river:["ngan-da-qua","ngan-dep-qua","ngan-yeah"],cave:["ngan-troi-oi","ngan-dep-qua"],climb:_c,valley:tl,gate:["ngan-yeah","ngan-da-qua"],village:["ngan-dep-qua","ngan-da-qua"]},m5=300,d5=25,f5=30,g5=4,ka=gt.region==="fansipan",sl=()=>performance.now()/1e3,Gt=t=>Math.random()<t;function p5(){let t=0,n=0,e=0,o=-1/0,a=-1/0;const s=[],c=new Map,i=l=>{const f=l.filter(g=>!s.includes(g)),m=f.length?f:l,d=m[Math.floor(Math.random()*m.length)];return s.push(d),s.length>g5&&s.shift(),d},r=l=>{const f=sl();return f-o<d5||Math.random()>=l?!1:(o=f,!0)},h=(l,f)=>{const m=c.get(l)??0;return m>=f?!1:(c.set(l,m+1),!0)},u=(l,f)=>l&&h(l,1)?{n:l,prio:2}:Gt(.25)?{n:i(f),prio:1}:null;return{runStart(){return t=Lr(Bt)?.m??0,n++,n===1?i(["cat-canh","pk-len-duong","pk-bay-thoi"]):Gt(.3)?i(u5):null},nearMiss(l){return l===3?Gt(.4)?i(nl):null:l===6?Gt(.5)?i([...nl,"suot-dep","khen-dep-lam","khen-sat-rat","pk-hu-hon"]):null:l>=10&&l%5===0&&Gt(.6)?i(["qua-dinh","khen-bay-pro","khen-ai-can","pk-phe-qua","khen-tay-lai-lua"]):null},lantern(l){return l===10?h("den-troi-chuoi",2)?"den-troi-chuoi":Gt(.5)?i(el):null:l>=20&&l%10===0&&Gt(.5)?i([...el,"pk-phe-qua","pk-gom-den"]):null},gustFull:()=>Gt(.5)?i(["pk-quay-len",..._c]):null,rush(){const l=sl();return l-a<f5?null:(a=l,Gt(.6)?i([...l5,"pk-nhanh-qua","pk-cay-mat"]):null)},booster(l){return l==="shield"?h("du-du-phong",2)?"du-du-phong":null:h("luong-nhiet",1)?"luong-nhiet":Gt(.3)?i(_c):null},hurt(l,f,m){return r(.3)?ka&&f==="bridge"&&Vs(m)?"treu-cabin":ka&&f==="pillar"?"dx-thap-dung-yen":i(ka?["dx-bay-kieu-gi"]:["treu-hon-vach","dx-bay-kieu-gi","dx-vach-dung-yen"]):l<=1&&h("tiec-mot-tim",2)?"tiec-mot-tim":Gt(.8)?i([...h5,"tiec-xem"]):null},zone:l=>u(G.zoneLines?.[l],al[l]),section:l=>u(l==="gorge"?"khe-da":"thung-lung",al[l]),over(l,f){const m=f<m5;if(e=m?e+1:0,l)return i(["ky-luc","pk-ky-luc-chop","pk-pha-ky-luc"]);if(m)return e>=2&&r(.6)?"treu-lai-nua":r(.5)?i(["treu-moi-cat-canh","treu-khoi-dong","dx-de-ma","dx-nhin-duong"]):Gt(.5)?i(ol):null;if(t>0&&f>=.9*t)return"tiec-suyt-ky-luc";if(t>0&&f<.5*t&&r(.4))return"dx-ky-luc-cuoi";if(!Gt(.6))return null;if(Gt(.6))return i(ol);if(!ka)return i(["ha-canh","tiec-lam-lai"]);const d=G.zone(Z(f),!1)==="river";return i(d?["tiec-lam-lai","tiec-nhay-lai"]:["tiec-lam-lai","tiec-nhay-lai","tiec-rot-may"])}}}const il=[0,2,4,7,9],Sa=.32,cl=.85,v5=.6,rl=1.25,y5=[0,10,3,0];function b5(){let t=null,n=null,e=null,o=null,a=null,s=null,c=null,i=null,r=null,h=null;const u=Xu();let l=u.sfx,f=u.music;const m=()=>op({sfx:l,music:f});let d=0,g=0,v=null,p=0;const k=p5();let b=!1,w=null;const y=()=>{if(w)return w.resume();t=new AudioContext,w=K1(t),q1(t,matchMedia("(pointer: coarse)").matches),n=J1(t);const E=t.createDynamicsCompressor();E.threshold.value=-10,E.ratio.value=4,E.connect(t.destination),e=t.createGain(),e.gain.value=.9,e.connect(E);const T=A=>{const S=t.createGain();return S.gain.value=A,S.connect(e),S};o=T(l?1:0),a=T(l?cl:0),s=T(f?Sa:0),h=lp(t,s),setInterval(()=>h?.tick(f),500),i=t.createBiquadFilter(),i.type="lowpass",c=t.createGain(),c.gain.value=0,i.connect(c).connect(o)};y();const x=(E,T)=>{n&&o&&n.play(E,o,T)},M=(E,T)=>{if(!E||!t||!n||!a||!s||!l)return;const A=t.currentTime;if(A<d?T<=g:A<d+(y5[T]??0))return;const S=n.get(E);S&&(v?.stop(),v=n.play(E,a),d=A+S.duration,g=T,f&&(s.gain.setTargetAtTime(Sa*v5,A,.05),s.gain.setTargetAtTime(Sa,A+S.duration,.3)))},z=E=>E?M(E.n,E.prio):void 0,C=E=>1+(Math.random()*2-1)*E;return{update(E,T,A){if(!t||!n||!c||!i)return;!r&&n.get("wind-loop")&&(r=n.play("wind-loop",i,{loop:!0})),h?.tick(f);const S=t.currentTime;r&&r.playbackRate.setTargetAtTime(.85+.35*E,S,.2),i.frequency.setTargetAtTime(900+6e3*E,S,.15),c.gain.setTargetAtTime(T?.35+1.1*E*E:.2,S,.25);const L=om(A);T&&L>p&&L%3&&M(L%3===1?"chang-vang":"dem-hoi",1),p=T?Math.max(p,L):0,T&&E>rl&&!b&&M(k.rush(),1),b=T&&E>1.05&&(b||E>rl);const I=vp();I&&T&&x("festival-whoosh",{vol:.2+.4*I.near,rate:(I.big?.8:1)*C(.06),pan:I.pan}),z2()&&T&&(x("flare-whoosh",{vol:.9,rate:.75}),x("reveal-stinger",{vol:.7}))},events(E,T,A){for(const S of E)if(S.type==="lantern"){const L=il[(S.streak-1)%il.length];x("lantern-chime",{vol:.55,rate:Math.pow(2,L/12)}),M(k.lantern(S.streak),1)}else if(S.type==="wish"){for(const[L,I]of[[-5,.6],[2,.42],[7,.3]])x("lantern-chime",{vol:I,rate:Math.pow(2,L/12)});x("reveal-stinger",{vol:.35})}else if(S.type==="near-miss")x("near-miss",{vol:.8,rate:C(.08)*(1+.02*Math.min(10,S.combo))}),M(k.nearMiss(S.combo),1);else if(S.type==="lane")x("lane-whoosh",{vol:.25,rate:C(.1),pan:.5*S.dir});else if(S.type==="vert")x(S.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:C(.05)});else if(S.type==="gust")x("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(S.chain-1))/12)}),S.full&&(x("thermal-boost",{vol:.7}),M(k.gustFull(),1));else if(S.type==="cloud-gate")x(S.hit?"flare-whoosh":"dive-whoosh",{vol:S.hit?.8:.75,rate:S.hit?1.2:.6}),S.hit&&x("thermal-boost",{vol:.6});else if(S.type==="booster"){const[L,I]=S.kind==="thermal"?["thermal-boost",.8]:S.kind==="smoke"?["smoke-hiss",.75]:S.kind==="boost"?["festival-whoosh",1.4]:["shield-pickup",1.4];x(L,{vol:I}),(S.kind==="thermal"||S.kind==="shield")&&M(k.booster(S.kind),2)}else S.type==="hurt"?(x("shield-hit",{vol:1.2,rate:C(.05)}),M(k.hurt(S.hp,S.kind,A),2)):S.type==="crash"?x("crash",{vol:1.3}):S.type==="section"&&T&&!S.open&&!G.zoneNames&&z(k.section("gorge"))},reveal(){x("reveal-stinger",{vol:.6}),G.zoneNames||z(k.section("valley"))},zone(E){z(k.zone(E))},runStart(){y(),x("run-start",{vol:.8}),M(k.runStart(),2)},over(E,T){x("game-over",{vol:.5}),M(k.over(E,T),3)},toggleSfx(){return y(),l=!l,o&&a&&t&&(o.gain.setTargetAtTime(l?1:0,t.currentTime,.05),a.gain.setTargetAtTime(l?cl:0,t.currentTime,.05)),m(),l},toggleMusic(){return y(),f=!f,s&&t&&(s.gain.cancelScheduledValues(t.currentTime),s.gain.setTargetAtTime(f?Sa:0,t.currentTime,.3)),m(),f},prefs:()=>({sfx:l,music:f}),justUnlocked:()=>w?.justWoke()??!1,music:()=>h}}function Zt(t){for(const n of["touchstart","touchend","touchmove","pointerdown"])t.addEventListener(n,e=>e.stopPropagation(),{passive:!0});t.addEventListener("mousedown",n=>{n.stopPropagation(),n.target instanceof Element&&n.target.closest('button, [role="button"]')&&(n.preventDefault(),window.focus())})}const st=t=>`<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t}</svg>`,wt='fill="currentColor" fill-opacity=".28"',O={lantern:'<svg class="ui-ic ui-ic-lantern" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ic-lan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3121b"/><stop offset=".55" stop-color="#ff7329"/><stop offset="1" stop-color="#ffc45a"/></linearGradient></defs><path d="M7.2 2.8h9.6l1.7 3.4c.9 1.9 1.5 4 1.5 6.1 0 3.2-1.6 5.7-3.9 6.9H7.9C5.6 18 4 15.5 4 12.3c0-2.1.6-4.2 1.5-6.1z" fill="url(#ic-lan)" stroke="#4a1006" stroke-width="1.1"/><path d="M9.4 3.2 8.6 18.8M14.6 3.2l.8 15.6M12 2.9v16" stroke="#6e1f0a" stroke-width=".8" opacity=".55" fill="none"/><ellipse cx="12" cy="19.3" rx="4.3" ry="1.15" fill="#2e0a04"/><path d="M12 22.4c-1.2-.8-1.5-2-.6-3.2.1.8.6 1.1 1 1.2.2-.6.1-1.3-.3-1.9 1.5.7 2.1 2.2 1.4 3.9z" fill="#fff0a0" stroke="#ff9a2a" stroke-width=".5"/></svg>',heart:'<svg class="ui-ic ui-ic-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="whole" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/><path class="half l" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/><path class="half r" d="M12 21s7.5-4.6 9.6-9.4c1.5-3.5-.6-7.1-4.2-7.1-2.1 0-3.6 1.2-5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/></svg>',trophy:st(`<path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" ${wt}/><path d="M7 5.5H4.3a2.7 2.7 0 0 0 3.1 4.2M17 5.5h2.7a2.7 2.7 0 0 1-3.1 4.2M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>`),lock:st(`<rect x="5" y="10.5" width="14" height="10" rx="2.2" ${wt}/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17"/>`),gear:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',speaker:st('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16.5 9.5l5 5m0-5-5 5"/>'),note:st('<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16"/>'),pause:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',play:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.8v14.4L19.5 12z" fill="currentColor"/></svg>',help:st('<path d="M8.8 8.8a3.3 3.3 0 1 1 4.5 3.1c-.8.3-1.3 1-1.3 1.9v.7"/><circle cx="12" cy="18.3" r=".9" fill="currentColor" stroke="none"/>'),close:st('<path d="M6 6l12 12M18 6 6 18"/>'),mountain:st(`<path d="M2.5 19.5 9 8l3.5 6 2-3 7 8.5z" ${wt}/><path d="M7.3 11 9 12.5l1.7-1.6"/>`),route:st('<path d="M4 18.5c4-1 5-6.5 9-7.5s5-4 6.5-6.5" stroke-dasharray=".1 3.6"/><circle cx="4" cy="18.5" r="1.9" fill="currentColor"/><path d="M16 4h4v4"/>'),star:st(`<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" ${wt}/>`),wind:st('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),boost:st(`<path d="M6 5.5l6.5 6.5L6 18.5z" ${wt}/><path d="M6 5.5l6.5 6.5L6 18.5M13 5.5l6.5 6.5-6.5 6.5"/>`),thermal:st('<path d="M8 21c-2-3 2-5 0-8s2-5 0-8M16 21c-2-3 2-5 0-8s2-5 0-8"/><path d="M5.5 7 8 4.5 10.5 7M13.5 7 16 4.5 18.5 7"/>'),parachute:st(`<path d="M3 11a9 7 0 0 1 18 0z" ${wt}/><path d="M3 11l9 9 9-9M9 11l3 9 3-9"/>`),users:st('<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.3 6-5.3s5.4 1.9 6 5.3M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.8 14.6c1.7.8 2.9 2.5 3.2 4.9"/>'),crown:st(`<path d="M3.5 8l4 4 4.5-6 4.5 6 4-4-1.8 10H5.3z" ${wt}/>`),wingsuit:st(`<path d="M12 3.5c-3.6 3.6-7.3 5.2-9.5 5.8 2.9 1.1 5.8 1.4 7.9 3.6L12 20.5l1.6-7.6c2.1-2.2 5-2.5 7.9-3.6-2.2-.6-5.9-2.2-9.5-5.8z" ${wt}/>`),sun:st(`<circle cx="12" cy="12" r="4" ${wt}/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12H5M19 12h2.5M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>`),moon:st(`<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" ${wt}/>`),home:st(`<path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" ${wt}/>`),rotate:st('<rect x="3" y="7" width="18" height="10" rx="2.2"/><path d="M16.5 3.5a7 7 0 0 1 4 3M21 3v3.6h-3.6"/>'),chevronDown:st('<path d="M6 9l6 6 6-6"/>'),chevronRight:st('<path d="M9 6l6 6-6 6"/>'),check:st('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),dragSide:st(`<circle cx="12" cy="12" r="3.2" ${wt}/><path d="M7.5 12H2.5M5 9.5 2.5 12 5 14.5M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5"/>`),swipeUp:st(`<circle cx="12" cy="17.5" r="3.2" ${wt}/><path d="M12 13.5V3.5M8 7.5l4-4 4 4"/>`),swipeDown:st(`<circle cx="12" cy="6.5" r="3.2" ${wt}/><path d="M12 10.5v10M8 16.5l4 4 4-4"/>`),tap:st('<circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity=".45"/><circle cx="12" cy="12" r="7.5" stroke-opacity=".55"/>'),pillar:st(`<path d="M9 21V6.5l1.5-3h3L15 6.5V21" ${wt}/><path d="M3 21h18"/>`),spike:st(`<path d="M3.5 20 10 7l2.5 4L15 6l5.5 14z" ${wt}/>`),ridge:st(`<path d="M2 20v-7l4-4 3 3 3-5 3 4 3-2 4 4v7z" ${wt}/>`),bridge:st('<path d="M2 6c5 6 15 6 20 0M5 9.2V20M19 9.2V20M2 20h20M9 10.7v3M12 11v3M15 10.7v3"/>'),overhang:st(`<path d="M2 4h20v4l-4 3-3-2-3 4-3-3-3 2-4-2z" ${wt}/><path d="M4 20h16"/>`),house:st(`<path d="M3 11 12 4l9 7" /><path d="M5.5 9.5V20h13V9.5" ${wt}/>`),gorge:st(`<path d="M2.5 21V3.5l4 4.5 2 13zM21.5 21V5l-3.5 3-2.5 13z" ${wt}/><path d="M12 5v2.5M12 11v2.5M12 17v2.5"/>`),dive:st(`<path d="M2.5 4.5h8V21h-8z" ${wt}/><path d="M15.5 4v14.5M12 15l3.5 3.5L19 15"/>`),river:st('<path d="M2 8.5q2.5-2.2 5 0t5 0 5 0 5 0M2 15q2.5-2.2 5 0t5 0 5 0 5 0"/>'),cave:st(`<path d="M2 20.5V12a10 8.5 0 0 1 20 0v8.5z" ${wt}/><path d="M7.5 20.5V16a4.5 4.5 0 0 1 9 0v4.5"/>`),terrace:st('<path d="M2.5 20h19M4 16c4.5-1.6 11.5-1.6 16 0M6 12c3.5-1.4 8.5-1.4 12 0M8.5 8c2.2-1 4.8-1 7 0"/>'),cloud:st(`<path d="M6.5 18.5a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.4 9a4.75 4.75 0 0 1 .6 9.5z" ${wt}/>`)},w5=3*6e4,Qm=/assets\/index-([\w-]+)\.js/,ll=[...document.scripts].map(t=>Qm.exec(t.src)?.[1]).find(Boolean)??null;function x5(t){const n=document.createElement("button");n.type="button",n.className="ui-chip gold build-note",n.hidden=!0,n.innerHTML=`${O.rotate}<span>Có bản mới · Tải lại</span>`,n.addEventListener("click",c=>{c.stopPropagation(),location.reload()}),Zt(n),t.appendChild(n);let e=!1,o=performance.now(),a=!1;const s=async()=>{a=!0;try{const c=await fetch(new URL("./",location.href),{cache:"no-store",redirect:"manual"}),i=c.ok?Qm.exec(await c.text())?.[1]:void 0;e=!!i&&i!==ll}catch{}a=!1};return{setScreen(c){n.hidden=!e||!c,!(!ll||e||a||!c||performance.now()-o<w5)&&(o=performance.now(),s())}}}function M5(t){if(t.name)return t.name;if(t.parent?.name)return t.parent.name;const n=t.geometry;return`${t.type}:${n.type}:${n.getAttribute("position")?.count??0}`}function k5(t,n,e=14){n.updateMatrixWorld();const o=new iu().setFromProjectionMatrix(new Lt().multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse)),a=new su,s=new Map;t.traverseVisible(i=>{if(!(i instanceof j)&&!(i instanceof ss))return;const r=i.geometry;if(i.frustumCulled&&(r.boundingSphere||r.computeBoundingSphere(),a.copy(r.boundingSphere).applyMatrix4(i.matrixWorld),!(i instanceof vt)&&!o.intersectsSphere(a)))return;const h=i instanceof ss?0:(r.index?r.index.count:r.getAttribute("position")?.count??0)/3,u=i instanceof vt?i.count:1,l=M5(i),f=s.get(l)??{meshes:0,triangles:0};f.meshes+=1,f.triangles+=Math.round(h*u),s.set(l,f)});const c=[...s.entries()].map(([i,r])=>({source:i,...r})).sort((i,r)=>r.triangles-i.triangles);return{rows:c.slice(0,e),total:c.reduce((i,r)=>i+r.triangles,0)}}function S5(t,n,e,o){const a=r=>{const h=t.getContext(),u=new Uint8Array(4),l=performance.now();for(let d=0;d<r;d++)t.info.reset(),n.render(),h.readPixels(0,0,1,1,h.RGBA,h.UNSIGNED_BYTE,u);const{geometries:f,textures:m}=t.info.memory;return{msPerFrame:(performance.now()-l)/r,calls:t.info.render.calls,triangles:t.info.render.triangles,geometries:f,textures:m,programs:t.info.programs?.length??0}},s=async r=>{e.render();const h=await new Promise(l=>t.domElement.toBlob(l,"image/png"));if(!h)return"khong chup duoc";const u=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:h});return u.ok?`shots/${r}.png`:`loi ${u.status}`},c=r=>k5(o.scene,o.camera,r),i=(r=!1)=>{const h=new Map;return o.scene.traverse(u=>{const l=u.material,f=Object.keys(u.geometry?.attributes??{}).join(",");for(const m of Array.isArray(l)?l:l?[l]:[]){const d=t.properties.get(m).currentProgram,g=Object.keys(m.uniforms??{}).filter(v=>!/^(fog|diffuse|opacity)/.test(v)).slice(0,4).join(",");d&&!h.has(d.id)&&h.set(d.id,`${u.type}:${u.name||u.parent?.name||"?"}/${m.name||m.type} [${f}] {${g}}`)}}),(t.info.programs??[]).map(u=>`${u.id} ${r?u.cacheKey:h.get(u.id)??`${u.name} ${u.cacheKey.replace(/\s+/g," ").slice(0,160)}`}`)};window.__skyrun={...e,bench:a,shot:s,diag:c,programs:i}}const T5=5,A5=450;function N5(t,n){let e=0;return{spawn(o,a,s){const c=n();if(!c||e>=T5||!Number.isFinite(o)||!Number.isFinite(a)){s();return}const i=c.getBoundingClientRect(),r=t.getBoundingClientRect(),h=i.left+i.width*.25-r.left,u=i.top+i.height*.5-r.top,l=document.createElement("div");l.className="collect-streak",l.style.left=`${o}px`,l.style.top=`${a}px`,t.appendChild(l),e++;const f=(o+h)/2-(h-o)*.15,m=Math.min(a,u)-60,d=l.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${f-o}px), calc(-50% + ${m-a}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${h-o}px), calc(-50% + ${u-a}px)) scale(0.55)`,opacity:.9}],{duration:A5,easing:"cubic-bezier(.5,0,.9,.6)"});d.onfinish=d.oncancel=()=>{l.remove(),e--,s()}}}}const z5=`
#include <fog_pars_vertex>
attribute vec3 aCol;
attribute float aAge;
attribute float aK;
attribute float aSide;
attribute float aAlong;
varying vec3 vCol;
varying float vAge;
varying float vK;
varying float vSide;
varying float vAlong;
varying float vNear;
void main() {
  vCol = aCol;
  vAge = aAge;
  vK = aK;
  vSide = aSide;
  vAlong = aAlong;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  // Khói dạt qua sát ống kính: bản tan 1,5 → 4,5 m phủ đặc một phần ba dưới khung (cổ chân chỉ cách camera ~6,5 m,
  // cả dải nhìn thấy nằm trong vùng "sát"). Giờ tan dần suốt 2,5 → 7 m: đậm ở cổ chân, nhạt khi trôi về ống kính.
  vNear = smoothstep(2.5, 7.0, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,C5=`
#include <fog_pars_fragment>
varying vec3 vCol;
varying float vAge;
varying float vK;
varying float vSide;
varying float vAlong;
varying float vNear;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  // Vân cuộn theo LÚC PHÁT (vAlong) nên dính vào khói, không trượt dọc dải khi dải dài ra. Mép băng vỡ theo nhiễu: một
  // dải phẳng mép sắc đọc ra "ruy băng", không phải khói.
  float n = vn(vec2(vAlong * 9.0, vSide * 1.3 + vAge * 3.0));
  float n2 = vn(vec2(vAlong * 15.0 + 5.0, vSide * 2.2 - vAge * 2.0));
  float edge = 1.0 - smoothstep(0.15 + 0.5 * n, 1.0, abs(vSide));
  // Lỗ thủng theo nhiễu lớn dần theo tuổi: khói già vỡ thành cụm (bản đặc đều đọc ra "tấm vải đỏ" phủ đáy khung).
  // Ngưỡng rộng: ngưỡng hẹp ra lỗ tròn sắc mép như pho mát (ảnh ankle-yellow-full).
  float holes = smoothstep(0.05 + 0.45 * vAge, 0.65 + 0.35 * vAge, n2);
  // Hiện dần trong ~0,1 s đầu: đầu dải hẹp mà đặc ngay thì thành mũi tam giác đỏ nhọn ở cổ chân (ảnh can-port-26).
  float a = edge * holes * vK * pow(1.0 - vAge, 1.8) * smoothstep(0.0, 0.09, vAge) * vNear * 0.7;
  // Pháo khói tự sáng 0,35 (đêm vẫn thấy màu) + ăn nắng như smoke-trail; cụm đặc sáng, chỗ mỏng tối = có khối.
  vec3 col = vCol * (ATM_SUN_LIGHT * 0.75 + ATM_SKY_AMBIENT * 0.45 + 0.35) * (0.6 + 0.6 * n * holes);
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  #include <fog_fragment>
}`,Mo=1.1,E5=1.3,L5=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Za={request:0};function _5(t){const n=t?.041666666666666664:.025,e=Math.ceil(Mo/n)+2,o=[0,1].map(()=>Array.from({length:e},()=>({p:new _,t:-99,k:0,c:0}))),a=2*e*2,s=new Float32Array(a*3),c=new Float32Array(a*3),i=new Float32Array(a),r=new Float32Array(a),h=new Float32Array(a),u=new Float32Array(a),l=[];for(let T=0;T<2;T++)for(let A=0;A<e;A++){const S=(T*e+A)*2;h[S]=-1,h[S+1]=1,A<e-1&&l.push(S,S+1,S+2,S+1,S+3,S+2)}const f=new ht,m={position:[s,3],aCol:[c,3],aAge:[i,1],aK:[r,1],aSide:[h,1],aAlong:[u,1]};for(const[T,[A,S]]of Object.entries(m))f.setAttribute(T,new $(A,S));f.setIndex(l),f.setDrawRange(0,0);const d=["position","aCol","aAge","aK","aAlong"].map(T=>f.getAttribute(T)),g=new Mt({vertexShader:z5,fragmentShader:C5,uniforms:Ln.merge([_n.fog]),transparent:!0,depthWrite:!1,side:St,fog:!0}),v=new j(f,g);v.frustumCulled=!1,v.renderOrder=3;const p=new _,k=new _,b=new _,w=new _,y=new _,x=new _;let M=0,z=-99,C=-99,E=!1;return{mesh:v,update(T,A,S,L,I){Za.request>0&&(M=Za.request,Za.request=0),L>0&&(M=Math.max(0,M-L));const B=T.mode==="run",U=B&&T.smokeT>0?Math.min(1,T.smokeT/E5):0,W=B&&M>0?.75*Math.min(1,M/.8):0,Q=Math.max(U,W);if(Q>0)S-C>Mo&&o.forEach((J,Nt)=>J.forEach(Ct=>(Ct.p.copy(A[Nt]),Ct.t=-99,Ct.k=0))),C=S;else if(S-C>Mo){E&&f.setDrawRange(0,0),E=!1;return}E=!0,f.setDrawRange(0,1/0);const nt=At(T.z);p.set(Math.sin(nt),vn(T.z),Math.cos(nt)).normalize(),k.set(Math.cos(nt),0,-Math.sin(nt));const q=B?T.speed:0,et=Math.sign((A[0].x-A[1].x)*k.x+(A[0].z-A[1].z)*k.z)||1,ft=L>0&&S-z>=n;ft&&(z=S),o.forEach((J,Nt)=>{const Ct=Q*(Q+(1-Q)*Math.max(0,Math.sin(S*21+Nt*2))),Et=U>0?(T.smokes+2)%3:Nt===0?1:2;if(ft){const pt=J.pop();J.unshift(pt)}const Rt=J[0];Rt.p.copy(A[Nt]),ft&&(Rt.t=S),Rt.k=Ct,Rt.c=Et;const xn=Nt===0?et:-et;for(let pt=1;pt<e&&L>0;pt++){const tt=J[pt],Jt=Math.min(Mo,S-tt.t),uo=Math.max(0,q-5-18*Jt),cn=Math.sin(S*7+tt.t*13);tt.p.addScaledVector(p,uo*L).addScaledVector(k,(xn*1.6+cn*.7)*L),tt.p.y+=(-1+Math.cos(S*6+tt.t*11)*.5)*L}x.copy(k);for(let pt=0;pt<e;pt++){const tt=J[pt],Jt=S-tt.t,uo=Math.min(1,Jt/Mo);b.subVectors(J[Math.max(0,pt-1)].p,J[Math.min(e-1,pt+1)].p),b.lengthSq()<1e-6&&b.copy(p),w.subVectors(I,tt.p),y.crossVectors(b,w),y.lengthSq()<.03*b.lengthSq()*w.lengthSq()?y.copy(x):y.normalize(),y.dot(x)<0&&y.negate(),x.copy(y);const cn=(.14+.9*(1-Math.exp(-Jt/.4)))*(.45+.55*tt.k),mt=(Nt*e+pt)*2;s[mt*3]=tt.p.x-y.x*cn,s[mt*3+1]=tt.p.y-y.y*cn,s[mt*3+2]=tt.p.z-y.z*cn,s[mt*3+3]=tt.p.x+y.x*cn,s[mt*3+4]=tt.p.y+y.y*cn,s[mt*3+5]=tt.p.z+y.z*cn;const mo=L5[tt.c];c.set(mo,mt*3),c.set(mo,mt*3+3),i[mt]=i[mt+1]=uo,r[mt]=r[mt+1]=tt.t<0?0:tt.k,u[mt]=u[mt+1]=tt.t}});for(const J of d)J.needsUpdate=!0}}}function R5(t,n,e,o,a,s,c,i){const r=N5(t,()=>t.querySelector(".hud-lantern")),h=new _,u=document.createElement("div");u.className="flash",t.appendChild(u);const l=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(f,m){if(!f.length)return;o.events(f,m.mode==="run",m.z),a.events(f,m);const d=D(m.z+3,m.x,m.v,{x:0,y:0,z:0}),g=D(m.z+.6,m.x,m.v,{x:0,y:0,z:0});for(const v of f)if(v.type==="lantern")e.burst(d.x,d.y+.5,d.z,16,!0),s.spawn(g.x,g.y+.2,g.z),h.set(d.x,d.y+.3,d.z).project(i),r.spawn((h.x*.5+.5)*t.clientWidth,(.5-h.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(v.type==="wish")e.burstWish(d.x,d.y+.6,d.z),s.spawn(g.x,g.y+.2,g.z),n.shake(.12),l(),h.set(d.x,d.y+.3,d.z).project(i),r.spawn((h.x*.5+.5)*t.clientWidth,(.5-h.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(v.type==="near-miss")n.shake(.06),l();else if(v.type==="hurt"||v.type==="crash"){const p=v.type==="crash";n.shake(p?.9:.45),c.spawn(g.x,g.y,g.z,ne(m.z)?"village":v.kind==="bridge"?"cloth":"rock",p),p||l()}else v.type==="booster"?e.burst(d.x,d.y,d.z,40,!0):v.type==="gust"&&v.full?Za.request=1.5:v.type==="section"&&v.open&&m.mode==="run"&&o.reveal()}}}const hl=20.5,I5=17.5,ul=.1,P5=.05,B5=3,H5=.5,F5=2.5,$5=8;class G5{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(n,e){this.minScale=n,this.hooks=e}sample(n){if(n<=0||n>.1||(this.clock+=n,this.warm+=n,this.sinceChange+=n,this.warm<B5||this.sinceChange<H5)||(this.seeded||(this.ema=n*1e3,this.seeded=!0),this.ema+=(n*1e3-this.ema)*.05,this.verify&&this.sinceChange>=F5&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>hl?this.slowFor+n:0,this.fastFor=this.ema<I5?this.fastFor+n:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>hl?this.floorSlowFor+n:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const n=this.verify;this.verify=null,!(this.ema<n.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(n.prev))}down(n){if(this.slowFor=0,!n){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-ul));return}this.floorSlowFor<$5||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+ul)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const n=Math.min(1,this.scale+P5);n<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(n))??0)||this.apply(n)}key(n){return Math.round(n*100)}apply(n){this.scale=Math.round(n*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const Ci={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},Jm="skyrun.quality",O5=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function D5(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"no-webgl2";const n=t.getExtension("WEBGL_debug_renderer_info"),e=String(n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function U5(t){const n=navigator;return t==="no-webgl2"||O5.test(t)||(n.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function ml(t){return t==="low"||t==="mid"||t==="high"}function K5(t){const n=D5(),e=t.get("q");if(ml(e))return{...Ci[e],gpu:n,source:"url"};let o=null;try{const[a,s]=(localStorage.getItem(Jm)??"").split("|");Date.now()-Number(s)<3*864e5&&(o=a??null)}catch{}return ml(o)?{...Ci[o],gpu:n,source:"saved"}:{...Ci[U5(n)],gpu:n,source:"guess"}}function V5(t){try{localStorage.setItem(Jm,`${t}|${Date.now()}`)}catch{}}function q5(t){return t==="high"?"mid":t==="mid"?"low":null}function W5(t){const n=()=>Math.min(window.devicePixelRatio,t.tier.maxDpr);let e=!1;const o=new G5(t.tier.minScale,{setScale(r){const h=n()*r;t.renderer.setPixelRatio(h),t.post.setPixelRatio(h),t.resize()},degrade(){const r=q5(t.tier.name);return r&&!e&&t.tier.source!=="url"&&(V5(r),e=!0),t.post.setLite()}});let a=performance.now(),s=0,c=a;const i=r=>{const h=(r-a)/1e3;if(t.tick(Math.min(.1,h)),a=r,t.renderer.info.reset(),t.post.render(),o.sample(h),s++,r-c>500){const u=t.renderer.info.render,l=(s*1e3/(r-c)).toFixed(0);t.stats?.(`${l} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${t.tier.name} (${t.tier.source}) · độ phân giải ${Math.round(o.scale*100)}% · ${o.frameMs().toFixed(1)} ms
${t.worldLine()}`),s=0,c=r}requestAnimationFrame(i)};return requestAnimationFrame(i),o}const td=gt.routeVersion,Y5=7*3600*1e3;function Rc(t){const n=new Date(t.getTime()+Y5);return`${`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}.${gt.routePrefix}${td}`}function j5(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return n>>>0||1}function X5(t){let n=t;return()=>{const e=Rc(new Date);return{route:e,seed:t?n++:j5(e)}}}function dl(t){const n=/^\d{4}-(\d{2})-(\d{2})/.exec(t);return n?`${n[2]}/${n[1]}`:t}const Ic=20,nd=2*Math.PI*Ic,Z5=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Ic}" class="track"/>
  <circle cx="24" cy="24" r="${Ic}" class="arc" stroke-dasharray="${nd.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function Q5(t,n){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${Z5}<b>Đèn ×2</b>`,t.appendChild(e);const o=e.querySelector(".arc");let a=!1,s=!1,c="";return{update(i){const r=i.smokeT>0&&i.mode!=="over";if(r!==a&&(a=r,e.classList.toggle("on",a),n.classList.toggle("x2",a)),!a)return;const h=(nd*(1-i.smokeT/P.smokeTime)).toFixed(1);h!==c&&o.setAttribute("stroke-dashoffset",c=h);const u=i.smokeT<1.5;u!==s&&e.classList.toggle("ending",s=u)}}}const J5={hurt:"heart",thermal:"thermal",shield:"parachute",boost:"boost",wind:"wind",wish:"lantern"},t3={thermal:"Lên cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${P.smokeLanternMul} trong ${P.smokeTime} giây`,boost:`Gió tốc! Điểm ×${P.boostScoreMul}`},fl=2*Math.PI*24,n3=1.1,Ta=t=>Math.floor(t).toLocaleString("vi-VN"),gl=t=>`×${t.toFixed(1).replace(".",",")}`;function e3(t){const n=document.createElement("div");n.className="hud",n.innerHTML=`
    <div class="hud-left">
      <div class="hud-dist-row"><div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div><span class="hud-rank-slot"></span></div>
      <div class="hud-score">${O.star}<b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời">
        <div class="hud-day-track"><span class="mk" style="left:24%">${O.sun}</span><span class="mk" style="left:64%">${O.moon}</span><span class="mk" style="left:86%">${O.lantern}</span><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span class="hud-day-no" data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${O.heart.repeat(P.maxHp)}</div>
      <div class="hud-lantern">${O.lantern}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><svg viewBox="0 0 54 54" aria-hidden="true"><circle class="bg" cx="27" cy="27" r="26"/><circle class="arc" data-k="combo" cx="27" cy="27" r="24" stroke-dasharray="${fl.toFixed(1)}"/></svg><span data-k="mult">×1,0</span></div>
    </div>
    <div class="hud-boost"><div class="hud-pill" data-k="thermal">${O.thermal}<b>Luồng nhiệt</b><i data-k="thermalBar"></i></div><div class="hud-pill gale" data-k="gale">${O.boost}<b>Gió tốc · điểm ×${P.boostScoreMul}</b><i data-k="galeBar"></i></div></div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-vignette" data-k="vig"></div>
    <div class="hud-stats" data-k="stats"></div>`,t.appendChild(n);const e=S=>n.querySelector(`[data-k="${S}"]`),o=["dist","score","sun","dayNo","period","lanterns","mult","multBox","combo","thermal","thermalBar","gale","galeBar","toasts","sections","stats","vig"],{dist:a,score:s,sun:c,dayNo:i,period:r,lanterns:h,mult:u,multBox:l,combo:f,thermal:m,thermalBar:d,gale:g,galeBar:v,toasts:p,sections:k,stats:b,vig:w}=Object.fromEntries(o.map(S=>[S,e(S)])),y=n.querySelector(".hud-lantern"),x=[...e("hearts").children],M=Q5(n.querySelector(".hud-right"),y);let z=0,C=null,E="";const T=(S,L,I)=>{const B=document.createElement("div");B.className=`hud-toast ${L}${I?` ${I}`:""}`;const U=I&&J5[I];U&&(B.innerHTML=O[U]),B.append(S);const W=L==="section"?k:p;for(W.appendChild(B);W.children.length>(L==="section"?1:2);)W.firstChild.remove();return setTimeout(()=>B.remove(),L==="section"?2600:1100),B},A=(S,L)=>{const I=L>1?`SƯỢT! ${gl(S.mult)}`:"SƯỢT!",B=performance.now()/1e3;C&&C.el.isConnected&&B-C.at<n3?(C.el.textContent=I,C.el.classList.remove("bump"),C.el.offsetWidth,C.el.classList.add("bump"),clearTimeout(C.timer)):C={el:T(I,"combo"),at:B,timer:0},C.at=B;const U=C.el;C.timer=window.setTimeout(()=>U.remove(),1100)};return{toast:(S,L,I)=>{T(S,L,I)},setVisible(S){n.classList.toggle("hidden",!S)},bumpLantern(){y.classList.remove("got"),y.getBoundingClientRect(),y.classList.add("got")},setStats(S){b.textContent=S},setPilotBox(S){const L=t.clientHeight,I=S?S.y+S.h+16:0,B=!S||t.clientWidth>600?"":I<=L-150?`t${Math.round(I)}`:`b${Math.round(L-S.y+16)}`;B!==E&&(E=B,p.style.top=B[0]==="t"?`${B.slice(1)}px`:B?"auto":"",p.style.bottom=B[0]==="b"?`${B.slice(1)}px`:B?"auto":"")},update(S,L){a.textContent=Ta(S.z),s.textContent=Ta(we(S)),c.style.left=`${(L.u*100).toFixed(1)}%`;const I=`Ngày ${L.day}`;i.textContent!==I&&(i.textContent=I);const B=dp(L);r.textContent!==B&&(r.textContent=B),h.textContent=Ta(S.lanterns),u.textContent=gl(S.mult),l.classList.toggle("hot",S.mult>1.05);const U=S.combo>0?Math.max(0,1-S.comboT/P.comboBreak):0;f.style.strokeDashoffset=(fl*(1-U)).toFixed(1),m.classList.toggle("on",S.thermalT>0),d.style.transform=`scaleX(${S.thermalT/P.thermalTime})`,g.classList.toggle("on",S.boostT>0),v.style.transform=`scaleX(${S.boostT/P.boostTime})`,x.forEach((Q,nt)=>Q.classList.toggle("lost",nt>=S.hp)),n.classList.toggle("low-hp",S.mode==="run"&&S.hp===1&&P.maxHp>1),M.update(S);const W=om(L);W>z&&S.mode==="run"&&T(W%3===0?`Ngày ${L.day} · ${Qu[L.region]}`:W%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),z=S.mode==="run"?Math.max(z,W):0},zone(S){const L=G.zoneNames?.[S];L&&T(L,"section")},events(S,L){for(const I of S)if(I.type==="near-miss")A(L,I.combo);else if(I.type==="hurt"){T(I.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt");for(const B of[x[I.hp],w])B?.classList.remove("hit"),B?.getBoundingClientRect(),B?.classList.add("hit")}else I.type==="booster"&&I.kind!=="lantern"?T(t3[I.kind],"big",I.kind):I.type==="wish"?T(`Đèn ước! +${Ta(I.points)}`,"big","wish"):I.type==="gust"?T(I.full?`Trọn chuỗi gió! +${P.gustChainScore}`:`Gió xuôi ×${I.chain}`,I.full?"big":"combo","wind"):I.type==="cloud-gate"?T(I.hit?`Xé cửa mây! +${P.gateScore}`:"Đâm vào mây · mất gió",I.hit?"big":"combo","wind"):I.type==="section"&&L.mode==="run"&&!G.zoneNames&&T(I.open?Xt(L.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const o3=30,pl={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},a3=10,s3=34,i3=260,c3=180,r3=.26,vl=300;function l3(t,n,e){const o=[],a=[],s=new Map;let c=!1;const i=new Map;let r=null,h=0,u=0,l=-1,f=0;const m=[],d=(b,w)=>{n()&&m.forEach(y=>y(b,w))};let g=null,v=0,p=0;window.addEventListener("keydown",b=>{if(b.repeat)return;const w=pl[b.code];if(w){o.push(w),w==="down"&&(c=!0),b.preventDefault();const y=performance.now();w===g&&w!=="down"&&y-v<vl?(d(w==="up"?"flip":"roll",w==="right"?-1:1),g=null):(g=w,v=y)}(b.code==="Space"||b.code==="Enter")&&(a.forEach(y=>y(b.code)),b.preventDefault()),s.get(b.code)?.()}),window.addEventListener("keyup",b=>{pl[b.code]==="down"&&(c=!1)}),t.addEventListener("touchstart",b=>{const w=performance.now();for(const y of Array.from(b.changedTouches))i.set(y.identifier,{x0:y.clientX,y0:y.clientY,t0:w,hist:[{y:y.clientY,t:w}],hx:[{x:y.clientX,t:w}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),t.addEventListener("touchmove",b=>{b.preventDefault();const w=performance.now();for(const y of Array.from(b.changedTouches)){const x=i.get(y.identifier);if(!x)continue;for(x.hist.push({y:y.clientY,t:w});x.hist.length>1&&w-x.hist[0].t>i3;)x.hist.shift();const M=y.clientY-x.hist[0].y;for(w>=x.cool&&Math.abs(M)>=s3&&(o.push(M<0?"up":"down"),M<0&&w-p<vl+150?(d("flip",1),p=0):M<0&&(p=w),x.down=M>0&&r!==y.identifier,x.flicked=!0,x.cool=w+150,x.hist=[{y:y.clientY,t:w}]),x.hx.push({x:y.clientX,t:w});x.hx.length>1&&w-x.hx[0].t>c3;)x.hx.shift();const z=y.clientX-x.hx[0].x;w>=x.rollCool&&Math.abs(z)>=t.clientWidth*r3&&(d("roll",z>0?-1:1),x.rollCool=w+700,x.hx=[{x:y.clientX,t:w}]);const C=y.clientX-x.x0;x.dragX===null&&Math.abs(C)>=a3&&Math.abs(C)>=Math.abs(y.clientY-x.y0)*.8&&(x.dragX=y.clientX,r===null&&(r=y.identifier,x.down=!1,u++,h=0)),r===y.identifier&&x.dragX!==null&&(h=(y.clientX-x.dragX)/Math.max(1,t.clientWidth))}},{passive:!1});const k=b=>{const w=performance.now();for(const y of Array.from(b.changedTouches)){const x=i.get(y.identifier);if(i.delete(y.identifier),r===y.identifier&&(r=null),!x||x.flicked||x.dragX!==null||b.type==="touchcancel")continue;Math.hypot(y.clientX-x.x0,y.clientY-x.y0)<=14&&w-x.t0<=350&&n()?o.push(y.clientX<t.clientWidth/2?"left":"right"):n()||a.forEach(z=>z())}};return t.addEventListener("touchend",k),t.addEventListener("touchcancel",k),t.addEventListener("mousedown",()=>a.forEach(b=>b())),{take(){return o.splice(0,o.length)},holdDown:()=>c||Array.from(i.values()).some(b=>b.down),steer(){if(r===null)return null;l!==u&&(l=u,f=e());let b=f-h*o3;const w=Math.abs(b)-P.steerMax;return w>0&&(f-=Math.sign(b)*w,b-=Math.sign(b)*w),b},onAction(b){a.push(b)},onKey(b,w){s.set(b,w)},onTrick(b){m.push(b)}}}function ed(t){return/\.github\.io$/.test(location.hostname)||t.has("portal")}function od(t){return!gt.online||t.has("seed")||t.has("z")||t.get("auto")==="1"?!1:ed(t)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function h3(t){return od(t)&&!t.has("alt")}function u3(t){const n={};let e=null;async function o(c,i={}){try{const r={...n,accept:"application/json"};i.body&&(r["content-type"]="application/json");const h=await fetch(c,{...i,headers:r,credentials:"include",redirect:"manual",cache:"no-store"});if(h.type==="opaqueredirect"||h.status===401)return{fail:{kind:"auth",status:h.status}};if(!h.ok){const u=await h.json().catch(()=>null);return{fail:{kind:h.status>=500?"network":"rejected",status:h.status,why:u?.why??u?.error}}}return{ok:await h.json()}}catch{return{fail:{kind:"network",status:0}}}}async function a(c,i={}){const r=await o(c,i);return e="fail"in r?r.fail:null,"ok"in r?r.ok:null}const s=encodeURIComponent;return{board:c=>a(`api/ghosts?route=${s(c)}`),async paths(c,i){return i.length?(await a(`api/ghosts/paths?route=${s(c)}&pids=${i.map(s).join(",")}`))?.paths??{}:{}},leaderboard:(c="meters")=>o(`api/leaderboard?by=${c}&map=${gt.id}`),progress:()=>a("api/progress"),submit:(c,i)=>a("api/ghosts",{method:"POST",body:JSON.stringify({route:c,...i})}),lastFailure:()=>e,async logRun(c){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(c),headers:{...n,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const c=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return c?c.type==="opaqueredirect"||c.status===401?"auth":c.ok?"ok":"network":"network"}}}const ys=10,m3=60/ys,Pc=900*ys,Ei=t=>Math.max(-32768,Math.min(32767,Math.round(t*100)));function d3(t){const n=Math.min(Pc,Math.floor(t.length/3)),e=new DataView(new ArrayBuffer(4+n*6)),o=t[0]??0;e.setFloat32(0,o,!0);let a=e.getFloat32(0,!0);for(let i=0;i<n;i++){const r=Ei(t[i*3]-a);a+=r/100,e.setInt16(4+i*6,r,!0),e.setInt16(6+i*6,Ei(t[i*3+1]),!0),e.setInt16(8+i*6,Ei(t[i*3+2]),!0)}let s="";const c=new Uint8Array(e.buffer);for(let i=0;i<c.length;i+=32768)s+=String.fromCharCode(...c.subarray(i,i+32768));return btoa(s)}function f3(t){let n;try{n=atob(t)}catch{return null}const e=Math.floor((n.length-4)/6);if(e<2)return null;const o=new Uint8Array(n.length);for(let i=0;i<n.length;i++)o[i]=n.charCodeAt(i);const a=new DataView(o.buffer),s={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let c=a.getFloat32(0,!0);if(!Number.isFinite(c))return null;for(let i=0;i<e;i++)c+=a.getInt16(4+i*6,!0)/100,s.z[i]=c,s.x[i]=a.getInt16(6+i*6,!0)/100,s.v[i]=a.getInt16(8+i*6,!0)/100;return s}function ad(t,n,e){const o=Math.max(0,n*ys),a=t.n-1,s=Math.min(a,Math.floor(o)),c=Math.min(a,s+1),i=Math.min(1,o-s);return e.z=t.z[s]+(t.z[c]-t.z[s])*i,e.x=t.x[s]+(t.x[c]-t.x[s])*i,e.v=t.v[s]+(t.v[c]-t.v[s])*i,e.ended=o>=a,e.after=Math.max(0,(o-a)/ys),e}const sd=5,Li=4,g3=1500,p3=200,v3=120;function Bc(t,n,e=!1){return e?1:Math.min(1,Math.max(0,(n-g3-t*p3)/v3))}const id=t=>t.length===1&&t[0].self;function y3(t){const n=t.runs.find(c=>c.pid===t.me),e=t.runs.filter(c=>c.pid!==t.me),o=n?.dist??0,a=c=>c.dist>=o?c.dist-o:(o-c.dist)*2,s=[];n&&s.push(n),e[0]&&s.push(e[0]);for(const c of e.slice(1).sort((i,r)=>a(i)-a(r))){if(s.length>=sd)break;s.push(c)}return s}function b3(){let t=[];const n=[];return{ghosts:()=>t,set(e){t=[];for(const o of e){const a=f3(o.path);a&&t.push({run:o.run,self:o.self,track:a,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of t)e.ahead=null,e.downSaid=!1},update(e,o){n.length=0;const a=id(t);return t.forEach((s,c)=>{ad(s.track,e,s.at);const i=s.at.z-o,r=s.run.name,h=Bc(c,o,a)>0;h&&i>Li&&s.ahead===!1&&n.push({type:"passed",name:r,self:s.self}),h&&i<-Li&&s.ahead===!0&&n.push({type:"pass",name:r,self:s.self}),Math.abs(i)>Li&&(s.ahead=i>0),s.at.ended&&!s.downSaid&&(s.downSaid=!0,h&&s.run.crash&&Math.abs(i)<300&&n.push({type:"down",name:r,self:s.self,dist:s.run.dist}))}),n},rank(e){return 1+t.filter(o=>o.at.z>e).length}}}function w3(){let t=[],n=0,e=!1;const o=a=>{t.length<Pc*3&&t.push(a.z,a.x,a.v)};return{start(a){t=[],n=0,e=!0,o(a)},afterStep(a){e&&(n++,n%m3===0&&o(a),a.mode==="over"&&(e=!1))},seconds:()=>n/60,truncated:()=>t.length>=Pc*3,finish:()=>d3(t)}}const _i="skyrun.myGhost",Aa="me";function x3(t){let n=null;const e=(s,c)=>!!s&&s.route===c&&typeof s.path=="string"&&Number.isFinite(s.dist);function o(s){let c=null;try{c=JSON.parse(localStorage.getItem(_i)??"null")}catch{}const i=e(c,s)?c:null,r=e(n,s)?n:null;return i&&r?r.dist>i.dist?r:i:i??r}function a(s){const c=o(s);return{me:Aa,myName:null,total:c?1:0,runs:c?[{pid:Aa,name:"Bạn",dist:c.dist,score:c.score,dur:c.dur,crash:c.crash}]:[]}}return{board:async s=>a(s),async paths(s,c){const i=o(s);return i&&c.includes(Aa)?{[Aa]:i.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(s,c){const i=o(s),r=!i||c.dist>i.dist;if(r){n={route:s,dist:c.dist,score:c.score,dur:c.dur,crash:c.crash,path:c.path};try{localStorage.removeItem(_i),localStorage.setItem(_i,JSON.stringify(n))}catch{}}return{saved:r,best:r?c.dist:i.dist,rank:1,total:1,bestScore:c.score,scoreRank:1}},lastFailure:()=>null,logRun:t,ping:async()=>"ok"}}const M3="modulepreload",k3=function(t,n){return new URL(t,n).href},yl={},S3=function(n,e,o){let a=Promise.resolve();if(e&&e.length>0){let h=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),r=i?.nonce||i?.getAttribute("nonce");a=h(e.map(u=>{if(u=k3(u,o),u in yl)return;yl[u]=!0;const l=u.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(o)for(let d=c.length-1;d>=0;d--){const g=c[d];if(g.href===u&&(!l||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":M3,l||(m.as="script"),m.crossOrigin="",m.href=u,r&&m.setAttribute("nonce",r),document.head.appendChild(m),l)return new Promise((d,g)=>{m.addEventListener("load",d),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return a.then(c=>{for(const i of c||[])i.status==="rejected"&&s(i.reason);return n().catch(s)})},T3="skyRuns",bl="sr-tele",wl="../../shared/",Ri=new Map;function xl(t){let n=Ri.get(t);return n||(n=new Promise((e,o)=>{const a=document.createElement("script");a.src=t,a.onload=()=>e(),a.onerror=()=>o(new Error(`không tải được ${t}`)),document.head.appendChild(a)}),n.catch(()=>Ri.delete(t)),Ri.set(t,n)),n}function A3(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return(n>>>0).toString(36)}function N3(t,n,e,o){const{route:a,rv:s,sv:c,alt:i,dist:r,dur:h,score:u,crash:l,tainted:f,...m}=t;return{v:1,ch:n,pk:e,at:o,route:a,rv:s,sv:c,alt:i,dist:Math.round(r*10)/10,dur:Math.round(h*100)/100,score:Math.round(u),crash:l??null,tainted:f,detail:JSON.stringify(m)}}let Be=null;function z3(){return Be||(Be=(async()=>{await xl(`${wl}portal-config.js`),await xl(`${wl}portal-firebase.js`);const t=window.Portal,n=t?.FB;if(!n?.configured())throw new Error("chưa cấu hình Firebase");const e=await n.load(),o=await S3(()=>import(`${n.SDK}/firebase-app.js`),[],import.meta.url),a=o.getApps().find(i=>i.name===bl)??o.initializeApp(t.CONFIG,bl),s=e.authM.getAuth(a);await s.authStateReady(),s.currentUser||await e.authM.signInAnonymously(s);let c;try{c=e.fsM.initializeFirestore(a,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{c=e.fsM.getFirestore(a)}return{fsM:e.fsM,db:c,uid:s.currentUser.uid,limit:n.limit.bind(n)}})(),Be.catch(()=>Be=null),Be)}function C3(){const t=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async n=>{try{const e=await z3();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,T3),N3(n,t,A3(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const E3=1e9,L3=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),_3=[...document.scripts].map(t=>/assets\/index-([\w-]+)\.js/.exec(t.src)?.[1]).find(Boolean)??"dev",Ml=t=>t.thermalV>8?"thermal":t.v<-2?"low":t.v>2?"high":"zero",R3=(t,n)=>t>=E3?"trail":n>2?"u":n<-2?"d":"o",I3=t=>G.zone(Z(t),ne(t)),Na=(t,n)=>t.length?t[Math.min(t.length-1,Math.floor(n*t.length))]:0,rn=t=>Math.round(t*100)/100;function P3(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function B3(t){let n={touch:!1,key:!1};addEventListener("keydown",()=>n.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(n.touch=!0)});let e="",o=!1,a=0,s=-1,c=null,i=u(),r=!0,h=null;function u(){const l=f=>Object.fromEntries(f.map(m=>[m,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke","boost"]),bTaken:l(["thermal","shield","smoke","boost"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1,crash:null}}return{start(l,f,m){e=f,o=m,a++,c=s<0?null:rn((performance.now()-s)/1e3),n={touch:!1,key:!1},i=u(),i.lastCmd=l.time,r=!1,h=l},state:()=>h,frame(l,f,m){l>0&&l<.5&&(i.frames.length<3e4&&i.frames.push(l),i.scaleSum+=t.quality().scale*l),i.shown=Math.max(i.shown,f),i.near=m},afterStep(l,f){if(h=l,l.mode!=="run"&&l.mode!=="crash")return;const m=Ml(l);i.tiers[m]+=f,i.multSum+=l.mult*f,m!=="low"?i.lowSince=-1:i.lowSince<0&&(i.lowSince=l.time);for(const d of l.events)d.type==="lane"?i.swipes.lane++:d.type==="vert"?i.swipes[d.kind==="flare"?"up":"down"]++:d.type==="hurt"?i.hurts++:d.type==="crash"&&(i.deathNear=i.near,i.crash=d.kind),(d.type==="lane"||d.type==="vert")&&(i.lastCmd=l.time);for(const d of l.pickups){if(d.z>l.z-3.5)break;if(!i.seen.has(d.id))if(i.seen.add(d.id),d.kind==="lantern"){const g=R3(d.id,d.v);i.lSpawn[g]++,d.taken&&i.lTaken[g]++}else i.bSpawn[d.kind]++,d.taken&&i.bTaken[d.kind]++}for(const d of l.obstacles){if(!d.passed||i.rows.has(d.row)||(i.rows.add(d.row),l.hurtRow===d.row||l.mode!=="run"))continue;const g=l.time-l.dodgeTime;g<1.5&&Ko(d,l.dodgeX,l.thermalV,0)&&i.leads.push(g),d.kind==="bridge"&&i.lowSince>=0&&l.time-i.lowSince>=.5&&i.bridgesFromLow++}},finish(l,f,m,d,g="crash"){if(r)return null;r=!0,s=performance.now(),f??=i.crash;const v=[...i.frames].sort((x,M)=>x-M),p=i.frames.reduce((x,M)=>x+M,0),k=[...i.leads].sort((x,M)=>x-M),b=Xu(),w=Yo(),y=t.quality();return{lv:1,route:e,rv:d,sv:Qe,alt:o,build:_3,session:L3,runNo:a,wait:c,dist:Math.floor(l.z),dur:rn(l.time),score:we(l),crash:f,end:g,tainted:m,hurts:i.hurts,device:{tier:y.tier,gov:rn(p>0?i.scaleSum/p:y.scale),fps50:Math.round(v.length?1/Na(v,.5):0),fps5:Math.round(v.length?1/Na(v,.95):0),input:n.touch&&n.key?"mixed":n.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:w.ghosts,music:b.music?w.music:"off",tutorial:P3()},death:f?{phase:Math.round(Z(l.z)),zone:I3(l.z),tier:Ml(l),sinceCmd:rn(l.time-i.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust),boost:Math.round(l.parts.boost)},lanterns:{spawned:i.lSpawn,taken:i.lTaken,bestStreak:l.bestStreak,avgMult:rn(l.time>0?i.multSum/l.time:1)},tiers:{low:rn(i.tiers.low),zero:rn(i.tiers.zero),high:rn(i.tiers.high),thermal:rn(i.tiers.thermal)},swipes:i.swipes,bridgesFromLow:i.bridgesFromLow,boosters:{spawned:i.bSpawn,taken:i.bTaken},lead:{p10:rn(Na(k,.1)),p50:rn(Na(k,.5)),n:k.length},ghosts:{shown:i.shown,deathNear:i.deathNear}}}}}const Hc="skyrun.pending",H3=12e4,kl=[1500,4e3];function za(){try{const t=JSON.parse(localStorage.getItem(Hc)??"[]");return Array.isArray(t)?t:[]}catch{return[]}}function Ii(t){try{t.length?localStorage.setItem(Hc,JSON.stringify(t)):localStorage.removeItem(Hc)}catch{}}function Sl(t){const n=Date.now(),e=[Rc(new Date(n)),Rc(new Date(n-864e5))].map(o=>o.slice(0,10));return typeof t.route=="string"&&e.includes(t.route.slice(0,10))&&!!t.run}function F3(t){let n=performance.now(),e=!1;const o=s=>new Promise(c=>setTimeout(c,s));async function a(s,c){for(let i=0;;i++){const r=await t.submit(s,c);if(r)return{ok:r};const h=t.lastFailure()??{kind:"network",status:0};if(h.kind!=="network"||i>=kl.length)return{fail:h};await o(kl[i])}}return{keepAlive(s){const c=performance.now();c-n<H3||(n=c,t.ping().then(i=>{i!=="auth"||e||(e=!0,s())}))},async submit(s,c){n=performance.now();const i={route:s,run:c,at:Date.now()};Ii([...za().filter(Sl),i].slice(-3));const r=await a(s,c);return(!("fail"in r)||r.fail.kind==="rejected")&&Ii(za().filter(h=>h.at!==i.at||h.route!==s)),r},async flush(){const s=za().filter(Sl),c=[],i=[];for(const r of s)await t.submit(r.route,r.run)?c.push(r.run.dist):t.lastFailure()?.kind!=="rejected"&&i.push(r);return(s.length||za().length)&&Ii(i),c}}}const $3=160;function G3(t,n){const e=document.createElement("div");e.className="ghost-layer";const o=Array.from({length:n},()=>{const r=document.createElement("div");return r.className="ghost-tag",e.appendChild(r),r}),a=document.createElement("span");a.className="ghost-rank",a.hidden=!0,t.appendChild(e),(t.querySelector(".hud-rank-slot")??e).appendChild(a);const s=new _,c=new WeakMap;let i="";return{update(r,h,u,l,f,m){e.classList.toggle("on",m&&u.length>0);const d=m&&l&&l.total>1?`#${l.place}/${l.total}`:"";if(d!==i&&(i=d,a.hidden=!d,a.classList.toggle("first",l?.place===1),a.innerHTML=d?`${O.wingsuit}#${l.place}<small>/${l.total}</small>`:""),!m)return;const g=t.clientWidth,v=t.clientHeight;o.forEach((p,k)=>{const b=k<h.count?u[h.owner[k]]:void 0,w=h.alphas[k]??0;if(!b||w<.15||Math.abs(b.at.z-f)>$3){p.style.opacity="0";return}if(s.copy(h.heads[k]).project(r),s.z>1){p.style.opacity="0";return}const y=b.self?"Kỷ lục của bạn":b.run.name;p.classList.toggle("self",b.self),p.textContent!==y&&(p.textContent=y,c.set(p,p.offsetWidth/2));const x=c.get(p)??0,M=Math.min(Math.max((s.x+1)*.5*g,x+6),g-x-6);p.style.opacity=Math.min(1,w*1.6).toFixed(2),p.style.transform=`translate(${M.toFixed(1)}px, ${((1-s.y)*.5*v).toFixed(1)}px) translate(-50%, -100%)`})}}}const Qa=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function O3(){const t=document.createElement("button");t.type="button",t.className="board-btn",t.setAttribute("aria-label","Bảng xếp hạng"),t.innerHTML=`<span class="board-btn-icon" aria-hidden="true">${O.trophy}</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>`,t.hidden=!0;const n=t.querySelector(".board-btn-rank");t.addEventListener("click",()=>t.classList.remove("fresh"));const e=o=>{n.hidden=!o,n.textContent=o?`#${o}`:""};return{el:t,setRank:e,bump(o){e(o),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump","fresh")},seen:()=>t.classList.remove("fresh")}}function D3(t,n,e,o){const a=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!a||Qa())return e.bump(o);const s=t.getBoundingClientRect(),c=n.getBoundingClientRect(),i=a.getBoundingClientRect(),r=c.left+c.width/2-s.left,h=c.top+c.height/2-s.top,u=i.left+i.width/2-s.left-r,l=i.top+i.height/2-s.top-h,f=document.createElement("div");f.className="rank-fly",f.innerHTML=O.trophy,f.style.left=`${r}px`,f.style.top=`${h}px`,t.appendChild(f);const m=(v,p,k)=>`translate(calc(-50% + ${v}px), calc(-50% + ${p}px)) scale(${k})`;let d=!1;const g=()=>{d||(d=!0,f.remove(),e.bump(o))};f.animate([{transform:m(0,0,.6),opacity:0},{transform:m(u*.3,l*.45-70,1.7),opacity:1,offset:.35},{transform:m(u,l,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=g,setTimeout(g,900)}const Ja=t=>Math.floor(t).toLocaleString("vi-VN"),Ca="meters",Ea=900;function U3(t,n){const e=document.createElement("li");e.className=t.pos==="me"?"me":`ctx ${t.pos}`;for(const[o,a]of[["r",`#${t.rank}`],["n",t.pos!=="me"?t.name:"Bạn"],["v",Ja(t.value)+n]]){const s=document.createElement("span");s.className=o,s.textContent=a,e.appendChild(s)}return e}function Tl(t,n,e,o,a){const s=performance.now(),c=()=>{t.textContent=a(e)},i=r=>{const h=Math.min(1,(r-s)/o);t.textContent=a(Math.round(n+(e-n)*(1-(1-h)**3))),h<1&&requestAnimationFrame(i)};requestAnimationFrame(i),setTimeout(c,o+80)}function K3(t){let n,e=0;async function o(){const s=e,c=await t.client.leaderboard(Ca);if(s!==e||!("ok"in c))return;const i=c.ok.mine;n=i?{rank:i.rank,value:i[Ca]??0}:null,i&&Zm(Bt,i.meters??0),t.button.setRank(i?.rank??null)}function a(s,c,i,r,h){const{by:u,rank:l,best:f,improved:m,climbed:d}=c,{tab:g,unit:v}=t.text(u),p=J=>r[J-1],k=[],b=p(l-1),w=p(l+1);b&&k.push({rank:l-1,name:b.name,value:b[u]??0,pos:"above"}),k.push({rank:l,name:h,value:f,pos:"me"}),w&&k.push({rank:l+1,name:w.name,value:w[u]??0,pos:"below"});const y=document.createElement("div");y.className="rank-card",y.setAttribute("role","button"),y.setAttribute("aria-label",`Xem bảng xếp hạng ${g}`);const x=document.createElement("div");x.className="rank-head",x.innerHTML=`${O.trophy}<b>Bảng xếp hạng</b><span class="by"></span><span class="rank-chip" hidden></span>`,x.querySelector(".by").textContent=`· ${g}`;const M=x.querySelector(".rank-chip");M.textContent=m?i===null?"Mới lên bảng":d&&i?`▲ ${i.rank-l}`:"Kỷ lục mới":"";const z=document.createElement("ol");z.className="rank-rows";const C=k.map(J=>U3(J,v));z.append(...C);const E=document.createElement("div");E.className="rank-note";const A=(i?r.slice(l,i.rank):i===null?r.slice(l):[]).map(J=>J.name),S=A.length>2?`${A.slice(0,2).join(", ")} +${A.length-2}`:A.join(", ");E.textContent=l===1&&d?"Bạn đang dẫn đầu bảng!":d&&S?`Vượt ${S}!`:i===null?"Đã có tên trên bảng!":d?`Lên hạng #${l}!`:l===1?m?"Kỷ lục mới — giữ ngôi #1":"Bạn vẫn giữ ngôi #1":m?`Kỷ lục mới — giữ hạng #${l}`:b?`Vượt ${Ja(b[u]??0)}${v} để lên #${l-1}`:`Bay xa hơn để vượt #${l-1}`;const L=document.createElement("span");L.className="rank-more",L.textContent="Cả bảng ›",E.appendChild(L),y.append(x,z,E),Zt(y);let I=!1;y.addEventListener("click",J=>{J.stopPropagation(),I=!0,t.button.seen(),t.open(u)}),s.before(y);const B=C[k.findIndex(J=>J.pos==="me")],U=B.querySelector(".r"),W=()=>{M.hidden=!M.textContent,m&&B.classList.add("shine"),setTimeout(()=>{if(!m||I)return t.button.setRank(l);y.isConnected?D3(t.root,U,t.button,l):t.button.bump(l)},Qa()?0:450)};if(!d||Qa())return void setTimeout(W,Qa()?0:400);const Q=B.getBoundingClientRect().height+2,nt=w?C[C.length-1]:void 0,et={duration:Ea,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};B.animate([{transform:`translateY(${Q}px)`,opacity:nt?1:0},{transform:"none",opacity:1}],et),nt?.animate([{transform:`translateY(${-Q}px)`},{transform:"none"}],et),U.textContent=i?`#${i.rank}`:"#–";const ft=B.querySelector(".v");i&&(ft.textContent=Ja(i.value)+v),setTimeout(()=>{i?Tl(U,i.rank,l,Ea,J=>`#${J}`):U.textContent=`#${l}`,Tl(ft,i?.value??0,f,Ea,J=>Ja(J)+v)},380),setTimeout(W,380+Ea)}return{snapshot:o,async celebrate(s,c,i){e++;const r=s.metersRank!==void 0?"meters":"score",h=r===Ca?n:void 0,u=i?t.root.querySelector(".screens.over .over-card [data-online]"):null,l=u?await t.client.leaderboard(r):null,f=l&&"ok"in l?l.ok:null,m=f?.mine?.rank??s.metersRank??s.scoreRank,d=f?.mine?.[r]??(r==="meters"?s.bestMeters??0:s.bestScore);r===Ca&&(n={rank:m,value:d});const g=r==="meters"?c.dist:c.score,v=h===null||(h!==void 0?d>h.value:g>=d),p=v&&(h===null||h!==void 0&&h.rank>m);if(u?.isConnected)return a(u,{by:r,rank:m,best:d,improved:v,climbed:p},h,f?.top??[],f?.mine?.name??"");t.button.setRank(m),v&&t.button.el.classList.add("fresh")}}}function V3(t,n){const e=t.querySelector(".me");if(!e)return;e.style.position="static";const o=e.getBoundingClientRect(),a=t.getBoundingClientRect();e.style.position="",t.scrollTop+=o.top-a.top-(a.height-o.height)/2,n&&e.classList.add("me-new")}const Jo=t=>Math.floor(t).toLocaleString("vi-VN"),fe={meters:{tab:"Quãng xa",icon:"route",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",icon:"star",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",icon:"lantern",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},Al=["meters","score","lanterns"];function q3(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":t.kind==="network"?`Chưa tải được bảng (${t.status?`máy chủ báo lỗi ${t.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${t.why??t.status}).`}const Zn=(t,n,e,o="span")=>{const a=document.createElement(o);a.className=n,a.textContent=e,t.appendChild(a)},W3=t=>(t.trim().split(/\s+/).pop()??"?").charAt(0).toUpperCase()||"?",Y3=(t,n)=>n==="meters"?dl(t.route):`${Jo(t.dist)} m · ${dl(t.route)}`;function Nl(t,n,e,o){const a=document.createElement("li");return a.className=o?"me":"",Zn(a,"board-rank",`#${e}`),Zn(a,"board-name",o?"Bạn":t.name),Zn(a,"board-score",Jo(t[n]??0)+fe[n].unit),Zn(a,"board-meta",Y3(t,n)),a}function j3(t,n,e){return t.slice(0,3).map((o,a)=>{const s=document.createElement("div");return s.className=`pod pod-${a+1}${o.pid===e?" me":""}`,Zn(s,"pod-avatar",W3(o.name)),Zn(s,"pod-name",o.pid===e?"Bạn":o.name),Zn(s,"pod-val",Jo(o[n]??0)+fe[n].unit,"b"),Zn(s,"pod-step",String(a+1)),s})}const X3=[1500,4e3];function Z3(t,n){const e=O3(),o=e.el,a=document.createElement("div");a.className="board-panel",a.hidden=!0;const s=Al.map(x=>`<button type="button" role="tab" class="ui-seg" data-by="${x}">${O[fe[x].icon]}${fe[x].tab}</button>`).join("");a.innerHTML=`
    <div class="board-card ui-indigo ui-trim" role="dialog" aria-label="Bảng xếp hạng">
      <div class="panel-head">${O.trophy}<div><b>${gt.name}<span class="panel-pill board-season"></span></b><small class="board-sub"></small></div></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="board-tabs" role="tablist">${s}</div>
      <p class="board-status"></p>
      <button type="button" class="ui-btn-cloth board-retry" hidden>${O.rotate}Thử lại</button>
      <div class="board-scroll" data-scroll><div class="board-podium" hidden></div><ol class="board-list"></ol></div>
    </div>`,t.append(o,a);const c=a.querySelector(".board-season"),i=a.querySelector(".board-sub"),r=a.querySelector(".board-status"),h=a.querySelector(".board-retry"),u=a.querySelector(".board-list"),l=a.querySelector(".board-podium"),f=a.querySelector("[data-scroll]"),m=[...a.querySelectorAll(".board-tabs button")];c.textContent=`Mùa ${Qe}`;let d="meters";const g={};Zt(o),Zt(a);let v=0,p=!1;const k=()=>{a.hidden=!0,v++,p=!1};function b(){for(const x of m)x.setAttribute("aria-selected",String(x.dataset.by===d));i.textContent=fe[d].sub}async function w(){a.hidden=!1,b(),h.hidden=!0,r.textContent="Đang tải…",r.classList.remove("empty"),u.replaceChildren(),l.replaceChildren(),l.hidden=!0;const x=++v,M=d,z=fe[M];let C=await n.leaderboard(M);for(const T of X3){if(x!==v||"ok"in C||C.fail.kind!=="network")break;await new Promise(A=>setTimeout(A,T)),x===v&&(C=await n.leaderboard(M))}if(x!==v)return;if("fail"in C){const T=g[M];r.textContent=q3(C.fail)+(T?` Bảng ĐÃ ghi ${z.best} của bạn: ${Jo(T.best)}${z.unit} — hạng #${T.rank}.`:""),h.hidden=C.fail.kind==="auth";return}const E=C.ok;if(c.textContent=`Mùa ${E.season}`,!E.top.length){r.innerHTML=`${O.lantern}<span>${z.empty}</span>`,r.classList.add("empty");return}if(r.textContent=`${Jo(E.total)} ${z.count}`,l.replaceChildren(...j3(E.top,M,E.me)),l.hidden=!1,u.replaceChildren(...E.top.slice(3).map((T,A)=>Nl(T,M,A+4,T.pid===E.me))),E.mine&&!E.top.some(T=>T.pid===E.me)){const T=document.createElement("li");T.className="board-gap",T.textContent="…",u.append(T,Nl(E.mine,M,E.mine.rank,!0))}V3(f,p),p=!1}const y=K3({root:t,client:n,button:e,text:x=>fe[x],open:x=>(d=x,p=!0,void w())});y.snapshot(),o.addEventListener("click",()=>{w()}),h.addEventListener("click",()=>{w()});for(const x of m)x.addEventListener("click",()=>{d=Al.find(M=>M===x.dataset.by)??"meters",w()});return a.querySelector("[data-close]").addEventListener("click",k),a.addEventListener("click",x=>{x.target===a&&k()}),window.addEventListener("keydown",x=>{x.code==="Escape"&&!a.hidden&&k()}),{setAvailable(x){o.hidden!==!x&&(o.hidden=!x,x||k())},runStart(){k(),y.snapshot()},remember(x,M,z){g.score={best:x.bestScore,rank:x.scoreRank},x.metersRank!==void 0&&(g.meters={best:x.bestMeters??0,rank:x.metersRank}),Zm(gt.id,x.bestMeters??0),x.lanternRank!==void 0&&(g.lanterns={best:x.bestLanterns??0,rank:x.lanternRank}),y.celebrate(x,M,z)}}}const Me=t=>Math.floor(t).toLocaleString("vi-VN");function Q3(t,n){const e=t.runs[0];if(n)return e?[{icon:"wingsuit",text:`Bóng hôm nay ${Me(e.dist)} m`}]:[];if(!e)return[{icon:"crown",text:"Chưa ai bay hôm nay — mở đường!"}];const o=e.pid===t.me?"Bạn":e.name;return[{icon:"users",text:`${Me(t.total)} người bay hôm nay`},{icon:"crown",text:`${o} ${Me(e.dist)} m`}]}function J3(t,n){return n?[{icon:"wingsuit",text:t.saved?`Bóng mới ${Me(t.best)} m`:`Bóng hôm nay ${Me(t.best)} m`}]:[]}function ty(t,n){return{score:n.score>=t.bestScore?t.scoreRank:null,lantern:t.lanternRank&&n.lanterns>=(t.bestLanterns??0)?t.lanternRank:null}}function ny(t,n){if(!t)return null;let e=0,o=0;for(const s of t.runs)s.pid===t.me&&(e=s.dist);const a=Math.max(n,e);for(const s of t.runs)s.pid!==t.me&&s.dist>a&&o++;return{place:o+1,total:t.total+(e>0?0:1)}}const ey=t=>`Ván có bot lái hoặc nhảy quãng — ${t?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function oy(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":t.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${t.why??t.status}).`}function ay(t){return t.type==="pass"?t.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${t.name}!`,"combo"]:t.type==="passed"?[t.self?"Kỷ lục của bạn vượt lên":`${t.name} vượt lên`,"big"]:[t.self?`Kỷ lục của bạn dừng ở ${Me(t.dist)} m`:`${t.name} rơi ở ${Me(t.dist)} m`,"big"]}const sy=200,iy=1.2,cy=t=>Math.floor(t).toLocaleString("vi-VN");function ry(t){const n=h3(t.params),e=ed(t.params),o=e?x3(C3()):u3(t.params),a=od(t.params)?B3({quality:t.quality}):null,s=w3(),c=F3(o),i=b3(),r=G3(t.root,sd),h=n&&!e?Z3(t.root,o):null;let u="",l=0,f=!1,m=-9,d=null,g=0,v=!1,p=0,k=null,b="";const w=M=>{b=M,t.screens.setOnline(M)},y=(M,z,C)=>{const E=M&&a?.finish(M,z,v,t.rv,C);E&&o.logRun(E)};a&&addEventListener("pagehide",()=>f&&y(a.state(),null,"close"));async function x(M,z){u=M;const C=++l,E=await c.flush(),T=await o.board(M);if(C!==l||!T)return;k=T;const A=E.length?`Đã gửi bù ván ${cy(Math.max(...E))} m`:"";z?(t.screens.setChips(Q3(T,e)),w(A)):A&&w(b?`${b} · ${A}`:A);const S=y3(T),L=await o.paths(M,S.map(B=>B.pid));if(C!==l)return;const I=S.filter(B=>L[B.pid]).map(B=>({run:B,self:B.pid===T.me,path:L[B.pid]}));f?d=I:i.set(I)}return n&&x(t.route,!0),{runStart(M,z){n&&z!==u&&(i.set([]),d=null,x(z,!1)),d&&i.set(d),d=null,s.start(M),i.reset(),f=!0,h?.runStart(),m=-9,g++,v=!1,p=M.z,a?.start(M,z,t.params.has("alt"))},afterStep(M,z){(z||Math.abs(M.z-p)>10)&&(v=!0),p=M.z,s.afterStep(M),a?.afterStep(M,1/60)},present(M,z,C,E){const T=f&&(M.mode==="run"||M.mode==="crash"),A=s.seconds()-(1-C)/60;if(T)for(const S of i.update(A,z.z))M.mode!=="run"||A-m<iy||(m=A,t.hud.toast(...ay(S)));if(n&&!e&&c.keepAlive(()=>T?t.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):w(`${b?`${b} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),t.view.update(T?i.ghosts():[],z,A,E,t.camera.position),a&&M.mode==="run"){let S=!1;for(let L=0;L<t.view.count;L++)S||=t.view.heads[L].distanceTo(t.camera.position)<15;a.frame(E,t.view.count,S)}r.update(t.camera,t.view,i.ghosts(),ny(k,z.z),z.z,T),h?.setAvailable(t.screens.visible()!==null)},async progress(){if(!n||e)return null;const M=await o.progress();return M?{score:M.season===Qe?M.score:{},meters:M.meters??{},run:M.run??{}}:null},runAbandon(M){f&&y(M,null,"abandon"),f=!1},async runOver(M,z){if(f=!1,y(M,z,"crash"),!n||!u||M.z<sy)return;if(v)return w(ey(e));const C=g;e||w("Đang gửi ván lên bảng…");const E=await c.submit(u,{sv:Qe,lanterns:M.lanterns,dist:Math.floor(M.z),score:we(M),dur:Math.min(3600,Math.round(s.seconds()*10)/10),crash:s.truncated()?null:z,path:s.finish()});C===g&&("fail"in E?w(oy(E.fail)):(w(""),t.screens.setChips(J3(E.ok,e)),e||t.screens.setRanks(ty(E.ok,{score:we(M),lanterns:M.lanterns})))),"ok"in E&&h?.remember(E.ok,{dist:Math.floor(M.z),score:we(M)},C===g),"ok"in E&&await x(u,!1)}}}const cd=()=>`<button type="button" class="ui-badge" data-snd="sfx" aria-label="Tắt/bật tiếng hiệu ứng">${O.speaker}</button><button type="button" class="ui-badge" data-snd="music" aria-label="Tắt/bật nhạc nền">${O.note}</button>`;function ly(t,n){const e=document.createElement("div");e.className="sound-btns",e.dataset.state="idle",e.innerHTML=cd(),t.appendChild(e),Zt(e);const o=()=>{const s=n.prefs();for(const c of t.querySelectorAll("[data-snd]"))c.classList.toggle("off",!s[c.dataset.snd])},a=s=>{n.prefs()[s]&&n.justUnlocked()||(s==="sfx"?n.toggleSfx:n.toggleMusic)(),o()};return t.addEventListener("click",s=>{const c=s.target instanceof Element?s.target.closest("[data-snd]"):null;c&&(s.stopPropagation(),a(c.dataset.snd==="sfx"?"sfx":"music"))}),o(),{sync:o,toggle:a,el:e}}const hy=.8;function uy(t,n,e){const o=document.createElement("button");o.type="button",o.className="ui-badge pause-btn",o.setAttribute("aria-label","Tạm dừng"),o.innerHTML=O.pause,n.prepend(o);const a=document.createElement("div");a.className="pause-screen",a.innerHTML=`<div class="pause-card ui-indigo ui-trim" role="dialog" aria-label="Tạm dừng">
      <div class="pause-title">${O.pause}Tạm dừng</div>
      <button type="button" class="ui-btn-lacquer" data-resume>${O.play}Bay tiếp</button>
      <div class="pause-row">${cd()}<button type="button" class="ui-badge" data-open-settings aria-label="Cài đặt">${O.gear}</button></div>
      <button type="button" class="ui-btn-cloth pause-home" data-home>${O.home}Về sảnh</button>
      <div class="pause-confirm" hidden><p>Bỏ ván này?</p><div class="row">
        <button type="button" class="ui-btn-cloth" data-stay>Ở lại</button><button type="button" class="ui-btn-cloth quit" data-quit>Bỏ ván</button></div></div>
      <div class="pause-hint">${e.touch?"Hoặc chạm ra ngoài bảng":"Hoặc bấm Space / P"}</div></div>`,t.appendChild(a),Zt(a);const s=a.querySelector("[data-home]"),c=a.querySelector(".pause-confirm"),i=d=>{c.hidden=!d,s.hidden=d};let r=!1,h=!1,u=!1,l=1;const f=()=>{a.classList.toggle("on",r),n.dataset.state=u?"crash":h?r?"paused":"run":"idle",r||i(!1)},m={paused:()=>r,pause(){!h||r||(r=!0,f())},resume(){r&&(r=!1,l=.15,f())},setRunning(d,g=!1){h===d&&u===g||(h=d,u=g,d||(r=!1),f())},factor(d){return r?0:(l=Math.min(1,l+d/hy),l)}};return o.addEventListener("click",()=>m.pause()),a.addEventListener("click",d=>{const g=d.target instanceof Element?d.target:null;g&&(g===a||g.closest("[data-resume]")?m.resume():g.closest("[data-home]")?i(!0):g.closest("[data-stay]")?i(!1):g.closest("[data-quit]")&&(m.resume(),e.onHome()))}),Zt(o),document.addEventListener("visibilitychange",()=>{document.hidden&&m.pause()}),window.addEventListener("keydown",d=>{!d.repeat&&(d.code==="KeyP"||d.code==="Escape")&&(r?m.resume:m.pause)()}),m}const my=1.2,Pi=new _,ko=new _,zl=new _;function Cl(t,n,e){const o=e.clientWidth,a=e.clientHeight;if(!o||!a||(t.getWorldPosition(Pi),ko.copy(Pi).project(n),ko.z>1))return null;zl.setFromMatrixColumn(n.matrixWorld,0).multiplyScalar(my).add(Pi).project(n);const s=Math.abs(zl.x-ko.x)*.5*o,c=(ko.x*.5+.5)*o,i=(.5-ko.y*.5)*a;return{x:c-s,y:i-s,w:2*s,h:2*s}}function dy(t,n="ui-chip"){const e=document.createElement("span");e.className=`${n}${t.tone?` ${t.tone}`:""}`,e.innerHTML=O[t.icon];const o=document.createElement("span");return o.textContent=t.text,e.appendChild(o),e}function rd(t,n,e){t&&(t.replaceChildren(...(n??[]).map(o=>dy(o,e))),t.hidden=!n?.length)}const fy=[["dragSide","Kéo ngang: lượn tránh cột đá","← →"],["swipeUp","Vuốt lên: vọt qua mỏm đá","↑"],["swipeDown","Vuốt xuống: chui dưới cầu","↓"],["lantern","Nhặt đèn trời: nhân điểm",""],["heart","Hai tim: va nhẹ chỉ mất một",""]];function gy(t){const n=document.createElement("div");n.className="help-panel",n.hidden=!0,n.innerHTML=`
    <div class="help-card ui-indigo ui-trim" role="dialog" aria-label="Cách chơi">
      <div class="panel-head">${O.help}<b>Cách chơi</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <ul class="help-rows">${fy.map(([o,a,s])=>`<li><span class="help-ic">${O[o]}</span><span>${a}</span>${s?`<kbd class="key-only">${s}</kbd>`:""}</li>`).join("")}</ul>
      <p class="help-keys key-only"><kbd>P</kbd> / <kbd>Space</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</p>
      <button type="button" class="ui-btn-lacquer" data-close>${O.check}Đã hiểu</button>
    </div>`,t.appendChild(n),Zt(n);const e=()=>{n.hidden=!0};return n.addEventListener("click",o=>{o.stopPropagation();const a=o.target instanceof Element?o.target:null;(a===n||a?.closest("[data-close]"))&&e()}),window.addEventListener("keydown",o=>{!n.hidden&&(o.code==="Escape"||o.code==="Space"||o.code==="Enter")&&e()},{capture:!0}),{open:()=>{n.hidden=!1}}}const Fn=t=>Math.floor(t).toLocaleString("vi-VN"),py={pillar:["pillar","dragSide","Kéo ngang sang làn trống","Bấm ← → sang làn trống"],spike:["spike","swipeUp","Vuốt lên để vọt qua","Bấm ↑ để vọt qua"],ridge:["ridge","swipeUp","Vuốt lên vọt qua sống đá","Bấm ↑ vọt qua sống đá"],bridge:["bridge","swipeDown","Vuốt xuống chui dưới cầu","Bấm ↓ chui dưới cầu"],overhang:["overhang","swipeDown","Vuốt xuống chui dưới mái đá","Bấm ↓ chui dưới mái đá"]},vy={spike:["house","swipeUp","Vuốt lên vọt qua nóc nhà","Bấm ↑ vọt qua nóc nhà"],ridge:["house","swipeUp","Vuốt lên vọt qua mái đình","Bấm ↑ vọt qua mái đình"],bridge:["house","swipeDown","Vuốt xuống chui qua cổng làng","Bấm ↓ chui qua cổng làng"]},yy=["bridge","swipeDown","Vuốt xuống chui dưới cabin","Bấm ↓ chui dưới cabin"];function by(t,n,e){if(matchMedia("(prefers-reduced-motion: reduce)").matches||n<=0)return void(t.textContent=Fn(n));const o=performance.now(),a=s=>{const c=Math.min(1,(s-o)/e);t.textContent=Fn(n*(1-(1-c)**3)),c<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(()=>{t.textContent=Fn(n)},e+80)}function wy(t,n){const[e,o]=t.querySelectorAll("[data-stats] > .ui-chip"),a=(s,c)=>{if(!s||!c||s.textContent?.startsWith("0 "))return;const i=s.querySelector(".chip-rank")??s.appendChild(document.createElement("b"));i.className="chip-rank",i.textContent=`#${c}`};a(e,n.score),a(o,n.lantern)}const xy=.9;function My(t,n){const e=Math.min(1,t/n);return`<div class="over-goal" role="img" aria-label="Đạt ${Math.floor(e*100)}% kỷ lục ${Fn(n)} m"><span class="goal-bar"><i style="width:${(e*100).toFixed(1)}%"></i></span><span class="goal-best">${O.trophy}Kỷ lục ${Fn(n)} m</span></div>`}function ky(t,n,e,o,a){const s=we(n),c=c5(Bt,n.z,s,a),i=Math.floor(n.z),r=!c.record&&!c.tie&&i<c.prevM,h=c.record?'<span class="ui-ribbon">Kỷ lục mới!</span>':c.tie?'<span class="ui-ribbon tie">Bằng kỷ lục</span>':r&&i>=c.prevM*xy?`<span class="over-kicker near">Suýt kỷ lục! Thiếu ${Fn(c.prevM-i)} m</span>`:'<span class="over-kicker">Hạ cánh khẩn cấp</span>',u=e?ne(n.z)&&vy[e]||e==="bridge"&&Vs(n.z)&&yy||py[e]:null;return t.innerHTML=`
    <div class="over-card ui-paper" role="dialog" aria-label="Kết thúc ván">
      <div class="over-left">
        <div class="over-head">${h}</div>
        <div class="over-hero"><span data-count>0</span><small>m</small></div>
        ${r?My(i,c.prevM):c.record&&c.prevM>0?`<div class="over-goal up">${O.trophy}Hơn kỷ lục cũ ${Fn(i-c.prevM)} m</div>`:""}
        <div class="over-chips" data-stats></div>
        ${u?`<p class="over-tip"><span class="ico">${O[u[0]]}${O[u[1]]}</span><span>${o?u[2]:u[3]}</span></p>`:""}
      </div>
      <div class="over-right">
        <div class="over-online-chips" data-chips hidden></div>
        <div class="screen-online" data-online hidden></div>
        <div class="over-actions">
          <button type="button" class="ui-btn-lacquer btn-play" data-play>${O.play}<span>Bay lại</span><kbd>Space</kbd></button>
          <button type="button" class="ui-btn-cloth" data-lobby aria-label="Về sảnh chọn map">${O.home}Sảnh</button>
        </div>
      </div>
    </div>`,rd(t.querySelector("[data-stats]"),[{icon:"star",text:`${Fn(s)} điểm`},{icon:"lantern",text:`${Fn(n.lanterns)} đèn`}]),by(t.querySelector("[data-count]"),n.z,900),c.record}const El=t=>Math.floor(t).toLocaleString("vi-VN");function Sy(){const t=Lr(Bt);return t?t.m>0?{icon:"trophy",text:`Kỷ lục ${El(t.m)} m`,tone:"gold"}:{icon:"trophy",text:`Kỷ lục ${El(t.score)} điểm`,tone:"gold"}:null}function Ty(){return`
    <div class="title-top">
      <img class="title-logo" src="ui/logo.webp" alt="Sky Run" width="840" height="263" decoding="async">
      <h1 class="title-word">Sky Run</h1>
      <button type="button" class="title-map" data-lobby aria-label="Chọn map — đang ở ${gt.name}">${O.mountain}<span>${gt.name}</span>${O.chevronDown}</button>
    </div>
    <div class="title-bottom">
      <div class="title-chips" data-chips hidden></div>
      <div class="title-actions">
        <button type="button" class="ui-badge title-help" data-help aria-label="Cách chơi">${O.help}</button>
        <button type="button" class="ui-btn-lacquer btn-play" data-play>${O.play}<span>Bay</span><kbd>Space</kbd></button>
      </div>
      <div class="screen-online" data-online hidden></div>
    </div>`}function Ay(t){const n=t.querySelector(".title-logo");if(!n)return;const e=()=>{t.classList.add("no-logo")};n.complete&&!n.naturalWidth?e():n.addEventListener("error",e,{once:!0})}const Ny=800,zy=350;function Cy(t,n,e){const o=document.createElement("div");o.className="screens",t.appendChild(o);const a=gy(t),s=matchMedia("(pointer: coarse)").matches;let c=null,i=0,r="",h=[],u=0;const l=()=>{const d=o.querySelector("[data-online]");d&&(d.textContent=r,d.hidden=!r);const g=c==="title"?Sy():null;rd(o.querySelector("[data-chips]"),g?[g,...h]:h)};o.addEventListener("click",d=>{const v=(d.target instanceof Element?d.target:null)?.closest("[data-play],[data-lobby],[data-help]");v&&(d.stopPropagation(),v.dataset.play!==void 0?n():v.dataset.lobby!==void 0?e():a.open())}),i5(()=>{c==="title"&&l()});const f=()=>{for(const d of o.querySelectorAll("button"))Zt(d)},m=()=>{clearTimeout(u),o.classList.remove("leaving")};return{visible:()=>c,tapReady:()=>c!=="over"||performance.now()-i>Ny,showTitle(){m(),c="title",o.className="screens title",o.innerHTML=Ty(),Ay(o),f(),l()},setOnline(d){r=d??"",l()},setChips(d){h=d??[],l()},setRanks(d){c==="over"&&wy(o,d)},showOver(d,g,v){m(),c="over",i=performance.now(),o.className="screens over";const p=ky(o,d,g,s,v);return f(),r="",h=[],l(),p},hide(){const d=c;if(c=null,d!=="title"||matchMedia("(prefers-reduced-motion: reduce)").matches){o.className="screens",o.innerHTML="";return}o.classList.add("leaving"),u=window.setTimeout(()=>{o.className="screens",o.innerHTML=""},zy)}}}const Ey=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],Ly={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách của map — hết bài tự sang bài khác"},Ll=t=>`<div class="two" data-sw="${t}"><button type="button" class="ui-seg" data-on="1">Bật</button><button type="button" class="ui-seg" data-on="0">Tắt</button></div>`;function _y(t,n,e,o,a){o.mode=Yo().ghosts;const s=document.createElement("button");s.type="button",s.className="ui-badge",s.dataset.openSettings="",s.setAttribute("aria-label","Cài đặt"),s.innerHTML=O.gear,n.el.insertBefore(s,n.el.querySelector("[data-snd]"));const c=document.createElement("div");c.className="settings-panel",c.hidden=!0,c.innerHTML=`
    <div class="settings-card ui-indigo ui-trim" role="dialog" aria-label="Cài đặt">
      <div class="panel-head">${O.gear}<b>Cài đặt</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="settings-scroll" data-scroll>
        <h3>${O.speaker}Âm thanh</h3>
        <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span>${Ll("sfx")}</div>
        <div class="settings-row"><span>Nhạc nền</span>${Ll("music")}</div>
        <h3>${O.note}Chọn nhạc nền <small data-map-music></small></h3><p class="settings-note"></p><div class="settings-music"></div>
        <h3>${O.wingsuit}Bóng ma <small>người đã bay hôm nay</small></h3><div class="settings-ghost"></div>
      </div>
    </div>`,t.append(c),Zt(c);const i=c.querySelector(".settings-note");c.querySelector("[data-map-music]").textContent=`nhạc của ${gt.name}`;const r=[Ly,...Hs(gt.id)].map(d=>{const g=document.createElement("button");return g.type="button",g.className=`ui-seg settings-opt${d.id==="shuffle"?" shuffle":""}`,g.dataset.music=d.id,g.title=d.style,g.innerHTML='<span class="name"></span><span class="now">♪</span>',g.querySelector(".name").textContent=d.label,g});c.querySelector(".settings-music").append(...r);const h=Ey.map(([d,g])=>{const v=document.createElement("button");return v.type="button",v.className="ui-seg",v.dataset.ghost=d,v.innerHTML=`${O.wingsuit}<span>${g}</span>`,v});c.querySelector(".settings-ghost").append(...h);const u=()=>{const d=e.music(),g=d?.choice()??Yo().music,v=d?.playing()?.id,p=d?.loading()?.id;for(const b of r){const w=b.dataset.music;b.classList.toggle("on",w===g),b.classList.toggle("playing",w===v||w===p),b.classList.toggle("loading",w===p)}const k=e.prefs();i.textContent=k.music?"":"Nhạc đang tắt — chọn một bài là bật lại.";for(const b of h)b.classList.toggle("on",b.dataset.ghost===o.mode);for(const b of c.querySelectorAll("[data-sw] [data-on]")){const w=b.parentElement.dataset.sw;b.classList.toggle("on",k[w]===(b.dataset.on==="1"))}};let l=0;const f=()=>{c.hidden=!0,clearInterval(l)},m=()=>{a.pause(),c.hidden=!1,u(),l=window.setInterval(u,1e3)};Zt(s),t.addEventListener("click",d=>{d.target instanceof Element&&d.target.closest("[data-open-settings]")&&m()}),c.addEventListener("click",d=>{const g=d.target instanceof Element?d.target:null;if(g===c||g?.closest("[data-close]"))return f();const v=g?.closest("[data-music],[data-ghost],[data-on]");if(v){if(v.dataset.on){const p=v.parentElement.dataset.sw;e.prefs()[p]!==(v.dataset.on==="1")&&(p==="sfx"?e.toggleSfx:e.toggleMusic)()}else v.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(v.dataset.music)):(o.mode=v.dataset.ghost,Zu({ghosts:o.mode}));n.sync(),u()}}),window.addEventListener("keydown",d=>{c.hidden||(d.stopPropagation(),d.code==="Escape"&&f())},{capture:!0})}const ld=`
// Trọng số TRIPLANAR sắc (ba mặt chiếu xz / zy / xy). Bản biplanar cũ của đá chỉ có hai mặt đứng → mặt ngửa (nóc sống đá,
// gờ) lấy mẫu theo (z, y) với y gần hằng số = nhiễu một chiều = VỆT KÉO DÀI (giám khảo gọi "stretched UV"). Trừ 0,3 rồi bình
// phương: mặt chiếu yếu về đúng 0 → nhánh if bỏ được nó mà không có đường nối (luôn còn ít nhất một trục ≥ 0,577).
// TERRAIN_LITE (tầng low): chỉ trục trội — có đường nối ở vách chéo 45°, đổi lấy 1/2–1/3 số phép nhiễu.
vec3 grTriW(vec3 n) {
#ifdef TERRAIN_LITE
  vec3 a = abs(n);
  return a.x > a.y && a.x > a.z ? vec3(1.0, 0.0, 0.0) : (a.y > a.z ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0));
#else
  vec3 w = max(abs(n) - 0.3, 0.0);
  w *= w;
  return w / (w.x + w.y + w.z);
#endif
}

// Khối granite trên MỘT mặt chiếu p (m, p.y = chiều cao với mặt đứng), bề ngang khối s (m): CỘT theo khe dọc (bề rộng s, mép
// cột lượn chậm theo nhiễu 2s × 3s nên khe nghiêng / cong nhẹ, không thẳng thước), mỗi cột bẻ thành KHỐI cao 1,8–4,2s ở độ cao
// riêng của cột (hàng gãy không thẳng hàng giữa các cột — thẳng hàng là "khán đài bậc", vòng 7–9). Mỗi khối một tông + độ nhô,
// mép vát → grBump ra cạnh bắt sáng / bóng; chân khối sẫm (vệt nước + bóng gờ trên). Vân dọc chỉ dài tới 3s (vệt 25–45 m bị
// chấm "kéo giãn", vòng 12–13).
// BẪY 03/11 (bản đầu): khe = đường đẳng trị 0,5 của nhiễu → mạng đường ngoằn ngoèo khép kín đều khắp mặt đá, đọc ra BẢN ĐỒ
// biên giới / đất nứt nẻ chứ không ra đá. Khe đá thật gần thẳng, theo hệ, và THƯA.
// fw = m / điểm ảnh: khe hẹp hơn ~1 điểm ảnh thì mờ dần (không lấp lánh) → xa tự về mặt đá trơn.
// Trả (độ nhô 0..1 — nhân biên độ m ở nơi gọi, khe 0..1, tông 0..1, độ cao trong khối 0 = chân .. 1 = đỉnh).
// lk: hệ số chiều CAO khối (1 = khối cao 1,8–4,2s như vách; đá chướng ngại 0,55 — vân dọc dài trên thân tháp = "thớ gỗ", vòng 16).
vec4 grJoints(vec2 p, float s, float fw, float lk) {
  // Vòng 16 (giám khảo: "khe lặp đều như SÀN GỖ GHÉP", "khối ốp đều" ở 50–150 m): nhiễu LỚN 8s bẻ cong toạ độ cột / hàng → bề
  // ngang khối đổi 0,6–2× theo vùng, hàng gãy nghiêng theo dốc của nhiễu; vùng ĐÁ LIỀN (nhiễu 5s) không khe, tông mượt. Bẻ bằng
  // cộng nhiễu vào toạ độ, KHÔNG nhân s theo nhiễu: toạ độ tuyệt đối hàng nghìn mét × s đổi chút = vân trượt trăm mét (bẫy 01/11).
  float big = gnNoise(p / (8.0 * s) + 2.7);
  // 0 = đá liền, 1 = có hệ khe. Vách (lk = 1): ~55% đá liền; đá chướng ngại (lk < 1) nhìn sát nên ít đá liền hơn (~30%) — mặt tháp
  // cách 3–6 m toàn đá liền thì trơn như vữa (khung đèn 850 vòng 17).
  float jt = 0.3 * (1.0 - lk);
  float joint = smoothstep(0.42 - jt, 0.6 - jt, gnNoise(p / (5.0 * s) + 6.3));
  float u = p.x / s + 1.1 * gnNoise(vec2(p.x / (2.6 * s), p.y / (3.0 * s))) + 2.6 * big;
  float ci = floor(u);
  float cf = u - ci;
  float hc = gnHash(vec2(ci, 3.7));
  float L = s * lk * (1.8 + 2.4 * hc);
  // Hàng gãy nghiêng nhẹ theo cột (±8°) + lượn theo nhiễu: gờ bóc vỏ thật không nằm ngang tuyệt đối.
  float v = p.y / L + hc * 7.3 + (hc - 0.5) * 0.28 * cf + 0.18 * gnNoise(p / (0.7 * s) + 5.1) + 1.6 * big;
  float bi = floor(v);
  float bf = v - bi;
  float hb = gnHash(vec2(ci, bi) + 11.3);
  float aa = fw / s;
  float jw = 0.03 + 0.03 * hc + aa;  // nửa bề rộng khe theo đơn vị cột — mỗi cột một độ mở (khe đều nét = nét bút vẽ)
  float jv = jw * s / L;  // cùng bề rộng theo MÉT (bản đầu nhân ngược L / s → gờ ngang vát dày gấp 4–16 lần = mái ngói xếp)
  float fade = (1.0 - smoothstep(0.2, 0.55, aa)) * joint;
  // Ranh cột cũng chỉ 60% có khe (cột liền nhau khác tông, không khe) — khe mọi ranh = tường đá xếp.
  // Đá chướng ngại (lk < 1): ít khe DỌC hơn (60% → ~45% ranh cột), nhiều khe NGANG hơn (45% → ~70% hàng gãy) — thân tháp
  // toàn khe dọc là "vỏ cây / thớ gỗ" (giám khảo vòng 16–17). Vách (lk = 1) giữ nguyên.
  float kv = 0.4 + 0.35 * (1.0 - lk);
  float kl = step(kv, gnHash(vec2(ci, 9.1)));
  float kr = step(kv, gnHash(vec2(ci + 1.0, 9.1)));
  float cv = max((1.0 - smoothstep(0.0, jw, cf)) * kl, (1.0 - smoothstep(0.0, jw, 1.0 - cf)) * kr);
  // Không phải hàng gãy nào cũng tách: 55% chỉ đổi tông / độ nhô, không khe — lưới khe kín đọc ra tường gạch. Mỗi RANH một
  // hash (ranh dưới = khối bi, ranh trên = khối bi + 1): hash theo khối đang tô thì khe chỉ có một nửa phía.
  float kh = 0.55 - 0.55 * (1.0 - lk);
  float kb = step(kh, gnHash(vec2(ci, bi) + 23.1));
  float kt = step(kh, gnHash(vec2(ci, bi + 1.0) + 23.1));
  float ch = max((1.0 - smoothstep(0.0, jv, bf)) * kb, (1.0 - smoothstep(0.0, jv, 1.0 - bf)) * kt);
  // Độ nhô chủ yếu theo CỘT; hàng gãy ngang chỉ là rãnh lõm, không bậc: ánh trời rọi từ trên nên mọi bậc ngang có mép sáng
  // + đáy tối → cả vách thành bậc thang / mái ngói (ảnh vòng này, khung đèn khe C). Mép cột vát → cạnh dọc bắt nắng.
  // Vát ở MỌI ranh (kể cả ranh không khe): độ nhô đổi theo cột / khối, ranh không vát = bậc gãy một điểm ảnh → đạo hàm 2×2 của
  // grBump ra NÉT ĐỨT chấm chấm dọc ranh (ảnh tháp kim sát camera).
  float edgeV = smoothstep(0.0, jw * 2.5, cf) * smoothstep(0.0, jw * 2.5, 1.0 - cf);
  float edgeH = smoothstep(0.0, jv * 2.5, bf) * smoothstep(0.0, jv * 2.5, 1.0 - bf);
  float h = (0.3 + 0.55 * hc + 0.15 * hb * edgeH) * edgeV * (1.0 - 0.5 * ch);
  // Vệt nước / địa y sẫm: dải dọc ~0,3s × 1,3s (≤ 13 m với s = 10 — vân dọc dài là "kéo giãn"), mép SẮC, đậm ngay dưới gờ trên
  // rồi nhạt dần xuống chân khối.
  float st = smoothstep(0.6, 0.66 + aa, gnNoise(vec2(p.x / (0.3 * s), p.y / (1.3 * s * lk) + hc * 5.0))) * smoothstep(0.05, 0.6, bf);
  // Vùng đá liền: tông theo nhiễu lớn, không theo khối (tông từng khối là thứ vẽ ra lưới ốp); vệt nước vẫn chảy trên đá liền.
  float tone = mix(0.35 + 0.4 * big, 0.2 + 0.55 * hc + 0.2 * hb, joint);
  return vec4(h * fade, max(cv, ch) * fade, tone - 0.5 * st * lk * (1.0 - smoothstep(0.2, 0.55, aa)), bf);  // vệt nước DỌC bớt trên đá chướng ngại (lk)
}

// Pháp tuyến chi tiết từ độ cao H (m) — Mikkelsen "bump mapping unparametrized surfaces": chỉ dùng đạo hàm màn hình của vị trí
// thế giới + H, độ dốc đúng theo mét ở mọi khoảng cách (bản perturbNormalArb của three chuẩn hoá dFdx(p) → gờ mạnh dần theo xa).
// PHẢI gọi ngoài nhánh rẽ không đồng nhất: dFdx trong nhánh rẽ khác nhau giữa các điểm ảnh là không xác định. H tính trong
// nhánh rẽ thì được — chỉ phép lấy đạo hàm phải ở ngoài.
vec3 grBump(vec3 p, vec3 n, float H) {
  vec3 dpx = dFdx(p);
  vec3 dpy = dFdy(p);
  vec3 r1 = cross(dpy, n);
  vec3 r2 = cross(n, dpx);
  float det = dot(dpx, r1);
  vec3 g = sign(det) * (dFdx(H) * r1 + dFdy(H) * r2);
  vec3 b = abs(det) * n - g;
  return dot(b, b) > 1e-14 ? normalize(b) : n;
}

// Cỡ điểm ảnh (m) tại mặt đang tô. Nhìn sượt (vách dọc đường bay) vết điểm ảnh dài gấp chục lần chiều kia: lấy cạnh dài thì
// chi tiết tắt hết ở đúng chỗ giám khảo soi (vách chạy dọc khung); lấy 40% từ cạnh ngắn → giữ nét, chấp nhận chút răng cưa dọc.
float grPixelM(vec3 p) {
  float a = length(dFdx(p));
  float b = length(dFdy(p));
  return mix(min(a, b), max(a, b), 0.4);
}
`,Ry=`
// Triplanar một mẫu nhiễu (các trọng số tw đã bỏ mặt chiếu yếu về 0 — nhánh if không có đường nối).
float grTri(vec3 tw, vec2 s) {
  float r = 0.0;
  if (tw.x > 0.0) r += tw.x * gnNoise(vec2(vWorld.z, vWorld.y) / s);
  if (tw.z > 0.0) r += tw.z * gnNoise(vec2(vWorld.x, vWorld.y) / s + 3.1);
  if (tw.y > 0.0) r += tw.y * gnNoise(vWorld.xz / s.x + 7.7);
  return r;
}

// PHẢI gọi trong nhánh đồng nhất (cờ vùng là uniform) — grBump lấy đạo hàm màn hình. n = pháp tuyến hình (đã chuẩn hoá);
// ghi nL = pháp tuyến chiếu sáng. Trả albedo trước viền nắng nóc (aCrest — ngôn ngữ "vọt qua được" giữ nguyên ở main).
vec3 graniteRock(vec3 n, out vec3 nL) {
  float fw = grPixelM(vWorld);
  vec3 tw = grTriW(n);
  // Khối 3,4 m (cột) × 6–14 m: khe dọc NGẮN của vòng 13 giờ là khe thật có mép (không chỉ vệt tối mềm).
  vec4 j = vec4(0.0);
  if (tw.x > 0.0) j += tw.x * grJoints(vec2(vWorld.z, vWorld.y), 3.4, fw, 0.55);
  if (tw.z > 0.0) j += tw.z * grJoints(vec2(vWorld.x, vWorld.y) + 3.1, 3.4, fw, 0.55);
  if (tw.y > 0.0) j += tw.y * grJoints(mat2(0.8, -0.6, 0.6, 0.8) * vWorld.xz, 3.4, fw, 0.55) * vec4(0.4, 0.4, 1.0, 1.0);  // mặt ngửa: ít khe (lát đá)
  // Khối NHỎ 1,1 m chỉ khi sát (< ~1 cm / điểm ảnh — tháp kim lướt cách camera 3–10 m): khối 3,4 m khi đó to hơn nửa khung,
  // mặt tháp lại thành tấm xám trơn (khung đèn khe C). Nhánh theo cỡ điểm ảnh — trong không có đạo hàm nên rẽ nhánh được.
  float nearK = 1.0 - smoothstep(0.02, 0.05, fw);  // ~1,5 / 4 cm mỗi điểm ảnh ≈ 25–30 m ở 768 px (vòng 16: "nhìn < 25 m vẫn trơn")
  if (nearK > 0.0) {
    vec4 k = vec4(0.0);
    if (tw.x > 0.0) k += tw.x * grJoints(vec2(vWorld.z, vWorld.y) + 1.7, 1.1, fw, 0.7);
    if (tw.z > 0.0) k += tw.z * grJoints(vec2(vWorld.x, vWorld.y) + 5.3, 1.1, fw, 0.7);
    if (tw.y > 0.0) k += tw.y * grJoints(mat2(0.8, -0.6, 0.6, 0.8) * vWorld.xz + 2.9, 1.1, fw, 0.7) * vec4(0.4, 0.4, 1.0, 1.0);
    // Nhẹ tay: rãnh 1,1 m sâu như khối lớn thì đạo hàm 2×2 điểm ảnh của H ra NÉT ĐỨT chấm chấm dọc khe (ảnh lant-c).
    j = vec4(j.x + 0.22 * k.x * nearK, max(j.y, 0.55 * k.y * nearK), j.z + 0.3 * (k.z - 0.5) * nearK, j.w);
  }
  // Vân bed / nứt phụ ĐẲNG HƯỚNG (bản 4 × 14 rồi 5 × 7 m: trên thân tháp 60–100 m vân dọc dù ngắn vẫn xếp thành "vỏ cây", vòng 16–17).
  float bed = grTri(tw, vec2(6.0, 6.0));
  float crack = smoothstep(0.8, 0.92, grTri(tw, vec2(3.0, 3.0)));
  // Loang tông 0,9 m, nhẹ (± 7%): dưới ~3 điểm ảnh thì về trung bình, không lấp lánh.
  float grain = mix(grTri(tw, vec2(0.9)), 0.5, smoothstep(0.12, 0.3, fw / 0.9));
  float t = clamp(0.55 * clamp(j.z, 0.0, 1.0) + 0.3 * bed + 0.15 * (grain - 0.5) + 0.12, 0.0, 1.0);
  // Granite xanh đen lạnh (cùng bảng màu vòng 8: xám vôi × 0,5 / 0,6 / 0,63) — tháp đá Hoàng Liên trên nền mây trắng.
  vec3 rock = mix(srgb(vec3(0.38, 0.38, 0.37)), srgb(vec3(0.8, 0.77, 0.7)), t) * vec3(0.5, 0.6, 0.63);
  // Khe đọc bằng BÓNG + mép sáng của pháp tuyến chi tiết nhiều hơn bằng màu: tô đen đậm ra nét mực vẽ tay ("gân lá", ảnh vòng này).
  rock *= (1.0 - 0.38 * j.y) * (1.0 - 0.3 * crack);
  // BỎ hạt felspat / mica 16 cm của vòng 16: nhìn sát 3–6 m mỗi hạt 10–20 điểm ảnh, ngưỡng sắc → đốm RẰN RI lính / nhiễu
  // pixel (cả hai giám khảo vòng 16). Hạt thật 1–2 cm, dưới một điểm ảnh — mặt đá gần đọc bằng khối + khe + pháp tuyến chi tiết.
  // Độ cao chi tiết (m): khối nhô 0,3 m + hạt. Mép vát của khối → cạnh bắt sáng / bóng qua nL — "khối cứng có cạnh", không còn
  // "tấm rèm xám" (khung đèn khe C vòng 14).
  // Nhám mặt đá CHỈ qua pháp tuyến (không qua màu) khi sát: hai tầng 30 / 10 cm, cao 4 / 1,2 cm — mặt tháp cách 3–6 m trơn
  // như vữa trát (khung đèn 850 vòng 17); qua màu với ngưỡng sắc thì thành đốm rằn ri (vòng 16).
  float rough = 0.0;
  float r3 = 0.5;
  if (nearK > 0.0) {
    r3 = grTri(tw, vec2(0.3));
    rough = nearK * 0.04 * r3 + 0.012 * (1.0 - smoothstep(0.008, 0.02, fw)) * grTri(tw, vec2(0.1));
  }
  // Loang tông MỀM theo cùng nhiễu nhám (± 6%, không ngưỡng): chỗ nhô sáng hơn chút — đọc ra mặt đá sần, không ra đốm.
  rock *= 1.0 + 0.12 * nearK * (r3 - 0.5);
  nL = grBump(vWorld, n, j.x * 0.38 + (grain - 0.5) * 0.035 + rough);
  // Rêu BÁM KHE + chân gờ (ít — granite trọc nóc tuyết là chủ ý) + mảng mờ lớn. Mảng mép sắc theo nhiễu ngưỡng ra đốm tròn
  // rằn ri (ảnh vòng này) — rêu thật theo nước chảy: trong khe, dưới gờ.
  float moss = max(smoothstep(0.5, 0.75, grTri(tw, vec2(7.0, 9.0))) * 0.2 * (1.0 - 0.6 * nearK), j.y * 0.35) * (1.0 - smoothstep(0.5, 0.8, nL.y));
  vec3 green = mix(srgb(vec3(0.16, 0.26, 0.09)), srgb(vec3(0.42, 0.5, 0.16)), grain);
  vec3 albedo = mix(rock, green, moss);
  // Chân SŨNG NƯỚC (mỏm giữa hồ W — "cọc hồ" vòng 17): mặt nước = mặt bằng uWaterY (đáy hồ địa hình nằm sát đó, đo ±1,5 m);
  // trong ~4 m trên mặt nước đá sẫm ướt + rêu đen xanh, ngay mép nước một vòng BỌT sáng loang. Map không có nước: uWaterY = −1e9.
  float hw = vWorld.y - uWaterY + 1.2 * (bed - 0.5);
  float wet = 1.0 - smoothstep(1.5, 4.5, hw);
  albedo = mix(albedo, albedo * vec3(0.42, 0.48, 0.5) + srgb(vec3(0.02, 0.05, 0.03)), 0.85 * wet);
  // Bọt MỎNG, ĐỨT ĐOẠN: vòng bọt liền dày ~1,5 m (bản đầu vòng 18) = sọc sơn trắng quanh cọc. Giờ ±0,5 m và chỉ ở các mảng
  // ngang ~1,5 × 0,6 m — sóng vỗ chỗ có chỗ không.
  float foam = (1.0 - smoothstep(0.1, 0.5, abs(hw - 0.15))) * smoothstep(0.4, 0.7, grTri(tw, vec2(1.5, 0.6))) * (0.55 + 0.45 * grain);
  albedo = mix(albedo, srgb(vec3(0.86, 0.9, 0.93)), 0.6 * foam);
  // Nóc tuyết / sương muối trên mọi mặt ngửa (đỉnh tháp, gờ) — concept r5-39 / v2-18: "tháp granite nóc tuyết". Theo pháp tuyến
  // CHI TIẾT: tuyết đọng thành vạch trên gờ khối, không chỉ một chỏm trơn.
  // Nửa theo pháp tuyến hình: theo pháp tuyến chi tiết thuần thì mép vát của mọi khe ngang trên mặt ĐỨNG cũng ngửa lên → vạch
  // trắng đứt nét khắp thân tháp (ảnh vòng này).
  // Tuyết theo ĐỘ CAO (vòng 18): mỏm giữa hồ W thấp (~−140 m) mà nóc phủ tuyết = "nóc kem" của cọc; tháp nóc mây F (~+440) và
  // ngọn kim khe C trên ~+150 mới có tuyết. Ngoài nóc / mặt ngửa còn vạch tuyết ĐỌNG trên gờ khối (đỉnh khối = bf → 1, ngay dưới
  // khe ngang) — nét NGANG phá sọc dọc "vỏ cây".
  float snowAlt = smoothstep(120.0, 200.0, vWorld.y + 40.0 * (bed - 0.5));
  float ledge = smoothstep(0.86, 0.96, j.w) * (1.0 - smoothstep(0.04, 0.12, fw)) * (1.0 - smoothstep(0.4, 0.8, abs(n.y))) * 0.8;
  float snow = max(smoothstep(0.55, 0.85, mix(n.y, nL.y, 0.5)), ledge) * snowAlt;
  return mix(albedo, srgb(vec3(0.9, 0.93, 0.98)), snow * (0.75 + 0.25 * grain));
}
`,Iy=`
#include <fog_pars_vertex>
attribute float aCrest;
attribute float aShade;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;
varying float vShade;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vCrest = aCrest;
  vShade = aShade;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,Py=`
#include <fog_pars_fragment>
${ce}
${pr}
#ifdef HAZARD
${Gs}
#endif
uniform float uLift;
uniform float uWaterY;  // mặt nước (Fansipan: chân mỏm sũng nước) — chỉ nhánh granite đọc
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;
varying float vShade;
vec3 srgb(vec3 c) { return pow(c, vec3(2.2)); }
${ld}
${Ry}

void main() {
  vec3 n = normalize(vNormal);
  float y = vWorld.y;
  // Fansipan: mặt granite riêng (granite-rock-glsl.ts — khối nứt triplanar + pháp tuyến chi tiết). Define REGION_FP (world/region.ts
  // regionDefines): map khác không DỊCH granite, Fansipan không dịch đá vôi. BẪY 04/11: bản nhánh theo uniform regionIs(3.0) bắt
  // mọi map dịch granite — hai lần (có / không HAZARD), vài giây vào game. nL = pháp tuyến CHIẾU SÁNG (map khác đúng bằng n).
  vec3 nL = n;
  vec3 albedo;
#ifdef REGION_FP
  albedo = graniteRock(n, nL);
#else
  {
    // Tô kiểu TRIPLANAR (hai mặt đứng xz + y, trộn theo pháp tuyến). BẪY: bản đầu lấy toạ độ "quanh thân" từ
    // pháp tuyến → nhảy cóc giữa các mặt, ra vân xương cá như vỏ cây gỗ (u02-arch1).
    vec2 wN = abs(n.xz) + 1e-3;
    wN /= wN.x + wN.y;
  #define TRI(f, s) (f(vec2(vWorld.z, y) / s) * wN.x + f(vec2(vWorld.x, y) / s) * wN.y)

    // Phân tầng đá vôi: lớp NGANG dày mỏng khác nhau, mép lớp gợn + nghiêng nhẹ; khe giữa lớp đứt quãng (lúc rõ lúc
    // mất). BẪY (u03-arch1/3): khe đều 3,1 m, liền một vòng quanh thân → tháp thành chồng vòng nhựa / ống nước kẻ sọc.
    float layer = y / 3.1 + TRI(gnNoise, vec2(26.0, 60.0)) * 0.9 + TRI(gnNoise, vec2(30.0, 7.0)) * 1.3;
    float lf = fract(layer);
    float crack = smoothstep(0.86, 0.96, lf) * smoothstep(0.3, 0.62, TRI(gnNoise, vec2(7.0, 3.0)));
    float bed = gnNoise(vec2(floor(layer) * 3.7, 0.5));
    float tone = bed * 0.55 + TRI(gnNoise, vec2(18.0, 9.0)) * 0.3 + TRI(gnNoise, vec2(1.3, 1.3)) * 0.15;
    // Ba tông thật của đá vôi: xám ấm, xám lạnh, vàng đất (oxit sắt) — một tông duy nhất nhìn ra đồ nhựa.
    // Xám vôi sáng hơn (0,72/0,66/0,57 → 0,8/0,77/0,7): đá vôi Hà Giang xám trắng loang đen, không nâu như gỗ (fresh-eyes 01/11).
    // Hà Giang (world/region.ts): đá tai mèo xám ngả tím, ít oxit vàng, gần như không rêu — cột đá trơ trên nền hẻm xám
    // (concept 1b). Viền nguy hiểm + mũ nắng giữ nguyên: ngôn ngữ "cái gì cứng" không đổi theo vùng.
    float hg = regionIs(1.0);
    vec3 rock = mix(srgb(mix(vec3(0.38, 0.38, 0.37), vec3(0.34, 0.32, 0.37), hg)), srgb(mix(vec3(0.8, 0.77, 0.7), vec3(0.78, 0.76, 0.8), hg)), tone);
    rock = mix(rock, srgb(vec3(0.62, 0.48, 0.30)), smoothstep(0.55, 0.8, TRI(gnNoise, vec2(14.0, 30.0))) * 0.6 * (1.0 - 0.7 * hg));
    // Vệt nước chảy: dải dọc từ mép gờ xuống — tối (rêu đen) và sáng (vôi đọng), thưa, dài ngắn khác nhau.
    float streak = TRI(gnNoise, vec2(2.2, 38.0)) * 0.75 + TRI(gnNoise, vec2(0.7, 9.0)) * 0.25;
    rock = mix(rock, srgb(vec3(0.2, 0.19, 0.17)), smoothstep(0.6, 0.82, streak) * 0.7);
    rock = mix(rock, srgb(vec3(0.82, 0.8, 0.74)), smoothstep(0.68, 0.9, 1.0 - streak) * 0.35);
    rock *= 1.0 - 0.6 * crack;
    rock *= 0.8 + 0.2 * TRI(gnNoise, vec2(0.9, 0.9));
    // Rêu: mọi mặt ngửa lên (gờ, đỉnh) + mảng bám sườn theo nhiễu lớn.
    float up = smoothstep(0.25, 0.6, n.y);
    float patchN = smoothstep(0.54, 0.7, TRI(gnNoise, vec2(11.0)) * 0.7 + TRI(gnNoise, vec2(3.0)) * 0.3);
    float moss = max(up, patchN * 0.85) * (1.0 - 0.6 * hg);
    vec3 green = mix(srgb(vec3(0.16, 0.26, 0.09)), srgb(vec3(0.42, 0.5, 0.16)), TRI(gnNoise, vec2(2.5)));
    albedo = mix(rock, green, moss);
  }
#endif

  // Viền nắng mép đỉnh sống đá/mỏm đá (aCrest): "sáng + ấm = đường đi qua phía trên".
  albedo = mix(albedo, srgb(vec3(1.0, 0.7, 0.32)), vCrest * (0.6 + 0.4 * gnNoise(vWorld.xz / 1.3)));

  float ndl = dot(nL, ATM_SUN_DIR);
  float wrap = clamp((ndl + 0.35) / 1.35, 0.0, 1.0);
  vec3 light = ATM_SKY_AMBIENT * (0.38 + 0.3 * nL.y) + ATM_SUN_LIGHT * wrap * 1.3 + ATM_BOUNCE * 0.45 * (1.0 - nL.y);
  light += atmNightFill(nL) * 1.1;
  // vShade: hốc lõm + mặt dưới tán đỉnh (tính lúc dựng lưới) — bóng hốc là thứ cho đá có khối và chiều sâu.
  light *= 1.0 - 0.75 * vShade;
  vec3 col = albedo * light * uLift;
  // Trời hoàng hôn tím: ánh trời thuần làm cả tháp thành màu oải hương (u03) — giảm ánh trời, tăng hắt đất ấm.
  // Mặt trời trước mặt: viền ngược nắng là thứ vẽ ra HÌNH KHỐI của tháp đá trên nền trời.
  float dist = length(cameraPosition - vWorld);
  vec3 V = (cameraPosition - vWorld) / max(dist, 0.001);
  // Fansipan (fpK): viền ngược nắng theo pháp tuyến CHI TIẾT và nhẹ hơn — viền trơn liền mạch quanh tháp kim đọc ra "nhựa"
  // (giám khảo vòng 15). Map khác nL = n, fpK = 0 → như cũ.
  float fpK = regionIs(3.0);
  float rim = pow(1.0 - max(dot(nL, V), 0.0), 3.0) * pow(max(dot(-V, ATM_SUN_DIR), 0.0), 2.0);
  // Nhân trong nhánh theo uniform, KHÔNG nhân hệ số (1 − k·fpK): × 1,0 vẫn đổi cách trình biên dịch gộp phép (FMA) → Hà Giang
  // lệch 1/255 ở vài trăm điểm ảnh (so A/B vòng 16).
  if (fpK > 0.5) rim *= 0.6;
  float nightK = smoothstep(0.42, 0.95, atmT());
  col += mix(ATM_GLOW * 0.65, ATM_SKY_HORIZON_SUN * 0.2, nightK) * rim + ATM_SUN_LIGHT * vCrest * 0.35;
#ifdef HAZARD
  // Fansipan GIẢM viền đỏ fresnel còn 30%: ở đây đã có đèn hiệu báo trước (hazard-beacons.ts), viền đỏ hồng mép tháp kim nhìn
  // sát bị chấm "nhựa viền hồng" (vòng 15). Chỉ giảm — luật 02/11 của Anh cấm TĂNG viền nguy hiểm.
  vec3 haz = hazardRim(vWorld, pow(1.0 - max(dot(n, V), 0.0), 2.0));
  if (fpK > 0.5) haz *= 0.3;
  col += haz;
#endif

  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;let By=null,Hy=null;function hd(t,n){const e=new Mt({vertexShader:Iy,fragmentShader:Py,defines:nm(t?{HAZARD:1}:{}),uniforms:Ln.merge([_n.fog]),fog:!0});return e.uniforms.uLift=n,e.uniforms.uRegionHg=co,e.uniforms.uWaterY=gr,t&&Object.assign(e.uniforms,no),e}const ud={value:1};function md(){return By??=hd(!0,ud)}function qs(){return Hy??=hd(!1,ud)}const Fy=G.archPhases,$y=1600;function Gy(t,n){const e=Y(t),o=Qt(t),a=o>.5?90+50*N(n,1,71):bn(t)+22,s=(o>.5?58:46)+18*N(n,2,72),c={x:0,y:0,z:0},i=m=>lt(D(t,m,0,c).x,c.z)-e,r=[];for(let m=0;m<=24;m++){const d=m/24*Math.PI,g=-a*Math.cos(d),v=Math.min(i(g)-15,s),p=v+(s-v)*Math.pow(Math.sin(d),.55)+6*Math.sin(d*3+n);r.push(new _(g,p,4*Math.sin(d*2+n)))}const h=(o>.5?13:9)+4*N(n,3,73),u=new ir(new cr(r),90,h,14,!1),l=u.getAttribute("position"),f=u.getAttribute("normal");for(let m=0;m<l.count;m++){const g=(N(l.getX(m)*.08+n,l.getY(m)*.08+l.getZ(m)*.05,74)-.5)*h*.7;l.setXYZ(m,l.getX(m)+f.getX(m)*g,l.getY(m)+f.getY(m)*g*1.3,l.getZ(m)+f.getZ(m)*g)}return u.setAttribute("aCrest",new $(new Float32Array(l.count),1)),u.computeVertexNormals(),u}function Oy(){return new j(new ir(new cr([new _(0,0,0),new _(0,1,0)]),2,1,4,!1),qs())}function Dy(){const t=new yt,n=qs(),e=new Map,o={x:0,y:0,z:0};return{group:t,update(a){const s=new Set,c=wn(a);for(let i=c;i<=c+1;i++)Fy.forEach((r,h)=>{const u=i*ct+r-_t;if(u<a-60||u>a+$y)return;const l=i*10+h;if(s.add(l),e.has(l))return;const f=new j(Gy(u,l*1.37),n);D(u,0,0,o),f.position.set(o.x,o.y,o.z),f.rotation.y=At(u),f.matrixAutoUpdate=!1,f.updateMatrix(),t.add(f),e.set(l,f)});for(const[i,r]of e)s.has(i)||(t.remove(r),r.geometry.dispose(),e.delete(i))}}}const Uy=5,Ky=150,Vy=1700,qy=300,Wy=200,Yy=new ie({vertexColors:!0}),jy=new ie({vertexColors:!0}),Bi=new Mt({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
attribute vec2 aTrail;
varying vec2 vTrail;
void main() {
  vTrail = aTrail;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,fragmentShader:`
uniform float uTime;
uniform float uNight;
varying vec2 vTrail;
void main() {
  // x = quãng (m), y = làn (0 xuôi — đèn pha trắng ấm, 1 ngược — đèn hậu đỏ). Nhịp sáng chạy theo chiều xe: phơi sáng
  // thật là vệt liền, thêm nhịp để thấy xe đang chạy chứ không phải đèn đường.
  float dir = vTrail.y > 0.5 ? -1.0 : 1.0;
  float pulse = 0.55 + 0.45 * smoothstep(0.6, 1.0, fract((vTrail.x - dir * uTime * 22.0) / 140.0));
  vec3 c = vTrail.y > 0.5 ? vec3(1.0, 0.12, 0.05) : vec3(1.0, 0.82, 0.55);
  gl_FragColor = vec4(c * pulse * uNight * 3.2, 1.0);
}`,transparent:!0,depthWrite:!1,blending:sn});function Xy(){const t=new F(.25,1.1,.25).translate(0,.55,0),n=t.getAttribute("position"),e=new Float32Array(n.count*3);for(let o=0;o<n.count;o++)e.set(n.getY(o)>.8?[.8,.08,.06]:[.92,.92,.88],o*3);return t.setAttribute("color",new $(e,3)),t}const Zy=Xy();function Qy(){const t=new yt;let n=null,e=Number.NaN;const o={lat:0,y:0,amount:0},a={x:0,y:0,z:0},s=new Lt,c=i=>{const r=[],h=[],u=[],l=[],f=[],m=(y,x,M)=>(D(y,x,M-Y(y),a),[a.x,a.y,a.z]),d=(y,x,M,z,C,E,T)=>{y.push(...M,...z,...C,...M,...C,...E);for(let A=0;A<6;A++)x.push(...T)};let g=null,v=0;for(let y=i-Ky;y<=i+Vy;y+=Uy,v++){const x=im(y,o)&&o.amount>.5?{s:y,lat:o.lat,y:o.y}:null;if(g&&x){const[M,z]=[g,x],C=[.86,.85,.8],E=v%9===0?[.3,.3,.31]:[.2,.2,.22];d(r,h,m(M.s,M.lat,M.y-.6),m(z.s,z.lat,z.y-.6),m(z.s,z.lat,z.y+.85),m(M.s,M.lat,M.y+.85),C),d(r,h,m(M.s,M.lat,M.y+.85),m(z.s,z.lat,z.y+.85),m(z.s,z.lat+.45,z.y+.85),m(M.s,M.lat+.45,M.y+.85),C),d(r,h,m(M.s,M.lat+.45,M.y+.05),m(z.s,z.lat+.45,z.y+.05),m(z.s,z.lat+ve-1.2,z.y+.05),m(M.s,M.lat+ve-1.2,M.y+.05),E);const T=.45+(ve-1.65)/2;v%2===0&&d(r,h,m(M.s,M.lat+T-.12,M.y+.08),m(z.s,z.lat+T-.12,z.y+.08),m(z.s,z.lat+T+.12,z.y+.08),m(M.s,M.lat+T+.12,M.y+.08),[.95,.78,.25]);for(const A of[0,1]){const S=.45+(A===0?1.6:ve-3.4);u.push(...m(M.s,M.lat+S-.32,M.y+.9),...m(z.s,z.lat+S-.32,z.y+.9),...m(z.s,z.lat+S+.32,z.y+.9),...m(M.s,M.lat+S-.32,M.y+.9),...m(z.s,z.lat+S+.32,z.y+.9),...m(M.s,M.lat+S+.32,M.y+.9));for(const L of[M.s,z.s,z.s,M.s,z.s,M.s])l.push(L,A)}v%3===0&&f.length<Wy*4&&(D(x.s,x.lat+.2,x.y+.85-Y(x.s),a),f.push(a.x,a.y,a.z,At(x.s)))}g=x}if(!r.length)return null;const p=new ht;p.setAttribute("position",new $(new Float32Array(r),3)),p.setAttribute("color",new $(new Float32Array(h),3)),p.computeVertexNormals();const k=new ht;k.setAttribute("position",new $(new Float32Array(u),3)),k.setAttribute("aTrail",new $(new Float32Array(l),2));const b=new vt(Zy,jy,Math.max(1,f.length/4));for(let y=0;y<f.length/4;y++)s.makeRotationY(f[y*4+3]).setPosition(f[y*4],f[y*4+1],f[y*4+2]),b.setMatrixAt(y,s);const w={mesh:new j(p,Yy),trail:new j(k,Bi),posts:b};return w.trail.frustumCulled=!1,w.trail.renderOrder=3,w};return{group:t,update(i,r,h){Bi.uniforms.uTime.value=r,Bi.uniforms.uNight.value=Math.min(1,Math.max(0,(h-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(i-e)<qy)&&(e=i,n&&(t.remove(n.mesh,n.trail,n.posts),n.mesh.geometry.dispose(),n.trail.geometry.dispose(),n.posts.dispose()),n=c(i),n&&t.add(n.mesh,n.trail,n.posts))}}}const Mn=30,Hi=4,_l=18,Rl=8,Il=24,Pl=[0,10,28,55,95,150],Bl=new Mt({uniforms:Ln.merge([_n.fog,{uTime:{value:0}}]),vertexShader:`
attribute vec3 aCave;
varying vec3 vCave;
#include <fog_pars_vertex>
void main() {
  vCave = aCave;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,fragmentShader:`
uniform float uTime;
varying vec3 vCave;
#include <fog_pars_fragment>
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + 1.0), f.x), f.y);
}
void main() {
  // vCave = (quãng, góc quanh ống 0..1, khoảng tới miệng hang gần nhất m). BẪY (P3 02/11): hash theo ô floor() ra ô
  // vuông như gạch men — đá phải là nhiễu MƯỢT nhiều tầng (vân chảy dọc hang + loang ướt).
  float up = sin(vCave.y * 6.2832);
  vec2 q = vec2(vCave.x * 0.08, vCave.y * 9.0);
  float grain = vn(q) * 0.55 + vn(q * 2.7 + 3.1) * 0.3 + vn(q * 7.3 + 9.2) * 0.15;
  vec3 rock = mix(vec3(0.035, 0.032, 0.03), vec3(0.11, 0.1, 0.09), grain);
  // Ánh ngày tràn vào từ miệng hang — ấm, tắt dần ~30 m (đi sâu vào thì tối thật); vân sáng theo gờ đá (grain).
  float mouth = exp(-vCave.z / 30.0);
  vec3 col = rock + vec3(1.0, 0.8, 0.55) * 0.5 * mouth * (0.35 + 0.9 * grain);
  // Đá ướt loé nhẹ ở nửa dưới (gần mặt sông) — để vách không thành khối đen phẳng.
  col += vec3(0.25, 0.55, 0.5) * 0.06 * smoothstep(-0.2, -0.8, up) * grain;
  // Đom đóm / nấm phát sáng trên trần: chấm xanh ngọc nhấp nháy, chỉ phần trên ống.
  vec2 g = vec2(vCave.x * 0.6, vCave.y * 70.0);
  vec2 cell = floor(g);
  float star = step(0.9, h21(cell)) * (1.0 - smoothstep(0.05, 0.14, length(fract(g) - 0.5)));
  col += vec3(0.25, 1.0, 0.82) * star * smoothstep(0.25, 0.7, up) * (0.6 + 0.4 * sin(uTime * 2.0 + h21(cell + 7.0) * 40.0)) * 1.8;
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`,side:St,fog:!0});function Jy(t,n,e){const o={x:0,y:0,z:0},a=[],s=[],c=Math.ceil((n-t)/Hi)+1,i=(m,d)=>.92+.32*N(m*.02,d*4,e)+.14*N(m*.11,d*13,e+1);for(let m=0;m<c;m++){const d=t+m*Hi;for(let g=0;g<=Mn;g++){const v=g/Mn,p=v*Math.PI*2,k=i(d,v);D(d,_l*k*Math.cos(p),Rl+Il*k*Math.sin(p),o),a.push(o.x,o.y,o.z),s.push(d,v,Math.min(d-t,n-d))}}const r=[];for(let m=0;m<c-1;m++)for(let d=0;d<Mn;d++){const g=m*(Mn+1)+d,v=g+Mn+1;r.push(g,g+1,v,v,g+1,v+1)}const h=new ht;h.setAttribute("position",new $(new Float32Array(a),3)),h.setAttribute("aCave",new $(new Float32Array(s),3)),h.setIndex(r);const u=[],l=[];for(const[m,d]of[[t,-1],[n,1]]){const g=u.length/3;Pl.forEach((v,p)=>{for(let k=0;k<=Mn;k++){const b=k/Mn,w=b*Math.PI*2,y=i(m,b),x=p?.25*v*(N(b*9,p,e+5)-.5):0,M=Math.max(-16,Rl+(Il*y+v+x)*Math.sin(w));D(m-d*(v*.35+(p?3*N(b*13,p,e+9):0)),(_l*y+v+x)*Math.cos(w),M,o),u.push(o.x,o.y,o.z)}});for(let v=0;v<Pl.length-1;v++)for(let p=0;p<Mn;p++){const k=g+v*(Mn+1)+p,b=k+Mn+1;l.push(k,b,k+1,k+1,b,b+1)}}for(let m=0;m<c;m+=2){const d=t+m*Hi,g=u.length/3;for(let v=0;v<=16;v++){const p=-110+220*v/16,k=Math.abs(p)/110,b=58+150*k*k+30*(N(d*.015,p*.03,e+3)-.5);D(d,p,b,o),u.push(o.x,o.y,o.z)}if(m+2<c)for(let v=0;v<16;v++)l.push(g+v,g+17+v,g+v+1,g+v+1,g+17+v,g+18+v)}const f=new ht;return f.setAttribute("position",new $(new Float32Array(u),3)),f.setIndex(l),f.computeVertexNormals(),{tube:h,portals:f}}function tb(){const t=new yt,n=new Map,e=qs(),o=e.clone();return o.uniforms=e.uniforms,o.side=St,{group:t,update(a,s){if(Bl.uniforms.uTime.value=s,!G.caves.length)return;const c=new Set,i=wn(a);for(let r=i-1;r<=i+1;r++)G.caves.forEach(([h,u],l)=>{const f=r*ct+h-_t,m=r*ct+u-_t;if(m<a-200||f>a+2200)return;const d=r*8+l;if(c.add(d),n.has(d))return;const g=Jy(f,m,(r*7+l)%97),v=[new j(g.tube,Bl),new j(g.portals,o)];for(const p of v)p.frustumCulled=!1,p.matrixAutoUpdate=!1,t.add(p);n.set(d,v)});for(const[r,h]of n)if(!c.has(r)){for(const u of h)t.remove(u),u.geometry.dispose();n.delete(r)}}}}const Fi=140,Hl=24,nb=2400;function La(t,n){const e=t.getAttribute("position").count,o=new Float32Array(e*3);for(let a=0;a<e;a++)o.set(n,a*3);return t.setAttribute("color",new $(o,3)),t.deleteAttribute("uv"),t}function eb(){return kt([La(new F(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),La(new F(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),La(new F(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),La(new F(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function ob(){const t=new vt(eb(),new ie({vertexColors:!0}),Hl);t.frustumCulled=!1,t.count=0;const n=new Lt,e={x:0,y:0,z:0};let o=Number.NaN;return{mesh:t,update(a){const s=Math.floor((a-100)/Fi);if(s===o)return;o=s;let c=0;for(let i=s;c<Hl&&i*Fi<a+nb;i++){const r=i*Fi+37*Math.sin(i*1.7);if(Te()!=="ha-giang"||sa(r)<120)continue;const h=3*Math.sin(r/140)+2.5*Math.sin(r/47+1.7)+(i%2?7:-7),u=cm(r);D(r,h,0,e),n.makeRotationY(At(r)+(i%3===0?Math.PI:0)+.15*Math.sin(i)).setPosition(e.x,u+.1,e.z),t.setMatrixAt(c++,n)}t.count=c,t.visible=c>0,t.instanceMatrix.needsUpdate=!0}}}function $i(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a);if(c>e)continue;const r=Math.atan2(i,s),h=Math.pow(.5+.5*Math.sin(r*7+2.4*N(r,c/23,7)),10),u=(1+n*(N(r*3.1,c/37,5)-.5)+.5*n*(N(r*9.3,c/11,6)-.5))*(1-.22*h);o.setXYZ(a,s*u,c,i*u)}return t.computeVertexNormals(),t}function Fl(t){const n=new rr;for(let e=0;e<10;e++){const o=Math.PI/2+e*Math.PI/5,a=e%2?t*.4:t;e===0?n.moveTo(Math.cos(o)*a,Math.sin(o)*a):n.lineTo(Math.cos(o)*a,Math.sin(o)*a)}return n}function ab(){const t=(a,s,c,i,r,h)=>$i(new rt(a,s,c,64,24).translate(r,i-c/2,r*.6),h,i-4),n=$i(new rt(11.5,13.5,3,48,4).translate(0,-1.5,0),.32,-.2),e=[];for(let a=0;a<13;a++){const s=a*2.39+.4,c=1.6+2.6*N(a,3,61),i=11+2.5*N(a,4,62);e.push($i(new Ve(c,12,9).scale(1,.62,1).translate(Math.cos(s)*i,-.6+.6*N(a,5,63),Math.sin(s)*i),.5,99))}const o=kt([n,...e,t(11,34,46,-1.5,0,.7),t(26,62,90,-40,7,.8),t(48,105,190,-115,-9,.9)].map(a=>(a.deleteAttribute("uv"),a)));return o.computeVertexNormals(),o}function sb(){const t=H(new rt(2.6,3.3,1.5,4).rotateY(Math.PI/4).translate(0,.75,0),[.4,.4,.42],.08,49),n=H(new se(2.4,6.2,3).translate(0,1.4+3.1,0),[.7,.73,.78],.05,44),e=H(new rt(.08,.1,6.6,6).translate(3,3.3,.9),[.8,.8,.82],.02,45),o=H(new F(3,2,.08).translate(4.5,5.5,.9),[.86,.07,.06],.02,46),a=H(new pc(Fl(.6)).translate(4.5,5.5,.95),[1,.86,.1],0,47),s=H(new pc(Fl(.6)).rotateY(Math.PI).translate(4.5,5.5,.85),[1,.86,.1],0,48);return bt([t,n,e,o,a,s])}const ib=2600,dd=[.6,.58,.55],cb=[.3,.29,.31];function rb(){const t=(n,e,o,a)=>jo(H(new Ve(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,o/e,1).translate(n,-4,0),[.42,.6,.28],.14,a),-4,o,.7);return bt([t(-62,70,62,11),t(62,64,56,12)])}function lb(){return bt([H(new F(5,1.2,3).translate(0,.6,0),dd,.1,21),H(new F(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),H(new rt(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function hb(){const t=(e,o,a,s,c,i)=>[H(new F(e,a,o).translate(s,a/2,c),[.7,.62,.5],.08,i),H(new rt(.01,o*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(s,a+o*.17,c),cb,.08,i+1)],n=(e,o,a,s,c)=>H(new F(e,4,o).translate(a,2,s),dd,.12,c);return bt([n(64,1.6,0,-22,31),n(64,1.6,0,22,32),n(1.6,44,-32,0,33),n(1.6,44,32,0,34),...t(30,12,11,0,8,35),...t(22,9,7,-14,-10,37),...t(22,9,7,14,-10,39)])}const Gi={"nui-doi":{geo:rb,scale:1},"bia-ma-pi-leng":{geo:lb,scale:2.2},"dinh-vua-meo":{geo:hb,scale:1.4},"chop-fansipan":{geo:sb,scale:1,rock:ab}};function ub(){const t=new yt,n=pv();t.add(n.group);const e=new Map,o=new Map,a=new Map,s={x:0,y:0,z:0};return{group:t,update(c){n.update(c);const i=G.landmarks;if(!i?.length)return;const r=new Set,h=wn(c);for(let u=h-1;u<=h+1;u++)i.forEach((l,f)=>{const m=u*ct+l.phase-_t;if(m<c-300||m>c+ib)return;const d=u*16+f;if(r.add(d),a.has(d))return;let g=e.get(l.kind);g||e.set(l.kind,g=Gi[l.kind].geo());const v=new j(g,lo),p=Gi[l.kind].rock;if(p){let k=o.get(l.kind);k||o.set(l.kind,k=p()),v.add(new j(k,qs()))}D(m,l.lat,0,s),v.position.set(s.x,l.drop===void 0?lt(s.x,s.z):Y(m)-l.drop,s.z),v.rotation.y=At(m)+(l.turn??0),v.scale.setScalar(Gi[l.kind].scale),v.matrixAutoUpdate=!1,v.updateMatrix(),t.add(v),a.set(d,v)});for(const[u,l]of a)r.has(u)||(t.remove(l),a.delete(u))}}}const mb={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},db={zenith:["#5a82d4","#3e4f9a","#1c2a66","#4c86de"],hazeAway:["#a9b9de","#7f80b6","#2c3470","#b6caec"],hazeSun:["#c9aabe","#b884a0","#5a3c78","#d6c4cc"],skyHorizonSun:["#ffc8a4","#ff9a78","#9c4670","#ffe4cc"],skyHorizonAway:["#c9d4f0","#b48cb8","#46508e","#d2e2f8"],glow:["#e8bc8e","#e89068","#ff9a50","#e8d8bc"],sunDisk:["#f4e6c8","#f4c494","#000000","#f2ecdc"],sunLight:["#ffe6c8","#ffb490","#5a6ab0","#fff6ea"],skyAmbient:["#b2c6ec","#8e94ce","#46559a","#bed4f4"],bounce:["#9aaab8","#9a7c8e","#4a3c52","#aebccc"]},fd=gt.region==="fansipan"?db:mb,gd=.18;function Oi(t,n,e,o=0){const[a,s,c,i]=fd[t],r=Math.min(1,Math.max(0,n));return r<.5?e.set(a).lerp(new it(s),r*2):e.set(s).lerp(new it(c),(r-.5)*2),o>0?e.lerp(new it(i),Math.min(1,o)):e}function fb(t,n,e=0){const o=t.y+(-.07-t.y)*Math.min(1,Math.max(0,n)*1.25)+gd*e,a=Math.hypot(t.x,o,t.z);return{x:t.x/a,y:o/a,z:t.z/a}}const Di=900,gb=15e-6,pb=14e-5;function vb(t){const n=new it(t);return`vec3(${n.r.toFixed(4)}, ${n.g.toFixed(4)}, ${n.b.toFixed(4)})`}function yb(){return Object.entries(fd).map(([t,n])=>`#define ATM_${t.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${n.map(vb).join(", ")})`).join(`
`)}function pd(t,n="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${n})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${yb()}
#define ATM_SUN_DIR normalize(vec3(${t.x.toFixed(5)}, mix(${t.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${gd.toFixed(3)} * atmMorn(), ${t.z.toFixed(5)}))

// Màu SƯƠNG (núi xa tan vào). Cố ý KHÁC màu trời ở chân trời: X4 là tranh, núi xa tím đứng trước nền trời
// vàng cam — một màu chung cho cả hai (như khí quyển vật lý) thì núi xa vàng nhờ nhờ, mất lớp.
vec3 atmHazeColor(vec3 dir) {
  float d = dot(dir, ATM_SUN_DIR);
  vec3 c = mix(ATM_HAZE_AWAY, ATM_HAZE_SUN, smoothstep(0.2, 1.0, d));
  return mix(c, ATM_GLOW, pow(max(d, 0.0), 40.0) * 0.5);
}

// Màu TRỜI. Dưới chân trời trả về màu sương: chỗ nào trên màn hình không có núi (ngoài 48 km) vẫn liền.
vec3 atmSkyColor(vec3 dir) {
  float d = dot(dir, ATM_SUN_DIR);
  vec3 horizon = mix(ATM_SKY_HORIZON_AWAY, ATM_SKY_HORIZON_SUN, smoothstep(0.1, 0.95, d));
  vec3 sky = mix(horizon, ATM_ZENITH, smoothstep(0.0, 0.5, dir.y) * (1.0 - 0.6 * pow(max(d, 0.0), 3.0)));
  sky += ATM_GLOW * pow(max(d, 0.0), 8.0) * 0.6;
  return mix(atmHazeColor(dir), sky, smoothstep(-0.03, 0.02, dir.y));
}

// Sàn sáng ĐÊM cho mọi vật liệu tự chiếu (địa hình, đá): trăng sau lưng camera + trời đêm. Fresh-eyes 01/11: chạng
// vạng / đêm trong khe (n-3500, n-4600) đen 65–68% khung — mặt trời đã lặn sau núi, ánh trời chàm × lá rừng tối ≈ 0.
// Giá trị thấp + ngả lam: vẫn đọc ra là ĐÊM, nhưng vách, gờ, tán cây còn hình khối (trăng chiếu mặt quay về camera).
vec3 atmNightFill(vec3 n) {
  float k = smoothstep(0.42, 0.95, atmT());
  // Trăng THẤP sau lưng camera: chiếu mặt vách/tán quay về người chơi, mặt đất phẳng chỉ ăn ~60% (cao như bản đầu
  // thì ruộng lúa sáng màu đêm ra bãi tuyết bạc — l1-5600).
  float w = clamp((dot(n, vec3(0.25, 0.45, -0.86)) + 0.45) / 1.45, 0.0, 1.0);
  // Nền 0,25 (bản đầu 0,45): mặt ĐẤT phẳng tối hơn, vách quay về camera vẫn đủ hình — tương phản đêm 44–51 → ≥ 60.
  return vec3(0.15, 0.2, 0.38) * k * (0.25 + 1.05 * w);
}

float atmOpticalDepth(float y0, float y1, float dist, float density) {
  float e0 = exp(-max(y0, -200.0) / ${Di.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${Di.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${Di.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${gb.toExponential(3)} + density * avg);
}
`}function bb(t,n){ma.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,ma.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,ma.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${pd(n)}
#endif`,ma.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,t.fog=new kf(new it(0,0,0),pb)}function wb(t,n,e=0){t.fog.color.setRGB(n,e,0)}const $l=120,vd=30,yd=7,xb=yd*(vd+2);function Mb(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");for(let o=0;o<18;o++){const a=30+34*N(o,4,7),s=128+(N(o*1.7,1,3)-.5)*(240-2*a-20),c=140+(N(1,o*2.3,5)-.5)*60-(a-30)*.6,i=n.createRadialGradient(s,c,0,s,c,a);i.addColorStop(0,"rgba(255,255,255,0.5)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,256,256)}const e=new oa(t);return e.colorSpace=ru,e}const kb=`
#include <fog_pars_vertex>
varying vec2 vUv;
varying float vTop;
varying float vNear;
void main() {
  vUv = uv;
  vec4 center = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float sx = length(instanceMatrix[0].xyz);
  float sy = length(instanceMatrix[1].xyz);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 world = center.xyz + right * position.x * sx + up * position.y * sy;
  vTop = uv.y;
  vec4 mvPosition = viewMatrix * vec4(world, 1.0);
  // Mây sát camera mờ đi: billboard to đi qua mặt camera là một mảng trắng phủ màn hình.
  vNear = smoothstep(30.0, 120.0, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,Sb=`
#include <fog_pars_fragment>
uniform sampler2D uMap;
varying vec2 vUv;
varying float vTop;
varying float vNear;
void main() {
  vec4 t = texture2D(uMap, vUv);
  // Đỉnh mây đón nắng, đáy mây ngả màu trời.
  vec3 lit = mix(ATM_SKY_AMBIENT * 0.9 + ATM_BOUNCE * 0.3, ATM_SUN_LIGHT * 1.25 + ATM_GLOW * 0.2, smoothstep(0.25, 0.85, vTop));
  gl_FragColor = vec4(lit, t.a * 1.3 * vNear);
  #include <fog_fragment>
}`;function Tb(t){const n=Math.max(10,Math.round(vd*t)),e=new Mt({vertexShader:kb,fragmentShader:Sb,uniforms:Ln.merge([_n.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:St,fog:!0});e.uniforms.uMap.value=Mb();const o=new vt(new En(1,1),e,xb);o.frustumCulled=!1,o.count=0;const a=new Lt,s=new xt,c=new _,i=new _;let r=Number.NaN;return{mesh:o,update(h){const u=Math.floor(h/$l)-1;if(u===r)return;r=u;let l=0;for(let f=u;f<u+n+2;f++)for(let m=0;m<yd;m++){const d=(f+N(m*.7,f,91))*$l,g=Qt(d),v=N(f,m*1.3,92)<.5?-1:1,p=N(m,f*1.9,93);let k,b,w;if(m<2)w=12+14*p,k=v*(16+w*.5+p*30*g),b=Y(d)-10+N(f,m,94)*12+16*Xt(d);else{if(g<.5||m>3)continue;k=v*(120+p*500),b=Pt(d)-210-N(f,m,95)*60,w=60+80*p}D(d,k,0,c),Ae(c.x,c.z,d,k)&&(a.compose(c.set(c.x,b,c.z),s,i.set(w*1.6,w*.75,1)),o.setMatrixAt(l++,a))}o.count=l,o.instanceMatrix.needsUpdate=!0}}}const Ab=`
attribute float aSize;
attribute vec4 aColor;
uniform float uScale;
uniform float uMaxPx;
varying vec4 vColor;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  // Kích thước theo mét thật (phối cảnh), kẹp tối thiểu 1,5 px để đèn xa vẫn còn là chấm sáng. Trần uMaxPx: lớp có
  // điểm bay SÁT camera (bóng ma 02/11) — không trần thì quầng 6 m cách 10 m thành đĩa ~350 px trắng giữa đường bay.
  gl_PointSize = clamp(aSize * uScale / -mv.z, 1.5, uMaxPx);
  vColor = aColor;
}`,Nb=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function _r(t,n={}){const e=new Float32Array(t*3),o=new Float32Array(t),a=new Float32Array(t*4),s=new ht;s.setAttribute("position",new $(e,3)),s.setAttribute("aSize",new $(o,1)),s.setAttribute("aColor",new $(a,4));const c=new Mt({vertexShader:Ab,fragmentShader:Nb,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:n.core??2.4}},transparent:!0,depthWrite:!1,blending:sn}),i=new ss(s,c);return i.frustumCulled=!1,i.renderOrder=4,{points:i,set(r,h,u,l,f,m,d,g,v){e[r*3]=h,e[r*3+1]=u,e[r*3+2]=l,o[r]=f,a[r*4]=m,a[r*4+1]=d,a[r*4+2]=g,a[r*4+3]=v},commit(r){s.setDrawRange(0,r);for(const h of["position","aSize","aColor"])s.getAttribute(h).needsUpdate=!0},setViewport(r,h){c.uniforms.uScale.value=r/(2*Math.tan(h*Math.PI/360)),n.maxFrac&&(c.uniforms.uMaxPx.value=Math.max(4,r*n.maxFrac))}}}const Un=5,Ui=3,zb=.08,Cb=3,Eb=new it("#ffd27a"),Lb=new it("#9b8cff");function _b(){const t={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},n=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new ht;return e.setAttribute("position",new cu(n.flat().flatMap(o=>t[o]),3)),e}function Rb(){const t=new qt({color:"#ffffff",blending:sn,transparent:!0,depthWrite:!1,side:St,fog:!1}),n=new vt(_b(),t,Un);n.frustumCulled=!1,n.count=0;const e=_r(Un*(Ui+1),{maxFrac:.025,core:1.1}),o={z:0,x:0,v:0,ended:!1,after:0},a=new yt;a.add(n,e.points);const s=Array.from({length:Un},()=>new _),c=new Array(Un).fill(0),i=new Array(Un).fill(0),r=new Array(Un).fill(0),h=new Array(Un).fill(0),u=new Lt,l=new xt,f=new lu(0,0,0,"YXZ"),m=new _,d={x:0,y:0,z:0},g=new _(1.25,1.25,1.25),v=new it,p={group:a,setViewport:(k,b)=>e.setViewport(k,b),heads:s,alphas:c,owner:i,count:0,mode:"on",update(k,b,w,y,x){let M=0,z=0;const C=p.mode==="off"?[]:k.slice(0,Un),E=id(C),T=new Set(C.map((S,L)=>[Math.abs(S.at.z-b.z),L]).filter(([,S])=>Bc(S,b.z,E)>0).sort((S,L)=>S[0]-L[0]).slice(0,Cb).map(([,S])=>S)),A=p.mode==="dim"?.5:1;C.forEach((S,L)=>{const{z:I,x:B,v:U,ended:W,after:Q}=S.at,nt=I-b.z,q=y>0?(B-r[L])/y:0;if(r[L]=B,h[L]+=(Math.max(-.8,Math.min(.8,q*.03))-h[L])*Math.min(1,y*10),nt<-4)return;D(I,B,U,m);const et=W&&S.run.crash?Q/.8:W?1:0,ft=Math.abs(nt)<10&&Math.abs(B-b.x)<3.2&&Math.abs(U-b.v)<3?.25:1,J=1-Math.min(1,Math.max(0,(Math.abs(nt)-220)/80)),Nt=Math.min(1,(nt+4)/4),Ct=.15+.85*Math.min(1,Math.max(0,(m.distanceTo(x)-9)/6)),Et=(S.self?.45:.3)*A*Bc(L,b.z,E)*ft*J*Nt*Ct*Math.max(0,1-et);if(!(Et<=.01)){f.set(-Math.atan(vn(I))+(W?Q*9:0),At(I),h[L]+(W?Q*13:0)),u.compose(m,l.setFromEuler(f),g),n.setMatrixAt(M,u),v.copy(S.self?Eb:Lb),T.has(L)&&e.set(z++,m.x,m.y,m.z,2.5,v.r,v.g,v.b,Et*.9);for(let Rt=1;Rt<=Ui&&!W&&A===1&&T.has(L);Rt++){ad(S.track,w-Rt*zb,o),D(o.z,o.x,o.v,d);const xn=1-Rt/(Ui+1);e.set(z++,d.x,d.y,d.z,1.8*xn,v.r,v.g,v.b,Et*.55*xn)}n.setColorAt(M,v.multiplyScalar(Et*1.6)),s[M].set(m.x,m.y+1.6,m.z),c[M]=Et,i[M]=L,M++}}),n.count=M,e.commit(z),p.count=M,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}};return p}function Ib(){const t=new rr;for(let n=0;n<10;n++){const e=n%2?.11:.28,o=n/10*Math.PI*2+Math.PI/2;n?t.lineTo(Math.cos(o)*e,Math.sin(o)*e):t.moveTo(Math.cos(o)*e,Math.sin(o)*e)}return new pc(t)}function Pb(){const t=new qt({color:new it("#ffd76a").multiplyScalar(2.2),blending:sn,transparent:!0,depthWrite:!1,fog:!1}),n=new vt(Ib(),t,3);n.frustumCulled=!1,n.count=0;const e=new Lt,o=new _,a=new _,s=new xt;return{mesh:n,update(c,i,r,h){if(i<=0){n.count=0;return}const u=Math.min(1,i*3);h.getWorldQuaternion(s);for(let l=0;l<3;l++){const f=r*6+l*Math.PI*2/3;o.set(c.x+Math.cos(f)*.8,c.y+.9+Math.sin(f*2)*.1,c.z+.45+Math.sin(f)*.5),a.setScalar(u*(1+.25*Math.sin(r*14+l*2))),e.compose(o,s,a),n.setMatrixAt(l,e)}n.count=3,n.instanceMatrix.needsUpdate=!0}}}const Fc=6,De=3,de=28,Sn=de+1,So=Fc*De*Sn*2,Bb=[1.2,1.75,2.2],Hb=Math.PI*2*.45,Fb=2.4,$b=`
  attribute vec3 aTan;
  attribute float aSide;
  attribute float aU;
  attribute float aGlow;
  uniform float uWidth;
  uniform float uMinAngle;
  varying float vU;
  varying float vSide;
  varying float vGlow;
  void main() {
    vec3 toCam = cameraPosition - position;
    vec3 across = normalize(cross(normalize(aTan), normalize(toCam)));
    // Bề rộng tối thiểu theo GÓC (layout windRibbon, mặc định 0 = như cũ): dải 60–100 m trên nền mây trắng thành sợi chỉ 2–3 px.
    vec3 p = position + across * aSide * max(uWidth, uMinAngle * length(toCam));
    vU = aU;
    vSide = aSide;
    // Sát camera (đang bay xuyên dải) thì tắt dần: bề rộng tính theo mét nên dải gần to như tia laser lấn cả cảnh
    // (ảnh thử 31/10). Dải xa giữ sáng để dẫn mắt tới làn kế tiếp.
    vGlow = aGlow * smoothstep(4.0, 24.0, length(toCam));
    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  }`,Gb=`
  uniform float uTime;
  varying float vU;
  varying float vSide;
  varying float vGlow;
  void main() {
    // Vệt chảy về phía trước dọc sợi + mềm hai mép + tắt dần hai đầu dải.
    float flow = fract(vU * 5.0 - uTime * 2.6);
    float dash = smoothstep(0.0, 0.12, flow) * (1.0 - smoothstep(0.3, 0.75, flow));
    float edge = 1.0 - vSide * vSide;
    float ends = smoothstep(0.0, 0.1, vU) * (1.0 - smoothstep(0.85, 1.0, vU));
    // Trộn THƯỜNG (không cộng sáng): cộng trắng ấm lên nóc mây trắng Fansipan = vô hình (giám khảo vòng 9–10: "gust gần như
    // không thấy"). Thân sợi XANH LƠ đậm (vòng 15: vàng cam trùng màu đèn trời / đèn ước hoa sen — gió phải có màu RIÊNG), vệt
    // chảy trắng > 1 nên vẫn ăn bloom trên nền tối.
    vec3 wind = vec3(0.32, 0.78, 1.0);
    // Vệt chảy ngả XANH LƠ (vòng 18: vệt trắng chìm vào mây trắng — giám khảo "sợi trắng ngoằn ngoèo").
    vec3 col = mix(wind * 0.8, vec3(0.62, 0.92, 1.0) * 1.45, dash) * min(vGlow, 1.6);
    gl_FragColor = vec4(col, clamp(edge * ends * (0.45 + 0.55 * dash) * min(vGlow, 1.0) * 1.2, 0.0, 1.0));
  }`;function Ob(){const t=new ht,n=new Float32Array(So*3),e=new Float32Array(So*3),o=new Float32Array(So),a=new Float32Array(So),s=new Float32Array(So),c=[];for(let d=0;d<Fc*De;d++)for(let g=0;g<Sn;g++){const v=(d*Sn+g)*2;a[v]=-1,a[v+1]=1,s[v]=s[v+1]=g/de,g<de&&c.push(v,v+1,v+2,v+1,v+3,v+2)}t.setAttribute("position",new $(n,3)),t.setAttribute("aTan",new $(e,3)),t.setAttribute("aGlow",new $(o,1)),t.setAttribute("aSide",new $(a,1)),t.setAttribute("aU",new $(s,1)),t.setIndex(c);const i=new Mt({vertexShader:$b,fragmentShader:Gb,uniforms:{uTime:{value:0},uWidth:{value:G.windRibbon?.width??.24},uMinAngle:{value:G.windRibbon?.minAngle??0}},blending:Sf,transparent:!0,depthWrite:!1,side:St}),r=new j(t,i);r.frustumCulled=!1,r.renderOrder=2;const h=new Map,u=new Float32Array(Sn*3),l=new Float32Array(Sn*9),f=new Float32Array(Sn),m={x:0,y:0,z:0};return{mesh:r,update(d,g,v){i.uniforms.uTime.value=g;const p=i1(d),k=d.gusts.find(w=>!w.taken&&!w.missed);let b=0;for(const w of d.gusts){if(b>=Fc||w.z+w.len<v-5||w.z>v+320)continue;w.taken&&!h.has(w.id)&&h.set(w.id,g);const y=w.taken?g-h.get(w.id):0,x=w.taken?Math.max(0,2.4*(1-y/.4)):w.missed?.18:w===k?1.5:.9;if(!(x<=0)){for(let M=0;M<Sn;M++){const z=w.z+M/de*w.len;D(z,Tt(w.lane),w.v+p,m);const C=m.x,E=m.y,T=m.z;D(z+1,Tt(w.lane),w.v+p,m);let A=m.x-C,S=m.y-E,L=m.z-T;const I=Math.hypot(A,S,L)||1;A/=I,S/=I,L/=I;let B=-L,U=A;const W=Math.hypot(B,U)||1;B/=W,U/=W,l[M*9]=C,l[M*9+1]=E,l[M*9+2]=T,l[M*9+3]=B,l[M*9+4]=0,l[M*9+5]=U,l[M*9+6]=-U*S,l[M*9+7]=U*A-B*L,l[M*9+8]=B*S,f[M]=1+1.2*Math.abs(S)}for(let M=0;M<De;M++){for(let C=0;C<Sn;C++){const E=C/de,T=M/De*Math.PI*2+E*Hb+g*Fb,A=Bb[M]*f[C],S=Math.cos(T)*A,L=Math.sin(T)*A,I=C*9;for(let B=0;B<3;B++)u[C*3+B]=l[I+B]+l[I+3+B]*S+l[I+6+B]*L}const z=b*De+M;for(let C=0;C<Sn;C++){const E=Math.max(0,C-1),T=Math.min(de,C+1);for(let A=0;A<2;A++){const S=(z*Sn+C)*2+A;for(let L=0;L<3;L++)n[S*3+L]=u[C*3+L],e[S*3+L]=u[T*3+L]-u[E*3+L];o[S]=x}}}b++}}for(const w of h.keys())d.gusts.some(y=>y.id===w)||h.delete(w);t.setDrawRange(0,b*De*de*6);for(const w of["position","aTan","aGlow"])t.getAttribute(w).needsUpdate=!0;r.visible=b>0}}}const Gl=G.tower.phase,Db=1,Ub=2600;function Ol(t,n,e){const o=[],a=c=>{const i=Math.PI/2+c*Math.PI/5,r=c%2?.382:1;return[Math.cos(i)*t*r,Math.sin(i)*t*r]};for(let c=0;c<10;c++){const[i,r]=a(c),[h,u]=a(c+1);o.push(0,0,n,i,r,n,h,u,n)}const s=new ht;return s.setAttribute("position",new $(new Float32Array(o),3)),s.computeVertexNormals(),H(s,e,.04)}function Kb(){const t=[.62,.6,.56],n=[H(new rt(3.6,4.6,28,8).translate(0,8,0),t,.12,2),H(new rt(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),H(new rt(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=H(new F(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return bt([...n,e,Ol(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),Ol(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function Dl(t){const n=Sc(t)+(t===1?Sc(2):ca);let e=Math.floor((n+_t-Gl)/ct)*ct+Gl-_t;for(e>=n&&(e-=ct);Xt(e)>0;)e-=ct;return e}function Vb(){const t=new j(Kb(),lo);t.visible=!1,t.matrixAutoUpdate=!1;let n=Number.NaN;const e=new _,o=new _,a=s=>{const{latMin:c,latMax:i,mirror:r}=G.tower,h=Db*(r&&wn(s)%2!==0?-1:1);o.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let l=c;l<=i;l+=20)D(s+u,h*l,0,e),e.y=lt(e.x,e.z),e.y>o.y&&o.copy(e);t.position.copy(o),t.rotation.y=-.6,t.scale.setScalar(2),t.updateMatrix()};return{mesh:t,update(s){if(Te()!=="ha-giang"){t.visible=!1;return}const c=Ju(s),i=Dl(c),r=Dl(c+1),h=Math.abs(s-i)<Math.abs(s-r)?i:r;t.visible=Math.abs(s-h)<Ub,t.visible&&h!==n&&(n=h,a(h))}}}const ta=12,bs={uPools:{value:Array.from({length:ta},()=>new as)},uPoolCount:{value:0},uPoolNight:{value:0}},qb=`
uniform vec4 uPools[${ta}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${ta}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let ws=0,bd=ta;function Wb(t){bd=Math.max(0,Math.min(ta,Math.round(t)))}function Yb(){ws=0}function ts(t,n,e,o,a){ws>=bd||a>330||n-lt(t,e)>28||bs.uPools.value[ws++].set(t,n,e,o)}function jb(t){bs.uPoolCount.value=ws,bs.uPoolNight.value=t}const He=14,Ki=9.5,Vi=3.4,Xb=.9,_a=7,Ul=4,qi=13,Kl=30,Vl=420,ql=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],Zb=[-1,1];function Qb(t,n){for(const e of t.obstacles)if(Math.abs(e.z-n)<9)return!0;return!1}function Jb(){const t=Math.ceil((Vl+Kl)/He)+2,n=_r(t*(2*_a)+Math.ceil(t/Ul)*qi),e={x:0,y:0,z:0};return{points:n.points,setViewport:(o,a)=>n.setViewport(o,a),update(o,a,s,c){const i=Math.min(1,Math.max(0,(s-.38)/.35));let r=0,h=0;if(i>.01){const u=Math.floor((o.z-Kl)/He),l=Math.floor((o.z+Vl)/He);for(let f=u;f<=l;f++){const m=f*He;if(!(Xt(m)<.97||Xt(m+He)<.97)){for(const d of Zb)for(let g=0;g<_a;g++){const v=(g+.5)/_a;D(m+v*He,d*Ki,-Fo+Vi-4*v*(1-v)*Xb,e);const p=ql[((f*_a+g)%3+3)%3],k=.82+.18*Math.sin(a*3.1+f*1.7+g*2.3+d);n.set(r++,e.x,e.y,e.z,.6,p[0],p[1],p[2],i*k)}if(!(f%Ul!==0||Qb(o,m))){h<3&&m>o.z-10&&(D(m,0,-Fo+Vi,e),ts(e.x,e.y,e.z,1.5,m-c),h++);for(let d=0;d<qi;d++){const g=(d+.5)/qi;D(m,-Ki+g*2*Ki,-Fo+Vi+.3-4*g*(1-g)*1.3,e);const v=ql[d%3];n.set(r++,e.x,e.y,e.z,.6,v[0],v[1],v[2],i*(.85+.15*Math.sin(a*2.7+d)))}}}}}n.commit(r)}}}function tw(){const t=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([n,e])=>new yn(n,e));return new Is(t,16)}function nw(){return new En(1,1,1,6).translate(0,.5,0)}function ew(t){return new Mt({uniforms:{uTime:t},side:St,vertexShader:`
varying vec2 vUv;
varying float vY;
varying vec3 vN;
varying vec3 vView;
void main() {
  vUv = uv;
  vY = position.y;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  // Bình co giãn ĐỀU (một hệ số) nên mat3 * normal chỉ đổi độ dài — normalize là đủ, khác bẫy trụ cột sáng.
  vN = normalize(mat3(modelMatrix * instanceMatrix) * normal);
  vView = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,fragmentShader:`
uniform float uTime;
varying vec2 vUv;
varying float vY;
varying vec3 vN;
varying vec3 vView;
void main() {
  // Giữ dưới ngưỡng bloom (1,4) như giấy đèn: chỉ miệng lửa được rực.
  vec3 pink = vec3(1.25, 0.14, 0.42);
  vec3 gold = vec3(1.15, 0.6, 0.1);
  float s = fract(vUv.x * 3.0 + vY * 0.9);
  float stripe = smoothstep(0.0, 0.04, s) * (1.0 - smoothstep(0.22, 0.27, s));
  vec3 col = mix(pink, gold, stripe);
  col = mix(col, vec3(0.3, 0.2, 0.2), smoothstep(0.5, 0.56, vY));
  col = mix(col, vec3(0.22, 0.1, 0.12), 1.0 - smoothstep(-0.93, -0.86, vY));
  // Mặt trời TRƯỚC mặt người bay nên camera luôn thấy mặt khuất nắng (bẫy đá / người bay) — tự sáng theo hướng nhìn
  // + viền fresnel ấm, không dùng Lambert.
  float face = abs(dot(vN, vView));
  col *= 0.6 + 0.4 * face;
  col += vec3(1.0, 0.62, 0.45) * pow(1.0 - face, 3.0) * 0.55;
  float mouth = step(0.84, vUv.y);
  col = mix(col, vec3(1.7, 0.95, 0.5) * (0.85 + 0.15 * sin(uTime * 31.0)), mouth);
  gl_FragColor = vec4(col, 1.0);
}`})}function ow(t){return new Mt({uniforms:{...Ln.merge([_n.fog]),uTime:t},transparent:!0,depthWrite:!1,side:St,fog:!0,vertexShader:`
#include <fog_pars_vertex>
varying vec2 vUv;
varying float vK;
varying float vSeed;
void main() {
  vUv = uv;
  vK = instanceColor.r;
  vSeed = instanceColor.g;
  vec3 c = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float sx = length(instanceMatrix[0].xyz);
  float sy = length(instanceMatrix[1].xyz);
  // Billboard trụ (chỉ quay quanh trục đứng): khói bốc THẲNG lên dù camera chúc xuống.
  vec3 toCam = cameraPosition - c;
  vec3 right = normalize(vec3(toCam.z, 0.0, -toCam.x) + vec3(1e-4, 0.0, 0.0));
  vec4 mvPosition = viewMatrix * vec4(c + right * position.x * sx + vec3(0.0, position.y * sy, 0.0), 1.0);
  // Bình bị bỏ lỡ trôi qua sát ống kính: tấm khói 8 m choán cả khung — tan trong 6 → 16 m.
  vK *= smoothstep(6.0, 16.0, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,fragmentShader:`
#include <fog_pars_fragment>
uniform float uTime;
varying vec2 vUv;
varying float vK;
varying float vSeed;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  float y = vUv.y;
  float t = uTime + vSeed * 17.0;
  vec3 acc = vec3(0.0);
  float dens = 0.0;
  // Ba luồng xoắn quanh nhau, nở dần lên cao; vân cuộn trôi LÊN cùng khói (không trượt ngang trên tấm).
  for (int i = 0; i < 3; i++) {
    float ph = float(i) * 2.094;
    float cx = 0.5 + sin(y * 5.0 - t * 2.6 + ph) * (0.05 + 0.26 * y);
    float d = (vUv.x - cx) / (0.04 + 0.22 * y);
    float b = 0.4 + 0.95 * vn(vec2(vUv.x * 5.0 + float(i) * 3.1, y * 6.0 - t * 2.0));
    float k = exp(-d * d * 1.6) * b;
    vec3 c = i == 0 ? vec3(0.95, 0.07, 0.06) : i == 1 ? vec3(1.0, 0.58, 0.04) : vec3(0.04, 0.66, 0.54);
    acc += c * k;
    dens += k;
  }
  // Màn khói chung nở rộng phía trên (màu trộn của ba luồng): ba sợi rời nhìn như ruy băng cầu vồng, không phải khói.
  vec3 col = acc / max(dens, 1e-3);
  float dx = (vUv.x - 0.5) / (0.06 + 0.4 * y);
  dens += exp(-dx * dx) * 0.35 * y * (0.6 + 0.6 * vn(vec2(vUv.x * 4.0, y * 4.0 - t * 1.5)));
  float a = clamp(dens * 1.3, 0.0, 1.0) * pow(1.0 - y, 1.1) * smoothstep(0.0, 0.04, y) * vK * 0.92;
  // Khói pháo tự sáng một phần (lửa trong ống) — đêm vẫn thấy màu, ngày ăn nắng như khói chân (smoke-trail.ts).
  gl_FragColor = vec4(col * (ATM_SUN_LIGHT * 0.7 + ATM_SKY_AMBIENT * 0.45 + 0.35), a);
  #include <fog_fragment>
}`})}function aw(){const t=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([n,e])=>new yn(n*1.45,e*1.45));return new Is(t,22)}function sw(){const t=[];for(let n=0;n<=8;n++){const e=n/8*Math.PI*.5;t.push(new yn(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new Is(t,16)}const wd=`
varying vec2 vUv;
varying vec3 vInst;
void main() {
  vUv = uv;
  vInst = vec3(1.0);
  #ifdef USE_INSTANCING_COLOR
  vInst = instanceColor;
  #endif
  vec4 p = vec4(position, 1.0);
  #ifdef USE_INSTANCING
  p = instanceMatrix * p;
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * p;
}`,iw=`
uniform float uTime;
varying vec2 vUv;
varying vec3 vInst;
void main() {
  float v = clamp((vUv.y - 0.0) / 1.0, 0.0, 1.0);
  // vInst.b = loại giấy: 0 đèn trời đỏ cam · 1 đèn trời VÀNG (đèn nhỏ đèn ước thả ra) · 2 đèn ước hoa sen
  // (wish-lantern-geometry.ts: uv.y 0..1 cánh, 1..1,5 nến, 2..3 lửa). Chung MỘT program với đèn thường — dáng mới
  // không thêm lượt dịch shader nào (bẫy khựng giữa ván khi program đầu tiên xuất hiện muộn).
  if (vInst.b > 1.5) {
    if (vUv.y > 1.5) {
      // Lửa nến: lõi trắng vàng → ngọn cam, VƯỢT ngưỡng bloom (thứ duy nhất của đèn ước bloom, như lõi lửa đèn trời).
      float f = clamp(vUv.y - 2.0, 0.0, 1.0);
      vec3 fl = mix(vec3(2.6, 2.1, 1.2), vec3(2.1, 0.72, 0.1), smoothstep(0.2, 0.95, f));
      gl_FragColor = vec4(fl * (0.85 + 0.15 * sin(uTime * 21.0 + vInst.g * 30.0 + f * 6.0)), 1.0);
      return;
    }
    if (vUv.y > 0.999) {
      gl_FragColor = vec4(vec3(0.62, 0.08, 0.04) * (0.8 + 0.4 * (vUv.y - 1.0)), 1.0);
      return;
    }
    // Cánh sen vàng: gốc (sát nến) sáng nhất → mút vàng đậm ửng đỏ; viền cánh SẪM để dáng hoa đọc được trên mây trắng
    // (vàng sáng cạnh trắng chỉ khác sắc, không khác độ sáng). Bão hoà như giấy đèn: qua ACES vàng 1,2/0,9 ra kem.
    float e = min(vUv.x, 1.0 - vUv.x);
    vec3 petal = mix(vec3(1.15, 0.6, 0.05), vec3(0.85, 0.3, 0.02), smoothstep(0.05, 0.9, v));
    petal = mix(petal, vec3(0.72, 0.1, 0.05), smoothstep(0.7, 1.0, v) * 0.6);
    float rimP = 1.0 - smoothstep(0.04, 0.16, e);
    float vein = 1.0 - smoothstep(0.0, 0.035, abs(vUv.x - 0.5));
    petal *= (1.0 - 0.72 * rimP - 0.2 * vein) * (gl_FrontFacing ? 1.08 : 0.74) * vInst.r;
    gl_FragColor = vec4(petal, 1.0);
    return;
  }
  // Giấy: cam nóng gần lửa (đáy) → đỏ thẫm ở chóp. vInst.r = độ cháy (đèn mini của vòng nhiệt sáng hơn chút).
  // Bão hoà mạnh: qua ACES, cam 1,25/0,78 ra kem nhạt — đèn giấy nhìn như bóng đèn trắng (pk-lan-day 01/11).
  vec3 hot = vInst.b > 0.5 ? vec3(1.2, 0.72, 0.08) : vec3(1.15, 0.42, 0.1);
  vec3 top = vInst.b > 0.5 ? vec3(0.62, 0.26, 0.02) : vec3(0.42, 0.035, 0.025);
  vec3 col = mix(hot, top, smoothstep(0.12, 0.92, v));
  // 6 nan tre dọc + đai giữa + vành miệng — "đồ thủ công", không phải quả cầu sáng.
  float f = fract(vUv.x * 6.0);
  float rib = 1.0 - smoothstep(0.015, 0.05, min(f, 1.0 - f));
  float band = 1.0 - smoothstep(0.0, 0.025, abs(v - 0.52));
  float rim = 1.0 - smoothstep(0.0, 0.04, v);
  col *= 1.0 - 0.6 * max(rib, max(band * 0.8, rim));
  // Lửa thở nhẹ; mặt trong (nhìn qua miệng đáy) sáng hơn — đọc ra "có lửa bên trong".
  col *= (0.92 + 0.08 * sin(uTime * 9.0 + vInst.g * 40.0)) * (gl_FrontFacing ? 1.0 : 1.35) * vInst.r;
  gl_FragColor = vec4(col, 1.0);
}`,cw=`
varying vec2 vUv;
varying vec3 vInst;
void main() {
  // 8 múi xen kẽ ngọc / kem + đường may tối; mép dưới đậm hơn để thấy vành tán.
  float g = floor(fract(vUv.x) * 8.0);
  vec3 col = mod(g, 2.0) < 1.0 ? vec3(0.2, 0.85, 0.78) : vec3(1.0, 0.94, 0.8);
  float f = fract(vUv.x * 8.0);
  col *= 1.0 - 0.45 * (1.0 - smoothstep(0.0, 0.05, min(f, 1.0 - f)));
  col *= mix(0.75, 1.15, vUv.y) * (gl_FrontFacing ? 1.0 : 0.7) * vInst.r;
  gl_FragColor = vec4(col, 1.0);
}`;function rw(){return new Mt({vertexShader:wd,fragmentShader:iw,side:St,uniforms:{uTime:{value:0}}})}function lw(){return new Mt({vertexShader:wd,fragmentShader:cw,side:St})}function ke(t,n,e,o=0){return e.setRGB(t,n%1,o)}const Wi=6,Wl=3,Yl=new it(1,.16,.6);function hw(){const t=new rr;return t.moveTo(-1.2,-.5),t.lineTo(0,.7),t.lineTo(1.2,-.5),t.lineTo(.62,-.5),t.lineTo(0,.12),t.lineTo(-.62,-.5),t.closePath(),new Tf(t,{depth:.28,bevelEnabled:!1}).translate(0,0,-.14)}function uw(){const t=new vt(hw(),new qt,Wi*Wl),n=new vt(new hu(3.1,.16,6,40),new qt({color:Yl.clone().multiplyScalar(.9)}),Wi),e=new it;t.setColorAt(0,e.setRGB(0,0,0));for(const u of[t,n])u.frustumCulled=!1,u.count=0;const o=new Lt,a=new xt,s=new _,c=new _,i=new _(0,1,0);let r=0,h=0;return{meshes:[t,n],begin(){r=h=0},draw(u,l,f,m,d,g,v,p,k,b){if(r>=Wi)return;a.setFromAxisAngle(i,At(u.z));const w=1.6*p;for(let y=0;y<Wl;y++){const x=Math.max(0,Math.sin(g*7-y*1.3));o.compose(s.set(l,f+(y-1)*.95*w,m),a,c.set(w,w,w)),t.setMatrixAt(h,o),t.setColorAt(h++,e.copy(Yl).multiplyScalar(.5+.5*x))}o.compose(s.set(l,f,m),a,c.set(p,p,p)),n.setMatrixAt(r++,o),k(l,f,m,(5+7*v)*p*.8,1,.25,.65,.55),b(l,f-1.5,m,1.8*p,d,1.3,.2,.75)},commit(){t.count=h,n.count=r;for(const u of[t,n])u.instanceMatrix.needsUpdate=!0,u.instanceColor&&(u.instanceColor.needsUpdate=!0)}}}const Yi=2.1,xs=8,Kn=8,mw=46,dw=t=>new Mt({uniforms:{uTime:t},vertexShader:`
varying vec2 vUv;
varying vec3 vCol;
varying float vEdge;
void main() {
  vUv = uv;
  vCol = instanceColor;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  // BẪY (đã gặp): trụ co giãn KHÔNG đều (cao 46, rộng ~2) — mat3(instanceMatrix) * normal nhân thành phần y của pháp
  // tuyến (mặt trụ côn) lên 46 lần → pháp tuyến gần thẳng đứng, lõi = 0, cột tàng hình. Trụ không xoay nên lấy pháp
  // tuyến + hướng nhìn trên MẶT PHẲNG NGANG.
  vec3 n = normalize(vec3(normal.x, 0.0, normal.z));
  vec3 toCam = cameraPosition - wp.xyz;
  vEdge = abs(dot(n, normalize(vec3(toCam.x, 0.0, toCam.z) + 1e-4)));
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,fragmentShader:`
uniform float uTime;
varying vec2 vUv;
varying vec3 vCol;
varying float vEdge;
void main() {
  // Lõi sáng giữa trụ, mép tan (trụ hở nhìn ngang: pháp tuyến quay ra mép thì mờ) — một luồng sáng, không phải ống.
  float core = pow(vEdge, 2.2);
  // Đáy đậm, tan dần lên đỉnh; xung sáng chạy LÊN (đọc ra "bay vào đây thì được nâng / được cứu").
  float up = pow(max(1.0 - vUv.y, 0.0), 1.4) * smoothstep(0.0, 0.04, vUv.y);
  float pulse = 0.7 + 0.3 * sin(vUv.y * 26.0 - uTime * 7.0);
  gl_FragColor = vec4(vCol * core * up * pulse, 1.0);
}`,transparent:!0,blending:sn,depthWrite:!1});function fw(t){const n=new vt(new hu(Yi,.12,6,36),new qt({color:new it("#ffb04a").multiplyScalar(.95)}),Kn),e=new vt(sw(),lw(),Kn),o=new vt(new rt(1,.55,1,12,1,!0).translate(0,.5,0),dw(t),Kn*3),a=new vt(tw(),ew(t),Kn),s=new vt(nw(),ow(t),Kn),c=new it,i=uw(),r=[n,e,o,a,s];for(const w of r)w.frustumCulled=!1,w.count=0;e.setColorAt(0,ke(1,0,c)),o.setColorAt(0,c.setRGB(0,0,0)),s.setColorAt(0,c),s.renderOrder=3;const h=new Lt,u=new xt,l=new xt,f=new xt,m=new _,d=new _;let g=0,v=0,p=0,k=0;const b=(w,y,x,M,z,C,E,T)=>{if(p>=o.instanceMatrix.count)return;const A=1-Math.min(1,Math.max(0,(z-450)/150));h.compose(m.set(w,y,x),u.identity(),d.set(M,mw,M)),o.setMatrixAt(p,h),o.setColorAt(p++,c.setRGB(C*A,E*A,T*A))};return{meshes:[...r,...i.meshes],begin(){g=v=p=k=0,i.begin()},draw(w,y,x,M,z,C,E,T){const A=1+1.6*Math.min(1,Math.max(0,(z-30)/90));if(w.kind==="thermal"&&g<Kn){l.setFromAxisAngle(m.set(0,1,0),Math.sin(C*1.3+w.id)*.45),h.compose(m.set(y,x,M),l,d.set(A,A,A)),n.setMatrixAt(g++,h);for(let S=0;S<xs;S++){const L=C*1.8+S/xs*Math.PI*2;m.set(Math.cos(L)*Yi*A,Math.sin(L)*Yi*A,0).applyQuaternion(l),T.body(y+m.x,x+m.y-.5*A,M+m.z,.36*A,1.15,S*.31+w.id*.1),T.glow(y+m.x,x+m.y-.85,M+m.z,.8+1.4*E,1,.7,.28,.85)}T.glow(y,x,M,(6+6*E)*A*.8,1,.7,.25,.45),b(y,x-1,M,1.5*A,z,1.4,.95,.38);for(let S=0;S<6;S++){const L=(C*.9+S/6)%1,I=S*2.1+w.id;T.glow(y+Math.cos(I)*1.1*A,x-2.4+L*4.8*A,M+Math.sin(I)*.6,.9*A,1,.8,.35,Math.sin(L*Math.PI)*.9)}}else if(w.kind==="shield"&&v<Kn){u.setFromAxisAngle(m.set(0,0,1),Math.sin(C*1.7+w.id)*.3),h.compose(m.set(y,x+.9*A+.5*Math.sin(C*2.3+w.id),M),u,d.set(1.5*A,1.5*A,1.5*A)),e.setColorAt(v,ke(1,0,c)),e.setMatrixAt(v++,h),T.glow(y,x,M,(3+5*E)*A*.8,.3,.95,.9,.55),b(y,x+.4,M,1.3*A,z,.25,1.1,.95);for(let S=0;S<6;S++){const L=(C*.6+S/6)%1,I=C*2+S*1.05;T.glow(y+Math.cos(I)*.9*A,x+1+L*16*A,M+Math.sin(I)*.9*A,1.1*A,.35,1,.92,Math.sin(L*Math.PI)*.85)}}else if(w.kind==="boost")i.draw(w,y,x,M,z,C,E,A,T.glow,b);else if(w.kind==="smoke"&&k<Kn){u.setFromAxisAngle(m.set(0,1,0),C*1.6+w.id).premultiply(l.setFromAxisAngle(m.set(0,0,1),Math.sin(C*2.1+w.id)*.22));const S=1.6*A,L=x+.5*A+.35*Math.sin(C*2.6+w.id);h.compose(m.set(y,L,M),u,d.set(S,S,S)),a.setMatrixAt(k,h),m.set(0,S,0).applyQuaternion(u);const I=y+m.x,B=L+m.y,U=M+m.z;h.compose(m.set(I,B,U),f,d.set(6*A,13*A,1)),s.setMatrixAt(k,h),s.setColorAt(k++,c.setRGB(1-Math.min(1,Math.max(0,(z-450)/150)),w.id*.137%1,0)),T.glow(I,B,U,(1.2+2*E)*A,1,.55,.42,.9),T.glow(y,x,M,(3+5*E)*A*.8,1,.3,.62,.5),b(y,x+.4,M,.9*A,z,1.15,.22,.55);for(let W=0;W<5;W++){const Q=(C*2.4+W/5)%1,nt=W*2.4+w.id;T.glow(I+Math.cos(nt)*Q*.8*A,B+Q*2.2*A,U+Math.sin(nt)*Q*.8*A,.5*A,1,.75,.4,(1-Q)*.9)}}},commit(){n.count=g,e.count=v,o.count=p,a.count=s.count=k,i.commit();for(const w of r)w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0)}}}const Ms=[],$c=[],Gc=[];function xd(t,n,e){const o=Ms.length/3;for(let a=0;a<=n;a++)for(let s=0;s<=t;s++){const[c,i,r,h,u]=e(s,a);Ms.push(c,i,r),$c.push(h,u)}for(let a=0;a<n;a++)for(let s=0;s<t;s++){const c=o+a*(t+1)+s;Gc.push(c,c+1,c+t+1,c+1,c+t+2,c+t+1)}}function jl(t,n,e,o,a,s,c,i){const u=[e],l=[0],f=[a];for(let m=1;m<=9;m++){const d=(m-.5)/9,g=a-s*d;u.push(u[m-1]+o/9*Math.sin(g)),l.push(l[m-1]+o/9*Math.cos(g)),f.push(a-s*(m/9))}for(let m=0;m<t;m++){const d=n+m/t*Math.PI*2,g=Math.cos(d),v=Math.sin(d);xd(6,9,(p,k)=>{const b=k/9,w=p/6*2-1,y=c*Math.pow(Math.sin(Math.PI*Math.pow(b,1.2)),.75)+.1*c*(1-b),x=f[k],M=i*y*w*w,z=u[k]-M*Math.cos(x),C=l[k]+M*Math.sin(x),E=w*y*.5;return[z*g-E*v,C,z*v+E*g,(w+1)/2,b*.99]})}}function ji(t,n,e,o){const a=t.length-1;xd(n,a,(s,c)=>{const i=s/n*Math.PI*2,[r,h]=t[c];return[Math.sin(i)*r,h,Math.cos(i)*r,s/n,e+(o-e)*c/a]})}let Xi=null;function gw(){if(Xi)return Xi;Ms.length=$c.length=Gc.length=0,ji([[0,-.16],[.24,-.14],[.36,-.04],[.3,.04]],16,.92,.82),jl(8,0,.24,1.12,1.2,.55,.64,.2),jl(8,Math.PI/8,.18,.95,.62,.32,.54,.24),ji([[0,.05],[.11,.05],[.11,.62],[0,.64]],12,1,1.45);const t=[];for(let e=0;e<=8;e++){const o=e/8;t.push([.2*Math.pow(Math.sin(Math.PI*Math.pow(o,.55)),.9),.6+.9*o])}ji(t,12,2,3);const n=new ht;return n.setAttribute("position",new $(new Float32Array(Ms),3)),n.setAttribute("uv",new $(new Float32Array($c),2)),n.setIndex(Gc.slice()),n.computeVertexNormals(),n.computeBoundingSphere(),Xi=n,n}const Oc=4,Dc=9,Zi=1.9,ks=Dc*3,pw=1.5,vw=ks,yw=Oc*8+ks;function bw(t){const n=new vt(gw(),t,Oc);n.frustumCulled=!1,n.count=0;const e=new it;n.setColorAt(0,ke(1,0,e,2));const o=new Lt,a=new xt,s=new xt,c=new _,i=new _,r=[],h={x:0,y:0,z:0},u={x:0,y:0,z:0};let l=0;return{mesh:n,begin(){l=0},draw(f,m,d,g,v,p,k,b,w,y){if(l>=Oc)return;const x=w>=0;a.setFromAxisAngle(c.set(0,1,0),b*.55+f*.37+(x?w*w*6:0)),a.multiply(s.setFromAxisAngle(c.set(1,0,0),Math.sin(b*1.3+f)*.1));const M=x?v*(1+.5*Math.sin(Math.PI*Math.min(1,w*1.6)))*(1-w*w*w):v;if(M<=.01)return;const z=d-.55*M;o.compose(c.set(m,z,g),a,i.set(M,M,M)),n.setMatrixAt(l,o),n.setColorAt(l++,ke(1,f*.137,e,2));const C=x?1-w:1;y.glow(m,z+1*M,g,(1.6+3.4*p+1.2*k)*M*(.9+.1*Math.sin(b*17+f)),1,.78,.32,.95*C),y.glow(m,z+.5*M,g,(5+9*p)*M,1,.74,.28,(.08+.3*p+.2*k)*C);for(let E=0;E<6;E++){const T=(b*.45+E/6)%1,A=b*1.4+E*1.047+f,S=(1.5+.7*T)*M;y.glow(m+Math.cos(A)*S,z+(.2+2.2*T)*M,g+Math.sin(A)*S,.55*M,1,.86,.42,Math.sin(T*Math.PI)*C)}},release(f,m,d){for(let g=0;g<Dc;g++){const v=g/Dc*Math.PI*2+Math.random()*.5,p=6+Math.random()*4;r.push({x:f,y:m,z:d,vx:Math.cos(v)*p,vy:3+Math.random()*3,vz:Math.sin(v)*p,life:Zi,ph:Math.random()})}r.length>ks&&r.splice(0,r.length-ks)},step(f,m,d,g){if(!r.length)return;D(m,0,0,h),D(m+1,0,0,u);const v=d*.97/Math.max(.001,Math.hypot(u.x-h.x,u.y-h.y,u.z-h.z)),p=(u.x-h.x)*v,k=(u.y-h.y)*v,b=(u.z-h.z)*v,w=Math.exp(-f*2.2);for(let y=r.length-1;y>=0;y--){const x=r[y];if(x.life-=f,x.life<=0){r.splice(y,1);continue}x.vx*=w,x.vz*=w,x.vy=x.vy*w+3.5*f,x.x+=(x.vx+p)*f,x.y+=(x.vy+k)*f,x.z+=(x.vz+b)*f;const M=.42*Math.min(1,x.life/(Zi*.35))*Math.min(1,.3+(Zi-x.life)/.12);g.body(x.x,x.y,x.z,M,1.1,x.ph,1),g.glow(x.x,x.y-.9*M,x.z,1.8*M+.4,1,.75,.3,.9)}},commit(){n.count=l,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}}}const ln={x:0,y:0,z:0},Qi=260,Xl=1600,Zl=220,Ra=3200;function ww(t){const n=Math.round(Xl*t),e=new yt,o=rw(),a=new vt(aw(),o,Qi+8*xs+vw);a.frustumCulled=!1;const s=fw(o.uniforms.uTime),c=bw(o),i=_r(Qi+Xl+Zl+8*(xs+7)+56+yw);e.add(a,c.mesh,...s.meshes,i.points);const r=new it;a.setColorAt(0,ke(1,0,r));const h=[],u=new Map,l=new Lt,f=new xt,m=new _,d=new _(1,1,1),g=new xt;let v=0,p=0;const k={body(w,y,x,M,z,C,E=0){v>=a.instanceMatrix.count||(l.compose(m.set(w,y,x),f.identity(),d.set(M,M,M)),a.setColorAt(v,ke(z,C,r,E)),a.setMatrixAt(v++,l))},glow:(w,y,x,M,z,C,E,T)=>i.set(p++,w,y,x,M,z,C,E,T)},b=(w,y,x,M,z)=>{for(let C=0;C<M&&h.length<Zl;C++){const E=Math.random()*Math.PI*2,T=Math.random()*2-1,A=6+Math.random()*10;h.push({x:w,y,z:x,vx:Math.cos(E)*A*Math.sqrt(1-T*T),vy:T*A+3,vz:Math.sin(E)*A*Math.sqrt(1-T*T),life:z?.7:1})}};return{group:e,setViewport:(w,y)=>i.setViewport(w,y),burst:b,burstWish(w,y,x){c.release(w,y,x),b(w,y,x,56,!1)},update(w,y,x,M,z){v=0,p=0,o.uniforms.uTime.value=y,s.begin(),c.begin();for(const T of w.pickups){if(T.z-w.z>600||v>=Qi)continue;D(T.z,Tt(T.lane),T.v+Math.sin(y*2.4+T.id)*.45,ln);let A=ln.x,S=ln.y,L=ln.z,I=T.z,B=1,U=-1;if(T.taken){const Q=u.get(T.id)??y;if(u.set(T.id,Q),U=(y-Q)/(T.wish?.9:.6),U>=1)continue;I=w.z+4+U*10,D(I,Tt(T.lane),T.v,ln),A=ln.x,L=ln.z,S=ln.y+U*U*14,B=T.wish?1:1-U}const W=Math.min(1,Math.max(0,(T.z-w.z-40)/210));if(B*=Math.min(1,Math.max(0,(I-z-2)/6)),!(B<=0))if(T.kind==="lantern"){f.setFromAxisAngle(m.set(0,1,0),y*.8+T.id).multiply(g.setFromAxisAngle(m.set(0,0,1),Math.sin(y*1.9+T.id)*.12));const Q=Math.min(1,Math.max(0,(I-z-25)/65)),nt=(1+((G.lanternScale??1)-1)*(.15+.85*Q))*B;if(T.wish){c.draw(T.id,A,S,L,nt*pw,W,M,y,U,k),!T.taken&&T.z>w.z-15&&ts(A,S,L,1.6,T.z-z);continue}l.compose(m.set(A,S,L),f,d.set(nt,nt,nt)),a.setColorAt(v,ke(1,T.id*.137,r)),a.setMatrixAt(v++,l),i.set(p++,A,S-.9*nt,L,(1.4+3.2*W+1.2*M)*nt,1,.62,.22,(.75+.25*M)*B),!T.taken&&T.z>w.z-15&&ts(A,S-.9,L,1,T.z-z)}else T.taken||(T.kind==="thermal"&&ts(A,S,L,1.6,T.z-z),s.draw(T,A,S,L,T.z-w.z,y,W,k))}for(const T of u.keys())w.pickups.some(A=>A.id===T)||u.delete(T);c.step(x,w.z,w.speed,k),c.commit(),a.count=v,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.commit();const C=Math.min(n,Math.floor(n*(.12+.88*M)));for(let T=0;T<C;T++){const A=N(T*.37,1.7,81)*Ra,S=z-300+((A-z+300)%Ra+Ra)%Ra,L=Qt(S);if(L<.35)continue;const I=N(T,2.9,82)<.5?-1:1;D(S,I*(30+Math.pow(N(T,3.3,83),1.5)*1400),0,ln);const B=(y*(2+3*N(T,4.1,84))+N(T,5.3,85)*700)%700,U=Pt(S)+(G.skyLanternFloor??-380)+B+Math.sin(y*.5+T)*2,W=L*Math.min(1,B/60)*(1-Math.max(0,B-600)/100);i.set(p++,ln.x,U,ln.z,2.6,1,.5+.1*Math.sin(T),.16,W*(.35+.65*M))}const E=At(w.z);for(let T=h.length-1;T>=0;T--){const A=h[T];if(A.life-=x*1.6,A.life<=0){h.splice(T,1);continue}A.vy-=9*x,A.x+=A.vx*x,A.y+=A.vy*x,A.x+=Math.sin(E)*w.speed*.85*x,A.z+=(A.vz+Math.cos(E)*w.speed*.85)*x,i.set(p++,A.x,A.y,A.z,.7*A.life+.2,1,.7,.3,A.life)}i.commit(p)}}}function Nn(t,n,e=0,o=0){t.getAttribute("normal")||t.computeVertexNormals();const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv");const s=a.getAttribute("position").count,c=new Float32Array(s*3);for(let i=0;i<s;i++)c.set(n,i*3);return a.setAttribute("color",new $(c,3)),a.setAttribute("aSlot",new $(new Float32Array(s).fill(e),1)),a.setAttribute("aGlow",new $(new Float32Array(s).fill(o),1)),a}const xw=new _(0,1,0);function Uc(t,n,e,o){const a=new _().subVectors(n,t),s=new rt(e,e,a.length(),3,1,!0);return s.applyQuaternion(new xt().setFromUnitVectors(xw,a.normalize())),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),Nn(s,o)}function Ql(t,n){const e=new ht;return e.setAttribute("position",new $(new Float32Array(t),3)),e.setIndex(n),e}const To=[[1.3,0],[2.2,1.2],[3.6,3],[5.3,5.4],[6.9,8],[8.1,10.6],[8.8,13],[8.9,14.6],[8.5,16.4],[7.4,18],[5.7,19.3],[3.5,20.2],[1.6,20.6],[0,20.7]],Mw=20.7,Rr=-4.55,Ss=8.9,Jl=12,Ia=2,kw=[1,2,1,3],Sw=18.5,Tw=[.3,.24,.2],Aw=[.45,.27,.11],Nw=[.18,.18,.2],zw=[.2,.17,.14],Cw=[.05,.03,.02];function Ew(){const t=[],n=[],e=[],o=[],a=[],s=[],c=[],i=To.length-1;for(let l=0;l<=i;l++){const f=To[Math.max(0,l-1)],m=To[Math.min(i,l+1)],d=Math.hypot(m[0]-f[0],m[1]-f[1]);s.push((m[1]-f[1])/d),c.push(-(m[0]-f[0])/d)}const r=(l,f,m)=>{const[d,g]=To[l],v=Math.cos(f),p=Math.sin(f);t.push(d*v,g,d*p),n.push(s[l]*v,c[l],s[l]*p),e.push(...m===0?Tw:[1,1,1]),o.push(m),a.push(.3+.7*(1-g/Mw)**2)},h=Jl*Ia;for(let l=0;l<Jl;l++)for(let f=0;f<Ia;f++){const m=(l*Ia+f)/h*Math.PI*2,d=(l*Ia+f+1)/h*Math.PI*2;for(let g=0;g<i;g++){const v=g===0?0:To[g][1]>=Sw?3:kw[l%4];r(g,m,v),r(g+1,m,v),r(g+1,d,v),r(g,m,v),r(g+1,d,v),r(g,d,v)}}const u=new ht;return u.setAttribute("position",new $(new Float32Array(t),3)),u.setAttribute("normal",new $(new Float32Array(n),3)),u.setAttribute("color",new $(new Float32Array(e),3)),u.setAttribute("aSlot",new $(new Float32Array(o),1)),u.setAttribute("aGlow",new $(new Float32Array(a),1)),u}function Lw(){const t=[Ew(),Nn(new F(1.5,1.15,1.5).translate(0,-3.95,0),Aw),Nn(new F(.6,.3,.6).translate(0,-2.45,0),Nw),Nn(new se(.28,1.3,6).translate(0,-1.6,0),Cw,0,2)];for(let e=0;e<4;e++){const o=Math.PI/4+e*Math.PI/2,a=Math.cos(o),s=Math.sin(o);t.push(Uc(new _(1.3*a,.05,1.3*s),new _(Math.sign(a)*.72,-3.38,Math.sign(s)*.72),.05,zw))}const n=kt(t);if(!n)throw new Error("sky-festival: ghép hình khinh khí cầu hỏng (lệch bộ thuộc tính)");return n}const Vt=[.8,.035,.03],dn=[.025,.15,.78],Md=[.08,.42,.9],Hn=[.78,.03,.4],It=[.84,.84,.82],kd=[.02,.5,.48],Ts=[.3,.05,.68],Sd=[.95,.3,.03],Td=[.92,.66,.04],Ws=[[Vt,It,Vt],[dn,It,Vt],[Hn,It,Hn],[It,Vt,dn],[Vt,Sd,Td],[dn,Md,It],[Hn,Ts,dn],[It,dn,dn],[kd,It,Hn],[Vt,Hn,Ts],[It,Hn,Vt],[dn,Vt,It]],Ir=[[Vt,It,dn],[dn,It,Vt],[Hn,It,Ts],[Vt,Td,dn],[It,Vt,Vt],[Ts,Hn,It],[kd,It,Hn],[dn,Md,It],[Vt,Sd,It]],_w=.45,Rw=.9,Iw=.2;function Pw(){const t={value:1},n={value:0},e={value:0},o=new ie({vertexColors:!0,side:St,fog:!0});return o.onBeforeCompile=a=>{a.uniforms.uLift=t,a.uniforms.uNight=n,a.uniforms.uTime=e,a.vertexShader=`attribute float aSlot;
attribute float aGlow;
attribute vec3 aPalA;
attribute vec3 aPalB;
attribute vec3 aPalC;
attribute float aSeed;
varying float vGlow;
varying float vSeed;
${a.vertexShader}`.replace("#include <color_vertex>",`#include <color_vertex>
  if (aSlot > 0.5) vColor.rgb = aSlot < 1.5 ? aPalA : (aSlot < 2.5 ? aPalB : aPalC);
  vGlow = aGlow;
  vSeed = aSeed;`),a.fragmentShader=`uniform float uLift;
uniform float uNight;
uniform float uTime;
varying float vGlow;
varying float vSeed;
${a.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += diffuseColor.rgb * ${_w.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = max(dot(-toCam, ATM_SUN_DIR), 0.0);
    totalEmissiveRadiance += diffuseColor.rgb * ATM_SUN_LIGHT * pow(facing, 3.0) * ${Rw.toFixed(3)} * uLift;
    float fres = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * facing * ${Iw.toFixed(3)} * uLift;
  }
  #endif
  {
    // Đầu đốt phụt từng đợt (~1/3 thời gian, lệch pha theo quả) + rung lửa. Dù lượn có aGlow 0 nên không ăn gì.
    float burn = smoothstep(0.35, 0.8, sin(uTime * 0.5 + vSeed * 6.2832)) * (0.8 + 0.2 * sin(uTime * 23.0 + vSeed * 41.0));
    float flame = step(1.5, vGlow);
    totalEmissiveRadiance += burn * (flame * vec3(2.2, 1.0, 0.3) * (0.4 + uNight)
      + (1.0 - flame) * vGlow * diffuseColor.rgb * (0.12 + 1.3 * uNight));
  }`)},o.customProgramCacheKey=()=>"sky-festival-cloth",{material:o,lift:t,night:n,time:e}}const We=14,Ji=.95,tc=6.3,Bw=2.6,nc=[[1,1],[.65,1],[.35,1],[.12,1],[0,0],[.12,-1],[.5,-1],[1,-1]],Ys=-7,Hw=5.2,Kc=[1,1,1],th=[.72,.7,.66],Fw=[.08,.08,.1],$w=[.12,.14,.22],Gw=[.85,.85,.82];function As(t,n,e,o){const a=-Ji+2*Ji*t/We,s=a/Ji,c=Bw*Math.sqrt(1-.72*s*s),i=.75*(.2969*Math.sqrt(n)-.126*n-.3516*n*n+.2843*n**3-.1015*n**4),r=(.2*n*(1-n)+(e>0?i:e<0?-.55*i:0))*c,h=Math.sin(a),u=Math.cos(a);return o.set((tc+r)*h,(tc+r)*u-tc,c*(.35-n)-.3*s*s)}function Ow(){const t=[],n=new _,e=nc.length;for(let o=0;o<We;o++){const a=Math.min(o,We-1-o),s=a<2?3:a<5?2:1,c=[];for(const r of[o,o+1])for(const[h,u]of nc)c.push(...As(r,h,u,n).toArray());const i=[];for(let r=0;r<e;r++){const h=r,u=(r+1)%e;i.push(h,u,u+e,h,u+e,h+e)}t.push(Nn(Ql(c,i),Kc,s))}for(const o of[0,We]){const a=[];for(const[c,i]of nc)a.push(...As(o,c,i,n).toArray());const s=[];for(let c=1;c<e-1;c++)s.push(0,c,c+1);t.push(Nn(Ql(a,s),Kc,3))}return t}const nh=new _(-.22,-6.45,0),eh=new _(.22,-6.45,0);function Dw(){const t=[],n=new _;for(const e of[1,3,5,9,11,13])t.push(Uc(As(e,.3,-1,n).clone(),e<We/2?nh:eh,.035,th));for(const e of[1,13])t.push(Uc(As(e,1,-1,n).clone(),e<We/2?nh:eh,.03,th));return t}function Uw(){return[Nn(new F(.5,.34,.7).translate(0,-6.75,.02),Fw),Nn(new F(.44,.6,.3).rotateX(-.25).translate(0,-6.32,-.14),Kc,1),Nn(new F(.36,.2,.75).translate(0,-6.86,.55),$w),Nn(new Rn(.17,0).translate(0,-5.88,-.18),Gw)]}function Kw(){const t=kt([...Ow(),...Dw(),...Uw()]);if(!t)throw new Error("sky-festival: ghép hình dù lượn hỏng (lệch bộ thuộc tính)");return t}const oo=3e3,ao=150,Vw=400,qw=40,Ns=25,ha=24,Ye=40,Ww=40,oh=t=>t<Ye?Ww:ha,Yw=8,jw=10,Xw=500,ah=600,ze=25,X={s:0,x:1,y:2,z:3,psi:4,a:5,b:6,w:7,phi:8,bob:9,freq:10,scale:11,on:12},js=13;function Zw(t){return{cap:t,rec:new Float64Array(t*js),pal:new Float32Array(t*9),seed:new Float32Array(t)}}function Ce(t,n,e){const o=n*js,a=t.rec;a[o+X.s]=e.s,a[o+X.x]=e.x,a[o+X.y]=e.y,a[o+X.z]=e.z,a[o+X.psi]=e.psi,a[o+X.a]=e.a,a[o+X.b]=e.b,a[o+X.w]=e.w,a[o+X.phi]=e.phi,a[o+X.bob]=e.bob,a[o+X.freq]=e.freq,a[o+X.scale]=e.scale,a[o+X.on]=1,t.seed[n]=e.seed;for(let s=0;s<3;s++)t.pal.set(e.scheme[s],n*9+s*3)}function Gn(t,n){t.rec[n*js+X.on]=0}function Ee(t,n){return t[Math.min(t.length-1,Math.floor(n*t.length))]}function Qw(t,n){return R(n+oo,n+oo-Vw,t)*R(n-ao,n-ao+qw,t)}const sh=[],Pa={x:0,y:0,z:0};function ho(t,n,e,o,a){const s=Math.max(6,Math.ceil(2*Math.PI*Math.sqrt((e*e+o*o)/2)/jw)),c=Math.sin(a),i=Math.cos(a);let r=lt(t,n);for(let h=0;h<s;h++){const u=h/s*Math.PI*2,l=e*Math.cos(u),f=o*Math.sin(u);r=Math.max(r,lt(t+c*l+i*f,n+i*l-c*f))}return r}function Le(t,n,e,o,a,s,c,i=!0){let r=Math.max(s,c+Yw-a);if(!i)return r;const h=ra(t,n,Xw,sh);for(let u=0;u<h;u++){const l=sh[u];if(!(l.core>0))for(let f=-1;f<=1;f++){const m=l.s+f*o;l.dist-o<bn(m)+Ns&&(r=Math.max(r,Y(m)+oh(l.dist-o)-a))}}for(let u=e-ah;u<=e+ah;u+=ze){D(u,0,0,Pa);const l=Math.hypot(t-Pa.x,n-Pa.z)-o-ze/2;l<bn(u)+Ns&&(r=Math.max(r,Pa.y+oh(l)-a))}return r}function na(t,n,e){return{ring:Math.ceil((oo+ao)/t)+3,per:n,span(o,a){a[0]=Math.floor((o-ao)/t)-1,a[1]=Math.floor((o+oo)/t)},build:e}}function Xs(t,n,e){const o=t.length,a=Math.min(...t),s=Math.max(...t);return{ring:o*(Math.floor((oo+ao+s-a)/ct)+2)+1,per:n,span(c,i){i[0]=Math.floor((c-ao+_t-s)/ct)*o,i[1]=Math.floor((c+oo+_t-a)/ct)*o+o-1},build:e}}function Zs(t,n){const e=Math.floor(t/n.length),o=t-e*n.length;return{s:n[o]-_t+e*ct,j:o}}const Ad=Math.PI*2,Nd=1.6,ih=new lu(0,0,0,"YXZ"),Jw=new xt,tx=new _,nx=new _;function Pr(t,n,e,o,a,s,c,i){ih.set(a,s,c),t.compose(tx.set(n,e,o),Jw.setFromEuler(ih),nx.set(i,i,i))}const ex=(t,n,e,o,a,s)=>{const c=t[e+X.a],i=t[e+X.b],r=t[e+X.w],h=t[e+X.phi]+r*o,u=Math.cos(h),l=Math.sin(h),f=Math.sin(t[e+X.psi]),m=Math.cos(t[e+X.psi]),d=f*c*u+m*i*l,g=m*c*u-f*i*l,v=Math.atan2((-f*c*l+m*i*u)*r,(-m*c*l-f*i*u)*r),p=-r*r*(d*Math.cos(v)-g*Math.sin(v)),k=n*Ad,b=Math.max(-.7,Math.min(.7,-Math.atan(p/9.8)*Nd)),w=t[e+X.y]+t[e+X.bob]*Math.sin(o*t[e+X.freq]+k);Pr(s,t[e+X.x]+d,w,t[e+X.z]+g,.06+.04*Math.sin(o*1.1+k),v,b,t[e+X.scale]*a)},ox=(t,n,e,o,a,s)=>{const c=n*Ad,i=t[e+X.freq],r=t[e+X.a]*Math.sin(o*i+t[e+X.phi]),h=t[e+X.psi],u=t[e+X.y]+t[e+X.b]*Math.sin(o*i*1.7+c);Pr(s,t[e+X.x]+Math.sin(h)*r,u,t[e+X.z]+Math.cos(h)*r,.03*Math.sin(o*.55+c*1.3),t[e+X.phi]+t[e+X.w]*o,.03*Math.sin(o*.43+c),t[e+X.scale]*a)},Qs=Hw+3,Br=6,oe=(t,n)=>e=>N(t,e,n),ch=6,ax=6,ec={x:0,y:0,z:0};function rh(t,n,e,o){let a=-1/0;for(let s=0;s<ch;s++){const c=t+(n-t)*s/(ch-1);for(const i of e)D(c,o*i,0,ec),a=Math.max(a,lt(ec.x,ec.z)-Y(c))}return a}function Hr(t,n,e,o){const a=rh(t,n,e,1),s=rh(t,n,e,-1),c=Math.abs(a-s)<ax?o<.5?1:-1:a<s?1:-1;return[c,-c]}const lh=Math.PI*2,hh=1050,sx=.85,Vc=1.25,zd=3,uh=3,Ao=zd+Ss*Vc,ix=70,Vn={x:0,y:0,z:0};function mh(t,n,e,o){const a=Ye+ze/2+Ao+3+18*n(2),s=Rr*Vc-uh;for(const c of Hr(t-80,t+80,[a,a+Ao],n(3))){D(t,c*a,ha+2-s+6*n(4),Vn);const i=Le(Vn.x,Vn.z,t,Ao,s-Br,Vn.y,ho(Vn.x,Vn.z,Ao,Ao,0));if(!(i-Y(t)>ix))return Ce(o,e,{s:t,x:Vn.x,y:i,z:Vn.z,psi:n(5)*lh,a:zd,b:uh,w:(n(6)<.5?-1:1)*.03,phi:n(7)*lh,bob:0,freq:.03,scale:Vc,seed:n(8),scheme:Ee(Ir,n(9))})}Gn(o,e)}function cx(t){return[{...na(hh,1,(n,e,o)=>{const a=oe(n,707);if(a(0)>=sx)return Gn(o,e);mh((n+.25+.5*a(1))*hh,a,e,o)}),whoosh:!0},{...Xs(t,1,(n,e,o)=>mh(Zs(n,t).s,oe(n,709),e,o)),whoosh:!0}]}const rx=Math.PI*2,dh=420,lx=.85,qc=3,Fr=.28,Wc=950,Yc=140,hx=220,$r=1.45,ge=Qs*$r,Gr=1.2,Cd=Ys*$r-Gr,ye=30,Jn=-Fr*Wc-60,Or=Fr*Yc+5,te=Math.ceil((Or-Jn)/ye)+1,ns=15,Ed=Math.ceil((Or-Jn+2*ye)/ns)+1,ux=85,mx=-12,dx=170,fh=15,fn={x:0,y:0,z:0},Ba=new Float64Array(Ed),No=new Float64Array(te);function fx(t,n,e,o,a,s,c,i){const r=a+s/2,h=ge+s/2,u=e+Jn-ye;Ba.fill(Number.NaN);const l=m=>{if(Number.isNaN(Ba[m])){let d=-1/0;for(const g of s>6?[a-ge,r,a+s+ge]:[a-ge,a+s+ge])D(u+m*ns,o*g,0,fn),d=Math.max(d,lt(fn.x,fn.z));Ba[m]=d}return Ba[m]};for(let m=0;m<te;m++){const d=e+Jn+m*ye;let g=-1/0;const v=Math.min(Ed-1,Math.ceil((m+2)*ye/ns));for(let p=Math.floor(m*ye/ns);p<=v;p++)g=Math.max(g,l(p));if(D(d,o*r,c,fn),No[m]=Le(fn.x,fn.z,d,h,Cd,fn.y,g)-Y(d),No[m]>i)return 1/0}let f=-1/0;for(let m=0;m<te;m++){const d=Math.max(No[Math.max(0,m-1)],No[m],No[Math.min(te-1,m+1)]);t[n+m]=d,f=Math.max(f,d)}return f}function gx(t,n,e,o,a,s){const c=o(2)<.3?3:o(2)<.6?2:1,i=7+5*o(3),r=16+10*o(4),h=i*(c-1),u=Hr(e+Jn,e,[Ye+30,Ye+h+70],o(7)),l=u.map(d=>[d,Ye+ze/2+ge+2+8*o(5),ha+1-Cd+6*o(6)]);let f=0;for(let d=0;d<=4;d++)f=Math.max(f,bn(e+Jn+(Or-Jn)*d/4));const m=f+Ns+ze/2+ge+3+10*o(5);m<=dx&&l.unshift([u[0],m,mx+8*o(6)]);for(const[d,g,v]of l)if(fx(t,n*te,e,d,g,h,v,v<0?v+12:ux)!==1/0){for(let p=0;p<c;p++)Ce(s,a+p,{s:e,x:d*(g+p*i),y:p*(1.5+2*o(8+p)),z:-p*r,psi:n,a:0,b:0,w:0,phi:0,bob:Gr,freq:.35+.2*o(11+p),scale:$r,seed:o(14+p),scheme:Ee(Ws,o(17+p))});return}}function gh(t,n,e){let o=new Float64Array(0),a=0;const i={...t,build:(r,h,u)=>{for(let m=0;m<qc;m++)Gn(u,h+m);const l=oe(r,e),f=n(r,l);f!==null&&gx(o,(r%a+a)%a,f,l,h,u)},pose:(r,h,u,l,f,m,d)=>{const g=r[u+X.s],v=g+Fr*(d-g)+r[u+X.z],p=Math.min(te-1.0001,Math.max(0,(v-g-Jn)/ye)),k=Math.floor(p),b=p-k,w=r[u+X.psi]*te+k,y=h*rx,x=o[w]*(1-b)+o[w+1]*b+r[u+X.y]+Gr*Math.sin(l*r[u+X.freq]+y);D(v,r[u+X.x],x,fn);const M=-Math.atan(fh*fh*aa(v)/9.8)*Nd,z=Math.max(-.5,Math.min(.5,M))+.05*Math.sin(l*.7+y);Pr(m,fn.x,fn.y,fn.z,.06+.03*Math.sin(l*1.1+y),At(v),z,r[u+X.scale]*f)},fade:(r,h)=>R(r-Wc,r-Wc+hx,h)*(1-R(r+Yc-40,r+Yc,h)),cost:4,whoosh:!0};return a=i.ring,o=new Float64Array(a*te),i}function px(t){const n=()=>{};return[gh(na(dh,qc,n),(e,o)=>o(0)<lx?(e+.2+.6*o(1))*dh:null,706),gh(Xs(t,qc,n),e=>Zs(e,t).s,708)]}const Ld=[{phase:1160,lat:300,side:0,base:-70,n:5},{phase:1330,lat:320,side:0,base:-40,n:5},{phase:2660,lat:190,side:-1,base:-50,n:4},{phase:2860,lat:210,side:-1,base:-30,n:5}],_d=[{phase:285,lat:106,side:0,up:-95},{phase:1220,lat:260,side:0,up:-60}],vx=[300,1e3,1250],yx=[240,1e3,1250],ae=Math.PI*2,Rd=80,Id=550,Pd=400,bx=.85,Bd=900,Hd=Ld.map(t=>t.phase),Dr=5,Ha=new Float64Array(Dr),Fd=_d.map(t=>t.phase),at={x:0,y:0,z:0};function $d(t,n,e){const o=aa(t);return n===0||Math.abs(o)<1e-4?e<.5?-1:1:n*Math.sign(o)}function wx(t){return(n,e,o)=>{const a=oe(n,701);if(a(0)>=t)return Gn(o,e);const s=(n+a(1))*Rd,c=(a(2)<.5?-1:1)*(55+a(3)**2.2*1300),i=1.3+.6*R(150,1100,Math.abs(c)),r=50+110*a(5),h=r*(.15+.3*a(6)),u=a(7)*ae,l=2+3*a(11);D(s,c,12+a(4)**1.8*320,at);const f=ho(at.x,at.z,r,h,u),m=Le(at.x,at.z,s,r+Qs*i,Ys*i-l,at.y,f);if(m-Y(s)>Bd)return Gn(o,e);const d=(a(9)<.5?-1:1)*(8+3*a(8))/Math.sqrt((r*r+h*h)/2);Ce(o,e,{s,x:at.x,y:m,z:at.z,psi:u,a:r,b:h,w:d,phi:a(10)*ae,bob:l,freq:.15+.2*a(12),scale:i,seed:a(13),scheme:Ee(Ws,a(14))})}}function xx(t){return(n,e,o)=>{const a=oe(n,702),{s,j:c}=Zs(n,Hd),i=Ld[c],r=Math.max(2,Math.round(i.n*(.4+.6*t)));D(s,$d(s,i.side,a(0))*(i.lat+30*(a(1)-.5)),i.base,at);const h=5,u=26+10*a(2);let l=-1/0;for(let d=0;d<r;d++)Ha[d]=32+26*a(10+d),l=Math.max(l,ho(at.x,at.z,Ha[d],Ha[d],0)-d*u);const f=Le(at.x,at.z,s,58+Qs,Ys-h,at.y,l),m=a(3)<.5?-1:1;for(let d=0;d<Dr;d++){if(d>=r){Gn(o,e+d);continue}const g=Ha[d];Ce(o,e+d,{s,x:at.x,y:f+d*u,z:at.z,psi:0,a:g,b:g,w:m*(8.5+1.5*a(20+d))/g,phi:d/r*ae+a(30+d),bob:h,freq:.08+.05*a(40+d),scale:1,seed:a(50+d),scheme:Ee(Ws,a(60+d))})}}}const Mx=(t,n,e)=>{const o=oe(t,703);if(o(0)>.85)return Gn(e,n);const a=(t+.15+.7*o(1))*Id,s=18+10*o(3),c=s+Qs,i=1.5,r=Ys-i,h=o(4)<bx,u=h?Ye+c+ze/2+30*o(5):bn(a)+Ns+c+ze/2+10+35*o(5),l=h?ha+2-r+8*o(6):5+20*o(6);D(a,(o(2)<.5?-1:1)*u,l,at);const f=Le(at.x,at.z,a,c,r,at.y,ho(at.x,at.z,s,s,0));Ce(e,n,{s:a,x:at.x,y:f,z:at.z,psi:0,a:s,b:s,w:(o(7)<.5?-1:1)*9/s,phi:o(8)*ae,bob:i,freq:.3,scale:1,seed:o(9),scheme:Ee(Ws,o(10))})};function kx(t){return(n,e,o)=>{const a=oe(n,704);if(a(0)>=.4+.6*t)return Gn(o,e);const s=(n+a(1))*Pd,c=(a(2)<.5?-1:1)*(220+a(3)**1.6*1800),i=1+.6*R(400,2e3,Math.abs(c)),r=20+20*a(4),h=6+6*a(5),u=a(7)*ae;D(s,c,40+360*a(6),at);const l=Rr*i-h-Br,f=Le(at.x,at.z,s,r+Ss*i,l,at.y,ho(at.x,at.z,r,0,u));if(f-Y(s)>Bd)return Gn(o,e);Ce(o,e,{s,x:at.x,y:f,z:at.z,psi:u,a:r,b:h,w:(a(8)<.5?-1:1)*(.02+.04*a(9)),phi:a(10)*ae,bob:0,freq:.02+.02*a(11),scale:i,seed:a(12),scheme:Ee(Ir,a(13))})}}const Sx=(t,n,e)=>{const o=oe(t,705),{s:a,j:s}=Zs(t,Fd),c=_d[s],i=1.1,r=4,h=o(3)*ae,u=Rr*i-r,l=c.side===0?Hr(a-40,a+40,[c.lat],1-o(0))[0]:$d(a,c.side,o(0));D(a,l*(c.lat+30*o(1)),(c.up??ha+2-u)+15*o(2),at);const f=c.up!==void 0&&c.up+15+2*Ss*i<-40,m=Le(at.x,at.z,a,8+Ss*i,u-Br,at.y,ho(at.x,at.z,8,0,h),!f);Ce(e,n,{s:a,x:at.x,y:m,z:at.z,psi:h,a:8,b:r,w:(o(4)<.5?-1:1)*.03,phi:o(5)*ae,bob:0,freq:.03,scale:i,seed:o(6),scheme:Ee(Ir,o(7))})};function Tx(t){return[na(Rd,1,wx(t)),Xs(Hd,Dr,xx(t)),na(Id,1,Mx),...px(vx)]}function Ax(t){return[na(Pd,1,kx(t)),{...Xs(Fd,1,Sx),whoosh:!0},...cx(yx)]}const Nx=4*Math.PI*100;function ph(t,n,e,o,a,s){const c=[];let i=0;for(const f of o)c.push(i),i+=f.ring*f.per;const r=f=>new ar(new Float32Array(i*f),f).setUsage(is),h=[r(3),r(3),r(3)],u=r(1);n.setAttribute("aPalA",h[0]),n.setAttribute("aPalB",h[1]),n.setAttribute("aPalC",h[2]),n.setAttribute("aSeed",u);const l=new vt(n,e,i);return l.name=t,l.instanceMatrix.setUsage(is),l.frustumCulled=!1,l.count=0,{mesh:l,bank:Zw(i),streams:o,bases:c,keys:o.map(f=>new Float64Array(f.ring).fill(Number.NaN)),spans:o.map(()=>[Number.NaN,Number.NaN]),order:new Int32Array(i).fill(-1),pal:h,seed:u,pose:a,whoosh:yp(i),big:s}}const le=[0,0],zx=4;function Cx(t,n,e){for(let o=0;o<t.streams.length;o++){const a=t.streams[o];a.span(n,le);const s=t.spans[o];if(le[0]===s[0]&&le[1]===s[1])continue;const c=t.keys[o];let i=!0;for(let r=le[0];r<=le[1];r++){const h=(r%a.ring+a.ring)%a.ring;if(c[h]!==r){if(e<=0){i=!1;break}e-=a.cost??1,c[h]=r,a.build(r,t.bases[o]+h*a.per,t.bank),t.order.fill(-1)}}i&&(s[0]=le[0],s[1]=le[1])}return e}const oc=new Lt;function Ex(t,n,e){const{rec:o,pal:a,seed:s}=t.bank;let c=0,i=!1;t.whoosh.begin(n,e);for(let r=0;r<t.streams.length;r++){const h=t.streams[r],u=h.pose??t.pose,l=h.fade??Qw,f=t.bases[r]+h.ring*h.per;for(let m=t.bases[r];m<f;m++){const d=m*js;if(!o[d+X.on])continue;const g=l(o[d+X.s],n);if(!(g<=0)){if(u(o,s[m],d,e,g,oc,n),h.whoosh&&t.whoosh.watch(m,oc,t.big),t.mesh.setMatrixAt(c,oc),t.order[c]!==m){t.order[c]=m,i=!0;for(let v=0;v<3;v++){const p=t.pal[v].array;for(let k=0;k<3;k++)p[c*3+k]=a[m*9+v*3+k]}t.seed.array[c]=s[m]}c++}}}if(t.mesh.count=c,t.mesh.instanceMatrix.needsUpdate=!0,i){for(let r=0;r<3;r++)t.pal[r].needsUpdate=!0;t.seed.needsUpdate=!0}}function Lx(t){const n=new yt;if(n.name="sky-festival",ee()<=.5)return{group:n,update(){}};const e=Pw(),o=[ph("sky-festival-paragliders",Kw(),e.material,Tx(t),ex,!1),ph("sky-festival-balloons",Lw(),e.material,Ax(t),ox,!0)];for(const a of o)n.add(a.mesh);return{group:n,update(a,s,c){e.lift.value=1-.85*zn((c-.4)/.5),e.night.value=zn((c-.45)/.4),e.time.value=s%Nx;let i=zx;for(let r=0;r<o.length;r++){const h=o[r];i=Cx(h,a,i),Ex(h,a,s)}}}}const zo=(t,n,e)=>{const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)};function _x(t,n,e,o,a,s){const c=a/7+1.3*N(e*1.2+3,o*1.2,t.seed+21),i=Math.floor(c),r=c-i,h=N(i,t.seed*3.1,22),u=5+Math.floor(h*2.999),l=2*Math.PI/u,f=((n+h*7.7)%l+l)%l-l/2,m=1-Math.cos(l/2)/Math.cos(f),d=t.crest&&a<t.bandLo-.01?.9:.4,g=.12*(1-h),v=.1*(1-Math.sin(Math.PI*r))**2,p=(h-.5)*2.4,k=zo(.42,.7,N(e*3+i*1.7,o*3,t.seed+23)),b=Math.pow(.5+.5*Math.sin(n*5+s*3+t.seed*1.3+p),9)*k,w=Math.max(0,1-Math.min(r,1-r)/.09),y=w*w*zo(.35,.55,N(e*2+5,o*2+i,t.seed+24)),x=a<t.bandLo-3?.22*zo(.68,.82,N(e*1.8+9,o*1.8+a/11,t.seed+25)):0,M=a>=t.bandLo-.01&&a<=t.bandHi+.01?.6:1,z=.5+.5*(e*Math.cos(t.seed*2.4)+o*Math.sin(t.seed*2.4)),C=zo(.5,.75,N(e*2.2+13,o*2.2,t.seed+26)),E=t.crest&&a>t.top-1.3?Math.min(.85,.1+.6*z*z+.3*C)*(a-(t.top-1.3)):0,A=(t.crest?Math.min(1,Math.max(0,(t.bandLo-a)/4)):0)*.3*zo(.45,.75,N(e*1.6+17,o*1.6+a/9,t.seed+27));return{shape:M*(d*m+g+v)-A,groove:M*(.1*b+.12*y)+x,drop:E}}const Ot=40;function Rx(t){const n=[];for(let e=t.bottom;e<t.top;){n.push(e);const o=Math.min(Math.abs(e-t.bandLo),Math.abs(e-t.bandHi),e>t.bandLo&&e<t.bandHi?0:99);e+=Math.min(10,1.2+o*.12)}return t.granite&&t.crest?[...n.filter(e=>e<t.top-1.25),t.top-1,t.top-.55,t.top-.25,t.top]:(n.push(t.top),n)}function ea(t){const n=Rx(t),e=[],o=[],a=[];let s=0;for(const f of n){const m=f>=t.bandLo-.01&&f<=t.bandHi+.01,d=m?t.rc:t.radius(f),g=Math.min(1,Math.max(0,(t.radius(f+6)-d)/(d*.6))),[v,p]=m?[0,0]:t.offset?.(f)??[0,0];for(let k=0;k<Ot;k++){const b=k/Ot*Math.PI*2,w=Math.cos(b),y=Math.sin(b),x=N(w*1.4+t.seed*7.1,y*1.4+f/26,31)-.5,M=N(w*4+t.seed,y*4+f/5,32)-.5,z=t.granite?0:Math.max(0,Math.sin((f/7+N(w,y,t.seed)*2)*Math.PI))**6*.12;let C=d*(1+.42*x+.12*M+z);m&&(C=t.rc*(.9+.1*(M+.5))),t.granite&&t.crest&&f>t.top-1.2&&(C*=1-.5*((f-(t.top-1.2))/1.2)**2);const E=Math.pow(.5+.5*Math.sin(b*9+x*5+t.seed+f/40),5),T=Math.pow(Math.max(0,Math.sin((f/4.6+N(w*2,y*2,t.seed+9)*1.5)*Math.PI)),10),A=t.granite?_x(t,b,w,y,f,x):null,S=A?A.groove:.1*E+.09*T,L=A?d*(1-A.shape):d;C*=(1-S)*(A?1-A.shape:1),e.push(w*C+v,A?f-A.drop:f,y*C+p),A&&f===t.top&&(s+=A.drop/Ot),a.push(Math.min(.85,Math.max(0,(1-C/L)*1.6)+S*2.5+g*.55)),o.push(t.crest&&f>t.top-.7?1:0)}}const[c,i]=t.offset?.(t.top)??[0,0];e.push(c,t.top+(t.crest?0:2.5)-s,i),o.push(t.crest?1:0),a.push(0);const r=[];for(let f=0;f<n.length-1;f++)for(let m=0;m<Ot;m++){const d=f*Ot+m,g=f*Ot+(m+1)%Ot;r.push(d,d+Ot,g,g,d+Ot,g+Ot)}const h=n.length*Ot,u=(n.length-1)*Ot;for(let f=0;f<Ot;f++)r.push(u+f,h,u+(f+1)%Ot);const l=new ht;return l.setAttribute("position",new $(new Float32Array(e),3)),l.setAttribute("aCrest",new $(new Float32Array(o),1)),l.setAttribute("aShade",new $(new Float32Array(a),1)),l.setIndex(r),l.computeVertexNormals(),l}function Ix(t,n){const e=[],o=new it;for(let a=0;a<n;a++){const s=a<Math.ceil(n*.6),c=s?t.top-1.5-3*N(a,t.seed,41):t.bandLo-6-40*N(t.seed,a,42),i=t.seed*2.3+a*2.39,r=s?t.radius(c)*.75*N(a,t.seed,43):t.radius(c)*.95,h=.35+.35*N(a*1.3,t.seed,44),u=(N(a,t.seed*3,45)<.45?Tm():Am()).clone();u.scale(h,h*1.1,h).rotateY(i).translate(Math.cos(i)*r,c,Math.sin(i)*r),o.setHSL(.24+.06*N(a,7,t.seed),.3,.55);const l=u.getAttribute("color");if(l)for(let f=0;f<l.count;f++)l.setXYZ(f,l.getX(f)*o.r*2,l.getY(f)*o.g*2,l.getZ(f)*o.b*2);e.push(u)}return kt(e)}function Px(t,n){const e=46+10*N(t,1,51);return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:o=>o<-6.5?n+.3*Math.pow(-6.5-o,.9):(n+.32*(o-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-o)/7)))}}function Ur(t,n,e=!1){const o=a=>e?3*(1-Math.exp(-a/3)):0;return{seed:t,rc:n,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,granite:e,radius:a=>n+.28*Math.pow(Math.max(0,-6.5-a),.92)+o(Math.max(0,-6.5-a))}}function Bx(t,n,e=0){const o=e===2,a=o?80+20*N(t,3,52):62+30*N(t,3,52),s=o?1.05+.25*N(t,4,53):.55+.35*N(t,4,53),c=e===1?5+6*N(t,6,55):1.2*N(t,6,55),i=N(t,7,56)*Math.PI*2;return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:a,crest:!1,granite:!0,radius:r=>{if(r<-6.5)return n+.34*Math.pow(-6.5-r,.92);const h=Math.max(0,(a-r)/(a-22.5)),u=Math.min(1,Math.max(0,(r-22.5)/10));return Math.max(.6,(n+2.2*u*u*(3-2*u))*Math.pow(h,s))},offset:r=>{const h=Math.max(0,(r-22.5)/(a-22.5));return[Math.cos(i)*c*h*h,Math.sin(i)*c*h*h]}}}function Hx(t,n){const e=50+18*N(t,8,57),o=N(t,9,58)*Math.PI*2,a=n+.6;return{seed:t+5,rc:2.4,bandLo:0,bandHi:0,bottom:24,top:e,crest:!1,granite:!0,radius:s=>Math.max(.5,2.8*Math.pow(Math.max(0,(e-s)/(e-24)),.75)),offset:s=>[Math.cos(o)*(a+.08*(s-24)),Math.sin(o)*(a+.08*(s-24))]}}function Fx(t){return[0,1,2,3,4,5].map(n=>{const e=n*2.1+.9,o=ea(Bx(e,t,n%3));return n<3?o:kt([o,ea(Hx(e,t))])})}const es=t=>Math.min(1,Math.max(0,t)),vh=t=>{const n=es(t);return n*n*(3-2*n)};function $x(t,n,e){const o=Math.floor(Math.abs(e(t/2-1))*13.7)%997,a=new F(t,1,7.6,Math.max(16,Math.round(t)),48,6).translate(0,.5,0);a.deleteAttribute("normal"),a.deleteAttribute("uv");const s=Af(a);a.dispose();const c=s.getAttribute("position"),i=new Float32Array(c.count),r=new Float32Array(c.count);for(let h=0;h<c.count;h++){const u=c.getX(h),l=c.getY(h),f=c.getZ(h),m=Math.abs(f)/3.8,d=es((Math.abs(u)-10)/3.5),g=Math.floor(u/2.6+.4*N(f*.3,1,o+31)),v=N(g,0,o+32),p=n(u)-(1-d)*.6*N(u*.5,f,3)-d*(2.6*v-.9+.5*N(u*.7,f*.5,o+33)),k=e(u)-10*N(u*.06,1,4);let b=k+(p-k)*l;r[h]=Math.abs(u)<12&&b>.3?1:0;const w=1+.6*es(-b/40),y=u/3.4+.7*N(u*.09,b*.045,o+41),x=Math.floor(y),M=y-x,z=N(x,0,o+42),C=5+7*z,E=b/C+z*7.3,T=E-Math.floor(E),A=N(x,Math.floor(E),o+43),S=vh(Math.min(M,1-M)/.22),L=A>.5?vh(Math.min(T,1-T)*C/.7):1,I=(.25+.75*(.65*z+.35*A))*S*L,B=2*(Ft(u*.07,b*.06,3,9+o)-.5),U=Math.min(1,Math.max(0,(p-b-.6)/2.4),Math.max(0,(b-k)/3)),W=(1.3*I-.5+.6*B)*U;i[h]=U*m*Math.min(.7,.55*(1-S*L)+.3*Math.max(0,-B));let Q=f*w*(1+.3*(N(u*.2,b*.1,5)-.5))+Math.sign(f)*m*W;l>.999&&(b-=.45*m**4),Q-=Math.sign(f)*.35*m*es(1-(p-b)/1.2),c.setXYZ(h,u*(1+.04*(N(b*.1,f,6)-.5)),b,Q)}return s.setAttribute("aCrest",new $(r,1)),s.setAttribute("aShade",new $(i,1)),s.computeVertexNormals(),s}const In=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function yh(t,n,e){if(Te()==="fansipan")return $x(t,n,e);const o=new F(t,1,7.6,Math.max(10,Math.round(t/2)),36,4).translate(0,.5,0),a=o.getAttribute("position"),s=new Float32Array(a.count);for(let i=0;i<a.count;i++){const r=a.getX(i),h=a.getY(i),u=a.getZ(i),l=Math.min(1,Math.max(0,(Math.abs(r)-9)/4)),f=n(r)-(1-l)*.6*N(r*.5,u,3)-l*1.6*(N(r*.3,u*.2,3)-.3),m=e(r)-10*N(r*.06,1,4),d=m+(f-m)*h,g=1+.6*Math.max(0,Math.min(1,-d/40)),v=((d+3*N(r*.04,0,7))/5.5%1+1)%1,p=2.4*(Ft(r*.07,d*.06,3,9)-.5),k=Math.min(1,Math.max(0,(f-d-.6)/2.4),Math.max(0,(d-m)/3)),b=(1.3*(1-v)-.65+p)*k;s[i]=k*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(v-.5)/.5)+.35*Math.max(0,-p));const w=u*g*(1+.3*(N(r*.2,d*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*b;a.setXYZ(i,r*(1+.04*(N(d*.1,u,6)-.5)),d,w)}const c=new Float32Array(a.count);for(let i=0;i<a.count;i++)c[i]=Math.abs(a.getX(i))<12&&a.getY(i)>.3?1:0;return o.setAttribute("aCrest",new $(c,1)),o.setAttribute("aShade",new $(s,1)),o.computeVertexNormals(),o}function he(t,n,e=()=>0){const o=t.getAttribute("position"),a=new Float32Array(o.count*3),s=new Float32Array(o.count);for(let c=0;c<o.count;c++)a.set(n,c*3),s[c]=e(o.getY(c));return t.setAttribute("color",new $(a,3)),t.setAttribute("aSway",new $(s,1)),t}function Gx(t,n){const e=[],o=In([.6,.42,.27]),a=r=>10.2-2.2*(1-(2*r/t)**2);for(let r=-t/2;r<t/2;r+=.9)e.push(he(new F(.8,.22,3).translate(r,-.55,0).toNonIndexed(),o));if(n)for(const r of[-t/2,t/2])e.push(he(new F(1.2,260,1.2).translate(r,-118,0).toNonIndexed(),o));for(const r of[-1.5,1.5]){e.push(he(new F(t,.08,.08).translate(0,1.2,r).toNonIndexed(),o));const h=Array.from({length:13},(u,l)=>new _(-t/2+l/12*t,0,r*.3)).map(u=>u.setY(a(u.x)));e.push(he(new ir(new cr(h),24,.07,4).toNonIndexed(),o))}const s=[In([.86,.12,.1]),In([.98,.72,.12]),In([.86,.12,.1]),In([.95,.88,.7]),In([.2,.55,.3]),In([.2,.4,.75])];let c=0;for(let r=-t/2+.6;r<t/2;r+=1.15,c++){const h=a(r)-.05,u=Math.min(h-1.5,5.4+2.2*N(r,2,8)+(c%3===0?1.3:0)),l=new En(.62,u,2,6),f=l.getAttribute("position");for(let d=0;d<f.count;d++){const g=(u/2-f.getY(d))/u;f.setX(d,f.getX(d)*(1-.15*g)),g>.99&&Math.abs(f.getX(d))<.01&&f.setY(d,f.getY(d)+.5)}l.rotateY((N(r,5,9)-.5)*.9).translate(r,h-u/2,c%2?.25:-.25);const m=s[Math.floor(N(r*1.7,3,10)*s.length*.999)];e.push(he(l.toNonIndexed(),m,d=>Math.min(1,Math.max(0,(h-d)/u))))}for(let r=-t/2+2.3;r<t/2-1;r+=4.6){const h=a(r)-.75;e.push(he(new rt(.34,.34,.66,8).translate(r,h,-.6).toNonIndexed(),In([.95,.16,.08]),()=>.3)),e.push(he(new rt(.2,.2,.1,8).translate(r,h+.38,-.6).toNonIndexed(),In([.98,.75,.25]),()=>.3))}const i=kt(e);return i.computeVertexNormals(),i}const Co=2.9,Ox=-1.25;function Dx(t,n,e,o){const a=Co+n,s=new F(a,1,6.8,Math.max(6,Math.round(a/3)),8,3).translate(a/2-Co,.5,0),c=s.getAttribute("position"),i=new Float32Array(c.count);for(let r=0;r<c.count;r++){const h=c.getX(r),u=c.getY(r),l=c.getZ(r),f=Math.min(1,Math.max(0,(h+Co)/Math.max(1,a))),m=9+(e-9)*Math.pow(f,.7)+6*(Ft(h*.08,l*.1+o,3,31)-.5),d=h>Co?(h-Co)*.35+.8*N(h*.4,l*.5+o,5):0,g=Ox+d,v=g+(m-g)*u,p=1.6*(Ft(h*.09+o,v*.07,3,37)-.5)*Math.min(1,u*6);i[r]=Math.max(0,.6-u*3)*.8,c.setXYZ(r,h*t,v,l*(1+.15*Math.min(1,v/30))+Math.sign(l)*p)}if(s.setAttribute("aShade",new $(i,1)),s.setAttribute("aCrest",new $(new Float32Array(c.count),1)),t<0){const r=s.getIndex();for(let h=0;h<r.count;h+=3){const u=r.getX(h+1);r.setX(h+1,r.getX(h+2)),r.setX(h+2,u)}}return s.computeVertexNormals(),s}const Ux=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function Kx(t,n,e){const o=n-e,a=Math.max(0,o-Km),s=a>2,c=2+a,i=[Xn({len:t-1.4,width:6,base:s?"stilts":"plinth",floor:c,top:o-.02,skirt:s,roof:{half:4.1,rise:4.6,thick:.55,color:eo},wall:An,crest:!0,sink:6,windows:5,firewood:!0},31)],r=c+2.5,h=-3-.45;i.push(H(new rt(.07,.07,t-3,5,1,!0).rotateZ(Math.PI/2).translate(0,r,h),Zo,.15,3));for(let l=-t/2+2.2;l<t/2-2;l+=1.05){if(Math.abs(l)<1.1)continue;const f=N(l*.9,1.3,84),m=new rt(.26,.05,1.1+.3*f,5,1).translate(l,r-.6-.15*f,h);i.push(Ne(H(m,Gm,.2,l),(d,g)=>g>r-.45?.75:1))}for(const l of[-1,1])i.push(Um().scale(1.1,1.1,1.1).translate(l*(t/2+1.6),0,-1.6*l));const u=s?c:0;for(let l=-t/2+1.2;l<=t/2-1.1;l+=2.9)for(const f of[-2.7,2.7])i.push(H(new rt(.2,.26,u+42,5,1,!0).translate(l,(u-42)/2,f),jn,.15,l+f));return bt(i).translate(0,e,0)}function Gd(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3),c=new Float32Array(a.count);for(let i=0;i<a.count;i++)s.set(n,i*3),c[i]=e(a.getY(i));return o.setAttribute("color",new $(s,3)),o.setAttribute("aSway",new $(c,1)),o}const zs=Om.map(Ux);function ac(t,n,e,o,a,s){for(let c=o,i=0;c<=a+.01;c+=.8,i++){const r=e*(1+.45*N(c*2.3,s,87)),h=new En(.74,r,2,2),u=h.getAttribute("position");for(let f=0;f<u.count;f++){const m=(r/2-u.getY(f))/r;u.setX(f,u.getX(f)*(1-.6*m)),m>.99&&Math.abs(u.getX(f))<.01&&u.setY(f,u.getY(f)+.3*r)}h.rotateY((N(c,s,85)-.5)*.6).translate(c,n-r/2,i%2?.14:-.14);const l=zs[Math.floor(N(c*1.7,s,86)*zs.length*.999)];t.push(Gd(h,l,f=>Math.min(1,Math.max(0,(n-f)/r))))}}const Eo=(t,n,e)=>H(new rt(n,n*1.08,t,7,1,!0),Zo,.2,e);function Vx(t){const n=[];for(const a of[-1,1]){for(const[s,c,i]of[[11,.34,12.2],[12,.26,11.4]])n.push(Eo(i-t+6,c,s*a).translate(a*s,(i+t-6)/2,0));for(const s of[-1,1])n.push(Eo(4.4,.13,s+a).rotateZ(s*.55).translate(a*11.5,12.6,s*.12))}n.push(Eo(24.6,.3,1).rotateZ(Math.PI/2).translate(0,-.7,0)),n.push(Eo(24.6,.26,2).rotateZ(Math.PI/2).translate(0,-.18,.05));for(const[a,s]of[[2.4,.2],[5.62,.18],[7.62,.18],[10.5,.3]])n.push(Eo(24.6,s,a).rotateZ(Math.PI/2).translate(0,a,0));const e=new En(22.2,2.4,28,3).rotateY(Math.PI).translate(0,1.15,0);n.push(Ne(H(e,[.74,.66,.4],.15,5),(a,s)=>(Math.floor(a/.8)+Math.floor(s/.8))%2?1:.76)),n.push(H(new F(22.2,.05,.05).translate(0,10.15,-.05),[.35,.3,.22],.05,6)),n.push(Dm({len:25.6,half:1.5,rise:1.25,thick:.34,color:eo},7).translate(0,10.75,0));const o=[];ac(o,5.5,3.05,-10.4,10.4,1),ac(o,7.5,1.85,-10.4,10.4,2),ac(o,9.5,1.85,-10.4,10.4,4);for(let a=-10.6,s=0;a<=10.6;a+=.62,s++){const c=new ht;c.setAttribute("position",new $(new Float32Array([a-.3,10.15,-.08,a+.3,10.15,-.08,a,9.05,-.08]),3)),c.computeVertexNormals(),o.push(Gd(c,zs[s%zs.length],i=>i<9.5?1:0))}return{frame:bt(n),flags:bt(o)}}const jc=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],qx=[.08,.17,.1],Wx=[.29,.43,.2],Yx=[.33,.23,.16],Fe=-6.5,$e=22.5,jx=2.4,Oo=3.3;function Xx(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3);for(let c=0;c<a.count;c++){const i=e(a.getY(c));s.set([n[0]*i,n[1]*i,n[2]*i],c*3)}return o.setAttribute("color",new $(s,3)),o}function Zx(t,n,e,o,a){const s=new rt(o*.6,o,Oo,10,1,!0).translate(0,Oo/2,0),c=s.getAttribute("position");for(let f=0;f<c.count;f++){if(c.getY(f)>.01)continue;const m=Math.atan2(c.getZ(f),c.getX(f)),d=N(m*2.2+a,a*.37,91),g=.86+.26*d;c.setXYZ(f,c.getX(f)*g,c.getY(f)-.55*d,c.getZ(f)*g)}s.rotateY(a*1.3).translate(t,n,e);const i=jc(Wx),r=jc(qx),h=s.toNonIndexed();h.deleteAttribute("uv"),h.computeVertexNormals();const u=h.getAttribute("position"),l=new Float32Array(u.count*3);for(let f=0;f<u.count;f++){const d=u.getY(f)<n+Oo*.5?i:r,g=.85+.3*N(u.getX(f)*.7+a,u.getZ(f)*.7,92);l.set([d[0]*g,d[1]*g,d[2]*g],f*3)}return h.setAttribute("color",new $(l,3)),h}function Qx(t,n,e,o){for(let a=n,s=0;a<t.top-Oo*.6;a+=jx,s++){const c=t.radius(a);if(c<.35)break;const[i,r]=t.off(a);o.push(Zx(i,a,r,c,e+s*.71))}}function Jx(t,n,e){const o=Math.max(e+1.6,-40),a=54+6*N(t,2,93),s=(d,g)=>g/(1-.4*Math.min(1,(Fe-d)/Oo)),c=d=>d<Fe?Math.min(5.2,n+1.2+.08*(Fe-d),s(d,n+.3)):d<=$e?n+.3-.35*((d-Fe)/($e-Fe)):(n-.05)*Math.pow(Math.max(0,(a-d)/(a-$e)),.85),i=t*2.1,r=(d,g)=>({top:g,off:v=>{const p=1.2+.13*Math.max(0,v-$e);return[Math.cos(d)*p,Math.sin(d)*p]},radius:v=>v<Fe?Math.min(3,s(v,2.2)):v<=$e?2.2:2.2*Math.pow(Math.max(0,(g-v)/(g-$e)),.9)}),h=[{top:a,off:()=>[0,0],radius:c},r(i,40+5*N(t,5,94)),r(i+2.4,45+5*N(t,6,95))],u=[];h.forEach((d,g)=>{const[v,p]=d.off(o),k=d.top*.8-(e-3);u.push(Xx(new rt(.35,.9,k,6,1,!0).translate(v,e-3+k/2,p),jc(Yx),b=>.7+.3*Math.min(1,Math.max(0,(b-e)/30)))),Qx(d,o+g*.8,t*3.7+g,u)});const l=kt(u),f=l.getAttribute("position"),m=l.getAttribute("color");for(let d=0;d<f.count;d++){const g=.78+.42*Math.min(1,Math.max(0,(f.getY(d)-e)/(a-e)));m.setXYZ(d,m.getX(d)*g,m.getY(d)*g,m.getZ(d)*g)}return l}function tM(t){const n=[];for(const[o,a,s]of[[0,.6,3.4],[2.3,3,2.3],[4.4,2.8,1.9]]){const c=o+t,i=new Rn(s,1).scale(1,.55,.9).rotateY(c).translate(Math.cos(c)*a,s*.12,Math.sin(c)*a);i.deleteAttribute("uv"),n.push(i)}const e=kt(n);return e.computeVertexNormals(),e}const bh=new Map;function Cs(t,n){let e=bh.get(t);return e||bh.set(t,e=n()),e}const wh=new Map,os=t=>new j(t,Ks).add(pn(t));function nM(t,n,e){if(t.kind==="ridge")return os(Cs(`d${n}`,()=>Kx(26,1,n)));if(t.kind==="bridge"){let c=wh.get(n);return c||wh.set(n,c=Vx(n)),new yt().add(os(c.frame),new j(c.flags,e))}const a=(G.zone(Z(t.z),!0)==="valley"?0:2)+t.id%2,s=os(Cs(`h${a}:${n}`,()=>Fv(a,1-n)));return s.position.y=n,s.updateMatrix(),new yt().add(s,Ar(7,8,n+.12))}const Fa=[],sc={x:0,y:0,z:0};function eM(t){const n=md();if(t.kind==="spike"){if(!Fa.length)for(const i of[0,1,2]){const r=Ur(i*2.3+.7,Wt.spike.halfX);Fa.push({rock:ea(r),trees:D2(r.seed,r.radius,r.top,5)})}const c=Fa[t.id%Fa.length];return new yt().add(new j(c.rock,n).add(pn(c.rock)),new j(c.trees,lo))}D(t.z,Tt(t.lane),0,sc);const e=Math.round(lt(sc.x,sc.z)-Y(t.z)),o=t.id%4,a=Cs(`p${o}:${e}`,()=>Jx(o*1.7+.3,Wt.pillar.halfX,e)),s=new j(Cs(`b${o}`,()=>tM(o*1.9)),n);return s.position.y=e,s.updateMatrix(),new yt().add(os(a),s)}const xh=64,ic=170,$a=5.5;function oM(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.35,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new oa(t)}function aM(){const t=new yt,n=(g,v)=>{const p=new vt(g,v,xh);return p.frustumCulled=!1,p.count=0,p.setColorAt(0,new it),t.add(p),p},e=kt([new rt(.95,1.05,1.7,14),new rt(1.35,1.2,.24,14).translate(0,.97,0),new F(.34,.34,2.4).translate(0,-.45,1.3)]),o=n(e,new ie({color:3421756})),a=n(new Rn(1,2),new qt({fog:!1})),s=n(new Nf(1,24),new qt({map:oM(),fog:!1,transparent:!0,depthWrite:!1,blending:sn,side:St}));s.renderOrder=3;const c=n(new uu(.82,1,28),new qt({fog:!1,transparent:!0,depthWrite:!1,blending:sn,side:St}));c.renderOrder=3;const i=new Lt,r=new xt,h=new _,u=new _,l=new _,f=new _(0,0,1),m={x:0,y:0,z:0},d=new it;return{group:t,update(g,v){let p=0,k=1/0;for(const b of g.obstacles){const w=b.z-Wt[b.kind].halfZ-.4-g.z;w>=6&&w<=ic&&b.z<k&&(k=b.z)}for(const b of g.obstacles){const w=Wt[b.kind],y=b.z-w.halfZ-.4,x=y-g.z;if(x<6||x>ic||b.z>k+8)continue;const M=Math.sin(b.id*12.9898)*43758.5453,z=(M-Math.floor(M))*2-1,C=w.hi<$a?w.hi-.7:w.lo>-$a?w.lo+.7:z*2.2,E=Number.isFinite(w.halfX)?[b.lane]:[-1,0,1],T=(1-Math.min(1,Math.max(0,(x-ic+25)/25)))*Math.min(1,Math.max(0,(x-6)/8)),A=v*1.4+b.id*.113,S=.3+.7*Math.min(1,Math.max(0,Math.sin(A*Math.PI*2)*1.6+.6)),L=A-Math.floor(A),I=.45+x*.008;for(const B of E){if(p>=xh)break;const U=Tt(B)+(Number.isFinite(w.halfX)&&w.hi>$a&&w.lo<-$a?z*.9:0);D(y+1,U,C,m),l.set(m.x,m.y,m.z),D(y,U,C,m),l.sub(h.set(m.x,m.y,m.z)).normalize(),r.setFromUnitVectors(f,l),i.compose(h.set(m.x,m.y,m.z).addScaledVector(l,.35*I),r,u.setScalar(I)),o.setMatrixAt(p,i),o.setColorAt(p,d.setRGB(1,1,1)),i.compose(h.set(m.x,m.y,m.z).addScaledVector(l,-.55*I),r,u.setScalar(I*.78)),a.setMatrixAt(p,i),a.setColorAt(p,d.setRGB(2.2,.06,.04).multiplyScalar(S*T)),i.compose(h,r,u.setScalar(I*3.4)),s.setMatrixAt(p,i),s.setColorAt(p,d.setRGB(.9,.08,.04).multiplyScalar(S*T)),i.compose(h,r,u.setScalar(I*(1.3+3.2*L))),c.setMatrixAt(p,i),c.setColorAt(p,d.setRGB(1.4,.05,.03).multiplyScalar((1-L)**2*T)),p++}}for(const b of[o,a,s,c])b.count=p,b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0)}}}const Po=md(),Od=lo,Dd={value:1},Ud={value:0},ua=new ie({vertexColors:!0,side:St});ua.onBeforeCompile=t=>{t.uniforms.uLift=Dd,t.uniforms.uTime=Ud,Object.assign(t.uniforms,no),t.vertexShader=`attribute float aSway;
uniform float uTime;
${t.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),t.fragmentShader=`uniform float uLift;
${Gs}${t.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};ua.customProgramCacheKey=()=>"cloth-hazard";const Kd=(t,n)=>({rock:ea(t),trees:Ix(t,n)}),Vd=[0,1,2,3,4,5,6,7].map(t=>Kd(Px(t*1.7+.3,Wt.pillar.halfX),9)),sM=[0,1,2].map(t=>Kd(Ur(t*2.3+.7,Wt.spike.halfX),4)),qd=new ht;let iM=null;const cM=()=>iM??=Fx(Wt.pillar.halfX).map(t=>({rock:t,trees:qd}));let rM=null;const lM=()=>rM??=[0,1,2].map(t=>({rock:ea(Ur(t*2.3+.7,Wt.spike.halfX,!0)),trees:qd})),Mh=new Map;function Wd(t,n){const e=Math.ceil(t/4)*4,o=`${e}:${n}`;let a=Mh.get(o);return a||Mh.set(o,a=Gx(e,n)),a}const kh=new Map;function cc(t,n){let e=kh.get(t);return e||kh.set(t,e=n()),e}function hM(t,n){const e=Y(t.z),o=t.kind==="ridge"||t.kind==="bridge";D(t.z,o?0:Tt(t.lane),0,n);const a=Math.round((lt(n.x,n.z)-e)*2)/2;if(ee()>.5)return nM(t,a,ua);const s=u=>new j(u,Ks).add(pn(u)),c=ro()>.5,i=c?"hg":"";if(t.kind==="ridge")return s(cc(`${i}d${a}`,()=>L2(26,1,a,c?Us:void 0)));if(t.kind==="bridge")return s(cc(`${i}g${a}`,()=>_2(a,c?Mv:void 0)));const r=t.id%3,h=s(cc(`${i}h${r}:${a}`,()=>Hm(r,1-a,c)));return h.position.y=a,h.updateMatrix(),new yt().add(h,Ar(8,9,a+.12))}function uM(){const t=Vd[0],n=Wd(46,!0),e=Hm(0,1,ro()>.5);return[new j(t.rock,Po).add(pn(t.rock)),new j(t.trees,Od),new j(n,ua).add(pn(n)),new j(e,Ks).add(pn(e)),Ar(8,9,0)]}function mM(){const t=new yt,n=G.hazardBeacons?aM():null;n&&t.add(n.group);const e=new Map,o={x:0,y:0,z:0},a=s=>{const c=bn(s.z);let i;if(ne(s.z))i=hM(s,o);else if(ee()>.5&&(s.kind==="pillar"||s.kind==="spike"))i=eM(s);else if(s.kind==="pillar"||s.kind==="spike"){const u=Te()==="fansipan",l=s.kind==="pillar"?u?cM():Vd:u?lM():sM,f=l[s.id%l.length];i=new yt().add(new j(f.rock,Po).add(pn(f.rock))),u||i.add(new j(f.trees,Od))}else if(s.kind==="ridge"){const u=Y(s.z),l=s.open?64:2*c+18,f=new Map,m=p=>{let k=f.get(p);return k===void 0&&f.set(p,k=lt(D(s.z,p,0,o).x,o.z)-u),k},d=l/2-20,g=p=>Math.min(1,Math.abs(p)/d),v=s.open?yh(l,p=>1+Math.max(0,Math.abs(p)-d)*2.2,p=>Math.abs(p)<d?-16-70*g(p)**6:m(p)-12):yh(l,p=>Math.abs(p)<10?1:Math.max(1,m(p)+3),p=>m(p)-12);i=new j(v,Po).add(pn(v)),i.userData.own=!0}else if(s.kind==="overhang"){const u=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,l=Dx(u,Math.max(8,c+18-Math.abs(Tt(s.lane))),70,s.id%97);i=new j(l,Po).add(pn(l)),i.userData.own=!0}else if(Vs(s.z))i=a5();else{const u=Wd(s.open?46:2*c+18,s.open);i=new j(u,ua).add(pn(u))}const r=s.kind==="ridge"||s.kind==="bridge";D(s.z,r?0:Tt(s.lane),0,o),i.position.set(o.x,o.y,o.z);const h=r||ne(s.z)||s.kind==="overhang";return i.rotation.y=At(s.z)+(h?0:s.id*2.39),h||i.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),i.matrixAutoUpdate=!1,i.updateMatrix(),i.traverse(u=>{u.matrixAutoUpdate=!1,u.updateMatrixWorld(),u.userData.hazardHull&&(i.userData.hull=u)}),t.add(i),i};return{group:t,update(s,c,i){Ud.value=c,n?.update(s,c);const r=Math.min(1,Math.max(0,(i-.4)/.5));Dd.value=1-.75*r,Po.uniforms.uLift.value=1-.45*r;const h=new Set;for(const u of s.obstacles){h.add(u.id);let l=e.get(u.id);l||e.set(u.id,l=a(u)),bv(l.userData.hull,u.z-s.z)}for(const[u,l]of e)h.has(u)||(t.remove(l),l.userData.own&&l.geometry.dispose(),e.delete(u))}}}function dM(t){const n=new so({map:t,roughness:.8,side:St}),e={uTime:{value:0},uFlutter:{value:1}};return n.onBeforeCompile=o=>{Object.assign(o.uniforms,e),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},n.userData.setTime=(o,a)=>{e.uTime.value=o,e.uFlutter.value=a},n}const Ga=new so({color:"#a8141c",roughness:.55}),fM=new so({color:"#f6f4ef",roughness:.18,metalness:.05}),gM=new so({color:"#15161c",roughness:.08,metalness:.6}),rc=new so({color:"#1c1d22",roughness:.75});function Oa(t,n,e,o){const a=Math.hypot(n[0]-t[0],n[1]-t[1],n[2]-t[2]),s=new j(new zf(e,a,4,10),o);return s.position.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),s.lookAt(s.position.x+n[0]-t[0],s.position.y+n[1]-t[1],s.position.z+n[2]-t[2]),s.rotateX(Math.PI/2),s}function pM(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.fillStyle="#efe2c8",n.fillRect(0,0,256,256);for(let o=-8;o<16;o++)for(const[a,s]of[[1,1],[1,-1]])n.strokeStyle="rgba(120,80,50,0.28)",n.lineWidth=2,n.beginPath(),n.moveTo(o*32,s>0?0:256),n.lineTo(o*32+256*a,s>0?256:0),n.stroke();n.fillStyle="#2bb5ad",n.fillRect(0,18,256,14),n.fillStyle="#a8141c",n.fillRect(0,0,256,10),n.fillRect(0,226,256,30);const e=new oa(t);return e.colorSpace=ru,e.anisotropy=4,e}function Sh(t,n,e,o,a,s){const r=[],h=[],u=[];for(let f=0;f<=6;f++){const m=f/6;for(let d=0;d<=10;d++){const g=d/10,v=[0,1,2].map(p=>(1-m)*((1-g)*t[p]+g*n[p])+m*((1-g)*o[p]+g*e[p]));v[2]=v[2]+.12*m*Math.sin(Math.PI*g),v[1]=v[1]+a*Math.sin(Math.PI*g)*Math.sin(Math.PI*m)+.025*Math.abs(Math.sin(Math.PI*g*4)),r.push(...v),h.push(g*2,m)}}for(let f=0;f<6;f++)for(let m=0;m<10;m++){const d=f*11+m;s?u.push(d,d+1,d+10+1,d+1,d+10+2,d+10+1):u.push(d,d+10+1,d+1,d+1,d+10+1,d+10+2)}const l=new ht;return l.setAttribute("position",new $(new Float32Array(r),3)),l.setAttribute("uv",new $(new Float32Array(h),2)),l.setIndex(u),l.computeVertexNormals(),l}function vM(){const t=new yt,n=new yt;t.add(n);const e=pM(),o=dM(e);n.add(Oa([0,0,-.32],[0,.02,.5],.18,Ga));const a=new j(new Ve(.15,20,14),fM);a.position.set(0,.07,.78);const s=new j(new Ve(.152,20,10,-1.1,2.2,1.35,.6),gM);s.position.copy(a.position),s.rotation.x=-.3,n.add(a,s);const c=new j(new F(.26,.1,.4,2,1,2),rc);c.position.set(0,.19,.1),n.add(c);const i=[],r=[];for(const d of[1,-1]){const g=new yt,v=[.17*d,.05,.44],p=[1.02*d,.07,.3];g.add(Oa(v,p,.06,Ga));const k=new j(new Ve(.06,8,6),rc);k.position.set(p[0]+.05*d,p[1],p[2]+.02),g.add(k),r.push(k),g.add(new j(Sh(v,p,[.62*d,.02,-.2],[.2*d,0,-.42],.07,d<0),o)),i.push(g),n.add(g)}const h=[.14,0,-.34],u=[-.14,0,-.34],l=[.33,-.03,-1.18],f=[-.33,-.03,-1.18];n.add(Oa(h,l,.075,Ga),Oa(u,f,.075,Ga)),n.add(new j(Sh([.13,0,-.36],[-.13,0,-.36],f,l,.05,!1),o));const m=[];for(const d of[l,f]){const g=new j(new F(.12,.17,.13),rc);g.position.set(d[0],d[1]-.04,d[2]-.06),n.add(g),m.push(g)}return{root:t,body:n,feet:m,tips:r,ankles:m,animate(d,g,v){for(const p of i)p.scale.x=g;o.userData.setTime?.(d,v)}}}const yM={roll:.62,flip:.9,split:3,spiral:1.5},Th=G.edge-10,Lo=t=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,t)));function bM(){const t={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let n=null,e=0,o=1,a=0,s=!1,c=Number.NaN,i=0;const r=(h,u)=>{n=h,e=0,o=u,s=!0};return{trick(h,u){return n!==null?!1:(r(h,u),!0)},update(h,u){if(t.roll=t.pitch=t.dx=t.dv=t.cam=0,t.spread=null,h.mode!=="run")return n=null,c=Number.NaN,t;const l=Z(h.z);if(G.splitS!==!1&&c<Th&&l>=Th&&l-c<200?r("split",wn(h.z)%2===0?1:-1):n===null&&h.thermalT>0&&i<=0&&r("spiral",h.x>=0?-1:1),c=l,i=h.thermalT,n===null)return t;s&&(s=!1,a=h.obstacles.some(g=>g.z>h.z-2&&g.z<h.z+h.speed)?1:3),e+=u;const f=e/yM[n];if(f>=1)return n=null,t;const m=Nu(h.z);if(n==="roll")t.roll=o*2*Math.PI*Lo(f),t.spread=1.06;else if(n==="flip"){const d=2*Math.PI*Lo(f);t.pitch=-d,t.dv=a*.5*(1-Math.cos(d)),t.spread=.82}else if(n==="split")t.roll=o*Math.PI*(Lo(f/.15)+Lo((f-.7)/.22)),t.spread=1.04;else{const d=4*Math.PI*Lo(f),g=Math.sin(Math.PI*f);t.roll=o*d,t.dx=o*g*Math.sin(d),t.dv=g*(1-Math.cos(d))}return(n==="roll"||n==="split")&&(t.cam=o*Math.sin(Math.abs(t.roll)/2)*(.12+.3*m)),t}}}const Ah=G.pilotRollMax??1.1,Yd=t=>2.5*(1-Math.exp(-t*6)),wM=t=>4.5*Math.min(t,1.4)**2,Da={x:0,y:0,z:0};function jd(t){return D(t.z-Yd(t.crashT),t.x,t.v,Da),Math.max(0,Math.min(wM(t.crashT),Da.y-lt(Da.x,Da.z)-.6))}function xM(){let t=0,n=0,e=0,o=0,a=0,s=0,c=0,i=1;const r=bM();let h=0;return{lateralSpeed:()=>e,trick:(u,l)=>r.trick(u,l),camRoll:()=>h,apply(u,l,f,m){const{root:d,body:g}=u;if(m>0){const M=1-Math.exp(-m*14);e+=((l.x-t)/m-e)*M,o+=((l.v-n)/m-o)*M}t=l.x,n=l.v;const v=r.update(l,m);if(h=v.cam,D(l.z,l.x+v.dx,l.v+v.dv,d.position),d.rotation.order="YXZ",d.rotation.set(-Math.atan(vn(l.z)),At(l.z),0),g.rotation.order="ZXY",l.mode==="crash"||l.mode==="over"){D(l.z-Yd(l.crashT),l.x,l.v-jd(l),d.position),g.rotation.set(Math.sin(f*9)*1.6,f*4,f*13),u.animate(f,.7,2.5,0,m);return}const p=1-Math.exp(-m*10);a+=(Math.max(-Ah,Math.min(Ah,e*.027+Au(l.z,l.speed)))-a)*p;const k=-(Math.atan(vn(l.z+18))-Math.atan(vn(l.z)))*.9;s+=(Math.max(-.45,Math.min(.5,-o*.045+k))-s)*p,c+=(Math.max(-.2,Math.min(.2,e*.006))-c)*p;const b=v.spread??(l.vert==="dive"?.8:l.vert==="flare"?1.06:1);i+=(b-i)*p;const w=Math.sin(f*23)*.012+Math.sin(f*7.3)*.018,y=(l.stunT/P.stunTime)**2;g.rotation.set(s+v.pitch+w+.3*y*Math.sin(f*9.3+1),c+.28*y*Math.sin(f*6.1),a+v.roll+w*.6+.6*y*Math.sin(f*13));const x=(l.vert==="dive"?1.8:l.thermalT>0?1.4:1)+1.6*y;u.animate(f,i-.22*y,x,Math.max(-1,Math.min(1,e/35+Math.sin(f*11)*y)),m)}}}const MM=2.15,kM=[Math.PI/2,0,0],SM=[new _(1,0,0),new _(0,1,0),new _(0,0,1)];class je{static q=new xt;bone;rest;axes;cur=[0,0,0];constructor(n){this.bone=n,this.rest=n.quaternion.clone();const e=n.getWorldQuaternion(new xt).invert();this.axes=SM.map(o=>o.clone().applyQuaternion(e))}static t=[0,0,0];set(n,e,o,a){const s=je.t;s[0]=n,s[1]=e,s[2]=o,this.bone.quaternion.copy(this.rest);for(let c=0;c<3;c++)this.cur[c]+=(s[c]-this.cur[c])*a,this.cur[c]&&this.bone.quaternion.multiply(je.q.setFromAxisAngle(this.axes[c],this.cur[c]))}}function TM(t){const n=f=>f.getWorldPosition(new _),e=f=>f.children.filter(m=>m.isBone),o=f=>{const m=[f];for(let d=e(f);d.length===1;d=e(d[0]))m.push(d[0]);return m},a=[];t.traverse(f=>{f.isBone&&a.push(f)});const s=a[0];if(!s)return null;const c=e(s).sort((f,m)=>n(m).z-n(f).z);if(c.length<3)return null;const i=o(c[0]),r=i[i.length-1],h=e(r).sort((f,m)=>Math.abs(n(f).x)-Math.abs(n(m).x));if(h.length<3)return null;const u=(f,m)=>({side:Math.sign(n(f).x),j:m(o(f)).map(d=>new je(d))}),l=c.slice(-2);return{spine:i.map(f=>new je(f)),neck:o(h[0]).slice(0,2).map(f=>new je(f)),arms:h.slice(-2).map(f=>u(f,m=>m.length>=4?m.slice(1,4):m.slice(0,3))),legs:l.map(f=>u(f,m=>m.slice(0,3))),toes:l.map(f=>o(f).at(-1)),ankles:l.map(f=>o(f)[2]??o(f).at(-1)),hands:h.slice(-2).map(f=>o(f).at(-1))}}const Xd={value:0};function AM(t){const n=new so({map:t.map,roughness:.78,metalness:0,side:St});return n.onBeforeCompile=e=>{e.uniforms.uHurt=Xd,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},n}function NM(t){const n=new qt({color:new it(.06,.02,.05),side:sr});return n.onBeforeCompile=e=>{e.uniforms.uPush={value:.011/t},e.vertexShader=`uniform float uPush;
${e.vertexShader}`.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * uPush;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function zM(t,n=!0,e){return new Cf().setMeshoptDecoder(Ef).loadAsync("models/pilot.glb").then(async o=>{const a=o.scene,s=[];a.traverse(r=>{const h=r;h.isSkinnedMesh&&(h.material=AM(h.material),h.frustumCulled=!1,s.push(h))});for(const r of n?s:[]){const h=new Lf(r.geometry,NM(r.scale.x));h.bind(r.skeleton,r.bindMatrix),h.frustumCulled=!1,h.position.copy(r.position),h.quaternion.copy(r.quaternion),h.scale.copy(r.scale),r.parent?.add(h)}const c=new yt;c.rotation.set(...kM),c.scale.setScalar(MM),c.position.set(0,0,.12),c.add(a),c.updateMatrixWorld(!0),await e?.(c).catch(()=>{});const i=TM(a);for(const r of t.body.children)r.visible=!1;if(t.body.add(c),!i){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}t.feet=i.toes,t.ankles=i.ankles,t.tips=i.hands,t.animate=(r,h,u,l,f)=>{const m=1-Math.exp(-f*12),d=Math.min(1,Math.max(0,(1-h)/.2)),g=Math.min(1,Math.max(0,(h-1)/.06)),v=7*u;for(const{side:p,j:k}of i.arms){const b=.07+.16*g-.08*d;k.forEach((w,y)=>{const x=Math.sin(r*v-y*.8+(p>0?.4:0))*(.025+.02*y),M=y===0?.5*d-.12*g:y===1?.18*d:.08*d;w.set(0,p*M,p*((y===0?b:0)+x),m)})}for(const{side:p,j:k}of i.legs){const[b,w,y]=k;b?.set(-.05*g,-p*(.06+.08*g-.14*d)+.07*l,0,m),w?.set(-(.08+.3*g+Math.sin(r*v*.5+p)*.03),0,0,m),y?.set(1.15,0,0,m)}i.spine.forEach((p,k)=>p.set(Math.sin(r*1.7+k)*.015-.06*g,.07*l,0,m)),i.neck.forEach((p,k)=>p.set(k===0?-(.3+.1*d):-.22,k===0?.05*l:0,0,m))}}).catch(o=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",o))}const qn=18,Nh=.075,CM=.035;function EM(){const t=new Float32Array(2*qn*2*3),n=new Float32Array(2*qn*2*4),e=new Uint16Array(2*(qn-1)*6);for(let u=0,l=0;u<2;u++)for(let f=0;f<qn-1;f++){const m=(u*qn+f)*2;e.set([m,m+1,m+2,m+1,m+3,m+2],l),l+=6}const o=new ht;o.setAttribute("position",new $(t,3)),o.setAttribute("color",new $(n,4)),o.setIndex(new $(e,1));const a=new j(o,new qt({vertexColors:!0,transparent:!0,blending:sn,depthWrite:!1,fog:!1}));a.frustumCulled=!1,a.renderOrder=5;const s=[[],[]],c=[],i=new _,r=new _,h=new _;return{mesh:a,update(u,l,f,m,d){for(let g=0;g<2;g++){const v=s[g],p=u[g];if(f&&p){const b=(v.length>=qn?v.pop():c.pop())??{p:new _,t:0};p.getWorldPosition(b.p),b.t=l,v.unshift(b)}for(;v.length&&l-v[v.length-1].t>Nh;)c.push(v.pop());const k=v.length;for(let b=0;b<qn;b++){const w=(g*qn+b)*2;if(b>=k||k<2){w>=2&&t.copyWithin(w*3,(w-2)*3,w*3),n.fill(0,w*4,w*4+8);continue}const y=v[b],x=Math.min(1,(l-y.t)/Nh);b+1<k?i.subVectors(y.p,v[b+1].p):i.subVectors(v[b-1].p,y.p),h.subVectors(d,y.p),r.crossVectors(i,h).normalize().multiplyScalar(CM*(1-.85*x));const M=w*3;t[M]=y.p.x+r.x,t[M+1]=y.p.y+r.y,t[M+2]=y.p.z+r.z,t[M+3]=y.p.x-r.x,t[M+4]=y.p.y-r.y,t[M+5]=y.p.z-r.z;const z=(1-x)**2*Math.min(1,x*8+.35)*(.22+.3*m),C=w*4;n[C]=n[C+4]=1,n[C+1]=n[C+5]=.95,n[C+2]=n[C+6]=.86,n[C+3]=n[C+7]=z}}o.attributes.position.needsUpdate=!0,o.attributes.color.needsUpdate=!0}}}const Zd=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,LM={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new yn(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0},uVeil:{value:0},uVeilNight:{value:0}},vertexShader:Zd,fragmentShader:`
uniform sampler2D tDiffuse;
uniform vec2 uSun;
uniform float uSunVisible;
uniform float uVeil;
uniform float uVeilNight;
uniform float uShafts;
uniform float uAspect;
uniform float uSpeed;
uniform float uDanger;
varying vec2 vUv;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  vec3 col = texture2D(tDiffuse, vUv).rgb;

  // Mờ tốc độ toả từ tâm, chỉ ở rìa khung: tâm (người bay, đường phía trước) giữ nét để còn lái.
#if SPEED_BLUR
  if (uSpeed > 0.01) {
    vec2 fromC = vUv - 0.5;
    float edge = smoothstep(0.5, 1.05, length(fromC * vec2(uAspect, 1.0)));
    // 0,016 → 0,006 (01/11, hai vòng fresh-eyes): vách khe sát người bay nhoè thành vệt bùn ở rìa (n-700/n-1450).
    float amt = uSpeed * edge * 0.006;
    for (int i = 1; i <= 6; i++) col += texture2D(tDiffuse, vUv - fromC * amt * float(i) / 6.0).rgb;
    col /= 7.0;
  }
#endif

#if SHAFT_N > 0
  if (uSunVisible > 0.0) {
    const int N = SHAFT_N;
    vec2 stepUv = (uSun - vUv) / float(N) * 0.9;
    vec2 uv = vUv;
    float decay = 1.0;
    vec3 acc = vec3(0.0);
    for (int i = 0; i < N; i++) {
      uv += stepUv;
      // BẪY 1: đĩa mặt trời sáng ×12 — không kẹp thì mọi tia đều hút nó, cả khung phủ một lớp vàng trắng.
      // BẪY 2: chỉ lấy mẫu QUANH mặt trời. Lấy mọi pixel sáng thì vách núi được nắng cũng bị kéo vệt,
      // nhìn như nhoè chuyển động chứ không phải tia nắng.
      vec3 s = min(texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb, vec3(3.0));
      float nearSun = 1.0 - smoothstep(0.06, 0.28, length((uv - uSun) * vec2(uAspect, 1.0)));
      acc += s * smoothstep(0.8, 2.0, luma(s)) * nearSun * decay;
      decay *= pow(0.965, 40.0 / float(N));
    }
    vec2 d = (vUv - uSun) * vec2(uAspect, 1.0);
    float falloff = 1.0 - smoothstep(0.0, 0.75, length(d));
    col += acc / float(N) * uShafts * uSunVisible * falloff * vec3(1.0, 0.8, 0.55);
  }
#endif

  // Bóng tối ngả tím, vùng sáng ngả vàng (split-tone hoàng hôn); tăng bão hoà nhẹ.
  float l = luma(col);
  col = mix(col, col * vec3(0.92, 0.86, 1.12), 1.0 - smoothstep(0.0, 0.35, l));
  col = mix(col, col * vec3(1.06, 1.0, 0.9), smoothstep(0.5, 2.0, l));
  col = mix(vec3(l), col, 1.12);

  vec2 v = (vUv - 0.5) * vec2(uAspect, 1.0);
  col *= 1.0 - 0.28 * smoothstep(0.45, 1.15, length(v));
  // Nguy hiểm: mép màn chìm vào đỏ thẫm (thay màu, không cộng — cộng đỏ lên trời sáng ra hồng đào) + cả khung bớt bão hoà.
  // Viền theo HÌNH CHỮ NHẬT bo góc của khung (0 trong lõi 64%, 1 ở mép) — đo bằng length(v) có nhân tỉ lệ khung thì màn
  // dọc (x chỉ ±0,23) gần như không có viền, màn ngang lại phủ nửa khung (ảnh r10 m-strip-crash / d-strip-crash).
  vec2 q = abs(vUv - 0.5) * 2.0;
  float rim = uDanger * smoothstep(0.0, 1.0, length(max(q - 0.64, 0.0)) / 0.36);
  col = mix(col, mix(vec3(luma(col)), col, 1.0 - 0.35 * uDanger), uDanger);
  col = mix(col, vec3(0.42, 0.012, 0.02) * (0.6 + 0.6 * luma(col)), clamp(rim * 1.1, 0.0, 0.7));
  // XUYÊN MÂY (Fansipan, render/cloud-decks.ts): camera trong bề dày một tầng mây → khung trắng xoá rồi bung ra cảnh mới —
  // khoảnh khắc "bất ngờ" của map. Một phép trộn trong pass grade (tầng nào cũng có), KHÔNG thêm lớp trong suốt full màn.
  // Mép khung đậm hơn giữa: còn thấy người bay ở giữa làn mây. Đêm: mây xám chàm, không trắng loá.
  vec3 veilCol = mix(vec3(0.93, 0.95, 1.0), vec3(0.2, 0.24, 0.38), uVeilNight);
  col = mix(col, veilCol, uVeil * (0.82 + 0.16 * smoothstep(0.2, 1.0, length(q))));
  gl_FragColor = vec4(max(col, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`},_M={uniforms:{tDiffuse:{value:null},uTexel:{value:new yn(1/1280,1/720)}},vertexShader:Zd,fragmentShader:`
uniform sampler2D tDiffuse;
uniform vec2 uTexel;
varying vec2 vUv;
const int R = 3;

void main() {
  vec3 mean[4];
  vec3 sq[4];
  for (int k = 0; k < 4; k++) { mean[k] = vec3(0.0); sq[k] = vec3(0.0); }
  for (int j = 0; j <= R; j++) {
    for (int i = 0; i <= R; i++) {
      vec3 a = texture2D(tDiffuse, vUv + vec2(-i, -j) * uTexel).rgb;
      vec3 b = texture2D(tDiffuse, vUv + vec2( i, -j) * uTexel).rgb;
      vec3 c = texture2D(tDiffuse, vUv + vec2(-i,  j) * uTexel).rgb;
      vec3 d = texture2D(tDiffuse, vUv + vec2( i,  j) * uTexel).rgb;
      mean[0] += a; sq[0] += a * a;
      mean[1] += b; sq[1] += b * b;
      mean[2] += c; sq[2] += c * c;
      mean[3] += d; sq[3] += d * d;
    }
  }
  float n = float((R + 1) * (R + 1));
  float best = 1e9;
  vec3 col = vec3(0.0);
  for (int k = 0; k < 4; k++) {
    vec3 m = mean[k] / n;
    vec3 v = abs(sq[k] / n - m * m);
    float s = v.r + v.g + v.b;
    if (s < best) { best = s; col = m; }
  }
  gl_FragColor = vec4(col, 1.0);
}`},zh=.35;function RM(t,n,e,o,a){t.toneMapping=Jr,t.toneMappingExposure=1;const s=new _f(t);s.addPass(new t0(n,e));const c=new Rf(new yn(256,256),zh,.5,1.4);s.addPass(c);const i=new n0(LM);s.addPass(i);const r=new If;s.addPass(r);let h=!1;const u=(v,p)=>{h=p,c.enabled=v.bloom&&!p,r.enabled=c.enabled,i.material.defines.SHAFT_N=p?Math.min(v.shafts,8):v.shafts,i.material.defines.SPEED_BLUR=v.speedBlur&&!p?1:0,i.material.needsUpdate=!0};u(a,!1);const l=new n0(_M);l.enabled=!1,s.addPass(l);const f=new _(o.x,o.y,o.z);let m=1;const d=new _,g=new _;return{render(){e.getWorldDirection(g),d.copy(f).multiplyScalar(1e4).add(e.position).project(e);const v=g.dot(f);i.uniforms.uSun.value.set(d.x*.5+.5,d.y*.5+.5);const p=Math.max(0,Math.min(1,(v-.2)/.4)),k=1-(1-(G.sunGlare??1))*p;i.uniforms.uSunVisible.value=m*p*k,c.strength=zh*k,s.render()},setSize(v,p){s.setSize(v,p),c.resolution.set(v/2,p/2),i.uniforms.uAspect.value=v/p;const k=t.getPixelRatio();l.uniforms.uTexel.value.set(1/(v*k),1/(p*k))},setPixelRatio(v){s.setPixelRatio(v)},setLite(){return h||!a.bloom&&a.shafts<=8&&!a.speedBlur?!1:(u(a,!0),!0)},togglePainterly(){return l.enabled=!l.enabled,l.enabled},painterly:()=>l.enabled,warmPlan(){r.enabled&&(r.material.defines={...Pf.getTransfer(t.outputColorSpace)===Bf?{SRGB_TRANSFER:""}:{},...t.toneMapping===Jr?{ACES_FILMIC_TONE_MAPPING:""}:{}},r.material.needsUpdate=!0);const v=[];return s.passes.forEach((p,k)=>{if(!p.enabled||p instanceof t0)return;const b=s.renderToScreen&&s.isLastEnabledPass(k);for(const w of Object.values(p))for(const y of Array.isArray(w)?w:[w])y?.isMaterial&&v.push({material:y,toScreen:b})}),{sceneTarget:s.readBuffer,quads:v}},setSpeed(v,p=0){const k=G.speedBlur??1;i.uniforms.uSpeed.value=v*(k+(1-k)*p)},setDanger(v){i.uniforms.uDanger.value=v},setVeil(v,p){i.uniforms.uVeil.value=v,i.uniforms.uVeilNight.value=p},setSun(v,p){f.set(v.x,v.y,v.z),m=p}}}function IM(t,n){const e=new Hf({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,n)),e.setSize(t.clientWidth,t.clientHeight),e.info.autoReset=!1,t.appendChild(e.domElement);const o=new Ff,a=new $f(60,t.clientWidth/t.clientHeight,.5,7e4),s=new Gf(16777215,2.4),c=new Of(16777215,16777215,1.3);return o.add(s,s.target,c),{renderer:e,scene:o,camera:a,sun:s,hemi:c}}const PM=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function BM(t){return`
uniform float uDusk;
uniform float uMorn;
${pd(t,"uDusk","uMorn")}
${ce}
uniform float uTime;
varying vec3 vDir;

void main() {
  vec3 dir = normalize(vDir);
  float sd = dot(dir, ATM_SUN_DIR);
  vec3 col = atmSkyColor(dir);
  col += ATM_GLOW * pow(max(sd, 0.0), 60.0) * 2.5;
  col += ATM_SUN_DISK * smoothstep(0.99955, 0.99975, sd) * 12.0;

  // Mây: chiếu hướng nhìn lên một mặt phẳng trên cao. Mép phía mặt trời sáng cam, thân mây tím hồng.
  if (dir.y > 0.0) {
    vec2 uv = dir.xz / (dir.y + 0.08) * 1.6 + vec2(uTime * 0.004, 0.0);
    float n = gnFbm(uv * 0.9) * 0.7 + gnFbm(uv * 3.1) * 0.3;
    float cover = smoothstep(0.52, 0.72, n) * smoothstep(0.02, 0.12, dir.y) * (1.0 - smoothstep(0.55, 0.9, dir.y));
    float lit = pow(max(sd, 0.0), 2.0);
    vec3 cloud = mix(vec3(0.62, 0.42, 0.52), vec3(1.45, 0.78, 0.42), 0.35 + 0.65 * lit);
    cloud = mix(cloud, ATM_GLOW * 3.0, smoothstep(0.6, 0.98, n) * pow(max(sd, 0.0), 6.0));
    // Buổi sáng: mây trắng ngà, bóng mây lam — màu tím hồng cứng ở trên là mây CHIỀU, giữ thì sáng nào cũng như hoàng hôn.
    cloud = mix(cloud, mix(vec3(0.74, 0.8, 0.92), vec3(1.2, 1.12, 1.0), 0.4 + 0.6 * lit), uMorn);
    // Chạng vạng: mây cháy đỏ rực ở mép; đêm: mây thành bóng chàm che sao.
    cloud = mix(cloud, cloud * vec3(1.25, 0.62, 0.55), smoothstep(0.2, 0.55, uDusk));
    cloud = mix(cloud, vec3(0.035, 0.04, 0.09), smoothstep(0.55, 0.95, uDusk));
    col = mix(col, cloud, cover * 0.85);
  }
  // Sao: chỉ hiện khi trời tối, nhấp nháy nhẹ. Băm theo hướng nhìn nên đứng yên khi camera di chuyển.
  if (dir.y > 0.02 && uDusk > 0.55) {
    vec3 cell = floor(dir * 420.0);
    float h = fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    float star = step(0.9975, h) * (0.6 + 0.4 * sin(uTime * 3.0 + h * 90.0));
    col += vec3(0.9, 0.92, 1.0) * star * 1.6 * smoothstep(0.55, 0.9, uDusk) * smoothstep(0.02, 0.2, dir.y);
  }
  gl_FragColor = vec4(col, 1.0);
}`}function HM(t){const n=new Mt({vertexShader:PM,fragmentShader:BM(t),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:sr,depthWrite:!1,depthTest:!1,fog:!1}),e=new j(new Ve(1e3,48,24),n);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(o,a,s,c){e.position.copy(o.position),n.uniforms.uTime.value=a,n.uniforms.uDusk.value=s,n.uniforms.uMorn.value=c}}}function FM(){return new Mt({vertexShader:`
varying vec3 vN;
varying vec3 vV;
varying vec3 vCol;
void main() {
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vN = normalize(mat3(modelMatrix * instanceMatrix) * normal);
  vV = normalize(cameraPosition - wp.xyz);
  vCol = instanceColor;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,fragmentShader:`
varying vec3 vN;
varying vec3 vV;
varying vec3 vCol;
void main() {
  // Mép sáng, lòng gần trong: vỏ bong bóng, không phải quả cầu đặc che người bay.
  // Lòng 0,02 (bản 0,06 cộng trên nền mây trắng thành màng sữa phủ người bay), mép gắt hơn (^4). Mép 1,1 (bản 1,6: viền
  // vỏ vượt ngưỡng bloom thành quầng trắng — "nhặt đèn hơi chói", anh Đức 04/11).
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 4.0);
  gl_FragColor = vec4(vCol * (0.02 + 1.1 * f), 1.0);
}`,transparent:!0,blending:sn,depthWrite:!1})}function $M(){return new Mt({vertexShader:`
varying vec2 vP;
varying vec3 vCol;
void main() {
  vP = position.xy;
  vec4 c = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float sc = length(instanceMatrix[0].xyz);
  vec2 cs = instanceMatrix[0].xy / max(sc, 1e-4);
  c.xy += vec2(cs.x * position.x - cs.y * position.y, cs.y * position.x + cs.x * position.y) * sc;
  vCol = instanceColor;
  gl_Position = projectionMatrix * c;
}`,fragmentShader:`
varying vec2 vP;
varying vec3 vCol;
void main() {
  vec2 p = vP;
  float r2 = dot(p, p);
  // Lõi 1,3 (bản 2,2 cháy trắng một đốm to ngay giữa người bay — bloom nhân lên, 04/11 "hơi chói").
  float core = exp(-r2 * 16.0) * 1.3 + exp(-r2 * 3.5) * 0.2;
  float rays = exp(-abs(p.y) * 38.0) * (1.0 - smoothstep(0.1, 1.0, abs(p.x)))
             + exp(-abs(p.x) * 38.0) * (1.0 - smoothstep(0.1, 1.0, abs(p.y)));
  vec2 d = vec2(p.x + p.y, p.x - p.y) * 0.7071;
  float diag = exp(-abs(d.y) * 50.0) * (1.0 - smoothstep(0.0, 0.55, abs(d.x)))
             + exp(-abs(d.x) * 50.0) * (1.0 - smoothstep(0.0, 0.55, abs(d.y)));
  gl_FragColor = vec4(vCol * (core + rays * 0.95 + diag * 0.55), 1.0);
}`,transparent:!0,blending:sn,depthWrite:!1})}const Xc=12,Ch=new it(.62,.44,.17),GM=new it(.72,.6,.34);function lc(t,n){const e=new vt(t,n,Xc);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new it(0,0,0)),e}function OM(){const t=lc(new uu(.82,1,40),new qt({transparent:!0,blending:sn,depthWrite:!1,fog:!1,side:St})),n=lc(new En(2,2),$M()),e=lc(new Rn(1,4),FM()),o={ring:t,flare:n,shell:e},a=[],s=new Lt,c=new xt,i=new _,r=new _,h=new it,u=new _(0,0,1),l=f=>{a.length>=Xc*3&&a.shift(),a.push(f)};return{mesh:t,star:n,shell:e,spawn(f,m,d){l({part:"ring",x:f,y:m,z:d,t:0,dur:.32,r0:.6,r1:2.8,color:Ch}),l({part:"shell",x:f,y:m,z:d,t:0,dur:.32,r0:1.5,r1:3.4,color:Ch}),l({part:"flare",x:f,y:m,z:d,t:0,dur:.36,r0:.5,r1:2.2,color:GM})},update(f,m){const d={ring:0,flare:0,shell:0};for(let g=a.length-1;g>=0;g--){const v=a[g];if(v.t+=f,v.t>=v.dur||d[v.part]>=Xc){a.splice(g,1);continue}v.x+=m.x*f,v.y+=m.y*f,v.z+=m.z*f;const p=v.t/v.dur,k=v.r0+(v.r1-v.r0)*(1-(1-p)*(1-p)),b=(1-p)*(1-p)*1.1,w=v.part==="flare"?c.setFromAxisAngle(u,p*2.2):c.identity();s.compose(i.set(v.x,v.y,v.z),w,r.set(k,k,k));const y=o[v.part];y.setMatrixAt(d[v.part],s),y.setColorAt(d[v.part]++,h.copy(v.color).multiplyScalar(b))}for(const g of["ring","flare","shell"]){const v=o[g];v.count=d[g],v.instanceMatrix.needsUpdate=!0,v.instanceColor&&(v.instanceColor.needsUpdate=!0)}}}}const Eh=4,Lh=36,DM={rock:[new it(.42,.33,.36),new it(.3,.24,.28),new it(.24,.3,.16)],cloth:[new it(.8,.1,.08),new it(.95,.66,.1),new it(.5,.33,.2)],village:[new it(.62,.22,.12),new it(.55,.3,.2),new it(.85,.7,.35)]},UM=()=>new Mt({vertexShader:`
varying vec2 vP;
varying vec3 vCol;
varying float vNear;
void main() {
  vP = position.xy;
  vCol = instanceColor;
  vec4 c = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  // Sát ống kính (< 4 m) thì tan: depthTest tắt nên sao lọt near plane là loé trùm cả khung (review vòng 10, H1).
  vNear = smoothstep(1.5, 4.0, -c.z);
  c.xy += position.xy * length(instanceMatrix[0].xyz);
  gl_Position = projectionMatrix * c;
}`,fragmentShader:`
varying vec2 vP;
varying vec3 vCol;
varying float vNear;
void main() {
  float r = length(vP);
  float a = atan(vP.y, vP.x + 1e-6);
  // 9 gai không đều (hai tần số + hạt giống): sao va kiểu truyện tranh, không phải đĩa tròn.
  float spikes = pow(abs(sin(a * 4.5 + vCol.g * 6.0)), 5.0) * 0.55 + pow(abs(sin(a * 7.0 - vCol.g * 9.0)), 9.0) * 0.3;
  float edge = 0.38 + spikes;
  if (r > edge) discard;
  float k = r / edge;
  // Viền đỏ thẫm gần đen → đỏ tươi → lõi vàng trắng (lõi vượt ngưỡng bloom, nở xong thì lõi tắt trước).
  vec3 col = mix(vec3(1.0, 0.08, 0.04), vec3(0.32, 0.0, 0.02), smoothstep(0.55, 0.95, k));
  col = mix(vec3(3.2, 2.4, 1.2), col, smoothstep(0.12, 0.34 + 0.2 * (1.0 - vCol.b), k));
  gl_FragColor = vec4(col, vCol.r * vNear * (1.0 - 0.35 * smoothstep(0.85, 1.0, k)));
}`,transparent:!0,depthTest:!1,depthWrite:!1});function KM(){const t=new vt(new En(2,2),UM(),Eh),n=new vt(new Rn(1,0),new ie,Lh);for(const u of[t,n])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new it);t.renderOrder=8;const e=[],o=[];let a=0;const s=new Lt,c=new xt,i=new _,r=new _,h=new it;return{stars:t,chips:n,danger:()=>a,spawn(u,l,f,m,d){e.length>=Eh&&e.shift(),e.push({x:u,y:l,z:f,t:0,dur:d?.42:.3,r0:d?1.4:.9,r1:d?5.2:3.2,seed:Math.random(),follow:!d});const g=d?22:10;for(let v=0;v<g;v++){o.length>=Lh&&o.shift();const p=Math.random()*Math.PI*2,k=(d?7:5)+Math.random()*7,b=DM[m];o.push({x:u,y:l,z:f,t:0,life:.9+Math.random()*.6,size:(d?.22:.16)+Math.random()*(d?.38:.22),vx:Math.cos(p)*k,vy:Math.sin(p)*k*.8+4,vz:-(3+Math.random()*8),spin:new _(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:b[v%b.length]})}a=Math.max(a,d?1:.75)},update(u,l){a=Math.max(0,a-u*1.4);let f=0;for(let m=e.length-1;m>=0;m--){const d=e[m];d.t+=u;const g=d.t/d.dur;if(g>=1){e.splice(m,1);continue}d.follow&&(d.x+=l.x*u,d.y+=l.y*u,d.z+=l.z*u);const v=d.r0+(d.r1-d.r0)*(1-(1-g)**3);s.compose(i.set(d.x,d.y,d.z),c.identity(),r.set(v,v,v)),t.setMatrixAt(f,s),t.setColorAt(f++,h.setRGB(Math.min(1,(1-g)*1.6),d.seed,g))}t.count=f,f=0;for(let m=o.length-1;m>=0;m--){const d=o[m];if(d.t+=u,d.t>=d.life){o.splice(m,1);continue}d.vy-=16*u,d.x+=d.vx*u,d.y+=d.vy*u,d.z+=d.vz*u;const g=d.size*Math.min(1,(d.life-d.t)/.25);c.setFromAxisAngle(d.spin,d.t*9),s.compose(i.set(d.x,d.y,d.z),c,r.set(g,g*.7,g*1.2)),n.setMatrixAt(f,s),n.setColorAt(f++,d.color)}n.count=f;for(const m of[t,n])m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0)}}}const hn=90,VM=1.4,qM=`
#include <fog_pars_vertex>
attribute float aAge;
attribute float aSide;
varying float vAge;
varying float vSide;
varying float vNear;
void main() {
  vAge = aAge;
  vSide = aSide;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vNear = smoothstep(3.0, 14.0, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,WM=`
#include <fog_pars_fragment>
uniform vec3 uColor;
varying float vAge;
varying float vSide;
varying float vNear;
void main() {
  // Mép băng mềm (không thành dải phẳng cắt sắc), lõi đậm hơn.
  float core = 1.0 - vSide * vSide;
  float a = core * smoothstep(1.0, 0.55, vAge) * smoothstep(0.0, 0.04, vAge) * 0.45 * vNear;
  vec3 lit = uColor * (ATM_SUN_LIGHT * 0.9 + ATM_SKY_AMBIENT * 0.5);
  gl_FragColor = vec4(lit, a);
  #include <fog_fragment>
}`;function YM(){const t=[0,1].map(()=>({p:Array.from({length:hn},()=>new _),age:new Float32Array(hn).fill(1)})),n=2*hn*2,e=new Float32Array(n*3),o=new Float32Array(n).fill(1),a=new Float32Array(n),s=[];for(let f=0;f<2;f++)for(let m=0;m<hn;m++){const d=(f*hn+m)*2;a[d]=-1,a[d+1]=1,m<hn-1&&s.push(d,d+1,d+2,d+1,d+3,d+2)}const c=new ht;c.setAttribute("position",new $(e,3)),c.setAttribute("aAge",new $(o,1)),c.setAttribute("aSide",new $(a,1)),c.setIndex(s);const i=new Mt({vertexShader:qM,fragmentShader:WM,uniforms:Ln.merge([_n.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:St,fog:!0}),r=new j(c,i);r.frustumCulled=!1,r.renderOrder=3;const h=new _,u=new _,l=new _;return{points:r,update(f,m,d,g){t.forEach((v,p)=>{for(let k=0;k<hn;k++)v.age[k]=Math.min(1,v.age[k]+m/VM);if(d&&m>0){const k=v.p.pop();v.p.unshift(k.copy(f[p])),v.age.copyWithin(1,0,hn-1),v.age[0]=0}for(let k=0;k<hn;k++){const b=v.p[k],w=v.p[Math.min(hn-1,k+1)];h.subVectors(b,w),h.lengthSq()<1e-6&&h.set(0,0,1),u.subVectors(g,b),l.crossVectors(h,u).normalize();const y=.06+.5*v.age[k],x=(p*hn+k)*2;e.set([b.x-l.x*y,b.y-l.y*y,b.z-l.z*y],x*3),e.set([b.x+l.x*y,b.y+l.y*y,b.z+l.z*y],(x+1)*3),o[x]=o[x+1]=v.age[k]}}),c.getAttribute("position").needsUpdate=!0,c.getAttribute("aAge").needsUpdate=!0}}}const ue=120,jM=40,XM=120,ZM=9,QM=30,hc=.11;function JM(){const t=new Float32Array(ue*3),n=new Float32Array(ue*6),e=new ht;e.setAttribute("position",new $(n,3));const o=new Float32Array(ue*6);for(let f=0;f<ue;f++)o.set([1,1,1,0,0,0],f*6);e.setAttribute("color",new $(o,3));const a=new ou({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:sn,depthWrite:!1,fog:!1}),s=new au(e,a);s.frustumCulled=!1,s.renderOrder=5;let c=!1;const i=new _,r=new _,h=new _,u=new _,l=(f,m,d)=>{const g=jM+Math.random()*XM*d,v=ZM+(1-Math.random()**2)*QM,p=Math.random()*Math.PI*2;u.copy(m).addScaledVector(i,g).addScaledVector(r,Math.cos(p)*v).addScaledVector(h,Math.sin(p)*v),t[f*3]=u.x,t[f*3+1]=u.y,t[f*3+2]=u.z};return{object:s,update(f,m,d){if(a.opacity=Math.min(.5,.42*d),s.visible=d>.02,e.setDrawRange(0,2*Math.round(ue*Math.min(1,d))),!s.visible)return;const g=m.length();if(g<1)return;i.copy(m).divideScalar(g),r.set(i.z,0,-i.x).normalize(),h.crossVectors(r,i);const v=f.position;if(!c){for(let p=0;p<ue;p++)l(p,v,1);c=!0}for(let p=0;p<ue;p++){u.set(t[p*3]-v.x,t[p*3+1]-v.y,t[p*3+2]-v.z),(u.dot(i)<-4||u.lengthSq()>36100)&&l(p,v,1);const b=p*6,w=t[p*3],y=t[p*3+1],x=t[p*3+2];n[b]=w,n[b+1]=y,n[b+2]=x,n[b+3]=w-m.x*hc,n[b+4]=y-m.y*hc,n[b+5]=x-m.z*hc}e.attributes.position.needsUpdate=!0}}}const Ua=256,_h=5,tk=-2e3,nk=400;function ek(t,n,e){let o=0;for(const[a,s]of[[1,41],[1.37,43]]){const c=Math.max(12,Math.round(2*Math.PI*e/((1800+700*n)*a))),i=t/(2*Math.PI)*c,r=Math.floor(i),h=.5+.3*(N(r,n,s)-.5),u=Math.max(0,1-Math.abs(i-r-h)*2.2),l=(220+140*n)*(.45+.55*N(r,n,s+1));o=Math.max(o,l*u*u*(3-2*u))}return o}const ok=`
#include <fog_pars_vertex>
attribute float aTop;
varying float vTop;
varying float vY;
void main() {
  vTop = aTop;
  vY = position.y;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,ak=`
#include <fog_pars_fragment>
uniform float uFar;
${pr}
varying float vTop;
varying float vY;
void main() {
  float below = vTop - vY;
  // Màu lớp theo giờ: lớp gần xanh rừng tối, lớp xa tan vào sương — đọc ATM_* nên trời tối thì núi tối theo.
  vec3 nearCol = mix(vec3(0.012, 0.042, 0.025), vec3(0.004, 0.006, 0.02), smoothstep(0.4, 1.0, atmT()));
  vec3 uColor = mix(nearCol, ATM_HAZE_AWAY, uFar);
  vec3 uFoot = mix(ATM_HAZE_AWAY, vec3(1.0), 0.15);
  // Hà Giang: sương dày hơn, nằm sát chân mỗi lớp (260 m thay 700) — lớp nón trước tách khỏi lớp sau bằng một dải sương,
  // đọc ra "chập trùng" (ảnh tham chiếu: núi nón tan vào biển sương). Khau Phạ: mix(…, 0) giữ đúng số cũ.
  float hg = regionIs(1.0);
  vec3 col = mix(uColor, uFoot, smoothstep(0.0, mix(700.0, 260.0, hg), below) * mix(0.7, 0.9, hg));
  // Viền mép trên: sống núi phía mặt trời sáng rực (backlight), phía kia chỉ hơi sáng.
  vec3 dir = normalize(vFogWorld - cameraPosition);
  float edge = 1.0 - smoothstep(0.0, 30.0, below);
  col += ATM_GLOW * edge * (0.15 + 1.4 * pow(max(dot(dir, ATM_SUN_DIR), 0.0), 4.0));
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;class sk{rings=[];next=0;heightAt;constructor(n,e,o){this.heightAt=e;for(let a=0;a<o.length-1;a++){const s=a/(o.length-2),c=new Mt({vertexShader:ok,fragmentShader:ak,uniforms:Ln.merge([_n.fog,{uFar:{value:.25+.6*s}}]),fog:!0});c.uniforms.uRegionHg=co;const i=new j(new ht().setAttribute("position",new $(new Float32Array(3),3)),c);i.frustumCulled=!1,n.add(i),this.rings.push({inner:o[a],outer:o[a+1],mesh:i,anchorX:NaN,anchorZ:NaN})}}job=null;update(n,e,o=!1,a=3){const s=performance.now();for(;;){if(!this.job){const i=this.stale(n,e);if(!i)return;const r=(Ua+1)*2;this.job={ring:i,idx:this.rings.indexOf(i),ax:n,az:e,pos:new Float32Array(r*3),top:new Float32Array(r),s:0}}const c=this.job;for(;c.s<=Ua;)if(this.segment(c),!o&&performance.now()-s>a)return;this.commit(c),this.job=null}}pending(n,e){return this.rings.filter(o=>o===this.job?.ring||this.needs(o,n,e)).length}needs(n,e,o){return Number.isNaN(n.anchorX)||Math.hypot(e-n.anchorX,o-n.anchorZ)>nk}stale(n,e){if(!Number.isFinite(n+e))return null;for(let o=0;o<this.rings.length;o++){const a=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,this.needs(a,n,e))return a}return null}segment(n){const{ring:e,s:o}=n,a=o/Ua*Math.PI*2,s=Math.sin(a),c=Math.cos(a);let i=-1/0;for(let h=0;h<_h;h++){const u=e.inner+(e.outer-e.inner)*h/_h;i=Math.max(i,this.heightAt(n.ax+s*u,n.az+c*u))}ro()>.5&&(i+=ek(a,n.idx,e.inner));const r=e.inner;n.pos.set([s*r,i,c*r,s*r,tk,c*r],o*6),n.top[o*2]=i,n.top[o*2+1]=i,n.s++}commit(n){const e=[];for(let a=0;a<Ua;a++){const s=a*2;e.push(s,s+2,s+1,s+2,s+3,s+1)}const o=new ht;o.setAttribute("position",new $(n.pos,3)),o.setAttribute("aTop",new $(n.top,1)),o.setIndex(e),n.ring.mesh.geometry.dispose(),n.ring.mesh.geometry=o,n.ring.mesh.position.set(n.ax,0,n.az),n.ring.anchorX=n.ax,n.ring.anchorZ=n.az}}const _o={h:0,s:0,lat:0,vil:0};function Qd(t,n,e,o,a){const s=o/a,c=a+3,i=new Float32Array(c*c),r=new Float32Array(c*c*3);for(let y=0;y<c;y++)for(let x=0;x<c;x++)t(n+(x-1)*s,e+(y-1)*s,_o),i[y*c+x]=_o.h,r.set([_o.s,_o.lat,_o.vil],(y*c+x)*3);const h=(y,x)=>i[(x+1)*c+(y+1)],u=a+1,l=a*4,f=u*u+l,m=new Float32Array(f*3),d=new Float32Array(f*3),g=new Float32Array(f*3),v=(y,x,M,z)=>{g.set(r.subarray(((M+1)*c+(x+1))*3,((M+1)*c+(x+2))*3),y*3);const C=(h(x+1,M)-h(x-1,M))/(2*s),E=(h(x,M+1)-h(x,M-1))/(2*s),T=1/Math.hypot(C,1,E);m[y*3]=x*s,m[y*3+1]=h(x,M)-z,m[y*3+2]=M*s,d[y*3]=-C*T,d[y*3+1]=T,d[y*3+2]=-E*T};for(let y=0;y<u;y++)for(let x=0;x<u;x++)v(y*u+x,x,y,0);const p=[];for(let y=0;y<a;y++)p.push(y);for(let y=0;y<a;y++)p.push(y*u+a);for(let y=a;y>0;y--)p.push(a*u+y);for(let y=a;y>0;y--)p.push(y*u);const k=s*3+25;p.forEach((y,x)=>v(u*u+x,y%u,Math.floor(y/u),k));const b=[];for(let y=0;y<a;y++)for(let x=0;x<a;x++){const M=y*u+x;b.push(M,M+u,M+1,M+1,M+u,M+u+1)}for(let y=0;y<l;y++){const x=p[y],M=p[(y+1)%l],z=u*u+y,C=u*u+(y+1)%l;b.push(x,M,z,M,C,z)}const w=new ht;return w.setAttribute("position",new $(m,3)),w.setAttribute("normal",new $(d,3)),w.setAttribute("aTrack",new $(g,3)),w.setIndex(f>65535?new $(new Uint32Array(b),1):new $(new Uint16Array(b),1)),w.computeBoundingSphere(),w}class ik{cache=new Map;shown=new Set;home=null;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(n,e,o,a){this.scene=n,this.sample=e,this.material=o,this.cfg=a}update(n,e,o=!1,a=this.cfg.buildBudgetMs){this.computeWanted(n,e),this.home??=new Set(this.wanted.map(c=>c.key));const s=performance.now();for(const c of this.wanted)if(!this.cache.has(c.key)){if(!o&&performance.now()-s>a)return;this.cache.set(c.key,this.build(c))}this.shown.size===this.wanted.length&&this.wanted.every(c=>this.shown.has(c.key))||this.swap()}stats(){let n=0;for(const a of this.shown)n+=this.cache.get(a)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(a=>!this.cache.has(a.key)).length,o=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,wanted:this.wanted.length,vertices:n,reach:o}}computeWanted(n,e){const o=[];for(let s=0;s<this.cfg.levels;s++){const c=this.cfg.baseSize*2**s,i=Math.floor(n/(2*c)),r=Math.floor(e/(2*c)),h=Math.floor(n/c),u=Math.floor(e/c);for(let l=2*r-2;l<=2*r+3;l++)for(let f=2*i-2;f<=2*i+3;f++)s>0&&Math.abs(f-h)<=1&&Math.abs(l-u)<=1||o.push({key:`${s}:${f}:${l}`,level:s,ix:f,iz:l})}const a=o.map(s=>s.key).join("|");a!==this.wantedSig&&(this.wantedSig=a,this.wanted=o)}build(n){const e=this.cfg.baseSize*2**n.level,o=n.ix*e,a=n.iz*e,s=n.level>=2?this.cfg.farSegs:this.cfg.segs,c=new j(Qd(this.sample,o,a,e,s),this.material);return c.position.set(o,0,a),c.matrixAutoUpdate=!1,c.updateMatrix(),c}swap(){const n=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)n.has(e)||this.scene.remove(this.cache.get(e));for(const e of n)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,o]of this.cache)!n.has(e)&&!this.home?.has(e)&&(o.geometry.dispose(),this.cache.delete(e));this.shown=n}}const ck=`
// Đáy thung lũng: thửa CHỮ NHẬT dài theo đường bay (lat × dọc đường), bẻ cong hai tầng, mỗi thửa một màu — như ruộng
// hai bên quốc lộ. BẪY: fract(xz) → bàn cờ (u01); đường đẳng trị nhiễu → bản đồ địa hình (u02, u03); Voronoi nhìn từ
// cú lao xuống → GẠCH LỤC GIÁC (n-2150). fwf = fwidth toạ độ thửa, tính ở main (đạo hàm trong nhánh rẽ không xác định).
vec3 floorFields(vec2 xz, float z, float lat, float fwf, float dist, float hg) {
  // Dải 20 × 60 m, mỗi cột LỆCH dọc đường ngẫu nhiên → bờ ngang hai cột không thẳng hàng, hết bàn cờ (cú lao 2295 m).
  vec2 fp = vec2(lat / 20.0, z / 60.0) + 0.9 * vec2(gnNoise(xz / 110.0), gnNoise(xz.yx / 110.0 + 3.0))
          + 0.18 * vec2(gnNoise(xz / 17.0), gnNoise(xz.yx / 17.0 + 7.0));
  fp.y += fract(sin(floor(fp.x) * 12.9898) * 437.585);
  vec2 ff = fract(fp);
  float fid = fract(sin(dot(floor(fp), vec2(12.9898, 78.233))) * 43758.5453);
  float fedge = min(min(ff.x, 1.0 - ff.x), min(ff.y, 1.0 - ff.y));
  float dyke = (1.0 - smoothstep(0.0, max(0.03, fwf * 1.5), fedge)) * (1.0 - smoothstep(0.2, 0.5, fwf)) * (1.0 - smoothstep(150.0, 700.0, dist));
  float fieldTone = fid * 0.45 + gnNoise(xz / 140.0) * 0.55;
  vec3 fields = mix(srgb(FLOOR_FIELD), srgb(PADDY_GOLD), smoothstep(0.35, 0.7, fieldTone));
  if (hg > 0.001) {
    vec3 hc = fid < 0.34 ? HG_BUCKWHEAT : fid < 0.52 ? HG_BUCKWHEAT_DEEP : fid < 0.8 ? HG_SPROUT : HG_MAIZE;
    // Thửa hoa vẫn lẫn thân xanh (30%): hồng thuần thành tấm thảm nhựa.
    hc = mix(hc, HG_SPROUT, 0.3 * step(fid, 0.52));
    fields = mix(fields, srgb(hc) * (0.88 + 0.24 * gnNoise(xz / 140.0)), hg);
    // Lấm tấm hoa sáng trên thửa hoa ở gần: thửa trơn một màu nhìn từ cú lao thành sọc kẹo (hg-r2-10500).
    float bloomNear = step(fid, 0.52) * (1.0 - smoothstep(60.0, 260.0, dist));
    fields = mix(fields, srgb(vec3(0.95, 0.86, 0.9)), smoothstep(0.7, 0.9, gnNoise(xz / 1.1)) * 0.4 * hg * bloomNear);
  }
  // Một thửa trong ~7 là ruộng nước phản màu trời phía mặt trời (bản xám lam lên màu tím bầm dưới trời hoàng hôn).
  // Phản trời nhưng ngả xám nước: thuần màu chân trời thì thửa thành ô ĐỎ chói trên tấm chăn vá (ảnh cú lao 2295 m).
  // Hà Giang là nương khô trên cao nguyên đá — không có ruộng nước.
  fields = mix(fields, mix(srgb(vec3(0.42, 0.47, 0.5)), ATM_SKY_HORIZON_SUN, 0.25) * 0.6, step(0.86, fract(fid * 7.31)) * 0.45 * (1.0 - hg));
  fields *= 0.92 + 0.16 * gnNoise(xz / 9.0);
  return mix(fields, srgb(vec3(0.5, 0.58, 0.2)), dyke * 0.55);  // bờ cỏ sáng mảnh (bờ tối = đường kẻ lưới)
}

// LÀNG = cao nguyên lúa CHÍN. Bay sát 9,5 m nên thửa ở đây là ô dài gần chữ nhật theo hướng đường (không phải chăn vá
// Voronoi nhìn từ trên cao): vàng óng, xen thửa ngả xanh / đã gặt, bờ cỏ, hàng lúa, vệt gió lướt; đường đất ngay dưới
// đường bay. fwp / fwRows: fwidth theo toạ độ thửa CHƯA bẻ cong, tính ở main (nhiễu bẻ cong tần số thấp).
vec3 villageField(vec2 xz, float z, float lat, float fwp, float fwRows, float dist, float near, float hg) {
  // Bẻ cong hai tầng: bản đầu 0,35 ô thì bờ thẳng tắp thành lưới bàn cờ trải tới chân trời (t vil-title).
  vec2 pu = vec2(lat / 17.0, z / 28.0) + 0.85 * vec2(gnNoise(xz / 85.0), gnNoise(xz.yx / 85.0 + 5.0))
          + 0.15 * vec2(gnNoise(xz / 19.0), gnNoise(xz.yx / 19.0 + 9.0));
  vec2 fr = fract(pu);
  float id = fract(sin(dot(floor(pu), vec2(12.9898, 78.233))) * 43758.5453);
  float edge = min(min(fr.x, 1.0 - fr.x), min(fr.y, 1.0 - fr.y));
  float bund = (1.0 - smoothstep(0.0, max(0.03, fwp * 1.5), edge)) * (1.0 - smoothstep(0.2, 0.5, fwp)) * (1.0 - smoothstep(90.0, 420.0, dist));
  vec3 ripe = mix(srgb(vec3(0.84, 0.6, 0.17)), srgb(vec3(0.94, 0.74, 0.3)), id) * (0.88 + 0.2 * gnNoise(xz / 140.0));
  ripe = mix(ripe, srgb(vec3(0.7, 0.66, 0.2)), step(0.82, id) * 0.7);
  ripe = mix(ripe, srgb(vec3(0.86, 0.77, 0.54)), step(0.94, id));
  if (hg > 0.001) {
    // Lẫn xanh 12% (22% dưới nắng chiều vàng ra hồng be XỈN — hg-r5-10950).
    vec3 bloom = mix(srgb(mix(HG_BUCKWHEAT, HG_SPROUT, 0.12)), srgb(mix(HG_BUCKWHEAT_DEEP, HG_SPROUT, 0.12)), step(0.34, id));
    // Thửa NGÔ NON xanh xen thửa hoa ~4 : 6 (concept v2-5 Lô Lô Chải, 02/11 khuya): bản cũ 16% xanh thì cao nguyên là tấm lưới
    // hồng đều tăm tắp. Thửa xanh riêng, không trộn xanh VÀO màu hồng (trộn thì ra hồng be xỉn — hg-r5-10950).
    bloom = mix(bloom, srgb(HG_SPROUT), step(0.62, id)) * (0.88 + 0.2 * gnNoise(xz / 140.0));
    // Lấm tấm hoa trắng ở gần (tam giác mạch hoa nhỏ, nhìn gần không phải tấm thảm hồng trơn).
    // Đốm 0,7 m trắng 0,5 nhìn sát 9,5 m thành bông TUYẾT (hg-r4-10950): đốm nhỏ hơn, ngả hồng, nhạt hơn.
    bloom = mix(bloom, srgb(vec3(0.96, 0.78, 0.86)), smoothstep(0.74, 0.92, gnNoise(xz / 0.4)) * 0.3 * near);
    ripe = mix(ripe, bloom, hg);
  }
  float sheen = gnNoise(vec2(lat / 9.0, z / 3.0));
  ripe *= 0.84 + 0.26 * sheen + 0.12 * (gnNoise(xz / 0.9) - 0.5) * near;
  ripe *= 1.0 - 0.16 * (1.0 - smoothstep(0.2, 0.6, fwRows)) * smoothstep(0.35, 0.65, abs(fract(z / 0.45) - 0.5) * 2.0);
  vec3 vfield = mix(ripe, srgb(vec3(0.36, 0.5, 0.15)), bund * 0.85);
  // Đường đất dưới đường bay: Hà Giang đất đỏ nâu (concept 2), Khau Phạ đất vàng xám.
  vec3 path = srgb(mix(vec3(0.66, 0.52, 0.36), vec3(0.62, 0.4, 0.28), hg)) * (0.88 + 0.24 * gnNoise(xz / 2.0));
  return mix(vfield, path, 1.0 - smoothstep(2.2, 3.2, abs(lat)));
}
`,rk=`
uniform float uTime;
const vec3 MC_GOLD = vec3(0.95, 0.68, 0.12);
const vec3 MC_GOLD_LIGHT = vec3(0.99, 0.8, 0.3);
const vec3 MC_GREEN_GOLD = vec3(0.66, 0.71, 0.2);
const vec3 MC_GREEN = vec3(0.42, 0.64, 0.16);       // lúa non — thửa cấy muộn
const vec3 MC_STUBBLE = vec3(0.8, 0.62, 0.36);      // thửa đã gặt: rạ (nâu đậm hơn thì dải rạ dài theo bậc đọc ra đường đất)
const vec3 MC_AMBER = vec3(0.9, 0.52, 0.08);        // thửa chín rộ — vàng cam
const vec3 MC_RISER = vec3(0.33, 0.38, 0.1);   // vách bậc phủ cỏ ô liu (concept: dải tối mảnh dưới mỗi bậc vàng)
const vec3 MC_BUND = vec3(0.72, 0.8, 0.3);     // bờ thửa trên mép bậc — vệt sáng mảnh tách bậc khỏi vách
const vec3 MC_FOREST_DARK = vec3(0.11, 0.26, 0.09);
const vec3 MC_FOREST_LIGHT = vec3(0.45, 0.62, 0.19);
const vec3 MC_EARTH = vec3(0.62, 0.42, 0.26);       // đất đỏ vàng bờ dốc đứng (vai vách cú thả)

// MỘT tầng bậc ở toạ độ bậc tc (fw = fwidth(tc)): b 0 → 1 là đi lên dốc qua một bậc — vách (tối) → bờ (sáng) → mặt
// ruộng (sẫm dần về chân vách bậc trên). Mờ dần về MÀU TRUNG BÌNH của mẫu khi fw lớn: mờ về màu lúa trơn thì sườn xa sáng
// hơn sườn gần một nấc, chỗ chuyển tầng tần số thành vành sáng.
// Thử 03/11 (mcc-t1-1100): vách 15% đậm 0,85 → vách đồi nhìn từ cú đổ đèo thành TÔN SÓNG sọc đen — vách mảnh + nhạt.
vec3 mcBands(float tc, float fw, vec3 rice) {
  float b = fract(tc);
  float aa = max(0.05, fw * 1.5);
  float riser = 1.0 - smoothstep(0.1, 0.1 + aa, b);
  float bund = smoothstep(0.1, 0.1 + aa, b) * (1.0 - smoothstep(0.17, 0.17 + aa, b));
  // Mặt bậc sẫm dần về chân vách bậc trên (bóng vách, 25%): bậc đọc ra BẬC có khối chứ không phải sọc sơn (vòng 1 v2).
  vec3 c = rice * (1.0 - 0.25 * smoothstep(0.55, 1.0, b));
  c = mix(c, srgb(MC_BUND), bund * 0.5);
  c = mix(c, srgb(MC_RISER) * 0.8, riser * 0.7);
  vec3 mean = mix(rice * 0.95, srgb(MC_RISER), 0.06);
  return mix(mean, c, 1.0 - smoothstep(0.3, 0.85, fw));
}

// GIÓ LƯỚT trên lúa chín (03/11 — "feeling bay tự do"): dải sáng chạy chéo qua ruộng, mép bẻ theo nhiễu để không thành
// sọc đều. Bước sóng ~57 m — chỉ dùng trong ~600 m (xa hơn sóng nhỏ hơn điểm ảnh thì nhấp nháy).
float mcGust(vec2 xz) {
  float w = sin(dot(xz, vec2(0.8, 0.6)) / 9.0 - uTime * 2.6 + 4.0 * gnNoise(xz / 70.0));
  return pow(0.5 + 0.5 * w, 4.0);
}

// Màu lúa của sườn: vàng chín là chính, đồi ngả xanh vàng theo nhiễu lớn (~1/3 — chưa gặt đều cả vùng), mỗi bậc lệch sắc
// một chút theo số bậc (bậc nào cũng một màu thì sườn thành vân gỗ đều tăm tắp). Vòng chấm 1 v2 (04/11, cả hai giám khảo
// lỗi số 1): "one stripe pattern covers ~60% of most frames… one hue" — xen thửa lúa non xanh (~10%) + thửa đã gặt nâu
// (~7%) theo SỐ BẬC: sườn thành mảng chắp vá như Mù Cang Chải thật mùa gặt, không còn tôn sọc một màu.
// Vòng 2 v2 (hai giám khảo, Vật liệu 1,5): bậc liền một màu vòng quanh đồi vẫn là "uniform corduroy stripe" / "fingerprint
// swirl" ở đỉnh Mâm Xôi → THỬA = (số bậc × ô 46 m bẻ cong theo nhiễu): ranh ô cắt ngang bậc như bờ chia thửa men sườn, mỗi
// thửa một sắc (vàng nhạt → vàng cam, xanh vàng, lúa non, rạ). vary tắt dần sắc thửa ở xa — ô nhỏ hơn điểm ảnh thì nhấp nháy.
vec3 mcPlotCell(vec2 xz) {  // xy = số ô, z = khoảng cách tới ranh ô (m)
  vec2 w = xz + 120.0 * (vec2(gnNoise(xz / 61.0), gnNoise(xz / 67.0 + 9.0)) - 0.5);
  vec2 f = fract(w / 46.0);
  vec2 e = min(f, 1.0 - f) * 46.0;
  return vec3(floor(w / 46.0), min(e.x, e.y));
}
vec3 mcRice(vec2 xz, float id, vec2 cell, float vary) {
  float h = fract(sin(id * 12.9898 + cell.x * 4.1 + cell.y * 7.7) * 43758.5453);
  float k = fract(h * 7.31);
  vec3 c = mix(srgb(MC_GOLD), srgb(MC_GOLD_LIGHT), k * 0.7);
  c = mix(c, srgb(MC_AMBER), step(0.8, h) * step(h, 0.9) * 0.75);
  // Lúa non 7% và chỉ ngả 75%: bậc thô 18 m sát cánh tô xanh lá đặc thành mảng kẹo chanh (vòng 3, mcc-r3-02).
  c = mix(c, srgb(MC_GREEN_GOLD), step(0.07, h) * step(h, 0.17) * 0.85);
  c = mix(c, srgb(MC_GREEN), step(h, 0.07) * 0.75);
  c = mix(c, srgb(MC_STUBBLE), step(0.95, h));
  c = mix(mix(srgb(MC_GOLD), srgb(MC_GOLD_LIGHT), 0.3), c * (0.92 + 0.16 * k), vary);
  return mix(c, srgb(MC_GREEN_GOLD), smoothstep(0.5, 0.72, gnNoise(xz / 420.0)) * 0.85) * (0.9 + 0.2 * gnNoise(xz / 70.0));
}

// Sườn bậc thang: bậc 4,5 m ở gần, bậc "xa" 18 m hiện dần khi bậc gần đã mịn hơn điểm ảnh — đồi xa vẫn còn vân bậc vàng
// xếp tầng (chữ ký của Mù Cang Chải trong mọi ảnh), không thành mảng vàng trơn. fwF / fwC = fwidth(tcF / tcC) từ main.
vec3 mcSlope(vec2 xz, float tcF, float tcC, float fwF, float fwC, float nearT, vec3 cell, float fwE) {
  float vary = 0.35 + 0.65 * nearT;
  vec3 rice = mcRice(xz, floor(tcF), cell.xy, vary);
  // Hàng lúa chạy theo đường đồng mức trên mặt bậc + khóm lổn nhổn — chỉ ở gần (bay sát 10 m).
  float rows = abs(fract(tcF * 6.0) - 0.5) * 2.0;
  rice *= 1.0 - 0.16 * nearT * (1.0 - smoothstep(0.3, 0.8, fwF * 6.0)) * smoothstep(0.3, 0.7, rows);
  rice *= 1.0 + 0.2 * nearT * (gnNoise(xz / 1.3) - 0.5) + 0.15 * nearT * mcGust(xz);
  vec3 fine = mcBands(tcF, fwF, rice);
  // Bờ chia thửa (ranh ô) — vạch ô liu mảnh, chỉ ở gần. 0,25 (bản 0,55): ô lệch theo bậc (mcTerraces) mà vạch đậm thì sườn sát
  // cánh thành MẠCH GẠCH (mc4g 04/11) — ranh thửa đọc bằng đổi sắc giữa hai thửa là đủ.
  fine = mix(fine, srgb(MC_RISER) * 0.8, (1.0 - smoothstep(0.3, 0.3 + max(0.2, fwE * 1.5), cell.z)) * nearT * 0.25);
  vec3 coarse = mcBands(tcC, fwC, mcRice(xz, floor(tcC * 4.0), cell.xy, vary));
  return mix(fine, coarse, smoothstep(0.25, 0.7, fwF));
}

// Bậc thang phủ KÍN sườn thoải–vừa (concept 4), rừng chỉ còn ở mảng nhiễu thấp + sườn dốc — thay paddyTerraces của Khau
// Phạ (terrain-paddy-glsl.ts) chứ không chồng lên: hai bộ không tốn phép nhiễu của nhau.
vec3 mcTerraces(vec3 albedo, vec2 xz, float y, float slope, float patchN, float dist) {
  float tcF = y / 4.5 + gnNoise(xz / 45.0) * 0.8;
  float tcC = y / 18.0 + gnNoise(xz / 160.0) * 0.5;
  // Ruộng tới dốc 0,8 (1 − n.y, ≈ 78°): v2 "đồi nối đồi" có sườn đồi xuất phát / Mâm Xôi dốc 60–70° cạnh cú băng thung (đồi cao
  // 110 m trên bậc, đáy thung 230 m dưới, trong ~225 m) — cắt ở 0,64 thì sườn đó thành mảng rừng tối giữa đồi vàng. Mảng
  // rừng theo nhiễu cũng thu nhỏ (ngưỡng 0,24 → 0,17): mảng 300 m thẫm hình lá giữa đồi ruộng vàng đọc như vết bẩn (chụp
  // 04/11 z 530–670); cây xanh đã có cụm cây cảnh (village-scenery-mu-cang-chai.ts).
  float tMask = (1.0 - smoothstep(0.62, 0.8, slope)) * smoothstep(0.015, 0.05, slope)
              * (1.0 - smoothstep(1250.0, 1450.0, y)) * smoothstep(0.17, 0.24, patchN);
  // Ô thửa LỆCH theo từng bậc (như xếp gạch): cùng một lưới ô cho mọi bậc thì ranh ô chạy liền dọc sườn qua hàng chục bậc —
  // trên đồi tròn sát cánh thành tia "nan ô" toả từ đỉnh (giám khảo 04/11 "radial dark lines like umbrella ribs").
  float stepId = floor(tcF);
  vec3 cell = mcPlotCell(xz + 46.0 * vec2(fract(stepId * 0.618), fract(stepId * 0.382)));
  // Bờ đất DỐC ĐỨNG (> ~78°, vách cú thả B1 dưới làn — layout wall). Màu rừng → mảng xanh thẫm bết sát cánh (mc4-drop);
  // đất đỏ + vệt mưa dọc (nhiễu xz/3,5 trôi chậm theo y) → hai giám khảo v4 "khe tối / vệt nhoè": vệt dọc mịn hơn điểm ảnh
  // khi lướt nhanh đọc như khe nứt. Nay SƯỜN BẬC DỐC: đất xếp tầng theo chính toạ độ bậc tcF (trên mặt đứng là đường ngang
  // lượn theo nhiễu 45 m), mép trên mỗi tầng một vệt lúa sáng + bóng mảnh dưới mép. Chống bẫy Hà Giang (vách đứng + bậc
  // đều = mặt tiền nhà cao tầng): bẻ thêm nhiễu 14 m, tầng dày mỏng theo số tầng, vệt lúa đứt từng quãng.
  // Ngưỡng dốc KHỚP đúng chỗ ruộng tắt (tMask 0,62–0,8): bản 0,76–0,9 để hở một dải — vách thật dốc 0,83 (dò tia mc5b) chỉ
  // nhận nửa màu bờ, nửa còn lại là màu rừng sẫm → vẫn rãnh tối sọc xanh.
  float steep = smoothstep(0.62, 0.8, slope) * (1.0 - smoothstep(200.0, 500.0, dist));
  float tw = tcF + 0.3 * gnNoise(xz / 14.0);
  float sid = floor(tw), sb = fract(tw), swF = fwidth(tw);
  float lipT = 0.9 - 0.14 * fract(sid * 0.618), aaW = max(0.04, swF * 1.5);
  float gap = smoothstep(0.28, 0.4, gnNoise(xz / 22.0 + vec2(sid * 3.7))), tread = smoothstep(lipT, lipT + aaW, sb) * gap;
  vec3 bank = mix(srgb(MC_EARTH), srgb(MC_RISER) * 1.3, smoothstep(0.45, 0.65, gnNoise(xz / 9.0 + vec2(y / 9.0, -y / 11.0))));
  bank *= (0.85 + 0.3 * gnNoise(xz / 4.0 + vec2(y / 4.0))) * (1.0 - 0.35 * gap * smoothstep(lipT - 0.14, lipT, sb));
  bank = mix(bank, mix(srgb(MC_GOLD_LIGHT), srgb(MC_GREEN_GOLD), step(0.7, fract(sid * 0.382))), tread);
  bank = mix(mix(srgb(MC_EARTH) * 0.95, srgb(MC_GOLD), 0.13), bank, 1.0 - smoothstep(0.3, 0.8, swF));
  albedo = mix(albedo, bank, steep);
  return mix(albedo, mcSlope(xz, tcF, tcC, fwidth(tcF), fwidth(tcC), 1.0 - smoothstep(120.0, 340.0, dist), cell, fwidth(cell.z)), tMask);
}

// Cao nguyên làng (nền nâng sát tầm bay — layout-mu-cang-chai.ts): mặt đất PHẲNG nên không có đường đồng mức thật; vẽ
// bậc theo đường đồng mức của một "độ cao giả" (mcPlateauU — gò nhiễu + cao dần ra xa đường đất) → bậc uốn vòng quanh gò
// như ruộng men đồi. Thử 03/11: bậc theo lat (song song đường bay) thành sọc thảm hội tụ về điểm tụ (mcc-t1/t2-700).
// u = mcPlateauU(...) và fwU = fwidth(u) tính ở main (nhánh uniform), fwV = fwidth(ts / 55).
// |lat| mềm (bán kính 30 m): abs(lat) gãy NẾP ngay tâm làn → bậc gặp nhau thành chữ V chĩa xuống đáy khung dưới người bay
// (vòng 2–3 v2, "chevron"); có đáy tròn thì bậc uốn chữ U như lòng máng nông.
float mcPlateauU(vec2 xz, float lat) {
  return (40.0 * gnNoise(xz / 140.0) + 12.0 * gnNoise(xz / 47.0) + 0.35 * (sqrt(lat * lat + 900.0) - 30.0)) / 2.4;
}
vec3 mcPlateau(vec2 xz, float ts, float lat, float u, float fwU, float fwV, float dist, float near) {
  // Thửa như sườn (mcRice): số bậc × ô 46 m (bỏ phần nhiễu sáng 70 m của mcRice — dòng dưới có nhiễu riêng).
  vec3 rice = mcRice(xz, floor(u), mcPlotCell(xz).xy, 0.4 + 0.6 * near) / (0.9 + 0.2 * gnNoise(xz / 70.0));
  // Gió lướt trên lúa + hàng lúa theo bậc (như cao nguyên Khau Phạ, đổi hướng hàng theo bậc).
  rice *= 0.86 + 0.24 * gnNoise(vec2(lat / 9.0, ts / 3.0)) + 0.12 * (gnNoise(xz / 0.9) - 0.5) * near
        + 0.24 * (1.0 - smoothstep(150.0, 600.0, dist)) * mcGust(xz);
  rice *= 1.0 - 0.14 * (1.0 - smoothstep(0.3, 0.8, fwU * 7.0)) * smoothstep(0.35, 0.65, abs(fract(u * 7.0) - 0.5) * 2.0);
  vec3 c = mcBands(u, fwU, rice);
  // Bờ ngang chia thửa dọc đường (cong theo nhiễu), mảnh và tắt từ 400 m.
  float v = fract(ts / 55.0 + 0.6 * gnNoise(xz / 90.0));
  float cross = (1.0 - smoothstep(0.0, max(0.03, fwV * 1.5), min(v, 1.0 - v))) * (1.0 - smoothstep(90.0, 400.0, dist));
  // KHÔNG có lối đất giữa làn (Khau Phạ có): nền bậc ngay dưới người bay, camera đuổi cao ~12 m trên nền nên lối 4 m thành
  // NÊM BE chĩa từ đáy khung tới người bay (điện thoại: 40% đáy khung) — vòng 1 v2 "blurry brown smear", vòng 2 hai giám
  // khảo "dirty glass", "chevron". Mắt bám làn đã có bờ ngang 55 m + hàng chướng ngại.
  return c;
}
`,[Rh,Ih]=zc,[lk,hk]=Mm,Wn=t=>t.toFixed(1),uk=`
uniform float uMistY;
vec3 mcValleyMist(vec3 col, vec3 mistCol, vec2 xz, float y, vec3 track) {
  // Pha theo s của nhánh gần nhất; ở đường phân thuỷ hai nhánh s nhảy nhưng |lat| ở đó lớn → hành lang đã tắt, không lộ mối.
  float ph = mod(track.x + ${Wn(_t)}, ${Wn(ct)});
  float corridor = smoothstep(${Wn(Rh-40)}, ${Wn(Rh+40)}, ph) * (1.0 - smoothstep(${Wn(Ih-40)}, ${Wn(Ih+40)}, ph))
    * (1.0 - smoothstep(${Wn(lk)}, ${Wn(hk)}, abs(track.y)));
  // Mép trên lên xuống ±15 m theo nhiễu 140 m, trên mặt mây ~15 m: phủ luôn chỗ mặt biển mây cắt bờ (đường dao — bẫy biển mây
  // 170 m). Đặc dần 45 m — mép cứng = vạch sơn quanh đồi theo đồng mức (bẫy dải mây ôm sườn Fansipan vòng 8).
  float top = uMistY + 15.0 + 30.0 * (gnNoise(xz / 140.0) - 0.5);
  float k = (1.0 - smoothstep(-45.0, 0.0, y - top)) * (1.0 - corridor);
  // Sáng / tối theo nhiễu 60 m: một màu phẳng thì nửa dưới khung thành tấm trắng không thước đo (giám khảo A mc8b). Phủ 0,94:
  // 0,88 còn lộ vân bậc ruộng mờ dưới mây = "giấy kẻ dòng" (mc8f).
  return mix(col, mistCol * mix(0.86, 1.08, gnNoise(xz / 60.0 + 4.7)), 0.94 * k);
}
`,mk=`
vec3 paddyTerraces(vec3 albedo, vec2 xz, float y, float slope, float patchN, float dist, float hg, float fp) {
  float terrace = (1.0 - smoothstep(0.38, 0.52, slope)) * smoothstep(0.03, 0.08, slope)  // đáy khe phẳng: sọc bậc = gợn xám
                * (1.0 - smoothstep(1250.0, 1450.0, y)) * smoothstep(0.42, 0.52, patchN);
  float tc = y / 5.0 + gnNoise(xz / 45.0) * 0.8;
  float fw = fwidth(tc);
  float band = fract(tc);
  float riser = (1.0 - smoothstep(0.0, max(0.14, fw * 1.5), band)) * (1.0 - smoothstep(0.35, 0.9, fw));
  // band × khoảng cách: sọc bậc góp vào màu chỉ ở gần — để nguyên thì sườn xa thành bản đồ đồng mức (adviser 01/11).
  // Hà Giang: bậc trên sườn là nương NGÔ xanh / ngô khô (tam giác mạch hồng chỉ ở đáy thung lũng + làng) — bậc hồng xen
  // xanh theo nhiễu thành sọc đồng mức tím (hg-1-gorge). Bậc chỉ ở sườn thoải: sườn 0,3–0,5 để đá lộ, không thì sọc bậc
  // 5 m lộ qua lớp đá trộn dở thành vách kẻ ngang.
  terrace *= 1.0 - hg * smoothstep(0.22, 0.34, slope);
  terrace *= 1.0 - fp;  // Fansipan không ruộng bậc (ruộng là bản sắc Mù Cang Chải / Khau Phạ)
  vec3 paddy = mix(srgb(mix(PADDY_GREEN, HG_SPROUT, hg)), srgb(mix(PADDY_GOLD, HG_MAIZE, hg)), smoothstep(0.3, 0.7, gnNoise(xz / 90.0) + band * 0.25 * (1.0 - smoothstep(300.0, 900.0, dist))));
  // Bờ bậc 0,5 và tắt dần từ 300 m: đậm + xa thì sườn đồi thành vân gỗ đồng mức (u03-mouth).
  paddy = mix(paddy, srgb(TERRACE_EDGE), riser * 0.5 * (1.0 - smoothstep(300.0, 900.0, dist)));
  // Bậc ruộng GẦN (fresh-eyes 01/11 d-4600: "mặt phẳng tím trống 55% khung"): 7 hàng lúa mỗi bậc chạy theo đường đồng
  // mức + khóm lúa lổn nhổn + ~1/5 số bậc là ruộng nước phản trời — dải màu trơn thành ruộng bậc thang có người cấy.
  float nearT = 1.0 - smoothstep(120.0, 340.0, dist);
  float rowT = abs(fract(tc * 7.0) - 0.5) * 2.0;
  paddy *= 1.0 - 0.2 * nearT * (1.0 - smoothstep(0.3, 0.8, fwidth(tc * 7.0))) * smoothstep(0.3, 0.7, rowT);
  paddy *= 1.0 + 0.22 * nearT * (gnNoise(xz / 1.3) - 0.5);
  float wet = step(0.8, fract(floor(tc) * 0.618 + gnNoise(xz / 300.0)));
  paddy = mix(paddy, mix(srgb(vec3(0.4, 0.46, 0.5)), ATM_SKY_HORIZON_SUN, 0.45) * 0.8, wet * 0.6 * (1.0 - hg));
  return mix(albedo, paddy, terrace);
}
`,dk=`
vec4 mcSt = vec4(0.0);                 // x: d = lat − tâm suối (m), y: mép nước (m), z: ghềnh 0..1, w: m mỗi điểm ảnh
vec4 mcRk = vec4(0.0);                 // x: phủ đá tảng, y: bọt quanh đá, zw: toạ độ trong đá (dọc dòng, ngang; ±1 = mép)
vec4 mcFr = vec4(0.0, 1.0, 1.0, 0.0);  // xy: hướng s tăng (xz thế giới), zw: hướng lat tăng
float mcS = 0.0;

// Tâm dòng theo (s, lat) của nhánh gần nhất — uốn ±12 m quanh tâm đường: lòng phẳng (floorK) phải chứa được cả dòng.
float mcStreamCenter(float s) {
  return 7.0 * sin(s / 160.0) + 3.5 * sin(s / 57.0 + 1.7) + 3.0 * (gnNoise(vec2(s / 37.0, 3.1)) - 0.5);
}

// Đá tảng theo ô (dọc dòng 5 m × ngang 3,4 m): ghềnh dày hơn, đoạn êm lác đác, vài tảng trên bãi cuội. Ghi vào mcRk.
// Thử 04/11 (mcc-st-b): tảng 0,55–1,5 m dày 45% ở ghềnh + vòng bọt kín quanh mỗi tảng → hàng "đĩa nâu viền trắng" như lỗ
// cống / con lăn (đá vẽ phẳng, bay sát 13 m không có thị sai). Giờ nhỏ, thưa, mép méo theo nhiễu, bọt chỉ ở đuôi xuôi dòng.
void mcBoulders(float s, float d, float edge, float outer, float rap, float fpx) {
  vec2 cs = vec2(5.0, 3.4);
  vec2 ip = floor(vec2(s, d) / cs);
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 cell = ip + vec2(float(i), float(j));
    vec2 ctr = (cell + 0.1 + 0.8 * vec2(gnHash(cell + 5.1), gnHash(cell + 9.3))) * cs;
    float cd = abs(ctr.y);
    float inWater = 1.0 - smoothstep(edge - 0.6, edge + 0.4, cd);
    float onBar = (1.0 - inWater) * (1.0 - smoothstep(outer - 0.5, outer + 0.5, cd));
    if (gnHash(cell + 31.7) > inWater * mix(0.015, 0.2, rap) + onBar * 0.1) continue;
    float r = mix(0.35, 1.0, gnHash(cell + 2.9)) * (1.0 + 0.25 * rap);
    vec2 q = (vec2(s, d) - ctr) / vec2(r * 1.3, r);
    float l = length(q) * (1.0 + 0.35 * (gnNoise(q * 1.6 + cell * 7.3) - 0.5));
    float aq = (fpx * 1.5 + 0.03) / r;
    float cov = 1.0 - smoothstep(1.0 - aq, 1.0 + aq, l);
    // Nước chảy về phía s GIẢM (ngược chiều bay — nước lao qua bụng người bay): bọt ở đuôi phía q.x < 0, không vòng kín.
    float foam = inWater * (1.0 - smoothstep(0.9, 1.6, length(vec2(q.x < 0.0 ? q.x * 0.3 : q.x * 2.0, q.y * 1.15))))
               * (q.x < 0.0 ? 1.0 : 0.4);
    mcRk.y = max(mcRk.y, foam);
    if (cov > mcRk.x) mcRk = vec4(cov, mcRk.y, q);
  }
}

vec2 mcStreamMask(float s, float lat, float rfw, float floorK) {
  // Hướng dòng / ngang trong xz thế giới: giải gradient của s, lat từ đạo hàm màn hình (ma trận 2×2 của vWorld.xz).
  vec2 jx = dFdx(vWorld.xz);
  vec2 jy = dFdy(vWorld.xz);
  vec2 ds = vec2(dFdx(s), dFdy(s));
  vec2 dl = vec2(dFdx(lat), dFdy(lat));
  float det = jx.x * jy.y - jx.y * jy.x;
  det = abs(det) < 1e-7 ? 1e-7 : det;
  vec2 gs = vec2(jy.y * ds.x - jx.y * ds.y, jx.x * ds.y - jy.x * ds.x) / det;
  vec2 gl = vec2(jy.y * dl.x - jx.y * dl.y, jx.x * dl.y - jy.x * dl.x) / det;
  mcFr = vec4(normalize(gs + vec2(1e-6, 0.0)), normalize(gl + vec2(0.0, 1e-6)));
  float fpx = max(rfw, abs(ds.x) + abs(ds.y));
  float fine = 1.0 - smoothstep(0.15, 0.5, fpx);

  float d = lat - mcStreamCenter(s);
  float ad = abs(d);
  float side = d < 0.0 ? -1.0 : 1.0;
  float rap = smoothstep(0.56, 0.7, gnNoise(vec2(s / 95.0, 11.0)));
  // Nửa rộng 3,5–10 m (sông nhìn từ 120–200 m trên — map dựng lại 04/11: bay men sườn, suối ở đáy thung bên dưới).
  float hw = (3.5 + 5.5 * smoothstep(0.25, 0.75, gnNoise(vec2(s / 70.0, 7.0))) + 1.5 * gnNoise(vec2(s / 19.0, 2.0))) * (1.0 - 0.25 * rap);
  float edge = hw + 1.2 * (gnNoise(vec2(s / 6.0, side * 5.0 + 20.0)) - 0.5) + 0.5 * fine * (gnNoise(vec2(s / 1.6, side * 3.0 + 50.0)) - 0.5);
  float aa = rfw * 1.5 + 0.05;
  float water = 1.0 - smoothstep(edge - aa, edge + aa, ad);
  // Bãi cuội: CHỈ từng quãng (phần lớn bờ là cỏ sát nước), mép ngoài loang vào cỏ (nhiễu thế giới 1,5 m), cuội lốm đốm để
  // màu sỏi + cỏ xen nhau. Thử 04/11: bãi 0,3 m trở lên suốt dọc hai bờ → nhìn từ trên vẫn ra hai lề xám song song.
  float gw = 4.5 * smoothstep(0.55, 0.85, gnNoise(vec2(s / 42.0, side * 9.0 + 40.0)));
  float outer = edge + gw * (0.45 + 0.75 * gnNoise(vWorld.xz / 1.5));
  float bar = (1.0 - smoothstep(outer - aa - 0.5, outer + aa, ad)) * (1.0 - water);
  bar *= clamp(mix(0.8, 0.5 + 0.7 * gnNoise(vWorld.xz / 0.45), fine), 0.0, 1.0);

  mcS = s;
  mcSt = vec4(d, edge, rap, fpx);
  mcRk = vec4(0.0);
#ifndef TERRAIN_LITE
  if (floorK > 0.001 && fpx < 0.8 && ad < outer + 2.0) mcBoulders(s, d, edge, outer, rap, fpx);
#endif
  return vec2(max(water, mcRk.x), bar * (1.0 - mcRk.x)) * floorK;
}

// Màu SAU chiếu sáng của mọi thứ trong mặt nạ nước: nước + bọt + đá tảng (đá tự chiếu sáng như công thức địa hình).
vec3 mcStreamColor(vec3 w, vec3 V, vec3 pools) {
  float d = mcSt.x;
  float rap = mcSt.z;
  float fine = 1.0 - smoothstep(0.15, 0.5, mcSt.w);
  vec3 T = vec3(mcFr.x, 0.0, mcFr.y);
  vec3 B = vec3(mcFr.z, 0.0, mcFr.w);
  float nightK = smoothstep(0.42, 0.95, atmT());
  float depth = clamp(1.0 - abs(d) / max(mcSt.y, 0.5), 0.0, 1.0);

  // Gợn kéo dài theo dòng (2,2 m dọc × 0,9 m ngang), ghềnh gợn mạnh hơn.
  vec2 uv = vec2(mcS / 2.2, d / 0.9);
  float n0 = gnNoise(uv);
  float amp = (0.25 + 0.8 * rap) * fine + 0.06;
  vec3 n = normalize(vec3(0.0, 1.0, 0.0) + (T * 0.5 * (gnNoise(uv + vec2(0.35, 0.0)) - n0) + B * (gnNoise(uv + vec2(0.0, 0.35)) - n0)) * amp * 3.0);
  vec3 R = reflect(-V, n);
  vec3 up = vec3(0.0, 1.0, 0.0);
  float flatWrap = clamp((ATM_SUN_DIR.y + 0.3) / 1.3, 0.0, 1.0);
  vec3 flatLight = ATM_SKY_AMBIENT * 0.8 + ATM_SUN_LIGHT * flatWrap * 1.3 + atmNightFill(up) * 1.15;
  // Tia phản xạ SƯỢT trong thung đập vào sườn đồi, không lên trời: thử 04/11 gương trời thuần ở góc sượt ra dải hồng kem
  // sáng hơn bờ = "đường sơn trắng". Dưới ~15° phản màu sườn ruộng / rừng (đã chiếu sáng), trên đó là trời thật.
  vec3 sky = atmSkyColor(normalize(vec3(R.x, max(R.y, 0.03), R.z)));
  sky = mix(srgb(vec3(0.5, 0.5, 0.2)) * flatLight * 0.75, sky, smoothstep(0.1, 0.4, R.y));
  // Trời phản chiếu ngả BẠC LAM: đỉnh trời chiều của bảng màu là tím oải hương (#4d5a9c) — phản thẳng thì suối nhìn từ trên
  // thành dải tím xám (mcc-st-c). Đêm: chân trời #a8466a phản lên ra tím hồng sặc (vòng 0) → xám lam tối.
  float skyL = dot(sky, vec3(0.3, 0.59, 0.11));
  sky = mix(sky, vec3(skyL) * vec3(0.74, 0.96, 1.2), 0.7);
  sky = mix(sky, vec3(skyL) * vec3(0.58, 0.8, 1.16), 0.8 * nightK);
  // Fresnel có sàn 0,3: nhìn từ 120–200 m (góc dốc, Fresnel thật ~0,02) suối vẫn ánh bạc của trời, không thành vệt đất ướt.
  float fres = 0.3 + 0.7 * pow(1.0 - max(dot(n, V), 0.0), 5.0);

  float bedN = mix(0.5, gnNoise(w.xz / 0.55), fine) * 0.6 + gnNoise(w.xz / 2.3) * 0.4;
  vec3 bed = mix(srgb(vec3(0.42, 0.39, 0.27)), srgb(vec3(0.62, 0.57, 0.42)), bedN);
  vec3 body = mix(bed, srgb(vec3(0.13, 0.29, 0.31)), smoothstep(0.1, 0.8, depth) * 0.8) * flatLight * 0.75;

  float sunR = max(dot(R, ATM_SUN_DIR), 0.0);
  float streak = mix(0.45, smoothstep(0.35, 0.85, gnNoise(vec2(mcS / 3.0, d / 0.32))), fine);
  float glint = (pow(sunR, 10.0) * 0.25 + pow(sunR, 28.0) * 0.55) * streak * (1.0 - nightK);
  vec3 col = mix(body, sky, fres) + ATM_SUN_LIGHT * glint + pools * 0.6;

  // Ghềnh = BẬC đá chắn ngang mỗi ~15 m (đường bậc cong theo nhiễu): ngay dưới bậc trắng xoá, tan dần thành vệt dọc dòng.
  // Dòng chảy về s GIẢM nên phía dưới bậc là fract gần 1. Đoạn êm: vệt bọt mảnh trôi dài. Xa (điểm ảnh > 0,2 m): về độ phủ
  // trung bình. Thử 04/11: bọt ngưỡng nhiễu đều cả đoạn → dải trắng liền như dây thừng (mcc-st-b); bậc đều 13 m chắn KÍN
  // ngang → thang chữ V (mcc-st-c) → mỗi bậc mạnh / yếu riêng (hash) và chỉ trắng từng mảng theo bề ngang.
  float ph = mcS / 15.0 + 0.6 * gnNoise(vec2(mcS / 11.0, d / 4.0 + 5.0));
  float g = fract(ph);
  float fs = gnNoise(vec2(mcS / 2.4, d / 0.45)) * 0.65 + gnNoise(vec2(mcS / 0.9, d / 0.3)) * 0.35;
  float stepK = smoothstep(0.25, 0.7, gnHash(vec2(floor(ph), 3.0))) * smoothstep(0.3, 0.6, gnNoise(vec2(floor(ph) * 7.1, d / 2.5)));
  float dens = rap * (stepK * smoothstep(0.4, 1.0, g) * (1.0 - smoothstep(0.985, 1.0, g)) + 0.25 * (1.0 - depth));
  float foam = smoothstep(1.0 - dens - 0.08, 1.0 - dens + 0.08, fs);
  // Vệt bọt mảnh đoạn êm: mảnh 0,28 m × dài 7 m × 0,3 thành nét XƯỚC trắng thẳng như mưa (mcc-st-b-bench-view) → ngắn, mờ hơn.
  foam = max(foam, smoothstep(0.76, 0.9, gnNoise(vec2(mcS / 4.5, d / 0.5))) * 0.16);
  foam = max(foam, mcRk.y * smoothstep(0.25, 0.6, fs));
  foam = mix(dens * 0.9 + mcRk.y * 0.3, foam, fine);
  vec3 foamC = srgb(vec3(0.93, 0.95, 0.95)) * flatLight * (1.0 - 0.45 * nightK) + pools * 0.8;
  col = mix(col, foamC, clamp(foam, 0.0, 1.0));

  // Đá tảng: vòm từ toạ độ trong đá, chân ướt sẫm, rêu lốm đốm; đèn như địa hình (bọc nắng + trời + trăng đêm) + viền
  // ngược nắng như rock-material.ts — nắng trước mặt nên luôn thấy mặt khuất, thiếu viền thì đá thành LỖ tối trên nước.
  if (mcRk.x > 0.001) {
    vec2 q = mcRk.zw;
    float hgt = sqrt(max(1.0 - dot(q, q), 0.0));
    vec3 nr = normalize(up * (hgt + 0.2) + T * q.x * 0.75 + B * q.y);
    float wrap = clamp((dot(nr, ATM_SUN_DIR) + 0.3) / 1.3, 0.0, 1.0);
    vec3 rl = ATM_SKY_AMBIENT * (0.45 + 0.35 * nr.y) + ATM_SUN_LIGHT * wrap * 1.3 + ATM_BOUNCE * 0.25 * (1.0 - nr.y)
            + atmNightFill(nr) * 1.15 + pools;
    vec3 ra = mix(srgb(vec3(0.44, 0.42, 0.38)), srgb(vec3(0.66, 0.61, 0.54)), gnNoise(w.xz / 0.7 + 3.0));
    ra = mix(ra, srgb(vec3(0.38, 0.44, 0.2)), 0.35 * smoothstep(0.55, 0.85, gnNoise(w.xz / 1.1 + 9.0)) * hgt);
    ra *= mix(0.75, 1.0, smoothstep(0.1, 0.45, hgt));
    ra = mix(ra, vec3(dot(ra, vec3(0.3, 0.59, 0.11))) * vec3(0.85, 1.0, 1.2), 0.32 * nightK);
    float rim = pow(1.0 - max(dot(nr, V), 0.0), 3.0) * pow(max(dot(-V, ATM_SUN_DIR), 0.0), 2.0);
    col = mix(col, ra * rl + mix(ATM_GLOW * 0.7, ATM_SKY_HORIZON_SUN * 0.2, nightK) * rim, mcRk.x);
  }
  return col;
}
`,fk=`
// Màu viết theo sRGB (dễ so với ảnh X4 bằng mắt) rồi đổi sang tuyến tính trong shader.
// BẪY: bản đầu viết thẳng giá trị sRGB làm màu tuyến tính → cả cảnh nhạt bệch, vách đá thành màu be.
vec3 srgb(vec3 c) { return pow(c, vec3(2.2)); }
const vec3 PADDY_GOLD = vec3(0.88, 0.68, 0.16);
const vec3 PADDY_GREEN = vec3(0.55, 0.63, 0.16);
const vec3 TERRACE_EDGE = vec3(0.33, 0.26, 0.09);
const vec3 FOREST_DARK = vec3(0.10, 0.20, 0.09);
const vec3 FOREST_LIGHT = vec3(0.40, 0.50, 0.15);
const vec3 ROCK = vec3(0.60, 0.53, 0.45);
const vec3 ROCK_SHADE = vec3(0.38, 0.31, 0.27);
const vec3 FLOOR_FIELD = vec3(0.60, 0.66, 0.22);
// HÀ GIANG (map Hà Giang — uniform uRegionHg của world/region.ts; concept art/regions/ha-giang 1b/2/3, Anh duyệt 02/11). Concept lấy mẫu ra màu ĐÃ
// qua nắng ngược (đá #584a57) — đây là albedo đã nâng. Tam giác mạch nền hồng tím LẠNH: dưới nắng chiều vàng nó tự ngả
// cam hồng; nền ấm thì thành màu lúa chín, mất chất vùng (báo cáo concept).
// Thử 02/11 (hg-2-village): hồng 0,86/0,56/0,70 dưới trời sáng lam ra cánh đồng OẢI HƯƠNG tím gắt — tam giác mạch là
// hồng phấn lẫn thân xanh, nhìn xa nhạt chứ không đặc màu.
// Thử 02/11 vòng 2: đá 0,58/0,55/0,58 dưới ánh trời tím ra vách OẢI HƯƠNG — đá concept 1b là xám ẤM, phần tím là do trời.
const vec3 HG_ROCK = vec3(0.64, 0.6, 0.56);
const vec3 HG_ROCK_SHADE = vec3(0.3, 0.27, 0.27);
const vec3 HG_BUCKWHEAT = vec3(0.86, 0.66, 0.68);
const vec3 HG_BUCKWHEAT_DEEP = vec3(0.74, 0.44, 0.5);
const vec3 HG_SPROUT = vec3(0.42, 0.52, 0.24);
const vec3 HG_MAIZE = vec3(0.6, 0.56, 0.36);  // ngô ngả ô liu: 0,70/0,58/0,34 thành sọc VÀNG kẹo xen hồng (hg-r2-10500)

// Vệt cọ rừng 3 tầng (7 m, 23 m, 1,6 m ở gần) tại toạ độ tô p.
float dabAt(vec2 p, float near) {
  return gnNoise(p / 7.0) * 0.45 + gnNoise(p / 23.0) * 0.35 + gnNoise(p / 1.6) * 0.2 * near;
}

// Độ sáng tán rừng 0..1 ở điểm w (tách khỏi main của terrain-material.ts 04/11). bw = trọng số biplanar |n.x|, |n.z|.
// Toạ độ tô: mặt bằng thì xz; vách đứng thì (z, y) / (x, y) theo hướng vách (biplanar). BẪY 1: dùng xz cho vách →
// nhiễu bị kéo dọc thành vệt sọc hội tụ như nhoè chuyển động. BẪY 2 (adviser 01/11): TRỘN TOẠ ĐỘ theo độ dốc
// (mix(xz, (x+z, y), w)) — toạ độ tuyệt đối hàng nghìn mét nên w đổi chút là uv trượt hàng trăm mét → vân xoáy, vòng
// đồng mức trên sườn (n-2150, n-3000). Giờ lấy mẫu riêng từng mặt rồi trộn KẾT QUẢ. BẪY 3: (x+z, y) suy biến ở vách
// quay hướng (1, 1) (x+z hằng số) → sọc dọc (n-700, n-1450) — biplanar theo |n.x|, |n.z| không suy biến.
float forestTone(vec3 w, vec2 bw, float slope, float dist, float near) {
  float wall = smoothstep(0.35, 0.7, slope);
  // Rừng: nền tối + vệt cọ sáng, mờ dần theo khoảng cách (chống lấp lánh). Gần thêm tầng 1,6 m + giảm tương phản:
  // bay sát vách 10–30 m, tầng 7 m một mình thành ô vuông vỡ hạt.
  float dabFlat = 0.5;
  float dabWall = 0.5;
  if (wall < 0.99) dabFlat = dabAt(w.xz, near);
#ifdef TERRAIN_LITE
  // Máy yếu: một mặt chiếu (trục trội) thay vì hai — vách chéo 45° có đường nối, đổi lấy ~1/2 phép nhiễu của vách.
  if (wall > 0.01) dabWall = dabAt(bw.x > bw.y ? vec2(w.z, w.y * 1.6) : vec2(w.x, w.y * 1.6), 0.0);
#else
  if (wall > 0.01) dabWall = dabAt(vec2(w.z, w.y * 1.6), near) * bw.x + dabAt(vec2(w.x, w.y * 1.6), near) * bw.y;
#endif
  float dab = mix(dabFlat, dabWall, wall);
  // Vách GẦN (≤ ~200 m): tương phản hẹp hơn → mảng cọ có MÉP (mảng mềm đọc thành vách nhoè như chụp rung, n-1450).
  // BẪY 01/11: tán cây bằng ô Voronoi 3,5 m → DA RẮN — đừng dùng ô tế bào đều cho rừng.
  float crisp = (1.0 - smoothstep(60.0, 240.0, dist)) * smoothstep(0.25, 0.6, wall);
  return mix(smoothstep(0.2, 0.9, mix(0.5, dab, near)), smoothstep(0.4, 0.64, dab), crisp);
}

// Vách đá vôi theo toạ độ ngang h (chạy dọc vách) + y: rgb = màu đá đã có gờ cây bụi, a = độ lộ đá.
// lfw (độ mịn khe phân tầng) tính NGOÀI nhánh rẽ ở main — đạo hàm trong nhánh rẽ khác nhau là không xác định.
// hg (Hà Giang): đá xám lộ nhiều hơn, gờ cây bụi thưa hơn. BẪY (thử 02/11): rãnh "tai mèo" dọc vách 3,4 m — nhìn xa
// lấp lánh thành LƯỚI như vách căng lưới, nhìn gần thành rèm vải xếp nếp. Bỏ; concept 1b là khối đá nứt + bụi cây.
vec4 rockFace(float h, float y, float slope, float lfw, vec3 forest, float hg) {
  // Granite Fansipan: ở đây CHỈ độ lộ — màu + khe + gờ tô một lần, triplanar, ở
  // fansipan-terrain-detail-glsl.ts. Gờ ngang 38 m đọc ra "khán đài bậc" (vòng 7–9); vệt dọc 16 m + rãnh rừng 150 m đọc ra
  // "texture kéo giãn" (vòng 12–14). Độ lộ cũ (70 × 180 m) kéo mảng đá thành DẢI dọc trăm mét: nay 38 × 50 m + răng cưa 11 m,
  // mép sắc hơn ×1,8 (mép mềm 0,2 đơn vị nhiễu = loang mờ hàng chục mét; ×2,4 ra mảng rừng mép cắt như "đốm sơn" — vòng 15).
  // Define REGION_FP (world/region.ts regionDefines): map khác không dịch hai dòng này, Fansipan không dịch đá vôi bên dưới.
#ifdef REGION_FP
  float e = gnNoise(vec2(h / 38.0, y / 50.0)) * 0.65 + gnNoise(vec2(h / 11.0, y / 14.0)) * 0.35 + (slope - 0.75) * 0.9;
  return vec4(0.0, 0.0, 0.0, 0.46 + (e - 0.46) * 1.8);
#else
  float exposure = gnNoise(vec2(h / 70.0, y / 180.0)) + (slope - 0.75) * 0.9 + 0.15 * hg;
  float lc = y / 38.0 + gnNoise(vec2(h, 0.0) / 120.0) * 1.6;
  float lf = fract(lc);
  float ledgeFade = 1.0 - smoothstep(0.25, 0.6, lfw);
  float ledge = smoothstep(0.55, 0.66, lf) * (1.0 - smoothstep(0.9, 0.97, lf)) * smoothstep(0.35, 0.6, gnNoise(vec2(h / 25.0, lc * 0.37)));
  float stain = gnNoise(vec2(h / 9.0, y / 160.0));
  float t = (0.55 + 0.25 * lf * ledgeFade + 0.12 * (1.0 - ledgeFade)) * (0.7 + 0.3 * stain);
  vec3 rock = mix(srgb(mix(ROCK_SHADE, HG_ROCK_SHADE, hg)), srgb(mix(ROCK, HG_ROCK, hg)), t);
  return vec4(mix(rock, forest, ledge * ledgeFade * (1.0 - 0.3 * hg)), exposure);
#endif
}

// Vách biplanar: mẫu theo z trên vách quay hướng x, theo x trên vách quay hướng z. Mặt chiếu trọng số < 0,1 không
// thấy được — bỏ, đỡ gấp đôi phép nhiễu trên phần lớn vách (review 01/11); TERRAIN_LITE chỉ lấy trục trội.
vec4 rockBlend(vec3 w, vec2 bw, float slope, float lfw, vec3 forest, float hg) {
#ifdef TERRAIN_LITE
  return bw.x > bw.y ? rockFace(w.z, w.y, slope, lfw, forest, hg) : rockFace(w.x, w.y, slope, lfw, forest, hg);
#else
  if (bw.x < 0.1) return rockFace(w.x, w.y, slope, lfw, forest, hg);
  if (bw.y < 0.1) return rockFace(w.z, w.y, slope, lfw, forest, hg);
  return rockFace(w.z, w.y, slope, lfw, forest, hg) * bw.x + rockFace(w.x, w.y, slope, lfw, forest, hg) * bw.y;
#endif
}

// SUỐI đáy khe / sông đáy thung lũng (01/11 vòng 7 — fresh-eyes: "đáy khe 4600 là mặt phẳng xám gợn sóng 50–60% khung,
// chủ đề chỉ còn ở màu trời"). Khe X4 có suối, thung lũng nhìn qua lỗ mây có sông: một dải nước uốn quanh tâm đường bay
// (lệch tối đa ~8,5 m — đáy khe hẹp nhất vẫn chứa được), bờ sỏi 1,6–2,6 m. Trả vec2(nước, bờ). rfw = fwidth(lat) tính
// ở main (đạo hàm trong nhánh rẽ là không xác định); floorK đã gồm mặt phẳng, ngoài làng, trong ~900 m.
// BẪY: đừng đặt tên tham số 'flat' — từ khoá GLSL ES 3.0 (WebGL2), shader không biên dịch.
// Hà Giang (hg): SÔNG NHO QUẾ rộng 30–40 m lấp gần hết lòng hẻm (đáy phẳng ±22–26 m — layout-ha-giang.ts), uốn ít hơn —
// nhìn từ gờ ven vực 340 m trên là "sợi chỉ ngọc" (signature số 1 trong ảnh anh Đức gửi 02/11), không phải con suối.
// Mù Cang Chải: suối Nậm Kim riêng (terrain-mu-cang-chai-stream-glsl.ts) — gọi trong define REGION_MC (world/region.ts
// regionDefines). BẪY 04/11: bản đầu chỉ rẽ theo uniform regionIs(2.0) — map khác không CHẠY nhưng vẫn phải DỊCH 170 dòng,
// ANGLE/D3D11 dịch thêm 4,5–5,3 s vào game ở MỌI map (docs/debugging/2026-11-04-sky-run-boot-cham-suoi-mcc.md).
${dk}
vec2 riverMask(float s, float lat, float rfw, float floorK, float hg) {
#ifdef REGION_MC
  return mcStreamMask(s, lat, rfw, floorK);
#else
  float rl = abs(lat - mix(6.0, 3.0, hg) * sin(s / 140.0) - 2.5 * sin(s / 47.0 + 1.7));
  float hw = mix(3.2 + 1.6 * gnNoise(vec2(s / 80.0, 7.0)), 15.0 + 5.0 * gnNoise(vec2(s / 120.0, 7.0)), hg);
  float fw = rfw * 1.5 + 0.05;
  float water = (1.0 - smoothstep(hw - fw, hw + fw, rl)) * floorK;
  return vec2(water, max(0.0, (1.0 - smoothstep(hw + 1.6, hw + 2.6 + fw, rl)) * floorK - water));
#endif
}

// Màu nước SAU chiếu sáng: nước sâu tối + phản trời theo Fresnel (nhìn sượt = gương trời) + loé nắng trên gợn tĩnh (bay
// 60 m/s thì gợn tĩnh cũng lấp lánh) + vũng đèn trời phản lên mặt nước ban đêm. Hà Giang: sông Nho Quế XANH NGỌC — thân
// nước sáng + phản trời ngả ngọc (thân tối như suối Khau Phạ thì chỉ còn gương trời, mất màu sông đặc trưng của vùng).
vec3 riverColor(vec3 w, vec3 V, vec3 pools, float hg) {
#ifdef REGION_MC
  return mcStreamColor(w, V, pools);
#else
  vec2 q = w.xz / 3.0;
  float r0 = gnNoise(q);
  // Gợn 3 m tắt theo khoảng cách CHỈ khi nhìn SƯỢT: xa + sượt nó răng cưa thành vân CỒN CÁT (giám khảo Fansipan vòng 6–8). Nhìn
  // từ trên (cú rơi Fansipan) giữ gợn + thêm gợn LỚN ~18 m — gợn 3 m từ 150 m đã dưới 1 px, lòng hồ thành tấm xanh phẳng
  // (vòng 11). Nhìn sượt (bay sát sông Khau Phạ / Hà Giang) không có gợn lớn: giữ như cũ.
  float graze = 1.0 - smoothstep(0.2, 0.55, V.y);
  float rip = 0.6 * (1.0 - graze * smoothstep(60.0, 240.0, length(cameraPosition - w))) + 0.05;
  vec2 q2 = w.xz / 18.0;
  float b0 = gnNoise(q2);
  float big = 0.5 * (1.0 - graze);
  vec3 nr = normalize(vec3((gnNoise(q + vec2(0.4, 0.0)) - r0) * rip + (gnNoise(q2 + vec2(0.4, 0.0)) - b0) * big, 1.0,
                           (gnNoise(q + vec2(0.0, 0.4)) - r0) * rip + (gnNoise(q2 + vec2(0.0, 0.4)) - b0) * big));
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(nr, V), 0.0), 5.0);
  vec3 sky = mix(ATM_SKY_AMBIENT * 1.3, ATM_SKY_HORIZON_SUN, smoothstep(0.2, 0.9, 1.0 - V.y));
  sky = mix(sky, sky * vec3(0.55, 1.0, 0.92), 0.5 * hg);
  vec3 deep = srgb(mix(vec3(0.06, 0.14, 0.15), vec3(0.13, 0.44, 0.43), hg)) * (ATM_SKY_AMBIENT + ATM_SUN_LIGHT * 0.35);
  float glint = pow(max(dot(reflect(-V, nr), ATM_SUN_DIR), 0.0), 60.0);
  // Hà Giang bay SÁT nước (13 m) nên nhìn sượt suốt đoạn sông: gương trời + loé nắng phủ gần hết mặt nước, "tương phản hơi
  // chói" (anh Đức 02/11 khuya). Hà Giang: thân nước sẫm hơn chút, phản trời còn 70%, loé nắng còn một nửa. Khau Phạ giữ số cũ.
  return mix(deep, sky, fres * mix(1.0, 0.7, hg)) + ATM_SUN_LIGHT * glint * mix(2.5, 1.2, hg) + pools * 0.6;
#endif
}
`,gk=`
// Một lớp TÁN CÂY rời trên lưới q (đơn vị ô): mỗi ô một tán tròn, bán kính 0,4–0,72 ô, lệch tâm ±0,25 ô — vừa đủ để chỉ xét
// 2×2 ô gần nhất mà không tán nào bị cắt thẳng (ô ngoài 2×2 cách ≥ 0,75 ô). Tán chồng nhau: vòm cao hơn thắng → giữa hai tán
// có nếp gấp sắc. Ngoài mọi tán là KHE (tầng dưới tán, tối). Trả (vòm 1 − d²/r², ≤ 0 = khe; mã tán 0..1).
// BẪY 01/11: ô Voronoi 3,5 m cho tán rừng = DA RẮN (ô kín khít như vảy). Ở đây tán là ĐĨA có khe, cỡ khác nhau, hai lớp lệch.
// BẪY 03/11 (bản đầu vòng này): nhiễu NGƯỠNG làm tán — ở 100–300 m nhìn sượt vẫn ra vết loang mềm, không đọc ra cây.
vec2 fpCrowns(vec2 q, float rk) {
  vec2 b = floor(q - 0.5);
  float best = -1.0;
  float id = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = b + vec2(float(i), float(j));
    float h1 = gnHash(c);
    float h2 = gnHash(c + 17.17);
    vec2 d = q - c - 0.5 - (vec2(h1, h2) - 0.5) * 0.5;
    float r = (0.4 + 0.32 * fract(h1 * 7.13 + h2 * 3.7)) * rk;  // rk ≤ 1: tán chỉ NHỎ đi, không bị cắt thẳng
    float t = 1.0 - dot(d, d) / (r * r);
    if (t > best) { best = t; id = h2; }
  }
  return vec2(best, id);
}
// Tán 6 m (đọc được tới ~600 m) + tán 2,5 m lấp KHE của lớp lớn (chỉ ở gần). el: vách dựng cho tán cao gấp 1,4 lần rộng — cây
// trên vách mọc thẳng đứng, tán chồng theo chiều dọc. Trả (độ sáng tán — 0 = khe, độ cao tán m, mã tán của lớp lớn).
// Xa (ô nhỏ hơn ~3 điểm ảnh) về trung bình 0,63 — đúng mức để hệ số màu ở main ≈ 1: vòng xa không sáng / tối hơn vòng gần.
// dens 0..1 (mảng rừng thưa → dày, nhiễu ~70 m ở fpTerrainDetail): rừng thưa tán nhỏ, ít tán lấp khe.
vec3 fpCanopy(vec2 p, float fw, float el, float dens) {
  vec2 q = vec2(p.x, p.y / el);
  vec2 a = fpCrowns(q / 6.0, mix(0.55, 1.0, dens));
  float aa = fw / 6.0;
  float mA = smoothstep(0.0, 0.1 + 2.5 * aa, a.x);
  float shade = mA * (0.6 + 0.4 * sqrt(max(a.x, 0.0))) * (0.85 + 0.3 * a.y);
  float H = mA * sqrt(max(a.x, 0.0)) * 2.2;
  float ab = fw / 2.5;
  if (ab < 0.5) {
    vec2 c = fpCrowns(mat2(0.8, -0.6, 0.6, 0.8) * q / 2.5 + 7.3, mix(0.7, 1.0, dens));
    float mB = (1.0 - mA) * smoothstep(0.0, 0.12 + 2.5 * ab, c.x) * (1.0 - smoothstep(0.25, 0.5, ab)) * mix(0.35, 1.0, dens);
    float dB = sqrt(max(c.x, 0.0));
    shade = max(shade, mB * (0.5 + 0.35 * dB) * (0.85 + 0.3 * c.y));
    H += mB * dB * 0.9;
  }
  float sub = smoothstep(0.2, 0.5, aa);
  return vec3(mix(shade, mix(0.45, 0.63, dens), sub), H * (1.0 - sub), a.y);
}

// PHẢI gọi trong nhánh đồng nhất (cờ vùng là uniform) — grBump lấy đạo hàm màn hình. albedo: màu đã trộn ở main (đá kiểu
// Khau Phạ đã TẮT cho Fansipan), forest: màu rừng nền vẽ cọ, rockK: mặt nạ đá lộ (0 ở mặt thoải). Ghi nL = pháp tuyến chiếu sáng.
vec3 fpTerrainDetail(vec3 albedo, vec3 n, vec3 forest, float rockK, float dist, out vec3 nL) {
  vec2 xz = vWorld.xz;
  float y = vWorld.y;
  float slope = 1.0 - n.y;
  float fw = grPixelM(vWorld);
  vec3 tw = grTriW(n);
  // Sương muối / tuyết trên mặt NGỬA ở cao: mép lòng chảo (~230–290 m thế giới), đỉnh nhô khỏi mây, dãy núi xa — ảnh mood: đỉnh
  // Hoàng Liên như đảo trên biển mây. Mép răng cưa theo nhiễu, không thành đường đồng mức.
  float snowAlt = smoothstep(195.0, 245.0, y + 35.0 * gnNoise(xz / 47.0));
  float snow = snowAlt * smoothstep(0.5, 0.82, n.y);
  // Vòng 17 (giám khảo: rừng trên vách "đốm lặp"): biến thiên TẦNG LỚN — mảng rừng thưa / dày ~70 m. Toạ độ xz/70 + y/55:
  // hai chiều trên mọi hướng vách lẫn mặt bằng bằng MỘT mẫu nhiễu (biplanar thì tốn hai; (x + z, y) suy biến — bẫy 3 ở main).
  float dens = smoothstep(0.3, 0.7, gnNoise(xz / 70.0 + y / 55.0 + 2.9));
  // Vệt ĐÁ LỘ dọc trong rừng trên vách dựng (7 × 18 m, nhiều hơn ở mảng thưa): rừng phủ kín đều cả vách là thứ lặp.
  float streakN = tw.x * gnNoise(vec2(vWorld.z / 7.0, y / 18.0) + 5.3) + tw.z * gnNoise(vec2(vWorld.x / 7.0, y / 18.0) + 1.1);
  rockK = max(rockK, smoothstep(0.68, 0.76, streakN / max(tw.x + tw.z, 1e-3)) * smoothstep(0.5, 0.8, slope) * (1.0 - snow)
                    * mix(1.0, 0.45, dens) * step(0.05, tw.x + tw.z));

  // Tán rừng triplanar (thay cụm tán xz + cụm tán biplanar vòng 9 / 14: hai lớp nhiễu mượt nhân vào màu — vẫn là mảng mờ).
  vec3 cw = vec3(0.0);
  if (tw.y > 0.0) cw += tw.y * fpCanopy(xz, fw, 1.0, dens);
  if (tw.x > 0.0) cw += tw.x * fpCanopy(vec2(vWorld.z, y) + 41.0, fw, 1.4, dens);
  if (tw.z > 0.0) cw += tw.z * fpCanopy(vec2(vWorld.x, y) - 23.0, fw, 1.4, dens);
  float nearC = (1.0 - smoothstep(300.0, 900.0, dist)) * (1.0 - snow);
  // Khe tối 0,4 → đỉnh tán 1,4; mỗi tán ngả vàng / lam chút theo mã (rừng thật mỗi cây một sắc — một màu đều là thảm cỏ).
  // Khe giữa tán: rừng DÀY = bóng sâu (0,4), rừng THƯA = tầng dưới / đất lộ sáng hơn, ngả vàng ô liu (0,62).
  float gap = mix(0.62, 0.4, dens);
  vec3 tint = mix(vec3(0.92, 1.0, 1.07), vec3(1.07, 1.02, 0.9), cw.z) * mix(vec3(1.08, 1.04, 0.84), vec3(1.0), dens);
  vec3 col = albedo * mix(vec3(1.0), (gap + (1.4 - gap) * cw.x) * tint, nearC);
  float H = cw.y * nearC;

  // Granite lộ: khối 10 m có khe dọc ngắn + gờ bóc vỏ từng mảng (rockFace của Fansipan chỉ trả độ lộ — màu tô ở đây, MỘT lần,
  // triplanar). Bản vệt dọc 16 m + rãnh rừng dọc 150 m đọc ra "hộp xám có vệt UV kéo dài" (khung đèn khe C, vòng 13–14).
  if (rockK > 0.001) {
    vec4 gj = vec4(0.0);
    if (tw.x > 0.0) gj += tw.x * grJoints(vec2(vWorld.z, y), 10.0, fw, 1.0);
    if (tw.z > 0.0) gj += tw.z * grJoints(vec2(vWorld.x, y), 10.0, fw, 1.0);
    // Mặt chiếu xz (sườn 0,42–0,6): khe đầy đủ trên mặt gần ngửa ra ĐẤT NỨT NẺ / lát đá (ảnh khe C) — phiến granite thoải thật
    // trơn, ít khe: giữ tông khối, khe + độ nhô còn 30%.
    if (tw.y > 0.0) gj += tw.y * grJoints(mat2(0.8, -0.6, 0.6, 0.8) * xz, 10.0, fw, 1.0) * vec4(0.3, 0.3, 1.0, 1.0);
    // Tông LỚN ~45 m (mảng sáng / sẫm, địa y lục xám) trước tông từng khối: chỉ có tông khối thì mặt vách là lưới khối đều tăm
    // tắp như ốp gạch (ảnh vòng này).
    float macro = gnNoise(vec2(xz.x + xz.y, y) / 45.0);
    vec3 g = mix(srgb(ROCK_SHADE), srgb(ROCK), clamp(0.1 + 0.5 * gj.z + 0.4 * macro, 0.0, 1.0)) * vec3(0.72, 0.78, 0.8) + vec3(0.0, 0.012, 0.01);
    // Ngả xám lam như tháp kim (×0,85): vách xám hồng phấn nhạt cạnh tháp xanh đen đọc ra hai loại đá khác nhau.
    g = mix(g, g * vec3(0.86, 1.0, 0.9), smoothstep(0.55, 0.75, macro)) * vec3(0.82, 0.86, 0.9);
    // Sẫm dần lên phía gờ trên (vệt nước + bóng gờ): mặt khối phẳng một tông đọc ra tấm bê tông.
    g *= 1.0 - 0.28 * smoothstep(0.45, 1.0, gj.w);
    // Rêu đen xanh trong khe (vách Hoàng Liên ẩm — khe xám trơn đọc ra bê tông) + bụi cây trên ĐỈNH một số khối (gờ).
    g = mix(g * (1.0 - 0.5 * gj.y), forest * 0.5, 0.5 * gj.y);
    // Rêu RỦ từ gờ xuống (đậm sát gờ, nhạt dần 40% chiều cao khối, loang theo tông) — bản mảng mép sắc trên đỉnh khối đọc ra
    // "đốm sơn xanh" (vòng 15).
    g = mix(g, forest * 0.7, smoothstep(0.55, 1.0, gj.w) * smoothstep(0.35, 0.8, gj.z) * 0.55 * (1.0 - snowAlt));
    col = mix(col, g, rockK);
    H = mix(H, gj.x * 0.6, rockK);
  }
  // Biên độ tắt dần 200 → 600 m: xa thì đạo hàm 2×2 điểm ảnh của H thành hạt nhiễu.
  nL = grBump(vWorld, n, H * (1.0 - smoothstep(200.0, 600.0, dist)));
  // Gờ đá ngửa lên (pháp tuyến chi tiết ngóc hơn mặt vách) ở cao: tuyết đọng thành vạch ngắn đứt quãng trên vách đá.
  col = mix(col, srgb(vec3(0.86, 0.9, 0.95)), snowAlt * smoothstep(0.12, 0.4, nL.y - n.y) * rockK * 0.85);
  col = mix(col, srgb(vec3(0.9, 0.93, 0.98)), snow * 0.92);
  // Đỗ quyên đỏ: chấm hoa trên sườn rừng thoải, chỉ ở gần (xa thì lấp lánh) — concept 3 / r4-35. Bụi nhỏ ~1,5 m, thưa, trong
  // 160 m: bản /6 m · 480 m ra vệt sơn đỏ loang lổ (ảnh vòng 1).
  float speck = smoothstep(0.86, 0.92, gnNoise(xz / 1.6)) * smoothstep(0.55, 0.75, gnNoise(xz / 40.0)) * smoothstep(0.08, 0.3, slope)
    * (1.0 - smoothstep(0.5, 0.72, slope)) * (1.0 - snow) * (1.0 - smoothstep(70.0, 160.0, dist));
  col = mix(col, srgb(vec3(0.62, 0.12, 0.2)), speck * 0.8);
  // Rừng Hoàng Liên ngả xám ngọc (bớt 35% bão hoà): xanh lá rực của Khau Phạ đọc ra "thảm cỏ" dưới nắng lạnh.
  return mix(col, vec3(dot(col, vec3(0.3, 0.59, 0.11))) * vec3(0.92, 1.0, 1.04), 0.35 * (1.0 - snow));
}

// deckHug (mây ôm sườn) tách ra deck-hug-glsl.ts từ vòng 18 — cây rừng (foliage) dùng cùng hàm để chìm vào cùng dải mây.

// Bờ hồ / suối Fansipan SAU chiếu sáng (water = mặt nạ nước river.x). Mép nước là chỗ mặt nạ đổi trong một hai tam giác (dốc
// 0,07–0,14 hoặc cao +3…+10 m) → mọi dải tô theo mặt nạ đều thành NÉT mảnh: bọt sáng cũ = "đường nối trắng viền bờ" (vòng 15).
// Thay bằng dải theo ĐỘ CAO trên mặt nước (rộng ~10–20 m ngang trên sườn thoải): đất ướt sẫm ngả lam + sỏi lốm đốm ở gần, và
// nước nông ở mép sáng ngả ngọc nhẹ — mép nước còn là chỗ đổi màu, không còn vạch sáng.
vec3 fpShore(vec3 col, float water, float dist) {
  vec2 xz = vWorld.xz;
  float hw = vWorld.y - uWaterY + 3.0 * gnNoise(xz / 23.0);
  float wet = (1.0 - smoothstep(9.0, 18.0, hw)) * (1.0 - water);
  float grit = 1.0 - smoothstep(60.0, 220.0, dist);
  col *= mix(vec3(1.0), vec3(0.6, 0.66, 0.72) * (1.0 + 0.25 * grit * (gnNoise(xz / 0.9) - 0.5)), 0.75 * wet);
  // Bãi đá / sỏi ướt ngay trên mép nước (cao < 4–9 m): rừng chạm thẳng mặt nước là "bờ cắt giấy dán" (vòng 11) — chỗ bọt cũ
  // từng che. Màu đã chiếu sáng gần đúng (trời + nửa nắng), vì hàm chạy SAU chiếu sáng.
  // Bề rộng ĐỔI theo nhiễu 31 m (ngưỡng cao 2–10 m) + loang 9 m: dải xám đều bám mép nước đọc ra "đường nhựa có lề" (bẫy
  // sông 30 m, ảnh vòng 2) — bãi bờ thật chỗ có chỗ không, lẫn rêu.
  float bankH = 2.0 + 8.0 * gnNoise(xz / 31.0 + 4.1);
  float bank = (1.0 - smoothstep(bankH - 1.5, bankH + 2.5, hw)) * (1.0 - water) * smoothstep(0.25, 0.6, gnNoise(xz / 9.0 + 2.2));
  vec3 gravel = srgb(mix(vec3(0.3, 0.3, 0.28), vec3(0.24, 0.28, 0.2), gnNoise(xz / 4.0))) * (0.8 + 0.4 * gnNoise(xz / 1.7))
              * (ATM_SKY_AMBIENT * 0.75 + ATM_SUN_LIGHT * 0.45);
  col = mix(col, gravel, 0.7 * bank);
  float shallow = smoothstep(0.2, 0.6, water) * (1.0 - smoothstep(0.75, 1.0, water));
  return mix(col, col * vec3(1.05, 1.12, 1.1), 0.35 * shallow);
}
`,pk=`
#include <fog_pars_fragment>
${ce}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;
uniform float uWaterY;
uniform vec4 uDeck;

${pr}
${fk}
${ck}
${mk}
${rk}
${uk}
${qb}
${ld}
${Sm}
${gk}

void main() {
  vec3 n = normalize(vNormal);
  vec3 nL = n;  // pháp tuyến CHIẾU SÁNG: Fansipan cộng chi tiết gần (fpTerrainDetail), map khác đúng bằng n
  float slope = 1.0 - n.y;
  float y = vWorld.y;
  vec2 xz = vWorld.xz;
  float hg = regionIs(1.0);  // vùng của map (world/region.ts): Hà Giang
  float mc = regionIs(2.0);  // Mù Cang Chải (terrain-mu-cang-chai-lib.ts)
  float fp = regionIs(3.0);  // Fansipan
  float patchN = gnNoise(xz / 260.0) * 0.65 + gnNoise(xz / 61.0) * 0.35;
  float dist = length(cameraPosition - vWorld);
  if (dist > uMaxDist) discard;  // địa hình thật là đĩa quanh camera; ngoài đĩa là các lớp núi cách điệu
  float near = 1.0 - smoothstep(1500.0, 5000.0, dist);
  // Trọng số biplanar theo |n.x|, |n.z| (không suy biến — BẪY toạ độ tô ở forestTone, terrain-shader-lib.ts); vách đá dùng chung.
  vec2 bw = abs(n.xz) + 1e-3;
  bw /= bw.x + bw.y;
  float tone = forestTone(vWorld, bw, slope, dist, near);
  // Hà Giang: bụi cây trên đá thẫm hơn, ngả ô liu (concept 1b) — không phải rừng xanh mướt Khau Phạ.
  // Fansipan: rừng rêu Hoàng Liên xanh ngọc tối, lạnh — không xanh lúa ấm của Khau Phạ. Mù Cang Chải: xanh tươi hơn.
  vec3 forest = mix(srgb(FOREST_DARK), srgb(FOREST_LIGHT), tone) * mix(vec3(1.0), vec3(0.86, 0.84, 0.72), hg) * mix(vec3(1.0), vec3(0.6, 0.8, 0.8), fp);
  forest = mix(forest, mix(srgb(MC_FOREST_DARK), srgb(MC_FOREST_LIGHT), tone), mc);
  vec3 albedo = forest;
  // Ruộng bậc thang: MỘT bộ theo map (terrain-paddy-glsl.ts / terrain-mu-cang-chai-lib.ts), chọn bằng define vùng — không rẽ
  // nhánh nên fwidth trong hai hàm hợp lệ.
  // Mù Cang Chải v2: sườn đồi ngay cạnh làn (≤ 60 m) luôn là ruộng — mảng rừng ở đó thành dải xanh nhoè lướt sát cánh,
  // mất đúng cảnh "bay men sườn ruộng bậc thang" (chụp 04/11 z 380–670). Rừng trở lại từ ~180 m.
#ifdef REGION_MC
  albedo = mcTerraces(albedo, xz, y, slope, patchN + 0.3 * (1.0 - smoothstep(60.0, 180.0, abs(vTrack.y))), dist);
#else
  albedo = paddyTerraces(albedo, xz, y, slope, patchN, dist, hg, fp);
#endif

  // Toạ độ theo đường bay: quãng s, lệch ngang lat, độ làng của nhánh GẦN NHẤT — terrain-height.ts tính lúc dựng ô
  // (thuộc tính aTrack). Trước 02/11 shader tự tính centerX(z) + villageAmount bằng hằng số chép tay; đường quay đầu thì
  // một z có nhiều nhánh nên công thức theo z hết đúng. BẪY: ở đường phân thuỷ giữa hai nhánh s nhảy hàng trăm m trong
  // một tam giác — mọi vân theo s phải tắt theo fwidth (bờ thửa / hàng lúa đã có), không thì thành dải nén sọc.
  float ts = vTrack.x;
  float lat = vTrack.y;
  float vil = vTrack.z;

  // Đáy thung lũng (terrain-field-lib floorFields). fwidth tính NGOÀI nhánh if. Fansipan không có (mặt nạ × (1 − fp) = 0).
#ifndef REGION_FP
  float floorMask = (1.0 - smoothstep(0.02, 0.06, slope)) * (1.0 - smoothstep(120.0, 220.0, y)) * (1.0 - fp);
  float fwf = max(fwidth(lat / 20.0), fwidth(ts / 60.0)) * 1.15;
  if (floorMask > 0.001) albedo = mix(albedo, floorFields(xz, ts, lat, fwf, dist, hg), floorMask);
#endif

  // Suối đáy khe / sông thung lũng (terrain-shader-lib riverMask): bờ sỏi tô vào albedo, nước tô SAU chiếu sáng.
  // Hà Giang: sông nhìn từ gờ A cách ~350 m, từ đỉnh cùi chỏ leo ~600 m — giữ tới 1,4 km (Khau Phạ 900 m như cũ).
  vec2 river = riverMask(ts, lat, fwidth(lat), (1.0 - smoothstep(0.02, mix(0.05, 0.12, hg), slope)) * (1.0 - vil) * (1.0 - smoothstep(mix(600.0, 1000.0, hg), mix(900.0, 1400.0, hg), dist)), hg);
  // Fansipan: mọi đáy phẳng THẤP là mặt nước (hồ / suối Mường Hoa ở W — đáy lòng chảo / khe ẩn dưới tầng mây): bản sông 30 m
  // trong rãnh hành lang đọc ra đường nhựa có lề (ảnh vòng 2).
  // Mực nước theo MẶT BẰNG ở camera (uWaterY, layout "waterLevel"): đáy lòng chảo A / F cao hơn mặt suối W 33 m nên không
  // thành nước (bản ngưỡng độ cao cứng: lỗ nóc mây lộ nước tối như vết mực; ngưỡng 450 m: hồ xa thành bãi cát — vòng 3 / 5).
  // Hồ không bờ sỏi (riverMask rộng của Hà Giang làm cả đáy thành cát nhăn), dốc tới 0,14 (đáy gợn đồi thấp).
  river.x = max(river.x, fp * (1.0 - smoothstep(0.07, 0.14, slope)) * (1.0 - smoothstep(uWaterY + 3.0, uWaterY + 10.0, y)));
  albedo = mix(albedo, srgb(vec3(0.56, 0.5, 0.42)) * (0.8 + 0.3 * gnNoise(xz / 0.8)), river.y);

  // LÀNG = cao nguyên lúa chín / tam giác mạch (track-path villageAmount qua aTrack; terrain-field-lib villageField).
  // fwidth PHẢI tính ngoài nhánh if (đạo hàm trong nhánh rẽ khác nhau giữa các điểm ảnh là không xác định — viền nhiễu
  // ở mép làng).
  float fwp = max(fwidth(lat / 17.0), fwidth(ts / 28.0)) * 1.15;
  float fwRows = fwidth(ts / 0.45);
#ifdef REGION_MC
  float mcU = mcPlateauU(xz, lat);  // bậc cao nguyên Mù Cang Chải (mcPlateau) — fwidth ngoài nhánh vil
  float fwU = fwidth(mcU);
  float fwV = fwidth(ts / 55.0);
#endif
  if (vil > 0.001) {
    vil *= (1.0 - smoothstep(240.0, 380.0, abs(lat))) * (1.0 - smoothstep(0.08, 0.2, slope));
#ifdef REGION_MC
    albedo = mix(albedo, mcPlateau(xz, ts, lat, mcU, fwU, fwV, dist, near), vil);
#else
    albedo = mix(albedo, villageField(xz, ts, lat, fwp, fwRows, dist, near, hg), vil);
#endif
  }

  // Vách đá vôi: tầng ngang ~38 m có gờ cây bụi + bóng dưới gờ (gờ thật trong lưới 10–16 m không làm được), đá chỉ lộ ở
  // chỗ thật dốc — vách X4 xanh nhiều hơn xám. Biplanar như vệt cọ (BẪY 3 ở trên), trộn KẾT QUẢ. Hà Giang: đá lộ từ dốc
  // thấp hơn hẳn (hẻm Nho Quế = vách đá trơ, ít cây — concept 1b) — làn bay đọc rõ hơn trên nền đá xám.
  float lfw = fwidth(y / 38.0) * 1.2;
  float hr = max(hg, fp);  // Fansipan: vách granite lộ nhiều như hẻm Hà Giang
  // Fansipan: vách dựng lộ granite từ dốc 0,42 — vân rừng chiếu xz lên vách gần thẳng đứng kéo thành vệt mờ (vòng 13, cả hai giám khảo).
  // Mù Cang Chải: đồi đất, gần như không lộ đá.
  float rockMin = mix(mix(mix(0.76, 0.56, hr), 0.42, fp), 0.86, mc);
  float rockK = 0.0;  // Fansipan: màu granite tô trong fpTerrainDetail theo mặt nạ này (rockFace của Fansipan chỉ trả độ lộ)
  if (slope > rockMin) {
    vec4 rf = rockBlend(vWorld, bw, slope, lfw, forest, hg);
    rockK = smoothstep(rockMin + 0.02, mix(0.95, 0.8, hr), slope) * smoothstep(mix(0.5, 0.36, hr), mix(0.7, 0.56, hr), rf.a);
    albedo = mix(albedo, rf.rgb, rockK * (1.0 - fp));
  }
  // Fansipan: tán rừng có khối + granite nứt khối + tuyết / đỗ quyên + pháp tuyến chi tiết (fansipan-terrain-detail-glsl.ts).
  // Chọn bằng define (không rẽ nhánh) — trong hàm có dFdx.
#ifdef REGION_FP
  albedo = fpTerrainDetail(albedo, n, forest, rockK, dist, nL);
#endif

  float ndl = dot(nL, ATM_SUN_DIR);  // lambert bọc: mặt quay lưng mặt trời vẫn có khối
  vec3 pools = lanternPools(vWorld, n);  // vũng sáng đèn trời ban đêm (lantern-ground-light-pools.ts)
  float wrap = clamp((ndl + 0.3) / 1.3, 0.0, 1.0);
  float nightK = smoothstep(0.42, 0.95, atmT());
  // Đêm: ánh trời lên mặt PHẲNG (ngoài làng) giảm 45% → đất tối, đèn trời nổi lên. Làng giữ: tối đều cả khung hạ tương phản.
  vec3 light = ATM_SKY_AMBIENT * (0.45 + 0.35 * nL.y) * (1.0 - 0.45 * nightK * smoothstep(0.6, 0.95, n.y) * (1.0 - vil))
             + ATM_SUN_LIGHT * wrap * 1.3 + ATM_BOUNCE * 0.25 * (1.0 - nL.y) + atmNightFill(nL) * 1.15 * (1.0 - 0.5 * vil)
             + pools
  // Mù Cang Chải: trăng LAM có hướng — đêm đồi tròn chỉ có ánh trời đều thì thành nhựa gân xám (vòng 1 v2: "ribbed grey
  // plastic", tương phản 48–51); một phía sườn sáng lam, phía kia tối → đồi có khối.
             + mc * nightK * vec3(0.15, 0.2, 0.36) * max(dot(nL, normalize(vec3(-0.35, 0.75, 0.55))), 0.0);
  // Đêm: lá rừng không có kênh lam → ánh trăng lam vẫn ra đen: ngả albedo về xám lam. BẪY: ×2,2 / ngả 0,45 = bãi TUYẾT.
  // Mù Cang Chải ngả ít (0,14): ruộng vàng thành XÁM là mất bản sắc ban đêm — giữ vàng trầm dưới trăng lam.
  albedo = mix(albedo, vec3(dot(albedo, vec3(0.3, 0.59, 0.11))) * vec3(0.85, 1.0, 1.2) + vec3(0.008, 0.014, 0.03), mix(0.32, 0.14, mc) * nightK);
  // Mặt SÁNG (lúa chín, ruộng bậc vàng) bị ánh trăng đẩy thành bãi tuyết (l6-4600, l6-5600) — đêm nén albedo sáng.
  // Mù Cang Chải nén 0,32: vàng nén một nửa dưới trăng lam ra NÂU — vòng 2 v2 "muddy brown", "wood grain at night".
  albedo *= 1.0 - mix(0.5, 0.32, mc) * nightK * smoothstep(0.12, 0.45, dot(albedo, vec3(0.3, 0.59, 0.11)));
  vec3 col = albedo * light;
  vec3 V = (cameraPosition - vWorld) / max(dist, 0.001);
  // Fansipan: nước xám lam phản trần mây (nửa đường giữa suối Khau Phạ và ngọc Nho Quế) — concept r3-29.
  if (river.x > 0.001) col = mix(col, riverColor(vWorld, V, pools, max(hg, 0.45 * fp)), river.x);
  // Fansipan nhìn sượt: gương trời ra màu chân trời nắng (be) → mặt hồ xa đọc ra BÃI CÁT (giám khảo vòng 6–8). Dưới trần mây
  // nước phản xám lam — kéo về lạnh + tối ~15% theo độ sượt.
  col = mix(col, col * vec3(0.72, 0.86, 1.0), fp * river.x * smoothstep(0.25, 0.85, 1.0 - V.y));
  // Bọt sáng ở MÉP bờ (dải chuyển của mặt nạ nước): bờ hồ cắt gọn như giấy dán xanh (vòng 11). Dải MỀM loang nhẹ — ngưỡng nhiễu
  // cứng ra NÉT ĐỨT trắng như đường cắt vector (vòng 12).
  // Vòng 16: dải bọt sáng hẹp ra NÉT TRẮNG viền bờ như đường nối (d-eye, b-top) → bờ ướt sẫm rộng + nước nông (fpShore).
#ifdef REGION_FP
  col = fpShore(col, river.x, dist);
#endif

  // Mây ÔM sườn (deckHug ở deck-hug-glsl.ts — cây rừng dùng chung): đất quanh mặt tầng mây ngả dần về màu nóc mây (cùng công thức
  // shade / sunlit của cloud-sea.ts). Map không có tầng: độ phủ uDeck = 0 → hug = 0, không đổi gì.
  float hug = deckHug(vWorld);
  col = mix(col, DECK_HUG_COLOR, 0.75 * hug);

  // Viền ngược sáng: mặt nghiêng gần song song tia nhìn, khi nhìn về phía mặt trời → mép núi rực vàng.
  float rim = pow(1.0 - max(dot(n, V), 0.0), 4.0) * pow(max(dot(-V, ATM_SUN_DIR), 0.0), 3.0);
  // Mặt trời lặn thì viền ngược nắng cũng tắt (adviser 01/11): để nguyên thì mặt đất nhìn sượt về phía chân trời
  // đêm có một lớp cam rực như ban ngày (l7-4600) — đêm còn viền mỏng màu chân trời.
  // Trong dải mây ôm sườn: tắt viền ngược nắng — cộng lên màu mây thành DẢI TRẮNG mảnh dọc chân vách (vòng 17, agent mây dò
  // bằng tô đỏ mặt tầng). Map khác hug = 0 → không đổi.
  col += mix(ATM_GLOW * 0.9, ATM_SKY_HORIZON_SUN * 0.25, nightK) * rim * (1.0 - hug);
#if defined(REGION_MC) && defined(USE_FOG)
  // Mù Cang Chải: đất dưới mặt biển mây chìm vào mây (terrain-mu-cang-chai-mist-glsl.ts — nếp "lòng máng" dưới bụng ở cú thả
  // B1), rồi khí quyển theo độ sâu: độ dày quang học = quãng tia × khí đặc dần theo độ sâu TB dọc tia (nửa độ sâu điểm).
  // BẪY mc8b: trộn theo độ sâu mà KHÔNG theo quãng → bờ ngay dưới bụng (gần nhất) nhạt nhất, đồi 1 km vẫn nét = ngược tín hiệu.
  col = mcValleyMist(col, DECK_HUG_COLOR, xz, y, vTrack);
  float deepK = smoothstep(30.0, 200.0, 0.5 * (cameraPosition.y - vWorld.y));
  col = mix(col, atmHazeColor(-V), 0.6 * (1.0 - exp(-0.003 * dist * deepK)));
#endif

  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`,vk=`
#include <fog_pars_vertex>
attribute vec3 aTrack;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vTrack = aTrack;
  vNormal = normal;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,Jd={value:0};function yk(t=1e9,n=!1){return new Mt({vertexShader:vk,fragmentShader:pk,defines:nm(n?{TERRAIN_LITE:1}:{}),uniforms:{...Ln.merge([_n.fog,{uMaxDist:{value:t}}]),...bs,uRegionHg:co,uWaterY:gr,uDeck:hs,uMistY:tm,uTime:Jd},fog:!0})}const bk=6e3,Ph=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function wk(t,n){const e=yk(bk,n.lite),o=new ik(t,Nc,e,{baseSize:n.baseSize,segs:n.segs,farSegs:n.farSegs,levels:n.levels,buildBudgetMs:5}),a=new sk(t,lt,Ph);return{update(s,c,i){o.update(s.x,s.z,c,i),a.update(s.x,s.z,!1,i)},progress(s){const c=o.stats(),i=8;return{pending:c.pending+i*a.pending(s.x,s.z),wanted:c.wanted+i*Ph.length-i}},warmups:()=>[new j(Qd(Nc,0,0,1,1),e)],statsLine(){const s=o.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const Bh=16,Hh=3,Ro=1.8,Fh=2.2,Pn={x:0,v:0};function xk(t,n,e,o){Pn.x=0,Pn.v=0;for(const a of t.obstacles){const s=Wt[a.kind],c=a.z-n;if(c+s.halfZ+1<0||c-s.halfZ>Bh)continue;const i=Math.min(1,Math.max(0,1-(c-s.halfZ)/Bh)),r=Tt(a.lane);let h=0,u=0;if(a.kind==="ridge")u=Math.max(0,s.hi+Hh-o);else if(a.kind==="bridge")o>s.lo-Ro&&o<s.hi+Ro&&(u=t.v<s.lo?s.lo-Ro-o:s.hi+Ro-o);else if(Math.abs(e-r)<s.halfX+Fh){const l=t.x-r;Math.abs(l)>=s.halfX?h=r+Math.sign(l)*(s.halfX+Fh)-e:a.kind==="spike"?u=Math.max(0,s.hi+Hh-o):a.kind==="overhang"&&(u=Math.min(0,s.lo-Ro-o))}u>0?Pn.v=Math.max(Pn.v,u*i):u<0&&(Pn.v=Math.min(Pn.v,u*i)),Math.abs(h*i)>Math.abs(Pn.x)&&(Pn.x=h*i)}return Pn}function Mk(t,n,e){const o=Math.sin(e),a=Math.cos(e);return Math.max(lt(t,n),lt(t+4*o,n+4*a),lt(t+8*o,n+8*a))}const kk={back:4,up:10,fov:70,look:18,lookDown:30},Sk={back:3,up:2.5,fov:66,look:1.5,lookDown:1.5},Tk=-8.5;function Ak(t){if(t.mode!=="run")return{top:0,side:0,level:0,rise:0};const n=Z(t.z),e=G.plungeLevel?.(n)??0,o=Math.min(1,Math.max(0,(-vn(t.z+40)-.25)/.4));return{top:G.plungeTop?.(n)??0,side:G.plungeSide?.(n)??0,level:e,rise:e*o*o*(3-2*o)}}const Nk={back:5,up:6,fov:64,look:40,lookDown:4},zk=.4;function Ck(t,n,e){return t>0?t*zk*Math.max(0,Y(n)-Y(e)):0}const kn={bankShare:0,bankCap:0,slideRoll:0,rollRate:0,trick:0,rollCap:0,shake:0,diveFov:0,boostFov:0};function Ek(t){const n=t.mode==="run"?Es(ur(t.z,t.diff),46,64):0,e=(o,a)=>o+(a-o)*n;return kn.bankShare=e(.45,.25),kn.bankCap=e(.3,.16),kn.slideRoll=e(.0022,9e-4),kn.rollRate=e(3,1.8),kn.trick=e(1,.4),kn.rollCap=e(.6,.35),kn.shake=e(1,.5),kn.diveFov=e(4,1.5),kn.boostFov=9*dr(t),kn}function Es(t,n,e){const o=Math.min(1,Math.max(0,(t-n)/(e-n)));return o*o*(3-2*o)}function Lk(t,n,e,o){const a=vn(t.z),s=Math.atan(Math.max(0,a));return{k:(G.climbFrame??0)*o*Es(a,.25,.7),cam:-n*Math.tan(.33*s),look:e*Math.tan(.55*s)}}const _k={back:7.5,up:2.6+(G.chaseTilt?.up??0),fov:58,look:34,lookDown:3.6+(G.chaseTilt?.lookDown??0)},Rk={back:11,up:4.5,fov:70,look:60,lookDown:5},Ik={back:6.5,up:2.2,fov:64,look:40,lookDown:4},$h={back:13,up:4.5,fov:62,look:60,lookDown:6};function Ge(t,n,e){const o=(a,s)=>a+(s-a)*e;return{back:o(t.back,n.back),up:o(t.up,n.up),fov:o(t.fov,n.fov),look:o(t.look,n.look),lookDown:o(t.lookDown,n.lookDown)}}class Pk{rig={...$h};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;sideK=0;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(n){this.camera=n,this.aspect=Number.isFinite(n.aspect)&&n.aspect>0?n.aspect:16/9}setAspect(n){Number.isFinite(n)&&n>0&&(this.aspect=n,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(n){this.shakeA=Math.max(this.shakeA,n)}update(n,e,o,a,s=!1){const c=Math.min(1,Math.max(0,(n.speed-42)/22)),i=n.mode==="run"?Nu(n.z):0,r=J=>s?1:1-Math.exp(-o*J),h=Ek(n),u=i>0?Math.max(.4,Math.min(2,Og(n.z,n.speed))):1;this.g+=(1+(u-1)*i-this.g)*r(3);const l=Math.max(0,this.g-1),f=Math.max(0,1-this.g),m=this.portrait();let d=n.mode==="ready"?$h:Ge(Ge(_k,Ik,Gg(n.z)),Rk,$g(n.z)*(1-.8*m));const g=Ak(n);this.sideK+=(g.side-this.sideK)*r(2),d=Ge(Ge(Ge(d,kk,g.top),Nk,g.rise),Sk,this.sideK),d={...d,fov:d.fov+10*c+.5*Math.max(0,n.surge)+.34*n.tailwind+(n.vert==="dive"?h.diveFov:0)+(n.thermalT>0?8:0)+h.boostFov-2.5*l+5*f+10*g.level,up:d.up-.8*l},n.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=Ge(this.rig,d,r(2.4)),this.mv+=(n.v-n.thermalV-n.windLift-this.mv)*r(9+5*m);const v=this.mv,p=n.low&&n.vert==="cruise";this.fv+=((p?1:n.vert==="dive"?.6+.2*m:.45)-this.fv)*r(p?3:10),this.fl+=((p?1:n.vert==="dive"?.9:.35)-this.fl)*r(p?3:10);const k=n.speed*vn(n.z),b=k>0?G.climbCam??0:0;this.lag+=(5*(1-.7*m)*(1-b)*(1-.8*g.level)*Math.tanh(-k/40)*i-this.lag)*r(3),this.x+=(n.x*(.55+.3*m)-this.x)*(s?1:1-Math.exp(-o*(6+4*m)));const w=1.6+20*(1-m);this.x=Math.min(n.x+w,Math.max(n.x-w,this.x));const y=n.mode==="run"?Math.max(-h.bankCap,Math.min(h.bankCap,h.bankShare*Au(n.z,n.speed))):0;this.roll+=(y-e*h.slideRoll-this.roll)*(s?1:1-Math.exp(-o*h.rollRate)),this.shakeA=Math.max(0,this.shakeA-o*2.5);const x=n.mode==="crash"||n.mode==="over",M=this.rig.back*(1-.12*m)-.3*m*Math.max(0,this.rig.back-7.5),z=n.z-M*(x?1.6:1);this.s=z;const C=this.camera,E=this.shakeA*h.shake,T=Math.max(0,Y(z)-Y(n.z))*.7*Math.max(m,g.level)-Math.max(0,Y(n.z)-Y(z))*(G.climbCam??0)*i,A=Lk(n,M,this.rig.look,i),S=this.rig.up+.6*m-T,L=S+A.k*(Y(n.z)-Y(z)+A.cam-S)+n.thermalV*.8+n.windLift*.85+v*this.fv+this.lag+(x?4:0),I=xk(n,z,this.x,L);this.clrX=Math.abs(I.x)>=Math.abs(this.clrX)?I.x:this.clrX+(I.x-this.clrX)*r(5),this.clrV=Math.abs(I.v)>=Math.abs(this.clrV)?I.v:this.clrV+(I.v-this.clrV)*r(5);const B=D(z,this.x+this.clrX+Tk*this.sideK,L+this.clrV,this.tmp);C.position.set(B.x+E*Math.sin(a*37.1),Math.max(B.y,Mk(B.x,B.z,At(z))+3)+E*Math.sin(a*41.3+2),B.z),this.crashK+=((x?1:0)-this.crashK)*r(4);const U=n.z+this.rig.look*(1-.75*this.crashK),W=.6*n.speed,Q=(Y(U+W)-Y(U)-vn(U)*W)*i,nt=Z(n.z),q=Math.tan(.14)*this.rig.look*Es(nt,G.edge-20,G.edge+80)*(1-Es(nt,G.pullOut-80,G.pullOut))*i*(1-g.level)-Ck(g.level,n.z,U),et=Q-this.rig.lookDown-q,ft=et+A.k*(Y(n.z)-Y(U)+A.look-et);D(U,n.x*(.4+.2*m+(.6-.2*m)*this.sideK),n.thermalV*.8+n.windLift*.85+v*this.fl+ft-jd(n)*this.crashK,this.tmp),C.up.set(0,1,0),C.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),C.rotateZ(Math.max(-h.rollCap,Math.min(h.rollCap,this.roll+this.trickRoll*h.trick))),this.applyLens()}applyLens(){const n=this.camera,e=this.aspect,o=this.portrait();let a=this.rig.fov,s=1;if(e<1){const i=Math.min(64+60*(1-o),this.rig.fov*(1-.15*o))*Math.PI/180;s=1+.1*o,a=Math.min(118,2*Math.atan(Math.tan(i/2)*s/e)*180/Math.PI)}const c=`${a.toFixed(2)}|${s.toFixed(3)}|${e.toFixed(4)}`;c!==this.lensKey&&(this.lensKey=c,this.viewScale=s,n.fov=a,s>1.001?n.setViewOffset(e,s,0,0,e,1):(n.clearViewOffset(),n.aspect=e,n.updateProjectionMatrix()))}}const Gh=globalThis.scheduler;function Ls(){return Gh?.yield?Gh.yield():new Promise(t=>{const n=new MessageChannel;n.port1.onmessage=()=>t(),n.port2.postMessage(0)})}const Bk=()=>new ht().setAttribute("position",new $(new Float32Array(3),3));function Zc(t,n,e,o,a){const s=t.getRenderTarget();t.setRenderTarget(a);try{return t.compileAsync(n,e,o)}finally{t.setRenderTarget(s)}}async function Hk(t){const{renderer:n,scene:e,camera:o}=t,a=[];let s=performance.now();const c=async()=>{performance.now()-s<12||(await Ls(),s=performance.now())};for(const u of[...e.children,...t.extras])u.isLight||(a.push(Zc(n,u,o,e,t.post.sceneTarget)),await c());const i=Bk();for(const u of t.post.quads){const l=new j(i,u.material);a.push(Zc(n,l,o,l,u.toScreen?null:t.post.sceneTarget))}let r=0;for(const u of a)u.then(()=>t.onProgress(++r/a.length*.8));await Promise.all(a);const h=n.info.programs??[];for(let u=0;u<h.length;u++)h[u].getUniforms(),h[u].getAttributes(),performance.now()-s>10&&t.onProgress(.8+.2*(u+1)/h.length),await c();t.onProgress(1)}function Fk(t,n,e,o,a){return Zc(t,n,o,e,a.sceneTarget).then(()=>{n.traverse(s=>{const c=s.material;for(const i of Array.isArray(c)?c:c?[c]:[])t.properties.get(i).currentProgram?.getUniforms()})})}const Oh=.18,Dh={world:.55,shaders:.45},Uh=.4,$k=6e3,Gk=.9,Ok=200,Dk=4e3,Xe=document.getElementById("boot"),Do=Xe?.querySelector(".bar i")??null,uc=Xe?.querySelector("p")??null,Qn={world:0,shaders:0};let Kh=0,Qc=0,mc=0,tf=0;function Uk(t){return Qn.shaders>=1?1:Uh*Qn.shaders+(1-Uh)*Gk*(1-Math.exp(-(t-Qc)/$k))}function Vh(){const t=performance.now();Qn.world>=1&&!mc&&(mc=t);const n=Qn.world<1?"Dựng núi đồi…":Qn.shaders>=1?"Sắp xong…":t-mc<Dk?"Chuẩn bị đồ hoạ…":"Chuẩn bị đồ hoạ — lần đầu hơi lâu…";uc&&uc.textContent!==n&&(uc.textContent=n);const e=Oh+(1-Oh)*(Qn.world*Dh.world+Uk(t)*Dh.shaders);!Do||e<=Kh||(Kh=e,Do.style.animation="none",Do.style.width=`${(e*100).toFixed(1)}%`,Xe?.setAttribute("aria-valuenow",String(Math.round(e*100))))}function qh(t,n){Qn[t]=Math.max(Qn[t],Math.min(1,n)),Qc||(Qc=performance.now(),tf=window.setInterval(Vh,Ok)),Vh()}function Kk(){window.clearInterval(tf),performance.mark("skyrun:ready"),Kf(),document.documentElement.dataset.boot="ready",Xe&&(Do&&(Do.style.width="100%"),Xe.classList.add("done"),setTimeout(()=>Xe.remove(),600))}const Vk=22;function qk(t){let n=!0;return{held:()=>n,shaders:e=>Hk({renderer:t.renderer,scene:t.scene,camera:t.camera,post:t.post.warmPlan(),extras:t.extras(),onProgress:e}),async world(e){try{for(;;){t.world.update(t.camera.position,!1,Vk);const{pending:o,wanted:a}=t.world.progress(t.camera.position);if(e(a?1-o/a:1),o===0)break;await Ls()}t.world.update(t.camera.position,!0)}finally{n=!1}}}}async function Wk(t,n,e){try{await Ls(),n(0,!0),await Ls();const o=t.bootShaders(a=>qh("shaders",a));await t.bootWorld(a=>qh("world",a)),performance.mark("skyrun:world"),n(0,!0),await o,performance.mark("skyrun:shaders")}catch(o){console.error("[sky-run] khoi dong theo lat hong — vao game luon",o)}e(),Kk()}const dc=new it;function Yk(t,n,e,o){let a=o;return{sunDir:()=>a,apply(s,c){wb(t,s,c),a=fb(o,s,c);const i=R(.55,1,s);n.position.set(a.x*1e3,Math.max(a.y,.35*i)*1e3,a.z*1e3),n.color.copy(Oi("sunLight",s,dc,c)),n.intensity=2.4*(1-.7*i),e.color.copy(Oi("skyAmbient",s,dc,c)),e.groundColor.copy(Oi("bounce",s,dc,c)),e.intensity=1.3*(1+.35*i)}}}const Ka={x:-.32,y:.1,z:1};function jk(t,n){const{renderer:e,scene:o,camera:a,sun:s,hemi:c}=IM(t,n.maxDpr);bb(o,Ka);const i=Yk(o,s,c,Ka),r=HM(Ka),h=wk(o,n.terrain),u=dv(n.foliage),l=Zv(n.ambient),f=Vb(),m=Tb(n.ambient),d={x:0,y:0,z:0},g={x:0,y:0,z:0},v=G.cloudDecks?C2(G.cloudDecks,n.name!=="high"):o2(n.name!=="high"),p=Dy(),k=Qy(),b=tb(),w=ob(),y=ub(),x=mM(),M=ww(n.ambient),z=Lx(n.ambient),C=vM();Uf(zM(C,n.name==="high",pt=>Fk(e,pt,o,a,q.warmPlan())));const E=xM(),T=YM(),A=_5(n.name==="low"),S=EM(),L=JM(),I=Ob(),B=Rb(),U=Pb(),W=OM(),Q=KM(),nt=Jb();o.add(r.mesh,u.group,l.group,f.mesh,p.group,k.group,b.group,w.mesh,y.group,v.mesh,m.mesh,z.group,x.group,M.group,C.root,T.points,S.mesh,L.object,I.mesh,B.group,U.mesh,W.mesh,W.star,W.shell,Q.stars,Q.chips,nt.points,A.mesh);const q=RM(e,o,a,Ka,n.post),et=new Pk(a),ft=qk({renderer:e,scene:o,camera:a,post:q,world:h,extras:()=>[...h.warmups(),...uM(),Oy()]});Wb(n.ambient>=1?12:n.ambient>=.7?9:6);const J=[new _,new _],Nt=[new _,new _],Ct=new _,Et=new yn,Rt={};let xn=null;return{renderer:e,scene:o,camera:a,post:q,cam:et,lanterns:M,flashes:W,impacts:Q,world:h,bootShaders:ft.shaders,bootWorld:ft.world,ghosts:B,trick:E.trick,pilot:C.root,present(pt,tt,Jt,uo,cn=!1){const{dusk:mt,morn:mo}=uo;pt.mode==="crash"||pt.mode==="over"?xn??=pt.z:xn=null;let K=pt;xn!==null&&pt.z>xn+.4&&(K=Object.assign(Rt,pt),K.z=xn+.4),i.apply(mt,mo),E.apply(C,K,tt,Jt),U.update(C.root.position,K.stunT/P.stunTime,tt,a),et.trickRoll=E.camRoll(),et.update(K,E.lateralSpeed(),Jt,tt,cn),r.update(a,tt,mt,mo),Jd.value=tt,ft.held()||h.update(a.position,cn),u.update(K.z,mt,a),l.update(K.z,mt),f.update(K.z),Yb(),nt.update(K,tt,mt,et.s),G.cloudDecks||m.update(K.z),v.update(a,tt,et.s,K),q.setVeil(v.veil(),Math.min(1,Math.max(0,(mt-.45)/.4))),j2(C.root.position.x,C.root.position.z,At(K.z),tt),D(K.z+1,K.x,K.v,d),D(K.z,K.x,K.v,g);const ti=K.mode==="run"?K.speed:0;d.x=(d.x-g.x)*ti,d.y=(d.y-g.y)*ti,d.z=(d.z-g.z)*ti,W.update(Jt,d),Q.update(Jt,d);const yf=K.mode==="run"&&K.hp===1?.14+.08*Math.sin(tt*5.5):0;q.setDanger(Math.max(Q.danger(),yf,K.mode==="crash"?.55:K.mode==="over"?.25:0)),x.update(K,tt,mt),p.update(K.z),k.update(et.s,tt,mt),b.update(K.z,tt),w.update(et.s),z.update(et.s,tt,mt),y.update(K.z),M.update(K,tt,Jt,mt,et.s),jb(Math.min(1,Math.max(0,(mt-.45)/.4))),I.update(K,tt,et.s),C.root.updateMatrixWorld(),C.feet.forEach((oi,ai)=>oi.getWorldPosition(J[ai])),T.update(J,Jt,K.mode==="run"||K.mode==="ready",a.position),C.ankles.forEach((oi,ai)=>oi.getWorldPosition(Nt[ai])),A.update(K,Nt,tt,Jt,a.position);const bf=K.mode==="run"||K.mode==="ready";S.update(C.tips,tt,bf,Math.min(1,Math.max(0,(K.speed-40)/26)+(K.vert==="dive"?.4:0)),a.position);const Xr=K.stunT/P.stunTime;Xd.value=Math.max(Xr*Xr*(.6+.4*Math.sin(tt*28)),K.mode==="run"&&K.hp===1?.18+.12*Math.sin(tt*5.5):0);const Zr=At(K.z);Ct.set(Math.sin(Zr),vn(K.z),Math.cos(Zr)).normalize().multiplyScalar(K.speed);const ni=Math.min(1,Math.max(0,(K.speed-40)/26)),Qr=K.mode==="run"?G.dropFx?.(Z(K.z))??0:0,ei=K.mode==="run"?Math.max(0,K.surge)/12+K.tailwind/16+1.2*Qr:0,wf=1-.45*Math.min(1,Math.max(0,(mt-.5)/.4));return L.update(a,Ct,K.mode==="run"?wf*(.1+.4*ni+.55*ei+(K.thermalT>0?.35:0)+.5*Math.min(1,K.boostT/P.boostFade)):0),q.setSpeed(K.mode==="run"?.05*ni+.16*ei+(K.vert==="dive"?.04:0)+(K.thermalT>0?.1:0)+.1*Math.min(1,K.boostT/P.boostFade):0,Qr),q.setSun(i.sunDir(),1-Math.min(1,mt*1.6)),M.setViewport(e.getDrawingBufferSize(Et).y*et.viewScale,a.fov),B.setViewport(Et.y*et.viewScale,a.fov),nt.setViewport(Et.y*et.viewScale,a.fov),Math.min(1.4,ni+.5*ei)},resize(pt,tt){e.setSize(pt,tt),q.setSize(pt,tt),et.setAspect(pt/tt)}}}function Xk(){const t={z:0,x:0,v:0,thermalV:0,windLift:0},n={};return{capture(e){t.z=e.z,t.x=e.x,t.v=e.v,t.thermalV=e.thermalV,t.windLift=e.windLift},view(e,o){if(o>=1)return e;const a=(s,c)=>s+(c-s)*o;return Object.assign(n,e),n.z=a(t.z,e.z),n.x=a(t.x,e.x),n.v=a(t.v,e.v),n.thermalV=a(t.thermalV,e.thermalV),n.windLift=a(t.windLift,e.windLift),n}}}const nf=`skyrun.tut.${Bt}`,Zk=2e3,Qk=.7,Jk=.45,t4=.3,n4=.15;function e4(){try{return new Set(JSON.parse(localStorage.getItem(nf)??"[]"))}catch{return new Set}}function o4(t){const n=t.obstacles.filter(l=>!l.passed&&l.z-t.z>-Wt[l.kind].halfZ);if(!n.length)return null;const e=n.reduce((l,f)=>f.z<l.z?f:l),o=n.filter(l=>l.row===e.row),a=e.kind;if(t.thermalV>8&&a!=="pillar")return null;if(o.some(l=>l.kind==="bridge"))return t.vert==="dive"||t.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(o.some(l=>l.kind==="ridge"))return t.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const s=new Set(o.map(l=>l.lane));if(!s.has(t.lane))return null;const c=o.filter(l=>l.lane===t.lane),i=c.every(l=>l.kind==="spike");if(i&&t.vert==="flare")return null;const r=c.every(l=>l.kind==="overhang");if(r&&(t.vert==="dive"||t.low))return null;const h=[];return[-1,0,1].some(l=>l<t.lane&&!s.has(l))&&h.push("left"),[-1,0,1].some(l=>l>t.lane&&!s.has(l))&&h.push("right"),i&&h.push("up"),r&&h.push("down"),{lesson:h.length===1&&i?"up":h.length===1&&r?"down":"lane",kind:c[0].kind,accept:h,row:e.row,z:e.z}}const Wh={left:"←",right:"→",up:"↑",down:"↓"};function a4(t,n){const e=n?new Set:e4(),o=matchMedia("(pointer: coarse)").matches,a=document.createElement("div");a.className=o?"tut touch":"tut",t.appendChild(a);let s=null,c=1;const i=(h,u)=>{const l=h.accept.filter(k=>h.lesson!=="lane"||k!=="up"&&k!=="down"),f=ne(h.z),m=h.kind==="bridge"?f?"chui qua cổng làng":Vs(h.z)?"chui dưới cabin":"chui dưới cầu":h.kind==="overhang"?"chui dưới mái đá":h.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":h.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",d=l.length===1?l[0]==="left"?"sang trái":"sang phải":"sang trái / phải",g=h.lesson==="lane"?`ngón ${d}`:h.lesson==="up"?"lên":"xuống",v=o?`${h.lesson==="lane"?"Kéo":"Vuốt"} ${g} để ${m}`:`Bấm ${l.map(k=>Wh[k]).join(" / ")} để ${m}`,p=h.lesson==="lane"?O.dragSide:h.lesson==="up"?O.swipeUp:O.swipeDown;a.classList.toggle("flip",u>0),a.innerHTML=`<div class="tut-text">${o?p:""}<span>${v}</span></div><div class="tut-arrows">${l.map(k=>`<span class="tut-arrow ${k}">${Wh[k]}</span>`).join("")}</div>`,a.classList.add("on")},r=h=>{e.add(h);try{localStorage.setItem(nf,JSON.stringify([...e]))}catch{}};return{frozen:()=>s!==null&&c===0,update(h,u){if(h.mode!=="run"||e.size===3)return s=null,a.classList.remove("on"),c=1,1;const l=o4(h);if(s&&(!l||l.row!==s.row)&&(r(s.lesson),s=null,a.classList.remove("on")),!s&&l&&!e.has(l.lesson)&&h.z<Zk){const d=(h.obstacles.find(g=>g.row===l.row).z-h.z)/h.speed;d<=Qk&&d>=Jk&&(s=l,i(l,h.lane))}else s&&l&&(s=l);const f=s!==null&&h.buffered!==null&&s.accept.includes(h.buffered);return c=s&&!f?Math.max(0,c-u/t4):Math.min(1,c+u/n4),c},offer(h){const u=s?h.find(l=>s.accept.includes(l)):void 0;return u?(c=.4,u):null}}}const Jc=`skyrun.progress.s${Qe}`,tr="skyrun.meters",nr="skyrun.runBest",ef="skyrun.played",of="skyrun.unlockSeen",Yh=Qe,er=t=>Math.floor(t).toLocaleString("vi-VN"),Va=t=>(Math.floor(t/100)/10).toLocaleString("vi-VN"),af=new Map;function Kr(t,n){try{return JSON.parse(af.get(t)??localStorage.getItem(t)??n)}catch{return JSON.parse(n)}}function Vr(t,n){const e=JSON.stringify(n);af.set(t,e);try{localStorage.setItem(t,e)}catch{}}function Ze(t){const n=Kr(t,"{}");return n&&typeof n=="object"?n:{}}const fc=(t,n)=>Vr(t,n),s4=t=>Ze(Jc)[t]??0,sf=t=>Ze(tr)[t]??0,i4=t=>Ze(nr)[t]??0;function qr(t){const n=[];return t.run!==void 0&&n.push({label:"Bay một ván",met:`Bay một ván ${Va(t.run)} km`,have:i4(t.from),need:t.run,fmt:e=>`${Va(e)} km`}),t.score!==void 0&&n.push({label:`Điểm mùa ${Yh}`,met:`${er(t.score)} điểm mùa ${Yh}`,have:s4(t.from),need:t.score,fmt:er}),t.meters!==void 0&&n.push({label:"Tổng quãng bay",met:`${Va(t.meters)} km tổng quãng bay`,have:sf(t.from),need:t.meters,fmt:e=>`${Va(e)} km`}),n}const c4=t=>!!t.unlock&&qr(t.unlock).some(n=>n.have>=n.need);function r4(){const t=Kr(ef,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n in Yt):[]}function l4(){const t=Kr(of,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}function cf(t){const n=l4();t.some(e=>!n.includes(e))&&Vr(of,[...new Set([...n,...t])])}function Wr(t){cf(t.filter(e=>Yt[e].unlock&&!c4(Yt[e])));const n=r4();t.some(e=>!n.includes(e))&&Vr(ef,[...new Set([...n,...t])])}function h4(){try{const t=localStorage,n=Object.keys(Yt).filter(e=>sf(e)>0||t.getItem(`skyrun.best.${e}`));Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")&&n.push("khau-pha"),Wr(n)}catch{}}h4();function Js(t){return!!t.listed}const u4=()=>Object.values(Yt).filter(t=>!Js(t));function rf(t){const n=u4(),e=Ze(Jc),o=Ze(tr),a=Ze(nr);return t(e,o,a),fc(Jc,e),fc(tr,o),fc(nr,a),n.filter(s=>Js(s))}const Uo=(t,n,e)=>{Number.isFinite(e)&&e>(t[n]??0)&&(t[n]=Math.floor(e))},m4=(t,n,e)=>(Number.isFinite(e)&&e>0&&Wr([t]),rf((o,a,s)=>{Uo(o,t,n),Uo(s,t,e),Number.isFinite(e)&&e>0&&(a[t]=Math.floor((a[t]??0)+e))}));function jh(t){return Wr(Object.keys(Yt).filter(n=>(t.meters[n]??0)>0)),rf((n,e,o)=>{for(const a of Object.keys(Yt))typeof t.score[a]=="number"&&Uo(n,a,t.score[a]),typeof t.meters[a]=="number"&&Uo(e,a,t.meters[a]),typeof t.run?.[a]=="number"&&Uo(o,a,t.run[a])})}function Xh(){return[]}function d4(t){cf([t])}const f4=16e5,g4=2e4;function p4(t){const n=Hs(t)[0]?.file,e=Tu(t),o=e.zoneNames?Uu.filter(a=>Object.values(e.zoneLines??{}).includes(a)):Ku;return[...n?[n]:[],...o.map(Vu)]}const _s=new Map,Rs=new Set;function v4(t){Rs.add(t)}const lf=t=>_s.get(t)?.p??null,y4=()=>[..._s.values()].map(t=>t.p).find(t=>!t.done)??null;async function b4(t,n,e){try{const o=await fetch(t,{priority:"low"});n(Number(o.headers.get("content-length"))||0);const a=o.body?.getReader();if(!o.ok||!a)return;for(;;){const{done:s,value:c}=await a.read();if(s)return;e(c.byteLength)}}catch{n(0)}}function hf(t){const n=_s.get(t);if(n)return n.done;const e=p4(t),o=e.map((i,r)=>r===0&&Hs(t)[0]?f4:g4);let a=0;const s={p:{frac:0,done:!1},done:Promise.resolve()},c=(i=!1)=>{const r=o.reduce((h,u)=>h+u,0);s.p={frac:i?1:Math.max(s.p.frac,Math.min(.99,a/r)),done:i};for(const h of Rs)h(t,s.p)};return s.done=Promise.all(e.map((i,r)=>b4(i,h=>{h>0&&(o[r]=h),c()},h=>{a+=h,c()}))).then(()=>c(!0)),_s.set(t,s),c(),s.done}function w4(t,n=12e3){let e=0,o=()=>{};const a=s=>{s===t&&(clearTimeout(e),e=window.setTimeout(o,n))};return new Promise(s=>{o=s,Rs.add(a),a(t),hf(t).then(s)}).finally(()=>{clearTimeout(e),Rs.delete(a)})}function Zh(){navigator.connection?.saveData||Promise.all([hr,mu()]).then(async()=>{for(const t of Object.values(Yt))t.id!==Bt&&Js(t)&&await hf(t.id)})}const Yr=t=>t.frac,jr=t=>`Đang tải ${Math.floor(t.frac*100)}%`;function x4(t){const n=lf(t);return!n||n.done?"":`<span class="pc-pack" data-pack="${t}" style="--f:${Yr(n).toFixed(3)}"><i></i><small>${jr(n)}</small></span>`}function M4(t,n,e){const o=t.querySelector(`.pc-pack[data-pack="${n}"]`);o&&e.done?o.remove():o&&(o.style.setProperty("--f",Yr(e).toFixed(3)),o.querySelector("small").textContent=jr(e)),uf(t)}function uf(t){const n=y4();for(const e of t.querySelectorAll("[data-lobby]"))e.classList.toggle("packing",!!n),n&&e.style.setProperty("--pack",Yr(n).toFixed(3))}const Qh=t=>{const n=lf(t);return n?jr(n):"Đang tải…"},mf={1:"Dễ",2:"Trung bình",3:"Hơi khó",4:"Khó"},$n={"mu-cang-chai":{difficulty:1,newbie:!0,moments:[{icon:"terrace",text:"Ruộng bậc thang",at:"valley"},{icon:"river",text:"Theo suối Nậm Kim",at:"river"},{icon:"thermal",text:"Vòng đồi Mâm Xôi",at:"climb"}]},"khau-pha":{difficulty:2,moments:[{icon:"gorge",text:"Khe đá uốn lượn",at:"gorge"},{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"house",text:"Làng mái ngói",at:"valley"}]},"ha-giang":{difficulty:3,moments:[{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"river",text:"Sát mặt sông",at:"river"},{icon:"cave",text:"Chui hang",at:"cave"},{icon:"thermal",text:"Leo cột gió",at:"climb"}]},fansipan:{difficulty:4,moments:[{icon:"dive",text:"Rơi {dive} m",at:"drop"},{icon:"cloud",text:"Xuyên tầng mây",at:"gorge"},{icon:"river",text:"Suối trong mưa",at:"river"},{icon:"sun",text:"Trên biển mây",at:"valley"}]}},k4={},S4=Object.keys($n).sort((t,n)=>$n[t].difficulty-$n[n].difficulty);function gc(t){const n=Yt[t];return n.listed?n:null}const Io=120,T4=340,Jh=18,A4=84,tu=new Map;function df(t){const n=tu.get(t);if(n)return n;const{cycle:e,offset:o}=Yt[t],a=Tu(t),s=[],c=new Map,i=new Set;let r=0;for(let m=0;m<=Io;m++)r=Math.min(r,a.dive((o+m/Io*e)%e));let h=0,u=[];for(let m=0;m<=Io;m++){const d=(o+m/Io*e)%e,g=a.dive(d)-r;h=Math.max(h,g),s.push([m/Io*100,Jh+(A4-Jh)*Math.min(1,g/T4)]);const v=[a.zone(d,!1),...a.drop(d)>.5?["drop"]:[]];for(const p of v){if(i.has(p))continue;const k=c.get(p);k?k[1]=m:c.set(p,[m,m])}for(const p of u)!v.includes(p)&&c.has(p)&&i.add(p);u=v}const l=new Map;for(const[m,[d,g]]of c)l.set(m,s[Math.round((d+g)/2)]);const f={pts:s,dive:Math.round(h/10)*10,anchors:l};return tu.set(t,f),f}const ff=t=>mf[$n[t].difficulty];function gf(t){const n=$n[t].difficulty;return`<span class="pc-diff lv${n}"><span class="pc-pips">${"<i></i>".repeat(4)}</span>${mf[n]}</span>`}const pf=t=>$n[t].newbie?`<span class="pc-badge newbie">${O.star}Hợp người mới</span>`:"";function N4(t){const n=df(t),e=n.pts.map(([a,s],c)=>`${c?"L":"M"}${a.toFixed(1)} ${s.toFixed(1)}`).join(""),o=$n[t].moments.map(a=>{const s=a.at&&n.anchors.get(a.at);return s?`<span class="pc-mark" style="left:${s[0].toFixed(1)}%;top:${s[1].toFixed(1)}%">${O[a.icon]}</span>`:""}).join("");return`<span class="pc-flight" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="area" d="${e}L100 100L0 100Z"/><path class="glow" d="${e}"/><path class="line" d="${e}"/></svg>${o}</span>`}function vf(t){const n=$n[t].moments.some(e=>e.text.includes("{dive}"))?df(t).dive:0;return`<span class="pc-moments">${$n[t].moments.map(e=>`<span>${O[e.icon]}${e.text.replace("{dive}",n.toLocaleString("vi-VN"))}</span>`).join("")}</span>`}const or=21,nu=2*Math.PI*or;function z4(t,n,e,o){const a=Math.min(n,e),s=e>0?a/e:1;return`<span class="pc-ring${s>=1?" done":""}"><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="bg" cx="25" cy="25" r="${or}"/><circle class="arc" cx="25" cy="25" r="${or}" stroke-dasharray="${nu.toFixed(1)}" stroke-dashoffset="${(nu*(1-s)).toFixed(1)}"/></svg><b>${Math.floor(s*100)}%</b><small>${t}<br>${o(a)} / ${o(e)}</small></span>`}function C4(t,n){const e=n==="locked"?null:Lr(t.id),o=n==="current"?`<span class="pc-badge">${O.wingsuit}Đang bay</span>`:n==="fresh"?`<span class="pc-badge fresh">${O.star}Mới mở!</span>`:pf(t.id),a=n==="locked"?t.unlock:null,s=a?qr(a):[],c=s.length===1?`${s[0].met} ở ${Yt[a.from].name} để mở`:`Mở khi đạt 1 trong ${s.length} ở ${a?Yt[a.from].name:""}`,i=a?`<span class="pc-goals"><span class="pc-goal-head">${c}</span><span class="pc-rings">`+s.map(r=>z4(r.label,r.have,r.need,r.fmt)).join('<i class="pc-or">hoặc</i>')+"</span></span>":"";return`<button type="button" class="postcard ${n} map-${t.region}" data-map="${t.id}" aria-label="${t.name}, độ khó ${ff(t.id)}" title="${t.tagline}">
    <span class="pc-art" style="background-image:url(ui/map-${t.id}.webp)">${N4(t.id)}${n==="locked"?`<span class="pc-lock">${O.lock}</span>`:""}${gf(t.id)}</span>
    <span class="pc-body">${o}<b class="pc-name">${t.name}</b>${vf(t.id)}
      ${e&&e.m>0?`<span class="ui-chip gold pc-best">${O.trophy}<span>Kỷ lục ${er(e.m)} m</span></span>`:""}${i}${n==="locked"?"":x4(t.id)}</span>
  </button>`}function E4(t){const{name:n,tagline:e}=k4[t]??{name:t,tagline:""};return`<div class="postcard soon" data-soon="${t}" role="button" aria-disabled="true" tabindex="-1" aria-label="${n}, độ khó ${ff(t)}, sắp có" title="${e}">
    <span class="pc-art ink">${O.mountain}<span class="ui-stamp">Sắp có</span>${gf(t)}</span>
    <span class="pc-body">${pf(t)}<b class="pc-name">${n}</b>${vf(t)}</span>
  </div>`}const L4=[[12,.1,30],[26,.7,22],[72,.3,34],[86,.9,24],[50,1.3,20]];function _4(t,n,e){d4(n.id);const o=n.unlock,a=o?qr(o).find(u=>u.have>=u.need)?.met??"":"",s=document.createElement("div");s.className="unlock-pop",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`Đã mở khoá ${n.name}`),s.innerHTML=`<div class="unlock-sky" aria-hidden="true">${L4.map(([u,l,f])=>`<i style="left:${u}%;animation-delay:${l}s;width:${f}px;height:${f}px">${O.lantern}</i>`).join("")}</div>
    <div class="unlock-card ui-paper map-${n.region}">
      <div class="unlock-art" style="background-image:url(ui/map-${n.id}.webp)"><span class="ui-stamp unlock-stamp">Mở khoá</span></div>
      <div class="unlock-kicker">${O.star}Map mới!</div>
      <h2 class="unlock-name">${n.name}</h2>
      <p class="unlock-sub">${n.tagline}</p>
      ${a?`<span class="ui-chip unlock-goal">${O.check}${a} ở ${Yt[o.from].name}</span>`:""}
      <div class="unlock-actions">
        <button type="button" class="ui-btn-lacquer" data-go>${O.check}Chọn ${n.name}</button>
        <button type="button" class="ui-btn-cloth" data-later>Để sau</button>
      </div>
    </div>`,Zt(s);const c=s.querySelector("[data-go]"),i=s.querySelector("[data-later]"),r=()=>s.remove();s.addEventListener("click",u=>{u.stopPropagation();const l=u.target instanceof Element?u.target:null;l?.closest("[data-go]")?(r(),e(n)):(l===s||l?.closest("[data-later]"))&&r()});const h=u=>{if(!s.isConnected)return void window.removeEventListener("keydown",h,!0);if(u.key==="Escape")i.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===i?i:c).click();else return;u.stopPropagation(),u.preventDefault()};window.addEventListener("keydown",h,!0),t.appendChild(s)}const R4=".unlock-pop, .board-panel:not([hidden]), .settings-panel:not([hidden]), .help-panel:not([hidden])";function I4(t){try{localStorage.setItem(vc,t.id)}catch{}const n=new URLSearchParams(location.search);n.set("map",t.id),history.replaceState(history.state,"",`${location.pathname}?${n.toString()}${location.hash}`),location.reload()}function P4(t,n){const e=document.createElement("div");e.className="lobby-panel",e.hidden=!0,e.innerHTML=`<div class="lobby-card ui-indigo ui-trim" role="dialog" aria-label="Sảnh chọn map">
      <div class="panel-head">${O.mountain}<b>Chọn map</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="lobby-scroll"><div class="lobby-track" data-track></div><div class="lobby-dots" data-dots></div></div>
      <button type="button" class="ui-btn-lacquer lobby-go" data-go></button>
    </div>`,t.appendChild(e),Zt(e);const o=e.querySelector("[data-track]"),a=e.querySelector("[data-dots]"),s=e.querySelector("[data-go]");let c=[],i,r=Bt,h=0,u=null;const l=y=>y.id===Bt?"current":Js(y)?c.includes(y)?"fresh":"open":"locked",f=()=>[...o.querySelectorAll(".postcard")],m=()=>{f().forEach((z,C)=>{const E=(z.dataset.map??z.dataset.soon)===r;z.classList.toggle("selected",E),a.children[C]?.classList.toggle("on",E)});const x=r===Bt?gt:gc(r),M=x?l(x):"soon";s.disabled=M==="locked"||M==="soon"||!!u,s.innerHTML=u?Qh(u.id):M==="locked"?`${O.lock}Chưa mở khoá`:M==="soon"?"Sắp có":`${O.check}Chọn ${x.name}`},d=(y,x)=>{o.scrollTo({left:y.offsetLeft-(o.clientWidth-y.offsetWidth)/2,behavior:x?"smooth":"auto"})},g=()=>{o.innerHTML=S4.map(y=>{const x=gc(y);return x?C4(x,l(x)):E4(y)}).join(""),a.innerHTML=f().map(()=>"<i></i>").join(""),m()},v=()=>{const y=r===Bt?gt:gc(r);!y||s.disabled||(y.id===Bt?k():p(y))},p=y=>{u||(u=y,m(),w4(y.id).then(()=>{u===y&&!e.hidden&&I4(y)}))};v4((y,x)=>{M4(t,y,x),u?.id===y&&!x.done&&(s.innerHTML=Qh(y))}),Zh();const k=()=>{e.hidden=!0,u&&(u=null,m())};e.addEventListener("click",y=>{const x=y.target instanceof Element?y.target:null;if(x===e||x?.closest("[data-close]"))return k();if(x?.closest("[data-go]"))return v();const M=x?.closest(".postcard");if(!M)return;const z=M.dataset.map??M.dataset.soon;if(z===r)return v();r=z,m(),d(M,!0)}),o.addEventListener("scroll",()=>{clearTimeout(h),h=window.setTimeout(()=>{const y=o.scrollLeft+o.clientWidth/2,x=f().reduce((z,C)=>Math.abs(C.offsetLeft+C.offsetWidth/2-y)<Math.abs(z.offsetLeft+z.offsetWidth/2-y)?C:z),M=x.dataset.map??x.dataset.soon;M!==r&&o.scrollWidth>o.clientWidth+4&&(r=M,m())},140)},{passive:!0}),window.addEventListener("keydown",y=>{y.code==="Escape"&&!e.hidden&&k()}),window.addEventListener("keydown",y=>{e.hidden||y.code!=="Space"&&y.code!=="Enter"||t.querySelector(R4)||(y.stopImmediatePropagation(),y.preventDefault(),v())},!0);const b=()=>{const y=Xh().length>0||c.length>0;for(const x of t.querySelectorAll("[data-lobby]"))x.classList.toggle("has-news",y);uf(t)},w=(y=[])=>{y.length&&(c=[...new Set([...c,...y])],Zh()),e.hidden||g(),b()};return{open(){const y=Xh()[0];r=c[0]?.id??y?.id??Bt,g(),e.hidden=!1;const x=f().find(M=>M.dataset.map===r);x&&requestAnimationFrame(()=>d(x,!1)),y&&!t.querySelector(".unlock-pop")&&_4(t,y,p),c=[],b(),n?.().then(M=>M.length&&w(M))},setScreen(y){y!==i&&(i=y,y?b():k())},refresh:w}}function B4(){let t=null;return n=>{if(!G.zoneNames||n.mode!=="run")return t=null,null;const e=n.z+n.speed*1.5,o=G.zone(Z(e),ne(e));return o===t?null:(t=o,G.zoneNames[o]?o:null)}}const Yn=1/60;function H4(t){const n=new URLSearchParams(location.search),e=K5(n),o=jk(t,e),{renderer:a,post:s}=o,c=b5(),i=e3(t),r=R5(t,o.cam,o.lanterns,c,i,o.flashes,o.impacts,o.camera),h=l3(t,()=>p.mode==="run"&&!L.paused(),()=>p.steerX),u=X5(Number(n.get("seed")??0));let l=u();const f=fp(n);let m=n.get("auto")==="1",d=m||n.has("z");const g=B4(),v=n.has("alt");let p=mi(l.seed,v);p.z=Number(n.get("z")??0);let k=0,b=null;const w=Xk();w.capture(p);const y=a4(t,n.get("tut")==="1"),x=(q,et=!1,ft=1)=>{const J=f.at(p.z),Nt=w.view(p,ft),Ct=o.present(Nt,k-Yn*(1-ft),q,J,et);A.present(p,Nt,ft,q),i.update(p,J),i.setPilotBox(p.mode==="run"?Cl(o.pilot,o.camera,t):null),c.update(Ct,p.mode==="run",J);const Et=g(p);Et&&(i.zone(Et),c.zone(Et));const Rt=C.visible();E.setScreen(Rt),T.setScreen(Rt)},M=()=>{nt===null||p.mode==="run"||p.mode==="crash"||t.querySelector(".unlock-pop")||(p.mode==="over"&&(l=u()),p=mi(l.seed,v),d=m||n.has("z"),p.z=Number(n.get("z")??0),w.capture(p),x(0,!0),F1(p),A.runStart(p,l.route),b=null,c.runStart(),C.hide(),i.setVisible(!0))},z=()=>{l=u(),p=mi(l.seed,v),p.z=Number(n.get("z")??0),d=m||n.has("z"),b=null,w.capture(p),x(0,!0),C.showTitle(),i.setVisible(!1)},C=Cy(t,M,()=>{C.visible()==="over"&&z(),E.open()}),E=P4(t,async()=>{const q=await A.progress();return q?jh(q):[]}),T=x5(t),A=ry({root:t,params:n,hud:i,screens:C,view:o.ghosts,camera:o.camera,route:l.route,quality:()=>({tier:e.name,scale:nt?.scale??1}),rv:v?2:gt.logRvBase+td});A.progress().then(q=>q&&E.refresh(jh(q)));const S=ly(t,c),L=uy(t,S.el,{touch:matchMedia("(pointer: coarse)").matches,onHome:()=>(A.runAbandon(p),z(),E.open())});_y(t,S,c,o.ghosts,L),h.onAction(q=>{L.paused()?L.resume():C.visible()&&C.tapReady()?M():q==="Space"&&L.pause()}),h.onKey("KeyM",()=>S.toggle("sfx")),h.onKey("KeyN",()=>S.toggle("music")),h.onKey("KeyH",()=>i.setVisible(t.querySelector(".hud.hidden")!==null)),h.onTrick(o.trick),C.showTitle(),i.setVisible(!1);const I=q=>{w.capture(p),G1(p,m?ig(p):q,h.holdDown(),Yn,m?null:h.steer()),A.afterStep(p,m),r.handle(p.events,p);for(const et of p.events)et.type==="crash"&&(b=et.kind);k+=Yn,p.mode==="over"&&!C.visible()&&(!d&&!p.alt&&E.refresh(m4(gt.id,we(p),p.z)),c.over(C.showOver(p,b,!d&&!p.alt),p.z),A.runOver(p,b),i.setVisible(!1))};let B=0;const U=q=>{L.setRunning(p.mode==="run",p.mode==="crash");const et=(p.mode==="crash"&&p.crashT<.9?.35:1)*L.factor(q)*(m?1:y.update(p,q));if(y.frozen()&&!L.paused()){const ft=h.take(),J=h.steer(),Nt=J===null?p.lane:Hu(p.lane,J),Ct=y.offer(Nt!==p.lane?[...ft,Nt<p.lane?"left":"right"]:ft);Ct&&I(ft.includes(Ct)?[Ct]:[])}for(B+=q*et;B>=Yn;)I(h.take()),B-=Yn;x(q*et,!1,B/Yn)},W=()=>o.resize(t.clientWidth,t.clientHeight);window.addEventListener("resize",W),W();const Q=()=>S5(a,s,{state:()=>p,advance(q){for(let et=0;et<q/Yn;et++)I(h.take()),x(Yn)},play(q,et=60){for(let ft=0;ft<q*et;ft++)U(1/et)},autopilot(q){m=q,q&&(d=!0)},jump(q){d=!0,p.z=q,p.nextChunkZ=q+200,p.obstacles=[],p.pickups=[],w.capture(p),x(0,!0)},dusk:f.forceDusk,clock:f.forceU,render:()=>{x(0),s.render()},pilotBox:()=>Cl(o.pilot,o.camera,t),hurt(){p.mode!=="run"||p.hp<=1||(p.hp--,r.handle([{type:"hurt",hp:p.hp,kind:"pillar"}],p))}},o);let nt=null;Wk(o,x,()=>{nt=W5({renderer:a,post:s,tier:e,resize:W,tick:U,stats:n.has("stats")?q=>i.setStats(q):null,worldLine:()=>o.world.statsLine()}),window.__skyrunQuality={tier:e,governor:nt},Q()})}up(gt.region);document.title=`Sky Run · ${Qu[gt.region]}`;H4(document.getElementById("app"));qf();
