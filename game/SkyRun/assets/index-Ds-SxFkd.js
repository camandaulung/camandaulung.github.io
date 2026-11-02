(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Jg=6e3,fm=[];function Qg(n){return fm.push(n),n}const dm=new Promise(n=>{const t=()=>{Promise.allSettled(fm).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>n(),{timeout:1500}):setTimeout(n,100)})};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0}),setTimeout(n,Jg)}),jg=n=>fetch(n,{priority:"low"}).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null);function tv(){const n=window.SR_SW,t=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!n||!t||!("serviceWorker"in navigator)||dm.then(()=>navigator.serviceWorker.register(n).catch(e=>console.warn("[skyrun] sw",e)))}const df=400,Fa=n=>Math.max(0,Math.min(1,n));function go(n,t){return n<=t.hardAt?t.d0+(1-t.d0)*Fa((n-df)/(t.hardAt-df)):1+.15*Fa((n-t.hardAt)/3e3)}const ev=[0,.12,.3,.5,.75];function nv(n){let t=0;return ev.forEach((e,i)=>{n>=e&&(t=i)}),t}function iv(n){return Math.max(-.2,.35-.55*n)}function sv(n){return n<=1?1-.28*Fa((n-.3)/.7):.72-.06*Fa((n-1)/.15)}const rv=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function ov(n,t){return n<.5||t%2===0}const rt={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,maxHp:2,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2},ac=2;function pn(n){return-n*rt.laneGap}function pm(n,t){const e=Math.min(1,go(n,t));return rt.speedStart+(rt.speedMax-rt.speedStart)*(1-(1-e)*(1-e))}const Ki={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function ka(n,t,e,i){const s=Ki[n.kind];return Math.abs(i)>s.halfZ||Math.abs(t-pn(n.lane))>=s.halfX+rt.hitHalfWidth?!1:e-rt.hitHalfHeight<s.hi&&e+rt.hitHalfHeight>s.lo}function av(n,t,e){return Math.abs(t-pn(n.lane))>=Ki[n.kind].halfX+rt.hitHalfWidth?!0:e==="flare"?n.kind==="spike"||n.kind==="ridge":e==="dive"?n.kind==="bridge"||n.kind==="overhang":!1}function cv(n,t){return n.z+Ki[n.kind].halfZ<t}const lv=[rt.flareHeight,0,-5.5],uv=0,mm=1,hv=2;function Br(n,t,e){return!n.some(i=>ka(i,pn(t),lv[e],0))}function fv(n){const t=[];for(let e=-1;e<=1;e++)for(let i=0;i<3;i++)Br(n,e,i)&&t.push({lane:e,tier:i});return t}function pf(n){return fv(n).length}function wc(n,t,e){return e?n.some(i=>(i.kind==="pillar"||i.kind==="overhang")&&i.lane===t)?"none":"any":Br(n,t,mm)?"any":Br(n,t,uv)?"high":Br(n,t,hv)?"low":"none"}function dv(n,t,e,i,s){const r=n.thermalV>8,o=n.low&&!r,a=(t[0].z-n.z)/n.speed,c=d=>{const p=wc(t,d,r);if(p==="none")return 1/0;const x=p==="any"?0:p==="low"&&o?.3:1.5;return Math.abs(d-n.lane)+x+(e&&wc(e,d,r)==="none"?.6:0)},l=[-1,0,1].filter(d=>c(d)<1/0).sort((d,p)=>c(d)-c(p))[0];if(l===void 0)return a<i+.12&&n.vert!=="flare"?["up"]:[];const u=wc(t,l,r);if(l===n.lane&&u==="any")return null;const f=[],h=s&&l===n.lane&&n.pickups.some(d=>!d.taken&&d.lane===n.lane&&d.z>n.z&&d.z<t[0].z&&(u==="low"?d.v<-2:d.v>2)&&(d.z-n.z)/n.speed<.2);if(u==="high"){const d=n.vert!=="flare"||n.vertT>=rt.vertIn+rt.vertHold;(a<i+.12+(o?.06:0)||h)&&d&&f.push("up")}else u==="low"&&(a<i+.12||h)&&((n.alt?n.low:n.vert==="dive"&&n.vertT<rt.vertIn+rt.vertHold)||f.push("down"));if(l!==n.lane){const d=i+(Math.abs(l-n.lane)-1)*rt.laneTime*1.3;a<=d&&f.push(l<n.lane?"left":"right")}return f}function gm(n,t){const e=new Map;for(const i of n.obstacles){const s=i.z-n.z;if(i.passed||s<-Ki[i.kind].halfZ||s>t)continue;const r=e.get(i.row)??[];r.push(i),e.set(i.row,r)}return[...e.values()].sort((i,s)=>i[0].z-s[0].z)}function mf(n){return new Set(n.filter(t=>t.kind==="pillar"||t.kind==="spike"||t.kind==="overhang").map(t=>t.lane))}function pv(n,t=.27,e=!0){if(n.mode!=="run")return[];const i=gm(n,n.speed*2.2),s=i[0],r=o=>e?gv(n,o):[];return s?dv(n,s,i[1],t,e)??r(s):mv(n)??r()}function mv(n){const t=n.gusts.find(i=>!i.taken&&!i.missed&&i.z+i.len>n.z);if(!t||t.z-n.z>n.speed*1.5)return null;if(t.lane!==n.lane)return n.laneT<1?[]:[t.lane<n.lane?"left":"right"];const e=(t.z-n.z)/n.speed;return xm(n,t.v,e)?["up"]:e>.25?[]:t.v>2&&n.vert!=="flare"?["up"]:t.v<-2&&!vm(n)?["down"]:[]}function vm(n){return n.alt?n.low:n.vert==="dive"}function xm(n,t,e){return n.alt&&n.low&&n.vert==="cruise"&&Math.abs(t)<=2&&e<.9}function gv(n,t){const e=n.pickups.find(o=>!o.taken&&o.kind==="lantern"&&o.lane===n.lane&&o.z>n.z);if(e&&n.thermalV<2){const o=(e.z-n.z)/n.speed;if(xm(n,e.v,o))return["up"];if(e.v>2&&n.vert!=="flare"&&o<.2)return["up"];if(e.v<-2&&!vm(n)&&o<.2)return["down"]}const i=n.pickups.find(o=>!o.taken&&o.z-n.z>n.speed*.35&&o.z-n.z<n.speed*1.2);if(!i||i.lane===n.lane||n.laneT<1)return[];const s=i.lane<n.lane?-1:1;return t&&mf(t).has(n.lane+s)?[]:gm(n,i.z-n.z).some(o=>mf(o).has(n.lane+s))?[]:[s<0?"left":"right"]}const vv=["khau-pha","ha-giang"],_m="skyrun.map";function Tc(n){return vv.find(t=>t===n)??null}function xv(){const n=globalThis;if(n.location){const e=Tc(new URLSearchParams(n.location.search).get("map"));if(e)return e;try{return Tc(n.localStorage?.getItem(_m))??"khau-pha"}catch{return"khau-pha"}}const t=n.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return Tc(t??n.process?.env?.SKYRUN_MAP)??"khau-pha"}const hs=xv();function Ro(n,t,e){let i=Math.imul(n,374761393)^Math.imul(t,668265263)^Math.imul(e+1,2246822519);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function gf(n){return n*n*n*(n*(n*6-15)+10)}function ut(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=gf(n-i),o=gf(t-s),a=Ro(i,s,e),c=Ro(i+1,s,e),l=Ro(i,s+1,e),u=Ro(i+1,s+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+u)*r*o}function kn(n,t,e,i){let s=0,r=1,o=0,a=1;for(let c=0;c<e;c++)s+=ut(n*a,t*a,i+c*31)*r,o+=r,r*=.5,a*=2.03;return s/o}function vf(n,t,e,i){let s=0,r=1,o=0,a=1,c=1;for(let l=0;l<e;l++){const u=1-Math.abs(ut(n*a,t*a,i+l*17)*2-1),f=u*u*c;c=Math.min(1,f*1.6),s+=f*r,o+=r,r*=.5,a*=2.1}return s/o}function zr(n){return n<0?0:n>1?1:n}function At(n,t,e){const i=zr((e-n)/(t-n));return i*i*(3-2*i)}function xe(n,t,e){return n+(t-n)*e}const _v=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],Mv=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],fs={"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:_v,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:null},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:Mv,profile:{d0:.2,hardAt:4e3,tighten:1.4},routePrefix:"hg",routeVersion:2,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",meters:15e3}}},je=fs[hs],Ge=je.cycle,ri=je.offset,fn=1100,Mm=1320,Yl=2450,ym=2700,yv=150,ur=1480,Co=1770,bv=[320,640,930];function Sv(n){let t=0;for(const e of bv)t=Math.max(t,1-At(0,70,Math.abs(n-e)));return t}function xf(n){return n<fn?0:n<Yl?At(fn,Mm,n):1-At(Yl,ym,n)}const wv={edge:fn,pullOut:ur,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:xf,dive(n){const t=At(fn+40,fn+380,n)-At(Yl-650,ym-60,n);return yv*t},sill(n){return At(760,940,n)*(1-At(1092,1108,n))},village(n,t){return t%2!==0?0:At(1600,1720,n)*(1-At(2380,2500,n))},halfWidth(n){const t=xe(64,30,n<fn?Sv(n):0);return xe(t,430,xf(n))},extraDepth:()=>0,reveal(n){return zr(At(ur-20,ur+60,n)*(1-At(1640,1760,n)))},drop(n){return At(fn-25,fn+10,n)*(1-At(ur-40,ur+20,n))},clean(n){return At(fn-40,fn-10,n)*(1-At(1600,1690,n))},zone(n,t){return n<fn-60?"gorge":n<Mm?"mouth":t?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},Ji=600,Po=1060,bm=320,Tv=bm+13;function Ec(n){return At(2230,2420,n)*(1-At(3420,3520,n))}function Ev(n){if(n<300)return xe(30,170,At(0,140,n));let t=170;return t=xe(t,110,At(900,1150,n)),t=xe(t,60,At(2200,2260,n)),xe(t,30,At(3440,3520,n))}const Av={edge:Ji,pullOut:Po,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:Ec,dive(n){return bm*(At(Ji+20,Po,n)-At(2215,2740,n))},sill(n){return At(1040,1120,n)*(1-At(2205,2260,n))},village(n){return At(2800,2900,n)*(1-At(3380,3480,n))},halfWidth(n){return xe(Ev(n),430,Ec(n))},extraDepth(n){if(n<2200)return 190*At(20,160,n);const t=Tv-xe(150,240,Ec(n));return xe(190,t,At(2200,2260,n))*(1-At(2760,2900,n))},reveal(n){return At(2190,2270,n)*(1-At(2560,2700,n))},drop(n){return At(Ji-25,Ji+10,n)*(1-At(Po-40,Po+20,n))},clean(n){return At(Ji-40,Ji-10,n)*(1-At(1100,1160,n))+At(2200,2230,n)*(1-At(2700,2760,n))},road(n){return At(60,220,n)*(1-At(1700,1860,n))},roadDepth(n){return 55+28*Math.sin(n/170)+12*Math.sin(n/61+1.3)},cloud(n){return 1-At(-1,120,n)*(1-At(2250,2600,n))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zone(n){return n<Ji?"rim":n<1100?"dive":n<1900?"river":n<2200?"cave":n<2750?"climb":n<3500?"village":"gate"}},Rv={"khau-pha":wv,"ha-giang":Av},ae=Rv[hs],Si=2*Ge,ni=ri;function Jr(n,t){if(n.k===0)return{x:n.x+t*Math.sin(n.th),z:n.z+t*Math.cos(n.th),th:n.th};const e=n.th+n.k*t;return{x:n.x+(Math.cos(n.th)-Math.cos(e))/n.k,z:n.z+(Math.sin(e)-Math.sin(n.th))/n.k,th:e}}function _f(n,t){const e=[];let i=0,s=0,r=t,o=0;const a=(c,l)=>{if(c<.5)return;const u={k:l,x:i,z:s,th:r},f=Jr(u,c),h=Jr(u,c/2),d=Math.max(Math.hypot(h.x-i,h.z-s),Math.hypot(h.x-f.x,h.z-f.z));e.push({u0:o,len:c,k:l,x:i,z:s,th:r,bx:h.x,bz:h.z,br:d}),i=f.x,s=f.z,r=f.th,o+=c};for(const c of[1,-1]){const l=c===1?0:Ge;for(const[u,f,h]of n)a(l+u-o,0),a(Math.abs(f)*Math.PI/180*h,c*Math.sign(f)/h);a(l+Ge-o,0)}return{segs:e,x:i,z:s}}function Cv(n){const t=_f(n,0),{segs:e,x:i,z:s}=_f(n,-Math.atan2(t.x,t.z));let r=e.length-1;for(;r>0&&e[r].u0>ni;)r--;const o=Jr(e[r],ni-e[r].u0),a=e.reduce((u,f)=>u+f.bx,0)/e.length,c=e.reduce((u,f)=>u+f.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-a,u.bz-c)+u.br));return{segs:e,endX:i,endZ:s,ox:o.x,oz:o.z,bx:a,bz:c,br:l}}const vo=Cv(je.arcs);function Oa(n,t,e=vo){const i=n+ni,s=Math.floor(i/Si),r=i-s*Si;let o=e.segs.length-1;for(;o>0&&e.segs[o].u0>r;)o--;const a=Jr(e.segs[o],r-e.segs[o].u0);return t.x=a.x+s*e.endX-e.ox,t.z=a.z+s*e.endZ-e.oz,t.yaw=a.th,t}const Pv={x:0,z:0,yaw:0},Lv={x:0,z:0,yaw:0};function Nv(n,t=30){return(Oa(n+t,Lv).yaw-Oa(n-t,Pv).yaw)/(2*t)}function Iv(n,t,e,i,s,r){let o;if(n.k===0)o=t*Math.sin(n.th)+e*Math.cos(n.th);else{const f=Math.sign(n.k);let d=Math.atan2(f*(e+Math.sin(n.th)/n.k),-f*(t-Math.cos(n.th)/n.k))-n.th;d-=2*Math.PI*Math.round((d-n.k*n.len/2)/(2*Math.PI)),o=d/n.k}const a=o>=i-.01&&o<=s+.01;o=Math.min(s,Math.max(i,o));const c=Jr(n,o),l=t-(c.x-n.x),u=e-(c.z-n.z);return r.s=o,r.dist=Math.hypot(l,u),r.lat=l*Math.cos(c.th)-u*Math.sin(c.th),a}const hr={s:0,lat:0,dist:0};function Dv(n,t,e,i,s,r=vo){s.dist=1/0;const o=Math.floor((e+ni)/Si),a=Math.floor((i+ni)/Si);for(let c=o;c<=a;c++){const l=c*Si-ni;for(const u of r.segs){const f=l+u.u0;f>i||f+u.len<e||(Iv(u,n-c*r.endX+r.ox-u.x,t-c*r.endZ+r.oz-u.z,Math.max(0,e-f),Math.min(u.len,i-f),hr),hr.dist<s.dist&&(s.dist=hr.dist,s.s=f+hr.s,s.lat=hr.lat))}}return s}function ze(n){return((n+ri)%Ge+Ge)%Ge}function Yi(n){return Math.floor((n+ri)/Ge)}const Hr=9.5;function zn(n){return ae.village(ze(n),Yi(n))}function $i(n){return zn(n)>.97}function Cn(n){return ae.openness(ze(n))}function Gn(n){return 260+30*Math.sin(n/1700)}function Ce(n){return Gn(n)-ae.dive(ze(n))}function ih(n){return ae.sill(ze(n))}function wi(n){return(Ce(n+2)-Ce(n-2))/4}function Sm(n,t){return Math.max(-1.1,Math.min(1.1,Math.atan(t*t*Nv(n)/9.8)))}const Bs={x:0,z:0,yaw:0};function hn(n){return Oa(n,Bs).yaw}function ce(n,t,e,i){return Oa(n,Bs),i.x=Bs.x+t*Math.cos(Bs.yaw),i.y=Ce(n)+e,i.z=Bs.z-t*Math.sin(Bs.yaw),i}function Ys(n){return ae.halfWidth(ze(n))}function xo(n){return ae.extraDepth(ze(n))}function Zl(n){return Gn(n)-xe(150,240,Cn(n))-xo(n)}function Uv(n){return ae.reveal(ze(n))}function Fv(n){return ae.drop(ze(n))}function wm(n){return ae.clean(ze(n))}function kv(n,t){const e=(Ce(n+4)-Ce(n-4))/8,i=(Ce(n+4)-2*Ce(n)+Ce(n-4))/16;return 1+t*t*i/(Math.pow(1+e*e,1.5)*9.8)}const Tm=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ... ..o ... .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Ov={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},Bv=8,Em=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function Ba(n){return n.split(" ")}function Ti(n){let t=n.seed=n.seed+1831565813|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function zv(n,t,e,i=1){const s=rv;let r=0;for(;r<s.length-1&&n>s[r+1][0];)r++;const o=s[r],a=s[Math.min(r+1,s.length-1)],c=a[0]>o[0]?Math.max(0,Math.min(1,(n-o[0])/(a[0]-o[0]))):1,l=(e?.5:1)*(t?.6+.3*Math.min(1,n):1)*i;return{p3:(o[1]+(a[1]-o[1])*c)*l,p2:(o[2]+(a[2]-o[2])*c)*l}}const Hv=new Set(["o","u","d"]),Gv=/[BLHO]/;function Vv(n,t,e,i,s,r,o){if(!t.length)return;for(let M=i-3;M<=i+3;M++)if(M!==i&&Gv.test(e[M]??""))return;const{p3:a,p2:c}=zv(go(Math.max(0,s),n.diff),r,o,n.diff.tighten),l=Ti(n),u=l<c?2:l<c+a?3:0;if(!u||pf(t)<=u)return;const f=t.some(M=>M.kind==="bridge"||M.kind==="ridge");if(f&&o)return;const h=M=>t.some(S=>(S.kind==="pillar"||S.kind==="spike"||S.kind==="overhang")&&S.lane===M),d=[-1,0,1].filter(M=>!h(M)&&(f||e[i][M+1]===".")&&![i-2,i-1,i+1].some(S=>Hv.has(e[S]?.[M+1]??""))),p=f?["pillar"]:o?["spike"]:["pillar","spike"],x=[[]];for(const M of d){const S=[];for(const v of x){S.push(v);for(const _ of p)S.push([...v,{kind:_,lane:M}])}x.splice(0,x.length,...S)}const g=M=>[-1,0,1].every(S=>[...t,...M].some(v=>(v.kind==="pillar"||v.kind==="overhang")&&v.lane===S)),m=x.filter(M=>M.length&&pf([...t,...M])===u&&!g(M));m.length&&t.push(...m[Math.floor(Ti(n)*m.length)])}const Mf=700;function za(n,t){const e=Math.max(0,t);return pm(e,n.diff)*rt.cellSeconds*sv(go(e,n.diff))}function Jl(n,t,e){const i=go(Math.max(0,e),n.diff),s=nv(i),r=t.filter(f=>f.tier<=s&&!n.lastBag.includes(f.id)),o=r.length?r:t.filter(f=>f.tier<=s),a=iv(i),c=o.map(f=>(f.tier===s?1.4:1)/(1+a*f.tier));let l=Ti(n)*c.reduce((f,h)=>f+h,0),u=o[0];for(let f=0;f<o.length;f++)if(l-=c[f],l<=0){u=o[f];break}return n.lastBag.push(u.id),n.lastBag.length>4&&n.lastBag.shift(),u}const yf={o:0,u:rt.flareHeight,d:-5.5},Wv={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function Gr(n,t,e,i){const s=Ba(t.cells),r=za(n,e);let o=!1;const a=Math.floor((e+s.length*r)/Mf),c=a>Math.floor(e/Mf)&&e>300&&ov(go(e,n.diff),a);return s.forEach((l,u)=>{const f=e+(u+.5)*r,h=n.rowId++,d=$i(f),p=[];if(l==="HHH"||l==="LLL")p.push({kind:l==="HHH"?"bridge":"ridge",lane:0});else for(let m=-1;m<=1;m++){const M=Wv[l[m+1]];M&&p.push({kind:d&&M==="pillar"?"spike":M,lane:m})}Vv(n,p,s,u,f,i,d);const x=m=>{n.obstacles.push({id:n.nextId++,kind:m.kind,lane:m.lane,z:f,open:i,row:h,passed:!1})};if(l==="HHH"||l==="LLL"){p.forEach(x);return}const g=p.length>0;for(let m=-1;m<=1;m++){const M=l[m+1],S=p.filter(v=>v.lane===m);if(S.forEach(x),!S.length&&M in yf){const v=s[u-1]==="HHH"||s[u-2]==="HHH",_=n.alt&&M==="o"&&v?rt.flareHeight:yf[M];n.pickups.push({id:n.nextId++,kind:"lantern",lane:m,v:_,z:f,taken:!1})}}if(c&&!o&&g){const m=[-1,0,1].filter(M=>l[M+1]==="."&&Br(p,M,mm));if(m.length){const M=m[Math.floor(Ti(n)*m.length)],S=Ti(n),v=n.alt?S<.45?"thermal":S<.75||n.hp>=rt.maxHp?"smoke":"shield":S<.6||n.hp>=rt.maxHp?"thermal":"shield";n.pickups.push({id:n.nextId++,kind:v,lane:M,v:0,z:f,taken:!1}),o=!0}}}),n.chunksSpawned++,e+s.length*r}const Am=(...n)=>Tm.filter(t=>n.includes(t.id)),Rm=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],Xv=[...Am("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...Rm.filter(n=>n.id!=="luon-mai")],qv=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...Am("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...Rm],$v=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],Kv=Em,Yv=5;function Zv(n){const t=["o..",".o.","..o"][n+1],e=[".BB","B.B","BB."][n+1];return{id:`cong-troi-${n}`,tier:0,cells:`... ... ${t} ${t} ${t} ${e} ${t} ... ...`}}function sh(n){n.mult=Math.min(rt.multMax,1+n.multNear+n.multLantern)}function rh(n,t,e){n.bonus+=e,n.parts[t]+=e}function Jv(n,t){const e=rt.lanternMultStep*n.streak;e>=n.multLantern?n.multLantern=e:n.multLantern+=(e-n.multLantern)*(1-Math.exp(-.016666666666666666/rt.lanternMultTau)),sh(n)}function Cm(n){n.streak=0}const Qv=[0,rt.flareHeight,-5.5];function Pm(n,t,e){const i=t+e[0];if(n.gusts.some(o=>o.z===i))return;let s=Math.floor(Ti(n)*3)-1,r=0;e.forEach((o,a)=>{const c=Ti(n),l=Ti(n);a>0&&(s=Math.max(-1,Math.min(1,s+(c<.35?-1:c<.7?1:0))));let u=a===0?0:Qv[l<.6?0:l<.8?1:2];n.alt&&u===0&&r<-2&&(u=rt.flareHeight),r=u,n.gusts.push({id:n.nextId++,index:a,count:e.length,lane:s,v:u,z:t+o,len:rt.gustLen,taken:!1,missed:!1})})}function jv(n){return n.thermalV+n.windLift}function tx(n,t,e,i){if(!i){n.tailwind=0,n.windLift=0,n.liftT=0;return}n.tailwind*=Math.exp(-t/(e?rt.surgeTauNearRow:rt.tailwindTau)),e&&(n.liftT=0),n.liftT=Math.max(0,n.liftT-t);const s=n.liftT>0?2.2:e?2.5:1.2;n.windLift+=((n.liftT>0?rt.gustLift:0)-n.windLift)*(1-Math.exp(-t*s))}function ex(n){for(const t of n.gusts){if(t.taken||t.missed)continue;if(n.z<t.z)break;if(n.z>t.z+t.len){t.missed=!0,n.gustChain=0,n.events.push({type:"gust-miss"});continue}if(Math.abs(n.x-pn(t.lane))>rt.gustRadiusX||Math.abs(n.moveV-t.v)>rt.gustRadiusV)continue;t.taken=!0,t.index===0&&(n.gustChain=0),n.gustChain++,n.gustsTaken++,n.tailwind=Math.min(rt.tailwindMax,n.tailwind+rt.tailwindPerGust),n.liftT=rt.gustLiftTime;const e=t.index===t.count-1&&n.gustChain===t.count;rh(n,"gust",(rt.gustScore+(e?rt.gustChainScore:0))*n.mult),n.events.push({type:"gust",chain:n.gustChain,full:e})}}function nx(n,t){n.gusts.length&&n.gusts[0].z+n.gusts[0].len<t&&(n.gusts=n.gusts.filter(e=>e.z+e.len>=t))}const ix=[{kind:"rows",from:40,to:560,pool:Xv,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:qv,open:!1},{kind:"rows",from:1990,to:2110,pool:$v,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:Kv,open:!0},{kind:"gate",at:3560}];function sx(n,t){const e=ze(t),i=t-e;for(const s of ix){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return i+s.from+.5;const a=Jl(n,s.pool,t);return e+Ba(a.cells).length*za(n,t)>s.to?i+s.to+.5:Gr(n,a,t,s.open)}if(e>=s.at)continue;if(s.kind==="gusts")return Pm(n,i,s.phases),i+s.at+.5;const r=Math.floor(Ti(n)*3)-1,o=Math.max(t,i+s.at-(Yv+.5)*za(n,t));return Math.max(Gr(n,Zv(r),o,!1),i+s.at+.5)}return i+Ge+.5}const rx=[1140,1225,1310,1395,1480];function ox(n,t){const e=ze(t),i=za(n,t),s=fn-30-(Bv+.5)*i;if(e<40)return t+(40-e)+.5;if(e<s){const a=Jl(n,Tm,t);return e+Ba(a.cells).length*i>s?t+(s-e)+.5:Gr(n,a,t,!1)}if(e<fn){let a=Gr(n,Ov,t,!1);Pm(n,t-e,rx);const c=ze(a);return c>fn&&c<Co&&(a+=Co-c+.5),a}if(e<Co)return t+(Co-e)+.5;const r=Jl(n,Em,t);return e+Ba(r.cells).length*i>Ge-60?t+(Ge-e)+40:Gr(n,r,t,!0)}const ax={"khau-pha":ox,"ha-giang":sx},cx=ax[hs];function lx(n){for(;n.nextChunkZ<n.z+rt.spawnAheadMeters;)n.nextChunkZ=cx(n,n.nextChunkZ);const t=n.z-rt.despawnBehind;n.obstacles.length&&n.obstacles[0].z<t&&(n.obstacles=n.obstacles.filter(e=>e.z>=t)),n.pickups.length&&n.pickups[0].z<t&&(n.pickups=n.pickups.filter(e=>e.z>=t)),nx(n,t)}const Lm=1e9;function ux(n){const t=rt.thermalTime-.6;for(let e=.5;e<t;e+=.22){const i=n.z+n.speed*1.08*e,s=new Set(n.obstacles.filter(a=>a.kind==="pillar"&&Math.abs(a.z-i)<12).map(a=>a.lane)),r=[-1,0,1].filter(a=>!s.has(a));if(!r.length)continue;const o=r.includes(n.lane)?n.lane:r[0];n.pickups.push({id:Lm+n.trailIds++,kind:"lantern",lane:o,v:rt.thermalHeight,z:i,taken:!1})}n.pickups.sort((e,i)=>e.z-i.z)}function hx(n,t){return n.thermalV>8&&t.id<Lm?!1:!n.pickups.some(e=>e!==t&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-t.z)<.5)}function fx(n){for(const t of n.pickups){if(t.taken)continue;const e=t.z-n.z;if(e>3)break;if(e<-3){t.kind==="lantern"&&e>-3-n.speed/60&&hx(n,t)&&Cm(n);continue}Math.abs(n.x-pn(t.lane))<rt.lanternPickRadius&&Math.abs(n.v-t.v)<rt.lanternPickRadius&&(t.taken=!0,t.kind==="lantern"?(n.lanterns++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak),rh(n,"lantern",rt.lanternScore*n.mult*(n.smokeT>0?rt.smokeLanternMul:1)),n.events.push({type:"lantern",streak:n.streak,id:t.id})):(t.kind==="thermal"?(n.thermalT=rt.thermalTime,n.low=!1,ux(n)):t.kind==="smoke"?(n.smokeT=rt.smokeTime,n.smokes++):n.hp=Math.min(rt.maxHp,n.hp+1),n.events.push({type:"booster",kind:t.kind})))}}function Nm(n,t){const e=Math.sign(t-n.lane);n.lane=t,n.laneT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert=n.vert,n.events.push({type:"lane",dir:e})}function dx(n,t){n.steerX=Math.max(-7,Math.min(rt.steerMax,t));const e=Im(n.lane,n.steerX);e!==n.lane&&Nm(n,e)}function Im(n,t){return Math.abs(t-pn(n))<=rt.laneGap*.57?n:Math.max(-1,Math.min(1,Math.round(-t/rt.laneGap)))}function Dm(n,t,e,i,s,r){const o=n-e,a=t+i*o,c=Math.exp(-i*s);return r.x=e+(o+a*s)*c,r.vel=(t-i*a*s)*c,r}function Um(){return rt.vertIn+rt.vertHold+rt.vertOut}const Ac={x:0,vel:0};function px(n,t){n.vert!=="cruise"&&(!n.alt&&n.holdDive&&n.vertT>rt.vertIn&&n.vertT<rt.vertIn+rt.vertHold&&(n.vertT=rt.vertIn+.01),n.vertT+=t,n.vertT>=(n.alt&&n.vert==="dive"?rt.lowTransition:Um())&&(n.vert="cruise",n.vertT=0));const e=n.vert!=="cruise"&&n.vertT<rt.vertIn+rt.vertHold,i=n.low?-5.5:0,s=e?n.vert==="flare"?rt.flareHeight:-5.5:i;Dm(n.moveV,n.moveVel,s,e||n.low?rt.vertOmegaIn:rt.vertOmegaOut,t,Ac),n.moveV=Ac.x,n.moveVel=Ac.vel}const Rc={x:0,vel:0};function Cc(n,t=!1,e=je.profile){return{mode:"ready",seed:n,alt:t,diff:e,low:!1,smokeT:0,smokes:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],hp:rt.maxHp,stunT:0,hurtRow:-1,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:Yi(0)*2+1,lastBag:[],events:[]}}function mx(n){n.mode="run",n.nextChunkZ=Math.max(n.nextChunkZ,n.z+220)}function bf(n,t){if(t==="left"||t==="right"){const i=t==="left"?-1:1;if(n.laneT<rt.laneTime*.6)return!1;const s=Math.max(-1,Math.min(1,n.lane+i));return n.steerX=pn(s),s!==n.lane&&Nm(n,s),!0}const e=t==="up"?"flare":"dive";return n.alt&&e==="dive"&&n.low?!0:n.vert===e&&n.vertT<Um()-rt.vertOut?!1:(n.alt&&(n.low=e==="dive"),n.vert=e,n.vertT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert="cruise",n.events.push({type:"vert",kind:e}),!0)}function gx(n,t){if(t.row!==n.hurtRow){if(n.hp-=av(t,n.steerX,n.low?"dive":n.vert)?1:n.hp,n.hp>0){n.hurtRow=t.row,n.stunT=rt.stunTime,n.hitstopT=rt.hitstop,n.surge=rt.surgeMin,n.combo=0,n.multNear=0,Cm(n),sh(n),n.events.push({type:"hurt",hp:n.hp,kind:t.kind});return}n.hp=0,n.mode="crash",n.crashT=0,n.hitstopT=rt.hitstop*2,n.events.push({type:"crash",kind:t.kind})}}function vx(n,t,e,i,s=null){if(n.events.length=0,n.time+=i,n.mode==="over")return;if(n.mode==="crash"){n.crashT+=i,n.z+=n.speed*i*Math.max(0,1-n.crashT*1.5),n.crashT>=rt.crashSeconds&&(n.mode="over");return}if(n.hitstopT>0){n.hitstopT-=i;return}const r=n.mode==="run";r&&s!==null&&dx(n,s);for(const d of r?t:[])bf(n,d)||(n.buffered=d,n.bufferT=rt.bufferTime);n.buffered&&(n.bufferT-=i,(bf(n,n.buffered)||n.bufferT<=0)&&(n.buffered=null)),n.holdDive=e&&n.vert==="dive";const o=n.vert==="dive"?rt.diveSpeedMul:n.vert==="flare"?rt.flareSpeedMul:1,a=Math.sin(Math.atan(wi(n.z))),c=n.obstacles.some(d=>!d.passed&&d.z>n.z&&d.z<n.z+n.speed*2.5),l=n.surge>0&&c?rt.surgeTauNearRow:rt.surgeTau;n.surge+=(-9.8*a-n.surge/l)*i,n.surge=r?Math.max(rt.surgeMin,Math.min(rt.surgeMax,n.surge)):0,tx(n,i,c,r);const u=r?pm(n.z,n.diff)*o+n.surge+n.tailwind:24;n.speed+=(u-n.speed)*(1-Math.exp(-i*3)),n.z+=n.speed*i,r&&lx(n);const f=Yi(n.z)*2+(Cn(n.z)>.5?1:0);f!==n.sectionIndex&&(n.sectionIndex=f,n.events.push({type:"section",open:f%2===1,index:f})),n.laneT=Math.min(1,n.laneT+i/rt.laneTime),Dm(n.x,n.xVel,n.steerX,rt.laneOmega,i,Rc),n.x=Rc.x,n.xVel=Rc.vel,px(n,i),n.thermalT>0&&n.thermalT<=i&&n.obstacles.some(d=>(d.kind==="bridge"||d.kind==="ridge"||d.kind==="overhang")&&d.z>n.z&&d.z<n.z+n.speed*2.2)&&(n.thermalT=i*2),n.thermalT=Math.max(0,n.thermalT-i);const h=n.thermalT>0?rt.thermalHeight:0;if(n.thermalV+=(h-n.thermalV)*(1-Math.exp(-i*(n.thermalT>0?2.5:1.8))),n.v=n.thermalV+n.windLift+n.moveV,n.stunT=Math.max(0,n.stunT-i),r&&(n.smokeT=Math.max(0,n.smokeT-i)),r){for(const d of n.obstacles)if(!(d.passed||d.z-n.z>6)){if(ka(d,n.x,n.v,d.z-n.z)){if(d.passed=!0,gx(n,d),n.mode==="crash")return;continue}cv(d,n.z)&&(d.passed=!0,n.time-n.dodgeTime<=rt.nearMissWindow+.1&&ka(d,n.dodgeX,n.alt?n.dodgeV:n.thermalV,0)&&(n.combo++,n.comboT=0,n.multNear=rt.multStep*n.combo,sh(n),rh(n,"nearMiss",25*n.mult),n.events.push({type:"near-miss",combo:n.combo,kind:d.kind})))}fx(n),ex(n),n.comboT+=i,n.comboT>rt.comboBreak&&n.combo>0&&(n.combo=0,n.multNear=0),Jv(n),n.score+=n.speed*i*n.mult}}function Qr(n){return Math.floor(n.score+n.bonus)}const xx=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss"],Fm=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi"],Sf={"wind-loop":.6},Pc=new URLSearchParams(location.search).get("voice"),_x=Pc&&/^[a-z_]+$/.test(Pc)?`audio-opts/voice/${Pc}`:"audio/voice",Mx=n=>Fm.includes(n)?`${_x}/${n}.mp3`:`audio/${n}.mp3`,km=new Map;for(const n of[...xx,...Fm])km.set(n,fetch(Mx(n)).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null));function yx(n){const t=new Map;for(const[e,i]of km)i.then(async s=>{if(!s)return;const r=await n.decodeAudioData(s.slice(0)).catch(()=>null);r&&t.set(e,Sf[e]?Om(n,r,Sf[e]):r)});return{get:e=>t.get(e),play(e,i,s={}){const r=t.get(e);if(!r)return null;const o=n.createBufferSource();o.buffer=r,o.loop=s.loop??!1,o.playbackRate.value=s.rate??1;const a=n.createGain();a.gain.value=s.vol??1;let c=o.connect(a);if(s.pan){const l=n.createStereoPanner();l.pan.value=s.pan,c=c.connect(l)}return c.connect(i),o.start(),o}}}function Om(n,t,e){const i=Math.floor(e*t.sampleRate),s=t.length-i;if(s<=i)return t;const r=n.createBuffer(t.numberOfChannels,s,t.sampleRate);for(let o=0;o<t.numberOfChannels;o++){const a=t.getChannelData(o),c=r.getChannelData(o);c.set(a.subarray(0,s));for(let l=0;l<i;l++){const u=l/i;c[l]=a[l]*Math.sqrt(u)+a[s+l]*Math.sqrt(1-u)}}return r}const Ha=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8,map:"ha-giang"},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9}],Lc=n=>Ha.find(t=>t.id===n),Bm="skyrun.settings",zm="skyrun.sound";function Hm(){try{const n=JSON.parse(localStorage.getItem(zm)??"{}");if(n.v===2)return{sfx:n.sfx!==!1,music:n.music!==!1};const t=n.muted===!0;return{sfx:!t,music:!t&&n.music!==!1}}catch{return{sfx:!0,music:!0}}}function bx(n){try{localStorage.setItem(zm,JSON.stringify({v:2,...n}))}catch{}}const Sx=["on","dim","off"];function jr(){try{const n=JSON.parse(localStorage.getItem(Bm)??"{}");return{music:typeof n.music=="string"?n.music:"shuffle",ghosts:Sx.includes(n.ghosts)?n.ghosts:"on"}}catch{return{music:"shuffle",ghosts:"on"}}}function Gm(n){try{localStorage.setItem(Bm,JSON.stringify({...jr(),...n}))}catch{}}const fr=3,wx=-13.1,Tx=20,Nc=n=>{const t=Ha.filter(i=>i.id!==n&&(!i.map||i.map===hs));return(n===null?t.find(i=>i.map===hs):void 0)??t[Math.floor(Math.random()*t.length)]??Ha[0]};function Ex(n,t){const e=new Map;let i=!1;dm.then(()=>i=!0);let s=!1,r=jr().music,o=Nc(null),a=null;const c=d=>{let p=e.get(d.id);return p||e.set(d.id,p={bytes:jg(d.file),buf:null,decoding:!1}),p},l=(...d)=>{for(const p of e.keys())d.includes(p)||e.delete(p)},u=(d,p)=>{const x=c(d);return x.buf?!0:(p&&!x.decoding&&(x.decoding=!0,x.bytes.then(async g=>{const m=g&&await n.decodeAudioData(g).catch(()=>null);m&&e.get(d.id)===x&&(x.buf=Om(n,m,fr))})),!1)},f=d=>Math.min(1.6,10**((wx-d.lufs)/20)),h=(d,p)=>{const x=n.currentTime,g=n.createBufferSource();g.buffer=e.get(d.id).buf,g.loop=!0;const m=n.createGain();if(m.gain.setValueAtTime(0,x),m.gain.linearRampToValueAtTime(f(d),x+p),g.connect(m).connect(t),g.start(x,fr),a){const M=a.gain.gain;M.cancelScheduledValues(x),M.setValueAtTime(M.value,x),M.linearRampToValueAtTime(0,x+p),a.src.stop(x+p+.05)}a={t:d,src:g,gain:m,at:x-fr},o=r==="shuffle"?Nc(d.id):d,l(d.id,o.id),c(o)};return{tick(d,p){if(!d)return;const x=r==="shuffle"?null:Lc(r)??null;if(!a||x&&x.id!==a.t.id){const M=x??o;(a||i||s)&&u(M,!0)&&h(M,1);return}if(x||o.id===a.t.id)return;const g=a.src.buffer.duration,m=g-(n.currentTime-a.at)%g;u(o,p||m<Tx)&&m<fr&&h(o,fr)},choice:()=>r,setChoice(d){r=d==="shuffle"||Lc(d)?d:"shuffle",Gm({music:r}),s=!0,!(r!=="shuffle"||!a)&&(o=Nc(a.t.id),l(a.t.id,o.id),c(o))},playing:()=>a?.t??null,loading:()=>{const d=r==="shuffle"?a?null:o:Lc(r)??null;return d&&d.id!==a?.t.id&&!e.get(d.id)?.buf?d:null},held:()=>[...e].map(([d,p])=>p.buf?`${d}:pcm`:d)}}const _o=Ge*je.dayCycles,Ga=je.dayCutPhase-ri+_o,Vm={"khau-pha":"Khau Phạ","ha-giang":"Hà Giang"};function Wm(n){return n<Ga?1:2+Math.floor((n-Ga)/_o)}function Ql(n){return n<=1?0:Ga+(n-2)*_o}const Mo={value:0};let Xm="khau-pha";function Ax(n){Xm=n,Mo.value=n==="ha-giang"?1:0}const Va=()=>Xm,yo=()=>Mo.value,oh="uniform float uRegionHg;";function qm(n,t=!1){return{dusk:(t?.34:.62)*(1-At(0,.08,n))+.5*At(.52,.66,n)+.5*At(.68,.78,n)-.38*At(.95,1,n),morn:At(.03,.14,n)*(1-At(.3,.45,n))}}function Rx(n){const t=Wm(n),e=Ql(t),i=Math.min(1,Math.max(0,(n-e)/(t===1?Ga:_o)));return{day:t,region:Va(),u:i,...qm(i,t===1)}}function Cx(n){return n.u>=.95?"Rạng sáng":n.u>=.74?"Đêm đèn trời":n.u>=.56?"Hoàng hôn":n.u<.1?"Bình minh":n.u<.4?"Buổi sáng":"Chiều vàng"}function $m(n){const t=n.u<.5?0:n.dusk>=.98?2:n.dusk>=.48?1:0;return(n.day-1)*3+t}function Px(n){let t=null;const e=s=>{t=s===null?null:{day:1,region:Va(),u:s,...qm(s,!0)}},i=s=>{t=s===null?null:{day:1,region:Va(),u:.52+.26*s,dusk:s,morn:0}};return n.has("dusk")&&i(Number(n.get("dusk"))),n.has("clock")&&e(Number(n.get("clock"))),{at:s=>t??Rx(s),forceU:e,forceDusk:i}}const Lx={rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},wf=[0,2,4,7,9],Lo=.32,Tf=.85,Nx=.6;function Ix(){let n=null,t=null,e=null,i=null,s=null,r=null,o=null,a=null,c=null,l=null;const u=Hm();let f=u.sfx,h=u.music;const d=()=>bx({sfx:f,music:h});let p=0,x=0,g=null,m=0;const M=()=>{if(n){n.state==="suspended"&&n.resume();return}n=new AudioContext,t=yx(n);const y=n.createDynamicsCompressor();y.threshold.value=-10,y.ratio.value=4,y.connect(n.destination),e=n.createGain(),e.gain.value=.9,e.connect(y);const w=b=>{const T=n.createGain();return T.gain.value=b,T.connect(e),T};i=w(f?1:0),s=w(f?Tf:0),r=w(h?Lo:0),l=Ex(n,r),a=n.createBiquadFilter(),a.type="lowpass",o=n.createGain(),o.gain.value=0,a.connect(o).connect(i)};M();for(const y of["keydown","pointerdown","touchstart","touchend","click"])window.addEventListener(y,M);const S=(y,w)=>{t&&i&&t.play(y,i,w)},v=(y,w)=>{if(!n||!t||!s||!r||!f)return;const b=n.currentTime;if(b<p&&w<=x)return;const T=t.get(y);T&&(g?.stop(),g=t.play(y,s),p=b+T.duration,x=w,h&&(r.gain.setTargetAtTime(Lo*Nx,b,.05),r.gain.setTargetAtTime(Lo,b+T.duration,.3)))},_=y=>1+(Math.random()*2-1)*y;return{update(y,w,b){if(!n||!t||!o||!a)return;!c&&t.get("wind-loop")&&(c=t.play("wind-loop",a,{loop:!0})),l?.tick(h,!w);const T=n.currentTime;c&&c.playbackRate.setTargetAtTime(.85+.35*y,T,.2),a.frequency.setTargetAtTime(900+6e3*y,T,.15),o.gain.setTargetAtTime(w?.35+1.1*y*y:.2,T,.25);const A=$m(b);w&&A>m&&A%3&&v(A%3===1?"chang-vang":"dem-hoi",1),m=w?Math.max(m,A):0},events(y,w){for(const b of y)if(b.type==="lantern"){const T=wf[(b.streak-1)%wf.length];S("lantern-chime",{vol:.55,rate:Math.pow(2,T/12)}),b.streak===10&&v("den-troi-chuoi",1)}else if(b.type==="near-miss")S("near-miss",{vol:.8,rate:_(.08)*(1+.02*Math.min(10,b.combo))}),b.combo===3?v("suot-dep",1):b.combo===6&&v("qua-dinh",1);else if(b.type==="lane")S("lane-whoosh",{vol:.25,rate:_(.1),pan:.5*b.dir});else if(b.type==="vert")S(b.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:_(.05)});else if(b.type==="gust")S("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(b.chain-1))/12)}),b.full&&S("thermal-boost",{vol:.7});else if(b.type==="booster"){const[T,A,C]=b.kind==="thermal"?["thermal-boost",.8,"luong-nhiet"]:b.kind==="smoke"?["smoke-hiss",.75,null]:["shield-pickup",1.4,"du-du-phong"];S(T,{vol:A}),C&&v(C,2)}else b.type==="hurt"?S("shield-hit",{vol:1.2,rate:_(.05)}):b.type==="crash"?S("crash",{vol:1.3}):b.type==="section"&&w&&!b.open&&!ae.zoneNames&&v("khe-da",1)},reveal(){S("reveal-stinger",{vol:.6}),ae.zoneNames||v("thung-lung",1)},zone(y){const w=Lx[y];w&&v(w,1)},runStart(){M(),S("run-start",{vol:.8}),v("cat-canh",2)},over(y){S("game-over",{vol:.5}),v(y?"ky-luc":"ha-canh",3)},toggleSfx(){return M(),f=!f,i&&s&&n&&(i.gain.setTargetAtTime(f?1:0,n.currentTime,.05),s.gain.setTargetAtTime(f?Tf:0,n.currentTime,.05)),d(),f},toggleMusic(){return M(),h=!h,r&&n&&(r.gain.cancelScheduledValues(n.currentTime),r.gain.setTargetAtTime(h?Lo:0,n.currentTime,.3)),d(),h},prefs:()=>({sfx:f,music:h}),music:()=>l}}const ah="186",Dx=0,Ef=1,Ux=2,wa=1,Fx=2,Ir=3,Ai=0,Qe=1,we=2,ii=0,Vr=1,mn=2,Af=3,Rf=4,kx=5,zs=100,Ox=101,Bx=102,zx=103,Hx=104,Gx=200,Vx=201,Wx=202,Xx=203,Km=204,Ym=205,qx=206,$x=207,Kx=208,Yx=209,Zx=210,Jx=211,Qx=212,jx=213,t_=214,jl=0,tu=1,eu=2,to=3,nu=4,iu=5,su=6,ru=7,ch=0,e_=1,n_=2,si=0,lh=1,uh=2,hh=3,cc=4,fh=5,dh=6,ph=7,Cf="attached",i_="detached",Zm=300,ds=301,Zs=302,Ic=303,Dc=304,lc=306,Js=1e3,ti=1001,Wa=1002,Ve=1003,Jm=1004,Dr=1005,We=1006,Ta=1007,yi=1008,Mn=1009,Qm=1010,jm=1011,eo=1012,mh=1013,oi=1014,En=1015,dn=1016,gh=1017,vh=1018,no=1020,t0=35902,e0=35899,n0=1021,i0=1022,An=1023,Ri=1026,cs=1027,xh=1028,_h=1029,ps=1030,Mh=1031,yh=1033,Ea=33776,Aa=33777,Ra=33778,Ca=33779,ou=35840,au=35841,cu=35842,lu=35843,uu=36196,hu=37492,fu=37496,du=37488,pu=37489,Xa=37490,mu=37491,gu=37808,vu=37809,xu=37810,_u=37811,Mu=37812,yu=37813,bu=37814,Su=37815,wu=37816,Tu=37817,Eu=37818,Au=37819,Ru=37820,Cu=37821,Pu=36492,Lu=36494,Nu=36495,Iu=36283,Du=36284,qa=36285,Uu=36286,io=2300,so=2301,Uc=2302,Pf=2303,Lf=2400,Nf=2401,If=2402,s_=2500,r_=0,s0=1,Fu=2,o_=3200,$a=0,a_=1,qi="",He="srgb",yn="srgb-linear",Ka="linear",fe="srgb",Fc=7680,c_=519,l_=512,u_=513,h_=514,bh=515,f_=516,d_=517,Sh=518,p_=519,r0=35044,Df="300 es",ei=2e3,ro=2001;function m_(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function g_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function oo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function v_(){const n=oo("canvas");return n.style.display="block",n}const Uf={};function Ya(...n){const t="THREE."+n.shift();console.log(t,...n)}function o0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Dt(...n){n=o0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Vt(...n){n=o0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Xs(...n){const t=n.join(" ");t in Uf||(Uf[t]=!0,Dt(...n))}function x_(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const __={[jl]:tu,[eu]:su,[nu]:ru,[to]:iu,[tu]:jl,[su]:eu,[ru]:nu,[iu]:to};class gs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ff=1234567;const Wr=Math.PI/180,Qs=180/Math.PI;function Rn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function te(n,t,e){return Math.max(t,Math.min(e,n))}function wh(n,t){return(n%t+t)%t}function M_(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function y_(n,t,e){return n!==t?(e-n)/(t-n):0}function Xr(n,t,e){return(1-e)*n+e*t}function b_(n,t,e,i){return Xr(n,t,1-Math.exp(-e*i))}function S_(n,t=1){return t-Math.abs(wh(n,t*2)-t)}function w_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function T_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function E_(n,t){return n+Math.floor(Math.random()*(t-n+1))}function A_(n,t){return n+Math.random()*(t-n)}function R_(n){return n*(.5-Math.random())}function C_(n){n!==void 0&&(Ff=n);let t=Ff+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function P_(n){return n*Wr}function L_(n){return n*Qs}function N_(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function I_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function D_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function U_(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),h=o((t-i)/2),d=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*p,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*p,a*l);break;case"ZYZ":n.set(c*p,c*d,a*u,a*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function On(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ge(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const F_={DEG2RAD:Wr,RAD2DEG:Qs,generateUUID:Rn,clamp:te,euclideanModulo:wh,mapLinear:M_,inverseLerp:y_,lerp:Xr,damp:b_,pingpong:S_,smoothstep:w_,smootherstep:T_,randInt:E_,randFloat:A_,randFloatSpread:R_,seededRandom:C_,degToRad:P_,radToDeg:L_,isPowerOfTwo:N_,ceilPowerOfTwo:I_,floorPowerOfTwo:D_,setQuaternionFromProperEuler:U_,normalize:ge,denormalize:On};class ot{static{ot.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],d=r[o+1],p=r[o+2],x=r[o+3];if(f!==x||c!==h||l!==d||u!==p){let g=c*h+l*d+u*p+f*x;g<0&&(h=-h,d=-d,p=-p,x=-x,g=-g);let m=1-a;if(g<.9995){const M=Math.acos(g),S=Math.sin(M);m=Math.sin(m*M)/S,a=Math.sin(a*M)/S,c=c*m+h*a,l=l*m+d*a,u=u*m+p*a,f=f*m+x*a}else{c=c*m+h*a,l=l*m+d*a,u=u*m+p*a,f=f*m+x*a;const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+u*f+c*d-l*h,t[e+1]=c*p+u*h+l*f-a*d,t[e+2]=l*p+u*d+a*h-c*f,t[e+3]=u*p-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),h=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f+h*d*p;break;case"YZX":this._x=h*u*f+l*d*p,this._y=l*d*f+h*u*p,this._z=l*u*p-h*d*f,this._w=l*u*f-h*d*p;break;case"XZY":this._x=h*u*f-l*d*p,this._y=l*d*f-h*u*p,this._z=l*u*p+h*d*f,this._w=l*u*f+h*d*p;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{static{P.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(kf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(kf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return kc.copy(this).projectOnVector(t),this.sub(kc)}reflect(t){return this.sub(kc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kc=new P,kf=new Ne;class $t{static{$t.prototype.isMatrix3=!0}constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],x=s[0],g=s[3],m=s[6],M=s[1],S=s[4],v=s[7],_=s[2],y=s[5],w=s[8];return r[0]=o*x+a*M+c*_,r[3]=o*g+a*S+c*y,r[6]=o*m+a*v+c*w,r[1]=l*x+u*M+f*_,r[4]=l*g+u*S+f*y,r[7]=l*m+u*v+f*w,r[2]=h*x+d*M+p*_,r[5]=h*g+d*S+p*y,r[8]=h*m+d*v+p*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*r,d=l*r-o*c,p=e*f+i*h+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=f*x,t[1]=(s*l-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=h*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(i*c-l*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oc.makeScale(t,e)),this}rotate(t){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oc.makeRotation(-t)),this}translate(t,e){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Oc=new $t,Of=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bf=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function k_(){const n={enabled:!0,workingColorSpace:yn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===fe&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===fe&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qi?Ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[yn]:{primaries:t,whitePoint:i,transfer:Ka,toXYZ:Of,fromXYZ:Bf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:Of,fromXYZ:Bf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),n}const ne=k_();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ms;class O_{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ms===void 0&&(Ms=oo("canvas")),Ms.width=t.width,Ms.height=t.height;const s=Ms.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ms}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=oo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let B_=0;class Th{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:B_++}),this.uuid=Rn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Bc(s[o].image)):r.push(Bc(s[o]))}else r=Bc(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Bc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?O_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let z_=0;const zc=new P;class Xe extends gs{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,i=ti,s=ti,r=We,o=yi,a=An,c=Mn,l=Xe.DEFAULT_ANISOTROPY,u=qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Rn(),this.name="",this.source=new Th(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zc).x}get height(){return this.source.getSize(zc).y}get depth(){return this.source.getSize(zc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Js:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case Wa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Js:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case Wa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=Zm;Xe.DEFAULT_ANISOTROPY=1;class de{static{de.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(d+1)/2,_=(m+1)/2,y=(u+h)/4,w=(f+x)/4,b=(p+g)/4;return S>v&&S>_?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=y/i,r=w/i):v>_?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=y/s,r=b/s):_<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(_),i=w/r,s=b/r),this.set(i,s,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-x)/M,this.z=(h-u)/M,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class H_ extends gs{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Xe(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:We,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Th(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends H_{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class a0 extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class G_ extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Ot{static{Ot.prototype.isMatrix4=!0}constructor(t,e,i,s,r,o,a,c,l,u,f,h,d,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,h,d,p,x,g)}set(t,e,i,s,r,o,a,c,l,u,f,h,d,p,x,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/ys.setFromMatrixColumn(t,0).length(),r=1/ys.setFromMatrixColumn(t,1).length(),o=1/ys.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,p=a*u,x=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+p*l,e[5]=h-x*l,e[9]=-a*c,e[2]=x-h*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,p=l*u,x=l*f;e[0]=h+x*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-p,e[6]=x+h*a,e[10]=o*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,p=l*u,x=l*f;e[0]=h-x*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*u,e[9]=x-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const h=o*u,d=o*f,p=a*u,x=a*f;e[0]=c*u,e[4]=p*l-d,e[8]=h*l+x,e[1]=c*f,e[5]=x*l+h,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const h=o*c,d=o*l,p=a*c,x=a*l;e[0]=c*u,e[4]=x-h*f,e[8]=p*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+p,e[10]=h-x*f}else if(t.order==="XZY"){const h=o*c,d=o*l,p=a*c,x=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+x,e[5]=o*u,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*u,e[10]=x*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(V_,t,W_)}lookAt(t,e,i){const s=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Di.crossVectors(i,vn),Di.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Di.crossVectors(i,vn)),Di.normalize(),No.crossVectors(vn,Di),s[0]=Di.x,s[4]=No.x,s[8]=vn.x,s[1]=Di.y,s[5]=No.y,s[9]=vn.y,s[2]=Di.z,s[6]=No.z,s[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],x=i[6],g=i[10],m=i[14],M=i[3],S=i[7],v=i[11],_=i[15],y=s[0],w=s[4],b=s[8],T=s[12],A=s[1],C=s[5],L=s[9],D=s[13],N=s[2],B=s[6],H=s[10],W=s[14],j=s[3],O=s[7],$=s[11],Q=s[15];return r[0]=o*y+a*A+c*N+l*j,r[4]=o*w+a*C+c*B+l*O,r[8]=o*b+a*L+c*H+l*$,r[12]=o*T+a*D+c*W+l*Q,r[1]=u*y+f*A+h*N+d*j,r[5]=u*w+f*C+h*B+d*O,r[9]=u*b+f*L+h*H+d*$,r[13]=u*T+f*D+h*W+d*Q,r[2]=p*y+x*A+g*N+m*j,r[6]=p*w+x*C+g*B+m*O,r[10]=p*b+x*L+g*H+m*$,r[14]=p*T+x*D+g*W+m*Q,r[3]=M*y+S*A+v*N+_*j,r[7]=M*w+S*C+v*B+_*O,r[11]=M*b+S*L+v*H+_*$,r[15]=M*T+S*D+v*W+_*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],p=t[3],x=t[7],g=t[11],m=t[15],M=c*d-l*h,S=a*d-l*f,v=a*h-c*f,_=o*d-l*u,y=o*h-c*u,w=o*f-a*u;return e*(x*M-g*S+m*v)-i*(p*M-g*_+m*y)+s*(p*S-x*_+m*w)-r*(p*v-x*y+g*w)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],p=t[12],x=t[13],g=t[14],m=t[15],M=e*a-i*o,S=e*c-s*o,v=e*l-r*o,_=i*c-s*a,y=i*l-r*a,w=s*l-r*c,b=u*x-f*p,T=u*g-h*p,A=u*m-d*p,C=f*g-h*x,L=f*m-d*x,D=h*m-d*g,N=M*D-S*L+v*C+_*A-y*T+w*b;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/N;return t[0]=(a*D-c*L+l*C)*B,t[1]=(s*L-i*D-r*C)*B,t[2]=(x*w-g*y+m*_)*B,t[3]=(h*y-f*w-d*_)*B,t[4]=(c*A-o*D-l*T)*B,t[5]=(e*D-s*A+r*T)*B,t[6]=(g*v-p*w-m*S)*B,t[7]=(u*w-h*v+d*S)*B,t[8]=(o*L-a*A+l*b)*B,t[9]=(i*A-e*L-r*b)*B,t[10]=(p*y-x*v+m*M)*B,t[11]=(f*v-u*y-d*M)*B,t[12]=(a*T-o*C-c*b)*B,t[13]=(e*C-i*T+s*b)*B,t[14]=(x*S-p*_-g*M)*B,t[15]=(u*_-f*S+h*M)*B,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,h=r*l,d=r*u,p=r*f,x=o*u,g=o*f,m=a*f,M=c*l,S=c*u,v=c*f,_=i.x,y=i.y,w=i.z;return s[0]=(1-(x+m))*_,s[1]=(d+v)*_,s[2]=(p-S)*_,s[3]=0,s[4]=(d-v)*y,s[5]=(1-(h+m))*y,s[6]=(g+M)*y,s[7]=0,s[8]=(p+S)*w,s[9]=(g-M)*w,s[10]=(1-(h+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=ys.set(s[0],s[1],s[2]).length();const a=ys.set(s[4],s[5],s[6]).length(),c=ys.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Ln.copy(this);const l=1/o,u=1/a,f=1/c;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=u,Ln.elements[5]*=u,Ln.elements[6]*=u,Ln.elements[8]*=f,Ln.elements[9]*=f,Ln.elements[10]*=f,e.setFromRotationMatrix(Ln),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=ei,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s);let p,x;if(c)p=r/(o-r),x=o*r/(o-r);else if(a===ei)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===ro)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ei,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s);let p,x;if(c)p=1/(o-r),x=o/(o-r);else if(a===ei)p=-2/(o-r),x=-(o+r)/(o-r);else if(a===ro)p=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ys=new P,Ln=new Ot,V_=new P(0,0,0),W_=new P(1,1,1),Di=new P,No=new P,vn=new P,zf=new Ot,Hf=new Ne;class ai{constructor(t=0,e=0,i=0,s=ai.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return zf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hf.setFromEuler(this),this.setFromQuaternion(Hf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ai.DEFAULT_ORDER="XYZ";class c0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let X_=0;const Gf=new P,bs=new Ne,hi=new Ot,Io=new P,dr=new P,q_=new P,$_=new Ne,Vf=new P(1,0,0),Wf=new P(0,1,0),Xf=new P(0,0,1),qf={type:"added"},K_={type:"removed"},Ss={type:"childadded",child:null},Hc={type:"childremoved",child:null};class Pe extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new P,e=new ai,i=new Ne,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new $t}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new c0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.multiply(bs),this}rotateOnWorldAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.premultiply(bs),this}rotateX(t){return this.rotateOnAxis(Vf,t)}rotateY(t){return this.rotateOnAxis(Wf,t)}rotateZ(t){return this.rotateOnAxis(Xf,t)}translateOnAxis(t,e){return Gf.copy(t).applyQuaternion(this.quaternion),this.position.add(Gf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vf,t)}translateY(t){return this.translateOnAxis(Wf,t)}translateZ(t){return this.translateOnAxis(Xf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Io.copy(t):Io.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(dr,Io,this.up):hi.lookAt(Io,dr,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),bs.setFromRotationMatrix(hi),this.quaternion.premultiply(bs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qf),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(K_),Hc.child=t,this.dispatchEvent(Hc),Hc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qf),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,t,q_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,$_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Pe.DEFAULT_UP=new P(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class De extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Y_={type:"move"};class Gc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new De,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new De,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new De,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,i),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&h>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Y_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new De;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const l0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},Do={h:0,s:0,l:0};function Vc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ne.workingColorSpace){if(t=wh(t,1),e=te(e,0,1),i=te(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Vc(o,r,t+1/3),this.g=Vc(o,r,t),this.b=Vc(o,r,t-1/3)}return ne.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function i(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const i=l0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return ne.workingToColorSpace(sn.copy(this),t),Math.round(te(sn.r*255,0,255))*65536+Math.round(te(sn.g*255,0,255))*256+Math.round(te(sn.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(sn.copy(this),e);const i=sn.r,s=sn.g,r=sn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=He){ne.workingToColorSpace(sn.copy(this),t);const e=sn.r,i=sn.g,s=sn.b;return t!==He?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ui),this.setHSL(Ui.h+t,Ui.s+e,Ui.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ui),t.getHSL(Do);const i=Xr(Ui.h,Do.h,e),s=Xr(Ui.s,Do.s,e),r=Xr(Ui.l,Do.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new ct;ct.NAMES=l0;class Eh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new Eh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Z_ extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ai,this.environmentIntensity=1,this.environmentRotation=new ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Nn=new P,fi=new P,Wc=new P,di=new P,ws=new P,Ts=new P,$f=new P,Xc=new P,qc=new P,$c=new P,Kc=new de,Yc=new de,Zc=new de;class Bn{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Nn.subVectors(t,e),s.cross(Nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Nn.subVectors(s,e),fi.subVectors(i,e),Wc.subVectors(t,e);const o=Nn.dot(Nn),a=Nn.dot(fi),c=Nn.dot(Wc),l=fi.dot(fi),u=fi.dot(Wc),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,p=(o*u-a*c)*h;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,di.x),c.addScaledVector(o,di.y),c.addScaledVector(a,di.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Kc.setScalar(0),Yc.setScalar(0),Zc.setScalar(0),Kc.fromBufferAttribute(t,e),Yc.fromBufferAttribute(t,i),Zc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Kc,r.x),o.addScaledVector(Yc,r.y),o.addScaledVector(Zc,r.z),o}static isFrontFacing(t,e,i,s){return Nn.subVectors(i,e),fi.subVectors(t,e),Nn.cross(fi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Nn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Nn.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Bn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ws.subVectors(s,i),Ts.subVectors(r,i),Xc.subVectors(t,i);const c=ws.dot(Xc),l=Ts.dot(Xc);if(c<=0&&l<=0)return e.copy(i);qc.subVectors(t,s);const u=ws.dot(qc),f=Ts.dot(qc);if(u>=0&&f<=u)return e.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(ws,o);$c.subVectors(t,r);const d=ws.dot($c),p=Ts.dot($c);if(p>=0&&d<=p)return e.copy(r);const x=d*l-c*p;if(x<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(Ts,a);const g=u*p-d*f;if(g<=0&&f-u>=0&&d-p>=0)return $f.subVectors(r,s),a=(f-u)/(f-u+(d-p)),e.copy(s).addScaledVector($f,a);const m=1/(g+x+h);return o=x*m,a=h*m,e.copy(i).addScaledVector(ws,o).addScaledVector(Ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ci{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(In.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(In.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=In.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,In):In.fromBufferAttribute(r,o),In.applyMatrix4(t.matrixWorld),this.expandByPoint(In);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Uo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Uo.copy(i.boundingBox)),Uo.applyMatrix4(t.matrixWorld),this.union(Uo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,In),In.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pr),Fo.subVectors(this.max,pr),Es.subVectors(t.a,pr),As.subVectors(t.b,pr),Rs.subVectors(t.c,pr),Fi.subVectors(As,Es),ki.subVectors(Rs,As),Qi.subVectors(Es,Rs);let e=[0,-Fi.z,Fi.y,0,-ki.z,ki.y,0,-Qi.z,Qi.y,Fi.z,0,-Fi.x,ki.z,0,-ki.x,Qi.z,0,-Qi.x,-Fi.y,Fi.x,0,-ki.y,ki.x,0,-Qi.y,Qi.x,0];return!Jc(e,Es,As,Rs,Fo)||(e=[1,0,0,0,1,0,0,0,1],!Jc(e,Es,As,Rs,Fo))?!1:(ko.crossVectors(Fi,ki),e=[ko.x,ko.y,ko.z],Jc(e,Es,As,Rs,Fo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,In).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(In).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const pi=[new P,new P,new P,new P,new P,new P,new P,new P],In=new P,Uo=new Ci,Es=new P,As=new P,Rs=new P,Fi=new P,ki=new P,Qi=new P,pr=new P,Fo=new P,ko=new P,ji=new P;function Jc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ji.fromArray(n,r);const a=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),c=t.dot(ji),l=e.dot(ji),u=i.dot(ji);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Oe=new P,Oo=new ot;let J_=0;class wt extends gs{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:J_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=r0,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Oo.fromBufferAttribute(this,e),Oo.applyMatrix3(t),this.setXY(e,Oo.x,Oo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=On(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=On(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=On(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=On(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=On(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class u0 extends wt{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class h0 extends wt{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Zt extends wt{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Q_=new Ci,mr=new P,Qc=new P;class Vn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Q_.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mr.subVectors(t,this.center);const e=mr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(mr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mr.copy(t.center).add(Qc)),this.expandByPoint(mr.copy(t.center).sub(Qc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let j_=0;const Sn=new Ot,jc=new Pe,Cs=new P,xn=new Ci,gr=new Ci,Ye=new P;class Kt extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(m_(t)?h0:u0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Sn.makeRotationFromQuaternion(t),this.applyMatrix4(Sn),this}rotateX(t){return Sn.makeRotationX(t),this.applyMatrix4(Sn),this}rotateY(t){return Sn.makeRotationY(t),this.applyMatrix4(Sn),this}rotateZ(t){return Sn.makeRotationZ(t),this.applyMatrix4(Sn),this}translate(t,e,i){return Sn.makeTranslation(t,e,i),this.applyMatrix4(Sn),this}scale(t,e,i){return Sn.makeScale(t,e,i),this.applyMatrix4(Sn),this}lookAt(t){return jc.lookAt(t),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(xn.min,gr.min),xn.expandByPoint(Ye),Ye.addVectors(xn.max,gr.max),xn.expandByPoint(Ye)):(xn.expandByPoint(gr.min),xn.expandByPoint(gr.max))}xn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ye.fromBufferAttribute(a,l),c&&(Cs.fromBufferAttribute(t,l),Ye.add(Cs)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new wt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let b=0;b<i.count;b++)a[b]=new P,c[b]=new P;const l=new P,u=new P,f=new P,h=new ot,d=new ot,p=new ot,x=new P,g=new P;function m(b,T,A){l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,A),h.fromBufferAttribute(r,b),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,A),u.sub(l),f.sub(l),d.sub(h),p.sub(h);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(C),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(C),a[b].add(x),a[T].add(x),a[A].add(x),c[b].add(g),c[T].add(g),c[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let b=0,T=M.length;b<T;++b){const A=M[b],C=A.start,L=A.count;for(let D=C,N=C+L;D<N;D+=3)m(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const S=new P,v=new P,_=new P,y=new P;function w(b){_.fromBufferAttribute(s,b),y.copy(_);const T=a[b];S.copy(T),S.sub(_.multiplyScalar(_.dot(T))).normalize(),v.crossVectors(y,T);const C=v.dot(c[b])<0?-1:1;o.setXYZW(b,S.x,S.y,S.z,C)}for(let b=0,T=M.length;b<T;++b){const A=M[b],C=A.start,L=A.count;for(let D=C,N=C+L;D<N;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new wt(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,u=new P,f=new P;if(t)for(let h=0,d=t.count;h<d;h+=3){const p=t.getX(h+0),x=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,p=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*u;for(let m=0;m<u;m++)h[p++]=l[d++]}return new wt(h,u,f)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Kt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=r0,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const an=new P;class Ah{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyMatrix4(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyNormalMatrix(t),this.setXYZ(e,an.x,an.y,an.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.transformDirection(t),this.setXYZ(e,an.x,an.y,an.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=On(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=On(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=On(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=On(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=On(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ya("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new wt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ah(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ya("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tl=new P,eM=new P,nM=new $t;class Wi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=tl.subVectors(i,e).cross(eM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(tl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||nM.getNormalMatrix(t),s=this.coplanarPoint(tl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let iM=0;class Hn extends gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iM++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=Vr,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Km,this.blendDst=Ym,this.blendEquation=zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=to,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=c_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fc,this.stencilZFail=Fc,this.stencilZPass=Fc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Wi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const mi=new P,el=new P,Bo=new P,zo=new P;class uc{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mi.copy(this.origin).addScaledVector(this.direction,e),mi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){el.copy(t).add(e).multiplyScalar(.5),Bo.copy(e).sub(t).normalize(),zo.copy(this.origin).sub(el);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Bo),a=zo.dot(this.direction),c=-zo.dot(Bo),l=zo.lengthSq(),u=Math.abs(1-o*o);let f,h,d,p;if(u>0)if(f=o*c-a,h=o*a-c,p=r*u,f>=0)if(h>=-p)if(h<=p){const x=1/u;f*=x,h*=x,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-p?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=p?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(el).addScaledVector(Bo,h),d}intersectSphere(t,e){if(t.radius<0)return null;mi.subVectors(t.center,this.origin);const i=mi.dot(this.direction),s=mi.dot(mi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,mi)!==null}intersectTriangle(t,e,i,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,d=t.z-o.z,p=e.x-o.x,x=e.y-o.y,g=e.z-o.z,m=i.x-o.x,M=i.y-o.y,S=i.z-o.z,v=Math.abs(c),_=Math.abs(l),y=Math.abs(u);let w,b,T,A,C,L,D,N,B,H,W,j;if(v>=_&&v>=y?(T=c,L=f,B=p,j=m,c>=0?(w=l,b=u,A=h,C=d,D=x,N=g,H=M,W=S):(w=u,b=l,A=d,C=h,D=g,N=x,H=S,W=M)):_>=y?(T=l,L=h,B=x,j=M,l>=0?(w=u,b=c,A=d,C=f,D=g,N=p,H=S,W=m):(w=c,b=u,A=f,C=d,D=p,N=g,H=m,W=S)):(T=u,L=d,B=g,j=S,u>=0?(w=c,b=l,A=f,C=h,D=p,N=x,H=m,W=M):(w=l,b=c,A=h,C=f,D=x,N=p,H=M,W=m)),T===0)return null;const O=w/T,$=b/T,Q=1/T,_t=A-O*L,ft=C-$*L,St=D-O*B,Nt=N-$*B,zt=H-O*j,X=W-$*j,Y=zt*Nt-X*St,yt=_t*X-ft*zt,Pt=St*ft-Nt*_t;if(s){if(Y<0||yt<0||Pt<0)return null}else if((Y<0||yt<0||Pt<0)&&(Y>0||yt>0||Pt>0))return null;const it=Y+yt+Pt;if(it===0)return null;const Wt=Q*(Y*L+yt*B+Pt*j);return(it>0?Wt<0:Wt>0)?null:this.at(Wt/it,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rn extends Hn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Kf=new Ot,ts=new uc,Ho=new Vn,Yf=new P,Go=new P,Vo=new P,Wo=new P,nl=new P,Xo=new P,Zf=new P,qo=new P;class Xt extends Pe{constructor(t=new Kt,e=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(nl.fromBufferAttribute(f,t),o?Xo.addScaledVector(nl,u):Xo.addScaledVector(nl.sub(e),u))}e.add(Xo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(Ho.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Ho,Yf)===null||ts.origin.distanceToSquared(Yf)>(t.far-t.near)**2))&&(Kf.copy(r).invert(),ts.copy(t.ray).applyMatrix4(Kf),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=h.length;p<x;p++){const g=h[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,_=S;v<_;v+=3){const y=a.getX(v),w=a.getX(v+1),b=a.getX(v+2);s=$o(this,m,t,i,l,u,f,y,w,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){const M=a.getX(g),S=a.getX(g+1),v=a.getX(g+2);s=$o(this,o,t,i,l,u,f,M,S,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,x=h.length;p<x;p++){const g=h[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,_=S;v<_;v+=3){const y=v,w=v+1,b=v+2;s=$o(this,m,t,i,l,u,f,y,w,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){const M=g,S=g+1,v=g+2;s=$o(this,o,t,i,l,u,f,M,S,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function sM(n,t,e,i,s,r,o,a){let c;if(t.side===Qe?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ai,a),c===null)return null;qo.copy(a),qo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(qo);return l<e.near||l>e.far?null:{distance:l,point:qo.clone(),object:n}}function $o(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Go),n.getVertexPosition(c,Vo),n.getVertexPosition(l,Wo);const u=sM(n,t,e,i,Go,Vo,Wo,Zf);if(u){const f=new P;Bn.getBarycoord(Zf,Go,Vo,Wo,f),s&&(u.uv=Bn.getInterpolatedAttribute(s,a,c,l,f,new ot)),r&&(u.uv1=Bn.getInterpolatedAttribute(r,a,c,l,f,new ot)),o&&(u.normal=Bn.getInterpolatedAttribute(o,a,c,l,f,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new P,materialIndex:0};Bn.getNormal(Go,Vo,Wo,h.normal),u.face=h,u.barycoord=f}return u}const vr=new de,Jf=new de,Qf=new de,rM=new de,jf=new Ot,Ko=new P,il=new Vn,td=new Ot,sl=new uc;class f0 extends Xt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Cf,this.bindMatrix=new Ot,this.bindMatrixInverse=new Ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ci),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Ko),this.boundingBox.expandByPoint(Ko)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Ko),this.boundingSphere.expandByPoint(Ko)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),il.copy(this.boundingSphere),il.applyMatrix4(s),t.ray.intersectsSphere(il)!==!1&&(td.copy(s).invert(),sl.copy(t.ray).applyMatrix4(td),!(this.boundingBox!==null&&sl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,sl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new de,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Cf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===i_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Dt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;Jf.fromBufferAttribute(s.attributes.skinIndex,t),Qf.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(vr.copy(e),e.set(0,0,0,0)):(vr.set(...e,1),e.set(0,0,0)),vr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=Qf.getComponent(r);if(o!==0){const a=Jf.getComponent(r);jf.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(rM.copy(vr).applyMatrix4(jf),o)}}return e.isVector4&&(e.w=vr.w),e.applyMatrix4(this.bindMatrixInverse)}}class d0 extends Pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Rh extends Xe{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Ve,u=Ve,f,h){super(null,o,a,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ed=new Ot,oM=new Ot;class Ch{constructor(t=[],e=[]){this.uuid=Rn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Dt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ot)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const i=new Ot;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:oM;ed.multiplyMatrices(a,e[r]),ed.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ch(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new Rh(e,t,t,An,En);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const r=t.bones[i];let o=e[r];o===void 0&&(Dt("Skeleton: No bone found with UUID:",r),o=new d0),this.bones.push(o),this.boneInverses.push(new Ot().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=i[s];t.boneInverses.push(a.toArray())}return t}}class Za extends wt{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ps=new Ot,nd=new Ot,Yo=[],id=new Ci,aM=new Ot,xr=new Xt,_r=new Vn;class Be extends Xt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Za(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,aM)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ps),id.copy(t.boundingBox).applyMatrix4(Ps),this.boundingBox.union(id)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ps),_r.copy(t.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(_r)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_r.copy(this.boundingSphere),_r.applyMatrix4(i),t.ray.intersectsSphere(_r)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),nd.multiplyMatrices(i,Ps),xr.matrixWorld=nd,xr.raycast(t,Yo);for(let o=0,a=Yo.length;o<a;o++){const c=Yo[o];c.instanceId=r,c.object=this,e.push(c)}Yo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Za(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Rh(new Float32Array(s*this.count),s,this.count,xh,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const es=new Vn,cM=new ot(.5,.5),Zo=new P;class hc{constructor(t=new Wi,e=new Wi,i=new Wi,s=new Wi,r=new Wi,o=new Wi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ei,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],p=r[8],x=r[9],g=r[10],m=r[11],M=r[12],S=r[13],v=r[14],_=r[15];if(s[0].setComponents(l-o,d-u,m-p,_-M).normalize(),s[1].setComponents(l+o,d+u,m+p,_+M).normalize(),s[2].setComponents(l+a,d+f,m+x,_+S).normalize(),s[3].setComponents(l-a,d-f,m-x,_-S).normalize(),i)s[4].setComponents(c,h,g,v).normalize(),s[5].setComponents(l-c,d-h,m-g,_-v).normalize();else if(s[4].setComponents(l-c,d-h,m-g,_-v).normalize(),e===ei)s[5].setComponents(l+c,d+h,m+g,_+v).normalize();else if(e===ro)s[5].setComponents(c,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){es.center.set(0,0,0);const e=cM.distanceTo(t.center);return es.radius=.7071067811865476+e,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Zo.x=s.normal.x>0?t.max.x:t.min.x,Zo.y=s.normal.y>0?t.max.y:t.min.y,Zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ph extends Hn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ja=new P,Qa=new P,sd=new Ot,Mr=new uc,Jo=new Vn,rl=new P,rd=new P;class Lh extends Pe{constructor(t=new Kt,e=new Ph){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ja.fromBufferAttribute(e,s-1),Qa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ja.distanceTo(Qa);t.setAttribute("lineDistance",new Zt(i,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=r,t.ray.intersectsSphere(Jo)===!1)return;sd.copy(s).invert(),Mr.copy(t.ray).applyMatrix4(sd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let x=d,g=p-1;x<g;x+=l){const m=u.getX(x),M=u.getX(x+1),S=Qo(this,t,Mr,c,m,M,x);S&&e.push(S)}if(this.isLineLoop){const x=u.getX(p-1),g=u.getX(d),m=Qo(this,t,Mr,c,x,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let x=d,g=p-1;x<g;x+=l){const m=Qo(this,t,Mr,c,x,x+1,x);m&&e.push(m)}if(this.isLineLoop){const x=Qo(this,t,Mr,c,p-1,d,p-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Qo(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Ja.fromBufferAttribute(a,s),Qa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ja,Qa,rl,rd)>i)return;rl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(rl);if(!(l<t.near||l>t.far))return{distance:l,point:rd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const od=new P,ad=new P;class p0 extends Lh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)od.fromBufferAttribute(e,s),ad.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+od.distanceTo(ad);t.setAttribute("lineDistance",new Zt(i,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lM extends Lh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class m0 extends Hn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const cd=new Ot,ku=new uc,jo=new Vn,ta=new P;class ja extends Pe{constructor(t=new Kt,e=new m0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),jo.copy(i.boundingSphere),jo.applyMatrix4(s),jo.radius+=r,t.ray.intersectsSphere(jo)===!1)return;cd.copy(s).invert(),ku.copy(t.ray).applyMatrix4(cd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=h,x=d;p<x;p++){const g=l.getX(p);ta.fromBufferAttribute(f,g),ld(ta,g,c,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let p=h,x=d;p<x;p++)ta.fromBufferAttribute(f,p),ld(ta,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ld(n,t,e,i,s,r,o){const a=ku.distanceSqToPoint(n);if(a<e){const c=new P;ku.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class g0 extends Xe{constructor(t=[],e=ds,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nh extends Xe{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ao extends Xe{constructor(t,e,i=oi,s,r,o,a=Ve,c=Ve,l,u=Ri,f=1){if(u!==Ri&&u!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Th(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class uM extends ao{constructor(t,e=oi,i=ds,s,r,o=Ve,a=Ve,c,l=Ri){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class v0 extends Xe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ht extends Kt{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function p(x,g,m,M,S,v,_,y,w,b,T){const A=v/w,C=_/b,L=v/2,D=_/2,N=y/2,B=w+1,H=b+1;let W=0,j=0;const O=new P;for(let $=0;$<H;$++){const Q=$*C-D;for(let _t=0;_t<B;_t++){const ft=_t*A-L;O[x]=ft*M,O[g]=Q*S,O[m]=N,l.push(O.x,O.y,O.z),O[x]=0,O[g]=0,O[m]=y>0?1:-1,u.push(O.x,O.y,O.z),f.push(_t/w),f.push(1-$/b),W+=1}}for(let $=0;$<b;$++)for(let Q=0;Q<w;Q++){const _t=h+Q+B*$,ft=h+Q+B*($+1),St=h+(Q+1)+B*($+1),Nt=h+(Q+1)+B*$;c.push(_t,ft,Nt),c.push(ft,St,Nt),j+=6}a.addGroup(d,j,T),d+=j,h+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ht(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Ih extends Kt{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=e/2,f=Math.PI/2*t,h=e,d=2*f+h,p=i*2+r,x=s+1,g=new P,m=new P;for(let M=0;M<=p;M++){let S=0,v=0,_=0,y=0;if(M<=i){const T=M/i,A=T*Math.PI/2;v=-u-t*Math.cos(A),_=t*Math.sin(A),y=-t*Math.cos(A),S=T*f}else if(M<=i+r){const T=(M-i)/r;v=-u+T*e,_=t,y=0,S=f+T*h}else{const T=(M-i-r)/i,A=T*Math.PI/2;v=u+t*Math.sin(A),_=t*Math.cos(A),y=t*Math.sin(A),S=f+h+T*f}const w=Math.max(0,Math.min(1,S/d));let b=0;M===0?b=.5/s:M===p&&(b=-.5/s);for(let T=0;T<=s;T++){const A=T/s,C=A*Math.PI*2,L=Math.sin(C),D=Math.cos(C);m.x=-_*D,m.y=v,m.z=_*L,a.push(m.x,m.y,m.z),g.set(-_*D,y,_*L),g.normalize(),c.push(g.x,g.y,g.z),l.push(A+b,w)}if(M>0){const T=(M-1)*x;for(let A=0;A<s;A++){const C=T+A,L=T+A+1,D=M*x+A,N=M*x+A+1;o.push(C,L,D),o.push(L,N,D)}}}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ih(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Je extends Kt{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let p=0;const x=[],g=i/2;let m=0;M(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function M(){const v=new P,_=new P;let y=0;const w=(e-t)/i;for(let b=0;b<=r;b++){const T=[],A=b/r,C=A*(e-t)+t;for(let L=0;L<=s;L++){const D=L/s,N=D*c+a,B=Math.sin(N),H=Math.cos(N);_.x=C*B,_.y=-A*i+g,_.z=C*H,f.push(_.x,_.y,_.z),v.set(B,w,H).normalize(),h.push(v.x,v.y,v.z),d.push(D,1-A),T.push(p++)}x.push(T)}for(let b=0;b<s;b++)for(let T=0;T<r;T++){const A=x[T][b],C=x[T+1][b],L=x[T+1][b+1],D=x[T][b+1];(t>0||T!==0)&&(u.push(A,C,D),y+=3),(e>0||T!==r-1)&&(u.push(C,L,D),y+=3)}l.addGroup(m,y,0),m+=y}function S(v){const _=p,y=new ot,w=new P;let b=0;const T=v===!0?t:e,A=v===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,g*A,0),h.push(0,A,0),d.push(.5,.5),p++;const C=p;for(let L=0;L<=s;L++){const N=L/s*c+a,B=Math.cos(N),H=Math.sin(N);w.x=T*H,w.y=g*A,w.z=T*B,f.push(w.x,w.y,w.z),h.push(0,A,0),y.x=B*.5+.5,y.y=H*.5*A+.5,d.push(y.x,y.y),p++}for(let L=0;L<s;L++){const D=_+L,N=C+L;v===!0?u.push(N,N+1,D):u.push(N+1,N,D),b+=3}l.addGroup(m,b,v===!0?1:2),m+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bo extends Je{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new bo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dh extends Kt{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const S=new P,v=new P,_=new P;for(let y=0;y<e.length;y+=3)d(e[y+0],S),d(e[y+1],v),d(e[y+2],_),c(S,v,_,M)}function c(M,S,v,_){const y=_+1,w=[];for(let b=0;b<=y;b++){w[b]=[];const T=M.clone().lerp(v,b/y),A=S.clone().lerp(v,b/y),C=y-b;for(let L=0;L<=C;L++)L===0&&b===y?w[b][L]=T:w[b][L]=T.clone().lerp(A,L/C)}for(let b=0;b<y;b++)for(let T=0;T<2*(y-b)-1;T++){const A=Math.floor(T/2);T%2===0?(h(w[b][A+1]),h(w[b+1][A]),h(w[b][A])):(h(w[b][A+1]),h(w[b+1][A+1]),h(w[b+1][A]))}}function l(M){const S=new P;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(M),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const M=new P;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];const v=g(M)/2/Math.PI+.5,_=m(M)/Math.PI+.5;o.push(v,1-_)}p(),f()}function f(){for(let M=0;M<o.length;M+=6){const S=o[M+0],v=o[M+2],_=o[M+4],y=Math.max(S,v,_),w=Math.min(S,v,_);y>.9&&w<.1&&(S<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),_<.2&&(o[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,S){const v=M*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function p(){const M=new P,S=new P,v=new P,_=new P,y=new ot,w=new ot,b=new ot;for(let T=0,A=0;T<r.length;T+=9,A+=6){M.set(r[T+0],r[T+1],r[T+2]),S.set(r[T+3],r[T+4],r[T+5]),v.set(r[T+6],r[T+7],r[T+8]),y.set(o[A+0],o[A+1]),w.set(o[A+2],o[A+3]),b.set(o[A+4],o[A+5]),_.copy(M).add(S).add(v).divideScalar(3);const C=g(_);x(y,A+0,M,C),x(w,A+2,S,C),x(b,A+4,v,C)}}function x(M,S,v,_){_<0&&M.x===1&&(o[S]=M.x-1),v.x===0&&v.z===0&&(o[S]=_/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dh(t.vertices,t.indices,t.radius,t.detail)}}class ci{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Dt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const u=i[s],h=i[s+1]-u,d=(o-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new P,s=[],r=[],o=[],a=new P,c=new Ot;for(let d=0;d<=t;d++){const p=d/t;s[d]=this.getTangentAt(p,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(te(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(te(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Uh extends ci{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class hM extends Uh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,f){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,s(o,a,h,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const ud=new P,hd=new P,ol=new Fh,al=new Fh,cl=new Fh;class kh extends ci{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(hd.subVectors(s[0],s[1]).add(s[0]),l=hd);const f=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(ud.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=ud),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),ol.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,p,x,g),al.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,p,x,g),cl.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,p,x,g)}else this.curveType==="catmullrom"&&(ol.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),al.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),cl.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return i.set(ol.calc(c),al.calc(c),cl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function fd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function fM(n,t){const e=1-n;return e*e*t}function dM(n,t){return 2*(1-n)*n*t}function pM(n,t){return n*n*t}function qr(n,t,e,i){return fM(n,t)+dM(n,e)+pM(n,i)}function mM(n,t){const e=1-n;return e*e*e*t}function gM(n,t){const e=1-n;return 3*e*e*n*t}function vM(n,t){return 3*(1-n)*n*n*t}function xM(n,t){return n*n*n*t}function $r(n,t,e,i,s){return mM(n,t)+gM(n,e)+vM(n,i)+xM(n,s)}class x0 extends ci{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set($r(t,s.x,r.x,o.x,a.x),$r(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class _M extends ci{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set($r(t,s.x,r.x,o.x,a.x),$r(t,s.y,r.y,o.y,a.y),$r(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class _0 extends ci{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class MM extends ci{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class M0 extends ci{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(qr(t,s.x,r.x,o.x),qr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y0 extends ci{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(qr(t,s.x,r.x,o.x),qr(t,s.y,r.y,o.y),qr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class b0 extends ci{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return i.set(fd(a,c.x,l.x,u.x,f.x),fd(a,c.y,l.y,u.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var Ou=Object.freeze({__proto__:null,ArcCurve:hM,CatmullRomCurve3:kh,CubicBezierCurve:x0,CubicBezierCurve3:_M,EllipseCurve:Uh,LineCurve:_0,LineCurve3:MM,QuadraticBezierCurve:M0,QuadraticBezierCurve3:y0,SplineCurve:b0});class yM extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ou[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Ou[s.type]().fromJSON(s))}return this}}class dd extends yM{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new _0(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new M0(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new x0(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new b0(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new Uh(t,e,i,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class S0 extends dd{constructor(t){super(t),this.uuid=Rn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new dd().fromJSON(s))}return this}}function bM(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=w0(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=AM(n,t,r,e)),n.length>80*e){a=n[0],c=n[1];let u=a,f=c;for(let h=e;h<s;h+=e){const d=n[h],p=n[h+1];d<a&&(a=d),p<c&&(c=p),d>u&&(u=d),p>f&&(f=p)}l=Math.max(u-a,f-c),l=l!==0?32767/l:0}return co(r,o,e,a,c,l,0),o}function w0(n,t,e,i,s){let r;if(s===OM(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=pd(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=pd(o/i|0,n[o],n[o+1],r);return r&&js(r,r.next)&&(uo(r),r=r.next),r}function ms(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(js(e,e.next)||Le(e.prev,e,e.next)===0)){if(uo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function co(n,t,e,i,s,r,o){if(!n)return;!o&&r&&NM(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?wM(n,i,s,r):SM(n)){t.push(c.i,n.i,l.i),uo(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=TM(ms(n),t),co(n,t,e,i,s,r,2)):o===2&&EM(n,t,e,i,s,r):co(ms(n),t,e,i,s,r,1);break}}}function SM(n){const t=n.prev,e=n,i=n.next;if(Le(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(s,r,o),f=Math.min(a,c,l),h=Math.max(s,r,o),d=Math.max(a,c,l);let p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&Ur(s,a,r,c,o,l,p.x,p.y)&&Le(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function wM(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Le(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,h=o.y,d=Math.min(a,c,l),p=Math.min(u,f,h),x=Math.max(a,c,l),g=Math.max(u,f,h),m=Bu(d,p,t,e,i),M=Bu(x,g,t,e,i);let S=n.prevZ,v=n.nextZ;for(;S&&S.z>=m&&v&&v.z<=M;){if(S.x>=d&&S.x<=x&&S.y>=p&&S.y<=g&&S!==s&&S!==o&&Ur(a,u,c,f,l,h,S.x,S.y)&&Le(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=x&&v.y>=p&&v.y<=g&&v!==s&&v!==o&&Ur(a,u,c,f,l,h,v.x,v.y)&&Le(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=m;){if(S.x>=d&&S.x<=x&&S.y>=p&&S.y<=g&&S!==s&&S!==o&&Ur(a,u,c,f,l,h,S.x,S.y)&&Le(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=x&&v.y>=p&&v.y<=g&&v!==s&&v!==o&&Ur(a,u,c,f,l,h,v.x,v.y)&&Le(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function TM(n,t){let e=n;do{const i=e.prev,s=e.next.next;!js(i,s)&&E0(i,e,e.next,s)&&lo(i,s)&&lo(s,i)&&(t.push(i.i,e.i,s.i),uo(e),uo(e.next),e=n=s),e=e.next}while(e!==n);return ms(e)}function EM(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&UM(o,a)){let c=A0(o,a);o=ms(o,o.next),c=ms(c,c.next),co(o,t,e,i,s,r,0),co(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function AM(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=w0(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(DM(l))}s.sort(RM);for(let r=0;r<s.length;r++)e=CM(s[r],e);return e}function RM(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function CM(n,t){const e=PM(n,t);if(!e)return t;const i=A0(e,n);return ms(i,i.next),ms(e,e.next)}function PM(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(js(n,e))return e;do{if(js(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&T0(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const f=Math.abs(s-e.y)/(i-e.x);lo(e,n)&&(f<u||f===u&&(e.x>o.x||e.x===o.x&&LM(o,e)))&&(o=e,u=f)}e=e.next}while(e!==a);return o}function LM(n,t){return Le(n.prev,n,t.prev)<0&&Le(t.next,n,n.next)<0}function NM(n,t,e,i){let s=n;do s.z===0&&(s.z=Bu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,IM(s)}function IM(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Bu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function DM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function T0(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function Ur(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&T0(n,t,e,i,s,r,o,a)}function UM(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!FM(n,t)&&(lo(n,t)&&lo(t,n)&&kM(n,t)&&(Le(n.prev,n,t.prev)||Le(n,t.prev,t))||js(n,t)&&Le(n.prev,n,n.next)>0&&Le(t.prev,t,t.next)>0)}function Le(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function js(n,t){return n.x===t.x&&n.y===t.y}function E0(n,t,e,i){const s=na(Le(n,t,e)),r=na(Le(n,t,i)),o=na(Le(e,i,n)),a=na(Le(e,i,t));return!!(s!==r&&o!==a||s===0&&ea(n,e,t)||r===0&&ea(n,i,t)||o===0&&ea(e,n,i)||a===0&&ea(e,t,i))}function ea(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function na(n){return n>0?1:n<0?-1:0}function FM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&E0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function lo(n,t){return Le(n.prev,n,n.next)<0?Le(n,t,n.next)>=0&&Le(n,n.prev,t)>=0:Le(n,t,n.prev)<0||Le(n,n.next,t)<0}function kM(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function A0(n,t){const e=zu(n.i,n.x,n.y),i=zu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function pd(n,t,e,i){const s=zu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function uo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function zu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function OM(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class BM{static triangulate(t,e,i=2){return bM(t,e,i)}}class Kr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return Kr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];md(t),gd(i,t);let o=t.length;e.forEach(md);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,gd(i,e[c]);const a=BM.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function md(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function gd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class vs extends Dh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vs(t.radius,t.detail)}}class So extends Kt{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=te(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,f=new P,h=new ot,d=new P,p=new P,x=new P;let g=0,m=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(p)}for(let M=0;M<=e;M++){const S=i+M*u*s,v=Math.sin(S),_=Math.cos(S);for(let y=0;y<=t.length-1;y++){f.x=t[y].x*v,f.y=t[y].y,f.z=t[y].x*_,o.push(f.x,f.y,f.z),h.x=M/e,h.y=y/(t.length-1),a.push(h.x,h.y);const w=c[3*y+0]*v,b=c[3*y+1],T=c[3*y+0]*_;l.push(w,b,T)}}for(let M=0;M<e;M++)for(let S=0;S<t.length-1;S++){const v=S+M*t.length,_=v,y=v+t.length,w=v+t.length+1,b=v+1;r.push(_,y,b),r.push(w,b,y)}this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("uv",new Zt(a,2)),this.setAttribute("normal",new Zt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new So(t.points,t.segments,t.phiStart,t.phiLength)}}class Wn extends Kt{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,h=e/c,d=[],p=[],x=[],g=[];for(let m=0;m<u;m++){const M=m*h-o;for(let S=0;S<l;S++){const v=S*f-r;p.push(v,-M,0),x.push(0,0,1),g.push(S/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){const S=M+l*m,v=M+l*(m+1),_=M+1+l*(m+1),y=M+1+l*m;d.push(S,v,y),d.push(v,_,y)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Oh extends Kt{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let f=t;const h=(e-t)/s,d=new P,p=new ot;for(let x=0;x<=s;x++){for(let g=0;g<=i;g++){const m=r+g/i*o;d.x=f*Math.cos(m),d.y=f*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,u.push(p.x,p.y)}f+=h}for(let x=0;x<s;x++){const g=x*(i+1);for(let m=0;m<i;m++){const M=m+g,S=M,v=M+i+1,_=M+i+2,y=M+1;a.push(S,v,y),a.push(v,_,y)}}this.setIndex(a),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oh(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Bh extends Kt{constructor(t=new S0([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Zt(s,3)),this.setAttribute("normal",new Zt(r,3)),this.setAttribute("uv",new Zt(o,2));function l(u){const f=s.length/3,h=u.extractPoints(e);let d=h.shape;const p=h.holes;Kr.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const M=p[g];Kr.isClockWise(M)===!0&&(p[g]=M.reverse())}const x=Kr.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const M=p[g];d=d.concat(M)}for(let g=0,m=d.length;g<m;g++){const M=d[g];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let g=0,m=x.length;g<m;g++){const M=x[g],S=M[0]+f,v=M[1]+f,_=M[2]+f;i.push(S,v,_),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return zM(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new Bh(i,t.curveSegments)}}function zM(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class ls extends Kt{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new P,h=new P,d=[],p=[],x=[],g=[];for(let m=0;m<=i;m++){const M=[],S=m/i,v=o+S*a,_=t*Math.cos(v),y=Math.sqrt(t*t-_*_);let w=0;m===0&&o===0?w=.5/e:m===i&&c===Math.PI&&(w=-.5/e);for(let b=0;b<=e;b++){const T=b/e,A=s+T*r;f.x=-y*Math.cos(A),f.y=_,f.z=y*Math.sin(A),p.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),g.push(T+w,1-S),M.push(l++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<e;M++){const S=u[m][M+1],v=u[m][M],_=u[m+1][M],y=u[m+1][M+1];(m!==0||o>0)&&d.push(S,v,y),(m!==i-1||c<Math.PI)&&d.push(v,_,y)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class zh extends Kt{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],f=[],h=new P,d=new P,p=new P;for(let x=0;x<=i;x++){const g=o+x/i*a;for(let m=0;m<=s;m++){const M=m/s*r;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),l.push(d.x,d.y,d.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),p.subVectors(d,h).normalize(),u.push(p.x,p.y,p.z),f.push(m/s),f.push(x/i)}}for(let x=1;x<=i;x++)for(let g=1;g<=s;g++){const m=(s+1)*x+g-1,M=(s+1)*(x-1)+g-1,S=(s+1)*(x-1)+g,v=(s+1)*x+g;c.push(m,M,v),c.push(M,S,v)}this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class fc extends Kt{constructor(t=new y0(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new ot;let u=new P;const f=[],h=[],d=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function x(){for(let S=0;S<e;S++)g(S);g(r===!1?e:0),M(),m()}function g(S){u=t.getPointAt(S/e,u);const v=o.normals[S],_=o.binormals[S];for(let y=0;y<=s;y++){const w=y/s*Math.PI*2,b=Math.sin(w),T=-Math.cos(w);c.x=T*v.x+b*_.x,c.y=T*v.y+b*_.y,c.z=T*v.z+b*_.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,f.push(a.x,a.y,a.z)}}function m(){for(let S=1;S<=e;S++)for(let v=1;v<=s;v++){const _=(s+1)*(S-1)+(v-1),y=(s+1)*S+(v-1),w=(s+1)*S+v,b=(s+1)*(S-1)+v;p.push(_,y,b),p.push(y,w,b)}}function M(){for(let S=0;S<=e;S++)for(let v=0;v<=s;v++)l.x=S/e,l.y=v/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new fc(new Ou[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function tr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(vd(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(vd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function cn(n){const t={};for(let e=0;e<n.length;e++){const i=tr(n[e]);for(const s in i)t[s]=i[s]}return t}function vd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function HM(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function R0(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const gn={clone:tr,merge:cn};var GM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class re extends Hn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=GM,this.fragmentShader=VM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=tr(t.uniforms),this.uniformsGroups=HM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(s.value);break;case"v2":this.uniforms[i].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new de().fromArray(s.value);break;case"m3":this.uniforms[i].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class C0 extends re{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pi extends Hn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$a,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class li extends Pi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class ir extends Hn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$a,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=ch,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class WM extends Hn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=o_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class XM extends Hn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Xi(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Pa(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function qM(n){function t(s,r){return n[s]-n[r]}const e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function xd(n,t,e){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=n[a+c]}return s}function $M(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}class sr{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){const a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class KM extends sr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lf,endingEnd:Lf}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Nf:r=t,a=2*e-i;break;case If:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Nf:o=t,c=2*i-e;break;case If:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}const l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),x=p*p,g=x*p,m=-h*g+2*h*x-h*p,M=(1+h)*g+(-1.5-2*h)*x+(-.5+h)*p+1,S=(-1-d)*g+(1.5+d)*x+.5*p,v=d*g-d*x;for(let _=0;_!==a;++_)r[_]=m*o[u+_]+M*o[l+_]+S*o[c+_]+v*o[f+_];return r}}class YM extends sr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*f+o[c+h]*u;return r}}class ZM extends sr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class JM extends sr{interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){const p=(i-e)/(s-e),x=1-p;for(let g=0;g!==a;++g)r[g]=o[l+g]*x+o[c+g]*p;return r}const h=a*2,d=t-1;for(let p=0;p!==a;++p){const x=o[l+p],g=o[c+p],m=d*h+p*2,M=f[m],S=f[m+1],v=t*h+p*2,_=u[v],y=u[v+1],w=jM(i,e,M,_,s);r[p]=P0(w,x,S,y,g)}return r}}function P0(n,t,e,i,s){const r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function QM(n,t,e,i,s){const r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function jM(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){const a=P0(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;const c=QM(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Xn{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Xi(e,this.TimeBufferType),this.values=Xi(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Xi(t.times,Array),values:Xi(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Pa(t.settings)&&(i.settings={inTangents:Xi(t.settings.inTangents,Array),outTangents:Xi(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ZM(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new YM(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new KM(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new JM(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case io:e=this.InterpolantFactoryMethodDiscrete;break;case so:e=this.InterpolantFactoryMethodLinear;break;case Uc:e=this.InterpolantFactoryMethodSmooth;break;case Pf:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Dt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return io;case this.InterpolantFactoryMethodLinear:return so;case this.InterpolantFactoryMethodSmooth:return Uc;case this.InterpolantFactoryMethodBezier:return Pf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Pa(this.settings)&&(_d(this.settings.inTangents,t),_d(this.settings.outTangents,t))}return this}trim(t,e){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=i[a];if(typeof c=="number"&&isNaN(c)){Vt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Vt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&g_(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){Vt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Uc,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{const f=a*i,h=f-i,d=f+i;for(let p=0;p!==i;++p){const x=e[f+p];if(x!==e[h+p]||x!==e[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const f=a*i,h=o*i;for(let d=0;d!==i;++d)e[h+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Pa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function _d(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=so;class rr extends Xn{constructor(t,e,i){super(t,e,i)}}rr.prototype.ValueTypeName="bool";rr.prototype.ValueBufferType=Array;rr.prototype.DefaultInterpolation=io;rr.prototype.InterpolantFactoryMethodLinear=void 0;rr.prototype.InterpolantFactoryMethodSmooth=void 0;class L0 extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}L0.prototype.ValueTypeName="color";class ho extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}ho.prototype.ValueTypeName="number";class ty extends sr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Ne.slerpFlat(r,0,o,l-a,o,l,c);return r}}class fo extends Xn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new ty(this.times,this.values,this.getValueSize(),t)}}fo.prototype.ValueTypeName="quaternion";fo.prototype.InterpolantFactoryMethodSmooth=void 0;class or extends Xn{constructor(t,e,i){super(t,e,i)}}or.prototype.ValueTypeName="string";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=io;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;class tc extends Xn{constructor(t,e,i,s){super(t,e,i,s)}}tc.prototype.ValueTypeName="vector";class ey{constructor(t="",e=-1,i=[],s=s_){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=Rn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(iy(i[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=i.length;r!==o;++r)e.push(Xn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=qM(c);c=xd(c,1,u),l=xd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ho(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const f=u[1];let h=s[f];h||(s[f]=h=[]),h.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}resetDuration(){const t=this.tracks;let e=0;for(let i=0,s=t.length;i!==s;++i){const r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function ny(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ho;case"vector":case"vector2":case"vector3":case"vector4":return tc;case"color":return L0;case"quaternion":return fo;case"bool":case"boolean":return rr;case"string":return or}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function iy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=ny(n.type);if(n.times===void 0){const i=[],s=[];$M(n.keys,i,s,"value"),n.times=i,n.values=s}let e;return t.parse!==void 0?e=t.parse(n):e=new t(n.name,n.times,n.values,n.interpolation),Pa(n.settings)&&(e.settings={inTangents:Xi(n.settings.inTangents,Float32Array),outTangents:Xi(n.settings.outTangents,Float32Array)}),e}const bi={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Md(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Md(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Md(n){try{const t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class sy{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ry=new sy;class ar{constructor(t){this.manager=t!==void 0?t:ry,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}ar.DEFAULT_MATERIAL_NAME="__DEFAULT";const gi={};class oy extends Error{constructor(t,e){super(t),this.response=e}}class N0 extends ar{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=bi.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(gi[t]!==void 0){gi[t].push({onLoad:e,onProgress:i,onError:s});return}gi[t]=[],gi[t].push({onLoad:e,onProgress:i,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Dt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=gi[t],f=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=h?parseInt(h):0,p=d!==0;let x=0;const g=new ReadableStream({start(m){M();function M(){f.read().then(({done:S,value:v})=>{if(S)m.close();else{x+=v.byteLength;const _=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let y=0,w=u.length;y<w;y++){const b=u[y];b.onProgress&&b.onProgress(_)}m.enqueue(v),M()}},S=>{m.error(S)})}}});return new Response(g)}else throw new oy(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{bi.add(`file:${t}`,l);const u=gi[t];delete gi[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=gi[t];if(u===void 0)throw this.manager.itemError(t),l;delete gi[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ls=new WeakMap;class ay extends ar{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=bi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let f=Ls.get(o);f===void 0&&(f=[],Ls.set(o,f)),f.push({onLoad:e,onError:s})}return o}const a=oo("img");function c(){u(),e&&e(this);const f=Ls.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Ls.delete(this),r.manager.itemEnd(t)}function l(f){u(),s&&s(f),bi.remove(`image:${t}`);const h=Ls.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onError&&p.onError(f)}Ls.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),bi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class cy extends ar{constructor(t){super(t)}load(t,e,i,s){const r=new Xe,o=new ay(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class dc extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class ly extends dc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ll=new Ot,yd=new P,bd=new P;class Hh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hc,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;yd.setFromMatrixPosition(t.matrixWorld),e.position.copy(yd),bd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){ll.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(ll,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===ro||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(ll)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ia=new P,sa=new Ne,Yn=new P;class I0 extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ia,sa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ia,sa,Yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ia,sa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ia,sa,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new P,Sd=new ot,wd=new ot;class ln extends I0{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Qs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qs*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z)}getViewSize(t,e){return this.getViewBounds(t,Sd,wd),e.subVectors(wd,Sd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class uy extends Hh{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=Qs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class hy extends dc{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new uy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class fy extends Hh{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}}class dy extends dc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new fy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class wo extends I0{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class py extends Hh{constructor(){super(new wo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class D0 extends dc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new py}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Yr{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const ul=new WeakMap;class my extends ar{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Dt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Dt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=bi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{ul.has(o)===!0?(s&&s(ul.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(l),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return bi.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),ul.set(c,l),bi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});bi.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ns=-90,Is=1;class gy extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ln(Ns,Is,t,e);s.layers=this.layers,this.add(s);const r=new ln(Ns,Is,t,e);r.layers=this.layers,this.add(r);const o=new ln(Ns,Is,t,e);o.layers=this.layers,this.add(o);const a=new ln(Ns,Is,t,e);a.layers=this.layers,this.add(a);const c=new ln(Ns,Is,t,e);c.layers=this.layers,this.add(c);const l=new ln(Ns,Is,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class vy extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class xy{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=_y.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function _y(){this._document.hidden===!1&&this.reset()}const Gh="\\[\\]\\.:\\/",My=new RegExp("["+Gh+"]","g"),Vh="[^"+Gh+"]",yy="[^"+Gh.replace("\\.","")+"]",by=/((?:WC+[\/:])*)/.source.replace("WC",Vh),Sy=/(WCOD+)?/.source.replace("WCOD",yy),wy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vh),Ty=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vh),Ey=new RegExp("^"+by+Sy+wy+Ty+"$"),Ay=["material","materials","bones","map"];class Ry{constructor(t,e,i){const s=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}}class ve{constructor(t,e,i){this.path=e,this.parsedPath=i||ve.parseTrackName(e),this.node=ve.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new ve.Composite(t,e,i):new ve(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(My,"")}static parseTrackName(t){const e=Ey.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);Ay.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=ve.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ve.Composite=Ry;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class U0{static{U0.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}function Td(n,t,e,i){const s=Cy(i);switch(e){case n0:return n*t;case xh:return n*t/s.components*s.byteLength;case _h:return n*t/s.components*s.byteLength;case ps:return n*t*2/s.components*s.byteLength;case Mh:return n*t*2/s.components*s.byteLength;case i0:return n*t*3/s.components*s.byteLength;case An:return n*t*4/s.components*s.byteLength;case yh:return n*t*4/s.components*s.byteLength;case Ea:case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case au:case lu:return Math.max(n,16)*Math.max(t,8)/4;case ou:case cu:return Math.max(n,8)*Math.max(t,8)/2;case uu:case hu:case du:case pu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fu:case Xa:case mu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _u:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case yu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case bu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Su:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case wu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Eu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Au:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ru:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Cu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pu:case Lu:case Nu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Iu:case Du:return Math.ceil(n/4)*Math.ceil(t/4)*8;case qa:case Uu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cy(n){switch(n){case Mn:case Qm:return{byteLength:1,components:1};case eo:case jm:case dn:return{byteLength:2,components:1};case gh:case vh:return{byteLength:2,components:4};case oi:case mh:case En:return{byteLength:4,components:1};case t0:case e0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ah}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ah);function F0(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Py(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],x=f[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++h,f[h]=x)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const x=f[d];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ly=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ny=`#ifdef USE_ALPHAHASH
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
#endif`,Iy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ky=`#ifdef USE_AOMAP
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
#endif`,Oy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,By=`#ifdef USE_BATCHING
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
#endif`,zy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wy=`#ifdef USE_IRIDESCENCE
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
#endif`,Xy=`#ifdef USE_BUMPMAP
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
#endif`,qy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$y=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ky=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,t1=`#define PI 3.141592653589793
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
} // validated`,e1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,n1=`vec3 transformedNormal = objectNormal;
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
#endif`,i1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,s1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,r1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a1="gl_FragColor = linearToOutputTexel( gl_FragColor );",c1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,l1=`#ifdef USE_ENVMAP
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
#endif`,u1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,h1=`#ifdef USE_ENVMAP
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
#endif`,f1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d1=`#ifdef USE_ENVMAP
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
#endif`,p1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,m1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,g1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,v1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,x1=`#ifdef USE_GRADIENTMAP
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
}`,_1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,b1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,S1=`#ifdef USE_ENVMAP
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
#endif`,w1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,T1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,A1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,R1=`PhysicalMaterial material;
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
#endif`,C1=`uniform sampler2D dfgLUT;
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
}`,P1=`
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
#endif`,L1=`#if defined( RE_IndirectDiffuse )
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
#endif`,N1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,D1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,U1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,H1=`#if defined( USE_POINTS_UV )
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
#endif`,G1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,V1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$1=`#ifdef USE_MORPHTARGETS
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
#endif`,K1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,J1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,tb=`#ifdef USE_NORMALMAP
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
#endif`,eb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ib=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ob=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ab=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ub=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,db=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gb=`float getShadowMask() {
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
}`,vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xb=`#ifdef USE_SKINNING
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
#endif`,_b=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mb=`#ifdef USE_SKINNING
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
#endif`,yb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tb=`#ifdef USE_TRANSMISSION
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
#endif`,Eb=`#ifdef USE_TRANSMISSION
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
#endif`,Ab=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nb=`uniform sampler2D t2D;
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
}`,Ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Db=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`#include <common>
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
}`,Ob=`#if DEPTH_PACKING == 3200
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
}`,Bb=`#define DISTANCE
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
}`,zb=`#define DISTANCE
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
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vb=`uniform float scale;
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
}`,Wb=`uniform vec3 diffuse;
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
}`,Xb=`#include <common>
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
}`,qb=`uniform vec3 diffuse;
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
}`,$b=`#define LAMBERT
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
}`,Kb=`#define LAMBERT
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
}`,Yb=`#define MATCAP
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
}`,Zb=`#define MATCAP
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
}`,Jb=`#define NORMAL
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
}`,Qb=`#define NORMAL
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
}`,jb=`#define PHONG
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
}`,tS=`#define PHONG
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
}`,eS=`#define STANDARD
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
}`,nS=`#define STANDARD
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
}`,iS=`#define TOON
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
}`,sS=`#define TOON
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
}`,rS=`uniform float size;
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
}`,oS=`uniform vec3 diffuse;
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
}`,aS=`#include <common>
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
}`,cS=`uniform vec3 color;
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
}`,lS=`uniform float rotation;
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
}`,uS=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:Ly,alphahash_pars_fragment:Ny,alphamap_fragment:Iy,alphamap_pars_fragment:Dy,alphatest_fragment:Uy,alphatest_pars_fragment:Fy,aomap_fragment:ky,aomap_pars_fragment:Oy,batching_pars_vertex:By,batching_vertex:zy,begin_vertex:Hy,beginnormal_vertex:Gy,bsdfs:Vy,iridescence_fragment:Wy,bumpmap_pars_fragment:Xy,clipping_planes_fragment:qy,clipping_planes_pars_fragment:$y,clipping_planes_pars_vertex:Ky,clipping_planes_vertex:Yy,color_fragment:Zy,color_pars_fragment:Jy,color_pars_vertex:Qy,color_vertex:jy,common:t1,cube_uv_reflection_fragment:e1,defaultnormal_vertex:n1,displacementmap_pars_vertex:i1,displacementmap_vertex:s1,emissivemap_fragment:r1,emissivemap_pars_fragment:o1,colorspace_fragment:a1,colorspace_pars_fragment:c1,envmap_fragment:l1,envmap_common_pars_fragment:u1,envmap_pars_fragment:h1,envmap_pars_vertex:f1,envmap_physical_pars_fragment:S1,envmap_vertex:d1,fog_vertex:p1,fog_pars_vertex:m1,fog_fragment:g1,fog_pars_fragment:v1,gradientmap_pars_fragment:x1,lightmap_pars_fragment:_1,lights_lambert_fragment:M1,lights_lambert_pars_fragment:y1,lights_pars_begin:b1,lights_toon_fragment:w1,lights_toon_pars_fragment:T1,lights_phong_fragment:E1,lights_phong_pars_fragment:A1,lights_physical_fragment:R1,lights_physical_pars_fragment:C1,lights_fragment_begin:P1,lights_fragment_maps:L1,lights_fragment_end:N1,lightprobes_pars_fragment:I1,logdepthbuf_fragment:D1,logdepthbuf_pars_fragment:U1,logdepthbuf_pars_vertex:F1,logdepthbuf_vertex:k1,map_fragment:O1,map_pars_fragment:B1,map_particle_fragment:z1,map_particle_pars_fragment:H1,metalnessmap_fragment:G1,metalnessmap_pars_fragment:V1,morphinstance_vertex:W1,morphcolor_vertex:X1,morphnormal_vertex:q1,morphtarget_pars_vertex:$1,morphtarget_vertex:K1,normal_fragment_begin:Y1,normal_fragment_maps:Z1,normal_pars_fragment:J1,normal_pars_vertex:Q1,normal_vertex:j1,normalmap_pars_fragment:tb,clearcoat_normal_fragment_begin:eb,clearcoat_normal_fragment_maps:nb,clearcoat_pars_fragment:ib,iridescence_pars_fragment:sb,opaque_fragment:rb,packing:ob,premultiplied_alpha_fragment:ab,project_vertex:cb,dithering_fragment:lb,dithering_pars_fragment:ub,roughnessmap_fragment:hb,roughnessmap_pars_fragment:fb,shadowmap_pars_fragment:db,shadowmap_pars_vertex:pb,shadowmap_vertex:mb,shadowmask_pars_fragment:gb,skinbase_vertex:vb,skinning_pars_vertex:xb,skinning_vertex:_b,skinnormal_vertex:Mb,specularmap_fragment:yb,specularmap_pars_fragment:bb,tonemapping_fragment:Sb,tonemapping_pars_fragment:wb,transmission_fragment:Tb,transmission_pars_fragment:Eb,uv_pars_fragment:Ab,uv_pars_vertex:Rb,uv_vertex:Cb,worldpos_vertex:Pb,background_vert:Lb,background_frag:Nb,backgroundCube_vert:Ib,backgroundCube_frag:Db,cube_vert:Ub,cube_frag:Fb,depth_vert:kb,depth_frag:Ob,distance_vert:Bb,distance_frag:zb,equirect_vert:Hb,equirect_frag:Gb,linedashed_vert:Vb,linedashed_frag:Wb,meshbasic_vert:Xb,meshbasic_frag:qb,meshlambert_vert:$b,meshlambert_frag:Kb,meshmatcap_vert:Yb,meshmatcap_frag:Zb,meshnormal_vert:Jb,meshnormal_frag:Qb,meshphong_vert:jb,meshphong_frag:tS,meshphysical_vert:eS,meshphysical_frag:nS,meshtoon_vert:iS,meshtoon_frag:sS,points_vert:rS,points_frag:oS,shadow_vert:aS,shadow_frag:cS,sprite_vert:lS,sprite_frag:uS},lt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},jn={basic:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:cn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:cn([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:cn([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new ct(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:cn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:cn([lt.points,lt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:cn([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:cn([lt.common,lt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:cn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:cn([lt.sprite,lt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:cn([lt.common,lt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:cn([lt.lights,lt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};jn.physical={uniforms:cn([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const ra={r:0,b:0,g:0},hS=new Ot,k0=new $t;k0.set(-1,0,0,0,1,0,0,0,1);function fS(n,t,e,i,s,r){const o=new ct(0);let a=s===!0?0:1,c,l,u=null,f=0,h=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const v=M.backgroundBlurriness>0;S=t.get(S,v)}return S}function p(M){let S=!1;const v=d(M);v===null?g(o,a):v&&v.isColor&&(g(v,1),S=!0);const _=n.xr.getEnvironmentBlendMode();_==="additive"?e.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,S){const v=d(S);v&&(v.isCubeTexture||v.mapping===lc)?(l===void 0&&(l=new Xt(new Ht(1,1,1),new re({name:"BackgroundCubeMaterial",uniforms:tr(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,y,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hS.makeRotationFromEuler(S.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(k0),l.material.toneMapped=ne.getTransfer(v.colorSpace)!==fe,(u!==v||f!==v.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Xt(new Wn(2,2),new re({name:"BackgroundMaterial",uniforms:tr(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ne.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,S){M.getRGB(ra,R0(n)),e.buffers.color.setClear(ra.r,ra.g,ra.b,S,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),a=S,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:p,addToRenderList:x,dispose:m}}function dS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(C,L,D,N,B){let H=!1;const W=f(C,N,D,L);r!==W&&(r=W,l(r.object)),H=d(C,N,D,B),H&&p(C,N,D,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(C,L,D,N),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,L,D,N){const B=N.wireframe===!0;let H=i[L.id];H===void 0&&(H={},i[L.id]=H);const W=C.isInstancedMesh===!0?C.id:0;let j=H[W];j===void 0&&(j={},H[W]=j);let O=j[D.id];O===void 0&&(O={},j[D.id]=O);let $=O[B];return $===void 0&&($=h(c()),O[B]=$),$}function h(C){const L=[],D=[],N=[];for(let B=0;B<e;B++)L[B]=0,D[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:N,object:C,attributes:{},index:null}}function d(C,L,D,N){const B=r.attributes,H=L.attributes;let W=0;const j=D.getAttributes();for(const O in j)if(j[O].location>=0){const Q=B[O];let _t=H[O];if(_t===void 0&&(O==="instanceMatrix"&&C.instanceMatrix&&(_t=C.instanceMatrix),O==="instanceColor"&&C.instanceColor&&(_t=C.instanceColor)),Q===void 0||Q.attribute!==_t||_t&&Q.data!==_t.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function p(C,L,D,N){const B={},H=L.attributes;let W=0;const j=D.getAttributes();for(const O in j)if(j[O].location>=0){let Q=H[O];Q===void 0&&(O==="instanceMatrix"&&C.instanceMatrix&&(Q=C.instanceMatrix),O==="instanceColor"&&C.instanceColor&&(Q=C.instanceColor));const _t={};_t.attribute=Q,Q&&Q.data&&(_t.data=Q.data),B[O]=_t,W++}r.attributes=B,r.attributesNum=W,r.index=N}function x(){const C=r.newAttributes;for(let L=0,D=C.length;L<D;L++)C[L]=0}function g(C){m(C,0)}function m(C,L){const D=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;D[C]=1,N[C]===0&&(n.enableVertexAttribArray(C),N[C]=1),B[C]!==L&&(n.vertexAttribDivisor(C,L),B[C]=L)}function M(){const C=r.newAttributes,L=r.enabledAttributes;for(let D=0,N=L.length;D<N;D++)L[D]!==C[D]&&(n.disableVertexAttribArray(D),L[D]=0)}function S(C,L,D,N,B,H,W){W===!0?n.vertexAttribIPointer(C,L,D,B,H):n.vertexAttribPointer(C,L,D,N,B,H)}function v(C,L,D,N){x();const B=N.attributes,H=D.getAttributes(),W=L.defaultAttributeValues;for(const j in H){const O=H[j];if(O.location>=0){let $=B[j];if($===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&($=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&($=C.instanceColor)),$!==void 0){const Q=$.normalized,_t=$.itemSize,ft=t.get($);if(ft===void 0)continue;const St=ft.buffer,Nt=ft.type,zt=ft.bytesPerElement,X=Nt===n.INT||Nt===n.UNSIGNED_INT||$.gpuType===mh;if($.isInterleavedBufferAttribute){const Y=$.data,yt=Y.stride,Pt=$.offset;if(Y.isInstancedInterleavedBuffer){for(let it=0;it<O.locationSize;it++)m(O.location+it,Y.meshPerAttribute);C.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let it=0;it<O.locationSize;it++)g(O.location+it);n.bindBuffer(n.ARRAY_BUFFER,St);for(let it=0;it<O.locationSize;it++)S(O.location+it,_t/O.locationSize,Nt,Q,yt*zt,(Pt+_t/O.locationSize*it)*zt,X)}else{if($.isInstancedBufferAttribute){for(let Y=0;Y<O.locationSize;Y++)m(O.location+Y,$.meshPerAttribute);C.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Y=0;Y<O.locationSize;Y++)g(O.location+Y);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Y=0;Y<O.locationSize;Y++)S(O.location+Y,_t/O.locationSize,Nt,Q,_t*zt,_t/O.locationSize*Y*zt,X)}}else if(W!==void 0){const Q=W[j];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(O.location,Q);break;case 3:n.vertexAttrib3fv(O.location,Q);break;case 4:n.vertexAttrib4fv(O.location,Q);break;default:n.vertexAttrib1fv(O.location,Q)}}}}M()}function _(){T();for(const C in i){const L=i[C];for(const D in L){const N=L[D];for(const B in N){const H=N[B];for(const W in H)u(H[W].object),delete H[W];delete N[B]}}delete i[C]}}function y(C){if(i[C.id]===void 0)return;const L=i[C.id];for(const D in L){const N=L[D];for(const B in N){const H=N[B];for(const W in H)u(H[W].object),delete H[W];delete N[B]}}delete i[C.id]}function w(C){for(const L in i){const D=i[L];for(const N in D){const B=D[N];if(B[C.id]===void 0)continue;const H=B[C.id];for(const W in H)u(H[W].object),delete H[W];delete B[C.id]}}}function b(C){for(const L in i){const D=i[L],N=C.isInstancedMesh===!0?C.id:0,B=D[N];if(B!==void 0){for(const H in B){const W=B[H];for(const j in W)u(W[j].object),delete W[j];delete B[H]}delete D[N],Object.keys(D).length===0&&delete i[L]}}}function T(){A(),o=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:A,dispose:_,releaseStatesOfGeometry:y,releaseStatesOfObject:b,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function pS(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function mS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==An&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const b=w===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Mn&&w!==En&&!b&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Dt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=n.getParameter(n.MAX_SAMPLES),y=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:v,maxSamples:_,samples:y}}function gS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Wi,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=n.get(f);if(!s||p===null||p.length===0||r&&!g)r?u(null):l();else{const M=r?0:i,S=M*4;let v=m.clippingState||null;c.value=v,v=u(p,h,S,d);for(let _=0;_!==S;++_)v[_]=e[_];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,p){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=c.value,p!==!0||g===null){const m=d+x*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,v=d;S!==x;++S,v+=4)o.copy(f[S]).applyMatrix4(M,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}const Vs=4,vS=6,xS=20,_S=256,yr=new wo,Ed=new ct;let hl=null,fl=0,dl=0,pl=!1;const MS=new P,ns=new P;class Ad{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=MS}=r;hl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(hl,fl,dl),this._renderer.xr.enabled=pl,t.scissorTest=!1,Ds(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ds||t.mapping===Zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:We,minFilter:We,generateMipmaps:!1,type:dn,format:An,colorSpace:yn,depthBuffer:!1},s=Rd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=yS(r)),this._blurMaterial=SS(r,t,e),this._ggxMaterial=bS(r,t,e)}return s}_compileMaterial(t){const e=new Xt(new Kt,t);this._renderer.compile(e,yr)}_sceneToCubeUV(t,e,i,s,r){const c=new ln(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Ed),f.toneMapping=si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Xt(new Ht,new rn({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,m=!0):(g.color.copy(Ed),m=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const _=this._cubeSize;Ds(s,v*_,S>2?_:0,_,_),f.setRenderTarget(s),m&&f.render(x,c),f.render(t,c)}f.toneMapping=d,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ds||t.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ds(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,yr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:p}=this,x=this._sizeLods[i],g=3*x*(i>p-Vs?i-p+Vs:0),m=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,Ds(r,g,m,3*x,2*x),s.setRenderTarget(r),s.render(a,yr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,Ds(t,g,m,3*x,2*x),s.setRenderTarget(t),s.render(a,yr)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Vs?s-this._lodMax+Vs:0),h=4*(this._cubeSize-u);Ds(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,yr)}}function yS(n){const t=[],e=[];let i=n;const s=n-Vs+1+vS;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);const a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,p=new Float32Array(d*h*f),x=new Float32Array(d*h*f);for(let m=0;m<f;m++){const M=m%3*2/3-1,S=m>2?0:-1,v=[M,S,0,M+2/3,S,0,M+2/3,S+1,0,M,S,0,M+2/3,S+1,0,M,S+1,0];p.set(v,d*h*m);for(let _=0;_<h;_++){const y=u[_*2]*2-1,w=u[_*2+1]*2-1;m===0?ns.set(1,w,y):m===1?ns.set(-y,1,-w):m===2?ns.set(-y,w,1):m===3?ns.set(-1,w,-y):m===4?ns.set(-y,-1,w):ns.set(y,w,-1),ns.toArray(x,(m*h+_)*d)}}const g=new Kt;g.setAttribute("position",new wt(p,d)),g.setAttribute("outputDirection",new wt(x,d)),e.push(new Xt(g,null)),i>Vs&&i--}return{lodMeshes:e,sizeLods:t}}function Rd(n,t,e){const i=new un(n,t,e);return i.texture.mapping=lc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ds(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function bS(n,t,e){return new re({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_S,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function SS(n,t,e){return new re({name:"SphericalGaussianBlur",defines:{SAMPLES:xS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Cd(){return new re({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Pd(){return new re({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function pc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class O0 extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new g0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ht(5,5,5),r=new re({name:"CubemapFromEquirect",uniforms:tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:ii});r.uniforms.tEquirect.value=e;const o=new Xt(s,r),a=e.minFilter;return e.minFilter===yi&&(e.minFilter=We),new gy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function wS(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Ic||d===Dc)if(t.has(h)){const p=t.get(h).texture;return a(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const x=new O0(p.height);return x.fromEquirectangularTexture(n,h),t.set(h,x),h.addEventListener("dispose",l),a(x.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const d=h.mapping,p=d===Ic||d===Dc,x=d===ds||d===Zs;if(p||x){let g=e.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Ad(n)),g=p?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return p&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new Ad(n)),g=p?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,d){return d===Ic?h.mapping=ds:d===Dc&&(h.mapping=Zs),h}function c(h){let d=0;const p=6;for(let x=0;x<p;x++)h[x]!==void 0&&d++;return d===p}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function TS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Xs("WebGLRenderer: "+i+" extension not supported."),s}}}function ES(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const p in h.attributes)t.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)t.update(h[d],n.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(d!==null){const M=d.array;x=d.version;for(let S=0,v=M.length;S<v;S+=3){const _=M[S+0],y=M[S+1],w=M[S+2];h.push(_,y,y,w,w,_)}}else{const M=p.array;x=p.version;for(let S=0,v=M.length/3-1;S<v;S+=3){const _=S+0,y=S+1,w=S+2;h.push(_,y,y,w,w,_)}}const g=new(p.count>=65535?h0:u0)(h,1);g.version=x;const m=r.get(f);m&&t.remove(m),r.set(f,g)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function AS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*o),e.update(h,i,1)}function l(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*o,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let x=0;for(let g=0;g<d;g++)x+=h[g];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function RS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Vt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function CS(n,t,e){const i=new WeakMap,s=new de;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let T=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let S=0;d===!0&&(S=1),p===!0&&(S=2),x===!0&&(S=3);let v=a.attributes.position.count*S,_=1;v>t.maxTextureSize&&(_=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const y=new Float32Array(v*_*4*f),w=new a0(y,v,_,f);w.type=En,w.needsUpdate=!0;const b=S*4;for(let A=0;A<f;A++){const C=g[A],L=m[A],D=M[A],N=v*_*4*A;for(let B=0;B<C.count;B++){const H=B*b;d===!0&&(s.fromBufferAttribute(C,B),y[N+H+0]=s.x,y[N+H+1]=s.y,y[N+H+2]=s.z,y[N+H+3]=0),p===!0&&(s.fromBufferAttribute(L,B),y[N+H+4]=s.x,y[N+H+5]=s.y,y[N+H+6]=s.z,y[N+H+7]=0),x===!0&&(s.fromBufferAttribute(D,B),y[N+H+8]=s.x,y[N+H+9]=s.y,y[N+H+10]=s.z,y[N+H+11]=D.itemSize===4?s.w:1)}}h={count:f,texture:w,size:new ot(v,_)},i.set(a,h),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];const p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function PS(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const LS={[lh]:"LINEAR_TONE_MAPPING",[uh]:"REINHARD_TONE_MAPPING",[hh]:"CINEON_TONE_MAPPING",[cc]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[ph]:"NEUTRAL_TONE_MAPPING",[fh]:"CUSTOM_TONE_MAPPING"};function NS(n,t,e,i,s,r){const o=new un(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Kt;l.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Zt([0,2,0,0,2,0],2));const u=new C0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Xt(l,u),h=new wo(-1,1,1,-1,0,1);let d=null,p=null,x=!1,g,m=null,M=[],S=!1;this.setSize=function(v,_){o.setSize(v,_),a!==null&&a.setSize(v,_),c!==null&&c.setSize(v,_);for(let y=0;y<M.length;y++){const w=M[y];w.setSize&&w.setSize(v,_)}},this.setEffects=function(v){M=v,S=M.length>0&&M[0].isRenderPass===!0;const _=o.width,y=o.height;M.length>0&&a===null&&(a=new un(_,y,{type:dn,depthBuffer:!1,stencilBuffer:!1}),c=new un(_,y,{type:dn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<M.length;w++){const b=M[w];b.setSize&&b.setSize(_,y)}},this.begin=function(v,_){if(x||v.toneMapping===si&&M.length===0)return!1;if(m=_,_!==null){const y=_.width,w=_.height;(o.width!==y||o.height!==w)&&this.setSize(y,w)}return S===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=si,!0},this.hasRenderPass=function(){return S},this.end=function(v,_){v.toneMapping=g,x=!0;let y=o,w=a;for(let b=0;b<M.length;b++){const T=M[b];T.enabled!==!1&&(T.render(v,w,y,_),T.needsSwap!==!1&&(y=w,w=w===a?c:a))}if(d!==v.outputColorSpace||p!==v.toneMapping){d=v.outputColorSpace,p=v.toneMapping,u.defines={},ne.getTransfer(d)===fe&&(u.defines.SRGB_TRANSFER="");const b=LS[p];b&&(u.defines[b]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(m),v.render(f,h),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const B0=new Xe,Hu=new ao(1,1),z0=new a0,H0=new G_,G0=new g0,Ld=[],Nd=[],Id=new Float32Array(16),Dd=new Float32Array(9),Ud=new Float32Array(4);function cr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Ld[s];if(r===void 0&&(r=new Float32Array(s),Ld[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function qe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function $e(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function mc(n,t){let e=Nd[t];e===void 0&&(e=new Int32Array(t),Nd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function IS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function DS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2fv(this.addr,t),$e(e,t)}}function US(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;n.uniform3fv(this.addr,t),$e(e,t)}}function FS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4fv(this.addr,t),$e(e,t)}}function kS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;Ud.set(i),n.uniformMatrix2fv(this.addr,!1,Ud),$e(e,i)}}function OS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;Dd.set(i),n.uniformMatrix3fv(this.addr,!1,Dd),$e(e,i)}}function BS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(qe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,i))return;Id.set(i),n.uniformMatrix4fv(this.addr,!1,Id),$e(e,i)}}function zS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function HS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2iv(this.addr,t),$e(e,t)}}function GS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;n.uniform3iv(this.addr,t),$e(e,t)}}function VS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4iv(this.addr,t),$e(e,t)}}function WS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function XS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;n.uniform2uiv(this.addr,t),$e(e,t)}}function qS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;n.uniform3uiv(this.addr,t),$e(e,t)}}function $S(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;n.uniform4uiv(this.addr,t),$e(e,t)}}function KS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Hu.compareFunction=e.isReversedDepthBuffer()?Sh:bh,r=Hu):r=B0,e.setTexture2D(t||r,s)}function YS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||H0,s)}function ZS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||G0,s)}function JS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||z0,s)}function QS(n){switch(n){case 5126:return IS;case 35664:return DS;case 35665:return US;case 35666:return FS;case 35674:return kS;case 35675:return OS;case 35676:return BS;case 5124:case 35670:return zS;case 35667:case 35671:return HS;case 35668:case 35672:return GS;case 35669:case 35673:return VS;case 5125:return WS;case 36294:return XS;case 36295:return qS;case 36296:return $S;case 35678:case 36198:case 36298:case 36306:case 35682:return KS;case 35679:case 36299:case 36307:return YS;case 35680:case 36300:case 36308:case 36293:return ZS;case 36289:case 36303:case 36311:case 36292:return JS}}function jS(n,t){n.uniform1fv(this.addr,t)}function tw(n,t){const e=cr(t,this.size,2);n.uniform2fv(this.addr,e)}function ew(n,t){const e=cr(t,this.size,3);n.uniform3fv(this.addr,e)}function nw(n,t){const e=cr(t,this.size,4);n.uniform4fv(this.addr,e)}function iw(n,t){const e=cr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function sw(n,t){const e=cr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function rw(n,t){const e=cr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ow(n,t){n.uniform1iv(this.addr,t)}function aw(n,t){n.uniform2iv(this.addr,t)}function cw(n,t){n.uniform3iv(this.addr,t)}function lw(n,t){n.uniform4iv(this.addr,t)}function uw(n,t){n.uniform1uiv(this.addr,t)}function hw(n,t){n.uniform2uiv(this.addr,t)}function fw(n,t){n.uniform3uiv(this.addr,t)}function dw(n,t){n.uniform4uiv(this.addr,t)}function pw(n,t,e){const i=this.cache,s=t.length,r=mc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Hu:o=B0;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function mw(n,t,e){const i=this.cache,s=t.length,r=mc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||H0,r[o])}function gw(n,t,e){const i=this.cache,s=t.length,r=mc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||G0,r[o])}function vw(n,t,e){const i=this.cache,s=t.length,r=mc(e,s);qe(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||z0,r[o])}function xw(n){switch(n){case 5126:return jS;case 35664:return tw;case 35665:return ew;case 35666:return nw;case 35674:return iw;case 35675:return sw;case 35676:return rw;case 5124:case 35670:return ow;case 35667:case 35671:return aw;case 35668:case 35672:return cw;case 35669:case 35673:return lw;case 5125:return uw;case 36294:return hw;case 36295:return fw;case 36296:return dw;case 35678:case 36198:case 36298:case 36306:case 35682:return pw;case 35679:case 36299:case 36307:return mw;case 35680:case 36300:case 36308:case 36293:return gw;case 36289:case 36303:case 36311:case 36292:return vw}}class _w{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=QS(e.type)}}class Mw{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xw(e.type)}}class yw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ml=/(\w+)(\])?(\[|\.)?/g;function Fd(n,t){n.seq.push(t),n.map[t.id]=t}function bw(n,t,e){const i=n.name,s=i.length;for(ml.lastIndex=0;;){const r=ml.exec(i),o=ml.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Fd(e,l===void 0?new _w(a,n,t):new Mw(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new yw(a),Fd(e,f)),e=f}}}class La{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);bw(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function kd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Sw=37297;let ww=0;function Tw(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Od=new $t;function Ew(n){ne._getMatrix(Od,ne.workingColorSpace,n);const t=`mat3( ${Od.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(n)){case Ka:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Bd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Tw(n.getShaderSource(t),a)}else return r}function Aw(n,t){const e=Ew(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Rw={[lh]:"Linear",[uh]:"Reinhard",[hh]:"Cineon",[cc]:"ACESFilmic",[dh]:"AgX",[ph]:"Neutral",[fh]:"Custom"};function Cw(n,t){const e=Rw[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const oa=new P;function Pw(){ne.getLuminanceCoefficients(oa);const n=oa.x.toFixed(4),t=oa.y.toFixed(4),e=oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fr).join(`
`)}function Nw(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Iw(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Fr(n){return n!==""}function zd(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gu(n){return n.replace(Dw,Fw)}const Uw=new Map;function Fw(n,t){let e=qt[t];if(e===void 0){const i=Uw.get(t);if(i!==void 0)e=qt[i],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gu(e)}const kw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(n){return n.replace(kw,Ow)}function Ow(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vd(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const Bw={[wa]:"SHADOWMAP_TYPE_PCF",[Ir]:"SHADOWMAP_TYPE_VSM"};function zw(n){return Bw[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Hw={[ds]:"ENVMAP_TYPE_CUBE",[Zs]:"ENVMAP_TYPE_CUBE",[lc]:"ENVMAP_TYPE_CUBE_UV"};function Gw(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Hw[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Vw={[Zs]:"ENVMAP_MODE_REFRACTION"};function Ww(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Vw[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Xw={[ch]:"ENVMAP_BLENDING_MULTIPLY",[e_]:"ENVMAP_BLENDING_MIX",[n_]:"ENVMAP_BLENDING_ADD"};function qw(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Xw[n.combine]||"ENVMAP_BLENDING_NONE"}function $w(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Kw(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=zw(e),l=Gw(e),u=Ww(e),f=qw(e),h=$w(e),d=Lw(e),p=Nw(r),x=s.createProgram();let g,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Fr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Fr).join(`
`),m.length>0&&(m+=`
`)):(g=[Vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),m=[Vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?qt.tonemapping_pars_fragment:"",e.toneMapping!==si?Cw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Aw("linearToOutputTexel",e.outputColorSpace),Pw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fr).join(`
`)),o=Gu(o),o=zd(o,e),o=Hd(o,e),a=Gu(a),a=zd(a,e),a=Hd(a,e),o=Gd(o),a=Gd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Df?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Df?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=M+g+o,v=M+m+a,_=kd(s,s.VERTEX_SHADER,S),y=kd(s,s.FRAGMENT_SHADER,v);s.attachShader(x,_),s.attachShader(x,y),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(C){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(_)||"",N=s.getShaderInfoLog(y)||"",B=L.trim(),H=D.trim(),W=N.trim();let j=!0,O=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,_,y);else{const $=Bd(s,_,"vertex"),Q=Bd(s,y,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+$+`
`+Q)}else B!==""?Dt("WebGLProgram: Program Info Log:",B):(H===""||W==="")&&(O=!1);O&&(C.diagnostics={runnable:j,programLog:B,vertexShader:{log:H,prefix:g},fragmentShader:{log:W,prefix:m}})}s.deleteShader(_),s.deleteShader(y),b=new La(s,x),T=Iw(s,x)}let b;this.getUniforms=function(){return b===void 0&&w(this),b};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,Sw)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ww++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=_,this.fragmentShader=y,this}let Yw=0;class Zw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Jw(t),e.set(t,i)),i}}class Jw{constructor(t){this.id=Yw++,this.code=t,this.usedTimes=0}}function Qw(n){return n===ps||n===Xa||n===qa}function jw(n,t,e,i,s,r){const o=new c0,a=new Zw,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return c.add(b),b===0?"uv":`uv${b}`}function x(b,T,A,C,L,D){const N=C.fog,B=L.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,j=t.get(b.envMap||H,W),O=j&&j.mapping===lc?j.image.height:null,$=d[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&Dt("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const Q=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_t=Q!==void 0?Q.length:0;let ft=0;B.morphAttributes.position!==void 0&&(ft=1),B.morphAttributes.normal!==void 0&&(ft=2),B.morphAttributes.color!==void 0&&(ft=3);let St,Nt,zt,X;if($){const be=jn[$];St=be.vertexShader,Nt=be.fragmentShader}else{St=b.vertexShader,Nt=b.fragmentShader;const be=a.getVertexShaderStage(b),ue=a.getFragmentShaderStage(b);a.update(b,be,ue),zt=be.id,X=ue.id}const Y=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Pt=L.isInstancedMesh===!0,it=L.isBatchedMesh===!0,Wt=!!b.map,Ae=!!b.matcap,st=!!j,Gt=!!b.aoMap,le=!!b.lightMap,ee=!!b.bumpMap&&b.wireframe===!1,Me=!!b.normalMap,Ie=!!b.displacementMap,Ke=!!b.emissiveMap,Te=!!b.metalnessMap,Re=!!b.roughnessMap,F=b.anisotropy>0,tn=b.clearcoat>0,pe=b.dispersion>0,I=b.retroreflectivity>0,E=b.iridescence>0,z=b.sheen>0,q=b.transmission>0,Z=F&&!!b.anisotropyMap,at=tn&&!!b.clearcoatMap,ht=tn&&!!b.clearcoatNormalMap,J=tn&&!!b.clearcoatRoughnessMap,et=E&&!!b.iridescenceMap,dt=E&&!!b.iridescenceThicknessMap,Ut=z&&!!b.sheenColorMap,vt=z&&!!b.sheenRoughnessMap,pt=!!b.specularMap,Ft=!!b.specularColorMap,Bt=!!b.specularIntensityMap,Yt=q&&!!b.transmissionMap,k=q&&!!b.thicknessMap,mt=!!b.gradientMap,tt=!!b.alphaMap,gt=b.alphaTest>0,bt=!!b.alphaHash,nt=!!b.extensions;let kt=si;b.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(kt=n.toneMapping);const Lt={shaderID:$,shaderType:b.type,shaderName:b.name,vertexShader:St,fragmentShader:Nt,defines:b.defines,customVertexShaderID:zt,customFragmentShaderID:X,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:it,batchingColor:it&&L._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&L.instanceColor!==null,instancingMorph:Pt&&L.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:Ae,envMap:st,envMapMode:st&&j.mapping,envMapCubeUVHeight:O,aoMap:Gt,lightMap:le,bumpMap:ee,normalMap:Me,displacementMap:Ie,emissiveMap:Ke,normalMapObjectSpace:Me&&b.normalMapType===a_,normalMapTangentSpace:Me&&b.normalMapType===$a,packedNormalMap:Me&&b.normalMapType===$a&&Qw(b.normalMap.format),metalnessMap:Te,roughnessMap:Re,anisotropy:F,anisotropyMap:Z,clearcoat:tn,clearcoatMap:at,clearcoatNormalMap:ht,clearcoatRoughnessMap:J,dispersion:pe,retroreflection:I,iridescence:E,iridescenceMap:et,iridescenceThicknessMap:dt,sheen:z,sheenColorMap:Ut,sheenRoughnessMap:vt,specularMap:pt,specularColorMap:Ft,specularIntensityMap:Bt,transmission:q,transmissionMap:Yt,thicknessMap:k,gradientMap:mt,opaque:b.transparent===!1&&b.blending===Vr&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:gt,alphaHash:bt,combine:b.combine,mapUv:Wt&&p(b.map.channel),aoMapUv:Gt&&p(b.aoMap.channel),lightMapUv:le&&p(b.lightMap.channel),bumpMapUv:ee&&p(b.bumpMap.channel),normalMapUv:Me&&p(b.normalMap.channel),displacementMapUv:Ie&&p(b.displacementMap.channel),emissiveMapUv:Ke&&p(b.emissiveMap.channel),metalnessMapUv:Te&&p(b.metalnessMap.channel),roughnessMapUv:Re&&p(b.roughnessMap.channel),anisotropyMapUv:Z&&p(b.anisotropyMap.channel),clearcoatMapUv:at&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:vt&&p(b.sheenRoughnessMap.channel),specularMapUv:pt&&p(b.specularMap.channel),specularColorMapUv:Ft&&p(b.specularColorMap.channel),specularIntensityMapUv:Bt&&p(b.specularIntensityMap.channel),transmissionMapUv:Yt&&p(b.transmissionMap.channel),thicknessMapUv:k&&p(b.thicknessMap.channel),alphaMapUv:tt&&p(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||F),vertexNormals:!!B.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Wt||tt),fog:!!N,useFog:b.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:yt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:ft,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:kt,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&ne.getTransfer(b.map.colorSpace)===fe,decodeVideoTextureEmissive:Ke&&b.emissiveMap.isVideoTexture===!0&&ne.getTransfer(b.emissiveMap.colorSpace)===fe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===we,flipSided:b.side===Qe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:nt&&b.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&b.extensions.multiDraw===!0||it)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function g(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const A in b.defines)T.push(A),T.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(m(T,b),M(T,b),T.push(n.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function m(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numSunLights),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numSunLightShadows),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function M(b,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),b.push(o.mask)}function S(b){const T=d[b.type];let A;if(T){const C=jn[T];A=gn.clone(C.uniforms)}else A=b.uniforms;return A}function v(b,T){let A=u.get(T);return A!==void 0?++A.usedTimes:(A=new Kw(n,T,b,s),l.push(A),u.set(T,A)),A}function _(b){if(--b.usedTimes===0){const T=l.indexOf(b);l[T]=l[l.length-1],l.pop(),u.delete(b.cacheKey),b.destroy()}}function y(b){a.remove(b)}function w(){a.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:S,acquireProgram:v,releaseProgram:_,releaseShaderCache:y,programs:l,dispose:w}}function tT(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function eT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Wd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Xd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,p,x,g,m){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:p,materialVariant:o(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},n[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=p,M.materialVariant=o(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=g,M.group=m),t++,M}function c(h,d,p,x,g,m,M){M.reversedDepth===!0&&(g=-g);const S=a(h,d,p,x,g,m);p.transmission>0?i.push(S):p.transparent===!0?s.push(S):e.push(S)}function l(h,d,p,x,g,m){const M=a(h,d,p,x,g,m);p.transmission>0?i.unshift(M):p.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,d){e.length>1&&e.sort(h||eT),i.length>1&&i.sort(d||Wd),s.length>1&&s.sort(d||Wd)}function f(){for(let h=t,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function nT(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Xd,n.set(i,[o])):s>=r.length?(o=new Xd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function iT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new ct};break;case"SpotLight":e={position:new P,direction:new P,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function sT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let rT=0;function oT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function aT(n){const t=new iT,e=sT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);const s=new P,r=new Ot,o=new Ot;function a(l){let u=0,f=0,h=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let d=0,p=0,x=0,g=0,m=0,M=0,S=0,v=0,_=0,y=0,w=0,b=0,T=0,A=0;l.sort(oT);for(let L=0,D=l.length;L<D;L++){const N=l[L],B=N.color,H=N.intensity,W=N.distance;let j=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ps?j=N.shadow.map.texture:j=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=B.r*H,f+=B.g*H,h+=B.b*H;else if(N.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(N.sh.coefficients[O],H);A++}else if(N.isSunLight){const O=t.get(N);if(O.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const $=N.shadow,Q=e.get(N);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[p]=Q,i.sunShadowMap[p]=j;const _t=$.getViewportCount();for(let ft=0;ft<_t;ft++)i.sunShadowMatrix[x+ft]=$.getMatrix(ft),i.sunShadowCascade[x+ft]=$._cascadeData[ft];x+=_t,p++}i.sun[d]=O,d++}else if(N.isDirectionalLight){const O=t.get(N);if(O.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const $=N.shadow,Q=e.get(N);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=j,i.directionalShadowMatrix[g]=N.shadow.matrix,_++}i.directional[g]=O,g++}else if(N.isSpotLight){const O=t.get(N);O.position.setFromMatrixPosition(N.matrixWorld),O.color.copy(B).multiplyScalar(H),O.distance=W,O.coneCos=Math.cos(N.angle),O.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),O.decay=N.decay,i.spot[M]=O;const $=N.shadow;if(N.map&&(i.spotLightMap[b]=N.map,b++,$.updateMatrices(N),N.castShadow&&T++),i.spotLightMatrix[M]=$.matrix,N.castShadow){const Q=e.get(N);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=j,w++}M++}else if(N.isRectAreaLight){const O=t.get(N);O.color.copy(B).multiplyScalar(H),O.halfWidth.set(N.width*.5,0,0),O.halfHeight.set(0,N.height*.5,0),i.rectArea[S]=O,S++}else if(N.isPointLight){const O=t.get(N);if(O.color.copy(N.color).multiplyScalar(N.intensity),O.distance=N.distance,O.decay=N.decay,N.castShadow){const $=N.shadow,Q=e.get(N);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,Q.shadowCameraNear=$.camera.near,Q.shadowCameraFar=$.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=N.shadow.matrix,y++}i.point[m]=O,m++}else if(N.isHemisphereLight){const O=t.get(N);O.skyColor.copy(N.color).multiplyScalar(H),O.groundColor.copy(N.groundColor).multiplyScalar(H),i.hemi[v]=O,v++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const C=i.hash;(C.sunLength!==d||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==M||C.rectAreaLength!==S||C.hemiLength!==v||C.numSunShadows!==p||C.numDirectionalShadows!==_||C.numPointShadows!==y||C.numSpotShadows!==w||C.numSpotMaps!==b||C.numLightProbes!==A)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=S,i.point.length=m,i.hemi.length=v,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.directionalShadowMatrix.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.pointShadowMatrix.length=y,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,C.sunLength=d,C.directionalLength=g,C.pointLength=m,C.spotLength=M,C.rectAreaLength=S,C.hemiLength=v,C.numSunShadows=p,C.numDirectionalShadows=_,C.numPointShadows=y,C.numSpotShadows=w,C.numSpotMaps=b,C.numLightProbes=A,i.version=rT++)}function c(l,u){let f=0,h=0,d=0,p=0,x=0,g=0;const m=u.matrixWorldInverse;for(let M=0,S=l.length;M<S;M++){const v=l[M];if(v.isSunLight){const _=i.sun[f];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),f++}else if(v.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(v.isSpotLight){const _=i.spot[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const _=i.rectArea[x];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),x++}else if(v.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=i.hemi[g];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:i}}function qd(n){const t=new aT(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function o(h){e.push(h)}function a(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function cT(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new qd(n),t.set(s,[a])):r>=o.length?(a=new qd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const lT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uT=`uniform sampler2D shadow_pass;
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
}`,hT=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],fT=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],$d=new Ot,br=new P,gl=new P;function dT(n,t,e){let i=new hc;const s=new ot,r=new ot,o=new de,a=new WM,c=new XM,l={},u=e.maxTextureSize,f={[Ai]:Qe,[Qe]:Ai,[we]:we},h=new re({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:lT,fragmentShader:uT}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new Kt;p.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Xt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wa;let m=this.type;this.render=function(y,w,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;this.type===Fx&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wa);const T=n.getRenderTarget(),A=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),L=n.state;L.setBlending(ii),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const D=m!==this.type;D&&w.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=y.length;N<B;N++){const H=y[N],W=H.shadow;if(W===void 0){Dt("WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const j=W.getFrameExtents();s.multiply(j),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,W.mapSize.y=r.y));const O=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=O,W.map===null||D===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ir){if(H.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new un(s.x,s.y,{format:ps,type:dn,minFilter:We,magFilter:We,generateMipmaps:!1}),W.map.texture.name=H.name+".shadowMap",W.map.depthTexture=new ao(s.x,s.y,En),W.map.depthTexture.name=H.name+".shadowMapDepth",W.map.depthTexture.format=Ri,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve}else H.isPointLight?(W.map=new O0(s.x),W.map.depthTexture=new uM(s.x,oi)):(W.map=new un(s.x,s.y),W.map.depthTexture=new ao(s.x,s.y,oi)),W.map.depthTexture.name=H.name+".shadowMap",W.map.depthTexture.format=Ri,this.type===wa?(W.map.depthTexture.compareFunction=O?Sh:bh,W.map.depthTexture.minFilter=We,W.map.depthTexture.magFilter=We):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const $=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();H.isPointLight!==!0&&W.updateMatrices(H,b);for(let Q=0;Q<$;Q++){const _t=W.getCamera(Q);if(H.isPointLight){const ft=W.camera,St=W.matrix,Nt=H.distance||ft.far;Nt!==ft.far&&(ft.far=Nt,ft.updateProjectionMatrix()),br.setFromMatrixPosition(H.matrixWorld),ft.position.copy(br),gl.copy(ft.position),gl.add(hT[Q]),ft.up.copy(fT[Q]),ft.lookAt(gl),ft.updateMatrixWorld(),St.makeTranslation(-br.x,-br.y,-br.z),$d.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),W._frustum.setFromProjectionMatrix($d,ft.coordinateSystem,ft.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(W.map),n.clear());const ft=W.getViewport(Q);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),L.viewport(o)}i=W.getFrustum(Q),v(w,b,_t,H,this.type)}W.isPointLightShadow!==!0&&this.type===Ir&&M(W,b),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,A,C)};function M(y,w){const b=t.update(x);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,d.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),y.mapPass===null?y.mapPass=new un(s.x,s.y,{format:ps,type:dn}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),h.uniforms.shadow_pass.value=y.map.depthTexture,h.uniforms.resolution.value.set(y.map.width,y.map.height),h.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(w,null,b,h,x,null),d.uniforms.shadow_pass.value=y.mapPass.texture,d.uniforms.resolution.value.set(y.map.width,y.map.height),d.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(w,null,b,d,x,null)}function S(y,w,b,T){let A=null;const C=b.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(C!==void 0)A=C;else if(A=b.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=A.uuid,D=w.uuid;let N=l[L];N===void 0&&(N={},l[L]=N);let B=N[D];B===void 0&&(B=A.clone(),N[D]=B,w.addEventListener("dispose",_)),A=B}if(A.visible=w.visible,A.wireframe=w.wireframe,T===Ir?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:f[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,b.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const L=n.properties.get(A);L.light=b}return A}function v(y,w,b,T,A){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&A===Ir)&&(!y.frustumCulled||y.intersectsFrustum(i))){y.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,y.matrixWorld);const D=t.update(y),N=y.material;if(Array.isArray(N)){const B=D.groups;for(let H=0,W=B.length;H<W;H++){const j=B[H],O=N[j.materialIndex];if(O&&O.visible){const $=S(y,O,T,A);y.onBeforeShadow(n,y,w,b,D,$,j),n.renderBufferDirect(b,null,D,$,y,j),y.onAfterShadow(n,y,w,b,D,$,j)}}}else if(N.visible){const B=S(y,N,T,A);y.onBeforeShadow(n,y,w,b,D,B,null),n.renderBufferDirect(b,null,D,B,y,null),y.onAfterShadow(n,y,w,b,D,B,null)}}const L=y.children;for(let D=0,N=L.length;D<N;D++)v(L[D],w,b,T,A)}function _(y){y.target.removeEventListener("dispose",_);for(const b in l){const T=l[b],A=y.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function pT(n,t){function e(){let k=!1;const mt=new de;let tt=null;const gt=new de(0,0,0,0);return{setMask:function(bt){tt!==bt&&!k&&(n.colorMask(bt,bt,bt,bt),tt=bt)},setLocked:function(bt){k=bt},setClear:function(bt,nt,kt,Lt,be){be===!0&&(bt*=Lt,nt*=Lt,kt*=Lt),mt.set(bt,nt,kt,Lt),gt.equals(mt)===!1&&(n.clearColor(bt,nt,kt,Lt),gt.copy(mt))},reset:function(){k=!1,tt=null,gt.set(-1,0,0,0)}}}function i(){let k=!1,mt=!1,tt=null,gt=null,bt=null;return{setReversed:function(nt){if(mt!==nt){const kt=t.get("EXT_clip_control");nt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),mt=nt;const Lt=bt;bt=null,this.setClear(Lt)}},getReversed:function(){return mt},setTest:function(nt){nt?Y(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(nt){tt!==nt&&!k&&(n.depthMask(nt),tt=nt)},setFunc:function(nt){if(mt&&(nt=__[nt]),gt!==nt){switch(nt){case jl:n.depthFunc(n.NEVER);break;case tu:n.depthFunc(n.ALWAYS);break;case eu:n.depthFunc(n.LESS);break;case to:n.depthFunc(n.LEQUAL);break;case nu:n.depthFunc(n.EQUAL);break;case iu:n.depthFunc(n.GEQUAL);break;case su:n.depthFunc(n.GREATER);break;case ru:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}gt=nt}},setLocked:function(nt){k=nt},setClear:function(nt){bt!==nt&&(bt=nt,mt&&(nt=1-nt),n.clearDepth(nt))},reset:function(){k=!1,tt=null,gt=null,bt=null,mt=!1}}}function s(){let k=!1,mt=null,tt=null,gt=null,bt=null,nt=null,kt=null,Lt=null,be=null;return{setTest:function(ue){k||(ue?Y(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(ue){mt!==ue&&!k&&(n.stencilMask(ue),mt=ue)},setFunc:function(ue,Pn,$n){(tt!==ue||gt!==Pn||bt!==$n)&&(n.stencilFunc(ue,Pn,$n),tt=ue,gt=Pn,bt=$n)},setOp:function(ue,Pn,$n){(nt!==ue||kt!==Pn||Lt!==$n)&&(n.stencilOp(ue,Pn,$n),nt=ue,kt=Pn,Lt=$n)},setLocked:function(ue){k=ue},setClear:function(ue){be!==ue&&(n.clearStencil(ue),be=ue)},reset:function(){k=!1,mt=null,tt=null,gt=null,bt=null,nt=null,kt=null,Lt=null,be=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],x=null,g=!1,m=null,M=null,S=null,v=null,_=null,y=null,w=null,b=new ct(0,0,0),T=0,A=!1,C=null,L=null,D=null,N=null,B=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(O)[1]),W=j>=1):O.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),W=j>=2);let $=null,Q={};const _t=n.getParameter(n.SCISSOR_BOX),ft=n.getParameter(n.VIEWPORT),St=new de().fromArray(_t),Nt=new de().fromArray(ft);function zt(k,mt,tt,gt){const bt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(k,nt),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let kt=0;kt<tt;kt++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(mt,0,n.RGBA,1,1,gt,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(mt+kt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return nt}const X={};X[n.TEXTURE_2D]=zt(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=zt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=zt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=zt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(n.DEPTH_TEST),o.setFunc(to),ee(!1),Me(Ef),Y(n.CULL_FACE),Gt(ii);function Y(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function yt(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function Pt(k,mt){return h[k]!==mt?(n.bindFramebuffer(k,mt),h[k]=mt,k===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=mt),k===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=mt),!0):!1}function it(k,mt){let tt=p,gt=!1;if(k){tt=d.get(mt),tt===void 0&&(tt=[],d.set(mt,tt));const bt=k.textures;if(tt.length!==bt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,kt=bt.length;nt<kt;nt++)tt[nt]=n.COLOR_ATTACHMENT0+nt;tt.length=bt.length,gt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,gt=!0);gt&&n.drawBuffers(tt)}function Wt(k){return x!==k?(n.useProgram(k),x=k,!0):!1}const Ae={[zs]:n.FUNC_ADD,[Ox]:n.FUNC_SUBTRACT,[Bx]:n.FUNC_REVERSE_SUBTRACT};Ae[zx]=n.MIN,Ae[Hx]=n.MAX;const st={[Gx]:n.ZERO,[Vx]:n.ONE,[Wx]:n.SRC_COLOR,[Km]:n.SRC_ALPHA,[Zx]:n.SRC_ALPHA_SATURATE,[Kx]:n.DST_COLOR,[qx]:n.DST_ALPHA,[Xx]:n.ONE_MINUS_SRC_COLOR,[Ym]:n.ONE_MINUS_SRC_ALPHA,[Yx]:n.ONE_MINUS_DST_COLOR,[$x]:n.ONE_MINUS_DST_ALPHA,[Jx]:n.CONSTANT_COLOR,[Qx]:n.ONE_MINUS_CONSTANT_COLOR,[jx]:n.CONSTANT_ALPHA,[t_]:n.ONE_MINUS_CONSTANT_ALPHA};function Gt(k,mt,tt,gt,bt,nt,kt,Lt,be,ue){if(k===ii){g===!0&&(yt(n.BLEND),g=!1);return}if(g===!1&&(Y(n.BLEND),g=!0),k!==kx){if(k!==m||ue!==A){if((M!==zs||_!==zs)&&(n.blendEquation(n.FUNC_ADD),M=zs,_=zs),ue)switch(k){case Vr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mn:n.blendFunc(n.ONE,n.ONE);break;case Af:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Vt("WebGLState: Invalid blending: ",k);break}else switch(k){case Vr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case mn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Af:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rf:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",k);break}S=null,v=null,y=null,w=null,b.set(0,0,0),T=0,m=k,A=ue}return}bt=bt||mt,nt=nt||tt,kt=kt||gt,(mt!==M||bt!==_)&&(n.blendEquationSeparate(Ae[mt],Ae[bt]),M=mt,_=bt),(tt!==S||gt!==v||nt!==y||kt!==w)&&(n.blendFuncSeparate(st[tt],st[gt],st[nt],st[kt]),S=tt,v=gt,y=nt,w=kt),(Lt.equals(b)===!1||be!==T)&&(n.blendColor(Lt.r,Lt.g,Lt.b,be),b.copy(Lt),T=be),m=k,A=!1}function le(k,mt){k.side===we?yt(n.CULL_FACE):Y(n.CULL_FACE);let tt=k.side===Qe;mt&&(tt=!tt),ee(tt),k.blending===Vr&&k.transparent===!1?Gt(ii):Gt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const gt=k.stencilWrite;a.setTest(gt),gt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ke(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ee(k){C!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),C=k)}function Me(k){k!==Dx?(Y(n.CULL_FACE),k!==L&&(k===Ef?n.cullFace(n.BACK):k===Ux?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),L=k}function Ie(k){k!==D&&(W&&n.lineWidth(k),D=k)}function Ke(k,mt,tt){k?(Y(n.POLYGON_OFFSET_FILL),(N!==mt||B!==tt)&&(N=mt,B=tt,o.getReversed()&&(mt=-mt),n.polygonOffset(mt,tt))):yt(n.POLYGON_OFFSET_FILL)}function Te(k){k?Y(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Re(k){k===void 0&&(k=n.TEXTURE0+H-1),$!==k&&(n.activeTexture(k),$=k)}function F(k,mt,tt){tt===void 0&&($===null?tt=n.TEXTURE0+H-1:tt=$);let gt=Q[tt];gt===void 0&&(gt={type:void 0,texture:void 0},Q[tt]=gt),(gt.type!==k||gt.texture!==mt)&&($!==tt&&(n.activeTexture(tt),$=tt),n.bindTexture(k,mt||X[k]),gt.type=k,gt.texture=mt)}function tn(){const k=Q[$];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function pe(){try{n.compressedTexImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function E(){try{n.texSubImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function z(){try{n.texSubImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function at(){try{n.texStorage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function ht(){try{n.texStorage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function J(){try{n.texImage2D(...arguments)}catch(k){Vt("WebGLState:",k)}}function et(){try{n.texImage3D(...arguments)}catch(k){Vt("WebGLState:",k)}}function dt(k){return f[k]!==void 0?f[k]:n.getParameter(k)}function Ut(k,mt){f[k]!==mt&&(n.pixelStorei(k,mt),f[k]=mt)}function vt(k){St.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),St.copy(k))}function pt(k){Nt.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Nt.copy(k))}function Ft(k,mt){let tt=l.get(mt);tt===void 0&&(tt=new WeakMap,l.set(mt,tt));let gt=tt.get(k);gt===void 0&&(gt=n.getUniformBlockIndex(mt,k.name),tt.set(k,gt))}function Bt(k,mt){const gt=l.get(mt).get(k);c.get(mt)!==gt&&(n.uniformBlockBinding(mt,gt,k.__bindingPointIndex),c.set(mt,gt))}function Yt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,Q={},h={},d=new WeakMap,p=[],x=null,g=!1,m=null,M=null,S=null,v=null,_=null,y=null,w=null,b=new ct(0,0,0),T=0,A=!1,C=null,L=null,D=null,N=null,B=null,St.set(0,0,n.canvas.width,n.canvas.height),Nt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:yt,bindFramebuffer:Pt,drawBuffers:it,useProgram:Wt,setBlending:Gt,setMaterial:le,setFlipSided:ee,setCullFace:Me,setLineWidth:Ie,setPolygonOffset:Ke,setScissorTest:Te,activeTexture:Re,bindTexture:F,unbindTexture:tn,compressedTexImage2D:pe,compressedTexImage3D:I,texImage2D:J,texImage3D:et,pixelStorei:Ut,getParameter:dt,updateUBOMapping:Ft,uniformBlockBinding:Bt,texStorage2D:at,texStorage3D:ht,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:vt,viewport:pt,reset:Yt}}function mT(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,E){return p?new OffscreenCanvas(I,E):oo("canvas")}function g(I,E,z){let q=1;const Z=pe(I);if((Z.width>z||Z.height>z)&&(q=z/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const at=Math.floor(q*Z.width),ht=Math.floor(q*Z.height);h===void 0&&(h=x(at,ht));const J=E?x(at,ht):h;return J.width=at,J.height=ht,J.getContext("2d").drawImage(I,0,0,at,ht),Dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+at+"x"+ht+")."),J}else return"data"in I&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),I;return I}function m(I){return I.generateMipmaps}function M(I){n.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(I,E,z,q,Z,at=!1){if(I!==null){if(n[I]!==void 0)return n[I];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ht;q&&(ht=t.get("EXT_texture_norm16"),ht||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=E;if(E===n.RED&&(z===n.FLOAT&&(J=n.R32F),z===n.HALF_FLOAT&&(J=n.R16F),z===n.UNSIGNED_BYTE&&(J=n.R8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.R16_EXT),z===n.SHORT&&ht&&(J=ht.R16_SNORM_EXT)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.R8UI),z===n.UNSIGNED_SHORT&&(J=n.R16UI),z===n.UNSIGNED_INT&&(J=n.R32UI),z===n.BYTE&&(J=n.R8I),z===n.SHORT&&(J=n.R16I),z===n.INT&&(J=n.R32I)),E===n.RG&&(z===n.FLOAT&&(J=n.RG32F),z===n.HALF_FLOAT&&(J=n.RG16F),z===n.UNSIGNED_BYTE&&(J=n.RG8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.RG16_EXT),z===n.SHORT&&ht&&(J=ht.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RG8UI),z===n.UNSIGNED_SHORT&&(J=n.RG16UI),z===n.UNSIGNED_INT&&(J=n.RG32UI),z===n.BYTE&&(J=n.RG8I),z===n.SHORT&&(J=n.RG16I),z===n.INT&&(J=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RGB8UI),z===n.UNSIGNED_SHORT&&(J=n.RGB16UI),z===n.UNSIGNED_INT&&(J=n.RGB32UI),z===n.BYTE&&(J=n.RGB8I),z===n.SHORT&&(J=n.RGB16I),z===n.INT&&(J=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),z===n.UNSIGNED_INT&&(J=n.RGBA32UI),z===n.BYTE&&(J=n.RGBA8I),z===n.SHORT&&(J=n.RGBA16I),z===n.INT&&(J=n.RGBA32I)),E===n.RGB&&(z===n.UNSIGNED_SHORT&&ht&&(J=ht.RGB16_EXT),z===n.SHORT&&ht&&(J=ht.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),E===n.RGBA){const et=at?Ka:ne.getTransfer(Z);z===n.FLOAT&&(J=n.RGBA32F),z===n.HALF_FLOAT&&(J=n.RGBA16F),z===n.UNSIGNED_BYTE&&(J=et===fe?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&ht&&(J=ht.RGBA16_EXT),z===n.SHORT&&ht&&(J=ht.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(I,E){let z;return I?E===null||E===oi||E===no?z=n.DEPTH24_STENCIL8:E===En?z=n.DEPTH32F_STENCIL8:E===eo&&(z=n.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===oi||E===no?z=n.DEPTH_COMPONENT24:E===En?z=n.DEPTH_COMPONENT32F:E===eo&&(z=n.DEPTH_COMPONENT16),z}function y(I,E){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ve&&I.minFilter!==We?Math.log2(Math.max(E.width,E.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?E.mipmaps.length:1}function w(I){const E=I.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&f.delete(E)}function b(I){const E=I.target;E.removeEventListener("dispose",b),C(E)}function T(I){const E=i.get(I);if(E.__webglInit===void 0)return;const z=I.source,q=d.get(z);if(q){const Z=q[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&A(I),Object.keys(q).length===0&&d.delete(z)}i.remove(I)}function A(I){const E=i.get(I);n.deleteTexture(E.__webglTexture);const z=I.source,q=d.get(z);delete q[E.__cacheKey],o.memory.textures--}function C(I){const E=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(E.__webglFramebuffer[q]))for(let Z=0;Z<E.__webglFramebuffer[q].length;Z++)n.deleteFramebuffer(E.__webglFramebuffer[q][Z]);else n.deleteFramebuffer(E.__webglFramebuffer[q]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[q])}else{if(Array.isArray(E.__webglFramebuffer))for(let q=0;q<E.__webglFramebuffer.length;q++)n.deleteFramebuffer(E.__webglFramebuffer[q]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let q=0;q<E.__webglColorRenderbuffer.length;q++)E.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[q]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=I.textures;for(let q=0,Z=z.length;q<Z;q++){const at=i.get(z[q]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(z[q])}i.remove(I)}let L=0;function D(){L=0}function N(){return L}function B(I){L=I}function H(){const I=L;return I>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,I}function W(I){const E=[];return E.push(I.wrapS),E.push(I.wrapT),E.push(I.wrapR||0),E.push(I.magFilter),E.push(I.minFilter),E.push(I.anisotropy),E.push(I.internalFormat),E.push(I.format),E.push(I.type),E.push(I.generateMipmaps),E.push(I.premultiplyAlpha),E.push(I.flipY),E.push(I.unpackAlignment),E.push(I.colorSpace),E.join()}function j(I,E){const z=i.get(I);if(I.isVideoTexture&&F(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){const q=I.image;if(q===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,I,E);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function O(I,E){const z=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){yt(z,I,E);return}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function $(I,E){const z=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){yt(z,I,E);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function Q(I,E){const z=i.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&z.__version!==I.version){Pt(z,I,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const _t={[Js]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[Wa]:n.MIRRORED_REPEAT},ft={[Ve]:n.NEAREST,[Jm]:n.NEAREST_MIPMAP_NEAREST,[Dr]:n.NEAREST_MIPMAP_LINEAR,[We]:n.LINEAR,[Ta]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},St={[l_]:n.NEVER,[p_]:n.ALWAYS,[u_]:n.LESS,[bh]:n.LEQUAL,[h_]:n.EQUAL,[Sh]:n.GEQUAL,[f_]:n.GREATER,[d_]:n.NOTEQUAL};function Nt(I,E){if(E.type===En&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===We||E.magFilter===Ta||E.magFilter===Dr||E.magFilter===yi||E.minFilter===We||E.minFilter===Ta||E.minFilter===Dr||E.minFilter===yi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,_t[E.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,_t[E.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,_t[E.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,ft[E.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,ft[E.minFilter]),E.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,St[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ve||E.minFilter!==Dr&&E.minFilter!==yi||E.type===En&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function zt(I,E){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,E.addEventListener("dispose",w));const q=E.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const at=W(E);if(at!==I.__cacheKey){Z[at]===void 0&&(Z[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Z[at].usedTimes++;const ht=Z[I.__cacheKey];ht!==void 0&&(Z[I.__cacheKey].usedTimes--,ht.usedTimes===0&&A(E)),I.__cacheKey=at,I.__webglTexture=Z[at].texture}return z}function X(I,E,z){return Math.floor(Math.floor(I/z)/E)}function Y(I,E,z,q){const at=I.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,z,q,E.data);else{at.sort((Ut,vt)=>Ut.start-vt.start);let ht=0;for(let Ut=1;Ut<at.length;Ut++){const vt=at[ht],pt=at[Ut],Ft=vt.start+vt.count,Bt=X(pt.start,E.width,4),Yt=X(vt.start,E.width,4);pt.start<=Ft+1&&Bt===Yt&&X(pt.start+pt.count-1,E.width,4)===Bt?vt.count=Math.max(vt.count,pt.start+pt.count-vt.start):(++ht,at[ht]=pt)}at.length=ht+1;const J=e.getParameter(n.UNPACK_ROW_LENGTH),et=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let Ut=0,vt=at.length;Ut<vt;Ut++){const pt=at[Ut],Ft=Math.floor(pt.start/4),Bt=Math.ceil(pt.count/4),Yt=Ft%E.width,k=Math.floor(Ft/E.width),mt=Bt,tt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(n.UNPACK_SKIP_ROWS,k),e.texSubImage2D(n.TEXTURE_2D,0,Yt,k,mt,tt,z,q,E.data)}I.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,J),e.pixelStorei(n.UNPACK_SKIP_PIXELS,et),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function yt(I,E,z){let q=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(q=n.TEXTURE_3D);const Z=zt(I,E),at=E.source;e.bindTexture(q,I.__webglTexture,n.TEXTURE0+z);const ht=i.get(at);if(at.version!==ht.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const tt=ne.getPrimaries(ne.workingColorSpace),gt=E.colorSpace===qi?null:ne.getPrimaries(E.colorSpace),bt=E.colorSpace===qi||tt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let et=g(E.image,!1,s.maxTextureSize);et=tn(E,et);const dt=r.convert(E.format,E.colorSpace),Ut=r.convert(E.type);let vt=v(E.internalFormat,dt,Ut,E.normalized,E.colorSpace,E.isVideoTexture);Nt(q,E);let pt;const Ft=E.mipmaps,Bt=E.isVideoTexture!==!0,Yt=ht.__version===void 0||Z===!0,k=at.dataReady,mt=y(E,et);if(E.isDepthTexture)vt=_(E.format===cs,E.type),Yt&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,vt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Ut,null));else if(E.isDataTexture)if(Ft.length>0){Bt&&Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,Ft[0].width,Ft[0].height);for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,dt,Ut,pt.data);E.generateMipmaps=!1}else Bt?(Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,et.width,et.height),k&&Y(E,et,dt,Ut)):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Ut,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Bt&&Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,mt,vt,Ft[0].width,Ft[0].height,et.depth);for(let tt=0,gt=Ft.length;tt<gt;tt++)if(pt=Ft[tt],E.format!==An)if(dt!==null)if(Bt){if(k)if(E.layerUpdates.size>0){const bt=Td(pt.width,pt.height,E.format,E.type);for(const nt of E.layerUpdates){const kt=pt.data.subarray(nt*bt/pt.data.BYTES_PER_ELEMENT,(nt+1)*bt/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,nt,pt.width,pt.height,1,dt,kt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,pt.width,pt.height,et.depth,dt,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,vt,pt.width,pt.height,et.depth,0,pt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,pt.width,pt.height,et.depth,dt,Ut,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,vt,pt.width,pt.height,et.depth,0,dt,Ut,pt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Bt&&Yt&&e.texStorage2D(n.TEXTURE_2D,mt,vt,Ft[0].width,Ft[0].height);for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],E.format!==An?dt!==null?Bt?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,pt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,pt.width,pt.height,0,dt,Ut,pt.data)}else if(E.isDataArrayTexture)if(Bt){if(Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,mt,vt,et.width,et.height,et.depth),k)if(E.layerUpdates.size>0){const tt=Td(et.width,et.height,E.format,E.type);for(const gt of E.layerUpdates){const bt=et.data.subarray(gt*tt/et.data.BYTES_PER_ELEMENT,(gt+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,gt,et.width,et.height,1,dt,Ut,bt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,Ut,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,vt,et.width,et.height,et.depth,0,dt,Ut,et.data);else if(E.isData3DTexture)Bt?(Yt&&e.texStorage3D(n.TEXTURE_3D,mt,vt,et.width,et.height,et.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,Ut,et.data)):e.texImage3D(n.TEXTURE_3D,0,vt,et.width,et.height,et.depth,0,dt,Ut,et.data);else if(E.isFramebufferTexture){if(Yt)if(Bt)e.texStorage2D(n.TEXTURE_2D,mt,vt,et.width,et.height);else{let tt=et.width,gt=et.height;for(let bt=0;bt<mt;bt++)e.texImage2D(n.TEXTURE_2D,bt,vt,tt,gt,0,dt,Ut,null),tt>>=1,gt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){const tt=n.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),et.parentNode!==tt){tt.appendChild(et),f.add(E),tt.onpaint=gt=>{const bt=gt.changedElements;for(const nt of f)bt.includes(nt.image)&&(nt.needsUpdate=!0)},tt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,et);else{const bt=n.RGBA,nt=n.RGBA,kt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,bt,nt,kt,et)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(Bt&&Yt){const tt=pe(Ft[0]);e.texStorage2D(n.TEXTURE_2D,mt,vt,tt.width,tt.height)}for(let tt=0,gt=Ft.length;tt<gt;tt++)pt=Ft[tt],Bt?k&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt,Ut,pt):e.texImage2D(n.TEXTURE_2D,tt,vt,dt,Ut,pt);E.generateMipmaps=!1}else if(Bt){if(Yt){const tt=pe(et);e.texStorage2D(n.TEXTURE_2D,mt,vt,tt.width,tt.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Ut,et)}else e.texImage2D(n.TEXTURE_2D,0,vt,dt,Ut,et);m(E)&&M(q),ht.__version=at.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function Pt(I,E,z){if(E.image.length!==6)return;const q=zt(I,E),Z=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+z);const at=i.get(Z);if(Z.version!==at.__version||q===!0){e.activeTexture(n.TEXTURE0+z);const ht=ne.getPrimaries(ne.workingColorSpace),J=E.colorSpace===qi?null:ne.getPrimaries(E.colorSpace),et=E.colorSpace===qi||ht===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const dt=E.isCompressedTexture||E.image[0].isCompressedTexture,Ut=E.image[0]&&E.image[0].isDataTexture,vt=[];for(let nt=0;nt<6;nt++)!dt&&!Ut?vt[nt]=g(E.image[nt],!0,s.maxCubemapSize):vt[nt]=Ut?E.image[nt].image:E.image[nt],vt[nt]=tn(E,vt[nt]);const pt=vt[0],Ft=r.convert(E.format,E.colorSpace),Bt=r.convert(E.type),Yt=v(E.internalFormat,Ft,Bt,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,mt=at.__version===void 0||q===!0,tt=Z.dataReady;let gt=y(E,pt);Nt(n.TEXTURE_CUBE_MAP,E);let bt;if(dt){k&&mt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Yt,pt.width,pt.height);for(let nt=0;nt<6;nt++){bt=vt[nt].mipmaps;for(let kt=0;kt<bt.length;kt++){const Lt=bt[kt];E.format!==An?Ft!==null?k?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,0,0,Lt.width,Lt.height,Ft,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,Yt,Lt.width,Lt.height,0,Lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,0,0,Lt.width,Lt.height,Ft,Bt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt,Yt,Lt.width,Lt.height,0,Ft,Bt,Lt.data)}}}else{if(bt=E.mipmaps,k&&mt){bt.length>0&&gt++;const nt=pe(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Yt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Ut){k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,vt[nt].width,vt[nt].height,Ft,Bt,vt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,vt[nt].width,vt[nt].height,0,Ft,Bt,vt[nt].data);for(let kt=0;kt<bt.length;kt++){const be=bt[kt].image[nt].image;k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,0,0,be.width,be.height,Ft,Bt,be.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,Yt,be.width,be.height,0,Ft,Bt,be.data)}}else{k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Ft,Bt,vt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,Ft,Bt,vt[nt]);for(let kt=0;kt<bt.length;kt++){const Lt=bt[kt];k?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,0,0,Ft,Bt,Lt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,kt+1,Yt,Ft,Bt,Lt.image[nt])}}}m(E)&&M(n.TEXTURE_CUBE_MAP),at.__version=Z.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function it(I,E,z,q,Z,at){const ht=r.convert(z.format,z.colorSpace),J=r.convert(z.type),et=v(z.internalFormat,ht,J,z.normalized,z.colorSpace),dt=i.get(E),Ut=i.get(z);if(Ut.__renderTarget=E,!dt.__hasExternalTextures){const vt=Math.max(1,E.width>>at),pt=Math.max(1,E.height>>at);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,at,et,vt,pt,E.depth,0,ht,J,null):e.texImage2D(Z,at,et,vt,pt,0,ht,J,null)}e.bindFramebuffer(n.FRAMEBUFFER,I),Re(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,0,Te(E)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Wt(I,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,I),E.depthBuffer){const q=E.depthTexture,Z=q&&q.isDepthTexture?q.type:null,at=_(E.stencilBuffer,Z),ht=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Re(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),at,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),at,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,at,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,I)}else{const q=E.textures;for(let Z=0;Z<q.length;Z++){const at=q[Z],ht=r.convert(at.format,at.colorSpace),J=r.convert(at.type),et=v(at.internalFormat,ht,J,at.normalized,at.colorSpace);Re(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),et,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),et,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,et,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ae(I,E,z){const q=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,I),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(E.depthTexture);if(Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,E.depthTexture);const dt=r.convert(E.depthTexture.format),Ut=r.convert(E.depthTexture.type);let vt;E.depthTexture.format===Ri?vt=n.DEPTH_COMPONENT24:E.depthTexture.format===cs&&(vt=n.DEPTH24_STENCIL8);for(let pt=0;pt<6;pt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,vt,E.width,E.height,0,dt,Ut,null)}}else j(E.depthTexture,0);const at=Z.__webglTexture,ht=Te(E),J=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,et=E.depthTexture.format===cs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ri)Re(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,J,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,J,at,0);else if(E.depthTexture.format===cs)Re(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,J,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,J,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(I){const E=i.get(I),z=I.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==I.depthTexture){const q=I.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),q){const Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=q}if(I.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)Ae(E.__webglFramebuffer[q],I,q);else{const q=I.texture.mipmaps;q&&q.length>0?Ae(E.__webglFramebuffer[0],I,0):Ae(E.__webglFramebuffer,I,0)}else if(z){E.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[q]),E.__webglDepthbuffer[q]===void 0)E.__webglDepthbuffer[q]=n.createRenderbuffer(),Wt(E.__webglDepthbuffer[q],I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}else{const q=I.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Wt(E.__webglDepthbuffer,I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(I,E,z){const q=i.get(I);E!==void 0&&it(q.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&st(I)}function le(I){const E=I.texture,z=i.get(I),q=i.get(E);I.addEventListener("dispose",b);const Z=I.textures,at=I.isWebGLCubeRenderTarget===!0,ht=Z.length>1;if(ht||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=E.version,o.memory.textures++),at){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let et=0;et<E.mipmaps.length;et++)z.__webglFramebuffer[J][et]=n.createFramebuffer()}else z.__webglFramebuffer[J]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<E.mipmaps.length;J++)z.__webglFramebuffer[J]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ht)for(let J=0,et=Z.length;J<et;J++){const dt=i.get(Z[J]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&Re(I)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const et=Z[J];z.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[J]);const dt=r.convert(et.format,et.colorSpace),Ut=r.convert(et.type),vt=v(et.internalFormat,dt,Ut,et.normalized,et.colorSpace,I.isXRRenderTarget===!0),pt=Te(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,vt,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,z.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Wt(z.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,E);for(let J=0;J<6;J++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(z.__webglFramebuffer[J][et],I,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,et);else it(z.__webglFramebuffer[J],I,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(E)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let J=0,et=Z.length;J<et;J++){const dt=Z[J],Ut=i.get(dt);let vt=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(vt=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(vt,Ut.__webglTexture),Nt(vt,dt),it(z.__webglFramebuffer,I,dt,n.COLOR_ATTACHMENT0+J,vt,0),m(dt)&&M(vt)}e.unbindTexture()}else{let J=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(J=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(J,q.__webglTexture),Nt(J,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(z.__webglFramebuffer[et],I,E,n.COLOR_ATTACHMENT0,J,et);else it(z.__webglFramebuffer,I,E,n.COLOR_ATTACHMENT0,J,0);m(E)&&M(J),e.unbindTexture()}I.depthBuffer&&st(I)}function ee(I){const E=I.textures;for(let z=0,q=E.length;z<q;z++){const Z=E[z];if(m(Z)){const at=S(I),ht=i.get(Z).__webglTexture;e.bindTexture(at,ht),M(at),e.unbindTexture()}}}const Me=[],Ie=[];function Ke(I){if(I.samples>0){if(Re(I)===!1){const E=I.textures,z=I.width,q=I.height;let Z=n.COLOR_BUFFER_BIT;const at=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(I),J=E.length>1;if(J)for(let dt=0;dt<E.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const et=I.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let dt=0;dt<E.length;dt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);const Ut=i.get(E[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ut,0)}n.blitFramebuffer(0,0,z,q,0,0,z,q,Z,n.NEAREST),c===!0&&(Me.length=0,Ie.length=0,Me.push(n.COLOR_ATTACHMENT0+dt),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Me.push(at),Ie.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ie)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let dt=0;dt<E.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,ht.__webglColorRenderbuffer[dt]);const Ut=i.get(E[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){const E=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Te(I){return Math.min(s.maxSamples,I.samples)}function Re(I){const E=i.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function F(I){const E=o.render.frame;u.get(I)!==E&&(u.set(I,E),I.update())}function tn(I,E){const z=I.colorSpace,q=I.format,Z=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==yn&&z!==qi&&(ne.getTransfer(z)===fe?(q!==An||Z!==Mn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",z)),E}function pe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=D,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=O,this.setTexture3D=$,this.setTextureCube=Q,this.rebindTextures=Gt,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=it,this.useMultisampledRTT=Re,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function gT(n,t){function e(i,s=qi){let r;const o=ne.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===gh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===t0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===e0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qm)return n.BYTE;if(i===jm)return n.SHORT;if(i===eo)return n.UNSIGNED_SHORT;if(i===mh)return n.INT;if(i===oi)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===dn)return n.HALF_FLOAT;if(i===n0)return n.ALPHA;if(i===i0)return n.RGB;if(i===An)return n.RGBA;if(i===Ri)return n.DEPTH_COMPONENT;if(i===cs)return n.DEPTH_STENCIL;if(i===xh)return n.RED;if(i===_h)return n.RED_INTEGER;if(i===ps)return n.RG;if(i===Mh)return n.RG_INTEGER;if(i===yh)return n.RGBA_INTEGER;if(i===Ea||i===Aa||i===Ra||i===Ca)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ou||i===au||i===cu||i===lu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ou)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===au)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===cu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===lu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===uu||i===hu||i===fu||i===du||i===pu||i===Xa||i===mu)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===uu||i===hu)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===fu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===du)return r.COMPRESSED_R11_EAC;if(i===pu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Xa)return r.COMPRESSED_RG11_EAC;if(i===mu)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===gu||i===vu||i===xu||i===_u||i===Mu||i===yu||i===bu||i===Su||i===wu||i===Tu||i===Eu||i===Au||i===Ru||i===Cu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===gu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===vu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_u)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Su)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Eu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Au)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ru)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pu||i===Lu||i===Nu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pu)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Iu||i===Du||i===qa||i===Uu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Iu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Du)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Uu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===no?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const vT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xT=`
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

}`;class _T{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new v0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new re({vertexShader:vT,fragmentShader:xT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class MT extends gs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,p=null;const x=typeof XRWebGLBinding<"u",g=new _T,m={},M=e.getContextAttributes();let S=null,v=null;const _=[],y=[],w=new ot;let b=null,T=null;const A=new ln;A.viewport=new de;const C=new ln;C.viewport=new de;const L=[A,C],D=new vy;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=_[X];return Y===void 0&&(Y=new Gc,_[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=_[X];return Y===void 0&&(Y=new Gc,_[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=_[X];return Y===void 0&&(Y=new Gc,_[X]=Y),Y.getHandSpace()};function H(X){const Y=y.indexOf(X.inputSource);if(Y===-1)return;const yt=_[Y];yt!==void 0&&(yt.update(X.inputSource,X.frame,l||o),yt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let X=0;X<_.length;X++){const Y=y[X];Y!==null&&(y[X]=null,_[X].disconnect(Y))}N=null,B=null,g.reset();for(const X in m)delete m[X];if(t.setRenderTarget(S),d=null,h=null,f=null,s=null,v=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),T!==null){const X=T.camera;X.fov=T.fov,X.zoom=T.zoom,X.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Pt=null,it=null;M.depth&&(it=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=M.stencil?cs:Ri,Pt=M.stencil?no:oi);const Wt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Wt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new un(h.textureWidth,h.textureHeight,{format:An,type:Mn,depthTexture:new ao(h.textureWidth,h.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const yt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new un(d.framebufferWidth,d.framebufferHeight,{format:An,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(X){for(let Y=0;Y<X.removed.length;Y++){const yt=X.removed[Y],Pt=y.indexOf(yt);Pt>=0&&(y[Pt]=null,_[Pt].disconnect(yt))}for(let Y=0;Y<X.added.length;Y++){const yt=X.added[Y];let Pt=y.indexOf(yt);if(Pt===-1){for(let Wt=0;Wt<_.length;Wt++)if(Wt>=y.length){y.push(yt),Pt=Wt;break}else if(y[Wt]===null){y[Wt]=yt,Pt=Wt;break}if(Pt===-1)break}const it=_[Pt];it&&it.connect(yt)}}const O=new P,$=new P;function Q(X,Y,yt){O.setFromMatrixPosition(Y.matrixWorld),$.setFromMatrixPosition(yt.matrixWorld);const Pt=O.distanceTo($),it=Y.projectionMatrix.elements,Wt=yt.projectionMatrix.elements,Ae=it[14]/(it[10]-1),st=it[14]/(it[10]+1),Gt=(it[9]+1)/it[5],le=(it[9]-1)/it[5],ee=(it[8]-1)/it[0],Me=(Wt[8]+1)/Wt[0],Ie=Ae*ee,Ke=Ae*Me,Te=Pt/(-ee+Me),Re=Te*-ee;if(Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Re),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),it[10]===-1)X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const F=Ae+Te,tn=st+Te,pe=Ie-Re,I=Ke+(Pt-Re),E=Gt*st/tn*F,z=le*st/tn*F;X.projectionMatrix.makePerspective(pe,I,E,z,F,tn),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function _t(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Y=X.near,yt=X.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),D.near=C.near=A.near=Y,D.far=C.far=A.far=yt,(N!==D.near||B!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),N=D.near,B=D.far),D.layers.mask=X.layers.mask|6,A.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const Pt=X.parent,it=D.cameras;_t(D,Pt);for(let Wt=0;Wt<it.length;Wt++)_t(it[Wt],Pt);it.length===2?Q(D,A,C):D.projectionMatrix.copy(A.projectionMatrix),T===null&&X.isPerspectiveCamera&&(T={camera:X,fov:X.fov,zoom:X.zoom}),ft(X,D,Pt)};function ft(X,Y,yt){yt===null?X.matrix.copy(Y.matrixWorld):(X.matrix.copy(yt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Y.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Qs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(X){return m[X]};let St=null;function Nt(X,Y){if(u=Y.getViewerPose(l||o),p=Y,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Pt=!1;yt.length!==D.cameras.length&&(D.cameras.length=0,Pt=!0);for(let st=0;st<yt.length;st++){const Gt=yt[st];let le=null;if(d!==null)le=d.getViewport(Gt);else{const Me=f.getViewSubImage(h,Gt);le=Me.viewport,st===0&&(t.setRenderTargetTextures(v,Me.colorTexture,Me.depthStencilTexture),t.setRenderTarget(v))}let ee=L[st];ee===void 0&&(ee=new ln,ee.layers.enable(st),ee.viewport=new de,L[st]=ee),ee.matrix.fromArray(Gt.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Gt.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(le.x,le.y,le.width,le.height),st===0&&(D.matrix.copy(ee.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Pt===!0&&D.cameras.push(ee)}const it=s.enabledFeatures;if(it&&it.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const st=f.getDepthInformation(yt[0]);st&&st.isValid&&st.texture&&g.init(st,s.renderState)}if(it&&it.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let st=0;st<yt.length;st++){const Gt=yt[st].camera;if(Gt){let le=m[Gt];le||(le=new v0,m[Gt]=le);const ee=f.getCameraImage(Gt);le.sourceTexture=ee}}}}for(let yt=0;yt<_.length;yt++){const Pt=y[yt],it=_[yt];Pt!==null&&it!==void 0&&it.update(Pt,Y,l||o)}St&&St(X,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),p=null}const zt=new F0;zt.setAnimationLoop(Nt),this.setAnimationLoop=function(X){St=X},this.dispose=function(){}}}const yT=new Ot,V0=new $t;V0.set(-1,0,0,0,1,0,0,0,1);function bT(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,R0(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,S,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&d(g,m,v)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,M,S):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Qe&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Qe&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=t.get(m),S=M.envMap,v=M.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(yT.makeRotationFromEuler(v)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(V0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=S*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qe&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const M=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ST(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,_){const y=_.program;i.uniformBlockBinding(v,y)}function l(v,_){let y=s[v.id];y===void 0&&(g(v),y=u(v),s[v.id]=y,v.addEventListener("dispose",M));const w=_.program;i.updateUBOMapping(v,w);const b=t.render.frame;r[v.id]!==b&&(h(v),r[v.id]=b)}function u(v){const _=f();v.__bindingPointIndex=_;const y=n.createBuffer(),w=v.__size,b=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,w,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,y),y}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const _=s[v.id],y=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let b=0,T=y.length;b<T;b++){const A=y[b];if(Array.isArray(A))for(let C=0,L=A.length;C<L;C++)d(A[C],b,C,w);else d(A,b,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,_,y,w){if(x(v,_,y,w)===!0){const b=v.__offset,T=v.value;if(Array.isArray(T)){let A=0;for(let C=0;C<T.length;C++){const L=T[C],D=m(L);p(L,v.__data,A),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(A+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,v.__data)}}function p(v,_,y){typeof v=="number"||typeof v=="boolean"?_[0]=v:v.isMatrix3?(_[0]=v.elements[0],_[1]=v.elements[1],_[2]=v.elements[2],_[3]=0,_[4]=v.elements[3],_[5]=v.elements[4],_[6]=v.elements[5],_[7]=0,_[8]=v.elements[6],_[9]=v.elements[7],_[10]=v.elements[8],_[11]=0):ArrayBuffer.isView(v)?_.set(new v.constructor(v.buffer,v.byteOffset,_.length)):v.toArray(_,y)}function x(v,_,y,w){const b=v.value,T=_+"_"+y;if(w[T]===void 0)return typeof b=="number"||typeof b=="boolean"?w[T]=b:ArrayBuffer.isView(b)?w[T]=b.slice():w[T]=b.clone(),!0;{const A=w[T];if(typeof b=="number"||typeof b=="boolean"){if(A!==b)return w[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(A.equals(b)===!1)return A.copy(b),!0}}return!1}function g(v){const _=v.uniforms;let y=0;const w=16;for(let T=0,A=_.length;T<A;T++){const C=Array.isArray(_[T])?_[T]:[_[T]];for(let L=0,D=C.length;L<D;L++){const N=C[L],B=Array.isArray(N.value)?N.value:[N.value];for(let H=0,W=B.length;H<W;H++){const j=B[H],O=m(j),$=y%w,Q=$%O.boundary,_t=$+Q;y+=Q,_t!==0&&w-_t<O.storage&&(y+=w-_t),N.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=O.storage}}}const b=y%w;return b>0&&(y+=w-b),v.__size=y,v.__cache={},this}function m(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(_.boundary=16,_.storage=v.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",v),_}function M(v){const _=v.target;_.removeEventListener("dispose",M);const y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function S(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:S}}const wT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zn=null;function TT(){return Zn===null&&(Zn=new Rh(wT,16,16,ps,dn),Zn.name="DFG_LUT",Zn.minFilter=We,Zn.magFilter=We,Zn.wrapS=ti,Zn.wrapT=ti,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}class ET{constructor(t={}){const{canvas:e=v_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Mn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const x=d,g=new Set([yh,Mh,_h]),m=new Set([Mn,oi,eo,no,gh,vh]),M=new Uint32Array(4),S=new Int32Array(4),v=new P;let _=null,y=null;const w=[],b=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let C=!1,L=null,D=null,N=null,B=null;this._outputColorSpace=He;let H=0,W=0,j=null,O=-1,$=null;const Q=new de,_t=new de;let ft=null;const St=new ct(0);let Nt=0,zt=e.width,X=e.height,Y=1,yt=null,Pt=null;const it=new de(0,0,zt,X),Wt=new de(0,0,zt,X);let Ae=!1;const st=new hc;let Gt=!1,le=!1;const ee=new Ot,Me=new P,Ie=new de,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function Re(){return j===null?Y:1}let F=i;function tn(R,U){return e.getContext(R,U)}let pe,I,E,z,q,Z,at,ht,J,et,dt,Ut,vt,pt,Ft,Bt,Yt,k,mt,tt,gt,bt,nt;try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ah}`),e.addEventListener("webglcontextlost",be,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",Pn,!1),F===null){const U="webgl2";if(F=tn(U,R),F===null)throw tn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(R){throw e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Pn,!1),Vt("WebGLRenderer: "+R.message),R}function kt(){pe=new TS(F),pe.init(),gt=new gT(F,pe),I=new mS(F,pe,t,gt),E=new pT(F,pe),I.reversedDepthBuffer&&h&&E.buffers.depth.setReversed(!0),D=F.createFramebuffer(),N=F.createFramebuffer(),B=F.createFramebuffer(),z=new RS(F),q=new tT,Z=new mT(F,pe,E,q,I,gt,z),at=new wS(A),ht=new Py(F),bt=new dS(F,ht),J=new ES(F,ht,z,bt),et=new PS(F,J,ht,bt,z),k=new CS(F,I,Z),Ft=new gS(q),dt=new jw(A,at,pe,I,bt,Ft),Ut=new bT(A,q),vt=new nT,pt=new cT(pe),Yt=new fS(A,at,E,et,p,c),Bt=new dT(A,et,I),nt=new ST(F,z,I,E),mt=new pS(F,pe,z),tt=new AS(F,pe,z),z.programs=dt.programs,A.capabilities=I,A.extensions=pe,A.properties=q,A.renderLists=vt,A.shadowMap=Bt,A.state=E,A.info=z}x!==Mn&&(T=new NS(x,e.width,e.height,a,s,r));const Lt=new MT(A,F);this.xr=Lt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=pe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=pe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(zt,X,!1))},this.getSize=function(R){return R.set(zt,X)},this.setSize=function(R,U,K=!0){if(Lt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=R,X=U,e.width=Math.floor(R*Y),e.height=Math.floor(U*Y),K===!0&&(e.style.width=R+"px",e.style.height=U+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,R,U)},this.getDrawingBufferSize=function(R){return R.set(zt*Y,X*Y).floor()},this.setDrawingBufferSize=function(R,U,K){zt=R,X=U,Y=K,e.width=Math.floor(R*K),e.height=Math.floor(U*K),this.setViewport(0,0,R,U)},this.setEffects=function(R){if(x===Mn){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let U=0;U<R.length;U++)if(R[U].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(Q)},this.getViewport=function(R){return R.copy(it)},this.setViewport=function(R,U,K,G){R.isVector4?it.set(R.x,R.y,R.z,R.w):it.set(R,U,K,G),E.viewport(Q.copy(it).multiplyScalar(Y).round())},this.getScissor=function(R){return R.copy(Wt)},this.setScissor=function(R,U,K,G){R.isVector4?Wt.set(R.x,R.y,R.z,R.w):Wt.set(R,U,K,G),E.scissor(_t.copy(Wt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(R){E.setScissorTest(Ae=R)},this.setOpaqueSort=function(R){yt=R},this.setTransparentSort=function(R){Pt=R},this.getClearColor=function(R){return R.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(R=!0,U=!0,K=!0){let G=0;if(R){let V=!1;if(j!==null){const Mt=j.texture.format;V=g.has(Mt)}if(V){const Mt=j.texture.type,Et=m.has(Mt),xt=Yt.getClearColor(),Rt=Yt.getClearAlpha(),It=xt.r,Jt=xt.g,se=xt.b;Et?(M[0]=It,M[1]=Jt,M[2]=se,M[3]=Rt,F.clearBufferuiv(F.COLOR,0,M)):(S[0]=It,S[1]=Jt,S[2]=se,S[3]=Rt,F.clearBufferiv(F.COLOR,0,S))}else G|=F.COLOR_BUFFER_BIT}U&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),L=R},this.dispose=function(){e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Pn,!1),Yt.dispose(),vt.dispose(),pt.dispose(),q.dispose(),at.dispose(),et.dispose(),bt.dispose(),nt.dispose(),dt.dispose(),Lt.dispose(),Lt.removeEventListener("sessionstart",sf),Lt.removeEventListener("sessionend",rf),Zi.stop()};function be(R){R.preventDefault(),Ya("WebGLRenderer: Context Lost."),C=!0}function ue(){Ya("WebGLRenderer: Context Restored."),C=!1;const R=z.autoReset,U=Bt.enabled,K=Bt.autoUpdate,G=Bt.needsUpdate,V=Bt.type;kt(),z.autoReset=R,Bt.enabled=U,Bt.autoUpdate=K,Bt.needsUpdate=G,Bt.type=V}function Pn(R){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $n(R){const U=R.target;U.removeEventListener("dispose",$n),Wg(U)}function Wg(R){Xg(R),q.remove(R)}function Xg(R){const U=q.get(R).programs;U!==void 0&&(U.forEach(function(K){dt.releaseProgram(K)}),R.isShaderMaterial&&dt.releaseShaderCache(R))}this.renderBufferDirect=function(R,U,K,G,V,Mt){U===null&&(U=Ke);const Et=V.isMesh&&V.matrixWorld.determinantAffine()<0,xt=Kg(R,U,K,G,V);E.setMaterial(G,Et);let Rt=K.index,It=1;if(G.wireframe===!0){if(Rt=J.getWireframeAttribute(K),Rt===void 0)return;It=2}const Jt=K.drawRange,se=K.attributes.position;let Ct=Jt.start*It,he=(Jt.start+Jt.count)*It;Mt!==null&&(Ct=Math.max(Ct,Mt.start*It),he=Math.min(he,(Mt.start+Mt.count)*It)),Rt!==null?(Ct=Math.max(Ct,0),he=Math.min(he,Rt.count)):se!=null&&(Ct=Math.max(Ct,0),he=Math.min(he,se.count));const ke=he-Ct;if(ke<0||ke===1/0)return;bt.setup(V,G,xt,K,Rt);let Ee,ye=mt;if(Rt!==null&&(Ee=ht.get(Rt),ye=tt,ye.setIndex(Ee)),V.isMesh)G.wireframe===!0?(E.setLineWidth(G.wireframeLinewidth*Re()),ye.setMode(F.LINES)):ye.setMode(F.TRIANGLES);else if(V.isLine){let en=G.linewidth;en===void 0&&(en=1),E.setLineWidth(en*Re()),V.isLineSegments?ye.setMode(F.LINES):V.isLineLoop?ye.setMode(F.LINE_LOOP):ye.setMode(F.LINE_STRIP)}else V.isPoints?ye.setMode(F.POINTS):V.isSprite&&ye.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(pe.get("WEBGL_multi_draw"))ye.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const en=V._multiDrawStarts,Tt=V._multiDrawCounts,on=V._multiDrawCount,oe=Rt?ht.get(Rt).bytesPerElement:1,bn=q.get(G).currentProgram.getUniforms();for(let Kn=0;Kn<on;Kn++)bn.setValue(F,"_gl_DrawID",Kn),ye.render(en[Kn]/oe,Tt[Kn])}else if(V.isInstancedMesh)ye.renderInstances(Ct,ke,V.count);else if(K.isInstancedBufferGeometry){const en=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Tt=Math.min(K.instanceCount,en);ye.renderInstances(Ct,ke,Tt)}else ye.render(Ct,ke)};function nf(R,U,K,G){L!==null&&R.isNodeMaterial&&L.setObject(G,R),Gt===!0&&Ft.setState(R,K,!1),R.transparent===!0&&R.side===we&&R.forceSinglePass===!1?(R.side=Qe,R.needsUpdate=!0,Ao(R,U,G),R.side=Ai,R.needsUpdate=!0,Ao(R,U,G),R.side=we):Ao(R,U,G)}this.compile=function(R,U,K=null){K===null&&(K=R),L!==null&&L.renderStart(R,U,K),y=pt.get(K),y.init(U),b.push(y),K.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(y.pushLight(V),V.castShadow&&y.pushShadow(V))}),R!==K&&R.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(y.pushLight(V),V.castShadow&&y.pushShadow(V))}),y.setupLights(),L!==null&&L.updateLights(y.state.lightsArray),le=this.localClippingEnabled,Gt=Ft.init(this.clippingPlanes,le),Gt===!0&&Ft.setGlobalState(this.clippingPlanes,U),L!==null&&Bt.render(y.state.shadowsArray,K,U);const G=new Set;return R.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const Mt=V.material;if(Mt)if(Array.isArray(Mt))for(let Et=0;Et<Mt.length;Et++){const xt=Mt[Et];nf(xt,K,U,V),G.add(xt)}else nf(Mt,K,U,V),G.add(Mt)}),y=b.pop(),L!==null&&L.renderEnd(),G},this.compileAsync=function(R,U,K=null){const G=this.compile(R,U,K);return new Promise(V=>{function Mt(){if(G.forEach(function(Et){const Rt=q.get(Et).currentProgram;(Rt===void 0||Rt.isReady())&&G.delete(Et)}),G.size===0){V(R);return}setTimeout(Mt,10)}pe.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let bc=null;function qg(R){bc&&bc(R)}function sf(){Zi.stop()}function rf(){Zi.start()}const Zi=new F0;Zi.setAnimationLoop(qg),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(R){bc=R,Lt.setAnimationLoop(R),R===null?Zi.stop():Zi.start()},Lt.addEventListener("sessionstart",sf),Lt.addEventListener("sessionend",rf),this.render=function(R,U){if(U!==void 0&&U.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(R,U);const K=Lt.enabled===!0&&Lt.isPresenting===!0,G=T!==null&&(j===null||K)&&T.begin(A,j);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Lt.enabled===!0&&Lt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Lt.cameraAutoUpdate===!0&&Lt.updateCamera(U),U=Lt.getCamera()),R.isScene===!0&&R.onBeforeRender(A,R,U,j),y=pt.get(R,b.length),y.init(U),y.state.textureUnits=Z.getTextureUnits(),b.push(y),ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),st.setFromProjectionMatrix(ee,ei,U.reversedDepth),le=this.localClippingEnabled,Gt=Ft.init(this.clippingPlanes,le),_=vt.get(R,w.length),_.init(),w.push(_),Lt.enabled===!0&&Lt.isPresenting===!0){const Et=A.xr.getDepthSensingMesh();Et!==null&&Sc(Et,U,-1/0,A.sortObjects)}Sc(R,U,0,A.sortObjects),_.finish(),L!==null&&L.updateLights(y.state.lightsArray),A.sortObjects===!0&&_.sort(yt,Pt),Te=Lt.enabled===!1||Lt.isPresenting===!1||Lt.hasDepthSensing()===!1,Te&&Yt.addToRenderList(_,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Gt===!0&&Ft.beginShadows();const V=y.state.shadowsArray;if(Bt.render(V,R,U),Gt===!0&&Ft.endShadows(),(G&&T.hasRenderPass())===!1){const Et=_.opaque,xt=_.transmissive;if(y.setupLights(),U.isArrayCamera){const Rt=U.cameras;if(xt.length>0)for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It];af(Et,xt,R,se)}Te&&Yt.render(R);for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It];of(_,R,se,se.viewport)}}else xt.length>0&&af(Et,xt,R,U),Te&&Yt.render(R),of(_,R,U)}j!==null&&W===0&&(Z.updateMultisampleRenderTarget(j),Z.updateRenderTargetMipmap(j)),G&&T.end(A),R.isScene===!0&&R.onAfterRender(A,R,U),bt.resetDefaultState(),O=-1,$=null,b.pop(),b.length>0?(y=b[b.length-1],Z.setTextureUnits(y.state.textureUnits),Gt===!0&&Ft.setGlobalState(A.clippingPlanes,y.state.camera)):y=null,w.pop(),w.length>0?_=w[w.length-1]:_=null,L!==null&&L.renderEnd()};function Sc(R,U,K,G){if(R.visible===!1)return;if(R.layers.test(U.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(U);else if(R.isLightProbeGrid)y.pushLightProbeGrid(R);else if(R.isLight)y.pushLight(R),R.castShadow&&y.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(st)){G&&Ie.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ee);const Et=et.update(R),xt=R.material;xt.visible&&_.push(R,Et,xt,K,Ie.z,null,U)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(st))){const Et=et.update(R),xt=R.material;if(G&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ie.copy(R.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Ie.copy(Et.boundingSphere.center)),Ie.applyMatrix4(R.matrixWorld).applyMatrix4(ee)),Array.isArray(xt)){const Rt=Et.groups;for(let It=0,Jt=Rt.length;It<Jt;It++){const se=Rt[It],Ct=xt[se.materialIndex];Ct&&Ct.visible&&_.push(R,Et,Ct,K,Ie.z,se,U)}}else xt.visible&&_.push(R,Et,xt,K,Ie.z,null,U)}}const Mt=R.children;for(let Et=0,xt=Mt.length;Et<xt;Et++)Sc(Mt[Et],U,K,G)}function of(R,U,K,G){const{opaque:V,transmissive:Mt,transparent:Et}=R;y.setupLightsView(K),Gt===!0&&Ft.setGlobalState(A.clippingPlanes,K),G&&E.viewport(Q.copy(G)),V.length>0&&Eo(V,U,K),Mt.length>0&&Eo(Mt,U,K),Et.length>0&&Eo(Et,U,K),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function af(R,U,K,G){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[G.id]===void 0){const Ct=pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[G.id]=new un(1,1,{generateMipmaps:!0,type:Ct?dn:Mn,minFilter:yi,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}const Mt=y.state.transmissionRenderTarget[G.id],Et=G.viewport||Q;Mt.setSize(Et.z*A.transmissionResolutionScale,Et.w*A.transmissionResolutionScale);const xt=A.getRenderTarget(),Rt=A.getActiveCubeFace(),It=A.getActiveMipmapLevel();A.setRenderTarget(Mt),A.getClearColor(St),Nt=A.getClearAlpha(),Nt<1&&A.setClearColor(16777215,.5),A.clear(),Te&&Yt.render(K);const Jt=A.toneMapping;A.toneMapping=si;const se=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),y.setupLightsView(G),Gt===!0&&Ft.setGlobalState(A.clippingPlanes,G),Eo(R,K,G),Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt),pe.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let he=0,ke=U.length;he<ke;he++){const Ee=U[he],{object:ye,geometry:en,material:Tt,group:on}=Ee;if(Tt.side===we&&ye.layers.test(G.layers)){const oe=Tt.side;Tt.side=Qe,Tt.needsUpdate=!0,cf(ye,K,G,en,Tt,on),Tt.side=oe,Tt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt))}A.setRenderTarget(xt,Rt,It),A.setClearColor(St,Nt),se!==void 0&&(G.viewport=se),A.toneMapping=Jt}function Eo(R,U,K){const G=U.isScene===!0?U.overrideMaterial:null;for(let V=0,Mt=R.length;V<Mt;V++){const Et=R[V],{object:xt,geometry:Rt,group:It}=Et;let Jt=Et.material;Jt.allowOverride===!0&&G!==null&&(Jt=G),xt.layers.test(K.layers)&&cf(xt,U,K,Rt,Jt,It)}}function cf(R,U,K,G,V,Mt){L!==null&&V.isNodeMaterial&&L.setObject(R,V),R.onBeforeRender(A,U,K,G,V,Mt),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),V.onBeforeRender(A,U,K,G,R,Mt),V.transparent===!0&&V.side===we&&V.forceSinglePass===!1?(V.side=Qe,V.needsUpdate=!0,A.renderBufferDirect(K,U,G,V,R,Mt),V.side=Ai,V.needsUpdate=!0,A.renderBufferDirect(K,U,G,V,R,Mt),V.side=we):A.renderBufferDirect(K,U,G,V,R,Mt),R.onAfterRender(A,U,K,G,V,Mt)}function Ao(R,U,K){U.isScene!==!0&&(U=Ke);const G=q.get(R),V=y.state.lights,Mt=y.state.shadowsArray,Et=V.state.version,xt=dt.getParameters(R,V.state,Mt,U,K,y.state.lightProbeGridArray),Rt=dt.getProgramCacheKey(xt);let It=G.programs;G.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const Jt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;G.envMap=at.get(R.envMap||G.environment,Jt),G.envMapRotation=G.environment!==null&&R.envMap===null?U.environmentRotation:R.envMapRotation,It===void 0&&(R.addEventListener("dispose",$n),It=new Map,G.programs=It);let se=It.get(Rt);if(se!==void 0){if(G.currentProgram===se&&G.lightsStateVersion===Et)return uf(R,xt),se}else xt.uniforms=dt.getUniforms(R),L!==null&&R.isNodeMaterial&&L.build(R,K,xt),R.onBeforeCompile(xt,A),se=dt.acquireProgram(xt,Rt),It.set(Rt,se),G.uniforms=xt.uniforms;const Ct=G.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ct.clippingPlanes=Ft.uniform),uf(R,xt),G.needsLights=Zg(R),G.lightsStateVersion=Et,G.needsLights&&(Ct.ambientLightColor.value=V.state.ambient,Ct.lightProbe.value=V.state.probe,Ct.sunLights.value=V.state.sun,Ct.sunLightShadows.value=V.state.sunShadow,Ct.directionalLights.value=V.state.directional,Ct.directionalLightShadows.value=V.state.directionalShadow,Ct.spotLights.value=V.state.spot,Ct.spotLightShadows.value=V.state.spotShadow,Ct.rectAreaLights.value=V.state.rectArea,Ct.ltc_1.value=V.state.rectAreaLTC1,Ct.ltc_2.value=V.state.rectAreaLTC2,Ct.pointLights.value=V.state.point,Ct.pointLightShadows.value=V.state.pointShadow,Ct.hemisphereLights.value=V.state.hemi,Ct.sunShadowMatrix.value=V.state.sunShadowMatrix,Ct.sunShadowCascade.value=V.state.sunShadowCascade,Ct.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ct.spotLightMatrix.value=V.state.spotLightMatrix,Ct.spotLightMap.value=V.state.spotLightMap,Ct.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=y.state.lightProbeGridArray.length>0,G.currentProgram=se,G.uniformsList=null,se}function lf(R){if(R.uniformsList===null){const U=R.currentProgram.getUniforms();R.uniformsList=La.seqWithValue(U.seq,R.uniforms)}return R.uniformsList}function uf(R,U){const K=q.get(R);K.outputColorSpace=U.outputColorSpace,K.batching=U.batching,K.batchingColor=U.batchingColor,K.instancing=U.instancing,K.instancingColor=U.instancingColor,K.instancingMorph=U.instancingMorph,K.skinning=U.skinning,K.morphTargets=U.morphTargets,K.morphNormals=U.morphNormals,K.morphColors=U.morphColors,K.morphTargetsCount=U.morphTargetsCount,K.numClippingPlanes=U.numClippingPlanes,K.numIntersection=U.numClipIntersection,K.vertexAlphas=U.vertexAlphas,K.vertexTangents=U.vertexTangents,K.toneMapping=U.toneMapping}function $g(R,U){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;v.setFromMatrixPosition(U.matrixWorld);for(let K=0,G=R.length;K<G;K++){const V=R[K];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function Kg(R,U,K,G,V){U.isScene!==!0&&(U=Ke),Z.resetTextureUnits();const Mt=U.fog,Et=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,xt=j===null?A.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ne.workingColorSpace,Rt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,It=at.get(G.envMap||Et,Rt),Jt=G.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,se=!!K.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!K.morphAttributes.position,he=!!K.morphAttributes.normal,ke=!!K.morphAttributes.color;let Ee=si;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ee=A.toneMapping);const ye=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,en=ye!==void 0?ye.length:0,Tt=q.get(G),on=y.state.lights;if(Gt===!0&&(le===!0||R!==$)){const Se=R===$&&G.id===O;Ft.setState(G,R,Se)}let oe=!1;G.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==on.state.version||Tt.outputColorSpace!==xt||V.isBatchedMesh&&Tt.batching===!1||!V.isBatchedMesh&&Tt.batching===!0||V.isBatchedMesh&&Tt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Tt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Tt.instancing===!1||!V.isInstancedMesh&&Tt.instancing===!0||V.isSkinnedMesh&&Tt.skinning===!1||!V.isSkinnedMesh&&Tt.skinning===!0||V.isInstancedMesh&&Tt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Tt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Tt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Tt.instancingMorph===!1&&V.morphTexture!==null||Tt.envMap!==It||G.fog===!0&&Tt.fog!==Mt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Ft.numPlanes||Tt.numIntersection!==Ft.numIntersection)||Tt.vertexAlphas!==Jt||Tt.vertexTangents!==se||Tt.morphTargets!==Ct||Tt.morphNormals!==he||Tt.morphColors!==ke||Tt.toneMapping!==Ee||Tt.morphTargetsCount!==en||!!Tt.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,Tt.__version=G.version);let bn=Tt.currentProgram;oe===!0&&(bn=Ao(G,U,V),L&&G.isNodeMaterial&&L.onUpdateProgram(G,bn,Tt));let Kn=!1,Li=!1,xs=!1;const _e=bn.getUniforms(),Ue=Tt.uniforms;if(E.useProgram(bn.program)&&(Kn=!0,Li=!0,xs=!0),G.id!==O&&(O=G.id,Li=!0),Tt.needsLights){const Se=$g(y.state.lightProbeGridArray,V);Tt.lightProbeGrid!==Se&&(Tt.lightProbeGrid=Se,Li=!0)}if(Kn||$!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),_e.setValue(F,"projectionMatrix",R.projectionMatrix),_e.setValue(F,"viewMatrix",R.matrixWorldInverse);const Ii=_e.map.cameraPosition;Ii!==void 0&&Ii.setValue(F,Me.setFromMatrixPosition(R.matrixWorld)),I.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_e.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),$!==R&&($=R,Li=!0,xs=!0)}if(Tt.needsLights&&(on.state.sunShadowMap.length>0&&_e.setValue(F,"sunShadowMap",on.state.sunShadowMap,Z),on.state.directionalShadowMap.length>0&&_e.setValue(F,"directionalShadowMap",on.state.directionalShadowMap,Z),on.state.spotShadowMap.length>0&&_e.setValue(F,"spotShadowMap",on.state.spotShadowMap,Z),on.state.pointShadowMap.length>0&&_e.setValue(F,"pointShadowMap",on.state.pointShadowMap,Z)),V.isSkinnedMesh){_e.setOptional(F,V,"bindMatrix"),_e.setOptional(F,V,"bindMatrixInverse");const Se=V.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),_e.setValue(F,"boneTexture",Se.boneTexture,Z))}V.isBatchedMesh&&(_e.setOptional(F,V,"batchingTexture"),_e.setValue(F,"batchingTexture",V._matricesTexture,Z),_e.setOptional(F,V,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",V._indirectTexture,Z),_e.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",V._colorsTexture,Z));const Ni=K.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&k.update(V,K,bn),(Li||Tt.receiveShadow!==V.receiveShadow)&&(Tt.receiveShadow=V.receiveShadow,_e.setValue(F,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Ue.envMapIntensity.value=U.environmentIntensity),Ue.dfgLUT!==void 0&&(Ue.dfgLUT.value=TT()),Li){if(_e.setValue(F,"toneMappingExposure",A.toneMappingExposure),Tt.needsLights&&Yg(Ue,xs),Mt&&G.fog===!0&&Ut.refreshFogUniforms(Ue,Mt),Ut.refreshMaterialUniforms(Ue,G,Y,X,y.state.transmissionRenderTarget[R.id]),Tt.needsLights&&Tt.lightProbeGrid){const Se=Tt.lightProbeGrid;Ue.probesSH.value=Se.texture,Ue.probesMin.value.copy(Se.boundingBox.min),Ue.probesMax.value.copy(Se.boundingBox.max),Ue.probesResolution.value.copy(Se.resolution)}La.upload(F,lf(Tt),Ue,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(La.upload(F,lf(Tt),Ue,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_e.setValue(F,"center",V.center),_e.setValue(F,"modelViewMatrix",V.modelViewMatrix),_e.setValue(F,"normalMatrix",V.normalMatrix),_e.setValue(F,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){const Se=G.uniformsGroups;for(let Ii=0,_s=Se.length;Ii<_s;Ii++){const ff=Se[Ii];nt.update(ff,bn),nt.bind(ff,bn)}}return bn}function Yg(R,U){R.ambientLightColor.needsUpdate=U,R.lightProbe.needsUpdate=U,R.sunLights.needsUpdate=U,R.sunLightShadows.needsUpdate=U,R.directionalLights.needsUpdate=U,R.directionalLightShadows.needsUpdate=U,R.pointLights.needsUpdate=U,R.pointLightShadows.needsUpdate=U,R.spotLights.needsUpdate=U,R.spotLightShadows.needsUpdate=U,R.rectAreaLights.needsUpdate=U,R.hemisphereLights.needsUpdate=U}function Zg(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(R,U,K){const G=q.get(R);G.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(R.texture).__webglTexture=U,q.get(R.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:K,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,U){const K=q.get(R);K.__webglFramebuffer=U,K.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(R,U=0,K=0){j=R,H=U,W=K;let G=null,V=!1,Mt=!1;if(R){const xt=q.get(R);if(xt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(F.FRAMEBUFFER,xt.__webglFramebuffer),Q.copy(R.viewport),_t.copy(R.scissor),ft=R.scissorTest,E.viewport(Q),E.scissor(_t),E.setScissorTest(ft),O=-1;return}else if(xt.__webglFramebuffer===void 0)Z.setupRenderTarget(R);else if(xt.__hasExternalTextures)Z.rebindTextures(R,q.get(R.texture).__webglTexture,q.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Jt=R.depthTexture;if(xt.__boundDepthTexture!==Jt){if(Jt!==null&&q.has(Jt)&&(R.width!==Jt.image.width||R.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(R)}}const Rt=R.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);const It=q.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(It[U])?G=It[U][K]:G=It[U],V=!0):R.samples>0&&Z.useMultisampledRTT(R)===!1?G=q.get(R).__webglMultisampledFramebuffer:Array.isArray(It)?G=It[K]:G=It,Q.copy(R.viewport),_t.copy(R.scissor),ft=R.scissorTest}else Q.copy(it).multiplyScalar(Y).floor(),_t.copy(Wt).multiplyScalar(Y).floor(),ft=Ae;if(K!==0&&(G=D),E.bindFramebuffer(F.FRAMEBUFFER,G)&&E.drawBuffers(R,G),E.viewport(Q),E.scissor(_t),E.setScissorTest(ft),V){const xt=q.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,xt.__webglTexture,K)}else if(Mt){const xt=U;for(let Rt=0;Rt<R.textures.length;Rt++){const It=q.get(R.textures[Rt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Rt,It.__webglTexture,K,xt)}}else if(R!==null&&K!==0){const xt=q.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,K)}O=-1};function hf(R){const U=q.get(R);return(U.__readFormat!==R.format||U.__readType!==R.type)&&(U.__readFormat=R.format,U.__readType=R.type,U.__formatReadable=I.textureFormatReadable(R.format),U.__typeReadable=I.textureTypeReadable(R.type)),U}this.readRenderTargetPixels=function(R,U,K,G,V,Mt,Et,xt=0){if(!(R&&R.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Et!==void 0&&(Rt=Rt[Et]),Rt){E.bindFramebuffer(F.FRAMEBUFFER,Rt);try{const It=R.textures[xt],Jt=It.format,se=It.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=hf(It);if(Ct.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=R.width-G&&K>=0&&K<=R.height-V&&F.readPixels(U,K,G,V,gt.convert(Jt),gt.convert(se),Mt)}finally{const It=j!==null?q.get(j).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(R,U,K,G,V,Mt,Et,xt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Et!==void 0&&(Rt=Rt[Et]),Rt)if(U>=0&&U<=R.width-G&&K>=0&&K<=R.height-V){E.bindFramebuffer(F.FRAMEBUFFER,Rt);const It=R.textures[xt],Jt=It.format,se=It.type;R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=hf(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const he=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.bufferData(F.PIXEL_PACK_BUFFER,Mt.byteLength,F.STREAM_READ),F.readPixels(U,K,G,V,gt.convert(Jt),gt.convert(se),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const ke=j!==null?q.get(j).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,ke);const Ee=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await x_(F,Ee,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,he),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Mt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(he),F.deleteSync(Ee),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,U=null,K=0){const G=Math.pow(2,-K),V=Math.floor(R.image.width*G),Mt=Math.floor(R.image.height*G),Et=U!==null?U.x:0,xt=U!==null?U.y:0;Z.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,Et,xt,V,Mt),E.unbindTexture()},this.copyTextureToTexture=function(R,U,K=null,G=null,V=0,Mt=0){let Et,xt,Rt,It,Jt,se,Ct,he,ke;const Ee=R.isCompressedTexture?R.mipmaps[Mt]:R.image;if(K!==null)Et=K.max.x-K.min.x,xt=K.max.y-K.min.y,Rt=K.isBox3?K.max.z-K.min.z:1,It=K.min.x,Jt=K.min.y,se=K.isBox3?K.min.z:0;else{const Ue=Math.pow(2,-V);Et=Math.floor(Ee.width*Ue),xt=Math.floor(Ee.height*Ue),R.isDataArrayTexture?Rt=Ee.depth:R.isData3DTexture?Rt=Math.floor(Ee.depth*Ue):Rt=1,It=0,Jt=0,se=0}G!==null?(Ct=G.x,he=G.y,ke=G.z):(Ct=0,he=0,ke=0);const ye=gt.convert(U.format),en=gt.convert(U.type);let Tt;U.isData3DTexture?(Z.setTexture3D(U,0),Tt=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),Tt=F.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),Tt=F.TEXTURE_2D),E.activeTexture(F.TEXTURE0),E.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),E.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),E.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const on=E.getParameter(F.UNPACK_ROW_LENGTH),oe=E.getParameter(F.UNPACK_IMAGE_HEIGHT),bn=E.getParameter(F.UNPACK_SKIP_PIXELS),Kn=E.getParameter(F.UNPACK_SKIP_ROWS),Li=E.getParameter(F.UNPACK_SKIP_IMAGES);E.pixelStorei(F.UNPACK_ROW_LENGTH,Ee.width),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ee.height),E.pixelStorei(F.UNPACK_SKIP_PIXELS,It),E.pixelStorei(F.UNPACK_SKIP_ROWS,Jt),E.pixelStorei(F.UNPACK_SKIP_IMAGES,se);const xs=R.isDataArrayTexture||R.isData3DTexture,_e=U.isDataArrayTexture||U.isData3DTexture;if(R.isDepthTexture){const Ue=q.get(R),Ni=q.get(U),Se=q.get(Ue.__renderTarget),Ii=q.get(Ni.__renderTarget);E.bindFramebuffer(F.READ_FRAMEBUFFER,Se.__webglFramebuffer),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let _s=0;_s<Rt;_s++)xs&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(R).__webglTexture,V,se+_s),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(U).__webglTexture,Mt,ke+_s)),F.blitFramebuffer(It,Jt,Et,xt,Ct,he,Et,xt,F.DEPTH_BUFFER_BIT,F.NEAREST);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||R.isRenderTargetTexture||q.has(R)){const Ue=q.get(R),Ni=q.get(U);E.bindFramebuffer(F.READ_FRAMEBUFFER,N),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Se=0;Se<Rt;Se++)xs?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.__webglTexture,V,se+Se):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ue.__webglTexture,V),_e?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ni.__webglTexture,Mt,ke+Se):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ni.__webglTexture,Mt),V!==0?F.blitFramebuffer(It,Jt,Et,xt,Ct,he,Et,xt,F.COLOR_BUFFER_BIT,F.NEAREST):_e?F.copyTexSubImage3D(Tt,Mt,Ct,he,ke+Se,It,Jt,Et,xt):F.copyTexSubImage2D(Tt,Mt,Ct,he,It,Jt,Et,xt);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else _e?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,en,Ee.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,Ee.data):F.texSubImage3D(Tt,Mt,Ct,he,ke,Et,xt,Rt,ye,en,Ee):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Et,xt,ye,en,Ee.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Ee.width,Ee.height,ye,Ee.data):F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,he,Et,xt,ye,en,Ee);E.pixelStorei(F.UNPACK_ROW_LENGTH,on),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,oe),E.pixelStorei(F.UNPACK_SKIP_PIXELS,bn),E.pixelStorei(F.UNPACK_SKIP_ROWS,Kn),E.pixelStorei(F.UNPACK_SKIP_IMAGES,Li),Mt===0&&U.generateMipmaps&&F.generateMipmap(Tt),E.unbindTexture()},this.initRenderTarget=function(R){q.get(R).__webglFramebuffer===void 0&&Z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Z.setTextureCube(R,0):R.isData3DTexture?Z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Z.setTexture2DArray(R,0):Z.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){H=0,W=0,j=null,E.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}function AT(n){if(n.name)return n.name;if(n.parent?.name)return n.parent.name;const t=n.geometry;return`${n.type}:${t.type}:${t.getAttribute("position")?.count??0}`}function RT(n,t,e=14){t.updateMatrixWorld();const i=new hc().setFromProjectionMatrix(new Ot().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse)),s=new Vn,r=new Map;n.traverseVisible(a=>{if(!(a instanceof Xt)&&!(a instanceof ja))return;const c=a.geometry;if(a.frustumCulled&&(c.boundingSphere||c.computeBoundingSphere(),s.copy(c.boundingSphere).applyMatrix4(a.matrixWorld),!(a instanceof Be)&&!i.intersectsSphere(s)))return;const l=a instanceof ja?0:(c.index?c.index.count:c.getAttribute("position")?.count??0)/3,u=a instanceof Be?a.count:1,f=AT(a),h=r.get(f)??{meshes:0,triangles:0};h.meshes+=1,h.triangles+=Math.round(l*u),r.set(f,h)});const o=[...r.entries()].map(([a,c])=>({source:a,...c})).sort((a,c)=>c.triangles-a.triangles);return{rows:o.slice(0,e),total:o.reduce((a,c)=>a+c.triangles,0)}}function CT(n,t,e){const i=async r=>{t.render();const o=await new Promise(c=>n.domElement.toBlob(c,"image/png"));if(!o)return"khong chup duoc";const a=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:o});return a.ok?`shots/${r}.png`:`loi ${a.status}`},s=r=>RT(e.scene,e.camera,r);window.__skyrun={...t,shot:i,diag:s}}const PT=5,LT=450;function NT(n,t){let e=0;return{spawn(i,s,r){const o=t();if(!o||e>=PT||!Number.isFinite(i)||!Number.isFinite(s)){r();return}const a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),l=a.left+a.width*.25-c.left,u=a.top+a.height*.5-c.top,f=document.createElement("div");f.className="collect-streak",f.style.left=`${i}px`,f.style.top=`${s}px`,n.appendChild(f),e++;const h=(i+l)/2-(l-i)*.15,d=Math.min(s,u)-60,p=f.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${h-i}px), calc(-50% + ${d-s}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-i}px), calc(-50% + ${u-s}px)) scale(0.55)`,opacity:.9}],{duration:LT,easing:"cubic-bezier(.5,0,.9,.6)"});p.onfinish=p.oncancel=()=>{f.remove(),e--,r()}}}}const IT=`
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
}`,DT=`
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
}`,Sr=1.1,UT=1.3,FT=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Na={request:0};function kT(n){const t=n?.041666666666666664:.025,e=Math.ceil(Sr/t)+2,i=[0,1].map(()=>Array.from({length:e},()=>({p:new P,t:-99,k:0,c:0}))),s=2*e*2,r=new Float32Array(s*3),o=new Float32Array(s*3),a=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),f=[];for(let C=0;C<2;C++)for(let L=0;L<e;L++){const D=(C*e+L)*2;l[D]=-1,l[D+1]=1,L<e-1&&f.push(D,D+1,D+2,D+1,D+3,D+2)}const h=new Kt,d={position:[r,3],aCol:[o,3],aAge:[a,1],aK:[c,1],aSide:[l,1],aAlong:[u,1]};for(const[C,[L,D]]of Object.entries(d))h.setAttribute(C,new wt(L,D));h.setIndex(f),h.setDrawRange(0,0);const p=["position","aCol","aAge","aK","aAlong"].map(C=>h.getAttribute(C)),x=new re({vertexShader:IT,fragmentShader:DT,uniforms:gn.merge([lt.fog]),transparent:!0,depthWrite:!1,side:we,fog:!0}),g=new Xt(h,x);g.frustumCulled=!1,g.renderOrder=3;const m=new P,M=new P,S=new P,v=new P,_=new P,y=new P;let w=0,b=-99,T=-99,A=!1;return{mesh:g,update(C,L,D,N,B){Na.request>0&&(w=Na.request,Na.request=0),N>0&&(w=Math.max(0,w-N));const H=C.mode==="run",W=H&&C.smokeT>0?Math.min(1,C.smokeT/UT):0,j=H&&w>0?.75*Math.min(1,w/.8):0,O=Math.max(W,j);if(O>0)D-T>Sr&&i.forEach((St,Nt)=>St.forEach(zt=>(zt.p.copy(L[Nt]),zt.t=-99,zt.k=0))),T=D;else if(D-T>Sr){A&&h.setDrawRange(0,0),A=!1;return}A=!0,h.setDrawRange(0,1/0);const $=hn(C.z);m.set(Math.sin($),wi(C.z),Math.cos($)).normalize(),M.set(Math.cos($),0,-Math.sin($));const Q=H?C.speed:0,_t=Math.sign((L[0].x-L[1].x)*M.x+(L[0].z-L[1].z)*M.z)||1,ft=N>0&&D-b>=t;ft&&(b=D),i.forEach((St,Nt)=>{const zt=O*(O+(1-O)*Math.max(0,Math.sin(D*21+Nt*2))),X=W>0?(C.smokes+2)%3:Nt===0?1:2;if(ft){const Pt=St.pop();St.unshift(Pt)}const Y=St[0];Y.p.copy(L[Nt]),ft&&(Y.t=D),Y.k=zt,Y.c=X;const yt=Nt===0?_t:-_t;for(let Pt=1;Pt<e&&N>0;Pt++){const it=St[Pt],Wt=Math.min(Sr,D-it.t),Ae=Math.max(0,Q-5-18*Wt),st=Math.sin(D*7+it.t*13);it.p.addScaledVector(m,Ae*N).addScaledVector(M,(yt*1.6+st*.7)*N),it.p.y+=(-1+Math.cos(D*6+it.t*11)*.5)*N}y.copy(M);for(let Pt=0;Pt<e;Pt++){const it=St[Pt],Wt=D-it.t,Ae=Math.min(1,Wt/Sr);S.subVectors(St[Math.max(0,Pt-1)].p,St[Math.min(e-1,Pt+1)].p),S.lengthSq()<1e-6&&S.copy(m),v.subVectors(B,it.p),_.crossVectors(S,v),_.lengthSq()<.03*S.lengthSq()*v.lengthSq()?_.copy(y):_.normalize(),_.dot(y)<0&&_.negate(),y.copy(_);const st=(.14+.9*(1-Math.exp(-Wt/.4)))*(.45+.55*it.k),Gt=(Nt*e+Pt)*2;r[Gt*3]=it.p.x-_.x*st,r[Gt*3+1]=it.p.y-_.y*st,r[Gt*3+2]=it.p.z-_.z*st,r[Gt*3+3]=it.p.x+_.x*st,r[Gt*3+4]=it.p.y+_.y*st,r[Gt*3+5]=it.p.z+_.z*st;const le=FT[it.c];o.set(le,Gt*3),o.set(le,Gt*3+3),a[Gt]=a[Gt+1]=Ae,c[Gt]=c[Gt+1]=it.t<0?0:it.k,u[Gt]=u[Gt+1]=it.t}});for(const St of p)St.needsUpdate=!0}}}function OT(n,t,e,i,s,r,o,a){const c=NT(n,()=>n.querySelector(".hud-lantern")),l=new P,u=document.createElement("div");u.className="flash",n.appendChild(u);const f=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(h,d){if(!h.length)return;i.events(h,d.mode==="run"),s.events(h,d);const{x:p,y:x}=ce(d.z,d.x,d.v,{x:0,y:0,z:0});for(const g of h)if(g.type==="lantern")e.burst(p,x+.5,d.z+3,16,!0),r.spawn(p,x+.2,d.z+.6),l.set(p,x+.3,d.z+3).project(a),c.spawn((l.x*.5+.5)*n.clientWidth,(.5-l.y*.5)*n.clientHeight,()=>s.bumpLantern());else if(g.type==="near-miss")t.shake(.06),f();else if(g.type==="hurt"||g.type==="crash"){const m=g.type==="crash";t.shake(m?.9:.45),o.spawn(p,x,d.z+.3,$i(d.z)?"village":g.kind==="bridge"?"cloth":"rock",m),m||f()}else g.type==="booster"?e.burst(p,x,d.z+3,40,!0):g.type==="gust"&&g.full?Na.request=1.5:g.type==="section"&&g.open&&d.mode==="run"&&i.reveal()}}}const Kd=20.5,BT=17.5,Yd=.1,zT=.05,HT=3,GT=.5,VT=2.5,WT=8;class XT{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(t,e){this.minScale=t,this.hooks=e}sample(t){if(t<=0||t>.1||(this.clock+=t,this.warm+=t,this.sinceChange+=t,this.warm<HT||this.sinceChange<GT)||(this.seeded||(this.ema=t*1e3,this.seeded=!0),this.ema+=(t*1e3-this.ema)*.05,this.verify&&this.sinceChange>=VT&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>Kd?this.slowFor+t:0,this.fastFor=this.ema<BT?this.fastFor+t:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>Kd?this.floorSlowFor+t:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const t=this.verify;this.verify=null,!(this.ema<t.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(t.prev))}down(t){if(this.slowFor=0,!t){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-Yd));return}this.floorSlowFor<WT||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+Yd)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const t=Math.min(1,this.scale+zT);t<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(t))??0)||this.apply(t)}key(t){return Math.round(t*100)}apply(t){this.scale=Math.round(t*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const vl={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},W0="skyrun.quality",qT=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function $T(){try{const n=document.createElement("canvas").getContext("webgl2");if(!n)return"no-webgl2";const t=n.getExtension("WEBGL_debug_renderer_info"),e=String(t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER));return n.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function KT(n){const t=navigator;return n==="no-webgl2"||qT.test(n)||(t.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function Zd(n){return n==="low"||n==="mid"||n==="high"}function YT(n){const t=$T(),e=n.get("q");if(Zd(e))return{...vl[e],gpu:t,source:"url"};let i=null;try{const[s,r]=(localStorage.getItem(W0)??"").split("|");Date.now()-Number(r)<3*864e5&&(i=s??null)}catch{}return Zd(i)?{...vl[i],gpu:t,source:"saved"}:{...vl[KT(t)],gpu:t,source:"guess"}}function ZT(n){try{localStorage.setItem(W0,`${n}|${Date.now()}`)}catch{}}function JT(n){return n==="high"?"mid":n==="mid"?"low":null}function QT(n){const t=()=>Math.min(window.devicePixelRatio,n.tier.maxDpr);let e=!1;const i=new XT(n.tier.minScale,{setScale(c){const l=t()*c;n.renderer.setPixelRatio(l),n.post.setPixelRatio(l),n.resize()},degrade(){const c=JT(n.tier.name);return c&&!e&&n.tier.source!=="url"&&(ZT(c),e=!0),n.post.setLite()}});let s=performance.now(),r=0,o=s;const a=c=>{const l=(c-s)/1e3;if(n.tick(Math.min(.1,l)),s=c,n.renderer.info.reset(),n.post.render(),i.sample(l),r++,c-o>500){const u=n.renderer.info.render,f=(r*1e3/(c-o)).toFixed(0);n.stats?.(`${f} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${n.tier.name} (${n.tier.source}) · độ phân giải ${Math.round(i.scale*100)}% · ${i.frameMs().toFixed(1)} ms
${n.worldLine()}`),r=0,o=c}requestAnimationFrame(a)};return requestAnimationFrame(a),i}const X0=je.routeVersion,jT=7*3600*1e3;function Vu(n){const t=new Date(n.getTime()+jT);return`${`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}.${je.routePrefix}${X0}`}function tE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0||1}function eE(n){let t=n;return()=>{const e=Vu(new Date);return{route:e,seed:n?t++:tE(e)}}}function q0(n){const t=/^\d{4}-(\d{2})-(\d{2})/.exec(n);return t?`${t[2]}/${t[1]}`:n}const Wu=20,$0=2*Math.PI*Wu,nE=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Wu}" class="track"/>
  <circle cx="24" cy="24" r="${Wu}" class="arc" stroke-dasharray="${$0.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function iE(n,t){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${nE}<b>Đèn ×2</b>`,n.appendChild(e);const i=e.querySelector(".arc");let s=!1,r=!1,o="";return{update(a){const c=a.smokeT>0&&a.mode!=="over";if(c!==s&&(s=c,e.classList.toggle("on",s),t.classList.toggle("x2",s)),!s)return;const l=($0*(1-a.smokeT/rt.smokeTime)).toFixed(1);l!==o&&i.setAttribute("stroke-dashoffset",o=l);const u=a.smokeT<1.5;u!==r&&e.classList.toggle("ending",r=u)}}}const sE={thermal:"Luồng nhiệt — lên tầng cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${rt.smokeLanternMul} trong ${rt.smokeTime} giây`},rE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l1 2.2c2 1.4 3 3.6 3 6.3 0 3.9-2.6 7-6 7.9V21h-4v-1.6c-3.4-.9-6-4-6-7.9 0-2.7 1-4.9 3-6.3z" fill="currentColor"/></svg>',oE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>',xl=n=>Math.floor(n).toLocaleString("vi-VN");function aE(n){const t=document.createElement("div");t.className="hud",t.innerHTML=`
    <div class="hud-dist">
      <div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div>
      <div class="hud-score">Điểm <b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời — qua ngày mới là vùng mới">
        <div class="hud-day-track"><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${oE.repeat(rt.maxHp)}</div>
      <div class="hud-lantern">${rE}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><span data-k="mult">×1,0</span><i data-k="combo"></i></div>
    </div>
    <div class="hud-boost">
      <div class="hud-pill thermal" data-k="thermal"><b>Luồng nhiệt</b><i data-k="thermalBar"></i></div>
    </div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-stats" data-k="stats"></div>`,n.appendChild(t);const e=y=>t.querySelector(`[data-k="${y}"]`),i=e("dist"),s=e("score"),r=e("sun"),o=e("dayNo"),a=e("period"),c=e("lanterns"),l=t.querySelector(".hud-lantern"),u=e("mult"),f=e("multBox"),h=e("combo"),d=e("thermal"),p=e("thermalBar"),x=[...e("hearts").children],g=e("toasts"),m=e("sections"),M=e("stats"),S=iE(t.querySelector(".hud-right"),l);let v=0;const _=(y,w,b)=>{const T=document.createElement("div");T.className=`hud-toast ${w}${b?` ${b}`:""}`,T.textContent=y;const A=w==="section"?m:g;for(A.appendChild(T);A.children.length>(w==="section"?1:3);)A.firstChild.remove();setTimeout(()=>T.remove(),w==="section"?2600:1100)};return{toast:_,setVisible(y){t.classList.toggle("hidden",!y)},bumpLantern(){l.classList.remove("got"),l.getBoundingClientRect(),l.classList.add("got")},setStats(y){M.textContent=y},update(y,w){i.textContent=xl(y.z),s.textContent=xl(Qr(y)),r.style.left=`${(w.u*100).toFixed(1)}%`;const b=`Ngày ${w.day}`;o.textContent!==b&&(o.textContent=b);const T=Cx(w);a.textContent!==T&&(a.textContent=T),c.textContent=xl(y.lanterns),u.textContent=`×${y.mult.toFixed(1).replace(".",",")}`,f.classList.toggle("hot",y.mult>1.05),h.style.transform=`scaleX(${y.combo>0?Math.max(0,1-y.comboT/rt.comboBreak):0})`,d.classList.toggle("on",y.thermalT>0),p.style.transform=`scaleX(${y.thermalT/rt.thermalTime})`,x.forEach((C,L)=>C.classList.toggle("lost",L>=y.hp)),S.update(y);const A=$m(w);A>v&&y.mode==="run"&&_(A%3===0?`Ngày ${w.day} · ${Vm[w.region]}`:A%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),v=y.mode==="run"?Math.max(v,A):0},zone(y){const w=ae.zoneNames?.[y];w&&_(w,"section")},events(y,w){for(const b of y)b.type==="near-miss"?_(b.combo>1?`SƯỢT! ×${w.mult.toFixed(1).replace(".",",")}`:"SƯỢT!","combo"):b.type==="hurt"?(_(b.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt"),x[b.hp]?.classList.remove("hit"),x[b.hp]?.getBoundingClientRect(),x[b.hp]?.classList.add("hit")):b.type==="booster"&&b.kind!=="lantern"?_(sE[b.kind],"big",b.kind):b.type==="gust"?_(b.full?`Trọn chuỗi gió! +${rt.gustChainScore}`:`Gió xuôi ×${b.chain}`,b.full?"big":"combo"):b.type==="section"&&w.mode==="run"&&!ae.zoneNames&&_(b.open?zn(w.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const cE=30,Jd={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},lE=10,uE=34,hE=260,fE=180,dE=.26,Qd=300;function pE(n,t,e){const i=[],s=[],r=new Map;let o=!1;const a=new Map;let c=null,l=0,u=0,f=-1,h=0;const d=[],p=(S,v)=>{t()&&d.forEach(_=>_(S,v))};let x=null,g=0,m=0;window.addEventListener("keydown",S=>{if(S.repeat)return;const v=Jd[S.code];if(v){i.push(v),v==="down"&&(o=!0),S.preventDefault();const _=performance.now();v===x&&v!=="down"&&_-g<Qd?(p(v==="up"?"flip":"roll",v==="right"?-1:1),x=null):(x=v,g=_)}(S.code==="Space"||S.code==="Enter")&&(s.forEach(_=>_()),S.preventDefault()),r.get(S.code)?.()}),window.addEventListener("keyup",S=>{Jd[S.code]==="down"&&(o=!1)}),n.addEventListener("touchstart",S=>{const v=performance.now();for(const _ of Array.from(S.changedTouches))a.set(_.identifier,{x0:_.clientX,y0:_.clientY,t0:v,hist:[{y:_.clientY,t:v}],hx:[{x:_.clientX,t:v}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),n.addEventListener("touchmove",S=>{S.preventDefault();const v=performance.now();for(const _ of Array.from(S.changedTouches)){const y=a.get(_.identifier);if(!y)continue;for(y.hist.push({y:_.clientY,t:v});y.hist.length>1&&v-y.hist[0].t>hE;)y.hist.shift();const w=_.clientY-y.hist[0].y;for(v>=y.cool&&Math.abs(w)>=uE&&(i.push(w<0?"up":"down"),w<0&&v-m<Qd+150?(p("flip",1),m=0):w<0&&(m=v),y.down=w>0&&c!==_.identifier,y.flicked=!0,y.cool=v+150,y.hist=[{y:_.clientY,t:v}]),y.hx.push({x:_.clientX,t:v});y.hx.length>1&&v-y.hx[0].t>fE;)y.hx.shift();const b=_.clientX-y.hx[0].x;v>=y.rollCool&&Math.abs(b)>=n.clientWidth*dE&&(p("roll",b>0?-1:1),y.rollCool=v+700,y.hx=[{x:_.clientX,t:v}]);const T=_.clientX-y.x0;y.dragX===null&&Math.abs(T)>=lE&&Math.abs(T)>=Math.abs(_.clientY-y.y0)*.8&&(y.dragX=_.clientX,c===null&&(c=_.identifier,y.down=!1,u++,l=0)),c===_.identifier&&y.dragX!==null&&(l=(_.clientX-y.dragX)/Math.max(1,n.clientWidth))}},{passive:!1});const M=S=>{const v=performance.now();for(const _ of Array.from(S.changedTouches)){const y=a.get(_.identifier);if(a.delete(_.identifier),c===_.identifier&&(c=null),!y||y.flicked||y.dragX!==null||S.type==="touchcancel")continue;Math.hypot(_.clientX-y.x0,_.clientY-y.y0)<=14&&v-y.t0<=350&&t()?i.push(_.clientX<n.clientWidth/2?"left":"right"):t()||s.forEach(b=>b())}};return n.addEventListener("touchend",M),n.addEventListener("touchcancel",M),n.addEventListener("mousedown",()=>s.forEach(S=>S())),{take(){return i.splice(0,i.length)},holdDown:()=>o||Array.from(a.values()).some(S=>S.down),steer(){if(c===null)return null;f!==u&&(f=u,h=e());let S=h-l*cE;const v=Math.abs(S)-rt.steerMax;return v>0&&(h-=Math.sign(S)*v,S-=Math.sign(S)*v),S},onAction(S){s.push(S)},onKey(S,v){r.set(S,v)},onTrick(S){d.push(S)}}}function K0(n){return/\.github\.io$/.test(location.hostname)||n.has("portal")}function Y0(n){return!je.online||n.has("seed")||n.has("z")||n.get("auto")==="1"?!1:K0(n)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function mE(n){return Y0(n)&&!n.has("alt")}function gE(n){const t={};let e=null;async function i(o,a={}){try{const c={...t,accept:"application/json"};a.body&&(c["content-type"]="application/json");const l=await fetch(o,{...a,headers:c,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function s(o,a={}){const c=await i(o,a);return e="fail"in c?c.fail:null,"ok"in c?c.ok:null}const r=encodeURIComponent;return{board:o=>s(`api/ghosts?route=${r(o)}`),async paths(o,a){return a.length?(await s(`api/ghosts/paths?route=${r(o)}&pids=${a.map(r).join(",")}`))?.paths??{}:{}},leaderboard:(o="meters")=>i(`api/leaderboard?by=${o}&map=${je.id}`),progress:()=>s("api/progress"),submit:(o,a)=>s("api/ghosts",{method:"POST",body:JSON.stringify({route:o,...a})}),lastFailure:()=>e,async logRun(o){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(o),headers:{...t,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const o=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return o?o.type==="opaqueredirect"||o.status===401?"auth":o.ok?"ok":"network":"network"}}}const ec=10,vE=60/ec,Xu=900*ec,_l=n=>Math.max(-32768,Math.min(32767,Math.round(n*100)));function xE(n){const t=Math.min(Xu,Math.floor(n.length/3)),e=new DataView(new ArrayBuffer(4+t*6)),i=n[0]??0;e.setFloat32(0,i,!0);let s=e.getFloat32(0,!0);for(let a=0;a<t;a++){const c=_l(n[a*3]-s);s+=c/100,e.setInt16(4+a*6,c,!0),e.setInt16(6+a*6,_l(n[a*3+1]),!0),e.setInt16(8+a*6,_l(n[a*3+2]),!0)}let r="";const o=new Uint8Array(e.buffer);for(let a=0;a<o.length;a+=32768)r+=String.fromCharCode(...o.subarray(a,a+32768));return btoa(r)}function _E(n){let t;try{t=atob(n)}catch{return null}const e=Math.floor((t.length-4)/6);if(e<2)return null;const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);const s=new DataView(i.buffer),r={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let o=s.getFloat32(0,!0);if(!Number.isFinite(o))return null;for(let a=0;a<e;a++)o+=s.getInt16(4+a*6,!0)/100,r.z[a]=o,r.x[a]=s.getInt16(6+a*6,!0)/100,r.v[a]=s.getInt16(8+a*6,!0)/100;return r}function Z0(n,t,e){const i=Math.max(0,t*ec),s=n.n-1,r=Math.min(s,Math.floor(i)),o=Math.min(s,r+1),a=Math.min(1,i-r);return e.z=n.z[r]+(n.z[o]-n.z[r])*a,e.x=n.x[r]+(n.x[o]-n.x[r])*a,e.v=n.v[r]+(n.v[o]-n.v[r])*a,e.ended=i>=s,e.after=Math.max(0,(i-s)/ec),e}const J0=5,Ml=4,ME=1500,yE=200,bE=120;function qu(n,t,e=!1){return e?1:Math.min(1,Math.max(0,(t-ME-n*yE)/bE))}const Q0=n=>n.length===1&&n[0].self;function SE(n){const t=n.runs.find(o=>o.pid===n.me),e=n.runs.filter(o=>o.pid!==n.me),i=t?.dist??0,s=o=>o.dist>=i?o.dist-i:(i-o.dist)*2,r=[];t&&r.push(t),e[0]&&r.push(e[0]);for(const o of e.slice(1).sort((a,c)=>s(a)-s(c))){if(r.length>=J0)break;r.push(o)}return r}function wE(){let n=[];const t=[];return{ghosts:()=>n,set(e){n=[];for(const i of e){const s=_E(i.path);s&&n.push({run:i.run,self:i.self,track:s,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of n)e.ahead=null,e.downSaid=!1},update(e,i){t.length=0;const s=Q0(n);return n.forEach((r,o)=>{Z0(r.track,e,r.at);const a=r.at.z-i,c=r.run.name,l=qu(o,i,s)>0;l&&a>Ml&&r.ahead===!1&&t.push({type:"passed",name:c,self:r.self}),l&&a<-Ml&&r.ahead===!0&&t.push({type:"pass",name:c,self:r.self}),Math.abs(a)>Ml&&(r.ahead=a>0),r.at.ended&&!r.downSaid&&(r.downSaid=!0,l&&r.run.crash&&Math.abs(a)<300&&t.push({type:"down",name:c,self:r.self,dist:r.run.dist}))}),t},rank(e){return 1+n.filter(i=>i.at.z>e).length}}}function TE(){let n=[],t=0,e=!1;const i=s=>{n.length<Xu*3&&n.push(s.z,s.x,s.v)};return{start(s){n=[],t=0,e=!0,i(s)},afterStep(s){e&&(t++,t%vE===0&&i(s),s.mode==="over"&&(e=!1))},seconds:()=>t/60,truncated:()=>n.length>=Xu*3,finish:()=>xE(n)}}const yl="skyrun.myGhost",aa="me";function EE(n){let t=null;const e=(r,o)=>!!r&&r.route===o&&typeof r.path=="string"&&Number.isFinite(r.dist);function i(r){let o=null;try{o=JSON.parse(localStorage.getItem(yl)??"null")}catch{}const a=e(o,r)?o:null,c=e(t,r)?t:null;return a&&c?c.dist>a.dist?c:a:a??c}function s(r){const o=i(r);return{me:aa,myName:null,total:o?1:0,runs:o?[{pid:aa,name:"Bạn",dist:o.dist,score:o.score,dur:o.dur,crash:o.crash}]:[]}}return{board:async r=>s(r),async paths(r,o){const a=i(r);return a&&o.includes(aa)?{[aa]:a.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(r,o){const a=i(r),c=!a||o.dist>a.dist;if(c){t={route:r,dist:o.dist,score:o.score,dur:o.dur,crash:o.crash,path:o.path};try{localStorage.removeItem(yl),localStorage.setItem(yl,JSON.stringify(t))}catch{}}return{saved:c,best:c?o.dist:a.dist,rank:1,total:1,bestScore:o.score,scoreRank:1}},lastFailure:()=>null,logRun:n,ping:async()=>"ok"}}const AE="modulepreload",RE=function(n,t){return new URL(n,t).href},jd={},CE=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=RE(u,i),u in jd)return;jd[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(i)for(let p=o.length-1;p>=0;p--){const x=o[p];if(x.href===u&&(!f||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":AE,f||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((p,x)=>{d.addEventListener("load",p),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},PE="skyRuns",tp="sr-tele",ep="../../shared/",bl=new Map;function np(n){let t=bl.get(n);return t||(t=new Promise((e,i)=>{const s=document.createElement("script");s.src=n,s.onload=()=>e(),s.onerror=()=>i(new Error(`không tải được ${n}`)),document.head.appendChild(s)}),t.catch(()=>bl.delete(n)),bl.set(n,t)),t}function LE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function NE(n,t,e,i){const{route:s,rv:r,sv:o,alt:a,dist:c,dur:l,score:u,crash:f,tainted:h,...d}=n;return{v:1,ch:t,pk:e,at:i,route:s,rv:r,sv:o,alt:a,dist:Math.round(c*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:f??null,tainted:h,detail:JSON.stringify(d)}}let Us=null;function IE(){return Us||(Us=(async()=>{await np(`${ep}portal-config.js`),await np(`${ep}portal-firebase.js`);const n=window.Portal,t=n?.FB;if(!t?.configured())throw new Error("chưa cấu hình Firebase");const e=await t.load(),i=await CE(()=>import(`${t.SDK}/firebase-app.js`),[],import.meta.url),s=i.getApps().find(a=>a.name===tp)??i.initializeApp(n.CONFIG,tp),r=e.authM.getAuth(s);await r.authStateReady(),r.currentUser||await e.authM.signInAnonymously(r);let o;try{o=e.fsM.initializeFirestore(s,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{o=e.fsM.getFirestore(s)}return{fsM:e.fsM,db:o,uid:r.currentUser.uid,limit:t.limit.bind(t)}})(),Us.catch(()=>Us=null),Us)}function DE(){const n=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async t=>{try{const e=await IE();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,PE),NE(t,n,LE(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const UE=1e9,FE=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),kE=[...document.scripts].map(n=>/assets\/index-([\w-]+)\.js/.exec(n.src)?.[1]).find(Boolean)??"dev",ip=n=>n.thermalV>8?"thermal":n.v<-2?"low":n.v>2?"high":"zero",OE=(n,t)=>n>=UE?"trail":t>2?"u":t<-2?"d":"o",BE=n=>ae.zone(ze(n),$i(n)),ca=(n,t)=>n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:0,Dn=n=>Math.round(n*100)/100;function zE(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function HE(n){let t={touch:!1,key:!1};addEventListener("keydown",()=>t.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(t.touch=!0)});let e="",i=!1,s=0,r=-1,o=null,a=c();function c(){const l=u=>Object.fromEntries(u.map(f=>[f,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke"]),bTaken:l(["thermal","shield","smoke"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1}}return{start(l,u,f){e=u,i=f,s++,o=r<0?null:Dn((performance.now()-r)/1e3),t={touch:!1,key:!1},a=c(),a.lastCmd=l.time},frame(l,u,f){l>0&&l<.5&&(a.frames.length<3e4&&a.frames.push(l),a.scaleSum+=n.quality().scale*l),a.shown=Math.max(a.shown,u),a.near=f},afterStep(l,u){if(l.mode!=="run"&&l.mode!=="crash")return;const f=ip(l);a.tiers[f]+=u,a.multSum+=l.mult*u,f!=="low"?a.lowSince=-1:a.lowSince<0&&(a.lowSince=l.time);for(const h of l.events)h.type==="lane"?a.swipes.lane++:h.type==="vert"?a.swipes[h.kind==="flare"?"up":"down"]++:h.type==="hurt"?a.hurts++:h.type==="crash"&&(a.deathNear=a.near),(h.type==="lane"||h.type==="vert")&&(a.lastCmd=l.time);for(const h of l.pickups){if(h.z>l.z-3.5)break;if(!a.seen.has(h.id))if(a.seen.add(h.id),h.kind==="lantern"){const d=OE(h.id,h.v);a.lSpawn[d]++,h.taken&&a.lTaken[d]++}else a.bSpawn[h.kind]++,h.taken&&a.bTaken[h.kind]++}for(const h of l.obstacles){if(!h.passed||a.rows.has(h.row)||(a.rows.add(h.row),l.hurtRow===h.row||l.mode!=="run"))continue;const d=l.time-l.dodgeTime;d<1.5&&ka(h,l.dodgeX,l.thermalV,0)&&a.leads.push(d),h.kind==="bridge"&&a.lowSince>=0&&l.time-a.lowSince>=.5&&a.bridgesFromLow++}},finish(l,u,f,h){r=performance.now();const d=[...a.frames].sort((S,v)=>S-v),p=a.frames.reduce((S,v)=>S+v,0),x=[...a.leads].sort((S,v)=>S-v),g=Hm(),m=jr(),M=n.quality();return{lv:1,route:e,rv:h,sv:ac,alt:i,build:kE,session:FE,runNo:s,wait:o,dist:Math.floor(l.z),dur:Dn(l.time),score:Qr(l),crash:u,tainted:f,hurts:a.hurts,device:{tier:M.tier,gov:Dn(p>0?a.scaleSum/p:M.scale),fps50:Math.round(d.length?1/ca(d,.5):0),fps5:Math.round(d.length?1/ca(d,.95):0),input:t.touch&&t.key?"mixed":t.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:m.ghosts,music:g.music?m.music:"off",tutorial:zE()},death:u?{phase:Math.round(ze(l.z)),zone:BE(l.z),tier:ip(l),sinceCmd:Dn(l.time-a.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust)},lanterns:{spawned:a.lSpawn,taken:a.lTaken,bestStreak:l.bestStreak,avgMult:Dn(l.time>0?a.multSum/l.time:1)},tiers:{low:Dn(a.tiers.low),zero:Dn(a.tiers.zero),high:Dn(a.tiers.high),thermal:Dn(a.tiers.thermal)},swipes:a.swipes,bridgesFromLow:a.bridgesFromLow,boosters:{spawned:a.bSpawn,taken:a.bTaken},lead:{p10:Dn(ca(x,.1)),p50:Dn(ca(x,.5)),n:x.length},ghosts:{shown:a.shown,deathNear:a.deathNear}}}}}const $u="skyrun.pending",GE=12e4,sp=[1500,4e3];function la(){try{const n=JSON.parse(localStorage.getItem($u)??"[]");return Array.isArray(n)?n:[]}catch{return[]}}function Sl(n){try{n.length?localStorage.setItem($u,JSON.stringify(n)):localStorage.removeItem($u)}catch{}}function rp(n){const t=Date.now(),e=[Vu(new Date(t)),Vu(new Date(t-864e5))].map(i=>i.slice(0,10));return typeof n.route=="string"&&e.includes(n.route.slice(0,10))&&!!n.run}function VE(n){let t=performance.now(),e=!1;const i=r=>new Promise(o=>setTimeout(o,r));async function s(r,o){for(let a=0;;a++){const c=await n.submit(r,o);if(c)return{ok:c};const l=n.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||a>=sp.length)return{fail:l};await i(sp[a])}}return{keepAlive(r){const o=performance.now();o-t<GE||(t=o,n.ping().then(a=>{a!=="auth"||e||(e=!0,r())}))},async submit(r,o){t=performance.now();const a={route:r,run:o,at:Date.now()};Sl([...la().filter(rp),a].slice(-3));const c=await s(r,o);return(!("fail"in c)||c.fail.kind==="rejected")&&Sl(la().filter(l=>l.at!==a.at||l.route!==r)),c},async flush(){const r=la().filter(rp),o=[],a=[];for(const c of r)await n.submit(c.route,c.run)?o.push(c.run.dist):n.lastFailure()?.kind!=="rejected"&&a.push(c);return(r.length||la().length)&&Sl(a),o}}}const WE=160;function XE(n,t){const e=document.createElement("div");e.className="ghost-layer";const i=Array.from({length:t},()=>{const a=document.createElement("div");return a.className="ghost-tag",e.appendChild(a),a}),s=document.createElement("div");s.className="ghost-rank",e.appendChild(s),n.appendChild(e);const r=new P;let o="";return{update(a,c,l,u,f,h){if(e.classList.toggle("on",h&&l.length>0),!h)return;const d=n.clientWidth,p=n.clientHeight;i.forEach((g,m)=>{const M=m<c.count?l[c.owner[m]]:void 0,S=c.alphas[m]??0;if(!M||S<.15||Math.abs(M.at.z-f)>WE){g.style.opacity="0";return}if(r.copy(c.heads[m]).project(a),r.z>1){g.style.opacity="0";return}const v=M.self?"Kỷ lục của bạn":M.run.name;g.textContent!==v&&(g.textContent=v),g.classList.toggle("self",M.self),g.style.opacity=Math.min(1,S*1.6).toFixed(2),g.style.transform=`translate(${((r.x+1)*.5*d).toFixed(1)}px, ${((1-r.y)*.5*p).toFixed(1)}px) translate(-50%, -100%)`});const x=l.every(g=>g.self)?"":`Hạng ${u}/${l.length+1}`;x!==o&&(s.textContent=x,o=x)}}}const Ia=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function qE(){const n=document.createElement("button");n.type="button",n.className="board-btn",n.setAttribute("aria-label","Bảng xếp hạng"),n.innerHTML='<span class="board-btn-icon" aria-hidden="true">🏆</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>',n.hidden=!0;const t=n.querySelector(".board-btn-rank");n.addEventListener("click",()=>n.classList.remove("fresh"));const e=i=>{t.hidden=!i,t.textContent=i?`#${i}`:""};return{el:n,setRank:e,bump(i){e(i),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump","fresh")},seen:()=>n.classList.remove("fresh")}}function $E(n,t,e,i){const s=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!s||Ia())return e.bump(i);const r=n.getBoundingClientRect(),o=t.getBoundingClientRect(),a=s.getBoundingClientRect(),c=o.left+o.width/2-r.left,l=o.top+o.height/2-r.top,u=a.left+a.width/2-r.left-c,f=a.top+a.height/2-r.top-l,h=document.createElement("div");h.className="rank-fly",h.textContent="🏆",h.style.left=`${c}px`,h.style.top=`${l}px`,n.appendChild(h);const d=(g,m,M)=>`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(${M})`;let p=!1;const x=()=>{p||(p=!0,h.remove(),e.bump(i))};h.animate([{transform:d(0,0,.6),opacity:0},{transform:d(u*.3,f*.45-70,1.7),opacity:1,offset:.35},{transform:d(u,f,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=x,setTimeout(x,900)}const Ku=n=>Math.floor(n).toLocaleString("vi-VN"),ua="meters",ha=900;function KE(n,t){const e=document.createElement("li");e.className=n.pos==="me"?"me":`ctx ${n.pos}`;for(const[i,s]of[["r",`#${n.rank}`],["n",n.pos!=="me"?n.name:n.name?`${n.name} (bạn)`:"Bạn"],["v",Ku(n.value)+t]]){const r=document.createElement("span");r.className=i,r.textContent=s,e.appendChild(r)}return e}function op(n,t,e,i,s){const r=performance.now(),o=()=>{n.textContent=s(e)},a=c=>{const l=Math.min(1,(c-r)/i);n.textContent=s(Math.round(t+(e-t)*(1-(1-l)**3))),l<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(o,i+80)}function YE(n){let t,e=0;async function i(){const r=e,o=await n.client.leaderboard(ua);if(r!==e||!("ok"in o))return;const a=o.ok.mine;t=a?{rank:a.rank,value:a[ua]??0}:null,n.button.setRank(a?.rank??null)}function s(r,o,a,c,l){const{by:u,rank:f,best:h,improved:d,climbed:p}=o,{tab:x,unit:g}=n.text(u),m=St=>c[St-1],M=[],S=m(f-1),v=m(f+1);S&&M.push({rank:f-1,name:S.name,value:S[u]??0,pos:"above"}),M.push({rank:f,name:l,value:h,pos:"me"}),v&&M.push({rank:f+1,name:v.name,value:v[u]??0,pos:"below"});const _=document.createElement("div");_.className="rank-card",_.setAttribute("role","button"),_.setAttribute("aria-label",`Xem bảng xếp hạng ${x}`);const y=document.createElement("div");y.className="rank-head",y.innerHTML='<span aria-hidden="true">🏆</span> <b>Bảng xếp hạng</b> <span class="by"></span><span class="rank-chip" hidden></span>',y.querySelector(".by").textContent=`· ${x}`;const w=y.querySelector(".rank-chip");w.textContent=d?a===null?"Mới lên bảng":p&&a?`▲ ${a.rank-f}`:"Kỷ lục mới":"";const b=document.createElement("ol");b.className="rank-rows";const T=M.map(St=>KE(St,g));b.append(...T);const A=document.createElement("div");A.className="rank-note";const L=(a?c.slice(f,a.rank):a===null?c.slice(f):[]).map(St=>St.name),D=L.length>2?`${L.slice(0,2).join(", ")} +${L.length-2}`:L.join(", ");A.textContent=f===1&&p?"Bạn đang dẫn đầu bảng!":p&&D?`Vượt ${D}!`:a===null?"Đã có tên trên bảng!":p?`Lên hạng #${f}!`:d?`Kỷ lục mới — giữ hạng #${f}`:"Vượt kỷ lục để leo hạng";const N=document.createElement("span");N.className="rank-more",N.textContent="Cả bảng ›",A.appendChild(N),_.append(y,b,A);for(const St of["touchstart","touchend","touchmove","pointerdown"])_.addEventListener(St,Nt=>Nt.stopPropagation(),{passive:!0});_.addEventListener("mousedown",St=>St.stopPropagation());let B=!1;_.addEventListener("click",St=>{St.stopPropagation(),B=!0,n.button.seen(),n.open(u)}),r.before(_);const H=T[M.findIndex(St=>St.pos==="me")],W=H.querySelector(".r"),j=()=>{w.hidden=!w.textContent,d&&H.classList.add("shine"),setTimeout(()=>{if(!d||B)return n.button.setRank(f);_.isConnected?$E(n.root,W,n.button,f):n.button.bump(f)},Ia()?0:450)};if(!p||Ia())return void setTimeout(j,Ia()?0:400);const O=H.getBoundingClientRect().height+2,$=v?T[T.length-1]:void 0,_t={duration:ha,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};H.animate([{transform:`translateY(${O}px)`,opacity:$?1:0},{transform:"none",opacity:1}],_t),$?.animate([{transform:`translateY(${-O}px)`},{transform:"none"}],_t),W.textContent=a?`#${a.rank}`:"#–";const ft=H.querySelector(".v");a&&(ft.textContent=Ku(a.value)+g),setTimeout(()=>{a?op(W,a.rank,f,ha,St=>`#${St}`):W.textContent=`#${f}`,op(ft,a?.value??0,h,ha,St=>Ku(St)+g)},380),setTimeout(j,380+ha)}return{snapshot:i,async celebrate(r,o,a){e++;const c=r.metersRank!==void 0?"meters":"score",l=c===ua?t:void 0,u=a?n.root.querySelector(".screens.over .over-card [data-online]"):null,f=u?await n.client.leaderboard(c):null,h=f&&"ok"in f?f.ok:null,d=h?.mine?.rank??r.metersRank??r.scoreRank,p=h?.mine?.[c]??(c==="meters"?r.bestMeters??0:r.bestScore);c===ua&&(t={rank:d,value:p});const x=c==="meters"?o.dist:o.score,g=l===null||(l!==void 0?p>l.value:x>=p),m=g&&(l===null||l!==void 0&&l.rank>d);if(u?.isConnected)return s(u,{by:c,rank:d,best:p,improved:g,climbed:m},l,h?.top??[],h?.mine?.name??"");n.button.setRank(d),g&&n.button.el.classList.add("fresh")}}}function ZE(n,t){const e=n.querySelector("li.me");if(!e)return;const i=e.getBoundingClientRect(),s=n.getBoundingClientRect();n.scrollTop+=i.top-s.top-(s.height-i.height)/2,t&&e.classList.add("me-new")}const nc=n=>Math.floor(n).toLocaleString("vi-VN"),JE=[1500,4e3],kr={meters:{tab:"Quãng xa",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},ap=["meters","score","lanterns"];function QE(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":n.kind==="network"?`Chưa tải được bảng (${n.status?`máy chủ báo lỗi ${n.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${n.why??n.status}).`}function cp(n,t,e,i){const s=document.createElement("li");s.className=i?"me":"";const r=(o,a)=>{const c=document.createElement("span");c.className=o,c.textContent=a,s.appendChild(c)};return r("board-rank",`#${e}`),r("board-name",i?`${n.name} (bạn)`:n.name),r("board-score",nc(n[t]??0)+kr[t].unit),r("board-meta",`${nc(n.dist)} m · ${q0(n.route)}`),s}function jE(n,t){const e=qE(),i=e.el,s=document.createElement("div");s.className="board-panel",s.hidden=!0;const r=ap.map(v=>`<button type="button" role="tab" data-by="${v}">${kr[v].tab}</button>`).join("");s.innerHTML=`
    <div class="board-card" role="dialog" aria-label="Bảng xếp hạng">
      <div class="board-head"><div><b>${je.name} <span class="board-season"></span></b><small class="board-sub"></small></div>
        <button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <div class="board-tabs" role="tablist">${r}</div>
      <p class="board-status"></p>
      <button type="button" class="board-retry" hidden>Thử lại</button>
      <ol class="board-list"></ol>
    </div>`,n.append(i,s);const o=s.querySelector(".board-season"),a=s.querySelector(".board-sub"),c=s.querySelector(".board-status"),l=s.querySelector(".board-retry"),u=s.querySelector(".board-list"),f=[...s.querySelectorAll(".board-tabs button")];o.textContent=`Mùa ${ac}`;let h="meters";const d={};for(const v of[i,s]){for(const _ of["touchstart","touchend","touchmove","pointerdown"])v.addEventListener(_,y=>y.stopPropagation(),{passive:!0});v.addEventListener("mousedown",_=>{_.stopPropagation(),_.target instanceof Element&&_.target.closest("button")&&_.preventDefault()})}let p=0,x=!1;const g=()=>{s.hidden=!0,p++,x=!1};function m(){for(const v of f)v.setAttribute("aria-selected",String(v.dataset.by===h));a.textContent=kr[h].sub}async function M(){s.hidden=!1,m(),l.hidden=!0,c.textContent="Đang tải…",u.replaceChildren();const v=++p,_=h,y=kr[_];let w=await t.leaderboard(_);for(const T of JE){if(v!==p||"ok"in w||w.fail.kind!=="network")break;await new Promise(A=>setTimeout(A,T)),v===p&&(w=await t.leaderboard(_))}if(v!==p)return;if("fail"in w){const T=d[_];c.textContent=QE(w.fail)+(T?` Bảng ĐÃ ghi ${y.best} của bạn: ${nc(T.best)}${y.unit} — hạng #${T.rank}.`:""),l.hidden=w.fail.kind==="auth";return}const b=w.ok;if(o.textContent=`Mùa ${b.season}`,!b.top.length){c.textContent=y.empty;return}if(c.textContent=`${nc(b.total)} ${y.count}`,u.replaceChildren(...b.top.map((T,A)=>cp(T,_,A+1,T.pid===b.me))),b.mine&&!b.top.some(T=>T.pid===b.me)){const T=document.createElement("li");T.className="board-gap",T.textContent="…",u.append(T,cp(b.mine,_,b.mine.rank,!0))}ZE(u,x),x=!1}const S=YE({root:n,client:t,button:e,text:v=>kr[v],open:v=>(h=v,x=!0,void M())});S.snapshot(),i.addEventListener("click",()=>{M()}),l.addEventListener("click",()=>{M()});for(const v of f)v.addEventListener("click",()=>{h=ap.find(_=>_===v.dataset.by)??"meters",M()});return s.querySelector(".board-close").addEventListener("click",g),s.addEventListener("click",v=>{v.target===s&&g()}),window.addEventListener("keydown",v=>{v.code==="Escape"&&!s.hidden&&g()}),{setAvailable(v){i.hidden!==!v&&(i.hidden=!v,v||g())},runStart(){g(),S.snapshot()},remember(v,_,y){d.score={best:v.bestScore,rank:v.scoreRank},v.metersRank!==void 0&&(d.meters={best:v.bestMeters??0,rank:v.metersRank}),v.lanternRank!==void 0&&(d.lanterns={best:v.bestLanterns??0,rank:v.lanternRank}),S.celebrate(v,_,y)}}}const Mi=n=>Math.floor(n).toLocaleString("vi-VN");function t2(n,t,e){const i=t.runs[0],s=`Đường bay hôm nay ${q0(n)}`;if(e)return i?`${s} · bóng vàng là kỷ lục hôm nay của bạn ${Mi(i.dist)} m — bay vượt nó!`:`${s} · bay một ván trên 200 m để có bóng của chính bạn`;if(!i)return`${s} · chưa ai bay — bạn mở đường!`;const r=i.pid===t.me?"bạn":i.name;return`${s} · ${t.total} người đã bay · dẫn đầu ${r} ${Mi(i.dist)} m`}function e2(n,t){if(t)return n.saved?`Kỷ lục hôm nay mới ${Mi(n.best)} m — ván sau bóng vàng của bạn bay đúng đường này`:`Kỷ lục hôm nay ${Mi(n.best)} m — bóng vàng vẫn là ván đó, bay vượt nó!`;const e=n.saved?`kỷ lục ngày mới ${Mi(n.best)} m`:`kỷ lục ngày ${Mi(n.best)} m`,i=n.lanternRank?` · đèn #${n.lanternRank}`:"";return`BXH điểm mùa ${ac} #${n.scoreRank} (cao nhất ${Mi(n.bestScore)})${i} · hôm nay hạng ${n.rank}/${n.total}, ${e}`}const n2=n=>`Ván có bot lái hoặc nhảy quãng — ${n?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function i2(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":n.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${n.why??n.status}).`}function s2(n){return n.type==="pass"?n.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${n.name}!`,"combo"]:n.type==="passed"?[n.self?"Kỷ lục của bạn vượt lên":`${n.name} vượt lên`,"big"]:[n.self?`Kỷ lục của bạn dừng ở ${Mi(n.dist)} m`:`${n.name} rơi ở ${Mi(n.dist)} m`,"big"]}const r2=200,o2=1.2,a2=n=>Math.floor(n).toLocaleString("vi-VN");function c2(n){const t=mE(n.params),e=K0(n.params),i=e?EE(DE()):gE(n.params),s=Y0(n.params)?HE({quality:n.quality}):null,r=TE(),o=VE(i),a=wE(),c=XE(n.root,J0),l=t&&!e?jE(n.root,i):null;let u="",f=0,h=!1,d=-9,p=null,x=0,g=!1,m=0,M="";const S=_=>{M=_,n.screens.setOnline(_)};async function v(_,y){u=_;const w=++f,b=await o.flush(),T=await i.board(_);if(w!==f||!T)return;const A=b.length?` · đã gửi bù ván ${a2(Math.max(...b))} m`:"";y?S(t2(_,T,e)+A):A&&S(M+A);const C=SE(T),L=await i.paths(_,C.map(N=>N.pid));if(w!==f)return;const D=C.filter(N=>L[N.pid]).map(N=>({run:N,self:N.pid===T.me,path:L[N.pid]}));h?p=D:a.set(D)}return t&&v(n.route,!0),{runStart(_,y){t&&y!==u&&(a.set([]),p=null,v(y,!1)),p&&a.set(p),p=null,r.start(_),a.reset(),h=!0,l?.runStart(),d=-9,x++,g=!1,m=_.z,s?.start(_,y,n.params.has("alt"))},afterStep(_,y){(y||Math.abs(_.z-m)>10)&&(g=!0),m=_.z,r.afterStep(_),s?.afterStep(_,1/60)},present(_,y,w,b){const T=h&&(_.mode==="run"||_.mode==="crash"),A=r.seconds()-(1-w)/60;if(T)for(const C of a.update(A,y.z))_.mode!=="run"||A-d<o2||(d=A,n.hud.toast(...s2(C)));if(t&&!e&&o.keepAlive(()=>T?n.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):S(`${M?`${M} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),n.view.update(T?a.ghosts():[],y,A,b,n.camera.position),s&&_.mode==="run"){let C=!1;for(let L=0;L<n.view.count;L++)C||=n.view.heads[L].distanceTo(n.camera.position)<15;s.frame(b,n.view.count,C)}c.update(n.camera,n.view,a.ghosts(),a.rank(y.z),y.z,T),l?.setAvailable(n.screens.visible()!==null)},async progress(){return!t||e?null:(await i.progress())?.best??null},async runOver(_,y){if(h=!1,s&&i.logRun(s.finish(_,y,g,n.rv)),!t||!u||_.z<r2)return;if(g)return S(n2(e));const w=x;e||S("Đang gửi ván lên bảng hôm nay…");const b=await o.submit(u,{sv:ac,lanterns:_.lanterns,dist:Math.floor(_.z),score:Qr(_),dur:Math.min(3600,Math.round(r.seconds()*10)/10),crash:r.truncated()?null:y,path:r.finish()});w===x&&S("fail"in b?i2(b.fail):e2(b.ok,e)),"ok"in b&&l?.remember(b.ok,{dist:Math.floor(_.z),score:Qr(_)},w===x),"ok"in b&&await v(u,!1)}}}const l2=.8;function u2(n,t,e){const i=document.createElement("button");i.type="button",i.className="pause-btn",i.setAttribute("aria-label","Tạm dừng"),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',t.prepend(i);const s=document.createElement("div");s.className="pause-screen",s.innerHTML=`<div class="pause-card"><div class="pause-title">Đang tạm dừng</div>
    <button type="button" class="btn-play" data-resume>Bay tiếp</button>
    <div class="pause-hint">${e?"Hoặc chạm bất kỳ đâu":"Hoặc bấm Space"}</div></div>`,n.appendChild(s);let r=!1,o=!1,a=1;const c=()=>{s.classList.toggle("on",r),i.classList.toggle("on",o&&!r)},l={paused:()=>r,pause(){!o||r||(r=!0,c())},resume(){r&&(r=!1,a=.15,c())},setRunning(u){o!==u&&(o=u,u||(r=!1),c())},factor(u){return r?0:(a=Math.min(1,a+u/l2),a)}};return i.addEventListener("click",()=>l.pause()),s.querySelector("[data-resume]").addEventListener("click",u=>{u.stopPropagation(),l.resume()}),document.addEventListener("visibilitychange",()=>{document.hidden&&l.pause()}),window.addEventListener("keydown",u=>{!u.repeat&&(u.code==="KeyP"||u.code==="Escape")&&(r?l.resume:l.pause)()}),l}const j0="skyrun.best",h2=800,f2={pillar:"Đâm cột đá — lần sau kéo ngón (hoặc chạm) sang bên trống để né.",spike:"Đâm mỏm đá — vuốt lên để vọt qua, hoặc sang làn khác.",ridge:"Sống đá chắn cả khe — vuốt lên để vọt qua.",bridge:"Cầu treo chắn ngang — vuốt xuống để chui qua.",overhang:"Đâm mái đá — vuốt xuống để chui dưới, hoặc sang làn khác."},d2={spike:"Đâm mái nhà — vuốt lên để vọt qua nóc, hoặc kéo sang làn trống.",ridge:"Mái đình chắn ngang — vuốt lên để vọt qua.",bridge:"Cổng làng chắn ngang — vuốt xuống để chui qua cửa cổng."};function p2(){try{return Number(localStorage.getItem(j0)??0)||0}catch{return 0}}function m2(n){try{localStorage.setItem(j0,String(n))}catch{}}function g2(n,t,e){const i=document.createElement("div");i.className="screens",n.appendChild(i);let s=null,r=p2(),o=0,a="";const c=()=>{const u=i.querySelector("[data-online]");u&&(u.textContent=a,u.hidden=!a)},l=()=>{i.querySelector("[data-play]")?.addEventListener("click",f=>{f.stopPropagation(),t()});const u=i.querySelector("[data-lobby]");if(u){for(const f of["touchstart","touchend","pointerdown","mousedown"])u.addEventListener(f,h=>h.stopPropagation());u.addEventListener("click",f=>{f.stopPropagation(),e()})}};return{visible:()=>s,tapReady:()=>s!=="over"||performance.now()-o>h2,showTitle(){s="title",i.className="screens title",i.innerHTML=`
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
        </div>`,l(),c()},setOnline(u){a=u??"",c()},showOver(u,f){s="over",o=performance.now();const h=Qr(u),d=h>r;return d&&(r=h,m2(r)),i.className="screens over",i.innerHTML=`
        <div class="over-card">
          <div class="over-kicker">${d?"Kỷ lục mới!":"Hạ cánh khẩn cấp"}</div>
          <div class="over-score">${h.toLocaleString("vi-VN")}</div>
          <div class="over-stats">
            <div><b>${Math.floor(u.z).toLocaleString("vi-VN")} m</b><span>quãng bay</span></div>
            <div><b>${u.lanterns}</b><span>đèn trời</span></div>
            <div><b>${r.toLocaleString("vi-VN")}</b><span>kỷ lục</span></div>
          </div>
          ${f?`<p class="over-tip">${$i(u.z)&&d2[f]||f2[f]}</p>`:""}
          <div class="screen-online" data-online hidden></div>
          <div class="over-actions">
            <button class="btn-play" data-play>Bay lại <kbd>Space</kbd></button>
            <button type="button" class="btn-lobby" data-lobby>Sảnh</button>
          </div>
        </div>`,l(),a="",c(),d},hide(){s=null,i.className="screens",i.innerHTML=""}}}const v2='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',x2=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],_2={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách — hết bài tự sang bài khác"};function M2(n,t,e,i,s){i.mode=jr().ghosts;const r=document.createElement("button");r.type="button",r.setAttribute("aria-label","Cài đặt"),r.innerHTML=v2,t.el.insertBefore(r,t.el.querySelector('[data-k="mute"]'));const o=document.createElement("div");o.className="settings-panel",o.hidden=!0,o.innerHTML=`
    <div class="settings-card" role="dialog" aria-label="Cài đặt">
      <div class="board-head"><div><b>Cài đặt</b></div><button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <h3>Âm thanh</h3>
      <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span><div class="settings-seg two" data-sw="sfx"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <div class="settings-row"><span>Nhạc nền</span><div class="settings-seg two" data-sw="music"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <h3>Chọn nhạc nền</h3><p class="settings-note"></p><div class="settings-music"></div>
      <h3>Bóng ma <small>người đã bay route hôm nay</small></h3><div class="settings-seg"></div>
    </div>`,n.append(o);const a=o.querySelector(".settings-note"),c=o.querySelector(".settings-music"),l=o.querySelector(".settings-seg"),u=[_2,...Ha].map(g=>{const m=document.createElement("button");return m.type="button",m.className="settings-opt",m.dataset.music=g.id,m.innerHTML='<b></b><small></small><span class="now">♪ đang phát</span>',m.querySelector("b").textContent=g.label,m.querySelector("small").textContent=g.style,c.append(m),m}),f=x2.map(([g,m])=>{const M=document.createElement("button");return M.type="button",M.dataset.ghost=g,M.textContent=m,l.append(M),M}),h=()=>{const g=e.music(),m=g?.choice()??jr().music,M=g?.playing()?.id,S=g?.loading()?.id;for(const _ of u){const y=_.dataset.music;_.classList.toggle("on",y===m),_.classList.toggle("playing",y===M||y===S),_.querySelector(".now").textContent=y===S?"… đang tải":"♪ đang phát"}const v=e.prefs();a.textContent=v.music?"":"Nhạc đang tắt — chọn một mục là bật lại.";for(const _ of f)_.classList.toggle("on",_.dataset.ghost===i.mode);for(const _ of o.querySelectorAll("[data-sw] [data-on]")){const y=_.parentElement.dataset.sw;_.classList.toggle("on",v[y]===(_.dataset.on==="1"))}};let d=0;const p=()=>{o.hidden=!0,clearInterval(d)},x=()=>{s.pause(),o.hidden=!1,h(),d=window.setInterval(h,1e3)};for(const g of[r,o]){for(const m of["touchstart","touchend","touchmove","pointerdown"])g.addEventListener(m,M=>M.stopPropagation(),{passive:!0});g.addEventListener("mousedown",m=>{m.stopPropagation(),m.target instanceof Element&&m.target.closest("button")&&m.preventDefault()})}r.addEventListener("click",x),o.querySelector(".board-close").addEventListener("click",p),o.addEventListener("click",g=>{if(g.target===o)return p();const m=g.target instanceof Element?g.target.closest("[data-music],[data-ghost],[data-on]"):null;if(m){if(m.dataset.on){const M=m.parentElement.dataset.sw;e.prefs()[M]!==(m.dataset.on==="1")&&(M==="sfx"?e.toggleSfx:e.toggleMusic)(),t.sync()}else m.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(m.dataset.music),t.sync()):(i.mode=m.dataset.ghost,Gm({ghosts:i.mode}));h()}}),window.addEventListener("keydown",g=>{o.hidden||(g.stopPropagation(),g.code==="Escape"&&p())},{capture:!0})}const y2='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="off" d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',b2='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17.5V6l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function S2(n,t){const e=document.createElement("div");e.className="sound-btns",e.innerHTML=`<button type="button" data-k="mute" aria-label="Tắt/bật tiếng hiệu ứng">${y2}</button><button type="button" data-k="music" aria-label="Tắt/bật nhạc nền">${b2}</button>`,n.appendChild(e);const i=e.querySelector('[data-k="mute"]'),s=e.querySelector('[data-k="music"]'),r=()=>{const o=t.prefs();i.classList.toggle("off",!o.sfx),s.classList.toggle("off",!o.music)};for(const o of["touchstart","touchend","touchmove","pointerdown"])e.addEventListener(o,a=>a.stopPropagation(),{passive:!0});return e.addEventListener("mousedown",o=>{o.stopPropagation(),o.preventDefault()}),i.addEventListener("click",()=>{t.toggleSfx(),r()}),s.addEventListener("click",()=>{t.toggleMusic(),r()}),r(),{sync:r,el:e}}const Ws=8;function tg(n,t,e,i,s){const r=t-n;if(r<=1||s<=n+4)return Number.NaN;const o=Math.min(1,Math.pow((s-n)/r,1/1.5)),a=e*xe(.2,.55,i);return a+o*(e-a)}function w2(n,t){const e=ze(n),i=ae.road(e);if(i<.02)return null;const s=Gn(n),r=Cn(n),o=s-ae.roadDepth(e),a=tg(eg(n),s,Ys(n),r,o);return Number.isNaN(a)?null:(t.lat=a,t.y=o,t.amount=i,t)}function eg(n){const t=Gn(n);return xe(t-xe(150,240,Cn(n))-xo(n),Ce(n)-13,ih(n))}const T2=2.6,E2=60,ng=[];for(const n of vo.segs)n.k===0||Math.abs(n.k*n.len)<T2||ng.push({x:n.x+Math.cos(n.th)/n.k,z:n.z-Math.sin(n.th)/n.k,r:Math.abs(1/n.k)-E2,u:n.u0});function A2(n,t,e){const i=vo,s=Math.round((t+i.oz-i.bz)/i.endZ);for(let r=s-1;r<=s+1;r++)for(const o of ng){const a=r*i.endX-i.ox+o.x,c=r*i.endZ-i.oz+o.z,l=Math.hypot(n-a,t-c)/o.r;if(l>=1)continue;const u=r*Si-ni+o.u,f=Gn(u)-xe(150,240,Cn(u+300))-xo(u+300),h=Gn(u)+70+50*(kn(n/70,t/70,3,91)-.5);let d=f+(h-f)*Math.pow(1-l*l,.6)+40*(kn(n/45,t/45,3,94)-.5)*(1-l);const p=(d-f)/45+.8*(kn(n/90,t/90,2,93)-.5);d=xe(d,f+(Math.floor(p)+At(.55,1,p-Math.floor(p)))*45,.85),d>e&&(e=xe(e,d,1-At(.75,1,l)))}return e}const R2=128,C2=1024,lp=new Map,wl={s:0,lat:0,dist:0};function P2(n,t,e,i,s){const r=i*Math.SQRT2/2,o=(t+.5)*i,a=(e+.5)*i,c=Math.round((a+n.oz-n.bz)/n.endZ);Dv(o,a,(c-3)*Si-ni,(c+4)*Si-ni,wl,n);const l=wl.dist+2*r+s,u=[];for(let h=c-3;h<=c+4;h++){const d=h*n.endX-n.ox,p=h*n.endZ-n.oz;if(Math.hypot(o-d-n.bx,a-p-n.bz)-n.br>l)continue;const x=n.segs.length-1;for(let g=0;g<=x;g++){const m=n.segs[g];if(Math.hypot(o-d-m.bx,a-p-m.bz)-m.br>l)continue;const M=d+m.x,S=p+m.z,v=Math.sin(m.th),_=Math.cos(m.th),y={x:M,z:S,s0:h*Si-ni+m.u0,len:m.len,k:m.k,th:m.th,sin:v,cos:_,cx:m.k===0?0:M+_/m.k,cz:m.k===0?0:S-v/m.k,r:m.k===0?0:Math.abs(1/m.k),sg:Math.sign(m.k),bx:d+m.bx,bz:p+m.bz,br:m.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};up(n,h,g,-1,y,"p",m.k===0),up(n,h,g,1,y,"n",m.k===0),u.push(y)}}const f=h=>Math.hypot(o-h.bx,a-h.bz)-h.br;return u.sort((h,d)=>f(h)-f(d)),{far:wl.dist-r>600,cands:u}}function up(n,t,e,i,s,r,o){const a=n.segs.length-1;for(let c=0;c<=a;c++){e+=i,e<0?(e=a,t--):e>a&&(e=0,t++);const l=n.segs[e];if(l.k===0){if(o)continue;return}const u=t*n.endX-n.ox+l.x+Math.cos(l.th)/l.k,f=t*n.endZ-n.oz+l.z-Math.sin(l.th)/l.k;r==="p"?(s.pcx=u,s.pcz=f,s.pr=Math.abs(1/l.k)):(s.ncx=u,s.ncz=f,s.nr=Math.abs(1/l.k));return}}function hp(n,t,e,i,s,r,o){const a=Math.floor(e/s),c=Math.floor(i/s),l=(a*1000003+c)*2+r;let u=n.get(l);return u||n.set(l,u=P2(t,a,c,s,o)),u}function L2(n,t,e,i){const s=`${e}`;let r=lp.get(s);(!r||r.size>4e4)&&lp.set(s,r=new Map);const o=hp(r,i,n,t,C2,1,e);return o.far?o.cands:hp(r,i,n,t,R2,0,e).cands}const fa=30;function Wh(n,t,e,i,s=vo){const r=L2(n,t,e,s);let o=1/0,a=0,c=0;for(const u of r){if(Math.hypot(n-u.bx,t-u.bz)-u.br>o+e)continue;let f,h,d=1/0;if(u.k===0){const S=n-u.x,v=t-u.z;f=S*u.sin+v*u.cos,h=S*u.cos-v*u.sin}else{const S=n-u.cx,v=t-u.cz;let y=Math.atan2(u.sg*v,-u.sg*S)-u.th;if(y-=2*Math.PI*Math.round((y-u.k*u.len/2)/(2*Math.PI)),f=y/u.k,d=Math.hypot(S,v),h=u.sg*(u.r-d),d<fa){const w=fp[c++]??={s:0,lat:0,dist:0,prom:0,core:0};w.s=u.s0+u.len/2,w.lat=0,w.dist=u.r-d,w.prom=0,w.core=1-d/fa*(d/fa)*(3-2*d/fa)}d+=u.r}if(f<-.01||f>u.len+.01)continue;const p=Math.abs(h);if(p>o+e)continue;p<o&&(o=p);const x=u.s0+Math.min(u.len,Math.max(0,f));let g=!1;for(let S=0;S<a;S++)Math.abs(i[S].s-x)<.5&&(g=!0);if(g)continue;let m=d-p;u.pr>0&&(m=Math.min(m,Math.hypot(n-u.pcx,t-u.pcz)+u.pr-p)),u.nr>0&&(m=Math.min(m,Math.hypot(n-u.ncx,t-u.ncz)+u.nr-p));const M=i[a]??={s:0,lat:0,dist:0,prom:0,core:0};M.s=x,M.lat=h,M.dist=p,M.prom=Math.max(0,m),M.core=0,a++}let l=0;for(let u=0;u<a;u++){if(i[u].dist>o+e)continue;const f=i[l],h=i[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=0,l++}for(let u=0;u<c;u++){const f=i[l++]??={s:0,lat:0,dist:0,prom:0,core:0},h=fp[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=h.core}return l}const fp=[],dp=[];function Yu(n,t,e,i){const s=Wh(n,t,0,dp);for(let r=0;r<s;r++){const o=dp[r];if(o.core===0&&Math.abs(o.s-e)<=Math.abs(i)+80)return!0}return!1}const pp=24,ic=520,wr=15,N2=14,mp=200,I2=60,Qt={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},Fs={n210:()=>Number.isNaN(Qt.n210)?Qt.n210=kn(Qt.x/210,Qt.z/210,3,21):Qt.n210,n700:()=>Number.isNaN(Qt.n700)?Qt.n700=kn(Qt.x/700,Qt.z/700,3,5):Qt.n700,n500:()=>Number.isNaN(Qt.n500)?Qt.n500=kn(Qt.x/500,Qt.z/500,2,3):Qt.n500,out:()=>Number.isNaN(Qt.out)?Qt.out=90*vf(Qt.x/800,Qt.z/800,4,7)+30*(kn(Qt.x/160,Qt.z/160,3,11)-.5):Qt.out,far:()=>Number.isNaN(Qt.far)?Qt.far=250+1150*vf(Qt.x/3200,Qt.z/3200,5,9):Qt.far,n90:()=>Number.isNaN(Qt.n90)?Qt.n90=kn(Qt.x/90,Qt.z/90,2,71):Qt.n90},me={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function D2(n,t){const{o:e,ty:i,w:s,sill:r,fly:o,vil:a,xd:c,ra:l,rd:u}=me,f=xe(i-xe(150,240,e)-c,o-13,r),h=zr(c/190),d=i-f;let p;if(n<=s){const _=s*xe(.2,.55,e),y=zr((n-_)/(s-_));p=f+d*xe(Math.pow(y,1.5),y*y*(3-2*y),e),e>0&&(p+=e*34*(Fs.n210()-.35)*At(25,110,n))}else{const _=zr((n-s)/xe(280,700,e));p=i+(xe(400,-50,e)-260*h+140*(Fs.n700()-.5))*(1-(1-_)*(1-_))}const x=At(s*.9,s*1.25,n),g=At(wr+8,wr+22,n)*(1-x)*(1-e),m=xe(pp,pp*.5,g),M=Math.max(.7*x,.85*g)*(1-.6*h);if(M>0){const _=(p+30*(Fs.n500()-.5))/m;p=xe(p,(Math.floor(_)+At(.45,1,_-Math.floor(_)))*m,M)}x>0&&(p+=x*Fs.out());const S=At(s+900,s+5e3,n);if(S>0&&(p+=S*Fs.far()),l>.02&&t>0){const _=i-u,y=tg(f,i,s,e,_);if(!Number.isNaN(y)){const w=l*At(y-3,y-.5,n)*(1-At(y+Ws+1,y+Ws+4,n));w>0&&(p=Math.min(p,xe(p,_-.4,w)))}}const v=a*(1-At(240,380,n));if(v>0&&(p=xe(p,o-Hr+1.6*(Fs.n90()-.5)-.012*Math.max(0,n-40),v)),p-=6*(1-At(0,18,n))*(p<f+20?1-r:0),n<wr){const _=xe(N2+(wr-n)*2,11+(wr-n)*.3,r);p=Math.min(p,o-xe(_,Hr+.4,a))}return p}const Tl=[],gp=[],vp=new Map;function U2(n,t){const e=n*100003+t;let i=vp.get(e);if(i!==void 0)return i;const s=(n+.2+.6*ut(n,t,61))*ic,r=(t+.2+.6*ut(n,t,62))*ic,o=70+110*ut(n,t,63),a=Wh(s,r,0,gp)>0?gp[0]:null;if(!a||Cn(a.s)<.6||a.dist<o+45)i=null;else{const c=Zl(a.s);i={ox:s,oz:r,r:o,floor:c,peak:Gn(a.s)-200+230*ut(n,t,64)}}return vp.set(e,i),i}function F2(n,t,e){const i=Math.floor(n/ic),s=Math.floor(t/ic);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=U2(i+o,s+r);if(!a)continue;const c=Math.hypot(n-a.ox,t-a.oz)/a.r;if(c>=1)continue;const l=a.floor+(a.peak-a.floor)*Math.pow(1-c*c,.6);l>e&&(e=xe(e,l,1-At(.8,1,c)))}return e}function ig(n,t,e){if(!Number.isFinite(n+t))return e.h=e.s=e.lat=e.vil=NaN,e;Qt.x=n,Qt.z=t,Qt.n210=Qt.n700=Qt.n500=Qt.out=Qt.far=Qt.n90=NaN;const i=Wh(n,t,mp,Tl);let s=1/0;for(let o=0;o<i;o++){const a=Tl[o];a.core===0&&a.dist<s&&(s=a.dist,e.s=a.s,e.lat=a.lat)}me.o=me.ty=me.w=me.sill=me.fly=me.vil=me.xd=me.ra=me.rd=0;let r=0;for(let o=0;o<i;o++){const a=Tl[o],c=(1-At(0,mp,a.dist-s))*(a.core>0?a.core:At(0,I2,a.prom)+1e-4);if(c<=0)continue;r+=c,me.o+=c*Cn(a.s),me.ty+=c*Gn(a.s),me.w+=c*Ys(a.s),me.sill+=c*ih(a.s),me.fly+=c*Ce(a.s),me.vil+=c*zn(a.s),me.xd+=c*xo(a.s);const l=ze(a.s);me.ra+=c*ae.road(l),me.rd+=c*ae.roadDepth(l)}return me.o/=r,me.ty/=r,me.w/=r,me.sill/=r,me.fly/=r,me.vil/=r,me.xd/=r,me.ra/=r,me.rd/=r,e.vil=me.vil,e.h=A2(n,t,F2(n,t,D2(s,e.lat))),e}const k2={h:0,s:0,lat:0,vil:0};function Ze(n,t){return ig(n,t,k2).h}const gc=`
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
`,er={uPilot:{value:new de(0,0,0,1)},uHazTime:{value:0}},vc=`
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
`;function O2(n,t,e,i){er.uPilot.value.set(n,t,Math.sin(e),Math.cos(e)),er.uHazTime.value=i}const B2=`
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
}`,z2=`
#include <fog_pars_fragment>
${gc}
${oh}
#ifdef HAZARD
${vc}
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
}`;let H2=null,G2=null;function sg(n,t){const e=new re({vertexShader:B2,fragmentShader:z2,defines:n?{HAZARD:1}:{},uniforms:gn.merge([lt.fog]),fog:!0});return e.uniforms.uLift=t,e.uniforms.uRegionHg=Mo,n&&Object.assign(e.uniforms,er),e}const rg={value:1};function V2(){return H2??=sg(!0,rg)}function og(){return G2??=sg(!1,rg)}const W2=ae.archPhases,X2=1600;function q2(n,t){const e=Ce(n),i=Cn(n),s=i>.5?90+50*ut(t,1,71):Ys(n)+22,r=(i>.5?58:46)+18*ut(t,2,72),o={x:0,y:0,z:0},a=d=>Ze(ce(n,d,0,o).x,o.z)-e,c=[];for(let d=0;d<=24;d++){const p=d/24*Math.PI,x=-s*Math.cos(p),g=Math.min(a(x)-15,r),m=g+(r-g)*Math.pow(Math.sin(p),.55)+6*Math.sin(p*3+t);c.push(new P(x,m,4*Math.sin(p*2+t)))}const l=(i>.5?13:9)+4*ut(t,3,73),u=new fc(new kh(c),90,l,14,!1),f=u.getAttribute("position"),h=u.getAttribute("normal");for(let d=0;d<f.count;d++){const x=(ut(f.getX(d)*.08+t,f.getY(d)*.08+f.getZ(d)*.05,74)-.5)*l*.7;f.setXYZ(d,f.getX(d)+h.getX(d)*x,f.getY(d)+h.getY(d)*x*1.3,f.getZ(d)+h.getZ(d)*x)}return u.setAttribute("aCrest",new wt(new Float32Array(f.count),1)),u.computeVertexNormals(),u}function $2(){const n=new De,t=og(),e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=new Set,o=Yi(s);for(let a=o;a<=o+1;a++)W2.forEach((c,l)=>{const u=a*Ge+c-ri;if(u<s-60||u>s+X2)return;const f=a*10+l;if(r.add(f),e.has(f))return;const h=new Xt(q2(u,f*1.37),t);ce(u,0,0,i),h.position.set(i.x,i.y,i.z),h.rotation.y=hn(u),h.matrixAutoUpdate=!1,h.updateMatrix(),n.add(h),e.set(f,h)});for(const[a,c]of e)r.has(a)||(n.remove(c),c.geometry.dispose(),e.delete(a))}}}const K2=5,Y2=150,Z2=1700,J2=300,Q2=200,j2=new ir({vertexColors:!0}),tA=new ir({vertexColors:!0}),El=new re({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:mn});function eA(){const n=new Ht(.25,1.1,.25).translate(0,.55,0),t=n.getAttribute("position"),e=new Float32Array(t.count*3);for(let i=0;i<t.count;i++)e.set(t.getY(i)>.8?[.8,.08,.06]:[.92,.92,.88],i*3);return n.setAttribute("color",new wt(e,3)),n}const nA=eA();function iA(){const n=new De;let t=null,e=Number.NaN;const i={lat:0,y:0,amount:0},s={x:0,y:0,z:0},r=new Ot,o=a=>{const c=[],l=[],u=[],f=[],h=[],d=(_,y,w)=>(ce(_,y,w-Ce(_),s),[s.x,s.y,s.z]),p=(_,y,w,b,T,A,C)=>{_.push(...w,...b,...T,...w,...T,...A);for(let L=0;L<6;L++)y.push(...C)};let x=null,g=0;for(let _=a-Y2;_<=a+Z2;_+=K2,g++){const y=w2(_,i)&&i.amount>.5?{s:_,lat:i.lat,y:i.y}:null;if(x&&y){const[w,b]=[x,y],T=[.86,.85,.8],A=g%9===0?[.3,.3,.31]:[.2,.2,.22];p(c,l,d(w.s,w.lat,w.y-.6),d(b.s,b.lat,b.y-.6),d(b.s,b.lat,b.y+.85),d(w.s,w.lat,w.y+.85),T),p(c,l,d(w.s,w.lat,w.y+.85),d(b.s,b.lat,b.y+.85),d(b.s,b.lat+.45,b.y+.85),d(w.s,w.lat+.45,w.y+.85),T),p(c,l,d(w.s,w.lat+.45,w.y+.05),d(b.s,b.lat+.45,b.y+.05),d(b.s,b.lat+Ws-1.2,b.y+.05),d(w.s,w.lat+Ws-1.2,w.y+.05),A);const C=.45+(Ws-1.65)/2;g%2===0&&p(c,l,d(w.s,w.lat+C-.12,w.y+.08),d(b.s,b.lat+C-.12,b.y+.08),d(b.s,b.lat+C+.12,b.y+.08),d(w.s,w.lat+C+.12,w.y+.08),[.95,.78,.25]);for(const L of[0,1]){const D=.45+(L===0?1.6:Ws-3.4);u.push(...d(w.s,w.lat+D-.32,w.y+.9),...d(b.s,b.lat+D-.32,b.y+.9),...d(b.s,b.lat+D+.32,b.y+.9),...d(w.s,w.lat+D-.32,w.y+.9),...d(b.s,b.lat+D+.32,b.y+.9),...d(w.s,w.lat+D+.32,w.y+.9));for(const N of[w.s,b.s,b.s,w.s,b.s,w.s])f.push(N,L)}g%3===0&&h.length<Q2*4&&(ce(y.s,y.lat+.2,y.y+.85-Ce(y.s),s),h.push(s.x,s.y,s.z,hn(y.s)))}x=y}if(!c.length)return null;const m=new Kt;m.setAttribute("position",new wt(new Float32Array(c),3)),m.setAttribute("color",new wt(new Float32Array(l),3)),m.computeVertexNormals();const M=new Kt;M.setAttribute("position",new wt(new Float32Array(u),3)),M.setAttribute("aTrail",new wt(new Float32Array(f),2));const S=new Be(nA,tA,Math.max(1,h.length/4));for(let _=0;_<h.length/4;_++)r.makeRotationY(h[_*4+3]).setPosition(h[_*4],h[_*4+1],h[_*4+2]),S.setMatrixAt(_,r);const v={mesh:new Xt(m,j2),trail:new Xt(M,El),posts:S};return v.trail.frustumCulled=!1,v.trail.renderOrder=3,v};return{group:n,update(a,c,l){El.uniforms.uTime.value=c,El.uniforms.uNight.value=Math.min(1,Math.max(0,(l-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(a-e)<J2)&&(e=a,t&&(n.remove(t.mesh,t.trail,t.posts),t.mesh.geometry.dispose(),t.trail.geometry.dispose(),t.posts.dispose()),t=o(a),t&&n.add(t.mesh,t.trail,t.posts))}}}const Jn=30,Al=4,xp=18,_p=8,Mp=24,yp=[0,10,28,55,95,150],bp=new re({uniforms:gn.merge([lt.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:we,fog:!0});function sA(n,t,e){const i={x:0,y:0,z:0},s=[],r=[],o=Math.ceil((t-n)/Al)+1,a=(d,p)=>.92+.32*ut(d*.02,p*4,e)+.14*ut(d*.11,p*13,e+1);for(let d=0;d<o;d++){const p=n+d*Al;for(let x=0;x<=Jn;x++){const g=x/Jn,m=g*Math.PI*2,M=a(p,g);ce(p,xp*M*Math.cos(m),_p+Mp*M*Math.sin(m),i),s.push(i.x,i.y,i.z),r.push(p,g,Math.min(p-n,t-p))}}const c=[];for(let d=0;d<o-1;d++)for(let p=0;p<Jn;p++){const x=d*(Jn+1)+p,g=x+Jn+1;c.push(x,x+1,g,g,x+1,g+1)}const l=new Kt;l.setAttribute("position",new wt(new Float32Array(s),3)),l.setAttribute("aCave",new wt(new Float32Array(r),3)),l.setIndex(c);const u=[],f=[];for(const[d,p]of[[n,-1],[t,1]]){const x=u.length/3;yp.forEach((g,m)=>{for(let M=0;M<=Jn;M++){const S=M/Jn,v=S*Math.PI*2,_=a(d,S),y=m?.25*g*(ut(S*9,m,e+5)-.5):0,w=Math.max(-16,_p+(Mp*_+g+y)*Math.sin(v));ce(d-p*(g*.35+(m?3*ut(S*13,m,e+9):0)),(xp*_+g+y)*Math.cos(v),w,i),u.push(i.x,i.y,i.z)}});for(let g=0;g<yp.length-1;g++)for(let m=0;m<Jn;m++){const M=x+g*(Jn+1)+m,S=M+Jn+1;f.push(M,S,M+1,M+1,S,S+1)}}for(let d=0;d<o;d+=2){const p=n+d*Al,x=u.length/3;for(let g=0;g<=16;g++){const m=-110+220*g/16,M=Math.abs(m)/110,S=58+150*M*M+30*(ut(p*.015,m*.03,e+3)-.5);ce(p,m,S,i),u.push(i.x,i.y,i.z)}if(d+2<o)for(let g=0;g<16;g++)f.push(x+g,x+17+g,x+g+1,x+g+1,x+17+g,x+18+g)}const h=new Kt;return h.setAttribute("position",new wt(new Float32Array(u),3)),h.setIndex(f),h.computeVertexNormals(),{tube:l,portals:h}}function rA(){const n=new De,t=new Map,e=og(),i=e.clone();return i.uniforms=e.uniforms,i.side=we,{group:n,update(s,r){if(bp.uniforms.uTime.value=r,!ae.caves.length)return;const o=new Set,a=Yi(s);for(let c=a-1;c<=a+1;c++)ae.caves.forEach(([l,u],f)=>{const h=c*Ge+l-ri,d=c*Ge+u-ri;if(d<s-200||h>s+2200)return;const p=c*8+f;if(o.add(p),t.has(p))return;const x=sA(h,d,(c*7+f)%97),g=[new Xt(x.tube,bp),new Xt(x.portals,i)];for(const m of g)m.frustumCulled=!1,m.matrixAutoUpdate=!1,n.add(m);t.set(p,g)});for(const[c,l]of t)if(!o.has(c)){for(const u of l)n.remove(u),u.geometry.dispose();t.delete(c)}}}}function ui(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Kt;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const f=[];for(let h=0;h<n.length;++h){const d=n[h].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+u);u+=n[h].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Sp(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][h]);const p=Sp(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function Sp(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new wt(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let h=0,d=u.count;h<d;h++)for(let p=0;p<e;p++){const x=u.getComponent(h,p);a.setComponent(h+f,p,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function wp(n,t){if(t===r_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(t===Fu||t===s0){let e=n.getIndex();if(e===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);n.setIndex(r),e=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=e.count-2,s=[];if(t===Fu)for(let r=1;r<=i;r++)s.push(e.getX(0)),s.push(e.getX(r)),s.push(e.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(e.getX(r)),s.push(e.getX(r+1)),s.push(e.getX(r+2))):(s.push(e.getX(r+2)),s.push(e.getX(r+1)),s.push(e.getX(r)));return s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),n}const Rl=140,Tp=24,oA=2400;function da(n,t){const e=n.getAttribute("position").count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set(t,s*3);return n.setAttribute("color",new wt(i,3)),n.deleteAttribute("uv"),n}function aA(){return ui([da(new Ht(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),da(new Ht(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),da(new Ht(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),da(new Ht(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function cA(){const n=new Be(aA(),new ir({vertexColors:!0}),Tp);n.frustumCulled=!1,n.count=0;const t=new Ot,e={x:0,y:0,z:0};let i=Number.NaN;return{mesh:n,update(s){const r=Math.floor((s-100)/Rl);if(r===i)return;i=r;let o=0;for(let a=r;o<Tp&&a*Rl<s+oA;a++){const c=a*Rl+37*Math.sin(a*1.7);if(xo(c)<120)continue;const l=3*Math.sin(c/140)+2.5*Math.sin(c/47+1.7)+(a%2?7:-7),u=eg(c);ce(c,l,0,e),t.makeRotationY(hn(c)+(a%3===0?Math.PI:0)+.15*Math.sin(a)).setPosition(e.x,u+.1,e.z),n.setMatrixAt(o++,t)}n.count=o,n.visible=o>0,n.instanceMatrix.needsUpdate=!0}}}const lA=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`;function xc(n){const t=new ir({vertexColors:!0,side:n.doubleSide?we:Ai});return t.onBeforeCompile=e=>{e.uniforms.uLift=n.lift,n.hazard&&Object.assign(e.uniforms,er),e.fragmentShader=`uniform float uLift;
${n.hazard?vc:""}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${n.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${n.rim.toFixed(3)} * uLift;
    ${n.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${n.windows?lA:""}
  }
  #endif`)},t.customProgramCacheKey=()=>`backlit-${n.selfLit}-${n.rim}-${n.doubleSide?2:1}-${n.hazard?"h":""}${n.windows?"w":""}`,t}function us(n,t,e,i,s){const r=n.getAttribute("position"),o=new Float32Array(r.count*3);for(let a=0;a<r.count;a++){const c=Math.min(1,Math.max(0,(r.getY(a)-i)/(s-i))),l=.85+.3*ut(r.getX(a)*.7,r.getZ(a)*.7+r.getY(a),5);for(let u=0;u<3;u++)o[a*3+u]=Math.pow(t[u]+(e[u]-t[u])*c*c,2.2)*l}return n.setAttribute("color",new wt(o,3)),n}function Xh(n,t,e){const i=n.getAttribute("position");for(let s=0;s<i.count;s++){const r=i.getX(s),o=i.getY(s),a=i.getZ(s),c=(ut(r*1.3+e,a*1.3,9)-.5)*t;i.setXYZ(s,r*(1+c),o+c*.6,a*(1+c))}return n.computeVertexNormals(),n}function ag(){const n=[new Je(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([i,s,r],o)=>n.push(Xh(new bo(i,s,7,1).toNonIndexed().translate(0,r+s/2,0),.25,o)));const e=ui(n.map(i=>i.index?i.toNonIndexed():i));return e.computeVertexNormals(),us(e,[.05,.12,.07],[.42,.52,.2],1,14)}function cg(){const n=[new Je(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([i,s,r,o,a],c)=>n.push(Xh(new vs(o,a).translate(i,s,r),.35,c*3)));const e=ui(n);return e.computeVertexNormals(),us(e,[.07,.13,.05],[.62,.6,.18],3,13)}function uA(){const n=[new Je(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,i,s]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])n.push(new bo(e,i,5,1).toNonIndexed().translate(0,s+i/2,0));const t=ui(n);return t.computeVertexNormals(),us(t,[.05,.12,.07],[.42,.52,.2],1,14)}function hA(){const n=[new Je(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,i,s,r,o]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])n.push(Xh(new vs(r,0).translate(e,i,s),.35,o*3));const t=ui(n);return t.computeVertexNormals(),us(t,[.07,.13,.05],[.62,.6,.18],3,13)}function fA(){const n=[];for(const[i,s]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])n.push(new Ht(.4,3,.4).translate(i,1.5,s).toNonIndexed());n.push(us(new Ht(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const t=new bo(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();n.push(us(t,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const i of n)i.getAttribute("color")||us(i,[.22,.15,.09],[.3,.2,.12],0,3);const e=ui(n);return e.computeVertexNormals(),e}function dA(){const n=[];for(const t of[-2.4,0,2.4])n.push(new Ht(1.1,1,.1).translate(t,4.8,2.85).toNonIndexed()),n.push(new Ht(1.1,1,.1).translate(t,4.8,-2.85).toNonIndexed());return ui(n)}const Zu=250,pA=40,Tr=1,lg=650,wn={x:0,y:0,z:0};function Ep(n,t){return Math.hypot(Ze(n+3,t)-Ze(n-3,t),Ze(n,t+3)-Ze(n,t-3))/6}function mA(n,t){const e=[],i=[],s=yo()>.5?Math.round(t*.6):t;for(let r=0;r<lg*2.2&&e.length<s;r++){const o=(n+ut(r*.71,n,41))*Zu,a=ut(n,r*.37,42)<.5?-1:1,c=Ys(o),l=Math.pow(ut(r*.53,n*1.7,43),2.6)*(240+560*Cn(o)),u=Math.max(c*.7,17)+l;ce(o,a*u,0,wn);const f=wn.x,h=wn.z;if(!Yu(f,h,o,u))continue;const d=Ze(f,h),p=Ce(o);if(u<24&&d>p-(ih(o)>.5?12:22)||Ep(f,h)>3.2||d<p-200)continue;const x=.7+.9*ut(r,n*3.1,44);e.push({p:new P(f,d-.5,h),s:x,r:ut(r,n,45)*6.28,kind:ut(f/90,h/90,46)<.55?0:1})}for(let r=0;r<40&&i.length<7;r++){const o=(n+ut(r*1.31,n,51))*Zu,a=ut(n,r*.91,52)<.5?-1:1,c=Math.max(Ys(o)*.7,30)+ut(r,n*2.3,53)*220;if(ce(o,a*c,0,wn),!Yu(wn.x,wn.z,o,c))continue;const l=Ze(wn.x,wn.z);Ep(wn.x,wn.z)>.45||l>Ce(o)-18||i.push({p:new P(wn.x,l,wn.z),s:1,r:hn(o)-a*(Math.PI/2)+(ut(r,n,54)-.5),kind:0})}return{trees:e,houses:i}}const qh={value:1},gA=xc({lift:qh,selfLit:.2,rim:.85}),$h=xc({lift:qh,selfLit:.2,rim:.85});function ks(n,t,e=!1){const i=e?new rn({color:"#ffb35a"}):gA,s=new Be(n,i,t);return s.count=0,s.frustumCulled=!1,s}function vA(n){const t=n.ahead,e=Math.round(lg*n.density),i=e*(Tr+t+1),s=new De,r=ks(ag(),i),o=ks(cg(),i),a=ks(uA(),i),c=ks(hA(),i),l=ks(fA(),8*(Tr+t+1)),u=ks(dA(),8*(Tr+t+1),!0);s.add(r,o,a,c,l,u);const f=new Map;let h=Number.NaN;const d=new Ot,p=new Ne,x=new P(0,1,0),g=new P,m=new ct,M=new ct,S=()=>{const v=[0,0,0,0],_=[r,o,a,c];let y=0;for(let w=h;w<=h+Tr+t;w++){let b=f.get(w);b||f.set(w,b=mA(w,e));const T=w-h>n.near-1?2:0;for(const A of b.trees){p.setFromAxisAngle(x,A.r),d.compose(A.p,p,g.set(A.s,A.s*(.9+.25*Math.sin(A.r*3)),A.s));const C=T+A.kind,L=_[C],D=v[C]++;L.setMatrixAt(D,d);const N=yo();m.setHSL(.22-.05*N+.06*Math.sin(A.r*5),.25,.5-.07*N+.12*Math.cos(A.r*7)),L.setColorAt(D,m.multiplyScalar(2))}for(const A of b.houses)p.setFromAxisAngle(x,A.r),d.compose(A.p,p,g.set(1,1,1)),l.setMatrixAt(y,d),u.setMatrixAt(y++,d)}for(const w of[...f.keys()])(w<h-1||w>h+Tr+t+1)&&f.delete(w);_.forEach((w,b)=>w.count=v[b]),l.count=y,u.count=y;for(const w of[..._,l,u])w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0)};return{group:s,update(v,_){const y=Math.floor((v-pA)/Zu);y!==h&&(h=y,S()),qh.value=1-.55*Math.min(1,Math.max(0,(_-.4)/.5)),u.material.color.copy(M.set("#ffb35a").multiplyScalar(.25+3.2*_*_))}}}const Kh=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2],To=[.8,.3,.16],ug=[.6,.32,.22],Yh=[.9,.76,.45],hg=[.88,.84,.76],xA=[.2,.45,.36],Zh=[.45,.25,.14],fg=[.58,.33,.24];function jt(n,t,e=.1,i=1){const s=n.index?n.toNonIndexed():n;s.deleteAttribute("uv"),s.getAttribute("normal")||s.computeVertexNormals();const r=s.getAttribute("position"),o=new Float32Array(r.count*3),a=Kh(t);for(let c=0;c<r.count;c++){const l=1-e/2+e*ut(r.getX(c)*.8+i,r.getY(c)*.8+r.getZ(c)*.6,17);for(let u=0;u<3;u++)o[c*3+u]=a[u]*l}return s.setAttribute("color",new wt(o,3)),s}const qn=n=>ui(n);function po(n,t,e,i){const s=n.getAttribute("position"),r=n.getAttribute("color");for(let o=0;o<s.count;o++){const a=i+(1-i)*Math.min(1,Math.max(0,(s.getY(o)-t)/(e-t)));r.setXYZ(o,r.getX(o)*a,r.getY(o)*a,r.getZ(o)*a)}return n}const dg=[1,.7,.32];function _c(n,t,e,i,s=0,r=[.55,.2,.12]){const o=[],a=Math.max(6,Math.round(n/.45)),c=Math.max(4,Math.round(Math.hypot(t,e)/.42)),l=Kh(i);for(const u of[-1,1]){const f=[],h=[],d=[];for(let x=0;x<=c;x++){const g=x/c;for(let m=0;m<=a;m++){const M=(m/a-.5)*n,S=Math.pow(Math.abs(M)/(n/2),5);f.push(M,e*(1-g)+s*S*(.35+.65*g),u*t*g*(1+.06*S));const v=(m%2?1:.72)*(x%2?1:.88)*(.8+.35*ut(M*.3,g*4+u,23));h.push(l[0]*v,l[1]*v,l[2]*v)}}for(let x=0;x<c;x++)for(let g=0;g<a;g++){const m=x*(a+1)+g;u>0?d.push(m,m+a+1,m+1,m+1,m+a+1,m+a+2):d.push(m,m+1,m+a+1,m+1,m+a+2,m+a+1)}const p=new Kt;p.setAttribute("position",new wt(new Float32Array(f),3)),p.setAttribute("color",new wt(new Float32Array(h),3)),p.setIndex(d),p.computeVertexNormals(),o.push(p.toNonIndexed())}return o.push(jt(new Ht(n+.3,.32,.42).translate(0,e+.05,0),r,.05)),qn(o)}function _A(n,t,e,i,s){const r=t/2,o=[];for(const c of[-1,1]){const l=c*n/2;c>0?o.push(l,e,-r,l,e+i,0,l,e,r):o.push(l,e,-r,l,e,r,l,e+i,0)}const a=new Kt;return a.setAttribute("position",new wt(new Float32Array(o),3)),a.computeVertexNormals(),jt(a,s,.08)}function MA(n,t,e,i=To){const r=t-4.4-.25,o=[_c(n,3.8,4.4,i,2.2,dg).translate(0,r,0)];for(let a=-n/2+2;a<=n/2-2;a+=3.2)for(const c of[-2.6,2.6])o.push(jt(new Je(.26,.3,r-e+6,6).translate(a,(r+e-6)/2,c),Zh,.15,a));return o.push(jt(new Ht(n-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),qn(o)}function yA(n,t={pillar:fg,wall:Yh,tile:To}){const e=[];for(const i of[-1,1])e.push(jt(new Ht(2.4,7-n+6,2.4).translate(i*11.2,(7+n-6)/2,0),t.pillar,.2,i)),e.push(jt(new Ht(3,.5,3).translate(i*11.2,7.2,0),[.85,.8,.7],.08,i));return e.push(jt(new Ht(22.4,1.6,1.6).translate(0,-.2,0),Zh,.12)),e.push(jt(new Ht(20,3.6,1.1).translate(0,2.4,0),t.wall,.1)),e.push(jt(new Ht(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(jt(new Ht(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(_c(27,2.2,4.4,t.tile,1.6).translate(0,5.3,0)),qn(e)}function bA(){const n=[po(jt(new Ht(.4,3.2,10).translate(0,0,0),fg,.22),-1.6,.6,.62),_c(10.2,.45,.35,To).rotateY(Math.PI/2).translate(0,1.6,0)];for(let t=-5;t<=5;t+=2.5)n.push(po(jt(new Ht(.7,3.7,.7).translate(0,.25,t),[.5,.27,.2],.15,t),-1.6,.6,.6)),n.push(jt(new Ht(.86,.26,.86).translate(0,2.2,t),[.9,.88,.82],.06,t));return qn(n)}const SA={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function pg(n=SA){const t=[jt(new Je(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),n.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([i,s,r,o],a)=>{const c=new vs(o,1).scale(1.15,.62,1.15).translate(i,s,r);c.deleteAttribute("uv"),c.computeVertexNormals();const l=c.getAttribute("position"),u=c.getAttribute("normal"),f=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const d=ut(l.getX(h)*.9+a,l.getZ(h)*.9,l.getY(h)+31),p=u.getY(h)+(d-.5)*.7,x=p<-.05?n.under[0]:p<.12?n.under[1]:d<.6?n.flower[0]:n.flower[1],g=Kh(x),m=.75+.35*Math.min(1,Math.max(0,(l.getY(h)-4.5)/4));f.set([g[0]*m,g[1]*m,g[2]*m],h*3)}c.setAttribute("color",new wt(f,3)),t.push(c)}),qn(t)}const wA=2600,mg=[.6,.58,.55],TA=[.3,.29,.31];function EA(){const n=(t,e,i,s)=>po(jt(new ls(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,i/e,1).translate(t,-4,0),[.42,.6,.28],.14,s),-4,i,.7);return qn([n(-62,70,62,11),n(62,64,56,12)])}function AA(){return qn([jt(new Ht(5,1.2,3).translate(0,.6,0),mg,.1,21),jt(new Ht(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),jt(new Je(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function RA(){const n=(e,i,s,r,o,a)=>[jt(new Ht(e,s,i).translate(r,s/2,o),[.7,.62,.5],.08,a),jt(new Je(.01,i*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(r,s+i*.17,o),TA,.08,a+1)],t=(e,i,s,r,o)=>jt(new Ht(e,4,i).translate(s,2,r),mg,.12,o);return qn([t(64,1.6,0,-22,31),t(64,1.6,0,22,32),t(1.6,44,-32,0,33),t(1.6,44,32,0,34),...n(30,12,11,0,8,35),...n(22,9,7,-14,-10,37),...n(22,9,7,14,-10,39)])}const Ap={"nui-doi":{geo:EA,scale:1},"bia-ma-pi-leng":{geo:AA,scale:2.2},"dinh-vua-meo":{geo:RA,scale:1.4}};function CA(){const n=new De,t=new Map,e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=ae.landmarks;if(!r?.length)return;const o=new Set,a=Yi(s);for(let c=a-1;c<=a+1;c++)r.forEach((l,u)=>{const f=c*Ge+l.phase-ri;if(f<s-300||f>s+wA)return;const h=c*16+u;if(o.add(h),e.has(h))return;let d=t.get(l.kind);d||t.set(l.kind,d=Ap[l.kind].geo());const p=new Xt(d,$h);ce(f,l.lat,0,i),p.position.set(i.x,Ze(i.x,i.z),i.z),p.rotation.y=hn(f)+(l.turn??0),p.scale.setScalar(Ap[l.kind].scale),p.matrixAutoUpdate=!1,p.updateMatrix(),n.add(p),e.set(h,p)});for(const[c,l]of e)o.has(c)||(n.remove(l),e.delete(c))}}}const gg={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},vg=.18;function Cl(n,t,e,i=0){const[s,r,o,a]=gg[n],c=Math.min(1,Math.max(0,t));return c<.5?e.set(s).lerp(new ct(r),c*2):e.set(r).lerp(new ct(o),(c-.5)*2),i>0?e.lerp(new ct(a),Math.min(1,i)):e}function PA(n,t,e=0){const i=n.y+(-.07-n.y)*Math.min(1,Math.max(0,t)*1.25)+vg*e,s=Math.hypot(n.x,i,n.z);return{x:n.x/s,y:i/s,z:n.z/s}}const Pl=900,LA=15e-6,NA=14e-5;function IA(n){const t=new ct(n);return`vec3(${t.r.toFixed(4)}, ${t.g.toFixed(4)}, ${t.b.toFixed(4)})`}function DA(){return Object.entries(gg).map(([n,t])=>`#define ATM_${n.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${t.map(IA).join(", ")})`).join(`
`)}function xg(n,t="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${t})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${DA()}
#define ATM_SUN_DIR normalize(vec3(${n.x.toFixed(5)}, mix(${n.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${vg.toFixed(3)} * atmMorn(), ${n.z.toFixed(5)}))

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
  return dist * (${LA.toExponential(3)} + density * avg);
}
`}function UA(n,t){qt.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,qt.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,qt.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${xg(t)}
#endif`,qt.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,n.fog=new Eh(new ct(0,0,0),NA)}function FA(n,t,e=0){n.fog.color.setRGB(t,e,0)}const kA=`
#include <fog_pars_vertex>
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,OA=`
#include <fog_pars_fragment>
${gc}
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
}`;function BA(n){const t=new P,e=new re({vertexShader:kA,fragmentShader:OA,defines:n?{CLOUD_LITE:1}:{},uniforms:gn.merge([lt.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new ot(0,1)}}]),transparent:!0,depthWrite:!1,fog:!0}),i=new Xt(new Wn(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return i.frustumCulled=!1,i.renderOrder=1,{mesh:i,update(s,r,o){const a=s.position;s.getWorldDirection(t),e.uniforms.uFwd.value.set(t.x,t.z).normalize();const c=o+250,l=Cn(c);i.position.set(a.x,Zl(c)+20+(Gn(c)-170-Zl(c)-20)*l,a.z),e.uniforms.uTime.value=r,e.uniforms.uCover.value=.62-.1*l+.5*(1-ae.cloud(ze(c)))}}}const Rp=120,_g=30,Mg=7,zA=Mg*(_g+2);function HA(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");for(let i=0;i<18;i++){const s=30+34*ut(i,4,7),r=128+(ut(i*1.7,1,3)-.5)*(240-2*s-20),o=140+(ut(1,i*2.3,5)-.5)*60-(s-30)*.6,a=t.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.fillRect(0,0,256,256)}const e=new Nh(n);return e.colorSpace=He,e}const GA=`
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
}`,VA=`
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
}`;function WA(n){const t=Math.max(10,Math.round(_g*n)),e=new re({vertexShader:GA,fragmentShader:VA,uniforms:gn.merge([lt.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:we,fog:!0});e.uniforms.uMap.value=HA();const i=new Be(new Wn(1,1),e,zA);i.frustumCulled=!1,i.count=0;const s=new Ot,r=new Ne,o=new P,a=new P;let c=Number.NaN;return{mesh:i,update(l){const u=Math.floor(l/Rp)-1;if(u===c)return;c=u;let f=0;for(let h=u;h<u+t+2;h++)for(let d=0;d<Mg;d++){const p=(h+ut(d*.7,h,91))*Rp,x=Cn(p),g=ut(h,d*1.3,92)<.5?-1:1,m=ut(d,h*1.9,93);let M,S,v;if(d<2)v=12+14*m,M=g*(16+v*.5+m*30*x),S=Ce(p)-10+ut(h,d,94)*12+16*zn(p);else{if(x<.5||d>3)continue;M=g*(120+m*500),S=Gn(p)-210-ut(h,d,95)*60,v=60+80*m}ce(p,M,0,o),Yu(o.x,o.z,p,M)&&(s.compose(o.set(o.x,S,o.z),r,a.set(v*1.6,v*.75,1)),i.setMatrixAt(f++,s))}i.count=f,i.instanceMatrix.needsUpdate=!0}}}const XA=`
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
}`,qA=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function Jh(n,t={}){const e=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*4),r=new Kt;r.setAttribute("position",new wt(e,3)),r.setAttribute("aSize",new wt(i,1)),r.setAttribute("aColor",new wt(s,4));const o=new re({vertexShader:XA,fragmentShader:qA,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:t.core??2.4}},transparent:!0,depthWrite:!1,blending:mn}),a=new ja(r,o);return a.frustumCulled=!1,a.renderOrder=4,{points:a,set(c,l,u,f,h,d,p,x,g){e[c*3]=l,e[c*3+1]=u,e[c*3+2]=f,i[c]=h,s[c*4]=d,s[c*4+1]=p,s[c*4+2]=x,s[c*4+3]=g},commit(c){r.setDrawRange(0,c);for(const l of["position","aSize","aColor"])r.getAttribute(l).needsUpdate=!0},setViewport(c,l){o.uniforms.uScale.value=c/(2*Math.tan(l*Math.PI/360)),t.maxFrac&&(o.uniforms.uMaxPx.value=Math.max(4,c*t.maxFrac))}}}const Bi=5,Ll=3,$A=.08,KA=3,YA=new ct("#ffd27a"),ZA=new ct("#9b8cff");function JA(){const n={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},t=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new Kt;return e.setAttribute("position",new Zt(t.flat().flatMap(i=>n[i]),3)),e}function QA(){const n=new rn({color:"#ffffff",blending:mn,transparent:!0,depthWrite:!1,side:we,fog:!1}),t=new Be(JA(),n,Bi);t.frustumCulled=!1,t.count=0;const e=Jh(Bi*(Ll+1),{maxFrac:.025,core:1.1}),i={z:0,x:0,v:0,ended:!1,after:0},s=new De;s.add(t,e.points);const r=Array.from({length:Bi},()=>new P),o=new Array(Bi).fill(0),a=new Array(Bi).fill(0),c=new Array(Bi).fill(0),l=new Array(Bi).fill(0),u=new Ot,f=new Ne,h=new ai(0,0,0,"YXZ"),d=new P,p={x:0,y:0,z:0},x=new P(1.25,1.25,1.25),g=new ct,m={group:s,setViewport:(M,S)=>e.setViewport(M,S),heads:r,alphas:o,owner:a,count:0,mode:"on",update(M,S,v,_,y){let w=0,b=0;const T=m.mode==="off"?[]:M.slice(0,Bi),A=Q0(T),C=new Set(T.map((D,N)=>[Math.abs(D.at.z-S.z),N]).filter(([,D])=>qu(D,S.z,A)>0).sort((D,N)=>D[0]-N[0]).slice(0,KA).map(([,D])=>D)),L=m.mode==="dim"?.5:1;T.forEach((D,N)=>{const{z:B,x:H,v:W,ended:j,after:O}=D.at,$=B-S.z,Q=_>0?(H-c[N])/_:0;if(c[N]=H,l[N]+=(Math.max(-.8,Math.min(.8,Q*.03))-l[N])*Math.min(1,_*10),$<-4)return;ce(B,H,W,d);const _t=j&&D.run.crash?O/.8:j?1:0,ft=Math.abs($)<10&&Math.abs(H-S.x)<3.2&&Math.abs(W-S.v)<3?.25:1,St=1-Math.min(1,Math.max(0,(Math.abs($)-220)/80)),Nt=Math.min(1,($+4)/4),zt=.15+.85*Math.min(1,Math.max(0,(d.distanceTo(y)-9)/6)),X=(D.self?.45:.3)*L*qu(N,S.z,A)*ft*St*Nt*zt*Math.max(0,1-_t);if(!(X<=.01)){h.set(-Math.atan(wi(B))+(j?O*9:0),hn(B),l[N]+(j?O*13:0)),u.compose(d,f.setFromEuler(h),x),t.setMatrixAt(w,u),g.copy(D.self?YA:ZA),C.has(N)&&e.set(b++,d.x,d.y,d.z,2.5,g.r,g.g,g.b,X*.9);for(let Y=1;Y<=Ll&&!j&&L===1&&C.has(N);Y++){Z0(D.track,v-Y*$A,i),ce(i.z,i.x,i.v,p);const yt=1-Y/(Ll+1);e.set(b++,p.x,p.y,p.z,1.8*yt,g.r,g.g,g.b,X*.55*yt)}t.setColorAt(w,g.multiplyScalar(X*1.6)),r[w].set(d.x,d.y+1.6,d.z),o[w]=X,a[w]=N,w++}}),t.count=w,e.commit(b),m.count=w,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}};return m}function jA(){const n=new S0;for(let t=0;t<10;t++){const e=t%2?.11:.28,i=t/10*Math.PI*2+Math.PI/2;t?n.lineTo(Math.cos(i)*e,Math.sin(i)*e):n.moveTo(Math.cos(i)*e,Math.sin(i)*e)}return new Bh(n)}function t3(){const n=new rn({color:new ct("#ffd76a").multiplyScalar(2.2),blending:mn,transparent:!0,depthWrite:!1,fog:!1}),t=new Be(jA(),n,3);t.frustumCulled=!1,t.count=0;const e=new Ot,i=new P,s=new P,r=new Ne;return{mesh:t,update(o,a,c,l){if(a<=0){t.count=0;return}const u=Math.min(1,a*3);l.getWorldQuaternion(r);for(let f=0;f<3;f++){const h=c*6+f*Math.PI*2/3;i.set(o.x+Math.cos(h)*.8,o.y+.9+Math.sin(h*2)*.1,o.z+.45+Math.sin(h)*.5),s.setScalar(u*(1+.25*Math.sin(c*14+f*2))),e.compose(i,r,s),t.setMatrixAt(f,e)}t.count=3,t.instanceMatrix.needsUpdate=!0}}}const Ju=6,Hs=3,Gs=28,os=Gs+1,Er=Ju*Hs*os*2,e3=[1.2,1.75,2.2],n3=Math.PI*2*.45,i3=2.4,s3=`
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
  }`,r3=`
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
  }`;function o3(){const n=new Kt,t=new Float32Array(Er*3),e=new Float32Array(Er*3),i=new Float32Array(Er),s=new Float32Array(Er),r=new Float32Array(Er),o=[];for(let h=0;h<Ju*Hs;h++)for(let d=0;d<os;d++){const p=(h*os+d)*2;s[p]=-1,s[p+1]=1,r[p]=r[p+1]=d/Gs,d<Gs&&o.push(p,p+1,p+2,p+1,p+3,p+2)}n.setAttribute("position",new wt(t,3)),n.setAttribute("aTan",new wt(e,3)),n.setAttribute("aGlow",new wt(i,1)),n.setAttribute("aSide",new wt(s,1)),n.setAttribute("aU",new wt(r,1)),n.setIndex(o);const a=new re({vertexShader:s3,fragmentShader:r3,uniforms:{uTime:{value:0},uWidth:{value:.16}},blending:mn,transparent:!0,depthWrite:!1,side:we}),c=new Xt(n,a);c.frustumCulled=!1,c.renderOrder=2;const l=new Map,u=new Float32Array(os*3),f={x:0,y:0,z:0};return{mesh:c,update(h,d,p){a.uniforms.uTime.value=d;const x=jv(h),g=h.gusts.find(M=>!M.taken&&!M.missed);let m=0;for(const M of h.gusts){if(m>=Ju||M.z+M.len<p-5||M.z>p+320)continue;M.taken&&!l.has(M.id)&&l.set(M.id,d);const S=M.taken?d-l.get(M.id):0,v=M.taken?Math.max(0,2.4*(1-S/.4)):M.missed?.18:M===g?1.5:.9;if(!(v<=0)){for(let _=0;_<Hs;_++){for(let w=0;w<os;w++){const b=w/Gs,T=_/Hs*Math.PI*2+b*n3+d*i3,A=e3[_];ce(M.z+b*M.len,pn(M.lane)+A*Math.cos(T),M.v+x+A*Math.sin(T),f),u[w*3]=f.x,u[w*3+1]=f.y,u[w*3+2]=f.z}const y=m*Hs+_;for(let w=0;w<os;w++){const b=Math.max(0,w-1),T=Math.min(Gs,w+1);for(let A=0;A<2;A++){const C=(y*os+w)*2+A;for(let L=0;L<3;L++)t[C*3+L]=u[w*3+L],e[C*3+L]=u[T*3+L]-u[b*3+L];i[C]=v}}}m++}}for(const M of l.keys())h.gusts.some(S=>S.id===M)||l.delete(M);n.setDrawRange(0,m*Hs*Gs*6);for(const M of["position","aTan","aGlow"])n.getAttribute(M).needsUpdate=!0;c.visible=m>0}}}function a3(){const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Nh(n)}const yg=new Wn(1,1).rotateX(-Math.PI/2),bg=new rn({map:a3(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function c3(n){const t=new Be(yg,bg,n);return t.count=0,t.frustumCulled=!1,t.renderOrder=1,t}function l3(n,t,e){const i=new Xt(yg,bg);return i.scale.set(n,1,t),i.position.y=e,i.renderOrder=1,i.updateMatrix(),i}const Qh=[.86,.66,.36],Sg=[.78,.58,.32],Mc=[.36,.34,.35],wg=[.3,.29,.3],Nl=[.58,.56,.53],u3={pillar:[.52,.5,.48],wall:Qh,tile:Mc},h3={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},f3=()=>pg(h3);function d3(){const n=[po(jt(new Ht(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let t=0;t<2;t++)for(let e=0;e<12;e++){const i=ut(e*.73,t*1.9,61),s=-4.6+(e+.5*t)*.76,r=new Ht(.95,.4+.22*i,.62+.3*i).rotateX((i-.5)*.35).rotateY((i-.5)*.4),o=.78+.34*ut(e,t,62);n.push(jt(r.translate(0,.25+t*.46,s),[Nl[0]*o,Nl[1]*o,Nl[2]*o],.12,e+t*13))}return qn(n)}const p3=[.3,.22,.19],Il=[.92,.9,.84],m3=[.8,.82,.85];function Tg(n,t){const e=[],i=new Ht(n.len,n.wallH+n.sink,n.width).translate(0,(n.wallH-n.sink)/2,0);e.push(po(jt(i,n.wall,.14,t),0,2.5,.72)),e.push(jt(new Ht(n.len+.08,.7,n.width+.08).translate(0,.25,0),[.5,.44,.36],.1,t)),e.push(jt(new Ht(n.len+.06,.45,n.width+.06).translate(0,n.wallH-.2,0),p3,.08,t)),e.push(_A(n.len,n.width,n.wallH,n.rise,n.wall)),e.push(_c(n.len+.6,n.width/2+.35,n.rise+.25,n.tile,0,n.crest?dg:void 0).translate(0,n.wallH-.2,0));const s=-n.width/2-.04;e.push(jt(new Ht(1.3,2.3,.08).translate(0,1.15,s+.01),Il,.06,t)),e.push(jt(new Ht(1,2,.1).translate(0,1,s-.02),Zh,.1,t)),e.push(jt(new Ht(1.8,.25,.34).translate(0,.12,s-.17),[.62,.58,.52],.08,t));for(let r=0;r<n.floors;r++){const o=1.5+r*3.1;for(const a of r===0?[-n.len/2+.85,n.len/2-.85]:[-.9,.9])e.push(jt(new Ht(.8,1,.1).translate(a,o,s),xA,.12,t+a));if(r>0&&n.balcony){const a=n.len*.78;e.push(jt(new Ht(a,.18,.4).translate(0,o-1.05,s-.2),[.7,.66,.6],.08,t)),e.push(jt(new Ht(a,.08,.08).translate(0,o-.15,s-.32),Il,.05,t));for(let c=0;c<=6;c++)e.push(jt(new Ht(.06,.82,.06).translate(-a/2+a*c/6,o-.55,s-.32),Il,.05,t))}}if(n.tank){const r=n.wallH+n.rise+.1;e.push(jt(new Je(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(n.len*.22,r+.45,0),m3,.12,t)),e.push(jt(new Ht(.9,.2,.7).translate(n.len*.22,r,0),[.4,.38,.36],.08,t))}return qn(e)}function g3(n,t,e=!1){const s=e?n%2?Sg:Qh:n%2?hg:Yh,r=e?n%3===2?wg:Mc:n%3===2?ug:To;return Tg({len:4.4,width:5.2,wallH:t-3.2-.3,rise:3.2,wall:s,tile:r,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},n*7.1)}function pa(n,t=!1){const e=t?n?Sg:Qh:n?hg:Yh,i=t?n?wg:Mc:n?ug:To;return Tg({len:8-n,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:i,floors:1,sink:2.5,tank:!t,crest:!1,balcony:!t},3+n)}const as=250,Cp=1,v3=6,jh={value:1},x3=xc({lift:jh,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),_3=xc({lift:jh,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Dl(n,t,e){return ce(n,t,0,e),e.y=Ze(e.x,e.z),e}function M3(n,t){const e=[],i=n*as;if(Math.max(zn(i),zn(i+as/2),zn(i+as))===0)return e;const s=new P,r=yo()>.5?4:0,o=(a,c)=>zn(a)>.3&&c.y<Ce(a)-6&&c.y>Ce(a)-14;for(let a=0;a<t;a++){const c=i+ut(a*.77,n,81)*as,u=(ut(n,a*.41,82)<.5?-1:1)*(18+Math.pow(ut(a*.53,n*1.3,83),1.8)*190);o(c,Dl(c,u,s))&&e.push({p:s.clone(),r:ut(a,n,84)*6.28,s:.8+.5*ut(n,a,85),kind:r})}for(let a=0;a<2;a++){const c=i+(.25+.5*a)*as+(ut(n,a,86)-.5)*60,u=(ut(n*1.7,a,87)<.5?-1:1)*(24+ut(n,a*3.1,88)*90);for(let f=0;f<7;f++){const h=c+(ut(f,n+a,89)-.5)*70,d=u+(ut(f*1.9,n+a,90)-.5)*50;if(Math.abs(d)<17||!o(h,Dl(h,d,s)))continue;const p=hn(h)+(d>0?Math.PI/2:-Math.PI/2)+(ut(f,a,91)-.5)*.5;e.push({p:s.clone(),r:p,s:1,kind:r+1+f%2})}}for(let a=0;a<2;a++){const c=a?1:-1,l=i+ut(n,a,92)*(as-60),u=3+Math.floor(ut(n,a*2.3,93)*4);for(let f=0;f<u;f++){const h=l+f*10.2;o(h,Dl(h,c*13.5,s))&&e.push({p:s.clone(),r:hn(h),s:1,kind:r+3})}}return e}function y3(n){const t=Cp+Math.max(3,Math.round(v3*n))+1,e=Math.round(34*Math.max(.5,n)),i=new De,s=[pg(),pa(0),pa(1),bA(),f3(),pa(0,!0),pa(1,!0),d3()],r=[34,7,7,12,34,7,7,12].map(m=>m*t),o=s.map((m,M)=>{const S=new Be(m,x3,r[M]);return S.count=0,S.frustumCulled=!1,i.add(S),S}),a=c3(r.reduce((m,M)=>m+M,0));i.add(a);const c=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11]],l=new Map,u=new Ot,f=new Ne,h=new P(0,1,0),d=new P,p=new P;let x=Number.NaN;const g=()=>{const m=s.map(()=>0);let M=0;for(let S=x;S<x+t;S++){let v=l.get(S);v||l.set(S,v=M3(S,e));for(const _ of v){const y=o[_.kind];if(m[_.kind]>=r[_.kind])continue;u.compose(_.p,f.setFromAxisAngle(h,_.r),d.set(_.s,_.s,_.s)),y.setMatrixAt(m[_.kind]++,u);const[w,b]=c[_.kind];u.compose(d.set(_.p.x,_.p.y+.12,_.p.z),f,p.set(w*_.s,1,b*_.s)),a.setMatrixAt(M++,u)}}for(const S of[...l.keys()])(S<x-1||S>x+t)&&l.delete(S);o.forEach((S,v)=>{S.count=m[v],S.visible=S.count>0,S.instanceMatrix.needsUpdate=!0}),a.count=M,a.instanceMatrix.needsUpdate=!0};return{group:i,update(m,M){const S=Math.floor(m/as)-Cp;S!==x&&(x=S,g()),jh.value=1-.6*Math.min(1,Math.max(0,(M-.4)/.5))}}}const Pp=ae.tower.phase,b3=1,S3=2600;function Lp(n,t,e){const i=[],s=o=>{const a=Math.PI/2+o*Math.PI/5,c=o%2?.382:1;return[Math.cos(a)*n*c,Math.sin(a)*n*c]};for(let o=0;o<10;o++){const[a,c]=s(o),[l,u]=s(o+1);i.push(0,0,t,a,c,t,l,u,t)}const r=new Kt;return r.setAttribute("position",new wt(new Float32Array(i),3)),r.computeVertexNormals(),jt(r,e,.04)}function w3(){const n=[.62,.6,.56],t=[jt(new Je(3.6,4.6,28,8).translate(0,8,0),n,.12,2),jt(new Je(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),jt(new Je(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=jt(new Ht(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return qn([...t,e,Lp(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),Lp(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function Np(n){const t=Ql(n)+(n===1?Ql(2):_o);let e=Math.floor((t+ri-Pp)/Ge)*Ge+Pp-ri;for(e>=t&&(e-=Ge);zn(e)>0;)e-=Ge;return e}function T3(){const n=new Xt(w3(),$h);n.visible=!1,n.matrixAutoUpdate=!1;let t=Number.NaN;const e=new P,i=new P,s=r=>{const{latMin:o,latMax:a,mirror:c}=ae.tower,l=b3*(c&&Yi(r)%2!==0?-1:1);i.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let f=o;f<=a;f+=20)ce(r+u,l*f,0,e),e.y=Ze(e.x,e.z),e.y>i.y&&i.copy(e);n.position.copy(i),n.rotation.y=-.6,n.scale.setScalar(2),n.updateMatrix()};return{mesh:n,update(r){if(Va()!=="ha-giang"){n.visible=!1;return}const o=Wm(r),a=Np(o),c=Np(o+1),l=Math.abs(r-a)<Math.abs(r-c)?a:c;n.visible=Math.abs(r-l)<S3,n.visible&&l!==t&&(t=l,s(l))}}}const mo=12,sc={uPools:{value:Array.from({length:mo},()=>new de)},uPoolCount:{value:0},uPoolNight:{value:0}},E3=`
uniform vec4 uPools[${mo}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${mo}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let rc=0,Eg=mo;function A3(n){Eg=Math.max(0,Math.min(mo,Math.round(n)))}function R3(){rc=0}function Qu(n,t,e,i,s){rc>=Eg||s>330||t-Ze(n,e)>28||sc.uPools.value[rc++].set(n,t,e,i)}function C3(n){sc.uPoolCount.value=rc,sc.uPoolNight.value=n}const Os=14,Ul=9.5,Fl=3.4,P3=.9,ma=7,Ip=4,kl=13,Dp=30,Up=420,Fp=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],L3=[-1,1];function N3(n,t){for(const e of n.obstacles)if(Math.abs(e.z-t)<9)return!0;return!1}function I3(){const n=Math.ceil((Up+Dp)/Os)+2,t=Jh(n*(2*ma)+Math.ceil(n/Ip)*kl),e={x:0,y:0,z:0};return{points:t.points,setViewport:(i,s)=>t.setViewport(i,s),update(i,s,r,o){const a=Math.min(1,Math.max(0,(r-.38)/.35));let c=0,l=0;if(a>.01){const u=Math.floor((i.z-Dp)/Os),f=Math.floor((i.z+Up)/Os);for(let h=u;h<=f;h++){const d=h*Os;if(!(zn(d)<.97||zn(d+Os)<.97)){for(const p of L3)for(let x=0;x<ma;x++){const g=(x+.5)/ma;ce(d+g*Os,p*Ul,-Hr+Fl-4*g*(1-g)*P3,e);const m=Fp[((h*ma+x)%3+3)%3],M=.82+.18*Math.sin(s*3.1+h*1.7+x*2.3+p);t.set(c++,e.x,e.y,e.z,.6,m[0],m[1],m[2],a*M)}if(!(h%Ip!==0||N3(i,d))){l<3&&d>i.z-10&&(ce(d,0,-Hr+Fl,e),Qu(e.x,e.y,e.z,1.5,d-o),l++);for(let p=0;p<kl;p++){const x=(p+.5)/kl;ce(d,-Ul+x*2*Ul,-Hr+Fl+.3-4*x*(1-x)*1.3,e);const g=Fp[p%3];t.set(c++,e.x,e.y,e.z,.6,g[0],g[1],g[2],a*(.85+.15*Math.sin(s*2.7+p)))}}}}}t.commit(c)}}}function D3(){const n=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([t,e])=>new ot(t,e));return new So(n,16)}function U3(){return new Wn(1,1,1,6).translate(0,.5,0)}function F3(n){return new re({uniforms:{uTime:n},side:we,vertexShader:`
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
}`})}function k3(n){return new re({uniforms:{...gn.merge([lt.fog]),uTime:n},transparent:!0,depthWrite:!1,side:we,fog:!0,vertexShader:`
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
}`})}function O3(){const n=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([t,e])=>new ot(t*1.45,e*1.45));return new So(n,14)}function B3(){const n=[];for(let t=0;t<=8;t++){const e=t/8*Math.PI*.5;n.push(new ot(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new So(n,16)}const Ag=`
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
}`,z3=`
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
}`,H3=`
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
}`;function G3(){return new re({vertexShader:Ag,fragmentShader:z3,side:we,uniforms:{uTime:{value:0}}})}function V3(){return new re({vertexShader:Ag,fragmentShader:H3,side:we})}function Zr(n,t,e){return e.setRGB(n,t%1,0)}const Ol=2.1,oc=8,zi=8,W3=46,X3=n=>new re({uniforms:{uTime:n},vertexShader:`
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
}`,transparent:!0,blending:mn,depthWrite:!1});function q3(n){const t=new Be(new zh(Ol,.12,6,36),new rn({color:new ct("#ffb04a").multiplyScalar(.95)}),zi),e=new Be(B3(),V3(),zi),i=new Be(new Je(1,.55,1,12,1,!0).translate(0,.5,0),X3(n),zi*3),s=new Be(D3(),F3(n),zi),r=new Be(U3(),k3(n),zi),o=new ct,a=[t,e,i,s,r];for(const S of a)S.frustumCulled=!1,S.count=0;e.setColorAt(0,Zr(1,0,o)),i.setColorAt(0,o.setRGB(0,0,0)),r.setColorAt(0,o),r.renderOrder=3;const c=new Ot,l=new Ne,u=new Ne,f=new Ne,h=new P,d=new P;let p=0,x=0,g=0,m=0;const M=(S,v,_,y,w,b,T,A)=>{if(g>=i.instanceMatrix.count)return;const C=1-Math.min(1,Math.max(0,(w-450)/150));c.compose(h.set(S,v,_),l.identity(),d.set(y,W3,y)),i.setMatrixAt(g,c),i.setColorAt(g++,o.setRGB(b*C,T*C,A*C))};return{meshes:a,begin(){p=x=g=m=0},draw(S,v,_,y,w,b,T,A){const C=1+1.6*Math.min(1,Math.max(0,(w-30)/90));if(S.kind==="thermal"&&p<zi){u.setFromAxisAngle(h.set(0,1,0),Math.sin(b*1.3+S.id)*.45),c.compose(h.set(v,_,y),u,d.set(C,C,C)),t.setMatrixAt(p++,c);for(let L=0;L<oc;L++){const D=b*1.8+L/oc*Math.PI*2;h.set(Math.cos(D)*Ol*C,Math.sin(D)*Ol*C,0).applyQuaternion(u),A.body(v+h.x,_+h.y-.5*C,y+h.z,.36*C,1.15,L*.31+S.id*.1),A.glow(v+h.x,_+h.y-.85,y+h.z,.8+1.4*T,1,.7,.28,.85)}A.glow(v,_,y,(6+6*T)*C*.8,1,.7,.25,.45),M(v,_-1,y,1.5*C,w,1.4,.95,.38);for(let L=0;L<6;L++){const D=(b*.9+L/6)%1,N=L*2.1+S.id;A.glow(v+Math.cos(N)*1.1*C,_-2.4+D*4.8*C,y+Math.sin(N)*.6,.9*C,1,.8,.35,Math.sin(D*Math.PI)*.9)}}else if(S.kind==="shield"&&x<zi){l.setFromAxisAngle(h.set(0,0,1),Math.sin(b*1.7+S.id)*.3),c.compose(h.set(v,_+.9*C+.5*Math.sin(b*2.3+S.id),y),l,d.set(1.5*C,1.5*C,1.5*C)),e.setColorAt(x,Zr(1,0,o)),e.setMatrixAt(x++,c),A.glow(v,_,y,(3+5*T)*C*.8,.3,.95,.9,.55),M(v,_+.4,y,1.3*C,w,.25,1.1,.95);for(let L=0;L<6;L++){const D=(b*.6+L/6)%1,N=b*2+L*1.05;A.glow(v+Math.cos(N)*.9*C,_+1+D*16*C,y+Math.sin(N)*.9*C,1.1*C,.35,1,.92,Math.sin(D*Math.PI)*.85)}}else if(S.kind==="smoke"&&m<zi){l.setFromAxisAngle(h.set(0,1,0),b*1.6+S.id).premultiply(u.setFromAxisAngle(h.set(0,0,1),Math.sin(b*2.1+S.id)*.22));const L=1.6*C,D=_+.5*C+.35*Math.sin(b*2.6+S.id);c.compose(h.set(v,D,y),l,d.set(L,L,L)),s.setMatrixAt(m,c),h.set(0,L,0).applyQuaternion(l);const N=v+h.x,B=D+h.y,H=y+h.z;c.compose(h.set(N,B,H),f,d.set(6*C,13*C,1)),r.setMatrixAt(m,c),r.setColorAt(m++,o.setRGB(1-Math.min(1,Math.max(0,(w-450)/150)),S.id*.137%1,0)),A.glow(N,B,H,(1.2+2*T)*C,1,.55,.42,.9),A.glow(v,_,y,(3+5*T)*C*.8,1,.3,.62,.5),M(v,_+.4,y,.9*C,w,1.15,.22,.55);for(let W=0;W<5;W++){const j=(b*2.4+W/5)%1,O=W*2.4+S.id;A.glow(N+Math.cos(O)*j*.8*C,B+j*2.2*C,H+Math.sin(O)*j*.8*C,.5*C,1,.75,.4,(1-j)*.9)}}},commit(){t.count=p,e.count=x,i.count=g,s.count=r.count=m;for(const S of a)S.instanceMatrix.needsUpdate=!0,S.instanceColor&&(S.instanceColor.needsUpdate=!0)}}}const Un={x:0,y:0,z:0},Bl=260,kp=1600,Op=220,ga=3200;function $3(n){const t=Math.round(kp*n),e=new De,i=G3(),s=new Be(O3(),i,Bl+8*oc);s.frustumCulled=!1;const r=q3(i.uniforms.uTime),o=Jh(Bl+kp+Op+8*(oc+7)+56);e.add(s,...r.meshes,o.points);const a=new ct;s.setColorAt(0,Zr(1,0,a));const c=[],l=new Map,u=new Ot,f=new Ne,h=new P,d=new P(1,1,1),p=new Ne;let x=0,g=0;const m={body(M,S,v,_,y,w){x>=s.instanceMatrix.count||(u.compose(h.set(M,S,v),f.identity(),d.set(_,_,_)),s.setColorAt(x,Zr(y,w,a)),s.setMatrixAt(x++,u))},glow:(M,S,v,_,y,w,b,T)=>o.set(g++,M,S,v,_,y,w,b,T)};return{group:e,setViewport:(M,S)=>o.setViewport(M,S),burst(M,S,v,_,y){for(let w=0;w<_&&c.length<Op;w++){const b=Math.random()*Math.PI*2,T=Math.random()*2-1,A=6+Math.random()*10;c.push({x:M,y:S,z:v,vx:Math.cos(b)*A*Math.sqrt(1-T*T),vy:T*A+3,vz:Math.sin(b)*A*Math.sqrt(1-T*T),life:y?.7:1})}},update(M,S,v,_,y){x=0,g=0,i.uniforms.uTime.value=S,r.begin();for(const T of M.pickups){if(T.z-M.z>600||x>=Bl)continue;ce(T.z,pn(T.lane),T.v+Math.sin(S*2.4+T.id)*.45,Un);let A=Un.x,C=Un.y,L=Un.z,D=T.z,N=1;if(T.taken){const H=l.get(T.id)??S;l.set(T.id,H);const W=(S-H)/.6;if(W>=1)continue;D=M.z+4+W*10,ce(D,pn(T.lane),T.v,Un),A=Un.x,L=Un.z,C=Un.y+W*W*14,N=1-W}const B=Math.min(1,Math.max(0,(T.z-M.z-40)/210));N*=Math.min(1,Math.max(0,(D-y-2)/6)),!(N<=0)&&(T.kind==="lantern"?(f.setFromAxisAngle(h.set(0,1,0),S*.8+T.id).multiply(p.setFromAxisAngle(h.set(0,0,1),Math.sin(S*1.9+T.id)*.12)),u.compose(h.set(A,C,L),f,d.set(N,N,N)),s.setColorAt(x,Zr(1,T.id*.137,a)),s.setMatrixAt(x++,u),o.set(g++,A,C-.9*N,L,1.4+3.2*B+1.2*_,1,.62,.22,(.75+.25*_)*N),!T.taken&&T.z>M.z-15&&Qu(A,C-.9,L,1,T.z-y)):T.taken||(T.kind==="thermal"&&Qu(A,C,L,1.6,T.z-y),r.draw(T,A,C,L,T.z-M.z,S,B,m)))}for(const T of l.keys())M.pickups.some(A=>A.id===T)||l.delete(T);s.count=x,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.commit();const w=Math.min(t,Math.floor(t*(.12+.88*_)));for(let T=0;T<w;T++){const A=ut(T*.37,1.7,81)*ga,C=y-300+((A-y+300)%ga+ga)%ga,L=Cn(C);if(L<.35)continue;const D=ut(T,2.9,82)<.5?-1:1;ce(C,D*(30+Math.pow(ut(T,3.3,83),1.5)*1400),0,Un);const N=(S*(2+3*ut(T,4.1,84))+ut(T,5.3,85)*700)%700,B=Gn(C)-380+N+Math.sin(S*.5+T)*2,H=L*Math.min(1,N/60)*(1-Math.max(0,N-600)/100);o.set(g++,Un.x,B,Un.z,2.6,1,.5+.1*Math.sin(T),.16,H*(.35+.65*_))}const b=hn(M.z);for(let T=c.length-1;T>=0;T--){const A=c[T];if(A.life-=v*1.6,A.life<=0){c.splice(T,1);continue}A.vy-=9*v,A.x+=A.vx*v,A.y+=A.vy*v,A.x+=Math.sin(b)*M.speed*.85*v,A.z+=(A.vz+Math.cos(b)*M.speed*.85)*v,o.set(g++,A.x,A.y,A.z,.7*A.life+.2,1,.7,.3,A.life)}o.commit(g)}}}const _n=40;function K3(n){const t=[];for(let e=n.bottom;e<n.top;){t.push(e);const i=Math.min(Math.abs(e-n.bandLo),Math.abs(e-n.bandHi),e>n.bandLo&&e<n.bandHi?0:99);e+=Math.min(10,1.2+i*.12)}return t.push(n.top),t}function Y3(n){const t=K3(n),e=[],i=[],s=[];for(const l of t){const u=l>=n.bandLo-.01&&l<=n.bandHi+.01,f=u?n.rc:n.radius(l),h=Math.min(1,Math.max(0,(n.radius(l+6)-f)/(f*.6)));for(let d=0;d<_n;d++){const p=d/_n*Math.PI*2,x=Math.cos(p),g=Math.sin(p),m=ut(x*1.4+n.seed*7.1,g*1.4+l/26,31)-.5,M=ut(x*4+n.seed,g*4+l/5,32)-.5,S=Math.max(0,Math.sin((l/7+ut(x,g,n.seed)*2)*Math.PI))**6*.12;let v=f*(1+.42*m+.12*M+S);u&&(v=n.rc*(.9+.1*(M+.5)));const _=Math.pow(.5+.5*Math.sin(p*9+m*5+n.seed+l/40),5),y=Math.pow(Math.max(0,Math.sin((l/4.6+ut(x*2,g*2,n.seed+9)*1.5)*Math.PI)),10),w=.1*_+.09*y;v*=1-w,e.push(x*v,l,g*v),s.push(Math.min(.85,Math.max(0,(1-v/f)*1.6)+w*2.5+h*.55)),i.push(n.crest&&l>n.top-.7?1:0)}}e.push(0,n.top+(n.crest?0:2.5),0),i.push(n.crest?1:0),s.push(0);const r=[];for(let l=0;l<t.length-1;l++)for(let u=0;u<_n;u++){const f=l*_n+u,h=l*_n+(u+1)%_n;r.push(f,f+_n,h,h,f+_n,h+_n)}const o=t.length*_n,a=(t.length-1)*_n;for(let l=0;l<_n;l++)r.push(a+l,o,a+(l+1)%_n);const c=new Kt;return c.setAttribute("position",new wt(new Float32Array(e),3)),c.setAttribute("aCrest",new wt(new Float32Array(i),1)),c.setAttribute("aShade",new wt(new Float32Array(s),1)),c.setIndex(r),c.computeVertexNormals(),c}function Z3(n,t){const e=[],i=new ct;for(let s=0;s<t;s++){const r=s<Math.ceil(t*.6),o=r?n.top-1.5-3*ut(s,n.seed,41):n.bandLo-6-40*ut(n.seed,s,42),a=n.seed*2.3+s*2.39,c=r?n.radius(o)*.75*ut(s,n.seed,43):n.radius(o)*.95,l=.35+.35*ut(s*1.3,n.seed,44),u=(ut(s,n.seed*3,45)<.45?ag():cg()).clone();u.scale(l,l*1.1,l).rotateY(a).translate(Math.cos(a)*c,o,Math.sin(a)*c),i.setHSL(.24+.06*ut(s,7,n.seed),.3,.55);const f=u.getAttribute("color");if(f)for(let h=0;h<f.count;h++)f.setXYZ(h,f.getX(h)*i.r*2,f.getY(h)*i.g*2,f.getZ(h)*i.b*2);e.push(u)}return ui(e)}function J3(n,t){const e=46+10*ut(n,1,51);return{seed:n,rc:t,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:i=>i<-6.5?t+.3*Math.pow(-6.5-i,.9):(t+.32*(i-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-i)/7)))}}function Q3(n,t){return{seed:n,rc:t,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,radius:e=>t+.28*Math.pow(Math.max(0,-6.5-e),.92)}}const vi=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2];function Bp(n,t,e){const i=new Ht(n,1,7.6,Math.max(10,Math.round(n/2)),36,4).translate(0,.5,0),s=i.getAttribute("position"),r=new Float32Array(s.count);for(let a=0;a<s.count;a++){const c=s.getX(a),l=s.getY(a),u=s.getZ(a),f=Math.min(1,Math.max(0,(Math.abs(c)-9)/4)),h=t(c)-(1-f)*.6*ut(c*.5,u,3)-f*1.6*(ut(c*.3,u*.2,3)-.3),d=e(c)-10*ut(c*.06,1,4),p=d+(h-d)*l,x=1+.6*Math.max(0,Math.min(1,-p/40)),g=((p+3*ut(c*.04,0,7))/5.5%1+1)%1,m=2.4*(kn(c*.07,p*.06,3,9)-.5),M=Math.min(1,Math.max(0,(h-p-.6)/2.4),Math.max(0,(p-d)/3)),S=(1.3*(1-g)-.65+m)*M;r[a]=M*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(g-.5)/.5)+.35*Math.max(0,-m));const v=u*x*(1+.3*(ut(c*.2,p*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*S;s.setXYZ(a,c*(1+.04*(ut(p*.1,u,6)-.5)),p,v)}const o=new Float32Array(s.count);for(let a=0;a<s.count;a++)o[a]=Math.abs(s.getX(a))<12&&s.getY(a)>.3?1:0;return i.setAttribute("aCrest",new wt(o,1)),i.setAttribute("aShade",new wt(r,1)),i.computeVertexNormals(),i}function is(n,t,e=()=>0){const i=n.getAttribute("position"),s=new Float32Array(i.count*3),r=new Float32Array(i.count);for(let o=0;o<i.count;o++)s.set(t,o*3),r[o]=e(i.getY(o));return n.setAttribute("color",new wt(s,3)),n.setAttribute("aSway",new wt(r,1)),n}function j3(n,t){const e=[],i=vi([.6,.42,.27]),s=c=>10.2-2.2*(1-(2*c/n)**2);for(let c=-n/2;c<n/2;c+=.9)e.push(is(new Ht(.8,.22,3).translate(c,-.55,0).toNonIndexed(),i));if(t)for(const c of[-n/2,n/2])e.push(is(new Ht(1.2,260,1.2).translate(c,-118,0).toNonIndexed(),i));for(const c of[-1.5,1.5]){e.push(is(new Ht(n,.08,.08).translate(0,1.2,c).toNonIndexed(),i));const l=Array.from({length:13},(u,f)=>new P(-n/2+f/12*n,0,c*.3)).map(u=>u.setY(s(u.x)));e.push(is(new fc(new kh(l),24,.07,4).toNonIndexed(),i))}const r=[vi([.86,.12,.1]),vi([.98,.72,.12]),vi([.86,.12,.1]),vi([.95,.88,.7]),vi([.2,.55,.3]),vi([.2,.4,.75])];let o=0;for(let c=-n/2+.6;c<n/2;c+=1.15,o++){const l=s(c)-.05,u=Math.min(l-1.5,5.4+2.2*ut(c,2,8)+(o%3===0?1.3:0)),f=new Wn(.62,u,2,6),h=f.getAttribute("position");for(let p=0;p<h.count;p++){const x=(u/2-h.getY(p))/u;h.setX(p,h.getX(p)*(1-.15*x)),x>.99&&Math.abs(h.getX(p))<.01&&h.setY(p,h.getY(p)+.5)}f.rotateY((ut(c,5,9)-.5)*.9).translate(c,l-u/2,o%2?.25:-.25);const d=r[Math.floor(ut(c*1.7,3,10)*r.length*.999)];e.push(is(f.toNonIndexed(),d,p=>Math.min(1,Math.max(0,(l-p)/u))))}for(let c=-n/2+2.3;c<n/2-1;c+=4.6){const l=s(c)-.75;e.push(is(new Je(.34,.34,.66,8).translate(c,l,-.6).toNonIndexed(),vi([.95,.16,.08]),()=>.3)),e.push(is(new Je(.2,.2,.1,8).translate(c,l+.38,-.6).toNonIndexed(),vi([.98,.75,.25]),()=>.3))}const a=ui(e);return a.computeVertexNormals(),a}const Ar=2.9,tR=-1.25;function eR(n,t,e,i){const s=Ar+t,r=new Ht(s,1,6.8,Math.max(6,Math.round(s/3)),8,3).translate(s/2-Ar,.5,0),o=r.getAttribute("position"),a=new Float32Array(o.count);for(let c=0;c<o.count;c++){const l=o.getX(c),u=o.getY(c),f=o.getZ(c),h=Math.min(1,Math.max(0,(l+Ar)/Math.max(1,s))),d=9+(e-9)*Math.pow(h,.7)+6*(kn(l*.08,f*.1+i,3,31)-.5),p=l>Ar?(l-Ar)*.35+.8*ut(l*.4,f*.5+i,5):0,x=tR+p,g=x+(d-x)*u,m=1.6*(kn(l*.09+i,g*.07,3,37)-.5)*Math.min(1,u*6);a[c]=Math.max(0,.6-u*3)*.8,o.setXYZ(c,l*n,g,f*(1+.15*Math.min(1,g/30))+Math.sign(f)*m)}if(r.setAttribute("aShade",new wt(a,1)),r.setAttribute("aCrest",new wt(new Float32Array(o.count),1)),n<0){const c=r.getIndex();for(let l=0;l<c.count;l+=3){const u=c.getX(l+1);c.setX(l+1,c.getX(l+2)),c.setX(l+2,u)}}return r.computeVertexNormals(),r}const nR=new re({uniforms:{...er},vertexShader:`
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
${vc}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:Qe,transparent:!0,depthWrite:!1}),zp=(n,t,e)=>`${Math.round(n*50)},${Math.round(t*50)},${Math.round(e*50)}`;function iR(n){if(n.getAttribute("aOutline"))return n;const t=n.getAttribute("position"),e=n.getAttribute("normal"),i=new Map;for(let r=0;r<t.count;r++){const o=zp(t.getX(r),t.getY(r),t.getZ(r)),a=i.get(o)??[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),i.set(o,a)}const s=new Float32Array(t.count*3);for(let r=0;r<t.count;r++){const o=i.get(zp(t.getX(r),t.getY(r),t.getZ(r))),a=Math.hypot(o[0],o[1],o[2]);s.set(a>1e-6?[o[0]/a,o[1]/a,o[2]/a]:[0,1,0],r*3)}return n.setAttribute("aOutline",new wt(s,3)),n}function Or(n){const t=new Xt(iR(n),nR);return t.userData.hazardHull=!0,t}function sR(n,t){n&&(n.visible=t>5&&t<105)}const va=V2(),rR=$h,Rg={value:1},Cg={value:0},tf=new ir({vertexColors:!0,side:we});tf.onBeforeCompile=n=>{n.uniforms.uLift=Rg,n.uniforms.uTime=Cg,Object.assign(n.uniforms,er),n.vertexShader=`attribute float aSway;
uniform float uTime;
${n.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),n.fragmentShader=`uniform float uLift;
${vc}${n.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};tf.customProgramCacheKey=()=>"cloth-hazard";const Pg=(n,t)=>({rock:Y3(n),trees:Z3(n,t)}),Hp=[0,1,2,3,4,5,6,7].map(n=>Pg(J3(n*1.7+.3,Ki.pillar.halfX),9)),Gp=[0,1,2].map(n=>Pg(Q3(n*2.3+.7,Ki.spike.halfX),4)),Vp=new Map;function oR(n,t){const e=Math.ceil(n/4)*4,i=`${e}:${t}`;let s=Vp.get(i);return s||Vp.set(i,s=j3(e,t)),s}const Wp=new Map;function zl(n,t){let e=Wp.get(n);return e||Wp.set(n,e=t()),e}function aR(n,t){const e=Ce(n.z),i=n.kind==="ridge"||n.kind==="bridge";ce(n.z,i?0:pn(n.lane),0,t);const s=Math.round((Ze(t.x,t.z)-e)*2)/2,r=u=>new Xt(u,_3).add(Or(u)),o=yo()>.5,a=o?"hg":"";if(n.kind==="ridge")return r(zl(`${a}d${s}`,()=>MA(26,1,s,o?Mc:void 0)));if(n.kind==="bridge")return r(zl(`${a}g${s}`,()=>yA(s,o?u3:void 0)));const c=n.id%3,l=r(zl(`${a}h${c}:${s}`,()=>g3(c,1-s,o)));return l.position.y=s,l.updateMatrix(),new De().add(l,l3(8,9,s+.12))}function cR(){const n=new De,t=new Map,e={x:0,y:0,z:0},i=s=>{const r=Ys(s.z);let o;if($i(s.z))o=aR(s,e);else if(s.kind==="pillar"||s.kind==="spike"){const l=(s.kind==="pillar"?Hp:Gp)[s.id%(s.kind==="pillar"?Hp.length:Gp.length)];o=new De().add(new Xt(l.rock,va).add(Or(l.rock)),new Xt(l.trees,rR))}else if(s.kind==="ridge"){const l=Ce(s.z),u=s.open?64:2*r+18,f=new Map,h=g=>{let m=f.get(g);return m===void 0&&f.set(g,m=Ze(ce(s.z,g,0,e).x,e.z)-l),m},d=u/2-20,p=g=>Math.min(1,Math.abs(g)/d),x=s.open?Bp(u,g=>1+Math.max(0,Math.abs(g)-d)*2.2,g=>Math.abs(g)<d?-16-70*p(g)**6:h(g)-12):Bp(u,g=>Math.abs(g)<10?1:Math.max(1,h(g)+3),g=>h(g)-12);o=new Xt(x,va).add(Or(x)),o.userData.own=!0}else if(s.kind==="overhang"){const l=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,u=eR(l,Math.max(8,r+18-Math.abs(pn(s.lane))),70,s.id%97);o=new Xt(u,va).add(Or(u)),o.userData.own=!0}else{const l=oR(s.open?46:2*r+18,s.open);o=new Xt(l,tf).add(Or(l))}const a=s.kind==="ridge"||s.kind==="bridge";ce(s.z,a?0:pn(s.lane),0,e),o.position.set(e.x,e.y,e.z);const c=a||$i(s.z)||s.kind==="overhang";return o.rotation.y=hn(s.z)+(c?0:s.id*2.39),c||o.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),o.matrixAutoUpdate=!1,o.updateMatrix(),o.traverse(l=>{l.matrixAutoUpdate=!1,l.updateMatrixWorld(),l.userData.hazardHull&&(o.userData.hull=l)}),n.add(o),o};return{group:n,update(s,r,o){Cg.value=r;const a=Math.min(1,Math.max(0,(o-.4)/.5));Rg.value=1-.75*a,va.uniforms.uLift.value=1-.45*a;const c=new Set;for(const l of s.obstacles){c.add(l.id);let u=t.get(l.id);u||t.set(l.id,u=i(l)),sR(u.userData.hull,l.z-s.z)}for(const[l,u]of t)c.has(l)||(n.remove(u),u.userData.own&&u.geometry.dispose(),t.delete(l))}}}function lR(n){const t=new Pi({map:n,roughness:.8,side:we}),e={uTime:{value:0},uFlutter:{value:1}};return t.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},t.userData.setTime=(i,s)=>{e.uTime.value=i,e.uFlutter.value=s},t}const xa=new Pi({color:"#a8141c",roughness:.55}),uR=new Pi({color:"#f6f4ef",roughness:.18,metalness:.05}),hR=new Pi({color:"#15161c",roughness:.08,metalness:.6}),Hl=new Pi({color:"#1c1d22",roughness:.75});function _a(n,t,e,i){const s=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=new Xt(new Ih(e,s,4,10),i);return r.position.set((n[0]+t[0])/2,(n[1]+t[1])/2,(n[2]+t[2])/2),r.lookAt(r.position.x+t[0]-n[0],r.position.y+t[1]-n[1],r.position.z+t[2]-n[2]),r.rotateX(Math.PI/2),r}function fR(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");t.fillStyle="#efe2c8",t.fillRect(0,0,256,256);for(let i=-8;i<16;i++)for(const[s,r]of[[1,1],[1,-1]])t.strokeStyle="rgba(120,80,50,0.28)",t.lineWidth=2,t.beginPath(),t.moveTo(i*32,r>0?0:256),t.lineTo(i*32+256*s,r>0?256:0),t.stroke();t.fillStyle="#2bb5ad",t.fillRect(0,18,256,14),t.fillStyle="#a8141c",t.fillRect(0,0,256,10),t.fillRect(0,226,256,30);const e=new Nh(n);return e.colorSpace=He,e.anisotropy=4,e}function Xp(n,t,e,i,s,r){const c=[],l=[],u=[];for(let h=0;h<=6;h++){const d=h/6;for(let p=0;p<=10;p++){const x=p/10,g=[0,1,2].map(m=>(1-d)*((1-x)*n[m]+x*t[m])+d*((1-x)*i[m]+x*e[m]));g[2]=g[2]+.12*d*Math.sin(Math.PI*x),g[1]=g[1]+s*Math.sin(Math.PI*x)*Math.sin(Math.PI*d)+.025*Math.abs(Math.sin(Math.PI*x*4)),c.push(...g),l.push(x*2,d)}}for(let h=0;h<6;h++)for(let d=0;d<10;d++){const p=h*11+d;r?u.push(p,p+1,p+10+1,p+1,p+10+2,p+10+1):u.push(p,p+10+1,p+1,p+1,p+10+1,p+10+2)}const f=new Kt;return f.setAttribute("position",new wt(new Float32Array(c),3)),f.setAttribute("uv",new wt(new Float32Array(l),2)),f.setIndex(u),f.computeVertexNormals(),f}function dR(){const n=new De,t=new De;n.add(t);const e=fR(),i=lR(e);t.add(_a([0,0,-.32],[0,.02,.5],.18,xa));const s=new Xt(new ls(.15,20,14),uR);s.position.set(0,.07,.78);const r=new Xt(new ls(.152,20,10,-1.1,2.2,1.35,.6),hR);r.position.copy(s.position),r.rotation.x=-.3,t.add(s,r);const o=new Xt(new Ht(.26,.1,.4,2,1,2),Hl);o.position.set(0,.19,.1),t.add(o);const a=[],c=[];for(const p of[1,-1]){const x=new De,g=[.17*p,.05,.44],m=[1.02*p,.07,.3];x.add(_a(g,m,.06,xa));const M=new Xt(new ls(.06,8,6),Hl);M.position.set(m[0]+.05*p,m[1],m[2]+.02),x.add(M),c.push(M),x.add(new Xt(Xp(g,m,[.62*p,.02,-.2],[.2*p,0,-.42],.07,p<0),i)),a.push(x),t.add(x)}const l=[.14,0,-.34],u=[-.14,0,-.34],f=[.33,-.03,-1.18],h=[-.33,-.03,-1.18];t.add(_a(l,f,.075,xa),_a(u,h,.075,xa)),t.add(new Xt(Xp([.13,0,-.36],[-.13,0,-.36],h,f,.05,!1),i));const d=[];for(const p of[f,h]){const x=new Xt(new Ht(.12,.17,.13),Hl);x.position.set(p[0],p[1]-.04,p[2]-.06),t.add(x),d.push(x)}return{root:n,body:t,feet:d,tips:c,ankles:d,animate(p,x,g){for(const m of a)m.scale.x=x;i.userData.setTime?.(p,g)}}}const pR={roll:.62,flip:.9,split:3,spiral:1.5},qp=ae.edge-10,Rr=n=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,n)));function mR(){const n={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let t=null,e=0,i=1,s=0,r=!1,o=Number.NaN,a=0;const c=(l,u)=>{t=l,e=0,i=u,r=!0};return{trick(l,u){return t!==null?!1:(c(l,u),!0)},update(l,u){if(n.roll=n.pitch=n.dx=n.dv=n.cam=0,n.spread=null,l.mode!=="run")return t=null,o=Number.NaN,n;const f=ze(l.z);if(o<qp&&f>=qp&&f-o<200?c("split",Yi(l.z)%2===0?1:-1):t===null&&l.thermalT>0&&a<=0&&c("spiral",l.x>=0?-1:1),o=f,a=l.thermalT,t===null)return n;r&&(r=!1,s=l.obstacles.some(x=>x.z>l.z-2&&x.z<l.z+l.speed)?1:3),e+=u;const h=e/pR[t];if(h>=1)return t=null,n;const d=wm(l.z);if(t==="roll")n.roll=i*2*Math.PI*Rr(h),n.spread=1.06;else if(t==="flip"){const p=2*Math.PI*Rr(h);n.pitch=-p,n.dv=s*.5*(1-Math.cos(p)),n.spread=.82}else if(t==="split")n.roll=i*Math.PI*(Rr(h/.15)+Rr((h-.7)/.22)),n.spread=1.04;else{const p=4*Math.PI*Rr(h),x=Math.sin(Math.PI*h);n.roll=i*p,n.dx=i*x*Math.sin(p),n.dv=x*(1-Math.cos(p))}return(t==="roll"||t==="split")&&(n.cam=i*Math.sin(Math.abs(n.roll)/2)*(.12+.3*d)),n}}}const Lg=n=>2.5*(1-Math.exp(-n*6)),gR=n=>4.5*Math.min(n,1.4)**2,Ma={x:0,y:0,z:0};function Ng(n){return ce(n.z-Lg(n.crashT),n.x,n.v,Ma),Math.max(0,Math.min(gR(n.crashT),Ma.y-Ze(Ma.x,Ma.z)-.6))}function vR(){let n=0,t=0,e=0,i=0,s=0,r=0,o=0,a=1;const c=mR();let l=0;return{lateralSpeed:()=>e,trick:(u,f)=>c.trick(u,f),camRoll:()=>l,apply(u,f,h,d){const{root:p,body:x}=u;if(d>0){const w=1-Math.exp(-d*14);e+=((f.x-n)/d-e)*w,i+=((f.v-t)/d-i)*w}n=f.x,t=f.v;const g=c.update(f,d);if(l=g.cam,ce(f.z,f.x+g.dx,f.v+g.dv,p.position),p.rotation.order="YXZ",p.rotation.set(-Math.atan(wi(f.z)),hn(f.z),0),x.rotation.order="ZXY",f.mode==="crash"||f.mode==="over"){ce(f.z-Lg(f.crashT),f.x,f.v-Ng(f),p.position),x.rotation.set(Math.sin(h*9)*1.6,h*4,h*13),u.animate(h,.7,2.5,0,d);return}const m=1-Math.exp(-d*10);s+=(Math.max(-1.1,Math.min(1.1,e*.027+Sm(f.z,f.speed)))-s)*m;const M=-(Math.atan(wi(f.z+18))-Math.atan(wi(f.z)))*.9;r+=(Math.max(-.45,Math.min(.5,-i*.045+M))-r)*m,o+=(Math.max(-.2,Math.min(.2,e*.006))-o)*m;const S=g.spread??(f.vert==="dive"?.8:f.vert==="flare"?1.06:1);a+=(S-a)*m;const v=Math.sin(h*23)*.012+Math.sin(h*7.3)*.018,_=(f.stunT/rt.stunTime)**2;x.rotation.set(r+g.pitch+v+.3*_*Math.sin(h*9.3+1),o+.28*_*Math.sin(h*6.1),s+g.roll+v*.6+.6*_*Math.sin(h*13));const y=(f.vert==="dive"?1.8:f.thermalT>0?1.4:1)+1.6*_;u.animate(h,a-.22*_,y,Math.max(-1,Math.min(1,e/35+Math.sin(h*11)*_)),d)}}}function xR(n){const t=new Map,e=new Map,i=n.clone();return Ig(n,i,function(s,r){t.set(r,s),e.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Ig(n,t,e){e(n,t);for(let i=0;i<n.children.length;i++)Ig(n.children[i],t.children[i],e)}class _R extends ar{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new wR(e)}),this.register(function(e){return new TR(e)}),this.register(function(e){return new DR(e)}),this.register(function(e){return new UR(e)}),this.register(function(e){return new FR(e)}),this.register(function(e){return new AR(e)}),this.register(function(e){return new RR(e)}),this.register(function(e){return new CR(e)}),this.register(function(e){return new PR(e)}),this.register(function(e){return new SR(e)}),this.register(function(e){return new LR(e)}),this.register(function(e){return new ER(e)}),this.register(function(e){return new IR(e)}),this.register(function(e){return new NR(e)}),this.register(function(e){return new yR(e)}),this.register(function(e){return new $p(e,ie.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new $p(e,ie.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new kR(e)})}load(t,e,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Yr.extractUrlBase(t);o=Yr.resolveURL(l,this.path)}else o=Yr.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new N0(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,i,s){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Dg){try{o[ie.KHR_BINARY_GLTF]=new OR(t)}catch(f){s&&s(f);return}r=JSON.parse(o[ie.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new JR(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const f=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(f){case ie.KHR_MATERIALS_UNLIT:o[f]=new bR;break;case ie.KHR_DRACO_MESH_COMPRESSION:o[f]=new BR(r,this.dracoLoader);break;case ie.KHR_TEXTURE_TRANSFORM:o[f]=new zR;break;case ie.KHR_MESH_QUANTIZATION:o[f]=new HR;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,s)}parseAsync(t,e){const i=this;return new Promise(function(s,r){i.parse(t,e,s,r)})}}function MR(){let n={};return{get:function(t){return n[t]},add:function(t,e){n[t]=e},remove:function(t){delete n[t]},removeAll:function(){n={}}}}function Fe(n,t,e){const i=n.json.materials[t];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const ie={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class yR{constructor(t){this.parser=t,this.name=ie.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let i=0,s=e.length;i<s;i++){const r=e[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,i="light:"+t;let s=e.cache.get(i);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new ct(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],yn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new D0(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new dy(u),l.distance=f;break;case"spot":l=new hy(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(i,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,i=this.parser,r=i.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(e.cache,a,c)})}}class bR{constructor(){this.name=ie.KHR_MATERIALS_UNLIT}getMaterialType(){return rn}extendParams(t,e,i){const s=[];t.color=new ct(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],yn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(t,"map",r.baseColorTexture,He))}return Promise.all(s)}}class SR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class wR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(r,r)}return Promise.all(s)}}class TR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class ER{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class AR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_SHEEN}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(e.sheenColor=new ct(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],yn)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,He)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class RR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class CR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_VOLUME}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return e.attenuationColor=new ct().setRGB(r[0],r[1],r[2],yn),Promise.all(s)}}class PR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_IOR}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class LR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return e.specularColor=new ct().setRGB(r[0],r[1],r[2],yn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,He)),Promise.all(s)}}class NR{constructor(t){this.parser=t,this.name=ie.EXT_MATERIALS_BUMP}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(s)}}class IR{constructor(t){this.parser=t,this.name=ie.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Fe(this.parser,t,this.name)!==null?li:null}extendMaterialParams(t,e){const i=Fe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class DR{constructor(t){this.parser=t,this.name=ie.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,i=e.json,s=i.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class UR{constructor(t){this.parser=t,this.name=ie.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class FR{constructor(t){this.parser=t,this.name=ie.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class $p{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,i=e.bufferViews[t];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,f=s.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,s.mode,s.filter),d})})}else return null}}class kR{constructor(t){this.name=ie.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,i=e.nodes[t];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=e.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),f=u.isGroup?u.children:[u],h=l[0].count,d=[];for(const p of f){const x=new Ot,g=new P,m=new Ne,M=new P(1,1,1),S=new Be(p.geometry,p.material,h);for(let _=0;_<h;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),S.setMatrixAt(_,x.compose(g,m,M));let v=null;for(const _ in c)if(_==="_COLOR_0"){const y=c[_];S.instanceColor=new Za(y.array,y.itemSize,y.normalized)}else if(_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"){if(v===null){const w=S.geometry;v=new Kt,v.name=w.name;for(const b in w.attributes)v.setAttribute(b,w.attributes[b]);for(const b in w.morphAttributes)v.morphAttributes[b]=w.morphAttributes[b];w.index!==null&&v.setIndex(w.index),v.morphTargetsRelative=w.morphTargetsRelative;for(const b of w.groups)v.addGroup(b.start,b.count,b.materialIndex);w.boundingBox!==null&&(v.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(v.boundingSphere=w.boundingSphere.clone()),v.drawRange.start=w.drawRange.start,v.drawRange.count=w.drawRange.count,v.userData=Object.assign({},w.userData),S.geometry=v}const y=c[_];v.setAttribute(_,new Za(y.array,y.itemSize,y.normalized))}Pe.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),d.push(S)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Dg="glTF",Cr=12,Kp={JSON:1313821514,BIN:5130562};class OR{constructor(t){this.name=ie.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Cr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Dg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Cr,r=new DataView(t,Cr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Kp.JSON){const l=new Uint8Array(t,Cr+o,a);this.content=i.decode(l)}else if(c===Kp.BIN){const l=Cr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class BR{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ie.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const i=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const f=ju[u]||u.toLowerCase();a[f]=o[u]}for(const u in t.attributes){const f=ju[u]||u.toLowerCase();if(o[u]!==void 0){const h=i.accessors[t.attributes[u]],d=$s[h.componentType];l[f]=d.name,c[f]=h.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(f,h){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const x=d.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}f(d)},a,l,yn,h)})})}}class zR{constructor(){this.name=ie.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const i=Math.cos(t.rotation),s=Math.sin(t.rotation);t.matrix.set(t.repeat.x*i,t.repeat.y*s,t.offset.x,-t.repeat.x*s,t.repeat.y*i,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class HR{constructor(){this.name=ie.KHR_MESH_QUANTIZATION}}class Ug extends sr{constructor(t,e,i,s){super(t,e,i,s)}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=i[r+o];return e}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-e,f=(i-e)/u,h=f*f,d=h*f,p=t*l,x=p-l,g=-2*d+3*h,m=d-h,M=1-g,S=m-h+f;for(let v=0;v!==a;v++){const _=o[x+v+a],y=o[x+v+c]*u,w=o[p+v+a],b=o[p+v]*u;r[v]=M*_+S*y+g*w+m*b}return r}}const GR=new Ne;class VR extends Ug{interpolate_(t,e,i,s){const r=super.interpolate_(t,e,i,s);return GR.fromArray(r).normalize().toArray(r),r}}const Tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$s={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Yp={9728:Ve,9729:We,9984:Jm,9985:Ta,9986:Dr,9987:yi},Zp={33071:ti,33648:Wa,10497:Js},Gl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ju={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},WR={CUBICSPLINE:void 0,LINEAR:so,STEP:io},Vl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function XR(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Pi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ai})),n.DefaultMaterial}function ss(n,t,e){for(const i in e.extensions)n[i]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=e.extensions[i])}function Qn(n,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(n.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function qR(n,t,e){let i=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const f=t[l];if(f.POSITION!==void 0&&(i=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];if(i){const h=f.POSITION!==void 0?e.getDependency("accessor",f.POSITION):n.attributes.position;o.push(h)}if(s){const h=f.NORMAL!==void 0?e.getDependency("accessor",f.NORMAL):n.attributes.normal;a.push(h)}if(r){const h=f.COLOR_0!==void 0?e.getDependency("accessor",f.COLOR_0):n.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],f=l[1],h=l[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=f),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function $R(n,t){if(n.updateMorphTargets(),t.weights!==void 0)for(let e=0,i=t.weights.length;e<i;e++)n.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(n.morphTargetInfluences.length===e.length){n.morphTargetDictionary={};for(let i=0,s=e.length;i<s;i++)n.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function KR(n){let t;const e=n.extensions&&n.extensions[ie.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Wl(e.attributes):t=n.indices+":"+Wl(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)t+=":"+Wl(n.targets[i]);return t}function Wl(n){let t="";const e=Object.keys(n).sort();for(let i=0,s=e.length;i<s;i++)t+=e[i]+":"+n[e[i]]+";";return t}function th(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function YR(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const ZR=new Ot;class JR{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new MR,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new cy(this.options.manager):this.textureLoader=new my(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new N0(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return ss(r,a,s),Qn(a,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,i){if(t.refs[e]<=1)return i;const s=i.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(i,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const s=t(e[i]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&i.push(r)}return i}getDependency(t,e){const i=t+":"+e;let s=this.cache.get(i);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(i,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const i=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return i.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[ie.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(Yr.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(i){const s=e.byteLength||0,r=e.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(t){const e=this,i=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=Gl[s.type],a=$s[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new wt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Gl[s.type],l=$s[s.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,h=s.byteOffset||0,d=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let x,g;if(d&&d!==f){const m=Math.floor(h/d),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let S=e.cache.get(M);S||(x=new l(a,m*d,s.count*d/u),S=new tM(x,d/u),e.cache.add(M,S)),g=new Ah(S,c,h%d/u,p)}else a===null?x=new l(s.count*c):x=new l(a,h,s.count*c),g=new wt(x,c,p);if(s.sparse!==void 0){const m=Gl.SCALAR,M=$s[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,_=new M(o[1],S,s.sparse.count*m),y=new l(o[2],v,s.sparse.count*c);a!==null&&(g=new wt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let w=0,b=_.length;w<b;w++){const T=_[w];if(g.setX(T,y[w*c]),c>=2&&g.setY(T,y[w*c+1]),c>=3&&g.setZ(T,y[w*c+2]),c>=4&&g.setW(T,y[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(t){const e=this.json,i=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,i){const s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=Yp[h.magFilter]||We,u.minFilter=Yp[h.minFilter]||yi,u.wrapS=Zp[h.wrapS]||Js,u.wrapT=Zp[h.wrapT]||Js,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ve&&u.minFilter!==We,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const i=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(f=>f.clone());const o=s.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const h=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(f){return new Promise(function(h,d){let p=h;e.isImageBitmapLoader===!0&&(p=function(x){const g=new Xe(x);g.needsUpdate=!0,h(g)}),e.load(Yr.resolveURL(f,r.path),p,void 0,d)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),Qn(f,o),f.userData.mimeType=o.mimeType||YR(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[t]=u,u}assignTexture(t,e,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[ie.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[ie.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[ie.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let i=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new m0,Hn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(t.isLine){const a="LineBasicMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new Ph,Hn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}t.material=i}getMaterialType(){return Pi}loadMaterial(t){const e=this,i=this.json,s=this.extensions,r=i.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[ie.KHR_MATERIALS_UNLIT]){const f=s[ie.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,e))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ct(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],yn),a.opacity=h[3]}f.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",f.baseColorTexture,He)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=we);const u=r.alphaMode||Vl.OPAQUE;if(u===Vl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Vl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==rn&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ot(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==rn&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==rn){const f=r.emissiveFactor;a.emissive=new ct().setRGB(f[0],f[1],f[2],yn)}return r.emissiveTexture!==void 0&&o!==rn&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,He)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),Qn(f,r),e.associations.set(f,{materials:t}),r.extensions&&ss(s,f,r),f})}createUniqueName(t){const e=ve.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[ie.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Jp(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=KR(l),f=s[u];if(f)o.push(f.promise);else{let h;l.extensions&&l.extensions[ie.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=Jp(new Kt,l,e),l.mode===Tn.TRIANGLE_STRIP?h=h.then(d=>wp(d,s0)):l.mode===Tn.TRIANGLE_FAN&&(h=h.then(d=>wp(d,Fu))),s[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(t){const e=this,i=this.json,s=this.extensions,r=i.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?XR(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let d=0,p=u.length;d<p;d++){const x=u[d],g=o[d];let m;const M=l[d];if(g.mode===Tn.TRIANGLES||g.mode===Tn.TRIANGLE_STRIP||g.mode===Tn.TRIANGLE_FAN||g.mode===void 0){const S=r.isSkinnedMesh===!0,v=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");S&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=S&&v?new f0(x,M):new Xt(x,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Tn.LINES)m=new p0(x,M);else if(g.mode===Tn.LINE_STRIP)m=new Lh(x,M);else if(g.mode===Tn.LINE_LOOP)m=new lM(x,M);else if(g.mode===Tn.POINTS)m=new ja(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&$R(m,r),m.name=e.createUniqueName(r.name||"mesh_"+t),Qn(m,r),g.extensions&&ss(s,m,g),e.assignFinalMaterial(m),f.push(m)}for(let d=0,p=f.length;d<p;d++)e.associations.set(f[d],{meshes:t,primitives:d});if(f.length===1)return r.extensions&&ss(s,f[0],r),f[0];const h=new De;r.extensions&&ss(s,h,r),e.associations.set(h,{meshes:t});for(let d=0,p=f.length;d<p;d++)h.add(f[d]);return h})}loadCamera(t){let e;const i=this.json.cameras[t],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new ln(F_.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(e=new wo(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),Qn(e,i),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],i=[];for(let s=0,r=e.joints.length;s<r;s++)i.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const f=o[l];if(f){a.push(f);const h=new Ot;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Ch(a,c)})}loadAnimation(t){const e=this.json,i=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let f=0,h=s.channels.length;f<h;f++){const d=s.channels[f],p=s.samplers[d.sampler],x=d.target,g=x.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,M=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(p),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],p=f[2],x=f[3],g=f[4],m=[];for(let S=0,v=h.length;S<v;S++){const _=h[S],y=d[S],w=p[S],b=x[S],T=g[S];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const A=i._createAnimationTracks(_,y,w,b,T);if(A)for(let C=0;C<A.length;C++)m.push(A[C])}const M=new ey(r,void 0,m);return Qn(M,s),M})}createNodeMesh(t){const e=this.json,i=this,s=e.nodes[t];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){const e=this.json,i=this,s=e.nodes[t],r=i._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],f=l[1],h=l[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,ZR)});for(let d=0,p=f.length;d<p;d++)u.add(f[d]);if(u.userData.pivot!==void 0&&f.length>0){const d=u.userData.pivot,p=f[0];u.pivot=new P().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(t){const e=this.json,i=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new d0:l.length>1?u=new De:l.length===1?u=l[0]:u=new Pe,u!==l[0])for(let f=0,h=l.length;f<h;f++)u.add(l[f]);if(r.name&&(u.userData.name=r.name,u.name=o),Qn(u,r),r.extensions&&ss(i,u,r),r.matrix!==void 0){const f=new Ot;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,i=this.json.scenes[t],s=this,r=new De;i.name&&(r.name=s.createUniqueName(i.name)),Qn(r,i),i.extensions&&ss(e,r,i);const o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,f=c.length;u<f;u++){const h=c[u];h.parent!==null?r.add(xR(h)):r.add(h)}const l=u=>{const f=new Map;for(const[h,d]of s.associations)(h instanceof Hn||h instanceof Xe)&&f.set(h,d);return u.traverse(h=>{const d=s.associations.get(h);d!=null&&f.set(h,d)}),f};return s.associations=l(r),r})}_createAnimationTracks(t,e,i,s,r){const o=[],a=t.name?t.name:t.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Hi[r.path]===Hi.weights?(l(t),t.isGroup&&t.children.forEach(l)):c.push(a);let u;switch(Hi[r.path]){case Hi.weights:u=ho;break;case Hi.rotation:u=fo;break;case Hi.translation:case Hi.scale:u=tc;break;default:i.itemSize===1?u=ho:u=tc;break}const f=s.interpolation!==void 0?WR[s.interpolation]:so,h=this._getArrayFromAccessor(i);for(let d=0,p=c.length;d<p;d++){const x=new u(c[d]+"."+Hi[r.path],e.array,h,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const i=th(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*i;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(i){const s=this instanceof fo?VR:Ug;return new s(this.times,this.values,this.getValueSize()/3,i)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function QR(n,t,e){const i=t.attributes,s=new Ci;if(i.POSITION!==void 0){const a=e.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=th($s[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new P,c=new P;for(let l=0,u=r.length;l<u;l++){const f=r[l];if(f.POSITION!==void 0){const h=e.json.accessors[f.POSITION],d=h.min,p=h.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),h.normalized){const x=th($s[h.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new Vn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function Jp(n,t,e){const i=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(const o in i){const a=ju[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(t.indices!==void 0&&!n.index){const o=e.getDependency("accessor",t.indices).then(function(a){n.setIndex(a)});s.push(o)}return ne.workingColorSpace!==yn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ne.workingColorSpace}" not supported.`),Qn(n,t),QR(n,t,e),Promise.all(s).then(function(){return t.targets!==void 0?qR(n,t.targets,e):n})}const jR=2.15,tC=[Math.PI/2,0,0],eC=[new P(1,0,0),new P(0,1,0),new P(0,0,1)];class Ks{static q=new Ne;bone;rest;axes;cur=[0,0,0];constructor(t){this.bone=t,this.rest=t.quaternion.clone();const e=t.getWorldQuaternion(new Ne).invert();this.axes=eC.map(i=>i.clone().applyQuaternion(e))}static t=[0,0,0];set(t,e,i,s){const r=Ks.t;r[0]=t,r[1]=e,r[2]=i,this.bone.quaternion.copy(this.rest);for(let o=0;o<3;o++)this.cur[o]+=(r[o]-this.cur[o])*s,this.cur[o]&&this.bone.quaternion.multiply(Ks.q.setFromAxisAngle(this.axes[o],this.cur[o]))}}function nC(n){const t=h=>h.getWorldPosition(new P),e=h=>h.children.filter(d=>d.isBone),i=h=>{const d=[h];for(let p=e(h);p.length===1;p=e(p[0]))d.push(p[0]);return d},s=[];n.traverse(h=>{h.isBone&&s.push(h)});const r=s[0];if(!r)return null;const o=e(r).sort((h,d)=>t(d).z-t(h).z);if(o.length<3)return null;const a=i(o[0]),c=a[a.length-1],l=e(c).sort((h,d)=>Math.abs(t(h).x)-Math.abs(t(d).x));if(l.length<3)return null;const u=(h,d)=>({side:Math.sign(t(h).x),j:d(i(h)).map(p=>new Ks(p))}),f=o.slice(-2);return{spine:a.map(h=>new Ks(h)),neck:i(l[0]).slice(0,2).map(h=>new Ks(h)),arms:l.slice(-2).map(h=>u(h,d=>d.length>=4?d.slice(1,4):d.slice(0,3))),legs:f.map(h=>u(h,d=>d.slice(0,3))),toes:f.map(h=>i(h).at(-1)),ankles:f.map(h=>i(h)[2]??i(h).at(-1)),hands:l.slice(-2).map(h=>i(h).at(-1))}}const Fg={value:0};function iC(n){const t=new Pi({map:n.map,roughness:.78,metalness:0,side:we});return t.onBeforeCompile=e=>{e.uniforms.uHurt=Fg,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},t}function sC(){const n=new rn({color:new ct(.06,.02,.05),side:Qe});return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * 0.011;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function rC(n,t=!0){return new _R().loadAsync("models/pilot.glb").then(e=>{const i=e.scene,s=[];i.traverse(a=>{const c=a;c.isSkinnedMesh&&(c.material=iC(c.material),c.frustumCulled=!1,s.push(c))});for(const a of t?s:[]){const c=new f0(a.geometry,sC());c.bind(a.skeleton,a.bindMatrix),c.frustumCulled=!1,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent?.add(c)}const r=new De;r.rotation.set(...tC),r.scale.setScalar(jR),r.position.set(0,0,.12),r.add(i),r.updateMatrixWorld(!0);const o=nC(i);for(const a of n.body.children)a.visible=!1;if(n.body.add(r),!o){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}n.feet=o.toes,n.ankles=o.ankles,n.tips=o.hands,n.animate=(a,c,l,u,f)=>{const h=1-Math.exp(-f*12),d=Math.min(1,Math.max(0,(1-c)/.2)),p=Math.min(1,Math.max(0,(c-1)/.06)),x=7*l;for(const{side:g,j:m}of o.arms){const M=.07+.16*p-.08*d;m.forEach((S,v)=>{const _=Math.sin(a*x-v*.8+(g>0?.4:0))*(.025+.02*v),y=v===0?.5*d-.12*p:v===1?.18*d:.08*d;S.set(0,g*y,g*((v===0?M:0)+_),h)})}for(const{side:g,j:m}of o.legs){const[M,S,v]=m;M?.set(-.05*p,-g*(.06+.08*p-.14*d)+.07*u,0,h),S?.set(-(.08+.3*p+Math.sin(a*x*.5+g)*.03),0,0,h),v?.set(1.15,0,0,h)}o.spine.forEach((g,m)=>g.set(Math.sin(a*1.7+m)*.015-.06*p,.07*u,0,h)),o.neck.forEach((g,m)=>g.set(m===0?-(.3+.1*d):-.22,m===0?.05*u:0,0,h))}}).catch(e=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",e))}const Gi=18,Qp=.075,oC=.035;function aC(){const n=new Float32Array(2*Gi*2*3),t=new Float32Array(2*Gi*2*4),e=new Uint16Array(2*(Gi-1)*6);for(let u=0,f=0;u<2;u++)for(let h=0;h<Gi-1;h++){const d=(u*Gi+h)*2;e.set([d,d+1,d+2,d+1,d+3,d+2],f),f+=6}const i=new Kt;i.setAttribute("position",new wt(n,3)),i.setAttribute("color",new wt(t,4)),i.setIndex(new wt(e,1));const s=new Xt(i,new rn({vertexColors:!0,transparent:!0,blending:mn,depthWrite:!1,fog:!1}));s.frustumCulled=!1,s.renderOrder=5;const r=[[],[]],o=[],a=new P,c=new P,l=new P;return{mesh:s,update(u,f,h,d,p){for(let x=0;x<2;x++){const g=r[x],m=u[x];if(h&&m){const S=(g.length>=Gi?g.pop():o.pop())??{p:new P,t:0};m.getWorldPosition(S.p),S.t=f,g.unshift(S)}for(;g.length&&f-g[g.length-1].t>Qp;)o.push(g.pop());const M=g.length;for(let S=0;S<Gi;S++){const v=(x*Gi+S)*2;if(S>=M||M<2){v>=2&&n.copyWithin(v*3,(v-2)*3,v*3),t.fill(0,v*4,v*4+8);continue}const _=g[S],y=Math.min(1,(f-_.t)/Qp);S+1<M?a.subVectors(_.p,g[S+1].p):a.subVectors(g[S-1].p,_.p),l.subVectors(p,_.p),c.crossVectors(a,l).normalize().multiplyScalar(oC*(1-.85*y));const w=v*3;n[w]=_.p.x+c.x,n[w+1]=_.p.y+c.y,n[w+2]=_.p.z+c.z,n[w+3]=_.p.x-c.x,n[w+4]=_.p.y-c.y,n[w+5]=_.p.z-c.z;const b=(1-y)**2*Math.min(1,y*8+.35)*(.22+.3*d),T=v*4;t[T]=t[T+4]=1,t[T+1]=t[T+5]=.95,t[T+2]=t[T+6]=.86,t[T+3]=t[T+7]=b}}i.attributes.position.needsUpdate=!0,i.attributes.color.needsUpdate=!0}}}const Da={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class lr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cC=new wo(-1,1,1,-1,0,1);class lC extends Kt{constructor(){super(),this.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Zt([0,2,0,0,2,0],2))}}const uC=new lC;class ef{constructor(t){this._mesh=new Xt(uC,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,cC)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class eh extends lr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof re?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gn.clone(t.uniforms),this.material=new re({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new ef(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class jp extends lr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class hC extends lr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class fC{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ot);this._width=i.width,this._height=i.height,e=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new eh(Da),this.copyPass.material.blending=ii,this.timer=new xy}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}jp!==void 0&&(o instanceof jp?i=!0:o instanceof hC&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const ya={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class dC extends lr{constructor(){super(),this.isOutputPass=!0,this.uniforms=gn.clone(ya.uniforms),this.material=new C0({name:ya.name,uniforms:this.uniforms,vertexShader:ya.vertexShader,fragmentShader:ya.fragmentShader}),this._fsQuad=new ef(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===lh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===uh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===hh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===cc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ph?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===fh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class pC extends lr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ct}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const mC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class nr extends lr{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new ot(t.x,t.y):new ot(256,256),this.clearColor=new ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new un(r,o,{type:dn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new un(r,o,{type:dn,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new un(r,o,{type:dn,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}const a=mC;this.highPassUniforms=gn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new re({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ot(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gn.clone(Da.uniforms),this.blendMaterial=new re({uniforms:this.copyUniforms,vertexShader:Da.vertexShader,fragmentShader:Da.fragmentShader,premultipliedAlpha:!0,blending:mn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ct,this._oldClearAlpha=1,this._basic=new rn,this._fsQuad=new ef(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ot(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=nr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=nr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],c=o+1<t?e[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new re({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}}nr.BlurDirectionX=new ot(1,0);nr.BlurDirectionY=new ot(0,1);const kg=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,gC={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new ot(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0}},vertexShader:kg,fragmentShader:`
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
}`},vC={uniforms:{tDiffuse:{value:null},uTexel:{value:new ot(1/1280,1/720)}},vertexShader:kg,fragmentShader:`
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
}`};function xC(n,t,e,i,s){n.toneMapping=cc,n.toneMappingExposure=1;const r=new fC(n);r.addPass(new pC(t,e));const o=new nr(new ot(256,256),.35,.5,1.4);r.addPass(o);const a=new eh(gC);r.addPass(a);const c=new dC;r.addPass(c);let l=!1;const u=(g,m)=>{l=m,o.enabled=g.bloom&&!m,c.enabled=o.enabled,a.material.defines.SHAFT_N=m?Math.min(g.shafts,8):g.shafts,a.material.defines.SPEED_BLUR=g.speedBlur&&!m?1:0,a.material.needsUpdate=!0};u(s,!1);const f=new eh(vC);f.enabled=!1,r.addPass(f);const h=new P(i.x,i.y,i.z);let d=1;const p=new P,x=new P;return{render(){e.getWorldDirection(x),p.copy(h).multiplyScalar(1e4).add(e.position).project(e);const g=x.dot(h);a.uniforms.uSun.value.set(p.x*.5+.5,p.y*.5+.5),a.uniforms.uSunVisible.value=d*Math.max(0,Math.min(1,(g-.2)/.4)),r.render()},setSize(g,m){r.setSize(g,m),o.resolution.set(g/2,m/2),a.uniforms.uAspect.value=g/m;const M=n.getPixelRatio();f.uniforms.uTexel.value.set(1/(g*M),1/(m*M))},setPixelRatio(g){r.setPixelRatio(g)},setLite(){return l||!s.bloom&&s.shafts<=8&&!s.speedBlur?!1:(u(s,!0),!0)},togglePainterly(){return f.enabled=!f.enabled,f.enabled},painterly:()=>f.enabled,setSpeed(g){a.uniforms.uSpeed.value=g},setDanger(g){a.uniforms.uDanger.value=g},setSun(g,m){h.set(g.x,g.y,g.z),d=m}}}function _C(n,t){const e=new ET({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,t)),e.setSize(n.clientWidth,n.clientHeight),e.info.autoReset=!1,n.appendChild(e.domElement);const i=new Z_,s=new ln(60,n.clientWidth/n.clientHeight,.5,7e4),r=new D0(16777215,2.4),o=new ly(16777215,16777215,1.3);return i.add(r,r.target,o),{renderer:e,scene:i,camera:s,sun:r,hemi:o}}const MC=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function yC(n){return`
uniform float uDusk;
uniform float uMorn;
${xg(n,"uDusk","uMorn")}
${gc}
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
}`}function bC(n){const t=new re({vertexShader:MC,fragmentShader:yC(n),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:Qe,depthWrite:!1,depthTest:!1,fog:!1}),e=new Xt(new ls(1e3,48,24),t);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(i,s,r,o){e.position.copy(i.position),t.uniforms.uTime.value=s,t.uniforms.uDusk.value=r,t.uniforms.uMorn.value=o}}}function SC(){return new re({vertexShader:`
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
}`,transparent:!0,blending:mn,depthWrite:!1})}function wC(){return new re({vertexShader:`
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
}`,transparent:!0,blending:mn,depthWrite:!1})}const nh=12,tm=new ct(1,.72,.28),TC=new ct(1,.86,.5);function Xl(n,t){const e=new Be(n,t,nh);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new ct(0,0,0)),e}function EC(){const n=Xl(new Oh(.82,1,40),new rn({transparent:!0,blending:mn,depthWrite:!1,fog:!1,side:we})),t=Xl(new Wn(2,2),wC()),e=Xl(new vs(1,2),SC()),i={ring:n,flare:t,shell:e},s=[],r=new Ot,o=new Ne,a=new P,c=new P,l=new ct,u=new P(0,0,1),f=h=>{s.length>=nh*3&&s.shift(),s.push(h)};return{mesh:n,star:t,shell:e,spawn(h,d,p){f({part:"ring",x:h,y:d,z:p,t:0,dur:.35,r0:.6,r1:3.4,color:tm}),f({part:"shell",x:h,y:d,z:p,t:0,dur:.45,r0:.4,r1:3.2,color:tm}),f({part:"flare",x:h,y:d,z:p,t:0,dur:.42,r0:.6,r1:3,color:TC})},update(h,d){const p={ring:0,flare:0,shell:0};for(let x=s.length-1;x>=0;x--){const g=s[x];if(g.t+=h,g.t>=g.dur||p[g.part]>=nh){s.splice(x,1);continue}g.z+=d*h;const m=g.t/g.dur,M=g.r0+(g.r1-g.r0)*(1-(1-m)*(1-m)),S=(1-m)*(1-m)*1.1,v=g.part==="flare"?o.setFromAxisAngle(u,m*2.2):o.identity();r.compose(a.set(g.x,g.y,g.z),v,c.set(M,M,M));const _=i[g.part];_.setMatrixAt(p[g.part],r),_.setColorAt(p[g.part]++,l.copy(g.color).multiplyScalar(S))}for(const x of["ring","flare","shell"]){const g=i[x];g.count=p[x],g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0)}}}}const em=4,nm=36,AC={rock:[new ct(.42,.33,.36),new ct(.3,.24,.28),new ct(.24,.3,.16)],cloth:[new ct(.8,.1,.08),new ct(.95,.66,.1),new ct(.5,.33,.2)],village:[new ct(.62,.22,.12),new ct(.55,.3,.2),new ct(.85,.7,.35)]},RC=()=>new re({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function CC(){const n=new Be(new Wn(2,2),RC(),em),t=new Be(new vs(1,0),new ir,nm);for(const u of[n,t])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new ct);n.renderOrder=8;const e=[],i=[];let s=0;const r=new Ot,o=new Ne,a=new P,c=new P,l=new ct;return{stars:n,chips:t,danger:()=>s,spawn(u,f,h,d,p){e.length>=em&&e.shift(),e.push({x:u,y:f,z:h,t:0,dur:p?.42:.3,r0:p?1.4:.9,r1:p?5.2:3.2,seed:Math.random(),follow:!p});const x=p?22:10;for(let g=0;g<x;g++){i.length>=nm&&i.shift();const m=Math.random()*Math.PI*2,M=(p?7:5)+Math.random()*7,S=AC[d];i.push({x:u,y:f,z:h,t:0,life:.9+Math.random()*.6,size:(p?.22:.16)+Math.random()*(p?.38:.22),vx:Math.cos(m)*M,vy:Math.sin(m)*M*.8+4,vz:-(3+Math.random()*8),spin:new P(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:S[g%S.length]})}s=Math.max(s,p?1:.75)},update(u,f){s=Math.max(0,s-u*1.4);let h=0;for(let d=e.length-1;d>=0;d--){const p=e[d];p.t+=u;const x=p.t/p.dur;if(x>=1){e.splice(d,1);continue}p.follow&&(p.z+=f*u);const g=p.r0+(p.r1-p.r0)*(1-(1-x)**3);r.compose(a.set(p.x,p.y,p.z),o.identity(),c.set(g,g,g)),n.setMatrixAt(h,r),n.setColorAt(h++,l.setRGB(Math.min(1,(1-x)*1.6),p.seed,x))}n.count=h,h=0;for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.t+=u,p.t>=p.life){i.splice(d,1);continue}p.vy-=16*u,p.x+=p.vx*u,p.y+=p.vy*u,p.z+=p.vz*u;const x=p.size*Math.min(1,(p.life-p.t)/.25);o.setFromAxisAngle(p.spin,p.t*9),r.compose(a.set(p.x,p.y,p.z),o,c.set(x,x*.7,x*1.2)),t.setMatrixAt(h,r),t.setColorAt(h++,p.color)}t.count=h;for(const d of[n,t])d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0)}}}const Fn=90,PC=1.4,LC=`
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
}`,NC=`
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
}`;function IC(){const n=[0,1].map(()=>({p:Array.from({length:Fn},()=>new P),age:new Float32Array(Fn).fill(1)})),t=2*Fn*2,e=new Float32Array(t*3),i=new Float32Array(t).fill(1),s=new Float32Array(t),r=[];for(let h=0;h<2;h++)for(let d=0;d<Fn;d++){const p=(h*Fn+d)*2;s[p]=-1,s[p+1]=1,d<Fn-1&&r.push(p,p+1,p+2,p+1,p+3,p+2)}const o=new Kt;o.setAttribute("position",new wt(e,3)),o.setAttribute("aAge",new wt(i,1)),o.setAttribute("aSide",new wt(s,1)),o.setIndex(r);const a=new re({vertexShader:LC,fragmentShader:NC,uniforms:gn.merge([lt.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:we,fog:!0}),c=new Xt(o,a);c.frustumCulled=!1,c.renderOrder=3;const l=new P,u=new P,f=new P;return{points:c,update(h,d,p,x){n.forEach((g,m)=>{for(let M=0;M<Fn;M++)g.age[M]=Math.min(1,g.age[M]+d/PC);if(p&&d>0){const M=g.p.pop();g.p.unshift(M.copy(h[m])),g.age.copyWithin(1,0,Fn-1),g.age[0]=0}for(let M=0;M<Fn;M++){const S=g.p[M],v=g.p[Math.min(Fn-1,M+1)];l.subVectors(S,v),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(x,S),f.crossVectors(l,u).normalize();const _=.06+.5*g.age[M],y=(m*Fn+M)*2;e.set([S.x-f.x*_,S.y-f.y*_,S.z-f.z*_],y*3),e.set([S.x+f.x*_,S.y+f.y*_,S.z+f.z*_],(y+1)*3),i[y]=i[y+1]=g.age[M]}}),o.getAttribute("position").needsUpdate=!0,o.getAttribute("aAge").needsUpdate=!0}}}const rs=120,DC=40,UC=120,FC=9,kC=30,ql=.11;function OC(){const n=new Float32Array(rs*3),t=new Float32Array(rs*6),e=new Kt;e.setAttribute("position",new wt(t,3));const i=new Float32Array(rs*6);for(let h=0;h<rs;h++)i.set([1,1,1,0,0,0],h*6);e.setAttribute("color",new wt(i,3));const s=new Ph({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:mn,depthWrite:!1,fog:!1}),r=new p0(e,s);r.frustumCulled=!1,r.renderOrder=5;let o=!1;const a=new P,c=new P,l=new P,u=new P,f=(h,d,p)=>{const x=DC+Math.random()*UC*p,g=FC+(1-Math.random()**2)*kC,m=Math.random()*Math.PI*2;u.copy(d).addScaledVector(a,x).addScaledVector(c,Math.cos(m)*g).addScaledVector(l,Math.sin(m)*g),n[h*3]=u.x,n[h*3+1]=u.y,n[h*3+2]=u.z};return{object:r,update(h,d,p){if(s.opacity=Math.min(.5,.42*p),r.visible=p>.02,e.setDrawRange(0,2*Math.round(rs*Math.min(1,p))),!r.visible)return;const x=d.length();if(x<1)return;a.copy(d).divideScalar(x),c.set(a.z,0,-a.x).normalize(),l.crossVectors(c,a);const g=h.position;if(!o){for(let m=0;m<rs;m++)f(m,g,1);o=!0}for(let m=0;m<rs;m++){u.set(n[m*3]-g.x,n[m*3+1]-g.y,n[m*3+2]-g.z),(u.dot(a)<-4||u.lengthSq()>36100)&&f(m,g,1);const S=m*6,v=n[m*3],_=n[m*3+1],y=n[m*3+2];t[S]=v,t[S+1]=_,t[S+2]=y,t[S+3]=v-d.x*ql,t[S+4]=_-d.y*ql,t[S+5]=y-d.z*ql}e.attributes.position.needsUpdate=!0}}}const Pr=256,im=5,BC=-2e3,zC=400;function HC(n,t,e){let i=0;for(const[s,r]of[[1,41],[1.37,43]]){const o=Math.max(12,Math.round(2*Math.PI*e/((1800+700*t)*s))),a=n/(2*Math.PI)*o,c=Math.floor(a),l=.5+.3*(ut(c,t,r)-.5),u=Math.max(0,1-Math.abs(a-c-l)*2.2),f=(220+140*t)*(.45+.55*ut(c,t,r+1));i=Math.max(i,f*u*u*(3-2*u))}return i}const GC=`
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
}`,VC=`
#include <fog_pars_fragment>
uniform float uFar;
${oh}
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
}`;class WC{rings=[];next=0;heightAt;constructor(t,e,i){this.heightAt=e;for(let s=0;s<i.length-1;s++){const r=s/(i.length-2),o=new re({vertexShader:GC,fragmentShader:VC,uniforms:gn.merge([lt.fog,{uFar:{value:.25+.6*r}}]),fog:!0});o.uniforms.uRegionHg=Mo;const a=new Xt(new Kt,o);a.frustumCulled=!1,t.add(a),this.rings.push({inner:i[s],outer:i[s+1],mesh:a,anchorX:NaN,anchorZ:NaN})}}update(t,e,i=!1){for(let s=0;s<this.rings.length;s++){const r=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,(Math.hypot(t-r.anchorX,e-r.anchorZ)>zC||Number.isNaN(r.anchorX))&&(this.rebuild(r,t,e),!i))return}}rebuild(t,e,i){const s=new Float32Array((Pr+1)*2*3),r=new Float32Array((Pr+1)*2);for(let c=0;c<=Pr;c++){const l=c/Pr*Math.PI*2,u=Math.sin(l),f=Math.cos(l);let h=-1/0;for(let p=0;p<im;p++){const x=t.inner+(t.outer-t.inner)*p/im;h=Math.max(h,this.heightAt(e+u*x,i+f*x))}yo()>.5&&(h+=HC(l,this.rings.indexOf(t),t.inner));const d=t.inner;s.set([u*d,h,f*d,u*d,BC,f*d],c*6),r[c*2]=h,r[c*2+1]=h}const o=[];for(let c=0;c<Pr;c++){const l=c*2;o.push(l,l+2,l+1,l+2,l+3,l+1)}const a=new Kt;a.setAttribute("position",new wt(s,3)),a.setAttribute("aTop",new wt(r,1)),a.setIndex(o),t.mesh.geometry.dispose(),t.mesh.geometry=a,t.mesh.position.set(e,0,i),t.anchorX=e,t.anchorZ=i}}const Lr={h:0,s:0,lat:0,vil:0};function XC(n,t,e,i,s){const r=i/s,o=s+3,a=new Float32Array(o*o),c=new Float32Array(o*o*3);for(let _=0;_<o;_++)for(let y=0;y<o;y++)n(t+(y-1)*r,e+(_-1)*r,Lr),a[_*o+y]=Lr.h,c.set([Lr.s,Lr.lat,Lr.vil],(_*o+y)*3);const l=(_,y)=>a[(y+1)*o+(_+1)],u=s+1,f=s*4,h=u*u+f,d=new Float32Array(h*3),p=new Float32Array(h*3),x=new Float32Array(h*3),g=(_,y,w,b)=>{x.set(c.subarray(((w+1)*o+(y+1))*3,((w+1)*o+(y+2))*3),_*3);const T=(l(y+1,w)-l(y-1,w))/(2*r),A=(l(y,w+1)-l(y,w-1))/(2*r),C=1/Math.hypot(T,1,A);d[_*3]=y*r,d[_*3+1]=l(y,w)-b,d[_*3+2]=w*r,p[_*3]=-T*C,p[_*3+1]=C,p[_*3+2]=-A*C};for(let _=0;_<u;_++)for(let y=0;y<u;y++)g(_*u+y,y,_,0);const m=[];for(let _=0;_<s;_++)m.push(_);for(let _=0;_<s;_++)m.push(_*u+s);for(let _=s;_>0;_--)m.push(s*u+_);for(let _=s;_>0;_--)m.push(_*u);const M=r*3+25;m.forEach((_,y)=>g(u*u+y,_%u,Math.floor(_/u),M));const S=[];for(let _=0;_<s;_++)for(let y=0;y<s;y++){const w=_*u+y;S.push(w,w+u,w+1,w+1,w+u,w+u+1)}for(let _=0;_<f;_++){const y=m[_],w=m[(_+1)%f],b=u*u+_,T=u*u+(_+1)%f;S.push(y,w,b,w,T,b)}const v=new Kt;return v.setAttribute("position",new wt(d,3)),v.setAttribute("normal",new wt(p,3)),v.setAttribute("aTrack",new wt(x,3)),v.setIndex(h>65535?new wt(new Uint32Array(S),1):new wt(new Uint16Array(S),1)),v.computeBoundingSphere(),v}class qC{cache=new Map;shown=new Set;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(t,e,i,s){this.scene=t,this.sample=e,this.material=i,this.cfg=s}update(t,e,i=!1){this.computeWanted(t,e);const s=performance.now();for(const r of this.wanted)if(!this.cache.has(r.key)){if(!i&&performance.now()-s>this.cfg.buildBudgetMs)return;this.cache.set(r.key,this.build(r))}this.shown.size===this.wanted.length&&this.wanted.every(r=>this.shown.has(r.key))||this.swap()}stats(){let t=0;for(const s of this.shown)t+=this.cache.get(s)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(s=>!this.cache.has(s.key)).length,i=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,vertices:t,reach:i}}computeWanted(t,e){const i=[];for(let r=0;r<this.cfg.levels;r++){const o=this.cfg.baseSize*2**r,a=Math.floor(t/(2*o)),c=Math.floor(e/(2*o)),l=Math.floor(t/o),u=Math.floor(e/o);for(let f=2*c-2;f<=2*c+3;f++)for(let h=2*a-2;h<=2*a+3;h++)r>0&&Math.abs(h-l)<=1&&Math.abs(f-u)<=1||i.push({key:`${r}:${h}:${f}`,level:r,ix:h,iz:f})}const s=i.map(r=>r.key).join("|");s!==this.wantedSig&&(this.wantedSig=s,this.wanted=i)}build(t){const e=this.cfg.baseSize*2**t.level,i=t.ix*e,s=t.iz*e,r=t.level>=2?this.cfg.farSegs:this.cfg.segs,o=new Xt(XC(this.sample,i,s,e,r),this.material);return o.position.set(i,0,s),o.matrixAutoUpdate=!1,o.updateMatrix(),o}swap(){const t=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)t.has(e)||this.scene.remove(this.cache.get(e));for(const e of t)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,i]of this.cache)t.has(e)||(i.geometry.dispose(),this.cache.delete(e));this.shown=t}}const $C=`
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
`,KC=`
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
`,YC=`
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
}`,ZC=`
#include <fog_pars_fragment>
${gc}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;

${oh}
${KC}
${$C}
${E3}

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
}`;function JC(n=1e9,t=!1){return new re({vertexShader:YC,fragmentShader:ZC,defines:t?{TERRAIN_LITE:1}:{},uniforms:{...gn.merge([lt.fog,{uMaxDist:{value:n}}]),...sc,uRegionHg:Mo},fog:!0})}const QC=6e3,jC=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function tP(n,t){const e=new qC(n,ig,JC(QC,t.lite),{baseSize:t.baseSize,segs:t.segs,farSegs:t.farSegs,levels:t.levels,buildBudgetMs:5}),i=new WC(n,Ze,jC);return{update(s,r){e.update(s.x,s.z,r),i.update(s.x,s.z,r)},statsLine(){const s=e.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const sm=16,rm=3,Nr=1.8,om=2.2,xi={x:0,v:0};function eP(n,t,e,i){xi.x=0,xi.v=0;for(const s of n.obstacles){const r=Ki[s.kind],o=s.z-t;if(o+r.halfZ+1<0||o-r.halfZ>sm)continue;const a=Math.min(1,Math.max(0,1-(o-r.halfZ)/sm)),c=pn(s.lane);let l=0,u=0;if(s.kind==="ridge")u=Math.max(0,r.hi+rm-i);else if(s.kind==="bridge")i>r.lo-Nr&&i<r.hi+Nr&&(u=n.v<r.lo?r.lo-Nr-i:r.hi+Nr-i);else if(Math.abs(e-c)<r.halfX+om){const f=n.x-c;Math.abs(f)>=r.halfX?l=c+Math.sign(f)*(r.halfX+om)-e:s.kind==="spike"?u=Math.max(0,r.hi+rm-i):s.kind==="overhang"&&(u=Math.min(0,r.lo-Nr-i))}u>0?xi.v=Math.max(xi.v,u*a):u<0&&(xi.v=Math.min(xi.v,u*a)),Math.abs(l*a)>Math.abs(xi.x)&&(xi.x=l*a)}return xi}function nP(n,t,e){const i=Math.sin(e),s=Math.cos(e);return Math.max(Ze(n,t),Ze(n+4*i,t+4*s),Ze(n+8*i,t+8*s))}const iP={back:7.5,up:2.6,fov:58,look:34,lookDown:3.6},sP={back:11,up:4.5,fov:70,look:60,lookDown:5},rP={back:6.5,up:2.2,fov:64,look:40,lookDown:4},am={back:13,up:4.5,fov:62,look:60,lookDown:6};function $l(n,t,e){const i=(s,r)=>s+(r-s)*e;return{back:i(n.back,t.back),up:i(n.up,t.up),fov:i(n.fov,t.fov),look:i(n.look,t.look),lookDown:i(n.lookDown,t.lookDown)}}class oP{rig={...am};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(t){this.camera=t,this.aspect=Number.isFinite(t.aspect)&&t.aspect>0?t.aspect:16/9}setAspect(t){Number.isFinite(t)&&t>0&&(this.aspect=t,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(t){this.shakeA=Math.max(this.shakeA,t)}update(t,e,i,s,r=!1){const o=Math.min(1,Math.max(0,(t.speed-42)/22)),a=t.mode==="run"?wm(t.z):0,c=W=>r?1:1-Math.exp(-i*W),l=a>0?Math.max(.4,Math.min(2,kv(t.z,t.speed))):1;this.g+=(1+(l-1)*a-this.g)*c(3);const u=Math.max(0,this.g-1),f=Math.max(0,1-this.g),h=this.portrait();let d=t.mode==="ready"?am:$l($l(iP,rP,Fv(t.z)),sP,Uv(t.z)*(1-.8*h));d={...d,fov:d.fov+10*o+.5*Math.max(0,t.surge)+.34*t.tailwind+(t.vert==="dive"?4:0)+(t.thermalT>0?8:0)-2.5*u+5*f,up:d.up-.8*u},t.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=$l(this.rig,d,c(2.4)),this.mv+=(t.v-t.thermalV-t.windLift-this.mv)*c(9+5*h);const p=this.mv,x=t.low&&t.vert==="cruise";this.fv+=((x?1:t.vert==="dive"?.6+.2*h:.45)-this.fv)*c(x?3:10),this.fl+=((x?1:t.vert==="dive"?.9:.35)-this.fl)*c(x?3:10);const g=t.speed*wi(t.z);this.lag+=(5*(1-.7*h)*Math.tanh(-g/40)*a-this.lag)*c(3),this.x+=(t.x*(.55+.3*h)-this.x)*(r?1:1-Math.exp(-i*(6+4*h)));const m=1.6+20*(1-h);this.x=Math.min(t.x+m,Math.max(t.x-m,this.x));const M=t.mode==="run"?Math.max(-.3,Math.min(.3,.45*Sm(t.z,t.speed))):0;this.roll+=(M-e*.0022-this.roll)*(r?1:1-Math.exp(-i*3)),this.shakeA=Math.max(0,this.shakeA-i*2.5);const S=t.mode==="crash"||t.mode==="over",v=this.rig.back*(1-.12*h)-.3*h*Math.max(0,this.rig.back-7.5),_=t.z-v*(S?1.6:1);this.s=_;const y=this.camera,w=this.shakeA,b=Math.max(0,Ce(_)-Ce(t.z))*.7*h,T=this.rig.up+.6*h-b+t.thermalV*.8+t.windLift*.85+p*this.fv+this.lag+(S?4:0),A=eP(t,_,this.x,T);this.clrX=Math.abs(A.x)>=Math.abs(this.clrX)?A.x:this.clrX+(A.x-this.clrX)*c(5),this.clrV=Math.abs(A.v)>=Math.abs(this.clrV)?A.v:this.clrV+(A.v-this.clrV)*c(5);const C=ce(_,this.x+this.clrX,T+this.clrV,this.tmp);y.position.set(C.x+w*Math.sin(s*37.1),Math.max(C.y,nP(C.x,C.z,hn(_))+3)+w*Math.sin(s*41.3+2),C.z),this.crashK+=((S?1:0)-this.crashK)*c(4);const L=t.z+this.rig.look*(1-.75*this.crashK),D=.6*t.speed,N=(Ce(L+D)-Ce(L)-wi(L)*D)*a,B=ze(t.z),H=Math.tan(.14)*this.rig.look*cm(B,ae.edge-20,ae.edge+80)*(1-cm(B,ae.pullOut-80,ae.pullOut))*a;ce(L,t.x*(.4+.2*h),t.thermalV*.8+t.windLift*.85+p*this.fl+N-this.rig.lookDown-H-Ng(t)*this.crashK,this.tmp),y.up.set(0,1,0),y.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),y.rotateZ(Math.max(-.6,Math.min(.6,this.roll+this.trickRoll))),this.applyLens()}applyLens(){const t=this.camera,e=this.aspect,i=this.portrait();let s=this.rig.fov,r=1;if(e<1){const a=Math.min(64+60*(1-i),this.rig.fov*(1-.15*i))*Math.PI/180;r=1+.1*i,s=Math.min(118,2*Math.atan(Math.tan(a/2)*r/e)*180/Math.PI)}const o=`${s.toFixed(2)}|${r.toFixed(3)}|${e.toFixed(4)}`;o!==this.lensKey&&(this.lensKey=o,this.viewScale=r,t.fov=s,r>1.001?t.setViewOffset(e,r,0,0,e,1):(t.clearViewOffset(),t.aspect=e,t.updateProjectionMatrix()))}}function cm(n,t,e){const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)}const Kl=new ct;function aP(n,t,e,i){let s=i;return{sunDir:()=>s,apply(r,o){FA(n,r,o),s=PA(i,r,o);const a=At(.55,1,r);t.position.set(s.x*1e3,Math.max(s.y,.35*a)*1e3,s.z*1e3),t.color.copy(Cl("sunLight",r,Kl,o)),t.intensity=2.4*(1-.7*a),e.color.copy(Cl("skyAmbient",r,Kl,o)),e.groundColor.copy(Cl("bounce",r,Kl,o)),e.intensity=1.3*(1+.35*a)}}}const ba={x:-.32,y:.1,z:1};function cP(n,t){const{renderer:e,scene:i,camera:s,sun:r,hemi:o}=_C(n,t.maxDpr);UA(i,ba);const a=aP(i,r,o,ba),c=bC(ba),l=tP(i,t.terrain),u=vA(t.foliage),f=y3(t.ambient),h=T3(),d=WA(t.ambient),p=BA(t.name!=="high"),x=$2(),g=iA(),m=rA(),M=cA(),S=CA(),v=cR(),_=$3(t.ambient),y=dR();Qg(rC(y,t.name==="high"));const w=vR(),b=IC(),T=kT(t.name==="low"),A=aC(),C=OC(),L=o3(),D=QA(),N=t3(),B=EC(),H=CC(),W=I3();i.add(c.mesh,u.group,f.group,h.mesh,x.group,g.group,m.group,M.mesh,S.group,p.mesh,d.mesh,v.group,_.group,y.root,b.points,A.mesh,C.object,L.mesh,D.group,N.mesh,B.mesh,B.star,B.shell,H.stars,H.chips,W.points,T.mesh);const j=xC(e,i,s,ba,t.post),O=new oP(s);A3(t.ambient>=1?12:t.ambient>=.7?9:6);const $=[new P,new P],Q=[new P,new P],_t=new P,ft=new ot,St={};let Nt=null;return{renderer:e,scene:i,camera:s,post:j,cam:O,lanterns:_,flashes:B,impacts:H,world:l,ghosts:D,trick:w.trick,present(zt,X,Y,yt,Pt=!1){const{dusk:it,morn:Wt}=yt;zt.mode==="crash"||zt.mode==="over"?Nt??=zt.z:Nt=null;let st=zt;Nt!==null&&zt.z>Nt+.4&&(st=Object.assign(St,zt),st.z=Nt+.4),a.apply(it,Wt),w.apply(y,st,X,Y),N.update(y.root.position,st.stunT/rt.stunTime,X,s),O.trickRoll=w.camRoll(),O.update(st,w.lateralSpeed(),Y,X,Pt),c.update(s,X,it,Wt),l.update(s.position,Pt),u.update(st.z,it),f.update(st.z,it),h.update(st.z),R3(),W.update(st,X,it,O.s),d.update(st.z),p.update(s,X,O.s),O2(y.root.position.x,y.root.position.z,hn(st.z),X),B.update(Y,st.mode==="run"?st.speed:0),H.update(Y,st.mode==="run"?st.speed:0);const Gt=st.mode==="run"&&st.hp===1?.14+.08*Math.sin(X*5.5):0;j.setDanger(Math.max(H.danger(),Gt,st.mode==="crash"?.55:st.mode==="over"?.25:0)),v.update(st,X,it),x.update(st.z),g.update(O.s,X,it),m.update(st.z,X),M.update(O.s),S.update(st.z),_.update(st,X,Y,it,O.s),C3(Math.min(1,Math.max(0,(it-.45)/.4))),L.update(st,X,O.s),y.root.updateMatrixWorld(),y.feet.forEach((Re,F)=>Re.getWorldPosition($[F])),b.update($,Y,st.mode==="run"||st.mode==="ready",s.position),y.ankles.forEach((Re,F)=>Re.getWorldPosition(Q[F])),T.update(st,Q,X,Y,s.position);const le=st.mode==="run"||st.mode==="ready";A.update(y.tips,X,le,Math.min(1,Math.max(0,(st.speed-40)/26)+(st.vert==="dive"?.4:0)),s.position);const ee=st.stunT/rt.stunTime;Fg.value=Math.max(ee*ee*(.6+.4*Math.sin(X*28)),st.mode==="run"&&st.hp===1?.18+.12*Math.sin(X*5.5):0);const Me=hn(st.z);_t.set(Math.sin(Me),wi(st.z),Math.cos(Me)).normalize().multiplyScalar(st.speed);const Ie=Math.min(1,Math.max(0,(st.speed-40)/26)),Ke=st.mode==="run"?Math.max(0,st.surge)/12+st.tailwind/16:0,Te=1-.45*Math.min(1,Math.max(0,(it-.5)/.4));return C.update(s,_t,st.mode==="run"?Te*(.1+.4*Ie+.55*Ke+(st.thermalT>0?.35:0)):0),j.setSpeed(st.mode==="run"?.05*Ie+.16*Ke+(st.vert==="dive"?.04:0)+(st.thermalT>0?.1:0):0),j.setSun(a.sunDir(),1-Math.min(1,it*1.6)),_.setViewport(e.getDrawingBufferSize(ft).y*O.viewScale,s.fov),D.setViewport(ft.y*O.viewScale,s.fov),W.setViewport(ft.y*O.viewScale,s.fov),Math.min(1.4,Ie+.5*Ke)},resize(zt,X){e.setSize(zt,X),j.setSize(zt,X),O.setAspect(zt/X)}}}function lP(){const n={z:0,x:0,v:0,thermalV:0,windLift:0},t={};return{capture(e){n.z=e.z,n.x=e.x,n.v=e.v,n.thermalV=e.thermalV,n.windLift=e.windLift},view(e,i){if(i>=1)return e;const s=(r,o)=>r+(o-r)*i;return Object.assign(t,e),t.z=s(n.z,e.z),t.x=s(n.x,e.x),t.v=s(n.v,e.v),t.thermalV=s(n.thermalV,e.thermalV),t.windLift=s(n.windLift,e.windLift),t}}}const Og=`skyrun.tut.${hs}`,uP=2e3,hP=.7,fP=.45,dP=.3,pP=.15;function mP(){try{return new Set(JSON.parse(localStorage.getItem(Og)??"[]"))}catch{return new Set}}function gP(n){const t=n.obstacles.filter(f=>!f.passed&&f.z-n.z>-Ki[f.kind].halfZ);if(!t.length)return null;const e=t.reduce((f,h)=>h.z<f.z?h:f),i=t.filter(f=>f.row===e.row),s=e.kind;if(n.thermalV>8&&s!=="pillar")return null;if(i.some(f=>f.kind==="bridge"))return n.vert==="dive"||n.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(i.some(f=>f.kind==="ridge"))return n.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const r=new Set(i.map(f=>f.lane));if(!r.has(n.lane))return null;const o=i.filter(f=>f.lane===n.lane),a=o.every(f=>f.kind==="spike");if(a&&n.vert==="flare")return null;const c=o.every(f=>f.kind==="overhang");if(c&&(n.vert==="dive"||n.low))return null;const l=[];return[-1,0,1].some(f=>f<n.lane&&!r.has(f))&&l.push("left"),[-1,0,1].some(f=>f>n.lane&&!r.has(f))&&l.push("right"),a&&l.push("up"),c&&l.push("down"),{lesson:l.length===1&&a?"up":l.length===1&&c?"down":"lane",kind:o[0].kind,accept:l,row:e.row,z:e.z}}const lm={left:"←",right:"→",up:"↑",down:"↓"};function vP(n,t){const e=t?new Set:mP(),i=matchMedia("(pointer: coarse)").matches,s=document.createElement("div");s.className="tut",n.appendChild(s);let r=null,o=1;const a=l=>{const u=l.accept.filter(g=>l.lesson!=="lane"||g!=="up"&&g!=="down"),f=$i(l.z),h=l.kind==="bridge"?f?"chui qua cổng làng":"chui dưới cầu":l.kind==="overhang"?"chui dưới mái đá":l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",d=u.length===1?u[0]==="left"?"sang trái":"sang phải":"sang trái / phải",p=l.lesson==="lane"?`ngón ${d}`:l.lesson==="up"?"lên":"xuống",x=i?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${p} để ${h}`:`Bấm ${u.map(g=>lm[g]).join(" / ")} để ${h}`;s.innerHTML=`<div class="tut-arrows">${u.map(g=>`<span class="tut-arrow ${g}">${lm[g]}</span>`).join("")}</div><div class="tut-text">${x}</div>`,s.classList.add("on")},c=l=>{e.add(l);try{localStorage.setItem(Og,JSON.stringify([...e]))}catch{}};return{frozen:()=>r!==null&&o===0,update(l,u){if(l.mode!=="run"||e.size===3)return r=null,s.classList.remove("on"),o=1,1;const f=gP(l);if(r&&(!f||f.row!==r.row)&&(c(r.lesson),r=null,s.classList.remove("on")),!r&&f&&!e.has(f.lesson)&&l.z<uP){const p=(l.obstacles.find(x=>x.row===f.row).z-l.z)/l.speed;p<=hP&&p>=fP&&(r=f,a(f))}else r&&f&&(r=f);const h=r!==null&&l.buffered!==null&&r.accept.includes(l.buffered);return o=r&&!h?Math.max(0,o-u/dP):Math.min(1,o+u/pP),o},offer(l){const u=r?l.find(f=>r.accept.includes(f)):void 0;return u?(o=.4,u):null}}}const Bg="skyrun.progress";function zg(){try{const n=JSON.parse(localStorage.getItem(Bg)??"{}");return n&&typeof n=="object"?n:{}}catch{return{}}}function xP(n){try{localStorage.setItem(Bg,JSON.stringify(n))}catch{}}function Ua(n){return zg()[n]??0}function yc(n){return!n.unlock||Ua(n.unlock.from)>=n.unlock.meters}const _P=()=>Object.values(fs).filter(n=>!yc(n));function Hg(n){const t=_P(),e=zg();let i=!1;for(const[s,r]of Object.entries(n))Number.isFinite(r)&&r>(e[s]??0)&&(e[s]=Math.floor(r),i=!0);return i&&xP(e),t.filter(s=>yc(s))}const MP=(n,t)=>Hg({[n]:t}),Gg="skyrun.unlockSeen";function Vg(){try{const n=JSON.parse(localStorage.getItem(Gg)??"[]");return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch{return[]}}function um(){const n=Vg();return Object.values(fs).filter(t=>t.unlock&&yc(t)&&!n.includes(t.id))}function yP(n){try{localStorage.setItem(Gg,JSON.stringify([...new Set([...Vg(),n])]))}catch{}}function bP(n){const t={};for(const e of Object.keys(fs))typeof n[e]=="number"&&(t[e]=n[e]);return Hg(t)}const SP=n=>(n/1e3).toLocaleString("vi-VN",{maximumFractionDigits:1});function wP(n,t,e){yP(t.id);const i=document.createElement("div");i.className="unlock-pop",i.setAttribute("role","dialog"),i.setAttribute("aria-label",`Đã mở khoá ${t.name}`);const s=document.createElement("div");s.className=`unlock-card map-${t.region}`;const r=(u,f,h)=>{const d=document.createElement(u);return d.className=f,d.textContent=h,s.appendChild(d),d};if(r("div","unlock-kicker","Mở khoá map mới!"),r("h2","unlock-name",t.name),r("p","unlock-sub",t.tagline),t.unlock){const u=r("div","map-goal done","");u.appendChild(document.createElement("i")).style.width="100%",r("small","unlock-goal",`Đã bay ${SP(t.unlock.meters)} km ở ${fs[t.unlock.from].name} ✓`)}const o=document.createElement("div");o.className="unlock-actions";const a=document.createElement("button");a.type="button",a.className="btn-play",a.textContent=`Bay ${t.name}`;const c=document.createElement("button");c.type="button",c.className="btn-lobby",c.textContent="Để sau",o.append(a,c),s.appendChild(o),i.appendChild(s);for(const u of["touchstart","touchend","touchmove","pointerdown","mousedown"])i.addEventListener(u,f=>f.stopPropagation());const l=()=>i.remove();a.addEventListener("click",u=>{u.stopPropagation(),l(),e(t)}),c.addEventListener("click",u=>{u.stopPropagation(),l()}),i.addEventListener("click",u=>{u.target===i&&l()}),i.addEventListener("keydown",u=>{if(u.key==="Escape")c.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===c?c:a).click();else return;u.stopPropagation(),u.preventDefault()}),n.appendChild(i),a.focus({preventScroll:!0})}const TP=[{name:"Mù Cang Chải",tagline:"Ruộng bậc thang vàng óng, đèo Khau Phạ nối dài."},{name:"Sapa",tagline:"Fansipan trên biển mây, rừng thông và thác Bạc."}],Sa=n=>(n/1e3).toLocaleString("vi-VN",{maximumFractionDigits:1});function hm(n){try{localStorage.setItem(_m,n.id)}catch{}const t=new URLSearchParams(location.search);t.set("map",n.id),location.search=t.toString()}const _i=(n,t,e)=>{const i=document.createElement(n);return i.className=t,i.textContent=e,i};function EP(n){const t=document.createElement("div");t.className="lobby-panel",t.hidden=!0,t.setAttribute("role","dialog"),t.setAttribute("aria-label","Sảnh chọn map");const e=document.createElement("div");e.className="lobby-card";const i=document.createElement("div");i.className="lobby-head";const s=document.createElement("button");s.type="button",s.className="board-close",s.setAttribute("aria-label","Đóng"),s.textContent="×",i.append(_i("b","lobby-title","Chọn map"),s);const r=document.createElement("div");r.className="lobby-grid",e.append(i,r),t.appendChild(e),n.appendChild(t);for(const h of["touchstart","touchend","touchmove","pointerdown"])t.addEventListener(h,d=>d.stopPropagation(),{passive:!0});t.addEventListener("mousedown",h=>{h.stopPropagation(),h.target instanceof Element&&h.target.closest("button")&&h.preventDefault()});let o=[],a;const c=h=>{const d=document.createElement("button");d.type="button";const p=yc(h),x=h.id===hs,g=o.includes(h);d.className=`lobby-map map-${h.region}${x?" current":""}${p||x?"":" locked"}${g?" fresh":""}`;const m=g?"Đã mở! Chạm để bay":x?"Đang bay":p?"Đã mở — chạm để bay":h.unlock?`Bay ${Sa(h.unlock.meters)} km ở ${fs[h.unlock.from].name} để mở`:"";if(d.append(_i("b","lobby-name",h.name),_i("small","lobby-sub",h.tagline),_i("span","lobby-status",m)),p&&Ua(h.id)&&d.appendChild(_i("em","lobby-best",`Kỷ lục của bạn: ${Sa(Ua(h.id))} km`)),h.unlock&&(!p||g)){const M=Math.min(Ua(h.unlock.from),h.unlock.meters),S=document.createElement("div");S.className=`map-goal${M>=h.unlock.meters?" done":""}`,S.appendChild(document.createElement("i")).style.width=`${100*M/h.unlock.meters}%`,d.append(S,_i("em","lobby-best",`${Sa(M)} / ${Sa(h.unlock.meters)} km`))}return d.addEventListener("click",()=>{p&&!x&&hm(h)}),d},l=()=>{r.replaceChildren(...Object.values(fs).map(c),...TP.map(h=>{const d=document.createElement("div");return d.className="lobby-map soon",d.append(_i("b","lobby-name",h.name),_i("small","lobby-sub",h.tagline),_i("span","lobby-status","Sắp có")),d}))},u=()=>{t.hidden=!0};s.addEventListener("click",u),t.addEventListener("click",h=>{h.target===t&&u()}),window.addEventListener("keydown",h=>{h.code==="Escape"&&!t.hidden&&u()});const f=()=>{const h=um().length>0||o.length>0;for(const d of n.querySelectorAll("[data-lobby]"))d.classList.toggle("has-news",h)};return{open(){l(),t.hidden=!1;const h=um()[0];h&&!n.querySelector(".unlock-pop")&&wP(n,h,hm),o=[],f()},setScreen(h){h!==a&&(a=h,h?f():u())},refresh(h=[]){h.length&&(o=[...new Set([...o,...h])]),t.hidden||l(),f()}}}function AP(){let n=null;return t=>{if(!ae.zoneNames||t.mode!=="run")return n=null,null;const e=t.z+t.speed*1.5,i=ae.zone(ze(e),$i(e));return i===n?null:(n=i,ae.zoneNames[i]?i:null)}}const Vi=1/60;function RP(n){const t=new URLSearchParams(location.search),e=YT(t),i=cP(n,e),{renderer:s,post:r}=i,o=Ix(),a=aE(n),c=OT(n,i.cam,i.lanterns,o,a,i.flashes,i.impacts,i.camera),l=pE(n,()=>m.mode==="run"&&!D.paused(),()=>m.steerX),u=eE(Number(t.get("seed")??0));let f=u();const h=Px(t);let d=t.get("auto")==="1",p=d||t.has("z");const x=AP(),g=t.has("alt");let m=Cc(f.seed,g);m.z=Number(t.get("z")??0);let M=0,S=null;const v=lP();v.capture(m);const _=vP(n,t.get("tut")==="1"),y=(O,$=!1,Q=1)=>{const _t=h.at(m.z),ft=v.view(m,Q),St=i.present(ft,M-Vi*(1-Q),O,_t,$);C.present(m,ft,Q,O),a.update(m,_t),o.update(St,m.mode==="run",_t);const Nt=x(m);Nt&&(a.zone(Nt),o.zone(Nt)),A.setScreen(T.visible())},w=()=>{m.mode==="run"||m.mode==="crash"||n.querySelector(".unlock-pop")||(m.mode==="over"&&(f=u()),m=Cc(f.seed,g),p=d||t.has("z"),m.z=Number(t.get("z")??0),v.capture(m),y(0,!0),mx(m),C.runStart(m,f.route),S=null,o.runStart(),T.hide(),a.setVisible(!0))},b=()=>{f=u(),m=Cc(f.seed,g),m.z=Number(t.get("z")??0),p=d||t.has("z"),S=null,v.capture(m),y(0,!0),T.showTitle(),a.setVisible(!1)},T=g2(n,w,()=>{T.visible()==="over"&&b(),A.open()}),A=EP(n),C=c2({root:n,params:t,hud:a,screens:T,view:i.ghosts,camera:i.camera,route:f.route,quality:()=>({tier:e.name,scale:j.scale}),rv:g?2:je.logRvBase+X0});C.progress().then(O=>O&&A.refresh(bP(O)));const L=S2(n,o),D=u2(n,L.el,matchMedia("(pointer: coarse)").matches);M2(n,L,o,i.ghosts,D),l.onAction(()=>{D.paused()?D.resume():T.visible()&&T.tapReady()&&w()}),l.onKey("KeyM",()=>(o.toggleSfx(),L.sync())),l.onKey("KeyN",()=>(o.toggleMusic(),L.sync())),l.onKey("KeyH",()=>a.setVisible(n.querySelector(".hud.hidden")!==null)),l.onTrick(i.trick),T.showTitle(),a.setVisible(!1);const N=O=>{v.capture(m),vx(m,d?pv(m):O,l.holdDown(),Vi,d?null:l.steer()),C.afterStep(m,d),c.handle(m.events,m);for(const $ of m.events)$.type==="crash"&&(S=$.kind);M+=Vi,m.mode==="over"&&!T.visible()&&(p||A.refresh(MP(je.id,m.z)),o.over(T.showOver(m,S)),C.runOver(m,S),a.setVisible(!1))};let B=0;const H=O=>{D.setRunning(m.mode==="run");const $=(m.mode==="crash"&&m.crashT<.9?.35:1)*D.factor(O)*(d?1:_.update(m,O));if(_.frozen()&&!D.paused()){const Q=l.take(),_t=l.steer(),ft=_t===null?m.lane:Im(m.lane,_t),St=_.offer(ft!==m.lane?[...Q,ft<m.lane?"left":"right"]:Q);St&&N(Q.includes(St)?[St]:[])}for(B+=O*$;B>=Vi;)N(l.take()),B-=Vi;y(O*$,!1,B/Vi)},W=()=>i.resize(n.clientWidth,n.clientHeight);window.addEventListener("resize",W),W(),y(0,!0),CT(s,{state:()=>m,advance(O){for(let $=0;$<O/Vi;$++)N(l.take()),y(Vi)},play(O,$=60){for(let Q=0;Q<O*$;Q++)H(1/$)},autopilot(O){d=O,O&&(p=!0)},jump(O){p=!0,m.z=O,m.nextChunkZ=O+200,m.obstacles=[],m.pickups=[],v.capture(m),y(0,!0)},dusk:h.forceDusk,clock:h.forceU,render:()=>{y(0),r.render()},bench(O){const $=s.getContext(),Q=new Uint8Array(4),_t=performance.now();for(let Nt=0;Nt<O;Nt++)s.info.reset(),r.render(),$.readPixels(0,0,1,1,$.RGBA,$.UNSIGNED_BYTE,Q);const{geometries:ft,textures:St}=s.info.memory;return{msPerFrame:(performance.now()-_t)/O,calls:s.info.render.calls,triangles:s.info.render.triangles,geometries:ft,textures:St,programs:s.info.programs?.length??0}}},i);const j=QT({renderer:s,post:r,tier:e,resize:W,tick:H,stats:t.has("stats")?O=>a.setStats(O):null,worldLine:()=>i.world.statsLine()});window.__skyrunQuality={tier:e,governor:j}}Ax(je.region);document.title=`Sky Run · ${Vm[je.region]}`;RP(document.getElementById("app"));tv();
