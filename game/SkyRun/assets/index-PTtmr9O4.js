import{B as ht,a as F,M as X,P as _n,V as L,S as Tt,D as zt,F as Su,U as Rn,b as In,c as tn,d as ys,I as Wf,e as Sr,f as bs,g as Yf,C as fa,L as Tu,h as Au,G as wt,i as ct,j as Hn,k as B,m as At,l as ie,n as ue,o as me,p as ws,q as Nu,r as Pt,s as zu,Q as xt,t as it,u as Xt,v as bt,w as Tr,x as Cu,T as Ar,y as Nr,A as rn,z as Je,E as _c,H as zr,J as Xf,K as Sa,N as Eu,O as Lu,R as jf,W as Pu,X as Zf,Y as Jf,Z as _u,_ as po,$ as Qf,a0 as tg,a1 as ng,a2 as eg,a3 as b0,a4 as og,a5 as w0,a6 as ag,a7 as x0,a8 as sg,a9 as ig,aa as cg,ab as rg,ac as lg,ad as hg,ae as ug,af as mg}from"./three-Ch2HMgvo.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const dg=6e3,Cr=[];function fg(t){return Cr.push(t),t}const Er=new Promise(t=>{const n=()=>{Promise.allSettled(Cr).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>t(),{timeout:1500}):setTimeout(t,100)})};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0}),setTimeout(t,dg)}),Ru=()=>Promise.allSettled(Cr).then(()=>{});let Iu=()=>{};const Hu=new Promise(t=>Iu=t),gg=()=>Iu(),pg=t=>fetch(t,{priority:"low"}).then(n=>n.ok?n.arrayBuffer():null).catch(()=>null);function vg(){const t=window.SR_SW,n=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!t||!n||!("serviceWorker"in navigator)||Er.then(()=>navigator.serviceWorker.register(t).catch(e=>console.warn("[skyrun] sw",e)))}const M0=400,ta=t=>Math.max(0,Math.min(1,t));function js(t,n,e){let o=0;for(;o<t.length-1&&n>t[o+1][0];)o++;const a=t[o],s=t[Math.min(o+1,t.length-1)];return a[e]+(s[e]-a[e])*(s[0]>a[0]?ta((n-a[0])/(s[0]-a[0])):1)}function vo(t,n){if(n.curve)return js(n.curve,t,1);const e=n.d0??0,o=n.hardAt??5e3;return t<=o?e+(1-e)*ta((t-M0)/(o-M0)):1+.15*ta((t-o)/3e3)}function yg(t,n){return n.curve?js(n.curve,t,2):n.tighten??1}function bg(t,n){return n.curve?js(n.curve,t,4):kg(vo(t,n))}const wg=[0,.12,.3,.5,.75,1.2];function xg(t){let n=0;return wg.forEach((e,o)=>{t>=e&&(n=o)}),n}function Mg(t){return Math.max(-.2,.35-.55*t)}function kg(t){return t<=1?1-.28*ta((t-.3)/.7):.72-.06*ta((t-1)/.15)}const Sg=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function Tg(t,n){return t<.5||n%2===0}const _={laneGap:6,laneTime:.2,laneOmega:30,laneOmegaChill:16,laneEaseChill:20,handling:{fast:1,mid:22/30,soft:16/30},steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,vertOmegaInChill:14,vertEaseInChill:18,vertOmegaOutChill:8,vertEaseOutChill:12,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,climbRush:40,climbRushIn:.8,climbRushOut:2,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,gateRadiusX:2.6,gateTailwind:10,gateScore:40,maxHp:2,reactWindow:1,shieldMinGap:3e3,shieldMaxGap:4200,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,wishLanternMul:10,wishGateV:4,wishPickV:5.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2,boostTime:5,boostMulMin:1.35,boostMulMax:1.8,boostFade:1.2,boostScoreMul:2},co=2;function St(t){return-t*_.laneGap}function ga(t,n){return n.curve?js(n.curve,Math.max(0,t),3):Ag(vo(t,n))}function Ag(t){const n=Math.min(1,t);return _.speedStart+(_.speedMax-_.speedStart)*(1-(1-n)*(1-n))}const jt={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function na(t,n,e,o){const a=jt[t.kind];return Math.abs(o)>a.halfZ||Math.abs(n-St(t.lane))>=a.halfX+_.hitHalfWidth?!1:e-_.hitHalfHeight<a.hi&&e+_.hitHalfHeight>a.lo}function Ng(t,n,e){return Math.abs(n-St(t.lane))>=jt[t.kind].halfX+_.hitHalfWidth?!0:e==="flare"?t.kind==="spike"||t.kind==="ridge":e==="dive"?t.kind==="bridge"||t.kind==="overhang":!1}function zg(t,n){return t.z+jt[t.kind].halfZ<n}const Cg=[_.flareHeight,0,-5.5],Eg=0,Gu=1,Lg=2;function qo(t,n,e){return!t.some(o=>na(o,St(n),Cg[e],0))}function Pg(t){const n=[];for(let e=-1;e<=1;e++)for(let o=0;o<3;o++)qo(t,e,o)&&n.push({lane:e,tier:o});return n}function k0(t){return Pg(t).length}function xi(t,n,e){return e?t.some(o=>(o.kind==="pillar"||o.kind==="overhang")&&o.lane===n)?"none":"any":qo(t,n,Gu)?"any":qo(t,n,Eg)?"high":qo(t,n,Lg)?"low":"none"}const _g={lane:1,vert:1.5};function Rg(t,n,e,o,a,s=_g){const c=(n[0].z-t.z)/t.speed,i=t.thermalT>c?_.thermalHeight-(_.thermalHeight-t.thermalV)*Math.exp(-2.5*c):0,r=t.thermalV>8||i>11,l=t.low&&!r,u=g=>{const p=xi(n,g,r);if(p==="none")return 1/0;const v=p==="any"?0:p==="low"&&l?.3:s.vert;return(g===t.lane?0:Math.abs(g-t.lane)*s.lane)+v+(e&&xi(e,g,r)==="none"?.6:0)},h=[-1,0,1].filter(g=>u(g)<1/0).sort((g,p)=>u(g)-u(p))[0];if(h===void 0)return c<o+.12&&t.vert!=="flare"?["up"]:[];const f=xi(n,h,r);if(h===t.lane&&f==="any")return null;const m=[],d=a&&h===t.lane&&t.pickups.some(g=>!g.taken&&g.lane===t.lane&&g.z>t.z&&g.z<n[0].z&&(f==="low"?g.v<-2:g.v>2)&&(g.z-t.z)/t.speed<.2);if(f==="high"){const g=t.vert!=="flare"||t.vertT>=_.vertIn+_.vertHold;(c<o+.12+(l?.06:0)||d)&&g&&m.push("up")}else f==="low"&&(c<o+.12||d)&&((t.alt?t.low:t.vert==="dive"&&t.vertT<_.vertIn+_.vertHold)||m.push("down"));if(h!==t.lane){const g=o+(Math.abs(h-t.lane)-1)*_.laneTime*1.3;c<=g&&m.push(h<t.lane?"left":"right")}return m}function Bu(t,n){const e=new Map;for(const o of t.obstacles){const a=o.z-t.z;if(o.passed||a<-jt[o.kind].halfZ||a>n)continue;const s=e.get(o.row)??[];s.push(o),e.set(o.row,s)}return[...e.values()].sort((o,a)=>o[0].z-a[0].z)}function S0(t){return new Set(t.filter(n=>n.kind==="pillar"||n.kind==="spike"||n.kind==="overhang").map(n=>n.lane))}function Ig(t,n=.27,e=!0,o){if(t.mode!=="run")return[];const a=Bu(t,t.speed*2.2),s=a[0],c=i=>e?Gg(t,i):[];return s?Rg(t,s,a[1],n,e,o)??c(s):Hg(t)??c()}function Hg(t){const n=t.gusts.find(a=>!a.taken&&!a.missed&&a.z+a.len>t.z),e=t.gates.find(a=>!a.hit&&!a.missed&&a.z>t.z);if(e&&(e.z-t.z<t.speed*.45||e.z-t.z<t.speed*1.5&&(!n||e.z<Math.max(n.z,t.z))))return e.lane===t.lane||t.laneT<1?[]:[e.lane<t.lane?"left":"right"];if(!n||n.z-t.z>t.speed*1.5)return null;if(n.lane!==t.lane)return t.laneT<1?[]:[n.lane<t.lane?"left":"right"];const o=(n.z-t.z)/t.speed;return $u(t,n.v,o)?["up"]:o>.25?[]:n.v>2&&t.vert!=="flare"?["up"]:n.v<-2&&!Fu(t)?["down"]:[]}function Fu(t){return t.alt?t.low:t.vert==="dive"}function $u(t,n,e){return t.alt&&t.low&&t.vert==="cruise"&&Math.abs(n)<=2&&e<.9}function Gg(t,n){const e=t.pickups.find(c=>!c.taken&&c.kind==="lantern"&&c.lane===t.lane&&c.z>t.z);if(e&&t.thermalV<2){const c=(e.z-t.z)/t.speed;if($u(t,e.v,c))return["up"];if(e.v>2&&t.vert!=="flare"&&c<.2)return["up"];if(e.v<-2&&!Fu(t)&&c<.2)return["down"]}const o=t.pickups.find(c=>!c.taken&&c.z-t.z>t.speed*.35&&c.z-t.z<t.speed*1.2);if(!o||o.lane===t.lane||t.laneT<1)return[];const a=o.lane<t.lane?-1:1;return n&&S0(n).has(t.lane+a)?[]:Bu(t,o.z-t.z).some(c=>S0(c).has(t.lane+a))?[]:[a<0?"left":"right"]}const Bg=["mu-cang-chai","khau-pha","ha-giang","fansipan"],Rc="skyrun.map";function Fg(t){const n=["khau-pha","ha-giang"],e=s=>{try{return JSON.parse(t.getItem(s)??"null")}catch{return null}},o=e("skyrun.meters"),a=e("skyrun.played");return n.some(s=>typeof o?.[s]=="number"&&o[s]>0||!!t.getItem(`skyrun.best.${s}`)||Array.isArray(a)&&a.includes(s))||Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")}function Mi(t){return Bg.find(n=>n===t)??null}function $g(){const t=globalThis;if(t.location){const e=Mi(new URLSearchParams(t.location.search).get("map"));if(e)return e;let o="mu-cang-chai";try{const a=t.localStorage;if(!a)return o;const s=Mi(a.getItem(Rc));if(s)return s;o=Fg(a)?"khau-pha":"mu-cang-chai";try{a.setItem(Rc,o)}catch{}}catch{}return o}const n=t.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return Mi(n??t.process?.env?.SKYRUN_MAP)??"khau-pha"}const Gt=$g();function Ta(t,n,e){let o=Math.imul(t,374761393)^Math.imul(n,668265263)^Math.imul(e+1,2246822519);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function T0(t){return t*t*t*(t*(t*6-15)+10)}function C(t,n,e){const o=Math.floor(t),a=Math.floor(n),s=T0(t-o),c=T0(n-a),i=Ta(o,a,e),r=Ta(o+1,a,e),l=Ta(o,a+1,e),u=Ta(o+1,a+1,e);return i+(r-i)*s+(l-i)*c+(i-r-l+u)*s*c}function Ft(t,n,e,o){let a=0,s=1,c=0,i=1;for(let r=0;r<e;r++)a+=C(t*i,n*i,o+r*31)*s,c+=s,s*=.5,i*=2.03;return a/c}function Ic(t,n,e,o){let a=0,s=1,c=0,i=1,r=1;for(let l=0;l<e;l++){const u=1-Math.abs(C(t*i,n*i,o+l*17)*2-1),h=u*u*r;r=Math.min(1,h*1.6),a+=h*s,c+=s,s*=.5,i*=2.1}return a/c}function En(t){return t<0?0:t>1?1:t}function R(t,n,e){const o=En((e-t)/(n-t));return o*o*(3-2*o)}function W(t,n,e){return t+(n-t)*e}const Og=[[0,.08,.6,42,1],[400,.08,.6,42,1],[3040,.32,.7,52,.88],[6140,.58,.85,58,.78],[9240,.73,.95,61,.7],[10440,.74,1,62,.68],[10640,.95,1.5,67,.6],[19740,1.12,1.9,69,.55],[19940,1.25,2.3,73,.5],[25e3,1.35,2.6,75,.49]],Dg=["Khởi động","Tăng tốc!","Về đích — thử thách!"],Kg=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],Ug=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],Vg=[[430,100,270],[1520,-100,270],[2280,40,300],[2560,-40,300]],qg=[[690,90,260],[1098.4,-90,260],[1880,30,320],[2090,-30,320],[3300,-90,260]],Zt={"mu-cang-chai":{id:"mu-cang-chai",name:"Mù Cang Chải",tagline:"Thả mình từ đỉnh đồi, men sườn ruộng bậc thang, băng thung lũng Nậm Kim.",region:"mu-cang-chai",listed:!0,cycle:3100,offset:60,dayCycles:3,dayCutPhase:1200,dayTitles:Dg,arcs:Vg,profile:{curve:Og,boostTop:103,shieldMaxGap:3400,villagePillars:!0},routePrefix:"mc",routeVersion:7,online:!0,logRvBase:2e3,unlock:null},"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",listed:!0,cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:Kg,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:{from:"mu-cang-chai",run:1e4,meters:2e4}},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",listed:!0,cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:Ug,profile:{d0:.2,hardAt:5e3,tighten:1.4},routePrefix:"hg",routeVersion:3,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}},fansipan:{id:"fansipan",name:"Fansipan",tagline:"Nhảy khỏi nóc nhà Đông Dương, lao xuyên hai tầng mây, lướt trên biển mây.",region:"fansipan",listed:!0,cycle:4100,offset:20,dayCycles:2,dayCutPhase:500,arcs:qg,profile:{d0:.35,hardAt:3600,tighten:1.5,shieldMaxGap:3800},routePrefix:"fp",routeVersion:1,online:!0,logRvBase:3e3,unlock:{from:"ha-giang",score:16e3,meters:39e3}}},gt=Zt[Gt],lt=gt.cycle,Ht=gt.offset,Wt=1100,Ou=1320,Hc=2450,Du=2700,Wg=150,To=1480,Aa=1770,Yg=[320,640,930];function Xg(t){let n=0;for(const e of Yg)n=Math.max(n,1-R(0,70,Math.abs(t-e)));return n}function A0(t){return t<Wt?0:t<Hc?R(Wt,Ou,t):1-R(Hc,Du,t)}const jg={edge:Wt,pullOut:To,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:A0,dive(t){const n=R(Wt+40,Wt+380,t)-R(Hc-650,Du-60,t);return Wg*n},sill(t){return R(760,940,t)*(1-R(1092,1108,t))},village(t,n){return n%2!==0?0:R(1600,1720,t)*(1-R(2380,2500,t))},halfWidth(t){const n=W(64,30,t<Wt?Xg(t):0);return W(n,430,A0(t))},extraDepth:()=>0,reveal(t){return En(R(To-20,To+60,t)*(1-R(1640,1760,t)))},drop(t){return R(Wt-25,Wt+10,t)*(1-R(To-40,To+20,t))},clean(t){return R(Wt-40,Wt-10,t)*(1-R(1600,1690,t))},zone(t,n){return t<Wt-60?"gorge":t<Ou?"mouth":n?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},Ao=300,No=680,N0=2320,Zg=2880,qt=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function Ku(t,n,e,o){if(t<=n)return 0;if(t>=e)return 1;const a=e-n,s=1/(a-o),c=t-n;return c<o?s*c*c/(2*o):c>a-o?1-s*(a-c)**2/(2*o):s*(c-o/2)}function Jg(t){const n=Math.min(1,Math.max(0,(t-N0)/(Zg-N0)))**1.5;return n*n*(3-2*n)}function ki(t){return 1-.65*R(400,680,t)+.2*R(1500,1750,t)+.45*R(2350,2700,t)}function Qg(t){return W(140,220,R(1500,1750,t))}function t1(t){return 1-R(350,650,t)+R(2650,2950,t)}function n1(t){return 410+60*R(400,680,t)-27*R(1500,1750,t)-33*R(2700,3200,t)}function e1(t){return t<600?-80:t<760?W(-80,-118,R(600,760,t)):t<1480?W(-118,-218,Ku(t,760,1480,80)):t<2380?-218:t<4e3?W(-218,100,R(2380,2530,t)):W(100,-80,R(4e3,4100,t))}const o1={level:e1,cover:t=>1-.4*qt(t,1760,2300,60)},a1={level:()=>-350,cover:t=>qt(t,700,2560,60),eye:{phase:1660,radius:130,swirl:3.2}},s1={edge:Ao,pullOut:No,archPhases:[],caves:[],tower:{phase:2640,latMin:90,latMax:250,mirror:!0},openness:ki,dive(t){return-150+300*R(Ao+10,No,t)+100*Ku(t,760,1480,80)+180*R(1510,1740,t)-580*Jg(t)},sill(t){return R(1700,1760,t)*(1-R(2300,2360,t))},village(){return 0},halfWidth(t){return W(Qg(t),W(430,1100,t1(t)),ki(t))},extraDepth(t){return Math.max(0,n1(t)-W(150,240,ki(t)))},reveal(t){return qt(t,2800,3200,60)},drop(t){return qt(t,Ao-10,No-10,30)+qt(t,1500,1730,25)},clean(t){return qt(t,Ao-25,No+50,25)+qt(t,1465,1815,20)+qt(t,2315,3150,20)},road(){return 0},roadDepth(){return 0},cloud(t){return 1-.45*qt(t,720,1480,60)-.9*qt(t,1720,2330,60)},cloudDecks:[o1,a1],landmarks:[{kind:"chop-fansipan",phase:70,lat:26,drop:6}],cableLine:{from:700,to:1490,clear:38},rain:t=>qt(t,1700,2360,70),waterLevel:-443,lanternScale:2.4,skyLanternFloor:90,hazardBeacons:!0,pilotRollMax:.85,sunGlare:.55,chaseTilt:{up:.9,lookDown:2},climbCam:.8,climbFrame:1,windRibbon:{width:.45,minAngle:.0045},speedBlur:.3,plungeTop:t=>qt(t,340,500,40)+qt(t,1530,1700,35),plungeSide:t=>qt(t,560,630,35),zoneNames:{rim:"Đỉnh Fansipan",dive:"Rơi tự do",gorge:"Cáp treo giữa hai tầng mây",river:"Suối Mường Hoa",climb:"Cột gió nhiệt",valley:"Biển mây Hoàng Liên",mouth:"Mắt xoáy mây"},zoneLines:{rim:"dinh-fansipan",dive:"xuyen-may",gorge:"cap-treo",mouth:"mat-xoay-may",river:"suoi-muong-hoa",climb:"troi-khoi-may",valley:"bien-may"},zone(t){return t<Ao?"rim":t<No?"dive":t<1500?"gorge":t<1750?"mouth":t<2300?"river":t<2810?"climb":t<4e3?"valley":"rim"}},fe=600,Na=1060,Uu=320,i1=Uu+13;function Si(t){return R(2230,2420,t)*(1-R(3420,3520,t))}function c1(t){if(t<300)return W(30,170,R(0,140,t));let n=170;return n=W(n,110,R(900,1150,t)),n=W(n,60,R(2200,2260,t)),W(n,30,R(3440,3520,t))}const r1={edge:fe,pullOut:Na,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:Si,dive(t){return Uu*(R(fe+20,Na,t)-R(2215,2740,t))},sill(t){return R(1040,1120,t)*(1-R(2205,2260,t))},village(t){return R(2800,2900,t)*(1-R(3380,3480,t))},halfWidth(t){return W(c1(t),430,Si(t))},extraDepth(t){if(t<2200)return 190*R(20,160,t);const n=i1-W(150,240,Si(t));return W(190,n,R(2200,2260,t))*(1-R(2760,2900,t))},reveal(t){return R(2190,2270,t)*(1-R(2560,2700,t))},drop(t){return R(fe-25,fe+10,t)*(1-R(Na-40,Na+20,t))},clean(t){return R(fe-40,fe-10,t)*(1-R(1100,1160,t))+R(2200,2230,t)*(1-R(2700,2760,t))},road(t){return R(60,220,t)*(1-R(1700,1860,t))},roadDepth(t){return 55+28*Math.sin(t/170)+12*Math.sin(t/61+1.3)},cloud(t){return 1-R(-1,120,t)*(1-R(2250,2600,t))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zoneLines:{rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},zone(t){return t<fe?"rim":t<1100?"dive":t<1900?"river":t<2200?"cave":t<2750?"climb":t<3500?"village":"gate"}},Et=180,Nn=430,Dn=905,ss=1075,is=1400,ea=2e3,Se=2500,$t=(t,n,e,o)=>R(n-o,n,t)*(1-R(e,e+o,t));function Gc(t){return 140*R(Et,Nn,t)+30*En((t-Nn)/(850-Nn))+60*R(Dn,ss,t)-90*R(1100,1380,t)+40*R(is,1520,t)+25*En((t-1540)/450)-205*R(2520,3080,t)}const z0=370,Wo=t=>R(Dn,Dn+15,t)*(1-R(1330,1510,t)),Bc=360,cs=t=>R(Et+10,Et+30,t)*(1-R(Bc-20,Bc+30,t)),C0=t=>$t(t,480,860,60)+$t(t,1500,1960,60);function l1(t){const n=16*R(Et-45,Et,t)**2;let e=W(9.5+n,z0-Gc(t),R(Et,Et+16,t));return e=W(e,17,R(Bc,540,t)),e=W(e,z0-Gc(t),Wo(t)),e=W(e,9.5,R(ea-40,ea+40,t)),W(e,12,R(Se-20,Se+40,t)*(1-R(3e3,3090,t)))}function Vu(t){const n=W(12,30,Math.max(Wo(t),cs(t)));return W(n,60,$t(t,ea+20,Se-20,40))}const h1={shelf:l1,bench:Vu,hill:C0,peak:t=>t<1200?130:140,rise:t=>W(220,100,C0(t)),fall:t=>W(110,140,$t(t,ea+20,Se-20,40)),wall:t=>R(Et-15,Et+65,t)*(1-R(460,490,t)),wallRef:()=>665,wallTop:t=>W(9.5,40,R(Et,Nn,t)),wallLip:t=>20+83*R(Et,Et+50,t)-55*R(Et+140,Nn,t),crown:t=>1-R(Et-15,Et+15,t)+R(2990,3070,t),mist:t=>1-R(Dn-150,Dn-20,t)+R(Se,Se+150,t)},u1={hillside:h1,edge:Et,pullOut:Nn,archPhases:[],caves:[],tower:{phase:1800,latMin:90,latMax:250,mirror:!0},openness:()=>1,dive:Gc,sill:()=>0,village:t=>1-Math.max(Wo(t),cs(t)),halfWidth:t=>Vu(t)+34+120*Math.max(Wo(t),cs(t)),extraDepth:()=>120,reveal:t=>En(1-R(60,110,t)+$t(t,440,560,30)+$t(t,1100,1360,40)+R(2950,3050,t)),drop:t=>$t(t,Et-5,Nn-30,25)+.7*$t(t,Dn,ss-30,20)+.6*$t(t,is,1500,20),plungeLevel:t=>$t(t,Et+5,Nn-20,30)+.7*$t(t,Dn+5,ss-20,20),dropFx:t=>$t(t,Et,Nn-60,20)+.8*$t(t,Dn,ss-20,15)+.5*$t(t,is,1500,20),climbRush:t=>$t(t,1110,1340,40),clean(t){return Math.max(1-R(500,550,t),R(860,890,t)*(1-R(1580,1610,t)),R(2940,2970,t))},road:()=>0,roadDepth:()=>0,cloud:t=>1-.6*Math.max(Wo(t),cs(t)),cloudDepth:300,speedBlur:.45,sunGlare:.35,pilotRollMax:.7,splitS:!1,chaseTilt:{up:.6,lookDown:1.2},climbCam:.8,steadyCam:{fovKnee:6,fovMax:14,lookRate:6},zoneNames:{rim:"Đỉnh La Pán Tẩn",dive:"Thả mình xuống thung",valley:"Ruộng bậc thang La Pán Tẩn",river:"Thung lũng Nậm Kim",climb:"Đồi Mâm Xôi",village:"Bản Dế Xu Phình",gate:"Dốc đá về đỉnh"},zone(t){return t<Et?"rim":t<Nn?"dive":t<Dn?"valley":t<is?"river":t<ea?"climb":t<Se?"village":"gate"}},qu={"mu-cang-chai":u1,"khau-pha":jg,"ha-giang":r1,fansipan:s1},$=qu[Gt],Wu=t=>qu[t],bn=2*lt,cn=Ht;function Le(t,n){if(t.k===0)return{x:t.x+n*Math.sin(t.th),z:t.z+n*Math.cos(t.th),th:t.th};const e=t.th+t.k*n;return{x:t.x+(Math.cos(t.th)-Math.cos(e))/t.k,z:t.z+(Math.sin(e)-Math.sin(t.th))/t.k,th:e}}function E0(t,n){const e=[];let o=0,a=0,s=n,c=0;const i=(r,l)=>{if(r<.5)return;const u={k:l,x:o,z:a,th:s},h=Le(u,r),f=Le(u,r/2),m=Math.max(Math.hypot(f.x-o,f.z-a),Math.hypot(f.x-h.x,f.z-h.z));e.push({u0:c,len:r,k:l,x:o,z:a,th:s,bx:f.x,bz:f.z,br:m}),o=h.x,a=h.z,s=h.th,c+=r};for(const r of[1,-1]){const l=r===1?0:lt;for(const[u,h,f]of t){if(l+u-c<-.5)throw new Error(`bảng cua: cung ở pha ${u} chồng cung trước (hết ở pha ${(c-l).toFixed(1)})`);i(l+u-c,0),i(Math.abs(h)*Math.PI/180*f,r*Math.sign(h)/f)}i(l+lt-c,0)}return{segs:e,x:o,z:a}}function m1(t){const n=E0(t,0),{segs:e,x:o,z:a}=E0(t,-Math.atan2(n.x,n.z));let s=e.length-1;for(;s>0&&e[s].u0>cn;)s--;const c=Le(e[s],cn-e[s].u0),i=e.reduce((u,h)=>u+h.bx,0)/e.length,r=e.reduce((u,h)=>u+h.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-i,u.bz-r)+u.br));return{segs:e,endX:o,endZ:a,ox:c.x,oz:c.z,bx:i,bz:r,br:l}}const an=m1(gt.arcs);function xs(t,n,e=an){const o=t+cn,a=Math.floor(o/bn),s=o-a*bn;let c=e.segs.length-1;for(;c>0&&e.segs[c].u0>s;)c--;const i=Le(e.segs[c],s-e.segs[c].u0);return n.x=i.x+a*e.endX-e.ox,n.z=i.z+a*e.endZ-e.oz,n.yaw=i.th,n}const d1={x:0,z:0,yaw:0},f1={x:0,z:0,yaw:0};function yo(t,n=30){return(xs(t+n,f1).yaw-xs(t-n,d1).yaw)/(2*n)}function g1(t,n,e,o,a,s){let c;if(t.k===0)c=n*Math.sin(t.th)+e*Math.cos(t.th);else{const h=Math.sign(t.k);let m=Math.atan2(h*(e+Math.sin(t.th)/t.k),-h*(n-Math.cos(t.th)/t.k))-t.th;m-=2*Math.PI*Math.round((m-t.k*t.len/2)/(2*Math.PI)),c=m/t.k}const i=c>=o-.01&&c<=a+.01;c=Math.min(a,Math.max(o,c));const r=Le(t,c),l=n-(r.x-t.x),u=e-(r.z-t.z);return s.s=c,s.dist=Math.hypot(l,u),s.lat=l*Math.cos(r.th)-u*Math.sin(r.th),i}function Z(t){return((t+Ht)%lt+lt)%lt}function Mn(t){return Math.floor((t+Ht)/lt)}const Yo=9.5;function Qt(t){return $.village(Z(t),Mn(t))}function Un(t){return Qt(t)>.97}function en(t){return $.openness(Z(t))}function _t(t){return 260+30*Math.sin(t/1700)}function Y(t){return _t(t)-$.dive(Z(t))}function Zs(t){return $.sill(Z(t))}function wn(t){return(Y(t+2)-Y(t-2))/4}function Yu(t,n){return Math.max(-1.1,Math.min(1.1,Math.atan(n*n*yo(t)/9.8)))}const Ye={x:0,z:0,yaw:0};function Ct(t){return xs(t,Ye).yaw}function D(t,n,e,o){return xs(t,Ye),o.x=Ye.x+n*Math.cos(Ye.yaw),o.y=Y(t)+e,o.z=Ye.z-n*Math.sin(Ye.yaw),o}function ln(t){return $.halfWidth(Z(t))}function pa(t){return $.extraDepth(Z(t))}function Fc(t){return _t(t)-W(150,240,en(t))-pa(t)}function p1(t){return $.reveal(Z(t))}function v1(t){return $.drop(Z(t))}function Xu(t){return $.clean(Z(t))}function y1(t,n){const e=(Y(t+4)-Y(t-4))/8,o=(Y(t+4)-2*Y(t)+Y(t-4))/16;return 1+n*n*o/(Math.pow(1+e*e,1.5)*9.8)}const ju=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ..o .o. o.. .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],b1={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},w1=8,Zu=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function ro(t){return t.split(" ")}function Ln(t){let n=t.seed=t.seed+1831565813|0;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}function x1(t,n,e,o=1){const a=Sg;let s=0;for(;s<a.length-1&&t>a[s+1][0];)s++;const c=a[s],i=a[Math.min(s+1,a.length-1)],r=i[0]>c[0]?Math.max(0,Math.min(1,(t-c[0])/(i[0]-c[0]))):1,l=(e?.5:1)*(n?.6+.3*Math.min(1,t):1)*o;return{p3:(c[1]+(i[1]-c[1])*r)*l,p2:(c[2]+(i[2]-c[2])*r)*l}}const M1=new Set(["o","u","d"]),k1=/[BLHOK]/;function S1(t,n,e,o,a,s,c){if(!n.length)return;for(let k=o-3;k<=o+3;k++)if(k!==o&&k1.test(e[k]??""))return;const{p3:i,p2:r}=x1(vo(Math.max(0,a),t.diff),s,c,yg(Math.max(0,a),t.diff)),l=Ln(t),u=l<r?2:l<r+i?3:0;if(!u||k0(n)<=u)return;const h=n.some(k=>k.kind==="bridge"||k.kind==="ridge");if(h&&c)return;const f=k=>n.some(M=>(M.kind==="pillar"||M.kind==="spike"||M.kind==="overhang")&&M.lane===k),m=[-1,0,1].filter(k=>!f(k)&&(h||e[o][k+1]===".")&&![o-2,o-1,o+1].some(M=>M1.has(e[M]?.[k+1]??""))),d=h?["pillar"]:c&&!t.diff.villagePillars?["spike"]:["pillar","spike"],g=[[]];for(const k of m){const M=[];for(const w of g){M.push(w);for(const y of d)M.push([...w,{kind:y,lane:k}])}g.splice(0,g.length,...M)}const p=k=>[-1,0,1].every(M=>[...n,...k].some(w=>(w.kind==="pillar"||w.kind==="overhang")&&w.lane===M)),v=g.filter(k=>k.length&&k0([...n,...k])===u&&!p(k));v.length&&n.push(...v[Math.floor(Ln(t)*v.length)])}const L0=700,T1=15e8,Ti=(t,n,e)=>!t.alt&&t.hp<_.maxHp&&n-t.shieldFromZ>=e;function lo(t,n){const e=Math.max(0,n);return ga(e,t.diff)*_.cellSeconds*bg(e,t.diff)}function oa(t,n,e){const o=vo(Math.max(0,e),t.diff),a=xg(o),s=n.filter(h=>h.tier<=a&&!t.lastBag.includes(h.id)),c=s.length?s:n.filter(h=>h.tier<=a),i=Mg(o),r=c.map(h=>(h.tier===a?1.4:1)/Math.max(.15,1+i*h.tier));let l=Ln(t)*r.reduce((h,f)=>h+f,0),u=c[0];for(let h=0;h<c.length;h++)if(l-=r[h],l<=0){u=c[h];break}return t.lastBag.push(u.id),t.lastBag.length>4&&t.lastBag.shift(),u}const P0={o:0,u:_.flareHeight,d:-5.5},A1={B:"pillar",L:"spike",H:"bridge",O:"overhang",K:"spike",P:"pillar",G:"overhang"};function N1(t,n,e,o){const a=n[t.lane+1];if(t.kind==="overhang")return a==="G"?"basket":void 0;if(t.kind==="pillar")return e?"pine":void 0;if(t.kind==="spike")return n.includes("K")?"balloon":o}function Te(t,n,e,o,a={}){const s=ro(n.cells).map(u=>a.mirror?[...u].reverse().join(""):u),c=lo(t,e)*(a.stretch??1);let i=!1;const r=Math.floor((e+s.length*c)/L0),l=r>Math.floor(e/L0)&&e>300&&Tg(vo(e,t.diff),r);return s.forEach((u,h)=>{const f=e+(h+.5)*c,m=t.rowId++,d=Un(f),g=[];if(u==="HHH"||u==="LLL")g.push({kind:u==="HHH"?"bridge":"ridge",lane:0});else for(let w=-1;w<=1;w++){const y=u[w+1],x=A1[y];x&&g.push({kind:d&&y==="B"?"spike":x,lane:w})}S1(t,g,s,h,f,o,d);const p=w=>{const y=N1(w,u,d,a.skin);t.obstacles.push({id:t.nextId++,kind:w.kind,lane:w.lane,z:f,open:o,row:m,passed:!1,...y?{skin:y}:{}})};if(u==="HHH"||u==="LLL"){g.forEach(p);return}const v=g.length>0;for(let w=-1;w<=1;w++){const y=u[w+1],x=g.filter(b=>b.lane===w);if(x.forEach(p),!x.length&&y in P0){const b=s[h-1]==="HHH"||s[h-2]==="HHH",A=t.alt&&y==="o"&&b?_.flareHeight:P0[y];t.pickups.push({id:t.nextId++,kind:"lantern",lane:w,v:A,z:f,taken:!1})}}const k=[-1,0,1].filter(w=>u[w+1]==="."&&qo(g,w,Gu)),M=v?k:[];if(l&&!i&&M.length){const w=M[Math.floor(Ln(t)*M.length)],y=Ln(t),x=t.alt?y<.45?"thermal":y<.75||t.hp>=_.maxHp?"smoke":"shield":Ti(t,f,t.diff.shieldMaxGap??_.shieldMaxGap)||y>=.6&&Ti(t,f,_.shieldMinGap)?"shield":"thermal";x==="shield"&&(t.shieldFromZ=f),t.pickups.push({id:t.nextId++,kind:x,lane:w,v:0,z:f,taken:!1}),i=!0}else k.length&&Ti(t,f,t.diff.shieldMaxGap??_.shieldMaxGap)&&(t.shieldFromZ=f,t.pickups.push({id:T1+m,kind:"shield",lane:k[(Math.imul(m,2654435761)>>>0)%k.length],v:0,z:f,taken:!1}))}),t.chunksSpawned++,e+s.length*c}const Ju=[{id:"cabin-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"kim-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"mom-bang",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"kim-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cabin-kim",tier:1,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"mom-doi",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-tuyet",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cabin-lien",tier:2,cells:"... ... ... .d. .d. HHH ... ... ... .d. .d. HHH ... ..."},{id:"ong-kim",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"kim-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui",tier:2,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ..."},{id:"luon-kim",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"kim-cabin-kim",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"mom-kim",tier:3,cells:"... ... L.B ... ... ... B.L ... ... ... .BL ... ..."},{id:"kim-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"kim-cabin-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],z1=["cabin-mot","kim-le","mom-bang"].map(t=>Ju.find(n=>n.id===t)),C1=[{id:"tang-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"tang-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-suoi",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},{id:"mom-suoi",tier:0,cells:"... ... ... ... .u. .u. .L. .o. ... ..."},{id:"cua-tang",tier:1,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"mom-tang",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"tang-zic",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"tang-cong",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-vom",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"tang-mom-xen",tier:2,cells:"... ... B.L ... ... ... L.B ... ... ... .L. ... ..."},{id:"cau-suoi",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... B.B ... ..."},{id:"luon-tang",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vom-cau",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"tang-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-tang-gat",tier:4,cells:"... ... B.L ... ... ... LB. ... ... ... .LB ... ... ... B.L ... ..."}],E1=[{id:"dinh-le",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"vom-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-dinh",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"song-may",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ... .B. ... ..."},{id:"cua-dinh",tier:1,cells:"... ... B.B .o. ... ... .BB ... ..."},{id:"dinh-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."},{id:"vom-dinh",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ... ... B.B ... ..."},{id:"ong-dinh",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-dinh",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"dinh-vom-dinh",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"dinh-zic-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"to-hop-tang",tier:4,cells:"... ... B.L ... ... ... L.B ... ... ... .d. HHH ... ... ... .BL ... ..."}];function Lr(t){t.mult=Math.min(_.multMax,1+t.multNear+t.multLantern)}function va(t,n,e){t.bonus+=e,t.parts[n]+=e}function L1(t,n){const e=_.lanternMultStep*t.streak;e>=t.multLantern?t.multLantern=e:t.multLantern+=(e-t.multLantern)*(1-Math.exp(-.016666666666666666/_.lanternMultTau)),Lr(t)}function Qu(t){t.streak=0}function P1(){const t=[];return($.cloudDecks??[]).forEach((n,e)=>{let o=-$.dive(0)-n.level(0);for(let a=1;a<=lt;a++){const s=-$.dive(a)-n.level(a);if(o!==0&&Math.sign(s)!==Math.sign(o)){const c=a-1+o/(o-s),i=!!n.eye&&Math.abs(c-n.eye.phase)<n.eye.radius;n.cover(c)>.5&&!i&&t.push({phase:c,deck:e,up:s>0})}o=s}}),t.sort((n,e)=>n.phase-e.phase)}const _1=P1();function tm(t,n){let e=Math.imul(Math.round(t)^Math.imul(n,668265261),2654435761);return e^=e>>>15,(Math.imul(e,2246822507)>>>0)/4294967296}const _0=22;function R1(t,n,e,o){const a=[];for(const s of _1){if(s.phase<=e||s.phase>=o)continue;const c=n+s.phase;if(t.gates.some(h=>Math.abs(h.z-c)<1))continue;const i=t.gusts.filter(h=>h.z<=c).at(-1),r=t.gusts.find(h=>h.z>c);let l=[-1,0,1].filter(h=>(!i||Math.abs(h-i.lane)<=1)&&(!r||Math.abs(h-r.lane)<=1));i&&c-i.z>=_0&&l.some(h=>h!==i.lane)?l=l.filter(h=>h!==i.lane):i&&c-i.z<_0&&(l=[i.lane]);const u={z:c,lane:l[Math.floor(tm(c,1)*l.length)],deck:s.deck,up:s.up,hit:!1,missed:!1};t.gates.push(u),a.push(u)}return a}function I1(t){for(const n of t.gates)if(!(n.hit||n.missed)){if(t.z<n.z)break;Math.abs(t.x-St(n.lane))<=_.gateRadiusX?(n.hit=!0,t.gatesHit++,t.tailwind=Math.min(_.tailwindMax,t.tailwind+_.gateTailwind),va(t,"gust",_.gateScore*t.mult)):(n.missed=!0,t.gustChain=0,t.tailwind=0,t.surge=_.surgeMin),t.events.push({type:"cloud-gate",hit:n.hit,up:n.up})}}function H1(t,n){t.gates.length&&t.gates[0].z<n&&(t.gates=t.gates.filter(e=>e.z>=n))}function Pr(t){return Math.min(1,t.boostT/_.boostFade)}function nm(t){return t.boostT<=0?1:1+(em(t.z,t.diff)-1)*Pr(t)}function em(t,n){const e=_.boostMulMin+(_.boostMulMax-_.boostMulMin)*Math.min(1,vo(t,n));return n.boostTop?Math.min(e,Math.max(1.25,n.boostTop/ga(t,n))):e}function G1(t,n){t.smokeT=Math.max(0,t.smokeT-n),!(t.boostT<=0)&&(t.stunT>0&&(t.boostT=Math.min(t.boostT,_.boostFade)),va(t,"boost",t.speed*n*t.mult*(_.boostScoreMul-1)*Pr(t)),t.boostT=Math.max(0,t.boostT-n))}function B1(t,n,e){const a=($.climbRush?.(Z(t.z))??0)*Math.max(0,_.climbRush-ga(t.z,t.diff)*(nm(t)-1)),s=a>t.climbV?_.climbRushIn:e?_.surgeTauNearRow:_.climbRushOut;t.climbV+=(a-t.climbV)*(1-Math.exp(-.016666666666666666/s))}const F1=[0,_.flareHeight,-5.5];function Js(t,n,e){const o=n+e[0];if(t.gusts.some(c=>c.z===o))return;let a=Math.floor(Ln(t)*3)-1,s=0;e.forEach((c,i)=>{const r=Ln(t),l=Ln(t);i>0&&(a=Math.max(-1,Math.min(1,a+(r<.35?-1:r<.7?1:0))));let u=i===0?0:F1[l<.6?0:l<.8?1:2];t.alt&&u===0&&s<-2&&(u=_.flareHeight),s=u,t.gusts.push({id:t.nextId++,index:i,count:e.length,lane:a,v:u,z:n+c,len:_.gustLen,taken:!1,missed:!1})})}function $1(t){return t.thermalV+t.windLift}function O1(t,n,e,o){if(!o){t.tailwind=0,t.climbV=0,t.windLift=0,t.liftT=0;return}t.tailwind*=Math.exp(-n/(e?_.surgeTauNearRow:_.tailwindTau)),B1(t,n,e),e&&(t.liftT=0),t.liftT=Math.max(0,t.liftT-n);const a=t.liftT>0?2.2:e?2.5:1.2;t.windLift+=((t.liftT>0?_.gustLift:0)-t.windLift)*(1-Math.exp(-n*a))}function D1(t){for(const n of t.gusts){if(n.taken||n.missed)continue;if(t.z<n.z)break;if(t.z>n.z+n.len){n.missed=!0,t.gustChain=0,t.events.push({type:"gust-miss"});continue}if(Math.abs(t.x-St(n.lane))>_.gustRadiusX||Math.abs(t.moveV-n.v)>_.gustRadiusV)continue;n.taken=!0,n.index===0&&(t.gustChain=0),t.gustChain++,t.gustsTaken++,t.tailwind=Math.min(_.tailwindMax,t.tailwind+_.tailwindPerGust),t.liftT=_.gustLiftTime;const e=n.index===n.count-1&&t.gustChain===n.count;va(t,"gust",(_.gustScore+(e?_.gustChainScore:0))*t.mult),t.events.push({type:"gust",chain:t.gustChain,full:e})}I1(t)}function K1(t,n){t.gusts.length&&t.gusts[0].z+t.gusts[0].len<n&&(t.gusts=t.gusts.filter(e=>e.z+e.len>=n))}const U1=28;function R0(t,n){return t!==0?0:tm(n,2)<.5?-1:1}function V1(t,n,e){const o=t.gusts.find(u=>u.index===0&&u.z===n);if(!o)return;const a=e&&t.gusts.filter(u=>u.z<=e.z).at(-1),s=e?e.z:n-U1,c=e?a&&a.lane!==e.lane?a.lane:R0(e.lane,s):R0(o.lane,s),i=-Math.round(s);if(t.pickups.some(u=>u.id===i))return;const r=t.pickups.findIndex(u=>u.z>s),l={id:i,kind:"lantern",wish:!0,lane:c,v:e?_.wishGateV:0,z:s,taken:!1};r<0?t.pickups.push(l):t.pickups.splice(r,0,l)}const I0=[{kind:"gusts",at:310,phases:[360,420,480,540,600],wish:!0},{kind:"rows",from:800,to:1440,pool:Ju,open:!1,intro:z1},{kind:"gusts",at:1450,phases:[1530,1600,1670],wish:!0},{kind:"rows",from:1860,to:2280,pool:C1,open:!0},{kind:"gusts",at:2300,phases:[2380,2470,2560,2650,2740],wish:!0},{kind:"rows",from:3200,to:3960,pool:E1,open:!0}];function q1(t,n){const e=Z(n),o=n-e;for(const[a,s]of I0.entries()){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return o+s.from+.5;const l=(s.intro&&Mn(n)===0?s.intro[t.chunksSpawned]:void 0)??oa(t,s.pool,n);return e+ro(l.cells).length*lo(t,n)>s.to?o+s.to+.5:Te(t,l,n,s.open)}if(e>=s.at)continue;Js(t,o,s.phases);const c=I0.slice(a+1).find(r=>r.kind==="rows")?.from??lt,i=R1(t,o,s.at,c);return s.wish&&V1(t,o+s.phases[0],i.at(-1)),o+s.at+.5}return o+lt+.5}const om=(...t)=>ju.filter(n=>t.includes(n.id)),am=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],W1=[...om("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...am.filter(t=>t.id!=="luon-mai")],Y1=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...om("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...am],X1=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],j1=Zu,Z1=5;function J1(t){const n=["o..",".o.","..o"][t+1],e=[".BB","B.B","BB."][t+1];return{id:`cong-troi-${t}`,tier:0,cells:`... ... ${n} ${n} ${n} ${e} ${n} ... ...`}}const Q1=[{kind:"rows",from:40,to:560,pool:W1,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:Y1,open:!1},{kind:"rows",from:1990,to:2110,pool:X1,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:j1,open:!0},{kind:"gate",at:3560}];function tp(t,n){const e=Z(n),o=n-e;for(const a of Q1){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const i=oa(t,a.pool,n);return e+ro(i.cells).length*lo(t,n)>a.to?o+a.to+.5:Te(t,i,n,a.open)}if(e>=a.at)continue;if(a.kind==="gusts")return Js(t,o,a.phases),o+a.at+.5;const s=Math.floor(Ln(t)*3)-1,c=Math.max(n,o+a.at-(Z1+.5)*lo(t,n));return Math.max(Te(t,J1(s),c,!1),o+a.at+.5)}return o+lt+.5}const np=[1140,1225,1310,1395,1480];function ep(t,n){const e=Z(n),o=lo(t,n),a=Wt-30-(w1+.5)*o;if(e<40)return n+(40-e)+.5;if(e<a){const i=oa(t,ju,n);return e+ro(i.cells).length*o>a?n+(a-e)+.5:Te(t,i,n,!1)}if(e<Wt){let i=Te(t,b1,n,!1);Js(t,n-e,np);const r=Z(i);return r>Wt&&r<Aa&&(i+=Aa-r+.5),i}if(e<Aa)return n+(Aa-e)+.5;const s=oa(t,Zu,n);return e+ro(s.cells).length*o>lt-60?n+(lt-e)+40:Te(t,s,n,!0)}const op=[{id:"den-suon",tier:0,cells:"... ... o.. o.. o.. o.. o.. o.. o.. o.. ... ..."},{id:"po-mu-suon",tier:0,cells:"... ... o.. o.. .o. P.. .o. .o. .o. .o. o.. .P. o.. o.. ... ..."},{id:"khi-cau-ngoai",tier:0,cells:"... ... ..K o.. o.. o.. o.. o.. .K. o.. ... ..."},{id:"khi-cau-cao-suon",tier:0,cells:"... ... o.. o.. d.. G.. d.. o.. o.. o.. o.. .G. o.. ... ..."},{id:"cong-ruong",tier:0,cells:"... ... o.. o.. d.. d.. HHH o.. o.. ... ..."},{id:"choi-le",tier:0,cells:"... ... ..B o.. o.. o.. o.. o.. .B. o.. ... ..."},{id:"po-mu-doi",tier:1,cells:"... ... .o. .o. .o. P.P .o. .o. ..o ..o ..o PP. ..o ..o ... ..."},{id:"choi-po-mu",tier:1,cells:"... ... o.. o.. .o. PB. ..o ..o .o. o.. o.. .PP o.. ... ..."},{id:"khi-cau-po-mu",tier:1,cells:"... ... o.. o.. u.. KP. u.. o.. o.. .o. .o. P.K .o. .o. .o. .o. .u. .KP .u. ... ..."},{id:"bo-ruong-po-mu",tier:1,cells:"... ... o.. o.. u.. LLL o.. o.. .o. .o. .o. P.P .o. ..o ..o ..o ..o PP. ..o ... ..."},{id:"po-mu-khi-cau-cao",tier:2,cells:"... ... .o. .o. .u. PKP .u. .o. d.. d.. GPK d.. o.. o.. u.. KGK u.. ... ..."},{id:"day-khi-cau",tier:2,cells:"... ... o.. .o. .o. P.K .o. .o. u.. u.. KPK u.. o.. d.. d.. GKP d.. ... ..."},{id:"bo-cong-po-mu",tier:2,cells:"... ... o.. u.. u.. LLL o.. .o. .o. .o. PoP .o. .d. .d. .d. HHH .o. o.. o.. o.. .PP o.. ... ..."},{id:"rung-po-mu",tier:3,cells:"... ... .o. .o. .o. P.P ... ... ..o ..o PP. ... ... o.. o.. .PP ... ..."},{id:"hoi-khi-cau",tier:3,cells:"... ... d.. d.. d.. GKG ... ... u.. u.. KPG ... ... .o. .u. PKP ... ..."},{id:"doi-doc-po-mu",tier:3,cells:"... ... o.. o.. u.. LLL ... ... .o. .o. PoP ... ... .d. .d. HHH ... ... o.. o.. .PP ... ..."},{id:"ruong-zic-zac",tier:4,cells:"... ... P.P ... ... ... .PP ... ... ... PP. ... ... ... .PP ... ..."},{id:"bo-cong-bo",tier:4,cells:"... ... .u. LLL ... ... ... PoP ... ... .d. HHH ... ... ... PP. ... ... ..u LLL ... ..."},{id:"khi-cau-gat",tier:4,cells:"... ... KGP ... ... ... PKG ... ... ... GPK ... ... ... KGK ... ..."},{id:"khi-cau-bao",tier:5,cells:"... ... PKP ... ... ... GPK ... ... ... .PP ... ... ... KGP ... ... ... P.P ... ..."},{id:"ruong-vot-chui",tier:5,cells:"... ... PoP ... ... ... .d. HHH ... ... ... .PP ... ... ... .u. LLL ... ... ... PP. ... ..."},{id:"le-hoi-ruong",tier:5,cells:"... ... KGK ... ... ... PKP ... ... ... GPK ... ... ... PP. ... ... ... GKP ... ..."}],ap=[{id:"den-mam-xoi",tier:0,cells:"... ... o.. o.. o.. o.. o.. o.. o.. o.. ... ..."},{id:"cau-tre",tier:0,cells:"... ... o.. o.. d.. d.. HHH o.. o.. ... ..."},{id:"khi-cau-thung",tier:0,cells:"... ... ..K o.. o.. o.. o.. o.. ..K o.. ... ..."},{id:"po-mu-mam-xoi",tier:0,cells:"... ... .o. .o. .o. .P. o.. o.. o.. o.. .o. P.. .o. ... ..."},{id:"khi-cau-cao-thung",tier:0,cells:"... ... .o. .o. .d. .G. .d. .o. .o. .o. .o. G.. .o. ... ..."},{id:"nha-giua",tier:0,cells:"... ... .B. o.. o.. o.. o.. o.. ..B o.. ... ..."},{id:"nha-po-mu",tier:1,cells:"... ... o.. o.. .o. P.B .o. .o. .o. o.. o.. .PP o.. ... ..."},{id:"khi-cau-ra-vao",tier:1,cells:"... ... o.. o.. d.. GP. d.. o.. o.. .o. .o. P.P .o. .o. .o. .o. ..o PP. ..o ... ..."},{id:"ghenh-po-mu",tier:1,cells:"... ... o.. o.. u.. LLL o.. o.. .o. .o. .o. P.P .o. .o. .o. o.. o.. .PP o.. ... ..."},{id:"cau-da-po-mu",tier:2,cells:"... ... o.. d.. d.. HHH o.. o.. .o. .o. P.P .o. .o. u.. u.. KPK u.. ... ..."},{id:"ong-tre-po-mu",tier:2,cells:"... ... o.. o.. o.. .PP o.. .o. .o. .o. P.P .o. ..o ..o ..o PP. ..o ... ..."},{id:"cap-khi-cau",tier:2,cells:"... ... .o. .o. .d. KGK .d. .o. .o. .u. PKP .u. .o. ..o ..o GP. ..o ... ..."},{id:"luon-khi-cau",tier:3,cells:"... ... o.. .o. .u. PKG .o. .o. u.. u.. KPP u.. ... d.. d.. GKP d.. ... ..."},{id:"khi-cau-doi",tier:3,cells:"... ... d.. d.. d.. GKG ... ... u.. u.. KPG ... ... d.. d.. GKP ... .o. .o. .o. P.P ... ..."},{id:"rung-po-mu-thung",tier:3,cells:"... ... .o. .o. .o. P.P .o. o.. o.. o.. .PP o.. .o. ..o ..o PP. ... ..."},{id:"thac-da",tier:4,cells:"... ... PoK ... ... ... .d. HHH ... ... ... KP. ... ... ... .KP ... ..."},{id:"ong-tre-gat",tier:4,cells:"... ... .PP ... ... ... P.P ... ... ... PP. ... ... ... .PP ... ..."},{id:"khi-cau-xoan",tier:4,cells:"... ... GKP ... ... ... KPG ... ... ... PGK ... ... ... KGK ... ..."},{id:"thac-khi-cau",tier:5,cells:"... ... PKP ... ... ... .d. HHH ... ... ... GPK ... ... ... .u. LLL ... ... ... KPK ... ..."},{id:"ong-tre-xoay",tier:5,cells:"... ... .PP ... ... ... PP. ... ... ... P.P ... ... ... .PP ... ... ... PP. ... ..."},{id:"mam-xoi-hoi",tier:5,cells:"... ... KGK ... ... ... PKP ... ... ... GPK ... ... ... .PP ... ... ... GKG ... ..."}],sp=[{id:"nha-le",tier:0,cells:"... ... B.. ... ... ... ... ... ..B ... ..."},{id:"cong-ban",tier:0,cells:"... ... ... ... .d. .d. HHH .o. .o. ... ..."},{id:"den-ban",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"khi-cau-ban",tier:0,cells:"... ... .K. o.o o.o ... ... ... K.. .o. ... ..."},{id:"po-mu-dau-ban",tier:0,cells:"... ... ..o ..o .o. ..P .o. .o. .o. .o. o.. .P. o.. ... ..."},{id:"khi-cau-cao-ban",tier:0,cells:"... ... .o. .o. .d. .G. .d. .o. .o. ..o ..d ..G ..d ... ..."},{id:"ngo-ban",tier:1,cells:"... ... .o. .o. .u. PBP .u. .o. o.. o.. o.. .PP o.. ... ..."},{id:"khi-cau-cong",tier:1,cells:"... ... o.. o.. u.. KPK u.. o.. o.. .o. .o. P.P .o. ... ..."},{id:"xom-po-mu",tier:1,cells:"... ... .o. .o. .o. B.P .o. .o. ..o ..o ..o PP. ..o ..o .o. .o. .d. .GP .d. ... ..."},{id:"xom",tier:2,cells:"... ... .o. .o. .o. P.B .o. o.. o.. o.. .PP o.. d.. d.. d.. GKP d.. ... ..."},{id:"xom-khi-cau",tier:2,cells:"... ... .o. .o. .u. KKP .u. .o. .o. .d. PGK .d. .o. o.. o.. .PP o.. ... ..."},{id:"cong-po-mu",tier:2,cells:"... ... o.. d.. d.. HHH o.. o.. .o. .o. P.P .o. .o. ..o ..o PP. ..o ... ..."},{id:"xom-cong",tier:3,cells:"... ... .o. .u. .u. PBP ... ... .d. .d. HHH ... ... o.. o.. .PP ... ..."},{id:"hoi-ban-nho",tier:3,cells:"... ... .o. .o. .u. GKG ... ... u.. u.. KPB ... ... .o. .o. P.P ... ..."},{id:"ban-zic-zac",tier:4,cells:"... ... PPB ... ... ... BPP ... ... ... P.P ... ... ... GPK ... ..."},{id:"hoi-khi-cau",tier:4,cells:"... ... KGK ... ... ... GKG ... ... ... PKP ... ... ... KPG ... ..."},{id:"hoi-ban",tier:5,cells:"... ... PPB ... ... ... .d. HHH ... ... ... BPP ... ... ... KGK ... ... ... PB. ... ..."},{id:"ban-xoan",tier:5,cells:"... ... KPK ... ... ... PGK ... ... ... GKP ... ... ... P.P ... ... ... .u. LLL ... ..."}],ip=[{id:"da-le",tier:0,cells:"... ... L.. .o. .o. .o. .o. .o. ..L ... ..."},{id:"da-giua",tier:0,cells:"... ... .L. o.o o.o ... ... ... L.. .o. ... ..."},{id:"po-mu-doc",tier:0,cells:"... ... P.. .o. .o. .o. .o. o.. .P. o.. ... ..."},{id:"cua-da",tier:1,cells:"... ... P.L .o. .o. .o. ..o ..o LP. ..o ..o .o. .o. .o. ..P ... ..."},{id:"da-zic",tier:1,cells:"... ... .LP o.. o.. o.. .o. .o. P.L .o. .o. ..o ..o ..o LP. ... ..."},{id:"hang-da",tier:2,cells:"... ... PLP .u. .o. u.. u.. LPL u.. .o. .o. .o. P.P .o. ... ..."},{id:"luon-da-doc",tier:3,cells:"... ... PL. ... ... ... ... L.P ... ... ... ... .PL ... ..."},{id:"da-zic-zac-gat",tier:4,cells:"... ... PLP ... ... ... LPP ... ... ... PPL ... ... ... LPL ... ..."},{id:"tuong-da",tier:5,cells:"... ... LPL ... ... ... PPL ... ... ... LPP ... ... ... PLP ... ..."}],cp=[{kind:"boost",at:300},{kind:"rows",from:570,to:850,pool:op,open:!0,slope:!0},{kind:"boost",at:875},{kind:"gusts",at:1080,phases:[1120,1180,1240,1300,1360]},{kind:"rows",from:1620,to:1980,pool:ap,open:!0,slope:!0},{kind:"boost",at:2050},{kind:"rows",from:2100,to:2460,pool:sp,open:!0},{kind:"boost",at:2510},{kind:"rows",from:2575,to:2975,pool:ip,open:!0,rush:!0,skin:"boulder"}];function rp(t,n){const e=Z(n),o=n-e;for(const a of cp){if(a.kind==="rows"){if(e>=a.to)continue;if(e<a.from)return o+a.from+.5;const s=oa(t,a.pool,n),c=a.rush?em(n,t.diff):1;if(e+ro(s.cells).length*lo(t,n)*c>a.to)return o+a.to+.5;const i=!!a.slope&&yo(n,150)<0;return Te(t,s,n,a.open,{mirror:i,stretch:c,...a.skin?{skin:a.skin}:{}})}if(!(e>=a.at))return a.kind==="boost"?o+a.at>600&&t.pickups.push({id:t.nextId++,kind:"boost",lane:Math.floor(Ln(t)*3)-1,v:0,z:o+a.at,taken:!1}):Js(t,o,a.phases),o+a.at+.5}return o+lt+.5}const lp={"mu-cang-chai":rp,"khau-pha":ep,"ha-giang":tp,fansipan:q1},hp=lp[Gt];function up(t){for(;t.nextChunkZ<t.z+_.spawnAheadMeters;)t.nextChunkZ=hp(t,t.nextChunkZ);const n=t.z-_.despawnBehind;t.obstacles.length&&t.obstacles[0].z<n&&(t.obstacles=t.obstacles.filter(e=>e.z>=n)),t.pickups.length&&t.pickups[0].z<n&&(t.pickups=t.pickups.filter(e=>e.z>=n)),K1(t,n),H1(t,n)}const sm=1e9;function mp(t){const n=_.thermalTime-.6;for(let e=.5;e<n;e+=.22){const o=t.z+t.speed*1.08*e,a=t.obstacles.filter(i=>Math.abs(i.z-o)<12),s=[-1,0,1].filter(i=>!a.some(r=>na(r,St(i),_.thermalHeight,0)));if(!s.length)continue;const c=s.includes(t.lane)?t.lane:s[0];t.pickups.push({id:sm+t.trailIds++,kind:"lantern",lane:c,v:_.thermalHeight,z:o,taken:!1})}t.pickups.sort((e,o)=>e.z-o.z)}function dp(t,n){return t.thermalV>8&&n.id<sm?!1:!t.pickups.some(e=>e!==n&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-n.z)<.5)}function fp(t){for(const n of t.pickups){if(n.taken)continue;const e=n.z-t.z;if(e>3)break;if(e<-3){n.kind==="lantern"&&!n.wish&&e>-3-t.speed/60&&dp(t,n)&&Qu(t);continue}if(Math.abs(t.x-St(n.lane))<_.lanternPickRadius&&Math.abs(t.v-n.v)<(n.wish?_.wishPickV:_.lanternPickRadius))if(n.taken=!0,n.kind==="lantern"){t.lanterns++,t.streak++,t.bestStreak=Math.max(t.bestStreak,t.streak);const a=_.lanternScore*(n.wish?_.wishLanternMul:1)*t.mult*(t.smokeT>0?_.smokeLanternMul:1);va(t,"lantern",a),t.events.push(n.wish?{type:"wish",streak:t.streak,id:n.id,points:a}:{type:"lantern",streak:t.streak,id:n.id})}else n.kind==="thermal"?(t.thermalT=_.thermalTime,t.low=!1,mp(t)):n.kind==="smoke"?(t.smokeT=_.smokeTime,t.smokes++):n.kind==="boost"?(t.boostT=_.boostTime,t.boosts++):t.hp=Math.min(_.maxHp,t.hp+1),t.events.push({type:"booster",kind:n.kind})}}const gp=1.4,pp=3,vp=46,yp=100,bp=.8,H0=(t,n,e)=>{const o=Math.min(1,Math.max(0,(t-n)/(e-n)));return o*o*(3-2*o)};function wp(t,n){let e=1/0;for(const a of t.obstacles)a.passed||(e=Math.min(e,Math.max(0,a.z-t.z)/Math.max(1,t.speed)));const o=t.mode!=="run"?0:Math.max(1-H0(e,gp,pp),H0(t.speed,vp,yp));t.pace=o>=t.pace?o:t.pace+(o-t.pace)*(1-Math.exp(-.016666666666666666/bp))}function Pn(t,n,e){return n+(e-n)*t}function im(t,n,e,o,a){return e>=1?n:t+(n-t)*(1-Math.exp(-.016666666666666666*o/(1-e)))}function aa(t,n,e,o,a,s){const c=t-e,i=n+o*c,r=Math.exp(-o*a);return s.x=e+(c+i*a)*r,s.vel=(n-o*i*a)*r,s}function cm(){return _.vertIn+_.vertHold+_.vertOut}const Ai={x:0,vel:0};function xp(t,n){t.vert!=="cruise"&&(!t.alt&&t.holdDive&&t.vertT>_.vertIn&&t.vertT<_.vertIn+_.vertHold&&(t.vertT=_.vertIn+.01),t.vertT+=n,t.vertT>=(t.alt&&t.vert==="dive"?_.lowTransition:cm())&&(t.vert="cruise",t.vertT=0));const e=t.vert!=="cruise"&&t.vertT<_.vertIn+_.vertHold,o=t.low?-5.5:0,a=e?t.vert==="flare"?_.flareHeight:-5.5:o,s=e||t.low;t.moveGoal=im(t.moveGoal,a,t.pace,s?_.vertEaseInChill:_.vertEaseOutChill);const c=s?Pn(t.pace,_.vertOmegaInChill,_.vertOmegaIn):Pn(t.pace,_.vertOmegaOutChill,_.vertOmegaOut);aa(t.moveV,t.moveVel,t.moveGoal,c,n,Ai),t.moveV=Ai.x,t.moveVel=Ai.vel}const Ni={x:0,vel:0};function rm(t,n){const e=Math.sign(n-t.lane);t.lane=n,t.laneT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert=t.vert,t.events.push({type:"lane",dir:e})}function Mp(t,n){t.steerX=Math.max(-7,Math.min(_.steerMax,n));const e=lm(t.lane,t.steerX);e!==t.lane&&rm(t,e)}function lm(t,n){return Math.abs(n-St(t))<=_.laneGap*.57?t:Math.max(-1,Math.min(1,Math.round(-n/_.laneGap)))}function kp(t,n){t.laneT=Math.min(1,t.laneT+n/_.laneTime),t.steerGoal=im(t.steerGoal,t.steerX,t.pace,_.laneEaseChill);const e=_.handling[t.handling];aa(t.x,t.xVel,t.steerGoal,Pn(t.pace,_.laneOmegaChill*Math.min(1,e+.15),_.laneOmega*e),n,Ni),t.x=Ni.x,t.xVel=Ni.vel}function zi(t,n=!1,e=gt.profile){return{mode:"ready",seed:t,alt:n,diff:e,low:!1,smokeT:0,smokes:0,boostT:0,boosts:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,pace:0,steerGoal:0,moveGoal:0,handling:"fast",vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,climbV:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],gates:[],gatesHit:0,hp:_.maxHp,stunT:0,hurtRow:-1,shieldFromZ:0,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0,boost:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:Mn(0)*2+1,lastBag:[],events:[]}}function Sp(t){t.mode="run",t.nextChunkZ=Math.max(t.nextChunkZ,t.z+220)}function G0(t,n){if(n==="left"||n==="right"){const o=n==="left"?-1:1;if(t.laneT<_.laneTime*.6)return!1;const a=Math.max(-1,Math.min(1,t.lane+o));return t.steerX=St(a),a!==t.lane&&rm(t,a),!0}const e=n==="up"?"flare":"dive";return t.alt&&e==="dive"&&t.low?!0:t.vert===e&&t.vertT<cm()-_.vertOut?!1:(t.alt&&(t.low=e==="dive"),t.vert=e,t.vertT=0,t.dodgeTime=t.time,t.dodgeX=t.x,t.dodgeV=t.thermalV+t.moveV,t.dodgeVert="cruise",t.events.push({type:"vert",kind:e}),!0)}function Tp(t,n){if(n.row!==t.hurtRow){if(t.hp>=_.maxHp&&(t.shieldFromZ=Math.max(t.shieldFromZ,t.z)),t.hp-=Ng(n,t.steerX,t.low?"dive":t.vert)||t.time-t.dodgeTime<=_.reactWindow?1:t.hp,t.hp>0){t.hurtRow=n.row,t.stunT=_.stunTime,t.hitstopT=_.hitstop,t.surge=_.surgeMin,t.combo=0,t.multNear=0,Qu(t),Lr(t),t.events.push({type:"hurt",hp:t.hp,kind:n.kind});return}t.hp=0,t.mode="crash",t.crashT=0,t.hitstopT=_.hitstop*2,t.events.push({type:"crash",kind:n.kind})}}function Ap(t,n,e,o,a=null){if(t.events.length=0,t.time+=o,t.mode==="over")return;if(t.mode==="crash"){t.crashT+=o,t.z+=t.speed*o*Math.max(0,1-t.crashT*1.5),t.crashT>=_.crashSeconds&&(t.mode="over");return}if(t.hitstopT>0){t.hitstopT-=o;return}const s=t.mode==="run";s&&a!==null&&Mp(t,a);for(const m of s?n:[])G0(t,m)||(t.buffered=m,t.bufferT=_.bufferTime);t.buffered&&(t.bufferT-=o,(G0(t,t.buffered)||t.bufferT<=0)&&(t.buffered=null)),t.holdDive=e&&t.vert==="dive";const c=t.vert==="dive"?_.diveSpeedMul:t.vert==="flare"?_.flareSpeedMul:1,i=Math.sin(Math.atan(wn(t.z))),r=t.obstacles.some(m=>!m.passed&&m.z>t.z&&m.z<t.z+t.speed*2.5),l=t.surge>0&&r?_.surgeTauNearRow:_.surgeTau;t.surge+=(-9.8*i-t.surge/l)*o,t.surge=s?Math.max(_.surgeMin,Math.min(_.surgeMax,t.surge)):0,O1(t,o,r,s);const u=s?ga(t.z,t.diff)*c*nm(t)+t.surge+t.tailwind+t.climbV:24;t.speed+=(u-t.speed)*(1-Math.exp(-o*3)),t.z+=t.speed*o,s&&up(t);const h=Mn(t.z)*2+(en(t.z)>.5?1:0);h!==t.sectionIndex&&(t.sectionIndex=h,t.events.push({type:"section",open:h%2===1,index:h})),wp(t),kp(t,o),xp(t,o),t.thermalT>0&&t.thermalT<=o&&t.obstacles.some(m=>(m.kind==="bridge"||m.kind==="ridge"||m.kind==="overhang")&&m.z>t.z&&m.z<t.z+t.speed*2.2)&&(t.thermalT=o*2),t.thermalT=Math.max(0,t.thermalT-o);const f=t.thermalT>0?_.thermalHeight:0;if(t.thermalV+=(f-t.thermalV)*(1-Math.exp(-o*(t.thermalT>0?2.5:1.8))),t.v=t.thermalV+t.windLift+t.moveV,t.stunT=Math.max(0,t.stunT-o),s&&G1(t,o),s){for(const m of t.obstacles)if(!(m.passed||m.z-t.z>6)){if(na(m,t.x,t.v,m.z-t.z)){if(m.passed=!0,Tp(t,m),t.mode==="crash")return;continue}zg(m,t.z)&&(m.passed=!0,t.time-t.dodgeTime<=_.nearMissWindow+.1&&na(m,t.dodgeX,t.alt?t.dodgeV:t.thermalV,0)&&(t.combo++,t.comboT=0,t.multNear=_.multStep*t.combo,Lr(t),va(t,"nearMiss",25*t.mult),t.events.push({type:"near-miss",combo:t.combo,kind:m.kind})))}fp(t),D1(t),t.comboT+=o,t.comboT>_.comboBreak&&t.combo>0&&(t.combo=0,t.multNear=0),L1(t),t.score+=t.speed*o*t.mult}}function Ae(t){return Math.floor(t.score+t.bonus)}const Np=["keydown","pointerdown","pointerup","touchstart","touchend","click"],zp=1500,Cp=1e3;function Ep(t){let n=-1/0;t.addEventListener("statechange",()=>{t.state==="running"&&(n=performance.now())});const e=()=>{t.state!=="running"&&t.state!=="closed"&&t.resume()};for(const a of Np)window.addEventListener(a,e,{capture:!0,passive:!0});let o=-1/0;return window.addEventListener("pointermove",()=>{const a=performance.now();t.state!=="suspended"||a-o<zp||(o=a,t.resume())},{passive:!0}),{resume:e,justWoke:()=>t.state!=="running"||performance.now()-n<Cp}}const Lp="skyrun-audio";function Pp(t,n){const e=`${Date.now()}-${Math.random()}`;let o=null;try{o=new BroadcastChannel(Lp)}catch{}let a=!1;const s=()=>{t.state==="running"&&(a=!0,t.suspend())};t.addEventListener("statechange",()=>{t.state==="running"&&(a=!1,o?.postMessage(e))}),o?.addEventListener("message",i=>{i.data!==e&&s()}),addEventListener("pagehide",s);const c=()=>{a&&!document.hidden&&t.resume().catch(()=>{})};addEventListener("pageshow",i=>{i.persisted&&c()}),n&&document.addEventListener("visibilitychange",()=>{document.hidden?s():c()})}const _p=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss","festival-whoosh"],hm=["khen-dep-lam","khen-bay-pro","khen-ai-can","pk-quay-len","pk-phe-qua","pk-nhanh-qua","pk-ky-luc-chop","pk-pha-ky-luc","tiec-suyt-ky-luc","tiec-lam-lai","tiec-xem","tiec-mot-tim","treu-moi-cat-canh","treu-khoi-dong","treu-hon-vach","treu-lai-nua","dx-bay-kieu-gi","dx-vach-dung-yen","dx-nhin-duong","dx-de-ma","dx-ky-luc-cuoi","khen-sat-rat","pk-hu-hon","khen-tay-lai-lua","pk-cay-mat","pk-gom-den"],um=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua","ngan-yeah","ngan-wiii","ngan-nhanh-ghe","ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ui-da","ngan-oi","ngan-ui","ngan-co-len","ngan-rang-len","ngan-ngon","ngan-them-ne","ngan-tiec-ghe","ngan-oi-khong","ngan-di-ne","ngan-len-nao","ngan-hay","ngan-ghe-chua"],_r=["treu-cabin","dx-thap-dung-yen","tiec-rot-may","tiec-nhay-lai"],mm=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may","pk-len-duong","pk-bay-thoi",...hm,..._r,...um],dm=["ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi","dinh-fansipan","xuyen-may","cap-treo","mat-xoay-may","suoi-muong-hoa","troi-khoi-may","bien-may"],fm=["khe-da","thung-lung"],B0={"wind-loop":.6},Ci=new URLSearchParams(location.search).get("voice"),Rp=Ci&&/^[a-z_]+$/.test(Ci)?`audio-opts/voice/${Ci}`:"audio/voice",gm=t=>mm.includes(t)?`${Rp}/${t}.mp3`:`audio/${t}.mp3`,Ip=new Set(Object.values($.zoneLines??{})),Hp=[...$.zoneNames?fm:[],...dm.filter(t=>!Ip.has(t)),...gt.region==="mu-cang-chai"?[]:["festival-whoosh"],...gt.region==="fansipan"?[]:_r],pm=new Map,Gp=Hu.then(Ru),Bp=[...hm,..._r,...um];for(const t of[..._p,...mm]){if(Hp.includes(t))continue;const n=Bp.includes(t)?Gp:Hu;pm.set(t,n.then(()=>fetch(gm(t))).then(e=>e.ok?e.arrayBuffer():null).catch(()=>null))}function Fp(t){const n=new Map;for(const[e,o]of pm)o.then(async a=>{if(!a)return;const s=await t.decodeAudioData(a.slice(0)).catch(()=>null);s&&n.set(e,B0[e]?Op(t,s,B0[e]):s)});return{get:e=>n.get(e),play(e,o,a={}){const s=n.get(e);if(!s)return null;const c=t.createBufferSource();c.buffer=s,c.loop=a.loop??!1,c.playbackRate.value=a.rate??1;const i=t.createGain();i.gain.value=a.vol??1;let r=c.connect(i);if(a.pan){const l=t.createStereoPanner();l.pan.value=a.pan,r=r.connect(l)}return r.connect(o),c.start(),c}}}function $p(t,n){const e=Math.floor(n*t.sampleRate),o=t.length-e;if(o<=e)return t.duration;for(let a=0;a<t.numberOfChannels;a++){const s=t.getChannelData(a);for(let c=0;c<e;c++){const i=c/e;s[c]=s[c]*Math.sqrt(i)+s[o+c]*Math.sqrt(1-i)}}return o/t.sampleRate}function Op(t,n,e){const o=Math.floor(e*n.sampleRate),a=n.length-o;if(a<=o)return n;const s=t.createBuffer(n.numberOfChannels,a,n.sampleRate);for(let c=0;c<n.numberOfChannels;c++){const i=n.getChannelData(c),r=s.getChannelData(c);r.set(i.subarray(0,a));for(let l=0;l<o;l++){const u=l/o;r[l]=i[l]*Math.sqrt(u)+i[a+l]*Math.sqrt(1-u)}}return s}const Dp=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9},{id:"kpop-anthem-1",label:"We Rise",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 122 bpm",file:"audio/music/kpop-anthem-1.mp3",lufs:-13.8},{id:"cophong-vocal-1",label:"Bay lên",style:"Cổ phong pop · hát tiếng Việt, đàn tranh, sáo trúc · 128 bpm",file:"audio/music/cophong-vocal-1.mp3",lufs:-13.5},{id:"cophong-edm-1",label:"Cổ phong",style:"Cổ phong EDM · đàn tranh, sáo trúc, đàn nhị, khèn · 130 bpm",file:"audio/music/cophong-edm-1.mp3",lufs:-15.1},{id:"dem-hoi-1",label:"Đêm hội đèn trời",style:"EDM lễ hội · khèn, sáo lá, đàn môi, cồng · 124 bpm",file:"audio/music/dem-hoi-1.mp3",lufs:-16.9},{id:"cophong-vinahouse-1",label:"Cổng Trời",style:"Vinahouse cổ phong · đàn tranh, sáo, chuông ngựa · 134 bpm",file:"audio/music/cophong-vinahouse-1.mp3",lufs:-15.5},{id:"kpop-anthem-2",label:"Above the Clouds",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 124 bpm",file:"audio/music/kpop-anthem-2.mp3",lufs:-15.3},{id:"kpop-hiphop-1",label:"Fly High",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 124 bpm",file:"audio/music/kpop-hiphop-1.mp3",lufs:-14.5},{id:"kpop-hiphop-2",label:"Light It Up",style:"K-pop hip-hop · hát + rap tiếng Anh, kèn đồng, khèn · 122 bpm",file:"audio/music/kpop-hiphop-2.mp3",lufs:-14.4},{id:"kpop-anthem-3",label:"Touch the Sky",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 126 bpm",file:"audio/music/kpop-anthem-3.mp3",lufs:-13.5},{id:"kpop-vocal-2",label:"Sea of Clouds",style:"K-pop dance-pop · có hát, khèn, sáo · 130 bpm",file:"audio/music/kpop-vocal-2.mp3",lufs:-12.9}],F0={"khau-pha":["music-flight","taybac-3","vinahouse-1","kpop-trap-1","dem-hoi-1"],"ha-giang":["ha-giang-1","cophong-vocal-1","cophong-edm-1","vinahouse-2","cophong-vinahouse-1"],"mu-cang-chai":["edm-vocal-1","taybac-2","kpop-dance-1","kpop-hiphop-1","kpop-hiphop-2"],fansipan:["kpop-vocal-1","kpop-anthem-1","kpop-dance-2","kpop-anthem-2","kpop-anthem-3","kpop-vocal-2"]},vm=t=>Dp.find(n=>n.id===t),Qs=t=>(F0[t]??F0["khau-pha"]).map(n=>vm(n)),$c="skyrun.settings",ym="skyrun.sound";function bm(){try{const t=JSON.parse(localStorage.getItem(ym)??"{}");if(t.v===2)return{sfx:t.sfx!==!1,music:t.music!==!1};const n=t.muted===!0;return{sfx:!n,music:!n&&t.music!==!1}}catch{return{sfx:!0,music:!0}}}function Kp(t){try{localStorage.setItem(ym,JSON.stringify({v:2,...t}))}catch{}}const Up=["on","dim","off"],Vp=["fast","mid","soft"],$0="soft";let Ms=null;const wm=t=>Vp.includes(t.handling)?t.handling:void 0;function qp(){return Ms??=Ne().handling}let Oc="shuffle";function Ne(){try{const t=JSON.parse(localStorage.getItem($c)??"{}");return{music:Oc,ghosts:Up.includes(t.ghosts)?t.ghosts:"on",handling:Ms??wm(t)??$0}}catch{return{music:Oc,ghosts:"on",handling:Ms??$0}}}function Dc(t){t.music!==void 0&&(Oc=t.music),t.handling!==void 0&&(Ms=t.handling);try{const n=t.handling??wm(JSON.parse(localStorage.getItem($c)??"{}"));localStorage.setItem($c,JSON.stringify({ghosts:t.ghosts??Ne().ghosts,handling:n}))}catch{}}const zo=3,Wp=-13.1,Yp=20,O0=32e3,Xp=t=>{if(t.sampleRate<=O0)return t;try{return new OfflineAudioContext(2,1,O0)}catch{return t}},rs=Qs(Gt),jp=t=>rs.find(n=>n.id===t)??null,Ei=t=>{if(t===null)return rs[0];const n=rs.filter(e=>e.id!==t);return n[Math.floor(Math.random()*n.length)]??rs[0]};function Zp(t,n){const e=new Map,o=Xp(t);let a=!1;Er.then(()=>a=!0);let s=!1,c=Ne().music;const i=()=>c==="shuffle"?null:jp(c);let r=Ei(null),l=null;const u=g=>{let p=e.get(g.id);return p||e.set(g.id,p={bytes:pg(g.file),buf:null,loop:0,decoding:!1}),p},h=(...g)=>{for(const p of e.keys())g.includes(p)||e.delete(p)},f=(g,p)=>{const v=u(g);return v.buf?!0:(p&&!v.decoding&&(v.decoding=!0,v.bytes.then(async k=>{const M=k&&await o.decodeAudioData(k).catch(()=>null);M&&e.get(g.id)===v&&(v.loop=$p(M,zo),v.buf=M)})),!1)},m=g=>Math.min(1.6,10**((Wp-g.lufs)/20)),d=(g,p)=>{const v=t.currentTime,k=e.get(g.id),M=t.createBufferSource();M.buffer=k.buf,M.loop=!0,M.loopEnd=k.loop;const w=t.createGain();if(w.gain.setValueAtTime(0,v),w.gain.linearRampToValueAtTime(m(g),v+p),M.connect(w).connect(n),M.start(v,zo),l){const y=l.gain.gain;y.cancelScheduledValues(v),y.setValueAtTime(y.value,v),y.linearRampToValueAtTime(0,v+p),l.src.stop(v+p+.05)}l={t:g,src:M,gain:w,at:v-zo,loop:k.loop},r=i()?g:Ei(g.id),h(g.id,r.id),u(r)};return{tick(g){if(!g)return;const p=i();if(!l||p&&p.id!==l.t.id){const k=p??r;(l||a||s)&&f(k,!0)&&d(k,1);return}if(p||r.id===l.t.id)return;const v=l.loop-(t.currentTime-l.at)%l.loop;f(r,v<Yp)&&v<zo&&d(r,zo)},choice:()=>i()?.id??"shuffle",setChoice(g){c=g==="shuffle"||vm(g)?g:"shuffle",Dc({music:c}),s=!0,!(i()||!l)&&(r=Ei(l.t.id),h(l.t.id,r.id),u(r))},playing:()=>l?.t??null,loading:()=>{const g=i()??(l?null:r);return g&&g.id!==l?.t.id&&!e.get(g.id)?.buf?g:null},held:()=>[...e].map(([g,p])=>p.buf?`${g}:pcm`:g)}}const ya=lt*gt.dayCycles,ks=gt.dayCutPhase-Ht+ya,xm={"mu-cang-chai":"Mù Cang Chải","khau-pha":"Khau Phạ","ha-giang":"Hà Giang",fansipan:"Fansipan"};function Mm(t){return t<ks?1:2+Math.floor((t-ks)/ya)}function Kc(t){return t<=1?0:ks+(t-2)*ya}const Jp={"khau-pha":0,"ha-giang":1,"mu-cang-chai":2,fansipan:3},bo={value:0},Rr={value:-1e9},Ss={value:[-1e9,0,-1e9,0]},km={value:-1e9};let Ts="khau-pha";function Qp(t){Ts=t,bo.value=Jp[t]}const ce=()=>Ts,wo=()=>bo.value===1?1:0,re=()=>bo.value===2?1:0;function Sm(t={}){return Object.defineProperties({...t},{REGION_MC:{enumerable:!0,get:()=>Ts==="mu-cang-chai"?1:!1},REGION_FP:{enumerable:!0,get:()=>Ts==="fansipan"?1:!1}})}const Ir=`uniform float uRegionHg;
float regionIs(float id) { return float(abs(uRegionHg - id) < 0.5); }`;function Tm(t,n=!1){return{dusk:(n?.34:.62)*(1-R(0,.08,t))+.5*R(.52,.66,t)+.5*R(.68,.78,t)-.38*R(.95,1,t),morn:R(.03,.14,t)*(1-R(.3,.45,t))}}function t2(t){const n=Mm(t),e=Kc(n),o=Math.min(1,Math.max(0,(t-e)/(n===1?ks:ya)));return{day:n,region:ce(),u:o,...Tm(o,n===1)}}function n2(t){return t.u>=.95?"Rạng sáng":t.u>=.74?"Đêm đèn trời":t.u>=.56?"Hoàng hôn":t.u<.1?"Bình minh":t.u<.4?"Buổi sáng":"Chiều vàng"}function Am(t){const n=t.u<.5?0:t.dusk>=.98?2:t.dusk>=.48?1:0;return(t.day-1)*3+n}function e2(t){let n=null;const e=a=>{n=a===null?null:{day:1,region:ce(),u:a,...Tm(a,!0)}},o=a=>{n=a===null?null:{day:1,region:ce(),u:.52+.26*a,dusk:a,morn:0}};return t.has("dusk")&&o(Number(t.get("dusk"))),t.has("clock")&&e(Number(t.get("clock"))),{at:a=>n??t2(a),forceU:e,forceDusk:o}}const D0=.7,K0=110,o2=1.6,a2=3;let Uc=null,U0=-1/0;function s2(){const t=Uc;return Uc=null,t}function i2(t){const n=new Float32Array(t).fill(Number.NaN),e={x:0,y:0,z:0};let o=Number.NaN,a=Number.NaN,s=0,c=0,i=!1,r=0,l=1;return{begin(u,h){c=h-a,i=c>0&&c<.5&&Math.abs(u-o)<60,o=u,a=h,s=h,D(u,0,a2,e);const f=Ct(u);r=Math.sin(f),l=Math.cos(f)},watch(u,h,f){const m=h.elements,d=m[12]-e.x,g=m[13]-e.y,p=m[14]-e.z,v=d*r+p*l,k=n[u];if(n[u]=v,!i||!(k>v)||v<=0)return;const M=(k-v)/c;if(v/M>D0||k/M<=D0)return;const w=d*l-p*r,y=Math.hypot(w,g);y>K0||Math.abs(s-U0)<o2||(U0=s,Uc={pan:-.85*Math.max(-1,Math.min(1,w/60)),near:1-y/K0,big:f})}}}const Nm=`
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
`;function c2(t){const n=t?64:96,e=[0];for(let c=5;c<4500;c=c<50?c+5:c*(t?1.12:1.07))e.push(c);e.push(4500);const o=new Float32Array(e.length*n*3);e.forEach((c,i)=>{for(let r=0;r<n;r++){const l=r/n*Math.PI*2;o.set([c*Math.cos(l),0,c*Math.sin(l)],(i*n+r)*3)}});const a=[];for(let c=e.length-2;c>=0;c--)for(let i=0;i<n;i++){const r=c*n+i,l=c*n+(i+1)%n;a.push(r,r+n,l,l,r+n,l+n)}const s=new ht;return s.setAttribute("position",new F(o,3)),s.setIndex(a),s}const Me=8;function zm(t,n,e,o,a){const s=n-t;if(s<=1||a<=t+4)return Number.NaN;const c=Math.min(1,Math.pow((a-t)/s,1/1.5)),i=e*W(.2,.55,o);return i+c*(e-i)}function Cm(t,n){const e=Z(t),o=$.road(e);if(o<.02)return null;const a=_t(t),s=en(t),c=a-$.roadDepth(e),i=zm(Em(t),a,ln(t),s,c);return Number.isNaN(i)?null:(n.lat=i,n.y=c,n.amount=o,n)}function Em(t){const n=_t(t);return W(n-W(150,240,en(t))-pa(t),Y(t)-13,Zs(t))}const r2=2.6,l2=60,Lm=[];for(const t of an.segs)t.k===0||Math.abs(t.k*t.len)<r2||Lm.push({x:t.x+Math.cos(t.th)/t.k,z:t.z-Math.sin(t.th)/t.k,r:Math.abs(1/t.k)-l2,u:t.u0});function h2(t,n,e){const o=an,a=Math.round((n+o.oz-o.bz)/o.endZ);for(let s=a-1;s<=a+1;s++)for(const c of Lm){const i=s*o.endX-o.ox+c.x,r=s*o.endZ-o.oz+c.z,l=Math.hypot(t-i,n-r)/c.r;if(l>=1)continue;const u=s*bn-cn+c.u,h=_t(u)-W(150,240,en(u+300))-pa(u+300),f=_t(u)+70+50*(Ft(t/70,n/70,3,91)-.5);let m=h+(f-h)*Math.pow(1-l*l,.6)+40*(Ft(t/45,n/45,3,94)-.5)*(1-l);const d=(m-h)/45+.8*(Ft(t/90,n/90,2,93)-.5);m=W(m,h+(Math.floor(d)+R(.55,1,d-Math.floor(d)))*45,.85),m>e&&(e=W(e,m,1-R(.75,1,l)))}return e}const u2=128,m2=1024,V0=new Map,Li={s:0,lat:0,dist:0},q0=1e-6;function d2(t,n,e,o,a){const s=Math.floor((o+cn)/bn),c=Math.floor((a+cn)/bn);let i=1/0;for(let l=s;l<=c;l++){const u=l*t.endX-t.ox,h=l*t.endZ-t.oz,f=l*bn-cn;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||(i=Math.min(i,Math.hypot(n-u-m.bx,e-h-m.bz)+m.br))}}let r=1/0;for(let l=s;l<=c;l++){const u=l*t.endX-t.ox,h=l*t.endZ-t.oz;if(Math.hypot(n-u-t.bx,e-h-t.bz)-t.br>i+q0)continue;const f=l*bn-cn;for(const m of t.segs){const d=f+m.u0;d>a||d+m.len<o||Math.hypot(n-u-m.bx,e-h-m.bz)-m.br>i+q0||(g1(m,n-l*t.endX+t.ox-m.x,e-l*t.endZ+t.oz-m.z,Math.max(0,o-d),Math.min(m.len,a-d),Li),Li.dist<r&&(r=Li.dist),r<i&&(i=r))}}return r}const W0=new WeakMap;function f2(t,n,e){let o=W0.get(t);o||W0.set(t,o=new Map);const a=n*4096+e,s=o.get(a);if(s)return s;const c=t.segs[e],i=n*t.endX-t.ox+c.x,r=n*t.endZ-t.oz+c.z,l=Math.sin(c.th),u=Math.cos(c.th),h={x:i,z:r,s0:n*bn-cn+c.u0,len:c.len,k:c.k,th:c.th,sin:l,cos:u,cx:c.k===0?0:i+u/c.k,cz:c.k===0?0:r-l/c.k,r:c.k===0?0:Math.abs(1/c.k),sg:Math.sign(c.k),bx:n*t.endX-t.ox+c.bx,bz:n*t.endZ-t.oz+c.bz,br:c.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return Y0(t,n,e,-1,h,"p",c.k===0),Y0(t,n,e,1,h,"n",c.k===0),o.set(a,h),h}function g2(t,n,e,o,a){const s=o*Math.SQRT2/2,c=(n+.5)*o,i=(e+.5)*o,r=Math.round((i+t.oz-t.bz)/t.endZ),l=d2(t,c,i,(r-3)*bn-cn,(r+4)*bn-cn),u=l+2*s+a,h=[];for(let m=r-3;m<=r+4;m++){const d=m*t.endX-t.ox,g=m*t.endZ-t.oz;if(Math.hypot(c-d-t.bx,i-g-t.bz)-t.br>u)continue;const p=t.segs.length-1;for(let v=0;v<=p;v++){const k=t.segs[v];Math.hypot(c-d-k.bx,i-g-k.bz)-k.br>u||h.push(f2(t,m,v))}}const f=h.map(m=>({c:m,d:Math.hypot(c-m.bx,i-m.bz)-m.br}));return f.sort((m,d)=>m.d-d.d),{far:l-s>600,cands:f.map(m=>m.c)}}function Y0(t,n,e,o,a,s,c){const i=t.segs.length-1;for(let r=0;r<=i;r++){e+=o,e<0?(e=i,n--):e>i&&(e=0,n++);const l=t.segs[e];if(l.k===0){if(c)continue;return}const u=n*t.endX-t.ox+l.x+Math.cos(l.th)/l.k,h=n*t.endZ-t.oz+l.z-Math.sin(l.th)/l.k;s==="p"?(a.pcx=u,a.pcz=h,a.pr=Math.abs(1/l.k)):(a.ncx=u,a.ncz=h,a.nr=Math.abs(1/l.k));return}}function X0(t,n,e,o,a,s,c){const i=Math.floor(e/a),r=Math.floor(o/a),l=(i*1000003+r)*2+s;let u=t.get(l);return u||t.set(l,u=g2(n,i,r,a,c)),u}function p2(t,n,e,o){const a=`${e}`;let s=V0.get(a);(!s||s.size>4e4)&&V0.set(a,s=new Map);const c=X0(s,o,t,n,m2,1,e);return c.far?c.cands:X0(s,o,t,n,u2,0,e).cands}const za=30;function ba(t,n,e,o,a=an){const s=p2(t,n,e,a);let c=1/0,i=0,r=0;for(const u of s){if(Math.hypot(t-u.bx,n-u.bz)-u.br>c+e)continue;let h,f,m=1/0;if(u.k===0){const M=t-u.x,w=n-u.z;h=M*u.sin+w*u.cos,f=M*u.cos-w*u.sin}else{const M=t-u.cx,w=n-u.cz;let x=Math.atan2(u.sg*w,-u.sg*M)-u.th;if(x-=2*Math.PI*Math.round((x-u.k*u.len/2)/(2*Math.PI)),h=x/u.k,m=Math.hypot(M,w),f=u.sg*(u.r-m),m<za){const b=j0[r++]??={s:0,lat:0,dist:0,prom:0,core:0};b.s=u.s0+u.len/2,b.lat=0,b.dist=u.r-m,b.prom=0,b.core=1-m/za*(m/za)*(3-2*m/za)}m+=u.r}if(h<-.01||h>u.len+.01)continue;const d=Math.abs(f);if(d>c+e)continue;d<c&&(c=d);const g=u.s0+Math.min(u.len,Math.max(0,h));let p=!1;for(let M=0;M<i;M++)Math.abs(o[M].s-g)<.5&&(p=!0);if(p)continue;let v=m-d;u.pr>0&&(v=Math.min(v,Math.hypot(t-u.pcx,n-u.pcz)+u.pr-d)),u.nr>0&&(v=Math.min(v,Math.hypot(t-u.ncx,n-u.ncz)+u.nr-d));const k=o[i]??={s:0,lat:0,dist:0,prom:0,core:0};k.s=g,k.lat=f,k.dist=d,k.prom=Math.max(0,v),k.core=0,i++}let l=0;for(let u=0;u<i;u++){if(o[u].dist>c+e)continue;const h=o[l],f=o[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=0,l++}for(let u=0;u<r;u++){const h=o[l++]??={s:0,lat:0,dist:0,prom:0,core:0},f=j0[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=f.core}return l}const j0=[],Z0=[];function Pe(t,n,e,o){const a=ba(t,n,0,Z0);for(let s=0;s<a;s++){const c=Z0[s];if(c.core===0&&Math.abs(c.s-e)<=Math.abs(o)+80)return!0}return!1}const Pm=380,_m=160,v2=220,Rm=250,y2=150,ft={x:0,z:0,n210:NaN,n90:NaN,roll:NaN,ridge:NaN};function b2(t,n){ft.x=t,ft.z=n,ft.n210=ft.n90=ft.roll=ft.ridge=NaN}const w2=()=>Number.isNaN(ft.n210)?ft.n210=Ft(ft.x/210,ft.z/210,3,21):ft.n210,Hr=t=>t>10?36*(w2()-.5)*R(10,90,t):0,Im=(t,n)=>t.rise?t.rise(n):v2,Hm=(t,n)=>t.fall?t.fall(n):Rm,Xo=(t,n)=>Y(n)-t.shelf(Z(n));function Vc(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.min(t,n)-o*o*e/4}const x2=40,M2=.6,k2=2.1,S2=16;function T2(t,n,e,o,a){if(!t.wall)return a;const s=Z(n),c=t.wall(s);if(c<=0)return a;const i=e*yo(n+t.wallRef(s)-s,150)>0?o:-o,r=t.wallLip?.(s)??x2,l=r-i;let u=Y(n)-9.1-(l>0?k2:M2)*l;i>r-4&&(u-=S2*R(.42,.62,Ft(ft.x/55,ft.z/55,2,33))*R(r-4,r+18,i));const h=_t(n)-t.wallTop(s)+.5*Hr(o);return W(a,Math.max(a,Vc(u,h,25)),c)}function A2(t,n,e,o){const a=Z(n),s=Y(n)-t.shelf(a),c=o-t.bench(a);if(c<=0)return Number.isNaN(ft.n90)&&(ft.n90=Ft(ft.x/90,ft.z/90,2,71)),s+1.2*(ft.n90-.5);const i=_t(n)-Pm,r=yo(n,150),l=e*r>0?t.hill(a)*R(5e-4,.002,Math.abs(r)):0;let u=s+(i-s)*(1-Math.exp(-c/Hm(t,a)));const h=t.crown?.(a)??0;h>0&&(u=W(u,s+(i-s)*(1-Math.exp(-((c/y2)**2))),h));const f=s+_m*(1-Math.exp(-c/Im(t,a)));let m=W(u,f,l)+Hr(c);const d=R(260,800,c);d>0&&(Number.isNaN(ft.roll)&&(ft.roll=Ft(ft.x/650,ft.z/650,3,5)),m=Math.max(m,i+d*(20+320*R(.38,.78,ft.roll))));const g=R(1200,5e3,c);return g>0&&(Number.isNaN(ft.ridge)&&(ft.ridge=Ic(ft.x/3200,ft.z/3200,5,9)),m+=g*(250+1150*ft.ridge)),m}const N2=1.7,je=2*Math.PI,z2=t=>t-je*Math.round(t/je),As=[];if($.hillside)for(const t of an.segs){if(t.k===0||Math.abs(t.k*t.len)<N2)continue;const n=t.x+Math.cos(t.th)/t.k,e=t.z-Math.sin(t.th)/t.k,o=Le(t,0),a=Le(t,t.len/2),s=Math.atan2(o.z-e,o.x-n);As.push({cx:n,cz:e,r:Math.abs(1/t.k),len:t.len,u0:t.u0,a0:s,sgn:Math.sign(z2(Math.atan2(a.z-e,a.x-n)-s))})}const J0=new Map;function C2(t,n,e,o){const a=e*64+n;let s=J0.get(a);if(s===void 0){s=-1/0;for(let c=0;c<=As[n].len;c+=20)s=Math.max(s,Xo(t,o+c));J0.set(a,s)}return s}function E2(t,n,e,o,a){const s=Math.round((e+an.oz-an.bz)/an.endZ);for(let c=s-1;c<=s+1;c++)for(let i=0;i<As.length;i++){const r=As[i],l=c*an.endX-an.ox+r.cx,u=c*an.endZ-an.oz+r.cz,h=Math.hypot(n-l,e-u);if(h>r.r+4*Rm)continue;const f=c*bn-cn+r.u0,m=r.r-t.bench(Z(f+r.len/2))-8,d=R(5,45,a);if(h>=m&&d<=0)continue;let g=r.sgn*(Math.atan2(e-u,n-l)-r.a0)%je;g<0&&(g+=je);const p=g*r.r;let v,k;if(p<=r.len)v=Xo(t,f+p),k=t.bench(Z(f+p));else{const x=(p-r.len)/(je*r.r-r.len),b=f+p-je*r.r;v=W(Xo(t,f+p),Xo(t,b),x),k=W(t.bench(Z(f+p)),t.bench(Z(b)),x)*(1-Math.sin(Math.PI*x))}const M=r.r-h;let w;if(M>k){const x=C2(t,i,c,f),b=W(v,x,R(m,.25*r.r,h)),A=Im(t,Z(f+Math.min(p,r.len)));w=Math.min(b+_m*(1-Math.exp(-(M-k)/A)),x+t.peak(Z(f)))+Hr(M-k)}else if(M>=-k)w=v;else{const x=_t(f)-Pm;w=v+(x-v)*(1-Math.exp(-(-M-k)/Hm(t,Z(f+Math.min(p,r.len)))))}const y=Math.max(o,W(o,w,d));o=h<m?W(y,w,1-R(m-30,m,h)):y}return o}const Q0=200,L2=60,P2=1.5,tl=10,_2=1.6,Pi=[];function R2(t,n,e){const o=$.hillside;b2(t,n);const a=ba(t,n,Q0,Pi);let s=1/0;for(let f=0;f<a;f++){const m=Pi[f];m.core===0&&m.dist<s&&(s=m.dist,e.s=m.s,e.lat=m.lat)}let c=0,i=0,r=0;for(let f=0;f<a;f++){const m=Pi[f];if(m.core>0)continue;const d=(1-R(0,Q0,m.dist-s))*(R(0,L2,m.prom)+1e-4);d<=0||(c+=d*A2(o,m.s,m.lat,m.dist),o.mist&&(i+=d*o.mist(Z(m.s))),r+=d)}e.mist=i/r;const l=s-o.bench(Z(e.s));c=E2(o,t,n,c/r,l);const u=Xo(o,e.s)+40+P2*Math.max(0,l);c>u-30&&(c=Vc(c,u,30)),c=T2(o,e.s,e.lat,s,c);const h=Y(e.s)-9.1+_2*Math.max(0,s-tl);return s<tl?c=Math.min(c,h):c>h-6&&(c=Vc(c,h,6)),e.vil=Qt(e.s)*(1-R(0,25,s-o.bench(Z(e.s)))),e.h=c,e}const nl=24,Fn=520,Co=15,I2=14,el=200,H2=60,at={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},Be={n210:()=>Number.isNaN(at.n210)?at.n210=Ft(at.x/210,at.z/210,3,21):at.n210,n700:()=>Number.isNaN(at.n700)?at.n700=Ft(at.x/700,at.z/700,3,5):at.n700,n500:()=>Number.isNaN(at.n500)?at.n500=Ft(at.x/500,at.z/500,2,3):at.n500,out:()=>Number.isNaN(at.out)?at.out=90*Ic(at.x/800,at.z/800,4,7)+30*(Ft(at.x/160,at.z/160,3,11)-.5):at.out,far:()=>Number.isNaN(at.far)?at.far=250+1150*Ic(at.x/3200,at.z/3200,5,9):at.far,n90:()=>Number.isNaN(at.n90)?at.n90=Ft(at.x/90,at.z/90,2,71):at.n90},ut={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function G2(t,n){const{o:e,ty:o,w:a,sill:s,fly:c,vil:i,xd:r,ra:l,rd:u}=ut,h=W(o-W(150,240,e)-r,c-13,s),f=En(r/190),m=o-h;let d;if(t<=a){const y=a*W(.2,.55,e),x=En((t-y)/(a-y));d=h+m*W(Math.pow(x,1.5),x*x*(3-2*x),e),e>0&&(d+=e*34*(Be.n210()-.35)*R(25,110,t))}else{const y=En((t-a)/W(280,700,e));d=o+(W(400,-50,e)-260*f+140*(Be.n700()-.5))*(1-(1-y)*(1-y))}const g=R(a*.9,a*1.25,t),p=R(Co+8,Co+22,t)*(1-g)*(1-e),v=W(nl,nl*.5,p),k=Math.max(.7*g,.85*p)*(1-.6*f);if(k>0){const y=(d+30*(Be.n500()-.5))/v;d=W(d,(Math.floor(y)+R(.45,1,y-Math.floor(y)))*v,k)}g>0&&(d+=g*Be.out());const M=R(a+900,a+5e3,t);if(M>0&&(d+=M*Be.far()),l>.02&&n>0){const y=o-u,x=zm(h,o,a,e,y);if(!Number.isNaN(x)){const b=l*R(x-3,x-.5,t)*(1-R(x+Me+1,x+Me+4,t));b>0&&(d=Math.min(d,W(d,y-.4,b)))}}const w=i*(1-R(240,380,t));if(w>0&&(d=W(d,c-Yo+1.6*(Be.n90()-.5)-.012*Math.max(0,t-40),w)),d-=6*(1-R(0,18,t))*(d<h+20?1-s:0),t<Co){const y=W(I2+(Co-t)*2,11+(Co-t)*.3,s);d=Math.min(d,c-W(y,Yo+.4,i))}return d}const _i=[],ol=[],al=new Map,Ca=181/Fn;function B2(t,n){const e=t*100003+n;let o=al.get(e);if(o!==void 0)return o;const a=(t+.2+.6*C(t,n,61))*Fn,s=(n+.2+.6*C(t,n,62))*Fn,c=70+110*C(t,n,63),i=ba(a,s,0,ol)>0?ol[0]:null;if(!i||en(i.s)<.6||i.dist<c+45)o=null;else{const r=Fc(i.s);o={ox:a,oz:s,r:c,floor:r,peak:_t(i.s)-200+230*C(t,n,64)}}return al.set(e,o),o}function F2(t,n,e){const o=Math.floor(t/Fn),a=Math.floor(n/Fn),s=t/Fn-o,c=n/Fn-a;for(let i=-1;i<=1;i++)if(!(i<0&&c+.2>=Ca||i>0&&1.2-c>=Ca))for(let r=-1;r<=1;r++){if(r<0&&s+.2>=Ca||r>0&&1.2-s>=Ca)continue;const l=o+r,u=a+i,h=(l+.2+.6*C(l,u,61))*Fn,f=(u+.2+.6*C(l,u,62))*Fn,m=Math.hypot(t-h,n-f)/(70+110*C(l,u,63));if(m>=1)continue;const d=B2(l,u);if(!d)continue;const g=d.floor+(d.peak-d.floor)*Math.pow(1-m*m,.6);g>e&&(e=W(e,g,1-R(.8,1,m)))}return e}function sa(t,n,e){if(!Number.isFinite(t+n))return e.h=e.s=e.lat=e.vil=e.mist=NaN,e;if($.hillside)return R2(t,n,e);at.x=t,at.z=n,at.n210=at.n700=at.n500=at.out=at.far=at.n90=NaN;const o=ba(t,n,el,_i);let a=1/0;for(let c=0;c<o;c++){const i=_i[c];i.core===0&&i.dist<a&&(a=i.dist,e.s=i.s,e.lat=i.lat)}ut.o=ut.ty=ut.w=ut.sill=ut.fly=ut.vil=ut.xd=ut.ra=ut.rd=0;let s=0;for(let c=0;c<o;c++){const i=_i[c],r=(1-R(0,el,i.dist-a))*(i.core>0?i.core:R(0,H2,i.prom)+1e-4);if(r<=0)continue;s+=r,ut.o+=r*en(i.s),ut.ty+=r*_t(i.s),ut.w+=r*ln(i.s),ut.sill+=r*Zs(i.s),ut.fly+=r*Y(i.s),ut.vil+=r*Qt(i.s),ut.xd+=r*pa(i.s);const l=Z(i.s);ut.ra+=r*$.road(l),ut.rd+=r*$.roadDepth(l)}return ut.o/=s,ut.ty/=s,ut.w/=s,ut.sill/=s,ut.fly/=s,ut.vil/=s,ut.xd/=s,ut.ra/=s,ut.rd/=s,e.vil=ut.vil,e.mist=0,e.h=h2(t,n,F2(t,n,G2(a,e.lat))),e}const $2={h:0,s:0,lat:0,vil:0,mist:0};function rt(t,n){return sa(t,n,$2).h}const de=`
// mod 289 TRƯỚC khi nhân (adviser 01/11): ván dài 9 km+ → p·456 ≈ 2,5 triệu, float32 còn bước 0,25 → fract chỉ ra
// 4 giá trị, nhiễu thành ô khối. Lưới số nguyên mod 289 vẫn liền (nhiễu lặp chu kỳ 289 ô — 2 km với ô 7 m, không lộ).
float gnHash(vec2 p) {
  p = mod(p, 289.0);
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
// 4 góc ô băm MỘT lượt vec4, đúng phép tính của gnHash ở từng thành phần (mod 289 → × (123,34; 456,21) → cộng
// dot(p, p + 45,32) → fract(x·y)). Lý do (đo 04/11, ANGLE/D3D11): gnNoise chạy 12–28 lần mỗi điểm ảnh địa hình, và FXC
// dịch 4 lời gọi gnHash vô hướng chậm hơn hẳn một khối vec4 — program địa hình dịch nhanh hơn 16–30% ở mọi map
// (docs/debugging/2026-11-04-sky-run-boot-cham-suoi-mcc.md, Vòng 4). Viết lại kiểu này CHỈ trong một khúc (suối MCC)
// thì không nhanh hơn: phải đổi chính hàm dùng chung. Đổi gnHash thì đổi CẢ ở đây — gnPlots vẫn gọi gnHash.
float gnNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  vec4 hx = fract(mod(i.xxxx + vec4(0.0, 1.0, 0.0, 1.0), 289.0) * 123.34);
  vec4 hy = fract(mod(i.yyyy + vec4(0.0, 0.0, 1.0, 1.0), 289.0) * 456.21);
  vec4 d = hx * (hx + 45.32) + hy * (hy + 45.32);
  vec4 h = fract((hx + d) * (hy + d));
  return mix(mix(h.x, h.y, u.x), mix(h.z, h.w, u.x), u.y);
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
`,Gr=`
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
`,Gm=`
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
`,O2=`
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
`,D2=`
${Gm}
${O2}
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
`,K2=`
#include <fog_pars_vertex>
varying vec3 vWorld;
#ifdef CLOUD_DECK
${de}
uniform float uTime;
uniform vec4 uEye;
${Gr}
${Nm}
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
}`,U2=`
#include <fog_pars_fragment>
${de}
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
${Gr}
${D2}
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
}`;function Bm(t,n=!1){return new Tt({vertexShader:K2,fragmentShader:U2,defines:{...t?{CLOUD_LITE:1}:{},...n?{CLOUD_DECK:1}:{}},uniforms:Rn.merge([In.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new tn(0,1)},uUnder:{value:0},uSolid:{value:n?1:0},uEye:{value:new ys},uGate:{value:new ys},uGateK:{value:new tn}}]),transparent:!0,depthWrite:!1,fog:!0,side:n?zt:Su})}function V2(t){const n=new L,e=Bm(t),o=new X(new _n(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return o.frustumCulled=!1,o.renderOrder=1,{mesh:o,veil:()=>0,update(a,s,c){const i=a.position;a.getWorldDirection(n),e.uniforms.uFwd.value.set(n.x,n.z).normalize();const r=c+250,l=en(r);o.position.set(i.x,Fc(r)+20+(_t(r)-($.cloudDepth??170)-Fc(r)-20)*l,i.z),km.value=o.position.y,e.uniforms.uTime.value=s,e.uniforms.uCover.value=.62-.1*l+.5*(1-$.cloud(Z(r)))}}}const q2=`
#include <fog_pars_fragment>
${de}
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
}`,W2=`
#include <fog_pars_vertex>
${de}
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
${Gr}
${Gm}
${Nm}
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
}`,Y2={cell:90,rings:8,subs:8},X2={cell:110,rings:5,subs:4},j2=650;function Z2(t,n){const e=n?X2:Y2,o=[];for(let m=-e.rings;m<=e.rings;m++)for(let d=-e.rings;d<=e.rings;d++)if(!(m*m+d*d>(e.rings+.5)**2))for(let g=0;g<e.subs;g++)o.push(m,d,g);const a=o.length/3,s=new Wf;s.setAttribute("position",new F(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),s.setIndex([0,1,2,0,2,3]),s.setAttribute("aCell",new Sr(new Float32Array(o),3)),s.instanceCount=0;const c=new tn,i={value:0},r={value:1},l=t.uniforms.uTime,u={...Rn.merge([In.fog]),uOrigin:{value:c},uCell:{value:e.cell},uReach:{value:e.cell*(e.rings+.5)},uDeckY:i,uSide:r,uTime:l,uCover:t.uniforms.uCover,uEye:t.uniforms.uEye,uGate:t.uniforms.uGate,uGateK:t.uniforms.uGateK,uWallL:t.uniforms.uWallL,uWallR:t.uniforms.uWallR},h=new Tt({vertexShader:W2,fragmentShader:q2,defines:n?{CLOUD_LITE:1}:{},uniforms:u,fog:!0,side:zt}),f=new X(s,h);return f.name="cloud-billows",f.frustumCulled=!1,{mesh:f,update(m,d,g){const p=m.y-d;if(s.instanceCount=g&&Math.abs(p)<j2?a:0,s.instanceCount===0)return;const v=l.value;c.set(Math.floor((m.x+2.6*v)/e.cell),Math.floor((m.z+1.3*v)/e.cell)),i.value=d,r.value=p>=0?1:-1}}}const Wn=72,Ri=.9,J2=.92;function Q2(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");let e=11;const o=()=>(e=e*16807%2147483647)/2147483647;for(let a=0;a<70;a++){const s=32+(o()+o()-1)*24,c=1-Math.abs(s-32)/30,i=32+(o()+o()-1)*9*c+2.5*Math.sin(s/9),r=(6+16*o())*(.5+.5*c),l=1+2*o();n.save(),n.translate(s,i),n.rotate((o()-.5)*.25),n.scale(r/2,l/2);const u=n.createRadialGradient(0,0,0,0,0,1);u.addColorStop(0,`rgba(255,255,255,${.12+.22*o()*c})`),u.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=u,n.beginPath(),n.arc(0,0,1,0,Math.PI*2),n.fill(),n.restore()}n.globalCompositeOperation="destination-out";for(let a=0;a<6;a++)n.fillStyle="rgba(0,0,0,0.5)",n.beginPath(),n.ellipse(14+36*o(),32+(o()-.5)*10,2+3*o(),1+1.5*o(),0,0,Math.PI*2),n.fill();return new fa(t)}function tv(t){const n=new Yf({size:2.6,map:Q2(),color:15922683,transparent:!0,depthWrite:!1,fog:!0});return n.onBeforeCompile=e=>{e.uniforms.uPilotNdc={value:t},e.vertexShader=e.vertexShader.replace("void main() {",`attribute float aSize;
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
  diffuseColor.a *= vClear;`)},n.customProgramCacheKey=()=>"cloud-burst-wisp-clear",n}function nv(t){const n=new Float32Array(Wn*3),e=new Float32Array(Wn*3),o=new Float32Array(Wn),a=new Float32Array(Wn),s=new ht;s.setAttribute("position",new F(n,3)),s.setAttribute("aSize",new F(o,1)),s.setAttribute("aRot",new F(a,1));const c=tv(t),i=new bs(s,c);i.name="cloud-burst",i.frustumCulled=!1,i.renderOrder=2,s.setDrawRange(0,0);let r=Ri,l=1;const u=new L,h=new L;return{object:i,fire(f,m,d,g){r=0,l=1-.6*g,s.setDrawRange(0,Wn),s.attributes.aSize.needsUpdate=!0,s.attributes.aRot.needsUpdate=!0,u.set(0,1,0).cross(m),u.lengthSq()<.01&&u.set(1,0,0),u.normalize(),h.copy(m).cross(u).normalize();for(let p=0;p<Wn;p++){const v=p/Wn*Math.PI*2+Math.random()*.4,k=4+5*Math.random(),M=5+10*Math.random(),w=6+8*Math.random(),y=p*3;o[p]=.5+1.5*Math.random()**2,a[p]=-v+(Math.random()-.5)*.5;for(let x=0;x<3;x++){const b=u.getComponent(x)*Math.cos(v)+h.getComponent(x)*Math.sin(v);n[y+x]=f.getComponent(x)+m.getComponent(x)*w+b*k,e[y+x]=d.getComponent(x)*J2+b*M}}},update(f){if(r>=Ri){s.setDrawRange(0,0);return}r+=f;const m=Math.exp(-2.6*f);for(let g=0;g<Wn*3;g++)n[g]+=e[g]*f,e[g]*=m;s.attributes.position.needsUpdate=!0;const d=r/Ri;c.opacity=Math.max(0,1-d)**1.3*.62,c.color.setScalar(.96*l),c.size=3.2+4*d}}}function ev(t){const n=new L(0,-.1,1),e=new L,o=new L;let a=null,s=0;return{ndc:n,update(c){!a&&t.parent&&s++%30===0&&t.parent.traverse(i=>{!a&&i.isSkinnedMesh&&(a=i)}),a?a.getWorldPosition(e):e.copy(c.position).addScaledVector(c.getWorldDirection(o),11),e.project(c),n.set(e.x,e.y,c.aspect)}}}const Ii=[-60,120,300,480,660],sl=30,ov=615,av=1215;function sv(){const t=Ii.map(()=>new L),n=Ii.map(()=>new L),e={x:0,y:0,z:0},o=(s,c,i)=>(D(s,c,0,e),rt(e.x,e.z)>i),a=(s,c,i,r)=>{let l=0;for(let u=15;u<=av;u+=u<ov?sl:2*sl){if(o(s,c*u,i)){let h=u;for(let f=0;f<3;f++){const m=(l+h)/2;o(s,c*m,i)?h=m:l=m}D(s,c*h,0,e),r.set(e.x,e.z,1);return}l=u}r.set(0,0,0)};return{left:t,right:n,update(s,c){Ii.forEach((i,r)=>{a(s+i,-1,c,t[r]),a(s+i,1,c,n[r])})}}}const iv=900,cv=650,Hi=.5,rv=1.2,lv=.25,Eo=.2,Gi=.5,il=.4;function hv(){const t=new WeakMap,n=new WeakSet,e=new L,o=new L;let a=-1e9,s=null;return{scan(c,i,r){for(const l of c?.gates??[])(l.hit||l.missed)&&!t.has(l)&&(t.set(l,i),l.missed&&(a=i)),l.hit&&!n.has(l)&&r>=l.z&&(n.add(l),s=l)},layer(c,i,r,l,u){const h=c.uniforms.uGateK.value,f=r?.gates.find(M=>M.deck===i&&M.z>l-80);if(!r||!f)return h.set(0,0),0;const m=u-(t.get(f)??u);f.hit?h.set(1-Ea(Hi,Hi+rv,m),1.5*Ea(0,Hi,m)):f.missed?h.set(Math.max(0,1-m/lv),0):h.set(1-Ea(cv,iv,f.z-l),0);const d=St(f.lane);D(f.z,d,0,e),D(f.z+2,d,0,o);const g=o.x-e.x,p=o.z-e.z,v=Math.hypot(g,p)||1;return c.uniforms.uGate.value.set(e.x,e.z,g/v,p/v),f.hit||!f.missed&&Math.abs(r.x-d)<=_.gateRadiusX?1-Ea(30,55,Math.abs(l-f.z)):0},hold(c){const i=c-a;return i<0||i>Eo+Gi+il?0:i<Eo?i/Eo:i<Eo+Gi?1:1-(i-Eo-Gi)/il},takeTear(){const c=s;return s=null,c}}}function Ea(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}const La=700,Jt={x:70,y:36,z:70},uv=new L(4,-26,0);function mv(){const t=new Float32Array(La*3);for(let l=0;l<La*3;l++)t[l]=Math.random();const n=new Float32Array(La*6),e=new ht;e.setAttribute("position",new F(n,3));const o=new Tu({color:13162220,transparent:!0,opacity:0,depthWrite:!1,fog:!0}),a=new Au(e,o);a.frustumCulled=!1,a.renderOrder=3;const s=new L,c=new L,i=new L;let r=!1;return{object:a,update(l,u,h,f){if(a.visible=h>.02,!a.visible){r=!1;return}const m=l.position;r&&u>0&&c.subVectors(m,s).divideScalar(u),s.copy(m),r=!0,i.copy(uv).sub(c);const d=Math.min(3.2,1.6+i.length()/60);i.normalize().multiplyScalar(d);for(let g=0;g<La;g++){const p=g*3;t[p+1]=(t[p+1]-26*u/Jt.y+1)%1;const v=m.x+((t[p]*Jt.x-m.x)%Jt.x+Jt.x)%Jt.x-Jt.x/2,k=m.y+t[p+1]*Jt.y-Jt.y/2,M=m.z+((t[p+2]*Jt.z-m.z)%Jt.z+Jt.z)%Jt.z-Jt.z/2,w=g*6;n[w]=v,n[w+1]=k,n[w+2]=M,n[w+3]=v+i.x,n[w+4]=k+i.y,n[w+5]=M+i.z}e.attributes.position.needsUpdate=!0,o.opacity=.32*h*(1-.5*f)}}}const dv=18,fv=7,cl=.86,gv=1.2;let Ns=!1;function pv(){const t=Ns;return Ns=!1,t}function vv(t,n){const e=new wt,o=c2(n),a=t.map(M=>{const w=Bm(n,!0),y=new X(o,w);y.frustumCulled=!1,y.renderOrder=1,e.add(y);const x=sv();w.uniforms.uWallL={value:x.left},w.uniforms.uWallR={value:x.right};const b=Z2(w,n);return e.add(b.mesh),{deck:M,mesh:y,material:w,billows:b,walls:x}});let s=0;const c=a.map(()=>-1e9),i=$.rain?mv():null;i&&e.add(i.object);const r=ev(e),l=nv(r.ndc);e.add(l.object);const u=hv(),h=new L,f=new L,m=new L,d=new L;let g=!1,p=-1,v=0,k=0;return{mesh:e,veil:()=>v,update(M,w,y,x){const b=M.position;u.scan(x,w,y);const A=Z(y);$.waterLevel!==void 0&&(Rr.value=_t(y)+$.waterLevel);const z=Math.min(.1,Math.max(0,w-k));i?.update(M,z,$.rain?.(A)??0,0),l.update(z),z>0&&d.subVectors(M.position,f).divideScalar(z).clampLength(0,120),f.copy(M.position),k=w,v=0;let E=0,T=-1;const N=d.y>0?1:-1;s++,a.forEach(({deck:P,mesh:I,material:G,billows:K,walls:V},j)=>{const J=P.cover(A),q=_t(y)+P.level(A);if(j<2&&(Ss.value[j*2]=q,Ss.value[j*2+1]=J),I.visible=J>.02,!I.visible){K.update(b,q,!1);return}I.position.set(b.x,q,b.z),Math.abs(b.y-q)<450&&((s+j*2)%4===0||Math.abs(y-c[j])>40)&&(V.update(y,q),c[j]=y),G.uniforms.uCover.value=1.1-.75*J,G.uniforms.uTime.value=w,G.uniforms.uUnder.value=Math.min(1,Math.max(0,(q-b.y)/6+.5));let et=0;if(P.eye){let Nt=Mn(y)*lt+P.eye.phase-Ht;y-Nt>lt/2&&(Nt+=lt),D(Nt,0,0,m),G.uniforms.uEye.value.set(m.x,m.z,P.eye.radius,P.eye.swirl*gv);const Lt=Math.exp(-Math.hypot(b.x-m.x,b.z-m.z)/P.eye.radius);et=Math.min(1,1.6*Lt*Lt)}const mt=u.layer(G,j,x,y,w),tt=(b.y-q)*N,Mt=(1-Math.min(1,tt<0?-tt/dv:tt/fv))**2,kt=J*(1-et)*(1-mt)*Mt;kt>E&&(E=kt,T=j),K.update(b,q,J>.3)}),v=Math.max(cl*E,cl*u.hold(w));const S=u.takeTear();S&&(l.fire(b,M.getWorldDirection(h),d,0),S.deck===0&&S.up&&(Ns=!0)),E>.55?(g=!0,p=T):g&&E<.25&&(g=!1,l.fire(b,M.getWorldDirection(h),d,0),p===0&&N>0&&(Ns=!0)),l.object.geometry.drawRange.count>0&&r.update(M)}}}const Br=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],wa=[.8,.3,.16],Fm=[.6,.32,.22],Fr=[.9,.76,.45],$m=[.88,.84,.76],yv=[.2,.45,.36],$r=[.45,.25,.14],Om=[.58,.33,.24];function H(t,n,e=.1,o=1){const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv"),a.getAttribute("normal")||a.computeVertexNormals();const s=a.getAttribute("position"),c=new Float32Array(s.count*3),i=Br(n);for(let r=0;r<s.count;r++){const l=1-e/2+e*C(s.getX(r)*.8+o,s.getY(r)*.8+s.getZ(r)*.6,17);for(let u=0;u<3;u++)c[r*3+u]=i[u]*l}return a.setAttribute("color",new F(c,3)),a}const pt=t=>At(t);function ia(t,n,e,o){const a=t.getAttribute("position"),s=t.getAttribute("color");for(let c=0;c<a.count;c++){const i=o+(1-o)*Math.min(1,Math.max(0,(a.getY(c)-n)/(e-n)));s.setXYZ(c,s.getX(c)*i,s.getY(c)*i,s.getZ(c)*i)}return t}const xa=[1,.7,.32];function ti(t,n,e,o,a=0,s=[.55,.2,.12]){const c=[],i=Math.max(6,Math.round(t/.45)),r=Math.max(4,Math.round(Math.hypot(n,e)/.42)),l=Br(o);for(const u of[-1,1]){const h=[],f=[],m=[];for(let g=0;g<=r;g++){const p=g/r;for(let v=0;v<=i;v++){const k=(v/i-.5)*t,M=Math.pow(Math.abs(k)/(t/2),5);h.push(k,e*(1-p)+a*M*(.35+.65*p),u*n*p*(1+.06*M));const w=(v%2?1:.72)*(g%2?1:.88)*(.8+.35*C(k*.3,p*4+u,23));f.push(l[0]*w,l[1]*w,l[2]*w)}}for(let g=0;g<r;g++)for(let p=0;p<i;p++){const v=g*(i+1)+p;u>0?m.push(v,v+i+1,v+1,v+1,v+i+1,v+i+2):m.push(v,v+1,v+i+1,v+1,v+i+2,v+i+1)}const d=new ht;d.setAttribute("position",new F(new Float32Array(h),3)),d.setAttribute("color",new F(new Float32Array(f),3)),d.setIndex(m),d.computeVertexNormals(),c.push(d.toNonIndexed())}return c.push(H(new B(t+.3,.32,.42).translate(0,e+.05,0),s,.05)),pt(c)}function Dm(t,n,e,o,a){const s=n/2,c=[];for(const r of[-1,1]){const l=r*t/2;r>0?c.push(l,e,-s,l,e+o,0,l,e,s):c.push(l,e,-s,l,e,s,l,e+o,0)}const i=new ht;return i.setAttribute("position",new F(new Float32Array(c),3)),i.computeVertexNormals(),H(i,a,.08)}function bv(t,n,e,o=wa){const s=n-4.4-.25,c=[ti(t,3.8,4.4,o,2.2,xa).translate(0,s,0)];for(let i=-t/2+2;i<=t/2-2;i+=3.2)for(const r of[-2.6,2.6])c.push(H(new ct(.26,.3,s-e+6,6).translate(i,(s+e-6)/2,r),$r,.15,i));return c.push(H(new B(t-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),pt(c)}function wv(t,n={pillar:Om,wall:Fr,tile:wa}){const e=[];for(const o of[-1,1])e.push(H(new B(2.4,7-t+6,2.4).translate(o*11.2,(7+t-6)/2,0),n.pillar,.2,o)),e.push(H(new B(3,.5,3).translate(o*11.2,7.2,0),[.85,.8,.7],.08,o));return e.push(H(new B(22.4,1.6,1.6).translate(0,-.2,0),$r,.12)),e.push(H(new B(20,3.6,1.1).translate(0,2.4,0),n.wall,.1)),e.push(H(new B(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(H(new B(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(ti(27,2.2,4.4,n.tile,1.6).translate(0,5.3,0)),pt(e)}function xv(){const t=[ia(H(new B(.4,3.2,10).translate(0,0,0),Om,.22),-1.6,.6,.62),ti(10.2,.45,.35,wa).rotateY(Math.PI/2).translate(0,1.6,0)];for(let n=-5;n<=5;n+=2.5)t.push(ia(H(new B(.7,3.7,.7).translate(0,.25,n),[.5,.27,.2],.15,n),-1.6,.6,.6)),t.push(H(new B(.86,.26,.86).translate(0,2.2,n),[.9,.88,.82],.06,n));return pt(t)}const Mv={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function Km(t=Mv){const n=[H(new ct(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),t.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([o,a,s,c],i)=>{const r=new Hn(c,1).scale(1.15,.62,1.15).translate(o,a,s);r.deleteAttribute("uv"),r.computeVertexNormals();const l=r.getAttribute("position"),u=r.getAttribute("normal"),h=new Float32Array(l.count*3);for(let f=0;f<l.count;f++){const m=C(l.getX(f)*.9+i,l.getZ(f)*.9,l.getY(f)+31),d=u.getY(f)+(m-.5)*.7,g=d<-.05?t.under[0]:d<.12?t.under[1]:m<.6?t.flower[0]:t.flower[1],p=Br(g),v=.75+.35*Math.min(1,Math.max(0,(l.getY(f)-4.5)/4));h.set([p[0]*v,p[1]*v,p[2]*v],f*3)}r.setAttribute("color",new F(h,3)),n.push(r)}),pt(n)}const rl=[.5,.53,.56],Bi=[.22,.23,.25],Ze=8,Um=Math.PI/Ze,Yn=-7.4,Lo=t=>new ie(t.map(([n,e])=>new tn(n,e)),Ze,Um);function ll(t,n,e,o){const a=new L().subVectors(n,t),s=new B(e,e,a.length());return s.lookAt(a),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(s,o,.03,11)}function zs(t,n,e,o){const a=[];a.push(H(Lo([[2.25,.95],[1.95,1.55],[1.1,1.9],[0,1.92]]).translate(0,Yn,0),t,.05,o)),a.push(H(Lo([[2.25,-.85],[2.25,-.45]]).translate(0,Yn,0),t,.05,o+1)),a.push(H(Lo([[0,-1.9],[1.3,-1.9],[2,-1.5],[2.25,-.85]]).translate(0,Yn,0),n,.06,o+2)),a.push(H(Lo([[2.27,-.45],[2.27,.95],[1.97,1.5]]).translate(0,Yn,0),e,.03,o+3));for(let r=0;r<Ze;r++){const l=Um+r*Math.PI*2/Ze,u=2.3/Math.cos(Math.PI/Ze),h=new B(.2,1.45,.2).rotateY(l).translate(Math.sin(l)*u*.98,Yn+.25,Math.cos(l)*u*.98);a.push(H(h,Bi,.02,o+4))}a.push(H(Lo([[2.29,-.62],[2.29,-.5]]).translate(0,Yn,0),n,.02,o+5)),a.push(H(new ct(.75,1.05,.5,Ze).translate(0,Yn+2.15,0),Bi,.03,o+6));const s=new L(0,Yn+2.35,0),c=new L(.95,-2.3,0),i=new L(0,-.15,0);return a.push(ll(s,c,.3,rl),ll(c,i,.3,rl)),a.push(H(new B(.62,.55,1.5).translate(0,.05,0),Bi,.03,o+7)),pt(a)}const Vm={h:0,s:0,lat:0,vil:0,mist:0};function ni(t,n,e,o){return t>_t(n)-($.cloudDepth??170)+30?!1:sa(e,o,Vm).mist>.05}function kv(t,n,e,o){const a=_t(t)-($.cloudDepth??170);for(let s=0;s<5;s++){const c=s*Math.PI/2,i=sa(n+(s?o*Math.cos(c):0),e+(s?o*Math.sin(c):0),Vm);if(!(i.mist>=.5&&i.h<a))return!1}return!0}const hl=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],Sv=[.17,.31,.09],Tv=[.38,.58,.17],Av=[.6,.77,.26],Nv=[.36,.25,.16],ul=[.08,.17,.1],zv=[.3,.44,.21];function Cs(t){const n=t.index?t.toNonIndexed():t;return n.deleteAttribute("uv"),n}function qm(t,n,e,o){t.computeVertexNormals();const a=t.getAttribute("position"),s=t.getAttribute("normal"),c=new Float32Array(a.count*3),[i,r,l]=e.map(hl),u=hl(Nv);for(let h=0;h+2<a.count;h+=3){const f=(a.getX(h)+a.getX(h+1)+a.getX(h+2))/3,m=(a.getY(h)+a.getY(h+1)+a.getY(h+2))/3,d=(a.getZ(h)+a.getZ(h+1)+a.getZ(h+2))/3,g=C(f*.9+n,d*.9+m*.5,71),p=s.getY(h)+(g-.5)*.5,v=m<o&&Math.hypot(f,d)<.8,k=v?u:p<-.25?i:p<.35?r:l,M=(.88+.24*g)*(v?.8+.2*Math.min(1,m/o):1);for(let w=h;w<h+3;w++)c.set([k[0]*M,k[1]*M,k[2]*M],w*3)}return t.setAttribute("color",new F(c,3)),t}const Cv=[[0,7.3,0,3.5],[2.3,6.3,.9,2.4],[-2.1,6.5,-.7,2.5],[.4,9.5,-.3,2.2]];function ca(t,n=0){const e=[Cs(new ct(.28,.48,5.6,t?5:4,1,!0).translate(0,2.6,0).rotateZ(.05))];return Cv.forEach(([o,a,s,c],i)=>e.push(Cs(new Hn(c,i===0?t:0).scale(1,.86,1).translate(o,a,s)))),qm(At(e),n,[Sv,Tv,Av],4.2)}function Ev(){const t=ca(1,3).scale(1.12,1.12,1.12),n=ca(1,7).scale(.72,.78,.72).rotateY(1.9).translate(3.9,0,2.4);return At([t,n])}function ml(t){const n=[Cs(new ct(.22,.4,3.6,t>5?5:4,1,!0).translate(0,1.6,0))];for(const[s,c,i]of[[2.6,5,2.3],[2.15,4.6,5.3],[1.65,4.2,8.1],[1.1,3.9,10.7]])n.push(Cs(new ue(s,c,t,1).translate(0,i+c/2,0)));const e=At(n);qm(e,5,[ul,ul,zv],2.4);const o=e.getAttribute("position"),a=e.getAttribute("color");for(let s=0;s<o.count;s++){const c=.75+.5*Math.min(1,Math.max(0,o.getY(s)/14.6));a.setXYZ(s,a.getX(s)*c,a.getY(s)*c,a.getZ(s)*c)}return e}function Lv(t,n,e,o){const a=[];for(let s=0;s<o;s++){const c=s<Math.ceil(o/2),i=c?e-.6:-12.4+1.2*(C(s,t,42)-.5),r=t*2.3+s*2.39,l=c?n(i)*.7*C(s,t,43):n(i)*.92,u=c?.2+.06*C(s*1.3,t,44):.3+.1*C(s*1.3,t,44);a.push(ca(0,s+t).scale(u,u,u).rotateY(r).translate(Math.cos(r)*l,i,Math.sin(r)*l))}return At(a)}const Pv=250,_v=.5,Rv=1.4;function Iv(){return[ml(7),ca(1),ml(5),ca(0)]}const Ot={x:0,y:0,z:0};function Hv(t,n){return Math.hypot(rt(t+3,n)-rt(t-3,n),rt(t,n+3)-rt(t,n-3))/6}function Gv(t,n){const e=[],o=Math.round(n*_v);for(let a=0;a<400&&e.length<o;a++){const s=(t+C(a*.71,t,141))*Pv,c=C(t,a*.37,142)<.5?-1:1,i=Math.pow(C(a*.53,t*1.7,143),2.2)*(240+560*en(s)),r=Math.max(ln(s)*.7,17),l=r+4+i;D(s,c*l,0,Ot);const u=C(Ot.x/110,Ot.z/110,146)<.32,h=3+Math.floor(C(t,a*2.9,144)*5),f=u?9:14;for(let m=0;m<h&&e.length<o;m++){const d=s+(C(m*1.9,a+t,145)-.5)*f*1.4,g=Math.max(r,l+(C(a+t,m*1.3,147)-.5)*f);if(D(d,c*g,0,Ot),!Pe(Ot.x,Ot.z,d,g))continue;const p=rt(Ot.x,Ot.z),v=Y(d);if(g<24&&p>v-(Zs(d)>.5?12:22)||Hv(Ot.x,Ot.z)>Rv||p<v-200||ni(p,d,Ot.x,Ot.z))continue;const k=C(m*.83,a+t*1.3,148)<(u?.75:.1),M=k?.85+.55*C(m,t*3.1,149):.75+.6*C(m,t*3.1,149);e.push({p:new L(Ot.x,p-.5,Ot.z),s:M,r:C(m,a+t,150)*6.28,kind:k?0:1})}}return e}const Wm=`
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
`,ho={uPilot:{value:new ys(0,0,0,1)},uHazTime:{value:0}},ei=`
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
`;function Bv(t,n,e,o){ho.uPilot.value.set(t,n,Math.sin(e),Math.cos(e)),ho.uHazTime.value=o}const Fv=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`,$v=`#include <project_vertex>
  #ifdef USE_INSTANCING
  vTreeBase = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #else
  vTreeBase = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).y;
  #endif`,Ov=`#ifdef USE_FOG
  if (uDeck.y + uDeck.w > 0.0) {
    float sunkU = uDeck.y * step(uDeck.x + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.x));
    float sunkL = uDeck.w * step(uDeck.z + 2.0, cameraPosition.y) * (1.0 - smoothstep(-6.0, 2.0, vTreeBase - uDeck.z));
    float sunk = max(min(1.0, 1.25 * deckHug(vFogWorld)), max(sunkU, sunkL));
    outgoingLight = mix(outgoingLight, DECK_HUG_COLOR, sunk);
  }
  #endif
  #include <opaque_fragment>`;function oi(t){const n=new me({vertexColors:!0,side:t.doubleSide?zt:Su});return n.onBeforeCompile=e=>{e.uniforms.uLift=t.lift,t.hazard&&Object.assign(e.uniforms,ho),t.deckHug&&(e.uniforms.uDeck=Ss);const o=t.deckHug?`uniform vec4 uDeck;
${de}${Wm}`:"";e.fragmentShader=`uniform float uLift;
${t.hazard?ei:""}${o}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${t.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${t.rim.toFixed(3)} * uLift;
    ${t.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${t.windows?Fv:""}
  }
  #endif`),t.deckHug&&(e.vertexShader=`varying float vTreeBase;
${e.vertexShader}`.replace("#include <project_vertex>",$v),e.fragmentShader=`varying float vTreeBase;
${e.fragmentShader}`.replace("#include <opaque_fragment>",Ov))},n.customProgramCacheKey=()=>`backlit-${t.selfLit}-${t.rim}-${t.doubleSide?2:1}-${t.hazard?"h":""}${t.windows?"w":""}${t.deckHug?"d":""}`,n}const Dv=4,Kv=.026,Uv=7,Vv=.035;function qv(t,n){const e=new Float32Array(n*16),o=new Float32Array(n*3),a=new Float32Array(n*4);t.instanceColor||(t.instanceColor=new Sr(new Float32Array(n*3).fill(1),3)),t.instanceMatrix.setUsage(ws),t.instanceColor.setUsage(ws);const s=t.geometry;s.boundingSphere||s.computeBoundingSphere();const c=s.boundingSphere,i=new L,r=new Nu;let l=0;return{clear:()=>{l=0},add(u,h){l>=n||(u.toArray(e,l*16),h.toArray(o,l*3),i.copy(c.center).applyMatrix4(u),i.toArray(a,l*4),a[l*4+3]=c.radius*u.getMaxScaleOnAxis(),l++)},flush(u,h){const f=t.instanceMatrix.array,m=t.instanceColor.array;let d=0;for(let g=0;g<l;g++)r.center.fromArray(a,g*4),r.radius=a[g*4+3]+Uv+Vv*r.center.distanceTo(h),u.intersectsSphere(r)&&(f.set(e.subarray(g*16,g*16+16),d*16),m.set(o.subarray(g*3,g*3+3),d*3),d++);if(t.count=d,d!==0)for(const g of[t.instanceMatrix,t.instanceColor])g.clearUpdateRanges(),g.addUpdateRange(0,d*g.itemSize),g.needsUpdate=!0}}}function Wv(t,n){const e=t.elements,o=n.elements;return Math.abs(e[0]/o[0]-1)<.015&&Math.abs(e[5]/o[5]-1)<.015&&Math.abs(e[8]-o[8])<.01&&Math.abs(e[9]-o[9])<.01}function Yv(){const t=new zu,n=new Pt,e=new L,o=new L(Number.NaN,0,0),a=new xt,s=new xt,c=new Pt;return{frustum:t,eye:e,due(i,r){i.updateMatrixWorld(),i.getWorldPosition(e),i.getWorldQuaternion(a);const l=!(e.distanceTo(o)<=Dv);return!r&&!l&&a.angleTo(s)<=Kv&&Wv(i.projectionMatrix,c)?!1:(o.copy(e),s.copy(a),c.copy(i.projectionMatrix),t.setFromProjectionMatrix(n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse)),!0)}}}function ze(t,n,e,o,a){const s=t.getAttribute("position"),c=new Float32Array(s.count*3);for(let i=0;i<s.count;i++){const r=Math.min(1,Math.max(0,(s.getY(i)-o)/(a-o))),l=.85+.3*C(s.getX(i)*.7,s.getZ(i)*.7+s.getY(i),5);for(let u=0;u<3;u++)c[i*3+u]=Math.pow(n[u]+(e[u]-n[u])*r*r,2.2)*l}return t.setAttribute("color",new F(c,3)),t}function Or(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a),r=(C(s*1.3+e,i*1.3,9)-.5)*n;o.setXYZ(a,s*(1+r),c+r*.6,i*(1+r))}return t.computeVertexNormals(),t}function Ym(){const t=[new ct(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([o,a,s],c)=>t.push(Or(new ue(o,a,7,1).toNonIndexed().translate(0,s+a/2,0),.25,c)));const e=At(t.map(o=>o.index?o.toNonIndexed():o));return e.computeVertexNormals(),ze(e,[.05,.12,.07],[.42,.52,.2],1,14)}function Xm(){const t=[new ct(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([o,a,s,c,i],r)=>t.push(Or(new Hn(c,i).translate(o,a,s),.35,r*3)));const e=At(t);return e.computeVertexNormals(),ze(e,[.07,.13,.05],[.62,.6,.18],3,13)}function Xv(){const t=[new ct(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,o,a]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])t.push(new ue(e,o,5,1).toNonIndexed().translate(0,a+o/2,0));const n=At(t);return n.computeVertexNormals(),ze(n,[.05,.12,.07],[.42,.52,.2],1,14)}function jv(){const t=[new ct(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,o,a,s,c]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])t.push(Or(new Hn(s,0).translate(e,o,a),.35,c*3));const n=At(t);return n.computeVertexNormals(),ze(n,[.07,.13,.05],[.62,.6,.18],3,13)}function Zv(){const t=[];for(const[o,a]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])t.push(new B(.4,3,.4).translate(o,1.5,a).toNonIndexed());t.push(ze(new B(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const n=new ue(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();t.push(ze(n,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const o of t)o.getAttribute("color")||ze(o,[.22,.15,.09],[.3,.2,.12],0,3);const e=At(t);return e.computeVertexNormals(),e}function Jv(){const t=[];for(const n of[-2.4,0,2.4])t.push(new B(1.1,1,.1).translate(n,4.8,2.85).toNonIndexed()),t.push(new B(1.1,1,.1).translate(n,4.8,-2.85).toNonIndexed());return At(t)}const qc=250,Qv=40,Po=1,jm=650,Dt={x:0,y:0,z:0},Fi={lat:0,y:0,amount:0};function dl(t,n){return Math.hypot(rt(t+3,n)-rt(t-3,n),rt(t,n+3)-rt(t,n-3))/6}function t5(t,n){const e=[],o=[],a=wo()>.5,s=a?Math.round(n*.6):n,c=a?1.1:3.2,i=re()>.5;i&&e.push(...Gv(t,n));for(let r=0;!i&&r<jm*2.2&&e.length<s;r++){const l=(t+C(r*.71,t,41))*qc,u=C(t,r*.37,42)<.5?-1:1,h=ln(l),f=Math.pow(C(r*.53,t*1.7,43),2.6)*(240+560*en(l)),m=Math.max(h*.7,17)+f;D(l,u*m,0,Dt);const d=Dt.x,g=Dt.z;if(!Pe(d,g,l,m))continue;const p=rt(d,g),v=Y(l);if(m<24&&p>v-(Zs(l)>.5?12:22)||dl(d,g)>c||p<v-200||a&&u>0&&Cm(l,Fi)&&m>Fi.lat-5&&m<Fi.lat+Me+6)continue;const k=.7+.9*C(r,t*3.1,44);e.push({p:new L(d,p-.5,g),s:k,r:C(r,t,45)*6.28,kind:C(d/90,g/90,46)<.55?0:1})}for(let r=0;r<40&&o.length<7;r++){const l=(t+C(r*1.31,t,51))*qc,u=C(t,r*.91,52)<.5?-1:1,h=Math.max(ln(l)*.7,30)+C(r,t*2.3,53)*220;if(D(l,u*h,0,Dt),!Pe(Dt.x,Dt.z,l,h))continue;const f=rt(Dt.x,Dt.z);dl(Dt.x,Dt.z)>.45||f>Y(l)-18||i&&ni(f,l,Dt.x,Dt.z)||o.push({p:new L(Dt.x,f,Dt.z),s:1,r:Ct(l)-u*(Math.PI/2)+(C(r,t,54)-.5),kind:0})}return{trees:e,houses:o}}const Dr={value:1},n5=oi({lift:Dr,selfLit:.2,rim:.85,deckHug:!0}),xo=oi({lift:Dr,selfLit:.2,rim:.85});function Fe(t,n,e=!1){const o=e?new Xt({color:"#ffb35a"}):n5,a=new bt(t,o,n);return a.count=0,a.frustumCulled=!1,a}function e5(t){const n=t.ahead,e=Math.round(jm*t.density),o=e*(Po+n+1),a=new wt,[s,c,i,r]=re()>.5?Iv():[Ym(),Xm(),Xv(),jv()],l=Fe(s,o),u=Fe(c,o),h=Fe(i,o),f=Fe(r,o),m=Fe(Zv(),8*(Po+n+1)),d=Fe(Jv(),8*(Po+n+1),!0);a.add(l,u,h,f,m,d);const g=[l,u,h,f].map(T=>qv(T,o)),p=Yv();let v=!0;const k=new Map;let M=Number.NaN;const w=new Pt,y=new xt,x=new L(0,1,0),b=new L,A=new it,z=new it,E=()=>{g.forEach(N=>N.clear());let T=0;for(let N=M;N<=M+Po+n;N++){let S=k.get(N);S||k.set(N,S=t5(N,e));const P=N-M>t.near-1?2:0;for(const I of S.trees){y.setFromAxisAngle(x,I.r),w.compose(I.p,y,b.set(I.s,I.s*(.9+.25*Math.sin(I.r*3)),I.s));const G=wo(),K=re();A.setHSL(.22-.05*G+.04*K+.06*Math.sin(I.r*5),.25-.08*K,.5-.07*G+.12*Math.cos(I.r*7)),g[P+I.kind].add(w,A.multiplyScalar(2))}for(const I of S.houses)y.setFromAxisAngle(x,I.r),w.compose(I.p,y,b.set(1,1,1)),m.setMatrixAt(T,w),d.setMatrixAt(T++,w)}for(const N of[...k.keys()])(N<M-1||N>M+Po+n+1)&&k.delete(N);m.count=T,d.count=T;for(const N of[m,d])N.instanceMatrix.needsUpdate=!0;v=!0};return{group:a,update(T,N,S){const P=Math.floor((T-Qv)/qc);if(P!==M&&(M=P,E()),p.due(S,v)){for(const I of g)I.flush(p.frustum,p.eye);v=!1}Dr.value=1-.55*Math.min(1,Math.max(0,(N-.4)/.5)),d.material.color.copy(z.set("#ffb35a").multiplyScalar(.25+3.2*N*N))}}}const ai=$.cableLine,Es=ai?.from??0,Kr=ai?.to??0,fl=ai?.clear??0,Wc=[.5,.53,.56],Zm=[.86,.84,.78],Jm=[1,.74,.36],Ls=[.74,.14,.1],Qm=[.42,.52,.6];function o5(t,n,e){let o=1/0;for(let a=n;a<=n+(Kr-Es);a+=8)D(a,0,0,e),o=Math.min(o,Math.hypot(t.x-e.x,t.z-e.z));return o}function Qe(t,n,e,o,a){const s=new L().subVectors(n,t),c=new B(e,e,s.length());return c.lookAt(s),c.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),H(c,o,.04,a)}function td(t,n){const e=[],o=(s,c,i)=>{const r=(t.y+2-i)/192;return new L(t.x+s*(1.4+7.4*r),i,t.z+c*(1.4+7.4*r))},a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=t.y+2,c=0;s>t.y-n;s-=18,c++){const i=Math.max(t.y-n,s-18),r=c<3?c%2?[.92,.9,.86]:[.78,.12,.08]:Wc;a.forEach(([l,u],h)=>{const[f,m]=a[(h+1)%4];e.push(Qe(o(l,u,s),o(l,u,i),.7,r,5)),e.push(Qe(o(l,u,s),o(f,m,i),.25,Wc,5))})}return e}function a5(t){const n=t*lt+Es-Ht,e=t*lt+Kr-Ht,o=new L,a=D(n,0,0,new L);a.y=Y(n)+fl;const s=D(e,0,0,new L);s.y=Y(e)+fl;const c=[],i=new L().subVectors(s,a).cross(new L(0,1,0)).normalize();for(const m of[-1.6,0,1.6])c.push(Qe(a.clone().addScaledVector(i,m),s.clone().addScaledVector(i,m),.22,[.2,.2,.22],3));const r=a.distanceTo(s),l=new L;for(let m=.08;m<1;m+=130/r)l.lerpVectors(a,s,m),!(o5(l,n,o)<30)&&(c.push(...td(l,190)),c.push(H(new B(9,1.6,4).translate(l.x,l.y+2.4,l.z),Wc,.05,6)));const u=Math.atan2(s.x-a.x,s.z-a.z),h=zs(Ls,[.3,.08,.07],Qm,8).rotateY(u),f=zs(Zm,Ls,Jm,9).rotateY(u);for(let m=.05,d=0;m<1;m+=70/r,d++)l.lerpVectors(a,s,m),c.push((d%2?f:h).clone().translate(l.x,l.y,l.z));return h.dispose(),f.dispose(),pt(c)}function s5(){const t=!!ai,n=new wt,e=new Map;return{group:n,update(o){if(!t)return;const a=Mn(o);for(const s of[a,a+1]){const c=s*lt+Es-Ht;if(e.has(s)||c>o+2400||c+(Kr-Es)<o-200)continue;const i=new X(a5(s),xo);i.matrixAutoUpdate=!1,n.add(i),e.set(s,i)}for(const[s,c]of e)s>=a-1&&s<=a+1||(n.remove(c),c.geometry.dispose(),e.delete(s))}}}function Ur(t){for(;;){const n=t.next();if(n.done)return n.value}}function*i5(t){const n=t.getAttribute("position"),e=t.getIndex(),o=m=>~~(m*1e4+.5),a=[1/0,1/0,1/0],s=[-1/0,-1/0,-1/0];for(let m=0;m<n.count;m++)for(let d=0;d<3;d++){const g=o(n.getComponent(m,d));a[d]=Math.min(a[d],g),s[d]=Math.max(s[d],g)}const c=s[1]-a[1]+1,i=s[2]-a[2]+1;if((s[0]-a[0]+1)*c*i>Number.MAX_SAFE_INTEGER)throw new Error("mergePositionsJob: hình quá to cho khoá số");yield;const r=new Map,l=new Float32Array(n.count*3),u=[];let h=0;for(let m=0;m<e.count;m++){const d=e.getX(m),g=(o(n.getX(d))-a[0])*c*i+(o(n.getY(d))-a[1])*i+(o(n.getZ(d))-a[2]);let p=r.get(g);p===void 0&&(r.set(g,p=h++),l[p*3]=n.getX(d),l[p*3+1]=n.getY(d),l[p*3+2]=n.getZ(d)),u.push(p),(m&16383)===16383&&(yield)}const f=new ht;f.setAttribute("position",new F(l.slice(0,h*3),3)),f.setIndex(u);for(const m of t.groups)f.addGroup(m.start,m.count,m.materialIndex);return f}function*c5(t){const n=t.getAttribute("position"),e=t.getIndex(),o=new F(new Float32Array(n.count*3),3);t.setAttribute("normal",o);const a=new L,s=new L,c=new L,i=new L,r=new L,l=new L,u=new L,h=new L;for(let f=0;f<e.count;f+=3){const m=e.getX(f),d=e.getX(f+1),g=e.getX(f+2);a.fromBufferAttribute(n,m),s.fromBufferAttribute(n,d),c.fromBufferAttribute(n,g),u.subVectors(c,s),h.subVectors(a,s),u.cross(h),i.fromBufferAttribute(o,m).add(u),r.fromBufferAttribute(o,d).add(u),l.fromBufferAttribute(o,g).add(u),o.setXYZ(m,i.x,i.y,i.z),o.setXYZ(d,r.x,r.y,r.z),o.setXYZ(g,l.x,l.y,l.z),f%24576===24573&&(yield)}for(let f=0;f<o.count;f++)i.fromBufferAttribute(o,f).normalize(),o.setXYZ(f,i.x,i.y,i.z),(f&16383)===16383&&(yield)}const r5=new Tt({uniforms:{...ho},vertexShader:`
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
${ei}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:Tr,transparent:!0,depthWrite:!1});function l5(t){return t.getAttribute("aOutline")||Ur(nd(t)),t}function*nd(t){const n=t.getAttribute("position"),e=t.getAttribute("normal"),o=new Int32Array(n.count*3),a=[1/0,1/0,1/0],s=[-1/0,-1/0,-1/0];for(let d=0;d<n.count;d++)for(let g=0;g<3;g++){const p=o[d*3+g]=Math.round(n.getComponent(d,g)*50);a[g]=Math.min(a[g],p),s[g]=Math.max(s[g],p)}const c=s[1]-a[1]+1,i=s[2]-a[2]+1;if((s[0]-a[0]+1)*c*i>Number.MAX_SAFE_INTEGER)throw new Error("outlineNormalsJob: hình quá to cho khoá số");yield;const r=d=>(o[d*3]-a[0])*c*i+(o[d*3+1]-a[1])*i+(o[d*3+2]-a[2]),l=new Map,u=new Float64Array(n.count*3);let h=0;const f=new Int32Array(n.count);for(let d=0;d<n.count;d++){const g=r(d);let p=l.get(g);p===void 0&&(l.set(g,p=h),h+=3),f[d]=p,u[p]=u[p]+e.getX(d),u[p+1]=u[p+1]+e.getY(d),u[p+2]=u[p+2]+e.getZ(d),(d&16383)===16383&&(yield)}const m=new Float32Array(n.count*3);for(let d=0;d<n.count;d++){const g=f[d],p=Math.hypot(u[g],u[g+1],u[g+2]);m.set(p>1e-6?[u[g]/p,u[g+1]/p,u[g+2]/p]:[0,1,0],d*3),(d&16383)===16383&&(yield)}t.setAttribute("aOutline",new F(m,3))}function xn(t){const n=new X(l5(t),r5);return n.userData.hazardHull=!0,n}function h5(t,n){t&&(t.visible=n>5&&n<105)}function u5(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new fa(t)}const ed=new _n(1,1).rotateX(-Math.PI/2),od=new Xt({map:u5(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function m5(t){const n=new bt(ed,od,t);return n.count=0,n.frustumCulled=!1,n.renderOrder=1,n}function Vr(t,n,e){const o=new X(ed,od);return o.scale.set(t,1,n),o.position.y=e,o.renderOrder=1,o.updateMatrix(),o}const qr=[.86,.66,.36],ad=[.78,.58,.32],si=[.36,.34,.35],sd=[.3,.29,.3],$i=[.58,.56,.53],d5={pillar:[.52,.5,.48],wall:qr,tile:si},f5={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},g5=()=>Km(f5);function p5(){const t=[ia(H(new B(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let n=0;n<2;n++)for(let e=0;e<12;e++){const o=C(e*.73,n*1.9,61),a=-4.6+(e+.5*n)*.76,s=new B(.95,.4+.22*o,.62+.3*o).rotateX((o-.5)*.35).rotateY((o-.5)*.4),c=.78+.34*C(e,n,62);t.push(H(s.translate(0,.25+n*.46,a),[$i[0]*c,$i[1]*c,$i[2]*c],.12,e+n*13))}return pt(t)}const v5=[.3,.22,.19],Oi=[.92,.9,.84],y5=[.8,.82,.85];function id(t,n){const e=[],o=new B(t.len,t.wallH+t.sink,t.width).translate(0,(t.wallH-t.sink)/2,0);e.push(ia(H(o,t.wall,.14,n),0,2.5,.72)),e.push(H(new B(t.len+.08,.7,t.width+.08).translate(0,.25,0),[.5,.44,.36],.1,n)),e.push(H(new B(t.len+.06,.45,t.width+.06).translate(0,t.wallH-.2,0),v5,.08,n)),e.push(Dm(t.len,t.width,t.wallH,t.rise,t.wall)),e.push(ti(t.len+.6,t.width/2+.35,t.rise+.25,t.tile,0,t.crest?xa:void 0).translate(0,t.wallH-.2,0));const a=-t.width/2-.04;e.push(H(new B(1.3,2.3,.08).translate(0,1.15,a+.01),Oi,.06,n)),e.push(H(new B(1,2,.1).translate(0,1,a-.02),$r,.1,n)),e.push(H(new B(1.8,.25,.34).translate(0,.12,a-.17),[.62,.58,.52],.08,n));for(let s=0;s<t.floors;s++){const c=1.5+s*3.1;for(const i of s===0?[-t.len/2+.85,t.len/2-.85]:[-.9,.9])e.push(H(new B(.8,1,.1).translate(i,c,a),yv,.12,n+i));if(s>0&&t.balcony){const i=t.len*.78;e.push(H(new B(i,.18,.4).translate(0,c-1.05,a-.2),[.7,.66,.6],.08,n)),e.push(H(new B(i,.08,.08).translate(0,c-.15,a-.32),Oi,.05,n));for(let r=0;r<=6;r++)e.push(H(new B(.06,.82,.06).translate(-i/2+i*r/6,c-.55,a-.32),Oi,.05,n))}}if(t.tank){const s=t.wallH+t.rise+.1;e.push(H(new ct(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(t.len*.22,s+.45,0),y5,.12,n)),e.push(H(new B(.9,.2,.7).translate(t.len*.22,s,0),[.4,.38,.36],.08,n))}return pt(e)}function cd(t,n,e=!1){const a=e?t%2?ad:qr:t%2?$m:Fr,s=e?t%3===2?sd:si:t%3===2?Fm:wa;return id({len:4.4,width:5.2,wallH:n-3.2-.3,rise:3.2,wall:a,tile:s,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},t*7.1)}function Pa(t,n=!1){const e=n?t?ad:qr:t?$m:Fr,o=n?t?sd:si:t?Fm:wa;return id({len:8-t,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:o,floors:1,sink:2.5,tank:!n,crest:!1,balcony:!n},3+t)}const uo=[.76,.6,.33],rd=[.62,.49,.3],ld=[.5,.4,.31],sn=[.56,.38,.23],zn=[.3,.2,.13],b5=[.6,.55,.46],ra=[.68,.64,.36],hd=[.86,.7,.36],w5=[.06,.16,.12],x5=[.2,.13,.08],gn=[[.88,.14,.1],[.98,.74,.12],[.18,.6,.3],[.2,.36,.78],[.88,.24,.55],[.95,.9,.8]];function _e(t,n){const e=t.getAttribute("position"),o=t.getAttribute("color"),a=t.getAttribute("normal");for(let s=0;s+2<e.count;s+=3){const c=(e.getX(s)+e.getX(s+1)+e.getX(s+2))/3,i=(e.getY(s)+e.getY(s+1)+e.getY(s+2))/3,r=(e.getZ(s)+e.getZ(s+1)+e.getZ(s+2))/3,l=n(c,i,r,(a.getY(s)+a.getY(s+1)+a.getY(s+2))/3);for(let u=s;u<s+3;u++)o.setXYZ(u,o.getX(u)*l,o.getY(u)*l,o.getZ(u)*l)}return t}const M5=t=>t.rise+.9*t.thick+.32;function ud(t,n){const e=Math.hypot(t.half,t.rise),o=Math.atan2(t.rise,t.half),a=Math.max(3,Math.round(t.len/(t.shingle?1:1.25))),s=Math.max(3,Math.round(e/(t.shingle?.6:.78))),c=new B(t.len,t.thick,e,a,1,s),i=c.getAttribute("position");for(let h=0;h<i.count;h++){if(i.getZ(h)<e/2-.01)continue;const f=C(i.getX(h)*1.7+n,3.1,77);i.setZ(h,i.getZ(h)+(t.shingle?.08:.42)*(f-.45)),i.setY(h,i.getY(h)-(t.shingle?0:.18*f))}c.rotateX(o).translate(0,t.rise/2+Math.cos(o)*t.thick/2,t.half/2+Math.sin(o)*t.thick/2);const r=_e(H(c,t.color,.12,n),(h,f,m,d)=>{const g=m/t.half,p=Math.min(.999,Math.max(0,g)),v=Math.floor(p*s),k=t.shingle?((Math.floor(h/.55)+v)%2?1:.84)*(v%2?1:.92):v%2?1:.88,M=g>.985&&d<.3?.68:d<-.3?.5:d<.3?.72:1;return k*M*(t.shingle?.9+.2*C(h*.6+n,v,78):.94+.12*C(h*.12+n,v*.3,78))}),l=t.cap??[t.color[0]*.78,t.color[1]*.74,t.color[2]*.7],u=H(new B(t.len+.2,.42,.42).rotateX(Math.PI/4).translate(0,t.rise+.9*t.thick,0),l,.08,n);return pt([r,r.clone().rotateY(Math.PI),u])}function md(){const t=new ct(.75,1.75,2.5,9,2),n=t.getAttribute("position");for(let o=0;o<n.count;o++){const a=n.getY(o),s=(Math.abs(a)<.01?1.12:1)*(.92+.16*C(n.getX(o)*2,n.getZ(o)*2,79));n.setXYZ(o,n.getX(o)*s,a,n.getZ(o)*s)}const e=_e(H(t.translate(0,1.15,0),hd,.18,2),(o,a)=>a<.5?.72:Math.floor(a/.55)%2?1:.88);return pt([e,H(new ue(.85,1,9,1).translate(0,2.85,0),rd,.12,3),H(new ct(.06,.08,1.4,4,1,!0).translate(0,3.4,0),zn,.1,4)])}function k5(){const t=[];for(let n=0;n<=4;n++){const e=-5+n*2.5,o=C(n*1.3,2.2,80);t.push(H(new B(.17,1.8,.17).rotateX((o-.5)*.16).rotateZ((o-.5)*.12).translate(0,.45,e),zn,.2,n))}for(const n of[.62,1.12])t.push(H(new B(.08,.12,10.3).rotateX(.01*n).translate(.1,n,0),[.5,.41,.31],.22,n));return pt(t)}function S5(t,n,e,o){const s=(i,r)=>{const l=i/8,u=o/2*(1-.25*l);return[.18*Math.sin(i*1.3),t-e*l,n-.35*Math.sin(l*3.2)+r*u]},c=[];for(let i=0;i<8;i+=2){const r=[];for(let u=i;u<i+2;u++){const[h,f,m,d]=[s(u,-1),s(u,1),s(u+1,-1),s(u+1,1)];if(u<7)r.push(...h,...f,...m,...m,...f,...d);else{const g=[(m[0]+d[0])/2,h[1]-.4*(h[1]-m[1]),(h[2]+f[2])/2];r.push(...h,...g,...m,...f,...d,...g,...h,...f,...g)}}const l=new ht;l.setAttribute("position",new Cu(r,3)),c.push(H(l,gn[[0,1,2,4][i/2]],.12,i))}return c}function T5(){const n=10.5+3*Math.cos(-.5),e=3*Math.sin(-.5);return pt([H(new ct(.08,.13,10.5,5,1).translate(0,5.25,0),ra,.15,5),H(new ct(.05,.08,3,5,1).rotateX(-.5).translate(0,10.5+1.5*Math.cos(-.5),1.5*Math.sin(-.5)),ra,.15,7),H(new ue(.9,2.4,6,1).rotateX(Math.PI+-.5*1.6).translate(0,n+.2,e-.6),[.46,.56,.2],.25,6),H(new B(.05,.05,1).translate(0,n-.15,e),zn,.1,8),...S5(n-.15,e,6.2,.95)])}const A5=4,dd=12;function N5(t,n,e,o,a,s){const c=o-e,i=[],r=[[t,Math.PI,0,-n/2],[t,0,0,n/2],[n,-Math.PI/2,-t/2,0],[n,Math.PI/2,t/2,0]];for(const[l,u,h,f]of r){const m=Math.max(2,Math.round(l/.36)),d=_e(H(new _n(l,c,m,1),a,.16,s+h+f),g=>{const p=Math.floor((g+l/2)/l*m);return(p%2?1:.86)*(.9+.2*C(p*1.7,s+u,81))});i.push(d.rotateY(u).translate(h,e+c/2,f))}return i}function z5(t,n,e,o,a,s,c){const i=Math.hypot(o-n,a-e);return H(new B(s,i,s).rotateX(Math.atan2(a-e,o-n)).translate(t,(n+o)/2,(e+a)/2),c,.1,t)}function ne(t,n){const e=[],o=t.roof,a={...o,len:t.len+1.3,...t.crest?{cap:xa}:{}},s=t.top-M5(a),c=s+o.rise*(1-t.width/2/o.half),i=-t.width/2;if(t.base==="plinth"){const f=Math.max(1,Math.round(t.floor/.5)),m=H(new B(t.len+.9,t.floor,t.width+.9,1,f,1).translate(0,t.floor/2,0),b5,.3,n);e.push(_e(m,(d,g)=>(Math.floor(g/.5)%2?1:.84)*(.86+.28*C(d*.8+Math.floor(g/.5)*3.3,n,82)))),e.push(H(new B(t.len+.9,t.sink,t.width+.9).translate(0,-t.sink/2,0),[.42,.38,.32],.1,n))}else{const f=t.len>5.5?[-t.len/2+.25,0,t.len/2-.25]:[-t.len/2+.25,t.len/2-.25];for(const d of f)for(const g of[i+.25,-i-.25])e.push(H(new B(.26,t.floor+t.sink,.26).translate(d,(t.floor-t.sink)/2,g),zn,.15,d+g)),t.guards&&e.push(H(new ct(.52,.52,.08,6).translate(d,t.floor-.6,g),sn,.1,d-g));e.push(H(new B(t.len+.4,.24,t.width+.4).translate(0,t.floor-.12,0),zn,.1,n));const m=Math.min(t.floor,A5)-.15;t.skirt&&e.push(H(new B(t.len-.2,m,t.width-.2).translate(0,t.floor-.25-m/2,0),ra,.25,n))}e.push(...N5(t.len,t.width,t.floor,c,t.wall,n)),e.push(H(new B(t.len+.12,.3,t.width+.12).translate(0,t.floor+.15,0),zn,.1,n)),e.push(Dm(t.len,t.width,c,s+o.rise-c,t.wall)),e.push(ud(a,n).translate(0,s,0));const r=Math.min(1.9,c-t.floor-.4);e.push(H(new B(.95,r,.1).translate(0,t.floor+r/2,i-.04),x5,.08,n));const l=t.floor+Math.min(1.5,(c-t.floor)*.55),u=t.windows<=2?[-.3,.3].slice(0,t.windows):Array.from({length:t.windows},(f,m)=>(m+.5)/t.windows-.5);for(const f of u)Math.abs(f*t.len)>.85&&e.push(H(new B(.7,.55,.1).translate(f*t.len,l,i-.04),w5,.06,n+f));let h=i;if(t.porch){h=i-.9,e.push(H(new B(t.len,.18,.9).translate(0,t.floor-.09,i-.45),zn,.1,n)),e.push(H(new B(t.len,.08,.08).translate(0,t.floor+.9,h+.05),sn,.08,n));const f=Math.max(3,Math.round(t.len/.8));for(let m=0;m<=f;m++)e.push(H(new B(.07,.9,.07).translate(-t.len/2+t.len*m/f,t.floor+.45,h+.05),sn,.08,m))}if(t.ladder){for(const f of[-.38,.38])e.push(z5(f,0,h-1.4,t.floor,h,.09,sn));for(let f=1;f<=4;f++)e.push(H(new B(.85,.07,.07).translate(0,t.floor*f/5,h-1.4+1.4*f/5),sn,.08,f))}if(t.firewood){const f=t.base==="plinth"?t.floor:0,m=t.base==="plinth"?i-.26:0,d=t.len*.32,g=H(new B(d,.95,.5,4,3,1).translate(t.len/2-d/2-.05,f+.475,m),[.74,.58,.38],.15,n);e.push(_e(g,(p,v)=>(Math.floor(p/.24)+Math.floor(v/.32))%2?1:.72))}return pt(e)}function C5(t,n){const e=n-.02,o=Math.max(0,n-dd),a=o>2,s=[.5,.34,.21];return t===0?ne({len:5.2,width:4.2,base:"stilts",floor:3.5+o,top:e,roof:{half:3.2,rise:4.2,thick:.5,color:uo},wall:sn,crest:!0,sink:6,windows:1,skirt:!0,porch:!0,ladder:!0},11):t===1?ne({len:5.2,width:4.6,base:"stilts",floor:3.2+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:rd},wall:s,crest:!0,sink:6,windows:0,skirt:!0,guards:!0,ladder:!0},12):t===2?ne({len:5,width:4.8,base:a?"stilts":"plinth",floor:3+o,top:e,roof:{half:3.2,rise:4,thick:.3,color:ld,shingle:!0},wall:sn,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},13):ne({len:5,width:4.8,base:a?"stilts":"plinth",floor:2.6+o,top:e,roof:{half:3.3,rise:4.4,thick:.55,color:uo},wall:s,crest:!0,sink:6,windows:2,firewood:!0,skirt:a},14)}function gl(t){return t===0?ne({len:8,width:5.4,base:"plinth",floor:.9,top:7,roof:{half:3.5,rise:3,thick:.3,color:ld,shingle:!0},wall:sn,crest:!1,sink:2.5,windows:3,firewood:!0},21):ne({len:7.6,width:5,base:"stilts",floor:1.8,top:8.4,roof:{half:3.4,rise:3.4,thick:.5,color:uo},wall:[.5,.35,.22],crest:!1,sink:2.5,windows:2,porch:!0,ladder:!0,firewood:!0},22)}const E5=[[1.8,6.4],[-1.6,7.7]];function L5(){return ne({len:3,width:2.8,base:"stilts",floor:2.4,top:7.2,roof:{half:2.25,rise:2.6,thick:.42,color:uo},wall:sn,crest:!1,sink:2,windows:0,ladder:!0},23)}const pl=5,fd={value:0};function P5(){const t=[];for(let n=0;n<pl;n++){const e=new Hn(.75,0);e.deleteAttribute("uv"),e.setAttribute("aPuff",new F(new Float32Array(e.getAttribute("position").count).fill(n/pl),1)),t.push(e)}return At(t)}const la=new Xt({color:14078150,transparent:!0,opacity:.5,depthWrite:!1});la.onBeforeCompile=t=>{t.uniforms.uSmokeTime=fd,t.vertexShader=`attribute float aPuff;
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
  diffuseColor.a *= vFade;`)};la.customProgramCacheKey=()=>"chimney-smoke";function _5(t){fd.value=performance.now()/1e3,la.opacity=.5-.28*t,la.color.setRGB(.66-.58*t,.62-.53*t,.56-.44*t)}const Bt=8,gd=Bt+6,_a=Bt+7,pd=[40,8,8,12,8,22,10,14],R5=[[13,13],[10,7.5],[9.5,7],[1.6,11],[4.5,4.5],[4,4],[0,0],[1.3,1.3]],pn=250;function I5(t){return t?[Ev(),gl(0),gl(1),k5(),L5(),md(),P5(),T5()]:pd.map(()=>new ht)}const Kt=new L;function Wr(t,n){return Math.hypot(rt(t+2.5,n)-rt(t-2.5,n),rt(t,n+2.5)-rt(t,n-2.5))/(2*2.5)}function $e(t,n,e,o){D(t,n,0,Kt),Kt.y=rt(Kt.x,Kt.z);const a=Y(t);return!(Qt(t)>.3)||Kt.y>a-6||Kt.y<a-e||Wr(Kt.x,Kt.z)>o||!Pe(Kt.x,Kt.z,t,Math.abs(n))||ni(Kt.y,t,Kt.x,Kt.z)?null:Kt.clone()}const vl=(t,n,e)=>Ct(t)+(n>0?Math.PI/2:-Math.PI/2)+(e-.5)*.6,yl=20,It=new L,ls=(t,n)=>(D(t,n,0,It),rt(It.x,It.z));function H5(t,n){for(let e=0;e<pn/yl;e++){const o=n*pn+(e+.8*C(e*1.31,n,213))*yl,a=$.zone(Z(o),!0);if(a!=="dive"&&a!=="valley"&&a!=="climb")continue;const s=ls(o,22)>=ls(o,-22)?1:-1,c=C(n*1.9,e*2.71,214);let i=c<.6?_a:c<.88?Bt:Bt+5;const r=$.hillside,l=(r?.wall?.(Z(o))??0)>.5?Math.max(0,(r.wallLip?.(Z(o))??0)-18):0,u=s*((i===Bt?22:15)+C(e*3.17,n,215)*8+l),h=ls(o,u),f=Y(o);if(h<f-(i===Bt+5?10:14)||h>f+8||!Pe(It.x,It.z,o,Math.abs(u)))continue;const m=Wr(It.x,It.z);if(m>(i===Bt?1:i===_a?2.5:.6)&&(i=_a),m>2.5)continue;const d=i===_a?Ct(o):C(e,n,216)*6.28;t.push({p:new L(It.x,h,It.z),r:d,s:.85+.35*C(n,e,217),kind:i})}}function G5(t,n){for(let e=0;e<22;e++){const o=n*pn+C(e*1.13,n,218)*pn;if($.zone(Z(o),!0)!=="river")continue;const s=(C(n*1.7,e*2.93,219)<.5?-1:1)*(4+Math.pow(C(e*3.41,n,220),1.3)*110),c=ls(o,s);if(c>Y(o)-28||Wr(It.x,It.z)>.5||!Pe(It.x,It.z,o,Math.abs(s))||ni(c,o,It.x,It.z))continue;const i=C(n*2.3,e*2.1,221),r=i<.6?Bt:i<.75?Bt+4:Bt+5;t.push({p:new L(It.x,c,It.z),r:C(e,n,222)*6.28,s:.8+.4*C(n,e,223),kind:r})}}function B5(t,n){const e=[];H5(e,t),G5(e,t);const o=t*pn,a=$.zone(Z(o+pn/2),!0),s=a==="valley"||a==="climb";for(let i=0;i<Math.max(3,Math.round(n/6));i++){const r=o+C(i*.77,t,181)*pn,l=C(t,i*.41,182)<.5?-1:1,u=27+Math.pow(C(i*.53,t*1.3,183),1.6)*170;for(let h=0,f=3+Math.floor(C(t,i*2.7,184)*4);h<f;h++){const m=r+(C(h*1.9,i+t,185)-.5)*26,d=l*Math.max(21,u+(C(i+t,h*1.3,186)-.5)*24),g=$e(m,d,30,.8);g&&e.push({p:g,r:C(h,i+t,187)*6.28,s:.75+.45*C(i,h+t,188),kind:Bt})}}const c=s?4:1;for(let i=0;i<c;i++){const r=o+(i+C(i,t,189))*(pn/c),l=C(t*1.3,i,190)<.5?-1:1,u=l*(19+Math.pow(C(i*.7,t,191),1.4)*130),h=$e(r,u,40,.45);if(h){e.push({p:h,r:vl(r,u,C(i,t,192)),s:.9+.25*C(t,i,193),kind:Bt+4});for(let f=0;f<3;f++){const m=$e(r+(C(f,i+t,194)-.5)*16,u+l*(4+C(i+t,f,195)*9),40,.45);m&&e.push({p:m,r:C(f,i,196)*6.28,s:.8+.4*C(i,f+t,197),kind:Bt+5})}}}for(let i=0;i<(s?6:3);i++){const r=o+C(i*1.37,t,198)*pn,l=(C(t,i*.83,199)<.5?-1:1)*(15+C(i*.61,t*1.7,200)*70),u=$e(r,l,30,.4);u&&e.push({p:u,r:C(i,t,201)*6.28,s:.8+.45*C(t,i,202),kind:Bt+5})}for(let i=0;i<(s?1:2);i++){const r=o+(.25+.5*i)*pn+(C(t,i,203)-.5)*60,l=(C(t*1.7,i,204)<.5?-1:1)*((s?45:26)+C(t,i*3.1,205)*90);for(let u=0;u<(s?4:7);u++){const h=r+(C(u,t+i,206)-.5)*70,f=l+(C(u*1.9,t+i,207)-.5)*50,m=Math.abs(f)<30?null:$e(h,f,14,.3);if(!m)continue;const d=(u+i)%2,g=vl(h,f,C(u,i,208));if(e.push({p:m,r:g,s:1,kind:Bt+1+d}),C(u*2.3,t+i,209)<.45){const[p,v]=E5[d];e.push({p:new L(m.x+Math.cos(g)*p,m.y+v,m.z-Math.sin(g)*p),r:0,s:1,kind:gd})}}}for(let i=0;i<(s?1:2);i++){const r=(i?1:-1)*(C(t,3.3,210)<.5?-1:1),l=o+C(t,i,211)*(pn-60);for(let u=0,h=(s?2:3)+Math.floor(C(t,i*2.3,212)*4);u<h;u++){const f=l+u*10.2,m=$e(f,r*13.5,14,.5);m&&e.push({p:m,r:Ct(f),s:1,kind:Bt+3})}}return e}const ye=250,bl=1,F5=6,Yr={value:1},$5=oi({lift:Yr,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),ii=oi({lift:Yr,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Di(t,n,e){return D(t,n,0,e),e.y=rt(e.x,e.z),e}function O5(t,n){const e=[],o=t*ye;if(Math.max(Qt(o),Qt(o+ye/2),Qt(o+ye))===0)return e;if(re()>.5)return B5(t,n);const a=new L,s=wo()>.5?4:0,c=(i,r)=>Qt(i)>.3&&r.y<Y(i)-6&&r.y>Y(i)-14;for(let i=0;i<n;i++){const r=o+C(i*.77,t,81)*ye,u=(C(t,i*.41,82)<.5?-1:1)*(18+Math.pow(C(i*.53,t*1.3,83),1.8)*190);c(r,Di(r,u,a))&&e.push({p:a.clone(),r:C(i,t,84)*6.28,s:.8+.5*C(t,i,85),kind:s})}for(let i=0;i<2;i++){const r=o+(.25+.5*i)*ye+(C(t,i,86)-.5)*60,u=(C(t*1.7,i,87)<.5?-1:1)*(24+C(t,i*3.1,88)*90);for(let h=0;h<7;h++){const f=r+(C(h,t+i,89)-.5)*70,m=u+(C(h*1.9,t+i,90)-.5)*50;if(Math.abs(m)<17||!c(f,Di(f,m,a)))continue;const d=Ct(f)+(m>0?Math.PI/2:-Math.PI/2)+(C(h,i,91)-.5)*.5;e.push({p:a.clone(),r:d,s:1,kind:s+1+h%2})}}for(let i=0;i<2;i++){const r=i?1:-1,l=o+C(t,i,92)*(ye-60),u=3+Math.floor(C(t,i*2.3,93)*4);for(let h=0;h<u;h++){const f=l+h*10.2;c(f,Di(f,r*13.5,a))&&e.push({p:a.clone(),r:Ct(f),s:1,kind:s+3})}}return e}function D5(t){const n=bl+Math.max(3,Math.round(F5*t))+1,e=Math.round(34*Math.max(.5,t)),o=new wt,a=[Km(),Pa(0),Pa(1),xv(),g5(),Pa(0,!0),Pa(1,!0),p5(),...I5(re()>.5)],s=[34,7,7,12,34,7,7,12,...pd].map(v=>v*n),c=a.map((v,k)=>{const M=new bt(v,k===gd?la:$5,s[k]);return M.count=0,M.frustumCulled=!1,M.visible=v.getAttribute("position")!==void 0,o.add(M),M}),i=m5(s.reduce((v,k)=>v+k,0));o.add(i);const r=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11],...R5],l=new Map,u=new Pt,h=new xt,f=new L(0,1,0),m=new L,d=new L;let g=Number.NaN;const p=()=>{const v=a.map(()=>0);let k=0;for(let M=g;M<g+n;M++){let w=l.get(M);w||l.set(M,w=O5(M,e));for(const y of w){const x=c[y.kind];if(v[y.kind]>=s[y.kind])continue;u.compose(y.p,h.setFromAxisAngle(f,y.r),m.set(y.s,y.s,y.s)),x.setMatrixAt(v[y.kind]++,u);const[b,A]=r[y.kind];b!==0&&(u.compose(m.set(y.p.x,y.p.y+.12,y.p.z),h,d.set(b*y.s,1,A*y.s)),i.setMatrixAt(k++,u))}}for(const M of[...l.keys()])(M<g-1||M>g+n)&&l.delete(M);c.forEach((M,w)=>{M.count=v[w],M.visible=M.count>0,M.instanceMatrix.needsUpdate=!0}),i.count=k,i.instanceMatrix.needsUpdate=!0};return{group:o,update(v,k){const M=Math.floor(v/ye)-bl;M!==g&&(g=M,p());const w=Math.min(1,Math.max(0,(k-.4)/.5));Yr.value=1-.6*w,_5(w)}}}const K5=8.05,Oe=2.05,fn=32,U5=2.4,V5=260,wl=[.2,.2,.22],Ki=[.5,.53,.56],q5=[.22,.23,.25],Ra=t=>K5+U5*(t/fn)**2;function W5(){const t=[],n=[];for(const a of[0,Oe]){const s=a?.18:.26,c=Array.from({length:17},(i,r)=>-fn+r*2*fn/16).map(i=>new L(i,Ra(i)+a,0));for(let i=0;i<c.length-1;i++)t.push(Qe(c[i],c[i+1],s,wl,3));for(const i of[-1,1]){const r=new L(i*fn,Ra(fn)+a,0);n.push(Qe(r,new L(i*140,r.y+.35*(140-fn),0),s,wl,3))}}const e=zs(Ls,[.3,.08,.07],Qm,8).rotateY(Math.PI/2),o=zs(Zm,Ls,Jm,9).rotateY(Math.PI/2);for(const a of[-2,-1,0,1,2]){const s=St(a),c=Ra(s);t.push((a%2?o:e).clone().translate(s,c,0)),t.push(Qe(new L(s,c+.3,0),new L(s,c+Oe,0),.22,Ki,12)),t.push(H(new B(2.2,.45,.6).translate(s,c+Oe+.1,0),q5,.03,13))}e.dispose(),o.dispose();for(const a of[-1,1]){const s=Ra(fn);n.push(...td(new L(a*fn,s-2.6,0),V5)),n.push(H(new B(2.4,1,6).translate(a*fn,s-1.1,0),Ki,.05,6));for(const c of[-1.3,1.3])n.push(H(new B(.45,Oe+1.6,.45).translate(a*fn,s+Oe/2-.2,c),Ki,.05,7));n.push(H(new B(.6,.5,3.1).translate(a*fn,s+Oe+.6,0),[.78,.12,.08],.05,8))}return{hazard:pt(t),scenery:pt(n)}}const Ui=$.cableLine;let Y5=null;function ci(t){const n=Z(t);return!!Ui&&n>=Ui.from&&n<=Ui.to}function X5(){const t=Y5??=W5();return new wt().add(new X(t.hazard,ii).add(xn(t.hazard)),new X(t.scenery,xo))}const Yc="skyrun.best",jo=t=>`skyrun.best.${t}`,vd=new Map,yd=new Set;try{const t=Number(localStorage.getItem(Yc))||0;t>0&&!localStorage.getItem(jo("khau-pha"))&&!localStorage.getItem(jo("mu-cang-chai"))&&localStorage.setItem(jo("khau-pha"),JSON.stringify({m:0,score:t}))}catch{}function j5(t){try{const n=localStorage.getItem(jo(t));if(!n)return null;const e=JSON.parse(n);return{m:Number(e.m)||0,score:Number(e.score)||0}}catch{return null}}function Xr(t){const n=j5(t),e=vd.get(t);return!n||!e?n??e??null:{m:Math.max(n.m,e.m),score:Math.max(n.score,e.score)}}function bd(t,n){vd.set(t,n);try{localStorage.setItem(jo(t),JSON.stringify(n))}catch{}}function jr(t){return Xr(t)}function wd(t,n){const e=Math.floor(n),o=Xr(t);if(!(e<=(o?.m??0))){bd(t,{m:e,score:o?.score??0});for(const a of yd)a()}}function Z5(t){yd.add(t)}function J5(t,n,e,o=!0){const a=Xr(t),s=a?.m??0,c={m:Math.max(s,Math.floor(n)),score:Math.max(a?.score??0,e)},i=Math.floor(n)>s,r=!i&&a!==null&&Math.floor(n)===s&&s>0;if(!o)return{best:a??c,record:!1,tie:!1,prevM:s};bd(t,c);try{e>(Number(localStorage.getItem(Yc))||0)&&localStorage.setItem(Yc,String(e))}catch{}return{best:c,record:i,tie:r,prevM:s}}const xl=["ngan-dep-qua","ngan-troi-oi","ngan-da-qua"],Q5=["ngan-yeah","ngan-wiii","ngan-da-qua"],t3=["ngan-nhanh-ghe","ngan-wiii","ngan-yeah"],Ml=["ngan-hu-hon","ngan-xem-xiu","ngan-ngot","ngan-sat-ghe","ngan-ghe-chua","ngan-hay"],n3=["ngan-ui-da","ngan-oi","ngan-ui"],Xc=["ngan-co-len","ngan-rang-len","ngan-len-nao"],kl=["ngan-ngon","ngan-them-ne","ngan-hay"],Sl=["ngan-tiec-ghe","ngan-oi-khong"],e3=["ngan-di-ne","ngan-len-nao","ngan-yeah","cat-canh"],Tl={rim:xl,dive:Q5,gorge:["ngan-yeah","ngan-da-qua"],mouth:["ngan-troi-oi","ngan-wiii"],river:["ngan-da-qua","ngan-dep-qua","ngan-yeah"],cave:["ngan-troi-oi","ngan-dep-qua"],climb:Xc,valley:xl,gate:["ngan-yeah","ngan-da-qua"],village:["ngan-dep-qua","ngan-da-qua"]},o3=300,a3=25,s3=30,i3=4,Ia=gt.region==="fansipan",Al=()=>performance.now()/1e3,Ut=t=>Math.random()<t;function c3(){let t=0,n=0,e=0,o=-1/0,a=-1/0;const s=[],c=new Map,i=h=>{const f=h.filter(g=>!s.includes(g)),m=f.length?f:h,d=m[Math.floor(Math.random()*m.length)];return s.push(d),s.length>i3&&s.shift(),d},r=h=>{const f=Al();return f-o<a3||Math.random()>=h?!1:(o=f,!0)},l=(h,f)=>{const m=c.get(h)??0;return m>=f?!1:(c.set(h,m+1),!0)},u=(h,f)=>h&&l(h,1)?{n:h,prio:2}:Ut(.25)?{n:i(f),prio:1}:null;return{runStart(){return t=jr(Gt)?.m??0,n++,n===1?i(["cat-canh","pk-len-duong","pk-bay-thoi"]):Ut(.3)?i(e3):null},nearMiss(h){return h===3?Ut(.4)?i(Ml):null:h===6?Ut(.5)?i([...Ml,"suot-dep","khen-dep-lam","khen-sat-rat","pk-hu-hon"]):null:h>=10&&h%5===0&&Ut(.6)?i(["qua-dinh","khen-bay-pro","khen-ai-can","pk-phe-qua","khen-tay-lai-lua"]):null},lantern(h){return h===10?l("den-troi-chuoi",2)?"den-troi-chuoi":Ut(.5)?i(kl):null:h>=20&&h%10===0&&Ut(.5)?i([...kl,"pk-phe-qua","pk-gom-den"]):null},gustFull:()=>Ut(.5)?i(["pk-quay-len",...Xc]):null,rush(){const h=Al();return h-a<s3?null:(a=h,Ut(.6)?i([...t3,"pk-nhanh-qua","pk-cay-mat"]):null)},booster(h){return h==="shield"?l("du-du-phong",2)?"du-du-phong":null:l("luong-nhiet",1)?"luong-nhiet":Ut(.3)?i(Xc):null},hurt(h,f,m){return r(.3)?Ia&&f==="bridge"&&ci(m)?"treu-cabin":Ia&&f==="pillar"?"dx-thap-dung-yen":i(Ia?["dx-bay-kieu-gi"]:["treu-hon-vach","dx-bay-kieu-gi","dx-vach-dung-yen"]):h<=1&&l("tiec-mot-tim",2)?"tiec-mot-tim":Ut(.8)?i([...n3,"tiec-xem"]):null},zone:h=>u($.zoneLines?.[h],Tl[h]),section:h=>u(h==="gorge"?"khe-da":"thung-lung",Tl[h]),over(h,f){const m=f<o3;if(e=m?e+1:0,h)return i(["ky-luc","pk-ky-luc-chop","pk-pha-ky-luc"]);if(m)return e>=2&&r(.6)?"treu-lai-nua":r(.5)?i(["treu-moi-cat-canh","treu-khoi-dong","dx-de-ma","dx-nhin-duong"]):Ut(.5)?i(Sl):null;if(t>0&&f>=.9*t)return"tiec-suyt-ky-luc";if(t>0&&f<.5*t&&r(.4))return"dx-ky-luc-cuoi";if(!Ut(.6))return null;if(Ut(.6))return i(Sl);if(!Ia)return i(["ha-canh","tiec-lam-lai"]);const d=$.zone(Z(f),!1)==="river";return i(d?["tiec-lam-lai","tiec-nhay-lai"]:["tiec-lam-lai","tiec-nhay-lai","tiec-rot-may"])}}}const Nl=[0,2,4,7,9],Ha=.32,zl=.85,r3=.6,Cl=1.25,l3=[0,10,3,0];function h3(){let t=null,n=null,e=null,o=null,a=null,s=null,c=null,i=null,r=null,l=null;const u=bm();let h=u.sfx,f=u.music;const m=()=>Kp({sfx:h,music:f});let d=0,g=0,p=null,v=0;const k=c3();let M=!1,w=null;const y=()=>{if(w)return w.resume();t=new AudioContext,w=Ep(t),Pp(t,matchMedia("(pointer: coarse)").matches),n=Fp(t);const E=t.createDynamicsCompressor();E.threshold.value=-10,E.ratio.value=4,E.connect(t.destination),e=t.createGain(),e.gain.value=.9,e.connect(E);const T=N=>{const S=t.createGain();return S.gain.value=N,S.connect(e),S};o=T(h?1:0),a=T(h?zl:0),s=T(f?Ha:0),l=Zp(t,s),setInterval(()=>l?.tick(f),500),i=t.createBiquadFilter(),i.type="lowpass",c=t.createGain(),c.gain.value=0,i.connect(c).connect(o)};y();const x=(E,T)=>{n&&o&&n.play(E,o,T)},b=(E,T)=>{if(!E||!t||!n||!a||!s||!h)return;const N=t.currentTime;if(N<d?T<=g:N<d+(l3[T]??0))return;const S=n.get(E);S&&(p?.stop(),p=n.play(E,a),d=N+S.duration,g=T,f&&(s.gain.setTargetAtTime(Ha*r3,N,.05),s.gain.setTargetAtTime(Ha,N+S.duration,.3)))},A=E=>E?b(E.n,E.prio):void 0,z=E=>1+(Math.random()*2-1)*E;return{update(E,T,N){if(!t||!n||!c||!i)return;!r&&n.get("wind-loop")&&(r=n.play("wind-loop",i,{loop:!0})),l?.tick(f);const S=t.currentTime;r&&r.playbackRate.setTargetAtTime(.85+.35*E,S,.2),i.frequency.setTargetAtTime(900+6e3*E,S,.15),c.gain.setTargetAtTime(T?.35+1.1*E*E:.2,S,.25);const P=Am(N);T&&P>v&&P%3&&b(P%3===1?"chang-vang":"dem-hoi",1),v=T?Math.max(v,P):0,T&&E>Cl&&!M&&b(k.rush(),1),M=T&&E>1.05&&(M||E>Cl);const I=s2();I&&T&&x("festival-whoosh",{vol:.2+.4*I.near,rate:(I.big?.8:1)*z(.06),pan:I.pan}),pv()&&T&&(x("flare-whoosh",{vol:.9,rate:.75}),x("reveal-stinger",{vol:.7}))},events(E,T,N){for(const S of E)if(S.type==="lantern"){const P=Nl[(S.streak-1)%Nl.length];x("lantern-chime",{vol:.55,rate:Math.pow(2,P/12)}),b(k.lantern(S.streak),1)}else if(S.type==="wish"){for(const[P,I]of[[-5,.6],[2,.42],[7,.3]])x("lantern-chime",{vol:I,rate:Math.pow(2,P/12)});x("reveal-stinger",{vol:.35})}else if(S.type==="near-miss")x("near-miss",{vol:.8,rate:z(.08)*(1+.02*Math.min(10,S.combo))}),b(k.nearMiss(S.combo),1);else if(S.type==="lane")x("lane-whoosh",{vol:.25,rate:z(.1),pan:.5*S.dir});else if(S.type==="vert")x(S.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:z(.05)});else if(S.type==="gust")x("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(S.chain-1))/12)}),S.full&&(x("thermal-boost",{vol:.7}),b(k.gustFull(),1));else if(S.type==="cloud-gate")x(S.hit?"flare-whoosh":"dive-whoosh",{vol:S.hit?.8:.75,rate:S.hit?1.2:.6}),S.hit&&x("thermal-boost",{vol:.6});else if(S.type==="booster"){const[P,I]=S.kind==="thermal"?["thermal-boost",.8]:S.kind==="smoke"?["smoke-hiss",.75]:S.kind==="boost"?["festival-whoosh",1.4]:["shield-pickup",1.4];x(P,{vol:I}),(S.kind==="thermal"||S.kind==="shield")&&b(k.booster(S.kind),2)}else S.type==="hurt"?(x("shield-hit",{vol:1.2,rate:z(.05)}),b(k.hurt(S.hp,S.kind,N),2)):S.type==="crash"?x("crash",{vol:1.3}):S.type==="section"&&T&&!S.open&&!$.zoneNames&&A(k.section("gorge"))},reveal(){x("reveal-stinger",{vol:.6}),$.zoneNames||A(k.section("valley"))},zone(E){A(k.zone(E))},runStart(){y(),x("run-start",{vol:.8}),b(k.runStart(),2)},over(E,T){x("game-over",{vol:.5}),b(k.over(E,T),3)},toggleSfx(){return y(),h=!h,o&&a&&t&&(o.gain.setTargetAtTime(h?1:0,t.currentTime,.05),a.gain.setTargetAtTime(h?zl:0,t.currentTime,.05)),m(),h},toggleMusic(){return y(),f=!f,s&&t&&(s.gain.cancelScheduledValues(t.currentTime),s.gain.setTargetAtTime(f?Ha:0,t.currentTime,.3)),m(),f},prefs:()=>({sfx:h,music:f}),justUnlocked:()=>w?.justWoke()??!1,music:()=>l}}function nn(t){for(const n of["touchstart","touchend","touchmove","pointerdown"])t.addEventListener(n,e=>e.stopPropagation(),{passive:!0});t.addEventListener("mousedown",n=>{n.stopPropagation(),n.target instanceof Element&&n.target.closest('button, [role="button"]')&&(n.preventDefault(),window.focus())})}const ot=t=>`<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t}</svg>`,yt='fill="currentColor" fill-opacity=".28"',O={lantern:'<svg class="ui-ic ui-ic-lantern" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ic-lan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3121b"/><stop offset=".55" stop-color="#ff7329"/><stop offset="1" stop-color="#ffc45a"/></linearGradient></defs><path d="M7.2 2.8h9.6l1.7 3.4c.9 1.9 1.5 4 1.5 6.1 0 3.2-1.6 5.7-3.9 6.9H7.9C5.6 18 4 15.5 4 12.3c0-2.1.6-4.2 1.5-6.1z" fill="url(#ic-lan)" stroke="#4a1006" stroke-width="1.1"/><path d="M9.4 3.2 8.6 18.8M14.6 3.2l.8 15.6M12 2.9v16" stroke="#6e1f0a" stroke-width=".8" opacity=".55" fill="none"/><ellipse cx="12" cy="19.3" rx="4.3" ry="1.15" fill="#2e0a04"/><path d="M12 22.4c-1.2-.8-1.5-2-.6-3.2.1.8.6 1.1 1 1.2.2-.6.1-1.3-.3-1.9 1.5.7 2.1 2.2 1.4 3.9z" fill="#fff0a0" stroke="#ff9a2a" stroke-width=".5"/></svg>',heart:'<svg class="ui-ic ui-ic-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="whole" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/><path class="half l" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/><path class="half r" d="M12 21s7.5-4.6 9.6-9.4c1.5-3.5-.6-7.1-4.2-7.1-2.1 0-3.6 1.2-5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/></svg>',trophy:ot(`<path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" ${yt}/><path d="M7 5.5H4.3a2.7 2.7 0 0 0 3.1 4.2M17 5.5h2.7a2.7 2.7 0 0 1-3.1 4.2M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>`),lock:ot(`<rect x="5" y="10.5" width="14" height="10" rx="2.2" ${yt}/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17"/>`),gear:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',speaker:ot('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16.5 9.5l5 5m0-5-5 5"/>'),note:ot('<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16"/>'),pause:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',play:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.8v14.4L19.5 12z" fill="currentColor"/></svg>',help:ot('<path d="M8.8 8.8a3.3 3.3 0 1 1 4.5 3.1c-.8.3-1.3 1-1.3 1.9v.7"/><circle cx="12" cy="18.3" r=".9" fill="currentColor" stroke="none"/>'),close:ot('<path d="M6 6l12 12M18 6 6 18"/>'),mountain:ot(`<path d="M2.5 19.5 9 8l3.5 6 2-3 7 8.5z" ${yt}/><path d="M7.3 11 9 12.5l1.7-1.6"/>`),route:ot('<path d="M4 18.5c4-1 5-6.5 9-7.5s5-4 6.5-6.5" stroke-dasharray=".1 3.6"/><circle cx="4" cy="18.5" r="1.9" fill="currentColor"/><path d="M16 4h4v4"/>'),star:ot(`<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" ${yt}/>`),wind:ot('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),boost:ot(`<path d="M6 5.5l6.5 6.5L6 18.5z" ${yt}/><path d="M6 5.5l6.5 6.5L6 18.5M13 5.5l6.5 6.5-6.5 6.5"/>`),thermal:ot('<path d="M8 21c-2-3 2-5 0-8s2-5 0-8M16 21c-2-3 2-5 0-8s2-5 0-8"/><path d="M5.5 7 8 4.5 10.5 7M13.5 7 16 4.5 18.5 7"/>'),parachute:ot(`<path d="M3 11a9 7 0 0 1 18 0z" ${yt}/><path d="M3 11l9 9 9-9M9 11l3 9 3-9"/>`),users:ot('<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.3 6-5.3s5.4 1.9 6 5.3M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.8 14.6c1.7.8 2.9 2.5 3.2 4.9"/>'),crown:ot(`<path d="M3.5 8l4 4 4.5-6 4.5 6 4-4-1.8 10H5.3z" ${yt}/>`),wingsuit:ot(`<path d="M12 3.5c-3.6 3.6-7.3 5.2-9.5 5.8 2.9 1.1 5.8 1.4 7.9 3.6L12 20.5l1.6-7.6c2.1-2.2 5-2.5 7.9-3.6-2.2-.6-5.9-2.2-9.5-5.8z" ${yt}/>`),sun:ot(`<circle cx="12" cy="12" r="4" ${yt}/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12H5M19 12h2.5M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>`),moon:ot(`<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" ${yt}/>`),home:ot(`<path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" ${yt}/>`),rotate:ot('<rect x="3" y="7" width="18" height="10" rx="2.2"/><path d="M16.5 3.5a7 7 0 0 1 4 3M21 3v3.6h-3.6"/>'),chevronDown:ot('<path d="M6 9l6 6 6-6"/>'),chevronRight:ot('<path d="M9 6l6 6-6 6"/>'),check:ot('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),dragSide:ot(`<circle cx="12" cy="12" r="3.2" ${yt}/><path d="M7.5 12H2.5M5 9.5 2.5 12 5 14.5M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5"/>`),swipeUp:ot(`<circle cx="12" cy="17.5" r="3.2" ${yt}/><path d="M12 13.5V3.5M8 7.5l4-4 4 4"/>`),swipeDown:ot(`<circle cx="12" cy="6.5" r="3.2" ${yt}/><path d="M12 10.5v10M8 16.5l4 4 4-4"/>`),tap:ot('<circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity=".45"/><circle cx="12" cy="12" r="7.5" stroke-opacity=".55"/>'),pillar:ot(`<path d="M9 21V6.5l1.5-3h3L15 6.5V21" ${yt}/><path d="M3 21h18"/>`),spike:ot(`<path d="M3.5 20 10 7l2.5 4L15 6l5.5 14z" ${yt}/>`),ridge:ot(`<path d="M2 20v-7l4-4 3 3 3-5 3 4 3-2 4 4v7z" ${yt}/>`),bridge:ot('<path d="M2 6c5 6 15 6 20 0M5 9.2V20M19 9.2V20M2 20h20M9 10.7v3M12 11v3M15 10.7v3"/>'),overhang:ot(`<path d="M2 4h20v4l-4 3-3-2-3 4-3-3-3 2-4-2z" ${yt}/><path d="M4 20h16"/>`),house:ot(`<path d="M3 11 12 4l9 7" /><path d="M5.5 9.5V20h13V9.5" ${yt}/>`),balloon:ot(`<path d="M12 2.5c-4 0-6.5 3-6.5 6.4 0 3.3 3.3 6.2 5.3 8.1h2.4c2-1.9 5.3-4.8 5.3-8.1 0-3.4-2.5-6.4-6.5-6.4z" ${yt}/><path d="M10.6 17v2.2h2.8V17M10.6 19.2 8 22M13.4 19.2 16 22"/>`),gorge:ot(`<path d="M2.5 21V3.5l4 4.5 2 13zM21.5 21V5l-3.5 3-2.5 13z" ${yt}/><path d="M12 5v2.5M12 11v2.5M12 17v2.5"/>`),dive:ot(`<path d="M2.5 4.5h8V21h-8z" ${yt}/><path d="M15.5 4v14.5M12 15l3.5 3.5L19 15"/>`),river:ot('<path d="M2 8.5q2.5-2.2 5 0t5 0 5 0 5 0M2 15q2.5-2.2 5 0t5 0 5 0 5 0"/>'),cave:ot(`<path d="M2 20.5V12a10 8.5 0 0 1 20 0v8.5z" ${yt}/><path d="M7.5 20.5V16a4.5 4.5 0 0 1 9 0v4.5"/>`),terrace:ot('<path d="M2.5 20h19M4 16c4.5-1.6 11.5-1.6 16 0M6 12c3.5-1.4 8.5-1.4 12 0M8.5 8c2.2-1 4.8-1 7 0"/>'),cloud:ot(`<path d="M6.5 18.5a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.4 9a4.75 4.75 0 0 1 .6 9.5z" ${yt}/>`)},u3=3*6e4,xd=/assets\/index-([\w-]+)\.js/,El=[...document.scripts].map(t=>xd.exec(t.src)?.[1]).find(Boolean)??null;function m3(t){const n=document.createElement("button");n.type="button",n.className="ui-chip gold build-note",n.hidden=!0,n.innerHTML=`${O.rotate}<span>Có bản mới · Tải lại</span>`,n.addEventListener("click",c=>{c.stopPropagation(),location.reload()}),nn(n),t.appendChild(n);let e=!1,o=performance.now(),a=!1;const s=async()=>{a=!0;try{const c=await fetch(new URL("./",location.href),{cache:"no-store",redirect:"manual"}),i=c.ok?xd.exec(await c.text())?.[1]:void 0;e=!!i&&i!==El}catch{}a=!1};return{setScreen(c){n.hidden=!e||!c,!(!El||e||a||!c||performance.now()-o<u3)&&(o=performance.now(),s())}}}function d3(t){if(t.name)return t.name;if(t.parent?.name)return t.parent.name;const n=t.geometry;return`${t.type}:${n.type}:${n.getAttribute("position")?.count??0}`}function f3(t,n,e=14){n.updateMatrixWorld();const o=new zu().setFromProjectionMatrix(new Pt().multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse)),a=new Nu,s=new Map;t.traverseVisible(i=>{if(!(i instanceof X)&&!(i instanceof bs))return;const r=i.geometry;if(i.frustumCulled&&(r.boundingSphere||r.computeBoundingSphere(),a.copy(r.boundingSphere).applyMatrix4(i.matrixWorld),!(i instanceof bt)&&!o.intersectsSphere(a)))return;const l=i instanceof bs?0:(r.index?r.index.count:r.getAttribute("position")?.count??0)/3,u=i instanceof bt?i.count:1,h=d3(i),f=s.get(h)??{meshes:0,triangles:0};f.meshes+=1,f.triangles+=Math.round(l*u),s.set(h,f)});const c=[...s.entries()].map(([i,r])=>({source:i,...r})).sort((i,r)=>r.triangles-i.triangles);return{rows:c.slice(0,e),total:c.reduce((i,r)=>i+r.triangles,0)}}function g3(t,n,e,o){const a=r=>{const l=t.getContext(),u=new Uint8Array(4),h=performance.now();for(let d=0;d<r;d++)t.info.reset(),n.render(),l.readPixels(0,0,1,1,l.RGBA,l.UNSIGNED_BYTE,u);const{geometries:f,textures:m}=t.info.memory;return{msPerFrame:(performance.now()-h)/r,calls:t.info.render.calls,triangles:t.info.render.triangles,geometries:f,textures:m,programs:t.info.programs?.length??0}},s=async r=>{e.render();const l=await new Promise(h=>t.domElement.toBlob(h,"image/png"));if(!l)return"khong chup duoc";const u=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:l});return u.ok?`shots/${r}.png`:`loi ${u.status}`},c=r=>f3(o.scene,o.camera,r),i=(r=!1)=>{const l=new Map;return o.scene.traverse(u=>{const h=u.material,f=Object.keys(u.geometry?.attributes??{}).join(",");for(const m of Array.isArray(h)?h:h?[h]:[]){const d=t.properties.get(m).currentProgram,g=Object.keys(m.uniforms??{}).filter(p=>!/^(fog|diffuse|opacity)/.test(p)).slice(0,4).join(",");d&&!l.has(d.id)&&l.set(d.id,`${u.type}:${u.name||u.parent?.name||"?"}/${m.name||m.type} [${f}] {${g}}`)}}),(t.info.programs??[]).map(u=>`${u.id} ${r?u.cacheKey:l.get(u.id)??`${u.name} ${u.cacheKey.replace(/\s+/g," ").slice(0,160)}`}`)};window.__skyrun={...e,bench:a,shot:s,diag:c,programs:i}}const p3=5,v3=450;function y3(t,n){let e=0;return{spawn(o,a,s){const c=n();if(!c||e>=p3||!Number.isFinite(o)||!Number.isFinite(a)){s();return}const i=c.getBoundingClientRect(),r=t.getBoundingClientRect(),l=i.left+i.width*.25-r.left,u=i.top+i.height*.5-r.top,h=document.createElement("div");h.className="collect-streak",h.style.left=`${o}px`,h.style.top=`${a}px`,t.appendChild(h),e++;const f=(o+l)/2-(l-o)*.15,m=Math.min(a,u)-60,d=h.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${f-o}px), calc(-50% + ${m-a}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-o}px), calc(-50% + ${u-a}px)) scale(0.55)`,opacity:.9}],{duration:v3,easing:"cubic-bezier(.5,0,.9,.6)"});d.onfinish=d.oncancel=()=>{h.remove(),e--,s()}}}}const b3=`
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
}`,w3=`
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
}`,_o=1.1,x3=1.3,M3=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],hs={request:0};function k3(t){const n=t?.041666666666666664:.025,e=Math.ceil(_o/n)+2,o=[0,1].map(()=>Array.from({length:e},()=>({p:new L,t:-99,k:0,c:0}))),a=2*e*2,s=new Float32Array(a*3),c=new Float32Array(a*3),i=new Float32Array(a),r=new Float32Array(a),l=new Float32Array(a),u=new Float32Array(a),h=[];for(let T=0;T<2;T++)for(let N=0;N<e;N++){const S=(T*e+N)*2;l[S]=-1,l[S+1]=1,N<e-1&&h.push(S,S+1,S+2,S+1,S+3,S+2)}const f=new ht,m={position:[s,3],aCol:[c,3],aAge:[i,1],aK:[r,1],aSide:[l,1],aAlong:[u,1]};for(const[T,[N,S]]of Object.entries(m))f.setAttribute(T,new F(N,S));f.setIndex(h),f.setDrawRange(0,0);const d=["position","aCol","aAge","aK","aAlong"].map(T=>f.getAttribute(T)),g=new Tt({vertexShader:b3,fragmentShader:w3,uniforms:Rn.merge([In.fog]),transparent:!0,depthWrite:!1,side:zt,fog:!0}),p=new X(f,g);p.frustumCulled=!1,p.renderOrder=3;const v=new L,k=new L,M=new L,w=new L,y=new L,x=new L;let b=0,A=-99,z=-99,E=!1;return{mesh:p,update(T,N,S,P,I){hs.request>0&&(b=hs.request,hs.request=0),P>0&&(b=Math.max(0,b-P));const G=T.mode==="run",K=G&&T.smokeT>0?Math.min(1,T.smokeT/x3):0,V=G&&b>0?.75*Math.min(1,b/.8):0,j=Math.max(K,V);if(j>0)S-z>_o&&o.forEach((tt,Mt)=>tt.forEach(kt=>(kt.p.copy(N[Mt]),kt.t=-99,kt.k=0))),z=S;else if(S-z>_o){E&&f.setDrawRange(0,0),E=!1;return}E=!0,f.setDrawRange(0,1/0);const J=Ct(T.z);v.set(Math.sin(J),wn(T.z),Math.cos(J)).normalize(),k.set(Math.cos(J),0,-Math.sin(J));const q=G?T.speed:0,et=Math.sign((N[0].x-N[1].x)*k.x+(N[0].z-N[1].z)*k.z)||1,mt=P>0&&S-A>=n;mt&&(A=S),o.forEach((tt,Mt)=>{const kt=j*(j+(1-j)*Math.max(0,Math.sin(S*21+Mt*2))),Nt=K>0?(T.smokes+2)%3:Mt===0?1:2;if(mt){const vt=tt.pop();tt.unshift(vt)}const Lt=tt[0];Lt.p.copy(N[Mt]),mt&&(Lt.t=S),Lt.k=kt,Lt.c=Nt;const kn=Mt===0?et:-et;for(let vt=1;vt<e&&P>0;vt++){const nt=tt[vt],on=Math.min(_o,S-nt.t),ko=Math.max(0,q-5-18*on),hn=Math.sin(S*7+nt.t*13);nt.p.addScaledVector(v,ko*P).addScaledVector(k,(kn*1.6+hn*.7)*P),nt.p.y+=(-1+Math.cos(S*6+nt.t*11)*.5)*P}x.copy(k);for(let vt=0;vt<e;vt++){const nt=tt[vt],on=S-nt.t,ko=Math.min(1,on/_o);M.subVectors(tt[Math.max(0,vt-1)].p,tt[Math.min(e-1,vt+1)].p),M.lengthSq()<1e-6&&M.copy(v),w.subVectors(I,nt.p),y.crossVectors(M,w),y.lengthSq()<.03*M.lengthSq()*w.lengthSq()?y.copy(x):y.normalize(),y.dot(x)<0&&y.negate(),x.copy(y);const hn=(.14+.9*(1-Math.exp(-on/.4)))*(.45+.55*nt.k),dt=(Mt*e+vt)*2;s[dt*3]=nt.p.x-y.x*hn,s[dt*3+1]=nt.p.y-y.y*hn,s[dt*3+2]=nt.p.z-y.z*hn,s[dt*3+3]=nt.p.x+y.x*hn,s[dt*3+4]=nt.p.y+y.y*hn,s[dt*3+5]=nt.p.z+y.z*hn;const So=M3[nt.c];c.set(So,dt*3),c.set(So,dt*3+3),i[dt]=i[dt+1]=ko,r[dt]=r[dt+1]=nt.t<0?0:nt.k,u[dt]=u[dt+1]=nt.t}});for(const tt of d)tt.needsUpdate=!0}}}function S3(t,n,e,o,a,s,c,i){const r=y3(t,()=>t.querySelector(".hud-lantern")),l=new L,u=document.createElement("div");u.className="flash",t.appendChild(u);const h=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(f,m){if(!f.length)return;o.events(f,m.mode==="run",m.z),a.events(f,m);const d=D(m.z+3,m.x,m.v,{x:0,y:0,z:0}),g=D(m.z+.6,m.x,m.v,{x:0,y:0,z:0});for(const p of f)if(p.type==="lantern")e.burst(d.x,d.y+.5,d.z,16,!0),s.spawn(g.x,g.y+.2,g.z),l.set(d.x,d.y+.3,d.z).project(i),r.spawn((l.x*.5+.5)*t.clientWidth,(.5-l.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(p.type==="wish")e.burstWish(d.x,d.y+.6,d.z),s.spawn(g.x,g.y+.2,g.z),n.shake(.12),h(),l.set(d.x,d.y+.3,d.z).project(i),r.spawn((l.x*.5+.5)*t.clientWidth,(.5-l.y*.5)*t.clientHeight,()=>a.bumpLantern());else if(p.type==="near-miss")n.shake(.06),h();else if(p.type==="hurt"||p.type==="crash"){const v=p.type==="crash";n.shake(v?.9:.45),c.spawn(g.x,g.y,g.z,Un(m.z)?"village":p.kind==="bridge"?"cloth":"rock",v),v||h()}else p.type==="booster"?e.burst(d.x,d.y,d.z,40,!0):p.type==="gust"&&p.full?hs.request=1.5:p.type==="section"&&p.open&&m.mode==="run"&&o.reveal()}}}const Ll=20.5,T3=17.5,Pl=.1,A3=.05,N3=3,z3=.5,C3=2.5,E3=8;class L3{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(n,e){this.minScale=n,this.hooks=e}sample(n){if(n<=0||n>.1||(this.clock+=n,this.warm+=n,this.sinceChange+=n,this.warm<N3||this.sinceChange<z3)||(this.seeded||(this.ema=n*1e3,this.seeded=!0),this.ema+=(n*1e3-this.ema)*.05,this.verify&&this.sinceChange>=C3&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>Ll?this.slowFor+n:0,this.fastFor=this.ema<T3?this.fastFor+n:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>Ll?this.floorSlowFor+n:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const n=this.verify;this.verify=null,!(this.ema<n.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(n.prev))}down(n){if(this.slowFor=0,!n){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-Pl));return}this.floorSlowFor<E3||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+Pl)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const n=Math.min(1,this.scale+A3);n<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(n))??0)||this.apply(n)}key(n){return Math.round(n*100)}apply(n){this.scale=Math.round(n*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const Vi={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1,detail:!0},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1,detail:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0,detail:!1},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},Md="skyrun.quality",P3=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function _3(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"no-webgl2";const n=t.getExtension("WEBGL_debug_renderer_info"),e=String(n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function R3(t){const n=navigator;return t==="no-webgl2"||P3.test(t)||(n.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function _l(t){return t==="low"||t==="mid"||t==="high"}function I3(t){const n=_3(),e=t.get("q");if(_l(e))return{...Vi[e],gpu:n,source:"url"};let o=null;try{const[a,s]=(localStorage.getItem(Md)??"").split("|");Date.now()-Number(s)<3*864e5&&(o=a??null)}catch{}return _l(o)?{...Vi[o],gpu:n,source:"saved"}:{...Vi[R3(n)],gpu:n,source:"guess"}}function H3(t){try{localStorage.setItem(Md,`${t}|${Date.now()}`)}catch{}}function G3(t){return t==="high"?"mid":t==="mid"?"low":null}function B3(t){const n=()=>Math.min(window.devicePixelRatio,t.tier.maxDpr);let e=!1;const o=new L3(t.tier.minScale,{setScale(r){const l=n()*r;t.renderer.setPixelRatio(l),t.post.setPixelRatio(l),t.resize()},degrade(){const r=G3(t.tier.name);return r&&!e&&t.tier.source!=="url"&&(H3(r),e=!0),t.post.setLite()}});let a=performance.now(),s=0,c=a;const i=r=>{const l=(r-a)/1e3;if(t.tick(Math.min(.1,l)),a=r,t.renderer.info.reset(),t.post.render(),o.sample(l),s++,r-c>500){const u=t.renderer.info.render,h=(s*1e3/(r-c)).toFixed(0);t.stats?.(`${h} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${t.tier.name} (${t.tier.source}) · độ phân giải ${Math.round(o.scale*100)}% · ${o.frameMs().toFixed(1)} ms
${t.worldLine()}`),s=0,c=r}requestAnimationFrame(i)};return requestAnimationFrame(i),o}const kd=gt.routeVersion,F3=7*3600*1e3;function jc(t){const n=new Date(t.getTime()+F3);return`${`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}.${gt.routePrefix}${kd}`}function $3(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return n>>>0||1}function O3(t){let n=t;return()=>{const e=jc(new Date);return{route:e,seed:t?n++:$3(e)}}}function Rl(t){const n=/^\d{4}-(\d{2})-(\d{2})/.exec(t);return n?`${n[2]}/${n[1]}`:t}const Zc=20,Sd=2*Math.PI*Zc,D3=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Zc}" class="track"/>
  <circle cx="24" cy="24" r="${Zc}" class="arc" stroke-dasharray="${Sd.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function K3(t,n){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${D3}<b>Đèn ×2</b>`,t.appendChild(e);const o=e.querySelector(".arc");let a=!1,s=!1,c="";return{update(i){const r=i.smokeT>0&&i.mode!=="over";if(r!==a&&(a=r,e.classList.toggle("on",a),n.classList.toggle("x2",a)),!a)return;const l=(Sd*(1-i.smokeT/_.smokeTime)).toFixed(1);l!==c&&o.setAttribute("stroke-dashoffset",c=l);const u=i.smokeT<1.5;u!==s&&e.classList.toggle("ending",s=u)}}}const U3={hurt:"heart",thermal:"thermal",shield:"parachute",boost:"boost",wind:"wind",wish:"lantern"},V3={thermal:"Lên cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${_.smokeLanternMul} trong ${_.smokeTime} giây`,boost:`Gió tốc! Điểm ×${_.boostScoreMul}`},Il=2*Math.PI*24,q3=1.1,Ga=t=>Math.floor(t).toLocaleString("vi-VN"),Hl=t=>`×${t.toFixed(1).replace(".",",")}`;function W3(t){const n=document.createElement("div");n.className="hud",n.innerHTML=`
    <div class="hud-left">
      <div class="hud-dist-row"><div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div><span class="hud-rank-slot"></span></div>
      <div class="hud-score">${O.star}<b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời">
        <div class="hud-day-track"><span class="mk" style="left:24%">${O.sun}</span><span class="mk" style="left:64%">${O.moon}</span><span class="mk" style="left:86%">${O.lantern}</span><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span class="hud-day-no" data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${O.heart.repeat(_.maxHp)}</div>
      <div class="hud-lantern">${O.lantern}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><svg viewBox="0 0 54 54" aria-hidden="true"><circle class="bg" cx="27" cy="27" r="26"/><circle class="arc" data-k="combo" cx="27" cy="27" r="24" stroke-dasharray="${Il.toFixed(1)}"/></svg><span data-k="mult">×1,0</span></div>
    </div>
    <div class="hud-boost"><div class="hud-pill" data-k="thermal">${O.thermal}<b>Luồng nhiệt</b><i data-k="thermalBar"></i></div><div class="hud-pill gale" data-k="gale">${O.boost}<b>Gió tốc · điểm ×${_.boostScoreMul}</b><i data-k="galeBar"></i></div></div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-vignette" data-k="vig"></div>
    <div class="hud-stats" data-k="stats"></div>`,t.appendChild(n);const e=S=>n.querySelector(`[data-k="${S}"]`),o=["dist","score","sun","dayNo","period","lanterns","mult","multBox","combo","thermal","thermalBar","gale","galeBar","toasts","sections","stats","vig"],{dist:a,score:s,sun:c,dayNo:i,period:r,lanterns:l,mult:u,multBox:h,combo:f,thermal:m,thermalBar:d,gale:g,galeBar:p,toasts:v,sections:k,stats:M,vig:w}=Object.fromEntries(o.map(S=>[S,e(S)])),y=n.querySelector(".hud-lantern"),x=[...e("hearts").children],b=K3(n.querySelector(".hud-right"),y);let A=0,z=null,E="";const T=(S,P,I)=>{const G=document.createElement("div");G.className=`hud-toast ${P}${I?` ${I}`:""}`;const K=I&&U3[I];K&&(G.innerHTML=O[K]),G.append(S);const V=P==="section"?k:v;for(V.appendChild(G);V.children.length>(P==="section"?1:2);)V.firstChild.remove();return setTimeout(()=>G.remove(),P==="section"?2600:1100),G},N=(S,P)=>{const I=P>1?`SƯỢT! ${Hl(S.mult)}`:"SƯỢT!",G=performance.now()/1e3;z&&z.el.isConnected&&G-z.at<q3?(z.el.textContent=I,z.el.classList.remove("bump"),z.el.offsetWidth,z.el.classList.add("bump"),clearTimeout(z.timer)):z={el:T(I,"combo"),at:G,timer:0},z.at=G;const K=z.el;z.timer=window.setTimeout(()=>K.remove(),1100)};return{toast:(S,P,I)=>{T(S,P,I)},setVisible(S){n.classList.toggle("hidden",!S)},bumpLantern(){y.classList.remove("got"),y.getBoundingClientRect(),y.classList.add("got")},setStats(S){M.textContent=S},setPilotBox(S){const P=t.clientHeight,I=S?S.y+S.h+16:0,G=!S||t.clientWidth>600?"":I<=P-150?`t${Math.round(I)}`:`b${Math.round(P-S.y+16)}`;G!==E&&(E=G,v.style.top=G[0]==="t"?`${G.slice(1)}px`:G?"auto":"",v.style.bottom=G[0]==="b"?`${G.slice(1)}px`:G?"auto":"")},update(S,P){a.textContent=Ga(S.z),s.textContent=Ga(Ae(S)),c.style.left=`${(P.u*100).toFixed(1)}%`;const I=`Ngày ${P.day}`;i.textContent!==I&&(i.textContent=I);const G=n2(P);r.textContent!==G&&(r.textContent=G),l.textContent=Ga(S.lanterns),u.textContent=Hl(S.mult),h.classList.toggle("hot",S.mult>1.05);const K=S.combo>0?Math.max(0,1-S.comboT/_.comboBreak):0;f.style.strokeDashoffset=(Il*(1-K)).toFixed(1),m.classList.toggle("on",S.thermalT>0),d.style.transform=`scaleX(${S.thermalT/_.thermalTime})`,g.classList.toggle("on",S.boostT>0),p.style.transform=`scaleX(${S.boostT/_.boostTime})`,x.forEach((j,J)=>j.classList.toggle("lost",J>=S.hp)),n.classList.toggle("low-hp",S.mode==="run"&&S.hp===1&&_.maxHp>1),b.update(S);const V=Am(P);if(V>A&&S.mode==="run"){const j=gt.dayTitles?.[P.day-1]??xm[P.region];T(V%3===0?`Ngày ${P.day} · ${j}`:V%3===1?"Chạng vạng":"Đêm hội đèn trời","section")}A=S.mode==="run"?Math.max(A,V):0},zone(S){const P=$.zoneNames?.[S];P&&T(P,"section")},events(S,P){for(const I of S)if(I.type==="near-miss")N(P,I.combo);else if(I.type==="hurt"){T(I.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt");for(const G of[x[I.hp],w])G?.classList.remove("hit"),G?.getBoundingClientRect(),G?.classList.add("hit")}else I.type==="booster"&&I.kind!=="lantern"?T(V3[I.kind],"big",I.kind):I.type==="wish"?T(`Đèn ước! +${Ga(I.points)}`,"big","wish"):I.type==="gust"?T(I.full?`Trọn chuỗi gió! +${_.gustChainScore}`:`Gió xuôi ×${I.chain}`,I.full?"big":"combo","wind"):I.type==="cloud-gate"?T(I.hit?`Xé cửa mây! +${_.gateScore}`:"Đâm vào mây · mất gió",I.hit?"big":"combo","wind"):I.type==="section"&&P.mode==="run"&&!$.zoneNames&&T(I.open?Qt(P.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const Y3=30,Gl={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},X3=10,j3=34,Z3=260,J3=180,Q3=.26,Bl=300;function ty(t,n,e){const o=[],a=[],s=new Map;let c=!1;const i=new Map;let r=null,l=0,u=0,h=-1,f=0;const m=[],d=(M,w)=>{n()&&m.forEach(y=>y(M,w))};let g=null,p=0,v=0;window.addEventListener("keydown",M=>{if(M.repeat)return;const w=Gl[M.code];if(w){o.push(w),w==="down"&&(c=!0),M.preventDefault();const y=performance.now();w===g&&w!=="down"&&y-p<Bl?(d(w==="up"?"flip":"roll",w==="right"?-1:1),g=null):(g=w,p=y)}(M.code==="Space"||M.code==="Enter")&&(a.forEach(y=>y(M.code)),M.preventDefault()),s.get(M.code)?.()}),window.addEventListener("keyup",M=>{Gl[M.code]==="down"&&(c=!1)}),t.addEventListener("touchstart",M=>{const w=performance.now();for(const y of Array.from(M.changedTouches))i.set(y.identifier,{x0:y.clientX,y0:y.clientY,t0:w,hist:[{y:y.clientY,t:w}],hx:[{x:y.clientX,t:w}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),t.addEventListener("touchmove",M=>{M.preventDefault();const w=performance.now();for(const y of Array.from(M.changedTouches)){const x=i.get(y.identifier);if(!x)continue;for(x.hist.push({y:y.clientY,t:w});x.hist.length>1&&w-x.hist[0].t>Z3;)x.hist.shift();const b=y.clientY-x.hist[0].y;for(w>=x.cool&&Math.abs(b)>=j3&&(o.push(b<0?"up":"down"),b<0&&w-v<Bl+150?(d("flip",1),v=0):b<0&&(v=w),x.down=b>0&&r!==y.identifier,x.flicked=!0,x.cool=w+150,x.hist=[{y:y.clientY,t:w}]),x.hx.push({x:y.clientX,t:w});x.hx.length>1&&w-x.hx[0].t>J3;)x.hx.shift();const A=y.clientX-x.hx[0].x;w>=x.rollCool&&Math.abs(A)>=t.clientWidth*Q3&&(d("roll",A>0?-1:1),x.rollCool=w+700,x.hx=[{x:y.clientX,t:w}]);const z=y.clientX-x.x0;x.dragX===null&&Math.abs(z)>=X3&&Math.abs(z)>=Math.abs(y.clientY-x.y0)*.8&&(x.dragX=y.clientX,r===null&&(r=y.identifier,x.down=!1,u++,l=0)),r===y.identifier&&x.dragX!==null&&(l=(y.clientX-x.dragX)/Math.max(1,t.clientWidth))}},{passive:!1});const k=M=>{const w=performance.now();for(const y of Array.from(M.changedTouches)){const x=i.get(y.identifier);if(i.delete(y.identifier),r===y.identifier&&(r=null),!x||x.flicked||x.dragX!==null||M.type==="touchcancel")continue;Math.hypot(y.clientX-x.x0,y.clientY-x.y0)<=14&&w-x.t0<=350&&n()?o.push(y.clientX<t.clientWidth/2?"left":"right"):n()||a.forEach(A=>A())}};return t.addEventListener("touchend",k),t.addEventListener("touchcancel",k),t.addEventListener("mousedown",()=>a.forEach(M=>M())),{take(){return o.splice(0,o.length)},holdDown:()=>c||Array.from(i.values()).some(M=>M.down),steer(){if(r===null)return null;h!==u&&(h=u,f=e());let M=f-l*Y3;const w=Math.abs(M)-_.steerMax;return w>0&&(f-=Math.sign(M)*w,M-=Math.sign(M)*w),M},onAction(M){a.push(M)},onKey(M,w){s.set(M,w)},onTrick(M){m.push(M)}}}function Td(t){return/\.github\.io$/.test(location.hostname)||t.has("portal")}function Ad(t){return!gt.online||t.has("seed")||t.has("z")||t.get("auto")==="1"?!1:Td(t)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function ny(t){return Ad(t)&&!t.has("alt")}function ey(t){const n={};let e=null;async function o(c,i={}){try{const r={...n,accept:"application/json"};i.body&&(r["content-type"]="application/json");const l=await fetch(c,{...i,headers:r,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function a(c,i={}){const r=await o(c,i);return e="fail"in r?r.fail:null,"ok"in r?r.ok:null}const s=encodeURIComponent;return{board:c=>a(`api/ghosts?route=${s(c)}`),async paths(c,i){return i.length?(await a(`api/ghosts/paths?route=${s(c)}&pids=${i.map(s).join(",")}`))?.paths??{}:{}},leaderboard:(c="meters")=>o(`api/leaderboard?by=${c}&map=${gt.id}`),progress:()=>a("api/progress"),submit:(c,i)=>a("api/ghosts",{method:"POST",body:JSON.stringify({route:c,...i})}),lastFailure:()=>e,async logRun(c){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(c),headers:{...n,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const c=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return c?c.type==="opaqueredirect"||c.status===401?"auth":c.ok?"ok":"network":"network"}}}const Ps=10,oy=60/Ps,Jc=900*Ps,qi=t=>Math.max(-32768,Math.min(32767,Math.round(t*100)));function ay(t){const n=Math.min(Jc,Math.floor(t.length/3)),e=new DataView(new ArrayBuffer(4+n*6)),o=t[0]??0;e.setFloat32(0,o,!0);let a=e.getFloat32(0,!0);for(let i=0;i<n;i++){const r=qi(t[i*3]-a);a+=r/100,e.setInt16(4+i*6,r,!0),e.setInt16(6+i*6,qi(t[i*3+1]),!0),e.setInt16(8+i*6,qi(t[i*3+2]),!0)}let s="";const c=new Uint8Array(e.buffer);for(let i=0;i<c.length;i+=32768)s+=String.fromCharCode(...c.subarray(i,i+32768));return btoa(s)}function sy(t){let n;try{n=atob(t)}catch{return null}const e=Math.floor((n.length-4)/6);if(e<2)return null;const o=new Uint8Array(n.length);for(let i=0;i<n.length;i++)o[i]=n.charCodeAt(i);const a=new DataView(o.buffer),s={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let c=a.getFloat32(0,!0);if(!Number.isFinite(c))return null;for(let i=0;i<e;i++)c+=a.getInt16(4+i*6,!0)/100,s.z[i]=c,s.x[i]=a.getInt16(6+i*6,!0)/100,s.v[i]=a.getInt16(8+i*6,!0)/100;return s}function Nd(t,n,e){const o=Math.max(0,n*Ps),a=t.n-1,s=Math.min(a,Math.floor(o)),c=Math.min(a,s+1),i=Math.min(1,o-s);return e.z=t.z[s]+(t.z[c]-t.z[s])*i,e.x=t.x[s]+(t.x[c]-t.x[s])*i,e.v=t.v[s]+(t.v[c]-t.v[s])*i,e.ended=o>=a,e.after=Math.max(0,(o-a)/Ps),e}const zd=5,Wi=4,iy=1500,cy=200,ry=120;function Qc(t,n,e=!1){return e?1:Math.min(1,Math.max(0,(n-iy-t*cy)/ry))}const Cd=t=>t.length===1&&t[0].self;function ly(t){const n=t.runs.find(c=>c.pid===t.me),e=t.runs.filter(c=>c.pid!==t.me),o=n?.dist??0,a=c=>c.dist>=o?c.dist-o:(o-c.dist)*2,s=[];n&&s.push(n),e[0]&&s.push(e[0]);for(const c of e.slice(1).sort((i,r)=>a(i)-a(r))){if(s.length>=zd)break;s.push(c)}return s}function hy(){let t=[];const n=[];return{ghosts:()=>t,set(e){t=[];for(const o of e){const a=sy(o.path);a&&t.push({run:o.run,self:o.self,track:a,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of t)e.ahead=null,e.downSaid=!1},update(e,o){n.length=0;const a=Cd(t);return t.forEach((s,c)=>{Nd(s.track,e,s.at);const i=s.at.z-o,r=s.run.name,l=Qc(c,o,a)>0;l&&i>Wi&&s.ahead===!1&&n.push({type:"passed",name:r,self:s.self}),l&&i<-Wi&&s.ahead===!0&&n.push({type:"pass",name:r,self:s.self}),Math.abs(i)>Wi&&(s.ahead=i>0),s.at.ended&&!s.downSaid&&(s.downSaid=!0,l&&s.run.crash&&Math.abs(i)<300&&n.push({type:"down",name:r,self:s.self,dist:s.run.dist}))}),n},rank(e){return 1+t.filter(o=>o.at.z>e).length}}}function uy(){let t=[],n=0,e=!1;const o=a=>{t.length<Jc*3&&t.push(a.z,a.x,a.v)};return{start(a){t=[],n=0,e=!0,o(a)},afterStep(a){e&&(n++,n%oy===0&&o(a),a.mode==="over"&&(e=!1))},seconds:()=>n/60,truncated:()=>t.length>=Jc*3,finish:()=>ay(t)}}const Yi="skyrun.myGhost",Ba="me";function my(t){let n=null;const e=(s,c)=>!!s&&s.route===c&&typeof s.path=="string"&&Number.isFinite(s.dist);function o(s){let c=null;try{c=JSON.parse(localStorage.getItem(Yi)??"null")}catch{}const i=e(c,s)?c:null,r=e(n,s)?n:null;return i&&r?r.dist>i.dist?r:i:i??r}function a(s){const c=o(s);return{me:Ba,myName:null,total:c?1:0,runs:c?[{pid:Ba,name:"Bạn",dist:c.dist,score:c.score,dur:c.dur,crash:c.crash}]:[]}}return{board:async s=>a(s),async paths(s,c){const i=o(s);return i&&c.includes(Ba)?{[Ba]:i.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(s,c){const i=o(s),r=!i||c.dist>i.dist;if(r){n={route:s,dist:c.dist,score:c.score,dur:c.dur,crash:c.crash,path:c.path};try{localStorage.removeItem(Yi),localStorage.setItem(Yi,JSON.stringify(n))}catch{}}return{saved:r,best:r?c.dist:i.dist,rank:1,total:1,bestScore:c.score,scoreRank:1}},lastFailure:()=>null,logRun:t,ping:async()=>"ok"}}const dy="modulepreload",fy=function(t,n){return new URL(t,n).href},Fl={},gy=function(n,e,o){let a=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),r=i?.nonce||i?.getAttribute("nonce");a=l(e.map(u=>{if(u=fy(u,o),u in Fl)return;Fl[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(o)for(let d=c.length-1;d>=0;d--){const g=c[d];if(g.href===u&&(!h||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":dy,h||(m.as="script"),m.crossOrigin="",m.href=u,r&&m.setAttribute("nonce",r),document.head.appendChild(m),h)return new Promise((d,g)=>{m.addEventListener("load",d),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return a.then(c=>{for(const i of c||[])i.status==="rejected"&&s(i.reason);return n().catch(s)})},py="skyRuns",$l="sr-tele",Ol="../../shared/",Xi=new Map;function Dl(t){let n=Xi.get(t);return n||(n=new Promise((e,o)=>{const a=document.createElement("script");a.src=t,a.onload=()=>e(),a.onerror=()=>o(new Error(`không tải được ${t}`)),document.head.appendChild(a)}),n.catch(()=>Xi.delete(t)),Xi.set(t,n)),n}function vy(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return(n>>>0).toString(36)}function yy(t,n,e,o){const{route:a,rv:s,sv:c,alt:i,dist:r,dur:l,score:u,crash:h,tainted:f,...m}=t;return{v:1,ch:n,pk:e,at:o,route:a,rv:s,sv:c,alt:i,dist:Math.round(r*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:h??null,tainted:f,detail:JSON.stringify(m)}}let De=null;function by(){return De||(De=(async()=>{await Dl(`${Ol}portal-config.js`),await Dl(`${Ol}portal-firebase.js`);const t=window.Portal,n=t?.FB;if(!n?.configured())throw new Error("chưa cấu hình Firebase");const e=await n.load(),o=await gy(()=>import(`${n.SDK}/firebase-app.js`),[],import.meta.url),a=o.getApps().find(i=>i.name===$l)??o.initializeApp(t.CONFIG,$l),s=e.authM.getAuth(a);await s.authStateReady(),s.currentUser||await e.authM.signInAnonymously(s);let c;try{c=e.fsM.initializeFirestore(a,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{c=e.fsM.getFirestore(a)}return{fsM:e.fsM,db:c,uid:s.currentUser.uid,limit:n.limit.bind(n)}})(),De.catch(()=>De=null),De)}function wy(){const t=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async n=>{try{const e=await by();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,py),yy(n,t,vy(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const xy=1e9,My=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),ky=[...document.scripts].map(t=>/assets\/index-([\w-]+)\.js/.exec(t.src)?.[1]).find(Boolean)??"dev",Kl=t=>t.thermalV>8?"thermal":t.v<-2?"low":t.v>2?"high":"zero",Sy=(t,n)=>t>=xy?"trail":n>2?"u":n<-2?"d":"o",Ty=t=>$.zone(Z(t),Un(t)),Fa=(t,n)=>t.length?t[Math.min(t.length-1,Math.floor(n*t.length))]:0,un=t=>Math.round(t*100)/100;function Ay(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function Ny(t){let n={touch:!1,key:!1};addEventListener("keydown",()=>n.key=!0),addEventListener("pointerdown",h=>{h.pointerType==="touch"&&(n.touch=!0)});let e="",o=!1,a=0,s=-1,c=null,i=u(),r=!0,l=null;function u(){const h=f=>Object.fromEntries(f.map(m=>[m,0]));return{tiers:h(["low","zero","high","thermal"]),lSpawn:h(["o","u","d","trail"]),lTaken:h(["o","u","d","trail"]),bSpawn:h(["thermal","shield","smoke","boost"]),bTaken:h(["thermal","shield","smoke","boost"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1,crash:null}}return{start(h,f,m){e=f,o=m,a++,c=s<0?null:un((performance.now()-s)/1e3),n={touch:!1,key:!1},i=u(),i.lastCmd=h.time,r=!1,l=h},state:()=>l,frame(h,f,m){h>0&&h<.5&&(i.frames.length<3e4&&i.frames.push(h),i.scaleSum+=t.quality().scale*h),i.shown=Math.max(i.shown,f),i.near=m},afterStep(h,f){if(l=h,h.mode!=="run"&&h.mode!=="crash")return;const m=Kl(h);i.tiers[m]+=f,i.multSum+=h.mult*f,m!=="low"?i.lowSince=-1:i.lowSince<0&&(i.lowSince=h.time);for(const d of h.events)d.type==="lane"?i.swipes.lane++:d.type==="vert"?i.swipes[d.kind==="flare"?"up":"down"]++:d.type==="hurt"?i.hurts++:d.type==="crash"&&(i.deathNear=i.near,i.crash=d.kind),(d.type==="lane"||d.type==="vert")&&(i.lastCmd=h.time);for(const d of h.pickups){if(d.z>h.z-3.5)break;if(!i.seen.has(d.id))if(i.seen.add(d.id),d.kind==="lantern"){const g=Sy(d.id,d.v);i.lSpawn[g]++,d.taken&&i.lTaken[g]++}else i.bSpawn[d.kind]++,d.taken&&i.bTaken[d.kind]++}for(const d of h.obstacles){if(!d.passed||i.rows.has(d.row)||(i.rows.add(d.row),h.hurtRow===d.row||h.mode!=="run"))continue;const g=h.time-h.dodgeTime;g<1.5&&na(d,h.dodgeX,h.thermalV,0)&&i.leads.push(g),d.kind==="bridge"&&i.lowSince>=0&&h.time-i.lowSince>=.5&&i.bridgesFromLow++}},finish(h,f,m,d,g="crash"){if(r)return null;r=!0,s=performance.now(),f??=i.crash;const p=[...i.frames].sort((x,b)=>x-b),v=i.frames.reduce((x,b)=>x+b,0),k=[...i.leads].sort((x,b)=>x-b),M=bm(),w=Ne(),y=t.quality();return{lv:1,route:e,rv:d,sv:co,alt:o,build:ky,session:My,runNo:a,wait:c,dist:Math.floor(h.z),dur:un(h.time),score:Ae(h),crash:f,end:g,tainted:m,hurts:i.hurts,device:{tier:y.tier,gov:un(v>0?i.scaleSum/v:y.scale),fps50:Math.round(p.length?1/Fa(p,.5):0),fps5:Math.round(p.length?1/Fa(p,.95):0),input:n.touch&&n.key?"mixed":n.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:w.ghosts,music:M.music?w.music:"off",tutorial:Ay(),handling:h.handling},death:f?{phase:Math.round(Z(h.z)),zone:Ty(h.z),tier:Kl(h),sinceCmd:un(h.time-i.lastCmd)}:null,parts:{meters:Math.round(h.score),lantern:Math.round(h.parts.lantern),nearMiss:Math.round(h.parts.nearMiss),gust:Math.round(h.parts.gust),boost:Math.round(h.parts.boost)},lanterns:{spawned:i.lSpawn,taken:i.lTaken,bestStreak:h.bestStreak,avgMult:un(h.time>0?i.multSum/h.time:1)},tiers:{low:un(i.tiers.low),zero:un(i.tiers.zero),high:un(i.tiers.high),thermal:un(i.tiers.thermal)},swipes:i.swipes,bridgesFromLow:i.bridgesFromLow,boosters:{spawned:i.bSpawn,taken:i.bTaken},lead:{p10:un(Fa(k,.1)),p50:un(Fa(k,.5)),n:k.length},ghosts:{shown:i.shown,deathNear:i.deathNear}}}}}const tr="skyrun.pending",zy=12e4,Ul=[1500,4e3];function $a(){try{const t=JSON.parse(localStorage.getItem(tr)??"[]");return Array.isArray(t)?t:[]}catch{return[]}}function ji(t){try{t.length?localStorage.setItem(tr,JSON.stringify(t)):localStorage.removeItem(tr)}catch{}}function Vl(t){const n=Date.now(),e=[jc(new Date(n)),jc(new Date(n-864e5))].map(o=>o.slice(0,10));return typeof t.route=="string"&&e.includes(t.route.slice(0,10))&&!!t.run}function Cy(t){let n=performance.now(),e=!1;const o=s=>new Promise(c=>setTimeout(c,s));async function a(s,c){for(let i=0;;i++){const r=await t.submit(s,c);if(r)return{ok:r};const l=t.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||i>=Ul.length)return{fail:l};await o(Ul[i])}}return{keepAlive(s){const c=performance.now();c-n<zy||(n=c,t.ping().then(i=>{i!=="auth"||e||(e=!0,s())}))},async submit(s,c){n=performance.now();const i={route:s,run:c,at:Date.now()};ji([...$a().filter(Vl),i].slice(-3));const r=await a(s,c);return(!("fail"in r)||r.fail.kind==="rejected")&&ji($a().filter(l=>l.at!==i.at||l.route!==s)),r},async flush(){const s=$a().filter(Vl),c=[],i=[];for(const r of s)await t.submit(r.route,r.run)?c.push(r.run.dist):t.lastFailure()?.kind!=="rejected"&&i.push(r);return(s.length||$a().length)&&ji(i),c}}}const Ey=160;function Ly(t,n){const e=document.createElement("div");e.className="ghost-layer";const o=Array.from({length:n},()=>{const r=document.createElement("div");return r.className="ghost-tag",e.appendChild(r),r}),a=document.createElement("span");a.className="ghost-rank",a.hidden=!0,t.appendChild(e),(t.querySelector(".hud-rank-slot")??e).appendChild(a);const s=new L,c=new WeakMap;let i="";return{update(r,l,u,h,f,m){e.classList.toggle("on",m&&u.length>0);const d=m&&h&&h.total>1?`#${h.place}/${h.total}`:"";if(d!==i&&(i=d,a.hidden=!d,a.classList.toggle("first",h?.place===1),a.innerHTML=d?`${O.wingsuit}#${h.place}<small>/${h.total}</small>`:""),!m)return;const g=t.clientWidth,p=t.clientHeight;o.forEach((v,k)=>{const M=k<l.count?u[l.owner[k]]:void 0,w=l.alphas[k]??0;if(!M||w<.15||Math.abs(M.at.z-f)>Ey){v.style.opacity="0";return}if(s.copy(l.heads[k]).project(r),s.z>1){v.style.opacity="0";return}const y=M.self?"Kỷ lục của bạn":M.run.name;v.classList.toggle("self",M.self),v.textContent!==y&&(v.textContent=y,c.set(v,v.offsetWidth/2));const x=c.get(v)??0,b=Math.min(Math.max((s.x+1)*.5*g,x+6),g-x-6);v.style.opacity=Math.min(1,w*1.6).toFixed(2),v.style.transform=`translate(${b.toFixed(1)}px, ${((1-s.y)*.5*p).toFixed(1)}px) translate(-50%, -100%)`})}}}const us=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function Py(){const t=document.createElement("button");t.type="button",t.className="board-btn",t.setAttribute("aria-label","Bảng xếp hạng"),t.innerHTML=`<span class="board-btn-icon" aria-hidden="true">${O.trophy}</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>`,t.hidden=!0;const n=t.querySelector(".board-btn-rank");t.addEventListener("click",()=>t.classList.remove("fresh"));const e=o=>{n.hidden=!o,n.textContent=o?`#${o}`:""};return{el:t,setRank:e,bump(o){e(o),t.classList.remove("bump"),t.offsetWidth,t.classList.add("bump","fresh")},seen:()=>t.classList.remove("fresh")}}function _y(t,n,e,o){const a=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!a||us())return e.bump(o);const s=t.getBoundingClientRect(),c=n.getBoundingClientRect(),i=a.getBoundingClientRect(),r=c.left+c.width/2-s.left,l=c.top+c.height/2-s.top,u=i.left+i.width/2-s.left-r,h=i.top+i.height/2-s.top-l,f=document.createElement("div");f.className="rank-fly",f.innerHTML=O.trophy,f.style.left=`${r}px`,f.style.top=`${l}px`,t.appendChild(f);const m=(p,v,k)=>`translate(calc(-50% + ${p}px), calc(-50% + ${v}px)) scale(${k})`;let d=!1;const g=()=>{d||(d=!0,f.remove(),e.bump(o))};f.animate([{transform:m(0,0,.6),opacity:0},{transform:m(u*.3,h*.45-70,1.7),opacity:1,offset:.35},{transform:m(u,h,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=g,setTimeout(g,900)}const ms=t=>Math.floor(t).toLocaleString("vi-VN"),Oa="meters",Da=900;function Ry(t,n){const e=document.createElement("li");e.className=t.pos==="me"?"me":`ctx ${t.pos}`;for(const[o,a]of[["r",`#${t.rank}`],["n",t.pos!=="me"?t.name:"Bạn"],["v",ms(t.value)+n]]){const s=document.createElement("span");s.className=o,s.textContent=a,e.appendChild(s)}return e}function ql(t,n,e,o,a){const s=performance.now(),c=()=>{t.textContent=a(e)},i=r=>{const l=Math.min(1,(r-s)/o);t.textContent=a(Math.round(n+(e-n)*(1-(1-l)**3))),l<1&&requestAnimationFrame(i)};requestAnimationFrame(i),setTimeout(c,o+80)}function Iy(t){let n,e=0;async function o(){const s=e,c=await t.client.leaderboard(Oa);if(s!==e||!("ok"in c))return;const i=c.ok.mine;n=i?{rank:i.rank,value:i[Oa]??0}:null,i&&wd(Gt,i.meters??0),t.button.setRank(i?.rank??null)}function a(s,c,i,r,l){const{by:u,rank:h,best:f,improved:m,climbed:d}=c,{tab:g,unit:p}=t.text(u),v=tt=>r[tt-1],k=[],M=v(h-1),w=v(h+1);M&&k.push({rank:h-1,name:M.name,value:M[u]??0,pos:"above"}),k.push({rank:h,name:l,value:f,pos:"me"}),w&&k.push({rank:h+1,name:w.name,value:w[u]??0,pos:"below"});const y=document.createElement("div");y.className="rank-card",y.setAttribute("role","button"),y.setAttribute("aria-label",`Xem bảng xếp hạng ${g}`);const x=document.createElement("div");x.className="rank-head",x.innerHTML=`${O.trophy}<b>Bảng xếp hạng</b><span class="by"></span><span class="rank-chip" hidden></span>`,x.querySelector(".by").textContent=`· ${g}`;const b=x.querySelector(".rank-chip");b.textContent=m?i===null?"Mới lên bảng":d&&i?`▲ ${i.rank-h}`:"Kỷ lục mới":"";const A=document.createElement("ol");A.className="rank-rows";const z=k.map(tt=>Ry(tt,p));A.append(...z);const E=document.createElement("div");E.className="rank-note";const N=(i?r.slice(h,i.rank):i===null?r.slice(h):[]).map(tt=>tt.name),S=N.length>2?`${N.slice(0,2).join(", ")} +${N.length-2}`:N.join(", ");E.textContent=h===1&&d?"Bạn đang dẫn đầu bảng!":d&&S?`Vượt ${S}!`:i===null?"Đã có tên trên bảng!":d?`Lên hạng #${h}!`:h===1?m?"Kỷ lục mới — giữ ngôi #1":"Bạn vẫn giữ ngôi #1":m?`Kỷ lục mới — giữ hạng #${h}`:M?`Vượt ${ms(M[u]??0)}${p} để lên #${h-1}`:`Bay xa hơn để vượt #${h-1}`;const P=document.createElement("span");P.className="rank-more",P.textContent="Cả bảng ›",E.appendChild(P),y.append(x,A,E),nn(y);let I=!1;y.addEventListener("click",tt=>{tt.stopPropagation(),I=!0,t.button.seen(),t.open(u)}),s.before(y);const G=z[k.findIndex(tt=>tt.pos==="me")],K=G.querySelector(".r"),V=()=>{b.hidden=!b.textContent,m&&G.classList.add("shine"),setTimeout(()=>{if(!m||I)return t.button.setRank(h);y.isConnected?_y(t.root,K,t.button,h):t.button.bump(h)},us()?0:450)};if(!d||us())return void setTimeout(V,us()?0:400);const j=G.getBoundingClientRect().height+2,J=w?z[z.length-1]:void 0,et={duration:Da,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};G.animate([{transform:`translateY(${j}px)`,opacity:J?1:0},{transform:"none",opacity:1}],et),J?.animate([{transform:`translateY(${-j}px)`},{transform:"none"}],et),K.textContent=i?`#${i.rank}`:"#–";const mt=G.querySelector(".v");i&&(mt.textContent=ms(i.value)+p),setTimeout(()=>{i?ql(K,i.rank,h,Da,tt=>`#${tt}`):K.textContent=`#${h}`,ql(mt,i?.value??0,f,Da,tt=>ms(tt)+p)},380),setTimeout(V,380+Da)}return{snapshot:o,async celebrate(s,c,i){e++;const r=s.metersRank!==void 0?"meters":"score",l=r===Oa?n:void 0,u=i?t.root.querySelector(".screens.over .over-card [data-online]"):null,h=u?await t.client.leaderboard(r):null,f=h&&"ok"in h?h.ok:null,m=f?.mine?.rank??s.metersRank??s.scoreRank,d=f?.mine?.[r]??(r==="meters"?s.bestMeters??0:s.bestScore);r===Oa&&(n={rank:m,value:d});const g=r==="meters"?c.dist:c.score,p=l===null||(l!==void 0?d>l.value:g>=d),v=p&&(l===null||l!==void 0&&l.rank>m);if(u?.isConnected)return a(u,{by:r,rank:m,best:d,improved:p,climbed:v},l,f?.top??[],f?.mine?.name??"");t.button.setRank(m),p&&t.button.el.classList.add("fresh")}}}function Hy(t,n){const e=t.querySelector(".me");if(!e)return;e.style.position="static";const o=e.getBoundingClientRect(),a=t.getBoundingClientRect();e.style.position="",t.scrollTop+=o.top-a.top-(a.height-o.height)/2,n&&e.classList.add("me-new")}const ha=t=>Math.floor(t).toLocaleString("vi-VN"),we={meters:{tab:"Quãng xa",icon:"route",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",icon:"star",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",icon:"lantern",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},Wl=["meters","score","lanterns"];function Gy(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":t.kind==="network"?`Chưa tải được bảng (${t.status?`máy chủ báo lỗi ${t.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${t.why??t.status}).`}const ee=(t,n,e,o="span")=>{const a=document.createElement(o);a.className=n,a.textContent=e,t.appendChild(a)},By=t=>(t.trim().split(/\s+/).pop()??"?").charAt(0).toUpperCase()||"?",Fy=(t,n)=>n==="meters"?Rl(t.route):`${ha(t.dist)} m · ${Rl(t.route)}`;function Yl(t,n,e,o){const a=document.createElement("li");return a.className=o?"me":"",ee(a,"board-rank",`#${e}`),ee(a,"board-name",o?"Bạn":t.name),ee(a,"board-score",ha(t[n]??0)+we[n].unit),ee(a,"board-meta",Fy(t,n)),a}function $y(t,n,e){return t.slice(0,3).map((o,a)=>{const s=document.createElement("div");return s.className=`pod pod-${a+1}${o.pid===e?" me":""}`,ee(s,"pod-avatar",By(o.name)),ee(s,"pod-name",o.pid===e?"Bạn":o.name),ee(s,"pod-val",ha(o[n]??0)+we[n].unit,"b"),ee(s,"pod-step",String(a+1)),s})}const Oy=[1500,4e3];function Dy(t,n){const e=Py(),o=e.el,a=document.createElement("div");a.className="board-panel",a.hidden=!0;const s=Wl.map(x=>`<button type="button" role="tab" class="ui-seg" data-by="${x}">${O[we[x].icon]}${we[x].tab}</button>`).join("");a.innerHTML=`
    <div class="board-card ui-indigo ui-trim" role="dialog" aria-label="Bảng xếp hạng">
      <div class="panel-head">${O.trophy}<div><b>${gt.name}<span class="panel-pill board-season"></span></b><small class="board-sub"></small></div></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="board-tabs" role="tablist">${s}</div>
      <p class="board-status"></p>
      <button type="button" class="ui-btn-cloth board-retry" hidden>${O.rotate}Thử lại</button>
      <div class="board-scroll" data-scroll><div class="board-podium" hidden></div><ol class="board-list"></ol></div>
    </div>`,t.append(o,a);const c=a.querySelector(".board-season"),i=a.querySelector(".board-sub"),r=a.querySelector(".board-status"),l=a.querySelector(".board-retry"),u=a.querySelector(".board-list"),h=a.querySelector(".board-podium"),f=a.querySelector("[data-scroll]"),m=[...a.querySelectorAll(".board-tabs button")];c.textContent=`Mùa ${co}`;let d="meters";const g={};nn(o),nn(a);let p=0,v=!1;const k=()=>{a.hidden=!0,p++,v=!1};function M(){for(const x of m)x.setAttribute("aria-selected",String(x.dataset.by===d));i.textContent=we[d].sub}async function w(){a.hidden=!1,M(),l.hidden=!0,r.textContent="Đang tải…",r.classList.remove("empty"),u.replaceChildren(),h.replaceChildren(),h.hidden=!0;const x=++p,b=d,A=we[b];let z=await n.leaderboard(b);for(const T of Oy){if(x!==p||"ok"in z||z.fail.kind!=="network")break;await new Promise(N=>setTimeout(N,T)),x===p&&(z=await n.leaderboard(b))}if(x!==p)return;if("fail"in z){const T=g[b];r.textContent=Gy(z.fail)+(T?` Bảng ĐÃ ghi ${A.best} của bạn: ${ha(T.best)}${A.unit} — hạng #${T.rank}.`:""),l.hidden=z.fail.kind==="auth";return}const E=z.ok;if(c.textContent=`Mùa ${E.season}`,!E.top.length){r.innerHTML=`${O.lantern}<span>${A.empty}</span>`,r.classList.add("empty");return}if(r.textContent=`${ha(E.total)} ${A.count}`,h.replaceChildren(...$y(E.top,b,E.me)),h.hidden=!1,u.replaceChildren(...E.top.slice(3).map((T,N)=>Yl(T,b,N+4,T.pid===E.me))),E.mine&&!E.top.some(T=>T.pid===E.me)){const T=document.createElement("li");T.className="board-gap",T.textContent="…",u.append(T,Yl(E.mine,b,E.mine.rank,!0))}Hy(f,v),v=!1}const y=Iy({root:t,client:n,button:e,text:x=>we[x],open:x=>(d=x,v=!0,void w())});y.snapshot(),o.addEventListener("click",()=>{w()}),l.addEventListener("click",()=>{w()});for(const x of m)x.addEventListener("click",()=>{d=Wl.find(b=>b===x.dataset.by)??"meters",w()});return a.querySelector("[data-close]").addEventListener("click",k),a.addEventListener("click",x=>{x.target===a&&k()}),window.addEventListener("keydown",x=>{x.code==="Escape"&&!a.hidden&&k()}),{setAvailable(x){o.hidden!==!x&&(o.hidden=!x,x||k())},runStart(){k(),y.snapshot()},remember(x,b,A){g.score={best:x.bestScore,rank:x.scoreRank},x.metersRank!==void 0&&(g.meters={best:x.bestMeters??0,rank:x.metersRank}),wd(gt.id,x.bestMeters??0),x.lanternRank!==void 0&&(g.lanterns={best:x.bestLanterns??0,rank:x.lanternRank}),y.celebrate(x,b,A)}}}const Ce=t=>Math.floor(t).toLocaleString("vi-VN");function Ky(t,n){const e=t.runs[0];if(n)return e?[{icon:"wingsuit",text:`Bóng hôm nay ${Ce(e.dist)} m`}]:[];if(!e)return[{icon:"crown",text:"Chưa ai bay hôm nay — mở đường!"}];const o=e.pid===t.me?"Bạn":e.name;return[{icon:"users",text:`${Ce(t.total)} người bay hôm nay`},{icon:"crown",text:`${o} ${Ce(e.dist)} m`}]}function Uy(t,n){return n?[{icon:"wingsuit",text:t.saved?`Bóng mới ${Ce(t.best)} m`:`Bóng hôm nay ${Ce(t.best)} m`}]:[]}function Vy(t,n){return{score:n.score>=t.bestScore?t.scoreRank:null,lantern:t.lanternRank&&n.lanterns>=(t.bestLanterns??0)?t.lanternRank:null}}function qy(t,n){if(!t)return null;let e=0,o=0;for(const s of t.runs)s.pid===t.me&&(e=s.dist);const a=Math.max(n,e);for(const s of t.runs)s.pid!==t.me&&s.dist>a&&o++;return{place:o+1,total:t.total+(e>0?0:1)}}const Wy=t=>`Ván có bot lái hoặc nhảy quãng — ${t?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function Yy(t){return t.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":t.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${t.why??t.status}).`}function Xy(t){return t.type==="pass"?t.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${t.name}!`,"combo"]:t.type==="passed"?[t.self?"Kỷ lục của bạn vượt lên":`${t.name} vượt lên`,"big"]:[t.self?`Kỷ lục của bạn dừng ở ${Ce(t.dist)} m`:`${t.name} rơi ở ${Ce(t.dist)} m`,"big"]}const jy=200,Zy=1.2,Jy=t=>Math.floor(t).toLocaleString("vi-VN");function Qy(t){const n=ny(t.params),e=Td(t.params),o=e?my(wy()):ey(t.params),a=Ad(t.params)?Ny({quality:t.quality}):null,s=uy(),c=Cy(o),i=hy(),r=Ly(t.root,zd),l=n&&!e?Dy(t.root,o):null;let u="",h=0,f=!1,m=-9,d=null,g=0,p=!1,v=0,k=null,M="";const w=b=>{M=b,t.screens.setOnline(b)},y=(b,A,z)=>{const E=b&&a?.finish(b,A,p,t.rv,z);E&&o.logRun(E)};a&&addEventListener("pagehide",()=>f&&y(a.state(),null,"close"));async function x(b,A){u=b;const z=++h,E=await c.flush(),T=await o.board(b);if(z!==h||!T)return;k=T;const N=E.length?`Đã gửi bù ván ${Jy(Math.max(...E))} m`:"";A?(t.screens.setChips(Ky(T,e)),w(N)):N&&w(M?`${M} · ${N}`:N);const S=ly(T),P=await o.paths(b,S.map(G=>G.pid));if(z!==h)return;const I=S.filter(G=>P[G.pid]).map(G=>({run:G,self:G.pid===T.me,path:P[G.pid]}));f?d=I:i.set(I)}return n&&x(t.route,!0),{runStart(b,A){n&&A!==u&&(i.set([]),d=null,x(A,!1)),d&&i.set(d),d=null,s.start(b),i.reset(),f=!0,l?.runStart(),m=-9,g++,p=!1,v=b.z,a?.start(b,A,t.params.has("alt"))},afterStep(b,A){(A||Math.abs(b.z-v)>10)&&(p=!0),v=b.z,s.afterStep(b),a?.afterStep(b,1/60)},present(b,A,z,E){const T=f&&(b.mode==="run"||b.mode==="crash"),N=s.seconds()-(1-z)/60;if(T)for(const S of i.update(N,A.z))b.mode!=="run"||N-m<Zy||(m=N,t.hud.toast(...Xy(S)));if(n&&!e&&c.keepAlive(()=>T?t.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):w(`${M?`${M} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),t.view.update(T?i.ghosts():[],A,N,E,t.camera.position),a&&b.mode==="run"){let S=!1;for(let P=0;P<t.view.count;P++)S||=t.view.heads[P].distanceTo(t.camera.position)<15;a.frame(E,t.view.count,S)}r.update(t.camera,t.view,i.ghosts(),qy(k,A.z),A.z,T),l?.setAvailable(t.screens.visible()!==null)},async progress(){if(!n||e)return null;const b=await o.progress();return b?{score:b.season===co?b.score:{},meters:b.meters??{},run:b.run??{}}:null},runAbandon(b){f&&y(b,null,"abandon"),f=!1},async runOver(b,A){if(f=!1,y(b,A,"crash"),!n||!u||b.z<jy)return;if(p)return w(Wy(e));const z=g;e||w("Đang gửi ván lên bảng…");const E=await c.submit(u,{sv:co,lanterns:b.lanterns,dist:Math.floor(b.z),score:Ae(b),dur:Math.min(3600,Math.round(s.seconds()*10)/10),crash:s.truncated()?null:A,path:s.finish()});z===g&&("fail"in E?w(Yy(E.fail)):(w(""),t.screens.setChips(Uy(E.ok,e)),e||t.screens.setRanks(Vy(E.ok,{score:Ae(b),lanterns:b.lanterns})))),"ok"in E&&l?.remember(E.ok,{dist:Math.floor(b.z),score:Ae(b)},z===g),"ok"in E&&await x(u,!1)}}}const Ed=()=>`<button type="button" class="ui-badge" data-snd="sfx" aria-label="Tắt/bật tiếng hiệu ứng">${O.speaker}</button><button type="button" class="ui-badge" data-snd="music" aria-label="Tắt/bật nhạc nền">${O.note}</button>`;function tb(t,n){const e=document.createElement("div");e.className="sound-btns",e.dataset.state="idle",e.innerHTML=Ed(),t.appendChild(e),nn(e);const o=()=>{const s=n.prefs();for(const c of t.querySelectorAll("[data-snd]"))c.classList.toggle("off",!s[c.dataset.snd])},a=s=>{n.prefs()[s]&&n.justUnlocked()||(s==="sfx"?n.toggleSfx:n.toggleMusic)(),o()};return t.addEventListener("click",s=>{const c=s.target instanceof Element?s.target.closest("[data-snd]"):null;c&&(s.stopPropagation(),a(c.dataset.snd==="sfx"?"sfx":"music"))}),o(),{sync:o,toggle:a,el:e}}const nb=.8;function eb(t,n,e){const o=document.createElement("button");o.type="button",o.className="ui-badge pause-btn",o.setAttribute("aria-label","Tạm dừng"),o.innerHTML=O.pause,n.prepend(o);const a=document.createElement("div");a.className="pause-screen",a.innerHTML=`<div class="pause-card ui-indigo ui-trim" role="dialog" aria-label="Tạm dừng">
      <div class="pause-title">${O.pause}Tạm dừng</div>
      <button type="button" class="ui-btn-lacquer" data-resume>${O.play}Bay tiếp</button>
      <div class="pause-row">${Ed()}<button type="button" class="ui-badge" data-open-settings aria-label="Cài đặt">${O.gear}</button></div>
      <button type="button" class="ui-btn-cloth pause-home" data-home>${O.home}Về sảnh</button>
      <div class="pause-confirm" hidden><p>Bỏ ván này?</p><div class="row">
        <button type="button" class="ui-btn-cloth" data-stay>Ở lại</button><button type="button" class="ui-btn-cloth quit" data-quit>Bỏ ván</button></div></div>
      <div class="pause-hint">${e.touch?"Hoặc chạm ra ngoài bảng":"Hoặc bấm Space / P"}</div></div>`,t.appendChild(a),nn(a);const s=a.querySelector("[data-home]"),c=a.querySelector(".pause-confirm"),i=d=>{c.hidden=!d,s.hidden=d};let r=!1,l=!1,u=!1,h=1;const f=()=>{a.classList.toggle("on",r),n.dataset.state=u?"crash":l?r?"paused":"run":"idle",r||i(!1)},m={paused:()=>r,pause(){!l||r||(r=!0,f())},resume(){r&&(r=!1,h=.15,f())},setRunning(d,g=!1){l===d&&u===g||(l=d,u=g,d||(r=!1),f())},factor(d){return r?0:(h=Math.min(1,h+d/nb),h)}};return o.addEventListener("click",()=>m.pause()),a.addEventListener("click",d=>{const g=d.target instanceof Element?d.target:null;g&&(g===a||g.closest("[data-resume]")?m.resume():g.closest("[data-home]")?i(!0):g.closest("[data-stay]")?i(!1):g.closest("[data-quit]")&&(m.resume(),e.onHome()))}),nn(o),document.addEventListener("visibilitychange",()=>{document.hidden&&m.pause()}),window.addEventListener("keydown",d=>{!d.repeat&&(d.code==="KeyP"||d.code==="Escape")&&(r?m.resume:m.pause)()}),m}const ob=1.2,Zi=new L,Ro=new L,Xl=new L;function jl(t,n,e){const o=e.clientWidth,a=e.clientHeight;if(!o||!a||(t.getWorldPosition(Zi),Ro.copy(Zi).project(n),Ro.z>1))return null;Xl.setFromMatrixColumn(n.matrixWorld,0).multiplyScalar(ob).add(Zi).project(n);const s=Math.abs(Xl.x-Ro.x)*.5*o,c=(Ro.x*.5+.5)*o,i=(.5-Ro.y*.5)*a;return{x:c-s,y:i-s,w:2*s,h:2*s}}function ab(t,n="ui-chip"){const e=document.createElement("span");e.className=`${n}${t.tone?` ${t.tone}`:""}`,e.innerHTML=O[t.icon];const o=document.createElement("span");return o.textContent=t.text,e.appendChild(o),e}function Ld(t,n,e){t&&(t.replaceChildren(...(n??[]).map(o=>ab(o,e))),t.hidden=!n?.length)}const sb=[["dragSide","Kéo ngang: lượn tránh cột đá","← →"],["swipeUp","Vuốt lên: vọt qua mỏm đá","↑"],["swipeDown","Vuốt xuống: chui dưới cầu","↓"],["lantern","Nhặt đèn trời: nhân điểm",""],["heart","Hai tim: va nhẹ chỉ mất một",""]];function ib(t){const n=document.createElement("div");n.className="help-panel",n.hidden=!0,n.innerHTML=`
    <div class="help-card ui-indigo ui-trim" role="dialog" aria-label="Cách chơi">
      <div class="panel-head">${O.help}<b>Cách chơi</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <ul class="help-rows">${sb.map(([o,a,s])=>`<li><span class="help-ic">${O[o]}</span><span>${a}</span>${s?`<kbd class="key-only">${s}</kbd>`:""}</li>`).join("")}</ul>
      <p class="help-keys key-only"><kbd>P</kbd> / <kbd>Space</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</p>
      <button type="button" class="ui-btn-lacquer" data-close>${O.check}Đã hiểu</button>
    </div>`,t.appendChild(n),nn(n);const e=()=>{n.hidden=!0};return n.addEventListener("click",o=>{o.stopPropagation();const a=o.target instanceof Element?o.target:null;(a===n||a?.closest("[data-close]"))&&e()}),window.addEventListener("keydown",o=>{!n.hidden&&(o.code==="Escape"||o.code==="Space"||o.code==="Enter")&&e()},{capture:!0}),{open:()=>{n.hidden=!1}}}const Kn=t=>Math.floor(t).toLocaleString("vi-VN"),cb={pillar:["pillar","dragSide","Kéo ngang sang làn trống","Bấm ← → sang làn trống"],spike:["spike","swipeUp","Vuốt lên để vọt qua","Bấm ↑ để vọt qua"],ridge:["ridge","swipeUp","Vuốt lên vọt qua sống đá","Bấm ↑ vọt qua sống đá"],bridge:["bridge","swipeDown","Vuốt xuống chui dưới cầu","Bấm ↓ chui dưới cầu"],overhang:["overhang","swipeDown","Vuốt xuống chui dưới mái đá","Bấm ↓ chui dưới mái đá"]},rb={spike:["house","swipeUp","Vuốt lên vọt qua nóc nhà","Bấm ↑ vọt qua nóc nhà"],ridge:["house","swipeUp","Vuốt lên vọt qua mái đình","Bấm ↑ vọt qua mái đình"],bridge:["house","swipeDown","Vuốt xuống chui qua cổng làng","Bấm ↓ chui qua cổng làng"]},lb=["bridge","swipeDown","Vuốt xuống chui dưới cabin","Bấm ↓ chui dưới cabin"],hb={balloon:["balloon","swipeUp","Vuốt lên vọt qua khinh khí cầu","Bấm ↑ vọt qua khinh khí cầu"],boulder:["spike","swipeUp","Vuốt lên vọt qua tảng đá","Bấm ↑ vọt qua tảng đá"],pine:["pillar","dragSide","Kéo ngang né cây pơ mu","Bấm ← → né cây pơ mu"],basket:["balloon","swipeDown","Vuốt xuống chui dưới khí cầu","Bấm ↓ chui dưới khí cầu"]};function ub(t,n){let e={d:30,skin:void 0};for(const o of t.obstacles)o.kind===n&&Math.abs(o.z-t.z)<e.d&&(e={d:Math.abs(o.z-t.z),skin:o.skin});return e.skin}function mb(t,n,e){if(matchMedia("(prefers-reduced-motion: reduce)").matches||n<=0)return void(t.textContent=Kn(n));const o=performance.now(),a=s=>{const c=Math.min(1,(s-o)/e);t.textContent=Kn(n*(1-(1-c)**3)),c<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(()=>{t.textContent=Kn(n)},e+80)}function db(t,n){const[e,o]=t.querySelectorAll("[data-stats] > .ui-chip"),a=(s,c)=>{if(!s||!c||s.textContent?.startsWith("0 "))return;const i=s.querySelector(".chip-rank")??s.appendChild(document.createElement("b"));i.className="chip-rank",i.textContent=`#${c}`};a(e,n.score),a(o,n.lantern)}const fb=.9;function gb(t,n){const e=Math.min(1,t/n);return`<div class="over-goal" role="img" aria-label="Đạt ${Math.floor(e*100)}% kỷ lục ${Kn(n)} m"><span class="goal-bar"><i style="width:${(e*100).toFixed(1)}%"></i></span><span class="goal-best">${O.trophy}Kỷ lục ${Kn(n)} m</span></div>`}function pb(t,n,e,o,a){const s=Ae(n),c=J5(Gt,n.z,s,a),i=Math.floor(n.z),r=!c.record&&!c.tie&&i<c.prevM,l=c.record?'<span class="ui-ribbon">Kỷ lục mới!</span>':c.tie?'<span class="ui-ribbon tie">Bằng kỷ lục</span>':r&&i>=c.prevM*fb?`<span class="over-kicker near">Suýt kỷ lục! Thiếu ${Kn(c.prevM-i)} m</span>`:'<span class="over-kicker">Hạ cánh khẩn cấp</span>',u=e?ub(n,e):void 0,h=e?u&&hb[u]||Un(n.z)&&rb[e]||e==="bridge"&&ci(n.z)&&lb||cb[e]:null;return t.innerHTML=`
    <div class="over-card ui-paper" role="dialog" aria-label="Kết thúc ván">
      <div class="over-left">
        <div class="over-head">${l}</div>
        <div class="over-hero"><span data-count>0</span><small>m</small></div>
        ${r?gb(i,c.prevM):c.record&&c.prevM>0?`<div class="over-goal up">${O.trophy}Hơn kỷ lục cũ ${Kn(i-c.prevM)} m</div>`:""}
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
    </div>`,Ld(t.querySelector("[data-stats]"),[{icon:"star",text:`${Kn(s)} điểm`},{icon:"lantern",text:`${Kn(n.lanterns)} đèn`}]),mb(t.querySelector("[data-count]"),n.z,900),c.record}const Zl=t=>Math.floor(t).toLocaleString("vi-VN");function vb(){const t=jr(Gt);return t?t.m>0?{icon:"trophy",text:`Kỷ lục ${Zl(t.m)} m`,tone:"gold"}:{icon:"trophy",text:`Kỷ lục ${Zl(t.score)} điểm`,tone:"gold"}:null}function yb(){return`
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
    </div>`}function bb(t){const n=t.querySelector(".title-logo");if(!n)return;const e=()=>{t.classList.add("no-logo")};n.complete&&!n.naturalWidth?e():n.addEventListener("error",e,{once:!0})}const wb=800,xb=350;function Mb(t,n,e){const o=document.createElement("div");o.className="screens",t.appendChild(o);const a=ib(t),s=matchMedia("(pointer: coarse)").matches;let c=null,i=0,r="",l=[],u=0;const h=()=>{const d=o.querySelector("[data-online]");d&&(d.textContent=r,d.hidden=!r);const g=c==="title"?vb():null;Ld(o.querySelector("[data-chips]"),g?[g,...l]:l)};o.addEventListener("click",d=>{const p=(d.target instanceof Element?d.target:null)?.closest("[data-play],[data-lobby],[data-help]");p&&(d.stopPropagation(),p.dataset.play!==void 0?n():p.dataset.lobby!==void 0?e():a.open())}),Z5(()=>{c==="title"&&h()});const f=()=>{for(const d of o.querySelectorAll("button"))nn(d)},m=()=>{clearTimeout(u),o.classList.remove("leaving")};return{visible:()=>c,tapReady:()=>c!=="over"||performance.now()-i>wb,showTitle(){m(),c="title",o.className="screens title",o.innerHTML=yb(),bb(o),f(),h()},setOnline(d){r=d??"",h()},setChips(d){l=d??[],h()},setRanks(d){c==="over"&&db(o,d)},showOver(d,g,p){m(),c="over",i=performance.now(),o.className="screens over";const v=pb(o,d,g,s,p);return f(),r="",l=[],h(),v},hide(){const d=c;if(c=null,d!=="title"||matchMedia("(prefers-reduced-motion: reduce)").matches){o.className="screens",o.innerHTML="";return}o.classList.add("leaving"),u=window.setTimeout(()=>{o.className="screens",o.innerHTML=""},xb)}}}const kb=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],Sb=[["soft","Êm","mặc định"],["mid","Vừa","nhanh chút"],["fast","Nhanh","gắt nhất"]],Tb={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách của map — hết bài tự sang bài khác"},Jl=t=>`<div class="two" data-sw="${t}"><button type="button" class="ui-seg" data-on="1">Bật</button><button type="button" class="ui-seg" data-on="0">Tắt</button></div>`;function Ab(t,n,e,o,a){o.mode=Ne().ghosts;const s=document.createElement("button");s.type="button",s.className="ui-badge",s.dataset.openSettings="",s.setAttribute("aria-label","Cài đặt"),s.innerHTML=O.gear,n.el.insertBefore(s,n.el.querySelector("[data-snd]"));const c=document.createElement("div");c.className="settings-panel",c.hidden=!0,c.innerHTML=`
    <div class="settings-card ui-indigo ui-trim" role="dialog" aria-label="Cài đặt">
      <div class="panel-head">${O.gear}<b>Cài đặt</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="settings-scroll" data-scroll>
        <h3>${O.dragSide}Đổi hướng <small>tốc độ lách trái / phải</small></h3><div class="settings-handling"></div>
        <p class="settings-hint">Lách càng nhanh càng dễ né sát giờ chót, nhưng chao càng gắt.</p>
        <h3>${O.speaker}Âm thanh</h3>
        <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span>${Jl("sfx")}</div>
        <div class="settings-row"><span>Nhạc nền</span>${Jl("music")}</div>
        <h3>${O.note}Chọn nhạc nền <small data-map-music></small></h3><p class="settings-note"></p><div class="settings-music"></div>
        <h3>${O.wingsuit}Bóng ma <small>người đã bay hôm nay</small></h3><div class="settings-ghost"></div>
      </div>
    </div>`,t.append(c),nn(c);const i=c.querySelector(".settings-note");c.querySelector("[data-map-music]").textContent=`nhạc của ${gt.name}`;const r=[Tb,...Qs(gt.id)].map(g=>{const p=document.createElement("button");return p.type="button",p.className=`ui-seg settings-opt${g.id==="shuffle"?" shuffle":""}`,p.dataset.music=g.id,p.title=g.style,p.innerHTML='<span class="name"></span><span class="now">♪</span>',p.querySelector(".name").textContent=g.label,p});c.querySelector(".settings-music").append(...r);const l=kb.map(([g,p])=>{const v=document.createElement("button");return v.type="button",v.className="ui-seg",v.dataset.ghost=g,v.innerHTML=`${O.wingsuit}<span>${p}</span>`,v});c.querySelector(".settings-ghost").append(...l);const u=Sb.map(([g,p,v])=>{const k=document.createElement("button");return k.type="button",k.className="ui-seg",k.dataset.handling=g,k.innerHTML=`<span>${p}</span><small>${v}</small>`,k});c.querySelector(".settings-handling").append(...u);const h=()=>{const g=e.music(),p=g?.choice()??Ne().music,v=g?.playing()?.id,k=g?.loading()?.id;for(const y of r){const x=y.dataset.music;y.classList.toggle("on",x===p),y.classList.toggle("playing",x===v||x===k),y.classList.toggle("loading",x===k)}const M=e.prefs();i.textContent=M.music?"":"Nhạc đang tắt — chọn một bài là bật lại.";for(const y of l)y.classList.toggle("on",y.dataset.ghost===o.mode);const w=Ne().handling;for(const y of u)y.classList.toggle("on",y.dataset.handling===w);for(const y of c.querySelectorAll("[data-sw] [data-on]")){const x=y.parentElement.dataset.sw;y.classList.toggle("on",M[x]===(y.dataset.on==="1"))}};let f=0;const m=()=>{c.hidden=!0,clearInterval(f)},d=()=>{a.pause(),c.hidden=!1,h(),f=window.setInterval(h,1e3)};nn(s),t.addEventListener("click",g=>{g.target instanceof Element&&g.target.closest("[data-open-settings]")&&d()}),c.addEventListener("click",g=>{const p=g.target instanceof Element?g.target:null;if(p===c||p?.closest("[data-close]"))return m();const v=p?.closest("[data-music],[data-ghost],[data-on],[data-handling]");if(v){if(v.dataset.handling)Dc({handling:v.dataset.handling});else if(v.dataset.on){const k=v.parentElement.dataset.sw;e.prefs()[k]!==(v.dataset.on==="1")&&(k==="sfx"?e.toggleSfx:e.toggleMusic)()}else v.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(v.dataset.music)):(o.mode=v.dataset.ghost,Dc({ghosts:o.mode}));n.sync(),h()}}),window.addEventListener("keydown",g=>{c.hidden||(g.stopPropagation(),g.code==="Escape"&&m())},{capture:!0})}const Pd=`
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
`,Nb=`
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
`,zb=`
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
}`,Cb=`
#include <fog_pars_fragment>
${de}
${Ir}
#ifdef HAZARD
${ei}
#endif
uniform float uLift;
uniform float uWaterY;  // mặt nước (Fansipan: chân mỏm sũng nước) — chỉ nhánh granite đọc
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;
varying float vShade;
vec3 srgb(vec3 c) { return pow(c, vec3(2.2)); }
${Pd}
${Nb}

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
}`;let Eb=null,Lb=null;function _d(t,n){const e=new Tt({vertexShader:zb,fragmentShader:Cb,defines:Sm(t?{HAZARD:1}:{}),uniforms:Rn.merge([In.fog]),fog:!0});return e.uniforms.uLift=n,e.uniforms.uRegionHg=bo,e.uniforms.uWaterY=Rr,t&&Object.assign(e.uniforms,ho),e}const Rd={value:1};function Zr(){return Eb??=_d(!0,Rd)}function ri(){return Lb??=_d(!1,Rd)}const Pb=$.archPhases,_b=1600;function Rb(t,n){const e=Y(t),o=en(t),a=o>.5?90+50*C(n,1,71):ln(t)+22,s=(o>.5?58:46)+18*C(n,2,72),c={x:0,y:0,z:0},i=m=>rt(D(t,m,0,c).x,c.z)-e,r=[];for(let m=0;m<=24;m++){const d=m/24*Math.PI,g=-a*Math.cos(d),p=Math.min(i(g)-15,s),v=p+(s-p)*Math.pow(Math.sin(d),.55)+6*Math.sin(d*3+n);r.push(new L(g,v,4*Math.sin(d*2+n)))}const l=(o>.5?13:9)+4*C(n,3,73),u=new Ar(new Nr(r),90,l,14,!1),h=u.getAttribute("position"),f=u.getAttribute("normal");for(let m=0;m<h.count;m++){const g=(C(h.getX(m)*.08+n,h.getY(m)*.08+h.getZ(m)*.05,74)-.5)*l*.7;h.setXYZ(m,h.getX(m)+f.getX(m)*g,h.getY(m)+f.getY(m)*g*1.3,h.getZ(m)+f.getZ(m)*g)}return u.setAttribute("aCrest",new F(new Float32Array(h.count),1)),u.computeVertexNormals(),u}function Ib(){return new X(new Ar(new Nr([new L(0,0,0),new L(0,1,0)]),2,1,4,!1),ri())}function Hb(){const t=new wt,n=ri(),e=new Map,o={x:0,y:0,z:0};return{group:t,update(a){const s=new Set,c=Mn(a);for(let i=c;i<=c+1;i++)Pb.forEach((r,l)=>{const u=i*lt+r-Ht;if(u<a-60||u>a+_b)return;const h=i*10+l;if(s.add(h),e.has(h))return;const f=new X(Rb(u,h*1.37),n);D(u,0,0,o),f.position.set(o.x,o.y,o.z),f.rotation.y=Ct(u),f.matrixAutoUpdate=!1,f.updateMatrix(),t.add(f),e.set(h,f)});for(const[i,r]of e)s.has(i)||(t.remove(r),r.geometry.dispose(),e.delete(i))}}}const Gb=5,Bb=150,Fb=1700,$b=300,Ob=200,Db=new me({vertexColors:!0}),Kb=new me({vertexColors:!0}),Ji=new Tt({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:rn});function Ub(){const t=new B(.25,1.1,.25).translate(0,.55,0),n=t.getAttribute("position"),e=new Float32Array(n.count*3);for(let o=0;o<n.count;o++)e.set(n.getY(o)>.8?[.8,.08,.06]:[.92,.92,.88],o*3);return t.setAttribute("color",new F(e,3)),t}const Vb=Ub();function qb(){const t=new wt;let n=null,e=Number.NaN;const o={lat:0,y:0,amount:0},a={x:0,y:0,z:0},s=new Pt,c=i=>{const r=[],l=[],u=[],h=[],f=[],m=(y,x,b)=>(D(y,x,b-Y(y),a),[a.x,a.y,a.z]),d=(y,x,b,A,z,E,T)=>{y.push(...b,...A,...z,...b,...z,...E);for(let N=0;N<6;N++)x.push(...T)};let g=null,p=0;for(let y=i-Bb;y<=i+Fb;y+=Gb,p++){const x=Cm(y,o)&&o.amount>.5?{s:y,lat:o.lat,y:o.y}:null;if(g&&x){const[b,A]=[g,x],z=[.86,.85,.8],E=p%9===0?[.3,.3,.31]:[.2,.2,.22];d(r,l,m(b.s,b.lat,b.y-.6),m(A.s,A.lat,A.y-.6),m(A.s,A.lat,A.y+.85),m(b.s,b.lat,b.y+.85),z),d(r,l,m(b.s,b.lat,b.y+.85),m(A.s,A.lat,A.y+.85),m(A.s,A.lat+.45,A.y+.85),m(b.s,b.lat+.45,b.y+.85),z),d(r,l,m(b.s,b.lat+.45,b.y+.05),m(A.s,A.lat+.45,A.y+.05),m(A.s,A.lat+Me-1.2,A.y+.05),m(b.s,b.lat+Me-1.2,b.y+.05),E);const T=.45+(Me-1.65)/2;p%2===0&&d(r,l,m(b.s,b.lat+T-.12,b.y+.08),m(A.s,A.lat+T-.12,A.y+.08),m(A.s,A.lat+T+.12,A.y+.08),m(b.s,b.lat+T+.12,b.y+.08),[.95,.78,.25]);for(const N of[0,1]){const S=.45+(N===0?1.6:Me-3.4);u.push(...m(b.s,b.lat+S-.32,b.y+.9),...m(A.s,A.lat+S-.32,A.y+.9),...m(A.s,A.lat+S+.32,A.y+.9),...m(b.s,b.lat+S-.32,b.y+.9),...m(A.s,A.lat+S+.32,A.y+.9),...m(b.s,b.lat+S+.32,b.y+.9));for(const P of[b.s,A.s,A.s,b.s,A.s,b.s])h.push(P,N)}p%3===0&&f.length<Ob*4&&(D(x.s,x.lat+.2,x.y+.85-Y(x.s),a),f.push(a.x,a.y,a.z,Ct(x.s)))}g=x}if(!r.length)return null;const v=new ht;v.setAttribute("position",new F(new Float32Array(r),3)),v.setAttribute("color",new F(new Float32Array(l),3)),v.computeVertexNormals();const k=new ht;k.setAttribute("position",new F(new Float32Array(u),3)),k.setAttribute("aTrail",new F(new Float32Array(h),2));const M=new bt(Vb,Kb,Math.max(1,f.length/4));for(let y=0;y<f.length/4;y++)s.makeRotationY(f[y*4+3]).setPosition(f[y*4],f[y*4+1],f[y*4+2]),M.setMatrixAt(y,s);const w={mesh:new X(v,Db),trail:new X(k,Ji),posts:M};return w.trail.frustumCulled=!1,w.trail.renderOrder=3,w};return{group:t,update(i,r,l){Ji.uniforms.uTime.value=r,Ji.uniforms.uNight.value=Math.min(1,Math.max(0,(l-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(i-e)<$b)&&(e=i,n&&(t.remove(n.mesh,n.trail,n.posts),n.mesh.geometry.dispose(),n.trail.geometry.dispose(),n.posts.dispose()),n=c(i),n&&t.add(n.mesh,n.trail,n.posts))}}}const Sn=30,Qi=4,Ql=18,th=8,nh=24,eh=[0,10,28,55,95,150],oh=new Tt({uniforms:Rn.merge([In.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:zt,fog:!0});function Wb(t,n,e){const o={x:0,y:0,z:0},a=[],s=[],c=Math.ceil((n-t)/Qi)+1,i=(m,d)=>.92+.32*C(m*.02,d*4,e)+.14*C(m*.11,d*13,e+1);for(let m=0;m<c;m++){const d=t+m*Qi;for(let g=0;g<=Sn;g++){const p=g/Sn,v=p*Math.PI*2,k=i(d,p);D(d,Ql*k*Math.cos(v),th+nh*k*Math.sin(v),o),a.push(o.x,o.y,o.z),s.push(d,p,Math.min(d-t,n-d))}}const r=[];for(let m=0;m<c-1;m++)for(let d=0;d<Sn;d++){const g=m*(Sn+1)+d,p=g+Sn+1;r.push(g,g+1,p,p,g+1,p+1)}const l=new ht;l.setAttribute("position",new F(new Float32Array(a),3)),l.setAttribute("aCave",new F(new Float32Array(s),3)),l.setIndex(r);const u=[],h=[];for(const[m,d]of[[t,-1],[n,1]]){const g=u.length/3;eh.forEach((p,v)=>{for(let k=0;k<=Sn;k++){const M=k/Sn,w=M*Math.PI*2,y=i(m,M),x=v?.25*p*(C(M*9,v,e+5)-.5):0,b=Math.max(-16,th+(nh*y+p+x)*Math.sin(w));D(m-d*(p*.35+(v?3*C(M*13,v,e+9):0)),(Ql*y+p+x)*Math.cos(w),b,o),u.push(o.x,o.y,o.z)}});for(let p=0;p<eh.length-1;p++)for(let v=0;v<Sn;v++){const k=g+p*(Sn+1)+v,M=k+Sn+1;h.push(k,M,k+1,k+1,M,M+1)}}for(let m=0;m<c;m+=2){const d=t+m*Qi,g=u.length/3;for(let p=0;p<=16;p++){const v=-110+220*p/16,k=Math.abs(v)/110,M=58+150*k*k+30*(C(d*.015,v*.03,e+3)-.5);D(d,v,M,o),u.push(o.x,o.y,o.z)}if(m+2<c)for(let p=0;p<16;p++)h.push(g+p,g+17+p,g+p+1,g+p+1,g+17+p,g+18+p)}const f=new ht;return f.setAttribute("position",new F(new Float32Array(u),3)),f.setIndex(h),f.computeVertexNormals(),{tube:l,portals:f}}function Yb(){const t=new wt,n=new Map,e=ri(),o=e.clone();return o.uniforms=e.uniforms,o.side=zt,{group:t,update(a,s){if(oh.uniforms.uTime.value=s,!$.caves.length)return;const c=new Set,i=Mn(a);for(let r=i-1;r<=i+1;r++)$.caves.forEach(([l,u],h)=>{const f=r*lt+l-Ht,m=r*lt+u-Ht;if(m<a-200||f>a+2200)return;const d=r*8+h;if(c.add(d),n.has(d))return;const g=Wb(f,m,(r*7+h)%97),p=[new X(g.tube,oh),new X(g.portals,o)];for(const v of p)v.frustumCulled=!1,v.matrixAutoUpdate=!1,t.add(v);n.set(d,p)});for(const[r,l]of n)if(!c.has(r)){for(const u of l)t.remove(u),u.geometry.dispose();n.delete(r)}}}}const tc=140,ah=24,Xb=2400;function Ka(t,n){const e=t.getAttribute("position").count,o=new Float32Array(e*3);for(let a=0;a<e;a++)o.set(n,a*3);return t.setAttribute("color",new F(o,3)),t.deleteAttribute("uv"),t}function jb(){return At([Ka(new B(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),Ka(new B(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),Ka(new B(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),Ka(new B(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function Zb(){const t=new bt(jb(),new me({vertexColors:!0}),ah);t.frustumCulled=!1,t.count=0;const n=new Pt,e={x:0,y:0,z:0};let o=Number.NaN;return{mesh:t,update(a){const s=Math.floor((a-100)/tc);if(s===o)return;o=s;let c=0;for(let i=s;c<ah&&i*tc<a+Xb;i++){const r=i*tc+37*Math.sin(i*1.7);if(ce()!=="ha-giang"||pa(r)<120)continue;const l=3*Math.sin(r/140)+2.5*Math.sin(r/47+1.7)+(i%2?7:-7),u=Em(r);D(r,l,0,e),n.makeRotationY(Ct(r)+(i%3===0?Math.PI:0)+.15*Math.sin(i)).setPosition(e.x,u+.1,e.z),t.setMatrixAt(c++,n)}t.count=c,t.visible=c>0,t.instanceMatrix.needsUpdate=!0}}}function nc(t,n,e){const o=t.getAttribute("position");for(let a=0;a<o.count;a++){const s=o.getX(a),c=o.getY(a),i=o.getZ(a);if(c>e)continue;const r=Math.atan2(i,s),l=Math.pow(.5+.5*Math.sin(r*7+2.4*C(r,c/23,7)),10),u=(1+n*(C(r*3.1,c/37,5)-.5)+.5*n*(C(r*9.3,c/11,6)-.5))*(1-.22*l);o.setXYZ(a,s*u,c,i*u)}return t.computeVertexNormals(),t}function sh(t){const n=new zr;for(let e=0;e<10;e++){const o=Math.PI/2+e*Math.PI/5,a=e%2?t*.4:t;e===0?n.moveTo(Math.cos(o)*a,Math.sin(o)*a):n.lineTo(Math.cos(o)*a,Math.sin(o)*a)}return n}function Jb(){const t=(a,s,c,i,r,l)=>nc(new ct(a,s,c,64,24).translate(r,i-c/2,r*.6),l,i-4),n=nc(new ct(11.5,13.5,3,48,4).translate(0,-1.5,0),.32,-.2),e=[];for(let a=0;a<13;a++){const s=a*2.39+.4,c=1.6+2.6*C(a,3,61),i=11+2.5*C(a,4,62);e.push(nc(new Je(c,12,9).scale(1,.62,1).translate(Math.cos(s)*i,-.6+.6*C(a,5,63),Math.sin(s)*i),.5,99))}const o=At([n,...e,t(11,34,46,-1.5,0,.7),t(26,62,90,-40,7,.8),t(48,105,190,-115,-9,.9)].map(a=>(a.deleteAttribute("uv"),a)));return o.computeVertexNormals(),o}function Qb(){const t=H(new ct(2.6,3.3,1.5,4).rotateY(Math.PI/4).translate(0,.75,0),[.4,.4,.42],.08,49),n=H(new ue(2.4,6.2,3).translate(0,1.4+3.1,0),[.7,.73,.78],.05,44),e=H(new ct(.08,.1,6.6,6).translate(3,3.3,.9),[.8,.8,.82],.02,45),o=H(new B(3,2,.08).translate(4.5,5.5,.9),[.86,.07,.06],.02,46),a=H(new _c(sh(.6)).translate(4.5,5.5,.95),[1,.86,.1],0,47),s=H(new _c(sh(.6)).rotateY(Math.PI).translate(4.5,5.5,.85),[1,.86,.1],0,48);return pt([t,n,e,o,a,s])}const tw=2600,Id=[.6,.58,.55],nw=[.3,.29,.31];function ew(){const t=(n,e,o,a)=>ia(H(new Je(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,o/e,1).translate(n,-4,0),[.42,.6,.28],.14,a),-4,o,.7);return pt([t(-62,70,62,11),t(62,64,56,12)])}function ow(){return pt([H(new B(5,1.2,3).translate(0,.6,0),Id,.1,21),H(new B(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),H(new ct(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function aw(){const t=(e,o,a,s,c,i)=>[H(new B(e,a,o).translate(s,a/2,c),[.7,.62,.5],.08,i),H(new ct(.01,o*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(s,a+o*.17,c),nw,.08,i+1)],n=(e,o,a,s,c)=>H(new B(e,4,o).translate(a,2,s),Id,.12,c);return pt([n(64,1.6,0,-22,31),n(64,1.6,0,22,32),n(1.6,44,-32,0,33),n(1.6,44,32,0,34),...t(30,12,11,0,8,35),...t(22,9,7,-14,-10,37),...t(22,9,7,14,-10,39)])}const ec={"nui-doi":{geo:ew,scale:1},"bia-ma-pi-leng":{geo:ow,scale:2.2},"dinh-vua-meo":{geo:aw,scale:1.4},"chop-fansipan":{geo:Qb,scale:1,rock:Jb}};function sw(){const t=new wt,n=s5();t.add(n.group);const e=new Map,o=new Map,a=new Map,s={x:0,y:0,z:0};return{group:t,update(c){n.update(c);const i=$.landmarks;if(!i?.length)return;const r=new Set,l=Mn(c);for(let u=l-1;u<=l+1;u++)i.forEach((h,f)=>{const m=u*lt+h.phase-Ht;if(m<c-300||m>c+tw)return;const d=u*16+f;if(r.add(d),a.has(d))return;let g=e.get(h.kind);g||e.set(h.kind,g=ec[h.kind].geo());const p=new X(g,xo),v=ec[h.kind].rock;if(v){let k=o.get(h.kind);k||o.set(h.kind,k=v()),p.add(new X(k,ri()))}D(m,h.lat,0,s),p.position.set(s.x,h.drop===void 0?rt(s.x,s.z):Y(m)-h.drop,s.z),p.rotation.y=Ct(m)+(h.turn??0),p.scale.setScalar(ec[h.kind].scale),p.matrixAutoUpdate=!1,p.updateMatrix(),t.add(p),a.set(d,p)});for(const[u,h]of a)r.has(u)||(t.remove(h),a.delete(u))}}}const iw={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},cw={zenith:["#5a82d4","#3e4f9a","#1c2a66","#4c86de"],hazeAway:["#a9b9de","#7f80b6","#2c3470","#b6caec"],hazeSun:["#c9aabe","#b884a0","#5a3c78","#d6c4cc"],skyHorizonSun:["#ffc8a4","#ff9a78","#9c4670","#ffe4cc"],skyHorizonAway:["#c9d4f0","#b48cb8","#46508e","#d2e2f8"],glow:["#e8bc8e","#e89068","#ff9a50","#e8d8bc"],sunDisk:["#f4e6c8","#f4c494","#000000","#f2ecdc"],sunLight:["#ffe6c8","#ffb490","#5a6ab0","#fff6ea"],skyAmbient:["#b2c6ec","#8e94ce","#46559a","#bed4f4"],bounce:["#9aaab8","#9a7c8e","#4a3c52","#aebccc"]},Hd=gt.region==="fansipan"?cw:iw,Gd=.18;function oc(t,n,e,o=0){const[a,s,c,i]=Hd[t],r=Math.min(1,Math.max(0,n));return r<.5?e.set(a).lerp(new it(s),r*2):e.set(s).lerp(new it(c),(r-.5)*2),o>0?e.lerp(new it(i),Math.min(1,o)):e}function rw(t,n,e=0){const o=t.y+(-.07-t.y)*Math.min(1,Math.max(0,n)*1.25)+Gd*e,a=Math.hypot(t.x,o,t.z);return{x:t.x/a,y:o/a,z:t.z/a}}const ac=900,lw=15e-6,hw=14e-5;function uw(t){const n=new it(t);return`vec3(${n.r.toFixed(4)}, ${n.g.toFixed(4)}, ${n.b.toFixed(4)})`}function mw(){return Object.entries(Hd).map(([t,n])=>`#define ATM_${t.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${n.map(uw).join(", ")})`).join(`
`)}function Bd(t,n="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${n})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${mw()}
#define ATM_SUN_DIR normalize(vec3(${t.x.toFixed(5)}, mix(${t.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${Gd.toFixed(3)} * atmMorn(), ${t.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${ac.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${ac.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${ac.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${lw.toExponential(3)} + density * avg);
}
`}function dw(t,n){Sa.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,Sa.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,Sa.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${Bd(n)}
#endif`,Sa.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,t.fog=new Xf(new it(0,0,0),hw)}function fw(t,n,e=0){t.fog.color.setRGB(n,e,0)}const ih=120,Fd=30,ds=7,gw=ds*(Fd+2);function pw(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");for(let o=0;o<18;o++){const a=30+34*C(o,4,7),s=128+(C(o*1.7,1,3)-.5)*(240-2*a-20),c=140+(C(1,o*2.3,5)-.5)*60-(a-30)*.6,i=n.createRadialGradient(s,c,0,s,c,a);i.addColorStop(0,"rgba(255,255,255,0.5)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,256,256)}const e=new fa(t);return e.colorSpace=Eu,e}const vw=`
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
}`,yw=`
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
}`;function bw(t){const n=Math.max(10,Math.round(Fd*t)),e=new Tt({vertexShader:vw,fragmentShader:yw,uniforms:Rn.merge([In.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:zt,fog:!0});e.uniforms.uMap.value=pw();const o=new bt(new _n(1,1),e,gw);o.frustumCulled=!1,o.count=0;const a=new Pt,s=new xt,c=new L,i=new L;let r=Number.NaN;const l=new Map;return{mesh:o,update(u){const h=Math.floor(u/ih)-1;if(h===r)return;r=h;for(const m of l.keys())m<h*ds&&l.delete(m);let f=0;for(let m=h;m<h+n+2;m++)for(let d=0;d<ds;d++){const g=(m+C(d*.7,m,91))*ih,p=en(g),v=C(m,d*1.3,92)<.5?-1:1,k=C(d,m*1.9,93);let M,w,y;if(d<2)y=12+14*k,M=v*(16+y*.5+k*30*p),w=Y(g)-10+C(m,d,94)*12+16*Qt(g);else{if(p<.5||d>3)continue;M=v*(120+k*500),w=_t(g)-210-C(m,d,95)*60,y=60+80*k}if(D(g,M,0,c),!!Pe(c.x,c.z,g,M)){if($.hillside?.mist){const x=m*ds+d;let b=l.get(x);if(b===void 0&&l.set(x,b=kv(g,c.x,c.z,y)),!b)continue}a.compose(c.set(c.x,w,c.z),s,i.set(y*1.6,y*.75,1)),o.setMatrixAt(f++,a)}}o.count=f,o.instanceMatrix.needsUpdate=!0}}}const ww=`
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
}`,xw=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function Jr(t,n={}){const e=new Float32Array(t*3),o=new Float32Array(t),a=new Float32Array(t*4),s=new ht;s.setAttribute("position",new F(e,3)),s.setAttribute("aSize",new F(o,1)),s.setAttribute("aColor",new F(a,4));const c=new Tt({vertexShader:ww,fragmentShader:xw,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:n.core??2.4}},transparent:!0,depthWrite:!1,blending:rn}),i=new bs(s,c);return i.frustumCulled=!1,i.renderOrder=4,{points:i,set(r,l,u,h,f,m,d,g,p){e[r*3]=l,e[r*3+1]=u,e[r*3+2]=h,o[r]=f,a[r*4]=m,a[r*4+1]=d,a[r*4+2]=g,a[r*4+3]=p},commit(r){s.setDrawRange(0,r);for(const l of["position","aSize","aColor"])s.getAttribute(l).needsUpdate=!0},setViewport(r,l){c.uniforms.uScale.value=r/(2*Math.tan(l*Math.PI/360)),n.maxFrac&&(c.uniforms.uMaxPx.value=Math.max(4,r*n.maxFrac))}}}const Xn=5,sc=3,Mw=.08,kw=3,Sw=new it("#ffd27a"),Tw=new it("#9b8cff");function Aw(){const t={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},n=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new ht;return e.setAttribute("position",new Cu(n.flat().flatMap(o=>t[o]),3)),e}function Nw(){const t=new Xt({color:"#ffffff",blending:rn,transparent:!0,depthWrite:!1,side:zt,fog:!1}),n=new bt(Aw(),t,Xn);n.frustumCulled=!1,n.count=0;const e=Jr(Xn*(sc+1),{maxFrac:.025,core:1.1}),o={z:0,x:0,v:0,ended:!1,after:0},a=new wt;a.add(n,e.points);const s=Array.from({length:Xn},()=>new L),c=new Array(Xn).fill(0),i=new Array(Xn).fill(0),r=new Array(Xn).fill(0),l=new Array(Xn).fill(0),u=new Pt,h=new xt,f=new Lu(0,0,0,"YXZ"),m=new L,d={x:0,y:0,z:0},g=new L(1.25,1.25,1.25),p=new it,v={group:a,setViewport:(k,M)=>e.setViewport(k,M),heads:s,alphas:c,owner:i,count:0,mode:"on",update(k,M,w,y,x){let b=0,A=0;const z=v.mode==="off"?[]:k.slice(0,Xn),E=Cd(z),T=new Set(z.map((S,P)=>[Math.abs(S.at.z-M.z),P]).filter(([,S])=>Qc(S,M.z,E)>0).sort((S,P)=>S[0]-P[0]).slice(0,kw).map(([,S])=>S)),N=v.mode==="dim"?.5:1;z.forEach((S,P)=>{const{z:I,x:G,v:K,ended:V,after:j}=S.at,J=I-M.z,q=y>0?(G-r[P])/y:0;if(r[P]=G,l[P]+=(Math.max(-.8,Math.min(.8,q*.03))-l[P])*Math.min(1,y*10),J<-4)return;D(I,G,K,m);const et=V&&S.run.crash?j/.8:V?1:0,mt=Math.abs(J)<10&&Math.abs(G-M.x)<3.2&&Math.abs(K-M.v)<3?.25:1,tt=1-Math.min(1,Math.max(0,(Math.abs(J)-220)/80)),Mt=Math.min(1,(J+4)/4),kt=.15+.85*Math.min(1,Math.max(0,(m.distanceTo(x)-9)/6)),Nt=(S.self?.45:.3)*N*Qc(P,M.z,E)*mt*tt*Mt*kt*Math.max(0,1-et);if(!(Nt<=.01)){f.set(-Math.atan(wn(I))+(V?j*9:0),Ct(I),l[P]+(V?j*13:0)),u.compose(m,h.setFromEuler(f),g),n.setMatrixAt(b,u),p.copy(S.self?Sw:Tw),T.has(P)&&e.set(A++,m.x,m.y,m.z,2.5,p.r,p.g,p.b,Nt*.9);for(let Lt=1;Lt<=sc&&!V&&N===1&&T.has(P);Lt++){Nd(S.track,w-Lt*Mw,o),D(o.z,o.x,o.v,d);const kn=1-Lt/(sc+1);e.set(A++,d.x,d.y,d.z,1.8*kn,p.r,p.g,p.b,Nt*.55*kn)}n.setColorAt(b,p.multiplyScalar(Nt*1.6)),s[b].set(m.x,m.y+1.6,m.z),c[b]=Nt,i[b]=P,b++}}),n.count=b,e.commit(A),v.count=b,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}};return v}function zw(){const t=new zr;for(let n=0;n<10;n++){const e=n%2?.11:.28,o=n/10*Math.PI*2+Math.PI/2;n?t.lineTo(Math.cos(o)*e,Math.sin(o)*e):t.moveTo(Math.cos(o)*e,Math.sin(o)*e)}return new _c(t)}function Cw(){const t=new Xt({color:new it("#ffd76a").multiplyScalar(2.2),blending:rn,transparent:!0,depthWrite:!1,fog:!1}),n=new bt(zw(),t,3);n.frustumCulled=!1,n.count=0;const e=new Pt,o=new L,a=new L,s=new xt;return{mesh:n,update(c,i,r,l){if(i<=0){n.count=0;return}const u=Math.min(1,i*3);l.getWorldQuaternion(s);for(let h=0;h<3;h++){const f=r*6+h*Math.PI*2/3;o.set(c.x+Math.cos(f)*.8,c.y+.9+Math.sin(f*2)*.1,c.z+.45+Math.sin(f)*.5),a.setScalar(u*(1+.25*Math.sin(r*14+h*2))),e.compose(o,s,a),n.setMatrixAt(h,e)}n.count=3,n.instanceMatrix.needsUpdate=!0}}}const nr=6,Xe=3,be=28,An=be+1,Io=nr*Xe*An*2,Ew=[1.2,1.75,2.2],Lw=Math.PI*2*.45,Pw=2.4,_w=`
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
  }`,Rw=`
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
  }`;function Iw(){const t=new ht,n=new Float32Array(Io*3),e=new Float32Array(Io*3),o=new Float32Array(Io),a=new Float32Array(Io),s=new Float32Array(Io),c=[];for(let d=0;d<nr*Xe;d++)for(let g=0;g<An;g++){const p=(d*An+g)*2;a[p]=-1,a[p+1]=1,s[p]=s[p+1]=g/be,g<be&&c.push(p,p+1,p+2,p+1,p+3,p+2)}t.setAttribute("position",new F(n,3)),t.setAttribute("aTan",new F(e,3)),t.setAttribute("aGlow",new F(o,1)),t.setAttribute("aSide",new F(a,1)),t.setAttribute("aU",new F(s,1)),t.setIndex(c);const i=new Tt({vertexShader:_w,fragmentShader:Rw,uniforms:{uTime:{value:0},uWidth:{value:$.windRibbon?.width??.24},uMinAngle:{value:$.windRibbon?.minAngle??0}},blending:jf,transparent:!0,depthWrite:!1,side:zt}),r=new X(t,i);r.frustumCulled=!1,r.renderOrder=2;const l=new Map,u=new Float32Array(An*3),h=new Float32Array(An*9),f=new Float32Array(An),m={x:0,y:0,z:0};return{mesh:r,update(d,g,p){i.uniforms.uTime.value=g;const v=$1(d),k=d.gusts.find(w=>!w.taken&&!w.missed);let M=0;for(const w of d.gusts){if(M>=nr||w.z+w.len<p-5||w.z>p+320)continue;w.taken&&!l.has(w.id)&&l.set(w.id,g);const y=w.taken?g-l.get(w.id):0,x=w.taken?Math.max(0,2.4*(1-y/.4)):w.missed?.18:w===k?1.5:.9;if(!(x<=0)){for(let b=0;b<An;b++){const A=w.z+b/be*w.len;D(A,St(w.lane),w.v+v,m);const z=m.x,E=m.y,T=m.z;D(A+1,St(w.lane),w.v+v,m);let N=m.x-z,S=m.y-E,P=m.z-T;const I=Math.hypot(N,S,P)||1;N/=I,S/=I,P/=I;let G=-P,K=N;const V=Math.hypot(G,K)||1;G/=V,K/=V,h[b*9]=z,h[b*9+1]=E,h[b*9+2]=T,h[b*9+3]=G,h[b*9+4]=0,h[b*9+5]=K,h[b*9+6]=-K*S,h[b*9+7]=K*N-G*P,h[b*9+8]=G*S,f[b]=1+1.2*Math.abs(S)}for(let b=0;b<Xe;b++){for(let z=0;z<An;z++){const E=z/be,T=b/Xe*Math.PI*2+E*Lw+g*Pw,N=Ew[b]*f[z],S=Math.cos(T)*N,P=Math.sin(T)*N,I=z*9;for(let G=0;G<3;G++)u[z*3+G]=h[I+G]+h[I+3+G]*S+h[I+6+G]*P}const A=M*Xe+b;for(let z=0;z<An;z++){const E=Math.max(0,z-1),T=Math.min(be,z+1);for(let N=0;N<2;N++){const S=(A*An+z)*2+N;for(let P=0;P<3;P++)n[S*3+P]=u[z*3+P],e[S*3+P]=u[T*3+P]-u[E*3+P];o[S]=x}}}M++}}for(const w of l.keys())d.gusts.some(y=>y.id===w)||l.delete(w);t.setDrawRange(0,M*Xe*be*6);for(const w of["position","aTan","aGlow"])t.getAttribute(w).needsUpdate=!0;r.visible=M>0}}}const ch=$.tower.phase,Hw=1,Gw=2600;function rh(t,n,e){const o=[],a=c=>{const i=Math.PI/2+c*Math.PI/5,r=c%2?.382:1;return[Math.cos(i)*t*r,Math.sin(i)*t*r]};for(let c=0;c<10;c++){const[i,r]=a(c),[l,u]=a(c+1);o.push(0,0,n,i,r,n,l,u,n)}const s=new ht;return s.setAttribute("position",new F(new Float32Array(o),3)),s.computeVertexNormals(),H(s,e,.04)}function Bw(){const t=[.62,.6,.56],n=[H(new ct(3.6,4.6,28,8).translate(0,8,0),t,.12,2),H(new ct(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),H(new ct(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=H(new B(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return pt([...n,e,rh(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),rh(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function lh(t){const n=Kc(t)+(t===1?Kc(2):ya);let e=Math.floor((n+Ht-ch)/lt)*lt+ch-Ht;for(e>=n&&(e-=lt);Qt(e)>0;)e-=lt;return e}function Fw(){const t=new X(Bw(),xo);t.visible=!1,t.matrixAutoUpdate=!1;let n=Number.NaN;const e=new L,o=new L,a=s=>{const{latMin:c,latMax:i,mirror:r}=$.tower,l=Hw*(r&&Mn(s)%2!==0?-1:1);o.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let h=c;h<=i;h+=20)D(s+u,l*h,0,e),e.y=rt(e.x,e.z),e.y>o.y&&o.copy(e);t.position.copy(o),t.rotation.y=-.6,t.scale.setScalar(2),t.updateMatrix()};return{mesh:t,update(s){if(ce()!=="ha-giang"){t.visible=!1;return}const c=Mm(s),i=lh(c),r=lh(c+1),l=Math.abs(s-i)<Math.abs(s-r)?i:r;t.visible=Math.abs(s-l)<Gw,t.visible&&l!==n&&(n=l,a(l))}}}const ua=12,_s={uPools:{value:Array.from({length:ua},()=>new ys)},uPoolCount:{value:0},uPoolNight:{value:0}},$w=`
uniform vec4 uPools[${ua}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${ua}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let Rs=0,$d=ua;function Ow(t){$d=Math.max(0,Math.min(ua,Math.round(t)))}function Dw(){Rs=0}function fs(t,n,e,o,a){Rs>=$d||a>330||n-rt(t,e)>28||_s.uPools.value[Rs++].set(t,n,e,o)}function Kw(t){_s.uPoolCount.value=Rs,_s.uPoolNight.value=t}const Ke=14,ic=9.5,cc=3.4,Uw=.9,Ua=7,hh=4,rc=13,uh=30,mh=420,dh=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],Vw=[-1,1];function qw(t,n){for(const e of t.obstacles)if(Math.abs(e.z-n)<9)return!0;return!1}function Ww(){const t=Math.ceil((mh+uh)/Ke)+2,n=Jr(t*(2*Ua)+Math.ceil(t/hh)*rc),e={x:0,y:0,z:0};return{points:n.points,setViewport:(o,a)=>n.setViewport(o,a),update(o,a,s,c){const i=Math.min(1,Math.max(0,(s-.38)/.35));let r=0,l=0;if(i>.01){const u=Math.floor((o.z-uh)/Ke),h=Math.floor((o.z+mh)/Ke);for(let f=u;f<=h;f++){const m=f*Ke;if(!(Qt(m)<.97||Qt(m+Ke)<.97)){for(const d of Vw)for(let g=0;g<Ua;g++){const p=(g+.5)/Ua;D(m+p*Ke,d*ic,-Yo+cc-4*p*(1-p)*Uw,e);const v=dh[((f*Ua+g)%3+3)%3],k=.82+.18*Math.sin(a*3.1+f*1.7+g*2.3+d);n.set(r++,e.x,e.y,e.z,.6,v[0],v[1],v[2],i*k)}if(!(f%hh!==0||qw(o,m))){l<3&&m>o.z-10&&(D(m,0,-Yo+cc,e),fs(e.x,e.y,e.z,1.5,m-c),l++);for(let d=0;d<rc;d++){const g=(d+.5)/rc;D(m,-ic+g*2*ic,-Yo+cc+.3-4*g*(1-g)*1.3,e);const p=dh[d%3];n.set(r++,e.x,e.y,e.z,.6,p[0],p[1],p[2],i*(.85+.15*Math.sin(a*2.7+d)))}}}}}n.commit(r)}}}function Yw(){const t=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([n,e])=>new tn(n,e));return new ie(t,16)}function Xw(){return new _n(1,1,1,6).translate(0,.5,0)}function jw(t){return new Tt({uniforms:{uTime:t},side:zt,vertexShader:`
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
}`})}function Zw(t){return new Tt({uniforms:{...Rn.merge([In.fog]),uTime:t},transparent:!0,depthWrite:!1,side:zt,fog:!0,vertexShader:`
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
}`})}function Jw(){const t=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([n,e])=>new tn(n*1.45,e*1.45));return new ie(t,22)}function Qw(){const t=[];for(let n=0;n<=8;n++){const e=n/8*Math.PI*.5;t.push(new tn(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new ie(t,16)}const Od=`
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
}`,tx=`
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
}`,nx=`
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
}`;function ex(){return new Tt({vertexShader:Od,fragmentShader:tx,side:zt,uniforms:{uTime:{value:0}}})}function ox(){return new Tt({vertexShader:Od,fragmentShader:nx,side:zt})}function Ee(t,n,e,o=0){return e.setRGB(t,n%1,o)}const lc=6,fh=3,gh=new it(1,.16,.6);function ax(){const t=new zr;return t.moveTo(-1.2,-.5),t.lineTo(0,.7),t.lineTo(1.2,-.5),t.lineTo(.62,-.5),t.lineTo(0,.12),t.lineTo(-.62,-.5),t.closePath(),new Zf(t,{depth:.28,bevelEnabled:!1}).translate(0,0,-.14)}function sx(){const t=new bt(ax(),new Xt,lc*fh),n=new bt(new Pu(3.1,.16,6,40),new Xt({color:gh.clone().multiplyScalar(.9)}),lc),e=new it;t.setColorAt(0,e.setRGB(0,0,0));for(const u of[t,n])u.frustumCulled=!1,u.count=0;const o=new Pt,a=new xt,s=new L,c=new L,i=new L(0,1,0);let r=0,l=0;return{meshes:[t,n],begin(){r=l=0},draw(u,h,f,m,d,g,p,v,k,M){if(r>=lc)return;a.setFromAxisAngle(i,Ct(u.z));const w=1.6*v;for(let y=0;y<fh;y++){const x=Math.max(0,Math.sin(g*7-y*1.3));o.compose(s.set(h,f+(y-1)*.95*w,m),a,c.set(w,w,w)),t.setMatrixAt(l,o),t.setColorAt(l++,e.copy(gh).multiplyScalar(.5+.5*x))}o.compose(s.set(h,f,m),a,c.set(v,v,v)),n.setMatrixAt(r++,o),k(h,f,m,(5+7*p)*v*.8,1,.25,.65,.55),M(h,f-1.5,m,1.8*v,d,1.3,.2,.75)},commit(){t.count=l,n.count=r;for(const u of[t,n])u.instanceMatrix.needsUpdate=!0,u.instanceColor&&(u.instanceColor.needsUpdate=!0)}}}const hc=2.1,Is=8,jn=8,ix=46,cx=t=>new Tt({uniforms:{uTime:t},vertexShader:`
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
}`,transparent:!0,blending:rn,depthWrite:!1});function rx(t){const n=new bt(new Pu(hc,.12,6,36),new Xt({color:new it("#ffb04a").multiplyScalar(.95)}),jn),e=new bt(Qw(),ox(),jn),o=new bt(new ct(1,.55,1,12,1,!0).translate(0,.5,0),cx(t),jn*3),a=new bt(Yw(),jw(t),jn),s=new bt(Xw(),Zw(t),jn),c=new it,i=sx(),r=[n,e,o,a,s];for(const w of r)w.frustumCulled=!1,w.count=0;e.setColorAt(0,Ee(1,0,c)),o.setColorAt(0,c.setRGB(0,0,0)),s.setColorAt(0,c),s.renderOrder=3;const l=new Pt,u=new xt,h=new xt,f=new xt,m=new L,d=new L;let g=0,p=0,v=0,k=0;const M=(w,y,x,b,A,z,E,T)=>{if(v>=o.instanceMatrix.count)return;const N=1-Math.min(1,Math.max(0,(A-450)/150));l.compose(m.set(w,y,x),u.identity(),d.set(b,ix,b)),o.setMatrixAt(v,l),o.setColorAt(v++,c.setRGB(z*N,E*N,T*N))};return{meshes:[...r,...i.meshes],begin(){g=p=v=k=0,i.begin()},draw(w,y,x,b,A,z,E,T){const N=1+1.6*Math.min(1,Math.max(0,(A-30)/90));if(w.kind==="thermal"&&g<jn){h.setFromAxisAngle(m.set(0,1,0),Math.sin(z*1.3+w.id)*.45),l.compose(m.set(y,x,b),h,d.set(N,N,N)),n.setMatrixAt(g++,l);for(let S=0;S<Is;S++){const P=z*1.8+S/Is*Math.PI*2;m.set(Math.cos(P)*hc*N,Math.sin(P)*hc*N,0).applyQuaternion(h),T.body(y+m.x,x+m.y-.5*N,b+m.z,.36*N,1.15,S*.31+w.id*.1),T.glow(y+m.x,x+m.y-.85,b+m.z,.8+1.4*E,1,.7,.28,.85)}T.glow(y,x,b,(6+6*E)*N*.8,1,.7,.25,.45),M(y,x-1,b,1.5*N,A,1.4,.95,.38);for(let S=0;S<6;S++){const P=(z*.9+S/6)%1,I=S*2.1+w.id;T.glow(y+Math.cos(I)*1.1*N,x-2.4+P*4.8*N,b+Math.sin(I)*.6,.9*N,1,.8,.35,Math.sin(P*Math.PI)*.9)}}else if(w.kind==="shield"&&p<jn){u.setFromAxisAngle(m.set(0,0,1),Math.sin(z*1.7+w.id)*.3),l.compose(m.set(y,x+.9*N+.5*Math.sin(z*2.3+w.id),b),u,d.set(1.5*N,1.5*N,1.5*N)),e.setColorAt(p,Ee(1,0,c)),e.setMatrixAt(p++,l),T.glow(y,x,b,(3+5*E)*N*.8,.3,.95,.9,.55),M(y,x+.4,b,1.3*N,A,.25,1.1,.95);for(let S=0;S<6;S++){const P=(z*.6+S/6)%1,I=z*2+S*1.05;T.glow(y+Math.cos(I)*.9*N,x+1+P*16*N,b+Math.sin(I)*.9*N,1.1*N,.35,1,.92,Math.sin(P*Math.PI)*.85)}}else if(w.kind==="boost")i.draw(w,y,x,b,A,z,E,N,T.glow,M);else if(w.kind==="smoke"&&k<jn){u.setFromAxisAngle(m.set(0,1,0),z*1.6+w.id).premultiply(h.setFromAxisAngle(m.set(0,0,1),Math.sin(z*2.1+w.id)*.22));const S=1.6*N,P=x+.5*N+.35*Math.sin(z*2.6+w.id);l.compose(m.set(y,P,b),u,d.set(S,S,S)),a.setMatrixAt(k,l),m.set(0,S,0).applyQuaternion(u);const I=y+m.x,G=P+m.y,K=b+m.z;l.compose(m.set(I,G,K),f,d.set(6*N,13*N,1)),s.setMatrixAt(k,l),s.setColorAt(k++,c.setRGB(1-Math.min(1,Math.max(0,(A-450)/150)),w.id*.137%1,0)),T.glow(I,G,K,(1.2+2*E)*N,1,.55,.42,.9),T.glow(y,x,b,(3+5*E)*N*.8,1,.3,.62,.5),M(y,x+.4,b,.9*N,A,1.15,.22,.55);for(let V=0;V<5;V++){const j=(z*2.4+V/5)%1,J=V*2.4+w.id;T.glow(I+Math.cos(J)*j*.8*N,G+j*2.2*N,K+Math.sin(J)*j*.8*N,.5*N,1,.75,.4,(1-j)*.9)}}},commit(){n.count=g,e.count=p,o.count=v,a.count=s.count=k,i.commit();for(const w of r)w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0)}}}const Hs=[],er=[],or=[];function Dd(t,n,e){const o=Hs.length/3;for(let a=0;a<=n;a++)for(let s=0;s<=t;s++){const[c,i,r,l,u]=e(s,a);Hs.push(c,i,r),er.push(l,u)}for(let a=0;a<n;a++)for(let s=0;s<t;s++){const c=o+a*(t+1)+s;or.push(c,c+1,c+t+1,c+1,c+t+2,c+t+1)}}function ph(t,n,e,o,a,s,c,i){const u=[e],h=[0],f=[a];for(let m=1;m<=9;m++){const d=(m-.5)/9,g=a-s*d;u.push(u[m-1]+o/9*Math.sin(g)),h.push(h[m-1]+o/9*Math.cos(g)),f.push(a-s*(m/9))}for(let m=0;m<t;m++){const d=n+m/t*Math.PI*2,g=Math.cos(d),p=Math.sin(d);Dd(6,9,(v,k)=>{const M=k/9,w=v/6*2-1,y=c*Math.pow(Math.sin(Math.PI*Math.pow(M,1.2)),.75)+.1*c*(1-M),x=f[k],b=i*y*w*w,A=u[k]-b*Math.cos(x),z=h[k]+b*Math.sin(x),E=w*y*.5;return[A*g-E*p,z,A*p+E*g,(w+1)/2,M*.99]})}}function uc(t,n,e,o){const a=t.length-1;Dd(n,a,(s,c)=>{const i=s/n*Math.PI*2,[r,l]=t[c];return[Math.sin(i)*r,l,Math.cos(i)*r,s/n,e+(o-e)*c/a]})}let mc=null;function lx(){if(mc)return mc;Hs.length=er.length=or.length=0,uc([[0,-.16],[.24,-.14],[.36,-.04],[.3,.04]],16,.92,.82),ph(8,0,.24,1.12,1.2,.55,.64,.2),ph(8,Math.PI/8,.18,.95,.62,.32,.54,.24),uc([[0,.05],[.11,.05],[.11,.62],[0,.64]],12,1,1.45);const t=[];for(let e=0;e<=8;e++){const o=e/8;t.push([.2*Math.pow(Math.sin(Math.PI*Math.pow(o,.55)),.9),.6+.9*o])}uc(t,12,2,3);const n=new ht;return n.setAttribute("position",new F(new Float32Array(Hs),3)),n.setAttribute("uv",new F(new Float32Array(er),2)),n.setIndex(or.slice()),n.computeVertexNormals(),n.computeBoundingSphere(),mc=n,n}const ar=4,sr=9,dc=1.9,Gs=sr*3,hx=1.5,ux=Gs,mx=ar*8+Gs;function dx(t){const n=new bt(lx(),t,ar);n.frustumCulled=!1,n.count=0;const e=new it;n.setColorAt(0,Ee(1,0,e,2));const o=new Pt,a=new xt,s=new xt,c=new L,i=new L,r=[],l={x:0,y:0,z:0},u={x:0,y:0,z:0};let h=0;return{mesh:n,begin(){h=0},draw(f,m,d,g,p,v,k,M,w,y){if(h>=ar)return;const x=w>=0;a.setFromAxisAngle(c.set(0,1,0),M*.55+f*.37+(x?w*w*6:0)),a.multiply(s.setFromAxisAngle(c.set(1,0,0),Math.sin(M*1.3+f)*.1));const b=x?p*(1+.5*Math.sin(Math.PI*Math.min(1,w*1.6)))*(1-w*w*w):p;if(b<=.01)return;const A=d-.55*b;o.compose(c.set(m,A,g),a,i.set(b,b,b)),n.setMatrixAt(h,o),n.setColorAt(h++,Ee(1,f*.137,e,2));const z=x?1-w:1;y.glow(m,A+1*b,g,(1.6+3.4*v+1.2*k)*b*(.9+.1*Math.sin(M*17+f)),1,.78,.32,.95*z),y.glow(m,A+.5*b,g,(5+9*v)*b,1,.74,.28,(.08+.3*v+.2*k)*z);for(let E=0;E<6;E++){const T=(M*.45+E/6)%1,N=M*1.4+E*1.047+f,S=(1.5+.7*T)*b;y.glow(m+Math.cos(N)*S,A+(.2+2.2*T)*b,g+Math.sin(N)*S,.55*b,1,.86,.42,Math.sin(T*Math.PI)*z)}},release(f,m,d){for(let g=0;g<sr;g++){const p=g/sr*Math.PI*2+Math.random()*.5,v=6+Math.random()*4;r.push({x:f,y:m,z:d,vx:Math.cos(p)*v,vy:3+Math.random()*3,vz:Math.sin(p)*v,life:dc,ph:Math.random()})}r.length>Gs&&r.splice(0,r.length-Gs)},step(f,m,d,g){if(!r.length)return;D(m,0,0,l),D(m+1,0,0,u);const p=d*.97/Math.max(.001,Math.hypot(u.x-l.x,u.y-l.y,u.z-l.z)),v=(u.x-l.x)*p,k=(u.y-l.y)*p,M=(u.z-l.z)*p,w=Math.exp(-f*2.2);for(let y=r.length-1;y>=0;y--){const x=r[y];if(x.life-=f,x.life<=0){r.splice(y,1);continue}x.vx*=w,x.vz*=w,x.vy=x.vy*w+3.5*f,x.x+=(x.vx+v)*f,x.y+=(x.vy+k)*f,x.z+=(x.vz+M)*f;const b=.42*Math.min(1,x.life/(dc*.35))*Math.min(1,.3+(dc-x.life)/.12);g.body(x.x,x.y,x.z,b,1.1,x.ph,1),g.glow(x.x,x.y-.9*b,x.z,1.8*b+.4,1,.75,.3,.9)}},commit(){n.count=h,n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}}}const mn={x:0,y:0,z:0},fc=260,vh=1600,yh=220,Va=3200;function fx(t){const n=Math.round(vh*t),e=new wt,o=ex(),a=new bt(Jw(),o,fc+8*Is+ux);a.frustumCulled=!1;const s=rx(o.uniforms.uTime),c=dx(o),i=Jr(fc+vh+yh+8*(Is+7)+56+mx);e.add(a,c.mesh,...s.meshes,i.points);const r=new it;a.setColorAt(0,Ee(1,0,r));const l=[],u=new Map,h=new Pt,f=new xt,m=new L,d=new L(1,1,1),g=new xt;let p=0,v=0;const k={body(w,y,x,b,A,z,E=0){p>=a.instanceMatrix.count||(h.compose(m.set(w,y,x),f.identity(),d.set(b,b,b)),a.setColorAt(p,Ee(A,z,r,E)),a.setMatrixAt(p++,h))},glow:(w,y,x,b,A,z,E,T)=>i.set(v++,w,y,x,b,A,z,E,T)},M=(w,y,x,b,A)=>{for(let z=0;z<b&&l.length<yh;z++){const E=Math.random()*Math.PI*2,T=Math.random()*2-1,N=6+Math.random()*10;l.push({x:w,y,z:x,vx:Math.cos(E)*N*Math.sqrt(1-T*T),vy:T*N+3,vz:Math.sin(E)*N*Math.sqrt(1-T*T),life:A?.7:1})}};return{group:e,setViewport:(w,y)=>i.setViewport(w,y),burst:M,burstWish(w,y,x){c.release(w,y,x),M(w,y,x,56,!1)},update(w,y,x,b,A){p=0,v=0,o.uniforms.uTime.value=y,s.begin(),c.begin();for(const T of w.pickups){if(T.z-w.z>600||p>=fc)continue;D(T.z,St(T.lane),T.v+Math.sin(y*2.4+T.id)*.45,mn);let N=mn.x,S=mn.y,P=mn.z,I=T.z,G=1,K=-1;if(T.taken){const j=u.get(T.id)??y;if(u.set(T.id,j),K=(y-j)/(T.wish?.9:.6),K>=1)continue;I=w.z+4+K*10,D(I,St(T.lane),T.v,mn),N=mn.x,P=mn.z,S=mn.y+K*K*14,G=T.wish?1:1-K}const V=Math.min(1,Math.max(0,(T.z-w.z-40)/210));if(G*=Math.min(1,Math.max(0,(I-A-2)/6)),!(G<=0))if(T.kind==="lantern"){f.setFromAxisAngle(m.set(0,1,0),y*.8+T.id).multiply(g.setFromAxisAngle(m.set(0,0,1),Math.sin(y*1.9+T.id)*.12));const j=Math.min(1,Math.max(0,(I-A-25)/65)),J=(1+(($.lanternScale??1)-1)*(.15+.85*j))*G;if(T.wish){c.draw(T.id,N,S,P,J*hx,V,b,y,K,k),!T.taken&&T.z>w.z-15&&fs(N,S,P,1.6,T.z-A);continue}h.compose(m.set(N,S,P),f,d.set(J,J,J)),a.setColorAt(p,Ee(1,T.id*.137,r)),a.setMatrixAt(p++,h),i.set(v++,N,S-.9*J,P,(1.4+3.2*V+1.2*b)*J,1,.62,.22,(.75+.25*b)*G),!T.taken&&T.z>w.z-15&&fs(N,S-.9,P,1,T.z-A)}else T.taken||(T.kind==="thermal"&&fs(N,S,P,1.6,T.z-A),s.draw(T,N,S,P,T.z-w.z,y,V,k))}for(const T of u.keys())w.pickups.some(N=>N.id===T)||u.delete(T);c.step(x,w.z,w.speed,k),c.commit(),a.count=p,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.commit();const z=Math.min(n,Math.floor(n*(.12+.88*b)));for(let T=0;T<z;T++){const N=C(T*.37,1.7,81)*Va,S=A-300+((N-A+300)%Va+Va)%Va,P=en(S);if(P<.35)continue;const I=C(T,2.9,82)<.5?-1:1;D(S,I*(30+Math.pow(C(T,3.3,83),1.5)*1400),0,mn);const G=(y*(2+3*C(T,4.1,84))+C(T,5.3,85)*700)%700,K=_t(S)+($.skyLanternFloor??-380)+G+Math.sin(y*.5+T)*2,V=P*Math.min(1,G/60)*(1-Math.max(0,G-600)/100);i.set(v++,mn.x,K,mn.z,2.6,1,.5+.1*Math.sin(T),.16,V*(.35+.65*b))}const E=Ct(w.z);for(let T=l.length-1;T>=0;T--){const N=l[T];if(N.life-=x*1.6,N.life<=0){l.splice(T,1);continue}N.vy-=9*x,N.x+=N.vx*x,N.y+=N.vy*x,N.x+=Math.sin(E)*w.speed*.85*x,N.z+=(N.vz+Math.cos(E)*w.speed*.85)*x,i.set(v++,N.x,N.y,N.z,.7*N.life+.2,1,.7,.3,N.life)}i.commit(v)}}}function Cn(t,n,e=0,o=0){t.getAttribute("normal")||t.computeVertexNormals();const a=t.index?t.toNonIndexed():t;a.deleteAttribute("uv");const s=a.getAttribute("position").count,c=new Float32Array(s*3);for(let i=0;i<s;i++)c.set(n,i*3);return a.setAttribute("color",new F(c,3)),a.setAttribute("aSlot",new F(new Float32Array(s).fill(e),1)),a.setAttribute("aGlow",new F(new Float32Array(s).fill(o),1)),a}const gx=new L(0,1,0);function ir(t,n,e,o){const a=new L().subVectors(n,t),s=new ct(e,e,a.length(),3,1,!0);return s.applyQuaternion(new xt().setFromUnitVectors(gx,a.normalize())),s.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),Cn(s,o)}function bh(t,n){const e=new ht;return e.setAttribute("position",new F(new Float32Array(t),3)),e.setIndex(n),e}const Ho=[[1.3,0],[2.2,1.2],[3.6,3],[5.3,5.4],[6.9,8],[8.1,10.6],[8.8,13],[8.9,14.6],[8.5,16.4],[7.4,18],[5.7,19.3],[3.5,20.2],[1.6,20.6],[0,20.7]],px=20.7,Qr=-4.55,Bs=8.9,wh=12,qa=2,vx=[1,2,1,3],yx=18.5,bx=[.3,.24,.2],wx=[.45,.27,.11],xx=[.18,.18,.2],Mx=[.2,.17,.14],kx=[.05,.03,.02];function Sx(){const t=[],n=[],e=[],o=[],a=[],s=[],c=[],i=Ho.length-1;for(let h=0;h<=i;h++){const f=Ho[Math.max(0,h-1)],m=Ho[Math.min(i,h+1)],d=Math.hypot(m[0]-f[0],m[1]-f[1]);s.push((m[1]-f[1])/d),c.push(-(m[0]-f[0])/d)}const r=(h,f,m)=>{const[d,g]=Ho[h],p=Math.cos(f),v=Math.sin(f);t.push(d*p,g,d*v),n.push(s[h]*p,c[h],s[h]*v),e.push(...m===0?bx:[1,1,1]),o.push(m),a.push(.3+.7*(1-g/px)**2)},l=wh*qa;for(let h=0;h<wh;h++)for(let f=0;f<qa;f++){const m=(h*qa+f)/l*Math.PI*2,d=(h*qa+f+1)/l*Math.PI*2;for(let g=0;g<i;g++){const p=g===0?0:Ho[g][1]>=yx?3:vx[h%4];r(g,m,p),r(g+1,m,p),r(g+1,d,p),r(g,m,p),r(g+1,d,p),r(g,d,p)}}const u=new ht;return u.setAttribute("position",new F(new Float32Array(t),3)),u.setAttribute("normal",new F(new Float32Array(n),3)),u.setAttribute("color",new F(new Float32Array(e),3)),u.setAttribute("aSlot",new F(new Float32Array(o),1)),u.setAttribute("aGlow",new F(new Float32Array(a),1)),u}function Tx(){const t=[Sx(),Cn(new B(1.5,1.15,1.5).translate(0,-3.95,0),wx),Cn(new B(.6,.3,.6).translate(0,-2.45,0),xx),Cn(new ue(.28,1.3,6).translate(0,-1.6,0),kx,0,2)];for(let e=0;e<4;e++){const o=Math.PI/4+e*Math.PI/2,a=Math.cos(o),s=Math.sin(o);t.push(ir(new L(1.3*a,.05,1.3*s),new L(Math.sign(a)*.72,-3.38,Math.sign(s)*.72),.05,Mx))}const n=At(t);if(!n)throw new Error("sky-festival: ghép hình khinh khí cầu hỏng (lệch bộ thuộc tính)");return n}const Yt=[.8,.035,.03],vn=[.025,.15,.78],Kd=[.08,.42,.9],$n=[.78,.03,.4],Rt=[.84,.84,.82],Ud=[.02,.5,.48],Fs=[.3,.05,.68],Vd=[.95,.3,.03],qd=[.92,.66,.04],li=[[Yt,Rt,Yt],[vn,Rt,Yt],[$n,Rt,$n],[Rt,Yt,vn],[Yt,Vd,qd],[vn,Kd,Rt],[$n,Fs,vn],[Rt,vn,vn],[Ud,Rt,$n],[Yt,$n,Fs],[Rt,$n,Yt],[vn,Yt,Rt]],t0=[[Yt,Rt,vn],[vn,Rt,Yt],[$n,Rt,Fs],[Yt,qd,vn],[Rt,Yt,Yt],[Fs,$n,Rt],[Ud,Rt,$n],[vn,Kd,Rt],[Yt,Vd,Rt]],Ax=.45,Nx=.9,zx=.2;function Cx(){const t={value:1},n={value:0},e={value:0},o=new me({vertexColors:!0,side:zt,fog:!0});return o.onBeforeCompile=a=>{a.uniforms.uLift=t,a.uniforms.uNight=n,a.uniforms.uTime=e,a.vertexShader=`attribute float aSlot;
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
  totalEmissiveRadiance += diffuseColor.rgb * ${Ax.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = max(dot(-toCam, ATM_SUN_DIR), 0.0);
    totalEmissiveRadiance += diffuseColor.rgb * ATM_SUN_LIGHT * pow(facing, 3.0) * ${Nx.toFixed(3)} * uLift;
    float fres = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * facing * ${zx.toFixed(3)} * uLift;
  }
  #endif
  {
    // Đầu đốt phụt từng đợt (~1/3 thời gian, lệch pha theo quả) + rung lửa. Dù lượn có aGlow 0 nên không ăn gì.
    float burn = smoothstep(0.35, 0.8, sin(uTime * 0.5 + vSeed * 6.2832)) * (0.8 + 0.2 * sin(uTime * 23.0 + vSeed * 41.0));
    float flame = step(1.5, vGlow);
    totalEmissiveRadiance += burn * (flame * vec3(2.2, 1.0, 0.3) * (0.4 + uNight)
      + (1.0 - flame) * vGlow * diffuseColor.rgb * (0.12 + 1.3 * uNight));
  }`)},o.customProgramCacheKey=()=>"sky-festival-cloth",{material:o,lift:t,night:n,time:e}}const to=14,gc=.95,pc=6.3,Ex=2.6,vc=[[1,1],[.65,1],[.35,1],[.12,1],[0,0],[.12,-1],[.5,-1],[1,-1]],hi=-7,Lx=5.2,cr=[1,1,1],xh=[.72,.7,.66],Px=[.08,.08,.1],_x=[.12,.14,.22],Rx=[.85,.85,.82];function $s(t,n,e,o){const a=-gc+2*gc*t/to,s=a/gc,c=Ex*Math.sqrt(1-.72*s*s),i=.75*(.2969*Math.sqrt(n)-.126*n-.3516*n*n+.2843*n**3-.1015*n**4),r=(.2*n*(1-n)+(e>0?i:e<0?-.55*i:0))*c,l=Math.sin(a),u=Math.cos(a);return o.set((pc+r)*l,(pc+r)*u-pc,c*(.35-n)-.3*s*s)}function Ix(){const t=[],n=new L,e=vc.length;for(let o=0;o<to;o++){const a=Math.min(o,to-1-o),s=a<2?3:a<5?2:1,c=[];for(const r of[o,o+1])for(const[l,u]of vc)c.push(...$s(r,l,u,n).toArray());const i=[];for(let r=0;r<e;r++){const l=r,u=(r+1)%e;i.push(l,u,u+e,l,u+e,l+e)}t.push(Cn(bh(c,i),cr,s))}for(const o of[0,to]){const a=[];for(const[c,i]of vc)a.push(...$s(o,c,i,n).toArray());const s=[];for(let c=1;c<e-1;c++)s.push(0,c,c+1);t.push(Cn(bh(a,s),cr,3))}return t}const Mh=new L(-.22,-6.45,0),kh=new L(.22,-6.45,0);function Hx(){const t=[],n=new L;for(const e of[1,3,5,9,11,13])t.push(ir($s(e,.3,-1,n).clone(),e<to/2?Mh:kh,.035,xh));for(const e of[1,13])t.push(ir($s(e,1,-1,n).clone(),e<to/2?Mh:kh,.03,xh));return t}function Gx(){return[Cn(new B(.5,.34,.7).translate(0,-6.75,.02),Px),Cn(new B(.44,.6,.3).rotateX(-.25).translate(0,-6.32,-.14),cr,1),Cn(new B(.36,.2,.75).translate(0,-6.86,.55),_x),Cn(new Hn(.17,0).translate(0,-5.88,-.18),Rx)]}function Bx(){const t=At([...Ix(),...Hx(),...Gx()]);if(!t)throw new Error("sky-festival: ghép hình dù lượn hỏng (lệch bộ thuộc tính)");return t}const mo=3e3,fo=150,Fx=400,$x=40,Os=25,Ma=24,no=40,Ox=40,Sh=t=>t<no?Ox:Ma,Dx=8,Kx=10,Ux=500,Th=600,Re=25,Q={s:0,x:1,y:2,z:3,psi:4,a:5,b:6,w:7,phi:8,bob:9,freq:10,scale:11,on:12},ui=13;function Vx(t){return{cap:t,rec:new Float64Array(t*ui),pal:new Float32Array(t*9),seed:new Float32Array(t)}}function Ie(t,n,e){const o=n*ui,a=t.rec;a[o+Q.s]=e.s,a[o+Q.x]=e.x,a[o+Q.y]=e.y,a[o+Q.z]=e.z,a[o+Q.psi]=e.psi,a[o+Q.a]=e.a,a[o+Q.b]=e.b,a[o+Q.w]=e.w,a[o+Q.phi]=e.phi,a[o+Q.bob]=e.bob,a[o+Q.freq]=e.freq,a[o+Q.scale]=e.scale,a[o+Q.on]=1,t.seed[n]=e.seed;for(let s=0;s<3;s++)t.pal.set(e.scheme[s],n*9+s*3)}function qn(t,n){t.rec[n*ui+Q.on]=0}function He(t,n){return t[Math.min(t.length-1,Math.floor(n*t.length))]}function qx(t,n){return R(n+mo,n+mo-Fx,t)*R(n-fo,n-fo+$x,t)}const Ah=[],Wa={x:0,y:0,z:0};function Mo(t,n,e,o,a){const s=Math.max(6,Math.ceil(2*Math.PI*Math.sqrt((e*e+o*o)/2)/Kx)),c=Math.sin(a),i=Math.cos(a);let r=rt(t,n);for(let l=0;l<s;l++){const u=l/s*Math.PI*2,h=e*Math.cos(u),f=o*Math.sin(u);r=Math.max(r,rt(t+c*h+i*f,n+i*h-c*f))}return r}function Ge(t,n,e,o,a,s,c,i=!0){let r=Math.max(s,c+Dx-a);if(!i)return r;const l=ba(t,n,Ux,Ah);for(let u=0;u<l;u++){const h=Ah[u];if(!(h.core>0))for(let f=-1;f<=1;f++){const m=h.s+f*o;h.dist-o<ln(m)+Os&&(r=Math.max(r,Y(m)+Sh(h.dist-o)-a))}}for(let u=e-Th;u<=e+Th;u+=Re){D(u,0,0,Wa);const h=Math.hypot(t-Wa.x,n-Wa.z)-o-Re/2;h<ln(u)+Os&&(r=Math.max(r,Wa.y+Sh(h)-a))}return r}function ma(t,n,e){return{ring:Math.ceil((mo+fo)/t)+3,per:n,span(o,a){a[0]=Math.floor((o-fo)/t)-1,a[1]=Math.floor((o+mo)/t)},build:e}}function mi(t,n,e){const o=t.length,a=Math.min(...t),s=Math.max(...t);return{ring:o*(Math.floor((mo+fo+s-a)/lt)+2)+1,per:n,span(c,i){i[0]=Math.floor((c-fo+Ht-s)/lt)*o,i[1]=Math.floor((c+mo+Ht-a)/lt)*o+o-1},build:e}}function di(t,n){const e=Math.floor(t/n.length),o=t-e*n.length;return{s:n[o]-Ht+e*lt,j:o}}const Wd=Math.PI*2,Yd=1.6,Nh=new Lu(0,0,0,"YXZ"),Wx=new xt,Yx=new L,Xx=new L;function n0(t,n,e,o,a,s,c,i){Nh.set(a,s,c),t.compose(Yx.set(n,e,o),Wx.setFromEuler(Nh),Xx.set(i,i,i))}const jx=(t,n,e,o,a,s)=>{const c=t[e+Q.a],i=t[e+Q.b],r=t[e+Q.w],l=t[e+Q.phi]+r*o,u=Math.cos(l),h=Math.sin(l),f=Math.sin(t[e+Q.psi]),m=Math.cos(t[e+Q.psi]),d=f*c*u+m*i*h,g=m*c*u-f*i*h,p=Math.atan2((-f*c*h+m*i*u)*r,(-m*c*h-f*i*u)*r),v=-r*r*(d*Math.cos(p)-g*Math.sin(p)),k=n*Wd,M=Math.max(-.7,Math.min(.7,-Math.atan(v/9.8)*Yd)),w=t[e+Q.y]+t[e+Q.bob]*Math.sin(o*t[e+Q.freq]+k);n0(s,t[e+Q.x]+d,w,t[e+Q.z]+g,.06+.04*Math.sin(o*1.1+k),p,M,t[e+Q.scale]*a)},Zx=(t,n,e,o,a,s)=>{const c=n*Wd,i=t[e+Q.freq],r=t[e+Q.a]*Math.sin(o*i+t[e+Q.phi]),l=t[e+Q.psi],u=t[e+Q.y]+t[e+Q.b]*Math.sin(o*i*1.7+c);n0(s,t[e+Q.x]+Math.sin(l)*r,u,t[e+Q.z]+Math.cos(l)*r,.03*Math.sin(o*.55+c*1.3),t[e+Q.phi]+t[e+Q.w]*o,.03*Math.sin(o*.43+c),t[e+Q.scale]*a)},fi=Lx+3,e0=6,le=(t,n)=>e=>C(t,e,n),zh=6,Jx=6,yc={x:0,y:0,z:0};function Ch(t,n,e,o){let a=-1/0;for(let s=0;s<zh;s++){const c=t+(n-t)*s/(zh-1);for(const i of e)D(c,o*i,0,yc),a=Math.max(a,rt(yc.x,yc.z)-Y(c))}return a}function o0(t,n,e,o){const a=Ch(t,n,e,1),s=Ch(t,n,e,-1),c=Math.abs(a-s)<Jx?o<.5?1:-1:a<s?1:-1;return[c,-c]}const Eh=Math.PI*2,Lh=1050,Qx=.85,rr=1.25,Xd=3,Ph=3,Go=Xd+Bs*rr,tM=70,Zn={x:0,y:0,z:0};function _h(t,n,e,o){const a=no+Re/2+Go+3+18*n(2),s=Qr*rr-Ph;for(const c of o0(t-80,t+80,[a,a+Go],n(3))){D(t,c*a,Ma+2-s+6*n(4),Zn);const i=Ge(Zn.x,Zn.z,t,Go,s-e0,Zn.y,Mo(Zn.x,Zn.z,Go,Go,0));if(!(i-Y(t)>tM))return Ie(o,e,{s:t,x:Zn.x,y:i,z:Zn.z,psi:n(5)*Eh,a:Xd,b:Ph,w:(n(6)<.5?-1:1)*.03,phi:n(7)*Eh,bob:0,freq:.03,scale:rr,seed:n(8),scheme:He(t0,n(9))})}qn(o,e)}function nM(t){return[{...ma(Lh,1,(n,e,o)=>{const a=le(n,707);if(a(0)>=Qx)return qn(o,e);_h((n+.25+.5*a(1))*Lh,a,e,o)}),whoosh:!0},{...mi(t,1,(n,e,o)=>_h(di(n,t).s,le(n,709),e,o)),whoosh:!0}]}const eM=Math.PI*2,Rh=420,oM=.85,lr=3,a0=.28,hr=950,ur=140,aM=220,s0=1.45,xe=fi*s0,i0=1.2,jd=hi*s0-i0,ke=30,ae=-a0*hr-60,c0=a0*ur+5,se=Math.ceil((c0-ae)/ke)+1,gs=15,Zd=Math.ceil((c0-ae+2*ke)/gs)+1,sM=85,iM=-12,cM=170,Ih=15,yn={x:0,y:0,z:0},Ya=new Float64Array(Zd),Bo=new Float64Array(se);function rM(t,n,e,o,a,s,c,i){const r=a+s/2,l=xe+s/2,u=e+ae-ke;Ya.fill(Number.NaN);const h=m=>{if(Number.isNaN(Ya[m])){let d=-1/0;for(const g of s>6?[a-xe,r,a+s+xe]:[a-xe,a+s+xe])D(u+m*gs,o*g,0,yn),d=Math.max(d,rt(yn.x,yn.z));Ya[m]=d}return Ya[m]};for(let m=0;m<se;m++){const d=e+ae+m*ke;let g=-1/0;const p=Math.min(Zd-1,Math.ceil((m+2)*ke/gs));for(let v=Math.floor(m*ke/gs);v<=p;v++)g=Math.max(g,h(v));if(D(d,o*r,c,yn),Bo[m]=Ge(yn.x,yn.z,d,l,jd,yn.y,g)-Y(d),Bo[m]>i)return 1/0}let f=-1/0;for(let m=0;m<se;m++){const d=Math.max(Bo[Math.max(0,m-1)],Bo[m],Bo[Math.min(se-1,m+1)]);t[n+m]=d,f=Math.max(f,d)}return f}function lM(t,n,e,o,a,s){const c=o(2)<.3?3:o(2)<.6?2:1,i=7+5*o(3),r=16+10*o(4),l=i*(c-1),u=o0(e+ae,e,[no+30,no+l+70],o(7)),h=u.map(d=>[d,no+Re/2+xe+2+8*o(5),Ma+1-jd+6*o(6)]);let f=0;for(let d=0;d<=4;d++)f=Math.max(f,ln(e+ae+(c0-ae)*d/4));const m=f+Os+Re/2+xe+3+10*o(5);m<=cM&&h.unshift([u[0],m,iM+8*o(6)]);for(const[d,g,p]of h)if(rM(t,n*se,e,d,g,l,p,p<0?p+12:sM)!==1/0){for(let v=0;v<c;v++)Ie(s,a+v,{s:e,x:d*(g+v*i),y:v*(1.5+2*o(8+v)),z:-v*r,psi:n,a:0,b:0,w:0,phi:0,bob:i0,freq:.35+.2*o(11+v),scale:s0,seed:o(14+v),scheme:He(li,o(17+v))});return}}function Hh(t,n,e){let o=new Float64Array(0),a=0;const i={...t,build:(r,l,u)=>{for(let m=0;m<lr;m++)qn(u,l+m);const h=le(r,e),f=n(r,h);f!==null&&lM(o,(r%a+a)%a,f,h,l,u)},pose:(r,l,u,h,f,m,d)=>{const g=r[u+Q.s],p=g+a0*(d-g)+r[u+Q.z],v=Math.min(se-1.0001,Math.max(0,(p-g-ae)/ke)),k=Math.floor(v),M=v-k,w=r[u+Q.psi]*se+k,y=l*eM,x=o[w]*(1-M)+o[w+1]*M+r[u+Q.y]+i0*Math.sin(h*r[u+Q.freq]+y);D(p,r[u+Q.x],x,yn);const b=-Math.atan(Ih*Ih*yo(p)/9.8)*Yd,A=Math.max(-.5,Math.min(.5,b))+.05*Math.sin(h*.7+y);n0(m,yn.x,yn.y,yn.z,.06+.03*Math.sin(h*1.1+y),Ct(p),A,r[u+Q.scale]*f)},fade:(r,l)=>R(r-hr,r-hr+aM,l)*(1-R(r+ur-40,r+ur,l)),cost:4,whoosh:!0};return a=i.ring,o=new Float64Array(a*se),i}function hM(t){const n=()=>{};return[Hh(ma(Rh,lr,n),(e,o)=>o(0)<oM?(e+.2+.6*o(1))*Rh:null,706),Hh(mi(t,lr,n),e=>di(e,t).s,708)]}const Jd=[{phase:1160,lat:300,side:0,base:-70,n:5},{phase:1330,lat:320,side:0,base:-40,n:5},{phase:2660,lat:190,side:-1,base:-50,n:4},{phase:2860,lat:210,side:-1,base:-30,n:5}],Qd=[{phase:285,lat:106,side:0,up:-95},{phase:1220,lat:260,side:0,up:-60}],uM=[300,1e3,1250],mM=[240,1e3,1250],he=Math.PI*2,tf=80,nf=550,ef=400,dM=.85,of=900,af=Jd.map(t=>t.phase),r0=5,Xa=new Float64Array(r0),sf=Qd.map(t=>t.phase),st={x:0,y:0,z:0};function cf(t,n,e){const o=yo(t);return n===0||Math.abs(o)<1e-4?e<.5?-1:1:n*Math.sign(o)}function fM(t){return(n,e,o)=>{const a=le(n,701);if(a(0)>=t)return qn(o,e);const s=(n+a(1))*tf,c=(a(2)<.5?-1:1)*(55+a(3)**2.2*1300),i=1.3+.6*R(150,1100,Math.abs(c)),r=50+110*a(5),l=r*(.15+.3*a(6)),u=a(7)*he,h=2+3*a(11);D(s,c,12+a(4)**1.8*320,st);const f=Mo(st.x,st.z,r,l,u),m=Ge(st.x,st.z,s,r+fi*i,hi*i-h,st.y,f);if(m-Y(s)>of)return qn(o,e);const d=(a(9)<.5?-1:1)*(8+3*a(8))/Math.sqrt((r*r+l*l)/2);Ie(o,e,{s,x:st.x,y:m,z:st.z,psi:u,a:r,b:l,w:d,phi:a(10)*he,bob:h,freq:.15+.2*a(12),scale:i,seed:a(13),scheme:He(li,a(14))})}}function gM(t){return(n,e,o)=>{const a=le(n,702),{s,j:c}=di(n,af),i=Jd[c],r=Math.max(2,Math.round(i.n*(.4+.6*t)));D(s,cf(s,i.side,a(0))*(i.lat+30*(a(1)-.5)),i.base,st);const l=5,u=26+10*a(2);let h=-1/0;for(let d=0;d<r;d++)Xa[d]=32+26*a(10+d),h=Math.max(h,Mo(st.x,st.z,Xa[d],Xa[d],0)-d*u);const f=Ge(st.x,st.z,s,58+fi,hi-l,st.y,h),m=a(3)<.5?-1:1;for(let d=0;d<r0;d++){if(d>=r){qn(o,e+d);continue}const g=Xa[d];Ie(o,e+d,{s,x:st.x,y:f+d*u,z:st.z,psi:0,a:g,b:g,w:m*(8.5+1.5*a(20+d))/g,phi:d/r*he+a(30+d),bob:l,freq:.08+.05*a(40+d),scale:1,seed:a(50+d),scheme:He(li,a(60+d))})}}}const pM=(t,n,e)=>{const o=le(t,703);if(o(0)>.85)return qn(e,n);const a=(t+.15+.7*o(1))*nf,s=18+10*o(3),c=s+fi,i=1.5,r=hi-i,l=o(4)<dM,u=l?no+c+Re/2+30*o(5):ln(a)+Os+c+Re/2+10+35*o(5),h=l?Ma+2-r+8*o(6):5+20*o(6);D(a,(o(2)<.5?-1:1)*u,h,st);const f=Ge(st.x,st.z,a,c,r,st.y,Mo(st.x,st.z,s,s,0));Ie(e,n,{s:a,x:st.x,y:f,z:st.z,psi:0,a:s,b:s,w:(o(7)<.5?-1:1)*9/s,phi:o(8)*he,bob:i,freq:.3,scale:1,seed:o(9),scheme:He(li,o(10))})};function vM(t){return(n,e,o)=>{const a=le(n,704);if(a(0)>=.4+.6*t)return qn(o,e);const s=(n+a(1))*ef,c=(a(2)<.5?-1:1)*(220+a(3)**1.6*1800),i=1+.6*R(400,2e3,Math.abs(c)),r=20+20*a(4),l=6+6*a(5),u=a(7)*he;D(s,c,40+360*a(6),st);const h=Qr*i-l-e0,f=Ge(st.x,st.z,s,r+Bs*i,h,st.y,Mo(st.x,st.z,r,0,u));if(f-Y(s)>of)return qn(o,e);Ie(o,e,{s,x:st.x,y:f,z:st.z,psi:u,a:r,b:l,w:(a(8)<.5?-1:1)*(.02+.04*a(9)),phi:a(10)*he,bob:0,freq:.02+.02*a(11),scale:i,seed:a(12),scheme:He(t0,a(13))})}}const yM=(t,n,e)=>{const o=le(t,705),{s:a,j:s}=di(t,sf),c=Qd[s],i=1.1,r=4,l=o(3)*he,u=Qr*i-r,h=c.side===0?o0(a-40,a+40,[c.lat],1-o(0))[0]:cf(a,c.side,o(0));D(a,h*(c.lat+30*o(1)),(c.up??Ma+2-u)+15*o(2),st);const f=c.up!==void 0&&c.up+15+2*Bs*i<-40,m=Ge(st.x,st.z,a,8+Bs*i,u-e0,st.y,Mo(st.x,st.z,8,0,l),!f);Ie(e,n,{s:a,x:st.x,y:m,z:st.z,psi:l,a:8,b:r,w:(o(4)<.5?-1:1)*.03,phi:o(5)*he,bob:0,freq:.03,scale:i,seed:o(6),scheme:He(t0,o(7))})};function bM(t){return[ma(tf,1,fM(t)),mi(af,r0,gM(t)),ma(nf,1,pM),...hM(uM)]}function wM(t){return[ma(ef,1,vM(t)),{...mi(sf,1,yM),whoosh:!0},...nM(mM)]}const xM=4*Math.PI*100;function Gh(t,n,e,o,a,s){const c=[];let i=0;for(const f of o)c.push(i),i+=f.ring*f.per;const r=f=>new Sr(new Float32Array(i*f),f).setUsage(ws),l=[r(3),r(3),r(3)],u=r(1);n.setAttribute("aPalA",l[0]),n.setAttribute("aPalB",l[1]),n.setAttribute("aPalC",l[2]),n.setAttribute("aSeed",u);const h=new bt(n,e,i);return h.name=t,h.instanceMatrix.setUsage(ws),h.frustumCulled=!1,h.count=0,{mesh:h,bank:Vx(i),streams:o,bases:c,keys:o.map(f=>new Float64Array(f.ring).fill(Number.NaN)),spans:o.map(()=>[Number.NaN,Number.NaN]),order:new Int32Array(i).fill(-1),pal:l,seed:u,pose:a,whoosh:i2(i),big:s}}const ge=[0,0],MM=4;function kM(t,n,e){for(let o=0;o<t.streams.length;o++){const a=t.streams[o];a.span(n,ge);const s=t.spans[o];if(ge[0]===s[0]&&ge[1]===s[1])continue;const c=t.keys[o];let i=!0;for(let r=ge[0];r<=ge[1];r++){const l=(r%a.ring+a.ring)%a.ring;if(c[l]!==r){if(e<=0){i=!1;break}e-=a.cost??1,c[l]=r,a.build(r,t.bases[o]+l*a.per,t.bank),t.order.fill(-1)}}i&&(s[0]=ge[0],s[1]=ge[1])}return e}const bc=new Pt;function SM(t,n,e){const{rec:o,pal:a,seed:s}=t.bank;let c=0,i=!1;t.whoosh.begin(n,e);for(let r=0;r<t.streams.length;r++){const l=t.streams[r],u=l.pose??t.pose,h=l.fade??qx,f=t.bases[r]+l.ring*l.per;for(let m=t.bases[r];m<f;m++){const d=m*ui;if(!o[d+Q.on])continue;const g=h(o[d+Q.s],n);if(!(g<=0)){if(u(o,s[m],d,e,g,bc,n),l.whoosh&&t.whoosh.watch(m,bc,t.big),t.mesh.setMatrixAt(c,bc),t.order[c]!==m){t.order[c]=m,i=!0;for(let p=0;p<3;p++){const v=t.pal[p].array;for(let k=0;k<3;k++)v[c*3+k]=a[m*9+p*3+k]}t.seed.array[c]=s[m]}c++}}}if(t.mesh.count=c,t.mesh.instanceMatrix.needsUpdate=!0,i){for(let r=0;r<3;r++)t.pal[r].needsUpdate=!0;t.seed.needsUpdate=!0}}function TM(t){const n=new wt;if(n.name="sky-festival",re()<=.5)return{group:n,update(){}};const e=Cx(),o=[Gh("sky-festival-paragliders",Bx(),e.material,bM(t),jx,!1),Gh("sky-festival-balloons",Tx(),e.material,wM(t),Zx,!0)];for(const a of o)n.add(a.mesh);return{group:n,update(a,s,c){e.lift.value=1-.85*En((c-.4)/.5),e.night.value=En((c-.45)/.4),e.time.value=s%xM;let i=MM;for(let r=0;r<o.length;r++){const l=o[r];i=kM(l,a,i),SM(l,a,s)}}}}const Fo=(t,n,e)=>{const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)};function AM(t,n,e,o,a,s){const c=a/7+1.3*C(e*1.2+3,o*1.2,t.seed+21),i=Math.floor(c),r=c-i,l=C(i,t.seed*3.1,22),u=5+Math.floor(l*2.999),h=2*Math.PI/u,f=((n+l*7.7)%h+h)%h-h/2,m=1-Math.cos(h/2)/Math.cos(f),d=t.crest&&a<t.bandLo-.01?.9:.4,g=.12*(1-l),p=.1*(1-Math.sin(Math.PI*r))**2,v=(l-.5)*2.4,k=Fo(.42,.7,C(e*3+i*1.7,o*3,t.seed+23)),M=Math.pow(.5+.5*Math.sin(n*5+s*3+t.seed*1.3+v),9)*k,w=Math.max(0,1-Math.min(r,1-r)/.09),y=w*w*Fo(.35,.55,C(e*2+5,o*2+i,t.seed+24)),x=a<t.bandLo-3?.22*Fo(.68,.82,C(e*1.8+9,o*1.8+a/11,t.seed+25)):0,b=a>=t.bandLo-.01&&a<=t.bandHi+.01?.6:1,A=.5+.5*(e*Math.cos(t.seed*2.4)+o*Math.sin(t.seed*2.4)),z=Fo(.5,.75,C(e*2.2+13,o*2.2,t.seed+26)),E=t.crest&&a>t.top-1.3?Math.min(.85,.1+.6*A*A+.3*z)*(a-(t.top-1.3)):0,N=(t.crest?Math.min(1,Math.max(0,(t.bandLo-a)/4)):0)*.3*Fo(.45,.75,C(e*1.6+17,o*1.6+a/9,t.seed+27));return{shape:b*(d*m+g+p)-N,groove:b*(.1*M+.12*y)+x,drop:E}}const Vt=40;function NM(t){const n=[];for(let e=t.bottom;e<t.top;){n.push(e);const o=Math.min(Math.abs(e-t.bandLo),Math.abs(e-t.bandHi),e>t.bandLo&&e<t.bandHi?0:99);e+=Math.min(10,1.2+o*.12)}return t.granite&&t.crest?[...n.filter(e=>e<t.top-1.25),t.top-1,t.top-.55,t.top-.25,t.top]:(n.push(t.top),n)}function da(t){const n=NM(t),e=[],o=[],a=[];let s=0;for(const f of n){const m=f>=t.bandLo-.01&&f<=t.bandHi+.01,d=m?t.rc:t.radius(f),g=Math.min(1,Math.max(0,(t.radius(f+6)-d)/(d*.6))),[p,v]=m?[0,0]:t.offset?.(f)??[0,0];for(let k=0;k<Vt;k++){const M=k/Vt*Math.PI*2,w=Math.cos(M),y=Math.sin(M),x=C(w*1.4+t.seed*7.1,y*1.4+f/26,31)-.5,b=C(w*4+t.seed,y*4+f/5,32)-.5,A=t.granite?0:Math.max(0,Math.sin((f/7+C(w,y,t.seed)*2)*Math.PI))**6*.12;let z=d*(1+.42*x+.12*b+A);m&&(z=t.rc*(.9+.1*(b+.5))),t.granite&&t.crest&&f>t.top-1.2&&(z*=1-.5*((f-(t.top-1.2))/1.2)**2);const E=Math.pow(.5+.5*Math.sin(M*9+x*5+t.seed+f/40),5),T=Math.pow(Math.max(0,Math.sin((f/4.6+C(w*2,y*2,t.seed+9)*1.5)*Math.PI)),10),N=t.granite?AM(t,M,w,y,f,x):null,S=N?N.groove:.1*E+.09*T,P=N?d*(1-N.shape):d;z*=(1-S)*(N?1-N.shape:1),e.push(w*z+p,N?f-N.drop:f,y*z+v),N&&f===t.top&&(s+=N.drop/Vt),a.push(Math.min(.85,Math.max(0,(1-z/P)*1.6)+S*2.5+g*.55)),o.push(t.crest&&f>t.top-.7?1:0)}}const[c,i]=t.offset?.(t.top)??[0,0];e.push(c,t.top+(t.crest?0:2.5)-s,i),o.push(t.crest?1:0),a.push(0);const r=[];for(let f=0;f<n.length-1;f++)for(let m=0;m<Vt;m++){const d=f*Vt+m,g=f*Vt+(m+1)%Vt;r.push(d,d+Vt,g,g,d+Vt,g+Vt)}const l=n.length*Vt,u=(n.length-1)*Vt;for(let f=0;f<Vt;f++)r.push(u+f,l,u+(f+1)%Vt);const h=new ht;return h.setAttribute("position",new F(new Float32Array(e),3)),h.setAttribute("aCrest",new F(new Float32Array(o),1)),h.setAttribute("aShade",new F(new Float32Array(a),1)),h.setIndex(r),h.computeVertexNormals(),h}function zM(t,n){const e=[],o=new it;for(let a=0;a<n;a++){const s=a<Math.ceil(n*.6),c=s?t.top-1.5-3*C(a,t.seed,41):t.bandLo-6-40*C(t.seed,a,42),i=t.seed*2.3+a*2.39,r=s?t.radius(c)*.75*C(a,t.seed,43):t.radius(c)*.95,l=.35+.35*C(a*1.3,t.seed,44),u=(C(a,t.seed*3,45)<.45?Ym():Xm()).clone();u.scale(l,l*1.1,l).rotateY(i).translate(Math.cos(i)*r,c,Math.sin(i)*r),o.setHSL(.24+.06*C(a,7,t.seed),.3,.55);const h=u.getAttribute("color");if(h)for(let f=0;f<h.count;f++)h.setXYZ(f,h.getX(f)*o.r*2,h.getY(f)*o.g*2,h.getZ(f)*o.b*2);e.push(u)}return At(e)}function CM(t,n){const e=46+10*C(t,1,51);return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:o=>o<-6.5?n+.3*Math.pow(-6.5-o,.9):(n+.32*(o-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-o)/7)))}}function l0(t,n,e=!1){const o=a=>e?3*(1-Math.exp(-a/3)):0;return{seed:t,rc:n,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,granite:e,radius:a=>n+.28*Math.pow(Math.max(0,-6.5-a),.92)+o(Math.max(0,-6.5-a))}}function EM(t,n,e=0){const o=e===2,a=o?80+20*C(t,3,52):62+30*C(t,3,52),s=o?1.05+.25*C(t,4,53):.55+.35*C(t,4,53),c=e===1?5+6*C(t,6,55):1.2*C(t,6,55),i=C(t,7,56)*Math.PI*2;return{seed:t,rc:n,bandLo:-6.5,bandHi:22.5,bottom:-320,top:a,crest:!1,granite:!0,radius:r=>{if(r<-6.5)return n+.34*Math.pow(-6.5-r,.92);const l=Math.max(0,(a-r)/(a-22.5)),u=Math.min(1,Math.max(0,(r-22.5)/10));return Math.max(.6,(n+2.2*u*u*(3-2*u))*Math.pow(l,s))},offset:r=>{const l=Math.max(0,(r-22.5)/(a-22.5));return[Math.cos(i)*c*l*l,Math.sin(i)*c*l*l]}}}function LM(t,n){const e=50+18*C(t,8,57),o=C(t,9,58)*Math.PI*2,a=n+.6;return{seed:t+5,rc:2.4,bandLo:0,bandHi:0,bottom:24,top:e,crest:!1,granite:!0,radius:s=>Math.max(.5,2.8*Math.pow(Math.max(0,(e-s)/(e-24)),.75)),offset:s=>[Math.cos(o)*(a+.08*(s-24)),Math.sin(o)*(a+.08*(s-24))]}}function PM(t){return[0,1,2,3,4,5].map(n=>{const e=n*2.1+.9,o=da(EM(e,t,n%3));return n<3?o:At([o,da(LM(e,t))])})}const ps=t=>Math.min(1,Math.max(0,t)),Bh=t=>{const n=ps(t);return n*n*(3-2*n)},$o=new Map;function*_M(t){let n=$o.get(t);if(!n){const a=new B(t,1,7.6,Math.max(16,Math.round(t)),48,6).translate(0,.5,0);a.deleteAttribute("normal"),a.deleteAttribute("uv"),yield,$o.set(t,n=yield*i5(a)),a.dispose(),$o.size>3&&$o.delete($o.keys().next().value)}const e=new ht;e.setAttribute("position",new F(n.getAttribute("position").array.slice(),3));const o=n.getIndex();e.setIndex(new F(o.array.slice(),1));for(const a of n.groups)e.addGroup(a.start,a.count,a.materialIndex);return e}function RM(t,n,e){return Ur(rf(t,n,e))}function*rf(t,n,e){const o=Math.floor(Math.abs(e(t/2-1))*13.7)%997,a=yield*_M(t);yield;const s=a.getAttribute("position"),c=new Float32Array(s.count),i=new Float32Array(s.count);for(let r=0;r<s.count;r++){const l=s.getX(r),u=s.getY(r),h=s.getZ(r),f=Math.abs(h)/3.8,m=ps((Math.abs(l)-10)/3.5),d=Math.floor(l/2.6+.4*C(h*.3,1,o+31)),g=C(d,0,o+32),p=n(l)-(1-m)*.6*C(l*.5,h,3)-m*(2.6*g-.9+.5*C(l*.7,h*.5,o+33)),v=e(l)-10*C(l*.06,1,4);let k=v+(p-v)*u;i[r]=Math.abs(l)<12&&k>.3?1:0;const M=1+.6*ps(-k/40),w=l/3.4+.7*C(l*.09,k*.045,o+41),y=Math.floor(w),x=w-y,b=C(y,0,o+42),A=5+7*b,z=k/A+b*7.3,E=z-Math.floor(z),T=C(y,Math.floor(z),o+43),N=Bh(Math.min(x,1-x)/.22),S=T>.5?Bh(Math.min(E,1-E)*A/.7):1,P=(.25+.75*(.65*b+.35*T))*N*S,I=2*(Ft(l*.07,k*.06,3,9+o)-.5),G=Math.min(1,Math.max(0,(p-k-.6)/2.4),Math.max(0,(k-v)/3)),K=(1.3*P-.5+.6*I)*G;c[r]=G*f*Math.min(.7,.55*(1-N*S)+.3*Math.max(0,-I));let V=h*M*(1+.3*(C(l*.2,k*.1,5)-.5))+Math.sign(h)*f*K;u>.999&&(k-=.45*f**4),V-=Math.sign(h)*.35*f*ps(1-(p-k)/1.2),s.setXYZ(r,l*(1+.04*(C(k*.1,h,6)-.5)),k,V),(r&1023)===1023&&(yield)}return a.setAttribute("aCrest",new F(i,1)),a.setAttribute("aShade",new F(c,1)),yield,yield*c5(a),a}const Gn=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function IM(t,n,e){if(ce()==="fansipan")return RM(t,n,e);const o=new B(t,1,7.6,Math.max(10,Math.round(t/2)),36,4).translate(0,.5,0),a=o.getAttribute("position"),s=new Float32Array(a.count);for(let i=0;i<a.count;i++){const r=a.getX(i),l=a.getY(i),u=a.getZ(i),h=Math.min(1,Math.max(0,(Math.abs(r)-9)/4)),f=n(r)-(1-h)*.6*C(r*.5,u,3)-h*1.6*(C(r*.3,u*.2,3)-.3),m=e(r)-10*C(r*.06,1,4),d=m+(f-m)*l,g=1+.6*Math.max(0,Math.min(1,-d/40)),p=((d+3*C(r*.04,0,7))/5.5%1+1)%1,v=2.4*(Ft(r*.07,d*.06,3,9)-.5),k=Math.min(1,Math.max(0,(f-d-.6)/2.4),Math.max(0,(d-m)/3)),M=(1.3*(1-p)-.65+v)*k;s[i]=k*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(p-.5)/.5)+.35*Math.max(0,-v));const w=u*g*(1+.3*(C(r*.2,d*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*M;a.setXYZ(i,r*(1+.04*(C(d*.1,u,6)-.5)),d,w)}const c=new Float32Array(a.count);for(let i=0;i<a.count;i++)c[i]=Math.abs(a.getX(i))<12&&a.getY(i)>.3?1:0;return o.setAttribute("aCrest",new F(c,1)),o.setAttribute("aShade",new F(s,1)),o.computeVertexNormals(),o}function pe(t,n,e=()=>0){const o=t.getAttribute("position"),a=new Float32Array(o.count*3),s=new Float32Array(o.count);for(let c=0;c<o.count;c++)a.set(n,c*3),s[c]=e(o.getY(c));return t.setAttribute("color",new F(a,3)),t.setAttribute("aSway",new F(s,1)),t}function HM(t,n){const e=[],o=Gn([.6,.42,.27]),a=r=>10.2-2.2*(1-(2*r/t)**2);for(let r=-t/2;r<t/2;r+=.9)e.push(pe(new B(.8,.22,3).translate(r,-.55,0).toNonIndexed(),o));if(n)for(const r of[-t/2,t/2])e.push(pe(new B(1.2,260,1.2).translate(r,-118,0).toNonIndexed(),o));for(const r of[-1.5,1.5]){e.push(pe(new B(t,.08,.08).translate(0,1.2,r).toNonIndexed(),o));const l=Array.from({length:13},(u,h)=>new L(-t/2+h/12*t,0,r*.3)).map(u=>u.setY(a(u.x)));e.push(pe(new Ar(new Nr(l),24,.07,4).toNonIndexed(),o))}const s=[Gn([.86,.12,.1]),Gn([.98,.72,.12]),Gn([.86,.12,.1]),Gn([.95,.88,.7]),Gn([.2,.55,.3]),Gn([.2,.4,.75])];let c=0;for(let r=-t/2+.6;r<t/2;r+=1.15,c++){const l=a(r)-.05,u=Math.min(l-1.5,5.4+2.2*C(r,2,8)+(c%3===0?1.3:0)),h=new _n(.62,u,2,6),f=h.getAttribute("position");for(let d=0;d<f.count;d++){const g=(u/2-f.getY(d))/u;f.setX(d,f.getX(d)*(1-.15*g)),g>.99&&Math.abs(f.getX(d))<.01&&f.setY(d,f.getY(d)+.5)}h.rotateY((C(r,5,9)-.5)*.9).translate(r,l-u/2,c%2?.25:-.25);const m=s[Math.floor(C(r*1.7,3,10)*s.length*.999)];e.push(pe(h.toNonIndexed(),m,d=>Math.min(1,Math.max(0,(l-d)/u))))}for(let r=-t/2+2.3;r<t/2-1;r+=4.6){const l=a(r)-.75;e.push(pe(new ct(.34,.34,.66,8).translate(r,l,-.6).toNonIndexed(),Gn([.95,.16,.08]),()=>.3)),e.push(pe(new ct(.2,.2,.1,8).translate(r,l+.38,-.6).toNonIndexed(),Gn([.98,.75,.25]),()=>.3))}const i=At(e);return i.computeVertexNormals(),i}const GM=300,BM=Zr();function*FM(t){const n={x:0,y:0,z:0},e=Y(t.z),o=t.open?64:2*ln(t.z)+18,a=new Map,s=m=>{let d=a.get(m);return d===void 0&&a.set(m,d=rt(D(t.z,m,0,n).x,n.z)-e),d},c=o/2-20,i=m=>Math.min(1,Math.abs(m)/c),r=t.open?m=>1+Math.max(0,Math.abs(m)-c)*2.2:m=>Math.abs(m)<10?1:Math.max(1,s(m)+3),l=t.open?m=>Math.abs(m)<c?-16-70*i(m)**6:s(m)-12:m=>s(m)-12,u=ce()==="fansipan",h=u?yield*rf(o,r,l):IM(o,r,l);yield,u&&(yield*nd(h));const f=new X(h,BM).add(xn(h));return f.userData.own=!0,f}function $M(){const t=new Map,n=o=>o.done=Ur(o.run),e=(o,a)=>{t.delete(o),a.done&&a.done.geometry.dispose()};return{take(o,a){let s=t.get(o.id);s&&s.o!==o&&(e(o.id,s),s=void 0),s||t.set(o.id,s={o,run:FM(o)});const c=s.done??(a<GM?n(s):null);return c&&t.delete(o.id),c},pump(o,a){const s=performance.now();for(const[c,i]of t){if(!o.has(c)){e(c,i);continue}for(;!i.done&&performance.now()-s<a;){const r=i.run.next();r.done&&(i.done=r.value)}}}}}const Oo=2.9,OM=-1.25;function DM(t,n,e,o){const a=Oo+n,s=new B(a,1,6.8,Math.max(6,Math.round(a/3)),8,3).translate(a/2-Oo,.5,0),c=s.getAttribute("position"),i=new Float32Array(c.count);for(let r=0;r<c.count;r++){const l=c.getX(r),u=c.getY(r),h=c.getZ(r),f=Math.min(1,Math.max(0,(l+Oo)/Math.max(1,a))),m=9+(e-9)*Math.pow(f,.7)+6*(Ft(l*.08,h*.1+o,3,31)-.5),d=l>Oo?(l-Oo)*.35+.8*C(l*.4,h*.5+o,5):0,g=OM+d,p=g+(m-g)*u,v=1.6*(Ft(l*.09+o,p*.07,3,37)-.5)*Math.min(1,u*6);i[r]=Math.max(0,.6-u*3)*.8,c.setXYZ(r,l*t,p,h*(1+.15*Math.min(1,p/30))+Math.sign(h)*v)}if(s.setAttribute("aShade",new F(i,1)),s.setAttribute("aCrest",new F(new Float32Array(c.count),1)),t<0){const r=s.getIndex();for(let l=0;l<r.count;l+=3){const u=r.getX(l+1);r.setX(l+1,r.getX(l+2)),r.setX(l+2,u)}}return s.computeVertexNormals(),s}const KM=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2];function UM(t,n,e){const o=n-e,a=Math.max(0,o-dd),s=a>2,c=2+a,i=[ne({len:t-1.4,width:6,base:s?"stilts":"plinth",floor:c,top:o-.02,skirt:s,roof:{half:4.1,rise:4.6,thick:.55,color:uo},wall:sn,crest:!0,sink:6,windows:5,firewood:!0},31)],r=c+2.5,l=-3-.45;i.push(H(new ct(.07,.07,t-3,5,1,!0).rotateZ(Math.PI/2).translate(0,r,l),ra,.15,3));for(let h=-t/2+2.2;h<t/2-2;h+=1.05){if(Math.abs(h)<1.1)continue;const f=C(h*.9,1.3,84),m=new ct(.26,.05,1.1+.3*f,5,1).translate(h,r-.6-.15*f,l);i.push(_e(H(m,hd,.2,h),(d,g)=>g>r-.45?.75:1))}for(const h of[-1,1])i.push(md().scale(1.1,1.1,1.1).translate(h*(t/2+1.6),0,-1.6*h));const u=s?c:0;for(let h=-t/2+1.2;h<=t/2-1.1;h+=2.9)for(const f of[-2.7,2.7])i.push(H(new ct(.2,.26,u+42,5,1,!0).translate(h,(u-42)/2,f),zn,.15,h+f));return pt(i).translate(0,e,0)}function lf(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3),c=new Float32Array(a.count);for(let i=0;i<a.count;i++)s.set(n,i*3),c[i]=e(a.getY(i));return o.setAttribute("color",new F(s,3)),o.setAttribute("aSway",new F(c,1)),o}const Ds=gn.map(KM);function wc(t,n,e,o,a,s){for(let c=o,i=0;c<=a+.01;c+=.8,i++){const r=e*(1+.45*C(c*2.3,s,87)),l=new _n(.74,r,2,2),u=l.getAttribute("position");for(let f=0;f<u.count;f++){const m=(r/2-u.getY(f))/r;u.setX(f,u.getX(f)*(1-.6*m)),m>.99&&Math.abs(u.getX(f))<.01&&u.setY(f,u.getY(f)+.3*r)}l.rotateY((C(c,s,85)-.5)*.6).translate(c,n-r/2,i%2?.14:-.14);const h=Ds[Math.floor(C(c*1.7,s,86)*Ds.length*.999)];t.push(lf(l,h,f=>Math.min(1,Math.max(0,(n-f)/r))))}}const Do=(t,n,e)=>H(new ct(n,n*1.08,t,7,1,!0),ra,.2,e);function VM(t){const n=[];for(const a of[-1,1]){for(const[s,c,i]of[[11,.34,12.2],[12,.26,11.4]])n.push(Do(i-t+6,c,s*a).translate(a*s,(i+t-6)/2,0));for(const s of[-1,1])n.push(Do(4.4,.13,s+a).rotateZ(s*.55).translate(a*11.5,12.6,s*.12))}n.push(Do(24.6,.3,1).rotateZ(Math.PI/2).translate(0,-.7,0)),n.push(Do(24.6,.26,2).rotateZ(Math.PI/2).translate(0,-.18,.05));for(const[a,s]of[[2.4,.2],[5.62,.18],[7.62,.18],[10.5,.3]])n.push(Do(24.6,s,a).rotateZ(Math.PI/2).translate(0,a,0));const e=new _n(22.2,2.4,28,3).rotateY(Math.PI).translate(0,1.15,0);n.push(_e(H(e,[.74,.66,.4],.15,5),(a,s)=>(Math.floor(a/.8)+Math.floor(s/.8))%2?1:.76)),n.push(H(new B(22.2,.05,.05).translate(0,10.15,-.05),[.35,.3,.22],.05,6)),n.push(ud({len:25.6,half:1.5,rise:1.25,thick:.34,color:uo},7).translate(0,10.75,0));const o=[];wc(o,5.5,3.05,-10.4,10.4,1),wc(o,7.5,1.85,-10.4,10.4,2),wc(o,9.5,1.85,-10.4,10.4,4);for(let a=-10.6,s=0;a<=10.6;a+=.62,s++){const c=new ht;c.setAttribute("position",new F(new Float32Array([a-.3,10.15,-.08,a+.3,10.15,-.08,a,9.05,-.08]),3)),c.computeVertexNormals(),o.push(lf(c,Ds[s%Ds.length],i=>i<9.5?1:0))}return{frame:pt(n),flags:pt(o)}}const mr=t=>[t[0]**2.2,t[1]**2.2,t[2]**2.2],qM=[.08,.17,.1],WM=[.29,.43,.2],YM=[.33,.23,.16],Ue=-6.5,Ve=22.5,XM=2.4,Zo=3.3;function jM(t,n,e){const o=t.index?t.toNonIndexed():t;o.deleteAttribute("uv");const a=o.getAttribute("position"),s=new Float32Array(a.count*3);for(let c=0;c<a.count;c++){const i=e(a.getY(c));s.set([n[0]*i,n[1]*i,n[2]*i],c*3)}return o.setAttribute("color",new F(s,3)),o}function ZM(t,n,e,o,a){const s=new ct(o*.6,o,Zo,10,1,!0).translate(0,Zo/2,0),c=s.getAttribute("position");for(let f=0;f<c.count;f++){if(c.getY(f)>.01)continue;const m=Math.atan2(c.getZ(f),c.getX(f)),d=C(m*2.2+a,a*.37,91),g=.86+.26*d;c.setXYZ(f,c.getX(f)*g,c.getY(f)-.55*d,c.getZ(f)*g)}s.rotateY(a*1.3).translate(t,n,e);const i=mr(WM),r=mr(qM),l=s.toNonIndexed();l.deleteAttribute("uv"),l.computeVertexNormals();const u=l.getAttribute("position"),h=new Float32Array(u.count*3);for(let f=0;f<u.count;f++){const d=u.getY(f)<n+Zo*.5?i:r,g=.85+.3*C(u.getX(f)*.7+a,u.getZ(f)*.7,92);h.set([d[0]*g,d[1]*g,d[2]*g],f*3)}return l.setAttribute("color",new F(h,3)),l}function JM(t,n,e,o){for(let a=n,s=0;a<t.top-Zo*.6;a+=XM,s++){const c=t.radius(a);if(c<.35)break;const[i,r]=t.off(a);o.push(ZM(i,a,r,c,e+s*.71))}}function QM(t,n,e){const o=Math.max(e+1.6,-40),a=54+6*C(t,2,93),s=(d,g)=>g/(1-.4*Math.min(1,(Ue-d)/Zo)),c=d=>d<Ue?Math.min(5.2,n+1.2+.08*(Ue-d),s(d,n+.3)):d<=Ve?n+.3-.35*((d-Ue)/(Ve-Ue)):(n-.05)*Math.pow(Math.max(0,(a-d)/(a-Ve)),.85),i=t*2.1,r=(d,g)=>({top:g,off:p=>{const v=1.2+.13*Math.max(0,p-Ve);return[Math.cos(d)*v,Math.sin(d)*v]},radius:p=>p<Ue?Math.min(3,s(p,2.2)):p<=Ve?2.2:2.2*Math.pow(Math.max(0,(g-p)/(g-Ve)),.9)}),l=[{top:a,off:()=>[0,0],radius:c},r(i,40+5*C(t,5,94)),r(i+2.4,45+5*C(t,6,95))],u=[];l.forEach((d,g)=>{const[p,v]=d.off(o),k=d.top*.8-(e-3);u.push(jM(new ct(.35,.9,k,6,1,!0).translate(p,e-3+k/2,v),mr(YM),M=>.7+.3*Math.min(1,Math.max(0,(M-e)/30)))),JM(d,o+g*.8,t*3.7+g,u)});const h=At(u),f=h.getAttribute("position"),m=h.getAttribute("color");for(let d=0;d<f.count;d++){const g=.78+.42*Math.min(1,Math.max(0,(f.getY(d)-e)/(a-e)));m.setXYZ(d,m.getX(d)*g,m.getY(d)*g,m.getZ(d)*g)}return h}function tk(t){const n=[];for(const[o,a,s]of[[0,.6,3.4],[2.3,3,2.3],[4.4,2.8,1.9]]){const c=o+t,i=new Hn(s,1).scale(1,.55,.9).rotateY(c).translate(Math.cos(c)*a,s*.12,Math.sin(c)*a);i.deleteAttribute("uv"),n.push(i)}const e=At(n);return e.computeVertexNormals(),e}const On=[[.5,-7.7],[.9,-6.9],[1.5,-5.9],[2.15,-4.7],[2.6,-3.4],[2.75,-2.2],[2.7,-1.1],[2.35,-.15],[1.75,.5],[.95,.86],[0,.95]],Ks=8,ja=.95,nk=3.15,Us=8,Vs=[[gn[0],gn[5]],[gn[3],gn[1]],[gn[4],gn[5]],[gn[2],gn[1]]],hf=[.5,.32,.15],dr=[.24,.19,.14],ek=new L(0,1,0);function fr(t,n,e,o,a){const s=n.clone().sub(t),c=new B(e,s.length(),e).translate(0,s.length()/2,0);return c.applyQuaternion(new xt().setFromUnitVectors(ek,s.normalize())),H(c.translate(t.x,t.y,t.z),o,.1,a)}function ok(t,n){const e=ja-On[0][1]+nk,o=Math.max(.62,Math.min(1,(ja-t-.3)/e)),a=m=>ja+(m-ja)*o,s=(m,d)=>On.slice(m,d+1).map(([g,p])=>new tn(g,a(p))),[c,i]=Vs[n%Vs.length],r=[];for(let m=0;m<Us;m++){const d=Math.PI*2/Us;r.push(H(new ie(s(0,Ks),2,m*d,d),m%2?i:c,.08,m))}r.push(H(new ie(s(Ks,On.length-1),16),xa,.06,9));const l=a(On[0][1]);r.push(H(new ct(.5,.56,.5*o,10,1,!0).translate(0,l-.25*o,0),zn,.1,11));const u=l-.5*o-1.4*o,h=.85*o;for(const[m,d]of[[1,1],[1,-1],[-1,1],[-1,-1]])r.push(fr(new L(m*.36,u,d*.36),new L(m*.42,l-.45*o,d*.42),.07,dr,m+d*3));r.push(H(new B(.95,h,.95).translate(0,u-h/2,0),hf,.2,12)),r.push(H(new B(1.03,.14,1.03).translate(0,u-.05,0),sn,.1,13)),r.push(H(new B(.34,.4*o,.34).translate(0,u+.3*o,0),zn,.1,14));const f=u-h;if(f-t>.6)for(const m of[1,-1])r.push(fr(new L(m*1.4,t-.4,0),new L(m*.3,f,0),.1,dr,20+m));return pt(r)}const Fh=3.5,ak=1.85,$h=1.53,Oh=2,Dh=12;function sk(t){const n=r=>Fh+(r-On[0][1])*ak,e=(r,l)=>On.slice(r,l+1).map(([u,h])=>new tn(u*$h,n(h))),[o,a]=Vs[t%Vs.length],s=[];for(let r=0;r<Us;r++){const l=Math.PI*2/Us;s.push(H(new ie(e(0,Ks),2,r*l,l),r%2?a:o,.08,r))}s.push(H(new ie(e(Ks,On.length-1),16),xa,.06,9));const c=On[Oh][0]*$h,i=n(On[Oh][1]);for(let r=0;r<Dh;r++){const l=r/Dh*Math.PI*2,u=i+1,h=new B(.62,u,.05).translate(0,i-u/2,0).rotateY(-l-Math.PI/2);s.push(H(h.translate(Math.cos(l)*c,0,Math.sin(l)*c),r%2?o:gn[5],.1,30+r))}for(const[r,l]of[[1,1],[1,-1],[-1,1],[-1,-1]])s.push(fr(new L(r*.45,-.1,l*.45),new L(r*.6,Fh,l*.6),.08,dr,r+l*3));return s.push(H(new B(1.15,.9,1.15).translate(0,-.55,0),hf,.2,12)),s.push(H(new B(1.23,.14,1.23).translate(0,-.12,0),sn,.1,13)),pt(s)}const Kh=new Map;function go(t,n){let e=Kh.get(t);return e||Kh.set(t,e=n()),e}const Uh=new Map,eo=t=>new X(t,ii).add(xn(t));function ik(t,n,e){if(t.kind==="ridge")return eo(go(`d${n}`,()=>UM(26,1,n)));if(t.kind==="bridge"){let c=Uh.get(n);return c||Uh.set(n,c=VM(n)),new wt().add(eo(c.frame),new X(c.flags,e))}const a=($.zone(Z(t.z),!0)==="valley"?0:2)+t.id%2,s=eo(go(`h${a}:${n}`,()=>C5(a,1-n)));return s.position.y=n,s.updateMatrix(),new wt().add(s,Vr(7,8,n+.12))}function ck(t){if(t.skin==="basket")return eo(go(`g${t.id%4}`,()=>sk(t.id%4)));if(t.skin!=="balloon")return uf(t);D(t.z,St(t.lane),0,oo);const n=Math.round((rt(oo.x,oo.z)-Y(t.z))*2)/2,e=t.id%4;return eo(go(`k${e}:${n}`,()=>ok(n,e)))}const Za=[],oo={x:0,y:0,z:0};function uf(t){const n=Zr();if(t.kind==="spike"){if(!Za.length)for(const i of[0,1,2]){const r=l0(i*2.3+.7,jt.spike.halfX);Za.push({rock:da(r),trees:Lv(r.seed,r.radius,r.top,5)})}const c=Za[t.id%Za.length];return new wt().add(new X(c.rock,n).add(xn(c.rock)),new X(c.trees,xo))}D(t.z,St(t.lane),0,oo);const e=Math.round(rt(oo.x,oo.z)-Y(t.z)),o=t.id%4,a=go(`p${o}:${e}`,()=>QM(o*1.7+.3,jt.pillar.halfX,e)),s=new X(go(`b${o}`,()=>tk(o*1.9)),n);return s.position.y=e,s.updateMatrix(),new wt().add(eo(a),s)}const Vh=64,xc=170,Ja=5.5;function rk(){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),e=n.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.35,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=e,n.fillRect(0,0,64,64),new fa(t)}function lk(){const t=new wt,n=(g,p)=>{const v=new bt(g,p,Vh);return v.frustumCulled=!1,v.count=0,v.setColorAt(0,new it),t.add(v),v},e=At([new ct(.95,1.05,1.7,14),new ct(1.35,1.2,.24,14).translate(0,.97,0),new B(.34,.34,2.4).translate(0,-.45,1.3)]),o=n(e,new me({color:3421756})),a=n(new Hn(1,2),new Xt({fog:!1})),s=n(new Jf(1,24),new Xt({map:rk(),fog:!1,transparent:!0,depthWrite:!1,blending:rn,side:zt}));s.renderOrder=3;const c=n(new _u(.82,1,28),new Xt({fog:!1,transparent:!0,depthWrite:!1,blending:rn,side:zt}));c.renderOrder=3;const i=new Pt,r=new xt,l=new L,u=new L,h=new L,f=new L(0,0,1),m={x:0,y:0,z:0},d=new it;return{group:t,update(g,p){let v=0,k=1/0;for(const M of g.obstacles){const w=M.z-jt[M.kind].halfZ-.4-g.z;w>=6&&w<=xc&&M.z<k&&(k=M.z)}for(const M of g.obstacles){const w=jt[M.kind],y=M.z-w.halfZ-.4,x=y-g.z;if(x<6||x>xc||M.z>k+8)continue;const b=Math.sin(M.id*12.9898)*43758.5453,A=(b-Math.floor(b))*2-1,z=w.hi<Ja?w.hi-.7:w.lo>-Ja?w.lo+.7:A*2.2,E=Number.isFinite(w.halfX)?[M.lane]:[-1,0,1],T=(1-Math.min(1,Math.max(0,(x-xc+25)/25)))*Math.min(1,Math.max(0,(x-6)/8)),N=p*1.4+M.id*.113,S=.3+.7*Math.min(1,Math.max(0,Math.sin(N*Math.PI*2)*1.6+.6)),P=N-Math.floor(N),I=.45+x*.008;for(const G of E){if(v>=Vh)break;const K=St(G)+(Number.isFinite(w.halfX)&&w.hi>Ja&&w.lo<-Ja?A*.9:0);D(y+1,K,z,m),h.set(m.x,m.y,m.z),D(y,K,z,m),h.sub(l.set(m.x,m.y,m.z)).normalize(),r.setFromUnitVectors(f,h),i.compose(l.set(m.x,m.y,m.z).addScaledVector(h,.35*I),r,u.setScalar(I)),o.setMatrixAt(v,i),o.setColorAt(v,d.setRGB(1,1,1)),i.compose(l.set(m.x,m.y,m.z).addScaledVector(h,-.55*I),r,u.setScalar(I*.78)),a.setMatrixAt(v,i),a.setColorAt(v,d.setRGB(2.2,.06,.04).multiplyScalar(S*T)),i.compose(l,r,u.setScalar(I*3.4)),s.setMatrixAt(v,i),s.setColorAt(v,d.setRGB(.9,.08,.04).multiplyScalar(S*T)),i.compose(l,r,u.setScalar(I*(1.3+3.2*P))),c.setMatrixAt(v,i),c.setColorAt(v,d.setRGB(1.4,.05,.03).multiplyScalar((1-P)**2*T)),v++}}for(const M of[o,a,s,c])M.count=v,M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0)}}}const vs=Zr(),mf=xo,df={value:1},ff={value:0},ka=new me({vertexColors:!0,side:zt});ka.onBeforeCompile=t=>{t.uniforms.uLift=df,t.uniforms.uTime=ff,Object.assign(t.uniforms,ho),t.vertexShader=`attribute float aSway;
uniform float uTime;
${t.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),t.fragmentShader=`uniform float uLift;
${ei}${t.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};ka.customProgramCacheKey=()=>"cloth-hazard";const gf=(t,n)=>({rock:da(t),trees:zM(t,n)}),pf=[0,1,2,3,4,5,6,7].map(t=>gf(CM(t*1.7+.3,jt.pillar.halfX),9)),hk=[0,1,2].map(t=>gf(l0(t*2.3+.7,jt.spike.halfX),4)),vf=new ht;let uk=null;const mk=()=>uk??=PM(jt.pillar.halfX).map(t=>({rock:t,trees:vf}));let dk=null;const fk=()=>dk??=[0,1,2].map(t=>({rock:da(l0(t*2.3+.7,jt.spike.halfX,!0)),trees:vf})),qh=new Map;function yf(t,n){const e=Math.ceil(t/4)*4,o=`${e}:${n}`;let a=qh.get(o);return a||qh.set(o,a=HM(e,n)),a}const Wh=new Map;function Mc(t,n){let e=Wh.get(t);return e||Wh.set(t,e=n()),e}function gk(t,n){const e=Y(t.z),o=t.kind==="ridge"||t.kind==="bridge";D(t.z,o?0:St(t.lane),0,n);const a=Math.round((rt(n.x,n.z)-e)*2)/2;if(re()>.5)return ik(t,a,ka);const s=u=>new X(u,ii).add(xn(u)),c=wo()>.5,i=c?"hg":"";if(t.kind==="ridge")return s(Mc(`${i}d${a}`,()=>bv(26,1,a,c?si:void 0)));if(t.kind==="bridge")return s(Mc(`${i}g${a}`,()=>wv(a,c?d5:void 0)));const r=t.id%3,l=s(Mc(`${i}h${r}:${a}`,()=>cd(r,1-a,c)));return l.position.y=a,l.updateMatrix(),new wt().add(l,Vr(8,9,a+.12))}function pk(){const t=pf[0],n=yf(46,!0),e=cd(0,1,wo()>.5);return[new X(t.rock,vs).add(xn(t.rock)),new X(t.trees,mf),new X(n,ka).add(xn(n)),new X(e,ii).add(xn(e)),Vr(8,9,0)]}function vk(){const t=new wt,n=$.hazardBeacons?lk():null;n&&t.add(n.group);const e=new Map,o=$M(),a={x:0,y:0,z:0},s=i=>{const r=ln(i.z);let l;if(i.skin)l=ck(i);else if(Un(i.z))l=gk(i,a);else if(re()>.5&&(i.kind==="pillar"||i.kind==="spike"))l=uf(i);else if(i.kind==="pillar"||i.kind==="spike"){const u=ce()==="fansipan",h=i.kind==="pillar"?u?mk():pf:u?fk():hk,f=h[i.id%h.length];l=new wt().add(new X(f.rock,vs).add(xn(f.rock))),u||l.add(new X(f.trees,mf))}else if(i.kind==="overhang"){const u=i.lane!==0?-Math.sign(i.lane):i.id%2?1:-1,h=DM(u,Math.max(8,r+18-Math.abs(St(i.lane))),70,i.id%97);l=new X(h,vs).add(xn(h)),l.userData.own=!0}else if(ci(i.z))l=X5();else{const u=yf(i.open?46:2*r+18,i.open);l=new X(u,ka).add(xn(u))}return l},c=(i,r)=>{const l=i.kind==="ridge"||i.kind==="bridge";D(i.z,l?0:St(i.lane),0,a),r.position.set(a.x,a.y,a.z);const u=l||i.kind==="overhang"||i.skin==="balloon"||Un(i.z)&&i.skin!=="boulder";return r.rotation.y=Ct(i.z)+(u?0:i.id*2.39),u||r.scale.set(1+.15*(i.id*.618%1),1,1+.15*(i.id*.382%1)),r.matrixAutoUpdate=!1,r.updateMatrix(),r.traverse(h=>{h.matrixAutoUpdate=!1,h.updateMatrixWorld(),h.userData.hazardHull&&(r.userData.hull=h)}),t.add(r),r};return{group:t,update(i,r,l){ff.value=r,n?.update(i,r);const u=Math.min(1,Math.max(0,(l-.4)/.5));df.value=1-.75*u,vs.uniforms.uLift.value=1-.45*u;const h=new Set;for(const f of i.obstacles){h.add(f.id);let m=e.get(f.id);if(!m){const d=f.kind==="ridge"&&!f.skin&&!Un(f.z)?o.take(f,f.z-i.z):s(f);if(!d)continue;e.set(f.id,m=c(f,d))}h5(m.userData.hull,f.z-i.z)}for(const[f,m]of e)h.has(f)||(t.remove(m),m.userData.own&&m.geometry.dispose(),e.delete(f));o.pump(h,3)}}}function yk(t){const n=new po({map:t,roughness:.8,side:zt}),e={uTime:{value:0},uFlutter:{value:1}};return n.onBeforeCompile=o=>{Object.assign(o.uniforms,e),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},n.userData.setTime=(o,a)=>{e.uTime.value=o,e.uFlutter.value=a},n}const Qa=new po({color:"#a8141c",roughness:.55}),bk=new po({color:"#f6f4ef",roughness:.18,metalness:.05}),wk=new po({color:"#15161c",roughness:.08,metalness:.6}),kc=new po({color:"#1c1d22",roughness:.75});function ts(t,n,e,o){const a=Math.hypot(n[0]-t[0],n[1]-t[1],n[2]-t[2]),s=new X(new Qf(e,a,4,10),o);return s.position.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),s.lookAt(s.position.x+n[0]-t[0],s.position.y+n[1]-t[1],s.position.z+n[2]-t[2]),s.rotateX(Math.PI/2),s}function xk(){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");n.fillStyle="#efe2c8",n.fillRect(0,0,256,256);for(let o=-8;o<16;o++)for(const[a,s]of[[1,1],[1,-1]])n.strokeStyle="rgba(120,80,50,0.28)",n.lineWidth=2,n.beginPath(),n.moveTo(o*32,s>0?0:256),n.lineTo(o*32+256*a,s>0?256:0),n.stroke();n.fillStyle="#2bb5ad",n.fillRect(0,18,256,14),n.fillStyle="#a8141c",n.fillRect(0,0,256,10),n.fillRect(0,226,256,30);const e=new fa(t);return e.colorSpace=Eu,e.anisotropy=4,e}function Yh(t,n,e,o,a,s){const r=[],l=[],u=[];for(let f=0;f<=6;f++){const m=f/6;for(let d=0;d<=10;d++){const g=d/10,p=[0,1,2].map(v=>(1-m)*((1-g)*t[v]+g*n[v])+m*((1-g)*o[v]+g*e[v]));p[2]=p[2]+.12*m*Math.sin(Math.PI*g),p[1]=p[1]+a*Math.sin(Math.PI*g)*Math.sin(Math.PI*m)+.025*Math.abs(Math.sin(Math.PI*g*4)),r.push(...p),l.push(g*2,m)}}for(let f=0;f<6;f++)for(let m=0;m<10;m++){const d=f*11+m;s?u.push(d,d+1,d+10+1,d+1,d+10+2,d+10+1):u.push(d,d+10+1,d+1,d+1,d+10+1,d+10+2)}const h=new ht;return h.setAttribute("position",new F(new Float32Array(r),3)),h.setAttribute("uv",new F(new Float32Array(l),2)),h.setIndex(u),h.computeVertexNormals(),h}function Mk(){const t=new wt,n=new wt;t.add(n);const e=xk(),o=yk(e);n.add(ts([0,0,-.32],[0,.02,.5],.18,Qa));const a=new X(new Je(.15,20,14),bk);a.position.set(0,.07,.78);const s=new X(new Je(.152,20,10,-1.1,2.2,1.35,.6),wk);s.position.copy(a.position),s.rotation.x=-.3,n.add(a,s);const c=new X(new B(.26,.1,.4,2,1,2),kc);c.position.set(0,.19,.1),n.add(c);const i=[],r=[];for(const d of[1,-1]){const g=new wt,p=[.17*d,.05,.44],v=[1.02*d,.07,.3];g.add(ts(p,v,.06,Qa));const k=new X(new Je(.06,8,6),kc);k.position.set(v[0]+.05*d,v[1],v[2]+.02),g.add(k),r.push(k),g.add(new X(Yh(p,v,[.62*d,.02,-.2],[.2*d,0,-.42],.07,d<0),o)),i.push(g),n.add(g)}const l=[.14,0,-.34],u=[-.14,0,-.34],h=[.33,-.03,-1.18],f=[-.33,-.03,-1.18];n.add(ts(l,h,.075,Qa),ts(u,f,.075,Qa)),n.add(new X(Yh([.13,0,-.36],[-.13,0,-.36],f,h,.05,!1),o));const m=[];for(const d of[h,f]){const g=new X(new B(.12,.17,.13),kc);g.position.set(d[0],d[1]-.04,d[2]-.06),n.add(g),m.push(g)}return{root:t,body:n,feet:m,tips:r,ankles:m,animate(d,g,p){for(const v of i)v.scale.x=g;o.userData.setTime?.(d,p)}}}const kk={roll:.62,flip:.9,split:3,spiral:1.5},Xh=$.edge-10,Ko=t=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,t)));function Sk(){const t={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let n=null,e=0,o=1,a=0,s=1,c=!1,i=Number.NaN,r=0;const l=(u,h)=>{n=u,e=0,o=h,c=!0};return{trick(u,h){return n!==null?!1:(l(u,h),!0)},update(u,h){if(t.roll=t.pitch=t.dx=t.dv=t.cam=0,t.spread=null,u.mode!=="run")return n=null,i=Number.NaN,t;const f=Z(u.z);if($.splitS!==!1&&i<Xh&&f>=Xh&&f-i<200?l("split",Mn(u.z)%2===0?1:-1):n===null&&u.thermalT>0&&r<=0&&l("spiral",u.x>=0?-1:1),i=f,r=u.thermalT,n===null)return t;c&&(c=!1,a=u.obstacles.some(p=>p.z>u.z-2&&p.z<u.z+u.speed)?1:3,s=kk[n]*(n==="roll"||n==="flip"?Pn(u.pace,1.2,.85):1)),e+=h;const m=e/s;if(m>=1)return n=null,t;const d=Xu(u.z);if(n==="roll")t.roll=o*2*Math.PI*Ko(m),t.spread=1.06;else if(n==="flip"){const g=2*Math.PI*Ko(m);t.pitch=-g,t.dv=a*.5*(1-Math.cos(g)),t.spread=.82}else if(n==="split")t.roll=o*Math.PI*(Ko(m/.15)+Ko((m-.7)/.22)),t.spread=1.04;else{const g=4*Math.PI*Ko(m),p=Math.sin(Math.PI*m);t.roll=o*g,t.dx=o*p*Math.sin(g),t.dv=p*(1-Math.cos(g))}return(n==="roll"||n==="split")&&(t.cam=o*Math.sin(Math.abs(t.roll)/2)*(.12+.3*d)),t}}}class Sc{x=0;v=0;out={x:0,vel:0};update(n,e,o,a){return a?(this.x=n,this.v=0,n):(aa(this.x,this.v,n,e,o,this.out),this.x=this.out.x,this.v=this.out.vel,this.x)}}function gr(t,n){const e=.6*n,o=Math.abs(t);if(o<=e)return t;const a=n-e;return Math.sign(t)*(e+a*Math.tanh((o-e)/a))}const Tc={camX:(t,n)=>Pn(t,7+6*n,12+8*n),lookX:(t,n)=>Pn(t,10+8*n,18+10*n),move:(t,n)=>Pn(t,11+6*n,18+10*n)},bf=$.pilotRollMax??1.1,Tk=.022*bf/1.1,wf=t=>2.5*(1-Math.exp(-t*6)),Ak=t=>4.5*Math.min(t,1.4)**2,ns={x:0,y:0,z:0};function xf(t){return D(t.z-wf(t.crashT),t.x,t.v,ns),Math.max(0,Math.min(Ak(t.crashT),ns.y-rt(ns.x,ns.z)-.6))}function Nk(){let t=0,n=0,e=0,o=0,a=0,s=0,c=0,i=0,r=0;const l={x:0,vel:0};let u=1;const h=Sk();let f=0;return{lateralSpeed:()=>e,trick:(m,d)=>h.trick(m,d),camRoll:()=>f,apply(m,d,g,p){const{root:v,body:k}=m;if(p>0){const T=1-Math.exp(-p*14);e+=((d.x-t)/p-e)*T,o+=((d.v-n)/p-o)*T}t=d.x,n=d.v;const M=h.update(d,p);if(f=M.cam,D(d.z,d.x+M.dx,d.v+M.dv,v.position),v.rotation.order="YXZ",v.rotation.set(-Math.atan(wn(d.z)),Ct(d.z),0),k.rotation.order="ZXY",d.mode==="crash"||d.mode==="over"){D(d.z-wf(d.crashT),d.x,d.v-xf(d),v.position),k.rotation.set(Math.sin(g*9)*1.6,g*4,g*13),m.animate(g,.7,2.5,0,p);return}const w=1-Math.exp(-p*Pn(d.pace,6.5,12)),y=Pn(d.pace,10,15);aa(a,s,gr(e*Tk+Yu(d.z,d.speed),bf),y,p,l),a=l.x,s=l.vel;const x=-(Math.atan(wn(d.z+18))-Math.atan(wn(d.z)))*.9;c+=(Math.max(-.45,Math.min(.5,-o*.045+x))-c)*w,aa(i,r,gr(e*.004,.2),y,p,l),i=l.x,r=l.vel;const b=M.spread??(d.vert==="dive"?.8:d.vert==="flare"?1.06:1);u+=(b-u)*w;const A=Math.sin(g*23)*.012+Math.sin(g*7.3)*.018,z=(d.stunT/_.stunTime)**2;k.rotation.set(c+M.pitch+A+.3*z*Math.sin(g*9.3+1),i+.28*z*Math.sin(g*6.1),a+M.roll+A*.6+.6*z*Math.sin(g*13));const E=(d.vert==="dive"?1.8:d.thermalT>0?1.4:1)*Pn(d.pace,.85,1.2)+1.6*z;m.animate(g,u-.22*z,E,Math.max(-1,Math.min(1,e/35+Math.sin(g*11)*z)),p)}}}const zk=2.15,Ck=[Math.PI/2,0,0],Ek=[new L(1,0,0),new L(0,1,0),new L(0,0,1)];class ao{static q=new xt;bone;rest;axes;cur=[0,0,0];constructor(n){this.bone=n,this.rest=n.quaternion.clone();const e=n.getWorldQuaternion(new xt).invert();this.axes=Ek.map(o=>o.clone().applyQuaternion(e))}static t=[0,0,0];set(n,e,o,a){const s=ao.t;s[0]=n,s[1]=e,s[2]=o,this.bone.quaternion.copy(this.rest);for(let c=0;c<3;c++)this.cur[c]+=(s[c]-this.cur[c])*a,this.cur[c]&&this.bone.quaternion.multiply(ao.q.setFromAxisAngle(this.axes[c],this.cur[c]))}}function Lk(t){const n=f=>f.getWorldPosition(new L),e=f=>f.children.filter(m=>m.isBone),o=f=>{const m=[f];for(let d=e(f);d.length===1;d=e(d[0]))m.push(d[0]);return m},a=[];t.traverse(f=>{f.isBone&&a.push(f)});const s=a[0];if(!s)return null;const c=e(s).sort((f,m)=>n(m).z-n(f).z);if(c.length<3)return null;const i=o(c[0]),r=i[i.length-1],l=e(r).sort((f,m)=>Math.abs(n(f).x)-Math.abs(n(m).x));if(l.length<3)return null;const u=(f,m)=>({side:Math.sign(n(f).x),j:m(o(f)).map(d=>new ao(d))}),h=c.slice(-2);return{spine:i.map(f=>new ao(f)),neck:o(l[0]).slice(0,2).map(f=>new ao(f)),arms:l.slice(-2).map(f=>u(f,m=>m.length>=4?m.slice(1,4):m.slice(0,3))),legs:h.map(f=>u(f,m=>m.slice(0,3))),toes:h.map(f=>o(f).at(-1)),ankles:h.map(f=>o(f)[2]??o(f).at(-1)),hands:l.slice(-2).map(f=>o(f).at(-1))}}const Mf={value:0};function Pk(t){const n=new po({map:t.map,roughness:.78,metalness:0,side:zt});return n.onBeforeCompile=e=>{e.uniforms.uHurt=Mf,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},n}function _k(t){const n=new Xt({color:new it(.06,.02,.05),side:Tr});return n.onBeforeCompile=e=>{e.uniforms.uPush={value:.011/t},e.vertexShader=`uniform float uPush;
${e.vertexShader}`.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * uPush;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function Rk(t,n=!0,e){return new tg().setMeshoptDecoder(ng).loadAsync("models/pilot.glb").then(async o=>{const a=o.scene,s=[];a.traverse(l=>{const u=l;u.isSkinnedMesh&&(u.material=Pk(u.material),u.frustumCulled=!1,s.push(u))});for(const l of n?s:[]){const u=new eg(l.geometry,_k(l.scale.x));u.bind(l.skeleton,l.bindMatrix),u.frustumCulled=!1,u.position.copy(l.position),u.quaternion.copy(l.quaternion),u.scale.copy(l.scale),l.parent?.add(u)}const c=new wt;c.rotation.set(...Ck),c.scale.setScalar(zk),c.position.set(0,0,.12),c.add(a),c.updateMatrixWorld(!0),await e?.(c).catch(()=>{});const i=Lk(a);for(const l of t.body.children)l.visible=!1;if(t.body.add(c),!i){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}t.feet=i.toes,t.ankles=i.ankles,t.tips=i.hands;let r=0;t.animate=(l,u,h,f,m)=>{const d=1-Math.exp(-m*12),g=Math.min(1,Math.max(0,(1-u)/.2)),p=Math.min(1,Math.max(0,(u-1)/.06));r+=m*7*h;for(const{side:v,j:k}of i.arms){const M=.07+.16*p-.08*g;k.forEach((w,y)=>{const x=Math.sin(r-y*.8+(v>0?.4:0))*(.025+.02*y),b=y===0?.5*g-.12*p:y===1?.18*g:.08*g;w.set(0,v*b,v*((y===0?M:0)+x),d)})}for(const{side:v,j:k}of i.legs){const[M,w,y]=k;M?.set(-.05*p,-v*(.06+.08*p-.14*g)+.07*f,0,d),w?.set(-(.08+.3*p+Math.sin(r*.5+v)*.03),0,0,d),y?.set(1.15,0,0,d)}i.spine.forEach((v,k)=>v.set(Math.sin(l*1.7+k)*.015-.06*p,.07*f,0,d)),i.neck.forEach((v,k)=>v.set(k===0?-(.3+.1*g):-.22,k===0?.05*f:0,0,d))}}).catch(o=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",o))}const Jn=18,jh=.075,Ik=.035;function Hk(){const t=new Float32Array(2*Jn*2*3),n=new Float32Array(2*Jn*2*4),e=new Uint16Array(2*(Jn-1)*6);for(let u=0,h=0;u<2;u++)for(let f=0;f<Jn-1;f++){const m=(u*Jn+f)*2;e.set([m,m+1,m+2,m+1,m+3,m+2],h),h+=6}const o=new ht;o.setAttribute("position",new F(t,3)),o.setAttribute("color",new F(n,4)),o.setIndex(new F(e,1));const a=new X(o,new Xt({vertexColors:!0,transparent:!0,blending:rn,depthWrite:!1,fog:!1}));a.frustumCulled=!1,a.renderOrder=5;const s=[[],[]],c=[],i=new L,r=new L,l=new L;return{mesh:a,update(u,h,f,m,d){for(let g=0;g<2;g++){const p=s[g],v=u[g];if(f&&v){const M=(p.length>=Jn?p.pop():c.pop())??{p:new L,t:0};v.getWorldPosition(M.p),M.t=h,p.unshift(M)}for(;p.length&&h-p[p.length-1].t>jh;)c.push(p.pop());const k=p.length;for(let M=0;M<Jn;M++){const w=(g*Jn+M)*2;if(M>=k||k<2){w>=2&&t.copyWithin(w*3,(w-2)*3,w*3),n.fill(0,w*4,w*4+8);continue}const y=p[M],x=Math.min(1,(h-y.t)/jh);M+1<k?i.subVectors(y.p,p[M+1].p):i.subVectors(p[M-1].p,y.p),l.subVectors(d,y.p),r.crossVectors(i,l).normalize().multiplyScalar(Ik*(1-.85*x));const b=w*3;t[b]=y.p.x+r.x,t[b+1]=y.p.y+r.y,t[b+2]=y.p.z+r.z,t[b+3]=y.p.x-r.x,t[b+4]=y.p.y-r.y,t[b+5]=y.p.z-r.z;const A=(1-x)**2*Math.min(1,x*8+.35)*(.22+.3*m),z=w*4;n[z]=n[z+4]=1,n[z+1]=n[z+5]=.95,n[z+2]=n[z+6]=.86,n[z+3]=n[z+7]=A}}o.attributes.position.needsUpdate=!0,o.attributes.color.needsUpdate=!0}}}const kf=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Gk={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new tn(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0},uVeil:{value:0},uVeilNight:{value:0}},vertexShader:kf,fragmentShader:`
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
}`},Bk={uniforms:{tDiffuse:{value:null},uTexel:{value:new tn(1/1280,1/720)}},vertexShader:kf,fragmentShader:`
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
}`},Zh=.35;function Fk(t,n,e,o,a){t.toneMapping=b0,t.toneMappingExposure=1;const s=new og(t);s.addPass(new w0(n,e));const c=new ag(new tn(256,256),Zh,.5,1.4);s.addPass(c);const i=new x0(Gk);s.addPass(i);const r=new sg;s.addPass(r);let l=!1;const u=(p,v)=>{l=v,c.enabled=p.bloom&&!v,r.enabled=c.enabled,i.material.defines.SHAFT_N=v?Math.min(p.shafts,8):p.shafts,i.material.defines.SPEED_BLUR=p.speedBlur&&!v?1:0,i.material.needsUpdate=!0};u(a,!1);const h=new x0(Bk);h.enabled=!1,s.addPass(h);const f=new L(o.x,o.y,o.z);let m=1;const d=new L,g=new L;return{render(){e.getWorldDirection(g),d.copy(f).multiplyScalar(1e4).add(e.position).project(e);const p=g.dot(f);i.uniforms.uSun.value.set(d.x*.5+.5,d.y*.5+.5);const v=Math.max(0,Math.min(1,(p-.2)/.4)),k=1-(1-($.sunGlare??1))*v;i.uniforms.uSunVisible.value=m*v*k,c.strength=Zh*k,s.render()},setSize(p,v){s.setSize(p,v),c.resolution.set(p/2,v/2),i.uniforms.uAspect.value=p/v;const k=t.getPixelRatio();h.uniforms.uTexel.value.set(1/(p*k),1/(v*k))},setPixelRatio(p){s.setPixelRatio(p)},setLite(){return l||!a.bloom&&a.shafts<=8&&!a.speedBlur?!1:(u(a,!0),!0)},togglePainterly(){return h.enabled=!h.enabled,h.enabled},painterly:()=>h.enabled,warmPlan(){r.enabled&&(r.material.defines={...ig.getTransfer(t.outputColorSpace)===cg?{SRGB_TRANSFER:""}:{},...t.toneMapping===b0?{ACES_FILMIC_TONE_MAPPING:""}:{}},r.material.needsUpdate=!0);const p=[];return s.passes.forEach((v,k)=>{if(!v.enabled||v instanceof w0)return;const M=s.renderToScreen&&s.isLastEnabledPass(k);for(const w of Object.values(v))for(const y of Array.isArray(w)?w:[w])y?.isMaterial&&p.push({material:y,toScreen:M})}),{sceneTarget:s.readBuffer,quads:p}},setSpeed(p,v=0){const k=$.speedBlur??1;i.uniforms.uSpeed.value=p*(k+(1-k)*v)},setDanger(p){i.uniforms.uDanger.value=p},setVeil(p,v){i.uniforms.uVeil.value=p,i.uniforms.uVeilNight.value=v},setSun(p,v){f.set(p.x,p.y,p.z),m=v}}}function $k(t,n){const e=new rg({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,n)),e.setSize(t.clientWidth,t.clientHeight),e.info.autoReset=!1,t.appendChild(e.domElement);const o=new lg,a=new hg(60,t.clientWidth/t.clientHeight,.5,7e4),s=new ug(16777215,2.4),c=new mg(16777215,16777215,1.3);return o.add(s,s.target,c),{renderer:e,scene:o,camera:a,sun:s,hemi:c}}const Ok=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function Dk(t){return`
uniform float uDusk;
uniform float uMorn;
${Bd(t,"uDusk","uMorn")}
${de}
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
}`}function Kk(t){const n=new Tt({vertexShader:Ok,fragmentShader:Dk(t),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:Tr,depthWrite:!1,depthTest:!1,fog:!1}),e=new X(new Je(1e3,48,24),n);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(o,a,s,c){e.position.copy(o.position),n.uniforms.uTime.value=a,n.uniforms.uDusk.value=s,n.uniforms.uMorn.value=c}}}function Uk(){return new Tt({vertexShader:`
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
}`,transparent:!0,blending:rn,depthWrite:!1})}function Vk(){return new Tt({vertexShader:`
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
}`,transparent:!0,blending:rn,depthWrite:!1})}const pr=12,Jh=new it(.62,.44,.17),qk=new it(.72,.6,.34);function Ac(t,n){const e=new bt(t,n,pr);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new it(0,0,0)),e}function Wk(){const t=Ac(new _u(.82,1,40),new Xt({transparent:!0,blending:rn,depthWrite:!1,fog:!1,side:zt})),n=Ac(new _n(2,2),Vk()),e=Ac(new Hn(1,4),Uk()),o={ring:t,flare:n,shell:e},a=[],s=new Pt,c=new xt,i=new L,r=new L,l=new it,u=new L(0,0,1),h=f=>{a.length>=pr*3&&a.shift(),a.push(f)};return{mesh:t,star:n,shell:e,spawn(f,m,d){h({part:"ring",x:f,y:m,z:d,t:0,dur:.32,r0:.6,r1:2.8,color:Jh}),h({part:"shell",x:f,y:m,z:d,t:0,dur:.32,r0:1.5,r1:3.4,color:Jh}),h({part:"flare",x:f,y:m,z:d,t:0,dur:.36,r0:.5,r1:2.2,color:qk})},update(f,m){const d={ring:0,flare:0,shell:0};for(let g=a.length-1;g>=0;g--){const p=a[g];if(p.t+=f,p.t>=p.dur||d[p.part]>=pr){a.splice(g,1);continue}p.x+=m.x*f,p.y+=m.y*f,p.z+=m.z*f;const v=p.t/p.dur,k=p.r0+(p.r1-p.r0)*(1-(1-v)*(1-v)),M=(1-v)*(1-v)*1.1,w=p.part==="flare"?c.setFromAxisAngle(u,v*2.2):c.identity();s.compose(i.set(p.x,p.y,p.z),w,r.set(k,k,k));const y=o[p.part];y.setMatrixAt(d[p.part],s),y.setColorAt(d[p.part]++,l.copy(p.color).multiplyScalar(M))}for(const g of["ring","flare","shell"]){const p=o[g];p.count=d[g],p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0)}}}}const Qh=4,tu=36,Yk={rock:[new it(.42,.33,.36),new it(.3,.24,.28),new it(.24,.3,.16)],cloth:[new it(.8,.1,.08),new it(.95,.66,.1),new it(.5,.33,.2)],village:[new it(.62,.22,.12),new it(.55,.3,.2),new it(.85,.7,.35)]},Xk=()=>new Tt({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function jk(){const t=new bt(new _n(2,2),Xk(),Qh),n=new bt(new Hn(1,0),new me,tu);for(const u of[t,n])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new it);t.renderOrder=8;const e=[],o=[];let a=0;const s=new Pt,c=new xt,i=new L,r=new L,l=new it;return{stars:t,chips:n,danger:()=>a,spawn(u,h,f,m,d){e.length>=Qh&&e.shift(),e.push({x:u,y:h,z:f,t:0,dur:d?.42:.3,r0:d?1.4:.9,r1:d?5.2:3.2,seed:Math.random(),follow:!d});const g=d?22:10;for(let p=0;p<g;p++){o.length>=tu&&o.shift();const v=Math.random()*Math.PI*2,k=(d?7:5)+Math.random()*7,M=Yk[m];o.push({x:u,y:h,z:f,t:0,life:.9+Math.random()*.6,size:(d?.22:.16)+Math.random()*(d?.38:.22),vx:Math.cos(v)*k,vy:Math.sin(v)*k*.8+4,vz:-(3+Math.random()*8),spin:new L(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:M[p%M.length]})}a=Math.max(a,d?1:.75)},update(u,h){a=Math.max(0,a-u*1.4);let f=0;for(let m=e.length-1;m>=0;m--){const d=e[m];d.t+=u;const g=d.t/d.dur;if(g>=1){e.splice(m,1);continue}d.follow&&(d.x+=h.x*u,d.y+=h.y*u,d.z+=h.z*u);const p=d.r0+(d.r1-d.r0)*(1-(1-g)**3);s.compose(i.set(d.x,d.y,d.z),c.identity(),r.set(p,p,p)),t.setMatrixAt(f,s),t.setColorAt(f++,l.setRGB(Math.min(1,(1-g)*1.6),d.seed,g))}t.count=f,f=0;for(let m=o.length-1;m>=0;m--){const d=o[m];if(d.t+=u,d.t>=d.life){o.splice(m,1);continue}d.vy-=16*u,d.x+=d.vx*u,d.y+=d.vy*u,d.z+=d.vz*u;const g=d.size*Math.min(1,(d.life-d.t)/.25);c.setFromAxisAngle(d.spin,d.t*9),s.compose(i.set(d.x,d.y,d.z),c,r.set(g,g*.7,g*1.2)),n.setMatrixAt(f,s),n.setColorAt(f++,d.color)}n.count=f;for(const m of[t,n])m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0)}}}const dn=90,Zk=1.4,Jk=`
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
}`,Qk=`
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
}`;function t4(){const t=[0,1].map(()=>({p:Array.from({length:dn},()=>new L),age:new Float32Array(dn).fill(1)})),n=2*dn*2,e=new Float32Array(n*3),o=new Float32Array(n).fill(1),a=new Float32Array(n),s=[];for(let f=0;f<2;f++)for(let m=0;m<dn;m++){const d=(f*dn+m)*2;a[d]=-1,a[d+1]=1,m<dn-1&&s.push(d,d+1,d+2,d+1,d+3,d+2)}const c=new ht;c.setAttribute("position",new F(e,3)),c.setAttribute("aAge",new F(o,1)),c.setAttribute("aSide",new F(a,1)),c.setIndex(s);const i=new Tt({vertexShader:Jk,fragmentShader:Qk,uniforms:Rn.merge([In.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:zt,fog:!0}),r=new X(c,i);r.frustumCulled=!1,r.renderOrder=3;const l=new L,u=new L,h=new L;return{points:r,update(f,m,d,g){t.forEach((p,v)=>{for(let k=0;k<dn;k++)p.age[k]=Math.min(1,p.age[k]+m/Zk);if(d&&m>0){const k=p.p.pop();p.p.unshift(k.copy(f[v])),p.age.copyWithin(1,0,dn-1),p.age[0]=0}for(let k=0;k<dn;k++){const M=p.p[k],w=p.p[Math.min(dn-1,k+1)];l.subVectors(M,w),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(g,M),h.crossVectors(l,u).normalize();const y=.06+.5*p.age[k],x=(v*dn+k)*2;e.set([M.x-h.x*y,M.y-h.y*y,M.z-h.z*y],x*3),e.set([M.x+h.x*y,M.y+h.y*y,M.z+h.z*y],(x+1)*3),o[x]=o[x+1]=p.age[k]}}),c.getAttribute("position").needsUpdate=!0,c.getAttribute("aAge").needsUpdate=!0}}}const ve=120,n4=40,e4=120,o4=9,a4=30,Nc=.11;function s4(){const t=new Float32Array(ve*3),n=new Float32Array(ve*6),e=new ht;e.setAttribute("position",new F(n,3));const o=new Float32Array(ve*6);for(let f=0;f<ve;f++)o.set([1,1,1,0,0,0],f*6);e.setAttribute("color",new F(o,3));const a=new Tu({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:rn,depthWrite:!1,fog:!1}),s=new Au(e,a);s.frustumCulled=!1,s.renderOrder=5;let c=!1;const i=new L,r=new L,l=new L,u=new L,h=(f,m,d)=>{const g=n4+Math.random()*e4*d,p=o4+(1-Math.random()**2)*a4,v=Math.random()*Math.PI*2;u.copy(m).addScaledVector(i,g).addScaledVector(r,Math.cos(v)*p).addScaledVector(l,Math.sin(v)*p),t[f*3]=u.x,t[f*3+1]=u.y,t[f*3+2]=u.z};return{object:s,update(f,m,d){if(a.opacity=Math.min(.5,.42*d),s.visible=d>.02,e.setDrawRange(0,2*Math.round(ve*Math.min(1,d))),!s.visible)return;const g=m.length();if(g<1)return;i.copy(m).divideScalar(g),r.set(i.z,0,-i.x).normalize(),l.crossVectors(r,i);const p=f.position;if(!c){for(let v=0;v<ve;v++)h(v,p,1);c=!0}for(let v=0;v<ve;v++){u.set(t[v*3]-p.x,t[v*3+1]-p.y,t[v*3+2]-p.z),(u.dot(i)<-4||u.lengthSq()>36100)&&h(v,p,1);const M=v*6,w=t[v*3],y=t[v*3+1],x=t[v*3+2];n[M]=w,n[M+1]=y,n[M+2]=x,n[M+3]=w-m.x*Nc,n[M+4]=y-m.y*Nc,n[M+5]=x-m.z*Nc}e.attributes.position.needsUpdate=!0}}}const es=256,nu=5,i4=-2e3,c4=400;function r4(t,n,e){let o=0;for(const[a,s]of[[1,41],[1.37,43]]){const c=Math.max(12,Math.round(2*Math.PI*e/((1800+700*n)*a))),i=t/(2*Math.PI)*c,r=Math.floor(i),l=.5+.3*(C(r,n,s)-.5),u=Math.max(0,1-Math.abs(i-r-l)*2.2),h=(220+140*n)*(.45+.55*C(r,n,s+1));o=Math.max(o,h*u*u*(3-2*u))}return o}const l4=`
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
}`,h4=`
#include <fog_pars_fragment>
uniform float uFar;
${Ir}
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
}`;class u4{rings=[];next=0;heightAt;constructor(n,e,o){this.heightAt=e;for(let a=0;a<o.length-1;a++){const s=a/(o.length-2),c=new Tt({vertexShader:l4,fragmentShader:h4,uniforms:Rn.merge([In.fog,{uFar:{value:.25+.6*s}}]),fog:!0});c.uniforms.uRegionHg=bo;const i=new X(new ht().setAttribute("position",new F(new Float32Array(3),3)),c);i.frustumCulled=!1,n.add(i),this.rings.push({inner:o[a],outer:o[a+1],mesh:i,anchorX:NaN,anchorZ:NaN})}}job=null;update(n,e,o=!1,a=3){const s=performance.now();for(;;){if(!this.job){const i=this.stale(n,e);if(!i)return;const r=(es+1)*2;this.job={ring:i,idx:this.rings.indexOf(i),ax:n,az:e,pos:new Float32Array(r*3),top:new Float32Array(r),s:0}}const c=this.job;for(;c.s<=es;)if(this.segment(c),!o&&performance.now()-s>a)return;this.commit(c),this.job=null}}pending(n,e){return this.rings.filter(o=>o===this.job?.ring||this.needs(o,n,e)).length}needs(n,e,o){return Number.isNaN(n.anchorX)||Math.hypot(e-n.anchorX,o-n.anchorZ)>c4}stale(n,e){if(!Number.isFinite(n+e))return null;for(let o=0;o<this.rings.length;o++){const a=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,this.needs(a,n,e))return a}return null}segment(n){const{ring:e,s:o}=n,a=o/es*Math.PI*2,s=Math.sin(a),c=Math.cos(a);let i=-1/0;for(let l=0;l<nu;l++){const u=e.inner+(e.outer-e.inner)*l/nu;i=Math.max(i,this.heightAt(n.ax+s*u,n.az+c*u))}wo()>.5&&(i+=r4(a,n.idx,e.inner));const r=e.inner;n.pos.set([s*r,i,c*r,s*r,i4,c*r],o*6),n.top[o*2]=i,n.top[o*2+1]=i,n.s++}commit(n){const e=[];for(let a=0;a<es;a++){const s=a*2;e.push(s,s+2,s+1,s+2,s+3,s+1)}const o=new ht;o.setAttribute("position",new F(n.pos,3)),o.setAttribute("aTop",new F(n.top,1)),o.setIndex(e),n.ring.mesh.geometry.dispose(),n.ring.mesh.geometry=o,n.ring.mesh.position.set(n.ax,0,n.az),n.ring.anchorX=n.ax,n.ring.anchorZ=n.az}}const qe={h:0,s:0,lat:0,vil:0,mist:0};function Sf(t,n,e,o,a){const s=o/a,c=a+3,i=new Float32Array(c*c),r=new Float32Array(c*c*3),l=new Float32Array(c*c);for(let b=0;b<c;b++)for(let A=0;A<c;A++)t(n+(A-1)*s,e+(b-1)*s,qe),i[b*c+A]=qe.h,r.set([qe.s,qe.lat,qe.vil],(b*c+A)*3),l[b*c+A]=qe.mist;const u=(b,A)=>i[(A+1)*c+(b+1)],h=a+1,f=a*4,m=h*h+f,d=new Float32Array(m*3),g=new Float32Array(m*3),p=new Float32Array(m*3),v=new Float32Array(m),k=(b,A,z,E)=>{p.set(r.subarray(((z+1)*c+(A+1))*3,((z+1)*c+(A+2))*3),b*3),v[b]=l[(z+1)*c+(A+1)];const T=(u(A+1,z)-u(A-1,z))/(2*s),N=(u(A,z+1)-u(A,z-1))/(2*s),S=1/Math.hypot(T,1,N);d[b*3]=A*s,d[b*3+1]=u(A,z)-E,d[b*3+2]=z*s,g[b*3]=-T*S,g[b*3+1]=S,g[b*3+2]=-N*S};for(let b=0;b<h;b++)for(let A=0;A<h;A++)k(b*h+A,A,b,0);const M=[];for(let b=0;b<a;b++)M.push(b);for(let b=0;b<a;b++)M.push(b*h+a);for(let b=a;b>0;b--)M.push(a*h+b);for(let b=a;b>0;b--)M.push(b*h);const w=s*3+25;M.forEach((b,A)=>k(h*h+A,b%h,Math.floor(b/h),w));const y=[];for(let b=0;b<a;b++)for(let A=0;A<a;A++){const z=b*h+A;y.push(z,z+h,z+1,z+1,z+h,z+h+1)}for(let b=0;b<f;b++){const A=M[b],z=M[(b+1)%f],E=h*h+b,T=h*h+(b+1)%f;y.push(A,z,E,z,T,E)}const x=new ht;return x.setAttribute("position",new F(d,3)),x.setAttribute("normal",new F(g,3)),x.setAttribute("aTrack",new F(p,3)),x.setAttribute("aMist",new F(v,1)),x.setIndex(m>65535?new F(new Uint32Array(y),1):new F(new Uint16Array(y),1)),x.computeBoundingSphere(),x}class m4{cache=new Map;shown=new Set;home=null;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(n,e,o,a){this.scene=n,this.sample=e,this.material=o,this.cfg=a}update(n,e,o=!1,a=this.cfg.buildBudgetMs){this.computeWanted(n,e),this.home??=new Set(this.wanted.map(c=>c.key));const s=performance.now();for(const c of this.wanted)if(!this.cache.has(c.key)){if(!o&&performance.now()-s>a)return;this.cache.set(c.key,this.build(c))}this.shown.size===this.wanted.length&&this.wanted.every(c=>this.shown.has(c.key))||this.swap()}stats(){let n=0;for(const a of this.shown)n+=this.cache.get(a)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(a=>!this.cache.has(a.key)).length,o=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,wanted:this.wanted.length,vertices:n,reach:o}}computeWanted(n,e){const o=[];for(let s=0;s<this.cfg.levels;s++){const c=this.cfg.baseSize*2**s,i=Math.floor(n/(2*c)),r=Math.floor(e/(2*c)),l=Math.floor(n/c),u=Math.floor(e/c);for(let h=2*r-2;h<=2*r+3;h++)for(let f=2*i-2;f<=2*i+3;f++)s>0&&Math.abs(f-l)<=1&&Math.abs(h-u)<=1||o.push({key:`${s}:${f}:${h}`,level:s,ix:f,iz:h})}const a=o.map(s=>s.key).join("|");a!==this.wantedSig&&(this.wantedSig=a,this.wanted=o)}build(n){const e=this.cfg.baseSize*2**n.level,o=n.ix*e,a=n.iz*e,s=n.level>=2?this.cfg.farSegs:this.cfg.segs,c=new X(Sf(this.sample,o,a,e,s),this.material);return c.position.set(o,0,a),c.matrixAutoUpdate=!1,c.updateMatrix(),c}swap(){const n=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)n.has(e)||this.scene.remove(this.cache.get(e));for(const e of n)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,o]of this.cache)!n.has(e)&&!this.home?.has(e)&&(o.geometry.dispose(),this.cache.delete(e));this.shown=n}}const d4=`
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
`,f4=`
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
vec3 mcRice(vec2 xz, float id, vec2 cell, float vary, float zone) {
  float h = fract(sin(id * 12.9898 + cell.x * 4.1 + cell.y * 7.7) * 43758.5453);
  float k = fract(h * 7.31);
  vec3 c = mix(srgb(MC_GOLD), srgb(MC_GOLD_LIGHT), k * 0.7);
  c = mix(c, srgb(MC_AMBER), step(0.8, h) * step(h, 0.9) * 0.75);
  // Lúa non 7% và chỉ ngả 75%: bậc thô 18 m sát cánh tô xanh lá đặc thành mảng kẹo chanh (vòng 3, mcc-r3-02).
  c = mix(c, srgb(MC_GREEN_GOLD), step(0.07, h) * step(h, 0.17) * 0.85);
  c = mix(c, srgb(MC_GREEN), step(h, 0.07) * 0.75);
  c = mix(c, srgb(MC_STUBBLE), step(0.95, h));
  c = mix(mix(srgb(MC_GOLD), srgb(MC_GOLD_LIGHT), 0.3), c * (0.92 + 0.16 * k), vary);
  return mix(c, srgb(MC_GREEN_GOLD), smoothstep(0.5, 0.72, gnNoise(xz / 420.0)) * zone) * (0.9 + 0.2 * gnNoise(xz / 70.0));
}

// Sườn bậc thang: bậc 4,5 m ở gần, bậc "xa" 18 m hiện dần khi bậc gần đã mịn hơn điểm ảnh — đồi xa vẫn còn vân bậc vàng
// xếp tầng (chữ ký của Mù Cang Chải trong mọi ảnh), không thành mảng vàng trơn. fwF / fwC = fwidth(tcF / tcC) từ main.
vec3 mcSlope(vec2 xz, float tcF, float tcC, float fwF, float fwC, float nearT, vec3 cell, float fwE) {
  float vary = 0.35 + 0.65 * nearT;
  vec3 rice = mcRice(xz, floor(tcF), cell.xy, vary, 0.85);
  // Hàng lúa chạy theo đường đồng mức trên mặt bậc + khóm lổn nhổn — chỉ ở gần (bay sát 10 m).
  float rows = abs(fract(tcF * 6.0) - 0.5) * 2.0;
  rice *= 1.0 - 0.16 * nearT * (1.0 - smoothstep(0.3, 0.8, fwF * 6.0)) * smoothstep(0.3, 0.7, rows);
  rice *= 1.0 + 0.2 * nearT * (gnNoise(xz / 1.3) - 0.5) + 0.15 * nearT * mcGust(xz);
  vec3 fine = mcBands(tcF, fwF, rice);
  // Bờ chia thửa (ranh ô) — vạch ô liu mảnh, chỉ ở gần. 0,25 (bản 0,55): ô lệch theo bậc (mcTerraces) mà vạch đậm thì sườn sát
  // cánh thành MẠCH GẠCH (mc4g 04/11) — ranh thửa đọc bằng đổi sắc giữa hai thửa là đủ.
  fine = mix(fine, srgb(MC_RISER) * 0.8, (1.0 - smoothstep(0.3, 0.3 + max(0.2, fwE * 1.5), cell.z)) * nearT * 0.25);
  vec3 coarse = mcBands(tcC, fwC, mcRice(xz, floor(tcC * 4.0), cell.xy, vary, 0.85));
  return mix(fine, coarse, smoothstep(0.25, 0.7, fwF));
}

// Bậc thang phủ KÍN sườn thoải–vừa (concept 4), rừng chỉ còn ở mảng nhiễu thấp + sườn dốc — thay paddyTerraces của Khau
// Phạ (terrain-paddy-glsl.ts) chứ không chồng lên: hai bộ không tốn phép nhiễu của nhau.
vec3 mcTerraces(vec3 albedo, vec2 xz, float y, float slope, float patchN, float dist) {
  // Đất GẦN PHẲNG (đỉnh vòm La Pán Tẩn trước mép B1, đáy thung) vẽ bậc theo "độ cao giả" như cao nguyên làng (mcPlateauU):
  // đường đồng mức thật của vòm tròn là các VÒNG đồng tâm 4,5 m ("sân golf" — giám khảo v9 b2-02 / de-02), còn mặt phẳng hẳn
  // (dốc < 0,015) bản cũ không có bậc nào → tấm xanh trơn, mép thẳng, giáp dải vàng của cao nguyên làng (app-02, anh Đức 04/11
  // "mặt đỉnh vòm phẳng ở mép → làm luôn"). Gò giả 36 m / 150 m + 10 m / 47 m bẻ vòng thành thửa uốn lượn, tắt dần tới dốc 0,12.
  float yT = y + (1.0 - smoothstep(0.03, 0.12, slope)) * (36.0 * gnNoise(xz / 150.0) + 10.0 * gnNoise(xz / 47.0));
  float tcF = yT / 4.5 + gnNoise(xz / 45.0) * 0.8;
  float tcC = yT / 18.0 + gnNoise(xz / 160.0) * 0.5;
  // Ruộng tới dốc 0,8 (1 − n.y, ≈ 78°): v2 "đồi nối đồi" có sườn đồi xuất phát / Mâm Xôi dốc 60–70° cạnh cú băng thung (đồi cao
  // 110 m trên bậc, đáy thung 230 m dưới, trong ~225 m) — cắt ở 0,64 thì sườn đó thành mảng rừng tối giữa đồi vàng. Mảng
  // rừng theo nhiễu cũng thu nhỏ (ngưỡng 0,24 → 0,17): mảng 300 m thẫm hình lá giữa đồi ruộng vàng đọc như vết bẩn (chụp
  // 04/11 z 530–670); cây xanh đã có cụm cây cảnh (village-scenery-mu-cang-chai.ts).
  float tMask = (1.0 - smoothstep(0.62, 0.8, slope)) * (1.0 - smoothstep(1250.0, 1450.0, y)) * smoothstep(0.17, 0.24, patchN);
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
  // Thửa như sườn (mcRice): số bậc × ô (bỏ phần nhiễu sáng 70 m của mcRice — dòng dưới có nhiễu riêng). Mặt đỉnh vòm trước
  // mép B1 (anh Đức 04/11 "mặt đỉnh vòm phẳng ở mép → làm luôn", mc10): ô 46 m chung mọi bậc nhìn từ 12 m trên nền là mảng
  // cam / ô liu to cắt NGANG cả chục bậc, mép thẳng = "đường nối vàng / xanh". Nay ô ~27 m lệch theo từng bậc (như mcTerraces)
  // + bờ chia thửa mảnh → vòng bậc quanh gò đọc ra ruộng Mâm Xôi chia thửa, không phải vòng "sân golf" một màu; mảng xanh vàng
  // 420 m chỉ ngả 40% (85% của sườn phủ cả nền gần thành tấm ô liu).
  float bid = floor(u);
  vec3 cell = mcPlotCell(xz * 1.7 + 46.0 * vec2(fract(bid * 0.618), fract(bid * 0.382)));
  vec3 rice = mcRice(xz, bid, cell.xy, 0.4 + 0.6 * near, 0.4) / (0.9 + 0.2 * gnNoise(xz / 70.0));
  // Gió lướt trên lúa + hàng lúa theo bậc (như cao nguyên Khau Phạ, đổi hướng hàng theo bậc).
  rice *= 0.86 + 0.24 * gnNoise(vec2(lat / 9.0, ts / 3.0)) + 0.12 * (gnNoise(xz / 0.9) - 0.5) * near
        + 0.24 * (1.0 - smoothstep(150.0, 600.0, dist)) * mcGust(xz);
  rice *= 1.0 - 0.14 * (1.0 - smoothstep(0.3, 0.8, fwU * 7.0)) * smoothstep(0.35, 0.65, abs(fract(u * 7.0) - 0.5) * 2.0);
  vec3 c = mcBands(u, fwU, rice);
  // Bờ chia thửa: nhánh vil không có fwidth (BẪY đạo hàm ở đầu file) → khử răng theo khoảng cách, tắt ngoài ~300 m.
  float bund = 1.0 - smoothstep(0.35, 0.7 + dist * 0.03, cell.z);
  c = mix(c, srgb(MC_RISER) * 0.8, bund * 0.18 * (1.0 - smoothstep(150.0, 300.0, dist)));
  // Bờ ngang chia thửa dọc đường (cong theo nhiễu), mảnh và tắt từ 400 m.
  float v = fract(ts / 55.0 + 0.6 * gnNoise(xz / 90.0));
  float cross = (1.0 - smoothstep(0.0, max(0.03, fwV * 1.5), min(v, 1.0 - v))) * (1.0 - smoothstep(90.0, 400.0, dist));
  // KHÔNG có lối đất giữa làn (Khau Phạ có): nền bậc ngay dưới người bay, camera đuổi cao ~12 m trên nền nên lối 4 m thành
  // NÊM BE chĩa từ đáy khung tới người bay (điện thoại: 40% đáy khung) — vòng 1 v2 "blurry brown smear", vòng 2 hai giám
  // khảo "dirty glass", "chevron". Mắt bám làn đã có bờ ngang 55 m + hàng chướng ngại.
  return c;
}
`,g4=`
uniform float uMistY;
vec3 mcValleyMist(vec3 col, vec3 mistCol, vec2 xz, float y, float amount) {
  // Mép trên lên xuống ±15 m theo nhiễu 140 m, trên mặt mây ~15 m: phủ luôn chỗ mặt biển mây cắt bờ (đường dao — bẫy biển mây
  // 170 m). Đặc dần 45 m — mép cứng = vạch sơn quanh đồi theo đồng mức (bẫy dải mây ôm sườn Fansipan vòng 8).
  float top = uMistY + 15.0 + 30.0 * (gnNoise(xz / 140.0) - 0.5);
  float k = (1.0 - smoothstep(-45.0, 0.0, y - top)) * amount;
  // Sáng / tối theo nhiễu 60 m: một màu phẳng thì nửa dưới khung thành tấm trắng không thước đo (giám khảo A mc8b). Phủ 0,94:
  // 0,88 còn lộ vân bậc ruộng mờ dưới mây = "giấy kẻ dòng" (mc8f).
  return mix(col, mistCol * mix(0.86, 1.08, gnNoise(xz / 60.0 + 4.7)), 0.94 * k);
}
`,p4=`
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
`,v4=`
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
#ifdef TERRAIN_DETAIL
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
#ifdef TERRAIN_DETAIL
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
#endif
  return col;
}
`,y4=`
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
${v4}
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
`,b4=`
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
`,w4=`
#include <fog_pars_fragment>
${de}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
varying float vMist;
uniform float uMaxDist;
uniform float uWaterY;
uniform vec4 uDeck;

${Ir}
${y4}
${d4}
${p4}
${f4}
${g4}
${$w}
${Pd}
${Wm}
${b4}

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
  col = mcValleyMist(col, DECK_HUG_COLOR, xz, y, vMist);
  float deepK = smoothstep(30.0, 200.0, 0.5 * (cameraPosition.y - vWorld.y));
  col = mix(col, atmHazeColor(-V), 0.6 * (1.0 - exp(-0.003 * dist * deepK)));
#endif

  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`,x4=`
#include <fog_pars_vertex>
attribute vec3 aTrack;
attribute float aMist;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
varying float vMist;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vTrack = aTrack;
  vMist = aMist;
  vNormal = normal;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,Tf={value:0};function M4(t=1e9,n=!1,e=!1){return new Tt({vertexShader:x4,fragmentShader:w4,defines:Sm({...n?{TERRAIN_LITE:1}:{},...e?{TERRAIN_DETAIL:1}:{}}),uniforms:{...Rn.merge([In.fog,{uMaxDist:{value:t}}]),..._s,uRegionHg:bo,uWaterY:Rr,uDeck:Ss,uMistY:km,uTime:Tf},fog:!0})}const k4=6e3,eu=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function S4(t,n){const e=M4(k4,n.lite,n.detail),o=new m4(t,sa,e,{baseSize:n.baseSize,segs:n.segs,farSegs:n.farSegs,levels:n.levels,buildBudgetMs:5}),a=new u4(t,rt,eu);return{update(s,c,i){o.update(s.x,s.z,c,i),a.update(s.x,s.z,!1,i)},progress(s){const c=o.stats(),i=8;return{pending:c.pending+i*a.pending(s.x,s.z),wanted:c.wanted+i*eu.length-i}},warmups:()=>[new X(Sf(sa,0,0,1,1),e)],statsLine(){const s=o.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const ou=16,au=3,Uo=1.8,su=2.2,Bn={x:0,v:0};function T4(t,n,e,o){Bn.x=0,Bn.v=0;for(const a of t.obstacles){const s=jt[a.kind],c=a.z-n;if(c+s.halfZ+1<0||c-s.halfZ>ou)continue;const i=Math.min(1,Math.max(0,1-(c-s.halfZ)/ou)),r=St(a.lane);let l=0,u=0;if(a.kind==="ridge")u=Math.max(0,s.hi+au-o);else if(a.kind==="bridge")o>s.lo-Uo&&o<s.hi+Uo&&(u=t.v<s.lo?s.lo-Uo-o:s.hi+Uo-o);else if(Math.abs(e-r)<s.halfX+su){const h=t.x-r;Math.abs(h)>=s.halfX?l=r+Math.sign(h)*(s.halfX+su)-e:a.kind==="spike"?u=Math.max(0,s.hi+au-o):a.kind==="overhang"&&(u=Math.min(0,s.lo-Uo-o))}u>0?Bn.v=Math.max(Bn.v,u*i):u<0&&(Bn.v=Math.min(Bn.v,u*i)),Math.abs(l*i)>Math.abs(Bn.x)&&(Bn.x=l*i)}return Bn}function A4(t,n,e){const o=Math.sin(e),a=Math.cos(e);return Math.max(rt(t,n),rt(t+4*o,n+4*a),rt(t+8*o,n+8*a))}const N4={back:4,up:10,fov:70,look:18,lookDown:30},z4={back:3,up:2.5,fov:66,look:1.5,lookDown:1.5},C4=-8.5;function E4(t){if(t.mode!=="run")return{top:0,side:0,level:0,rise:0};const n=Z(t.z),e=$.plungeLevel?.(n)??0,o=Math.min(1,Math.max(0,(-wn(t.z+40)-.25)/.4));return{top:$.plungeTop?.(n)??0,side:$.plungeSide?.(n)??0,level:e,rise:e*o*o*(3-2*o)}}const L4={back:5,up:6,fov:64,look:40,lookDown:4},P4=.4;function _4(t,n,e){return t>0?t*P4*Math.max(0,Y(n)-Y(e)):0}const Tn={bankShare:0,bankCap:0,slideRoll:0,rollRate:0,trick:0,rollCap:0,shake:0,diveFov:0,boostFov:0};function R4(t){const n=t.mode==="run"?qs(ga(t.z,t.diff),46,64):0,e=(o,a)=>o+(a-o)*n;return Tn.bankShare=e(.45,.25),Tn.bankCap=e(.3,.16),Tn.slideRoll=e(.0022,9e-4),Tn.rollRate=e(3,1.8),Tn.trick=e(1,.4),Tn.rollCap=e(.6,.35),Tn.shake=e(1,.5),Tn.diveFov=e(4,1.5),Tn.boostFov=9*Pr(t),Tn}function qs(t,n,e){const o=Math.min(1,Math.max(0,(t-n)/(e-n)));return o*o*(3-2*o)}function I4(t,n,e,o){const a=wn(t.z),s=Math.atan(Math.max(0,a));return{k:($.climbFrame??0)*o*qs(a,.25,.7),cam:-n*Math.tan(.33*s),look:e*Math.tan(.55*s)}}const te=$.steadyCam;function H4(t){if(!te||t<=te.fovKnee)return t;const n=te.fovMax-te.fovKnee;return te.fovKnee+n*Math.tanh((t-te.fovKnee)/n)}class G4{q=new xt;ready=!1;apply(n,e,o,a){if(te){if(o||!this.ready){this.q.copy(n.quaternion),this.ready=!0;return}this.q.slerp(n.quaternion,1-a*Math.exp(-e*te.lookRate)),n.quaternion.copy(this.q)}}}const Af=t=>Math.min(1,Math.max(0,(1-t)/.25));class B4{key="";viewScale=1;apply(n,e,o){const a=Af(e);let s=o,c=1;if(e<1){const r=Math.min(64+60*(1-a),o*(1-.15*a))*Math.PI/180;c=1+.1*a,s=Math.min(118,2*Math.atan(Math.tan(r/2)*c/e)*180/Math.PI)}const i=`${s.toFixed(2)}|${c.toFixed(3)}|${e.toFixed(4)}`;i!==this.key&&(this.key=i,this.viewScale=c,n.fov=s,c>1.001?n.setViewOffset(e,c,0,0,e,1):(n.clearViewOffset(),n.aspect=e,n.updateProjectionMatrix()))}}const F4={back:7.5,up:2.6+($.chaseTilt?.up??0),fov:58,look:34,lookDown:3.6+($.chaseTilt?.lookDown??0)},$4={back:11,up:4.5,fov:70,look:60,lookDown:5},O4={back:6.5,up:2.2,fov:64,look:40,lookDown:4},iu={back:13,up:4.5,fov:62,look:60,lookDown:6};function We(t,n,e){const o=(a,s)=>a+(s-a)*e;return{back:o(t.back,n.back),up:o(t.up,n.up),fov:o(t.fov,n.fov),look:o(t.look,n.look),lookDown:o(t.lookDown,n.lookDown)}}class D4{rig={...iu};fx=new Sc;flook=new Sc;fmv=new Sc;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;g=1;sideK=0;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};steady=new G4;camera;aspect;lens=new B4;constructor(n){this.camera=n,this.aspect=Number.isFinite(n.aspect)&&n.aspect>0?n.aspect:16/9}setAspect(n){Number.isFinite(n)&&n>0&&(this.aspect=n,this.lens.apply(this.camera,this.aspect,this.rig.fov))}get viewScale(){return this.lens.viewScale}shake(n){this.shakeA=Math.max(this.shakeA,n)}update(n,e,o,a,s=!1){const c=Math.min(1,Math.max(0,(n.speed-42)/22)),i=n.mode==="run"?Xu(n.z):0,r=Lt=>s?1:1-Math.exp(-o*Lt),l=R4(n),u=i>0?Math.max(.4,Math.min(2,y1(n.z,n.speed))):1;this.g+=(1+(u-1)*i-this.g)*r(3);const h=Math.max(0,this.g-1),f=Math.max(0,1-this.g),m=Af(this.aspect);let d=n.mode==="ready"?iu:We(We(F4,O4,v1(n.z)),$4,p1(n.z)*(1-.8*m));const g=E4(n);this.sideK+=(g.side-this.sideK)*r(2),d=We(We(We(d,N4,g.top),L4,g.rise),z4,this.sideK),d={...d,fov:d.fov+H4(10*c+.5*Math.max(0,n.surge)+.34*n.tailwind+l.boostFov)+(n.vert==="dive"?l.diveFov:0)+(n.thermalT>0?8:0)-2.5*h+5*f+10*g.level,up:d.up-.8*h},n.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=We(this.rig,d,r(2.4));const p=this.fmv.update(n.v-n.thermalV-n.windLift,Tc.move(n.pace,m),o,s),v=n.low&&n.vert==="cruise",k=p<0;this.fv+=((v?1:k?.6+.2*m:.45)-this.fv)*r(v?3:10),this.fl+=((v?1:k?.9:.35)-this.fl)*r(v?3:10);const M=n.speed*wn(n.z),w=M>0?$.climbCam??0:0;this.lag+=(5*(1-.7*m)*(1-w)*(1-.8*g.level)*Math.tanh(-M/40)*i-this.lag)*r(3);const y=this.fx.update(n.x*(.55+.3*m),Tc.camX(n.pace,m),o,s),x=n.x+gr(y-n.x,1.6+20*(1-m)),b=x-y,A=n.mode==="run"?Math.max(-l.bankCap,Math.min(l.bankCap,l.bankShare*Yu(n.z,n.speed))):0;this.roll+=(A-e*l.slideRoll-this.roll)*(s?1:1-Math.exp(-o*l.rollRate)),this.shakeA=Math.max(0,this.shakeA-o*2.5);const z=n.mode==="crash"||n.mode==="over",E=this.rig.back*(1-.12*m)-.3*m*Math.max(0,this.rig.back-7.5),T=n.z-E*(z?1.6:1);this.s=T;const N=this.camera,S=this.shakeA*l.shake,P=Math.max(0,Y(T)-Y(n.z))*.7*Math.max(m,g.level)-Math.max(0,Y(n.z)-Y(T))*($.climbCam??0)*i,I=I4(n,E,this.rig.look,i),G=this.rig.up+.6*m-P,K=G+I.k*(Y(n.z)-Y(T)+I.cam-G)+n.thermalV*.8+n.windLift*.85+p*this.fv+this.lag+(z?4:0),V=T4(n,T,x,K);this.clrX=Math.abs(V.x)>=Math.abs(this.clrX)?V.x:this.clrX+(V.x-this.clrX)*r(5),this.clrV=Math.abs(V.v)>=Math.abs(this.clrV)?V.v:this.clrV+(V.v-this.clrV)*r(5);const j=D(T,x+this.clrX+C4*this.sideK,K+this.clrV,this.tmp);N.position.set(j.x+S*Math.sin(a*37.1),Math.max(j.y,A4(j.x,j.z,Ct(T))+3)+S*Math.sin(a*41.3+2),j.z),this.crashK+=((z?1:0)-this.crashK)*r(4);const J=n.z+this.rig.look*(1-.75*this.crashK),q=.6*n.speed,et=(Y(J+q)-Y(J)-wn(J)*q)*i,mt=Z(n.z),tt=Math.tan(.14)*this.rig.look*qs(mt,$.edge-20,$.edge+80)*(1-qs(mt,$.pullOut-80,$.pullOut))*i*(1-g.level)-_4(g.level,n.z,J),Mt=this.flook.update(n.x,Tc.lookX(n.pace,m),o,s),kt=et-this.rig.lookDown-tt,Nt=kt+I.k*(Y(n.z)-Y(J)+I.look-kt);D(J,(Mt+(n.x-Mt)*this.sideK)*(.4+.2*m+(.6-.2*m)*this.sideK)+b,n.thermalV*.8+n.windLift*.85+p*this.fl+Nt-xf(n)*this.crashK,this.tmp),N.up.set(0,1,0),N.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),N.rotateZ(Math.max(-l.rollCap,Math.min(l.rollCap,this.roll+this.trickRoll*l.trick))),this.steady.apply(N,o,s,i),this.lens.apply(this.camera,this.aspect,this.rig.fov)}}const cu=globalThis.scheduler;function Ws(){return cu?.yield?cu.yield():new Promise(t=>{const n=new MessageChannel;n.port1.onmessage=()=>t(),n.port2.postMessage(0)})}const K4=()=>new ht().setAttribute("position",new F(new Float32Array(3),3));function vr(t,n,e,o,a){const s=t.getRenderTarget();t.setRenderTarget(a);try{return t.compileAsync(n,e,o)}finally{t.setRenderTarget(s)}}async function U4(t){const{renderer:n,scene:e,camera:o}=t,a=[];let s=performance.now();const c=async()=>{performance.now()-s<12||(await Ws(),s=performance.now())};for(const u of[...e.children,...t.extras])u.isLight||(a.push(vr(n,u,o,e,t.post.sceneTarget)),await c());const i=K4();for(const u of t.post.quads){const h=new X(i,u.material);a.push(vr(n,h,o,h,u.toScreen?null:t.post.sceneTarget))}let r=0;for(const u of a)u.then(()=>t.onProgress(++r/a.length*.8));await Promise.all(a);const l=n.info.programs??[];for(let u=0;u<l.length;u++)l[u].getUniforms(),l[u].getAttributes(),performance.now()-s>10&&t.onProgress(.8+.2*(u+1)/l.length),await c();t.onProgress(1)}function V4(t,n,e,o,a){return vr(t,n,o,e,a.sceneTarget).then(()=>{n.traverse(s=>{const c=s.material;for(const i of Array.isArray(c)?c:c?[c]:[])t.properties.get(i).currentProgram?.getUniforms()})})}const ru=.18,lu={world:.55,shaders:.45},hu=.4,q4=6e3,W4=.9,Y4=200,X4=4e3,so=document.getElementById("boot"),Jo=so?.querySelector(".bar i")??null,zc=so?.querySelector("p")??null,oe={world:0,shaders:0};let uu=0,yr=0,Cc=0,Nf=0;function j4(t){return oe.shaders>=1?1:hu*oe.shaders+(1-hu)*W4*(1-Math.exp(-(t-yr)/q4))}function mu(){const t=performance.now();oe.world>=1&&!Cc&&(Cc=t);const n=oe.world<1?"Dựng núi đồi…":oe.shaders>=1?"Sắp xong…":t-Cc<X4?"Chuẩn bị đồ hoạ…":"Chuẩn bị đồ hoạ — lần đầu hơi lâu…";zc&&zc.textContent!==n&&(zc.textContent=n);const e=ru+(1-ru)*(oe.world*lu.world+j4(t)*lu.shaders);!Jo||e<=uu||(uu=e,Jo.style.animation="none",Jo.style.width=`${(e*100).toFixed(1)}%`,so?.setAttribute("aria-valuenow",String(Math.round(e*100))))}function du(t,n){oe[t]=Math.max(oe[t],Math.min(1,n)),yr||(yr=performance.now(),Nf=window.setInterval(mu,Y4)),mu()}function Z4(){window.clearInterval(Nf),performance.mark("skyrun:ready"),gg(),document.documentElement.dataset.boot="ready",so&&(Jo&&(Jo.style.width="100%"),so.classList.add("done"),setTimeout(()=>so.remove(),600))}const J4=22;function Q4(t){let n=!0;return{held:()=>n,shaders:e=>U4({renderer:t.renderer,scene:t.scene,camera:t.camera,post:t.post.warmPlan(),extras:t.extras(),onProgress:e}),async world(e){try{for(;;){t.world.update(t.camera.position,!1,J4);const{pending:o,wanted:a}=t.world.progress(t.camera.position);if(e(a?1-o/a:1),o===0)break;await Ws()}t.world.update(t.camera.position,!0)}finally{n=!1}}}}async function t6(t,n,e){try{await Ws(),n(0,!0),await Ws();const o=t.bootShaders(a=>du("shaders",a));await t.bootWorld(a=>du("world",a)),performance.mark("skyrun:world"),n(0,!0),await o,performance.mark("skyrun:shaders")}catch(o){console.error("[sky-run] khoi dong theo lat hong — vao game luon",o)}e(),Z4()}const Ec=new it;function n6(t,n,e,o){let a=o;return{sunDir:()=>a,apply(s,c){fw(t,s,c),a=rw(o,s,c);const i=R(.55,1,s);n.position.set(a.x*1e3,Math.max(a.y,.35*i)*1e3,a.z*1e3),n.color.copy(oc("sunLight",s,Ec,c)),n.intensity=2.4*(1-.7*i),e.color.copy(oc("skyAmbient",s,Ec,c)),e.groundColor.copy(oc("bounce",s,Ec,c)),e.intensity=1.3*(1+.35*i)}}}const os={x:-.32,y:.1,z:1};function e6(t,n){const{renderer:e,scene:o,camera:a,sun:s,hemi:c}=$k(t,n.maxDpr);dw(o,os);const i=n6(o,s,c,os),r=Kk(os),l=S4(o,n.terrain),u=e5(n.foliage),h=D5(n.ambient),f=Fw(),m=bw(n.ambient),d={x:0,y:0,z:0},g={x:0,y:0,z:0},p=$.cloudDecks?vv($.cloudDecks,n.name!=="high"):V2(n.name!=="high"),v=Hb(),k=qb(),M=Yb(),w=Zb(),y=sw(),x=vk(),b=fx(n.ambient),A=TM(n.ambient),z=Mk();fg(Rk(z,n.name==="high",vt=>V4(e,vt,o,a,q.warmPlan())));const E=Nk(),T=t4(),N=k3(n.name==="low"),S=Hk(),P=s4(),I=Iw(),G=Nw(),K=Cw(),V=Wk(),j=jk(),J=Ww();o.add(r.mesh,u.group,h.group,f.mesh,v.group,k.group,M.group,w.mesh,y.group,p.mesh,m.mesh,A.group,x.group,b.group,z.root,T.points,S.mesh,P.object,I.mesh,G.group,K.mesh,V.mesh,V.star,V.shell,j.stars,j.chips,J.points,N.mesh);const q=Fk(e,o,a,os,n.post),et=new D4(a),mt=Q4({renderer:e,scene:o,camera:a,post:q,world:l,extras:()=>[...l.warmups(),...pk(),Ib()]});Ow(n.ambient>=1?12:n.ambient>=.7?9:6);const tt=[new L,new L],Mt=[new L,new L],kt=new L,Nt=new tn,Lt={};let kn=null;return{renderer:e,scene:o,camera:a,post:q,cam:et,lanterns:b,flashes:V,impacts:j,world:l,bootShaders:mt.shaders,bootWorld:mt.world,ghosts:G,trick:E.trick,pilot:z.root,present(vt,nt,on,ko,hn=!1){const{dusk:dt,morn:So}=ko;vt.mode==="crash"||vt.mode==="over"?kn??=vt.z:kn=null;let U=vt;kn!==null&&vt.z>kn+.4&&(U=Object.assign(Lt,vt),U.z=kn+.4),i.apply(dt,So),E.apply(z,U,nt,on),K.update(z.root.position,U.stunT/_.stunTime,nt,a),et.trickRoll=E.camRoll(),et.update(U,E.lateralSpeed(),on,nt,hn),r.update(a,nt,dt,So),Tf.value=nt,mt.held()||l.update(a.position,hn),u.update(U.z,dt,a),h.update(U.z,dt),f.update(U.z),Dw(),J.update(U,nt,dt,et.s),$.cloudDecks||m.update(U.z),p.update(a,nt,et.s,U),q.setVeil(p.veil(),Math.min(1,Math.max(0,(dt-.45)/.4))),Bv(z.root.position.x,z.root.position.z,Ct(U.z),nt),D(U.z+1,U.x,U.v,d),D(U.z,U.x,U.v,g);const pi=U.mode==="run"?U.speed:0;d.x=(d.x-g.x)*pi,d.y=(d.y-g.y)*pi,d.z=(d.z-g.z)*pi,V.update(on,d),j.update(on,d);const Uf=U.mode==="run"&&U.hp===1?.14+.08*Math.sin(nt*5.5):0;q.setDanger(Math.max(j.danger(),Uf,U.mode==="crash"?.55:U.mode==="over"?.25:0)),x.update(U,nt,dt),v.update(U.z),k.update(et.s,nt,dt),M.update(U.z,nt),w.update(et.s),A.update(et.s,nt,dt),y.update(U.z),b.update(U,nt,on,dt,et.s),Kw(Math.min(1,Math.max(0,(dt-.45)/.4))),I.update(U,nt,et.s),z.root.updateMatrixWorld(),z.feet.forEach((bi,wi)=>bi.getWorldPosition(tt[wi])),T.update(tt,on,U.mode==="run"||U.mode==="ready",a.position),z.ankles.forEach((bi,wi)=>bi.getWorldPosition(Mt[wi])),N.update(U,Mt,nt,on,a.position);const Vf=U.mode==="run"||U.mode==="ready";S.update(z.tips,nt,Vf,Math.min(1,Math.max(0,(U.speed-40)/26)+(U.vert==="dive"?.4:0)),a.position);const p0=U.stunT/_.stunTime;Mf.value=Math.max(p0*p0*(.6+.4*Math.sin(nt*28)),U.mode==="run"&&U.hp===1?.18+.12*Math.sin(nt*5.5):0);const v0=Ct(U.z);kt.set(Math.sin(v0),wn(U.z),Math.cos(v0)).normalize().multiplyScalar(U.speed);const vi=Math.min(1,Math.max(0,(U.speed-40)/26)),y0=U.mode==="run"?$.dropFx?.(Z(U.z))??0:0,yi=U.mode==="run"?Math.max(0,U.surge)/12+U.tailwind/16+U.climbV/24+1.2*y0:0,qf=1-.45*Math.min(1,Math.max(0,(dt-.5)/.4));return P.update(a,kt,U.mode==="run"?qf*(.1+.4*vi+.55*yi+(U.thermalT>0?.35:0)+.5*Math.min(1,U.boostT/_.boostFade)):0),q.setSpeed(U.mode==="run"?.05*vi+.16*yi+(U.vert==="dive"?.04:0)+(U.thermalT>0?.1:0)+.1*Math.min(1,U.boostT/_.boostFade):0,y0),q.setSun(i.sunDir(),1-Math.min(1,dt*1.6)),b.setViewport(e.getDrawingBufferSize(Nt).y*et.viewScale,a.fov),G.setViewport(Nt.y*et.viewScale,a.fov),J.setViewport(Nt.y*et.viewScale,a.fov),Math.min(1.4,vi+.5*yi)},resize(vt,nt){e.setSize(vt,nt),q.setSize(vt,nt),et.setAspect(vt/nt)}}}function o6(){const t={z:0,x:0,v:0,thermalV:0,windLift:0},n={};return{capture(e){t.z=e.z,t.x=e.x,t.v=e.v,t.thermalV=e.thermalV,t.windLift=e.windLift},view(e,o){if(o>=1)return e;const a=(s,c)=>s+(c-s)*o;return Object.assign(n,e),n.z=a(t.z,e.z),n.x=a(t.x,e.x),n.v=a(t.v,e.v),n.thermalV=a(t.thermalV,e.thermalV),n.windLift=a(t.windLift,e.windLift),n}}}const zf=`skyrun.tut.${Gt}`,a6=2e3,s6=.7,i6=.45,c6=.3,r6=.15;function l6(){try{return new Set(JSON.parse(localStorage.getItem(zf)??"[]"))}catch{return new Set}}function h6(t){const n=t.obstacles.filter(h=>!h.passed&&h.z-t.z>-jt[h.kind].halfZ);if(!n.length)return null;const e=n.reduce((h,f)=>f.z<h.z?f:h),o=n.filter(h=>h.row===e.row),a=e.kind;if(t.thermalV>8&&a!=="pillar")return null;if(o.some(h=>h.kind==="bridge"))return t.vert==="dive"||t.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(o.some(h=>h.kind==="ridge"))return t.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const s=new Set(o.map(h=>h.lane));if(!s.has(t.lane))return null;const c=o.filter(h=>h.lane===t.lane),i=c.every(h=>h.kind==="spike");if(i&&t.vert==="flare")return null;const r=c.every(h=>h.kind==="overhang");if(r&&(t.vert==="dive"||t.low))return null;const l=[];return[-1,0,1].some(h=>h<t.lane&&!s.has(h))&&l.push("left"),[-1,0,1].some(h=>h>t.lane&&!s.has(h))&&l.push("right"),i&&l.push("up"),r&&l.push("down"),{lesson:l.length===1&&i?"up":l.length===1&&r?"down":"lane",kind:c[0].kind,skin:c[0].skin,accept:l,row:e.row,z:e.z}}const fu={left:"←",right:"→",up:"↑",down:"↓"};function u6(t,n){const e=n?new Set:l6(),o=matchMedia("(pointer: coarse)").matches,a=document.createElement("div");a.className=o?"tut touch":"tut",t.appendChild(a);let s=null,c=1;const i=(l,u)=>{const h=l.accept.filter(w=>l.lesson!=="lane"||w!=="up"&&w!=="down"),f=Un(l.z),m=l.skin==="balloon"||l.skin==="basket"?"khinh khí cầu":l.skin==="boulder"?"tảng đá":l.skin==="pine"?"cây pơ mu":f?"nhà":"",d=l.skin!=="basket"?"chui dưới mái đá":l.lesson==="down"?"chui dưới khinh khí cầu":"né khinh khí cầu",g=l.kind==="bridge"?f?"chui qua cổng làng":ci(l.z)?"chui dưới cabin":"chui dưới cầu":l.kind==="overhang"?d:l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?l.skin?`vọt qua ${m}`:f?"vọt qua mái nhà":"vọt qua mỏm đá":m?`né ${m}`:"né cột đá",p=h.length===1?h[0]==="left"?"sang trái":"sang phải":"sang trái / phải",v=l.lesson==="lane"?`ngón ${p}`:l.lesson==="up"?"lên":"xuống",k=o?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${v} để ${g}`:`Bấm ${h.map(w=>fu[w]).join(" / ")} để ${g}`,M=l.lesson==="lane"?O.dragSide:l.lesson==="up"?O.swipeUp:O.swipeDown;a.classList.toggle("flip",u>0),a.innerHTML=`<div class="tut-text">${o?M:""}<span>${k}</span></div><div class="tut-arrows">${h.map(w=>`<span class="tut-arrow ${w}">${fu[w]}</span>`).join("")}</div>`,a.classList.add("on")},r=l=>{e.add(l);try{localStorage.setItem(zf,JSON.stringify([...e]))}catch{}};return{frozen:()=>s!==null&&c===0,update(l,u){if(l.mode!=="run"||e.size===3)return s=null,a.classList.remove("on"),c=1,1;const h=h6(l);if(s&&(!h||h.row!==s.row)&&(r(s.lesson),s=null,a.classList.remove("on")),!s&&h&&!e.has(h.lesson)&&l.z<a6){const d=(l.obstacles.find(g=>g.row===h.row).z-l.z)/l.speed;d<=s6&&d>=i6&&(s=h,i(h,l.lane))}else s&&h&&(s=h);const f=s!==null&&l.buffered!==null&&s.accept.includes(l.buffered);return c=s&&!f?Math.max(0,c-u/c6):Math.min(1,c+u/r6),c},offer(l){const u=s?l.find(h=>s.accept.includes(h)):void 0;return u?(c=.4,u):null}}}const br=`skyrun.progress.s${co}`,wr="skyrun.meters",xr="skyrun.runBest",Cf="skyrun.played",Ef="skyrun.unlockSeen",gu=co,Mr=t=>Math.floor(t).toLocaleString("vi-VN"),as=t=>(Math.floor(t/100)/10).toLocaleString("vi-VN"),Lf=new Map;function h0(t,n){try{return JSON.parse(Lf.get(t)??localStorage.getItem(t)??n)}catch{return JSON.parse(n)}}function u0(t,n){const e=JSON.stringify(n);Lf.set(t,e);try{localStorage.setItem(t,e)}catch{}}function io(t){const n=h0(t,"{}");return n&&typeof n=="object"?n:{}}const Lc=(t,n)=>u0(t,n),m6=t=>io(br)[t]??0,Pf=t=>io(wr)[t]??0,d6=t=>io(xr)[t]??0;function m0(t){const n=[];return t.run!==void 0&&n.push({label:"Bay một ván",met:`Bay một ván ${as(t.run)} km`,have:d6(t.from),need:t.run,fmt:e=>`${as(e)} km`}),t.score!==void 0&&n.push({label:`Điểm mùa ${gu}`,met:`${Mr(t.score)} điểm mùa ${gu}`,have:m6(t.from),need:t.score,fmt:Mr}),t.meters!==void 0&&n.push({label:"Tổng quãng bay",met:`${as(t.meters)} km tổng quãng bay`,have:Pf(t.from),need:t.meters,fmt:e=>`${as(e)} km`}),n}const f6=t=>!!t.unlock&&m0(t.unlock).some(n=>n.have>=n.need);function g6(){const t=h0(Cf,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n in Zt):[]}function p6(){const t=h0(Ef,"[]");return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}function _f(t){const n=p6();t.some(e=>!n.includes(e))&&u0(Ef,[...new Set([...n,...t])])}function d0(t){_f(t.filter(e=>Zt[e].unlock&&!f6(Zt[e])));const n=g6();t.some(e=>!n.includes(e))&&u0(Cf,[...new Set([...n,...t])])}function v6(){try{const t=localStorage,n=Object.keys(Zt).filter(e=>Pf(e)>0||t.getItem(`skyrun.best.${e}`));Number(t.getItem("skyrun.best"))>0&&!t.getItem("skyrun.best.mu-cang-chai")&&n.push("khau-pha"),d0(n)}catch{}}v6();function gi(t){return!!t.listed}const y6=()=>Object.values(Zt).filter(t=>!gi(t));function Rf(t){const n=y6(),e=io(br),o=io(wr),a=io(xr);return t(e,o,a),Lc(br,e),Lc(wr,o),Lc(xr,a),n.filter(s=>gi(s))}const Qo=(t,n,e)=>{Number.isFinite(e)&&e>(t[n]??0)&&(t[n]=Math.floor(e))},b6=(t,n,e)=>(Number.isFinite(e)&&e>0&&d0([t]),Rf((o,a,s)=>{Qo(o,t,n),Qo(s,t,e),Number.isFinite(e)&&e>0&&(a[t]=Math.floor((a[t]??0)+e))}));function pu(t){return d0(Object.keys(Zt).filter(n=>(t.meters[n]??0)>0)),Rf((n,e,o)=>{for(const a of Object.keys(Zt))typeof t.score[a]=="number"&&Qo(n,a,t.score[a]),typeof t.meters[a]=="number"&&Qo(e,a,t.meters[a]),typeof t.run?.[a]=="number"&&Qo(o,a,t.run[a])})}function vu(){return[]}function w6(t){_f([t])}const x6=16e5,M6=2e4;function k6(t){const n=Qs(t)[0]?.file,e=Wu(t),o=e.zoneNames?dm.filter(a=>Object.values(e.zoneLines??{}).includes(a)):fm;return[...n?[n]:[],...o.map(gm)]}const Ys=new Map,Xs=new Set;function S6(t){Xs.add(t)}const If=t=>Ys.get(t)?.p??null,T6=()=>[...Ys.values()].map(t=>t.p).find(t=>!t.done)??null;async function A6(t,n,e){try{const o=await fetch(t,{priority:"low"});n(Number(o.headers.get("content-length"))||0);const a=o.body?.getReader();if(!o.ok||!a)return;for(;;){const{done:s,value:c}=await a.read();if(s)return;e(c.byteLength)}}catch{n(0)}}function Hf(t){const n=Ys.get(t);if(n)return n.done;const e=k6(t),o=e.map((i,r)=>r===0&&Qs(t)[0]?x6:M6);let a=0;const s={p:{frac:0,done:!1},done:Promise.resolve()},c=(i=!1)=>{const r=o.reduce((l,u)=>l+u,0);s.p={frac:i?1:Math.max(s.p.frac,Math.min(.99,a/r)),done:i};for(const l of Xs)l(t,s.p)};return s.done=Promise.all(e.map((i,r)=>A6(i,l=>{l>0&&(o[r]=l),c()},l=>{a+=l,c()}))).then(()=>c(!0)),Ys.set(t,s),c(),s.done}function N6(t,n=12e3){let e=0,o=()=>{};const a=s=>{s===t&&(clearTimeout(e),e=window.setTimeout(o,n))};return new Promise(s=>{o=s,Xs.add(a),a(t),Hf(t).then(s)}).finally(()=>{clearTimeout(e),Xs.delete(a)})}function yu(){navigator.connection?.saveData||Promise.all([Er,Ru()]).then(async()=>{for(const t of Object.values(Zt))t.id!==Gt&&gi(t)&&await Hf(t.id)})}const f0=t=>t.frac,g0=t=>`Đang tải ${Math.floor(t.frac*100)}%`;function z6(t){const n=If(t);return!n||n.done?"":`<span class="pc-pack" data-pack="${t}" style="--f:${f0(n).toFixed(3)}"><i></i><small>${g0(n)}</small></span>`}function C6(t,n,e){const o=t.querySelector(`.pc-pack[data-pack="${n}"]`);o&&e.done?o.remove():o&&(o.style.setProperty("--f",f0(e).toFixed(3)),o.querySelector("small").textContent=g0(e)),Gf(t)}function Gf(t){const n=T6();for(const e of t.querySelectorAll("[data-lobby]"))e.classList.toggle("packing",!!n),n&&e.style.setProperty("--pack",f0(n).toFixed(3))}const bu=t=>{const n=If(t);return n?g0(n):"Đang tải…"},Bf={1:"Dễ",2:"Trung bình",3:"Hơi khó",4:"Khó"},Vn={"mu-cang-chai":{difficulty:1,newbie:!0,moments:[{icon:"terrace",text:"Ruộng bậc thang",at:"valley"},{icon:"river",text:"Theo suối Nậm Kim",at:"river"},{icon:"thermal",text:"Vòng đồi Mâm Xôi",at:"climb"}]},"khau-pha":{difficulty:2,moments:[{icon:"gorge",text:"Khe đá uốn lượn",at:"gorge"},{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"house",text:"Làng mái ngói",at:"valley"}]},"ha-giang":{difficulty:3,moments:[{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"river",text:"Sát mặt sông",at:"river"},{icon:"cave",text:"Chui hang",at:"cave"},{icon:"thermal",text:"Leo cột gió",at:"climb"}]},fansipan:{difficulty:4,moments:[{icon:"dive",text:"Rơi {dive} m",at:"drop"},{icon:"cloud",text:"Xuyên tầng mây",at:"gorge"},{icon:"river",text:"Suối trong mưa",at:"river"},{icon:"sun",text:"Trên biển mây",at:"valley"}]}},E6={},L6=Object.keys(Vn).sort((t,n)=>Vn[t].difficulty-Vn[n].difficulty);function Pc(t){const n=Zt[t];return n.listed?n:null}const Vo=120,P6=340,wu=18,_6=84,xu=new Map;function Ff(t){const n=xu.get(t);if(n)return n;const{cycle:e,offset:o}=Zt[t],a=Wu(t),s=[],c=new Map,i=new Set;let r=0;for(let m=0;m<=Vo;m++)r=Math.min(r,a.dive((o+m/Vo*e)%e));let l=0,u=[];for(let m=0;m<=Vo;m++){const d=(o+m/Vo*e)%e,g=a.dive(d)-r;l=Math.max(l,g),s.push([m/Vo*100,wu+(_6-wu)*Math.min(1,g/P6)]);const p=[a.zone(d,!1),...a.drop(d)>.5?["drop"]:[]];for(const v of p){if(i.has(v))continue;const k=c.get(v);k?k[1]=m:c.set(v,[m,m])}for(const v of u)!p.includes(v)&&c.has(v)&&i.add(v);u=p}const h=new Map;for(const[m,[d,g]]of c)h.set(m,s[Math.round((d+g)/2)]);const f={pts:s,dive:Math.round(l/10)*10,anchors:h};return xu.set(t,f),f}const $f=t=>Bf[Vn[t].difficulty];function Of(t){const n=Vn[t].difficulty;return`<span class="pc-diff lv${n}"><span class="pc-pips">${"<i></i>".repeat(4)}</span>${Bf[n]}</span>`}const Df=t=>Vn[t].newbie?`<span class="pc-badge newbie">${O.star}Hợp người mới</span>`:"";function R6(t){const n=Ff(t),e=n.pts.map(([a,s],c)=>`${c?"L":"M"}${a.toFixed(1)} ${s.toFixed(1)}`).join(""),o=Vn[t].moments.map(a=>{const s=a.at&&n.anchors.get(a.at);return s?`<span class="pc-mark" style="left:${s[0].toFixed(1)}%;top:${s[1].toFixed(1)}%">${O[a.icon]}</span>`:""}).join("");return`<span class="pc-flight" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="area" d="${e}L100 100L0 100Z"/><path class="glow" d="${e}"/><path class="line" d="${e}"/></svg>${o}</span>`}function Kf(t){const n=Vn[t].moments.some(e=>e.text.includes("{dive}"))?Ff(t).dive:0;return`<span class="pc-moments">${Vn[t].moments.map(e=>`<span>${O[e.icon]}${e.text.replace("{dive}",n.toLocaleString("vi-VN"))}</span>`).join("")}</span>`}const kr=21,Mu=2*Math.PI*kr;function I6(t,n,e,o){const a=Math.min(n,e),s=e>0?a/e:1;return`<span class="pc-ring${s>=1?" done":""}"><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="bg" cx="25" cy="25" r="${kr}"/><circle class="arc" cx="25" cy="25" r="${kr}" stroke-dasharray="${Mu.toFixed(1)}" stroke-dashoffset="${(Mu*(1-s)).toFixed(1)}"/></svg><b>${Math.floor(s*100)}%</b><small>${t}<br>${o(a)} / ${o(e)}</small></span>`}function H6(t,n){const e=n==="locked"?null:jr(t.id),o=n==="current"?`<span class="pc-badge">${O.wingsuit}Đang bay</span>`:n==="fresh"?`<span class="pc-badge fresh">${O.star}Mới mở!</span>`:Df(t.id),a=n==="locked"?t.unlock:null,s=a?m0(a):[],c=s.length===1?`${s[0].met} ở ${Zt[a.from].name} để mở`:`Mở khi đạt 1 trong ${s.length} ở ${a?Zt[a.from].name:""}`,i=a?`<span class="pc-goals"><span class="pc-goal-head">${c}</span><span class="pc-rings">`+s.map(r=>I6(r.label,r.have,r.need,r.fmt)).join('<i class="pc-or">hoặc</i>')+"</span></span>":"";return`<button type="button" class="postcard ${n} map-${t.region}" data-map="${t.id}" aria-label="${t.name}, độ khó ${$f(t.id)}" title="${t.tagline}">
    <span class="pc-art" style="background-image:url(ui/map-${t.id}.webp)">${R6(t.id)}${n==="locked"?`<span class="pc-lock">${O.lock}</span>`:""}${Of(t.id)}</span>
    <span class="pc-body">${o}<b class="pc-name">${t.name}</b>${Kf(t.id)}
      ${e&&e.m>0?`<span class="ui-chip gold pc-best">${O.trophy}<span>Kỷ lục ${Mr(e.m)} m</span></span>`:""}${i}${n==="locked"?"":z6(t.id)}</span>
  </button>`}function G6(t){const{name:n,tagline:e}=E6[t]??{name:t,tagline:""};return`<div class="postcard soon" data-soon="${t}" role="button" aria-disabled="true" tabindex="-1" aria-label="${n}, độ khó ${$f(t)}, sắp có" title="${e}">
    <span class="pc-art ink">${O.mountain}<span class="ui-stamp">Sắp có</span>${Of(t)}</span>
    <span class="pc-body">${Df(t)}<b class="pc-name">${n}</b>${Kf(t)}</span>
  </div>`}const B6=[[12,.1,30],[26,.7,22],[72,.3,34],[86,.9,24],[50,1.3,20]];function F6(t,n,e){w6(n.id);const o=n.unlock,a=o?m0(o).find(u=>u.have>=u.need)?.met??"":"",s=document.createElement("div");s.className="unlock-pop",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`Đã mở khoá ${n.name}`),s.innerHTML=`<div class="unlock-sky" aria-hidden="true">${B6.map(([u,h,f])=>`<i style="left:${u}%;animation-delay:${h}s;width:${f}px;height:${f}px">${O.lantern}</i>`).join("")}</div>
    <div class="unlock-card ui-paper map-${n.region}">
      <div class="unlock-art" style="background-image:url(ui/map-${n.id}.webp)"><span class="ui-stamp unlock-stamp">Mở khoá</span></div>
      <div class="unlock-kicker">${O.star}Map mới!</div>
      <h2 class="unlock-name">${n.name}</h2>
      <p class="unlock-sub">${n.tagline}</p>
      ${a?`<span class="ui-chip unlock-goal">${O.check}${a} ở ${Zt[o.from].name}</span>`:""}
      <div class="unlock-actions">
        <button type="button" class="ui-btn-lacquer" data-go>${O.check}Chọn ${n.name}</button>
        <button type="button" class="ui-btn-cloth" data-later>Để sau</button>
      </div>
    </div>`,nn(s);const c=s.querySelector("[data-go]"),i=s.querySelector("[data-later]"),r=()=>s.remove();s.addEventListener("click",u=>{u.stopPropagation();const h=u.target instanceof Element?u.target:null;h?.closest("[data-go]")?(r(),e(n)):(h===s||h?.closest("[data-later]"))&&r()});const l=u=>{if(!s.isConnected)return void window.removeEventListener("keydown",l,!0);if(u.key==="Escape")i.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===i?i:c).click();else return;u.stopPropagation(),u.preventDefault()};window.addEventListener("keydown",l,!0),t.appendChild(s)}const $6=".unlock-pop, .board-panel:not([hidden]), .settings-panel:not([hidden]), .help-panel:not([hidden])";function O6(t){try{localStorage.setItem(Rc,t.id)}catch{}const n=new URLSearchParams(location.search);n.set("map",t.id),history.replaceState(history.state,"",`${location.pathname}?${n.toString()}${location.hash}`),location.reload()}function D6(t,n){const e=document.createElement("div");e.className="lobby-panel",e.hidden=!0,e.innerHTML=`<div class="lobby-card ui-indigo ui-trim" role="dialog" aria-label="Sảnh chọn map">
      <div class="panel-head">${O.mountain}<b>Chọn map</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${O.close}</button>
      <div class="lobby-scroll"><div class="lobby-track" data-track></div><div class="lobby-dots" data-dots></div></div>
      <button type="button" class="ui-btn-lacquer lobby-go" data-go></button>
    </div>`,t.appendChild(e),nn(e);const o=e.querySelector("[data-track]"),a=e.querySelector("[data-dots]"),s=e.querySelector("[data-go]");let c=[],i,r=Gt,l=0,u=null;const h=y=>y.id===Gt?"current":gi(y)?c.includes(y)?"fresh":"open":"locked",f=()=>[...o.querySelectorAll(".postcard")],m=()=>{f().forEach((A,z)=>{const E=(A.dataset.map??A.dataset.soon)===r;A.classList.toggle("selected",E),a.children[z]?.classList.toggle("on",E)});const x=r===Gt?gt:Pc(r),b=x?h(x):"soon";s.disabled=b==="locked"||b==="soon"||!!u,s.innerHTML=u?bu(u.id):b==="locked"?`${O.lock}Chưa mở khoá`:b==="soon"?"Sắp có":`${O.check}Chọn ${x.name}`},d=(y,x)=>{o.scrollTo({left:y.offsetLeft-(o.clientWidth-y.offsetWidth)/2,behavior:x?"smooth":"auto"})},g=()=>{o.innerHTML=L6.map(y=>{const x=Pc(y);return x?H6(x,h(x)):G6(y)}).join(""),a.innerHTML=f().map(()=>"<i></i>").join(""),m()},p=()=>{const y=r===Gt?gt:Pc(r);!y||s.disabled||(y.id===Gt?k():v(y))},v=y=>{u||(u=y,m(),N6(y.id).then(()=>{u===y&&!e.hidden&&O6(y)}))};S6((y,x)=>{C6(t,y,x),u?.id===y&&!x.done&&(s.innerHTML=bu(y))}),yu();const k=()=>{e.hidden=!0,u&&(u=null,m())};e.addEventListener("click",y=>{const x=y.target instanceof Element?y.target:null;if(x===e||x?.closest("[data-close]"))return k();if(x?.closest("[data-go]"))return p();const b=x?.closest(".postcard");if(!b)return;const A=b.dataset.map??b.dataset.soon;if(A===r)return p();r=A,m(),d(b,!0)}),o.addEventListener("scroll",()=>{clearTimeout(l),l=window.setTimeout(()=>{const y=o.scrollLeft+o.clientWidth/2,x=f().reduce((A,z)=>Math.abs(z.offsetLeft+z.offsetWidth/2-y)<Math.abs(A.offsetLeft+A.offsetWidth/2-y)?z:A),b=x.dataset.map??x.dataset.soon;b!==r&&o.scrollWidth>o.clientWidth+4&&(r=b,m())},140)},{passive:!0}),window.addEventListener("keydown",y=>{y.code==="Escape"&&!e.hidden&&k()}),window.addEventListener("keydown",y=>{e.hidden||y.code!=="Space"&&y.code!=="Enter"||t.querySelector($6)||(y.stopImmediatePropagation(),y.preventDefault(),p())},!0);const M=()=>{const y=vu().length>0||c.length>0;for(const x of t.querySelectorAll("[data-lobby]"))x.classList.toggle("has-news",y);Gf(t)},w=(y=[])=>{y.length&&(c=[...new Set([...c,...y])],yu()),e.hidden||g(),M()};return{open(){const y=vu()[0];r=c[0]?.id??y?.id??Gt,g(),e.hidden=!1;const x=f().find(b=>b.dataset.map===r);x&&requestAnimationFrame(()=>d(x,!1)),y&&!t.querySelector(".unlock-pop")&&F6(t,y,v),c=[],M(),n?.().then(b=>b.length&&w(b))},setScreen(y){y!==i&&(i=y,y?M():k())},refresh:w}}function K6(){let t=null;return n=>{if(!$.zoneNames||n.mode!=="run")return t=null,null;const e=n.z+n.speed*1.5,o=$.zone(Z(e),Un(e));return o===t?null:(t=o,$.zoneNames[o]?o:null)}}const ku="skyrun.lobbyIntro";function U6(t){try{if(localStorage.getItem(ku))return;localStorage.setItem(ku,"1")}catch{return}t()}const Qn=1/60;function V6(t){const n=new URLSearchParams(location.search),e=I3(n),o=e6(t,e),{renderer:a,post:s}=o,c=h3(),i=W3(t),r=S3(t,o.cam,o.lanterns,c,i,o.flashes,o.impacts,o.camera),l=ty(t,()=>v.mode==="run"&&!P.paused(),()=>v.steerX),u=O3(Number(n.get("seed")??0));let h=u();const f=e2(n);let m=n.get("auto")==="1",d=m||n.has("z");const g=K6(),p=n.has("alt");let v=zi(h.seed,p);v.z=Number(n.get("z")??0);let k=0,M=null;const w=o6();w.capture(v);const y=u6(t,n.get("tut")==="1"),x=(q,et=!1,mt=1)=>{const tt=f.at(v.z),Mt=w.view(v,mt),kt=o.present(Mt,k-Qn*(1-mt),q,tt,et);N.present(v,Mt,mt,q),i.update(v,tt),i.setPilotBox(v.mode==="run"?jl(o.pilot,o.camera,t):null),c.update(kt,v.mode==="run",tt);const Nt=g(v);Nt&&(i.zone(Nt),c.zone(Nt));const Lt=z.visible();E.setScreen(Lt),T.setScreen(Lt)},b=()=>{J===null||v.mode==="run"||v.mode==="crash"||t.querySelector(".unlock-pop")||(v.mode==="over"&&(h=u()),v=zi(h.seed,p),d=m||n.has("z"),v.z=Number(n.get("z")??0),w.capture(v),x(0,!0),Sp(v),N.runStart(v,h.route),M=null,c.runStart(),z.hide(),i.setVisible(!0))},A=()=>{h=u(),v=zi(h.seed,p),v.z=Number(n.get("z")??0),d=m||n.has("z"),M=null,w.capture(v),x(0,!0),z.showTitle(),i.setVisible(!1)},z=Mb(t,b,()=>{z.visible()==="over"&&A(),E.open()}),E=D6(t,async()=>{const q=await N.progress();return q?pu(q):[]}),T=m3(t),N=Qy({root:t,params:n,hud:i,screens:z,view:o.ghosts,camera:o.camera,route:h.route,quality:()=>({tier:e.name,scale:J?.scale??1}),rv:p?2:gt.logRvBase+kd});N.progress().then(q=>q&&E.refresh(pu(q)));const S=tb(t,c),P=eb(t,S.el,{touch:matchMedia("(pointer: coarse)").matches,onHome:()=>(N.runAbandon(v),A(),E.open())});Ab(t,S,c,o.ghosts,P),l.onAction(q=>{P.paused()?P.resume():z.visible()&&z.tapReady()?b():q==="Space"&&P.pause()}),l.onKey("KeyM",()=>S.toggle("sfx")),l.onKey("KeyN",()=>S.toggle("music")),l.onKey("KeyH",()=>i.setVisible(t.querySelector(".hud.hidden")!==null)),l.onTrick(o.trick),z.showTitle(),i.setVisible(!1);const I=q=>{w.capture(v),v.handling=m?"fast":qp(),Ap(v,m?Ig(v):q,l.holdDown(),Qn,m?null:l.steer()),N.afterStep(v,m),r.handle(v.events,v);for(const et of v.events)et.type==="crash"&&(M=et.kind);k+=Qn,v.mode==="over"&&!z.visible()&&(!d&&!v.alt&&E.refresh(b6(gt.id,Ae(v),v.z)),c.over(z.showOver(v,M,!d&&!v.alt),v.z),N.runOver(v,M),i.setVisible(!1))};let G=0;const K=q=>{P.setRunning(v.mode==="run",v.mode==="crash");const et=(v.mode==="crash"&&v.crashT<.9?.35:1)*P.factor(q)*(m?1:y.update(v,q));if(y.frozen()&&!P.paused()){const mt=l.take(),tt=l.steer(),Mt=tt===null?v.lane:lm(v.lane,tt),kt=y.offer(Mt!==v.lane?[...mt,Mt<v.lane?"left":"right"]:mt);kt&&I(mt.includes(kt)?[kt]:[])}for(G+=q*et;G>=Qn;)I(l.take()),G-=Qn;x(q*et,!1,G/Qn)},V=()=>o.resize(t.clientWidth,t.clientHeight);window.addEventListener("resize",V),V();const j=()=>g3(a,s,{state:()=>v,advance(q){for(let et=0;et<q/Qn;et++)I(l.take()),x(Qn)},play(q,et=60){for(let mt=0;mt<q*et;mt++)K(1/et)},autopilot(q){m=q,q&&(d=!0)},jump(q){d=!0,v.z=q,v.nextChunkZ=q+200,v.obstacles=[],v.pickups=[],w.capture(v),x(0,!0)},dusk:f.forceDusk,clock:f.forceU,render:()=>{x(0),s.render()},pilotBox:()=>jl(o.pilot,o.camera,t),hurt(){v.mode!=="run"||v.hp<=1||(v.hp--,r.handle([{type:"hurt",hp:v.hp,kind:"pillar"}],v))}},o);let J=null;t6(o,x,()=>{J=B3({renderer:a,post:s,tier:e,resize:V,tick:K,stats:n.has("stats")?q=>i.setStats(q):null,worldLine:()=>o.world.statsLine()}),window.__skyrunQuality={tier:e,governor:J},j(),!m&&z.visible()==="title"&&U6(()=>E.open())})}Qp(gt.region);document.title=`Sky Run · ${xm[gt.region]}`;V6(document.getElementById("app"));vg();
