(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Rv=6e3,zm=[];function Cv(n){return zm.push(n),n}const Hm=new Promise(n=>{const t=()=>{Promise.allSettled(zm).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>n(),{timeout:1500}):setTimeout(n,100)})};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0}),setTimeout(n,Rv)}),Pv=n=>fetch(n,{priority:"low"}).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null);function Lv(){const n=window.SR_SW,t=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!n||!t||!("serviceWorker"in navigator)||Hm.then(()=>navigator.serviceWorker.register(n).catch(e=>console.warn("[skyrun] sw",e)))}const Pf=400,qa=n=>Math.max(0,Math.min(1,n));function Ao(n,t){return n<=t.hardAt?t.d0+(1-t.d0)*qa((n-Pf)/(t.hardAt-Pf)):1+.15*qa((n-t.hardAt)/3e3)}const Nv=[0,.12,.3,.5,.75];function Iv(n){let t=0;return Nv.forEach((e,i)=>{n>=e&&(t=i)}),t}function Dv(n){return Math.max(-.2,.35-.55*n)}function Uv(n){return n<=1?1-.28*qa((n-.3)/.7):.72-.06*qa((n-1)/.15)}const kv=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function Fv(n,t){return n<.5||t%2===0}const st={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,maxHp:2,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2},nr=2;function vn(n){return-n*st.laneGap}function xh(n,t){const e=Math.min(1,Ao(n,t));return st.speedStart+(st.speedMax-st.speedStart)*(1-(1-e)*(1-e))}const ts={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function Ka(n,t,e,i){const s=ts[n.kind];return Math.abs(i)>s.halfZ||Math.abs(t-vn(n.lane))>=s.halfX+st.hitHalfWidth?!1:e-st.hitHalfHeight<s.hi&&e+st.hitHalfHeight>s.lo}function Ov(n,t,e){return Math.abs(t-vn(n.lane))>=ts[n.kind].halfX+st.hitHalfWidth?!0:e==="flare"?n.kind==="spike"||n.kind==="ridge":e==="dive"?n.kind==="bridge"||n.kind==="overhang":!1}function Bv(n,t){return n.z+ts[n.kind].halfZ<t}const zv=[st.flareHeight,0,-5.5],Hv=0,Vm=1,Vv=2;function Kr(n,t,e){return!n.some(i=>Ka(i,vn(t),zv[e],0))}function Gv(n){const t=[];for(let e=-1;e<=1;e++)for(let i=0;i<3;i++)Kr(n,e,i)&&t.push({lane:e,tier:i});return t}function Lf(n){return Gv(n).length}function Lc(n,t,e){return e?n.some(i=>(i.kind==="pillar"||i.kind==="overhang")&&i.lane===t)?"none":"any":Kr(n,t,Vm)?"any":Kr(n,t,Hv)?"high":Kr(n,t,Vv)?"low":"none"}function Wv(n,t,e,i,s){const r=n.thermalV>8,o=n.low&&!r,a=(t[0].z-n.z)/n.speed,c=d=>{const p=Lc(t,d,r);if(p==="none")return 1/0;const v=p==="any"?0:p==="low"&&o?.3:1.5;return Math.abs(d-n.lane)+v+(e&&Lc(e,d,r)==="none"?.6:0)},l=[-1,0,1].filter(d=>c(d)<1/0).sort((d,p)=>c(d)-c(p))[0];if(l===void 0)return a<i+.12&&n.vert!=="flare"?["up"]:[];const u=Lc(t,l,r);if(l===n.lane&&u==="any")return null;const h=[],f=s&&l===n.lane&&n.pickups.some(d=>!d.taken&&d.lane===n.lane&&d.z>n.z&&d.z<t[0].z&&(u==="low"?d.v<-2:d.v>2)&&(d.z-n.z)/n.speed<.2);if(u==="high"){const d=n.vert!=="flare"||n.vertT>=st.vertIn+st.vertHold;(a<i+.12+(o?.06:0)||f)&&d&&h.push("up")}else u==="low"&&(a<i+.12||f)&&((n.alt?n.low:n.vert==="dive"&&n.vertT<st.vertIn+st.vertHold)||h.push("down"));if(l!==n.lane){const d=i+(Math.abs(l-n.lane)-1)*st.laneTime*1.3;a<=d&&h.push(l<n.lane?"left":"right")}return h}function Gm(n,t){const e=new Map;for(const i of n.obstacles){const s=i.z-n.z;if(i.passed||s<-ts[i.kind].halfZ||s>t)continue;const r=e.get(i.row)??[];r.push(i),e.set(i.row,r)}return[...e.values()].sort((i,s)=>i[0].z-s[0].z)}function Nf(n){return new Set(n.filter(t=>t.kind==="pillar"||t.kind==="spike"||t.kind==="overhang").map(t=>t.lane))}function Xv(n,t=.27,e=!0){if(n.mode!=="run")return[];const i=Gm(n,n.speed*2.2),s=i[0],r=o=>e?qv(n,o):[];return s?Wv(n,s,i[1],t,e)??r(s):$v(n)??r()}function $v(n){const t=n.gusts.find(i=>!i.taken&&!i.missed&&i.z+i.len>n.z);if(!t||t.z-n.z>n.speed*1.5)return null;if(t.lane!==n.lane)return n.laneT<1?[]:[t.lane<n.lane?"left":"right"];const e=(t.z-n.z)/n.speed;return Xm(n,t.v,e)?["up"]:e>.25?[]:t.v>2&&n.vert!=="flare"?["up"]:t.v<-2&&!Wm(n)?["down"]:[]}function Wm(n){return n.alt?n.low:n.vert==="dive"}function Xm(n,t,e){return n.alt&&n.low&&n.vert==="cruise"&&Math.abs(t)<=2&&e<.9}function qv(n,t){const e=n.pickups.find(o=>!o.taken&&o.kind==="lantern"&&o.lane===n.lane&&o.z>n.z);if(e&&n.thermalV<2){const o=(e.z-n.z)/n.speed;if(Xm(n,e.v,o))return["up"];if(e.v>2&&n.vert!=="flare"&&o<.2)return["up"];if(e.v<-2&&!Wm(n)&&o<.2)return["down"]}const i=n.pickups.find(o=>!o.taken&&o.z-n.z>n.speed*.35&&o.z-n.z<n.speed*1.2);if(!i||i.lane===n.lane||n.laneT<1)return[];const s=i.lane<n.lane?-1:1;return t&&Nf(t).has(n.lane+s)?[]:Gm(n,i.z-n.z).some(o=>Nf(o).has(n.lane+s))?[]:[s<0?"left":"right"]}const Kv=["khau-pha","ha-giang"],$m="skyrun.map";function Nc(n){return Kv.find(t=>t===n)??null}function Yv(){const n=globalThis;if(n.location){const e=Nc(new URLSearchParams(n.location.search).get("map"));if(e)return e;try{return Nc(n.localStorage?.getItem($m))??"khau-pha"}catch{return"khau-pha"}}const t=n.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return Nc(t??n.process?.env?.SKYRUN_MAP)??"khau-pha"}const Cn=Yv();function zo(n,t,e){let i=Math.imul(n,374761393)^Math.imul(t,668265263)^Math.imul(e+1,2246822519);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function If(n){return n*n*n*(n*(n*6-15)+10)}function ut(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=If(n-i),o=If(t-s),a=zo(i,s,e),c=zo(i+1,s,e),l=zo(i,s+1,e),u=zo(i+1,s+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+u)*r*o}function Gn(n,t,e,i){let s=0,r=1,o=0,a=1;for(let c=0;c<e;c++)s+=ut(n*a,t*a,i+c*31)*r,o+=r,r*=.5,a*=2.03;return s/o}function Df(n,t,e,i){let s=0,r=1,o=0,a=1,c=1;for(let l=0;l<e;l++){const u=1-Math.abs(ut(n*a,t*a,i+l*17)*2-1),h=u*u*c;c=Math.min(1,h*1.6),s+=h*r,o+=r,r*=.5,a*=2.1}return s/o}function Yr(n){return n<0?0:n>1?1:n}function Et(n,t,e){const i=Yr((e-n)/(t-n));return i*i*(3-2*i)}function Me(n,t,e){return n+(t-n)*e}const Zv=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],Jv=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],Ai={"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:Zv,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:null},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:Jv,profile:{d0:.2,hardAt:5e3,tighten:1.4},routePrefix:"hg",routeVersion:3,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}}},nn=Ai[Cn],We=nn.cycle,ui=nn.offset,mn=1100,qm=1320,iu=2450,Km=2700,Qv=150,_r=1480,Ho=1770,jv=[320,640,930];function tx(n){let t=0;for(const e of jv)t=Math.max(t,1-Et(0,70,Math.abs(n-e)));return t}function Uf(n){return n<mn?0:n<iu?Et(mn,qm,n):1-Et(iu,Km,n)}const ex={edge:mn,pullOut:_r,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:Uf,dive(n){const t=Et(mn+40,mn+380,n)-Et(iu-650,Km-60,n);return Qv*t},sill(n){return Et(760,940,n)*(1-Et(1092,1108,n))},village(n,t){return t%2!==0?0:Et(1600,1720,n)*(1-Et(2380,2500,n))},halfWidth(n){const t=Me(64,30,n<mn?tx(n):0);return Me(t,430,Uf(n))},extraDepth:()=>0,reveal(n){return Yr(Et(_r-20,_r+60,n)*(1-Et(1640,1760,n)))},drop(n){return Et(mn-25,mn+10,n)*(1-Et(_r-40,_r+20,n))},clean(n){return Et(mn-40,mn-10,n)*(1-Et(1600,1690,n))},zone(n,t){return n<mn-60?"gorge":n<qm?"mouth":t?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},is=600,Vo=1060,Ym=320,nx=Ym+13;function Ic(n){return Et(2230,2420,n)*(1-Et(3420,3520,n))}function ix(n){if(n<300)return Me(30,170,Et(0,140,n));let t=170;return t=Me(t,110,Et(900,1150,n)),t=Me(t,60,Et(2200,2260,n)),Me(t,30,Et(3440,3520,n))}const sx={edge:is,pullOut:Vo,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:Ic,dive(n){return Ym*(Et(is+20,Vo,n)-Et(2215,2740,n))},sill(n){return Et(1040,1120,n)*(1-Et(2205,2260,n))},village(n){return Et(2800,2900,n)*(1-Et(3380,3480,n))},halfWidth(n){return Me(ix(n),430,Ic(n))},extraDepth(n){if(n<2200)return 190*Et(20,160,n);const t=nx-Me(150,240,Ic(n));return Me(190,t,Et(2200,2260,n))*(1-Et(2760,2900,n))},reveal(n){return Et(2190,2270,n)*(1-Et(2560,2700,n))},drop(n){return Et(is-25,is+10,n)*(1-Et(Vo-40,Vo+20,n))},clean(n){return Et(is-40,is-10,n)*(1-Et(1100,1160,n))+Et(2200,2230,n)*(1-Et(2700,2760,n))},road(n){return Et(60,220,n)*(1-Et(1700,1860,n))},roadDepth(n){return 55+28*Math.sin(n/170)+12*Math.sin(n/61+1.3)},cloud(n){return 1-Et(-1,120,n)*(1-Et(2250,2600,n))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zone(n){return n<is?"rim":n<1100?"dive":n<1900?"river":n<2200?"cave":n<2750?"climb":n<3500?"village":"gate"}},rx={"khau-pha":ex,"ha-giang":sx},ce=rx[Cn],Ri=2*We,ai=ui;function ao(n,t){if(n.k===0)return{x:n.x+t*Math.sin(n.th),z:n.z+t*Math.cos(n.th),th:n.th};const e=n.th+n.k*t;return{x:n.x+(Math.cos(n.th)-Math.cos(e))/n.k,z:n.z+(Math.sin(e)-Math.sin(n.th))/n.k,th:e}}function kf(n,t){const e=[];let i=0,s=0,r=t,o=0;const a=(c,l)=>{if(c<.5)return;const u={k:l,x:i,z:s,th:r},h=ao(u,c),f=ao(u,c/2),d=Math.max(Math.hypot(f.x-i,f.z-s),Math.hypot(f.x-h.x,f.z-h.z));e.push({u0:o,len:c,k:l,x:i,z:s,th:r,bx:f.x,bz:f.z,br:d}),i=h.x,s=h.z,r=h.th,o+=c};for(const c of[1,-1]){const l=c===1?0:We;for(const[u,h,f]of n)a(l+u-o,0),a(Math.abs(h)*Math.PI/180*f,c*Math.sign(h)/f);a(l+We-o,0)}return{segs:e,x:i,z:s}}function ox(n){const t=kf(n,0),{segs:e,x:i,z:s}=kf(n,-Math.atan2(t.x,t.z));let r=e.length-1;for(;r>0&&e[r].u0>ai;)r--;const o=ao(e[r],ai-e[r].u0),a=e.reduce((u,h)=>u+h.bx,0)/e.length,c=e.reduce((u,h)=>u+h.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-a,u.bz-c)+u.br));return{segs:e,endX:i,endZ:s,ox:o.x,oz:o.z,bx:a,bz:c,br:l}}const Ro=ox(nn.arcs);function Ya(n,t,e=Ro){const i=n+ai,s=Math.floor(i/Ri),r=i-s*Ri;let o=e.segs.length-1;for(;o>0&&e.segs[o].u0>r;)o--;const a=ao(e.segs[o],r-e.segs[o].u0);return t.x=a.x+s*e.endX-e.ox,t.z=a.z+s*e.endZ-e.oz,t.yaw=a.th,t}const ax={x:0,z:0,yaw:0},cx={x:0,z:0,yaw:0};function lx(n,t=30){return(Ya(n+t,cx).yaw-Ya(n-t,ax).yaw)/(2*t)}function ux(n,t,e,i,s,r){let o;if(n.k===0)o=t*Math.sin(n.th)+e*Math.cos(n.th);else{const h=Math.sign(n.k);let d=Math.atan2(h*(e+Math.sin(n.th)/n.k),-h*(t-Math.cos(n.th)/n.k))-n.th;d-=2*Math.PI*Math.round((d-n.k*n.len/2)/(2*Math.PI)),o=d/n.k}const a=o>=i-.01&&o<=s+.01;o=Math.min(s,Math.max(i,o));const c=ao(n,o),l=t-(c.x-n.x),u=e-(c.z-n.z);return r.s=o,r.dist=Math.hypot(l,u),r.lat=l*Math.cos(c.th)-u*Math.sin(c.th),a}const Mr={s:0,lat:0,dist:0};function hx(n,t,e,i,s,r=Ro){s.dist=1/0;const o=Math.floor((e+ai)/Ri),a=Math.floor((i+ai)/Ri);for(let c=o;c<=a;c++){const l=c*Ri-ai;for(const u of r.segs){const h=l+u.u0;h>i||h+u.len<e||(ux(u,n-c*r.endX+r.ox-u.x,t-c*r.endZ+r.oz-u.z,Math.max(0,e-h),Math.min(u.len,i-h),Mr),Mr.dist<s.dist&&(s.dist=Mr.dist,s.s=h+Mr.s,s.lat=Mr.lat))}}return s}function Ve(n){return((n+ui)%We+We)%We}function es(n){return Math.floor((n+ui)/We)}const Zr=9.5;function $n(n){return ce.village(Ve(n),es(n))}function ji(n){return $n(n)>.97}function Dn(n){return ce.openness(Ve(n))}function Kn(n){return 260+30*Math.sin(n/1700)}function Ne(n){return Kn(n)-ce.dive(Ve(n))}function _h(n){return ce.sill(Ve(n))}function Ci(n){return(Ne(n+2)-Ne(n-2))/4}function Zm(n,t){return Math.max(-1.1,Math.min(1.1,Math.atan(t*t*lx(n)/9.8)))}const $s={x:0,z:0,yaw:0};function pn(n){return Ya(n,$s).yaw}function ue(n,t,e,i){return Ya(n,$s),i.x=$s.x+t*Math.cos($s.yaw),i.y=Ne(n)+e,i.z=$s.z-t*Math.sin($s.yaw),i}function ir(n){return ce.halfWidth(Ve(n))}function Co(n){return ce.extraDepth(Ve(n))}function su(n){return Kn(n)-Me(150,240,Dn(n))-Co(n)}function fx(n){return ce.reveal(Ve(n))}function dx(n){return ce.drop(Ve(n))}function Jm(n){return ce.clean(Ve(n))}function px(n,t){const e=(Ne(n+4)-Ne(n-4))/8,i=(Ne(n+4)-2*Ne(n)+Ne(n-4))/16;return 1+t*t*i/(Math.pow(1+e*e,1.5)*9.8)}const Qm=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ... ..o ... .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],mx={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},gx=8,jm=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function Za(n){return n.split(" ")}function Pi(n){let t=n.seed=n.seed+1831565813|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vx(n,t,e,i=1){const s=kv;let r=0;for(;r<s.length-1&&n>s[r+1][0];)r++;const o=s[r],a=s[Math.min(r+1,s.length-1)],c=a[0]>o[0]?Math.max(0,Math.min(1,(n-o[0])/(a[0]-o[0]))):1,l=(e?.5:1)*(t?.6+.3*Math.min(1,n):1)*i;return{p3:(o[1]+(a[1]-o[1])*c)*l,p2:(o[2]+(a[2]-o[2])*c)*l}}const xx=new Set(["o","u","d"]),_x=/[BLHO]/;function Mx(n,t,e,i,s,r,o){if(!t.length)return;for(let _=i-3;_<=i+3;_++)if(_!==i&&_x.test(e[_]??""))return;const{p3:a,p2:c}=vx(Ao(Math.max(0,s),n.diff),r,o,n.diff.tighten),l=Pi(n),u=l<c?2:l<c+a?3:0;if(!u||Lf(t)<=u)return;const h=t.some(_=>_.kind==="bridge"||_.kind==="ridge");if(h&&o)return;const f=_=>t.some(M=>(M.kind==="pillar"||M.kind==="spike"||M.kind==="overhang")&&M.lane===_),d=[-1,0,1].filter(_=>!f(_)&&(h||e[i][_+1]===".")&&![i-2,i-1,i+1].some(M=>xx.has(e[M]?.[_+1]??""))),p=h?["pillar"]:o?["spike"]:["pillar","spike"],v=[[]];for(const _ of d){const M=[];for(const x of v){M.push(x);for(const y of p)M.push([...x,{kind:y,lane:_}])}v.splice(0,v.length,...M)}const g=_=>[-1,0,1].every(M=>[...t,..._].some(x=>(x.kind==="pillar"||x.kind==="overhang")&&x.lane===M)),m=v.filter(_=>_.length&&Lf([...t,..._])===u&&!g(_));m.length&&t.push(...m[Math.floor(Pi(n)*m.length)])}const Ff=700;function Ja(n,t){const e=Math.max(0,t);return xh(e,n.diff)*st.cellSeconds*Uv(Ao(e,n.diff))}function ru(n,t,e){const i=Ao(Math.max(0,e),n.diff),s=Iv(i),r=t.filter(h=>h.tier<=s&&!n.lastBag.includes(h.id)),o=r.length?r:t.filter(h=>h.tier<=s),a=Dv(i),c=o.map(h=>(h.tier===s?1.4:1)/(1+a*h.tier));let l=Pi(n)*c.reduce((h,f)=>h+f,0),u=o[0];for(let h=0;h<o.length;h++)if(l-=c[h],l<=0){u=o[h];break}return n.lastBag.push(u.id),n.lastBag.length>4&&n.lastBag.shift(),u}const Of={o:0,u:st.flareHeight,d:-5.5},yx={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function Jr(n,t,e,i){const s=Za(t.cells),r=Ja(n,e);let o=!1;const a=Math.floor((e+s.length*r)/Ff),c=a>Math.floor(e/Ff)&&e>300&&Fv(Ao(e,n.diff),a);return s.forEach((l,u)=>{const h=e+(u+.5)*r,f=n.rowId++,d=ji(h),p=[];if(l==="HHH"||l==="LLL")p.push({kind:l==="HHH"?"bridge":"ridge",lane:0});else for(let m=-1;m<=1;m++){const _=yx[l[m+1]];_&&p.push({kind:d&&_==="pillar"?"spike":_,lane:m})}Mx(n,p,s,u,h,i,d);const v=m=>{n.obstacles.push({id:n.nextId++,kind:m.kind,lane:m.lane,z:h,open:i,row:f,passed:!1})};if(l==="HHH"||l==="LLL"){p.forEach(v);return}const g=p.length>0;for(let m=-1;m<=1;m++){const _=l[m+1],M=p.filter(x=>x.lane===m);if(M.forEach(v),!M.length&&_ in Of){const x=s[u-1]==="HHH"||s[u-2]==="HHH",y=n.alt&&_==="o"&&x?st.flareHeight:Of[_];n.pickups.push({id:n.nextId++,kind:"lantern",lane:m,v:y,z:h,taken:!1})}}if(c&&!o&&g){const m=[-1,0,1].filter(_=>l[_+1]==="."&&Kr(p,_,Vm));if(m.length){const _=m[Math.floor(Pi(n)*m.length)],M=Pi(n),x=n.alt?M<.45?"thermal":M<.75||n.hp>=st.maxHp?"smoke":"shield":M<.6||n.hp>=st.maxHp?"thermal":"shield";n.pickups.push({id:n.nextId++,kind:x,lane:_,v:0,z:h,taken:!1}),o=!0}}}),n.chunksSpawned++,e+s.length*r}const t0=(...n)=>Qm.filter(t=>n.includes(t.id)),e0=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],bx=[...t0("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...e0.filter(n=>n.id!=="luon-mai")],Sx=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...t0("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...e0],wx=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],Tx=jm,Ex=5;function Ax(n){const t=["o..",".o.","..o"][n+1],e=[".BB","B.B","BB."][n+1];return{id:`cong-troi-${n}`,tier:0,cells:`... ... ${t} ${t} ${t} ${e} ${t} ... ...`}}function Mh(n){n.mult=Math.min(st.multMax,1+n.multNear+n.multLantern)}function yh(n,t,e){n.bonus+=e,n.parts[t]+=e}function Rx(n,t){const e=st.lanternMultStep*n.streak;e>=n.multLantern?n.multLantern=e:n.multLantern+=(e-n.multLantern)*(1-Math.exp(-.016666666666666666/st.lanternMultTau)),Mh(n)}function n0(n){n.streak=0}const Cx=[0,st.flareHeight,-5.5];function i0(n,t,e){const i=t+e[0];if(n.gusts.some(o=>o.z===i))return;let s=Math.floor(Pi(n)*3)-1,r=0;e.forEach((o,a)=>{const c=Pi(n),l=Pi(n);a>0&&(s=Math.max(-1,Math.min(1,s+(c<.35?-1:c<.7?1:0))));let u=a===0?0:Cx[l<.6?0:l<.8?1:2];n.alt&&u===0&&r<-2&&(u=st.flareHeight),r=u,n.gusts.push({id:n.nextId++,index:a,count:e.length,lane:s,v:u,z:t+o,len:st.gustLen,taken:!1,missed:!1})})}function Px(n){return n.thermalV+n.windLift}function Lx(n,t,e,i){if(!i){n.tailwind=0,n.windLift=0,n.liftT=0;return}n.tailwind*=Math.exp(-t/(e?st.surgeTauNearRow:st.tailwindTau)),e&&(n.liftT=0),n.liftT=Math.max(0,n.liftT-t);const s=n.liftT>0?2.2:e?2.5:1.2;n.windLift+=((n.liftT>0?st.gustLift:0)-n.windLift)*(1-Math.exp(-t*s))}function Nx(n){for(const t of n.gusts){if(t.taken||t.missed)continue;if(n.z<t.z)break;if(n.z>t.z+t.len){t.missed=!0,n.gustChain=0,n.events.push({type:"gust-miss"});continue}if(Math.abs(n.x-vn(t.lane))>st.gustRadiusX||Math.abs(n.moveV-t.v)>st.gustRadiusV)continue;t.taken=!0,t.index===0&&(n.gustChain=0),n.gustChain++,n.gustsTaken++,n.tailwind=Math.min(st.tailwindMax,n.tailwind+st.tailwindPerGust),n.liftT=st.gustLiftTime;const e=t.index===t.count-1&&n.gustChain===t.count;yh(n,"gust",(st.gustScore+(e?st.gustChainScore:0))*n.mult),n.events.push({type:"gust",chain:n.gustChain,full:e})}}function Ix(n,t){n.gusts.length&&n.gusts[0].z+n.gusts[0].len<t&&(n.gusts=n.gusts.filter(e=>e.z+e.len>=t))}const Dx=[{kind:"rows",from:40,to:560,pool:bx,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:Sx,open:!1},{kind:"rows",from:1990,to:2110,pool:wx,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:Tx,open:!0},{kind:"gate",at:3560}];function Ux(n,t){const e=Ve(t),i=t-e;for(const s of Dx){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return i+s.from+.5;const a=ru(n,s.pool,t);return e+Za(a.cells).length*Ja(n,t)>s.to?i+s.to+.5:Jr(n,a,t,s.open)}if(e>=s.at)continue;if(s.kind==="gusts")return i0(n,i,s.phases),i+s.at+.5;const r=Math.floor(Pi(n)*3)-1,o=Math.max(t,i+s.at-(Ex+.5)*Ja(n,t));return Math.max(Jr(n,Ax(r),o,!1),i+s.at+.5)}return i+We+.5}const kx=[1140,1225,1310,1395,1480];function Fx(n,t){const e=Ve(t),i=Ja(n,t),s=mn-30-(gx+.5)*i;if(e<40)return t+(40-e)+.5;if(e<s){const a=ru(n,Qm,t);return e+Za(a.cells).length*i>s?t+(s-e)+.5:Jr(n,a,t,!1)}if(e<mn){let a=Jr(n,mx,t,!1);i0(n,t-e,kx);const c=Ve(a);return c>mn&&c<Ho&&(a+=Ho-c+.5),a}if(e<Ho)return t+(Ho-e)+.5;const r=ru(n,jm,t);return e+Za(r.cells).length*i>We-60?t+(We-e)+40:Jr(n,r,t,!0)}const Ox={"khau-pha":Fx,"ha-giang":Ux},Bx=Ox[Cn];function zx(n){for(;n.nextChunkZ<n.z+st.spawnAheadMeters;)n.nextChunkZ=Bx(n,n.nextChunkZ);const t=n.z-st.despawnBehind;n.obstacles.length&&n.obstacles[0].z<t&&(n.obstacles=n.obstacles.filter(e=>e.z>=t)),n.pickups.length&&n.pickups[0].z<t&&(n.pickups=n.pickups.filter(e=>e.z>=t)),Ix(n,t)}const s0=1e9;function Hx(n){const t=st.thermalTime-.6;for(let e=.5;e<t;e+=.22){const i=n.z+n.speed*1.08*e,s=new Set(n.obstacles.filter(a=>a.kind==="pillar"&&Math.abs(a.z-i)<12).map(a=>a.lane)),r=[-1,0,1].filter(a=>!s.has(a));if(!r.length)continue;const o=r.includes(n.lane)?n.lane:r[0];n.pickups.push({id:s0+n.trailIds++,kind:"lantern",lane:o,v:st.thermalHeight,z:i,taken:!1})}n.pickups.sort((e,i)=>e.z-i.z)}function Vx(n,t){return n.thermalV>8&&t.id<s0?!1:!n.pickups.some(e=>e!==t&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-t.z)<.5)}function Gx(n){for(const t of n.pickups){if(t.taken)continue;const e=t.z-n.z;if(e>3)break;if(e<-3){t.kind==="lantern"&&e>-3-n.speed/60&&Vx(n,t)&&n0(n);continue}Math.abs(n.x-vn(t.lane))<st.lanternPickRadius&&Math.abs(n.v-t.v)<st.lanternPickRadius&&(t.taken=!0,t.kind==="lantern"?(n.lanterns++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak),yh(n,"lantern",st.lanternScore*n.mult*(n.smokeT>0?st.smokeLanternMul:1)),n.events.push({type:"lantern",streak:n.streak,id:t.id})):(t.kind==="thermal"?(n.thermalT=st.thermalTime,n.low=!1,Hx(n)):t.kind==="smoke"?(n.smokeT=st.smokeTime,n.smokes++):n.hp=Math.min(st.maxHp,n.hp+1),n.events.push({type:"booster",kind:t.kind})))}}function r0(n,t){const e=Math.sign(t-n.lane);n.lane=t,n.laneT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert=n.vert,n.events.push({type:"lane",dir:e})}function Wx(n,t){n.steerX=Math.max(-7,Math.min(st.steerMax,t));const e=o0(n.lane,n.steerX);e!==n.lane&&r0(n,e)}function o0(n,t){return Math.abs(t-vn(n))<=st.laneGap*.57?n:Math.max(-1,Math.min(1,Math.round(-t/st.laneGap)))}function a0(n,t,e,i,s,r){const o=n-e,a=t+i*o,c=Math.exp(-i*s);return r.x=e+(o+a*s)*c,r.vel=(t-i*a*s)*c,r}function c0(){return st.vertIn+st.vertHold+st.vertOut}const Dc={x:0,vel:0};function Xx(n,t){n.vert!=="cruise"&&(!n.alt&&n.holdDive&&n.vertT>st.vertIn&&n.vertT<st.vertIn+st.vertHold&&(n.vertT=st.vertIn+.01),n.vertT+=t,n.vertT>=(n.alt&&n.vert==="dive"?st.lowTransition:c0())&&(n.vert="cruise",n.vertT=0));const e=n.vert!=="cruise"&&n.vertT<st.vertIn+st.vertHold,i=n.low?-5.5:0,s=e?n.vert==="flare"?st.flareHeight:-5.5:i;a0(n.moveV,n.moveVel,s,e||n.low?st.vertOmegaIn:st.vertOmegaOut,t,Dc),n.moveV=Dc.x,n.moveVel=Dc.vel}const Uc={x:0,vel:0};function kc(n,t=!1,e=nn.profile){return{mode:"ready",seed:n,alt:t,diff:e,low:!1,smokeT:0,smokes:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],hp:st.maxHp,stunT:0,hurtRow:-1,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:es(0)*2+1,lastBag:[],events:[]}}function $x(n){n.mode="run",n.nextChunkZ=Math.max(n.nextChunkZ,n.z+220)}function Bf(n,t){if(t==="left"||t==="right"){const i=t==="left"?-1:1;if(n.laneT<st.laneTime*.6)return!1;const s=Math.max(-1,Math.min(1,n.lane+i));return n.steerX=vn(s),s!==n.lane&&r0(n,s),!0}const e=t==="up"?"flare":"dive";return n.alt&&e==="dive"&&n.low?!0:n.vert===e&&n.vertT<c0()-st.vertOut?!1:(n.alt&&(n.low=e==="dive"),n.vert=e,n.vertT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert="cruise",n.events.push({type:"vert",kind:e}),!0)}function qx(n,t){if(t.row!==n.hurtRow){if(n.hp-=Ov(t,n.steerX,n.low?"dive":n.vert)?1:n.hp,n.hp>0){n.hurtRow=t.row,n.stunT=st.stunTime,n.hitstopT=st.hitstop,n.surge=st.surgeMin,n.combo=0,n.multNear=0,n0(n),Mh(n),n.events.push({type:"hurt",hp:n.hp,kind:t.kind});return}n.hp=0,n.mode="crash",n.crashT=0,n.hitstopT=st.hitstop*2,n.events.push({type:"crash",kind:t.kind})}}function Kx(n,t,e,i,s=null){if(n.events.length=0,n.time+=i,n.mode==="over")return;if(n.mode==="crash"){n.crashT+=i,n.z+=n.speed*i*Math.max(0,1-n.crashT*1.5),n.crashT>=st.crashSeconds&&(n.mode="over");return}if(n.hitstopT>0){n.hitstopT-=i;return}const r=n.mode==="run";r&&s!==null&&Wx(n,s);for(const d of r?t:[])Bf(n,d)||(n.buffered=d,n.bufferT=st.bufferTime);n.buffered&&(n.bufferT-=i,(Bf(n,n.buffered)||n.bufferT<=0)&&(n.buffered=null)),n.holdDive=e&&n.vert==="dive";const o=n.vert==="dive"?st.diveSpeedMul:n.vert==="flare"?st.flareSpeedMul:1,a=Math.sin(Math.atan(Ci(n.z))),c=n.obstacles.some(d=>!d.passed&&d.z>n.z&&d.z<n.z+n.speed*2.5),l=n.surge>0&&c?st.surgeTauNearRow:st.surgeTau;n.surge+=(-9.8*a-n.surge/l)*i,n.surge=r?Math.max(st.surgeMin,Math.min(st.surgeMax,n.surge)):0,Lx(n,i,c,r);const u=r?xh(n.z,n.diff)*o+n.surge+n.tailwind:24;n.speed+=(u-n.speed)*(1-Math.exp(-i*3)),n.z+=n.speed*i,r&&zx(n);const h=es(n.z)*2+(Dn(n.z)>.5?1:0);h!==n.sectionIndex&&(n.sectionIndex=h,n.events.push({type:"section",open:h%2===1,index:h})),n.laneT=Math.min(1,n.laneT+i/st.laneTime),a0(n.x,n.xVel,n.steerX,st.laneOmega,i,Uc),n.x=Uc.x,n.xVel=Uc.vel,Xx(n,i),n.thermalT>0&&n.thermalT<=i&&n.obstacles.some(d=>(d.kind==="bridge"||d.kind==="ridge"||d.kind==="overhang")&&d.z>n.z&&d.z<n.z+n.speed*2.2)&&(n.thermalT=i*2),n.thermalT=Math.max(0,n.thermalT-i);const f=n.thermalT>0?st.thermalHeight:0;if(n.thermalV+=(f-n.thermalV)*(1-Math.exp(-i*(n.thermalT>0?2.5:1.8))),n.v=n.thermalV+n.windLift+n.moveV,n.stunT=Math.max(0,n.stunT-i),r&&(n.smokeT=Math.max(0,n.smokeT-i)),r){for(const d of n.obstacles)if(!(d.passed||d.z-n.z>6)){if(Ka(d,n.x,n.v,d.z-n.z)){if(d.passed=!0,qx(n,d),n.mode==="crash")return;continue}Bv(d,n.z)&&(d.passed=!0,n.time-n.dodgeTime<=st.nearMissWindow+.1&&Ka(d,n.dodgeX,n.alt?n.dodgeV:n.thermalV,0)&&(n.combo++,n.comboT=0,n.multNear=st.multStep*n.combo,Mh(n),yh(n,"nearMiss",25*n.mult),n.events.push({type:"near-miss",combo:n.combo,kind:d.kind})))}Gx(n),Nx(n),n.comboT+=i,n.comboT>st.comboBreak&&n.combo>0&&(n.combo=0,n.multNear=0),Rx(n),n.score+=n.speed*i*n.mult}}function sr(n){return Math.floor(n.score+n.bonus)}const Yx=["keydown","pointerdown","pointerup","touchstart","touchend","click"],Zx=1500,Jx=1e3;function Qx(n){let t=-1/0;n.addEventListener("statechange",()=>{n.state==="running"&&(t=performance.now())});const e=()=>{n.state!=="running"&&n.state!=="closed"&&n.resume()};for(const s of Yx)window.addEventListener(s,e,{capture:!0,passive:!0});let i=-1/0;return window.addEventListener("pointermove",()=>{const s=performance.now();n.state!=="suspended"||s-i<Zx||(i=s,n.resume())},{passive:!0}),{resume:e,justWoke:()=>n.state!=="running"||performance.now()-t<Jx}}const jx=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss"],l0=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi"],zf={"wind-loop":.6},Fc=new URLSearchParams(location.search).get("voice"),t_=Fc&&/^[a-z_]+$/.test(Fc)?`audio-opts/voice/${Fc}`:"audio/voice",e_=n=>l0.includes(n)?`${t_}/${n}.mp3`:`audio/${n}.mp3`,u0=new Map;for(const n of[...jx,...l0])u0.set(n,fetch(e_(n)).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null));function n_(n){const t=new Map;for(const[e,i]of u0)i.then(async s=>{if(!s)return;const r=await n.decodeAudioData(s.slice(0)).catch(()=>null);r&&t.set(e,zf[e]?s_(n,r,zf[e]):r)});return{get:e=>t.get(e),play(e,i,s={}){const r=t.get(e);if(!r)return null;const o=n.createBufferSource();o.buffer=r,o.loop=s.loop??!1,o.playbackRate.value=s.rate??1;const a=n.createGain();a.gain.value=s.vol??1;let c=o.connect(a);if(s.pan){const l=n.createStereoPanner();l.pan.value=s.pan,c=c.connect(l)}return c.connect(i),o.start(),o}}}function i_(n,t){const e=Math.floor(t*n.sampleRate),i=n.length-e;if(i<=e)return n.duration;for(let s=0;s<n.numberOfChannels;s++){const r=n.getChannelData(s);for(let o=0;o<e;o++){const a=o/e;r[o]=r[o]*Math.sqrt(a)+r[i+o]*Math.sqrt(1-a)}}return i/n.sampleRate}function s_(n,t,e){const i=Math.floor(e*t.sampleRate),s=t.length-i;if(s<=i)return t;const r=n.createBuffer(t.numberOfChannels,s,t.sampleRate);for(let o=0;o<t.numberOfChannels;o++){const a=t.getChannelData(o),c=r.getChannelData(o);c.set(a.subarray(0,s));for(let l=0;l<i;l++){const u=l/i;c[l]=a[l]*Math.sqrt(u)+a[s+l]*Math.sqrt(1-u)}}return r}const Qr=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8,map:"ha-giang"},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9}],Ua=n=>Qr.find(t=>t.id===n),h0="skyrun.settings",f0="skyrun.sound";function d0(){try{const n=JSON.parse(localStorage.getItem(f0)??"{}");if(n.v===2)return{sfx:n.sfx!==!1,music:n.music!==!1};const t=n.muted===!0;return{sfx:!t,music:!t&&n.music!==!1}}catch{return{sfx:!0,music:!0}}}function r_(n){try{localStorage.setItem(f0,JSON.stringify({v:2,...n}))}catch{}}const o_=["on","dim","off"];function co(){try{const n=JSON.parse(localStorage.getItem(h0)??"{}");return{music:typeof n.music=="string"?n.music:"shuffle",ghosts:o_.includes(n.ghosts)?n.ghosts:"on"}}catch{return{music:"shuffle",ghosts:"on"}}}function p0(n){try{localStorage.setItem(h0,JSON.stringify({...co(),...n}))}catch{}}const yr=3,a_=-13.1,c_=20,l_="music-flight",Oc=n=>{const t=Qr.filter(e=>e.id!==n&&(!e.map||e.map===Cn));return n===null?t.find(e=>e.map===Cn)??Ua(l_)??Qr[0]:t[Math.floor(Math.random()*t.length)]??Qr[0]};function u_(n,t){const e=new Map;let i=!1;Hm.then(()=>i=!0);let s=!1,r=co().music,o=Oc(null),a=null;const c=d=>{let p=e.get(d.id);return p||e.set(d.id,p={bytes:Pv(d.file),buf:null,loop:0,decoding:!1}),p},l=(...d)=>{for(const p of e.keys())d.includes(p)||e.delete(p)},u=(d,p)=>{const v=c(d);return v.buf?!0:(p&&!v.decoding&&(v.decoding=!0,v.bytes.then(async g=>{const m=g&&await n.decodeAudioData(g).catch(()=>null);m&&e.get(d.id)===v&&(v.loop=i_(m,yr),v.buf=m)})),!1)},h=d=>Math.min(1.6,10**((a_-d.lufs)/20)),f=(d,p)=>{const v=n.currentTime,g=e.get(d.id),m=n.createBufferSource();m.buffer=g.buf,m.loop=!0,m.loopEnd=g.loop;const _=n.createGain();if(_.gain.setValueAtTime(0,v),_.gain.linearRampToValueAtTime(h(d),v+p),m.connect(_).connect(t),m.start(v,yr),a){const M=a.gain.gain;M.cancelScheduledValues(v),M.setValueAtTime(M.value,v),M.linearRampToValueAtTime(0,v+p),a.src.stop(v+p+.05)}a={t:d,src:m,gain:_,at:v-yr,loop:g.loop},o=r==="shuffle"?Oc(d.id):d,l(d.id,o.id),c(o)};return{tick(d){if(!d)return;const p=r==="shuffle"?null:Ua(r)??null;if(!a||p&&p.id!==a.t.id){const g=p??o;(a||i||s)&&u(g,!0)&&f(g,1);return}if(p||o.id===a.t.id)return;const v=a.loop-(n.currentTime-a.at)%a.loop;u(o,v<c_)&&v<yr&&f(o,yr)},choice:()=>r,setChoice(d){r=d==="shuffle"||Ua(d)?d:"shuffle",p0({music:r}),s=!0,!(r!=="shuffle"||!a)&&(o=Oc(a.t.id),l(a.t.id,o.id),c(o))},playing:()=>a?.t??null,loading:()=>{const d=r==="shuffle"?a?null:o:Ua(r)??null;return d&&d.id!==a?.t.id&&!e.get(d.id)?.buf?d:null},held:()=>[...e].map(([d,p])=>p.buf?`${d}:pcm`:d)}}const Po=We*nn.dayCycles,Qa=nn.dayCutPhase-ui+Po,m0={"khau-pha":"Khau Phạ","ha-giang":"Hà Giang"};function g0(n){return n<Qa?1:2+Math.floor((n-Qa)/Po)}function ou(n){return n<=1?0:Qa+(n-2)*Po}const Lo={value:0};let v0="khau-pha";function h_(n){v0=n,Lo.value=n==="ha-giang"?1:0}const ja=()=>v0,No=()=>Lo.value,bh="uniform float uRegionHg;";function x0(n,t=!1){return{dusk:(t?.34:.62)*(1-Et(0,.08,n))+.5*Et(.52,.66,n)+.5*Et(.68,.78,n)-.38*Et(.95,1,n),morn:Et(.03,.14,n)*(1-Et(.3,.45,n))}}function f_(n){const t=g0(n),e=ou(t),i=Math.min(1,Math.max(0,(n-e)/(t===1?Qa:Po)));return{day:t,region:ja(),u:i,...x0(i,t===1)}}function d_(n){return n.u>=.95?"Rạng sáng":n.u>=.74?"Đêm đèn trời":n.u>=.56?"Hoàng hôn":n.u<.1?"Bình minh":n.u<.4?"Buổi sáng":"Chiều vàng"}function _0(n){const t=n.u<.5?0:n.dusk>=.98?2:n.dusk>=.48?1:0;return(n.day-1)*3+t}function p_(n){let t=null;const e=s=>{t=s===null?null:{day:1,region:ja(),u:s,...x0(s,!0)}},i=s=>{t=s===null?null:{day:1,region:ja(),u:.52+.26*s,dusk:s,morn:0}};return n.has("dusk")&&i(Number(n.get("dusk"))),n.has("clock")&&e(Number(n.get("clock"))),{at:s=>t??f_(s),forceU:e,forceDusk:i}}const m_={rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},Hf=[0,2,4,7,9],Go=.32,Vf=.85,g_=.6;function v_(){let n=null,t=null,e=null,i=null,s=null,r=null,o=null,a=null,c=null,l=null;const u=d0();let h=u.sfx,f=u.music;const d=()=>r_({sfx:h,music:f});let p=0,v=0,g=null,m=0,_=null;const M=()=>{if(_)return _.resume();n=new AudioContext,_=Qx(n),t=n_(n);const w=n.createDynamicsCompressor();w.threshold.value=-10,w.ratio.value=4,w.connect(n.destination),e=n.createGain(),e.gain.value=.9,e.connect(w);const S=T=>{const R=n.createGain();return R.gain.value=T,R.connect(e),R};i=S(h?1:0),s=S(h?Vf:0),r=S(f?Go:0),l=u_(n,r),setInterval(()=>l?.tick(f),500),a=n.createBiquadFilter(),a.type="lowpass",o=n.createGain(),o.gain.value=0,a.connect(o).connect(i)};M();const x=(w,S)=>{t&&i&&t.play(w,i,S)},y=(w,S)=>{if(!n||!t||!s||!r||!h)return;const T=n.currentTime;if(T<p&&S<=v)return;const R=t.get(w);R&&(g?.stop(),g=t.play(w,s),p=T+R.duration,v=S,f&&(r.gain.setTargetAtTime(Go*g_,T,.05),r.gain.setTargetAtTime(Go,T+R.duration,.3)))},b=w=>1+(Math.random()*2-1)*w;return{update(w,S,T){if(!n||!t||!o||!a)return;!c&&t.get("wind-loop")&&(c=t.play("wind-loop",a,{loop:!0})),l?.tick(f);const R=n.currentTime;c&&c.playbackRate.setTargetAtTime(.85+.35*w,R,.2),a.frequency.setTargetAtTime(900+6e3*w,R,.15),o.gain.setTargetAtTime(S?.35+1.1*w*w:.2,R,.25);const A=_0(T);S&&A>m&&A%3&&y(A%3===1?"chang-vang":"dem-hoi",1),m=S?Math.max(m,A):0},events(w,S){for(const T of w)if(T.type==="lantern"){const R=Hf[(T.streak-1)%Hf.length];x("lantern-chime",{vol:.55,rate:Math.pow(2,R/12)}),T.streak===10&&y("den-troi-chuoi",1)}else if(T.type==="near-miss")x("near-miss",{vol:.8,rate:b(.08)*(1+.02*Math.min(10,T.combo))}),T.combo===3?y("suot-dep",1):T.combo===6&&y("qua-dinh",1);else if(T.type==="lane")x("lane-whoosh",{vol:.25,rate:b(.1),pan:.5*T.dir});else if(T.type==="vert")x(T.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:b(.05)});else if(T.type==="gust")x("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(T.chain-1))/12)}),T.full&&x("thermal-boost",{vol:.7});else if(T.type==="booster"){const[R,A,P]=T.kind==="thermal"?["thermal-boost",.8,"luong-nhiet"]:T.kind==="smoke"?["smoke-hiss",.75,null]:["shield-pickup",1.4,"du-du-phong"];x(R,{vol:A}),P&&y(P,2)}else T.type==="hurt"?x("shield-hit",{vol:1.2,rate:b(.05)}):T.type==="crash"?x("crash",{vol:1.3}):T.type==="section"&&S&&!T.open&&!ce.zoneNames&&y("khe-da",1)},reveal(){x("reveal-stinger",{vol:.6}),ce.zoneNames||y("thung-lung",1)},zone(w){const S=m_[w];S&&y(S,1)},runStart(){M(),x("run-start",{vol:.8}),y("cat-canh",2)},over(w){x("game-over",{vol:.5}),y(w?"ky-luc":"ha-canh",3)},toggleSfx(){return M(),h=!h,i&&s&&n&&(i.gain.setTargetAtTime(h?1:0,n.currentTime,.05),s.gain.setTargetAtTime(h?Vf:0,n.currentTime,.05)),d(),h},toggleMusic(){return M(),f=!f,r&&n&&(r.gain.cancelScheduledValues(n.currentTime),r.gain.setTargetAtTime(f?Go:0,n.currentTime,.3)),d(),f},prefs:()=>({sfx:h,music:f}),justUnlocked:()=>_?.justWoke()??!1,music:()=>l}}const Sh="186",x_=0,Gf=1,__=2,ka=1,M_=2,Gr=3,Ni=0,en=1,Ee=2,ci=0,jr=1,xn=2,Wf=3,Xf=4,y_=5,qs=100,b_=101,S_=102,w_=103,T_=104,E_=200,A_=201,R_=202,C_=203,M0=204,y0=205,P_=206,L_=207,N_=208,I_=209,D_=210,U_=211,k_=212,F_=213,O_=214,au=0,cu=1,lu=2,lo=3,uu=4,hu=5,fu=6,du=7,wh=0,B_=1,z_=2,li=0,Th=1,Eh=2,Ah=3,gc=4,Rh=5,Ch=6,Ph=7,$f="attached",H_="detached",b0=300,Ms=301,rr=302,Bc=303,zc=304,vc=306,or=1e3,ri=1001,tc=1002,Xe=1003,S0=1004,Wr=1005,$e=1006,Fa=1007,Ti=1008,Sn=1009,w0=1010,T0=1011,uo=1012,Lh=1013,hi=1014,Pn=1015,gn=1016,Nh=1017,Ih=1018,ho=1020,E0=35902,A0=35899,R0=1021,C0=1022,Ln=1023,Ii=1026,ms=1027,Dh=1028,Uh=1029,ys=1030,kh=1031,Fh=1033,Oa=33776,Ba=33777,za=33778,Ha=33779,pu=35840,mu=35841,gu=35842,vu=35843,xu=36196,_u=37492,Mu=37496,yu=37488,bu=37489,ec=37490,Su=37491,wu=37808,Tu=37809,Eu=37810,Au=37811,Ru=37812,Cu=37813,Pu=37814,Lu=37815,Nu=37816,Iu=37817,Du=37818,Uu=37819,ku=37820,Fu=37821,Ou=36492,Bu=36494,zu=36495,Hu=36283,Vu=36284,nc=36285,Gu=36286,fo=2300,po=2301,Hc=2302,qf=2303,Kf=2400,Yf=2401,Zf=2402,V_=2500,G_=0,P0=1,Wu=2,W_=3200,ic=0,X_=1,Ji="",Ge="srgb",wn="srgb-linear",sc="linear",pe="srgb",Vc=7680,$_=519,q_=512,K_=513,Y_=514,Oh=515,Z_=516,J_=517,Bh=518,Q_=519,L0=35044,Jf=35048,Qf="300 es",oi=2e3,mo=2001;function j_(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function tM(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function go(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function eM(){const n=go("canvas");return n.style.display="block",n}const jf={};function rc(...n){const t="THREE."+n.shift();console.log(t,...n)}function N0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Dt(...n){n=N0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Wt(...n){n=N0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Js(...n){const t=n.join(" ");t in jf||(jf[t]=!0,Dt(...n))}function nM(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const iM={[au]:cu,[lu]:fu,[uu]:du,[lo]:hu,[cu]:au,[fu]:lu,[du]:uu,[hu]:lo};class Ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let td=1234567;const to=Math.PI/180,ar=180/Math.PI;function Nn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function ee(n,t,e){return Math.max(t,Math.min(e,n))}function zh(n,t){return(n%t+t)%t}function sM(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function rM(n,t,e){return n!==t?(e-n)/(t-n):0}function eo(n,t,e){return(1-e)*n+e*t}function oM(n,t,e,i){return eo(n,t,1-Math.exp(-e*i))}function aM(n,t=1){return t-Math.abs(zh(n,t*2)-t)}function cM(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function lM(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function uM(n,t){return n+Math.floor(Math.random()*(t-n+1))}function hM(n,t){return n+Math.random()*(t-n)}function fM(n){return n*(.5-Math.random())}function dM(n){n!==void 0&&(td=n);let t=td+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pM(n){return n*to}function mM(n){return n*ar}function gM(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function vM(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function xM(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _M(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*h,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*h,a*l);break;case"ZXZ":n.set(c*h,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*p,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*p,a*l);break;case"ZYZ":n.set(c*p,c*d,a*u,a*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const MM={DEG2RAD:to,RAD2DEG:ar,generateUUID:Nn,clamp:ee,euclideanModulo:zh,mapLinear:sM,inverseLerp:rM,lerp:eo,damp:oM,pingpong:aM,smoothstep:cM,smootherstep:lM,randInt:uM,randFloat:hM,randFloatSpread:fM,seededRandom:dM,degToRad:pM,radToDeg:mM,isPowerOfTwo:gM,ceilPowerOfTwo:vM,floorPowerOfTwo:xM,setQuaternionFromProperEuler:_M,normalize:xe,denormalize:Wn};class ot{static{ot.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ce{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],h=i[s+3],f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(h!==v||c!==f||l!==d||u!==p){let g=c*f+l*d+u*p+h*v;g<0&&(f=-f,d=-d,p=-p,v=-v,g=-g);let m=1-a;if(g<.9995){const _=Math.acos(g),M=Math.sin(_);m=Math.sin(m*_)/M,a=Math.sin(a*_)/M,c=c*m+f*a,l=l*m+d*a,u=u*m+p*a,h=h*m+v*a}else{c=c*m+f*a,l=l*m+d*a,u=u*m+p*a,h=h*m+v*a;const _=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=_,l*=_,u*=_,h*=_}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+u*h+c*d-l*f,t[e+1]=c*p+u*f+l*h-a*d,t[e+2]=l*p+u*d+a*f-c*h,t[e+3]=u*p-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),h=a(r/2),f=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h+f*d*p;break;case"YZX":this._x=f*u*h+l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h-f*d*p;break;case"XZY":this._x=f*u*h-l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h+f*d*p;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ed.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+c*l+o*h-a*u,this.y=i+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Gc.copy(this).projectOnVector(t),this.sub(Gc)}reflect(t){return this.sub(Gc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gc=new L,ed=new Ce;class Kt{static{Kt.prototype.isMatrix3=!0}constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],d=i[5],p=i[8],v=s[0],g=s[3],m=s[6],_=s[1],M=s[4],x=s[7],y=s[2],b=s[5],w=s[8];return r[0]=o*v+a*_+c*y,r[3]=o*g+a*M+c*b,r[6]=o*m+a*x+c*w,r[1]=l*v+u*_+h*y,r[4]=l*g+u*M+h*b,r[7]=l*m+u*x+h*w,r[2]=f*v+d*_+p*y,r[5]=f*g+d*M+p*b,r[8]=f*m+d*x+p*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,p=e*h+i*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=h*v,t[1]=(s*l-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Js("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wc.makeScale(t,e)),this}rotate(t){return Js("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wc.makeRotation(-t)),this}translate(t,e){return Js("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wc=new Kt,nd=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),id=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yM(){const n={enabled:!0,workingColorSpace:wn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ji?sc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[wn]:{primaries:t,whitePoint:i,transfer:sc,toXYZ:nd,fromXYZ:id,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:nd,fromXYZ:id,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}}),n}const ie=yM();function Li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let As;class bM{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{As===void 0&&(As=go("canvas")),As.width=t.width,As.height=t.height;const s=As.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=As}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=go("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Li(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Li(e[i]/255)*255):e[i]=Li(e[i]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let SM=0;class Hh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:SM++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xc(s[o].image)):r.push(Xc(s[o]))}else r=Xc(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Xc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?bM.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let wM=0;const $c=new L;class qe extends Ss{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,i=ri,s=ri,r=$e,o=Ti,a=Ln,c=Sn,l=qe.DEFAULT_ANISOTROPY,u=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wM++}),this.uuid=Nn(),this.name="",this.source=new Hh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($c).x}get height(){return this.source.getSize($c).y}get depth(){return this.source.getSize($c).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==b0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case or:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case tc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case or:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case tc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=b0;qe.DEFAULT_ANISOTROPY=1;class me{static{me.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,x=(d+1)/2,y=(m+1)/2,b=(u+f)/4,w=(h+v)/4,S=(p+g)/4;return M>x&&M>y?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=b/i,r=w/i):x>y?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=b/s,r=S/s):y<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),i=w/r,s=S/r),this.set(i,s,r,e),this}let _=Math.sqrt((g-p)*(g-p)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(h-v)/_,this.z=(f-u)/_,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class TM extends Ss{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new qe(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Hh(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends TM{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class I0 extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class EM extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Ot{static{Ot.prototype.isMatrix4=!0}constructor(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,g)}set(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Rs.setFromMatrixColumn(t,0).length(),r=1/Rs.setFromMatrixColumn(t,1).length(),o=1/Rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,p=a*u,v=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+p*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,p=l*u,v=l*h;e[0]=f+v*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-p,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,p=l*u,v=l*h;e[0]=f-v*a,e[4]=-o*h,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,p=a*u,v=a*h;e[0]=c*u,e[4]=p*l-d,e[8]=f*l+v,e[1]=c*h,e[5]=v*l+f,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=v-f*h,e[8]=p*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+p,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+v,e[5]=o*u,e[9]=d*h-p,e[2]=p*h-d,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(AM,t,RM)}lookAt(t,e,i){const s=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Bi.crossVectors(i,Mn),Bi.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Bi.crossVectors(i,Mn)),Bi.normalize(),Wo.crossVectors(Mn,Bi),s[0]=Bi.x,s[4]=Wo.x,s[8]=Mn.x,s[1]=Bi.y,s[5]=Wo.y,s[9]=Mn.y,s[2]=Bi.z,s[6]=Wo.z,s[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],d=i[13],p=i[2],v=i[6],g=i[10],m=i[14],_=i[3],M=i[7],x=i[11],y=i[15],b=s[0],w=s[4],S=s[8],T=s[12],R=s[1],A=s[5],P=s[9],I=s[13],N=s[2],U=s[6],z=s[10],V=s[14],J=s[3],B=s[7],K=s[11],j=s[15];return r[0]=o*b+a*R+c*N+l*J,r[4]=o*w+a*A+c*U+l*B,r[8]=o*S+a*P+c*z+l*K,r[12]=o*T+a*I+c*V+l*j,r[1]=u*b+h*R+f*N+d*J,r[5]=u*w+h*A+f*U+d*B,r[9]=u*S+h*P+f*z+d*K,r[13]=u*T+h*I+f*V+d*j,r[2]=p*b+v*R+g*N+m*J,r[6]=p*w+v*A+g*U+m*B,r[10]=p*S+v*P+g*z+m*K,r[14]=p*T+v*I+g*V+m*j,r[3]=_*b+M*R+x*N+y*J,r[7]=_*w+M*A+x*U+y*B,r[11]=_*S+M*P+x*z+y*K,r[15]=_*T+M*I+x*V+y*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15],_=c*d-l*f,M=a*d-l*h,x=a*f-c*h,y=o*d-l*u,b=o*f-c*u,w=o*h-a*u;return e*(v*_-g*M+m*x)-i*(p*_-g*y+m*b)+s*(p*M-v*y+m*w)-r*(p*x-v*b+g*w)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],_=e*a-i*o,M=e*c-s*o,x=e*l-r*o,y=i*c-s*a,b=i*l-r*a,w=s*l-r*c,S=u*v-h*p,T=u*g-f*p,R=u*m-d*p,A=h*g-f*v,P=h*m-d*v,I=f*m-d*g,N=_*I-M*P+x*A+y*R-b*T+w*S;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/N;return t[0]=(a*I-c*P+l*A)*U,t[1]=(s*P-i*I-r*A)*U,t[2]=(v*w-g*b+m*y)*U,t[3]=(f*b-h*w-d*y)*U,t[4]=(c*R-o*I-l*T)*U,t[5]=(e*I-s*R+r*T)*U,t[6]=(g*x-p*w-m*M)*U,t[7]=(u*w-f*x+d*M)*U,t[8]=(o*P-a*R+l*S)*U,t[9]=(i*R-e*P-r*S)*U,t[10]=(p*b-v*x+m*_)*U,t[11]=(h*x-u*b-d*_)*U,t[12]=(a*T-o*A-c*S)*U,t[13]=(e*A-i*T+s*S)*U,t[14]=(v*M-p*y-g*_)*U,t[15]=(u*y-h*M+f*_)*U,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,p=r*h,v=o*u,g=o*h,m=a*h,_=c*l,M=c*u,x=c*h,y=i.x,b=i.y,w=i.z;return s[0]=(1-(v+m))*y,s[1]=(d+x)*y,s[2]=(p-M)*y,s[3]=0,s[4]=(d-x)*b,s[5]=(1-(f+m))*b,s[6]=(g+_)*b,s[7]=0,s[8]=(p+M)*w,s[9]=(g-_)*w,s[10]=(1-(f+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Rs.set(s[0],s[1],s[2]).length();const a=Rs.set(s[4],s[5],s[6]).length(),c=Rs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Fn.copy(this);const l=1/o,u=1/a,h=1/c;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=u,Fn.elements[5]*=u,Fn.elements[6]*=u,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,e.setFromRotationMatrix(Fn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=oi,c=!1){const l=this.elements,u=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let p,v;if(c)p=r/(o-r),v=o*r/(o-r);else if(a===oi)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===mo)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=oi,c=!1){const l=this.elements,u=2/(e-t),h=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let p,v;if(c)p=1/(o-r),v=o/(o-r);else if(a===oi)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===mo)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Rs=new L,Fn=new Ot,AM=new L(0,0,0),RM=new L(1,1,1),Bi=new L,Wo=new L,Mn=new L,sd=new Ot,rd=new Ce;class fi{constructor(t=0,e=0,i=0,s=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return sd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rd.setFromEuler(this),this.setFromQuaternion(rd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class D0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let CM=0;const od=new L,Cs=new Ce,gi=new Ot,Xo=new L,br=new L,PM=new L,LM=new Ce,ad=new L(1,0,0),cd=new L(0,1,0),ld=new L(0,0,1),ud={type:"added"},NM={type:"removed"},Ps={type:"childadded",child:null},qc={type:"childremoved",child:null};class Ie extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:CM++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new L,e=new fi,i=new Ce,s=new L(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new Kt}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new D0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.premultiply(Cs),this}rotateX(t){return this.rotateOnAxis(ad,t)}rotateY(t){return this.rotateOnAxis(cd,t)}rotateZ(t){return this.rotateOnAxis(ld,t)}translateOnAxis(t,e){return od.copy(t).applyQuaternion(this.quaternion),this.position.add(od.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ad,t)}translateY(t){return this.translateOnAxis(cd,t)}translateZ(t){return this.translateOnAxis(ld,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xo.copy(t):Xo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(br,Xo,this.up):gi.lookAt(Xo,br,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(gi),this.quaternion.premultiply(Cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Wt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ud),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(NM),qc.child=t,this.dispatchEvent(qc),qc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ud),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,t,PM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,LM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ie.DEFAULT_UP=new L(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ke extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const IM={type:"move"};class Kc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(IM)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ke;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const U0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},$o={h:0,s:0,l:0};function Yc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=i,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ie.workingColorSpace){if(t=zh(t,1),e=ee(e,0,1),i=ee(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Yc(o,r,t+1/3),this.g=Yc(o,r,t),this.b=Yc(o,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=Ge){function i(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){const i=U0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}copyLinearToSRGB(t){return this.r=Qs(t.r),this.g=Qs(t.g),this.b=Qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return ie.workingToColorSpace(an.copy(this),t),Math.round(ee(an.r*255,0,255))*65536+Math.round(ee(an.g*255,0,255))*256+Math.round(ee(an.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(an.copy(this),e);const i=an.r,s=an.g,r=an.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case i:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-i)/h+2;break;case r:c=(i-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(an.copy(this),e),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=Ge){ie.workingToColorSpace(an.copy(this),t);const e=an.r,i=an.g,s=an.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL($o);const i=eo(zi.h,$o.h,e),s=eo(zi.s,$o.s,e),r=eo(zi.l,$o.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ct;ct.NAMES=U0;class Vh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new Vh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class DM extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const On=new L,vi=new L,Zc=new L,xi=new L,Ls=new L,Ns=new L,hd=new L,Jc=new L,Qc=new L,jc=new L,tl=new me,el=new me,nl=new me;class Xn{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),On.subVectors(t,e),s.cross(On);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){On.subVectors(s,e),vi.subVectors(i,e),Zc.subVectors(t,e);const o=On.dot(On),a=On.dot(vi),c=On.dot(Zc),l=vi.dot(vi),u=vi.dot(Zc),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,p=(o*u-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xi.x),c.addScaledVector(o,xi.y),c.addScaledVector(a,xi.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return tl.setScalar(0),el.setScalar(0),nl.setScalar(0),tl.fromBufferAttribute(t,e),el.fromBufferAttribute(t,i),nl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(tl,r.x),o.addScaledVector(el,r.y),o.addScaledVector(nl,r.z),o}static isFrontFacing(t,e,i,s){return On.subVectors(i,e),vi.subVectors(t,e),On.cross(vi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return On.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),On.cross(vi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Xn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ls.subVectors(s,i),Ns.subVectors(r,i),Jc.subVectors(t,i);const c=Ls.dot(Jc),l=Ns.dot(Jc);if(c<=0&&l<=0)return e.copy(i);Qc.subVectors(t,s);const u=Ls.dot(Qc),h=Ns.dot(Qc);if(u>=0&&h<=u)return e.copy(s);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(Ls,o);jc.subVectors(t,r);const d=Ls.dot(jc),p=Ns.dot(jc);if(p>=0&&d<=p)return e.copy(r);const v=d*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(Ns,a);const g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return hd.subVectors(r,s),a=(h-u)/(h-u+(d-p)),e.copy(s).addScaledVector(hd,a);const m=1/(g+v+f);return o=v*m,a=f*m,e.copy(i).addScaledVector(Ls,o).addScaledVector(Ns,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Di{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),qo.copy(i.boundingBox)),qo.applyMatrix4(t.matrixWorld),this.union(qo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Sr),Ko.subVectors(this.max,Sr),Is.subVectors(t.a,Sr),Ds.subVectors(t.b,Sr),Us.subVectors(t.c,Sr),Hi.subVectors(Ds,Is),Vi.subVectors(Us,Ds),ss.subVectors(Is,Us);let e=[0,-Hi.z,Hi.y,0,-Vi.z,Vi.y,0,-ss.z,ss.y,Hi.z,0,-Hi.x,Vi.z,0,-Vi.x,ss.z,0,-ss.x,-Hi.y,Hi.x,0,-Vi.y,Vi.x,0,-ss.y,ss.x,0];return!il(e,Is,Ds,Us,Ko)||(e=[1,0,0,0,1,0,0,0,1],!il(e,Is,Ds,Us,Ko))?!1:(Yo.crossVectors(Hi,Vi),e=[Yo.x,Yo.y,Yo.z],il(e,Is,Ds,Us,Ko))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const _i=[new L,new L,new L,new L,new L,new L,new L,new L],Bn=new L,qo=new Di,Is=new L,Ds=new L,Us=new L,Hi=new L,Vi=new L,ss=new L,Sr=new L,Ko=new L,Yo=new L,rs=new L;function il(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){rs.fromArray(n,r);const a=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),c=t.dot(rs),l=e.dot(rs),u=i.dot(rs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const ze=new L,Zo=new ot;let UM=0;class St extends Ss{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:UM++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=L0,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Zo.fromBufferAttribute(this,e),Zo.applyMatrix3(t),this.setXY(e,Zo.x,Zo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class k0 extends St{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class F0 extends St{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Jt extends St{constructor(t,e,i){super(new Float32Array(t),e,i)}}const kM=new Di,wr=new L,sl=new L;class Un{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):kM.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wr.subVectors(t,this.center);const e=wr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(wr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wr.copy(t.center).add(sl)),this.expandByPoint(wr.copy(t.center).sub(sl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let FM=0;const En=new Ot,rl=new Ie,ks=new L,yn=new Di,Tr=new Di,Je=new L;class Yt extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:FM++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(j_(t)?F0:k0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,i){return En.makeTranslation(t,e,i),this.applyMatrix4(En),this}scale(t,e,i){return En.makeScale(t,e,i),this.applyMatrix4(En),this}lookAt(t){return rl.lookAt(t),rl.updateMatrix(),this.applyMatrix4(rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ks).negate(),this.translate(ks.x,ks.y,ks.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Je.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Je),Je.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Je)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Je.addVectors(yn.min,Tr.min),yn.expandByPoint(Je),Je.addVectors(yn.max,Tr.max),yn.expandByPoint(Je)):(yn.expandByPoint(Tr.min),yn.expandByPoint(Tr.max))}yn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Je.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Je));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Je.fromBufferAttribute(a,l),c&&(ks.fromBufferAttribute(t,l),Je.add(ks)),s=Math.max(s,i.distanceToSquared(Je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new St(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let S=0;S<i.count;S++)a[S]=new L,c[S]=new L;const l=new L,u=new L,h=new L,f=new ot,d=new ot,p=new ot,v=new L,g=new L;function m(S,T,R){l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,R),f.fromBufferAttribute(r,S),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,R),u.sub(l),h.sub(l),d.sub(f),p.sub(f);const A=1/(d.x*p.y-p.x*d.y);isFinite(A)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(A),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(A),a[S].add(v),a[T].add(v),a[R].add(v),c[S].add(g),c[T].add(g),c[R].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let S=0,T=_.length;S<T;++S){const R=_[S],A=R.start,P=R.count;for(let I=A,N=A+P;I<N;I+=3)m(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new L,x=new L,y=new L,b=new L;function w(S){y.fromBufferAttribute(s,S),b.copy(y);const T=a[S];M.copy(T),M.sub(y.multiplyScalar(y.dot(T))).normalize(),x.crossVectors(b,T);const A=x.dot(c[S])<0?-1:1;o.setXYZW(S,M.x,M.y,M.z,A)}for(let S=0,T=_.length;S<T;++S){const R=_[S],A=R.start,P=R.count;for(let I=A,N=A+P;I<N;I+=3)w(t.getX(I+0)),w(t.getX(I+1)),w(t.getX(I+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new St(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),v=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Je.fromBufferAttribute(t,e),Je.normalize(),t.setXYZ(e,Je.x,Je.y,Je.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let m=0;m<u;m++)f[p++]=l[d++]}return new St(f,u,h)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Yt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class OM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=L0,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const un=new L;class Gh{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)un.fromBufferAttribute(this,e),un.applyMatrix4(t),this.setXYZ(e,un.x,un.y,un.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)un.fromBufferAttribute(this,e),un.applyNormalMatrix(t),this.setXYZ(e,un.x,un.y,un.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)un.fromBufferAttribute(this,e),un.transformDirection(t),this.setXYZ(e,un.x,un.y,un.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Wn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){rc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new St(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Gh(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){rc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ol=new L,BM=new L,zM=new Kt;class Yi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ol.subVectors(i,e).cross(BM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ol),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||zM.getNormalMatrix(t),s=this.coplanarPoint(ol).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let HM=0;class qn extends Ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:HM++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=jr,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=M0,this.blendDst=y0,this.blendEquation=qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vc,this.stencilZFail=Vc,this.stencilZPass=Vc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Yi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Mi=new L,al=new L,Jo=new L,Qo=new L;class xc{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){al.copy(t).add(e).multiplyScalar(.5),Jo.copy(e).sub(t).normalize(),Qo.copy(this.origin).sub(al);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Jo),a=Qo.dot(this.direction),c=-Qo.dot(Jo),l=Qo.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*c-a,f=o*a-c,p=r*u,h>=0)if(f>=-p)if(f<=p){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=p?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(al).addScaledVector(Jo,f),d}intersectSphere(t,e){if(t.radius<0)return null;Mi.subVectors(t.center,this.origin);const i=Mi.dot(this.direction),s=Mi.dot(Mi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,i,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,h=t.x-o.x,f=t.y-o.y,d=t.z-o.z,p=e.x-o.x,v=e.y-o.y,g=e.z-o.z,m=i.x-o.x,_=i.y-o.y,M=i.z-o.z,x=Math.abs(c),y=Math.abs(l),b=Math.abs(u);let w,S,T,R,A,P,I,N,U,z,V,J;if(x>=y&&x>=b?(T=c,P=h,U=p,J=m,c>=0?(w=l,S=u,R=f,A=d,I=v,N=g,z=_,V=M):(w=u,S=l,R=d,A=f,I=g,N=v,z=M,V=_)):y>=b?(T=l,P=f,U=v,J=_,l>=0?(w=u,S=c,R=d,A=h,I=g,N=p,z=M,V=m):(w=c,S=u,R=h,A=d,I=p,N=g,z=m,V=M)):(T=u,P=d,U=g,J=M,u>=0?(w=c,S=l,R=h,A=f,I=p,N=v,z=m,V=_):(w=l,S=c,R=f,A=h,I=v,N=p,z=_,V=m)),T===0)return null;const B=w/T,K=S/T,j=1/T,Mt=R-B*P,gt=A-K*P,At=I-B*U,Bt=N-K*U,Ht=z-B*J,X=V-K*J,Y=Ht*Bt-X*At,yt=Mt*X-gt*Ht,Pt=At*gt-Bt*Mt;if(s){if(Y<0||yt<0||Pt<0)return null}else if((Y<0||yt<0||Pt<0)&&(Y>0||yt>0||Pt>0))return null;const it=Y+yt+Pt;if(it===0)return null;const Xt=j*(Y*P+yt*U+Pt*J);return(it>0?Xt<0:Xt>0)?null:this.at(Xt/it,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cn extends qn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fd=new Ot,os=new xc,jo=new Un,dd=new L,ta=new L,ea=new L,na=new L,cl=new L,ia=new L,pd=new L,sa=new L;class $t extends Ie{constructor(t=new Yt,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(cl.fromBufferAttribute(h,t),o?ia.addScaledVector(cl,u):ia.addScaledVector(cl.sub(e),u))}e.add(ia)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),jo.copy(i.boundingSphere),jo.applyMatrix4(r),os.copy(t.ray).recast(t.near),!(jo.containsPoint(os.origin)===!1&&(os.intersectSphere(jo,dd)===null||os.origin.distanceToSquared(dd)>(t.far-t.near)**2))&&(fd.copy(r).invert(),os.copy(t.ray).applyMatrix4(fd),!(i.boundingBox!==null&&os.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,os)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),M=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=_,y=M;x<y;x+=3){const b=a.getX(x),w=a.getX(x+1),S=a.getX(x+2);s=ra(this,m,t,i,l,u,h,b,w,S),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=a.getX(g),M=a.getX(g+1),x=a.getX(g+2);s=ra(this,o,t,i,l,u,h,_,M,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),M=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let x=_,y=M;x<y;x+=3){const b=x,w=x+1,S=x+2;s=ra(this,m,t,i,l,u,h,b,w,S),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=g,M=g+1,x=g+2;s=ra(this,o,t,i,l,u,h,_,M,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function VM(n,t,e,i,s,r,o,a){let c;if(t.side===en?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ni,a),c===null)return null;sa.copy(a),sa.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(sa);return l<e.near||l>e.far?null:{distance:l,point:sa.clone(),object:n}}function ra(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,ta),n.getVertexPosition(c,ea),n.getVertexPosition(l,na);const u=VM(n,t,e,i,ta,ea,na,pd);if(u){const h=new L;Xn.getBarycoord(pd,ta,ea,na,h),s&&(u.uv=Xn.getInterpolatedAttribute(s,a,c,l,h,new ot)),r&&(u.uv1=Xn.getInterpolatedAttribute(r,a,c,l,h,new ot)),o&&(u.normal=Xn.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};Xn.getNormal(ta,ea,na,f.normal),u.face=f,u.barycoord=h}return u}const Er=new me,md=new me,gd=new me,GM=new me,vd=new Ot,oa=new L,ll=new Un,xd=new Ot,ul=new xc;class O0 extends $t{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$f,this.bindMatrix=new Ot,this.bindMatrixInverse=new Ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Di),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,oa),this.boundingBox.expandByPoint(oa)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,oa),this.boundingSphere.expandByPoint(oa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ll.copy(this.boundingSphere),ll.applyMatrix4(s),t.ray.intersectsSphere(ll)!==!1&&(xd.copy(s).invert(),ul.copy(t.ray).applyMatrix4(xd),!(this.boundingBox!==null&&ul.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ul)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new me,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===$f?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===H_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Dt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;md.fromBufferAttribute(s.attributes.skinIndex,t),gd.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(Er.copy(e),e.set(0,0,0,0)):(Er.set(...e,1),e.set(0,0,0)),Er.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=gd.getComponent(r);if(o!==0){const a=md.getComponent(r);vd.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(GM.copy(Er).applyMatrix4(vd),o)}}return e.isVector4&&(e.w=Er.w),e.applyMatrix4(this.bindMatrixInverse)}}class B0 extends Ie{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Wh extends qe{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Xe,u=Xe,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _d=new Ot,WM=new Ot;class Xh{constructor(t=[],e=[]){this.uuid=Nn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Dt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ot)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const i=new Ot;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:WM;_d.multiplyMatrices(a,e[r]),_d.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Xh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new Wh(e,t,t,Ln,Pn);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const r=t.bones[i];let o=e[r];o===void 0&&(Dt("Skeleton: No bone found with UUID:",r),o=new B0),this.bones.push(o),this.boneInverses.push(new Ot().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=i[s];t.boneInverses.push(a.toArray())}return t}}class vo extends St{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Fs=new Ot,Md=new Ot,aa=[],yd=new Di,XM=new Ot,Ar=new $t,Rr=new Un;class He extends $t{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new vo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,XM)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Fs),yd.copy(t.boundingBox).applyMatrix4(Fs),this.boundingBox.union(yd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Fs),Rr.copy(t.boundingSphere).applyMatrix4(Fs),this.boundingSphere.union(Rr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(i),t.ray.intersectsSphere(Rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fs),Md.multiplyMatrices(i,Fs),Ar.matrixWorld=Md,Ar.raycast(t,aa);for(let o=0,a=aa.length;o<a;o++){const c=aa[o];c.instanceId=r,c.object=this,e.push(c)}aa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new vo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Wh(new Float32Array(s*this.count),s,this.count,Dh,Pn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const as=new Un,$M=new ot(.5,.5),ca=new L;class Io{constructor(t=new Yi,e=new Yi,i=new Yi,s=new Yi,r=new Yi,o=new Yi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],_=r[12],M=r[13],x=r[14],y=r[15];if(s[0].setComponents(l-o,d-u,m-p,y-_).normalize(),s[1].setComponents(l+o,d+u,m+p,y+_).normalize(),s[2].setComponents(l+a,d+h,m+v,y+M).normalize(),s[3].setComponents(l-a,d-h,m-v,y-M).normalize(),i)s[4].setComponents(c,f,g,x).normalize(),s[5].setComponents(l-c,d-f,m-g,y-x).normalize();else if(s[4].setComponents(l-c,d-f,m-g,y-x).normalize(),e===oi)s[5].setComponents(l+c,d+f,m+g,y+x).normalize();else if(e===mo)s[5].setComponents(c,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(t){as.center.set(0,0,0);const e=$M.distanceTo(t.center);return as.radius=.7071067811865476+e,as.applyMatrix4(t.matrixWorld),this.intersectsSphere(as)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(ca.x=s.normal.x>0?t.max.x:t.min.x,ca.y=s.normal.y>0?t.max.y:t.min.y,ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $h extends qn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oc=new L,ac=new L,bd=new Ot,Cr=new xc,la=new Un,hl=new L,Sd=new L;class qh extends Ie{constructor(t=new Yt,e=new $h){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)oc.fromBufferAttribute(e,s-1),ac.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=oc.distanceTo(ac);t.setAttribute("lineDistance",new Jt(i,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(s),la.radius+=r,t.ray.intersectsSphere(la)===!1)return;bd.copy(s).invert(),Cr.copy(t.ray).applyMatrix4(bd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=u.getX(v),_=u.getX(v+1),M=ua(this,t,Cr,c,m,_,v);M&&e.push(M)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(d),m=ua(this,t,Cr,c,v,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=ua(this,t,Cr,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=ua(this,t,Cr,c,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ua(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(oc.fromBufferAttribute(a,s),ac.fromBufferAttribute(a,r),e.distanceSqToSegment(oc,ac,hl,Sd)>i)return;hl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(hl);if(!(l<t.near||l>t.far))return{distance:l,point:Sd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const wd=new L,Td=new L;class z0 extends qh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)wd.fromBufferAttribute(e,s),Td.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+wd.distanceTo(Td);t.setAttribute("lineDistance",new Jt(i,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qM extends qh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class H0 extends qn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ed=new Ot,Xu=new xc,ha=new Un,fa=new L;class cc extends Ie{constructor(t=new Yt,e=new H0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,t.ray.intersectsSphere(ha)===!1)return;Ed.copy(s).invert(),Xu.copy(t.ray).applyMatrix4(Ed);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,h=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=f,v=d;p<v;p++){const g=l.getX(p);fa.fromBufferAttribute(h,g),Ad(fa,g,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++)fa.fromBufferAttribute(h,p),Ad(fa,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ad(n,t,e,i,s,r,o){const a=Xu.distanceSqToPoint(n);if(a<e){const c=new L;Xu.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class V0 extends qe{constructor(t=[],e=Ms,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Kh extends qe{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xo extends qe{constructor(t,e,i=hi,s,r,o,a=Xe,c=Xe,l,u=Ii,h=1){if(u!==Ii&&u!==ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class KM extends xo{constructor(t,e=hi,i=Ms,s,r,o=Xe,a=Xe,c,l=Ii){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class G0 extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Vt extends Yt{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(h,2));function p(v,g,m,_,M,x,y,b,w,S,T){const R=x/w,A=y/S,P=x/2,I=y/2,N=b/2,U=w+1,z=S+1;let V=0,J=0;const B=new L;for(let K=0;K<z;K++){const j=K*A-I;for(let Mt=0;Mt<U;Mt++){const gt=Mt*R-P;B[v]=gt*_,B[g]=j*M,B[m]=N,l.push(B.x,B.y,B.z),B[v]=0,B[g]=0,B[m]=b>0?1:-1,u.push(B.x,B.y,B.z),h.push(Mt/w),h.push(1-K/S),V+=1}}for(let K=0;K<S;K++)for(let j=0;j<w;j++){const Mt=f+j+U*K,gt=f+j+U*(K+1),At=f+(j+1)+U*(K+1),Bt=f+(j+1)+U*K;c.push(Mt,gt,Bt),c.push(gt,At,Bt),J+=6}a.addGroup(d,J,T),d+=J,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Yh extends Yt{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=e/2,h=Math.PI/2*t,f=e,d=2*h+f,p=i*2+r,v=s+1,g=new L,m=new L;for(let _=0;_<=p;_++){let M=0,x=0,y=0,b=0;if(_<=i){const T=_/i,R=T*Math.PI/2;x=-u-t*Math.cos(R),y=t*Math.sin(R),b=-t*Math.cos(R),M=T*h}else if(_<=i+r){const T=(_-i)/r;x=-u+T*e,y=t,b=0,M=h+T*f}else{const T=(_-i-r)/i,R=T*Math.PI/2;x=u+t*Math.sin(R),y=t*Math.cos(R),b=t*Math.sin(R),M=h+f+T*h}const w=Math.max(0,Math.min(1,M/d));let S=0;_===0?S=.5/s:_===p&&(S=-.5/s);for(let T=0;T<=s;T++){const R=T/s,A=R*Math.PI*2,P=Math.sin(A),I=Math.cos(A);m.x=-y*I,m.y=x,m.z=y*P,a.push(m.x,m.y,m.z),g.set(-y*I,b,y*P),g.normalize(),c.push(g.x,g.y,g.z),l.push(R+S,w)}if(_>0){const T=(_-1)*v;for(let R=0;R<s;R++){const A=T+R,P=T+R+1,I=_*v+R,N=_*v+R+1;o.push(A,P,I),o.push(P,N,I)}}}this.setIndex(o),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yh(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class tn extends Yt{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const v=[],g=i/2;let m=0;_(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(f,3)),this.setAttribute("uv",new Jt(d,2));function _(){const x=new L,y=new L;let b=0;const w=(e-t)/i;for(let S=0;S<=r;S++){const T=[],R=S/r,A=R*(e-t)+t;for(let P=0;P<=s;P++){const I=P/s,N=I*c+a,U=Math.sin(N),z=Math.cos(N);y.x=A*U,y.y=-R*i+g,y.z=A*z,h.push(y.x,y.y,y.z),x.set(U,w,z).normalize(),f.push(x.x,x.y,x.z),d.push(I,1-R),T.push(p++)}v.push(T)}for(let S=0;S<s;S++)for(let T=0;T<r;T++){const R=v[T][S],A=v[T+1][S],P=v[T+1][S+1],I=v[T][S+1];(t>0||T!==0)&&(u.push(R,A,I),b+=3),(e>0||T!==r-1)&&(u.push(A,P,I),b+=3)}l.addGroup(m,b,0),m+=b}function M(x){const y=p,b=new ot,w=new L;let S=0;const T=x===!0?t:e,R=x===!0?1:-1;for(let P=1;P<=s;P++)h.push(0,g*R,0),f.push(0,R,0),d.push(.5,.5),p++;const A=p;for(let P=0;P<=s;P++){const N=P/s*c+a,U=Math.cos(N),z=Math.sin(N);w.x=T*z,w.y=g*R,w.z=T*U,h.push(w.x,w.y,w.z),f.push(0,R,0),b.x=U*.5+.5,b.y=z*.5*R+.5,d.push(b.x,b.y),p++}for(let P=0;P<s;P++){const I=y+P,N=A+P;x===!0?u.push(N,N+1,I):u.push(N+1,N,I),S+=3}l.addGroup(m,S,x===!0?1:2),m+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Do extends tn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Do(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zh extends Yt{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const M=new L,x=new L,y=new L;for(let b=0;b<e.length;b+=3)d(e[b+0],M),d(e[b+1],x),d(e[b+2],y),c(M,x,y,_)}function c(_,M,x,y){const b=y+1,w=[];for(let S=0;S<=b;S++){w[S]=[];const T=_.clone().lerp(x,S/b),R=M.clone().lerp(x,S/b),A=b-S;for(let P=0;P<=A;P++)P===0&&S===b?w[S][P]=T:w[S][P]=T.clone().lerp(R,P/A)}for(let S=0;S<b;S++)for(let T=0;T<2*(b-S)-1;T++){const R=Math.floor(T/2);T%2===0?(f(w[S][R+1]),f(w[S+1][R]),f(w[S][R])):(f(w[S][R+1]),f(w[S+1][R+1]),f(w[S+1][R]))}}function l(_){const M=new L;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(_),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function u(){const _=new L;for(let M=0;M<r.length;M+=3){_.x=r[M+0],_.y=r[M+1],_.z=r[M+2];const x=g(_)/2/Math.PI+.5,y=m(_)/Math.PI+.5;o.push(x,1-y)}p(),h()}function h(){for(let _=0;_<o.length;_+=6){const M=o[_+0],x=o[_+2],y=o[_+4],b=Math.max(M,x,y),w=Math.min(M,x,y);b>.9&&w<.1&&(M<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),y<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function d(_,M){const x=_*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function p(){const _=new L,M=new L,x=new L,y=new L,b=new ot,w=new ot,S=new ot;for(let T=0,R=0;T<r.length;T+=9,R+=6){_.set(r[T+0],r[T+1],r[T+2]),M.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),b.set(o[R+0],o[R+1]),w.set(o[R+2],o[R+3]),S.set(o[R+4],o[R+5]),y.copy(_).add(M).add(x).divideScalar(3);const A=g(y);v(b,R+0,_,A),v(w,R+2,M,A),v(S,R+4,x,A)}}function v(_,M,x,y){y<0&&_.x===1&&(o[M]=_.x-1),x.x===0&&x.z===0&&(o[M]=y/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zh(t.vertices,t.indices,t.radius,t.detail)}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Dt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new L,s=[],r=[],o=[],a=new L,c=new Ot;for(let d=0;d<=t;d++){const p=d/t;s[d]=this.getTangentAt(p,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(ee(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ee(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Jh extends di{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class YM extends Jh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Qh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const Rd=new L,Cd=new L,fl=new Qh,dl=new Qh,pl=new Qh;class jh extends di{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new L){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Cd.subVectors(s[0],s[1]).add(s[0]),l=Cd);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Rd.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Rd),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),fl.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,p,v,g),dl.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,p,v,g),pl.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(fl.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),dl.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),pl.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return i.set(fl.calc(c),dl.calc(c),pl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Pd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function ZM(n,t){const e=1-n;return e*e*t}function JM(n,t){return 2*(1-n)*n*t}function QM(n,t){return n*n*t}function no(n,t,e,i){return ZM(n,t)+JM(n,e)+QM(n,i)}function jM(n,t){const e=1-n;return e*e*e*t}function t1(n,t){const e=1-n;return 3*e*e*n*t}function e1(n,t){return 3*(1-n)*n*n*t}function n1(n,t){return n*n*n*t}function io(n,t,e,i,s){return jM(n,t)+t1(n,e)+e1(n,i)+n1(n,s)}class W0 extends di{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class i1 extends di{constructor(t=new L,e=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y),io(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class X0 extends di{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class s1 extends di{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $0 extends di{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class q0 extends di{constructor(t=new L,e=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y),no(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class K0 extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(Pd(a,c.x,l.x,u.x,h.x),Pd(a,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var $u=Object.freeze({__proto__:null,ArcCurve:YM,CatmullRomCurve3:jh,CubicBezierCurve:W0,CubicBezierCurve3:i1,EllipseCurve:Jh,LineCurve:X0,LineCurve3:s1,QuadraticBezierCurve:$0,QuadraticBezierCurve3:q0,SplineCurve:K0});class r1 extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $u[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new $u[s.type]().fromJSON(s))}return this}}class Ld extends r1{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new X0(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new $0(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new W0(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new K0(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new Jh(t,e,i,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Y0 extends Ld{constructor(t){super(t),this.uuid=Nn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Ld().fromJSON(s))}return this}}function o1(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Z0(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=h1(n,t,r,e)),n.length>80*e){a=n[0],c=n[1];let u=a,h=c;for(let f=e;f<s;f+=e){const d=n[f],p=n[f+1];d<a&&(a=d),p<c&&(c=p),d>u&&(u=d),p>h&&(h=p)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return _o(r,o,e,a,c,l,0),o}function Z0(n,t,e,i,s){let r;if(s===b1(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Nd(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Nd(o/i|0,n[o],n[o+1],r);return r&&cr(r,r.next)&&(yo(r),r=r.next),r}function bs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(cr(e,e.next)||De(e.prev,e,e.next)===0)){if(yo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function _o(n,t,e,i,s,r,o){if(!n)return;!o&&r&&g1(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?c1(n,i,s,r):a1(n)){t.push(c.i,n.i,l.i),yo(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=l1(bs(n),t),_o(n,t,e,i,s,r,2)):o===2&&u1(n,t,e,i,s,r):_o(bs(n),t,e,i,s,r,1);break}}}function a1(n){const t=n.prev,e=n,i=n.next;if(De(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(s,r,o),h=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&Xr(s,a,r,c,o,l,p.x,p.y)&&De(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function c1(n,t,e,i){const s=n.prev,r=n,o=n.next;if(De(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,c,l),p=Math.min(u,h,f),v=Math.max(a,c,l),g=Math.max(u,h,f),m=qu(d,p,t,e,i),_=qu(v,g,t,e,i);let M=n.prevZ,x=n.nextZ;for(;M&&M.z>=m&&x&&x.z<=_;){if(M.x>=d&&M.x<=v&&M.y>=p&&M.y<=g&&M!==s&&M!==o&&Xr(a,u,c,h,l,f,M.x,M.y)&&De(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&Xr(a,u,c,h,l,f,x.x,x.y)&&De(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=v&&M.y>=p&&M.y<=g&&M!==s&&M!==o&&Xr(a,u,c,h,l,f,M.x,M.y)&&De(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=_;){if(x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&Xr(a,u,c,h,l,f,x.x,x.y)&&De(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function l1(n,t){let e=n;do{const i=e.prev,s=e.next.next;!cr(i,s)&&Q0(i,e,e.next,s)&&Mo(i,s)&&Mo(s,i)&&(t.push(i.i,e.i,s.i),yo(e),yo(e.next),e=n=s),e=e.next}while(e!==n);return bs(e)}function u1(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_1(o,a)){let c=j0(o,a);o=bs(o,o.next),c=bs(c,c.next),_o(o,t,e,i,s,r,0),_o(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function h1(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Z0(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(x1(l))}s.sort(f1);for(let r=0;r<s.length;r++)e=d1(s[r],e);return e}function f1(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function d1(n,t){const e=p1(n,t);if(!e)return t;const i=j0(e,n);return bs(i,i.next),bs(e,e.next)}function p1(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(cr(n,e))return e;do{if(cr(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&J0(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);Mo(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&m1(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function m1(n,t){return De(n.prev,n,t.prev)<0&&De(t.next,n,n.next)<0}function g1(n,t,e,i){let s=n;do s.z===0&&(s.z=qu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,v1(s)}function v1(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function qu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function x1(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function J0(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function Xr(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&J0(n,t,e,i,s,r,o,a)}function _1(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!M1(n,t)&&(Mo(n,t)&&Mo(t,n)&&y1(n,t)&&(De(n.prev,n,t.prev)||De(n,t.prev,t))||cr(n,t)&&De(n.prev,n,n.next)>0&&De(t.prev,t,t.next)>0)}function De(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function cr(n,t){return n.x===t.x&&n.y===t.y}function Q0(n,t,e,i){const s=pa(De(n,t,e)),r=pa(De(n,t,i)),o=pa(De(e,i,n)),a=pa(De(e,i,t));return!!(s!==r&&o!==a||s===0&&da(n,e,t)||r===0&&da(n,i,t)||o===0&&da(e,n,i)||a===0&&da(e,t,i))}function da(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function pa(n){return n>0?1:n<0?-1:0}function M1(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Q0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Mo(n,t){return De(n.prev,n,n.next)<0?De(n,t,n.next)>=0&&De(n,n.prev,t)>=0:De(n,t,n.prev)<0||De(n,n.next,t)<0}function y1(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function j0(n,t){const e=Ku(n.i,n.x,n.y),i=Ku(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Nd(n,t,e,i){const s=Ku(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function yo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ku(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function b1(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class S1{static triangulate(t,e,i=2){return o1(t,e,i)}}class so{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return so.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Id(t),Dd(i,t);let o=t.length;e.forEach(Id);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Dd(i,e[c]);const a=S1.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Id(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Dd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class ws extends Zh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ws(t.radius,t.detail)}}class Uo extends Yt{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ee(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,h=new L,f=new ot,d=new L,p=new L,v=new L;let g=0,m=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,d.x=m*1,d.y=-g,d.z=m*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(p)}for(let _=0;_<=e;_++){const M=i+_*u*s,x=Math.sin(M),y=Math.cos(M);for(let b=0;b<=t.length-1;b++){h.x=t[b].x*x,h.y=t[b].y,h.z=t[b].x*y,o.push(h.x,h.y,h.z),f.x=_/e,f.y=b/(t.length-1),a.push(f.x,f.y);const w=c[3*b+0]*x,S=c[3*b+1],T=c[3*b+0]*y;l.push(w,S,T)}}for(let _=0;_<e;_++)for(let M=0;M<t.length-1;M++){const x=M+_*t.length,y=x,b=x+t.length,w=x+t.length+1,S=x+1;r.push(y,b,S),r.push(w,S,b)}this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("uv",new Jt(a,2)),this.setAttribute("normal",new Jt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uo(t.points,t.segments,t.phiStart,t.phiLength)}}class Yn extends Yt{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,h=t/a,f=e/c,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const _=m*f-o;for(let M=0;M<l;M++){const x=M*h-r;p.push(x,-_,0),v.push(0,0,1),g.push(M/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){const M=_+l*m,x=_+l*(m+1),y=_+1+l*(m+1),b=_+1+l*m;d.push(M,x,b),d.push(x,y,b)}this.setIndex(d),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.widthSegments,t.heightSegments)}}class tf extends Yt{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let h=t;const f=(e-t)/s,d=new L,p=new ot;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){const m=r+g/i*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,u.push(p.x,p.y)}h+=f}for(let v=0;v<s;v++){const g=v*(i+1);for(let m=0;m<i;m++){const _=m+g,M=_,x=_+i+1,y=_+i+2,b=_+1;a.push(M,x,b),a.push(x,y,b)}}this.setIndex(a),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tf(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ef extends Yt{constructor(t=new Y0([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Jt(s,3)),this.setAttribute("normal",new Jt(r,3)),this.setAttribute("uv",new Jt(o,2));function l(u){const h=s.length/3,f=u.extractPoints(e);let d=f.shape;const p=f.holes;so.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const _=p[g];so.isClockWise(_)===!0&&(p[g]=_.reverse())}const v=so.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const _=p[g];d=d.concat(_)}for(let g=0,m=d.length;g<m;g++){const _=d[g];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let g=0,m=v.length;g<m;g++){const _=v[g],M=_[0]+h,x=_[1]+h,y=_[2]+h;i.push(M,x,y),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return w1(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new ef(i,t.curveSegments)}}function w1(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class vs extends Yt{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,d=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){const _=[],M=m/i,x=o+M*a,y=t*Math.cos(x),b=Math.sqrt(t*t-y*y);let w=0;m===0&&o===0?w=.5/e:m===i&&c===Math.PI&&(w=-.5/e);for(let S=0;S<=e;S++){const T=S/e,R=s+T*r;h.x=-b*Math.cos(R),h.y=y,h.z=b*Math.sin(R),p.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),g.push(T+w,1-M),_.push(l++)}u.push(_)}for(let m=0;m<i;m++)for(let _=0;_<e;_++){const M=u[m][_+1],x=u[m][_],y=u[m+1][_],b=u[m+1][_+1];(m!==0||o>0)&&d.push(M,x,b),(m!==i-1||c<Math.PI)&&d.push(x,y,b)}this.setIndex(d),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class nf extends Yt{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],h=[],f=new L,d=new L,p=new L;for(let v=0;v<=i;v++){const g=o+v/i*a;for(let m=0;m<=s;m++){const _=m/s*r;d.x=(t+e*Math.cos(g))*Math.cos(_),d.y=(t+e*Math.cos(g))*Math.sin(_),d.z=e*Math.sin(g),l.push(d.x,d.y,d.z),f.x=t*Math.cos(_),f.y=t*Math.sin(_),p.subVectors(d,f).normalize(),u.push(p.x,p.y,p.z),h.push(m/s),h.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=s;g++){const m=(s+1)*v+g-1,_=(s+1)*(v-1)+g-1,M=(s+1)*(v-1)+g,x=(s+1)*v+g;c.push(m,_,x),c.push(_,M,x)}this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nf(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class _c extends Yt{constructor(t=new q0(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,c=new L,l=new ot;let u=new L;const h=[],f=[],d=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(f,3)),this.setAttribute("uv",new Jt(d,2));function v(){for(let M=0;M<e;M++)g(M);g(r===!1?e:0),_(),m()}function g(M){u=t.getPointAt(M/e,u);const x=o.normals[M],y=o.binormals[M];for(let b=0;b<=s;b++){const w=b/s*Math.PI*2,S=Math.sin(w),T=-Math.cos(w);c.x=T*x.x+S*y.x,c.y=T*x.y+S*y.y,c.z=T*x.z+S*y.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,h.push(a.x,a.y,a.z)}}function m(){for(let M=1;M<=e;M++)for(let x=1;x<=s;x++){const y=(s+1)*(M-1)+(x-1),b=(s+1)*M+(x-1),w=(s+1)*M+x,S=(s+1)*(M-1)+x;p.push(y,b,S),p.push(b,w,S)}}function _(){for(let M=0;M<=e;M++)for(let x=0;x<=s;x++)l.x=M/e,l.y=x/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _c(new $u[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function lr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Ud(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Ud(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function hn(n){const t={};for(let e=0;e<n.length;e++){const i=lr(n[e]);for(const s in i)t[s]=i[s]}return t}function Ud(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function T1(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function tg(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const _n={clone:lr,merge:hn};var E1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,A1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oe extends qn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=E1,this.fragmentShader=A1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=lr(t.uniforms),this.uniformsGroups=T1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(s.value);break;case"v2":this.uniforms[i].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new L().fromArray(s.value);break;case"v4":this.uniforms[i].value=new me().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class eg extends oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ui extends qn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pi extends Ui{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class fr extends qn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=wh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class R1 extends qn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=W_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class C1 extends qn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Zi(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Va(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function P1(n){function t(s,r){return n[s]-n[r]}const e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function kd(n,t,e){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=n[a+c]}return s}function L1(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}class dr{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){const a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class N1 extends dr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kf,endingEnd:Kf}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Yf:r=t,a=2*e-i;break;case Zf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Yf:o=t,c=2*i-e;break;case Zf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}const l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),v=p*p,g=v*p,m=-f*g+2*f*v-f*p,_=(1+f)*g+(-1.5-2*f)*v+(-.5+f)*p+1,M=(-1-d)*g+(1.5+d)*v+.5*p,x=d*g-d*v;for(let y=0;y!==a;++y)r[y]=m*o[u+y]+_*o[l+y]+M*o[c+y]+x*o[h+y];return r}}class I1 extends dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(s-e),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}}class D1 extends dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class U1 extends dr{interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,h=this.outTangents;if(!u||!h){const p=(i-e)/(s-e),v=1-p;for(let g=0;g!==a;++g)r[g]=o[l+g]*v+o[c+g]*p;return r}const f=a*2,d=t-1;for(let p=0;p!==a;++p){const v=o[l+p],g=o[c+p],m=d*f+p*2,_=h[m],M=h[m+1],x=t*f+p*2,y=u[x],b=u[x+1],w=F1(i,e,_,y,s);r[p]=ng(w,v,M,b,g)}return r}}function ng(n,t,e,i,s){const r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function k1(n,t,e,i,s){const r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function F1(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){const a=ng(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;const c=k1(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Zn{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Zi(e,this.TimeBufferType),this.values=Zi(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Zi(t.times,Array),values:Zi(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Va(t.settings)&&(i.settings={inTangents:Zi(t.settings.inTangents,Array),outTangents:Zi(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new D1(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new I1(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new N1(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new U1(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fo:e=this.InterpolantFactoryMethodDiscrete;break;case po:e=this.InterpolantFactoryMethodLinear;break;case Hc:e=this.InterpolantFactoryMethodSmooth;break;case qf:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Dt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fo;case this.InterpolantFactoryMethodLinear:return po;case this.InterpolantFactoryMethodSmooth:return Hc;case this.InterpolantFactoryMethodBezier:return qf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Va(this.settings)&&(Fd(this.settings.inTangents,t),Fd(this.settings.outTangents,t))}return this}trim(t,e){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Wt("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Wt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=i[a];if(typeof c=="number"&&isNaN(c)){Wt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Wt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&tM(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){Wt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Hc,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{const h=a*i,f=h-i,d=h+i;for(let p=0;p!==i;++p){const v=e[h+p];if(v!==e[f+p]||v!==e[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const h=a*i,f=o*i;for(let d=0;d!==i;++d)e[f+d]=e[h+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Va(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function Fd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Zn.prototype.ValueTypeName="";Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=po;class pr extends Zn{constructor(t,e,i){super(t,e,i)}}pr.prototype.ValueTypeName="bool";pr.prototype.ValueBufferType=Array;pr.prototype.DefaultInterpolation=fo;pr.prototype.InterpolantFactoryMethodLinear=void 0;pr.prototype.InterpolantFactoryMethodSmooth=void 0;class ig extends Zn{constructor(t,e,i,s){super(t,e,i,s)}}ig.prototype.ValueTypeName="color";class bo extends Zn{constructor(t,e,i,s){super(t,e,i,s)}}bo.prototype.ValueTypeName="number";class O1 extends dr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Ce.slerpFlat(r,0,o,l-a,o,l,c);return r}}class So extends Zn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new O1(this.times,this.values,this.getValueSize(),t)}}So.prototype.ValueTypeName="quaternion";So.prototype.InterpolantFactoryMethodSmooth=void 0;class mr extends Zn{constructor(t,e,i){super(t,e,i)}}mr.prototype.ValueTypeName="string";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=fo;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class lc extends Zn{constructor(t,e,i,s){super(t,e,i,s)}}lc.prototype.ValueTypeName="vector";class B1{constructor(t="",e=-1,i=[],s=V_){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=Nn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(H1(i[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=i.length;r!==o;++r)e.push(Zn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=P1(c);c=kd(c,1,u),l=kd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new bo(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}resetDuration(){const t=this.tracks;let e=0;for(let i=0,s=t.length;i!==s;++i){const r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function z1(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bo;case"vector":case"vector2":case"vector3":case"vector4":return lc;case"color":return ig;case"quaternion":return So;case"bool":case"boolean":return pr;case"string":return mr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function H1(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=z1(n.type);if(n.times===void 0){const i=[],s=[];L1(n.keys,i,s,"value"),n.times=i,n.values=s}let e;return t.parse!==void 0?e=t.parse(n):e=new t(n.name,n.times,n.values,n.interpolation),Va(n.settings)&&(e.settings={inTangents:Zi(n.settings.inTangents,Float32Array),outTangents:Zi(n.settings.outTangents,Float32Array)}),e}const Ei={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Od(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Od(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Od(n){try{const t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class V1{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],p=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const G1=new V1;class gr{constructor(t){this.manager=t!==void 0?t:G1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}gr.DEFAULT_MATERIAL_NAME="__DEFAULT";const yi={};class W1 extends Error{constructor(t,e){super(t),this.response=e}}class sg extends gr{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Ei.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(yi[t]!==void 0){yi[t].push({onLoad:e,onProgress:i,onError:s});return}yi[t]=[],yi[t].push({onLoad:e,onProgress:i,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Dt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=yi[t],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let v=0;const g=new ReadableStream({start(m){_();function _(){h.read().then(({done:M,value:x})=>{if(M)m.close();else{v+=x.byteLength;const y=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:d});for(let b=0,w=u.length;b<w;b++){const S=u[b];S.onProgress&&S.onProgress(y)}m.enqueue(x),_()}},M=>{m.error(M)})}}});return new Response(g)}else throw new W1(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{Ei.add(`file:${t}`,l);const u=yi[t];delete yi[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=yi[t];if(u===void 0)throw this.manager.itemError(t),l;delete yi[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Os=new WeakMap;class X1 extends gr{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Ei.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let h=Os.get(o);h===void 0&&(h=[],Os.set(o,h)),h.push({onLoad:e,onError:s})}return o}const a=go("img");function c(){u(),e&&e(this);const h=Os.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}Os.delete(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),Ei.remove(`image:${t}`);const f=Os.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(h)}Os.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ei.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class $1 extends gr{constructor(t){super(t)}load(t,e,i,s){const r=new qe,o=new X1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class Mc extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class q1 extends Mc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ml=new Ot,Bd=new L,zd=new L;class sf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Io,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Bd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Bd),zd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){ml.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(ml,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===mo||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(ml)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ma=new L,ga=new Ce,ti=new L;class rg extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ma,ga,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,ti.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ma,ga,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new L,Hd=new ot,Vd=new ot;class fn extends rg{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z)}getViewSize(t,e){return this.getViewBounds(t,Hd,Vd),e.subVectors(Vd,Hd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(to*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class K1 extends sf{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=ar*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class Y1 extends Mc{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new K1}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class Z1 extends sf{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0}}class J1 extends Mc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Z1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class ko extends rg{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Q1 extends sf{constructor(){super(new ko(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class og extends Mc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new Q1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class ro{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const gl=new WeakMap;class j1 extends gr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Dt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Dt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Ei.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{gl.has(o)===!0?(s&&s(gl.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(l),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ei.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),gl.set(c,l),Ei.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});Ei.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Bs=-90,zs=1;class ty extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(Bs,zs,t,e);s.layers=this.layers,this.add(s);const r=new fn(Bs,zs,t,e);r.layers=this.layers,this.add(r);const o=new fn(Bs,zs,t,e);o.layers=this.layers,this.add(o);const a=new fn(Bs,zs,t,e);a.layers=this.layers,this.add(a);const c=new fn(Bs,zs,t,e);c.layers=this.layers,this.add(c);const l=new fn(Bs,zs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===mo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class ey extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class ny{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=iy.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function iy(){this._document.hidden===!1&&this.reset()}const rf="\\[\\]\\.:\\/",sy=new RegExp("["+rf+"]","g"),of="[^"+rf+"]",ry="[^"+rf.replace("\\.","")+"]",oy=/((?:WC+[\/:])*)/.source.replace("WC",of),ay=/(WCOD+)?/.source.replace("WCOD",ry),cy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",of),ly=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",of),uy=new RegExp("^"+oy+ay+cy+ly+"$"),hy=["material","materials","bones","map"];class fy{constructor(t,e,i){const s=i||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}}class _e{constructor(t,e,i){this.path=e,this.parsedPath=i||_e.parseTrackName(e),this.node=_e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new _e.Composite(t,e,i):new _e(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(sy,"")}static parseTrackName(t){const e=uy.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);hy.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=_e.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Wt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Wt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Wt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Wt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Wt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;Wt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}_e.Composite=fy;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ag{static{ag.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}function Gd(n,t,e,i){const s=dy(i);switch(e){case R0:return n*t;case Dh:return n*t/s.components*s.byteLength;case Uh:return n*t/s.components*s.byteLength;case ys:return n*t*2/s.components*s.byteLength;case kh:return n*t*2/s.components*s.byteLength;case C0:return n*t*3/s.components*s.byteLength;case Ln:return n*t*4/s.components*s.byteLength;case Fh:return n*t*4/s.components*s.byteLength;case Oa:case Ba:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case za:case Ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case mu:case vu:return Math.max(n,16)*Math.max(t,8)/4;case pu:case gu:return Math.max(n,8)*Math.max(t,8)/2;case xu:case _u:case yu:case bu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Mu:case ec:case Su:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case wu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Tu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Eu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Au:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ru:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Cu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Pu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Lu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Nu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Iu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Du:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Uu:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ku:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Fu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ou:case Bu:case zu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Hu:case Vu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case nc:case Gu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function dy(n){switch(n){case Sn:case w0:return{byteLength:1,components:1};case uo:case T0:case gn:return{byteLength:2,components:1};case Nh:case Ih:return{byteLength:2,components:4};case hi:case Lh:case Pn:return{byteLength:4,components:1};case E0:case A0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sh}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sh);function cg(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function py(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,c,l){const u=c.array,h=c.updateRanges;if(n.bindBuffer(l,a),h.length===0)n.bufferSubData(l,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],v=h[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const v=h[d];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var my=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gy=`#ifdef USE_ALPHAHASH
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
#endif`,vy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_y=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,My=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yy=`#ifdef USE_AOMAP
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
#endif`,by=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sy=`#ifdef USE_BATCHING
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
#endif`,wy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ty=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ey=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ay=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ry=`#ifdef USE_IRIDESCENCE
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
#endif`,Cy=`#ifdef USE_BUMPMAP
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
#endif`,Py=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ly=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ny=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Uy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Fy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Oy=`#define PI 3.141592653589793
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
} // validated`,By=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zy=`vec3 transformedNormal = objectNormal;
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
#endif`,Hy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xy="gl_FragColor = linearToOutputTexel( gl_FragColor );",$y=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qy=`#ifdef USE_ENVMAP
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
#endif`,Ky=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yy=`#ifdef USE_ENVMAP
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
#endif`,Zy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jy=`#ifdef USE_ENVMAP
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
#endif`,Qy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nb=`#ifdef USE_GRADIENTMAP
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
}`,ib=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ob=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ab=`#ifdef USE_ENVMAP
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
#endif`,cb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ub=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fb=`PhysicalMaterial material;
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
#endif`,db=`uniform sampler2D dfgLUT;
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
}`,pb=`
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
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
#endif`,gb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_b=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tb=`#if defined( USE_POINTS_UV )
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
#endif`,Eb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ab=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lb=`#ifdef USE_MORPHTARGETS
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
#endif`,Nb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ib=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Db=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ob=`#ifdef USE_NORMALMAP
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
#endif`,Bb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$b=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tS=`float getShadowMask() {
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
}`,eS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nS=`#ifdef USE_SKINNING
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
#endif`,iS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sS=`#ifdef USE_SKINNING
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
#endif`,rS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,aS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lS=`#ifdef USE_TRANSMISSION
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
#endif`,uS=`#ifdef USE_TRANSMISSION
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
#endif`,hS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gS=`uniform sampler2D t2D;
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
}`,vS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yS=`#include <common>
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
}`,bS=`#if DEPTH_PACKING == 3200
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
}`,SS=`#define DISTANCE
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
}`,wS=`#define DISTANCE
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
}`,TS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ES=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AS=`uniform float scale;
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
}`,RS=`uniform vec3 diffuse;
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
}`,CS=`#include <common>
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
}`,PS=`uniform vec3 diffuse;
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
}`,LS=`#define LAMBERT
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
}`,NS=`#define LAMBERT
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
}`,IS=`#define MATCAP
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
}`,DS=`#define MATCAP
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
}`,US=`#define NORMAL
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
}`,kS=`#define NORMAL
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
}`,FS=`#define PHONG
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
}`,OS=`#define PHONG
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
}`,BS=`#define STANDARD
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
}`,zS=`#define STANDARD
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
}`,HS=`#define TOON
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
}`,VS=`#define TOON
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
}`,GS=`uniform float size;
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
}`,WS=`uniform vec3 diffuse;
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
}`,XS=`#include <common>
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
}`,$S=`uniform vec3 color;
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
}`,qS=`uniform float rotation;
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
}`,KS=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:my,alphahash_pars_fragment:gy,alphamap_fragment:vy,alphamap_pars_fragment:xy,alphatest_fragment:_y,alphatest_pars_fragment:My,aomap_fragment:yy,aomap_pars_fragment:by,batching_pars_vertex:Sy,batching_vertex:wy,begin_vertex:Ty,beginnormal_vertex:Ey,bsdfs:Ay,iridescence_fragment:Ry,bumpmap_pars_fragment:Cy,clipping_planes_fragment:Py,clipping_planes_pars_fragment:Ly,clipping_planes_pars_vertex:Ny,clipping_planes_vertex:Iy,color_fragment:Dy,color_pars_fragment:Uy,color_pars_vertex:ky,color_vertex:Fy,common:Oy,cube_uv_reflection_fragment:By,defaultnormal_vertex:zy,displacementmap_pars_vertex:Hy,displacementmap_vertex:Vy,emissivemap_fragment:Gy,emissivemap_pars_fragment:Wy,colorspace_fragment:Xy,colorspace_pars_fragment:$y,envmap_fragment:qy,envmap_common_pars_fragment:Ky,envmap_pars_fragment:Yy,envmap_pars_vertex:Zy,envmap_physical_pars_fragment:ab,envmap_vertex:Jy,fog_vertex:Qy,fog_pars_vertex:jy,fog_fragment:tb,fog_pars_fragment:eb,gradientmap_pars_fragment:nb,lightmap_pars_fragment:ib,lights_lambert_fragment:sb,lights_lambert_pars_fragment:rb,lights_pars_begin:ob,lights_toon_fragment:cb,lights_toon_pars_fragment:lb,lights_phong_fragment:ub,lights_phong_pars_fragment:hb,lights_physical_fragment:fb,lights_physical_pars_fragment:db,lights_fragment_begin:pb,lights_fragment_maps:mb,lights_fragment_end:gb,lightprobes_pars_fragment:vb,logdepthbuf_fragment:xb,logdepthbuf_pars_fragment:_b,logdepthbuf_pars_vertex:Mb,logdepthbuf_vertex:yb,map_fragment:bb,map_pars_fragment:Sb,map_particle_fragment:wb,map_particle_pars_fragment:Tb,metalnessmap_fragment:Eb,metalnessmap_pars_fragment:Ab,morphinstance_vertex:Rb,morphcolor_vertex:Cb,morphnormal_vertex:Pb,morphtarget_pars_vertex:Lb,morphtarget_vertex:Nb,normal_fragment_begin:Ib,normal_fragment_maps:Db,normal_pars_fragment:Ub,normal_pars_vertex:kb,normal_vertex:Fb,normalmap_pars_fragment:Ob,clearcoat_normal_fragment_begin:Bb,clearcoat_normal_fragment_maps:zb,clearcoat_pars_fragment:Hb,iridescence_pars_fragment:Vb,opaque_fragment:Gb,packing:Wb,premultiplied_alpha_fragment:Xb,project_vertex:$b,dithering_fragment:qb,dithering_pars_fragment:Kb,roughnessmap_fragment:Yb,roughnessmap_pars_fragment:Zb,shadowmap_pars_fragment:Jb,shadowmap_pars_vertex:Qb,shadowmap_vertex:jb,shadowmask_pars_fragment:tS,skinbase_vertex:eS,skinning_pars_vertex:nS,skinning_vertex:iS,skinnormal_vertex:sS,specularmap_fragment:rS,specularmap_pars_fragment:oS,tonemapping_fragment:aS,tonemapping_pars_fragment:cS,transmission_fragment:lS,transmission_pars_fragment:uS,uv_pars_fragment:hS,uv_pars_vertex:fS,uv_vertex:dS,worldpos_vertex:pS,background_vert:mS,background_frag:gS,backgroundCube_vert:vS,backgroundCube_frag:xS,cube_vert:_S,cube_frag:MS,depth_vert:yS,depth_frag:bS,distance_vert:SS,distance_frag:wS,equirect_vert:TS,equirect_frag:ES,linedashed_vert:AS,linedashed_frag:RS,meshbasic_vert:CS,meshbasic_frag:PS,meshlambert_vert:LS,meshlambert_frag:NS,meshmatcap_vert:IS,meshmatcap_frag:DS,meshnormal_vert:US,meshnormal_frag:kS,meshphong_vert:FS,meshphong_frag:OS,meshphysical_vert:BS,meshphysical_frag:zS,meshtoon_vert:HS,meshtoon_frag:VS,points_vert:GS,points_frag:WS,shadow_vert:XS,shadow_frag:$S,sprite_vert:qS,sprite_frag:KS},lt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},si={basic:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:hn([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:hn([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new ct(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:hn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:hn([lt.points,lt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:hn([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:hn([lt.common,lt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:hn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:hn([lt.sprite,lt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:hn([lt.common,lt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:hn([lt.lights,lt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};si.physical={uniforms:hn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const va={r:0,b:0,g:0},YS=new Ot,lg=new Kt;lg.set(-1,0,0,0,1,0,0,0,1);function ZS(n,t,e,i,s,r){const o=new ct(0);let a=s===!0?0:1,c,l,u=null,h=0,f=null;function d(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){const x=_.backgroundBlurriness>0;M=t.get(M,x)}return M}function p(_){let M=!1;const x=d(_);x===null?g(o,a):x&&x.isColor&&(g(x,1),M=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,M){const x=d(M);x&&(x.isCubeTexture||x.mapping===vc)?(l===void 0&&(l=new $t(new Vt(1,1,1),new oe({name:"BackgroundCubeMaterial",uniforms:lr(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(YS.makeRotationFromEuler(M.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(lg),l.material.toneMapped=ie.getTransfer(x.colorSpace)!==pe,(u!==x||h!==x.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new $t(new Yn(2,2),new oe({name:"BackgroundMaterial",uniforms:lr(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ie.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function g(_,M){_.getRGB(va,tg(n)),e.buffers.color.setClear(va.r,va.g,va.b,M,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,M=1){o.set(_),a=M,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,g(o,a)},render:p,addToRenderList:v,dispose:m}}function JS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(A,P,I,N,U){let z=!1;const V=h(A,N,I,P);r!==V&&(r=V,l(r.object)),z=d(A,N,I,U),z&&p(A,N,I,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(A,P,I,N),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function h(A,P,I,N){const U=N.wireframe===!0;let z=i[P.id];z===void 0&&(z={},i[P.id]=z);const V=A.isInstancedMesh===!0?A.id:0;let J=z[V];J===void 0&&(J={},z[V]=J);let B=J[I.id];B===void 0&&(B={},J[I.id]=B);let K=B[U];return K===void 0&&(K=f(c()),B[U]=K),K}function f(A){const P=[],I=[],N=[];for(let U=0;U<e;U++)P[U]=0,I[U]=0,N[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:N,object:A,attributes:{},index:null}}function d(A,P,I,N){const U=r.attributes,z=P.attributes;let V=0;const J=I.getAttributes();for(const B in J)if(J[B].location>=0){const j=U[B];let Mt=z[B];if(Mt===void 0&&(B==="instanceMatrix"&&A.instanceMatrix&&(Mt=A.instanceMatrix),B==="instanceColor"&&A.instanceColor&&(Mt=A.instanceColor)),j===void 0||j.attribute!==Mt||Mt&&j.data!==Mt.data)return!0;V++}return r.attributesNum!==V||r.index!==N}function p(A,P,I,N){const U={},z=P.attributes;let V=0;const J=I.getAttributes();for(const B in J)if(J[B].location>=0){let j=z[B];j===void 0&&(B==="instanceMatrix"&&A.instanceMatrix&&(j=A.instanceMatrix),B==="instanceColor"&&A.instanceColor&&(j=A.instanceColor));const Mt={};Mt.attribute=j,j&&j.data&&(Mt.data=j.data),U[B]=Mt,V++}r.attributes=U,r.attributesNum=V,r.index=N}function v(){const A=r.newAttributes;for(let P=0,I=A.length;P<I;P++)A[P]=0}function g(A){m(A,0)}function m(A,P){const I=r.newAttributes,N=r.enabledAttributes,U=r.attributeDivisors;I[A]=1,N[A]===0&&(n.enableVertexAttribArray(A),N[A]=1),U[A]!==P&&(n.vertexAttribDivisor(A,P),U[A]=P)}function _(){const A=r.newAttributes,P=r.enabledAttributes;for(let I=0,N=P.length;I<N;I++)P[I]!==A[I]&&(n.disableVertexAttribArray(I),P[I]=0)}function M(A,P,I,N,U,z,V){V===!0?n.vertexAttribIPointer(A,P,I,U,z):n.vertexAttribPointer(A,P,I,N,U,z)}function x(A,P,I,N){v();const U=N.attributes,z=I.getAttributes(),V=P.defaultAttributeValues;for(const J in z){const B=z[J];if(B.location>=0){let K=U[J];if(K===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(K=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(K=A.instanceColor)),K!==void 0){const j=K.normalized,Mt=K.itemSize,gt=t.get(K);if(gt===void 0)continue;const At=gt.buffer,Bt=gt.type,Ht=gt.bytesPerElement,X=Bt===n.INT||Bt===n.UNSIGNED_INT||K.gpuType===Lh;if(K.isInterleavedBufferAttribute){const Y=K.data,yt=Y.stride,Pt=K.offset;if(Y.isInstancedInterleavedBuffer){for(let it=0;it<B.locationSize;it++)m(B.location+it,Y.meshPerAttribute);A.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let it=0;it<B.locationSize;it++)g(B.location+it);n.bindBuffer(n.ARRAY_BUFFER,At);for(let it=0;it<B.locationSize;it++)M(B.location+it,Mt/B.locationSize,Bt,j,yt*Ht,(Pt+Mt/B.locationSize*it)*Ht,X)}else{if(K.isInstancedBufferAttribute){for(let Y=0;Y<B.locationSize;Y++)m(B.location+Y,K.meshPerAttribute);A.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Y=0;Y<B.locationSize;Y++)g(B.location+Y);n.bindBuffer(n.ARRAY_BUFFER,At);for(let Y=0;Y<B.locationSize;Y++)M(B.location+Y,Mt/B.locationSize,Bt,j,Mt*Ht,Mt/B.locationSize*Y*Ht,X)}}else if(V!==void 0){const j=V[J];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(B.location,j);break;case 3:n.vertexAttrib3fv(B.location,j);break;case 4:n.vertexAttrib4fv(B.location,j);break;default:n.vertexAttrib1fv(B.location,j)}}}}_()}function y(){T();for(const A in i){const P=i[A];for(const I in P){const N=P[I];for(const U in N){const z=N[U];for(const V in z)u(z[V].object),delete z[V];delete N[U]}}delete i[A]}}function b(A){if(i[A.id]===void 0)return;const P=i[A.id];for(const I in P){const N=P[I];for(const U in N){const z=N[U];for(const V in z)u(z[V].object),delete z[V];delete N[U]}}delete i[A.id]}function w(A){for(const P in i){const I=i[P];for(const N in I){const U=I[N];if(U[A.id]===void 0)continue;const z=U[A.id];for(const V in z)u(z[V].object),delete z[V];delete U[A.id]}}}function S(A){for(const P in i){const I=i[P],N=A.isInstancedMesh===!0?A.id:0,U=I[N];if(U!==void 0){for(const z in U){const V=U[z];for(const J in V)u(V[J].object),delete V[J];delete U[z]}delete I[N],Object.keys(I).length===0&&delete i[P]}}}function T(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:R,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function QS(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let d=0;d<u;d++)f+=l[d];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function jS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Ln&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const S=w===gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Sn&&w!==Pn&&!S&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Dt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:x,maxSamples:y,samples:b}}function tw(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Yi,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,m=n.get(h);if(!s||p===null||p.length===0||r&&!g)r?u(null):l();else{const _=r?0:i,M=_*4;let x=m.clippingState||null;c.value=x,x=u(p,f,M,d);for(let y=0;y!==M;++y)x[y]=e[y];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,p){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,x=d;M!==v;++M,x+=4)o.copy(h[M]).applyMatrix4(_,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const Zs=4,ew=6,nw=20,iw=256,Pr=new ko,Wd=new ct;let vl=null,xl=0,_l=0,Ml=!1;const sw=new L,cs=new L;class Xd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=sw}=r;vl=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(vl,xl,_l),this._renderer.xr.enabled=Ml,t.scissorTest=!1,Hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===rr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vl=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:gn,format:Ln,colorSpace:wn,depthBuffer:!1},s=$d(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$d(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=rw(r)),this._blurMaterial=aw(r,t,e),this._ggxMaterial=ow(r,t,e)}return s}_compileMaterial(t){const e=new $t(new Yt,t);this._renderer.compile(e,Pr)}_sceneToCubeUV(t,e,i,s,r){const c=new fn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Wd),h.toneMapping=li,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new Vt,new cn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const _=t.background;_?_.isColor&&(g.color.copy(_),t.background=null,m=!0):(g.color.copy(Wd),m=!0);for(let M=0;M<6;M++){const x=M%3;x===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[M],r.y,r.z)):x===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[M]));const y=this._cubeSize;Hs(s,x*y,M>2?y:0,y,y),h.setRenderTarget(s),m&&h.render(v,c),h.render(t,c)}h.toneMapping=d,h.autoClear=f,t.background=_}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ms||t.mapping===rr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Hs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Pr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),f=l*1.25,d=h*f,{_lodMax:p}=this,v=this._sizeLods[i],g=3*v*(i>p-Zs?i-p+Zs:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,Hs(r,g,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Pr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,Hs(t,g,m,3*v,2*v),s.setRenderTarget(t),s.render(a,Pr)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],h=3*u*(s>this._lodMax-Zs?s-this._lodMax+Zs:0),f=4*(this._cubeSize-u);Hs(e,h,f,3*u,2*u),o.setRenderTarget(e),o.render(c,Pr)}}function rw(n){const t=[],e=[];let i=n;const s=n-Zs+1+ew;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);const a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,f=6,d=3,p=new Float32Array(d*f*h),v=new Float32Array(d*f*h);for(let m=0;m<h;m++){const _=m%3*2/3-1,M=m>2?0:-1,x=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];p.set(x,d*f*m);for(let y=0;y<f;y++){const b=u[y*2]*2-1,w=u[y*2+1]*2-1;m===0?cs.set(1,w,b):m===1?cs.set(-b,1,-w):m===2?cs.set(-b,w,1):m===3?cs.set(-1,w,-b):m===4?cs.set(-b,-1,w):cs.set(b,w,-1),cs.toArray(v,(m*f+y)*d)}}const g=new Yt;g.setAttribute("position",new St(p,d)),g.setAttribute("outputDirection",new St(v,d)),e.push(new $t(g,null)),i>Zs&&i--}return{lodMeshes:e,sizeLods:t}}function $d(n,t,e){const i=new dn(n,t,e);return i.texture.mapping=vc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function ow(n,t,e){return new oe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:iw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yc(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function aw(n,t,e){return new oe({name:"SphericalGaussianBlur",defines:{SAMPLES:nw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:yc(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function qd(){return new oe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yc(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Kd(){return new oe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function yc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ug extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new V0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vt(5,5,5),r=new oe({name:"CubemapFromEquirect",uniforms:lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:ci});r.uniforms.tEquirect.value=e;const o=new $t(s,r),a=e.minFilter;return e.minFilter===Ti&&(e.minFilter=$e),new ty(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function cw(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Bc||d===zc)if(t.has(f)){const p=t.get(f).texture;return a(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const v=new ug(p.height);return v.fromEquirectangularTexture(n,f),t.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,p=d===Bc||d===zc,v=d===Ms||d===rr;if(p||v){let g=e.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Xd(n)),g=p?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),g.texture;if(g!==void 0)return g.texture;{const _=f.image;return p&&_&&_.height>0||v&&_&&c(_)?(i===null&&(i=new Xd(n)),g=p?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function a(f,d){return d===Bc?f.mapping=Ms:d===zc&&(f.mapping=rr),f}function c(f){let d=0;const p=6;for(let v=0;v<p;v++)f[v]!==void 0&&d++;return d===p}function l(f){const d=f.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function lw(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Js("WebGLRenderer: "+i+" extension not supported."),s}}}function uw(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,p=h.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const _=d.array;v=d.version;for(let M=0,x=_.length;M<x;M+=3){const y=_[M+0],b=_[M+1],w=_[M+2];f.push(y,b,b,w,w,y)}}else{const _=p.array;v=p.version;for(let M=0,x=_.length/3-1;M<x;M+=3){const y=M+0,b=M+1,w=M+2;f.push(y,b,b,w,w,y)}}const g=new(p.count>=65535?F0:k0)(f,1);g.version=v;const m=r.get(h);m&&t.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function hw(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function l(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,h*o,d),e.update(f,i,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,d);let v=0;for(let g=0;g<d;g++)v+=f[g];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function fw(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Wt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function dw(n,t,e){const i=new WeakMap,s=new me;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let T=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),p===!0&&(M=2),v===!0&&(M=3);let x=a.attributes.position.count*M,y=1;x>t.maxTextureSize&&(y=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const b=new Float32Array(x*y*4*h),w=new I0(b,x,y,h);w.type=Pn,w.needsUpdate=!0;const S=M*4;for(let R=0;R<h;R++){const A=g[R],P=m[R],I=_[R],N=x*y*4*R;for(let U=0;U<A.count;U++){const z=U*S;d===!0&&(s.fromBufferAttribute(A,U),b[N+z+0]=s.x,b[N+z+1]=s.y,b[N+z+2]=s.z,b[N+z+3]=0),p===!0&&(s.fromBufferAttribute(P,U),b[N+z+4]=s.x,b[N+z+5]=s.y,b[N+z+6]=s.z,b[N+z+7]=0),v===!0&&(s.fromBufferAttribute(I,U),b[N+z+8]=s.x,b[N+z+9]=s.y,b[N+z+10]=s.z,b[N+z+11]=I.itemSize===4?s.w:1)}}f={count:h,texture:w,size:new ot(x,y)},i.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function pw(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,h=l.geometry,f=t.get(l,h);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const mw={[Th]:"LINEAR_TONE_MAPPING",[Eh]:"REINHARD_TONE_MAPPING",[Ah]:"CINEON_TONE_MAPPING",[gc]:"ACES_FILMIC_TONE_MAPPING",[Ch]:"AGX_TONE_MAPPING",[Ph]:"NEUTRAL_TONE_MAPPING",[Rh]:"CUSTOM_TONE_MAPPING"};function gw(n,t,e,i,s,r){const o=new dn(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Yt;l.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Jt([0,2,0,0,2,0],2));const u=new eg({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new $t(l,u),f=new ko(-1,1,1,-1,0,1);let d=null,p=null,v=!1,g,m=null,_=[],M=!1;this.setSize=function(x,y){o.setSize(x,y),a!==null&&a.setSize(x,y),c!==null&&c.setSize(x,y);for(let b=0;b<_.length;b++){const w=_[b];w.setSize&&w.setSize(x,y)}},this.setEffects=function(x){_=x,M=_.length>0&&_[0].isRenderPass===!0;const y=o.width,b=o.height;_.length>0&&a===null&&(a=new dn(y,b,{type:gn,depthBuffer:!1,stencilBuffer:!1}),c=new dn(y,b,{type:gn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<_.length;w++){const S=_[w];S.setSize&&S.setSize(y,b)}},this.begin=function(x,y){if(v||x.toneMapping===li&&_.length===0)return!1;if(m=y,y!==null){const b=y.width,w=y.height;(o.width!==b||o.height!==w)&&this.setSize(b,w)}return M===!1&&x.setRenderTarget(o),g=x.toneMapping,x.toneMapping=li,!0},this.hasRenderPass=function(){return M},this.end=function(x,y){x.toneMapping=g,v=!0;let b=o,w=a;for(let S=0;S<_.length;S++){const T=_[S];T.enabled!==!1&&(T.render(x,w,b,y),T.needsSwap!==!1&&(b=w,w=w===a?c:a))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,u.defines={},ie.getTransfer(d)===pe&&(u.defines.SRGB_TRANSFER="");const S=mw[p];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(m),x.render(h,f),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const hg=new qe,Yu=new xo(1,1),fg=new I0,dg=new EM,pg=new V0,Yd=[],Zd=[],Jd=new Float32Array(16),Qd=new Float32Array(9),jd=new Float32Array(4);function vr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Yd[s];if(r===void 0&&(r=new Float32Array(s),Yd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ke(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function bc(n,t){let e=Zd[t];e===void 0&&(e=new Int32Array(t),Zd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function vw(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function xw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ke(e,t))return;n.uniform2fv(this.addr,t),Ye(e,t)}}function _w(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ke(e,t))return;n.uniform3fv(this.addr,t),Ye(e,t)}}function Mw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ke(e,t))return;n.uniform4fv(this.addr,t),Ye(e,t)}}function yw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ke(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(Ke(e,i))return;jd.set(i),n.uniformMatrix2fv(this.addr,!1,jd),Ye(e,i)}}function bw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ke(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(Ke(e,i))return;Qd.set(i),n.uniformMatrix3fv(this.addr,!1,Qd),Ye(e,i)}}function Sw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ke(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(Ke(e,i))return;Jd.set(i),n.uniformMatrix4fv(this.addr,!1,Jd),Ye(e,i)}}function ww(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Tw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ke(e,t))return;n.uniform2iv(this.addr,t),Ye(e,t)}}function Ew(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ke(e,t))return;n.uniform3iv(this.addr,t),Ye(e,t)}}function Aw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ke(e,t))return;n.uniform4iv(this.addr,t),Ye(e,t)}}function Rw(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Cw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ke(e,t))return;n.uniform2uiv(this.addr,t),Ye(e,t)}}function Pw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ke(e,t))return;n.uniform3uiv(this.addr,t),Ye(e,t)}}function Lw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ke(e,t))return;n.uniform4uiv(this.addr,t),Ye(e,t)}}function Nw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Yu.compareFunction=e.isReversedDepthBuffer()?Bh:Oh,r=Yu):r=hg,e.setTexture2D(t||r,s)}function Iw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||dg,s)}function Dw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||pg,s)}function Uw(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||fg,s)}function kw(n){switch(n){case 5126:return vw;case 35664:return xw;case 35665:return _w;case 35666:return Mw;case 35674:return yw;case 35675:return bw;case 35676:return Sw;case 5124:case 35670:return ww;case 35667:case 35671:return Tw;case 35668:case 35672:return Ew;case 35669:case 35673:return Aw;case 5125:return Rw;case 36294:return Cw;case 36295:return Pw;case 36296:return Lw;case 35678:case 36198:case 36298:case 36306:case 35682:return Nw;case 35679:case 36299:case 36307:return Iw;case 35680:case 36300:case 36308:case 36293:return Dw;case 36289:case 36303:case 36311:case 36292:return Uw}}function Fw(n,t){n.uniform1fv(this.addr,t)}function Ow(n,t){const e=vr(t,this.size,2);n.uniform2fv(this.addr,e)}function Bw(n,t){const e=vr(t,this.size,3);n.uniform3fv(this.addr,e)}function zw(n,t){const e=vr(t,this.size,4);n.uniform4fv(this.addr,e)}function Hw(n,t){const e=vr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Vw(n,t){const e=vr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Gw(n,t){const e=vr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Ww(n,t){n.uniform1iv(this.addr,t)}function Xw(n,t){n.uniform2iv(this.addr,t)}function $w(n,t){n.uniform3iv(this.addr,t)}function qw(n,t){n.uniform4iv(this.addr,t)}function Kw(n,t){n.uniform1uiv(this.addr,t)}function Yw(n,t){n.uniform2uiv(this.addr,t)}function Zw(n,t){n.uniform3uiv(this.addr,t)}function Jw(n,t){n.uniform4uiv(this.addr,t)}function Qw(n,t,e){const i=this.cache,s=t.length,r=bc(e,s);Ke(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Yu:o=hg;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function jw(n,t,e){const i=this.cache,s=t.length,r=bc(e,s);Ke(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||dg,r[o])}function tT(n,t,e){const i=this.cache,s=t.length,r=bc(e,s);Ke(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||pg,r[o])}function eT(n,t,e){const i=this.cache,s=t.length,r=bc(e,s);Ke(i,r)||(n.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||fg,r[o])}function nT(n){switch(n){case 5126:return Fw;case 35664:return Ow;case 35665:return Bw;case 35666:return zw;case 35674:return Hw;case 35675:return Vw;case 35676:return Gw;case 5124:case 35670:return Ww;case 35667:case 35671:return Xw;case 35668:case 35672:return $w;case 35669:case 35673:return qw;case 5125:return Kw;case 36294:return Yw;case 36295:return Zw;case 36296:return Jw;case 35678:case 36198:case 36298:case 36306:case 35682:return Qw;case 35679:case 36299:case 36307:return jw;case 35680:case 36300:case 36308:case 36293:return tT;case 36289:case 36303:case 36311:case 36292:return eT}}class iT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=kw(e.type)}}class sT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=nT(e.type)}}class rT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function tp(n,t){n.seq.push(t),n.map[t.id]=t}function oT(n,t,e){const i=n.name,s=i.length;for(yl.lastIndex=0;;){const r=yl.exec(i),o=yl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){tp(e,l===void 0?new iT(a,n,t):new sT(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new rT(a),tp(e,h)),e=h}}}class Ga{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);oT(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function ep(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const aT=37297;let cT=0;function lT(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const np=new Kt;function uT(n){ie._getMatrix(np,ie.workingColorSpace,n);const t=`mat3( ${np.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(n)){case sc:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ip(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+lT(n.getShaderSource(t),a)}else return r}function hT(n,t){const e=uT(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const fT={[Th]:"Linear",[Eh]:"Reinhard",[Ah]:"Cineon",[gc]:"ACESFilmic",[Ch]:"AgX",[Ph]:"Neutral",[Rh]:"Custom"};function dT(n,t){const e=fT[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xa=new L;function pT(){ie.getLuminanceCoefficients(xa);const n=xa.x.toFixed(4),t=xa.y.toFixed(4),e=xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function gT(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function vT(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function $r(n){return n!==""}function sp(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rp(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const xT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zu(n){return n.replace(xT,MT)}const _T=new Map;function MT(n,t){let e=qt[t];if(e===void 0){const i=_T.get(t);if(i!==void 0)e=qt[i],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Zu(e)}const yT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function op(n){return n.replace(yT,bT)}function bT(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ap(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const ST={[ka]:"SHADOWMAP_TYPE_PCF",[Gr]:"SHADOWMAP_TYPE_VSM"};function wT(n){return ST[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const TT={[Ms]:"ENVMAP_TYPE_CUBE",[rr]:"ENVMAP_TYPE_CUBE",[vc]:"ENVMAP_TYPE_CUBE_UV"};function ET(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":TT[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const AT={[rr]:"ENVMAP_MODE_REFRACTION"};function RT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":AT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const CT={[wh]:"ENVMAP_BLENDING_MULTIPLY",[B_]:"ENVMAP_BLENDING_MIX",[z_]:"ENVMAP_BLENDING_ADD"};function PT(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":CT[n.combine]||"ENVMAP_BLENDING_NONE"}function LT(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function NT(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=wT(e),l=ET(e),u=RT(e),h=PT(e),f=LT(e),d=mT(e),p=gT(r),v=s.createProgram();let g,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter($r).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter($r).join(`
`),m.length>0&&(m+=`
`)):(g=[ap(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),m=[ap(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?qt.tonemapping_pars_fragment:"",e.toneMapping!==li?dT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,hT("linearToOutputTexel",e.outputColorSpace),pT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($r).join(`
`)),o=Zu(o),o=sp(o,e),o=rp(o,e),a=Zu(a),a=sp(a,e),a=rp(a,e),o=op(o),a=op(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Qf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=_+g+o,x=_+m+a,y=ep(s,s.VERTEX_SHADER,M),b=ep(s,s.FRAGMENT_SHADER,x);s.attachShader(v,y),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(A){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(v)||"",I=s.getShaderInfoLog(y)||"",N=s.getShaderInfoLog(b)||"",U=P.trim(),z=I.trim(),V=N.trim();let J=!0,B=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,y,b);else{const K=ip(s,y,"vertex"),j=ip(s,b,"fragment");Wt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+K+`
`+j)}else U!==""?Dt("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(B=!1);B&&(A.diagnostics={runnable:J,programLog:U,vertexShader:{log:z,prefix:g},fragmentShader:{log:V,prefix:m}})}s.deleteShader(y),s.deleteShader(b),S=new Ga(s,v),T=vT(s,v)}let S;this.getUniforms=function(){return S===void 0&&w(this),S};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,aT)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cT++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=y,this.fragmentShader=b,this}let IT=0;class DT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new UT(t),e.set(t,i)),i}}class UT{constructor(t){this.id=IT++,this.code=t,this.usedTimes=0}}function kT(n){return n===ys||n===ec||n===nc}function FT(n,t,e,i,s,r){const o=new D0,a=new DT,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function v(S,T,R,A,P,I){const N=A.fog,U=P.geometry,z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?A.environment:null,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,J=t.get(S.envMap||z,V),B=J&&J.mapping===vc?J.image.height:null,K=d[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Dt("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const j=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Mt=j!==void 0?j.length:0;let gt=0;U.morphAttributes.position!==void 0&&(gt=1),U.morphAttributes.normal!==void 0&&(gt=2),U.morphAttributes.color!==void 0&&(gt=3);let At,Bt,Ht,X;if(K){const we=si[K];At=we.vertexShader,Bt=we.fragmentShader}else{At=S.vertexShader,Bt=S.fragmentShader;const we=a.getVertexShaderStage(S),fe=a.getFragmentShaderStage(S);a.update(S,we,fe),Ht=we.id,X=fe.id}const Y=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Pt=P.isInstancedMesh===!0,it=P.isBatchedMesh===!0,Xt=!!S.map,Pe=!!S.matcap,rt=!!J,Gt=!!S.aoMap,he=!!S.lightMap,ne=!!S.bumpMap&&S.wireframe===!1,be=!!S.normalMap,Ue=!!S.displacementMap,Ze=!!S.emissiveMap,Ae=!!S.metalnessMap,Le=!!S.roughnessMap,F=S.anisotropy>0,sn=S.clearcoat>0,ge=S.dispersion>0,D=S.retroreflectivity>0,E=S.iridescence>0,H=S.sheen>0,$=S.transmission>0,Z=F&&!!S.anisotropyMap,at=sn&&!!S.clearcoatMap,ht=sn&&!!S.clearcoatNormalMap,Q=sn&&!!S.clearcoatRoughnessMap,et=E&&!!S.iridescenceMap,ft=E&&!!S.iridescenceThicknessMap,Ut=H&&!!S.sheenColorMap,vt=H&&!!S.sheenRoughnessMap,dt=!!S.specularMap,kt=!!S.specularColorMap,zt=!!S.specularIntensityMap,Zt=$&&!!S.transmissionMap,O=$&&!!S.thicknessMap,pt=!!S.gradientMap,tt=!!S.alphaMap,mt=S.alphaTest>0,bt=!!S.alphaHash,nt=!!S.extensions;let Ft=li;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ft=n.toneMapping);const Lt={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:At,fragmentShader:Bt,defines:S.defines,customVertexShaderID:Ht,customFragmentShaderID:X,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:it,batchingColor:it&&P._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&P.instanceColor!==null,instancingMorph:Pt&&P.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:Pe,envMap:rt,envMapMode:rt&&J.mapping,envMapCubeUVHeight:B,aoMap:Gt,lightMap:he,bumpMap:ne,normalMap:be,displacementMap:Ue,emissiveMap:Ze,normalMapObjectSpace:be&&S.normalMapType===X_,normalMapTangentSpace:be&&S.normalMapType===ic,packedNormalMap:be&&S.normalMapType===ic&&kT(S.normalMap.format),metalnessMap:Ae,roughnessMap:Le,anisotropy:F,anisotropyMap:Z,clearcoat:sn,clearcoatMap:at,clearcoatNormalMap:ht,clearcoatRoughnessMap:Q,dispersion:ge,retroreflection:D,iridescence:E,iridescenceMap:et,iridescenceThicknessMap:ft,sheen:H,sheenColorMap:Ut,sheenRoughnessMap:vt,specularMap:dt,specularColorMap:kt,specularIntensityMap:zt,transmission:$,transmissionMap:Zt,thicknessMap:O,gradientMap:pt,opaque:S.transparent===!1&&S.blending===jr&&S.alphaToCoverage===!1,alphaMap:tt,alphaTest:mt,alphaHash:bt,combine:S.combine,mapUv:Xt&&p(S.map.channel),aoMapUv:Gt&&p(S.aoMap.channel),lightMapUv:he&&p(S.lightMap.channel),bumpMapUv:ne&&p(S.bumpMap.channel),normalMapUv:be&&p(S.normalMap.channel),displacementMapUv:Ue&&p(S.displacementMap.channel),emissiveMapUv:Ze&&p(S.emissiveMap.channel),metalnessMapUv:Ae&&p(S.metalnessMap.channel),roughnessMapUv:Le&&p(S.roughnessMap.channel),anisotropyMapUv:Z&&p(S.anisotropyMap.channel),clearcoatMapUv:at&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:vt&&p(S.sheenRoughnessMap.channel),specularMapUv:dt&&p(S.specularMap.channel),specularColorMapUv:kt&&p(S.specularColorMap.channel),specularIntensityMapUv:zt&&p(S.specularIntensityMap.channel),transmissionMapUv:Zt&&p(S.transmissionMap.channel),thicknessMapUv:O&&p(S.thicknessMap.channel),alphaMapUv:tt&&p(S.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(be||F),vertexNormals:!!U.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!U.attributes.uv&&(Xt||tt),fog:!!N,useFog:S.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||U.attributes.normal===void 0&&be===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:yt,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:gt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&ie.getTransfer(S.map.colorSpace)===pe,decodeVideoTextureEmissive:Ze&&S.emissiveMap.isVideoTexture===!0&&ie.getTransfer(S.emissiveMap.colorSpace)===pe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ee,flipSided:S.side===en,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:nt&&S.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&S.extensions.multiDraw===!0||it)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function g(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)T.push(R),T.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(m(T,S),_(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function m(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numSunLights),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numSunLightShadows),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function _(S,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),S.push(o.mask)}function M(S){const T=d[S.type];let R;if(T){const A=si[T];R=_n.clone(A.uniforms)}else R=S.uniforms;return R}function x(S,T){let R=u.get(T);return R!==void 0?++R.usedTimes:(R=new NT(n,T,S,s),l.push(R),u.set(T,R)),R}function y(S){if(--S.usedTimes===0){const T=l.indexOf(S);l[T]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function b(S){a.remove(S)}function w(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:M,acquireProgram:x,releaseProgram:y,releaseShaderCache:b,programs:l,dispose:w}}function OT(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function BT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function cp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function lp(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,v,g,m){let _=n[t];return _===void 0?(_={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:g,group:m},n[t]=_):(_.id=f.id,_.object=f,_.geometry=d,_.material=p,_.materialVariant=o(f),_.groupOrder=v,_.renderOrder=f.renderOrder,_.z=g,_.group=m),t++,_}function c(f,d,p,v,g,m,_){_.reversedDepth===!0&&(g=-g);const M=a(f,d,p,v,g,m);p.transmission>0?i.push(M):p.transparent===!0?s.push(M):e.push(M)}function l(f,d,p,v,g,m){const _=a(f,d,p,v,g,m);p.transmission>0?i.unshift(_):p.transparent===!0?s.unshift(_):e.unshift(_)}function u(f,d){e.length>1&&e.sort(f||BT),i.length>1&&i.sort(d||cp),s.length>1&&s.sort(d||cp)}function h(){for(let f=t,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:h,sort:u}}function zT(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new lp,n.set(i,[o])):s>=r.length?(o=new lp,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function HT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new ct};break;case"SpotLight":e={position:new L,direction:new L,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new L,halfWidth:new L,halfHeight:new L};break}return n[t.id]=e,e}}}function VT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let GT=0;function WT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function XT(n){const t=new HT,e=VT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const s=new L,r=new Ot,o=new Ot;function a(l){let u=0,h=0,f=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,_=0,M=0,x=0,y=0,b=0,w=0,S=0,T=0,R=0;l.sort(WT);for(let P=0,I=l.length;P<I;P++){const N=l[P],U=N.color,z=N.intensity,V=N.distance;let J=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ys?J=N.shadow.map.texture:J=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=U.r*z,h+=U.g*z,f+=U.b*z;else if(N.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(N.sh.coefficients[B],z);R++}else if(N.isSunLight){const B=t.get(N);if(B.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const K=N.shadow,j=e.get(N);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),i.sunShadow[p]=j,i.sunShadowMap[p]=J;const Mt=K.getViewportCount();for(let gt=0;gt<Mt;gt++)i.sunShadowMatrix[v+gt]=K.getMatrix(gt),i.sunShadowCascade[v+gt]=K._cascadeData[gt];v+=Mt,p++}i.sun[d]=B,d++}else if(N.isDirectionalLight){const B=t.get(N);if(B.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const K=N.shadow,j=e.get(N);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=J,i.directionalShadowMatrix[g]=N.shadow.matrix,y++}i.directional[g]=B,g++}else if(N.isSpotLight){const B=t.get(N);B.position.setFromMatrixPosition(N.matrixWorld),B.color.copy(U).multiplyScalar(z),B.distance=V,B.coneCos=Math.cos(N.angle),B.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),B.decay=N.decay,i.spot[_]=B;const K=N.shadow;if(N.map&&(i.spotLightMap[S]=N.map,S++,K.updateMatrices(N),N.castShadow&&T++),i.spotLightMatrix[_]=K.matrix,N.castShadow){const j=e.get(N);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,i.spotShadow[_]=j,i.spotShadowMap[_]=J,w++}_++}else if(N.isRectAreaLight){const B=t.get(N);B.color.copy(U).multiplyScalar(z),B.halfWidth.set(N.width*.5,0,0),B.halfHeight.set(0,N.height*.5,0),i.rectArea[M]=B,M++}else if(N.isPointLight){const B=t.get(N);if(B.color.copy(N.color).multiplyScalar(N.intensity),B.distance=N.distance,B.decay=N.decay,N.castShadow){const K=N.shadow,j=e.get(N);j.shadowIntensity=K.intensity,j.shadowBias=K.bias,j.shadowNormalBias=K.normalBias,j.shadowRadius=K.radius,j.shadowMapSize=K.mapSize,j.shadowCameraNear=K.camera.near,j.shadowCameraFar=K.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=J,i.pointShadowMatrix[m]=N.shadow.matrix,b++}i.point[m]=B,m++}else if(N.isHemisphereLight){const B=t.get(N);B.skyColor.copy(N.color).multiplyScalar(z),B.groundColor.copy(N.groundColor).multiplyScalar(z),i.hemi[x]=B,x++}}M>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const A=i.hash;(A.sunLength!==d||A.directionalLength!==g||A.pointLength!==m||A.spotLength!==_||A.rectAreaLength!==M||A.hemiLength!==x||A.numSunShadows!==p||A.numDirectionalShadows!==y||A.numPointShadows!==b||A.numSpotShadows!==w||A.numSpotMaps!==S||A.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=g,i.spot.length=_,i.rectArea.length=M,i.point.length=m,i.hemi.length=x,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.directionalShadowMatrix.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+S-T,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,A.sunLength=d,A.directionalLength=g,A.pointLength=m,A.spotLength=_,A.rectAreaLength=M,A.hemiLength=x,A.numSunShadows=p,A.numDirectionalShadows=y,A.numPointShadows=b,A.numSpotShadows=w,A.numSpotMaps=S,A.numLightProbes=R,i.version=GT++)}function c(l,u){let h=0,f=0,d=0,p=0,v=0,g=0;const m=u.matrixWorldInverse;for(let _=0,M=l.length;_<M;_++){const x=l[_];if(x.isSunLight){const y=i.sun[h];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),h++}else if(x.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const y=i.rectArea[v];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:i}}function up(n){const t=new XT(n),e=[],i=[],s=[];function r(f){h.camera=f,e.length=0,i.length=0,s.length=0}function o(f){e.push(f)}function a(f){i.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function $T(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new up(n),t.set(s,[a])):r>=o.length?(a=new up(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const qT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KT=`uniform sampler2D shadow_pass;
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
}`,YT=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],ZT=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],hp=new Ot,Lr=new L,bl=new L;function JT(n,t,e){let i=new Io;const s=new ot,r=new ot,o=new me,a=new R1,c=new C1,l={},u=e.maxTextureSize,h={[Ni]:en,[en]:Ni,[Ee]:Ee},f=new oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:qT,fragmentShader:KT}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Yt;p.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $t(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ka;let m=this.type;this.render=function(b,w,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===M_&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ka);const T=n.getRenderTarget(),R=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),P=n.state;P.setBlending(ci),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=m!==this.type;I&&w.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(U=>U.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,U=b.length;N<U;N++){const z=b[N],V=z.shadow;if(V===void 0){Dt("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const J=V.getFrameExtents();s.multiply(J),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/J.x),s.x=r.x*J.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/J.y),s.y=r.y*J.y,V.mapSize.y=r.y));const B=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=B,V.map===null||I===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Gr){if(z.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new dn(s.x,s.y,{format:ys,type:gn,minFilter:$e,magFilter:$e,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new xo(s.x,s.y,Pn),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=Ii,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xe,V.map.depthTexture.magFilter=Xe}else z.isPointLight?(V.map=new ug(s.x),V.map.depthTexture=new KM(s.x,hi)):(V.map=new dn(s.x,s.y),V.map.depthTexture=new xo(s.x,s.y,hi)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=Ii,this.type===ka?(V.map.depthTexture.compareFunction=B?Bh:Oh,V.map.depthTexture.minFilter=$e,V.map.depthTexture.magFilter=$e):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xe,V.map.depthTexture.magFilter=Xe);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);const K=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,S);for(let j=0;j<K;j++){const Mt=V.getCamera(j);if(z.isPointLight){const gt=V.camera,At=V.matrix,Bt=z.distance||gt.far;Bt!==gt.far&&(gt.far=Bt,gt.updateProjectionMatrix()),Lr.setFromMatrixPosition(z.matrixWorld),gt.position.copy(Lr),bl.copy(gt.position),bl.add(YT[j]),gt.up.copy(ZT[j]),gt.lookAt(bl),gt.updateMatrixWorld(),At.makeTranslation(-Lr.x,-Lr.y,-Lr.z),hp.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(hp,gt.coordinateSystem,gt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,j),n.clear();else{j===0&&(n.setRenderTarget(V.map),n.clear());const gt=V.getViewport(j);o.set(r.x*gt.x,r.y*gt.y,r.x*gt.z,r.y*gt.w),P.viewport(o)}i=V.getFrustum(j),x(w,S,Mt,z,this.type)}V.isPointLightShadow!==!0&&this.type===Gr&&_(V,S),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,R,A)};function _(b,w){const S=t.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new dn(s.x,s.y,{format:ys,type:gn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,S,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,S,d,v,null)}function M(b,w,S,T){let R=null;const A=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)R=A;else if(R=S.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=R.uuid,I=w.uuid;let N=l[P];N===void 0&&(N={},l[P]=N);let U=N[I];U===void 0&&(U=R.clone(),N[I]=U,w.addEventListener("dispose",y)),R=U}if(R.visible=w.visible,R.wireframe=w.wireframe,T===Gr?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:h[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const P=n.properties.get(R);P.light=S}return R}function x(b,w,S,T,R){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Gr)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);const I=t.update(b),N=b.material;if(Array.isArray(N)){const U=I.groups;for(let z=0,V=U.length;z<V;z++){const J=U[z],B=N[J.materialIndex];if(B&&B.visible){const K=M(b,B,T,R);b.onBeforeShadow(n,b,w,S,I,K,J),n.renderBufferDirect(S,null,I,K,b,J),b.onAfterShadow(n,b,w,S,I,K,J)}}}else if(N.visible){const U=M(b,N,T,R);b.onBeforeShadow(n,b,w,S,I,U,null),n.renderBufferDirect(S,null,I,U,b,null),b.onAfterShadow(n,b,w,S,I,U,null)}}const P=b.children;for(let I=0,N=P.length;I<N;I++)x(P[I],w,S,T,R)}function y(b){b.target.removeEventListener("dispose",y);for(const S in l){const T=l[S],R=b.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function QT(n,t){function e(){let O=!1;const pt=new me;let tt=null;const mt=new me(0,0,0,0);return{setMask:function(bt){tt!==bt&&!O&&(n.colorMask(bt,bt,bt,bt),tt=bt)},setLocked:function(bt){O=bt},setClear:function(bt,nt,Ft,Lt,we){we===!0&&(bt*=Lt,nt*=Lt,Ft*=Lt),pt.set(bt,nt,Ft,Lt),mt.equals(pt)===!1&&(n.clearColor(bt,nt,Ft,Lt),mt.copy(pt))},reset:function(){O=!1,tt=null,mt.set(-1,0,0,0)}}}function i(){let O=!1,pt=!1,tt=null,mt=null,bt=null;return{setReversed:function(nt){if(pt!==nt){const Ft=t.get("EXT_clip_control");nt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT),pt=nt;const Lt=bt;bt=null,this.setClear(Lt)}},getReversed:function(){return pt},setTest:function(nt){nt?Y(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(nt){tt!==nt&&!O&&(n.depthMask(nt),tt=nt)},setFunc:function(nt){if(pt&&(nt=iM[nt]),mt!==nt){switch(nt){case au:n.depthFunc(n.NEVER);break;case cu:n.depthFunc(n.ALWAYS);break;case lu:n.depthFunc(n.LESS);break;case lo:n.depthFunc(n.LEQUAL);break;case uu:n.depthFunc(n.EQUAL);break;case hu:n.depthFunc(n.GEQUAL);break;case fu:n.depthFunc(n.GREATER);break;case du:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}mt=nt}},setLocked:function(nt){O=nt},setClear:function(nt){bt!==nt&&(bt=nt,pt&&(nt=1-nt),n.clearDepth(nt))},reset:function(){O=!1,tt=null,mt=null,bt=null,pt=!1}}}function s(){let O=!1,pt=null,tt=null,mt=null,bt=null,nt=null,Ft=null,Lt=null,we=null;return{setTest:function(fe){O||(fe?Y(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(fe){pt!==fe&&!O&&(n.stencilMask(fe),pt=fe)},setFunc:function(fe,kn,Qn){(tt!==fe||mt!==kn||bt!==Qn)&&(n.stencilFunc(fe,kn,Qn),tt=fe,mt=kn,bt=Qn)},setOp:function(fe,kn,Qn){(nt!==fe||Ft!==kn||Lt!==Qn)&&(n.stencilOp(fe,kn,Qn),nt=fe,Ft=kn,Lt=Qn)},setLocked:function(fe){O=fe},setClear:function(fe){we!==fe&&(n.clearStencil(fe),we=fe)},reset:function(){O=!1,pt=null,tt=null,mt=null,bt=null,nt=null,Ft=null,Lt=null,we=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},f={},d=new WeakMap,p=[],v=null,g=!1,m=null,_=null,M=null,x=null,y=null,b=null,w=null,S=new ct(0,0,0),T=0,R=!1,A=null,P=null,I=null,N=null,U=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(B)[1]),V=J>=1):B.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),V=J>=2);let K=null,j={};const Mt=n.getParameter(n.SCISSOR_BOX),gt=n.getParameter(n.VIEWPORT),At=new me().fromArray(Mt),Bt=new me().fromArray(gt);function Ht(O,pt,tt,mt){const bt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(O,nt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ft=0;Ft<tt;Ft++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,mt,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(pt+Ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return nt}const X={};X[n.TEXTURE_2D]=Ht(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=Ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=Ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=Ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(n.DEPTH_TEST),o.setFunc(lo),ne(!1),be(Gf),Y(n.CULL_FACE),Gt(ci);function Y(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function yt(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function Pt(O,pt){return f[O]!==pt?(n.bindFramebuffer(O,pt),f[O]=pt,O===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pt),O===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function it(O,pt){let tt=p,mt=!1;if(O){tt=d.get(pt),tt===void 0&&(tt=[],d.set(pt,tt));const bt=O.textures;if(tt.length!==bt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,Ft=bt.length;nt<Ft;nt++)tt[nt]=n.COLOR_ATTACHMENT0+nt;tt.length=bt.length,mt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,mt=!0);mt&&n.drawBuffers(tt)}function Xt(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const Pe={[qs]:n.FUNC_ADD,[b_]:n.FUNC_SUBTRACT,[S_]:n.FUNC_REVERSE_SUBTRACT};Pe[w_]=n.MIN,Pe[T_]=n.MAX;const rt={[E_]:n.ZERO,[A_]:n.ONE,[R_]:n.SRC_COLOR,[M0]:n.SRC_ALPHA,[D_]:n.SRC_ALPHA_SATURATE,[N_]:n.DST_COLOR,[P_]:n.DST_ALPHA,[C_]:n.ONE_MINUS_SRC_COLOR,[y0]:n.ONE_MINUS_SRC_ALPHA,[I_]:n.ONE_MINUS_DST_COLOR,[L_]:n.ONE_MINUS_DST_ALPHA,[U_]:n.CONSTANT_COLOR,[k_]:n.ONE_MINUS_CONSTANT_COLOR,[F_]:n.CONSTANT_ALPHA,[O_]:n.ONE_MINUS_CONSTANT_ALPHA};function Gt(O,pt,tt,mt,bt,nt,Ft,Lt,we,fe){if(O===ci){g===!0&&(yt(n.BLEND),g=!1);return}if(g===!1&&(Y(n.BLEND),g=!0),O!==y_){if(O!==m||fe!==R){if((_!==qs||y!==qs)&&(n.blendEquation(n.FUNC_ADD),_=qs,y=qs),fe)switch(O){case jr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xn:n.blendFunc(n.ONE,n.ONE);break;case Wf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Xf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Wt("WebGLState: Invalid blending: ",O);break}else switch(O){case jr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Wf:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xf:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",O);break}M=null,x=null,b=null,w=null,S.set(0,0,0),T=0,m=O,R=fe}return}bt=bt||pt,nt=nt||tt,Ft=Ft||mt,(pt!==_||bt!==y)&&(n.blendEquationSeparate(Pe[pt],Pe[bt]),_=pt,y=bt),(tt!==M||mt!==x||nt!==b||Ft!==w)&&(n.blendFuncSeparate(rt[tt],rt[mt],rt[nt],rt[Ft]),M=tt,x=mt,b=nt,w=Ft),(Lt.equals(S)===!1||we!==T)&&(n.blendColor(Lt.r,Lt.g,Lt.b,we),S.copy(Lt),T=we),m=O,R=!1}function he(O,pt){O.side===Ee?yt(n.CULL_FACE):Y(n.CULL_FACE);let tt=O.side===en;pt&&(tt=!tt),ne(tt),O.blending===jr&&O.transparent===!1?Gt(ci):Gt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const mt=O.stencilWrite;a.setTest(mt),mt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ze(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ne(O){A!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),A=O)}function be(O){O!==x_?(Y(n.CULL_FACE),O!==P&&(O===Gf?n.cullFace(n.BACK):O===__?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),P=O}function Ue(O){O!==I&&(V&&n.lineWidth(O),I=O)}function Ze(O,pt,tt){O?(Y(n.POLYGON_OFFSET_FILL),(N!==pt||U!==tt)&&(N=pt,U=tt,o.getReversed()&&(pt=-pt),n.polygonOffset(pt,tt))):yt(n.POLYGON_OFFSET_FILL)}function Ae(O){O?Y(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Le(O){O===void 0&&(O=n.TEXTURE0+z-1),K!==O&&(n.activeTexture(O),K=O)}function F(O,pt,tt){tt===void 0&&(K===null?tt=n.TEXTURE0+z-1:tt=K);let mt=j[tt];mt===void 0&&(mt={type:void 0,texture:void 0},j[tt]=mt),(mt.type!==O||mt.texture!==pt)&&(K!==tt&&(n.activeTexture(tt),K=tt),n.bindTexture(O,pt||X[O]),mt.type=O,mt.texture=pt)}function sn(){const O=j[K];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(O){Wt("WebGLState:",O)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(O){Wt("WebGLState:",O)}}function E(){try{n.texSubImage2D(...arguments)}catch(O){Wt("WebGLState:",O)}}function H(){try{n.texSubImage3D(...arguments)}catch(O){Wt("WebGLState:",O)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(O){Wt("WebGLState:",O)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(O){Wt("WebGLState:",O)}}function at(){try{n.texStorage2D(...arguments)}catch(O){Wt("WebGLState:",O)}}function ht(){try{n.texStorage3D(...arguments)}catch(O){Wt("WebGLState:",O)}}function Q(){try{n.texImage2D(...arguments)}catch(O){Wt("WebGLState:",O)}}function et(){try{n.texImage3D(...arguments)}catch(O){Wt("WebGLState:",O)}}function ft(O){return h[O]!==void 0?h[O]:n.getParameter(O)}function Ut(O,pt){h[O]!==pt&&(n.pixelStorei(O,pt),h[O]=pt)}function vt(O){At.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),At.copy(O))}function dt(O){Bt.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),Bt.copy(O))}function kt(O,pt){let tt=l.get(pt);tt===void 0&&(tt=new WeakMap,l.set(pt,tt));let mt=tt.get(O);mt===void 0&&(mt=n.getUniformBlockIndex(pt,O.name),tt.set(O,mt))}function zt(O,pt){const mt=l.get(pt).get(O);c.get(pt)!==mt&&(n.uniformBlockBinding(pt,mt,O.__bindingPointIndex),c.set(pt,mt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},K=null,j={},f={},d=new WeakMap,p=[],v=null,g=!1,m=null,_=null,M=null,x=null,y=null,b=null,w=null,S=new ct(0,0,0),T=0,R=!1,A=null,P=null,I=null,N=null,U=null,At.set(0,0,n.canvas.width,n.canvas.height),Bt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:yt,bindFramebuffer:Pt,drawBuffers:it,useProgram:Xt,setBlending:Gt,setMaterial:he,setFlipSided:ne,setCullFace:be,setLineWidth:Ue,setPolygonOffset:Ze,setScissorTest:Ae,activeTexture:Le,bindTexture:F,unbindTexture:sn,compressedTexImage2D:ge,compressedTexImage3D:D,texImage2D:Q,texImage3D:et,pixelStorei:Ut,getParameter:ft,updateUBOMapping:kt,uniformBlockBinding:zt,texStorage2D:at,texStorage3D:ht,texSubImage2D:E,texSubImage3D:H,compressedTexSubImage2D:$,compressedTexSubImage3D:Z,scissor:vt,viewport:dt,reset:Zt}}function jT(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(D,E){return p?new OffscreenCanvas(D,E):go("canvas")}function g(D,E,H){let $=1;const Z=ge(D);if((Z.width>H||Z.height>H)&&($=H/Math.max(Z.width,Z.height)),$<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const at=Math.floor($*Z.width),ht=Math.floor($*Z.height);f===void 0&&(f=v(at,ht));const Q=E?v(at,ht):f;return Q.width=at,Q.height=ht,Q.getContext("2d").drawImage(D,0,0,at,ht),Dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+at+"x"+ht+")."),Q}else return"data"in D&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),D;return D}function m(D){return D.generateMipmaps}function _(D){n.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(D,E,H,$,Z,at=!1){if(D!==null){if(n[D]!==void 0)return n[D];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ht;$&&(ht=t.get("EXT_texture_norm16"),ht||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===n.RED&&(H===n.FLOAT&&(Q=n.R32F),H===n.HALF_FLOAT&&(Q=n.R16F),H===n.UNSIGNED_BYTE&&(Q=n.R8),H===n.UNSIGNED_SHORT&&ht&&(Q=ht.R16_EXT),H===n.SHORT&&ht&&(Q=ht.R16_SNORM_EXT)),E===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.R8UI),H===n.UNSIGNED_SHORT&&(Q=n.R16UI),H===n.UNSIGNED_INT&&(Q=n.R32UI),H===n.BYTE&&(Q=n.R8I),H===n.SHORT&&(Q=n.R16I),H===n.INT&&(Q=n.R32I)),E===n.RG&&(H===n.FLOAT&&(Q=n.RG32F),H===n.HALF_FLOAT&&(Q=n.RG16F),H===n.UNSIGNED_BYTE&&(Q=n.RG8),H===n.UNSIGNED_SHORT&&ht&&(Q=ht.RG16_EXT),H===n.SHORT&&ht&&(Q=ht.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RG8UI),H===n.UNSIGNED_SHORT&&(Q=n.RG16UI),H===n.UNSIGNED_INT&&(Q=n.RG32UI),H===n.BYTE&&(Q=n.RG8I),H===n.SHORT&&(Q=n.RG16I),H===n.INT&&(Q=n.RG32I)),E===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),H===n.UNSIGNED_INT&&(Q=n.RGB32UI),H===n.BYTE&&(Q=n.RGB8I),H===n.SHORT&&(Q=n.RGB16I),H===n.INT&&(Q=n.RGB32I)),E===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),H===n.UNSIGNED_INT&&(Q=n.RGBA32UI),H===n.BYTE&&(Q=n.RGBA8I),H===n.SHORT&&(Q=n.RGBA16I),H===n.INT&&(Q=n.RGBA32I)),E===n.RGB&&(H===n.UNSIGNED_SHORT&&ht&&(Q=ht.RGB16_EXT),H===n.SHORT&&ht&&(Q=ht.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),E===n.RGBA){const et=at?sc:ie.getTransfer(Z);H===n.FLOAT&&(Q=n.RGBA32F),H===n.HALF_FLOAT&&(Q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Q=et===pe?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&ht&&(Q=ht.RGBA16_EXT),H===n.SHORT&&ht&&(Q=ht.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function y(D,E){let H;return D?E===null||E===hi||E===ho?H=n.DEPTH24_STENCIL8:E===Pn?H=n.DEPTH32F_STENCIL8:E===uo&&(H=n.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===hi||E===ho?H=n.DEPTH_COMPONENT24:E===Pn?H=n.DEPTH_COMPONENT32F:E===uo&&(H=n.DEPTH_COMPONENT16),H}function b(D,E){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Xe&&D.minFilter!==$e?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function w(D){const E=D.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&h.delete(E)}function S(D){const E=D.target;E.removeEventListener("dispose",S),A(E)}function T(D){const E=i.get(D);if(E.__webglInit===void 0)return;const H=D.source,$=d.get(H);if($){const Z=$[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(D),Object.keys($).length===0&&d.delete(H)}i.remove(D)}function R(D){const E=i.get(D);n.deleteTexture(E.__webglTexture);const H=D.source,$=d.get(H);delete $[E.__cacheKey],o.memory.textures--}function A(D){const E=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(E.__webglFramebuffer[$]))for(let Z=0;Z<E.__webglFramebuffer[$].length;Z++)n.deleteFramebuffer(E.__webglFramebuffer[$][Z]);else n.deleteFramebuffer(E.__webglFramebuffer[$]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[$])}else{if(Array.isArray(E.__webglFramebuffer))for(let $=0;$<E.__webglFramebuffer.length;$++)n.deleteFramebuffer(E.__webglFramebuffer[$]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let $=0;$<E.__webglColorRenderbuffer.length;$++)E.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[$]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const H=D.textures;for(let $=0,Z=H.length;$<Z;$++){const at=i.get(H[$]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(H[$])}i.remove(D)}let P=0;function I(){P=0}function N(){return P}function U(D){P=D}function z(){const D=P;return D>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function V(D){const E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function J(D,E){const H=i.get(D);if(D.isVideoTexture&&F(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&H.__version!==D.version){const $=D.image;if($===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(H,D,E);return}}else D.isExternalTexture&&(H.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+E)}function B(D,E){const H=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){yt(H,D,E);return}else D.isExternalTexture&&(H.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+E)}function K(D,E){const H=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){yt(H,D,E);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+E)}function j(D,E){const H=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&H.__version!==D.version){Pt(H,D,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+E)}const Mt={[or]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[tc]:n.MIRRORED_REPEAT},gt={[Xe]:n.NEAREST,[S0]:n.NEAREST_MIPMAP_NEAREST,[Wr]:n.NEAREST_MIPMAP_LINEAR,[$e]:n.LINEAR,[Fa]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},At={[q_]:n.NEVER,[Q_]:n.ALWAYS,[K_]:n.LESS,[Oh]:n.LEQUAL,[Y_]:n.EQUAL,[Bh]:n.GEQUAL,[Z_]:n.GREATER,[J_]:n.NOTEQUAL};function Bt(D,E){if(E.type===Pn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===$e||E.magFilter===Fa||E.magFilter===Wr||E.magFilter===Ti||E.minFilter===$e||E.minFilter===Fa||E.minFilter===Wr||E.minFilter===Ti)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,Mt[E.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,Mt[E.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,Mt[E.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,gt[E.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,gt[E.minFilter]),E.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,At[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Xe||E.minFilter!==Wr&&E.minFilter!==Ti||E.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ht(D,E){let H=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",w));const $=E.source;let Z=d.get($);Z===void 0&&(Z={},d.set($,Z));const at=V(E);if(at!==D.__cacheKey){Z[at]===void 0&&(Z[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,H=!0),Z[at].usedTimes++;const ht=Z[D.__cacheKey];ht!==void 0&&(Z[D.__cacheKey].usedTimes--,ht.usedTimes===0&&R(E)),D.__cacheKey=at,D.__webglTexture=Z[at].texture}return H}function X(D,E,H){return Math.floor(Math.floor(D/H)/E)}function Y(D,E,H,$){const at=D.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,H,$,E.data);else{at.sort((Ut,vt)=>Ut.start-vt.start);let ht=0;for(let Ut=1;Ut<at.length;Ut++){const vt=at[ht],dt=at[Ut],kt=vt.start+vt.count,zt=X(dt.start,E.width,4),Zt=X(vt.start,E.width,4);dt.start<=kt+1&&zt===Zt&&X(dt.start+dt.count-1,E.width,4)===zt?vt.count=Math.max(vt.count,dt.start+dt.count-vt.start):(++ht,at[ht]=dt)}at.length=ht+1;const Q=e.getParameter(n.UNPACK_ROW_LENGTH),et=e.getParameter(n.UNPACK_SKIP_PIXELS),ft=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let Ut=0,vt=at.length;Ut<vt;Ut++){const dt=at[Ut],kt=Math.floor(dt.start/4),zt=Math.ceil(dt.count/4),Zt=kt%E.width,O=Math.floor(kt/E.width),pt=zt,tt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,Zt,O,pt,tt,H,$,E.data)}D.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,et),e.pixelStorei(n.UNPACK_SKIP_ROWS,ft)}}function yt(D,E,H){let $=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&($=n.TEXTURE_3D);const Z=Ht(D,E),at=E.source;e.bindTexture($,D.__webglTexture,n.TEXTURE0+H);const ht=i.get(at);if(at.version!==ht.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const tt=ie.getPrimaries(ie.workingColorSpace),mt=E.colorSpace===Ji?null:ie.getPrimaries(E.colorSpace),bt=E.colorSpace===Ji||tt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let et=g(E.image,!1,s.maxTextureSize);et=sn(E,et);const ft=r.convert(E.format,E.colorSpace),Ut=r.convert(E.type);let vt=x(E.internalFormat,ft,Ut,E.normalized,E.colorSpace,E.isVideoTexture);Bt($,E);let dt;const kt=E.mipmaps,zt=E.isVideoTexture!==!0,Zt=ht.__version===void 0||Z===!0,O=at.dataReady,pt=b(E,et);if(E.isDepthTexture)vt=y(E.format===ms,E.type),Zt&&(zt?e.texStorage2D(n.TEXTURE_2D,1,vt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,ft,Ut,null));else if(E.isDataTexture)if(kt.length>0){zt&&Zt&&e.texStorage2D(n.TEXTURE_2D,pt,vt,kt[0].width,kt[0].height);for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],zt?O&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,Ut,dt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,dt.width,dt.height,0,ft,Ut,dt.data);E.generateMipmaps=!1}else zt?(Zt&&e.texStorage2D(n.TEXTURE_2D,pt,vt,et.width,et.height),O&&Y(E,et,ft,Ut)):e.texImage2D(n.TEXTURE_2D,0,vt,et.width,et.height,0,ft,Ut,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){zt&&Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,vt,kt[0].width,kt[0].height,et.depth);for(let tt=0,mt=kt.length;tt<mt;tt++)if(dt=kt[tt],E.format!==Ln)if(ft!==null)if(zt){if(O)if(E.layerUpdates.size>0){const bt=Gd(dt.width,dt.height,E.format,E.type);for(const nt of E.layerUpdates){const Ft=dt.data.subarray(nt*bt/dt.data.BYTES_PER_ELEMENT,(nt+1)*bt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,nt,dt.width,dt.height,1,ft,Ft)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,et.depth,ft,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,vt,dt.width,dt.height,et.depth,0,dt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,et.depth,ft,Ut,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,vt,dt.width,dt.height,et.depth,0,ft,Ut,dt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{zt&&Zt&&e.texStorage2D(n.TEXTURE_2D,pt,vt,kt[0].width,kt[0].height);for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],E.format!==Ln?ft!==null?zt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,vt,dt.width,dt.height,0,dt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?O&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,Ut,dt.data):e.texImage2D(n.TEXTURE_2D,tt,vt,dt.width,dt.height,0,ft,Ut,dt.data)}else if(E.isDataArrayTexture)if(zt){if(Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,vt,et.width,et.height,et.depth),O)if(E.layerUpdates.size>0){const tt=Gd(et.width,et.height,E.format,E.type);for(const mt of E.layerUpdates){const bt=et.data.subarray(mt*tt/et.data.BYTES_PER_ELEMENT,(mt+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,mt,et.width,et.height,1,ft,Ut,bt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,Ut,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,vt,et.width,et.height,et.depth,0,ft,Ut,et.data);else if(E.isData3DTexture)zt?(Zt&&e.texStorage3D(n.TEXTURE_3D,pt,vt,et.width,et.height,et.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,Ut,et.data)):e.texImage3D(n.TEXTURE_3D,0,vt,et.width,et.height,et.depth,0,ft,Ut,et.data);else if(E.isFramebufferTexture){if(Zt)if(zt)e.texStorage2D(n.TEXTURE_2D,pt,vt,et.width,et.height);else{let tt=et.width,mt=et.height;for(let bt=0;bt<pt;bt++)e.texImage2D(n.TEXTURE_2D,bt,vt,tt,mt,0,ft,Ut,null),tt>>=1,mt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){const tt=n.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),et.parentNode!==tt){tt.appendChild(et),h.add(E),tt.onpaint=mt=>{const bt=mt.changedElements;for(const nt of h)bt.includes(nt.image)&&(nt.needsUpdate=!0)},tt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,et);else{const bt=n.RGBA,nt=n.RGBA,Ft=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,bt,nt,Ft,et)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(kt.length>0){if(zt&&Zt){const tt=ge(kt[0]);e.texStorage2D(n.TEXTURE_2D,pt,vt,tt.width,tt.height)}for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],zt?O&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ft,Ut,dt):e.texImage2D(n.TEXTURE_2D,tt,vt,ft,Ut,dt);E.generateMipmaps=!1}else if(zt){if(Zt){const tt=ge(et);e.texStorage2D(n.TEXTURE_2D,pt,vt,tt.width,tt.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Ut,et)}else e.texImage2D(n.TEXTURE_2D,0,vt,ft,Ut,et);m(E)&&_($),ht.__version=at.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function Pt(D,E,H){if(E.image.length!==6)return;const $=Ht(D,E),Z=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+H);const at=i.get(Z);if(Z.version!==at.__version||$===!0){e.activeTexture(n.TEXTURE0+H);const ht=ie.getPrimaries(ie.workingColorSpace),Q=E.colorSpace===Ji?null:ie.getPrimaries(E.colorSpace),et=E.colorSpace===Ji||ht===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const ft=E.isCompressedTexture||E.image[0].isCompressedTexture,Ut=E.image[0]&&E.image[0].isDataTexture,vt=[];for(let nt=0;nt<6;nt++)!ft&&!Ut?vt[nt]=g(E.image[nt],!0,s.maxCubemapSize):vt[nt]=Ut?E.image[nt].image:E.image[nt],vt[nt]=sn(E,vt[nt]);const dt=vt[0],kt=r.convert(E.format,E.colorSpace),zt=r.convert(E.type),Zt=x(E.internalFormat,kt,zt,E.normalized,E.colorSpace),O=E.isVideoTexture!==!0,pt=at.__version===void 0||$===!0,tt=Z.dataReady;let mt=b(E,dt);Bt(n.TEXTURE_CUBE_MAP,E);let bt;if(ft){O&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Zt,dt.width,dt.height);for(let nt=0;nt<6;nt++){bt=vt[nt].mipmaps;for(let Ft=0;Ft<bt.length;Ft++){const Lt=bt[Ft];E.format!==Ln?kt!==null?O?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft,0,0,Lt.width,Lt.height,kt,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft,Zt,Lt.width,Lt.height,0,Lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft,0,0,Lt.width,Lt.height,kt,zt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft,Zt,Lt.width,Lt.height,0,kt,zt,Lt.data)}}}else{if(bt=E.mipmaps,O&&pt){bt.length>0&&mt++;const nt=ge(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Zt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Ut){O?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,vt[nt].width,vt[nt].height,kt,zt,vt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,vt[nt].width,vt[nt].height,0,kt,zt,vt[nt].data);for(let Ft=0;Ft<bt.length;Ft++){const we=bt[Ft].image[nt].image;O?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft+1,0,0,we.width,we.height,kt,zt,we.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft+1,Zt,we.width,we.height,0,kt,zt,we.data)}}else{O?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,kt,zt,vt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,kt,zt,vt[nt]);for(let Ft=0;Ft<bt.length;Ft++){const Lt=bt[Ft];O?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft+1,0,0,kt,zt,Lt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ft+1,Zt,kt,zt,Lt.image[nt])}}}m(E)&&_(n.TEXTURE_CUBE_MAP),at.__version=Z.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function it(D,E,H,$,Z,at){const ht=r.convert(H.format,H.colorSpace),Q=r.convert(H.type),et=x(H.internalFormat,ht,Q,H.normalized,H.colorSpace),ft=i.get(E),Ut=i.get(H);if(Ut.__renderTarget=E,!ft.__hasExternalTextures){const vt=Math.max(1,E.width>>at),dt=Math.max(1,E.height>>at);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,at,et,vt,dt,E.depth,0,ht,Q,null):e.texImage2D(Z,at,et,vt,dt,0,ht,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Z,Ut.__webglTexture,0,Ae(E)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Z,Ut.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(D,E,H){if(n.bindRenderbuffer(n.RENDERBUFFER,D),E.depthBuffer){const $=E.depthTexture,Z=$&&$.isDepthTexture?$.type:null,at=y(E.stencilBuffer,Z),ht=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae(E),at,E.width,E.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae(E),at,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,at,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,D)}else{const $=E.textures;for(let Z=0;Z<$.length;Z++){const at=$[Z],ht=r.convert(at.format,at.colorSpace),Q=r.convert(at.type),et=x(at.internalFormat,ht,Q,at.normalized,at.colorSpace);Le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae(E),et,E.width,E.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae(E),et,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,et,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(D,E,H){const $=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(E.depthTexture);if(Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),$){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,E.depthTexture);const ft=r.convert(E.depthTexture.format),Ut=r.convert(E.depthTexture.type);let vt;E.depthTexture.format===Ii?vt=n.DEPTH_COMPONENT24:E.depthTexture.format===ms&&(vt=n.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,vt,E.width,E.height,0,ft,Ut,null)}}else J(E.depthTexture,0);const at=Z.__webglTexture,ht=Ae(E),Q=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,et=E.depthTexture.format===ms?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ii)Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Q,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Q,at,0);else if(E.depthTexture.format===ms)Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Q,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Q,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function rt(D){const E=i.get(D),H=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){const $=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),$){const Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,$.removeEventListener("dispose",Z)};$.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=$}if(D.depthTexture&&!E.__autoAllocateDepthBuffer)if(H)for(let $=0;$<6;$++)Pe(E.__webglFramebuffer[$],D,$);else{const $=D.texture.mipmaps;$&&$.length>0?Pe(E.__webglFramebuffer[0],D,0):Pe(E.__webglFramebuffer,D,0)}else if(H){E.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[$]),E.__webglDepthbuffer[$]===void 0)E.__webglDepthbuffer[$]=n.createRenderbuffer(),Xt(E.__webglDepthbuffer[$],D,!1);else{const Z=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}else{const $=D.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Xt(E.__webglDepthbuffer,D,!1);else{const Z=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(D,E,H){const $=i.get(D);E!==void 0&&it($.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&rt(D)}function he(D){const E=D.texture,H=i.get(D),$=i.get(E);D.addEventListener("dispose",S);const Z=D.textures,at=D.isWebGLCubeRenderTarget===!0,ht=Z.length>1;if(ht||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=E.version,o.memory.textures++),at){H.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[Q]=[];for(let et=0;et<E.mipmaps.length;et++)H.__webglFramebuffer[Q][et]=n.createFramebuffer()}else H.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)H.__webglFramebuffer[Q]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Q=0,et=Z.length;Q<et;Q++){const ft=i.get(Z[Q]);ft.__webglTexture===void 0&&(ft.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Le(D)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const et=Z[Q];H.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[Q]);const ft=r.convert(et.format,et.colorSpace),Ut=r.convert(et.type),vt=x(et.internalFormat,ft,Ut,et.normalized,et.colorSpace,D.isXRRenderTarget===!0),dt=Ae(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,vt,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,H.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),Xt(H.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(H.__webglFramebuffer[Q][et],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,et);else it(H.__webglFramebuffer[Q],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(E)&&_(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Q=0,et=Z.length;Q<et;Q++){const ft=Z[Q],Ut=i.get(ft);let vt=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(vt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(vt,Ut.__webglTexture),Bt(vt,ft),it(H.__webglFramebuffer,D,ft,n.COLOR_ATTACHMENT0+Q,vt,0),m(ft)&&_(vt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Q=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,$.__webglTexture),Bt(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)it(H.__webglFramebuffer[et],D,E,n.COLOR_ATTACHMENT0,Q,et);else it(H.__webglFramebuffer,D,E,n.COLOR_ATTACHMENT0,Q,0);m(E)&&_(Q),e.unbindTexture()}D.depthBuffer&&rt(D)}function ne(D){const E=D.textures;for(let H=0,$=E.length;H<$;H++){const Z=E[H];if(m(Z)){const at=M(D),ht=i.get(Z).__webglTexture;e.bindTexture(at,ht),_(at),e.unbindTexture()}}}const be=[],Ue=[];function Ze(D){if(D.samples>0){if(Le(D)===!1){const E=D.textures,H=D.width,$=D.height;let Z=n.COLOR_BUFFER_BIT;const at=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(D),Q=E.length>1;if(Q)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const et=D.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Ut=i.get(E[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ut,0)}n.blitFramebuffer(0,0,H,$,0,0,H,$,Z,n.NEAREST),c===!0&&(be.length=0,Ue.length=0,be.push(n.COLOR_ATTACHMENT0+ft),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(be.push(at),Ue.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ue)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Ut=i.get(E[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){const E=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Ae(D){return Math.min(s.maxSamples,D.samples)}function Le(D){const E=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function F(D){const E=o.render.frame;u.get(D)!==E&&(u.set(D,E),D.update())}function sn(D,E){const H=D.colorSpace,$=D.format,Z=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||H!==wn&&H!==Ji&&(ie.getTransfer(H)===pe?($!==Ln||Z!==Sn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",H)),E}function ge(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=I,this.getTextureUnits=N,this.setTextureUnits=U,this.setTexture2D=J,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=j,this.rebindTextures=Gt,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function t2(n,t){function e(i,s=Ji){let r;const o=ie.getTransfer(s);if(i===Sn)return n.UNSIGNED_BYTE;if(i===Nh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ih)return n.UNSIGNED_SHORT_5_5_5_1;if(i===E0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===A0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===w0)return n.BYTE;if(i===T0)return n.SHORT;if(i===uo)return n.UNSIGNED_SHORT;if(i===Lh)return n.INT;if(i===hi)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===gn)return n.HALF_FLOAT;if(i===R0)return n.ALPHA;if(i===C0)return n.RGB;if(i===Ln)return n.RGBA;if(i===Ii)return n.DEPTH_COMPONENT;if(i===ms)return n.DEPTH_STENCIL;if(i===Dh)return n.RED;if(i===Uh)return n.RED_INTEGER;if(i===ys)return n.RG;if(i===kh)return n.RG_INTEGER;if(i===Fh)return n.RGBA_INTEGER;if(i===Oa||i===Ba||i===za||i===Ha)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===pu||i===mu||i===gu||i===vu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===pu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===mu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===gu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xu||i===_u||i===Mu||i===yu||i===bu||i===ec||i===Su)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xu||i===_u)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Mu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===yu)return r.COMPRESSED_R11_EAC;if(i===bu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ec)return r.COMPRESSED_RG11_EAC;if(i===Su)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===wu||i===Tu||i===Eu||i===Au||i===Ru||i===Cu||i===Pu||i===Lu||i===Nu||i===Iu||i===Du||i===Uu||i===ku||i===Fu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===wu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Tu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Eu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Au)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ru)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Cu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Nu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Iu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Du)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ku)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ou||i===Bu||i===zu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ou)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Bu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hu||i===Vu||i===nc||i===Gu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Hu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Vu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ho?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const e2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n2=`
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

}`;class i2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new G0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new oe({vertexShader:e2,fragmentShader:n2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new Yn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class s2 extends Ss{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new i2,m={},_=e.getContextAttributes();let M=null,x=null;const y=[],b=[],w=new ot;let S=null,T=null;const R=new fn;R.viewport=new me;const A=new fn;A.viewport=new me;const P=[R,A],I=new ey;let N=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=y[X];return Y===void 0&&(Y=new Kc,y[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=y[X];return Y===void 0&&(Y=new Kc,y[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=y[X];return Y===void 0&&(Y=new Kc,y[X]=Y),Y.getHandSpace()};function z(X){const Y=b.indexOf(X.inputSource);if(Y===-1)return;const yt=y[Y];yt!==void 0&&(yt.update(X.inputSource,X.frame,l||o),yt.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",J);for(let X=0;X<y.length;X++){const Y=b[X];Y!==null&&(b[X]=null,y[X].disconnect(Y))}N=null,U=null,g.reset();for(const X in m)delete m[X];if(t.setRenderTarget(M),d=null,f=null,h=null,s=null,x=null,Ht.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(w.width,w.height,!1),T!==null){const X=T.camera;X.fov=T.fov,X.zoom=T.zoom,X.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",J),_.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Pt=null,it=null;_.depth&&(it=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=_.stencil?ms:Ii,Pt=_.stencil?ho:hi);const Xt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Xt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new dn(f.textureWidth,f.textureHeight,{format:Ln,type:Sn,depthTexture:new xo(f.textureWidth,f.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const yt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new dn(d.framebufferWidth,d.framebufferHeight,{format:Ln,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ht.setContext(s),Ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function J(X){for(let Y=0;Y<X.removed.length;Y++){const yt=X.removed[Y],Pt=b.indexOf(yt);Pt>=0&&(b[Pt]=null,y[Pt].disconnect(yt))}for(let Y=0;Y<X.added.length;Y++){const yt=X.added[Y];let Pt=b.indexOf(yt);if(Pt===-1){for(let Xt=0;Xt<y.length;Xt++)if(Xt>=b.length){b.push(yt),Pt=Xt;break}else if(b[Xt]===null){b[Xt]=yt,Pt=Xt;break}if(Pt===-1)break}const it=y[Pt];it&&it.connect(yt)}}const B=new L,K=new L;function j(X,Y,yt){B.setFromMatrixPosition(Y.matrixWorld),K.setFromMatrixPosition(yt.matrixWorld);const Pt=B.distanceTo(K),it=Y.projectionMatrix.elements,Xt=yt.projectionMatrix.elements,Pe=it[14]/(it[10]-1),rt=it[14]/(it[10]+1),Gt=(it[9]+1)/it[5],he=(it[9]-1)/it[5],ne=(it[8]-1)/it[0],be=(Xt[8]+1)/Xt[0],Ue=Pe*ne,Ze=Pe*be,Ae=Pt/(-ne+be),Le=Ae*-ne;if(Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Le),X.translateZ(Ae),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),it[10]===-1)X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const F=Pe+Ae,sn=rt+Ae,ge=Ue-Le,D=Ze+(Pt-Le),E=Gt*rt/sn*F,H=he*rt/sn*F;X.projectionMatrix.makePerspective(ge,D,E,H,F,sn),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Mt(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Y=X.near,yt=X.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),I.near=A.near=R.near=Y,I.far=A.far=R.far=yt,(N!==I.near||U!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),N=I.near,U=I.far),I.layers.mask=X.layers.mask|6,R.layers.mask=I.layers.mask&-5,A.layers.mask=I.layers.mask&-3;const Pt=X.parent,it=I.cameras;Mt(I,Pt);for(let Xt=0;Xt<it.length;Xt++)Mt(it[Xt],Pt);it.length===2?j(I,R,A):I.projectionMatrix.copy(R.projectionMatrix),T===null&&X.isPerspectiveCamera&&(T={camera:X,fov:X.fov,zoom:X.zoom}),gt(X,I,Pt)};function gt(X,Y,yt){yt===null?X.matrix.copy(Y.matrixWorld):(X.matrix.copy(yt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Y.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ar*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(X){return m[X]};let At=null;function Bt(X,Y){if(u=Y.getViewerPose(l||o),p=Y,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Pt=!1;yt.length!==I.cameras.length&&(I.cameras.length=0,Pt=!0);for(let rt=0;rt<yt.length;rt++){const Gt=yt[rt];let he=null;if(d!==null)he=d.getViewport(Gt);else{const be=h.getViewSubImage(f,Gt);he=be.viewport,rt===0&&(t.setRenderTargetTextures(x,be.colorTexture,be.depthStencilTexture),t.setRenderTarget(x))}let ne=P[rt];ne===void 0&&(ne=new fn,ne.layers.enable(rt),ne.viewport=new me,P[rt]=ne),ne.matrix.fromArray(Gt.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(Gt.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(he.x,he.y,he.width,he.height),rt===0&&(I.matrix.copy(ne.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Pt===!0&&I.cameras.push(ne)}const it=s.enabledFeatures;if(it&&it.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const rt=h.getDepthInformation(yt[0]);rt&&rt.isValid&&rt.texture&&g.init(rt,s.renderState)}if(it&&it.includes("camera-access")&&v){t.state.unbindTexture(),h=i.getBinding();for(let rt=0;rt<yt.length;rt++){const Gt=yt[rt].camera;if(Gt){let he=m[Gt];he||(he=new G0,m[Gt]=he);const ne=h.getCameraImage(Gt);he.sourceTexture=ne}}}}for(let yt=0;yt<y.length;yt++){const Pt=b[yt],it=y[yt];Pt!==null&&it!==void 0&&it.update(Pt,Y,l||o)}At&&At(X,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),p=null}const Ht=new cg;Ht.setAnimationLoop(Bt),this.setAnimationLoop=function(X){At=X},this.dispose=function(){}}}const r2=new Ot,mg=new Kt;mg.set(-1,0,0,0,1,0,0,0,1);function o2(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,tg(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,_,M,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,_,M):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=t.get(m),M=_.envMap,x=_.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(r2.makeRotationFromEuler(x)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(mg),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,_,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=M*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function a2(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const b=y.program;i.uniformBlockBinding(x,b)}function l(x,y){let b=s[x.id];b===void 0&&(g(x),b=u(x),s[x.id]=b,x.addEventListener("dispose",_));const w=y.program;i.updateUBOMapping(x,w);const S=t.render.frame;r[x.id]!==S&&(f(x),r[x.id]=S)}function u(x){const y=h();x.__bindingPointIndex=y;const b=n.createBuffer(),w=x.__size,S=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,w,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const y=s[x.id],b=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let S=0,T=b.length;S<T;S++){const R=b[S];if(Array.isArray(R))for(let A=0,P=R.length;A<P;A++)d(R[A],S,A,w);else d(R,S,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,y,b,w){if(v(x,y,b,w)===!0){const S=x.__offset,T=x.value;if(Array.isArray(T)){let R=0;for(let A=0;A<T.length;A++){const P=T[A],I=m(P);p(P,x.__data,R),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(R+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,x.__data)}}function p(x,y,b){typeof x=="number"||typeof x=="boolean"?y[0]=x:x.isMatrix3?(y[0]=x.elements[0],y[1]=x.elements[1],y[2]=x.elements[2],y[3]=0,y[4]=x.elements[3],y[5]=x.elements[4],y[6]=x.elements[5],y[7]=0,y[8]=x.elements[6],y[9]=x.elements[7],y[10]=x.elements[8],y[11]=0):ArrayBuffer.isView(x)?y.set(new x.constructor(x.buffer,x.byteOffset,y.length)):x.toArray(y,b)}function v(x,y,b,w){const S=x.value,T=y+"_"+b;if(w[T]===void 0)return typeof S=="number"||typeof S=="boolean"?w[T]=S:ArrayBuffer.isView(S)?w[T]=S.slice():w[T]=S.clone(),!0;{const R=w[T];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return w[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(R.equals(S)===!1)return R.copy(S),!0}}return!1}function g(x){const y=x.uniforms;let b=0;const w=16;for(let T=0,R=y.length;T<R;T++){const A=Array.isArray(y[T])?y[T]:[y[T]];for(let P=0,I=A.length;P<I;P++){const N=A[P],U=Array.isArray(N.value)?N.value:[N.value];for(let z=0,V=U.length;z<V;z++){const J=U[z],B=m(J),K=b%w,j=K%B.boundary,Mt=K+j;b+=j,Mt!==0&&w-Mt<B.storage&&(b+=w-Mt),N.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=B.storage}}}const S=b%w;return S>0&&(b+=w-S),x.__size=b,x.__cache={},this}function m(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(y.boundary=16,y.storage=x.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",x),y}function _(x){const y=x.target;y.removeEventListener("dispose",_);const b=o.indexOf(y.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function M(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:M}}const c2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ei=null;function l2(){return ei===null&&(ei=new Wh(c2,16,16,ys,gn),ei.name="DFG_LUT",ei.minFilter=$e,ei.magFilter=$e,ei.wrapS=ri,ei.wrapT=ri,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}class u2{constructor(t={}){const{canvas:e=eM(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Sn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=d,g=new Set([Fh,kh,Uh]),m=new Set([Sn,hi,uo,ho,Nh,Ih]),_=new Uint32Array(4),M=new Int32Array(4),x=new L;let y=null,b=null;const w=[],S=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let A=!1,P=null,I=null,N=null,U=null;this._outputColorSpace=Ge;let z=0,V=0,J=null,B=-1,K=null;const j=new me,Mt=new me;let gt=null;const At=new ct(0);let Bt=0,Ht=e.width,X=e.height,Y=1,yt=null,Pt=null;const it=new me(0,0,Ht,X),Xt=new me(0,0,Ht,X);let Pe=!1;const rt=new Io;let Gt=!1,he=!1;const ne=new Ot,be=new L,Ue=new me,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function Le(){return J===null?Y:1}let F=i;function sn(C,k){return e.getContext(C,k)}let ge,D,E,H,$,Z,at,ht,Q,et,ft,Ut,vt,dt,kt,zt,Zt,O,pt,tt,mt,bt,nt;try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sh}`),e.addEventListener("webglcontextlost",we,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",kn,!1),F===null){const k="webgl2";if(F=sn(k,C),F===null)throw sn(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ft()}catch(C){throw e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",kn,!1),Wt("WebGLRenderer: "+C.message),C}function Ft(){ge=new lw(F),ge.init(),mt=new t2(F,ge),D=new jS(F,ge,t,mt),E=new QT(F,ge),D.reversedDepthBuffer&&f&&E.buffers.depth.setReversed(!0),I=F.createFramebuffer(),N=F.createFramebuffer(),U=F.createFramebuffer(),H=new fw(F),$=new OT,Z=new jT(F,ge,E,$,D,mt,H),at=new cw(R),ht=new py(F),bt=new JS(F,ht),Q=new uw(F,ht,H,bt),et=new pw(F,Q,ht,bt,H),O=new dw(F,D,Z),kt=new tw($),ft=new FT(R,at,ge,D,bt,kt),Ut=new o2(R,$),vt=new zT,dt=new $T(ge),Zt=new ZS(R,at,E,et,p,c),zt=new JT(R,et,D),nt=new a2(F,H,D,E),pt=new QS(F,ge,H),tt=new hw(F,ge,H),H.programs=ft.programs,R.capabilities=D,R.extensions=ge,R.properties=$,R.renderLists=vt,R.shadowMap=zt,R.state=E,R.info=H}v!==Sn&&(T=new gw(v,e.width,e.height,a,s,r));const Lt=new s2(R,F);this.xr=Lt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const C=ge.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ge.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(C){C!==void 0&&(Y=C,this.setSize(Ht,X,!1))},this.getSize=function(C){return C.set(Ht,X)},this.setSize=function(C,k,q=!0){if(Lt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}Ht=C,X=k,e.width=Math.floor(C*Y),e.height=Math.floor(k*Y),q===!0&&(e.style.width=C+"px",e.style.height=k+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(Ht*Y,X*Y).floor()},this.setDrawingBufferSize=function(C,k,q){Ht=C,X=k,Y=q,e.width=Math.floor(C*q),e.height=Math.floor(k*q),this.setViewport(0,0,C,k)},this.setEffects=function(C){if(v===Sn){Wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let k=0;k<C.length;k++)if(C[k].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(j)},this.getViewport=function(C){return C.copy(it)},this.setViewport=function(C,k,q,G){C.isVector4?it.set(C.x,C.y,C.z,C.w):it.set(C,k,q,G),E.viewport(j.copy(it).multiplyScalar(Y).round())},this.getScissor=function(C){return C.copy(Xt)},this.setScissor=function(C,k,q,G){C.isVector4?Xt.set(C.x,C.y,C.z,C.w):Xt.set(C,k,q,G),E.scissor(Mt.copy(Xt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(C){E.setScissorTest(Pe=C)},this.setOpaqueSort=function(C){yt=C},this.setTransparentSort=function(C){Pt=C},this.getClearColor=function(C){return C.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(C=!0,k=!0,q=!0){let G=0;if(C){let W=!1;if(J!==null){const _t=J.texture.format;W=g.has(_t)}if(W){const _t=J.texture.type,Tt=m.has(_t),xt=Zt.getClearColor(),Rt=Zt.getClearAlpha(),It=xt.r,Qt=xt.g,re=xt.b;Tt?(_[0]=It,_[1]=Qt,_[2]=re,_[3]=Rt,F.clearBufferuiv(F.COLOR,0,_)):(M[0]=It,M[1]=Qt,M[2]=re,M[3]=Rt,F.clearBufferiv(F.COLOR,0,M))}else G|=F.COLOR_BUFFER_BIT}k&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),P=C},this.dispose=function(){e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",kn,!1),Zt.dispose(),vt.dispose(),dt.dispose(),$.dispose(),at.dispose(),et.dispose(),bt.dispose(),nt.dispose(),ft.dispose(),Lt.dispose(),Lt.removeEventListener("sessionstart",yf),Lt.removeEventListener("sessionend",bf),ns.stop()};function we(C){C.preventDefault(),rc("WebGLRenderer: Context Lost."),A=!0}function fe(){rc("WebGLRenderer: Context Restored."),A=!1;const C=H.autoReset,k=zt.enabled,q=zt.autoUpdate,G=zt.needsUpdate,W=zt.type;Ft(),H.autoReset=C,zt.enabled=k,zt.autoUpdate=q,zt.needsUpdate=G,zt.type=W}function kn(C){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Qn(C){const k=C.target;k.removeEventListener("dispose",Qn),yv(k)}function yv(C){bv(C),$.remove(C)}function bv(C){const k=$.get(C).programs;k!==void 0&&(k.forEach(function(q){ft.releaseProgram(q)}),C.isShaderMaterial&&ft.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,q,G,W,_t){k===null&&(k=Ze);const Tt=W.isMesh&&W.matrixWorld.determinantAffine()<0,xt=Tv(C,k,q,G,W);E.setMaterial(G,Tt);let Rt=q.index,It=1;if(G.wireframe===!0){if(Rt=Q.getWireframeAttribute(q),Rt===void 0)return;It=2}const Qt=q.drawRange,re=q.attributes.position;let Ct=Qt.start*It,de=(Qt.start+Qt.count)*It;_t!==null&&(Ct=Math.max(Ct,_t.start*It),de=Math.min(de,(_t.start+_t.count)*It)),Rt!==null?(Ct=Math.max(Ct,0),de=Math.min(de,Rt.count)):re!=null&&(Ct=Math.max(Ct,0),de=Math.min(de,re.count));const Be=de-Ct;if(Be<0||Be===1/0)return;bt.setup(W,G,xt,q,Rt);let Re,Se=pt;if(Rt!==null&&(Re=ht.get(Rt),Se=tt,Se.setIndex(Re)),W.isMesh)G.wireframe===!0?(E.setLineWidth(G.wireframeLinewidth*Le()),Se.setMode(F.LINES)):Se.setMode(F.TRIANGLES);else if(W.isLine){let rn=G.linewidth;rn===void 0&&(rn=1),E.setLineWidth(rn*Le()),W.isLineSegments?Se.setMode(F.LINES):W.isLineLoop?Se.setMode(F.LINE_LOOP):Se.setMode(F.LINE_STRIP)}else W.isPoints?Se.setMode(F.POINTS):W.isSprite&&Se.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(ge.get("WEBGL_multi_draw"))Se.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const rn=W._multiDrawStarts,wt=W._multiDrawCounts,ln=W._multiDrawCount,ae=Rt?ht.get(Rt).bytesPerElement:1,Tn=$.get(G).currentProgram.getUniforms();for(let jn=0;jn<ln;jn++)Tn.setValue(F,"_gl_DrawID",jn),Se.render(rn[jn]/ae,wt[jn])}else if(W.isInstancedMesh)Se.renderInstances(Ct,Be,W.count);else if(q.isInstancedBufferGeometry){const rn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,wt=Math.min(q.instanceCount,rn);Se.renderInstances(Ct,Be,wt)}else Se.render(Ct,Be)};function Mf(C,k,q,G){P!==null&&C.isNodeMaterial&&P.setObject(G,C),Gt===!0&&kt.setState(C,q,!1),C.transparent===!0&&C.side===Ee&&C.forceSinglePass===!1?(C.side=en,C.needsUpdate=!0,Bo(C,k,G),C.side=Ni,C.needsUpdate=!0,Bo(C,k,G),C.side=Ee):Bo(C,k,G)}this.compile=function(C,k,q=null){q===null&&(q=C),P!==null&&P.renderStart(C,k,q),b=dt.get(q),b.init(k),S.push(b),q.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),C!==q&&C.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),he=this.localClippingEnabled,Gt=kt.init(this.clippingPlanes,he),Gt===!0&&kt.setGlobalState(this.clippingPlanes,k),P!==null&&zt.render(b.state.shadowsArray,q,k);const G=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const _t=W.material;if(_t)if(Array.isArray(_t))for(let Tt=0;Tt<_t.length;Tt++){const xt=_t[Tt];Mf(xt,q,k,W),G.add(xt)}else Mf(_t,q,k,W),G.add(_t)}),b=S.pop(),P!==null&&P.renderEnd(),G},this.compileAsync=function(C,k,q=null){const G=this.compile(C,k,q);return new Promise(W=>{function _t(){if(G.forEach(function(Tt){const Rt=$.get(Tt).currentProgram;(Rt===void 0||Rt.isReady())&&G.delete(Tt)}),G.size===0){W(C);return}setTimeout(_t,10)}ge.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let Cc=null;function Sv(C){Cc&&Cc(C)}function yf(){ns.stop()}function bf(){ns.start()}const ns=new cg;ns.setAnimationLoop(Sv),typeof self<"u"&&ns.setContext(self),this.setAnimationLoop=function(C){Cc=C,Lt.setAnimationLoop(C),C===null?ns.stop():ns.start()},Lt.addEventListener("sessionstart",yf),Lt.addEventListener("sessionend",bf),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;P!==null&&P.renderStart(C,k);const q=Lt.enabled===!0&&Lt.isPresenting===!0,G=T!==null&&(J===null||q)&&T.begin(R,J);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Lt.enabled===!0&&Lt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Lt.cameraAutoUpdate===!0&&Lt.updateCamera(k),k=Lt.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,k,J),b=dt.get(C,S.length),b.init(k),b.state.textureUnits=Z.getTextureUnits(),S.push(b),ne.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),rt.setFromProjectionMatrix(ne,oi,k.reversedDepth),he=this.localClippingEnabled,Gt=kt.init(this.clippingPlanes,he),y=vt.get(C,w.length),y.init(),w.push(y),Lt.enabled===!0&&Lt.isPresenting===!0){const Tt=R.xr.getDepthSensingMesh();Tt!==null&&Pc(Tt,k,-1/0,R.sortObjects)}Pc(C,k,0,R.sortObjects),y.finish(),P!==null&&P.updateLights(b.state.lightsArray),R.sortObjects===!0&&y.sort(yt,Pt),Ae=Lt.enabled===!1||Lt.isPresenting===!1||Lt.hasDepthSensing()===!1,Ae&&Zt.addToRenderList(y,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Gt===!0&&kt.beginShadows();const W=b.state.shadowsArray;if(zt.render(W,C,k),Gt===!0&&kt.endShadows(),(G&&T.hasRenderPass())===!1){const Tt=y.opaque,xt=y.transmissive;if(b.setupLights(),k.isArrayCamera){const Rt=k.cameras;if(xt.length>0)for(let It=0,Qt=Rt.length;It<Qt;It++){const re=Rt[It];wf(Tt,xt,C,re)}Ae&&Zt.render(C);for(let It=0,Qt=Rt.length;It<Qt;It++){const re=Rt[It];Sf(y,C,re,re.viewport)}}else xt.length>0&&wf(Tt,xt,C,k),Ae&&Zt.render(C),Sf(y,C,k)}J!==null&&V===0&&(Z.updateMultisampleRenderTarget(J),Z.updateRenderTargetMipmap(J)),G&&T.end(R),C.isScene===!0&&C.onAfterRender(R,C,k),bt.resetDefaultState(),B=-1,K=null,S.pop(),S.length>0?(b=S[S.length-1],Z.setTextureUnits(b.state.textureUnits),Gt===!0&&kt.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?y=w[w.length-1]:y=null,P!==null&&P.renderEnd()};function Pc(C,k,q,G){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLightProbeGrid)b.pushLightProbeGrid(C);else if(C.isLight)b.pushLight(C),C.castShadow&&b.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(rt)){G&&Ue.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ne);const Tt=et.update(C),xt=C.material;xt.visible&&y.push(C,Tt,xt,q,Ue.z,null,k)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(rt))){const Tt=et.update(C),xt=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ue.copy(C.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Ue.copy(Tt.boundingSphere.center)),Ue.applyMatrix4(C.matrixWorld).applyMatrix4(ne)),Array.isArray(xt)){const Rt=Tt.groups;for(let It=0,Qt=Rt.length;It<Qt;It++){const re=Rt[It],Ct=xt[re.materialIndex];Ct&&Ct.visible&&y.push(C,Tt,Ct,q,Ue.z,re,k)}}else xt.visible&&y.push(C,Tt,xt,q,Ue.z,null,k)}}const _t=C.children;for(let Tt=0,xt=_t.length;Tt<xt;Tt++)Pc(_t[Tt],k,q,G)}function Sf(C,k,q,G){const{opaque:W,transmissive:_t,transparent:Tt}=C;b.setupLightsView(q),Gt===!0&&kt.setGlobalState(R.clippingPlanes,q),G&&E.viewport(j.copy(G)),W.length>0&&Oo(W,k,q),_t.length>0&&Oo(_t,k,q),Tt.length>0&&Oo(Tt,k,q),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function wf(C,k,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[G.id]===void 0){const Ct=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[G.id]=new dn(1,1,{generateMipmaps:!0,type:Ct?gn:Sn,minFilter:Ti,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ie.workingColorSpace})}const _t=b.state.transmissionRenderTarget[G.id],Tt=G.viewport||j;_t.setSize(Tt.z*R.transmissionResolutionScale,Tt.w*R.transmissionResolutionScale);const xt=R.getRenderTarget(),Rt=R.getActiveCubeFace(),It=R.getActiveMipmapLevel();R.setRenderTarget(_t),R.getClearColor(At),Bt=R.getClearAlpha(),Bt<1&&R.setClearColor(16777215,.5),R.clear(),Ae&&Zt.render(q);const Qt=R.toneMapping;R.toneMapping=li;const re=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),Gt===!0&&kt.setGlobalState(R.clippingPlanes,G),Oo(C,q,G),Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let de=0,Be=k.length;de<Be;de++){const Re=k[de],{object:Se,geometry:rn,material:wt,group:ln}=Re;if(wt.side===Ee&&Se.layers.test(G.layers)){const ae=wt.side;wt.side=en,wt.needsUpdate=!0,Tf(Se,q,G,rn,wt,ln),wt.side=ae,wt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t))}R.setRenderTarget(xt,Rt,It),R.setClearColor(At,Bt),re!==void 0&&(G.viewport=re),R.toneMapping=Qt}function Oo(C,k,q){const G=k.isScene===!0?k.overrideMaterial:null;for(let W=0,_t=C.length;W<_t;W++){const Tt=C[W],{object:xt,geometry:Rt,group:It}=Tt;let Qt=Tt.material;Qt.allowOverride===!0&&G!==null&&(Qt=G),xt.layers.test(q.layers)&&Tf(xt,k,q,Rt,Qt,It)}}function Tf(C,k,q,G,W,_t){P!==null&&W.isNodeMaterial&&P.setObject(C,W),C.onBeforeRender(R,k,q,G,W,_t),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(R,k,q,G,C,_t),W.transparent===!0&&W.side===Ee&&W.forceSinglePass===!1?(W.side=en,W.needsUpdate=!0,R.renderBufferDirect(q,k,G,W,C,_t),W.side=Ni,W.needsUpdate=!0,R.renderBufferDirect(q,k,G,W,C,_t),W.side=Ee):R.renderBufferDirect(q,k,G,W,C,_t),C.onAfterRender(R,k,q,G,W,_t)}function Bo(C,k,q){k.isScene!==!0&&(k=Ze);const G=$.get(C),W=b.state.lights,_t=b.state.shadowsArray,Tt=W.state.version,xt=ft.getParameters(C,W.state,_t,k,q,b.state.lightProbeGridArray),Rt=ft.getProgramCacheKey(xt);let It=G.programs;G.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?k.environment:null,G.fog=k.fog;const Qt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;G.envMap=at.get(C.envMap||G.environment,Qt),G.envMapRotation=G.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,It===void 0&&(C.addEventListener("dispose",Qn),It=new Map,G.programs=It);let re=It.get(Rt);if(re!==void 0){if(G.currentProgram===re&&G.lightsStateVersion===Tt)return Af(C,xt),re}else xt.uniforms=ft.getUniforms(C),P!==null&&C.isNodeMaterial&&P.build(C,q,xt),C.onBeforeCompile(xt,R),re=ft.acquireProgram(xt,Rt),It.set(Rt,re),G.uniforms=xt.uniforms;const Ct=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ct.clippingPlanes=kt.uniform),Af(C,xt),G.needsLights=Av(C),G.lightsStateVersion=Tt,G.needsLights&&(Ct.ambientLightColor.value=W.state.ambient,Ct.lightProbe.value=W.state.probe,Ct.sunLights.value=W.state.sun,Ct.sunLightShadows.value=W.state.sunShadow,Ct.directionalLights.value=W.state.directional,Ct.directionalLightShadows.value=W.state.directionalShadow,Ct.spotLights.value=W.state.spot,Ct.spotLightShadows.value=W.state.spotShadow,Ct.rectAreaLights.value=W.state.rectArea,Ct.ltc_1.value=W.state.rectAreaLTC1,Ct.ltc_2.value=W.state.rectAreaLTC2,Ct.pointLights.value=W.state.point,Ct.pointLightShadows.value=W.state.pointShadow,Ct.hemisphereLights.value=W.state.hemi,Ct.sunShadowMatrix.value=W.state.sunShadowMatrix,Ct.sunShadowCascade.value=W.state.sunShadowCascade,Ct.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ct.spotLightMatrix.value=W.state.spotLightMatrix,Ct.spotLightMap.value=W.state.spotLightMap,Ct.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=b.state.lightProbeGridArray.length>0,G.currentProgram=re,G.uniformsList=null,re}function Ef(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=Ga.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Af(C,k){const q=$.get(C);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function wv(C,k){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;x.setFromMatrixPosition(k.matrixWorld);for(let q=0,G=C.length;q<G;q++){const W=C[q];if(W.texture!==null&&W.boundingBox.containsPoint(x))return W}return null}function Tv(C,k,q,G,W){k.isScene!==!0&&(k=Ze),Z.resetTextureUnits();const _t=k.fog,Tt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?k.environment:null,xt=J===null?R.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ie.workingColorSpace,Rt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,It=at.get(G.envMap||Tt,Rt),Qt=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,re=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!q.morphAttributes.position,de=!!q.morphAttributes.normal,Be=!!q.morphAttributes.color;let Re=li;G.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Re=R.toneMapping);const Se=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,rn=Se!==void 0?Se.length:0,wt=$.get(G),ln=b.state.lights;if(Gt===!0&&(he===!0||C!==K)){const Te=C===K&&G.id===B;kt.setState(G,C,Te)}let ae=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==ln.state.version||wt.outputColorSpace!==xt||W.isBatchedMesh&&wt.batching===!1||!W.isBatchedMesh&&wt.batching===!0||W.isBatchedMesh&&wt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&wt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&wt.instancing===!1||!W.isInstancedMesh&&wt.instancing===!0||W.isSkinnedMesh&&wt.skinning===!1||!W.isSkinnedMesh&&wt.skinning===!0||W.isInstancedMesh&&wt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&wt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&wt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&wt.instancingMorph===!1&&W.morphTexture!==null||wt.envMap!==It||G.fog===!0&&wt.fog!==_t||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==kt.numPlanes||wt.numIntersection!==kt.numIntersection)||wt.vertexAlphas!==Qt||wt.vertexTangents!==re||wt.morphTargets!==Ct||wt.morphNormals!==de||wt.morphColors!==Be||wt.toneMapping!==Re||wt.morphTargetsCount!==rn||!!wt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,wt.__version=G.version);let Tn=wt.currentProgram;ae===!0&&(Tn=Bo(G,k,W),P&&G.isNodeMaterial&&P.onUpdateProgram(G,Tn,wt));let jn=!1,ki=!1,Ts=!1;const ye=Tn.getUniforms(),Fe=wt.uniforms;if(E.useProgram(Tn.program)&&(jn=!0,ki=!0,Ts=!0),G.id!==B&&(B=G.id,ki=!0),wt.needsLights){const Te=wv(b.state.lightProbeGridArray,W);wt.lightProbeGrid!==Te&&(wt.lightProbeGrid=Te,ki=!0)}if(jn||K!==C){E.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),ye.setValue(F,"projectionMatrix",C.projectionMatrix),ye.setValue(F,"viewMatrix",C.matrixWorldInverse);const Oi=ye.map.cameraPosition;Oi!==void 0&&Oi.setValue(F,be.setFromMatrixPosition(C.matrixWorld)),D.logarithmicDepthBuffer&&ye.setValue(F,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ye.setValue(F,"isOrthographic",C.isOrthographicCamera===!0),K!==C&&(K=C,ki=!0,Ts=!0)}if(wt.needsLights&&(ln.state.sunShadowMap.length>0&&ye.setValue(F,"sunShadowMap",ln.state.sunShadowMap,Z),ln.state.directionalShadowMap.length>0&&ye.setValue(F,"directionalShadowMap",ln.state.directionalShadowMap,Z),ln.state.spotShadowMap.length>0&&ye.setValue(F,"spotShadowMap",ln.state.spotShadowMap,Z),ln.state.pointShadowMap.length>0&&ye.setValue(F,"pointShadowMap",ln.state.pointShadowMap,Z)),W.isSkinnedMesh){ye.setOptional(F,W,"bindMatrix"),ye.setOptional(F,W,"bindMatrixInverse");const Te=W.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ye.setValue(F,"boneTexture",Te.boneTexture,Z))}W.isBatchedMesh&&(ye.setOptional(F,W,"batchingTexture"),ye.setValue(F,"batchingTexture",W._matricesTexture,Z),ye.setOptional(F,W,"batchingIdTexture"),ye.setValue(F,"batchingIdTexture",W._indirectTexture,Z),ye.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&ye.setValue(F,"batchingColorTexture",W._colorsTexture,Z));const Fi=q.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&O.update(W,q,Tn),(ki||wt.receiveShadow!==W.receiveShadow)&&(wt.receiveShadow=W.receiveShadow,ye.setValue(F,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&k.environment!==null&&(Fe.envMapIntensity.value=k.environmentIntensity),Fe.dfgLUT!==void 0&&(Fe.dfgLUT.value=l2()),ki){if(ye.setValue(F,"toneMappingExposure",R.toneMappingExposure),wt.needsLights&&Ev(Fe,Ts),_t&&G.fog===!0&&Ut.refreshFogUniforms(Fe,_t),Ut.refreshMaterialUniforms(Fe,G,Y,X,b.state.transmissionRenderTarget[C.id]),wt.needsLights&&wt.lightProbeGrid){const Te=wt.lightProbeGrid;Fe.probesSH.value=Te.texture,Fe.probesMin.value.copy(Te.boundingBox.min),Fe.probesMax.value.copy(Te.boundingBox.max),Fe.probesResolution.value.copy(Te.resolution)}Ga.upload(F,Ef(wt),Fe,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ga.upload(F,Ef(wt),Fe,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ye.setValue(F,"center",W.center),ye.setValue(F,"modelViewMatrix",W.modelViewMatrix),ye.setValue(F,"normalMatrix",W.normalMatrix),ye.setValue(F,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const Te=G.uniformsGroups;for(let Oi=0,Es=Te.length;Oi<Es;Oi++){const Cf=Te[Oi];nt.update(Cf,Tn),nt.bind(Cf,Tn)}}return Tn}function Ev(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.sunLights.needsUpdate=k,C.sunLightShadows.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function Av(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(C,k,q){const G=$.get(C);G.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),$.get(C.texture).__webglTexture=k,$.get(C.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,k){const q=$.get(C);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,q=0){J=C,z=k,V=q;let G=null,W=!1,_t=!1;if(C){const xt=$.get(C);if(xt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(F.FRAMEBUFFER,xt.__webglFramebuffer),j.copy(C.viewport),Mt.copy(C.scissor),gt=C.scissorTest,E.viewport(j),E.scissor(Mt),E.setScissorTest(gt),B=-1;return}else if(xt.__webglFramebuffer===void 0)Z.setupRenderTarget(C);else if(xt.__hasExternalTextures)Z.rebindTextures(C,$.get(C.texture).__webglTexture,$.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Qt=C.depthTexture;if(xt.__boundDepthTexture!==Qt){if(Qt!==null&&$.has(Qt)&&(C.width!==Qt.image.width||C.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(C)}}const Rt=C.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(_t=!0);const It=$.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(It[k])?G=It[k][q]:G=It[k],W=!0):C.samples>0&&Z.useMultisampledRTT(C)===!1?G=$.get(C).__webglMultisampledFramebuffer:Array.isArray(It)?G=It[q]:G=It,j.copy(C.viewport),Mt.copy(C.scissor),gt=C.scissorTest}else j.copy(it).multiplyScalar(Y).floor(),Mt.copy(Xt).multiplyScalar(Y).floor(),gt=Pe;if(q!==0&&(G=I),E.bindFramebuffer(F.FRAMEBUFFER,G)&&E.drawBuffers(C,G),E.viewport(j),E.scissor(Mt),E.setScissorTest(gt),W){const xt=$.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,xt.__webglTexture,q)}else if(_t){const xt=k;for(let Rt=0;Rt<C.textures.length;Rt++){const It=$.get(C.textures[Rt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Rt,It.__webglTexture,q,xt)}}else if(C!==null&&q!==0){const xt=$.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,q)}B=-1};function Rf(C){const k=$.get(C);return(k.__readFormat!==C.format||k.__readType!==C.type)&&(k.__readFormat=C.format,k.__readType=C.type,k.__formatReadable=D.textureFormatReadable(C.format),k.__typeReadable=D.textureTypeReadable(C.type)),k}this.readRenderTargetPixels=function(C,k,q,G,W,_t,Tt,xt=0){if(!(C&&C.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=$.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){E.bindFramebuffer(F.FRAMEBUFFER,Rt);try{const It=C.textures[xt],Qt=It.format,re=It.type;C.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=Rf(It);if(Ct.__formatReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-G&&q>=0&&q<=C.height-W&&F.readPixels(k,q,G,W,mt.convert(Qt),mt.convert(re),_t)}finally{const It=J!==null?$.get(J).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(C,k,q,G,W,_t,Tt,xt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=$.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(k>=0&&k<=C.width-G&&q>=0&&q<=C.height-W){E.bindFramebuffer(F.FRAMEBUFFER,Rt);const It=C.textures[xt],Qt=It.format,re=It.type;C.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt);const Ct=Rf(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,de),F.bufferData(F.PIXEL_PACK_BUFFER,_t.byteLength,F.STREAM_READ),F.readPixels(k,q,G,W,mt.convert(Qt),mt.convert(re),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Be=J!==null?$.get(J).__webglFramebuffer:null;E.bindFramebuffer(F.FRAMEBUFFER,Be);const Re=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await nM(F,Re,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,de),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,_t),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(de),F.deleteSync(Re),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,k=null,q=0){const G=Math.pow(2,-q),W=Math.floor(C.image.width*G),_t=Math.floor(C.image.height*G),Tt=k!==null?k.x:0,xt=k!==null?k.y:0;Z.setTexture2D(C,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Tt,xt,W,_t),E.unbindTexture()},this.copyTextureToTexture=function(C,k,q=null,G=null,W=0,_t=0){let Tt,xt,Rt,It,Qt,re,Ct,de,Be;const Re=C.isCompressedTexture?C.mipmaps[_t]:C.image;if(q!==null)Tt=q.max.x-q.min.x,xt=q.max.y-q.min.y,Rt=q.isBox3?q.max.z-q.min.z:1,It=q.min.x,Qt=q.min.y,re=q.isBox3?q.min.z:0;else{const Fe=Math.pow(2,-W);Tt=Math.floor(Re.width*Fe),xt=Math.floor(Re.height*Fe),C.isDataArrayTexture?Rt=Re.depth:C.isData3DTexture?Rt=Math.floor(Re.depth*Fe):Rt=1,It=0,Qt=0,re=0}G!==null?(Ct=G.x,de=G.y,Be=G.z):(Ct=0,de=0,Be=0);const Se=mt.convert(k.format),rn=mt.convert(k.type);let wt;k.isData3DTexture?(Z.setTexture3D(k,0),wt=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),wt=F.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),wt=F.TEXTURE_2D),E.activeTexture(F.TEXTURE0),E.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),E.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),E.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);const ln=E.getParameter(F.UNPACK_ROW_LENGTH),ae=E.getParameter(F.UNPACK_IMAGE_HEIGHT),Tn=E.getParameter(F.UNPACK_SKIP_PIXELS),jn=E.getParameter(F.UNPACK_SKIP_ROWS),ki=E.getParameter(F.UNPACK_SKIP_IMAGES);E.pixelStorei(F.UNPACK_ROW_LENGTH,Re.width),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Re.height),E.pixelStorei(F.UNPACK_SKIP_PIXELS,It),E.pixelStorei(F.UNPACK_SKIP_ROWS,Qt),E.pixelStorei(F.UNPACK_SKIP_IMAGES,re);const Ts=C.isDataArrayTexture||C.isData3DTexture,ye=k.isDataArrayTexture||k.isData3DTexture;if(C.isDepthTexture){const Fe=$.get(C),Fi=$.get(k),Te=$.get(Fe.__renderTarget),Oi=$.get(Fi.__renderTarget);E.bindFramebuffer(F.READ_FRAMEBUFFER,Te.__webglFramebuffer),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,Oi.__webglFramebuffer);for(let Es=0;Es<Rt;Es++)Ts&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(C).__webglTexture,W,re+Es),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(k).__webglTexture,_t,Be+Es)),F.blitFramebuffer(It,Qt,Tt,xt,Ct,de,Tt,xt,F.DEPTH_BUFFER_BIT,F.NEAREST);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||C.isRenderTargetTexture||$.has(C)){const Fe=$.get(C),Fi=$.get(k);E.bindFramebuffer(F.READ_FRAMEBUFFER,N),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,U);for(let Te=0;Te<Rt;Te++)Ts?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Fe.__webglTexture,W,re+Te):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Fe.__webglTexture,W),ye?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Fi.__webglTexture,_t,Be+Te):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Fi.__webglTexture,_t),W!==0?F.blitFramebuffer(It,Qt,Tt,xt,Ct,de,Tt,xt,F.COLOR_BUFFER_BIT,F.NEAREST):ye?F.copyTexSubImage3D(wt,_t,Ct,de,Be+Te,It,Qt,Tt,xt):F.copyTexSubImage2D(wt,_t,Ct,de,It,Qt,Tt,xt);E.bindFramebuffer(F.READ_FRAMEBUFFER,null),E.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ye?C.isDataTexture||C.isData3DTexture?F.texSubImage3D(wt,_t,Ct,de,Be,Tt,xt,Rt,Se,rn,Re.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(wt,_t,Ct,de,Be,Tt,xt,Rt,Se,Re.data):F.texSubImage3D(wt,_t,Ct,de,Be,Tt,xt,Rt,Se,rn,Re):C.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,_t,Ct,de,Tt,xt,Se,rn,Re.data):C.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,_t,Ct,de,Re.width,Re.height,Se,Re.data):F.texSubImage2D(F.TEXTURE_2D,_t,Ct,de,Tt,xt,Se,rn,Re);E.pixelStorei(F.UNPACK_ROW_LENGTH,ln),E.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ae),E.pixelStorei(F.UNPACK_SKIP_PIXELS,Tn),E.pixelStorei(F.UNPACK_SKIP_ROWS,jn),E.pixelStorei(F.UNPACK_SKIP_IMAGES,ki),_t===0&&k.generateMipmaps&&F.generateMipmap(wt),E.unbindTexture()},this.initRenderTarget=function(C){$.get(C).__webglFramebuffer===void 0&&Z.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Z.setTextureCube(C,0):C.isData3DTexture?Z.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Z.setTexture2DArray(C,0):Z.setTexture2D(C,0),E.unbindTexture()},this.resetState=function(){z=0,V=0,J=null,E.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}function h2(n){if(n.name)return n.name;if(n.parent?.name)return n.parent.name;const t=n.geometry;return`${n.type}:${t.type}:${t.getAttribute("position")?.count??0}`}function f2(n,t,e=14){t.updateMatrixWorld();const i=new Io().setFromProjectionMatrix(new Ot().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse)),s=new Un,r=new Map;n.traverseVisible(a=>{if(!(a instanceof $t)&&!(a instanceof cc))return;const c=a.geometry;if(a.frustumCulled&&(c.boundingSphere||c.computeBoundingSphere(),s.copy(c.boundingSphere).applyMatrix4(a.matrixWorld),!(a instanceof He)&&!i.intersectsSphere(s)))return;const l=a instanceof cc?0:(c.index?c.index.count:c.getAttribute("position")?.count??0)/3,u=a instanceof He?a.count:1,h=h2(a),f=r.get(h)??{meshes:0,triangles:0};f.meshes+=1,f.triangles+=Math.round(l*u),r.set(h,f)});const o=[...r.entries()].map(([a,c])=>({source:a,...c})).sort((a,c)=>c.triangles-a.triangles);return{rows:o.slice(0,e),total:o.reduce((a,c)=>a+c.triangles,0)}}function d2(n,t,e,i){const s=a=>{const c=n.getContext(),l=new Uint8Array(4),u=performance.now();for(let d=0;d<a;d++)n.info.reset(),t.render(),c.readPixels(0,0,1,1,c.RGBA,c.UNSIGNED_BYTE,l);const{geometries:h,textures:f}=n.info.memory;return{msPerFrame:(performance.now()-u)/a,calls:n.info.render.calls,triangles:n.info.render.triangles,geometries:h,textures:f,programs:n.info.programs?.length??0}},r=async a=>{e.render();const c=await new Promise(u=>n.domElement.toBlob(u,"image/png"));if(!c)return"khong chup duoc";const l=await fetch(`/__shot?name=${encodeURIComponent(a)}`,{method:"POST",body:c});return l.ok?`shots/${a}.png`:`loi ${l.status}`},o=a=>f2(i.scene,i.camera,a);window.__skyrun={...e,bench:s,shot:r,diag:o}}const p2=5,m2=450;function g2(n,t){let e=0;return{spawn(i,s,r){const o=t();if(!o||e>=p2||!Number.isFinite(i)||!Number.isFinite(s)){r();return}const a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),l=a.left+a.width*.25-c.left,u=a.top+a.height*.5-c.top,h=document.createElement("div");h.className="collect-streak",h.style.left=`${i}px`,h.style.top=`${s}px`,n.appendChild(h),e++;const f=(i+l)/2-(l-i)*.15,d=Math.min(s,u)-60,p=h.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${f-i}px), calc(-50% + ${d-s}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-i}px), calc(-50% + ${u-s}px)) scale(0.55)`,opacity:.9}],{duration:m2,easing:"cubic-bezier(.5,0,.9,.6)"});p.onfinish=p.oncancel=()=>{h.remove(),e--,r()}}}}const v2=`
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
}`,x2=`
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
}`,Nr=1.1,_2=1.3,M2=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Wa={request:0};function y2(n){const t=n?.041666666666666664:.025,e=Math.ceil(Nr/t)+2,i=[0,1].map(()=>Array.from({length:e},()=>({p:new L,t:-99,k:0,c:0}))),s=2*e*2,r=new Float32Array(s*3),o=new Float32Array(s*3),a=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),h=[];for(let A=0;A<2;A++)for(let P=0;P<e;P++){const I=(A*e+P)*2;l[I]=-1,l[I+1]=1,P<e-1&&h.push(I,I+1,I+2,I+1,I+3,I+2)}const f=new Yt,d={position:[r,3],aCol:[o,3],aAge:[a,1],aK:[c,1],aSide:[l,1],aAlong:[u,1]};for(const[A,[P,I]]of Object.entries(d))f.setAttribute(A,new St(P,I));f.setIndex(h),f.setDrawRange(0,0);const p=["position","aCol","aAge","aK","aAlong"].map(A=>f.getAttribute(A)),v=new oe({vertexShader:v2,fragmentShader:x2,uniforms:_n.merge([lt.fog]),transparent:!0,depthWrite:!1,side:Ee,fog:!0}),g=new $t(f,v);g.frustumCulled=!1,g.renderOrder=3;const m=new L,_=new L,M=new L,x=new L,y=new L,b=new L;let w=0,S=-99,T=-99,R=!1;return{mesh:g,update(A,P,I,N,U){Wa.request>0&&(w=Wa.request,Wa.request=0),N>0&&(w=Math.max(0,w-N));const z=A.mode==="run",V=z&&A.smokeT>0?Math.min(1,A.smokeT/_2):0,J=z&&w>0?.75*Math.min(1,w/.8):0,B=Math.max(V,J);if(B>0)I-T>Nr&&i.forEach((At,Bt)=>At.forEach(Ht=>(Ht.p.copy(P[Bt]),Ht.t=-99,Ht.k=0))),T=I;else if(I-T>Nr){R&&f.setDrawRange(0,0),R=!1;return}R=!0,f.setDrawRange(0,1/0);const K=pn(A.z);m.set(Math.sin(K),Ci(A.z),Math.cos(K)).normalize(),_.set(Math.cos(K),0,-Math.sin(K));const j=z?A.speed:0,Mt=Math.sign((P[0].x-P[1].x)*_.x+(P[0].z-P[1].z)*_.z)||1,gt=N>0&&I-S>=t;gt&&(S=I),i.forEach((At,Bt)=>{const Ht=B*(B+(1-B)*Math.max(0,Math.sin(I*21+Bt*2))),X=V>0?(A.smokes+2)%3:Bt===0?1:2;if(gt){const Pt=At.pop();At.unshift(Pt)}const Y=At[0];Y.p.copy(P[Bt]),gt&&(Y.t=I),Y.k=Ht,Y.c=X;const yt=Bt===0?Mt:-Mt;for(let Pt=1;Pt<e&&N>0;Pt++){const it=At[Pt],Xt=Math.min(Nr,I-it.t),Pe=Math.max(0,j-5-18*Xt),rt=Math.sin(I*7+it.t*13);it.p.addScaledVector(m,Pe*N).addScaledVector(_,(yt*1.6+rt*.7)*N),it.p.y+=(-1+Math.cos(I*6+it.t*11)*.5)*N}b.copy(_);for(let Pt=0;Pt<e;Pt++){const it=At[Pt],Xt=I-it.t,Pe=Math.min(1,Xt/Nr);M.subVectors(At[Math.max(0,Pt-1)].p,At[Math.min(e-1,Pt+1)].p),M.lengthSq()<1e-6&&M.copy(m),x.subVectors(U,it.p),y.crossVectors(M,x),y.lengthSq()<.03*M.lengthSq()*x.lengthSq()?y.copy(b):y.normalize(),y.dot(b)<0&&y.negate(),b.copy(y);const rt=(.14+.9*(1-Math.exp(-Xt/.4)))*(.45+.55*it.k),Gt=(Bt*e+Pt)*2;r[Gt*3]=it.p.x-y.x*rt,r[Gt*3+1]=it.p.y-y.y*rt,r[Gt*3+2]=it.p.z-y.z*rt,r[Gt*3+3]=it.p.x+y.x*rt,r[Gt*3+4]=it.p.y+y.y*rt,r[Gt*3+5]=it.p.z+y.z*rt;const he=M2[it.c];o.set(he,Gt*3),o.set(he,Gt*3+3),a[Gt]=a[Gt+1]=Pe,c[Gt]=c[Gt+1]=it.t<0?0:it.k,u[Gt]=u[Gt+1]=it.t}});for(const At of p)At.needsUpdate=!0}}}function b2(n,t,e,i,s,r,o,a){const c=g2(n,()=>n.querySelector(".hud-lantern")),l=new L,u=document.createElement("div");u.className="flash",n.appendChild(u);const h=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(f,d){if(!f.length)return;i.events(f,d.mode==="run"),s.events(f,d);const{x:p,y:v}=ue(d.z,d.x,d.v,{x:0,y:0,z:0});for(const g of f)if(g.type==="lantern")e.burst(p,v+.5,d.z+3,16,!0),r.spawn(p,v+.2,d.z+.6),l.set(p,v+.3,d.z+3).project(a),c.spawn((l.x*.5+.5)*n.clientWidth,(.5-l.y*.5)*n.clientHeight,()=>s.bumpLantern());else if(g.type==="near-miss")t.shake(.06),h();else if(g.type==="hurt"||g.type==="crash"){const m=g.type==="crash";t.shake(m?.9:.45),o.spawn(p,v,d.z+.3,ji(d.z)?"village":g.kind==="bridge"?"cloth":"rock",m),m||h()}else g.type==="booster"?e.burst(p,v,d.z+3,40,!0):g.type==="gust"&&g.full?Wa.request=1.5:g.type==="section"&&g.open&&d.mode==="run"&&i.reveal()}}}const fp=20.5,S2=17.5,dp=.1,w2=.05,T2=3,E2=.5,A2=2.5,R2=8;class C2{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(t,e){this.minScale=t,this.hooks=e}sample(t){if(t<=0||t>.1||(this.clock+=t,this.warm+=t,this.sinceChange+=t,this.warm<T2||this.sinceChange<E2)||(this.seeded||(this.ema=t*1e3,this.seeded=!0),this.ema+=(t*1e3-this.ema)*.05,this.verify&&this.sinceChange>=A2&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>fp?this.slowFor+t:0,this.fastFor=this.ema<S2?this.fastFor+t:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>fp?this.floorSlowFor+t:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const t=this.verify;this.verify=null,!(this.ema<t.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(t.prev))}down(t){if(this.slowFor=0,!t){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-dp));return}this.floorSlowFor<R2||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+dp)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const t=Math.min(1,this.scale+w2);t<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(t))??0)||this.apply(t)}key(t){return Math.round(t*100)}apply(t){this.scale=Math.round(t*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const Sl={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},gg="skyrun.quality",P2=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function L2(){try{const n=document.createElement("canvas").getContext("webgl2");if(!n)return"no-webgl2";const t=n.getExtension("WEBGL_debug_renderer_info"),e=String(t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER));return n.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function N2(n){const t=navigator;return n==="no-webgl2"||P2.test(n)||(t.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function pp(n){return n==="low"||n==="mid"||n==="high"}function I2(n){const t=L2(),e=n.get("q");if(pp(e))return{...Sl[e],gpu:t,source:"url"};let i=null;try{const[s,r]=(localStorage.getItem(gg)??"").split("|");Date.now()-Number(r)<3*864e5&&(i=s??null)}catch{}return pp(i)?{...Sl[i],gpu:t,source:"saved"}:{...Sl[N2(t)],gpu:t,source:"guess"}}function D2(n){try{localStorage.setItem(gg,`${n}|${Date.now()}`)}catch{}}function U2(n){return n==="high"?"mid":n==="mid"?"low":null}function k2(n){const t=()=>Math.min(window.devicePixelRatio,n.tier.maxDpr);let e=!1;const i=new C2(n.tier.minScale,{setScale(c){const l=t()*c;n.renderer.setPixelRatio(l),n.post.setPixelRatio(l),n.resize()},degrade(){const c=U2(n.tier.name);return c&&!e&&n.tier.source!=="url"&&(D2(c),e=!0),n.post.setLite()}});let s=performance.now(),r=0,o=s;const a=c=>{const l=(c-s)/1e3;if(n.tick(Math.min(.1,l)),s=c,n.renderer.info.reset(),n.post.render(),i.sample(l),r++,c-o>500){const u=n.renderer.info.render,h=(r*1e3/(c-o)).toFixed(0);n.stats?.(`${h} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${n.tier.name} (${n.tier.source}) · độ phân giải ${Math.round(i.scale*100)}% · ${i.frameMs().toFixed(1)} ms
${n.worldLine()}`),r=0,o=c}requestAnimationFrame(a)};return requestAnimationFrame(a),i}const vg=nn.routeVersion,F2=7*3600*1e3;function Ju(n){const t=new Date(n.getTime()+F2);return`${`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}.${nn.routePrefix}${vg}`}function O2(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0||1}function B2(n){let t=n;return()=>{const e=Ju(new Date);return{route:e,seed:n?t++:O2(e)}}}function mp(n){const t=/^\d{4}-(\d{2})-(\d{2})/.exec(n);return t?`${t[2]}/${t[1]}`:n}const Qu=20,xg=2*Math.PI*Qu,z2=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${Qu}" class="track"/>
  <circle cx="24" cy="24" r="${Qu}" class="arc" stroke-dasharray="${xg.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function H2(n,t){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${z2}<b>Đèn ×2</b>`,n.appendChild(e);const i=e.querySelector(".arc");let s=!1,r=!1,o="";return{update(a){const c=a.smokeT>0&&a.mode!=="over";if(c!==s&&(s=c,e.classList.toggle("on",s),t.classList.toggle("x2",s)),!s)return;const l=(xg*(1-a.smokeT/st.smokeTime)).toFixed(1);l!==o&&i.setAttribute("stroke-dashoffset",o=l);const u=a.smokeT<1.5;u!==r&&e.classList.toggle("ending",r=u)}}}const le=n=>`<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`,Qe='fill="currentColor" fill-opacity=".28"',Nt={lantern:'<svg class="ui-ic ui-ic-lantern" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ic-lan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3121b"/><stop offset=".55" stop-color="#ff7329"/><stop offset="1" stop-color="#ffc45a"/></linearGradient></defs><path d="M7.2 2.8h9.6l1.7 3.4c.9 1.9 1.5 4 1.5 6.1 0 3.2-1.6 5.7-3.9 6.9H7.9C5.6 18 4 15.5 4 12.3c0-2.1.6-4.2 1.5-6.1z" fill="url(#ic-lan)" stroke="#4a1006" stroke-width="1.1"/><path d="M9.4 3.2 8.6 18.8M14.6 3.2l.8 15.6M12 2.9v16" stroke="#6e1f0a" stroke-width=".8" opacity=".55" fill="none"/><ellipse cx="12" cy="19.3" rx="4.3" ry="1.15" fill="#2e0a04"/><path d="M12 22.4c-1.2-.8-1.5-2-.6-3.2.1.8.6 1.1 1 1.2.2-.6.1-1.3-.3-1.9 1.5.7 2.1 2.2 1.4 3.9z" fill="#fff0a0" stroke="#ff9a2a" stroke-width=".5"/></svg>',heart:'<svg class="ui-ic ui-ic-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="whole" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/><path class="half l" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/><path class="half r" d="M12 21s7.5-4.6 9.6-9.4c1.5-3.5-.6-7.1-4.2-7.1-2.1 0-3.6 1.2-5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/></svg>',trophy:le(`<path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" ${Qe}/><path d="M7 5.5H4.3a2.7 2.7 0 0 0 3.1 4.2M17 5.5h2.7a2.7 2.7 0 0 1-3.1 4.2M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>`),lock:le(`<rect x="5" y="10.5" width="14" height="10" rx="2.2" ${Qe}/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17"/>`),gear:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',speaker:le('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16.5 9.5l5 5m0-5-5 5"/>'),note:le('<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16"/>'),pause:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',play:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.8v14.4L19.5 12z" fill="currentColor"/></svg>',help:le('<path d="M8.8 8.8a3.3 3.3 0 1 1 4.5 3.1c-.8.3-1.3 1-1.3 1.9v.7"/><circle cx="12" cy="18.3" r=".9" fill="currentColor" stroke="none"/>'),close:le('<path d="M6 6l12 12M18 6 6 18"/>'),mountain:le(`<path d="M2.5 19.5 9 8l3.5 6 2-3 7 8.5z" ${Qe}/><path d="M7.3 11 9 12.5l1.7-1.6"/>`),route:le('<path d="M4 18.5c4-1 5-6.5 9-7.5s5-4 6.5-6.5" stroke-dasharray=".1 3.6"/><circle cx="4" cy="18.5" r="1.9" fill="currentColor"/><path d="M16 4h4v4"/>'),star:le(`<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" ${Qe}/>`),wind:le('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),thermal:le('<path d="M8 21c-2-3 2-5 0-8s2-5 0-8M16 21c-2-3 2-5 0-8s2-5 0-8"/><path d="M5.5 7 8 4.5 10.5 7M13.5 7 16 4.5 18.5 7"/>'),parachute:le(`<path d="M3 11a9 7 0 0 1 18 0z" ${Qe}/><path d="M3 11l9 9 9-9M9 11l3 9 3-9"/>`),users:le('<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.3 6-5.3s5.4 1.9 6 5.3M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.8 14.6c1.7.8 2.9 2.5 3.2 4.9"/>'),crown:le(`<path d="M3.5 8l4 4 4.5-6 4.5 6 4-4-1.8 10H5.3z" ${Qe}/>`),wingsuit:le(`<path d="M12 3.5c-3.6 3.6-7.3 5.2-9.5 5.8 2.9 1.1 5.8 1.4 7.9 3.6L12 20.5l1.6-7.6c2.1-2.2 5-2.5 7.9-3.6-2.2-.6-5.9-2.2-9.5-5.8z" ${Qe}/>`),sun:le(`<circle cx="12" cy="12" r="4" ${Qe}/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12H5M19 12h2.5M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>`),moon:le(`<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" ${Qe}/>`),home:le(`<path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" ${Qe}/>`),rotate:le('<rect x="3" y="7" width="18" height="10" rx="2.2"/><path d="M16.5 3.5a7 7 0 0 1 4 3M21 3v3.6h-3.6"/>'),chevronDown:le('<path d="M6 9l6 6 6-6"/>'),chevronRight:le('<path d="M9 6l6 6-6 6"/>'),check:le('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),dragSide:le(`<circle cx="12" cy="12" r="3.2" ${Qe}/><path d="M7.5 12H2.5M5 9.5 2.5 12 5 14.5M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5"/>`),swipeUp:le(`<circle cx="12" cy="17.5" r="3.2" ${Qe}/><path d="M12 13.5V3.5M8 7.5l4-4 4 4"/>`),swipeDown:le(`<circle cx="12" cy="6.5" r="3.2" ${Qe}/><path d="M12 10.5v10M8 16.5l4 4 4-4"/>`),tap:le('<circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity=".45"/><circle cx="12" cy="12" r="7.5" stroke-opacity=".55"/>'),pillar:le(`<path d="M9 21V6.5l1.5-3h3L15 6.5V21" ${Qe}/><path d="M3 21h18"/>`),spike:le(`<path d="M3.5 20 10 7l2.5 4L15 6l5.5 14z" ${Qe}/>`),ridge:le(`<path d="M2 20v-7l4-4 3 3 3-5 3 4 3-2 4 4v7z" ${Qe}/>`),bridge:le('<path d="M2 6c5 6 15 6 20 0M5 9.2V20M19 9.2V20M2 20h20M9 10.7v3M12 11v3M15 10.7v3"/>'),overhang:le(`<path d="M2 4h20v4l-4 3-3-2-3 4-3-3-3 2-4-2z" ${Qe}/><path d="M4 20h16"/>`),house:le(`<path d="M3 11 12 4l9 7" /><path d="M5.5 9.5V20h13V9.5" ${Qe}/>`)},V2={hurt:"heart",thermal:"thermal",shield:"parachute",wind:"wind"},G2={thermal:"Lên cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${st.smokeLanternMul} trong ${st.smokeTime} giây`},gp=2*Math.PI*24,W2=1.1,wl=n=>Math.floor(n).toLocaleString("vi-VN"),vp=n=>`×${n.toFixed(1).replace(".",",")}`;function X2(n){const t=document.createElement("div");t.className="hud",t.innerHTML=`
    <div class="hud-left">
      <div class="hud-dist-row"><div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div><span class="hud-rank-slot"></span></div>
      <div class="hud-score">${Nt.star}<b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời">
        <div class="hud-day-track"><span class="mk" style="left:24%">${Nt.sun}</span><span class="mk" style="left:64%">${Nt.moon}</span><span class="mk" style="left:86%">${Nt.lantern}</span><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span class="hud-day-no" data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${Nt.heart.repeat(st.maxHp)}</div>
      <div class="hud-lantern">${Nt.lantern}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><svg viewBox="0 0 54 54" aria-hidden="true"><circle class="bg" cx="27" cy="27" r="26"/><circle class="arc" data-k="combo" cx="27" cy="27" r="24" stroke-dasharray="${gp.toFixed(1)}"/></svg><span data-k="mult">×1,0</span></div>
    </div>
    <div class="hud-boost"><div class="hud-pill" data-k="thermal">${Nt.thermal}<b>Luồng nhiệt</b><i data-k="thermalBar"></i></div></div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-vignette" data-k="vig"></div>
    <div class="hud-stats" data-k="stats"></div>`,n.appendChild(t);const e=A=>t.querySelector(`[data-k="${A}"]`),i=["dist","score","sun","dayNo","period","lanterns","mult","multBox","combo","thermal","thermalBar","toasts","sections","stats","vig"],{dist:s,score:r,sun:o,dayNo:a,period:c,lanterns:l,mult:u,multBox:h,combo:f,thermal:d,thermalBar:p,toasts:v,sections:g,stats:m,vig:_}=Object.fromEntries(i.map(A=>[A,e(A)])),M=t.querySelector(".hud-lantern"),x=[...e("hearts").children],y=H2(t.querySelector(".hud-right"),M);let b=0,w=null,S="";const T=(A,P,I)=>{const N=document.createElement("div");N.className=`hud-toast ${P}${I?` ${I}`:""}`;const U=I&&V2[I];U&&(N.innerHTML=Nt[U]),N.append(A);const z=P==="section"?g:v;for(z.appendChild(N);z.children.length>(P==="section"?1:2);)z.firstChild.remove();return setTimeout(()=>N.remove(),P==="section"?2600:1100),N},R=(A,P)=>{const I=P>1?`SƯỢT! ${vp(A.mult)}`:"SƯỢT!",N=performance.now()/1e3;w&&w.el.isConnected&&N-w.at<W2?(w.el.textContent=I,w.el.classList.remove("bump"),w.el.offsetWidth,w.el.classList.add("bump"),clearTimeout(w.timer)):w={el:T(I,"combo"),at:N,timer:0},w.at=N;const U=w.el;w.timer=window.setTimeout(()=>U.remove(),1100)};return{toast:(A,P,I)=>{T(A,P,I)},setVisible(A){t.classList.toggle("hidden",!A)},bumpLantern(){M.classList.remove("got"),M.getBoundingClientRect(),M.classList.add("got")},setStats(A){m.textContent=A},setPilotBox(A){const P=n.clientHeight,I=A?A.y+A.h+16:0,N=!A||n.clientWidth>600?"":I<=P-150?`t${Math.round(I)}`:`b${Math.round(P-A.y+16)}`;N!==S&&(S=N,v.style.top=N[0]==="t"?`${N.slice(1)}px`:N?"auto":"",v.style.bottom=N[0]==="b"?`${N.slice(1)}px`:N?"auto":"")},update(A,P){s.textContent=wl(A.z),r.textContent=wl(sr(A)),o.style.left=`${(P.u*100).toFixed(1)}%`;const I=`Ngày ${P.day}`;a.textContent!==I&&(a.textContent=I);const N=d_(P);c.textContent!==N&&(c.textContent=N),l.textContent=wl(A.lanterns),u.textContent=vp(A.mult),h.classList.toggle("hot",A.mult>1.05);const U=A.combo>0?Math.max(0,1-A.comboT/st.comboBreak):0;f.style.strokeDashoffset=(gp*(1-U)).toFixed(1),d.classList.toggle("on",A.thermalT>0),p.style.transform=`scaleX(${A.thermalT/st.thermalTime})`,x.forEach((V,J)=>V.classList.toggle("lost",J>=A.hp)),t.classList.toggle("low-hp",A.mode==="run"&&A.hp===1&&st.maxHp>1),y.update(A);const z=_0(P);z>b&&A.mode==="run"&&T(z%3===0?`Ngày ${P.day} · ${m0[P.region]}`:z%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),b=A.mode==="run"?Math.max(b,z):0},zone(A){const P=ce.zoneNames?.[A];P&&T(P,"section")},events(A,P){for(const I of A)if(I.type==="near-miss")R(P,I.combo);else if(I.type==="hurt"){T(I.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt");for(const N of[x[I.hp],_])N?.classList.remove("hit"),N?.getBoundingClientRect(),N?.classList.add("hit")}else I.type==="booster"&&I.kind!=="lantern"?T(G2[I.kind],"big",I.kind):I.type==="gust"?T(I.full?`Trọn chuỗi gió! +${st.gustChainScore}`:`Gió xuôi ×${I.chain}`,I.full?"big":"combo","wind"):I.type==="section"&&P.mode==="run"&&!ce.zoneNames&&T(I.open?$n(P.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const $2=30,xp={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},q2=10,K2=34,Y2=260,Z2=180,J2=.26,_p=300;function Q2(n,t,e){const i=[],s=[],r=new Map;let o=!1;const a=new Map;let c=null,l=0,u=0,h=-1,f=0;const d=[],p=(M,x)=>{t()&&d.forEach(y=>y(M,x))};let v=null,g=0,m=0;window.addEventListener("keydown",M=>{if(M.repeat)return;const x=xp[M.code];if(x){i.push(x),x==="down"&&(o=!0),M.preventDefault();const y=performance.now();x===v&&x!=="down"&&y-g<_p?(p(x==="up"?"flip":"roll",x==="right"?-1:1),v=null):(v=x,g=y)}(M.code==="Space"||M.code==="Enter")&&(s.forEach(y=>y()),M.preventDefault()),r.get(M.code)?.()}),window.addEventListener("keyup",M=>{xp[M.code]==="down"&&(o=!1)}),n.addEventListener("touchstart",M=>{const x=performance.now();for(const y of Array.from(M.changedTouches))a.set(y.identifier,{x0:y.clientX,y0:y.clientY,t0:x,hist:[{y:y.clientY,t:x}],hx:[{x:y.clientX,t:x}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),n.addEventListener("touchmove",M=>{M.preventDefault();const x=performance.now();for(const y of Array.from(M.changedTouches)){const b=a.get(y.identifier);if(!b)continue;for(b.hist.push({y:y.clientY,t:x});b.hist.length>1&&x-b.hist[0].t>Y2;)b.hist.shift();const w=y.clientY-b.hist[0].y;for(x>=b.cool&&Math.abs(w)>=K2&&(i.push(w<0?"up":"down"),w<0&&x-m<_p+150?(p("flip",1),m=0):w<0&&(m=x),b.down=w>0&&c!==y.identifier,b.flicked=!0,b.cool=x+150,b.hist=[{y:y.clientY,t:x}]),b.hx.push({x:y.clientX,t:x});b.hx.length>1&&x-b.hx[0].t>Z2;)b.hx.shift();const S=y.clientX-b.hx[0].x;x>=b.rollCool&&Math.abs(S)>=n.clientWidth*J2&&(p("roll",S>0?-1:1),b.rollCool=x+700,b.hx=[{x:y.clientX,t:x}]);const T=y.clientX-b.x0;b.dragX===null&&Math.abs(T)>=q2&&Math.abs(T)>=Math.abs(y.clientY-b.y0)*.8&&(b.dragX=y.clientX,c===null&&(c=y.identifier,b.down=!1,u++,l=0)),c===y.identifier&&b.dragX!==null&&(l=(y.clientX-b.dragX)/Math.max(1,n.clientWidth))}},{passive:!1});const _=M=>{const x=performance.now();for(const y of Array.from(M.changedTouches)){const b=a.get(y.identifier);if(a.delete(y.identifier),c===y.identifier&&(c=null),!b||b.flicked||b.dragX!==null||M.type==="touchcancel")continue;Math.hypot(y.clientX-b.x0,y.clientY-b.y0)<=14&&x-b.t0<=350&&t()?i.push(y.clientX<n.clientWidth/2?"left":"right"):t()||s.forEach(S=>S())}};return n.addEventListener("touchend",_),n.addEventListener("touchcancel",_),n.addEventListener("mousedown",()=>s.forEach(M=>M())),{take(){return i.splice(0,i.length)},holdDown:()=>o||Array.from(a.values()).some(M=>M.down),steer(){if(c===null)return null;h!==u&&(h=u,f=e());let M=f-l*$2;const x=Math.abs(M)-st.steerMax;return x>0&&(f-=Math.sign(M)*x,M-=Math.sign(M)*x),M},onAction(M){s.push(M)},onKey(M,x){r.set(M,x)},onTrick(M){d.push(M)}}}function _g(n){return/\.github\.io$/.test(location.hostname)||n.has("portal")}function Mg(n){return!nn.online||n.has("seed")||n.has("z")||n.get("auto")==="1"?!1:_g(n)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function j2(n){return Mg(n)&&!n.has("alt")}function tE(n){const t={};let e=null;async function i(o,a={}){try{const c={...t,accept:"application/json"};a.body&&(c["content-type"]="application/json");const l=await fetch(o,{...a,headers:c,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function s(o,a={}){const c=await i(o,a);return e="fail"in c?c.fail:null,"ok"in c?c.ok:null}const r=encodeURIComponent;return{board:o=>s(`api/ghosts?route=${r(o)}`),async paths(o,a){return a.length?(await s(`api/ghosts/paths?route=${r(o)}&pids=${a.map(r).join(",")}`))?.paths??{}:{}},leaderboard:(o="meters")=>i(`api/leaderboard?by=${o}&map=${nn.id}`),progress:()=>s("api/progress"),submit:(o,a)=>s("api/ghosts",{method:"POST",body:JSON.stringify({route:o,...a})}),lastFailure:()=>e,async logRun(o){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(o),headers:{...t,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const o=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return o?o.type==="opaqueredirect"||o.status===401?"auth":o.ok?"ok":"network":"network"}}}const uc=10,eE=60/uc,ju=900*uc,Tl=n=>Math.max(-32768,Math.min(32767,Math.round(n*100)));function nE(n){const t=Math.min(ju,Math.floor(n.length/3)),e=new DataView(new ArrayBuffer(4+t*6)),i=n[0]??0;e.setFloat32(0,i,!0);let s=e.getFloat32(0,!0);for(let a=0;a<t;a++){const c=Tl(n[a*3]-s);s+=c/100,e.setInt16(4+a*6,c,!0),e.setInt16(6+a*6,Tl(n[a*3+1]),!0),e.setInt16(8+a*6,Tl(n[a*3+2]),!0)}let r="";const o=new Uint8Array(e.buffer);for(let a=0;a<o.length;a+=32768)r+=String.fromCharCode(...o.subarray(a,a+32768));return btoa(r)}function iE(n){let t;try{t=atob(n)}catch{return null}const e=Math.floor((t.length-4)/6);if(e<2)return null;const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);const s=new DataView(i.buffer),r={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let o=s.getFloat32(0,!0);if(!Number.isFinite(o))return null;for(let a=0;a<e;a++)o+=s.getInt16(4+a*6,!0)/100,r.z[a]=o,r.x[a]=s.getInt16(6+a*6,!0)/100,r.v[a]=s.getInt16(8+a*6,!0)/100;return r}function yg(n,t,e){const i=Math.max(0,t*uc),s=n.n-1,r=Math.min(s,Math.floor(i)),o=Math.min(s,r+1),a=Math.min(1,i-r);return e.z=n.z[r]+(n.z[o]-n.z[r])*a,e.x=n.x[r]+(n.x[o]-n.x[r])*a,e.v=n.v[r]+(n.v[o]-n.v[r])*a,e.ended=i>=s,e.after=Math.max(0,(i-s)/uc),e}const bg=5,El=4,sE=1500,rE=200,oE=120;function th(n,t,e=!1){return e?1:Math.min(1,Math.max(0,(t-sE-n*rE)/oE))}const Sg=n=>n.length===1&&n[0].self;function aE(n){const t=n.runs.find(o=>o.pid===n.me),e=n.runs.filter(o=>o.pid!==n.me),i=t?.dist??0,s=o=>o.dist>=i?o.dist-i:(i-o.dist)*2,r=[];t&&r.push(t),e[0]&&r.push(e[0]);for(const o of e.slice(1).sort((a,c)=>s(a)-s(c))){if(r.length>=bg)break;r.push(o)}return r}function cE(){let n=[];const t=[];return{ghosts:()=>n,set(e){n=[];for(const i of e){const s=iE(i.path);s&&n.push({run:i.run,self:i.self,track:s,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of n)e.ahead=null,e.downSaid=!1},update(e,i){t.length=0;const s=Sg(n);return n.forEach((r,o)=>{yg(r.track,e,r.at);const a=r.at.z-i,c=r.run.name,l=th(o,i,s)>0;l&&a>El&&r.ahead===!1&&t.push({type:"passed",name:c,self:r.self}),l&&a<-El&&r.ahead===!0&&t.push({type:"pass",name:c,self:r.self}),Math.abs(a)>El&&(r.ahead=a>0),r.at.ended&&!r.downSaid&&(r.downSaid=!0,l&&r.run.crash&&Math.abs(a)<300&&t.push({type:"down",name:c,self:r.self,dist:r.run.dist}))}),t},rank(e){return 1+n.filter(i=>i.at.z>e).length}}}function lE(){let n=[],t=0,e=!1;const i=s=>{n.length<ju*3&&n.push(s.z,s.x,s.v)};return{start(s){n=[],t=0,e=!0,i(s)},afterStep(s){e&&(t++,t%eE===0&&i(s),s.mode==="over"&&(e=!1))},seconds:()=>t/60,truncated:()=>n.length>=ju*3,finish:()=>nE(n)}}const Al="skyrun.myGhost",_a="me";function uE(n){let t=null;const e=(r,o)=>!!r&&r.route===o&&typeof r.path=="string"&&Number.isFinite(r.dist);function i(r){let o=null;try{o=JSON.parse(localStorage.getItem(Al)??"null")}catch{}const a=e(o,r)?o:null,c=e(t,r)?t:null;return a&&c?c.dist>a.dist?c:a:a??c}function s(r){const o=i(r);return{me:_a,myName:null,total:o?1:0,runs:o?[{pid:_a,name:"Bạn",dist:o.dist,score:o.score,dur:o.dur,crash:o.crash}]:[]}}return{board:async r=>s(r),async paths(r,o){const a=i(r);return a&&o.includes(_a)?{[_a]:a.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(r,o){const a=i(r),c=!a||o.dist>a.dist;if(c){t={route:r,dist:o.dist,score:o.score,dur:o.dur,crash:o.crash,path:o.path};try{localStorage.removeItem(Al),localStorage.setItem(Al,JSON.stringify(t))}catch{}}return{saved:c,best:c?o.dist:a.dist,rank:1,total:1,bestScore:o.score,scoreRank:1}},lastFailure:()=>null,logRun:n,ping:async()=>"ok"}}const hE="modulepreload",fE=function(n,t){return new URL(n,t).href},Mp={},dE=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=fE(u,i),u in Mp)return;Mp[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(i)for(let p=o.length-1;p>=0;p--){const v=o[p];if(v.href===u&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":hE,h||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((p,v)=>{d.addEventListener("load",p),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},pE="skyRuns",yp="sr-tele",bp="../../shared/",Rl=new Map;function Sp(n){let t=Rl.get(n);return t||(t=new Promise((e,i)=>{const s=document.createElement("script");s.src=n,s.onload=()=>e(),s.onerror=()=>i(new Error(`không tải được ${n}`)),document.head.appendChild(s)}),t.catch(()=>Rl.delete(n)),Rl.set(n,t)),t}function mE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function gE(n,t,e,i){const{route:s,rv:r,sv:o,alt:a,dist:c,dur:l,score:u,crash:h,tainted:f,...d}=n;return{v:1,ch:t,pk:e,at:i,route:s,rv:r,sv:o,alt:a,dist:Math.round(c*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:h??null,tainted:f,detail:JSON.stringify(d)}}let Vs=null;function vE(){return Vs||(Vs=(async()=>{await Sp(`${bp}portal-config.js`),await Sp(`${bp}portal-firebase.js`);const n=window.Portal,t=n?.FB;if(!t?.configured())throw new Error("chưa cấu hình Firebase");const e=await t.load(),i=await dE(()=>import(`${t.SDK}/firebase-app.js`),[],import.meta.url),s=i.getApps().find(a=>a.name===yp)??i.initializeApp(n.CONFIG,yp),r=e.authM.getAuth(s);await r.authStateReady(),r.currentUser||await e.authM.signInAnonymously(r);let o;try{o=e.fsM.initializeFirestore(s,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{o=e.fsM.getFirestore(s)}return{fsM:e.fsM,db:o,uid:r.currentUser.uid,limit:t.limit.bind(t)}})(),Vs.catch(()=>Vs=null),Vs)}function xE(){const n=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async t=>{try{const e=await vE();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,pE),gE(t,n,mE(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const _E=1e9,ME=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),yE=[...document.scripts].map(n=>/assets\/index-([\w-]+)\.js/.exec(n.src)?.[1]).find(Boolean)??"dev",wp=n=>n.thermalV>8?"thermal":n.v<-2?"low":n.v>2?"high":"zero",bE=(n,t)=>n>=_E?"trail":t>2?"u":t<-2?"d":"o",SE=n=>ce.zone(Ve(n),ji(n)),Ma=(n,t)=>n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:0,zn=n=>Math.round(n*100)/100;function wE(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function TE(n){let t={touch:!1,key:!1};addEventListener("keydown",()=>t.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(t.touch=!0)});let e="",i=!1,s=0,r=-1,o=null,a=c();function c(){const l=u=>Object.fromEntries(u.map(h=>[h,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke"]),bTaken:l(["thermal","shield","smoke"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1}}return{start(l,u,h){e=u,i=h,s++,o=r<0?null:zn((performance.now()-r)/1e3),t={touch:!1,key:!1},a=c(),a.lastCmd=l.time},frame(l,u,h){l>0&&l<.5&&(a.frames.length<3e4&&a.frames.push(l),a.scaleSum+=n.quality().scale*l),a.shown=Math.max(a.shown,u),a.near=h},afterStep(l,u){if(l.mode!=="run"&&l.mode!=="crash")return;const h=wp(l);a.tiers[h]+=u,a.multSum+=l.mult*u,h!=="low"?a.lowSince=-1:a.lowSince<0&&(a.lowSince=l.time);for(const f of l.events)f.type==="lane"?a.swipes.lane++:f.type==="vert"?a.swipes[f.kind==="flare"?"up":"down"]++:f.type==="hurt"?a.hurts++:f.type==="crash"&&(a.deathNear=a.near),(f.type==="lane"||f.type==="vert")&&(a.lastCmd=l.time);for(const f of l.pickups){if(f.z>l.z-3.5)break;if(!a.seen.has(f.id))if(a.seen.add(f.id),f.kind==="lantern"){const d=bE(f.id,f.v);a.lSpawn[d]++,f.taken&&a.lTaken[d]++}else a.bSpawn[f.kind]++,f.taken&&a.bTaken[f.kind]++}for(const f of l.obstacles){if(!f.passed||a.rows.has(f.row)||(a.rows.add(f.row),l.hurtRow===f.row||l.mode!=="run"))continue;const d=l.time-l.dodgeTime;d<1.5&&Ka(f,l.dodgeX,l.thermalV,0)&&a.leads.push(d),f.kind==="bridge"&&a.lowSince>=0&&l.time-a.lowSince>=.5&&a.bridgesFromLow++}},finish(l,u,h,f){r=performance.now();const d=[...a.frames].sort((M,x)=>M-x),p=a.frames.reduce((M,x)=>M+x,0),v=[...a.leads].sort((M,x)=>M-x),g=d0(),m=co(),_=n.quality();return{lv:1,route:e,rv:f,sv:nr,alt:i,build:yE,session:ME,runNo:s,wait:o,dist:Math.floor(l.z),dur:zn(l.time),score:sr(l),crash:u,tainted:h,hurts:a.hurts,device:{tier:_.tier,gov:zn(p>0?a.scaleSum/p:_.scale),fps50:Math.round(d.length?1/Ma(d,.5):0),fps5:Math.round(d.length?1/Ma(d,.95):0),input:t.touch&&t.key?"mixed":t.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:m.ghosts,music:g.music?m.music:"off",tutorial:wE()},death:u?{phase:Math.round(Ve(l.z)),zone:SE(l.z),tier:wp(l),sinceCmd:zn(l.time-a.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust)},lanterns:{spawned:a.lSpawn,taken:a.lTaken,bestStreak:l.bestStreak,avgMult:zn(l.time>0?a.multSum/l.time:1)},tiers:{low:zn(a.tiers.low),zero:zn(a.tiers.zero),high:zn(a.tiers.high),thermal:zn(a.tiers.thermal)},swipes:a.swipes,bridgesFromLow:a.bridgesFromLow,boosters:{spawned:a.bSpawn,taken:a.bTaken},lead:{p10:zn(Ma(v,.1)),p50:zn(Ma(v,.5)),n:v.length},ghosts:{shown:a.shown,deathNear:a.deathNear}}}}}const eh="skyrun.pending",EE=12e4,Tp=[1500,4e3];function ya(){try{const n=JSON.parse(localStorage.getItem(eh)??"[]");return Array.isArray(n)?n:[]}catch{return[]}}function Cl(n){try{n.length?localStorage.setItem(eh,JSON.stringify(n)):localStorage.removeItem(eh)}catch{}}function Ep(n){const t=Date.now(),e=[Ju(new Date(t)),Ju(new Date(t-864e5))].map(i=>i.slice(0,10));return typeof n.route=="string"&&e.includes(n.route.slice(0,10))&&!!n.run}function AE(n){let t=performance.now(),e=!1;const i=r=>new Promise(o=>setTimeout(o,r));async function s(r,o){for(let a=0;;a++){const c=await n.submit(r,o);if(c)return{ok:c};const l=n.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||a>=Tp.length)return{fail:l};await i(Tp[a])}}return{keepAlive(r){const o=performance.now();o-t<EE||(t=o,n.ping().then(a=>{a!=="auth"||e||(e=!0,r())}))},async submit(r,o){t=performance.now();const a={route:r,run:o,at:Date.now()};Cl([...ya().filter(Ep),a].slice(-3));const c=await s(r,o);return(!("fail"in c)||c.fail.kind==="rejected")&&Cl(ya().filter(l=>l.at!==a.at||l.route!==r)),c},async flush(){const r=ya().filter(Ep),o=[],a=[];for(const c of r)await n.submit(c.route,c.run)?o.push(c.run.dist):n.lastFailure()?.kind!=="rejected"&&a.push(c);return(r.length||ya().length)&&Cl(a),o}}}const RE=160;function CE(n,t){const e=document.createElement("div");e.className="ghost-layer";const i=Array.from({length:t},()=>{const c=document.createElement("div");return c.className="ghost-tag",e.appendChild(c),c}),s=document.createElement("span");s.className="ghost-rank",s.hidden=!0,n.appendChild(e),(n.querySelector(".hud-rank-slot")??e).appendChild(s);const r=new L,o=new WeakMap;let a="";return{update(c,l,u,h,f,d){e.classList.toggle("on",d&&u.length>0);const p=d&&h&&h.total>1?`#${h.place}/${h.total}`:"";if(p!==a&&(a=p,s.hidden=!p,s.classList.toggle("first",h?.place===1),s.innerHTML=p?`${Nt.wingsuit}#${h.place}<small>/${h.total}</small>`:""),!d)return;const v=n.clientWidth,g=n.clientHeight;i.forEach((m,_)=>{const M=_<l.count?u[l.owner[_]]:void 0,x=l.alphas[_]??0;if(!M||x<.15||Math.abs(M.at.z-f)>RE){m.style.opacity="0";return}if(r.copy(l.heads[_]).project(c),r.z>1){m.style.opacity="0";return}const y=M.self?"Kỷ lục của bạn":M.run.name;m.classList.toggle("self",M.self),m.textContent!==y&&(m.textContent=y,o.set(m,m.offsetWidth/2));const b=o.get(m)??0,w=Math.min(Math.max((r.x+1)*.5*v,b+6),v-b-6);m.style.opacity=Math.min(1,x*1.6).toFixed(2),m.style.transform=`translate(${w.toFixed(1)}px, ${((1-r.y)*.5*g).toFixed(1)}px) translate(-50%, -100%)`})}}}function In(n){for(const t of["touchstart","touchend","touchmove","pointerdown"])n.addEventListener(t,e=>e.stopPropagation(),{passive:!0});n.addEventListener("mousedown",t=>{t.stopPropagation(),t.target instanceof Element&&t.target.closest('button, [role="button"]')&&t.preventDefault()})}const Xa=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function PE(){const n=document.createElement("button");n.type="button",n.className="board-btn",n.setAttribute("aria-label","Bảng xếp hạng"),n.innerHTML=`<span class="board-btn-icon" aria-hidden="true">${Nt.trophy}</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>`,n.hidden=!0;const t=n.querySelector(".board-btn-rank");n.addEventListener("click",()=>n.classList.remove("fresh"));const e=i=>{t.hidden=!i,t.textContent=i?`#${i}`:""};return{el:n,setRank:e,bump(i){e(i),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump","fresh")},seen:()=>n.classList.remove("fresh")}}function LE(n,t,e,i){const s=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!s||Xa())return e.bump(i);const r=n.getBoundingClientRect(),o=t.getBoundingClientRect(),a=s.getBoundingClientRect(),c=o.left+o.width/2-r.left,l=o.top+o.height/2-r.top,u=a.left+a.width/2-r.left-c,h=a.top+a.height/2-r.top-l,f=document.createElement("div");f.className="rank-fly",f.innerHTML=Nt.trophy,f.style.left=`${c}px`,f.style.top=`${l}px`,n.appendChild(f);const d=(g,m,_)=>`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(${_})`;let p=!1;const v=()=>{p||(p=!0,f.remove(),e.bump(i))};f.animate([{transform:d(0,0,.6),opacity:0},{transform:d(u*.3,h*.45-70,1.7),opacity:1,offset:.35},{transform:d(u,h,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=v,setTimeout(v,900)}const nh=n=>Math.floor(n).toLocaleString("vi-VN"),ba="meters",Sa=900;function NE(n,t){const e=document.createElement("li");e.className=n.pos==="me"?"me":`ctx ${n.pos}`;for(const[i,s]of[["r",`#${n.rank}`],["n",n.pos!=="me"?n.name:"Bạn"],["v",nh(n.value)+t]]){const r=document.createElement("span");r.className=i,r.textContent=s,e.appendChild(r)}return e}function Ap(n,t,e,i,s){const r=performance.now(),o=()=>{n.textContent=s(e)},a=c=>{const l=Math.min(1,(c-r)/i);n.textContent=s(Math.round(t+(e-t)*(1-(1-l)**3))),l<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(o,i+80)}function IE(n){let t,e=0;async function i(){const r=e,o=await n.client.leaderboard(ba);if(r!==e||!("ok"in o))return;const a=o.ok.mine;t=a?{rank:a.rank,value:a[ba]??0}:null,n.button.setRank(a?.rank??null)}function s(r,o,a,c,l){const{by:u,rank:h,best:f,improved:d,climbed:p}=o,{tab:v,unit:g}=n.text(u),m=At=>c[At-1],_=[],M=m(h-1),x=m(h+1);M&&_.push({rank:h-1,name:M.name,value:M[u]??0,pos:"above"}),_.push({rank:h,name:l,value:f,pos:"me"}),x&&_.push({rank:h+1,name:x.name,value:x[u]??0,pos:"below"});const y=document.createElement("div");y.className="rank-card",y.setAttribute("role","button"),y.setAttribute("aria-label",`Xem bảng xếp hạng ${v}`);const b=document.createElement("div");b.className="rank-head",b.innerHTML=`${Nt.trophy}<b>Bảng xếp hạng</b><span class="by"></span><span class="rank-chip" hidden></span>`,b.querySelector(".by").textContent=`· ${v}`;const w=b.querySelector(".rank-chip");w.textContent=d?a===null?"Mới lên bảng":p&&a?`▲ ${a.rank-h}`:"Kỷ lục mới":"";const S=document.createElement("ol");S.className="rank-rows";const T=_.map(At=>NE(At,g));S.append(...T);const R=document.createElement("div");R.className="rank-note";const P=(a?c.slice(h,a.rank):a===null?c.slice(h):[]).map(At=>At.name),I=P.length>2?`${P.slice(0,2).join(", ")} +${P.length-2}`:P.join(", ");R.textContent=h===1&&p?"Bạn đang dẫn đầu bảng!":p&&I?`Vượt ${I}!`:a===null?"Đã có tên trên bảng!":p?`Lên hạng #${h}!`:h===1?d?"Kỷ lục mới — giữ ngôi #1":"Bạn vẫn giữ ngôi #1":d?`Kỷ lục mới — giữ hạng #${h}`:`Bay xa hơn để vượt #${h-1}`;const N=document.createElement("span");N.className="rank-more",N.textContent="Cả bảng ›",R.appendChild(N),y.append(b,S,R),In(y);let U=!1;y.addEventListener("click",At=>{At.stopPropagation(),U=!0,n.button.seen(),n.open(u)}),r.before(y);const z=T[_.findIndex(At=>At.pos==="me")],V=z.querySelector(".r"),J=()=>{w.hidden=!w.textContent,d&&z.classList.add("shine"),setTimeout(()=>{if(!d||U)return n.button.setRank(h);y.isConnected?LE(n.root,V,n.button,h):n.button.bump(h)},Xa()?0:450)};if(!p||Xa())return void setTimeout(J,Xa()?0:400);const B=z.getBoundingClientRect().height+2,K=x?T[T.length-1]:void 0,Mt={duration:Sa,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};z.animate([{transform:`translateY(${B}px)`,opacity:K?1:0},{transform:"none",opacity:1}],Mt),K?.animate([{transform:`translateY(${-B}px)`},{transform:"none"}],Mt),V.textContent=a?`#${a.rank}`:"#–";const gt=z.querySelector(".v");a&&(gt.textContent=nh(a.value)+g),setTimeout(()=>{a?Ap(V,a.rank,h,Sa,At=>`#${At}`):V.textContent=`#${h}`,Ap(gt,a?.value??0,f,Sa,At=>nh(At)+g)},380),setTimeout(J,380+Sa)}return{snapshot:i,async celebrate(r,o,a){e++;const c=r.metersRank!==void 0?"meters":"score",l=c===ba?t:void 0,u=a?n.root.querySelector(".screens.over .over-card [data-online]"):null,h=u?await n.client.leaderboard(c):null,f=h&&"ok"in h?h.ok:null,d=f?.mine?.rank??r.metersRank??r.scoreRank,p=f?.mine?.[c]??(c==="meters"?r.bestMeters??0:r.bestScore);c===ba&&(t={rank:d,value:p});const v=c==="meters"?o.dist:o.score,g=l===null||(l!==void 0?p>l.value:v>=p),m=g&&(l===null||l!==void 0&&l.rank>d);if(u?.isConnected)return s(u,{by:c,rank:d,best:p,improved:g,climbed:m},l,f?.top??[],f?.mine?.name??"");n.button.setRank(d),g&&n.button.el.classList.add("fresh")}}}function DE(n,t){const e=n.querySelector(".me");if(!e)return;e.style.position="static";const i=e.getBoundingClientRect(),s=n.getBoundingClientRect();e.style.position="",n.scrollTop+=i.top-s.top-(s.height-i.height)/2,t&&e.classList.add("me-new")}const wo=n=>Math.floor(n).toLocaleString("vi-VN"),ps={meters:{tab:"Quãng xa",icon:"route",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",icon:"star",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",icon:"lantern",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},Rp=["meters","score","lanterns"];function UE(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":n.kind==="network"?`Chưa tải được bảng (${n.status?`máy chủ báo lỗi ${n.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${n.why??n.status}).`}const Qi=(n,t,e,i="span")=>{const s=document.createElement(i);s.className=t,s.textContent=e,n.appendChild(s)},kE=n=>(n.trim().split(/\s+/).pop()??"?").charAt(0).toUpperCase()||"?",FE=(n,t)=>t==="meters"?mp(n.route):`${wo(n.dist)} m · ${mp(n.route)}`;function Cp(n,t,e,i){const s=document.createElement("li");return s.className=i?"me":"",Qi(s,"board-rank",`#${e}`),Qi(s,"board-name",i?"Bạn":n.name),Qi(s,"board-score",wo(n[t]??0)+ps[t].unit),Qi(s,"board-meta",FE(n,t)),s}function OE(n,t,e){return n.slice(0,3).map((i,s)=>{const r=document.createElement("div");return r.className=`pod pod-${s+1}${i.pid===e?" me":""}`,Qi(r,"pod-avatar",kE(i.name)),Qi(r,"pod-name",i.pid===e?"Bạn":i.name),Qi(r,"pod-val",wo(i[t]??0)+ps[t].unit,"b"),Qi(r,"pod-step",String(s+1)),r})}const BE=[1500,4e3];function zE(n,t){const e=PE(),i=e.el,s=document.createElement("div");s.className="board-panel",s.hidden=!0;const r=Rp.map(b=>`<button type="button" role="tab" class="ui-seg" data-by="${b}">${Nt[ps[b].icon]}${ps[b].tab}</button>`).join("");s.innerHTML=`
    <div class="board-card ui-indigo ui-trim" role="dialog" aria-label="Bảng xếp hạng">
      <div class="panel-head">${Nt.trophy}<div><b>${nn.name}<span class="panel-pill board-season"></span></b><small class="board-sub"></small></div></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Nt.close}</button>
      <div class="board-tabs" role="tablist">${r}</div>
      <p class="board-status"></p>
      <button type="button" class="ui-btn-cloth board-retry" hidden>${Nt.rotate}Thử lại</button>
      <div class="board-scroll" data-scroll><div class="board-podium" hidden></div><ol class="board-list"></ol></div>
    </div>`,n.append(i,s);const o=s.querySelector(".board-season"),a=s.querySelector(".board-sub"),c=s.querySelector(".board-status"),l=s.querySelector(".board-retry"),u=s.querySelector(".board-list"),h=s.querySelector(".board-podium"),f=s.querySelector("[data-scroll]"),d=[...s.querySelectorAll(".board-tabs button")];o.textContent=`Mùa ${nr}`;let p="meters";const v={};In(i),In(s);let g=0,m=!1;const _=()=>{s.hidden=!0,g++,m=!1};function M(){for(const b of d)b.setAttribute("aria-selected",String(b.dataset.by===p));a.textContent=ps[p].sub}async function x(){s.hidden=!1,M(),l.hidden=!0,c.textContent="Đang tải…",c.classList.remove("empty"),u.replaceChildren(),h.replaceChildren(),h.hidden=!0;const b=++g,w=p,S=ps[w];let T=await t.leaderboard(w);for(const A of BE){if(b!==g||"ok"in T||T.fail.kind!=="network")break;await new Promise(P=>setTimeout(P,A)),b===g&&(T=await t.leaderboard(w))}if(b!==g)return;if("fail"in T){const A=v[w];c.textContent=UE(T.fail)+(A?` Bảng ĐÃ ghi ${S.best} của bạn: ${wo(A.best)}${S.unit} — hạng #${A.rank}.`:""),l.hidden=T.fail.kind==="auth";return}const R=T.ok;if(o.textContent=`Mùa ${R.season}`,!R.top.length){c.innerHTML=`${Nt.lantern}<span>${S.empty}</span>`,c.classList.add("empty");return}if(c.textContent=`${wo(R.total)} ${S.count}`,h.replaceChildren(...OE(R.top,w,R.me)),h.hidden=!1,u.replaceChildren(...R.top.slice(3).map((A,P)=>Cp(A,w,P+4,A.pid===R.me))),R.mine&&!R.top.some(A=>A.pid===R.me)){const A=document.createElement("li");A.className="board-gap",A.textContent="…",u.append(A,Cp(R.mine,w,R.mine.rank,!0))}DE(f,m),m=!1}const y=IE({root:n,client:t,button:e,text:b=>ps[b],open:b=>(p=b,m=!0,void x())});y.snapshot(),i.addEventListener("click",()=>{x()}),l.addEventListener("click",()=>{x()});for(const b of d)b.addEventListener("click",()=>{p=Rp.find(w=>w===b.dataset.by)??"meters",x()});return s.querySelector("[data-close]").addEventListener("click",_),s.addEventListener("click",b=>{b.target===s&&_()}),window.addEventListener("keydown",b=>{b.code==="Escape"&&!s.hidden&&_()}),{setAvailable(b){i.hidden!==!b&&(i.hidden=!b,b||_())},runStart(){_(),y.snapshot()},remember(b,w,S){v.score={best:b.bestScore,rank:b.scoreRank},b.metersRank!==void 0&&(v.meters={best:b.bestMeters??0,rank:b.metersRank}),b.lanternRank!==void 0&&(v.lanterns={best:b.bestLanterns??0,rank:b.lanternRank}),y.celebrate(b,w,S)}}}const xs=n=>Math.floor(n).toLocaleString("vi-VN");function HE(n,t){const e=n.runs[0];if(t)return e?[{icon:"wingsuit",text:`Bóng hôm nay ${xs(e.dist)} m`}]:[];if(!e)return[{icon:"crown",text:"Chưa ai bay hôm nay — mở đường!"}];const i=e.pid===n.me?"Bạn":e.name;return[{icon:"users",text:`${xs(n.total)} người bay hôm nay`},{icon:"crown",text:`${i} ${xs(e.dist)} m`}]}function VE(n,t){return t?[{icon:"wingsuit",text:n.saved?`Bóng mới ${xs(n.best)} m`:`Bóng hôm nay ${xs(n.best)} m`}]:[]}const GE=n=>({score:n.scoreRank,lantern:n.lanternRank||null});function WE(n,t){if(!n)return null;let e=0,i=0;for(const r of n.runs)r.pid===n.me&&(e=r.dist);const s=Math.max(t,e);for(const r of n.runs)r.pid!==n.me&&r.dist>s&&i++;return{place:i+1,total:n.total+(e>0?0:1)}}const XE=n=>`Ván có bot lái hoặc nhảy quãng — ${n?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function $E(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":n.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${n.why??n.status}).`}function qE(n){return n.type==="pass"?n.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${n.name}!`,"combo"]:n.type==="passed"?[n.self?"Kỷ lục của bạn vượt lên":`${n.name} vượt lên`,"big"]:[n.self?`Kỷ lục của bạn dừng ở ${xs(n.dist)} m`:`${n.name} rơi ở ${xs(n.dist)} m`,"big"]}const KE=200,YE=1.2,ZE=n=>Math.floor(n).toLocaleString("vi-VN");function JE(n){const t=j2(n.params),e=_g(n.params),i=e?uE(xE()):tE(n.params),s=Mg(n.params)?TE({quality:n.quality}):null,r=lE(),o=AE(i),a=cE(),c=CE(n.root,bg),l=t&&!e?zE(n.root,i):null;let u="",h=0,f=!1,d=-9,p=null,v=0,g=!1,m=0,_=null,M="";const x=b=>{M=b,n.screens.setOnline(b)};async function y(b,w){u=b;const S=++h,T=await o.flush(),R=await i.board(b);if(S!==h||!R)return;_=R;const A=T.length?`Đã gửi bù ván ${ZE(Math.max(...T))} m`:"";w?(n.screens.setChips(HE(R,e)),x(A)):A&&x(M?`${M} · ${A}`:A);const P=aE(R),I=await i.paths(b,P.map(U=>U.pid));if(S!==h)return;const N=P.filter(U=>I[U.pid]).map(U=>({run:U,self:U.pid===R.me,path:I[U.pid]}));f?p=N:a.set(N)}return t&&y(n.route,!0),{runStart(b,w){t&&w!==u&&(a.set([]),p=null,y(w,!1)),p&&a.set(p),p=null,r.start(b),a.reset(),f=!0,l?.runStart(),d=-9,v++,g=!1,m=b.z,s?.start(b,w,n.params.has("alt"))},afterStep(b,w){(w||Math.abs(b.z-m)>10)&&(g=!0),m=b.z,r.afterStep(b),s?.afterStep(b,1/60)},present(b,w,S,T){const R=f&&(b.mode==="run"||b.mode==="crash"),A=r.seconds()-(1-S)/60;if(R)for(const P of a.update(A,w.z))b.mode!=="run"||A-d<YE||(d=A,n.hud.toast(...qE(P)));if(t&&!e&&o.keepAlive(()=>R?n.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):x(`${M?`${M} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),n.view.update(R?a.ghosts():[],w,A,T,n.camera.position),s&&b.mode==="run"){let P=!1;for(let I=0;I<n.view.count;I++)P||=n.view.heads[I].distanceTo(n.camera.position)<15;s.frame(T,n.view.count,P)}c.update(n.camera,n.view,a.ghosts(),WE(_,w.z),w.z,R),l?.setAvailable(n.screens.visible()!==null)},async progress(){if(!t||e)return null;const b=await i.progress();return b?{score:b.season===nr?b.score:{},meters:b.meters??{}}:null},async runOver(b,w){if(f=!1,s&&i.logRun(s.finish(b,w,g,n.rv)),!t||!u||b.z<KE)return;if(g)return x(XE(e));const S=v;e||x("Đang gửi ván lên bảng…");const T=await o.submit(u,{sv:nr,lanterns:b.lanterns,dist:Math.floor(b.z),score:sr(b),dur:Math.min(3600,Math.round(r.seconds()*10)/10),crash:r.truncated()?null:w,path:r.finish()});S===v&&("fail"in T?x($E(T.fail)):(x(""),n.screens.setChips(VE(T.ok,e)),e||n.screens.setRanks(GE(T.ok)))),"ok"in T&&l?.remember(T.ok,{dist:Math.floor(b.z),score:sr(b)},S===v),"ok"in T&&await y(u,!1)}}}const wg=()=>`<button type="button" class="ui-badge" data-snd="sfx" aria-label="Tắt/bật tiếng hiệu ứng">${Nt.speaker}</button><button type="button" class="ui-badge" data-snd="music" aria-label="Tắt/bật nhạc nền">${Nt.note}</button>`;function QE(n,t){const e=document.createElement("div");e.className="sound-btns",e.dataset.state="idle",e.innerHTML=wg(),n.appendChild(e),In(e);const i=()=>{const r=t.prefs();for(const o of n.querySelectorAll("[data-snd]"))o.classList.toggle("off",!r[o.dataset.snd])},s=r=>{t.prefs()[r]&&t.justUnlocked()||(r==="sfx"?t.toggleSfx:t.toggleMusic)(),i()};return n.addEventListener("click",r=>{const o=r.target instanceof Element?r.target.closest("[data-snd]"):null;o&&(r.stopPropagation(),s(o.dataset.snd==="sfx"?"sfx":"music"))}),i(),{sync:i,toggle:s,el:e}}const jE=.8;function tA(n,t,e){const i=document.createElement("button");i.type="button",i.className="ui-badge pause-btn",i.setAttribute("aria-label","Tạm dừng"),i.innerHTML=Nt.pause,t.prepend(i);const s=document.createElement("div");s.className="pause-screen",s.innerHTML=`<div class="pause-card ui-indigo ui-trim" role="dialog" aria-label="Tạm dừng">
      <div class="pause-title">${Nt.pause}Tạm dừng</div>
      <button type="button" class="ui-btn-lacquer" data-resume>${Nt.play}Bay tiếp</button>
      <div class="pause-row">${wg()}<button type="button" class="ui-badge" data-open-settings aria-label="Cài đặt">${Nt.gear}</button></div>
      <button type="button" class="ui-btn-cloth pause-home" data-home>${Nt.home}Về sảnh</button>
      <div class="pause-confirm" hidden><p>Bỏ ván này?</p><div class="row">
        <button type="button" class="ui-btn-cloth" data-stay>Ở lại</button><button type="button" class="ui-btn-cloth quit" data-quit>Bỏ ván</button></div></div>
      <div class="pause-hint">${e.touch?"Hoặc chạm ra ngoài bảng":"Hoặc bấm Space / P"}</div></div>`,n.appendChild(s),In(s);const r=s.querySelector("[data-home]"),o=s.querySelector(".pause-confirm"),a=p=>{o.hidden=!p,r.hidden=p};let c=!1,l=!1,u=!1,h=1;const f=()=>{s.classList.toggle("on",c),t.dataset.state=u?"crash":l?c?"paused":"run":"idle",c||a(!1)},d={paused:()=>c,pause(){!l||c||(c=!0,f())},resume(){c&&(c=!1,h=.15,f())},setRunning(p,v=!1){l===p&&u===v||(l=p,u=v,p||(c=!1),f())},factor(p){return c?0:(h=Math.min(1,h+p/jE),h)}};return i.addEventListener("click",()=>d.pause()),s.addEventListener("click",p=>{const v=p.target instanceof Element?p.target:null;v&&(v===s||v.closest("[data-resume]")?d.resume():v.closest("[data-home]")?a(!0):v.closest("[data-stay]")?a(!1):v.closest("[data-quit]")&&(d.resume(),e.onHome()))}),In(i),document.addEventListener("visibilitychange",()=>{document.hidden&&d.pause()}),window.addEventListener("keydown",p=>{!p.repeat&&(p.code==="KeyP"||p.code==="Escape")&&(c?d.resume:d.pause)()}),d}const eA=1.2,Pl=new L,Ir=new L,Pp=new L;function Lp(n,t,e){const i=e.clientWidth,s=e.clientHeight;if(!i||!s||(n.getWorldPosition(Pl),Ir.copy(Pl).project(t),Ir.z>1))return null;Pp.setFromMatrixColumn(t.matrixWorld,0).multiplyScalar(eA).add(Pl).project(t);const r=Math.abs(Pp.x-Ir.x)*.5*i,o=(Ir.x*.5+.5)*i,a=(.5-Ir.y*.5)*s;return{x:o-r,y:a-r,w:2*r,h:2*r}}function nA(n,t="ui-chip"){const e=document.createElement("span");e.className=`${t}${n.tone?` ${n.tone}`:""}`,e.innerHTML=Nt[n.icon];const i=document.createElement("span");return i.textContent=n.text,e.appendChild(i),e}function Tg(n,t,e){n&&(n.replaceChildren(...(t??[]).map(i=>nA(i,e))),n.hidden=!t?.length)}const iA=[["dragSide","Kéo ngang: lượn tránh cột đá","← →"],["swipeUp","Vuốt lên: vọt qua mỏm đá","↑"],["swipeDown","Vuốt xuống: chui dưới cầu","↓"],["lantern","Nhặt đèn trời: nhân điểm",""],["heart","Hai tim: va nhẹ chỉ mất một",""]];function sA(n){const t=document.createElement("div");t.className="help-panel",t.hidden=!0,t.innerHTML=`
    <div class="help-card ui-indigo ui-trim" role="dialog" aria-label="Cách chơi">
      <div class="panel-head">${Nt.help}<b>Cách chơi</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Nt.close}</button>
      <ul class="help-rows">${iA.map(([i,s,r])=>`<li><span class="help-ic">${Nt[i]}</span><span>${s}</span>${r?`<kbd class="key-only">${r}</kbd>`:""}</li>`).join("")}</ul>
      <p class="help-keys key-only"><kbd>P</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</p>
      <button type="button" class="ui-btn-lacquer" data-close>${Nt.check}Đã hiểu</button>
    </div>`,n.appendChild(t),In(t);const e=()=>{t.hidden=!0};return t.addEventListener("click",i=>{i.stopPropagation();const s=i.target instanceof Element?i.target:null;(s===t||s?.closest("[data-close]"))&&e()}),window.addEventListener("keydown",i=>{!t.hidden&&(i.code==="Escape"||i.code==="Space"||i.code==="Enter")&&e()},{capture:!0}),{open:()=>{t.hidden=!1}}}const ih="skyrun.best",Eg=n=>`skyrun.best.${n}`;function Ag(n){try{const t=localStorage.getItem(Eg(n));if(t){const i=JSON.parse(t);return{m:Number(i.m)||0,score:Number(i.score)||0}}const e=n==="khau-pha"&&Number(localStorage.getItem(ih))||0;return e>0?{m:0,score:e}:null}catch{return null}}function Rg(n){return Ag(n)}function rA(n,t,e){const i=Ag(n),s={m:Math.max(i?.m??0,Math.floor(t)),score:Math.max(i?.score??0,e)},r=Math.floor(t)>(i?.m??0),o=!r&&i!==null&&Math.floor(t)===i.m&&i.m>0;try{localStorage.setItem(Eg(n),JSON.stringify(s)),e>(Number(localStorage.getItem(ih))||0)&&localStorage.setItem(ih,String(e))}catch{}return{best:s,record:r,tie:o,first:i===null}}const js=n=>Math.floor(n).toLocaleString("vi-VN"),oA={pillar:["pillar","dragSide","Kéo ngang sang làn trống","Bấm ← → sang làn trống"],spike:["spike","swipeUp","Vuốt lên để vọt qua","Bấm ↑ để vọt qua"],ridge:["ridge","swipeUp","Vuốt lên vọt qua sống đá","Bấm ↑ vọt qua sống đá"],bridge:["bridge","swipeDown","Vuốt xuống chui dưới cầu","Bấm ↓ chui dưới cầu"],overhang:["overhang","swipeDown","Vuốt xuống chui dưới mái đá","Bấm ↓ chui dưới mái đá"]},aA={spike:["house","swipeUp","Vuốt lên vọt qua nóc nhà","Bấm ↑ vọt qua nóc nhà"],ridge:["house","swipeUp","Vuốt lên vọt qua mái đình","Bấm ↑ vọt qua mái đình"],bridge:["house","swipeDown","Vuốt xuống chui qua cổng làng","Bấm ↓ chui qua cổng làng"]};function cA(n,t,e){if(matchMedia("(prefers-reduced-motion: reduce)").matches||t<=0)return void(n.textContent=js(t));const i=performance.now(),s=r=>{const o=Math.min(1,(r-i)/e);n.textContent=js(t*(1-(1-o)**3)),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s),setTimeout(()=>{n.textContent=js(t)},e+80)}function lA(n,t){const[e,i]=n.querySelectorAll("[data-stats] > .ui-chip"),s=(r,o)=>{if(!r||!o||r.textContent?.startsWith("0 "))return;const a=r.querySelector(".chip-rank")??r.appendChild(document.createElement("b"));a.className="chip-rank",a.textContent=`#${o}`};s(e,t.score),s(i,t.lantern)}function uA(n,t,e,i){const s=sr(t),r=rA(Cn,t.z,s),o=r.record?'<span class="ui-ribbon">Kỷ lục mới!</span>':r.tie?'<span class="ui-ribbon tie">Bằng kỷ lục</span>':'<span class="over-kicker">Hạ cánh khẩn cấp</span>',a=e?ji(t.z)&&aA[e]||oA[e]:null;return n.innerHTML=`
    <div class="over-card ui-paper" role="dialog" aria-label="Kết thúc ván">
      <div class="over-left">
        <div class="over-head">${o}</div>
        <div class="over-hero"><span data-count>0</span><small>m</small></div>
        <div class="over-chips" data-stats></div>
        ${a?`<p class="over-tip"><span class="ico">${Nt[a[0]]}${Nt[a[1]]}</span><span>${i?a[2]:a[3]}</span></p>`:""}
      </div>
      <div class="over-right">
        <div class="over-online-chips" data-chips hidden></div>
        <div class="screen-online" data-online hidden></div>
        <div class="over-actions">
          <button type="button" class="ui-btn-lacquer btn-play" data-play>${Nt.play}<span>Bay lại</span><kbd>Space</kbd></button>
          <button type="button" class="ui-btn-cloth" data-lobby aria-label="Về sảnh chọn map">${Nt.home}Sảnh</button>
        </div>
      </div>
    </div>`,Tg(n.querySelector("[data-stats]"),[{icon:"star",text:`${js(s)} điểm`},{icon:"lantern",text:`${js(t.lanterns)} đèn`},...r.record||r.first?[]:[{icon:"trophy",text:`Kỷ lục ${js(r.best.m)} m`,tone:"gold"}]]),cA(n.querySelector("[data-count]"),t.z,900),r.record}const Np=n=>Math.floor(n).toLocaleString("vi-VN");function hA(){const n=Rg(Cn);return n?n.m>0?{icon:"trophy",text:`Kỷ lục ${Np(n.m)} m`,tone:"gold"}:{icon:"trophy",text:`Kỷ lục ${Np(n.score)} điểm`,tone:"gold"}:null}function fA(){return`
    <div class="title-top">
      <img class="title-logo" src="ui/logo.webp" alt="Sky Run" width="840" height="263" decoding="async">
      <h1 class="title-word">Sky Run</h1>
      <button type="button" class="title-map" data-lobby aria-label="Chọn map — đang ở ${nn.name}">${Nt.mountain}<span>${nn.name}</span>${Nt.chevronDown}</button>
    </div>
    <div class="title-bottom">
      <div class="title-chips" data-chips hidden></div>
      <div class="title-actions">
        <button type="button" class="ui-badge title-help" data-help aria-label="Cách chơi">${Nt.help}</button>
        <button type="button" class="ui-btn-lacquer btn-play" data-play>${Nt.play}<span>Bay</span><kbd>Space</kbd></button>
      </div>
      <div class="screen-online" data-online hidden></div>
    </div>`}function dA(n){const t=n.querySelector(".title-logo");if(!t)return;const e=()=>{n.classList.add("no-logo")};t.complete&&!t.naturalWidth?e():t.addEventListener("error",e,{once:!0})}const pA=800,mA=350;function gA(n,t,e){const i=document.createElement("div");i.className="screens",n.appendChild(i);const s=sA(n),r=matchMedia("(pointer: coarse)").matches;let o=null,a=0,c="",l=[],u=0;const h=()=>{const p=i.querySelector("[data-online]");p&&(p.textContent=c,p.hidden=!c);const v=o==="title"?hA():null;Tg(i.querySelector("[data-chips]"),v?[v,...l]:l)};i.addEventListener("click",p=>{const g=(p.target instanceof Element?p.target:null)?.closest("[data-play],[data-lobby],[data-help]");g&&(p.stopPropagation(),g.dataset.play!==void 0?t():g.dataset.lobby!==void 0?e():s.open())});const f=()=>{for(const p of i.querySelectorAll("button"))In(p)},d=()=>{clearTimeout(u),i.classList.remove("leaving")};return{visible:()=>o,tapReady:()=>o!=="over"||performance.now()-a>pA,showTitle(){d(),o="title",i.className="screens title",i.innerHTML=fA(),dA(i),f(),h()},setOnline(p){c=p??"",h()},setChips(p){l=p??[],h()},setRanks(p){o==="over"&&lA(i,p)},showOver(p,v){d(),o="over",a=performance.now(),i.className="screens over";const g=uA(i,p,v,r);return f(),c="",l=[],h(),g},hide(){const p=o;if(o=null,p!=="title"||matchMedia("(prefers-reduced-motion: reduce)").matches){i.className="screens",i.innerHTML="";return}i.classList.add("leaving"),u=window.setTimeout(()=>{i.className="screens",i.innerHTML=""},mA)}}}const vA=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],xA={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách — hết bài tự sang bài khác"},Ip=n=>`<div class="two" data-sw="${n}"><button type="button" class="ui-seg" data-on="1">Bật</button><button type="button" class="ui-seg" data-on="0">Tắt</button></div>`;function _A(n,t,e,i,s){i.mode=co().ghosts;const r=document.createElement("button");r.type="button",r.className="ui-badge",r.dataset.openSettings="",r.setAttribute("aria-label","Cài đặt"),r.innerHTML=Nt.gear,t.el.insertBefore(r,t.el.querySelector("[data-snd]"));const o=document.createElement("div");o.className="settings-panel",o.hidden=!0,o.innerHTML=`
    <div class="settings-card ui-indigo ui-trim" role="dialog" aria-label="Cài đặt">
      <div class="panel-head">${Nt.gear}<b>Cài đặt</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Nt.close}</button>
      <div class="settings-scroll" data-scroll>
        <h3>${Nt.speaker}Âm thanh</h3>
        <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span>${Ip("sfx")}</div>
        <div class="settings-row"><span>Nhạc nền</span>${Ip("music")}</div>
        <h3>${Nt.note}Chọn nhạc nền</h3><p class="settings-note"></p><div class="settings-music"></div>
        <h3>${Nt.wingsuit}Bóng ma <small>người đã bay hôm nay</small></h3><div class="settings-ghost"></div>
      </div>
    </div>`,n.append(o),In(o);const a=o.querySelector(".settings-note"),c=[xA,...Qr].map(p=>{const v=document.createElement("button");return v.type="button",v.className=`ui-seg settings-opt${p.id==="shuffle"?" shuffle":""}`,v.dataset.music=p.id,v.title=p.style,v.innerHTML='<span class="name"></span><span class="now">♪</span>',v.querySelector(".name").textContent=p.label,v});o.querySelector(".settings-music").append(...c);const l=vA.map(([p,v])=>{const g=document.createElement("button");return g.type="button",g.className="ui-seg",g.dataset.ghost=p,g.innerHTML=`${Nt.wingsuit}<span>${v}</span>`,g});o.querySelector(".settings-ghost").append(...l);const u=()=>{const p=e.music(),v=p?.choice()??co().music,g=p?.playing()?.id,m=p?.loading()?.id;for(const M of c){const x=M.dataset.music;M.classList.toggle("on",x===v),M.classList.toggle("playing",x===g||x===m),M.classList.toggle("loading",x===m)}const _=e.prefs();a.textContent=_.music?"":"Nhạc đang tắt — chọn một bài là bật lại.";for(const M of l)M.classList.toggle("on",M.dataset.ghost===i.mode);for(const M of o.querySelectorAll("[data-sw] [data-on]")){const x=M.parentElement.dataset.sw;M.classList.toggle("on",_[x]===(M.dataset.on==="1"))}};let h=0;const f=()=>{o.hidden=!0,clearInterval(h)},d=()=>{s.pause(),o.hidden=!1,u(),h=window.setInterval(u,1e3)};In(r),n.addEventListener("click",p=>{p.target instanceof Element&&p.target.closest("[data-open-settings]")&&d()}),o.addEventListener("click",p=>{const v=p.target instanceof Element?p.target:null;if(v===o||v?.closest("[data-close]"))return f();const g=v?.closest("[data-music],[data-ghost],[data-on]");if(g){if(g.dataset.on){const m=g.parentElement.dataset.sw;e.prefs()[m]!==(g.dataset.on==="1")&&(m==="sfx"?e.toggleSfx:e.toggleMusic)()}else g.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(g.dataset.music)):(i.mode=g.dataset.ghost,p0({ghosts:i.mode}));t.sync(),u()}}),window.addEventListener("keydown",p=>{o.hidden||(p.stopPropagation(),p.code==="Escape"&&f())},{capture:!0})}const gs=8;function Cg(n,t,e,i,s){const r=t-n;if(r<=1||s<=n+4)return Number.NaN;const o=Math.min(1,Math.pow((s-n)/r,1/1.5)),a=e*Me(.2,.55,i);return a+o*(e-a)}function Pg(n,t){const e=Ve(n),i=ce.road(e);if(i<.02)return null;const s=Kn(n),r=Dn(n),o=s-ce.roadDepth(e),a=Cg(Lg(n),s,ir(n),r,o);return Number.isNaN(a)?null:(t.lat=a,t.y=o,t.amount=i,t)}function Lg(n){const t=Kn(n);return Me(t-Me(150,240,Dn(n))-Co(n),Ne(n)-13,_h(n))}const MA=2.6,yA=60,Ng=[];for(const n of Ro.segs)n.k===0||Math.abs(n.k*n.len)<MA||Ng.push({x:n.x+Math.cos(n.th)/n.k,z:n.z-Math.sin(n.th)/n.k,r:Math.abs(1/n.k)-yA,u:n.u0});function bA(n,t,e){const i=Ro,s=Math.round((t+i.oz-i.bz)/i.endZ);for(let r=s-1;r<=s+1;r++)for(const o of Ng){const a=r*i.endX-i.ox+o.x,c=r*i.endZ-i.oz+o.z,l=Math.hypot(n-a,t-c)/o.r;if(l>=1)continue;const u=r*Ri-ai+o.u,h=Kn(u)-Me(150,240,Dn(u+300))-Co(u+300),f=Kn(u)+70+50*(Gn(n/70,t/70,3,91)-.5);let d=h+(f-h)*Math.pow(1-l*l,.6)+40*(Gn(n/45,t/45,3,94)-.5)*(1-l);const p=(d-h)/45+.8*(Gn(n/90,t/90,2,93)-.5);d=Me(d,h+(Math.floor(p)+Et(.55,1,p-Math.floor(p)))*45,.85),d>e&&(e=Me(e,d,1-Et(.75,1,l)))}return e}const SA=128,wA=1024,Dp=new Map,Ll={s:0,lat:0,dist:0},Up=new WeakMap;function TA(n,t,e){let i=Up.get(n);i||Up.set(n,i=new Map);const s=t*4096+e,r=i.get(s);if(r)return r;const o=n.segs[e],a=t*n.endX-n.ox+o.x,c=t*n.endZ-n.oz+o.z,l=Math.sin(o.th),u=Math.cos(o.th),h={x:a,z:c,s0:t*Ri-ai+o.u0,len:o.len,k:o.k,th:o.th,sin:l,cos:u,cx:o.k===0?0:a+u/o.k,cz:o.k===0?0:c-l/o.k,r:o.k===0?0:Math.abs(1/o.k),sg:Math.sign(o.k),bx:t*n.endX-n.ox+o.bx,bz:t*n.endZ-n.oz+o.bz,br:o.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return kp(n,t,e,-1,h,"p",o.k===0),kp(n,t,e,1,h,"n",o.k===0),i.set(s,h),h}function EA(n,t,e,i,s){const r=i*Math.SQRT2/2,o=(t+.5)*i,a=(e+.5)*i,c=Math.round((a+n.oz-n.bz)/n.endZ);hx(o,a,(c-3)*Ri-ai,(c+4)*Ri-ai,Ll,n);const l=Ll.dist+2*r+s,u=[];for(let f=c-3;f<=c+4;f++){const d=f*n.endX-n.ox,p=f*n.endZ-n.oz;if(Math.hypot(o-d-n.bx,a-p-n.bz)-n.br>l)continue;const v=n.segs.length-1;for(let g=0;g<=v;g++){const m=n.segs[g];Math.hypot(o-d-m.bx,a-p-m.bz)-m.br>l||u.push(TA(n,f,g))}}const h=f=>Math.hypot(o-f.bx,a-f.bz)-f.br;return u.sort((f,d)=>h(f)-h(d)),{far:Ll.dist-r>600,cands:u}}function kp(n,t,e,i,s,r,o){const a=n.segs.length-1;for(let c=0;c<=a;c++){e+=i,e<0?(e=a,t--):e>a&&(e=0,t++);const l=n.segs[e];if(l.k===0){if(o)continue;return}const u=t*n.endX-n.ox+l.x+Math.cos(l.th)/l.k,h=t*n.endZ-n.oz+l.z-Math.sin(l.th)/l.k;r==="p"?(s.pcx=u,s.pcz=h,s.pr=Math.abs(1/l.k)):(s.ncx=u,s.ncz=h,s.nr=Math.abs(1/l.k));return}}function Fp(n,t,e,i,s,r,o){const a=Math.floor(e/s),c=Math.floor(i/s),l=(a*1000003+c)*2+r;let u=n.get(l);return u||n.set(l,u=EA(t,a,c,s,o)),u}function AA(n,t,e,i){const s=`${e}`;let r=Dp.get(s);(!r||r.size>4e4)&&Dp.set(s,r=new Map);const o=Fp(r,i,n,t,wA,1,e);return o.far?o.cands:Fp(r,i,n,t,SA,0,e).cands}const wa=30;function af(n,t,e,i,s=Ro){const r=AA(n,t,e,s);let o=1/0,a=0,c=0;for(const u of r){if(Math.hypot(n-u.bx,t-u.bz)-u.br>o+e)continue;let h,f,d=1/0;if(u.k===0){const M=n-u.x,x=t-u.z;h=M*u.sin+x*u.cos,f=M*u.cos-x*u.sin}else{const M=n-u.cx,x=t-u.cz;let b=Math.atan2(u.sg*x,-u.sg*M)-u.th;if(b-=2*Math.PI*Math.round((b-u.k*u.len/2)/(2*Math.PI)),h=b/u.k,d=Math.hypot(M,x),f=u.sg*(u.r-d),d<wa){const w=Op[c++]??={s:0,lat:0,dist:0,prom:0,core:0};w.s=u.s0+u.len/2,w.lat=0,w.dist=u.r-d,w.prom=0,w.core=1-d/wa*(d/wa)*(3-2*d/wa)}d+=u.r}if(h<-.01||h>u.len+.01)continue;const p=Math.abs(f);if(p>o+e)continue;p<o&&(o=p);const v=u.s0+Math.min(u.len,Math.max(0,h));let g=!1;for(let M=0;M<a;M++)Math.abs(i[M].s-v)<.5&&(g=!0);if(g)continue;let m=d-p;u.pr>0&&(m=Math.min(m,Math.hypot(n-u.pcx,t-u.pcz)+u.pr-p)),u.nr>0&&(m=Math.min(m,Math.hypot(n-u.ncx,t-u.ncz)+u.nr-p));const _=i[a]??={s:0,lat:0,dist:0,prom:0,core:0};_.s=v,_.lat=f,_.dist=p,_.prom=Math.max(0,m),_.core=0,a++}let l=0;for(let u=0;u<a;u++){if(i[u].dist>o+e)continue;const h=i[l],f=i[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=0,l++}for(let u=0;u<c;u++){const h=i[l++]??={s:0,lat:0,dist:0,prom:0,core:0},f=Op[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=f.core}return l}const Op=[],Bp=[];function sh(n,t,e,i){const s=af(n,t,0,Bp);for(let r=0;r<s;r++){const o=Bp[r];if(o.core===0&&Math.abs(o.s-e)<=Math.abs(i)+80)return!0}return!1}const zp=24,hc=520,Dr=15,RA=14,Hp=200,CA=60,jt={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},Gs={n210:()=>Number.isNaN(jt.n210)?jt.n210=Gn(jt.x/210,jt.z/210,3,21):jt.n210,n700:()=>Number.isNaN(jt.n700)?jt.n700=Gn(jt.x/700,jt.z/700,3,5):jt.n700,n500:()=>Number.isNaN(jt.n500)?jt.n500=Gn(jt.x/500,jt.z/500,2,3):jt.n500,out:()=>Number.isNaN(jt.out)?jt.out=90*Df(jt.x/800,jt.z/800,4,7)+30*(Gn(jt.x/160,jt.z/160,3,11)-.5):jt.out,far:()=>Number.isNaN(jt.far)?jt.far=250+1150*Df(jt.x/3200,jt.z/3200,5,9):jt.far,n90:()=>Number.isNaN(jt.n90)?jt.n90=Gn(jt.x/90,jt.z/90,2,71):jt.n90},ve={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function PA(n,t){const{o:e,ty:i,w:s,sill:r,fly:o,vil:a,xd:c,ra:l,rd:u}=ve,h=Me(i-Me(150,240,e)-c,o-13,r),f=Yr(c/190),d=i-h;let p;if(n<=s){const y=s*Me(.2,.55,e),b=Yr((n-y)/(s-y));p=h+d*Me(Math.pow(b,1.5),b*b*(3-2*b),e),e>0&&(p+=e*34*(Gs.n210()-.35)*Et(25,110,n))}else{const y=Yr((n-s)/Me(280,700,e));p=i+(Me(400,-50,e)-260*f+140*(Gs.n700()-.5))*(1-(1-y)*(1-y))}const v=Et(s*.9,s*1.25,n),g=Et(Dr+8,Dr+22,n)*(1-v)*(1-e),m=Me(zp,zp*.5,g),_=Math.max(.7*v,.85*g)*(1-.6*f);if(_>0){const y=(p+30*(Gs.n500()-.5))/m;p=Me(p,(Math.floor(y)+Et(.45,1,y-Math.floor(y)))*m,_)}v>0&&(p+=v*Gs.out());const M=Et(s+900,s+5e3,n);if(M>0&&(p+=M*Gs.far()),l>.02&&t>0){const y=i-u,b=Cg(h,i,s,e,y);if(!Number.isNaN(b)){const w=l*Et(b-3,b-.5,n)*(1-Et(b+gs+1,b+gs+4,n));w>0&&(p=Math.min(p,Me(p,y-.4,w)))}}const x=a*(1-Et(240,380,n));if(x>0&&(p=Me(p,o-Zr+1.6*(Gs.n90()-.5)-.012*Math.max(0,n-40),x)),p-=6*(1-Et(0,18,n))*(p<h+20?1-r:0),n<Dr){const y=Me(RA+(Dr-n)*2,11+(Dr-n)*.3,r);p=Math.min(p,o-Me(y,Zr+.4,a))}return p}const Nl=[],Vp=[],Gp=new Map;function LA(n,t){const e=n*100003+t;let i=Gp.get(e);if(i!==void 0)return i;const s=(n+.2+.6*ut(n,t,61))*hc,r=(t+.2+.6*ut(n,t,62))*hc,o=70+110*ut(n,t,63),a=af(s,r,0,Vp)>0?Vp[0]:null;if(!a||Dn(a.s)<.6||a.dist<o+45)i=null;else{const c=su(a.s);i={ox:s,oz:r,r:o,floor:c,peak:Kn(a.s)-200+230*ut(n,t,64)}}return Gp.set(e,i),i}function NA(n,t,e){const i=Math.floor(n/hc),s=Math.floor(t/hc);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=LA(i+o,s+r);if(!a)continue;const c=Math.hypot(n-a.ox,t-a.oz)/a.r;if(c>=1)continue;const l=a.floor+(a.peak-a.floor)*Math.pow(1-c*c,.6);l>e&&(e=Me(e,l,1-Et(.8,1,c)))}return e}function Ig(n,t,e){if(!Number.isFinite(n+t))return e.h=e.s=e.lat=e.vil=NaN,e;jt.x=n,jt.z=t,jt.n210=jt.n700=jt.n500=jt.out=jt.far=jt.n90=NaN;const i=af(n,t,Hp,Nl);let s=1/0;for(let o=0;o<i;o++){const a=Nl[o];a.core===0&&a.dist<s&&(s=a.dist,e.s=a.s,e.lat=a.lat)}ve.o=ve.ty=ve.w=ve.sill=ve.fly=ve.vil=ve.xd=ve.ra=ve.rd=0;let r=0;for(let o=0;o<i;o++){const a=Nl[o],c=(1-Et(0,Hp,a.dist-s))*(a.core>0?a.core:Et(0,CA,a.prom)+1e-4);if(c<=0)continue;r+=c,ve.o+=c*Dn(a.s),ve.ty+=c*Kn(a.s),ve.w+=c*ir(a.s),ve.sill+=c*_h(a.s),ve.fly+=c*Ne(a.s),ve.vil+=c*$n(a.s),ve.xd+=c*Co(a.s);const l=Ve(a.s);ve.ra+=c*ce.road(l),ve.rd+=c*ce.roadDepth(l)}return ve.o/=r,ve.ty/=r,ve.w/=r,ve.sill/=r,ve.fly/=r,ve.vil/=r,ve.xd/=r,ve.ra/=r,ve.rd/=r,e.vil=ve.vil,e.h=bA(n,t,NA(n,t,PA(s,e.lat))),e}const IA={h:0,s:0,lat:0,vil:0};function je(n,t){return Ig(n,t,IA).h}const Sc=`
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
`,ur={uPilot:{value:new me(0,0,0,1)},uHazTime:{value:0}},wc=`
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
`;function DA(n,t,e,i){ur.uPilot.value.set(n,t,Math.sin(e),Math.cos(e)),ur.uHazTime.value=i}const UA=`
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
}`,kA=`
#include <fog_pars_fragment>
${Sc}
${bh}
#ifdef HAZARD
${wc}
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
}`;let FA=null,OA=null;function Dg(n,t){const e=new oe({vertexShader:UA,fragmentShader:kA,defines:n?{HAZARD:1}:{},uniforms:_n.merge([lt.fog]),fog:!0});return e.uniforms.uLift=t,e.uniforms.uRegionHg=Lo,n&&Object.assign(e.uniforms,ur),e}const Ug={value:1};function BA(){return FA??=Dg(!0,Ug)}function kg(){return OA??=Dg(!1,Ug)}const zA=ce.archPhases,HA=1600;function VA(n,t){const e=Ne(n),i=Dn(n),s=i>.5?90+50*ut(t,1,71):ir(n)+22,r=(i>.5?58:46)+18*ut(t,2,72),o={x:0,y:0,z:0},a=d=>je(ue(n,d,0,o).x,o.z)-e,c=[];for(let d=0;d<=24;d++){const p=d/24*Math.PI,v=-s*Math.cos(p),g=Math.min(a(v)-15,r),m=g+(r-g)*Math.pow(Math.sin(p),.55)+6*Math.sin(p*3+t);c.push(new L(v,m,4*Math.sin(p*2+t)))}const l=(i>.5?13:9)+4*ut(t,3,73),u=new _c(new jh(c),90,l,14,!1),h=u.getAttribute("position"),f=u.getAttribute("normal");for(let d=0;d<h.count;d++){const v=(ut(h.getX(d)*.08+t,h.getY(d)*.08+h.getZ(d)*.05,74)-.5)*l*.7;h.setXYZ(d,h.getX(d)+f.getX(d)*v,h.getY(d)+f.getY(d)*v*1.3,h.getZ(d)+f.getZ(d)*v)}return u.setAttribute("aCrest",new St(new Float32Array(h.count),1)),u.computeVertexNormals(),u}function GA(){const n=new ke,t=kg(),e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=new Set,o=es(s);for(let a=o;a<=o+1;a++)zA.forEach((c,l)=>{const u=a*We+c-ui;if(u<s-60||u>s+HA)return;const h=a*10+l;if(r.add(h),e.has(h))return;const f=new $t(VA(u,h*1.37),t);ue(u,0,0,i),f.position.set(i.x,i.y,i.z),f.rotation.y=pn(u),f.matrixAutoUpdate=!1,f.updateMatrix(),n.add(f),e.set(h,f)});for(const[a,c]of e)r.has(a)||(n.remove(c),c.geometry.dispose(),e.delete(a))}}}const WA=5,XA=150,$A=1700,qA=300,KA=200,YA=new fr({vertexColors:!0}),ZA=new fr({vertexColors:!0}),Il=new oe({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:xn});function JA(){const n=new Vt(.25,1.1,.25).translate(0,.55,0),t=n.getAttribute("position"),e=new Float32Array(t.count*3);for(let i=0;i<t.count;i++)e.set(t.getY(i)>.8?[.8,.08,.06]:[.92,.92,.88],i*3);return n.setAttribute("color",new St(e,3)),n}const QA=JA();function jA(){const n=new ke;let t=null,e=Number.NaN;const i={lat:0,y:0,amount:0},s={x:0,y:0,z:0},r=new Ot,o=a=>{const c=[],l=[],u=[],h=[],f=[],d=(y,b,w)=>(ue(y,b,w-Ne(y),s),[s.x,s.y,s.z]),p=(y,b,w,S,T,R,A)=>{y.push(...w,...S,...T,...w,...T,...R);for(let P=0;P<6;P++)b.push(...A)};let v=null,g=0;for(let y=a-XA;y<=a+$A;y+=WA,g++){const b=Pg(y,i)&&i.amount>.5?{s:y,lat:i.lat,y:i.y}:null;if(v&&b){const[w,S]=[v,b],T=[.86,.85,.8],R=g%9===0?[.3,.3,.31]:[.2,.2,.22];p(c,l,d(w.s,w.lat,w.y-.6),d(S.s,S.lat,S.y-.6),d(S.s,S.lat,S.y+.85),d(w.s,w.lat,w.y+.85),T),p(c,l,d(w.s,w.lat,w.y+.85),d(S.s,S.lat,S.y+.85),d(S.s,S.lat+.45,S.y+.85),d(w.s,w.lat+.45,w.y+.85),T),p(c,l,d(w.s,w.lat+.45,w.y+.05),d(S.s,S.lat+.45,S.y+.05),d(S.s,S.lat+gs-1.2,S.y+.05),d(w.s,w.lat+gs-1.2,w.y+.05),R);const A=.45+(gs-1.65)/2;g%2===0&&p(c,l,d(w.s,w.lat+A-.12,w.y+.08),d(S.s,S.lat+A-.12,S.y+.08),d(S.s,S.lat+A+.12,S.y+.08),d(w.s,w.lat+A+.12,w.y+.08),[.95,.78,.25]);for(const P of[0,1]){const I=.45+(P===0?1.6:gs-3.4);u.push(...d(w.s,w.lat+I-.32,w.y+.9),...d(S.s,S.lat+I-.32,S.y+.9),...d(S.s,S.lat+I+.32,S.y+.9),...d(w.s,w.lat+I-.32,w.y+.9),...d(S.s,S.lat+I+.32,S.y+.9),...d(w.s,w.lat+I+.32,w.y+.9));for(const N of[w.s,S.s,S.s,w.s,S.s,w.s])h.push(N,P)}g%3===0&&f.length<KA*4&&(ue(b.s,b.lat+.2,b.y+.85-Ne(b.s),s),f.push(s.x,s.y,s.z,pn(b.s)))}v=b}if(!c.length)return null;const m=new Yt;m.setAttribute("position",new St(new Float32Array(c),3)),m.setAttribute("color",new St(new Float32Array(l),3)),m.computeVertexNormals();const _=new Yt;_.setAttribute("position",new St(new Float32Array(u),3)),_.setAttribute("aTrail",new St(new Float32Array(h),2));const M=new He(QA,ZA,Math.max(1,f.length/4));for(let y=0;y<f.length/4;y++)r.makeRotationY(f[y*4+3]).setPosition(f[y*4],f[y*4+1],f[y*4+2]),M.setMatrixAt(y,r);const x={mesh:new $t(m,YA),trail:new $t(_,Il),posts:M};return x.trail.frustumCulled=!1,x.trail.renderOrder=3,x};return{group:n,update(a,c,l){Il.uniforms.uTime.value=c,Il.uniforms.uNight.value=Math.min(1,Math.max(0,(l-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(a-e)<qA)&&(e=a,t&&(n.remove(t.mesh,t.trail,t.posts),t.mesh.geometry.dispose(),t.trail.geometry.dispose(),t.posts.dispose()),t=o(a),t&&n.add(t.mesh,t.trail,t.posts))}}}const ni=30,Dl=4,Wp=18,Xp=8,$p=24,qp=[0,10,28,55,95,150],Kp=new oe({uniforms:_n.merge([lt.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:Ee,fog:!0});function t3(n,t,e){const i={x:0,y:0,z:0},s=[],r=[],o=Math.ceil((t-n)/Dl)+1,a=(d,p)=>.92+.32*ut(d*.02,p*4,e)+.14*ut(d*.11,p*13,e+1);for(let d=0;d<o;d++){const p=n+d*Dl;for(let v=0;v<=ni;v++){const g=v/ni,m=g*Math.PI*2,_=a(p,g);ue(p,Wp*_*Math.cos(m),Xp+$p*_*Math.sin(m),i),s.push(i.x,i.y,i.z),r.push(p,g,Math.min(p-n,t-p))}}const c=[];for(let d=0;d<o-1;d++)for(let p=0;p<ni;p++){const v=d*(ni+1)+p,g=v+ni+1;c.push(v,v+1,g,g,v+1,g+1)}const l=new Yt;l.setAttribute("position",new St(new Float32Array(s),3)),l.setAttribute("aCave",new St(new Float32Array(r),3)),l.setIndex(c);const u=[],h=[];for(const[d,p]of[[n,-1],[t,1]]){const v=u.length/3;qp.forEach((g,m)=>{for(let _=0;_<=ni;_++){const M=_/ni,x=M*Math.PI*2,y=a(d,M),b=m?.25*g*(ut(M*9,m,e+5)-.5):0,w=Math.max(-16,Xp+($p*y+g+b)*Math.sin(x));ue(d-p*(g*.35+(m?3*ut(M*13,m,e+9):0)),(Wp*y+g+b)*Math.cos(x),w,i),u.push(i.x,i.y,i.z)}});for(let g=0;g<qp.length-1;g++)for(let m=0;m<ni;m++){const _=v+g*(ni+1)+m,M=_+ni+1;h.push(_,M,_+1,_+1,M,M+1)}}for(let d=0;d<o;d+=2){const p=n+d*Dl,v=u.length/3;for(let g=0;g<=16;g++){const m=-110+220*g/16,_=Math.abs(m)/110,M=58+150*_*_+30*(ut(p*.015,m*.03,e+3)-.5);ue(p,m,M,i),u.push(i.x,i.y,i.z)}if(d+2<o)for(let g=0;g<16;g++)h.push(v+g,v+17+g,v+g+1,v+g+1,v+17+g,v+18+g)}const f=new Yt;return f.setAttribute("position",new St(new Float32Array(u),3)),f.setIndex(h),f.computeVertexNormals(),{tube:l,portals:f}}function e3(){const n=new ke,t=new Map,e=kg(),i=e.clone();return i.uniforms=e.uniforms,i.side=Ee,{group:n,update(s,r){if(Kp.uniforms.uTime.value=r,!ce.caves.length)return;const o=new Set,a=es(s);for(let c=a-1;c<=a+1;c++)ce.caves.forEach(([l,u],h)=>{const f=c*We+l-ui,d=c*We+u-ui;if(d<s-200||f>s+2200)return;const p=c*8+h;if(o.add(p),t.has(p))return;const v=t3(f,d,(c*7+h)%97),g=[new $t(v.tube,Kp),new $t(v.portals,i)];for(const m of g)m.frustumCulled=!1,m.matrixAutoUpdate=!1,n.add(m);t.set(p,g)});for(const[c,l]of t)if(!o.has(c)){for(const u of l)n.remove(u),u.geometry.dispose();t.delete(c)}}}}function mi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Yt;let l=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let p=0;p<d.count;++p)h.push(d.getX(p)+u);u+=n[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Yp(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][f]);const p=Yp(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function Yp(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new St(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let f=0,d=u.count;f<d;f++)for(let p=0;p<e;p++){const v=u.getComponent(f,p);a.setComponent(f+h,p,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function Zp(n,t){if(t===G_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(t===Wu||t===P0){let e=n.getIndex();if(e===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);n.setIndex(r),e=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=e.count-2,s=[];if(t===Wu)for(let r=1;r<=i;r++)s.push(e.getX(0)),s.push(e.getX(r)),s.push(e.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(e.getX(r)),s.push(e.getX(r+1)),s.push(e.getX(r+2))):(s.push(e.getX(r+2)),s.push(e.getX(r+1)),s.push(e.getX(r)));return s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),n}const Ul=140,Jp=24,n3=2400;function Ta(n,t){const e=n.getAttribute("position").count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set(t,s*3);return n.setAttribute("color",new St(i,3)),n.deleteAttribute("uv"),n}function i3(){return mi([Ta(new Vt(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),Ta(new Vt(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),Ta(new Vt(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),Ta(new Vt(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function s3(){const n=new He(i3(),new fr({vertexColors:!0}),Jp);n.frustumCulled=!1,n.count=0;const t=new Ot,e={x:0,y:0,z:0};let i=Number.NaN;return{mesh:n,update(s){const r=Math.floor((s-100)/Ul);if(r===i)return;i=r;let o=0;for(let a=r;o<Jp&&a*Ul<s+n3;a++){const c=a*Ul+37*Math.sin(a*1.7);if(Co(c)<120)continue;const l=3*Math.sin(c/140)+2.5*Math.sin(c/47+1.7)+(a%2?7:-7),u=Lg(c);ue(c,l,0,e),t.makeRotationY(pn(c)+(a%3===0?Math.PI:0)+.15*Math.sin(a)).setPosition(e.x,u+.1,e.z),n.setMatrixAt(o++,t)}n.count=o,n.visible=o>0,n.instanceMatrix.needsUpdate=!0}}}const r3=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`;function Tc(n){const t=new fr({vertexColors:!0,side:n.doubleSide?Ee:Ni});return t.onBeforeCompile=e=>{e.uniforms.uLift=n.lift,n.hazard&&Object.assign(e.uniforms,ur),e.fragmentShader=`uniform float uLift;
${n.hazard?wc:""}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${n.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${n.rim.toFixed(3)} * uLift;
    ${n.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${n.windows?r3:""}
  }
  #endif`)},t.customProgramCacheKey=()=>`backlit-${n.selfLit}-${n.rim}-${n.doubleSide?2:1}-${n.hazard?"h":""}${n.windows?"w":""}`,t}const o3=4,a3=.026,c3=7,l3=.035;function u3(n,t){const e=new Float32Array(t*16),i=new Float32Array(t*3),s=new Float32Array(t*4);n.instanceColor||(n.instanceColor=new vo(new Float32Array(t*3).fill(1),3)),n.instanceMatrix.setUsage(Jf),n.instanceColor.setUsage(Jf);const r=n.geometry;r.boundingSphere||r.computeBoundingSphere();const o=r.boundingSphere,a=new L,c=new Un;let l=0;return{clear:()=>{l=0},add(u,h){l>=t||(u.toArray(e,l*16),h.toArray(i,l*3),a.copy(o.center).applyMatrix4(u),a.toArray(s,l*4),s[l*4+3]=o.radius*u.getMaxScaleOnAxis(),l++)},flush(u,h){const f=n.instanceMatrix.array,d=n.instanceColor.array;let p=0;for(let v=0;v<l;v++)c.center.fromArray(s,v*4),c.radius=s[v*4+3]+c3+l3*c.center.distanceTo(h),u.intersectsSphere(c)&&(f.set(e.subarray(v*16,v*16+16),p*16),d.set(i.subarray(v*3,v*3+3),p*3),p++);if(n.count=p,p!==0)for(const v of[n.instanceMatrix,n.instanceColor])v.clearUpdateRanges(),v.addUpdateRange(0,p*v.itemSize),v.needsUpdate=!0}}}function h3(n,t){const e=n.elements,i=t.elements;return Math.abs(e[0]/i[0]-1)<.015&&Math.abs(e[5]/i[5]-1)<.015&&Math.abs(e[8]-i[8])<.01&&Math.abs(e[9]-i[9])<.01}function f3(){const n=new Io,t=new Ot,e=new L,i=new L(Number.NaN,0,0),s=new Ce,r=new Ce,o=new Ot;return{frustum:n,eye:e,due(a,c){a.updateMatrixWorld(),a.getWorldPosition(e),a.getWorldQuaternion(s);const l=!(e.distanceTo(i)<=o3);return!c&&!l&&s.angleTo(r)<=a3&&h3(a.projectionMatrix,o)?!1:(i.copy(e),r.copy(s),o.copy(a.projectionMatrix),n.setFromProjectionMatrix(t.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse)),!0)}}}function _s(n,t,e,i,s){const r=n.getAttribute("position"),o=new Float32Array(r.count*3);for(let a=0;a<r.count;a++){const c=Math.min(1,Math.max(0,(r.getY(a)-i)/(s-i))),l=.85+.3*ut(r.getX(a)*.7,r.getZ(a)*.7+r.getY(a),5);for(let u=0;u<3;u++)o[a*3+u]=Math.pow(t[u]+(e[u]-t[u])*c*c,2.2)*l}return n.setAttribute("color",new St(o,3)),n}function cf(n,t,e){const i=n.getAttribute("position");for(let s=0;s<i.count;s++){const r=i.getX(s),o=i.getY(s),a=i.getZ(s),c=(ut(r*1.3+e,a*1.3,9)-.5)*t;i.setXYZ(s,r*(1+c),o+c*.6,a*(1+c))}return n.computeVertexNormals(),n}function Fg(){const n=[new tn(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([i,s,r],o)=>n.push(cf(new Do(i,s,7,1).toNonIndexed().translate(0,r+s/2,0),.25,o)));const e=mi(n.map(i=>i.index?i.toNonIndexed():i));return e.computeVertexNormals(),_s(e,[.05,.12,.07],[.42,.52,.2],1,14)}function Og(){const n=[new tn(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([i,s,r,o,a],c)=>n.push(cf(new ws(o,a).translate(i,s,r),.35,c*3)));const e=mi(n);return e.computeVertexNormals(),_s(e,[.07,.13,.05],[.62,.6,.18],3,13)}function d3(){const n=[new tn(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,i,s]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])n.push(new Do(e,i,5,1).toNonIndexed().translate(0,s+i/2,0));const t=mi(n);return t.computeVertexNormals(),_s(t,[.05,.12,.07],[.42,.52,.2],1,14)}function p3(){const n=[new tn(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,i,s,r,o]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])n.push(cf(new ws(r,0).translate(e,i,s),.35,o*3));const t=mi(n);return t.computeVertexNormals(),_s(t,[.07,.13,.05],[.62,.6,.18],3,13)}function m3(){const n=[];for(const[i,s]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])n.push(new Vt(.4,3,.4).translate(i,1.5,s).toNonIndexed());n.push(_s(new Vt(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const t=new Do(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();n.push(_s(t,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const i of n)i.getAttribute("color")||_s(i,[.22,.15,.09],[.3,.2,.12],0,3);const e=mi(n);return e.computeVertexNormals(),e}function g3(){const n=[];for(const t of[-2.4,0,2.4])n.push(new Vt(1.1,1,.1).translate(t,4.8,2.85).toNonIndexed()),n.push(new Vt(1.1,1,.1).translate(t,4.8,-2.85).toNonIndexed());return mi(n)}const rh=250,v3=40,Ur=1,Bg=650,An={x:0,y:0,z:0},kl={lat:0,y:0,amount:0};function Qp(n,t){return Math.hypot(je(n+3,t)-je(n-3,t),je(n,t+3)-je(n,t-3))/6}function x3(n,t){const e=[],i=[],s=No()>.5,r=s?Math.round(t*.6):t,o=s?1.1:3.2;for(let a=0;a<Bg*2.2&&e.length<r;a++){const c=(n+ut(a*.71,n,41))*rh,l=ut(n,a*.37,42)<.5?-1:1,u=ir(c),h=Math.pow(ut(a*.53,n*1.7,43),2.6)*(240+560*Dn(c)),f=Math.max(u*.7,17)+h;ue(c,l*f,0,An);const d=An.x,p=An.z;if(!sh(d,p,c,f))continue;const v=je(d,p),g=Ne(c);if(f<24&&v>g-(_h(c)>.5?12:22)||Qp(d,p)>o||v<g-200||s&&l>0&&Pg(c,kl)&&f>kl.lat-5&&f<kl.lat+gs+6)continue;const m=.7+.9*ut(a,n*3.1,44);e.push({p:new L(d,v-.5,p),s:m,r:ut(a,n,45)*6.28,kind:ut(d/90,p/90,46)<.55?0:1})}for(let a=0;a<40&&i.length<7;a++){const c=(n+ut(a*1.31,n,51))*rh,l=ut(n,a*.91,52)<.5?-1:1,u=Math.max(ir(c)*.7,30)+ut(a,n*2.3,53)*220;if(ue(c,l*u,0,An),!sh(An.x,An.z,c,u))continue;const h=je(An.x,An.z);Qp(An.x,An.z)>.45||h>Ne(c)-18||i.push({p:new L(An.x,h,An.z),s:1,r:pn(c)-l*(Math.PI/2)+(ut(a,n,54)-.5),kind:0})}return{trees:e,houses:i}}const lf={value:1},_3=Tc({lift:lf,selfLit:.2,rim:.85}),uf=Tc({lift:lf,selfLit:.2,rim:.85});function Ws(n,t,e=!1){const i=e?new cn({color:"#ffb35a"}):_3,s=new He(n,i,t);return s.count=0,s.frustumCulled=!1,s}function M3(n){const t=n.ahead,e=Math.round(Bg*n.density),i=e*(Ur+t+1),s=new ke,r=Ws(Fg(),i),o=Ws(Og(),i),a=Ws(d3(),i),c=Ws(p3(),i),l=Ws(m3(),8*(Ur+t+1)),u=Ws(g3(),8*(Ur+t+1),!0);s.add(r,o,a,c,l,u);const h=[r,o,a,c].map(w=>u3(w,i)),f=f3();let d=!0;const p=new Map;let v=Number.NaN;const g=new Ot,m=new Ce,_=new L(0,1,0),M=new L,x=new ct,y=new ct,b=()=>{h.forEach(S=>S.clear());let w=0;for(let S=v;S<=v+Ur+t;S++){let T=p.get(S);T||p.set(S,T=x3(S,e));const R=S-v>n.near-1?2:0;for(const A of T.trees){m.setFromAxisAngle(_,A.r),g.compose(A.p,m,M.set(A.s,A.s*(.9+.25*Math.sin(A.r*3)),A.s));const P=No();x.setHSL(.22-.05*P+.06*Math.sin(A.r*5),.25,.5-.07*P+.12*Math.cos(A.r*7)),h[R+A.kind].add(g,x.multiplyScalar(2))}for(const A of T.houses)m.setFromAxisAngle(_,A.r),g.compose(A.p,m,M.set(1,1,1)),l.setMatrixAt(w,g),u.setMatrixAt(w++,g)}for(const S of[...p.keys()])(S<v-1||S>v+Ur+t+1)&&p.delete(S);l.count=w,u.count=w;for(const S of[l,u])S.instanceMatrix.needsUpdate=!0;d=!0};return{group:s,update(w,S,T){const R=Math.floor((w-v3)/rh);if(R!==v&&(v=R,b()),f.due(T,d)){for(const A of h)A.flush(f.frustum,f.eye);d=!1}lf.value=1-.55*Math.min(1,Math.max(0,(S-.4)/.5)),u.material.color.copy(y.set("#ffb35a").multiplyScalar(.25+3.2*S*S))}}}const hf=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2],Fo=[.8,.3,.16],zg=[.6,.32,.22],ff=[.9,.76,.45],Hg=[.88,.84,.76],y3=[.2,.45,.36],df=[.45,.25,.14],Vg=[.58,.33,.24];function te(n,t,e=.1,i=1){const s=n.index?n.toNonIndexed():n;s.deleteAttribute("uv"),s.getAttribute("normal")||s.computeVertexNormals();const r=s.getAttribute("position"),o=new Float32Array(r.count*3),a=hf(t);for(let c=0;c<r.count;c++){const l=1-e/2+e*ut(r.getX(c)*.8+i,r.getY(c)*.8+r.getZ(c)*.6,17);for(let u=0;u<3;u++)o[c*3+u]=a[u]*l}return s.setAttribute("color",new St(o,3)),s}const Jn=n=>mi(n);function To(n,t,e,i){const s=n.getAttribute("position"),r=n.getAttribute("color");for(let o=0;o<s.count;o++){const a=i+(1-i)*Math.min(1,Math.max(0,(s.getY(o)-t)/(e-t)));r.setXYZ(o,r.getX(o)*a,r.getY(o)*a,r.getZ(o)*a)}return n}const Gg=[1,.7,.32];function Ec(n,t,e,i,s=0,r=[.55,.2,.12]){const o=[],a=Math.max(6,Math.round(n/.45)),c=Math.max(4,Math.round(Math.hypot(t,e)/.42)),l=hf(i);for(const u of[-1,1]){const h=[],f=[],d=[];for(let v=0;v<=c;v++){const g=v/c;for(let m=0;m<=a;m++){const _=(m/a-.5)*n,M=Math.pow(Math.abs(_)/(n/2),5);h.push(_,e*(1-g)+s*M*(.35+.65*g),u*t*g*(1+.06*M));const x=(m%2?1:.72)*(v%2?1:.88)*(.8+.35*ut(_*.3,g*4+u,23));f.push(l[0]*x,l[1]*x,l[2]*x)}}for(let v=0;v<c;v++)for(let g=0;g<a;g++){const m=v*(a+1)+g;u>0?d.push(m,m+a+1,m+1,m+1,m+a+1,m+a+2):d.push(m,m+1,m+a+1,m+1,m+a+2,m+a+1)}const p=new Yt;p.setAttribute("position",new St(new Float32Array(h),3)),p.setAttribute("color",new St(new Float32Array(f),3)),p.setIndex(d),p.computeVertexNormals(),o.push(p.toNonIndexed())}return o.push(te(new Vt(n+.3,.32,.42).translate(0,e+.05,0),r,.05)),Jn(o)}function b3(n,t,e,i,s){const r=t/2,o=[];for(const c of[-1,1]){const l=c*n/2;c>0?o.push(l,e,-r,l,e+i,0,l,e,r):o.push(l,e,-r,l,e,r,l,e+i,0)}const a=new Yt;return a.setAttribute("position",new St(new Float32Array(o),3)),a.computeVertexNormals(),te(a,s,.08)}function S3(n,t,e,i=Fo){const r=t-4.4-.25,o=[Ec(n,3.8,4.4,i,2.2,Gg).translate(0,r,0)];for(let a=-n/2+2;a<=n/2-2;a+=3.2)for(const c of[-2.6,2.6])o.push(te(new tn(.26,.3,r-e+6,6).translate(a,(r+e-6)/2,c),df,.15,a));return o.push(te(new Vt(n-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),Jn(o)}function w3(n,t={pillar:Vg,wall:ff,tile:Fo}){const e=[];for(const i of[-1,1])e.push(te(new Vt(2.4,7-n+6,2.4).translate(i*11.2,(7+n-6)/2,0),t.pillar,.2,i)),e.push(te(new Vt(3,.5,3).translate(i*11.2,7.2,0),[.85,.8,.7],.08,i));return e.push(te(new Vt(22.4,1.6,1.6).translate(0,-.2,0),df,.12)),e.push(te(new Vt(20,3.6,1.1).translate(0,2.4,0),t.wall,.1)),e.push(te(new Vt(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(te(new Vt(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(Ec(27,2.2,4.4,t.tile,1.6).translate(0,5.3,0)),Jn(e)}function T3(){const n=[To(te(new Vt(.4,3.2,10).translate(0,0,0),Vg,.22),-1.6,.6,.62),Ec(10.2,.45,.35,Fo).rotateY(Math.PI/2).translate(0,1.6,0)];for(let t=-5;t<=5;t+=2.5)n.push(To(te(new Vt(.7,3.7,.7).translate(0,.25,t),[.5,.27,.2],.15,t),-1.6,.6,.6)),n.push(te(new Vt(.86,.26,.86).translate(0,2.2,t),[.9,.88,.82],.06,t));return Jn(n)}const E3={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function Wg(n=E3){const t=[te(new tn(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),n.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([i,s,r,o],a)=>{const c=new ws(o,1).scale(1.15,.62,1.15).translate(i,s,r);c.deleteAttribute("uv"),c.computeVertexNormals();const l=c.getAttribute("position"),u=c.getAttribute("normal"),h=new Float32Array(l.count*3);for(let f=0;f<l.count;f++){const d=ut(l.getX(f)*.9+a,l.getZ(f)*.9,l.getY(f)+31),p=u.getY(f)+(d-.5)*.7,v=p<-.05?n.under[0]:p<.12?n.under[1]:d<.6?n.flower[0]:n.flower[1],g=hf(v),m=.75+.35*Math.min(1,Math.max(0,(l.getY(f)-4.5)/4));h.set([g[0]*m,g[1]*m,g[2]*m],f*3)}c.setAttribute("color",new St(h,3)),t.push(c)}),Jn(t)}const A3=2600,Xg=[.6,.58,.55],R3=[.3,.29,.31];function C3(){const n=(t,e,i,s)=>To(te(new vs(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,i/e,1).translate(t,-4,0),[.42,.6,.28],.14,s),-4,i,.7);return Jn([n(-62,70,62,11),n(62,64,56,12)])}function P3(){return Jn([te(new Vt(5,1.2,3).translate(0,.6,0),Xg,.1,21),te(new Vt(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),te(new tn(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function L3(){const n=(e,i,s,r,o,a)=>[te(new Vt(e,s,i).translate(r,s/2,o),[.7,.62,.5],.08,a),te(new tn(.01,i*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(r,s+i*.17,o),R3,.08,a+1)],t=(e,i,s,r,o)=>te(new Vt(e,4,i).translate(s,2,r),Xg,.12,o);return Jn([t(64,1.6,0,-22,31),t(64,1.6,0,22,32),t(1.6,44,-32,0,33),t(1.6,44,32,0,34),...n(30,12,11,0,8,35),...n(22,9,7,-14,-10,37),...n(22,9,7,14,-10,39)])}const jp={"nui-doi":{geo:C3,scale:1},"bia-ma-pi-leng":{geo:P3,scale:2.2},"dinh-vua-meo":{geo:L3,scale:1.4}};function N3(){const n=new ke,t=new Map,e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=ce.landmarks;if(!r?.length)return;const o=new Set,a=es(s);for(let c=a-1;c<=a+1;c++)r.forEach((l,u)=>{const h=c*We+l.phase-ui;if(h<s-300||h>s+A3)return;const f=c*16+u;if(o.add(f),e.has(f))return;let d=t.get(l.kind);d||t.set(l.kind,d=jp[l.kind].geo());const p=new $t(d,uf);ue(h,l.lat,0,i),p.position.set(i.x,je(i.x,i.z),i.z),p.rotation.y=pn(h)+(l.turn??0),p.scale.setScalar(jp[l.kind].scale),p.matrixAutoUpdate=!1,p.updateMatrix(),n.add(p),e.set(f,p)});for(const[c,l]of e)o.has(c)||(n.remove(l),e.delete(c))}}}const $g={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},qg=.18;function Fl(n,t,e,i=0){const[s,r,o,a]=$g[n],c=Math.min(1,Math.max(0,t));return c<.5?e.set(s).lerp(new ct(r),c*2):e.set(r).lerp(new ct(o),(c-.5)*2),i>0?e.lerp(new ct(a),Math.min(1,i)):e}function I3(n,t,e=0){const i=n.y+(-.07-n.y)*Math.min(1,Math.max(0,t)*1.25)+qg*e,s=Math.hypot(n.x,i,n.z);return{x:n.x/s,y:i/s,z:n.z/s}}const Ol=900,D3=15e-6,U3=14e-5;function k3(n){const t=new ct(n);return`vec3(${t.r.toFixed(4)}, ${t.g.toFixed(4)}, ${t.b.toFixed(4)})`}function F3(){return Object.entries($g).map(([n,t])=>`#define ATM_${n.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${t.map(k3).join(", ")})`).join(`
`)}function Kg(n,t="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${t})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${F3()}
#define ATM_SUN_DIR normalize(vec3(${n.x.toFixed(5)}, mix(${n.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${qg.toFixed(3)} * atmMorn(), ${n.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${Ol.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${Ol.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${Ol.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${D3.toExponential(3)} + density * avg);
}
`}function O3(n,t){qt.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,qt.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,qt.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${Kg(t)}
#endif`,qt.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,n.fog=new Vh(new ct(0,0,0),U3)}function B3(n,t,e=0){n.fog.color.setRGB(t,e,0)}const z3=`
#include <fog_pars_vertex>
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,H3=`
#include <fog_pars_fragment>
${Sc}
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
}`;function V3(n){const t=new L,e=new oe({vertexShader:z3,fragmentShader:H3,defines:n?{CLOUD_LITE:1}:{},uniforms:_n.merge([lt.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new ot(0,1)}}]),transparent:!0,depthWrite:!1,fog:!0}),i=new $t(new Yn(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return i.frustumCulled=!1,i.renderOrder=1,{mesh:i,update(s,r,o){const a=s.position;s.getWorldDirection(t),e.uniforms.uFwd.value.set(t.x,t.z).normalize();const c=o+250,l=Dn(c);i.position.set(a.x,su(c)+20+(Kn(c)-170-su(c)-20)*l,a.z),e.uniforms.uTime.value=r,e.uniforms.uCover.value=.62-.1*l+.5*(1-ce.cloud(Ve(c)))}}}const tm=120,Yg=30,Zg=7,G3=Zg*(Yg+2);function W3(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");for(let i=0;i<18;i++){const s=30+34*ut(i,4,7),r=128+(ut(i*1.7,1,3)-.5)*(240-2*s-20),o=140+(ut(1,i*2.3,5)-.5)*60-(s-30)*.6,a=t.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.fillRect(0,0,256,256)}const e=new Kh(n);return e.colorSpace=Ge,e}const X3=`
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
}`,$3=`
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
}`;function q3(n){const t=Math.max(10,Math.round(Yg*n)),e=new oe({vertexShader:X3,fragmentShader:$3,uniforms:_n.merge([lt.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:Ee,fog:!0});e.uniforms.uMap.value=W3();const i=new He(new Yn(1,1),e,G3);i.frustumCulled=!1,i.count=0;const s=new Ot,r=new Ce,o=new L,a=new L;let c=Number.NaN;return{mesh:i,update(l){const u=Math.floor(l/tm)-1;if(u===c)return;c=u;let h=0;for(let f=u;f<u+t+2;f++)for(let d=0;d<Zg;d++){const p=(f+ut(d*.7,f,91))*tm,v=Dn(p),g=ut(f,d*1.3,92)<.5?-1:1,m=ut(d,f*1.9,93);let _,M,x;if(d<2)x=12+14*m,_=g*(16+x*.5+m*30*v),M=Ne(p)-10+ut(f,d,94)*12+16*$n(p);else{if(v<.5||d>3)continue;_=g*(120+m*500),M=Kn(p)-210-ut(f,d,95)*60,x=60+80*m}ue(p,_,0,o),sh(o.x,o.z,p,_)&&(s.compose(o.set(o.x,M,o.z),r,a.set(x*1.6,x*.75,1)),i.setMatrixAt(h++,s))}i.count=h,i.instanceMatrix.needsUpdate=!0}}}const K3=`
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
}`,Y3=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function pf(n,t={}){const e=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*4),r=new Yt;r.setAttribute("position",new St(e,3)),r.setAttribute("aSize",new St(i,1)),r.setAttribute("aColor",new St(s,4));const o=new oe({vertexShader:K3,fragmentShader:Y3,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:t.core??2.4}},transparent:!0,depthWrite:!1,blending:xn}),a=new cc(r,o);return a.frustumCulled=!1,a.renderOrder=4,{points:a,set(c,l,u,h,f,d,p,v,g){e[c*3]=l,e[c*3+1]=u,e[c*3+2]=h,i[c]=f,s[c*4]=d,s[c*4+1]=p,s[c*4+2]=v,s[c*4+3]=g},commit(c){r.setDrawRange(0,c);for(const l of["position","aSize","aColor"])r.getAttribute(l).needsUpdate=!0},setViewport(c,l){o.uniforms.uScale.value=c/(2*Math.tan(l*Math.PI/360)),t.maxFrac&&(o.uniforms.uMaxPx.value=Math.max(4,c*t.maxFrac))}}}const Wi=5,Bl=3,Z3=.08,J3=3,Q3=new ct("#ffd27a"),j3=new ct("#9b8cff");function tR(){const n={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},t=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new Yt;return e.setAttribute("position",new Jt(t.flat().flatMap(i=>n[i]),3)),e}function eR(){const n=new cn({color:"#ffffff",blending:xn,transparent:!0,depthWrite:!1,side:Ee,fog:!1}),t=new He(tR(),n,Wi);t.frustumCulled=!1,t.count=0;const e=pf(Wi*(Bl+1),{maxFrac:.025,core:1.1}),i={z:0,x:0,v:0,ended:!1,after:0},s=new ke;s.add(t,e.points);const r=Array.from({length:Wi},()=>new L),o=new Array(Wi).fill(0),a=new Array(Wi).fill(0),c=new Array(Wi).fill(0),l=new Array(Wi).fill(0),u=new Ot,h=new Ce,f=new fi(0,0,0,"YXZ"),d=new L,p={x:0,y:0,z:0},v=new L(1.25,1.25,1.25),g=new ct,m={group:s,setViewport:(_,M)=>e.setViewport(_,M),heads:r,alphas:o,owner:a,count:0,mode:"on",update(_,M,x,y,b){let w=0,S=0;const T=m.mode==="off"?[]:_.slice(0,Wi),R=Sg(T),A=new Set(T.map((I,N)=>[Math.abs(I.at.z-M.z),N]).filter(([,I])=>th(I,M.z,R)>0).sort((I,N)=>I[0]-N[0]).slice(0,J3).map(([,I])=>I)),P=m.mode==="dim"?.5:1;T.forEach((I,N)=>{const{z:U,x:z,v:V,ended:J,after:B}=I.at,K=U-M.z,j=y>0?(z-c[N])/y:0;if(c[N]=z,l[N]+=(Math.max(-.8,Math.min(.8,j*.03))-l[N])*Math.min(1,y*10),K<-4)return;ue(U,z,V,d);const Mt=J&&I.run.crash?B/.8:J?1:0,gt=Math.abs(K)<10&&Math.abs(z-M.x)<3.2&&Math.abs(V-M.v)<3?.25:1,At=1-Math.min(1,Math.max(0,(Math.abs(K)-220)/80)),Bt=Math.min(1,(K+4)/4),Ht=.15+.85*Math.min(1,Math.max(0,(d.distanceTo(b)-9)/6)),X=(I.self?.45:.3)*P*th(N,M.z,R)*gt*At*Bt*Ht*Math.max(0,1-Mt);if(!(X<=.01)){f.set(-Math.atan(Ci(U))+(J?B*9:0),pn(U),l[N]+(J?B*13:0)),u.compose(d,h.setFromEuler(f),v),t.setMatrixAt(w,u),g.copy(I.self?Q3:j3),A.has(N)&&e.set(S++,d.x,d.y,d.z,2.5,g.r,g.g,g.b,X*.9);for(let Y=1;Y<=Bl&&!J&&P===1&&A.has(N);Y++){yg(I.track,x-Y*Z3,i),ue(i.z,i.x,i.v,p);const yt=1-Y/(Bl+1);e.set(S++,p.x,p.y,p.z,1.8*yt,g.r,g.g,g.b,X*.55*yt)}t.setColorAt(w,g.multiplyScalar(X*1.6)),r[w].set(d.x,d.y+1.6,d.z),o[w]=X,a[w]=N,w++}}),t.count=w,e.commit(S),m.count=w,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}};return m}function nR(){const n=new Y0;for(let t=0;t<10;t++){const e=t%2?.11:.28,i=t/10*Math.PI*2+Math.PI/2;t?n.lineTo(Math.cos(i)*e,Math.sin(i)*e):n.moveTo(Math.cos(i)*e,Math.sin(i)*e)}return new ef(n)}function iR(){const n=new cn({color:new ct("#ffd76a").multiplyScalar(2.2),blending:xn,transparent:!0,depthWrite:!1,fog:!1}),t=new He(nR(),n,3);t.frustumCulled=!1,t.count=0;const e=new Ot,i=new L,s=new L,r=new Ce;return{mesh:t,update(o,a,c,l){if(a<=0){t.count=0;return}const u=Math.min(1,a*3);l.getWorldQuaternion(r);for(let h=0;h<3;h++){const f=c*6+h*Math.PI*2/3;i.set(o.x+Math.cos(f)*.8,o.y+.9+Math.sin(f*2)*.1,o.z+.45+Math.sin(f)*.5),s.setScalar(u*(1+.25*Math.sin(c*14+h*2))),e.compose(i,r,s),t.setMatrixAt(h,e)}t.count=3,t.instanceMatrix.needsUpdate=!0}}}const oh=6,Ks=3,Ys=28,fs=Ys+1,kr=oh*Ks*fs*2,sR=[1.2,1.75,2.2],rR=Math.PI*2*.45,oR=2.4,aR=`
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
  }`,cR=`
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
  }`;function lR(){const n=new Yt,t=new Float32Array(kr*3),e=new Float32Array(kr*3),i=new Float32Array(kr),s=new Float32Array(kr),r=new Float32Array(kr),o=[];for(let f=0;f<oh*Ks;f++)for(let d=0;d<fs;d++){const p=(f*fs+d)*2;s[p]=-1,s[p+1]=1,r[p]=r[p+1]=d/Ys,d<Ys&&o.push(p,p+1,p+2,p+1,p+3,p+2)}n.setAttribute("position",new St(t,3)),n.setAttribute("aTan",new St(e,3)),n.setAttribute("aGlow",new St(i,1)),n.setAttribute("aSide",new St(s,1)),n.setAttribute("aU",new St(r,1)),n.setIndex(o);const a=new oe({vertexShader:aR,fragmentShader:cR,uniforms:{uTime:{value:0},uWidth:{value:.16}},blending:xn,transparent:!0,depthWrite:!1,side:Ee}),c=new $t(n,a);c.frustumCulled=!1,c.renderOrder=2;const l=new Map,u=new Float32Array(fs*3),h={x:0,y:0,z:0};return{mesh:c,update(f,d,p){a.uniforms.uTime.value=d;const v=Px(f),g=f.gusts.find(_=>!_.taken&&!_.missed);let m=0;for(const _ of f.gusts){if(m>=oh||_.z+_.len<p-5||_.z>p+320)continue;_.taken&&!l.has(_.id)&&l.set(_.id,d);const M=_.taken?d-l.get(_.id):0,x=_.taken?Math.max(0,2.4*(1-M/.4)):_.missed?.18:_===g?1.5:.9;if(!(x<=0)){for(let y=0;y<Ks;y++){for(let w=0;w<fs;w++){const S=w/Ys,T=y/Ks*Math.PI*2+S*rR+d*oR,R=sR[y];ue(_.z+S*_.len,vn(_.lane)+R*Math.cos(T),_.v+v+R*Math.sin(T),h),u[w*3]=h.x,u[w*3+1]=h.y,u[w*3+2]=h.z}const b=m*Ks+y;for(let w=0;w<fs;w++){const S=Math.max(0,w-1),T=Math.min(Ys,w+1);for(let R=0;R<2;R++){const A=(b*fs+w)*2+R;for(let P=0;P<3;P++)t[A*3+P]=u[w*3+P],e[A*3+P]=u[T*3+P]-u[S*3+P];i[A]=x}}}m++}}for(const _ of l.keys())f.gusts.some(M=>M.id===_)||l.delete(_);n.setDrawRange(0,m*Ks*Ys*6);for(const _ of["position","aTan","aGlow"])n.getAttribute(_).needsUpdate=!0;c.visible=m>0}}}function uR(){const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Kh(n)}const Jg=new Yn(1,1).rotateX(-Math.PI/2),Qg=new cn({map:uR(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function hR(n){const t=new He(Jg,Qg,n);return t.count=0,t.frustumCulled=!1,t.renderOrder=1,t}function fR(n,t,e){const i=new $t(Jg,Qg);return i.scale.set(n,1,t),i.position.y=e,i.renderOrder=1,i.updateMatrix(),i}const mf=[.86,.66,.36],jg=[.78,.58,.32],Ac=[.36,.34,.35],tv=[.3,.29,.3],zl=[.58,.56,.53],dR={pillar:[.52,.5,.48],wall:mf,tile:Ac},pR={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},mR=()=>Wg(pR);function gR(){const n=[To(te(new Vt(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let t=0;t<2;t++)for(let e=0;e<12;e++){const i=ut(e*.73,t*1.9,61),s=-4.6+(e+.5*t)*.76,r=new Vt(.95,.4+.22*i,.62+.3*i).rotateX((i-.5)*.35).rotateY((i-.5)*.4),o=.78+.34*ut(e,t,62);n.push(te(r.translate(0,.25+t*.46,s),[zl[0]*o,zl[1]*o,zl[2]*o],.12,e+t*13))}return Jn(n)}const vR=[.3,.22,.19],Hl=[.92,.9,.84],xR=[.8,.82,.85];function ev(n,t){const e=[],i=new Vt(n.len,n.wallH+n.sink,n.width).translate(0,(n.wallH-n.sink)/2,0);e.push(To(te(i,n.wall,.14,t),0,2.5,.72)),e.push(te(new Vt(n.len+.08,.7,n.width+.08).translate(0,.25,0),[.5,.44,.36],.1,t)),e.push(te(new Vt(n.len+.06,.45,n.width+.06).translate(0,n.wallH-.2,0),vR,.08,t)),e.push(b3(n.len,n.width,n.wallH,n.rise,n.wall)),e.push(Ec(n.len+.6,n.width/2+.35,n.rise+.25,n.tile,0,n.crest?Gg:void 0).translate(0,n.wallH-.2,0));const s=-n.width/2-.04;e.push(te(new Vt(1.3,2.3,.08).translate(0,1.15,s+.01),Hl,.06,t)),e.push(te(new Vt(1,2,.1).translate(0,1,s-.02),df,.1,t)),e.push(te(new Vt(1.8,.25,.34).translate(0,.12,s-.17),[.62,.58,.52],.08,t));for(let r=0;r<n.floors;r++){const o=1.5+r*3.1;for(const a of r===0?[-n.len/2+.85,n.len/2-.85]:[-.9,.9])e.push(te(new Vt(.8,1,.1).translate(a,o,s),y3,.12,t+a));if(r>0&&n.balcony){const a=n.len*.78;e.push(te(new Vt(a,.18,.4).translate(0,o-1.05,s-.2),[.7,.66,.6],.08,t)),e.push(te(new Vt(a,.08,.08).translate(0,o-.15,s-.32),Hl,.05,t));for(let c=0;c<=6;c++)e.push(te(new Vt(.06,.82,.06).translate(-a/2+a*c/6,o-.55,s-.32),Hl,.05,t))}}if(n.tank){const r=n.wallH+n.rise+.1;e.push(te(new tn(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(n.len*.22,r+.45,0),xR,.12,t)),e.push(te(new Vt(.9,.2,.7).translate(n.len*.22,r,0),[.4,.38,.36],.08,t))}return Jn(e)}function _R(n,t,e=!1){const s=e?n%2?jg:mf:n%2?Hg:ff,r=e?n%3===2?tv:Ac:n%3===2?zg:Fo;return ev({len:4.4,width:5.2,wallH:t-3.2-.3,rise:3.2,wall:s,tile:r,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},n*7.1)}function Ea(n,t=!1){const e=t?n?jg:mf:n?Hg:ff,i=t?n?tv:Ac:n?zg:Fo;return ev({len:8-n,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:i,floors:1,sink:2.5,tank:!t,crest:!1,balcony:!t},3+n)}const ds=250,em=1,MR=6,gf={value:1},yR=Tc({lift:gf,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),bR=Tc({lift:gf,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Vl(n,t,e){return ue(n,t,0,e),e.y=je(e.x,e.z),e}function SR(n,t){const e=[],i=n*ds;if(Math.max($n(i),$n(i+ds/2),$n(i+ds))===0)return e;const s=new L,r=No()>.5?4:0,o=(a,c)=>$n(a)>.3&&c.y<Ne(a)-6&&c.y>Ne(a)-14;for(let a=0;a<t;a++){const c=i+ut(a*.77,n,81)*ds,u=(ut(n,a*.41,82)<.5?-1:1)*(18+Math.pow(ut(a*.53,n*1.3,83),1.8)*190);o(c,Vl(c,u,s))&&e.push({p:s.clone(),r:ut(a,n,84)*6.28,s:.8+.5*ut(n,a,85),kind:r})}for(let a=0;a<2;a++){const c=i+(.25+.5*a)*ds+(ut(n,a,86)-.5)*60,u=(ut(n*1.7,a,87)<.5?-1:1)*(24+ut(n,a*3.1,88)*90);for(let h=0;h<7;h++){const f=c+(ut(h,n+a,89)-.5)*70,d=u+(ut(h*1.9,n+a,90)-.5)*50;if(Math.abs(d)<17||!o(f,Vl(f,d,s)))continue;const p=pn(f)+(d>0?Math.PI/2:-Math.PI/2)+(ut(h,a,91)-.5)*.5;e.push({p:s.clone(),r:p,s:1,kind:r+1+h%2})}}for(let a=0;a<2;a++){const c=a?1:-1,l=i+ut(n,a,92)*(ds-60),u=3+Math.floor(ut(n,a*2.3,93)*4);for(let h=0;h<u;h++){const f=l+h*10.2;o(f,Vl(f,c*13.5,s))&&e.push({p:s.clone(),r:pn(f),s:1,kind:r+3})}}return e}function wR(n){const t=em+Math.max(3,Math.round(MR*n))+1,e=Math.round(34*Math.max(.5,n)),i=new ke,s=[Wg(),Ea(0),Ea(1),T3(),mR(),Ea(0,!0),Ea(1,!0),gR()],r=[34,7,7,12,34,7,7,12].map(m=>m*t),o=s.map((m,_)=>{const M=new He(m,yR,r[_]);return M.count=0,M.frustumCulled=!1,i.add(M),M}),a=hR(r.reduce((m,_)=>m+_,0));i.add(a);const c=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11]],l=new Map,u=new Ot,h=new Ce,f=new L(0,1,0),d=new L,p=new L;let v=Number.NaN;const g=()=>{const m=s.map(()=>0);let _=0;for(let M=v;M<v+t;M++){let x=l.get(M);x||l.set(M,x=SR(M,e));for(const y of x){const b=o[y.kind];if(m[y.kind]>=r[y.kind])continue;u.compose(y.p,h.setFromAxisAngle(f,y.r),d.set(y.s,y.s,y.s)),b.setMatrixAt(m[y.kind]++,u);const[w,S]=c[y.kind];u.compose(d.set(y.p.x,y.p.y+.12,y.p.z),h,p.set(w*y.s,1,S*y.s)),a.setMatrixAt(_++,u)}}for(const M of[...l.keys()])(M<v-1||M>v+t)&&l.delete(M);o.forEach((M,x)=>{M.count=m[x],M.visible=M.count>0,M.instanceMatrix.needsUpdate=!0}),a.count=_,a.instanceMatrix.needsUpdate=!0};return{group:i,update(m,_){const M=Math.floor(m/ds)-em;M!==v&&(v=M,g()),gf.value=1-.6*Math.min(1,Math.max(0,(_-.4)/.5))}}}const nm=ce.tower.phase,TR=1,ER=2600;function im(n,t,e){const i=[],s=o=>{const a=Math.PI/2+o*Math.PI/5,c=o%2?.382:1;return[Math.cos(a)*n*c,Math.sin(a)*n*c]};for(let o=0;o<10;o++){const[a,c]=s(o),[l,u]=s(o+1);i.push(0,0,t,a,c,t,l,u,t)}const r=new Yt;return r.setAttribute("position",new St(new Float32Array(i),3)),r.computeVertexNormals(),te(r,e,.04)}function AR(){const n=[.62,.6,.56],t=[te(new tn(3.6,4.6,28,8).translate(0,8,0),n,.12,2),te(new tn(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),te(new tn(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=te(new Vt(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return Jn([...t,e,im(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),im(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function sm(n){const t=ou(n)+(n===1?ou(2):Po);let e=Math.floor((t+ui-nm)/We)*We+nm-ui;for(e>=t&&(e-=We);$n(e)>0;)e-=We;return e}function RR(){const n=new $t(AR(),uf);n.visible=!1,n.matrixAutoUpdate=!1;let t=Number.NaN;const e=new L,i=new L,s=r=>{const{latMin:o,latMax:a,mirror:c}=ce.tower,l=TR*(c&&es(r)%2!==0?-1:1);i.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let h=o;h<=a;h+=20)ue(r+u,l*h,0,e),e.y=je(e.x,e.z),e.y>i.y&&i.copy(e);n.position.copy(i),n.rotation.y=-.6,n.scale.setScalar(2),n.updateMatrix()};return{mesh:n,update(r){if(ja()!=="ha-giang"){n.visible=!1;return}const o=g0(r),a=sm(o),c=sm(o+1),l=Math.abs(r-a)<Math.abs(r-c)?a:c;n.visible=Math.abs(r-l)<ER,n.visible&&l!==t&&(t=l,s(l))}}}const Eo=12,fc={uPools:{value:Array.from({length:Eo},()=>new me)},uPoolCount:{value:0},uPoolNight:{value:0}},CR=`
uniform vec4 uPools[${Eo}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${Eo}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let dc=0,nv=Eo;function PR(n){nv=Math.max(0,Math.min(Eo,Math.round(n)))}function LR(){dc=0}function ah(n,t,e,i,s){dc>=nv||s>330||t-je(n,e)>28||fc.uPools.value[dc++].set(n,t,e,i)}function NR(n){fc.uPoolCount.value=dc,fc.uPoolNight.value=n}const Xs=14,Gl=9.5,Wl=3.4,IR=.9,Aa=7,rm=4,Xl=13,om=30,am=420,cm=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],DR=[-1,1];function UR(n,t){for(const e of n.obstacles)if(Math.abs(e.z-t)<9)return!0;return!1}function kR(){const n=Math.ceil((am+om)/Xs)+2,t=pf(n*(2*Aa)+Math.ceil(n/rm)*Xl),e={x:0,y:0,z:0};return{points:t.points,setViewport:(i,s)=>t.setViewport(i,s),update(i,s,r,o){const a=Math.min(1,Math.max(0,(r-.38)/.35));let c=0,l=0;if(a>.01){const u=Math.floor((i.z-om)/Xs),h=Math.floor((i.z+am)/Xs);for(let f=u;f<=h;f++){const d=f*Xs;if(!($n(d)<.97||$n(d+Xs)<.97)){for(const p of DR)for(let v=0;v<Aa;v++){const g=(v+.5)/Aa;ue(d+g*Xs,p*Gl,-Zr+Wl-4*g*(1-g)*IR,e);const m=cm[((f*Aa+v)%3+3)%3],_=.82+.18*Math.sin(s*3.1+f*1.7+v*2.3+p);t.set(c++,e.x,e.y,e.z,.6,m[0],m[1],m[2],a*_)}if(!(f%rm!==0||UR(i,d))){l<3&&d>i.z-10&&(ue(d,0,-Zr+Wl,e),ah(e.x,e.y,e.z,1.5,d-o),l++);for(let p=0;p<Xl;p++){const v=(p+.5)/Xl;ue(d,-Gl+v*2*Gl,-Zr+Wl+.3-4*v*(1-v)*1.3,e);const g=cm[p%3];t.set(c++,e.x,e.y,e.z,.6,g[0],g[1],g[2],a*(.85+.15*Math.sin(s*2.7+p)))}}}}}t.commit(c)}}}function FR(){const n=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([t,e])=>new ot(t,e));return new Uo(n,16)}function OR(){return new Yn(1,1,1,6).translate(0,.5,0)}function BR(n){return new oe({uniforms:{uTime:n},side:Ee,vertexShader:`
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
}`})}function zR(n){return new oe({uniforms:{..._n.merge([lt.fog]),uTime:n},transparent:!0,depthWrite:!1,side:Ee,fog:!0,vertexShader:`
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
}`})}function HR(){const n=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([t,e])=>new ot(t*1.45,e*1.45));return new Uo(n,14)}function VR(){const n=[];for(let t=0;t<=8;t++){const e=t/8*Math.PI*.5;n.push(new ot(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new Uo(n,16)}const iv=`
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
}`,GR=`
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
}`,WR=`
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
}`;function XR(){return new oe({vertexShader:iv,fragmentShader:GR,side:Ee,uniforms:{uTime:{value:0}}})}function $R(){return new oe({vertexShader:iv,fragmentShader:WR,side:Ee})}function oo(n,t,e){return e.setRGB(n,t%1,0)}const $l=2.1,pc=8,Xi=8,qR=46,KR=n=>new oe({uniforms:{uTime:n},vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1});function YR(n){const t=new He(new nf($l,.12,6,36),new cn({color:new ct("#ffb04a").multiplyScalar(.95)}),Xi),e=new He(VR(),$R(),Xi),i=new He(new tn(1,.55,1,12,1,!0).translate(0,.5,0),KR(n),Xi*3),s=new He(FR(),BR(n),Xi),r=new He(OR(),zR(n),Xi),o=new ct,a=[t,e,i,s,r];for(const M of a)M.frustumCulled=!1,M.count=0;e.setColorAt(0,oo(1,0,o)),i.setColorAt(0,o.setRGB(0,0,0)),r.setColorAt(0,o),r.renderOrder=3;const c=new Ot,l=new Ce,u=new Ce,h=new Ce,f=new L,d=new L;let p=0,v=0,g=0,m=0;const _=(M,x,y,b,w,S,T,R)=>{if(g>=i.instanceMatrix.count)return;const A=1-Math.min(1,Math.max(0,(w-450)/150));c.compose(f.set(M,x,y),l.identity(),d.set(b,qR,b)),i.setMatrixAt(g,c),i.setColorAt(g++,o.setRGB(S*A,T*A,R*A))};return{meshes:a,begin(){p=v=g=m=0},draw(M,x,y,b,w,S,T,R){const A=1+1.6*Math.min(1,Math.max(0,(w-30)/90));if(M.kind==="thermal"&&p<Xi){u.setFromAxisAngle(f.set(0,1,0),Math.sin(S*1.3+M.id)*.45),c.compose(f.set(x,y,b),u,d.set(A,A,A)),t.setMatrixAt(p++,c);for(let P=0;P<pc;P++){const I=S*1.8+P/pc*Math.PI*2;f.set(Math.cos(I)*$l*A,Math.sin(I)*$l*A,0).applyQuaternion(u),R.body(x+f.x,y+f.y-.5*A,b+f.z,.36*A,1.15,P*.31+M.id*.1),R.glow(x+f.x,y+f.y-.85,b+f.z,.8+1.4*T,1,.7,.28,.85)}R.glow(x,y,b,(6+6*T)*A*.8,1,.7,.25,.45),_(x,y-1,b,1.5*A,w,1.4,.95,.38);for(let P=0;P<6;P++){const I=(S*.9+P/6)%1,N=P*2.1+M.id;R.glow(x+Math.cos(N)*1.1*A,y-2.4+I*4.8*A,b+Math.sin(N)*.6,.9*A,1,.8,.35,Math.sin(I*Math.PI)*.9)}}else if(M.kind==="shield"&&v<Xi){l.setFromAxisAngle(f.set(0,0,1),Math.sin(S*1.7+M.id)*.3),c.compose(f.set(x,y+.9*A+.5*Math.sin(S*2.3+M.id),b),l,d.set(1.5*A,1.5*A,1.5*A)),e.setColorAt(v,oo(1,0,o)),e.setMatrixAt(v++,c),R.glow(x,y,b,(3+5*T)*A*.8,.3,.95,.9,.55),_(x,y+.4,b,1.3*A,w,.25,1.1,.95);for(let P=0;P<6;P++){const I=(S*.6+P/6)%1,N=S*2+P*1.05;R.glow(x+Math.cos(N)*.9*A,y+1+I*16*A,b+Math.sin(N)*.9*A,1.1*A,.35,1,.92,Math.sin(I*Math.PI)*.85)}}else if(M.kind==="smoke"&&m<Xi){l.setFromAxisAngle(f.set(0,1,0),S*1.6+M.id).premultiply(u.setFromAxisAngle(f.set(0,0,1),Math.sin(S*2.1+M.id)*.22));const P=1.6*A,I=y+.5*A+.35*Math.sin(S*2.6+M.id);c.compose(f.set(x,I,b),l,d.set(P,P,P)),s.setMatrixAt(m,c),f.set(0,P,0).applyQuaternion(l);const N=x+f.x,U=I+f.y,z=b+f.z;c.compose(f.set(N,U,z),h,d.set(6*A,13*A,1)),r.setMatrixAt(m,c),r.setColorAt(m++,o.setRGB(1-Math.min(1,Math.max(0,(w-450)/150)),M.id*.137%1,0)),R.glow(N,U,z,(1.2+2*T)*A,1,.55,.42,.9),R.glow(x,y,b,(3+5*T)*A*.8,1,.3,.62,.5),_(x,y+.4,b,.9*A,w,1.15,.22,.55);for(let V=0;V<5;V++){const J=(S*2.4+V/5)%1,B=V*2.4+M.id;R.glow(N+Math.cos(B)*J*.8*A,U+J*2.2*A,z+Math.sin(B)*J*.8*A,.5*A,1,.75,.4,(1-J)*.9)}}},commit(){t.count=p,e.count=v,i.count=g,s.count=r.count=m;for(const M of a)M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0)}}}const Hn={x:0,y:0,z:0},ql=260,lm=1600,um=220,Ra=3200;function ZR(n){const t=Math.round(lm*n),e=new ke,i=XR(),s=new He(HR(),i,ql+8*pc);s.frustumCulled=!1;const r=YR(i.uniforms.uTime),o=pf(ql+lm+um+8*(pc+7)+56);e.add(s,...r.meshes,o.points);const a=new ct;s.setColorAt(0,oo(1,0,a));const c=[],l=new Map,u=new Ot,h=new Ce,f=new L,d=new L(1,1,1),p=new Ce;let v=0,g=0;const m={body(_,M,x,y,b,w){v>=s.instanceMatrix.count||(u.compose(f.set(_,M,x),h.identity(),d.set(y,y,y)),s.setColorAt(v,oo(b,w,a)),s.setMatrixAt(v++,u))},glow:(_,M,x,y,b,w,S,T)=>o.set(g++,_,M,x,y,b,w,S,T)};return{group:e,setViewport:(_,M)=>o.setViewport(_,M),burst(_,M,x,y,b){for(let w=0;w<y&&c.length<um;w++){const S=Math.random()*Math.PI*2,T=Math.random()*2-1,R=6+Math.random()*10;c.push({x:_,y:M,z:x,vx:Math.cos(S)*R*Math.sqrt(1-T*T),vy:T*R+3,vz:Math.sin(S)*R*Math.sqrt(1-T*T),life:b?.7:1})}},update(_,M,x,y,b){v=0,g=0,i.uniforms.uTime.value=M,r.begin();for(const T of _.pickups){if(T.z-_.z>600||v>=ql)continue;ue(T.z,vn(T.lane),T.v+Math.sin(M*2.4+T.id)*.45,Hn);let R=Hn.x,A=Hn.y,P=Hn.z,I=T.z,N=1;if(T.taken){const z=l.get(T.id)??M;l.set(T.id,z);const V=(M-z)/.6;if(V>=1)continue;I=_.z+4+V*10,ue(I,vn(T.lane),T.v,Hn),R=Hn.x,P=Hn.z,A=Hn.y+V*V*14,N=1-V}const U=Math.min(1,Math.max(0,(T.z-_.z-40)/210));N*=Math.min(1,Math.max(0,(I-b-2)/6)),!(N<=0)&&(T.kind==="lantern"?(h.setFromAxisAngle(f.set(0,1,0),M*.8+T.id).multiply(p.setFromAxisAngle(f.set(0,0,1),Math.sin(M*1.9+T.id)*.12)),u.compose(f.set(R,A,P),h,d.set(N,N,N)),s.setColorAt(v,oo(1,T.id*.137,a)),s.setMatrixAt(v++,u),o.set(g++,R,A-.9*N,P,1.4+3.2*U+1.2*y,1,.62,.22,(.75+.25*y)*N),!T.taken&&T.z>_.z-15&&ah(R,A-.9,P,1,T.z-b)):T.taken||(T.kind==="thermal"&&ah(R,A,P,1.6,T.z-b),r.draw(T,R,A,P,T.z-_.z,M,U,m)))}for(const T of l.keys())_.pickups.some(R=>R.id===T)||l.delete(T);s.count=v,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.commit();const w=Math.min(t,Math.floor(t*(.12+.88*y)));for(let T=0;T<w;T++){const R=ut(T*.37,1.7,81)*Ra,A=b-300+((R-b+300)%Ra+Ra)%Ra,P=Dn(A);if(P<.35)continue;const I=ut(T,2.9,82)<.5?-1:1;ue(A,I*(30+Math.pow(ut(T,3.3,83),1.5)*1400),0,Hn);const N=(M*(2+3*ut(T,4.1,84))+ut(T,5.3,85)*700)%700,U=Kn(A)-380+N+Math.sin(M*.5+T)*2,z=P*Math.min(1,N/60)*(1-Math.max(0,N-600)/100);o.set(g++,Hn.x,U,Hn.z,2.6,1,.5+.1*Math.sin(T),.16,z*(.35+.65*y))}const S=pn(_.z);for(let T=c.length-1;T>=0;T--){const R=c[T];if(R.life-=x*1.6,R.life<=0){c.splice(T,1);continue}R.vy-=9*x,R.x+=R.vx*x,R.y+=R.vy*x,R.x+=Math.sin(S)*_.speed*.85*x,R.z+=(R.vz+Math.cos(S)*_.speed*.85)*x,o.set(g++,R.x,R.y,R.z,.7*R.life+.2,1,.7,.3,R.life)}o.commit(g)}}}const bn=40;function JR(n){const t=[];for(let e=n.bottom;e<n.top;){t.push(e);const i=Math.min(Math.abs(e-n.bandLo),Math.abs(e-n.bandHi),e>n.bandLo&&e<n.bandHi?0:99);e+=Math.min(10,1.2+i*.12)}return t.push(n.top),t}function QR(n){const t=JR(n),e=[],i=[],s=[];for(const l of t){const u=l>=n.bandLo-.01&&l<=n.bandHi+.01,h=u?n.rc:n.radius(l),f=Math.min(1,Math.max(0,(n.radius(l+6)-h)/(h*.6)));for(let d=0;d<bn;d++){const p=d/bn*Math.PI*2,v=Math.cos(p),g=Math.sin(p),m=ut(v*1.4+n.seed*7.1,g*1.4+l/26,31)-.5,_=ut(v*4+n.seed,g*4+l/5,32)-.5,M=Math.max(0,Math.sin((l/7+ut(v,g,n.seed)*2)*Math.PI))**6*.12;let x=h*(1+.42*m+.12*_+M);u&&(x=n.rc*(.9+.1*(_+.5)));const y=Math.pow(.5+.5*Math.sin(p*9+m*5+n.seed+l/40),5),b=Math.pow(Math.max(0,Math.sin((l/4.6+ut(v*2,g*2,n.seed+9)*1.5)*Math.PI)),10),w=.1*y+.09*b;x*=1-w,e.push(v*x,l,g*x),s.push(Math.min(.85,Math.max(0,(1-x/h)*1.6)+w*2.5+f*.55)),i.push(n.crest&&l>n.top-.7?1:0)}}e.push(0,n.top+(n.crest?0:2.5),0),i.push(n.crest?1:0),s.push(0);const r=[];for(let l=0;l<t.length-1;l++)for(let u=0;u<bn;u++){const h=l*bn+u,f=l*bn+(u+1)%bn;r.push(h,h+bn,f,f,h+bn,f+bn)}const o=t.length*bn,a=(t.length-1)*bn;for(let l=0;l<bn;l++)r.push(a+l,o,a+(l+1)%bn);const c=new Yt;return c.setAttribute("position",new St(new Float32Array(e),3)),c.setAttribute("aCrest",new St(new Float32Array(i),1)),c.setAttribute("aShade",new St(new Float32Array(s),1)),c.setIndex(r),c.computeVertexNormals(),c}function jR(n,t){const e=[],i=new ct;for(let s=0;s<t;s++){const r=s<Math.ceil(t*.6),o=r?n.top-1.5-3*ut(s,n.seed,41):n.bandLo-6-40*ut(n.seed,s,42),a=n.seed*2.3+s*2.39,c=r?n.radius(o)*.75*ut(s,n.seed,43):n.radius(o)*.95,l=.35+.35*ut(s*1.3,n.seed,44),u=(ut(s,n.seed*3,45)<.45?Fg():Og()).clone();u.scale(l,l*1.1,l).rotateY(a).translate(Math.cos(a)*c,o,Math.sin(a)*c),i.setHSL(.24+.06*ut(s,7,n.seed),.3,.55);const h=u.getAttribute("color");if(h)for(let f=0;f<h.count;f++)h.setXYZ(f,h.getX(f)*i.r*2,h.getY(f)*i.g*2,h.getZ(f)*i.b*2);e.push(u)}return mi(e)}function tC(n,t){const e=46+10*ut(n,1,51);return{seed:n,rc:t,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:i=>i<-6.5?t+.3*Math.pow(-6.5-i,.9):(t+.32*(i-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-i)/7)))}}function eC(n,t){return{seed:n,rc:t,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,radius:e=>t+.28*Math.pow(Math.max(0,-6.5-e),.92)}}const bi=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2];function hm(n,t,e){const i=new Vt(n,1,7.6,Math.max(10,Math.round(n/2)),36,4).translate(0,.5,0),s=i.getAttribute("position"),r=new Float32Array(s.count);for(let a=0;a<s.count;a++){const c=s.getX(a),l=s.getY(a),u=s.getZ(a),h=Math.min(1,Math.max(0,(Math.abs(c)-9)/4)),f=t(c)-(1-h)*.6*ut(c*.5,u,3)-h*1.6*(ut(c*.3,u*.2,3)-.3),d=e(c)-10*ut(c*.06,1,4),p=d+(f-d)*l,v=1+.6*Math.max(0,Math.min(1,-p/40)),g=((p+3*ut(c*.04,0,7))/5.5%1+1)%1,m=2.4*(Gn(c*.07,p*.06,3,9)-.5),_=Math.min(1,Math.max(0,(f-p-.6)/2.4),Math.max(0,(p-d)/3)),M=(1.3*(1-g)-.65+m)*_;r[a]=_*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(g-.5)/.5)+.35*Math.max(0,-m));const x=u*v*(1+.3*(ut(c*.2,p*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*M;s.setXYZ(a,c*(1+.04*(ut(p*.1,u,6)-.5)),p,x)}const o=new Float32Array(s.count);for(let a=0;a<s.count;a++)o[a]=Math.abs(s.getX(a))<12&&s.getY(a)>.3?1:0;return i.setAttribute("aCrest",new St(o,1)),i.setAttribute("aShade",new St(r,1)),i.computeVertexNormals(),i}function ls(n,t,e=()=>0){const i=n.getAttribute("position"),s=new Float32Array(i.count*3),r=new Float32Array(i.count);for(let o=0;o<i.count;o++)s.set(t,o*3),r[o]=e(i.getY(o));return n.setAttribute("color",new St(s,3)),n.setAttribute("aSway",new St(r,1)),n}function nC(n,t){const e=[],i=bi([.6,.42,.27]),s=c=>10.2-2.2*(1-(2*c/n)**2);for(let c=-n/2;c<n/2;c+=.9)e.push(ls(new Vt(.8,.22,3).translate(c,-.55,0).toNonIndexed(),i));if(t)for(const c of[-n/2,n/2])e.push(ls(new Vt(1.2,260,1.2).translate(c,-118,0).toNonIndexed(),i));for(const c of[-1.5,1.5]){e.push(ls(new Vt(n,.08,.08).translate(0,1.2,c).toNonIndexed(),i));const l=Array.from({length:13},(u,h)=>new L(-n/2+h/12*n,0,c*.3)).map(u=>u.setY(s(u.x)));e.push(ls(new _c(new jh(l),24,.07,4).toNonIndexed(),i))}const r=[bi([.86,.12,.1]),bi([.98,.72,.12]),bi([.86,.12,.1]),bi([.95,.88,.7]),bi([.2,.55,.3]),bi([.2,.4,.75])];let o=0;for(let c=-n/2+.6;c<n/2;c+=1.15,o++){const l=s(c)-.05,u=Math.min(l-1.5,5.4+2.2*ut(c,2,8)+(o%3===0?1.3:0)),h=new Yn(.62,u,2,6),f=h.getAttribute("position");for(let p=0;p<f.count;p++){const v=(u/2-f.getY(p))/u;f.setX(p,f.getX(p)*(1-.15*v)),v>.99&&Math.abs(f.getX(p))<.01&&f.setY(p,f.getY(p)+.5)}h.rotateY((ut(c,5,9)-.5)*.9).translate(c,l-u/2,o%2?.25:-.25);const d=r[Math.floor(ut(c*1.7,3,10)*r.length*.999)];e.push(ls(h.toNonIndexed(),d,p=>Math.min(1,Math.max(0,(l-p)/u))))}for(let c=-n/2+2.3;c<n/2-1;c+=4.6){const l=s(c)-.75;e.push(ls(new tn(.34,.34,.66,8).translate(c,l,-.6).toNonIndexed(),bi([.95,.16,.08]),()=>.3)),e.push(ls(new tn(.2,.2,.1,8).translate(c,l+.38,-.6).toNonIndexed(),bi([.98,.75,.25]),()=>.3))}const a=mi(e);return a.computeVertexNormals(),a}const Fr=2.9,iC=-1.25;function sC(n,t,e,i){const s=Fr+t,r=new Vt(s,1,6.8,Math.max(6,Math.round(s/3)),8,3).translate(s/2-Fr,.5,0),o=r.getAttribute("position"),a=new Float32Array(o.count);for(let c=0;c<o.count;c++){const l=o.getX(c),u=o.getY(c),h=o.getZ(c),f=Math.min(1,Math.max(0,(l+Fr)/Math.max(1,s))),d=9+(e-9)*Math.pow(f,.7)+6*(Gn(l*.08,h*.1+i,3,31)-.5),p=l>Fr?(l-Fr)*.35+.8*ut(l*.4,h*.5+i,5):0,v=iC+p,g=v+(d-v)*u,m=1.6*(Gn(l*.09+i,g*.07,3,37)-.5)*Math.min(1,u*6);a[c]=Math.max(0,.6-u*3)*.8,o.setXYZ(c,l*n,g,h*(1+.15*Math.min(1,g/30))+Math.sign(h)*m)}if(r.setAttribute("aShade",new St(a,1)),r.setAttribute("aCrest",new St(new Float32Array(o.count),1)),n<0){const c=r.getIndex();for(let l=0;l<c.count;l+=3){const u=c.getX(l+1);c.setX(l+1,c.getX(l+2)),c.setX(l+2,u)}}return r.computeVertexNormals(),r}const rC=new oe({uniforms:{...ur},vertexShader:`
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
${wc}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:en,transparent:!0,depthWrite:!1}),fm=(n,t,e)=>`${Math.round(n*50)},${Math.round(t*50)},${Math.round(e*50)}`;function oC(n){if(n.getAttribute("aOutline"))return n;const t=n.getAttribute("position"),e=n.getAttribute("normal"),i=new Map;for(let r=0;r<t.count;r++){const o=fm(t.getX(r),t.getY(r),t.getZ(r)),a=i.get(o)??[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),i.set(o,a)}const s=new Float32Array(t.count*3);for(let r=0;r<t.count;r++){const o=i.get(fm(t.getX(r),t.getY(r),t.getZ(r))),a=Math.hypot(o[0],o[1],o[2]);s.set(a>1e-6?[o[0]/a,o[1]/a,o[2]/a]:[0,1,0],r*3)}return n.setAttribute("aOutline",new St(s,3)),n}function qr(n){const t=new $t(oC(n),rC);return t.userData.hazardHull=!0,t}function aC(n,t){n&&(n.visible=t>5&&t<105)}const Ca=BA(),cC=uf,sv={value:1},rv={value:0},vf=new fr({vertexColors:!0,side:Ee});vf.onBeforeCompile=n=>{n.uniforms.uLift=sv,n.uniforms.uTime=rv,Object.assign(n.uniforms,ur),n.vertexShader=`attribute float aSway;
uniform float uTime;
${n.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),n.fragmentShader=`uniform float uLift;
${wc}${n.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};vf.customProgramCacheKey=()=>"cloth-hazard";const ov=(n,t)=>({rock:QR(n),trees:jR(n,t)}),dm=[0,1,2,3,4,5,6,7].map(n=>ov(tC(n*1.7+.3,ts.pillar.halfX),9)),pm=[0,1,2].map(n=>ov(eC(n*2.3+.7,ts.spike.halfX),4)),mm=new Map;function lC(n,t){const e=Math.ceil(n/4)*4,i=`${e}:${t}`;let s=mm.get(i);return s||mm.set(i,s=nC(e,t)),s}const gm=new Map;function Kl(n,t){let e=gm.get(n);return e||gm.set(n,e=t()),e}function uC(n,t){const e=Ne(n.z),i=n.kind==="ridge"||n.kind==="bridge";ue(n.z,i?0:vn(n.lane),0,t);const s=Math.round((je(t.x,t.z)-e)*2)/2,r=u=>new $t(u,bR).add(qr(u)),o=No()>.5,a=o?"hg":"";if(n.kind==="ridge")return r(Kl(`${a}d${s}`,()=>S3(26,1,s,o?Ac:void 0)));if(n.kind==="bridge")return r(Kl(`${a}g${s}`,()=>w3(s,o?dR:void 0)));const c=n.id%3,l=r(Kl(`${a}h${c}:${s}`,()=>_R(c,1-s,o)));return l.position.y=s,l.updateMatrix(),new ke().add(l,fR(8,9,s+.12))}function hC(){const n=new ke,t=new Map,e={x:0,y:0,z:0},i=s=>{const r=ir(s.z);let o;if(ji(s.z))o=uC(s,e);else if(s.kind==="pillar"||s.kind==="spike"){const l=(s.kind==="pillar"?dm:pm)[s.id%(s.kind==="pillar"?dm.length:pm.length)];o=new ke().add(new $t(l.rock,Ca).add(qr(l.rock)),new $t(l.trees,cC))}else if(s.kind==="ridge"){const l=Ne(s.z),u=s.open?64:2*r+18,h=new Map,f=g=>{let m=h.get(g);return m===void 0&&h.set(g,m=je(ue(s.z,g,0,e).x,e.z)-l),m},d=u/2-20,p=g=>Math.min(1,Math.abs(g)/d),v=s.open?hm(u,g=>1+Math.max(0,Math.abs(g)-d)*2.2,g=>Math.abs(g)<d?-16-70*p(g)**6:f(g)-12):hm(u,g=>Math.abs(g)<10?1:Math.max(1,f(g)+3),g=>f(g)-12);o=new $t(v,Ca).add(qr(v)),o.userData.own=!0}else if(s.kind==="overhang"){const l=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,u=sC(l,Math.max(8,r+18-Math.abs(vn(s.lane))),70,s.id%97);o=new $t(u,Ca).add(qr(u)),o.userData.own=!0}else{const l=lC(s.open?46:2*r+18,s.open);o=new $t(l,vf).add(qr(l))}const a=s.kind==="ridge"||s.kind==="bridge";ue(s.z,a?0:vn(s.lane),0,e),o.position.set(e.x,e.y,e.z);const c=a||ji(s.z)||s.kind==="overhang";return o.rotation.y=pn(s.z)+(c?0:s.id*2.39),c||o.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),o.matrixAutoUpdate=!1,o.updateMatrix(),o.traverse(l=>{l.matrixAutoUpdate=!1,l.updateMatrixWorld(),l.userData.hazardHull&&(o.userData.hull=l)}),n.add(o),o};return{group:n,update(s,r,o){rv.value=r;const a=Math.min(1,Math.max(0,(o-.4)/.5));sv.value=1-.75*a,Ca.uniforms.uLift.value=1-.45*a;const c=new Set;for(const l of s.obstacles){c.add(l.id);let u=t.get(l.id);u||t.set(l.id,u=i(l)),aC(u.userData.hull,l.z-s.z)}for(const[l,u]of t)c.has(l)||(n.remove(u),u.userData.own&&u.geometry.dispose(),t.delete(l))}}}function fC(n){const t=new Ui({map:n,roughness:.8,side:Ee}),e={uTime:{value:0},uFlutter:{value:1}};return t.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},t.userData.setTime=(i,s)=>{e.uTime.value=i,e.uFlutter.value=s},t}const Pa=new Ui({color:"#a8141c",roughness:.55}),dC=new Ui({color:"#f6f4ef",roughness:.18,metalness:.05}),pC=new Ui({color:"#15161c",roughness:.08,metalness:.6}),Yl=new Ui({color:"#1c1d22",roughness:.75});function La(n,t,e,i){const s=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=new $t(new Yh(e,s,4,10),i);return r.position.set((n[0]+t[0])/2,(n[1]+t[1])/2,(n[2]+t[2])/2),r.lookAt(r.position.x+t[0]-n[0],r.position.y+t[1]-n[1],r.position.z+t[2]-n[2]),r.rotateX(Math.PI/2),r}function mC(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");t.fillStyle="#efe2c8",t.fillRect(0,0,256,256);for(let i=-8;i<16;i++)for(const[s,r]of[[1,1],[1,-1]])t.strokeStyle="rgba(120,80,50,0.28)",t.lineWidth=2,t.beginPath(),t.moveTo(i*32,r>0?0:256),t.lineTo(i*32+256*s,r>0?256:0),t.stroke();t.fillStyle="#2bb5ad",t.fillRect(0,18,256,14),t.fillStyle="#a8141c",t.fillRect(0,0,256,10),t.fillRect(0,226,256,30);const e=new Kh(n);return e.colorSpace=Ge,e.anisotropy=4,e}function vm(n,t,e,i,s,r){const c=[],l=[],u=[];for(let f=0;f<=6;f++){const d=f/6;for(let p=0;p<=10;p++){const v=p/10,g=[0,1,2].map(m=>(1-d)*((1-v)*n[m]+v*t[m])+d*((1-v)*i[m]+v*e[m]));g[2]=g[2]+.12*d*Math.sin(Math.PI*v),g[1]=g[1]+s*Math.sin(Math.PI*v)*Math.sin(Math.PI*d)+.025*Math.abs(Math.sin(Math.PI*v*4)),c.push(...g),l.push(v*2,d)}}for(let f=0;f<6;f++)for(let d=0;d<10;d++){const p=f*11+d;r?u.push(p,p+1,p+10+1,p+1,p+10+2,p+10+1):u.push(p,p+10+1,p+1,p+1,p+10+1,p+10+2)}const h=new Yt;return h.setAttribute("position",new St(new Float32Array(c),3)),h.setAttribute("uv",new St(new Float32Array(l),2)),h.setIndex(u),h.computeVertexNormals(),h}function gC(){const n=new ke,t=new ke;n.add(t);const e=mC(),i=fC(e);t.add(La([0,0,-.32],[0,.02,.5],.18,Pa));const s=new $t(new vs(.15,20,14),dC);s.position.set(0,.07,.78);const r=new $t(new vs(.152,20,10,-1.1,2.2,1.35,.6),pC);r.position.copy(s.position),r.rotation.x=-.3,t.add(s,r);const o=new $t(new Vt(.26,.1,.4,2,1,2),Yl);o.position.set(0,.19,.1),t.add(o);const a=[],c=[];for(const p of[1,-1]){const v=new ke,g=[.17*p,.05,.44],m=[1.02*p,.07,.3];v.add(La(g,m,.06,Pa));const _=new $t(new vs(.06,8,6),Yl);_.position.set(m[0]+.05*p,m[1],m[2]+.02),v.add(_),c.push(_),v.add(new $t(vm(g,m,[.62*p,.02,-.2],[.2*p,0,-.42],.07,p<0),i)),a.push(v),t.add(v)}const l=[.14,0,-.34],u=[-.14,0,-.34],h=[.33,-.03,-1.18],f=[-.33,-.03,-1.18];t.add(La(l,h,.075,Pa),La(u,f,.075,Pa)),t.add(new $t(vm([.13,0,-.36],[-.13,0,-.36],f,h,.05,!1),i));const d=[];for(const p of[h,f]){const v=new $t(new Vt(.12,.17,.13),Yl);v.position.set(p[0],p[1]-.04,p[2]-.06),t.add(v),d.push(v)}return{root:n,body:t,feet:d,tips:c,ankles:d,animate(p,v,g){for(const m of a)m.scale.x=v;i.userData.setTime?.(p,g)}}}const vC={roll:.62,flip:.9,split:3,spiral:1.5},xm=ce.edge-10,Or=n=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,n)));function xC(){const n={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let t=null,e=0,i=1,s=0,r=!1,o=Number.NaN,a=0;const c=(l,u)=>{t=l,e=0,i=u,r=!0};return{trick(l,u){return t!==null?!1:(c(l,u),!0)},update(l,u){if(n.roll=n.pitch=n.dx=n.dv=n.cam=0,n.spread=null,l.mode!=="run")return t=null,o=Number.NaN,n;const h=Ve(l.z);if(o<xm&&h>=xm&&h-o<200?c("split",es(l.z)%2===0?1:-1):t===null&&l.thermalT>0&&a<=0&&c("spiral",l.x>=0?-1:1),o=h,a=l.thermalT,t===null)return n;r&&(r=!1,s=l.obstacles.some(v=>v.z>l.z-2&&v.z<l.z+l.speed)?1:3),e+=u;const f=e/vC[t];if(f>=1)return t=null,n;const d=Jm(l.z);if(t==="roll")n.roll=i*2*Math.PI*Or(f),n.spread=1.06;else if(t==="flip"){const p=2*Math.PI*Or(f);n.pitch=-p,n.dv=s*.5*(1-Math.cos(p)),n.spread=.82}else if(t==="split")n.roll=i*Math.PI*(Or(f/.15)+Or((f-.7)/.22)),n.spread=1.04;else{const p=4*Math.PI*Or(f),v=Math.sin(Math.PI*f);n.roll=i*p,n.dx=i*v*Math.sin(p),n.dv=v*(1-Math.cos(p))}return(t==="roll"||t==="split")&&(n.cam=i*Math.sin(Math.abs(n.roll)/2)*(.12+.3*d)),n}}}const av=n=>2.5*(1-Math.exp(-n*6)),_C=n=>4.5*Math.min(n,1.4)**2,Na={x:0,y:0,z:0};function cv(n){return ue(n.z-av(n.crashT),n.x,n.v,Na),Math.max(0,Math.min(_C(n.crashT),Na.y-je(Na.x,Na.z)-.6))}function MC(){let n=0,t=0,e=0,i=0,s=0,r=0,o=0,a=1;const c=xC();let l=0;return{lateralSpeed:()=>e,trick:(u,h)=>c.trick(u,h),camRoll:()=>l,apply(u,h,f,d){const{root:p,body:v}=u;if(d>0){const w=1-Math.exp(-d*14);e+=((h.x-n)/d-e)*w,i+=((h.v-t)/d-i)*w}n=h.x,t=h.v;const g=c.update(h,d);if(l=g.cam,ue(h.z,h.x+g.dx,h.v+g.dv,p.position),p.rotation.order="YXZ",p.rotation.set(-Math.atan(Ci(h.z)),pn(h.z),0),v.rotation.order="ZXY",h.mode==="crash"||h.mode==="over"){ue(h.z-av(h.crashT),h.x,h.v-cv(h),p.position),v.rotation.set(Math.sin(f*9)*1.6,f*4,f*13),u.animate(f,.7,2.5,0,d);return}const m=1-Math.exp(-d*10);s+=(Math.max(-1.1,Math.min(1.1,e*.027+Zm(h.z,h.speed)))-s)*m;const _=-(Math.atan(Ci(h.z+18))-Math.atan(Ci(h.z)))*.9;r+=(Math.max(-.45,Math.min(.5,-i*.045+_))-r)*m,o+=(Math.max(-.2,Math.min(.2,e*.006))-o)*m;const M=g.spread??(h.vert==="dive"?.8:h.vert==="flare"?1.06:1);a+=(M-a)*m;const x=Math.sin(f*23)*.012+Math.sin(f*7.3)*.018,y=(h.stunT/st.stunTime)**2;v.rotation.set(r+g.pitch+x+.3*y*Math.sin(f*9.3+1),o+.28*y*Math.sin(f*6.1),s+g.roll+x*.6+.6*y*Math.sin(f*13));const b=(h.vert==="dive"?1.8:h.thermalT>0?1.4:1)+1.6*y;u.animate(f,a-.22*y,b,Math.max(-1,Math.min(1,e/35+Math.sin(f*11)*y)),d)}}}function yC(n){const t=new Map,e=new Map,i=n.clone();return lv(n,i,function(s,r){t.set(r,s),e.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function lv(n,t,e){e(n,t);for(let i=0;i<n.children.length;i++)lv(n.children[i],t.children[i],e)}class bC extends gr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new AC(e)}),this.register(function(e){return new RC(e)}),this.register(function(e){return new FC(e)}),this.register(function(e){return new OC(e)}),this.register(function(e){return new BC(e)}),this.register(function(e){return new PC(e)}),this.register(function(e){return new LC(e)}),this.register(function(e){return new NC(e)}),this.register(function(e){return new IC(e)}),this.register(function(e){return new EC(e)}),this.register(function(e){return new DC(e)}),this.register(function(e){return new CC(e)}),this.register(function(e){return new kC(e)}),this.register(function(e){return new UC(e)}),this.register(function(e){return new wC(e)}),this.register(function(e){return new _m(e,se.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new _m(e,se.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new zC(e)})}load(t,e,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ro.extractUrlBase(t);o=ro.resolveURL(l,this.path)}else o=ro.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new sg(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,i,s){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===uv){try{o[se.KHR_BINARY_GLTF]=new HC(t)}catch(h){s&&s(h);return}r=JSON.parse(o[se.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new tP(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case se.KHR_MATERIALS_UNLIT:o[h]=new TC;break;case se.KHR_DRACO_MESH_COMPRESSION:o[h]=new VC(r,this.dracoLoader);break;case se.KHR_TEXTURE_TRANSFORM:o[h]=new GC;break;case se.KHR_MESH_QUANTIZATION:o[h]=new WC;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,s)}parseAsync(t,e){const i=this;return new Promise(function(s,r){i.parse(t,e,s,r)})}}function SC(){let n={};return{get:function(t){return n[t]},add:function(t,e){n[t]=e},remove:function(t){delete n[t]},removeAll:function(){n={}}}}function Oe(n,t,e){const i=n.json.materials[t];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const se={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class wC{constructor(t){this.parser=t,this.name=se.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let i=0,s=e.length;i<s;i++){const r=e[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,i="light:"+t;let s=e.cache.get(i);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new ct(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],wn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new og(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new J1(u),l.distance=h;break;case"spot":l=new Y1(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(i,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,i=this.parser,r=i.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(e.cache,a,c)})}}class TC{constructor(){this.name=se.KHR_MATERIALS_UNLIT}getMaterialType(){return cn}extendParams(t,e,i){const s=[];t.color=new ct(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],wn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(t,"map",r.baseColorTexture,Ge))}return Promise.all(s)}}class EC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class AC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(r,r)}return Promise.all(s)}}class RC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class CC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class PC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_SHEEN}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(e.sheenColor=new ct(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],wn)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,Ge)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class LC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class NC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_VOLUME}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return e.attenuationColor=new ct().setRGB(r[0],r[1],r[2],wn),Promise.all(s)}}class IC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_IOR}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class DC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return e.specularColor=new ct().setRGB(r[0],r[1],r[2],wn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,Ge)),Promise.all(s)}}class UC{constructor(t){this.parser=t,this.name=se.EXT_MATERIALS_BUMP}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(s)}}class kC{constructor(t){this.parser=t,this.name=se.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Oe(this.parser,t,this.name)!==null?pi:null}extendMaterialParams(t,e){const i=Oe(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class FC{constructor(t){this.parser=t,this.name=se.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,i=e.json,s=i.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class OC{constructor(t){this.parser=t,this.name=se.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class BC{constructor(t){this.parser=t,this.name=se.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class _m{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,i=e.bufferViews[t];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,s.mode,s.filter),d})})}else return null}}class zC{constructor(t){this.name=se.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,i=e.nodes[t];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=e.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Rn.TRIANGLES&&l.mode!==Rn.TRIANGLE_STRIP&&l.mode!==Rn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const p of h){const v=new Ot,g=new L,m=new Ce,_=new L(1,1,1),M=new He(p.geometry,p.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,y),c.SCALE&&_.fromBufferAttribute(c.SCALE,y),M.setMatrixAt(y,v.compose(g,m,_));let x=null;for(const y in c)if(y==="_COLOR_0"){const b=c[y];M.instanceColor=new vo(b.array,b.itemSize,b.normalized)}else if(y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"){if(x===null){const w=M.geometry;x=new Yt,x.name=w.name;for(const S in w.attributes)x.setAttribute(S,w.attributes[S]);for(const S in w.morphAttributes)x.morphAttributes[S]=w.morphAttributes[S];w.index!==null&&x.setIndex(w.index),x.morphTargetsRelative=w.morphTargetsRelative;for(const S of w.groups)x.addGroup(S.start,S.count,S.materialIndex);w.boundingBox!==null&&(x.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(x.boundingSphere=w.boundingSphere.clone()),x.drawRange.start=w.drawRange.start,x.drawRange.count=w.drawRange.count,x.userData=Object.assign({},w.userData),M.geometry=x}const b=c[y];x.setAttribute(y,new vo(b.array,b.itemSize,b.normalized))}Ie.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const uv="glTF",Br=12,Mm={JSON:1313821514,BIN:5130562};class HC{constructor(t){this.name=se.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Br),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==uv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Br,r=new DataView(t,Br);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Mm.JSON){const l=new Uint8Array(t,Br+o,a);this.content=i.decode(l)}else if(c===Mm.BIN){const l=Br+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class VC{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=se.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const i=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=ch[u]||u.toLowerCase();a[h]=o[u]}for(const u in t.attributes){const h=ch[u]||u.toLowerCase();if(o[u]!==void 0){const f=i.accessors[t.attributes[u]],d=tr[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],g=c[p];g!==void 0&&(v.normalized=g)}h(d)},a,l,wn,f)})})}}class GC{constructor(){this.name=se.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const i=Math.cos(t.rotation),s=Math.sin(t.rotation);t.matrix.set(t.repeat.x*i,t.repeat.y*s,t.offset.x,-t.repeat.x*s,t.repeat.y*i,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class WC{constructor(){this.name=se.KHR_MESH_QUANTIZATION}}class hv extends dr{constructor(t,e,i,s){super(t,e,i,s)}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=i[r+o];return e}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-e,h=(i-e)/u,f=h*h,d=f*h,p=t*l,v=p-l,g=-2*d+3*f,m=d-f,_=1-g,M=m-f+h;for(let x=0;x!==a;x++){const y=o[v+x+a],b=o[v+x+c]*u,w=o[p+x+a],S=o[p+x]*u;r[x]=_*y+M*b+g*w+m*S}return r}}const XC=new Ce;class $C extends hv{interpolate_(t,e,i,s){const r=super.interpolate_(t,e,i,s);return XC.fromArray(r).normalize().toArray(r),r}}const Rn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ym={9728:Xe,9729:$e,9984:S0,9985:Fa,9986:Wr,9987:Ti},bm={33071:ri,33648:tc,10497:or},Zl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ch={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$i={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qC={CUBICSPLINE:void 0,LINEAR:po,STEP:fo},Jl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function KC(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Ui({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ni})),n.DefaultMaterial}function us(n,t,e){for(const i in e.extensions)n[i]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=e.extensions[i])}function ii(n,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(n.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function YC(n,t,e){let i=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(i){const f=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):n.attributes.position;o.push(f)}if(s){const f=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):n.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=h),r&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function ZC(n,t){if(n.updateMorphTargets(),t.weights!==void 0)for(let e=0,i=t.weights.length;e<i;e++)n.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(n.morphTargetInfluences.length===e.length){n.morphTargetDictionary={};for(let i=0,s=e.length;i<s;i++)n.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function JC(n){let t;const e=n.extensions&&n.extensions[se.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Ql(e.attributes):t=n.indices+":"+Ql(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)t+=":"+Ql(n.targets[i]);return t}function Ql(n){let t="";const e=Object.keys(n).sort();for(let i=0,s=e.length;i<s;i++)t+=e[i]+":"+n[e[i]]+";";return t}function lh(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function QC(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const jC=new Ot;class tP{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new SC,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new $1(this.options.manager):this.textureLoader=new j1(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return us(r,a,s),ii(a,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,i){if(t.refs[e]<=1)return i;const s=i.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(i,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const s=t(e[i]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&i.push(r)}return i}getDependency(t,e){const i=t+":"+e;let s=this.cache.get(i);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(i,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const i=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return i.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[se.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(ro.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(i){const s=e.byteLength||0,r=e.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(t){const e=this,i=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=Zl[s.type],a=tr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new St(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Zl[s.type],l=tr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,d=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let v,g;if(d&&d!==h){const m=Math.floor(f/d),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let M=e.cache.get(_);M||(v=new l(a,m*d,s.count*d/u),M=new OM(v,d/u),e.cache.add(_,M)),g=new Gh(M,c,f%d/u,p)}else a===null?v=new l(s.count*c):v=new l(a,f,s.count*c),g=new St(v,c,p);if(s.sparse!==void 0){const m=Zl.SCALAR,_=tr[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,y=new _(o[1],M,s.sparse.count*m),b=new l(o[2],x,s.sparse.count*c);a!==null&&(g=new St(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let w=0,S=y.length;w<S;w++){const T=y[w];if(g.setX(T,b[w*c]),c>=2&&g.setY(T,b[w*c+1]),c>=3&&g.setZ(T,b[w*c+2]),c>=4&&g.setW(T,b[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(t){const e=this.json,i=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,i){const s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=ym[f.magFilter]||$e,u.minFilter=ym[f.minFilter]||Ti,u.wrapS=bm[f.wrapS]||or,u.wrapT=bm[f.wrapT]||or,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Xe&&u.minFilter!==$e,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const i=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const o=s.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let p=f;e.isImageBitmapLoader===!0&&(p=function(v){const g=new qe(v);g.needsUpdate=!0,f(g)}),e.load(ro.resolveURL(h,r.path),p,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),ii(h,o),h.userData.mimeType=o.mimeType||QC(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[se.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[se.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[se.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let i=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new H0,qn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(t.isLine){const a="LineBasicMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new $h,qn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}t.material=i}getMaterialType(){return Ui}loadMaterial(t){const e=this,i=this.json,s=this.extensions,r=i.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[se.KHR_MATERIALS_UNLIT]){const h=s[se.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,e))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new ct(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],wn),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",h.baseColorTexture,Ge)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Ee);const u=r.alphaMode||Jl.OPAQUE;if(u===Jl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Jl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==cn&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ot(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==cn&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==cn){const h=r.emissiveFactor;a.emissive=new ct().setRGB(h[0],h[1],h[2],wn)}return r.emissiveTexture!==void 0&&o!==cn&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Ge)),Promise.all(l).then(function(){const h=new o(a);return r.name&&(h.name=r.name),ii(h,r),e.associations.set(h,{materials:t}),r.extensions&&us(s,h,r),h})}createUniqueName(t){const e=_e.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[se.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Sm(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=JC(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[se.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Sm(new Yt,l,e),l.mode===Rn.TRIANGLE_STRIP?f=f.then(d=>Zp(d,P0)):l.mode===Rn.TRIANGLE_FAN&&(f=f.then(d=>Zp(d,Wu))),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){const e=this,i=this.json,s=this.extensions,r=i.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?KC(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,p=u.length;d<p;d++){const v=u[d],g=o[d];let m;const _=l[d];if(g.mode===Rn.TRIANGLES||g.mode===Rn.TRIANGLE_STRIP||g.mode===Rn.TRIANGLE_FAN||g.mode===void 0){const M=r.isSkinnedMesh===!0,x=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");M&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=M&&x?new O0(v,_):new $t(v,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Rn.LINES)m=new z0(v,_);else if(g.mode===Rn.LINE_STRIP)m=new qh(v,_);else if(g.mode===Rn.LINE_LOOP)m=new qM(v,_);else if(g.mode===Rn.POINTS)m=new cc(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&ZC(m,r),m.name=e.createUniqueName(r.name||"mesh_"+t),ii(m,r),g.extensions&&us(s,m,g),e.assignFinalMaterial(m),h.push(m)}for(let d=0,p=h.length;d<p;d++)e.associations.set(h[d],{meshes:t,primitives:d});if(h.length===1)return r.extensions&&us(s,h[0],r),h[0];const f=new ke;r.extensions&&us(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,p=h.length;d<p;d++)f.add(h[d]);return f})}loadCamera(t){let e;const i=this.json.cameras[t],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new fn(MM.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(e=new ko(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),ii(e,i),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],i=[];for(let s=0,r=e.joints.length;s<r;s++)i.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new Ot;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Xh(a,c)})}loadAnimation(t){const e=this.json,i=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){const d=s.channels[h],p=s.samplers[d.sampler],v=d.target,g=v.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,_=s.parameters!==void 0?s.parameters[p.output]:p.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",_)),l.push(p),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],p=h[2],v=h[3],g=h[4],m=[];for(let M=0,x=f.length;M<x;M++){const y=f[M],b=d[M],w=p[M],S=v[M],T=g[M];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const R=i._createAnimationTracks(y,b,w,S,T);if(R)for(let A=0;A<R.length;A++)m.push(R[A])}const _=new B1(r,void 0,m);return ii(_,s),_})}createNodeMesh(t){const e=this.json,i=this,s=e.nodes[t];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){const e=this.json,i=this,s=e.nodes[t],r=i._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,jC)});for(let d=0,p=h.length;d<p;d++)u.add(h[d]);if(u.userData.pivot!==void 0&&h.length>0){const d=u.userData.pivot,p=h[0];u.pivot=new L().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(t){const e=this.json,i=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new B0:l.length>1?u=new ke:l.length===1?u=l[0]:u=new Ie,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),ii(u,r),r.extensions&&us(i,u,r),r.matrix!==void 0){const h=new Ot;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,i=this.json.scenes[t],s=this,r=new ke;i.name&&(r.name=s.createUniqueName(i.name)),ii(r,i),i.extensions&&us(e,r,i);const o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++){const f=c[u];f.parent!==null?r.add(yC(f)):r.add(f)}const l=u=>{const h=new Map;for(const[f,d]of s.associations)(f instanceof qn||f instanceof qe)&&h.set(f,d);return u.traverse(f=>{const d=s.associations.get(f);d!=null&&h.set(f,d)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,i,s,r){const o=[],a=t.name?t.name:t.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}$i[r.path]===$i.weights?(l(t),t.isGroup&&t.children.forEach(l)):c.push(a);let u;switch($i[r.path]){case $i.weights:u=bo;break;case $i.rotation:u=So;break;case $i.translation:case $i.scale:u=lc;break;default:i.itemSize===1?u=bo:u=lc;break}const h=s.interpolation!==void 0?qC[s.interpolation]:po,f=this._getArrayFromAccessor(i);for(let d=0,p=c.length;d<p;d++){const v=new u(c[d]+"."+$i[r.path],e.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),o.push(v)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const i=lh(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*i;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(i){const s=this instanceof So?$C:hv;return new s(this.times,this.values,this.getValueSize()/3,i)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function eP(n,t,e){const i=t.attributes,s=new Di;if(i.POSITION!==void 0){const a=e.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){const u=lh(tr[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new L,c=new L;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=e.json.accessors[h.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const v=lh(tr[f.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new Un;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function Sm(n,t,e){const i=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(const o in i){const a=ch[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(t.indices!==void 0&&!n.index){const o=e.getDependency("accessor",t.indices).then(function(a){n.setIndex(a)});s.push(o)}return ie.workingColorSpace!==wn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ie.workingColorSpace}" not supported.`),ii(n,t),eP(n,t,e),Promise.all(s).then(function(){return t.targets!==void 0?YC(n,t.targets,e):n})}const nP=2.15,iP=[Math.PI/2,0,0],sP=[new L(1,0,0),new L(0,1,0),new L(0,0,1)];class er{static q=new Ce;bone;rest;axes;cur=[0,0,0];constructor(t){this.bone=t,this.rest=t.quaternion.clone();const e=t.getWorldQuaternion(new Ce).invert();this.axes=sP.map(i=>i.clone().applyQuaternion(e))}static t=[0,0,0];set(t,e,i,s){const r=er.t;r[0]=t,r[1]=e,r[2]=i,this.bone.quaternion.copy(this.rest);for(let o=0;o<3;o++)this.cur[o]+=(r[o]-this.cur[o])*s,this.cur[o]&&this.bone.quaternion.multiply(er.q.setFromAxisAngle(this.axes[o],this.cur[o]))}}function rP(n){const t=f=>f.getWorldPosition(new L),e=f=>f.children.filter(d=>d.isBone),i=f=>{const d=[f];for(let p=e(f);p.length===1;p=e(p[0]))d.push(p[0]);return d},s=[];n.traverse(f=>{f.isBone&&s.push(f)});const r=s[0];if(!r)return null;const o=e(r).sort((f,d)=>t(d).z-t(f).z);if(o.length<3)return null;const a=i(o[0]),c=a[a.length-1],l=e(c).sort((f,d)=>Math.abs(t(f).x)-Math.abs(t(d).x));if(l.length<3)return null;const u=(f,d)=>({side:Math.sign(t(f).x),j:d(i(f)).map(p=>new er(p))}),h=o.slice(-2);return{spine:a.map(f=>new er(f)),neck:i(l[0]).slice(0,2).map(f=>new er(f)),arms:l.slice(-2).map(f=>u(f,d=>d.length>=4?d.slice(1,4):d.slice(0,3))),legs:h.map(f=>u(f,d=>d.slice(0,3))),toes:h.map(f=>i(f).at(-1)),ankles:h.map(f=>i(f)[2]??i(f).at(-1)),hands:l.slice(-2).map(f=>i(f).at(-1))}}const fv={value:0};function oP(n){const t=new Ui({map:n.map,roughness:.78,metalness:0,side:Ee});return t.onBeforeCompile=e=>{e.uniforms.uHurt=fv,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},t}function aP(){const n=new cn({color:new ct(.06,.02,.05),side:en});return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * 0.011;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function cP(n,t=!0){return new bC().loadAsync("models/pilot.glb").then(e=>{const i=e.scene,s=[];i.traverse(a=>{const c=a;c.isSkinnedMesh&&(c.material=oP(c.material),c.frustumCulled=!1,s.push(c))});for(const a of t?s:[]){const c=new O0(a.geometry,aP());c.bind(a.skeleton,a.bindMatrix),c.frustumCulled=!1,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent?.add(c)}const r=new ke;r.rotation.set(...iP),r.scale.setScalar(nP),r.position.set(0,0,.12),r.add(i),r.updateMatrixWorld(!0);const o=rP(i);for(const a of n.body.children)a.visible=!1;if(n.body.add(r),!o){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}n.feet=o.toes,n.ankles=o.ankles,n.tips=o.hands,n.animate=(a,c,l,u,h)=>{const f=1-Math.exp(-h*12),d=Math.min(1,Math.max(0,(1-c)/.2)),p=Math.min(1,Math.max(0,(c-1)/.06)),v=7*l;for(const{side:g,j:m}of o.arms){const _=.07+.16*p-.08*d;m.forEach((M,x)=>{const y=Math.sin(a*v-x*.8+(g>0?.4:0))*(.025+.02*x),b=x===0?.5*d-.12*p:x===1?.18*d:.08*d;M.set(0,g*b,g*((x===0?_:0)+y),f)})}for(const{side:g,j:m}of o.legs){const[_,M,x]=m;_?.set(-.05*p,-g*(.06+.08*p-.14*d)+.07*u,0,f),M?.set(-(.08+.3*p+Math.sin(a*v*.5+g)*.03),0,0,f),x?.set(1.15,0,0,f)}o.spine.forEach((g,m)=>g.set(Math.sin(a*1.7+m)*.015-.06*p,.07*u,0,f)),o.neck.forEach((g,m)=>g.set(m===0?-(.3+.1*d):-.22,m===0?.05*u:0,0,f))}}).catch(e=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",e))}const qi=18,wm=.075,lP=.035;function uP(){const n=new Float32Array(2*qi*2*3),t=new Float32Array(2*qi*2*4),e=new Uint16Array(2*(qi-1)*6);for(let u=0,h=0;u<2;u++)for(let f=0;f<qi-1;f++){const d=(u*qi+f)*2;e.set([d,d+1,d+2,d+1,d+3,d+2],h),h+=6}const i=new Yt;i.setAttribute("position",new St(n,3)),i.setAttribute("color",new St(t,4)),i.setIndex(new St(e,1));const s=new $t(i,new cn({vertexColors:!0,transparent:!0,blending:xn,depthWrite:!1,fog:!1}));s.frustumCulled=!1,s.renderOrder=5;const r=[[],[]],o=[],a=new L,c=new L,l=new L;return{mesh:s,update(u,h,f,d,p){for(let v=0;v<2;v++){const g=r[v],m=u[v];if(f&&m){const M=(g.length>=qi?g.pop():o.pop())??{p:new L,t:0};m.getWorldPosition(M.p),M.t=h,g.unshift(M)}for(;g.length&&h-g[g.length-1].t>wm;)o.push(g.pop());const _=g.length;for(let M=0;M<qi;M++){const x=(v*qi+M)*2;if(M>=_||_<2){x>=2&&n.copyWithin(x*3,(x-2)*3,x*3),t.fill(0,x*4,x*4+8);continue}const y=g[M],b=Math.min(1,(h-y.t)/wm);M+1<_?a.subVectors(y.p,g[M+1].p):a.subVectors(g[M-1].p,y.p),l.subVectors(p,y.p),c.crossVectors(a,l).normalize().multiplyScalar(lP*(1-.85*b));const w=x*3;n[w]=y.p.x+c.x,n[w+1]=y.p.y+c.y,n[w+2]=y.p.z+c.z,n[w+3]=y.p.x-c.x,n[w+4]=y.p.y-c.y,n[w+5]=y.p.z-c.z;const S=(1-b)**2*Math.min(1,b*8+.35)*(.22+.3*d),T=x*4;t[T]=t[T+4]=1,t[T+1]=t[T+5]=.95,t[T+2]=t[T+6]=.86,t[T+3]=t[T+7]=S}}i.attributes.position.needsUpdate=!0,i.attributes.color.needsUpdate=!0}}}const $a={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class xr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const hP=new ko(-1,1,1,-1,0,1);class fP extends Yt{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const dP=new fP;class xf{constructor(t){this._mesh=new $t(dP,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,hP)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class uh extends xr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof oe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_n.clone(t.uniforms),this.material=new oe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new xf(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Tm extends xr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class pP extends xr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class mP{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ot);this._width=i.width,this._height=i.height,e=new dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uh($a),this.copyPass.material.blending=ci,this.timer=new ny}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Tm!==void 0&&(o instanceof Tm?i=!0:o instanceof pP&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Ia={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class gP extends xr{constructor(){super(),this.isOutputPass=!0,this.uniforms=_n.clone(Ia.uniforms),this.material=new eg({name:Ia.name,uniforms:this.uniforms,vertexShader:Ia.vertexShader,fragmentShader:Ia.fragmentShader}),this._fsQuad=new xf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ie.getTransfer(this._outputColorSpace)===pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Th?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Eh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ah?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===gc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ch?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ph?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Rh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class vP extends xr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ct}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const xP={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class hr extends xr{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new ot(t.x,t.y):new ot(256,256),this.clearColor=new ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new dn(r,o,{type:gn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new dn(r,o,{type:gn,depthBuffer:!1});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new dn(r,o,{type:gn,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=xP;this.highPassUniforms=_n.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new oe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ot(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=_n.clone($a.uniforms),this.blendMaterial=new oe({uniforms:this.copyUniforms,vertexShader:$a.vertexShader,fragmentShader:$a.fragmentShader,premultipliedAlpha:!0,blending:xn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ct,this._oldClearAlpha=1,this._basic=new cn,this._fsQuad=new xf(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ot(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=hr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=hr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],c=o+1<t?e[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new oe({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new oe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}hr.BlurDirectionX=new ot(1,0);hr.BlurDirectionY=new ot(0,1);const dv=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,_P={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new ot(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0}},vertexShader:dv,fragmentShader:`
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
}`},MP={uniforms:{tDiffuse:{value:null},uTexel:{value:new ot(1/1280,1/720)}},vertexShader:dv,fragmentShader:`
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
}`};function yP(n,t,e,i,s){n.toneMapping=gc,n.toneMappingExposure=1;const r=new mP(n);r.addPass(new vP(t,e));const o=new hr(new ot(256,256),.35,.5,1.4);r.addPass(o);const a=new uh(_P);r.addPass(a);const c=new gP;r.addPass(c);let l=!1;const u=(g,m)=>{l=m,o.enabled=g.bloom&&!m,c.enabled=o.enabled,a.material.defines.SHAFT_N=m?Math.min(g.shafts,8):g.shafts,a.material.defines.SPEED_BLUR=g.speedBlur&&!m?1:0,a.material.needsUpdate=!0};u(s,!1);const h=new uh(MP);h.enabled=!1,r.addPass(h);const f=new L(i.x,i.y,i.z);let d=1;const p=new L,v=new L;return{render(){e.getWorldDirection(v),p.copy(f).multiplyScalar(1e4).add(e.position).project(e);const g=v.dot(f);a.uniforms.uSun.value.set(p.x*.5+.5,p.y*.5+.5),a.uniforms.uSunVisible.value=d*Math.max(0,Math.min(1,(g-.2)/.4)),r.render()},setSize(g,m){r.setSize(g,m),o.resolution.set(g/2,m/2),a.uniforms.uAspect.value=g/m;const _=n.getPixelRatio();h.uniforms.uTexel.value.set(1/(g*_),1/(m*_))},setPixelRatio(g){r.setPixelRatio(g)},setLite(){return l||!s.bloom&&s.shafts<=8&&!s.speedBlur?!1:(u(s,!0),!0)},togglePainterly(){return h.enabled=!h.enabled,h.enabled},painterly:()=>h.enabled,setSpeed(g){a.uniforms.uSpeed.value=g},setDanger(g){a.uniforms.uDanger.value=g},setSun(g,m){f.set(g.x,g.y,g.z),d=m}}}function bP(n,t){const e=new u2({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,t)),e.setSize(n.clientWidth,n.clientHeight),e.info.autoReset=!1,n.appendChild(e.domElement);const i=new DM,s=new fn(60,n.clientWidth/n.clientHeight,.5,7e4),r=new og(16777215,2.4),o=new q1(16777215,16777215,1.3);return i.add(r,r.target,o),{renderer:e,scene:i,camera:s,sun:r,hemi:o}}const SP=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function wP(n){return`
uniform float uDusk;
uniform float uMorn;
${Kg(n,"uDusk","uMorn")}
${Sc}
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
}`}function TP(n){const t=new oe({vertexShader:SP,fragmentShader:wP(n),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:en,depthWrite:!1,depthTest:!1,fog:!1}),e=new $t(new vs(1e3,48,24),t);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(i,s,r,o){e.position.copy(i.position),t.uniforms.uTime.value=s,t.uniforms.uDusk.value=r,t.uniforms.uMorn.value=o}}}function EP(){return new oe({vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1})}function AP(){return new oe({vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1})}const hh=12,Em=new ct(1,.72,.28),RP=new ct(1,.86,.5);function jl(n,t){const e=new He(n,t,hh);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new ct(0,0,0)),e}function CP(){const n=jl(new tf(.82,1,40),new cn({transparent:!0,blending:xn,depthWrite:!1,fog:!1,side:Ee})),t=jl(new Yn(2,2),AP()),e=jl(new ws(1,2),EP()),i={ring:n,flare:t,shell:e},s=[],r=new Ot,o=new Ce,a=new L,c=new L,l=new ct,u=new L(0,0,1),h=f=>{s.length>=hh*3&&s.shift(),s.push(f)};return{mesh:n,star:t,shell:e,spawn(f,d,p){h({part:"ring",x:f,y:d,z:p,t:0,dur:.35,r0:.6,r1:3.4,color:Em}),h({part:"shell",x:f,y:d,z:p,t:0,dur:.45,r0:.4,r1:3.2,color:Em}),h({part:"flare",x:f,y:d,z:p,t:0,dur:.42,r0:.6,r1:3,color:RP})},update(f,d){const p={ring:0,flare:0,shell:0};for(let v=s.length-1;v>=0;v--){const g=s[v];if(g.t+=f,g.t>=g.dur||p[g.part]>=hh){s.splice(v,1);continue}g.z+=d*f;const m=g.t/g.dur,_=g.r0+(g.r1-g.r0)*(1-(1-m)*(1-m)),M=(1-m)*(1-m)*1.1,x=g.part==="flare"?o.setFromAxisAngle(u,m*2.2):o.identity();r.compose(a.set(g.x,g.y,g.z),x,c.set(_,_,_));const y=i[g.part];y.setMatrixAt(p[g.part],r),y.setColorAt(p[g.part]++,l.copy(g.color).multiplyScalar(M))}for(const v of["ring","flare","shell"]){const g=i[v];g.count=p[v],g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0)}}}}const Am=4,Rm=36,PP={rock:[new ct(.42,.33,.36),new ct(.3,.24,.28),new ct(.24,.3,.16)],cloth:[new ct(.8,.1,.08),new ct(.95,.66,.1),new ct(.5,.33,.2)],village:[new ct(.62,.22,.12),new ct(.55,.3,.2),new ct(.85,.7,.35)]},LP=()=>new oe({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function NP(){const n=new He(new Yn(2,2),LP(),Am),t=new He(new ws(1,0),new fr,Rm);for(const u of[n,t])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new ct);n.renderOrder=8;const e=[],i=[];let s=0;const r=new Ot,o=new Ce,a=new L,c=new L,l=new ct;return{stars:n,chips:t,danger:()=>s,spawn(u,h,f,d,p){e.length>=Am&&e.shift(),e.push({x:u,y:h,z:f,t:0,dur:p?.42:.3,r0:p?1.4:.9,r1:p?5.2:3.2,seed:Math.random(),follow:!p});const v=p?22:10;for(let g=0;g<v;g++){i.length>=Rm&&i.shift();const m=Math.random()*Math.PI*2,_=(p?7:5)+Math.random()*7,M=PP[d];i.push({x:u,y:h,z:f,t:0,life:.9+Math.random()*.6,size:(p?.22:.16)+Math.random()*(p?.38:.22),vx:Math.cos(m)*_,vy:Math.sin(m)*_*.8+4,vz:-(3+Math.random()*8),spin:new L(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:M[g%M.length]})}s=Math.max(s,p?1:.75)},update(u,h){s=Math.max(0,s-u*1.4);let f=0;for(let d=e.length-1;d>=0;d--){const p=e[d];p.t+=u;const v=p.t/p.dur;if(v>=1){e.splice(d,1);continue}p.follow&&(p.z+=h*u);const g=p.r0+(p.r1-p.r0)*(1-(1-v)**3);r.compose(a.set(p.x,p.y,p.z),o.identity(),c.set(g,g,g)),n.setMatrixAt(f,r),n.setColorAt(f++,l.setRGB(Math.min(1,(1-v)*1.6),p.seed,v))}n.count=f,f=0;for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.t+=u,p.t>=p.life){i.splice(d,1);continue}p.vy-=16*u,p.x+=p.vx*u,p.y+=p.vy*u,p.z+=p.vz*u;const v=p.size*Math.min(1,(p.life-p.t)/.25);o.setFromAxisAngle(p.spin,p.t*9),r.compose(a.set(p.x,p.y,p.z),o,c.set(v,v*.7,v*1.2)),t.setMatrixAt(f,r),t.setColorAt(f++,p.color)}t.count=f;for(const d of[n,t])d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0)}}}const Vn=90,IP=1.4,DP=`
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
}`,UP=`
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
}`;function kP(){const n=[0,1].map(()=>({p:Array.from({length:Vn},()=>new L),age:new Float32Array(Vn).fill(1)})),t=2*Vn*2,e=new Float32Array(t*3),i=new Float32Array(t).fill(1),s=new Float32Array(t),r=[];for(let f=0;f<2;f++)for(let d=0;d<Vn;d++){const p=(f*Vn+d)*2;s[p]=-1,s[p+1]=1,d<Vn-1&&r.push(p,p+1,p+2,p+1,p+3,p+2)}const o=new Yt;o.setAttribute("position",new St(e,3)),o.setAttribute("aAge",new St(i,1)),o.setAttribute("aSide",new St(s,1)),o.setIndex(r);const a=new oe({vertexShader:DP,fragmentShader:UP,uniforms:_n.merge([lt.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:Ee,fog:!0}),c=new $t(o,a);c.frustumCulled=!1,c.renderOrder=3;const l=new L,u=new L,h=new L;return{points:c,update(f,d,p,v){n.forEach((g,m)=>{for(let _=0;_<Vn;_++)g.age[_]=Math.min(1,g.age[_]+d/IP);if(p&&d>0){const _=g.p.pop();g.p.unshift(_.copy(f[m])),g.age.copyWithin(1,0,Vn-1),g.age[0]=0}for(let _=0;_<Vn;_++){const M=g.p[_],x=g.p[Math.min(Vn-1,_+1)];l.subVectors(M,x),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(v,M),h.crossVectors(l,u).normalize();const y=.06+.5*g.age[_],b=(m*Vn+_)*2;e.set([M.x-h.x*y,M.y-h.y*y,M.z-h.z*y],b*3),e.set([M.x+h.x*y,M.y+h.y*y,M.z+h.z*y],(b+1)*3),i[b]=i[b+1]=g.age[_]}}),o.getAttribute("position").needsUpdate=!0,o.getAttribute("aAge").needsUpdate=!0}}}const hs=120,FP=40,OP=120,BP=9,zP=30,tu=.11;function HP(){const n=new Float32Array(hs*3),t=new Float32Array(hs*6),e=new Yt;e.setAttribute("position",new St(t,3));const i=new Float32Array(hs*6);for(let f=0;f<hs;f++)i.set([1,1,1,0,0,0],f*6);e.setAttribute("color",new St(i,3));const s=new $h({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:xn,depthWrite:!1,fog:!1}),r=new z0(e,s);r.frustumCulled=!1,r.renderOrder=5;let o=!1;const a=new L,c=new L,l=new L,u=new L,h=(f,d,p)=>{const v=FP+Math.random()*OP*p,g=BP+(1-Math.random()**2)*zP,m=Math.random()*Math.PI*2;u.copy(d).addScaledVector(a,v).addScaledVector(c,Math.cos(m)*g).addScaledVector(l,Math.sin(m)*g),n[f*3]=u.x,n[f*3+1]=u.y,n[f*3+2]=u.z};return{object:r,update(f,d,p){if(s.opacity=Math.min(.5,.42*p),r.visible=p>.02,e.setDrawRange(0,2*Math.round(hs*Math.min(1,p))),!r.visible)return;const v=d.length();if(v<1)return;a.copy(d).divideScalar(v),c.set(a.z,0,-a.x).normalize(),l.crossVectors(c,a);const g=f.position;if(!o){for(let m=0;m<hs;m++)h(m,g,1);o=!0}for(let m=0;m<hs;m++){u.set(n[m*3]-g.x,n[m*3+1]-g.y,n[m*3+2]-g.z),(u.dot(a)<-4||u.lengthSq()>36100)&&h(m,g,1);const M=m*6,x=n[m*3],y=n[m*3+1],b=n[m*3+2];t[M]=x,t[M+1]=y,t[M+2]=b,t[M+3]=x-d.x*tu,t[M+4]=y-d.y*tu,t[M+5]=b-d.z*tu}e.attributes.position.needsUpdate=!0}}}const zr=256,Cm=5,VP=-2e3,GP=400;function WP(n,t,e){let i=0;for(const[s,r]of[[1,41],[1.37,43]]){const o=Math.max(12,Math.round(2*Math.PI*e/((1800+700*t)*s))),a=n/(2*Math.PI)*o,c=Math.floor(a),l=.5+.3*(ut(c,t,r)-.5),u=Math.max(0,1-Math.abs(a-c-l)*2.2),h=(220+140*t)*(.45+.55*ut(c,t,r+1));i=Math.max(i,h*u*u*(3-2*u))}return i}const XP=`
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
}`,$P=`
#include <fog_pars_fragment>
uniform float uFar;
${bh}
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
}`;class qP{rings=[];next=0;heightAt;constructor(t,e,i){this.heightAt=e;for(let s=0;s<i.length-1;s++){const r=s/(i.length-2),o=new oe({vertexShader:XP,fragmentShader:$P,uniforms:_n.merge([lt.fog,{uFar:{value:.25+.6*r}}]),fog:!0});o.uniforms.uRegionHg=Lo;const a=new $t(new Yt,o);a.frustumCulled=!1,t.add(a),this.rings.push({inner:i[s],outer:i[s+1],mesh:a,anchorX:NaN,anchorZ:NaN})}}update(t,e,i=!1){for(let s=0;s<this.rings.length;s++){const r=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,(Math.hypot(t-r.anchorX,e-r.anchorZ)>GP||Number.isNaN(r.anchorX))&&(this.rebuild(r,t,e),!i))return}}rebuild(t,e,i){const s=new Float32Array((zr+1)*2*3),r=new Float32Array((zr+1)*2);for(let c=0;c<=zr;c++){const l=c/zr*Math.PI*2,u=Math.sin(l),h=Math.cos(l);let f=-1/0;for(let p=0;p<Cm;p++){const v=t.inner+(t.outer-t.inner)*p/Cm;f=Math.max(f,this.heightAt(e+u*v,i+h*v))}No()>.5&&(f+=WP(l,this.rings.indexOf(t),t.inner));const d=t.inner;s.set([u*d,f,h*d,u*d,VP,h*d],c*6),r[c*2]=f,r[c*2+1]=f}const o=[];for(let c=0;c<zr;c++){const l=c*2;o.push(l,l+2,l+1,l+2,l+3,l+1)}const a=new Yt;a.setAttribute("position",new St(s,3)),a.setAttribute("aTop",new St(r,1)),a.setIndex(o),t.mesh.geometry.dispose(),t.mesh.geometry=a,t.mesh.position.set(e,0,i),t.anchorX=e,t.anchorZ=i}}const Hr={h:0,s:0,lat:0,vil:0};function KP(n,t,e,i,s){const r=i/s,o=s+3,a=new Float32Array(o*o),c=new Float32Array(o*o*3);for(let y=0;y<o;y++)for(let b=0;b<o;b++)n(t+(b-1)*r,e+(y-1)*r,Hr),a[y*o+b]=Hr.h,c.set([Hr.s,Hr.lat,Hr.vil],(y*o+b)*3);const l=(y,b)=>a[(b+1)*o+(y+1)],u=s+1,h=s*4,f=u*u+h,d=new Float32Array(f*3),p=new Float32Array(f*3),v=new Float32Array(f*3),g=(y,b,w,S)=>{v.set(c.subarray(((w+1)*o+(b+1))*3,((w+1)*o+(b+2))*3),y*3);const T=(l(b+1,w)-l(b-1,w))/(2*r),R=(l(b,w+1)-l(b,w-1))/(2*r),A=1/Math.hypot(T,1,R);d[y*3]=b*r,d[y*3+1]=l(b,w)-S,d[y*3+2]=w*r,p[y*3]=-T*A,p[y*3+1]=A,p[y*3+2]=-R*A};for(let y=0;y<u;y++)for(let b=0;b<u;b++)g(y*u+b,b,y,0);const m=[];for(let y=0;y<s;y++)m.push(y);for(let y=0;y<s;y++)m.push(y*u+s);for(let y=s;y>0;y--)m.push(s*u+y);for(let y=s;y>0;y--)m.push(y*u);const _=r*3+25;m.forEach((y,b)=>g(u*u+b,y%u,Math.floor(y/u),_));const M=[];for(let y=0;y<s;y++)for(let b=0;b<s;b++){const w=y*u+b;M.push(w,w+u,w+1,w+1,w+u,w+u+1)}for(let y=0;y<h;y++){const b=m[y],w=m[(y+1)%h],S=u*u+y,T=u*u+(y+1)%h;M.push(b,w,S,w,T,S)}const x=new Yt;return x.setAttribute("position",new St(d,3)),x.setAttribute("normal",new St(p,3)),x.setAttribute("aTrack",new St(v,3)),x.setIndex(f>65535?new St(new Uint32Array(M),1):new St(new Uint16Array(M),1)),x.computeBoundingSphere(),x}class YP{cache=new Map;shown=new Set;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(t,e,i,s){this.scene=t,this.sample=e,this.material=i,this.cfg=s}update(t,e,i=!1){this.computeWanted(t,e);const s=performance.now();for(const r of this.wanted)if(!this.cache.has(r.key)){if(!i&&performance.now()-s>this.cfg.buildBudgetMs)return;this.cache.set(r.key,this.build(r))}this.shown.size===this.wanted.length&&this.wanted.every(r=>this.shown.has(r.key))||this.swap()}stats(){let t=0;for(const s of this.shown)t+=this.cache.get(s)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(s=>!this.cache.has(s.key)).length,i=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,vertices:t,reach:i}}computeWanted(t,e){const i=[];for(let r=0;r<this.cfg.levels;r++){const o=this.cfg.baseSize*2**r,a=Math.floor(t/(2*o)),c=Math.floor(e/(2*o)),l=Math.floor(t/o),u=Math.floor(e/o);for(let h=2*c-2;h<=2*c+3;h++)for(let f=2*a-2;f<=2*a+3;f++)r>0&&Math.abs(f-l)<=1&&Math.abs(h-u)<=1||i.push({key:`${r}:${f}:${h}`,level:r,ix:f,iz:h})}const s=i.map(r=>r.key).join("|");s!==this.wantedSig&&(this.wantedSig=s,this.wanted=i)}build(t){const e=this.cfg.baseSize*2**t.level,i=t.ix*e,s=t.iz*e,r=t.level>=2?this.cfg.farSegs:this.cfg.segs,o=new $t(KP(this.sample,i,s,e,r),this.material);return o.position.set(i,0,s),o.matrixAutoUpdate=!1,o.updateMatrix(),o}swap(){const t=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)t.has(e)||this.scene.remove(this.cache.get(e));for(const e of t)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,i]of this.cache)t.has(e)||(i.geometry.dispose(),this.cache.delete(e));this.shown=t}}const ZP=`
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
`,JP=`
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
`,QP=`
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
}`,jP=`
#include <fog_pars_fragment>
${Sc}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;

${bh}
${JP}
${ZP}
${CR}

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
}`;function tL(n=1e9,t=!1){return new oe({vertexShader:QP,fragmentShader:jP,defines:t?{TERRAIN_LITE:1}:{},uniforms:{..._n.merge([lt.fog,{uMaxDist:{value:n}}]),...fc,uRegionHg:Lo},fog:!0})}const eL=6e3,nL=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function iL(n,t){const e=new YP(n,Ig,tL(eL,t.lite),{baseSize:t.baseSize,segs:t.segs,farSegs:t.farSegs,levels:t.levels,buildBudgetMs:5}),i=new qP(n,je,nL);return{update(s,r){e.update(s.x,s.z,r),i.update(s.x,s.z,r)},statsLine(){const s=e.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const Pm=16,Lm=3,Vr=1.8,Nm=2.2,Si={x:0,v:0};function sL(n,t,e,i){Si.x=0,Si.v=0;for(const s of n.obstacles){const r=ts[s.kind],o=s.z-t;if(o+r.halfZ+1<0||o-r.halfZ>Pm)continue;const a=Math.min(1,Math.max(0,1-(o-r.halfZ)/Pm)),c=vn(s.lane);let l=0,u=0;if(s.kind==="ridge")u=Math.max(0,r.hi+Lm-i);else if(s.kind==="bridge")i>r.lo-Vr&&i<r.hi+Vr&&(u=n.v<r.lo?r.lo-Vr-i:r.hi+Vr-i);else if(Math.abs(e-c)<r.halfX+Nm){const h=n.x-c;Math.abs(h)>=r.halfX?l=c+Math.sign(h)*(r.halfX+Nm)-e:s.kind==="spike"?u=Math.max(0,r.hi+Lm-i):s.kind==="overhang"&&(u=Math.min(0,r.lo-Vr-i))}u>0?Si.v=Math.max(Si.v,u*a):u<0&&(Si.v=Math.min(Si.v,u*a)),Math.abs(l*a)>Math.abs(Si.x)&&(Si.x=l*a)}return Si}function rL(n,t,e){const i=Math.sin(e),s=Math.cos(e);return Math.max(je(n,t),je(n+4*i,t+4*s),je(n+8*i,t+8*s))}const wi={bankShare:0,bankCap:0,slideRoll:0,rollRate:0,trick:0,rollCap:0,shake:0,diveFov:0};function oL(n){const t=n.mode==="run"?fh(xh(n.z,n.diff),46,64):0,e=(i,s)=>i+(s-i)*t;return wi.bankShare=e(.45,.25),wi.bankCap=e(.3,.16),wi.slideRoll=e(.0022,9e-4),wi.rollRate=e(3,1.8),wi.trick=e(1,.4),wi.rollCap=e(.6,.35),wi.shake=e(1,.5),wi.diveFov=e(4,1.5),wi}function fh(n,t,e){const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)}const aL={back:7.5,up:2.6,fov:58,look:34,lookDown:3.6},cL={back:11,up:4.5,fov:70,look:60,lookDown:5},lL={back:6.5,up:2.2,fov:64,look:40,lookDown:4},Im={back:13,up:4.5,fov:62,look:60,lookDown:6};function eu(n,t,e){const i=(s,r)=>s+(r-s)*e;return{back:i(n.back,t.back),up:i(n.up,t.up),fov:i(n.fov,t.fov),look:i(n.look,t.look),lookDown:i(n.lookDown,t.lookDown)}}class uL{rig={...Im};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(t){this.camera=t,this.aspect=Number.isFinite(t.aspect)&&t.aspect>0?t.aspect:16/9}setAspect(t){Number.isFinite(t)&&t>0&&(this.aspect=t,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(t){this.shakeA=Math.max(this.shakeA,t)}update(t,e,i,s,r=!1){const o=Math.min(1,Math.max(0,(t.speed-42)/22)),a=t.mode==="run"?Jm(t.z):0,c=J=>r?1:1-Math.exp(-i*J),l=oL(t),u=a>0?Math.max(.4,Math.min(2,px(t.z,t.speed))):1;this.g+=(1+(u-1)*a-this.g)*c(3);const h=Math.max(0,this.g-1),f=Math.max(0,1-this.g),d=this.portrait();let p=t.mode==="ready"?Im:eu(eu(aL,lL,dx(t.z)),cL,fx(t.z)*(1-.8*d));p={...p,fov:p.fov+10*o+.5*Math.max(0,t.surge)+.34*t.tailwind+(t.vert==="dive"?l.diveFov:0)+(t.thermalT>0?8:0)-2.5*h+5*f,up:p.up-.8*h},t.thermalV>1&&(p={...p,up:p.up+1.5,lookDown:p.lookDown+2}),this.rig=eu(this.rig,p,c(2.4)),this.mv+=(t.v-t.thermalV-t.windLift-this.mv)*c(9+5*d);const v=this.mv,g=t.low&&t.vert==="cruise";this.fv+=((g?1:t.vert==="dive"?.6+.2*d:.45)-this.fv)*c(g?3:10),this.fl+=((g?1:t.vert==="dive"?.9:.35)-this.fl)*c(g?3:10);const m=t.speed*Ci(t.z);this.lag+=(5*(1-.7*d)*Math.tanh(-m/40)*a-this.lag)*c(3),this.x+=(t.x*(.55+.3*d)-this.x)*(r?1:1-Math.exp(-i*(6+4*d)));const _=1.6+20*(1-d);this.x=Math.min(t.x+_,Math.max(t.x-_,this.x));const M=t.mode==="run"?Math.max(-l.bankCap,Math.min(l.bankCap,l.bankShare*Zm(t.z,t.speed))):0;this.roll+=(M-e*l.slideRoll-this.roll)*(r?1:1-Math.exp(-i*l.rollRate)),this.shakeA=Math.max(0,this.shakeA-i*2.5);const x=t.mode==="crash"||t.mode==="over",y=this.rig.back*(1-.12*d)-.3*d*Math.max(0,this.rig.back-7.5),b=t.z-y*(x?1.6:1);this.s=b;const w=this.camera,S=this.shakeA*l.shake,T=Math.max(0,Ne(b)-Ne(t.z))*.7*d,R=this.rig.up+.6*d-T+t.thermalV*.8+t.windLift*.85+v*this.fv+this.lag+(x?4:0),A=sL(t,b,this.x,R);this.clrX=Math.abs(A.x)>=Math.abs(this.clrX)?A.x:this.clrX+(A.x-this.clrX)*c(5),this.clrV=Math.abs(A.v)>=Math.abs(this.clrV)?A.v:this.clrV+(A.v-this.clrV)*c(5);const P=ue(b,this.x+this.clrX,R+this.clrV,this.tmp);w.position.set(P.x+S*Math.sin(s*37.1),Math.max(P.y,rL(P.x,P.z,pn(b))+3)+S*Math.sin(s*41.3+2),P.z),this.crashK+=((x?1:0)-this.crashK)*c(4);const I=t.z+this.rig.look*(1-.75*this.crashK),N=.6*t.speed,U=(Ne(I+N)-Ne(I)-Ci(I)*N)*a,z=Ve(t.z),V=Math.tan(.14)*this.rig.look*fh(z,ce.edge-20,ce.edge+80)*(1-fh(z,ce.pullOut-80,ce.pullOut))*a;ue(I,t.x*(.4+.2*d),t.thermalV*.8+t.windLift*.85+v*this.fl+U-this.rig.lookDown-V-cv(t)*this.crashK,this.tmp),w.up.set(0,1,0),w.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),w.rotateZ(Math.max(-l.rollCap,Math.min(l.rollCap,this.roll+this.trickRoll*l.trick))),this.applyLens()}applyLens(){const t=this.camera,e=this.aspect,i=this.portrait();let s=this.rig.fov,r=1;if(e<1){const a=Math.min(64+60*(1-i),this.rig.fov*(1-.15*i))*Math.PI/180;r=1+.1*i,s=Math.min(118,2*Math.atan(Math.tan(a/2)*r/e)*180/Math.PI)}const o=`${s.toFixed(2)}|${r.toFixed(3)}|${e.toFixed(4)}`;o!==this.lensKey&&(this.lensKey=o,this.viewScale=r,t.fov=s,r>1.001?t.setViewOffset(e,r,0,0,e,1):(t.clearViewOffset(),t.aspect=e,t.updateProjectionMatrix()))}}const nu=new ct;function hL(n,t,e,i){let s=i;return{sunDir:()=>s,apply(r,o){B3(n,r,o),s=I3(i,r,o);const a=Et(.55,1,r);t.position.set(s.x*1e3,Math.max(s.y,.35*a)*1e3,s.z*1e3),t.color.copy(Fl("sunLight",r,nu,o)),t.intensity=2.4*(1-.7*a),e.color.copy(Fl("skyAmbient",r,nu,o)),e.groundColor.copy(Fl("bounce",r,nu,o)),e.intensity=1.3*(1+.35*a)}}}const Da={x:-.32,y:.1,z:1};function fL(n,t){const{renderer:e,scene:i,camera:s,sun:r,hemi:o}=bP(n,t.maxDpr);O3(i,Da);const a=hL(i,r,o,Da),c=TP(Da),l=iL(i,t.terrain),u=M3(t.foliage),h=wR(t.ambient),f=RR(),d=q3(t.ambient),p=V3(t.name!=="high"),v=GA(),g=jA(),m=e3(),_=s3(),M=N3(),x=hC(),y=ZR(t.ambient),b=gC();Cv(cP(b,t.name==="high"));const w=MC(),S=kP(),T=y2(t.name==="low"),R=uP(),A=HP(),P=lR(),I=eR(),N=iR(),U=CP(),z=NP(),V=kR();i.add(c.mesh,u.group,h.group,f.mesh,v.group,g.group,m.group,_.mesh,M.group,p.mesh,d.mesh,x.group,y.group,b.root,S.points,R.mesh,A.object,P.mesh,I.group,N.mesh,U.mesh,U.star,U.shell,z.stars,z.chips,V.points,T.mesh);const J=yP(e,i,s,Da,t.post),B=new uL(s);PR(t.ambient>=1?12:t.ambient>=.7?9:6);const K=[new L,new L],j=[new L,new L],Mt=new L,gt=new ot,At={};let Bt=null;return{renderer:e,scene:i,camera:s,post:J,cam:B,lanterns:y,flashes:U,impacts:z,world:l,ghosts:I,trick:w.trick,pilot:b.root,present(Ht,X,Y,yt,Pt=!1){const{dusk:it,morn:Xt}=yt;Ht.mode==="crash"||Ht.mode==="over"?Bt??=Ht.z:Bt=null;let rt=Ht;Bt!==null&&Ht.z>Bt+.4&&(rt=Object.assign(At,Ht),rt.z=Bt+.4),a.apply(it,Xt),w.apply(b,rt,X,Y),N.update(b.root.position,rt.stunT/st.stunTime,X,s),B.trickRoll=w.camRoll(),B.update(rt,w.lateralSpeed(),Y,X,Pt),c.update(s,X,it,Xt),l.update(s.position,Pt),u.update(rt.z,it,s),h.update(rt.z,it),f.update(rt.z),LR(),V.update(rt,X,it,B.s),d.update(rt.z),p.update(s,X,B.s),DA(b.root.position.x,b.root.position.z,pn(rt.z),X),U.update(Y,rt.mode==="run"?rt.speed:0),z.update(Y,rt.mode==="run"?rt.speed:0);const Gt=rt.mode==="run"&&rt.hp===1?.14+.08*Math.sin(X*5.5):0;J.setDanger(Math.max(z.danger(),Gt,rt.mode==="crash"?.55:rt.mode==="over"?.25:0)),x.update(rt,X,it),v.update(rt.z),g.update(B.s,X,it),m.update(rt.z,X),_.update(B.s),M.update(rt.z),y.update(rt,X,Y,it,B.s),NR(Math.min(1,Math.max(0,(it-.45)/.4))),P.update(rt,X,B.s),b.root.updateMatrixWorld(),b.feet.forEach((Le,F)=>Le.getWorldPosition(K[F])),S.update(K,Y,rt.mode==="run"||rt.mode==="ready",s.position),b.ankles.forEach((Le,F)=>Le.getWorldPosition(j[F])),T.update(rt,j,X,Y,s.position);const he=rt.mode==="run"||rt.mode==="ready";R.update(b.tips,X,he,Math.min(1,Math.max(0,(rt.speed-40)/26)+(rt.vert==="dive"?.4:0)),s.position);const ne=rt.stunT/st.stunTime;fv.value=Math.max(ne*ne*(.6+.4*Math.sin(X*28)),rt.mode==="run"&&rt.hp===1?.18+.12*Math.sin(X*5.5):0);const be=pn(rt.z);Mt.set(Math.sin(be),Ci(rt.z),Math.cos(be)).normalize().multiplyScalar(rt.speed);const Ue=Math.min(1,Math.max(0,(rt.speed-40)/26)),Ze=rt.mode==="run"?Math.max(0,rt.surge)/12+rt.tailwind/16:0,Ae=1-.45*Math.min(1,Math.max(0,(it-.5)/.4));return A.update(s,Mt,rt.mode==="run"?Ae*(.1+.4*Ue+.55*Ze+(rt.thermalT>0?.35:0)):0),J.setSpeed(rt.mode==="run"?.05*Ue+.16*Ze+(rt.vert==="dive"?.04:0)+(rt.thermalT>0?.1:0):0),J.setSun(a.sunDir(),1-Math.min(1,it*1.6)),y.setViewport(e.getDrawingBufferSize(gt).y*B.viewScale,s.fov),I.setViewport(gt.y*B.viewScale,s.fov),V.setViewport(gt.y*B.viewScale,s.fov),Math.min(1.4,Ue+.5*Ze)},resize(Ht,X){e.setSize(Ht,X),J.setSize(Ht,X),B.setAspect(Ht/X)}}}function dL(){const n={z:0,x:0,v:0,thermalV:0,windLift:0},t={};return{capture(e){n.z=e.z,n.x=e.x,n.v=e.v,n.thermalV=e.thermalV,n.windLift=e.windLift},view(e,i){if(i>=1)return e;const s=(r,o)=>r+(o-r)*i;return Object.assign(t,e),t.z=s(n.z,e.z),t.x=s(n.x,e.x),t.v=s(n.v,e.v),t.thermalV=s(n.thermalV,e.thermalV),t.windLift=s(n.windLift,e.windLift),t}}}const pv=`skyrun.tut.${Cn}`,pL=2e3,mL=.7,gL=.45,vL=.3,xL=.15;function _L(){try{return new Set(JSON.parse(localStorage.getItem(pv)??"[]"))}catch{return new Set}}function ML(n){const t=n.obstacles.filter(h=>!h.passed&&h.z-n.z>-ts[h.kind].halfZ);if(!t.length)return null;const e=t.reduce((h,f)=>f.z<h.z?f:h),i=t.filter(h=>h.row===e.row),s=e.kind;if(n.thermalV>8&&s!=="pillar")return null;if(i.some(h=>h.kind==="bridge"))return n.vert==="dive"||n.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(i.some(h=>h.kind==="ridge"))return n.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const r=new Set(i.map(h=>h.lane));if(!r.has(n.lane))return null;const o=i.filter(h=>h.lane===n.lane),a=o.every(h=>h.kind==="spike");if(a&&n.vert==="flare")return null;const c=o.every(h=>h.kind==="overhang");if(c&&(n.vert==="dive"||n.low))return null;const l=[];return[-1,0,1].some(h=>h<n.lane&&!r.has(h))&&l.push("left"),[-1,0,1].some(h=>h>n.lane&&!r.has(h))&&l.push("right"),a&&l.push("up"),c&&l.push("down"),{lesson:l.length===1&&a?"up":l.length===1&&c?"down":"lane",kind:o[0].kind,accept:l,row:e.row,z:e.z}}const Dm={left:"←",right:"→",up:"↑",down:"↓"};function yL(n,t){const e=t?new Set:_L(),i=matchMedia("(pointer: coarse)").matches,s=document.createElement("div");s.className=i?"tut touch":"tut",n.appendChild(s);let r=null,o=1;const a=(l,u)=>{const h=l.accept.filter(_=>l.lesson!=="lane"||_!=="up"&&_!=="down"),f=ji(l.z),d=l.kind==="bridge"?f?"chui qua cổng làng":"chui dưới cầu":l.kind==="overhang"?"chui dưới mái đá":l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",p=h.length===1?h[0]==="left"?"sang trái":"sang phải":"sang trái / phải",v=l.lesson==="lane"?`ngón ${p}`:l.lesson==="up"?"lên":"xuống",g=i?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${v} để ${d}`:`Bấm ${h.map(_=>Dm[_]).join(" / ")} để ${d}`,m=l.lesson==="lane"?Nt.dragSide:l.lesson==="up"?Nt.swipeUp:Nt.swipeDown;s.classList.toggle("flip",u>0),s.innerHTML=`<div class="tut-text">${i?m:""}<span>${g}</span></div><div class="tut-arrows">${h.map(_=>`<span class="tut-arrow ${_}">${Dm[_]}</span>`).join("")}</div>`,s.classList.add("on")},c=l=>{e.add(l);try{localStorage.setItem(pv,JSON.stringify([...e]))}catch{}};return{frozen:()=>r!==null&&o===0,update(l,u){if(l.mode!=="run"||e.size===3)return r=null,s.classList.remove("on"),o=1,1;const h=ML(l);if(r&&(!h||h.row!==r.row)&&(c(r.lesson),r=null,s.classList.remove("on")),!r&&h&&!e.has(h.lesson)&&l.z<pL){const p=(l.obstacles.find(v=>v.row===h.row).z-l.z)/l.speed;p<=mL&&p>=gL&&(r=h,a(h,l.lane))}else r&&h&&(r=h);const f=r!==null&&l.buffered!==null&&r.accept.includes(l.buffered);return o=r&&!f?Math.max(0,o-u/vL):Math.min(1,o+u/xL),o},offer(l){const u=r?l.find(h=>r.accept.includes(h)):void 0;return u?(o=.4,u):null}}}const dh=`skyrun.progress.s${nr}`,ph="skyrun.meters",mv=nr,mh=n=>Math.floor(n).toLocaleString("vi-VN"),gv=n=>(Math.floor(n/100)/10).toLocaleString("vi-VN");function mc(n){try{const t=JSON.parse(localStorage.getItem(n)??"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function Um(n,t){try{localStorage.setItem(n,JSON.stringify(t))}catch{}}const _f=n=>mc(dh)[n]??0,vv=n=>mc(ph)[n]??0;function Rc(n){const t=n.unlock;return!t||_f(t.from)>=t.score||vv(t.from)>=t.meters}const bL=()=>Object.values(Ai).filter(n=>!Rc(n));function xv(n){const t=bL(),e=mc(dh),i=mc(ph);return n(e,i),Um(dh,e),Um(ph,i),t.filter(s=>Rc(s))}const gh=(n,t,e)=>{Number.isFinite(e)&&e>(n[t]??0)&&(n[t]=Math.floor(e))},SL=(n,t,e)=>xv((i,s)=>{gh(i,n,t),Number.isFinite(e)&&e>0&&(s[n]=Math.floor((s[n]??0)+e))});function wL(n){return xv((t,e)=>{for(const i of Object.keys(Ai))typeof n.score[i]=="number"&&gh(t,i,n.score[i]),typeof n.meters[i]=="number"&&gh(e,i,n.meters[i])})}const _v="skyrun.unlockSeen";function Mv(){try{const n=JSON.parse(localStorage.getItem(_v)??"[]");return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch{return[]}}function km(){const n=Mv();return Object.values(Ai).filter(t=>t.unlock&&Rc(t)&&!n.includes(t.id))}function TL(n){try{localStorage.setItem(_v,JSON.stringify([...new Set([...Mv(),n])]))}catch{}}const vh=21,Fm=2*Math.PI*vh;function Om(n,t,e,i){const s=Math.min(t,e),r=e>0?s/e:1;return`<span class="pc-ring${r>=1?" done":""}"><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="bg" cx="25" cy="25" r="${vh}"/><circle class="arc" cx="25" cy="25" r="${vh}" stroke-dasharray="${Fm.toFixed(1)}" stroke-dashoffset="${(Fm*(1-r)).toFixed(1)}"/></svg><b>${Math.floor(r*100)}%</b><small>${n}<br>${i(s)} / ${i(e)}</small></span>`}function EL(n,t){const e=t==="locked"?null:Rg(n.id),i=t==="current"?`<span class="pc-badge">${Nt.wingsuit}Đang bay</span>`:t==="fresh"?`<span class="pc-badge fresh">${Nt.star}Mới mở!</span>`:"",s=t==="locked"?n.unlock:null,r=s?`<span class="pc-goals"><span class="pc-goal-head">Mở khi đạt 1 trong 2 ở ${Ai[s.from].name}</span><span class="pc-rings">`+Om(`Điểm mùa ${mv}`,_f(s.from),s.score,mh)+'<i class="pc-or">hoặc</i>'+Om("Tổng quãng bay",vv(s.from),s.meters,o=>`${gv(o)} km`)+"</span></span>":"";return`<button type="button" class="postcard ${t} map-${n.region}" data-map="${n.id}" aria-label="${n.name}">
    <span class="pc-art" style="background-image:url(ui/map-${n.id}.webp)">${t==="locked"?`<span class="pc-lock">${Nt.lock}</span>`:""}${i}</span>
    <span class="pc-body"><b class="pc-name">${n.name}</b><small class="pc-sub">${n.tagline}</small>
      ${e&&e.m>0?`<span class="ui-chip gold pc-best">${Nt.trophy}<span>Kỷ lục ${mh(e.m)} m</span></span>`:""}${r}</span>
  </button>`}function AL(n,t){return`<div class="postcard soon" data-soon="${n}" role="button" aria-disabled="true" tabindex="-1">
    <span class="pc-art ink">${Nt.mountain}<span class="ui-stamp">Sắp có</span></span>
    <span class="pc-body"><b class="pc-name">${n}</b><small class="pc-sub">${t}</small></span>
  </div>`}const RL=[[12,.1,30],[26,.7,22],[72,.3,34],[86,.9,24],[50,1.3,20]];function CL(n,t,e){TL(t.id);const i=t.unlock,s=i?_f(i.from)>=i.score?`${mh(i.score)} điểm mùa ${mv}`:`${gv(i.meters)} km tổng quãng bay`:"",r=document.createElement("div");r.className="unlock-pop",r.setAttribute("role","dialog"),r.setAttribute("aria-label",`Đã mở khoá ${t.name}`),r.innerHTML=`<div class="unlock-sky" aria-hidden="true">${RL.map(([u,h,f])=>`<i style="left:${u}%;animation-delay:${h}s;width:${f}px;height:${f}px">${Nt.lantern}</i>`).join("")}</div>
    <div class="unlock-card ui-paper map-${t.region}">
      <div class="unlock-art" style="background-image:url(ui/map-${t.id}.webp)"><span class="ui-stamp unlock-stamp">Mở khoá</span></div>
      <div class="unlock-kicker">${Nt.star}Map mới!</div>
      <h2 class="unlock-name">${t.name}</h2>
      <p class="unlock-sub">${t.tagline}</p>
      ${s?`<span class="ui-chip unlock-goal">${Nt.check}${s} ở ${Ai[i.from].name}</span>`:""}
      <div class="unlock-actions">
        <button type="button" class="ui-btn-lacquer" data-go>${Nt.play}Bay ${t.name}</button>
        <button type="button" class="ui-btn-cloth" data-later>Để sau</button>
      </div>
    </div>`,In(r);const o=r.querySelector("[data-go]"),a=r.querySelector("[data-later]"),c=()=>r.remove();r.addEventListener("click",u=>{u.stopPropagation();const h=u.target instanceof Element?u.target:null;h?.closest("[data-go]")?(c(),e(t)):(h===r||h?.closest("[data-later]"))&&c()});const l=u=>{if(!r.isConnected)return void window.removeEventListener("keydown",l,!0);if(u.key==="Escape")a.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===a?a:o).click();else return;u.stopPropagation(),u.preventDefault()};window.addEventListener("keydown",l,!0),n.appendChild(r)}const PL=[{name:"Mù Cang Chải",tagline:"Ruộng bậc thang vàng óng, đèo Khau Phạ nối dài."},{name:"Sapa",tagline:"Fansipan trên biển mây, rừng thông và thác Bạc."}];function Bm(n){try{localStorage.setItem($m,n.id)}catch{}const t=new URLSearchParams(location.search);t.set("map",n.id),location.search=t.toString()}function LL(n,t){const e=document.createElement("div");e.className="lobby-panel",e.hidden=!0,e.innerHTML=`<div class="lobby-card ui-indigo ui-trim" role="dialog" aria-label="Sảnh chọn map">
      <div class="panel-head">${Nt.mountain}<b>Chọn map</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Nt.close}</button>
      <div class="lobby-track" data-track></div>
      <div class="lobby-dots" data-dots></div>
      <button type="button" class="ui-btn-lacquer lobby-go" data-go></button>
    </div>`,n.appendChild(e),In(e);const i=e.querySelector("[data-track]"),s=e.querySelector("[data-dots]"),r=e.querySelector("[data-go]");let o=[],a,c=Cn,l=0;const u=_=>_.id===Cn?"current":Rc(_)?o.includes(_)?"fresh":"open":"locked",h=()=>[...i.querySelectorAll(".postcard")],f=()=>{h().forEach((y,b)=>{const w=(y.dataset.map??y.dataset.soon)===c;y.classList.toggle("selected",w),s.children[b]?.classList.toggle("on",w)});const M=Ai[c],x=M?u(M):"soon";r.disabled=x==="locked"||x==="soon",r.innerHTML=x==="locked"?`${Nt.lock}Chưa mở khoá`:x==="soon"?"Sắp có":`${Nt.play}Bay ${M.name}`},d=(_,M)=>{i.scrollTo({left:_.offsetLeft-(i.clientWidth-_.offsetWidth)/2,behavior:M?"smooth":"auto"})},p=()=>{i.innerHTML=Object.values(Ai).map(_=>EL(_,u(_))).join("")+PL.map(_=>AL(_.name,_.tagline)).join(""),s.innerHTML=h().map(()=>"<i></i>").join(""),f()},v=()=>{const _=Ai[c];!_||r.disabled||(_.id===Cn?(g(),t()):Bm(_))},g=()=>{e.hidden=!0};e.addEventListener("click",_=>{const M=_.target instanceof Element?_.target:null;if(M===e||M?.closest("[data-close]"))return g();if(M?.closest("[data-go]"))return v();const x=M?.closest(".postcard");if(!x)return;const y=x.dataset.map??x.dataset.soon;if(y===c)return v();c=y,f(),d(x,!0)}),i.addEventListener("scroll",()=>{clearTimeout(l),l=window.setTimeout(()=>{const _=i.scrollLeft+i.clientWidth/2,M=h().reduce((y,b)=>Math.abs(b.offsetLeft+b.offsetWidth/2-_)<Math.abs(y.offsetLeft+y.offsetWidth/2-_)?b:y),x=M.dataset.map??M.dataset.soon;x!==c&&i.scrollWidth>i.clientWidth+4&&(c=x,f())},140)},{passive:!0}),window.addEventListener("keydown",_=>{_.code==="Escape"&&!e.hidden&&g()});const m=()=>{const _=km().length>0||o.length>0;for(const M of n.querySelectorAll("[data-lobby]"))M.classList.toggle("has-news",_)};return{open(){const _=km()[0];c=o[0]?.id??_?.id??Cn,p(),e.hidden=!1;const M=h().find(x=>x.dataset.map===c);M&&requestAnimationFrame(()=>d(M,!1)),_&&!n.querySelector(".unlock-pop")&&CL(n,_,Bm),o=[],m()},setScreen(_){_!==a&&(a=_,_?m():g())},refresh(_=[]){_.length&&(o=[...new Set([...o,..._])]),e.hidden||p(),m()}}}function NL(){let n=null;return t=>{if(!ce.zoneNames||t.mode!=="run")return n=null,null;const e=t.z+t.speed*1.5,i=ce.zone(Ve(e),ji(e));return i===n?null:(n=i,ce.zoneNames[i]?i:null)}}const Ki=1/60;function IL(n){const t=new URLSearchParams(location.search),e=I2(t),i=fL(n,e),{renderer:s,post:r}=i,o=v_(),a=X2(n),c=b2(n,i.cam,i.lanterns,o,a,i.flashes,i.impacts,i.camera),l=Q2(n,()=>m.mode==="run"&&!I.paused(),()=>m.steerX),u=B2(Number(t.get("seed")??0));let h=u();const f=p_(t);let d=t.get("auto")==="1",p=d||t.has("z");const v=NL(),g=t.has("alt");let m=kc(h.seed,g);m.z=Number(t.get("z")??0);let _=0,M=null;const x=dL();x.capture(m);const y=yL(n,t.get("tut")==="1"),b=(B,K=!1,j=1)=>{const Mt=f.at(m.z),gt=x.view(m,j),At=i.present(gt,_-Ki*(1-j),B,Mt,K);A.present(m,gt,j,B),a.update(m,Mt),a.setPilotBox(m.mode==="run"?Lp(i.pilot,i.camera,n):null),o.update(At,m.mode==="run",Mt);const Bt=v(m);Bt&&(a.zone(Bt),o.zone(Bt)),R.setScreen(T.visible())},w=()=>{m.mode==="run"||m.mode==="crash"||n.querySelector(".unlock-pop")||(m.mode==="over"&&(h=u()),m=kc(h.seed,g),p=d||t.has("z"),m.z=Number(t.get("z")??0),x.capture(m),b(0,!0),$x(m),A.runStart(m,h.route),M=null,o.runStart(),T.hide(),a.setVisible(!0))},S=()=>{h=u(),m=kc(h.seed,g),m.z=Number(t.get("z")??0),p=d||t.has("z"),M=null,x.capture(m),b(0,!0),T.showTitle(),a.setVisible(!1)},T=gA(n,w,()=>{T.visible()==="over"&&S(),R.open()}),R=LL(n,w),A=JE({root:n,params:t,hud:a,screens:T,view:i.ghosts,camera:i.camera,route:h.route,quality:()=>({tier:e.name,scale:J.scale}),rv:g?2:nn.logRvBase+vg});A.progress().then(B=>B&&R.refresh(wL(B)));const P=QE(n,o),I=tA(n,P.el,{touch:matchMedia("(pointer: coarse)").matches,onHome:()=>(S(),R.open())});_A(n,P,o,i.ghosts,I),l.onAction(()=>{I.paused()?I.resume():T.visible()&&T.tapReady()&&w()}),l.onKey("KeyM",()=>P.toggle("sfx")),l.onKey("KeyN",()=>P.toggle("music")),l.onKey("KeyH",()=>a.setVisible(n.querySelector(".hud.hidden")!==null)),l.onTrick(i.trick),T.showTitle(),a.setVisible(!1);const N=B=>{x.capture(m),Kx(m,d?Xv(m):B,l.holdDown(),Ki,d?null:l.steer()),A.afterStep(m,d),c.handle(m.events,m);for(const K of m.events)K.type==="crash"&&(M=K.kind);_+=Ki,m.mode==="over"&&!T.visible()&&(!p&&!m.alt&&R.refresh(SL(nn.id,sr(m),m.z)),o.over(T.showOver(m,M)),A.runOver(m,M),a.setVisible(!1))};let U=0;const z=B=>{I.setRunning(m.mode==="run",m.mode==="crash");const K=(m.mode==="crash"&&m.crashT<.9?.35:1)*I.factor(B)*(d?1:y.update(m,B));if(y.frozen()&&!I.paused()){const j=l.take(),Mt=l.steer(),gt=Mt===null?m.lane:o0(m.lane,Mt),At=y.offer(gt!==m.lane?[...j,gt<m.lane?"left":"right"]:j);At&&N(j.includes(At)?[At]:[])}for(U+=B*K;U>=Ki;)N(l.take()),U-=Ki;b(B*K,!1,U/Ki)},V=()=>i.resize(n.clientWidth,n.clientHeight);window.addEventListener("resize",V),V(),b(0,!0),d2(s,r,{state:()=>m,advance(B){for(let K=0;K<B/Ki;K++)N(l.take()),b(Ki)},play(B,K=60){for(let j=0;j<B*K;j++)z(1/K)},autopilot(B){d=B,B&&(p=!0)},jump(B){p=!0,m.z=B,m.nextChunkZ=B+200,m.obstacles=[],m.pickups=[],x.capture(m),b(0,!0)},dusk:f.forceDusk,clock:f.forceU,render:()=>{b(0),r.render()},pilotBox:()=>Lp(i.pilot,i.camera,n),hurt(){m.mode!=="run"||m.hp<=1||(m.hp--,c.handle([{type:"hurt",hp:m.hp,kind:"pillar"}],m))}},i);const J=k2({renderer:s,post:r,tier:e,resize:V,tick:z,stats:t.has("stats")?B=>a.setStats(B):null,worldLine:()=>i.world.statsLine()});window.__skyrunQuality={tier:e,governor:J}}h_(nn.region);document.title=`Sky Run · ${m0[nn.region]}`;IL(document.getElementById("app"));Lv();
