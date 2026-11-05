import{B as ht,a as G,M as j,P as En,V as _,S as St,D as Nt,F as cu,U as Ln,b as _n,c as yn,d as ss,I as Nf,e as cr,f as is,g as Cf,C as aa,L as ru,h as lu,G as yt,i as rt,j as Rn,k as F,m as Tt,l as Ps,n as ie,o as ce,p as cs,q as hu,r as _t,s as uu,Q as kt,t as it,u as qt,v as vt,w as rr,x as mu,T as lr,y as hr,A as sn,z as qe,E as bc,H as ur,J as zf,K as da,N as du,O as fu,R as Ef,W as gu,X as Lf,Y as _f,Z as Rf,_ as pu,$ as io,a0 as If,a1 as Pf,a2 as Bf,a3 as Hf,a4 as o0,a5 as Ff,a6 as a0,a7 as Gf,a8 as s0,a9 as $f,aa as Of,ab as Df,ac as Uf,ad as Kf,ae as Vf,af as qf,ag as Wf}from"./three-C4iCFrFA.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const Yf=6e3,mr=[];function jf(t){return mr.push(t),t}const dr=new Promise(t=>{const n=()=>{Promise.allSettled(mr).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>t(),{timeout:1500}):setTimeout(t,100)})};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0}),setTimeout(t,Yf)}),vu=()=>Promise.allSettled(mr).then(()=>{});let yu=()=>{};const bu=new Promise(t=>yu=t),Xf=()=>yu(),Zf=t=>fetch(t,{priority:"low"}).then(n=>n.ok?n.arrayBuffer():null).catch(()=>null);function Qf(){const t=window.SR_SW,n=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!t||!n||!("serviceWorker"in navigator)||dr.then(()=>navigator.serviceWorker.register(t).catch(e=>console.warn("[skyrun] sw",e)))}const i0=400,rs=t=>Math.max(0,Math.min(1,t));function co(t,n){const e=t<=n.hardAt?n.d0+(1-n.d0)*rs((t-i0)/(n.hardAt-i0)):1+.15*rs((t-n.hardAt)/3e3);return n.cap===void 0?e:Math.min(e,n.cap)}const Jf=[0,.12,.3,.5,.75];function tg(t){let n=0;return Jf.forEach((e,o)=>{t>=e&&(n=o)}),n}function ng(t){return Math.max(-.2,.35-.55*t)}function eg(t){return t<=1?1-.28*rs((t-.3)/.7):.72-.06*rs((t-1)/.15)}const og=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function ag(t,n){return t<.5||n%2===0}const I={laneGap:6,laneTime:.2,laneOmega:30,laneOmegaChill:16,laneEaseChill:20,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,vertOmegaInChill:14,vertEaseInChill:18,vertOmegaOutChill:8,vertEaseOutChill:12,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,gateRadiusX:2.6,gateTailwind:10,gateScore:40,maxHp:2,reactWindow:1,shieldMinGap:3e3,shieldMaxGap:4200,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,wishLanternMul:10,wishGateV:4,wishPickV:5.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2,boostTime:5,boostMulMin:1.35,boostMulMax:1.8,boostFade:1.2,boostScoreMul:2},Je=2;function Ct(t){return-t*I.laneGap}function fr(t,n){const e=Math.min(1,co(t,n));return I.speedStart+(I.speedMax-I.speedStart)*(1-(1-e)*(1-e))}const Wt={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function Vo(t,n,e,o){const a=Wt[t.kind];return Math.abs(o)>a.halfZ||Math.abs(n-Ct(t.lane))>=a.halfX+I.hitHalfWidth?!1:e-I.hitHalfHeight<a.hi&&e+I.hitHalfHeight>a.lo}function sg(t,n,e){return Math.abs(n-Ct(t.lane))>=Wt[t.kind].halfX+I.hitHalfWidth?!0:e==="flare"?t.kind==="spike"||t.kind==="ridge":e==="dive"?t.kind==="bridge"||t.kind==="overhang":!1}function ig(t,n){return t.z+Wt[t.kind].halfZ<n}const cg=[I.flareHeight,0,-5.5],rg=0,wu=1,lg=2;function Ho(t,n,e){return!t.some(o=>Vo(o,Ct(n),cg[e],0))}function hg(t){const n=[];for(let e=-1;e<=1;e++)for(let o=0;o<3;o++)Ho(t,e,o)&&n.push({lane:e,tier:o});return n}function c0(t){return hg(t).length}function ii(t,n,e){return e?t.some(o=>(o.kind==="pillar"||o.kind==="overhang")&&o.lane===n)?"none":"any":Ho(t,n,wu)?"any":Ho(t,n,rg)?"high":Ho(t,n,lg)?"low":"none"}function ug(t,n,e,o,a){const s=t.thermalV>8,c=t.low&&!s,i=(n[0].z-t.z)/t.speed,r=m=>{const d=ii(n,m,s);if(d==="none")return 1/0;const g=d==="any"?0:d==="low"&&c?.3:1.5;return Math.abs(m-t.lane)+g+(e&&ii(e,m,s)==="none"?.6:0)},u=[-1,0,1].filter(m=>r(m)<1/0).sort((m,d)=>r(m)-r(d))[0];if(u===void 0)return i<o+.12&&t.vert!=="flare"?["up"]:[];const h=ii(n,u,s);if(u===t.lane&&h==="any")return null;const l=[],f=a&&u===t.lane&&t.pickups.some(m=>!m.taken&&m.lane===t.lane&&m.z>t.z&&m.z<n[0].z&&(h==="low"?m.v<-2:m.v>2)&&(m.z-t.z)/t.speed<.2);if(h==="high"){const m=t.vert!=="flare"||t.vertT>=I.vertIn+I.vertHold;(i<o+.12+(c?.06:0)||f)&&m&&l.push("up")}else h==="low"&&(i<o+.12||f)&&((t.alt?t.low:t.vert==="dive"&&t.vertT<I.vertIn+I.vertHold)||l.push("down"));if(u!==t.lane){const m=o+(Math.abs(u-t.lane)-1)*I.laneTime*1.3;i<=m&&l.push(u<t.lane?"left":"right")}return l}function xu(t,n){const e=new Map;for(const o of t.obstacles){const a=o.z-t.z;if(o.passed||a<-Wt[o.kind].halfZ||a>n)continue;const s=e.get(o.row)??[];s.push(o),e.set(o.row,s)}return[...e.values()].sort((o,a)=>o[0].z-a[0].z)}function r0(t){return new Set(t.filter(n=>n.kind==="pillar"||n.kind==="spike"||n.kind==="overhang").map(n=>n.lane))}function mg(t,n=.27,e=!0){if(t.mode!=="run")return[];const o=xu(t,t.speed*2.2),a=o[0],s=c=>e?fg(t,c):[];return a?ug(t,a,o[1],n,e)??s(a):dg(t)??s()}function dg(t){const n=t.gusts.find(a=>!a.taken&&!a.missed&&a.z+a.len>t.z),e=t.gates.find(a=>!a.hit&&!a.missed&&a.z>t.z);if(e&&(e.z-t.z<t.speed*.45||e.z-t.z<t.speed*1.5&&(!n||e.z<Math.max(n.z,t.z))))return e.lane===t.lane||t.laneT<1?[]:[e.lane<t.lane?"left":"right"];if(!n||n.z-t.z>t.speed*1.5)return null;if(n.lane!==t.lane)return t.laneT<1?[]:[n.lane<t.lane?"left":"right"];const o=(n.z-t.z)/t.speed;return ku(t,n.v,o)?["up"]:o>.25?[]:n.v>2&&t.vert!=="flare"?["up"]:n.v<-2&&!Mu(t)?["down"]:[]}function Mu(t){return t.alt?t.low:t.vert==="dive"}function ku(t,n,e){return t.alt&&t.low&&t.vert==="cruise"&&Math.abs(n)<=2&&e<.9}function fg(t,n){const e=t.pickups.find(c=>!c.taken&&c.kind==="lantern"&&c.lane===t.lane&&c.z>t.z);if(e&&t.thermalV<2){const c=(e.z-t.z)/t.speed;if(ku(t,e.v,c))return["up"];if(e.v>2&&t.vert!=="flare"&&c<.2)return["up"];if(e.v<-2&&!Mu(t)&&c<.2)return["down"]}const o=t.pickups.find(c=>!c.taken&&c.z-t.z>t.speed*.35&&c.z-t.z<t.speed*1.2);if(!o||o.lane===t.lane||t.laneT<1)return[];const a=o.lane<t.lane?-1:1;return n&&r0(n).has(t.lane+a)?[]:xu(t,o.z-t.z).some(c=>r0(c).has(t.lane+a))?[]:[a<0?"left":"right"]}const gg=["mu-cang-chai","khau-pha","ha-giang","fansipan"],wc="skyrun.map";function pg(t){const n=["khau-pha","ha-giang"],e=s=>{try{return JSON.parse(t.getItem(s)??"null")}catch{return null}},o=e("skyrun.meters"),a=e("skyrun.played");return n.some(s=>typeof o?.[s]=="number"&&o[s]>0||!!t.getItem(`skyrun.best.${s}`)||Array.isArray(a)&&a.includes(s))||Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")}function ci(t){return gg.find(n=>n===t)??null}function vg(){const t=globalThis;if(t.location){const e=ci(new URLSearchParams(t.location.search).get("map"));if(e)return e;let o="mu-cang-chai";try{const a=t.localStorage;if(!a)return o;const s=ci(a.getItem(wc));if(s)return s;o=pg(a)?"khau-pha":"mu-cang-chai";try{a.setItem(wc,o)}catch{}}catch{}return o}const n=t.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return ci(n??t.process?.env?.SKYRUN_MAP)??"khau-pha"}const Bt=vg();function fa(t,n,e){let o=Math.imul(t,374761393)^Math.imul(n,668265263)^Math.imul(e+1,2246822519);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function l0(t){return t*t*t*(t*(t*6-15)+10)}function N(t,n,e){const o=Math.floor(t),a=Math.floor(n),s=l0(t-o),c=l0(n-a),i=fa(o,a,e),r=fa(o+1,a,e),u=fa(o,a+1,e),h=fa(o+1,a+1,e);return i+(r-i)*s+(u-i)*c+(i-r-u+h)*s*c}function Ft(t,n,e,o){let a=0,s=1,c=0,i=1;for(let r=0;r<e;r++)a+=N(t*i,n*i,o+r*31)*s,c+=s,s*=.5,i*=2.03;return a/c}function xc(t,n,e,o){let a=0,s=1,c=0,i=1,r=1;for(let u=0;u<e;u++){const h=1-Math.abs(N(t*i,n*i,o+u*17)*2-1),l=h*h*r;r=Math.min(1,l*1.6),a+=l*s,c+=s,s*=.5,i*=2.1}return a/c}function Cn(t){return t<0?0:t>1?1:t}function R(t,n,e){const o=Cn((e-t)/(n-t));return o*o*(3-2*o)}function q(t,n,e){return t+(n-t)*e}const yg=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],bg=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],wg=[[430,100,270],[1520,-100,270],[2280,40,300],[2560,-40,300]],xg=[[690,90,260],[1098.4,-90,260],[1880,30,320],[2090,-30,320],[3300,-90,260]],Yt={"mu-cang-chai":{id:"mu-cang-chai",name:"Mù Cang Chải",tagline:"Thả mình từ đỉnh đồi, men sườn ruộng bậc thang, băng thung lũng Nậm Kim.",region:"mu-cang-chai",listed:!0,cycle:3100,offset:60,dayCycles:3,dayCutPhase:1200,arcs:wg,profile:{d0:0,hardAt:12e3,cap:.7,tighten:.4,shieldMaxGap:3400},routePrefix:"mc",routeVersion:3,online:!0,logRvBase:2e3,unlock:null},"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",listed:!0,cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:yg,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:{from:"mu-cang-chai",run:1e4,meters:2e4}},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",listed:!0,cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:bg,profile:{d0:.2,hardAt:5e3,tighten:1.4},routePrefix:"hg",routeVersion:3,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}},fansipan:{id:"fansipan",name:"Fansipan",tagline:"Nhảy khỏi nóc nhà Đông Dương, lao xuyên hai tầng mây, lướt trên biển mây.",region:"fansipan",listed:!0,cycle:4100,offset:20,dayCycles:2,dayCutPhase:500,arcs:xg,profile:{d0:.35,hardAt:3600,tighten:1.5,shieldMaxGap:3800},routePrefix:"fp",routeVersion:1,online:!0,logRvBase:3e3,unlock:{from:"ha-giang",score:16e3,meters:39e3}}},gt=Yt[Bt],ct=gt.cycle,Rt=gt.offset,Kt=1100,Su=1320,Mc=2450,Tu=2700,Mg=150,go=1480,ga=1770,kg=[320,640,930];function Sg(t){let n=0;for(const e of kg)n=Math.max(n,1-R(0,70,Math.abs(t-e)));return n}function h0(t){return t<Kt?0:t<Mc?R(Kt,Su,t):1-R(Mc,Tu,t)}const Tg={edge:Kt,pullOut:go,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:h0,dive(t){const n=R(Kt+40,Kt+380,t)-R(Mc-650,Tu-60,t);return Mg*n},sill(t){return R(760,940,t)*(1-R(1092,1108,t))},village(t,n){return n%2!==0?0:R(1600,1720,t)*(1-R(2380,2500,t))},halfWidth(t){const n=q(64,30,t<Kt?Sg(t):0);return q(n,430,h0(t))},extraDepth:()=>0,reveal(t){return Cn(R(go-20,go+60,t)*(1-R(1640,1760,t)))},drop(t){return R(Kt-25,Kt+10,t)*(1-R(go-40,go+20,t))},clean(t){return R(Kt-40,Kt-10,t)*(1-R(1600,1690,t))},zone(t,n){return t<Kt-60?"gorge":t<Su?"mouth":n?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},po=300,vo=680,u0=2320,Ag=2880,Dt=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function Au(t,n,e,o){if(t<=n)return 0;if(t>=e)return 1;const a=e-n,s=1/(a-o),c=t-n;return c<o?s*c*c/(2*o):c>a-o?1-s*(a-c)**2/(2*o):s*(c-o/2)}function Ng(t){const n=Math.min(1,Math.max(0,(t-u0)/(Ag-u0)))**1.5;return n*n*(3-2*n)}function ri(t){return 1-.65*R(400,680,t)+.2*R(1500,1750,t)+.45*R(2350,2700,t)}function Cg(t){return q(140,220,R(1500,1750,t))}function zg(t){return 1-R(350,650,t)+R(2650,2950,t)}function Eg(t){return 410+60*R(400,680,t)-27*R(1500,1750,t)-33*R(2700,3200,t)}function Lg(t){return t<600?-80:t<760?q(-80,-118,R(600,760,t)):t<1480?q(-118,-218,Au(t,760,1480,80)):t<2380?-218:t<4e3?q(-218,100,R(2380,2530,t)):q(100,-80,R(4e3,4100,t))}const _g={level:Lg,cover:t=>1-.4*Dt(t,1760,2300,60)},Rg={level:()=>-350,cover:t=>Dt(t,700,2560,60),eye:{phase:1660,radius:130,swirl:3.2}},Ig={edge:po,pullOut:vo,archPhases:[],caves:[],tower:{phase:2640,latMin:90,latMax:250,mirror:!0},openness:ri,dive(t){return-150+300*R(po+10,vo,t)+100*Au(t,760,1480,80)+180*R(1510,1740,t)-580*Ng(t)},sill(t){return R(1700,1760,t)*(1-R(2300,2360,t))},village(){return 0},halfWidth(t){return q(Cg(t),q(430,1100,zg(t)),ri(t))},extraDepth(t){return Math.max(0,Eg(t)-q(150,240,ri(t)))},reveal(t){return Dt(t,2800,3200,60)},drop(t){return Dt(t,po-10,vo-10,30)+Dt(t,1500,1730,25)},clean(t){return Dt(t,po-25,vo+50,25)+Dt(t,1465,1815,20)+Dt(t,2315,3150,20)},road(){return 0},roadDepth(){return 0},cloud(t){return 1-.45*Dt(t,720,1480,60)-.9*Dt(t,1720,2330,60)},cloudDecks:[_g,Rg],landmarks:[{kind:"chop-fansipan",phase:70,lat:26,drop:6}],cableLine:{from:700,to:1490,clear:38},rain:t=>Dt(t,1700,2360,70),waterLevel:-443,lanternScale:2.4,skyLanternFloor:90,hazardBeacons:!0,pilotRollMax:.85,sunGlare:.55,chaseTilt:{up:.9,lookDown:2},climbCam:.8,climbFrame:1,windRibbon:{width:.45,minAngle:.0045},speedBlur:.3,plungeTop:t=>Dt(t,340,500,40)+Dt(t,1530,1700,35),plungeSide:t=>Dt(t,560,630,35),zoneNames:{rim:"Đỉnh Fansipan",dive:"Rơi tự do",gorge:"Cáp treo giữa hai tầng mây",river:"Suối Mường Hoa",climb:"Cột gió nhiệt",valley:"Biển mây Hoàng Liên",mouth:"Mắt xoáy mây"},zoneLines:{rim:"dinh-fansipan",dive:"xuyen-may",gorge:"cap-treo",mouth:"mat-xoay-may",river:"suoi-muong-hoa",climb:"troi-khoi-may",valley:"bien-may"},zone(t){return t<po?"rim":t<vo?"dive":t<1500?"gorge":t<1750?"mouth":t<2300?"river":t<2810?"climb":t<4e3?"valley":"rim"}},le=600,pa=1060,Nu=320,Pg=Nu+13;function li(t){return R(2230,2420,t)*(1-R(3420,3520,t))}function Bg(t){if(t<300)return q(30,170,R(0,140,t));let n=170;return n=q(n,110,R(900,1150,t)),n=q(n,60,R(2200,2260,t)),q(n,30,R(3440,3520,t))}const Hg={edge:le,pullOut:pa,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:li,dive(t){return Nu*(R(le+20,pa,t)-R(2215,2740,t))},sill(t){return R(1040,1120,t)*(1-R(2205,2260,t))},village(t){return R(2800,2900,t)*(1-R(3380,3480,t))},halfWidth(t){return q(Bg(t),430,li(t))},extraDepth(t){if(t<2200)return 190*R(20,160,t);const n=Pg-q(150,240,li(t));return q(190,n,R(2200,2260,t))*(1-R(2760,2900,t))},reveal(t){return R(2190,2270,t)*(1-R(2560,2700,t))},drop(t){return R(le-25,le+10,t)*(1-R(pa-40,pa+20,t))},clean(t){return R(le-40,le-10,t)*(1-R(1100,1160,t))+R(2200,2230,t)*(1-R(2700,2760,t))},road(t){return R(60,220,t)*(1-R(1700,1860,t))},roadDepth(t){return 55+28*Math.sin(t/170)+12*Math.sin(t/61+1.3)},cloud(t){return 1-R(-1,120,t)*(1-R(2250,2600,t))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zoneLines:{rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},zone(t){return t<le?"rim":t<1100?"dive":t<1900?"river":t<2200?"cave":t<2750?"climb":t<3500?"village":"gate"}},Et=180,Tn=430,ve=905,Wa=1075,Ya=1400,qo=2e3,Wo=2500,Ut=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function kc(t){return 140*R(Et,Tn,t)+30*Cn((t-Tn)/(850-Tn))+60*R(ve,Wa,t)-90*R(1100,1380,t)+40*R(Ya,1520,t)+25*Cn((t-1540)/450)-205*R(2520,3080,t)}const m0=370,Fo=t=>R(ve,ve+15,t)*(1-R(1330,1510,t)),Sc=360,ja=t=>R(Et+10,Et+30,t)*(1-R(Sc-20,Sc+30,t)),d0=t=>Ut(t,480,860,60)+Ut(t,1500,1960,60);function Fg(t){const n=16*R(Et-45,Et,t)**2;let e=q(9.5+n,m0-kc(t),R(Et,Et+16,t));return e=q(e,17,R(Sc,540,t)),e=q(e,m0-kc(t),Fo(t)),e=q(e,9.5,R(qo-40,qo+40,t)),q(e,12,R(Wo-20,Wo+40,t)*(1-R(3e3,3090,t)))}function Cu(t){const n=q(12,30,Math.max(Fo(t),ja(t)));return q(n,60,Ut(t,qo+20,Wo-20,40))}const Gg={shelf:Fg,bench:Cu,hill:d0,peak:t=>t<1200?130:140,rise:t=>q(220,100,d0(t)),fall:t=>q(110,140,Ut(t,qo+20,Wo-20,40)),wall:t=>R(Et-15,Et+65,t)*(1-R(460,490,t)),wallRef:()=>665,wallTop:t=>q(9.5,40,R(Et,Tn,t)),wallLip:t=>20+83*R(Et,Et+50,t)-55*R(Et+140,Tn,t),crown:t=>1-R(Et-15,Et+15,t)+R(2990,3070,t)},$g={hillside:Gg,edge:Et,pullOut:Tn,archPhases:[],caves:[],tower:{phase:1800,latMin:90,latMax:250,mirror:!0},openness:()=>1,dive:kc,sill:()=>0,village:t=>1-Math.max(Fo(t),ja(t)),halfWidth:t=>Cu(t)+34+120*Math.max(Fo(t),ja(t)),extraDepth:()=>120,reveal:t=>Cn(1-R(60,110,t)+Ut(t,440,560,30)+Ut(t,1100,1360,40)+R(2950,3050,t)),drop:t=>Ut(t,Et-5,Tn-30,25)+.7*Ut(t,ve,Wa-30,20)+.6*Ut(t,Ya,1500,20),plungeLevel:t=>Ut(t,Et+5,Tn-20,30)+.7*Ut(t,ve+5,Wa-20,20),dropFx:t=>Ut(t,Et,Tn-60,20)+.8*Ut(t,ve,Wa-20,15)+.5*Ut(t,Ya,1500,20),clean(t){return Math.max(1-R(500,550,t),R(860,890,t)*(1-R(1580,1610,t)),R(2470,2500,t))},road:()=>0,roadDepth:()=>0,cloud:t=>1-.6*Math.max(Fo(t),ja(t)),cloudDepth:300,speedBlur:.45,sunGlare:.35,pilotRollMax:.7,splitS:!1,chaseTilt:{up:.6,lookDown:1.2},climbCam:.8,zoneNames:{rim:"Đỉnh La Pán Tẩn",dive:"Thả mình xuống thung",valley:"Ruộng bậc thang La Pán Tẩn",river:"Thung lũng Nậm Kim",climb:"Đồi Mâm Xôi",village:"Bản Dế Xu Phình",gate:"Cột gió về đỉnh"},zone(t){return t<Et?"rim":t<Tn?"dive":t<ve?"valley":t<Ya?"river":t<qo?"climb":t<Wo?"village":"gate"}},zu={"mu-cang-chai":$g,"khau-pha":Tg,"ha-giang":Hg,fansipan:Ig},$=zu[Bt],Eu=t=>zu[t],gn=2*ct,an=Rt;function Te(t,n){if(t.k===0)return{x:t.x+n*Math.sin(t.th),z:t.z+n*Math.cos(t.th),th:t.th};const e=t.th+t.k*n;return{x:t.x+(Math.cos(t.th)-Math.cos(e))/t.k,z:t.z+(Math.sin(e)-Math.sin(t.th))/t.k,th:e}}function f0(t,n){const e=[];let o=0,a=0,s=n,c=0;const i=(r,u)=>{if(r<.5)return;const h={k:u,x:o,z:a,th:s},l=Te(h,r),f=Te(h,r/2),m=Math.max(Math.hypot(f.x-o,f.z-a),Math.hypot(f.x-l.x,f.z-l.z));e.push({u0:c,len:r,k:u,x:o,z:a,th:s,bx:f.x,bz:f.z,br:m}),o=l.x,a=l.z,s=l.th,c+=r};for(const r of[1,-1]){const u=r===1?0:ct;for(const[h,l,f]of t){if(u+h-c<-.5)throw new Error(`bảng cua: cung ở pha ${h} chồng cung trước (hết ở pha ${(c-u).toFixed(1)})`);i(u+h-c,0),i(Math.abs(l)*Math.PI/180*f,r*Math.sign(l)/f)}i(u+ct-c,0)}return{segs:e,x:o,z:a}}function Og(t){const n=f0(t,0),{segs:e,x:o,z:a}=f0(t,-Math.atan2(n.x,n.z));let s=e.length-1;for(;s>0&&e[s].u0>an;)s--;const c=Te(e[s],an-e[s].u0),i=e.reduce((h,l)=>h+l.bx,0)/e.length,r=e.reduce((h,l)=>h+l.bz,0)/e.length,u=Math.max(...e.map(h=>Math.hypot(h.bx-i,h.bz-r)+h.br));return{segs:e,endX:o,endZ:a,ox:c.x,oz:c.z,bx:i,bz:r,br:u}}const on=Og(gt.arcs);function ls(t,n,e=on){const o=t+an,a=Math.floor(o/gn),s=o-a*gn;let c=e.segs.length-1;for(;c>0&&e.segs[c].u0>s;)c--;const i=Te(e.segs[c],s-e.segs[c].u0);return n.x=i.x+a*e.endX-e.ox,n.z=i.z+a*e.endZ-e.oz,n.yaw=i.th,n}const Dg={x:0,z:0,yaw:0},Ug={x:0,z:0,yaw:0};function sa(t,n=30){return(ls(t+n,Ug).yaw-ls(t-n,Dg).yaw)/(2*n)}function Kg(t,n,e,o,a,s){let c;if(t.k===0)c=n*Math.sin(t.th)+e*Math.cos(t.th);else{const l=Math.sign(t.k);let m=Math.atan2(l*(e+Math.sin(t.th)/t.k),-l*(n-Math.cos(t.th)/t.k))-t.th;m-=2*Math.PI*Math.round((m-t.k*t.len/2)/(2*Math.PI)),c=m/t.k}const i=c>=o-.01&&c<=a+.01;c=Math.min(a,Math.max(o,c));const r=Te(t,c),u=n-(r.x-t.x),h=e-(r.z-t.z);return s.s=c,s.dist=Math.hypot(u,h),s.lat=u*Math.cos(r.th)-h*Math.sin(r.th),i}function J(t){return((t+Rt)%ct+ct)%ct}function wn(t){return Math.floor((t+Rt)/ct)}const Go=9.5;function Xt(t){return $.village(J(t),wn(t))}function ee(t){return Xt(t)>.97}function Qt(t){return $.openness(J(t))}function Pt(t){return 260+30*Math.sin(t/1700)}function Y(t){return Pt(t)-$.dive(J(t))}function Bs(t){return $.sill(J(t))}function vn(t){return(Y(t+2)-Y(t-2))/4}function Lu(t,n){return Math.max(-1.1,Math.min(1.1,Math.atan(n*n*sa(t)/9.8)))}const De={x:0,z:0,yaw:0};function zt(t){return ls(t,De).yaw}function D(t,n,e,o){return ls(t,De),o.x=De.x+n*Math.cos(De.yaw),o.y=Y(t)+e,o.z=De.z-n*Math.sin(De.yaw),o}function bn(t){return $.halfWidth(J(t))}function ia(t){return $.extraDepth(J(t))}function Tc(t){return Pt(t)-q(150,240,Qt(t))-ia(t)}function Vg(t){return $.reveal(J(t))}function qg(t){return $.drop(J(t))}function _u(t){return $.clean(J(t))}function Wg(t,n){const e=(Y(t+4)-Y(t-4))/8,o=(Y(t+4)-2*Y(t)+Y(t-4))/16;return 1+n*n*o/(Math.pow(1+e*e,1.5)*9.8)}const Ru=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ..o .o. o.. .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Yg={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},jg=8,Iu=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function to(t){return t.split(" ")}function zn(t){let n=t.seed=t.seed+1831565813|0;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}function Xg(t,n,e,o=1){const a=og;let s=0;for(;s<a.length-1&&t>a[s+1][0];)s++;const c=a[s],i=a[Math.min(s+1,a.length-1)],r=i[0]>c[0]?Math.max(0,Math.min(1,(t-c[0])/(i[0]-c[0]))):1,u=(e?.5:1)*(n?.6+.3*Math.min(1,t):1)*o;return{p3:(c[1]+(i[1]-c[1])*r)*u,p2:(c[2]+(i[2]-c[2])*r)*u}}const Zg=new Set(["o","u","d"]),Qg=/[BLHO]/;function Jg(t,n,e,o,a,s,c){if(!n.length)return;for(let k=o-3;k<=o+3;k++)if(k!==o&&Qg.test(e[k]??""))return;const{p3:i,p2:r}=Xg(co(Math.max(0,a),t.diff),s,c,t.diff.tighten),u=zn(t),h=u<r?2:u<r+i?3:0;if(!h||c0(n)<=h)return;const l=n.some(k=>k.kind==="bridge"||k.kind==="ridge");if(l&&c)return;const f=k=>n.some(b=>(b.kind==="pillar"||b.kind==="spike"||b.kind==="overhang")&&b.lane===k),m=[-1,0,1].filter(k=>!f(k)&&(l||e[o][k+1]===".")&&![o-2,o-1,o+1].some(b=>Zg.has(e[b]?.[k+1]??""))),d=l?["pillar"]:c?["spike"]:["pillar","spike"],g=[[]];for(const k of m){const b=[];for(const w of g){b.push(w);for(const y of d)b.push([...w,{kind:y,lane:k}])}g.splice(0,g.length,...b)}const v=k=>[-1,0,1].every(b=>[...n,...k].some(w=>(w.kind==="pillar"||w.kind==="overhang")&&w.lane===b)),p=g.filter(k=>k.length&&c0([...n,...k])===h&&!v(k));p.length&&n.push(...p[Math.floor(zn(t)*p.length)])}const g0=700,t1=15e8,hi=(t,n,e)=>!t.alt&&t.hp<I.maxHp&&n-t.shieldFromZ>=e;function no(t,n){const e=Math.max(0,n);return fr(e,t.diff)*I.cellSeconds*eg(co(e,t.diff))}function Yo(t,n,e){const o=co(Math.max(0,e),t.diff),a=tg(o),s=n.filter(l=>l.tier<=a&&!t.lastBag.includes(l.id)),c=s.length?s:n.filter(l=>l.tier<=a),i=ng(o),r=c.map(l=>(l.tier===a?1.4:1)/(1+i*l.tier));let u=zn(t)*r.reduce((l,f)=>l+f,0),h=c[0];for(let l=0;l<c.length;l++)if(u-=r[l],u<=0){h=c[l];break}return t.lastBag.push(h.id),t.lastBag.length>4&&t.lastBag.shift(),h}const p0={o:0,u:I.flareHeight,d:-5.5},n1={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function we(t,n,e,o){const a=to(n.cells),s=no(t,e);let c=!1;const i=Math.floor((e+a.length*s)/g0),r=i>Math.floor(e/g0)&&e>300&&ag(co(e,t.diff),i);return a.forEach((u,h)=>{const l=e+(h+.5)*s,f=t.rowId++,m=ee(l),d=[];if(u==="HHH"||u==="LLL")d.push({kind:u==="HHH"?"bridge":"ridge",lane:0});else for(let b=-1;b<=1;b++){const w=n1[u[b+1]];w&&d.push({kind:m&&w==="pillar"?"spike":w,lane:b})}Jg(t,d,a,h,l,o,m);const g=b=>{t.obstacles.push({id:t.nextId++,kind:b.kind,lane:b.lane,z:l,open:o,row:f,passed:!1})};if(u==="HHH"||u==="LLL"){d.forEach(g);return}const v=d.length>0;for(let b=-1;b<=1;b++){const w=u[b+1],y=d.filter(x=>x.lane===b);if(y.forEach(g),!y.length&&w in p0){const x=a[h-1]==="HHH"||a[h-2]==="HHH",M=t.alt&&w==="o"&&x?I.flareHeight:p0[w];t.pickups.push({id:t.nextId++,kind:"lantern",lane:b,v:M,z:l,taken:!1})}}const p=[-1,0,1].filter(b=>u[b+1]==="."&&Ho(d,b,wu)),k=v?p:[];if(r&&!c&&k.length){const b=k[Math.floor(zn(t)*k.length)],w=zn(t),y=t.alt?w<.45?"thermal":w<.75||t.hp>=I.maxHp?"smoke":"shield":hi(t,l,t.diff.shieldMaxGap??I.shieldMaxGap)||w>=.6&&hi(t,l,I.shieldMinGap)?"shield":"thermal";y==="shield"&&(t.shieldFromZ=l),t.pickups.push({id:t.nextId++,kind:y,lane:b,v:0,z:l,taken:!1}),c=!0}else p.length&&hi(t,l,t.diff.shieldMaxGap??I.shieldMaxGap)&&(t.shieldFromZ=l,t.pickups.push({id:t1+f,kind:"shield",lane:p[(Math.imul(f,2654435761)>>>0)%p.length],v:0,z:l,taken:!1}))}),t.chunksSpawned++,e+a.length*s}const Pu=[{id:"cabin-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"kim-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"mom-bang",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"kim-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cabin-kim",tier:1,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"mom-doi",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-tuyet",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cabin-lien",tier:2,cells:"... ... ... .d. .d. HHH ... ... ... .d. .d. HHH ... ..."},{id:"ong-kim",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"kim-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui",tier:2,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ..."},{id:"luon-kim",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"kim-cabin-kim",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"mom-kim",tier:3,cells:"... ... L.B ... ... ... B.L ... ... ... .BL ... ..."},{id:"kim-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"kim-cabin-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],e1=["cabin-mot","kim-le","mom-bang"].map(t=>Pu.find(n=>n.id===t)),o1=[{id:"tang-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"tang-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-suoi",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},{id:"mom-suoi",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"cua-tang",tier:1,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"mom-tang",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"tang-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"tang-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-vom",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"tang-mom-xen",tier:2,cells:"... ... B.L ... ... ... L.B ... ... ... .L. ... ..."},{id:"cau-suoi",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... B.B ... ..."},{id:"luon-tang",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vom-cau",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"tang-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-tang-gat",tier:4,cells:"... ... B.L ... ... ... LB. ... ... ... .LB ... ... ... B.L ... ..."}],a1=[{id:"dinh-le",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"vom-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-dinh",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"song-may",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ... .B. ... ..."},{id:"cua-dinh",tier:1,cells:"... ... B.B .o. ... ... .BB ... ..."},{id:"dinh-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."},{id:"vom-dinh",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ... ... B.B ... ..."},{id:"ong-dinh",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-dinh",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"dinh-vom-dinh",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"dinh-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"to-hop-tang",tier:4,cells:"... ... B.L ... ... ... L.B ... ... ... .d. HHH ... ... ... .BL ... ..."}];function gr(t){t.mult=Math.min(I.multMax,1+t.multNear+t.multLantern)}function ca(t,n,e){t.bonus+=e,t.parts[n]+=e}function s1(t,n){const e=I.lanternMultStep*t.streak;e>=t.multLantern?t.multLantern=e:t.multLantern+=(e-t.multLantern)*(1-Math.exp(-.016666666666666666/I.lanternMultTau)),gr(t)}function Bu(t){t.streak=0}function i1(){const t=[];return($.cloudDecks??[]).forEach((n,e)=>{let o=-$.dive(0)-n.level(0);for(let a=1;a<=ct;a++){const s=-$.dive(a)-n.level(a);if(o!==0&&Math.sign(s)!==Math.sign(o)){const c=a-1+o/(o-s),i=!!n.eye&&Math.abs(c-n.eye.phase)<n.eye.radius;n.cover(c)>.5&&!i&&t.push({phase:c,deck:e,up:s>0})}o=s}}),t.sort((n,e)=>n.phase-e.phase)}const c1=i1();function Hu(t,n){let e=Math.imul(Math.round(t)^Math.imul(n,668265261),2654435761);return e^=e>>>15,(Math.imul(e,2246822507)>>>0)/4294967296}const v0=22;function r1(t,n,e,o){const a=[];for(const s of c1){if(s.phase<=e||s.phase>=o)continue;const c=n+s.phase;if(t.gates.some(l=>Math.abs(l.z-c)<1))continue;const i=t.gusts.filter(l=>l.z<=c).at(-1),r=t.gusts.find(l=>l.z>c);let u=[-1,0,1].filter(l=>(!i||Math.abs(l-i.lane)<=1)&&(!r||Math.abs(l-r.lane)<=1));i&&c-i.z>=v0&&u.some(l=>l!==i.lane)?u=u.filter(l=>l!==i.lane):i&&c-i.z<v0&&(u=[i.lane]);const h={z:c,lane:u[Math.floor(Hu(c,1)*u.length)],deck:s.deck,up:s.up,hit:!1,missed:!1};t.gates.push(h),a.push(h)}return a}function l1(t){for(const n of t.gates)if(!(n.hit||n.missed)){if(t.z<n.z)break;Math.abs(t.x-Ct(n.lane))<=I.gateRadiusX?(n.hit=!0,t.gatesHit++,t.tailwind=Math.min(I.tailwindMax,t.tailwind+I.gateTailwind),ca(t,"gust",I.gateScore*t.mult)):(n.missed=!0,t.gustChain=0,t.tailwind=0,t.surge=I.surgeMin),t.events.push({type:"cloud-gate",hit:n.hit,up:n.up})}}function h1(t,n){t.gates.length&&t.gates[0].z<n&&(t.gates=t.gates.filter(e=>e.z>=n))}const u1=[0,I.flareHeight,-5.5];function Hs(t,n,e){const o=n+e[0];if(t.gusts.some(c=>c.z===o))return;let a=Math.floor(zn(t)*3)-1,s=0;e.forEach((c,i)=>{const r=zn(t),u=zn(t);i>0&&(a=Math.max(-1,Math.min(1,a+(r<.35?-1:r<.7?1:0))));let h=i===0?0:u1[u<.6?0:u<.8?1:2];t.alt&&h===0&&s<-2&&(h=I.flareHeight),s=h,t.gusts.push({id:t.nextId++,index:i,count:e.length,lane:a,v:h,z:n+c,len:I.gustLen,taken:!1,missed:!1})})}function m1(t){return t.thermalV+t.windLift}function d1(t,n,e,o){if(!o){t.tailwind=0,t.windLift=0,t.liftT=0;return}t.tailwind*=Math.exp(-n/(e?I.surgeTauNearRow:I.tailwindTau)),e&&(t.liftT=0),t.liftT=Math.max(0,t.liftT-n);const a=t.liftT>0?2.2:e?2.5:1.2;t.windLift+=((t.liftT>0?I.gustLift:0)-t.windLift)*(1-Math.exp(-n*a))}function f1(t){for(const n of t.gusts){if(n.taken||n.missed)continue;if(t.z<n.z)break;if(t.z>n.z+n.len){n.missed=!0,t.gustChain=0,t.events.push({type:"gust-miss"});continue}if(Math.abs(t.x-Ct(n.lane))>I.gustRadiusX||Math.abs(t.moveV-n.v)>I.gustRadiusV)continue;n.taken=!0,n.index===0&&(t.gustChain=0),t.gustChain++,t.gustsTaken++,t.tailwind=Math.min(I.tailwindMax,t.tailwind+I.tailwindPerGust),t.liftT=I.gustLiftTime;const e=n.index===n.count-1&&t.gustChain===n.count;ca(t,"gust",(I.gustScore+(e?I.gustChainScore:0))*t.mult),t.events.push({type:"gust",chain:t.gustChain,full:e})}l1(t)}function g1(t,n){t.gusts.length&&t.gusts[0].z+t.gusts[0].len<n&&(t.gusts=t.gusts.filter(e=>e.z+e.len>=n))}const p1=28;function y0(t,n){return t!==0?0:Hu(n,2)<.5?-1:1}function v1(t,n,e){const o=t.gusts.find(h=>h.index===0&&h.z===n);if(!o)return;const a=e&&t.gusts.filter(h=>h.z<=e.z).at(-1),s=e?e.z:n-p1,c=e?a&&a.lane!==e.lane?a.lane:y0(e.lane,s):y0(o.lane,s),i=-Math.round(s);if(t.pickups.some(h=>h.id===i))return;const r=t.pickups.findIndex(h=>h.z>s),u={id:i,kind:"lantern",wish:!0,lane:c,v:e?I.wishGateV:0,z:s,taken:!1};r<0?t.pickups.push(u):t.pickups.splice(r,0,u)}const b0=[{kind:"gusts",at:310,phases:[360,420,480,540,600],wish:!0},{kind:"rows",from:800,to:1440,pool:Pu,open:!1,intro:e1},{kind:"gusts",at:1450,phases:[1530,1600,1670],wish:!0},{kind:"rows",from:1860,to:2280,pool:o1,open:!0},{kind:"gusts",at:2300,phases:[2380,2470,2560,2650,2740],wish:!0},{kind:"rows",from:3200,to:3960,pool:a1,open:!0}];function y1(t,n){const e=J(n),o=n-e;for(const[a,s]of b0.entries()){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return o+s.from+.5;const u=(s.intro&&wn(n)===0?s.intro[t.chunksSpawned]:void 0)??Yo(t,s.pool,n);return e+to(u.cells).length*no(t,n)>s.to?o+s.to+.5:we(t,u,n,s.open)}if(e>=s.at)continue;Hs(t,o,s.phases);const c=b0.slice(a+1).find(r=>r.kind==="rows")?.from??ct,i=r1(t,o,s.at,c);return s.wish&&v1(t,o+s.phases[0],i.at(-1)),o+s.at+.5}return o+ct+.5}const Fu=(...t)=>Ru.filter(n=>t.includes(n.id)),Gu=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],b1=[...Fu("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...Gu.filter(t=>t.id!=="luon-mai")],w1=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...Fu("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...Gu],x1=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],M1=Iu,k1=5;function S1(t){const n=["o..",".o.","..o"][t+1],e=[".BB","B.B","BB."][t+1];return{id:`cong-troi-${t}`,tier:0,cells:`... ... ${n} ${n} ${n} ${e} ${n} ... ...`}}const T1=[{kind:"rows",from:40,to:560,pool:b1,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:w1,open:!1},{kind:"rows",from:1990,to:2110,pool:x1,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:M1,open:!0},{kind:"gate",at:3560}];function A1(t,n){const e=J(n),o=n-e;for(const a of T1){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const i=Yo(t,a.pool,n);return e+to(i.cells).length*no(t,n)>a.to?o+a.to+.5:we(t,i,n,a.open)}if(e>=a.at)continue;if(a.kind==="gusts")return Hs(t,o,a.phases),o+a.at+.5;const s=Math.floor(zn(t)*3)-1,c=Math.max(n,o+a.at-(k1+.5)*no(t,n));return Math.max(we(t,S1(s),c,!1),o+a.at+.5)}return o+ct+.5}const N1=[1140,1225,1310,1395,1480];function C1(t,n){const e=J(n),o=no(t,n),a=Kt-30-(jg+.5)*o;if(e<40)return n+(40-e)+.5;if(e<a){const i=Yo(t,Ru,n);return e+to(i.cells).length*o>a?n+(a-e)+.5:we(t,i,n,!1)}if(e<Kt){let i=we(t,Yg,n,!1);Hs(t,n-e,N1);const r=J(i);return r>Kt&&r<ga&&(i+=ga-r+.5),i}if(e<ga)return n+(ga-e)+.5;const s=Yo(t,Iu,n);return e+to(s.cells).length*o>ct-60?n+(ct-e)+40:we(t,s,n,!0)}const z1=[{id:"choi-le",tier:0,cells:"... ... B.. .o. .o. .o. .o. .o. ..B ... ..."},{id:"den-ruong",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"choi-giua",tier:0,cells:"... ... .B. o.o o.o ... ... ... .B. ... ..."},{id:"cong-ruong",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"bo-ruong",tier:1,cells:"... ... ... ... .u. .u. LLL .o. .o. ... ..."},{id:"cua-choi",tier:1,cells:"... ... B.B .o. .o. .o. ... ... .B. ... ..."},{id:"zic-zac-nhe",tier:1,cells:"... ... B.o ... ... ... ... ... o.B ... ... ... ... ... B.o ... ..."},{id:"hang-choi",tier:2,cells:"... ... .BB ... ... ... ... BB. ... ..."},{id:"bo-cong",tier:2,cells:"... ... ... .u. .u. .u. LLL ... ... ... ... B.B ... ..."},{id:"doi-doc-nhe",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... ... .d. .d. HHH ... ..."}],E1=[{id:"cau-tre",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"da-suoi",tier:0,cells:"... ... B.. .o. .o. .o. .o. .o. ..B ... ..."},{id:"den-suoi",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"ghenh",tier:1,cells:"... ... ... ... .u. .u. LLL .o. .o. ... ..."},{id:"cot-cau",tier:1,cells:"... ... B.B .o. .o. .o. ... ... .B. ... ..."},{id:"mom-suoi",tier:1,cells:"... ... L.L .u. .u. ... ... ... .L. ... ..."},{id:"cau-da",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... ... .B. ... ..."},{id:"ong-tre",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"luon-da",tier:3,cells:"... ... B.. ... ... ... ... .B. ... ... ... ... ..B ... ..."}],L1=[{id:"nha-le",tier:0,cells:"... ... B.. ... ... ... ... ... ..B ... ..."},{id:"cong-ban",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"den-ban",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"ngo-ban",tier:1,cells:"... ... .B. o.o o.o ... ... ... B.B .o. ... ..."},{id:"xom",tier:2,cells:"... ... B.B ... ... ... ... .BB ... ... ... ... B.. ... ..."}],_1=[{kind:"boost",at:300},{kind:"rows",from:560,to:850,pool:z1,open:!0},{kind:"boost",at:875},{kind:"gusts",at:1080,phases:[1120,1180,1240,1300,1360]},{kind:"rows",from:1620,to:1980,pool:E1,open:!0},{kind:"boost",at:2050},{kind:"rows",from:2100,to:2460,pool:L1,open:!0},{kind:"gusts",at:2520,phases:[2600,2680,2760,2840,2920]}];function R1(t,n){const e=J(n),o=n-e;for(const a of _1){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const s=Yo(t,a.pool,n);return e+to(s.cells).length*no(t,n)>a.to?o+a.to+.5:we(t,s,n,a.open)}if(!(e>=a.at))return a.kind==="boost"?o+a.at>600&&t.pickups.push({id:t.nextId++,kind:"boost",lane:Math.floor(zn(t)*3)-1,v:0,z:o+a.at,taken:!1}):Hs(t,o,a.phases),o+a.at+.5}return o+ct+.5}const I1={"mu-cang-chai":R1,"khau-pha":C1,"ha-giang":A1,fansipan:y1},P1=I1[Bt];function B1(t){for(;t.nextChunkZ<t.z+I.spawnAheadMeters;)t.nextChunkZ=P1(t,t.nextChunkZ);const n=t.z-I.despawnBehind;t.obstacles.length&&t.obstacles[0].z<n&&(t.obstacles=t.obstacles.filter(e=>e.z>=n)),t.pickups.length&&t.pickups[0].z<n&&(t.pickups=t.pickups.filter(e=>e.z>=n)),g1(t,n),h1(t,n)}const $u=1e9;function H1(t){const n=I.thermalTime-.6;for(let e=.5;e<n;e+=.22){const o=t.z+t.speed*1.08*e,a=t.obstacles.filter(i=>Math.abs(i.z-o)<12),s=[-1,0,1].filter(i=>!a.some(r=>Vo(r,Ct(i),I.thermalHeight,0)));if(!s.length)continue;const c=s.includes(t.lane)?t.lane:s[0];t.pickups.push({id:$u+t.trailIds++,kind:"lantern",lane:c,v:I.thermalHeight,z:o,taken:!1})}t.pickups.sort((e,o)=>e.z-o.z)}function F1(t,n){return t.thermalV>8&&n.id<$u?!1:!t.pickups.some(e=>e!==n&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-n.z)<.5)}function G1(t){for(const n of t.pickups){if(n.taken)continue;const e=n.z-t.z;if(e>3)break;if(e<-3){n.kind==="lantern"&&!n.wish&&e>-3-t.speed/60&&F1(t,n)&&Bu(t);continue}if(Math.abs(t.x-Ct(n.lane))<I.lanternPickRadius&&Math.abs(t.v-n.v)<(n.wish?I.wishPickV:I.lanternPickRadius))if(n.taken=!0,n.kind==="lantern"){t.lanterns++,t.streak++,t.bestStreak=Math.max(t.bestStreak,t.streak);const a=I.lanternScore*(n.wish?I.wishLanternMul:1)*t.mult*(t.smokeT>0?I.smokeLanternMul:1);ca(t,"lantern",a),t.events.push(n.wish?{type:"wish",streak:t.streak,id:n.id,points:a}:{type:"lantern",streak:t.streak,id:n.id})}else n.kind==="thermal"?(t.thermalT=I.thermalTime,t.low=!1,H1(t)):n.kind==="smoke"?(t.smokeT=I.smokeTime,t.smokes++):n.kind==="boost"?(t.boostT=I.boostTime,t.boosts++):t.hp=Math.min(I.maxHp,t.hp+1),t.events.push({type:"booster",kind:n.kind})}}function pr(t){return Math.min(1,t.boostT/I.boostFade)}function $1(t){return t.boostT<=0?1:1+(I.boostMulMin+(I.boostMulMax-I.boostMulMin)*Math.min(1,co(t.z,t.diff))-1)*pr(t)}function O1(t,n){t.smokeT=Math.max(0,t.smokeT-n),!(t.boostT<=0)&&(t.stunT>0&&(t.boostT=Math.min(t.boostT,I.boostFade)),ca(t,"boost",t.speed*n*t.mult*(I.boostScoreMul-1)*pr(t)),t.boostT=Math.max(0,t.boostT-n))}const D1=1.4,U1=3,K1=46,V1=100,q1=.8,w0=(t,n,e)=>{const o=Math.min(1,Math.max(0,(t-n)/(e-n)));return o*o*(3-2*o)};function W1(t,n){let e=1/0;for(const a of t.obstacles)a.passed||(e=Math.min(e,Math.max(0,a.z-t.z)/Math.max(1,t.speed)));const o=t.mode!=="run"?0:Math.max(1-w0(e,D1,U1),w0(t.speed,K1,V1));t.pace=o>=t.pace?o:t.pace+(o-t.pace)*(1-Math.exp(-.016666666666666666/q1))}function Gn(t,n,e){return n+(e-n)*t}function Ou(t,n,e,o,a){return e>=1?n:t+(n-t)*(1-Math.exp(-.016666666666666666*o/(1-e)))}function vr(t,n,e,o,a,s){const c=t-e,i=n+o*c,r=Math.exp(-o*a);return s.x=e+(c+i*a)*r,s.vel=(n-o*i*a)*r,s}function Du(){return I.vertIn+I.vertHold+I.vertOut}const ui={x:0,vel:0};function Y1(t,n){t.vert!=="cruise"&&(!t.alt&&t.holdDive&&t.vertT>I.vertIn&&t.vertT<I.vertIn+I.vertHold&&(t.vertT=I.vertIn+.01),t.vertT+=n,t.vertT>=(t.alt&&t.vert==="dive"?I.lowTransition:Du())&&(t.vert="cruise",t.vertT=0));const e=t.vert!=="cruise"&&t.vertT<I.vertIn+I.vertHold,o=t.low?-5.5:0,a=e?t.vert==="flare"?I.flareHeight:-5.5:o,s=e||t.low;t.moveGoal=Ou(t.moveGoal,a,t.pace,s?I.vertEaseInChill:I.vertEaseOutChill);const c=s?Gn(t.pace,I.vertOmegaInChill,I.vertOmegaIn):Gn(t.pace,I.vertOmegaOutChill,I.vertOmegaOut);vr(t.moveV,t.moveVel,t.moveGoal,c,n,ui),t.moveV=ui.x,t.moveVel=ui.vel}const mi={x:0,vel:0};function Uu(t,n){const e=Math.sign(n-t.lane);t.lane=n,t.laneT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert=t.vert,t.events.push({type:"lane",dir:e})}function j1(t,n){t.steerX=Math.max(-7,Math.min(I.steerMax,n));const e=Ku(t.lane,t.steerX);e!==t.lane&&Uu(t,e)}function Ku(t,n){return Math.abs(n-Ct(t))<=I.laneGap*.57?t:Math.max(-1,Math.min(1,Math.round(-n/I.laneGap)))}function X1(t,n){t.laneT=Math.min(1,t.laneT+n/I.laneTime),t.steerGoal=Ou(t.steerGoal,t.steerX,t.pace,I.laneEaseChill),vr(t.x,t.xVel,t.steerGoal,Gn(t.pace,I.laneOmegaChill,I.laneOmega),n,mi),t.x=mi.x,t.xVel=mi.vel}function di(t,n=!1,e=gt.profile){return{mode:"ready",seed:t,alt:n,diff:e,low:!1,smokeT:0,smokes:0,boostT:0,boosts:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,pace:0,steerGoal:0,moveGoal:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],gates:[],gatesHit:0,hp:I.maxHp,stunT:0,hurtRow:-1,shieldFromZ:0,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0,boost:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:wn(0)*2+1,lastBag:[],events:[]}}function Z1(t){t.mode="run",t.nextChunkZ=Math.max(t.nextChunkZ,t.z+220)}function x0(t,n){if(n==="left"||n==="right"){const o=n==="left"?-1:1;if(t.laneT<I.laneTime*.6)return!1;const a=Math.max(-1,Math.min(1,t.lane+o));return t.steerX=Ct(a),a!==t.lane&&Uu(t,a),!0}const e=n==="up"?"flare":"dive";return t.alt&&e==="dive"&&t.low?!0:t.vert===e&&t.vertT<Du()-I.vertOut?!1:(t.alt&&(t.low=e==="dive"),t.vert=e,t.vertT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert="cruise",t.events.push({type:"vert",kind:e}),!0)}function Q1(t,n){if(n.row!==t.hurtRow){if(t.hp>=I.maxHp&&(t.shieldFromZ=Math.max(t.shieldFromZ,t.z)),t.hp-=sg(n,t.steerX,t.low?"dive":t.vert)||t.time-t.dodgeTime<=I.reactWindow?1:t.hp,t.hp>0){t.hurtRow=n.row,t.stunT=I.stunTime,t.hitstopT=I.hitstop,t.surge=I.surgeMin,t.combo=0,t.multNear=0,Bu(t),gr(t),t.events.push({type:"hurt",hp:t.hp,kind:n.kind});return}t.hp=0,t.mode="crash",t.crashT=0,t.hitstopT=I.hitstop*2,t.events.push({type:"crash",kind:n.kind})}}function J1(t,n,e,o,a=null){if(t.events.length=0,t.time+=o,t.mode==="over")return;if(t.mode==="crash"){t.crashT+=o,t.z+=t.speed*o*Math.max(0,1-t.crashT*1.5),t.crashT>=I.crashSeconds&&(t.mode="over");return}if(t.hitstopT>0){t.hitstopT-=o;return}const s=t.mode==="run";s&&a!==null&&j1(t,a);for(const m of s?n:[])x0(t,m)||(t.buffered=m,t.bufferT=I.bufferTime);t.buffered&&(t.bufferT-=o,(x0(t,t.buffered)||t.bufferT<=0)&&(t.buffered=null)),t.holdDive=e&&t.vert==="dive";const c=t.vert==="dive"?I.diveSpeedMul:t.vert==="flare"?I.flareSpeedMul:1,i=Math.sin(Math.atan(vn(t.z))),r=t.obstacles.some(m=>!m.passed&&m.z>t.z&&m.z<t.z+t.speed*2.5),u=t.surge>0&&r?I.surgeTauNearRow:I.surgeTau;t.surge+=(-9.8*i-t.surge/u)*o,t.surge=s?Math.max(I.surgeMin,Math.min(I.surgeMax,t.surge)):0,d1(t,o,r,s);const h=s?fr(t.z,t.diff)*c*$1(t)+t.surge+t.tailwind:24;t.speed+=(h-t.speed)*(1-Math.exp(-o*3)),t.z+=t.speed*o,s&&B1(t);const l=wn(t.z)*2+(Qt(t.z)>.5?1:0);l!==t.sectionIndex&&(t.sectionIndex=l,t.events.push({type:"section",open:l%2===1,index:l})),W1(t),X1(t,o),Y1(t,o),t.thermalT>0&&t.thermalT<=o&&t.obstacles.some(m=>(m.kind==="bridge"||m.kind==="ridge"||m.kind==="overhang")&&m.z>t.z&&m.z<t.z+t.speed*2.2)&&(t.thermalT=o*2),t.thermalT=Math.max(0,t.thermalT-o);const f=t.thermalT>0?I.thermalHeight:0;if(t.thermalV+=(f-t.thermalV)*(1-Math.exp(-o*(t.thermalT>0?2.5:1.8))),t.v=t.thermalV+t.windLift+t.moveV,t.stunT=Math.max(0,t.stunT-o),s&&O1(t,o),s){for(const m of t.obstacles)if(!(m.passed||m.z-t.z>6)){if(Vo(m,t.x,t.v,m.z-t.z)){if(m.passed=!0,Q1(t,m),t.mode==="crash")return;continue}ig(m,t.z)&&(m.passed=!0,t.time-t.dodgeTime<=I.nearMissWindow+.1&&Vo(m,t.dodgeX,t.alt?t.dodgeV:t.thermalV,0)&&(t.combo++,t.comboT=0,t.multNear=I.multStep*t.combo,gr(t),ca(t,"nearMiss",25*t.mult),t.events.push({type:"near-miss",combo:t.combo,kind:m.kind})))}G1(t),f1(t),t.comboT+=o,t.comboT>I.comboBreak&&t.combo>0&&(t.combo=0,t.multNear=0),s1(t),t.score+=t.speed*o*t.mult}}function xe(t){return Math.floor(t.score+t.bonus)}const tp=["keydown","pointerdown","pointerup","touchstart","touchend","click"],np=1500,ep=1e3;function op(t){let n=-1/0;t.addEventListener("statechange",()=>{t.state==="running"&&(n=performance.now())});const e=()=>{t.state!=="running"&&t.state!=="closed"&&t.resume()};for(const a of tp)window.addEventListener(a,e,{capture:!0,passive:!0});let o=-1/0;return window.addEventListener("pointermove",()=>{const a=performance.now();t.state!=="suspended"||a-o<np||(o=a,t.resume())},{passive:!0}),{resume:e,justWoke:()=>t.state!=="running"||performance.now()-n<ep}}const ap="skyrun-audio";function sp(t,n){const e=`${Date.now()}-${Math.random()}`;let o=null;try{o=new BroadcastChannel(ap)}catch{}let a=!1;const s=()=>{t.state==="running"&&(a=!0,t.suspend())};t.addEventListener("statechange",()=>{t.state==="running"&&(a=!1,o?.postMessage(e))}),o?.addEventListener("message",i=>{i.data!==e&&s()}),addEventListener("pagehide",s);const c=()=>{a&&!document.hidden&&t.resume().catch(()=>{})};addEventListener("pageshow",i=>{i.persisted&&c()}),n&&document.addEventListener("visibilitychange",()=>{document.hidden?s():c()})}const ip=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss","festival-whoosh"],Vu=["khen-dep-lam","khen-bay-pro","khen-ai-can","pk-quay-len","pk-phe-qua","pk-nhanh-qua","pk-ky-luc-chop","pk-pha-ky-luc","tiec-suyt-ky-luc","tiec-lam-lai","tiec-xem","tiec-mot-tim","treu-moi-cat-canh","treu-khoi-dong","treu-hon-vach","treu-lai-nua","dx-bay-kieu-gi","dx-vach-dung-yen","dx-nhin-duong","dx-de-ma","dx-ky-luc-cuoi","khen-sat-rat","pk-hu-hon","khen-tay-lai-lua","pk-cay-mat","pk-gom-den"],qu=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua","ngan-yeah","ngan-wiii","ngan-nhanh-ghe","ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ui-da","ngan-oi","ngan-ui","ngan-co-len","ngan-rang-len","ngan-ngon","ngan-them-ne","ngan-tiec-ghe","ngan-oi-khong","ngan-di-ne","ngan-len-nao","ngan-hay","ngan-ghe-chua"],yr=["treu-cabin","dx-thap-dung-yen","tiec-rot-may","tiec-nhay-lai"],Wu=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may","pk-len-duong","pk-bay-thoi",...Vu,...yr,...qu],Yu=["ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may"],ju=["khe-da","thung-lung"],M0={"wind-loop":.6},fi=new URLSearchParams(location.search).get("voice"),cp=fi&&/^[a-z_]+$/.test(fi)?`audio-opts/voice/${fi}`:"audio/voice",Xu=t=>Wu.includes(t)?`${cp}/${t}.mp3`:`audio/${t}.mp3`,rp=new Set(Object.values($.zoneLines??{})),lp=[...$.zoneNames?ju:[],...Yu.filter(t=>!rp.has(t)),...gt.region==="mu-cang-chai"?[]:["festival-whoosh"],...gt.region==="fansipan"?[]:yr],Zu=new Map,hp=bu.then(vu),up=[...Vu,...yr,...qu];for(const t of[...ip,...Wu]){if(lp.includes(t))continue;const n=up.includes(t)?hp:bu;Zu.set(t,n.then(()=>fetch(Xu(t))).then(e=>e.ok?e.arrayBuffer():null).catch(()=>null))}function mp(t){const n=new Map;for(const[e,o]of Zu)o.then(async a=>{if(!a)return;const s=await t.decodeAudioData(a.slice(0)).catch(()=>null);s&&n.set(e,M0[e]?fp(t,s,M0[e]):s)});return{get:e=>n.get(e),play(e,o,a={}){const s=n.get(e);if(!s)return null;const c=t.createBufferSource();c.buffer=s,c.loop=a.loop??!1,c.playbackRate.value=a.rate??1;const i=t.createGain();i.gain.value=a.vol??1;let r=c.connect(i);if(a.pan){const u=t.createStereoPanner();u.pan.value=a.pan,r=r.connect(u)}return r.connect(o),c.start(),c}}}function dp(t,n){const e=Math.floor(n*t.sampleRate),o=t.length-e;if(o<=e)return t.duration;for(let a=0;a<t.numberOfChannels;a++){const s=t.getChannelData(a);for(let c=0;c<e;c++){const i=c/e;s[c]=s[c]*Math.sqrt(i)+s[o+c]*Math.sqrt(1-i)}}return o/t.sampleRate}function fp(t,n,e){const o=Math.floor(e*n.sampleRate),a=n.length-o;if(a<=o)return n;const s=t.createBuffer(n.numberOfChannels,a,n.sampleRate);for(let c=0;c<n.numberOfChannels;c++){const i=n.getChannelData(c),r=s.getChannelData(c);r.set(i.subarray(0,a));for(let u=0;u<o;u++){const h=u/o;r[u]=i[u]*Math.sqrt(h)+i[a+u]*Math.sqrt(1-h)}}return s}const gp=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9},{id:"kpop-anthem-1",label:"We Rise",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 122 bpm",file:"audio/music/kpop-anthem-1.mp3",lufs:-13.8},{id:"cophong-vocal-1",label:"Bay lên",style:"Cổ phong pop · hát tiếng Việt, đàn tranh, sáo trúc · 128 bpm",file:"audio/music/cophong-vocal-1.mp3",lufs:-13.5},{id:"cophong-edm-1",label:"Cổ phong",style:"Cổ phong EDM · đàn tranh, sáo trúc, đàn nhị, khèn · 130 bpm",file:"audio/music/cophong-edm-1.mp3",lufs:-15.1},{id:"dem-hoi-1",label:"Đêm hội đèn trời",style:"EDM lễ hội · khèn, sáo lá, đàn môi, cồng · 124 bpm",file:"audio/music/dem-hoi-1.mp3",lufs:-16.9},{id:"cophong-vinahouse-1",label:"Cổng Trời",style:"Vinahouse cổ phong · đàn tranh, sáo, chuông ngựa · 134 bpm",file:"audio/music/cophong-vinahouse-1.mp3",lufs:-15.5},{id:"kpop-anthem-2",label:"Above the Clouds",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 124 bpm",file:"audio/music/kpop-anthem-2.mp3",lufs:-15.3},{id:"kpop-hiphop-1",label:"Fly High",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 124 bpm",file:"audio/music/kpop-hiphop-1.mp3",lufs:-14.5},{id:"kpop-hiphop-2",label:"Light It Up",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 122 bpm",file:"audio/music/kpop-hiphop-2.mp3",lufs:-14.4},{id:"kpop-anthem-3",label:"Touch the Sky",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 126 bpm",file:"audio/music/kpop-anthem-3.mp3",lufs:-13.5},{id:"kpop-vocal-2",label:"Sea of Clouds",style:"K-pop dance-pop · có hát, khèn, sáo · 130 bpm",file:"audio/music/kpop-vocal-2.mp3",lufs:-12.9}],k0={"khau-pha":["music-flight","taybac-3","vinahouse-1","kpop-trap-1","dem-hoi-1"],"ha-giang":["ha-giang-1","cophong-vocal-1","cophong-edm-1","vinahouse-2","cophong-vinahouse-1"],"mu-cang-chai":["edm-vocal-1","taybac-2","kpop-dance-1","kpop-hiphop-1","kpop-hiphop-2"],fansipan:["kpop-vocal-1","kpop-anthem-1","kpop-dance-2","kpop-anthem-2","kpop-anthem-3","kpop-vocal-2"]},Qu=t=>gp.find(n=>n.id===t),Fs=t=>(k0[t]??k0["khau-pha"]).map(n=>Qu(n)),Ju="skyrun.settings",tm="skyrun.sound";function nm(){try{const t=JSON.parse(localStorage.getItem(tm)??"{}");if(t.v===2)return{sfx:t.sfx!==!1,music:t.music!==!1};const n=t.muted===!0;return{sfx:!n,music:!n&&t.music!==!1}}catch{return{sfx:!0,music:!0}}}function pp(t){try{localStorage.setItem(tm,JSON.stringify({v:2,...t}))}catch{}}const vp=["on","dim","off"];let Ac="shuffle";function jo(){try{const t=JSON.parse(localStorage.getItem(Ju)??"{}");return{music:Ac,ghosts:vp.includes(t.ghosts)?t.ghosts:"on"}}catch{return{music:Ac,ghosts:"on"}}}function em(t){t.music!==void 0&&(Ac=t.music);try{const{ghosts:n}={...jo(),...t};localStorage.setItem(Ju,JSON.stringify({ghosts:n}))}catch{}}const yo=3,yp=-13.1,bp=20,S0=32e3,wp=t=>{if(t.sampleRate<=S0)return t;try{return new OfflineAudioContext(2,1,S0)}catch{return t}},Xa=Fs(Bt),xp=t=>Xa.find(n=>n.id===t)??null,gi=t=>{if(t===null)return Xa[0];const n=Xa.filter(e=>e.id!==t);return n[Math.floor(Math.random()*n.length)]??Xa[0]};function Mp(t,n){const e=new Map,o=wp(t);let a=!1;dr.then(()=>a=!0);let s=!1,c=jo().music;const i=()=>c==="shuffle"?null:xp(c);let r=gi(null),u=null;const h=g=>{let v=e.get(g.id);return v||e.set(g.id,v={bytes:Zf(g.file),buf:null,loop:0,decoding:!1}),v},l=(...g)=>{for(const v of e.keys())g.includes(v)||e.delete(v)},f=(g,v)=>{const p=h(g);return p.buf?!0:(v&&!p.decoding&&(p.decoding=!0,p.bytes.then(async k=>{const b=k&&await o.decodeAudioData(k).catch(()=>null);b&&e.get(g.id)===p&&(p.loop=dp(b,yo),p.buf=b)})),!1)},m=g=>Math.min(1.6,10**((yp-g.lufs)/20)),d=(g,v)=>{const p=t.currentTime,k=e.get(g.id),b=t.createBufferSource();b.buffer=k.buf,b.loop=!0,b.loopEnd=k.loop;const w=t.createGain();if(w.gain.setValueAtTime(0,p),w.gain.linearRampToValueAtTime(m(g),p+v),b.connect(w).connect(n),b.start(p,yo),u){const y=u.gain.gain;y.cancelScheduledValues(p),y.setValueAtTime(y.value,p),y.linearRampToValueAtTime(0,p+v),u.src.stop(p+v+.05)}u={t:g,src:b,gain:w,at:p-yo,loop:k.loop},r=i()?g:gi(g.id),l(g.id,r.id),h(r)};return{tick(g){if(!g)return;const v=i();if(!u||v&&v.id!==u.t.id){const k=v??r;(u||a||s)&&f(k,!0)&&d(k,1);return}if(v||r.id===u.t.id)return;const p=u.loop-(t.currentTime-u.at)%u.loop;f(r,p<bp)&&p<yo&&d(r,yo)},choice:()=>i()?.id??"shuffle",setChoice(g){c=g==="shuffle"||Qu(g)?g:"shuffle",em({music:c}),s=!0,!(i()||!u)&&(r=gi(u.t.id),l(u.t.id,r.id),h(r))},playing:()=>u?.t??null,loading:()=>{const g=i()??(u?null:r);return g&&g.id!==u?.t.id&&!e.get(g.id)?.buf?g:null},held:()=>[...e].map(([g,v])=>v.buf?`${g}:pcm`:g)}}const ra=ct*gt.dayCycles,hs=gt.dayCutPhase-Rt+ra,om={"mu-cang-chai":"Mù Cang Chải","khau-pha":"Khau Phạ","ha-giang":"Hà Giang",fansipan:"Fansipan"};function am(t){return t<hs?1:2+Math.floor((t-hs)/ra)}function Nc(t){return t<=1?0:hs+(t-2)*ra}const kp={"khau-pha":0,"ha-giang":1,"mu-cang-chai":2,fansipan:3},ro={value:0},br={value:-1e9},us={value:[-1e9,0,-1e9,0]},sm={value:-1e9};let ms="khau-pha";function Sp(t){ms=t,ro.value=kp[t]}const Ae=()=>ms,lo=()=>ro.value===1?1:0,oe=()=>ro.value===2?1:0;function im(t={}){return Object.defineProperties({...t},{REGION_MC:{enumerable:!0,get:()=>ms==="mu-cang-chai"?1:!1},REGION_FP:{enumerable:!0,get:()=>ms==="fansipan"?1:!1}})}const wr=`uniform float uRegionHg;
float regionIs(float id) { return float(abs(uRegionHg - id) < 0.5); }`;function cm(t,n=!1){return{dusk:(n?.34:.62)*(1-R(0,.08,t))+.5*R(.52,.66,t)+.5*R(.68,.78,t)-.38*R(.95,1,t),morn:R(.03,.14,t)*(1-R(.3,.45,t))}}function Tp(t){const n=am(t),e=Nc(n),o=Math.min(1,Math.max(0,(t-e)/(n===1?hs:ra)));return{day:n,region:Ae(),u:o,...cm(o,n===1)}}function Ap(t){return t.u>=.95?"Rạng sáng":t.u>=.74?"Đêm đèn trời":t.u>=.56?"Hoàng hôn":t.u<.1?"Bình minh":t.u<.4?"Buổi sáng":"Chiều vàng"}function rm(t){const n=t.u<.5?0:t.dusk>=.98?2:t.dusk>=.48?1:0;return(t.day-1)*3+n}function Np(t){let n=null;const e=a=>{n=a===null?null:{day:1,region:Ae(),u:a,...cm(a,!0)}},o=a=>{n=a===null?null:{day:1,region:Ae(),u:.52+.26*a,dusk:a,morn:0}};return t.has("dusk")&&o(Number(t.get("dusk"))),t.has("clock")&&e(Number(t.get("clock"))),{at:a=>n??Tp(a),forceU:e,forceDusk:o}}const T0=.7,A0=110,Cp=1.6,zp=3;let Cc=null,N0=-1/0;function Ep(){const t=Cc;return Cc=null,t}function Lp(t){const n=new Float32Array(t).fill(Number.NaN),e={x:0,y:0,z:0};let o=Number.NaN,a=Number.NaN,s=0,c=0,i=!1,r=0,u=1;return{begin(h,l){c=l-a,i=c>0&&c<.5&&Math.abs(h-o)<60,o=h,a=l,s=l,D(h,0,zp,e);const f=zt(h);r=Math.sin(f),u=Math.cos(f)},watch(h,l,f){const m=l.elements,d=m[12]-e.x,g=m[13]-e.y,v=m[14]-e.z,p=d*r+v*u,k=n[h];if(n[h]=p,!i||!(k>p)||p<=0)return;const b=(k-p)/c;if(p/b>T0||k/b<=T0)return;const w=d*u-v*r,y=Math.hypot(w,g);y>A0||Math.abs(s-N0)<Cp||(N0=s,Cc={pan:-.85*Math.max(-1,Math.min(1,w/60)),near:1-y/A0,big:f})}}}const lm=`
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
`;function _p(t){const n=t?64:96,e=[0];for(let c=5;c<4500;c=c<50?c+5:c*(t?1.12:1.07))e.push(c);e.push(4500);const o=new Float32Array(e.length*n*3);e.forEach((c,i)=>{for(let r=0;r<n;r++){const u=r/n*Math.PI*2;o.set([c*Math.cos(u),0,c*Math.sin(u)],(i*n+r)*3)}});const a=[];for(let c=e.length-2;c>=0;c--)for(let i=0;i<n;i++){const r=c*n+i,u=c*n+(i+1)%n;a.push(r,r+n,u,u,r+n,u+n)}const s=new ht;return s.setAttribute("position",new G(o,3)),s.setIndex(a),s}const ye=8;function hm(t,n,e,o,a){const s=n-t;if(s<=1||a<=t+4)return Number.NaN;const c=Math.min(1,Math.pow((a-t)/s,1/1.5)),i=e*q(.2,.55,o);return i+c*(e-i)}function um(t,n){const e=J(t),o=$.road(e);if(o<.02)return null;const a=Pt(t),s=Qt(t),c=a-$.roadDepth(e),i=hm(mm(t),a,bn(t),s,c);return Number.isNaN(i)?null:(n.lat=i,n.y=c,n.amount=o,n)}function mm(t){const n=Pt(t);return q(n-q(150,240,Qt(t))-ia(t),Y(t)-13,Bs(t))}const Rp=2.6,Ip=60,dm=[];for(const t of on.segs)t.k===0||Math.abs(t.k*t.len)<Rp||dm.push({x:t.x+Math.cos(t.th)/t.k,z:t.z-Math.sin(t.th)/t.k,r:Math.abs(1/t.k)-Ip,u:t.u0});function Pp(t,n,e){const o=on,a=Math.round((n+o.oz-o.bz)/o.endZ);for(let s=a-1;s<=a+1;s++)for(const c of dm){const i=s*o.endX-o.ox+c.x,r=s*o.endZ-o.oz+c.z,u=Math.hypot(t-i,n-r)/c.r;if(u>=1)continue;const h=s*gn-an+c.u,l=Pt(h)-q(150,240,Qt(h+300))-ia(h+300),f=Pt(h)+70+50*(Ft(t/70,n/70,3,91)-.5);let m=l+(f-l)*Math.pow(1-u*u,.6)+40*(Ft(t/45,n/45,3,94)-.5)*(1-u);const d=(m-l)/45+.8*(Ft(t/90,n/90,2,93)-.5);m=q(m,l+(Math.floor(d)+R(.55,1,d-Math.floor(d)))*45,.85),m>e&&(e=q(e,m,1-R(.75,1,u)))}return e}const Bp=128,Hp=1024,C0=new Map,pi={s:0,lat:0,dist:0},z0=1e-6;function Fp(t,n,e,o,a){const s=Math.floor((o+an)/gn),c=Math.floor((a+an)/gn);let i=1/0;for(let u=s;u<=c;u++){const h=u*t.endX-t.ox,l=u*t.endZ-t.oz,f=u*gn-an;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||(i=Math.min(i,Math.hypot(n-h-m.bx,e-l-m.bz)+m.br))}}let r=1/0;for(let u=s;u<=c;u++){const h=u*t.endX-t.ox,l=u*t.endZ-t.oz;if(Math.hypot(n-h-t.bx,e-l-t.bz)-t.br>i+z0)continue;const f=u*gn-an;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||Math.hypot(n-h-m.bx,e-l-m.bz)-m.br>i+z0||(Kg(m,n-u*t.endX+t.ox-m.x,e-u*t.endZ+t.oz-m.z,Math.max(0,o-d),Math.min(m.len,a-d),pi),pi.dist<r&&(r=pi.dist),r<i&&(i=r))}}return r}const E0=new WeakMap;function Gp(t,n,e){let o=E0.get(t);o||E0.set(t,o=new Map);const a=n*4096+e,s=o.get(a);if(s)return s;const c=t.segs[e],i=n*t.endX-t.ox+c.x,r=n*t.endZ-t.oz+c.z,u=Math.sin(c.th),h=Math.cos(c.th),l={x:i,z:r,s0:n*gn-an+c.u0,len:c.len,k:c.k,th:c.th,sin:u,cos:h,cx:c.k===0?0:i+h/c.k,cz:c.k===0?0:r-u/c.k,r:c.k===0?0:Math.abs(1/c.k),sg:Math.sign(c.k),bx:n*t.endX-t.ox+c.bx,bz:n*t.endZ-t.oz+c.bz,br:c.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return L0(t,n,e,-1,l,"p",c.k===0),L0(t,n,e,1,l,"n",c.k===0),o.set(a,l),l}function $p(t,n,e,o,a){const s=o*Math.SQRT2/2,c=(n+.5)*o,i=(e+.5)*o,r=Math.round((i+t.oz-t.bz)/t.endZ),u=Fp(t,c,i,(r-3)*gn-an,(r+4)*gn-an),h=u+2*s+a,l=[];for(let m=r-3;m<=r+4;m++){const d=m*t.endX-t.ox,g=m*t.endZ-t.oz;if(Math.hypot(c-d-t.bx,i-g-t.bz)-t.br>h)continue;const v=t.segs.length-1;for(let p=0;p<=v;p++){const k=t.segs[p];Math.hypot(c-d-k.bx,i-g-k.bz)-k.br>h||l.push(Gp(t,m,p))}}const f=l.map(m=>({c:m,d:Math.hypot(c-m.bx,i-m.bz)-m.br}));return f.sort((m,d)=>m.d-d.d),{far:u-s>600,cands:f.map(m=>m.c)}}function L0(t,n,e,o,a,s,c){const i=t.segs.length-1;for(let r=0;r<=i;r++){e+=o,e<0?(e=i,n--):e>i&&(e=0,n++);const u=t.segs[e];if(u.k===0){if(c)continue;return}const h=n*t.endX-t.ox+u.x+Math.cos(u.th)/u.k,l=n*t.endZ-t.oz+u.z-Math.sin(u.th)/u.k;s==="p"?(a.pcx=h,a.pcz=l,a.pr=Math.abs(1/u.k)):(a.ncx=h,a.ncz=l,a.nr=Math.abs(1/u.k));return}}function _0(t,n,e,o,a,s,c){const i=Math.floor(e/a),r=Math.floor(o/a),u=(i*1000003+r)*2+s;let h=t.get(u);return h||t.set(u,h=$p(n,i,r,a,c)),h}function Op(t,n,e,o){const a=`${e}`;let s=C0.get(a);(!s||s.size>4e4)&&C0.set(a,s=new Map);const c=_0(s,o,t,n,Hp,1,e);return c.far?c.cands:_0(s,o,t,n,Bp,0,e).cands}const va=30;function la(t,n,e,o,a=on){const s=Op(t,n,e,a);let c=1/0,i=0,r=0;for(const h of s){if(Math.hypot(t-h.bx,n-h.bz)-h.br>c+e)continue;let l,f,m=1/0;if(h.k===0){const b=t-h.x,w=n-h.z;l=b*h.sin+w*h.cos,f=b*h.cos-w*h.sin}else{const b=t-h.cx,w=n-h.cz;let x=Math.atan2(h.sg*w,-h.sg*b)-h.th;if(x-=2*Math.PI*Math.round((x-h.k*h.len/2)/(2*Math.PI)),l=x/h.k,m=Math.hypot(b,w),f=h.sg*(h.r-m),m<va){const M=R0[r++]??={s:0,lat:0,dist:0,prom:0,core:0};M.s=h.s0+h.len/2,M.lat=0,M.dist=h.r-m,M.prom=0,M.core=1-m/va*(m/va)*(3-2*m/va)}m+=h.r}if(l<-.01||l>h.len+.01)continue;const d=Math.abs(f);if(d>c+e)continue;d<c&&(c=d);const g=h.s0+Math.min(h.len,Math.max(0,l));let v=!1;for(let b=0;b<i;b++)Math.abs(o[b].s-g)<.5&&(v=!0);if(v)continue;let p=m-d;h.pr>0&&(p=Math.min(p,Math.hypot(t-h.pcx,n-h.pcz)+h.pr-d)),h.nr>0&&(p=Math.min(p,Math.hypot(t-h.ncx,n-h.ncz)+h.nr-d));const k=o[i]??={s:0,lat:0,dist:0,prom:0,core:0};k.s=g,k.lat=f,k.dist=d,k.prom=Math.max(0,p),k.core=0,i++}let u=0;for(let h=0;h<i;h++){if(o[h].dist>c+e)continue;const l=o[u],f=o[h];l.s=f.s,l.lat=f.lat,l.dist=f.dist,l.prom=f.prom,l.core=0,u++}for(let h=0;h<r;h++){const l=o[u++]??={s:0,lat:0,dist:0,prom:0,core:0},f=R0[h];l.s=f.s,l.lat=f.lat,l.dist=f.dist,l.prom=f.prom,l.core=f.core}return u}const R0=[],I0=[];function Ne(t,n,e,o){const a=la(t,n,0,I0);for(let s=0;s<a;s++){const c=I0[s];if(c.core===0&&Math.abs(c.s-e)<=Math.abs(o)+80)return!0}return!1}const fm=380,gm=160,Dp=220,pm=250,Up=150,ft={x:0,z:0,n210:NaN,n90:NaN,roll:NaN,ridge:NaN};function Kp(t,n){ft.x=t,ft.z=n,ft.n210=ft.n90=ft.roll=ft.ridge=NaN}const Vp=()=>Number.isNaN(ft.n210)?ft.n210=Ft(ft.x/210,ft.z/210,3,21):ft.n210,xr=t=>t>10?36*(Vp()-.5)*R(10,90,t):0,vm=(t,n)=>t.rise?t.rise(n):Dp,ym=(t,n)=>t.fall?t.fall(n):pm,$o=(t,n)=>Y(n)-t.shelf(J(n));function zc(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.min(t,n)-o*o*e/4}const qp=40,Wp=.6,Yp=2.1,jp=16;function Xp(t,n,e,o,a){if(!t.wall)return a;const s=J(n),c=t.wall(s);if(c<=0)return a;const i=e*sa(n+t.wallRef(s)-s,150)>0?o:-o,r=t.wallLip?.(s)??qp,u=r-i;let h=Y(n)-9.1-(u>0?Yp:Wp)*u;i>r-4&&(h-=jp*R(.42,.62,Ft(ft.x/55,ft.z/55,2,33))*R(r-4,r+18,i));const l=Pt(n)-t.wallTop(s)+.5*xr(o);return q(a,Math.max(a,zc(h,l,25)),c)}function Zp(t,n,e,o){const a=J(n),s=Y(n)-t.shelf(a),c=o-t.bench(a);if(c<=0)return Number.isNaN(ft.n90)&&(ft.n90=Ft(ft.x/90,ft.z/90,2,71)),s+1.2*(ft.n90-.5);const i=Pt(n)-fm,r=sa(n,150),u=e*r>0?t.hill(a)*R(5e-4,.002,Math.abs(r)):0;let h=s+(i-s)*(1-Math.exp(-c/ym(t,a)));const l=t.crown?.(a)??0;l>0&&(h=q(h,s+(i-s)*(1-Math.exp(-((c/Up)**2))),l));const f=s+gm*(1-Math.exp(-c/vm(t,a)));let m=q(h,f,u)+xr(c);const d=R(260,800,c);d>0&&(Number.isNaN(ft.roll)&&(ft.roll=Ft(ft.x/650,ft.z/650,3,5)),m=Math.max(m,i+d*(20+320*R(.38,.78,ft.roll))));const g=R(1200,5e3,c);return g>0&&(Number.isNaN(ft.ridge)&&(ft.ridge=xc(ft.x/3200,ft.z/3200,5,9)),m+=g*(250+1150*ft.ridge)),m}const Qp=1.7,Ke=2*Math.PI,Jp=t=>t-Ke*Math.round(t/Ke),ds=[];if($.hillside)for(const t of on.segs){if(t.k===0||Math.abs(t.k*t.len)<Qp)continue;const n=t.x+Math.cos(t.th)/t.k,e=t.z-Math.sin(t.th)/t.k,o=Te(t,0),a=Te(t,t.len/2),s=Math.atan2(o.z-e,o.x-n);ds.push({cx:n,cz:e,r:Math.abs(1/t.k),len:t.len,u0:t.u0,a0:s,sgn:Math.sign(Jp(Math.atan2(a.z-e,a.x-n)-s))})}const P0=new Map;function t2(t,n,e,o){const a=e*64+n;let s=P0.get(a);if(s===void 0){s=-1/0;for(let c=0;c<=ds[n].len;c+=20)s=Math.max(s,$o(t,o+c));P0.set(a,s)}return s}function n2(t,n,e,o,a){const s=Math.round((e+on.oz-on.bz)/on.endZ);for(let c=s-1;c<=s+1;c++)for(let i=0;i<ds.length;i++){const r=ds[i],u=c*on.endX-on.ox+r.cx,h=c*on.endZ-on.oz+r.cz,l=Math.hypot(n-u,e-h);if(l>r.r+4*pm)continue;const f=c*gn-an+r.u0,m=r.r-t.bench(J(f+r.len/2))-8,d=R(5,45,a);if(l>=m&&d<=0)continue;let g=r.sgn*(Math.atan2(e-h,n-u)-r.a0)%Ke;g<0&&(g+=Ke);const v=g*r.r;let p,k;if(v<=r.len)p=$o(t,f+v),k=t.bench(J(f+v));else{const x=(v-r.len)/(Ke*r.r-r.len),M=f+v-Ke*r.r;p=q($o(t,f+v),$o(t,M),x),k=q(t.bench(J(f+v)),t.bench(J(M)),x)*(1-Math.sin(Math.PI*x))}const b=r.r-l;let w;if(b>k){const x=t2(t,i,c,f),M=q(p,x,R(m,.25*r.r,l)),C=vm(t,J(f+Math.min(v,r.len)));w=Math.min(M+gm*(1-Math.exp(-(b-k)/C)),x+t.peak(J(f)))+xr(b-k)}else if(b>=-k)w=p;else{const x=Pt(f)-fm;w=p+(x-p)*(1-Math.exp(-(-b-k)/ym(t,J(f+Math.min(v,r.len)))))}const y=Math.max(o,q(o,w,d));o=l<m?q(y,w,1-R(m-30,m,l)):y}return o}const B0=200,e2=60,o2=1.5,H0=10,a2=1.6,vi=[];function s2(t,n,e){const o=$.hillside;Kp(t,n);const a=la(t,n,B0,vi);let s=1/0;for(let l=0;l<a;l++){const f=vi[l];f.core===0&&f.dist<s&&(s=f.dist,e.s=f.s,e.lat=f.lat)}let c=0,i=0;for(let l=0;l<a;l++){const f=vi[l];if(f.core>0)continue;const m=(1-R(0,B0,f.dist-s))*(R(0,e2,f.prom)+1e-4);m<=0||(c+=m*Zp(o,f.s,f.lat,f.dist),i+=m)}const r=s-o.bench(J(e.s));c=n2(o,t,n,c/i,r);const u=$o(o,e.s)+40+o2*Math.max(0,r);c>u-30&&(c=zc(c,u,30)),c=Xp(o,e.s,e.lat,s,c);const h=Y(e.s)-9.1+a2*Math.max(0,s-H0);return s<H0?c=Math.min(c,h):c>h-6&&(c=zc(c,h,6)),e.vil=Xt(e.s)*(1-R(0,25,s-o.bench(J(e.s)))),e.h=c,e}const F0=24,Bn=520,bo=15,i2=14,G0=200,c2=60,ot={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},Re={n210:()=>Number.isNaN(ot.n210)?ot.n210=Ft(ot.x/210,ot.z/210,3,21):ot.n210,n700:()=>Number.isNaN(ot.n700)?ot.n700=Ft(ot.x/700,ot.z/700,3,5):ot.n700,n500:()=>Number.isNaN(ot.n500)?ot.n500=Ft(ot.x/500,ot.z/500,2,3):ot.n500,out:()=>Number.isNaN(ot.out)?ot.out=90*xc(ot.x/800,ot.z/800,4,7)+30*(Ft(ot.x/160,ot.z/160,3,11)-.5):ot.out,far:()=>Number.isNaN(ot.far)?ot.far=250+1150*xc(ot.x/3200,ot.z/3200,5,9):ot.far,n90:()=>Number.isNaN(ot.n90)?ot.n90=Ft(ot.x/90,ot.z/90,2,71):ot.n90},ut={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function r2(t,n){const{o:e,ty:o,w:a,sill:s,fly:c,vil:i,xd:r,ra:u,rd:h}=ut,l=q(o-q(150,240,e)-r,c-13,s),f=Cn(r/190),m=o-l;let d;if(t<=a){const y=a*q(.2,.55,e),x=Cn((t-y)/(a-y));d=l+m*q(Math.pow(x,1.5),x*x*(3-2*x),e),e>0&&(d+=e*34*(Re.n210()-.35)*R(25,110,t))}else{const y=Cn((t-a)/q(280,700,e));d=o+(q(400,-50,e)-260*f+140*(Re.n700()-.5))*(1-(1-y)*(1-y))}const g=R(a*.9,a*1.25,t),v=R(bo+8,bo+22,t)*(1-g)*(1-e),p=q(F0,F0*.5,v),k=Math.max(.7*g,.85*v)*(1-.6*f);if(k>0){const y=(d+30*(Re.n500()-.5))/p;d=q(d,(Math.floor(y)+R(.45,1,y-Math.floor(y)))*p,k)}g>0&&(d+=g*Re.out());const b=R(a+900,a+5e3,t);if(b>0&&(d+=b*Re.far()),u>.02&&n>0){const y=o-h,x=hm(l,o,a,e,y);if(!Number.isNaN(x)){const M=u*R(x-3,x-.5,t)*(1-R(x+ye+1,x+ye+4,t));M>0&&(d=Math.min(d,q(d,y-.4,M)))}}const w=i*(1-R(240,380,t));if(w>0&&(d=q(d,c-Go+1.6*(Re.n90()-.5)-.012*Math.max(0,t-40),w)),d-=6*(1-R(0,18,t))*(d<l+20?1-s:0),t<bo){const y=q(i2+(bo-t)*2,11+(bo-t)*.3,s);d=Math.min(d,c-q(y,Go+.4,i))}return d}const yi=[],$0=[],O0=new Map,ya=181/Bn;function l2(t,n){const e=t*100003+n;let o=O0.get(e);if(o!==void 0)return o;const a=(t+.2+.6*N(t,n,61))*Bn,s=(n+.2+.6*N(t,n,62))*Bn,c=70+110*N(t,n,63),i=la(a,s,0,$0)>0?$0[0]:null;if(!i||Qt(i.s)<.6||i.dist<c+45)o=null;else{const r=Tc(i.s);o={ox:a,oz:s,r:c,floor:r,peak:Pt(i.s)-200+230*N(t,n,64)}}return O0.set(e,o),o}function h2(t,n,e){const o=Math.floor(t/Bn),a=Math.floor(n/Bn),s=t/Bn-o,c=n/Bn-a;for(let i=-1;i<=1;i++)if(!(i<0&&c+.2>=ya||i>0&&1.2-c>=ya))for(let r=-1;r<=1;r++){if(r<0&&s+.2>=ya||r>0&&1.2-s>=ya)continue;const u=o+r,h=a+i,l=(u+.2+.6*N(u,h,61))*Bn,f=(h+.2+.6*N(u,h,62))*Bn,m=Math.hypot(t-l,n-f)/(70+110*N(u,h,63));if(m>=1)continue;const d=l2(u,h);if(!d)continue;const g=d.floor+(d.peak-d.floor)*Math.pow(1-m*m,.6);g>e&&(e=q(e,g,1-R(.8,1,m)))}return e}function Ec(t,n,e){if(!Number.isFinite(t+n))return e.h=e.s=e.lat=e.vil=NaN,e;if($.hillside)return s2(t,n,e);ot.x=t,ot.z=n,ot.n210=ot.n700=ot.n500=ot.out=ot.far=ot.n90=NaN;const o=la(t,n,G0,yi);let a=1/0;for(let c=0;c<o;c++){const i=yi[c];i.core===0&&i.dist<a&&(a=i.dist,e.s=i.s,e.lat=i.lat)}ut.o=ut.ty=ut.w=ut.sill=ut.fly=ut.vil=ut.xd=ut.ra=ut.rd=0;let s=0;for(let c=0;c<o;c++){const i=yi[c],r=(1-R(0,G0,i.dist-a))*(i.core>0?i.core:R(0,c2,i.prom)+1e-4);if(r<=0)continue;s+=r,ut.o+=r*Qt(i.s),ut.ty+=r*Pt(i.s),ut.w+=r*bn(i.s),ut.sill+=r*Bs(i.s),ut.fly+=r*Y(i.s),ut.vil+=r*Xt(i.s),ut.xd+=r*ia(i.s);const u=J(i.s);ut.ra+=r*$.road(u),ut.rd+=r*$.roadDepth(u)}return ut.o/=s,ut.ty/=s,ut.w/=s,ut.sill/=s,ut.fly/=s,ut.vil/=s,ut.xd/=s,ut.ra/=s,ut.rd/=s,e.vil=ut.vil,e.h=Pp(t,n,h2(t,n,r2(a,e.lat))),e}const u2={h:0,s:0,lat:0,vil:0};function lt(t,n){return Ec(t,n,u2).h}const re=`
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
`,Mr=`
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
`,bm=`
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
`,m2=`
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
`,d2=`
${bm}
${m2}
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
`,f2=`
#include <fog_pars_vertex>
varying vec3 vWorld;
#ifdef CLOUD_DECK
${re}
uniform float uTime;
uniform vec4 uEye;
${Mr}
${lm}
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
}`,g2=`
#include <fog_pars_fragment>
${re}
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
${Mr}
${d2}
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
}`;function wm(t,n=!1){return new St({vertexShader:f2,fragmentShader:g2,defines:{...t?{CLOUD_LITE:1}:{},...n?{CLOUD_DECK:1}:{}},uniforms:Ln.merge([_n.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new yn(0,1)},uUnder:{value:0},uSolid:{value:n?1:0},uEye:{value:new ss},uGate:{value:new ss},uGateK:{value:new yn}}]),transparent:!0,depthWrite:!1,fog:!0,side:n?Nt:cu})}function p2(t){const n=new _,e=wm(t),o=new j(new En(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return o.frustumCulled=!1,o.renderOrder=1,{mesh:o,veil:()=>0,update(a,s,c){const i=a.position;a.getWorldDirection(n),e.uniforms.uFwd.value.set(n.x,n.z).normalize();const r=c+250,u=Qt(r);o.position.set(i.x,Tc(r)+20+(Pt(r)-($.cloudDepth??170)-Tc(r)-20)*u,i.z),sm.value=o.position.y,e.uniforms.uTime.value=s,e.uniforms.uCover.value=.62-.1*u+.5*(1-$.cloud(J(r)))}}}const v2=`
#include <fog_pars_fragment>
${re}
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
}`,y2=`
#include <fog_pars_vertex>
${re}
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
${Mr}
${bm}
${lm}
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
}`,b2={cell:90,rings:8,subs:8},w2={cell:110,rings:5,subs:4},x2=650;function M2(t,n){const e=n?w2:b2,o=[];for(let m=-e.rings;m<=e.rings;m++)for(let d=-e.rings;d<=e.rings;d++)if(!(m*m+d*d>(e.rings+.5)**2))for(let g=0;g<e.subs;g++)o.push(m,d,g);const a=o.length/3,s=new Nf;s.setAttribute("position",new G(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),s.setIndex([0,1,2,0,2,3]),s.setAttribute("aCell",new cr(new Float32Array(o),3)),s.instanceCount=0;const c=new yn,i={value:0},r={value:1},u=t.uniforms.uTime,h={...Ln.merge([_n.fog]),uOrigin:{value:c},uCell:{value:e.cell},uReach:{value:e.cell*(e.rings+.5)},uDeckY:i,uSide:r,uTime:u,uCover:t.uniforms.uCover,uEye:t.uniforms.uEye,uGate:t.uniforms.uGate,uGateK:t.uniforms.uGateK,uWallL:t.uniforms.uWallL,uWallR:t.uniforms.uWallR},l=new St({vertexShader:y2,fragmentShader:v2,defines:n?{CLOUD_LITE:1}:{},uniforms:h,fog:!0,side:Nt}),f=new j(s,l);return f.name="cloud-billows",f.frustumCulled=!1,{mesh:f,update(m,d,g){const v=m.y-d;if(s.instanceCount=g&&Math.abs(v)<x2?a:0,s.instanceCount===0)return;const p=u.value;c.set(Math.floor((m.x+2.6*p)/e.cell),Math.floor((m.z+1.3*p)/e.cell)),i.value=d,r.value=v>=0?1:-1}}}const Dn=72,bi=.9,k2=.92;function S2(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");let e=11;const o=()=>(e=e*16807%2147483647)/2147483647;for(let a=0;a<70;a++){const s=32+(o()+o()-1)*24,c=1-Math.abs(s-32)/30,i=32+(o()+o()-1)*9*c+2.5*Math.sin(s/9),r=(6+16*o())*(.5+.5*c),u=1+2*o();n.save(),n.translate(s,i),n.rotate((o()-.5)*.25),n.scale(r/2,u/2);const h=n.createRadialGradient(0,0,0,0,0,1);h.addColorStop(0,`rgba(255,255,255,${.12+.22*o()*c})`),h.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=h,n.beginPath(),n.arc(0,0,1,0,Math.PI*2),n.fill(),n.restore()}n.globalCompositeOperation="destination-out";for(let a=0;a<6;a++)n.fillStyle="rgba(0,0,0,0.5)",n.beginPath(),n.ellipse(14+36*o(),32+(o()-.5)*10,2+3*o(),1+1.5*o(),0,0,Math.PI*2),n.fill();return new aa(t)}function T2(t){const n=new Cf({size:2.6,map:S2(),color:15922683,transparent:!0,depthWrite:!1,fog:!0});return n.onBeforeCompile=e=>{e.uniforms.uPilotNdc={value:t},e.vertexShader=e.vertexShader.replace("void main() {",`attribute float aSize;
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
  diffuseColor.a *= vClear;`)},n.customProgramCacheKey=()=>"cloud-burst-wisp-clear",n}function A2(t){const n=new Float32Array(Dn*3),e=new Float32Array(Dn*3),o=new Float32Array(Dn),a=new Float32Array(Dn),s=new ht;s.setAttribute("position",new G(n,3)),s.setAttribute("aSize",new G(o,1)),s.setAttribute("aRot",new G(a,1));const c=T2(t),i=new is(s,c);i.name="cloud-burst",i.frustumCulled=!1,i.renderOrder=2,s.setDrawRange(0,0);let r=bi,u=1;const h=new _,l=new _;return{object:i,fire(f,m,d,g){r=0,u=1-.6*g,s.setDrawRange(0,Dn),s.attributes.aSize.needsUpdate=!0,s.attributes.aRot.needsUpdate=!0,h.set(0,1,0).cross(m),h.lengthSq()<.01&&h.set(1,0,0),h.normalize(),l.copy(m).cross(h).normalize();for(let v=0;v<Dn;v++){const p=v/Dn*Math.PI*2+Math.random()*.4,k=4+5*Math.random(),b=5+10*Math.random(),w=6+8*Math.random(),y=v*3;o[v]=.5+1.5*Math.random()**2,a[v]=-p+(Math.random()-.5)*.5;for(let x=0;x<3;x++){const M=h.getComponent(x)*Math.cos(p)+l.getComponent(x)*Math.sin(p);n[y+x]=f.getComponent(x)+m.getComponent(x)*w+M*k,e[y+x]=d.getComponent(x)*k2+M*b}}},update(f){if(r>=bi){s.setDrawRange(0,0);return}r+=f;const m=Math.exp(-2.6*f);for(let g=0;g<Dn*3;g++)n[g]+=e[g]*f,e[g]*=m;s.attributes.position.needsUpdate=!0;const d=r/bi;c.opacity=Math.max(0,1-d)**1.3*.62,c.color.setScalar(.96*u),c.size=3.2+4*d}}}function N2(t){const n=new _(0,-.1,1),e=new _,o=new _;let a=null,s=0;return{ndc:n,update(c){!a&&t.parent&&s++%30===0&&t.parent.traverse(i=>{!a&&i.isSkinnedMesh&&(a=i)}),a?a.getWorldPosition(e):e.copy(c.position).addScaledVector(c.getWorldDirection(o),11),e.project(c),n.set(e.x,e.y,c.aspect)}}}const wi=[-60,120,300,480,660],D0=30,C2=615,z2=1215;function E2(){const t=wi.map(()=>new _),n=wi.map(()=>new _),e={x:0,y:0,z:0},o=(s,c,i)=>(D(s,c,0,e),lt(e.x,e.z)>i),a=(s,c,i,r)=>{let u=0;for(let h=15;h<=z2;h+=h<C2?D0:2*D0){if(o(s,c*h,i)){let l=h;for(let f=0;f<3;f++){const m=(u+l)/2;o(s,c*m,i)?l=m:u=m}D(s,c*l,0,e),r.set(e.x,e.z,1);return}u=h}r.set(0,0,0)};return{left:t,right:n,update(s,c){wi.forEach((i,r)=>{a(s+i,-1,c,t[r]),a(s+i,1,c,n[r])})}}}const L2=900,_2=650,xi=.5,R2=1.2,I2=.25,wo=.2,Mi=.5,U0=.4;function P2(){const t=new WeakMap,n=new WeakSet,e=new _,o=new _;let a=-1e9,s=null;return{scan(c,i,r){for(const u of c?.gates??[])(u.hit||u.missed)&&!t.has(u)&&(t.set(u,i),u.missed&&(a=i)),u.hit&&!n.has(u)&&r>=u.z&&(n.add(u),s=u)},layer(c,i,r,u,h){const l=c.uniforms.uGateK.value,f=r?.gates.find(b=>b.deck===i&&b.z>u-80);if(!r||!f)return l.set(0,0),0;const m=h-(t.get(f)??h);f.hit?l.set(1-ba(xi,xi+R2,m),1.5*ba(0,xi,m)):f.missed?l.set(Math.max(0,1-m/I2),0):l.set(1-ba(_2,L2,f.z-u),0);const d=Ct(f.lane);D(f.z,d,0,e),D(f.z+2,d,0,o);const g=o.x-e.x,v=o.z-e.z,p=Math.hypot(g,v)||1;return c.uniforms.uGate.value.set(e.x,e.z,g/p,v/p),f.hit||!f.missed&&Math.abs(r.x-d)<=I.gateRadiusX?1-ba(30,55,Math.abs(u-f.z)):0},hold(c){const i=c-a;return i<0||i>wo+Mi+U0?0:i<wo?i/wo:i<wo+Mi?1:1-(i-wo-Mi)/U0},takeTear(){const c=s;return s=null,c}}}function ba(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}const wa=700,jt={x:70,y:36,z:70},B2=new _(4,-26,0);function H2(){const t=new Float32Array(wa*3);for(let u=0;u<wa*3;u++)t[u]=Math.random();const n=new Float32Array(wa*6),e=new ht;e.setAttribute("position",new G(n,3));const o=new ru({color:13162220,transparent:!0,opacity:0,depthWrite:!1,fog:!0}),a=new lu(e,o);a.frustumCulled=!1,a.renderOrder=3;const s=new _,c=new _,i=new _;let r=!1;return{object:a,update(u,h,l,f){if(a.visible=l>.02,!a.visible){r=!1;return}const m=u.position;r&&h>0&&c.subVectors(m,s).divideScalar(h),s.copy(m),r=!0,i.copy(B2).sub(c);const d=Math.min(3.2,1.6+i.length()/60);i.normalize().multiplyScalar(d);for(let g=0;g<wa;g++){const v=g*3;t[v+1]=(t[v+1]-26*h/jt.y+1)%1;const p=m.x+((t[v]*jt.x-m.x)%jt.x+jt.x)%jt.x-jt.x/2,k=m.y+t[v+1]*jt.y-jt.y/2,b=m.z+((t[v+2]*jt.z-m.z)%jt.z+jt.z)%jt.z-jt.z/2,w=g*6;n[w]=p,n[w+1]=k,n[w+2]=b,n[w+3]=p+i.x,n[w+4]=k+i.y,n[w+5]=b+i.z}e.attributes.position.needsUpdate=!0,o.opacity=.32*l*(1-.5*f)}}}const F2=18,G2=7,K0=.86,$2=1.2;let fs=!1;function O2(){const t=fs;return fs=!1,t}function D2(t,n){const e=new yt,o=_p(n),a=t.map(b=>{const w=wm(n,!0),y=new j(o,w);y.frustumCulled=!1,y.renderOrder=1,e.add(y);const x=E2();w.uniforms.uWallL={value:x.left},w.uniforms.uWallR={value:x.right};const M=M2(w,n);return e.add(M.mesh),{deck:b,mesh:y,material:w,billows:M,walls:x}});let s=0;const c=a.map(()=>-1e9),i=$.rain?H2():null;i&&e.add(i.object);const r=N2(e),u=A2(r.ndc);e.add(u.object);const h=P2(),l=new _,f=new _,m=new _,d=new _;let g=!1,v=-1,p=0,k=0;return{mesh:e,veil:()=>p,update(b,w,y,x){const M=b.position;h.scan(x,w,y);const C=J(y);$.waterLevel!==void 0&&(br.value=Pt(y)+$.waterLevel);const z=Math.min(.1,Math.max(0,w-k));i?.update(b,z,$.rain?.(C)??0,0),u.update(z),z>0&&d.subVectors(b.position,f).divideScalar(z).clampLength(0,120),f.copy(b.position),k=w,p=0;let E=0,T=-1;const A=d.y>0?1:-1;s++,a.forEach(({deck:L,mesh:P,material:B,billows:U,walls:W},X)=>{const Z=L.cover(C),V=Pt(y)+L.level(C);if(X<2&&(us.value[X*2]=V,us.value[X*2+1]=Z),P.visible=Z>.02,!P.visible){U.update(M,V,!1);return}P.position.set(M.x,V,M.z),Math.abs(M.y-V)<450&&((s+X*2)%4===0||Math.abs(y-c[X])>40)&&(W.update(y,V),c[X]=y),B.uniforms.uCover.value=1.1-.75*Z,B.uniforms.uTime.value=w,B.uniforms.uUnder.value=Math.min(1,Math.max(0,(V-M.y)/6+.5));let et=0;if(L.eye){let At=wn(y)*ct+L.eye.phase-Rt;y-At>ct/2&&(At+=ct),D(At,0,0,m),B.uniforms.uEye.value.set(m.x,m.z,L.eye.radius,L.eye.swirl*$2);const Lt=Math.exp(-Math.hypot(M.x-m.x,M.z-m.z)/L.eye.radius);et=Math.min(1,1.6*Lt*Lt)}const mt=h.layer(B,X,x,y,w),tt=(M.y-V)*A,wt=(1-Math.min(1,tt<0?-tt/F2:tt/G2))**2,Mt=Z*(1-et)*(1-mt)*wt;Mt>E&&(E=Mt,T=X),U.update(M,V,Z>.3)}),p=Math.max(K0*E,K0*h.hold(w));const S=h.takeTear();S&&(u.fire(M,b.getWorldDirection(l),d,0),S.deck===0&&S.up&&(fs=!0)),E>.55?(g=!0,v=T):g&&E<.25&&(g=!1,u.fire(M,b.getWorldDirection(l),d,0),v===0&&A>0&&(fs=!0)),u.object.geometry.drawRange.count>0&&r.update(b)}}}const kr=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],ha=[.8,.3,.16],xm=[.6,.32,.22],Sr=[.9,.76,.45],Mm=[.88,.84,.76],U2=[.2,.45,.36],Tr=[.45,.25,.14],km=[.58,.33,.24];function H(t,n,e=.1,o=1){const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv"),a.getAttribute("normal")||a.computeVertexNormals();const s=a.getAttribute("position"),c=new Float32Array(s.count*3),i=kr(n);for(let r=0;r<s.count;r++){const u=1-e/2+e*N(s.getX(r)*.8+o,s.getY(r)*.8+s.getZ(r)*.6,17);for(let h=0;h<3;h++)c[r*3+h]=i[h]*u}return a.setAttribute("color",new G(c,3)),a}const bt=t=>Tt(t);function Xo(t,n,e,o){const a=t.getAttribute("position"),s=t.getAttribute("color");for(let c=0;c<a.count;c++){const i=o+(1-o)*Math.min(1,Math.max(0,(a.getY(c)-n)/(e-n)));s.setXYZ(c,s.getX(c)*i,s.getY(c)*i,s.getZ(c)*i)}return t}const Ar=[1,.7,.32];function Gs(t,n,e,o,a=0,s=[.55,.2,.12]){const c=[],i=Math.max(6,Math.round(t/.45)),r=Math.max(4,Math.round(Math.hypot(n,e)/.42)),u=kr(o);for(const h of[-1,1]){const l=[],f=[],m=[];for(let g=0;g<=r;g++){const v=g/r;for(let p=0;p<=i;p++){const k=(p/i-.5)*t,b=Math.pow(Math.abs(k)/(t/2),5);l.push(k,e*(1-v)+a*b*(.35+.65*v),h*n*v*(1+.06*b));const w=(p%2?1:.72)*(g%2?1:.88)*(.8+.35*N(k*.3,v*4+h,23));f.push(u[0]*w,u[1]*w,u[2]*w)}}for(let g=0;g<r;g++)for(let v=0;v<i;v++){const p=g*(i+1)+v;h>0?m.push(p,p+i+1,p+1,p+1,p+i+1,p+i+2):m.push(p,p+1,p+i+1,p+1,p+i+2,p+i+1)}const d=new ht;d.setAttribute("position",new G(new Float32Array(l),3)),d.setAttribute("color",new G(new Float32Array(f),3)),d.setIndex(m),d.computeVertexNormals(),c.push(d.toNonIndexed())}return c.push(H(new F(t+.3,.32,.42).translate(0,e+.05,0),s,.05)),bt(c)}function Sm(t,n,e,o,a){const s=n/2,c=[];for(const r of[-1,1]){const u=r*t/2;r>0?c.push(u,e,-s,u,e+o,0,u,e,s):c.push(u,e,-s,u,e,s,u,e+o,0)}const i=new ht;return i.setAttribute("position",new G(new Float32Array(c),3)),i.computeVertexNormals(),H(i,a,.08)}function K2(t,n,e,o=ha){const s=n-4.4-.25,c=[Gs(t,3.8,4.4,o,2.2,Ar).translate(0,s,0)];for(let i=-t/2+2;i<=t/2-2;i+=3.2)for(const r of[-2.6,2.6])c.push(H(new rt(.26,.3,s-e+6,6).translate(i,(s+e-6)/2,r),Tr,.15,i));return c.push(H(new F(t-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),bt(c)}function V2(t,n={pillar:km,wall:Sr,tile:ha}){const e=[];for(const o of[-1,1])e.push(H(new F(2.4,7-t+6,2.4).translate(o*11.2,(7+t-6)/2,0),n.pillar,.2,o)),e.push(H(new F(3,.5,3).translate(o*11.2,7.2,0),[.85,.8,.7],.08,o));return e.push(H(new F(22.4,1.6,1.6).translate(0,-.2,0),Tr,.12)),e.push(H(new F(20,3.6,1.1).translate(0,2.4,0),n.wall,.1)),e.push(H(new F(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(H(new F(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(Gs(27,2.2,4.4,n.tile,1.6).translate(0,5.3,0)),bt(e)}function q2(){const t=[Xo(H(new F(.4,3.2,10).translate(0,0,0),km,.22),-1.6,.6,.62),Gs(10.2,.45,.35,ha).rotateY(Math.PI/2).translate(0,1.6,0)];for(let n=-5;n<=5;n+=2.5)t.push(Xo(H(new F(.7,3.7,.7).translate(0,.25,n),[.5,.27,.2],.15,n),-1.6,.6,.6)),t.push(H(new F(.86,.26,.86).translate(0,2.2,n),[.9,.88,.82],.06,n));return bt(t)}const W2={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function Tm(t=W2){const n=[H(new rt(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),t.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([o,a,s,c],i)=>{const r=new Rn(c,1).scale(1.15,.62,1.15).translate(o,a,s);r.deleteAttribute("uv"),r.computeVertexNormals();const u=r.getAttribute("position"),h=r.getAttribute("normal"),l=new Float32Array(u.count*3);for(let f=0;f<u.count;f++){const m=N(u.getX(f)*.9+i,u.getZ(f)*.9,u.getY(f)+31),d=h.getY(f)+(m-.5)*.7,g=d<-.05?t.under[0]:d<.12?t.under[1]:m<.6?t.flower[0]:t.flower[1],v=kr(g),p=.75+.35*Math.min(1,Math.max(0,(u.getY(f)-4.5)/4));l.set([v[0]*p,v[1]*p,v[2]*p],f*3)}r.setAttribute("color",new G(l,3)),n.push(r)}),bt(n)}const V0=[.5,.53,.56],ki=[.22,.23,.25],Ve=8,Am=Math.PI/Ve,Un=-7.4,xo=t=>new Ps(t.map(([n,e])=>new yn(n,e)),Ve,Am);function q0(t,n,e,o){const a=new _().subVectors(n,t),s=new F(e,e,a.length());return s.lookAt(a),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(s,o,.03,11)}function gs(t,n,e,o){const a=[];a.push(H(xo([[2.25,.95],[1.95,1.55],[1.1,1.9],[0,1.92]]).translate(0,Un,0),t,.05,o)),a.push(H(xo([[2.25,-.85],[2.25,-.45]]).translate(0,Un,0),t,.05,o+1)),a.push(H(xo([[0,-1.9],[1.3,-1.9],[2,-1.5],[2.25,-.85]]).translate(0,Un,0),n,.06,o+2)),a.push(H(xo([[2.27,-.45],[2.27,.95],[1.97,1.5]]).translate(0,Un,0),e,.03,o+3));for(let r=0;r<Ve;r++){const u=Am+r*Math.PI*2/Ve,h=2.3/Math.cos(Math.PI/Ve),l=new F(.2,1.45,.2).rotateY(u).translate(Math.sin(u)*h*.98,Un+.25,Math.cos(u)*h*.98);a.push(H(l,ki,.02,o+4))}a.push(H(xo([[2.29,-.62],[2.29,-.5]]).translate(0,Un,0),n,.02,o+5)),a.push(H(new rt(.75,1.05,.5,Ve).translate(0,Un+2.15,0),ki,.03,o+6));const s=new _(0,Un+2.35,0),c=new _(.95,-2.3,0),i=new _(0,-.15,0);return a.push(q0(s,c,.3,V0),q0(c,i,.3,V0)),a.push(H(new F(.62,.55,1.5).translate(0,.05,0),ki,.03,o+7)),bt(a)}const Lc=(()=>{let t=ct,n=0;for(let e=0;e<ct;e+=5)$.zone(e,!0)==="river"&&(t=Math.min(t,e),n=Math.max(n,e));return t<n?[t,n]:[0,0]})(),Nm=[300,480];function $s(t,n,e){if(t>Pt(n)-($.cloudDepth??170)+30)return!1;const o=J(n);return!(o>=Lc[0]&&o<=Lc[1]&&Math.abs(e)<Nm[0]+40)}const W0=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],Y2=[.17,.31,.09],j2=[.38,.58,.17],X2=[.6,.77,.26],Z2=[.36,.25,.16],Y0=[.08,.17,.1],Q2=[.3,.44,.21];function ps(t){const n=t.index?t.toNonIndexed():t;return n.deleteAttribute("uv"),n}function Cm(t,n,e,o){t.computeVertexNormals();const a=t.getAttribute("position"),s=t.getAttribute("normal"),c=new Float32Array(a.count*3),[i,r,u]=e.map(W0),h=W0(Z2);for(let l=0;l+2<a.count;l+=3){const f=(a.getX(l)+a.getX(l+1)+a.getX(l+2))/3,m=(a.getY(l)+a.getY(l+1)+a.getY(l+2))/3,d=(a.getZ(l)+a.getZ(l+1)+a.getZ(l+2))/3,g=N(f*.9+n,d*.9+m*.5,71),v=s.getY(l)+(g-.5)*.5,p=m<o&&Math.hypot(f,d)<.8,k=p?h:v<-.25?i:v<.35?r:u,b=(.88+.24*g)*(p?.8+.2*Math.min(1,m/o):1);for(let w=l;w<l+3;w++)c.set([k[0]*b,k[1]*b,k[2]*b],w*3)}return t.setAttribute("color",new G(c,3)),t}const J2=[[0,7.3,0,3.5],[2.3,6.3,.9,2.4],[-2.1,6.5,-.7,2.5],[.4,9.5,-.3,2.2]];function Zo(t,n=0){const e=[ps(new rt(.28,.48,5.6,t?5:4,1,!0).translate(0,2.6,0).rotateZ(.05))];return J2.forEach(([o,a,s,c],i)=>e.push(ps(new Rn(c,i===0?t:0).scale(1,.86,1).translate(o,a,s)))),Cm(Tt(e),n,[Y2,j2,X2],4.2)}function tv(){const t=Zo(1,3).scale(1.12,1.12,1.12),n=Zo(1,7).scale(.72,.78,.72).rotateY(1.9).translate(3.9,0,2.4);return Tt([t,n])}function j0(t){const n=[ps(new rt(.22,.4,3.6,t>5?5:4,1,!0).translate(0,1.6,0))];for(const[s,c,i]of[[2.6,5,2.3],[2.15,4.6,5.3],[1.65,4.2,8.1],[1.1,3.9,10.7]])n.push(ps(new ie(s,c,t,1).translate(0,i+c/2,0)));const e=Tt(n);Cm(e,5,[Y0,Y0,Q2],2.4);const o=e.getAttribute("position"),a=e.getAttribute("color");for(let s=0;s<o.count;s++){const c=.75+.5*Math.min(1,Math.max(0,o.getY(s)/14.6));a.setXYZ(s,a.getX(s)*c,a.getY(s)*c,a.getZ(s)*c)}return e}function nv(t,n,e,o){const a=[];for(let s=0;s<o;s++){const c=s<Math.ceil(o/2),i=c?e-.6:-12.4+1.2*(N(s,t,42)-.5),r=t*2.3+s*2.39,u=c?n(i)*.7*N(s,t,43):n(i)*.92,h=c?.2+.06*N(s*1.3,t,44):.3+.1*N(s*1.3,t,44);a.push(Zo(0,s+t).scale(h,h,h).rotateY(r).translate(Math.cos(r)*u,i,Math.sin(r)*u))}return Tt(a)}const ev=250,ov=.5,av=1.4;function sv(){return[j0(7),Zo(1),j0(5),Zo(0)]}const tn={x:0,y:0,z:0};function iv(t,n){return Math.hypot(lt(t+3,n)-lt(t-3,n),lt(t,n+3)-lt(t,n-3))/6}function cv(t,n){const e=[],o=Math.round(n*ov);for(let a=0;a<400&&e.length<o;a++){const s=(t+N(a*.71,t,141))*ev,c=N(t,a*.37,142)<.5?-1:1,i=Math.pow(N(a*.53,t*1.7,143),2.2)*(240+560*Qt(s)),r=Math.max(bn(s)*.7,17),u=r+4+i;D(s,c*u,0,tn);const h=N(tn.x/110,tn.z/110,146)<.32,l=3+Math.floor(N(t,a*2.9,144)*5),f=h?9:14;for(let m=0;m<l&&e.length<o;m++){const d=s+(N(m*1.9,a+t,145)-.5)*f*1.4,g=Math.max(r,u+(N(a+t,m*1.3,147)-.5)*f);if(D(d,c*g,0,tn),!Ne(tn.x,tn.z,d,g))continue;const v=lt(tn.x,tn.z),p=Y(d);if(g<24&&v>p-(Bs(d)>.5?12:22)||iv(tn.x,tn.z)>av||v<p-200||$s(v,d,g))continue;const k=N(m*.83,a+t*1.3,148)<(h?.75:.1),b=k?.85+.55*N(m,t*3.1,149):.75+.6*N(m,t*3.1,149);e.push({p:new _(tn.x,v-.5,tn.z),s:b,r:N(m,a+t,150)*6.28,kind:k?0:1})}}return e}const zm=`
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
`,eo={uPilot:{value:new ss(0,0,0,1)},uHazTime:{value:0}},Os=`
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
`;function rv(t,n,e,o){eo.uPilot.value.set(t,n,Math.sin(e),Math.cos(e)),eo.uHazTime.value=o}const lv=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`,hv=`#include <project_vertex>
  #ifdef USE_INSTANCING
  vTreeBase = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #else
  vTreeBase = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #endif`,uv=`#ifdef USE_FOG
  if (uDeck.y + uDeck.w > 0.0) {
    float sunkU = uDeck.y * step(uDeck.x + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.x));
    float sunkL = uDeck.w * step(uDeck.z + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.z));
    float sunk = max(min(1.0, 1.25 * deckHug(vFogWorld)), max(sunkU, sunkL));
    outgoingLight = mix(outgoingLight, DECK_HUG_COLOR, sunk);
  }
  #endif
  #include <opaque_fragment>`;function Ds(t){const n=new ce({vertexColors:!0,side:t.doubleSide?Nt:cu});return n.onBeforeCompile=e=>{e.uniforms.uLift=t.lift,t.hazard&&Object.assign(e.uniforms,eo),t.deckHug&&(e.uniforms.uDeck=us);const o=t.deckHug?`uniform vec4 uDeck;
${re}${zm}`:"";e.fragmentShader=`uniform float uLift;
${t.hazard?Os:""}${o}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${t.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${t.rim.toFixed(3)} * uLift;
    ${t.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${t.windows?lv:""}
  }
  #endif`),t.deckHug&&(e.vertexShader=`varying float vTreeBase;
${e.vertexShader}`.replace("#include <project_vertex>",hv),e.fragmentShader=`varying float vTreeBase;
${e.fragmentShader}`.replace("#include <opaque_fragment>",uv))},n.customProgramCacheKey=()=>`backlit-${t.selfLit}-${t.rim}-${t.doubleSide?2:1}-${t.hazard?"h":""}${t.windows?"w":""}${t.deckHug?"d":""}`,n}const mv=4,dv=.026,fv=7,gv=.035;function pv(t,n){const e=new Float32Array(n*16),o=new Float32Array(n*3),a=new Float32Array(n*4);t.instanceColor||(t.instanceColor=new cr(new Float32Array(n*3).fill(1),3)),t.instanceMatrix.setUsage(cs),t.instanceColor.setUsage(cs);const s=t.geometry;s.boundingSphere||s.computeBoundingSphere();const c=s.boundingSphere,i=new _,r=new hu;let u=0;return{clear:()=>{u=0},add(h,l){u>=n||(h.toArray(e,u*16),l.toArray(o,u*3),i.copy(c.center).applyMatrix4(h),i.toArray(a,u*4),a[u*4+3]=c.radius*h.getMaxScaleOnAxis(),u++)},flush(h,l){const f=t.instanceMatrix.array,m=t.instanceColor.array;let d=0;for(let g=0;g<u;g++)r.center.fromArray(a,g*4),r.radius=a[g*4+3]+fv+gv*r.center.distanceTo(l),h.intersectsSphere(r)&&(f.set(e.subarray(g*16,g*16+16),d*16),m.set(o.subarray(g*3,g*3+3),d*3),d++);if(t.count=d,d!==0)for(const g of[t.instanceMatrix,t.instanceColor])g.clearUpdateRanges(),g.addUpdateRange(0,d*g.itemSize),g.needsUpdate=!0}}}function vv(t,n){const e=t.elements,o=n.elements;return Math.abs(e[0]/o[0]-1)<.015&&Math.abs(e[5]/o[5]-1)<.015&&Math.abs(e[8]-o[8])<.01&&Math.abs(e[9]-o[9])<.01}function yv(){const t=new uu,n=new _t,e=new _,o=new _(Number.NaN,0,0),a=new kt,s=new kt,c=new _t;return{frustum:t,eye:e,due(i,r){i.updateMatrixWorld(),i.getWorldPosition(e),i.getWorldQuaternion(a);const u=!(e.distanceTo(o)<=mv);return!r&&!u&&a.angleTo(s)<=dv&&vv(i.projectionMatrix,c)?!1:(o.copy(e),s.copy(a),c.copy(i.projectionMatrix),t.setFromProjectionMatrix(n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse)),!0)}}}function Me(t,n,e,o,a){const s=t.getAttribute("position"),c=new Float32Array(s.count*3);for(let i=0;i<s.count;i++){const r=Math.min(1,Math.max(0,(s.getY(i)-o)/(a-o))),u=.85+.3*N(s.getX(i)*.7,s.getZ(i)*.7+s.getY(i),5);for(let h=0;h<3;h++)c[i*3+h]=Math.pow(n[h]+(e[h]-n[h])*r*r,2.2)*u}return t.setAttribute("color",new G(c,3)),t}function Nr(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a),r=(N(s*1.3+e,i*1.3,9)-.5)*n;o.setXYZ(a,s*(1+r),c+r*.6,i*(1+r))}return t.computeVertexNormals(),t}function Em(){const t=[new rt(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([o,a,s],c)=>t.push(Nr(new ie(o,a,7,1).toNonIndexed().translate(0,s+a/2,0),.25,c)));const e=Tt(t.map(o=>o.index?o.toNonIndexed():o));return e.computeVertexNormals(),Me(e,[.05,.12,.07],[.42,.52,.2],1,14)}function Lm(){const t=[new rt(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([o,a,s,c,i],r)=>t.push(Nr(new Rn(c,i).translate(o,a,s),.35,r*3)));const e=Tt(t);return e.computeVertexNormals(),Me(e,[.07,.13,.05],[.62,.6,.18],3,13)}function bv(){const t=[new rt(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,o,a]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])t.push(new ie(e,o,5,1).toNonIndexed().translate(0,a+o/2,0));const n=Tt(t);return n.computeVertexNormals(),Me(n,[.05,.12,.07],[.42,.52,.2],1,14)}function wv(){const t=[new rt(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,o,a,s,c]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])t.push(Nr(new Rn(s,0).translate(e,o,a),.35,c*3));const n=Tt(t);return n.computeVertexNormals(),Me(n,[.07,.13,.05],[.62,.6,.18],3,13)}function xv(){const t=[];for(const[o,a]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])t.push(new F(.4,3,.4).translate(o,1.5,a).toNonIndexed());t.push(Me(new F(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const n=new ie(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();t.push(Me(n,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const o of t)o.getAttribute("color")||Me(o,[.22,.15,.09],[.3,.2,.12],0,3);const e=Tt(t);return e.computeVertexNormals(),e}function Mv(){const t=[];for(const n of[-2.4,0,2.4])t.push(new F(1.1,1,.1).translate(n,4.8,2.85).toNonIndexed()),t.push(new F(1.1,1,.1).translate(n,4.8,-2.85).toNonIndexed());return Tt(t)}const _c=250,kv=40,Mo=1,_m=650,nn={x:0,y:0,z:0},Si={lat:0,y:0,amount:0};function X0(t,n){return Math.hypot(lt(t+3,n)-lt(t-3,n),lt(t,n+3)-lt(t,n-3))/6}function Sv(t,n){const e=[],o=[],a=lo()>.5,s=a?Math.round(n*.6):n,c=a?1.1:3.2,i=oe()>.5;i&&e.push(...cv(t,n));for(let r=0;!i&&r<_m*2.2&&e.length<s;r++){const u=(t+N(r*.71,t,41))*_c,h=N(t,r*.37,42)<.5?-1:1,l=bn(u),f=Math.pow(N(r*.53,t*1.7,43),2.6)*(240+560*Qt(u)),m=Math.max(l*.7,17)+f;D(u,h*m,0,nn);const d=nn.x,g=nn.z;if(!Ne(d,g,u,m))continue;const v=lt(d,g),p=Y(u);if(m<24&&v>p-(Bs(u)>.5?12:22)||X0(d,g)>c||v<p-200||a&&h>0&&um(u,Si)&&m>Si.lat-5&&m<Si.lat+ye+6)continue;const k=.7+.9*N(r,t*3.1,44);e.push({p:new _(d,v-.5,g),s:k,r:N(r,t,45)*6.28,kind:N(d/90,g/90,46)<.55?0:1})}for(let r=0;r<40&&o.length<7;r++){const u=(t+N(r*1.31,t,51))*_c,h=N(t,r*.91,52)<.5?-1:1,l=Math.max(bn(u)*.7,30)+N(r,t*2.3,53)*220;if(D(u,h*l,0,nn),!Ne(nn.x,nn.z,u,l))continue;const f=lt(nn.x,nn.z);X0(nn.x,nn.z)>.45||f>Y(u)-18||i&&$s(f,u,l)||o.push({p:new _(nn.x,f,nn.z),s:1,r:zt(u)-h*(Math.PI/2)+(N(r,t,54)-.5),kind:0})}return{trees:e,houses:o}}const Cr={value:1},Tv=Ds({lift:Cr,selfLit:.2,rim:.85,deckHug:!0}),ho=Ds({lift:Cr,selfLit:.2,rim:.85});function Ie(t,n,e=!1){const o=e?new qt({color:"#ffb35a"}):Tv,a=new vt(t,o,n);return a.count=0,a.frustumCulled=!1,a}function Av(t){const n=t.ahead,e=Math.round(_m*t.density),o=e*(Mo+n+1),a=new yt,[s,c,i,r]=oe()>.5?sv():[Em(),Lm(),bv(),wv()],u=Ie(s,o),h=Ie(c,o),l=Ie(i,o),f=Ie(r,o),m=Ie(xv(),8*(Mo+n+1)),d=Ie(Mv(),8*(Mo+n+1),!0);a.add(u,h,l,f,m,d);const g=[u,h,l,f].map(T=>pv(T,o)),v=yv();let p=!0;const k=new Map;let b=Number.NaN;const w=new _t,y=new kt,x=new _(0,1,0),M=new _,C=new it,z=new it,E=()=>{g.forEach(A=>A.clear());let T=0;for(let A=b;A<=b+Mo+n;A++){let S=k.get(A);S||k.set(A,S=Sv(A,e));const L=A-b>t.near-1?2:0;for(const P of S.trees){y.setFromAxisAngle(x,P.r),w.compose(P.p,y,M.set(P.s,P.s*(.9+.25*Math.sin(P.r*3)),P.s));const B=lo(),U=oe();C.setHSL(.22-.05*B+.04*U+.06*Math.sin(P.r*5),.25-.08*U,.5-.07*B+.12*Math.cos(P.r*7)),g[L+P.kind].add(w,C.multiplyScalar(2))}for(const P of S.houses)y.setFromAxisAngle(x,P.r),w.compose(P.p,y,M.set(1,1,1)),m.setMatrixAt(T,w),d.setMatrixAt(T++,w)}for(const A of[...k.keys()])(A<b-1||A>b+Mo+n+1)&&k.delete(A);m.count=T,d.count=T;for(const A of[m,d])A.instanceMatrix.needsUpdate=!0;p=!0};return{group:a,update(T,A,S){const L=Math.floor((T-kv)/_c);if(L!==b&&(b=L,E()),v.due(S,p)){for(const P of g)P.flush(v.frustum,v.eye);p=!1}Cr.value=1-.55*Math.min(1,Math.max(0,(A-.4)/.5)),d.material.color.copy(z.set("#ffb35a").multiplyScalar(.25+3.2*A*A))}}}const Us=$.cableLine,vs=Us?.from??0,zr=Us?.to??0,Z0=Us?.clear??0,Rc=[.5,.53,.56],Rm=[.86,.84,.78],Im=[1,.74,.36],ys=[.74,.14,.1],Pm=[.42,.52,.6];function Nv(t,n,e){let o=1/0;for(let a=n;a<=n+(zr-vs);a+=8)D(a,0,0,e),o=Math.min(o,Math.hypot(t.x-e.x,t.z-e.z));return o}function We(t,n,e,o,a){const s=new _().subVectors(n,t),c=new F(e,e,s.length());return c.lookAt(s),c.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(c,o,.04,a)}function Bm(t,n){const e=[],o=(s,c,i)=>{const r=(t.y+2-i)/192;return new _(t.x+s*(1.4+7.4*r),i,t.z+c*(1.4+7.4*r))},a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=t.y+2,c=0;s>t.y-n;s-=18,c++){const i=Math.max(t.y-n,s-18),r=c<3?c%2?[.92,.9,.86]:[.78,.12,.08]:Rc;a.forEach(([u,h],l)=>{const[f,m]=a[(l+1)%4];e.push(We(o(u,h,s),o(u,h,i),.7,r,5)),e.push(We(o(u,h,s),o(f,m,i),.25,Rc,5))})}return e}function Cv(t){const n=t*ct+vs-Rt,e=t*ct+zr-Rt,o=new _,a=D(n,0,0,new _);a.y=Y(n)+Z0;const s=D(e,0,0,new _);s.y=Y(e)+Z0;const c=[],i=new _().subVectors(s,a).cross(new _(0,1,0)).normalize();for(const m of[-1.6,0,1.6])c.push(We(a.clone().addScaledVector(i,m),s.clone().addScaledVector(i,m),.22,[.2,.2,.22],3));const r=a.distanceTo(s),u=new _;for(let m=.08;m<1;m+=130/r)u.lerpVectors(a,s,m),!(Nv(u,n,o)<30)&&(c.push(...Bm(u,190)),c.push(H(new F(9,1.6,4).translate(u.x,u.y+2.4,u.z),Rc,.05,6)));const h=Math.atan2(s.x-a.x,s.z-a.z),l=gs(ys,[.3,.08,.07],Pm,8).rotateY(h),f=gs(Rm,ys,Im,9).rotateY(h);for(let m=.05,d=0;m<1;m+=70/r,d++)u.lerpVectors(a,s,m),c.push((d%2?f:l).clone().translate(u.x,u.y,u.z));return l.dispose(),f.dispose(),bt(c)}function zv(){const t=!!Us,n=new yt,e=new Map;return{group:n,update(o){if(!t)return;const a=wn(o);for(const s of[a,a+1]){const c=s*ct+vs-Rt;if(e.has(s)||c>o+2400||c+(zr-vs)<o-200)continue;const i=new j(Cv(s),ho);i.matrixAutoUpdate=!1,n.add(i),e.set(s,i)}for(const[s,c]of e)s>=a-1&&s<=a+1||(n.remove(c),c.geometry.dispose(),e.delete(s))}}}const Ev=new St({uniforms:{...eo},vertexShader:`
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
${Os}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:rr,transparent:!0,depthWrite:!1}),Q0=(t,n,e)=>`${Math.round(t*50)},${Math.round(n*50)},${Math.round(e*50)}`;function Lv(t){if(t.getAttribute("aOutline"))return t;const n=t.getAttribute("position"),e=t.getAttribute("normal"),o=new Map;for(let s=0;s<n.count;s++){const c=Q0(n.getX(s),n.getY(s),n.getZ(s)),i=o.get(c)??[0,0,0];i[0]+=e.getX(s),i[1]+=e.getY(s),i[2]+=e.getZ(s),o.set(c,i)}const a=new Float32Array(n.count*3);for(let s=0;s<n.count;s++){const c=o.get(Q0(n.getX(s),n.getY(s),n.getZ(s))),i=Math.hypot(c[0],c[1],c[2]);a.set(i>1e-6?[c[0]/i,c[1]/i,c[2]/i]:[0,1,0],s*3)}return t.setAttribute("aOutline",new G(a,3)),t}function pn(t){const n=new j(Lv(t),Ev);return n.userData.hazardHull=!0,n}function _v(t,n){t&&(t.visible=n>5&&n<105)}function Rv(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new aa(t)}const Hm=new En(1,1).rotateX(-Math.PI/2),Fm=new qt({map:Rv(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function Iv(t){const n=new vt(Hm,Fm,t);return n.count=0,n.frustumCulled=!1,n.renderOrder=1,n}function Er(t,n,e){const o=new j(Hm,Fm);return o.scale.set(t,1,n),o.position.y=e,o.renderOrder=1,o.updateMatrix(),o}const Lr=[.86,.66,.36],Gm=[.78,.58,.32],Ks=[.36,.34,.35],$m=[.3,.29,.3],Ti=[.58,.56,.53],Pv={pillar:[.52,.5,.48],wall:Lr,tile:Ks},Bv={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},Hv=()=>Tm(Bv);function Fv(){const t=[Xo(H(new F(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let n=0;n<2;n++)for(let e=0;e<12;e++){const o=N(e*.73,n*1.9,61),a=-4.6+(e+.5*n)*.76,s=new F(.95,.4+.22*o,.62+.3*o).rotateX((o-.5)*.35).rotateY((o-.5)*.4),c=.78+.34*N(e,n,62);t.push(H(s.translate(0,.25+n*.46,a),[Ti[0]*c,Ti[1]*c,Ti[2]*c],.12,e+n*13))}return bt(t)}const Gv=[.3,.22,.19],Ai=[.92,.9,.84],$v=[.8,.82,.85];function Om(t,n){const e=[],o=new F(t.len,t.wallH+t.sink,t.width).translate(0,(t.wallH-t.sink)/2,0);e.push(Xo(H(o,t.wall,.14,n),0,2.5,.72)),e.push(H(new F(t.len+.08,.7,t.width+.08).translate(0,.25,0),[.5,.44,.36],.1,n)),e.push(H(new F(t.len+.06,.45,t.width+.06).translate(0,t.wallH-.2,0),Gv,.08,n)),e.push(Sm(t.len,t.width,t.wallH,t.rise,t.wall)),e.push(Gs(t.len+.6,t.width/2+.35,t.rise+.25,t.tile,0,t.crest?Ar:void 0).translate(0,t.wallH-.2,0));const a=-t.width/2-.04;e.push(H(new F(1.3,2.3,.08).translate(0,1.15,a+.01),Ai,.06,n)),e.push(H(new F(1,2,.1).translate(0,1,a-.02),Tr,.1,n)),e.push(H(new F(1.8,.25,.34).translate(0,.12,a-.17),[.62,.58,.52],.08,n));for(let s=0;s<t.floors;s++){const c=1.5+s*3.1;for(const i of s===0?[-t.len/2+.85,t.len/2-.85]:[-.9,.9])e.push(H(new F(.8,1,.1).translate(i,c,a),U2,.12,n+i));if(s>0&&t.balcony){const i=t.len*.78;e.push(H(new F(i,.18,.4).translate(0,c-1.05,a-.2),[.7,.66,.6],.08,n)),e.push(H(new F(i,.08,.08).translate(0,c-.15,a-.32),Ai,.05,n));for(let r=0;r<=6;r++)e.push(H(new F(.06,.82,.06).translate(-i/2+i*r/6,c-.55,a-.32),Ai,.05,n))}}if(t.tank){const s=t.wallH+t.rise+.1;e.push(H(new rt(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(t.len*.22,s+.45,0),$v,.12,n)),e.push(H(new F(.9,.2,.7).translate(t.len*.22,s,0),[.4,.38,.36],.08,n))}return bt(e)}function Dm(t,n,e=!1){const a=e?t%2?Gm:Lr:t%2?Mm:Sr,s=e?t%3===2?$m:Ks:t%3===2?xm:ha;return Om({len:4.4,width:5.2,wallH:n-3.2-.3,rise:3.2,wall:a,tile:s,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},t*7.1)}function xa(t,n=!1){const e=n?t?Gm:Lr:t?Mm:Sr,o=n?t?$m:Ks:t?xm:ha;return Om({len:8-t,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:o,floors:1,sink:2.5,tank:!n,crest:!1,balcony:!n},3+t)}const oo=[.76,.6,.33],Um=[.62,.49,.3],Km=[.5,.4,.31],An=[.56,.38,.23],Xn=[.3,.2,.13],Ov=[.6,.55,.46],Qo=[.68,.64,.36],Vm=[.86,.7,.36],Dv=[.06,.16,.12],Uv=[.2,.13,.08],qm=[[.88,.14,.1],[.98,.74,.12],[.18,.6,.3],[.2,.36,.78],[.88,.24,.55],[.95,.9,.8]];function Ce(t,n){const e=t.getAttribute("position"),o=t.getAttribute("color"),a=t.getAttribute("normal");for(let s=0;s+2<e.count;s+=3){const c=(e.getX(s)+e.getX(s+1)+e.getX(s+2))/3,i=(e.getY(s)+e.getY(s+1)+e.getY(s+2))/3,r=(e.getZ(s)+e.getZ(s+1)+e.getZ(s+2))/3,u=n(c,i,r,(a.getY(s)+a.getY(s+1)+a.getY(s+2))/3);for(let h=s;h<s+3;h++)o.setXYZ(h,o.getX(h)*u,o.getY(h)*u,o.getZ(h)*u)}return t}const Kv=t=>t.rise+.9*t.thick+.32;function Wm(t,n){const e=Math.hypot(t.half,t.rise),o=Math.atan2(t.rise,t.half),a=Math.max(3,Math.round(t.len/(t.shingle?1:1.25))),s=Math.max(3,Math.round(e/(t.shingle?.6:.78))),c=new F(t.len,t.thick,e,a,1,s),i=c.getAttribute("position");for(let l=0;l<i.count;l++){if(i.getZ(l)<e/2-.01)continue;const f=N(i.getX(l)*1.7+n,3.1,77);i.setZ(l,i.getZ(l)+(t.shingle?.08:.42)*(f-.45)),i.setY(l,i.getY(l)-(t.shingle?0:.18*f))}c.rotateX(o).translate(0,t.rise/2+Math.cos(o)*t.thick/2,t.half/2+Math.sin(o)*t.thick/2);const r=Ce(H(c,t.color,.12,n),(l,f,m,d)=>{const g=m/t.half,v=Math.min(.999,Math.max(0,g)),p=Math.floor(v*s),k=t.shingle?((Math.floor(l/.55)+p)%2?1:.84)*(p%2?1:.92):p%2?1:.88,b=g>.985&&d<.3?.68:d<-.3?.5:d<.3?.72:1;return k*b*(t.shingle?.9+.2*N(l*.6+n,p,78):.94+.12*N(l*.12+n,p*.3,78))}),u=t.cap??[t.color[0]*.78,t.color[1]*.74,t.color[2]*.7],h=H(new F(t.len+.2,.42,.42).rotateX(Math.PI/4).translate(0,t.rise+.9*t.thick,0),u,.08,n);return bt([r,r.clone().rotateY(Math.PI),h])}function Ym(){const t=new rt(.75,1.75,2.5,9,2),n=t.getAttribute("position");for(let o=0;o<n.count;o++){const a=n.getY(o),s=(Math.abs(a)<.01?1.12:1)*(.92+.16*N(n.getX(o)*2,n.getZ(o)*2,79));n.setXYZ(o,n.getX(o)*s,a,n.getZ(o)*s)}const e=Ce(H(t.translate(0,1.15,0),Vm,.18,2),(o,a)=>a<.5?.72:Math.floor(a/.55)%2?1:.88);return bt([e,H(new ie(.85,1,9,1).translate(0,2.85,0),Um,.12,3),H(new rt(.06,.08,1.4,4,1,!0).translate(0,3.4,0),Xn,.1,4)])}function Vv(){const t=[];for(let n=0;n<=4;n++){const e=-5+n*2.5,o=N(n*1.3,2.2,80);t.push(H(new F(.17,1.8,.17).rotateX((o-.5)*.16).rotateZ((o-.5)*.12).translate(0,.45,e),Xn,.2,n))}for(const n of[.62,1.12])t.push(H(new F(.08,.12,10.3).rotateX(.01*n).translate(.1,n,0),[.5,.41,.31],.22,n));return bt(t)}function qv(t,n,e,o){const s=(i,r)=>{const u=i/8,h=o/2*(1-.25*u);return[.18*Math.sin(i*1.3),t-e*u,n-.35*Math.sin(u*3.2)+r*h]},c=[];for(let i=0;i<8;i+=2){const r=[];for(let h=i;h<i+2;h++){const[l,f,m,d]=[s(h,-1),s(h,1),s(h+1,-1),s(h+1,1)];if(h<7)r.push(...l,...f,...m,...m,...f,...d);else{const g=[(m[0]+d[0])/2,l[1]-.4*(l[1]-m[1]),(l[2]+f[2])/2];r.push(...l,...g,...m,...f,...d,...g,...l,...f,...g)}}const u=new ht;u.setAttribute("position",new mu(r,3)),c.push(H(u,qm[[0,1,2,4][i/2]],.12,i))}return c}function Wv(){const n=10.5+3*Math.cos(-.5),e=3*Math.sin(-.5);return bt([H(new rt(.08,.13,10.5,5,1).translate(0,5.25,0),Qo,.15,5),H(new rt(.05,.08,3,5,1).rotateX(-.5).translate(0,10.5+1.5*Math.cos(-.5),1.5*Math.sin(-.5)),Qo,.15,7),H(new ie(.9,2.4,6,1).rotateX(Math.PI+-.5*1.6).translate(0,n+.2,e-.6),[.46,.56,.2],.25,6),H(new F(.05,.05,1).translate(0,n-.15,e),Xn,.1,8),...qv(n-.15,e,6.2,.95)])}const Yv=4,jm=12;function jv(t,n,e,o,a,s){const c=o-e,i=[],r=[[t,Math.PI,0,-n/2],[t,0,0,n/2],[n,-Math.PI/2,-t/2,0],[n,Math.PI/2,t/2,0]];for(const[u,h,l,f]of r){const m=Math.max(2,Math.round(u/.36)),d=Ce(H(new En(u,c,m,1),a,.16,s+l+f),g=>{const v=Math.floor((g+u/2)/u*m);return(v%2?1:.86)*(.9+.2*N(v*1.7,s+h,81))});i.push(d.rotateY(h).translate(l,e+c/2,f))}return i}function Xv(t,n,e,o,a,s,c){const i=Math.hypot(o-n,a-e);return H(new F(s,i,s).rotateX(Math.atan2(a-e,o-n)).translate(t,(n+o)/2,(e+a)/2),c,.1,t)}function Zn(t,n){const e=[],o=t.roof,a={...o,len:t.len+1.3,...t.crest?{cap:Ar}:{}},s=t.top-Kv(a),c=s+o.rise*(1-t.width/2/o.half),i=-t.width/2;if(t.base==="plinth"){const f=Math.max(1,Math.round(t.floor/.5)),m=H(new F(t.len+.9,t.floor,t.width+.9,1,f,1).translate(0,t.floor/2,0),Ov,.3,n);e.push(Ce(m,(d,g)=>(Math.floor(g/.5)%2?1:.84)*(.86+.28*N(d*.8+Math.floor(g/.5)*3.3,n,82)))),e.push(H(new F(t.len+.9,t.sink,t.width+.9).translate(0,-t.sink/2,0),[.42,.38,.32],.1,n))}else{const f=t.len>5.5?[-t.len/2+.25,0,t.len/2-.25]:[-t.len/2+.25,t.len/2-.25];for(const d of f)for(const g of[i+.25,-i-.25])e.push(H(new F(.26,t.floor+t.sink,.26).translate(d,(t.floor-t.sink)/2,g),Xn,.15,d+g)),t.guards&&e.push(H(new rt(.52,.52,.08,6).translate(d,t.floor-.6,g),An,.1,d-g));e.push(H(new F(t.len+.4,.24,t.width+.4).translate(0,t.floor-.12,0),Xn,.1,n));const m=Math.min(t.floor,Yv)-.15;t.skirt&&e.push(H(new F(t.len-.2,m,t.width-.2).translate(0,t.floor-.25-m/2,0),Qo,.25,n))}e.push(...jv(t.len,t.width,t.floor,c,t.wall,n)),e.push(H(new F(t.len+.12,.3,t.width+.12).translate(0,t.floor+.15,0),Xn,.1,n)),e.push(Sm(t.len,t.width,c,s+o.rise-c,t.wall)),e.push(Wm(a,n).translate(0,s,0));const r=Math.min(1.9,c-t.floor-.4);e.push(H(new F(.95,r,.1).translate(0,t.floor+r/2,i-.04),Uv,.08,n));const u=t.floor+Math.min(1.5,(c-t.floor)*.55),h=t.windows<=2?[-.3,.3].slice(0,t.windows):Array.from({length:t.windows},(f,m)=>(m+.5)/t.windows-.5);for(const f of h)Math.abs(f*t.len)>.85&&e.push(H(new F(.7,.55,.1).translate(f*t.len,u,i-.04),Dv,.06,n+f));let l=i;if(t.porch){l=i-.9,e.push(H(new F(t.len,.18,.9).translate(0,t.floor-.09,i-.45),Xn,.1,n)),e.push(H(new F(t.len,.08,.08).translate(0,t.floor+.9,l+.05),An,.08,n));const f=Math.max(3,Math.round(t.len/.8));for(let m=0;m<=f;m++)e.push(H(new F(.07,.9,.07).translate(-t.len/2+t.len*m/f,t.floor+.45,l+.05),An,.08,m))}if(t.ladder){for(const f of[-.38,.38])e.push(Xv(f,0,l-1.4,t.floor,l,.09,An));for(let f=1;f<=4;f++)e.push(H(new F(.85,.07,.07).translate(0,t.floor*f/5,l-1.4+1.4*f/5),An,.08,f))}if(t.firewood){const f=t.base==="plinth"?t.floor:0,m=t.base==="plinth"?i-.26:0,d=t.len*.32,g=H(new F(d,.95,.5,4,3,1).translate(t.len/2-d/2-.05,f+.475,m),[.74,.58,.38],.15,n);e.push(Ce(g,(v,p)=>(Math.floor(v/.24)+Math.floor(p/.32))%2?1:.72))}return bt(e)}function Zv(t,n){const e=n-.02,o=Math.max(0,n-jm),a=o>2,s=[.5,.34,.21];return t===0?Zn({len:5.2,width:4.2,base:"stilts",floor:3.5+o,top:e,roof:{half:3.2,rise:4.2,thick:.5,color:oo},wall:An,crest:!0,sink:6,windows:1,skirt:!0,porch:!0,ladder:!0},11):t===1?Zn({len:5.2,width:4.6,base:"stilts",floor:3.2+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:Um},wall:s,crest:!0,sink:6,windows:0,skirt:!0,guards:!0,ladder:!0},12):t===2?Zn({len:5,width:4.8,base:a?"stilts":"plinth",floor:3+o,top:e,roof:{half:3.2,rise:4,thick:.3,color:Km,shingle:!0},wall:An,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},13):Zn({len:5,width:4.8,base:a?"stilts":"plinth",floor:2.6+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:oo},wall:s,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},14)}function J0(t){return t===0?Zn({len:8,width:5.4,base:"plinth",floor:.9,top:7,roof:{half:3.5,rise:3,thick:.3,color:Km,shingle:!0},wall:An,crest:!1,sink:2.5,windows:3,firewood:!0},21):Zn({len:7.6,width:5,base:"stilts",floor:1.8,top:8.4,roof:{half:3.4,rise:3.4,thick:.5,color:oo},wall:[.5,.35,.22],crest:!1,sink:2.5,windows:2,porch:!0,ladder:!0,firewood:!0},22)}const Qv=[[1.8,6.4],[-1.6,7.7]];function Jv(){return Zn({len:3,width:2.8,base:"stilts",floor:2.4,top:7.2,roof:{half:2.25,rise:2.6,thick:.42,color:oo},wall:An,crest:!1,sink:2,windows:0,ladder:!0},23)}const tl=5,Xm={value:0};function t5(){const t=[];for(let n=0;n<tl;n++){const e=new Rn(.75,0);e.deleteAttribute("uv"),e.setAttribute("aPuff",new G(new Float32Array(e.getAttribute("position").count).fill(n/tl),1)),t.push(e)}return Tt(t)}const Jo=new qt({color:14078150,transparent:!0,opacity:.5,depthWrite:!1});Jo.onBeforeCompile=t=>{t.uniforms.uSmokeTime=Xm,t.vertexShader=`attribute float aPuff;
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
  diffuseColor.a *= vFade;`)};Jo.customProgramCacheKey=()=>"chimney-smoke";function n5(t){Xm.value=performance.now()/1e3,Jo.opacity=.5-.28*t,Jo.color.setRGB(.66-.58*t,.62-.53*t,.56-.44*t)}const Ht=8,Zm=Ht+6,Ma=Ht+7,Qm=[40,8,8,12,8,22,10,14],e5=[[13,13],[10,7.5],[9.5,7],[1.6,11],[4.5,4.5],[4,4],[0,0],[1.3,1.3]],mn=250;function o5(t){return t?[tv(),J0(0),J0(1),Vv(),Jv(),Ym(),t5(),Wv()]:Qm.map(()=>new ht)}const en=new _;function _r(t,n){return Math.hypot(lt(t+2.5,n)-lt(t-2.5,n),lt(t,n+2.5)-lt(t,n-2.5))/(2*2.5)}function Pe(t,n,e,o){D(t,n,0,en),en.y=lt(en.x,en.z);const a=Y(t);return!(Xt(t)>.3)||en.y>a-6||en.y<a-e||_r(en.x,en.z)>o||!Ne(en.x,en.z,t,Math.abs(n))||$s(en.y,t,n)?null:en.clone()}const nl=(t,n,e)=>zt(t)+(n>0?Math.PI/2:-Math.PI/2)+(e-.5)*.6,el=20,Gt=new _,Za=(t,n)=>(D(t,n,0,Gt),lt(Gt.x,Gt.z));function a5(t,n){for(let e=0;e<mn/el;e++){const o=n*mn+(e+.8*N(e*1.31,n,213))*el,a=$.zone(J(o),!0);if(a!=="dive"&&a!=="valley"&&a!=="climb")continue;const s=Za(o,22)>=Za(o,-22)?1:-1,c=N(n*1.9,e*2.71,214);let i=c<.6?Ma:c<.88?Ht:Ht+5;const r=$.hillside,u=(r?.wall?.(J(o))??0)>.5?Math.max(0,(r.wallLip?.(J(o))??0)-18):0,h=s*((i===Ht?22:15)+N(e*3.17,n,215)*8+u),l=Za(o,h),f=Y(o);if(l<f-(i===Ht+5?10:14)||l>f+8||!Ne(Gt.x,Gt.z,o,Math.abs(h)))continue;const m=_r(Gt.x,Gt.z);if(m>(i===Ht?1:i===Ma?2.5:.6)&&(i=Ma),m>2.5)continue;const d=i===Ma?zt(o):N(e,n,216)*6.28;t.push({p:new _(Gt.x,l,Gt.z),r:d,s:.85+.35*N(n,e,217),kind:i})}}function s5(t,n){for(let e=0;e<22;e++){const o=n*mn+N(e*1.13,n,218)*mn;if($.zone(J(o),!0)!=="river")continue;const s=(N(n*1.7,e*2.93,219)<.5?-1:1)*(4+Math.pow(N(e*3.41,n,220),1.3)*110),c=Za(o,s);if(c>Y(o)-28||_r(Gt.x,Gt.z)>.5||!Ne(Gt.x,Gt.z,o,Math.abs(s))||$s(c,o,s))continue;const i=N(n*2.3,e*2.1,221),r=i<.6?Ht:i<.75?Ht+4:Ht+5;t.push({p:new _(Gt.x,c,Gt.z),r:N(e,n,222)*6.28,s:.8+.4*N(n,e,223),kind:r})}}function i5(t,n){const e=[];a5(e,t),s5(e,t);const o=t*mn,a=$.zone(J(o+mn/2),!0),s=a==="valley"||a==="climb";for(let i=0;i<Math.max(3,Math.round(n/6));i++){const r=o+N(i*.77,t,181)*mn,u=N(t,i*.41,182)<.5?-1:1,h=27+Math.pow(N(i*.53,t*1.3,183),1.6)*170;for(let l=0,f=3+Math.floor(N(t,i*2.7,184)*4);l<f;l++){const m=r+(N(l*1.9,i+t,185)-.5)*26,d=u*Math.max(21,h+(N(i+t,l*1.3,186)-.5)*24),g=Pe(m,d,30,.8);g&&e.push({p:g,r:N(l,i+t,187)*6.28,s:.75+.45*N(i,l+t,188),kind:Ht})}}const c=s?4:1;for(let i=0;i<c;i++){const r=o+(i+N(i,t,189))*(mn/c),u=N(t*1.3,i,190)<.5?-1:1,h=u*(19+Math.pow(N(i*.7,t,191),1.4)*130),l=Pe(r,h,40,.45);if(l){e.push({p:l,r:nl(r,h,N(i,t,192)),s:.9+.25*N(t,i,193),kind:Ht+4});for(let f=0;f<3;f++){const m=Pe(r+(N(f,i+t,194)-.5)*16,h+u*(4+N(i+t,f,195)*9),40,.45);m&&e.push({p:m,r:N(f,i,196)*6.28,s:.8+.4*N(i,f+t,197),kind:Ht+5})}}}for(let i=0;i<(s?6:3);i++){const r=o+N(i*1.37,t,198)*mn,u=(N(t,i*.83,199)<.5?-1:1)*(15+N(i*.61,t*1.7,200)*70),h=Pe(r,u,30,.4);h&&e.push({p:h,r:N(i,t,201)*6.28,s:.8+.45*N(t,i,202),kind:Ht+5})}for(let i=0;i<(s?1:2);i++){const r=o+(.25+.5*i)*mn+(N(t,i,203)-.5)*60,u=(N(t*1.7,i,204)<.5?-1:1)*((s?45:26)+N(t,i*3.1,205)*90);for(let h=0;h<(s?4:7);h++){const l=r+(N(h,t+i,206)-.5)*70,f=u+(N(h*1.9,t+i,207)-.5)*50,m=Math.abs(f)<30?null:Pe(l,f,14,.3);if(!m)continue;const d=(h+i)%2,g=nl(l,f,N(h,i,208));if(e.push({p:m,r:g,s:1,kind:Ht+1+d}),N(h*2.3,t+i,209)<.45){const[v,p]=Qv[d];e.push({p:new _(m.x+Math.cos(g)*v,m.y+p,m.z-Math.sin(g)*v),r:0,s:1,kind:Zm})}}}for(let i=0;i<(s?1:2);i++){const r=(i?1:-1)*(N(t,3.3,210)<.5?-1:1),u=o+N(t,i,211)*(mn-60);for(let h=0,l=(s?2:3)+Math.floor(N(t,i*2.3,212)*4);h<l;h++){const f=u+h*10.2,m=Pe(f,r*13.5,14,.5);m&&e.push({p:m,r:zt(f),s:1,kind:Ht+3})}}return e}const de=250,ol=1,c5=6,Rr={value:1},r5=Ds({lift:Rr,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),Vs=Ds({lift:Rr,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Ni(t,n,e){return D(t,n,0,e),e.y=lt(e.x,e.z),e}function l5(t,n){const e=[],o=t*de;if(Math.max(Xt(o),Xt(o+de/2),Xt(o+de))===0)return e;if(oe()>.5)return i5(t,n);const a=new _,s=lo()>.5?4:0,c=(i,r)=>Xt(i)>.3&&r.y<Y(i)-6&&r.y>Y(i)-14;for(let i=0;i<n;i++){const r=o+N(i*.77,t,81)*de,h=(N(t,i*.41,82)<.5?-1:1)*(18+Math.pow(N(i*.53,t*1.3,83),1.8)*190);c(r,Ni(r,h,a))&&e.push({p:a.clone(),r:N(i,t,84)*6.28,s:.8+.5*N(t,i,85),kind:s})}for(let i=0;i<2;i++){const r=o+(.25+.5*i)*de+(N(t,i,86)-.5)*60,h=(N(t*1.7,i,87)<.5?-1:1)*(24+N(t,i*3.1,88)*90);for(let l=0;l<7;l++){const f=r+(N(l,t+i,89)-.5)*70,m=h+(N(l*1.9,t+i,90)-.5)*50;if(Math.abs(m)<17||!c(f,Ni(f,m,a)))continue;const d=zt(f)+(m>0?Math.PI/2:-Math.PI/2)+(N(l,i,91)-.5)*.5;e.push({p:a.clone(),r:d,s:1,kind:s+1+l%2})}}for(let i=0;i<2;i++){const r=i?1:-1,u=o+N(t,i,92)*(de-60),h=3+Math.floor(N(t,i*2.3,93)*4);for(let l=0;l<h;l++){const f=u+l*10.2;c(f,Ni(f,r*13.5,a))&&e.push({p:a.clone(),r:zt(f),s:1,kind:s+3})}}return e}function h5(t){const n=ol+Math.max(3,Math.round(c5*t))+1,e=Math.round(34*Math.max(.5,t)),o=new yt,a=[Tm(),xa(0),xa(1),q2(),Hv(),xa(0,!0),xa(1,!0),Fv(),...o5(oe()>.5)],s=[34,7,7,12,34,7,7,12,...Qm].map(p=>p*n),c=a.map((p,k)=>{const b=new vt(p,k===Zm?Jo:r5,s[k]);return b.count=0,b.frustumCulled=!1,b.visible=p.getAttribute("position")!==void 0,o.add(b),b}),i=Iv(s.reduce((p,k)=>p+k,0));o.add(i);const r=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11],...e5],u=new Map,h=new _t,l=new kt,f=new _(0,1,0),m=new _,d=new _;let g=Number.NaN;const v=()=>{const p=a.map(()=>0);let k=0;for(let b=g;b<g+n;b++){let w=u.get(b);w||u.set(b,w=l5(b,e));for(const y of w){const x=c[y.kind];if(p[y.kind]>=s[y.kind])continue;h.compose(y.p,l.setFromAxisAngle(f,y.r),m.set(y.s,y.s,y.s)),x.setMatrixAt(p[y.kind]++,h);const[M,C]=r[y.kind];M!==0&&(h.compose(m.set(y.p.x,y.p.y+.12,y.p.z),l,d.set(M*y.s,1,C*y.s)),i.setMatrixAt(k++,h))}}for(const b of[...u.keys()])(b<g-1||b>g+n)&&u.delete(b);c.forEach((b,w)=>{b.count=p[w],b.visible=b.count>0,b.instanceMatrix.needsUpdate=!0}),i.count=k,i.instanceMatrix.needsUpdate=!0};return{group:o,update(p,k){const b=Math.floor(p/de)-ol;b!==g&&(g=b,v());const w=Math.min(1,Math.max(0,(k-.4)/.5));Rr.value=1-.6*w,n5(w)}}}const u5=8.05,Be=2.05,un=32,m5=2.4,d5=260,al=[.2,.2,.22],Ci=[.5,.53,.56],f5=[.22,.23,.25],ka=t=>u5+m5*(t/un)**2;function g5(){const t=[],n=[];for(const a of[0,Be]){const s=a?.18:.26,c=Array.from({length:17},(i,r)=>-un+r*2*un/16).map(i=>new _(i,ka(i)+a,0));for(let i=0;i<c.length-1;i++)t.push(We(c[i],c[i+1],s,al,3));for(const i of[-1,1]){const r=new _(i*un,ka(un)+a,0);n.push(We(r,new _(i*140,r.y+.35*(140-un),0),s,al,3))}}const e=gs(ys,[.3,.08,.07],Pm,8).rotateY(Math.PI/2),o=gs(Rm,ys,Im,9).rotateY(Math.PI/2);for(const a of[-2,-1,0,1,2]){const s=Ct(a),c=ka(s);t.push((a%2?o:e).clone().translate(s,c,0)),t.push(We(new _(s,c+.3,0),new _(s,c+Be,0),.22,Ci,12)),t.push(H(new F(2.2,.45,.6).translate(s,c+Be+.1,0),f5,.03,13))}e.dispose(),o.dispose();for(const a of[-1,1]){const s=ka(un);n.push(...Bm(new _(a*un,s-2.6,0),d5)),n.push(H(new F(2.4,1,6).translate(a*un,s-1.1,0),Ci,.05,6));for(const c of[-1.3,1.3])n.push(H(new F(.45,Be+1.6,.45).translate(a*un,s+Be/2-.2,c),Ci,.05,7));n.push(H(new F(.6,.5,3.1).translate(a*un,s+Be+.6,0),[.78,.12,.08],.05,8))}return{hazard:bt(t),scenery:bt(n)}}const zi=$.cableLine;let p5=null;function qs(t){const n=J(t);return!!zi&&n>=zi.from&&n<=zi.to}function v5(){const t=p5??=g5();return new yt().add(new j(t.hazard,Vs).add(pn(t.hazard)),new j(t.scenery,ho))}const Ic="skyrun.best",Oo=t=>`skyrun.best.${t}`,Jm=new Map,td=new Set;try{const t=Number(localStorage.getItem(Ic))||0;t>0&&!localStorage.getItem(Oo("khau-pha"))&&!localStorage.getItem(Oo("mu-cang-chai"))&&localStorage.setItem(Oo("khau-pha"),JSON.stringify({m:0,score:t}))}catch{}function y5(t){try{const n=localStorage.getItem(Oo(t));if(!n)return null;const e=JSON.parse(n);return{m:Number(e.m)||0,score:Number(e.score)||0}}catch{return null}}function Ir(t){const n=y5(t),e=Jm.get(t);return!n||!e?n??e??null:{m:Math.max(n.m,e.m),score:Math.max(n.score,e.score)}}function nd(t,n){Jm.set(t,n);try{localStorage.setItem(Oo(t),JSON.stringify(n))}catch{}}function Pr(t){return Ir(t)}function ed(t,n){const e=Math.floor(n),o=Ir(t);if(!(e<=(o?.m??0))){nd(t,{m:e,score:o?.score??0});for(const a of td)a()}}function b5(t){td.add(t)}function w5(t,n,e,o=!0){const a=Ir(t),s=a?.m??0,c={m:Math.max(s,Math.floor(n)),score:Math.max(a?.score??0,e)},i=Math.floor(n)>s,r=!i&&a!==null&&Math.floor(n)===s&&s>0;if(!o)return{best:a??c,record:!1,tie:!1,prevM:s};nd(t,c);try{e>(Number(localStorage.getItem(Ic))||0)&&localStorage.setItem(Ic,String(e))}catch{}return{best:c,record:i,tie:r,prevM:s}}const sl=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua"],x5=["ngan-yeah","ngan-wiii","ngan-da-qua"],M5=["ngan-nhanh-ghe","ngan-wiii","ngan-yeah"],il=["ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ghe-chua","ngan-hay"],k5=["ngan-ui-da","ngan-oi","ngan-ui"],Pc=["ngan-co-len","ngan-rang-len","ngan-len-nao"],cl=["ngan-ngon","ngan-them-ne","ngan-hay"],rl=["ngan-tiec-ghe","ngan-oi-khong"],S5=["ngan-di-ne","ngan-len-nao","ngan-yeah","cat-canh"],ll={rim:sl,dive:x5,gorge:["ngan-yeah","ngan-da-qua"],mouth:["ngan-troi-oi","ngan-wiii"],river:["ngan-da-qua","ngan-dep-qua","ngan-yeah"],cave:["ngan-troi-oi","ngan-dep-qua"],climb:Pc,valley:sl,gate:["ngan-yeah","ngan-da-qua"],village:["ngan-dep-qua","ngan-da-qua"]},T5=300,A5=25,N5=30,C5=4,Sa=gt.region==="fansipan",hl=()=>performance.now()/1e3,$t=t=>Math.random()<t;function z5(){let t=0,n=0,e=0,o=-1/0,a=-1/0;const s=[],c=new Map,i=l=>{const f=l.filter(g=>!s.includes(g)),m=f.length?f:l,d=m[Math.floor(Math.random()*m.length)];return s.push(d),s.length>C5&&s.shift(),d},r=l=>{const f=hl();return f-o<A5||Math.random()>=l?!1:(o=f,!0)},u=(l,f)=>{const m=c.get(l)??0;return m>=f?!1:(c.set(l,m+1),!0)},h=(l,f)=>l&&u(l,1)?{n:l,prio:2}:$t(.25)?{n:i(f),prio:1}:null;return{runStart(){return t=Pr(Bt)?.m??0,n++,n===1?i(["cat-canh","pk-len-duong","pk-bay-thoi"]):$t(.3)?i(S5):null},nearMiss(l){return l===3?$t(.4)?i(il):null:l===6?$t(.5)?i([...il,"suot-dep","khen-dep-lam","khen-sat-rat","pk-hu-hon"]):null:l>=10&&l%5===0&&$t(.6)?i(["qua-dinh","khen-bay-pro","khen-ai-can","pk-phe-qua","khen-tay-lai-lua"]):null},lantern(l){return l===10?u("den-troi-chuoi",2)?"den-troi-chuoi":$t(.5)?i(cl):null:l>=20&&l%10===0&&$t(.5)?i([...cl,"pk-phe-qua","pk-gom-den"]):null},gustFull:()=>$t(.5)?i(["pk-quay-len",...Pc]):null,rush(){const l=hl();return l-a<N5?null:(a=l,$t(.6)?i([...M5,"pk-nhanh-qua","pk-cay-mat"]):null)},booster(l){return l==="shield"?u("du-du-phong",2)?"du-du-phong":null:u("luong-nhiet",1)?"luong-nhiet":$t(.3)?i(Pc):null},hurt(l,f,m){return r(.3)?Sa&&f==="bridge"&&qs(m)?"treu-cabin":Sa&&f==="pillar"?"dx-thap-dung-yen":i(Sa?["dx-bay-kieu-gi"]:["treu-hon-vach","dx-bay-kieu-gi","dx-vach-dung-yen"]):l<=1&&u("tiec-mot-tim",2)?"tiec-mot-tim":$t(.8)?i([...k5,"tiec-xem"]):null},zone:l=>h($.zoneLines?.[l],ll[l]),section:l=>h(l==="gorge"?"khe-da":"thung-lung",ll[l]),over(l,f){const m=f<T5;if(e=m?e+1:0,l)return i(["ky-luc","pk-ky-luc-chop","pk-pha-ky-luc"]);if(m)return e>=2&&r(.6)?"treu-lai-nua":r(.5)?i(["treu-moi-cat-canh","treu-khoi-dong","dx-de-ma","dx-nhin-duong"]):$t(.5)?i(rl):null;if(t>0&&f>=.9*t)return"tiec-suyt-ky-luc";if(t>0&&f<.5*t&&r(.4))return"dx-ky-luc-cuoi";if(!$t(.6))return null;if($t(.6))return i(rl);if(!Sa)return i(["ha-canh","tiec-lam-lai"]);const d=$.zone(J(f),!1)==="river";return i(d?["tiec-lam-lai","tiec-nhay-lai"]:["tiec-lam-lai","tiec-nhay-lai","tiec-rot-may"])}}}const ul=[0,2,4,7,9],Ta=.32,ml=.85,E5=.6,dl=1.25,L5=[0,10,3,0];function _5(){let t=null,n=null,e=null,o=null,a=null,s=null,c=null,i=null,r=null,u=null;const h=nm();let l=h.sfx,f=h.music;const m=()=>pp({sfx:l,music:f});let d=0,g=0,v=null,p=0;const k=z5();let b=!1,w=null;const y=()=>{if(w)return w.resume();t=new AudioContext,w=op(t),sp(t,matchMedia("(pointer: coarse)").matches),n=mp(t);const E=t.createDynamicsCompressor();E.threshold.value=-10,E.ratio.value=4,E.connect(t.destination),e=t.createGain(),e.gain.value=.9,e.connect(E);const T=A=>{const S=t.createGain();return S.gain.value=A,S.connect(e),S};o=T(l?1:0),a=T(l?ml:0),s=T(f?Ta:0),u=Mp(t,s),setInterval(()=>u?.tick(f),500),i=t.createBiquadFilter(),i.type="lowpass",c=t.createGain(),c.gain.value=0,i.connect(c).connect(o)};y();const x=(E,T)=>{n&&o&&n.play(E,o,T)},M=(E,T)=>{if(!E||!t||!n||!a||!s||!l)return;const A=t.currentTime;if(A<d?T<=g:A<d+(L5[T]??0))return;const S=n.get(E);S&&(v?.stop(),v=n.play(E,a),d=A+S.duration,g=T,f&&(s.gain.setTargetAtTime(Ta*E5,A,.05),s.gain.setTargetAtTime(Ta,A+S.duration,.3)))},C=E=>E?M(E.n,E.prio):void 0,z=E=>1+(Math.random()*2-1)*E;return{update(E,T,A){if(!t||!n||!c||!i)return;!r&&n.get("wind-loop")&&(r=n.play("wind-loop",i,{loop:!0})),u?.tick(f);const S=t.currentTime;r&&r.playbackRate.setTargetAtTime(.85+.35*E,S,.2),i.frequency.setTargetAtTime(900+6e3*E,S,.15),c.gain.setTargetAtTime(T?.35+1.1*E*E:.2,S,.25);const L=rm(A);T&&L>p&&L%3&&M(L%3===1?"chang-vang":"dem-hoi",1),p=T?Math.max(p,L):0,T&&E>dl&&!b&&M(k.rush(),1),b=T&&E>1.05&&(b||E>dl);const P=Ep();P&&T&&x("festival-whoosh",{vol:.2+.4*P.near,rate:(P.big?.8:1)*z(.06),pan:P.pan}),O2()&&T&&(x("flare-whoosh",{vol:.9,rate:.75}),x("reveal-stinger",{vol:.7}))},events(E,T,A){for(const S of E)if(S.type==="lantern"){const L=ul[(S.streak-1)%ul.length];x("lantern-chime",{vol:.55,rate:Math.pow(2,L/12)}),M(k.lantern(S.streak),1)}else if(S.type==="wish"){for(const[L,P]of[[-5,.6],[2,.42],[7,.3]])x("lantern-chime",{vol:P,rate:Math.pow(2,L/12)});x("reveal-stinger",{vol:.35})}else if(S.type==="near-miss")x("near-miss",{vol:.8,rate:z(.08)*(1+.02*Math.min(10,S.combo))}),M(k.nearMiss(S.combo),1);else if(S.type==="lane")x("lane-whoosh",{vol:.25,rate:z(.1),pan:.5*S.dir});else if(S.type==="vert")x(S.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:z(.05)});else if(S.type==="gust")x("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(S.chain-1))/12)}),S.full&&(x("thermal-boost",{vol:.7}),M(k.gustFull(),1));else if(S.type==="cloud-gate")x(S.hit?"flare-whoosh":"dive-whoosh",{vol:S.hit?.8:.75,rate:S.hit?1.2:.6}),S.hit&&x("thermal-boost",{vol:.6});else if(S.type==="booster"){const[L,P]=S.kind==="thermal"?["thermal-boost",.8]:S.kind==="smoke"?["smoke-hiss",.75]:S.kind==="boost"?["festival-whoosh",1.4]:["shield-pickup",1.4];x(L,{vol:P}),(S.kind==="thermal"||S.kind==="shield")&&M(k.booster(S.kind),2)}else S.type==="hurt"?(x("shield-hit",{vol:1.2,rate:z(.05)}),M(k.hurt(S.hp,S.kind,A),2)):S.type==="crash"?x("crash",{vol:1.3}):S.type==="section"&&T&&!S.open&&!$.zoneNames&&C(k.section("gorge"))},reveal(){x("reveal-stinger",{vol:.6}),$.zoneNames||C(k.section("valley"))},zone(E){C(k.zone(E))},runStart(){y(),x("run-start",{vol:.8}),M(k.runStart(),2)},over(E,T){x("game-over",{vol:.5}),M(k.over(E,T),3)},toggleSfx(){return y(),l=!l,o&&a&&t&&(o.gain.setTargetAtTime(l?1:0,t.currentTime,.05),a.gain.setTargetAtTime(l?ml:0,t.currentTime,.05)),m(),l},toggleMusic(){return y(),f=!f,s&&t&&(s.gain.cancelScheduledValues(t.currentTime),s.gain.setTargetAtTime(f?Ta:0,t.currentTime,.3)),m(),f},prefs:()=>({sfx:l,music:f}),justUnlocked:()=>w?.justWoke()??!1,music:()=>u}}function Zt(t){for(const n of["touchstart","touchend","touchmove","pointerdown"])t.addEventListener(n,e=>e.stopPropagation(),{passive:!0});t.addEventListener("mousedown",n=>{n.stopPropagation(),n.target instanceof Element&&n.target.closest('button, [role="button"]')&&(n.preventDefault(),window.focus())})}const st=t=>`<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t}</svg>`,xt='fill="currentColor" fill-opacity=".28"',O={lantern:'<svg class="ui-ic ui-ic-lantern" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ic-lan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3121b"/><stop offset=".55" stop-color="#ff7329"/><stop offset="1" stop-color="#ffc45a"/></linearGradient></defs><path d="M7.2 2.8h9.6l1.7 3.4c.9 1.9 1.5 4 1.5 6.1 0 3.2-1.6 5.7-3.9 6.9H7.9C5.6 18 4 15.5 4 12.3c0-2.1.6-4.2 1.5-6.1z" fill="url(#ic-lan)" stroke="#4a1006" stroke-width="1.1"/><path d="M9.4 3.2 8.6 18.8M14.6 3.2l.8 15.6M12 2.9v16" stroke="#6e1f0a" stroke-width=".8" opacity=".55" fill="none"/><ellipse cx="12" cy="19.3" rx="4.3" ry="1.15" fill="#2e0a04"/><path d="M12 22.4c-1.2-.8-1.5-2-.6-3.2.1.8.6 1.1 1 1.2.2-.6.1-1.3-.3-1.9 1.5.7 2.1 2.2 1.4 3.9z" fill="#fff0a0" stroke="#ff9a2a" stroke-width=".5"/></svg>',heart:'<svg class="ui-ic ui-ic-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="whole" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/><path class="half l" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/><path class="half r" d="M12 21s7.5-4.6 9.6-9.4c1.5-3.5-.6-7.1-4.2-7.1-2.1 0-3.6 1.2-5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/></svg>',trophy:st(`<path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" ${xt}/><path d="M7 5.5H4.3a2.7 2.7 0 0 0 3.1 4.2M17 5.5h2.7a2.7 2.7 0 0 1-3.1 4.2M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>`),lock:st(`<rect x="5" y="10.5" width="14" height="10" rx="2.2" ${xt}/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17"/>`),gear:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',speaker:st('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16.5 9.5l5 5m0-5-5 5"/>'),note:st('<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16"/>'),pause:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',play:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.8v14.4L19.5 12z" fill="currentColor"/></svg>',help:st('<path d="M8.8 8.8a3.3 3.3 0 1 1 4.5 3.1c-.8.3-1.3 1-1.3 1.9v.7"/><circle cx="12" cy="18.3" r=".9" fill="currentColor" stroke="none"/>'),close:st('<path d="M6 6l12 12M18 6 6 18"/>'),mountain:st(`<path d="M2.5 19.5 9 8l3.5 6 2-3 7 8.5z" ${xt}/><path d="M7.3 11 9 12.5l1.7-1.6"/>`),route:st('<path d="M4 18.5c4-1 5-6.5 9-7.5s5-4 6.5-6.5" stroke-dasharray=".1 3.6"/><circle cx="4" cy="18.5" r="1.9" fill="currentColor"/><path d="M16 4h4v4"/>'),star:st(`<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" ${xt}/>`),wind:st('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),boost:st(`<path d="M6 5.5l6.5 6.5L6 18.5z" ${xt}/><path d="M6 5.5l6.5 6.5L6 18.5M13 5.5l6.5 6.5-6.5 6.5"/>`),thermal:st('<path d="M8 21c-2-3 2-5 0-8s2-5 0-8M16 21c-2-3 2-5 0-8s2-5 0-8"/><path d="M5.5 7 8 4.5 10.5 7M13.5 7 16 4.5 18.5 7"/>'),parachute:st(`<path d="M3 11a9 7 0 0 1 18 0z" ${xt}/><path d="M3 11l9 9 9-9M9 11l3 9 3-9"/>`),users:st('<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.3 6-5.3s5.4 1.9 6 5.3M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.8 14.6c1.7.8 2.9 2.5 3.2 4.9"/>'),crown:st(`<path d="M3.5 8l4 4 4.5-6 4.5 6 4-4-1.8 10H5.3z" ${xt}/>`),wingsuit:st(`<path d="M12 3.5c-3.6 3.6-7.3 5.2-9.5 5.8 2.9 1.1 5.8 1.4 7.9 3.6L12 20.5l1.6-7.6c2.1-2.2 5-2.5 7.9-3.6-2.2-.6-5.9-2.2-9.5-5.8z" ${xt}/>`),sun:st(`<circle cx="12" cy="12" r="4" ${xt}/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12H5M19 12h2.5M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>`),moon:st(`<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" ${xt}/>`),home:st(`<path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" ${xt}/>`),rotate:st('<rect x="3" y="7" width="18" height="10" rx="2.2"/><path d="M16.5 3.5a7 7 0 0 1 4 3M21 3v3.6h-3.6"/>'),chevronDown:st('<path d="M6 9l6 6 6-6"/>'),chevronRight:st('<path d="M9 6l6 6-6 6"/>'),check:st('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),dragSide:st(`<circle cx="12" cy="12" r="3.2" ${xt}/><path d="M7.5 12H2.5M5 9.5 2.5 12 5 14.5M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5"/>`),swipeUp:st(`<circle cx="12" cy="17.5" r="3.2" ${xt}/><path d="M12 13.5V3.5M8 7.5l4-4 4 4"/>`),swipeDown:st(`<circle cx="12" cy="6.5" r="3.2" ${xt}/><path d="M12 10.5v10M8 16.5l4 4 4-4"/>`),tap:st('<circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity=".45"/><circle cx="12" cy="12" r="7.5" stroke-opacity=".55"/>'),pillar:st(`<path d="M9 21V6.5l1.5-3h3L15 6.5V21" ${xt}/><path d="M3 21h18"/>`),spike:st(`<path d="M3.5 20 10 7l2.5 4L15 6l5.5 14z" ${xt}/>`),ridge:st(`<path d="M2 20v-7l4-4 3 3 3-5 3 4 3-2 4 4v7z" ${xt}/>`),bridge:st('<path d="M2 6c5 6 15 6 20 0M5 9.2V20M19 9.2V20M2 20h20M9 10.7v3M12 11v3M15 10.7v3"/>'),overhang:st(`<path d="M2 4h20v4l-4 3-3-2-3 4-3-3-3 2-4-2z" ${xt}/><path d="M4 20h16"/>`),house:st(`<path d="M3 11 12 4l9 7" /><path d="M5.5 9.5V20h13V9.5" ${xt}/>`),gorge:st(`<path d="M2.5 21V3.5l4 4.5 2 13zM21.5 21V5l-3.5 3-2.5 13z" ${xt}/><path d="M12 5v2.5M12 11v2.5M12 17v2.5"/>`),dive:st(`<path d="M2.5 4.5h8V21h-8z" ${xt}/><path d="M15.5 4v14.5M12 15l3.5 3.5L19 15"/>`),river:st('<path d="M2 8.5q2.5-2.2 5 0t5 0 5 0 5 0M2 15q2.5-2.2 5 0t5 0 5 0 5 0"/>'),cave:st(`<path d="M2 20.5V12a10 8.5 0 0 1 20 0v8.5z" ${xt}/><path d="M7.5 20.5V16a4.5 4.5 0 0 1 9 0v4.5"/>`),terrace:st('<path d="M2.5 20h19M4 16c4.5-1.6 11.5-1.6 16 0M6 12c3.5-1.4 8.5-1.4 12 0M8.5 8c2.2-1 4.8-1 7 0"/>'),cloud:st(`<path d="M6.5 18.5a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.4 9a4.75 4.75 0 0 1 .6 9.5z" ${xt}/>`)},R5=3*6e4,od=/assets\/index-([\w-]+)\.js/,fl=[...document.scripts].map(t=>od.exec(t.src)?.[1]).find(Boolean)??null;function I5(t){const n=document.createElement("button");n.type="button",n.className="ui-chip gold build-note",n.hidden=!0,n.innerHTML=`${O.rotate}<span>Có bản mới · Tải lại</span>`,n.addEventListener("click",c=>{c.stopPropagation(),location.reload()}),Zt(n),t.appendChild(n);let e=!1,o=performance.now(),a=!1;const s=async()=>{a=!0;try{const c=await fetch(new URL("./",location.href),{cache:"no-store",redirect:"manual"}),i=c.ok?od.exec(await c.text())?.[1]:void 0;e=!!i&&i!==fl}catch{}a=!1};return{setScreen(c){n.hidden=!e||!c,!(!fl||e||a||!c||performance.now()-o<R5)&&(o=performance.now(),s())}}}function P5(t){if(t.name)return t.name;if(t.parent?.name)return t.parent.name;const n=t.geometry;return`${t.type}:${n.type}:${n.getAttribute("position")?.count??0}`}function B5(t,n,e=14){n.updateMatrixWorld();const o=new uu().setFromProjectionMatrix(new _t().multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse)),a=new hu,s=new Map;t.traverseVisible(i=>{if(!(i instanceof j)&&!(i instanceof is))return;const r=i.geometry;if(i.frustumCulled&&(r.boundingSphere||r.computeBoundingSphere(),a.copy(r.boundingSphere).applyMatrix4(i.matrixWorld),!(i instanceof vt)&&!o.intersectsSphere(a)))return;const u=i instanceof is?0:(r.index?r.index.count:r.getAttribute("position")?.count??0)/3,h=i instanceof vt?i.count:1,l=P5(i),f=s.get(l)??{meshes:0,triangles:0};f.meshes+=1,f.triangles+=Math.round(u*h),s.set(l,f)});const c=[...s.entries()].map(([i,r])=>({source:i,...r})).sort((i,r)=>r.triangles-i.triangles);return{rows:c.slice(0,e),total:c.reduce((i,r)=>i+r.triangles,0)}}function H5(t,n,e,o){const a=r=>{const u=t.getContext(),h=new Uint8Array(4),l=performance.now();for(let d=0;d<r;d++)t.info.reset(),n.render(),u.readPixels(0,0,1,1,u.RGBA,u.UNSIGNED_BYTE,h);const{geometries:f,textures:m}=t.info.memory;return{msPerFrame:(performance.now()-l)/r,calls:t.info.render.calls,triangles:t.info.render.triangles,geometries:f,textures:m,programs:t.info.programs?.length??0}},s=async r=>{e.render();const u=await new Promise(l=>t.domElement.toBlob(l,"image/png"));if(!u)return"khong chup duoc";const h=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:u});return h.ok?`shots/${r}.png`:`loi ${h.status}`},c=r=>B5(o.scene,o.camera,r),i=(r=!1)=>{const u=new Map;return o.scene.traverse(h=>{const l=h.material,f=Object.keys(h.geometry?.attributes??{}).join(",");for(const m of Array.isArray(l)?l:l?[l]:[]){const d=t.properties.get(m).currentProgram,g=Object.keys(m.uniforms??{}).filter(v=>!/^(fog|diffuse|opacity)/.test(v)).slice(0,4).join(",");d&&!u.has(d.id)&&u.set(d.id,`${h.type}:${h.name||h.parent?.name||"?"}/${m.name||m.type} [${f}] {${g}}`)}}),(t.info.programs??[]).map(h=>`${h.id} ${r?h.cacheKey:u.get(h.id)??`${h.name} ${h.cacheKey.replace(/\s+/g," ").slice(0,160)}`}`)};window.__skyrun={...e,bench:a,shot:s,diag:c,programs:i}}const F5=5,G5=450;function $5(t,n){let e=0;return{spawn(o,a,s){const c=n();if(!c||e>=F5||!Number.isFinite(o)||!Number.isFinite(a)){s();return}const i=c.getBoundingClientRect(),r=t.getBoundingClientRect(),u=i.left+i.width*.25-r.left,h=i.top+i.height*.5-r.top,l=document.createElement("div");l.className="collect-streak",l.style.left=`${o}px`,l.style.top=`${a}px`,t.appendChild(l),e++;const f=(o+u)/2-(u-o)*.15,m=Math.min(a,h)-60,d=l.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${f-o}px), calc(-50% + ${m-a}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${u-o}px), calc(-50% + ${h-a}px)) scale(0.55)`,opacity:.9}],{duration:G5,easing:"cubic-bezier(.5,0,.9,.6)"});d.onfinish=d.oncancel=()=>{l.remove(),e--,s()}}}}const O5=`
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
}`,D5=`
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
}`,ko=1.1,U5=1.3,K5=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Qa={request:0};function V5(t){const n=t?.041666666666666664:.025,e=Math.ceil(ko/n)+2,o=[0,1].map(()=>Array.from({length:e},()=>({p:new _,t:-99,k:0,c:0}))),a=2*e*2,s=new Float32Array(a*3),c=new Float32Array(a*3),i=new Float32Array(a),r=new Float32Array(a),u=new Float32Array(a),h=new Float32Array(a),l=[];for(let T=0;T<2;T++)for(let A=0;A<e;A++){const S=(T*e+A)*2;u[S]=-1,u[S+1]=1,A<e-1&&l.push(S,S+1,S+2,S+1,S+3,S+2)}const f=new ht,m={position:[s,3],aCol:[c,3],aAge:[i,1],aK:[r,1],aSide:[u,1],aAlong:[h,1]};for(const[T,[A,S]]of Object.entries(m))f.setAttribute(T,new G(A,S));f.setIndex(l),f.setDrawRange(0,0);const d=["position","aCol","aAge","aK","aAlong"].map(T=>f.getAttribute(T)),g=new St({vertexShader:O5,fragmentShader:D5,uniforms:Ln.merge([_n.fog]),transparent:!0,depthWrite:!1,side:Nt,fog:!0}),v=new j(f,g);v.frustumCulled=!1,v.renderOrder=3;const p=new _,k=new _,b=new _,w=new _,y=new _,x=new _;let M=0,C=-99,z=-99,E=!1;return{mesh:v,update(T,A,S,L,P){Qa.request>0&&(M=Qa.request,Qa.request=0),L>0&&(M=Math.max(0,M-L));const B=T.mode==="run",U=B&&T.smokeT>0?Math.min(1,T.smokeT/U5):0,W=B&&M>0?.75*Math.min(1,M/.8):0,X=Math.max(U,W);if(X>0)S-z>ko&&o.forEach((tt,wt)=>tt.forEach(Mt=>(Mt.p.copy(A[wt]),Mt.t=-99,Mt.k=0))),z=S;else if(S-z>ko){E&&f.setDrawRange(0,0),E=!1;return}E=!0,f.setDrawRange(0,1/0);const Z=zt(T.z);p.set(Math.sin(Z),vn(T.z),Math.cos(Z)).normalize(),k.set(Math.cos(Z),0,-Math.sin(Z));const V=B?T.speed:0,et=Math.sign((A[0].x-A[1].x)*k.x+(A[0].z-A[1].z)*k.z)||1,mt=L>0&&S-C>=n;mt&&(C=S),o.forEach((tt,wt)=>{const Mt=X*(X+(1-X)*Math.max(0,Math.sin(S*21+wt*2))),At=U>0?(T.smokes+2)%3:wt===0?1:2;if(mt){const pt=tt.pop();tt.unshift(pt)}const Lt=tt[0];Lt.p.copy(A[wt]),mt&&(Lt.t=S),Lt.k=Mt,Lt.c=At;const xn=wt===0?et:-et;for(let pt=1;pt<e&&L>0;pt++){const nt=tt[pt],Jt=Math.min(ko,S-nt.t),mo=Math.max(0,V-5-18*Jt),cn=Math.sin(S*7+nt.t*13);nt.p.addScaledVector(p,mo*L).addScaledVector(k,(xn*1.6+cn*.7)*L),nt.p.y+=(-1+Math.cos(S*6+nt.t*11)*.5)*L}x.copy(k);for(let pt=0;pt<e;pt++){const nt=tt[pt],Jt=S-nt.t,mo=Math.min(1,Jt/ko);b.subVectors(tt[Math.max(0,pt-1)].p,tt[Math.min(e-1,pt+1)].p),b.lengthSq()<1e-6&&b.copy(p),w.subVectors(P,nt.p),y.crossVectors(b,w),y.lengthSq()<.03*b.lengthSq()*w.lengthSq()?y.copy(x):y.normalize(),y.dot(x)<0&&y.negate(),x.copy(y);const cn=(.14+.9*(1-Math.exp(-Jt/.4)))*(.45+.55*nt.k),dt=(wt*e+pt)*2;s[dt*3]=nt.p.x-y.x*cn,s[dt*3+1]=nt.p.y-y.y*cn,s[dt*3+2]=nt.p.z-y.z*cn,s[dt*3+3]=nt.p.x+y.x*cn,s[dt*3+4]=nt.p.y+y.y*cn,s[dt*3+5]=nt.p.z+y.z*cn;const fo=K5[nt.c];c.set(fo,dt*3),c.set(fo,dt*3+3),i[dt]=i[dt+1]=mo,r[dt]=r[dt+1]=nt.t<0?0:nt.k,h[dt]=h[dt+1]=nt.t}});for(const tt of d)tt.needsUpdate=!0}}}function q5(t,n,e,o,a,s,c,i){const r=$5(t,()=>t.querySelector(".hud-lantern")),u=new _,h=document.createElement("div");h.className="flash",t.appendChild(h);const l=()=>{h.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>h.classList.remove("on")))};return{handle(f,m){if(!f.length)return;o.events(f,m.mode==="run",m.z),a.events(f,m);const d=D(m.z+3,m.x,m.v,{x:0,y:0,z:0}),g=D(m.z+.6,m.x,m.v,{x:0,y:0,z:0});for(const v of f)if(v.type==="lantern")e.burst(d.x,d.y+.5,d.z,16,!0),s.spawn(g.x,g.y+.2,g.z),u.set(d.x,d.y+.3,d.z).project(i),r.spawn((u.x*.5+.5)*t.clientWidth,(.5-u.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(v.type==="wish")e.burstWish(d.x,d.y+.6,d.z),s.spawn(g.x,g.y+.2,g.z),n.shake(.12),l(),u.set(d.x,d.y+.3,d.z).project(i),r.spawn((u.x*.5+.5)*t.clientWidth,(.5-u.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(v.type==="near-miss")n.shake(.06),l();else if(v.type==="hurt"||v.type==="crash"){const p=v.type==="crash";n.shake(p?.9:.45),c.spawn(g.x,g.y,g.z,ee(m.z)?"village":v.kind==="bridge"?"cloth":"rock",p),p||l()}else v.type==="booster"?e.burst(d.x,d.y,d.z,40,!0):v.type==="gust"&&v.full?Qa.request=1.5:v.type==="section"&&v.open&&m.mode==="run"&&o.reveal()}}}const gl=20.5,W5=17.5,pl=.1,Y5=.05,j5=3,X5=.5,Z5=2.5,Q5=8;class J5{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(n,e){this.minScale=n,this.hooks=e}sample(n){if(n<=0||n>.1||(this.clock+=n,this.warm+=n,this.sinceChange+=n,this.warm<j5||this.sinceChange<X5)||(this.seeded||(this.ema=n*1e3,this.seeded=!0),this.ema+=(n*1e3-this.ema)*.05,this.verify&&this.sinceChange>=Z5&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>gl?this.slowFor+n:0,this.fastFor=this.ema<W5?this.fastFor+n:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>gl?this.floorSlowFor+n:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const n=this.verify;this.verify=null,!(this.ema<n.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(n.prev))}down(n){if(this.slowFor=0,!n){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-pl));return}this.floorSlowFor<Q5||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+pl)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const n=Math.min(1,this.scale+Y5);n<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(n))??0)||this.apply(n)}key(n){return Math.round(n*100)}apply(n){this.scale=Math.round(n*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const Ei={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},ad="skyrun.quality",t3=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function n3(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"no-webgl2";const n=t.getExtension("WEBGL_debug_renderer_info"),e=String(n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function e3(t){const n=navigator;return t==="no-webgl2"||t3.test(t)||(n.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function vl(t){return t==="low"||t==="mid"||t==="high"}function o3(t){const n=n3(),e=t.get("q");if(vl(e))return{...Ei[e],gpu:n,source:"url"};let o=null;try{const[a,s]=(localStorage.getItem(ad)??"").split("|");Date.now()-Number(s)<3*864e5&&(o=a??null)}catch{}return vl(o)?{...Ei[o],gpu:n,source:"saved"}:{...Ei[e3(n)],gpu:n,source:"guess"}}function a3(t){try{localStorage.setItem(ad,`${t}|${Date.now()}`)}catch{}}function s3(t){return t==="high"?"mid":t==="mid"?"low":null}function i3(t){const n=()=>Math.min(window.devicePixelRatio,t.tier.maxDpr);let e=!1;const o=new J5(t.tier.minScale,{setScale(r){const u=n()*r;t.renderer.setPixelRatio(u),t.post.setPixelRatio(u),t.resize()},degrade(){const r=s3(t.tier.name);return r&&!e&&t.tier.source!=="url"&&(a3(r),e=!0),t.post.setLite()}});let a=performance.now(),s=0,c=a;const i=r=>{const u=(r-a)/1e3;if(t.tick(Math.min(.1,u)),a=r,t.renderer.info.reset(),t.post.render(),o.sample(u),s++,r-c>500){const h=t.renderer.info.render,l=(s*1e3/(r-c)).toFixed(0);t.stats?.(`${l} FPS · ${h.calls} lượt vẽ · ${(h.triangles/1e6).toFixed(2)}M △
tầng ${t.tier.name} (${t.tier.source}) · độ phân giải ${Math.round(o.scale*100)}% · ${o.frameMs().toFixed(1)} ms
${t.worldLine()}`),s=0,c=r}requestAnimationFrame(i)};return requestAnimationFrame(i),o}const sd=gt.routeVersion,c3=7*3600*1e3;function Bc(t){const n=new Date(t.getTime()+c3);return`${`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}.${gt.routePrefix}${sd}`}function r3(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return n>>>0||1}function l3(t){let n=t;return()=>{const e=Bc(new Date);return{route:e,seed:t?n++:r3(e)}}}function yl(t){const n=/^\d{4}-(\d{2})-(\d{2})/.exec(t);return n?`${n[2]}/${n[1]}`:t}const Hc=20,id=2*Math.PI*Hc,h3=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Hc}" class="track"/>
  <circle cx="24" cy="24" r="${Hc}" class="arc" stroke-dasharray="${id.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function u3(t,n){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${h3}<b>Đèn ×2</b>`,t.appendChild(e);const o=e.querySelector(".arc");let a=!1,s=!1,c="";return{update(i){const r=i.smokeT>0&&i.mode!=="over";if(r!==a&&(a=r,e.classList.toggle("on",a),n.classList.toggle("x2",a)),!a)return;const u=(id*(1-i.smokeT/I.smokeTime)).toFixed(1);u!==c&&o.setAttribute("stroke-dashoffset",c=u);const h=i.smokeT<1.5;h!==s&&e.classList.toggle("ending",s=h)}}}const m3={hurt:"heart",thermal:"thermal",shield:"parachute",boost:"boost",wind:"wind",wish:"lantern"},d3={thermal:"Lên cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${I.smokeLanternMul} trong ${I.smokeTime} giây`,boost:`Gió tốc! Điểm ×${I.boostScoreMul}`},bl=2*Math.PI*24,f3=1.1,Aa=t=>Math.floor(t).toLocaleString("vi-VN"),wl=t=>`×${t.toFixed(1).replace(".",",")}`;function g3(t){const n=document.createElement("div");n.className="hud",n.innerHTML=`
    <div class="hud-left">
      <div class="hud-dist-row"><div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div><span class="hud-rank-slot"></span></div>
      <div class="hud-score">${O.star}<b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời">
        <div class="hud-day-track"><span class="mk" style="left:24%">${O.sun}</span><span class="mk" style="left:64%">${O.moon}</span><span class="mk" style="left:86%">${O.lantern}</span><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span class="hud-day-no" data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${O.heart.repeat(I.maxHp)}</div>
      <div class="hud-lantern">${O.lantern}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><svg viewBox="0 0 54 54" aria-hidden="true"><circle class="bg" cx="27" cy="27" r="26"/><circle class="arc" data-k="combo" cx="27" cy="27" r="24" stroke-dasharray="${bl.toFixed(1)}"/></svg><span data-k="mult">×1,0</span></div>
    </div>
    <div class="hud-boost"><div class="hud-pill" data-k="thermal">${O.thermal}<b>Luồng nhiệt</b><i data-k="thermalBar"></i></div><div class="hud-pill gale" data-k="gale">${O.boost}<b>Gió tốc · điểm ×${I.boostScoreMul}</b><i data-k="galeBar"></i></div></div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-vignette" data-k="vig"></div>
    <div class="hud-stats" data-k="stats"></div>`,t.appendChild(n);const e=S=>n.querySelector(`[data-k="${S}"]`),o=["dist","score","sun","dayNo","period","lanterns","mult","multBox","combo","thermal","thermalBar","gale","galeBar","toasts","sections","stats","vig"],{dist:a,score:s,sun:c,dayNo:i,period:r,lanterns:u,mult:h,multBox:l,combo:f,thermal:m,thermalBar:d,gale:g,galeBar:v,toasts:p,sections:k,stats:b,vig:w}=Object.fromEntries(o.map(S=>[S,e(S)])),y=n.querySelector(".hud-lantern"),x=[...e("hearts").children],M=u3(n.querySelector(".hud-right"),y);let C=0,z=null,E="";const T=(S,L,P)=>{const B=document.createElement("div");B.className=`hud-toast ${L}${P?` ${P}`:""}`;const U=P&&m3[P];U&&(B.innerHTML=O[U]),B.append(S);const W=L==="section"?k:p;for(W.appendChild(B);W.children.length>(L==="section"?1:2);)W.firstChild.remove();return setTimeout(()=>B.remove(),L==="section"?2600:1100),B},A=(S,L)=>{const P=L>1?`SƯỢT! ${wl(S.mult)}`:"SƯỢT!",B=performance.now()/1e3;z&&z.el.isConnected&&B-z.at<f3?(z.el.textContent=P,z.el.classList.remove("bump"),z.el.offsetWidth,z.el.classList.add("bump"),clearTimeout(z.timer)):z={el:T(P,"combo"),at:B,timer:0},z.at=B;const U=z.el;z.timer=window.setTimeout(()=>U.remove(),1100)};return{toast:(S,L,P)=>{T(S,L,P)},setVisible(S){n.classList.toggle("hidden",!S)},bumpLantern(){y.classList.remove("got"),y.getBoundingClientRect(),y.classList.add("got")},setStats(S){b.textContent=S},setPilotBox(S){const L=t.clientHeight,P=S?S.y+S.h+16:0,B=!S||t.clientWidth>600?"":P<=L-150?`t${Math.round(P)}`:`b${Math.round(L-S.y+16)}`;B!==E&&(E=B,p.style.top=B[0]==="t"?`${B.slice(1)}px`:B?"auto":"",p.style.bottom=B[0]==="b"?`${B.slice(1)}px`:B?"auto":"")},update(S,L){a.textContent=Aa(S.z),s.textContent=Aa(xe(S)),c.style.left=`${(L.u*100).toFixed(1)}%`;const P=`Ngày ${L.day}`;i.textContent!==P&&(i.textContent=P);const B=Ap(L);r.textContent!==B&&(r.textContent=B),u.textContent=Aa(S.lanterns),h.textContent=wl(S.mult),l.classList.toggle("hot",S.mult>1.05);const U=S.combo>0?Math.max(0,1-S.comboT/I.comboBreak):0;f.style.strokeDashoffset=(bl*(1-U)).toFixed(1),m.classList.toggle("on",S.thermalT>0),d.style.transform=`scaleX(${S.thermalT/I.thermalTime})`,g.classList.toggle("on",S.boostT>0),v.style.transform=`scaleX(${S.boostT/I.boostTime})`,x.forEach((X,Z)=>X.classList.toggle("lost",Z>=S.hp)),n.classList.toggle("low-hp",S.mode==="run"&&S.hp===1&&I.maxHp>1),M.update(S);const W=rm(L);W>C&&S.mode==="run"&&T(W%3===0?`Ngày ${L.day} · ${om[L.region]}`:W%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),C=S.mode==="run"?Math.max(C,W):0},zone(S){const L=$.zoneNames?.[S];L&&T(L,"section")},events(S,L){for(const P of S)if(P.type==="near-miss")A(L,P.combo);else if(P.type==="hurt"){T(P.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt");for(const B of[x[P.hp],w])B?.classList.remove("hit"),B?.getBoundingClientRect(),B?.classList.add("hit")}else P.type==="booster"&&P.kind!=="lantern"?T(d3[P.kind],"big",P.kind):P.type==="wish"?T(`Đèn ước! +${Aa(P.points)}`,"big","wish"):P.type==="gust"?T(P.full?`Trọn chuỗi gió! +${I.gustChainScore}`:`Gió xuôi ×${P.chain}`,P.full?"big":"combo","wind"):P.type==="cloud-gate"?T(P.hit?`Xé cửa mây! +${I.gateScore}`:"Đâm vào mây · mất gió",P.hit?"big":"combo","wind"):P.type==="section"&&L.mode==="run"&&!$.zoneNames&&T(P.open?Xt(L.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const p3=30,xl={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},v3=10,y3=34,b3=260,w3=180,x3=.26,Ml=300;function M3(t,n,e){const o=[],a=[],s=new Map;let c=!1;const i=new Map;let r=null,u=0,h=0,l=-1,f=0;const m=[],d=(b,w)=>{n()&&m.forEach(y=>y(b,w))};let g=null,v=0,p=0;window.addEventListener("keydown",b=>{if(b.repeat)return;const w=xl[b.code];if(w){o.push(w),w==="down"&&(c=!0),b.preventDefault();const y=performance.now();w===g&&w!=="down"&&y-v<Ml?(d(w==="up"?"flip":"roll",w==="right"?-1:1),g=null):(g=w,v=y)}(b.code==="Space"||b.code==="Enter")&&(a.forEach(y=>y(b.code)),b.preventDefault()),s.get(b.code)?.()}),window.addEventListener("keyup",b=>{xl[b.code]==="down"&&(c=!1)}),t.addEventListener("touchstart",b=>{const w=performance.now();for(const y of Array.from(b.changedTouches))i.set(y.identifier,{x0:y.clientX,y0:y.clientY,t0:w,hist:[{y:y.clientY,t:w}],hx:[{x:y.clientX,t:w}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),t.addEventListener("touchmove",b=>{b.preventDefault();const w=performance.now();for(const y of Array.from(b.changedTouches)){const x=i.get(y.identifier);if(!x)continue;for(x.hist.push({y:y.clientY,t:w});x.hist.length>1&&w-x.hist[0].t>b3;)x.hist.shift();const M=y.clientY-x.hist[0].y;for(w>=x.cool&&Math.abs(M)>=y3&&(o.push(M<0?"up":"down"),M<0&&w-p<Ml+150?(d("flip",1),p=0):M<0&&(p=w),x.down=M>0&&r!==y.identifier,x.flicked=!0,x.cool=w+150,x.hist=[{y:y.clientY,t:w}]),x.hx.push({x:y.clientX,t:w});x.hx.length>1&&w-x.hx[0].t>w3;)x.hx.shift();const C=y.clientX-x.hx[0].x;w>=x.rollCool&&Math.abs(C)>=t.clientWidth*x3&&(d("roll",C>0?-1:1),x.rollCool=w+700,x.hx=[{x:y.clientX,t:w}]);const z=y.clientX-x.x0;x.dragX===null&&Math.abs(z)>=v3&&Math.abs(z)>=Math.abs(y.clientY-x.y0)*.8&&(x.dragX=y.clientX,r===null&&(r=y.identifier,x.down=!1,h++,u=0)),r===y.identifier&&x.dragX!==null&&(u=(y.clientX-x.dragX)/Math.max(1,t.clientWidth))}},{passive:!1});const k=b=>{const w=performance.now();for(const y of Array.from(b.changedTouches)){const x=i.get(y.identifier);if(i.delete(y.identifier),r===y.identifier&&(r=null),!x||x.flicked||x.dragX!==null||b.type==="touchcancel")continue;Math.hypot(y.clientX-x.x0,y.clientY-x.y0)<=14&&w-x.t0<=350&&n()?o.push(y.clientX<t.clientWidth/2?"left":"right"):n()||a.forEach(C=>C())}};return t.addEventListener("touchend",k),t.addEventListener("touchcancel",k),t.addEventListener("mousedown",()=>a.forEach(b=>b())),{take(){return o.splice(0,o.length)},holdDown:()=>c||Array.from(i.values()).some(b=>b.down),steer(){if(r===null)return null;l!==h&&(l=h,f=e());let b=f-u*p3;const w=Math.abs(b)-I.steerMax;return w>0&&(f-=Math.sign(b)*w,b-=Math.sign(b)*w),b},onAction(b){a.push(b)},onKey(b,w){s.set(b,w)},onTrick(b){m.push(b)}}}function cd(t){return/\.github\.io$/.test(location.hostname)||t.has("portal")}function rd(t){return!gt.online||t.has("seed")||t.has("z")||t.get("auto")==="1"?!1:cd(t)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function k3(t){return rd(t)&&!t.has("alt")}function S3(t){const n={};let e=null;async function o(c,i={}){try{const r={...n,accept:"application/json"};i.body&&(r["content-type"]="application/json");const u=await fetch(c,{...i,headers:r,credentials:"include",redirect:"manual",cache:"no-store"});if(u.type==="opaqueredirect"||u.status===401)return{fail:{kind:"auth",status:u.status}};if(!u.ok){const h=await u.json().catch(()=>null);return{fail:{kind:u.status>=500?"network":"rejected",status:u.status,why:h?.why??h?.error}}}return{ok:await u.json()}}catch{return{fail:{kind:"network",status:0}}}}async function a(c,i={}){const r=await o(c,i);return e="fail"in r?r.fail:null,"ok"in r?r.ok:null}const s=encodeURIComponent;return{board:c=>a(`api/ghosts?route=${s(c)}`),async paths(c,i){return i.length?(await a(`api/ghosts/paths?route=${s(c)}&pids=${i.map(s).join(",")}`))?.paths??{}:{}},leaderboard:(c="meters")=>o(`api/leaderboard?by=${c}&map=${gt.id}`),progress:()=>a("api/progress"),submit:(c,i)=>a("api/ghosts",{method:"POST",body:JSON.stringify({route:c,...i})}),lastFailure:()=>e,async logRun(c){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(c),headers:{...n,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const c=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return c?c.type==="opaqueredirect"||c.status===401?"auth":c.ok?"ok":"network":"network"}}}const bs=10,T3=60/bs,Fc=900*bs,Li=t=>Math.max(-32768,Math.min(32767,Math.round(t*100)));function A3(t){const n=Math.min(Fc,Math.floor(t.length/3)),e=new DataView(new ArrayBuffer(4+n*6)),o=t[0]??0;e.setFloat32(0,o,!0);let a=e.getFloat32(0,!0);for(let i=0;i<n;i++){const r=Li(t[i*3]-a);a+=r/100,e.setInt16(4+i*6,r,!0),e.setInt16(6+i*6,Li(t[i*3+1]),!0),e.setInt16(8+i*6,Li(t[i*3+2]),!0)}let s="";const c=new Uint8Array(e.buffer);for(let i=0;i<c.length;i+=32768)s+=String.fromCharCode(...c.subarray(i,i+32768));return btoa(s)}function N3(t){let n;try{n=atob(t)}catch{return null}const e=Math.floor((n.length-4)/6);if(e<2)return null;const o=new Uint8Array(n.length);for(let i=0;i<n.length;i++)o[i]=n.charCodeAt(i);const a=new DataView(o.buffer),s={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let c=a.getFloat32(0,!0);if(!Number.isFinite(c))return null;for(let i=0;i<e;i++)c+=a.getInt16(4+i*6,!0)/100,s.z[i]=c,s.x[i]=a.getInt16(6+i*6,!0)/100,s.v[i]=a.getInt16(8+i*6,!0)/100;return s}function ld(t,n,e){const o=Math.max(0,n*bs),a=t.n-1,s=Math.min(a,Math.floor(o)),c=Math.min(a,s+1),i=Math.min(1,o-s);return e.z=t.z[s]+(t.z[c]-t.z[s])*i,e.x=t.x[s]+(t.x[c]-t.x[s])*i,e.v=t.v[s]+(t.v[c]-t.v[s])*i,e.ended=o>=a,e.after=Math.max(0,(o-a)/bs),e}const hd=5,_i=4,C3=1500,z3=200,E3=120;function Gc(t,n,e=!1){return e?1:Math.min(1,Math.max(0,(n-C3-t*z3)/E3))}const ud=t=>t.length===1&&t[0].self;function L3(t){const n=t.runs.find(c=>c.pid===t.me),e=t.runs.filter(c=>c.pid!==t.me),o=n?.dist??0,a=c=>c.dist>=o?c.dist-o:(o-c.dist)*2,s=[];n&&s.push(n),e[0]&&s.push(e[0]);for(const c of e.slice(1).sort((i,r)=>a(i)-a(r))){if(s.length>=hd)break;s.push(c)}return s}function _3(){let t=[];const n=[];return{ghosts:()=>t,set(e){t=[];for(const o of e){const a=N3(o.path);a&&t.push({run:o.run,self:o.self,track:a,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of t)e.ahead=null,e.downSaid=!1},update(e,o){n.length=0;const a=ud(t);return t.forEach((s,c)=>{ld(s.track,e,s.at);const i=s.at.z-o,r=s.run.name,u=Gc(c,o,a)>0;u&&i>_i&&s.ahead===!1&&n.push({type:"passed",name:r,self:s.self}),u&&i<-_i&&s.ahead===!0&&n.push({type:"pass",name:r,self:s.self}),Math.abs(i)>_i&&(s.ahead=i>0),s.at.ended&&!s.downSaid&&(s.downSaid=!0,u&&s.run.crash&&Math.abs(i)<300&&n.push({type:"down",name:r,self:s.self,dist:s.run.dist}))}),n},rank(e){return 1+t.filter(o=>o.at.z>e).length}}}function R3(){let t=[],n=0,e=!1;const o=a=>{t.length<Fc*3&&t.push(a.z,a.x,a.v)};return{start(a){t=[],n=0,e=!0,o(a)},afterStep(a){e&&(n++,n%T3===0&&o(a),a.mode==="over"&&(e=!1))},seconds:()=>n/60,truncated:()=>t.length>=Fc*3,finish:()=>A3(t)}}const Ri="skyrun.myGhost",Na="me";function I3(t){let n=null;const e=(s,c)=>!!s&&s.route===c&&typeof s.path=="string"&&Number.isFinite(s.dist);function o(s){let c=null;try{c=JSON.parse(localStorage.getItem(Ri)??"null")}catch{}const i=e(c,s)?c:null,r=e(n,s)?n:null;return i&&r?r.dist>i.dist?r:i:i??r}function a(s){const c=o(s);return{me:Na,myName:null,total:c?1:0,runs:c?[{pid:Na,name:"Bạn",dist:c.dist,score:c.score,dur:c.dur,crash:c.crash}]:[]}}return{board:async s=>a(s),async paths(s,c){const i=o(s);return i&&c.includes(Na)?{[Na]:i.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(s,c){const i=o(s),r=!i||c.dist>i.dist;if(r){n={route:s,dist:c.dist,score:c.score,dur:c.dur,crash:c.crash,path:c.path};try{localStorage.removeItem(Ri),localStorage.setItem(Ri,JSON.stringify(n))}catch{}}return{saved:r,best:r?c.dist:i.dist,rank:1,total:1,bestScore:c.score,scoreRank:1}},lastFailure:()=>null,logRun:t,ping:async()=>"ok"}}const P3="modulepreload",B3=function(t,n){return new URL(t,n).href},kl={},H3=function(n,e,o){let a=Promise.resolve();if(e&&e.length>0){let u=function(h){return Promise.all(h.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),r=i?.nonce||i?.getAttribute("nonce");a=u(e.map(h=>{if(h=B3(h,o),h in kl)return;kl[h]=!0;const l=h.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(o)for(let d=c.length-1;d>=0;d--){const g=c[d];if(g.href===h&&(!l||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":P3,l||(m.as="script"),m.crossOrigin="",m.href=h,r&&m.setAttribute("nonce",r),document.head.appendChild(m),l)return new Promise((d,g)=>{m.addEventListener("load",d),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return a.then(c=>{for(const i of c||[])i.status==="rejected"&&s(i.reason);return n().catch(s)})},F3="skyRuns",Sl="sr-tele",Tl="../../shared/",Ii=new Map;function Al(t){let n=Ii.get(t);return n||(n=new Promise((e,o)=>{const a=document.createElement("script");a.src=t,a.onload=()=>e(),a.onerror=()=>o(new Error(`không tải được ${t}`)),document.head.appendChild(a)}),n.catch(()=>Ii.delete(t)),Ii.set(t,n)),n}function G3(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return(n>>>0).toString(36)}function $3(t,n,e,o){const{route:a,rv:s,sv:c,alt:i,dist:r,dur:u,score:h,crash:l,tainted:f,...m}=t;return{v:1,ch:n,pk:e,at:o,route:a,rv:s,sv:c,alt:i,dist:Math.round(r*10)/10,dur:Math.round(u*100)/100,score:Math.round(h),crash:l??null,tainted:f,detail:JSON.stringify(m)}}let He=null;function O3(){return He||(He=(async()=>{await Al(`${Tl}portal-config.js`),await Al(`${Tl}portal-firebase.js`);const t=window.Portal,n=t?.FB;if(!n?.configured())throw new Error("chưa cấu hình Firebase");const e=await n.load(),o=await H3(()=>import(`${n.SDK}/firebase-app.js`),[],import.meta.url),a=o.getApps().find(i=>i.name===Sl)??o.initializeApp(t.CONFIG,Sl),s=e.authM.getAuth(a);await s.authStateReady(),s.currentUser||await e.authM.signInAnonymously(s);let c;try{c=e.fsM.initializeFirestore(a,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{c=e.fsM.getFirestore(a)}return{fsM:e.fsM,db:c,uid:s.currentUser.uid,limit:n.limit.bind(n)}})(),He.catch(()=>He=null),He)}function D3(){const t=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async n=>{try{const e=await O3();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,F3),$3(n,t,G3(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const U3=1e9,K3=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),V3=[...document.scripts].map(t=>/assets\/index-([\w-]+)\.js/.exec(t.src)?.[1]).find(Boolean)??"dev",Nl=t=>t.thermalV>8?"thermal":t.v<-2?"low":t.v>2?"high":"zero",q3=(t,n)=>t>=U3?"trail":n>2?"u":n<-2?"d":"o",W3=t=>$.zone(J(t),ee(t)),Ca=(t,n)=>t.length?t[Math.min(t.length-1,Math.floor(n*t.length))]:0,rn=t=>Math.round(t*100)/100;function Y3(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function j3(t){let n={touch:!1,key:!1};addEventListener("keydown",()=>n.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(n.touch=!0)});let e="",o=!1,a=0,s=-1,c=null,i=h(),r=!0,u=null;function h(){const l=f=>Object.fromEntries(f.map(m=>[m,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke","boost"]),bTaken:l(["thermal","shield","smoke","boost"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1,crash:null}}return{start(l,f,m){e=f,o=m,a++,c=s<0?null:rn((performance.now()-s)/1e3),n={touch:!1,key:!1},i=h(),i.lastCmd=l.time,r=!1,u=l},state:()=>u,frame(l,f,m){l>0&&l<.5&&(i.frames.length<3e4&&i.frames.push(l),i.scaleSum+=t.quality().scale*l),i.shown=Math.max(i.shown,f),i.near=m},afterStep(l,f){if(u=l,l.mode!=="run"&&l.mode!=="crash")return;const m=Nl(l);i.tiers[m]+=f,i.multSum+=l.mult*f,m!=="low"?i.lowSince=-1:i.lowSince<0&&(i.lowSince=l.time);for(const d of l.events)d.type==="lane"?i.swipes.lane++:d.type==="vert"?i.swipes[d.kind==="flare"?"up":"down"]++:d.type==="hurt"?i.hurts++:d.type==="crash"&&(i.deathNear=i.near,i.crash=d.kind),(d.type==="lane"||d.type==="vert")&&(i.lastCmd=l.time);for(const d of l.pickups){if(d.z>l.z-3.5)break;if(!i.seen.has(d.id))if(i.seen.add(d.id),d.kind==="lantern"){const g=q3(d.id,d.v);i.lSpawn[g]++,d.taken&&i.lTaken[g]++}else i.bSpawn[d.kind]++,d.taken&&i.bTaken[d.kind]++}for(const d of l.obstacles){if(!d.passed||i.rows.has(d.row)||(i.rows.add(d.row),l.hurtRow===d.row||l.mode!=="run"))continue;const g=l.time-l.dodgeTime;g<1.5&&Vo(d,l.dodgeX,l.thermalV,0)&&i.leads.push(g),d.kind==="bridge"&&i.lowSince>=0&&l.time-i.lowSince>=.5&&i.bridgesFromLow++}},finish(l,f,m,d,g="crash"){if(r)return null;r=!0,s=performance.now(),f??=i.crash;const v=[...i.frames].sort((x,M)=>x-M),p=i.frames.reduce((x,M)=>x+M,0),k=[...i.leads].sort((x,M)=>x-M),b=nm(),w=jo(),y=t.quality();return{lv:1,route:e,rv:d,sv:Je,alt:o,build:V3,session:K3,runNo:a,wait:c,dist:Math.floor(l.z),dur:rn(l.time),score:xe(l),crash:f,end:g,tainted:m,hurts:i.hurts,device:{tier:y.tier,gov:rn(p>0?i.scaleSum/p:y.scale),fps50:Math.round(v.length?1/Ca(v,.5):0),fps5:Math.round(v.length?1/Ca(v,.95):0),input:n.touch&&n.key?"mixed":n.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:w.ghosts,music:b.music?w.music:"off",tutorial:Y3()},death:f?{phase:Math.round(J(l.z)),zone:W3(l.z),tier:Nl(l),sinceCmd:rn(l.time-i.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust),boost:Math.round(l.parts.boost)},lanterns:{spawned:i.lSpawn,taken:i.lTaken,bestStreak:l.bestStreak,avgMult:rn(l.time>0?i.multSum/l.time:1)},tiers:{low:rn(i.tiers.low),zero:rn(i.tiers.zero),high:rn(i.tiers.high),thermal:rn(i.tiers.thermal)},swipes:i.swipes,bridgesFromLow:i.bridgesFromLow,boosters:{spawned:i.bSpawn,taken:i.bTaken},lead:{p10:rn(Ca(k,.1)),p50:rn(Ca(k,.5)),n:k.length},ghosts:{shown:i.shown,deathNear:i.deathNear}}}}}const $c="skyrun.pending",X3=12e4,Cl=[1500,4e3];function za(){try{const t=JSON.parse(localStorage.getItem($c)??"[]");return Array.isArray(t)?t:[]}catch{return[]}}function Pi(t){try{t.length?localStorage.setItem($c,JSON.stringify(t)):localStorage.removeItem($c)}catch{}}function zl(t){const n=Date.now(),e=[Bc(new Date(n)),Bc(new Date(n-864e5))].map(o=>o.slice(0,10));return typeof t.route=="string"&&e.includes(t.route.slice(0,10))&&!!t.run}function Z3(t){let n=performance.now(),e=!1;const o=s=>new Promise(c=>setTimeout(c,s));async function a(s,c){for(let i=0;;i++){const r=await t.submit(s,c);if(r)return{ok:r};const u=t.lastFailure()??{kind:"network",status:0};if(u.kind!=="network"||i>=Cl.length)return{fail:u};await o(Cl[i])}}return{keepAlive(s){const c=performance.now();c-n<X3||(n=c,t.ping().then(i=>{i!=="auth"||e||(e=!0,s())}))},async submit(s,c){n=performance.now();const i={route:s,run:c,at:Date.now()};Pi([...za().filter(zl),i].slice(-3));const r=await a(s,c);return(!("fail"in r)||r.fail.kind==="rejected")&&Pi(za().filter(u=>u.at!==i.at||u.route!==s)),r},async flush(){const s=za().filter(zl),c=[],i=[];for(const r of s)await t.submit(r.route,r.run)?c.push(r.run.dist):t.lastFailure()?.kind!=="rejected"&&i.push(r);return(s.length||za().length)&&Pi(i),c}}}const Q3=160;function J3(t,n){const e=document.createElement("div");e.className="ghost-layer";const o=Array.from({length:n},()=>{const r=document.createElement("div");return r.className="ghost-tag",e.appendChild(r),r}),a=document.createElement("span");a.className="ghost-rank",a.hidden=!0,t.appendChild(e),(t.querySelector(".hud-rank-slot")??e).appendChild(a);const s=new _,c=new WeakMap;let i="";return{update(r,u,h,l,f,m){e.classList.toggle("on",m&&h.length>0);const d=m&&l&&l.total>1?`#${l.place}/${l.total}`:"";if(d!==i&&(i=d,a.hidden=!d,a.classList.toggle("first",l?.place===1),a.innerHTML=d?`${O.wingsuit}#${l.place}<small>/${l.total}</small>`:""),!m)return;const g=t.clientWidth,v=t.clientHeight;o.forEach((p,k)=>{const b=k<u.count?h[u.owner[k]]:void 0,w=u.alphas[k]??0;if(!b||w<.15||Math.abs(b.at.z-f)>Q3){p.style.opacity="0";return}if(s.copy(u.heads[k]).project(r),s.z>1){p.style.opacity="0";return}const y=b.self?"Kỷ lục của bạn":b.run.name;p.classList.toggle("self",b.self),p.textContent!==y&&(p.textContent=y,c.set(p,p.offsetWidth/2));const x=c.get(p)??0,M=Math.min(Math.max((s.x+1)*.5*g,x+6),g-x-6);p.style.opacity=Math.min(1,w*1.6).toFixed(2),p.style.transform=`translate(${M.toFixed(1)}px, ${((1-s.y)*.5*v).toFixed(1)}px) translate(-50%, -100%)`})}}}const Ja=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function ty(){const t=document.createElement("button");t.type="button",t.className="board-btn",t.setAttribute("aria-label","Bảng xếp hạng"),t.innerHTML=`<span class="board-btn-icon" aria-hidden="true">${O.trophy}</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>`,t.hidden=!0;const n=t.querySelector(".board-btn-rank");t.addEventListener("click",()=>t.classList.remove("fresh"));const e=o=>{n.hidden=!o,n.textContent=o?`#${o}`:""};return{el:t,setRank:e,bump(o){e(o),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump","fresh")},seen:()=>t.classList.remove("fresh")}}function ny(t,n,e,o){const a=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!a||Ja())return e.bump(o);const s=t.getBoundingClientRect(),c=n.getBoundingClientRect(),i=a.getBoundingClientRect(),r=c.left+c.width/2-s.left,u=c.top+c.height/2-s.top,h=i.left+i.width/2-s.left-r,l=i.top+i.height/2-s.top-u,f=document.createElement("div");f.className="rank-fly",f.innerHTML=O.trophy,f.style.left=`${r}px`,f.style.top=`${u}px`,t.appendChild(f);const m=(v,p,k)=>`translate(calc(-50% + ${v}px), calc(-50% + ${p}px)) scale(${k})`;let d=!1;const g=()=>{d||(d=!0,f.remove(),e.bump(o))};f.animate([{transform:m(0,0,.6),opacity:0},{transform:m(h*.3,l*.45-70,1.7),opacity:1,offset:.35},{transform:m(h,l,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=g,setTimeout(g,900)}const ts=t=>Math.floor(t).toLocaleString("vi-VN"),Ea="meters",La=900;function ey(t,n){const e=document.createElement("li");e.className=t.pos==="me"?"me":`ctx ${t.pos}`;for(const[o,a]of[["r",`#${t.rank}`],["n",t.pos!=="me"?t.name:"Bạn"],["v",ts(t.value)+n]]){const s=document.createElement("span");s.className=o,s.textContent=a,e.appendChild(s)}return e}function El(t,n,e,o,a){const s=performance.now(),c=()=>{t.textContent=a(e)},i=r=>{const u=Math.min(1,(r-s)/o);t.textContent=a(Math.round(n+(e-n)*(1-(1-u)**3))),u<1&&requestAnimationFrame(i)};requestAnimationFrame(i),setTimeout(c,o+80)}function oy(t){let n,e=0;async function o(){const s=e,c=await t.client.leaderboard(Ea);if(s!==e||!("ok"in c))return;const i=c.ok.mine;n=i?{rank:i.rank,value:i[Ea]??0}:null,i&&ed(Bt,i.meters??0),t.button.setRank(i?.rank??null)}function a(s,c,i,r,u){const{by:h,rank:l,best:f,improved:m,climbed:d}=c,{tab:g,unit:v}=t.text(h),p=tt=>r[tt-1],k=[],b=p(l-1),w=p(l+1);b&&k.push({rank:l-1,name:b.name,value:b[h]??0,pos:"above"}),k.push({rank:l,name:u,value:f,pos:"me"}),w&&k.push({rank:l+1,name:w.name,value:w[h]??0,pos:"below"});const y=document.createElement("div");y.className="rank-card",y.setAttribute("role","button"),y.setAttribute("aria-label",`Xem bảng xếp hạng ${g}`);const x=document.createElement("div");x.className="rank-head",x.innerHTML=`${O.trophy}<b>Bảng xếp hạng</b><span class="by"></span><span class="rank-chip" hidden></span>`,x.querySelector(".by").textContent=`· ${g}`;const M=x.querySelector(".rank-chip");M.textContent=m?i===null?"Mới lên bảng":d&&i?`▲ ${i.rank-l}`:"Kỷ lục mới":"";const C=document.createElement("ol");C.className="rank-rows";const z=k.map(tt=>ey(tt,v));C.append(...z);const E=document.createElement("div");E.className="rank-note";const A=(i?r.slice(l,i.rank):i===null?r.slice(l):[]).map(tt=>tt.name),S=A.length>2?`${A.slice(0,2).join(", ")} +${A.length-2}`:A.join(", ");E.textContent=l===1&&d?"Bạn đang dẫn đầu bảng!":d&&S?`Vượt ${S}!`:i===null?"Đã có tên trên bảng!":d?`Lên hạng #${l}!`:l===1?m?"Kỷ lục mới — giữ ngôi #1":"Bạn vẫn giữ ngôi #1":m?`Kỷ lục mới — giữ hạng #${l}`:b?`Vượt ${ts(b[h]??0)}${v} để lên #${l-1}`:`Bay xa hơn để vượt #${l-1}`;const L=document.createElement("span");L.className="rank-more",L.textContent="Cả bảng ›",E.appendChild(L),y.append(x,C,E),Zt(y);let P=!1;y.addEventListener("click",tt=>{tt.stopPropagation(),P=!0,t.button.seen(),t.open(h)}),s.before(y);const B=z[k.findIndex(tt=>tt.pos==="me")],U=B.querySelector(".r"),W=()=>{M.hidden=!M.textContent,m&&B.classList.add("shine"),setTimeout(()=>{if(!m||P)return t.button.setRank(l);y.isConnected?ny(t.root,U,t.button,l):t.button.bump(l)},Ja()?0:450)};if(!d||Ja())return void setTimeout(W,Ja()?0:400);const X=B.getBoundingClientRect().height+2,Z=w?z[z.length-1]:void 0,et={duration:La,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};B.animate([{transform:`translateY(${X}px)`,opacity:Z?1:0},{transform:"none",opacity:1}],et),Z?.animate([{transform:`translateY(${-X}px)`},{transform:"none"}],et),U.textContent=i?`#${i.rank}`:"#–";const mt=B.querySelector(".v");i&&(mt.textContent=ts(i.value)+v),setTimeout(()=>{i?El(U,i.rank,l,La,tt=>`#${tt}`):U.textContent=`#${l}`,El(mt,i?.value??0,f,La,tt=>ts(tt)+v)},380),setTimeout(W,380+La)}return{snapshot:o,async celebrate(s,c,i){e++;const r=s.metersRank!==void 0?"meters":"score",u=r===Ea?n:void 0,h=i?t.root.querySelector(".screens.over .over-card [data-online]"):null,l=h?await t.client.leaderboard(r):null,f=l&&"ok"in l?l.ok:null,m=f?.mine?.rank??s.metersRank??s.scoreRank,d=f?.mine?.[r]??(r==="meters"?s.bestMeters??0:s.bestScore);r===Ea&&(n={rank:m,value:d});const g=r==="meters"?c.dist:c.score,v=u===null||(u!==void 0?d>u.value:g>=d),p=v&&(u===null||u!==void 0&&u.rank>m);if(h?.isConnected)return a(h,{by:r,rank:m,best:d,improved:v,climbed:p},u,f?.top??[],f?.mine?.name??"");t.button.setRank(m),v&&t.button.el.classList.add("fresh")}}}function ay(t,n){const e=t.querySelector(".me");if(!e)return;e.style.position="static";const o=e.getBoundingClientRect(),a=t.getBoundingClientRect();e.style.position="",t.scrollTop+=o.top-a.top-(a.height-o.height)/2,n&&e.classList.add("me-new")}const ta=t=>Math.floor(t).toLocaleString("vi-VN"),ge={meters:{tab:"Quãng xa",icon:"route",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",icon:"star",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",icon:"lantern",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},Ll=["meters","score","lanterns"];function sy(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":t.kind==="network"?`Chưa tải được bảng (${t.status?`máy chủ báo lỗi ${t.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${t.why??t.status}).`}const Qn=(t,n,e,o="span")=>{const a=document.createElement(o);a.className=n,a.textContent=e,t.appendChild(a)},iy=t=>(t.trim().split(/\s+/).pop()??"?").charAt(0).toUpperCase()||"?",cy=(t,n)=>n==="meters"?yl(t.route):`${ta(t.dist)} m · ${yl(t.route)}`;function _l(t,n,e,o){const a=document.createElement("li");return a.className=o?"me":"",Qn(a,"board-rank",`#${e}`),Qn(a,"board-name",o?"Bạn":t.name),Qn(a,"board-score",ta(t[n]??0)+ge[n].unit),Qn(a,"board-meta",cy(t,n)),a}function ry(t,n,e){return t.slice(0,3).map((o,a)=>{const s=document.createElement("div");return s.className=`pod pod-${a+1}${o.pid===e?" me":""}`,Qn(s,"pod-avatar",iy(o.name)),Qn(s,"pod-name",o.pid===e?"Bạn":o.name),Qn(s,"pod-val",ta(o[n]??0)+ge[n].unit,"b"),Qn(s,"pod-step",String(a+1)),s})}const ly=[1500,4e3];function hy(t,n){const e=ty(),o=e.el,a=document.createElement("div");a.className="board-panel",a.hidden=!0;const s=Ll.map(x=>`<button type="button" role="tab" class="ui-seg" data-by="${x}">${O[ge[x].icon]}${ge[x].tab}</button>`).join("");a.innerHTML=`
    <div class="board-card ui-indigo ui-trim" role="dialog" aria-label="Bảng xếp hạng">
      <div class="panel-head">${O.trophy}<div><b>${gt.name}<span class="panel-pill board-season"></span></b><small class="board-sub"></small></div></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="board-tabs" role="tablist">${s}</div>
      <p class="board-status"></p>
      <button type="button" class="ui-btn-cloth board-retry" hidden>${O.rotate}Thử lại</button>
      <div class="board-scroll" data-scroll><div class="board-podium" hidden></div><ol class="board-list"></ol></div>
    </div>`,t.append(o,a);const c=a.querySelector(".board-season"),i=a.querySelector(".board-sub"),r=a.querySelector(".board-status"),u=a.querySelector(".board-retry"),h=a.querySelector(".board-list"),l=a.querySelector(".board-podium"),f=a.querySelector("[data-scroll]"),m=[...a.querySelectorAll(".board-tabs button")];c.textContent=`Mùa ${Je}`;let d="meters";const g={};Zt(o),Zt(a);let v=0,p=!1;const k=()=>{a.hidden=!0,v++,p=!1};function b(){for(const x of m)x.setAttribute("aria-selected",String(x.dataset.by===d));i.textContent=ge[d].sub}async function w(){a.hidden=!1,b(),u.hidden=!0,r.textContent="Đang tải…",r.classList.remove("empty"),h.replaceChildren(),l.replaceChildren(),l.hidden=!0;const x=++v,M=d,C=ge[M];let z=await n.leaderboard(M);for(const T of ly){if(x!==v||"ok"in z||z.fail.kind!=="network")break;await new Promise(A=>setTimeout(A,T)),x===v&&(z=await n.leaderboard(M))}if(x!==v)return;if("fail"in z){const T=g[M];r.textContent=sy(z.fail)+(T?` Bảng ĐÃ ghi ${C.best} của bạn: ${ta(T.best)}${C.unit} — hạng #${T.rank}.`:""),u.hidden=z.fail.kind==="auth";return}const E=z.ok;if(c.textContent=`Mùa ${E.season}`,!E.top.length){r.innerHTML=`${O.lantern}<span>${C.empty}</span>`,r.classList.add("empty");return}if(r.textContent=`${ta(E.total)} ${C.count}`,l.replaceChildren(...ry(E.top,M,E.me)),l.hidden=!1,h.replaceChildren(...E.top.slice(3).map((T,A)=>_l(T,M,A+4,T.pid===E.me))),E.mine&&!E.top.some(T=>T.pid===E.me)){const T=document.createElement("li");T.className="board-gap",T.textContent="…",h.append(T,_l(E.mine,M,E.mine.rank,!0))}ay(f,p),p=!1}const y=oy({root:t,client:n,button:e,text:x=>ge[x],open:x=>(d=x,p=!0,void w())});y.snapshot(),o.addEventListener("click",()=>{w()}),u.addEventListener("click",()=>{w()});for(const x of m)x.addEventListener("click",()=>{d=Ll.find(M=>M===x.dataset.by)??"meters",w()});return a.querySelector("[data-close]").addEventListener("click",k),a.addEventListener("click",x=>{x.target===a&&k()}),window.addEventListener("keydown",x=>{x.code==="Escape"&&!a.hidden&&k()}),{setAvailable(x){o.hidden!==!x&&(o.hidden=!x,x||k())},runStart(){k(),y.snapshot()},remember(x,M,C){g.score={best:x.bestScore,rank:x.scoreRank},x.metersRank!==void 0&&(g.meters={best:x.bestMeters??0,rank:x.metersRank}),ed(gt.id,x.bestMeters??0),x.lanternRank!==void 0&&(g.lanterns={best:x.bestLanterns??0,rank:x.lanternRank}),y.celebrate(x,M,C)}}}const ke=t=>Math.floor(t).toLocaleString("vi-VN");function uy(t,n){const e=t.runs[0];if(n)return e?[{icon:"wingsuit",text:`Bóng hôm nay ${ke(e.dist)} m`}]:[];if(!e)return[{icon:"crown",text:"Chưa ai bay hôm nay — mở đường!"}];const o=e.pid===t.me?"Bạn":e.name;return[{icon:"users",text:`${ke(t.total)} người bay hôm nay`},{icon:"crown",text:`${o} ${ke(e.dist)} m`}]}function my(t,n){return n?[{icon:"wingsuit",text:t.saved?`Bóng mới ${ke(t.best)} m`:`Bóng hôm nay ${ke(t.best)} m`}]:[]}function dy(t,n){return{score:n.score>=t.bestScore?t.scoreRank:null,lantern:t.lanternRank&&n.lanterns>=(t.bestLanterns??0)?t.lanternRank:null}}function fy(t,n){if(!t)return null;let e=0,o=0;for(const s of t.runs)s.pid===t.me&&(e=s.dist);const a=Math.max(n,e);for(const s of t.runs)s.pid!==t.me&&s.dist>a&&o++;return{place:o+1,total:t.total+(e>0?0:1)}}const gy=t=>`Ván có bot lái hoặc nhảy quãng — ${t?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function py(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":t.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${t.why??t.status}).`}function vy(t){return t.type==="pass"?t.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${t.name}!`,"combo"]:t.type==="passed"?[t.self?"Kỷ lục của bạn vượt lên":`${t.name} vượt lên`,"big"]:[t.self?`Kỷ lục của bạn dừng ở ${ke(t.dist)} m`:`${t.name} rơi ở ${ke(t.dist)} m`,"big"]}const yy=200,by=1.2,wy=t=>Math.floor(t).toLocaleString("vi-VN");function xy(t){const n=k3(t.params),e=cd(t.params),o=e?I3(D3()):S3(t.params),a=rd(t.params)?j3({quality:t.quality}):null,s=R3(),c=Z3(o),i=_3(),r=J3(t.root,hd),u=n&&!e?hy(t.root,o):null;let h="",l=0,f=!1,m=-9,d=null,g=0,v=!1,p=0,k=null,b="";const w=M=>{b=M,t.screens.setOnline(M)},y=(M,C,z)=>{const E=M&&a?.finish(M,C,v,t.rv,z);E&&o.logRun(E)};a&&addEventListener("pagehide",()=>f&&y(a.state(),null,"close"));async function x(M,C){h=M;const z=++l,E=await c.flush(),T=await o.board(M);if(z!==l||!T)return;k=T;const A=E.length?`Đã gửi bù ván ${wy(Math.max(...E))} m`:"";C?(t.screens.setChips(uy(T,e)),w(A)):A&&w(b?`${b} · ${A}`:A);const S=L3(T),L=await o.paths(M,S.map(B=>B.pid));if(z!==l)return;const P=S.filter(B=>L[B.pid]).map(B=>({run:B,self:B.pid===T.me,path:L[B.pid]}));f?d=P:i.set(P)}return n&&x(t.route,!0),{runStart(M,C){n&&C!==h&&(i.set([]),d=null,x(C,!1)),d&&i.set(d),d=null,s.start(M),i.reset(),f=!0,u?.runStart(),m=-9,g++,v=!1,p=M.z,a?.start(M,C,t.params.has("alt"))},afterStep(M,C){(C||Math.abs(M.z-p)>10)&&(v=!0),p=M.z,s.afterStep(M),a?.afterStep(M,1/60)},present(M,C,z,E){const T=f&&(M.mode==="run"||M.mode==="crash"),A=s.seconds()-(1-z)/60;if(T)for(const S of i.update(A,C.z))M.mode!=="run"||A-m<by||(m=A,t.hud.toast(...vy(S)));if(n&&!e&&c.keepAlive(()=>T?t.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):w(`${b?`${b} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),t.view.update(T?i.ghosts():[],C,A,E,t.camera.position),a&&M.mode==="run"){let S=!1;for(let L=0;L<t.view.count;L++)S||=t.view.heads[L].distanceTo(t.camera.position)<15;a.frame(E,t.view.count,S)}r.update(t.camera,t.view,i.ghosts(),fy(k,C.z),C.z,T),u?.setAvailable(t.screens.visible()!==null)},async progress(){if(!n||e)return null;const M=await o.progress();return M?{score:M.season===Je?M.score:{},meters:M.meters??{},run:M.run??{}}:null},runAbandon(M){f&&y(M,null,"abandon"),f=!1},async runOver(M,C){if(f=!1,y(M,C,"crash"),!n||!h||M.z<yy)return;if(v)return w(gy(e));const z=g;e||w("Đang gửi ván lên bảng…");const E=await c.submit(h,{sv:Je,lanterns:M.lanterns,dist:Math.floor(M.z),score:xe(M),dur:Math.min(3600,Math.round(s.seconds()*10)/10),crash:s.truncated()?null:C,path:s.finish()});z===g&&("fail"in E?w(py(E.fail)):(w(""),t.screens.setChips(my(E.ok,e)),e||t.screens.setRanks(dy(E.ok,{score:xe(M),lanterns:M.lanterns})))),"ok"in E&&u?.remember(E.ok,{dist:Math.floor(M.z),score:xe(M)},z===g),"ok"in E&&await x(h,!1)}}}const md=()=>`<button type="button" class="ui-badge" data-snd="sfx" aria-label="Tắt/bật tiếng hiệu ứng">${O.speaker}</button><button type="button" class="ui-badge" data-snd="music" aria-label="Tắt/bật nhạc nền">${O.note}</button>`;function My(t,n){const e=document.createElement("div");e.className="sound-btns",e.dataset.state="idle",e.innerHTML=md(),t.appendChild(e),Zt(e);const o=()=>{const s=n.prefs();for(const c of t.querySelectorAll("[data-snd]"))c.classList.toggle("off",!s[c.dataset.snd])},a=s=>{n.prefs()[s]&&n.justUnlocked()||(s==="sfx"?n.toggleSfx:n.toggleMusic)(),o()};return t.addEventListener("click",s=>{const c=s.target instanceof Element?s.target.closest("[data-snd]"):null;c&&(s.stopPropagation(),a(c.dataset.snd==="sfx"?"sfx":"music"))}),o(),{sync:o,toggle:a,el:e}}const ky=.8;function Sy(t,n,e){const o=document.createElement("button");o.type="button",o.className="ui-badge pause-btn",o.setAttribute("aria-label","Tạm dừng"),o.innerHTML=O.pause,n.prepend(o);const a=document.createElement("div");a.className="pause-screen",a.innerHTML=`<div class="pause-card ui-indigo ui-trim" role="dialog" aria-label="Tạm dừng">
      <div class="pause-title">${O.pause}Tạm dừng</div>
      <button type="button" class="ui-btn-lacquer" data-resume>${O.play}Bay tiếp</button>
      <div class="pause-row">${md()}<button type="button" class="ui-badge" data-open-settings aria-label="Cài đặt">${O.gear}</button></div>
      <button type="button" class="ui-btn-cloth pause-home" data-home>${O.home}Về sảnh</button>
      <div class="pause-confirm" hidden><p>Bỏ ván này?</p><div class="row">
        <button type="button" class="ui-btn-cloth" data-stay>Ở lại</button><button type="button" class="ui-btn-cloth quit" data-quit>Bỏ ván</button></div></div>
      <div class="pause-hint">${e.touch?"Hoặc chạm ra ngoài bảng":"Hoặc bấm Space / P"}</div></div>`,t.appendChild(a),Zt(a);const s=a.querySelector("[data-home]"),c=a.querySelector(".pause-confirm"),i=d=>{c.hidden=!d,s.hidden=d};let r=!1,u=!1,h=!1,l=1;const f=()=>{a.classList.toggle("on",r),n.dataset.state=h?"crash":u?r?"paused":"run":"idle",r||i(!1)},m={paused:()=>r,pause(){!u||r||(r=!0,f())},resume(){r&&(r=!1,l=.15,f())},setRunning(d,g=!1){u===d&&h===g||(u=d,h=g,d||(r=!1),f())},factor(d){return r?0:(l=Math.min(1,l+d/ky),l)}};return o.addEventListener("click",()=>m.pause()),a.addEventListener("click",d=>{const g=d.target instanceof Element?d.target:null;g&&(g===a||g.closest("[data-resume]")?m.resume():g.closest("[data-home]")?i(!0):g.closest("[data-stay]")?i(!1):g.closest("[data-quit]")&&(m.resume(),e.onHome()))}),Zt(o),document.addEventListener("visibilitychange",()=>{document.hidden&&m.pause()}),window.addEventListener("keydown",d=>{!d.repeat&&(d.code==="KeyP"||d.code==="Escape")&&(r?m.resume:m.pause)()}),m}const Ty=1.2,Bi=new _,So=new _,Rl=new _;function Il(t,n,e){const o=e.clientWidth,a=e.clientHeight;if(!o||!a||(t.getWorldPosition(Bi),So.copy(Bi).project(n),So.z>1))return null;Rl.setFromMatrixColumn(n.matrixWorld,0).multiplyScalar(Ty).add(Bi).project(n);const s=Math.abs(Rl.x-So.x)*.5*o,c=(So.x*.5+.5)*o,i=(.5-So.y*.5)*a;return{x:c-s,y:i-s,w:2*s,h:2*s}}function Ay(t,n="ui-chip"){const e=document.createElement("span");e.className=`${n}${t.tone?` ${t.tone}`:""}`,e.innerHTML=O[t.icon];const o=document.createElement("span");return o.textContent=t.text,e.appendChild(o),e}function dd(t,n,e){t&&(t.replaceChildren(...(n??[]).map(o=>Ay(o,e))),t.hidden=!n?.length)}const Ny=[["dragSide","Kéo ngang: lượn tránh cột đá","← →"],["swipeUp","Vuốt lên: vọt qua mỏm đá","↑"],["swipeDown","Vuốt xuống: chui dưới cầu","↓"],["lantern","Nhặt đèn trời: nhân điểm",""],["heart","Hai tim: va nhẹ chỉ mất một",""]];function Cy(t){const n=document.createElement("div");n.className="help-panel",n.hidden=!0,n.innerHTML=`
    <div class="help-card ui-indigo ui-trim" role="dialog" aria-label="Cách chơi">
      <div class="panel-head">${O.help}<b>Cách chơi</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <ul class="help-rows">${Ny.map(([o,a,s])=>`<li><span class="help-ic">${O[o]}</span><span>${a}</span>${s?`<kbd class="key-only">${s}</kbd>`:""}</li>`).join("")}</ul>
      <p class="help-keys key-only"><kbd>P</kbd> / <kbd>Space</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</p>
      <button type="button" class="ui-btn-lacquer" data-close>${O.check}Đã hiểu</button>
    </div>`,t.appendChild(n),Zt(n);const e=()=>{n.hidden=!0};return n.addEventListener("click",o=>{o.stopPropagation();const a=o.target instanceof Element?o.target:null;(a===n||a?.closest("[data-close]"))&&e()}),window.addEventListener("keydown",o=>{!n.hidden&&(o.code==="Escape"||o.code==="Space"||o.code==="Enter")&&e()},{capture:!0}),{open:()=>{n.hidden=!1}}}const Fn=t=>Math.floor(t).toLocaleString("vi-VN"),zy={pillar:["pillar","dragSide","Kéo ngang sang làn trống","Bấm ← → sang làn trống"],spike:["spike","swipeUp","Vuốt lên để vọt qua","Bấm ↑ để vọt qua"],ridge:["ridge","swipeUp","Vuốt lên vọt qua sống đá","Bấm ↑ vọt qua sống đá"],bridge:["bridge","swipeDown","Vuốt xuống chui dưới cầu","Bấm ↓ chui dưới cầu"],overhang:["overhang","swipeDown","Vuốt xuống chui dưới mái đá","Bấm ↓ chui dưới mái đá"]},Ey={spike:["house","swipeUp","Vuốt lên vọt qua nóc nhà","Bấm ↑ vọt qua nóc nhà"],ridge:["house","swipeUp","Vuốt lên vọt qua mái đình","Bấm ↑ vọt qua mái đình"],bridge:["house","swipeDown","Vuốt xuống chui qua cổng làng","Bấm ↓ chui qua cổng làng"]},Ly=["bridge","swipeDown","Vuốt xuống chui dưới cabin","Bấm ↓ chui dưới cabin"];function _y(t,n,e){if(matchMedia("(prefers-reduced-motion: reduce)").matches||n<=0)return void(t.textContent=Fn(n));const o=performance.now(),a=s=>{const c=Math.min(1,(s-o)/e);t.textContent=Fn(n*(1-(1-c)**3)),c<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(()=>{t.textContent=Fn(n)},e+80)}function Ry(t,n){const[e,o]=t.querySelectorAll("[data-stats] > .ui-chip"),a=(s,c)=>{if(!s||!c||s.textContent?.startsWith("0 "))return;const i=s.querySelector(".chip-rank")??s.appendChild(document.createElement("b"));i.className="chip-rank",i.textContent=`#${c}`};a(e,n.score),a(o,n.lantern)}const Iy=.9;function Py(t,n){const e=Math.min(1,t/n);return`<div class="over-goal" role="img" aria-label="Đạt ${Math.floor(e*100)}% kỷ lục ${Fn(n)} m"><span class="goal-bar"><i style="width:${(e*100).toFixed(1)}%"></i></span><span class="goal-best">${O.trophy}Kỷ lục ${Fn(n)} m</span></div>`}function By(t,n,e,o,a){const s=xe(n),c=w5(Bt,n.z,s,a),i=Math.floor(n.z),r=!c.record&&!c.tie&&i<c.prevM,u=c.record?'<span class="ui-ribbon">Kỷ lục mới!</span>':c.tie?'<span class="ui-ribbon tie">Bằng kỷ lục</span>':r&&i>=c.prevM*Iy?`<span class="over-kicker near">Suýt kỷ lục! Thiếu ${Fn(c.prevM-i)} m</span>`:'<span class="over-kicker">Hạ cánh khẩn cấp</span>',h=e?ee(n.z)&&Ey[e]||e==="bridge"&&qs(n.z)&&Ly||zy[e]:null;return t.innerHTML=`
    <div class="over-card ui-paper" role="dialog" aria-label="Kết thúc ván">
      <div class="over-left">
        <div class="over-head">${u}</div>
        <div class="over-hero"><span data-count>0</span><small>m</small></div>
        ${r?Py(i,c.prevM):c.record&&c.prevM>0?`<div class="over-goal up">${O.trophy}Hơn kỷ lục cũ ${Fn(i-c.prevM)} m</div>`:""}
        <div class="over-chips" data-stats></div>
        ${h?`<p class="over-tip"><span class="ico">${O[h[0]]}${O[h[1]]}</span><span>${o?h[2]:h[3]}</span></p>`:""}
      </div>
      <div class="over-right">
        <div class="over-online-chips" data-chips hidden></div>
        <div class="screen-online" data-online hidden></div>
        <div class="over-actions">
          <button type="button" class="ui-btn-lacquer btn-play" data-play>${O.play}<span>Bay lại</span><kbd>Space</kbd></button>
          <button type="button" class="ui-btn-cloth" data-lobby aria-label="Về sảnh chọn map">${O.home}Sảnh</button>
        </div>
      </div>
    </div>`,dd(t.querySelector("[data-stats]"),[{icon:"star",text:`${Fn(s)} điểm`},{icon:"lantern",text:`${Fn(n.lanterns)} đèn`}]),_y(t.querySelector("[data-count]"),n.z,900),c.record}const Pl=t=>Math.floor(t).toLocaleString("vi-VN");function Hy(){const t=Pr(Bt);return t?t.m>0?{icon:"trophy",text:`Kỷ lục ${Pl(t.m)} m`,tone:"gold"}:{icon:"trophy",text:`Kỷ lục ${Pl(t.score)} điểm`,tone:"gold"}:null}function Fy(){return`
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
    </div>`}function Gy(t){const n=t.querySelector(".title-logo");if(!n)return;const e=()=>{t.classList.add("no-logo")};n.complete&&!n.naturalWidth?e():n.addEventListener("error",e,{once:!0})}const $y=800,Oy=350;function Dy(t,n,e){const o=document.createElement("div");o.className="screens",t.appendChild(o);const a=Cy(t),s=matchMedia("(pointer: coarse)").matches;let c=null,i=0,r="",u=[],h=0;const l=()=>{const d=o.querySelector("[data-online]");d&&(d.textContent=r,d.hidden=!r);const g=c==="title"?Hy():null;dd(o.querySelector("[data-chips]"),g?[g,...u]:u)};o.addEventListener("click",d=>{const v=(d.target instanceof Element?d.target:null)?.closest("[data-play],[data-lobby],[data-help]");v&&(d.stopPropagation(),v.dataset.play!==void 0?n():v.dataset.lobby!==void 0?e():a.open())}),b5(()=>{c==="title"&&l()});const f=()=>{for(const d of o.querySelectorAll("button"))Zt(d)},m=()=>{clearTimeout(h),o.classList.remove("leaving")};return{visible:()=>c,tapReady:()=>c!=="over"||performance.now()-i>$y,showTitle(){m(),c="title",o.className="screens title",o.innerHTML=Fy(),Gy(o),f(),l()},setOnline(d){r=d??"",l()},setChips(d){u=d??[],l()},setRanks(d){c==="over"&&Ry(o,d)},showOver(d,g,v){m(),c="over",i=performance.now(),o.className="screens over";const p=By(o,d,g,s,v);return f(),r="",u=[],l(),p},hide(){const d=c;if(c=null,d!=="title"||matchMedia("(prefers-reduced-motion: reduce)").matches){o.className="screens",o.innerHTML="";return}o.classList.add("leaving"),h=window.setTimeout(()=>{o.className="screens",o.innerHTML=""},Oy)}}}const Uy=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],Ky={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách của map — hết bài tự sang bài khác"},Bl=t=>`<div class="two" data-sw="${t}"><button type="button" class="ui-seg" data-on="1">Bật</button><button type="button" class="ui-seg" data-on="0">Tắt</button></div>`;function Vy(t,n,e,o,a){o.mode=jo().ghosts;const s=document.createElement("button");s.type="button",s.className="ui-badge",s.dataset.openSettings="",s.setAttribute("aria-label","Cài đặt"),s.innerHTML=O.gear,n.el.insertBefore(s,n.el.querySelector("[data-snd]"));const c=document.createElement("div");c.className="settings-panel",c.hidden=!0,c.innerHTML=`
    <div class="settings-card ui-indigo ui-trim" role="dialog" aria-label="Cài đặt">
      <div class="panel-head">${O.gear}<b>Cài đặt</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="settings-scroll" data-scroll>
        <h3>${O.speaker}Âm thanh</h3>
        <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span>${Bl("sfx")}</div>
        <div class="settings-row"><span>Nhạc nền</span>${Bl("music")}</div>
        <h3>${O.note}Chọn nhạc nền <small data-map-music></small></h3><p class="settings-note"></p><div class="settings-music"></div>
        <h3>${O.wingsuit}Bóng ma <small>người đã bay hôm nay</small></h3><div class="settings-ghost"></div>
      </div>
    </div>`,t.append(c),Zt(c);const i=c.querySelector(".settings-note");c.querySelector("[data-map-music]").textContent=`nhạc của ${gt.name}`;const r=[Ky,...Fs(gt.id)].map(d=>{const g=document.createElement("button");return g.type="button",g.className=`ui-seg settings-opt${d.id==="shuffle"?" shuffle":""}`,g.dataset.music=d.id,g.title=d.style,g.innerHTML='<span class="name"></span><span class="now">♪</span>',g.querySelector(".name").textContent=d.label,g});c.querySelector(".settings-music").append(...r);const u=Uy.map(([d,g])=>{const v=document.createElement("button");return v.type="button",v.className="ui-seg",v.dataset.ghost=d,v.innerHTML=`${O.wingsuit}<span>${g}</span>`,v});c.querySelector(".settings-ghost").append(...u);const h=()=>{const d=e.music(),g=d?.choice()??jo().music,v=d?.playing()?.id,p=d?.loading()?.id;for(const b of r){const w=b.dataset.music;b.classList.toggle("on",w===g),b.classList.toggle("playing",w===v||w===p),b.classList.toggle("loading",w===p)}const k=e.prefs();i.textContent=k.music?"":"Nhạc đang tắt — chọn một bài là bật lại.";for(const b of u)b.classList.toggle("on",b.dataset.ghost===o.mode);for(const b of c.querySelectorAll("[data-sw] [data-on]")){const w=b.parentElement.dataset.sw;b.classList.toggle("on",k[w]===(b.dataset.on==="1"))}};let l=0;const f=()=>{c.hidden=!0,clearInterval(l)},m=()=>{a.pause(),c.hidden=!1,h(),l=window.setInterval(h,1e3)};Zt(s),t.addEventListener("click",d=>{d.target instanceof Element&&d.target.closest("[data-open-settings]")&&m()}),c.addEventListener("click",d=>{const g=d.target instanceof Element?d.target:null;if(g===c||g?.closest("[data-close]"))return f();const v=g?.closest("[data-music],[data-ghost],[data-on]");if(v){if(v.dataset.on){const p=v.parentElement.dataset.sw;e.prefs()[p]!==(v.dataset.on==="1")&&(p==="sfx"?e.toggleSfx:e.toggleMusic)()}else v.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(v.dataset.music)):(o.mode=v.dataset.ghost,em({ghosts:o.mode}));n.sync(),h()}}),window.addEventListener("keydown",d=>{c.hidden||(d.stopPropagation(),d.code==="Escape"&&f())},{capture:!0})}const fd=`
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
`,qy=`
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
`,Wy=`
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
}`,Yy=`
#include <fog_pars_fragment>
${re}
${wr}
#ifdef HAZARD
${Os}
#endif
uniform float uLift;
uniform float uWaterY;  // mặt nước (Fansipan: chân mỏm sũng nước) — chỉ nhánh granite đọc
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;
varying float vShade;
vec3 srgb(vec3 c) { return pow(c, vec3(2.2)); }
${fd}
${qy}

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
}`;let jy=null,Xy=null;function gd(t,n){const e=new St({vertexShader:Wy,fragmentShader:Yy,defines:im(t?{HAZARD:1}:{}),uniforms:Ln.merge([_n.fog]),fog:!0});return e.uniforms.uLift=n,e.uniforms.uRegionHg=ro,e.uniforms.uWaterY=br,t&&Object.assign(e.uniforms,eo),e}const pd={value:1};function vd(){return jy??=gd(!0,pd)}function Ws(){return Xy??=gd(!1,pd)}const Zy=$.archPhases,Qy=1600;function Jy(t,n){const e=Y(t),o=Qt(t),a=o>.5?90+50*N(n,1,71):bn(t)+22,s=(o>.5?58:46)+18*N(n,2,72),c={x:0,y:0,z:0},i=m=>lt(D(t,m,0,c).x,c.z)-e,r=[];for(let m=0;m<=24;m++){const d=m/24*Math.PI,g=-a*Math.cos(d),v=Math.min(i(g)-15,s),p=v+(s-v)*Math.pow(Math.sin(d),.55)+6*Math.sin(d*3+n);r.push(new _(g,p,4*Math.sin(d*2+n)))}const u=(o>.5?13:9)+4*N(n,3,73),h=new lr(new hr(r),90,u,14,!1),l=h.getAttribute("position"),f=h.getAttribute("normal");for(let m=0;m<l.count;m++){const g=(N(l.getX(m)*.08+n,l.getY(m)*.08+l.getZ(m)*.05,74)-.5)*u*.7;l.setXYZ(m,l.getX(m)+f.getX(m)*g,l.getY(m)+f.getY(m)*g*1.3,l.getZ(m)+f.getZ(m)*g)}return h.setAttribute("aCrest",new G(new Float32Array(l.count),1)),h.computeVertexNormals(),h}function tb(){return new j(new lr(new hr([new _(0,0,0),new _(0,1,0)]),2,1,4,!1),Ws())}function nb(){const t=new yt,n=Ws(),e=new Map,o={x:0,y:0,z:0};return{group:t,update(a){const s=new Set,c=wn(a);for(let i=c;i<=c+1;i++)Zy.forEach((r,u)=>{const h=i*ct+r-Rt;if(h<a-60||h>a+Qy)return;const l=i*10+u;if(s.add(l),e.has(l))return;const f=new j(Jy(h,l*1.37),n);D(h,0,0,o),f.position.set(o.x,o.y,o.z),f.rotation.y=zt(h),f.matrixAutoUpdate=!1,f.updateMatrix(),t.add(f),e.set(l,f)});for(const[i,r]of e)s.has(i)||(t.remove(r),r.geometry.dispose(),e.delete(i))}}}const eb=5,ob=150,ab=1700,sb=300,ib=200,cb=new ce({vertexColors:!0}),rb=new ce({vertexColors:!0}),Hi=new St({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:sn});function lb(){const t=new F(.25,1.1,.25).translate(0,.55,0),n=t.getAttribute("position"),e=new Float32Array(n.count*3);for(let o=0;o<n.count;o++)e.set(n.getY(o)>.8?[.8,.08,.06]:[.92,.92,.88],o*3);return t.setAttribute("color",new G(e,3)),t}const hb=lb();function ub(){const t=new yt;let n=null,e=Number.NaN;const o={lat:0,y:0,amount:0},a={x:0,y:0,z:0},s=new _t,c=i=>{const r=[],u=[],h=[],l=[],f=[],m=(y,x,M)=>(D(y,x,M-Y(y),a),[a.x,a.y,a.z]),d=(y,x,M,C,z,E,T)=>{y.push(...M,...C,...z,...M,...z,...E);for(let A=0;A<6;A++)x.push(...T)};let g=null,v=0;for(let y=i-ob;y<=i+ab;y+=eb,v++){const x=um(y,o)&&o.amount>.5?{s:y,lat:o.lat,y:o.y}:null;if(g&&x){const[M,C]=[g,x],z=[.86,.85,.8],E=v%9===0?[.3,.3,.31]:[.2,.2,.22];d(r,u,m(M.s,M.lat,M.y-.6),m(C.s,C.lat,C.y-.6),m(C.s,C.lat,C.y+.85),m(M.s,M.lat,M.y+.85),z),d(r,u,m(M.s,M.lat,M.y+.85),m(C.s,C.lat,C.y+.85),m(C.s,C.lat+.45,C.y+.85),m(M.s,M.lat+.45,M.y+.85),z),d(r,u,m(M.s,M.lat+.45,M.y+.05),m(C.s,C.lat+.45,C.y+.05),m(C.s,C.lat+ye-1.2,C.y+.05),m(M.s,M.lat+ye-1.2,M.y+.05),E);const T=.45+(ye-1.65)/2;v%2===0&&d(r,u,m(M.s,M.lat+T-.12,M.y+.08),m(C.s,C.lat+T-.12,C.y+.08),m(C.s,C.lat+T+.12,C.y+.08),m(M.s,M.lat+T+.12,M.y+.08),[.95,.78,.25]);for(const A of[0,1]){const S=.45+(A===0?1.6:ye-3.4);h.push(...m(M.s,M.lat+S-.32,M.y+.9),...m(C.s,C.lat+S-.32,C.y+.9),...m(C.s,C.lat+S+.32,C.y+.9),...m(M.s,M.lat+S-.32,M.y+.9),...m(C.s,C.lat+S+.32,C.y+.9),...m(M.s,M.lat+S+.32,M.y+.9));for(const L of[M.s,C.s,C.s,M.s,C.s,M.s])l.push(L,A)}v%3===0&&f.length<ib*4&&(D(x.s,x.lat+.2,x.y+.85-Y(x.s),a),f.push(a.x,a.y,a.z,zt(x.s)))}g=x}if(!r.length)return null;const p=new ht;p.setAttribute("position",new G(new Float32Array(r),3)),p.setAttribute("color",new G(new Float32Array(u),3)),p.computeVertexNormals();const k=new ht;k.setAttribute("position",new G(new Float32Array(h),3)),k.setAttribute("aTrail",new G(new Float32Array(l),2));const b=new vt(hb,rb,Math.max(1,f.length/4));for(let y=0;y<f.length/4;y++)s.makeRotationY(f[y*4+3]).setPosition(f[y*4],f[y*4+1],f[y*4+2]),b.setMatrixAt(y,s);const w={mesh:new j(p,cb),trail:new j(k,Hi),posts:b};return w.trail.frustumCulled=!1,w.trail.renderOrder=3,w};return{group:t,update(i,r,u){Hi.uniforms.uTime.value=r,Hi.uniforms.uNight.value=Math.min(1,Math.max(0,(u-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(i-e)<sb)&&(e=i,n&&(t.remove(n.mesh,n.trail,n.posts),n.mesh.geometry.dispose(),n.trail.geometry.dispose(),n.posts.dispose()),n=c(i),n&&t.add(n.mesh,n.trail,n.posts))}}}const Mn=30,Fi=4,Hl=18,Fl=8,Gl=24,$l=[0,10,28,55,95,150],Ol=new St({uniforms:Ln.merge([_n.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:Nt,fog:!0});function mb(t,n,e){const o={x:0,y:0,z:0},a=[],s=[],c=Math.ceil((n-t)/Fi)+1,i=(m,d)=>.92+.32*N(m*.02,d*4,e)+.14*N(m*.11,d*13,e+1);for(let m=0;m<c;m++){const d=t+m*Fi;for(let g=0;g<=Mn;g++){const v=g/Mn,p=v*Math.PI*2,k=i(d,v);D(d,Hl*k*Math.cos(p),Fl+Gl*k*Math.sin(p),o),a.push(o.x,o.y,o.z),s.push(d,v,Math.min(d-t,n-d))}}const r=[];for(let m=0;m<c-1;m++)for(let d=0;d<Mn;d++){const g=m*(Mn+1)+d,v=g+Mn+1;r.push(g,g+1,v,v,g+1,v+1)}const u=new ht;u.setAttribute("position",new G(new Float32Array(a),3)),u.setAttribute("aCave",new G(new Float32Array(s),3)),u.setIndex(r);const h=[],l=[];for(const[m,d]of[[t,-1],[n,1]]){const g=h.length/3;$l.forEach((v,p)=>{for(let k=0;k<=Mn;k++){const b=k/Mn,w=b*Math.PI*2,y=i(m,b),x=p?.25*v*(N(b*9,p,e+5)-.5):0,M=Math.max(-16,Fl+(Gl*y+v+x)*Math.sin(w));D(m-d*(v*.35+(p?3*N(b*13,p,e+9):0)),(Hl*y+v+x)*Math.cos(w),M,o),h.push(o.x,o.y,o.z)}});for(let v=0;v<$l.length-1;v++)for(let p=0;p<Mn;p++){const k=g+v*(Mn+1)+p,b=k+Mn+1;l.push(k,b,k+1,k+1,b,b+1)}}for(let m=0;m<c;m+=2){const d=t+m*Fi,g=h.length/3;for(let v=0;v<=16;v++){const p=-110+220*v/16,k=Math.abs(p)/110,b=58+150*k*k+30*(N(d*.015,p*.03,e+3)-.5);D(d,p,b,o),h.push(o.x,o.y,o.z)}if(m+2<c)for(let v=0;v<16;v++)l.push(g+v,g+17+v,g+v+1,g+v+1,g+17+v,g+18+v)}const f=new ht;return f.setAttribute("position",new G(new Float32Array(h),3)),f.setIndex(l),f.computeVertexNormals(),{tube:u,portals:f}}function db(){const t=new yt,n=new Map,e=Ws(),o=e.clone();return o.uniforms=e.uniforms,o.side=Nt,{group:t,update(a,s){if(Ol.uniforms.uTime.value=s,!$.caves.length)return;const c=new Set,i=wn(a);for(let r=i-1;r<=i+1;r++)$.caves.forEach(([u,h],l)=>{const f=r*ct+u-Rt,m=r*ct+h-Rt;if(m<a-200||f>a+2200)return;const d=r*8+l;if(c.add(d),n.has(d))return;const g=mb(f,m,(r*7+l)%97),v=[new j(g.tube,Ol),new j(g.portals,o)];for(const p of v)p.frustumCulled=!1,p.matrixAutoUpdate=!1,t.add(p);n.set(d,v)});for(const[r,u]of n)if(!c.has(r)){for(const h of u)t.remove(h),h.geometry.dispose();n.delete(r)}}}}const Gi=140,Dl=24,fb=2400;function _a(t,n){const e=t.getAttribute("position").count,o=new Float32Array(e*3);for(let a=0;a<e;a++)o.set(n,a*3);return t.setAttribute("color",new G(o,3)),t.deleteAttribute("uv"),t}function gb(){return Tt([_a(new F(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),_a(new F(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),_a(new F(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),_a(new F(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function pb(){const t=new vt(gb(),new ce({vertexColors:!0}),Dl);t.frustumCulled=!1,t.count=0;const n=new _t,e={x:0,y:0,z:0};let o=Number.NaN;return{mesh:t,update(a){const s=Math.floor((a-100)/Gi);if(s===o)return;o=s;let c=0;for(let i=s;c<Dl&&i*Gi<a+fb;i++){const r=i*Gi+37*Math.sin(i*1.7);if(Ae()!=="ha-giang"||ia(r)<120)continue;const u=3*Math.sin(r/140)+2.5*Math.sin(r/47+1.7)+(i%2?7:-7),h=mm(r);D(r,u,0,e),n.makeRotationY(zt(r)+(i%3===0?Math.PI:0)+.15*Math.sin(i)).setPosition(e.x,h+.1,e.z),t.setMatrixAt(c++,n)}t.count=c,t.visible=c>0,t.instanceMatrix.needsUpdate=!0}}}function $i(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a);if(c>e)continue;const r=Math.atan2(i,s),u=Math.pow(.5+.5*Math.sin(r*7+2.4*N(r,c/23,7)),10),h=(1+n*(N(r*3.1,c/37,5)-.5)+.5*n*(N(r*9.3,c/11,6)-.5))*(1-.22*u);o.setXYZ(a,s*h,c,i*h)}return t.computeVertexNormals(),t}function Ul(t){const n=new ur;for(let e=0;e<10;e++){const o=Math.PI/2+e*Math.PI/5,a=e%2?t*.4:t;e===0?n.moveTo(Math.cos(o)*a,Math.sin(o)*a):n.lineTo(Math.cos(o)*a,Math.sin(o)*a)}return n}function vb(){const t=(a,s,c,i,r,u)=>$i(new rt(a,s,c,64,24).translate(r,i-c/2,r*.6),u,i-4),n=$i(new rt(11.5,13.5,3,48,4).translate(0,-1.5,0),.32,-.2),e=[];for(let a=0;a<13;a++){const s=a*2.39+.4,c=1.6+2.6*N(a,3,61),i=11+2.5*N(a,4,62);e.push($i(new qe(c,12,9).scale(1,.62,1).translate(Math.cos(s)*i,-.6+.6*N(a,5,63),Math.sin(s)*i),.5,99))}const o=Tt([n,...e,t(11,34,46,-1.5,0,.7),t(26,62,90,-40,7,.8),t(48,105,190,-115,-9,.9)].map(a=>(a.deleteAttribute("uv"),a)));return o.computeVertexNormals(),o}function yb(){const t=H(new rt(2.6,3.3,1.5,4).rotateY(Math.PI/4).translate(0,.75,0),[.4,.4,.42],.08,49),n=H(new ie(2.4,6.2,3).translate(0,1.4+3.1,0),[.7,.73,.78],.05,44),e=H(new rt(.08,.1,6.6,6).translate(3,3.3,.9),[.8,.8,.82],.02,45),o=H(new F(3,2,.08).translate(4.5,5.5,.9),[.86,.07,.06],.02,46),a=H(new bc(Ul(.6)).translate(4.5,5.5,.95),[1,.86,.1],0,47),s=H(new bc(Ul(.6)).rotateY(Math.PI).translate(4.5,5.5,.85),[1,.86,.1],0,48);return bt([t,n,e,o,a,s])}const bb=2600,yd=[.6,.58,.55],wb=[.3,.29,.31];function xb(){const t=(n,e,o,a)=>Xo(H(new qe(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,o/e,1).translate(n,-4,0),[.42,.6,.28],.14,a),-4,o,.7);return bt([t(-62,70,62,11),t(62,64,56,12)])}function Mb(){return bt([H(new F(5,1.2,3).translate(0,.6,0),yd,.1,21),H(new F(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),H(new rt(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function kb(){const t=(e,o,a,s,c,i)=>[H(new F(e,a,o).translate(s,a/2,c),[.7,.62,.5],.08,i),H(new rt(.01,o*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(s,a+o*.17,c),wb,.08,i+1)],n=(e,o,a,s,c)=>H(new F(e,4,o).translate(a,2,s),yd,.12,c);return bt([n(64,1.6,0,-22,31),n(64,1.6,0,22,32),n(1.6,44,-32,0,33),n(1.6,44,32,0,34),...t(30,12,11,0,8,35),...t(22,9,7,-14,-10,37),...t(22,9,7,14,-10,39)])}const Oi={"nui-doi":{geo:xb,scale:1},"bia-ma-pi-leng":{geo:Mb,scale:2.2},"dinh-vua-meo":{geo:kb,scale:1.4},"chop-fansipan":{geo:yb,scale:1,rock:vb}};function Sb(){const t=new yt,n=zv();t.add(n.group);const e=new Map,o=new Map,a=new Map,s={x:0,y:0,z:0};return{group:t,update(c){n.update(c);const i=$.landmarks;if(!i?.length)return;const r=new Set,u=wn(c);for(let h=u-1;h<=u+1;h++)i.forEach((l,f)=>{const m=h*ct+l.phase-Rt;if(m<c-300||m>c+bb)return;const d=h*16+f;if(r.add(d),a.has(d))return;let g=e.get(l.kind);g||e.set(l.kind,g=Oi[l.kind].geo());const v=new j(g,ho),p=Oi[l.kind].rock;if(p){let k=o.get(l.kind);k||o.set(l.kind,k=p()),v.add(new j(k,Ws()))}D(m,l.lat,0,s),v.position.set(s.x,l.drop===void 0?lt(s.x,s.z):Y(m)-l.drop,s.z),v.rotation.y=zt(m)+(l.turn??0),v.scale.setScalar(Oi[l.kind].scale),v.matrixAutoUpdate=!1,v.updateMatrix(),t.add(v),a.set(d,v)});for(const[h,l]of a)r.has(h)||(t.remove(l),a.delete(h))}}}const Tb={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},Ab={zenith:["#5a82d4","#3e4f9a","#1c2a66","#4c86de"],hazeAway:["#a9b9de","#7f80b6","#2c3470","#b6caec"],hazeSun:["#c9aabe","#b884a0","#5a3c78","#d6c4cc"],skyHorizonSun:["#ffc8a4","#ff9a78","#9c4670","#ffe4cc"],skyHorizonAway:["#c9d4f0","#b48cb8","#46508e","#d2e2f8"],glow:["#e8bc8e","#e89068","#ff9a50","#e8d8bc"],sunDisk:["#f4e6c8","#f4c494","#000000","#f2ecdc"],sunLight:["#ffe6c8","#ffb490","#5a6ab0","#fff6ea"],skyAmbient:["#b2c6ec","#8e94ce","#46559a","#bed4f4"],bounce:["#9aaab8","#9a7c8e","#4a3c52","#aebccc"]},bd=gt.region==="fansipan"?Ab:Tb,wd=.18;function Di(t,n,e,o=0){const[a,s,c,i]=bd[t],r=Math.min(1,Math.max(0,n));return r<.5?e.set(a).lerp(new it(s),r*2):e.set(s).lerp(new it(c),(r-.5)*2),o>0?e.lerp(new it(i),Math.min(1,o)):e}function Nb(t,n,e=0){const o=t.y+(-.07-t.y)*Math.min(1,Math.max(0,n)*1.25)+wd*e,a=Math.hypot(t.x,o,t.z);return{x:t.x/a,y:o/a,z:t.z/a}}const Ui=900,Cb=15e-6,zb=14e-5;function Eb(t){const n=new it(t);return`vec3(${n.r.toFixed(4)}, ${n.g.toFixed(4)}, ${n.b.toFixed(4)})`}function Lb(){return Object.entries(bd).map(([t,n])=>`#define ATM_${t.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${n.map(Eb).join(", ")})`).join(`
`)}function xd(t,n="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${n})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${Lb()}
#define ATM_SUN_DIR normalize(vec3(${t.x.toFixed(5)}, mix(${t.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${wd.toFixed(3)} * atmMorn(), ${t.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${Ui.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${Ui.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${Ui.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${Cb.toExponential(3)} + density * avg);
}
`}function _b(t,n){da.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,da.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,da.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${xd(n)}
#endif`,da.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,t.fog=new zf(new it(0,0,0),zb)}function Rb(t,n,e=0){t.fog.color.setRGB(n,e,0)}const Kl=120,Md=30,kd=7,Ib=kd*(Md+2);function Pb(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");for(let o=0;o<18;o++){const a=30+34*N(o,4,7),s=128+(N(o*1.7,1,3)-.5)*(240-2*a-20),c=140+(N(1,o*2.3,5)-.5)*60-(a-30)*.6,i=n.createRadialGradient(s,c,0,s,c,a);i.addColorStop(0,"rgba(255,255,255,0.5)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,256,256)}const e=new aa(t);return e.colorSpace=du,e}const Bb=`
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
}`,Hb=`
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
}`;function Fb(t){const n=Math.max(10,Math.round(Md*t)),e=new St({vertexShader:Bb,fragmentShader:Hb,uniforms:Ln.merge([_n.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:Nt,fog:!0});e.uniforms.uMap.value=Pb();const o=new vt(new En(1,1),e,Ib);o.frustumCulled=!1,o.count=0;const a=new _t,s=new kt,c=new _,i=new _;let r=Number.NaN;return{mesh:o,update(u){const h=Math.floor(u/Kl)-1;if(h===r)return;r=h;let l=0;for(let f=h;f<h+n+2;f++)for(let m=0;m<kd;m++){const d=(f+N(m*.7,f,91))*Kl,g=Qt(d),v=N(f,m*1.3,92)<.5?-1:1,p=N(m,f*1.9,93);let k,b,w;if(m<2)w=12+14*p,k=v*(16+w*.5+p*30*g),b=Y(d)-10+N(f,m,94)*12+16*Xt(d);else{if(g<.5||m>3)continue;k=v*(120+p*500),b=Pt(d)-210-N(f,m,95)*60,w=60+80*p}D(d,k,0,c),Ne(c.x,c.z,d,k)&&(a.compose(c.set(c.x,b,c.z),s,i.set(w*1.6,w*.75,1)),o.setMatrixAt(l++,a))}o.count=l,o.instanceMatrix.needsUpdate=!0}}}const Gb=`
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
}`,$b=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function Br(t,n={}){const e=new Float32Array(t*3),o=new Float32Array(t),a=new Float32Array(t*4),s=new ht;s.setAttribute("position",new G(e,3)),s.setAttribute("aSize",new G(o,1)),s.setAttribute("aColor",new G(a,4));const c=new St({vertexShader:Gb,fragmentShader:$b,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:n.core??2.4}},transparent:!0,depthWrite:!1,blending:sn}),i=new is(s,c);return i.frustumCulled=!1,i.renderOrder=4,{points:i,set(r,u,h,l,f,m,d,g,v){e[r*3]=u,e[r*3+1]=h,e[r*3+2]=l,o[r]=f,a[r*4]=m,a[r*4+1]=d,a[r*4+2]=g,a[r*4+3]=v},commit(r){s.setDrawRange(0,r);for(const u of["position","aSize","aColor"])s.getAttribute(u).needsUpdate=!0},setViewport(r,u){c.uniforms.uScale.value=r/(2*Math.tan(u*Math.PI/360)),n.maxFrac&&(c.uniforms.uMaxPx.value=Math.max(4,r*n.maxFrac))}}}const Kn=5,Ki=3,Ob=.08,Db=3,Ub=new it("#ffd27a"),Kb=new it("#9b8cff");function Vb(){const t={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},n=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new ht;return e.setAttribute("position",new mu(n.flat().flatMap(o=>t[o]),3)),e}function qb(){const t=new qt({color:"#ffffff",blending:sn,transparent:!0,depthWrite:!1,side:Nt,fog:!1}),n=new vt(Vb(),t,Kn);n.frustumCulled=!1,n.count=0;const e=Br(Kn*(Ki+1),{maxFrac:.025,core:1.1}),o={z:0,x:0,v:0,ended:!1,after:0},a=new yt;a.add(n,e.points);const s=Array.from({length:Kn},()=>new _),c=new Array(Kn).fill(0),i=new Array(Kn).fill(0),r=new Array(Kn).fill(0),u=new Array(Kn).fill(0),h=new _t,l=new kt,f=new fu(0,0,0,"YXZ"),m=new _,d={x:0,y:0,z:0},g=new _(1.25,1.25,1.25),v=new it,p={group:a,setViewport:(k,b)=>e.setViewport(k,b),heads:s,alphas:c,owner:i,count:0,mode:"on",update(k,b,w,y,x){let M=0,C=0;const z=p.mode==="off"?[]:k.slice(0,Kn),E=ud(z),T=new Set(z.map((S,L)=>[Math.abs(S.at.z-b.z),L]).filter(([,S])=>Gc(S,b.z,E)>0).sort((S,L)=>S[0]-L[0]).slice(0,Db).map(([,S])=>S)),A=p.mode==="dim"?.5:1;z.forEach((S,L)=>{const{z:P,x:B,v:U,ended:W,after:X}=S.at,Z=P-b.z,V=y>0?(B-r[L])/y:0;if(r[L]=B,u[L]+=(Math.max(-.8,Math.min(.8,V*.03))-u[L])*Math.min(1,y*10),Z<-4)return;D(P,B,U,m);const et=W&&S.run.crash?X/.8:W?1:0,mt=Math.abs(Z)<10&&Math.abs(B-b.x)<3.2&&Math.abs(U-b.v)<3?.25:1,tt=1-Math.min(1,Math.max(0,(Math.abs(Z)-220)/80)),wt=Math.min(1,(Z+4)/4),Mt=.15+.85*Math.min(1,Math.max(0,(m.distanceTo(x)-9)/6)),At=(S.self?.45:.3)*A*Gc(L,b.z,E)*mt*tt*wt*Mt*Math.max(0,1-et);if(!(At<=.01)){f.set(-Math.atan(vn(P))+(W?X*9:0),zt(P),u[L]+(W?X*13:0)),h.compose(m,l.setFromEuler(f),g),n.setMatrixAt(M,h),v.copy(S.self?Ub:Kb),T.has(L)&&e.set(C++,m.x,m.y,m.z,2.5,v.r,v.g,v.b,At*.9);for(let Lt=1;Lt<=Ki&&!W&&A===1&&T.has(L);Lt++){ld(S.track,w-Lt*Ob,o),D(o.z,o.x,o.v,d);const xn=1-Lt/(Ki+1);e.set(C++,d.x,d.y,d.z,1.8*xn,v.r,v.g,v.b,At*.55*xn)}n.setColorAt(M,v.multiplyScalar(At*1.6)),s[M].set(m.x,m.y+1.6,m.z),c[M]=At,i[M]=L,M++}}),n.count=M,e.commit(C),p.count=M,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}};return p}function Wb(){const t=new ur;for(let n=0;n<10;n++){const e=n%2?.11:.28,o=n/10*Math.PI*2+Math.PI/2;n?t.lineTo(Math.cos(o)*e,Math.sin(o)*e):t.moveTo(Math.cos(o)*e,Math.sin(o)*e)}return new bc(t)}function Yb(){const t=new qt({color:new it("#ffd76a").multiplyScalar(2.2),blending:sn,transparent:!0,depthWrite:!1,fog:!1}),n=new vt(Wb(),t,3);n.frustumCulled=!1,n.count=0;const e=new _t,o=new _,a=new _,s=new kt;return{mesh:n,update(c,i,r,u){if(i<=0){n.count=0;return}const h=Math.min(1,i*3);u.getWorldQuaternion(s);for(let l=0;l<3;l++){const f=r*6+l*Math.PI*2/3;o.set(c.x+Math.cos(f)*.8,c.y+.9+Math.sin(f*2)*.1,c.z+.45+Math.sin(f)*.5),a.setScalar(h*(1+.25*Math.sin(r*14+l*2))),e.compose(o,s,a),n.setMatrixAt(l,e)}n.count=3,n.instanceMatrix.needsUpdate=!0}}}const Oc=6,Ue=3,fe=28,Sn=fe+1,To=Oc*Ue*Sn*2,jb=[1.2,1.75,2.2],Xb=Math.PI*2*.45,Zb=2.4,Qb=`
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
  }`,Jb=`
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
  }`;function tw(){const t=new ht,n=new Float32Array(To*3),e=new Float32Array(To*3),o=new Float32Array(To),a=new Float32Array(To),s=new Float32Array(To),c=[];for(let d=0;d<Oc*Ue;d++)for(let g=0;g<Sn;g++){const v=(d*Sn+g)*2;a[v]=-1,a[v+1]=1,s[v]=s[v+1]=g/fe,g<fe&&c.push(v,v+1,v+2,v+1,v+3,v+2)}t.setAttribute("position",new G(n,3)),t.setAttribute("aTan",new G(e,3)),t.setAttribute("aGlow",new G(o,1)),t.setAttribute("aSide",new G(a,1)),t.setAttribute("aU",new G(s,1)),t.setIndex(c);const i=new St({vertexShader:Qb,fragmentShader:Jb,uniforms:{uTime:{value:0},uWidth:{value:$.windRibbon?.width??.24},uMinAngle:{value:$.windRibbon?.minAngle??0}},blending:Ef,transparent:!0,depthWrite:!1,side:Nt}),r=new j(t,i);r.frustumCulled=!1,r.renderOrder=2;const u=new Map,h=new Float32Array(Sn*3),l=new Float32Array(Sn*9),f=new Float32Array(Sn),m={x:0,y:0,z:0};return{mesh:r,update(d,g,v){i.uniforms.uTime.value=g;const p=m1(d),k=d.gusts.find(w=>!w.taken&&!w.missed);let b=0;for(const w of d.gusts){if(b>=Oc||w.z+w.len<v-5||w.z>v+320)continue;w.taken&&!u.has(w.id)&&u.set(w.id,g);const y=w.taken?g-u.get(w.id):0,x=w.taken?Math.max(0,2.4*(1-y/.4)):w.missed?.18:w===k?1.5:.9;if(!(x<=0)){for(let M=0;M<Sn;M++){const C=w.z+M/fe*w.len;D(C,Ct(w.lane),w.v+p,m);const z=m.x,E=m.y,T=m.z;D(C+1,Ct(w.lane),w.v+p,m);let A=m.x-z,S=m.y-E,L=m.z-T;const P=Math.hypot(A,S,L)||1;A/=P,S/=P,L/=P;let B=-L,U=A;const W=Math.hypot(B,U)||1;B/=W,U/=W,l[M*9]=z,l[M*9+1]=E,l[M*9+2]=T,l[M*9+3]=B,l[M*9+4]=0,l[M*9+5]=U,l[M*9+6]=-U*S,l[M*9+7]=U*A-B*L,l[M*9+8]=B*S,f[M]=1+1.2*Math.abs(S)}for(let M=0;M<Ue;M++){for(let z=0;z<Sn;z++){const E=z/fe,T=M/Ue*Math.PI*2+E*Xb+g*Zb,A=jb[M]*f[z],S=Math.cos(T)*A,L=Math.sin(T)*A,P=z*9;for(let B=0;B<3;B++)h[z*3+B]=l[P+B]+l[P+3+B]*S+l[P+6+B]*L}const C=b*Ue+M;for(let z=0;z<Sn;z++){const E=Math.max(0,z-1),T=Math.min(fe,z+1);for(let A=0;A<2;A++){const S=(C*Sn+z)*2+A;for(let L=0;L<3;L++)n[S*3+L]=h[z*3+L],e[S*3+L]=h[T*3+L]-h[E*3+L];o[S]=x}}}b++}}for(const w of u.keys())d.gusts.some(y=>y.id===w)||u.delete(w);t.setDrawRange(0,b*Ue*fe*6);for(const w of["position","aTan","aGlow"])t.getAttribute(w).needsUpdate=!0;r.visible=b>0}}}const Vl=$.tower.phase,nw=1,ew=2600;function ql(t,n,e){const o=[],a=c=>{const i=Math.PI/2+c*Math.PI/5,r=c%2?.382:1;return[Math.cos(i)*t*r,Math.sin(i)*t*r]};for(let c=0;c<10;c++){const[i,r]=a(c),[u,h]=a(c+1);o.push(0,0,n,i,r,n,u,h,n)}const s=new ht;return s.setAttribute("position",new G(new Float32Array(o),3)),s.computeVertexNormals(),H(s,e,.04)}function ow(){const t=[.62,.6,.56],n=[H(new rt(3.6,4.6,28,8).translate(0,8,0),t,.12,2),H(new rt(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),H(new rt(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=H(new F(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return bt([...n,e,ql(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),ql(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function Wl(t){const n=Nc(t)+(t===1?Nc(2):ra);let e=Math.floor((n+Rt-Vl)/ct)*ct+Vl-Rt;for(e>=n&&(e-=ct);Xt(e)>0;)e-=ct;return e}function aw(){const t=new j(ow(),ho);t.visible=!1,t.matrixAutoUpdate=!1;let n=Number.NaN;const e=new _,o=new _,a=s=>{const{latMin:c,latMax:i,mirror:r}=$.tower,u=nw*(r&&wn(s)%2!==0?-1:1);o.set(0,-1/0,0);for(let h=-80;h<=80;h+=20)for(let l=c;l<=i;l+=20)D(s+h,u*l,0,e),e.y=lt(e.x,e.z),e.y>o.y&&o.copy(e);t.position.copy(o),t.rotation.y=-.6,t.scale.setScalar(2),t.updateMatrix()};return{mesh:t,update(s){if(Ae()!=="ha-giang"){t.visible=!1;return}const c=am(s),i=Wl(c),r=Wl(c+1),u=Math.abs(s-i)<Math.abs(s-r)?i:r;t.visible=Math.abs(s-u)<ew,t.visible&&u!==n&&(n=u,a(u))}}}const na=12,ws={uPools:{value:Array.from({length:na},()=>new ss)},uPoolCount:{value:0},uPoolNight:{value:0}},sw=`
uniform vec4 uPools[${na}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${na}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let xs=0,Sd=na;function iw(t){Sd=Math.max(0,Math.min(na,Math.round(t)))}function cw(){xs=0}function ns(t,n,e,o,a){xs>=Sd||a>330||n-lt(t,e)>28||ws.uPools.value[xs++].set(t,n,e,o)}function rw(t){ws.uPoolCount.value=xs,ws.uPoolNight.value=t}const Fe=14,Vi=9.5,qi=3.4,lw=.9,Ra=7,Yl=4,Wi=13,jl=30,Xl=420,Zl=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],hw=[-1,1];function uw(t,n){for(const e of t.obstacles)if(Math.abs(e.z-n)<9)return!0;return!1}function mw(){const t=Math.ceil((Xl+jl)/Fe)+2,n=Br(t*(2*Ra)+Math.ceil(t/Yl)*Wi),e={x:0,y:0,z:0};return{points:n.points,setViewport:(o,a)=>n.setViewport(o,a),update(o,a,s,c){const i=Math.min(1,Math.max(0,(s-.38)/.35));let r=0,u=0;if(i>.01){const h=Math.floor((o.z-jl)/Fe),l=Math.floor((o.z+Xl)/Fe);for(let f=h;f<=l;f++){const m=f*Fe;if(!(Xt(m)<.97||Xt(m+Fe)<.97)){for(const d of hw)for(let g=0;g<Ra;g++){const v=(g+.5)/Ra;D(m+v*Fe,d*Vi,-Go+qi-4*v*(1-v)*lw,e);const p=Zl[((f*Ra+g)%3+3)%3],k=.82+.18*Math.sin(a*3.1+f*1.7+g*2.3+d);n.set(r++,e.x,e.y,e.z,.6,p[0],p[1],p[2],i*k)}if(!(f%Yl!==0||uw(o,m))){u<3&&m>o.z-10&&(D(m,0,-Go+qi,e),ns(e.x,e.y,e.z,1.5,m-c),u++);for(let d=0;d<Wi;d++){const g=(d+.5)/Wi;D(m,-Vi+g*2*Vi,-Go+qi+.3-4*g*(1-g)*1.3,e);const v=Zl[d%3];n.set(r++,e.x,e.y,e.z,.6,v[0],v[1],v[2],i*(.85+.15*Math.sin(a*2.7+d)))}}}}}n.commit(r)}}}function dw(){const t=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([n,e])=>new yn(n,e));return new Ps(t,16)}function fw(){return new En(1,1,1,6).translate(0,.5,0)}function gw(t){return new St({uniforms:{uTime:t},side:Nt,vertexShader:`
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
}`})}function pw(t){return new St({uniforms:{...Ln.merge([_n.fog]),uTime:t},transparent:!0,depthWrite:!1,side:Nt,fog:!0,vertexShader:`
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
}`})}function vw(){const t=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([n,e])=>new yn(n*1.45,e*1.45));return new Ps(t,22)}function yw(){const t=[];for(let n=0;n<=8;n++){const e=n/8*Math.PI*.5;t.push(new yn(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new Ps(t,16)}const Td=`
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
}`,bw=`
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
}`,ww=`
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
}`;function xw(){return new St({vertexShader:Td,fragmentShader:bw,side:Nt,uniforms:{uTime:{value:0}}})}function Mw(){return new St({vertexShader:Td,fragmentShader:ww,side:Nt})}function Se(t,n,e,o=0){return e.setRGB(t,n%1,o)}const Yi=6,Ql=3,Jl=new it(1,.16,.6);function kw(){const t=new ur;return t.moveTo(-1.2,-.5),t.lineTo(0,.7),t.lineTo(1.2,-.5),t.lineTo(.62,-.5),t.lineTo(0,.12),t.lineTo(-.62,-.5),t.closePath(),new Lf(t,{depth:.28,bevelEnabled:!1}).translate(0,0,-.14)}function Sw(){const t=new vt(kw(),new qt,Yi*Ql),n=new vt(new gu(3.1,.16,6,40),new qt({color:Jl.clone().multiplyScalar(.9)}),Yi),e=new it;t.setColorAt(0,e.setRGB(0,0,0));for(const h of[t,n])h.frustumCulled=!1,h.count=0;const o=new _t,a=new kt,s=new _,c=new _,i=new _(0,1,0);let r=0,u=0;return{meshes:[t,n],begin(){r=u=0},draw(h,l,f,m,d,g,v,p,k,b){if(r>=Yi)return;a.setFromAxisAngle(i,zt(h.z));const w=1.6*p;for(let y=0;y<Ql;y++){const x=Math.max(0,Math.sin(g*7-y*1.3));o.compose(s.set(l,f+(y-1)*.95*w,m),a,c.set(w,w,w)),t.setMatrixAt(u,o),t.setColorAt(u++,e.copy(Jl).multiplyScalar(.5+.5*x))}o.compose(s.set(l,f,m),a,c.set(p,p,p)),n.setMatrixAt(r++,o),k(l,f,m,(5+7*v)*p*.8,1,.25,.65,.55),b(l,f-1.5,m,1.8*p,d,1.3,.2,.75)},commit(){t.count=u,n.count=r;for(const h of[t,n])h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0)}}}const ji=2.1,Ms=8,Vn=8,Tw=46,Aw=t=>new St({uniforms:{uTime:t},vertexShader:`
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
}`,transparent:!0,blending:sn,depthWrite:!1});function Nw(t){const n=new vt(new gu(ji,.12,6,36),new qt({color:new it("#ffb04a").multiplyScalar(.95)}),Vn),e=new vt(yw(),Mw(),Vn),o=new vt(new rt(1,.55,1,12,1,!0).translate(0,.5,0),Aw(t),Vn*3),a=new vt(dw(),gw(t),Vn),s=new vt(fw(),pw(t),Vn),c=new it,i=Sw(),r=[n,e,o,a,s];for(const w of r)w.frustumCulled=!1,w.count=0;e.setColorAt(0,Se(1,0,c)),o.setColorAt(0,c.setRGB(0,0,0)),s.setColorAt(0,c),s.renderOrder=3;const u=new _t,h=new kt,l=new kt,f=new kt,m=new _,d=new _;let g=0,v=0,p=0,k=0;const b=(w,y,x,M,C,z,E,T)=>{if(p>=o.instanceMatrix.count)return;const A=1-Math.min(1,Math.max(0,(C-450)/150));u.compose(m.set(w,y,x),h.identity(),d.set(M,Tw,M)),o.setMatrixAt(p,u),o.setColorAt(p++,c.setRGB(z*A,E*A,T*A))};return{meshes:[...r,...i.meshes],begin(){g=v=p=k=0,i.begin()},draw(w,y,x,M,C,z,E,T){const A=1+1.6*Math.min(1,Math.max(0,(C-30)/90));if(w.kind==="thermal"&&g<Vn){l.setFromAxisAngle(m.set(0,1,0),Math.sin(z*1.3+w.id)*.45),u.compose(m.set(y,x,M),l,d.set(A,A,A)),n.setMatrixAt(g++,u);for(let S=0;S<Ms;S++){const L=z*1.8+S/Ms*Math.PI*2;m.set(Math.cos(L)*ji*A,Math.sin(L)*ji*A,0).applyQuaternion(l),T.body(y+m.x,x+m.y-.5*A,M+m.z,.36*A,1.15,S*.31+w.id*.1),T.glow(y+m.x,x+m.y-.85,M+m.z,.8+1.4*E,1,.7,.28,.85)}T.glow(y,x,M,(6+6*E)*A*.8,1,.7,.25,.45),b(y,x-1,M,1.5*A,C,1.4,.95,.38);for(let S=0;S<6;S++){const L=(z*.9+S/6)%1,P=S*2.1+w.id;T.glow(y+Math.cos(P)*1.1*A,x-2.4+L*4.8*A,M+Math.sin(P)*.6,.9*A,1,.8,.35,Math.sin(L*Math.PI)*.9)}}else if(w.kind==="shield"&&v<Vn){h.setFromAxisAngle(m.set(0,0,1),Math.sin(z*1.7+w.id)*.3),u.compose(m.set(y,x+.9*A+.5*Math.sin(z*2.3+w.id),M),h,d.set(1.5*A,1.5*A,1.5*A)),e.setColorAt(v,Se(1,0,c)),e.setMatrixAt(v++,u),T.glow(y,x,M,(3+5*E)*A*.8,.3,.95,.9,.55),b(y,x+.4,M,1.3*A,C,.25,1.1,.95);for(let S=0;S<6;S++){const L=(z*.6+S/6)%1,P=z*2+S*1.05;T.glow(y+Math.cos(P)*.9*A,x+1+L*16*A,M+Math.sin(P)*.9*A,1.1*A,.35,1,.92,Math.sin(L*Math.PI)*.85)}}else if(w.kind==="boost")i.draw(w,y,x,M,C,z,E,A,T.glow,b);else if(w.kind==="smoke"&&k<Vn){h.setFromAxisAngle(m.set(0,1,0),z*1.6+w.id).premultiply(l.setFromAxisAngle(m.set(0,0,1),Math.sin(z*2.1+w.id)*.22));const S=1.6*A,L=x+.5*A+.35*Math.sin(z*2.6+w.id);u.compose(m.set(y,L,M),h,d.set(S,S,S)),a.setMatrixAt(k,u),m.set(0,S,0).applyQuaternion(h);const P=y+m.x,B=L+m.y,U=M+m.z;u.compose(m.set(P,B,U),f,d.set(6*A,13*A,1)),s.setMatrixAt(k,u),s.setColorAt(k++,c.setRGB(1-Math.min(1,Math.max(0,(C-450)/150)),w.id*.137%1,0)),T.glow(P,B,U,(1.2+2*E)*A,1,.55,.42,.9),T.glow(y,x,M,(3+5*E)*A*.8,1,.3,.62,.5),b(y,x+.4,M,.9*A,C,1.15,.22,.55);for(let W=0;W<5;W++){const X=(z*2.4+W/5)%1,Z=W*2.4+w.id;T.glow(P+Math.cos(Z)*X*.8*A,B+X*2.2*A,U+Math.sin(Z)*X*.8*A,.5*A,1,.75,.4,(1-X)*.9)}}},commit(){n.count=g,e.count=v,o.count=p,a.count=s.count=k,i.commit();for(const w of r)w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0)}}}const ks=[],Dc=[],Uc=[];function Ad(t,n,e){const o=ks.length/3;for(let a=0;a<=n;a++)for(let s=0;s<=t;s++){const[c,i,r,u,h]=e(s,a);ks.push(c,i,r),Dc.push(u,h)}for(let a=0;a<n;a++)for(let s=0;s<t;s++){const c=o+a*(t+1)+s;Uc.push(c,c+1,c+t+1,c+1,c+t+2,c+t+1)}}function th(t,n,e,o,a,s,c,i){const h=[e],l=[0],f=[a];for(let m=1;m<=9;m++){const d=(m-.5)/9,g=a-s*d;h.push(h[m-1]+o/9*Math.sin(g)),l.push(l[m-1]+o/9*Math.cos(g)),f.push(a-s*(m/9))}for(let m=0;m<t;m++){const d=n+m/t*Math.PI*2,g=Math.cos(d),v=Math.sin(d);Ad(6,9,(p,k)=>{const b=k/9,w=p/6*2-1,y=c*Math.pow(Math.sin(Math.PI*Math.pow(b,1.2)),.75)+.1*c*(1-b),x=f[k],M=i*y*w*w,C=h[k]-M*Math.cos(x),z=l[k]+M*Math.sin(x),E=w*y*.5;return[C*g-E*v,z,C*v+E*g,(w+1)/2,b*.99]})}}function Xi(t,n,e,o){const a=t.length-1;Ad(n,a,(s,c)=>{const i=s/n*Math.PI*2,[r,u]=t[c];return[Math.sin(i)*r,u,Math.cos(i)*r,s/n,e+(o-e)*c/a]})}let Zi=null;function Cw(){if(Zi)return Zi;ks.length=Dc.length=Uc.length=0,Xi([[0,-.16],[.24,-.14],[.36,-.04],[.3,.04]],16,.92,.82),th(8,0,.24,1.12,1.2,.55,.64,.2),th(8,Math.PI/8,.18,.95,.62,.32,.54,.24),Xi([[0,.05],[.11,.05],[.11,.62],[0,.64]],12,1,1.45);const t=[];for(let e=0;e<=8;e++){const o=e/8;t.push([.2*Math.pow(Math.sin(Math.PI*Math.pow(o,.55)),.9),.6+.9*o])}Xi(t,12,2,3);const n=new ht;return n.setAttribute("position",new G(new Float32Array(ks),3)),n.setAttribute("uv",new G(new Float32Array(Dc),2)),n.setIndex(Uc.slice()),n.computeVertexNormals(),n.computeBoundingSphere(),Zi=n,n}const Kc=4,Vc=9,Qi=1.9,Ss=Vc*3,zw=1.5,Ew=Ss,Lw=Kc*8+Ss;function _w(t){const n=new vt(Cw(),t,Kc);n.frustumCulled=!1,n.count=0;const e=new it;n.setColorAt(0,Se(1,0,e,2));const o=new _t,a=new kt,s=new kt,c=new _,i=new _,r=[],u={x:0,y:0,z:0},h={x:0,y:0,z:0};let l=0;return{mesh:n,begin(){l=0},draw(f,m,d,g,v,p,k,b,w,y){if(l>=Kc)return;const x=w>=0;a.setFromAxisAngle(c.set(0,1,0),b*.55+f*.37+(x?w*w*6:0)),a.multiply(s.setFromAxisAngle(c.set(1,0,0),Math.sin(b*1.3+f)*.1));const M=x?v*(1+.5*Math.sin(Math.PI*Math.min(1,w*1.6)))*(1-w*w*w):v;if(M<=.01)return;const C=d-.55*M;o.compose(c.set(m,C,g),a,i.set(M,M,M)),n.setMatrixAt(l,o),n.setColorAt(l++,Se(1,f*.137,e,2));const z=x?1-w:1;y.glow(m,C+1*M,g,(1.6+3.4*p+1.2*k)*M*(.9+.1*Math.sin(b*17+f)),1,.78,.32,.95*z),y.glow(m,C+.5*M,g,(5+9*p)*M,1,.74,.28,(.08+.3*p+.2*k)*z);for(let E=0;E<6;E++){const T=(b*.45+E/6)%1,A=b*1.4+E*1.047+f,S=(1.5+.7*T)*M;y.glow(m+Math.cos(A)*S,C+(.2+2.2*T)*M,g+Math.sin(A)*S,.55*M,1,.86,.42,Math.sin(T*Math.PI)*z)}},release(f,m,d){for(let g=0;g<Vc;g++){const v=g/Vc*Math.PI*2+Math.random()*.5,p=6+Math.random()*4;r.push({x:f,y:m,z:d,vx:Math.cos(v)*p,vy:3+Math.random()*3,vz:Math.sin(v)*p,life:Qi,ph:Math.random()})}r.length>Ss&&r.splice(0,r.length-Ss)},step(f,m,d,g){if(!r.length)return;D(m,0,0,u),D(m+1,0,0,h);const v=d*.97/Math.max(.001,Math.hypot(h.x-u.x,h.y-u.y,h.z-u.z)),p=(h.x-u.x)*v,k=(h.y-u.y)*v,b=(h.z-u.z)*v,w=Math.exp(-f*2.2);for(let y=r.length-1;y>=0;y--){const x=r[y];if(x.life-=f,x.life<=0){r.splice(y,1);continue}x.vx*=w,x.vz*=w,x.vy=x.vy*w+3.5*f,x.x+=(x.vx+p)*f,x.y+=(x.vy+k)*f,x.z+=(x.vz+b)*f;const M=.42*Math.min(1,x.life/(Qi*.35))*Math.min(1,.3+(Qi-x.life)/.12);g.body(x.x,x.y,x.z,M,1.1,x.ph,1),g.glow(x.x,x.y-.9*M,x.z,1.8*M+.4,1,.75,.3,.9)}},commit(){n.count=l,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}}}const ln={x:0,y:0,z:0},Ji=260,nh=1600,eh=220,Ia=3200;function Rw(t){const n=Math.round(nh*t),e=new yt,o=xw(),a=new vt(vw(),o,Ji+8*Ms+Ew);a.frustumCulled=!1;const s=Nw(o.uniforms.uTime),c=_w(o),i=Br(Ji+nh+eh+8*(Ms+7)+56+Lw);e.add(a,c.mesh,...s.meshes,i.points);const r=new it;a.setColorAt(0,Se(1,0,r));const u=[],h=new Map,l=new _t,f=new kt,m=new _,d=new _(1,1,1),g=new kt;let v=0,p=0;const k={body(w,y,x,M,C,z,E=0){v>=a.instanceMatrix.count||(l.compose(m.set(w,y,x),f.identity(),d.set(M,M,M)),a.setColorAt(v,Se(C,z,r,E)),a.setMatrixAt(v++,l))},glow:(w,y,x,M,C,z,E,T)=>i.set(p++,w,y,x,M,C,z,E,T)},b=(w,y,x,M,C)=>{for(let z=0;z<M&&u.length<eh;z++){const E=Math.random()*Math.PI*2,T=Math.random()*2-1,A=6+Math.random()*10;u.push({x:w,y,z:x,vx:Math.cos(E)*A*Math.sqrt(1-T*T),vy:T*A+3,vz:Math.sin(E)*A*Math.sqrt(1-T*T),life:C?.7:1})}};return{group:e,setViewport:(w,y)=>i.setViewport(w,y),burst:b,burstWish(w,y,x){c.release(w,y,x),b(w,y,x,56,!1)},update(w,y,x,M,C){v=0,p=0,o.uniforms.uTime.value=y,s.begin(),c.begin();for(const T of w.pickups){if(T.z-w.z>600||v>=Ji)continue;D(T.z,Ct(T.lane),T.v+Math.sin(y*2.4+T.id)*.45,ln);let A=ln.x,S=ln.y,L=ln.z,P=T.z,B=1,U=-1;if(T.taken){const X=h.get(T.id)??y;if(h.set(T.id,X),U=(y-X)/(T.wish?.9:.6),U>=1)continue;P=w.z+4+U*10,D(P,Ct(T.lane),T.v,ln),A=ln.x,L=ln.z,S=ln.y+U*U*14,B=T.wish?1:1-U}const W=Math.min(1,Math.max(0,(T.z-w.z-40)/210));if(B*=Math.min(1,Math.max(0,(P-C-2)/6)),!(B<=0))if(T.kind==="lantern"){f.setFromAxisAngle(m.set(0,1,0),y*.8+T.id).multiply(g.setFromAxisAngle(m.set(0,0,1),Math.sin(y*1.9+T.id)*.12));const X=Math.min(1,Math.max(0,(P-C-25)/65)),Z=(1+(($.lanternScale??1)-1)*(.15+.85*X))*B;if(T.wish){c.draw(T.id,A,S,L,Z*zw,W,M,y,U,k),!T.taken&&T.z>w.z-15&&ns(A,S,L,1.6,T.z-C);continue}l.compose(m.set(A,S,L),f,d.set(Z,Z,Z)),a.setColorAt(v,Se(1,T.id*.137,r)),a.setMatrixAt(v++,l),i.set(p++,A,S-.9*Z,L,(1.4+3.2*W+1.2*M)*Z,1,.62,.22,(.75+.25*M)*B),!T.taken&&T.z>w.z-15&&ns(A,S-.9,L,1,T.z-C)}else T.taken||(T.kind==="thermal"&&ns(A,S,L,1.6,T.z-C),s.draw(T,A,S,L,T.z-w.z,y,W,k))}for(const T of h.keys())w.pickups.some(A=>A.id===T)||h.delete(T);c.step(x,w.z,w.speed,k),c.commit(),a.count=v,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.commit();const z=Math.min(n,Math.floor(n*(.12+.88*M)));for(let T=0;T<z;T++){const A=N(T*.37,1.7,81)*Ia,S=C-300+((A-C+300)%Ia+Ia)%Ia,L=Qt(S);if(L<.35)continue;const P=N(T,2.9,82)<.5?-1:1;D(S,P*(30+Math.pow(N(T,3.3,83),1.5)*1400),0,ln);const B=(y*(2+3*N(T,4.1,84))+N(T,5.3,85)*700)%700,U=Pt(S)+($.skyLanternFloor??-380)+B+Math.sin(y*.5+T)*2,W=L*Math.min(1,B/60)*(1-Math.max(0,B-600)/100);i.set(p++,ln.x,U,ln.z,2.6,1,.5+.1*Math.sin(T),.16,W*(.35+.65*M))}const E=zt(w.z);for(let T=u.length-1;T>=0;T--){const A=u[T];if(A.life-=x*1.6,A.life<=0){u.splice(T,1);continue}A.vy-=9*x,A.x+=A.vx*x,A.y+=A.vy*x,A.x+=Math.sin(E)*w.speed*.85*x,A.z+=(A.vz+Math.cos(E)*w.speed*.85)*x,i.set(p++,A.x,A.y,A.z,.7*A.life+.2,1,.7,.3,A.life)}i.commit(p)}}}function Nn(t,n,e=0,o=0){t.getAttribute("normal")||t.computeVertexNormals();const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv");const s=a.getAttribute("position").count,c=new Float32Array(s*3);for(let i=0;i<s;i++)c.set(n,i*3);return a.setAttribute("color",new G(c,3)),a.setAttribute("aSlot",new G(new Float32Array(s).fill(e),1)),a.setAttribute("aGlow",new G(new Float32Array(s).fill(o),1)),a}const Iw=new _(0,1,0);function qc(t,n,e,o){const a=new _().subVectors(n,t),s=new rt(e,e,a.length(),3,1,!0);return s.applyQuaternion(new kt().setFromUnitVectors(Iw,a.normalize())),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),Nn(s,o)}function oh(t,n){const e=new ht;return e.setAttribute("position",new G(new Float32Array(t),3)),e.setIndex(n),e}const Ao=[[1.3,0],[2.2,1.2],[3.6,3],[5.3,5.4],[6.9,8],[8.1,10.6],[8.8,13],[8.9,14.6],[8.5,16.4],[7.4,18],[5.7,19.3],[3.5,20.2],[1.6,20.6],[0,20.7]],Pw=20.7,Hr=-4.55,Ts=8.9,ah=12,Pa=2,Bw=[1,2,1,3],Hw=18.5,Fw=[.3,.24,.2],Gw=[.45,.27,.11],$w=[.18,.18,.2],Ow=[.2,.17,.14],Dw=[.05,.03,.02];function Uw(){const t=[],n=[],e=[],o=[],a=[],s=[],c=[],i=Ao.length-1;for(let l=0;l<=i;l++){const f=Ao[Math.max(0,l-1)],m=Ao[Math.min(i,l+1)],d=Math.hypot(m[0]-f[0],m[1]-f[1]);s.push((m[1]-f[1])/d),c.push(-(m[0]-f[0])/d)}const r=(l,f,m)=>{const[d,g]=Ao[l],v=Math.cos(f),p=Math.sin(f);t.push(d*v,g,d*p),n.push(s[l]*v,c[l],s[l]*p),e.push(...m===0?Fw:[1,1,1]),o.push(m),a.push(.3+.7*(1-g/Pw)**2)},u=ah*Pa;for(let l=0;l<ah;l++)for(let f=0;f<Pa;f++){const m=(l*Pa+f)/u*Math.PI*2,d=(l*Pa+f+1)/u*Math.PI*2;for(let g=0;g<i;g++){const v=g===0?0:Ao[g][1]>=Hw?3:Bw[l%4];r(g,m,v),r(g+1,m,v),r(g+1,d,v),r(g,m,v),r(g+1,d,v),r(g,d,v)}}const h=new ht;return h.setAttribute("position",new G(new Float32Array(t),3)),h.setAttribute("normal",new G(new Float32Array(n),3)),h.setAttribute("color",new G(new Float32Array(e),3)),h.setAttribute("aSlot",new G(new Float32Array(o),1)),h.setAttribute("aGlow",new G(new Float32Array(a),1)),h}function Kw(){const t=[Uw(),Nn(new F(1.5,1.15,1.5).translate(0,-3.95,0),Gw),Nn(new F(.6,.3,.6).translate(0,-2.45,0),$w),Nn(new ie(.28,1.3,6).translate(0,-1.6,0),Dw,0,2)];for(let e=0;e<4;e++){const o=Math.PI/4+e*Math.PI/2,a=Math.cos(o),s=Math.sin(o);t.push(qc(new _(1.3*a,.05,1.3*s),new _(Math.sign(a)*.72,-3.38,Math.sign(s)*.72),.05,Ow))}const n=Tt(t);if(!n)throw new Error("sky-festival: ghép hình khinh khí cầu hỏng (lệch bộ thuộc tính)");return n}const Vt=[.8,.035,.03],dn=[.025,.15,.78],Nd=[.08,.42,.9],Hn=[.78,.03,.4],It=[.84,.84,.82],Cd=[.02,.5,.48],As=[.3,.05,.68],zd=[.95,.3,.03],Ed=[.92,.66,.04],Ys=[[Vt,It,Vt],[dn,It,Vt],[Hn,It,Hn],[It,Vt,dn],[Vt,zd,Ed],[dn,Nd,It],[Hn,As,dn],[It,dn,dn],[Cd,It,Hn],[Vt,Hn,As],[It,Hn,Vt],[dn,Vt,It]],Fr=[[Vt,It,dn],[dn,It,Vt],[Hn,It,As],[Vt,Ed,dn],[It,Vt,Vt],[As,Hn,It],[Cd,It,Hn],[dn,Nd,It],[Vt,zd,It]],Vw=.45,qw=.9,Ww=.2;function Yw(){const t={value:1},n={value:0},e={value:0},o=new ce({vertexColors:!0,side:Nt,fog:!0});return o.onBeforeCompile=a=>{a.uniforms.uLift=t,a.uniforms.uNight=n,a.uniforms.uTime=e,a.vertexShader=`attribute float aSlot;
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
  totalEmissiveRadiance += diffuseColor.rgb * ${Vw.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = max(dot(-toCam, ATM_SUN_DIR), 0.0);
    totalEmissiveRadiance += diffuseColor.rgb * ATM_SUN_LIGHT * pow(facing, 3.0) * ${qw.toFixed(3)} * uLift;
    float fres = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * facing * ${Ww.toFixed(3)} * uLift;
  }
  #endif
  {
    // Đầu đốt phụt từng đợt (~1/3 thời gian, lệch pha theo quả) + rung lửa. Dù lượn có aGlow 0 nên không ăn gì.
    float burn = smoothstep(0.35, 0.8, sin(uTime * 0.5 + vSeed * 6.2832)) * (0.8 + 0.2 * sin(uTime * 23.0 + vSeed * 41.0));
    float flame = step(1.5, vGlow);
    totalEmissiveRadiance += burn * (flame * vec3(2.2, 1.0, 0.3) * (0.4 + uNight)
      + (1.0 - flame) * vGlow * diffuseColor.rgb * (0.12 + 1.3 * uNight));
  }`)},o.customProgramCacheKey=()=>"sky-festival-cloth",{material:o,lift:t,night:n,time:e}}const Ye=14,tc=.95,nc=6.3,jw=2.6,ec=[[1,1],[.65,1],[.35,1],[.12,1],[0,0],[.12,-1],[.5,-1],[1,-1]],js=-7,Xw=5.2,Wc=[1,1,1],sh=[.72,.7,.66],Zw=[.08,.08,.1],Qw=[.12,.14,.22],Jw=[.85,.85,.82];function Ns(t,n,e,o){const a=-tc+2*tc*t/Ye,s=a/tc,c=jw*Math.sqrt(1-.72*s*s),i=.75*(.2969*Math.sqrt(n)-.126*n-.3516*n*n+.2843*n**3-.1015*n**4),r=(.2*n*(1-n)+(e>0?i:e<0?-.55*i:0))*c,u=Math.sin(a),h=Math.cos(a);return o.set((nc+r)*u,(nc+r)*h-nc,c*(.35-n)-.3*s*s)}function tx(){const t=[],n=new _,e=ec.length;for(let o=0;o<Ye;o++){const a=Math.min(o,Ye-1-o),s=a<2?3:a<5?2:1,c=[];for(const r of[o,o+1])for(const[u,h]of ec)c.push(...Ns(r,u,h,n).toArray());const i=[];for(let r=0;r<e;r++){const u=r,h=(r+1)%e;i.push(u,h,h+e,u,h+e,u+e)}t.push(Nn(oh(c,i),Wc,s))}for(const o of[0,Ye]){const a=[];for(const[c,i]of ec)a.push(...Ns(o,c,i,n).toArray());const s=[];for(let c=1;c<e-1;c++)s.push(0,c,c+1);t.push(Nn(oh(a,s),Wc,3))}return t}const ih=new _(-.22,-6.45,0),ch=new _(.22,-6.45,0);function nx(){const t=[],n=new _;for(const e of[1,3,5,9,11,13])t.push(qc(Ns(e,.3,-1,n).clone(),e<Ye/2?ih:ch,.035,sh));for(const e of[1,13])t.push(qc(Ns(e,1,-1,n).clone(),e<Ye/2?ih:ch,.03,sh));return t}function ex(){return[Nn(new F(.5,.34,.7).translate(0,-6.75,.02),Zw),Nn(new F(.44,.6,.3).rotateX(-.25).translate(0,-6.32,-.14),Wc,1),Nn(new F(.36,.2,.75).translate(0,-6.86,.55),Qw),Nn(new Rn(.17,0).translate(0,-5.88,-.18),Jw)]}function ox(){const t=Tt([...tx(),...nx(),...ex()]);if(!t)throw new Error("sky-festival: ghép hình dù lượn hỏng (lệch bộ thuộc tính)");return t}const ao=3e3,so=150,ax=400,sx=40,Cs=25,ua=24,je=40,ix=40,rh=t=>t<je?ix:ua,cx=8,rx=10,lx=500,lh=600,ze=25,Q={s:0,x:1,y:2,z:3,psi:4,a:5,b:6,w:7,phi:8,bob:9,freq:10,scale:11,on:12},Xs=13;function hx(t){return{cap:t,rec:new Float64Array(t*Xs),pal:new Float32Array(t*9),seed:new Float32Array(t)}}function Ee(t,n,e){const o=n*Xs,a=t.rec;a[o+Q.s]=e.s,a[o+Q.x]=e.x,a[o+Q.y]=e.y,a[o+Q.z]=e.z,a[o+Q.psi]=e.psi,a[o+Q.a]=e.a,a[o+Q.b]=e.b,a[o+Q.w]=e.w,a[o+Q.phi]=e.phi,a[o+Q.bob]=e.bob,a[o+Q.freq]=e.freq,a[o+Q.scale]=e.scale,a[o+Q.on]=1,t.seed[n]=e.seed;for(let s=0;s<3;s++)t.pal.set(e.scheme[s],n*9+s*3)}function On(t,n){t.rec[n*Xs+Q.on]=0}function Le(t,n){return t[Math.min(t.length-1,Math.floor(n*t.length))]}function ux(t,n){return R(n+ao,n+ao-ax,t)*R(n-so,n-so+sx,t)}const hh=[],Ba={x:0,y:0,z:0};function uo(t,n,e,o,a){const s=Math.max(6,Math.ceil(2*Math.PI*Math.sqrt((e*e+o*o)/2)/rx)),c=Math.sin(a),i=Math.cos(a);let r=lt(t,n);for(let u=0;u<s;u++){const h=u/s*Math.PI*2,l=e*Math.cos(h),f=o*Math.sin(h);r=Math.max(r,lt(t+c*l+i*f,n+i*l-c*f))}return r}function _e(t,n,e,o,a,s,c,i=!0){let r=Math.max(s,c+cx-a);if(!i)return r;const u=la(t,n,lx,hh);for(let h=0;h<u;h++){const l=hh[h];if(!(l.core>0))for(let f=-1;f<=1;f++){const m=l.s+f*o;l.dist-o<bn(m)+Cs&&(r=Math.max(r,Y(m)+rh(l.dist-o)-a))}}for(let h=e-lh;h<=e+lh;h+=ze){D(h,0,0,Ba);const l=Math.hypot(t-Ba.x,n-Ba.z)-o-ze/2;l<bn(h)+Cs&&(r=Math.max(r,Ba.y+rh(l)-a))}return r}function ea(t,n,e){return{ring:Math.ceil((ao+so)/t)+3,per:n,span(o,a){a[0]=Math.floor((o-so)/t)-1,a[1]=Math.floor((o+ao)/t)},build:e}}function Zs(t,n,e){const o=t.length,a=Math.min(...t),s=Math.max(...t);return{ring:o*(Math.floor((ao+so+s-a)/ct)+2)+1,per:n,span(c,i){i[0]=Math.floor((c-so+Rt-s)/ct)*o,i[1]=Math.floor((c+ao+Rt-a)/ct)*o+o-1},build:e}}function Qs(t,n){const e=Math.floor(t/n.length),o=t-e*n.length;return{s:n[o]-Rt+e*ct,j:o}}const Ld=Math.PI*2,_d=1.6,uh=new fu(0,0,0,"YXZ"),mx=new kt,dx=new _,fx=new _;function Gr(t,n,e,o,a,s,c,i){uh.set(a,s,c),t.compose(dx.set(n,e,o),mx.setFromEuler(uh),fx.set(i,i,i))}const gx=(t,n,e,o,a,s)=>{const c=t[e+Q.a],i=t[e+Q.b],r=t[e+Q.w],u=t[e+Q.phi]+r*o,h=Math.cos(u),l=Math.sin(u),f=Math.sin(t[e+Q.psi]),m=Math.cos(t[e+Q.psi]),d=f*c*h+m*i*l,g=m*c*h-f*i*l,v=Math.atan2((-f*c*l+m*i*h)*r,(-m*c*l-f*i*h)*r),p=-r*r*(d*Math.cos(v)-g*Math.sin(v)),k=n*Ld,b=Math.max(-.7,Math.min(.7,-Math.atan(p/9.8)*_d)),w=t[e+Q.y]+t[e+Q.bob]*Math.sin(o*t[e+Q.freq]+k);Gr(s,t[e+Q.x]+d,w,t[e+Q.z]+g,.06+.04*Math.sin(o*1.1+k),v,b,t[e+Q.scale]*a)},px=(t,n,e,o,a,s)=>{const c=n*Ld,i=t[e+Q.freq],r=t[e+Q.a]*Math.sin(o*i+t[e+Q.phi]),u=t[e+Q.psi],h=t[e+Q.y]+t[e+Q.b]*Math.sin(o*i*1.7+c);Gr(s,t[e+Q.x]+Math.sin(u)*r,h,t[e+Q.z]+Math.cos(u)*r,.03*Math.sin(o*.55+c*1.3),t[e+Q.phi]+t[e+Q.w]*o,.03*Math.sin(o*.43+c),t[e+Q.scale]*a)},Js=Xw+3,$r=6,ae=(t,n)=>e=>N(t,e,n),mh=6,vx=6,oc={x:0,y:0,z:0};function dh(t,n,e,o){let a=-1/0;for(let s=0;s<mh;s++){const c=t+(n-t)*s/(mh-1);for(const i of e)D(c,o*i,0,oc),a=Math.max(a,lt(oc.x,oc.z)-Y(c))}return a}function Or(t,n,e,o){const a=dh(t,n,e,1),s=dh(t,n,e,-1),c=Math.abs(a-s)<vx?o<.5?1:-1:a<s?1:-1;return[c,-c]}const fh=Math.PI*2,gh=1050,yx=.85,Yc=1.25,Rd=3,ph=3,No=Rd+Ts*Yc,bx=70,qn={x:0,y:0,z:0};function vh(t,n,e,o){const a=je+ze/2+No+3+18*n(2),s=Hr*Yc-ph;for(const c of Or(t-80,t+80,[a,a+No],n(3))){D(t,c*a,ua+2-s+6*n(4),qn);const i=_e(qn.x,qn.z,t,No,s-$r,qn.y,uo(qn.x,qn.z,No,No,0));if(!(i-Y(t)>bx))return Ee(o,e,{s:t,x:qn.x,y:i,z:qn.z,psi:n(5)*fh,a:Rd,b:ph,w:(n(6)<.5?-1:1)*.03,phi:n(7)*fh,bob:0,freq:.03,scale:Yc,seed:n(8),scheme:Le(Fr,n(9))})}On(o,e)}function wx(t){return[{...ea(gh,1,(n,e,o)=>{const a=ae(n,707);if(a(0)>=yx)return On(o,e);vh((n+.25+.5*a(1))*gh,a,e,o)}),whoosh:!0},{...Zs(t,1,(n,e,o)=>vh(Qs(n,t).s,ae(n,709),e,o)),whoosh:!0}]}const xx=Math.PI*2,yh=420,Mx=.85,jc=3,Dr=.28,Xc=950,Zc=140,kx=220,Ur=1.45,pe=Js*Ur,Kr=1.2,Id=js*Ur-Kr,be=30,te=-Dr*Xc-60,Vr=Dr*Zc+5,ne=Math.ceil((Vr-te)/be)+1,es=15,Pd=Math.ceil((Vr-te+2*be)/es)+1,Sx=85,Tx=-12,Ax=170,bh=15,fn={x:0,y:0,z:0},Ha=new Float64Array(Pd),Co=new Float64Array(ne);function Nx(t,n,e,o,a,s,c,i){const r=a+s/2,u=pe+s/2,h=e+te-be;Ha.fill(Number.NaN);const l=m=>{if(Number.isNaN(Ha[m])){let d=-1/0;for(const g of s>6?[a-pe,r,a+s+pe]:[a-pe,a+s+pe])D(h+m*es,o*g,0,fn),d=Math.max(d,lt(fn.x,fn.z));Ha[m]=d}return Ha[m]};for(let m=0;m<ne;m++){const d=e+te+m*be;let g=-1/0;const v=Math.min(Pd-1,Math.ceil((m+2)*be/es));for(let p=Math.floor(m*be/es);p<=v;p++)g=Math.max(g,l(p));if(D(d,o*r,c,fn),Co[m]=_e(fn.x,fn.z,d,u,Id,fn.y,g)-Y(d),Co[m]>i)return 1/0}let f=-1/0;for(let m=0;m<ne;m++){const d=Math.max(Co[Math.max(0,m-1)],Co[m],Co[Math.min(ne-1,m+1)]);t[n+m]=d,f=Math.max(f,d)}return f}function Cx(t,n,e,o,a,s){const c=o(2)<.3?3:o(2)<.6?2:1,i=7+5*o(3),r=16+10*o(4),u=i*(c-1),h=Or(e+te,e,[je+30,je+u+70],o(7)),l=h.map(d=>[d,je+ze/2+pe+2+8*o(5),ua+1-Id+6*o(6)]);let f=0;for(let d=0;d<=4;d++)f=Math.max(f,bn(e+te+(Vr-te)*d/4));const m=f+Cs+ze/2+pe+3+10*o(5);m<=Ax&&l.unshift([h[0],m,Tx+8*o(6)]);for(const[d,g,v]of l)if(Nx(t,n*ne,e,d,g,u,v,v<0?v+12:Sx)!==1/0){for(let p=0;p<c;p++)Ee(s,a+p,{s:e,x:d*(g+p*i),y:p*(1.5+2*o(8+p)),z:-p*r,psi:n,a:0,b:0,w:0,phi:0,bob:Kr,freq:.35+.2*o(11+p),scale:Ur,seed:o(14+p),scheme:Le(Ys,o(17+p))});return}}function wh(t,n,e){let o=new Float64Array(0),a=0;const i={...t,build:(r,u,h)=>{for(let m=0;m<jc;m++)On(h,u+m);const l=ae(r,e),f=n(r,l);f!==null&&Cx(o,(r%a+a)%a,f,l,u,h)},pose:(r,u,h,l,f,m,d)=>{const g=r[h+Q.s],v=g+Dr*(d-g)+r[h+Q.z],p=Math.min(ne-1.0001,Math.max(0,(v-g-te)/be)),k=Math.floor(p),b=p-k,w=r[h+Q.psi]*ne+k,y=u*xx,x=o[w]*(1-b)+o[w+1]*b+r[h+Q.y]+Kr*Math.sin(l*r[h+Q.freq]+y);D(v,r[h+Q.x],x,fn);const M=-Math.atan(bh*bh*sa(v)/9.8)*_d,C=Math.max(-.5,Math.min(.5,M))+.05*Math.sin(l*.7+y);Gr(m,fn.x,fn.y,fn.z,.06+.03*Math.sin(l*1.1+y),zt(v),C,r[h+Q.scale]*f)},fade:(r,u)=>R(r-Xc,r-Xc+kx,u)*(1-R(r+Zc-40,r+Zc,u)),cost:4,whoosh:!0};return a=i.ring,o=new Float64Array(a*ne),i}function zx(t){const n=()=>{};return[wh(ea(yh,jc,n),(e,o)=>o(0)<Mx?(e+.2+.6*o(1))*yh:null,706),wh(Zs(t,jc,n),e=>Qs(e,t).s,708)]}const Bd=[{phase:1160,lat:300,side:0,base:-70,n:5},{phase:1330,lat:320,side:0,base:-40,n:5},{phase:2660,lat:190,side:-1,base:-50,n:4},{phase:2860,lat:210,side:-1,base:-30,n:5}],Hd=[{phase:285,lat:106,side:0,up:-95},{phase:1220,lat:260,side:0,up:-60}],Ex=[300,1e3,1250],Lx=[240,1e3,1250],se=Math.PI*2,Fd=80,Gd=550,$d=400,_x=.85,Od=900,Dd=Bd.map(t=>t.phase),qr=5,Fa=new Float64Array(qr),Ud=Hd.map(t=>t.phase),at={x:0,y:0,z:0};function Kd(t,n,e){const o=sa(t);return n===0||Math.abs(o)<1e-4?e<.5?-1:1:n*Math.sign(o)}function Rx(t){return(n,e,o)=>{const a=ae(n,701);if(a(0)>=t)return On(o,e);const s=(n+a(1))*Fd,c=(a(2)<.5?-1:1)*(55+a(3)**2.2*1300),i=1.3+.6*R(150,1100,Math.abs(c)),r=50+110*a(5),u=r*(.15+.3*a(6)),h=a(7)*se,l=2+3*a(11);D(s,c,12+a(4)**1.8*320,at);const f=uo(at.x,at.z,r,u,h),m=_e(at.x,at.z,s,r+Js*i,js*i-l,at.y,f);if(m-Y(s)>Od)return On(o,e);const d=(a(9)<.5?-1:1)*(8+3*a(8))/Math.sqrt((r*r+u*u)/2);Ee(o,e,{s,x:at.x,y:m,z:at.z,psi:h,a:r,b:u,w:d,phi:a(10)*se,bob:l,freq:.15+.2*a(12),scale:i,seed:a(13),scheme:Le(Ys,a(14))})}}function Ix(t){return(n,e,o)=>{const a=ae(n,702),{s,j:c}=Qs(n,Dd),i=Bd[c],r=Math.max(2,Math.round(i.n*(.4+.6*t)));D(s,Kd(s,i.side,a(0))*(i.lat+30*(a(1)-.5)),i.base,at);const u=5,h=26+10*a(2);let l=-1/0;for(let d=0;d<r;d++)Fa[d]=32+26*a(10+d),l=Math.max(l,uo(at.x,at.z,Fa[d],Fa[d],0)-d*h);const f=_e(at.x,at.z,s,58+Js,js-u,at.y,l),m=a(3)<.5?-1:1;for(let d=0;d<qr;d++){if(d>=r){On(o,e+d);continue}const g=Fa[d];Ee(o,e+d,{s,x:at.x,y:f+d*h,z:at.z,psi:0,a:g,b:g,w:m*(8.5+1.5*a(20+d))/g,phi:d/r*se+a(30+d),bob:u,freq:.08+.05*a(40+d),scale:1,seed:a(50+d),scheme:Le(Ys,a(60+d))})}}}const Px=(t,n,e)=>{const o=ae(t,703);if(o(0)>.85)return On(e,n);const a=(t+.15+.7*o(1))*Gd,s=18+10*o(3),c=s+Js,i=1.5,r=js-i,u=o(4)<_x,h=u?je+c+ze/2+30*o(5):bn(a)+Cs+c+ze/2+10+35*o(5),l=u?ua+2-r+8*o(6):5+20*o(6);D(a,(o(2)<.5?-1:1)*h,l,at);const f=_e(at.x,at.z,a,c,r,at.y,uo(at.x,at.z,s,s,0));Ee(e,n,{s:a,x:at.x,y:f,z:at.z,psi:0,a:s,b:s,w:(o(7)<.5?-1:1)*9/s,phi:o(8)*se,bob:i,freq:.3,scale:1,seed:o(9),scheme:Le(Ys,o(10))})};function Bx(t){return(n,e,o)=>{const a=ae(n,704);if(a(0)>=.4+.6*t)return On(o,e);const s=(n+a(1))*$d,c=(a(2)<.5?-1:1)*(220+a(3)**1.6*1800),i=1+.6*R(400,2e3,Math.abs(c)),r=20+20*a(4),u=6+6*a(5),h=a(7)*se;D(s,c,40+360*a(6),at);const l=Hr*i-u-$r,f=_e(at.x,at.z,s,r+Ts*i,l,at.y,uo(at.x,at.z,r,0,h));if(f-Y(s)>Od)return On(o,e);Ee(o,e,{s,x:at.x,y:f,z:at.z,psi:h,a:r,b:u,w:(a(8)<.5?-1:1)*(.02+.04*a(9)),phi:a(10)*se,bob:0,freq:.02+.02*a(11),scale:i,seed:a(12),scheme:Le(Fr,a(13))})}}const Hx=(t,n,e)=>{const o=ae(t,705),{s:a,j:s}=Qs(t,Ud),c=Hd[s],i=1.1,r=4,u=o(3)*se,h=Hr*i-r,l=c.side===0?Or(a-40,a+40,[c.lat],1-o(0))[0]:Kd(a,c.side,o(0));D(a,l*(c.lat+30*o(1)),(c.up??ua+2-h)+15*o(2),at);const f=c.up!==void 0&&c.up+15+2*Ts*i<-40,m=_e(at.x,at.z,a,8+Ts*i,h-$r,at.y,uo(at.x,at.z,8,0,u),!f);Ee(e,n,{s:a,x:at.x,y:m,z:at.z,psi:u,a:8,b:r,w:(o(4)<.5?-1:1)*.03,phi:o(5)*se,bob:0,freq:.03,scale:i,seed:o(6),scheme:Le(Fr,o(7))})};function Fx(t){return[ea(Fd,1,Rx(t)),Zs(Dd,qr,Ix(t)),ea(Gd,1,Px),...zx(Ex)]}function Gx(t){return[ea($d,1,Bx(t)),{...Zs(Ud,1,Hx),whoosh:!0},...wx(Lx)]}const $x=4*Math.PI*100;function xh(t,n,e,o,a,s){const c=[];let i=0;for(const f of o)c.push(i),i+=f.ring*f.per;const r=f=>new cr(new Float32Array(i*f),f).setUsage(cs),u=[r(3),r(3),r(3)],h=r(1);n.setAttribute("aPalA",u[0]),n.setAttribute("aPalB",u[1]),n.setAttribute("aPalC",u[2]),n.setAttribute("aSeed",h);const l=new vt(n,e,i);return l.name=t,l.instanceMatrix.setUsage(cs),l.frustumCulled=!1,l.count=0,{mesh:l,bank:hx(i),streams:o,bases:c,keys:o.map(f=>new Float64Array(f.ring).fill(Number.NaN)),spans:o.map(()=>[Number.NaN,Number.NaN]),order:new Int32Array(i).fill(-1),pal:u,seed:h,pose:a,whoosh:Lp(i),big:s}}const he=[0,0],Ox=4;function Dx(t,n,e){for(let o=0;o<t.streams.length;o++){const a=t.streams[o];a.span(n,he);const s=t.spans[o];if(he[0]===s[0]&&he[1]===s[1])continue;const c=t.keys[o];let i=!0;for(let r=he[0];r<=he[1];r++){const u=(r%a.ring+a.ring)%a.ring;if(c[u]!==r){if(e<=0){i=!1;break}e-=a.cost??1,c[u]=r,a.build(r,t.bases[o]+u*a.per,t.bank),t.order.fill(-1)}}i&&(s[0]=he[0],s[1]=he[1])}return e}const ac=new _t;function Ux(t,n,e){const{rec:o,pal:a,seed:s}=t.bank;let c=0,i=!1;t.whoosh.begin(n,e);for(let r=0;r<t.streams.length;r++){const u=t.streams[r],h=u.pose??t.pose,l=u.fade??ux,f=t.bases[r]+u.ring*u.per;for(let m=t.bases[r];m<f;m++){const d=m*Xs;if(!o[d+Q.on])continue;const g=l(o[d+Q.s],n);if(!(g<=0)){if(h(o,s[m],d,e,g,ac,n),u.whoosh&&t.whoosh.watch(m,ac,t.big),t.mesh.setMatrixAt(c,ac),t.order[c]!==m){t.order[c]=m,i=!0;for(let v=0;v<3;v++){const p=t.pal[v].array;for(let k=0;k<3;k++)p[c*3+k]=a[m*9+v*3+k]}t.seed.array[c]=s[m]}c++}}}if(t.mesh.count=c,t.mesh.instanceMatrix.needsUpdate=!0,i){for(let r=0;r<3;r++)t.pal[r].needsUpdate=!0;t.seed.needsUpdate=!0}}function Kx(t){const n=new yt;if(n.name="sky-festival",oe()<=.5)return{group:n,update(){}};const e=Yw(),o=[xh("sky-festival-paragliders",ox(),e.material,Fx(t),gx,!1),xh("sky-festival-balloons",Kw(),e.material,Gx(t),px,!0)];for(const a of o)n.add(a.mesh);return{group:n,update(a,s,c){e.lift.value=1-.85*Cn((c-.4)/.5),e.night.value=Cn((c-.45)/.4),e.time.value=s%$x;let i=Ox;for(let r=0;r<o.length;r++){const u=o[r];i=Dx(u,a,i),Ux(u,a,s)}}}}const zo=(t,n,e)=>{const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)};function Vx(t,n,e,o,a,s){const c=a/7+1.3*N(e*1.2+3,o*1.2,t.seed+21),i=Math.floor(c),r=c-i,u=N(i,t.seed*3.1,22),h=5+Math.floor(u*2.999),l=2*Math.PI/h,f=((n+u*7.7)%l+l)%l-l/2,m=1-Math.cos(l/2)/Math.cos(f),d=t.crest&&a<t.bandLo-.01?.9:.4,g=.12*(1-u),v=.1*(1-Math.sin(Math.PI*r))**2,p=(u-.5)*2.4,k=zo(.42,.7,N(e*3+i*1.7,o*3,t.seed+23)),b=Math.pow(.5+.5*Math.sin(n*5+s*3+t.seed*1.3+p),9)*k,w=Math.max(0,1-Math.min(r,1-r)/.09),y=w*w*zo(.35,.55,N(e*2+5,o*2+i,t.seed+24)),x=a<t.bandLo-3?.22*zo(.68,.82,N(e*1.8+9,o*1.8+a/11,t.seed+25)):0,M=a>=t.bandLo-.01&&a<=t.bandHi+.01?.6:1,C=.5+.5*(e*Math.cos(t.seed*2.4)+o*Math.sin(t.seed*2.4)),z=zo(.5,.75,N(e*2.2+13,o*2.2,t.seed+26)),E=t.crest&&a>t.top-1.3?Math.min(.85,.1+.6*C*C+.3*z)*(a-(t.top-1.3)):0,A=(t.crest?Math.min(1,Math.max(0,(t.bandLo-a)/4)):0)*.3*zo(.45,.75,N(e*1.6+17,o*1.6+a/9,t.seed+27));return{shape:M*(d*m+g+v)-A,groove:M*(.1*b+.12*y)+x,drop:E}}const Ot=40;function qx(t){const n=[];for(let e=t.bottom;e<t.top;){n.push(e);const o=Math.min(Math.abs(e-t.bandLo),Math.abs(e-t.bandHi),e>t.bandLo&&e<t.bandHi?0:99);e+=Math.min(10,1.2+o*.12)}return t.granite&&t.crest?[...n.filter(e=>e<t.top-1.25),t.top-1,t.top-.55,t.top-.25,t.top]:(n.push(t.top),n)}function oa(t){const n=qx(t),e=[],o=[],a=[];let s=0;for(const f of n){const m=f>=t.bandLo-.01&&f<=t.bandHi+.01,d=m?t.rc:t.radius(f),g=Math.min(1,Math.max(0,(t.radius(f+6)-d)/(d*.6))),[v,p]=m?[0,0]:t.offset?.(f)??[0,0];for(let k=0;k<Ot;k++){const b=k/Ot*Math.PI*2,w=Math.cos(b),y=Math.sin(b),x=N(w*1.4+t.seed*7.1,y*1.4+f/26,31)-.5,M=N(w*4+t.seed,y*4+f/5,32)-.5,C=t.granite?0:Math.max(0,Math.sin((f/7+N(w,y,t.seed)*2)*Math.PI))**6*.12;let z=d*(1+.42*x+.12*M+C);m&&(z=t.rc*(.9+.1*(M+.5))),t.granite&&t.crest&&f>t.top-1.2&&(z*=1-.5*((f-(t.top-1.2))/1.2)**2);const E=Math.pow(.5+.5*Math.sin(b*9+x*5+t.seed+f/40),5),T=Math.pow(Math.max(0,Math.sin((f/4.6+N(w*2,y*2,t.seed+9)*1.5)*Math.PI)),10),A=t.granite?Vx(t,b,w,y,f,x):null,S=A?A.groove:.1*E+.09*T,L=A?d*(1-A.shape):d;z*=(1-S)*(A?1-A.shape:1),e.push(w*z+v,A?f-A.drop:f,y*z+p),A&&f===t.top&&(s+=A.drop/Ot),a.push(Math.min(.85,Math.max(0,(1-z/L)*1.6)+S*2.5+g*.55)),o.push(t.crest&&f>t.top-.7?1:0)}}const[c,i]=t.offset?.(t.top)??[0,0];e.push(c,t.top+(t.crest?0:2.5)-s,i),o.push(t.crest?1:0),a.push(0);const r=[];for(let f=0;f<n.length-1;f++)for(let m=0;m<Ot;m++){const d=f*Ot+m,g=f*Ot+(m+1)%Ot;r.push(d,d+Ot,g,g,d+Ot,g+Ot)}const u=n.length*Ot,h=(n.length-1)*Ot;for(let f=0;f<Ot;f++)r.push(h+f,u,h+(f+1)%Ot);const l=new ht;return l.setAttribute("position",new G(new Float32Array(e),3)),l.setAttribute("aCrest",new G(new Float32Array(o),1)),l.setAttribute("aShade",new G(new Float32Array(a),1)),l.setIndex(r),l.computeVertexNormals(),l}function Wx(t,n){const e=[],o=new it;for(let a=0;a<n;a++){const s=a<Math.ceil(n*.6),c=s?t.top-1.5-3*N(a,t.seed,41):t.bandLo-6-40*N(t.seed,a,42),i=t.seed*2.3+a*2.39,r=s?t.radius(c)*.75*N(a,t.seed,43):t.radius(c)*.95,u=.35+.35*N(a*1.3,t.seed,44),h=(N(a,t.seed*3,45)<.45?Em():Lm()).clone();h.scale(u,u*1.1,u).rotateY(i).translate(Math.cos(i)*r,c,Math.sin(i)*r),o.setHSL(.24+.06*N(a,7,t.seed),.3,.55);const l=h.getAttribute("color");if(l)for(let f=0;f<l.count;f++)l.setXYZ(f,l.getX(f)*o.r*2,l.getY(f)*o.g*2,l.getZ(f)*o.b*2);e.push(h)}return Tt(e)}function Yx(t,n){const e=46+10*N(t,1,51);return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:o=>o<-6.5?n+.3*Math.pow(-6.5-o,.9):(n+.32*(o-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-o)/7)))}}function Wr(t,n,e=!1){const o=a=>e?3*(1-Math.exp(-a/3)):0;return{seed:t,rc:n,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,granite:e,radius:a=>n+.28*Math.pow(Math.max(0,-6.5-a),.92)+o(Math.max(0,-6.5-a))}}function jx(t,n,e=0){const o=e===2,a=o?80+20*N(t,3,52):62+30*N(t,3,52),s=o?1.05+.25*N(t,4,53):.55+.35*N(t,4,53),c=e===1?5+6*N(t,6,55):1.2*N(t,6,55),i=N(t,7,56)*Math.PI*2;return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:a,crest:!1,granite:!0,radius:r=>{if(r<-6.5)return n+.34*Math.pow(-6.5-r,.92);const u=Math.max(0,(a-r)/(a-22.5)),h=Math.min(1,Math.max(0,(r-22.5)/10));return Math.max(.6,(n+2.2*h*h*(3-2*h))*Math.pow(u,s))},offset:r=>{const u=Math.max(0,(r-22.5)/(a-22.5));return[Math.cos(i)*c*u*u,Math.sin(i)*c*u*u]}}}function Xx(t,n){const e=50+18*N(t,8,57),o=N(t,9,58)*Math.PI*2,a=n+.6;return{seed:t+5,rc:2.4,bandLo:0,bandHi:0,bottom:24,top:e,crest:!1,granite:!0,radius:s=>Math.max(.5,2.8*Math.pow(Math.max(0,(e-s)/(e-24)),.75)),offset:s=>[Math.cos(o)*(a+.08*(s-24)),Math.sin(o)*(a+.08*(s-24))]}}function Zx(t){return[0,1,2,3,4,5].map(n=>{const e=n*2.1+.9,o=oa(jx(e,t,n%3));return n<3?o:Tt([o,oa(Xx(e,t))])})}const os=t=>Math.min(1,Math.max(0,t)),Mh=t=>{const n=os(t);return n*n*(3-2*n)};function Qx(t,n,e){const o=Math.floor(Math.abs(e(t/2-1))*13.7)%997,a=new F(t,1,7.6,Math.max(16,Math.round(t)),48,6).translate(0,.5,0);a.deleteAttribute("normal"),a.deleteAttribute("uv");const s=_f(a);a.dispose();const c=s.getAttribute("position"),i=new Float32Array(c.count),r=new Float32Array(c.count);for(let u=0;u<c.count;u++){const h=c.getX(u),l=c.getY(u),f=c.getZ(u),m=Math.abs(f)/3.8,d=os((Math.abs(h)-10)/3.5),g=Math.floor(h/2.6+.4*N(f*.3,1,o+31)),v=N(g,0,o+32),p=n(h)-(1-d)*.6*N(h*.5,f,3)-d*(2.6*v-.9+.5*N(h*.7,f*.5,o+33)),k=e(h)-10*N(h*.06,1,4);let b=k+(p-k)*l;r[u]=Math.abs(h)<12&&b>.3?1:0;const w=1+.6*os(-b/40),y=h/3.4+.7*N(h*.09,b*.045,o+41),x=Math.floor(y),M=y-x,C=N(x,0,o+42),z=5+7*C,E=b/z+C*7.3,T=E-Math.floor(E),A=N(x,Math.floor(E),o+43),S=Mh(Math.min(M,1-M)/.22),L=A>.5?Mh(Math.min(T,1-T)*z/.7):1,P=(.25+.75*(.65*C+.35*A))*S*L,B=2*(Ft(h*.07,b*.06,3,9+o)-.5),U=Math.min(1,Math.max(0,(p-b-.6)/2.4),Math.max(0,(b-k)/3)),W=(1.3*P-.5+.6*B)*U;i[u]=U*m*Math.min(.7,.55*(1-S*L)+.3*Math.max(0,-B));let X=f*w*(1+.3*(N(h*.2,b*.1,5)-.5))+Math.sign(f)*m*W;l>.999&&(b-=.45*m**4),X-=Math.sign(f)*.35*m*os(1-(p-b)/1.2),c.setXYZ(u,h*(1+.04*(N(b*.1,f,6)-.5)),b,X)}return s.setAttribute("aCrest",new G(r,1)),s.setAttribute("aShade",new G(i,1)),s.computeVertexNormals(),s}const In=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function kh(t,n,e){if(Ae()==="fansipan")return Qx(t,n,e);const o=new F(t,1,7.6,Math.max(10,Math.round(t/2)),36,4).translate(0,.5,0),a=o.getAttribute("position"),s=new Float32Array(a.count);for(let i=0;i<a.count;i++){const r=a.getX(i),u=a.getY(i),h=a.getZ(i),l=Math.min(1,Math.max(0,(Math.abs(r)-9)/4)),f=n(r)-(1-l)*.6*N(r*.5,h,3)-l*1.6*(N(r*.3,h*.2,3)-.3),m=e(r)-10*N(r*.06,1,4),d=m+(f-m)*u,g=1+.6*Math.max(0,Math.min(1,-d/40)),v=((d+3*N(r*.04,0,7))/5.5%1+1)%1,p=2.4*(Ft(r*.07,d*.06,3,9)-.5),k=Math.min(1,Math.max(0,(f-d-.6)/2.4),Math.max(0,(d-m)/3)),b=(1.3*(1-v)-.65+p)*k;s[i]=k*(Math.abs(h)/3.8)*Math.min(.85,.75*Math.max(0,(v-.5)/.5)+.35*Math.max(0,-p));const w=h*g*(1+.3*(N(r*.2,d*.1,5)-.5))+Math.sign(h)*(Math.abs(h)/3.8)*b;a.setXYZ(i,r*(1+.04*(N(d*.1,h,6)-.5)),d,w)}const c=new Float32Array(a.count);for(let i=0;i<a.count;i++)c[i]=Math.abs(a.getX(i))<12&&a.getY(i)>.3?1:0;return o.setAttribute("aCrest",new G(c,1)),o.setAttribute("aShade",new G(s,1)),o.computeVertexNormals(),o}function ue(t,n,e=()=>0){const o=t.getAttribute("position"),a=new Float32Array(o.count*3),s=new Float32Array(o.count);for(let c=0;c<o.count;c++)a.set(n,c*3),s[c]=e(o.getY(c));return t.setAttribute("color",new G(a,3)),t.setAttribute("aSway",new G(s,1)),t}function Jx(t,n){const e=[],o=In([.6,.42,.27]),a=r=>10.2-2.2*(1-(2*r/t)**2);for(let r=-t/2;r<t/2;r+=.9)e.push(ue(new F(.8,.22,3).translate(r,-.55,0).toNonIndexed(),o));if(n)for(const r of[-t/2,t/2])e.push(ue(new F(1.2,260,1.2).translate(r,-118,0).toNonIndexed(),o));for(const r of[-1.5,1.5]){e.push(ue(new F(t,.08,.08).translate(0,1.2,r).toNonIndexed(),o));const u=Array.from({length:13},(h,l)=>new _(-t/2+l/12*t,0,r*.3)).map(h=>h.setY(a(h.x)));e.push(ue(new lr(new hr(u),24,.07,4).toNonIndexed(),o))}const s=[In([.86,.12,.1]),In([.98,.72,.12]),In([.86,.12,.1]),In([.95,.88,.7]),In([.2,.55,.3]),In([.2,.4,.75])];let c=0;for(let r=-t/2+.6;r<t/2;r+=1.15,c++){const u=a(r)-.05,h=Math.min(u-1.5,5.4+2.2*N(r,2,8)+(c%3===0?1.3:0)),l=new En(.62,h,2,6),f=l.getAttribute("position");for(let d=0;d<f.count;d++){const g=(h/2-f.getY(d))/h;f.setX(d,f.getX(d)*(1-.15*g)),g>.99&&Math.abs(f.getX(d))<.01&&f.setY(d,f.getY(d)+.5)}l.rotateY((N(r,5,9)-.5)*.9).translate(r,u-h/2,c%2?.25:-.25);const m=s[Math.floor(N(r*1.7,3,10)*s.length*.999)];e.push(ue(l.toNonIndexed(),m,d=>Math.min(1,Math.max(0,(u-d)/h))))}for(let r=-t/2+2.3;r<t/2-1;r+=4.6){const u=a(r)-.75;e.push(ue(new rt(.34,.34,.66,8).translate(r,u,-.6).toNonIndexed(),In([.95,.16,.08]),()=>.3)),e.push(ue(new rt(.2,.2,.1,8).translate(r,u+.38,-.6).toNonIndexed(),In([.98,.75,.25]),()=>.3))}const i=Tt(e);return i.computeVertexNormals(),i}const Eo=2.9,tM=-1.25;function nM(t,n,e,o){const a=Eo+n,s=new F(a,1,6.8,Math.max(6,Math.round(a/3)),8,3).translate(a/2-Eo,.5,0),c=s.getAttribute("position"),i=new Float32Array(c.count);for(let r=0;r<c.count;r++){const u=c.getX(r),h=c.getY(r),l=c.getZ(r),f=Math.min(1,Math.max(0,(u+Eo)/Math.max(1,a))),m=9+(e-9)*Math.pow(f,.7)+6*(Ft(u*.08,l*.1+o,3,31)-.5),d=u>Eo?(u-Eo)*.35+.8*N(u*.4,l*.5+o,5):0,g=tM+d,v=g+(m-g)*h,p=1.6*(Ft(u*.09+o,v*.07,3,37)-.5)*Math.min(1,h*6);i[r]=Math.max(0,.6-h*3)*.8,c.setXYZ(r,u*t,v,l*(1+.15*Math.min(1,v/30))+Math.sign(l)*p)}if(s.setAttribute("aShade",new G(i,1)),s.setAttribute("aCrest",new G(new Float32Array(c.count),1)),t<0){const r=s.getIndex();for(let u=0;u<r.count;u+=3){const h=r.getX(u+1);r.setX(u+1,r.getX(u+2)),r.setX(u+2,h)}}return s.computeVertexNormals(),s}const eM=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function oM(t,n,e){const o=n-e,a=Math.max(0,o-jm),s=a>2,c=2+a,i=[Zn({len:t-1.4,width:6,base:s?"stilts":"plinth",floor:c,top:o-.02,skirt:s,roof:{half:4.1,rise:4.6,thick:.55,color:oo},wall:An,crest:!0,sink:6,windows:5,firewood:!0},31)],r=c+2.5,u=-3-.45;i.push(H(new rt(.07,.07,t-3,5,1,!0).rotateZ(Math.PI/2).translate(0,r,u),Qo,.15,3));for(let l=-t/2+2.2;l<t/2-2;l+=1.05){if(Math.abs(l)<1.1)continue;const f=N(l*.9,1.3,84),m=new rt(.26,.05,1.1+.3*f,5,1).translate(l,r-.6-.15*f,u);i.push(Ce(H(m,Vm,.2,l),(d,g)=>g>r-.45?.75:1))}for(const l of[-1,1])i.push(Ym().scale(1.1,1.1,1.1).translate(l*(t/2+1.6),0,-1.6*l));const h=s?c:0;for(let l=-t/2+1.2;l<=t/2-1.1;l+=2.9)for(const f of[-2.7,2.7])i.push(H(new rt(.2,.26,h+42,5,1,!0).translate(l,(h-42)/2,f),Xn,.15,l+f));return bt(i).translate(0,e,0)}function Vd(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3),c=new Float32Array(a.count);for(let i=0;i<a.count;i++)s.set(n,i*3),c[i]=e(a.getY(i));return o.setAttribute("color",new G(s,3)),o.setAttribute("aSway",new G(c,1)),o}const zs=qm.map(eM);function sc(t,n,e,o,a,s){for(let c=o,i=0;c<=a+.01;c+=.8,i++){const r=e*(1+.45*N(c*2.3,s,87)),u=new En(.74,r,2,2),h=u.getAttribute("position");for(let f=0;f<h.count;f++){const m=(r/2-h.getY(f))/r;h.setX(f,h.getX(f)*(1-.6*m)),m>.99&&Math.abs(h.getX(f))<.01&&h.setY(f,h.getY(f)+.3*r)}u.rotateY((N(c,s,85)-.5)*.6).translate(c,n-r/2,i%2?.14:-.14);const l=zs[Math.floor(N(c*1.7,s,86)*zs.length*.999)];t.push(Vd(u,l,f=>Math.min(1,Math.max(0,(n-f)/r))))}}const Lo=(t,n,e)=>H(new rt(n,n*1.08,t,7,1,!0),Qo,.2,e);function aM(t){const n=[];for(const a of[-1,1]){for(const[s,c,i]of[[11,.34,12.2],[12,.26,11.4]])n.push(Lo(i-t+6,c,s*a).translate(a*s,(i+t-6)/2,0));for(const s of[-1,1])n.push(Lo(4.4,.13,s+a).rotateZ(s*.55).translate(a*11.5,12.6,s*.12))}n.push(Lo(24.6,.3,1).rotateZ(Math.PI/2).translate(0,-.7,0)),n.push(Lo(24.6,.26,2).rotateZ(Math.PI/2).translate(0,-.18,.05));for(const[a,s]of[[2.4,.2],[5.62,.18],[7.62,.18],[10.5,.3]])n.push(Lo(24.6,s,a).rotateZ(Math.PI/2).translate(0,a,0));const e=new En(22.2,2.4,28,3).rotateY(Math.PI).translate(0,1.15,0);n.push(Ce(H(e,[.74,.66,.4],.15,5),(a,s)=>(Math.floor(a/.8)+Math.floor(s/.8))%2?1:.76)),n.push(H(new F(22.2,.05,.05).translate(0,10.15,-.05),[.35,.3,.22],.05,6)),n.push(Wm({len:25.6,half:1.5,rise:1.25,thick:.34,color:oo},7).translate(0,10.75,0));const o=[];sc(o,5.5,3.05,-10.4,10.4,1),sc(o,7.5,1.85,-10.4,10.4,2),sc(o,9.5,1.85,-10.4,10.4,4);for(let a=-10.6,s=0;a<=10.6;a+=.62,s++){const c=new ht;c.setAttribute("position",new G(new Float32Array([a-.3,10.15,-.08,a+.3,10.15,-.08,a,9.05,-.08]),3)),c.computeVertexNormals(),o.push(Vd(c,zs[s%zs.length],i=>i<9.5?1:0))}return{frame:bt(n),flags:bt(o)}}const Qc=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],sM=[.08,.17,.1],iM=[.29,.43,.2],cM=[.33,.23,.16],Ge=-6.5,$e=22.5,rM=2.4,Do=3.3;function lM(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3);for(let c=0;c<a.count;c++){const i=e(a.getY(c));s.set([n[0]*i,n[1]*i,n[2]*i],c*3)}return o.setAttribute("color",new G(s,3)),o}function hM(t,n,e,o,a){const s=new rt(o*.6,o,Do,10,1,!0).translate(0,Do/2,0),c=s.getAttribute("position");for(let f=0;f<c.count;f++){if(c.getY(f)>.01)continue;const m=Math.atan2(c.getZ(f),c.getX(f)),d=N(m*2.2+a,a*.37,91),g=.86+.26*d;c.setXYZ(f,c.getX(f)*g,c.getY(f)-.55*d,c.getZ(f)*g)}s.rotateY(a*1.3).translate(t,n,e);const i=Qc(iM),r=Qc(sM),u=s.toNonIndexed();u.deleteAttribute("uv"),u.computeVertexNormals();const h=u.getAttribute("position"),l=new Float32Array(h.count*3);for(let f=0;f<h.count;f++){const d=h.getY(f)<n+Do*.5?i:r,g=.85+.3*N(h.getX(f)*.7+a,h.getZ(f)*.7,92);l.set([d[0]*g,d[1]*g,d[2]*g],f*3)}return u.setAttribute("color",new G(l,3)),u}function uM(t,n,e,o){for(let a=n,s=0;a<t.top-Do*.6;a+=rM,s++){const c=t.radius(a);if(c<.35)break;const[i,r]=t.off(a);o.push(hM(i,a,r,c,e+s*.71))}}function mM(t,n,e){const o=Math.max(e+1.6,-40),a=54+6*N(t,2,93),s=(d,g)=>g/(1-.4*Math.min(1,(Ge-d)/Do)),c=d=>d<Ge?Math.min(5.2,n+1.2+.08*(Ge-d),s(d,n+.3)):d<=$e?n+.3-.35*((d-Ge)/($e-Ge)):(n-.05)*Math.pow(Math.max(0,(a-d)/(a-$e)),.85),i=t*2.1,r=(d,g)=>({top:g,off:v=>{const p=1.2+.13*Math.max(0,v-$e);return[Math.cos(d)*p,Math.sin(d)*p]},radius:v=>v<Ge?Math.min(3,s(v,2.2)):v<=$e?2.2:2.2*Math.pow(Math.max(0,(g-v)/(g-$e)),.9)}),u=[{top:a,off:()=>[0,0],radius:c},r(i,40+5*N(t,5,94)),r(i+2.4,45+5*N(t,6,95))],h=[];u.forEach((d,g)=>{const[v,p]=d.off(o),k=d.top*.8-(e-3);h.push(lM(new rt(.35,.9,k,6,1,!0).translate(v,e-3+k/2,p),Qc(cM),b=>.7+.3*Math.min(1,Math.max(0,(b-e)/30)))),uM(d,o+g*.8,t*3.7+g,h)});const l=Tt(h),f=l.getAttribute("position"),m=l.getAttribute("color");for(let d=0;d<f.count;d++){const g=.78+.42*Math.min(1,Math.max(0,(f.getY(d)-e)/(a-e)));m.setXYZ(d,m.getX(d)*g,m.getY(d)*g,m.getZ(d)*g)}return l}function dM(t){const n=[];for(const[o,a,s]of[[0,.6,3.4],[2.3,3,2.3],[4.4,2.8,1.9]]){const c=o+t,i=new Rn(s,1).scale(1,.55,.9).rotateY(c).translate(Math.cos(c)*a,s*.12,Math.sin(c)*a);i.deleteAttribute("uv"),n.push(i)}const e=Tt(n);return e.computeVertexNormals(),e}const Sh=new Map;function Es(t,n){let e=Sh.get(t);return e||Sh.set(t,e=n()),e}const Th=new Map,as=t=>new j(t,Vs).add(pn(t));function fM(t,n,e){if(t.kind==="ridge")return as(Es(`d${n}`,()=>oM(26,1,n)));if(t.kind==="bridge"){let c=Th.get(n);return c||Th.set(n,c=aM(n)),new yt().add(as(c.frame),new j(c.flags,e))}const a=($.zone(J(t.z),!0)==="valley"?0:2)+t.id%2,s=as(Es(`h${a}:${n}`,()=>Zv(a,1-n)));return s.position.y=n,s.updateMatrix(),new yt().add(s,Er(7,8,n+.12))}const Ga=[],ic={x:0,y:0,z:0};function gM(t){const n=vd();if(t.kind==="spike"){if(!Ga.length)for(const i of[0,1,2]){const r=Wr(i*2.3+.7,Wt.spike.halfX);Ga.push({rock:oa(r),trees:nv(r.seed,r.radius,r.top,5)})}const c=Ga[t.id%Ga.length];return new yt().add(new j(c.rock,n).add(pn(c.rock)),new j(c.trees,ho))}D(t.z,Ct(t.lane),0,ic);const e=Math.round(lt(ic.x,ic.z)-Y(t.z)),o=t.id%4,a=Es(`p${o}:${e}`,()=>mM(o*1.7+.3,Wt.pillar.halfX,e)),s=new j(Es(`b${o}`,()=>dM(o*1.9)),n);return s.position.y=e,s.updateMatrix(),new yt().add(as(a),s)}const Ah=64,cc=170,$a=5.5;function pM(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.35,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new aa(t)}function vM(){const t=new yt,n=(g,v)=>{const p=new vt(g,v,Ah);return p.frustumCulled=!1,p.count=0,p.setColorAt(0,new it),t.add(p),p},e=Tt([new rt(.95,1.05,1.7,14),new rt(1.35,1.2,.24,14).translate(0,.97,0),new F(.34,.34,2.4).translate(0,-.45,1.3)]),o=n(e,new ce({color:3421756})),a=n(new Rn(1,2),new qt({fog:!1})),s=n(new Rf(1,24),new qt({map:pM(),fog:!1,transparent:!0,depthWrite:!1,blending:sn,side:Nt}));s.renderOrder=3;const c=n(new pu(.82,1,28),new qt({fog:!1,transparent:!0,depthWrite:!1,blending:sn,side:Nt}));c.renderOrder=3;const i=new _t,r=new kt,u=new _,h=new _,l=new _,f=new _(0,0,1),m={x:0,y:0,z:0},d=new it;return{group:t,update(g,v){let p=0,k=1/0;for(const b of g.obstacles){const w=b.z-Wt[b.kind].halfZ-.4-g.z;w>=6&&w<=cc&&b.z<k&&(k=b.z)}for(const b of g.obstacles){const w=Wt[b.kind],y=b.z-w.halfZ-.4,x=y-g.z;if(x<6||x>cc||b.z>k+8)continue;const M=Math.sin(b.id*12.9898)*43758.5453,C=(M-Math.floor(M))*2-1,z=w.hi<$a?w.hi-.7:w.lo>-$a?w.lo+.7:C*2.2,E=Number.isFinite(w.halfX)?[b.lane]:[-1,0,1],T=(1-Math.min(1,Math.max(0,(x-cc+25)/25)))*Math.min(1,Math.max(0,(x-6)/8)),A=v*1.4+b.id*.113,S=.3+.7*Math.min(1,Math.max(0,Math.sin(A*Math.PI*2)*1.6+.6)),L=A-Math.floor(A),P=.45+x*.008;for(const B of E){if(p>=Ah)break;const U=Ct(B)+(Number.isFinite(w.halfX)&&w.hi>$a&&w.lo<-$a?C*.9:0);D(y+1,U,z,m),l.set(m.x,m.y,m.z),D(y,U,z,m),l.sub(u.set(m.x,m.y,m.z)).normalize(),r.setFromUnitVectors(f,l),i.compose(u.set(m.x,m.y,m.z).addScaledVector(l,.35*P),r,h.setScalar(P)),o.setMatrixAt(p,i),o.setColorAt(p,d.setRGB(1,1,1)),i.compose(u.set(m.x,m.y,m.z).addScaledVector(l,-.55*P),r,h.setScalar(P*.78)),a.setMatrixAt(p,i),a.setColorAt(p,d.setRGB(2.2,.06,.04).multiplyScalar(S*T)),i.compose(u,r,h.setScalar(P*3.4)),s.setMatrixAt(p,i),s.setColorAt(p,d.setRGB(.9,.08,.04).multiplyScalar(S*T)),i.compose(u,r,h.setScalar(P*(1.3+3.2*L))),c.setMatrixAt(p,i),c.setColorAt(p,d.setRGB(1.4,.05,.03).multiplyScalar((1-L)**2*T)),p++}}for(const b of[o,a,s,c])b.count=p,b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0)}}}const Bo=vd(),qd=ho,Wd={value:1},Yd={value:0},ma=new ce({vertexColors:!0,side:Nt});ma.onBeforeCompile=t=>{t.uniforms.uLift=Wd,t.uniforms.uTime=Yd,Object.assign(t.uniforms,eo),t.vertexShader=`attribute float aSway;
uniform float uTime;
${t.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),t.fragmentShader=`uniform float uLift;
${Os}${t.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};ma.customProgramCacheKey=()=>"cloth-hazard";const jd=(t,n)=>({rock:oa(t),trees:Wx(t,n)}),Xd=[0,1,2,3,4,5,6,7].map(t=>jd(Yx(t*1.7+.3,Wt.pillar.halfX),9)),yM=[0,1,2].map(t=>jd(Wr(t*2.3+.7,Wt.spike.halfX),4)),Zd=new ht;let bM=null;const wM=()=>bM??=Zx(Wt.pillar.halfX).map(t=>({rock:t,trees:Zd}));let xM=null;const MM=()=>xM??=[0,1,2].map(t=>({rock:oa(Wr(t*2.3+.7,Wt.spike.halfX,!0)),trees:Zd})),Nh=new Map;function Qd(t,n){const e=Math.ceil(t/4)*4,o=`${e}:${n}`;let a=Nh.get(o);return a||Nh.set(o,a=Jx(e,n)),a}const Ch=new Map;function rc(t,n){let e=Ch.get(t);return e||Ch.set(t,e=n()),e}function kM(t,n){const e=Y(t.z),o=t.kind==="ridge"||t.kind==="bridge";D(t.z,o?0:Ct(t.lane),0,n);const a=Math.round((lt(n.x,n.z)-e)*2)/2;if(oe()>.5)return fM(t,a,ma);const s=h=>new j(h,Vs).add(pn(h)),c=lo()>.5,i=c?"hg":"";if(t.kind==="ridge")return s(rc(`${i}d${a}`,()=>K2(26,1,a,c?Ks:void 0)));if(t.kind==="bridge")return s(rc(`${i}g${a}`,()=>V2(a,c?Pv:void 0)));const r=t.id%3,u=s(rc(`${i}h${r}:${a}`,()=>Dm(r,1-a,c)));return u.position.y=a,u.updateMatrix(),new yt().add(u,Er(8,9,a+.12))}function SM(){const t=Xd[0],n=Qd(46,!0),e=Dm(0,1,lo()>.5);return[new j(t.rock,Bo).add(pn(t.rock)),new j(t.trees,qd),new j(n,ma).add(pn(n)),new j(e,Vs).add(pn(e)),Er(8,9,0)]}function TM(){const t=new yt,n=$.hazardBeacons?vM():null;n&&t.add(n.group);const e=new Map,o={x:0,y:0,z:0},a=s=>{const c=bn(s.z);let i;if(ee(s.z))i=kM(s,o);else if(oe()>.5&&(s.kind==="pillar"||s.kind==="spike"))i=gM(s);else if(s.kind==="pillar"||s.kind==="spike"){const h=Ae()==="fansipan",l=s.kind==="pillar"?h?wM():Xd:h?MM():yM,f=l[s.id%l.length];i=new yt().add(new j(f.rock,Bo).add(pn(f.rock))),h||i.add(new j(f.trees,qd))}else if(s.kind==="ridge"){const h=Y(s.z),l=s.open?64:2*c+18,f=new Map,m=p=>{let k=f.get(p);return k===void 0&&f.set(p,k=lt(D(s.z,p,0,o).x,o.z)-h),k},d=l/2-20,g=p=>Math.min(1,Math.abs(p)/d),v=s.open?kh(l,p=>1+Math.max(0,Math.abs(p)-d)*2.2,p=>Math.abs(p)<d?-16-70*g(p)**6:m(p)-12):kh(l,p=>Math.abs(p)<10?1:Math.max(1,m(p)+3),p=>m(p)-12);i=new j(v,Bo).add(pn(v)),i.userData.own=!0}else if(s.kind==="overhang"){const h=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,l=nM(h,Math.max(8,c+18-Math.abs(Ct(s.lane))),70,s.id%97);i=new j(l,Bo).add(pn(l)),i.userData.own=!0}else if(qs(s.z))i=v5();else{const h=Qd(s.open?46:2*c+18,s.open);i=new j(h,ma).add(pn(h))}const r=s.kind==="ridge"||s.kind==="bridge";D(s.z,r?0:Ct(s.lane),0,o),i.position.set(o.x,o.y,o.z);const u=r||ee(s.z)||s.kind==="overhang";return i.rotation.y=zt(s.z)+(u?0:s.id*2.39),u||i.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),i.matrixAutoUpdate=!1,i.updateMatrix(),i.traverse(h=>{h.matrixAutoUpdate=!1,h.updateMatrixWorld(),h.userData.hazardHull&&(i.userData.hull=h)}),t.add(i),i};return{group:t,update(s,c,i){Yd.value=c,n?.update(s,c);const r=Math.min(1,Math.max(0,(i-.4)/.5));Wd.value=1-.75*r,Bo.uniforms.uLift.value=1-.45*r;const u=new Set;for(const h of s.obstacles){u.add(h.id);let l=e.get(h.id);l||e.set(h.id,l=a(h)),_v(l.userData.hull,h.z-s.z)}for(const[h,l]of e)u.has(h)||(t.remove(l),l.userData.own&&l.geometry.dispose(),e.delete(h))}}}function AM(t){const n=new io({map:t,roughness:.8,side:Nt}),e={uTime:{value:0},uFlutter:{value:1}};return n.onBeforeCompile=o=>{Object.assign(o.uniforms,e),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},n.userData.setTime=(o,a)=>{e.uTime.value=o,e.uFlutter.value=a},n}const Oa=new io({color:"#a8141c",roughness:.55}),NM=new io({color:"#f6f4ef",roughness:.18,metalness:.05}),CM=new io({color:"#15161c",roughness:.08,metalness:.6}),lc=new io({color:"#1c1d22",roughness:.75});function Da(t,n,e,o){const a=Math.hypot(n[0]-t[0],n[1]-t[1],n[2]-t[2]),s=new j(new If(e,a,4,10),o);return s.position.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),s.lookAt(s.position.x+n[0]-t[0],s.position.y+n[1]-t[1],s.position.z+n[2]-t[2]),s.rotateX(Math.PI/2),s}function zM(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.fillStyle="#efe2c8",n.fillRect(0,0,256,256);for(let o=-8;o<16;o++)for(const[a,s]of[[1,1],[1,-1]])n.strokeStyle="rgba(120,80,50,0.28)",n.lineWidth=2,n.beginPath(),n.moveTo(o*32,s>0?0:256),n.lineTo(o*32+256*a,s>0?256:0),n.stroke();n.fillStyle="#2bb5ad",n.fillRect(0,18,256,14),n.fillStyle="#a8141c",n.fillRect(0,0,256,10),n.fillRect(0,226,256,30);const e=new aa(t);return e.colorSpace=du,e.anisotropy=4,e}function zh(t,n,e,o,a,s){const r=[],u=[],h=[];for(let f=0;f<=6;f++){const m=f/6;for(let d=0;d<=10;d++){const g=d/10,v=[0,1,2].map(p=>(1-m)*((1-g)*t[p]+g*n[p])+m*((1-g)*o[p]+g*e[p]));v[2]=v[2]+.12*m*Math.sin(Math.PI*g),v[1]=v[1]+a*Math.sin(Math.PI*g)*Math.sin(Math.PI*m)+.025*Math.abs(Math.sin(Math.PI*g*4)),r.push(...v),u.push(g*2,m)}}for(let f=0;f<6;f++)for(let m=0;m<10;m++){const d=f*11+m;s?h.push(d,d+1,d+10+1,d+1,d+10+2,d+10+1):h.push(d,d+10+1,d+1,d+1,d+10+1,d+10+2)}const l=new ht;return l.setAttribute("position",new G(new Float32Array(r),3)),l.setAttribute("uv",new G(new Float32Array(u),2)),l.setIndex(h),l.computeVertexNormals(),l}function EM(){const t=new yt,n=new yt;t.add(n);const e=zM(),o=AM(e);n.add(Da([0,0,-.32],[0,.02,.5],.18,Oa));const a=new j(new qe(.15,20,14),NM);a.position.set(0,.07,.78);const s=new j(new qe(.152,20,10,-1.1,2.2,1.35,.6),CM);s.position.copy(a.position),s.rotation.x=-.3,n.add(a,s);const c=new j(new F(.26,.1,.4,2,1,2),lc);c.position.set(0,.19,.1),n.add(c);const i=[],r=[];for(const d of[1,-1]){const g=new yt,v=[.17*d,.05,.44],p=[1.02*d,.07,.3];g.add(Da(v,p,.06,Oa));const k=new j(new qe(.06,8,6),lc);k.position.set(p[0]+.05*d,p[1],p[2]+.02),g.add(k),r.push(k),g.add(new j(zh(v,p,[.62*d,.02,-.2],[.2*d,0,-.42],.07,d<0),o)),i.push(g),n.add(g)}const u=[.14,0,-.34],h=[-.14,0,-.34],l=[.33,-.03,-1.18],f=[-.33,-.03,-1.18];n.add(Da(u,l,.075,Oa),Da(h,f,.075,Oa)),n.add(new j(zh([.13,0,-.36],[-.13,0,-.36],f,l,.05,!1),o));const m=[];for(const d of[l,f]){const g=new j(new F(.12,.17,.13),lc);g.position.set(d[0],d[1]-.04,d[2]-.06),n.add(g),m.push(g)}return{root:t,body:n,feet:m,tips:r,ankles:m,animate(d,g,v){for(const p of i)p.scale.x=g;o.userData.setTime?.(d,v)}}}const LM={roll:.62,flip:.9,split:3,spiral:1.5},Eh=$.edge-10,_o=t=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,t)));function _M(){const t={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let n=null,e=0,o=1,a=0,s=1,c=!1,i=Number.NaN,r=0;const u=(h,l)=>{n=h,e=0,o=l,c=!0};return{trick(h,l){return n!==null?!1:(u(h,l),!0)},update(h,l){if(t.roll=t.pitch=t.dx=t.dv=t.cam=0,t.spread=null,h.mode!=="run")return n=null,i=Number.NaN,t;const f=J(h.z);if($.splitS!==!1&&i<Eh&&f>=Eh&&f-i<200?u("split",wn(h.z)%2===0?1:-1):n===null&&h.thermalT>0&&r<=0&&u("spiral",h.x>=0?-1:1),i=f,r=h.thermalT,n===null)return t;c&&(c=!1,a=h.obstacles.some(v=>v.z>h.z-2&&v.z<h.z+h.speed)?1:3,s=LM[n]*(n==="roll"||n==="flip"?Gn(h.pace,1.2,.85):1)),e+=l;const m=e/s;if(m>=1)return n=null,t;const d=_u(h.z);if(n==="roll")t.roll=o*2*Math.PI*_o(m),t.spread=1.06;else if(n==="flip"){const g=2*Math.PI*_o(m);t.pitch=-g,t.dv=a*.5*(1-Math.cos(g)),t.spread=.82}else if(n==="split")t.roll=o*Math.PI*(_o(m/.15)+_o((m-.7)/.22)),t.spread=1.04;else{const g=4*Math.PI*_o(m),v=Math.sin(Math.PI*m);t.roll=o*g,t.dx=o*v*Math.sin(g),t.dv=v*(1-Math.cos(g))}return(n==="roll"||n==="split")&&(t.cam=o*Math.sin(Math.abs(t.roll)/2)*(.12+.3*d)),t}}}const Lh=$.pilotRollMax??1.1,Jd=t=>2.5*(1-Math.exp(-t*6)),RM=t=>4.5*Math.min(t,1.4)**2,Ua={x:0,y:0,z:0};function tf(t){return D(t.z-Jd(t.crashT),t.x,t.v,Ua),Math.max(0,Math.min(RM(t.crashT),Ua.y-lt(Ua.x,Ua.z)-.6))}function IM(){let t=0,n=0,e=0,o=0,a=0,s=0,c=0,i=1;const r=_M();let u=0;return{lateralSpeed:()=>e,trick:(h,l)=>r.trick(h,l),camRoll:()=>u,apply(h,l,f,m){const{root:d,body:g}=h;if(m>0){const M=1-Math.exp(-m*14);e+=((l.x-t)/m-e)*M,o+=((l.v-n)/m-o)*M}t=l.x,n=l.v;const v=r.update(l,m);if(u=v.cam,D(l.z,l.x+v.dx,l.v+v.dv,d.position),d.rotation.order="YXZ",d.rotation.set(-Math.atan(vn(l.z)),zt(l.z),0),g.rotation.order="ZXY",l.mode==="crash"||l.mode==="over"){D(l.z-Jd(l.crashT),l.x,l.v-tf(l),d.position),g.rotation.set(Math.sin(f*9)*1.6,f*4,f*13),h.animate(f,.7,2.5,0,m);return}const p=1-Math.exp(-m*Gn(l.pace,6.5,12));a+=(Math.max(-Lh,Math.min(Lh,e*.027+Lu(l.z,l.speed)))-a)*p;const k=-(Math.atan(vn(l.z+18))-Math.atan(vn(l.z)))*.9;s+=(Math.max(-.45,Math.min(.5,-o*.045+k))-s)*p,c+=(Math.max(-.2,Math.min(.2,e*.006))-c)*p;const b=v.spread??(l.vert==="dive"?.8:l.vert==="flare"?1.06:1);i+=(b-i)*p;const w=Math.sin(f*23)*.012+Math.sin(f*7.3)*.018,y=(l.stunT/I.stunTime)**2;g.rotation.set(s+v.pitch+w+.3*y*Math.sin(f*9.3+1),c+.28*y*Math.sin(f*6.1),a+v.roll+w*.6+.6*y*Math.sin(f*13));const x=(l.vert==="dive"?1.8:l.thermalT>0?1.4:1)*Gn(l.pace,.85,1.2)+1.6*y;h.animate(f,i-.22*y,x,Math.max(-1,Math.min(1,e/35+Math.sin(f*11)*y)),m)}}}const PM=2.15,BM=[Math.PI/2,0,0],HM=[new _(1,0,0),new _(0,1,0),new _(0,0,1)];class Xe{static q=new kt;bone;rest;axes;cur=[0,0,0];constructor(n){this.bone=n,this.rest=n.quaternion.clone();const e=n.getWorldQuaternion(new kt).invert();this.axes=HM.map(o=>o.clone().applyQuaternion(e))}static t=[0,0,0];set(n,e,o,a){const s=Xe.t;s[0]=n,s[1]=e,s[2]=o,this.bone.quaternion.copy(this.rest);for(let c=0;c<3;c++)this.cur[c]+=(s[c]-this.cur[c])*a,this.cur[c]&&this.bone.quaternion.multiply(Xe.q.setFromAxisAngle(this.axes[c],this.cur[c]))}}function FM(t){const n=f=>f.getWorldPosition(new _),e=f=>f.children.filter(m=>m.isBone),o=f=>{const m=[f];for(let d=e(f);d.length===1;d=e(d[0]))m.push(d[0]);return m},a=[];t.traverse(f=>{f.isBone&&a.push(f)});const s=a[0];if(!s)return null;const c=e(s).sort((f,m)=>n(m).z-n(f).z);if(c.length<3)return null;const i=o(c[0]),r=i[i.length-1],u=e(r).sort((f,m)=>Math.abs(n(f).x)-Math.abs(n(m).x));if(u.length<3)return null;const h=(f,m)=>({side:Math.sign(n(f).x),j:m(o(f)).map(d=>new Xe(d))}),l=c.slice(-2);return{spine:i.map(f=>new Xe(f)),neck:o(u[0]).slice(0,2).map(f=>new Xe(f)),arms:u.slice(-2).map(f=>h(f,m=>m.length>=4?m.slice(1,4):m.slice(0,3))),legs:l.map(f=>h(f,m=>m.slice(0,3))),toes:l.map(f=>o(f).at(-1)),ankles:l.map(f=>o(f)[2]??o(f).at(-1)),hands:u.slice(-2).map(f=>o(f).at(-1))}}const nf={value:0};function GM(t){const n=new io({map:t.map,roughness:.78,metalness:0,side:Nt});return n.onBeforeCompile=e=>{e.uniforms.uHurt=nf,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},n}function $M(t){const n=new qt({color:new it(.06,.02,.05),side:rr});return n.onBeforeCompile=e=>{e.uniforms.uPush={value:.011/t},e.vertexShader=`uniform float uPush;
${e.vertexShader}`.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * uPush;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function OM(t,n=!0,e){return new Pf().setMeshoptDecoder(Bf).loadAsync("models/pilot.glb").then(async o=>{const a=o.scene,s=[];a.traverse(u=>{const h=u;h.isSkinnedMesh&&(h.material=GM(h.material),h.frustumCulled=!1,s.push(h))});for(const u of n?s:[]){const h=new Hf(u.geometry,$M(u.scale.x));h.bind(u.skeleton,u.bindMatrix),h.frustumCulled=!1,h.position.copy(u.position),h.quaternion.copy(u.quaternion),h.scale.copy(u.scale),u.parent?.add(h)}const c=new yt;c.rotation.set(...BM),c.scale.setScalar(PM),c.position.set(0,0,.12),c.add(a),c.updateMatrixWorld(!0),await e?.(c).catch(()=>{});const i=FM(a);for(const u of t.body.children)u.visible=!1;if(t.body.add(c),!i){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}t.feet=i.toes,t.ankles=i.ankles,t.tips=i.hands;let r=0;t.animate=(u,h,l,f,m)=>{const d=1-Math.exp(-m*12),g=Math.min(1,Math.max(0,(1-h)/.2)),v=Math.min(1,Math.max(0,(h-1)/.06));r+=m*7*l;for(const{side:p,j:k}of i.arms){const b=.07+.16*v-.08*g;k.forEach((w,y)=>{const x=Math.sin(r-y*.8+(p>0?.4:0))*(.025+.02*y),M=y===0?.5*g-.12*v:y===1?.18*g:.08*g;w.set(0,p*M,p*((y===0?b:0)+x),d)})}for(const{side:p,j:k}of i.legs){const[b,w,y]=k;b?.set(-.05*v,-p*(.06+.08*v-.14*g)+.07*f,0,d),w?.set(-(.08+.3*v+Math.sin(r*.5+p)*.03),0,0,d),y?.set(1.15,0,0,d)}i.spine.forEach((p,k)=>p.set(Math.sin(u*1.7+k)*.015-.06*v,.07*f,0,d)),i.neck.forEach((p,k)=>p.set(k===0?-(.3+.1*g):-.22,k===0?.05*f:0,0,d))}}).catch(o=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",o))}const Wn=18,_h=.075,DM=.035;function UM(){const t=new Float32Array(2*Wn*2*3),n=new Float32Array(2*Wn*2*4),e=new Uint16Array(2*(Wn-1)*6);for(let h=0,l=0;h<2;h++)for(let f=0;f<Wn-1;f++){const m=(h*Wn+f)*2;e.set([m,m+1,m+2,m+1,m+3,m+2],l),l+=6}const o=new ht;o.setAttribute("position",new G(t,3)),o.setAttribute("color",new G(n,4)),o.setIndex(new G(e,1));const a=new j(o,new qt({vertexColors:!0,transparent:!0,blending:sn,depthWrite:!1,fog:!1}));a.frustumCulled=!1,a.renderOrder=5;const s=[[],[]],c=[],i=new _,r=new _,u=new _;return{mesh:a,update(h,l,f,m,d){for(let g=0;g<2;g++){const v=s[g],p=h[g];if(f&&p){const b=(v.length>=Wn?v.pop():c.pop())??{p:new _,t:0};p.getWorldPosition(b.p),b.t=l,v.unshift(b)}for(;v.length&&l-v[v.length-1].t>_h;)c.push(v.pop());const k=v.length;for(let b=0;b<Wn;b++){const w=(g*Wn+b)*2;if(b>=k||k<2){w>=2&&t.copyWithin(w*3,(w-2)*3,w*3),n.fill(0,w*4,w*4+8);continue}const y=v[b],x=Math.min(1,(l-y.t)/_h);b+1<k?i.subVectors(y.p,v[b+1].p):i.subVectors(v[b-1].p,y.p),u.subVectors(d,y.p),r.crossVectors(i,u).normalize().multiplyScalar(DM*(1-.85*x));const M=w*3;t[M]=y.p.x+r.x,t[M+1]=y.p.y+r.y,t[M+2]=y.p.z+r.z,t[M+3]=y.p.x-r.x,t[M+4]=y.p.y-r.y,t[M+5]=y.p.z-r.z;const C=(1-x)**2*Math.min(1,x*8+.35)*(.22+.3*m),z=w*4;n[z]=n[z+4]=1,n[z+1]=n[z+5]=.95,n[z+2]=n[z+6]=.86,n[z+3]=n[z+7]=C}}o.attributes.position.needsUpdate=!0,o.attributes.color.needsUpdate=!0}}}const ef=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,KM={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new yn(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0},uVeil:{value:0},uVeilNight:{value:0}},vertexShader:ef,fragmentShader:`
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
}`},VM={uniforms:{tDiffuse:{value:null},uTexel:{value:new yn(1/1280,1/720)}},vertexShader:ef,fragmentShader:`
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
}`},Rh=.35;function qM(t,n,e,o,a){t.toneMapping=o0,t.toneMappingExposure=1;const s=new Ff(t);s.addPass(new a0(n,e));const c=new Gf(new yn(256,256),Rh,.5,1.4);s.addPass(c);const i=new s0(KM);s.addPass(i);const r=new $f;s.addPass(r);let u=!1;const h=(v,p)=>{u=p,c.enabled=v.bloom&&!p,r.enabled=c.enabled,i.material.defines.SHAFT_N=p?Math.min(v.shafts,8):v.shafts,i.material.defines.SPEED_BLUR=v.speedBlur&&!p?1:0,i.material.needsUpdate=!0};h(a,!1);const l=new s0(VM);l.enabled=!1,s.addPass(l);const f=new _(o.x,o.y,o.z);let m=1;const d=new _,g=new _;return{render(){e.getWorldDirection(g),d.copy(f).multiplyScalar(1e4).add(e.position).project(e);const v=g.dot(f);i.uniforms.uSun.value.set(d.x*.5+.5,d.y*.5+.5);const p=Math.max(0,Math.min(1,(v-.2)/.4)),k=1-(1-($.sunGlare??1))*p;i.uniforms.uSunVisible.value=m*p*k,c.strength=Rh*k,s.render()},setSize(v,p){s.setSize(v,p),c.resolution.set(v/2,p/2),i.uniforms.uAspect.value=v/p;const k=t.getPixelRatio();l.uniforms.uTexel.value.set(1/(v*k),1/(p*k))},setPixelRatio(v){s.setPixelRatio(v)},setLite(){return u||!a.bloom&&a.shafts<=8&&!a.speedBlur?!1:(h(a,!0),!0)},togglePainterly(){return l.enabled=!l.enabled,l.enabled},painterly:()=>l.enabled,warmPlan(){r.enabled&&(r.material.defines={...Of.getTransfer(t.outputColorSpace)===Df?{SRGB_TRANSFER:""}:{},...t.toneMapping===o0?{ACES_FILMIC_TONE_MAPPING:""}:{}},r.material.needsUpdate=!0);const v=[];return s.passes.forEach((p,k)=>{if(!p.enabled||p instanceof a0)return;const b=s.renderToScreen&&s.isLastEnabledPass(k);for(const w of Object.values(p))for(const y of Array.isArray(w)?w:[w])y?.isMaterial&&v.push({material:y,toScreen:b})}),{sceneTarget:s.readBuffer,quads:v}},setSpeed(v,p=0){const k=$.speedBlur??1;i.uniforms.uSpeed.value=v*(k+(1-k)*p)},setDanger(v){i.uniforms.uDanger.value=v},setVeil(v,p){i.uniforms.uVeil.value=v,i.uniforms.uVeilNight.value=p},setSun(v,p){f.set(v.x,v.y,v.z),m=p}}}function WM(t,n){const e=new Uf({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,n)),e.setSize(t.clientWidth,t.clientHeight),e.info.autoReset=!1,t.appendChild(e.domElement);const o=new Kf,a=new Vf(60,t.clientWidth/t.clientHeight,.5,7e4),s=new qf(16777215,2.4),c=new Wf(16777215,16777215,1.3);return o.add(s,s.target,c),{renderer:e,scene:o,camera:a,sun:s,hemi:c}}const YM=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function jM(t){return`
uniform float uDusk;
uniform float uMorn;
${xd(t,"uDusk","uMorn")}
${re}
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
}`}function XM(t){const n=new St({vertexShader:YM,fragmentShader:jM(t),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:rr,depthWrite:!1,depthTest:!1,fog:!1}),e=new j(new qe(1e3,48,24),n);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(o,a,s,c){e.position.copy(o.position),n.uniforms.uTime.value=a,n.uniforms.uDusk.value=s,n.uniforms.uMorn.value=c}}}function ZM(){return new St({vertexShader:`
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
}`,transparent:!0,blending:sn,depthWrite:!1})}function QM(){return new St({vertexShader:`
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
}`,transparent:!0,blending:sn,depthWrite:!1})}const Jc=12,Ih=new it(.62,.44,.17),JM=new it(.72,.6,.34);function hc(t,n){const e=new vt(t,n,Jc);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new it(0,0,0)),e}function tk(){const t=hc(new pu(.82,1,40),new qt({transparent:!0,blending:sn,depthWrite:!1,fog:!1,side:Nt})),n=hc(new En(2,2),QM()),e=hc(new Rn(1,4),ZM()),o={ring:t,flare:n,shell:e},a=[],s=new _t,c=new kt,i=new _,r=new _,u=new it,h=new _(0,0,1),l=f=>{a.length>=Jc*3&&a.shift(),a.push(f)};return{mesh:t,star:n,shell:e,spawn(f,m,d){l({part:"ring",x:f,y:m,z:d,t:0,dur:.32,r0:.6,r1:2.8,color:Ih}),l({part:"shell",x:f,y:m,z:d,t:0,dur:.32,r0:1.5,r1:3.4,color:Ih}),l({part:"flare",x:f,y:m,z:d,t:0,dur:.36,r0:.5,r1:2.2,color:JM})},update(f,m){const d={ring:0,flare:0,shell:0};for(let g=a.length-1;g>=0;g--){const v=a[g];if(v.t+=f,v.t>=v.dur||d[v.part]>=Jc){a.splice(g,1);continue}v.x+=m.x*f,v.y+=m.y*f,v.z+=m.z*f;const p=v.t/v.dur,k=v.r0+(v.r1-v.r0)*(1-(1-p)*(1-p)),b=(1-p)*(1-p)*1.1,w=v.part==="flare"?c.setFromAxisAngle(h,p*2.2):c.identity();s.compose(i.set(v.x,v.y,v.z),w,r.set(k,k,k));const y=o[v.part];y.setMatrixAt(d[v.part],s),y.setColorAt(d[v.part]++,u.copy(v.color).multiplyScalar(b))}for(const g of["ring","flare","shell"]){const v=o[g];v.count=d[g],v.instanceMatrix.needsUpdate=!0,v.instanceColor&&(v.instanceColor.needsUpdate=!0)}}}}const Ph=4,Bh=36,nk={rock:[new it(.42,.33,.36),new it(.3,.24,.28),new it(.24,.3,.16)],cloth:[new it(.8,.1,.08),new it(.95,.66,.1),new it(.5,.33,.2)],village:[new it(.62,.22,.12),new it(.55,.3,.2),new it(.85,.7,.35)]},ek=()=>new St({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function ok(){const t=new vt(new En(2,2),ek(),Ph),n=new vt(new Rn(1,0),new ce,Bh);for(const h of[t,n])h.count=0,h.frustumCulled=!1,h.setColorAt(0,new it);t.renderOrder=8;const e=[],o=[];let a=0;const s=new _t,c=new kt,i=new _,r=new _,u=new it;return{stars:t,chips:n,danger:()=>a,spawn(h,l,f,m,d){e.length>=Ph&&e.shift(),e.push({x:h,y:l,z:f,t:0,dur:d?.42:.3,r0:d?1.4:.9,r1:d?5.2:3.2,seed:Math.random(),follow:!d});const g=d?22:10;for(let v=0;v<g;v++){o.length>=Bh&&o.shift();const p=Math.random()*Math.PI*2,k=(d?7:5)+Math.random()*7,b=nk[m];o.push({x:h,y:l,z:f,t:0,life:.9+Math.random()*.6,size:(d?.22:.16)+Math.random()*(d?.38:.22),vx:Math.cos(p)*k,vy:Math.sin(p)*k*.8+4,vz:-(3+Math.random()*8),spin:new _(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:b[v%b.length]})}a=Math.max(a,d?1:.75)},update(h,l){a=Math.max(0,a-h*1.4);let f=0;for(let m=e.length-1;m>=0;m--){const d=e[m];d.t+=h;const g=d.t/d.dur;if(g>=1){e.splice(m,1);continue}d.follow&&(d.x+=l.x*h,d.y+=l.y*h,d.z+=l.z*h);const v=d.r0+(d.r1-d.r0)*(1-(1-g)**3);s.compose(i.set(d.x,d.y,d.z),c.identity(),r.set(v,v,v)),t.setMatrixAt(f,s),t.setColorAt(f++,u.setRGB(Math.min(1,(1-g)*1.6),d.seed,g))}t.count=f,f=0;for(let m=o.length-1;m>=0;m--){const d=o[m];if(d.t+=h,d.t>=d.life){o.splice(m,1);continue}d.vy-=16*h,d.x+=d.vx*h,d.y+=d.vy*h,d.z+=d.vz*h;const g=d.size*Math.min(1,(d.life-d.t)/.25);c.setFromAxisAngle(d.spin,d.t*9),s.compose(i.set(d.x,d.y,d.z),c,r.set(g,g*.7,g*1.2)),n.setMatrixAt(f,s),n.setColorAt(f++,d.color)}n.count=f;for(const m of[t,n])m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0)}}}const hn=90,ak=1.4,sk=`
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
}`,ik=`
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
}`;function ck(){const t=[0,1].map(()=>({p:Array.from({length:hn},()=>new _),age:new Float32Array(hn).fill(1)})),n=2*hn*2,e=new Float32Array(n*3),o=new Float32Array(n).fill(1),a=new Float32Array(n),s=[];for(let f=0;f<2;f++)for(let m=0;m<hn;m++){const d=(f*hn+m)*2;a[d]=-1,a[d+1]=1,m<hn-1&&s.push(d,d+1,d+2,d+1,d+3,d+2)}const c=new ht;c.setAttribute("position",new G(e,3)),c.setAttribute("aAge",new G(o,1)),c.setAttribute("aSide",new G(a,1)),c.setIndex(s);const i=new St({vertexShader:sk,fragmentShader:ik,uniforms:Ln.merge([_n.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:Nt,fog:!0}),r=new j(c,i);r.frustumCulled=!1,r.renderOrder=3;const u=new _,h=new _,l=new _;return{points:r,update(f,m,d,g){t.forEach((v,p)=>{for(let k=0;k<hn;k++)v.age[k]=Math.min(1,v.age[k]+m/ak);if(d&&m>0){const k=v.p.pop();v.p.unshift(k.copy(f[p])),v.age.copyWithin(1,0,hn-1),v.age[0]=0}for(let k=0;k<hn;k++){const b=v.p[k],w=v.p[Math.min(hn-1,k+1)];u.subVectors(b,w),u.lengthSq()<1e-6&&u.set(0,0,1),h.subVectors(g,b),l.crossVectors(u,h).normalize();const y=.06+.5*v.age[k],x=(p*hn+k)*2;e.set([b.x-l.x*y,b.y-l.y*y,b.z-l.z*y],x*3),e.set([b.x+l.x*y,b.y+l.y*y,b.z+l.z*y],(x+1)*3),o[x]=o[x+1]=v.age[k]}}),c.getAttribute("position").needsUpdate=!0,c.getAttribute("aAge").needsUpdate=!0}}}const me=120,rk=40,lk=120,hk=9,uk=30,uc=.11;function mk(){const t=new Float32Array(me*3),n=new Float32Array(me*6),e=new ht;e.setAttribute("position",new G(n,3));const o=new Float32Array(me*6);for(let f=0;f<me;f++)o.set([1,1,1,0,0,0],f*6);e.setAttribute("color",new G(o,3));const a=new ru({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:sn,depthWrite:!1,fog:!1}),s=new lu(e,a);s.frustumCulled=!1,s.renderOrder=5;let c=!1;const i=new _,r=new _,u=new _,h=new _,l=(f,m,d)=>{const g=rk+Math.random()*lk*d,v=hk+(1-Math.random()**2)*uk,p=Math.random()*Math.PI*2;h.copy(m).addScaledVector(i,g).addScaledVector(r,Math.cos(p)*v).addScaledVector(u,Math.sin(p)*v),t[f*3]=h.x,t[f*3+1]=h.y,t[f*3+2]=h.z};return{object:s,update(f,m,d){if(a.opacity=Math.min(.5,.42*d),s.visible=d>.02,e.setDrawRange(0,2*Math.round(me*Math.min(1,d))),!s.visible)return;const g=m.length();if(g<1)return;i.copy(m).divideScalar(g),r.set(i.z,0,-i.x).normalize(),u.crossVectors(r,i);const v=f.position;if(!c){for(let p=0;p<me;p++)l(p,v,1);c=!0}for(let p=0;p<me;p++){h.set(t[p*3]-v.x,t[p*3+1]-v.y,t[p*3+2]-v.z),(h.dot(i)<-4||h.lengthSq()>36100)&&l(p,v,1);const b=p*6,w=t[p*3],y=t[p*3+1],x=t[p*3+2];n[b]=w,n[b+1]=y,n[b+2]=x,n[b+3]=w-m.x*uc,n[b+4]=y-m.y*uc,n[b+5]=x-m.z*uc}e.attributes.position.needsUpdate=!0}}}const Ka=256,Hh=5,dk=-2e3,fk=400;function gk(t,n,e){let o=0;for(const[a,s]of[[1,41],[1.37,43]]){const c=Math.max(12,Math.round(2*Math.PI*e/((1800+700*n)*a))),i=t/(2*Math.PI)*c,r=Math.floor(i),u=.5+.3*(N(r,n,s)-.5),h=Math.max(0,1-Math.abs(i-r-u)*2.2),l=(220+140*n)*(.45+.55*N(r,n,s+1));o=Math.max(o,l*h*h*(3-2*h))}return o}const pk=`
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
}`,vk=`
#include <fog_pars_fragment>
uniform float uFar;
${wr}
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
}`;class yk{rings=[];next=0;heightAt;constructor(n,e,o){this.heightAt=e;for(let a=0;a<o.length-1;a++){const s=a/(o.length-2),c=new St({vertexShader:pk,fragmentShader:vk,uniforms:Ln.merge([_n.fog,{uFar:{value:.25+.6*s}}]),fog:!0});c.uniforms.uRegionHg=ro;const i=new j(new ht().setAttribute("position",new G(new Float32Array(3),3)),c);i.frustumCulled=!1,n.add(i),this.rings.push({inner:o[a],outer:o[a+1],mesh:i,anchorX:NaN,anchorZ:NaN})}}job=null;update(n,e,o=!1,a=3){const s=performance.now();for(;;){if(!this.job){const i=this.stale(n,e);if(!i)return;const r=(Ka+1)*2;this.job={ring:i,idx:this.rings.indexOf(i),ax:n,az:e,pos:new Float32Array(r*3),top:new Float32Array(r),s:0}}const c=this.job;for(;c.s<=Ka;)if(this.segment(c),!o&&performance.now()-s>a)return;this.commit(c),this.job=null}}pending(n,e){return this.rings.filter(o=>o===this.job?.ring||this.needs(o,n,e)).length}needs(n,e,o){return Number.isNaN(n.anchorX)||Math.hypot(e-n.anchorX,o-n.anchorZ)>fk}stale(n,e){if(!Number.isFinite(n+e))return null;for(let o=0;o<this.rings.length;o++){const a=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,this.needs(a,n,e))return a}return null}segment(n){const{ring:e,s:o}=n,a=o/Ka*Math.PI*2,s=Math.sin(a),c=Math.cos(a);let i=-1/0;for(let u=0;u<Hh;u++){const h=e.inner+(e.outer-e.inner)*u/Hh;i=Math.max(i,this.heightAt(n.ax+s*h,n.az+c*h))}lo()>.5&&(i+=gk(a,n.idx,e.inner));const r=e.inner;n.pos.set([s*r,i,c*r,s*r,dk,c*r],o*6),n.top[o*2]=i,n.top[o*2+1]=i,n.s++}commit(n){const e=[];for(let a=0;a<Ka;a++){const s=a*2;e.push(s,s+2,s+1,s+2,s+3,s+1)}const o=new ht;o.setAttribute("position",new G(n.pos,3)),o.setAttribute("aTop",new G(n.top,1)),o.setIndex(e),n.ring.mesh.geometry.dispose(),n.ring.mesh.geometry=o,n.ring.mesh.position.set(n.ax,0,n.az),n.ring.anchorX=n.ax,n.ring.anchorZ=n.az}}const Ro={h:0,s:0,lat:0,vil:0};function of(t,n,e,o,a){const s=o/a,c=a+3,i=new Float32Array(c*c),r=new Float32Array(c*c*3);for(let y=0;y<c;y++)for(let x=0;x<c;x++)t(n+(x-1)*s,e+(y-1)*s,Ro),i[y*c+x]=Ro.h,r.set([Ro.s,Ro.lat,Ro.vil],(y*c+x)*3);const u=(y,x)=>i[(x+1)*c+(y+1)],h=a+1,l=a*4,f=h*h+l,m=new Float32Array(f*3),d=new Float32Array(f*3),g=new Float32Array(f*3),v=(y,x,M,C)=>{g.set(r.subarray(((M+1)*c+(x+1))*3,((M+1)*c+(x+2))*3),y*3);const z=(u(x+1,M)-u(x-1,M))/(2*s),E=(u(x,M+1)-u(x,M-1))/(2*s),T=1/Math.hypot(z,1,E);m[y*3]=x*s,m[y*3+1]=u(x,M)-C,m[y*3+2]=M*s,d[y*3]=-z*T,d[y*3+1]=T,d[y*3+2]=-E*T};for(let y=0;y<h;y++)for(let x=0;x<h;x++)v(y*h+x,x,y,0);const p=[];for(let y=0;y<a;y++)p.push(y);for(let y=0;y<a;y++)p.push(y*h+a);for(let y=a;y>0;y--)p.push(a*h+y);for(let y=a;y>0;y--)p.push(y*h);const k=s*3+25;p.forEach((y,x)=>v(h*h+x,y%h,Math.floor(y/h),k));const b=[];for(let y=0;y<a;y++)for(let x=0;x<a;x++){const M=y*h+x;b.push(M,M+h,M+1,M+1,M+h,M+h+1)}for(let y=0;y<l;y++){const x=p[y],M=p[(y+1)%l],C=h*h+y,z=h*h+(y+1)%l;b.push(x,M,C,M,z,C)}const w=new ht;return w.setAttribute("position",new G(m,3)),w.setAttribute("normal",new G(d,3)),w.setAttribute("aTrack",new G(g,3)),w.setIndex(f>65535?new G(new Uint32Array(b),1):new G(new Uint16Array(b),1)),w.computeBoundingSphere(),w}class bk{cache=new Map;shown=new Set;home=null;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(n,e,o,a){this.scene=n,this.sample=e,this.material=o,this.cfg=a}update(n,e,o=!1,a=this.cfg.buildBudgetMs){this.computeWanted(n,e),this.home??=new Set(this.wanted.map(c=>c.key));const s=performance.now();for(const c of this.wanted)if(!this.cache.has(c.key)){if(!o&&performance.now()-s>a)return;this.cache.set(c.key,this.build(c))}this.shown.size===this.wanted.length&&this.wanted.every(c=>this.shown.has(c.key))||this.swap()}stats(){let n=0;for(const a of this.shown)n+=this.cache.get(a)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(a=>!this.cache.has(a.key)).length,o=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,wanted:this.wanted.length,vertices:n,reach:o}}computeWanted(n,e){const o=[];for(let s=0;s<this.cfg.levels;s++){const c=this.cfg.baseSize*2**s,i=Math.floor(n/(2*c)),r=Math.floor(e/(2*c)),u=Math.floor(n/c),h=Math.floor(e/c);for(let l=2*r-2;l<=2*r+3;l++)for(let f=2*i-2;f<=2*i+3;f++)s>0&&Math.abs(f-u)<=1&&Math.abs(l-h)<=1||o.push({key:`${s}:${f}:${l}`,level:s,ix:f,iz:l})}const a=o.map(s=>s.key).join("|");a!==this.wantedSig&&(this.wantedSig=a,this.wanted=o)}build(n){const e=this.cfg.baseSize*2**n.level,o=n.ix*e,a=n.iz*e,s=n.level>=2?this.cfg.farSegs:this.cfg.segs,c=new j(of(this.sample,o,a,e,s),this.material);return c.position.set(o,0,a),c.matrixAutoUpdate=!1,c.updateMatrix(),c}swap(){const n=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)n.has(e)||this.scene.remove(this.cache.get(e));for(const e of n)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,o]of this.cache)!n.has(e)&&!this.home?.has(e)&&(o.geometry.dispose(),this.cache.delete(e));this.shown=n}}const wk=`
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
`,xk=`
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
`,[Fh,Gh]=Lc,[Mk,kk]=Nm,Yn=t=>t.toFixed(1),Sk=`
uniform float uMistY;
vec3 mcValleyMist(vec3 col, vec3 mistCol, vec2 xz, float y, vec3 track) {
  // Pha theo s của nhánh gần nhất; ở đường phân thuỷ hai nhánh s nhảy nhưng |lat| ở đó lớn → hành lang đã tắt, không lộ mối.
  float ph = mod(track.x + ${Yn(Rt)}, ${Yn(ct)});
  float corridor = smoothstep(${Yn(Fh-40)}, ${Yn(Fh+40)}, ph) * (1.0 - smoothstep(${Yn(Gh-40)}, ${Yn(Gh+40)}, ph))
    * (1.0 - smoothstep(${Yn(Mk)}, ${Yn(kk)}, abs(track.y)));
  // Mép trên lên xuống ±15 m theo nhiễu 140 m, trên mặt mây ~15 m: phủ luôn chỗ mặt biển mây cắt bờ (đường dao — bẫy biển mây
  // 170 m). Đặc dần 45 m — mép cứng = vạch sơn quanh đồi theo đồng mức (bẫy dải mây ôm sườn Fansipan vòng 8).
  float top = uMistY + 15.0 + 30.0 * (gnNoise(xz / 140.0) - 0.5);
  float k = (1.0 - smoothstep(-45.0, 0.0, y - top)) * (1.0 - corridor);
  // Sáng / tối theo nhiễu 60 m: một màu phẳng thì nửa dưới khung thành tấm trắng không thước đo (giám khảo A mc8b). Phủ 0,94:
  // 0,88 còn lộ vân bậc ruộng mờ dưới mây = "giấy kẻ dòng" (mc8f).
  return mix(col, mistCol * mix(0.86, 1.08, gnNoise(xz / 60.0 + 4.7)), 0.94 * k);
}
`,Tk=`
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
`,Ak=`
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
`,Nk=`
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
${Ak}
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
`,Ck=`
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
`,zk=`
#include <fog_pars_fragment>
${re}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;
uniform float uWaterY;
uniform vec4 uDeck;

${wr}
${Nk}
${wk}
${Tk}
${xk}
${Sk}
${sw}
${fd}
${zm}
${Ck}

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
}`,Ek=`
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
}`,af={value:0};function Lk(t=1e9,n=!1){return new St({vertexShader:Ek,fragmentShader:zk,defines:im(n?{TERRAIN_LITE:1}:{}),uniforms:{...Ln.merge([_n.fog,{uMaxDist:{value:t}}]),...ws,uRegionHg:ro,uWaterY:br,uDeck:us,uMistY:sm,uTime:af},fog:!0})}const _k=6e3,$h=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function Rk(t,n){const e=Lk(_k,n.lite),o=new bk(t,Ec,e,{baseSize:n.baseSize,segs:n.segs,farSegs:n.farSegs,levels:n.levels,buildBudgetMs:5}),a=new yk(t,lt,$h);return{update(s,c,i){o.update(s.x,s.z,c,i),a.update(s.x,s.z,!1,i)},progress(s){const c=o.stats(),i=8;return{pending:c.pending+i*a.pending(s.x,s.z),wanted:c.wanted+i*$h.length-i}},warmups:()=>[new j(of(Ec,0,0,1,1),e)],statsLine(){const s=o.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const Oh=16,Dh=3,Io=1.8,Uh=2.2,Pn={x:0,v:0};function Ik(t,n,e,o){Pn.x=0,Pn.v=0;for(const a of t.obstacles){const s=Wt[a.kind],c=a.z-n;if(c+s.halfZ+1<0||c-s.halfZ>Oh)continue;const i=Math.min(1,Math.max(0,1-(c-s.halfZ)/Oh)),r=Ct(a.lane);let u=0,h=0;if(a.kind==="ridge")h=Math.max(0,s.hi+Dh-o);else if(a.kind==="bridge")o>s.lo-Io&&o<s.hi+Io&&(h=t.v<s.lo?s.lo-Io-o:s.hi+Io-o);else if(Math.abs(e-r)<s.halfX+Uh){const l=t.x-r;Math.abs(l)>=s.halfX?u=r+Math.sign(l)*(s.halfX+Uh)-e:a.kind==="spike"?h=Math.max(0,s.hi+Dh-o):a.kind==="overhang"&&(h=Math.min(0,s.lo-Io-o))}h>0?Pn.v=Math.max(Pn.v,h*i):h<0&&(Pn.v=Math.min(Pn.v,h*i)),Math.abs(u*i)>Math.abs(Pn.x)&&(Pn.x=u*i)}return Pn}function Pk(t,n,e){const o=Math.sin(e),a=Math.cos(e);return Math.max(lt(t,n),lt(t+4*o,n+4*a),lt(t+8*o,n+8*a))}const Bk={back:4,up:10,fov:70,look:18,lookDown:30},Hk={back:3,up:2.5,fov:66,look:1.5,lookDown:1.5},Fk=-8.5;function Gk(t){if(t.mode!=="run")return{top:0,side:0,level:0,rise:0};const n=J(t.z),e=$.plungeLevel?.(n)??0,o=Math.min(1,Math.max(0,(-vn(t.z+40)-.25)/.4));return{top:$.plungeTop?.(n)??0,side:$.plungeSide?.(n)??0,level:e,rise:e*o*o*(3-2*o)}}const $k={back:5,up:6,fov:64,look:40,lookDown:4},Ok=.4;function Dk(t,n,e){return t>0?t*Ok*Math.max(0,Y(n)-Y(e)):0}const kn={bankShare:0,bankCap:0,slideRoll:0,rollRate:0,trick:0,rollCap:0,shake:0,diveFov:0,boostFov:0};function Uk(t){const n=t.mode==="run"?Ls(fr(t.z,t.diff),46,64):0,e=(o,a)=>o+(a-o)*n;return kn.bankShare=e(.45,.25),kn.bankCap=e(.3,.16),kn.slideRoll=e(.0022,9e-4),kn.rollRate=e(3,1.8),kn.trick=e(1,.4),kn.rollCap=e(.6,.35),kn.shake=e(1,.5),kn.diveFov=e(4,1.5),kn.boostFov=9*pr(t),kn}function Ls(t,n,e){const o=Math.min(1,Math.max(0,(t-n)/(e-n)));return o*o*(3-2*o)}function Kk(t,n,e,o){const a=vn(t.z),s=Math.atan(Math.max(0,a));return{k:($.climbFrame??0)*o*Ls(a,.25,.7),cam:-n*Math.tan(.33*s),look:e*Math.tan(.55*s)}}class mc{x=0;v=0;out={x:0,vel:0};update(n,e,o,a){return a?(this.x=n,this.v=0,n):(vr(this.x,this.v,n,e,o,this.out),this.x=this.out.x,this.v=this.out.vel,this.x)}}function Vk(t,n){const e=.6*n,o=Math.abs(t);if(o<=e)return t;const a=n-e;return Math.sign(t)*(e+a*Math.tanh((o-e)/a))}const dc={camX:(t,n)=>Gn(t,7+6*n,12+8*n),lookX:(t,n)=>Gn(t,10+8*n,18+10*n),move:(t,n)=>Gn(t,11+6*n,18+10*n)},sf=t=>Math.min(1,Math.max(0,(1-t)/.25));class qk{key="";viewScale=1;apply(n,e,o){const a=sf(e);let s=o,c=1;if(e<1){const r=Math.min(64+60*(1-a),o*(1-.15*a))*Math.PI/180;c=1+.1*a,s=Math.min(118,2*Math.atan(Math.tan(r/2)*c/e)*180/Math.PI)}const i=`${s.toFixed(2)}|${c.toFixed(3)}|${e.toFixed(4)}`;i!==this.key&&(this.key=i,this.viewScale=c,n.fov=s,c>1.001?n.setViewOffset(e,c,0,0,e,1):(n.clearViewOffset(),n.aspect=e,n.updateProjectionMatrix()))}}const Wk={back:7.5,up:2.6+($.chaseTilt?.up??0),fov:58,look:34,lookDown:3.6+($.chaseTilt?.lookDown??0)},Yk={back:11,up:4.5,fov:70,look:60,lookDown:5},jk={back:6.5,up:2.2,fov:64,look:40,lookDown:4},Kh={back:13,up:4.5,fov:62,look:60,lookDown:6};function Oe(t,n,e){const o=(a,s)=>a+(s-a)*e;return{back:o(t.back,n.back),up:o(t.up,n.up),fov:o(t.fov,n.fov),look:o(t.look,n.look),lookDown:o(t.lookDown,n.lookDown)}}class Xk{rig={...Kh};fx=new mc;flook=new mc;fmv=new mc;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;g=1;sideK=0;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lens=new qk;constructor(n){this.camera=n,this.aspect=Number.isFinite(n.aspect)&&n.aspect>0?n.aspect:16/9}setAspect(n){Number.isFinite(n)&&n>0&&(this.aspect=n,this.lens.apply(this.camera,this.aspect,this.rig.fov))}get viewScale(){return this.lens.viewScale}shake(n){this.shakeA=Math.max(this.shakeA,n)}update(n,e,o,a,s=!1){const c=Math.min(1,Math.max(0,(n.speed-42)/22)),i=n.mode==="run"?_u(n.z):0,r=Lt=>s?1:1-Math.exp(-o*Lt),u=Uk(n),h=i>0?Math.max(.4,Math.min(2,Wg(n.z,n.speed))):1;this.g+=(1+(h-1)*i-this.g)*r(3);const l=Math.max(0,this.g-1),f=Math.max(0,1-this.g),m=sf(this.aspect);let d=n.mode==="ready"?Kh:Oe(Oe(Wk,jk,qg(n.z)),Yk,Vg(n.z)*(1-.8*m));const g=Gk(n);this.sideK+=(g.side-this.sideK)*r(2),d=Oe(Oe(Oe(d,Bk,g.top),$k,g.rise),Hk,this.sideK),d={...d,fov:d.fov+10*c+.5*Math.max(0,n.surge)+.34*n.tailwind+(n.vert==="dive"?u.diveFov:0)+(n.thermalT>0?8:0)+u.boostFov-2.5*l+5*f+10*g.level,up:d.up-.8*l},n.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=Oe(this.rig,d,r(2.4));const v=this.fmv.update(n.v-n.thermalV-n.windLift,dc.move(n.pace,m),o,s),p=n.low&&n.vert==="cruise",k=v<0;this.fv+=((p?1:k?.6+.2*m:.45)-this.fv)*r(p?3:10),this.fl+=((p?1:k?.9:.35)-this.fl)*r(p?3:10);const b=n.speed*vn(n.z),w=b>0?$.climbCam??0:0;this.lag+=(5*(1-.7*m)*(1-w)*(1-.8*g.level)*Math.tanh(-b/40)*i-this.lag)*r(3);const y=this.fx.update(n.x*(.55+.3*m),dc.camX(n.pace,m),o,s),x=n.x+Vk(y-n.x,1.6+20*(1-m)),M=x-y,C=n.mode==="run"?Math.max(-u.bankCap,Math.min(u.bankCap,u.bankShare*Lu(n.z,n.speed))):0;this.roll+=(C-e*u.slideRoll-this.roll)*(s?1:1-Math.exp(-o*u.rollRate)),this.shakeA=Math.max(0,this.shakeA-o*2.5);const z=n.mode==="crash"||n.mode==="over",E=this.rig.back*(1-.12*m)-.3*m*Math.max(0,this.rig.back-7.5),T=n.z-E*(z?1.6:1);this.s=T;const A=this.camera,S=this.shakeA*u.shake,L=Math.max(0,Y(T)-Y(n.z))*.7*Math.max(m,g.level)-Math.max(0,Y(n.z)-Y(T))*($.climbCam??0)*i,P=Kk(n,E,this.rig.look,i),B=this.rig.up+.6*m-L,U=B+P.k*(Y(n.z)-Y(T)+P.cam-B)+n.thermalV*.8+n.windLift*.85+v*this.fv+this.lag+(z?4:0),W=Ik(n,T,x,U);this.clrX=Math.abs(W.x)>=Math.abs(this.clrX)?W.x:this.clrX+(W.x-this.clrX)*r(5),this.clrV=Math.abs(W.v)>=Math.abs(this.clrV)?W.v:this.clrV+(W.v-this.clrV)*r(5);const X=D(T,x+this.clrX+Fk*this.sideK,U+this.clrV,this.tmp);A.position.set(X.x+S*Math.sin(a*37.1),Math.max(X.y,Pk(X.x,X.z,zt(T))+3)+S*Math.sin(a*41.3+2),X.z),this.crashK+=((z?1:0)-this.crashK)*r(4);const Z=n.z+this.rig.look*(1-.75*this.crashK),V=.6*n.speed,et=(Y(Z+V)-Y(Z)-vn(Z)*V)*i,mt=J(n.z),tt=Math.tan(.14)*this.rig.look*Ls(mt,$.edge-20,$.edge+80)*(1-Ls(mt,$.pullOut-80,$.pullOut))*i*(1-g.level)-Dk(g.level,n.z,Z),wt=this.flook.update(n.x,dc.lookX(n.pace,m),o,s),Mt=et-this.rig.lookDown-tt,At=Mt+P.k*(Y(n.z)-Y(Z)+P.look-Mt);D(Z,(wt+(n.x-wt)*this.sideK)*(.4+.2*m+(.6-.2*m)*this.sideK)+M,n.thermalV*.8+n.windLift*.85+v*this.fl+At-tf(n)*this.crashK,this.tmp),A.up.set(0,1,0),A.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),A.rotateZ(Math.max(-u.rollCap,Math.min(u.rollCap,this.roll+this.trickRoll*u.trick))),this.lens.apply(this.camera,this.aspect,this.rig.fov)}}const Vh=globalThis.scheduler;function _s(){return Vh?.yield?Vh.yield():new Promise(t=>{const n=new MessageChannel;n.port1.onmessage=()=>t(),n.port2.postMessage(0)})}const Zk=()=>new ht().setAttribute("position",new G(new Float32Array(3),3));function tr(t,n,e,o,a){const s=t.getRenderTarget();t.setRenderTarget(a);try{return t.compileAsync(n,e,o)}finally{t.setRenderTarget(s)}}async function Qk(t){const{renderer:n,scene:e,camera:o}=t,a=[];let s=performance.now();const c=async()=>{performance.now()-s<12||(await _s(),s=performance.now())};for(const h of[...e.children,...t.extras])h.isLight||(a.push(tr(n,h,o,e,t.post.sceneTarget)),await c());const i=Zk();for(const h of t.post.quads){const l=new j(i,h.material);a.push(tr(n,l,o,l,h.toScreen?null:t.post.sceneTarget))}let r=0;for(const h of a)h.then(()=>t.onProgress(++r/a.length*.8));await Promise.all(a);const u=n.info.programs??[];for(let h=0;h<u.length;h++)u[h].getUniforms(),u[h].getAttributes(),performance.now()-s>10&&t.onProgress(.8+.2*(h+1)/u.length),await c();t.onProgress(1)}function Jk(t,n,e,o,a){return tr(t,n,o,e,a.sceneTarget).then(()=>{n.traverse(s=>{const c=s.material;for(const i of Array.isArray(c)?c:c?[c]:[])t.properties.get(i).currentProgram?.getUniforms()})})}const qh=.18,Wh={world:.55,shaders:.45},Yh=.4,t4=6e3,n4=.9,e4=200,o4=4e3,Ze=document.getElementById("boot"),Uo=Ze?.querySelector(".bar i")??null,fc=Ze?.querySelector("p")??null,Jn={world:0,shaders:0};let jh=0,nr=0,gc=0,cf=0;function a4(t){return Jn.shaders>=1?1:Yh*Jn.shaders+(1-Yh)*n4*(1-Math.exp(-(t-nr)/t4))}function Xh(){const t=performance.now();Jn.world>=1&&!gc&&(gc=t);const n=Jn.world<1?"Dựng núi đồi…":Jn.shaders>=1?"Sắp xong…":t-gc<o4?"Chuẩn bị đồ hoạ…":"Chuẩn bị đồ hoạ — lần đầu hơi lâu…";fc&&fc.textContent!==n&&(fc.textContent=n);const e=qh+(1-qh)*(Jn.world*Wh.world+a4(t)*Wh.shaders);!Uo||e<=jh||(jh=e,Uo.style.animation="none",Uo.style.width=`${(e*100).toFixed(1)}%`,Ze?.setAttribute("aria-valuenow",String(Math.round(e*100))))}function Zh(t,n){Jn[t]=Math.max(Jn[t],Math.min(1,n)),nr||(nr=performance.now(),cf=window.setInterval(Xh,e4)),Xh()}function s4(){window.clearInterval(cf),performance.mark("skyrun:ready"),Xf(),document.documentElement.dataset.boot="ready",Ze&&(Uo&&(Uo.style.width="100%"),Ze.classList.add("done"),setTimeout(()=>Ze.remove(),600))}const i4=22;function c4(t){let n=!0;return{held:()=>n,shaders:e=>Qk({renderer:t.renderer,scene:t.scene,camera:t.camera,post:t.post.warmPlan(),extras:t.extras(),onProgress:e}),async world(e){try{for(;;){t.world.update(t.camera.position,!1,i4);const{pending:o,wanted:a}=t.world.progress(t.camera.position);if(e(a?1-o/a:1),o===0)break;await _s()}t.world.update(t.camera.position,!0)}finally{n=!1}}}}async function r4(t,n,e){try{await _s(),n(0,!0),await _s();const o=t.bootShaders(a=>Zh("shaders",a));await t.bootWorld(a=>Zh("world",a)),performance.mark("skyrun:world"),n(0,!0),await o,performance.mark("skyrun:shaders")}catch(o){console.error("[sky-run] khoi dong theo lat hong — vao game luon",o)}e(),s4()}const pc=new it;function l4(t,n,e,o){let a=o;return{sunDir:()=>a,apply(s,c){Rb(t,s,c),a=Nb(o,s,c);const i=R(.55,1,s);n.position.set(a.x*1e3,Math.max(a.y,.35*i)*1e3,a.z*1e3),n.color.copy(Di("sunLight",s,pc,c)),n.intensity=2.4*(1-.7*i),e.color.copy(Di("skyAmbient",s,pc,c)),e.groundColor.copy(Di("bounce",s,pc,c)),e.intensity=1.3*(1+.35*i)}}}const Va={x:-.32,y:.1,z:1};function h4(t,n){const{renderer:e,scene:o,camera:a,sun:s,hemi:c}=WM(t,n.maxDpr);_b(o,Va);const i=l4(o,s,c,Va),r=XM(Va),u=Rk(o,n.terrain),h=Av(n.foliage),l=h5(n.ambient),f=aw(),m=Fb(n.ambient),d={x:0,y:0,z:0},g={x:0,y:0,z:0},v=$.cloudDecks?D2($.cloudDecks,n.name!=="high"):p2(n.name!=="high"),p=nb(),k=ub(),b=db(),w=pb(),y=Sb(),x=TM(),M=Rw(n.ambient),C=Kx(n.ambient),z=EM();jf(OM(z,n.name==="high",pt=>Jk(e,pt,o,a,V.warmPlan())));const E=IM(),T=ck(),A=V5(n.name==="low"),S=UM(),L=mk(),P=tw(),B=qb(),U=Yb(),W=tk(),X=ok(),Z=mw();o.add(r.mesh,h.group,l.group,f.mesh,p.group,k.group,b.group,w.mesh,y.group,v.mesh,m.mesh,C.group,x.group,M.group,z.root,T.points,S.mesh,L.object,P.mesh,B.group,U.mesh,W.mesh,W.star,W.shell,X.stars,X.chips,Z.points,A.mesh);const V=qM(e,o,a,Va,n.post),et=new Xk(a),mt=c4({renderer:e,scene:o,camera:a,post:V,world:u,extras:()=>[...u.warmups(),...SM(),tb()]});iw(n.ambient>=1?12:n.ambient>=.7?9:6);const tt=[new _,new _],wt=[new _,new _],Mt=new _,At=new yn,Lt={};let xn=null;return{renderer:e,scene:o,camera:a,post:V,cam:et,lanterns:M,flashes:W,impacts:X,world:u,bootShaders:mt.shaders,bootWorld:mt.world,ghosts:B,trick:E.trick,pilot:z.root,present(pt,nt,Jt,mo,cn=!1){const{dusk:dt,morn:fo}=mo;pt.mode==="crash"||pt.mode==="over"?xn??=pt.z:xn=null;let K=pt;xn!==null&&pt.z>xn+.4&&(K=Object.assign(Lt,pt),K.z=xn+.4),i.apply(dt,fo),E.apply(z,K,nt,Jt),U.update(z.root.position,K.stunT/I.stunTime,nt,a),et.trickRoll=E.camRoll(),et.update(K,E.lateralSpeed(),Jt,nt,cn),r.update(a,nt,dt,fo),af.value=nt,mt.held()||u.update(a.position,cn),h.update(K.z,dt,a),l.update(K.z,dt),f.update(K.z),cw(),Z.update(K,nt,dt,et.s),$.cloudDecks||m.update(K.z),v.update(a,nt,et.s,K),V.setVeil(v.veil(),Math.min(1,Math.max(0,(dt-.45)/.4))),rv(z.root.position.x,z.root.position.z,zt(K.z),nt),D(K.z+1,K.x,K.v,d),D(K.z,K.x,K.v,g);const ni=K.mode==="run"?K.speed:0;d.x=(d.x-g.x)*ni,d.y=(d.y-g.y)*ni,d.z=(d.z-g.z)*ni,W.update(Jt,d),X.update(Jt,d);const Sf=K.mode==="run"&&K.hp===1?.14+.08*Math.sin(nt*5.5):0;V.setDanger(Math.max(X.danger(),Sf,K.mode==="crash"?.55:K.mode==="over"?.25:0)),x.update(K,nt,dt),p.update(K.z),k.update(et.s,nt,dt),b.update(K.z,nt),w.update(et.s),C.update(et.s,nt,dt),y.update(K.z),M.update(K,nt,Jt,dt,et.s),rw(Math.min(1,Math.max(0,(dt-.45)/.4))),P.update(K,nt,et.s),z.root.updateMatrixWorld(),z.feet.forEach((ai,si)=>ai.getWorldPosition(tt[si])),T.update(tt,Jt,K.mode==="run"||K.mode==="ready",a.position),z.ankles.forEach((ai,si)=>ai.getWorldPosition(wt[si])),A.update(K,wt,nt,Jt,a.position);const Tf=K.mode==="run"||K.mode==="ready";S.update(z.tips,nt,Tf,Math.min(1,Math.max(0,(K.speed-40)/26)+(K.vert==="dive"?.4:0)),a.position);const t0=K.stunT/I.stunTime;nf.value=Math.max(t0*t0*(.6+.4*Math.sin(nt*28)),K.mode==="run"&&K.hp===1?.18+.12*Math.sin(nt*5.5):0);const n0=zt(K.z);Mt.set(Math.sin(n0),vn(K.z),Math.cos(n0)).normalize().multiplyScalar(K.speed);const ei=Math.min(1,Math.max(0,(K.speed-40)/26)),e0=K.mode==="run"?$.dropFx?.(J(K.z))??0:0,oi=K.mode==="run"?Math.max(0,K.surge)/12+K.tailwind/16+1.2*e0:0,Af=1-.45*Math.min(1,Math.max(0,(dt-.5)/.4));return L.update(a,Mt,K.mode==="run"?Af*(.1+.4*ei+.55*oi+(K.thermalT>0?.35:0)+.5*Math.min(1,K.boostT/I.boostFade)):0),V.setSpeed(K.mode==="run"?.05*ei+.16*oi+(K.vert==="dive"?.04:0)+(K.thermalT>0?.1:0)+.1*Math.min(1,K.boostT/I.boostFade):0,e0),V.setSun(i.sunDir(),1-Math.min(1,dt*1.6)),M.setViewport(e.getDrawingBufferSize(At).y*et.viewScale,a.fov),B.setViewport(At.y*et.viewScale,a.fov),Z.setViewport(At.y*et.viewScale,a.fov),Math.min(1.4,ei+.5*oi)},resize(pt,nt){e.setSize(pt,nt),V.setSize(pt,nt),et.setAspect(pt/nt)}}}function u4(){const t={z:0,x:0,v:0,thermalV:0,windLift:0},n={};return{capture(e){t.z=e.z,t.x=e.x,t.v=e.v,t.thermalV=e.thermalV,t.windLift=e.windLift},view(e,o){if(o>=1)return e;const a=(s,c)=>s+(c-s)*o;return Object.assign(n,e),n.z=a(t.z,e.z),n.x=a(t.x,e.x),n.v=a(t.v,e.v),n.thermalV=a(t.thermalV,e.thermalV),n.windLift=a(t.windLift,e.windLift),n}}}const rf=`skyrun.tut.${Bt}`,m4=2e3,d4=.7,f4=.45,g4=.3,p4=.15;function v4(){try{return new Set(JSON.parse(localStorage.getItem(rf)??"[]"))}catch{return new Set}}function y4(t){const n=t.obstacles.filter(l=>!l.passed&&l.z-t.z>-Wt[l.kind].halfZ);if(!n.length)return null;const e=n.reduce((l,f)=>f.z<l.z?f:l),o=n.filter(l=>l.row===e.row),a=e.kind;if(t.thermalV>8&&a!=="pillar")return null;if(o.some(l=>l.kind==="bridge"))return t.vert==="dive"||t.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(o.some(l=>l.kind==="ridge"))return t.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const s=new Set(o.map(l=>l.lane));if(!s.has(t.lane))return null;const c=o.filter(l=>l.lane===t.lane),i=c.every(l=>l.kind==="spike");if(i&&t.vert==="flare")return null;const r=c.every(l=>l.kind==="overhang");if(r&&(t.vert==="dive"||t.low))return null;const u=[];return[-1,0,1].some(l=>l<t.lane&&!s.has(l))&&u.push("left"),[-1,0,1].some(l=>l>t.lane&&!s.has(l))&&u.push("right"),i&&u.push("up"),r&&u.push("down"),{lesson:u.length===1&&i?"up":u.length===1&&r?"down":"lane",kind:c[0].kind,accept:u,row:e.row,z:e.z}}const Qh={left:"←",right:"→",up:"↑",down:"↓"};function b4(t,n){const e=n?new Set:v4(),o=matchMedia("(pointer: coarse)").matches,a=document.createElement("div");a.className=o?"tut touch":"tut",t.appendChild(a);let s=null,c=1;const i=(u,h)=>{const l=u.accept.filter(k=>u.lesson!=="lane"||k!=="up"&&k!=="down"),f=ee(u.z),m=u.kind==="bridge"?f?"chui qua cổng làng":qs(u.z)?"chui dưới cabin":"chui dưới cầu":u.kind==="overhang"?"chui dưới mái đá":u.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":u.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",d=l.length===1?l[0]==="left"?"sang trái":"sang phải":"sang trái / phải",g=u.lesson==="lane"?`ngón ${d}`:u.lesson==="up"?"lên":"xuống",v=o?`${u.lesson==="lane"?"Kéo":"Vuốt"} ${g} để ${m}`:`Bấm ${l.map(k=>Qh[k]).join(" / ")} để ${m}`,p=u.lesson==="lane"?O.dragSide:u.lesson==="up"?O.swipeUp:O.swipeDown;a.classList.toggle("flip",h>0),a.innerHTML=`<div class="tut-text">${o?p:""}<span>${v}</span></div><div class="tut-arrows">${l.map(k=>`<span class="tut-arrow ${k}">${Qh[k]}</span>`).join("")}</div>`,a.classList.add("on")},r=u=>{e.add(u);try{localStorage.setItem(rf,JSON.stringify([...e]))}catch{}};return{frozen:()=>s!==null&&c===0,update(u,h){if(u.mode!=="run"||e.size===3)return s=null,a.classList.remove("on"),c=1,1;const l=y4(u);if(s&&(!l||l.row!==s.row)&&(r(s.lesson),s=null,a.classList.remove("on")),!s&&l&&!e.has(l.lesson)&&u.z<m4){const d=(u.obstacles.find(g=>g.row===l.row).z-u.z)/u.speed;d<=d4&&d>=f4&&(s=l,i(l,u.lane))}else s&&l&&(s=l);const f=s!==null&&u.buffered!==null&&s.accept.includes(u.buffered);return c=s&&!f?Math.max(0,c-h/g4):Math.min(1,c+h/p4),c},offer(u){const h=s?u.find(l=>s.accept.includes(l)):void 0;return h?(c=.4,h):null}}}const er=`skyrun.progress.s${Je}`,or="skyrun.meters",ar="skyrun.runBest",lf="skyrun.played",hf="skyrun.unlockSeen",Jh=Je,sr=t=>Math.floor(t).toLocaleString("vi-VN"),qa=t=>(Math.floor(t/100)/10).toLocaleString("vi-VN"),uf=new Map;function Yr(t,n){try{return JSON.parse(uf.get(t)??localStorage.getItem(t)??n)}catch{return JSON.parse(n)}}function jr(t,n){const e=JSON.stringify(n);uf.set(t,e);try{localStorage.setItem(t,e)}catch{}}function Qe(t){const n=Yr(t,"{}");return n&&typeof n=="object"?n:{}}const vc=(t,n)=>jr(t,n),w4=t=>Qe(er)[t]??0,mf=t=>Qe(or)[t]??0,x4=t=>Qe(ar)[t]??0;function Xr(t){const n=[];return t.run!==void 0&&n.push({label:"Bay một ván",met:`Bay một ván ${qa(t.run)} km`,have:x4(t.from),need:t.run,fmt:e=>`${qa(e)} km`}),t.score!==void 0&&n.push({label:`Điểm mùa ${Jh}`,met:`${sr(t.score)} điểm mùa ${Jh}`,have:w4(t.from),need:t.score,fmt:sr}),t.meters!==void 0&&n.push({label:"Tổng quãng bay",met:`${qa(t.meters)} km tổng quãng bay`,have:mf(t.from),need:t.meters,fmt:e=>`${qa(e)} km`}),n}const M4=t=>!!t.unlock&&Xr(t.unlock).some(n=>n.have>=n.need);function k4(){const t=Yr(lf,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n in Yt):[]}function S4(){const t=Yr(hf,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}function df(t){const n=S4();t.some(e=>!n.includes(e))&&jr(hf,[...new Set([...n,...t])])}function Zr(t){df(t.filter(e=>Yt[e].unlock&&!M4(Yt[e])));const n=k4();t.some(e=>!n.includes(e))&&jr(lf,[...new Set([...n,...t])])}function T4(){try{const t=localStorage,n=Object.keys(Yt).filter(e=>mf(e)>0||t.getItem(`skyrun.best.${e}`));Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")&&n.push("khau-pha"),Zr(n)}catch{}}T4();function ti(t){return!!t.listed}const A4=()=>Object.values(Yt).filter(t=>!ti(t));function ff(t){const n=A4(),e=Qe(er),o=Qe(or),a=Qe(ar);return t(e,o,a),vc(er,e),vc(or,o),vc(ar,a),n.filter(s=>ti(s))}const Ko=(t,n,e)=>{Number.isFinite(e)&&e>(t[n]??0)&&(t[n]=Math.floor(e))},N4=(t,n,e)=>(Number.isFinite(e)&&e>0&&Zr([t]),ff((o,a,s)=>{Ko(o,t,n),Ko(s,t,e),Number.isFinite(e)&&e>0&&(a[t]=Math.floor((a[t]??0)+e))}));function tu(t){return Zr(Object.keys(Yt).filter(n=>(t.meters[n]??0)>0)),ff((n,e,o)=>{for(const a of Object.keys(Yt))typeof t.score[a]=="number"&&Ko(n,a,t.score[a]),typeof t.meters[a]=="number"&&Ko(e,a,t.meters[a]),typeof t.run?.[a]=="number"&&Ko(o,a,t.run[a])})}function nu(){return[]}function C4(t){df([t])}const z4=16e5,E4=2e4;function L4(t){const n=Fs(t)[0]?.file,e=Eu(t),o=e.zoneNames?Yu.filter(a=>Object.values(e.zoneLines??{}).includes(a)):ju;return[...n?[n]:[],...o.map(Xu)]}const Rs=new Map,Is=new Set;function _4(t){Is.add(t)}const gf=t=>Rs.get(t)?.p??null,R4=()=>[...Rs.values()].map(t=>t.p).find(t=>!t.done)??null;async function I4(t,n,e){try{const o=await fetch(t,{priority:"low"});n(Number(o.headers.get("content-length"))||0);const a=o.body?.getReader();if(!o.ok||!a)return;for(;;){const{done:s,value:c}=await a.read();if(s)return;e(c.byteLength)}}catch{n(0)}}function pf(t){const n=Rs.get(t);if(n)return n.done;const e=L4(t),o=e.map((i,r)=>r===0&&Fs(t)[0]?z4:E4);let a=0;const s={p:{frac:0,done:!1},done:Promise.resolve()},c=(i=!1)=>{const r=o.reduce((u,h)=>u+h,0);s.p={frac:i?1:Math.max(s.p.frac,Math.min(.99,a/r)),done:i};for(const u of Is)u(t,s.p)};return s.done=Promise.all(e.map((i,r)=>I4(i,u=>{u>0&&(o[r]=u),c()},u=>{a+=u,c()}))).then(()=>c(!0)),Rs.set(t,s),c(),s.done}function P4(t,n=12e3){let e=0,o=()=>{};const a=s=>{s===t&&(clearTimeout(e),e=window.setTimeout(o,n))};return new Promise(s=>{o=s,Is.add(a),a(t),pf(t).then(s)}).finally(()=>{clearTimeout(e),Is.delete(a)})}function eu(){navigator.connection?.saveData||Promise.all([dr,vu()]).then(async()=>{for(const t of Object.values(Yt))t.id!==Bt&&ti(t)&&await pf(t.id)})}const Qr=t=>t.frac,Jr=t=>`Đang tải ${Math.floor(t.frac*100)}%`;function B4(t){const n=gf(t);return!n||n.done?"":`<span class="pc-pack" data-pack="${t}" style="--f:${Qr(n).toFixed(3)}"><i></i><small>${Jr(n)}</small></span>`}function H4(t,n,e){const o=t.querySelector(`.pc-pack[data-pack="${n}"]`);o&&e.done?o.remove():o&&(o.style.setProperty("--f",Qr(e).toFixed(3)),o.querySelector("small").textContent=Jr(e)),vf(t)}function vf(t){const n=R4();for(const e of t.querySelectorAll("[data-lobby]"))e.classList.toggle("packing",!!n),n&&e.style.setProperty("--pack",Qr(n).toFixed(3))}const ou=t=>{const n=gf(t);return n?Jr(n):"Đang tải…"},yf={1:"Dễ",2:"Trung bình",3:"Hơi khó",4:"Khó"},$n={"mu-cang-chai":{difficulty:1,newbie:!0,moments:[{icon:"terrace",text:"Ruộng bậc thang",at:"valley"},{icon:"river",text:"Theo suối Nậm Kim",at:"river"},{icon:"thermal",text:"Vòng đồi Mâm Xôi",at:"climb"}]},"khau-pha":{difficulty:2,moments:[{icon:"gorge",text:"Khe đá uốn lượn",at:"gorge"},{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"house",text:"Làng mái ngói",at:"valley"}]},"ha-giang":{difficulty:3,moments:[{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"river",text:"Sát mặt sông",at:"river"},{icon:"cave",text:"Chui hang",at:"cave"},{icon:"thermal",text:"Leo cột gió",at:"climb"}]},fansipan:{difficulty:4,moments:[{icon:"dive",text:"Rơi {dive} m",at:"drop"},{icon:"cloud",text:"Xuyên tầng mây",at:"gorge"},{icon:"river",text:"Suối trong mưa",at:"river"},{icon:"sun",text:"Trên biển mây",at:"valley"}]}},F4={},G4=Object.keys($n).sort((t,n)=>$n[t].difficulty-$n[n].difficulty);function yc(t){const n=Yt[t];return n.listed?n:null}const Po=120,$4=340,au=18,O4=84,su=new Map;function bf(t){const n=su.get(t);if(n)return n;const{cycle:e,offset:o}=Yt[t],a=Eu(t),s=[],c=new Map,i=new Set;let r=0;for(let m=0;m<=Po;m++)r=Math.min(r,a.dive((o+m/Po*e)%e));let u=0,h=[];for(let m=0;m<=Po;m++){const d=(o+m/Po*e)%e,g=a.dive(d)-r;u=Math.max(u,g),s.push([m/Po*100,au+(O4-au)*Math.min(1,g/$4)]);const v=[a.zone(d,!1),...a.drop(d)>.5?["drop"]:[]];for(const p of v){if(i.has(p))continue;const k=c.get(p);k?k[1]=m:c.set(p,[m,m])}for(const p of h)!v.includes(p)&&c.has(p)&&i.add(p);h=v}const l=new Map;for(const[m,[d,g]]of c)l.set(m,s[Math.round((d+g)/2)]);const f={pts:s,dive:Math.round(u/10)*10,anchors:l};return su.set(t,f),f}const wf=t=>yf[$n[t].difficulty];function xf(t){const n=$n[t].difficulty;return`<span class="pc-diff lv${n}"><span class="pc-pips">${"<i></i>".repeat(4)}</span>${yf[n]}</span>`}const Mf=t=>$n[t].newbie?`<span class="pc-badge newbie">${O.star}Hợp người mới</span>`:"";function D4(t){const n=bf(t),e=n.pts.map(([a,s],c)=>`${c?"L":"M"}${a.toFixed(1)} ${s.toFixed(1)}`).join(""),o=$n[t].moments.map(a=>{const s=a.at&&n.anchors.get(a.at);return s?`<span class="pc-mark" style="left:${s[0].toFixed(1)}%;top:${s[1].toFixed(1)}%">${O[a.icon]}</span>`:""}).join("");return`<span class="pc-flight" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="area" d="${e}L100 100L0 100Z"/><path class="glow" d="${e}"/><path class="line" d="${e}"/></svg>${o}</span>`}function kf(t){const n=$n[t].moments.some(e=>e.text.includes("{dive}"))?bf(t).dive:0;return`<span class="pc-moments">${$n[t].moments.map(e=>`<span>${O[e.icon]}${e.text.replace("{dive}",n.toLocaleString("vi-VN"))}</span>`).join("")}</span>`}const ir=21,iu=2*Math.PI*ir;function U4(t,n,e,o){const a=Math.min(n,e),s=e>0?a/e:1;return`<span class="pc-ring${s>=1?" done":""}"><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="bg" cx="25" cy="25" r="${ir}"/><circle class="arc" cx="25" cy="25" r="${ir}" stroke-dasharray="${iu.toFixed(1)}" stroke-dashoffset="${(iu*(1-s)).toFixed(1)}"/></svg><b>${Math.floor(s*100)}%</b><small>${t}<br>${o(a)} / ${o(e)}</small></span>`}function K4(t,n){const e=n==="locked"?null:Pr(t.id),o=n==="current"?`<span class="pc-badge">${O.wingsuit}Đang bay</span>`:n==="fresh"?`<span class="pc-badge fresh">${O.star}Mới mở!</span>`:Mf(t.id),a=n==="locked"?t.unlock:null,s=a?Xr(a):[],c=s.length===1?`${s[0].met} ở ${Yt[a.from].name} để mở`:`Mở khi đạt 1 trong ${s.length} ở ${a?Yt[a.from].name:""}`,i=a?`<span class="pc-goals"><span class="pc-goal-head">${c}</span><span class="pc-rings">`+s.map(r=>U4(r.label,r.have,r.need,r.fmt)).join('<i class="pc-or">hoặc</i>')+"</span></span>":"";return`<button type="button" class="postcard ${n} map-${t.region}" data-map="${t.id}" aria-label="${t.name}, độ khó ${wf(t.id)}" title="${t.tagline}">
    <span class="pc-art" style="background-image:url(ui/map-${t.id}.webp)">${D4(t.id)}${n==="locked"?`<span class="pc-lock">${O.lock}</span>`:""}${xf(t.id)}</span>
    <span class="pc-body">${o}<b class="pc-name">${t.name}</b>${kf(t.id)}
      ${e&&e.m>0?`<span class="ui-chip gold pc-best">${O.trophy}<span>Kỷ lục ${sr(e.m)} m</span></span>`:""}${i}${n==="locked"?"":B4(t.id)}</span>
  </button>`}function V4(t){const{name:n,tagline:e}=F4[t]??{name:t,tagline:""};return`<div class="postcard soon" data-soon="${t}" role="button" aria-disabled="true" tabindex="-1" aria-label="${n}, độ khó ${wf(t)}, sắp có" title="${e}">
    <span class="pc-art ink">${O.mountain}<span class="ui-stamp">Sắp có</span>${xf(t)}</span>
    <span class="pc-body">${Mf(t)}<b class="pc-name">${n}</b>${kf(t)}</span>
  </div>`}const q4=[[12,.1,30],[26,.7,22],[72,.3,34],[86,.9,24],[50,1.3,20]];function W4(t,n,e){C4(n.id);const o=n.unlock,a=o?Xr(o).find(h=>h.have>=h.need)?.met??"":"",s=document.createElement("div");s.className="unlock-pop",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`Đã mở khoá ${n.name}`),s.innerHTML=`<div class="unlock-sky" aria-hidden="true">${q4.map(([h,l,f])=>`<i style="left:${h}%;animation-delay:${l}s;width:${f}px;height:${f}px">${O.lantern}</i>`).join("")}</div>
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
    </div>`,Zt(s);const c=s.querySelector("[data-go]"),i=s.querySelector("[data-later]"),r=()=>s.remove();s.addEventListener("click",h=>{h.stopPropagation();const l=h.target instanceof Element?h.target:null;l?.closest("[data-go]")?(r(),e(n)):(l===s||l?.closest("[data-later]"))&&r()});const u=h=>{if(!s.isConnected)return void window.removeEventListener("keydown",u,!0);if(h.key==="Escape")i.click();else if(h.key==="Enter"||h.key===" ")(document.activeElement===i?i:c).click();else return;h.stopPropagation(),h.preventDefault()};window.addEventListener("keydown",u,!0),t.appendChild(s)}const Y4=".unlock-pop, .board-panel:not([hidden]), .settings-panel:not([hidden]), .help-panel:not([hidden])";function j4(t){try{localStorage.setItem(wc,t.id)}catch{}const n=new URLSearchParams(location.search);n.set("map",t.id),history.replaceState(history.state,"",`${location.pathname}?${n.toString()}${location.hash}`),location.reload()}function X4(t,n){const e=document.createElement("div");e.className="lobby-panel",e.hidden=!0,e.innerHTML=`<div class="lobby-card ui-indigo ui-trim" role="dialog" aria-label="Sảnh chọn map">
      <div class="panel-head">${O.mountain}<b>Chọn map</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="lobby-scroll"><div class="lobby-track" data-track></div><div class="lobby-dots" data-dots></div></div>
      <button type="button" class="ui-btn-lacquer lobby-go" data-go></button>
    </div>`,t.appendChild(e),Zt(e);const o=e.querySelector("[data-track]"),a=e.querySelector("[data-dots]"),s=e.querySelector("[data-go]");let c=[],i,r=Bt,u=0,h=null;const l=y=>y.id===Bt?"current":ti(y)?c.includes(y)?"fresh":"open":"locked",f=()=>[...o.querySelectorAll(".postcard")],m=()=>{f().forEach((C,z)=>{const E=(C.dataset.map??C.dataset.soon)===r;C.classList.toggle("selected",E),a.children[z]?.classList.toggle("on",E)});const x=r===Bt?gt:yc(r),M=x?l(x):"soon";s.disabled=M==="locked"||M==="soon"||!!h,s.innerHTML=h?ou(h.id):M==="locked"?`${O.lock}Chưa mở khoá`:M==="soon"?"Sắp có":`${O.check}Chọn ${x.name}`},d=(y,x)=>{o.scrollTo({left:y.offsetLeft-(o.clientWidth-y.offsetWidth)/2,behavior:x?"smooth":"auto"})},g=()=>{o.innerHTML=G4.map(y=>{const x=yc(y);return x?K4(x,l(x)):V4(y)}).join(""),a.innerHTML=f().map(()=>"<i></i>").join(""),m()},v=()=>{const y=r===Bt?gt:yc(r);!y||s.disabled||(y.id===Bt?k():p(y))},p=y=>{h||(h=y,m(),P4(y.id).then(()=>{h===y&&!e.hidden&&j4(y)}))};_4((y,x)=>{H4(t,y,x),h?.id===y&&!x.done&&(s.innerHTML=ou(y))}),eu();const k=()=>{e.hidden=!0,h&&(h=null,m())};e.addEventListener("click",y=>{const x=y.target instanceof Element?y.target:null;if(x===e||x?.closest("[data-close]"))return k();if(x?.closest("[data-go]"))return v();const M=x?.closest(".postcard");if(!M)return;const C=M.dataset.map??M.dataset.soon;if(C===r)return v();r=C,m(),d(M,!0)}),o.addEventListener("scroll",()=>{clearTimeout(u),u=window.setTimeout(()=>{const y=o.scrollLeft+o.clientWidth/2,x=f().reduce((C,z)=>Math.abs(z.offsetLeft+z.offsetWidth/2-y)<Math.abs(C.offsetLeft+C.offsetWidth/2-y)?z:C),M=x.dataset.map??x.dataset.soon;M!==r&&o.scrollWidth>o.clientWidth+4&&(r=M,m())},140)},{passive:!0}),window.addEventListener("keydown",y=>{y.code==="Escape"&&!e.hidden&&k()}),window.addEventListener("keydown",y=>{e.hidden||y.code!=="Space"&&y.code!=="Enter"||t.querySelector(Y4)||(y.stopImmediatePropagation(),y.preventDefault(),v())},!0);const b=()=>{const y=nu().length>0||c.length>0;for(const x of t.querySelectorAll("[data-lobby]"))x.classList.toggle("has-news",y);vf(t)},w=(y=[])=>{y.length&&(c=[...new Set([...c,...y])],eu()),e.hidden||g(),b()};return{open(){const y=nu()[0];r=c[0]?.id??y?.id??Bt,g(),e.hidden=!1;const x=f().find(M=>M.dataset.map===r);x&&requestAnimationFrame(()=>d(x,!1)),y&&!t.querySelector(".unlock-pop")&&W4(t,y,p),c=[],b(),n?.().then(M=>M.length&&w(M))},setScreen(y){y!==i&&(i=y,y?b():k())},refresh:w}}function Z4(){let t=null;return n=>{if(!$.zoneNames||n.mode!=="run")return t=null,null;const e=n.z+n.speed*1.5,o=$.zone(J(e),ee(e));return o===t?null:(t=o,$.zoneNames[o]?o:null)}}const jn=1/60;function Q4(t){const n=new URLSearchParams(location.search),e=o3(n),o=h4(t,e),{renderer:a,post:s}=o,c=_5(),i=g3(t),r=q5(t,o.cam,o.lanterns,c,i,o.flashes,o.impacts,o.camera),u=M3(t,()=>p.mode==="run"&&!L.paused(),()=>p.steerX),h=l3(Number(n.get("seed")??0));let l=h();const f=Np(n);let m=n.get("auto")==="1",d=m||n.has("z");const g=Z4(),v=n.has("alt");let p=di(l.seed,v);p.z=Number(n.get("z")??0);let k=0,b=null;const w=u4();w.capture(p);const y=b4(t,n.get("tut")==="1"),x=(V,et=!1,mt=1)=>{const tt=f.at(p.z),wt=w.view(p,mt),Mt=o.present(wt,k-jn*(1-mt),V,tt,et);A.present(p,wt,mt,V),i.update(p,tt),i.setPilotBox(p.mode==="run"?Il(o.pilot,o.camera,t):null),c.update(Mt,p.mode==="run",tt);const At=g(p);At&&(i.zone(At),c.zone(At));const Lt=z.visible();E.setScreen(Lt),T.setScreen(Lt)},M=()=>{Z===null||p.mode==="run"||p.mode==="crash"||t.querySelector(".unlock-pop")||(p.mode==="over"&&(l=h()),p=di(l.seed,v),d=m||n.has("z"),p.z=Number(n.get("z")??0),w.capture(p),x(0,!0),Z1(p),A.runStart(p,l.route),b=null,c.runStart(),z.hide(),i.setVisible(!0))},C=()=>{l=h(),p=di(l.seed,v),p.z=Number(n.get("z")??0),d=m||n.has("z"),b=null,w.capture(p),x(0,!0),z.showTitle(),i.setVisible(!1)},z=Dy(t,M,()=>{z.visible()==="over"&&C(),E.open()}),E=X4(t,async()=>{const V=await A.progress();return V?tu(V):[]}),T=I5(t),A=xy({root:t,params:n,hud:i,screens:z,view:o.ghosts,camera:o.camera,route:l.route,quality:()=>({tier:e.name,scale:Z?.scale??1}),rv:v?2:gt.logRvBase+sd});A.progress().then(V=>V&&E.refresh(tu(V)));const S=My(t,c),L=Sy(t,S.el,{touch:matchMedia("(pointer: coarse)").matches,onHome:()=>(A.runAbandon(p),C(),E.open())});Vy(t,S,c,o.ghosts,L),u.onAction(V=>{L.paused()?L.resume():z.visible()&&z.tapReady()?M():V==="Space"&&L.pause()}),u.onKey("KeyM",()=>S.toggle("sfx")),u.onKey("KeyN",()=>S.toggle("music")),u.onKey("KeyH",()=>i.setVisible(t.querySelector(".hud.hidden")!==null)),u.onTrick(o.trick),z.showTitle(),i.setVisible(!1);const P=V=>{w.capture(p),J1(p,m?mg(p):V,u.holdDown(),jn,m?null:u.steer()),A.afterStep(p,m),r.handle(p.events,p);for(const et of p.events)et.type==="crash"&&(b=et.kind);k+=jn,p.mode==="over"&&!z.visible()&&(!d&&!p.alt&&E.refresh(N4(gt.id,xe(p),p.z)),c.over(z.showOver(p,b,!d&&!p.alt),p.z),A.runOver(p,b),i.setVisible(!1))};let B=0;const U=V=>{L.setRunning(p.mode==="run",p.mode==="crash");const et=(p.mode==="crash"&&p.crashT<.9?.35:1)*L.factor(V)*(m?1:y.update(p,V));if(y.frozen()&&!L.paused()){const mt=u.take(),tt=u.steer(),wt=tt===null?p.lane:Ku(p.lane,tt),Mt=y.offer(wt!==p.lane?[...mt,wt<p.lane?"left":"right"]:mt);Mt&&P(mt.includes(Mt)?[Mt]:[])}for(B+=V*et;B>=jn;)P(u.take()),B-=jn;x(V*et,!1,B/jn)},W=()=>o.resize(t.clientWidth,t.clientHeight);window.addEventListener("resize",W),W();const X=()=>H5(a,s,{state:()=>p,advance(V){for(let et=0;et<V/jn;et++)P(u.take()),x(jn)},play(V,et=60){for(let mt=0;mt<V*et;mt++)U(1/et)},autopilot(V){m=V,V&&(d=!0)},jump(V){d=!0,p.z=V,p.nextChunkZ=V+200,p.obstacles=[],p.pickups=[],w.capture(p),x(0,!0)},dusk:f.forceDusk,clock:f.forceU,render:()=>{x(0),s.render()},pilotBox:()=>Il(o.pilot,o.camera,t),hurt(){p.mode!=="run"||p.hp<=1||(p.hp--,r.handle([{type:"hurt",hp:p.hp,kind:"pillar"}],p))}},o);let Z=null;r4(o,x,()=>{Z=i3({renderer:a,post:s,tier:e,resize:W,tick:U,stats:n.has("stats")?V=>i.setStats(V):null,worldLine:()=>o.world.statsLine()}),window.__skyrunQuality={tier:e,governor:Z},X()})}Sp(gt.region);document.title=`Sky Run · ${om[gt.region]}`;Q4(document.getElementById("app"));Qf();
