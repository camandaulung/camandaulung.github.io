(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const av=6e3,Mm=[];function cv(n){return Mm.push(n),n}const ym=new Promise(n=>{const t=()=>{Promise.allSettled(Mm).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>n(),{timeout:1500}):setTimeout(n,100)})};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0}),setTimeout(n,av)}),lv=n=>fetch(n,{priority:"low"}).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null);function uv(){const n=window.SR_SW,t=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!n||!t||!("serviceWorker"in navigator)||ym.then(()=>navigator.serviceWorker.register(n).catch(e=>console.warn("[skyrun] sw",e)))}const vf=400,ka=n=>Math.max(0,Math.min(1,n));function xo(n,t){return n<=t.hardAt?t.d0+(1-t.d0)*ka((n-vf)/(t.hardAt-vf)):1+.15*ka((n-t.hardAt)/3e3)}const hv=[0,.12,.3,.5,.75];function fv(n){let t=0;return hv.forEach((e,i)=>{n>=e&&(t=i)}),t}function dv(n){return Math.max(-.2,.35-.55*n)}function pv(n){return n<=1?1-.28*ka((n-.3)/.7):.72-.06*ka((n-1)/.15)}const mv=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function gv(n,t){return n<.5||t%2===0}const rt={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,maxHp:2,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2},fs=2;function pn(n){return-n*rt.laneGap}function bm(n,t){const e=Math.min(1,xo(n,t));return rt.speedStart+(rt.speedMax-rt.speedStart)*(1-(1-e)*(1-e))}const Ki={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function Oa(n,t,e,i){const s=Ki[n.kind];return Math.abs(i)>s.halfZ||Math.abs(t-pn(n.lane))>=s.halfX+rt.hitHalfWidth?!1:e-rt.hitHalfHeight<s.hi&&e+rt.hitHalfHeight>s.lo}function vv(n,t,e){return Math.abs(t-pn(n.lane))>=Ki[n.kind].halfX+rt.hitHalfWidth?!0:e==="flare"?n.kind==="spike"||n.kind==="ridge":e==="dive"?n.kind==="bridge"||n.kind==="overhang":!1}function xv(n,t){return n.z+Ki[n.kind].halfZ<t}const _v=[rt.flareHeight,0,-5.5],Mv=0,Sm=1,yv=2;function Hr(n,t,e){return!n.some(i=>Oa(i,pn(t),_v[e],0))}function bv(n){const t=[];for(let e=-1;e<=1;e++)for(let i=0;i<3;i++)Hr(n,e,i)&&t.push({lane:e,tier:i});return t}function xf(n){return bv(n).length}function Sc(n,t,e){return e?n.some(i=>(i.kind==="pillar"||i.kind==="overhang")&&i.lane===t)?"none":"any":Hr(n,t,Sm)?"any":Hr(n,t,Mv)?"high":Hr(n,t,yv)?"low":"none"}function Sv(n,t,e,i,s){const r=n.thermalV>8,o=n.low&&!r,a=(t[0].z-n.z)/n.speed,c=d=>{const p=Sc(t,d,r);if(p==="none")return 1/0;const v=p==="any"?0:p==="low"&&o?.3:1.5;return Math.abs(d-n.lane)+v+(e&&Sc(e,d,r)==="none"?.6:0)},l=[-1,0,1].filter(d=>c(d)<1/0).sort((d,p)=>c(d)-c(p))[0];if(l===void 0)return a<i+.12&&n.vert!=="flare"?["up"]:[];const u=Sc(t,l,r);if(l===n.lane&&u==="any")return null;const f=[],h=s&&l===n.lane&&n.pickups.some(d=>!d.taken&&d.lane===n.lane&&d.z>n.z&&d.z<t[0].z&&(u==="low"?d.v<-2:d.v>2)&&(d.z-n.z)/n.speed<.2);if(u==="high"){const d=n.vert!=="flare"||n.vertT>=rt.vertIn+rt.vertHold;(a<i+.12+(o?.06:0)||h)&&d&&f.push("up")}else u==="low"&&(a<i+.12||h)&&((n.alt?n.low:n.vert==="dive"&&n.vertT<rt.vertIn+rt.vertHold)||f.push("down"));if(l!==n.lane){const d=i+(Math.abs(l-n.lane)-1)*rt.laneTime*1.3;a<=d&&f.push(l<n.lane?"left":"right")}return f}function wm(n,t){const e=new Map;for(const i of n.obstacles){const s=i.z-n.z;if(i.passed||s<-Ki[i.kind].halfZ||s>t)continue;const r=e.get(i.row)??[];r.push(i),e.set(i.row,r)}return[...e.values()].sort((i,s)=>i[0].z-s[0].z)}function _f(n){return new Set(n.filter(t=>t.kind==="pillar"||t.kind==="spike"||t.kind==="overhang").map(t=>t.lane))}function wv(n,t=.27,e=!0){if(n.mode!=="run")return[];const i=wm(n,n.speed*2.2),s=i[0],r=o=>e?Ev(n,o):[];return s?Sv(n,s,i[1],t,e)??r(s):Tv(n)??r()}function Tv(n){const t=n.gusts.find(i=>!i.taken&&!i.missed&&i.z+i.len>n.z);if(!t||t.z-n.z>n.speed*1.5)return null;if(t.lane!==n.lane)return n.laneT<1?[]:[t.lane<n.lane?"left":"right"];const e=(t.z-n.z)/n.speed;return Em(n,t.v,e)?["up"]:e>.25?[]:t.v>2&&n.vert!=="flare"?["up"]:t.v<-2&&!Tm(n)?["down"]:[]}function Tm(n){return n.alt?n.low:n.vert==="dive"}function Em(n,t,e){return n.alt&&n.low&&n.vert==="cruise"&&Math.abs(t)<=2&&e<.9}function Ev(n,t){const e=n.pickups.find(o=>!o.taken&&o.kind==="lantern"&&o.lane===n.lane&&o.z>n.z);if(e&&n.thermalV<2){const o=(e.z-n.z)/n.speed;if(Em(n,e.v,o))return["up"];if(e.v>2&&n.vert!=="flare"&&o<.2)return["up"];if(e.v<-2&&!Tm(n)&&o<.2)return["down"]}const i=n.pickups.find(o=>!o.taken&&o.z-n.z>n.speed*.35&&o.z-n.z<n.speed*1.2);if(!i||i.lane===n.lane||n.laneT<1)return[];const s=i.lane<n.lane?-1:1;return t&&_f(t).has(n.lane+s)?[]:wm(n,i.z-n.z).some(o=>_f(o).has(n.lane+s))?[]:[s<0?"left":"right"]}const Av=["khau-pha","ha-giang"],Am="skyrun.map";function wc(n){return Av.find(t=>t===n)??null}function Rv(){const n=globalThis;if(n.location){const e=wc(new URLSearchParams(n.location.search).get("map"));if(e)return e;try{return wc(n.localStorage?.getItem(Am))??"khau-pha"}catch{return"khau-pha"}}const t=n.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return wc(t??n.process?.env?.SKYRUN_MAP)??"khau-pha"}const ds=Rv();function Lo(n,t,e){let i=Math.imul(n,374761393)^Math.imul(t,668265263)^Math.imul(e+1,2246822519);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function Mf(n){return n*n*n*(n*(n*6-15)+10)}function ut(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=Mf(n-i),o=Mf(t-s),a=Lo(i,s,e),c=Lo(i+1,s,e),l=Lo(i,s+1,e),u=Lo(i+1,s+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+u)*r*o}function On(n,t,e,i){let s=0,r=1,o=0,a=1;for(let c=0;c<e;c++)s+=ut(n*a,t*a,i+c*31)*r,o+=r,r*=.5,a*=2.03;return s/o}function yf(n,t,e,i){let s=0,r=1,o=0,a=1,c=1;for(let l=0;l<e;l++){const u=1-Math.abs(ut(n*a,t*a,i+l*17)*2-1),f=u*u*c;c=Math.min(1,f*1.6),s+=f*r,o+=r,r*=.5,a*=2.1}return s/o}function Gr(n){return n<0?0:n>1?1:n}function At(n,t,e){const i=Gr((e-n)/(t-n));return i*i*(3-2*i)}function xe(n,t,e){return n+(t-n)*e}const Cv=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],Pv=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],ps={"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:Cv,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:null},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:Pv,profile:{d0:.2,hardAt:4e3,tighten:1.4},routePrefix:"hg",routeVersion:2,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}}},je=ps[ds],Ge=je.cycle,oi=je.offset,fn=1100,Rm=1320,Yl=2450,Cm=2700,Lv=150,fr=1480,No=1770,Nv=[320,640,930];function Iv(n){let t=0;for(const e of Nv)t=Math.max(t,1-At(0,70,Math.abs(n-e)));return t}function bf(n){return n<fn?0:n<Yl?At(fn,Rm,n):1-At(Yl,Cm,n)}const Dv={edge:fn,pullOut:fr,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:bf,dive(n){const t=At(fn+40,fn+380,n)-At(Yl-650,Cm-60,n);return Lv*t},sill(n){return At(760,940,n)*(1-At(1092,1108,n))},village(n,t){return t%2!==0?0:At(1600,1720,n)*(1-At(2380,2500,n))},halfWidth(n){const t=xe(64,30,n<fn?Iv(n):0);return xe(t,430,bf(n))},extraDepth:()=>0,reveal(n){return Gr(At(fr-20,fr+60,n)*(1-At(1640,1760,n)))},drop(n){return At(fn-25,fn+10,n)*(1-At(fr-40,fr+20,n))},clean(n){return At(fn-40,fn-10,n)*(1-At(1600,1690,n))},zone(n,t){return n<fn-60?"gorge":n<Rm?"mouth":t?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},Ji=600,Io=1060,Pm=320,Uv=Pm+13;function Tc(n){return At(2230,2420,n)*(1-At(3420,3520,n))}function Fv(n){if(n<300)return xe(30,170,At(0,140,n));let t=170;return t=xe(t,110,At(900,1150,n)),t=xe(t,60,At(2200,2260,n)),xe(t,30,At(3440,3520,n))}const kv={edge:Ji,pullOut:Io,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:Tc,dive(n){return Pm*(At(Ji+20,Io,n)-At(2215,2740,n))},sill(n){return At(1040,1120,n)*(1-At(2205,2260,n))},village(n){return At(2800,2900,n)*(1-At(3380,3480,n))},halfWidth(n){return xe(Fv(n),430,Tc(n))},extraDepth(n){if(n<2200)return 190*At(20,160,n);const t=Uv-xe(150,240,Tc(n));return xe(190,t,At(2200,2260,n))*(1-At(2760,2900,n))},reveal(n){return At(2190,2270,n)*(1-At(2560,2700,n))},drop(n){return At(Ji-25,Ji+10,n)*(1-At(Io-40,Io+20,n))},clean(n){return At(Ji-40,Ji-10,n)*(1-At(1100,1160,n))+At(2200,2230,n)*(1-At(2700,2760,n))},road(n){return At(60,220,n)*(1-At(1700,1860,n))},roadDepth(n){return 55+28*Math.sin(n/170)+12*Math.sin(n/61+1.3)},cloud(n){return 1-At(-1,120,n)*(1-At(2250,2600,n))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zone(n){return n<Ji?"rim":n<1100?"dive":n<1900?"river":n<2200?"cave":n<2750?"climb":n<3500?"village":"gate"}},Ov={"khau-pha":Dv,"ha-giang":kv},ae=Ov[ds],Si=2*Ge,ii=oi;function jr(n,t){if(n.k===0)return{x:n.x+t*Math.sin(n.th),z:n.z+t*Math.cos(n.th),th:n.th};const e=n.th+n.k*t;return{x:n.x+(Math.cos(n.th)-Math.cos(e))/n.k,z:n.z+(Math.sin(e)-Math.sin(n.th))/n.k,th:e}}function Sf(n,t){const e=[];let i=0,s=0,r=t,o=0;const a=(c,l)=>{if(c<.5)return;const u={k:l,x:i,z:s,th:r},f=jr(u,c),h=jr(u,c/2),d=Math.max(Math.hypot(h.x-i,h.z-s),Math.hypot(h.x-f.x,h.z-f.z));e.push({u0:o,len:c,k:l,x:i,z:s,th:r,bx:h.x,bz:h.z,br:d}),i=f.x,s=f.z,r=f.th,o+=c};for(const c of[1,-1]){const l=c===1?0:Ge;for(const[u,f,h]of n)a(l+u-o,0),a(Math.abs(f)*Math.PI/180*h,c*Math.sign(f)/h);a(l+Ge-o,0)}return{segs:e,x:i,z:s}}function Bv(n){const t=Sf(n,0),{segs:e,x:i,z:s}=Sf(n,-Math.atan2(t.x,t.z));let r=e.length-1;for(;r>0&&e[r].u0>ii;)r--;const o=jr(e[r],ii-e[r].u0),a=e.reduce((u,f)=>u+f.bx,0)/e.length,c=e.reduce((u,f)=>u+f.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-a,u.bz-c)+u.br));return{segs:e,endX:i,endZ:s,ox:o.x,oz:o.z,bx:a,bz:c,br:l}}const _o=Bv(je.arcs);function Ba(n,t,e=_o){const i=n+ii,s=Math.floor(i/Si),r=i-s*Si;let o=e.segs.length-1;for(;o>0&&e.segs[o].u0>r;)o--;const a=jr(e.segs[o],r-e.segs[o].u0);return t.x=a.x+s*e.endX-e.ox,t.z=a.z+s*e.endZ-e.oz,t.yaw=a.th,t}const zv={x:0,z:0,yaw:0},Hv={x:0,z:0,yaw:0};function Gv(n,t=30){return(Ba(n+t,Hv).yaw-Ba(n-t,zv).yaw)/(2*t)}function Vv(n,t,e,i,s,r){let o;if(n.k===0)o=t*Math.sin(n.th)+e*Math.cos(n.th);else{const f=Math.sign(n.k);let d=Math.atan2(f*(e+Math.sin(n.th)/n.k),-f*(t-Math.cos(n.th)/n.k))-n.th;d-=2*Math.PI*Math.round((d-n.k*n.len/2)/(2*Math.PI)),o=d/n.k}const a=o>=i-.01&&o<=s+.01;o=Math.min(s,Math.max(i,o));const c=jr(n,o),l=t-(c.x-n.x),u=e-(c.z-n.z);return r.s=o,r.dist=Math.hypot(l,u),r.lat=l*Math.cos(c.th)-u*Math.sin(c.th),a}const dr={s:0,lat:0,dist:0};function Wv(n,t,e,i,s,r=_o){s.dist=1/0;const o=Math.floor((e+ii)/Si),a=Math.floor((i+ii)/Si);for(let c=o;c<=a;c++){const l=c*Si-ii;for(const u of r.segs){const f=l+u.u0;f>i||f+u.len<e||(Vv(u,n-c*r.endX+r.ox-u.x,t-c*r.endZ+r.oz-u.z,Math.max(0,e-f),Math.min(u.len,i-f),dr),dr.dist<s.dist&&(s.dist=dr.dist,s.s=f+dr.s,s.lat=dr.lat))}}return s}function ze(n){return((n+oi)%Ge+Ge)%Ge}function Yi(n){return Math.floor((n+oi)/Ge)}const Vr=9.5;function Hn(n){return ae.village(ze(n),Yi(n))}function $i(n){return Hn(n)>.97}function Cn(n){return ae.openness(ze(n))}function Vn(n){return 260+30*Math.sin(n/1700)}function Pe(n){return Vn(n)-ae.dive(ze(n))}function oh(n){return ae.sill(ze(n))}function wi(n){return(Pe(n+2)-Pe(n-2))/4}function Lm(n,t){return Math.max(-1.1,Math.min(1.1,Math.atan(t*t*Gv(n)/9.8)))}const Hs={x:0,z:0,yaw:0};function hn(n){return Ba(n,Hs).yaw}function ce(n,t,e,i){return Ba(n,Hs),i.x=Hs.x+t*Math.cos(Hs.yaw),i.y=Pe(n)+e,i.z=Hs.z-t*Math.sin(Hs.yaw),i}function Zs(n){return ae.halfWidth(ze(n))}function Mo(n){return ae.extraDepth(ze(n))}function Zl(n){return Vn(n)-xe(150,240,Cn(n))-Mo(n)}function Xv(n){return ae.reveal(ze(n))}function qv(n){return ae.drop(ze(n))}function Nm(n){return ae.clean(ze(n))}function $v(n,t){const e=(Pe(n+4)-Pe(n-4))/8,i=(Pe(n+4)-2*Pe(n)+Pe(n-4))/16;return 1+t*t*i/(Math.pow(1+e*e,1.5)*9.8)}const Im=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ... ..o ... .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Kv={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},Yv=8,Dm=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function za(n){return n.split(" ")}function Ti(n){let t=n.seed=n.seed+1831565813|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zv(n,t,e,i=1){const s=mv;let r=0;for(;r<s.length-1&&n>s[r+1][0];)r++;const o=s[r],a=s[Math.min(r+1,s.length-1)],c=a[0]>o[0]?Math.max(0,Math.min(1,(n-o[0])/(a[0]-o[0]))):1,l=(e?.5:1)*(t?.6+.3*Math.min(1,n):1)*i;return{p3:(o[1]+(a[1]-o[1])*c)*l,p2:(o[2]+(a[2]-o[2])*c)*l}}const Jv=new Set(["o","u","d"]),Qv=/[BLHO]/;function jv(n,t,e,i,s,r,o){if(!t.length)return;for(let M=i-3;M<=i+3;M++)if(M!==i&&Qv.test(e[M]??""))return;const{p3:a,p2:c}=Zv(xo(Math.max(0,s),n.diff),r,o,n.diff.tighten),l=Ti(n),u=l<c?2:l<c+a?3:0;if(!u||xf(t)<=u)return;const f=t.some(M=>M.kind==="bridge"||M.kind==="ridge");if(f&&o)return;const h=M=>t.some(b=>(b.kind==="pillar"||b.kind==="spike"||b.kind==="overhang")&&b.lane===M),d=[-1,0,1].filter(M=>!h(M)&&(f||e[i][M+1]===".")&&![i-2,i-1,i+1].some(b=>Jv.has(e[b]?.[M+1]??""))),p=f?["pillar"]:o?["spike"]:["pillar","spike"],v=[[]];for(const M of d){const b=[];for(const x of v){b.push(x);for(const _ of p)b.push([...x,{kind:_,lane:M}])}v.splice(0,v.length,...b)}const g=M=>[-1,0,1].every(b=>[...t,...M].some(x=>(x.kind==="pillar"||x.kind==="overhang")&&x.lane===b)),m=v.filter(M=>M.length&&xf([...t,...M])===u&&!g(M));m.length&&t.push(...m[Math.floor(Ti(n)*m.length)])}const wf=700;function Ha(n,t){const e=Math.max(0,t);return bm(e,n.diff)*rt.cellSeconds*pv(xo(e,n.diff))}function Jl(n,t,e){const i=xo(Math.max(0,e),n.diff),s=fv(i),r=t.filter(f=>f.tier<=s&&!n.lastBag.includes(f.id)),o=r.length?r:t.filter(f=>f.tier<=s),a=dv(i),c=o.map(f=>(f.tier===s?1.4:1)/(1+a*f.tier));let l=Ti(n)*c.reduce((f,h)=>f+h,0),u=o[0];for(let f=0;f<o.length;f++)if(l-=c[f],l<=0){u=o[f];break}return n.lastBag.push(u.id),n.lastBag.length>4&&n.lastBag.shift(),u}const Tf={o:0,u:rt.flareHeight,d:-5.5},tx={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function Wr(n,t,e,i){const s=za(t.cells),r=Ha(n,e);let o=!1;const a=Math.floor((e+s.length*r)/wf),c=a>Math.floor(e/wf)&&e>300&&gv(xo(e,n.diff),a);return s.forEach((l,u)=>{const f=e+(u+.5)*r,h=n.rowId++,d=$i(f),p=[];if(l==="HHH"||l==="LLL")p.push({kind:l==="HHH"?"bridge":"ridge",lane:0});else for(let m=-1;m<=1;m++){const M=tx[l[m+1]];M&&p.push({kind:d&&M==="pillar"?"spike":M,lane:m})}jv(n,p,s,u,f,i,d);const v=m=>{n.obstacles.push({id:n.nextId++,kind:m.kind,lane:m.lane,z:f,open:i,row:h,passed:!1})};if(l==="HHH"||l==="LLL"){p.forEach(v);return}const g=p.length>0;for(let m=-1;m<=1;m++){const M=l[m+1],b=p.filter(x=>x.lane===m);if(b.forEach(v),!b.length&&M in Tf){const x=s[u-1]==="HHH"||s[u-2]==="HHH",_=n.alt&&M==="o"&&x?rt.flareHeight:Tf[M];n.pickups.push({id:n.nextId++,kind:"lantern",lane:m,v:_,z:f,taken:!1})}}if(c&&!o&&g){const m=[-1,0,1].filter(M=>l[M+1]==="."&&Hr(p,M,Sm));if(m.length){const M=m[Math.floor(Ti(n)*m.length)],b=Ti(n),x=n.alt?b<.45?"thermal":b<.75||n.hp>=rt.maxHp?"smoke":"shield":b<.6||n.hp>=rt.maxHp?"thermal":"shield";n.pickups.push({id:n.nextId++,kind:x,lane:M,v:0,z:f,taken:!1}),o=!0}}}),n.chunksSpawned++,e+s.length*r}const Um=(...n)=>Im.filter(t=>n.includes(t.id)),Fm=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],ex=[...Um("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...Fm.filter(n=>n.id!=="luon-mai")],nx=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...Um("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...Fm],ix=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],sx=Dm,rx=5;function ox(n){const t=["o..",".o.","..o"][n+1],e=[".BB","B.B","BB."][n+1];return{id:`cong-troi-${n}`,tier:0,cells:`... ... ${t} ${t} ${t} ${e} ${t} ... ...`}}function ah(n){n.mult=Math.min(rt.multMax,1+n.multNear+n.multLantern)}function ch(n,t,e){n.bonus+=e,n.parts[t]+=e}function ax(n,t){const e=rt.lanternMultStep*n.streak;e>=n.multLantern?n.multLantern=e:n.multLantern+=(e-n.multLantern)*(1-Math.exp(-.016666666666666666/rt.lanternMultTau)),ah(n)}function km(n){n.streak=0}const cx=[0,rt.flareHeight,-5.5];function Om(n,t,e){const i=t+e[0];if(n.gusts.some(o=>o.z===i))return;let s=Math.floor(Ti(n)*3)-1,r=0;e.forEach((o,a)=>{const c=Ti(n),l=Ti(n);a>0&&(s=Math.max(-1,Math.min(1,s+(c<.35?-1:c<.7?1:0))));let u=a===0?0:cx[l<.6?0:l<.8?1:2];n.alt&&u===0&&r<-2&&(u=rt.flareHeight),r=u,n.gusts.push({id:n.nextId++,index:a,count:e.length,lane:s,v:u,z:t+o,len:rt.gustLen,taken:!1,missed:!1})})}function lx(n){return n.thermalV+n.windLift}function ux(n,t,e,i){if(!i){n.tailwind=0,n.windLift=0,n.liftT=0;return}n.tailwind*=Math.exp(-t/(e?rt.surgeTauNearRow:rt.tailwindTau)),e&&(n.liftT=0),n.liftT=Math.max(0,n.liftT-t);const s=n.liftT>0?2.2:e?2.5:1.2;n.windLift+=((n.liftT>0?rt.gustLift:0)-n.windLift)*(1-Math.exp(-t*s))}function hx(n){for(const t of n.gusts){if(t.taken||t.missed)continue;if(n.z<t.z)break;if(n.z>t.z+t.len){t.missed=!0,n.gustChain=0,n.events.push({type:"gust-miss"});continue}if(Math.abs(n.x-pn(t.lane))>rt.gustRadiusX||Math.abs(n.moveV-t.v)>rt.gustRadiusV)continue;t.taken=!0,t.index===0&&(n.gustChain=0),n.gustChain++,n.gustsTaken++,n.tailwind=Math.min(rt.tailwindMax,n.tailwind+rt.tailwindPerGust),n.liftT=rt.gustLiftTime;const e=t.index===t.count-1&&n.gustChain===t.count;ch(n,"gust",(rt.gustScore+(e?rt.gustChainScore:0))*n.mult),n.events.push({type:"gust",chain:n.gustChain,full:e})}}function fx(n,t){n.gusts.length&&n.gusts[0].z+n.gusts[0].len<t&&(n.gusts=n.gusts.filter(e=>e.z+e.len>=t))}const dx=[{kind:"rows",from:40,to:560,pool:ex,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:nx,open:!1},{kind:"rows",from:1990,to:2110,pool:ix,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:sx,open:!0},{kind:"gate",at:3560}];function px(n,t){const e=ze(t),i=t-e;for(const s of dx){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return i+s.from+.5;const a=Jl(n,s.pool,t);return e+za(a.cells).length*Ha(n,t)>s.to?i+s.to+.5:Wr(n,a,t,s.open)}if(e>=s.at)continue;if(s.kind==="gusts")return Om(n,i,s.phases),i+s.at+.5;const r=Math.floor(Ti(n)*3)-1,o=Math.max(t,i+s.at-(rx+.5)*Ha(n,t));return Math.max(Wr(n,ox(r),o,!1),i+s.at+.5)}return i+Ge+.5}const mx=[1140,1225,1310,1395,1480];function gx(n,t){const e=ze(t),i=Ha(n,t),s=fn-30-(Yv+.5)*i;if(e<40)return t+(40-e)+.5;if(e<s){const a=Jl(n,Im,t);return e+za(a.cells).length*i>s?t+(s-e)+.5:Wr(n,a,t,!1)}if(e<fn){let a=Wr(n,Kv,t,!1);Om(n,t-e,mx);const c=ze(a);return c>fn&&c<No&&(a+=No-c+.5),a}if(e<No)return t+(No-e)+.5;const r=Jl(n,Dm,t);return e+za(r.cells).length*i>Ge-60?t+(Ge-e)+40:Wr(n,r,t,!0)}const vx={"khau-pha":gx,"ha-giang":px},xx=vx[ds];function _x(n){for(;n.nextChunkZ<n.z+rt.spawnAheadMeters;)n.nextChunkZ=xx(n,n.nextChunkZ);const t=n.z-rt.despawnBehind;n.obstacles.length&&n.obstacles[0].z<t&&(n.obstacles=n.obstacles.filter(e=>e.z>=t)),n.pickups.length&&n.pickups[0].z<t&&(n.pickups=n.pickups.filter(e=>e.z>=t)),fx(n,t)}const Bm=1e9;function Mx(n){const t=rt.thermalTime-.6;for(let e=.5;e<t;e+=.22){const i=n.z+n.speed*1.08*e,s=new Set(n.obstacles.filter(a=>a.kind==="pillar"&&Math.abs(a.z-i)<12).map(a=>a.lane)),r=[-1,0,1].filter(a=>!s.has(a));if(!r.length)continue;const o=r.includes(n.lane)?n.lane:r[0];n.pickups.push({id:Bm+n.trailIds++,kind:"lantern",lane:o,v:rt.thermalHeight,z:i,taken:!1})}n.pickups.sort((e,i)=>e.z-i.z)}function yx(n,t){return n.thermalV>8&&t.id<Bm?!1:!n.pickups.some(e=>e!==t&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-t.z)<.5)}function bx(n){for(const t of n.pickups){if(t.taken)continue;const e=t.z-n.z;if(e>3)break;if(e<-3){t.kind==="lantern"&&e>-3-n.speed/60&&yx(n,t)&&km(n);continue}Math.abs(n.x-pn(t.lane))<rt.lanternPickRadius&&Math.abs(n.v-t.v)<rt.lanternPickRadius&&(t.taken=!0,t.kind==="lantern"?(n.lanterns++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak),ch(n,"lantern",rt.lanternScore*n.mult*(n.smokeT>0?rt.smokeLanternMul:1)),n.events.push({type:"lantern",streak:n.streak,id:t.id})):(t.kind==="thermal"?(n.thermalT=rt.thermalTime,n.low=!1,Mx(n)):t.kind==="smoke"?(n.smokeT=rt.smokeTime,n.smokes++):n.hp=Math.min(rt.maxHp,n.hp+1),n.events.push({type:"booster",kind:t.kind})))}}function zm(n,t){const e=Math.sign(t-n.lane);n.lane=t,n.laneT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert=n.vert,n.events.push({type:"lane",dir:e})}function Sx(n,t){n.steerX=Math.max(-7,Math.min(rt.steerMax,t));const e=Hm(n.lane,n.steerX);e!==n.lane&&zm(n,e)}function Hm(n,t){return Math.abs(t-pn(n))<=rt.laneGap*.57?n:Math.max(-1,Math.min(1,Math.round(-t/rt.laneGap)))}function Gm(n,t,e,i,s,r){const o=n-e,a=t+i*o,c=Math.exp(-i*s);return r.x=e+(o+a*s)*c,r.vel=(t-i*a*s)*c,r}function Vm(){return rt.vertIn+rt.vertHold+rt.vertOut}const Ec={x:0,vel:0};function wx(n,t){n.vert!=="cruise"&&(!n.alt&&n.holdDive&&n.vertT>rt.vertIn&&n.vertT<rt.vertIn+rt.vertHold&&(n.vertT=rt.vertIn+.01),n.vertT+=t,n.vertT>=(n.alt&&n.vert==="dive"?rt.lowTransition:Vm())&&(n.vert="cruise",n.vertT=0));const e=n.vert!=="cruise"&&n.vertT<rt.vertIn+rt.vertHold,i=n.low?-5.5:0,s=e?n.vert==="flare"?rt.flareHeight:-5.5:i;Gm(n.moveV,n.moveVel,s,e||n.low?rt.vertOmegaIn:rt.vertOmegaOut,t,Ec),n.moveV=Ec.x,n.moveVel=Ec.vel}const Ac={x:0,vel:0};function Rc(n,t=!1,e=je.profile){return{mode:"ready",seed:n,alt:t,diff:e,low:!1,smokeT:0,smokes:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],hp:rt.maxHp,stunT:0,hurtRow:-1,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:Yi(0)*2+1,lastBag:[],events:[]}}function Tx(n){n.mode="run",n.nextChunkZ=Math.max(n.nextChunkZ,n.z+220)}function Ef(n,t){if(t==="left"||t==="right"){const i=t==="left"?-1:1;if(n.laneT<rt.laneTime*.6)return!1;const s=Math.max(-1,Math.min(1,n.lane+i));return n.steerX=pn(s),s!==n.lane&&zm(n,s),!0}const e=t==="up"?"flare":"dive";return n.alt&&e==="dive"&&n.low?!0:n.vert===e&&n.vertT<Vm()-rt.vertOut?!1:(n.alt&&(n.low=e==="dive"),n.vert=e,n.vertT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert="cruise",n.events.push({type:"vert",kind:e}),!0)}function Ex(n,t){if(t.row!==n.hurtRow){if(n.hp-=vv(t,n.steerX,n.low?"dive":n.vert)?1:n.hp,n.hp>0){n.hurtRow=t.row,n.stunT=rt.stunTime,n.hitstopT=rt.hitstop,n.surge=rt.surgeMin,n.combo=0,n.multNear=0,km(n),ah(n),n.events.push({type:"hurt",hp:n.hp,kind:t.kind});return}n.hp=0,n.mode="crash",n.crashT=0,n.hitstopT=rt.hitstop*2,n.events.push({type:"crash",kind:t.kind})}}function Ax(n,t,e,i,s=null){if(n.events.length=0,n.time+=i,n.mode==="over")return;if(n.mode==="crash"){n.crashT+=i,n.z+=n.speed*i*Math.max(0,1-n.crashT*1.5),n.crashT>=rt.crashSeconds&&(n.mode="over");return}if(n.hitstopT>0){n.hitstopT-=i;return}const r=n.mode==="run";r&&s!==null&&Sx(n,s);for(const d of r?t:[])Ef(n,d)||(n.buffered=d,n.bufferT=rt.bufferTime);n.buffered&&(n.bufferT-=i,(Ef(n,n.buffered)||n.bufferT<=0)&&(n.buffered=null)),n.holdDive=e&&n.vert==="dive";const o=n.vert==="dive"?rt.diveSpeedMul:n.vert==="flare"?rt.flareSpeedMul:1,a=Math.sin(Math.atan(wi(n.z))),c=n.obstacles.some(d=>!d.passed&&d.z>n.z&&d.z<n.z+n.speed*2.5),l=n.surge>0&&c?rt.surgeTauNearRow:rt.surgeTau;n.surge+=(-9.8*a-n.surge/l)*i,n.surge=r?Math.max(rt.surgeMin,Math.min(rt.surgeMax,n.surge)):0,ux(n,i,c,r);const u=r?bm(n.z,n.diff)*o+n.surge+n.tailwind:24;n.speed+=(u-n.speed)*(1-Math.exp(-i*3)),n.z+=n.speed*i,r&&_x(n);const f=Yi(n.z)*2+(Cn(n.z)>.5?1:0);f!==n.sectionIndex&&(n.sectionIndex=f,n.events.push({type:"section",open:f%2===1,index:f})),n.laneT=Math.min(1,n.laneT+i/rt.laneTime),Gm(n.x,n.xVel,n.steerX,rt.laneOmega,i,Ac),n.x=Ac.x,n.xVel=Ac.vel,wx(n,i),n.thermalT>0&&n.thermalT<=i&&n.obstacles.some(d=>(d.kind==="bridge"||d.kind==="ridge"||d.kind==="overhang")&&d.z>n.z&&d.z<n.z+n.speed*2.2)&&(n.thermalT=i*2),n.thermalT=Math.max(0,n.thermalT-i);const h=n.thermalT>0?rt.thermalHeight:0;if(n.thermalV+=(h-n.thermalV)*(1-Math.exp(-i*(n.thermalT>0?2.5:1.8))),n.v=n.thermalV+n.windLift+n.moveV,n.stunT=Math.max(0,n.stunT-i),r&&(n.smokeT=Math.max(0,n.smokeT-i)),r){for(const d of n.obstacles)if(!(d.passed||d.z-n.z>6)){if(Oa(d,n.x,n.v,d.z-n.z)){if(d.passed=!0,Ex(n,d),n.mode==="crash")return;continue}xv(d,n.z)&&(d.passed=!0,n.time-n.dodgeTime<=rt.nearMissWindow+.1&&Oa(d,n.dodgeX,n.alt?n.dodgeV:n.thermalV,0)&&(n.combo++,n.comboT=0,n.multNear=rt.multStep*n.combo,ah(n),ch(n,"nearMiss",25*n.mult),n.events.push({type:"near-miss",combo:n.combo,kind:d.kind})))}bx(n),hx(n),n.comboT+=i,n.comboT>rt.comboBreak&&n.combo>0&&(n.combo=0,n.multNear=0),ax(n),n.score+=n.speed*i*n.mult}}function Js(n){return Math.floor(n.score+n.bonus)}const Rx=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss"],Wm=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi"],Af={"wind-loop":.6},Cc=new URLSearchParams(location.search).get("voice"),Cx=Cc&&/^[a-z_]+$/.test(Cc)?`audio-opts/voice/${Cc}`:"audio/voice",Px=n=>Wm.includes(n)?`${Cx}/${n}.mp3`:`audio/${n}.mp3`,Xm=new Map;for(const n of[...Rx,...Wm])Xm.set(n,fetch(Px(n)).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null));function Lx(n){const t=new Map;for(const[e,i]of Xm)i.then(async s=>{if(!s)return;const r=await n.decodeAudioData(s.slice(0)).catch(()=>null);r&&t.set(e,Af[e]?Ix(n,r,Af[e]):r)});return{get:e=>t.get(e),play(e,i,s={}){const r=t.get(e);if(!r)return null;const o=n.createBufferSource();o.buffer=r,o.loop=s.loop??!1,o.playbackRate.value=s.rate??1;const a=n.createGain();a.gain.value=s.vol??1;let c=o.connect(a);if(s.pan){const l=n.createStereoPanner();l.pan.value=s.pan,c=c.connect(l)}return c.connect(i),o.start(),o}}}function Nx(n,t){const e=Math.floor(t*n.sampleRate),i=n.length-e;if(i<=e)return n.duration;for(let s=0;s<n.numberOfChannels;s++){const r=n.getChannelData(s);for(let o=0;o<e;o++){const a=o/e;r[o]=r[o]*Math.sqrt(a)+r[i+o]*Math.sqrt(1-a)}}return i/n.sampleRate}function Ix(n,t,e){const i=Math.floor(e*t.sampleRate),s=t.length-i;if(s<=i)return t;const r=n.createBuffer(t.numberOfChannels,s,t.sampleRate);for(let o=0;o<t.numberOfChannels;o++){const a=t.getChannelData(o),c=r.getChannelData(o);c.set(a.subarray(0,s));for(let l=0;l<i;l++){const u=l/i;c[l]=a[l]*Math.sqrt(u)+a[s+l]*Math.sqrt(1-u)}}return r}const Ga=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8,map:"ha-giang"},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9}],Pc=n=>Ga.find(t=>t.id===n),qm="skyrun.settings",$m="skyrun.sound";function Km(){try{const n=JSON.parse(localStorage.getItem($m)??"{}");if(n.v===2)return{sfx:n.sfx!==!1,music:n.music!==!1};const t=n.muted===!0;return{sfx:!t,music:!t&&n.music!==!1}}catch{return{sfx:!0,music:!0}}}function Dx(n){try{localStorage.setItem($m,JSON.stringify({v:2,...n}))}catch{}}const Ux=["on","dim","off"];function to(){try{const n=JSON.parse(localStorage.getItem(qm)??"{}");return{music:typeof n.music=="string"?n.music:"shuffle",ghosts:Ux.includes(n.ghosts)?n.ghosts:"on"}}catch{return{music:"shuffle",ghosts:"on"}}}function Ym(n){try{localStorage.setItem(qm,JSON.stringify({...to(),...n}))}catch{}}const pr=3,Fx=-13.1,kx=20,Lc=n=>{const t=Ga.filter(i=>i.id!==n&&(!i.map||i.map===ds));return(n===null?t.find(i=>i.map===ds):void 0)??t[Math.floor(Math.random()*t.length)]??Ga[0]};function Ox(n,t){const e=new Map;let i=!1;ym.then(()=>i=!0);let s=!1,r=to().music,o=Lc(null),a=null;const c=d=>{let p=e.get(d.id);return p||e.set(d.id,p={bytes:lv(d.file),buf:null,loop:0,decoding:!1}),p},l=(...d)=>{for(const p of e.keys())d.includes(p)||e.delete(p)},u=(d,p)=>{const v=c(d);return v.buf?!0:(p&&!v.decoding&&(v.decoding=!0,v.bytes.then(async g=>{const m=g&&await n.decodeAudioData(g).catch(()=>null);m&&e.get(d.id)===v&&(v.loop=Nx(m,pr),v.buf=m)})),!1)},f=d=>Math.min(1.6,10**((Fx-d.lufs)/20)),h=(d,p)=>{const v=n.currentTime,g=e.get(d.id),m=n.createBufferSource();m.buffer=g.buf,m.loop=!0,m.loopEnd=g.loop;const M=n.createGain();if(M.gain.setValueAtTime(0,v),M.gain.linearRampToValueAtTime(f(d),v+p),m.connect(M).connect(t),m.start(v,pr),a){const b=a.gain.gain;b.cancelScheduledValues(v),b.setValueAtTime(b.value,v),b.linearRampToValueAtTime(0,v+p),a.src.stop(v+p+.05)}a={t:d,src:m,gain:M,at:v-pr,loop:g.loop},o=r==="shuffle"?Lc(d.id):d,l(d.id,o.id),c(o)};return{tick(d){if(!d)return;const p=r==="shuffle"?null:Pc(r)??null;if(!a||p&&p.id!==a.t.id){const g=p??o;(a||i||s)&&u(g,!0)&&h(g,1);return}if(p||o.id===a.t.id)return;const v=a.loop-(n.currentTime-a.at)%a.loop;u(o,v<kx)&&v<pr&&h(o,pr)},choice:()=>r,setChoice(d){r=d==="shuffle"||Pc(d)?d:"shuffle",Ym({music:r}),s=!0,!(r!=="shuffle"||!a)&&(o=Lc(a.t.id),l(a.t.id,o.id),c(o))},playing:()=>a?.t??null,loading:()=>{const d=r==="shuffle"?a?null:o:Pc(r)??null;return d&&d.id!==a?.t.id&&!e.get(d.id)?.buf?d:null},held:()=>[...e].map(([d,p])=>p.buf?`${d}:pcm`:d)}}const yo=Ge*je.dayCycles,Va=je.dayCutPhase-oi+yo,Zm={"khau-pha":"Khau Phạ","ha-giang":"Hà Giang"};function Jm(n){return n<Va?1:2+Math.floor((n-Va)/yo)}function Ql(n){return n<=1?0:Va+(n-2)*yo}const bo={value:0};let Qm="khau-pha";function Bx(n){Qm=n,bo.value=n==="ha-giang"?1:0}const Wa=()=>Qm,So=()=>bo.value,lh="uniform float uRegionHg;";function jm(n,t=!1){return{dusk:(t?.34:.62)*(1-At(0,.08,n))+.5*At(.52,.66,n)+.5*At(.68,.78,n)-.38*At(.95,1,n),morn:At(.03,.14,n)*(1-At(.3,.45,n))}}function zx(n){const t=Jm(n),e=Ql(t),i=Math.min(1,Math.max(0,(n-e)/(t===1?Va:yo)));return{day:t,region:Wa(),u:i,...jm(i,t===1)}}function Hx(n){return n.u>=.95?"Rạng sáng":n.u>=.74?"Đêm đèn trời":n.u>=.56?"Hoàng hôn":n.u<.1?"Bình minh":n.u<.4?"Buổi sáng":"Chiều vàng"}function t0(n){const t=n.u<.5?0:n.dusk>=.98?2:n.dusk>=.48?1:0;return(n.day-1)*3+t}function Gx(n){let t=null;const e=s=>{t=s===null?null:{day:1,region:Wa(),u:s,...jm(s,!0)}},i=s=>{t=s===null?null:{day:1,region:Wa(),u:.52+.26*s,dusk:s,morn:0}};return n.has("dusk")&&i(Number(n.get("dusk"))),n.has("clock")&&e(Number(n.get("clock"))),{at:s=>t??zx(s),forceU:e,forceDusk:i}}const Vx={rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},Rf=[0,2,4,7,9],Do=.32,Cf=.85,Wx=.6;function Xx(){let n=null,t=null,e=null,i=null,s=null,r=null,o=null,a=null,c=null,l=null;const u=Km();let f=u.sfx,h=u.music;const d=()=>Dx({sfx:f,music:h});let p=0,v=0,g=null,m=0;const M=()=>{if(n){n.state==="suspended"&&n.resume();return}n=new AudioContext,t=Lx(n);const S=n.createDynamicsCompressor();S.threshold.value=-10,S.ratio.value=4,S.connect(n.destination),e=n.createGain(),e.gain.value=.9,e.connect(S);const w=y=>{const T=n.createGain();return T.gain.value=y,T.connect(e),T};i=w(f?1:0),s=w(f?Cf:0),r=w(h?Do:0),l=Ox(n,r),setInterval(()=>l?.tick(h),500),a=n.createBiquadFilter(),a.type="lowpass",o=n.createGain(),o.gain.value=0,a.connect(o).connect(i)};M();for(const S of["keydown","pointerdown","touchstart","touchend","click"])window.addEventListener(S,M);const b=(S,w)=>{t&&i&&t.play(S,i,w)},x=(S,w)=>{if(!n||!t||!s||!r||!f)return;const y=n.currentTime;if(y<p&&w<=v)return;const T=t.get(S);T&&(g?.stop(),g=t.play(S,s),p=y+T.duration,v=w,h&&(r.gain.setTargetAtTime(Do*Wx,y,.05),r.gain.setTargetAtTime(Do,y+T.duration,.3)))},_=S=>1+(Math.random()*2-1)*S;return{update(S,w,y){if(!n||!t||!o||!a)return;!c&&t.get("wind-loop")&&(c=t.play("wind-loop",a,{loop:!0})),l?.tick(h);const T=n.currentTime;c&&c.playbackRate.setTargetAtTime(.85+.35*S,T,.2),a.frequency.setTargetAtTime(900+6e3*S,T,.15),o.gain.setTargetAtTime(w?.35+1.1*S*S:.2,T,.25);const R=t0(y);w&&R>m&&R%3&&x(R%3===1?"chang-vang":"dem-hoi",1),m=w?Math.max(m,R):0},events(S,w){for(const y of S)if(y.type==="lantern"){const T=Rf[(y.streak-1)%Rf.length];b("lantern-chime",{vol:.55,rate:Math.pow(2,T/12)}),y.streak===10&&x("den-troi-chuoi",1)}else if(y.type==="near-miss")b("near-miss",{vol:.8,rate:_(.08)*(1+.02*Math.min(10,y.combo))}),y.combo===3?x("suot-dep",1):y.combo===6&&x("qua-dinh",1);else if(y.type==="lane")b("lane-whoosh",{vol:.25,rate:_(.1),pan:.5*y.dir});else if(y.type==="vert")b(y.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:_(.05)});else if(y.type==="gust")b("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(y.chain-1))/12)}),y.full&&b("thermal-boost",{vol:.7});else if(y.type==="booster"){const[T,R,C]=y.kind==="thermal"?["thermal-boost",.8,"luong-nhiet"]:y.kind==="smoke"?["smoke-hiss",.75,null]:["shield-pickup",1.4,"du-du-phong"];b(T,{vol:R}),C&&x(C,2)}else y.type==="hurt"?b("shield-hit",{vol:1.2,rate:_(.05)}):y.type==="crash"?b("crash",{vol:1.3}):y.type==="section"&&w&&!y.open&&!ae.zoneNames&&x("khe-da",1)},reveal(){b("reveal-stinger",{vol:.6}),ae.zoneNames||x("thung-lung",1)},zone(S){const w=Vx[S];w&&x(w,1)},runStart(){M(),b("run-start",{vol:.8}),x("cat-canh",2)},over(S){b("game-over",{vol:.5}),x(S?"ky-luc":"ha-canh",3)},toggleSfx(){return M(),f=!f,i&&s&&n&&(i.gain.setTargetAtTime(f?1:0,n.currentTime,.05),s.gain.setTargetAtTime(f?Cf:0,n.currentTime,.05)),d(),f},toggleMusic(){return M(),h=!h,r&&n&&(r.gain.cancelScheduledValues(n.currentTime),r.gain.setTargetAtTime(h?Do:0,n.currentTime,.3)),d(),h},prefs:()=>({sfx:f,music:h}),music:()=>l}}const uh="186",qx=0,Pf=1,$x=2,Ea=1,Kx=2,Ur=3,Ai=0,Qe=1,we=2,si=0,Xr=1,mn=2,Lf=3,Nf=4,Yx=5,Gs=100,Zx=101,Jx=102,Qx=103,jx=104,t_=200,e_=201,n_=202,i_=203,e0=204,n0=205,s_=206,r_=207,o_=208,a_=209,c_=210,l_=211,u_=212,h_=213,f_=214,jl=0,tu=1,eu=2,eo=3,nu=4,iu=5,su=6,ru=7,hh=0,d_=1,p_=2,ri=0,fh=1,dh=2,ph=3,cc=4,mh=5,gh=6,vh=7,If="attached",m_="detached",i0=300,ms=301,Qs=302,Nc=303,Ic=304,lc=306,js=1e3,ei=1001,Xa=1002,Ve=1003,s0=1004,Fr=1005,We=1006,Aa=1007,yi=1008,Mn=1009,r0=1010,o0=1011,no=1012,xh=1013,ai=1014,En=1015,dn=1016,_h=1017,Mh=1018,io=1020,a0=35902,c0=35899,l0=1021,u0=1022,An=1023,Ri=1026,cs=1027,yh=1028,bh=1029,gs=1030,Sh=1031,wh=1033,Ra=33776,Ca=33777,Pa=33778,La=33779,ou=35840,au=35841,cu=35842,lu=35843,uu=36196,hu=37492,fu=37496,du=37488,pu=37489,qa=37490,mu=37491,gu=37808,vu=37809,xu=37810,_u=37811,Mu=37812,yu=37813,bu=37814,Su=37815,wu=37816,Tu=37817,Eu=37818,Au=37819,Ru=37820,Cu=37821,Pu=36492,Lu=36494,Nu=36495,Iu=36283,Du=36284,$a=36285,Uu=36286,so=2300,ro=2301,Dc=2302,Df=2303,Uf=2400,Ff=2401,kf=2402,g_=2500,v_=0,h0=1,Fu=2,x_=3200,Ka=0,__=1,qi="",He="srgb",yn="srgb-linear",Ya="linear",fe="srgb",Uc=7680,M_=519,y_=512,b_=513,S_=514,Th=515,w_=516,T_=517,Eh=518,E_=519,f0=35044,Of=35048,Bf="300 es",ni=2e3,oo=2001;function A_(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function R_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ao(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function C_(){const n=ao("canvas");return n.style.display="block",n}const zf={};function Za(...n){const t="THREE."+n.shift();console.log(t,...n)}function d0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Dt(...n){n=d0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Vt(...n){n=d0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function qs(...n){const t=n.join(" ");t in zf||(zf[t]=!0,Dt(...n))}function P_(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const L_={[jl]:tu,[eu]:su,[nu]:ru,[eo]:iu,[tu]:jl,[su]:eu,[ru]:nu,[iu]:eo};class xs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hf=1234567;const qr=Math.PI/180,tr=180/Math.PI;function Rn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function te(n,t,e){return Math.max(t,Math.min(e,n))}function Ah(n,t){return(n%t+t)%t}function N_(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function I_(n,t,e){return n!==t?(e-n)/(t-n):0}function $r(n,t,e){return(1-e)*n+e*t}function D_(n,t,e,i){return $r(n,t,1-Math.exp(-e*i))}function U_(n,t=1){return t-Math.abs(Ah(n,t*2)-t)}function F_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function k_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function O_(n,t){return n+Math.floor(Math.random()*(t-n+1))}function B_(n,t){return n+Math.random()*(t-n)}function z_(n){return n*(.5-Math.random())}function H_(n){n!==void 0&&(Hf=n);let t=Hf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function G_(n){return n*qr}function V_(n){return n*tr}function W_(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function X_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function q_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $_(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),h=o((t-i)/2),d=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*p,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*p,a*l);break;case"ZYZ":n.set(c*p,c*d,a*u,a*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ge(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const K_={DEG2RAD:qr,RAD2DEG:tr,generateUUID:Rn,clamp:te,euclideanModulo:Ah,mapLinear:N_,inverseLerp:I_,lerp:$r,damp:D_,pingpong:U_,smoothstep:F_,smootherstep:k_,randInt:O_,randFloat:B_,randFloatSpread:z_,seededRandom:H_,degToRad:G_,radToDeg:V_,isPowerOfTwo:W_,ceilPowerOfTwo:X_,floorPowerOfTwo:q_,setQuaternionFromProperEuler:$_,normalize:ge,denormalize:Bn};class ot{static{ot.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ae{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(f!==v||c!==h||l!==d||u!==p){let g=c*h+l*d+u*p+f*v;g<0&&(h=-h,d=-d,p=-p,v=-v,g=-g);let m=1-a;if(g<.9995){const M=Math.acos(g),b=Math.sin(M);m=Math.sin(m*M)/b,a=Math.sin(a*M)/b,c=c*m+h*a,l=l*m+d*a,u=u*m+p*a,f=f*m+v*a}else{c=c*m+h*a,l=l*m+d*a,u=u*m+p*a,f=f*m+v*a;const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+u*f+c*d-l*h,t[e+1]=c*p+u*h+l*f-a*d,t[e+2]=l*p+u*d+a*h-c*f,t[e+3]=u*p-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),h=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f+h*d*p;break;case"YZX":this._x=h*u*f+l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f-h*d*p;break;case"XZY":this._x=h*u*f-l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f+h*d*p;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{static{P.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Fc.copy(this).projectOnVector(t),this.sub(Fc)}reflect(t){return this.sub(Fc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fc=new P,Gf=new Ae;class $t{static{$t.prototype.isMatrix3=!0}constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],v=s[0],g=s[3],m=s[6],M=s[1],b=s[4],x=s[7],_=s[2],S=s[5],w=s[8];return r[0]=o*v+a*M+c*_,r[3]=o*g+a*b+c*S,r[6]=o*m+a*x+c*w,r[1]=l*v+u*M+f*_,r[4]=l*g+u*b+f*S,r[7]=l*m+u*x+f*w,r[2]=h*v+d*M+p*_,r[5]=h*g+d*b+p*S,r[8]=h*m+d*x+p*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*r,d=l*r-o*c,p=e*f+i*h+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=f*v,t[1]=(s*l-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=h*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(kc.makeScale(t,e)),this}rotate(t){return qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(kc.makeRotation(-t)),this}translate(t,e){return qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(kc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kc=new $t,Vf=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wf=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Y_(){const n={enabled:!0,workingColorSpace:yn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===fe&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===fe&&(s.r=$s(s.r),s.g=$s(s.g),s.b=$s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qi?Ya:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return qs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return qs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[yn]:{primaries:t,whitePoint:i,transfer:Ya,toXYZ:Vf,fromXYZ:Wf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:Vf,fromXYZ:Wf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),n}const ne=Y_();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $s(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let bs;class Z_{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{bs===void 0&&(bs=ao("canvas")),bs.width=t.width,bs.height=t.height;const s=bs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=bs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ao("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let J_=0;class Rh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=Rn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Oc(s[o].image)):r.push(Oc(s[o]))}else r=Oc(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Oc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Z_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let Q_=0;const Bc=new P;class Xe extends xs{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,i=ei,s=ei,r=We,o=yi,a=An,c=Mn,l=Xe.DEFAULT_ANISOTROPY,u=qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=Rn(),this.name="",this.source=new Rh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bc).x}get height(){return this.source.getSize(Bc).y}get depth(){return this.source.getSize(Bc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==i0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case js:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case js:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=i0;Xe.DEFAULT_ANISOTROPY=1;class de{static{de.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,x=(d+1)/2,_=(m+1)/2,S=(u+h)/4,w=(f+v)/4,y=(p+g)/4;return b>x&&b>_?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=S/i,r=w/i):x>_?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=S/s,r=y/s):_<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(_),i=w/r,s=y/r),this.set(i,s,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-v)/M,this.z=(h-u)/M,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class j_ extends xs{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Xe(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:We,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Rh(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends j_{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class p0 extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class tM extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Ot{static{Ot.prototype.isMatrix4=!0}constructor(t,e,i,s,r,o,a,c,l,u,f,h,d,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,h,d,p,v,g)}set(t,e,i,s,r,o,a,c,l,u,f,h,d,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Ss.setFromMatrixColumn(t,0).length(),r=1/Ss.setFromMatrixColumn(t,1).length(),o=1/Ss.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,p=a*u,v=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+p*l,e[5]=h-v*l,e[9]=-a*c,e[2]=v-h*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,p=l*u,v=l*f;e[0]=h+v*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-p,e[6]=v+h*a,e[10]=o*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,p=l*u,v=l*f;e[0]=h-v*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const h=o*u,d=o*f,p=a*u,v=a*f;e[0]=c*u,e[4]=p*l-d,e[8]=h*l+v,e[1]=c*f,e[5]=v*l+h,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const h=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=v-h*f,e[8]=p*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+p,e[10]=h-v*f}else if(t.order==="XZY"){const h=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+v,e[5]=o*u,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*u,e[10]=v*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(eM,t,nM)}lookAt(t,e,i){const s=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Di.crossVectors(i,vn),Di.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Di.crossVectors(i,vn)),Di.normalize(),Uo.crossVectors(vn,Di),s[0]=Di.x,s[4]=Uo.x,s[8]=vn.x,s[1]=Di.y,s[5]=Uo.y,s[9]=vn.y,s[2]=Di.z,s[6]=Uo.z,s[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],v=i[6],g=i[10],m=i[14],M=i[3],b=i[7],x=i[11],_=i[15],S=s[0],w=s[4],y=s[8],T=s[12],R=s[1],C=s[5],L=s[9],D=s[13],I=s[2],B=s[6],H=s[10],W=s[14],j=s[3],O=s[7],$=s[11],Q=s[15];return r[0]=o*S+a*R+c*I+l*j,r[4]=o*w+a*C+c*B+l*O,r[8]=o*y+a*L+c*H+l*$,r[12]=o*T+a*D+c*W+l*Q,r[1]=u*S+f*R+h*I+d*j,r[5]=u*w+f*C+h*B+d*O,r[9]=u*y+f*L+h*H+d*$,r[13]=u*T+f*D+h*W+d*Q,r[2]=p*S+v*R+g*I+m*j,r[6]=p*w+v*C+g*B+m*O,r[10]=p*y+v*L+g*H+m*$,r[14]=p*T+v*D+g*W+m*Q,r[3]=M*S+b*R+x*I+_*j,r[7]=M*w+b*C+x*B+_*O,r[11]=M*y+b*L+x*H+_*$,r[15]=M*T+b*D+x*W+_*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15],M=c*d-l*h,b=a*d-l*f,x=a*h-c*f,_=o*d-l*u,S=o*h-c*u,w=o*f-a*u;return e*(v*M-g*b+m*x)-i*(p*M-g*_+m*S)+s*(p*b-v*_+m*w)-r*(p*x-v*S+g*w)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],M=e*a-i*o,b=e*c-s*o,x=e*l-r*o,_=i*c-s*a,S=i*l-r*a,w=s*l-r*c,y=u*v-f*p,T=u*g-h*p,R=u*m-d*p,C=f*g-h*v,L=f*m-d*v,D=h*m-d*g,I=M*D-b*L+x*C+_*R-S*T+w*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/I;return t[0]=(a*D-c*L+l*C)*B,t[1]=(s*L-i*D-r*C)*B,t[2]=(v*w-g*S+m*_)*B,t[3]=(h*S-f*w-d*_)*B,t[4]=(c*R-o*D-l*T)*B,t[5]=(e*D-s*R+r*T)*B,t[6]=(g*x-p*w-m*b)*B,t[7]=(u*w-h*x+d*b)*B,t[8]=(o*L-a*R+l*y)*B,t[9]=(i*R-e*L-r*y)*B,t[10]=(p*S-v*x+m*M)*B,t[11]=(f*x-u*S-d*M)*B,t[12]=(a*T-o*C-c*y)*B,t[13]=(e*C-i*T+s*y)*B,t[14]=(v*b-p*_-g*M)*B,t[15]=(u*_-f*b+h*M)*B,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,h=r*l,d=r*u,p=r*f,v=o*u,g=o*f,m=a*f,M=c*l,b=c*u,x=c*f,_=i.x,S=i.y,w=i.z;return s[0]=(1-(v+m))*_,s[1]=(d+x)*_,s[2]=(p-b)*_,s[3]=0,s[4]=(d-x)*S,s[5]=(1-(h+m))*S,s[6]=(g+M)*S,s[7]=0,s[8]=(p+b)*w,s[9]=(g-M)*w,s[10]=(1-(h+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Ss.set(s[0],s[1],s[2]).length();const a=Ss.set(s[4],s[5],s[6]).length(),c=Ss.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Nn.copy(this);const l=1/o,u=1/a,f=1/c;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=u,Nn.elements[5]*=u,Nn.elements[6]*=u,Nn.elements[8]*=f,Nn.elements[9]*=f,Nn.elements[10]*=f,e.setFromRotationMatrix(Nn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=ni,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s);let p,v;if(c)p=r/(o-r),v=o*r/(o-r);else if(a===ni)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===oo)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ni,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s);let p,v;if(c)p=1/(o-r),v=o/(o-r);else if(a===ni)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===oo)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ss=new P,Nn=new Ot,eM=new P(0,0,0),nM=new P(1,1,1),Di=new P,Uo=new P,vn=new P,Xf=new Ot,qf=new Ae;class ci{constructor(t=0,e=0,i=0,s=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Xf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qf.setFromEuler(this),this.setFromQuaternion(qf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class m0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let iM=0;const $f=new P,ws=new Ae,fi=new Ot,Fo=new P,mr=new P,sM=new P,rM=new Ae,Kf=new P(1,0,0),Yf=new P(0,1,0),Zf=new P(0,0,1),Jf={type:"added"},oM={type:"removed"},Ts={type:"childadded",child:null},zc={type:"childremoved",child:null};class Le extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iM++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new P,e=new ci,i=new Ae,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new $t}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new m0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(Kf,t)}rotateY(t){return this.rotateOnAxis(Yf,t)}rotateZ(t){return this.rotateOnAxis(Zf,t)}translateOnAxis(t,e){return $f.copy(t).applyQuaternion(this.quaternion),this.position.add($f.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kf,t)}translateY(t){return this.translateOnAxis(Yf,t)}translateZ(t){return this.translateOnAxis(Zf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Fo.copy(t):Fo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(mr,Fo,this.up):fi.lookAt(Fo,mr,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(fi),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jf),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(oM),zc.child=t,this.dispatchEvent(zc),zc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jf),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,t,sM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,rM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Le.DEFAULT_UP=new P(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class De extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const aM={type:"move"};class Hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new De,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new De,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new De,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&h>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(aM)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new De;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const g0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},ko={h:0,s:0,l:0};function Gc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ne.workingColorSpace){if(t=Ah(t,1),e=te(e,0,1),i=te(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Gc(o,r,t+1/3),this.g=Gc(o,r,t),this.b=Gc(o,r,t-1/3)}return ne.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function i(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const i=g0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=$s(t.r),this.g=$s(t.g),this.b=$s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return ne.workingToColorSpace(sn.copy(this),t),Math.round(te(sn.r*255,0,255))*65536+Math.round(te(sn.g*255,0,255))*256+Math.round(te(sn.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(sn.copy(this),e);const i=sn.r,s=sn.g,r=sn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=He){ne.workingToColorSpace(sn.copy(this),t);const e=sn.r,i=sn.g,s=sn.b;return t!==He?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ui),this.setHSL(Ui.h+t,Ui.s+e,Ui.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ui),t.getHSL(ko);const i=$r(Ui.h,ko.h,e),s=$r(Ui.s,ko.s,e),r=$r(Ui.l,ko.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new ct;ct.NAMES=g0;class Ch{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new Ch(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class cM extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const In=new P,di=new P,Vc=new P,pi=new P,Es=new P,As=new P,Qf=new P,Wc=new P,Xc=new P,qc=new P,$c=new de,Kc=new de,Yc=new de;class zn{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),In.subVectors(t,e),s.cross(In);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){In.subVectors(s,e),di.subVectors(i,e),Vc.subVectors(t,e);const o=In.dot(In),a=In.dot(di),c=In.dot(Vc),l=di.dot(di),u=di.dot(Vc),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,p=(o*u-a*c)*h;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pi.x),c.addScaledVector(o,pi.y),c.addScaledVector(a,pi.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return $c.setScalar(0),Kc.setScalar(0),Yc.setScalar(0),$c.fromBufferAttribute(t,e),Kc.fromBufferAttribute(t,i),Yc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector($c,r.x),o.addScaledVector(Kc,r.y),o.addScaledVector(Yc,r.z),o}static isFrontFacing(t,e,i,s){return In.subVectors(i,e),di.subVectors(t,e),In.cross(di).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),di.subVectors(this.a,this.b),In.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return zn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return zn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return zn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Es.subVectors(s,i),As.subVectors(r,i),Wc.subVectors(t,i);const c=Es.dot(Wc),l=As.dot(Wc);if(c<=0&&l<=0)return e.copy(i);Xc.subVectors(t,s);const u=Es.dot(Xc),f=As.dot(Xc);if(u>=0&&f<=u)return e.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(Es,o);qc.subVectors(t,r);const d=Es.dot(qc),p=As.dot(qc);if(p>=0&&d<=p)return e.copy(r);const v=d*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(As,a);const g=u*p-d*f;if(g<=0&&f-u>=0&&d-p>=0)return Qf.subVectors(r,s),a=(f-u)/(f-u+(d-p)),e.copy(s).addScaledVector(Qf,a);const m=1/(g+v+h);return o=v*m,a=h*m,e.copy(i).addScaledVector(Es,o).addScaledVector(As,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ci{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Oo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Oo.copy(i.boundingBox)),Oo.applyMatrix4(t.matrixWorld),this.union(Oo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gr),Bo.subVectors(this.max,gr),Rs.subVectors(t.a,gr),Cs.subVectors(t.b,gr),Ps.subVectors(t.c,gr),Fi.subVectors(Cs,Rs),ki.subVectors(Ps,Cs),Qi.subVectors(Rs,Ps);let e=[0,-Fi.z,Fi.y,0,-ki.z,ki.y,0,-Qi.z,Qi.y,Fi.z,0,-Fi.x,ki.z,0,-ki.x,Qi.z,0,-Qi.x,-Fi.y,Fi.x,0,-ki.y,ki.x,0,-Qi.y,Qi.x,0];return!Zc(e,Rs,Cs,Ps,Bo)||(e=[1,0,0,0,1,0,0,0,1],!Zc(e,Rs,Cs,Ps,Bo))?!1:(zo.crossVectors(Fi,ki),e=[zo.x,zo.y,zo.z],Zc(e,Rs,Cs,Ps,Bo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const mi=[new P,new P,new P,new P,new P,new P,new P,new P],Dn=new P,Oo=new Ci,Rs=new P,Cs=new P,Ps=new P,Fi=new P,ki=new P,Qi=new P,gr=new P,Bo=new P,zo=new P,ji=new P;function Zc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ji.fromArray(n,r);const a=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),c=t.dot(ji),l=e.dot(ji),u=i.dot(ji);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Oe=new P,Ho=new ot;let lM=0;class wt extends xs{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lM++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=f0,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ho.fromBufferAttribute(this,e),Ho.applyMatrix3(t),this.setXY(e,Ho.x,Ho.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class v0 extends wt{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class x0 extends wt{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Zt extends wt{constructor(t,e,i){super(new Float32Array(t),e,i)}}const uM=new Ci,vr=new P,Jc=new P;class Pn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):uM.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vr.subVectors(t,this.center);const e=vr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(vr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vr.copy(t.center).add(Jc)),this.expandByPoint(vr.copy(t.center).sub(Jc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let hM=0;const Sn=new Ot,Qc=new Le,Ls=new P,xn=new Ci,xr=new Ci,Ye=new P;class Kt extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hM++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(A_(t)?x0:v0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Sn.makeRotationFromQuaternion(t),this.applyMatrix4(Sn),this}rotateX(t){return Sn.makeRotationX(t),this.applyMatrix4(Sn),this}rotateY(t){return Sn.makeRotationY(t),this.applyMatrix4(Sn),this}rotateZ(t){return Sn.makeRotationZ(t),this.applyMatrix4(Sn),this}translate(t,e,i){return Sn.makeTranslation(t,e,i),this.applyMatrix4(Sn),this}scale(t,e,i){return Sn.makeScale(t,e,i),this.applyMatrix4(Sn),this}lookAt(t){return Qc.lookAt(t),Qc.updateMatrix(),this.applyMatrix4(Qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];xr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(xn.min,xr.min),xn.expandByPoint(Ye),Ye.addVectors(xn.max,xr.max),xn.expandByPoint(Ye)):(xn.expandByPoint(xr.min),xn.expandByPoint(xr.max))}xn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ye.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(t,l),Ye.add(Ls)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new wt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let y=0;y<i.count;y++)a[y]=new P,c[y]=new P;const l=new P,u=new P,f=new P,h=new ot,d=new ot,p=new ot,v=new P,g=new P;function m(y,T,R){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,R),h.fromBufferAttribute(r,y),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,R),u.sub(l),f.sub(l),d.sub(h),p.sub(h);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(C),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(C),a[y].add(v),a[T].add(v),a[R].add(v),c[y].add(g),c[T].add(g),c[R].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let y=0,T=M.length;y<T;++y){const R=M[y],C=R.start,L=R.count;for(let D=C,I=C+L;D<I;D+=3)m(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const b=new P,x=new P,_=new P,S=new P;function w(y){_.fromBufferAttribute(s,y),S.copy(_);const T=a[y];b.copy(T),b.sub(_.multiplyScalar(_.dot(T))).normalize(),x.crossVectors(S,T);const C=x.dot(c[y])<0?-1:1;o.setXYZW(y,b.x,b.y,b.z,C)}for(let y=0,T=M.length;y<T;++y){const R=M[y],C=R.start,L=R.count;for(let D=C,I=C+L;D<I;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new wt(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,u=new P,f=new P;if(t)for(let h=0,d=t.count;h<d;h+=3){const p=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let m=0;m<u;m++)h[p++]=l[d++]}return new wt(h,u,f)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Kt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=f0,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const an=new P;class Ph{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyMatrix4(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyNormalMatrix(t),this.setXYZ(e,an.x,an.y,an.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.transformDirection(t),this.setXYZ(e,an.x,an.y,an.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Bn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Bn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Bn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Bn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Za("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new wt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ph(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Za("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const jc=new P,dM=new P,pM=new $t;class Wi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=jc.subVectors(i,e).cross(dM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(jc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||pM.getNormalMatrix(t),s=this.coplanarPoint(jc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let mM=0;class Gn extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mM++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=Xr,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=e0,this.blendDst=n0,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=M_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Uc,this.stencilZFail=Uc,this.stencilZPass=Uc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Wi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const gi=new P,tl=new P,Go=new P,Vo=new P;class uc{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gi.copy(this.origin).addScaledVector(this.direction,e),gi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){tl.copy(t).add(e).multiplyScalar(.5),Go.copy(e).sub(t).normalize(),Vo.copy(this.origin).sub(tl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Go),a=Vo.dot(this.direction),c=-Vo.dot(Go),l=Vo.lengthSq(),u=Math.abs(1-o*o);let f,h,d,p;if(u>0)if(f=o*c-a,h=o*a-c,p=r*u,f>=0)if(h>=-p)if(h<=p){const v=1/u;f*=v,h*=v,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-p?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=p?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(tl).addScaledVector(Go,h),d}intersectSphere(t,e){if(t.radius<0)return null;gi.subVectors(t.center,this.origin);const i=gi.dot(this.direction),s=gi.dot(gi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,gi)!==null}intersectTriangle(t,e,i,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,d=t.z-o.z,p=e.x-o.x,v=e.y-o.y,g=e.z-o.z,m=i.x-o.x,M=i.y-o.y,b=i.z-o.z,x=Math.abs(c),_=Math.abs(l),S=Math.abs(u);let w,y,T,R,C,L,D,I,B,H,W,j;if(x>=_&&x>=S?(T=c,L=f,B=p,j=m,c>=0?(w=l,y=u,R=h,C=d,D=v,I=g,H=M,W=b):(w=u,y=l,R=d,C=h,D=g,I=v,H=b,W=M)):_>=S?(T=l,L=h,B=v,j=M,l>=0?(w=u,y=c,R=d,C=f,D=g,I=p,H=b,W=m):(w=c,y=u,R=f,C=d,D=p,I=g,H=m,W=b)):(T=u,L=d,B=g,j=b,u>=0?(w=c,y=l,R=f,C=h,D=p,I=v,H=m,W=M):(w=l,y=c,R=h,C=f,D=v,I=p,H=M,W=m)),T===0)return null;const O=w/T,$=y/T,Q=1/T,_t=R-O*L,ft=C-$*L,St=D-O*B,Nt=I-$*B,zt=H-O*j,X=W-$*j,Y=zt*Nt-X*St,yt=_t*X-ft*zt,Pt=St*ft-Nt*_t;if(s){if(Y<0||yt<0||Pt<0)return null}else if((Y<0||yt<0||Pt<0)&&(Y>0||yt>0||Pt>0))return null;const it=Y+yt+Pt;if(it===0)return null;const Wt=Q*(Y*L+yt*B+Pt*j);return(it>0?Wt<0:Wt>0)?null:this.at(Wt/it,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rn extends Gn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const jf=new Ot,ts=new uc,Wo=new Pn,td=new P,Xo=new P,qo=new P,$o=new P,el=new P,Ko=new P,ed=new P,Yo=new P;class Xt extends Le{constructor(t=new Kt,e=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ko.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(el.fromBufferAttribute(f,t),o?Ko.addScaledVector(el,u):Ko.addScaledVector(el.sub(e),u))}e.add(Ko)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(Wo.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Wo,td)===null||ts.origin.distanceToSquared(td)>(t.far-t.near)**2))&&(jf.copy(r).invert(),ts.copy(t.ray).applyMatrix4(jf),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,_=b;x<_;x+=3){const S=a.getX(x),w=a.getX(x+1),y=a.getX(x+2);s=Zo(this,m,t,i,l,u,f,S,w,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const M=a.getX(g),b=a.getX(g+1),x=a.getX(g+2);s=Zo(this,o,t,i,l,u,f,M,b,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,_=b;x<_;x+=3){const S=x,w=x+1,y=x+2;s=Zo(this,m,t,i,l,u,f,S,w,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const M=g,b=g+1,x=g+2;s=Zo(this,o,t,i,l,u,f,M,b,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function gM(n,t,e,i,s,r,o,a){let c;if(t.side===Qe?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ai,a),c===null)return null;Yo.copy(a),Yo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Yo);return l<e.near||l>e.far?null:{distance:l,point:Yo.clone(),object:n}}function Zo(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Xo),n.getVertexPosition(c,qo),n.getVertexPosition(l,$o);const u=gM(n,t,e,i,Xo,qo,$o,ed);if(u){const f=new P;zn.getBarycoord(ed,Xo,qo,$o,f),s&&(u.uv=zn.getInterpolatedAttribute(s,a,c,l,f,new ot)),r&&(u.uv1=zn.getInterpolatedAttribute(r,a,c,l,f,new ot)),o&&(u.normal=zn.getInterpolatedAttribute(o,a,c,l,f,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new P,materialIndex:0};zn.getNormal(Xo,qo,$o,h.normal),u.face=h,u.barycoord=f}return u}const _r=new de,nd=new de,id=new de,vM=new de,sd=new Ot,Jo=new P,nl=new Pn,rd=new Ot,il=new uc;class _0 extends Xt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=If,this.bindMatrix=new Ot,this.bindMatrixInverse=new Ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ci),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Jo),this.boundingBox.expandByPoint(Jo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Jo),this.boundingSphere.expandByPoint(Jo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nl.copy(this.boundingSphere),nl.applyMatrix4(s),t.ray.intersectsSphere(nl)!==!1&&(rd.copy(s).invert(),il.copy(t.ray).applyMatrix4(rd),!(this.boundingBox!==null&&il.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,il)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new de,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===If?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===m_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Dt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;nd.fromBufferAttribute(s.attributes.skinIndex,t),id.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(_r.copy(e),e.set(0,0,0,0)):(_r.set(...e,1),e.set(0,0,0)),_r.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=id.getComponent(r);if(o!==0){const a=nd.getComponent(r);sd.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(vM.copy(_r).applyMatrix4(sd),o)}}return e.isVector4&&(e.w=_r.w),e.applyMatrix4(this.bindMatrixInverse)}}class M0 extends Le{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Lh extends Xe{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ve,u=Ve,f,h){super(null,o,a,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const od=new Ot,xM=new Ot;class Nh{constructor(t=[],e=[]){this.uuid=Rn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Dt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ot)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const i=new Ot;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:xM;od.multiplyMatrices(a,e[r]),od.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Nh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new Lh(e,t,t,An,En);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const r=t.bones[i];let o=e[r];o===void 0&&(Dt("Skeleton: No bone found with UUID:",r),o=new M0),this.bones.push(o),this.boneInverses.push(new Ot().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=i[s];t.boneInverses.push(a.toArray())}return t}}class co extends wt{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ns=new Ot,ad=new Ot,Qo=[],cd=new Ci,_M=new Ot,Mr=new Xt,yr=new Pn;class Be extends Xt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new co(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,_M)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ns),cd.copy(t.boundingBox).applyMatrix4(Ns),this.boundingBox.union(cd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ns),yr.copy(t.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(yr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yr.copy(this.boundingSphere),yr.applyMatrix4(i),t.ray.intersectsSphere(yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ns),ad.multiplyMatrices(i,Ns),Mr.matrixWorld=ad,Mr.raycast(t,Qo);for(let o=0,a=Qo.length;o<a;o++){const c=Qo[o];c.instanceId=r,c.object=this,e.push(c)}Qo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new co(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Lh(new Float32Array(s*this.count),s,this.count,yh,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const es=new Pn,MM=new ot(.5,.5),jo=new P;class wo{constructor(t=new Wi,e=new Wi,i=new Wi,s=new Wi,r=new Wi,o=new Wi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ni,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],M=r[12],b=r[13],x=r[14],_=r[15];if(s[0].setComponents(l-o,d-u,m-p,_-M).normalize(),s[1].setComponents(l+o,d+u,m+p,_+M).normalize(),s[2].setComponents(l+a,d+f,m+v,_+b).normalize(),s[3].setComponents(l-a,d-f,m-v,_-b).normalize(),i)s[4].setComponents(c,h,g,x).normalize(),s[5].setComponents(l-c,d-h,m-g,_-x).normalize();else if(s[4].setComponents(l-c,d-h,m-g,_-x).normalize(),e===ni)s[5].setComponents(l+c,d+h,m+g,_+x).normalize();else if(e===oo)s[5].setComponents(c,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){es.center.set(0,0,0);const e=MM.distanceTo(t.center);return es.radius=.7071067811865476+e,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(jo.x=s.normal.x>0?t.max.x:t.min.x,jo.y=s.normal.y>0?t.max.y:t.min.y,jo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(jo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ih extends Gn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ja=new P,Qa=new P,ld=new Ot,br=new uc,ta=new Pn,sl=new P,ud=new P;class Dh extends Le{constructor(t=new Kt,e=new Ih){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ja.fromBufferAttribute(e,s-1),Qa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ja.distanceTo(Qa);t.setAttribute("lineDistance",new Zt(i,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(s),ta.radius+=r,t.ray.intersectsSphere(ta)===!1)return;ld.copy(s).invert(),br.copy(t.ray).applyMatrix4(ld);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=u.getX(v),M=u.getX(v+1),b=ea(this,t,br,c,m,M,v);b&&e.push(b)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(d),m=ea(this,t,br,c,v,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=ea(this,t,br,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=ea(this,t,br,c,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ea(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Ja.fromBufferAttribute(a,s),Qa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ja,Qa,sl,ud)>i)return;sl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(sl);if(!(l<t.near||l>t.far))return{distance:l,point:ud.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const hd=new P,fd=new P;class y0 extends Dh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)hd.fromBufferAttribute(e,s),fd.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+hd.distanceTo(fd);t.setAttribute("lineDistance",new Zt(i,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yM extends Dh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class b0 extends Gn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const dd=new Ot,ku=new uc,na=new Pn,ia=new P;class ja extends Le{constructor(t=new Kt,e=new b0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(s),na.radius+=r,t.ray.intersectsSphere(na)===!1)return;dd.copy(s).invert(),ku.copy(t.ray).applyMatrix4(dd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=h,v=d;p<v;p++){const g=l.getX(p);ia.fromBufferAttribute(f,g),pd(ia,g,c,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let p=h,v=d;p<v;p++)ia.fromBufferAttribute(f,p),pd(ia,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function pd(n,t,e,i,s,r,o){const a=ku.distanceSqToPoint(n);if(a<e){const c=new P;ku.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class S0 extends Xe{constructor(t=[],e=ms,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Uh extends Xe{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lo extends Xe{constructor(t,e,i=ai,s,r,o,a=Ve,c=Ve,l,u=Ri,f=1){if(u!==Ri&&u!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class bM extends lo{constructor(t,e=ai,i=ms,s,r,o=Ve,a=Ve,c,l=Ri){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class w0 extends Xe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ht extends Kt{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function p(v,g,m,M,b,x,_,S,w,y,T){const R=x/w,C=_/y,L=x/2,D=_/2,I=S/2,B=w+1,H=y+1;let W=0,j=0;const O=new P;for(let $=0;$<H;$++){const Q=$*C-D;for(let _t=0;_t<B;_t++){const ft=_t*R-L;O[v]=ft*M,O[g]=Q*b,O[m]=I,l.push(O.x,O.y,O.z),O[v]=0,O[g]=0,O[m]=S>0?1:-1,u.push(O.x,O.y,O.z),f.push(_t/w),f.push(1-$/y),W+=1}}for(let $=0;$<y;$++)for(let Q=0;Q<w;Q++){const _t=h+Q+B*$,ft=h+Q+B*($+1),St=h+(Q+1)+B*($+1),Nt=h+(Q+1)+B*$;c.push(_t,ft,Nt),c.push(ft,St,Nt),j+=6}a.addGroup(d,j,T),d+=j,h+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ht(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Fh extends Kt{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=e/2,f=Math.PI/2*t,h=e,d=2*f+h,p=i*2+r,v=s+1,g=new P,m=new P;for(let M=0;M<=p;M++){let b=0,x=0,_=0,S=0;if(M<=i){const T=M/i,R=T*Math.PI/2;x=-u-t*Math.cos(R),_=t*Math.sin(R),S=-t*Math.cos(R),b=T*f}else if(M<=i+r){const T=(M-i)/r;x=-u+T*e,_=t,S=0,b=f+T*h}else{const T=(M-i-r)/i,R=T*Math.PI/2;x=u+t*Math.sin(R),_=t*Math.cos(R),S=t*Math.sin(R),b=f+h+T*f}const w=Math.max(0,Math.min(1,b/d));let y=0;M===0?y=.5/s:M===p&&(y=-.5/s);for(let T=0;T<=s;T++){const R=T/s,C=R*Math.PI*2,L=Math.sin(C),D=Math.cos(C);m.x=-_*D,m.y=x,m.z=_*L,a.push(m.x,m.y,m.z),g.set(-_*D,S,_*L),g.normalize(),c.push(g.x,g.y,g.z),l.push(R+y,w)}if(M>0){const T=(M-1)*v;for(let R=0;R<s;R++){const C=T+R,L=T+R+1,D=M*v+R,I=M*v+R+1;o.push(C,L,D),o.push(L,I,D)}}}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fh(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Je extends Kt{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let p=0;const v=[],g=i/2;let m=0;M(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function M(){const x=new P,_=new P;let S=0;const w=(e-t)/i;for(let y=0;y<=r;y++){const T=[],R=y/r,C=R*(e-t)+t;for(let L=0;L<=s;L++){const D=L/s,I=D*c+a,B=Math.sin(I),H=Math.cos(I);_.x=C*B,_.y=-R*i+g,_.z=C*H,f.push(_.x,_.y,_.z),x.set(B,w,H).normalize(),h.push(x.x,x.y,x.z),d.push(D,1-R),T.push(p++)}v.push(T)}for(let y=0;y<s;y++)for(let T=0;T<r;T++){const R=v[T][y],C=v[T+1][y],L=v[T+1][y+1],D=v[T][y+1];(t>0||T!==0)&&(u.push(R,C,D),S+=3),(e>0||T!==r-1)&&(u.push(C,L,D),S+=3)}l.addGroup(m,S,0),m+=S}function b(x){const _=p,S=new ot,w=new P;let y=0;const T=x===!0?t:e,R=x===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,g*R,0),h.push(0,R,0),d.push(.5,.5),p++;const C=p;for(let L=0;L<=s;L++){const I=L/s*c+a,B=Math.cos(I),H=Math.sin(I);w.x=T*H,w.y=g*R,w.z=T*B,f.push(w.x,w.y,w.z),h.push(0,R,0),S.x=B*.5+.5,S.y=H*.5*R+.5,d.push(S.x,S.y),p++}for(let L=0;L<s;L++){const D=_+L,I=C+L;x===!0?u.push(I,I+1,D):u.push(I+1,I,D),y+=3}l.addGroup(m,y,x===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class To extends Je{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new To(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kh extends Kt{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const b=new P,x=new P,_=new P;for(let S=0;S<e.length;S+=3)d(e[S+0],b),d(e[S+1],x),d(e[S+2],_),c(b,x,_,M)}function c(M,b,x,_){const S=_+1,w=[];for(let y=0;y<=S;y++){w[y]=[];const T=M.clone().lerp(x,y/S),R=b.clone().lerp(x,y/S),C=S-y;for(let L=0;L<=C;L++)L===0&&y===S?w[y][L]=T:w[y][L]=T.clone().lerp(R,L/C)}for(let y=0;y<S;y++)for(let T=0;T<2*(S-y)-1;T++){const R=Math.floor(T/2);T%2===0?(h(w[y][R+1]),h(w[y+1][R]),h(w[y][R])):(h(w[y][R+1]),h(w[y+1][R+1]),h(w[y+1][R]))}}function l(M){const b=new P;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(M),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function u(){const M=new P;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const x=g(M)/2/Math.PI+.5,_=m(M)/Math.PI+.5;o.push(x,1-_)}p(),f()}function f(){for(let M=0;M<o.length;M+=6){const b=o[M+0],x=o[M+2],_=o[M+4],S=Math.max(b,x,_),w=Math.min(b,x,_);S>.9&&w<.1&&(b<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),_<.2&&(o[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,b){const x=M*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function p(){const M=new P,b=new P,x=new P,_=new P,S=new ot,w=new ot,y=new ot;for(let T=0,R=0;T<r.length;T+=9,R+=6){M.set(r[T+0],r[T+1],r[T+2]),b.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),S.set(o[R+0],o[R+1]),w.set(o[R+2],o[R+3]),y.set(o[R+4],o[R+5]),_.copy(M).add(b).add(x).divideScalar(3);const C=g(_);v(S,R+0,M,C),v(w,R+2,b,C),v(y,R+4,x,C)}}function v(M,b,x,_){_<0&&M.x===1&&(o[b]=M.x-1),x.x===0&&x.z===0&&(o[b]=_/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kh(t.vertices,t.indices,t.radius,t.detail)}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Dt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const u=i[s],h=i[s+1]-u,d=(o-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new P,s=[],r=[],o=[],a=new P,c=new Ot;for(let d=0;d<=t;d++){const p=d/t;s[d]=this.getTangentAt(p,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(te(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(te(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Oh extends li{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class SM extends Oh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Bh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,f){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,s(o,a,h,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const md=new P,gd=new P,rl=new Bh,ol=new Bh,al=new Bh;class zh extends li{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(gd.subVectors(s[0],s[1]).add(s[0]),l=gd);const f=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(md.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=md),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),rl.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,p,v,g),ol.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,p,v,g),al.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(rl.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),ol.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),al.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return i.set(rl.calc(c),ol.calc(c),al.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function wM(n,t){const e=1-n;return e*e*t}function TM(n,t){return 2*(1-n)*n*t}function EM(n,t){return n*n*t}function Kr(n,t,e,i){return wM(n,t)+TM(n,e)+EM(n,i)}function AM(n,t){const e=1-n;return e*e*e*t}function RM(n,t){const e=1-n;return 3*e*e*n*t}function CM(n,t){return 3*(1-n)*n*n*t}function PM(n,t){return n*n*n*t}function Yr(n,t,e,i,s){return AM(n,t)+RM(n,e)+CM(n,i)+PM(n,s)}class T0 extends li{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Yr(t,s.x,r.x,o.x,a.x),Yr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class LM extends li{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Yr(t,s.x,r.x,o.x,a.x),Yr(t,s.y,r.y,o.y,a.y),Yr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class E0 extends li{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class NM extends li{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class A0 extends li{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Kr(t,s.x,r.x,o.x),Kr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class R0 extends li{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Kr(t,s.x,r.x,o.x),Kr(t,s.y,r.y,o.y),Kr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class C0 extends li{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return i.set(vd(a,c.x,l.x,u.x,f.x),vd(a,c.y,l.y,u.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var Ou=Object.freeze({__proto__:null,ArcCurve:SM,CatmullRomCurve3:zh,CubicBezierCurve:T0,CubicBezierCurve3:LM,EllipseCurve:Oh,LineCurve:E0,LineCurve3:NM,QuadraticBezierCurve:A0,QuadraticBezierCurve3:R0,SplineCurve:C0});class IM extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ou[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Ou[s.type]().fromJSON(s))}return this}}class xd extends IM{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new E0(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new A0(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new T0(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new C0(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new Oh(t,e,i,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class P0 extends xd{constructor(t){super(t),this.uuid=Rn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new xd().fromJSON(s))}return this}}function DM(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=L0(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=BM(n,t,r,e)),n.length>80*e){a=n[0],c=n[1];let u=a,f=c;for(let h=e;h<s;h+=e){const d=n[h],p=n[h+1];d<a&&(a=d),p<c&&(c=p),d>u&&(u=d),p>f&&(f=p)}l=Math.max(u-a,f-c),l=l!==0?32767/l:0}return uo(r,o,e,a,c,l,0),o}function L0(n,t,e,i,s){let r;if(s===ZM(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=_d(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=_d(o/i|0,n[o],n[o+1],r);return r&&er(r,r.next)&&(fo(r),r=r.next),r}function vs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(er(e,e.next)||Ne(e.prev,e,e.next)===0)){if(fo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function uo(n,t,e,i,s,r,o){if(!n)return;!o&&r&&WM(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?FM(n,i,s,r):UM(n)){t.push(c.i,n.i,l.i),fo(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=kM(vs(n),t),uo(n,t,e,i,s,r,2)):o===2&&OM(n,t,e,i,s,r):uo(vs(n),t,e,i,s,r,1);break}}}function UM(n){const t=n.prev,e=n,i=n.next;if(Ne(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(s,r,o),f=Math.min(a,c,l),h=Math.max(s,r,o),d=Math.max(a,c,l);let p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&kr(s,a,r,c,o,l,p.x,p.y)&&Ne(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function FM(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Ne(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,h=o.y,d=Math.min(a,c,l),p=Math.min(u,f,h),v=Math.max(a,c,l),g=Math.max(u,f,h),m=Bu(d,p,t,e,i),M=Bu(v,g,t,e,i);let b=n.prevZ,x=n.nextZ;for(;b&&b.z>=m&&x&&x.z<=M;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&kr(a,u,c,f,l,h,b.x,b.y)&&Ne(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&kr(a,u,c,f,l,h,x.x,x.y)&&Ne(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=m;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&kr(a,u,c,f,l,h,b.x,b.y)&&Ne(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&kr(a,u,c,f,l,h,x.x,x.y)&&Ne(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function kM(n,t){let e=n;do{const i=e.prev,s=e.next.next;!er(i,s)&&I0(i,e,e.next,s)&&ho(i,s)&&ho(s,i)&&(t.push(i.i,e.i,s.i),fo(e),fo(e.next),e=n=s),e=e.next}while(e!==n);return vs(e)}function OM(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$M(o,a)){let c=D0(o,a);o=vs(o,o.next),c=vs(c,c.next),uo(o,t,e,i,s,r,0),uo(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function BM(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=L0(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(qM(l))}s.sort(zM);for(let r=0;r<s.length;r++)e=HM(s[r],e);return e}function zM(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function HM(n,t){const e=GM(n,t);if(!e)return t;const i=D0(e,n);return vs(i,i.next),vs(e,e.next)}function GM(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(er(n,e))return e;do{if(er(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&N0(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const f=Math.abs(s-e.y)/(i-e.x);ho(e,n)&&(f<u||f===u&&(e.x>o.x||e.x===o.x&&VM(o,e)))&&(o=e,u=f)}e=e.next}while(e!==a);return o}function VM(n,t){return Ne(n.prev,n,t.prev)<0&&Ne(t.next,n,n.next)<0}function WM(n,t,e,i){let s=n;do s.z===0&&(s.z=Bu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,XM(s)}function XM(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Bu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function qM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function N0(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function kr(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&N0(n,t,e,i,s,r,o,a)}function $M(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!KM(n,t)&&(ho(n,t)&&ho(t,n)&&YM(n,t)&&(Ne(n.prev,n,t.prev)||Ne(n,t.prev,t))||er(n,t)&&Ne(n.prev,n,n.next)>0&&Ne(t.prev,t,t.next)>0)}function Ne(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function er(n,t){return n.x===t.x&&n.y===t.y}function I0(n,t,e,i){const s=ra(Ne(n,t,e)),r=ra(Ne(n,t,i)),o=ra(Ne(e,i,n)),a=ra(Ne(e,i,t));return!!(s!==r&&o!==a||s===0&&sa(n,e,t)||r===0&&sa(n,i,t)||o===0&&sa(e,n,i)||a===0&&sa(e,t,i))}function sa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ra(n){return n>0?1:n<0?-1:0}function KM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&I0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function ho(n,t){return Ne(n.prev,n,n.next)<0?Ne(n,t,n.next)>=0&&Ne(n,n.prev,t)>=0:Ne(n,t,n.prev)<0||Ne(n,n.next,t)<0}function YM(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function D0(n,t){const e=zu(n.i,n.x,n.y),i=zu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function _d(n,t,e,i){const s=zu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function fo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function zu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ZM(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class JM{static triangulate(t,e,i=2){return DM(t,e,i)}}class Zr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return Zr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Md(t),yd(i,t);let o=t.length;e.forEach(Md);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,yd(i,e[c]);const a=JM.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Md(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function yd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class _s extends kh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _s(t.radius,t.detail)}}class Eo extends Kt{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=te(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,f=new P,h=new ot,d=new P,p=new P,v=new P;let g=0,m=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(p)}for(let M=0;M<=e;M++){const b=i+M*u*s,x=Math.sin(b),_=Math.cos(b);for(let S=0;S<=t.length-1;S++){f.x=t[S].x*x,f.y=t[S].y,f.z=t[S].x*_,o.push(f.x,f.y,f.z),h.x=M/e,h.y=S/(t.length-1),a.push(h.x,h.y);const w=c[3*S+0]*x,y=c[3*S+1],T=c[3*S+0]*_;l.push(w,y,T)}}for(let M=0;M<e;M++)for(let b=0;b<t.length-1;b++){const x=b+M*t.length,_=x,S=x+t.length,w=x+t.length+1,y=x+1;r.push(_,S,y),r.push(w,y,S)}this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("uv",new Zt(a,2)),this.setAttribute("normal",new Zt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.points,t.segments,t.phiStart,t.phiLength)}}class Wn extends Kt{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,h=e/c,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const M=m*h-o;for(let b=0;b<l;b++){const x=b*f-r;p.push(x,-M,0),v.push(0,0,1),g.push(b/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){const b=M+l*m,x=M+l*(m+1),_=M+1+l*(m+1),S=M+1+l*m;d.push(b,x,S),d.push(x,_,S)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Hh extends Kt{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let f=t;const h=(e-t)/s,d=new P,p=new ot;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){const m=r+g/i*o;d.x=f*Math.cos(m),d.y=f*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,u.push(p.x,p.y)}f+=h}for(let v=0;v<s;v++){const g=v*(i+1);for(let m=0;m<i;m++){const M=m+g,b=M,x=M+i+1,_=M+i+2,S=M+1;a.push(b,x,S),a.push(x,_,S)}}this.setIndex(a),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hh(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Gh extends Kt{constructor(t=new P0([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Zt(s,3)),this.setAttribute("normal",new Zt(r,3)),this.setAttribute("uv",new Zt(o,2));function l(u){const f=s.length/3,h=u.extractPoints(e);let d=h.shape;const p=h.holes;Zr.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const M=p[g];Zr.isClockWise(M)===!0&&(p[g]=M.reverse())}const v=Zr.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const M=p[g];d=d.concat(M)}for(let g=0,m=d.length;g<m;g++){const M=d[g];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let g=0,m=v.length;g<m;g++){const M=v[g],b=M[0]+f,x=M[1]+f,_=M[2]+f;i.push(b,x,_),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return QM(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new Gh(i,t.curveSegments)}}function QM(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class us extends Kt{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new P,h=new P,d=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){const M=[],b=m/i,x=o+b*a,_=t*Math.cos(x),S=Math.sqrt(t*t-_*_);let w=0;m===0&&o===0?w=.5/e:m===i&&c===Math.PI&&(w=-.5/e);for(let y=0;y<=e;y++){const T=y/e,R=s+T*r;f.x=-S*Math.cos(R),f.y=_,f.z=S*Math.sin(R),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),g.push(T+w,1-b),M.push(l++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<e;M++){const b=u[m][M+1],x=u[m][M],_=u[m+1][M],S=u[m+1][M+1];(m!==0||o>0)&&d.push(b,x,S),(m!==i-1||c<Math.PI)&&d.push(x,_,S)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Vh extends Kt{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],f=[],h=new P,d=new P,p=new P;for(let v=0;v<=i;v++){const g=o+v/i*a;for(let m=0;m<=s;m++){const M=m/s*r;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),l.push(d.x,d.y,d.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),p.subVectors(d,h).normalize(),u.push(p.x,p.y,p.z),f.push(m/s),f.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=s;g++){const m=(s+1)*v+g-1,M=(s+1)*(v-1)+g-1,b=(s+1)*(v-1)+g,x=(s+1)*v+g;c.push(m,M,x),c.push(M,b,x)}this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class hc extends Kt{constructor(t=new R0(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new ot;let u=new P;const f=[],h=[],d=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function v(){for(let b=0;b<e;b++)g(b);g(r===!1?e:0),M(),m()}function g(b){u=t.getPointAt(b/e,u);const x=o.normals[b],_=o.binormals[b];for(let S=0;S<=s;S++){const w=S/s*Math.PI*2,y=Math.sin(w),T=-Math.cos(w);c.x=T*x.x+y*_.x,c.y=T*x.y+y*_.y,c.z=T*x.z+y*_.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,f.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=e;b++)for(let x=1;x<=s;x++){const _=(s+1)*(b-1)+(x-1),S=(s+1)*b+(x-1),w=(s+1)*b+x,y=(s+1)*(b-1)+x;p.push(_,S,y),p.push(S,w,y)}}function M(){for(let b=0;b<=e;b++)for(let x=0;x<=s;x++)l.x=b/e,l.y=x/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new hc(new Ou[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function nr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(bd(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(bd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function cn(n){const t={};for(let e=0;e<n.length;e++){const i=nr(n[e]);for(const s in i)t[s]=i[s]}return t}function bd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function jM(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function U0(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const gn={clone:nr,merge:cn};var ty=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ey=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class re extends Gn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ty,this.fragmentShader=ey,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=nr(t.uniforms),this.uniformsGroups=jM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(s.value);break;case"v2":this.uniforms[i].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new de().fromArray(s.value);break;case"m3":this.uniforms[i].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class F0 extends re{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pi extends Gn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ka,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ui extends Pi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class rr extends Gn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ka,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=hh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ny extends Gn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=x_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class iy extends Gn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Xi(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Na(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function sy(n){function t(s,r){return n[s]-n[r]}const e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function Sd(n,t,e){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=n[a+c]}return s}function ry(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}class or{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){const a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class oy extends or{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uf,endingEnd:Uf}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ff:r=t,a=2*e-i;break;case kf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Ff:o=t,c=2*i-e;break;case kf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}const l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),v=p*p,g=v*p,m=-h*g+2*h*v-h*p,M=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*p+1,b=(-1-d)*g+(1.5+d)*v+.5*p,x=d*g-d*v;for(let _=0;_!==a;++_)r[_]=m*o[u+_]+M*o[l+_]+b*o[c+_]+x*o[f+_];return r}}class ay extends or{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*f+o[c+h]*u;return r}}class cy extends or{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class ly extends or{interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){const p=(i-e)/(s-e),v=1-p;for(let g=0;g!==a;++g)r[g]=o[l+g]*v+o[c+g]*p;return r}const h=a*2,d=t-1;for(let p=0;p!==a;++p){const v=o[l+p],g=o[c+p],m=d*h+p*2,M=f[m],b=f[m+1],x=t*h+p*2,_=u[x],S=u[x+1],w=hy(i,e,M,_,s);r[p]=k0(w,v,b,S,g)}return r}}function k0(n,t,e,i,s){const r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function uy(n,t,e,i,s){const r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function hy(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){const a=k0(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;const c=uy(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Xn{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Xi(e,this.TimeBufferType),this.values=Xi(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Xi(t.times,Array),values:Xi(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Na(t.settings)&&(i.settings={inTangents:Xi(t.settings.inTangents,Array),outTangents:Xi(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new cy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ay(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new oy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new ly(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case so:e=this.InterpolantFactoryMethodDiscrete;break;case ro:e=this.InterpolantFactoryMethodLinear;break;case Dc:e=this.InterpolantFactoryMethodSmooth;break;case Df:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Dt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return so;case this.InterpolantFactoryMethodLinear:return ro;case this.InterpolantFactoryMethodSmooth:return Dc;case this.InterpolantFactoryMethodBezier:return Df}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Na(this.settings)&&(wd(this.settings.inTangents,t),wd(this.settings.outTangents,t))}return this}trim(t,e){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=i[a];if(typeof c=="number"&&isNaN(c)){Vt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Vt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&R_(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){Vt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Dc,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{const f=a*i,h=f-i,d=f+i;for(let p=0;p!==i;++p){const v=e[f+p];if(v!==e[h+p]||v!==e[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const f=a*i,h=o*i;for(let d=0;d!==i;++d)e[h+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Na(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function wd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=ro;class ar extends Xn{constructor(t,e,i){super(t,e,i)}}ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=so;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class O0 extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}O0.prototype.ValueTypeName="color";class po extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}po.prototype.ValueTypeName="number";class fy extends or{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Ae.slerpFlat(r,0,o,l-a,o,l,c);return r}}class mo extends Xn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new fy(this.times,this.values,this.getValueSize(),t)}}mo.prototype.ValueTypeName="quaternion";mo.prototype.InterpolantFactoryMethodSmooth=void 0;class cr extends Xn{constructor(t,e,i){super(t,e,i)}}cr.prototype.ValueTypeName="string";cr.prototype.ValueBufferType=Array;cr.prototype.DefaultInterpolation=so;cr.prototype.InterpolantFactoryMethodLinear=void 0;cr.prototype.InterpolantFactoryMethodSmooth=void 0;class tc extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}tc.prototype.ValueTypeName="vector";class dy{constructor(t="",e=-1,i=[],s=g_){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=Rn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(my(i[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=i.length;r!==o;++r)e.push(Xn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=sy(c);c=Sd(c,1,u),l=Sd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new po(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const f=u[1];let h=s[f];h||(s[f]=h=[]),h.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}resetDuration(){const t=this.tracks;let e=0;for(let i=0,s=t.length;i!==s;++i){const r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function py(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return po;case"vector":case"vector2":case"vector3":case"vector4":return tc;case"color":return O0;case"quaternion":return mo;case"bool":case"boolean":return ar;case"string":return cr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function my(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=py(n.type);if(n.times===void 0){const i=[],s=[];ry(n.keys,i,s,"value"),n.times=i,n.values=s}let e;return t.parse!==void 0?e=t.parse(n):e=new t(n.name,n.times,n.values,n.interpolation),Na(n.settings)&&(e.settings={inTangents:Xi(n.settings.inTangents,Float32Array),outTangents:Xi(n.settings.outTangents,Float32Array)}),e}const bi={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Td(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Td(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Td(n){try{const t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class gy{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const vy=new gy;class lr{constructor(t){this.manager=t!==void 0?t:vy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}lr.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi={};class xy extends Error{constructor(t,e){super(t),this.response=e}}class B0 extends lr{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=bi.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(vi[t]!==void 0){vi[t].push({onLoad:e,onProgress:i,onError:s});return}vi[t]=[],vi[t].push({onLoad:e,onProgress:i,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Dt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=vi[t],f=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=h?parseInt(h):0,p=d!==0;let v=0;const g=new ReadableStream({start(m){M();function M(){f.read().then(({done:b,value:x})=>{if(b)m.close();else{v+=x.byteLength;const _=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:d});for(let S=0,w=u.length;S<w;S++){const y=u[S];y.onProgress&&y.onProgress(_)}m.enqueue(x),M()}},b=>{m.error(b)})}}});return new Response(g)}else throw new xy(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{bi.add(`file:${t}`,l);const u=vi[t];delete vi[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=vi[t];if(u===void 0)throw this.manager.itemError(t),l;delete vi[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Is=new WeakMap;class _y extends lr{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=bi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let f=Is.get(o);f===void 0&&(f=[],Is.set(o,f)),f.push({onLoad:e,onError:s})}return o}const a=ao("img");function c(){u(),e&&e(this);const f=Is.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Is.delete(this),r.manager.itemEnd(t)}function l(f){u(),s&&s(f),bi.remove(`image:${t}`);const h=Is.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onError&&p.onError(f)}Is.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),bi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class My extends lr{constructor(t){super(t)}load(t,e,i,s){const r=new Xe,o=new _y(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class fc extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class yy extends fc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const cl=new Ot,Ed=new P,Ad=new P;class Wh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ed),Ad.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ad),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){cl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(cl,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===oo||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const oa=new P,aa=new Ae,Yn=new P;class z0 extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(oa,aa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,aa,Yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(oa,aa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,aa,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new P,Rd=new ot,Cd=new ot;class ln extends z0{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=tr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tr*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z)}getViewSize(t,e){return this.getViewBounds(t,Rd,Cd),e.subVectors(Cd,Rd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class by extends Wh{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=tr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class Sy extends fc{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new by}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class wy extends Wh{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}}class Ty extends fc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new wy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Ao extends z0{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ey extends Wh{constructor(){super(new Ao(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class H0 extends fc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new Ey}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Jr{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const ll=new WeakMap;class Ay extends lr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Dt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Dt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=bi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{ll.has(o)===!0?(s&&s(ll.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(l),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return bi.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),ll.set(c,l),bi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});bi.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ds=-90,Us=1;class Ry extends Le{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ln(Ds,Us,t,e);s.layers=this.layers,this.add(s);const r=new ln(Ds,Us,t,e);r.layers=this.layers,this.add(r);const o=new ln(Ds,Us,t,e);o.layers=this.layers,this.add(o);const a=new ln(Ds,Us,t,e);a.layers=this.layers,this.add(a);const c=new ln(Ds,Us,t,e);c.layers=this.layers,this.add(c);const l=new ln(Ds,Us,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===ni)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===oo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Cy extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Py{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Ly.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ly(){this._document.hidden===!1&&this.reset()}const Xh="\\[\\]\\.:\\/",Ny=new RegExp("["+Xh+"]","g"),qh="[^"+Xh+"]",Iy="[^"+Xh.replace("\\.","")+"]",Dy=/((?:WC+[\/:])*)/.source.replace("WC",qh),Uy=/(WCOD+)?/.source.replace("WCOD",Iy),Fy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qh),ky=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qh),Oy=new RegExp("^"+Dy+Uy+Fy+ky+"$"),By=["material","materials","bones","map"];class zy{constructor(t,e,i){const s=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}}class ve{constructor(t,e,i){this.path=e,this.parsedPath=i||ve.parseTrackName(e),this.node=ve.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new ve.Composite(t,e,i):new ve(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ny,"")}static parseTrackName(t){const e=Oy.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);By.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=ve.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ve.Composite=zy;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class G0{static{G0.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}function Pd(n,t,e,i){const s=Hy(i);switch(e){case l0:return n*t;case yh:return n*t/s.components*s.byteLength;case bh:return n*t/s.components*s.byteLength;case gs:return n*t*2/s.components*s.byteLength;case Sh:return n*t*2/s.components*s.byteLength;case u0:return n*t*3/s.components*s.byteLength;case An:return n*t*4/s.components*s.byteLength;case wh:return n*t*4/s.components*s.byteLength;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Pa:case La:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case au:case lu:return Math.max(n,16)*Math.max(t,8)/4;case ou:case cu:return Math.max(n,8)*Math.max(t,8)/2;case uu:case hu:case du:case pu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fu:case qa:case mu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _u:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case yu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case bu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Su:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case wu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Eu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Au:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ru:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Cu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pu:case Lu:case Nu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Iu:case Du:return Math.ceil(n/4)*Math.ceil(t/4)*8;case $a:case Uu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hy(n){switch(n){case Mn:case r0:return{byteLength:1,components:1};case no:case o0:case dn:return{byteLength:2,components:1};case _h:case Mh:return{byteLength:2,components:4};case ai:case xh:case En:return{byteLength:4,components:1};case a0:case c0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uh}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uh);function V0(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Gy(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const v=f[d];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Vy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$y=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ky=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Qy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,e1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,n1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,i1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,s1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,r1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,c1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,l1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,u1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,h1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,f1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,d1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,p1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,m1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,x1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_1="gl_FragColor = linearToOutputTexel( gl_FragColor );",M1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,y1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,b1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,S1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,w1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,T1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,E1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,A1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,R1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,C1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,P1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,L1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,N1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,U1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,F1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,k1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,O1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,B1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,z1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,H1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,G1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,V1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,W1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,q1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Z1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,J1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Q1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,j1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ib=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ob=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ab=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,db=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_b=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Eb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ab=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ib=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Db=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ub=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ob=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_S=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:Vy,alphahash_pars_fragment:Wy,alphamap_fragment:Xy,alphamap_pars_fragment:qy,alphatest_fragment:$y,alphatest_pars_fragment:Ky,aomap_fragment:Yy,aomap_pars_fragment:Zy,batching_pars_vertex:Jy,batching_vertex:Qy,begin_vertex:jy,beginnormal_vertex:t1,bsdfs:e1,iridescence_fragment:n1,bumpmap_pars_fragment:i1,clipping_planes_fragment:s1,clipping_planes_pars_fragment:r1,clipping_planes_pars_vertex:o1,clipping_planes_vertex:a1,color_fragment:c1,color_pars_fragment:l1,color_pars_vertex:u1,color_vertex:h1,common:f1,cube_uv_reflection_fragment:d1,defaultnormal_vertex:p1,displacementmap_pars_vertex:m1,displacementmap_vertex:g1,emissivemap_fragment:v1,emissivemap_pars_fragment:x1,colorspace_fragment:_1,colorspace_pars_fragment:M1,envmap_fragment:y1,envmap_common_pars_fragment:b1,envmap_pars_fragment:S1,envmap_pars_vertex:w1,envmap_physical_pars_fragment:U1,envmap_vertex:T1,fog_vertex:E1,fog_pars_vertex:A1,fog_fragment:R1,fog_pars_fragment:C1,gradientmap_pars_fragment:P1,lightmap_pars_fragment:L1,lights_lambert_fragment:N1,lights_lambert_pars_fragment:I1,lights_pars_begin:D1,lights_toon_fragment:F1,lights_toon_pars_fragment:k1,lights_phong_fragment:O1,lights_phong_pars_fragment:B1,lights_physical_fragment:z1,lights_physical_pars_fragment:H1,lights_fragment_begin:G1,lights_fragment_maps:V1,lights_fragment_end:W1,lightprobes_pars_fragment:X1,logdepthbuf_fragment:q1,logdepthbuf_pars_fragment:$1,logdepthbuf_pars_vertex:K1,logdepthbuf_vertex:Y1,map_fragment:Z1,map_pars_fragment:J1,map_particle_fragment:Q1,map_particle_pars_fragment:j1,metalnessmap_fragment:tb,metalnessmap_pars_fragment:eb,morphinstance_vertex:nb,morphcolor_vertex:ib,morphnormal_vertex:sb,morphtarget_pars_vertex:rb,morphtarget_vertex:ob,normal_fragment_begin:ab,normal_fragment_maps:cb,normal_pars_fragment:lb,normal_pars_vertex:ub,normal_vertex:hb,normalmap_pars_fragment:fb,clearcoat_normal_fragment_begin:db,clearcoat_normal_fragment_maps:pb,clearcoat_pars_fragment:mb,iridescence_pars_fragment:gb,opaque_fragment:vb,packing:xb,premultiplied_alpha_fragment:_b,project_vertex:Mb,dithering_fragment:yb,dithering_pars_fragment:bb,roughnessmap_fragment:Sb,roughnessmap_pars_fragment:wb,shadowmap_pars_fragment:Tb,shadowmap_pars_vertex:Eb,shadowmap_vertex:Ab,shadowmask_pars_fragment:Rb,skinbase_vertex:Cb,skinning_pars_vertex:Pb,skinning_vertex:Lb,skinnormal_vertex:Nb,specularmap_fragment:Ib,specularmap_pars_fragment:Db,tonemapping_fragment:Ub,tonemapping_pars_fragment:Fb,transmission_fragment:kb,transmission_pars_fragment:Ob,uv_pars_fragment:Bb,uv_pars_vertex:zb,uv_vertex:Hb,worldpos_vertex:Gb,background_vert:Vb,background_frag:Wb,backgroundCube_vert:Xb,backgroundCube_frag:qb,cube_vert:$b,cube_frag:Kb,depth_vert:Yb,depth_frag:Zb,distance_vert:Jb,distance_frag:Qb,equirect_vert:jb,equirect_frag:tS,linedashed_vert:eS,linedashed_frag:nS,meshbasic_vert:iS,meshbasic_frag:sS,meshlambert_vert:rS,meshlambert_frag:oS,meshmatcap_vert:aS,meshmatcap_frag:cS,meshnormal_vert:lS,meshnormal_frag:uS,meshphong_vert:hS,meshphong_frag:fS,meshphysical_vert:dS,meshphysical_frag:pS,meshtoon_vert:mS,meshtoon_frag:gS,points_vert:vS,points_frag:xS,shadow_vert:_S,shadow_frag:MS,sprite_vert:yS,sprite_frag:bS},lt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},ti={basic:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:cn([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:cn([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new ct(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:cn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:cn([lt.points,lt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:cn([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:cn([lt.common,lt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:cn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:cn([lt.sprite,lt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:cn([lt.common,lt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:cn([lt.lights,lt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};ti.physical={uniforms:cn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const ca={r:0,b:0,g:0},SS=new Ot,W0=new $t;W0.set(-1,0,0,0,1,0,0,0,1);function wS(n,t,e,i,s,r){const o=new ct(0);let a=s===!0?0:1,c,l,u=null,f=0,h=null;function d(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const x=M.backgroundBlurriness>0;b=t.get(b,x)}return b}function p(M){let b=!1;const x=d(M);x===null?g(o,a):x&&x.isColor&&(g(x,1),b=!0);const _=n.xr.getEnvironmentBlendMode();_==="additive"?e.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,b){const x=d(b);x&&(x.isCubeTexture||x.mapping===lc)?(l===void 0&&(l=new Xt(new Ht(1,1,1),new re({name:"BackgroundCubeMaterial",uniforms:nr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(SS.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(W0),l.material.toneMapped=ne.getTransfer(x.colorSpace)!==fe,(u!==x||f!==x.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Xt(new Wn(2,2),new re({name:"BackgroundMaterial",uniforms:nr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=ne.getTransfer(x.colorSpace)!==fe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,b){M.getRGB(ca,U0(n)),e.buffers.color.setClear(ca.r,ca.g,ca.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,b=1){o.set(M),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:p,addToRenderList:v,dispose:m}}function TS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(C,L,D,I,B){let H=!1;const W=f(C,I,D,L);r!==W&&(r=W,l(r.object)),H=d(C,I,D,B),H&&p(C,I,D,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,x(C,L,D,I),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,L,D,I){const B=I.wireframe===!0;let H=i[L.id];H===void 0&&(H={},i[L.id]=H);const W=C.isInstancedMesh===!0?C.id:0;let j=H[W];j===void 0&&(j={},H[W]=j);let O=j[D.id];O===void 0&&(O={},j[D.id]=O);let $=O[B];return $===void 0&&($=h(c()),O[B]=$),$}function h(C){const L=[],D=[],I=[];for(let B=0;B<e;B++)L[B]=0,D[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:I,object:C,attributes:{},index:null}}function d(C,L,D,I){const B=r.attributes,H=L.attributes;let W=0;const j=D.getAttributes();for(const O in j)if(j[O].location>=0){const Q=B[O];let _t=H[O];if(_t===void 0&&(O==="instanceMatrix"&&C.instanceMatrix&&(_t=C.instanceMatrix),O==="instanceColor"&&C.instanceColor&&(_t=C.instanceColor)),Q===void 0||Q.attribute!==_t||_t&&Q.data!==_t.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function p(C,L,D,I){const B={},H=L.attributes;let W=0;const j=D.getAttributes();for(const O in j)if(j[O].location>=0){let Q=H[O];Q===void 0&&(O==="instanceMatrix"&&C.instanceMatrix&&(Q=C.instanceMatrix),O==="instanceColor"&&C.instanceColor&&(Q=C.instanceColor));const _t={};_t.attribute=Q,Q&&Q.data&&(_t.data=Q.data),B[O]=_t,W++}r.attributes=B,r.attributesNum=W,r.index=I}function v(){const C=r.newAttributes;for(let L=0,D=C.length;L<D;L++)C[L]=0}function g(C){m(C,0)}function m(C,L){const D=r.newAttributes,I=r.enabledAttributes,B=r.attributeDivisors;D[C]=1,I[C]===0&&(n.enableVertexAttribArray(C),I[C]=1),B[C]!==L&&(n.vertexAttribDivisor(C,L),B[C]=L)}function M(){const C=r.newAttributes,L=r.enabledAttributes;for(let D=0,I=L.length;D<I;D++)L[D]!==C[D]&&(n.disableVertexAttribArray(D),L[D]=0)}function b(C,L,D,I,B,H,W){W===!0?n.vertexAttribIPointer(C,L,D,B,H):n.vertexAttribPointer(C,L,D,I,B,H)}function x(C,L,D,I){v();const B=I.attributes,H=D.getAttributes(),W=L.defaultAttributeValues;for(const j in H){const O=H[j];if(O.location>=0){let $=B[j];if($===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&($=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&($=C.instanceColor)),$!==void 0){const Q=$.normalized,_t=$.itemSize,ft=t.get($);if(ft===void 0)continue;const St=ft.buffer,Nt=ft.type,zt=ft.bytesPerElement,X=Nt===n.INT||Nt===n.UNSIGNED_INT||$.gpuType===xh;if($.isInterleavedBufferAttribute){const Y=$.data,yt=Y.stride,Pt=$.offset;if(Y.isInstancedInterleavedBuffer){for(let it=0;it<O.locationSize;it++)m(O.location+it,Y.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let it=0;it<O.locationSize;it++)g(O.location+it);n.bindBuffer(n.ARRAY_BUFFER,St);for(let it=0;it<O.locationSize;it++)b(O.location+it,_t/O.locationSize,Nt,Q,yt*zt,(Pt+_t/O.locationSize*it)*zt,X)}else{if($.isInstancedBufferAttribute){for(let Y=0;Y<O.locationSize;Y++)m(O.location+Y,$.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Y=0;Y<O.locationSize;Y++)g(O.location+Y);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Y=0;Y<O.locationSize;Y++)b(O.location+Y,_t/O.locationSize,Nt,Q,_t*zt,_t/O.locationSize*Y*zt,X)}}else if(W!==void 0){const Q=W[j];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(O.location,Q);break;case 3:n.vertexAttrib3fv(O.location,Q);break;case 4:n.vertexAttrib4fv(O.location,Q);break;default:n.vertexAttrib1fv(O.location,Q)}}}}M()}function _(){T();for(const C in i){const L=i[C];for(const D in L){const I=L[D];for(const B in I){const H=I[B];for(const W in H)u(H[W].object),delete H[W];delete I[B]}}delete i[C]}}function S(C){if(i[C.id]===void 0)return;const L=i[C.id];for(const D in L){const I=L[D];for(const B in I){const H=I[B];for(const W in H)u(H[W].object),delete H[W];delete I[B]}}delete i[C.id]}function w(C){for(const L in i){const D=i[L];for(const I in D){const B=D[I];if(B[C.id]===void 0)continue;const H=B[C.id];for(const W in H)u(H[W].object),delete H[W];delete B[C.id]}}}function y(C){for(const L in i){const D=i[L],I=C.isInstancedMesh===!0?C.id:0,B=D[I];if(B!==void 0){for(const H in B){const W=B[H];for(const j in W)u(W[j].object),delete W[j];delete B[H]}delete D[I],Object.keys(D).length===0&&delete i[L]}}}function T(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:R,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfObject:y,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function ES(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function AS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==An&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const y=w===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Mn&&w!==En&&!y&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Dt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:x,maxSamples:_,samples:S}}function RS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Wi,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=n.get(f);if(!s||p===null||p.length===0||r&&!g)r?u(null):l();else{const M=r?0:i,b=M*4;let x=m.clippingState||null;c.value=x,x=u(p,h,b,d);for(let _=0;_!==b;++_)x[_]=e[_];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,p){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=d+v*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,x=d;b!==v;++b,x+=4)o.copy(f[b]).applyMatrix4(M,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const Xs=4,CS=6,PS=20,LS=256,Sr=new Ao,Ld=new ct;let ul=null,hl=0,fl=0,dl=!1;const NS=new P,ns=new P;class Nd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=NS}=r;ul=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),fl=this._renderer.getActiveMipmapLevel(),dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ul,hl,fl),this._renderer.xr.enabled=dl,t.scissorTest=!1,Fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===Qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ul=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),fl=this._renderer.getActiveMipmapLevel(),dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:We,minFilter:We,generateMipmaps:!1,type:dn,format:An,colorSpace:yn,depthBuffer:!1},s=Id(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Id(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=IS(r)),this._blurMaterial=US(r,t,e),this._ggxMaterial=DS(r,t,e)}return s}_compileMaterial(t){const e=new Xt(new Kt,t);this._renderer.compile(e,Sr)}_sceneToCubeUV(t,e,i,s,r){const c=new ln(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Ld),f.toneMapping=ri,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new Ht,new rn({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,m=!0):(g.color.copy(Ld),m=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):x===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const _=this._cubeSize;Fs(s,x*_,b>2?_:0,_,_),f.setRenderTarget(s),m&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ms||t.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ud()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Fs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Sr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[i],g=3*v*(i>p-Xs?i-p+Xs:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,Fs(r,g,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Sr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,Fs(t,g,m,3*v,2*v),s.setRenderTarget(t),s.render(a,Sr)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Xs?s-this._lodMax+Xs:0),h=4*(this._cubeSize-u);Fs(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,Sr)}}function IS(n){const t=[],e=[];let i=n;const s=n-Xs+1+CS;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);const a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,p=new Float32Array(d*h*f),v=new Float32Array(d*h*f);for(let m=0;m<f;m++){const M=m%3*2/3-1,b=m>2?0:-1,x=[M,b,0,M+2/3,b,0,M+2/3,b+1,0,M,b,0,M+2/3,b+1,0,M,b+1,0];p.set(x,d*h*m);for(let _=0;_<h;_++){const S=u[_*2]*2-1,w=u[_*2+1]*2-1;m===0?ns.set(1,w,S):m===1?ns.set(-S,1,-w):m===2?ns.set(-S,w,1):m===3?ns.set(-1,w,-S):m===4?ns.set(-S,-1,w):ns.set(S,w,-1),ns.toArray(v,(m*h+_)*d)}}const g=new Kt;g.setAttribute("position",new wt(p,d)),g.setAttribute("outputDirection",new wt(v,d)),e.push(new Xt(g,null)),i>Xs&&i--}return{lodMeshes:e,sizeLods:t}}function Id(n,t,e){const i=new un(n,t,e);return i.texture.mapping=lc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function DS(n,t,e){return new re({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:LS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:dc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function US(n,t,e){return new re({name:"SphericalGaussianBlur",defines:{SAMPLES:PS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:dc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Dd(){return new re({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Ud(){return new re({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function dc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class X0 extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new S0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ht(5,5,5),r=new re({name:"CubemapFromEquirect",uniforms:nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:si});r.uniforms.tEquirect.value=e;const o=new Xt(s,r),a=e.minFilter;return e.minFilter===yi&&(e.minFilter=We),new Ry(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function FS(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Nc||d===Ic)if(t.has(h)){const p=t.get(h).texture;return a(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const v=new X0(p.height);return v.fromEquirectangularTexture(n,h),t.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const d=h.mapping,p=d===Nc||d===Ic,v=d===ms||d===Qs;if(p||v){let g=e.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Nd(n)),g=p?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return p&&M&&M.height>0||v&&M&&c(M)?(i===null&&(i=new Nd(n)),g=p?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,d){return d===Nc?h.mapping=ms:d===Ic&&(h.mapping=Qs),h}function c(h){let d=0;const p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function kS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&qs("WebGLRenderer: "+i+" extension not supported."),s}}}function OS(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const p in h.attributes)t.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)t.update(h[d],n.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,p=f.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const M=d.array;v=d.version;for(let b=0,x=M.length;b<x;b+=3){const _=M[b+0],S=M[b+1],w=M[b+2];h.push(_,S,S,w,w,_)}}else{const M=p.array;v=p.version;for(let b=0,x=M.length/3-1;b<x;b+=3){const _=b+0,S=b+1,w=b+2;h.push(_,S,S,w,w,_)}}const g=new(p.count>=65535?x0:v0)(h,1);g.version=v;const m=r.get(f);m&&t.remove(m),r.set(f,g)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function BS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*o),e.update(h,i,1)}function l(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*o,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=h[g];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function zS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Vt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function HS(n,t,e){const i=new WeakMap,s=new de;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let T=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let b=0;d===!0&&(b=1),p===!0&&(b=2),v===!0&&(b=3);let x=a.attributes.position.count*b,_=1;x>t.maxTextureSize&&(_=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const S=new Float32Array(x*_*4*f),w=new p0(S,x,_,f);w.type=En,w.needsUpdate=!0;const y=b*4;for(let R=0;R<f;R++){const C=g[R],L=m[R],D=M[R],I=x*_*4*R;for(let B=0;B<C.count;B++){const H=B*y;d===!0&&(s.fromBufferAttribute(C,B),S[I+H+0]=s.x,S[I+H+1]=s.y,S[I+H+2]=s.z,S[I+H+3]=0),p===!0&&(s.fromBufferAttribute(L,B),S[I+H+4]=s.x,S[I+H+5]=s.y,S[I+H+6]=s.z,S[I+H+7]=0),v===!0&&(s.fromBufferAttribute(D,B),S[I+H+8]=s.x,S[I+H+9]=s.y,S[I+H+10]=s.z,S[I+H+11]=D.itemSize===4?s.w:1)}}h={count:f,texture:w,size:new ot(x,_)},i.set(a,h),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function GS(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const VS={[fh]:"LINEAR_TONE_MAPPING",[dh]:"REINHARD_TONE_MAPPING",[ph]:"CINEON_TONE_MAPPING",[cc]:"ACES_FILMIC_TONE_MAPPING",[gh]:"AGX_TONE_MAPPING",[vh]:"NEUTRAL_TONE_MAPPING",[mh]:"CUSTOM_TONE_MAPPING"};function WS(n,t,e,i,s,r){const o=new un(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Kt;l.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Zt([0,2,0,0,2,0],2));const u=new F0({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Xt(l,u),h=new Ao(-1,1,1,-1,0,1);let d=null,p=null,v=!1,g,m=null,M=[],b=!1;this.setSize=function(x,_){o.setSize(x,_),a!==null&&a.setSize(x,_),c!==null&&c.setSize(x,_);for(let S=0;S<M.length;S++){const w=M[S];w.setSize&&w.setSize(x,_)}},this.setEffects=function(x){M=x,b=M.length>0&&M[0].isRenderPass===!0;const _=o.width,S=o.height;M.length>0&&a===null&&(a=new un(_,S,{type:dn,depthBuffer:!1,stencilBuffer:!1}),c=new un(_,S,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<M.length;w++){const y=M[w];y.setSize&&y.setSize(_,S)}},this.begin=function(x,_){if(v||x.toneMapping===ri&&M.length===0)return!1;if(m=_,_!==null){const S=_.width,w=_.height;(o.width!==S||o.height!==w)&&this.setSize(S,w)}return b===!1&&x.setRenderTarget(o),g=x.toneMapping,x.toneMapping=ri,!0},this.hasRenderPass=function(){return b},this.end=function(x,_){x.toneMapping=g,v=!0;let S=o,w=a;for(let y=0;y<M.length;y++){const T=M[y];T.enabled!==!1&&(T.render(x,w,S,_),T.needsSwap!==!1&&(S=w,w=w===a?c:a))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,u.defines={},ne.getTransfer(d)===fe&&(u.defines.SRGB_TRANSFER="");const y=VS[p];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,x.setRenderTarget(m),x.render(f,h),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const q0=new Xe,Hu=new lo(1,1),$0=new p0,K0=new tM,Y0=new S0,Fd=[],kd=[],Od=new Float32Array(16),Bd=new Float32Array(9),zd=new Float32Array(4);function ur(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Fd[s];if(r===void 0&&(r=new Float32Array(s),Fd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function qe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function $e(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function pc(n,t){let e=kd[t];e===void 0&&(e=new Int32Array(t),kd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function XS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function qS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2fv(this.addr,t),$e(e,t)}}function $S(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;n.uniform3fv(this.addr,t),$e(e,t)}}function KS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4fv(this.addr,t),$e(e,t)}}function YS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;zd.set(i),n.uniformMatrix2fv(this.addr,!1,zd),$e(e,i)}}function ZS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;Bd.set(i),n.uniformMatrix3fv(this.addr,!1,Bd),$e(e,i)}}function JS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;Od.set(i),n.uniformMatrix4fv(this.addr,!1,Od),$e(e,i)}}function QS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function jS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2iv(this.addr,t),$e(e,t)}}function tw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;n.uniform3iv(this.addr,t),$e(e,t)}}function ew(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4iv(this.addr,t),$e(e,t)}}function nw(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function iw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2uiv(this.addr,t),$e(e,t)}}function sw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;n.uniform3uiv(this.addr,t),$e(e,t)}}function rw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4uiv(this.addr,t),$e(e,t)}}function ow(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Hu.compareFunction=e.isReversedDepthBuffer()?Eh:Th,r=Hu):r=q0,e.setTexture2D(t||r,s)}function aw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||K0,s)}function cw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Y0,s)}function lw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||$0,s)}function uw(n){switch(n){case 5126:return XS;case 35664:return qS;case 35665:return $S;case 35666:return KS;case 35674:return YS;case 35675:return ZS;case 35676:return JS;case 5124:case 35670:return QS;case 35667:case 35671:return jS;case 35668:case 35672:return tw;case 35669:case 35673:return ew;case 5125:return nw;case 36294:return iw;case 36295:return sw;case 36296:return rw;case 35678:case 36198:case 36298:case 36306:case 35682:return ow;case 35679:case 36299:case 36307:return aw;case 35680:case 36300:case 36308:case 36293:return cw;case 36289:case 36303:case 36311:case 36292:return lw}}function hw(n,t){n.uniform1fv(this.addr,t)}function fw(n,t){const e=ur(t,this.size,2);n.uniform2fv(this.addr,e)}function dw(n,t){const e=ur(t,this.size,3);n.uniform3fv(this.addr,e)}function pw(n,t){const e=ur(t,this.size,4);n.uniform4fv(this.addr,e)}function mw(n,t){const e=ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function gw(n,t){const e=ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function vw(n,t){const e=ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function xw(n,t){n.uniform1iv(this.addr,t)}function _w(n,t){n.uniform2iv(this.addr,t)}function Mw(n,t){n.uniform3iv(this.addr,t)}function yw(n,t){n.uniform4iv(this.addr,t)}function bw(n,t){n.uniform1uiv(this.addr,t)}function Sw(n,t){n.uniform2uiv(this.addr,t)}function ww(n,t){n.uniform3uiv(this.addr,t)}function Tw(n,t){n.uniform4uiv(this.addr,t)}function Ew(n,t,e){const i=this.cache,s=t.length,r=pc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Hu:o=q0;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Aw(n,t,e){const i=this.cache,s=t.length,r=pc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||K0,r[o])}function Rw(n,t,e){const i=this.cache,s=t.length,r=pc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Y0,r[o])}function Cw(n,t,e){const i=this.cache,s=t.length,r=pc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||$0,r[o])}function Pw(n){switch(n){case 5126:return hw;case 35664:return fw;case 35665:return dw;case 35666:return pw;case 35674:return mw;case 35675:return gw;case 35676:return vw;case 5124:case 35670:return xw;case 35667:case 35671:return _w;case 35668:case 35672:return Mw;case 35669:case 35673:return yw;case 5125:return bw;case 36294:return Sw;case 36295:return ww;case 36296:return Tw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ew;case 35679:case 36299:case 36307:return Aw;case 35680:case 36300:case 36308:case 36293:return Rw;case 36289:case 36303:case 36311:case 36292:return Cw}}class Lw{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=uw(e.type)}}class Nw{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pw(e.type)}}class Iw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const pl=/(\w+)(\])?(\[|\.)?/g;function Hd(n,t){n.seq.push(t),n.map[t.id]=t}function Dw(n,t,e){const i=n.name,s=i.length;for(pl.lastIndex=0;;){const r=pl.exec(i),o=pl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Hd(e,l===void 0?new Lw(a,n,t):new Nw(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new Iw(a),Hd(e,f)),e=f}}}class Ia{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Dw(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Gd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Uw=37297;let Fw=0;function kw(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Vd=new $t;function Ow(n){ne._getMatrix(Vd,ne.workingColorSpace,n);const t=`mat3( ${Vd.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(n)){case Ya:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Wd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+kw(n.getShaderSource(t),a)}else return r}function Bw(n,t){const e=Ow(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const zw={[fh]:"Linear",[dh]:"Reinhard",[ph]:"Cineon",[cc]:"ACESFilmic",[gh]:"AgX",[vh]:"Neutral",[mh]:"Custom"};function Hw(n,t){const e=zw[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const la=new P;function Gw(){ne.getLuminanceCoefficients(la);const n=la.x.toFixed(4),t=la.y.toFixed(4),e=la.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function Ww(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Xw(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Or(n){return n!==""}function Xd(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gu(n){return n.replace(qw,Kw)}const $w=new Map;function Kw(n,t){let e=qt[t];if(e===void 0){const i=$w.get(t);if(i!==void 0)e=qt[i],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gu(e)}const Yw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $d(n){return n.replace(Yw,Zw)}function Zw(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kd(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Jw={[Ea]:"SHADOWMAP_TYPE_PCF",[Ur]:"SHADOWMAP_TYPE_VSM"};function Qw(n){return Jw[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jw={[ms]:"ENVMAP_TYPE_CUBE",[Qs]:"ENVMAP_TYPE_CUBE",[lc]:"ENVMAP_TYPE_CUBE_UV"};function tT(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":jw[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const eT={[Qs]:"ENVMAP_MODE_REFRACTION"};function nT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":eT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const iT={[hh]:"ENVMAP_BLENDING_MULTIPLY",[d_]:"ENVMAP_BLENDING_MIX",[p_]:"ENVMAP_BLENDING_ADD"};function sT(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":iT[n.combine]||"ENVMAP_BLENDING_NONE"}function rT(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function oT(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Qw(e),l=tT(e),u=nT(e),f=sT(e),h=rT(e),d=Vw(e),p=Ww(r),v=s.createProgram();let g,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Or).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Or).join(`
`),m.length>0&&(m+=`
`)):(g=[Kd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),m=[Kd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?qt.tonemapping_pars_fragment:"",e.toneMapping!==ri?Hw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Bw("linearToOutputTexel",e.outputColorSpace),Gw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Or).join(`
`)),o=Gu(o),o=Xd(o,e),o=qd(o,e),a=Gu(a),a=Xd(a,e),a=qd(a,e),o=$d(o),a=$d(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=M+g+o,x=M+m+a,_=Gd(s,s.VERTEX_SHADER,b),S=Gd(s,s.FRAGMENT_SHADER,x);s.attachShader(v,_),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(C){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",D=s.getShaderInfoLog(_)||"",I=s.getShaderInfoLog(S)||"",B=L.trim(),H=D.trim(),W=I.trim();let j=!0,O=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,_,S);else{const $=Wd(s,_,"vertex"),Q=Wd(s,S,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+$+`
`+Q)}else B!==""?Dt("WebGLProgram: Program Info Log:",B):(H===""||W==="")&&(O=!1);O&&(C.diagnostics={runnable:j,programLog:B,vertexShader:{log:H,prefix:g},fragmentShader:{log:W,prefix:m}})}s.deleteShader(_),s.deleteShader(S),y=new Ia(s,v),T=Xw(s,v)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,Uw)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fw++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=_,this.fragmentShader=S,this}let aT=0;class cT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new lT(t),e.set(t,i)),i}}class lT{constructor(t){this.id=aT++,this.code=t,this.usedTimes=0}}function uT(n){return n===gs||n===qa||n===$a}function hT(n,t,e,i,s,r){const o=new m0,a=new cT,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,T,R,C,L,D){const I=C.fog,B=L.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,j=t.get(y.envMap||H,W),O=j&&j.mapping===lc?j.image.height:null,$=d[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Dt("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const Q=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_t=Q!==void 0?Q.length:0;let ft=0;B.morphAttributes.position!==void 0&&(ft=1),B.morphAttributes.normal!==void 0&&(ft=2),B.morphAttributes.color!==void 0&&(ft=3);let St,Nt,zt,X;if($){const be=ti[$];St=be.vertexShader,Nt=be.fragmentShader}else{St=y.vertexShader,Nt=y.fragmentShader;const be=a.getVertexShaderStage(y),ue=a.getFragmentShaderStage(y);a.update(y,be,ue),zt=be.id,X=ue.id}const Y=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Pt=L.isInstancedMesh===!0,it=L.isBatchedMesh===!0,Wt=!!y.map,Re=!!y.matcap,st=!!j,Gt=!!y.aoMap,le=!!y.lightMap,ee=!!y.bumpMap&&y.wireframe===!1,Me=!!y.normalMap,Ie=!!y.displacementMap,Ke=!!y.emissiveMap,Te=!!y.metalnessMap,Ce=!!y.roughnessMap,F=y.anisotropy>0,tn=y.clearcoat>0,pe=y.dispersion>0,N=y.retroreflectivity>0,E=y.iridescence>0,z=y.sheen>0,q=y.transmission>0,Z=F&&!!y.anisotropyMap,at=tn&&!!y.clearcoatMap,ht=tn&&!!y.clearcoatNormalMap,J=tn&&!!y.clearcoatRoughnessMap,et=E&&!!y.iridescenceMap,dt=E&&!!y.iridescenceThicknessMap,Ut=z&&!!y.sheenColorMap,vt=z&&!!y.sheenRoughnessMap,pt=!!y.specularMap,Ft=!!y.specularColorMap,Bt=!!y.specularIntensityMap,Yt=q&&!!y.transmissionMap,k=q&&!!y.thicknessMap,mt=!!y.gradientMap,tt=!!y.alphaMap,gt=y.alphaTest>0,bt=!!y.alphaHash,nt=!!y.extensions;let kt=ri;y.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(kt=n.toneMapping);const Lt={shaderID:$,shaderType:y.type,shaderName:y.name,vertexShader:St,fragmentShader:Nt,defines:y.defines,customVertexShaderID:zt,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:it,batchingColor:it&&L._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&L.instanceColor!==null,instancingMorph:Pt&&L.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Wt,matcap:Re,envMap:st,envMapMode:st&&j.mapping,envMapCubeUVHeight:O,aoMap:Gt,lightMap:le,bumpMap:ee,normalMap:Me,displacementMap:Ie,emissiveMap:Ke,normalMapObjectSpace:Me&&y.normalMapType===__,normalMapTangentSpace:Me&&y.normalMapType===Ka,packedNormalMap:Me&&y.normalMapType===Ka&&uT(y.normalMap.format),metalnessMap:Te,roughnessMap:Ce,anisotropy:F,anisotropyMap:Z,clearcoat:tn,clearcoatMap:at,clearcoatNormalMap:ht,clearcoatRoughnessMap:J,dispersion:pe,retroreflection:N,iridescence:E,iridescenceMap:et,iridescenceThicknessMap:dt,sheen:z,sheenColorMap:Ut,sheenRoughnessMap:vt,specularMap:pt,specularColorMap:Ft,specularIntensityMap:Bt,transmission:q,transmissionMap:Yt,thicknessMap:k,gradientMap:mt,opaque:y.transparent===!1&&y.blending===Xr&&y.alphaToCoverage===!1,alphaMap:tt,alphaTest:gt,alphaHash:bt,combine:y.combine,mapUv:Wt&&p(y.map.channel),aoMapUv:Gt&&p(y.aoMap.channel),lightMapUv:le&&p(y.lightMap.channel),bumpMapUv:ee&&p(y.bumpMap.channel),normalMapUv:Me&&p(y.normalMap.channel),displacementMapUv:Ie&&p(y.displacementMap.channel),emissiveMapUv:Ke&&p(y.emissiveMap.channel),metalnessMapUv:Te&&p(y.metalnessMap.channel),roughnessMapUv:Ce&&p(y.roughnessMap.channel),anisotropyMapUv:Z&&p(y.anisotropyMap.channel),clearcoatMapUv:at&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:vt&&p(y.sheenRoughnessMap.channel),specularMapUv:pt&&p(y.specularMap.channel),specularColorMapUv:Ft&&p(y.specularColorMap.channel),specularIntensityMapUv:Bt&&p(y.specularIntensityMap.channel),transmissionMapUv:Yt&&p(y.transmissionMap.channel),thicknessMapUv:k&&p(y.thicknessMap.channel),alphaMapUv:tt&&p(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||F),vertexNormals:!!B.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Wt||tt),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:yt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:ft,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:kt,decodeVideoTexture:Wt&&y.map.isVideoTexture===!0&&ne.getTransfer(y.map.colorSpace)===fe,decodeVideoTextureEmissive:Ke&&y.emissiveMap.isVideoTexture===!0&&ne.getTransfer(y.emissiveMap.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===we,flipSided:y.side===Qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:nt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&y.extensions.multiDraw===!0||it)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function g(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)T.push(R),T.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(m(T,y),M(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function m(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function M(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function b(y){const T=d[y.type];let R;if(T){const C=ti[T];R=gn.clone(C.uniforms)}else R=y.uniforms;return R}function x(y,T){let R=u.get(T);return R!==void 0?++R.usedTimes:(R=new oT(n,T,y,s),l.push(R),u.set(T,R)),R}function _(y){if(--y.usedTimes===0){const T=l.indexOf(y);l[T]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function S(y){a.remove(y)}function w(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:_,releaseShaderCache:S,programs:l,dispose:w}}function fT(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function dT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Yd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Zd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,p,v,g,m){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:p,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},n[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=p,M.materialVariant=o(h),M.groupOrder=v,M.renderOrder=h.renderOrder,M.z=g,M.group=m),t++,M}function c(h,d,p,v,g,m,M){M.reversedDepth===!0&&(g=-g);const b=a(h,d,p,v,g,m);p.transmission>0?i.push(b):p.transparent===!0?s.push(b):e.push(b)}function l(h,d,p,v,g,m){const M=a(h,d,p,v,g,m);p.transmission>0?i.unshift(M):p.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,d){e.length>1&&e.sort(h||dT),i.length>1&&i.sort(d||Yd),s.length>1&&s.sort(d||Yd)}function f(){for(let h=t,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function pT(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Zd,n.set(i,[o])):s>=r.length?(o=new Zd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function mT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new ct};break;case"SpotLight":e={position:new P,direction:new P,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function gT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let vT=0;function xT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function _T(n){const t=new mT,e=gT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);const s=new P,r=new Ot,o=new Ot;function a(l){let u=0,f=0,h=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,M=0,b=0,x=0,_=0,S=0,w=0,y=0,T=0,R=0;l.sort(xT);for(let L=0,D=l.length;L<D;L++){const I=l[L],B=I.color,H=I.intensity,W=I.distance;let j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===gs?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=B.r*H,f+=B.g*H,h+=B.b*H;else if(I.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(I.sh.coefficients[O],H);R++}else if(I.isSunLight){const O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const $=I.shadow,Q=e.get(I);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[p]=Q,i.sunShadowMap[p]=j;const _t=$.getViewportCount();for(let ft=0;ft<_t;ft++)i.sunShadowMatrix[v+ft]=$.getMatrix(ft),i.sunShadowCascade[v+ft]=$._cascadeData[ft];v+=_t,p++}i.sun[d]=O,d++}else if(I.isDirectionalLight){const O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const $=I.shadow,Q=e.get(I);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=j,i.directionalShadowMatrix[g]=I.shadow.matrix,_++}i.directional[g]=O,g++}else if(I.isSpotLight){const O=t.get(I);O.position.setFromMatrixPosition(I.matrixWorld),O.color.copy(B).multiplyScalar(H),O.distance=W,O.coneCos=Math.cos(I.angle),O.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),O.decay=I.decay,i.spot[M]=O;const $=I.shadow;if(I.map&&(i.spotLightMap[y]=I.map,y++,$.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[M]=$.matrix,I.castShadow){const Q=e.get(I);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=j,w++}M++}else if(I.isRectAreaLight){const O=t.get(I);O.color.copy(B).multiplyScalar(H),O.halfWidth.set(I.width*.5,0,0),O.halfHeight.set(0,I.height*.5,0),i.rectArea[b]=O,b++}else if(I.isPointLight){const O=t.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),O.distance=I.distance,O.decay=I.decay,I.castShadow){const $=I.shadow,Q=e.get(I);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,Q.shadowCameraNear=$.camera.near,Q.shadowCameraFar=$.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=I.shadow.matrix,S++}i.point[m]=O,m++}else if(I.isHemisphereLight){const O=t.get(I);O.skyColor.copy(I.color).multiplyScalar(H),O.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[x]=O,x++}}b>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const C=i.hash;(C.sunLength!==d||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==M||C.rectAreaLength!==b||C.hemiLength!==x||C.numSunShadows!==p||C.numDirectionalShadows!==_||C.numPointShadows!==S||C.numSpotShadows!==w||C.numSpotMaps!==y||C.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=b,i.point.length=m,i.hemi.length=x,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.directionalShadowMatrix.length=_,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+y-T,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,C.sunLength=d,C.directionalLength=g,C.pointLength=m,C.spotLength=M,C.rectAreaLength=b,C.hemiLength=x,C.numSunShadows=p,C.numDirectionalShadows=_,C.numPointShadows=S,C.numSpotShadows=w,C.numSpotMaps=y,C.numLightProbes=R,i.version=vT++)}function c(l,u){let f=0,h=0,d=0,p=0,v=0,g=0;const m=u.matrixWorldInverse;for(let M=0,b=l.length;M<b;M++){const x=l[M];if(x.isSunLight){const _=i.sun[f];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),f++}else if(x.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(x.isSpotLight){const _=i.spot[p];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const _=i.rectArea[v];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const _=i.hemi[g];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:i}}function Jd(n){const t=new _T(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function o(h){e.push(h)}function a(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function MT(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Jd(n),t.set(s,[a])):r>=o.length?(a=new Jd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const yT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ST=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],wT=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Qd=new Ot,wr=new P,ml=new P;function TT(n,t,e){let i=new wo;const s=new ot,r=new ot,o=new de,a=new ny,c=new iy,l={},u=e.maxTextureSize,f={[Ai]:Qe,[Qe]:Ai,[we]:we},h=new re({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:yT,fragmentShader:bT}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new Kt;p.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let m=this.type;this.render=function(S,w,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Kx&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ea);const T=n.getRenderTarget(),R=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),L=n.state;L.setBlending(si),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const D=m!==this.type;D&&w.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=S.length;I<B;I++){const H=S[I],W=H.shadow;if(W===void 0){Dt("WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const j=W.getFrameExtents();s.multiply(j),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,W.mapSize.y=r.y));const O=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=O,W.map===null||D===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ur){if(H.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new un(s.x,s.y,{format:gs,type:dn,minFilter:We,magFilter:We,generateMipmaps:!1}),W.map.texture.name=H.name+".shadowMap",W.map.depthTexture=new lo(s.x,s.y,En),W.map.depthTexture.name=H.name+".shadowMapDepth",W.map.depthTexture.format=Ri,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve}else H.isPointLight?(W.map=new X0(s.x),W.map.depthTexture=new bM(s.x,ai)):(W.map=new un(s.x,s.y),W.map.depthTexture=new lo(s.x,s.y,ai)),W.map.depthTexture.name=H.name+".shadowMap",W.map.depthTexture.format=Ri,this.type===Ea?(W.map.depthTexture.compareFunction=O?Eh:Th,W.map.depthTexture.minFilter=We,W.map.depthTexture.magFilter=We):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const $=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();H.isPointLight!==!0&&W.updateMatrices(H,y);for(let Q=0;Q<$;Q++){const _t=W.getCamera(Q);if(H.isPointLight){const ft=W.camera,St=W.matrix,Nt=H.distance||ft.far;Nt!==ft.far&&(ft.far=Nt,ft.updateProjectionMatrix()),wr.setFromMatrixPosition(H.matrixWorld),ft.position.copy(wr),ml.copy(ft.position),ml.add(ST[Q]),ft.up.copy(wT[Q]),ft.lookAt(ml),ft.updateMatrixWorld(),St.makeTranslation(-wr.x,-wr.y,-wr.z),Qd.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Qd,ft.coordinateSystem,ft.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(W.map),n.clear());const ft=W.getViewport(Q);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),L.viewport(o)}i=W.getFrustum(Q),x(w,y,_t,H,this.type)}W.isPointLightShadow!==!0&&this.type===Ur&&M(W,y),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,R,C)};function M(S,w){const y=t.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new un(s.x,s.y,{format:gs,type:dn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,y,h,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,y,d,v,null)}function b(S,w,y,T){let R=null;const C=y.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)R=C;else if(R=y.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=R.uuid,D=w.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let B=I[D];B===void 0&&(B=R.clone(),I[D]=B,w.addEventListener("dispose",_)),R=B}if(R.visible=w.visible,R.wireframe=w.wireframe,T===Ur?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:f[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const L=n.properties.get(R);L.light=y}return R}function x(S,w,y,T,R){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===Ur)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,S.matrixWorld);const D=t.update(S),I=S.material;if(Array.isArray(I)){const B=D.groups;for(let H=0,W=B.length;H<W;H++){const j=B[H],O=I[j.materialIndex];if(O&&O.visible){const $=b(S,O,T,R);S.onBeforeShadow(n,S,w,y,D,$,j),n.renderBufferDirect(y,null,D,$,S,j),S.onAfterShadow(n,S,w,y,D,$,j)}}}else if(I.visible){const B=b(S,I,T,R);S.onBeforeShadow(n,S,w,y,D,B,null),n.renderBufferDirect(y,null,D,B,S,null),S.onAfterShadow(n,S,w,y,D,B,null)}}const L=S.children;for(let D=0,I=L.length;D<I;D++)x(L[D],w,y,T,R)}function _(S){S.target.removeEventListener("dispose",_);for(const y in l){const T=l[y],R=S.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function ET(n,t){function e(){let k=!1;const mt=new de;let tt=null;const gt=new de(0,0,0,0);return{setMask:function(bt){tt!==bt&&!k&&(n.colorMask(bt,bt,bt,bt),tt=bt)},setLocked:function(bt){k=bt},setClear:function(bt,nt,kt,Lt,be){be===!0&&(bt*=Lt,nt*=Lt,kt*=Lt),mt.set(bt,nt,kt,Lt),gt.equals(mt)===!1&&(n.clearColor(bt,nt,kt,Lt),gt.copy(mt))},reset:function(){k=!1,tt=null,gt.set(-1,0,0,0)}}}function i(){let k=!1,mt=!1,tt=null,gt=null,bt=null;return{setReversed:function(nt){if(mt!==nt){const kt=t.get("EXT_clip_control");nt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),mt=nt;const Lt=bt;bt=null,this.setClear(Lt)}},getReversed:function(){return mt},setTest:function(nt){nt?Y(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(nt){tt!==nt&&!k&&(n.depthMask(nt),tt=nt)},setFunc:function(nt){if(mt&&(nt=L_[nt]),gt!==nt){switch(nt){case jl:n.depthFunc(n.NEVER);break;case tu:n.depthFunc(n.ALWAYS);break;case eu:n.depthFunc(n.LESS);break;case eo:n.depthFunc(n.LEQUAL);break;case nu:n.depthFunc(n.EQUAL);break;case iu:n.depthFunc(n.GEQUAL);break;case su:n.depthFunc(n.GREATER);break;case ru:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}gt=nt}},setLocked:function(nt){k=nt},setClear:function(nt){bt!==nt&&(bt=nt,mt&&(nt=1-nt),n.clearDepth(nt))},reset:function(){k=!1,tt=null,gt=null,bt=null,mt=!1}}}function s(){let k=!1,mt=null,tt=null,gt=null,bt=null,nt=null,kt=null,Lt=null,be=null;return{setTest:function(ue){k||(ue?Y(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(ue){mt!==ue&&!k&&(n.stencilMask(ue),mt=ue)},setFunc:function(ue,Ln,$n){(tt!==ue||gt!==Ln||bt!==$n)&&(n.stencilFunc(ue,Ln,$n),tt=ue,gt=Ln,bt=$n)},setOp:function(ue,Ln,$n){(nt!==ue||kt!==Ln||Lt!==$n)&&(n.stencilOp(ue,Ln,$n),nt=ue,kt=Ln,Lt=$n)},setLocked:function(ue){k=ue},setClear:function(ue){be!==ue&&(n.clearStencil(ue),be=ue)},reset:function(){k=!1,mt=null,tt=null,gt=null,bt=null,nt=null,kt=null,Lt=null,be=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],v=null,g=!1,m=null,M=null,b=null,x=null,_=null,S=null,w=null,y=new ct(0,0,0),T=0,R=!1,C=null,L=null,D=null,I=null,B=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(O)[1]),W=j>=1):O.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),W=j>=2);let $=null,Q={};const _t=n.getParameter(n.SCISSOR_BOX),ft=n.getParameter(n.VIEWPORT),St=new de().fromArray(_t),Nt=new de().fromArray(ft);function zt(k,mt,tt,gt){const bt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(k,nt),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let kt=0;kt<tt;kt++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(mt,0,n.RGBA,1,1,gt,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(mt+kt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return nt}const X={};X[n.TEXTURE_2D]=zt(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=zt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=zt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=zt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(n.DEPTH_TEST),o.setFunc(eo),ee(!1),Me(Pf),Y(n.CULL_FACE),Gt(si);function Y(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function yt(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function Pt(k,mt){return h[k]!==mt?(n.bindFramebuffer(k,mt),h[k]=mt,k===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=mt),k===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=mt),!0):!1}function it(k,mt){let tt=p,gt=!1;if(k){tt=d.get(mt),tt===void 0&&(tt=[],d.set(mt,tt));const bt=k.textures;if(tt.length!==bt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,kt=bt.length;nt<kt;nt++)tt[nt]=n.COLOR_ATTACHMENT0+nt;tt.length=bt.length,gt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,gt=!0);gt&&n.drawBuffers(tt)}function Wt(k){return v!==k?(n.useProgram(k),v=k,!0):!1}const Re={[Gs]:n.FUNC_ADD,[Zx]:n.FUNC_SUBTRACT,[Jx]:n.FUNC_REVERSE_SUBTRACT};Re[Qx]=n.MIN,Re[jx]=n.MAX;const st={[t_]:n.ZERO,[e_]:n.ONE,[n_]:n.SRC_COLOR,[e0]:n.SRC_ALPHA,[c_]:n.SRC_ALPHA_SATURATE,[o_]:n.DST_COLOR,[s_]:n.DST_ALPHA,[i_]:n.ONE_MINUS_SRC_COLOR,[n0]:n.ONE_MINUS_SRC_ALPHA,[a_]:n.ONE_MINUS_DST_COLOR,[r_]:n.ONE_MINUS_DST_ALPHA,[l_]:n.CONSTANT_COLOR,[u_]:n.ONE_MINUS_CONSTANT_COLOR,[h_]:n.CONSTANT_ALPHA,[f_]:n.ONE_MINUS_CONSTANT_ALPHA};function Gt(k,mt,tt,gt,bt,nt,kt,Lt,be,ue){if(k===si){g===!0&&(yt(n.BLEND),g=!1);return}if(g===!1&&(Y(n.BLEND),g=!0),k!==Yx){if(k!==m||ue!==R){if((M!==Gs||_!==Gs)&&(n.blendEquation(n.FUNC_ADD),M=Gs,_=Gs),ue)switch(k){case Xr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mn:n.blendFunc(n.ONE,n.ONE);break;case Lf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Vt("WebGLState: Invalid blending: ",k);break}else switch(k){case Xr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lf:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nf:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",k);break}b=null,x=null,S=null,w=null,y.set(0,0,0),T=0,m=k,R=ue}return}bt=bt||mt,nt=nt||tt,kt=kt||gt,(mt!==M||bt!==_)&&(n.blendEquationSeparate(Re[mt],Re[bt]),M=mt,_=bt),(tt!==b||gt!==x||nt!==S||kt!==w)&&(n.blendFuncSeparate(st[tt],st[gt],st[nt],st[kt]),b=tt,x=gt,S=nt,w=kt),(Lt.equals(y)===!1||be!==T)&&(n.blendColor(Lt.r,Lt.g,Lt.b,be),y.copy(Lt),T=be),m=k,R=!1}function le(k,mt){k.side===we?yt(n.CULL_FACE):Y(n.CULL_FACE);let tt=k.side===Qe;mt&&(tt=!tt),ee(tt),k.blending===Xr&&k.transparent===!1?Gt(si):Gt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const gt=k.stencilWrite;a.setTest(gt),gt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ke(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ee(k){C!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),C=k)}function Me(k){k!==qx?(Y(n.CULL_FACE),k!==L&&(k===Pf?n.cullFace(n.BACK):k===$x?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),L=k}function Ie(k){k!==D&&(W&&n.lineWidth(k),D=k)}function Ke(k,mt,tt){k?(Y(n.POLYGON_OFFSET_FILL),(I!==mt||B!==tt)&&(I=mt,B=tt,o.getReversed()&&(mt=-mt),n.polygonOffset(mt,tt))):yt(n.POLYGON_OFFSET_FILL)}function Te(k){k?Y(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Ce(k){k===void 0&&(k=n.TEXTURE0+H-1),$!==k&&(n.activeTexture(k),$=k)}function F(k,mt,tt){tt===void 0&&($===null?tt=n.TEXTURE0+H-1:tt=$);let gt=Q[tt];gt===void 0&&(gt={type:void 0,texture:void 0},Q[tt]=gt),(gt.type!==k||gt.texture!==mt)&&($!==tt&&(n.activeTexture(tt),$=tt),n.bindTexture(k,mt||X[k]),gt.type=k,gt.texture=mt)}function tn(){const k=Q[$];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function pe(){try{n.compressedTexImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function E(){try{n.texSubImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function z(){try{n.texSubImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function at(){try{n.texStorage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function ht(){try{n.texStorage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function J(){try{n.texImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function et(){try{n.texImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function dt(k){return f[k]!==void 0?f[k]:n.getParameter(k)}function Ut(k,mt){f[k]!==mt&&(n.pixelStorei(k,mt),f[k]=mt)}function vt(k){St.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),St.copy(k))}function pt(k){Nt.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Nt.copy(k))}function Ft(k,mt){let tt=l.get(mt);tt===void 0&&(tt=new WeakMap,l.set(mt,tt));let gt=tt.get(k);gt===void 0&&(gt=n.getUniformBlockIndex(mt,k.name),tt.set(k,gt))}function Bt(k,mt){const gt=l.get(mt).get(k);c.get(mt)!==gt&&(n.uniformBlockBinding(mt,gt,k.__bindingPointIndex),c.set(mt,gt))}function Yt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,Q={},h={},d=new WeakMap,p=[],v=null,g=!1,m=null,M=null,b=null,x=null,_=null,S=null,w=null,y=new ct(0,0,0),T=0,R=!1,C=null,L=null,D=null,I=null,B=null,St.set(0,0,n.canvas.width,n.canvas.height),Nt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:yt,bindFramebuffer:Pt,drawBuffers:it,useProgram:Wt,setBlending:Gt,setMaterial:le,setFlipSided:ee,setCullFace:Me,setLineWidth:Ie,setPolygonOffset:Ke,setScissorTest:Te,activeTexture:Ce,bindTexture:F,unbindTexture:tn,compressedTexImage2D:pe,compressedTexImage3D:N,texImage2D:J,texImage3D:et,pixelStorei:Ut,getParameter:dt,updateUBOMapping:Ft,uniformBlockBinding:Bt,texStorage2D:at,texStorage3D:ht,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:vt,viewport:pt,reset:Yt}}function AT(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(N,E){return p?new OffscreenCanvas(N,E):ao("canvas")}function g(N,E,z){let q=1;const Z=pe(N);if((Z.width>z||Z.height>z)&&(q=z/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const at=Math.floor(q*Z.width),ht=Math.floor(q*Z.height);h===void 0&&(h=v(at,ht));const J=E?v(at,ht):h;return J.width=at,J.height=ht,J.getContext("2d").drawImage(N,0,0,at,ht),Dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+at+"x"+ht+")."),J}else return"data"in N&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),N;return N}function m(N){return N.generateMipmaps}function M(N){n.generateMipmap(N)}function b(N){return N.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?n.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(N,E,z,q,Z,at=!1){if(N!==null){if(n[N]!==void 0)return n[N];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ht;q&&(ht=t.get("EXT_texture_norm16"),ht||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=E;if(E===n.RED&&(z===n.FLOAT&&(J=n.R32F),z===n.HALF_FLOAT&&(J=n.R16F),z===n.UNSIGNED_BYTE&&(J=n.R8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.R16_EXT),z===n.SHORT&&ht&&(J=ht.R16_SNORM_EXT)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.R8UI),z===n.UNSIGNED_SHORT&&(J=n.R16UI),z===n.UNSIGNED_INT&&(J=n.R32UI),z===n.BYTE&&(J=n.R8I),z===n.SHORT&&(J=n.R16I),z===n.INT&&(J=n.R32I)),E===n.RG&&(z===n.FLOAT&&(J=n.RG32F),z===n.HALF_FLOAT&&(J=n.RG16F),z===n.UNSIGNED_BYTE&&(J=n.RG8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.RG16_EXT),z===n.SHORT&&ht&&(J=ht.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RG8UI),z===n.UNSIGNED_SHORT&&(J=n.RG16UI),z===n.UNSIGNED_INT&&(J=n.RG32UI),z===n.BYTE&&(J=n.RG8I),z===n.SHORT&&(J=n.RG16I),z===n.INT&&(J=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RGB8UI),z===n.UNSIGNED_SHORT&&(J=n.RGB16UI),z===n.UNSIGNED_INT&&(J=n.RGB32UI),z===n.BYTE&&(J=n.RGB8I),z===n.SHORT&&(J=n.RGB16I),z===n.INT&&(J=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),z===n.UNSIGNED_INT&&(J=n.RGBA32UI),z===n.BYTE&&(J=n.RGBA8I),z===n.SHORT&&(J=n.RGBA16I),z===n.INT&&(J=n.RGBA32I)),E===n.RGB&&(z===n.UNSIGNED_SHORT&&ht&&(J=ht.RGB16_EXT),z===n.SHORT&&ht&&(J=ht.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),E===n.RGBA){const et=at?Ya:ne.getTransfer(Z);z===n.FLOAT&&(J=n.RGBA32F),z===n.HALF_FLOAT&&(J=n.RGBA16F),z===n.UNSIGNED_BYTE&&(J=et===fe?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.RGBA16_EXT),z===n.SHORT&&ht&&(J=ht.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(N,E){let z;return N?E===null||E===ai||E===io?z=n.DEPTH24_STENCIL8:E===En?z=n.DEPTH32F_STENCIL8:E===no&&(z=n.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ai||E===io?z=n.DEPTH_COMPONENT24:E===En?z=n.DEPTH_COMPONENT32F:E===no&&(z=n.DEPTH_COMPONENT16),z}function S(N,E){return m(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ve&&N.minFilter!==We?Math.log2(Math.max(E.width,E.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?E.mipmaps.length:1}function w(N){const E=N.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&f.delete(E)}function y(N){const E=N.target;E.removeEventListener("dispose",y),C(E)}function T(N){const E=i.get(N);if(E.__webglInit===void 0)return;const z=N.source,q=d.get(z);if(q){const Z=q[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(N),Object.keys(q).length===0&&d.delete(z)}i.remove(N)}function R(N){const E=i.get(N);n.deleteTexture(E.__webglTexture);const z=N.source,q=d.get(z);delete q[E.__cacheKey],o.memory.textures--}function C(N){const E=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(E.__webglFramebuffer[q]))for(let Z=0;Z<E.__webglFramebuffer[q].length;Z++)n.deleteFramebuffer(E.__webglFramebuffer[q][Z]);else n.deleteFramebuffer(E.__webglFramebuffer[q]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[q])}else{if(Array.isArray(E.__webglFramebuffer))for(let q=0;q<E.__webglFramebuffer.length;q++)n.deleteFramebuffer(E.__webglFramebuffer[q]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let q=0;q<E.__webglColorRenderbuffer.length;q++)E.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[q]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=N.textures;for(let q=0,Z=z.length;q<Z;q++){const at=i.get(z[q]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(z[q])}i.remove(N)}let L=0;function D(){L=0}function I(){return L}function B(N){L=N}function H(){const N=L;return N>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,N}function W(N){const E=[];return E.push(N.wrapS),E.push(N.wrapT),E.push(N.wrapR||0),E.push(N.magFilter),E.push(N.minFilter),E.push(N.anisotropy),E.push(N.internalFormat),E.push(N.format),E.push(N.type),E.push(N.generateMipmaps),E.push(N.premultiplyAlpha),E.push(N.flipY),E.push(N.unpackAlignment),E.push(N.colorSpace),E.join()}function j(N,E){const z=i.get(N);if(N.isVideoTexture&&F(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&z.__version!==N.version){const q=N.image;if(q===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,N,E);return}}else N.isExternalTexture&&(z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function O(N,E){const z=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&z.__version!==N.version){yt(z,N,E);return}else N.isExternalTexture&&(z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function $(N,E){const z=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&z.__version!==N.version){yt(z,N,E);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function Q(N,E){const z=i.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&z.__version!==N.version){Pt(z,N,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const _t={[js]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[Xa]:n.MIRRORED_REPEAT},ft={[Ve]:n.NEAREST,[s0]:n.NEAREST_MIPMAP_NEAREST,[Fr]:n.NEAREST_MIPMAP_LINEAR,[We]:n.LINEAR,[Aa]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},St={[y_]:n.NEVER,[E_]:n.ALWAYS,[b_]:n.LESS,[Th]:n.LEQUAL,[S_]:n.EQUAL,[Eh]:n.GEQUAL,[w_]:n.GREATER,[T_]:n.NOTEQUAL};function Nt(N,E){if(E.type===En&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===We||E.magFilter===Aa||E.magFilter===Fr||E.magFilter===yi||E.minFilter===We||E.minFilter===Aa||E.minFilter===Fr||E.minFilter===yi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(N,n.TEXTURE_WRAP_S,_t[E.wrapS]),n.texParameteri(N,n.TEXTURE_WRAP_T,_t[E.wrapT]),(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)&&n.texParameteri(N,n.TEXTURE_WRAP_R,_t[E.wrapR]),n.texParameteri(N,n.TEXTURE_MAG_FILTER,ft[E.magFilter]),n.texParameteri(N,n.TEXTURE_MIN_FILTER,ft[E.minFilter]),E.compareFunction&&(n.texParameteri(N,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(N,n.TEXTURE_COMPARE_FUNC,St[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ve||E.minFilter!==Fr&&E.minFilter!==yi||E.type===En&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(N,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function zt(N,E){let z=!1;N.__webglInit===void 0&&(N.__webglInit=!0,E.addEventListener("dispose",w));const q=E.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const at=W(E);if(at!==N.__cacheKey){Z[at]===void 0&&(Z[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Z[at].usedTimes++;const ht=Z[N.__cacheKey];ht!==void 0&&(Z[N.__cacheKey].usedTimes--,ht.usedTimes===0&&R(E)),N.__cacheKey=at,N.__webglTexture=Z[at].texture}return z}function X(N,E,z){return Math.floor(Math.floor(N/z)/E)}function Y(N,E,z,q){const at=N.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,z,q,E.data);else{at.sort((Ut,vt)=>Ut.start-vt.start);let ht=0;for(let Ut=1;Ut<at.length;Ut++){const vt=at[ht],pt=at[Ut],Ft=vt.start+vt.count,Bt=X(pt.start,E.width,4),Yt=X(vt.start,E.width,4);pt.start<=Ft+1&&Bt===Yt&&X(pt.start+pt.count-1,E.width,4)===Bt?vt.count=Math.max(vt.count,pt.start+pt.count-vt.start):(++ht,at[ht]=pt)}at.length=ht+1;const J=e.getParameter(n.UNPACK_ROW_LENGTH),et=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let Ut=0,vt=at.length;Ut<vt;Ut++){const pt=at[Ut],Ft=Math.floor(pt.start/4),Bt=Math.ceil(pt.count/4),Yt=Ft%E.width,k=Math.floor(Ft/E.width),mt=Bt,tt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(n.UNPACK_SKIP_ROWS,k),e.texSubImage2D(n.TEXTURE_2D,0,Yt,k,mt,tt,z,q,E.data)}N.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,J),e.pixelStorei(n.UNPACK_SKIP_PIXELS,et),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function yt(N,E,z){let q=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(q=n.TEXTURE_3D);const Z=zt(N,E),at=E.source;e.bindTexture(q,N.__webglTexture,n.TEXTURE0+z);const ht=i.get(at);if(at.version!==ht.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const tt=ne.getPrimaries(ne.workingColorSpace),gt=E.colorSpace===qi?null:ne.getPrimaries(E.colorSpace),bt=E.colorSpace===qi||tt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let et=g(E.image,!1,s.maxTextureSize);et=tn(E,et);const dt=r.convert(E.format,E.colorSpace),Ut=r.convert(E.type);let vt=x(E.internalFormat,dt,Ut,E.normalized,E.colorSpace,E.isVideoTexture);Nt(q,E);let pt;const Ft=E.mipmaps,Bt=E.isVideoTexture!==!0,Yt=ht.__version===void 0||Z===!0,k=at.dataReady,mt=S(E,et);if(E.isDepthTexture)vt=_(E.format===cs,E.type),Yt&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,vt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Ut,null));else if(E.isDataTexture)if(Ft.length>0){Bt&&Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,Ft[0].width,Ft[0].height);for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,dt,Ut,pt.data);E.generateMipmaps=!1}else Bt?(Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,et.width,et.height),k&&Y(E,et,dt,Ut)):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Ut,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Bt&&Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,mt,vt,Ft[0].width,Ft[0].height,et.depth);for(let tt=0,gt=Ft.length;tt<gt;tt++)if(pt=Ft[tt],E.format!==An)if(dt!==null)if(Bt){if(k)if(E.layerUpdates.size>0){const bt=Pd(pt.width,pt.height,E.format,E.type);for(const nt of E.layerUpdates){const kt=pt.data.subarray(nt*bt/pt.data.BYTES_PER_ELEMENT,(nt+1)*bt/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,nt,pt.width,pt.height,1,dt,kt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,pt.width,pt.height,et.depth,dt,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,vt,pt.width,pt.height,et.depth,0,pt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,pt.width,pt.height,et.depth,dt,Ut,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,vt,pt.width,pt.height,et.depth,0,dt,Ut,pt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Bt&&Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,Ft[0].width,Ft[0].height);for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],E.format!==An?dt!==null?Bt?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,pt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,dt,Ut,pt.data)}else if(E.isDataArrayTexture)if(Bt){if(Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,mt,vt,et.width,et.height,et.depth),k)if(E.layerUpdates.size>0){const tt=Pd(et.width,et.height,E.format,E.type);for(const gt of E.layerUpdates){const bt=et.data.subarray(gt*tt/et.data.BYTES_PER_ELEMENT,(gt+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,gt,et.width,et.height,1,dt,Ut,bt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,Ut,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,vt,et.width,et.height,et.depth,0,dt,Ut,et.data);else if(E.isData3DTexture)Bt?(Yt&&e.texStorage3D(n.TEXTURE_3D,mt,vt,et.width,et.height,et.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,Ut,et.data)):e.texImage3D(n.TEXTURE_3D,0,vt,et.width,et.height,et.depth,0,dt,Ut,et.data);else if(E.isFramebufferTexture){if(Yt)if(Bt)e.texStorage2D(n.TEXTURE_2D,mt,vt,et.width,et.height);else{let tt=et.width,gt=et.height;for(let bt=0;bt<mt;bt++)e.texImage2D(n.TEXTURE_2D,bt,vt,tt,gt,0,dt,Ut,null),tt>>=1,gt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){const tt=n.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),et.parentNode!==tt){tt.appendChild(et),f.add(E),tt.onpaint=gt=>{const bt=gt.changedElements;for(const nt of f)bt.includes(nt.image)&&(nt.needsUpdate=!0)},tt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,et);else{const bt=n.RGBA,nt=n.RGBA,kt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,bt,nt,kt,et)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(Bt&&Yt){const tt=pe(Ft[0]);e.texStorage2D(n.TEXTURE_2D,mt,vt,tt.width,tt.height)}for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt,Ut,pt):e.texImage2D(n.TEXTURE_2D,tt,vt,dt,Ut,pt);E.generateMipmaps=!1}else if(Bt){if(Yt){const tt=pe(et);e.texStorage2D(n.TEXTURE_2D,mt,vt,tt.width,tt.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Ut,et)}else e.texImage2D(n.TEXTURE_2D,0,vt,dt,Ut,et);m(E)&&M(q),ht.__version=at.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function Pt(N,E,z){if(E.image.length!==6)return;const q=zt(N,E),Z=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+z);const at=i.get(Z);if(Z.version!==at.__version||q===!0){e.activeTexture(n.TEXTURE0+z);const ht=ne.getPrimaries(ne.workingColorSpace),J=E.colorSpace===qi?null:ne.getPrimaries(E.colorSpace),et=E.colorSpace===qi||ht===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const dt=E.isCompressedTexture||E.image[0].isCompressedTexture,Ut=E.image[0]&&E.image[0].isDataTexture,vt=[];for(let nt=0;nt<6;nt++)!dt&&!Ut?vt[nt]=g(E.image[nt],!0,s.maxCubemapSize):vt[nt]=Ut?E.image[nt].image:E.image[nt],vt[nt]=tn(E,vt[nt]);const pt=vt[0],Ft=r.convert(E.format,E.colorSpace),Bt=r.convert(E.type),Yt=x(E.internalFormat,Ft,Bt,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,mt=at.__version===void 0||q===!0,tt=Z.dataReady;let gt=S(E,pt);Nt(n.TEXTURE_CUBE_MAP,E);let bt;if(dt){k&&mt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Yt,pt.width,pt.height);for(let nt=0;nt<6;nt++){bt=vt[nt].mipmaps;for(let kt=0;kt<bt.length;kt++){const Lt=bt[kt];E.format!==An?Ft!==null?k?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,0,0,Lt.width,Lt.height,Ft,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,Yt,Lt.width,Lt.height,0,Lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,0,0,Lt.width,Lt.height,Ft,Bt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,Yt,Lt.width,Lt.height,0,Ft,Bt,Lt.data)}}}else{if(bt=E.mipmaps,k&&mt){bt.length>0&&gt++;const nt=pe(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Yt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Ut){k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,vt[nt].width,vt[nt].height,Ft,Bt,vt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,vt[nt].width,vt[nt].height,0,Ft,Bt,vt[nt].data);for(let kt=0;kt<bt.length;kt++){const be=bt[kt].image[nt].image;k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,0,0,be.width,be.height,Ft,Bt,be.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,Yt,be.width,be.height,0,Ft,Bt,be.data)}}else{k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Ft,Bt,vt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,Ft,Bt,vt[nt]);for(let kt=0;kt<bt.length;kt++){const Lt=bt[kt];k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,0,0,Ft,Bt,Lt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,Yt,Ft,Bt,Lt.image[nt])}}}m(E)&&M(n.TEXTURE_CUBE_MAP),at.__version=Z.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function it(N,E,z,q,Z,at){const ht=r.convert(z.format,z.colorSpace),J=r.convert(z.type),et=x(z.internalFormat,ht,J,z.normalized,z.colorSpace),dt=i.get(E),Ut=i.get(z);if(Ut.__renderTarget=E,!dt.__hasExternalTextures){const vt=Math.max(1,E.width>>at),pt=Math.max(1,E.height>>at);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,at,et,vt,pt,E.depth,0,ht,J,null):e.texImage2D(Z,at,et,vt,pt,0,ht,J,null)}e.bindFramebuffer(n.FRAMEBUFFER,N),Ce(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,0,Te(E)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Wt(N,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,N),E.depthBuffer){const q=E.depthTexture,Z=q&&q.isDepthTexture?q.type:null,at=_(E.stencilBuffer,Z),ht=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ce(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),at,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),at,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,at,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,N)}else{const q=E.textures;for(let Z=0;Z<q.length;Z++){const at=q[Z],ht=r.convert(at.format,at.colorSpace),J=r.convert(at.type),et=x(at.internalFormat,ht,J,at.normalized,at.colorSpace);Ce(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),et,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),et,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,et,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(N,E,z){const q=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,N),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(E.depthTexture);if(Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,E.depthTexture);const dt=r.convert(E.depthTexture.format),Ut=r.convert(E.depthTexture.type);let vt;E.depthTexture.format===Ri?vt=n.DEPTH_COMPONENT24:E.depthTexture.format===cs&&(vt=n.DEPTH24_STENCIL8);for(let pt=0;pt<6;pt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,vt,E.width,E.height,0,dt,Ut,null)}}else j(E.depthTexture,0);const at=Z.__webglTexture,ht=Te(E),J=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,et=E.depthTexture.format===cs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ri)Ce(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,J,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,J,at,0);else if(E.depthTexture.format===cs)Ce(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,J,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,J,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(N){const E=i.get(N),z=N.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==N.depthTexture){const q=N.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),q){const Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=q}if(N.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)Re(E.__webglFramebuffer[q],N,q);else{const q=N.texture.mipmaps;q&&q.length>0?Re(E.__webglFramebuffer[0],N,0):Re(E.__webglFramebuffer,N,0)}else if(z){E.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[q]),E.__webglDepthbuffer[q]===void 0)E.__webglDepthbuffer[q]=n.createRenderbuffer(),Wt(E.__webglDepthbuffer[q],N,!1);else{const Z=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}else{const q=N.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Wt(E.__webglDepthbuffer,N,!1);else{const Z=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(N,E,z){const q=i.get(N);E!==void 0&&it(q.__webglFramebuffer,N,N.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&st(N)}function le(N){const E=N.texture,z=i.get(N),q=i.get(E);N.addEventListener("dispose",y);const Z=N.textures,at=N.isWebGLCubeRenderTarget===!0,ht=Z.length>1;if(ht||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=E.version,o.memory.textures++),at){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let et=0;et<E.mipmaps.length;et++)z.__webglFramebuffer[J][et]=n.createFramebuffer()}else z.__webglFramebuffer[J]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<E.mipmaps.length;J++)z.__webglFramebuffer[J]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ht)for(let J=0,et=Z.length;J<et;J++){const dt=i.get(Z[J]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),o.memory.textures++)}if(N.samples>0&&Ce(N)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const et=Z[J];z.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[J]);const dt=r.convert(et.format,et.colorSpace),Ut=r.convert(et.type),vt=x(et.internalFormat,dt,Ut,et.normalized,et.colorSpace,N.isXRRenderTarget===!0),pt=Te(N);n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,vt,N.width,N.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,z.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),N.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Wt(z.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,E);for(let J=0;J<6;J++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(z.__webglFramebuffer[J][et],N,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,et);else it(z.__webglFramebuffer[J],N,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(E)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let J=0,et=Z.length;J<et;J++){const dt=Z[J],Ut=i.get(dt);let vt=n.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(vt=N.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(vt,Ut.__webglTexture),Nt(vt,dt),it(z.__webglFramebuffer,N,dt,n.COLOR_ATTACHMENT0+J,vt,0),m(dt)&&M(vt)}e.unbindTexture()}else{let J=n.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(J=N.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(J,q.__webglTexture),Nt(J,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(z.__webglFramebuffer[et],N,E,n.COLOR_ATTACHMENT0,J,et);else it(z.__webglFramebuffer,N,E,n.COLOR_ATTACHMENT0,J,0);m(E)&&M(J),e.unbindTexture()}N.depthBuffer&&st(N)}function ee(N){const E=N.textures;for(let z=0,q=E.length;z<q;z++){const Z=E[z];if(m(Z)){const at=b(N),ht=i.get(Z).__webglTexture;e.bindTexture(at,ht),M(at),e.unbindTexture()}}}const Me=[],Ie=[];function Ke(N){if(N.samples>0){if(Ce(N)===!1){const E=N.textures,z=N.width,q=N.height;let Z=n.COLOR_BUFFER_BIT;const at=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(N),J=E.length>1;if(J)for(let dt=0;dt<E.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const et=N.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let dt=0;dt<E.length;dt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);const Ut=i.get(E[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ut,0)}n.blitFramebuffer(0,0,z,q,0,0,z,q,Z,n.NEAREST),c===!0&&(Me.length=0,Ie.length=0,Me.push(n.COLOR_ATTACHMENT0+dt),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&(Me.push(at),Ie.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ie)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let dt=0;dt<E.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);const Ut=i.get(E[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const E=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Te(N){return Math.min(s.maxSamples,N.samples)}function Ce(N){const E=i.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function F(N){const E=o.render.frame;u.get(N)!==E&&(u.set(N,E),N.update())}function tn(N,E){const z=N.colorSpace,q=N.format,Z=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||z!==yn&&z!==qi&&(ne.getTransfer(z)===fe?(q!==An||Z!==Mn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",z)),E}function pe(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=D,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=O,this.setTexture3D=$,this.setTextureCube=Q,this.rebindTextures=Gt,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=it,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function RT(n,t){function e(i,s=qi){let r;const o=ne.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===_h)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===a0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===c0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===r0)return n.BYTE;if(i===o0)return n.SHORT;if(i===no)return n.UNSIGNED_SHORT;if(i===xh)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===dn)return n.HALF_FLOAT;if(i===l0)return n.ALPHA;if(i===u0)return n.RGB;if(i===An)return n.RGBA;if(i===Ri)return n.DEPTH_COMPONENT;if(i===cs)return n.DEPTH_STENCIL;if(i===yh)return n.RED;if(i===bh)return n.RED_INTEGER;if(i===gs)return n.RG;if(i===Sh)return n.RG_INTEGER;if(i===wh)return n.RGBA_INTEGER;if(i===Ra||i===Ca||i===Pa||i===La)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===La)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ou||i===au||i===cu||i===lu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ou)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===au)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===cu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===lu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===uu||i===hu||i===fu||i===du||i===pu||i===qa||i===mu)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===uu||i===hu)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===fu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===du)return r.COMPRESSED_R11_EAC;if(i===pu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===qa)return r.COMPRESSED_RG11_EAC;if(i===mu)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===gu||i===vu||i===xu||i===_u||i===Mu||i===yu||i===bu||i===Su||i===wu||i===Tu||i===Eu||i===Au||i===Ru||i===Cu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===gu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===vu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_u)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Su)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Eu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Au)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ru)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pu||i===Lu||i===Nu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pu)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Iu||i===Du||i===$a||i===Uu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Iu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Du)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Uu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===io?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const CT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class LT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new w0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new re({vertexShader:CT,fragmentShader:PT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class NT extends xs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new LT,m={},M=e.getContextAttributes();let b=null,x=null;const _=[],S=[],w=new ot;let y=null,T=null;const R=new ln;R.viewport=new de;const C=new ln;C.viewport=new de;const L=[R,C],D=new Cy;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=_[X];return Y===void 0&&(Y=new Hc,_[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=_[X];return Y===void 0&&(Y=new Hc,_[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=_[X];return Y===void 0&&(Y=new Hc,_[X]=Y),Y.getHandSpace()};function H(X){const Y=S.indexOf(X.inputSource);if(Y===-1)return;const yt=_[Y];yt!==void 0&&(yt.update(X.inputSource,X.frame,l||o),yt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let X=0;X<_.length;X++){const Y=S[X];Y!==null&&(S[X]=null,_[X].disconnect(Y))}I=null,B=null,g.reset();for(const X in m)delete m[X];if(t.setRenderTarget(b),d=null,h=null,f=null,s=null,x=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(w.width,w.height,!1),T!==null){const X=T.camera;X.fov=T.fov,X.zoom=T.zoom,X.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Pt=null,it=null;M.depth&&(it=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=M.stencil?cs:Ri,Pt=M.stencil?io:ai);const Wt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Wt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),x=new un(h.textureWidth,h.textureHeight,{format:An,type:Mn,depthTexture:new lo(h.textureWidth,h.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const yt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new un(d.framebufferWidth,d.framebufferHeight,{format:An,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(X){for(let Y=0;Y<X.removed.length;Y++){const yt=X.removed[Y],Pt=S.indexOf(yt);Pt>=0&&(S[Pt]=null,_[Pt].disconnect(yt))}for(let Y=0;Y<X.added.length;Y++){const yt=X.added[Y];let Pt=S.indexOf(yt);if(Pt===-1){for(let Wt=0;Wt<_.length;Wt++)if(Wt>=S.length){S.push(yt),Pt=Wt;break}else if(S[Wt]===null){S[Wt]=yt,Pt=Wt;break}if(Pt===-1)break}const it=_[Pt];it&&it.connect(yt)}}const O=new P,$=new P;function Q(X,Y,yt){O.setFromMatrixPosition(Y.matrixWorld),$.setFromMatrixPosition(yt.matrixWorld);const Pt=O.distanceTo($),it=Y.projectionMatrix.elements,Wt=yt.projectionMatrix.elements,Re=it[14]/(it[10]-1),st=it[14]/(it[10]+1),Gt=(it[9]+1)/it[5],le=(it[9]-1)/it[5],ee=(it[8]-1)/it[0],Me=(Wt[8]+1)/Wt[0],Ie=Re*ee,Ke=Re*Me,Te=Pt/(-ee+Me),Ce=Te*-ee;if(Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ce),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),it[10]===-1)X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const F=Re+Te,tn=st+Te,pe=Ie-Ce,N=Ke+(Pt-Ce),E=Gt*st/tn*F,z=le*st/tn*F;X.projectionMatrix.makePerspective(pe,N,E,z,F,tn),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function _t(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Y=X.near,yt=X.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),D.near=C.near=R.near=Y,D.far=C.far=R.far=yt,(I!==D.near||B!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,B=D.far),D.layers.mask=X.layers.mask|6,R.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const Pt=X.parent,it=D.cameras;_t(D,Pt);for(let Wt=0;Wt<it.length;Wt++)_t(it[Wt],Pt);it.length===2?Q(D,R,C):D.projectionMatrix.copy(R.projectionMatrix),T===null&&X.isPerspectiveCamera&&(T={camera:X,fov:X.fov,zoom:X.zoom}),ft(X,D,Pt)};function ft(X,Y,yt){yt===null?X.matrix.copy(Y.matrixWorld):(X.matrix.copy(yt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Y.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=tr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(X){return m[X]};let St=null;function Nt(X,Y){if(u=Y.getViewerPose(l||o),p=Y,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Pt=!1;yt.length!==D.cameras.length&&(D.cameras.length=0,Pt=!0);for(let st=0;st<yt.length;st++){const Gt=yt[st];let le=null;if(d!==null)le=d.getViewport(Gt);else{const Me=f.getViewSubImage(h,Gt);le=Me.viewport,st===0&&(t.setRenderTargetTextures(x,Me.colorTexture,Me.depthStencilTexture),t.setRenderTarget(x))}let ee=L[st];ee===void 0&&(ee=new ln,ee.layers.enable(st),ee.viewport=new de,L[st]=ee),ee.matrix.fromArray(Gt.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Gt.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(le.x,le.y,le.width,le.height),st===0&&(D.matrix.copy(ee.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Pt===!0&&D.cameras.push(ee)}const it=s.enabledFeatures;if(it&&it.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const st=f.getDepthInformation(yt[0]);st&&st.isValid&&st.texture&&g.init(st,s.renderState)}if(it&&it.includes("camera-access")&&v){t.state.unbindTexture(),f=i.getBinding();for(let st=0;st<yt.length;st++){const Gt=yt[st].camera;if(Gt){let le=m[Gt];le||(le=new w0,m[Gt]=le);const ee=f.getCameraImage(Gt);le.sourceTexture=ee}}}}for(let yt=0;yt<_.length;yt++){const Pt=S[yt],it=_[yt];Pt!==null&&it!==void 0&&it.update(Pt,Y,l||o)}St&&St(X,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),p=null}const zt=new V0;zt.setAnimationLoop(Nt),this.setAnimationLoop=function(X){St=X},this.dispose=function(){}}}const IT=new Ot,Z0=new $t;Z0.set(-1,0,0,0,1,0,0,0,1);function DT(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,U0(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,b,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,M,b):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Qe&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Qe&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=t.get(m),b=M.envMap,x=M.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(IT.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Z0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qe&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const M=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function UT(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,_){const S=_.program;i.uniformBlockBinding(x,S)}function l(x,_){let S=s[x.id];S===void 0&&(g(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",M));const w=_.program;i.updateUBOMapping(x,w);const y=t.render.frame;r[x.id]!==y&&(h(x),r[x.id]=y)}function u(x){const _=f();x.__bindingPointIndex=_;const S=n.createBuffer(),w=x.__size,y=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,w,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,S),S}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const _=s[x.id],S=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let y=0,T=S.length;y<T;y++){const R=S[y];if(Array.isArray(R))for(let C=0,L=R.length;C<L;C++)d(R[C],y,C,w);else d(R,y,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,_,S,w){if(v(x,_,S,w)===!0){const y=x.__offset,T=x.value;if(Array.isArray(T)){let R=0;for(let C=0;C<T.length;C++){const L=T[C],D=m(L);p(L,x.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,x.__data)}}function p(x,_,S){typeof x=="number"||typeof x=="boolean"?_[0]=x:x.isMatrix3?(_[0]=x.elements[0],_[1]=x.elements[1],_[2]=x.elements[2],_[3]=0,_[4]=x.elements[3],_[5]=x.elements[4],_[6]=x.elements[5],_[7]=0,_[8]=x.elements[6],_[9]=x.elements[7],_[10]=x.elements[8],_[11]=0):ArrayBuffer.isView(x)?_.set(new x.constructor(x.buffer,x.byteOffset,_.length)):x.toArray(_,S)}function v(x,_,S,w){const y=x.value,T=_+"_"+S;if(w[T]===void 0)return typeof y=="number"||typeof y=="boolean"?w[T]=y:ArrayBuffer.isView(y)?w[T]=y.slice():w[T]=y.clone(),!0;{const R=w[T];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return w[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function g(x){const _=x.uniforms;let S=0;const w=16;for(let T=0,R=_.length;T<R;T++){const C=Array.isArray(_[T])?_[T]:[_[T]];for(let L=0,D=C.length;L<D;L++){const I=C[L],B=Array.isArray(I.value)?I.value:[I.value];for(let H=0,W=B.length;H<W;H++){const j=B[H],O=m(j),$=S%w,Q=$%O.boundary,_t=$+Q;S+=Q,_t!==0&&w-_t<O.storage&&(S+=w-_t),I.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=O.storage}}}const y=S%w;return y>0&&(S+=w-y),x.__size=S,x.__cache={},this}function m(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(_.boundary=16,_.storage=x.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",x),_}function M(x){const _=x.target;_.removeEventListener("dispose",M);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function b(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:b}}const FT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zn=null;function kT(){return Zn===null&&(Zn=new Lh(FT,16,16,gs,dn),Zn.name="DFG_LUT",Zn.minFilter=We,Zn.magFilter=We,Zn.wrapS=ei,Zn.wrapT=ei,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}class OT{constructor(t={}){const{canvas:e=C_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Mn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=d,g=new Set([wh,Sh,bh]),m=new Set([Mn,ai,no,io,_h,Mh]),M=new Uint32Array(4),b=new Int32Array(4),x=new P;let _=null,S=null;const w=[],y=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let C=!1,L=null,D=null,I=null,B=null;this._outputColorSpace=He;let H=0,W=0,j=null,O=-1,$=null;const Q=new de,_t=new de;let ft=null;const St=new ct(0);let Nt=0,zt=e.width,X=e.height,Y=1,yt=null,Pt=null;const it=new de(0,0,zt,X),Wt=new de(0,0,zt,X);let Re=!1;const st=new wo;let Gt=!1,le=!1;const ee=new Ot,Me=new P,Ie=new de,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function Ce(){return j===null?Y:1}let F=i;function tn(A,U){return e.getContext(A,U)}let pe,N,E,z,q,Z,at,ht,J,et,dt,Ut,vt,pt,Ft,Bt,Yt,k,mt,tt,gt,bt,nt;try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${uh}`),e.addEventListener("webglcontextlost",be,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",Ln,!1),F===null){const U="webgl2";if(F=tn(U,A),F===null)throw tn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(A){throw e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),Vt("WebGLRenderer: "+A.message),A}function kt(){pe=new kS(F),pe.init(),gt=new RT(F,pe),N=new AS(F,pe,t,gt),E=new ET(F,pe),N.reversedDepthBuffer&&h&&E.buffers.depth.setReversed(!0),D=F.createFramebuffer(),I=F.createFramebuffer(),B=F.createFramebuffer(),z=new zS(F),q=new fT,Z=new AT(F,pe,E,q,N,gt,z),at=new FS(R),ht=new Gy(F),bt=new TS(F,ht),J=new OS(F,ht,z,bt),et=new GS(F,J,ht,bt,z),k=new HS(F,N,Z),Ft=new RS(q),dt=new hT(R,at,pe,N,bt,Ft),Ut=new DT(R,q),vt=new pT,pt=new MT(pe),Yt=new wS(R,at,E,et,p,c),Bt=new TT(R,et,N),nt=new UT(F,z,N,E),mt=new ES(F,pe,z),tt=new BS(F,pe,z),z.programs=dt.programs,R.capabilities=N,R.extensions=pe,R.properties=q,R.renderLists=vt,R.shadowMap=Bt,R.state=E,R.info=z}v!==Mn&&(T=new WS(v,e.width,e.height,a,s,r));const Lt=new NT(R,F);this.xr=Lt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=pe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=pe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(A){A!==void 0&&(Y=A,this.setSize(zt,X,!1))},this.getSize=function(A){return A.set(zt,X)},this.setSize=function(A,U,K=!0){if(Lt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=A,X=U,e.width=Math.floor(A*Y),e.height=Math.floor(U*Y),K===!0&&(e.style.width=A+"px",e.style.height=U+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(zt*Y,X*Y).floor()},this.setDrawingBufferSize=function(A,U,K){zt=A,X=U,Y=K,e.width=Math.floor(A*K),e.height=Math.floor(U*K),this.setViewport(0,0,A,U)},this.setEffects=function(A){if(v===Mn){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let U=0;U<A.length;U++)if(A[U].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Q)},this.getViewport=function(A){return A.copy(it)},this.setViewport=function(A,U,K,G){A.isVector4?it.set(A.x,A.y,A.z,A.w):it.set(A,U,K,G),E.viewport(Q.copy(it).multiplyScalar(Y).round())},this.getScissor=function(A){return A.copy(Wt)},this.setScissor=function(A,U,K,G){A.isVector4?Wt.set(A.x,A.y,A.z,A.w):Wt.set(A,U,K,G),E.scissor(_t.copy(Wt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(A){E.setScissorTest(Re=A)},this.setOpaqueSort=function(A){yt=A},this.setTransparentSort=function(A){Pt=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,K=!0){let G=0;if(A){let V=!1;if(j!==null){const Mt=j.texture.format;V=g.has(Mt)}if(V){const Mt=j.texture.type,Et=m.has(Mt),xt=Yt.getClearColor(),Rt=Yt.getClearAlpha(),It=xt.r,Jt=xt.g,se=xt.b;Et?(M[0]=It,M[1]=Jt,M[2]=se,M[3]=Rt,F.clearBufferuiv(F.COLOR,0,M)):(b[0]=It,b[1]=Jt,b[2]=se,b[3]=Rt,F.clearBufferiv(F.COLOR,0,b))}else G|=F.COLOR_BUFFER_BIT}U&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),L=A},this.dispose=function(){e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),Yt.dispose(),vt.dispose(),pt.dispose(),q.dispose(),at.dispose(),et.dispose(),bt.dispose(),nt.dispose(),dt.dispose(),Lt.dispose(),Lt.removeEventListener("sessionstart",cf),Lt.removeEventListener("sessionend",lf),Zi.stop()};function be(A){A.preventDefault(),Za("WebGLRenderer: Context Lost."),C=!0}function ue(){Za("WebGLRenderer: Context Restored."),C=!1;const A=z.autoReset,U=Bt.enabled,K=Bt.autoUpdate,G=Bt.needsUpdate,V=Bt.type;kt(),z.autoReset=A,Bt.enabled=U,Bt.autoUpdate=K,Bt.needsUpdate=G,Bt.type=V}function Ln(A){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $n(A){const U=A.target;U.removeEventListener("dispose",$n),tv(U)}function tv(A){ev(A),q.remove(A)}function ev(A){const U=q.get(A).programs;U!==void 0&&(U.forEach(function(K){dt.releaseProgram(K)}),A.isShaderMaterial&&dt.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,K,G,V,Mt){U===null&&(U=Ke);const Et=V.isMesh&&V.matrixWorld.determinantAffine()<0,xt=sv(A,U,K,G,V);E.setMaterial(G,Et);let Rt=K.index,It=1;if(G.wireframe===!0){if(Rt=J.getWireframeAttribute(K),Rt===void 0)return;It=2}const Jt=K.drawRange,se=K.attributes.position;let Ct=Jt.start*It,he=(Jt.start+Jt.count)*It;Mt!==null&&(Ct=Math.max(Ct,Mt.start*It),he=Math.min(he,(Mt.start+Mt.count)*It)),Rt!==null?(Ct=Math.max(Ct,0),he=Math.min(he,Rt.count)):se!=null&&(Ct=Math.max(Ct,0),he=Math.min(he,se.count));const ke=he-Ct;if(ke<0||ke===1/0)return;bt.setup(V,G,xt,K,Rt);let Ee,ye=mt;if(Rt!==null&&(Ee=ht.get(Rt),ye=tt,ye.setIndex(Ee)),V.isMesh)G.wireframe===!0?(E.setLineWidth(G.wireframeLinewidth*Ce()),ye.setMode(F.LINES)):ye.setMode(F.TRIANGLES);else if(V.isLine){let en=G.linewidth;en===void 0&&(en=1),E.setLineWidth(en*Ce()),V.isLineSegments?ye.setMode(F.LINES):V.isLineLoop?ye.setMode(F.LINE_LOOP):ye.setMode(F.LINE_STRIP)}else V.isPoints?ye.setMode(F.POINTS):V.isSprite&&ye.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(pe.get("WEBGL_multi_draw"))ye.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const en=V._multiDrawStarts,Tt=V._multiDrawCounts,on=V._multiDrawCount,oe=Rt?ht.get(Rt).bytesPerElement:1,bn=q.get(G).currentProgram.getUniforms();for(let Kn=0;Kn<on;Kn++)bn.setValue(F,"_gl_DrawID",Kn),ye.render(en[Kn]/oe,Tt[Kn])}else if(V.isInstancedMesh)ye.renderInstances(Ct,ke,V.count);else if(K.isInstancedBufferGeometry){const en=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Tt=Math.min(K.instanceCount,en);ye.renderInstances(Ct,ke,Tt)}else ye.render(Ct,ke)};function af(A,U,K,G){L!==null&&A.isNodeMaterial&&L.setObject(G,A),Gt===!0&&Ft.setState(A,K,!1),A.transparent===!0&&A.side===we&&A.forceSinglePass===!1?(A.side=Qe,A.needsUpdate=!0,Po(A,U,G),A.side=Ai,A.needsUpdate=!0,Po(A,U,G),A.side=we):Po(A,U,G)}this.compile=function(A,U,K=null){K===null&&(K=A),L!==null&&L.renderStart(A,U,K),S=pt.get(K),S.init(U),y.push(S),K.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),A!==K&&A.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),S.setupLights(),L!==null&&L.updateLights(S.state.lightsArray),le=this.localClippingEnabled,Gt=Ft.init(this.clippingPlanes,le),Gt===!0&&Ft.setGlobalState(this.clippingPlanes,U),L!==null&&Bt.render(S.state.shadowsArray,K,U);const G=new Set;return A.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const Mt=V.material;if(Mt)if(Array.isArray(Mt))for(let Et=0;Et<Mt.length;Et++){const xt=Mt[Et];af(xt,K,U,V),G.add(xt)}else af(Mt,K,U,V),G.add(Mt)}),S=y.pop(),L!==null&&L.renderEnd(),G},this.compileAsync=function(A,U,K=null){const G=this.compile(A,U,K);return new Promise(V=>{function Mt(){if(G.forEach(function(Et){const Rt=q.get(Et).currentProgram;(Rt===void 0||Rt.isReady())&&G.delete(Et)}),G.size===0){V(A);return}setTimeout(Mt,10)}pe.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let yc=null;function nv(A){yc&&yc(A)}function cf(){Zi.stop()}function lf(){Zi.start()}const Zi=new V0;Zi.setAnimationLoop(nv),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(A){yc=A,Lt.setAnimationLoop(A),A===null?Zi.stop():Zi.start()},Lt.addEventListener("sessionstart",cf),Lt.addEventListener("sessionend",lf),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(A,U);const K=Lt.enabled===!0&&Lt.isPresenting===!0,G=T!==null&&(j===null||K)&&T.begin(R,j);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Lt.enabled===!0&&Lt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Lt.cameraAutoUpdate===!0&&Lt.updateCamera(U),U=Lt.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,U,j),S=pt.get(A,y.length),S.init(U),S.state.textureUnits=Z.getTextureUnits(),y.push(S),ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),st.setFromProjectionMatrix(ee,ni,U.reversedDepth),le=this.localClippingEnabled,Gt=Ft.init(this.clippingPlanes,le),_=vt.get(A,w.length),_.init(),w.push(_),Lt.enabled===!0&&Lt.isPresenting===!0){const Et=R.xr.getDepthSensingMesh();Et!==null&&bc(Et,U,-1/0,R.sortObjects)}bc(A,U,0,R.sortObjects),_.finish(),L!==null&&L.updateLights(S.state.lightsArray),R.sortObjects===!0&&_.sort(yt,Pt),Te=Lt.enabled===!1||Lt.isPresenting===!1||Lt.hasDepthSensing()===!1,Te&&Yt.addToRenderList(_,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Gt===!0&&Ft.beginShadows();const V=S.state.shadowsArray;if(Bt.render(V,A,U),Gt===!0&&Ft.endShadows(),(G&&T.hasRenderPass())===!1){const Et=_.opaque,xt=_.transmissive;if(S.setupLights(),U.isArrayCamera){const Rt=U.cameras;if(xt.length>0)for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It];hf(Et,xt,A,se)}Te&&Yt.render(A);for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It];uf(_,A,se,se.viewport)}}else xt.length>0&&hf(Et,xt,A,U),Te&&Yt.render(A),uf(_,A,U)}j!==null&&W===0&&(Z.updateMultisampleRenderTarget(j),Z.updateRenderTargetMipmap(j)),G&&T.end(R),A.isScene===!0&&A.onAfterRender(R,A,U),bt.resetDefaultState(),O=-1,$=null,y.pop(),y.length>0?(S=y[y.length-1],Z.setTextureUnits(S.state.textureUnits),Gt===!0&&Ft.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,w.pop(),w.length>0?_=w[w.length-1]:_=null,L!==null&&L.renderEnd()};function bc(A,U,K,G){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(st)){G&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ee);const Et=et.update(A),xt=A.material;xt.visible&&_.push(A,Et,xt,K,Ie.z,null,U)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(st))){const Et=et.update(A),xt=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Ie.copy(Et.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(ee)),Array.isArray(xt)){const Rt=Et.groups;for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It],Ct=xt[se.materialIndex];Ct&&Ct.visible&&_.push(A,Et,Ct,K,Ie.z,se,U)}}else xt.visible&&_.push(A,Et,xt,K,Ie.z,null,U)}}const Mt=A.children;for(let Et=0,xt=Mt.length;Et<xt;Et++)bc(Mt[Et],U,K,G)}function uf(A,U,K,G){const{opaque:V,transmissive:Mt,transparent:Et}=A;S.setupLightsView(K),Gt===!0&&Ft.setGlobalState(R.clippingPlanes,K),G&&E.viewport(Q.copy(G)),V.length>0&&Co(V,U,K),Mt.length>0&&Co(Mt,U,K),Et.length>0&&Co(Et,U,K),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function hf(A,U,K,G){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[G.id]===void 0){const Ct=pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[G.id]=new un(1,1,{generateMipmaps:!0,type:Ct?dn:Mn,minFilter:yi,samples:Math.max(4,N.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}const Mt=S.state.transmissionRenderTarget[G.id],Et=G.viewport||Q;Mt.setSize(Et.z*R.transmissionResolutionScale,Et.w*R.transmissionResolutionScale);const xt=R.getRenderTarget(),Rt=R.getActiveCubeFace(),It=R.getActiveMipmapLevel();R.setRenderTarget(Mt),R.getClearColor(St),Nt=R.getClearAlpha(),Nt<1&&R.setClearColor(16777215,.5),R.clear(),Te&&Yt.render(K);const Jt=R.toneMapping;R.toneMapping=ri;const se=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),S.setupLightsView(G),Gt===!0&&Ft.setGlobalState(R.clippingPlanes,G),Co(A,K,G),Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt),pe.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let he=0,ke=U.length;he<ke;he++){const Ee=U[he],{object:ye,geometry:en,material:Tt,group:on}=Ee;if(Tt.side===we&&ye.layers.test(G.layers)){const oe=Tt.side;Tt.side=Qe,Tt.needsUpdate=!0,ff(ye,K,G,en,Tt,on),Tt.side=oe,Tt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt))}R.setRenderTarget(xt,Rt,It),R.setClearColor(St,Nt),se!==void 0&&(G.viewport=se),R.toneMapping=Jt}function Co(A,U,K){const G=U.isScene===!0?U.overrideMaterial:null;for(let V=0,Mt=A.length;V<Mt;V++){const Et=A[V],{object:xt,geometry:Rt,group:It}=Et;let Jt=Et.material;Jt.allowOverride===!0&&G!==null&&(Jt=G),xt.layers.test(K.layers)&&ff(xt,U,K,Rt,Jt,It)}}function ff(A,U,K,G,V,Mt){L!==null&&V.isNodeMaterial&&L.setObject(A,V),A.onBeforeRender(R,U,K,G,V,Mt),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(R,U,K,G,A,Mt),V.transparent===!0&&V.side===we&&V.forceSinglePass===!1?(V.side=Qe,V.needsUpdate=!0,R.renderBufferDirect(K,U,G,V,A,Mt),V.side=Ai,V.needsUpdate=!0,R.renderBufferDirect(K,U,G,V,A,Mt),V.side=we):R.renderBufferDirect(K,U,G,V,A,Mt),A.onAfterRender(R,U,K,G,V,Mt)}function Po(A,U,K){U.isScene!==!0&&(U=Ke);const G=q.get(A),V=S.state.lights,Mt=S.state.shadowsArray,Et=V.state.version,xt=dt.getParameters(A,V.state,Mt,U,K,S.state.lightProbeGridArray),Rt=dt.getProgramCacheKey(xt);let It=G.programs;G.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const Jt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;G.envMap=at.get(A.envMap||G.environment,Jt),G.envMapRotation=G.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,It===void 0&&(A.addEventListener("dispose",$n),It=new Map,G.programs=It);let se=It.get(Rt);if(se!==void 0){if(G.currentProgram===se&&G.lightsStateVersion===Et)return pf(A,xt),se}else xt.uniforms=dt.getUniforms(A),L!==null&&A.isNodeMaterial&&L.build(A,K,xt),A.onBeforeCompile(xt,R),se=dt.acquireProgram(xt,Rt),It.set(Rt,se),G.uniforms=xt.uniforms;const Ct=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ct.clippingPlanes=Ft.uniform),pf(A,xt),G.needsLights=ov(A),G.lightsStateVersion=Et,G.needsLights&&(Ct.ambientLightColor.value=V.state.ambient,Ct.lightProbe.value=V.state.probe,Ct.sunLights.value=V.state.sun,Ct.sunLightShadows.value=V.state.sunShadow,Ct.directionalLights.value=V.state.directional,Ct.directionalLightShadows.value=V.state.directionalShadow,Ct.spotLights.value=V.state.spot,Ct.spotLightShadows.value=V.state.spotShadow,Ct.rectAreaLights.value=V.state.rectArea,Ct.ltc_1.value=V.state.rectAreaLTC1,Ct.ltc_2.value=V.state.rectAreaLTC2,Ct.pointLights.value=V.state.point,Ct.pointLightShadows.value=V.state.pointShadow,Ct.hemisphereLights.value=V.state.hemi,Ct.sunShadowMatrix.value=V.state.sunShadowMatrix,Ct.sunShadowCascade.value=V.state.sunShadowCascade,Ct.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ct.spotLightMatrix.value=V.state.spotLightMatrix,Ct.spotLightMap.value=V.state.spotLightMap,Ct.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=S.state.lightProbeGridArray.length>0,G.currentProgram=se,G.uniformsList=null,se}function df(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=Ia.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function pf(A,U){const K=q.get(A);K.outputColorSpace=U.outputColorSpace,K.batching=U.batching,K.batchingColor=U.batchingColor,K.instancing=U.instancing,K.instancingColor=U.instancingColor,K.instancingMorph=U.instancingMorph,K.skinning=U.skinning,K.morphTargets=U.morphTargets,K.morphNormals=U.morphNormals,K.morphColors=U.morphColors,K.morphTargetsCount=U.morphTargetsCount,K.numClippingPlanes=U.numClippingPlanes,K.numIntersection=U.numClipIntersection,K.vertexAlphas=U.vertexAlphas,K.vertexTangents=U.vertexTangents,K.toneMapping=U.toneMapping}function iv(A,U){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(U.matrixWorld);for(let K=0,G=A.length;K<G;K++){const V=A[K];if(V.texture!==null&&V.boundingBox.containsPoint(x))return V}return null}function sv(A,U,K,G,V){U.isScene!==!0&&(U=Ke),Z.resetTextureUnits();const Mt=U.fog,Et=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,xt=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ne.workingColorSpace,Rt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,It=at.get(G.envMap||Et,Rt),Jt=G.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,se=!!K.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!K.morphAttributes.position,he=!!K.morphAttributes.normal,ke=!!K.morphAttributes.color;let Ee=ri;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ee=R.toneMapping);const ye=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,en=ye!==void 0?ye.length:0,Tt=q.get(G),on=S.state.lights;if(Gt===!0&&(le===!0||A!==$)){const Se=A===$&&G.id===O;Ft.setState(G,A,Se)}let oe=!1;G.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==on.state.version||Tt.outputColorSpace!==xt||V.isBatchedMesh&&Tt.batching===!1||!V.isBatchedMesh&&Tt.batching===!0||V.isBatchedMesh&&Tt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Tt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Tt.instancing===!1||!V.isInstancedMesh&&Tt.instancing===!0||V.isSkinnedMesh&&Tt.skinning===!1||!V.isSkinnedMesh&&Tt.skinning===!0||V.isInstancedMesh&&Tt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Tt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Tt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Tt.instancingMorph===!1&&V.morphTexture!==null||Tt.envMap!==It||G.fog===!0&&Tt.fog!==Mt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Ft.numPlanes||Tt.numIntersection!==Ft.numIntersection)||Tt.vertexAlphas!==Jt||Tt.vertexTangents!==se||Tt.morphTargets!==Ct||Tt.morphNormals!==he||Tt.morphColors!==ke||Tt.toneMapping!==Ee||Tt.morphTargetsCount!==en||!!Tt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,Tt.__version=G.version);let bn=Tt.currentProgram;oe===!0&&(bn=Po(G,U,V),L&&G.isNodeMaterial&&L.onUpdateProgram(G,bn,Tt));let Kn=!1,Li=!1,Ms=!1;const _e=bn.getUniforms(),Ue=Tt.uniforms;if(E.useProgram(bn.program)&&(Kn=!0,Li=!0,Ms=!0),G.id!==O&&(O=G.id,Li=!0),Tt.needsLights){const Se=iv(S.state.lightProbeGridArray,V);Tt.lightProbeGrid!==Se&&(Tt.lightProbeGrid=Se,Li=!0)}if(Kn||$!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),_e.setValue(F,"projectionMatrix",A.projectionMatrix),_e.setValue(F,"viewMatrix",A.matrixWorldInverse);const Ii=_e.map.cameraPosition;Ii!==void 0&&Ii.setValue(F,Me.setFromMatrixPosition(A.matrixWorld)),N.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_e.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),$!==A&&($=A,Li=!0,Ms=!0)}if(Tt.needsLights&&(on.state.sunShadowMap.length>0&&_e.setValue(F,"sunShadowMap",on.state.sunShadowMap,Z),on.state.directionalShadowMap.length>0&&_e.setValue(F,"directionalShadowMap",on.state.directionalShadowMap,Z),on.state.spotShadowMap.length>0&&_e.setValue(F,"spotShadowMap",on.state.spotShadowMap,Z),on.state.pointShadowMap.length>0&&_e.setValue(F,"pointShadowMap",on.state.pointShadowMap,Z)),V.isSkinnedMesh){_e.setOptional(F,V,"bindMatrix"),_e.setOptional(F,V,"bindMatrixInverse");const Se=V.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),_e.setValue(F,"boneTexture",Se.boneTexture,Z))}V.isBatchedMesh&&(_e.setOptional(F,V,"batchingTexture"),_e.setValue(F,"batchingTexture",V._matricesTexture,Z),_e.setOptional(F,V,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",V._indirectTexture,Z),_e.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",V._colorsTexture,Z));const Ni=K.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&k.update(V,K,bn),(Li||Tt.receiveShadow!==V.receiveShadow)&&(Tt.receiveShadow=V.receiveShadow,_e.setValue(F,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Ue.envMapIntensity.value=U.environmentIntensity),Ue.dfgLUT!==void 0&&(Ue.dfgLUT.value=kT()),Li){if(_e.setValue(F,"toneMappingExposure",R.toneMappingExposure),Tt.needsLights&&rv(Ue,Ms),Mt&&G.fog===!0&&Ut.refreshFogUniforms(Ue,Mt),Ut.refreshMaterialUniforms(Ue,G,Y,X,S.state.transmissionRenderTarget[A.id]),Tt.needsLights&&Tt.lightProbeGrid){const Se=Tt.lightProbeGrid;Ue.probesSH.value=Se.texture,Ue.probesMin.value.copy(Se.boundingBox.min),Ue.probesMax.value.copy(Se.boundingBox.max),Ue.probesResolution.value.copy(Se.resolution)}Ia.upload(F,df(Tt),Ue,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ia.upload(F,df(Tt),Ue,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_e.setValue(F,"center",V.center),_e.setValue(F,"modelViewMatrix",V.modelViewMatrix),_e.setValue(F,"normalMatrix",V.normalMatrix),_e.setValue(F,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){const Se=G.uniformsGroups;for(let Ii=0,ys=Se.length;Ii<ys;Ii++){const gf=Se[Ii];nt.update(gf,bn),nt.bind(gf,bn)}}return bn}function rv(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.sunLights.needsUpdate=U,A.sunLightShadows.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function ov(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(A,U,K){const G=q.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(A.texture).__webglTexture=U,q.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:K,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){const K=q.get(A);K.__webglFramebuffer=U,K.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(A,U=0,K=0){j=A,H=U,W=K;let G=null,V=!1,Mt=!1;if(A){const xt=q.get(A);if(xt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(F.FRAMEBUFFER,xt.__webglFramebuffer),Q.copy(A.viewport),_t.copy(A.scissor),ft=A.scissorTest,E.viewport(Q),E.scissor(_t),E.setScissorTest(ft),O=-1;return}else if(xt.__webglFramebuffer===void 0)Z.setupRenderTarget(A);else if(xt.__hasExternalTextures)Z.rebindTextures(A,q.get(A.texture).__webglTexture,q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Jt=A.depthTexture;if(xt.__boundDepthTexture!==Jt){if(Jt!==null&&q.has(Jt)&&(A.width!==Jt.image.width||A.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(A)}}const Rt=A.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);const It=q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(It[U])?G=It[U][K]:G=It[U],V=!0):A.samples>0&&Z.useMultisampledRTT(A)===!1?G=q.get(A).__webglMultisampledFramebuffer:Array.isArray(It)?G=It[K]:G=It,Q.copy(A.viewport),_t.copy(A.scissor),ft=A.scissorTest}else Q.copy(it).multiplyScalar(Y).floor(),_t.copy(Wt).multiplyScalar(Y).floor(),ft=Re;if(K!==0&&(G=D),E.bindFramebuffer(F.FRAMEBUFFER,G)&&E.drawBuffers(A,G),E.viewport(Q),E.scissor(_t),E.setScissorTest(ft),V){const xt=q.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,xt.__webglTexture,K)}else if(Mt){const xt=U;for(let Rt=0;Rt<A.textures.length;Rt++){const It=q.get(A.textures[Rt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Rt,It.__webglTexture,K,xt)}}else if(A!==null&&K!==0){const xt=q.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,K)}O=-1};function mf(A){const U=q.get(A);return(U.__readFormat!==A.format||U.__readType!==A.type)&&(U.__readFormat=A.format,U.__readType=A.type,U.__formatReadable=N.textureFormatReadable(A.format),U.__typeReadable=N.textureTypeReadable(A.type)),U}this.readRenderTargetPixels=function(A,U,K,G,V,Mt,Et,xt=0){if(!(A&&A.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Et!==void 0&&(Rt=Rt[Et]),Rt){E.bindFramebuffer(F.FRAMEBUFFER,Rt);try{const It=A.textures[xt],Jt=It.format,se=It.type;A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=mf(It);if(Ct.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-G&&K>=0&&K<=A.height-V&&F.readPixels(U,K,G,V,gt.convert(Jt),gt.convert(se),Mt)}finally{const It=j!==null?q.get(j).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(A,U,K,G,V,Mt,Et,xt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Et!==void 0&&(Rt=Rt[Et]),Rt)if(U>=0&&U<=A.width-G&&K>=0&&K<=A.height-V){E.bindFramebuffer(F.FRAMEBUFFER,Rt);const It=A.textures[xt],Jt=It.format,se=It.type;A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=mf(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const he=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.bufferData(F.PIXEL_PACK_BUFFER,Mt.byteLength,F.STREAM_READ),F.readPixels(U,K,G,V,gt.convert(Jt),gt.convert(se),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const ke=j!==null?q.get(j).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,ke);const Ee=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await P_(F,Ee,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Mt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(he),F.deleteSync(Ee),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,K=0){const G=Math.pow(2,-K),V=Math.floor(A.image.width*G),Mt=Math.floor(A.image.height*G),Et=U!==null?U.x:0,xt=U!==null?U.y:0;Z.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,Et,xt,V,Mt),E.unbindTexture()},this.copyTextureToTexture=function(A,U,K=null,G=null,V=0,Mt=0){let Et,xt,Rt,It,Jt,se,Ct,he,ke;const Ee=A.isCompressedTexture?A.mipmaps[Mt]:A.image;if(K!==null)Et=K.max.x-K.min.x,xt=K.max.y-K.min.y,Rt=K.isBox3?K.max.z-K.min.z:1,It=K.min.x,Jt=K.min.y,se=K.isBox3?K.min.z:0;else{const Ue=Math.pow(2,-V);Et=Math.floor(Ee.width*Ue),xt=Math.floor(Ee.height*Ue),A.isDataArrayTexture?Rt=Ee.depth:A.isData3DTexture?Rt=Math.floor(Ee.depth*Ue):Rt=1,It=0,Jt=0,se=0}G!==null?(Ct=G.x,he=G.y,ke=G.z):(Ct=0,he=0,ke=0);const ye=gt.convert(U.format),en=gt.convert(U.type);let Tt;U.isData3DTexture?(Z.setTexture3D(U,0),Tt=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),Tt=F.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),Tt=F.TEXTURE_2D),E.activeTexture(F.TEXTURE0),E.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),E.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),E.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const on=E.getParameter(F.UNPACK_ROW_LENGTH),oe=E.getParameter(F.UNPACK_IMAGE_HEIGHT),bn=E.getParameter(F.UNPACK_SKIP_PIXELS),Kn=E.getParameter(F.UNPACK_SKIP_ROWS),Li=E.getParameter(F.UNPACK_SKIP_IMAGES);E.pixelStorei(F.UNPACK_ROW_LENGTH,Ee.width),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ee.height),E.pixelStorei(F.UNPACK_SKIP_PIXELS,It),E.pixelStorei(F.UNPACK_SKIP_ROWS,Jt),E.pixelStorei(F.UNPACK_SKIP_IMAGES,se);const Ms=A.isDataArrayTexture||A.isData3DTexture,_e=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const Ue=q.get(A),Ni=q.get(U),Se=q.get(Ue.__renderTarget),Ii=q.get(Ni.__renderTarget);E.bindFramebuffer(F.READ_FRAMEBUFFER,Se.__webglFramebuffer),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let ys=0;ys<Rt;ys++)Ms&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(A).__webglTexture,V,se+ys),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(U).__webglTexture,Mt,ke+ys)),F.blitFramebuffer(It,Jt,Et,xt,Ct,he,Et,xt,F.DEPTH_BUFFER_BIT,F.NEAREST);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||A.isRenderTargetTexture||q.has(A)){const Ue=q.get(A),Ni=q.get(U);E.bindFramebuffer(F.READ_FRAMEBUFFER,I),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Se=0;Se<Rt;Se++)Ms?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.__webglTexture,V,se+Se):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ue.__webglTexture,V),_e?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ni.__webglTexture,Mt,ke+Se):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ni.__webglTexture,Mt),V!==0?F.blitFramebuffer(It,Jt,Et,xt,Ct,he,Et,xt,F.COLOR_BUFFER_BIT,F.NEAREST):_e?F.copyTexSubImage3D(Tt,Mt,Ct,he,ke+Se,It,Jt,Et,xt):F.copyTexSubImage2D(Tt,Mt,Ct,he,It,Jt,Et,xt);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else _e?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,en,Ee.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,Ee.data):F.texSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,en,Ee):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Et,xt,ye,en,Ee.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Ee.width,Ee.height,ye,Ee.data):F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Et,xt,ye,en,Ee);E.pixelStorei(F.UNPACK_ROW_LENGTH,on),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,oe),E.pixelStorei(F.UNPACK_SKIP_PIXELS,bn),E.pixelStorei(F.UNPACK_SKIP_ROWS,Kn),E.pixelStorei(F.UNPACK_SKIP_IMAGES,Li),Mt===0&&U.generateMipmaps&&F.generateMipmap(Tt),E.unbindTexture()},this.initRenderTarget=function(A){q.get(A).__webglFramebuffer===void 0&&Z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Z.setTextureCube(A,0):A.isData3DTexture?Z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Z.setTexture2DArray(A,0):Z.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){H=0,W=0,j=null,E.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}function BT(n){if(n.name)return n.name;if(n.parent?.name)return n.parent.name;const t=n.geometry;return`${n.type}:${t.type}:${t.getAttribute("position")?.count??0}`}function zT(n,t,e=14){t.updateMatrixWorld();const i=new wo().setFromProjectionMatrix(new Ot().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse)),s=new Pn,r=new Map;n.traverseVisible(a=>{if(!(a instanceof Xt)&&!(a instanceof ja))return;const c=a.geometry;if(a.frustumCulled&&(c.boundingSphere||c.computeBoundingSphere(),s.copy(c.boundingSphere).applyMatrix4(a.matrixWorld),!(a instanceof Be)&&!i.intersectsSphere(s)))return;const l=a instanceof ja?0:(c.index?c.index.count:c.getAttribute("position")?.count??0)/3,u=a instanceof Be?a.count:1,f=BT(a),h=r.get(f)??{meshes:0,triangles:0};h.meshes+=1,h.triangles+=Math.round(l*u),r.set(f,h)});const o=[...r.entries()].map(([a,c])=>({source:a,...c})).sort((a,c)=>c.triangles-a.triangles);return{rows:o.slice(0,e),total:o.reduce((a,c)=>a+c.triangles,0)}}function HT(n,t,e){const i=async r=>{t.render();const o=await new Promise(c=>n.domElement.toBlob(c,"image/png"));if(!o)return"khong chup duoc";const a=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:o});return a.ok?`shots/${r}.png`:`loi ${a.status}`},s=r=>zT(e.scene,e.camera,r);window.__skyrun={...t,shot:i,diag:s}}const GT=5,VT=450;function WT(n,t){let e=0;return{spawn(i,s,r){const o=t();if(!o||e>=GT||!Number.isFinite(i)||!Number.isFinite(s)){r();return}const a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),l=a.left+a.width*.25-c.left,u=a.top+a.height*.5-c.top,f=document.createElement("div");f.className="collect-streak",f.style.left=`${i}px`,f.style.top=`${s}px`,n.appendChild(f),e++;const h=(i+l)/2-(l-i)*.15,d=Math.min(s,u)-60,p=f.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${h-i}px), calc(-50% + ${d-s}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-i}px), calc(-50% + ${u-s}px)) scale(0.55)`,opacity:.9}],{duration:VT,easing:"cubic-bezier(.5,0,.9,.6)"});p.onfinish=p.oncancel=()=>{f.remove(),e--,r()}}}}const XT=`
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
}`,qT=`
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
}`,Tr=1.1,$T=1.3,KT=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Da={request:0};function YT(n){const t=n?.041666666666666664:.025,e=Math.ceil(Tr/t)+2,i=[0,1].map(()=>Array.from({length:e},()=>({p:new P,t:-99,k:0,c:0}))),s=2*e*2,r=new Float32Array(s*3),o=new Float32Array(s*3),a=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),f=[];for(let C=0;C<2;C++)for(let L=0;L<e;L++){const D=(C*e+L)*2;l[D]=-1,l[D+1]=1,L<e-1&&f.push(D,D+1,D+2,D+1,D+3,D+2)}const h=new Kt,d={position:[r,3],aCol:[o,3],aAge:[a,1],aK:[c,1],aSide:[l,1],aAlong:[u,1]};for(const[C,[L,D]]of Object.entries(d))h.setAttribute(C,new wt(L,D));h.setIndex(f),h.setDrawRange(0,0);const p=["position","aCol","aAge","aK","aAlong"].map(C=>h.getAttribute(C)),v=new re({vertexShader:XT,fragmentShader:qT,uniforms:gn.merge([lt.fog]),transparent:!0,depthWrite:!1,side:we,fog:!0}),g=new Xt(h,v);g.frustumCulled=!1,g.renderOrder=3;const m=new P,M=new P,b=new P,x=new P,_=new P,S=new P;let w=0,y=-99,T=-99,R=!1;return{mesh:g,update(C,L,D,I,B){Da.request>0&&(w=Da.request,Da.request=0),I>0&&(w=Math.max(0,w-I));const H=C.mode==="run",W=H&&C.smokeT>0?Math.min(1,C.smokeT/$T):0,j=H&&w>0?.75*Math.min(1,w/.8):0,O=Math.max(W,j);if(O>0)D-T>Tr&&i.forEach((St,Nt)=>St.forEach(zt=>(zt.p.copy(L[Nt]),zt.t=-99,zt.k=0))),T=D;else if(D-T>Tr){R&&h.setDrawRange(0,0),R=!1;return}R=!0,h.setDrawRange(0,1/0);const $=hn(C.z);m.set(Math.sin($),wi(C.z),Math.cos($)).normalize(),M.set(Math.cos($),0,-Math.sin($));const Q=H?C.speed:0,_t=Math.sign((L[0].x-L[1].x)*M.x+(L[0].z-L[1].z)*M.z)||1,ft=I>0&&D-y>=t;ft&&(y=D),i.forEach((St,Nt)=>{const zt=O*(O+(1-O)*Math.max(0,Math.sin(D*21+Nt*2))),X=W>0?(C.smokes+2)%3:Nt===0?1:2;if(ft){const Pt=St.pop();St.unshift(Pt)}const Y=St[0];Y.p.copy(L[Nt]),ft&&(Y.t=D),Y.k=zt,Y.c=X;const yt=Nt===0?_t:-_t;for(let Pt=1;Pt<e&&I>0;Pt++){const it=St[Pt],Wt=Math.min(Tr,D-it.t),Re=Math.max(0,Q-5-18*Wt),st=Math.sin(D*7+it.t*13);it.p.addScaledVector(m,Re*I).addScaledVector(M,(yt*1.6+st*.7)*I),it.p.y+=(-1+Math.cos(D*6+it.t*11)*.5)*I}S.copy(M);for(let Pt=0;Pt<e;Pt++){const it=St[Pt],Wt=D-it.t,Re=Math.min(1,Wt/Tr);b.subVectors(St[Math.max(0,Pt-1)].p,St[Math.min(e-1,Pt+1)].p),b.lengthSq()<1e-6&&b.copy(m),x.subVectors(B,it.p),_.crossVectors(b,x),_.lengthSq()<.03*b.lengthSq()*x.lengthSq()?_.copy(S):_.normalize(),_.dot(S)<0&&_.negate(),S.copy(_);const st=(.14+.9*(1-Math.exp(-Wt/.4)))*(.45+.55*it.k),Gt=(Nt*e+Pt)*2;r[Gt*3]=it.p.x-_.x*st,r[Gt*3+1]=it.p.y-_.y*st,r[Gt*3+2]=it.p.z-_.z*st,r[Gt*3+3]=it.p.x+_.x*st,r[Gt*3+4]=it.p.y+_.y*st,r[Gt*3+5]=it.p.z+_.z*st;const le=KT[it.c];o.set(le,Gt*3),o.set(le,Gt*3+3),a[Gt]=a[Gt+1]=Re,c[Gt]=c[Gt+1]=it.t<0?0:it.k,u[Gt]=u[Gt+1]=it.t}});for(const St of p)St.needsUpdate=!0}}}function ZT(n,t,e,i,s,r,o,a){const c=WT(n,()=>n.querySelector(".hud-lantern")),l=new P,u=document.createElement("div");u.className="flash",n.appendChild(u);const f=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(h,d){if(!h.length)return;i.events(h,d.mode==="run"),s.events(h,d);const{x:p,y:v}=ce(d.z,d.x,d.v,{x:0,y:0,z:0});for(const g of h)if(g.type==="lantern")e.burst(p,v+.5,d.z+3,16,!0),r.spawn(p,v+.2,d.z+.6),l.set(p,v+.3,d.z+3).project(a),c.spawn((l.x*.5+.5)*n.clientWidth,(.5-l.y*.5)*n.clientHeight,()=>s.bumpLantern());else if(g.type==="near-miss")t.shake(.06),f();else if(g.type==="hurt"||g.type==="crash"){const m=g.type==="crash";t.shake(m?.9:.45),o.spawn(p,v,d.z+.3,$i(d.z)?"village":g.kind==="bridge"?"cloth":"rock",m),m||f()}else g.type==="booster"?e.burst(p,v,d.z+3,40,!0):g.type==="gust"&&g.full?Da.request=1.5:g.type==="section"&&g.open&&d.mode==="run"&&i.reveal()}}}const jd=20.5,JT=17.5,tp=.1,QT=.05,jT=3,tE=.5,eE=2.5,nE=8;class iE{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(t,e){this.minScale=t,this.hooks=e}sample(t){if(t<=0||t>.1||(this.clock+=t,this.warm+=t,this.sinceChange+=t,this.warm<jT||this.sinceChange<tE)||(this.seeded||(this.ema=t*1e3,this.seeded=!0),this.ema+=(t*1e3-this.ema)*.05,this.verify&&this.sinceChange>=eE&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>jd?this.slowFor+t:0,this.fastFor=this.ema<JT?this.fastFor+t:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>jd?this.floorSlowFor+t:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const t=this.verify;this.verify=null,!(this.ema<t.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(t.prev))}down(t){if(this.slowFor=0,!t){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-tp));return}this.floorSlowFor<nE||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+tp)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const t=Math.min(1,this.scale+QT);t<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(t))??0)||this.apply(t)}key(t){return Math.round(t*100)}apply(t){this.scale=Math.round(t*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const gl={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},J0="skyrun.quality",sE=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function rE(){try{const n=document.createElement("canvas").getContext("webgl2");if(!n)return"no-webgl2";const t=n.getExtension("WEBGL_debug_renderer_info"),e=String(t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER));return n.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function oE(n){const t=navigator;return n==="no-webgl2"||sE.test(n)||(t.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function ep(n){return n==="low"||n==="mid"||n==="high"}function aE(n){const t=rE(),e=n.get("q");if(ep(e))return{...gl[e],gpu:t,source:"url"};let i=null;try{const[s,r]=(localStorage.getItem(J0)??"").split("|");Date.now()-Number(r)<3*864e5&&(i=s??null)}catch{}return ep(i)?{...gl[i],gpu:t,source:"saved"}:{...gl[oE(t)],gpu:t,source:"guess"}}function cE(n){try{localStorage.setItem(J0,`${n}|${Date.now()}`)}catch{}}function lE(n){return n==="high"?"mid":n==="mid"?"low":null}function uE(n){const t=()=>Math.min(window.devicePixelRatio,n.tier.maxDpr);let e=!1;const i=new iE(n.tier.minScale,{setScale(c){const l=t()*c;n.renderer.setPixelRatio(l),n.post.setPixelRatio(l),n.resize()},degrade(){const c=lE(n.tier.name);return c&&!e&&n.tier.source!=="url"&&(cE(c),e=!0),n.post.setLite()}});let s=performance.now(),r=0,o=s;const a=c=>{const l=(c-s)/1e3;if(n.tick(Math.min(.1,l)),s=c,n.renderer.info.reset(),n.post.render(),i.sample(l),r++,c-o>500){const u=n.renderer.info.render,f=(r*1e3/(c-o)).toFixed(0);n.stats?.(`${f} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${n.tier.name} (${n.tier.source}) · độ phân giải ${Math.round(i.scale*100)}% · ${i.frameMs().toFixed(1)} ms
${n.worldLine()}`),r=0,o=c}requestAnimationFrame(a)};return requestAnimationFrame(a),i}const Q0=je.routeVersion,hE=7*3600*1e3;function Vu(n){const t=new Date(n.getTime()+hE);return`${`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}.${je.routePrefix}${Q0}`}function fE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0||1}function dE(n){let t=n;return()=>{const e=Vu(new Date);return{route:e,seed:n?t++:fE(e)}}}function j0(n){const t=/^\d{4}-(\d{2})-(\d{2})/.exec(n);return t?`${t[2]}/${t[1]}`:n}const Wu=20,tg=2*Math.PI*Wu,pE=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Wu}" class="track"/>
  <circle cx="24" cy="24" r="${Wu}" class="arc" stroke-dasharray="${tg.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function mE(n,t){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${pE}<b>Đèn ×2</b>`,n.appendChild(e);const i=e.querySelector(".arc");let s=!1,r=!1,o="";return{update(a){const c=a.smokeT>0&&a.mode!=="over";if(c!==s&&(s=c,e.classList.toggle("on",s),t.classList.toggle("x2",s)),!s)return;const l=(tg*(1-a.smokeT/rt.smokeTime)).toFixed(1);l!==o&&i.setAttribute("stroke-dashoffset",o=l);const u=a.smokeT<1.5;u!==r&&e.classList.toggle("ending",r=u)}}}const gE={thermal:"Luồng nhiệt — lên tầng cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${rt.smokeLanternMul} trong ${rt.smokeTime} giây`},vE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l1 2.2c2 1.4 3 3.6 3 6.3 0 3.9-2.6 7-6 7.9V21h-4v-1.6c-3.4-.9-6-4-6-7.9 0-2.7 1-4.9 3-6.3z" fill="currentColor"/></svg>',xE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>',vl=n=>Math.floor(n).toLocaleString("vi-VN");function _E(n){const t=document.createElement("div");t.className="hud",t.innerHTML=`
    <div class="hud-dist">
      <div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div>
      <div class="hud-score">Điểm <b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời — qua ngày mới là vùng mới">
        <div class="hud-day-track"><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${xE.repeat(rt.maxHp)}</div>
      <div class="hud-lantern">${vE}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><span data-k="mult">×1,0</span><i data-k="combo"></i></div>
    </div>
    <div class="hud-boost">
      <div class="hud-pill thermal" data-k="thermal"><b>Luồng nhiệt</b><i data-k="thermalBar"></i></div>
    </div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-stats" data-k="stats"></div>`,n.appendChild(t);const e=S=>t.querySelector(`[data-k="${S}"]`),i=e("dist"),s=e("score"),r=e("sun"),o=e("dayNo"),a=e("period"),c=e("lanterns"),l=t.querySelector(".hud-lantern"),u=e("mult"),f=e("multBox"),h=e("combo"),d=e("thermal"),p=e("thermalBar"),v=[...e("hearts").children],g=e("toasts"),m=e("sections"),M=e("stats"),b=mE(t.querySelector(".hud-right"),l);let x=0;const _=(S,w,y)=>{const T=document.createElement("div");T.className=`hud-toast ${w}${y?` ${y}`:""}`,T.textContent=S;const R=w==="section"?m:g;for(R.appendChild(T);R.children.length>(w==="section"?1:3);)R.firstChild.remove();setTimeout(()=>T.remove(),w==="section"?2600:1100)};return{toast:_,setVisible(S){t.classList.toggle("hidden",!S)},bumpLantern(){l.classList.remove("got"),l.getBoundingClientRect(),l.classList.add("got")},setStats(S){M.textContent=S},update(S,w){i.textContent=vl(S.z),s.textContent=vl(Js(S)),r.style.left=`${(w.u*100).toFixed(1)}%`;const y=`Ngày ${w.day}`;o.textContent!==y&&(o.textContent=y);const T=Hx(w);a.textContent!==T&&(a.textContent=T),c.textContent=vl(S.lanterns),u.textContent=`×${S.mult.toFixed(1).replace(".",",")}`,f.classList.toggle("hot",S.mult>1.05),h.style.transform=`scaleX(${S.combo>0?Math.max(0,1-S.comboT/rt.comboBreak):0})`,d.classList.toggle("on",S.thermalT>0),p.style.transform=`scaleX(${S.thermalT/rt.thermalTime})`,v.forEach((C,L)=>C.classList.toggle("lost",L>=S.hp)),b.update(S);const R=t0(w);R>x&&S.mode==="run"&&_(R%3===0?`Ngày ${w.day} · ${Zm[w.region]}`:R%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),x=S.mode==="run"?Math.max(x,R):0},zone(S){const w=ae.zoneNames?.[S];w&&_(w,"section")},events(S,w){for(const y of S)y.type==="near-miss"?_(y.combo>1?`SƯỢT! ×${w.mult.toFixed(1).replace(".",",")}`:"SƯỢT!","combo"):y.type==="hurt"?(_(y.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt"),v[y.hp]?.classList.remove("hit"),v[y.hp]?.getBoundingClientRect(),v[y.hp]?.classList.add("hit")):y.type==="booster"&&y.kind!=="lantern"?_(gE[y.kind],"big",y.kind):y.type==="gust"?_(y.full?`Trọn chuỗi gió! +${rt.gustChainScore}`:`Gió xuôi ×${y.chain}`,y.full?"big":"combo"):y.type==="section"&&w.mode==="run"&&!ae.zoneNames&&_(y.open?Hn(w.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const ME=30,np={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},yE=10,bE=34,SE=260,wE=180,TE=.26,ip=300;function EE(n,t,e){const i=[],s=[],r=new Map;let o=!1;const a=new Map;let c=null,l=0,u=0,f=-1,h=0;const d=[],p=(b,x)=>{t()&&d.forEach(_=>_(b,x))};let v=null,g=0,m=0;window.addEventListener("keydown",b=>{if(b.repeat)return;const x=np[b.code];if(x){i.push(x),x==="down"&&(o=!0),b.preventDefault();const _=performance.now();x===v&&x!=="down"&&_-g<ip?(p(x==="up"?"flip":"roll",x==="right"?-1:1),v=null):(v=x,g=_)}(b.code==="Space"||b.code==="Enter")&&(s.forEach(_=>_()),b.preventDefault()),r.get(b.code)?.()}),window.addEventListener("keyup",b=>{np[b.code]==="down"&&(o=!1)}),n.addEventListener("touchstart",b=>{const x=performance.now();for(const _ of Array.from(b.changedTouches))a.set(_.identifier,{x0:_.clientX,y0:_.clientY,t0:x,hist:[{y:_.clientY,t:x}],hx:[{x:_.clientX,t:x}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),n.addEventListener("touchmove",b=>{b.preventDefault();const x=performance.now();for(const _ of Array.from(b.changedTouches)){const S=a.get(_.identifier);if(!S)continue;for(S.hist.push({y:_.clientY,t:x});S.hist.length>1&&x-S.hist[0].t>SE;)S.hist.shift();const w=_.clientY-S.hist[0].y;for(x>=S.cool&&Math.abs(w)>=bE&&(i.push(w<0?"up":"down"),w<0&&x-m<ip+150?(p("flip",1),m=0):w<0&&(m=x),S.down=w>0&&c!==_.identifier,S.flicked=!0,S.cool=x+150,S.hist=[{y:_.clientY,t:x}]),S.hx.push({x:_.clientX,t:x});S.hx.length>1&&x-S.hx[0].t>wE;)S.hx.shift();const y=_.clientX-S.hx[0].x;x>=S.rollCool&&Math.abs(y)>=n.clientWidth*TE&&(p("roll",y>0?-1:1),S.rollCool=x+700,S.hx=[{x:_.clientX,t:x}]);const T=_.clientX-S.x0;S.dragX===null&&Math.abs(T)>=yE&&Math.abs(T)>=Math.abs(_.clientY-S.y0)*.8&&(S.dragX=_.clientX,c===null&&(c=_.identifier,S.down=!1,u++,l=0)),c===_.identifier&&S.dragX!==null&&(l=(_.clientX-S.dragX)/Math.max(1,n.clientWidth))}},{passive:!1});const M=b=>{const x=performance.now();for(const _ of Array.from(b.changedTouches)){const S=a.get(_.identifier);if(a.delete(_.identifier),c===_.identifier&&(c=null),!S||S.flicked||S.dragX!==null||b.type==="touchcancel")continue;Math.hypot(_.clientX-S.x0,_.clientY-S.y0)<=14&&x-S.t0<=350&&t()?i.push(_.clientX<n.clientWidth/2?"left":"right"):t()||s.forEach(y=>y())}};return n.addEventListener("touchend",M),n.addEventListener("touchcancel",M),n.addEventListener("mousedown",()=>s.forEach(b=>b())),{take(){return i.splice(0,i.length)},holdDown:()=>o||Array.from(a.values()).some(b=>b.down),steer(){if(c===null)return null;f!==u&&(f=u,h=e());let b=h-l*ME;const x=Math.abs(b)-rt.steerMax;return x>0&&(h-=Math.sign(b)*x,b-=Math.sign(b)*x),b},onAction(b){s.push(b)},onKey(b,x){r.set(b,x)},onTrick(b){d.push(b)}}}function eg(n){return/\.github\.io$/.test(location.hostname)||n.has("portal")}function ng(n){return!je.online||n.has("seed")||n.has("z")||n.get("auto")==="1"?!1:eg(n)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function AE(n){return ng(n)&&!n.has("alt")}function RE(n){const t={};let e=null;async function i(o,a={}){try{const c={...t,accept:"application/json"};a.body&&(c["content-type"]="application/json");const l=await fetch(o,{...a,headers:c,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function s(o,a={}){const c=await i(o,a);return e="fail"in c?c.fail:null,"ok"in c?c.ok:null}const r=encodeURIComponent;return{board:o=>s(`api/ghosts?route=${r(o)}`),async paths(o,a){return a.length?(await s(`api/ghosts/paths?route=${r(o)}&pids=${a.map(r).join(",")}`))?.paths??{}:{}},leaderboard:(o="meters")=>i(`api/leaderboard?by=${o}&map=${je.id}`),progress:()=>s("api/progress"),submit:(o,a)=>s("api/ghosts",{method:"POST",body:JSON.stringify({route:o,...a})}),lastFailure:()=>e,async logRun(o){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(o),headers:{...t,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const o=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return o?o.type==="opaqueredirect"||o.status===401?"auth":o.ok?"ok":"network":"network"}}}const ec=10,CE=60/ec,Xu=900*ec,xl=n=>Math.max(-32768,Math.min(32767,Math.round(n*100)));function PE(n){const t=Math.min(Xu,Math.floor(n.length/3)),e=new DataView(new ArrayBuffer(4+t*6)),i=n[0]??0;e.setFloat32(0,i,!0);let s=e.getFloat32(0,!0);for(let a=0;a<t;a++){const c=xl(n[a*3]-s);s+=c/100,e.setInt16(4+a*6,c,!0),e.setInt16(6+a*6,xl(n[a*3+1]),!0),e.setInt16(8+a*6,xl(n[a*3+2]),!0)}let r="";const o=new Uint8Array(e.buffer);for(let a=0;a<o.length;a+=32768)r+=String.fromCharCode(...o.subarray(a,a+32768));return btoa(r)}function LE(n){let t;try{t=atob(n)}catch{return null}const e=Math.floor((t.length-4)/6);if(e<2)return null;const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);const s=new DataView(i.buffer),r={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let o=s.getFloat32(0,!0);if(!Number.isFinite(o))return null;for(let a=0;a<e;a++)o+=s.getInt16(4+a*6,!0)/100,r.z[a]=o,r.x[a]=s.getInt16(6+a*6,!0)/100,r.v[a]=s.getInt16(8+a*6,!0)/100;return r}function ig(n,t,e){const i=Math.max(0,t*ec),s=n.n-1,r=Math.min(s,Math.floor(i)),o=Math.min(s,r+1),a=Math.min(1,i-r);return e.z=n.z[r]+(n.z[o]-n.z[r])*a,e.x=n.x[r]+(n.x[o]-n.x[r])*a,e.v=n.v[r]+(n.v[o]-n.v[r])*a,e.ended=i>=s,e.after=Math.max(0,(i-s)/ec),e}const sg=5,_l=4,NE=1500,IE=200,DE=120;function qu(n,t,e=!1){return e?1:Math.min(1,Math.max(0,(t-NE-n*IE)/DE))}const rg=n=>n.length===1&&n[0].self;function UE(n){const t=n.runs.find(o=>o.pid===n.me),e=n.runs.filter(o=>o.pid!==n.me),i=t?.dist??0,s=o=>o.dist>=i?o.dist-i:(i-o.dist)*2,r=[];t&&r.push(t),e[0]&&r.push(e[0]);for(const o of e.slice(1).sort((a,c)=>s(a)-s(c))){if(r.length>=sg)break;r.push(o)}return r}function FE(){let n=[];const t=[];return{ghosts:()=>n,set(e){n=[];for(const i of e){const s=LE(i.path);s&&n.push({run:i.run,self:i.self,track:s,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of n)e.ahead=null,e.downSaid=!1},update(e,i){t.length=0;const s=rg(n);return n.forEach((r,o)=>{ig(r.track,e,r.at);const a=r.at.z-i,c=r.run.name,l=qu(o,i,s)>0;l&&a>_l&&r.ahead===!1&&t.push({type:"passed",name:c,self:r.self}),l&&a<-_l&&r.ahead===!0&&t.push({type:"pass",name:c,self:r.self}),Math.abs(a)>_l&&(r.ahead=a>0),r.at.ended&&!r.downSaid&&(r.downSaid=!0,l&&r.run.crash&&Math.abs(a)<300&&t.push({type:"down",name:c,self:r.self,dist:r.run.dist}))}),t},rank(e){return 1+n.filter(i=>i.at.z>e).length}}}function kE(){let n=[],t=0,e=!1;const i=s=>{n.length<Xu*3&&n.push(s.z,s.x,s.v)};return{start(s){n=[],t=0,e=!0,i(s)},afterStep(s){e&&(t++,t%CE===0&&i(s),s.mode==="over"&&(e=!1))},seconds:()=>t/60,truncated:()=>n.length>=Xu*3,finish:()=>PE(n)}}const Ml="skyrun.myGhost",ua="me";function OE(n){let t=null;const e=(r,o)=>!!r&&r.route===o&&typeof r.path=="string"&&Number.isFinite(r.dist);function i(r){let o=null;try{o=JSON.parse(localStorage.getItem(Ml)??"null")}catch{}const a=e(o,r)?o:null,c=e(t,r)?t:null;return a&&c?c.dist>a.dist?c:a:a??c}function s(r){const o=i(r);return{me:ua,myName:null,total:o?1:0,runs:o?[{pid:ua,name:"Bạn",dist:o.dist,score:o.score,dur:o.dur,crash:o.crash}]:[]}}return{board:async r=>s(r),async paths(r,o){const a=i(r);return a&&o.includes(ua)?{[ua]:a.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(r,o){const a=i(r),c=!a||o.dist>a.dist;if(c){t={route:r,dist:o.dist,score:o.score,dur:o.dur,crash:o.crash,path:o.path};try{localStorage.removeItem(Ml),localStorage.setItem(Ml,JSON.stringify(t))}catch{}}return{saved:c,best:c?o.dist:a.dist,rank:1,total:1,bestScore:o.score,scoreRank:1}},lastFailure:()=>null,logRun:n,ping:async()=>"ok"}}const BE="modulepreload",zE=function(n,t){return new URL(n,t).href},sp={},HE=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=zE(u,i),u in sp)return;sp[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(i)for(let p=o.length-1;p>=0;p--){const v=o[p];if(v.href===u&&(!f||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":BE,f||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((p,v)=>{d.addEventListener("load",p),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},GE="skyRuns",rp="sr-tele",op="../../shared/",yl=new Map;function ap(n){let t=yl.get(n);return t||(t=new Promise((e,i)=>{const s=document.createElement("script");s.src=n,s.onload=()=>e(),s.onerror=()=>i(new Error(`không tải được ${n}`)),document.head.appendChild(s)}),t.catch(()=>yl.delete(n)),yl.set(n,t)),t}function VE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function WE(n,t,e,i){const{route:s,rv:r,sv:o,alt:a,dist:c,dur:l,score:u,crash:f,tainted:h,...d}=n;return{v:1,ch:t,pk:e,at:i,route:s,rv:r,sv:o,alt:a,dist:Math.round(c*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:f??null,tainted:h,detail:JSON.stringify(d)}}let ks=null;function XE(){return ks||(ks=(async()=>{await ap(`${op}portal-config.js`),await ap(`${op}portal-firebase.js`);const n=window.Portal,t=n?.FB;if(!t?.configured())throw new Error("chưa cấu hình Firebase");const e=await t.load(),i=await HE(()=>import(`${t.SDK}/firebase-app.js`),[],import.meta.url),s=i.getApps().find(a=>a.name===rp)??i.initializeApp(n.CONFIG,rp),r=e.authM.getAuth(s);await r.authStateReady(),r.currentUser||await e.authM.signInAnonymously(r);let o;try{o=e.fsM.initializeFirestore(s,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{o=e.fsM.getFirestore(s)}return{fsM:e.fsM,db:o,uid:r.currentUser.uid,limit:t.limit.bind(t)}})(),ks.catch(()=>ks=null),ks)}function qE(){const n=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async t=>{try{const e=await XE();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,GE),WE(t,n,VE(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const $E=1e9,KE=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),YE=[...document.scripts].map(n=>/assets\/index-([\w-]+)\.js/.exec(n.src)?.[1]).find(Boolean)??"dev",cp=n=>n.thermalV>8?"thermal":n.v<-2?"low":n.v>2?"high":"zero",ZE=(n,t)=>n>=$E?"trail":t>2?"u":t<-2?"d":"o",JE=n=>ae.zone(ze(n),$i(n)),ha=(n,t)=>n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:0,Un=n=>Math.round(n*100)/100;function QE(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function jE(n){let t={touch:!1,key:!1};addEventListener("keydown",()=>t.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(t.touch=!0)});let e="",i=!1,s=0,r=-1,o=null,a=c();function c(){const l=u=>Object.fromEntries(u.map(f=>[f,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke"]),bTaken:l(["thermal","shield","smoke"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1}}return{start(l,u,f){e=u,i=f,s++,o=r<0?null:Un((performance.now()-r)/1e3),t={touch:!1,key:!1},a=c(),a.lastCmd=l.time},frame(l,u,f){l>0&&l<.5&&(a.frames.length<3e4&&a.frames.push(l),a.scaleSum+=n.quality().scale*l),a.shown=Math.max(a.shown,u),a.near=f},afterStep(l,u){if(l.mode!=="run"&&l.mode!=="crash")return;const f=cp(l);a.tiers[f]+=u,a.multSum+=l.mult*u,f!=="low"?a.lowSince=-1:a.lowSince<0&&(a.lowSince=l.time);for(const h of l.events)h.type==="lane"?a.swipes.lane++:h.type==="vert"?a.swipes[h.kind==="flare"?"up":"down"]++:h.type==="hurt"?a.hurts++:h.type==="crash"&&(a.deathNear=a.near),(h.type==="lane"||h.type==="vert")&&(a.lastCmd=l.time);for(const h of l.pickups){if(h.z>l.z-3.5)break;if(!a.seen.has(h.id))if(a.seen.add(h.id),h.kind==="lantern"){const d=ZE(h.id,h.v);a.lSpawn[d]++,h.taken&&a.lTaken[d]++}else a.bSpawn[h.kind]++,h.taken&&a.bTaken[h.kind]++}for(const h of l.obstacles){if(!h.passed||a.rows.has(h.row)||(a.rows.add(h.row),l.hurtRow===h.row||l.mode!=="run"))continue;const d=l.time-l.dodgeTime;d<1.5&&Oa(h,l.dodgeX,l.thermalV,0)&&a.leads.push(d),h.kind==="bridge"&&a.lowSince>=0&&l.time-a.lowSince>=.5&&a.bridgesFromLow++}},finish(l,u,f,h){r=performance.now();const d=[...a.frames].sort((b,x)=>b-x),p=a.frames.reduce((b,x)=>b+x,0),v=[...a.leads].sort((b,x)=>b-x),g=Km(),m=to(),M=n.quality();return{lv:1,route:e,rv:h,sv:fs,alt:i,build:YE,session:KE,runNo:s,wait:o,dist:Math.floor(l.z),dur:Un(l.time),score:Js(l),crash:u,tainted:f,hurts:a.hurts,device:{tier:M.tier,gov:Un(p>0?a.scaleSum/p:M.scale),fps50:Math.round(d.length?1/ha(d,.5):0),fps5:Math.round(d.length?1/ha(d,.95):0),input:t.touch&&t.key?"mixed":t.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:m.ghosts,music:g.music?m.music:"off",tutorial:QE()},death:u?{phase:Math.round(ze(l.z)),zone:JE(l.z),tier:cp(l),sinceCmd:Un(l.time-a.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust)},lanterns:{spawned:a.lSpawn,taken:a.lTaken,bestStreak:l.bestStreak,avgMult:Un(l.time>0?a.multSum/l.time:1)},tiers:{low:Un(a.tiers.low),zero:Un(a.tiers.zero),high:Un(a.tiers.high),thermal:Un(a.tiers.thermal)},swipes:a.swipes,bridgesFromLow:a.bridgesFromLow,boosters:{spawned:a.bSpawn,taken:a.bTaken},lead:{p10:Un(ha(v,.1)),p50:Un(ha(v,.5)),n:v.length},ghosts:{shown:a.shown,deathNear:a.deathNear}}}}}const $u="skyrun.pending",t2=12e4,lp=[1500,4e3];function fa(){try{const n=JSON.parse(localStorage.getItem($u)??"[]");return Array.isArray(n)?n:[]}catch{return[]}}function bl(n){try{n.length?localStorage.setItem($u,JSON.stringify(n)):localStorage.removeItem($u)}catch{}}function up(n){const t=Date.now(),e=[Vu(new Date(t)),Vu(new Date(t-864e5))].map(i=>i.slice(0,10));return typeof n.route=="string"&&e.includes(n.route.slice(0,10))&&!!n.run}function e2(n){let t=performance.now(),e=!1;const i=r=>new Promise(o=>setTimeout(o,r));async function s(r,o){for(let a=0;;a++){const c=await n.submit(r,o);if(c)return{ok:c};const l=n.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||a>=lp.length)return{fail:l};await i(lp[a])}}return{keepAlive(r){const o=performance.now();o-t<t2||(t=o,n.ping().then(a=>{a!=="auth"||e||(e=!0,r())}))},async submit(r,o){t=performance.now();const a={route:r,run:o,at:Date.now()};bl([...fa().filter(up),a].slice(-3));const c=await s(r,o);return(!("fail"in c)||c.fail.kind==="rejected")&&bl(fa().filter(l=>l.at!==a.at||l.route!==r)),c},async flush(){const r=fa().filter(up),o=[],a=[];for(const c of r)await n.submit(c.route,c.run)?o.push(c.run.dist):n.lastFailure()?.kind!=="rejected"&&a.push(c);return(r.length||fa().length)&&bl(a),o}}}const n2=160;function i2(n,t){const e=document.createElement("div");e.className="ghost-layer";const i=Array.from({length:t},()=>{const a=document.createElement("div");return a.className="ghost-tag",e.appendChild(a),a}),s=document.createElement("div");s.className="ghost-rank",e.appendChild(s),n.appendChild(e);const r=new P;let o="";return{update(a,c,l,u,f,h){if(e.classList.toggle("on",h&&l.length>0),!h)return;const d=n.clientWidth,p=n.clientHeight;i.forEach((g,m)=>{const M=m<c.count?l[c.owner[m]]:void 0,b=c.alphas[m]??0;if(!M||b<.15||Math.abs(M.at.z-f)>n2){g.style.opacity="0";return}if(r.copy(c.heads[m]).project(a),r.z>1){g.style.opacity="0";return}const x=M.self?"Kỷ lục của bạn":M.run.name;g.textContent!==x&&(g.textContent=x),g.classList.toggle("self",M.self),g.style.opacity=Math.min(1,b*1.6).toFixed(2),g.style.transform=`translate(${((r.x+1)*.5*d).toFixed(1)}px, ${((1-r.y)*.5*p).toFixed(1)}px) translate(-50%, -100%)`});const v=l.every(g=>g.self)?"":`Hạng ${u}/${l.length+1}`;v!==o&&(s.textContent=v,o=v)}}}const Ua=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function s2(){const n=document.createElement("button");n.type="button",n.className="board-btn",n.setAttribute("aria-label","Bảng xếp hạng"),n.innerHTML='<span class="board-btn-icon" aria-hidden="true">🏆</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>',n.hidden=!0;const t=n.querySelector(".board-btn-rank");n.addEventListener("click",()=>n.classList.remove("fresh"));const e=i=>{t.hidden=!i,t.textContent=i?`#${i}`:""};return{el:n,setRank:e,bump(i){e(i),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump","fresh")},seen:()=>n.classList.remove("fresh")}}function r2(n,t,e,i){const s=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!s||Ua())return e.bump(i);const r=n.getBoundingClientRect(),o=t.getBoundingClientRect(),a=s.getBoundingClientRect(),c=o.left+o.width/2-r.left,l=o.top+o.height/2-r.top,u=a.left+a.width/2-r.left-c,f=a.top+a.height/2-r.top-l,h=document.createElement("div");h.className="rank-fly",h.textContent="🏆",h.style.left=`${c}px`,h.style.top=`${l}px`,n.appendChild(h);const d=(g,m,M)=>`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(${M})`;let p=!1;const v=()=>{p||(p=!0,h.remove(),e.bump(i))};h.animate([{transform:d(0,0,.6),opacity:0},{transform:d(u*.3,f*.45-70,1.7),opacity:1,offset:.35},{transform:d(u,f,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=v,setTimeout(v,900)}const Ku=n=>Math.floor(n).toLocaleString("vi-VN"),da="meters",pa=900;function o2(n,t){const e=document.createElement("li");e.className=n.pos==="me"?"me":`ctx ${n.pos}`;for(const[i,s]of[["r",`#${n.rank}`],["n",n.pos!=="me"?n.name:n.name?`${n.name} (bạn)`:"Bạn"],["v",Ku(n.value)+t]]){const r=document.createElement("span");r.className=i,r.textContent=s,e.appendChild(r)}return e}function hp(n,t,e,i,s){const r=performance.now(),o=()=>{n.textContent=s(e)},a=c=>{const l=Math.min(1,(c-r)/i);n.textContent=s(Math.round(t+(e-t)*(1-(1-l)**3))),l<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(o,i+80)}function a2(n){let t,e=0;async function i(){const r=e,o=await n.client.leaderboard(da);if(r!==e||!("ok"in o))return;const a=o.ok.mine;t=a?{rank:a.rank,value:a[da]??0}:null,n.button.setRank(a?.rank??null)}function s(r,o,a,c,l){const{by:u,rank:f,best:h,improved:d,climbed:p}=o,{tab:v,unit:g}=n.text(u),m=St=>c[St-1],M=[],b=m(f-1),x=m(f+1);b&&M.push({rank:f-1,name:b.name,value:b[u]??0,pos:"above"}),M.push({rank:f,name:l,value:h,pos:"me"}),x&&M.push({rank:f+1,name:x.name,value:x[u]??0,pos:"below"});const _=document.createElement("div");_.className="rank-card",_.setAttribute("role","button"),_.setAttribute("aria-label",`Xem bảng xếp hạng ${v}`);const S=document.createElement("div");S.className="rank-head",S.innerHTML='<span aria-hidden="true">🏆</span> <b>Bảng xếp hạng</b> <span class="by"></span><span class="rank-chip" hidden></span>',S.querySelector(".by").textContent=`· ${v}`;const w=S.querySelector(".rank-chip");w.textContent=d?a===null?"Mới lên bảng":p&&a?`▲ ${a.rank-f}`:"Kỷ lục mới":"";const y=document.createElement("ol");y.className="rank-rows";const T=M.map(St=>o2(St,g));y.append(...T);const R=document.createElement("div");R.className="rank-note";const L=(a?c.slice(f,a.rank):a===null?c.slice(f):[]).map(St=>St.name),D=L.length>2?`${L.slice(0,2).join(", ")} +${L.length-2}`:L.join(", ");R.textContent=f===1&&p?"Bạn đang dẫn đầu bảng!":p&&D?`Vượt ${D}!`:a===null?"Đã có tên trên bảng!":p?`Lên hạng #${f}!`:d?`Kỷ lục mới — giữ hạng #${f}`:"Vượt kỷ lục để leo hạng";const I=document.createElement("span");I.className="rank-more",I.textContent="Cả bảng ›",R.appendChild(I),_.append(S,y,R);for(const St of["touchstart","touchend","touchmove","pointerdown"])_.addEventListener(St,Nt=>Nt.stopPropagation(),{passive:!0});_.addEventListener("mousedown",St=>St.stopPropagation());let B=!1;_.addEventListener("click",St=>{St.stopPropagation(),B=!0,n.button.seen(),n.open(u)}),r.before(_);const H=T[M.findIndex(St=>St.pos==="me")],W=H.querySelector(".r"),j=()=>{w.hidden=!w.textContent,d&&H.classList.add("shine"),setTimeout(()=>{if(!d||B)return n.button.setRank(f);_.isConnected?r2(n.root,W,n.button,f):n.button.bump(f)},Ua()?0:450)};if(!p||Ua())return void setTimeout(j,Ua()?0:400);const O=H.getBoundingClientRect().height+2,$=x?T[T.length-1]:void 0,_t={duration:pa,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};H.animate([{transform:`translateY(${O}px)`,opacity:$?1:0},{transform:"none",opacity:1}],_t),$?.animate([{transform:`translateY(${-O}px)`},{transform:"none"}],_t),W.textContent=a?`#${a.rank}`:"#–";const ft=H.querySelector(".v");a&&(ft.textContent=Ku(a.value)+g),setTimeout(()=>{a?hp(W,a.rank,f,pa,St=>`#${St}`):W.textContent=`#${f}`,hp(ft,a?.value??0,h,pa,St=>Ku(St)+g)},380),setTimeout(j,380+pa)}return{snapshot:i,async celebrate(r,o,a){e++;const c=r.metersRank!==void 0?"meters":"score",l=c===da?t:void 0,u=a?n.root.querySelector(".screens.over .over-card [data-online]"):null,f=u?await n.client.leaderboard(c):null,h=f&&"ok"in f?f.ok:null,d=h?.mine?.rank??r.metersRank??r.scoreRank,p=h?.mine?.[c]??(c==="meters"?r.bestMeters??0:r.bestScore);c===da&&(t={rank:d,value:p});const v=c==="meters"?o.dist:o.score,g=l===null||(l!==void 0?p>l.value:v>=p),m=g&&(l===null||l!==void 0&&l.rank>d);if(u?.isConnected)return s(u,{by:c,rank:d,best:p,improved:g,climbed:m},l,h?.top??[],h?.mine?.name??"");n.button.setRank(d),g&&n.button.el.classList.add("fresh")}}}function c2(n,t){const e=n.querySelector("li.me");if(!e)return;const i=e.getBoundingClientRect(),s=n.getBoundingClientRect();n.scrollTop+=i.top-s.top-(s.height-i.height)/2,t&&e.classList.add("me-new")}const nc=n=>Math.floor(n).toLocaleString("vi-VN"),l2=[1500,4e3],Br={meters:{tab:"Quãng xa",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},fp=["meters","score","lanterns"];function u2(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":n.kind==="network"?`Chưa tải được bảng (${n.status?`máy chủ báo lỗi ${n.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${n.why??n.status}).`}function dp(n,t,e,i){const s=document.createElement("li");s.className=i?"me":"";const r=(o,a)=>{const c=document.createElement("span");c.className=o,c.textContent=a,s.appendChild(c)};return r("board-rank",`#${e}`),r("board-name",i?`${n.name} (bạn)`:n.name),r("board-score",nc(n[t]??0)+Br[t].unit),r("board-meta",`${nc(n.dist)} m · ${j0(n.route)}`),s}function h2(n,t){const e=s2(),i=e.el,s=document.createElement("div");s.className="board-panel",s.hidden=!0;const r=fp.map(x=>`<button type="button" role="tab" data-by="${x}">${Br[x].tab}</button>`).join("");s.innerHTML=`
    <div class="board-card" role="dialog" aria-label="Bảng xếp hạng">
      <div class="board-head"><div><b>${je.name} <span class="board-season"></span></b><small class="board-sub"></small></div>
        <button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <div class="board-tabs" role="tablist">${r}</div>
      <p class="board-status"></p>
      <button type="button" class="board-retry" hidden>Thử lại</button>
      <ol class="board-list"></ol>
    </div>`,n.append(i,s);const o=s.querySelector(".board-season"),a=s.querySelector(".board-sub"),c=s.querySelector(".board-status"),l=s.querySelector(".board-retry"),u=s.querySelector(".board-list"),f=[...s.querySelectorAll(".board-tabs button")];o.textContent=`Mùa ${fs}`;let h="meters";const d={};for(const x of[i,s]){for(const _ of["touchstart","touchend","touchmove","pointerdown"])x.addEventListener(_,S=>S.stopPropagation(),{passive:!0});x.addEventListener("mousedown",_=>{_.stopPropagation(),_.target instanceof Element&&_.target.closest("button")&&_.preventDefault()})}let p=0,v=!1;const g=()=>{s.hidden=!0,p++,v=!1};function m(){for(const x of f)x.setAttribute("aria-selected",String(x.dataset.by===h));a.textContent=Br[h].sub}async function M(){s.hidden=!1,m(),l.hidden=!0,c.textContent="Đang tải…",u.replaceChildren();const x=++p,_=h,S=Br[_];let w=await t.leaderboard(_);for(const T of l2){if(x!==p||"ok"in w||w.fail.kind!=="network")break;await new Promise(R=>setTimeout(R,T)),x===p&&(w=await t.leaderboard(_))}if(x!==p)return;if("fail"in w){const T=d[_];c.textContent=u2(w.fail)+(T?` Bảng ĐÃ ghi ${S.best} của bạn: ${nc(T.best)}${S.unit} — hạng #${T.rank}.`:""),l.hidden=w.fail.kind==="auth";return}const y=w.ok;if(o.textContent=`Mùa ${y.season}`,!y.top.length){c.textContent=S.empty;return}if(c.textContent=`${nc(y.total)} ${S.count}`,u.replaceChildren(...y.top.map((T,R)=>dp(T,_,R+1,T.pid===y.me))),y.mine&&!y.top.some(T=>T.pid===y.me)){const T=document.createElement("li");T.className="board-gap",T.textContent="…",u.append(T,dp(y.mine,_,y.mine.rank,!0))}c2(u,v),v=!1}const b=a2({root:n,client:t,button:e,text:x=>Br[x],open:x=>(h=x,v=!0,void M())});b.snapshot(),i.addEventListener("click",()=>{M()}),l.addEventListener("click",()=>{M()});for(const x of f)x.addEventListener("click",()=>{h=fp.find(_=>_===x.dataset.by)??"meters",M()});return s.querySelector(".board-close").addEventListener("click",g),s.addEventListener("click",x=>{x.target===s&&g()}),window.addEventListener("keydown",x=>{x.code==="Escape"&&!s.hidden&&g()}),{setAvailable(x){i.hidden!==!x&&(i.hidden=!x,x||g())},runStart(){g(),b.snapshot()},remember(x,_,S){d.score={best:x.bestScore,rank:x.scoreRank},x.metersRank!==void 0&&(d.meters={best:x.bestMeters??0,rank:x.metersRank}),x.lanternRank!==void 0&&(d.lanterns={best:x.bestLanterns??0,rank:x.lanternRank}),b.celebrate(x,_,S)}}}const Mi=n=>Math.floor(n).toLocaleString("vi-VN");function f2(n,t,e){const i=t.runs[0],s=`Đường bay hôm nay ${j0(n)}`;if(e)return i?`${s} · bóng vàng là kỷ lục hôm nay của bạn ${Mi(i.dist)} m — bay vượt nó!`:`${s} · bay một ván trên 200 m để có bóng của chính bạn`;if(!i)return`${s} · chưa ai bay — bạn mở đường!`;const r=i.pid===t.me?"bạn":i.name;return`${s} · ${t.total} người đã bay · dẫn đầu ${r} ${Mi(i.dist)} m`}function d2(n,t){if(t)return n.saved?`Kỷ lục hôm nay mới ${Mi(n.best)} m — ván sau bóng vàng của bạn bay đúng đường này`:`Kỷ lục hôm nay ${Mi(n.best)} m — bóng vàng vẫn là ván đó, bay vượt nó!`;const e=n.saved?`kỷ lục ngày mới ${Mi(n.best)} m`:`kỷ lục ngày ${Mi(n.best)} m`,i=n.lanternRank?` · đèn #${n.lanternRank}`:"";return`BXH điểm mùa ${fs} #${n.scoreRank} (cao nhất ${Mi(n.bestScore)})${i} · hôm nay hạng ${n.rank}/${n.total}, ${e}`}const p2=n=>`Ván có bot lái hoặc nhảy quãng — ${n?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function m2(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":n.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${n.why??n.status}).`}function g2(n){return n.type==="pass"?n.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${n.name}!`,"combo"]:n.type==="passed"?[n.self?"Kỷ lục của bạn vượt lên":`${n.name} vượt lên`,"big"]:[n.self?`Kỷ lục của bạn dừng ở ${Mi(n.dist)} m`:`${n.name} rơi ở ${Mi(n.dist)} m`,"big"]}const v2=200,x2=1.2,_2=n=>Math.floor(n).toLocaleString("vi-VN");function M2(n){const t=AE(n.params),e=eg(n.params),i=e?OE(qE()):RE(n.params),s=ng(n.params)?jE({quality:n.quality}):null,r=kE(),o=e2(i),a=FE(),c=i2(n.root,sg),l=t&&!e?h2(n.root,i):null;let u="",f=0,h=!1,d=-9,p=null,v=0,g=!1,m=0,M="";const b=_=>{M=_,n.screens.setOnline(_)};async function x(_,S){u=_;const w=++f,y=await o.flush(),T=await i.board(_);if(w!==f||!T)return;const R=y.length?` · đã gửi bù ván ${_2(Math.max(...y))} m`:"";S?b(f2(_,T,e)+R):R&&b(M+R);const C=UE(T),L=await i.paths(_,C.map(I=>I.pid));if(w!==f)return;const D=C.filter(I=>L[I.pid]).map(I=>({run:I,self:I.pid===T.me,path:L[I.pid]}));h?p=D:a.set(D)}return t&&x(n.route,!0),{runStart(_,S){t&&S!==u&&(a.set([]),p=null,x(S,!1)),p&&a.set(p),p=null,r.start(_),a.reset(),h=!0,l?.runStart(),d=-9,v++,g=!1,m=_.z,s?.start(_,S,n.params.has("alt"))},afterStep(_,S){(S||Math.abs(_.z-m)>10)&&(g=!0),m=_.z,r.afterStep(_),s?.afterStep(_,1/60)},present(_,S,w,y){const T=h&&(_.mode==="run"||_.mode==="crash"),R=r.seconds()-(1-w)/60;if(T)for(const C of a.update(R,S.z))_.mode!=="run"||R-d<x2||(d=R,n.hud.toast(...g2(C)));if(t&&!e&&o.keepAlive(()=>T?n.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):b(`${M?`${M} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),n.view.update(T?a.ghosts():[],S,R,y,n.camera.position),s&&_.mode==="run"){let C=!1;for(let L=0;L<n.view.count;L++)C||=n.view.heads[L].distanceTo(n.camera.position)<15;s.frame(y,n.view.count,C)}c.update(n.camera,n.view,a.ghosts(),a.rank(S.z),S.z,T),l?.setAvailable(n.screens.visible()!==null)},async progress(){if(!t||e)return null;const _=await i.progress();return _?{score:_.season===fs?_.score:{},meters:_.meters??{}}:null},async runOver(_,S){if(h=!1,s&&i.logRun(s.finish(_,S,g,n.rv)),!t||!u||_.z<v2)return;if(g)return b(p2(e));const w=v;e||b("Đang gửi ván lên bảng hôm nay…");const y=await o.submit(u,{sv:fs,lanterns:_.lanterns,dist:Math.floor(_.z),score:Js(_),dur:Math.min(3600,Math.round(r.seconds()*10)/10),crash:r.truncated()?null:S,path:r.finish()});w===v&&b("fail"in y?m2(y.fail):d2(y.ok,e)),"ok"in y&&l?.remember(y.ok,{dist:Math.floor(_.z),score:Js(_)},w===v),"ok"in y&&await x(u,!1)}}}const y2=.8;function b2(n,t,e){const i=document.createElement("button");i.type="button",i.className="pause-btn",i.setAttribute("aria-label","Tạm dừng"),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',t.prepend(i);const s=document.createElement("div");s.className="pause-screen",s.innerHTML=`<div class="pause-card"><div class="pause-title">Đang tạm dừng</div>
    <button type="button" class="btn-play" data-resume>Bay tiếp</button>
    <div class="pause-hint">${e?"Hoặc chạm bất kỳ đâu":"Hoặc bấm Space"}</div></div>`,n.appendChild(s);let r=!1,o=!1,a=1;const c=()=>{s.classList.toggle("on",r),i.classList.toggle("on",o&&!r)},l={paused:()=>r,pause(){!o||r||(r=!0,c())},resume(){r&&(r=!1,a=.15,c())},setRunning(u){o!==u&&(o=u,u||(r=!1),c())},factor(u){return r?0:(a=Math.min(1,a+u/y2),a)}};return i.addEventListener("click",()=>l.pause()),s.querySelector("[data-resume]").addEventListener("click",u=>{u.stopPropagation(),l.resume()}),document.addEventListener("visibilitychange",()=>{document.hidden&&l.pause()}),window.addEventListener("keydown",u=>{!u.repeat&&(u.code==="KeyP"||u.code==="Escape")&&(r?l.resume:l.pause)()}),l}const og="skyrun.best",S2=800,w2={pillar:"Đâm cột đá — lần sau kéo ngón (hoặc chạm) sang bên trống để né.",spike:"Đâm mỏm đá — vuốt lên để vọt qua, hoặc sang làn khác.",ridge:"Sống đá chắn cả khe — vuốt lên để vọt qua.",bridge:"Cầu treo chắn ngang — vuốt xuống để chui qua.",overhang:"Đâm mái đá — vuốt xuống để chui dưới, hoặc sang làn khác."},T2={spike:"Đâm mái nhà — vuốt lên để vọt qua nóc, hoặc kéo sang làn trống.",ridge:"Mái đình chắn ngang — vuốt lên để vọt qua.",bridge:"Cổng làng chắn ngang — vuốt xuống để chui qua cửa cổng."};function E2(){try{return Number(localStorage.getItem(og)??0)||0}catch{return 0}}function A2(n){try{localStorage.setItem(og,String(n))}catch{}}function R2(n,t,e){const i=document.createElement("div");i.className="screens",n.appendChild(i);let s=null,r=E2(),o=0,a="";const c=()=>{const u=i.querySelector("[data-online]");u&&(u.textContent=a,u.hidden=!a)},l=()=>{i.querySelector("[data-play]")?.addEventListener("click",f=>{f.stopPropagation(),t()});const u=i.querySelector("[data-lobby]");if(u){for(const f of["touchstart","touchend","pointerdown","mousedown"])u.addEventListener(f,h=>h.stopPropagation());u.addEventListener("click",f=>{f.stopPropagation(),e()})}};return{visible:()=>s,tapReady:()=>s!=="over"||performance.now()-o>S2,showTitle(){s="title",i.className="screens title",i.innerHTML=`
        <div class="title-card">
          <div class="title-kicker">${je.name} · Wingsuit</div>
          <h1 class="title-word">Sky Run</h1>
          <p class="title-sub">${je.tagline}</p>
          <div class="title-actions">
            <button class="btn-play" data-play>Bay <kbd>Space</kbd></button>
            <button type="button" class="btn-lobby" data-lobby>Chọn map</button>
          </div>
          <div class="title-keys key-only">
            <span><kbd>←</kbd><kbd>→</kbd> đổi làn</span>
            <span><kbd>↑</kbd> vọt lên</span>
            <span><kbd>↓</kbd> bổ nhào</span>
            <span><kbd>P</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</span>
          </div>
          <ul class="title-touch touch-only">
            <li><b>← →</b> Kéo ngón ngang để lượn (hoặc chạm hai bên)</li>
            <li><b>↑</b> Vuốt lên: vọt qua đá</li>
            <li><b>↓</b> Vuốt xuống: chui dưới cầu</li>
          </ul>
          ${r>0?`<div class="title-best">Kỷ lục <b>${r.toLocaleString("vi-VN")}</b></div>`:""}
          <div class="screen-online" data-online hidden></div>
          <div class="rotate-hint">Mẹo: xoay ngang máy để thấy rộng hơn</div>
        </div>`,l(),c()},setOnline(u){a=u??"",c()},showOver(u,f){s="over",o=performance.now();const h=Js(u),d=h>r;return d&&(r=h,A2(r)),i.className="screens over",i.innerHTML=`
        <div class="over-card">
          <div class="over-kicker">${d?"Kỷ lục mới!":"Hạ cánh khẩn cấp"}</div>
          <div class="over-score">${h.toLocaleString("vi-VN")}</div>
          <div class="over-stats">
            <div><b>${Math.floor(u.z).toLocaleString("vi-VN")} m</b><span>quãng bay</span></div>
            <div><b>${u.lanterns}</b><span>đèn trời</span></div>
            <div><b>${r.toLocaleString("vi-VN")}</b><span>kỷ lục</span></div>
          </div>
          ${f?`<p class="over-tip">${$i(u.z)&&T2[f]||w2[f]}</p>`:""}
          <div class="screen-online" data-online hidden></div>
          <div class="over-actions">
            <button class="btn-play" data-play>Bay lại <kbd>Space</kbd></button>
            <button type="button" class="btn-lobby" data-lobby>Sảnh</button>
          </div>
        </div>`,l(),a="",c(),d},hide(){s=null,i.className="screens",i.innerHTML=""}}}const C2='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',P2=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],L2={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách — hết bài tự sang bài khác"};function N2(n,t,e,i,s){i.mode=to().ghosts;const r=document.createElement("button");r.type="button",r.setAttribute("aria-label","Cài đặt"),r.innerHTML=C2,t.el.insertBefore(r,t.el.querySelector('[data-k="mute"]'));const o=document.createElement("div");o.className="settings-panel",o.hidden=!0,o.innerHTML=`
    <div class="settings-card" role="dialog" aria-label="Cài đặt">
      <div class="board-head"><div><b>Cài đặt</b></div><button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <h3>Âm thanh</h3>
      <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span><div class="settings-seg two" data-sw="sfx"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <div class="settings-row"><span>Nhạc nền</span><div class="settings-seg two" data-sw="music"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <h3>Chọn nhạc nền</h3><p class="settings-note"></p><div class="settings-music"></div>
      <h3>Bóng ma <small>người đã bay route hôm nay</small></h3><div class="settings-seg"></div>
    </div>`,n.append(o);const a=o.querySelector(".settings-note"),c=o.querySelector(".settings-music"),l=o.querySelector(".settings-seg:not([data-sw])"),u=[L2,...Ga].map(g=>{const m=document.createElement("button");return m.type="button",m.className="settings-opt",m.dataset.music=g.id,m.innerHTML='<b></b><small></small><span class="now">♪ đang phát</span>',m.querySelector("b").textContent=g.label,m.querySelector("small").textContent=g.style,c.append(m),m}),f=P2.map(([g,m])=>{const M=document.createElement("button");return M.type="button",M.dataset.ghost=g,M.textContent=m,l.append(M),M}),h=()=>{const g=e.music(),m=g?.choice()??to().music,M=g?.playing()?.id,b=g?.loading()?.id;for(const _ of u){const S=_.dataset.music;_.classList.toggle("on",S===m),_.classList.toggle("playing",S===M||S===b),_.querySelector(".now").textContent=S===b?"… đang tải":"♪ đang phát"}const x=e.prefs();a.textContent=x.music?"":"Nhạc đang tắt — chọn một mục là bật lại.";for(const _ of f)_.classList.toggle("on",_.dataset.ghost===i.mode);for(const _ of o.querySelectorAll("[data-sw] [data-on]")){const S=_.parentElement.dataset.sw;_.classList.toggle("on",x[S]===(_.dataset.on==="1"))}};let d=0;const p=()=>{o.hidden=!0,clearInterval(d)},v=()=>{s.pause(),o.hidden=!1,h(),d=window.setInterval(h,1e3)};for(const g of[r,o]){for(const m of["touchstart","touchend","touchmove","pointerdown"])g.addEventListener(m,M=>M.stopPropagation(),{passive:!0});g.addEventListener("mousedown",m=>{m.stopPropagation(),m.target instanceof Element&&m.target.closest("button")&&m.preventDefault()})}r.addEventListener("click",v),o.querySelector(".board-close").addEventListener("click",p),o.addEventListener("click",g=>{if(g.target===o)return p();const m=g.target instanceof Element?g.target.closest("[data-music],[data-ghost],[data-on]"):null;if(m){if(m.dataset.on){const M=m.parentElement.dataset.sw;e.prefs()[M]!==(m.dataset.on==="1")&&(M==="sfx"?e.toggleSfx:e.toggleMusic)(),t.sync()}else m.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(m.dataset.music),t.sync()):(i.mode=m.dataset.ghost,Ym({ghosts:i.mode}));h()}}),window.addEventListener("keydown",g=>{o.hidden||(g.stopPropagation(),g.code==="Escape"&&p())},{capture:!0})}const I2='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="off" d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',D2='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17.5V6l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function U2(n,t){const e=document.createElement("div");e.className="sound-btns",e.innerHTML=`<button type="button" data-k="mute" aria-label="Tắt/bật tiếng hiệu ứng">${I2}</button><button type="button" data-k="music" aria-label="Tắt/bật nhạc nền">${D2}</button>`,n.appendChild(e);const i=e.querySelector('[data-k="mute"]'),s=e.querySelector('[data-k="music"]'),r=()=>{const o=t.prefs();i.classList.toggle("off",!o.sfx),s.classList.toggle("off",!o.music)};for(const o of["touchstart","touchend","touchmove","pointerdown"])e.addEventListener(o,a=>a.stopPropagation(),{passive:!0});return e.addEventListener("mousedown",o=>{o.stopPropagation(),o.preventDefault()}),i.addEventListener("click",()=>{t.toggleSfx(),r()}),s.addEventListener("click",()=>{t.toggleMusic(),r()}),r(),{sync:r,el:e}}const ls=8;function ag(n,t,e,i,s){const r=t-n;if(r<=1||s<=n+4)return Number.NaN;const o=Math.min(1,Math.pow((s-n)/r,1/1.5)),a=e*xe(.2,.55,i);return a+o*(e-a)}function cg(n,t){const e=ze(n),i=ae.road(e);if(i<.02)return null;const s=Vn(n),r=Cn(n),o=s-ae.roadDepth(e),a=ag(lg(n),s,Zs(n),r,o);return Number.isNaN(a)?null:(t.lat=a,t.y=o,t.amount=i,t)}function lg(n){const t=Vn(n);return xe(t-xe(150,240,Cn(n))-Mo(n),Pe(n)-13,oh(n))}const F2=2.6,k2=60,ug=[];for(const n of _o.segs)n.k===0||Math.abs(n.k*n.len)<F2||ug.push({x:n.x+Math.cos(n.th)/n.k,z:n.z-Math.sin(n.th)/n.k,r:Math.abs(1/n.k)-k2,u:n.u0});function O2(n,t,e){const i=_o,s=Math.round((t+i.oz-i.bz)/i.endZ);for(let r=s-1;r<=s+1;r++)for(const o of ug){const a=r*i.endX-i.ox+o.x,c=r*i.endZ-i.oz+o.z,l=Math.hypot(n-a,t-c)/o.r;if(l>=1)continue;const u=r*Si-ii+o.u,f=Vn(u)-xe(150,240,Cn(u+300))-Mo(u+300),h=Vn(u)+70+50*(On(n/70,t/70,3,91)-.5);let d=f+(h-f)*Math.pow(1-l*l,.6)+40*(On(n/45,t/45,3,94)-.5)*(1-l);const p=(d-f)/45+.8*(On(n/90,t/90,2,93)-.5);d=xe(d,f+(Math.floor(p)+At(.55,1,p-Math.floor(p)))*45,.85),d>e&&(e=xe(e,d,1-At(.75,1,l)))}return e}const B2=128,z2=1024,pp=new Map,Sl={s:0,lat:0,dist:0},mp=new WeakMap;function H2(n,t,e){let i=mp.get(n);i||mp.set(n,i=new Map);const s=t*4096+e,r=i.get(s);if(r)return r;const o=n.segs[e],a=t*n.endX-n.ox+o.x,c=t*n.endZ-n.oz+o.z,l=Math.sin(o.th),u=Math.cos(o.th),f={x:a,z:c,s0:t*Si-ii+o.u0,len:o.len,k:o.k,th:o.th,sin:l,cos:u,cx:o.k===0?0:a+u/o.k,cz:o.k===0?0:c-l/o.k,r:o.k===0?0:Math.abs(1/o.k),sg:Math.sign(o.k),bx:t*n.endX-n.ox+o.bx,bz:t*n.endZ-n.oz+o.bz,br:o.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return gp(n,t,e,-1,f,"p",o.k===0),gp(n,t,e,1,f,"n",o.k===0),i.set(s,f),f}function G2(n,t,e,i,s){const r=i*Math.SQRT2/2,o=(t+.5)*i,a=(e+.5)*i,c=Math.round((a+n.oz-n.bz)/n.endZ);Wv(o,a,(c-3)*Si-ii,(c+4)*Si-ii,Sl,n);const l=Sl.dist+2*r+s,u=[];for(let h=c-3;h<=c+4;h++){const d=h*n.endX-n.ox,p=h*n.endZ-n.oz;if(Math.hypot(o-d-n.bx,a-p-n.bz)-n.br>l)continue;const v=n.segs.length-1;for(let g=0;g<=v;g++){const m=n.segs[g];Math.hypot(o-d-m.bx,a-p-m.bz)-m.br>l||u.push(H2(n,h,g))}}const f=h=>Math.hypot(o-h.bx,a-h.bz)-h.br;return u.sort((h,d)=>f(h)-f(d)),{far:Sl.dist-r>600,cands:u}}function gp(n,t,e,i,s,r,o){const a=n.segs.length-1;for(let c=0;c<=a;c++){e+=i,e<0?(e=a,t--):e>a&&(e=0,t++);const l=n.segs[e];if(l.k===0){if(o)continue;return}const u=t*n.endX-n.ox+l.x+Math.cos(l.th)/l.k,f=t*n.endZ-n.oz+l.z-Math.sin(l.th)/l.k;r==="p"?(s.pcx=u,s.pcz=f,s.pr=Math.abs(1/l.k)):(s.ncx=u,s.ncz=f,s.nr=Math.abs(1/l.k));return}}function vp(n,t,e,i,s,r,o){const a=Math.floor(e/s),c=Math.floor(i/s),l=(a*1000003+c)*2+r;let u=n.get(l);return u||n.set(l,u=G2(t,a,c,s,o)),u}function V2(n,t,e,i){const s=`${e}`;let r=pp.get(s);(!r||r.size>4e4)&&pp.set(s,r=new Map);const o=vp(r,i,n,t,z2,1,e);return o.far?o.cands:vp(r,i,n,t,B2,0,e).cands}const ma=30;function $h(n,t,e,i,s=_o){const r=V2(n,t,e,s);let o=1/0,a=0,c=0;for(const u of r){if(Math.hypot(n-u.bx,t-u.bz)-u.br>o+e)continue;let f,h,d=1/0;if(u.k===0){const b=n-u.x,x=t-u.z;f=b*u.sin+x*u.cos,h=b*u.cos-x*u.sin}else{const b=n-u.cx,x=t-u.cz;let S=Math.atan2(u.sg*x,-u.sg*b)-u.th;if(S-=2*Math.PI*Math.round((S-u.k*u.len/2)/(2*Math.PI)),f=S/u.k,d=Math.hypot(b,x),h=u.sg*(u.r-d),d<ma){const w=xp[c++]??={s:0,lat:0,dist:0,prom:0,core:0};w.s=u.s0+u.len/2,w.lat=0,w.dist=u.r-d,w.prom=0,w.core=1-d/ma*(d/ma)*(3-2*d/ma)}d+=u.r}if(f<-.01||f>u.len+.01)continue;const p=Math.abs(h);if(p>o+e)continue;p<o&&(o=p);const v=u.s0+Math.min(u.len,Math.max(0,f));let g=!1;for(let b=0;b<a;b++)Math.abs(i[b].s-v)<.5&&(g=!0);if(g)continue;let m=d-p;u.pr>0&&(m=Math.min(m,Math.hypot(n-u.pcx,t-u.pcz)+u.pr-p)),u.nr>0&&(m=Math.min(m,Math.hypot(n-u.ncx,t-u.ncz)+u.nr-p));const M=i[a]??={s:0,lat:0,dist:0,prom:0,core:0};M.s=v,M.lat=h,M.dist=p,M.prom=Math.max(0,m),M.core=0,a++}let l=0;for(let u=0;u<a;u++){if(i[u].dist>o+e)continue;const f=i[l],h=i[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=0,l++}for(let u=0;u<c;u++){const f=i[l++]??={s:0,lat:0,dist:0,prom:0,core:0},h=xp[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=h.core}return l}const xp=[],_p=[];function Yu(n,t,e,i){const s=$h(n,t,0,_p);for(let r=0;r<s;r++){const o=_p[r];if(o.core===0&&Math.abs(o.s-e)<=Math.abs(i)+80)return!0}return!1}const Mp=24,ic=520,Er=15,W2=14,yp=200,X2=60,Qt={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},Os={n210:()=>Number.isNaN(Qt.n210)?Qt.n210=On(Qt.x/210,Qt.z/210,3,21):Qt.n210,n700:()=>Number.isNaN(Qt.n700)?Qt.n700=On(Qt.x/700,Qt.z/700,3,5):Qt.n700,n500:()=>Number.isNaN(Qt.n500)?Qt.n500=On(Qt.x/500,Qt.z/500,2,3):Qt.n500,out:()=>Number.isNaN(Qt.out)?Qt.out=90*yf(Qt.x/800,Qt.z/800,4,7)+30*(On(Qt.x/160,Qt.z/160,3,11)-.5):Qt.out,far:()=>Number.isNaN(Qt.far)?Qt.far=250+1150*yf(Qt.x/3200,Qt.z/3200,5,9):Qt.far,n90:()=>Number.isNaN(Qt.n90)?Qt.n90=On(Qt.x/90,Qt.z/90,2,71):Qt.n90},me={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function q2(n,t){const{o:e,ty:i,w:s,sill:r,fly:o,vil:a,xd:c,ra:l,rd:u}=me,f=xe(i-xe(150,240,e)-c,o-13,r),h=Gr(c/190),d=i-f;let p;if(n<=s){const _=s*xe(.2,.55,e),S=Gr((n-_)/(s-_));p=f+d*xe(Math.pow(S,1.5),S*S*(3-2*S),e),e>0&&(p+=e*34*(Os.n210()-.35)*At(25,110,n))}else{const _=Gr((n-s)/xe(280,700,e));p=i+(xe(400,-50,e)-260*h+140*(Os.n700()-.5))*(1-(1-_)*(1-_))}const v=At(s*.9,s*1.25,n),g=At(Er+8,Er+22,n)*(1-v)*(1-e),m=xe(Mp,Mp*.5,g),M=Math.max(.7*v,.85*g)*(1-.6*h);if(M>0){const _=(p+30*(Os.n500()-.5))/m;p=xe(p,(Math.floor(_)+At(.45,1,_-Math.floor(_)))*m,M)}v>0&&(p+=v*Os.out());const b=At(s+900,s+5e3,n);if(b>0&&(p+=b*Os.far()),l>.02&&t>0){const _=i-u,S=ag(f,i,s,e,_);if(!Number.isNaN(S)){const w=l*At(S-3,S-.5,n)*(1-At(S+ls+1,S+ls+4,n));w>0&&(p=Math.min(p,xe(p,_-.4,w)))}}const x=a*(1-At(240,380,n));if(x>0&&(p=xe(p,o-Vr+1.6*(Os.n90()-.5)-.012*Math.max(0,n-40),x)),p-=6*(1-At(0,18,n))*(p<f+20?1-r:0),n<Er){const _=xe(W2+(Er-n)*2,11+(Er-n)*.3,r);p=Math.min(p,o-xe(_,Vr+.4,a))}return p}const wl=[],bp=[],Sp=new Map;function $2(n,t){const e=n*100003+t;let i=Sp.get(e);if(i!==void 0)return i;const s=(n+.2+.6*ut(n,t,61))*ic,r=(t+.2+.6*ut(n,t,62))*ic,o=70+110*ut(n,t,63),a=$h(s,r,0,bp)>0?bp[0]:null;if(!a||Cn(a.s)<.6||a.dist<o+45)i=null;else{const c=Zl(a.s);i={ox:s,oz:r,r:o,floor:c,peak:Vn(a.s)-200+230*ut(n,t,64)}}return Sp.set(e,i),i}function K2(n,t,e){const i=Math.floor(n/ic),s=Math.floor(t/ic);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=$2(i+o,s+r);if(!a)continue;const c=Math.hypot(n-a.ox,t-a.oz)/a.r;if(c>=1)continue;const l=a.floor+(a.peak-a.floor)*Math.pow(1-c*c,.6);l>e&&(e=xe(e,l,1-At(.8,1,c)))}return e}function hg(n,t,e){if(!Number.isFinite(n+t))return e.h=e.s=e.lat=e.vil=NaN,e;Qt.x=n,Qt.z=t,Qt.n210=Qt.n700=Qt.n500=Qt.out=Qt.far=Qt.n90=NaN;const i=$h(n,t,yp,wl);let s=1/0;for(let o=0;o<i;o++){const a=wl[o];a.core===0&&a.dist<s&&(s=a.dist,e.s=a.s,e.lat=a.lat)}me.o=me.ty=me.w=me.sill=me.fly=me.vil=me.xd=me.ra=me.rd=0;let r=0;for(let o=0;o<i;o++){const a=wl[o],c=(1-At(0,yp,a.dist-s))*(a.core>0?a.core:At(0,X2,a.prom)+1e-4);if(c<=0)continue;r+=c,me.o+=c*Cn(a.s),me.ty+=c*Vn(a.s),me.w+=c*Zs(a.s),me.sill+=c*oh(a.s),me.fly+=c*Pe(a.s),me.vil+=c*Hn(a.s),me.xd+=c*Mo(a.s);const l=ze(a.s);me.ra+=c*ae.road(l),me.rd+=c*ae.roadDepth(l)}return me.o/=r,me.ty/=r,me.w/=r,me.sill/=r,me.fly/=r,me.vil/=r,me.xd/=r,me.ra/=r,me.rd/=r,e.vil=me.vil,e.h=O2(n,t,K2(n,t,q2(s,e.lat))),e}const Y2={h:0,s:0,lat:0,vil:0};function Ze(n,t){return hg(n,t,Y2).h}const mc=`
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
`,ir={uPilot:{value:new de(0,0,0,1)},uHazTime:{value:0}},gc=`
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
`;function Z2(n,t,e,i){ir.uPilot.value.set(n,t,Math.sin(e),Math.cos(e)),ir.uHazTime.value=i}const J2=`
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
}`,Q2=`
#include <fog_pars_fragment>
${mc}
${lh}
#ifdef HAZARD
${gc}
#endif
uniform float uLift;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;
varying float vShade;
vec3 srgb(vec3 c) { return pow(c, vec3(2.2)); }

void main() {
  vec3 n = normalize(vNormal);
  float y = vWorld.y;
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
  float hg = uRegionHg;
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
  vec3 albedo = mix(rock, green, moss);

  // Viền nắng mép đỉnh sống đá/mỏm đá (aCrest): "sáng + ấm = đường đi qua phía trên".
  albedo = mix(albedo, srgb(vec3(1.0, 0.7, 0.32)), vCrest * (0.6 + 0.4 * gnNoise(vWorld.xz / 1.3)));

  float ndl = dot(n, ATM_SUN_DIR);
  float wrap = clamp((ndl + 0.35) / 1.35, 0.0, 1.0);
  vec3 light = ATM_SKY_AMBIENT * (0.38 + 0.3 * n.y) + ATM_SUN_LIGHT * wrap * 1.3 + ATM_BOUNCE * 0.45 * (1.0 - n.y);
  light += atmNightFill(n) * 1.1;
  // vShade: hốc lõm + mặt dưới tán đỉnh (tính lúc dựng lưới) — bóng hốc là thứ cho đá có khối và chiều sâu.
  light *= 1.0 - 0.75 * vShade;
  vec3 col = albedo * light * uLift;
  // Trời hoàng hôn tím: ánh trời thuần làm cả tháp thành màu oải hương (u03) — giảm ánh trời, tăng hắt đất ấm.
  // Mặt trời trước mặt: viền ngược nắng là thứ vẽ ra HÌNH KHỐI của tháp đá trên nền trời.
  float dist = length(cameraPosition - vWorld);
  vec3 V = (cameraPosition - vWorld) / max(dist, 0.001);
  float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0) * pow(max(dot(-V, ATM_SUN_DIR), 0.0), 2.0);
  float nightK = smoothstep(0.42, 0.95, atmT());
  col += mix(ATM_GLOW * 0.65, ATM_SKY_HORIZON_SUN * 0.2, nightK) * rim + ATM_SUN_LIGHT * vCrest * 0.35;
#ifdef HAZARD
  col += hazardRim(vWorld, pow(1.0 - max(dot(n, V), 0.0), 2.0));
#endif

  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;let j2=null,tA=null;function fg(n,t){const e=new re({vertexShader:J2,fragmentShader:Q2,defines:n?{HAZARD:1}:{},uniforms:gn.merge([lt.fog]),fog:!0});return e.uniforms.uLift=t,e.uniforms.uRegionHg=bo,n&&Object.assign(e.uniforms,ir),e}const dg={value:1};function eA(){return j2??=fg(!0,dg)}function pg(){return tA??=fg(!1,dg)}const nA=ae.archPhases,iA=1600;function sA(n,t){const e=Pe(n),i=Cn(n),s=i>.5?90+50*ut(t,1,71):Zs(n)+22,r=(i>.5?58:46)+18*ut(t,2,72),o={x:0,y:0,z:0},a=d=>Ze(ce(n,d,0,o).x,o.z)-e,c=[];for(let d=0;d<=24;d++){const p=d/24*Math.PI,v=-s*Math.cos(p),g=Math.min(a(v)-15,r),m=g+(r-g)*Math.pow(Math.sin(p),.55)+6*Math.sin(p*3+t);c.push(new P(v,m,4*Math.sin(p*2+t)))}const l=(i>.5?13:9)+4*ut(t,3,73),u=new hc(new zh(c),90,l,14,!1),f=u.getAttribute("position"),h=u.getAttribute("normal");for(let d=0;d<f.count;d++){const v=(ut(f.getX(d)*.08+t,f.getY(d)*.08+f.getZ(d)*.05,74)-.5)*l*.7;f.setXYZ(d,f.getX(d)+h.getX(d)*v,f.getY(d)+h.getY(d)*v*1.3,f.getZ(d)+h.getZ(d)*v)}return u.setAttribute("aCrest",new wt(new Float32Array(f.count),1)),u.computeVertexNormals(),u}function rA(){const n=new De,t=pg(),e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=new Set,o=Yi(s);for(let a=o;a<=o+1;a++)nA.forEach((c,l)=>{const u=a*Ge+c-oi;if(u<s-60||u>s+iA)return;const f=a*10+l;if(r.add(f),e.has(f))return;const h=new Xt(sA(u,f*1.37),t);ce(u,0,0,i),h.position.set(i.x,i.y,i.z),h.rotation.y=hn(u),h.matrixAutoUpdate=!1,h.updateMatrix(),n.add(h),e.set(f,h)});for(const[a,c]of e)r.has(a)||(n.remove(c),c.geometry.dispose(),e.delete(a))}}}const oA=5,aA=150,cA=1700,lA=300,uA=200,hA=new rr({vertexColors:!0}),fA=new rr({vertexColors:!0}),Tl=new re({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:mn});function dA(){const n=new Ht(.25,1.1,.25).translate(0,.55,0),t=n.getAttribute("position"),e=new Float32Array(t.count*3);for(let i=0;i<t.count;i++)e.set(t.getY(i)>.8?[.8,.08,.06]:[.92,.92,.88],i*3);return n.setAttribute("color",new wt(e,3)),n}const pA=dA();function mA(){const n=new De;let t=null,e=Number.NaN;const i={lat:0,y:0,amount:0},s={x:0,y:0,z:0},r=new Ot,o=a=>{const c=[],l=[],u=[],f=[],h=[],d=(_,S,w)=>(ce(_,S,w-Pe(_),s),[s.x,s.y,s.z]),p=(_,S,w,y,T,R,C)=>{_.push(...w,...y,...T,...w,...T,...R);for(let L=0;L<6;L++)S.push(...C)};let v=null,g=0;for(let _=a-aA;_<=a+cA;_+=oA,g++){const S=cg(_,i)&&i.amount>.5?{s:_,lat:i.lat,y:i.y}:null;if(v&&S){const[w,y]=[v,S],T=[.86,.85,.8],R=g%9===0?[.3,.3,.31]:[.2,.2,.22];p(c,l,d(w.s,w.lat,w.y-.6),d(y.s,y.lat,y.y-.6),d(y.s,y.lat,y.y+.85),d(w.s,w.lat,w.y+.85),T),p(c,l,d(w.s,w.lat,w.y+.85),d(y.s,y.lat,y.y+.85),d(y.s,y.lat+.45,y.y+.85),d(w.s,w.lat+.45,w.y+.85),T),p(c,l,d(w.s,w.lat+.45,w.y+.05),d(y.s,y.lat+.45,y.y+.05),d(y.s,y.lat+ls-1.2,y.y+.05),d(w.s,w.lat+ls-1.2,w.y+.05),R);const C=.45+(ls-1.65)/2;g%2===0&&p(c,l,d(w.s,w.lat+C-.12,w.y+.08),d(y.s,y.lat+C-.12,y.y+.08),d(y.s,y.lat+C+.12,y.y+.08),d(w.s,w.lat+C+.12,w.y+.08),[.95,.78,.25]);for(const L of[0,1]){const D=.45+(L===0?1.6:ls-3.4);u.push(...d(w.s,w.lat+D-.32,w.y+.9),...d(y.s,y.lat+D-.32,y.y+.9),...d(y.s,y.lat+D+.32,y.y+.9),...d(w.s,w.lat+D-.32,w.y+.9),...d(y.s,y.lat+D+.32,y.y+.9),...d(w.s,w.lat+D+.32,w.y+.9));for(const I of[w.s,y.s,y.s,w.s,y.s,w.s])f.push(I,L)}g%3===0&&h.length<uA*4&&(ce(S.s,S.lat+.2,S.y+.85-Pe(S.s),s),h.push(s.x,s.y,s.z,hn(S.s)))}v=S}if(!c.length)return null;const m=new Kt;m.setAttribute("position",new wt(new Float32Array(c),3)),m.setAttribute("color",new wt(new Float32Array(l),3)),m.computeVertexNormals();const M=new Kt;M.setAttribute("position",new wt(new Float32Array(u),3)),M.setAttribute("aTrail",new wt(new Float32Array(f),2));const b=new Be(pA,fA,Math.max(1,h.length/4));for(let _=0;_<h.length/4;_++)r.makeRotationY(h[_*4+3]).setPosition(h[_*4],h[_*4+1],h[_*4+2]),b.setMatrixAt(_,r);const x={mesh:new Xt(m,hA),trail:new Xt(M,Tl),posts:b};return x.trail.frustumCulled=!1,x.trail.renderOrder=3,x};return{group:n,update(a,c,l){Tl.uniforms.uTime.value=c,Tl.uniforms.uNight.value=Math.min(1,Math.max(0,(l-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(a-e)<lA)&&(e=a,t&&(n.remove(t.mesh,t.trail,t.posts),t.mesh.geometry.dispose(),t.trail.geometry.dispose(),t.posts.dispose()),t=o(a),t&&n.add(t.mesh,t.trail,t.posts))}}}const Jn=30,El=4,wp=18,Tp=8,Ep=24,Ap=[0,10,28,55,95,150],Rp=new re({uniforms:gn.merge([lt.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:we,fog:!0});function gA(n,t,e){const i={x:0,y:0,z:0},s=[],r=[],o=Math.ceil((t-n)/El)+1,a=(d,p)=>.92+.32*ut(d*.02,p*4,e)+.14*ut(d*.11,p*13,e+1);for(let d=0;d<o;d++){const p=n+d*El;for(let v=0;v<=Jn;v++){const g=v/Jn,m=g*Math.PI*2,M=a(p,g);ce(p,wp*M*Math.cos(m),Tp+Ep*M*Math.sin(m),i),s.push(i.x,i.y,i.z),r.push(p,g,Math.min(p-n,t-p))}}const c=[];for(let d=0;d<o-1;d++)for(let p=0;p<Jn;p++){const v=d*(Jn+1)+p,g=v+Jn+1;c.push(v,v+1,g,g,v+1,g+1)}const l=new Kt;l.setAttribute("position",new wt(new Float32Array(s),3)),l.setAttribute("aCave",new wt(new Float32Array(r),3)),l.setIndex(c);const u=[],f=[];for(const[d,p]of[[n,-1],[t,1]]){const v=u.length/3;Ap.forEach((g,m)=>{for(let M=0;M<=Jn;M++){const b=M/Jn,x=b*Math.PI*2,_=a(d,b),S=m?.25*g*(ut(b*9,m,e+5)-.5):0,w=Math.max(-16,Tp+(Ep*_+g+S)*Math.sin(x));ce(d-p*(g*.35+(m?3*ut(b*13,m,e+9):0)),(wp*_+g+S)*Math.cos(x),w,i),u.push(i.x,i.y,i.z)}});for(let g=0;g<Ap.length-1;g++)for(let m=0;m<Jn;m++){const M=v+g*(Jn+1)+m,b=M+Jn+1;f.push(M,b,M+1,M+1,b,b+1)}}for(let d=0;d<o;d+=2){const p=n+d*El,v=u.length/3;for(let g=0;g<=16;g++){const m=-110+220*g/16,M=Math.abs(m)/110,b=58+150*M*M+30*(ut(p*.015,m*.03,e+3)-.5);ce(p,m,b,i),u.push(i.x,i.y,i.z)}if(d+2<o)for(let g=0;g<16;g++)f.push(v+g,v+17+g,v+g+1,v+g+1,v+17+g,v+18+g)}const h=new Kt;return h.setAttribute("position",new wt(new Float32Array(u),3)),h.setIndex(f),h.computeVertexNormals(),{tube:l,portals:h}}function vA(){const n=new De,t=new Map,e=pg(),i=e.clone();return i.uniforms=e.uniforms,i.side=we,{group:n,update(s,r){if(Rp.uniforms.uTime.value=r,!ae.caves.length)return;const o=new Set,a=Yi(s);for(let c=a-1;c<=a+1;c++)ae.caves.forEach(([l,u],f)=>{const h=c*Ge+l-oi,d=c*Ge+u-oi;if(d<s-200||h>s+2200)return;const p=c*8+f;if(o.add(p),t.has(p))return;const v=gA(h,d,(c*7+f)%97),g=[new Xt(v.tube,Rp),new Xt(v.portals,i)];for(const m of g)m.frustumCulled=!1,m.matrixAutoUpdate=!1,n.add(m);t.set(p,g)});for(const[c,l]of t)if(!o.has(c)){for(const u of l)n.remove(u),u.geometry.dispose();t.delete(c)}}}}function hi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Kt;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const f=[];for(let h=0;h<n.length;++h){const d=n[h].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+u);u+=n[h].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Cp(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][h]);const p=Cp(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function Cp(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new wt(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let h=0,d=u.count;h<d;h++)for(let p=0;p<e;p++){const v=u.getComponent(h,p);a.setComponent(h+f,p,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function Pp(n,t){if(t===v_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(t===Fu||t===h0){let e=n.getIndex();if(e===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);n.setIndex(r),e=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=e.count-2,s=[];if(t===Fu)for(let r=1;r<=i;r++)s.push(e.getX(0)),s.push(e.getX(r)),s.push(e.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(e.getX(r)),s.push(e.getX(r+1)),s.push(e.getX(r+2))):(s.push(e.getX(r+2)),s.push(e.getX(r+1)),s.push(e.getX(r)));return s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),n}const Al=140,Lp=24,xA=2400;function ga(n,t){const e=n.getAttribute("position").count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set(t,s*3);return n.setAttribute("color",new wt(i,3)),n.deleteAttribute("uv"),n}function _A(){return hi([ga(new Ht(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),ga(new Ht(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),ga(new Ht(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),ga(new Ht(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function MA(){const n=new Be(_A(),new rr({vertexColors:!0}),Lp);n.frustumCulled=!1,n.count=0;const t=new Ot,e={x:0,y:0,z:0};let i=Number.NaN;return{mesh:n,update(s){const r=Math.floor((s-100)/Al);if(r===i)return;i=r;let o=0;for(let a=r;o<Lp&&a*Al<s+xA;a++){const c=a*Al+37*Math.sin(a*1.7);if(Mo(c)<120)continue;const l=3*Math.sin(c/140)+2.5*Math.sin(c/47+1.7)+(a%2?7:-7),u=lg(c);ce(c,l,0,e),t.makeRotationY(hn(c)+(a%3===0?Math.PI:0)+.15*Math.sin(a)).setPosition(e.x,u+.1,e.z),n.setMatrixAt(o++,t)}n.count=o,n.visible=o>0,n.instanceMatrix.needsUpdate=!0}}}const yA=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`;function vc(n){const t=new rr({vertexColors:!0,side:n.doubleSide?we:Ai});return t.onBeforeCompile=e=>{e.uniforms.uLift=n.lift,n.hazard&&Object.assign(e.uniforms,ir),e.fragmentShader=`uniform float uLift;
${n.hazard?gc:""}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${n.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${n.rim.toFixed(3)} * uLift;
    ${n.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${n.windows?yA:""}
  }
  #endif`)},t.customProgramCacheKey=()=>`backlit-${n.selfLit}-${n.rim}-${n.doubleSide?2:1}-${n.hazard?"h":""}${n.windows?"w":""}`,t}const bA=4,SA=.026,wA=7,TA=.035;function EA(n,t){const e=new Float32Array(t*16),i=new Float32Array(t*3),s=new Float32Array(t*4);n.instanceColor||(n.instanceColor=new co(new Float32Array(t*3).fill(1),3)),n.instanceMatrix.setUsage(Of),n.instanceColor.setUsage(Of);const r=n.geometry;r.boundingSphere||r.computeBoundingSphere();const o=r.boundingSphere,a=new P,c=new Pn;let l=0;return{clear:()=>{l=0},add(u,f){l>=t||(u.toArray(e,l*16),f.toArray(i,l*3),a.copy(o.center).applyMatrix4(u),a.toArray(s,l*4),s[l*4+3]=o.radius*u.getMaxScaleOnAxis(),l++)},flush(u,f){const h=n.instanceMatrix.array,d=n.instanceColor.array;let p=0;for(let v=0;v<l;v++)c.center.fromArray(s,v*4),c.radius=s[v*4+3]+wA+TA*c.center.distanceTo(f),u.intersectsSphere(c)&&(h.set(e.subarray(v*16,v*16+16),p*16),d.set(i.subarray(v*3,v*3+3),p*3),p++);if(n.count=p,p!==0)for(const v of[n.instanceMatrix,n.instanceColor])v.clearUpdateRanges(),v.addUpdateRange(0,p*v.itemSize),v.needsUpdate=!0}}}function AA(n,t){const e=n.elements,i=t.elements;return Math.abs(e[0]/i[0]-1)<.015&&Math.abs(e[5]/i[5]-1)<.015&&Math.abs(e[8]-i[8])<.01&&Math.abs(e[9]-i[9])<.01}function RA(){const n=new wo,t=new Ot,e=new P,i=new P(Number.NaN,0,0),s=new Ae,r=new Ae,o=new Ot;return{frustum:n,eye:e,due(a,c){a.updateMatrixWorld(),a.getWorldPosition(e),a.getWorldQuaternion(s);const l=!(e.distanceTo(i)<=bA);return!c&&!l&&s.angleTo(r)<=SA&&AA(a.projectionMatrix,o)?!1:(i.copy(e),r.copy(s),o.copy(a.projectionMatrix),n.setFromProjectionMatrix(t.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse)),!0)}}}function hs(n,t,e,i,s){const r=n.getAttribute("position"),o=new Float32Array(r.count*3);for(let a=0;a<r.count;a++){const c=Math.min(1,Math.max(0,(r.getY(a)-i)/(s-i))),l=.85+.3*ut(r.getX(a)*.7,r.getZ(a)*.7+r.getY(a),5);for(let u=0;u<3;u++)o[a*3+u]=Math.pow(t[u]+(e[u]-t[u])*c*c,2.2)*l}return n.setAttribute("color",new wt(o,3)),n}function Kh(n,t,e){const i=n.getAttribute("position");for(let s=0;s<i.count;s++){const r=i.getX(s),o=i.getY(s),a=i.getZ(s),c=(ut(r*1.3+e,a*1.3,9)-.5)*t;i.setXYZ(s,r*(1+c),o+c*.6,a*(1+c))}return n.computeVertexNormals(),n}function mg(){const n=[new Je(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([i,s,r],o)=>n.push(Kh(new To(i,s,7,1).toNonIndexed().translate(0,r+s/2,0),.25,o)));const e=hi(n.map(i=>i.index?i.toNonIndexed():i));return e.computeVertexNormals(),hs(e,[.05,.12,.07],[.42,.52,.2],1,14)}function gg(){const n=[new Je(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([i,s,r,o,a],c)=>n.push(Kh(new _s(o,a).translate(i,s,r),.35,c*3)));const e=hi(n);return e.computeVertexNormals(),hs(e,[.07,.13,.05],[.62,.6,.18],3,13)}function CA(){const n=[new Je(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,i,s]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])n.push(new To(e,i,5,1).toNonIndexed().translate(0,s+i/2,0));const t=hi(n);return t.computeVertexNormals(),hs(t,[.05,.12,.07],[.42,.52,.2],1,14)}function PA(){const n=[new Je(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,i,s,r,o]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])n.push(Kh(new _s(r,0).translate(e,i,s),.35,o*3));const t=hi(n);return t.computeVertexNormals(),hs(t,[.07,.13,.05],[.62,.6,.18],3,13)}function LA(){const n=[];for(const[i,s]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])n.push(new Ht(.4,3,.4).translate(i,1.5,s).toNonIndexed());n.push(hs(new Ht(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const t=new To(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();n.push(hs(t,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const i of n)i.getAttribute("color")||hs(i,[.22,.15,.09],[.3,.2,.12],0,3);const e=hi(n);return e.computeVertexNormals(),e}function NA(){const n=[];for(const t of[-2.4,0,2.4])n.push(new Ht(1.1,1,.1).translate(t,4.8,2.85).toNonIndexed()),n.push(new Ht(1.1,1,.1).translate(t,4.8,-2.85).toNonIndexed());return hi(n)}const Zu=250,IA=40,Ar=1,vg=650,wn={x:0,y:0,z:0},Rl={lat:0,y:0,amount:0};function Np(n,t){return Math.hypot(Ze(n+3,t)-Ze(n-3,t),Ze(n,t+3)-Ze(n,t-3))/6}function DA(n,t){const e=[],i=[],s=So()>.5,r=s?Math.round(t*.6):t,o=s?1.1:3.2;for(let a=0;a<vg*2.2&&e.length<r;a++){const c=(n+ut(a*.71,n,41))*Zu,l=ut(n,a*.37,42)<.5?-1:1,u=Zs(c),f=Math.pow(ut(a*.53,n*1.7,43),2.6)*(240+560*Cn(c)),h=Math.max(u*.7,17)+f;ce(c,l*h,0,wn);const d=wn.x,p=wn.z;if(!Yu(d,p,c,h))continue;const v=Ze(d,p),g=Pe(c);if(h<24&&v>g-(oh(c)>.5?12:22)||Np(d,p)>o||v<g-200||s&&l>0&&cg(c,Rl)&&h>Rl.lat-5&&h<Rl.lat+ls+6)continue;const m=.7+.9*ut(a,n*3.1,44);e.push({p:new P(d,v-.5,p),s:m,r:ut(a,n,45)*6.28,kind:ut(d/90,p/90,46)<.55?0:1})}for(let a=0;a<40&&i.length<7;a++){const c=(n+ut(a*1.31,n,51))*Zu,l=ut(n,a*.91,52)<.5?-1:1,u=Math.max(Zs(c)*.7,30)+ut(a,n*2.3,53)*220;if(ce(c,l*u,0,wn),!Yu(wn.x,wn.z,c,u))continue;const f=Ze(wn.x,wn.z);Np(wn.x,wn.z)>.45||f>Pe(c)-18||i.push({p:new P(wn.x,f,wn.z),s:1,r:hn(c)-l*(Math.PI/2)+(ut(a,n,54)-.5),kind:0})}return{trees:e,houses:i}}const Yh={value:1},UA=vc({lift:Yh,selfLit:.2,rim:.85}),Zh=vc({lift:Yh,selfLit:.2,rim:.85});function Bs(n,t,e=!1){const i=e?new rn({color:"#ffb35a"}):UA,s=new Be(n,i,t);return s.count=0,s.frustumCulled=!1,s}function FA(n){const t=n.ahead,e=Math.round(vg*n.density),i=e*(Ar+t+1),s=new De,r=Bs(mg(),i),o=Bs(gg(),i),a=Bs(CA(),i),c=Bs(PA(),i),l=Bs(LA(),8*(Ar+t+1)),u=Bs(NA(),8*(Ar+t+1),!0);s.add(r,o,a,c,l,u);const f=[r,o,a,c].map(w=>EA(w,i)),h=RA();let d=!0;const p=new Map;let v=Number.NaN;const g=new Ot,m=new Ae,M=new P(0,1,0),b=new P,x=new ct,_=new ct,S=()=>{f.forEach(y=>y.clear());let w=0;for(let y=v;y<=v+Ar+t;y++){let T=p.get(y);T||p.set(y,T=DA(y,e));const R=y-v>n.near-1?2:0;for(const C of T.trees){m.setFromAxisAngle(M,C.r),g.compose(C.p,m,b.set(C.s,C.s*(.9+.25*Math.sin(C.r*3)),C.s));const L=So();x.setHSL(.22-.05*L+.06*Math.sin(C.r*5),.25,.5-.07*L+.12*Math.cos(C.r*7)),f[R+C.kind].add(g,x.multiplyScalar(2))}for(const C of T.houses)m.setFromAxisAngle(M,C.r),g.compose(C.p,m,b.set(1,1,1)),l.setMatrixAt(w,g),u.setMatrixAt(w++,g)}for(const y of[...p.keys()])(y<v-1||y>v+Ar+t+1)&&p.delete(y);l.count=w,u.count=w;for(const y of[l,u])y.instanceMatrix.needsUpdate=!0;d=!0};return{group:s,update(w,y,T){const R=Math.floor((w-IA)/Zu);if(R!==v&&(v=R,S()),h.due(T,d)){for(const C of f)C.flush(h.frustum,h.eye);d=!1}Yh.value=1-.55*Math.min(1,Math.max(0,(y-.4)/.5)),u.material.color.copy(_.set("#ffb35a").multiplyScalar(.25+3.2*y*y))}}}const Jh=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2],Ro=[.8,.3,.16],xg=[.6,.32,.22],Qh=[.9,.76,.45],_g=[.88,.84,.76],kA=[.2,.45,.36],jh=[.45,.25,.14],Mg=[.58,.33,.24];function jt(n,t,e=.1,i=1){const s=n.index?n.toNonIndexed():n;s.deleteAttribute("uv"),s.getAttribute("normal")||s.computeVertexNormals();const r=s.getAttribute("position"),o=new Float32Array(r.count*3),a=Jh(t);for(let c=0;c<r.count;c++){const l=1-e/2+e*ut(r.getX(c)*.8+i,r.getY(c)*.8+r.getZ(c)*.6,17);for(let u=0;u<3;u++)o[c*3+u]=a[u]*l}return s.setAttribute("color",new wt(o,3)),s}const qn=n=>hi(n);function go(n,t,e,i){const s=n.getAttribute("position"),r=n.getAttribute("color");for(let o=0;o<s.count;o++){const a=i+(1-i)*Math.min(1,Math.max(0,(s.getY(o)-t)/(e-t)));r.setXYZ(o,r.getX(o)*a,r.getY(o)*a,r.getZ(o)*a)}return n}const yg=[1,.7,.32];function xc(n,t,e,i,s=0,r=[.55,.2,.12]){const o=[],a=Math.max(6,Math.round(n/.45)),c=Math.max(4,Math.round(Math.hypot(t,e)/.42)),l=Jh(i);for(const u of[-1,1]){const f=[],h=[],d=[];for(let v=0;v<=c;v++){const g=v/c;for(let m=0;m<=a;m++){const M=(m/a-.5)*n,b=Math.pow(Math.abs(M)/(n/2),5);f.push(M,e*(1-g)+s*b*(.35+.65*g),u*t*g*(1+.06*b));const x=(m%2?1:.72)*(v%2?1:.88)*(.8+.35*ut(M*.3,g*4+u,23));h.push(l[0]*x,l[1]*x,l[2]*x)}}for(let v=0;v<c;v++)for(let g=0;g<a;g++){const m=v*(a+1)+g;u>0?d.push(m,m+a+1,m+1,m+1,m+a+1,m+a+2):d.push(m,m+1,m+a+1,m+1,m+a+2,m+a+1)}const p=new Kt;p.setAttribute("position",new wt(new Float32Array(f),3)),p.setAttribute("color",new wt(new Float32Array(h),3)),p.setIndex(d),p.computeVertexNormals(),o.push(p.toNonIndexed())}return o.push(jt(new Ht(n+.3,.32,.42).translate(0,e+.05,0),r,.05)),qn(o)}function OA(n,t,e,i,s){const r=t/2,o=[];for(const c of[-1,1]){const l=c*n/2;c>0?o.push(l,e,-r,l,e+i,0,l,e,r):o.push(l,e,-r,l,e,r,l,e+i,0)}const a=new Kt;return a.setAttribute("position",new wt(new Float32Array(o),3)),a.computeVertexNormals(),jt(a,s,.08)}function BA(n,t,e,i=Ro){const r=t-4.4-.25,o=[xc(n,3.8,4.4,i,2.2,yg).translate(0,r,0)];for(let a=-n/2+2;a<=n/2-2;a+=3.2)for(const c of[-2.6,2.6])o.push(jt(new Je(.26,.3,r-e+6,6).translate(a,(r+e-6)/2,c),jh,.15,a));return o.push(jt(new Ht(n-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),qn(o)}function zA(n,t={pillar:Mg,wall:Qh,tile:Ro}){const e=[];for(const i of[-1,1])e.push(jt(new Ht(2.4,7-n+6,2.4).translate(i*11.2,(7+n-6)/2,0),t.pillar,.2,i)),e.push(jt(new Ht(3,.5,3).translate(i*11.2,7.2,0),[.85,.8,.7],.08,i));return e.push(jt(new Ht(22.4,1.6,1.6).translate(0,-.2,0),jh,.12)),e.push(jt(new Ht(20,3.6,1.1).translate(0,2.4,0),t.wall,.1)),e.push(jt(new Ht(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(jt(new Ht(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(xc(27,2.2,4.4,t.tile,1.6).translate(0,5.3,0)),qn(e)}function HA(){const n=[go(jt(new Ht(.4,3.2,10).translate(0,0,0),Mg,.22),-1.6,.6,.62),xc(10.2,.45,.35,Ro).rotateY(Math.PI/2).translate(0,1.6,0)];for(let t=-5;t<=5;t+=2.5)n.push(go(jt(new Ht(.7,3.7,.7).translate(0,.25,t),[.5,.27,.2],.15,t),-1.6,.6,.6)),n.push(jt(new Ht(.86,.26,.86).translate(0,2.2,t),[.9,.88,.82],.06,t));return qn(n)}const GA={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function bg(n=GA){const t=[jt(new Je(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),n.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([i,s,r,o],a)=>{const c=new _s(o,1).scale(1.15,.62,1.15).translate(i,s,r);c.deleteAttribute("uv"),c.computeVertexNormals();const l=c.getAttribute("position"),u=c.getAttribute("normal"),f=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const d=ut(l.getX(h)*.9+a,l.getZ(h)*.9,l.getY(h)+31),p=u.getY(h)+(d-.5)*.7,v=p<-.05?n.under[0]:p<.12?n.under[1]:d<.6?n.flower[0]:n.flower[1],g=Jh(v),m=.75+.35*Math.min(1,Math.max(0,(l.getY(h)-4.5)/4));f.set([g[0]*m,g[1]*m,g[2]*m],h*3)}c.setAttribute("color",new wt(f,3)),t.push(c)}),qn(t)}const VA=2600,Sg=[.6,.58,.55],WA=[.3,.29,.31];function XA(){const n=(t,e,i,s)=>go(jt(new us(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,i/e,1).translate(t,-4,0),[.42,.6,.28],.14,s),-4,i,.7);return qn([n(-62,70,62,11),n(62,64,56,12)])}function qA(){return qn([jt(new Ht(5,1.2,3).translate(0,.6,0),Sg,.1,21),jt(new Ht(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),jt(new Je(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function $A(){const n=(e,i,s,r,o,a)=>[jt(new Ht(e,s,i).translate(r,s/2,o),[.7,.62,.5],.08,a),jt(new Je(.01,i*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(r,s+i*.17,o),WA,.08,a+1)],t=(e,i,s,r,o)=>jt(new Ht(e,4,i).translate(s,2,r),Sg,.12,o);return qn([t(64,1.6,0,-22,31),t(64,1.6,0,22,32),t(1.6,44,-32,0,33),t(1.6,44,32,0,34),...n(30,12,11,0,8,35),...n(22,9,7,-14,-10,37),...n(22,9,7,14,-10,39)])}const Ip={"nui-doi":{geo:XA,scale:1},"bia-ma-pi-leng":{geo:qA,scale:2.2},"dinh-vua-meo":{geo:$A,scale:1.4}};function KA(){const n=new De,t=new Map,e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=ae.landmarks;if(!r?.length)return;const o=new Set,a=Yi(s);for(let c=a-1;c<=a+1;c++)r.forEach((l,u)=>{const f=c*Ge+l.phase-oi;if(f<s-300||f>s+VA)return;const h=c*16+u;if(o.add(h),e.has(h))return;let d=t.get(l.kind);d||t.set(l.kind,d=Ip[l.kind].geo());const p=new Xt(d,Zh);ce(f,l.lat,0,i),p.position.set(i.x,Ze(i.x,i.z),i.z),p.rotation.y=hn(f)+(l.turn??0),p.scale.setScalar(Ip[l.kind].scale),p.matrixAutoUpdate=!1,p.updateMatrix(),n.add(p),e.set(h,p)});for(const[c,l]of e)o.has(c)||(n.remove(l),e.delete(c))}}}const wg={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},Tg=.18;function Cl(n,t,e,i=0){const[s,r,o,a]=wg[n],c=Math.min(1,Math.max(0,t));return c<.5?e.set(s).lerp(new ct(r),c*2):e.set(r).lerp(new ct(o),(c-.5)*2),i>0?e.lerp(new ct(a),Math.min(1,i)):e}function YA(n,t,e=0){const i=n.y+(-.07-n.y)*Math.min(1,Math.max(0,t)*1.25)+Tg*e,s=Math.hypot(n.x,i,n.z);return{x:n.x/s,y:i/s,z:n.z/s}}const Pl=900,ZA=15e-6,JA=14e-5;function QA(n){const t=new ct(n);return`vec3(${t.r.toFixed(4)}, ${t.g.toFixed(4)}, ${t.b.toFixed(4)})`}function jA(){return Object.entries(wg).map(([n,t])=>`#define ATM_${n.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${t.map(QA).join(", ")})`).join(`
`)}function Eg(n,t="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${t})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${jA()}
#define ATM_SUN_DIR normalize(vec3(${n.x.toFixed(5)}, mix(${n.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${Tg.toFixed(3)} * atmMorn(), ${n.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${Pl.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${Pl.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${Pl.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${ZA.toExponential(3)} + density * avg);
}
`}function t3(n,t){qt.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,qt.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,qt.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${Eg(t)}
#endif`,qt.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,n.fog=new Ch(new ct(0,0,0),JA)}function e3(n,t,e=0){n.fog.color.setRGB(t,e,0)}const n3=`
#include <fog_pars_vertex>
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,i3=`
#include <fog_pars_fragment>
${mc}
uniform float uTime;
uniform float uCover;
uniform vec2 uFwd;
varying vec3 vWorld;
void main() {
  vec2 p = vWorld.xz / 260.0 + vec2(uTime * 0.004, uTime * 0.002);
  // fbm ở đây trung bình 0,5, lệch chuẩn chỉ ~0,1 — nên uCover là NGƯỠNG trực tiếp (0,5 ≈ phủ một nửa,
  // 0,6 ≈ phủ ~15%), không phải tỉ lệ phủ. Bản đầu coi là tỉ lệ → ngưỡng 0,4 → mây phủ kín thành sàn đặc (t06).
  // Tầng gợn nhỏ (~24 m) chỉ khi ở gần: cú lao đưa người bay xuống 20 m trên nóc mây, nhiễu 260 m một mình thì
  // nóc mây thành tấm nhựa hồng phẳng lì (v01-p1420).
  float camD = length(vWorld - cameraPosition);
  float camNear = 1.0 - smoothstep(150.0, 600.0, camD);
  // Gần camera (< ~320 m): tầng gợn mạnh hơn + NGƯỠNG nâng lên → mặt mây VỠ thành cụm có lỗ thủng thấy ruộng/sông bên
  // dưới (anh Đức duyệt 01/11 đổi quyết định 26/10 "mây đặc dưới bụng": 6 vòng chấm đều bắt tấm mây hồng che ~60% khung
  // cú lao). Xa vẫn là biển mây liền — thước đo độ cao giữ nguyên.
  float camHole = 1.0 - smoothstep(60.0, 320.0, camD);
  float n = (gnFbm(p) + 0.35 * gnFbm(p * 3.1 + 7.0) + (0.22 + 0.2 * camHole) * camNear * (gnFbm(p * 11.0 + 3.0) - 0.5)) / 1.35;
  float cover = uCover + 0.05 * camHole;
  float dens = smoothstep(cover, cover + 0.1, n);
  // Hành lang thưa dọc hướng nhìn (01/11 — fresh-eyes: cú lao n-2150/n-2450 mây trắng phủ 40–60% khung): mây dưới
  // bụng vẫn còn (quyết định 26/10), nhưng dải 30–450 m phía trước quanh trục nhìn mỏng còn ~40% → lộ ruộng/sông
  // bên dưới như khe hở mây X4, khung có lớp thay vì một tấm sơn tím.
  vec2 rel = vWorld.xz - cameraPosition.xz;
  float along = dot(rel, uFwd);
  float lat = abs(rel.x * uFwd.y - rel.y * uFwd.x);
  float lane = smoothstep(20.0, 60.0, along) * (1.0 - smoothstep(380.0, 520.0, along)) * (1.0 - smoothstep(45.0, 110.0, lat));
  dens *= 1.0 - 0.6 * lane;
  if (dens < 0.01) discard;
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
  vec3 nrm = normalize(vec3(-(gnFbm(p + vec2(e, 0.0)) - f0) / e * 0.35, 1.0, -(gnFbm(p + vec2(0.0, e)) - f0) / e * 0.35));
  float wrap = clamp((dot(nrm, ATM_SUN_DIR) + 0.4) / 1.4, 0.0, 1.0);
#endif
  // Mặt khuất tối hơn (×0,55 thay ×0,8): mây khuất nắng sáng ngang mặt được nắng thì thành tấm trắng phẳng.
  vec3 shade = ATM_SKY_AMBIENT * 0.55 + ATM_BOUNCE * 0.2;
  vec3 sunlit = ATM_SUN_LIGHT * 1.2 + ATM_GLOW * 0.25;
  vec3 lit = mix(shade, sunlit, wrap * (0.45 + 0.55 * body));
  // Độ đục theo ĐƯỜNG NHÌN XUYÊN lớp mây: nhìn sượt (xa, gần chân trời) tia đi qua nhiều mây → đặc ~0,88; nhìn dốc
  // xuống (mép dưới khung, ngay dưới bụng) tia đi qua lớp mỏng → còn ~0,35, thấy thung lũng qua làn mây. Bản cũ alpha
  // đều 0,88 mọi góc → tấm sơn hồng phẳng che nửa dưới khung.
  float steep = abs(vWorld.y - cameraPosition.y) / max(camD, 1.0);
  float alpha = 1.0 - exp(-0.32 * dens / max(steep, 0.15));
  gl_FragColor = vec4(lit, alpha * smoothstep(12.0, 70.0, camD));
  #include <fog_fragment>
}`;function s3(n){const t=new P,e=new re({vertexShader:n3,fragmentShader:i3,defines:n?{CLOUD_LITE:1}:{},uniforms:gn.merge([lt.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new ot(0,1)}}]),transparent:!0,depthWrite:!1,fog:!0}),i=new Xt(new Wn(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return i.frustumCulled=!1,i.renderOrder=1,{mesh:i,update(s,r,o){const a=s.position;s.getWorldDirection(t),e.uniforms.uFwd.value.set(t.x,t.z).normalize();const c=o+250,l=Cn(c);i.position.set(a.x,Zl(c)+20+(Vn(c)-170-Zl(c)-20)*l,a.z),e.uniforms.uTime.value=r,e.uniforms.uCover.value=.62-.1*l+.5*(1-ae.cloud(ze(c)))}}}const Dp=120,Ag=30,Rg=7,r3=Rg*(Ag+2);function o3(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");for(let i=0;i<18;i++){const s=30+34*ut(i,4,7),r=128+(ut(i*1.7,1,3)-.5)*(240-2*s-20),o=140+(ut(1,i*2.3,5)-.5)*60-(s-30)*.6,a=t.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.fillRect(0,0,256,256)}const e=new Uh(n);return e.colorSpace=He,e}const a3=`
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
}`,c3=`
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
}`;function l3(n){const t=Math.max(10,Math.round(Ag*n)),e=new re({vertexShader:a3,fragmentShader:c3,uniforms:gn.merge([lt.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:we,fog:!0});e.uniforms.uMap.value=o3();const i=new Be(new Wn(1,1),e,r3);i.frustumCulled=!1,i.count=0;const s=new Ot,r=new Ae,o=new P,a=new P;let c=Number.NaN;return{mesh:i,update(l){const u=Math.floor(l/Dp)-1;if(u===c)return;c=u;let f=0;for(let h=u;h<u+t+2;h++)for(let d=0;d<Rg;d++){const p=(h+ut(d*.7,h,91))*Dp,v=Cn(p),g=ut(h,d*1.3,92)<.5?-1:1,m=ut(d,h*1.9,93);let M,b,x;if(d<2)x=12+14*m,M=g*(16+x*.5+m*30*v),b=Pe(p)-10+ut(h,d,94)*12+16*Hn(p);else{if(v<.5||d>3)continue;M=g*(120+m*500),b=Vn(p)-210-ut(h,d,95)*60,x=60+80*m}ce(p,M,0,o),Yu(o.x,o.z,p,M)&&(s.compose(o.set(o.x,b,o.z),r,a.set(x*1.6,x*.75,1)),i.setMatrixAt(f++,s))}i.count=f,i.instanceMatrix.needsUpdate=!0}}}const u3=`
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
}`,h3=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function tf(n,t={}){const e=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*4),r=new Kt;r.setAttribute("position",new wt(e,3)),r.setAttribute("aSize",new wt(i,1)),r.setAttribute("aColor",new wt(s,4));const o=new re({vertexShader:u3,fragmentShader:h3,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:t.core??2.4}},transparent:!0,depthWrite:!1,blending:mn}),a=new ja(r,o);return a.frustumCulled=!1,a.renderOrder=4,{points:a,set(c,l,u,f,h,d,p,v,g){e[c*3]=l,e[c*3+1]=u,e[c*3+2]=f,i[c]=h,s[c*4]=d,s[c*4+1]=p,s[c*4+2]=v,s[c*4+3]=g},commit(c){r.setDrawRange(0,c);for(const l of["position","aSize","aColor"])r.getAttribute(l).needsUpdate=!0},setViewport(c,l){o.uniforms.uScale.value=c/(2*Math.tan(l*Math.PI/360)),t.maxFrac&&(o.uniforms.uMaxPx.value=Math.max(4,c*t.maxFrac))}}}const Bi=5,Ll=3,f3=.08,d3=3,p3=new ct("#ffd27a"),m3=new ct("#9b8cff");function g3(){const n={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},t=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new Kt;return e.setAttribute("position",new Zt(t.flat().flatMap(i=>n[i]),3)),e}function v3(){const n=new rn({color:"#ffffff",blending:mn,transparent:!0,depthWrite:!1,side:we,fog:!1}),t=new Be(g3(),n,Bi);t.frustumCulled=!1,t.count=0;const e=tf(Bi*(Ll+1),{maxFrac:.025,core:1.1}),i={z:0,x:0,v:0,ended:!1,after:0},s=new De;s.add(t,e.points);const r=Array.from({length:Bi},()=>new P),o=new Array(Bi).fill(0),a=new Array(Bi).fill(0),c=new Array(Bi).fill(0),l=new Array(Bi).fill(0),u=new Ot,f=new Ae,h=new ci(0,0,0,"YXZ"),d=new P,p={x:0,y:0,z:0},v=new P(1.25,1.25,1.25),g=new ct,m={group:s,setViewport:(M,b)=>e.setViewport(M,b),heads:r,alphas:o,owner:a,count:0,mode:"on",update(M,b,x,_,S){let w=0,y=0;const T=m.mode==="off"?[]:M.slice(0,Bi),R=rg(T),C=new Set(T.map((D,I)=>[Math.abs(D.at.z-b.z),I]).filter(([,D])=>qu(D,b.z,R)>0).sort((D,I)=>D[0]-I[0]).slice(0,d3).map(([,D])=>D)),L=m.mode==="dim"?.5:1;T.forEach((D,I)=>{const{z:B,x:H,v:W,ended:j,after:O}=D.at,$=B-b.z,Q=_>0?(H-c[I])/_:0;if(c[I]=H,l[I]+=(Math.max(-.8,Math.min(.8,Q*.03))-l[I])*Math.min(1,_*10),$<-4)return;ce(B,H,W,d);const _t=j&&D.run.crash?O/.8:j?1:0,ft=Math.abs($)<10&&Math.abs(H-b.x)<3.2&&Math.abs(W-b.v)<3?.25:1,St=1-Math.min(1,Math.max(0,(Math.abs($)-220)/80)),Nt=Math.min(1,($+4)/4),zt=.15+.85*Math.min(1,Math.max(0,(d.distanceTo(S)-9)/6)),X=(D.self?.45:.3)*L*qu(I,b.z,R)*ft*St*Nt*zt*Math.max(0,1-_t);if(!(X<=.01)){h.set(-Math.atan(wi(B))+(j?O*9:0),hn(B),l[I]+(j?O*13:0)),u.compose(d,f.setFromEuler(h),v),t.setMatrixAt(w,u),g.copy(D.self?p3:m3),C.has(I)&&e.set(y++,d.x,d.y,d.z,2.5,g.r,g.g,g.b,X*.9);for(let Y=1;Y<=Ll&&!j&&L===1&&C.has(I);Y++){ig(D.track,x-Y*f3,i),ce(i.z,i.x,i.v,p);const yt=1-Y/(Ll+1);e.set(y++,p.x,p.y,p.z,1.8*yt,g.r,g.g,g.b,X*.55*yt)}t.setColorAt(w,g.multiplyScalar(X*1.6)),r[w].set(d.x,d.y+1.6,d.z),o[w]=X,a[w]=I,w++}}),t.count=w,e.commit(y),m.count=w,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}};return m}function x3(){const n=new P0;for(let t=0;t<10;t++){const e=t%2?.11:.28,i=t/10*Math.PI*2+Math.PI/2;t?n.lineTo(Math.cos(i)*e,Math.sin(i)*e):n.moveTo(Math.cos(i)*e,Math.sin(i)*e)}return new Gh(n)}function _3(){const n=new rn({color:new ct("#ffd76a").multiplyScalar(2.2),blending:mn,transparent:!0,depthWrite:!1,fog:!1}),t=new Be(x3(),n,3);t.frustumCulled=!1,t.count=0;const e=new Ot,i=new P,s=new P,r=new Ae;return{mesh:t,update(o,a,c,l){if(a<=0){t.count=0;return}const u=Math.min(1,a*3);l.getWorldQuaternion(r);for(let f=0;f<3;f++){const h=c*6+f*Math.PI*2/3;i.set(o.x+Math.cos(h)*.8,o.y+.9+Math.sin(h*2)*.1,o.z+.45+Math.sin(h)*.5),s.setScalar(u*(1+.25*Math.sin(c*14+f*2))),e.compose(i,r,s),t.setMatrixAt(f,e)}t.count=3,t.instanceMatrix.needsUpdate=!0}}}const Ju=6,Vs=3,Ws=28,os=Ws+1,Rr=Ju*Vs*os*2,M3=[1.2,1.75,2.2],y3=Math.PI*2*.45,b3=2.4,S3=`
  attribute vec3 aTan;
  attribute float aSide;
  attribute float aU;
  attribute float aGlow;
  uniform float uWidth;
  varying float vU;
  varying float vSide;
  varying float vGlow;
  void main() {
    vec3 toCam = cameraPosition - position;
    vec3 across = normalize(cross(normalize(aTan), normalize(toCam)));
    vec3 p = position + across * aSide * uWidth;
    vU = aU;
    vSide = aSide;
    // Sát camera (đang bay xuyên dải) thì tắt dần: bề rộng tính theo mét nên dải gần to như tia laser lấn cả cảnh
    // (ảnh thử 31/10). Dải xa giữ sáng để dẫn mắt tới làn kế tiếp.
    vGlow = aGlow * smoothstep(4.0, 24.0, length(toCam));
    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  }`,w3=`
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
    vec3 warm = vec3(1.0, 0.78, 0.45);
    vec3 col = mix(warm * 0.35, vec3(1.0, 0.96, 0.85), dash) * edge * ends * vGlow;
    gl_FragColor = vec4(col, 1.0);
  }`;function T3(){const n=new Kt,t=new Float32Array(Rr*3),e=new Float32Array(Rr*3),i=new Float32Array(Rr),s=new Float32Array(Rr),r=new Float32Array(Rr),o=[];for(let h=0;h<Ju*Vs;h++)for(let d=0;d<os;d++){const p=(h*os+d)*2;s[p]=-1,s[p+1]=1,r[p]=r[p+1]=d/Ws,d<Ws&&o.push(p,p+1,p+2,p+1,p+3,p+2)}n.setAttribute("position",new wt(t,3)),n.setAttribute("aTan",new wt(e,3)),n.setAttribute("aGlow",new wt(i,1)),n.setAttribute("aSide",new wt(s,1)),n.setAttribute("aU",new wt(r,1)),n.setIndex(o);const a=new re({vertexShader:S3,fragmentShader:w3,uniforms:{uTime:{value:0},uWidth:{value:.16}},blending:mn,transparent:!0,depthWrite:!1,side:we}),c=new Xt(n,a);c.frustumCulled=!1,c.renderOrder=2;const l=new Map,u=new Float32Array(os*3),f={x:0,y:0,z:0};return{mesh:c,update(h,d,p){a.uniforms.uTime.value=d;const v=lx(h),g=h.gusts.find(M=>!M.taken&&!M.missed);let m=0;for(const M of h.gusts){if(m>=Ju||M.z+M.len<p-5||M.z>p+320)continue;M.taken&&!l.has(M.id)&&l.set(M.id,d);const b=M.taken?d-l.get(M.id):0,x=M.taken?Math.max(0,2.4*(1-b/.4)):M.missed?.18:M===g?1.5:.9;if(!(x<=0)){for(let _=0;_<Vs;_++){for(let w=0;w<os;w++){const y=w/Ws,T=_/Vs*Math.PI*2+y*y3+d*b3,R=M3[_];ce(M.z+y*M.len,pn(M.lane)+R*Math.cos(T),M.v+v+R*Math.sin(T),f),u[w*3]=f.x,u[w*3+1]=f.y,u[w*3+2]=f.z}const S=m*Vs+_;for(let w=0;w<os;w++){const y=Math.max(0,w-1),T=Math.min(Ws,w+1);for(let R=0;R<2;R++){const C=(S*os+w)*2+R;for(let L=0;L<3;L++)t[C*3+L]=u[w*3+L],e[C*3+L]=u[T*3+L]-u[y*3+L];i[C]=x}}}m++}}for(const M of l.keys())h.gusts.some(b=>b.id===M)||l.delete(M);n.setDrawRange(0,m*Vs*Ws*6);for(const M of["position","aTan","aGlow"])n.getAttribute(M).needsUpdate=!0;c.visible=m>0}}}function E3(){const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Uh(n)}const Cg=new Wn(1,1).rotateX(-Math.PI/2),Pg=new rn({map:E3(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function A3(n){const t=new Be(Cg,Pg,n);return t.count=0,t.frustumCulled=!1,t.renderOrder=1,t}function R3(n,t,e){const i=new Xt(Cg,Pg);return i.scale.set(n,1,t),i.position.y=e,i.renderOrder=1,i.updateMatrix(),i}const ef=[.86,.66,.36],Lg=[.78,.58,.32],_c=[.36,.34,.35],Ng=[.3,.29,.3],Nl=[.58,.56,.53],C3={pillar:[.52,.5,.48],wall:ef,tile:_c},P3={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},L3=()=>bg(P3);function N3(){const n=[go(jt(new Ht(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let t=0;t<2;t++)for(let e=0;e<12;e++){const i=ut(e*.73,t*1.9,61),s=-4.6+(e+.5*t)*.76,r=new Ht(.95,.4+.22*i,.62+.3*i).rotateX((i-.5)*.35).rotateY((i-.5)*.4),o=.78+.34*ut(e,t,62);n.push(jt(r.translate(0,.25+t*.46,s),[Nl[0]*o,Nl[1]*o,Nl[2]*o],.12,e+t*13))}return qn(n)}const I3=[.3,.22,.19],Il=[.92,.9,.84],D3=[.8,.82,.85];function Ig(n,t){const e=[],i=new Ht(n.len,n.wallH+n.sink,n.width).translate(0,(n.wallH-n.sink)/2,0);e.push(go(jt(i,n.wall,.14,t),0,2.5,.72)),e.push(jt(new Ht(n.len+.08,.7,n.width+.08).translate(0,.25,0),[.5,.44,.36],.1,t)),e.push(jt(new Ht(n.len+.06,.45,n.width+.06).translate(0,n.wallH-.2,0),I3,.08,t)),e.push(OA(n.len,n.width,n.wallH,n.rise,n.wall)),e.push(xc(n.len+.6,n.width/2+.35,n.rise+.25,n.tile,0,n.crest?yg:void 0).translate(0,n.wallH-.2,0));const s=-n.width/2-.04;e.push(jt(new Ht(1.3,2.3,.08).translate(0,1.15,s+.01),Il,.06,t)),e.push(jt(new Ht(1,2,.1).translate(0,1,s-.02),jh,.1,t)),e.push(jt(new Ht(1.8,.25,.34).translate(0,.12,s-.17),[.62,.58,.52],.08,t));for(let r=0;r<n.floors;r++){const o=1.5+r*3.1;for(const a of r===0?[-n.len/2+.85,n.len/2-.85]:[-.9,.9])e.push(jt(new Ht(.8,1,.1).translate(a,o,s),kA,.12,t+a));if(r>0&&n.balcony){const a=n.len*.78;e.push(jt(new Ht(a,.18,.4).translate(0,o-1.05,s-.2),[.7,.66,.6],.08,t)),e.push(jt(new Ht(a,.08,.08).translate(0,o-.15,s-.32),Il,.05,t));for(let c=0;c<=6;c++)e.push(jt(new Ht(.06,.82,.06).translate(-a/2+a*c/6,o-.55,s-.32),Il,.05,t))}}if(n.tank){const r=n.wallH+n.rise+.1;e.push(jt(new Je(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(n.len*.22,r+.45,0),D3,.12,t)),e.push(jt(new Ht(.9,.2,.7).translate(n.len*.22,r,0),[.4,.38,.36],.08,t))}return qn(e)}function U3(n,t,e=!1){const s=e?n%2?Lg:ef:n%2?_g:Qh,r=e?n%3===2?Ng:_c:n%3===2?xg:Ro;return Ig({len:4.4,width:5.2,wallH:t-3.2-.3,rise:3.2,wall:s,tile:r,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},n*7.1)}function va(n,t=!1){const e=t?n?Lg:ef:n?_g:Qh,i=t?n?Ng:_c:n?xg:Ro;return Ig({len:8-n,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:i,floors:1,sink:2.5,tank:!t,crest:!1,balcony:!t},3+n)}const as=250,Up=1,F3=6,nf={value:1},k3=vc({lift:nf,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),O3=vc({lift:nf,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Dl(n,t,e){return ce(n,t,0,e),e.y=Ze(e.x,e.z),e}function B3(n,t){const e=[],i=n*as;if(Math.max(Hn(i),Hn(i+as/2),Hn(i+as))===0)return e;const s=new P,r=So()>.5?4:0,o=(a,c)=>Hn(a)>.3&&c.y<Pe(a)-6&&c.y>Pe(a)-14;for(let a=0;a<t;a++){const c=i+ut(a*.77,n,81)*as,u=(ut(n,a*.41,82)<.5?-1:1)*(18+Math.pow(ut(a*.53,n*1.3,83),1.8)*190);o(c,Dl(c,u,s))&&e.push({p:s.clone(),r:ut(a,n,84)*6.28,s:.8+.5*ut(n,a,85),kind:r})}for(let a=0;a<2;a++){const c=i+(.25+.5*a)*as+(ut(n,a,86)-.5)*60,u=(ut(n*1.7,a,87)<.5?-1:1)*(24+ut(n,a*3.1,88)*90);for(let f=0;f<7;f++){const h=c+(ut(f,n+a,89)-.5)*70,d=u+(ut(f*1.9,n+a,90)-.5)*50;if(Math.abs(d)<17||!o(h,Dl(h,d,s)))continue;const p=hn(h)+(d>0?Math.PI/2:-Math.PI/2)+(ut(f,a,91)-.5)*.5;e.push({p:s.clone(),r:p,s:1,kind:r+1+f%2})}}for(let a=0;a<2;a++){const c=a?1:-1,l=i+ut(n,a,92)*(as-60),u=3+Math.floor(ut(n,a*2.3,93)*4);for(let f=0;f<u;f++){const h=l+f*10.2;o(h,Dl(h,c*13.5,s))&&e.push({p:s.clone(),r:hn(h),s:1,kind:r+3})}}return e}function z3(n){const t=Up+Math.max(3,Math.round(F3*n))+1,e=Math.round(34*Math.max(.5,n)),i=new De,s=[bg(),va(0),va(1),HA(),L3(),va(0,!0),va(1,!0),N3()],r=[34,7,7,12,34,7,7,12].map(m=>m*t),o=s.map((m,M)=>{const b=new Be(m,k3,r[M]);return b.count=0,b.frustumCulled=!1,i.add(b),b}),a=A3(r.reduce((m,M)=>m+M,0));i.add(a);const c=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11]],l=new Map,u=new Ot,f=new Ae,h=new P(0,1,0),d=new P,p=new P;let v=Number.NaN;const g=()=>{const m=s.map(()=>0);let M=0;for(let b=v;b<v+t;b++){let x=l.get(b);x||l.set(b,x=B3(b,e));for(const _ of x){const S=o[_.kind];if(m[_.kind]>=r[_.kind])continue;u.compose(_.p,f.setFromAxisAngle(h,_.r),d.set(_.s,_.s,_.s)),S.setMatrixAt(m[_.kind]++,u);const[w,y]=c[_.kind];u.compose(d.set(_.p.x,_.p.y+.12,_.p.z),f,p.set(w*_.s,1,y*_.s)),a.setMatrixAt(M++,u)}}for(const b of[...l.keys()])(b<v-1||b>v+t)&&l.delete(b);o.forEach((b,x)=>{b.count=m[x],b.visible=b.count>0,b.instanceMatrix.needsUpdate=!0}),a.count=M,a.instanceMatrix.needsUpdate=!0};return{group:i,update(m,M){const b=Math.floor(m/as)-Up;b!==v&&(v=b,g()),nf.value=1-.6*Math.min(1,Math.max(0,(M-.4)/.5))}}}const Fp=ae.tower.phase,H3=1,G3=2600;function kp(n,t,e){const i=[],s=o=>{const a=Math.PI/2+o*Math.PI/5,c=o%2?.382:1;return[Math.cos(a)*n*c,Math.sin(a)*n*c]};for(let o=0;o<10;o++){const[a,c]=s(o),[l,u]=s(o+1);i.push(0,0,t,a,c,t,l,u,t)}const r=new Kt;return r.setAttribute("position",new wt(new Float32Array(i),3)),r.computeVertexNormals(),jt(r,e,.04)}function V3(){const n=[.62,.6,.56],t=[jt(new Je(3.6,4.6,28,8).translate(0,8,0),n,.12,2),jt(new Je(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),jt(new Je(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=jt(new Ht(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return qn([...t,e,kp(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),kp(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function Op(n){const t=Ql(n)+(n===1?Ql(2):yo);let e=Math.floor((t+oi-Fp)/Ge)*Ge+Fp-oi;for(e>=t&&(e-=Ge);Hn(e)>0;)e-=Ge;return e}function W3(){const n=new Xt(V3(),Zh);n.visible=!1,n.matrixAutoUpdate=!1;let t=Number.NaN;const e=new P,i=new P,s=r=>{const{latMin:o,latMax:a,mirror:c}=ae.tower,l=H3*(c&&Yi(r)%2!==0?-1:1);i.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let f=o;f<=a;f+=20)ce(r+u,l*f,0,e),e.y=Ze(e.x,e.z),e.y>i.y&&i.copy(e);n.position.copy(i),n.rotation.y=-.6,n.scale.setScalar(2),n.updateMatrix()};return{mesh:n,update(r){if(Wa()!=="ha-giang"){n.visible=!1;return}const o=Jm(r),a=Op(o),c=Op(o+1),l=Math.abs(r-a)<Math.abs(r-c)?a:c;n.visible=Math.abs(r-l)<G3,n.visible&&l!==t&&(t=l,s(l))}}}const vo=12,sc={uPools:{value:Array.from({length:vo},()=>new de)},uPoolCount:{value:0},uPoolNight:{value:0}},X3=`
uniform vec4 uPools[${vo}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${vo}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let rc=0,Dg=vo;function q3(n){Dg=Math.max(0,Math.min(vo,Math.round(n)))}function $3(){rc=0}function Qu(n,t,e,i,s){rc>=Dg||s>330||t-Ze(n,e)>28||sc.uPools.value[rc++].set(n,t,e,i)}function K3(n){sc.uPoolCount.value=rc,sc.uPoolNight.value=n}const zs=14,Ul=9.5,Fl=3.4,Y3=.9,xa=7,Bp=4,kl=13,zp=30,Hp=420,Gp=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],Z3=[-1,1];function J3(n,t){for(const e of n.obstacles)if(Math.abs(e.z-t)<9)return!0;return!1}function Q3(){const n=Math.ceil((Hp+zp)/zs)+2,t=tf(n*(2*xa)+Math.ceil(n/Bp)*kl),e={x:0,y:0,z:0};return{points:t.points,setViewport:(i,s)=>t.setViewport(i,s),update(i,s,r,o){const a=Math.min(1,Math.max(0,(r-.38)/.35));let c=0,l=0;if(a>.01){const u=Math.floor((i.z-zp)/zs),f=Math.floor((i.z+Hp)/zs);for(let h=u;h<=f;h++){const d=h*zs;if(!(Hn(d)<.97||Hn(d+zs)<.97)){for(const p of Z3)for(let v=0;v<xa;v++){const g=(v+.5)/xa;ce(d+g*zs,p*Ul,-Vr+Fl-4*g*(1-g)*Y3,e);const m=Gp[((h*xa+v)%3+3)%3],M=.82+.18*Math.sin(s*3.1+h*1.7+v*2.3+p);t.set(c++,e.x,e.y,e.z,.6,m[0],m[1],m[2],a*M)}if(!(h%Bp!==0||J3(i,d))){l<3&&d>i.z-10&&(ce(d,0,-Vr+Fl,e),Qu(e.x,e.y,e.z,1.5,d-o),l++);for(let p=0;p<kl;p++){const v=(p+.5)/kl;ce(d,-Ul+v*2*Ul,-Vr+Fl+.3-4*v*(1-v)*1.3,e);const g=Gp[p%3];t.set(c++,e.x,e.y,e.z,.6,g[0],g[1],g[2],a*(.85+.15*Math.sin(s*2.7+p)))}}}}}t.commit(c)}}}function j3(){const n=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([t,e])=>new ot(t,e));return new Eo(n,16)}function tR(){return new Wn(1,1,1,6).translate(0,.5,0)}function eR(n){return new re({uniforms:{uTime:n},side:we,vertexShader:`
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
}`})}function nR(n){return new re({uniforms:{...gn.merge([lt.fog]),uTime:n},transparent:!0,depthWrite:!1,side:we,fog:!0,vertexShader:`
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
}`})}function iR(){const n=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([t,e])=>new ot(t*1.45,e*1.45));return new Eo(n,14)}function sR(){const n=[];for(let t=0;t<=8;t++){const e=t/8*Math.PI*.5;n.push(new ot(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new Eo(n,16)}const Ug=`
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
}`,rR=`
uniform float uTime;
varying vec2 vUv;
varying vec3 vInst;
void main() {
  float v = clamp((vUv.y - 0.0) / 1.0, 0.0, 1.0);
  // Giấy: cam nóng gần lửa (đáy) → đỏ thẫm ở chóp. vInst.r = độ cháy (đèn mini của vòng nhiệt sáng hơn chút).
  // Bão hoà mạnh: qua ACES, cam 1,25/0,78 ra kem nhạt — đèn giấy nhìn như bóng đèn trắng (pk-lan-day 01/11).
  vec3 hot = vec3(1.15, 0.42, 0.1);
  vec3 top = vec3(0.42, 0.035, 0.025);
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
}`,oR=`
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
}`;function aR(){return new re({vertexShader:Ug,fragmentShader:rR,side:we,uniforms:{uTime:{value:0}}})}function cR(){return new re({vertexShader:Ug,fragmentShader:oR,side:we})}function Qr(n,t,e){return e.setRGB(n,t%1,0)}const Ol=2.1,oc=8,zi=8,lR=46,uR=n=>new re({uniforms:{uTime:n},vertexShader:`
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
}`,transparent:!0,blending:mn,depthWrite:!1});function hR(n){const t=new Be(new Vh(Ol,.12,6,36),new rn({color:new ct("#ffb04a").multiplyScalar(.95)}),zi),e=new Be(sR(),cR(),zi),i=new Be(new Je(1,.55,1,12,1,!0).translate(0,.5,0),uR(n),zi*3),s=new Be(j3(),eR(n),zi),r=new Be(tR(),nR(n),zi),o=new ct,a=[t,e,i,s,r];for(const b of a)b.frustumCulled=!1,b.count=0;e.setColorAt(0,Qr(1,0,o)),i.setColorAt(0,o.setRGB(0,0,0)),r.setColorAt(0,o),r.renderOrder=3;const c=new Ot,l=new Ae,u=new Ae,f=new Ae,h=new P,d=new P;let p=0,v=0,g=0,m=0;const M=(b,x,_,S,w,y,T,R)=>{if(g>=i.instanceMatrix.count)return;const C=1-Math.min(1,Math.max(0,(w-450)/150));c.compose(h.set(b,x,_),l.identity(),d.set(S,lR,S)),i.setMatrixAt(g,c),i.setColorAt(g++,o.setRGB(y*C,T*C,R*C))};return{meshes:a,begin(){p=v=g=m=0},draw(b,x,_,S,w,y,T,R){const C=1+1.6*Math.min(1,Math.max(0,(w-30)/90));if(b.kind==="thermal"&&p<zi){u.setFromAxisAngle(h.set(0,1,0),Math.sin(y*1.3+b.id)*.45),c.compose(h.set(x,_,S),u,d.set(C,C,C)),t.setMatrixAt(p++,c);for(let L=0;L<oc;L++){const D=y*1.8+L/oc*Math.PI*2;h.set(Math.cos(D)*Ol*C,Math.sin(D)*Ol*C,0).applyQuaternion(u),R.body(x+h.x,_+h.y-.5*C,S+h.z,.36*C,1.15,L*.31+b.id*.1),R.glow(x+h.x,_+h.y-.85,S+h.z,.8+1.4*T,1,.7,.28,.85)}R.glow(x,_,S,(6+6*T)*C*.8,1,.7,.25,.45),M(x,_-1,S,1.5*C,w,1.4,.95,.38);for(let L=0;L<6;L++){const D=(y*.9+L/6)%1,I=L*2.1+b.id;R.glow(x+Math.cos(I)*1.1*C,_-2.4+D*4.8*C,S+Math.sin(I)*.6,.9*C,1,.8,.35,Math.sin(D*Math.PI)*.9)}}else if(b.kind==="shield"&&v<zi){l.setFromAxisAngle(h.set(0,0,1),Math.sin(y*1.7+b.id)*.3),c.compose(h.set(x,_+.9*C+.5*Math.sin(y*2.3+b.id),S),l,d.set(1.5*C,1.5*C,1.5*C)),e.setColorAt(v,Qr(1,0,o)),e.setMatrixAt(v++,c),R.glow(x,_,S,(3+5*T)*C*.8,.3,.95,.9,.55),M(x,_+.4,S,1.3*C,w,.25,1.1,.95);for(let L=0;L<6;L++){const D=(y*.6+L/6)%1,I=y*2+L*1.05;R.glow(x+Math.cos(I)*.9*C,_+1+D*16*C,S+Math.sin(I)*.9*C,1.1*C,.35,1,.92,Math.sin(D*Math.PI)*.85)}}else if(b.kind==="smoke"&&m<zi){l.setFromAxisAngle(h.set(0,1,0),y*1.6+b.id).premultiply(u.setFromAxisAngle(h.set(0,0,1),Math.sin(y*2.1+b.id)*.22));const L=1.6*C,D=_+.5*C+.35*Math.sin(y*2.6+b.id);c.compose(h.set(x,D,S),l,d.set(L,L,L)),s.setMatrixAt(m,c),h.set(0,L,0).applyQuaternion(l);const I=x+h.x,B=D+h.y,H=S+h.z;c.compose(h.set(I,B,H),f,d.set(6*C,13*C,1)),r.setMatrixAt(m,c),r.setColorAt(m++,o.setRGB(1-Math.min(1,Math.max(0,(w-450)/150)),b.id*.137%1,0)),R.glow(I,B,H,(1.2+2*T)*C,1,.55,.42,.9),R.glow(x,_,S,(3+5*T)*C*.8,1,.3,.62,.5),M(x,_+.4,S,.9*C,w,1.15,.22,.55);for(let W=0;W<5;W++){const j=(y*2.4+W/5)%1,O=W*2.4+b.id;R.glow(I+Math.cos(O)*j*.8*C,B+j*2.2*C,H+Math.sin(O)*j*.8*C,.5*C,1,.75,.4,(1-j)*.9)}}},commit(){t.count=p,e.count=v,i.count=g,s.count=r.count=m;for(const b of a)b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0)}}}const Fn={x:0,y:0,z:0},Bl=260,Vp=1600,Wp=220,_a=3200;function fR(n){const t=Math.round(Vp*n),e=new De,i=aR(),s=new Be(iR(),i,Bl+8*oc);s.frustumCulled=!1;const r=hR(i.uniforms.uTime),o=tf(Bl+Vp+Wp+8*(oc+7)+56);e.add(s,...r.meshes,o.points);const a=new ct;s.setColorAt(0,Qr(1,0,a));const c=[],l=new Map,u=new Ot,f=new Ae,h=new P,d=new P(1,1,1),p=new Ae;let v=0,g=0;const m={body(M,b,x,_,S,w){v>=s.instanceMatrix.count||(u.compose(h.set(M,b,x),f.identity(),d.set(_,_,_)),s.setColorAt(v,Qr(S,w,a)),s.setMatrixAt(v++,u))},glow:(M,b,x,_,S,w,y,T)=>o.set(g++,M,b,x,_,S,w,y,T)};return{group:e,setViewport:(M,b)=>o.setViewport(M,b),burst(M,b,x,_,S){for(let w=0;w<_&&c.length<Wp;w++){const y=Math.random()*Math.PI*2,T=Math.random()*2-1,R=6+Math.random()*10;c.push({x:M,y:b,z:x,vx:Math.cos(y)*R*Math.sqrt(1-T*T),vy:T*R+3,vz:Math.sin(y)*R*Math.sqrt(1-T*T),life:S?.7:1})}},update(M,b,x,_,S){v=0,g=0,i.uniforms.uTime.value=b,r.begin();for(const T of M.pickups){if(T.z-M.z>600||v>=Bl)continue;ce(T.z,pn(T.lane),T.v+Math.sin(b*2.4+T.id)*.45,Fn);let R=Fn.x,C=Fn.y,L=Fn.z,D=T.z,I=1;if(T.taken){const H=l.get(T.id)??b;l.set(T.id,H);const W=(b-H)/.6;if(W>=1)continue;D=M.z+4+W*10,ce(D,pn(T.lane),T.v,Fn),R=Fn.x,L=Fn.z,C=Fn.y+W*W*14,I=1-W}const B=Math.min(1,Math.max(0,(T.z-M.z-40)/210));I*=Math.min(1,Math.max(0,(D-S-2)/6)),!(I<=0)&&(T.kind==="lantern"?(f.setFromAxisAngle(h.set(0,1,0),b*.8+T.id).multiply(p.setFromAxisAngle(h.set(0,0,1),Math.sin(b*1.9+T.id)*.12)),u.compose(h.set(R,C,L),f,d.set(I,I,I)),s.setColorAt(v,Qr(1,T.id*.137,a)),s.setMatrixAt(v++,u),o.set(g++,R,C-.9*I,L,1.4+3.2*B+1.2*_,1,.62,.22,(.75+.25*_)*I),!T.taken&&T.z>M.z-15&&Qu(R,C-.9,L,1,T.z-S)):T.taken||(T.kind==="thermal"&&Qu(R,C,L,1.6,T.z-S),r.draw(T,R,C,L,T.z-M.z,b,B,m)))}for(const T of l.keys())M.pickups.some(R=>R.id===T)||l.delete(T);s.count=v,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.commit();const w=Math.min(t,Math.floor(t*(.12+.88*_)));for(let T=0;T<w;T++){const R=ut(T*.37,1.7,81)*_a,C=S-300+((R-S+300)%_a+_a)%_a,L=Cn(C);if(L<.35)continue;const D=ut(T,2.9,82)<.5?-1:1;ce(C,D*(30+Math.pow(ut(T,3.3,83),1.5)*1400),0,Fn);const I=(b*(2+3*ut(T,4.1,84))+ut(T,5.3,85)*700)%700,B=Vn(C)-380+I+Math.sin(b*.5+T)*2,H=L*Math.min(1,I/60)*(1-Math.max(0,I-600)/100);o.set(g++,Fn.x,B,Fn.z,2.6,1,.5+.1*Math.sin(T),.16,H*(.35+.65*_))}const y=hn(M.z);for(let T=c.length-1;T>=0;T--){const R=c[T];if(R.life-=x*1.6,R.life<=0){c.splice(T,1);continue}R.vy-=9*x,R.x+=R.vx*x,R.y+=R.vy*x,R.x+=Math.sin(y)*M.speed*.85*x,R.z+=(R.vz+Math.cos(y)*M.speed*.85)*x,o.set(g++,R.x,R.y,R.z,.7*R.life+.2,1,.7,.3,R.life)}o.commit(g)}}}const _n=40;function dR(n){const t=[];for(let e=n.bottom;e<n.top;){t.push(e);const i=Math.min(Math.abs(e-n.bandLo),Math.abs(e-n.bandHi),e>n.bandLo&&e<n.bandHi?0:99);e+=Math.min(10,1.2+i*.12)}return t.push(n.top),t}function pR(n){const t=dR(n),e=[],i=[],s=[];for(const l of t){const u=l>=n.bandLo-.01&&l<=n.bandHi+.01,f=u?n.rc:n.radius(l),h=Math.min(1,Math.max(0,(n.radius(l+6)-f)/(f*.6)));for(let d=0;d<_n;d++){const p=d/_n*Math.PI*2,v=Math.cos(p),g=Math.sin(p),m=ut(v*1.4+n.seed*7.1,g*1.4+l/26,31)-.5,M=ut(v*4+n.seed,g*4+l/5,32)-.5,b=Math.max(0,Math.sin((l/7+ut(v,g,n.seed)*2)*Math.PI))**6*.12;let x=f*(1+.42*m+.12*M+b);u&&(x=n.rc*(.9+.1*(M+.5)));const _=Math.pow(.5+.5*Math.sin(p*9+m*5+n.seed+l/40),5),S=Math.pow(Math.max(0,Math.sin((l/4.6+ut(v*2,g*2,n.seed+9)*1.5)*Math.PI)),10),w=.1*_+.09*S;x*=1-w,e.push(v*x,l,g*x),s.push(Math.min(.85,Math.max(0,(1-x/f)*1.6)+w*2.5+h*.55)),i.push(n.crest&&l>n.top-.7?1:0)}}e.push(0,n.top+(n.crest?0:2.5),0),i.push(n.crest?1:0),s.push(0);const r=[];for(let l=0;l<t.length-1;l++)for(let u=0;u<_n;u++){const f=l*_n+u,h=l*_n+(u+1)%_n;r.push(f,f+_n,h,h,f+_n,h+_n)}const o=t.length*_n,a=(t.length-1)*_n;for(let l=0;l<_n;l++)r.push(a+l,o,a+(l+1)%_n);const c=new Kt;return c.setAttribute("position",new wt(new Float32Array(e),3)),c.setAttribute("aCrest",new wt(new Float32Array(i),1)),c.setAttribute("aShade",new wt(new Float32Array(s),1)),c.setIndex(r),c.computeVertexNormals(),c}function mR(n,t){const e=[],i=new ct;for(let s=0;s<t;s++){const r=s<Math.ceil(t*.6),o=r?n.top-1.5-3*ut(s,n.seed,41):n.bandLo-6-40*ut(n.seed,s,42),a=n.seed*2.3+s*2.39,c=r?n.radius(o)*.75*ut(s,n.seed,43):n.radius(o)*.95,l=.35+.35*ut(s*1.3,n.seed,44),u=(ut(s,n.seed*3,45)<.45?mg():gg()).clone();u.scale(l,l*1.1,l).rotateY(a).translate(Math.cos(a)*c,o,Math.sin(a)*c),i.setHSL(.24+.06*ut(s,7,n.seed),.3,.55);const f=u.getAttribute("color");if(f)for(let h=0;h<f.count;h++)f.setXYZ(h,f.getX(h)*i.r*2,f.getY(h)*i.g*2,f.getZ(h)*i.b*2);e.push(u)}return hi(e)}function gR(n,t){const e=46+10*ut(n,1,51);return{seed:n,rc:t,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:i=>i<-6.5?t+.3*Math.pow(-6.5-i,.9):(t+.32*(i-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-i)/7)))}}function vR(n,t){return{seed:n,rc:t,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,radius:e=>t+.28*Math.pow(Math.max(0,-6.5-e),.92)}}const xi=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2];function Xp(n,t,e){const i=new Ht(n,1,7.6,Math.max(10,Math.round(n/2)),36,4).translate(0,.5,0),s=i.getAttribute("position"),r=new Float32Array(s.count);for(let a=0;a<s.count;a++){const c=s.getX(a),l=s.getY(a),u=s.getZ(a),f=Math.min(1,Math.max(0,(Math.abs(c)-9)/4)),h=t(c)-(1-f)*.6*ut(c*.5,u,3)-f*1.6*(ut(c*.3,u*.2,3)-.3),d=e(c)-10*ut(c*.06,1,4),p=d+(h-d)*l,v=1+.6*Math.max(0,Math.min(1,-p/40)),g=((p+3*ut(c*.04,0,7))/5.5%1+1)%1,m=2.4*(On(c*.07,p*.06,3,9)-.5),M=Math.min(1,Math.max(0,(h-p-.6)/2.4),Math.max(0,(p-d)/3)),b=(1.3*(1-g)-.65+m)*M;r[a]=M*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(g-.5)/.5)+.35*Math.max(0,-m));const x=u*v*(1+.3*(ut(c*.2,p*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*b;s.setXYZ(a,c*(1+.04*(ut(p*.1,u,6)-.5)),p,x)}const o=new Float32Array(s.count);for(let a=0;a<s.count;a++)o[a]=Math.abs(s.getX(a))<12&&s.getY(a)>.3?1:0;return i.setAttribute("aCrest",new wt(o,1)),i.setAttribute("aShade",new wt(r,1)),i.computeVertexNormals(),i}function is(n,t,e=()=>0){const i=n.getAttribute("position"),s=new Float32Array(i.count*3),r=new Float32Array(i.count);for(let o=0;o<i.count;o++)s.set(t,o*3),r[o]=e(i.getY(o));return n.setAttribute("color",new wt(s,3)),n.setAttribute("aSway",new wt(r,1)),n}function xR(n,t){const e=[],i=xi([.6,.42,.27]),s=c=>10.2-2.2*(1-(2*c/n)**2);for(let c=-n/2;c<n/2;c+=.9)e.push(is(new Ht(.8,.22,3).translate(c,-.55,0).toNonIndexed(),i));if(t)for(const c of[-n/2,n/2])e.push(is(new Ht(1.2,260,1.2).translate(c,-118,0).toNonIndexed(),i));for(const c of[-1.5,1.5]){e.push(is(new Ht(n,.08,.08).translate(0,1.2,c).toNonIndexed(),i));const l=Array.from({length:13},(u,f)=>new P(-n/2+f/12*n,0,c*.3)).map(u=>u.setY(s(u.x)));e.push(is(new hc(new zh(l),24,.07,4).toNonIndexed(),i))}const r=[xi([.86,.12,.1]),xi([.98,.72,.12]),xi([.86,.12,.1]),xi([.95,.88,.7]),xi([.2,.55,.3]),xi([.2,.4,.75])];let o=0;for(let c=-n/2+.6;c<n/2;c+=1.15,o++){const l=s(c)-.05,u=Math.min(l-1.5,5.4+2.2*ut(c,2,8)+(o%3===0?1.3:0)),f=new Wn(.62,u,2,6),h=f.getAttribute("position");for(let p=0;p<h.count;p++){const v=(u/2-h.getY(p))/u;h.setX(p,h.getX(p)*(1-.15*v)),v>.99&&Math.abs(h.getX(p))<.01&&h.setY(p,h.getY(p)+.5)}f.rotateY((ut(c,5,9)-.5)*.9).translate(c,l-u/2,o%2?.25:-.25);const d=r[Math.floor(ut(c*1.7,3,10)*r.length*.999)];e.push(is(f.toNonIndexed(),d,p=>Math.min(1,Math.max(0,(l-p)/u))))}for(let c=-n/2+2.3;c<n/2-1;c+=4.6){const l=s(c)-.75;e.push(is(new Je(.34,.34,.66,8).translate(c,l,-.6).toNonIndexed(),xi([.95,.16,.08]),()=>.3)),e.push(is(new Je(.2,.2,.1,8).translate(c,l+.38,-.6).toNonIndexed(),xi([.98,.75,.25]),()=>.3))}const a=hi(e);return a.computeVertexNormals(),a}const Cr=2.9,_R=-1.25;function MR(n,t,e,i){const s=Cr+t,r=new Ht(s,1,6.8,Math.max(6,Math.round(s/3)),8,3).translate(s/2-Cr,.5,0),o=r.getAttribute("position"),a=new Float32Array(o.count);for(let c=0;c<o.count;c++){const l=o.getX(c),u=o.getY(c),f=o.getZ(c),h=Math.min(1,Math.max(0,(l+Cr)/Math.max(1,s))),d=9+(e-9)*Math.pow(h,.7)+6*(On(l*.08,f*.1+i,3,31)-.5),p=l>Cr?(l-Cr)*.35+.8*ut(l*.4,f*.5+i,5):0,v=_R+p,g=v+(d-v)*u,m=1.6*(On(l*.09+i,g*.07,3,37)-.5)*Math.min(1,u*6);a[c]=Math.max(0,.6-u*3)*.8,o.setXYZ(c,l*n,g,f*(1+.15*Math.min(1,g/30))+Math.sign(f)*m)}if(r.setAttribute("aShade",new wt(a,1)),r.setAttribute("aCrest",new wt(new Float32Array(o.count),1)),n<0){const c=r.getIndex();for(let l=0;l<c.count;l+=3){const u=c.getX(l+1);c.setX(l+1,c.getX(l+2)),c.setX(l+2,u)}}return r.computeVertexNormals(),r}const yR=new re({uniforms:{...ir},vertexShader:`
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
${gc}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:Qe,transparent:!0,depthWrite:!1}),qp=(n,t,e)=>`${Math.round(n*50)},${Math.round(t*50)},${Math.round(e*50)}`;function bR(n){if(n.getAttribute("aOutline"))return n;const t=n.getAttribute("position"),e=n.getAttribute("normal"),i=new Map;for(let r=0;r<t.count;r++){const o=qp(t.getX(r),t.getY(r),t.getZ(r)),a=i.get(o)??[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),i.set(o,a)}const s=new Float32Array(t.count*3);for(let r=0;r<t.count;r++){const o=i.get(qp(t.getX(r),t.getY(r),t.getZ(r))),a=Math.hypot(o[0],o[1],o[2]);s.set(a>1e-6?[o[0]/a,o[1]/a,o[2]/a]:[0,1,0],r*3)}return n.setAttribute("aOutline",new wt(s,3)),n}function zr(n){const t=new Xt(bR(n),yR);return t.userData.hazardHull=!0,t}function SR(n,t){n&&(n.visible=t>5&&t<105)}const Ma=eA(),wR=Zh,Fg={value:1},kg={value:0},sf=new rr({vertexColors:!0,side:we});sf.onBeforeCompile=n=>{n.uniforms.uLift=Fg,n.uniforms.uTime=kg,Object.assign(n.uniforms,ir),n.vertexShader=`attribute float aSway;
uniform float uTime;
${n.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),n.fragmentShader=`uniform float uLift;
${gc}${n.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};sf.customProgramCacheKey=()=>"cloth-hazard";const Og=(n,t)=>({rock:pR(n),trees:mR(n,t)}),$p=[0,1,2,3,4,5,6,7].map(n=>Og(gR(n*1.7+.3,Ki.pillar.halfX),9)),Kp=[0,1,2].map(n=>Og(vR(n*2.3+.7,Ki.spike.halfX),4)),Yp=new Map;function TR(n,t){const e=Math.ceil(n/4)*4,i=`${e}:${t}`;let s=Yp.get(i);return s||Yp.set(i,s=xR(e,t)),s}const Zp=new Map;function zl(n,t){let e=Zp.get(n);return e||Zp.set(n,e=t()),e}function ER(n,t){const e=Pe(n.z),i=n.kind==="ridge"||n.kind==="bridge";ce(n.z,i?0:pn(n.lane),0,t);const s=Math.round((Ze(t.x,t.z)-e)*2)/2,r=u=>new Xt(u,O3).add(zr(u)),o=So()>.5,a=o?"hg":"";if(n.kind==="ridge")return r(zl(`${a}d${s}`,()=>BA(26,1,s,o?_c:void 0)));if(n.kind==="bridge")return r(zl(`${a}g${s}`,()=>zA(s,o?C3:void 0)));const c=n.id%3,l=r(zl(`${a}h${c}:${s}`,()=>U3(c,1-s,o)));return l.position.y=s,l.updateMatrix(),new De().add(l,R3(8,9,s+.12))}function AR(){const n=new De,t=new Map,e={x:0,y:0,z:0},i=s=>{const r=Zs(s.z);let o;if($i(s.z))o=ER(s,e);else if(s.kind==="pillar"||s.kind==="spike"){const l=(s.kind==="pillar"?$p:Kp)[s.id%(s.kind==="pillar"?$p.length:Kp.length)];o=new De().add(new Xt(l.rock,Ma).add(zr(l.rock)),new Xt(l.trees,wR))}else if(s.kind==="ridge"){const l=Pe(s.z),u=s.open?64:2*r+18,f=new Map,h=g=>{let m=f.get(g);return m===void 0&&f.set(g,m=Ze(ce(s.z,g,0,e).x,e.z)-l),m},d=u/2-20,p=g=>Math.min(1,Math.abs(g)/d),v=s.open?Xp(u,g=>1+Math.max(0,Math.abs(g)-d)*2.2,g=>Math.abs(g)<d?-16-70*p(g)**6:h(g)-12):Xp(u,g=>Math.abs(g)<10?1:Math.max(1,h(g)+3),g=>h(g)-12);o=new Xt(v,Ma).add(zr(v)),o.userData.own=!0}else if(s.kind==="overhang"){const l=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,u=MR(l,Math.max(8,r+18-Math.abs(pn(s.lane))),70,s.id%97);o=new Xt(u,Ma).add(zr(u)),o.userData.own=!0}else{const l=TR(s.open?46:2*r+18,s.open);o=new Xt(l,sf).add(zr(l))}const a=s.kind==="ridge"||s.kind==="bridge";ce(s.z,a?0:pn(s.lane),0,e),o.position.set(e.x,e.y,e.z);const c=a||$i(s.z)||s.kind==="overhang";return o.rotation.y=hn(s.z)+(c?0:s.id*2.39),c||o.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),o.matrixAutoUpdate=!1,o.updateMatrix(),o.traverse(l=>{l.matrixAutoUpdate=!1,l.updateMatrixWorld(),l.userData.hazardHull&&(o.userData.hull=l)}),n.add(o),o};return{group:n,update(s,r,o){kg.value=r;const a=Math.min(1,Math.max(0,(o-.4)/.5));Fg.value=1-.75*a,Ma.uniforms.uLift.value=1-.45*a;const c=new Set;for(const l of s.obstacles){c.add(l.id);let u=t.get(l.id);u||t.set(l.id,u=i(l)),SR(u.userData.hull,l.z-s.z)}for(const[l,u]of t)c.has(l)||(n.remove(u),u.userData.own&&u.geometry.dispose(),t.delete(l))}}}function RR(n){const t=new Pi({map:n,roughness:.8,side:we}),e={uTime:{value:0},uFlutter:{value:1}};return t.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},t.userData.setTime=(i,s)=>{e.uTime.value=i,e.uFlutter.value=s},t}const ya=new Pi({color:"#a8141c",roughness:.55}),CR=new Pi({color:"#f6f4ef",roughness:.18,metalness:.05}),PR=new Pi({color:"#15161c",roughness:.08,metalness:.6}),Hl=new Pi({color:"#1c1d22",roughness:.75});function ba(n,t,e,i){const s=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=new Xt(new Fh(e,s,4,10),i);return r.position.set((n[0]+t[0])/2,(n[1]+t[1])/2,(n[2]+t[2])/2),r.lookAt(r.position.x+t[0]-n[0],r.position.y+t[1]-n[1],r.position.z+t[2]-n[2]),r.rotateX(Math.PI/2),r}function LR(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");t.fillStyle="#efe2c8",t.fillRect(0,0,256,256);for(let i=-8;i<16;i++)for(const[s,r]of[[1,1],[1,-1]])t.strokeStyle="rgba(120,80,50,0.28)",t.lineWidth=2,t.beginPath(),t.moveTo(i*32,r>0?0:256),t.lineTo(i*32+256*s,r>0?256:0),t.stroke();t.fillStyle="#2bb5ad",t.fillRect(0,18,256,14),t.fillStyle="#a8141c",t.fillRect(0,0,256,10),t.fillRect(0,226,256,30);const e=new Uh(n);return e.colorSpace=He,e.anisotropy=4,e}function Jp(n,t,e,i,s,r){const c=[],l=[],u=[];for(let h=0;h<=6;h++){const d=h/6;for(let p=0;p<=10;p++){const v=p/10,g=[0,1,2].map(m=>(1-d)*((1-v)*n[m]+v*t[m])+d*((1-v)*i[m]+v*e[m]));g[2]=g[2]+.12*d*Math.sin(Math.PI*v),g[1]=g[1]+s*Math.sin(Math.PI*v)*Math.sin(Math.PI*d)+.025*Math.abs(Math.sin(Math.PI*v*4)),c.push(...g),l.push(v*2,d)}}for(let h=0;h<6;h++)for(let d=0;d<10;d++){const p=h*11+d;r?u.push(p,p+1,p+10+1,p+1,p+10+2,p+10+1):u.push(p,p+10+1,p+1,p+1,p+10+1,p+10+2)}const f=new Kt;return f.setAttribute("position",new wt(new Float32Array(c),3)),f.setAttribute("uv",new wt(new Float32Array(l),2)),f.setIndex(u),f.computeVertexNormals(),f}function NR(){const n=new De,t=new De;n.add(t);const e=LR(),i=RR(e);t.add(ba([0,0,-.32],[0,.02,.5],.18,ya));const s=new Xt(new us(.15,20,14),CR);s.position.set(0,.07,.78);const r=new Xt(new us(.152,20,10,-1.1,2.2,1.35,.6),PR);r.position.copy(s.position),r.rotation.x=-.3,t.add(s,r);const o=new Xt(new Ht(.26,.1,.4,2,1,2),Hl);o.position.set(0,.19,.1),t.add(o);const a=[],c=[];for(const p of[1,-1]){const v=new De,g=[.17*p,.05,.44],m=[1.02*p,.07,.3];v.add(ba(g,m,.06,ya));const M=new Xt(new us(.06,8,6),Hl);M.position.set(m[0]+.05*p,m[1],m[2]+.02),v.add(M),c.push(M),v.add(new Xt(Jp(g,m,[.62*p,.02,-.2],[.2*p,0,-.42],.07,p<0),i)),a.push(v),t.add(v)}const l=[.14,0,-.34],u=[-.14,0,-.34],f=[.33,-.03,-1.18],h=[-.33,-.03,-1.18];t.add(ba(l,f,.075,ya),ba(u,h,.075,ya)),t.add(new Xt(Jp([.13,0,-.36],[-.13,0,-.36],h,f,.05,!1),i));const d=[];for(const p of[f,h]){const v=new Xt(new Ht(.12,.17,.13),Hl);v.position.set(p[0],p[1]-.04,p[2]-.06),t.add(v),d.push(v)}return{root:n,body:t,feet:d,tips:c,ankles:d,animate(p,v,g){for(const m of a)m.scale.x=v;i.userData.setTime?.(p,g)}}}const IR={roll:.62,flip:.9,split:3,spiral:1.5},Qp=ae.edge-10,Pr=n=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,n)));function DR(){const n={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let t=null,e=0,i=1,s=0,r=!1,o=Number.NaN,a=0;const c=(l,u)=>{t=l,e=0,i=u,r=!0};return{trick(l,u){return t!==null?!1:(c(l,u),!0)},update(l,u){if(n.roll=n.pitch=n.dx=n.dv=n.cam=0,n.spread=null,l.mode!=="run")return t=null,o=Number.NaN,n;const f=ze(l.z);if(o<Qp&&f>=Qp&&f-o<200?c("split",Yi(l.z)%2===0?1:-1):t===null&&l.thermalT>0&&a<=0&&c("spiral",l.x>=0?-1:1),o=f,a=l.thermalT,t===null)return n;r&&(r=!1,s=l.obstacles.some(v=>v.z>l.z-2&&v.z<l.z+l.speed)?1:3),e+=u;const h=e/IR[t];if(h>=1)return t=null,n;const d=Nm(l.z);if(t==="roll")n.roll=i*2*Math.PI*Pr(h),n.spread=1.06;else if(t==="flip"){const p=2*Math.PI*Pr(h);n.pitch=-p,n.dv=s*.5*(1-Math.cos(p)),n.spread=.82}else if(t==="split")n.roll=i*Math.PI*(Pr(h/.15)+Pr((h-.7)/.22)),n.spread=1.04;else{const p=4*Math.PI*Pr(h),v=Math.sin(Math.PI*h);n.roll=i*p,n.dx=i*v*Math.sin(p),n.dv=v*(1-Math.cos(p))}return(t==="roll"||t==="split")&&(n.cam=i*Math.sin(Math.abs(n.roll)/2)*(.12+.3*d)),n}}}const Bg=n=>2.5*(1-Math.exp(-n*6)),UR=n=>4.5*Math.min(n,1.4)**2,Sa={x:0,y:0,z:0};function zg(n){return ce(n.z-Bg(n.crashT),n.x,n.v,Sa),Math.max(0,Math.min(UR(n.crashT),Sa.y-Ze(Sa.x,Sa.z)-.6))}function FR(){let n=0,t=0,e=0,i=0,s=0,r=0,o=0,a=1;const c=DR();let l=0;return{lateralSpeed:()=>e,trick:(u,f)=>c.trick(u,f),camRoll:()=>l,apply(u,f,h,d){const{root:p,body:v}=u;if(d>0){const w=1-Math.exp(-d*14);e+=((f.x-n)/d-e)*w,i+=((f.v-t)/d-i)*w}n=f.x,t=f.v;const g=c.update(f,d);if(l=g.cam,ce(f.z,f.x+g.dx,f.v+g.dv,p.position),p.rotation.order="YXZ",p.rotation.set(-Math.atan(wi(f.z)),hn(f.z),0),v.rotation.order="ZXY",f.mode==="crash"||f.mode==="over"){ce(f.z-Bg(f.crashT),f.x,f.v-zg(f),p.position),v.rotation.set(Math.sin(h*9)*1.6,h*4,h*13),u.animate(h,.7,2.5,0,d);return}const m=1-Math.exp(-d*10);s+=(Math.max(-1.1,Math.min(1.1,e*.027+Lm(f.z,f.speed)))-s)*m;const M=-(Math.atan(wi(f.z+18))-Math.atan(wi(f.z)))*.9;r+=(Math.max(-.45,Math.min(.5,-i*.045+M))-r)*m,o+=(Math.max(-.2,Math.min(.2,e*.006))-o)*m;const b=g.spread??(f.vert==="dive"?.8:f.vert==="flare"?1.06:1);a+=(b-a)*m;const x=Math.sin(h*23)*.012+Math.sin(h*7.3)*.018,_=(f.stunT/rt.stunTime)**2;v.rotation.set(r+g.pitch+x+.3*_*Math.sin(h*9.3+1),o+.28*_*Math.sin(h*6.1),s+g.roll+x*.6+.6*_*Math.sin(h*13));const S=(f.vert==="dive"?1.8:f.thermalT>0?1.4:1)+1.6*_;u.animate(h,a-.22*_,S,Math.max(-1,Math.min(1,e/35+Math.sin(h*11)*_)),d)}}}function kR(n){const t=new Map,e=new Map,i=n.clone();return Hg(n,i,function(s,r){t.set(r,s),e.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Hg(n,t,e){e(n,t);for(let i=0;i<n.children.length;i++)Hg(n.children[i],t.children[i],e)}class OR extends lr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new VR(e)}),this.register(function(e){return new WR(e)}),this.register(function(e){return new jR(e)}),this.register(function(e){return new tC(e)}),this.register(function(e){return new eC(e)}),this.register(function(e){return new qR(e)}),this.register(function(e){return new $R(e)}),this.register(function(e){return new KR(e)}),this.register(function(e){return new YR(e)}),this.register(function(e){return new GR(e)}),this.register(function(e){return new ZR(e)}),this.register(function(e){return new XR(e)}),this.register(function(e){return new QR(e)}),this.register(function(e){return new JR(e)}),this.register(function(e){return new zR(e)}),this.register(function(e){return new jp(e,ie.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new jp(e,ie.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new nC(e)})}load(t,e,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Jr.extractUrlBase(t);o=Jr.resolveURL(l,this.path)}else o=Jr.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new B0(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,i,s){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Gg){try{o[ie.KHR_BINARY_GLTF]=new iC(t)}catch(f){s&&s(f);return}r=JSON.parse(o[ie.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new gC(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const f=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(f){case ie.KHR_MATERIALS_UNLIT:o[f]=new HR;break;case ie.KHR_DRACO_MESH_COMPRESSION:o[f]=new sC(r,this.dracoLoader);break;case ie.KHR_TEXTURE_TRANSFORM:o[f]=new rC;break;case ie.KHR_MESH_QUANTIZATION:o[f]=new oC;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,s)}parseAsync(t,e){const i=this;return new Promise(function(s,r){i.parse(t,e,s,r)})}}function BR(){let n={};return{get:function(t){return n[t]},add:function(t,e){n[t]=e},remove:function(t){delete n[t]},removeAll:function(){n={}}}}function Fe(n,t,e){const i=n.json.materials[t];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const ie={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class zR{constructor(t){this.parser=t,this.name=ie.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let i=0,s=e.length;i<s;i++){const r=e[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,i="light:"+t;let s=e.cache.get(i);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new ct(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],yn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new H0(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ty(u),l.distance=f;break;case"spot":l=new Sy(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(i,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,i=this.parser,r=i.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(e.cache,a,c)})}}class HR{constructor(){this.name=ie.KHR_MATERIALS_UNLIT}getMaterialType(){return rn}extendParams(t,e,i){const s=[];t.color=new ct(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],yn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(t,"map",r.baseColorTexture,He))}return Promise.all(s)}}class GR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class VR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(r,r)}return Promise.all(s)}}class WR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class XR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class qR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_SHEEN}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(e.sheenColor=new ct(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],yn)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,He)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class $R{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class KR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_VOLUME}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return e.attenuationColor=new ct().setRGB(r[0],r[1],r[2],yn),Promise.all(s)}}class YR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_IOR}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class ZR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return e.specularColor=new ct().setRGB(r[0],r[1],r[2],yn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,He)),Promise.all(s)}}class JR{constructor(t){this.parser=t,this.name=ie.EXT_MATERIALS_BUMP}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(s)}}class QR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?ui:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class jR{constructor(t){this.parser=t,this.name=ie.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,i=e.json,s=i.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class tC{constructor(t){this.parser=t,this.name=ie.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class eC{constructor(t){this.parser=t,this.name=ie.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class jp{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,i=e.bufferViews[t];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,f=s.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,s.mode,s.filter),d})})}else return null}}class nC{constructor(t){this.name=ie.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,i=e.nodes[t];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=e.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),f=u.isGroup?u.children:[u],h=l[0].count,d=[];for(const p of f){const v=new Ot,g=new P,m=new Ae,M=new P(1,1,1),b=new Be(p.geometry,p.material,h);for(let _=0;_<h;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),b.setMatrixAt(_,v.compose(g,m,M));let x=null;for(const _ in c)if(_==="_COLOR_0"){const S=c[_];b.instanceColor=new co(S.array,S.itemSize,S.normalized)}else if(_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"){if(x===null){const w=b.geometry;x=new Kt,x.name=w.name;for(const y in w.attributes)x.setAttribute(y,w.attributes[y]);for(const y in w.morphAttributes)x.morphAttributes[y]=w.morphAttributes[y];w.index!==null&&x.setIndex(w.index),x.morphTargetsRelative=w.morphTargetsRelative;for(const y of w.groups)x.addGroup(y.start,y.count,y.materialIndex);w.boundingBox!==null&&(x.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(x.boundingSphere=w.boundingSphere.clone()),x.drawRange.start=w.drawRange.start,x.drawRange.count=w.drawRange.count,x.userData=Object.assign({},w.userData),b.geometry=x}const S=c[_];x.setAttribute(_,new co(S.array,S.itemSize,S.normalized))}Le.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),d.push(b)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Gg="glTF",Lr=12,tm={JSON:1313821514,BIN:5130562};class iC{constructor(t){this.name=ie.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Lr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Gg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Lr,r=new DataView(t,Lr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===tm.JSON){const l=new Uint8Array(t,Lr+o,a);this.content=i.decode(l)}else if(c===tm.BIN){const l=Lr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class sC{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ie.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const i=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const f=ju[u]||u.toLowerCase();a[f]=o[u]}for(const u in t.attributes){const f=ju[u]||u.toLowerCase();if(o[u]!==void 0){const h=i.accessors[t.attributes[u]],d=Ks[h.componentType];l[f]=d.name,c[f]=h.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(f,h){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],g=c[p];g!==void 0&&(v.normalized=g)}f(d)},a,l,yn,h)})})}}class rC{constructor(){this.name=ie.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const i=Math.cos(t.rotation),s=Math.sin(t.rotation);t.matrix.set(t.repeat.x*i,t.repeat.y*s,t.offset.x,-t.repeat.x*s,t.repeat.y*i,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class oC{constructor(){this.name=ie.KHR_MESH_QUANTIZATION}}class Vg extends or{constructor(t,e,i,s){super(t,e,i,s)}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=i[r+o];return e}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-e,f=(i-e)/u,h=f*f,d=h*f,p=t*l,v=p-l,g=-2*d+3*h,m=d-h,M=1-g,b=m-h+f;for(let x=0;x!==a;x++){const _=o[v+x+a],S=o[v+x+c]*u,w=o[p+x+a],y=o[p+x]*u;r[x]=M*_+b*S+g*w+m*y}return r}}const aC=new Ae;class cC extends Vg{interpolate_(t,e,i,s){const r=super.interpolate_(t,e,i,s);return aC.fromArray(r).normalize().toArray(r),r}}const Tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},em={9728:Ve,9729:We,9984:s0,9985:Aa,9986:Fr,9987:yi},nm={33071:ei,33648:Xa,10497:js},Gl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ju={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},lC={CUBICSPLINE:void 0,LINEAR:ro,STEP:so},Vl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uC(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Pi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ai})),n.DefaultMaterial}function ss(n,t,e){for(const i in e.extensions)n[i]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=e.extensions[i])}function Qn(n,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(n.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function hC(n,t,e){let i=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const f=t[l];if(f.POSITION!==void 0&&(i=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];if(i){const h=f.POSITION!==void 0?e.getDependency("accessor",f.POSITION):n.attributes.position;o.push(h)}if(s){const h=f.NORMAL!==void 0?e.getDependency("accessor",f.NORMAL):n.attributes.normal;a.push(h)}if(r){const h=f.COLOR_0!==void 0?e.getDependency("accessor",f.COLOR_0):n.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],f=l[1],h=l[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=f),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function fC(n,t){if(n.updateMorphTargets(),t.weights!==void 0)for(let e=0,i=t.weights.length;e<i;e++)n.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(n.morphTargetInfluences.length===e.length){n.morphTargetDictionary={};for(let i=0,s=e.length;i<s;i++)n.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function dC(n){let t;const e=n.extensions&&n.extensions[ie.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Wl(e.attributes):t=n.indices+":"+Wl(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)t+=":"+Wl(n.targets[i]);return t}function Wl(n){let t="";const e=Object.keys(n).sort();for(let i=0,s=e.length;i<s;i++)t+=e[i]+":"+n[e[i]]+";";return t}function th(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pC(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const mC=new Ot;class gC{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new BR,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new My(this.options.manager):this.textureLoader=new Ay(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new B0(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return ss(r,a,s),Qn(a,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,i){if(t.refs[e]<=1)return i;const s=i.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(i,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const s=t(e[i]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&i.push(r)}return i}getDependency(t,e){const i=t+":"+e;let s=this.cache.get(i);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(i,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const i=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return i.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[ie.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(Jr.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(i){const s=e.byteLength||0,r=e.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(t){const e=this,i=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=Gl[s.type],a=Ks[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new wt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Gl[s.type],l=Ks[s.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,h=s.byteOffset||0,d=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let v,g;if(d&&d!==f){const m=Math.floor(h/d),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let b=e.cache.get(M);b||(v=new l(a,m*d,s.count*d/u),b=new fM(v,d/u),e.cache.add(M,b)),g=new Ph(b,c,h%d/u,p)}else a===null?v=new l(s.count*c):v=new l(a,h,s.count*c),g=new wt(v,c,p);if(s.sparse!==void 0){const m=Gl.SCALAR,M=Ks[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,_=new M(o[1],b,s.sparse.count*m),S=new l(o[2],x,s.sparse.count*c);a!==null&&(g=new wt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let w=0,y=_.length;w<y;w++){const T=_[w];if(g.setX(T,S[w*c]),c>=2&&g.setY(T,S[w*c+1]),c>=3&&g.setZ(T,S[w*c+2]),c>=4&&g.setW(T,S[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(t){const e=this.json,i=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,i){const s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=em[h.magFilter]||We,u.minFilter=em[h.minFilter]||yi,u.wrapS=nm[h.wrapS]||js,u.wrapT=nm[h.wrapT]||js,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ve&&u.minFilter!==We,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const i=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(f=>f.clone());const o=s.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const h=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(f){return new Promise(function(h,d){let p=h;e.isImageBitmapLoader===!0&&(p=function(v){const g=new Xe(v);g.needsUpdate=!0,h(g)}),e.load(Jr.resolveURL(f,r.path),p,void 0,d)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),Qn(f,o),f.userData.mimeType=o.mimeType||pC(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[t]=u,u}assignTexture(t,e,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[ie.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[ie.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[ie.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let i=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new b0,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(t.isLine){const a="LineBasicMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new Ih,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}t.material=i}getMaterialType(){return Pi}loadMaterial(t){const e=this,i=this.json,s=this.extensions,r=i.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[ie.KHR_MATERIALS_UNLIT]){const f=s[ie.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,e))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ct(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],yn),a.opacity=h[3]}f.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",f.baseColorTexture,He)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=we);const u=r.alphaMode||Vl.OPAQUE;if(u===Vl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Vl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==rn&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ot(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==rn&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==rn){const f=r.emissiveFactor;a.emissive=new ct().setRGB(f[0],f[1],f[2],yn)}return r.emissiveTexture!==void 0&&o!==rn&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,He)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),Qn(f,r),e.associations.set(f,{materials:t}),r.extensions&&ss(s,f,r),f})}createUniqueName(t){const e=ve.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[ie.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return im(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=dC(l),f=s[u];if(f)o.push(f.promise);else{let h;l.extensions&&l.extensions[ie.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=im(new Kt,l,e),l.mode===Tn.TRIANGLE_STRIP?h=h.then(d=>Pp(d,h0)):l.mode===Tn.TRIANGLE_FAN&&(h=h.then(d=>Pp(d,Fu))),s[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(t){const e=this,i=this.json,s=this.extensions,r=i.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?uC(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let d=0,p=u.length;d<p;d++){const v=u[d],g=o[d];let m;const M=l[d];if(g.mode===Tn.TRIANGLES||g.mode===Tn.TRIANGLE_STRIP||g.mode===Tn.TRIANGLE_FAN||g.mode===void 0){const b=r.isSkinnedMesh===!0,x=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");b&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=b&&x?new _0(v,M):new Xt(v,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Tn.LINES)m=new y0(v,M);else if(g.mode===Tn.LINE_STRIP)m=new Dh(v,M);else if(g.mode===Tn.LINE_LOOP)m=new yM(v,M);else if(g.mode===Tn.POINTS)m=new ja(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&fC(m,r),m.name=e.createUniqueName(r.name||"mesh_"+t),Qn(m,r),g.extensions&&ss(s,m,g),e.assignFinalMaterial(m),f.push(m)}for(let d=0,p=f.length;d<p;d++)e.associations.set(f[d],{meshes:t,primitives:d});if(f.length===1)return r.extensions&&ss(s,f[0],r),f[0];const h=new De;r.extensions&&ss(s,h,r),e.associations.set(h,{meshes:t});for(let d=0,p=f.length;d<p;d++)h.add(f[d]);return h})}loadCamera(t){let e;const i=this.json.cameras[t],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new ln(K_.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(e=new Ao(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),Qn(e,i),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],i=[];for(let s=0,r=e.joints.length;s<r;s++)i.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const f=o[l];if(f){a.push(f);const h=new Ot;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Nh(a,c)})}loadAnimation(t){const e=this.json,i=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let f=0,h=s.channels.length;f<h;f++){const d=s.channels[f],p=s.samplers[d.sampler],v=d.target,g=v.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,M=s.parameters!==void 0?s.parameters[p.output]:p.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(p),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],p=f[2],v=f[3],g=f[4],m=[];for(let b=0,x=h.length;b<x;b++){const _=h[b],S=d[b],w=p[b],y=v[b],T=g[b];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const R=i._createAnimationTracks(_,S,w,y,T);if(R)for(let C=0;C<R.length;C++)m.push(R[C])}const M=new dy(r,void 0,m);return Qn(M,s),M})}createNodeMesh(t){const e=this.json,i=this,s=e.nodes[t];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){const e=this.json,i=this,s=e.nodes[t],r=i._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],f=l[1],h=l[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,mC)});for(let d=0,p=f.length;d<p;d++)u.add(f[d]);if(u.userData.pivot!==void 0&&f.length>0){const d=u.userData.pivot,p=f[0];u.pivot=new P().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(t){const e=this.json,i=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new M0:l.length>1?u=new De:l.length===1?u=l[0]:u=new Le,u!==l[0])for(let f=0,h=l.length;f<h;f++)u.add(l[f]);if(r.name&&(u.userData.name=r.name,u.name=o),Qn(u,r),r.extensions&&ss(i,u,r),r.matrix!==void 0){const f=new Ot;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,i=this.json.scenes[t],s=this,r=new De;i.name&&(r.name=s.createUniqueName(i.name)),Qn(r,i),i.extensions&&ss(e,r,i);const o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,f=c.length;u<f;u++){const h=c[u];h.parent!==null?r.add(kR(h)):r.add(h)}const l=u=>{const f=new Map;for(const[h,d]of s.associations)(h instanceof Gn||h instanceof Xe)&&f.set(h,d);return u.traverse(h=>{const d=s.associations.get(h);d!=null&&f.set(h,d)}),f};return s.associations=l(r),r})}_createAnimationTracks(t,e,i,s,r){const o=[],a=t.name?t.name:t.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Hi[r.path]===Hi.weights?(l(t),t.isGroup&&t.children.forEach(l)):c.push(a);let u;switch(Hi[r.path]){case Hi.weights:u=po;break;case Hi.rotation:u=mo;break;case Hi.translation:case Hi.scale:u=tc;break;default:i.itemSize===1?u=po:u=tc;break}const f=s.interpolation!==void 0?lC[s.interpolation]:ro,h=this._getArrayFromAccessor(i);for(let d=0,p=c.length;d<p;d++){const v=new u(c[d]+"."+Hi[r.path],e.array,h,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),o.push(v)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const i=th(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*i;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(i){const s=this instanceof mo?cC:Vg;return new s(this.times,this.values,this.getValueSize()/3,i)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vC(n,t,e){const i=t.attributes,s=new Ci;if(i.POSITION!==void 0){const a=e.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=th(Ks[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new P,c=new P;for(let l=0,u=r.length;l<u;l++){const f=r[l];if(f.POSITION!==void 0){const h=e.json.accessors[f.POSITION],d=h.min,p=h.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),h.normalized){const v=th(Ks[h.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new Pn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function im(n,t,e){const i=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(const o in i){const a=ju[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(t.indices!==void 0&&!n.index){const o=e.getDependency("accessor",t.indices).then(function(a){n.setIndex(a)});s.push(o)}return ne.workingColorSpace!==yn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ne.workingColorSpace}" not supported.`),Qn(n,t),vC(n,t,e),Promise.all(s).then(function(){return t.targets!==void 0?hC(n,t.targets,e):n})}const xC=2.15,_C=[Math.PI/2,0,0],MC=[new P(1,0,0),new P(0,1,0),new P(0,0,1)];class Ys{static q=new Ae;bone;rest;axes;cur=[0,0,0];constructor(t){this.bone=t,this.rest=t.quaternion.clone();const e=t.getWorldQuaternion(new Ae).invert();this.axes=MC.map(i=>i.clone().applyQuaternion(e))}static t=[0,0,0];set(t,e,i,s){const r=Ys.t;r[0]=t,r[1]=e,r[2]=i,this.bone.quaternion.copy(this.rest);for(let o=0;o<3;o++)this.cur[o]+=(r[o]-this.cur[o])*s,this.cur[o]&&this.bone.quaternion.multiply(Ys.q.setFromAxisAngle(this.axes[o],this.cur[o]))}}function yC(n){const t=h=>h.getWorldPosition(new P),e=h=>h.children.filter(d=>d.isBone),i=h=>{const d=[h];for(let p=e(h);p.length===1;p=e(p[0]))d.push(p[0]);return d},s=[];n.traverse(h=>{h.isBone&&s.push(h)});const r=s[0];if(!r)return null;const o=e(r).sort((h,d)=>t(d).z-t(h).z);if(o.length<3)return null;const a=i(o[0]),c=a[a.length-1],l=e(c).sort((h,d)=>Math.abs(t(h).x)-Math.abs(t(d).x));if(l.length<3)return null;const u=(h,d)=>({side:Math.sign(t(h).x),j:d(i(h)).map(p=>new Ys(p))}),f=o.slice(-2);return{spine:a.map(h=>new Ys(h)),neck:i(l[0]).slice(0,2).map(h=>new Ys(h)),arms:l.slice(-2).map(h=>u(h,d=>d.length>=4?d.slice(1,4):d.slice(0,3))),legs:f.map(h=>u(h,d=>d.slice(0,3))),toes:f.map(h=>i(h).at(-1)),ankles:f.map(h=>i(h)[2]??i(h).at(-1)),hands:l.slice(-2).map(h=>i(h).at(-1))}}const Wg={value:0};function bC(n){const t=new Pi({map:n.map,roughness:.78,metalness:0,side:we});return t.onBeforeCompile=e=>{e.uniforms.uHurt=Wg,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},t}function SC(){const n=new rn({color:new ct(.06,.02,.05),side:Qe});return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * 0.011;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function wC(n,t=!0){return new OR().loadAsync("models/pilot.glb").then(e=>{const i=e.scene,s=[];i.traverse(a=>{const c=a;c.isSkinnedMesh&&(c.material=bC(c.material),c.frustumCulled=!1,s.push(c))});for(const a of t?s:[]){const c=new _0(a.geometry,SC());c.bind(a.skeleton,a.bindMatrix),c.frustumCulled=!1,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent?.add(c)}const r=new De;r.rotation.set(..._C),r.scale.setScalar(xC),r.position.set(0,0,.12),r.add(i),r.updateMatrixWorld(!0);const o=yC(i);for(const a of n.body.children)a.visible=!1;if(n.body.add(r),!o){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}n.feet=o.toes,n.ankles=o.ankles,n.tips=o.hands,n.animate=(a,c,l,u,f)=>{const h=1-Math.exp(-f*12),d=Math.min(1,Math.max(0,(1-c)/.2)),p=Math.min(1,Math.max(0,(c-1)/.06)),v=7*l;for(const{side:g,j:m}of o.arms){const M=.07+.16*p-.08*d;m.forEach((b,x)=>{const _=Math.sin(a*v-x*.8+(g>0?.4:0))*(.025+.02*x),S=x===0?.5*d-.12*p:x===1?.18*d:.08*d;b.set(0,g*S,g*((x===0?M:0)+_),h)})}for(const{side:g,j:m}of o.legs){const[M,b,x]=m;M?.set(-.05*p,-g*(.06+.08*p-.14*d)+.07*u,0,h),b?.set(-(.08+.3*p+Math.sin(a*v*.5+g)*.03),0,0,h),x?.set(1.15,0,0,h)}o.spine.forEach((g,m)=>g.set(Math.sin(a*1.7+m)*.015-.06*p,.07*u,0,h)),o.neck.forEach((g,m)=>g.set(m===0?-(.3+.1*d):-.22,m===0?.05*u:0,0,h))}}).catch(e=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",e))}const Gi=18,sm=.075,TC=.035;function EC(){const n=new Float32Array(2*Gi*2*3),t=new Float32Array(2*Gi*2*4),e=new Uint16Array(2*(Gi-1)*6);for(let u=0,f=0;u<2;u++)for(let h=0;h<Gi-1;h++){const d=(u*Gi+h)*2;e.set([d,d+1,d+2,d+1,d+3,d+2],f),f+=6}const i=new Kt;i.setAttribute("position",new wt(n,3)),i.setAttribute("color",new wt(t,4)),i.setIndex(new wt(e,1));const s=new Xt(i,new rn({vertexColors:!0,transparent:!0,blending:mn,depthWrite:!1,fog:!1}));s.frustumCulled=!1,s.renderOrder=5;const r=[[],[]],o=[],a=new P,c=new P,l=new P;return{mesh:s,update(u,f,h,d,p){for(let v=0;v<2;v++){const g=r[v],m=u[v];if(h&&m){const b=(g.length>=Gi?g.pop():o.pop())??{p:new P,t:0};m.getWorldPosition(b.p),b.t=f,g.unshift(b)}for(;g.length&&f-g[g.length-1].t>sm;)o.push(g.pop());const M=g.length;for(let b=0;b<Gi;b++){const x=(v*Gi+b)*2;if(b>=M||M<2){x>=2&&n.copyWithin(x*3,(x-2)*3,x*3),t.fill(0,x*4,x*4+8);continue}const _=g[b],S=Math.min(1,(f-_.t)/sm);b+1<M?a.subVectors(_.p,g[b+1].p):a.subVectors(g[b-1].p,_.p),l.subVectors(p,_.p),c.crossVectors(a,l).normalize().multiplyScalar(TC*(1-.85*S));const w=x*3;n[w]=_.p.x+c.x,n[w+1]=_.p.y+c.y,n[w+2]=_.p.z+c.z,n[w+3]=_.p.x-c.x,n[w+4]=_.p.y-c.y,n[w+5]=_.p.z-c.z;const y=(1-S)**2*Math.min(1,S*8+.35)*(.22+.3*d),T=x*4;t[T]=t[T+4]=1,t[T+1]=t[T+5]=.95,t[T+2]=t[T+6]=.86,t[T+3]=t[T+7]=y}}i.attributes.position.needsUpdate=!0,i.attributes.color.needsUpdate=!0}}}const Fa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class hr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const AC=new Ao(-1,1,1,-1,0,1);class RC extends Kt{constructor(){super(),this.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Zt([0,2,0,0,2,0],2))}}const CC=new RC;class rf{constructor(t){this._mesh=new Xt(CC,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,AC)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class eh extends hr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof re?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gn.clone(t.uniforms),this.material=new re({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new rf(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class rm extends hr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class PC extends hr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class LC{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ot);this._width=i.width,this._height=i.height,e=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new eh(Fa),this.copyPass.material.blending=si,this.timer=new Py}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}rm!==void 0&&(o instanceof rm?i=!0:o instanceof PC&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const wa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class NC extends hr{constructor(){super(),this.isOutputPass=!0,this.uniforms=gn.clone(wa.uniforms),this.material=new F0({name:wa.name,uniforms:this.uniforms,vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader}),this._fsQuad=new rf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===fh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ph?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===cc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===gh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===vh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===mh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class IC extends hr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ct}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const DC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class sr extends hr{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new ot(t.x,t.y):new ot(256,256),this.clearColor=new ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new un(r,o,{type:dn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new un(r,o,{type:dn,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new un(r,o,{type:dn,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}const a=DC;this.highPassUniforms=gn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new re({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ot(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gn.clone(Fa.uniforms),this.blendMaterial=new re({uniforms:this.copyUniforms,vertexShader:Fa.vertexShader,fragmentShader:Fa.fragmentShader,premultipliedAlpha:!0,blending:mn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ct,this._oldClearAlpha=1,this._basic=new rn,this._fsQuad=new rf(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ot(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=sr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=sr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],c=o+1<t?e[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new re({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new re({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}sr.BlurDirectionX=new ot(1,0);sr.BlurDirectionY=new ot(0,1);const Xg=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,UC={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new ot(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0}},vertexShader:Xg,fragmentShader:`
uniform sampler2D tDiffuse;
uniform vec2 uSun;
uniform float uSunVisible;
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
  gl_FragColor = vec4(max(col, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`},FC={uniforms:{tDiffuse:{value:null},uTexel:{value:new ot(1/1280,1/720)}},vertexShader:Xg,fragmentShader:`
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
}`};function kC(n,t,e,i,s){n.toneMapping=cc,n.toneMappingExposure=1;const r=new LC(n);r.addPass(new IC(t,e));const o=new sr(new ot(256,256),.35,.5,1.4);r.addPass(o);const a=new eh(UC);r.addPass(a);const c=new NC;r.addPass(c);let l=!1;const u=(g,m)=>{l=m,o.enabled=g.bloom&&!m,c.enabled=o.enabled,a.material.defines.SHAFT_N=m?Math.min(g.shafts,8):g.shafts,a.material.defines.SPEED_BLUR=g.speedBlur&&!m?1:0,a.material.needsUpdate=!0};u(s,!1);const f=new eh(FC);f.enabled=!1,r.addPass(f);const h=new P(i.x,i.y,i.z);let d=1;const p=new P,v=new P;return{render(){e.getWorldDirection(v),p.copy(h).multiplyScalar(1e4).add(e.position).project(e);const g=v.dot(h);a.uniforms.uSun.value.set(p.x*.5+.5,p.y*.5+.5),a.uniforms.uSunVisible.value=d*Math.max(0,Math.min(1,(g-.2)/.4)),r.render()},setSize(g,m){r.setSize(g,m),o.resolution.set(g/2,m/2),a.uniforms.uAspect.value=g/m;const M=n.getPixelRatio();f.uniforms.uTexel.value.set(1/(g*M),1/(m*M))},setPixelRatio(g){r.setPixelRatio(g)},setLite(){return l||!s.bloom&&s.shafts<=8&&!s.speedBlur?!1:(u(s,!0),!0)},togglePainterly(){return f.enabled=!f.enabled,f.enabled},painterly:()=>f.enabled,setSpeed(g){a.uniforms.uSpeed.value=g},setDanger(g){a.uniforms.uDanger.value=g},setSun(g,m){h.set(g.x,g.y,g.z),d=m}}}function OC(n,t){const e=new OT({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,t)),e.setSize(n.clientWidth,n.clientHeight),e.info.autoReset=!1,n.appendChild(e.domElement);const i=new cM,s=new ln(60,n.clientWidth/n.clientHeight,.5,7e4),r=new H0(16777215,2.4),o=new yy(16777215,16777215,1.3);return i.add(r,r.target,o),{renderer:e,scene:i,camera:s,sun:r,hemi:o}}const BC=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function zC(n){return`
uniform float uDusk;
uniform float uMorn;
${Eg(n,"uDusk","uMorn")}
${mc}
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
}`}function HC(n){const t=new re({vertexShader:BC,fragmentShader:zC(n),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:Qe,depthWrite:!1,depthTest:!1,fog:!1}),e=new Xt(new us(1e3,48,24),t);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(i,s,r,o){e.position.copy(i.position),t.uniforms.uTime.value=s,t.uniforms.uDusk.value=r,t.uniforms.uMorn.value=o}}}function GC(){return new re({vertexShader:`
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
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.5);
  gl_FragColor = vec4(vCol * (0.06 + 1.5 * f), 1.0);
}`,transparent:!0,blending:mn,depthWrite:!1})}function VC(){return new re({vertexShader:`
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
  float core = exp(-r2 * 16.0) * 2.2 + exp(-r2 * 3.5) * 0.35;
  float rays = exp(-abs(p.y) * 38.0) * (1.0 - smoothstep(0.1, 1.0, abs(p.x)))
             + exp(-abs(p.x) * 38.0) * (1.0 - smoothstep(0.1, 1.0, abs(p.y)));
  vec2 d = vec2(p.x + p.y, p.x - p.y) * 0.7071;
  float diag = exp(-abs(d.y) * 50.0) * (1.0 - smoothstep(0.0, 0.55, abs(d.x)))
             + exp(-abs(d.x) * 50.0) * (1.0 - smoothstep(0.0, 0.55, abs(d.y)));
  gl_FragColor = vec4(vCol * (core + rays * 0.95 + diag * 0.55), 1.0);
}`,transparent:!0,blending:mn,depthWrite:!1})}const nh=12,om=new ct(1,.72,.28),WC=new ct(1,.86,.5);function Xl(n,t){const e=new Be(n,t,nh);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new ct(0,0,0)),e}function XC(){const n=Xl(new Hh(.82,1,40),new rn({transparent:!0,blending:mn,depthWrite:!1,fog:!1,side:we})),t=Xl(new Wn(2,2),VC()),e=Xl(new _s(1,2),GC()),i={ring:n,flare:t,shell:e},s=[],r=new Ot,o=new Ae,a=new P,c=new P,l=new ct,u=new P(0,0,1),f=h=>{s.length>=nh*3&&s.shift(),s.push(h)};return{mesh:n,star:t,shell:e,spawn(h,d,p){f({part:"ring",x:h,y:d,z:p,t:0,dur:.35,r0:.6,r1:3.4,color:om}),f({part:"shell",x:h,y:d,z:p,t:0,dur:.45,r0:.4,r1:3.2,color:om}),f({part:"flare",x:h,y:d,z:p,t:0,dur:.42,r0:.6,r1:3,color:WC})},update(h,d){const p={ring:0,flare:0,shell:0};for(let v=s.length-1;v>=0;v--){const g=s[v];if(g.t+=h,g.t>=g.dur||p[g.part]>=nh){s.splice(v,1);continue}g.z+=d*h;const m=g.t/g.dur,M=g.r0+(g.r1-g.r0)*(1-(1-m)*(1-m)),b=(1-m)*(1-m)*1.1,x=g.part==="flare"?o.setFromAxisAngle(u,m*2.2):o.identity();r.compose(a.set(g.x,g.y,g.z),x,c.set(M,M,M));const _=i[g.part];_.setMatrixAt(p[g.part],r),_.setColorAt(p[g.part]++,l.copy(g.color).multiplyScalar(b))}for(const v of["ring","flare","shell"]){const g=i[v];g.count=p[v],g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0)}}}}const am=4,cm=36,qC={rock:[new ct(.42,.33,.36),new ct(.3,.24,.28),new ct(.24,.3,.16)],cloth:[new ct(.8,.1,.08),new ct(.95,.66,.1),new ct(.5,.33,.2)],village:[new ct(.62,.22,.12),new ct(.55,.3,.2),new ct(.85,.7,.35)]},$C=()=>new re({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function KC(){const n=new Be(new Wn(2,2),$C(),am),t=new Be(new _s(1,0),new rr,cm);for(const u of[n,t])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new ct);n.renderOrder=8;const e=[],i=[];let s=0;const r=new Ot,o=new Ae,a=new P,c=new P,l=new ct;return{stars:n,chips:t,danger:()=>s,spawn(u,f,h,d,p){e.length>=am&&e.shift(),e.push({x:u,y:f,z:h,t:0,dur:p?.42:.3,r0:p?1.4:.9,r1:p?5.2:3.2,seed:Math.random(),follow:!p});const v=p?22:10;for(let g=0;g<v;g++){i.length>=cm&&i.shift();const m=Math.random()*Math.PI*2,M=(p?7:5)+Math.random()*7,b=qC[d];i.push({x:u,y:f,z:h,t:0,life:.9+Math.random()*.6,size:(p?.22:.16)+Math.random()*(p?.38:.22),vx:Math.cos(m)*M,vy:Math.sin(m)*M*.8+4,vz:-(3+Math.random()*8),spin:new P(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:b[g%b.length]})}s=Math.max(s,p?1:.75)},update(u,f){s=Math.max(0,s-u*1.4);let h=0;for(let d=e.length-1;d>=0;d--){const p=e[d];p.t+=u;const v=p.t/p.dur;if(v>=1){e.splice(d,1);continue}p.follow&&(p.z+=f*u);const g=p.r0+(p.r1-p.r0)*(1-(1-v)**3);r.compose(a.set(p.x,p.y,p.z),o.identity(),c.set(g,g,g)),n.setMatrixAt(h,r),n.setColorAt(h++,l.setRGB(Math.min(1,(1-v)*1.6),p.seed,v))}n.count=h,h=0;for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.t+=u,p.t>=p.life){i.splice(d,1);continue}p.vy-=16*u,p.x+=p.vx*u,p.y+=p.vy*u,p.z+=p.vz*u;const v=p.size*Math.min(1,(p.life-p.t)/.25);o.setFromAxisAngle(p.spin,p.t*9),r.compose(a.set(p.x,p.y,p.z),o,c.set(v,v*.7,v*1.2)),t.setMatrixAt(h,r),t.setColorAt(h++,p.color)}t.count=h;for(const d of[n,t])d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0)}}}const kn=90,YC=1.4,ZC=`
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
}`,JC=`
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
}`;function QC(){const n=[0,1].map(()=>({p:Array.from({length:kn},()=>new P),age:new Float32Array(kn).fill(1)})),t=2*kn*2,e=new Float32Array(t*3),i=new Float32Array(t).fill(1),s=new Float32Array(t),r=[];for(let h=0;h<2;h++)for(let d=0;d<kn;d++){const p=(h*kn+d)*2;s[p]=-1,s[p+1]=1,d<kn-1&&r.push(p,p+1,p+2,p+1,p+3,p+2)}const o=new Kt;o.setAttribute("position",new wt(e,3)),o.setAttribute("aAge",new wt(i,1)),o.setAttribute("aSide",new wt(s,1)),o.setIndex(r);const a=new re({vertexShader:ZC,fragmentShader:JC,uniforms:gn.merge([lt.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:we,fog:!0}),c=new Xt(o,a);c.frustumCulled=!1,c.renderOrder=3;const l=new P,u=new P,f=new P;return{points:c,update(h,d,p,v){n.forEach((g,m)=>{for(let M=0;M<kn;M++)g.age[M]=Math.min(1,g.age[M]+d/YC);if(p&&d>0){const M=g.p.pop();g.p.unshift(M.copy(h[m])),g.age.copyWithin(1,0,kn-1),g.age[0]=0}for(let M=0;M<kn;M++){const b=g.p[M],x=g.p[Math.min(kn-1,M+1)];l.subVectors(b,x),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(v,b),f.crossVectors(l,u).normalize();const _=.06+.5*g.age[M],S=(m*kn+M)*2;e.set([b.x-f.x*_,b.y-f.y*_,b.z-f.z*_],S*3),e.set([b.x+f.x*_,b.y+f.y*_,b.z+f.z*_],(S+1)*3),i[S]=i[S+1]=g.age[M]}}),o.getAttribute("position").needsUpdate=!0,o.getAttribute("aAge").needsUpdate=!0}}}const rs=120,jC=40,tP=120,eP=9,nP=30,ql=.11;function iP(){const n=new Float32Array(rs*3),t=new Float32Array(rs*6),e=new Kt;e.setAttribute("position",new wt(t,3));const i=new Float32Array(rs*6);for(let h=0;h<rs;h++)i.set([1,1,1,0,0,0],h*6);e.setAttribute("color",new wt(i,3));const s=new Ih({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:mn,depthWrite:!1,fog:!1}),r=new y0(e,s);r.frustumCulled=!1,r.renderOrder=5;let o=!1;const a=new P,c=new P,l=new P,u=new P,f=(h,d,p)=>{const v=jC+Math.random()*tP*p,g=eP+(1-Math.random()**2)*nP,m=Math.random()*Math.PI*2;u.copy(d).addScaledVector(a,v).addScaledVector(c,Math.cos(m)*g).addScaledVector(l,Math.sin(m)*g),n[h*3]=u.x,n[h*3+1]=u.y,n[h*3+2]=u.z};return{object:r,update(h,d,p){if(s.opacity=Math.min(.5,.42*p),r.visible=p>.02,e.setDrawRange(0,2*Math.round(rs*Math.min(1,p))),!r.visible)return;const v=d.length();if(v<1)return;a.copy(d).divideScalar(v),c.set(a.z,0,-a.x).normalize(),l.crossVectors(c,a);const g=h.position;if(!o){for(let m=0;m<rs;m++)f(m,g,1);o=!0}for(let m=0;m<rs;m++){u.set(n[m*3]-g.x,n[m*3+1]-g.y,n[m*3+2]-g.z),(u.dot(a)<-4||u.lengthSq()>36100)&&f(m,g,1);const b=m*6,x=n[m*3],_=n[m*3+1],S=n[m*3+2];t[b]=x,t[b+1]=_,t[b+2]=S,t[b+3]=x-d.x*ql,t[b+4]=_-d.y*ql,t[b+5]=S-d.z*ql}e.attributes.position.needsUpdate=!0}}}const Nr=256,lm=5,sP=-2e3,rP=400;function oP(n,t,e){let i=0;for(const[s,r]of[[1,41],[1.37,43]]){const o=Math.max(12,Math.round(2*Math.PI*e/((1800+700*t)*s))),a=n/(2*Math.PI)*o,c=Math.floor(a),l=.5+.3*(ut(c,t,r)-.5),u=Math.max(0,1-Math.abs(a-c-l)*2.2),f=(220+140*t)*(.45+.55*ut(c,t,r+1));i=Math.max(i,f*u*u*(3-2*u))}return i}const aP=`
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
}`,cP=`
#include <fog_pars_fragment>
uniform float uFar;
${lh}
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
  vec3 col = mix(uColor, uFoot, smoothstep(0.0, mix(700.0, 260.0, uRegionHg), below) * mix(0.7, 0.9, uRegionHg));
  // Viền mép trên: sống núi phía mặt trời sáng rực (backlight), phía kia chỉ hơi sáng.
  vec3 dir = normalize(vFogWorld - cameraPosition);
  float edge = 1.0 - smoothstep(0.0, 30.0, below);
  col += ATM_GLOW * edge * (0.15 + 1.4 * pow(max(dot(dir, ATM_SUN_DIR), 0.0), 4.0));
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;class lP{rings=[];next=0;heightAt;constructor(t,e,i){this.heightAt=e;for(let s=0;s<i.length-1;s++){const r=s/(i.length-2),o=new re({vertexShader:aP,fragmentShader:cP,uniforms:gn.merge([lt.fog,{uFar:{value:.25+.6*r}}]),fog:!0});o.uniforms.uRegionHg=bo;const a=new Xt(new Kt,o);a.frustumCulled=!1,t.add(a),this.rings.push({inner:i[s],outer:i[s+1],mesh:a,anchorX:NaN,anchorZ:NaN})}}update(t,e,i=!1){for(let s=0;s<this.rings.length;s++){const r=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,(Math.hypot(t-r.anchorX,e-r.anchorZ)>rP||Number.isNaN(r.anchorX))&&(this.rebuild(r,t,e),!i))return}}rebuild(t,e,i){const s=new Float32Array((Nr+1)*2*3),r=new Float32Array((Nr+1)*2);for(let c=0;c<=Nr;c++){const l=c/Nr*Math.PI*2,u=Math.sin(l),f=Math.cos(l);let h=-1/0;for(let p=0;p<lm;p++){const v=t.inner+(t.outer-t.inner)*p/lm;h=Math.max(h,this.heightAt(e+u*v,i+f*v))}So()>.5&&(h+=oP(l,this.rings.indexOf(t),t.inner));const d=t.inner;s.set([u*d,h,f*d,u*d,sP,f*d],c*6),r[c*2]=h,r[c*2+1]=h}const o=[];for(let c=0;c<Nr;c++){const l=c*2;o.push(l,l+2,l+1,l+2,l+3,l+1)}const a=new Kt;a.setAttribute("position",new wt(s,3)),a.setAttribute("aTop",new wt(r,1)),a.setIndex(o),t.mesh.geometry.dispose(),t.mesh.geometry=a,t.mesh.position.set(e,0,i),t.anchorX=e,t.anchorZ=i}}const Ir={h:0,s:0,lat:0,vil:0};function uP(n,t,e,i,s){const r=i/s,o=s+3,a=new Float32Array(o*o),c=new Float32Array(o*o*3);for(let _=0;_<o;_++)for(let S=0;S<o;S++)n(t+(S-1)*r,e+(_-1)*r,Ir),a[_*o+S]=Ir.h,c.set([Ir.s,Ir.lat,Ir.vil],(_*o+S)*3);const l=(_,S)=>a[(S+1)*o+(_+1)],u=s+1,f=s*4,h=u*u+f,d=new Float32Array(h*3),p=new Float32Array(h*3),v=new Float32Array(h*3),g=(_,S,w,y)=>{v.set(c.subarray(((w+1)*o+(S+1))*3,((w+1)*o+(S+2))*3),_*3);const T=(l(S+1,w)-l(S-1,w))/(2*r),R=(l(S,w+1)-l(S,w-1))/(2*r),C=1/Math.hypot(T,1,R);d[_*3]=S*r,d[_*3+1]=l(S,w)-y,d[_*3+2]=w*r,p[_*3]=-T*C,p[_*3+1]=C,p[_*3+2]=-R*C};for(let _=0;_<u;_++)for(let S=0;S<u;S++)g(_*u+S,S,_,0);const m=[];for(let _=0;_<s;_++)m.push(_);for(let _=0;_<s;_++)m.push(_*u+s);for(let _=s;_>0;_--)m.push(s*u+_);for(let _=s;_>0;_--)m.push(_*u);const M=r*3+25;m.forEach((_,S)=>g(u*u+S,_%u,Math.floor(_/u),M));const b=[];for(let _=0;_<s;_++)for(let S=0;S<s;S++){const w=_*u+S;b.push(w,w+u,w+1,w+1,w+u,w+u+1)}for(let _=0;_<f;_++){const S=m[_],w=m[(_+1)%f],y=u*u+_,T=u*u+(_+1)%f;b.push(S,w,y,w,T,y)}const x=new Kt;return x.setAttribute("position",new wt(d,3)),x.setAttribute("normal",new wt(p,3)),x.setAttribute("aTrack",new wt(v,3)),x.setIndex(h>65535?new wt(new Uint32Array(b),1):new wt(new Uint16Array(b),1)),x.computeBoundingSphere(),x}class hP{cache=new Map;shown=new Set;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(t,e,i,s){this.scene=t,this.sample=e,this.material=i,this.cfg=s}update(t,e,i=!1){this.computeWanted(t,e);const s=performance.now();for(const r of this.wanted)if(!this.cache.has(r.key)){if(!i&&performance.now()-s>this.cfg.buildBudgetMs)return;this.cache.set(r.key,this.build(r))}this.shown.size===this.wanted.length&&this.wanted.every(r=>this.shown.has(r.key))||this.swap()}stats(){let t=0;for(const s of this.shown)t+=this.cache.get(s)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(s=>!this.cache.has(s.key)).length,i=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,vertices:t,reach:i}}computeWanted(t,e){const i=[];for(let r=0;r<this.cfg.levels;r++){const o=this.cfg.baseSize*2**r,a=Math.floor(t/(2*o)),c=Math.floor(e/(2*o)),l=Math.floor(t/o),u=Math.floor(e/o);for(let f=2*c-2;f<=2*c+3;f++)for(let h=2*a-2;h<=2*a+3;h++)r>0&&Math.abs(h-l)<=1&&Math.abs(f-u)<=1||i.push({key:`${r}:${h}:${f}`,level:r,ix:h,iz:f})}const s=i.map(r=>r.key).join("|");s!==this.wantedSig&&(this.wantedSig=s,this.wanted=i)}build(t){const e=this.cfg.baseSize*2**t.level,i=t.ix*e,s=t.iz*e,r=t.level>=2?this.cfg.farSegs:this.cfg.segs,o=new Xt(uP(this.sample,i,s,e,r),this.material);return o.position.set(i,0,s),o.matrixAutoUpdate=!1,o.updateMatrix(),o}swap(){const t=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)t.has(e)||this.scene.remove(this.cache.get(e));for(const e of t)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,i]of this.cache)t.has(e)||(i.geometry.dispose(),this.cache.delete(e));this.shown=t}}const fP=`
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
`,dP=`
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

// Vách đá vôi theo toạ độ ngang h (chạy dọc vách) + y: rgb = màu đá đã có gờ cây bụi, a = độ lộ đá.
// lfw (độ mịn khe phân tầng) tính NGOÀI nhánh rẽ ở main — đạo hàm trong nhánh rẽ khác nhau là không xác định.
// hg (Hà Giang): đá xám lộ nhiều hơn, gờ cây bụi thưa hơn. BẪY (thử 02/11): rãnh "tai mèo" dọc vách 3,4 m — nhìn xa
// lấp lánh thành LƯỚI như vách căng lưới, nhìn gần thành rèm vải xếp nếp. Bỏ; concept 1b là khối đá nứt + bụi cây.
vec4 rockFace(float h, float y, float slope, float lfw, vec3 forest, float hg) {
  float exposure = gnNoise(vec2(h / 70.0, y / 180.0)) + (slope - 0.75) * 0.9 + 0.15 * hg;
  float lc = y / 38.0 + gnNoise(vec2(h, 0.0) / 120.0) * 1.6;
  float lf = fract(lc);
  float ledgeFade = 1.0 - smoothstep(0.25, 0.6, lfw);
  float ledge = smoothstep(0.55, 0.66, lf) * (1.0 - smoothstep(0.9, 0.97, lf)) * smoothstep(0.35, 0.6, gnNoise(vec2(h / 25.0, lc * 0.37)));
  float stain = gnNoise(vec2(h / 9.0, y / 160.0));
  float t = (0.55 + 0.25 * lf * ledgeFade + 0.12 * (1.0 - ledgeFade)) * (0.7 + 0.3 * stain);
  vec3 rock = mix(srgb(mix(ROCK_SHADE, HG_ROCK_SHADE, hg)), srgb(mix(ROCK, HG_ROCK, hg)), t);
  return vec4(mix(rock, forest, ledge * ledgeFade * (1.0 - 0.3 * hg)), exposure);
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
vec2 riverMask(float s, float lat, float rfw, float floorK, float hg) {
  float rl = abs(lat - mix(6.0, 3.0, hg) * sin(s / 140.0) - 2.5 * sin(s / 47.0 + 1.7));
  float hw = mix(3.2 + 1.6 * gnNoise(vec2(s / 80.0, 7.0)), 15.0 + 5.0 * gnNoise(vec2(s / 120.0, 7.0)), hg);
  float fw = rfw * 1.5 + 0.05;
  float water = (1.0 - smoothstep(hw - fw, hw + fw, rl)) * floorK;
  return vec2(water, max(0.0, (1.0 - smoothstep(hw + 1.6, hw + 2.6 + fw, rl)) * floorK - water));
}

// Màu nước SAU chiếu sáng: nước sâu tối + phản trời theo Fresnel (nhìn sượt = gương trời) + loé nắng trên gợn tĩnh (bay
// 60 m/s thì gợn tĩnh cũng lấp lánh) + vũng đèn trời phản lên mặt nước ban đêm. Hà Giang: sông Nho Quế XANH NGỌC — thân
// nước sáng + phản trời ngả ngọc (thân tối như suối Khau Phạ thì chỉ còn gương trời, mất màu sông đặc trưng của vùng).
vec3 riverColor(vec3 w, vec3 V, vec3 pools, float hg) {
  vec2 q = w.xz / 3.0;
  float r0 = gnNoise(q);
  vec3 nr = normalize(vec3((gnNoise(q + vec2(0.4, 0.0)) - r0) * 0.6, 1.0, (gnNoise(q + vec2(0.0, 0.4)) - r0) * 0.6));
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(nr, V), 0.0), 5.0);
  vec3 sky = mix(ATM_SKY_AMBIENT * 1.3, ATM_SKY_HORIZON_SUN, smoothstep(0.2, 0.9, 1.0 - V.y));
  sky = mix(sky, sky * vec3(0.55, 1.0, 0.92), 0.5 * hg);
  vec3 deep = srgb(mix(vec3(0.06, 0.14, 0.15), vec3(0.13, 0.44, 0.43), hg)) * (ATM_SKY_AMBIENT + ATM_SUN_LIGHT * 0.35);
  float glint = pow(max(dot(reflect(-V, nr), ATM_SUN_DIR), 0.0), 60.0);
  // Hà Giang bay SÁT nước (13 m) nên nhìn sượt suốt đoạn sông: gương trời + loé nắng phủ gần hết mặt nước, "tương phản hơi
  // chói" (anh Đức 02/11 khuya). Hà Giang: thân nước sẫm hơn chút, phản trời còn 70%, loé nắng còn một nửa. Khau Phạ giữ số cũ.
  return mix(deep, sky, fres * mix(1.0, 0.7, hg)) + ATM_SUN_LIGHT * glint * mix(2.5, 1.2, hg) + pools * 0.6;
}
`,pP=`
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
}`,mP=`
#include <fog_pars_fragment>
${mc}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;

${lh}
${dP}
${fP}
${X3}

void main() {
  vec3 n = normalize(vNormal);
  float slope = 1.0 - n.y;
  float y = vWorld.y;
  vec2 xz = vWorld.xz;
  float hg = uRegionHg;  // vùng của map (world/region.ts): 1 = Hà Giang
  float patchN = gnNoise(xz / 260.0) * 0.65 + gnNoise(xz / 61.0) * 0.35;
  float dist = length(cameraPosition - vWorld);
  if (dist > uMaxDist) discard;  // địa hình thật là đĩa quanh camera; ngoài đĩa là các lớp núi cách điệu
  float near = 1.0 - smoothstep(1500.0, 5000.0, dist);
  // Toạ độ tô: mặt bằng thì xz; vách đứng thì (z, y) / (x, y) theo hướng vách (biplanar). BẪY 1: dùng xz cho vách →
  // nhiễu bị kéo dọc thành vệt sọc hội tụ như nhoè chuyển động. BẪY 2 (adviser 01/11): TRỘN TOẠ ĐỘ theo độ dốc
  // (mix(xz, (x+z, y), w)) — toạ độ tuyệt đối hàng nghìn mét nên w đổi chút là uv trượt hàng trăm mét → vân xoáy, vòng
  // đồng mức trên sườn (n-2150, n-3000). Giờ lấy mẫu riêng từng mặt rồi trộn KẾT QUẢ. BẪY 3: (x+z, y) suy biến ở vách
  // quay hướng (1, 1) (x+z hằng số) → sọc dọc (n-700, n-1450) — biplanar theo |n.x|, |n.z| không suy biến.
  float wall = smoothstep(0.35, 0.7, slope);
  vec2 bw = abs(n.xz) + 1e-3;
  bw /= bw.x + bw.y;

  // Rừng: nền tối + vệt cọ sáng, mờ dần theo khoảng cách (chống lấp lánh). Gần thêm tầng 1,6 m + giảm tương phản:
  // bay sát vách 10–30 m, tầng 7 m một mình thành ô vuông vỡ hạt.
  float dabFlat = 0.5;
  float dabWall = 0.5;
  if (wall < 0.99) dabFlat = dabAt(xz, near);
#ifdef TERRAIN_LITE
  // Máy yếu: một mặt chiếu (trục trội) thay vì hai — vách chéo 45° có đường nối, đổi lấy ~1/2 phép nhiễu của vách.
  if (wall > 0.01) dabWall = dabAt(bw.x > bw.y ? vec2(vWorld.z, y * 1.6) : vec2(vWorld.x, y * 1.6), 0.0);
#else
  if (wall > 0.01) dabWall = dabAt(vec2(vWorld.z, y * 1.6), near) * bw.x + dabAt(vec2(vWorld.x, y * 1.6), near) * bw.y;
#endif
  float dab = mix(dabFlat, dabWall, wall);
  // Vách GẦN (≤ ~200 m): tương phản hẹp hơn → mảng cọ có MÉP (mảng mềm đọc thành vách nhoè như chụp rung, n-1450).
  // BẪY 01/11: tán cây bằng ô Voronoi 3,5 m → DA RẮN — đừng dùng ô tế bào đều cho rừng.
  float crisp = (1.0 - smoothstep(60.0, 240.0, dist)) * smoothstep(0.25, 0.6, wall);
  float tone = mix(smoothstep(0.2, 0.9, mix(0.5, dab, near)), smoothstep(0.4, 0.64, dab), crisp);
  // Hà Giang: bụi cây trên đá thẫm hơn, ngả ô liu (concept 1b) — không phải rừng xanh mướt Khau Phạ.
  vec3 forest = mix(srgb(FOREST_DARK), srgb(FOREST_LIGHT), tone) * mix(vec3(1.0), vec3(0.86, 0.84, 0.72), hg);
  vec3 albedo = forest;

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
  albedo = mix(albedo, paddy, terrace);

  // Toạ độ theo đường bay: quãng s, lệch ngang lat, độ làng của nhánh GẦN NHẤT — terrain-height.ts tính lúc dựng ô
  // (thuộc tính aTrack). Trước 02/11 shader tự tính centerX(z) + villageAmount bằng hằng số chép tay; đường quay đầu thì
  // một z có nhiều nhánh nên công thức theo z hết đúng. BẪY: ở đường phân thuỷ giữa hai nhánh s nhảy hàng trăm m trong
  // một tam giác — mọi vân theo s phải tắt theo fwidth (bờ thửa / hàng lúa đã có), không thì thành dải nén sọc.
  float ts = vTrack.x;
  float lat = vTrack.y;
  float vil = vTrack.z;

  // Đáy thung lũng (terrain-field-lib floorFields). fwidth tính NGOÀI nhánh if.
  float floorMask = (1.0 - smoothstep(0.02, 0.06, slope)) * (1.0 - smoothstep(120.0, 220.0, y));
  float fwf = max(fwidth(lat / 20.0), fwidth(ts / 60.0)) * 1.15;
  if (floorMask > 0.001) albedo = mix(albedo, floorFields(xz, ts, lat, fwf, dist, hg), floorMask);

  // Suối đáy khe / sông thung lũng (terrain-shader-lib riverMask): bờ sỏi tô vào albedo, nước tô SAU chiếu sáng.
  // Hà Giang: sông nhìn từ gờ A cách ~350 m, từ đỉnh cùi chỏ leo ~600 m — giữ tới 1,4 km (Khau Phạ 900 m như cũ).
  vec2 river = riverMask(ts, lat, fwidth(lat), (1.0 - smoothstep(0.02, mix(0.05, 0.12, hg), slope)) * (1.0 - vil) * (1.0 - smoothstep(mix(600.0, 1000.0, hg), mix(900.0, 1400.0, hg), dist)), hg);
  albedo = mix(albedo, srgb(vec3(0.56, 0.5, 0.42)) * (0.8 + 0.3 * gnNoise(xz / 0.8)), river.y);

  // LÀNG = cao nguyên lúa chín / tam giác mạch (track-path villageAmount qua aTrack; terrain-field-lib villageField).
  // fwidth PHẢI tính ngoài nhánh if (đạo hàm trong nhánh rẽ khác nhau giữa các điểm ảnh là không xác định — viền nhiễu
  // ở mép làng).
  float fwp = max(fwidth(lat / 17.0), fwidth(ts / 28.0)) * 1.15;
  float fwRows = fwidth(ts / 0.45);
  if (vil > 0.001) {
    vil *= (1.0 - smoothstep(240.0, 380.0, abs(lat))) * (1.0 - smoothstep(0.08, 0.2, slope));
    albedo = mix(albedo, villageField(xz, ts, lat, fwp, fwRows, dist, near, hg), vil);
  }

  // Vách đá vôi: tầng ngang ~38 m có gờ cây bụi + bóng dưới gờ (gờ thật trong lưới 10–16 m không làm được), đá chỉ lộ ở
  // chỗ thật dốc — vách X4 xanh nhiều hơn xám. Biplanar như vệt cọ (BẪY 3 ở trên), trộn KẾT QUẢ. Hà Giang: đá lộ từ dốc
  // thấp hơn hẳn (hẻm Nho Quế = vách đá trơ, ít cây — concept 1b) — làn bay đọc rõ hơn trên nền đá xám.
  float lfw = fwidth(y / 38.0) * 1.2;
  float rockMin = mix(0.76, 0.56, hg);
  if (slope > rockMin) {
    vec4 rf = rockBlend(vWorld, bw, slope, lfw, forest, hg);
    float rockMask = smoothstep(rockMin + 0.02, mix(0.95, 0.8, hg), slope) * smoothstep(mix(0.5, 0.36, hg), mix(0.7, 0.56, hg), rf.a);
    albedo = mix(albedo, rf.rgb, rockMask);
  }

  float ndl = dot(n, ATM_SUN_DIR);  // lambert bọc: mặt quay lưng mặt trời vẫn có khối
  vec3 pools = lanternPools(vWorld, n);  // vũng sáng đèn trời ban đêm (lantern-ground-light-pools.ts)
  float wrap = clamp((ndl + 0.3) / 1.3, 0.0, 1.0);
  float nightK = smoothstep(0.42, 0.95, atmT());
  // Đêm: ánh trời lên mặt PHẲNG (ngoài làng) giảm 45% → đất tối, đèn trời nổi lên. Làng giữ: tối đều cả khung hạ tương phản.
  vec3 light = ATM_SKY_AMBIENT * (0.45 + 0.35 * n.y) * (1.0 - 0.45 * nightK * smoothstep(0.6, 0.95, n.y) * (1.0 - vil))
             + ATM_SUN_LIGHT * wrap * 1.3 + ATM_BOUNCE * 0.25 * (1.0 - n.y) + atmNightFill(n) * 1.15 * (1.0 - 0.5 * vil)
             + pools;
  // Đêm: lá rừng không có kênh lam → ánh trăng lam vẫn ra đen: ngả albedo về xám lam. BẪY: ×2,2 / ngả 0,45 = bãi TUYẾT.
  albedo = mix(albedo, vec3(dot(albedo, vec3(0.3, 0.59, 0.11))) * vec3(0.85, 1.0, 1.2) + vec3(0.008, 0.014, 0.03), 0.32 * nightK);
  // Mặt SÁNG (lúa chín, ruộng bậc vàng) bị ánh trăng đẩy thành bãi tuyết (l6-4600, l6-5600) — đêm nén albedo sáng.
  albedo *= 1.0 - 0.5 * nightK * smoothstep(0.12, 0.45, dot(albedo, vec3(0.3, 0.59, 0.11)));
  vec3 col = albedo * light;
  vec3 V = (cameraPosition - vWorld) / max(dist, 0.001);
  if (river.x > 0.001) col = mix(col, riverColor(vWorld, V, pools, hg), river.x);

  // Viền ngược sáng: mặt nghiêng gần song song tia nhìn, khi nhìn về phía mặt trời → mép núi rực vàng.
  float rim = pow(1.0 - max(dot(n, V), 0.0), 4.0) * pow(max(dot(-V, ATM_SUN_DIR), 0.0), 3.0);
  // Mặt trời lặn thì viền ngược nắng cũng tắt (adviser 01/11): để nguyên thì mặt đất nhìn sượt về phía chân trời
  // đêm có một lớp cam rực như ban ngày (l7-4600) — đêm còn viền mỏng màu chân trời.
  col += mix(ATM_GLOW * 0.9, ATM_SKY_HORIZON_SUN * 0.25, nightK) * rim;

  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;function gP(n=1e9,t=!1){return new re({vertexShader:pP,fragmentShader:mP,defines:t?{TERRAIN_LITE:1}:{},uniforms:{...gn.merge([lt.fog,{uMaxDist:{value:n}}]),...sc,uRegionHg:bo},fog:!0})}const vP=6e3,xP=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function _P(n,t){const e=new hP(n,hg,gP(vP,t.lite),{baseSize:t.baseSize,segs:t.segs,farSegs:t.farSegs,levels:t.levels,buildBudgetMs:5}),i=new lP(n,Ze,xP);return{update(s,r){e.update(s.x,s.z,r),i.update(s.x,s.z,r)},statsLine(){const s=e.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const um=16,hm=3,Dr=1.8,fm=2.2,_i={x:0,v:0};function MP(n,t,e,i){_i.x=0,_i.v=0;for(const s of n.obstacles){const r=Ki[s.kind],o=s.z-t;if(o+r.halfZ+1<0||o-r.halfZ>um)continue;const a=Math.min(1,Math.max(0,1-(o-r.halfZ)/um)),c=pn(s.lane);let l=0,u=0;if(s.kind==="ridge")u=Math.max(0,r.hi+hm-i);else if(s.kind==="bridge")i>r.lo-Dr&&i<r.hi+Dr&&(u=n.v<r.lo?r.lo-Dr-i:r.hi+Dr-i);else if(Math.abs(e-c)<r.halfX+fm){const f=n.x-c;Math.abs(f)>=r.halfX?l=c+Math.sign(f)*(r.halfX+fm)-e:s.kind==="spike"?u=Math.max(0,r.hi+hm-i):s.kind==="overhang"&&(u=Math.min(0,r.lo-Dr-i))}u>0?_i.v=Math.max(_i.v,u*a):u<0&&(_i.v=Math.min(_i.v,u*a)),Math.abs(l*a)>Math.abs(_i.x)&&(_i.x=l*a)}return _i}function yP(n,t,e){const i=Math.sin(e),s=Math.cos(e);return Math.max(Ze(n,t),Ze(n+4*i,t+4*s),Ze(n+8*i,t+8*s))}const bP={back:7.5,up:2.6,fov:58,look:34,lookDown:3.6},SP={back:11,up:4.5,fov:70,look:60,lookDown:5},wP={back:6.5,up:2.2,fov:64,look:40,lookDown:4},dm={back:13,up:4.5,fov:62,look:60,lookDown:6};function $l(n,t,e){const i=(s,r)=>s+(r-s)*e;return{back:i(n.back,t.back),up:i(n.up,t.up),fov:i(n.fov,t.fov),look:i(n.look,t.look),lookDown:i(n.lookDown,t.lookDown)}}class TP{rig={...dm};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(t){this.camera=t,this.aspect=Number.isFinite(t.aspect)&&t.aspect>0?t.aspect:16/9}setAspect(t){Number.isFinite(t)&&t>0&&(this.aspect=t,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(t){this.shakeA=Math.max(this.shakeA,t)}update(t,e,i,s,r=!1){const o=Math.min(1,Math.max(0,(t.speed-42)/22)),a=t.mode==="run"?Nm(t.z):0,c=W=>r?1:1-Math.exp(-i*W),l=a>0?Math.max(.4,Math.min(2,$v(t.z,t.speed))):1;this.g+=(1+(l-1)*a-this.g)*c(3);const u=Math.max(0,this.g-1),f=Math.max(0,1-this.g),h=this.portrait();let d=t.mode==="ready"?dm:$l($l(bP,wP,qv(t.z)),SP,Xv(t.z)*(1-.8*h));d={...d,fov:d.fov+10*o+.5*Math.max(0,t.surge)+.34*t.tailwind+(t.vert==="dive"?4:0)+(t.thermalT>0?8:0)-2.5*u+5*f,up:d.up-.8*u},t.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=$l(this.rig,d,c(2.4)),this.mv+=(t.v-t.thermalV-t.windLift-this.mv)*c(9+5*h);const p=this.mv,v=t.low&&t.vert==="cruise";this.fv+=((v?1:t.vert==="dive"?.6+.2*h:.45)-this.fv)*c(v?3:10),this.fl+=((v?1:t.vert==="dive"?.9:.35)-this.fl)*c(v?3:10);const g=t.speed*wi(t.z);this.lag+=(5*(1-.7*h)*Math.tanh(-g/40)*a-this.lag)*c(3),this.x+=(t.x*(.55+.3*h)-this.x)*(r?1:1-Math.exp(-i*(6+4*h)));const m=1.6+20*(1-h);this.x=Math.min(t.x+m,Math.max(t.x-m,this.x));const M=t.mode==="run"?Math.max(-.3,Math.min(.3,.45*Lm(t.z,t.speed))):0;this.roll+=(M-e*.0022-this.roll)*(r?1:1-Math.exp(-i*3)),this.shakeA=Math.max(0,this.shakeA-i*2.5);const b=t.mode==="crash"||t.mode==="over",x=this.rig.back*(1-.12*h)-.3*h*Math.max(0,this.rig.back-7.5),_=t.z-x*(b?1.6:1);this.s=_;const S=this.camera,w=this.shakeA,y=Math.max(0,Pe(_)-Pe(t.z))*.7*h,T=this.rig.up+.6*h-y+t.thermalV*.8+t.windLift*.85+p*this.fv+this.lag+(b?4:0),R=MP(t,_,this.x,T);this.clrX=Math.abs(R.x)>=Math.abs(this.clrX)?R.x:this.clrX+(R.x-this.clrX)*c(5),this.clrV=Math.abs(R.v)>=Math.abs(this.clrV)?R.v:this.clrV+(R.v-this.clrV)*c(5);const C=ce(_,this.x+this.clrX,T+this.clrV,this.tmp);S.position.set(C.x+w*Math.sin(s*37.1),Math.max(C.y,yP(C.x,C.z,hn(_))+3)+w*Math.sin(s*41.3+2),C.z),this.crashK+=((b?1:0)-this.crashK)*c(4);const L=t.z+this.rig.look*(1-.75*this.crashK),D=.6*t.speed,I=(Pe(L+D)-Pe(L)-wi(L)*D)*a,B=ze(t.z),H=Math.tan(.14)*this.rig.look*pm(B,ae.edge-20,ae.edge+80)*(1-pm(B,ae.pullOut-80,ae.pullOut))*a;ce(L,t.x*(.4+.2*h),t.thermalV*.8+t.windLift*.85+p*this.fl+I-this.rig.lookDown-H-zg(t)*this.crashK,this.tmp),S.up.set(0,1,0),S.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),S.rotateZ(Math.max(-.6,Math.min(.6,this.roll+this.trickRoll))),this.applyLens()}applyLens(){const t=this.camera,e=this.aspect,i=this.portrait();let s=this.rig.fov,r=1;if(e<1){const a=Math.min(64+60*(1-i),this.rig.fov*(1-.15*i))*Math.PI/180;r=1+.1*i,s=Math.min(118,2*Math.atan(Math.tan(a/2)*r/e)*180/Math.PI)}const o=`${s.toFixed(2)}|${r.toFixed(3)}|${e.toFixed(4)}`;o!==this.lensKey&&(this.lensKey=o,this.viewScale=r,t.fov=s,r>1.001?t.setViewOffset(e,r,0,0,e,1):(t.clearViewOffset(),t.aspect=e,t.updateProjectionMatrix()))}}function pm(n,t,e){const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)}const Kl=new ct;function EP(n,t,e,i){let s=i;return{sunDir:()=>s,apply(r,o){e3(n,r,o),s=YA(i,r,o);const a=At(.55,1,r);t.position.set(s.x*1e3,Math.max(s.y,.35*a)*1e3,s.z*1e3),t.color.copy(Cl("sunLight",r,Kl,o)),t.intensity=2.4*(1-.7*a),e.color.copy(Cl("skyAmbient",r,Kl,o)),e.groundColor.copy(Cl("bounce",r,Kl,o)),e.intensity=1.3*(1+.35*a)}}}const Ta={x:-.32,y:.1,z:1};function AP(n,t){const{renderer:e,scene:i,camera:s,sun:r,hemi:o}=OC(n,t.maxDpr);t3(i,Ta);const a=EP(i,r,o,Ta),c=HC(Ta),l=_P(i,t.terrain),u=FA(t.foliage),f=z3(t.ambient),h=W3(),d=l3(t.ambient),p=s3(t.name!=="high"),v=rA(),g=mA(),m=vA(),M=MA(),b=KA(),x=AR(),_=fR(t.ambient),S=NR();cv(wC(S,t.name==="high"));const w=FR(),y=QC(),T=YT(t.name==="low"),R=EC(),C=iP(),L=T3(),D=v3(),I=_3(),B=XC(),H=KC(),W=Q3();i.add(c.mesh,u.group,f.group,h.mesh,v.group,g.group,m.group,M.mesh,b.group,p.mesh,d.mesh,x.group,_.group,S.root,y.points,R.mesh,C.object,L.mesh,D.group,I.mesh,B.mesh,B.star,B.shell,H.stars,H.chips,W.points,T.mesh);const j=kC(e,i,s,Ta,t.post),O=new TP(s);q3(t.ambient>=1?12:t.ambient>=.7?9:6);const $=[new P,new P],Q=[new P,new P],_t=new P,ft=new ot,St={};let Nt=null;return{renderer:e,scene:i,camera:s,post:j,cam:O,lanterns:_,flashes:B,impacts:H,world:l,ghosts:D,trick:w.trick,present(zt,X,Y,yt,Pt=!1){const{dusk:it,morn:Wt}=yt;zt.mode==="crash"||zt.mode==="over"?Nt??=zt.z:Nt=null;let st=zt;Nt!==null&&zt.z>Nt+.4&&(st=Object.assign(St,zt),st.z=Nt+.4),a.apply(it,Wt),w.apply(S,st,X,Y),I.update(S.root.position,st.stunT/rt.stunTime,X,s),O.trickRoll=w.camRoll(),O.update(st,w.lateralSpeed(),Y,X,Pt),c.update(s,X,it,Wt),l.update(s.position,Pt),u.update(st.z,it,s),f.update(st.z,it),h.update(st.z),$3(),W.update(st,X,it,O.s),d.update(st.z),p.update(s,X,O.s),Z2(S.root.position.x,S.root.position.z,hn(st.z),X),B.update(Y,st.mode==="run"?st.speed:0),H.update(Y,st.mode==="run"?st.speed:0);const Gt=st.mode==="run"&&st.hp===1?.14+.08*Math.sin(X*5.5):0;j.setDanger(Math.max(H.danger(),Gt,st.mode==="crash"?.55:st.mode==="over"?.25:0)),x.update(st,X,it),v.update(st.z),g.update(O.s,X,it),m.update(st.z,X),M.update(O.s),b.update(st.z),_.update(st,X,Y,it,O.s),K3(Math.min(1,Math.max(0,(it-.45)/.4))),L.update(st,X,O.s),S.root.updateMatrixWorld(),S.feet.forEach((Ce,F)=>Ce.getWorldPosition($[F])),y.update($,Y,st.mode==="run"||st.mode==="ready",s.position),S.ankles.forEach((Ce,F)=>Ce.getWorldPosition(Q[F])),T.update(st,Q,X,Y,s.position);const le=st.mode==="run"||st.mode==="ready";R.update(S.tips,X,le,Math.min(1,Math.max(0,(st.speed-40)/26)+(st.vert==="dive"?.4:0)),s.position);const ee=st.stunT/rt.stunTime;Wg.value=Math.max(ee*ee*(.6+.4*Math.sin(X*28)),st.mode==="run"&&st.hp===1?.18+.12*Math.sin(X*5.5):0);const Me=hn(st.z);_t.set(Math.sin(Me),wi(st.z),Math.cos(Me)).normalize().multiplyScalar(st.speed);const Ie=Math.min(1,Math.max(0,(st.speed-40)/26)),Ke=st.mode==="run"?Math.max(0,st.surge)/12+st.tailwind/16:0,Te=1-.45*Math.min(1,Math.max(0,(it-.5)/.4));return C.update(s,_t,st.mode==="run"?Te*(.1+.4*Ie+.55*Ke+(st.thermalT>0?.35:0)):0),j.setSpeed(st.mode==="run"?.05*Ie+.16*Ke+(st.vert==="dive"?.04:0)+(st.thermalT>0?.1:0):0),j.setSun(a.sunDir(),1-Math.min(1,it*1.6)),_.setViewport(e.getDrawingBufferSize(ft).y*O.viewScale,s.fov),D.setViewport(ft.y*O.viewScale,s.fov),W.setViewport(ft.y*O.viewScale,s.fov),Math.min(1.4,Ie+.5*Ke)},resize(zt,X){e.setSize(zt,X),j.setSize(zt,X),O.setAspect(zt/X)}}}function RP(){const n={z:0,x:0,v:0,thermalV:0,windLift:0},t={};return{capture(e){n.z=e.z,n.x=e.x,n.v=e.v,n.thermalV=e.thermalV,n.windLift=e.windLift},view(e,i){if(i>=1)return e;const s=(r,o)=>r+(o-r)*i;return Object.assign(t,e),t.z=s(n.z,e.z),t.x=s(n.x,e.x),t.v=s(n.v,e.v),t.thermalV=s(n.thermalV,e.thermalV),t.windLift=s(n.windLift,e.windLift),t}}}const qg=`skyrun.tut.${ds}`,CP=2e3,PP=.7,LP=.45,NP=.3,IP=.15;function DP(){try{return new Set(JSON.parse(localStorage.getItem(qg)??"[]"))}catch{return new Set}}function UP(n){const t=n.obstacles.filter(f=>!f.passed&&f.z-n.z>-Ki[f.kind].halfZ);if(!t.length)return null;const e=t.reduce((f,h)=>h.z<f.z?h:f),i=t.filter(f=>f.row===e.row),s=e.kind;if(n.thermalV>8&&s!=="pillar")return null;if(i.some(f=>f.kind==="bridge"))return n.vert==="dive"||n.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(i.some(f=>f.kind==="ridge"))return n.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const r=new Set(i.map(f=>f.lane));if(!r.has(n.lane))return null;const o=i.filter(f=>f.lane===n.lane),a=o.every(f=>f.kind==="spike");if(a&&n.vert==="flare")return null;const c=o.every(f=>f.kind==="overhang");if(c&&(n.vert==="dive"||n.low))return null;const l=[];return[-1,0,1].some(f=>f<n.lane&&!r.has(f))&&l.push("left"),[-1,0,1].some(f=>f>n.lane&&!r.has(f))&&l.push("right"),a&&l.push("up"),c&&l.push("down"),{lesson:l.length===1&&a?"up":l.length===1&&c?"down":"lane",kind:o[0].kind,accept:l,row:e.row,z:e.z}}const mm={left:"←",right:"→",up:"↑",down:"↓"};function FP(n,t){const e=t?new Set:DP(),i=matchMedia("(pointer: coarse)").matches,s=document.createElement("div");s.className="tut",n.appendChild(s);let r=null,o=1;const a=l=>{const u=l.accept.filter(g=>l.lesson!=="lane"||g!=="up"&&g!=="down"),f=$i(l.z),h=l.kind==="bridge"?f?"chui qua cổng làng":"chui dưới cầu":l.kind==="overhang"?"chui dưới mái đá":l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",d=u.length===1?u[0]==="left"?"sang trái":"sang phải":"sang trái / phải",p=l.lesson==="lane"?`ngón ${d}`:l.lesson==="up"?"lên":"xuống",v=i?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${p} để ${h}`:`Bấm ${u.map(g=>mm[g]).join(" / ")} để ${h}`;s.innerHTML=`<div class="tut-arrows">${u.map(g=>`<span class="tut-arrow ${g}">${mm[g]}</span>`).join("")}</div><div class="tut-text">${v}</div>`,s.classList.add("on")},c=l=>{e.add(l);try{localStorage.setItem(qg,JSON.stringify([...e]))}catch{}};return{frozen:()=>r!==null&&o===0,update(l,u){if(l.mode!=="run"||e.size===3)return r=null,s.classList.remove("on"),o=1,1;const f=UP(l);if(r&&(!f||f.row!==r.row)&&(c(r.lesson),r=null,s.classList.remove("on")),!r&&f&&!e.has(f.lesson)&&l.z<CP){const p=(l.obstacles.find(v=>v.row===f.row).z-l.z)/l.speed;p<=PP&&p>=LP&&(r=f,a(f))}else r&&f&&(r=f);const h=r!==null&&l.buffered!==null&&r.accept.includes(l.buffered);return o=r&&!h?Math.max(0,o-u/NP):Math.min(1,o+u/IP),o},offer(l){const u=r?l.find(f=>r.accept.includes(f)):void 0;return u?(o=.4,u):null}}}const ih=`skyrun.progress.s${fs}`,sh="skyrun.meters",$g=fs,Kg=n=>Math.floor(n).toLocaleString("vi-VN"),Yg=n=>(Math.floor(n/100)/10).toLocaleString("vi-VN");function ac(n){try{const t=JSON.parse(localStorage.getItem(n)??"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function gm(n,t){try{localStorage.setItem(n,JSON.stringify(t))}catch{}}const of=n=>ac(ih)[n]??0,Zg=n=>ac(sh)[n]??0;function Mc(n){const t=n.unlock;return!t||of(t.from)>=t.score||Zg(t.from)>=t.meters}const kP=()=>Object.values(ps).filter(n=>!Mc(n));function Jg(n){const t=kP(),e=ac(ih),i=ac(sh);return n(e,i),gm(ih,e),gm(sh,i),t.filter(s=>Mc(s))}const rh=(n,t,e)=>{Number.isFinite(e)&&e>(n[t]??0)&&(n[t]=Math.floor(e))},OP=(n,t,e)=>Jg((i,s)=>{rh(i,n,t),Number.isFinite(e)&&e>0&&(s[n]=Math.floor((s[n]??0)+e))});function BP(n){return Jg((t,e)=>{for(const i of Object.keys(ps))typeof n.score[i]=="number"&&rh(t,i,n.score[i]),typeof n.meters[i]=="number"&&rh(e,i,n.meters[i])})}const Qg="skyrun.unlockSeen";function jg(){try{const n=JSON.parse(localStorage.getItem(Qg)??"[]");return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch{return[]}}function vm(){const n=jg();return Object.values(ps).filter(t=>t.unlock&&Mc(t)&&!n.includes(t.id))}function zP(n){try{localStorage.setItem(Qg,JSON.stringify([...new Set([...jg(),n])]))}catch{}}function HP(n,t,e){zP(t.id);const i=document.createElement("div");i.className="unlock-pop",i.setAttribute("role","dialog"),i.setAttribute("aria-label",`Đã mở khoá ${t.name}`);const s=document.createElement("div");s.className=`unlock-card map-${t.region}`;const r=(u,f,h)=>{const d=document.createElement(u);return d.className=f,d.textContent=h,s.appendChild(d),d};if(r("div","unlock-kicker","Mở khoá map mới!"),r("h2","unlock-name",t.name),r("p","unlock-sub",t.tagline),t.unlock){const u=r("div","map-goal done","");u.appendChild(document.createElement("i")).style.width="100%";const f=t.unlock,h=of(f.from)>=f.score?`${Kg(f.score)} điểm mùa ${$g}`:`${Yg(f.meters)} km tổng quãng bay`;r("small","unlock-goal",`${h} ở ${ps[f.from].name} ✓`)}const o=document.createElement("div");o.className="unlock-actions";const a=document.createElement("button");a.type="button",a.className="btn-play",a.textContent=`Bay ${t.name}`;const c=document.createElement("button");c.type="button",c.className="btn-lobby",c.textContent="Để sau",o.append(a,c),s.appendChild(o),i.appendChild(s);for(const u of["touchstart","touchend","touchmove","pointerdown","mousedown"])i.addEventListener(u,f=>f.stopPropagation());const l=()=>i.remove();a.addEventListener("click",u=>{u.stopPropagation(),l(),e(t)}),c.addEventListener("click",u=>{u.stopPropagation(),l()}),i.addEventListener("click",u=>{u.target===i&&l()}),i.addEventListener("keydown",u=>{if(u.key==="Escape")c.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===c?c:a).click();else return;u.stopPropagation(),u.preventDefault()}),n.appendChild(i),a.focus({preventScroll:!0})}const GP=[{name:"Mù Cang Chải",tagline:"Ruộng bậc thang vàng óng, đèo Khau Phạ nối dài."},{name:"Sapa",tagline:"Fansipan trên biển mây, rừng thông và thác Bạc."}];function xm(n){try{localStorage.setItem(Am,n.id)}catch{}const t=new URLSearchParams(location.search);t.set("map",n.id),location.search=t.toString()}const jn=(n,t,e)=>{const i=document.createElement(n);return i.className=t,i.textContent=e,i};function _m(n,t,e,i){const s=document.createElement("div");s.className="goal-row";const r=Math.min(t,e),o=document.createElement("span");o.className="goal-head",o.append(jn("span","goal-label",n),jn("b","goal-value",`${i(r)} / ${i(e)}`));const a=document.createElement("div");return a.className=`map-goal${r>=e?" done":""}`,a.appendChild(document.createElement("i")).style.width=`${100*r/e}%`,s.append(o,a),s}function VP(n){const t=document.createElement("div");t.className="lobby-panel",t.hidden=!0,t.setAttribute("role","dialog"),t.setAttribute("aria-label","Sảnh chọn map");const e=document.createElement("div");e.className="lobby-card";const i=document.createElement("div");i.className="lobby-head";const s=document.createElement("button");s.type="button",s.className="board-close",s.setAttribute("aria-label","Đóng"),s.textContent="×",i.append(jn("b","lobby-title","Chọn map"),s);const r=document.createElement("div");r.className="lobby-grid",e.append(i,r),t.appendChild(e),n.appendChild(t);for(const h of["touchstart","touchend","touchmove","pointerdown"])t.addEventListener(h,d=>d.stopPropagation(),{passive:!0});t.addEventListener("mousedown",h=>{h.stopPropagation(),h.target instanceof Element&&h.target.closest("button")&&h.preventDefault()});let o=[],a;const c=h=>{const d=document.createElement("button");d.type="button";const p=Mc(h),v=h.id===ds,g=o.includes(h);d.className=`lobby-map map-${h.region}${v?" current":""}${p||v?"":" locked"}${g?" fresh":""}`;const m=p||v?null:h.unlock,M=v?"Đang bay":g?"Mới mở! Chạm để bay":p?"Chạm để bay":m?`Mở khi đạt 1 trong 2 ở ${ps[m.from].name}`:"";return d.append(jn("b","lobby-name",h.name),jn("small","lobby-sub",h.tagline),jn("span","lobby-status",M)),m&&d.append(_m(`Điểm mùa ${$g}`,of(m.from),m.score,Kg),jn("span","goal-or","hoặc"),_m("Tổng quãng bay",Zg(m.from),m.meters,b=>`${Yg(b)} km`)),d.addEventListener("click",()=>{p&&!v&&xm(h)}),d},l=()=>{r.replaceChildren(...Object.values(ps).map(c),...GP.map(h=>{const d=document.createElement("div");return d.className="lobby-map soon",d.append(jn("b","lobby-name",h.name),jn("small","lobby-sub",h.tagline),jn("span","lobby-status","Sắp có")),d}))},u=()=>{t.hidden=!0};s.addEventListener("click",u),t.addEventListener("click",h=>{h.target===t&&u()}),window.addEventListener("keydown",h=>{h.code==="Escape"&&!t.hidden&&u()});const f=()=>{const h=vm().length>0||o.length>0;for(const d of n.querySelectorAll("[data-lobby]"))d.classList.toggle("has-news",h)};return{open(){l(),t.hidden=!1;const h=vm()[0];h&&!n.querySelector(".unlock-pop")&&HP(n,h,xm),o=[],f()},setScreen(h){h!==a&&(a=h,h?f():u())},refresh(h=[]){h.length&&(o=[...new Set([...o,...h])]),t.hidden||l(),f()}}}function WP(){let n=null;return t=>{if(!ae.zoneNames||t.mode!=="run")return n=null,null;const e=t.z+t.speed*1.5,i=ae.zone(ze(e),$i(e));return i===n?null:(n=i,ae.zoneNames[i]?i:null)}}const Vi=1/60;function XP(n){const t=new URLSearchParams(location.search),e=aE(t),i=AP(n,e),{renderer:s,post:r}=i,o=Xx(),a=_E(n),c=ZT(n,i.cam,i.lanterns,o,a,i.flashes,i.impacts,i.camera),l=EE(n,()=>m.mode==="run"&&!D.paused(),()=>m.steerX),u=dE(Number(t.get("seed")??0));let f=u();const h=Gx(t);let d=t.get("auto")==="1",p=d||t.has("z");const v=WP(),g=t.has("alt");let m=Rc(f.seed,g);m.z=Number(t.get("z")??0);let M=0,b=null;const x=RP();x.capture(m);const _=FP(n,t.get("tut")==="1"),S=(O,$=!1,Q=1)=>{const _t=h.at(m.z),ft=x.view(m,Q),St=i.present(ft,M-Vi*(1-Q),O,_t,$);C.present(m,ft,Q,O),a.update(m,_t),o.update(St,m.mode==="run",_t);const Nt=v(m);Nt&&(a.zone(Nt),o.zone(Nt)),R.setScreen(T.visible())},w=()=>{m.mode==="run"||m.mode==="crash"||n.querySelector(".unlock-pop")||(m.mode==="over"&&(f=u()),m=Rc(f.seed,g),p=d||t.has("z"),m.z=Number(t.get("z")??0),x.capture(m),S(0,!0),Tx(m),C.runStart(m,f.route),b=null,o.runStart(),T.hide(),a.setVisible(!0))},y=()=>{f=u(),m=Rc(f.seed,g),m.z=Number(t.get("z")??0),p=d||t.has("z"),b=null,x.capture(m),S(0,!0),T.showTitle(),a.setVisible(!1)},T=R2(n,w,()=>{T.visible()==="over"&&y(),R.open()}),R=VP(n),C=M2({root:n,params:t,hud:a,screens:T,view:i.ghosts,camera:i.camera,route:f.route,quality:()=>({tier:e.name,scale:j.scale}),rv:g?2:je.logRvBase+Q0});C.progress().then(O=>O&&R.refresh(BP(O)));const L=U2(n,o),D=b2(n,L.el,matchMedia("(pointer: coarse)").matches);N2(n,L,o,i.ghosts,D),l.onAction(()=>{D.paused()?D.resume():T.visible()&&T.tapReady()&&w()}),l.onKey("KeyM",()=>(o.toggleSfx(),L.sync())),l.onKey("KeyN",()=>(o.toggleMusic(),L.sync())),l.onKey("KeyH",()=>a.setVisible(n.querySelector(".hud.hidden")!==null)),l.onTrick(i.trick),T.showTitle(),a.setVisible(!1);const I=O=>{x.capture(m),Ax(m,d?wv(m):O,l.holdDown(),Vi,d?null:l.steer()),C.afterStep(m,d),c.handle(m.events,m);for(const $ of m.events)$.type==="crash"&&(b=$.kind);M+=Vi,m.mode==="over"&&!T.visible()&&(!p&&!m.alt&&R.refresh(OP(je.id,Js(m),m.z)),o.over(T.showOver(m,b)),C.runOver(m,b),a.setVisible(!1))};let B=0;const H=O=>{D.setRunning(m.mode==="run");const $=(m.mode==="crash"&&m.crashT<.9?.35:1)*D.factor(O)*(d?1:_.update(m,O));if(_.frozen()&&!D.paused()){const Q=l.take(),_t=l.steer(),ft=_t===null?m.lane:Hm(m.lane,_t),St=_.offer(ft!==m.lane?[...Q,ft<m.lane?"left":"right"]:Q);St&&I(Q.includes(St)?[St]:[])}for(B+=O*$;B>=Vi;)I(l.take()),B-=Vi;S(O*$,!1,B/Vi)},W=()=>i.resize(n.clientWidth,n.clientHeight);window.addEventListener("resize",W),W(),S(0,!0),HT(s,{state:()=>m,advance(O){for(let $=0;$<O/Vi;$++)I(l.take()),S(Vi)},play(O,$=60){for(let Q=0;Q<O*$;Q++)H(1/$)},autopilot(O){d=O,O&&(p=!0)},jump(O){p=!0,m.z=O,m.nextChunkZ=O+200,m.obstacles=[],m.pickups=[],x.capture(m),S(0,!0)},dusk:h.forceDusk,clock:h.forceU,render:()=>{S(0),r.render()},bench(O){const $=s.getContext(),Q=new Uint8Array(4),_t=performance.now();for(let Nt=0;Nt<O;Nt++)s.info.reset(),r.render(),$.readPixels(0,0,1,1,$.RGBA,$.UNSIGNED_BYTE,Q);const{geometries:ft,textures:St}=s.info.memory;return{msPerFrame:(performance.now()-_t)/O,calls:s.info.render.calls,triangles:s.info.render.triangles,geometries:ft,textures:St,programs:s.info.programs?.length??0}}},i);const j=uE({renderer:s,post:r,tier:e,resize:W,tick:H,stats:t.has("stats")?O=>a.setStats(O):null,worldLine:()=>i.world.statsLine()});window.__skyrunQuality={tier:e,governor:j}}Bx(je.region);document.title=`Sky Run · ${Zm[je.region]}`;XP(document.getElementById("app"));uv();
