(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Qv=6e3,Zm=[];function jv(n){return Zm.push(n),n}const Jm=new Promise(n=>{const t=()=>{Promise.allSettled(Zm).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>n(),{timeout:1500}):setTimeout(n,100)})};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0}),setTimeout(n,Qv)}),tx=n=>fetch(n,{priority:"low"}).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null);function ex(){const n=window.SR_SW,t=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!n||!t||!("serviceWorker"in navigator)||Jm.then(()=>navigator.serviceWorker.register(n).catch(e=>console.warn("[skyrun] sw",e)))}const Df=400,Ya=n=>Math.max(0,Math.min(1,n));function Ro(n,t){return n<=t.hardAt?t.d0+(1-t.d0)*Ya((n-Df)/(t.hardAt-Df)):1+.15*Ya((n-t.hardAt)/3e3)}const nx=[0,.12,.3,.5,.75];function ix(n){let t=0;return nx.forEach((e,i)=>{n>=e&&(t=i)}),t}function sx(n){return Math.max(-.2,.35-.55*n)}function rx(n){return n<=1?1-.28*Ya((n-.3)/.7):.72-.06*Ya((n-1)/.15)}const ox=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function ax(n,t){return n<.5||t%2===0}const it={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,maxHp:2,reactWindow:1,shieldMinGap:3e3,shieldMaxGap:4200,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2},sr=2;function pn(n){return-n*it.laneGap}function yh(n,t){const e=Math.min(1,Ro(n,t));return it.speedStart+(it.speedMax-it.speedStart)*(1-(1-e)*(1-e))}const ns={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10},overhang:{halfX:2.4,halfZ:3,lo:-1,hi:400}};function ao(n,t,e,i){const s=ns[n.kind];return Math.abs(i)>s.halfZ||Math.abs(t-pn(n.lane))>=s.halfX+it.hitHalfWidth?!1:e-it.hitHalfHeight<s.hi&&e+it.hitHalfHeight>s.lo}function cx(n,t,e){return Math.abs(t-pn(n.lane))>=ns[n.kind].halfX+it.hitHalfWidth?!0:e==="flare"?n.kind==="spike"||n.kind==="ridge":e==="dive"?n.kind==="bridge"||n.kind==="overhang":!1}function lx(n,t){return n.z+ns[n.kind].halfZ<t}const ux=[it.flareHeight,0,-5.5],hx=0,Qm=1,fx=2;function Yr(n,t,e){return!n.some(i=>ao(i,pn(t),ux[e],0))}function dx(n){const t=[];for(let e=-1;e<=1;e++)for(let i=0;i<3;i++)Yr(n,e,i)&&t.push({lane:e,tier:i});return t}function Uf(n){return dx(n).length}function Nc(n,t,e){return e?n.some(i=>(i.kind==="pillar"||i.kind==="overhang")&&i.lane===t)?"none":"any":Yr(n,t,Qm)?"any":Yr(n,t,hx)?"high":Yr(n,t,fx)?"low":"none"}function px(n,t,e,i,s){const r=n.thermalV>8,o=n.low&&!r,a=(t[0].z-n.z)/n.speed,c=d=>{const p=Nc(t,d,r);if(p==="none")return 1/0;const v=p==="any"?0:p==="low"&&o?.3:1.5;return Math.abs(d-n.lane)+v+(e&&Nc(e,d,r)==="none"?.6:0)},l=[-1,0,1].filter(d=>c(d)<1/0).sort((d,p)=>c(d)-c(p))[0];if(l===void 0)return a<i+.12&&n.vert!=="flare"?["up"]:[];const u=Nc(t,l,r);if(l===n.lane&&u==="any")return null;const h=[],f=s&&l===n.lane&&n.pickups.some(d=>!d.taken&&d.lane===n.lane&&d.z>n.z&&d.z<t[0].z&&(u==="low"?d.v<-2:d.v>2)&&(d.z-n.z)/n.speed<.2);if(u==="high"){const d=n.vert!=="flare"||n.vertT>=it.vertIn+it.vertHold;(a<i+.12+(o?.06:0)||f)&&d&&h.push("up")}else u==="low"&&(a<i+.12||f)&&((n.alt?n.low:n.vert==="dive"&&n.vertT<it.vertIn+it.vertHold)||h.push("down"));if(l!==n.lane){const d=i+(Math.abs(l-n.lane)-1)*it.laneTime*1.3;a<=d&&h.push(l<n.lane?"left":"right")}return h}function jm(n,t){const e=new Map;for(const i of n.obstacles){const s=i.z-n.z;if(i.passed||s<-ns[i.kind].halfZ||s>t)continue;const r=e.get(i.row)??[];r.push(i),e.set(i.row,r)}return[...e.values()].sort((i,s)=>i[0].z-s[0].z)}function kf(n){return new Set(n.filter(t=>t.kind==="pillar"||t.kind==="spike"||t.kind==="overhang").map(t=>t.lane))}function mx(n,t=.27,e=!0){if(n.mode!=="run")return[];const i=jm(n,n.speed*2.2),s=i[0],r=o=>e?vx(n,o):[];return s?px(n,s,i[1],t,e)??r(s):gx(n)??r()}function gx(n){const t=n.gusts.find(i=>!i.taken&&!i.missed&&i.z+i.len>n.z);if(!t||t.z-n.z>n.speed*1.5)return null;if(t.lane!==n.lane)return n.laneT<1?[]:[t.lane<n.lane?"left":"right"];const e=(t.z-n.z)/n.speed;return e0(n,t.v,e)?["up"]:e>.25?[]:t.v>2&&n.vert!=="flare"?["up"]:t.v<-2&&!t0(n)?["down"]:[]}function t0(n){return n.alt?n.low:n.vert==="dive"}function e0(n,t,e){return n.alt&&n.low&&n.vert==="cruise"&&Math.abs(t)<=2&&e<.9}function vx(n,t){const e=n.pickups.find(o=>!o.taken&&o.kind==="lantern"&&o.lane===n.lane&&o.z>n.z);if(e&&n.thermalV<2){const o=(e.z-n.z)/n.speed;if(e0(n,e.v,o))return["up"];if(e.v>2&&n.vert!=="flare"&&o<.2)return["up"];if(e.v<-2&&!t0(n)&&o<.2)return["down"]}const i=n.pickups.find(o=>!o.taken&&o.z-n.z>n.speed*.35&&o.z-n.z<n.speed*1.2);if(!i||i.lane===n.lane||n.laneT<1)return[];const s=i.lane<n.lane?-1:1;return t&&kf(t).has(n.lane+s)?[]:jm(n,i.z-n.z).some(o=>kf(o).has(n.lane+s))?[]:[s<0?"left":"right"]}const xx=["khau-pha","ha-giang"],n0="skyrun.map";function Ic(n){return xx.find(t=>t===n)??null}function _x(){const n=globalThis;if(n.location){const e=Ic(new URLSearchParams(n.location.search).get("map"));if(e)return e;try{return Ic(n.localStorage?.getItem(n0))??"khau-pha"}catch{return"khau-pha"}}const t=n.process?.argv?.find(e=>e.startsWith("--map="))?.slice(6);return Ic(t??n.process?.env?.SKYRUN_MAP)??"khau-pha"}const Pn=_x();function Ho(n,t,e){let i=Math.imul(n,374761393)^Math.imul(t,668265263)^Math.imul(e+1,2246822519);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function Ff(n){return n*n*n*(n*(n*6-15)+10)}function ut(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=Ff(n-i),o=Ff(t-s),a=Ho(i,s,e),c=Ho(i+1,s,e),l=Ho(i,s+1,e),u=Ho(i+1,s+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+u)*r*o}function Gn(n,t,e,i){let s=0,r=1,o=0,a=1;for(let c=0;c<e;c++)s+=ut(n*a,t*a,i+c*31)*r,o+=r,r*=.5,a*=2.03;return s/o}function Of(n,t,e,i){let s=0,r=1,o=0,a=1,c=1;for(let l=0;l<e;l++){const u=1-Math.abs(ut(n*a,t*a,i+l*17)*2-1),h=u*u*c;c=Math.min(1,h*1.6),s+=h*r,o+=r,r*=.5,a*=2.1}return s/o}function Zr(n){return n<0?0:n>1?1:n}function At(n,t,e){const i=Zr((e-n)/(t-n));return i*i*(3-2*i)}function Me(n,t,e){return n+(t-n)*e}const Mx=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],yx=[[90,30,300],[330,-35,280],[700,55,320],[1230,-40,280],[1480,50,260],[1720,-35,300],[2215,180,170],[2920,-90,260]],$n={"khau-pha":{id:"khau-pha",name:"Khau Phạ",tagline:"Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.",region:"khau-pha",cycle:2700,offset:1700,dayCycles:3,dayCutPhase:1300,arcs:Mx,profile:{d0:0,hardAt:5e3},routePrefix:"v",routeVersion:3,online:!0,logRvBase:0,unlock:null},"ha-giang":{id:"ha-giang",name:"Hà Giang",tagline:"Lao xuống hẻm Tu Sản, bám sông Nho Quế, chui hang đá, luồn Cổng Trời.",region:"ha-giang",cycle:3650,offset:400,dayCycles:2,dayCutPhase:850,arcs:yx,profile:{d0:.2,hardAt:5e3,tighten:1.4},routePrefix:"hg",routeVersion:3,online:!0,logRvBase:1e3,unlock:{from:"khau-pha",score:14e3,meters:39e3}}},Ge=$n[Pn],$e=Ge.cycle,hi=Ge.offset,gn=1100,i0=1320,ou=2450,s0=2700,bx=150,Mr=1480,Vo=1770,Sx=[320,640,930];function wx(n){let t=0;for(const e of Sx)t=Math.max(t,1-At(0,70,Math.abs(n-e)));return t}function Bf(n){return n<gn?0:n<ou?At(gn,i0,n):1-At(ou,s0,n)}const Tx={edge:gn,pullOut:Mr,archPhases:[260,800,1760,2230],caves:[],tower:{phase:2200,latMin:240,latMax:460,mirror:!1},openness:Bf,dive(n){const t=At(gn+40,gn+380,n)-At(ou-650,s0-60,n);return bx*t},sill(n){return At(760,940,n)*(1-At(1092,1108,n))},village(n,t){return t%2!==0?0:At(1600,1720,n)*(1-At(2380,2500,n))},halfWidth(n){const t=Me(64,30,n<gn?wx(n):0);return Me(t,430,Bf(n))},extraDepth:()=>0,reveal(n){return Zr(At(Mr-20,Mr+60,n)*(1-At(1640,1760,n)))},drop(n){return At(gn-25,gn+10,n)*(1-At(Mr-40,Mr+20,n))},clean(n){return At(gn-40,gn-10,n)*(1-At(1600,1690,n))},zone(n,t){return n<gn-60?"gorge":n<i0?"mouth":t?"village":"valley"},road:()=>0,roadDepth:()=>0,cloud:()=>1},rs=600,Go=1060,r0=320,Ex=r0+13;function Dc(n){return At(2230,2420,n)*(1-At(3420,3520,n))}function Ax(n){if(n<300)return Me(30,170,At(0,140,n));let t=170;return t=Me(t,110,At(900,1150,n)),t=Me(t,60,At(2200,2260,n)),Me(t,30,At(3440,3520,n))}const Rx={edge:rs,pullOut:Go,archPhases:[260],caves:[[1900,2200]],tower:{phase:2480,latMin:90,latMax:250,mirror:!0},openness:Dc,dive(n){return r0*(At(rs+20,Go,n)-At(2215,2740,n))},sill(n){return At(1040,1120,n)*(1-At(2205,2260,n))},village(n){return At(2800,2900,n)*(1-At(3380,3480,n))},halfWidth(n){return Me(Ax(n),430,Dc(n))},extraDepth(n){if(n<2200)return 190*At(20,160,n);const t=Ex-Me(150,240,Dc(n));return Me(190,t,At(2200,2260,n))*(1-At(2760,2900,n))},reveal(n){return At(2190,2270,n)*(1-At(2560,2700,n))},drop(n){return At(rs-25,rs+10,n)*(1-At(Go-40,Go+20,n))},clean(n){return At(rs-40,rs-10,n)*(1-At(1100,1160,n))+At(2200,2230,n)*(1-At(2700,2760,n))},road(n){return At(60,220,n)*(1-At(1700,1860,n))},roadDepth(n){return 55+28*Math.sin(n/170)+12*Math.sin(n/61+1.3)},cloud(n){return 1-At(-1,120,n)*(1-At(2250,2600,n))*.9},landmarks:[{kind:"bia-ma-pi-leng",phase:150,lat:205,turn:.4},{kind:"dinh-vua-meo",phase:3050,lat:300,turn:.2},{kind:"nui-doi",phase:3300,lat:380}],zoneNames:{rim:"Đèo Mã Pí Lèng",dive:"Vực Tu Sản",river:"Sông Nho Quế",cave:"Hang đá",climb:"Cột gió nhiệt",village:"Bản Lô Lô Chải",valley:"Cao nguyên đá",gate:"Cổng Trời Quản Bạ"},zone(n){return n<rs?"rim":n<1100?"dive":n<1900?"river":n<2200?"cave":n<2750?"climb":n<3500?"village":"gate"}},o0={"khau-pha":Tx,"ha-giang":Rx},le=o0[Pn],Cx=n=>o0[n],Ci=2*$e,ci=hi;function co(n,t){if(n.k===0)return{x:n.x+t*Math.sin(n.th),z:n.z+t*Math.cos(n.th),th:n.th};const e=n.th+n.k*t;return{x:n.x+(Math.cos(n.th)-Math.cos(e))/n.k,z:n.z+(Math.sin(e)-Math.sin(n.th))/n.k,th:e}}function zf(n,t){const e=[];let i=0,s=0,r=t,o=0;const a=(c,l)=>{if(c<.5)return;const u={k:l,x:i,z:s,th:r},h=co(u,c),f=co(u,c/2),d=Math.max(Math.hypot(f.x-i,f.z-s),Math.hypot(f.x-h.x,f.z-h.z));e.push({u0:o,len:c,k:l,x:i,z:s,th:r,bx:f.x,bz:f.z,br:d}),i=h.x,s=h.z,r=h.th,o+=c};for(const c of[1,-1]){const l=c===1?0:$e;for(const[u,h,f]of n)a(l+u-o,0),a(Math.abs(h)*Math.PI/180*f,c*Math.sign(h)/f);a(l+$e-o,0)}return{segs:e,x:i,z:s}}function Px(n){const t=zf(n,0),{segs:e,x:i,z:s}=zf(n,-Math.atan2(t.x,t.z));let r=e.length-1;for(;r>0&&e[r].u0>ci;)r--;const o=co(e[r],ci-e[r].u0),a=e.reduce((u,h)=>u+h.bx,0)/e.length,c=e.reduce((u,h)=>u+h.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-a,u.bz-c)+u.br));return{segs:e,endX:i,endZ:s,ox:o.x,oz:o.z,bx:a,bz:c,br:l}}const Co=Px(Ge.arcs);function Za(n,t,e=Co){const i=n+ci,s=Math.floor(i/Ci),r=i-s*Ci;let o=e.segs.length-1;for(;o>0&&e.segs[o].u0>r;)o--;const a=co(e.segs[o],r-e.segs[o].u0);return t.x=a.x+s*e.endX-e.ox,t.z=a.z+s*e.endZ-e.oz,t.yaw=a.th,t}const Lx={x:0,z:0,yaw:0},Nx={x:0,z:0,yaw:0};function Ix(n,t=30){return(Za(n+t,Nx).yaw-Za(n-t,Lx).yaw)/(2*t)}function Dx(n,t,e,i,s,r){let o;if(n.k===0)o=t*Math.sin(n.th)+e*Math.cos(n.th);else{const h=Math.sign(n.k);let d=Math.atan2(h*(e+Math.sin(n.th)/n.k),-h*(t-Math.cos(n.th)/n.k))-n.th;d-=2*Math.PI*Math.round((d-n.k*n.len/2)/(2*Math.PI)),o=d/n.k}const a=o>=i-.01&&o<=s+.01;o=Math.min(s,Math.max(i,o));const c=co(n,o),l=t-(c.x-n.x),u=e-(c.z-n.z);return r.s=o,r.dist=Math.hypot(l,u),r.lat=l*Math.cos(c.th)-u*Math.sin(c.th),a}const yr={s:0,lat:0,dist:0};function Ux(n,t,e,i,s,r=Co){s.dist=1/0;const o=Math.floor((e+ci)/Ci),a=Math.floor((i+ci)/Ci);for(let c=o;c<=a;c++){const l=c*Ci-ci;for(const u of r.segs){const h=l+u.u0;h>i||h+u.len<e||(Dx(u,n-c*r.endX+r.ox-u.x,t-c*r.endZ+r.oz-u.z,Math.max(0,e-h),Math.min(u.len,i-h),yr),yr.dist<s.dist&&(s.dist=yr.dist,s.s=h+yr.s,s.lat=yr.lat))}}return s}function We(n){return((n+hi)%$e+$e)%$e}function is(n){return Math.floor((n+hi)/$e)}const Jr=9.5;function qn(n){return le.village(We(n),is(n))}function es(n){return qn(n)>.97}function Dn(n){return le.openness(We(n))}function Yn(n){return 260+30*Math.sin(n/1700)}function Ne(n){return Yn(n)-le.dive(We(n))}function bh(n){return le.sill(We(n))}function Pi(n){return(Ne(n+2)-Ne(n-2))/4}function a0(n,t){return Math.max(-1.1,Math.min(1.1,Math.atan(t*t*Ix(n)/9.8)))}const Ys={x:0,z:0,yaw:0};function mn(n){return Za(n,Ys).yaw}function ue(n,t,e,i){return Za(n,Ys),i.x=Ys.x+t*Math.cos(Ys.yaw),i.y=Ne(n)+e,i.z=Ys.z-t*Math.sin(Ys.yaw),i}function rr(n){return le.halfWidth(We(n))}function Po(n){return le.extraDepth(We(n))}function au(n){return Yn(n)-Me(150,240,Dn(n))-Po(n)}function kx(n){return le.reveal(We(n))}function Fx(n){return le.drop(We(n))}function c0(n){return le.clean(We(n))}function Ox(n,t){const e=(Ne(n+4)-Ne(n-4))/8,i=(Ne(n+4)-2*Ne(n)+Ne(n-4))/16;return 1+t*t*i/(Math.pow(1+e*e,1.5)*9.8)}const l0=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ..o .o. o.. .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Bx={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},zx=8,u0=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function Ja(n){return n.split(" ")}function Li(n){let t=n.seed=n.seed+1831565813|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hx(n,t,e,i=1){const s=ox;let r=0;for(;r<s.length-1&&n>s[r+1][0];)r++;const o=s[r],a=s[Math.min(r+1,s.length-1)],c=a[0]>o[0]?Math.max(0,Math.min(1,(n-o[0])/(a[0]-o[0]))):1,l=(e?.5:1)*(t?.6+.3*Math.min(1,n):1)*i;return{p3:(o[1]+(a[1]-o[1])*c)*l,p2:(o[2]+(a[2]-o[2])*c)*l}}const Vx=new Set(["o","u","d"]),Gx=/[BLHO]/;function Wx(n,t,e,i,s,r,o){if(!t.length)return;for(let y=i-3;y<=i+3;y++)if(y!==i&&Gx.test(e[y]??""))return;const{p3:a,p2:c}=Hx(Ro(Math.max(0,s),n.diff),r,o,n.diff.tighten),l=Li(n),u=l<c?2:l<c+a?3:0;if(!u||Uf(t)<=u)return;const h=t.some(y=>y.kind==="bridge"||y.kind==="ridge");if(h&&o)return;const f=y=>t.some(_=>(_.kind==="pillar"||_.kind==="spike"||_.kind==="overhang")&&_.lane===y),d=[-1,0,1].filter(y=>!f(y)&&(h||e[i][y+1]===".")&&![i-2,i-1,i+1].some(_=>Vx.has(e[_]?.[y+1]??""))),p=h?["pillar"]:o?["spike"]:["pillar","spike"],v=[[]];for(const y of d){const _=[];for(const x of v){_.push(x);for(const M of p)_.push([...x,{kind:M,lane:y}])}v.splice(0,v.length,..._)}const m=y=>[-1,0,1].every(_=>[...t,...y].some(x=>(x.kind==="pillar"||x.kind==="overhang")&&x.lane===_)),g=v.filter(y=>y.length&&Uf([...t,...y])===u&&!m(y));g.length&&t.push(...g[Math.floor(Li(n)*g.length)])}const Hf=700,Xx=15e8,Uc=(n,t,e)=>!n.alt&&n.hp<it.maxHp&&t-n.shieldFromZ>=e;function Qa(n,t){const e=Math.max(0,t);return yh(e,n.diff)*it.cellSeconds*rx(Ro(e,n.diff))}function cu(n,t,e){const i=Ro(Math.max(0,e),n.diff),s=ix(i),r=t.filter(h=>h.tier<=s&&!n.lastBag.includes(h.id)),o=r.length?r:t.filter(h=>h.tier<=s),a=sx(i),c=o.map(h=>(h.tier===s?1.4:1)/(1+a*h.tier));let l=Li(n)*c.reduce((h,f)=>h+f,0),u=o[0];for(let h=0;h<o.length;h++)if(l-=c[h],l<=0){u=o[h];break}return n.lastBag.push(u.id),n.lastBag.length>4&&n.lastBag.shift(),u}const Vf={o:0,u:it.flareHeight,d:-5.5},$x={B:"pillar",L:"spike",H:"bridge",O:"overhang"};function Qr(n,t,e,i){const s=Ja(t.cells),r=Qa(n,e);let o=!1;const a=Math.floor((e+s.length*r)/Hf),c=a>Math.floor(e/Hf)&&e>300&&ax(Ro(e,n.diff),a);return s.forEach((l,u)=>{const h=e+(u+.5)*r,f=n.rowId++,d=es(h),p=[];if(l==="HHH"||l==="LLL")p.push({kind:l==="HHH"?"bridge":"ridge",lane:0});else for(let _=-1;_<=1;_++){const x=$x[l[_+1]];x&&p.push({kind:d&&x==="pillar"?"spike":x,lane:_})}Wx(n,p,s,u,h,i,d);const v=_=>{n.obstacles.push({id:n.nextId++,kind:_.kind,lane:_.lane,z:h,open:i,row:f,passed:!1})};if(l==="HHH"||l==="LLL"){p.forEach(v);return}const m=p.length>0;for(let _=-1;_<=1;_++){const x=l[_+1],M=p.filter(b=>b.lane===_);if(M.forEach(v),!M.length&&x in Vf){const b=s[u-1]==="HHH"||s[u-2]==="HHH",w=n.alt&&x==="o"&&b?it.flareHeight:Vf[x];n.pickups.push({id:n.nextId++,kind:"lantern",lane:_,v:w,z:h,taken:!1})}}const g=[-1,0,1].filter(_=>l[_+1]==="."&&Yr(p,_,Qm)),y=m?g:[];if(c&&!o&&y.length){const _=y[Math.floor(Li(n)*y.length)],x=Li(n),M=n.alt?x<.45?"thermal":x<.75||n.hp>=it.maxHp?"smoke":"shield":Uc(n,h,it.shieldMaxGap)||x>=.6&&Uc(n,h,it.shieldMinGap)?"shield":"thermal";M==="shield"&&(n.shieldFromZ=h),n.pickups.push({id:n.nextId++,kind:M,lane:_,v:0,z:h,taken:!1}),o=!0}else g.length&&Uc(n,h,it.shieldMaxGap)&&(n.shieldFromZ=h,n.pickups.push({id:Xx+f,kind:"shield",lane:g[(Math.imul(f,2654435761)>>>0)%g.length],v:0,z:h,taken:!1}))}),n.chunksSpawned++,e+s.length*r}const h0=(...n)=>l0.filter(t=>n.includes(t.id)),f0=[{id:"mai-trai",tier:0,cells:"... ... ... ... d.. d.. O.. o.. ... ..."},{id:"mai-phai",tier:0,cells:"... ... ... ... ..d ..d ..O ..o ... ..."},{id:"mai-cot",tier:1,cells:"... ... ... ... d.. O.B ... ... ... ... B.O ..d ... ..."},{id:"mom-mai",tier:1,cells:"... ... ... ... u.d L.O .o. ... ... ..."},{id:"mai-ong",tier:2,cells:"... ... ... ... ..d O.. ... ... ... .B. ... ... ... ..O ... ..."},{id:"cau-mai",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... O.. ... ..."},{id:"chon-tang",tier:3,cells:"... ... ... ... d.u OBL ... ... ... ... u.d LBO ... ..."},{id:"mai-zic",tier:3,cells:"... ... O.B ... ... ... B.O ... ... ... O.B ... ..."},{id:"mai-cau-mom",tier:4,cells:"... ... ... ... d.. OBL ... ... ... .d. HHH ... ... ... LBO ... ..."},{id:"luon-mai",tier:4,cells:"... ... OB. ... ... ... .BO ... ... ... OB. ... ..."}],qx=[...h0("cot-le","den-thang","cau-mot","zic-zac","cong-lech","cau-cot","ong-da","luon-cot","cot-cau-cot","zic-zac-gat","cot-cau-mom"),...f0.filter(n=>n.id!=="luon-mai")],Kx=[{id:"den-song",tier:0,cells:"... ... o.. .o. ..o .o. o.. ... ..."},...h0("cong-giua","cot-giua","cong-zic","mom-song","doi-doc","vot-chui-vot"),...f0],Yx=[{id:"nhu-giua",tier:0,cells:"... ... .d. .d. .O. .o. ... ..."},{id:"nhu-hai-ben",tier:0,cells:"... ... ... O.O .o. ... ... ..."},{id:"nhu-mang",tier:1,cells:"... ... ... u.d L.O ... ... ..."},{id:"nhu-mang-doi",tier:2,cells:"... ... ... .d. LOL ... ... ..."},{id:"nhu-kin",tier:3,cells:"... ... ... d.d OLO ... ... ..."}],Zx=u0,Jx=5;function Qx(n){const t=["o..",".o.","..o"][n+1],e=[".BB","B.B","BB."][n+1];return{id:`cong-troi-${n}`,tier:0,cells:`... ... ${t} ${t} ${t} ${e} ${t} ... ...`}}function Sh(n){n.mult=Math.min(it.multMax,1+n.multNear+n.multLantern)}function wh(n,t,e){n.bonus+=e,n.parts[t]+=e}function jx(n,t){const e=it.lanternMultStep*n.streak;e>=n.multLantern?n.multLantern=e:n.multLantern+=(e-n.multLantern)*(1-Math.exp(-.016666666666666666/it.lanternMultTau)),Sh(n)}function d0(n){n.streak=0}const t_=[0,it.flareHeight,-5.5];function p0(n,t,e){const i=t+e[0];if(n.gusts.some(o=>o.z===i))return;let s=Math.floor(Li(n)*3)-1,r=0;e.forEach((o,a)=>{const c=Li(n),l=Li(n);a>0&&(s=Math.max(-1,Math.min(1,s+(c<.35?-1:c<.7?1:0))));let u=a===0?0:t_[l<.6?0:l<.8?1:2];n.alt&&u===0&&r<-2&&(u=it.flareHeight),r=u,n.gusts.push({id:n.nextId++,index:a,count:e.length,lane:s,v:u,z:t+o,len:it.gustLen,taken:!1,missed:!1})})}function e_(n){return n.thermalV+n.windLift}function n_(n,t,e,i){if(!i){n.tailwind=0,n.windLift=0,n.liftT=0;return}n.tailwind*=Math.exp(-t/(e?it.surgeTauNearRow:it.tailwindTau)),e&&(n.liftT=0),n.liftT=Math.max(0,n.liftT-t);const s=n.liftT>0?2.2:e?2.5:1.2;n.windLift+=((n.liftT>0?it.gustLift:0)-n.windLift)*(1-Math.exp(-t*s))}function i_(n){for(const t of n.gusts){if(t.taken||t.missed)continue;if(n.z<t.z)break;if(n.z>t.z+t.len){t.missed=!0,n.gustChain=0,n.events.push({type:"gust-miss"});continue}if(Math.abs(n.x-pn(t.lane))>it.gustRadiusX||Math.abs(n.moveV-t.v)>it.gustRadiusV)continue;t.taken=!0,t.index===0&&(n.gustChain=0),n.gustChain++,n.gustsTaken++,n.tailwind=Math.min(it.tailwindMax,n.tailwind+it.tailwindPerGust),n.liftT=it.gustLiftTime;const e=t.index===t.count-1&&n.gustChain===t.count;wh(n,"gust",(it.gustScore+(e?it.gustChainScore:0))*n.mult),n.events.push({type:"gust",chain:n.gustChain,full:e})}}function s_(n,t){n.gusts.length&&n.gusts[0].z+n.gusts[0].len<t&&(n.gusts=n.gusts.filter(e=>e.z+e.len>=t))}const r_=[{kind:"rows",from:40,to:560,pool:qx,open:!1},{kind:"gusts",at:600,phases:[640,715,790,865,940]},{kind:"rows",from:1180,to:1880,pool:Kx,open:!1},{kind:"rows",from:1990,to:2110,pool:Yx,open:!1},{kind:"gusts",at:2200,phases:[2270,2350,2430,2510,2590]},{kind:"rows",from:2800,to:3470,pool:Zx,open:!0},{kind:"gate",at:3560}];function o_(n,t){const e=We(t),i=t-e;for(const s of r_){if(s.kind==="rows"){if(e>=s.to)continue;if(e<s.from)return i+s.from+.5;const a=cu(n,s.pool,t);return e+Ja(a.cells).length*Qa(n,t)>s.to?i+s.to+.5:Qr(n,a,t,s.open)}if(e>=s.at)continue;if(s.kind==="gusts")return p0(n,i,s.phases),i+s.at+.5;const r=Math.floor(Li(n)*3)-1,o=Math.max(t,i+s.at-(Jx+.5)*Qa(n,t));return Math.max(Qr(n,Qx(r),o,!1),i+s.at+.5)}return i+$e+.5}const a_=[1140,1225,1310,1395,1480];function c_(n,t){const e=We(t),i=Qa(n,t),s=gn-30-(zx+.5)*i;if(e<40)return t+(40-e)+.5;if(e<s){const a=cu(n,l0,t);return e+Ja(a.cells).length*i>s?t+(s-e)+.5:Qr(n,a,t,!1)}if(e<gn){let a=Qr(n,Bx,t,!1);p0(n,t-e,a_);const c=We(a);return c>gn&&c<Vo&&(a+=Vo-c+.5),a}if(e<Vo)return t+(Vo-e)+.5;const r=cu(n,u0,t);return e+Ja(r.cells).length*i>$e-60?t+($e-e)+40:Qr(n,r,t,!0)}const l_={"khau-pha":c_,"ha-giang":o_},u_=l_[Pn];function h_(n){for(;n.nextChunkZ<n.z+it.spawnAheadMeters;)n.nextChunkZ=u_(n,n.nextChunkZ);const t=n.z-it.despawnBehind;n.obstacles.length&&n.obstacles[0].z<t&&(n.obstacles=n.obstacles.filter(e=>e.z>=t)),n.pickups.length&&n.pickups[0].z<t&&(n.pickups=n.pickups.filter(e=>e.z>=t)),s_(n,t)}const m0=1e9;function f_(n){const t=it.thermalTime-.6;for(let e=.5;e<t;e+=.22){const i=n.z+n.speed*1.08*e,s=n.obstacles.filter(a=>Math.abs(a.z-i)<12),r=[-1,0,1].filter(a=>!s.some(c=>ao(c,pn(a),it.thermalHeight,0)));if(!r.length)continue;const o=r.includes(n.lane)?n.lane:r[0];n.pickups.push({id:m0+n.trailIds++,kind:"lantern",lane:o,v:it.thermalHeight,z:i,taken:!1})}n.pickups.sort((e,i)=>e.z-i.z)}function d_(n,t){return n.thermalV>8&&t.id<m0?!1:!n.pickups.some(e=>e!==t&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-t.z)<.5)}function p_(n){for(const t of n.pickups){if(t.taken)continue;const e=t.z-n.z;if(e>3)break;if(e<-3){t.kind==="lantern"&&e>-3-n.speed/60&&d_(n,t)&&d0(n);continue}Math.abs(n.x-pn(t.lane))<it.lanternPickRadius&&Math.abs(n.v-t.v)<it.lanternPickRadius&&(t.taken=!0,t.kind==="lantern"?(n.lanterns++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak),wh(n,"lantern",it.lanternScore*n.mult*(n.smokeT>0?it.smokeLanternMul:1)),n.events.push({type:"lantern",streak:n.streak,id:t.id})):(t.kind==="thermal"?(n.thermalT=it.thermalTime,n.low=!1,f_(n)):t.kind==="smoke"?(n.smokeT=it.smokeTime,n.smokes++):n.hp=Math.min(it.maxHp,n.hp+1),n.events.push({type:"booster",kind:t.kind})))}}function g0(n,t){const e=Math.sign(t-n.lane);n.lane=t,n.laneT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert=n.vert,n.events.push({type:"lane",dir:e})}function m_(n,t){n.steerX=Math.max(-7,Math.min(it.steerMax,t));const e=v0(n.lane,n.steerX);e!==n.lane&&g0(n,e)}function v0(n,t){return Math.abs(t-pn(n))<=it.laneGap*.57?n:Math.max(-1,Math.min(1,Math.round(-t/it.laneGap)))}function x0(n,t,e,i,s,r){const o=n-e,a=t+i*o,c=Math.exp(-i*s);return r.x=e+(o+a*s)*c,r.vel=(t-i*a*s)*c,r}function _0(){return it.vertIn+it.vertHold+it.vertOut}const kc={x:0,vel:0};function g_(n,t){n.vert!=="cruise"&&(!n.alt&&n.holdDive&&n.vertT>it.vertIn&&n.vertT<it.vertIn+it.vertHold&&(n.vertT=it.vertIn+.01),n.vertT+=t,n.vertT>=(n.alt&&n.vert==="dive"?it.lowTransition:_0())&&(n.vert="cruise",n.vertT=0));const e=n.vert!=="cruise"&&n.vertT<it.vertIn+it.vertHold,i=n.low?-5.5:0,s=e?n.vert==="flare"?it.flareHeight:-5.5:i;x0(n.moveV,n.moveVel,s,e||n.low?it.vertOmegaIn:it.vertOmegaOut,t,kc),n.moveV=kc.x,n.moveVel=kc.vel}const Fc={x:0,vel:0};function Oc(n,t=!1,e=Ge.profile){return{mode:"ready",seed:n,alt:t,diff:e,low:!1,smokeT:0,smokes:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],hp:it.maxHp,stunT:0,hurtRow:-1,shieldFromZ:0,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:is(0)*2+1,lastBag:[],events:[]}}function v_(n){n.mode="run",n.nextChunkZ=Math.max(n.nextChunkZ,n.z+220)}function Gf(n,t){if(t==="left"||t==="right"){const i=t==="left"?-1:1;if(n.laneT<it.laneTime*.6)return!1;const s=Math.max(-1,Math.min(1,n.lane+i));return n.steerX=pn(s),s!==n.lane&&g0(n,s),!0}const e=t==="up"?"flare":"dive";return n.alt&&e==="dive"&&n.low?!0:n.vert===e&&n.vertT<_0()-it.vertOut?!1:(n.alt&&(n.low=e==="dive"),n.vert=e,n.vertT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert="cruise",n.events.push({type:"vert",kind:e}),!0)}function x_(n,t){if(t.row!==n.hurtRow){if(n.hp>=it.maxHp&&(n.shieldFromZ=Math.max(n.shieldFromZ,n.z)),n.hp-=cx(t,n.steerX,n.low?"dive":n.vert)||n.time-n.dodgeTime<=it.reactWindow?1:n.hp,n.hp>0){n.hurtRow=t.row,n.stunT=it.stunTime,n.hitstopT=it.hitstop,n.surge=it.surgeMin,n.combo=0,n.multNear=0,d0(n),Sh(n),n.events.push({type:"hurt",hp:n.hp,kind:t.kind});return}n.hp=0,n.mode="crash",n.crashT=0,n.hitstopT=it.hitstop*2,n.events.push({type:"crash",kind:t.kind})}}function __(n,t,e,i,s=null){if(n.events.length=0,n.time+=i,n.mode==="over")return;if(n.mode==="crash"){n.crashT+=i,n.z+=n.speed*i*Math.max(0,1-n.crashT*1.5),n.crashT>=it.crashSeconds&&(n.mode="over");return}if(n.hitstopT>0){n.hitstopT-=i;return}const r=n.mode==="run";r&&s!==null&&m_(n,s);for(const d of r?t:[])Gf(n,d)||(n.buffered=d,n.bufferT=it.bufferTime);n.buffered&&(n.bufferT-=i,(Gf(n,n.buffered)||n.bufferT<=0)&&(n.buffered=null)),n.holdDive=e&&n.vert==="dive";const o=n.vert==="dive"?it.diveSpeedMul:n.vert==="flare"?it.flareSpeedMul:1,a=Math.sin(Math.atan(Pi(n.z))),c=n.obstacles.some(d=>!d.passed&&d.z>n.z&&d.z<n.z+n.speed*2.5),l=n.surge>0&&c?it.surgeTauNearRow:it.surgeTau;n.surge+=(-9.8*a-n.surge/l)*i,n.surge=r?Math.max(it.surgeMin,Math.min(it.surgeMax,n.surge)):0,n_(n,i,c,r);const u=r?yh(n.z,n.diff)*o+n.surge+n.tailwind:24;n.speed+=(u-n.speed)*(1-Math.exp(-i*3)),n.z+=n.speed*i,r&&h_(n);const h=is(n.z)*2+(Dn(n.z)>.5?1:0);h!==n.sectionIndex&&(n.sectionIndex=h,n.events.push({type:"section",open:h%2===1,index:h})),n.laneT=Math.min(1,n.laneT+i/it.laneTime),x0(n.x,n.xVel,n.steerX,it.laneOmega,i,Fc),n.x=Fc.x,n.xVel=Fc.vel,g_(n,i),n.thermalT>0&&n.thermalT<=i&&n.obstacles.some(d=>(d.kind==="bridge"||d.kind==="ridge"||d.kind==="overhang")&&d.z>n.z&&d.z<n.z+n.speed*2.2)&&(n.thermalT=i*2),n.thermalT=Math.max(0,n.thermalT-i);const f=n.thermalT>0?it.thermalHeight:0;if(n.thermalV+=(f-n.thermalV)*(1-Math.exp(-i*(n.thermalT>0?2.5:1.8))),n.v=n.thermalV+n.windLift+n.moveV,n.stunT=Math.max(0,n.stunT-i),r&&(n.smokeT=Math.max(0,n.smokeT-i)),r){for(const d of n.obstacles)if(!(d.passed||d.z-n.z>6)){if(ao(d,n.x,n.v,d.z-n.z)){if(d.passed=!0,x_(n,d),n.mode==="crash")return;continue}lx(d,n.z)&&(d.passed=!0,n.time-n.dodgeTime<=it.nearMissWindow+.1&&ao(d,n.dodgeX,n.alt?n.dodgeV:n.thermalV,0)&&(n.combo++,n.comboT=0,n.multNear=it.multStep*n.combo,Sh(n),wh(n,"nearMiss",25*n.mult),n.events.push({type:"near-miss",combo:n.combo,kind:d.kind})))}p_(n),i_(n),n.comboT+=i,n.comboT>it.comboBreak&&n.combo>0&&(n.combo=0,n.multNear=0),jx(n),n.score+=n.speed*i*n.mult}}function _s(n){return Math.floor(n.score+n.bonus)}const M_=["keydown","pointerdown","pointerup","touchstart","touchend","click"],y_=1500,b_=1e3;function S_(n){let t=-1/0;n.addEventListener("statechange",()=>{n.state==="running"&&(t=performance.now())});const e=()=>{n.state!=="running"&&n.state!=="closed"&&n.resume()};for(const s of M_)window.addEventListener(s,e,{capture:!0,passive:!0});let i=-1/0;return window.addEventListener("pointermove",()=>{const s=performance.now();n.state!=="suspended"||s-i<y_||(i=s,n.resume())},{passive:!0}),{resume:e,justWoke:()=>n.state!=="running"||performance.now()-t<b_}}const w_=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss"],M0=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc","ma-pi-leng","song-nho-que","vao-hang","cot-gio","cong-troi"],Wf={"wind-loop":.6},Bc=new URLSearchParams(location.search).get("voice"),T_=Bc&&/^[a-z_]+$/.test(Bc)?`audio-opts/voice/${Bc}`:"audio/voice",E_=n=>M0.includes(n)?`${T_}/${n}.mp3`:`audio/${n}.mp3`,y0=new Map;for(const n of[...w_,...M0])y0.set(n,fetch(E_(n)).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null));function A_(n){const t=new Map;for(const[e,i]of y0)i.then(async s=>{if(!s)return;const r=await n.decodeAudioData(s.slice(0)).catch(()=>null);r&&t.set(e,Wf[e]?C_(n,r,Wf[e]):r)});return{get:e=>t.get(e),play(e,i,s={}){const r=t.get(e);if(!r)return null;const o=n.createBufferSource();o.buffer=r,o.loop=s.loop??!1,o.playbackRate.value=s.rate??1;const a=n.createGain();a.gain.value=s.vol??1;let c=o.connect(a);if(s.pan){const l=n.createStereoPanner();l.pan.value=s.pan,c=c.connect(l)}return c.connect(i),o.start(),o}}}function R_(n,t){const e=Math.floor(t*n.sampleRate),i=n.length-e;if(i<=e)return n.duration;for(let s=0;s<n.numberOfChannels;s++){const r=n.getChannelData(s);for(let o=0;o<e;o++){const a=o/e;r[o]=r[o]*Math.sqrt(a)+r[i+o]*Math.sqrt(1-a)}}return i/n.sampleRate}function C_(n,t,e){const i=Math.floor(e*t.sampleRate),s=t.length-i;if(s<=i)return t;const r=n.createBuffer(t.numberOfChannels,s,t.sampleRate);for(let o=0;o<t.numberOfChannels;o++){const a=t.getChannelData(o),c=r.getChannelData(o);c.set(a.subarray(0,s));for(let l=0;l<i;l++){const u=l/i;c[l]=a[l]*Math.sqrt(u)+a[s+l]*Math.sqrt(1-u)}}return r}const P_=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"ha-giang-1",label:"Hà Giang",style:"Vinahouse · khèn, đàn môi, chuông ngựa · 132 bpm",file:"audio/music/ha-giang-1.mp3",lufs:-13.8},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9},{id:"kpop-anthem-1",label:"We Rise",style:"K-pop anthem · hát tiếng Anh, khèn, sáo · 122 bpm",file:"audio/music/kpop-anthem-1.mp3",lufs:-13.8},{id:"cophong-vocal-1",label:"Bay lên",style:"Cổ phong pop · hát tiếng Việt, đàn tranh, sáo trúc · 128 bpm",file:"audio/music/cophong-vocal-1.mp3",lufs:-13.5},{id:"cophong-edm-1",label:"Cổ phong",style:"Cổ phong EDM · đàn tranh, sáo trúc, đàn nhị, khèn · 130 bpm",file:"audio/music/cophong-edm-1.mp3",lufs:-15.1}],Xf={"khau-pha":["music-flight","taybac-3","vinahouse-1","kpop-trap-1"],"ha-giang":["ha-giang-1","cophong-vocal-1","cophong-edm-1","vinahouse-2"],"mu-cang-chai":["edm-vocal-1","taybac-2","kpop-dance-1"],fansipan:["kpop-vocal-1","kpop-anthem-1","kpop-dance-2"]},b0=n=>P_.find(t=>t.id===n),S0=n=>(Xf[n]??Xf["khau-pha"]).map(t=>b0(t)),w0="skyrun.settings",T0="skyrun.sound";function E0(){try{const n=JSON.parse(localStorage.getItem(T0)??"{}");if(n.v===2)return{sfx:n.sfx!==!1,music:n.music!==!1};const t=n.muted===!0;return{sfx:!t,music:!t&&n.music!==!1}}catch{return{sfx:!0,music:!0}}}function L_(n){try{localStorage.setItem(T0,JSON.stringify({v:2,...n}))}catch{}}const N_=["on","dim","off"];let lu="shuffle";function lo(){try{const n=JSON.parse(localStorage.getItem(w0)??"{}");return{music:lu,ghosts:N_.includes(n.ghosts)?n.ghosts:"on"}}catch{return{music:lu,ghosts:"on"}}}function A0(n){n.music!==void 0&&(lu=n.music);try{const{ghosts:t}={...lo(),...n};localStorage.setItem(w0,JSON.stringify({ghosts:t}))}catch{}}const br=3,I_=-13.1,D_=20,$f=32e3,U_=n=>{if(n.sampleRate<=$f)return n;try{return new OfflineAudioContext(2,1,$f)}catch{return n}},ka=S0(Pn),k_=n=>ka.find(t=>t.id===n)??null,zc=n=>{if(n===null)return ka[0];const t=ka.filter(e=>e.id!==n);return t[Math.floor(Math.random()*t.length)]??ka[0]};function F_(n,t){const e=new Map,i=U_(n);let s=!1;Jm.then(()=>s=!0);let r=!1,o=lo().music;const a=()=>o==="shuffle"?null:k_(o);let c=zc(null),l=null;const u=v=>{let m=e.get(v.id);return m||e.set(v.id,m={bytes:tx(v.file),buf:null,loop:0,decoding:!1}),m},h=(...v)=>{for(const m of e.keys())v.includes(m)||e.delete(m)},f=(v,m)=>{const g=u(v);return g.buf?!0:(m&&!g.decoding&&(g.decoding=!0,g.bytes.then(async y=>{const _=y&&await i.decodeAudioData(y).catch(()=>null);_&&e.get(v.id)===g&&(g.loop=R_(_,br),g.buf=_)})),!1)},d=v=>Math.min(1.6,10**((I_-v.lufs)/20)),p=(v,m)=>{const g=n.currentTime,y=e.get(v.id),_=n.createBufferSource();_.buffer=y.buf,_.loop=!0,_.loopEnd=y.loop;const x=n.createGain();if(x.gain.setValueAtTime(0,g),x.gain.linearRampToValueAtTime(d(v),g+m),_.connect(x).connect(t),_.start(g,br),l){const M=l.gain.gain;M.cancelScheduledValues(g),M.setValueAtTime(M.value,g),M.linearRampToValueAtTime(0,g+m),l.src.stop(g+m+.05)}l={t:v,src:_,gain:x,at:g-br,loop:y.loop},c=a()?v:zc(v.id),h(v.id,c.id),u(c)};return{tick(v){if(!v)return;const m=a();if(!l||m&&m.id!==l.t.id){const y=m??c;(l||s||r)&&f(y,!0)&&p(y,1);return}if(m||c.id===l.t.id)return;const g=l.loop-(n.currentTime-l.at)%l.loop;f(c,g<D_)&&g<br&&p(c,br)},choice:()=>a()?.id??"shuffle",setChoice(v){o=v==="shuffle"||b0(v)?v:"shuffle",A0({music:o}),r=!0,!(a()||!l)&&(c=zc(l.t.id),h(l.t.id,c.id),u(c))},playing:()=>l?.t??null,loading:()=>{const v=a()??(l?null:c);return v&&v.id!==l?.t.id&&!e.get(v.id)?.buf?v:null},held:()=>[...e].map(([v,m])=>m.buf?`${v}:pcm`:v)}}const Lo=$e*Ge.dayCycles,ja=Ge.dayCutPhase-hi+Lo,R0={"khau-pha":"Khau Phạ","ha-giang":"Hà Giang"};function C0(n){return n<ja?1:2+Math.floor((n-ja)/Lo)}function uu(n){return n<=1?0:ja+(n-2)*Lo}const No={value:0};let P0="khau-pha";function O_(n){P0=n,No.value=n==="ha-giang"?1:0}const tc=()=>P0,Io=()=>No.value,Th="uniform float uRegionHg;";function L0(n,t=!1){return{dusk:(t?.34:.62)*(1-At(0,.08,n))+.5*At(.52,.66,n)+.5*At(.68,.78,n)-.38*At(.95,1,n),morn:At(.03,.14,n)*(1-At(.3,.45,n))}}function B_(n){const t=C0(n),e=uu(t),i=Math.min(1,Math.max(0,(n-e)/(t===1?ja:Lo)));return{day:t,region:tc(),u:i,...L0(i,t===1)}}function z_(n){return n.u>=.95?"Rạng sáng":n.u>=.74?"Đêm đèn trời":n.u>=.56?"Hoàng hôn":n.u<.1?"Bình minh":n.u<.4?"Buổi sáng":"Chiều vàng"}function N0(n){const t=n.u<.5?0:n.dusk>=.98?2:n.dusk>=.48?1:0;return(n.day-1)*3+t}function H_(n){let t=null;const e=s=>{t=s===null?null:{day:1,region:tc(),u:s,...L0(s,!0)}},i=s=>{t=s===null?null:{day:1,region:tc(),u:.52+.26*s,dusk:s,morn:0}};return n.has("dusk")&&i(Number(n.get("dusk"))),n.has("clock")&&e(Number(n.get("clock"))),{at:s=>t??B_(s),forceU:e,forceDusk:i}}const V_={rim:"ma-pi-leng",river:"song-nho-que",cave:"vao-hang",climb:"cot-gio",gate:"cong-troi"},qf=[0,2,4,7,9],Wo=.32,Kf=.85,G_=.6;function W_(){let n=null,t=null,e=null,i=null,s=null,r=null,o=null,a=null,c=null,l=null;const u=E0();let h=u.sfx,f=u.music;const d=()=>L_({sfx:h,music:f});let p=0,v=0,m=null,g=0,y=null;const _=()=>{if(y)return y.resume();n=new AudioContext,y=S_(n),t=A_(n);const w=n.createDynamicsCompressor();w.threshold.value=-10,w.ratio.value=4,w.connect(n.destination),e=n.createGain(),e.gain.value=.9,e.connect(w);const S=T=>{const R=n.createGain();return R.gain.value=T,R.connect(e),R};i=S(h?1:0),s=S(h?Kf:0),r=S(f?Wo:0),l=F_(n,r),setInterval(()=>l?.tick(f),500),a=n.createBiquadFilter(),a.type="lowpass",o=n.createGain(),o.gain.value=0,a.connect(o).connect(i)};_();const x=(w,S)=>{t&&i&&t.play(w,i,S)},M=(w,S)=>{if(!n||!t||!s||!r||!h)return;const T=n.currentTime;if(T<p&&S<=v)return;const R=t.get(w);R&&(m?.stop(),m=t.play(w,s),p=T+R.duration,v=S,f&&(r.gain.setTargetAtTime(Wo*G_,T,.05),r.gain.setTargetAtTime(Wo,T+R.duration,.3)))},b=w=>1+(Math.random()*2-1)*w;return{update(w,S,T){if(!n||!t||!o||!a)return;!c&&t.get("wind-loop")&&(c=t.play("wind-loop",a,{loop:!0})),l?.tick(f);const R=n.currentTime;c&&c.playbackRate.setTargetAtTime(.85+.35*w,R,.2),a.frequency.setTargetAtTime(900+6e3*w,R,.15),o.gain.setTargetAtTime(S?.35+1.1*w*w:.2,R,.25);const A=N0(T);S&&A>g&&A%3&&M(A%3===1?"chang-vang":"dem-hoi",1),g=S?Math.max(g,A):0},events(w,S){for(const T of w)if(T.type==="lantern"){const R=qf[(T.streak-1)%qf.length];x("lantern-chime",{vol:.55,rate:Math.pow(2,R/12)}),T.streak===10&&M("den-troi-chuoi",1)}else if(T.type==="near-miss")x("near-miss",{vol:.8,rate:b(.08)*(1+.02*Math.min(10,T.combo))}),T.combo===3?M("suot-dep",1):T.combo===6&&M("qua-dinh",1);else if(T.type==="lane")x("lane-whoosh",{vol:.25,rate:b(.1),pan:.5*T.dir});else if(T.type==="vert")x(T.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:b(.05)});else if(T.type==="gust")x("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(T.chain-1))/12)}),T.full&&x("thermal-boost",{vol:.7});else if(T.type==="booster"){const[R,A,P]=T.kind==="thermal"?["thermal-boost",.8,"luong-nhiet"]:T.kind==="smoke"?["smoke-hiss",.75,null]:["shield-pickup",1.4,"du-du-phong"];x(R,{vol:A}),P&&M(P,2)}else T.type==="hurt"?x("shield-hit",{vol:1.2,rate:b(.05)}):T.type==="crash"?x("crash",{vol:1.3}):T.type==="section"&&S&&!T.open&&!le.zoneNames&&M("khe-da",1)},reveal(){x("reveal-stinger",{vol:.6}),le.zoneNames||M("thung-lung",1)},zone(w){const S=V_[w];S&&M(S,1)},runStart(){_(),x("run-start",{vol:.8}),M("cat-canh",2)},over(w){x("game-over",{vol:.5}),M(w?"ky-luc":"ha-canh",3)},toggleSfx(){return _(),h=!h,i&&s&&n&&(i.gain.setTargetAtTime(h?1:0,n.currentTime,.05),s.gain.setTargetAtTime(h?Kf:0,n.currentTime,.05)),d(),h},toggleMusic(){return _(),f=!f,r&&n&&(r.gain.cancelScheduledValues(n.currentTime),r.gain.setTargetAtTime(f?Wo:0,n.currentTime,.3)),d(),f},prefs:()=>({sfx:h,music:f}),justUnlocked:()=>y?.justWoke()??!1,music:()=>l}}function wn(n){for(const t of["touchstart","touchend","touchmove","pointerdown"])n.addEventListener(t,e=>e.stopPropagation(),{passive:!0});n.addEventListener("mousedown",t=>{t.stopPropagation(),t.target instanceof Element&&t.target.closest('button, [role="button"]')&&(t.preventDefault(),window.focus())})}const ie=n=>`<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`,ke='fill="currentColor" fill-opacity=".28"',Et={lantern:'<svg class="ui-ic ui-ic-lantern" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ic-lan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3121b"/><stop offset=".55" stop-color="#ff7329"/><stop offset="1" stop-color="#ffc45a"/></linearGradient></defs><path d="M7.2 2.8h9.6l1.7 3.4c.9 1.9 1.5 4 1.5 6.1 0 3.2-1.6 5.7-3.9 6.9H7.9C5.6 18 4 15.5 4 12.3c0-2.1.6-4.2 1.5-6.1z" fill="url(#ic-lan)" stroke="#4a1006" stroke-width="1.1"/><path d="M9.4 3.2 8.6 18.8M14.6 3.2l.8 15.6M12 2.9v16" stroke="#6e1f0a" stroke-width=".8" opacity=".55" fill="none"/><ellipse cx="12" cy="19.3" rx="4.3" ry="1.15" fill="#2e0a04"/><path d="M12 22.4c-1.2-.8-1.5-2-.6-3.2.1.8.6 1.1 1 1.2.2-.6.1-1.3-.3-1.9 1.5.7 2.1 2.2 1.4 3.9z" fill="#fff0a0" stroke="#ff9a2a" stroke-width=".5"/></svg>',heart:'<svg class="ui-ic ui-ic-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="whole" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/><path class="half l" d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/><path class="half r" d="M12 21s7.5-4.6 9.6-9.4c1.5-3.5-.6-7.1-4.2-7.1-2.1 0-3.6 1.2-5.4 3.1l-1.3 3.1 1.9 2.4-1.2 3.2L12 21z" fill="currentColor"/></svg>',trophy:ie(`<path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" ${ke}/><path d="M7 5.5H4.3a2.7 2.7 0 0 0 3.1 4.2M17 5.5h2.7a2.7 2.7 0 0 1-3.1 4.2M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>`),lock:ie(`<rect x="5" y="10.5" width="14" height="10" rx="2.2" ${ke}/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17"/>`),gear:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',speaker:ie('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16.5 9.5l5 5m0-5-5 5"/>'),note:ie('<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16"/>'),pause:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',play:'<svg class="ui-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.8v14.4L19.5 12z" fill="currentColor"/></svg>',help:ie('<path d="M8.8 8.8a3.3 3.3 0 1 1 4.5 3.1c-.8.3-1.3 1-1.3 1.9v.7"/><circle cx="12" cy="18.3" r=".9" fill="currentColor" stroke="none"/>'),close:ie('<path d="M6 6l12 12M18 6 6 18"/>'),mountain:ie(`<path d="M2.5 19.5 9 8l3.5 6 2-3 7 8.5z" ${ke}/><path d="M7.3 11 9 12.5l1.7-1.6"/>`),route:ie('<path d="M4 18.5c4-1 5-6.5 9-7.5s5-4 6.5-6.5" stroke-dasharray=".1 3.6"/><circle cx="4" cy="18.5" r="1.9" fill="currentColor"/><path d="M16 4h4v4"/>'),star:ie(`<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" ${ke}/>`),wind:ie('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),thermal:ie('<path d="M8 21c-2-3 2-5 0-8s2-5 0-8M16 21c-2-3 2-5 0-8s2-5 0-8"/><path d="M5.5 7 8 4.5 10.5 7M13.5 7 16 4.5 18.5 7"/>'),parachute:ie(`<path d="M3 11a9 7 0 0 1 18 0z" ${ke}/><path d="M3 11l9 9 9-9M9 11l3 9 3-9"/>`),users:ie('<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.3 6-5.3s5.4 1.9 6 5.3M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.8 14.6c1.7.8 2.9 2.5 3.2 4.9"/>'),crown:ie(`<path d="M3.5 8l4 4 4.5-6 4.5 6 4-4-1.8 10H5.3z" ${ke}/>`),wingsuit:ie(`<path d="M12 3.5c-3.6 3.6-7.3 5.2-9.5 5.8 2.9 1.1 5.8 1.4 7.9 3.6L12 20.5l1.6-7.6c2.1-2.2 5-2.5 7.9-3.6-2.2-.6-5.9-2.2-9.5-5.8z" ${ke}/>`),sun:ie(`<circle cx="12" cy="12" r="4" ${ke}/><path d="M12 2.5V5M12 19v2.5M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12H5M19 12h2.5M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>`),moon:ie(`<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" ${ke}/>`),home:ie(`<path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" ${ke}/>`),rotate:ie('<rect x="3" y="7" width="18" height="10" rx="2.2"/><path d="M16.5 3.5a7 7 0 0 1 4 3M21 3v3.6h-3.6"/>'),chevronDown:ie('<path d="M6 9l6 6 6-6"/>'),chevronRight:ie('<path d="M9 6l6 6-6 6"/>'),check:ie('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),dragSide:ie(`<circle cx="12" cy="12" r="3.2" ${ke}/><path d="M7.5 12H2.5M5 9.5 2.5 12 5 14.5M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5"/>`),swipeUp:ie(`<circle cx="12" cy="17.5" r="3.2" ${ke}/><path d="M12 13.5V3.5M8 7.5l4-4 4 4"/>`),swipeDown:ie(`<circle cx="12" cy="6.5" r="3.2" ${ke}/><path d="M12 10.5v10M8 16.5l4 4 4-4"/>`),tap:ie('<circle cx="12" cy="12" r="3.2" fill="currentColor" fill-opacity=".45"/><circle cx="12" cy="12" r="7.5" stroke-opacity=".55"/>'),pillar:ie(`<path d="M9 21V6.5l1.5-3h3L15 6.5V21" ${ke}/><path d="M3 21h18"/>`),spike:ie(`<path d="M3.5 20 10 7l2.5 4L15 6l5.5 14z" ${ke}/>`),ridge:ie(`<path d="M2 20v-7l4-4 3 3 3-5 3 4 3-2 4 4v7z" ${ke}/>`),bridge:ie('<path d="M2 6c5 6 15 6 20 0M5 9.2V20M19 9.2V20M2 20h20M9 10.7v3M12 11v3M15 10.7v3"/>'),overhang:ie(`<path d="M2 4h20v4l-4 3-3-2-3 4-3-3-3 2-4-2z" ${ke}/><path d="M4 20h16"/>`),house:ie(`<path d="M3 11 12 4l9 7" /><path d="M5.5 9.5V20h13V9.5" ${ke}/>`),gorge:ie(`<path d="M2.5 21V3.5l4 4.5 2 13zM21.5 21V5l-3.5 3-2.5 13z" ${ke}/><path d="M12 5v2.5M12 11v2.5M12 17v2.5"/>`),dive:ie(`<path d="M2.5 4.5h8V21h-8z" ${ke}/><path d="M15.5 4v14.5M12 15l3.5 3.5L19 15"/>`),river:ie('<path d="M2 8.5q2.5-2.2 5 0t5 0 5 0 5 0M2 15q2.5-2.2 5 0t5 0 5 0 5 0"/>'),cave:ie(`<path d="M2 20.5V12a10 8.5 0 0 1 20 0v8.5z" ${ke}/><path d="M7.5 20.5V16a4.5 4.5 0 0 1 9 0v4.5"/>`),terrace:ie('<path d="M2.5 20h19M4 16c4.5-1.6 11.5-1.6 16 0M6 12c3.5-1.4 8.5-1.4 12 0M8.5 8c2.2-1 4.8-1 7 0"/>'),cloud:ie(`<path d="M6.5 18.5a4 4 0 0 1-.6-7.95A6 6 0 0 1 17.4 9a4.75 4.75 0 0 1 .6 9.5z" ${ke}/>`)},X_=3*6e4,I0=/assets\/index-([\w-]+)\.js/,Yf=[...document.scripts].map(n=>I0.exec(n.src)?.[1]).find(Boolean)??null;function $_(n){const t=document.createElement("button");t.type="button",t.className="ui-chip gold build-note",t.hidden=!0,t.innerHTML=`${Et.rotate}<span>Có bản mới · Tải lại</span>`,t.addEventListener("click",o=>{o.stopPropagation(),location.reload()}),wn(t),n.appendChild(t);let e=!1,i=performance.now(),s=!1;const r=async()=>{s=!0;try{const o=await fetch(new URL("./",location.href),{cache:"no-store",redirect:"manual"}),a=o.ok?I0.exec(await o.text())?.[1]:void 0;e=!!a&&a!==Yf}catch{}s=!1};return{setScreen(o){t.hidden=!e||!o,!(!Yf||e||s||!o||performance.now()-i<X_)&&(i=performance.now(),r())}}}const Eh="186",q_=0,Zf=1,K_=2,Fa=1,Y_=2,Wr=3,Di=0,nn=1,Ee=2,li=0,jr=1,xn=2,Jf=3,Qf=4,Z_=5,Zs=100,J_=101,Q_=102,j_=103,tM=104,eM=200,nM=201,iM=202,sM=203,D0=204,U0=205,rM=206,oM=207,aM=208,cM=209,lM=210,uM=211,hM=212,fM=213,dM=214,hu=0,fu=1,du=2,uo=3,pu=4,mu=5,gu=6,vu=7,Ah=0,pM=1,mM=2,ui=0,Rh=1,Ch=2,Ph=3,vc=4,Lh=5,Nh=6,Ih=7,jf="attached",gM="detached",k0=300,Ss=301,or=302,Hc=303,Vc=304,xc=306,ar=1e3,oi=1001,ec=1002,qe=1003,F0=1004,Xr=1005,Ke=1006,Oa=1007,Ei=1008,Sn=1009,O0=1010,B0=1011,ho=1012,Dh=1013,fi=1014,Ln=1015,vn=1016,Uh=1017,kh=1018,fo=1020,z0=35902,H0=35899,V0=1021,G0=1022,Nn=1023,Ui=1026,vs=1027,Fh=1028,Oh=1029,ws=1030,Bh=1031,zh=1033,Ba=33776,za=33777,Ha=33778,Va=33779,xu=35840,_u=35841,Mu=35842,yu=35843,bu=36196,Su=37492,wu=37496,Tu=37488,Eu=37489,nc=37490,Au=37491,Ru=37808,Cu=37809,Pu=37810,Lu=37811,Nu=37812,Iu=37813,Du=37814,Uu=37815,ku=37816,Fu=37817,Ou=37818,Bu=37819,zu=37820,Hu=37821,Vu=36492,Gu=36494,Wu=36495,Xu=36283,$u=36284,ic=36285,qu=36286,po=2300,mo=2301,Gc=2302,td=2303,ed=2400,nd=2401,id=2402,vM=2500,xM=0,W0=1,Ku=2,_M=3200,sc=0,MM=1,ji="",Xe="srgb",Tn="srgb-linear",rc="linear",pe="srgb",Wc=7680,yM=519,bM=512,SM=513,wM=514,Hh=515,TM=516,EM=517,Vh=518,AM=519,X0=35044,sd=35048,rd="300 es",ai=2e3,go=2001;function RM(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function CM(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function vo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function PM(){const n=vo("canvas");return n.style.display="block",n}const od={};function oc(...n){const t="THREE."+n.shift();console.log(t,...n)}function $0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Dt(...n){n=$0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Wt(...n){n=$0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function tr(...n){const t=n.join(" ");t in od||(od[t]=!0,Dt(...n))}function LM(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const NM={[hu]:fu,[du]:gu,[pu]:vu,[uo]:mu,[fu]:hu,[gu]:du,[vu]:pu,[mu]:uo};class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ad=1234567;const to=Math.PI/180,cr=180/Math.PI;function In(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function ee(n,t,e){return Math.max(t,Math.min(e,n))}function Gh(n,t){return(n%t+t)%t}function IM(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function DM(n,t,e){return n!==t?(e-n)/(t-n):0}function eo(n,t,e){return(1-e)*n+e*t}function UM(n,t,e,i){return eo(n,t,1-Math.exp(-e*i))}function kM(n,t=1){return t-Math.abs(Gh(n,t*2)-t)}function FM(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function OM(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function BM(n,t){return n+Math.floor(Math.random()*(t-n+1))}function zM(n,t){return n+Math.random()*(t-n)}function HM(n){return n*(.5-Math.random())}function VM(n){n!==void 0&&(ad=n);let t=ad+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function GM(n){return n*to}function WM(n){return n*cr}function XM(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function $M(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function qM(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function KM(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),p=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*h,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*h,a*l);break;case"ZXZ":n.set(c*h,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*p,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*p,a*l);break;case"ZYZ":n.set(c*p,c*d,a*u,a*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const YM={DEG2RAD:to,RAD2DEG:cr,generateUUID:In,clamp:ee,euclideanModulo:Gh,mapLinear:IM,inverseLerp:DM,lerp:eo,damp:UM,pingpong:kM,smoothstep:FM,smootherstep:OM,randInt:BM,randFloat:zM,randFloatSpread:HM,seededRandom:VM,degToRad:GM,radToDeg:WM,isPowerOfTwo:XM,ceilPowerOfTwo:$M,floorPowerOfTwo:qM,setQuaternionFromProperEuler:KM,normalize:xe,denormalize:Wn};class ot{static{ot.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ce{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],h=i[s+3],f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(h!==v||c!==f||l!==d||u!==p){let m=c*f+l*d+u*p+h*v;m<0&&(f=-f,d=-d,p=-p,v=-v,m=-m);let g=1-a;if(m<.9995){const y=Math.acos(m),_=Math.sin(y);g=Math.sin(g*y)/_,a=Math.sin(a*y)/_,c=c*g+f*a,l=l*g+d*a,u=u*g+p*a,h=h*g+v*a}else{c=c*g+f*a,l=l*g+d*a,u=u*g+p*a,h=h*g+v*a;const y=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=y,l*=y,u*=y,h*=y}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+u*h+c*d-l*f,t[e+1]=c*p+u*f+l*h-a*d,t[e+2]=l*p+u*d+a*f-c*h,t[e+3]=u*p-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),h=a(r/2),f=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h+f*d*p;break;case"YZX":this._x=f*u*h+l*d*p,this._y=l*d*h+f*u*p,this._z=l*u*p-f*d*h,this._w=l*u*h-f*d*p;break;case"XZY":this._x=f*u*h-l*d*p,this._y=l*d*h-f*u*p,this._z=l*u*p+f*d*h,this._w=l*u*h+f*d*p;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{static{N.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cd.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+c*l+o*h-a*u,this.y=i+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xc.copy(this).projectOnVector(t),this.sub(Xc)}reflect(t){return this.sub(Xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xc=new N,cd=new Ce;class Kt{static{Kt.prototype.isMatrix3=!0}constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],d=i[5],p=i[8],v=s[0],m=s[3],g=s[6],y=s[1],_=s[4],x=s[7],M=s[2],b=s[5],w=s[8];return r[0]=o*v+a*y+c*M,r[3]=o*m+a*_+c*b,r[6]=o*g+a*x+c*w,r[1]=l*v+u*y+h*M,r[4]=l*m+u*_+h*b,r[7]=l*g+u*x+h*w,r[2]=f*v+d*y+p*M,r[5]=f*m+d*_+p*b,r[8]=f*g+d*x+p*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,p=e*h+i*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=h*v,t[1]=(s*l-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return tr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($c.makeScale(t,e)),this}rotate(t){return tr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($c.makeRotation(-t)),this}translate(t,e){return tr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($c.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $c=new Kt,ld=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ud=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ZM(){const n={enabled:!0,workingColorSpace:Tn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(s.r=er(s.r),s.g=er(s.g),s.b=er(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ji?rc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return tr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return tr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Tn]:{primaries:t,whitePoint:i,transfer:rc,toXYZ:ld,fromXYZ:ud,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Xe},outputColorSpaceConfig:{drawingBufferColorSpace:Xe}},[Xe]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:ld,fromXYZ:ud,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Xe}}}),n}const se=ZM();function Ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function er(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ps;class JM{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ps===void 0&&(Ps=vo("canvas")),Ps.width=t.width,Ps.height=t.height;const s=Ps.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ps}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=vo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ni(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ni(e[i]/255)*255):e[i]=Ni(e[i]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let QM=0;class Wh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:QM++}),this.uuid=In(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(qc(s[o].image)):r.push(qc(s[o]))}else r=qc(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function qc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?JM.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let jM=0;const Kc=new N;class Ye extends Es{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,i=oi,s=oi,r=Ke,o=Ei,a=Nn,c=Sn,l=Ye.DEFAULT_ANISOTROPY,u=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jM++}),this.uuid=In(),this.name="",this.source=new Wh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kc).x}get height(){return this.source.getSize(Kc).y}get depth(){return this.source.getSize(Kc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==k0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ar:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case ec:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ar:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case ec:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=k0;Ye.DEFAULT_ANISOTROPY=1;class me{static{me.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],p=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(p+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(l+1)/2,x=(d+1)/2,M=(g+1)/2,b=(u+f)/4,w=(h+v)/4,S=(p+m)/4;return _>x&&_>M?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=b/i,r=w/i):x>M?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=b/s,r=S/s):M<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),i=w/r,s=S/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-p)*(m-p)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(h-v)/y,this.z=(f-u)/y,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class t1 extends Es{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ye(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Wh(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends t1{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class q0 extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class e1 extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Bt{static{Bt.prototype.isMatrix4=!0}constructor(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,m)}set(t,e,i,s,r,o,a,c,l,u,h,f,d,p,v,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=u,g[10]=h,g[14]=f,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Ls.setFromMatrixColumn(t,0).length(),r=1/Ls.setFromMatrixColumn(t,1).length(),o=1/Ls.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,p=a*u,v=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+p*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,p=l*u,v=l*h;e[0]=f+v*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-p,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,p=l*u,v=l*h;e[0]=f-v*a,e[4]=-o*h,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,p=a*u,v=a*h;e[0]=c*u,e[4]=p*l-d,e[8]=f*l+v,e[1]=c*h,e[5]=v*l+f,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=v-f*h,e[8]=p*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+p,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+v,e[5]=o*u,e[9]=d*h-p,e[2]=p*h-d,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(n1,t,i1)}lookAt(t,e,i){const s=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Hi.crossVectors(i,Mn),Hi.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Hi.crossVectors(i,Mn)),Hi.normalize(),Xo.crossVectors(Mn,Hi),s[0]=Hi.x,s[4]=Xo.x,s[8]=Mn.x,s[1]=Hi.y,s[5]=Xo.y,s[9]=Mn.y,s[2]=Hi.z,s[6]=Xo.z,s[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],d=i[13],p=i[2],v=i[6],m=i[10],g=i[14],y=i[3],_=i[7],x=i[11],M=i[15],b=s[0],w=s[4],S=s[8],T=s[12],R=s[1],A=s[5],P=s[9],I=s[13],L=s[2],O=s[6],B=s[10],X=s[14],J=s[3],H=s[7],$=s[11],j=s[15];return r[0]=o*b+a*R+c*L+l*J,r[4]=o*w+a*A+c*O+l*H,r[8]=o*S+a*P+c*B+l*$,r[12]=o*T+a*I+c*X+l*j,r[1]=u*b+h*R+f*L+d*J,r[5]=u*w+h*A+f*O+d*H,r[9]=u*S+h*P+f*B+d*$,r[13]=u*T+h*I+f*X+d*j,r[2]=p*b+v*R+m*L+g*J,r[6]=p*w+v*A+m*O+g*H,r[10]=p*S+v*P+m*B+g*$,r[14]=p*T+v*I+m*X+g*j,r[3]=y*b+_*R+x*L+M*J,r[7]=y*w+_*A+x*O+M*H,r[11]=y*S+_*P+x*B+M*$,r[15]=y*T+_*I+x*X+M*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],p=t[3],v=t[7],m=t[11],g=t[15],y=c*d-l*f,_=a*d-l*h,x=a*f-c*h,M=o*d-l*u,b=o*f-c*u,w=o*h-a*u;return e*(v*y-m*_+g*x)-i*(p*y-m*M+g*b)+s*(p*_-v*M+g*w)-r*(p*x-v*b+m*w)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],p=t[12],v=t[13],m=t[14],g=t[15],y=e*a-i*o,_=e*c-s*o,x=e*l-r*o,M=i*c-s*a,b=i*l-r*a,w=s*l-r*c,S=u*v-h*p,T=u*m-f*p,R=u*g-d*p,A=h*m-f*v,P=h*g-d*v,I=f*g-d*m,L=y*I-_*P+x*A+M*R-b*T+w*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/L;return t[0]=(a*I-c*P+l*A)*O,t[1]=(s*P-i*I-r*A)*O,t[2]=(v*w-m*b+g*M)*O,t[3]=(f*b-h*w-d*M)*O,t[4]=(c*R-o*I-l*T)*O,t[5]=(e*I-s*R+r*T)*O,t[6]=(m*x-p*w-g*_)*O,t[7]=(u*w-f*x+d*_)*O,t[8]=(o*P-a*R+l*S)*O,t[9]=(i*R-e*P-r*S)*O,t[10]=(p*b-v*x+g*y)*O,t[11]=(h*x-u*b-d*y)*O,t[12]=(a*T-o*A-c*S)*O,t[13]=(e*A-i*T+s*S)*O,t[14]=(v*_-p*M-m*y)*O,t[15]=(u*M-h*_+f*y)*O,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,p=r*h,v=o*u,m=o*h,g=a*h,y=c*l,_=c*u,x=c*h,M=i.x,b=i.y,w=i.z;return s[0]=(1-(v+g))*M,s[1]=(d+x)*M,s[2]=(p-_)*M,s[3]=0,s[4]=(d-x)*b,s[5]=(1-(f+g))*b,s[6]=(m+y)*b,s[7]=0,s[8]=(p+_)*w,s[9]=(m-y)*w,s[10]=(1-(f+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Ls.set(s[0],s[1],s[2]).length();const a=Ls.set(s[4],s[5],s[6]).length(),c=Ls.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Fn.copy(this);const l=1/o,u=1/a,h=1/c;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=u,Fn.elements[5]*=u,Fn.elements[6]*=u,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,e.setFromRotationMatrix(Fn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=ai,c=!1){const l=this.elements,u=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let p,v;if(c)p=r/(o-r),v=o*r/(o-r);else if(a===ai)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===go)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ai,c=!1){const l=this.elements,u=2/(e-t),h=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let p,v;if(c)p=1/(o-r),v=o/(o-r);else if(a===ai)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===go)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ls=new N,Fn=new Bt,n1=new N(0,0,0),i1=new N(1,1,1),Hi=new N,Xo=new N,Mn=new N,hd=new Bt,fd=new Ce;class di{constructor(t=0,e=0,i=0,s=di.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return hd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fd.setFromEuler(this),this.setFromQuaternion(fd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class K0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let s1=0;const dd=new N,Ns=new Ce,vi=new Bt,$o=new N,Sr=new N,r1=new N,o1=new Ce,pd=new N(1,0,0),md=new N(0,1,0),gd=new N(0,0,1),vd={type:"added"},a1={type:"removed"},Is={type:"childadded",child:null},Yc={type:"childremoved",child:null};class Ie extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s1++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new N,e=new di,i=new Ce,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Bt},normalMatrix:{value:new Kt}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new K0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ns.setFromAxisAngle(t,e),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(t,e){return Ns.setFromAxisAngle(t,e),this.quaternion.premultiply(Ns),this}rotateX(t){return this.rotateOnAxis(pd,t)}rotateY(t){return this.rotateOnAxis(md,t)}rotateZ(t){return this.rotateOnAxis(gd,t)}translateOnAxis(t,e){return dd.copy(t).applyQuaternion(this.quaternion),this.position.add(dd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pd,t)}translateY(t){return this.translateOnAxis(md,t)}translateZ(t){return this.translateOnAxis(gd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?$o.copy(t):$o.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Sr,$o,this.up):vi.lookAt($o,Sr,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Ns.setFromRotationMatrix(vi),this.quaternion.premultiply(Ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Wt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vd),Is.child=t,this.dispatchEvent(Is),Is.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(a1),Yc.child=t,this.dispatchEvent(Yc),Yc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vd),Is.child=t,this.dispatchEvent(Is),Is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,t,r1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,o1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ie.DEFAULT_UP=new N(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Fe extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const c1={type:"move"};class Zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),g=this._getHandJoint(l,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(c1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Fe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Y0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},qo={h:0,s:0,l:0};function Jc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=Gh(t,1),e=ee(e,0,1),i=ee(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Jc(o,r,t+1/3),this.g=Jc(o,r,t),this.b=Jc(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Xe){function i(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Xe){const i=Y0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}copyLinearToSRGB(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xe){return se.workingToColorSpace(an.copy(this),t),Math.round(ee(an.r*255,0,255))*65536+Math.round(ee(an.g*255,0,255))*256+Math.round(ee(an.b*255,0,255))}getHexString(t=Xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(an.copy(this),e);const i=an.r,s=an.g,r=an.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case i:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-i)/h+2;break;case r:c=(i-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(an.copy(this),e),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=Xe){se.workingToColorSpace(an.copy(this),t);const e=an.r,i=an.g,s=an.b;return t!==Xe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(qo);const i=eo(Vi.h,qo.h,e),s=eo(Vi.s,qo.s,e),r=eo(Vi.l,qo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ct;ct.NAMES=Y0;class Xh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new Xh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class l1 extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const On=new N,xi=new N,Qc=new N,_i=new N,Ds=new N,Us=new N,xd=new N,jc=new N,tl=new N,el=new N,nl=new me,il=new me,sl=new me;class Xn{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),On.subVectors(t,e),s.cross(On);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){On.subVectors(s,e),xi.subVectors(i,e),Qc.subVectors(t,e);const o=On.dot(On),a=On.dot(xi),c=On.dot(Qc),l=xi.dot(xi),u=xi.dot(Qc),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,p=(o*u-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return nl.setScalar(0),il.setScalar(0),sl.setScalar(0),nl.fromBufferAttribute(t,e),il.fromBufferAttribute(t,i),sl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(nl,r.x),o.addScaledVector(il,r.y),o.addScaledVector(sl,r.z),o}static isFrontFacing(t,e,i,s){return On.subVectors(i,e),xi.subVectors(t,e),On.cross(xi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return On.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),On.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Xn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ds.subVectors(s,i),Us.subVectors(r,i),jc.subVectors(t,i);const c=Ds.dot(jc),l=Us.dot(jc);if(c<=0&&l<=0)return e.copy(i);tl.subVectors(t,s);const u=Ds.dot(tl),h=Us.dot(tl);if(u>=0&&h<=u)return e.copy(s);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(Ds,o);el.subVectors(t,r);const d=Ds.dot(el),p=Us.dot(el);if(p>=0&&d<=p)return e.copy(r);const v=d*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(i).addScaledVector(Us,a);const m=u*p-d*h;if(m<=0&&h-u>=0&&d-p>=0)return xd.subVectors(r,s),a=(h-u)/(h-u+(d-p)),e.copy(s).addScaledVector(xd,a);const g=1/(m+v+f);return o=v*g,a=f*g,e.copy(i).addScaledVector(Ds,o).addScaledVector(Us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ki{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ko.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ko.copy(i.boundingBox)),Ko.applyMatrix4(t.matrixWorld),this.union(Ko)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wr),Yo.subVectors(this.max,wr),ks.subVectors(t.a,wr),Fs.subVectors(t.b,wr),Os.subVectors(t.c,wr),Gi.subVectors(Fs,ks),Wi.subVectors(Os,Fs),os.subVectors(ks,Os);let e=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-os.z,os.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,os.z,0,-os.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-os.y,os.x,0];return!rl(e,ks,Fs,Os,Yo)||(e=[1,0,0,0,1,0,0,0,1],!rl(e,ks,Fs,Os,Yo))?!1:(Zo.crossVectors(Gi,Wi),e=[Zo.x,Zo.y,Zo.z],rl(e,ks,Fs,Os,Yo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Mi=[new N,new N,new N,new N,new N,new N,new N,new N],Bn=new N,Ko=new ki,ks=new N,Fs=new N,Os=new N,Gi=new N,Wi=new N,os=new N,wr=new N,Yo=new N,Zo=new N,as=new N;function rl(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){as.fromArray(n,r);const a=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),c=t.dot(as),l=e.dot(as),u=i.dot(as);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const He=new N,Jo=new ot;let u1=0;class St extends Es{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:u1++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=X0,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Jo.fromBufferAttribute(this,e),Jo.applyMatrix3(t),this.setXY(e,Jo.x,Jo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix3(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Z0 extends St{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class J0 extends St{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Jt extends St{constructor(t,e,i){super(new Float32Array(t),e,i)}}const h1=new ki,Tr=new N,ol=new N;class Un{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):h1.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Tr.subVectors(t,this.center);const e=Tr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Tr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ol.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Tr.copy(t.center).add(ol)),this.expandByPoint(Tr.copy(t.center).sub(ol))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let f1=0;const An=new Bt,al=new Ie,Bs=new N,yn=new ki,Er=new ki,je=new N;class Yt extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(RM(t)?J0:Z0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,i){return An.makeTranslation(t,e,i),this.applyMatrix4(An),this}scale(t,e,i){return An.makeScale(t,e,i),this.applyMatrix4(An),this}lookAt(t){return al.lookAt(t),al.updateMatrix(),this.applyMatrix4(al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Er.setFromBufferAttribute(a),this.morphTargetsRelative?(je.addVectors(yn.min,Er.min),yn.expandByPoint(je),je.addVectors(yn.max,Er.max),yn.expandByPoint(je)):(yn.expandByPoint(Er.min),yn.expandByPoint(Er.max))}yn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)je.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(je));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)je.fromBufferAttribute(a,l),c&&(Bs.fromBufferAttribute(t,l),je.add(Bs)),s=Math.max(s,i.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new St(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let S=0;S<i.count;S++)a[S]=new N,c[S]=new N;const l=new N,u=new N,h=new N,f=new ot,d=new ot,p=new ot,v=new N,m=new N;function g(S,T,R){l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,R),f.fromBufferAttribute(r,S),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,R),u.sub(l),h.sub(l),d.sub(f),p.sub(f);const A=1/(d.x*p.y-p.x*d.y);isFinite(A)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(A),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(A),a[S].add(v),a[T].add(v),a[R].add(v),c[S].add(m),c[T].add(m),c[R].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let S=0,T=y.length;S<T;++S){const R=y[S],A=R.start,P=R.count;for(let I=A,L=A+P;I<L;I+=3)g(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const _=new N,x=new N,M=new N,b=new N;function w(S){M.fromBufferAttribute(s,S),b.copy(M);const T=a[S];_.copy(T),_.sub(M.multiplyScalar(M.dot(T))).normalize(),x.crossVectors(b,T);const A=x.dot(c[S])<0?-1:1;o.setXYZW(S,_.x,_.y,_.z,A)}for(let S=0,T=y.length;S<T;++S){const R=y[S],A=R.start,P=R.count;for(let I=A,L=A+P;I<L;I+=3)w(t.getX(I+0)),w(t.getX(I+1)),w(t.getX(I+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new St(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,u=new N,h=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,p=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let g=0;g<u;g++)f[p++]=l[d++]}return new St(f,u,h)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Yt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class d1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=X0,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const un=new N;class $h{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)un.fromBufferAttribute(this,e),un.applyMatrix4(t),this.setXYZ(e,un.x,un.y,un.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)un.fromBufferAttribute(this,e),un.applyNormalMatrix(t),this.setXYZ(e,un.x,un.y,un.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)un.fromBufferAttribute(this,e),un.transformDirection(t),this.setXYZ(e,un.x,un.y,un.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Wn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){oc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new St(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new $h(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){oc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const cl=new N,p1=new N,m1=new Kt;class Ji{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=cl.subVectors(i,e).cross(p1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(cl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||m1.getNormalMatrix(t),s=this.coplanarPoint(cl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let g1=0;class Kn extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=In(),this.name="",this.type="Material",this.blending=jr,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=D0,this.blendDst=U0,this.blendEquation=Zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=uo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wc,this.stencilZFail=Wc,this.stencilZPass=Wc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ji().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const yi=new N,ll=new N,Qo=new N,jo=new N;class _c{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ll.copy(t).add(e).multiplyScalar(.5),Qo.copy(e).sub(t).normalize(),jo.copy(this.origin).sub(ll);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Qo),a=jo.dot(this.direction),c=-jo.dot(Qo),l=jo.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*c-a,f=o*a-c,p=r*u,h>=0)if(f>=-p)if(f<=p){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=p?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ll).addScaledVector(Qo,f),d}intersectSphere(t,e){if(t.radius<0)return null;yi.subVectors(t.center,this.origin);const i=yi.dot(this.direction),s=yi.dot(yi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,i,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,h=t.x-o.x,f=t.y-o.y,d=t.z-o.z,p=e.x-o.x,v=e.y-o.y,m=e.z-o.z,g=i.x-o.x,y=i.y-o.y,_=i.z-o.z,x=Math.abs(c),M=Math.abs(l),b=Math.abs(u);let w,S,T,R,A,P,I,L,O,B,X,J;if(x>=M&&x>=b?(T=c,P=h,O=p,J=g,c>=0?(w=l,S=u,R=f,A=d,I=v,L=m,B=y,X=_):(w=u,S=l,R=d,A=f,I=m,L=v,B=_,X=y)):M>=b?(T=l,P=f,O=v,J=y,l>=0?(w=u,S=c,R=d,A=h,I=m,L=p,B=_,X=g):(w=c,S=u,R=h,A=d,I=p,L=m,B=g,X=_)):(T=u,P=d,O=m,J=_,u>=0?(w=c,S=l,R=h,A=f,I=p,L=v,B=g,X=y):(w=l,S=c,R=f,A=h,I=v,L=p,B=y,X=g)),T===0)return null;const H=w/T,$=S/T,j=1/T,vt=R-H*P,gt=A-$*P,Rt=I-H*O,Ft=L-$*O,zt=B-H*J,V=X-$*J,Y=zt*Ft-V*Rt,yt=vt*V-gt*zt,Lt=Rt*gt-Ft*vt;if(s){if(Y<0||yt<0||Lt<0)return null}else if((Y<0||yt<0||Lt<0)&&(Y>0||yt>0||Lt>0))return null;const st=Y+yt+Lt;if(st===0)return null;const Xt=j*(Y*P+yt*O+Lt*J);return(st>0?Xt<0:Xt>0)?null:this.at(Xt/st,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cn extends Kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _d=new Bt,cs=new _c,ta=new Un,Md=new N,ea=new N,na=new N,ia=new N,ul=new N,sa=new N,yd=new N,ra=new N;class $t extends Ie{constructor(t=new Yt,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){sa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(ul.fromBufferAttribute(h,t),o?sa.addScaledVector(ul,u):sa.addScaledVector(ul.sub(e),u))}e.add(sa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(r),cs.copy(t.ray).recast(t.near),!(ta.containsPoint(cs.origin)===!1&&(cs.intersectSphere(ta,Md)===null||cs.origin.distanceToSquared(Md)>(t.far-t.near)**2))&&(_d.copy(r).invert(),cs.copy(t.ray).applyMatrix4(_d),!(i.boundingBox!==null&&cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,cs)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=o[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,M=_;x<M;x+=3){const b=a.getX(x),w=a.getX(x+1),S=a.getX(x+2);s=oa(this,g,t,i,l,u,h,b,w,S),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const y=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);s=oa(this,o,t,i,l,u,h,y,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=o[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,M=_;x<M;x+=3){const b=x,w=x+1,S=x+2;s=oa(this,g,t,i,l,u,h,b,w,S),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const y=m,_=m+1,x=m+2;s=oa(this,o,t,i,l,u,h,y,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function v1(n,t,e,i,s,r,o,a){let c;if(t.side===nn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Di,a),c===null)return null;ra.copy(a),ra.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(ra);return l<e.near||l>e.far?null:{distance:l,point:ra.clone(),object:n}}function oa(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,ea),n.getVertexPosition(c,na),n.getVertexPosition(l,ia);const u=v1(n,t,e,i,ea,na,ia,yd);if(u){const h=new N;Xn.getBarycoord(yd,ea,na,ia,h),s&&(u.uv=Xn.getInterpolatedAttribute(s,a,c,l,h,new ot)),r&&(u.uv1=Xn.getInterpolatedAttribute(r,a,c,l,h,new ot)),o&&(u.normal=Xn.getInterpolatedAttribute(o,a,c,l,h,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new N,materialIndex:0};Xn.getNormal(ea,na,ia,f.normal),u.face=f,u.barycoord=h}return u}const Ar=new me,bd=new me,Sd=new me,x1=new me,wd=new Bt,aa=new N,hl=new Un,Td=new Bt,fl=new _c;class Q0 extends $t{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jf,this.bindMatrix=new Bt,this.bindMatrixInverse=new Bt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ki),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,aa),this.boundingBox.expandByPoint(aa)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,aa),this.boundingSphere.expandByPoint(aa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hl.copy(this.boundingSphere),hl.applyMatrix4(s),t.ray.intersectsSphere(hl)!==!1&&(Td.copy(s).invert(),fl.copy(t.ray).applyMatrix4(Td),!(this.boundingBox!==null&&fl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,fl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new me,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===jf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===gM?this.bindMatrixInverse.copy(this.bindMatrix).invert():Dt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;bd.fromBufferAttribute(s.attributes.skinIndex,t),Sd.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(Ar.copy(e),e.set(0,0,0,0)):(Ar.set(...e,1),e.set(0,0,0)),Ar.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=Sd.getComponent(r);if(o!==0){const a=bd.getComponent(r);wd.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(x1.copy(Ar).applyMatrix4(wd),o)}}return e.isVector4&&(e.w=Ar.w),e.applyMatrix4(this.bindMatrixInverse)}}class j0 extends Ie{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qh extends Ye{constructor(t=null,e=1,i=1,s,r,o,a,c,l=qe,u=qe,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ed=new Bt,_1=new Bt;class Kh{constructor(t=[],e=[]){this.uuid=In(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Dt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Bt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const i=new Bt;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:_1;Ed.multiplyMatrices(a,e[r]),Ed.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Kh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new qh(e,t,t,Nn,Ln);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const r=t.bones[i];let o=e[r];o===void 0&&(Dt("Skeleton: No bone found with UUID:",r),o=new j0),this.bones.push(o),this.boneInverses.push(new Bt().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=i[s];t.boneInverses.push(a.toArray())}return t}}class xo extends St{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zs=new Bt,Ad=new Bt,ca=[],Rd=new ki,M1=new Bt,Rr=new $t,Cr=new Un;class Ve extends $t{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new xo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,M1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ki),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zs),Rd.copy(t.boundingBox).applyMatrix4(zs),this.boundingBox.union(Rd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,zs),Cr.copy(t.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(Cr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(i),t.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zs),Ad.multiplyMatrices(i,zs),Rr.matrixWorld=Ad,Rr.raycast(t,ca);for(let o=0,a=ca.length;o<a;o++){const c=ca[o];c.instanceId=r,c.object=this,e.push(c)}ca.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new xo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new qh(new Float32Array(s*this.count),s,this.count,Fh,Ln));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ls=new Un,y1=new ot(.5,.5),la=new N;class Do{constructor(t=new Ji,e=new Ji,i=new Ji,s=new Ji,r=new Ji,o=new Ji){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ai,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],v=r[9],m=r[10],g=r[11],y=r[12],_=r[13],x=r[14],M=r[15];if(s[0].setComponents(l-o,d-u,g-p,M-y).normalize(),s[1].setComponents(l+o,d+u,g+p,M+y).normalize(),s[2].setComponents(l+a,d+h,g+v,M+_).normalize(),s[3].setComponents(l-a,d-h,g-v,M-_).normalize(),i)s[4].setComponents(c,f,m,x).normalize(),s[5].setComponents(l-c,d-f,g-m,M-x).normalize();else if(s[4].setComponents(l-c,d-f,g-m,M-x).normalize(),e===ai)s[5].setComponents(l+c,d+f,g+m,M+x).normalize();else if(e===go)s[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){ls.center.set(0,0,0);const e=y1.distanceTo(t.center);return ls.radius=.7071067811865476+e,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(la.x=s.normal.x>0?t.max.x:t.min.x,la.y=s.normal.y>0?t.max.y:t.min.y,la.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(la)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yh extends Kn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ac=new N,cc=new N,Cd=new Bt,Pr=new _c,ua=new Un,dl=new N,Pd=new N;class Zh extends Ie{constructor(t=new Yt,e=new Yh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ac.fromBufferAttribute(e,s-1),cc.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ac.distanceTo(cc);t.setAttribute("lineDistance",new Jt(i,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(s),ua.radius+=r,t.ray.intersectsSphere(ua)===!1)return;Cd.copy(s).invert(),Pr.copy(t.ray).applyMatrix4(Cd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=l){const g=u.getX(v),y=u.getX(v+1),_=ha(this,t,Pr,c,g,y,v);_&&e.push(_)}if(this.isLineLoop){const v=u.getX(p-1),m=u.getX(d),g=ha(this,t,Pr,c,v,m,p-1);g&&e.push(g)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=l){const g=ha(this,t,Pr,c,v,v+1,v);g&&e.push(g)}if(this.isLineLoop){const v=ha(this,t,Pr,c,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ha(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(ac.fromBufferAttribute(a,s),cc.fromBufferAttribute(a,r),e.distanceSqToSegment(ac,cc,dl,Pd)>i)return;dl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(dl);if(!(l<t.near||l>t.far))return{distance:l,point:Pd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Ld=new N,Nd=new N;class tg extends Zh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Ld.fromBufferAttribute(e,s),Nd.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ld.distanceTo(Nd);t.setAttribute("lineDistance",new Jt(i,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class b1 extends Zh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class eg extends Kn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Id=new Bt,Yu=new _c,fa=new Un,da=new N;class lc extends Ie{constructor(t=new Yt,e=new eg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,t.ray.intersectsSphere(fa)===!1)return;Id.copy(s).invert(),Yu.copy(t.ray).applyMatrix4(Id);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,h=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=f,v=d;p<v;p++){const m=l.getX(p);da.fromBufferAttribute(h,m),Dd(da,m,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++)da.fromBufferAttribute(h,p),Dd(da,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Dd(n,t,e,i,s,r,o){const a=Yu.distanceSqToPoint(n);if(a<e){const c=new N;Yu.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ng extends Ye{constructor(t=[],e=Ss,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Jh extends Ye{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _o extends Ye{constructor(t,e,i=fi,s,r,o,a=qe,c=qe,l,u=Ui,h=1){if(u!==Ui&&u!==vs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class S1 extends _o{constructor(t,e=fi,i=Ss,s,r,o=qe,a=qe,c,l=Ui){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class ig extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Vt extends Yt{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(h,2));function p(v,m,g,y,_,x,M,b,w,S,T){const R=x/w,A=M/S,P=x/2,I=M/2,L=b/2,O=w+1,B=S+1;let X=0,J=0;const H=new N;for(let $=0;$<B;$++){const j=$*A-I;for(let vt=0;vt<O;vt++){const gt=vt*R-P;H[v]=gt*y,H[m]=j*_,H[g]=L,l.push(H.x,H.y,H.z),H[v]=0,H[m]=0,H[g]=b>0?1:-1,u.push(H.x,H.y,H.z),h.push(vt/w),h.push(1-$/S),X+=1}}for(let $=0;$<S;$++)for(let j=0;j<w;j++){const vt=f+j+O*$,gt=f+j+O*($+1),Rt=f+(j+1)+O*($+1),Ft=f+(j+1)+O*$;c.push(vt,gt,Ft),c.push(gt,Rt,Ft),J+=6}a.addGroup(d,J,T),d+=J,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Qh extends Yt{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=e/2,h=Math.PI/2*t,f=e,d=2*h+f,p=i*2+r,v=s+1,m=new N,g=new N;for(let y=0;y<=p;y++){let _=0,x=0,M=0,b=0;if(y<=i){const T=y/i,R=T*Math.PI/2;x=-u-t*Math.cos(R),M=t*Math.sin(R),b=-t*Math.cos(R),_=T*h}else if(y<=i+r){const T=(y-i)/r;x=-u+T*e,M=t,b=0,_=h+T*f}else{const T=(y-i-r)/i,R=T*Math.PI/2;x=u+t*Math.sin(R),M=t*Math.cos(R),b=t*Math.sin(R),_=h+f+T*h}const w=Math.max(0,Math.min(1,_/d));let S=0;y===0?S=.5/s:y===p&&(S=-.5/s);for(let T=0;T<=s;T++){const R=T/s,A=R*Math.PI*2,P=Math.sin(A),I=Math.cos(A);g.x=-M*I,g.y=x,g.z=M*P,a.push(g.x,g.y,g.z),m.set(-M*I,b,M*P),m.normalize(),c.push(m.x,m.y,m.z),l.push(R+S,w)}if(y>0){const T=(y-1)*v;for(let R=0;R<s;R++){const A=T+R,P=T+R+1,I=y*v+R,L=y*v+R+1;o.push(A,P,I),o.push(P,L,I)}}}this.setIndex(o),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qh(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class en extends Yt{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const v=[],m=i/2;let g=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(f,3)),this.setAttribute("uv",new Jt(d,2));function y(){const x=new N,M=new N;let b=0;const w=(e-t)/i;for(let S=0;S<=r;S++){const T=[],R=S/r,A=R*(e-t)+t;for(let P=0;P<=s;P++){const I=P/s,L=I*c+a,O=Math.sin(L),B=Math.cos(L);M.x=A*O,M.y=-R*i+m,M.z=A*B,h.push(M.x,M.y,M.z),x.set(O,w,B).normalize(),f.push(x.x,x.y,x.z),d.push(I,1-R),T.push(p++)}v.push(T)}for(let S=0;S<s;S++)for(let T=0;T<r;T++){const R=v[T][S],A=v[T+1][S],P=v[T+1][S+1],I=v[T][S+1];(t>0||T!==0)&&(u.push(R,A,I),b+=3),(e>0||T!==r-1)&&(u.push(A,P,I),b+=3)}l.addGroup(g,b,0),g+=b}function _(x){const M=p,b=new ot,w=new N;let S=0;const T=x===!0?t:e,R=x===!0?1:-1;for(let P=1;P<=s;P++)h.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),p++;const A=p;for(let P=0;P<=s;P++){const L=P/s*c+a,O=Math.cos(L),B=Math.sin(L);w.x=T*B,w.y=m*R,w.z=T*O,h.push(w.x,w.y,w.z),f.push(0,R,0),b.x=O*.5+.5,b.y=B*.5*R+.5,d.push(b.x,b.y),p++}for(let P=0;P<s;P++){const I=M+P,L=A+P;x===!0?u.push(L,L+1,I):u.push(L+1,L,I),S+=3}l.addGroup(g,S,x===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new en(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Uo extends en{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Uo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jh extends Yt{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new N,x=new N,M=new N;for(let b=0;b<e.length;b+=3)d(e[b+0],_),d(e[b+1],x),d(e[b+2],M),c(_,x,M,y)}function c(y,_,x,M){const b=M+1,w=[];for(let S=0;S<=b;S++){w[S]=[];const T=y.clone().lerp(x,S/b),R=_.clone().lerp(x,S/b),A=b-S;for(let P=0;P<=A;P++)P===0&&S===b?w[S][P]=T:w[S][P]=T.clone().lerp(R,P/A)}for(let S=0;S<b;S++)for(let T=0;T<2*(b-S)-1;T++){const R=Math.floor(T/2);T%2===0?(f(w[S][R+1]),f(w[S+1][R]),f(w[S][R])):(f(w[S][R+1]),f(w[S+1][R+1]),f(w[S+1][R]))}}function l(y){const _=new N;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(y),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function u(){const y=new N;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const x=m(y)/2/Math.PI+.5,M=g(y)/Math.PI+.5;o.push(x,1-M)}p(),h()}function h(){for(let y=0;y<o.length;y+=6){const _=o[y+0],x=o[y+2],M=o[y+4],b=Math.max(_,x,M),w=Math.min(_,x,M);b>.9&&w<.1&&(_<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),M<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,_){const x=y*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function p(){const y=new N,_=new N,x=new N,M=new N,b=new ot,w=new ot,S=new ot;for(let T=0,R=0;T<r.length;T+=9,R+=6){y.set(r[T+0],r[T+1],r[T+2]),_.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),b.set(o[R+0],o[R+1]),w.set(o[R+2],o[R+3]),S.set(o[R+4],o[R+5]),M.copy(y).add(_).add(x).divideScalar(3);const A=m(M);v(b,R+0,y,A),v(w,R+2,_,A),v(S,R+4,x,A)}}function v(y,_,x,M){M<0&&y.x===1&&(o[_]=y.x-1),x.x===0&&x.z===0&&(o[_]=M/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function g(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jh(t.vertices,t.indices,t.radius,t.detail)}}class pi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Dt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new N,s=[],r=[],o=[],a=new N,c=new Bt;for(let d=0;d<=t;d++){const p=d/t;s[d]=this.getTangentAt(p,new N)}r[0]=new N,o[0]=new N;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(ee(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ee(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class tf extends pi{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class w1 extends tf{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ef(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const Ud=new N,kd=new N,pl=new ef,ml=new ef,gl=new ef;class nf extends pi{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(kd.subVectors(s[0],s[1]).add(s[0]),l=kd);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Ud.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ud),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),pl.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,p,v,m),ml.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,p,v,m),gl.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(pl.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),ml.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),gl.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return i.set(pl.calc(c),ml.calc(c),gl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function T1(n,t){const e=1-n;return e*e*t}function E1(n,t){return 2*(1-n)*n*t}function A1(n,t){return n*n*t}function no(n,t,e,i){return T1(n,t)+E1(n,e)+A1(n,i)}function R1(n,t){const e=1-n;return e*e*e*t}function C1(n,t){const e=1-n;return 3*e*e*n*t}function P1(n,t){return 3*(1-n)*n*n*t}function L1(n,t){return n*n*n*t}function io(n,t,e,i,s){return R1(n,t)+C1(n,e)+P1(n,i)+L1(n,s)}class sg extends pi{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class N1 extends pi{constructor(t=new N,e=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y),io(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class rg extends pi{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class I1 extends pi{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class og extends pi{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ag extends pi{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y),no(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cg extends pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(Fd(a,c.x,l.x,u.x,h.x),Fd(a,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var Zu=Object.freeze({__proto__:null,ArcCurve:w1,CatmullRomCurve3:nf,CubicBezierCurve:sg,CubicBezierCurve3:N1,EllipseCurve:tf,LineCurve:rg,LineCurve3:I1,QuadraticBezierCurve:og,QuadraticBezierCurve3:ag,SplineCurve:cg});class D1 extends pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zu[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Zu[s.type]().fromJSON(s))}return this}}class Od extends D1{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new rg(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new og(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new sg(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new cg(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new tf(t,e,i,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class lg extends Od{constructor(t){super(t),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Od().fromJSON(s))}return this}}function U1(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=ug(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=z1(n,t,r,e)),n.length>80*e){a=n[0],c=n[1];let u=a,h=c;for(let f=e;f<s;f+=e){const d=n[f],p=n[f+1];d<a&&(a=d),p<c&&(c=p),d>u&&(u=d),p>h&&(h=p)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return Mo(r,o,e,a,c,l,0),o}function ug(n,t,e,i,s){let r;if(s===J1(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Bd(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Bd(o/i|0,n[o],n[o+1],r);return r&&lr(r,r.next)&&(bo(r),r=r.next),r}function Ts(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(lr(e,e.next)||De(e.prev,e,e.next)===0)){if(bo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Mo(n,t,e,i,s,r,o){if(!n)return;!o&&r&&X1(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?F1(n,i,s,r):k1(n)){t.push(c.i,n.i,l.i),bo(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=O1(Ts(n),t),Mo(n,t,e,i,s,r,2)):o===2&&B1(n,t,e,i,s,r):Mo(Ts(n),t,e,i,s,r,1);break}}}function k1(n){const t=n.prev,e=n,i=n.next;if(De(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(s,r,o),h=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&$r(s,a,r,c,o,l,p.x,p.y)&&De(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function F1(n,t,e,i){const s=n.prev,r=n,o=n.next;if(De(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,c,l),p=Math.min(u,h,f),v=Math.max(a,c,l),m=Math.max(u,h,f),g=Ju(d,p,t,e,i),y=Ju(v,m,t,e,i);let _=n.prevZ,x=n.nextZ;for(;_&&_.z>=g&&x&&x.z<=y;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&$r(a,u,c,h,l,f,_.x,_.y)&&De(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=d&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==o&&$r(a,u,c,h,l,f,x.x,x.y)&&De(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&$r(a,u,c,h,l,f,_.x,_.y)&&De(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==o&&$r(a,u,c,h,l,f,x.x,x.y)&&De(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function O1(n,t){let e=n;do{const i=e.prev,s=e.next.next;!lr(i,s)&&fg(i,e,e.next,s)&&yo(i,s)&&yo(s,i)&&(t.push(i.i,e.i,s.i),bo(e),bo(e.next),e=n=s),e=e.next}while(e!==n);return Ts(e)}function B1(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&K1(o,a)){let c=dg(o,a);o=Ts(o,o.next),c=Ts(c,c.next),Mo(o,t,e,i,s,r,0),Mo(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function z1(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=ug(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(q1(l))}s.sort(H1);for(let r=0;r<s.length;r++)e=V1(s[r],e);return e}function H1(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function V1(n,t){const e=G1(n,t);if(!e)return t;const i=dg(e,n);return Ts(i,i.next),Ts(e,e.next)}function G1(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(lr(n,e))return e;do{if(lr(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&hg(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);yo(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&W1(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function W1(n,t){return De(n.prev,n,t.prev)<0&&De(t.next,n,n.next)<0}function X1(n,t,e,i){let s=n;do s.z===0&&(s.z=Ju(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,$1(s)}function $1(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Ju(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function q1(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function hg(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function $r(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&hg(n,t,e,i,s,r,o,a)}function K1(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Y1(n,t)&&(yo(n,t)&&yo(t,n)&&Z1(n,t)&&(De(n.prev,n,t.prev)||De(n,t.prev,t))||lr(n,t)&&De(n.prev,n,n.next)>0&&De(t.prev,t,t.next)>0)}function De(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function lr(n,t){return n.x===t.x&&n.y===t.y}function fg(n,t,e,i){const s=ma(De(n,t,e)),r=ma(De(n,t,i)),o=ma(De(e,i,n)),a=ma(De(e,i,t));return!!(s!==r&&o!==a||s===0&&pa(n,e,t)||r===0&&pa(n,i,t)||o===0&&pa(e,n,i)||a===0&&pa(e,t,i))}function pa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ma(n){return n>0?1:n<0?-1:0}function Y1(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&fg(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function yo(n,t){return De(n.prev,n,n.next)<0?De(n,t,n.next)>=0&&De(n,n.prev,t)>=0:De(n,t,n.prev)<0||De(n,n.next,t)<0}function Z1(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function dg(n,t){const e=Qu(n.i,n.x,n.y),i=Qu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Bd(n,t,e,i){const s=Qu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function bo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Qu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function J1(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class Q1{static triangulate(t,e,i=2){return U1(t,e,i)}}class so{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return so.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];zd(t),Hd(i,t);let o=t.length;e.forEach(zd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Hd(i,e[c]);const a=Q1.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function zd(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Hd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class As extends jh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new As(t.radius,t.detail)}}class ko extends Yt{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ee(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,h=new N,f=new ot,d=new N,p=new N,v=new N;let m=0,g=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,g=t[y+1].y-t[y].y,d.x=g*1,d.y=-m,d.z=g*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,g=t[y+1].y-t[y].y,d.x=g*1,d.y=-m,d.z=g*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(p)}for(let y=0;y<=e;y++){const _=i+y*u*s,x=Math.sin(_),M=Math.cos(_);for(let b=0;b<=t.length-1;b++){h.x=t[b].x*x,h.y=t[b].y,h.z=t[b].x*M,o.push(h.x,h.y,h.z),f.x=y/e,f.y=b/(t.length-1),a.push(f.x,f.y);const w=c[3*b+0]*x,S=c[3*b+1],T=c[3*b+0]*M;l.push(w,S,T)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){const x=_+y*t.length,M=x,b=x+t.length,w=x+t.length+1,S=x+1;r.push(M,b,S),r.push(w,S,b)}this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("uv",new Jt(a,2)),this.setAttribute("normal",new Jt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.points,t.segments,t.phiStart,t.phiLength)}}class Zn extends Yt{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,h=t/a,f=e/c,d=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const y=g*f-o;for(let _=0;_<l;_++){const x=_*h-r;p.push(x,-y,0),v.push(0,0,1),m.push(_/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let y=0;y<a;y++){const _=y+l*g,x=y+l*(g+1),M=y+1+l*(g+1),b=y+1+l*g;d.push(_,x,b),d.push(x,M,b)}this.setIndex(d),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.width,t.height,t.widthSegments,t.heightSegments)}}class sf extends Yt{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let h=t;const f=(e-t)/s,d=new N,p=new ot;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const g=r+m/i*o;d.x=h*Math.cos(g),d.y=h*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,u.push(p.x,p.y)}h+=f}for(let v=0;v<s;v++){const m=v*(i+1);for(let g=0;g<i;g++){const y=g+m,_=y,x=y+i+1,M=y+i+2,b=y+1;a.push(_,x,b),a.push(x,M,b)}}this.setIndex(a),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sf(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class rf extends Yt{constructor(t=new lg([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Jt(s,3)),this.setAttribute("normal",new Jt(r,3)),this.setAttribute("uv",new Jt(o,2));function l(u){const h=s.length/3,f=u.extractPoints(e);let d=f.shape;const p=f.holes;so.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){const y=p[m];so.isClockWise(y)===!0&&(p[m]=y.reverse())}const v=so.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){const y=p[m];d=d.concat(y)}for(let m=0,g=d.length;m<g;m++){const y=d[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,g=v.length;m<g;m++){const y=v[m],_=y[0]+h,x=y[1]+h,M=y[2]+h;i.push(_,x,M),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return j1(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new rf(i,t.curveSegments)}}function j1(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Ms extends Yt{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new N,f=new N,d=[],p=[],v=[],m=[];for(let g=0;g<=i;g++){const y=[],_=g/i,x=o+_*a,M=t*Math.cos(x),b=Math.sqrt(t*t-M*M);let w=0;g===0&&o===0?w=.5/e:g===i&&c===Math.PI&&(w=-.5/e);for(let S=0;S<=e;S++){const T=S/e,R=s+T*r;h.x=-b*Math.cos(R),h.y=M,h.z=b*Math.sin(R),p.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(T+w,1-_),y.push(l++)}u.push(y)}for(let g=0;g<i;g++)for(let y=0;y<e;y++){const _=u[g][y+1],x=u[g][y],M=u[g+1][y],b=u[g+1][y+1];(g!==0||o>0)&&d.push(_,x,b),(g!==i-1||c<Math.PI)&&d.push(x,M,b)}this.setIndex(d),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ms(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class of extends Yt{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],h=[],f=new N,d=new N,p=new N;for(let v=0;v<=i;v++){const m=o+v/i*a;for(let g=0;g<=s;g++){const y=g/s*r;d.x=(t+e*Math.cos(m))*Math.cos(y),d.y=(t+e*Math.cos(m))*Math.sin(y),d.z=e*Math.sin(m),l.push(d.x,d.y,d.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),p.subVectors(d,f).normalize(),u.push(p.x,p.y,p.z),h.push(g/s),h.push(v/i)}}for(let v=1;v<=i;v++)for(let m=1;m<=s;m++){const g=(s+1)*v+m-1,y=(s+1)*(v-1)+m-1,_=(s+1)*(v-1)+m,x=(s+1)*v+m;c.push(g,y,x),c.push(y,_,x)}this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new of(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Mc extends Yt{constructor(t=new ag(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new N,c=new N,l=new ot;let u=new N;const h=[],f=[],d=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(f,3)),this.setAttribute("uv",new Jt(d,2));function v(){for(let _=0;_<e;_++)m(_);m(r===!1?e:0),y(),g()}function m(_){u=t.getPointAt(_/e,u);const x=o.normals[_],M=o.binormals[_];for(let b=0;b<=s;b++){const w=b/s*Math.PI*2,S=Math.sin(w),T=-Math.cos(w);c.x=T*x.x+S*M.x,c.y=T*x.y+S*M.y,c.z=T*x.z+S*M.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,h.push(a.x,a.y,a.z)}}function g(){for(let _=1;_<=e;_++)for(let x=1;x<=s;x++){const M=(s+1)*(_-1)+(x-1),b=(s+1)*_+(x-1),w=(s+1)*_+x,S=(s+1)*(_-1)+x;p.push(M,b,S),p.push(b,w,S)}}function y(){for(let _=0;_<=e;_++)for(let x=0;x<=s;x++)l.x=_/e,l.y=x/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Mc(new Zu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function ur(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Vd(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Vd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function hn(n){const t={};for(let e=0;e<n.length;e++){const i=ur(n[e]);for(const s in i)t[s]=i[s]}return t}function Vd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ty(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function pg(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const _n={clone:ur,merge:hn};var ey=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ny=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ae extends Kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ey,this.fragmentShader=ny,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ur(t.uniforms),this.uniformsGroups=ty(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(s.value);break;case"v2":this.uniforms[i].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new me().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Bt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class mg extends ae{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Fi extends Kn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mi extends Fi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class dr extends Kn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Ah,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class iy extends Kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_M,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sy extends Kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Qi(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ga(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function ry(n){function t(s,r){return n[s]-n[r]}const e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function Gd(n,t,e){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=n[a+c]}return s}function oy(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}class pr{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){const a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class ay extends pr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ed,endingEnd:ed}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case nd:r=t,a=2*e-i;break;case id:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case nd:o=t,c=2*i-e;break;case id:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}const l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),v=p*p,m=v*p,g=-f*m+2*f*v-f*p,y=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*p+1,_=(-1-d)*m+(1.5+d)*v+.5*p,x=d*m-d*v;for(let M=0;M!==a;++M)r[M]=g*o[u+M]+y*o[l+M]+_*o[c+M]+x*o[h+M];return r}}class cy extends pr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(s-e),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}}class ly extends pr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class uy extends pr{interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,h=this.outTangents;if(!u||!h){const p=(i-e)/(s-e),v=1-p;for(let m=0;m!==a;++m)r[m]=o[l+m]*v+o[c+m]*p;return r}const f=a*2,d=t-1;for(let p=0;p!==a;++p){const v=o[l+p],m=o[c+p],g=d*f+p*2,y=h[g],_=h[g+1],x=t*f+p*2,M=u[x],b=u[x+1],w=fy(i,e,y,M,s);r[p]=gg(w,v,_,b,m)}return r}}function gg(n,t,e,i,s){const r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function hy(n,t,e,i,s){const r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function fy(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){const a=gg(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;const c=hy(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Jn{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qi(e,this.TimeBufferType),this.values=Qi(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Qi(t.times,Array),values:Qi(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Ga(t.settings)&&(i.settings={inTangents:Qi(t.settings.inTangents,Array),outTangents:Qi(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ly(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new cy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ay(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new uy(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case po:e=this.InterpolantFactoryMethodDiscrete;break;case mo:e=this.InterpolantFactoryMethodLinear;break;case Gc:e=this.InterpolantFactoryMethodSmooth;break;case td:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Dt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return po;case this.InterpolantFactoryMethodLinear:return mo;case this.InterpolantFactoryMethodSmooth:return Gc;case this.InterpolantFactoryMethodBezier:return td}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Ga(this.settings)&&(Wd(this.settings.inTangents,t),Wd(this.settings.outTangents,t))}return this}trim(t,e){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Wt("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Wt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=i[a];if(typeof c=="number"&&isNaN(c)){Wt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Wt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&CM(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){Wt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Gc,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{const h=a*i,f=h-i,d=h+i;for(let p=0;p!==i;++p){const v=e[h+p];if(v!==e[f+p]||v!==e[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const h=a*i,f=o*i;for(let d=0;d!==i;++d)e[f+d]=e[h+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ga(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function Wd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Jn.prototype.ValueTypeName="";Jn.prototype.TimeBufferType=Float32Array;Jn.prototype.ValueBufferType=Float32Array;Jn.prototype.DefaultInterpolation=mo;class mr extends Jn{constructor(t,e,i){super(t,e,i)}}mr.prototype.ValueTypeName="bool";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=po;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class vg extends Jn{constructor(t,e,i,s){super(t,e,i,s)}}vg.prototype.ValueTypeName="color";class So extends Jn{constructor(t,e,i,s){super(t,e,i,s)}}So.prototype.ValueTypeName="number";class dy extends pr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Ce.slerpFlat(r,0,o,l-a,o,l,c);return r}}class wo extends Jn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new dy(this.times,this.values,this.getValueSize(),t)}}wo.prototype.ValueTypeName="quaternion";wo.prototype.InterpolantFactoryMethodSmooth=void 0;class gr extends Jn{constructor(t,e,i){super(t,e,i)}}gr.prototype.ValueTypeName="string";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=po;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;class uc extends Jn{constructor(t,e,i,s){super(t,e,i,s)}}uc.prototype.ValueTypeName="vector";class py{constructor(t="",e=-1,i=[],s=vM){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=In(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(gy(i[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=i.length;r!==o;++r)e.push(Jn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=ry(c);c=Gd(c,1,u),l=Gd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new So(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}resetDuration(){const t=this.tracks;let e=0;for(let i=0,s=t.length;i!==s;++i){const r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function my(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return So;case"vector":case"vector2":case"vector3":case"vector4":return uc;case"color":return vg;case"quaternion":return wo;case"bool":case"boolean":return mr;case"string":return gr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function gy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=my(n.type);if(n.times===void 0){const i=[],s=[];oy(n.keys,i,s,"value"),n.times=i,n.values=s}let e;return t.parse!==void 0?e=t.parse(n):e=new t(n.name,n.times,n.values,n.interpolation),Ga(n.settings)&&(e.settings={inTangents:Qi(n.settings.inTangents,Float32Array),outTangents:Qi(n.settings.outTangents,Float32Array)}),e}const Ai={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Xd(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Xd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Xd(n){try{const t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class vy{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],p=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const xy=new vy;class vr{constructor(t){this.manager=t!==void 0?t:xy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}vr.DEFAULT_MATERIAL_NAME="__DEFAULT";const bi={};class _y extends Error{constructor(t,e){super(t),this.response=e}}class xg extends vr{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Ai.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(bi[t]!==void 0){bi[t].push({onLoad:e,onProgress:i,onError:s});return}bi[t]=[],bi[t].push({onLoad:e,onProgress:i,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Dt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=bi[t],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let v=0;const m=new ReadableStream({start(g){y();function y(){h.read().then(({done:_,value:x})=>{if(_)g.close();else{v+=x.byteLength;const M=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:d});for(let b=0,w=u.length;b<w;b++){const S=u[b];S.onProgress&&S.onProgress(M)}g.enqueue(x),y()}},_=>{g.error(_)})}}});return new Response(m)}else throw new _y(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{Ai.add(`file:${t}`,l);const u=bi[t];delete bi[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=bi[t];if(u===void 0)throw this.manager.itemError(t),l;delete bi[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Hs=new WeakMap;class My extends vr{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Ai.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let h=Hs.get(o);h===void 0&&(h=[],Hs.set(o,h)),h.push({onLoad:e,onError:s})}return o}const a=vo("img");function c(){u(),e&&e(this);const h=Hs.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}Hs.delete(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),Ai.remove(`image:${t}`);const f=Hs.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(h)}Hs.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ai.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class yy extends vr{constructor(t){super(t)}load(t,e,i,s){const r=new Ye,o=new My(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class yc extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class by extends yc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const vl=new Bt,$d=new N,qd=new N;class af{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Do,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;$d.setFromMatrixPosition(t.matrixWorld),e.position.copy($d),qd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){vl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(vl,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===go||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(vl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ga=new N,va=new Ce,ei=new N;class _g extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ga,va,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,va,ei.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ga,va,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,va,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new N,Kd=new ot,Yd=new ot;class fn extends _g{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=cr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cr*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z)}getViewSize(t,e){return this.getViewBounds(t,Kd,Yd),e.subVectors(Yd,Kd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(to*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Sy extends af{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=cr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class wy extends yc{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Sy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class Ty extends af{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ey extends yc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ty}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Fo extends _g{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ay extends af{constructor(){super(new Fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mg extends yc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new Ay}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class ro{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const xl=new WeakMap;class Ry extends vr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Dt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Dt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Ai.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{xl.has(o)===!0?(s&&s(xl.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(l),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ai.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),xl.set(c,l),Ai.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});Ai.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Vs=-90,Gs=1;class Cy extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(Vs,Gs,t,e);s.layers=this.layers,this.add(s);const r=new fn(Vs,Gs,t,e);r.layers=this.layers,this.add(r);const o=new fn(Vs,Gs,t,e);o.layers=this.layers,this.add(o);const a=new fn(Vs,Gs,t,e);a.layers=this.layers,this.add(a);const c=new fn(Vs,Gs,t,e);c.layers=this.layers,this.add(c);const l=new fn(Vs,Gs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===go)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Py extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Ly{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Ny.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ny(){this._document.hidden===!1&&this.reset()}const cf="\\[\\]\\.:\\/",Iy=new RegExp("["+cf+"]","g"),lf="[^"+cf+"]",Dy="[^"+cf.replace("\\.","")+"]",Uy=/((?:WC+[\/:])*)/.source.replace("WC",lf),ky=/(WCOD+)?/.source.replace("WCOD",Dy),Fy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lf),Oy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lf),By=new RegExp("^"+Uy+ky+Fy+Oy+"$"),zy=["material","materials","bones","map"];class Hy{constructor(t,e,i){const s=i||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}}class _e{constructor(t,e,i){this.path=e,this.parsedPath=i||_e.parseTrackName(e),this.node=_e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new _e.Composite(t,e,i):new _e(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Iy,"")}static parseTrackName(t){const e=By.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);zy.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=_e.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Wt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Wt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Wt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Wt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Wt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;Wt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}_e.Composite=Hy;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class yg{static{yg.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}function Zd(n,t,e,i){const s=Vy(i);switch(e){case V0:return n*t;case Fh:return n*t/s.components*s.byteLength;case Oh:return n*t/s.components*s.byteLength;case ws:return n*t*2/s.components*s.byteLength;case Bh:return n*t*2/s.components*s.byteLength;case G0:return n*t*3/s.components*s.byteLength;case Nn:return n*t*4/s.components*s.byteLength;case zh:return n*t*4/s.components*s.byteLength;case Ba:case za:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ha:case Va:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _u:case yu:return Math.max(n,16)*Math.max(t,8)/4;case xu:case Mu:return Math.max(n,8)*Math.max(t,8)/2;case bu:case Su:case Tu:case Eu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wu:case nc:case Au:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ru:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Cu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Pu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Lu:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Nu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Iu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Du:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Uu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ku:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Fu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ou:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Bu:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case zu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Hu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Vu:case Gu:case Wu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Xu:case $u:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ic:case qu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vy(n){switch(n){case Sn:case O0:return{byteLength:1,components:1};case ho:case B0:case vn:return{byteLength:2,components:1};case Uh:case kh:return{byteLength:2,components:4};case fi:case Dh:case Ln:return{byteLength:4,components:1};case z0:case H0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eh}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eh);function bg(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Gy(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,c,l){const u=c.array,h=c.updateRanges;if(n.bindBuffer(l,a),h.length===0)n.bufferSubData(l,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],v=h[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const v=h[d];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Wy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xy=`#ifdef USE_ALPHAHASH
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
#endif`,$y=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ky=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zy=`#ifdef USE_AOMAP
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
#endif`,Jy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qy=`#ifdef USE_BATCHING
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
#endif`,jy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ib=`#ifdef USE_IRIDESCENCE
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
#endif`,sb=`#ifdef USE_BUMPMAP
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
#endif`,rb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ob=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ab=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ub=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,db=`#define PI 3.141592653589793
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
} // validated`,pb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,mb=`vec3 transformedNormal = objectNormal;
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
#endif`,gb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_b=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mb="gl_FragColor = linearToOutputTexel( gl_FragColor );",yb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bb=`#ifdef USE_ENVMAP
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
#endif`,Sb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wb=`#ifdef USE_ENVMAP
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
#endif`,Tb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eb=`#ifdef USE_ENVMAP
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
#endif`,Ab=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lb=`#ifdef USE_GRADIENTMAP
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
}`,Nb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ib=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Db=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ub=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,kb=`#ifdef USE_ENVMAP
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
#endif`,Fb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ob=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hb=`PhysicalMaterial material;
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
#endif`,Vb=`uniform sampler2D dfgLUT;
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
}`,Gb=`
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
#endif`,Wb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$b=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,qb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tS=`#if defined( USE_POINTS_UV )
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
#endif`,eS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oS=`#ifdef USE_MORPHTARGETS
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
#endif`,aS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dS=`#ifdef USE_NORMALMAP
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
#endif`,pS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_S=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,MS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,TS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ES=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,AS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,RS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,CS=`float getShadowMask() {
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
}`,PS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,LS=`#ifdef USE_SKINNING
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
#endif`,NS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IS=`#ifdef USE_SKINNING
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
#endif`,DS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,US=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,FS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,OS=`#ifdef USE_TRANSMISSION
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
#endif`,BS=`#ifdef USE_TRANSMISSION
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
#endif`,zS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,GS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,XS=`uniform sampler2D t2D;
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
}`,$S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,KS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZS=`#include <common>
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
}`,JS=`#if DEPTH_PACKING == 3200
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
}`,QS=`#define DISTANCE
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
}`,jS=`#define DISTANCE
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
}`,tw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ew=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nw=`uniform float scale;
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
}`,iw=`uniform vec3 diffuse;
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
}`,sw=`#include <common>
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
}`,rw=`uniform vec3 diffuse;
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
}`,ow=`#define LAMBERT
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
}`,aw=`#define LAMBERT
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
}`,cw=`#define MATCAP
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
}`,lw=`#define MATCAP
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
}`,uw=`#define NORMAL
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
}`,hw=`#define NORMAL
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
}`,fw=`#define PHONG
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
}`,dw=`#define PHONG
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
}`,pw=`#define STANDARD
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
}`,mw=`#define STANDARD
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
}`,gw=`#define TOON
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
}`,vw=`#define TOON
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
}`,xw=`uniform float size;
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
}`,_w=`uniform vec3 diffuse;
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
}`,Mw=`#include <common>
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
}`,yw=`uniform vec3 color;
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
}`,bw=`uniform float rotation;
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
}`,Sw=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:Wy,alphahash_pars_fragment:Xy,alphamap_fragment:$y,alphamap_pars_fragment:qy,alphatest_fragment:Ky,alphatest_pars_fragment:Yy,aomap_fragment:Zy,aomap_pars_fragment:Jy,batching_pars_vertex:Qy,batching_vertex:jy,begin_vertex:tb,beginnormal_vertex:eb,bsdfs:nb,iridescence_fragment:ib,bumpmap_pars_fragment:sb,clipping_planes_fragment:rb,clipping_planes_pars_fragment:ob,clipping_planes_pars_vertex:ab,clipping_planes_vertex:cb,color_fragment:lb,color_pars_fragment:ub,color_pars_vertex:hb,color_vertex:fb,common:db,cube_uv_reflection_fragment:pb,defaultnormal_vertex:mb,displacementmap_pars_vertex:gb,displacementmap_vertex:vb,emissivemap_fragment:xb,emissivemap_pars_fragment:_b,colorspace_fragment:Mb,colorspace_pars_fragment:yb,envmap_fragment:bb,envmap_common_pars_fragment:Sb,envmap_pars_fragment:wb,envmap_pars_vertex:Tb,envmap_physical_pars_fragment:kb,envmap_vertex:Eb,fog_vertex:Ab,fog_pars_vertex:Rb,fog_fragment:Cb,fog_pars_fragment:Pb,gradientmap_pars_fragment:Lb,lightmap_pars_fragment:Nb,lights_lambert_fragment:Ib,lights_lambert_pars_fragment:Db,lights_pars_begin:Ub,lights_toon_fragment:Fb,lights_toon_pars_fragment:Ob,lights_phong_fragment:Bb,lights_phong_pars_fragment:zb,lights_physical_fragment:Hb,lights_physical_pars_fragment:Vb,lights_fragment_begin:Gb,lights_fragment_maps:Wb,lights_fragment_end:Xb,lightprobes_pars_fragment:$b,logdepthbuf_fragment:qb,logdepthbuf_pars_fragment:Kb,logdepthbuf_pars_vertex:Yb,logdepthbuf_vertex:Zb,map_fragment:Jb,map_pars_fragment:Qb,map_particle_fragment:jb,map_particle_pars_fragment:tS,metalnessmap_fragment:eS,metalnessmap_pars_fragment:nS,morphinstance_vertex:iS,morphcolor_vertex:sS,morphnormal_vertex:rS,morphtarget_pars_vertex:oS,morphtarget_vertex:aS,normal_fragment_begin:cS,normal_fragment_maps:lS,normal_pars_fragment:uS,normal_pars_vertex:hS,normal_vertex:fS,normalmap_pars_fragment:dS,clearcoat_normal_fragment_begin:pS,clearcoat_normal_fragment_maps:mS,clearcoat_pars_fragment:gS,iridescence_pars_fragment:vS,opaque_fragment:xS,packing:_S,premultiplied_alpha_fragment:MS,project_vertex:yS,dithering_fragment:bS,dithering_pars_fragment:SS,roughnessmap_fragment:wS,roughnessmap_pars_fragment:TS,shadowmap_pars_fragment:ES,shadowmap_pars_vertex:AS,shadowmap_vertex:RS,shadowmask_pars_fragment:CS,skinbase_vertex:PS,skinning_pars_vertex:LS,skinning_vertex:NS,skinnormal_vertex:IS,specularmap_fragment:DS,specularmap_pars_fragment:US,tonemapping_fragment:kS,tonemapping_pars_fragment:FS,transmission_fragment:OS,transmission_pars_fragment:BS,uv_pars_fragment:zS,uv_pars_vertex:HS,uv_vertex:VS,worldpos_vertex:GS,background_vert:WS,background_frag:XS,backgroundCube_vert:$S,backgroundCube_frag:qS,cube_vert:KS,cube_frag:YS,depth_vert:ZS,depth_frag:JS,distance_vert:QS,distance_frag:jS,equirect_vert:tw,equirect_frag:ew,linedashed_vert:nw,linedashed_frag:iw,meshbasic_vert:sw,meshbasic_frag:rw,meshlambert_vert:ow,meshlambert_frag:aw,meshmatcap_vert:cw,meshmatcap_frag:lw,meshnormal_vert:uw,meshnormal_frag:hw,meshphong_vert:fw,meshphong_frag:dw,meshphysical_vert:pw,meshphysical_frag:mw,meshtoon_vert:gw,meshtoon_frag:vw,points_vert:xw,points_frag:_w,shadow_vert:Mw,shadow_frag:yw,sprite_vert:bw,sprite_frag:Sw},lt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ri={basic:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:hn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:hn([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:hn([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new ct(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:hn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:hn([lt.points,lt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:hn([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:hn([lt.common,lt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:hn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:hn([lt.sprite,lt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:hn([lt.common,lt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:hn([lt.lights,lt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};ri.physical={uniforms:hn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const xa={r:0,b:0,g:0},ww=new Bt,Sg=new Kt;Sg.set(-1,0,0,0,1,0,0,0,1);function Tw(n,t,e,i,s,r){const o=new ct(0);let a=s===!0?0:1,c,l,u=null,h=0,f=null;function d(y){let _=y.isScene===!0?y.background:null;if(_&&_.isTexture){const x=y.backgroundBlurriness>0;_=t.get(_,x)}return _}function p(y){let _=!1;const x=d(y);x===null?m(o,a):x&&x.isColor&&(m(x,1),_=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,_){const x=d(_);x&&(x.isCubeTexture||x.mapping===xc)?(l===void 0&&(l=new $t(new Vt(1,1,1),new ae({name:"BackgroundCubeMaterial",uniforms:ur(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ww.makeRotationFromEuler(_.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Sg),l.material.toneMapped=se.getTransfer(x.colorSpace)!==pe,(u!==x||h!==x.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new $t(new Zn(2,2),new ae({name:"BackgroundMaterial",uniforms:ur(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=se.getTransfer(x.colorSpace)!==pe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,_){y.getRGB(xa,pg(n)),e.buffers.color.setClear(xa.r,xa.g,xa.b,_,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),a=_,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:p,addToRenderList:v,dispose:g}}function Ew(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(A,P,I,L,O){let B=!1;const X=h(A,L,I,P);r!==X&&(r=X,l(r.object)),B=d(A,L,I,O),B&&p(A,L,I,O),O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,x(A,P,I,L),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function h(A,P,I,L){const O=L.wireframe===!0;let B=i[P.id];B===void 0&&(B={},i[P.id]=B);const X=A.isInstancedMesh===!0?A.id:0;let J=B[X];J===void 0&&(J={},B[X]=J);let H=J[I.id];H===void 0&&(H={},J[I.id]=H);let $=H[O];return $===void 0&&($=f(c()),H[O]=$),$}function f(A){const P=[],I=[],L=[];for(let O=0;O<e;O++)P[O]=0,I[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:L,object:A,attributes:{},index:null}}function d(A,P,I,L){const O=r.attributes,B=P.attributes;let X=0;const J=I.getAttributes();for(const H in J)if(J[H].location>=0){const j=O[H];let vt=B[H];if(vt===void 0&&(H==="instanceMatrix"&&A.instanceMatrix&&(vt=A.instanceMatrix),H==="instanceColor"&&A.instanceColor&&(vt=A.instanceColor)),j===void 0||j.attribute!==vt||vt&&j.data!==vt.data)return!0;X++}return r.attributesNum!==X||r.index!==L}function p(A,P,I,L){const O={},B=P.attributes;let X=0;const J=I.getAttributes();for(const H in J)if(J[H].location>=0){let j=B[H];j===void 0&&(H==="instanceMatrix"&&A.instanceMatrix&&(j=A.instanceMatrix),H==="instanceColor"&&A.instanceColor&&(j=A.instanceColor));const vt={};vt.attribute=j,j&&j.data&&(vt.data=j.data),O[H]=vt,X++}r.attributes=O,r.attributesNum=X,r.index=L}function v(){const A=r.newAttributes;for(let P=0,I=A.length;P<I;P++)A[P]=0}function m(A){g(A,0)}function g(A,P){const I=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;I[A]=1,L[A]===0&&(n.enableVertexAttribArray(A),L[A]=1),O[A]!==P&&(n.vertexAttribDivisor(A,P),O[A]=P)}function y(){const A=r.newAttributes,P=r.enabledAttributes;for(let I=0,L=P.length;I<L;I++)P[I]!==A[I]&&(n.disableVertexAttribArray(I),P[I]=0)}function _(A,P,I,L,O,B,X){X===!0?n.vertexAttribIPointer(A,P,I,O,B):n.vertexAttribPointer(A,P,I,L,O,B)}function x(A,P,I,L){v();const O=L.attributes,B=I.getAttributes(),X=P.defaultAttributeValues;for(const J in B){const H=B[J];if(H.location>=0){let $=O[J];if($===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&($=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&($=A.instanceColor)),$!==void 0){const j=$.normalized,vt=$.itemSize,gt=t.get($);if(gt===void 0)continue;const Rt=gt.buffer,Ft=gt.type,zt=gt.bytesPerElement,V=Ft===n.INT||Ft===n.UNSIGNED_INT||$.gpuType===Dh;if($.isInterleavedBufferAttribute){const Y=$.data,yt=Y.stride,Lt=$.offset;if(Y.isInstancedInterleavedBuffer){for(let st=0;st<H.locationSize;st++)g(H.location+st,Y.meshPerAttribute);A.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let st=0;st<H.locationSize;st++)m(H.location+st);n.bindBuffer(n.ARRAY_BUFFER,Rt);for(let st=0;st<H.locationSize;st++)_(H.location+st,vt/H.locationSize,Ft,j,yt*zt,(Lt+vt/H.locationSize*st)*zt,V)}else{if($.isInstancedBufferAttribute){for(let Y=0;Y<H.locationSize;Y++)g(H.location+Y,$.meshPerAttribute);A.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Y=0;Y<H.locationSize;Y++)m(H.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Rt);for(let Y=0;Y<H.locationSize;Y++)_(H.location+Y,vt/H.locationSize,Ft,j,vt*zt,vt/H.locationSize*Y*zt,V)}}else if(X!==void 0){const j=X[J];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(H.location,j);break;case 3:n.vertexAttrib3fv(H.location,j);break;case 4:n.vertexAttrib4fv(H.location,j);break;default:n.vertexAttrib1fv(H.location,j)}}}}y()}function M(){T();for(const A in i){const P=i[A];for(const I in P){const L=P[I];for(const O in L){const B=L[O];for(const X in B)u(B[X].object),delete B[X];delete L[O]}}delete i[A]}}function b(A){if(i[A.id]===void 0)return;const P=i[A.id];for(const I in P){const L=P[I];for(const O in L){const B=L[O];for(const X in B)u(B[X].object),delete B[X];delete L[O]}}delete i[A.id]}function w(A){for(const P in i){const I=i[P];for(const L in I){const O=I[L];if(O[A.id]===void 0)continue;const B=O[A.id];for(const X in B)u(B[X].object),delete B[X];delete O[A.id]}}}function S(A){for(const P in i){const I=i[P],L=A.isInstancedMesh===!0?A.id:0,O=I[L];if(O!==void 0){for(const B in O){const X=O[B];for(const J in X)u(X[J].object),delete X[J];delete O[B]}delete I[L],Object.keys(I).length===0&&delete i[P]}}}function T(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Aw(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let d=0;d<u;d++)f+=l[d];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Rw(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Nn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const S=w===vn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Sn&&w!==Ln&&!S&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Dt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:x,maxSamples:M,samples:b}}function Cw(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Ji,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,g=n.get(h);if(!s||p===null||p.length===0||r&&!m)r?u(null):l();else{const y=r?0:i,_=y*4;let x=g.clippingState||null;c.value=x,x=u(p,f,_,d);for(let M=0;M!==_;++M)x[M]=e[M];g.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,p){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,p!==!0||m===null){const g=d+v*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let _=0,x=d;_!==v;++_,x+=4)o.copy(h[_]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const js=4,Pw=6,Lw=20,Nw=256,Lr=new Fo,Jd=new ct;let _l=null,Ml=0,yl=0,bl=!1;const Iw=new N,us=new N;class Qd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=Iw}=r;_l=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ep(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_l,Ml,yl),this._renderer.xr.enabled=bl,t.scissorTest=!1,Ws(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ss||t.mapping===or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_l=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:vn,format:Nn,colorSpace:Tn,depthBuffer:!1},s=jd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Dw(r)),this._blurMaterial=kw(r,t,e),this._ggxMaterial=Uw(r,t,e)}return s}_compileMaterial(t){const e=new $t(new Yt,t);this._renderer.compile(e,Lr)}_sceneToCubeUV(t,e,i,s,r){const c=new fn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Jd),h.toneMapping=ui,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new Vt,new cn({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let g=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,g=!0):(m.color.copy(Jd),g=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[_],r.y,r.z)):x===1?(c.up.set(0,0,l[_]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[_],r.z)):(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[_]));const M=this._cubeSize;Ws(s,x*M,_>2?M:0,M,M),h.setRenderTarget(s),g&&h.render(v,c),h.render(t,c)}h.toneMapping=d,h.autoClear=f,t.background=y}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ss||t.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ep()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tp());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ws(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Lr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),f=l*1.25,d=h*f,{_lodMax:p}=this,v=this._sizeLods[i],m=3*v*(i>p-js?i-p+js:0),g=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,Ws(r,m,g,3*v,2*v),s.setRenderTarget(r),s.render(a,Lr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,Ws(t,m,g,3*v,2*v),s.setRenderTarget(t),s.render(a,Lr)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],h=3*u*(s>this._lodMax-js?s-this._lodMax+js:0),f=4*(this._cubeSize-u);Ws(e,h,f,3*u,2*u),o.setRenderTarget(e),o.render(c,Lr)}}function Dw(n){const t=[],e=[];let i=n;const s=n-js+1+Pw;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);const a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,f=6,d=3,p=new Float32Array(d*f*h),v=new Float32Array(d*f*h);for(let g=0;g<h;g++){const y=g%3*2/3-1,_=g>2?0:-1,x=[y,_,0,y+2/3,_,0,y+2/3,_+1,0,y,_,0,y+2/3,_+1,0,y,_+1,0];p.set(x,d*f*g);for(let M=0;M<f;M++){const b=u[M*2]*2-1,w=u[M*2+1]*2-1;g===0?us.set(1,w,b):g===1?us.set(-b,1,-w):g===2?us.set(-b,w,1):g===3?us.set(-1,w,-b):g===4?us.set(-b,-1,w):us.set(b,w,-1),us.toArray(v,(g*f+M)*d)}}const m=new Yt;m.setAttribute("position",new St(p,d)),m.setAttribute("outputDirection",new St(v,d)),e.push(new $t(m,null)),i>js&&i--}return{lodMeshes:e,sizeLods:t}}function jd(n,t,e){const i=new dn(n,t,e);return i.texture.mapping=xc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ws(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Uw(n,t,e){return new ae({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Nw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bc(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function kw(n,t,e){return new ae({name:"SphericalGaussianBlur",defines:{SAMPLES:Lw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:bc(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function tp(){return new ae({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bc(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function ep(){return new ae({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function bc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class wg extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ng(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vt(5,5,5),r=new ae({name:"CubemapFromEquirect",uniforms:ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:nn,blending:li});r.uniforms.tEquirect.value=e;const o=new $t(s,r),a=e.minFilter;return e.minFilter===Ei&&(e.minFilter=Ke),new Cy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function Fw(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Hc||d===Vc)if(t.has(f)){const p=t.get(f).texture;return a(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const v=new wg(p.height);return v.fromEquirectangularTexture(n,f),t.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,p=d===Hc||d===Vc,v=d===Ss||d===or;if(p||v){let m=e.get(f);const g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new Qd(n)),m=p?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const y=f.image;return p&&y&&y.height>0||v&&y&&c(y)?(i===null&&(i=new Qd(n)),m=p?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,d){return d===Hc?f.mapping=Ss:d===Vc&&(f.mapping=or),f}function c(f){let d=0;const p=6;for(let v=0;v<p;v++)f[v]!==void 0&&d++;return d===p}function l(f){const d=f.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function Ow(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&tr("WebGLRenderer: "+i+" extension not supported."),s}}}function Bw(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,p=h.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const y=d.array;v=d.version;for(let _=0,x=y.length;_<x;_+=3){const M=y[_+0],b=y[_+1],w=y[_+2];f.push(M,b,b,w,w,M)}}else{const y=p.array;v=p.version;for(let _=0,x=y.length/3-1;_<x;_+=3){const M=_+0,b=_+1,w=_+2;f.push(M,b,b,w,w,M)}}const m=new(p.count>=65535?J0:Z0)(f,1);m.version=v;const g=r.get(h);g&&t.remove(g),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function zw(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function l(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,h*o,d),e.update(f,i,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Hw(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Wt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Vw(n,t,e){const i=new WeakMap,s=new me;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let T=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;d===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let x=a.attributes.position.count*_,M=1;x>t.maxTextureSize&&(M=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const b=new Float32Array(x*M*4*h),w=new q0(b,x,M,h);w.type=Ln,w.needsUpdate=!0;const S=_*4;for(let R=0;R<h;R++){const A=m[R],P=g[R],I=y[R],L=x*M*4*R;for(let O=0;O<A.count;O++){const B=O*S;d===!0&&(s.fromBufferAttribute(A,O),b[L+B+0]=s.x,b[L+B+1]=s.y,b[L+B+2]=s.z,b[L+B+3]=0),p===!0&&(s.fromBufferAttribute(P,O),b[L+B+4]=s.x,b[L+B+5]=s.y,b[L+B+6]=s.z,b[L+B+7]=0),v===!0&&(s.fromBufferAttribute(I,O),b[L+B+8]=s.x,b[L+B+9]=s.y,b[L+B+10]=s.z,b[L+B+11]=I.itemSize===4?s.w:1)}}f={count:h,texture:w,size:new ot(x,M)},i.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Gw(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,h=l.geometry,f=t.get(l,h);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const Ww={[Rh]:"LINEAR_TONE_MAPPING",[Ch]:"REINHARD_TONE_MAPPING",[Ph]:"CINEON_TONE_MAPPING",[vc]:"ACES_FILMIC_TONE_MAPPING",[Nh]:"AGX_TONE_MAPPING",[Ih]:"NEUTRAL_TONE_MAPPING",[Lh]:"CUSTOM_TONE_MAPPING"};function Xw(n,t,e,i,s,r){const o=new dn(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Yt;l.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Jt([0,2,0,0,2,0],2));const u=new mg({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new $t(l,u),f=new Fo(-1,1,1,-1,0,1);let d=null,p=null,v=!1,m,g=null,y=[],_=!1;this.setSize=function(x,M){o.setSize(x,M),a!==null&&a.setSize(x,M),c!==null&&c.setSize(x,M);for(let b=0;b<y.length;b++){const w=y[b];w.setSize&&w.setSize(x,M)}},this.setEffects=function(x){y=x,_=y.length>0&&y[0].isRenderPass===!0;const M=o.width,b=o.height;y.length>0&&a===null&&(a=new dn(M,b,{type:vn,depthBuffer:!1,stencilBuffer:!1}),c=new dn(M,b,{type:vn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<y.length;w++){const S=y[w];S.setSize&&S.setSize(M,b)}},this.begin=function(x,M){if(v||x.toneMapping===ui&&y.length===0)return!1;if(g=M,M!==null){const b=M.width,w=M.height;(o.width!==b||o.height!==w)&&this.setSize(b,w)}return _===!1&&x.setRenderTarget(o),m=x.toneMapping,x.toneMapping=ui,!0},this.hasRenderPass=function(){return _},this.end=function(x,M){x.toneMapping=m,v=!0;let b=o,w=a;for(let S=0;S<y.length;S++){const T=y[S];T.enabled!==!1&&(T.render(x,w,b,M),T.needsSwap!==!1&&(b=w,w=w===a?c:a))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,u.defines={},se.getTransfer(d)===pe&&(u.defines.SRGB_TRANSFER="");const S=Ww[p];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(g),x.render(h,f),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const Tg=new Ye,ju=new _o(1,1),Eg=new q0,Ag=new e1,Rg=new ng,np=[],ip=[],sp=new Float32Array(16),rp=new Float32Array(9),op=new Float32Array(4);function xr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=np[s];if(r===void 0&&(r=new Float32Array(s),np[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Je(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Sc(n,t){let e=ip[t];e===void 0&&(e=new Int32Array(t),ip[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function $w(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function qw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2fv(this.addr,t),Je(e,t)}}function Kw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;n.uniform3fv(this.addr,t),Je(e,t)}}function Yw(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4fv(this.addr,t),Je(e,t)}}function Zw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;op.set(i),n.uniformMatrix2fv(this.addr,!1,op),Je(e,i)}}function Jw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;rp.set(i),n.uniformMatrix3fv(this.addr,!1,rp),Je(e,i)}}function Qw(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;sp.set(i),n.uniformMatrix4fv(this.addr,!1,sp),Je(e,i)}}function jw(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function tT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2iv(this.addr,t),Je(e,t)}}function eT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3iv(this.addr,t),Je(e,t)}}function nT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4iv(this.addr,t),Je(e,t)}}function iT(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function sT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2uiv(this.addr,t),Je(e,t)}}function rT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3uiv(this.addr,t),Je(e,t)}}function oT(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4uiv(this.addr,t),Je(e,t)}}function aT(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ju.compareFunction=e.isReversedDepthBuffer()?Vh:Hh,r=ju):r=Tg,e.setTexture2D(t||r,s)}function cT(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Ag,s)}function lT(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Rg,s)}function uT(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Eg,s)}function hT(n){switch(n){case 5126:return $w;case 35664:return qw;case 35665:return Kw;case 35666:return Yw;case 35674:return Zw;case 35675:return Jw;case 35676:return Qw;case 5124:case 35670:return jw;case 35667:case 35671:return tT;case 35668:case 35672:return eT;case 35669:case 35673:return nT;case 5125:return iT;case 36294:return sT;case 36295:return rT;case 36296:return oT;case 35678:case 36198:case 36298:case 36306:case 35682:return aT;case 35679:case 36299:case 36307:return cT;case 35680:case 36300:case 36308:case 36293:return lT;case 36289:case 36303:case 36311:case 36292:return uT}}function fT(n,t){n.uniform1fv(this.addr,t)}function dT(n,t){const e=xr(t,this.size,2);n.uniform2fv(this.addr,e)}function pT(n,t){const e=xr(t,this.size,3);n.uniform3fv(this.addr,e)}function mT(n,t){const e=xr(t,this.size,4);n.uniform4fv(this.addr,e)}function gT(n,t){const e=xr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function vT(n,t){const e=xr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function xT(n,t){const e=xr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function _T(n,t){n.uniform1iv(this.addr,t)}function MT(n,t){n.uniform2iv(this.addr,t)}function yT(n,t){n.uniform3iv(this.addr,t)}function bT(n,t){n.uniform4iv(this.addr,t)}function ST(n,t){n.uniform1uiv(this.addr,t)}function wT(n,t){n.uniform2uiv(this.addr,t)}function TT(n,t){n.uniform3uiv(this.addr,t)}function ET(n,t){n.uniform4uiv(this.addr,t)}function AT(n,t,e){const i=this.cache,s=t.length,r=Sc(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=ju:o=Tg;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function RT(n,t,e){const i=this.cache,s=t.length,r=Sc(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ag,r[o])}function CT(n,t,e){const i=this.cache,s=t.length,r=Sc(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Rg,r[o])}function PT(n,t,e){const i=this.cache,s=t.length,r=Sc(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Eg,r[o])}function LT(n){switch(n){case 5126:return fT;case 35664:return dT;case 35665:return pT;case 35666:return mT;case 35674:return gT;case 35675:return vT;case 35676:return xT;case 5124:case 35670:return _T;case 35667:case 35671:return MT;case 35668:case 35672:return yT;case 35669:case 35673:return bT;case 5125:return ST;case 36294:return wT;case 36295:return TT;case 36296:return ET;case 35678:case 36198:case 36298:case 36306:case 35682:return AT;case 35679:case 36299:case 36307:return RT;case 35680:case 36300:case 36308:case 36293:return CT;case 36289:case 36303:case 36311:case 36292:return PT}}class NT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=hT(e.type)}}class IT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=LT(e.type)}}class DT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Sl=/(\w+)(\])?(\[|\.)?/g;function ap(n,t){n.seq.push(t),n.map[t.id]=t}function UT(n,t,e){const i=n.name,s=i.length;for(Sl.lastIndex=0;;){const r=Sl.exec(i),o=Sl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ap(e,l===void 0?new NT(a,n,t):new IT(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new DT(a),ap(e,h)),e=h}}}class Wa{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);UT(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function cp(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const kT=37297;let FT=0;function OT(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const lp=new Kt;function BT(n){se._getMatrix(lp,se.workingColorSpace,n);const t=`mat3( ${lp.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case rc:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function up(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+OT(n.getShaderSource(t),a)}else return r}function zT(n,t){const e=BT(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const HT={[Rh]:"Linear",[Ch]:"Reinhard",[Ph]:"Cineon",[vc]:"ACESFilmic",[Nh]:"AgX",[Ih]:"Neutral",[Lh]:"Custom"};function VT(n,t){const e=HT[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _a=new N;function GT(){se.getLuminanceCoefficients(_a);const n=_a.x.toFixed(4),t=_a.y.toFixed(4),e=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function XT(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $T(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function qr(n){return n!==""}function hp(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fp(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qT=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(n){return n.replace(qT,YT)}const KT=new Map;function YT(n,t){let e=qt[t];if(e===void 0){const i=KT.get(t);if(i!==void 0)e=qt[i],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return th(e)}const ZT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dp(n){return n.replace(ZT,JT)}function JT(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pp(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const QT={[Fa]:"SHADOWMAP_TYPE_PCF",[Wr]:"SHADOWMAP_TYPE_VSM"};function jT(n){return QT[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const t2={[Ss]:"ENVMAP_TYPE_CUBE",[or]:"ENVMAP_TYPE_CUBE",[xc]:"ENVMAP_TYPE_CUBE_UV"};function e2(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":t2[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const n2={[or]:"ENVMAP_MODE_REFRACTION"};function i2(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":n2[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const s2={[Ah]:"ENVMAP_BLENDING_MULTIPLY",[pM]:"ENVMAP_BLENDING_MIX",[mM]:"ENVMAP_BLENDING_ADD"};function r2(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":s2[n.combine]||"ENVMAP_BLENDING_NONE"}function o2(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function a2(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=jT(e),l=e2(e),u=i2(e),h=r2(e),f=o2(e),d=WT(e),p=XT(r),v=s.createProgram();let m,g,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(qr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(qr).join(`
`),g.length>0&&(g+=`
`)):(m=[pp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),g=[pp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?qt.tonemapping_pars_fragment:"",e.toneMapping!==ui?VT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,zT("linearToOutputTexel",e.outputColorSpace),GT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qr).join(`
`)),o=th(o),o=hp(o,e),o=fp(o,e),a=th(a),a=hp(a,e),a=fp(a,e),o=dp(o),a=dp(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===rd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const _=y+m+o,x=y+g+a,M=cp(s,s.VERTEX_SHADER,_),b=cp(s,s.FRAGMENT_SHADER,x);s.attachShader(v,M),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(A){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(v)||"",I=s.getShaderInfoLog(M)||"",L=s.getShaderInfoLog(b)||"",O=P.trim(),B=I.trim(),X=L.trim();let J=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,M,b);else{const $=up(s,M,"vertex"),j=up(s,b,"fragment");Wt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+O+`
`+$+`
`+j)}else O!==""?Dt("WebGLProgram: Program Info Log:",O):(B===""||X==="")&&(H=!1);H&&(A.diagnostics={runnable:J,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:X,prefix:g}})}s.deleteShader(M),s.deleteShader(b),S=new Wa(s,v),T=$T(s,v)}let S;this.getUniforms=function(){return S===void 0&&w(this),S};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,kT)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=FT++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=b,this}let c2=0;class l2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new u2(t),e.set(t,i)),i}}class u2{constructor(t){this.id=c2++,this.code=t,this.usedTimes=0}}function h2(n){return n===ws||n===nc||n===ic}function f2(n,t,e,i,s,r){const o=new K0,a=new l2,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function v(S,T,R,A,P,I){const L=A.fog,O=P.geometry,B=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?A.environment:null,X=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,J=t.get(S.envMap||B,X),H=J&&J.mapping===xc?J.image.height:null,$=d[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Dt("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const j=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,vt=j!==void 0?j.length:0;let gt=0;O.morphAttributes.position!==void 0&&(gt=1),O.morphAttributes.normal!==void 0&&(gt=2),O.morphAttributes.color!==void 0&&(gt=3);let Rt,Ft,zt,V;if($){const we=ri[$];Rt=we.vertexShader,Ft=we.fragmentShader}else{Rt=S.vertexShader,Ft=S.fragmentShader;const we=a.getVertexShaderStage(S),fe=a.getFragmentShaderStage(S);a.update(S,we,fe),zt=we.id,V=fe.id}const Y=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Lt=P.isInstancedMesh===!0,st=P.isBatchedMesh===!0,Xt=!!S.map,Pe=!!S.matcap,rt=!!J,Gt=!!S.aoMap,he=!!S.lightMap,ne=!!S.bumpMap&&S.wireframe===!1,be=!!S.normalMap,Ue=!!S.displacementMap,Qe=!!S.emissiveMap,Ae=!!S.metalnessMap,Le=!!S.roughnessMap,k=S.anisotropy>0,sn=S.clearcoat>0,ge=S.dispersion>0,D=S.retroreflectivity>0,E=S.iridescence>0,z=S.sheen>0,q=S.transmission>0,Z=k&&!!S.anisotropyMap,at=sn&&!!S.clearcoatMap,ht=sn&&!!S.clearcoatNormalMap,Q=sn&&!!S.clearcoatRoughnessMap,et=E&&!!S.iridescenceMap,ft=E&&!!S.iridescenceThicknessMap,Ut=z&&!!S.sheenColorMap,xt=z&&!!S.sheenRoughnessMap,dt=!!S.specularMap,kt=!!S.specularColorMap,Ht=!!S.specularIntensityMap,Zt=q&&!!S.transmissionMap,F=q&&!!S.thicknessMap,pt=!!S.gradientMap,tt=!!S.alphaMap,mt=S.alphaTest>0,bt=!!S.alphaHash,nt=!!S.extensions;let Ot=ui;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ot=n.toneMapping);const Nt={shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:Rt,fragmentShader:Ft,defines:S.defines,customVertexShaderID:zt,customFragmentShaderID:V,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:st,batchingColor:st&&P._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&P.instanceColor!==null,instancingMorph:Lt&&P.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:Pe,envMap:rt,envMapMode:rt&&J.mapping,envMapCubeUVHeight:H,aoMap:Gt,lightMap:he,bumpMap:ne,normalMap:be,displacementMap:Ue,emissiveMap:Qe,normalMapObjectSpace:be&&S.normalMapType===MM,normalMapTangentSpace:be&&S.normalMapType===sc,packedNormalMap:be&&S.normalMapType===sc&&h2(S.normalMap.format),metalnessMap:Ae,roughnessMap:Le,anisotropy:k,anisotropyMap:Z,clearcoat:sn,clearcoatMap:at,clearcoatNormalMap:ht,clearcoatRoughnessMap:Q,dispersion:ge,retroreflection:D,iridescence:E,iridescenceMap:et,iridescenceThicknessMap:ft,sheen:z,sheenColorMap:Ut,sheenRoughnessMap:xt,specularMap:dt,specularColorMap:kt,specularIntensityMap:Ht,transmission:q,transmissionMap:Zt,thicknessMap:F,gradientMap:pt,opaque:S.transparent===!1&&S.blending===jr&&S.alphaToCoverage===!1,alphaMap:tt,alphaTest:mt,alphaHash:bt,combine:S.combine,mapUv:Xt&&p(S.map.channel),aoMapUv:Gt&&p(S.aoMap.channel),lightMapUv:he&&p(S.lightMap.channel),bumpMapUv:ne&&p(S.bumpMap.channel),normalMapUv:be&&p(S.normalMap.channel),displacementMapUv:Ue&&p(S.displacementMap.channel),emissiveMapUv:Qe&&p(S.emissiveMap.channel),metalnessMapUv:Ae&&p(S.metalnessMap.channel),roughnessMapUv:Le&&p(S.roughnessMap.channel),anisotropyMapUv:Z&&p(S.anisotropyMap.channel),clearcoatMapUv:at&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:xt&&p(S.sheenRoughnessMap.channel),specularMapUv:dt&&p(S.specularMap.channel),specularColorMapUv:kt&&p(S.specularColorMap.channel),specularIntensityMapUv:Ht&&p(S.specularIntensityMap.channel),transmissionMapUv:Zt&&p(S.transmissionMap.channel),thicknessMapUv:F&&p(S.thicknessMap.channel),alphaMapUv:tt&&p(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(be||k),vertexNormals:!!O.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!O.attributes.uv&&(Xt||tt),fog:!!L,useFog:S.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||O.attributes.normal===void 0&&be===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:yt,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:gt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&se.getTransfer(S.map.colorSpace)===pe,decodeVideoTextureEmissive:Qe&&S.emissiveMap.isVideoTexture===!0&&se.getTransfer(S.emissiveMap.colorSpace)===pe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ee,flipSided:S.side===nn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:nt&&S.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&S.extensions.multiDraw===!0||st)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Nt.vertexUv1s=c.has(1),Nt.vertexUv2s=c.has(2),Nt.vertexUv3s=c.has(3),c.clear(),Nt}function m(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)T.push(R),T.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(g(T,S),y(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function g(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numSunLights),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numSunLightShadows),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function y(S,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),S.push(o.mask)}function _(S){const T=d[S.type];let R;if(T){const A=ri[T];R=_n.clone(A.uniforms)}else R=S.uniforms;return R}function x(S,T){let R=u.get(T);return R!==void 0?++R.usedTimes:(R=new a2(n,T,S,s),l.push(R),u.set(T,R)),R}function M(S){if(--S.usedTimes===0){const T=l.indexOf(S);l[T]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function b(S){a.remove(S)}function w(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:_,acquireProgram:x,releaseProgram:M,releaseShaderCache:b,programs:l,dispose:w}}function d2(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function p2(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function mp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function gp(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,v,m,g){let y=n[t];return y===void 0?(y={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:g},n[t]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=p,y.materialVariant=o(f),y.groupOrder=v,y.renderOrder=f.renderOrder,y.z=m,y.group=g),t++,y}function c(f,d,p,v,m,g,y){y.reversedDepth===!0&&(m=-m);const _=a(f,d,p,v,m,g);p.transmission>0?i.push(_):p.transparent===!0?s.push(_):e.push(_)}function l(f,d,p,v,m,g){const y=a(f,d,p,v,m,g);p.transmission>0?i.unshift(y):p.transparent===!0?s.unshift(y):e.unshift(y)}function u(f,d){e.length>1&&e.sort(f||p2),i.length>1&&i.sort(d||mp),s.length>1&&s.sort(d||mp)}function h(){for(let f=t,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:h,sort:u}}function m2(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new gp,n.set(i,[o])):s>=r.length?(o=new gp,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function g2(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new ct};break;case"SpotLight":e={position:new N,direction:new N,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function v2(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let x2=0;function _2(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function M2(n){const t=new g2,e=v2(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);const s=new N,r=new Bt,o=new Bt;function a(l){let u=0,h=0,f=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,y=0,_=0,x=0,M=0,b=0,w=0,S=0,T=0,R=0;l.sort(_2);for(let P=0,I=l.length;P<I;P++){const L=l[P],O=L.color,B=L.intensity,X=L.distance;let J=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ws?J=L.shadow.map.texture:J=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=O.r*B,h+=O.g*B,f+=O.b*B;else if(L.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(L.sh.coefficients[H],B);R++}else if(L.isSunLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const $=L.shadow,j=e.get(L);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[p]=j,i.sunShadowMap[p]=J;const vt=$.getViewportCount();for(let gt=0;gt<vt;gt++)i.sunShadowMatrix[v+gt]=$.getMatrix(gt),i.sunShadowCascade[v+gt]=$._cascadeData[gt];v+=vt,p++}i.sun[d]=H,d++}else if(L.isDirectionalLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const $=L.shadow,j=e.get(L);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,i.directionalShadow[m]=j,i.directionalShadowMap[m]=J,i.directionalShadowMatrix[m]=L.shadow.matrix,M++}i.directional[m]=H,m++}else if(L.isSpotLight){const H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(O).multiplyScalar(B),H.distance=X,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,i.spot[y]=H;const $=L.shadow;if(L.map&&(i.spotLightMap[S]=L.map,S++,$.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[y]=$.matrix,L.castShadow){const j=e.get(L);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,i.spotShadow[y]=j,i.spotShadowMap[y]=J,w++}y++}else if(L.isRectAreaLight){const H=t.get(L);H.color.copy(O).multiplyScalar(B),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),i.rectArea[_]=H,_++}else if(L.isPointLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){const $=L.shadow,j=e.get(L);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,j.shadowCameraNear=$.camera.near,j.shadowCameraFar=$.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=J,i.pointShadowMatrix[g]=L.shadow.matrix,b++}i.point[g]=H,g++}else if(L.isHemisphereLight){const H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(B),H.groundColor.copy(L.groundColor).multiplyScalar(B),i.hemi[x]=H,x++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const A=i.hash;(A.sunLength!==d||A.directionalLength!==m||A.pointLength!==g||A.spotLength!==y||A.rectAreaLength!==_||A.hemiLength!==x||A.numSunShadows!==p||A.numDirectionalShadows!==M||A.numPointShadows!==b||A.numSpotShadows!==w||A.numSpotMaps!==S||A.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=m,i.spot.length=y,i.rectArea.length=_,i.point.length=g,i.hemi.length=x,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+S-T,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,A.sunLength=d,A.directionalLength=m,A.pointLength=g,A.spotLength=y,A.rectAreaLength=_,A.hemiLength=x,A.numSunShadows=p,A.numDirectionalShadows=M,A.numPointShadows=b,A.numSpotShadows=w,A.numSpotMaps=S,A.numLightProbes=R,i.version=x2++)}function c(l,u){let h=0,f=0,d=0,p=0,v=0,m=0;const g=u.matrixWorldInverse;for(let y=0,_=l.length;y<_;y++){const x=l[y];if(x.isSunLight){const M=i.sun[h];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(g),h++}else if(x.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(x.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),p++}else if(x.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const M=i.hemi[m];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(g),m++}}}return{setup:a,setupView:c,state:i}}function vp(n){const t=new M2(n),e=[],i=[],s=[];function r(f){h.camera=f,e.length=0,i.length=0,s.length=0}function o(f){e.push(f)}function a(f){i.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function y2(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new vp(n),t.set(s,[a])):r>=o.length?(a=new vp(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const b2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,S2=`uniform sampler2D shadow_pass;
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
}`,w2=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],T2=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],xp=new Bt,Nr=new N,wl=new N;function E2(n,t,e){let i=new Do;const s=new ot,r=new ot,o=new me,a=new iy,c=new sy,l={},u=e.maxTextureSize,h={[Di]:nn,[nn]:Di,[Ee]:Ee},f=new ae({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:b2,fragmentShader:S2}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Yt;p.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $t(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fa;let g=this.type;this.render=function(b,w,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Y_&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Fa);const T=n.getRenderTarget(),R=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),P=n.state;P.setBlending(li),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=g!==this.type;I&&w.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=b.length;L<O;L++){const B=b[L],X=B.shadow;if(X===void 0){Dt("WebGLShadowMap:",B,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const J=X.getFrameExtents();s.multiply(J),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/J.x),s.x=r.x*J.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/J.y),s.y=r.y*J.y,X.mapSize.y=r.y));const H=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=H,X.map===null||I===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Wr){if(B.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new dn(s.x,s.y,{format:ws,type:vn,minFilter:Ke,magFilter:Ke,generateMipmaps:!1}),X.map.texture.name=B.name+".shadowMap",X.map.depthTexture=new _o(s.x,s.y,Ln),X.map.depthTexture.name=B.name+".shadowMapDepth",X.map.depthTexture.format=Ui,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=qe,X.map.depthTexture.magFilter=qe}else B.isPointLight?(X.map=new wg(s.x),X.map.depthTexture=new S1(s.x,fi)):(X.map=new dn(s.x,s.y),X.map.depthTexture=new _o(s.x,s.y,fi)),X.map.depthTexture.name=B.name+".shadowMap",X.map.depthTexture.format=Ui,this.type===Fa?(X.map.depthTexture.compareFunction=H?Vh:Hh,X.map.depthTexture.minFilter=Ke,X.map.depthTexture.magFilter=Ke):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=qe,X.map.depthTexture.magFilter=qe);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);const $=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();B.isPointLight!==!0&&X.updateMatrices(B,S);for(let j=0;j<$;j++){const vt=X.getCamera(j);if(B.isPointLight){const gt=X.camera,Rt=X.matrix,Ft=B.distance||gt.far;Ft!==gt.far&&(gt.far=Ft,gt.updateProjectionMatrix()),Nr.setFromMatrixPosition(B.matrixWorld),gt.position.copy(Nr),wl.copy(gt.position),wl.add(w2[j]),gt.up.copy(T2[j]),gt.lookAt(wl),gt.updateMatrixWorld(),Rt.makeTranslation(-Nr.x,-Nr.y,-Nr.z),xp.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(xp,gt.coordinateSystem,gt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,j),n.clear();else{j===0&&(n.setRenderTarget(X.map),n.clear());const gt=X.getViewport(j);o.set(r.x*gt.x,r.y*gt.y,r.x*gt.z,r.y*gt.w),P.viewport(o)}i=X.getFrustum(j),x(w,S,vt,B,this.type)}X.isPointLightShadow!==!0&&this.type===Wr&&y(X,S),X.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(T,R,A)};function y(b,w){const S=t.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new dn(s.x,s.y,{format:ws,type:vn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,S,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,S,d,v,null)}function _(b,w,S,T){let R=null;const A=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)R=A;else if(R=S.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=R.uuid,I=w.uuid;let L=l[P];L===void 0&&(L={},l[P]=L);let O=L[I];O===void 0&&(O=R.clone(),L[I]=O,w.addEventListener("dispose",M)),R=O}if(R.visible=w.visible,R.wireframe=w.wireframe,T===Wr?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:h[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,S.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const P=n.properties.get(R);P.light=S}return R}function x(b,w,S,T,R){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Wr)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);const I=t.update(b),L=b.material;if(Array.isArray(L)){const O=I.groups;for(let B=0,X=O.length;B<X;B++){const J=O[B],H=L[J.materialIndex];if(H&&H.visible){const $=_(b,H,T,R);b.onBeforeShadow(n,b,w,S,I,$,J),n.renderBufferDirect(S,null,I,$,b,J),b.onAfterShadow(n,b,w,S,I,$,J)}}}else if(L.visible){const O=_(b,L,T,R);b.onBeforeShadow(n,b,w,S,I,O,null),n.renderBufferDirect(S,null,I,O,b,null),b.onAfterShadow(n,b,w,S,I,O,null)}}const P=b.children;for(let I=0,L=P.length;I<L;I++)x(P[I],w,S,T,R)}function M(b){b.target.removeEventListener("dispose",M);for(const S in l){const T=l[S],R=b.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function A2(n,t){function e(){let F=!1;const pt=new me;let tt=null;const mt=new me(0,0,0,0);return{setMask:function(bt){tt!==bt&&!F&&(n.colorMask(bt,bt,bt,bt),tt=bt)},setLocked:function(bt){F=bt},setClear:function(bt,nt,Ot,Nt,we){we===!0&&(bt*=Nt,nt*=Nt,Ot*=Nt),pt.set(bt,nt,Ot,Nt),mt.equals(pt)===!1&&(n.clearColor(bt,nt,Ot,Nt),mt.copy(pt))},reset:function(){F=!1,tt=null,mt.set(-1,0,0,0)}}}function i(){let F=!1,pt=!1,tt=null,mt=null,bt=null;return{setReversed:function(nt){if(pt!==nt){const Ot=t.get("EXT_clip_control");nt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),pt=nt;const Nt=bt;bt=null,this.setClear(Nt)}},getReversed:function(){return pt},setTest:function(nt){nt?Y(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(nt){tt!==nt&&!F&&(n.depthMask(nt),tt=nt)},setFunc:function(nt){if(pt&&(nt=NM[nt]),mt!==nt){switch(nt){case hu:n.depthFunc(n.NEVER);break;case fu:n.depthFunc(n.ALWAYS);break;case du:n.depthFunc(n.LESS);break;case uo:n.depthFunc(n.LEQUAL);break;case pu:n.depthFunc(n.EQUAL);break;case mu:n.depthFunc(n.GEQUAL);break;case gu:n.depthFunc(n.GREATER);break;case vu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}mt=nt}},setLocked:function(nt){F=nt},setClear:function(nt){bt!==nt&&(bt=nt,pt&&(nt=1-nt),n.clearDepth(nt))},reset:function(){F=!1,tt=null,mt=null,bt=null,pt=!1}}}function s(){let F=!1,pt=null,tt=null,mt=null,bt=null,nt=null,Ot=null,Nt=null,we=null;return{setTest:function(fe){F||(fe?Y(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(fe){pt!==fe&&!F&&(n.stencilMask(fe),pt=fe)},setFunc:function(fe,kn,jn){(tt!==fe||mt!==kn||bt!==jn)&&(n.stencilFunc(fe,kn,jn),tt=fe,mt=kn,bt=jn)},setOp:function(fe,kn,jn){(nt!==fe||Ot!==kn||Nt!==jn)&&(n.stencilOp(fe,kn,jn),nt=fe,Ot=kn,Nt=jn)},setLocked:function(fe){F=fe},setClear:function(fe){we!==fe&&(n.clearStencil(fe),we=fe)},reset:function(){F=!1,pt=null,tt=null,mt=null,bt=null,nt=null,Ot=null,Nt=null,we=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},f={},d=new WeakMap,p=[],v=null,m=!1,g=null,y=null,_=null,x=null,M=null,b=null,w=null,S=new ct(0,0,0),T=0,R=!1,A=null,P=null,I=null,L=null,O=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=J>=2);let $=null,j={};const vt=n.getParameter(n.SCISSOR_BOX),gt=n.getParameter(n.VIEWPORT),Rt=new me().fromArray(vt),Ft=new me().fromArray(gt);function zt(F,pt,tt,mt){const bt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(F,nt),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ot=0;Ot<tt;Ot++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,mt,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(pt+Ot,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return nt}const V={};V[n.TEXTURE_2D]=zt(n.TEXTURE_2D,n.TEXTURE_2D,1),V[n.TEXTURE_CUBE_MAP]=zt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[n.TEXTURE_2D_ARRAY]=zt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),V[n.TEXTURE_3D]=zt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(n.DEPTH_TEST),o.setFunc(uo),ne(!1),be(Zf),Y(n.CULL_FACE),Gt(li);function Y(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function yt(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function Lt(F,pt){return f[F]!==pt?(n.bindFramebuffer(F,pt),f[F]=pt,F===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pt),F===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function st(F,pt){let tt=p,mt=!1;if(F){tt=d.get(pt),tt===void 0&&(tt=[],d.set(pt,tt));const bt=F.textures;if(tt.length!==bt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,Ot=bt.length;nt<Ot;nt++)tt[nt]=n.COLOR_ATTACHMENT0+nt;tt.length=bt.length,mt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,mt=!0);mt&&n.drawBuffers(tt)}function Xt(F){return v!==F?(n.useProgram(F),v=F,!0):!1}const Pe={[Zs]:n.FUNC_ADD,[J_]:n.FUNC_SUBTRACT,[Q_]:n.FUNC_REVERSE_SUBTRACT};Pe[j_]=n.MIN,Pe[tM]=n.MAX;const rt={[eM]:n.ZERO,[nM]:n.ONE,[iM]:n.SRC_COLOR,[D0]:n.SRC_ALPHA,[lM]:n.SRC_ALPHA_SATURATE,[aM]:n.DST_COLOR,[rM]:n.DST_ALPHA,[sM]:n.ONE_MINUS_SRC_COLOR,[U0]:n.ONE_MINUS_SRC_ALPHA,[cM]:n.ONE_MINUS_DST_COLOR,[oM]:n.ONE_MINUS_DST_ALPHA,[uM]:n.CONSTANT_COLOR,[hM]:n.ONE_MINUS_CONSTANT_COLOR,[fM]:n.CONSTANT_ALPHA,[dM]:n.ONE_MINUS_CONSTANT_ALPHA};function Gt(F,pt,tt,mt,bt,nt,Ot,Nt,we,fe){if(F===li){m===!0&&(yt(n.BLEND),m=!1);return}if(m===!1&&(Y(n.BLEND),m=!0),F!==Z_){if(F!==g||fe!==R){if((y!==Zs||M!==Zs)&&(n.blendEquation(n.FUNC_ADD),y=Zs,M=Zs),fe)switch(F){case jr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xn:n.blendFunc(n.ONE,n.ONE);break;case Jf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Wt("WebGLState: Invalid blending: ",F);break}else switch(F){case jr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jf:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qf:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",F);break}_=null,x=null,b=null,w=null,S.set(0,0,0),T=0,g=F,R=fe}return}bt=bt||pt,nt=nt||tt,Ot=Ot||mt,(pt!==y||bt!==M)&&(n.blendEquationSeparate(Pe[pt],Pe[bt]),y=pt,M=bt),(tt!==_||mt!==x||nt!==b||Ot!==w)&&(n.blendFuncSeparate(rt[tt],rt[mt],rt[nt],rt[Ot]),_=tt,x=mt,b=nt,w=Ot),(Nt.equals(S)===!1||we!==T)&&(n.blendColor(Nt.r,Nt.g,Nt.b,we),S.copy(Nt),T=we),g=F,R=!1}function he(F,pt){F.side===Ee?yt(n.CULL_FACE):Y(n.CULL_FACE);let tt=F.side===nn;pt&&(tt=!tt),ne(tt),F.blending===jr&&F.transparent===!1?Gt(li):Gt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const mt=F.stencilWrite;a.setTest(mt),mt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Qe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ne(F){A!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),A=F)}function be(F){F!==q_?(Y(n.CULL_FACE),F!==P&&(F===Zf?n.cullFace(n.BACK):F===K_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),P=F}function Ue(F){F!==I&&(X&&n.lineWidth(F),I=F)}function Qe(F,pt,tt){F?(Y(n.POLYGON_OFFSET_FILL),(L!==pt||O!==tt)&&(L=pt,O=tt,o.getReversed()&&(pt=-pt),n.polygonOffset(pt,tt))):yt(n.POLYGON_OFFSET_FILL)}function Ae(F){F?Y(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Le(F){F===void 0&&(F=n.TEXTURE0+B-1),$!==F&&(n.activeTexture(F),$=F)}function k(F,pt,tt){tt===void 0&&($===null?tt=n.TEXTURE0+B-1:tt=$);let mt=j[tt];mt===void 0&&(mt={type:void 0,texture:void 0},j[tt]=mt),(mt.type!==F||mt.texture!==pt)&&($!==tt&&(n.activeTexture(tt),$=tt),n.bindTexture(F,pt||V[F]),mt.type=F,mt.texture=pt)}function sn(){const F=j[$];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(F){Wt("WebGLState:",F)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(F){Wt("WebGLState:",F)}}function E(){try{n.texSubImage2D(...arguments)}catch(F){Wt("WebGLState:",F)}}function z(){try{n.texSubImage3D(...arguments)}catch(F){Wt("WebGLState:",F)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(F){Wt("WebGLState:",F)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(F){Wt("WebGLState:",F)}}function at(){try{n.texStorage2D(...arguments)}catch(F){Wt("WebGLState:",F)}}function ht(){try{n.texStorage3D(...arguments)}catch(F){Wt("WebGLState:",F)}}function Q(){try{n.texImage2D(...arguments)}catch(F){Wt("WebGLState:",F)}}function et(){try{n.texImage3D(...arguments)}catch(F){Wt("WebGLState:",F)}}function ft(F){return h[F]!==void 0?h[F]:n.getParameter(F)}function Ut(F,pt){h[F]!==pt&&(n.pixelStorei(F,pt),h[F]=pt)}function xt(F){Rt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Rt.copy(F))}function dt(F){Ft.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ft.copy(F))}function kt(F,pt){let tt=l.get(pt);tt===void 0&&(tt=new WeakMap,l.set(pt,tt));let mt=tt.get(F);mt===void 0&&(mt=n.getUniformBlockIndex(pt,F.name),tt.set(F,mt))}function Ht(F,pt){const mt=l.get(pt).get(F);c.get(pt)!==mt&&(n.uniformBlockBinding(pt,mt,F.__bindingPointIndex),c.set(pt,mt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},$=null,j={},f={},d=new WeakMap,p=[],v=null,m=!1,g=null,y=null,_=null,x=null,M=null,b=null,w=null,S=new ct(0,0,0),T=0,R=!1,A=null,P=null,I=null,L=null,O=null,Rt.set(0,0,n.canvas.width,n.canvas.height),Ft.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:yt,bindFramebuffer:Lt,drawBuffers:st,useProgram:Xt,setBlending:Gt,setMaterial:he,setFlipSided:ne,setCullFace:be,setLineWidth:Ue,setPolygonOffset:Qe,setScissorTest:Ae,activeTexture:Le,bindTexture:k,unbindTexture:sn,compressedTexImage2D:ge,compressedTexImage3D:D,texImage2D:Q,texImage3D:et,pixelStorei:Ut,getParameter:ft,updateUBOMapping:kt,uniformBlockBinding:Ht,texStorage2D:at,texStorage3D:ht,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:xt,viewport:dt,reset:Zt}}function R2(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(D,E){return p?new OffscreenCanvas(D,E):vo("canvas")}function m(D,E,z){let q=1;const Z=ge(D);if((Z.width>z||Z.height>z)&&(q=z/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const at=Math.floor(q*Z.width),ht=Math.floor(q*Z.height);f===void 0&&(f=v(at,ht));const Q=E?v(at,ht):f;return Q.width=at,Q.height=ht,Q.getContext("2d").drawImage(D,0,0,at,ht),Dt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+at+"x"+ht+")."),Q}else return"data"in D&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),D;return D}function g(D){return D.generateMipmaps}function y(D){n.generateMipmap(D)}function _(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(D,E,z,q,Z,at=!1){if(D!==null){if(n[D]!==void 0)return n[D];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ht;q&&(ht=t.get("EXT_texture_norm16"),ht||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===n.RED&&(z===n.FLOAT&&(Q=n.R32F),z===n.HALF_FLOAT&&(Q=n.R16F),z===n.UNSIGNED_BYTE&&(Q=n.R8),z===n.UNSIGNED_SHORT&&ht&&(Q=ht.R16_EXT),z===n.SHORT&&ht&&(Q=ht.R16_SNORM_EXT)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.R8UI),z===n.UNSIGNED_SHORT&&(Q=n.R16UI),z===n.UNSIGNED_INT&&(Q=n.R32UI),z===n.BYTE&&(Q=n.R8I),z===n.SHORT&&(Q=n.R16I),z===n.INT&&(Q=n.R32I)),E===n.RG&&(z===n.FLOAT&&(Q=n.RG32F),z===n.HALF_FLOAT&&(Q=n.RG16F),z===n.UNSIGNED_BYTE&&(Q=n.RG8),z===n.UNSIGNED_SHORT&&ht&&(Q=ht.RG16_EXT),z===n.SHORT&&ht&&(Q=ht.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RG8UI),z===n.UNSIGNED_SHORT&&(Q=n.RG16UI),z===n.UNSIGNED_INT&&(Q=n.RG32UI),z===n.BYTE&&(Q=n.RG8I),z===n.SHORT&&(Q=n.RG16I),z===n.INT&&(Q=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),z===n.UNSIGNED_INT&&(Q=n.RGB32UI),z===n.BYTE&&(Q=n.RGB8I),z===n.SHORT&&(Q=n.RGB16I),z===n.INT&&(Q=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),z===n.UNSIGNED_INT&&(Q=n.RGBA32UI),z===n.BYTE&&(Q=n.RGBA8I),z===n.SHORT&&(Q=n.RGBA16I),z===n.INT&&(Q=n.RGBA32I)),E===n.RGB&&(z===n.UNSIGNED_SHORT&&ht&&(Q=ht.RGB16_EXT),z===n.SHORT&&ht&&(Q=ht.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),E===n.RGBA){const et=at?rc:se.getTransfer(Z);z===n.FLOAT&&(Q=n.RGBA32F),z===n.HALF_FLOAT&&(Q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Q=et===pe?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&ht&&(Q=ht.RGBA16_EXT),z===n.SHORT&&ht&&(Q=ht.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function M(D,E){let z;return D?E===null||E===fi||E===fo?z=n.DEPTH24_STENCIL8:E===Ln?z=n.DEPTH32F_STENCIL8:E===ho&&(z=n.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===fi||E===fo?z=n.DEPTH_COMPONENT24:E===Ln?z=n.DEPTH_COMPONENT32F:E===ho&&(z=n.DEPTH_COMPONENT16),z}function b(D,E){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==qe&&D.minFilter!==Ke?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function w(D){const E=D.target;E.removeEventListener("dispose",w),T(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&h.delete(E)}function S(D){const E=D.target;E.removeEventListener("dispose",S),A(E)}function T(D){const E=i.get(D);if(E.__webglInit===void 0)return;const z=D.source,q=d.get(z);if(q){const Z=q[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(D),Object.keys(q).length===0&&d.delete(z)}i.remove(D)}function R(D){const E=i.get(D);n.deleteTexture(E.__webglTexture);const z=D.source,q=d.get(z);delete q[E.__cacheKey],o.memory.textures--}function A(D){const E=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(E.__webglFramebuffer[q]))for(let Z=0;Z<E.__webglFramebuffer[q].length;Z++)n.deleteFramebuffer(E.__webglFramebuffer[q][Z]);else n.deleteFramebuffer(E.__webglFramebuffer[q]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[q])}else{if(Array.isArray(E.__webglFramebuffer))for(let q=0;q<E.__webglFramebuffer.length;q++)n.deleteFramebuffer(E.__webglFramebuffer[q]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let q=0;q<E.__webglColorRenderbuffer.length;q++)E.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[q]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=D.textures;for(let q=0,Z=z.length;q<Z;q++){const at=i.get(z[q]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(z[q])}i.remove(D)}let P=0;function I(){P=0}function L(){return P}function O(D){P=D}function B(){const D=P;return D>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function X(D){const E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function J(D,E){const z=i.get(D);if(D.isVideoTexture&&k(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&z.__version!==D.version){const q=D.image;if(q===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,D,E);return}}else D.isExternalTexture&&(z.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function H(D,E){const z=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){yt(z,D,E);return}else D.isExternalTexture&&(z.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function $(D,E){const z=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){yt(z,D,E);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function j(D,E){const z=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&z.__version!==D.version){Lt(z,D,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const vt={[ar]:n.REPEAT,[oi]:n.CLAMP_TO_EDGE,[ec]:n.MIRRORED_REPEAT},gt={[qe]:n.NEAREST,[F0]:n.NEAREST_MIPMAP_NEAREST,[Xr]:n.NEAREST_MIPMAP_LINEAR,[Ke]:n.LINEAR,[Oa]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},Rt={[bM]:n.NEVER,[AM]:n.ALWAYS,[SM]:n.LESS,[Hh]:n.LEQUAL,[wM]:n.EQUAL,[Vh]:n.GEQUAL,[TM]:n.GREATER,[EM]:n.NOTEQUAL};function Ft(D,E){if(E.type===Ln&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Ke||E.magFilter===Oa||E.magFilter===Xr||E.magFilter===Ei||E.minFilter===Ke||E.minFilter===Oa||E.minFilter===Xr||E.minFilter===Ei)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,vt[E.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,vt[E.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,vt[E.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,gt[E.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,gt[E.minFilter]),E.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,Rt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===qe||E.minFilter!==Xr&&E.minFilter!==Ei||E.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function zt(D,E){let z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",w));const q=E.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const at=X(E);if(at!==D.__cacheKey){Z[at]===void 0&&(Z[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Z[at].usedTimes++;const ht=Z[D.__cacheKey];ht!==void 0&&(Z[D.__cacheKey].usedTimes--,ht.usedTimes===0&&R(E)),D.__cacheKey=at,D.__webglTexture=Z[at].texture}return z}function V(D,E,z){return Math.floor(Math.floor(D/z)/E)}function Y(D,E,z,q){const at=D.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,z,q,E.data);else{at.sort((Ut,xt)=>Ut.start-xt.start);let ht=0;for(let Ut=1;Ut<at.length;Ut++){const xt=at[ht],dt=at[Ut],kt=xt.start+xt.count,Ht=V(dt.start,E.width,4),Zt=V(xt.start,E.width,4);dt.start<=kt+1&&Ht===Zt&&V(dt.start+dt.count-1,E.width,4)===Ht?xt.count=Math.max(xt.count,dt.start+dt.count-xt.start):(++ht,at[ht]=dt)}at.length=ht+1;const Q=e.getParameter(n.UNPACK_ROW_LENGTH),et=e.getParameter(n.UNPACK_SKIP_PIXELS),ft=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let Ut=0,xt=at.length;Ut<xt;Ut++){const dt=at[Ut],kt=Math.floor(dt.start/4),Ht=Math.ceil(dt.count/4),Zt=kt%E.width,F=Math.floor(kt/E.width),pt=Ht,tt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(n.UNPACK_SKIP_ROWS,F),e.texSubImage2D(n.TEXTURE_2D,0,Zt,F,pt,tt,z,q,E.data)}D.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,et),e.pixelStorei(n.UNPACK_SKIP_ROWS,ft)}}function yt(D,E,z){let q=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(q=n.TEXTURE_3D);const Z=zt(D,E),at=E.source;e.bindTexture(q,D.__webglTexture,n.TEXTURE0+z);const ht=i.get(at);if(at.version!==ht.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const tt=se.getPrimaries(se.workingColorSpace),mt=E.colorSpace===ji?null:se.getPrimaries(E.colorSpace),bt=E.colorSpace===ji||tt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let et=m(E.image,!1,s.maxTextureSize);et=sn(E,et);const ft=r.convert(E.format,E.colorSpace),Ut=r.convert(E.type);let xt=x(E.internalFormat,ft,Ut,E.normalized,E.colorSpace,E.isVideoTexture);Ft(q,E);let dt;const kt=E.mipmaps,Ht=E.isVideoTexture!==!0,Zt=ht.__version===void 0||Z===!0,F=at.dataReady,pt=b(E,et);if(E.isDepthTexture)xt=M(E.format===vs,E.type),Zt&&(Ht?e.texStorage2D(n.TEXTURE_2D,1,xt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,xt,et.width,et.height,0,ft,Ut,null));else if(E.isDataTexture)if(kt.length>0){Ht&&Zt&&e.texStorage2D(n.TEXTURE_2D,pt,xt,kt[0].width,kt[0].height);for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],Ht?F&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,Ut,dt.data):e.texImage2D(n.TEXTURE_2D,tt,xt,dt.width,dt.height,0,ft,Ut,dt.data);E.generateMipmaps=!1}else Ht?(Zt&&e.texStorage2D(n.TEXTURE_2D,pt,xt,et.width,et.height),F&&Y(E,et,ft,Ut)):e.texImage2D(n.TEXTURE_2D,0,xt,et.width,et.height,0,ft,Ut,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ht&&Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,xt,kt[0].width,kt[0].height,et.depth);for(let tt=0,mt=kt.length;tt<mt;tt++)if(dt=kt[tt],E.format!==Nn)if(ft!==null)if(Ht){if(F)if(E.layerUpdates.size>0){const bt=Zd(dt.width,dt.height,E.format,E.type);for(const nt of E.layerUpdates){const Ot=dt.data.subarray(nt*bt/dt.data.BYTES_PER_ELEMENT,(nt+1)*bt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,nt,dt.width,dt.height,1,ft,Ot)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,et.depth,ft,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,xt,dt.width,dt.height,et.depth,0,dt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,et.depth,ft,Ut,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,xt,dt.width,dt.height,et.depth,0,ft,Ut,dt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ht&&Zt&&e.texStorage2D(n.TEXTURE_2D,pt,xt,kt[0].width,kt[0].height);for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],E.format!==Nn?ft!==null?Ht?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,xt,dt.width,dt.height,0,dt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?F&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,ft,Ut,dt.data):e.texImage2D(n.TEXTURE_2D,tt,xt,dt.width,dt.height,0,ft,Ut,dt.data)}else if(E.isDataArrayTexture)if(Ht){if(Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,xt,et.width,et.height,et.depth),F)if(E.layerUpdates.size>0){const tt=Zd(et.width,et.height,E.format,E.type);for(const mt of E.layerUpdates){const bt=et.data.subarray(mt*tt/et.data.BYTES_PER_ELEMENT,(mt+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,mt,et.width,et.height,1,ft,Ut,bt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,Ut,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,xt,et.width,et.height,et.depth,0,ft,Ut,et.data);else if(E.isData3DTexture)Ht?(Zt&&e.texStorage3D(n.TEXTURE_3D,pt,xt,et.width,et.height,et.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,Ut,et.data)):e.texImage3D(n.TEXTURE_3D,0,xt,et.width,et.height,et.depth,0,ft,Ut,et.data);else if(E.isFramebufferTexture){if(Zt)if(Ht)e.texStorage2D(n.TEXTURE_2D,pt,xt,et.width,et.height);else{let tt=et.width,mt=et.height;for(let bt=0;bt<pt;bt++)e.texImage2D(n.TEXTURE_2D,bt,xt,tt,mt,0,ft,Ut,null),tt>>=1,mt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){const tt=n.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),et.parentNode!==tt){tt.appendChild(et),h.add(E),tt.onpaint=mt=>{const bt=mt.changedElements;for(const nt of h)bt.includes(nt.image)&&(nt.needsUpdate=!0)},tt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,et);else{const bt=n.RGBA,nt=n.RGBA,Ot=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,bt,nt,Ot,et)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Ht&&Zt){const tt=ge(kt[0]);e.texStorage2D(n.TEXTURE_2D,pt,xt,tt.width,tt.height)}for(let tt=0,mt=kt.length;tt<mt;tt++)dt=kt[tt],Ht?F&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ft,Ut,dt):e.texImage2D(n.TEXTURE_2D,tt,xt,ft,Ut,dt);E.generateMipmaps=!1}else if(Ht){if(Zt){const tt=ge(et);e.texStorage2D(n.TEXTURE_2D,pt,xt,tt.width,tt.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Ut,et)}else e.texImage2D(n.TEXTURE_2D,0,xt,ft,Ut,et);g(E)&&y(q),ht.__version=at.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function Lt(D,E,z){if(E.image.length!==6)return;const q=zt(D,E),Z=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+z);const at=i.get(Z);if(Z.version!==at.__version||q===!0){e.activeTexture(n.TEXTURE0+z);const ht=se.getPrimaries(se.workingColorSpace),Q=E.colorSpace===ji?null:se.getPrimaries(E.colorSpace),et=E.colorSpace===ji||ht===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const ft=E.isCompressedTexture||E.image[0].isCompressedTexture,Ut=E.image[0]&&E.image[0].isDataTexture,xt=[];for(let nt=0;nt<6;nt++)!ft&&!Ut?xt[nt]=m(E.image[nt],!0,s.maxCubemapSize):xt[nt]=Ut?E.image[nt].image:E.image[nt],xt[nt]=sn(E,xt[nt]);const dt=xt[0],kt=r.convert(E.format,E.colorSpace),Ht=r.convert(E.type),Zt=x(E.internalFormat,kt,Ht,E.normalized,E.colorSpace),F=E.isVideoTexture!==!0,pt=at.__version===void 0||q===!0,tt=Z.dataReady;let mt=b(E,dt);Ft(n.TEXTURE_CUBE_MAP,E);let bt;if(ft){F&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Zt,dt.width,dt.height);for(let nt=0;nt<6;nt++){bt=xt[nt].mipmaps;for(let Ot=0;Ot<bt.length;Ot++){const Nt=bt[Ot];E.format!==Nn?kt!==null?F?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot,0,0,Nt.width,Nt.height,kt,Nt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot,Zt,Nt.width,Nt.height,0,Nt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot,0,0,Nt.width,Nt.height,kt,Ht,Nt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot,Zt,Nt.width,Nt.height,0,kt,Ht,Nt.data)}}}else{if(bt=E.mipmaps,F&&pt){bt.length>0&&mt++;const nt=ge(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Zt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Ut){F?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,xt[nt].width,xt[nt].height,kt,Ht,xt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,xt[nt].width,xt[nt].height,0,kt,Ht,xt[nt].data);for(let Ot=0;Ot<bt.length;Ot++){const we=bt[Ot].image[nt].image;F?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot+1,0,0,we.width,we.height,kt,Ht,we.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot+1,Zt,we.width,we.height,0,kt,Ht,we.data)}}else{F?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,kt,Ht,xt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,kt,Ht,xt[nt]);for(let Ot=0;Ot<bt.length;Ot++){const Nt=bt[Ot];F?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot+1,0,0,kt,Ht,Nt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Ot+1,Zt,kt,Ht,Nt.image[nt])}}}g(E)&&y(n.TEXTURE_CUBE_MAP),at.__version=Z.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function st(D,E,z,q,Z,at){const ht=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),et=x(z.internalFormat,ht,Q,z.normalized,z.colorSpace),ft=i.get(E),Ut=i.get(z);if(Ut.__renderTarget=E,!ft.__hasExternalTextures){const xt=Math.max(1,E.width>>at),dt=Math.max(1,E.height>>at);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,at,et,xt,dt,E.depth,0,ht,Q,null):e.texImage2D(Z,at,et,xt,dt,0,ht,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,0,Ae(E)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,Ut.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(D,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,D),E.depthBuffer){const q=E.depthTexture,Z=q&&q.isDepthTexture?q.type:null,at=M(E.stencilBuffer,Z),ht=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae(E),at,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae(E),at,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,at,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,D)}else{const q=E.textures;for(let Z=0;Z<q.length;Z++){const at=q[Z],ht=r.convert(at.format,at.colorSpace),Q=r.convert(at.type),et=x(at.internalFormat,ht,Q,at.normalized,at.colorSpace);Le(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae(E),et,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae(E),et,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,et,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(D,E,z){const q=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(E.depthTexture);if(Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,E.depthTexture);const ft=r.convert(E.depthTexture.format),Ut=r.convert(E.depthTexture.type);let xt;E.depthTexture.format===Ui?xt=n.DEPTH_COMPONENT24:E.depthTexture.format===vs&&(xt=n.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,xt,E.width,E.height,0,ft,Ut,null)}}else J(E.depthTexture,0);const at=Z.__webglTexture,ht=Ae(E),Q=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,et=E.depthTexture.format===vs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ui)Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Q,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Q,at,0);else if(E.depthTexture.format===vs)Le(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Q,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Q,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function rt(D){const E=i.get(D),z=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){const q=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),q){const Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=q}if(D.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)Pe(E.__webglFramebuffer[q],D,q);else{const q=D.texture.mipmaps;q&&q.length>0?Pe(E.__webglFramebuffer[0],D,0):Pe(E.__webglFramebuffer,D,0)}else if(z){E.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[q]),E.__webglDepthbuffer[q]===void 0)E.__webglDepthbuffer[q]=n.createRenderbuffer(),Xt(E.__webglDepthbuffer[q],D,!1);else{const Z=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}else{const q=D.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Xt(E.__webglDepthbuffer,D,!1);else{const Z=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(D,E,z){const q=i.get(D);E!==void 0&&st(q.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&rt(D)}function he(D){const E=D.texture,z=i.get(D),q=i.get(E);D.addEventListener("dispose",S);const Z=D.textures,at=D.isWebGLCubeRenderTarget===!0,ht=Z.length>1;if(ht||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=E.version,o.memory.textures++),at){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let et=0;et<E.mipmaps.length;et++)z.__webglFramebuffer[Q][et]=n.createFramebuffer()}else z.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)z.__webglFramebuffer[Q]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Q=0,et=Z.length;Q<et;Q++){const ft=i.get(Z[Q]);ft.__webglTexture===void 0&&(ft.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Le(D)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const et=Z[Q];z.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);const ft=r.convert(et.format,et.colorSpace),Ut=r.convert(et.type),xt=x(et.internalFormat,ft,Ut,et.normalized,et.colorSpace,D.isXRRenderTarget===!0),dt=Ae(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,xt,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Xt(z.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)st(z.__webglFramebuffer[Q][et],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,et);else st(z.__webglFramebuffer[Q],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);g(E)&&y(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Q=0,et=Z.length;Q<et;Q++){const ft=Z[Q],Ut=i.get(ft);let xt=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(xt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(xt,Ut.__webglTexture),Ft(xt,ft),st(z.__webglFramebuffer,D,ft,n.COLOR_ATTACHMENT0+Q,xt,0),g(ft)&&y(xt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Q=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,q.__webglTexture),Ft(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)st(z.__webglFramebuffer[et],D,E,n.COLOR_ATTACHMENT0,Q,et);else st(z.__webglFramebuffer,D,E,n.COLOR_ATTACHMENT0,Q,0);g(E)&&y(Q),e.unbindTexture()}D.depthBuffer&&rt(D)}function ne(D){const E=D.textures;for(let z=0,q=E.length;z<q;z++){const Z=E[z];if(g(Z)){const at=_(D),ht=i.get(Z).__webglTexture;e.bindTexture(at,ht),y(at),e.unbindTexture()}}}const be=[],Ue=[];function Qe(D){if(D.samples>0){if(Le(D)===!1){const E=D.textures,z=D.width,q=D.height;let Z=n.COLOR_BUFFER_BIT;const at=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(D),Q=E.length>1;if(Q)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const et=D.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Ut=i.get(E[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ut,0)}n.blitFramebuffer(0,0,z,q,0,0,z,q,Z,n.NEAREST),c===!0&&(be.length=0,Ue.length=0,be.push(n.COLOR_ATTACHMENT0+ft),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(be.push(at),Ue.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ue)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Ut=i.get(E[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){const E=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Ae(D){return Math.min(s.maxSamples,D.samples)}function Le(D){const E=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function k(D){const E=o.render.frame;u.get(D)!==E&&(u.set(D,E),D.update())}function sn(D,E){const z=D.colorSpace,q=D.format,Z=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||z!==Tn&&z!==ji&&(se.getTransfer(z)===pe?(q!==Nn||Z!==Sn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",z)),E}function ge(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=I,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=J,this.setTexture2DArray=H,this.setTexture3D=$,this.setTextureCube=j,this.rebindTextures=Gt,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function C2(n,t){function e(i,s=ji){let r;const o=se.getTransfer(s);if(i===Sn)return n.UNSIGNED_BYTE;if(i===Uh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===kh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===z0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===H0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===O0)return n.BYTE;if(i===B0)return n.SHORT;if(i===ho)return n.UNSIGNED_SHORT;if(i===Dh)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===vn)return n.HALF_FLOAT;if(i===V0)return n.ALPHA;if(i===G0)return n.RGB;if(i===Nn)return n.RGBA;if(i===Ui)return n.DEPTH_COMPONENT;if(i===vs)return n.DEPTH_STENCIL;if(i===Fh)return n.RED;if(i===Oh)return n.RED_INTEGER;if(i===ws)return n.RG;if(i===Bh)return n.RG_INTEGER;if(i===zh)return n.RGBA_INTEGER;if(i===Ba||i===za||i===Ha||i===Va)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xu||i===_u||i===Mu||i===yu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_u)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bu||i===Su||i===wu||i===Tu||i===Eu||i===nc||i===Au)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bu||i===Su)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Tu)return r.COMPRESSED_R11_EAC;if(i===Eu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===nc)return r.COMPRESSED_RG11_EAC;if(i===Au)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ru||i===Cu||i===Pu||i===Lu||i===Nu||i===Iu||i===Du||i===Uu||i===ku||i===Fu||i===Ou||i===Bu||i===zu||i===Hu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ru)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Lu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Iu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Du)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ku)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ou)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Hu)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Vu||i===Gu||i===Wu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Vu)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xu||i===$u||i===ic||i===qu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Xu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===$u)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ic)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const P2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L2=`
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

}`;class N2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new ig(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ae({vertexShader:P2,fragmentShader:L2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new Zn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class I2 extends Es{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",m=new N2,g={},y=e.getContextAttributes();let _=null,x=null;const M=[],b=[],w=new ot;let S=null,T=null;const R=new fn;R.viewport=new me;const A=new fn;A.viewport=new me;const P=[R,A],I=new Py;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Y=M[V];return Y===void 0&&(Y=new Zc,M[V]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(V){let Y=M[V];return Y===void 0&&(Y=new Zc,M[V]=Y),Y.getGripSpace()},this.getHand=function(V){let Y=M[V];return Y===void 0&&(Y=new Zc,M[V]=Y),Y.getHandSpace()};function B(V){const Y=b.indexOf(V.inputSource);if(Y===-1)return;const yt=M[Y];yt!==void 0&&(yt.update(V.inputSource,V.frame,l||o),yt.dispatchEvent({type:V.type,data:V.inputSource}))}function X(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",J);for(let V=0;V<M.length;V++){const Y=b[V];Y!==null&&(b[V]=null,M[V].disconnect(Y))}L=null,O=null,m.reset();for(const V in g)delete g[V];if(t.setRenderTarget(_),d=null,f=null,h=null,s=null,x=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(w.width,w.height,!1),T!==null){const V=T.camera;V.fov=T.fov,V.zoom=T.zoom,V.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",X),s.addEventListener("inputsourceschange",J),y.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Lt=null,st=null;y.depth&&(st=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=y.stencil?vs:Ui,Lt=y.stencil?fo:fi);const Xt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Xt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new dn(f.textureWidth,f.textureHeight,{format:Nn,type:Sn,depthTexture:new _o(f.textureWidth,f.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const yt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new dn(d.framebufferWidth,d.framebufferHeight,{format:Nn,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(V){for(let Y=0;Y<V.removed.length;Y++){const yt=V.removed[Y],Lt=b.indexOf(yt);Lt>=0&&(b[Lt]=null,M[Lt].disconnect(yt))}for(let Y=0;Y<V.added.length;Y++){const yt=V.added[Y];let Lt=b.indexOf(yt);if(Lt===-1){for(let Xt=0;Xt<M.length;Xt++)if(Xt>=b.length){b.push(yt),Lt=Xt;break}else if(b[Xt]===null){b[Xt]=yt,Lt=Xt;break}if(Lt===-1)break}const st=M[Lt];st&&st.connect(yt)}}const H=new N,$=new N;function j(V,Y,yt){H.setFromMatrixPosition(Y.matrixWorld),$.setFromMatrixPosition(yt.matrixWorld);const Lt=H.distanceTo($),st=Y.projectionMatrix.elements,Xt=yt.projectionMatrix.elements,Pe=st[14]/(st[10]-1),rt=st[14]/(st[10]+1),Gt=(st[9]+1)/st[5],he=(st[9]-1)/st[5],ne=(st[8]-1)/st[0],be=(Xt[8]+1)/Xt[0],Ue=Pe*ne,Qe=Pe*be,Ae=Lt/(-ne+be),Le=Ae*-ne;if(Y.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Le),V.translateZ(Ae),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),st[10]===-1)V.projectionMatrix.copy(Y.projectionMatrix),V.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const k=Pe+Ae,sn=rt+Ae,ge=Ue-Le,D=Qe+(Lt-Le),E=Gt*rt/sn*k,z=he*rt/sn*k;V.projectionMatrix.makePerspective(ge,D,E,z,k,sn),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function vt(V,Y){Y===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Y.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Y=V.near,yt=V.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(yt=m.depthFar)),I.near=A.near=R.near=Y,I.far=A.far=R.far=yt,(L!==I.near||O!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),L=I.near,O=I.far),I.layers.mask=V.layers.mask|6,R.layers.mask=I.layers.mask&-5,A.layers.mask=I.layers.mask&-3;const Lt=V.parent,st=I.cameras;vt(I,Lt);for(let Xt=0;Xt<st.length;Xt++)vt(st[Xt],Lt);st.length===2?j(I,R,A):I.projectionMatrix.copy(R.projectionMatrix),T===null&&V.isPerspectiveCamera&&(T={camera:V,fov:V.fov,zoom:V.zoom}),gt(V,I,Lt)};function gt(V,Y,yt){yt===null?V.matrix.copy(Y.matrixWorld):(V.matrix.copy(yt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Y.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Y.projectionMatrix),V.projectionMatrixInverse.copy(Y.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=cr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(V){c=V,f!==null&&(f.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(V){return g[V]};let Rt=null;function Ft(V,Y){if(u=Y.getViewerPose(l||o),p=Y,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Lt=!1;yt.length!==I.cameras.length&&(I.cameras.length=0,Lt=!0);for(let rt=0;rt<yt.length;rt++){const Gt=yt[rt];let he=null;if(d!==null)he=d.getViewport(Gt);else{const be=h.getViewSubImage(f,Gt);he=be.viewport,rt===0&&(t.setRenderTargetTextures(x,be.colorTexture,be.depthStencilTexture),t.setRenderTarget(x))}let ne=P[rt];ne===void 0&&(ne=new fn,ne.layers.enable(rt),ne.viewport=new me,P[rt]=ne),ne.matrix.fromArray(Gt.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(Gt.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(he.x,he.y,he.width,he.height),rt===0&&(I.matrix.copy(ne.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Lt===!0&&I.cameras.push(ne)}const st=s.enabledFeatures;if(st&&st.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const rt=h.getDepthInformation(yt[0]);rt&&rt.isValid&&rt.texture&&m.init(rt,s.renderState)}if(st&&st.includes("camera-access")&&v){t.state.unbindTexture(),h=i.getBinding();for(let rt=0;rt<yt.length;rt++){const Gt=yt[rt].camera;if(Gt){let he=g[Gt];he||(he=new ig,g[Gt]=he);const ne=h.getCameraImage(Gt);he.sourceTexture=ne}}}}for(let yt=0;yt<M.length;yt++){const Lt=b[yt],st=M[yt];Lt!==null&&st!==void 0&&st.update(Lt,Y,l||o)}Rt&&Rt(V,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),p=null}const zt=new bg;zt.setAnimationLoop(Ft),this.setAnimationLoop=function(V){Rt=V},this.dispose=function(){}}}const D2=new Bt,Cg=new Kt;Cg.set(-1,0,0,0,1,0,0,0,1);function U2(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,pg(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,y,_,x){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),h(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,x)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),v(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,y,_):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===nn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===nn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=t.get(g),_=y.envMap,x=y.envMapRotation;_&&(m.envMap.value=_,m.envMapRotation.value.setFromMatrix4(D2.makeRotationFromEuler(x)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cg),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,y,_){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=_*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===nn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const y=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function k2(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const b=M.program;i.uniformBlockBinding(x,b)}function l(x,M){let b=s[x.id];b===void 0&&(m(x),b=u(x),s[x.id]=b,x.addEventListener("dispose",y));const w=M.program;i.updateUBOMapping(x,w);const S=t.render.frame;r[x.id]!==S&&(f(x),r[x.id]=S)}function u(x){const M=h();x.__bindingPointIndex=M;const b=n.createBuffer(),w=x.__size,S=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,w,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,b),b}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],b=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let S=0,T=b.length;S<T;S++){const R=b[S];if(Array.isArray(R))for(let A=0,P=R.length;A<P;A++)d(R[A],S,A,w);else d(R,S,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,M,b,w){if(v(x,M,b,w)===!0){const S=x.__offset,T=x.value;if(Array.isArray(T)){let R=0;for(let A=0;A<T.length;A++){const P=T[A],I=g(P);p(P,x.__data,R),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(R+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,x.__data)}}function p(x,M,b){typeof x=="number"||typeof x=="boolean"?M[0]=x:x.isMatrix3?(M[0]=x.elements[0],M[1]=x.elements[1],M[2]=x.elements[2],M[3]=0,M[4]=x.elements[3],M[5]=x.elements[4],M[6]=x.elements[5],M[7]=0,M[8]=x.elements[6],M[9]=x.elements[7],M[10]=x.elements[8],M[11]=0):ArrayBuffer.isView(x)?M.set(new x.constructor(x.buffer,x.byteOffset,M.length)):x.toArray(M,b)}function v(x,M,b,w){const S=x.value,T=M+"_"+b;if(w[T]===void 0)return typeof S=="number"||typeof S=="boolean"?w[T]=S:ArrayBuffer.isView(S)?w[T]=S.slice():w[T]=S.clone(),!0;{const R=w[T];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return w[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(R.equals(S)===!1)return R.copy(S),!0}}return!1}function m(x){const M=x.uniforms;let b=0;const w=16;for(let T=0,R=M.length;T<R;T++){const A=Array.isArray(M[T])?M[T]:[M[T]];for(let P=0,I=A.length;P<I;P++){const L=A[P],O=Array.isArray(L.value)?L.value:[L.value];for(let B=0,X=O.length;B<X;B++){const J=O[B],H=g(J),$=b%w,j=$%H.boundary,vt=$+j;b+=j,vt!==0&&w-vt<H.storage&&(b+=w-vt),L.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=H.storage}}}const S=b%w;return S>0&&(b+=w-S),x.__size=b,x.__cache={},this}function g(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",x),M}function y(x){const M=x.target;M.removeEventListener("dispose",y);const b=o.indexOf(M.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function _(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:_}}const F2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function O2(){return ni===null&&(ni=new qh(F2,16,16,ws,vn),ni.name="DFG_LUT",ni.minFilter=Ke,ni.magFilter=Ke,ni.wrapS=oi,ni.wrapT=oi,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class B2{constructor(t={}){const{canvas:e=PM(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Sn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=d,m=new Set([zh,Bh,Oh]),g=new Set([Sn,fi,ho,fo,Uh,kh]),y=new Uint32Array(4),_=new Int32Array(4),x=new N;let M=null,b=null;const w=[],S=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let A=!1,P=null,I=null,L=null,O=null;this._outputColorSpace=Xe;let B=0,X=0,J=null,H=-1,$=null;const j=new me,vt=new me;let gt=null;const Rt=new ct(0);let Ft=0,zt=e.width,V=e.height,Y=1,yt=null,Lt=null;const st=new me(0,0,zt,V),Xt=new me(0,0,zt,V);let Pe=!1;const rt=new Do;let Gt=!1,he=!1;const ne=new Bt,be=new N,Ue=new me,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ae=!1;function Le(){return J===null?Y:1}let k=i;function sn(C,U){return e.getContext(C,U)}let ge,D,E,z,q,Z,at,ht,Q,et,ft,Ut,xt,dt,kt,Ht,Zt,F,pt,tt,mt,bt,nt;try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Eh}`),e.addEventListener("webglcontextlost",we,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",kn,!1),k===null){const U="webgl2";if(k=sn(U,C),k===null)throw sn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(C){throw e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",kn,!1),Wt("WebGLRenderer: "+C.message),C}function Ot(){ge=new Ow(k),ge.init(),mt=new C2(k,ge),D=new Rw(k,ge,t,mt),E=new A2(k,ge),D.reversedDepthBuffer&&f&&E.buffers.depth.setReversed(!0),I=k.createFramebuffer(),L=k.createFramebuffer(),O=k.createFramebuffer(),z=new Hw(k),q=new d2,Z=new R2(k,ge,E,q,D,mt,z),at=new Fw(R),ht=new Gy(k),bt=new Ew(k,ht),Q=new Bw(k,ht,z,bt),et=new Gw(k,Q,ht,bt,z),F=new Vw(k,D,Z),kt=new Cw(q),ft=new f2(R,at,ge,D,bt,kt),Ut=new U2(R,q),xt=new m2,dt=new y2(ge),Zt=new Tw(R,at,E,et,p,c),Ht=new E2(R,et,D),nt=new k2(k,z,D,E),pt=new Aw(k,ge,z),tt=new zw(k,ge,z),z.programs=ft.programs,R.capabilities=D,R.extensions=ge,R.properties=q,R.renderLists=xt,R.shadowMap=Ht,R.state=E,R.info=z}v!==Sn&&(T=new Xw(v,e.width,e.height,a,s,r));const Nt=new I2(R,k);this.xr=Nt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const C=ge.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ge.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(C){C!==void 0&&(Y=C,this.setSize(zt,V,!1))},this.getSize=function(C){return C.set(zt,V)},this.setSize=function(C,U,K=!0){if(Nt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=C,V=U,e.width=Math.floor(C*Y),e.height=Math.floor(U*Y),K===!0&&(e.style.width=C+"px",e.style.height=U+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,C,U)},this.getDrawingBufferSize=function(C){return C.set(zt*Y,V*Y).floor()},this.setDrawingBufferSize=function(C,U,K){zt=C,V=U,Y=K,e.width=Math.floor(C*K),e.height=Math.floor(U*K),this.setViewport(0,0,C,U)},this.setEffects=function(C){if(v===Sn){Wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let U=0;U<C.length;U++)if(C[U].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(j)},this.getViewport=function(C){return C.copy(st)},this.setViewport=function(C,U,K,G){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,U,K,G),E.viewport(j.copy(st).multiplyScalar(Y).round())},this.getScissor=function(C){return C.copy(Xt)},this.setScissor=function(C,U,K,G){C.isVector4?Xt.set(C.x,C.y,C.z,C.w):Xt.set(C,U,K,G),E.scissor(vt.copy(Xt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(C){E.setScissorTest(Pe=C)},this.setOpaqueSort=function(C){yt=C},this.setTransparentSort=function(C){Lt=C},this.getClearColor=function(C){return C.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(C=!0,U=!0,K=!0){let G=0;if(C){let W=!1;if(J!==null){const Mt=J.texture.format;W=m.has(Mt)}if(W){const Mt=J.texture.type,Tt=g.has(Mt),_t=Zt.getClearColor(),Ct=Zt.getClearAlpha(),It=_t.r,Qt=_t.g,oe=_t.b;Tt?(y[0]=It,y[1]=Qt,y[2]=oe,y[3]=Ct,k.clearBufferuiv(k.COLOR,0,y)):(_[0]=It,_[1]=Qt,_[2]=oe,_[3]=Ct,k.clearBufferiv(k.COLOR,0,_))}else G|=k.COLOR_BUFFER_BIT}U&&(G|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(G|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&k.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),P=C},this.dispose=function(){e.removeEventListener("webglcontextlost",we,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",kn,!1),Zt.dispose(),xt.dispose(),dt.dispose(),q.dispose(),at.dispose(),et.dispose(),bt.dispose(),nt.dispose(),ft.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",Tf),Nt.removeEventListener("sessionend",Ef),ss.stop()};function we(C){C.preventDefault(),oc("WebGLRenderer: Context Lost."),A=!0}function fe(){oc("WebGLRenderer: Context Restored."),A=!1;const C=z.autoReset,U=Ht.enabled,K=Ht.autoUpdate,G=Ht.needsUpdate,W=Ht.type;Ot(),z.autoReset=C,Ht.enabled=U,Ht.autoUpdate=K,Ht.needsUpdate=G,Ht.type=W}function kn(C){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function jn(C){const U=C.target;U.removeEventListener("dispose",jn),Xv(U)}function Xv(C){$v(C),q.remove(C)}function $v(C){const U=q.get(C).programs;U!==void 0&&(U.forEach(function(K){ft.releaseProgram(K)}),C.isShaderMaterial&&ft.releaseShaderCache(C))}this.renderBufferDirect=function(C,U,K,G,W,Mt){U===null&&(U=Qe);const Tt=W.isMesh&&W.matrixWorld.determinantAffine()<0,_t=Yv(C,U,K,G,W);E.setMaterial(G,Tt);let Ct=K.index,It=1;if(G.wireframe===!0){if(Ct=Q.getWireframeAttribute(K),Ct===void 0)return;It=2}const Qt=K.drawRange,oe=K.attributes.position;let Pt=Qt.start*It,de=(Qt.start+Qt.count)*It;Mt!==null&&(Pt=Math.max(Pt,Mt.start*It),de=Math.min(de,(Mt.start+Mt.count)*It)),Ct!==null?(Pt=Math.max(Pt,0),de=Math.min(de,Ct.count)):oe!=null&&(Pt=Math.max(Pt,0),de=Math.min(de,oe.count));const ze=de-Pt;if(ze<0||ze===1/0)return;bt.setup(W,G,_t,K,Ct);let Re,Se=pt;if(Ct!==null&&(Re=ht.get(Ct),Se=tt,Se.setIndex(Re)),W.isMesh)G.wireframe===!0?(E.setLineWidth(G.wireframeLinewidth*Le()),Se.setMode(k.LINES)):Se.setMode(k.TRIANGLES);else if(W.isLine){let rn=G.linewidth;rn===void 0&&(rn=1),E.setLineWidth(rn*Le()),W.isLineSegments?Se.setMode(k.LINES):W.isLineLoop?Se.setMode(k.LINE_LOOP):Se.setMode(k.LINE_STRIP)}else W.isPoints?Se.setMode(k.POINTS):W.isSprite&&Se.setMode(k.TRIANGLES);if(W.isBatchedMesh)if(ge.get("WEBGL_multi_draw"))Se.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const rn=W._multiDrawStarts,wt=W._multiDrawCounts,ln=W._multiDrawCount,ce=Ct?ht.get(Ct).bytesPerElement:1,En=q.get(G).currentProgram.getUniforms();for(let ti=0;ti<ln;ti++)En.setValue(k,"_gl_DrawID",ti),Se.render(rn[ti]/ce,wt[ti])}else if(W.isInstancedMesh)Se.renderInstances(Pt,ze,W.count);else if(K.isInstancedBufferGeometry){const rn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,wt=Math.min(K.instanceCount,rn);Se.renderInstances(Pt,ze,wt)}else Se.render(Pt,ze)};function wf(C,U,K,G){P!==null&&C.isNodeMaterial&&P.setObject(G,C),Gt===!0&&kt.setState(C,K,!1),C.transparent===!0&&C.side===Ee&&C.forceSinglePass===!1?(C.side=nn,C.needsUpdate=!0,zo(C,U,G),C.side=Di,C.needsUpdate=!0,zo(C,U,G),C.side=Ee):zo(C,U,G)}this.compile=function(C,U,K=null){K===null&&(K=C),P!==null&&P.renderStart(C,U,K),b=dt.get(K),b.init(U),S.push(b),K.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),C!==K&&C.traverseVisible(function(W){W.isLight&&W.layers.test(U.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),he=this.localClippingEnabled,Gt=kt.init(this.clippingPlanes,he),Gt===!0&&kt.setGlobalState(this.clippingPlanes,U),P!==null&&Ht.render(b.state.shadowsArray,K,U);const G=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Mt=W.material;if(Mt)if(Array.isArray(Mt))for(let Tt=0;Tt<Mt.length;Tt++){const _t=Mt[Tt];wf(_t,K,U,W),G.add(_t)}else wf(Mt,K,U,W),G.add(Mt)}),b=S.pop(),P!==null&&P.renderEnd(),G},this.compileAsync=function(C,U,K=null){const G=this.compile(C,U,K);return new Promise(W=>{function Mt(){if(G.forEach(function(Tt){const Ct=q.get(Tt).currentProgram;(Ct===void 0||Ct.isReady())&&G.delete(Tt)}),G.size===0){W(C);return}setTimeout(Mt,10)}ge.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Pc=null;function qv(C){Pc&&Pc(C)}function Tf(){ss.stop()}function Ef(){ss.start()}const ss=new bg;ss.setAnimationLoop(qv),typeof self<"u"&&ss.setContext(self),this.setAnimationLoop=function(C){Pc=C,Nt.setAnimationLoop(C),C===null?ss.stop():ss.start()},Nt.addEventListener("sessionstart",Tf),Nt.addEventListener("sessionend",Ef),this.render=function(C,U){if(U!==void 0&&U.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;P!==null&&P.renderStart(C,U);const K=Nt.enabled===!0&&Nt.isPresenting===!0,G=T!==null&&(J===null||K)&&T.begin(R,J);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(U),U=Nt.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,U,J),b=dt.get(C,S.length),b.init(U),b.state.textureUnits=Z.getTextureUnits(),S.push(b),ne.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),rt.setFromProjectionMatrix(ne,ai,U.reversedDepth),he=this.localClippingEnabled,Gt=kt.init(this.clippingPlanes,he),M=xt.get(C,w.length),M.init(),w.push(M),Nt.enabled===!0&&Nt.isPresenting===!0){const Tt=R.xr.getDepthSensingMesh();Tt!==null&&Lc(Tt,U,-1/0,R.sortObjects)}Lc(C,U,0,R.sortObjects),M.finish(),P!==null&&P.updateLights(b.state.lightsArray),R.sortObjects===!0&&M.sort(yt,Lt),Ae=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,Ae&&Zt.addToRenderList(M,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Gt===!0&&kt.beginShadows();const W=b.state.shadowsArray;if(Ht.render(W,C,U),Gt===!0&&kt.endShadows(),(G&&T.hasRenderPass())===!1){const Tt=M.opaque,_t=M.transmissive;if(b.setupLights(),U.isArrayCamera){const Ct=U.cameras;if(_t.length>0)for(let It=0,Qt=Ct.length;It<Qt;It++){const oe=Ct[It];Rf(Tt,_t,C,oe)}Ae&&Zt.render(C);for(let It=0,Qt=Ct.length;It<Qt;It++){const oe=Ct[It];Af(M,C,oe,oe.viewport)}}else _t.length>0&&Rf(Tt,_t,C,U),Ae&&Zt.render(C),Af(M,C,U)}J!==null&&X===0&&(Z.updateMultisampleRenderTarget(J),Z.updateRenderTargetMipmap(J)),G&&T.end(R),C.isScene===!0&&C.onAfterRender(R,C,U),bt.resetDefaultState(),H=-1,$=null,S.pop(),S.length>0?(b=S[S.length-1],Z.setTextureUnits(b.state.textureUnits),Gt===!0&&kt.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?M=w[w.length-1]:M=null,P!==null&&P.renderEnd()};function Lc(C,U,K,G){if(C.visible===!1)return;if(C.layers.test(U.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(U);else if(C.isLightProbeGrid)b.pushLightProbeGrid(C);else if(C.isLight)b.pushLight(C),C.castShadow&&b.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(rt)){G&&Ue.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ne);const Tt=et.update(C),_t=C.material;_t.visible&&M.push(C,Tt,_t,K,Ue.z,null,U)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(rt))){const Tt=et.update(C),_t=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ue.copy(C.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Ue.copy(Tt.boundingSphere.center)),Ue.applyMatrix4(C.matrixWorld).applyMatrix4(ne)),Array.isArray(_t)){const Ct=Tt.groups;for(let It=0,Qt=Ct.length;It<Qt;It++){const oe=Ct[It],Pt=_t[oe.materialIndex];Pt&&Pt.visible&&M.push(C,Tt,Pt,K,Ue.z,oe,U)}}else _t.visible&&M.push(C,Tt,_t,K,Ue.z,null,U)}}const Mt=C.children;for(let Tt=0,_t=Mt.length;Tt<_t;Tt++)Lc(Mt[Tt],U,K,G)}function Af(C,U,K,G){const{opaque:W,transmissive:Mt,transparent:Tt}=C;b.setupLightsView(K),Gt===!0&&kt.setGlobalState(R.clippingPlanes,K),G&&E.viewport(j.copy(G)),W.length>0&&Bo(W,U,K),Mt.length>0&&Bo(Mt,U,K),Tt.length>0&&Bo(Tt,U,K),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function Rf(C,U,K,G){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[G.id]===void 0){const Pt=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[G.id]=new dn(1,1,{generateMipmaps:!0,type:Pt?vn:Sn,minFilter:Ei,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}const Mt=b.state.transmissionRenderTarget[G.id],Tt=G.viewport||j;Mt.setSize(Tt.z*R.transmissionResolutionScale,Tt.w*R.transmissionResolutionScale);const _t=R.getRenderTarget(),Ct=R.getActiveCubeFace(),It=R.getActiveMipmapLevel();R.setRenderTarget(Mt),R.getClearColor(Rt),Ft=R.getClearAlpha(),Ft<1&&R.setClearColor(16777215,.5),R.clear(),Ae&&Zt.render(K);const Qt=R.toneMapping;R.toneMapping=ui;const oe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),Gt===!0&&kt.setGlobalState(R.clippingPlanes,G),Bo(C,K,G),Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let de=0,ze=U.length;de<ze;de++){const Re=U[de],{object:Se,geometry:rn,material:wt,group:ln}=Re;if(wt.side===Ee&&Se.layers.test(G.layers)){const ce=wt.side;wt.side=nn,wt.needsUpdate=!0,Cf(Se,K,G,rn,wt,ln),wt.side=ce,wt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Z.updateMultisampleRenderTarget(Mt),Z.updateRenderTargetMipmap(Mt))}R.setRenderTarget(_t,Ct,It),R.setClearColor(Rt,Ft),oe!==void 0&&(G.viewport=oe),R.toneMapping=Qt}function Bo(C,U,K){const G=U.isScene===!0?U.overrideMaterial:null;for(let W=0,Mt=C.length;W<Mt;W++){const Tt=C[W],{object:_t,geometry:Ct,group:It}=Tt;let Qt=Tt.material;Qt.allowOverride===!0&&G!==null&&(Qt=G),_t.layers.test(K.layers)&&Cf(_t,U,K,Ct,Qt,It)}}function Cf(C,U,K,G,W,Mt){P!==null&&W.isNodeMaterial&&P.setObject(C,W),C.onBeforeRender(R,U,K,G,W,Mt),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(R,U,K,G,C,Mt),W.transparent===!0&&W.side===Ee&&W.forceSinglePass===!1?(W.side=nn,W.needsUpdate=!0,R.renderBufferDirect(K,U,G,W,C,Mt),W.side=Di,W.needsUpdate=!0,R.renderBufferDirect(K,U,G,W,C,Mt),W.side=Ee):R.renderBufferDirect(K,U,G,W,C,Mt),C.onAfterRender(R,U,K,G,W,Mt)}function zo(C,U,K){U.isScene!==!0&&(U=Qe);const G=q.get(C),W=b.state.lights,Mt=b.state.shadowsArray,Tt=W.state.version,_t=ft.getParameters(C,W.state,Mt,U,K,b.state.lightProbeGridArray),Ct=ft.getProgramCacheKey(_t);let It=G.programs;G.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const Qt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;G.envMap=at.get(C.envMap||G.environment,Qt),G.envMapRotation=G.environment!==null&&C.envMap===null?U.environmentRotation:C.envMapRotation,It===void 0&&(C.addEventListener("dispose",jn),It=new Map,G.programs=It);let oe=It.get(Ct);if(oe!==void 0){if(G.currentProgram===oe&&G.lightsStateVersion===Tt)return Lf(C,_t),oe}else _t.uniforms=ft.getUniforms(C),P!==null&&C.isNodeMaterial&&P.build(C,K,_t),C.onBeforeCompile(_t,R),oe=ft.acquireProgram(_t,Ct),It.set(Ct,oe),G.uniforms=_t.uniforms;const Pt=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pt.clippingPlanes=kt.uniform),Lf(C,_t),G.needsLights=Jv(C),G.lightsStateVersion=Tt,G.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.sunLights.value=W.state.sun,Pt.sunLightShadows.value=W.state.sunShadow,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.sunShadowMatrix.value=W.state.sunShadowMatrix,Pt.sunShadowCascade.value=W.state.sunShadowCascade,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=b.state.lightProbeGridArray.length>0,G.currentProgram=oe,G.uniformsList=null,oe}function Pf(C){if(C.uniformsList===null){const U=C.currentProgram.getUniforms();C.uniformsList=Wa.seqWithValue(U.seq,C.uniforms)}return C.uniformsList}function Lf(C,U){const K=q.get(C);K.outputColorSpace=U.outputColorSpace,K.batching=U.batching,K.batchingColor=U.batchingColor,K.instancing=U.instancing,K.instancingColor=U.instancingColor,K.instancingMorph=U.instancingMorph,K.skinning=U.skinning,K.morphTargets=U.morphTargets,K.morphNormals=U.morphNormals,K.morphColors=U.morphColors,K.morphTargetsCount=U.morphTargetsCount,K.numClippingPlanes=U.numClippingPlanes,K.numIntersection=U.numClipIntersection,K.vertexAlphas=U.vertexAlphas,K.vertexTangents=U.vertexTangents,K.toneMapping=U.toneMapping}function Kv(C,U){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;x.setFromMatrixPosition(U.matrixWorld);for(let K=0,G=C.length;K<G;K++){const W=C[K];if(W.texture!==null&&W.boundingBox.containsPoint(x))return W}return null}function Yv(C,U,K,G,W){U.isScene!==!0&&(U=Qe),Z.resetTextureUnits();const Mt=U.fog,Tt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,_t=J===null?R.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:se.workingColorSpace,Ct=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,It=at.get(G.envMap||Tt,Ct),Qt=G.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,oe=!!K.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!K.morphAttributes.position,de=!!K.morphAttributes.normal,ze=!!K.morphAttributes.color;let Re=ui;G.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Re=R.toneMapping);const Se=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,rn=Se!==void 0?Se.length:0,wt=q.get(G),ln=b.state.lights;if(Gt===!0&&(he===!0||C!==$)){const Te=C===$&&G.id===H;kt.setState(G,C,Te)}let ce=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==ln.state.version||wt.outputColorSpace!==_t||W.isBatchedMesh&&wt.batching===!1||!W.isBatchedMesh&&wt.batching===!0||W.isBatchedMesh&&wt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&wt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&wt.instancing===!1||!W.isInstancedMesh&&wt.instancing===!0||W.isSkinnedMesh&&wt.skinning===!1||!W.isSkinnedMesh&&wt.skinning===!0||W.isInstancedMesh&&wt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&wt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&wt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&wt.instancingMorph===!1&&W.morphTexture!==null||wt.envMap!==It||G.fog===!0&&wt.fog!==Mt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==kt.numPlanes||wt.numIntersection!==kt.numIntersection)||wt.vertexAlphas!==Qt||wt.vertexTangents!==oe||wt.morphTargets!==Pt||wt.morphNormals!==de||wt.morphColors!==ze||wt.toneMapping!==Re||wt.morphTargetsCount!==rn||!!wt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ce=!0):(ce=!0,wt.__version=G.version);let En=wt.currentProgram;ce===!0&&(En=zo(G,U,W),P&&G.isNodeMaterial&&P.onUpdateProgram(G,En,wt));let ti=!1,Oi=!1,Rs=!1;const ye=En.getUniforms(),Oe=wt.uniforms;if(E.useProgram(En.program)&&(ti=!0,Oi=!0,Rs=!0),G.id!==H&&(H=G.id,Oi=!0),wt.needsLights){const Te=Kv(b.state.lightProbeGridArray,W);wt.lightProbeGrid!==Te&&(wt.lightProbeGrid=Te,Oi=!0)}if(ti||$!==C){E.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),ye.setValue(k,"projectionMatrix",C.projectionMatrix),ye.setValue(k,"viewMatrix",C.matrixWorldInverse);const zi=ye.map.cameraPosition;zi!==void 0&&zi.setValue(k,be.setFromMatrixPosition(C.matrixWorld)),D.logarithmicDepthBuffer&&ye.setValue(k,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ye.setValue(k,"isOrthographic",C.isOrthographicCamera===!0),$!==C&&($=C,Oi=!0,Rs=!0)}if(wt.needsLights&&(ln.state.sunShadowMap.length>0&&ye.setValue(k,"sunShadowMap",ln.state.sunShadowMap,Z),ln.state.directionalShadowMap.length>0&&ye.setValue(k,"directionalShadowMap",ln.state.directionalShadowMap,Z),ln.state.spotShadowMap.length>0&&ye.setValue(k,"spotShadowMap",ln.state.spotShadowMap,Z),ln.state.pointShadowMap.length>0&&ye.setValue(k,"pointShadowMap",ln.state.pointShadowMap,Z)),W.isSkinnedMesh){ye.setOptional(k,W,"bindMatrix"),ye.setOptional(k,W,"bindMatrixInverse");const Te=W.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ye.setValue(k,"boneTexture",Te.boneTexture,Z))}W.isBatchedMesh&&(ye.setOptional(k,W,"batchingTexture"),ye.setValue(k,"batchingTexture",W._matricesTexture,Z),ye.setOptional(k,W,"batchingIdTexture"),ye.setValue(k,"batchingIdTexture",W._indirectTexture,Z),ye.setOptional(k,W,"batchingColorTexture"),W._colorsTexture!==null&&ye.setValue(k,"batchingColorTexture",W._colorsTexture,Z));const Bi=K.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&F.update(W,K,En),(Oi||wt.receiveShadow!==W.receiveShadow)&&(wt.receiveShadow=W.receiveShadow,ye.setValue(k,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Oe.envMapIntensity.value=U.environmentIntensity),Oe.dfgLUT!==void 0&&(Oe.dfgLUT.value=O2()),Oi){if(ye.setValue(k,"toneMappingExposure",R.toneMappingExposure),wt.needsLights&&Zv(Oe,Rs),Mt&&G.fog===!0&&Ut.refreshFogUniforms(Oe,Mt),Ut.refreshMaterialUniforms(Oe,G,Y,V,b.state.transmissionRenderTarget[C.id]),wt.needsLights&&wt.lightProbeGrid){const Te=wt.lightProbeGrid;Oe.probesSH.value=Te.texture,Oe.probesMin.value.copy(Te.boundingBox.min),Oe.probesMax.value.copy(Te.boundingBox.max),Oe.probesResolution.value.copy(Te.resolution)}Wa.upload(k,Pf(wt),Oe,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Wa.upload(k,Pf(wt),Oe,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ye.setValue(k,"center",W.center),ye.setValue(k,"modelViewMatrix",W.modelViewMatrix),ye.setValue(k,"normalMatrix",W.normalMatrix),ye.setValue(k,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const Te=G.uniformsGroups;for(let zi=0,Cs=Te.length;zi<Cs;zi++){const If=Te[zi];nt.update(If,En),nt.bind(If,En)}}return En}function Zv(C,U){C.ambientLightColor.needsUpdate=U,C.lightProbe.needsUpdate=U,C.sunLights.needsUpdate=U,C.sunLightShadows.needsUpdate=U,C.directionalLights.needsUpdate=U,C.directionalLightShadows.needsUpdate=U,C.pointLights.needsUpdate=U,C.pointLightShadows.needsUpdate=U,C.spotLights.needsUpdate=U,C.spotLightShadows.needsUpdate=U,C.rectAreaLights.needsUpdate=U,C.hemisphereLights.needsUpdate=U}function Jv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(C,U,K){const G=q.get(C);G.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(C.texture).__webglTexture=U,q.get(C.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:K,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,U){const K=q.get(C);K.__webglFramebuffer=U,K.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(C,U=0,K=0){J=C,B=U,X=K;let G=null,W=!1,Mt=!1;if(C){const _t=q.get(C);if(_t.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(k.FRAMEBUFFER,_t.__webglFramebuffer),j.copy(C.viewport),vt.copy(C.scissor),gt=C.scissorTest,E.viewport(j),E.scissor(vt),E.setScissorTest(gt),H=-1;return}else if(_t.__webglFramebuffer===void 0)Z.setupRenderTarget(C);else if(_t.__hasExternalTextures)Z.rebindTextures(C,q.get(C.texture).__webglTexture,q.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Qt=C.depthTexture;if(_t.__boundDepthTexture!==Qt){if(Qt!==null&&q.has(Qt)&&(C.width!==Qt.image.width||C.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(C)}}const Ct=C.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Mt=!0);const It=q.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(It[U])?G=It[U][K]:G=It[U],W=!0):C.samples>0&&Z.useMultisampledRTT(C)===!1?G=q.get(C).__webglMultisampledFramebuffer:Array.isArray(It)?G=It[K]:G=It,j.copy(C.viewport),vt.copy(C.scissor),gt=C.scissorTest}else j.copy(st).multiplyScalar(Y).floor(),vt.copy(Xt).multiplyScalar(Y).floor(),gt=Pe;if(K!==0&&(G=I),E.bindFramebuffer(k.FRAMEBUFFER,G)&&E.drawBuffers(C,G),E.viewport(j),E.scissor(vt),E.setScissorTest(gt),W){const _t=q.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,K)}else if(Mt){const _t=U;for(let Ct=0;Ct<C.textures.length;Ct++){const It=q.get(C.textures[Ct]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ct,It.__webglTexture,K,_t)}}else if(C!==null&&K!==0){const _t=q.get(C.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_t.__webglTexture,K)}H=-1};function Nf(C){const U=q.get(C);return(U.__readFormat!==C.format||U.__readType!==C.type)&&(U.__readFormat=C.format,U.__readType=C.type,U.__formatReadable=D.textureFormatReadable(C.format),U.__typeReadable=D.textureTypeReadable(C.type)),U}this.readRenderTargetPixels=function(C,U,K,G,W,Mt,Tt,_t=0){if(!(C&&C.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=q.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ct=Ct[Tt]),Ct){E.bindFramebuffer(k.FRAMEBUFFER,Ct);try{const It=C.textures[_t],Qt=It.format,oe=It.type;C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_t);const Pt=Nf(It);if(Pt.__formatReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=C.width-G&&K>=0&&K<=C.height-W&&k.readPixels(U,K,G,W,mt.convert(Qt),mt.convert(oe),Mt)}finally{const It=J!==null?q.get(J).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(C,U,K,G,W,Mt,Tt,_t=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=q.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ct=Ct[Tt]),Ct)if(U>=0&&U<=C.width-G&&K>=0&&K<=C.height-W){E.bindFramebuffer(k.FRAMEBUFFER,Ct);const It=C.textures[_t],Qt=It.format,oe=It.type;C.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_t);const Pt=Nf(It);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,de),k.bufferData(k.PIXEL_PACK_BUFFER,Mt.byteLength,k.STREAM_READ),k.readPixels(U,K,G,W,mt.convert(Qt),mt.convert(oe),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const ze=J!==null?q.get(J).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,ze);const Re=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await LM(k,Re,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,de),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Mt),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(de),k.deleteSync(Re),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,U=null,K=0){const G=Math.pow(2,-K),W=Math.floor(C.image.width*G),Mt=Math.floor(C.image.height*G),Tt=U!==null?U.x:0,_t=U!==null?U.y:0;Z.setTexture2D(C,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,Tt,_t,W,Mt),E.unbindTexture()},this.copyTextureToTexture=function(C,U,K=null,G=null,W=0,Mt=0){let Tt,_t,Ct,It,Qt,oe,Pt,de,ze;const Re=C.isCompressedTexture?C.mipmaps[Mt]:C.image;if(K!==null)Tt=K.max.x-K.min.x,_t=K.max.y-K.min.y,Ct=K.isBox3?K.max.z-K.min.z:1,It=K.min.x,Qt=K.min.y,oe=K.isBox3?K.min.z:0;else{const Oe=Math.pow(2,-W);Tt=Math.floor(Re.width*Oe),_t=Math.floor(Re.height*Oe),C.isDataArrayTexture?Ct=Re.depth:C.isData3DTexture?Ct=Math.floor(Re.depth*Oe):Ct=1,It=0,Qt=0,oe=0}G!==null?(Pt=G.x,de=G.y,ze=G.z):(Pt=0,de=0,ze=0);const Se=mt.convert(U.format),rn=mt.convert(U.type);let wt;U.isData3DTexture?(Z.setTexture3D(U,0),wt=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),wt=k.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),wt=k.TEXTURE_2D),E.activeTexture(k.TEXTURE0),E.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),E.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),E.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);const ln=E.getParameter(k.UNPACK_ROW_LENGTH),ce=E.getParameter(k.UNPACK_IMAGE_HEIGHT),En=E.getParameter(k.UNPACK_SKIP_PIXELS),ti=E.getParameter(k.UNPACK_SKIP_ROWS),Oi=E.getParameter(k.UNPACK_SKIP_IMAGES);E.pixelStorei(k.UNPACK_ROW_LENGTH,Re.width),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Re.height),E.pixelStorei(k.UNPACK_SKIP_PIXELS,It),E.pixelStorei(k.UNPACK_SKIP_ROWS,Qt),E.pixelStorei(k.UNPACK_SKIP_IMAGES,oe);const Rs=C.isDataArrayTexture||C.isData3DTexture,ye=U.isDataArrayTexture||U.isData3DTexture;if(C.isDepthTexture){const Oe=q.get(C),Bi=q.get(U),Te=q.get(Oe.__renderTarget),zi=q.get(Bi.__renderTarget);E.bindFramebuffer(k.READ_FRAMEBUFFER,Te.__webglFramebuffer),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Cs=0;Cs<Ct;Cs++)Rs&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,q.get(C).__webglTexture,W,oe+Cs),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,q.get(U).__webglTexture,Mt,ze+Cs)),k.blitFramebuffer(It,Qt,Tt,_t,Pt,de,Tt,_t,k.DEPTH_BUFFER_BIT,k.NEAREST);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(W!==0||C.isRenderTargetTexture||q.has(C)){const Oe=q.get(C),Bi=q.get(U);E.bindFramebuffer(k.READ_FRAMEBUFFER,L),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,O);for(let Te=0;Te<Ct;Te++)Rs?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Oe.__webglTexture,W,oe+Te):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Oe.__webglTexture,W),ye?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Bi.__webglTexture,Mt,ze+Te):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Bi.__webglTexture,Mt),W!==0?k.blitFramebuffer(It,Qt,Tt,_t,Pt,de,Tt,_t,k.COLOR_BUFFER_BIT,k.NEAREST):ye?k.copyTexSubImage3D(wt,Mt,Pt,de,ze+Te,It,Qt,Tt,_t):k.copyTexSubImage2D(wt,Mt,Pt,de,It,Qt,Tt,_t);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ye?C.isDataTexture||C.isData3DTexture?k.texSubImage3D(wt,Mt,Pt,de,ze,Tt,_t,Ct,Se,rn,Re.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(wt,Mt,Pt,de,ze,Tt,_t,Ct,Se,Re.data):k.texSubImage3D(wt,Mt,Pt,de,ze,Tt,_t,Ct,Se,rn,Re):C.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Mt,Pt,de,Tt,_t,Se,rn,Re.data):C.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Mt,Pt,de,Re.width,Re.height,Se,Re.data):k.texSubImage2D(k.TEXTURE_2D,Mt,Pt,de,Tt,_t,Se,rn,Re);E.pixelStorei(k.UNPACK_ROW_LENGTH,ln),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ce),E.pixelStorei(k.UNPACK_SKIP_PIXELS,En),E.pixelStorei(k.UNPACK_SKIP_ROWS,ti),E.pixelStorei(k.UNPACK_SKIP_IMAGES,Oi),Mt===0&&U.generateMipmaps&&k.generateMipmap(wt),E.unbindTexture()},this.initRenderTarget=function(C){q.get(C).__webglFramebuffer===void 0&&Z.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Z.setTextureCube(C,0):C.isData3DTexture?Z.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Z.setTexture2DArray(C,0):Z.setTexture2D(C,0),E.unbindTexture()},this.resetState=function(){B=0,X=0,J=null,E.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}function z2(n){if(n.name)return n.name;if(n.parent?.name)return n.parent.name;const t=n.geometry;return`${n.type}:${t.type}:${t.getAttribute("position")?.count??0}`}function H2(n,t,e=14){t.updateMatrixWorld();const i=new Do().setFromProjectionMatrix(new Bt().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse)),s=new Un,r=new Map;n.traverseVisible(a=>{if(!(a instanceof $t)&&!(a instanceof lc))return;const c=a.geometry;if(a.frustumCulled&&(c.boundingSphere||c.computeBoundingSphere(),s.copy(c.boundingSphere).applyMatrix4(a.matrixWorld),!(a instanceof Ve)&&!i.intersectsSphere(s)))return;const l=a instanceof lc?0:(c.index?c.index.count:c.getAttribute("position")?.count??0)/3,u=a instanceof Ve?a.count:1,h=z2(a),f=r.get(h)??{meshes:0,triangles:0};f.meshes+=1,f.triangles+=Math.round(l*u),r.set(h,f)});const o=[...r.entries()].map(([a,c])=>({source:a,...c})).sort((a,c)=>c.triangles-a.triangles);return{rows:o.slice(0,e),total:o.reduce((a,c)=>a+c.triangles,0)}}function V2(n,t,e,i){const s=a=>{const c=n.getContext(),l=new Uint8Array(4),u=performance.now();for(let d=0;d<a;d++)n.info.reset(),t.render(),c.readPixels(0,0,1,1,c.RGBA,c.UNSIGNED_BYTE,l);const{geometries:h,textures:f}=n.info.memory;return{msPerFrame:(performance.now()-u)/a,calls:n.info.render.calls,triangles:n.info.render.triangles,geometries:h,textures:f,programs:n.info.programs?.length??0}},r=async a=>{e.render();const c=await new Promise(u=>n.domElement.toBlob(u,"image/png"));if(!c)return"khong chup duoc";const l=await fetch(`/__shot?name=${encodeURIComponent(a)}`,{method:"POST",body:c});return l.ok?`shots/${a}.png`:`loi ${l.status}`},o=a=>H2(i.scene,i.camera,a);window.__skyrun={...e,bench:s,shot:r,diag:o}}const G2=5,W2=450;function X2(n,t){let e=0;return{spawn(i,s,r){const o=t();if(!o||e>=G2||!Number.isFinite(i)||!Number.isFinite(s)){r();return}const a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),l=a.left+a.width*.25-c.left,u=a.top+a.height*.5-c.top,h=document.createElement("div");h.className="collect-streak",h.style.left=`${i}px`,h.style.top=`${s}px`,n.appendChild(h),e++;const f=(i+l)/2-(l-i)*.15,d=Math.min(s,u)-60,p=h.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${f-i}px), calc(-50% + ${d-s}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-i}px), calc(-50% + ${u-s}px)) scale(0.55)`,opacity:.9}],{duration:W2,easing:"cubic-bezier(.5,0,.9,.6)"});p.onfinish=p.oncancel=()=>{h.remove(),e--,r()}}}}const $2=`
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
}`,q2=`
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
}`,Ir=1.1,K2=1.3,Y2=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],Xa={request:0};function Z2(n){const t=n?.041666666666666664:.025,e=Math.ceil(Ir/t)+2,i=[0,1].map(()=>Array.from({length:e},()=>({p:new N,t:-99,k:0,c:0}))),s=2*e*2,r=new Float32Array(s*3),o=new Float32Array(s*3),a=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),h=[];for(let A=0;A<2;A++)for(let P=0;P<e;P++){const I=(A*e+P)*2;l[I]=-1,l[I+1]=1,P<e-1&&h.push(I,I+1,I+2,I+1,I+3,I+2)}const f=new Yt,d={position:[r,3],aCol:[o,3],aAge:[a,1],aK:[c,1],aSide:[l,1],aAlong:[u,1]};for(const[A,[P,I]]of Object.entries(d))f.setAttribute(A,new St(P,I));f.setIndex(h),f.setDrawRange(0,0);const p=["position","aCol","aAge","aK","aAlong"].map(A=>f.getAttribute(A)),v=new ae({vertexShader:$2,fragmentShader:q2,uniforms:_n.merge([lt.fog]),transparent:!0,depthWrite:!1,side:Ee,fog:!0}),m=new $t(f,v);m.frustumCulled=!1,m.renderOrder=3;const g=new N,y=new N,_=new N,x=new N,M=new N,b=new N;let w=0,S=-99,T=-99,R=!1;return{mesh:m,update(A,P,I,L,O){Xa.request>0&&(w=Xa.request,Xa.request=0),L>0&&(w=Math.max(0,w-L));const B=A.mode==="run",X=B&&A.smokeT>0?Math.min(1,A.smokeT/K2):0,J=B&&w>0?.75*Math.min(1,w/.8):0,H=Math.max(X,J);if(H>0)I-T>Ir&&i.forEach((Rt,Ft)=>Rt.forEach(zt=>(zt.p.copy(P[Ft]),zt.t=-99,zt.k=0))),T=I;else if(I-T>Ir){R&&f.setDrawRange(0,0),R=!1;return}R=!0,f.setDrawRange(0,1/0);const $=mn(A.z);g.set(Math.sin($),Pi(A.z),Math.cos($)).normalize(),y.set(Math.cos($),0,-Math.sin($));const j=B?A.speed:0,vt=Math.sign((P[0].x-P[1].x)*y.x+(P[0].z-P[1].z)*y.z)||1,gt=L>0&&I-S>=t;gt&&(S=I),i.forEach((Rt,Ft)=>{const zt=H*(H+(1-H)*Math.max(0,Math.sin(I*21+Ft*2))),V=X>0?(A.smokes+2)%3:Ft===0?1:2;if(gt){const Lt=Rt.pop();Rt.unshift(Lt)}const Y=Rt[0];Y.p.copy(P[Ft]),gt&&(Y.t=I),Y.k=zt,Y.c=V;const yt=Ft===0?vt:-vt;for(let Lt=1;Lt<e&&L>0;Lt++){const st=Rt[Lt],Xt=Math.min(Ir,I-st.t),Pe=Math.max(0,j-5-18*Xt),rt=Math.sin(I*7+st.t*13);st.p.addScaledVector(g,Pe*L).addScaledVector(y,(yt*1.6+rt*.7)*L),st.p.y+=(-1+Math.cos(I*6+st.t*11)*.5)*L}b.copy(y);for(let Lt=0;Lt<e;Lt++){const st=Rt[Lt],Xt=I-st.t,Pe=Math.min(1,Xt/Ir);_.subVectors(Rt[Math.max(0,Lt-1)].p,Rt[Math.min(e-1,Lt+1)].p),_.lengthSq()<1e-6&&_.copy(g),x.subVectors(O,st.p),M.crossVectors(_,x),M.lengthSq()<.03*_.lengthSq()*x.lengthSq()?M.copy(b):M.normalize(),M.dot(b)<0&&M.negate(),b.copy(M);const rt=(.14+.9*(1-Math.exp(-Xt/.4)))*(.45+.55*st.k),Gt=(Ft*e+Lt)*2;r[Gt*3]=st.p.x-M.x*rt,r[Gt*3+1]=st.p.y-M.y*rt,r[Gt*3+2]=st.p.z-M.z*rt,r[Gt*3+3]=st.p.x+M.x*rt,r[Gt*3+4]=st.p.y+M.y*rt,r[Gt*3+5]=st.p.z+M.z*rt;const he=Y2[st.c];o.set(he,Gt*3),o.set(he,Gt*3+3),a[Gt]=a[Gt+1]=Pe,c[Gt]=c[Gt+1]=st.t<0?0:st.k,u[Gt]=u[Gt+1]=st.t}});for(const Rt of p)Rt.needsUpdate=!0}}}function J2(n,t,e,i,s,r,o,a){const c=X2(n,()=>n.querySelector(".hud-lantern")),l=new N,u=document.createElement("div");u.className="flash",n.appendChild(u);const h=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(f,d){if(!f.length)return;i.events(f,d.mode==="run"),s.events(f,d);const{x:p,y:v}=ue(d.z,d.x,d.v,{x:0,y:0,z:0});for(const m of f)if(m.type==="lantern")e.burst(p,v+.5,d.z+3,16,!0),r.spawn(p,v+.2,d.z+.6),l.set(p,v+.3,d.z+3).project(a),c.spawn((l.x*.5+.5)*n.clientWidth,(.5-l.y*.5)*n.clientHeight,()=>s.bumpLantern());else if(m.type==="near-miss")t.shake(.06),h();else if(m.type==="hurt"||m.type==="crash"){const g=m.type==="crash";t.shake(g?.9:.45),o.spawn(p,v,d.z+.3,es(d.z)?"village":m.kind==="bridge"?"cloth":"rock",g),g||h()}else m.type==="booster"?e.burst(p,v,d.z+3,40,!0):m.type==="gust"&&m.full?Xa.request=1.5:m.type==="section"&&m.open&&d.mode==="run"&&i.reveal()}}}const _p=20.5,Q2=17.5,Mp=.1,j2=.05,tE=3,eE=.5,nE=2.5,iE=8;class sE{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(t,e){this.minScale=t,this.hooks=e}sample(t){if(t<=0||t>.1||(this.clock+=t,this.warm+=t,this.sinceChange+=t,this.warm<tE||this.sinceChange<eE)||(this.seeded||(this.ema=t*1e3,this.seeded=!0),this.ema+=(t*1e3-this.ema)*.05,this.verify&&this.sinceChange>=nE&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>_p?this.slowFor+t:0,this.fastFor=this.ema<Q2?this.fastFor+t:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>_p?this.floorSlowFor+t:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const t=this.verify;this.verify=null,!(this.ema<t.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(t.prev))}down(t){if(this.slowFor=0,!t){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-Mp));return}this.floorSlowFor<iE||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+Mp)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const t=Math.min(1,this.scale+j2);t<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(t))??0)||this.apply(t)}key(t){return Math.round(t*100)}apply(t){this.scale=Math.round(t*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const Tl={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},Pg="skyrun.quality",rE=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function oE(){try{const n=document.createElement("canvas").getContext("webgl2");if(!n)return"no-webgl2";const t=n.getExtension("WEBGL_debug_renderer_info"),e=String(t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER));return n.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function aE(n){const t=navigator;return n==="no-webgl2"||rE.test(n)||(t.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function yp(n){return n==="low"||n==="mid"||n==="high"}function cE(n){const t=oE(),e=n.get("q");if(yp(e))return{...Tl[e],gpu:t,source:"url"};let i=null;try{const[s,r]=(localStorage.getItem(Pg)??"").split("|");Date.now()-Number(r)<3*864e5&&(i=s??null)}catch{}return yp(i)?{...Tl[i],gpu:t,source:"saved"}:{...Tl[aE(t)],gpu:t,source:"guess"}}function lE(n){try{localStorage.setItem(Pg,`${n}|${Date.now()}`)}catch{}}function uE(n){return n==="high"?"mid":n==="mid"?"low":null}function hE(n){const t=()=>Math.min(window.devicePixelRatio,n.tier.maxDpr);let e=!1;const i=new sE(n.tier.minScale,{setScale(c){const l=t()*c;n.renderer.setPixelRatio(l),n.post.setPixelRatio(l),n.resize()},degrade(){const c=uE(n.tier.name);return c&&!e&&n.tier.source!=="url"&&(lE(c),e=!0),n.post.setLite()}});let s=performance.now(),r=0,o=s;const a=c=>{const l=(c-s)/1e3;if(n.tick(Math.min(.1,l)),s=c,n.renderer.info.reset(),n.post.render(),i.sample(l),r++,c-o>500){const u=n.renderer.info.render,h=(r*1e3/(c-o)).toFixed(0);n.stats?.(`${h} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${n.tier.name} (${n.tier.source}) · độ phân giải ${Math.round(i.scale*100)}% · ${i.frameMs().toFixed(1)} ms
${n.worldLine()}`),r=0,o=c}requestAnimationFrame(a)};return requestAnimationFrame(a),i}const Lg=Ge.routeVersion,fE=7*3600*1e3;function eh(n){const t=new Date(n.getTime()+fE);return`${`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}.${Ge.routePrefix}${Lg}`}function dE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0||1}function pE(n){let t=n;return()=>{const e=eh(new Date);return{route:e,seed:n?t++:dE(e)}}}function bp(n){const t=/^\d{4}-(\d{2})-(\d{2})/.exec(n);return t?`${t[2]}/${t[1]}`:n}const nh=20,Ng=2*Math.PI*nh,mE=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${nh}" class="track"/>
  <circle cx="24" cy="24" r="${nh}" class="arc" stroke-dasharray="${Ng.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function gE(n,t){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${mE}<b>Đèn ×2</b>`,n.appendChild(e);const i=e.querySelector(".arc");let s=!1,r=!1,o="";return{update(a){const c=a.smokeT>0&&a.mode!=="over";if(c!==s&&(s=c,e.classList.toggle("on",s),t.classList.toggle("x2",s)),!s)return;const l=(Ng*(1-a.smokeT/it.smokeTime)).toFixed(1);l!==o&&i.setAttribute("stroke-dashoffset",o=l);const u=a.smokeT<1.5;u!==r&&e.classList.toggle("ending",r=u)}}}const vE={hurt:"heart",thermal:"thermal",shield:"parachute",wind:"wind"},xE={thermal:"Lên cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${it.smokeLanternMul} trong ${it.smokeTime} giây`},Sp=2*Math.PI*24,_E=1.1,El=n=>Math.floor(n).toLocaleString("vi-VN"),wp=n=>`×${n.toFixed(1).replace(".",",")}`;function ME(n){const t=document.createElement("div");t.className="hud",t.innerHTML=`
    <div class="hud-left">
      <div class="hud-dist-row"><div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div><span class="hud-rank-slot"></span></div>
      <div class="hud-score">${Et.star}<b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời">
        <div class="hud-day-track"><span class="mk" style="left:24%">${Et.sun}</span><span class="mk" style="left:64%">${Et.moon}</span><span class="mk" style="left:86%">${Et.lantern}</span><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span class="hud-day-no" data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${Et.heart.repeat(it.maxHp)}</div>
      <div class="hud-lantern">${Et.lantern}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><svg viewBox="0 0 54 54" aria-hidden="true"><circle class="bg" cx="27" cy="27" r="26"/><circle class="arc" data-k="combo" cx="27" cy="27" r="24" stroke-dasharray="${Sp.toFixed(1)}"/></svg><span data-k="mult">×1,0</span></div>
    </div>
    <div class="hud-boost"><div class="hud-pill" data-k="thermal">${Et.thermal}<b>Luồng nhiệt</b><i data-k="thermalBar"></i></div></div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-vignette" data-k="vig"></div>
    <div class="hud-stats" data-k="stats"></div>`,n.appendChild(t);const e=A=>t.querySelector(`[data-k="${A}"]`),i=["dist","score","sun","dayNo","period","lanterns","mult","multBox","combo","thermal","thermalBar","toasts","sections","stats","vig"],{dist:s,score:r,sun:o,dayNo:a,period:c,lanterns:l,mult:u,multBox:h,combo:f,thermal:d,thermalBar:p,toasts:v,sections:m,stats:g,vig:y}=Object.fromEntries(i.map(A=>[A,e(A)])),_=t.querySelector(".hud-lantern"),x=[...e("hearts").children],M=gE(t.querySelector(".hud-right"),_);let b=0,w=null,S="";const T=(A,P,I)=>{const L=document.createElement("div");L.className=`hud-toast ${P}${I?` ${I}`:""}`;const O=I&&vE[I];O&&(L.innerHTML=Et[O]),L.append(A);const B=P==="section"?m:v;for(B.appendChild(L);B.children.length>(P==="section"?1:2);)B.firstChild.remove();return setTimeout(()=>L.remove(),P==="section"?2600:1100),L},R=(A,P)=>{const I=P>1?`SƯỢT! ${wp(A.mult)}`:"SƯỢT!",L=performance.now()/1e3;w&&w.el.isConnected&&L-w.at<_E?(w.el.textContent=I,w.el.classList.remove("bump"),w.el.offsetWidth,w.el.classList.add("bump"),clearTimeout(w.timer)):w={el:T(I,"combo"),at:L,timer:0},w.at=L;const O=w.el;w.timer=window.setTimeout(()=>O.remove(),1100)};return{toast:(A,P,I)=>{T(A,P,I)},setVisible(A){t.classList.toggle("hidden",!A)},bumpLantern(){_.classList.remove("got"),_.getBoundingClientRect(),_.classList.add("got")},setStats(A){g.textContent=A},setPilotBox(A){const P=n.clientHeight,I=A?A.y+A.h+16:0,L=!A||n.clientWidth>600?"":I<=P-150?`t${Math.round(I)}`:`b${Math.round(P-A.y+16)}`;L!==S&&(S=L,v.style.top=L[0]==="t"?`${L.slice(1)}px`:L?"auto":"",v.style.bottom=L[0]==="b"?`${L.slice(1)}px`:L?"auto":"")},update(A,P){s.textContent=El(A.z),r.textContent=El(_s(A)),o.style.left=`${(P.u*100).toFixed(1)}%`;const I=`Ngày ${P.day}`;a.textContent!==I&&(a.textContent=I);const L=z_(P);c.textContent!==L&&(c.textContent=L),l.textContent=El(A.lanterns),u.textContent=wp(A.mult),h.classList.toggle("hot",A.mult>1.05);const O=A.combo>0?Math.max(0,1-A.comboT/it.comboBreak):0;f.style.strokeDashoffset=(Sp*(1-O)).toFixed(1),d.classList.toggle("on",A.thermalT>0),p.style.transform=`scaleX(${A.thermalT/it.thermalTime})`,x.forEach((X,J)=>X.classList.toggle("lost",J>=A.hp)),t.classList.toggle("low-hp",A.mode==="run"&&A.hp===1&&it.maxHp>1),M.update(A);const B=N0(P);B>b&&A.mode==="run"&&T(B%3===0?`Ngày ${P.day} · ${R0[P.region]}`:B%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),b=A.mode==="run"?Math.max(b,B):0},zone(A){const P=le.zoneNames?.[A];P&&T(P,"section")},events(A,P){for(const I of A)if(I.type==="near-miss")R(P,I.combo);else if(I.type==="hurt"){T(I.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt");for(const L of[x[I.hp],y])L?.classList.remove("hit"),L?.getBoundingClientRect(),L?.classList.add("hit")}else I.type==="booster"&&I.kind!=="lantern"?T(xE[I.kind],"big",I.kind):I.type==="gust"?T(I.full?`Trọn chuỗi gió! +${it.gustChainScore}`:`Gió xuôi ×${I.chain}`,I.full?"big":"combo","wind"):I.type==="section"&&P.mode==="run"&&!le.zoneNames&&T(I.open?qn(P.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const yE=30,Tp={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},bE=10,SE=34,wE=260,TE=180,EE=.26,Ep=300;function AE(n,t,e){const i=[],s=[],r=new Map;let o=!1;const a=new Map;let c=null,l=0,u=0,h=-1,f=0;const d=[],p=(_,x)=>{t()&&d.forEach(M=>M(_,x))};let v=null,m=0,g=0;window.addEventListener("keydown",_=>{if(_.repeat)return;const x=Tp[_.code];if(x){i.push(x),x==="down"&&(o=!0),_.preventDefault();const M=performance.now();x===v&&x!=="down"&&M-m<Ep?(p(x==="up"?"flip":"roll",x==="right"?-1:1),v=null):(v=x,m=M)}(_.code==="Space"||_.code==="Enter")&&(s.forEach(M=>M(_.code)),_.preventDefault()),r.get(_.code)?.()}),window.addEventListener("keyup",_=>{Tp[_.code]==="down"&&(o=!1)}),n.addEventListener("touchstart",_=>{const x=performance.now();for(const M of Array.from(_.changedTouches))a.set(M.identifier,{x0:M.clientX,y0:M.clientY,t0:x,hist:[{y:M.clientY,t:x}],hx:[{x:M.clientX,t:x}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),n.addEventListener("touchmove",_=>{_.preventDefault();const x=performance.now();for(const M of Array.from(_.changedTouches)){const b=a.get(M.identifier);if(!b)continue;for(b.hist.push({y:M.clientY,t:x});b.hist.length>1&&x-b.hist[0].t>wE;)b.hist.shift();const w=M.clientY-b.hist[0].y;for(x>=b.cool&&Math.abs(w)>=SE&&(i.push(w<0?"up":"down"),w<0&&x-g<Ep+150?(p("flip",1),g=0):w<0&&(g=x),b.down=w>0&&c!==M.identifier,b.flicked=!0,b.cool=x+150,b.hist=[{y:M.clientY,t:x}]),b.hx.push({x:M.clientX,t:x});b.hx.length>1&&x-b.hx[0].t>TE;)b.hx.shift();const S=M.clientX-b.hx[0].x;x>=b.rollCool&&Math.abs(S)>=n.clientWidth*EE&&(p("roll",S>0?-1:1),b.rollCool=x+700,b.hx=[{x:M.clientX,t:x}]);const T=M.clientX-b.x0;b.dragX===null&&Math.abs(T)>=bE&&Math.abs(T)>=Math.abs(M.clientY-b.y0)*.8&&(b.dragX=M.clientX,c===null&&(c=M.identifier,b.down=!1,u++,l=0)),c===M.identifier&&b.dragX!==null&&(l=(M.clientX-b.dragX)/Math.max(1,n.clientWidth))}},{passive:!1});const y=_=>{const x=performance.now();for(const M of Array.from(_.changedTouches)){const b=a.get(M.identifier);if(a.delete(M.identifier),c===M.identifier&&(c=null),!b||b.flicked||b.dragX!==null||_.type==="touchcancel")continue;Math.hypot(M.clientX-b.x0,M.clientY-b.y0)<=14&&x-b.t0<=350&&t()?i.push(M.clientX<n.clientWidth/2?"left":"right"):t()||s.forEach(S=>S())}};return n.addEventListener("touchend",y),n.addEventListener("touchcancel",y),n.addEventListener("mousedown",()=>s.forEach(_=>_())),{take(){return i.splice(0,i.length)},holdDown:()=>o||Array.from(a.values()).some(_=>_.down),steer(){if(c===null)return null;h!==u&&(h=u,f=e());let _=f-l*yE;const x=Math.abs(_)-it.steerMax;return x>0&&(f-=Math.sign(_)*x,_-=Math.sign(_)*x),_},onAction(_){s.push(_)},onKey(_,x){r.set(_,x)},onTrick(_){d.push(_)}}}function Ig(n){return/\.github\.io$/.test(location.hostname)||n.has("portal")}function Dg(n){return!Ge.online||n.has("seed")||n.has("z")||n.get("auto")==="1"?!1:Ig(n)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function RE(n){return Dg(n)&&!n.has("alt")}function CE(n){const t={};let e=null;async function i(o,a={}){try{const c={...t,accept:"application/json"};a.body&&(c["content-type"]="application/json");const l=await fetch(o,{...a,headers:c,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function s(o,a={}){const c=await i(o,a);return e="fail"in c?c.fail:null,"ok"in c?c.ok:null}const r=encodeURIComponent;return{board:o=>s(`api/ghosts?route=${r(o)}`),async paths(o,a){return a.length?(await s(`api/ghosts/paths?route=${r(o)}&pids=${a.map(r).join(",")}`))?.paths??{}:{}},leaderboard:(o="meters")=>i(`api/leaderboard?by=${o}&map=${Ge.id}`),progress:()=>s("api/progress"),submit:(o,a)=>s("api/ghosts",{method:"POST",body:JSON.stringify({route:o,...a})}),lastFailure:()=>e,async logRun(o){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(o),headers:{...t,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const o=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return o?o.type==="opaqueredirect"||o.status===401?"auth":o.ok?"ok":"network":"network"}}}const hc=10,PE=60/hc,ih=900*hc,Al=n=>Math.max(-32768,Math.min(32767,Math.round(n*100)));function LE(n){const t=Math.min(ih,Math.floor(n.length/3)),e=new DataView(new ArrayBuffer(4+t*6)),i=n[0]??0;e.setFloat32(0,i,!0);let s=e.getFloat32(0,!0);for(let a=0;a<t;a++){const c=Al(n[a*3]-s);s+=c/100,e.setInt16(4+a*6,c,!0),e.setInt16(6+a*6,Al(n[a*3+1]),!0),e.setInt16(8+a*6,Al(n[a*3+2]),!0)}let r="";const o=new Uint8Array(e.buffer);for(let a=0;a<o.length;a+=32768)r+=String.fromCharCode(...o.subarray(a,a+32768));return btoa(r)}function NE(n){let t;try{t=atob(n)}catch{return null}const e=Math.floor((t.length-4)/6);if(e<2)return null;const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);const s=new DataView(i.buffer),r={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let o=s.getFloat32(0,!0);if(!Number.isFinite(o))return null;for(let a=0;a<e;a++)o+=s.getInt16(4+a*6,!0)/100,r.z[a]=o,r.x[a]=s.getInt16(6+a*6,!0)/100,r.v[a]=s.getInt16(8+a*6,!0)/100;return r}function Ug(n,t,e){const i=Math.max(0,t*hc),s=n.n-1,r=Math.min(s,Math.floor(i)),o=Math.min(s,r+1),a=Math.min(1,i-r);return e.z=n.z[r]+(n.z[o]-n.z[r])*a,e.x=n.x[r]+(n.x[o]-n.x[r])*a,e.v=n.v[r]+(n.v[o]-n.v[r])*a,e.ended=i>=s,e.after=Math.max(0,(i-s)/hc),e}const kg=5,Rl=4,IE=1500,DE=200,UE=120;function sh(n,t,e=!1){return e?1:Math.min(1,Math.max(0,(t-IE-n*DE)/UE))}const Fg=n=>n.length===1&&n[0].self;function kE(n){const t=n.runs.find(o=>o.pid===n.me),e=n.runs.filter(o=>o.pid!==n.me),i=t?.dist??0,s=o=>o.dist>=i?o.dist-i:(i-o.dist)*2,r=[];t&&r.push(t),e[0]&&r.push(e[0]);for(const o of e.slice(1).sort((a,c)=>s(a)-s(c))){if(r.length>=kg)break;r.push(o)}return r}function FE(){let n=[];const t=[];return{ghosts:()=>n,set(e){n=[];for(const i of e){const s=NE(i.path);s&&n.push({run:i.run,self:i.self,track:s,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of n)e.ahead=null,e.downSaid=!1},update(e,i){t.length=0;const s=Fg(n);return n.forEach((r,o)=>{Ug(r.track,e,r.at);const a=r.at.z-i,c=r.run.name,l=sh(o,i,s)>0;l&&a>Rl&&r.ahead===!1&&t.push({type:"passed",name:c,self:r.self}),l&&a<-Rl&&r.ahead===!0&&t.push({type:"pass",name:c,self:r.self}),Math.abs(a)>Rl&&(r.ahead=a>0),r.at.ended&&!r.downSaid&&(r.downSaid=!0,l&&r.run.crash&&Math.abs(a)<300&&t.push({type:"down",name:c,self:r.self,dist:r.run.dist}))}),t},rank(e){return 1+n.filter(i=>i.at.z>e).length}}}function OE(){let n=[],t=0,e=!1;const i=s=>{n.length<ih*3&&n.push(s.z,s.x,s.v)};return{start(s){n=[],t=0,e=!0,i(s)},afterStep(s){e&&(t++,t%PE===0&&i(s),s.mode==="over"&&(e=!1))},seconds:()=>t/60,truncated:()=>n.length>=ih*3,finish:()=>LE(n)}}const Cl="skyrun.myGhost",Ma="me";function BE(n){let t=null;const e=(r,o)=>!!r&&r.route===o&&typeof r.path=="string"&&Number.isFinite(r.dist);function i(r){let o=null;try{o=JSON.parse(localStorage.getItem(Cl)??"null")}catch{}const a=e(o,r)?o:null,c=e(t,r)?t:null;return a&&c?c.dist>a.dist?c:a:a??c}function s(r){const o=i(r);return{me:Ma,myName:null,total:o?1:0,runs:o?[{pid:Ma,name:"Bạn",dist:o.dist,score:o.score,dur:o.dur,crash:o.crash}]:[]}}return{board:async r=>s(r),async paths(r,o){const a=i(r);return a&&o.includes(Ma)?{[Ma]:a.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),progress:async()=>null,async submit(r,o){const a=i(r),c=!a||o.dist>a.dist;if(c){t={route:r,dist:o.dist,score:o.score,dur:o.dur,crash:o.crash,path:o.path};try{localStorage.removeItem(Cl),localStorage.setItem(Cl,JSON.stringify(t))}catch{}}return{saved:c,best:c?o.dist:a.dist,rank:1,total:1,bestScore:o.score,scoreRank:1}},lastFailure:()=>null,logRun:n,ping:async()=>"ok"}}const zE="modulepreload",HE=function(n,t){return new URL(n,t).href},Ap={},VE=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=HE(u,i),u in Ap)return;Ap[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(i)for(let p=o.length-1;p>=0;p--){const v=o[p];if(v.href===u&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":zE,h||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((p,v)=>{d.addEventListener("load",p),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},GE="skyRuns",Rp="sr-tele",Cp="../../shared/",Pl=new Map;function Pp(n){let t=Pl.get(n);return t||(t=new Promise((e,i)=>{const s=document.createElement("script");s.src=n,s.onload=()=>e(),s.onerror=()=>i(new Error(`không tải được ${n}`)),document.head.appendChild(s)}),t.catch(()=>Pl.delete(n)),Pl.set(n,t)),t}function WE(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function XE(n,t,e,i){const{route:s,rv:r,sv:o,alt:a,dist:c,dur:l,score:u,crash:h,tainted:f,...d}=n;return{v:1,ch:t,pk:e,at:i,route:s,rv:r,sv:o,alt:a,dist:Math.round(c*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:h??null,tainted:f,detail:JSON.stringify(d)}}let Xs=null;function $E(){return Xs||(Xs=(async()=>{await Pp(`${Cp}portal-config.js`),await Pp(`${Cp}portal-firebase.js`);const n=window.Portal,t=n?.FB;if(!t?.configured())throw new Error("chưa cấu hình Firebase");const e=await t.load(),i=await VE(()=>import(`${t.SDK}/firebase-app.js`),[],import.meta.url),s=i.getApps().find(a=>a.name===Rp)??i.initializeApp(n.CONFIG,Rp),r=e.authM.getAuth(s);await r.authStateReady(),r.currentUser||await e.authM.signInAnonymously(r);let o;try{o=e.fsM.initializeFirestore(s,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{o=e.fsM.getFirestore(s)}return{fsM:e.fsM,db:o,uid:r.currentUser.uid,limit:t.limit.bind(t)}})(),Xs.catch(()=>Xs=null),Xs)}function qE(){const n=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async t=>{try{const e=await $E();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,GE),XE(t,n,WE(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const KE=1e9,YE=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),ZE=[...document.scripts].map(n=>/assets\/index-([\w-]+)\.js/.exec(n.src)?.[1]).find(Boolean)??"dev",Lp=n=>n.thermalV>8?"thermal":n.v<-2?"low":n.v>2?"high":"zero",JE=(n,t)=>n>=KE?"trail":t>2?"u":t<-2?"d":"o",QE=n=>le.zone(We(n),es(n)),ya=(n,t)=>n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:0,zn=n=>Math.round(n*100)/100;function jE(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function tA(n){let t={touch:!1,key:!1};addEventListener("keydown",()=>t.key=!0),addEventListener("pointerdown",h=>{h.pointerType==="touch"&&(t.touch=!0)});let e="",i=!1,s=0,r=-1,o=null,a=u(),c=!0,l=null;function u(){const h=f=>Object.fromEntries(f.map(d=>[d,0]));return{tiers:h(["low","zero","high","thermal"]),lSpawn:h(["o","u","d","trail"]),lTaken:h(["o","u","d","trail"]),bSpawn:h(["thermal","shield","smoke"]),bTaken:h(["thermal","shield","smoke"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1,crash:null}}return{start(h,f,d){e=f,i=d,s++,o=r<0?null:zn((performance.now()-r)/1e3),t={touch:!1,key:!1},a=u(),a.lastCmd=h.time,c=!1,l=h},state:()=>l,frame(h,f,d){h>0&&h<.5&&(a.frames.length<3e4&&a.frames.push(h),a.scaleSum+=n.quality().scale*h),a.shown=Math.max(a.shown,f),a.near=d},afterStep(h,f){if(l=h,h.mode!=="run"&&h.mode!=="crash")return;const d=Lp(h);a.tiers[d]+=f,a.multSum+=h.mult*f,d!=="low"?a.lowSince=-1:a.lowSince<0&&(a.lowSince=h.time);for(const p of h.events)p.type==="lane"?a.swipes.lane++:p.type==="vert"?a.swipes[p.kind==="flare"?"up":"down"]++:p.type==="hurt"?a.hurts++:p.type==="crash"&&(a.deathNear=a.near,a.crash=p.kind),(p.type==="lane"||p.type==="vert")&&(a.lastCmd=h.time);for(const p of h.pickups){if(p.z>h.z-3.5)break;if(!a.seen.has(p.id))if(a.seen.add(p.id),p.kind==="lantern"){const v=JE(p.id,p.v);a.lSpawn[v]++,p.taken&&a.lTaken[v]++}else a.bSpawn[p.kind]++,p.taken&&a.bTaken[p.kind]++}for(const p of h.obstacles){if(!p.passed||a.rows.has(p.row)||(a.rows.add(p.row),h.hurtRow===p.row||h.mode!=="run"))continue;const v=h.time-h.dodgeTime;v<1.5&&ao(p,h.dodgeX,h.thermalV,0)&&a.leads.push(v),p.kind==="bridge"&&a.lowSince>=0&&h.time-a.lowSince>=.5&&a.bridgesFromLow++}},finish(h,f,d,p,v="crash"){if(c)return null;c=!0,r=performance.now(),f??=a.crash;const m=[...a.frames].sort((b,w)=>b-w),g=a.frames.reduce((b,w)=>b+w,0),y=[...a.leads].sort((b,w)=>b-w),_=E0(),x=lo(),M=n.quality();return{lv:1,route:e,rv:p,sv:sr,alt:i,build:ZE,session:YE,runNo:s,wait:o,dist:Math.floor(h.z),dur:zn(h.time),score:_s(h),crash:f,end:v,tainted:d,hurts:a.hurts,device:{tier:M.tier,gov:zn(g>0?a.scaleSum/g:M.scale),fps50:Math.round(m.length?1/ya(m,.5):0),fps5:Math.round(m.length?1/ya(m,.95):0),input:t.touch&&t.key?"mixed":t.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:x.ghosts,music:_.music?x.music:"off",tutorial:jE()},death:f?{phase:Math.round(We(h.z)),zone:QE(h.z),tier:Lp(h),sinceCmd:zn(h.time-a.lastCmd)}:null,parts:{meters:Math.round(h.score),lantern:Math.round(h.parts.lantern),nearMiss:Math.round(h.parts.nearMiss),gust:Math.round(h.parts.gust)},lanterns:{spawned:a.lSpawn,taken:a.lTaken,bestStreak:h.bestStreak,avgMult:zn(h.time>0?a.multSum/h.time:1)},tiers:{low:zn(a.tiers.low),zero:zn(a.tiers.zero),high:zn(a.tiers.high),thermal:zn(a.tiers.thermal)},swipes:a.swipes,bridgesFromLow:a.bridgesFromLow,boosters:{spawned:a.bSpawn,taken:a.bTaken},lead:{p10:zn(ya(y,.1)),p50:zn(ya(y,.5)),n:y.length},ghosts:{shown:a.shown,deathNear:a.deathNear}}}}}const rh="skyrun.pending",eA=12e4,Np=[1500,4e3];function ba(){try{const n=JSON.parse(localStorage.getItem(rh)??"[]");return Array.isArray(n)?n:[]}catch{return[]}}function Ll(n){try{n.length?localStorage.setItem(rh,JSON.stringify(n)):localStorage.removeItem(rh)}catch{}}function Ip(n){const t=Date.now(),e=[eh(new Date(t)),eh(new Date(t-864e5))].map(i=>i.slice(0,10));return typeof n.route=="string"&&e.includes(n.route.slice(0,10))&&!!n.run}function nA(n){let t=performance.now(),e=!1;const i=r=>new Promise(o=>setTimeout(o,r));async function s(r,o){for(let a=0;;a++){const c=await n.submit(r,o);if(c)return{ok:c};const l=n.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||a>=Np.length)return{fail:l};await i(Np[a])}}return{keepAlive(r){const o=performance.now();o-t<eA||(t=o,n.ping().then(a=>{a!=="auth"||e||(e=!0,r())}))},async submit(r,o){t=performance.now();const a={route:r,run:o,at:Date.now()};Ll([...ba().filter(Ip),a].slice(-3));const c=await s(r,o);return(!("fail"in c)||c.fail.kind==="rejected")&&Ll(ba().filter(l=>l.at!==a.at||l.route!==r)),c},async flush(){const r=ba().filter(Ip),o=[],a=[];for(const c of r)await n.submit(c.route,c.run)?o.push(c.run.dist):n.lastFailure()?.kind!=="rejected"&&a.push(c);return(r.length||ba().length)&&Ll(a),o}}}const iA=160;function sA(n,t){const e=document.createElement("div");e.className="ghost-layer";const i=Array.from({length:t},()=>{const c=document.createElement("div");return c.className="ghost-tag",e.appendChild(c),c}),s=document.createElement("span");s.className="ghost-rank",s.hidden=!0,n.appendChild(e),(n.querySelector(".hud-rank-slot")??e).appendChild(s);const r=new N,o=new WeakMap;let a="";return{update(c,l,u,h,f,d){e.classList.toggle("on",d&&u.length>0);const p=d&&h&&h.total>1?`#${h.place}/${h.total}`:"";if(p!==a&&(a=p,s.hidden=!p,s.classList.toggle("first",h?.place===1),s.innerHTML=p?`${Et.wingsuit}#${h.place}<small>/${h.total}</small>`:""),!d)return;const v=n.clientWidth,m=n.clientHeight;i.forEach((g,y)=>{const _=y<l.count?u[l.owner[y]]:void 0,x=l.alphas[y]??0;if(!_||x<.15||Math.abs(_.at.z-f)>iA){g.style.opacity="0";return}if(r.copy(l.heads[y]).project(c),r.z>1){g.style.opacity="0";return}const M=_.self?"Kỷ lục của bạn":_.run.name;g.classList.toggle("self",_.self),g.textContent!==M&&(g.textContent=M,o.set(g,g.offsetWidth/2));const b=o.get(g)??0,w=Math.min(Math.max((r.x+1)*.5*v,b+6),v-b-6);g.style.opacity=Math.min(1,x*1.6).toFixed(2),g.style.transform=`translate(${w.toFixed(1)}px, ${((1-r.y)*.5*m).toFixed(1)}px) translate(-50%, -100%)`})}}}const $a=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function rA(){const n=document.createElement("button");n.type="button",n.className="board-btn",n.setAttribute("aria-label","Bảng xếp hạng"),n.innerHTML=`<span class="board-btn-icon" aria-hidden="true">${Et.trophy}</span><span class="board-btn-label"><span class="long">Xếp hạng</span><span class="short">BXH</span></span><span class="board-btn-rank" hidden></span>`,n.hidden=!0;const t=n.querySelector(".board-btn-rank");n.addEventListener("click",()=>n.classList.remove("fresh"));const e=i=>{t.hidden=!i,t.textContent=i?`#${i}`:""};return{el:n,setRank:e,bump(i){e(i),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump","fresh")},seen:()=>n.classList.remove("fresh")}}function oA(n,t,e,i){const s=e.el.querySelector(".board-btn-icon");if(e.el.hidden||!s||$a())return e.bump(i);const r=n.getBoundingClientRect(),o=t.getBoundingClientRect(),a=s.getBoundingClientRect(),c=o.left+o.width/2-r.left,l=o.top+o.height/2-r.top,u=a.left+a.width/2-r.left-c,h=a.top+a.height/2-r.top-l,f=document.createElement("div");f.className="rank-fly",f.innerHTML=Et.trophy,f.style.left=`${c}px`,f.style.top=`${l}px`,n.appendChild(f);const d=(m,g,y)=>`translate(calc(-50% + ${m}px), calc(-50% + ${g}px)) scale(${y})`;let p=!1;const v=()=>{p||(p=!0,f.remove(),e.bump(i))};f.animate([{transform:d(0,0,.6),opacity:0},{transform:d(u*.3,h*.45-70,1.7),opacity:1,offset:.35},{transform:d(u,h,.9),opacity:1}],{duration:720,easing:"cubic-bezier(.45,0,.55,1)"}).onfinish=v,setTimeout(v,900)}const oh="skyrun.best",Og=n=>`skyrun.best.${n}`,Bg=new Map,zg=new Set;function aA(n){try{const t=localStorage.getItem(Og(n));if(t){const i=JSON.parse(t);return{m:Number(i.m)||0,score:Number(i.score)||0}}const e=n==="khau-pha"&&Number(localStorage.getItem(oh))||0;return e>0?{m:0,score:e}:null}catch{return null}}function uf(n){const t=aA(n),e=Bg.get(n);return!t||!e?t??e??null:{m:Math.max(t.m,e.m),score:Math.max(t.score,e.score)}}function Hg(n,t){Bg.set(n,t);try{localStorage.setItem(Og(n),JSON.stringify(t))}catch{}}function Vg(n){return uf(n)}function Gg(n,t){const e=Math.floor(t),i=uf(n);if(!(e<=(i?.m??0))){Hg(n,{m:e,score:i?.score??0});for(const s of zg)s()}}function cA(n){zg.add(n)}function lA(n,t,e,i=!0){const s=uf(n),r=s?.m??0,o={m:Math.max(r,Math.floor(t)),score:Math.max(s?.score??0,e)},a=Math.floor(t)>r,c=!a&&s!==null&&Math.floor(t)===r&&r>0;if(!i)return{best:s??o,record:!1,tie:!1,prevM:r};Hg(n,o);try{e>(Number(localStorage.getItem(oh))||0)&&localStorage.setItem(oh,String(e))}catch{}return{best:o,record:a,tie:c,prevM:r}}const qa=n=>Math.floor(n).toLocaleString("vi-VN"),Sa="meters",wa=900;function uA(n,t){const e=document.createElement("li");e.className=n.pos==="me"?"me":`ctx ${n.pos}`;for(const[i,s]of[["r",`#${n.rank}`],["n",n.pos!=="me"?n.name:"Bạn"],["v",qa(n.value)+t]]){const r=document.createElement("span");r.className=i,r.textContent=s,e.appendChild(r)}return e}function Dp(n,t,e,i,s){const r=performance.now(),o=()=>{n.textContent=s(e)},a=c=>{const l=Math.min(1,(c-r)/i);n.textContent=s(Math.round(t+(e-t)*(1-(1-l)**3))),l<1&&requestAnimationFrame(a)};requestAnimationFrame(a),setTimeout(o,i+80)}function hA(n){let t,e=0;async function i(){const r=e,o=await n.client.leaderboard(Sa);if(r!==e||!("ok"in o))return;const a=o.ok.mine;t=a?{rank:a.rank,value:a[Sa]??0}:null,a&&Gg(Pn,a.meters??0),n.button.setRank(a?.rank??null)}function s(r,o,a,c,l){const{by:u,rank:h,best:f,improved:d,climbed:p}=o,{tab:v,unit:m}=n.text(u),g=Rt=>c[Rt-1],y=[],_=g(h-1),x=g(h+1);_&&y.push({rank:h-1,name:_.name,value:_[u]??0,pos:"above"}),y.push({rank:h,name:l,value:f,pos:"me"}),x&&y.push({rank:h+1,name:x.name,value:x[u]??0,pos:"below"});const M=document.createElement("div");M.className="rank-card",M.setAttribute("role","button"),M.setAttribute("aria-label",`Xem bảng xếp hạng ${v}`);const b=document.createElement("div");b.className="rank-head",b.innerHTML=`${Et.trophy}<b>Bảng xếp hạng</b><span class="by"></span><span class="rank-chip" hidden></span>`,b.querySelector(".by").textContent=`· ${v}`;const w=b.querySelector(".rank-chip");w.textContent=d?a===null?"Mới lên bảng":p&&a?`▲ ${a.rank-h}`:"Kỷ lục mới":"";const S=document.createElement("ol");S.className="rank-rows";const T=y.map(Rt=>uA(Rt,m));S.append(...T);const R=document.createElement("div");R.className="rank-note";const P=(a?c.slice(h,a.rank):a===null?c.slice(h):[]).map(Rt=>Rt.name),I=P.length>2?`${P.slice(0,2).join(", ")} +${P.length-2}`:P.join(", ");R.textContent=h===1&&p?"Bạn đang dẫn đầu bảng!":p&&I?`Vượt ${I}!`:a===null?"Đã có tên trên bảng!":p?`Lên hạng #${h}!`:h===1?d?"Kỷ lục mới — giữ ngôi #1":"Bạn vẫn giữ ngôi #1":d?`Kỷ lục mới — giữ hạng #${h}`:_?`Vượt ${qa(_[u]??0)}${m} để lên #${h-1}`:`Bay xa hơn để vượt #${h-1}`;const L=document.createElement("span");L.className="rank-more",L.textContent="Cả bảng ›",R.appendChild(L),M.append(b,S,R),wn(M);let O=!1;M.addEventListener("click",Rt=>{Rt.stopPropagation(),O=!0,n.button.seen(),n.open(u)}),r.before(M);const B=T[y.findIndex(Rt=>Rt.pos==="me")],X=B.querySelector(".r"),J=()=>{w.hidden=!w.textContent,d&&B.classList.add("shine"),setTimeout(()=>{if(!d||O)return n.button.setRank(h);M.isConnected?oA(n.root,X,n.button,h):n.button.bump(h)},$a()?0:450)};if(!p||$a())return void setTimeout(J,$a()?0:400);const H=B.getBoundingClientRect().height+2,$=x?T[T.length-1]:void 0,vt={duration:wa,delay:380,easing:"cubic-bezier(.2,.9,.25,1.12)",fill:"backwards"};B.animate([{transform:`translateY(${H}px)`,opacity:$?1:0},{transform:"none",opacity:1}],vt),$?.animate([{transform:`translateY(${-H}px)`},{transform:"none"}],vt),X.textContent=a?`#${a.rank}`:"#–";const gt=B.querySelector(".v");a&&(gt.textContent=qa(a.value)+m),setTimeout(()=>{a?Dp(X,a.rank,h,wa,Rt=>`#${Rt}`):X.textContent=`#${h}`,Dp(gt,a?.value??0,f,wa,Rt=>qa(Rt)+m)},380),setTimeout(J,380+wa)}return{snapshot:i,async celebrate(r,o,a){e++;const c=r.metersRank!==void 0?"meters":"score",l=c===Sa?t:void 0,u=a?n.root.querySelector(".screens.over .over-card [data-online]"):null,h=u?await n.client.leaderboard(c):null,f=h&&"ok"in h?h.ok:null,d=f?.mine?.rank??r.metersRank??r.scoreRank,p=f?.mine?.[c]??(c==="meters"?r.bestMeters??0:r.bestScore);c===Sa&&(t={rank:d,value:p});const v=c==="meters"?o.dist:o.score,m=l===null||(l!==void 0?p>l.value:v>=p),g=m&&(l===null||l!==void 0&&l.rank>d);if(u?.isConnected)return s(u,{by:c,rank:d,best:p,improved:m,climbed:g},l,f?.top??[],f?.mine?.name??"");n.button.setRank(d),m&&n.button.el.classList.add("fresh")}}}function fA(n,t){const e=n.querySelector(".me");if(!e)return;e.style.position="static";const i=e.getBoundingClientRect(),s=n.getBoundingClientRect();e.style.position="",n.scrollTop+=i.top-s.top-(s.height-i.height)/2,t&&e.classList.add("me-new")}const To=n=>Math.floor(n).toLocaleString("vi-VN"),gs={meters:{tab:"Quãng xa",icon:"route",sub:"Bay xa nhất một ván · mọi ngày",unit:" m",count:"người đã bay",empty:"Chưa ai bay map này mùa này — bay ván đầu tiên!",best:"quãng xa nhất"},score:{tab:"Điểm",icon:"star",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",icon:"lantern",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},Up=["meters","score","lanterns"];function dA(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":n.kind==="network"?`Chưa tải được bảng (${n.status?`máy chủ báo lỗi ${n.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${n.why??n.status}).`}const ts=(n,t,e,i="span")=>{const s=document.createElement(i);s.className=t,s.textContent=e,n.appendChild(s)},pA=n=>(n.trim().split(/\s+/).pop()??"?").charAt(0).toUpperCase()||"?",mA=(n,t)=>t==="meters"?bp(n.route):`${To(n.dist)} m · ${bp(n.route)}`;function kp(n,t,e,i){const s=document.createElement("li");return s.className=i?"me":"",ts(s,"board-rank",`#${e}`),ts(s,"board-name",i?"Bạn":n.name),ts(s,"board-score",To(n[t]??0)+gs[t].unit),ts(s,"board-meta",mA(n,t)),s}function gA(n,t,e){return n.slice(0,3).map((i,s)=>{const r=document.createElement("div");return r.className=`pod pod-${s+1}${i.pid===e?" me":""}`,ts(r,"pod-avatar",pA(i.name)),ts(r,"pod-name",i.pid===e?"Bạn":i.name),ts(r,"pod-val",To(i[t]??0)+gs[t].unit,"b"),ts(r,"pod-step",String(s+1)),r})}const vA=[1500,4e3];function xA(n,t){const e=rA(),i=e.el,s=document.createElement("div");s.className="board-panel",s.hidden=!0;const r=Up.map(b=>`<button type="button" role="tab" class="ui-seg" data-by="${b}">${Et[gs[b].icon]}${gs[b].tab}</button>`).join("");s.innerHTML=`
    <div class="board-card ui-indigo ui-trim" role="dialog" aria-label="Bảng xếp hạng">
      <div class="panel-head">${Et.trophy}<div><b>${Ge.name}<span class="panel-pill board-season"></span></b><small class="board-sub"></small></div></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Et.close}</button>
      <div class="board-tabs" role="tablist">${r}</div>
      <p class="board-status"></p>
      <button type="button" class="ui-btn-cloth board-retry" hidden>${Et.rotate}Thử lại</button>
      <div class="board-scroll" data-scroll><div class="board-podium" hidden></div><ol class="board-list"></ol></div>
    </div>`,n.append(i,s);const o=s.querySelector(".board-season"),a=s.querySelector(".board-sub"),c=s.querySelector(".board-status"),l=s.querySelector(".board-retry"),u=s.querySelector(".board-list"),h=s.querySelector(".board-podium"),f=s.querySelector("[data-scroll]"),d=[...s.querySelectorAll(".board-tabs button")];o.textContent=`Mùa ${sr}`;let p="meters";const v={};wn(i),wn(s);let m=0,g=!1;const y=()=>{s.hidden=!0,m++,g=!1};function _(){for(const b of d)b.setAttribute("aria-selected",String(b.dataset.by===p));a.textContent=gs[p].sub}async function x(){s.hidden=!1,_(),l.hidden=!0,c.textContent="Đang tải…",c.classList.remove("empty"),u.replaceChildren(),h.replaceChildren(),h.hidden=!0;const b=++m,w=p,S=gs[w];let T=await t.leaderboard(w);for(const A of vA){if(b!==m||"ok"in T||T.fail.kind!=="network")break;await new Promise(P=>setTimeout(P,A)),b===m&&(T=await t.leaderboard(w))}if(b!==m)return;if("fail"in T){const A=v[w];c.textContent=dA(T.fail)+(A?` Bảng ĐÃ ghi ${S.best} của bạn: ${To(A.best)}${S.unit} — hạng #${A.rank}.`:""),l.hidden=T.fail.kind==="auth";return}const R=T.ok;if(o.textContent=`Mùa ${R.season}`,!R.top.length){c.innerHTML=`${Et.lantern}<span>${S.empty}</span>`,c.classList.add("empty");return}if(c.textContent=`${To(R.total)} ${S.count}`,h.replaceChildren(...gA(R.top,w,R.me)),h.hidden=!1,u.replaceChildren(...R.top.slice(3).map((A,P)=>kp(A,w,P+4,A.pid===R.me))),R.mine&&!R.top.some(A=>A.pid===R.me)){const A=document.createElement("li");A.className="board-gap",A.textContent="…",u.append(A,kp(R.mine,w,R.mine.rank,!0))}fA(f,g),g=!1}const M=hA({root:n,client:t,button:e,text:b=>gs[b],open:b=>(p=b,g=!0,void x())});M.snapshot(),i.addEventListener("click",()=>{x()}),l.addEventListener("click",()=>{x()});for(const b of d)b.addEventListener("click",()=>{p=Up.find(w=>w===b.dataset.by)??"meters",x()});return s.querySelector("[data-close]").addEventListener("click",y),s.addEventListener("click",b=>{b.target===s&&y()}),window.addEventListener("keydown",b=>{b.code==="Escape"&&!s.hidden&&y()}),{setAvailable(b){i.hidden!==!b&&(i.hidden=!b,b||y())},runStart(){y(),M.snapshot()},remember(b,w,S){v.score={best:b.bestScore,rank:b.scoreRank},b.metersRank!==void 0&&(v.meters={best:b.bestMeters??0,rank:b.metersRank}),Gg(Ge.id,b.bestMeters??0),b.lanternRank!==void 0&&(v.lanterns={best:b.bestLanterns??0,rank:b.lanternRank}),M.celebrate(b,w,S)}}}const ys=n=>Math.floor(n).toLocaleString("vi-VN");function _A(n,t){const e=n.runs[0];if(t)return e?[{icon:"wingsuit",text:`Bóng hôm nay ${ys(e.dist)} m`}]:[];if(!e)return[{icon:"crown",text:"Chưa ai bay hôm nay — mở đường!"}];const i=e.pid===n.me?"Bạn":e.name;return[{icon:"users",text:`${ys(n.total)} người bay hôm nay`},{icon:"crown",text:`${i} ${ys(e.dist)} m`}]}function MA(n,t){return t?[{icon:"wingsuit",text:n.saved?`Bóng mới ${ys(n.best)} m`:`Bóng hôm nay ${ys(n.best)} m`}]:[]}function yA(n,t){return{score:t.score>=n.bestScore?n.scoreRank:null,lantern:n.lanternRank&&t.lanterns>=(n.bestLanterns??0)?n.lanternRank:null}}function bA(n,t){if(!n)return null;let e=0,i=0;for(const r of n.runs)r.pid===n.me&&(e=r.dist);const s=Math.max(t,e);for(const r of n.runs)r.pid!==n.me&&r.dist>s&&i++;return{place:i+1,total:n.total+(e>0?0:1)}}const SA=n=>`Ván có bot lái hoặc nhảy quãng — ${n?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function wA(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":n.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${n.why??n.status}).`}function TA(n){return n.type==="pass"?n.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${n.name}!`,"combo"]:n.type==="passed"?[n.self?"Kỷ lục của bạn vượt lên":`${n.name} vượt lên`,"big"]:[n.self?`Kỷ lục của bạn dừng ở ${ys(n.dist)} m`:`${n.name} rơi ở ${ys(n.dist)} m`,"big"]}const EA=200,AA=1.2,RA=n=>Math.floor(n).toLocaleString("vi-VN");function CA(n){const t=RE(n.params),e=Ig(n.params),i=e?BE(qE()):CE(n.params),s=Dg(n.params)?tA({quality:n.quality}):null,r=OE(),o=nA(i),a=FE(),c=sA(n.root,kg),l=t&&!e?xA(n.root,i):null;let u="",h=0,f=!1,d=-9,p=null,v=0,m=!1,g=0,y=null,_="";const x=w=>{_=w,n.screens.setOnline(w)},M=(w,S,T)=>{const R=w&&s?.finish(w,S,m,n.rv,T);R&&i.logRun(R)};s&&addEventListener("pagehide",()=>f&&M(s.state(),null,"close"));async function b(w,S){u=w;const T=++h,R=await o.flush(),A=await i.board(w);if(T!==h||!A)return;y=A;const P=R.length?`Đã gửi bù ván ${RA(Math.max(...R))} m`:"";S?(n.screens.setChips(_A(A,e)),x(P)):P&&x(_?`${_} · ${P}`:P);const I=kE(A),L=await i.paths(w,I.map(B=>B.pid));if(T!==h)return;const O=I.filter(B=>L[B.pid]).map(B=>({run:B,self:B.pid===A.me,path:L[B.pid]}));f?p=O:a.set(O)}return t&&b(n.route,!0),{runStart(w,S){t&&S!==u&&(a.set([]),p=null,b(S,!1)),p&&a.set(p),p=null,r.start(w),a.reset(),f=!0,l?.runStart(),d=-9,v++,m=!1,g=w.z,s?.start(w,S,n.params.has("alt"))},afterStep(w,S){(S||Math.abs(w.z-g)>10)&&(m=!0),g=w.z,r.afterStep(w),s?.afterStep(w,1/60)},present(w,S,T,R){const A=f&&(w.mode==="run"||w.mode==="crash"),P=r.seconds()-(1-T)/60;if(A)for(const I of a.update(P,S.z))w.mode!=="run"||P-d<AA||(d=P,n.hud.toast(...TA(I)));if(t&&!e&&o.keepAlive(()=>A?n.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):x(`${_?`${_} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),n.view.update(A?a.ghosts():[],S,P,R,n.camera.position),s&&w.mode==="run"){let I=!1;for(let L=0;L<n.view.count;L++)I||=n.view.heads[L].distanceTo(n.camera.position)<15;s.frame(R,n.view.count,I)}c.update(n.camera,n.view,a.ghosts(),bA(y,S.z),S.z,A),l?.setAvailable(n.screens.visible()!==null)},async progress(){if(!t||e)return null;const w=await i.progress();return w?{score:w.season===sr?w.score:{},meters:w.meters??{}}:null},runAbandon(w){f&&M(w,null,"abandon"),f=!1},async runOver(w,S){if(f=!1,M(w,S,"crash"),!t||!u||w.z<EA)return;if(m)return x(SA(e));const T=v;e||x("Đang gửi ván lên bảng…");const R=await o.submit(u,{sv:sr,lanterns:w.lanterns,dist:Math.floor(w.z),score:_s(w),dur:Math.min(3600,Math.round(r.seconds()*10)/10),crash:r.truncated()?null:S,path:r.finish()});T===v&&("fail"in R?x(wA(R.fail)):(x(""),n.screens.setChips(MA(R.ok,e)),e||n.screens.setRanks(yA(R.ok,{score:_s(w),lanterns:w.lanterns})))),"ok"in R&&l?.remember(R.ok,{dist:Math.floor(w.z),score:_s(w)},T===v),"ok"in R&&await b(u,!1)}}}const Wg=()=>`<button type="button" class="ui-badge" data-snd="sfx" aria-label="Tắt/bật tiếng hiệu ứng">${Et.speaker}</button><button type="button" class="ui-badge" data-snd="music" aria-label="Tắt/bật nhạc nền">${Et.note}</button>`;function PA(n,t){const e=document.createElement("div");e.className="sound-btns",e.dataset.state="idle",e.innerHTML=Wg(),n.appendChild(e),wn(e);const i=()=>{const r=t.prefs();for(const o of n.querySelectorAll("[data-snd]"))o.classList.toggle("off",!r[o.dataset.snd])},s=r=>{t.prefs()[r]&&t.justUnlocked()||(r==="sfx"?t.toggleSfx:t.toggleMusic)(),i()};return n.addEventListener("click",r=>{const o=r.target instanceof Element?r.target.closest("[data-snd]"):null;o&&(r.stopPropagation(),s(o.dataset.snd==="sfx"?"sfx":"music"))}),i(),{sync:i,toggle:s,el:e}}const LA=.8;function NA(n,t,e){const i=document.createElement("button");i.type="button",i.className="ui-badge pause-btn",i.setAttribute("aria-label","Tạm dừng"),i.innerHTML=Et.pause,t.prepend(i);const s=document.createElement("div");s.className="pause-screen",s.innerHTML=`<div class="pause-card ui-indigo ui-trim" role="dialog" aria-label="Tạm dừng">
      <div class="pause-title">${Et.pause}Tạm dừng</div>
      <button type="button" class="ui-btn-lacquer" data-resume>${Et.play}Bay tiếp</button>
      <div class="pause-row">${Wg()}<button type="button" class="ui-badge" data-open-settings aria-label="Cài đặt">${Et.gear}</button></div>
      <button type="button" class="ui-btn-cloth pause-home" data-home>${Et.home}Về sảnh</button>
      <div class="pause-confirm" hidden><p>Bỏ ván này?</p><div class="row">
        <button type="button" class="ui-btn-cloth" data-stay>Ở lại</button><button type="button" class="ui-btn-cloth quit" data-quit>Bỏ ván</button></div></div>
      <div class="pause-hint">${e.touch?"Hoặc chạm ra ngoài bảng":"Hoặc bấm Space / P"}</div></div>`,n.appendChild(s),wn(s);const r=s.querySelector("[data-home]"),o=s.querySelector(".pause-confirm"),a=p=>{o.hidden=!p,r.hidden=p};let c=!1,l=!1,u=!1,h=1;const f=()=>{s.classList.toggle("on",c),t.dataset.state=u?"crash":l?c?"paused":"run":"idle",c||a(!1)},d={paused:()=>c,pause(){!l||c||(c=!0,f())},resume(){c&&(c=!1,h=.15,f())},setRunning(p,v=!1){l===p&&u===v||(l=p,u=v,p||(c=!1),f())},factor(p){return c?0:(h=Math.min(1,h+p/LA),h)}};return i.addEventListener("click",()=>d.pause()),s.addEventListener("click",p=>{const v=p.target instanceof Element?p.target:null;v&&(v===s||v.closest("[data-resume]")?d.resume():v.closest("[data-home]")?a(!0):v.closest("[data-stay]")?a(!1):v.closest("[data-quit]")&&(d.resume(),e.onHome()))}),wn(i),document.addEventListener("visibilitychange",()=>{document.hidden&&d.pause()}),window.addEventListener("keydown",p=>{!p.repeat&&(p.code==="KeyP"||p.code==="Escape")&&(c?d.resume:d.pause)()}),d}const IA=1.2,Nl=new N,Dr=new N,Fp=new N;function Op(n,t,e){const i=e.clientWidth,s=e.clientHeight;if(!i||!s||(n.getWorldPosition(Nl),Dr.copy(Nl).project(t),Dr.z>1))return null;Fp.setFromMatrixColumn(t.matrixWorld,0).multiplyScalar(IA).add(Nl).project(t);const r=Math.abs(Fp.x-Dr.x)*.5*i,o=(Dr.x*.5+.5)*i,a=(.5-Dr.y*.5)*s;return{x:o-r,y:a-r,w:2*r,h:2*r}}function DA(n,t="ui-chip"){const e=document.createElement("span");e.className=`${t}${n.tone?` ${n.tone}`:""}`,e.innerHTML=Et[n.icon];const i=document.createElement("span");return i.textContent=n.text,e.appendChild(i),e}function Xg(n,t,e){n&&(n.replaceChildren(...(t??[]).map(i=>DA(i,e))),n.hidden=!t?.length)}const UA=[["dragSide","Kéo ngang: lượn tránh cột đá","← →"],["swipeUp","Vuốt lên: vọt qua mỏm đá","↑"],["swipeDown","Vuốt xuống: chui dưới cầu","↓"],["lantern","Nhặt đèn trời: nhân điểm",""],["heart","Hai tim: va nhẹ chỉ mất một",""]];function kA(n){const t=document.createElement("div");t.className="help-panel",t.hidden=!0,t.innerHTML=`
    <div class="help-card ui-indigo ui-trim" role="dialog" aria-label="Cách chơi">
      <div class="panel-head">${Et.help}<b>Cách chơi</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Et.close}</button>
      <ul class="help-rows">${UA.map(([i,s,r])=>`<li><span class="help-ic">${Et[i]}</span><span>${s}</span>${r?`<kbd class="key-only">${r}</kbd>`:""}</li>`).join("")}</ul>
      <p class="help-keys key-only"><kbd>P</kbd> / <kbd>Space</kbd> tạm dừng · <kbd>M</kbd> tiếng · <kbd>N</kbd> nhạc</p>
      <button type="button" class="ui-btn-lacquer" data-close>${Et.check}Đã hiểu</button>
    </div>`,n.appendChild(t),wn(t);const e=()=>{t.hidden=!0};return t.addEventListener("click",i=>{i.stopPropagation();const s=i.target instanceof Element?i.target:null;(s===t||s?.closest("[data-close]"))&&e()}),window.addEventListener("keydown",i=>{!t.hidden&&(i.code==="Escape"||i.code==="Space"||i.code==="Enter")&&e()},{capture:!0}),{open:()=>{t.hidden=!1}}}const Ri=n=>Math.floor(n).toLocaleString("vi-VN"),FA={pillar:["pillar","dragSide","Kéo ngang sang làn trống","Bấm ← → sang làn trống"],spike:["spike","swipeUp","Vuốt lên để vọt qua","Bấm ↑ để vọt qua"],ridge:["ridge","swipeUp","Vuốt lên vọt qua sống đá","Bấm ↑ vọt qua sống đá"],bridge:["bridge","swipeDown","Vuốt xuống chui dưới cầu","Bấm ↓ chui dưới cầu"],overhang:["overhang","swipeDown","Vuốt xuống chui dưới mái đá","Bấm ↓ chui dưới mái đá"]},OA={spike:["house","swipeUp","Vuốt lên vọt qua nóc nhà","Bấm ↑ vọt qua nóc nhà"],ridge:["house","swipeUp","Vuốt lên vọt qua mái đình","Bấm ↑ vọt qua mái đình"],bridge:["house","swipeDown","Vuốt xuống chui qua cổng làng","Bấm ↓ chui qua cổng làng"]};function BA(n,t,e){if(matchMedia("(prefers-reduced-motion: reduce)").matches||t<=0)return void(n.textContent=Ri(t));const i=performance.now(),s=r=>{const o=Math.min(1,(r-i)/e);n.textContent=Ri(t*(1-(1-o)**3)),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s),setTimeout(()=>{n.textContent=Ri(t)},e+80)}function zA(n,t){const[e,i]=n.querySelectorAll("[data-stats] > .ui-chip"),s=(r,o)=>{if(!r||!o||r.textContent?.startsWith("0 "))return;const a=r.querySelector(".chip-rank")??r.appendChild(document.createElement("b"));a.className="chip-rank",a.textContent=`#${o}`};s(e,t.score),s(i,t.lantern)}const HA=.9;function VA(n,t){const e=Math.min(1,n/t);return`<div class="over-goal" role="img" aria-label="Đạt ${Math.floor(e*100)}% kỷ lục ${Ri(t)} m"><span class="goal-bar"><i style="width:${(e*100).toFixed(1)}%"></i></span><span class="goal-best">${Et.trophy}Kỷ lục ${Ri(t)} m</span></div>`}function GA(n,t,e,i,s){const r=_s(t),o=lA(Pn,t.z,r,s),a=Math.floor(t.z),c=!o.record&&!o.tie&&a<o.prevM,l=o.record?'<span class="ui-ribbon">Kỷ lục mới!</span>':o.tie?'<span class="ui-ribbon tie">Bằng kỷ lục</span>':c&&a>=o.prevM*HA?`<span class="over-kicker near">Suýt kỷ lục! Thiếu ${Ri(o.prevM-a)} m</span>`:'<span class="over-kicker">Hạ cánh khẩn cấp</span>',u=e?es(t.z)&&OA[e]||FA[e]:null;return n.innerHTML=`
    <div class="over-card ui-paper" role="dialog" aria-label="Kết thúc ván">
      <div class="over-left">
        <div class="over-head">${l}</div>
        <div class="over-hero"><span data-count>0</span><small>m</small></div>
        ${c?VA(a,o.prevM):o.record&&o.prevM>0?`<div class="over-goal up">${Et.trophy}Hơn kỷ lục cũ ${Ri(a-o.prevM)} m</div>`:""}
        <div class="over-chips" data-stats></div>
        ${u?`<p class="over-tip"><span class="ico">${Et[u[0]]}${Et[u[1]]}</span><span>${i?u[2]:u[3]}</span></p>`:""}
      </div>
      <div class="over-right">
        <div class="over-online-chips" data-chips hidden></div>
        <div class="screen-online" data-online hidden></div>
        <div class="over-actions">
          <button type="button" class="ui-btn-lacquer btn-play" data-play>${Et.play}<span>Bay lại</span><kbd>Space</kbd></button>
          <button type="button" class="ui-btn-cloth" data-lobby aria-label="Về sảnh chọn map">${Et.home}Sảnh</button>
        </div>
      </div>
    </div>`,Xg(n.querySelector("[data-stats]"),[{icon:"star",text:`${Ri(r)} điểm`},{icon:"lantern",text:`${Ri(t.lanterns)} đèn`}]),BA(n.querySelector("[data-count]"),t.z,900),o.record}const Bp=n=>Math.floor(n).toLocaleString("vi-VN");function WA(){const n=Vg(Pn);return n?n.m>0?{icon:"trophy",text:`Kỷ lục ${Bp(n.m)} m`,tone:"gold"}:{icon:"trophy",text:`Kỷ lục ${Bp(n.score)} điểm`,tone:"gold"}:null}function XA(){return`
    <div class="title-top">
      <img class="title-logo" src="ui/logo.webp" alt="Sky Run" width="840" height="263" decoding="async">
      <h1 class="title-word">Sky Run</h1>
      <button type="button" class="title-map" data-lobby aria-label="Chọn map — đang ở ${Ge.name}">${Et.mountain}<span>${Ge.name}</span>${Et.chevronDown}</button>
    </div>
    <div class="title-bottom">
      <div class="title-chips" data-chips hidden></div>
      <div class="title-actions">
        <button type="button" class="ui-badge title-help" data-help aria-label="Cách chơi">${Et.help}</button>
        <button type="button" class="ui-btn-lacquer btn-play" data-play>${Et.play}<span>Bay</span><kbd>Space</kbd></button>
      </div>
      <div class="screen-online" data-online hidden></div>
    </div>`}function $A(n){const t=n.querySelector(".title-logo");if(!t)return;const e=()=>{n.classList.add("no-logo")};t.complete&&!t.naturalWidth?e():t.addEventListener("error",e,{once:!0})}const qA=800,KA=350;function YA(n,t,e){const i=document.createElement("div");i.className="screens",n.appendChild(i);const s=kA(n),r=matchMedia("(pointer: coarse)").matches;let o=null,a=0,c="",l=[],u=0;const h=()=>{const p=i.querySelector("[data-online]");p&&(p.textContent=c,p.hidden=!c);const v=o==="title"?WA():null;Xg(i.querySelector("[data-chips]"),v?[v,...l]:l)};i.addEventListener("click",p=>{const m=(p.target instanceof Element?p.target:null)?.closest("[data-play],[data-lobby],[data-help]");m&&(p.stopPropagation(),m.dataset.play!==void 0?t():m.dataset.lobby!==void 0?e():s.open())}),cA(()=>{o==="title"&&h()});const f=()=>{for(const p of i.querySelectorAll("button"))wn(p)},d=()=>{clearTimeout(u),i.classList.remove("leaving")};return{visible:()=>o,tapReady:()=>o!=="over"||performance.now()-a>qA,showTitle(){d(),o="title",i.className="screens title",i.innerHTML=XA(),$A(i),f(),h()},setOnline(p){c=p??"",h()},setChips(p){l=p??[],h()},setRanks(p){o==="over"&&zA(i,p)},showOver(p,v,m){d(),o="over",a=performance.now(),i.className="screens over";const g=GA(i,p,v,r,m);return f(),c="",l=[],h(),g},hide(){const p=o;if(o=null,p!=="title"||matchMedia("(prefers-reduced-motion: reduce)").matches){i.className="screens",i.innerHTML="";return}i.classList.add("leaving"),u=window.setTimeout(()=>{i.className="screens",i.innerHTML=""},KA)}}}const ZA=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],JA={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách của map — hết bài tự sang bài khác"},zp=n=>`<div class="two" data-sw="${n}"><button type="button" class="ui-seg" data-on="1">Bật</button><button type="button" class="ui-seg" data-on="0">Tắt</button></div>`;function QA(n,t,e,i,s){i.mode=lo().ghosts;const r=document.createElement("button");r.type="button",r.className="ui-badge",r.dataset.openSettings="",r.setAttribute("aria-label","Cài đặt"),r.innerHTML=Et.gear,t.el.insertBefore(r,t.el.querySelector("[data-snd]"));const o=document.createElement("div");o.className="settings-panel",o.hidden=!0,o.innerHTML=`
    <div class="settings-card ui-indigo ui-trim" role="dialog" aria-label="Cài đặt">
      <div class="panel-head">${Et.gear}<b>Cài đặt</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Et.close}</button>
      <div class="settings-scroll" data-scroll>
        <h3>${Et.speaker}Âm thanh</h3>
        <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span>${zp("sfx")}</div>
        <div class="settings-row"><span>Nhạc nền</span>${zp("music")}</div>
        <h3>${Et.note}Chọn nhạc nền <small data-map-music></small></h3><p class="settings-note"></p><div class="settings-music"></div>
        <h3>${Et.wingsuit}Bóng ma <small>người đã bay hôm nay</small></h3><div class="settings-ghost"></div>
      </div>
    </div>`,n.append(o),wn(o);const a=o.querySelector(".settings-note");o.querySelector("[data-map-music]").textContent=`nhạc của ${Ge.name}`;const c=[JA,...S0(Ge.id)].map(p=>{const v=document.createElement("button");return v.type="button",v.className=`ui-seg settings-opt${p.id==="shuffle"?" shuffle":""}`,v.dataset.music=p.id,v.title=p.style,v.innerHTML='<span class="name"></span><span class="now">♪</span>',v.querySelector(".name").textContent=p.label,v});o.querySelector(".settings-music").append(...c);const l=ZA.map(([p,v])=>{const m=document.createElement("button");return m.type="button",m.className="ui-seg",m.dataset.ghost=p,m.innerHTML=`${Et.wingsuit}<span>${v}</span>`,m});o.querySelector(".settings-ghost").append(...l);const u=()=>{const p=e.music(),v=p?.choice()??lo().music,m=p?.playing()?.id,g=p?.loading()?.id;for(const _ of c){const x=_.dataset.music;_.classList.toggle("on",x===v),_.classList.toggle("playing",x===m||x===g),_.classList.toggle("loading",x===g)}const y=e.prefs();a.textContent=y.music?"":"Nhạc đang tắt — chọn một bài là bật lại.";for(const _ of l)_.classList.toggle("on",_.dataset.ghost===i.mode);for(const _ of o.querySelectorAll("[data-sw] [data-on]")){const x=_.parentElement.dataset.sw;_.classList.toggle("on",y[x]===(_.dataset.on==="1"))}};let h=0;const f=()=>{o.hidden=!0,clearInterval(h)},d=()=>{s.pause(),o.hidden=!1,u(),h=window.setInterval(u,1e3)};wn(r),n.addEventListener("click",p=>{p.target instanceof Element&&p.target.closest("[data-open-settings]")&&d()}),o.addEventListener("click",p=>{const v=p.target instanceof Element?p.target:null;if(v===o||v?.closest("[data-close]"))return f();const m=v?.closest("[data-music],[data-ghost],[data-on]");if(m){if(m.dataset.on){const g=m.parentElement.dataset.sw;e.prefs()[g]!==(m.dataset.on==="1")&&(g==="sfx"?e.toggleSfx:e.toggleMusic)()}else m.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(m.dataset.music)):(i.mode=m.dataset.ghost,A0({ghosts:i.mode}));t.sync(),u()}}),window.addEventListener("keydown",p=>{o.hidden||(p.stopPropagation(),p.code==="Escape"&&f())},{capture:!0})}const xs=8;function $g(n,t,e,i,s){const r=t-n;if(r<=1||s<=n+4)return Number.NaN;const o=Math.min(1,Math.pow((s-n)/r,1/1.5)),a=e*Me(.2,.55,i);return a+o*(e-a)}function qg(n,t){const e=We(n),i=le.road(e);if(i<.02)return null;const s=Yn(n),r=Dn(n),o=s-le.roadDepth(e),a=$g(Kg(n),s,rr(n),r,o);return Number.isNaN(a)?null:(t.lat=a,t.y=o,t.amount=i,t)}function Kg(n){const t=Yn(n);return Me(t-Me(150,240,Dn(n))-Po(n),Ne(n)-13,bh(n))}const jA=2.6,t3=60,Yg=[];for(const n of Co.segs)n.k===0||Math.abs(n.k*n.len)<jA||Yg.push({x:n.x+Math.cos(n.th)/n.k,z:n.z-Math.sin(n.th)/n.k,r:Math.abs(1/n.k)-t3,u:n.u0});function e3(n,t,e){const i=Co,s=Math.round((t+i.oz-i.bz)/i.endZ);for(let r=s-1;r<=s+1;r++)for(const o of Yg){const a=r*i.endX-i.ox+o.x,c=r*i.endZ-i.oz+o.z,l=Math.hypot(n-a,t-c)/o.r;if(l>=1)continue;const u=r*Ci-ci+o.u,h=Yn(u)-Me(150,240,Dn(u+300))-Po(u+300),f=Yn(u)+70+50*(Gn(n/70,t/70,3,91)-.5);let d=h+(f-h)*Math.pow(1-l*l,.6)+40*(Gn(n/45,t/45,3,94)-.5)*(1-l);const p=(d-h)/45+.8*(Gn(n/90,t/90,2,93)-.5);d=Me(d,h+(Math.floor(p)+At(.55,1,p-Math.floor(p)))*45,.85),d>e&&(e=Me(e,d,1-At(.75,1,l)))}return e}const n3=128,i3=1024,Hp=new Map,Il={s:0,lat:0,dist:0},Vp=new WeakMap;function s3(n,t,e){let i=Vp.get(n);i||Vp.set(n,i=new Map);const s=t*4096+e,r=i.get(s);if(r)return r;const o=n.segs[e],a=t*n.endX-n.ox+o.x,c=t*n.endZ-n.oz+o.z,l=Math.sin(o.th),u=Math.cos(o.th),h={x:a,z:c,s0:t*Ci-ci+o.u0,len:o.len,k:o.k,th:o.th,sin:l,cos:u,cx:o.k===0?0:a+u/o.k,cz:o.k===0?0:c-l/o.k,r:o.k===0?0:Math.abs(1/o.k),sg:Math.sign(o.k),bx:t*n.endX-n.ox+o.bx,bz:t*n.endZ-n.oz+o.bz,br:o.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};return Gp(n,t,e,-1,h,"p",o.k===0),Gp(n,t,e,1,h,"n",o.k===0),i.set(s,h),h}function r3(n,t,e,i,s){const r=i*Math.SQRT2/2,o=(t+.5)*i,a=(e+.5)*i,c=Math.round((a+n.oz-n.bz)/n.endZ);Ux(o,a,(c-3)*Ci-ci,(c+4)*Ci-ci,Il,n);const l=Il.dist+2*r+s,u=[];for(let f=c-3;f<=c+4;f++){const d=f*n.endX-n.ox,p=f*n.endZ-n.oz;if(Math.hypot(o-d-n.bx,a-p-n.bz)-n.br>l)continue;const v=n.segs.length-1;for(let m=0;m<=v;m++){const g=n.segs[m];Math.hypot(o-d-g.bx,a-p-g.bz)-g.br>l||u.push(s3(n,f,m))}}const h=f=>Math.hypot(o-f.bx,a-f.bz)-f.br;return u.sort((f,d)=>h(f)-h(d)),{far:Il.dist-r>600,cands:u}}function Gp(n,t,e,i,s,r,o){const a=n.segs.length-1;for(let c=0;c<=a;c++){e+=i,e<0?(e=a,t--):e>a&&(e=0,t++);const l=n.segs[e];if(l.k===0){if(o)continue;return}const u=t*n.endX-n.ox+l.x+Math.cos(l.th)/l.k,h=t*n.endZ-n.oz+l.z-Math.sin(l.th)/l.k;r==="p"?(s.pcx=u,s.pcz=h,s.pr=Math.abs(1/l.k)):(s.ncx=u,s.ncz=h,s.nr=Math.abs(1/l.k));return}}function Wp(n,t,e,i,s,r,o){const a=Math.floor(e/s),c=Math.floor(i/s),l=(a*1000003+c)*2+r;let u=n.get(l);return u||n.set(l,u=r3(t,a,c,s,o)),u}function o3(n,t,e,i){const s=`${e}`;let r=Hp.get(s);(!r||r.size>4e4)&&Hp.set(s,r=new Map);const o=Wp(r,i,n,t,i3,1,e);return o.far?o.cands:Wp(r,i,n,t,n3,0,e).cands}const Ta=30;function hf(n,t,e,i,s=Co){const r=o3(n,t,e,s);let o=1/0,a=0,c=0;for(const u of r){if(Math.hypot(n-u.bx,t-u.bz)-u.br>o+e)continue;let h,f,d=1/0;if(u.k===0){const _=n-u.x,x=t-u.z;h=_*u.sin+x*u.cos,f=_*u.cos-x*u.sin}else{const _=n-u.cx,x=t-u.cz;let b=Math.atan2(u.sg*x,-u.sg*_)-u.th;if(b-=2*Math.PI*Math.round((b-u.k*u.len/2)/(2*Math.PI)),h=b/u.k,d=Math.hypot(_,x),f=u.sg*(u.r-d),d<Ta){const w=Xp[c++]??={s:0,lat:0,dist:0,prom:0,core:0};w.s=u.s0+u.len/2,w.lat=0,w.dist=u.r-d,w.prom=0,w.core=1-d/Ta*(d/Ta)*(3-2*d/Ta)}d+=u.r}if(h<-.01||h>u.len+.01)continue;const p=Math.abs(f);if(p>o+e)continue;p<o&&(o=p);const v=u.s0+Math.min(u.len,Math.max(0,h));let m=!1;for(let _=0;_<a;_++)Math.abs(i[_].s-v)<.5&&(m=!0);if(m)continue;let g=d-p;u.pr>0&&(g=Math.min(g,Math.hypot(n-u.pcx,t-u.pcz)+u.pr-p)),u.nr>0&&(g=Math.min(g,Math.hypot(n-u.ncx,t-u.ncz)+u.nr-p));const y=i[a]??={s:0,lat:0,dist:0,prom:0,core:0};y.s=v,y.lat=f,y.dist=p,y.prom=Math.max(0,g),y.core=0,a++}let l=0;for(let u=0;u<a;u++){if(i[u].dist>o+e)continue;const h=i[l],f=i[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=0,l++}for(let u=0;u<c;u++){const h=i[l++]??={s:0,lat:0,dist:0,prom:0,core:0},f=Xp[u];h.s=f.s,h.lat=f.lat,h.dist=f.dist,h.prom=f.prom,h.core=f.core}return l}const Xp=[],$p=[];function ah(n,t,e,i){const s=hf(n,t,0,$p);for(let r=0;r<s;r++){const o=$p[r];if(o.core===0&&Math.abs(o.s-e)<=Math.abs(i)+80)return!0}return!1}const qp=24,fc=520,Ur=15,a3=14,Kp=200,c3=60,jt={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},$s={n210:()=>Number.isNaN(jt.n210)?jt.n210=Gn(jt.x/210,jt.z/210,3,21):jt.n210,n700:()=>Number.isNaN(jt.n700)?jt.n700=Gn(jt.x/700,jt.z/700,3,5):jt.n700,n500:()=>Number.isNaN(jt.n500)?jt.n500=Gn(jt.x/500,jt.z/500,2,3):jt.n500,out:()=>Number.isNaN(jt.out)?jt.out=90*Of(jt.x/800,jt.z/800,4,7)+30*(Gn(jt.x/160,jt.z/160,3,11)-.5):jt.out,far:()=>Number.isNaN(jt.far)?jt.far=250+1150*Of(jt.x/3200,jt.z/3200,5,9):jt.far,n90:()=>Number.isNaN(jt.n90)?jt.n90=Gn(jt.x/90,jt.z/90,2,71):jt.n90},ve={o:0,ty:0,w:0,sill:0,fly:0,vil:0,xd:0,ra:0,rd:0};function l3(n,t){const{o:e,ty:i,w:s,sill:r,fly:o,vil:a,xd:c,ra:l,rd:u}=ve,h=Me(i-Me(150,240,e)-c,o-13,r),f=Zr(c/190),d=i-h;let p;if(n<=s){const M=s*Me(.2,.55,e),b=Zr((n-M)/(s-M));p=h+d*Me(Math.pow(b,1.5),b*b*(3-2*b),e),e>0&&(p+=e*34*($s.n210()-.35)*At(25,110,n))}else{const M=Zr((n-s)/Me(280,700,e));p=i+(Me(400,-50,e)-260*f+140*($s.n700()-.5))*(1-(1-M)*(1-M))}const v=At(s*.9,s*1.25,n),m=At(Ur+8,Ur+22,n)*(1-v)*(1-e),g=Me(qp,qp*.5,m),y=Math.max(.7*v,.85*m)*(1-.6*f);if(y>0){const M=(p+30*($s.n500()-.5))/g;p=Me(p,(Math.floor(M)+At(.45,1,M-Math.floor(M)))*g,y)}v>0&&(p+=v*$s.out());const _=At(s+900,s+5e3,n);if(_>0&&(p+=_*$s.far()),l>.02&&t>0){const M=i-u,b=$g(h,i,s,e,M);if(!Number.isNaN(b)){const w=l*At(b-3,b-.5,n)*(1-At(b+xs+1,b+xs+4,n));w>0&&(p=Math.min(p,Me(p,M-.4,w)))}}const x=a*(1-At(240,380,n));if(x>0&&(p=Me(p,o-Jr+1.6*($s.n90()-.5)-.012*Math.max(0,n-40),x)),p-=6*(1-At(0,18,n))*(p<h+20?1-r:0),n<Ur){const M=Me(a3+(Ur-n)*2,11+(Ur-n)*.3,r);p=Math.min(p,o-Me(M,Jr+.4,a))}return p}const Dl=[],Yp=[],Zp=new Map;function u3(n,t){const e=n*100003+t;let i=Zp.get(e);if(i!==void 0)return i;const s=(n+.2+.6*ut(n,t,61))*fc,r=(t+.2+.6*ut(n,t,62))*fc,o=70+110*ut(n,t,63),a=hf(s,r,0,Yp)>0?Yp[0]:null;if(!a||Dn(a.s)<.6||a.dist<o+45)i=null;else{const c=au(a.s);i={ox:s,oz:r,r:o,floor:c,peak:Yn(a.s)-200+230*ut(n,t,64)}}return Zp.set(e,i),i}function h3(n,t,e){const i=Math.floor(n/fc),s=Math.floor(t/fc);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=u3(i+o,s+r);if(!a)continue;const c=Math.hypot(n-a.ox,t-a.oz)/a.r;if(c>=1)continue;const l=a.floor+(a.peak-a.floor)*Math.pow(1-c*c,.6);l>e&&(e=Me(e,l,1-At(.8,1,c)))}return e}function Zg(n,t,e){if(!Number.isFinite(n+t))return e.h=e.s=e.lat=e.vil=NaN,e;jt.x=n,jt.z=t,jt.n210=jt.n700=jt.n500=jt.out=jt.far=jt.n90=NaN;const i=hf(n,t,Kp,Dl);let s=1/0;for(let o=0;o<i;o++){const a=Dl[o];a.core===0&&a.dist<s&&(s=a.dist,e.s=a.s,e.lat=a.lat)}ve.o=ve.ty=ve.w=ve.sill=ve.fly=ve.vil=ve.xd=ve.ra=ve.rd=0;let r=0;for(let o=0;o<i;o++){const a=Dl[o],c=(1-At(0,Kp,a.dist-s))*(a.core>0?a.core:At(0,c3,a.prom)+1e-4);if(c<=0)continue;r+=c,ve.o+=c*Dn(a.s),ve.ty+=c*Yn(a.s),ve.w+=c*rr(a.s),ve.sill+=c*bh(a.s),ve.fly+=c*Ne(a.s),ve.vil+=c*qn(a.s),ve.xd+=c*Po(a.s);const l=We(a.s);ve.ra+=c*le.road(l),ve.rd+=c*le.roadDepth(l)}return ve.o/=r,ve.ty/=r,ve.w/=r,ve.sill/=r,ve.fly/=r,ve.vil/=r,ve.xd/=r,ve.ra/=r,ve.rd/=r,e.vil=ve.vil,e.h=e3(n,t,h3(n,t,l3(s,e.lat))),e}const f3={h:0,s:0,lat:0,vil:0};function tn(n,t){return Zg(n,t,f3).h}const wc=`
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
`,hr={uPilot:{value:new me(0,0,0,1)},uHazTime:{value:0}},Tc=`
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
`;function d3(n,t,e,i){hr.uPilot.value.set(n,t,Math.sin(e),Math.cos(e)),hr.uHazTime.value=i}const p3=`
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
}`,m3=`
#include <fog_pars_fragment>
${wc}
${Th}
#ifdef HAZARD
${Tc}
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
}`;let g3=null,v3=null;function Jg(n,t){const e=new ae({vertexShader:p3,fragmentShader:m3,defines:n?{HAZARD:1}:{},uniforms:_n.merge([lt.fog]),fog:!0});return e.uniforms.uLift=t,e.uniforms.uRegionHg=No,n&&Object.assign(e.uniforms,hr),e}const Qg={value:1};function x3(){return g3??=Jg(!0,Qg)}function jg(){return v3??=Jg(!1,Qg)}const _3=le.archPhases,M3=1600;function y3(n,t){const e=Ne(n),i=Dn(n),s=i>.5?90+50*ut(t,1,71):rr(n)+22,r=(i>.5?58:46)+18*ut(t,2,72),o={x:0,y:0,z:0},a=d=>tn(ue(n,d,0,o).x,o.z)-e,c=[];for(let d=0;d<=24;d++){const p=d/24*Math.PI,v=-s*Math.cos(p),m=Math.min(a(v)-15,r),g=m+(r-m)*Math.pow(Math.sin(p),.55)+6*Math.sin(p*3+t);c.push(new N(v,g,4*Math.sin(p*2+t)))}const l=(i>.5?13:9)+4*ut(t,3,73),u=new Mc(new nf(c),90,l,14,!1),h=u.getAttribute("position"),f=u.getAttribute("normal");for(let d=0;d<h.count;d++){const v=(ut(h.getX(d)*.08+t,h.getY(d)*.08+h.getZ(d)*.05,74)-.5)*l*.7;h.setXYZ(d,h.getX(d)+f.getX(d)*v,h.getY(d)+f.getY(d)*v*1.3,h.getZ(d)+f.getZ(d)*v)}return u.setAttribute("aCrest",new St(new Float32Array(h.count),1)),u.computeVertexNormals(),u}function b3(){const n=new Fe,t=jg(),e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=new Set,o=is(s);for(let a=o;a<=o+1;a++)_3.forEach((c,l)=>{const u=a*$e+c-hi;if(u<s-60||u>s+M3)return;const h=a*10+l;if(r.add(h),e.has(h))return;const f=new $t(y3(u,h*1.37),t);ue(u,0,0,i),f.position.set(i.x,i.y,i.z),f.rotation.y=mn(u),f.matrixAutoUpdate=!1,f.updateMatrix(),n.add(f),e.set(h,f)});for(const[a,c]of e)r.has(a)||(n.remove(c),c.geometry.dispose(),e.delete(a))}}}const S3=5,w3=150,T3=1700,E3=300,A3=200,R3=new dr({vertexColors:!0}),C3=new dr({vertexColors:!0}),Ul=new ae({uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
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
}`,transparent:!0,depthWrite:!1,blending:xn});function P3(){const n=new Vt(.25,1.1,.25).translate(0,.55,0),t=n.getAttribute("position"),e=new Float32Array(t.count*3);for(let i=0;i<t.count;i++)e.set(t.getY(i)>.8?[.8,.08,.06]:[.92,.92,.88],i*3);return n.setAttribute("color",new St(e,3)),n}const L3=P3();function N3(){const n=new Fe;let t=null,e=Number.NaN;const i={lat:0,y:0,amount:0},s={x:0,y:0,z:0},r=new Bt,o=a=>{const c=[],l=[],u=[],h=[],f=[],d=(M,b,w)=>(ue(M,b,w-Ne(M),s),[s.x,s.y,s.z]),p=(M,b,w,S,T,R,A)=>{M.push(...w,...S,...T,...w,...T,...R);for(let P=0;P<6;P++)b.push(...A)};let v=null,m=0;for(let M=a-w3;M<=a+T3;M+=S3,m++){const b=qg(M,i)&&i.amount>.5?{s:M,lat:i.lat,y:i.y}:null;if(v&&b){const[w,S]=[v,b],T=[.86,.85,.8],R=m%9===0?[.3,.3,.31]:[.2,.2,.22];p(c,l,d(w.s,w.lat,w.y-.6),d(S.s,S.lat,S.y-.6),d(S.s,S.lat,S.y+.85),d(w.s,w.lat,w.y+.85),T),p(c,l,d(w.s,w.lat,w.y+.85),d(S.s,S.lat,S.y+.85),d(S.s,S.lat+.45,S.y+.85),d(w.s,w.lat+.45,w.y+.85),T),p(c,l,d(w.s,w.lat+.45,w.y+.05),d(S.s,S.lat+.45,S.y+.05),d(S.s,S.lat+xs-1.2,S.y+.05),d(w.s,w.lat+xs-1.2,w.y+.05),R);const A=.45+(xs-1.65)/2;m%2===0&&p(c,l,d(w.s,w.lat+A-.12,w.y+.08),d(S.s,S.lat+A-.12,S.y+.08),d(S.s,S.lat+A+.12,S.y+.08),d(w.s,w.lat+A+.12,w.y+.08),[.95,.78,.25]);for(const P of[0,1]){const I=.45+(P===0?1.6:xs-3.4);u.push(...d(w.s,w.lat+I-.32,w.y+.9),...d(S.s,S.lat+I-.32,S.y+.9),...d(S.s,S.lat+I+.32,S.y+.9),...d(w.s,w.lat+I-.32,w.y+.9),...d(S.s,S.lat+I+.32,S.y+.9),...d(w.s,w.lat+I+.32,w.y+.9));for(const L of[w.s,S.s,S.s,w.s,S.s,w.s])h.push(L,P)}m%3===0&&f.length<A3*4&&(ue(b.s,b.lat+.2,b.y+.85-Ne(b.s),s),f.push(s.x,s.y,s.z,mn(b.s)))}v=b}if(!c.length)return null;const g=new Yt;g.setAttribute("position",new St(new Float32Array(c),3)),g.setAttribute("color",new St(new Float32Array(l),3)),g.computeVertexNormals();const y=new Yt;y.setAttribute("position",new St(new Float32Array(u),3)),y.setAttribute("aTrail",new St(new Float32Array(h),2));const _=new Ve(L3,C3,Math.max(1,f.length/4));for(let M=0;M<f.length/4;M++)r.makeRotationY(f[M*4+3]).setPosition(f[M*4],f[M*4+1],f[M*4+2]),_.setMatrixAt(M,r);const x={mesh:new $t(g,R3),trail:new $t(y,Ul),posts:_};return x.trail.frustumCulled=!1,x.trail.renderOrder=3,x};return{group:n,update(a,c,l){Ul.uniforms.uTime.value=c,Ul.uniforms.uNight.value=Math.min(1,Math.max(0,(l-.45)/.4)),!(!Number.isNaN(e)&&Math.abs(a-e)<E3)&&(e=a,t&&(n.remove(t.mesh,t.trail,t.posts),t.mesh.geometry.dispose(),t.trail.geometry.dispose(),t.posts.dispose()),t=o(a),t&&n.add(t.mesh,t.trail,t.posts))}}}const ii=30,kl=4,Jp=18,Qp=8,jp=24,tm=[0,10,28,55,95,150],em=new ae({uniforms:_n.merge([lt.fog,{uTime:{value:0}}]),vertexShader:`
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
}`,side:Ee,fog:!0});function I3(n,t,e){const i={x:0,y:0,z:0},s=[],r=[],o=Math.ceil((t-n)/kl)+1,a=(d,p)=>.92+.32*ut(d*.02,p*4,e)+.14*ut(d*.11,p*13,e+1);for(let d=0;d<o;d++){const p=n+d*kl;for(let v=0;v<=ii;v++){const m=v/ii,g=m*Math.PI*2,y=a(p,m);ue(p,Jp*y*Math.cos(g),Qp+jp*y*Math.sin(g),i),s.push(i.x,i.y,i.z),r.push(p,m,Math.min(p-n,t-p))}}const c=[];for(let d=0;d<o-1;d++)for(let p=0;p<ii;p++){const v=d*(ii+1)+p,m=v+ii+1;c.push(v,v+1,m,m,v+1,m+1)}const l=new Yt;l.setAttribute("position",new St(new Float32Array(s),3)),l.setAttribute("aCave",new St(new Float32Array(r),3)),l.setIndex(c);const u=[],h=[];for(const[d,p]of[[n,-1],[t,1]]){const v=u.length/3;tm.forEach((m,g)=>{for(let y=0;y<=ii;y++){const _=y/ii,x=_*Math.PI*2,M=a(d,_),b=g?.25*m*(ut(_*9,g,e+5)-.5):0,w=Math.max(-16,Qp+(jp*M+m+b)*Math.sin(x));ue(d-p*(m*.35+(g?3*ut(_*13,g,e+9):0)),(Jp*M+m+b)*Math.cos(x),w,i),u.push(i.x,i.y,i.z)}});for(let m=0;m<tm.length-1;m++)for(let g=0;g<ii;g++){const y=v+m*(ii+1)+g,_=y+ii+1;h.push(y,_,y+1,y+1,_,_+1)}}for(let d=0;d<o;d+=2){const p=n+d*kl,v=u.length/3;for(let m=0;m<=16;m++){const g=-110+220*m/16,y=Math.abs(g)/110,_=58+150*y*y+30*(ut(p*.015,g*.03,e+3)-.5);ue(p,g,_,i),u.push(i.x,i.y,i.z)}if(d+2<o)for(let m=0;m<16;m++)h.push(v+m,v+17+m,v+m+1,v+m+1,v+17+m,v+18+m)}const f=new Yt;return f.setAttribute("position",new St(new Float32Array(u),3)),f.setIndex(h),f.computeVertexNormals(),{tube:l,portals:f}}function D3(){const n=new Fe,t=new Map,e=jg(),i=e.clone();return i.uniforms=e.uniforms,i.side=Ee,{group:n,update(s,r){if(em.uniforms.uTime.value=r,!le.caves.length)return;const o=new Set,a=is(s);for(let c=a-1;c<=a+1;c++)le.caves.forEach(([l,u],h)=>{const f=c*$e+l-hi,d=c*$e+u-hi;if(d<s-200||f>s+2200)return;const p=c*8+h;if(o.add(p),t.has(p))return;const v=I3(f,d,(c*7+h)%97),m=[new $t(v.tube,em),new $t(v.portals,i)];for(const g of m)g.frustumCulled=!1,g.matrixAutoUpdate=!1,n.add(g);t.set(p,m)});for(const[c,l]of t)if(!o.has(c)){for(const u of l)n.remove(u),u.geometry.dispose();t.delete(c)}}}}function gi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Yt;let l=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let p=0;p<d.count;++p)h.push(d.getX(p)+u);u+=n[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=nm(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][f]);const p=nm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function nm(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new St(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let f=0,d=u.count;f<d;f++)for(let p=0;p<e;p++){const v=u.getComponent(f,p);a.setComponent(f+h,p,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function im(n,t){if(t===xM)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(t===Ku||t===W0){let e=n.getIndex();if(e===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);n.setIndex(r),e=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=e.count-2,s=[];if(t===Ku)for(let r=1;r<=i;r++)s.push(e.getX(0)),s.push(e.getX(r)),s.push(e.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(e.getX(r)),s.push(e.getX(r+1)),s.push(e.getX(r+2))):(s.push(e.getX(r+2)),s.push(e.getX(r+1)),s.push(e.getX(r)));return s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),n}const Fl=140,sm=24,U3=2400;function Ea(n,t){const e=n.getAttribute("position").count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set(t,s*3);return n.setAttribute("color",new St(i,3)),n.deleteAttribute("uv"),n}function k3(){return gi([Ea(new Vt(2.4,.9,12).translate(0,.35,0),[.36,.22,.12]),Ea(new Vt(2,.2,7).translate(0,2.3,-.5),[.85,.2,.12]),Ea(new Vt(.15,1.4,.15).translate(.9,1.5,2.5),[.3,.2,.12]),Ea(new Vt(.15,1.4,.15).translate(-.9,1.5,-3.5),[.3,.2,.12])])}function F3(){const n=new Ve(k3(),new dr({vertexColors:!0}),sm);n.frustumCulled=!1,n.count=0;const t=new Bt,e={x:0,y:0,z:0};let i=Number.NaN;return{mesh:n,update(s){const r=Math.floor((s-100)/Fl);if(r===i)return;i=r;let o=0;for(let a=r;o<sm&&a*Fl<s+U3;a++){const c=a*Fl+37*Math.sin(a*1.7);if(Po(c)<120)continue;const l=3*Math.sin(c/140)+2.5*Math.sin(c/47+1.7)+(a%2?7:-7),u=Kg(c);ue(c,l,0,e),t.makeRotationY(mn(c)+(a%3===0?Math.PI:0)+.15*Math.sin(a)).setPosition(e.x,u+.1,e.z),n.setMatrixAt(o++,t)}n.count=o,n.visible=o>0,n.instanceMatrix.needsUpdate=!0}}}const O3=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`;function Ec(n){const t=new dr({vertexColors:!0,side:n.doubleSide?Ee:Di});return t.onBeforeCompile=e=>{e.uniforms.uLift=n.lift,n.hazard&&Object.assign(e.uniforms,hr),e.fragmentShader=`uniform float uLift;
${n.hazard?Tc:""}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${n.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${n.rim.toFixed(3)} * uLift;
    ${n.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${n.windows?O3:""}
  }
  #endif`)},t.customProgramCacheKey=()=>`backlit-${n.selfLit}-${n.rim}-${n.doubleSide?2:1}-${n.hazard?"h":""}${n.windows?"w":""}`,t}const B3=4,z3=.026,H3=7,V3=.035;function G3(n,t){const e=new Float32Array(t*16),i=new Float32Array(t*3),s=new Float32Array(t*4);n.instanceColor||(n.instanceColor=new xo(new Float32Array(t*3).fill(1),3)),n.instanceMatrix.setUsage(sd),n.instanceColor.setUsage(sd);const r=n.geometry;r.boundingSphere||r.computeBoundingSphere();const o=r.boundingSphere,a=new N,c=new Un;let l=0;return{clear:()=>{l=0},add(u,h){l>=t||(u.toArray(e,l*16),h.toArray(i,l*3),a.copy(o.center).applyMatrix4(u),a.toArray(s,l*4),s[l*4+3]=o.radius*u.getMaxScaleOnAxis(),l++)},flush(u,h){const f=n.instanceMatrix.array,d=n.instanceColor.array;let p=0;for(let v=0;v<l;v++)c.center.fromArray(s,v*4),c.radius=s[v*4+3]+H3+V3*c.center.distanceTo(h),u.intersectsSphere(c)&&(f.set(e.subarray(v*16,v*16+16),p*16),d.set(i.subarray(v*3,v*3+3),p*3),p++);if(n.count=p,p!==0)for(const v of[n.instanceMatrix,n.instanceColor])v.clearUpdateRanges(),v.addUpdateRange(0,p*v.itemSize),v.needsUpdate=!0}}}function W3(n,t){const e=n.elements,i=t.elements;return Math.abs(e[0]/i[0]-1)<.015&&Math.abs(e[5]/i[5]-1)<.015&&Math.abs(e[8]-i[8])<.01&&Math.abs(e[9]-i[9])<.01}function X3(){const n=new Do,t=new Bt,e=new N,i=new N(Number.NaN,0,0),s=new Ce,r=new Ce,o=new Bt;return{frustum:n,eye:e,due(a,c){a.updateMatrixWorld(),a.getWorldPosition(e),a.getWorldQuaternion(s);const l=!(e.distanceTo(i)<=B3);return!c&&!l&&s.angleTo(r)<=z3&&W3(a.projectionMatrix,o)?!1:(i.copy(e),r.copy(s),o.copy(a.projectionMatrix),n.setFromProjectionMatrix(t.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse)),!0)}}}function bs(n,t,e,i,s){const r=n.getAttribute("position"),o=new Float32Array(r.count*3);for(let a=0;a<r.count;a++){const c=Math.min(1,Math.max(0,(r.getY(a)-i)/(s-i))),l=.85+.3*ut(r.getX(a)*.7,r.getZ(a)*.7+r.getY(a),5);for(let u=0;u<3;u++)o[a*3+u]=Math.pow(t[u]+(e[u]-t[u])*c*c,2.2)*l}return n.setAttribute("color",new St(o,3)),n}function ff(n,t,e){const i=n.getAttribute("position");for(let s=0;s<i.count;s++){const r=i.getX(s),o=i.getY(s),a=i.getZ(s),c=(ut(r*1.3+e,a*1.3,9)-.5)*t;i.setXYZ(s,r*(1+c),o+c*.6,a*(1+c))}return n.computeVertexNormals(),n}function tv(){const n=[new en(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([i,s,r],o)=>n.push(ff(new Uo(i,s,7,1).toNonIndexed().translate(0,r+s/2,0),.25,o)));const e=gi(n.map(i=>i.index?i.toNonIndexed():i));return e.computeVertexNormals(),bs(e,[.05,.12,.07],[.42,.52,.2],1,14)}function ev(){const n=[new en(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([i,s,r,o,a],c)=>n.push(ff(new As(o,a).translate(i,s,r),.35,c*3)));const e=gi(n);return e.computeVertexNormals(),bs(e,[.07,.13,.05],[.62,.6,.18],3,13)}function $3(){const n=[new en(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,i,s]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])n.push(new Uo(e,i,5,1).toNonIndexed().translate(0,s+i/2,0));const t=gi(n);return t.computeVertexNormals(),bs(t,[.05,.12,.07],[.42,.52,.2],1,14)}function q3(){const n=[new en(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,i,s,r,o]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])n.push(ff(new As(r,0).translate(e,i,s),.35,o*3));const t=gi(n);return t.computeVertexNormals(),bs(t,[.07,.13,.05],[.62,.6,.18],3,13)}function K3(){const n=[];for(const[i,s]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])n.push(new Vt(.4,3,.4).translate(i,1.5,s).toNonIndexed());n.push(bs(new Vt(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const t=new Uo(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();n.push(bs(t,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const i of n)i.getAttribute("color")||bs(i,[.22,.15,.09],[.3,.2,.12],0,3);const e=gi(n);return e.computeVertexNormals(),e}function Y3(){const n=[];for(const t of[-2.4,0,2.4])n.push(new Vt(1.1,1,.1).translate(t,4.8,2.85).toNonIndexed()),n.push(new Vt(1.1,1,.1).translate(t,4.8,-2.85).toNonIndexed());return gi(n)}const ch=250,Z3=40,kr=1,nv=650,Rn={x:0,y:0,z:0},Ol={lat:0,y:0,amount:0};function rm(n,t){return Math.hypot(tn(n+3,t)-tn(n-3,t),tn(n,t+3)-tn(n,t-3))/6}function J3(n,t){const e=[],i=[],s=Io()>.5,r=s?Math.round(t*.6):t,o=s?1.1:3.2;for(let a=0;a<nv*2.2&&e.length<r;a++){const c=(n+ut(a*.71,n,41))*ch,l=ut(n,a*.37,42)<.5?-1:1,u=rr(c),h=Math.pow(ut(a*.53,n*1.7,43),2.6)*(240+560*Dn(c)),f=Math.max(u*.7,17)+h;ue(c,l*f,0,Rn);const d=Rn.x,p=Rn.z;if(!ah(d,p,c,f))continue;const v=tn(d,p),m=Ne(c);if(f<24&&v>m-(bh(c)>.5?12:22)||rm(d,p)>o||v<m-200||s&&l>0&&qg(c,Ol)&&f>Ol.lat-5&&f<Ol.lat+xs+6)continue;const g=.7+.9*ut(a,n*3.1,44);e.push({p:new N(d,v-.5,p),s:g,r:ut(a,n,45)*6.28,kind:ut(d/90,p/90,46)<.55?0:1})}for(let a=0;a<40&&i.length<7;a++){const c=(n+ut(a*1.31,n,51))*ch,l=ut(n,a*.91,52)<.5?-1:1,u=Math.max(rr(c)*.7,30)+ut(a,n*2.3,53)*220;if(ue(c,l*u,0,Rn),!ah(Rn.x,Rn.z,c,u))continue;const h=tn(Rn.x,Rn.z);rm(Rn.x,Rn.z)>.45||h>Ne(c)-18||i.push({p:new N(Rn.x,h,Rn.z),s:1,r:mn(c)-l*(Math.PI/2)+(ut(a,n,54)-.5),kind:0})}return{trees:e,houses:i}}const df={value:1},Q3=Ec({lift:df,selfLit:.2,rim:.85}),pf=Ec({lift:df,selfLit:.2,rim:.85});function qs(n,t,e=!1){const i=e?new cn({color:"#ffb35a"}):Q3,s=new Ve(n,i,t);return s.count=0,s.frustumCulled=!1,s}function j3(n){const t=n.ahead,e=Math.round(nv*n.density),i=e*(kr+t+1),s=new Fe,r=qs(tv(),i),o=qs(ev(),i),a=qs($3(),i),c=qs(q3(),i),l=qs(K3(),8*(kr+t+1)),u=qs(Y3(),8*(kr+t+1),!0);s.add(r,o,a,c,l,u);const h=[r,o,a,c].map(w=>G3(w,i)),f=X3();let d=!0;const p=new Map;let v=Number.NaN;const m=new Bt,g=new Ce,y=new N(0,1,0),_=new N,x=new ct,M=new ct,b=()=>{h.forEach(S=>S.clear());let w=0;for(let S=v;S<=v+kr+t;S++){let T=p.get(S);T||p.set(S,T=J3(S,e));const R=S-v>n.near-1?2:0;for(const A of T.trees){g.setFromAxisAngle(y,A.r),m.compose(A.p,g,_.set(A.s,A.s*(.9+.25*Math.sin(A.r*3)),A.s));const P=Io();x.setHSL(.22-.05*P+.06*Math.sin(A.r*5),.25,.5-.07*P+.12*Math.cos(A.r*7)),h[R+A.kind].add(m,x.multiplyScalar(2))}for(const A of T.houses)g.setFromAxisAngle(y,A.r),m.compose(A.p,g,_.set(1,1,1)),l.setMatrixAt(w,m),u.setMatrixAt(w++,m)}for(const S of[...p.keys()])(S<v-1||S>v+kr+t+1)&&p.delete(S);l.count=w,u.count=w;for(const S of[l,u])S.instanceMatrix.needsUpdate=!0;d=!0};return{group:s,update(w,S,T){const R=Math.floor((w-Z3)/ch);if(R!==v&&(v=R,b()),f.due(T,d)){for(const A of h)A.flush(f.frustum,f.eye);d=!1}df.value=1-.55*Math.min(1,Math.max(0,(S-.4)/.5)),u.material.color.copy(M.set("#ffb35a").multiplyScalar(.25+3.2*S*S))}}}const mf=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2],Oo=[.8,.3,.16],iv=[.6,.32,.22],gf=[.9,.76,.45],sv=[.88,.84,.76],tR=[.2,.45,.36],vf=[.45,.25,.14],rv=[.58,.33,.24];function te(n,t,e=.1,i=1){const s=n.index?n.toNonIndexed():n;s.deleteAttribute("uv"),s.getAttribute("normal")||s.computeVertexNormals();const r=s.getAttribute("position"),o=new Float32Array(r.count*3),a=mf(t);for(let c=0;c<r.count;c++){const l=1-e/2+e*ut(r.getX(c)*.8+i,r.getY(c)*.8+r.getZ(c)*.6,17);for(let u=0;u<3;u++)o[c*3+u]=a[u]*l}return s.setAttribute("color",new St(o,3)),s}const Qn=n=>gi(n);function Eo(n,t,e,i){const s=n.getAttribute("position"),r=n.getAttribute("color");for(let o=0;o<s.count;o++){const a=i+(1-i)*Math.min(1,Math.max(0,(s.getY(o)-t)/(e-t)));r.setXYZ(o,r.getX(o)*a,r.getY(o)*a,r.getZ(o)*a)}return n}const ov=[1,.7,.32];function Ac(n,t,e,i,s=0,r=[.55,.2,.12]){const o=[],a=Math.max(6,Math.round(n/.45)),c=Math.max(4,Math.round(Math.hypot(t,e)/.42)),l=mf(i);for(const u of[-1,1]){const h=[],f=[],d=[];for(let v=0;v<=c;v++){const m=v/c;for(let g=0;g<=a;g++){const y=(g/a-.5)*n,_=Math.pow(Math.abs(y)/(n/2),5);h.push(y,e*(1-m)+s*_*(.35+.65*m),u*t*m*(1+.06*_));const x=(g%2?1:.72)*(v%2?1:.88)*(.8+.35*ut(y*.3,m*4+u,23));f.push(l[0]*x,l[1]*x,l[2]*x)}}for(let v=0;v<c;v++)for(let m=0;m<a;m++){const g=v*(a+1)+m;u>0?d.push(g,g+a+1,g+1,g+1,g+a+1,g+a+2):d.push(g,g+1,g+a+1,g+1,g+a+2,g+a+1)}const p=new Yt;p.setAttribute("position",new St(new Float32Array(h),3)),p.setAttribute("color",new St(new Float32Array(f),3)),p.setIndex(d),p.computeVertexNormals(),o.push(p.toNonIndexed())}return o.push(te(new Vt(n+.3,.32,.42).translate(0,e+.05,0),r,.05)),Qn(o)}function eR(n,t,e,i,s){const r=t/2,o=[];for(const c of[-1,1]){const l=c*n/2;c>0?o.push(l,e,-r,l,e+i,0,l,e,r):o.push(l,e,-r,l,e,r,l,e+i,0)}const a=new Yt;return a.setAttribute("position",new St(new Float32Array(o),3)),a.computeVertexNormals(),te(a,s,.08)}function nR(n,t,e,i=Oo){const r=t-4.4-.25,o=[Ac(n,3.8,4.4,i,2.2,ov).translate(0,r,0)];for(let a=-n/2+2;a<=n/2-2;a+=3.2)for(const c of[-2.6,2.6])o.push(te(new en(.26,.3,r-e+6,6).translate(a,(r+e-6)/2,c),vf,.15,a));return o.push(te(new Vt(n-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),Qn(o)}function iR(n,t={pillar:rv,wall:gf,tile:Oo}){const e=[];for(const i of[-1,1])e.push(te(new Vt(2.4,7-n+6,2.4).translate(i*11.2,(7+n-6)/2,0),t.pillar,.2,i)),e.push(te(new Vt(3,.5,3).translate(i*11.2,7.2,0),[.85,.8,.7],.08,i));return e.push(te(new Vt(22.4,1.6,1.6).translate(0,-.2,0),vf,.12)),e.push(te(new Vt(20,3.6,1.1).translate(0,2.4,0),t.wall,.1)),e.push(te(new Vt(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(te(new Vt(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(Ac(27,2.2,4.4,t.tile,1.6).translate(0,5.3,0)),Qn(e)}function sR(){const n=[Eo(te(new Vt(.4,3.2,10).translate(0,0,0),rv,.22),-1.6,.6,.62),Ac(10.2,.45,.35,Oo).rotateY(Math.PI/2).translate(0,1.6,0)];for(let t=-5;t<=5;t+=2.5)n.push(Eo(te(new Vt(.7,3.7,.7).translate(0,.25,t),[.5,.27,.2],.15,t),-1.6,.6,.6)),n.push(te(new Vt(.86,.26,.86).translate(0,2.2,t),[.9,.88,.82],.06,t));return Qn(n)}const rR={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function av(n=rR){const t=[te(new en(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),n.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([i,s,r,o],a)=>{const c=new As(o,1).scale(1.15,.62,1.15).translate(i,s,r);c.deleteAttribute("uv"),c.computeVertexNormals();const l=c.getAttribute("position"),u=c.getAttribute("normal"),h=new Float32Array(l.count*3);for(let f=0;f<l.count;f++){const d=ut(l.getX(f)*.9+a,l.getZ(f)*.9,l.getY(f)+31),p=u.getY(f)+(d-.5)*.7,v=p<-.05?n.under[0]:p<.12?n.under[1]:d<.6?n.flower[0]:n.flower[1],m=mf(v),g=.75+.35*Math.min(1,Math.max(0,(l.getY(f)-4.5)/4));h.set([m[0]*g,m[1]*g,m[2]*g],f*3)}c.setAttribute("color",new St(h,3)),t.push(c)}),Qn(t)}const oR=2600,cv=[.6,.58,.55],aR=[.3,.29,.31];function cR(){const n=(t,e,i,s)=>Eo(te(new Ms(e,18,10,0,Math.PI*2,0,Math.PI/2).scale(1,i/e,1).translate(t,-4,0),[.42,.6,.28],.14,s),-4,i,.7);return Qn([n(-62,70,62,11),n(62,64,56,12)])}function lR(){return Qn([te(new Vt(5,1.2,3).translate(0,.6,0),cv,.1,21),te(new Vt(2.4,6,.9).translate(0,4.2,0),[.92,.9,.86],.04,22),te(new en(1.3,1.3,.9,12,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,7.2,0),[.82,.12,.08],.05,23)])}function uR(){const n=(e,i,s,r,o,a)=>[te(new Vt(e,s,i).translate(r,s/2,o),[.7,.62,.5],.08,a),te(new en(.01,i*.62,e+1.6,4,1).rotateZ(Math.PI/2).rotateX(Math.PI/4).scale(1,.55,1).translate(r,s+i*.17,o),aR,.08,a+1)],t=(e,i,s,r,o)=>te(new Vt(e,4,i).translate(s,2,r),cv,.12,o);return Qn([t(64,1.6,0,-22,31),t(64,1.6,0,22,32),t(1.6,44,-32,0,33),t(1.6,44,32,0,34),...n(30,12,11,0,8,35),...n(22,9,7,-14,-10,37),...n(22,9,7,14,-10,39)])}const om={"nui-doi":{geo:cR,scale:1},"bia-ma-pi-leng":{geo:lR,scale:2.2},"dinh-vua-meo":{geo:uR,scale:1.4}};function hR(){const n=new Fe,t=new Map,e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=le.landmarks;if(!r?.length)return;const o=new Set,a=is(s);for(let c=a-1;c<=a+1;c++)r.forEach((l,u)=>{const h=c*$e+l.phase-hi;if(h<s-300||h>s+oR)return;const f=c*16+u;if(o.add(f),e.has(f))return;let d=t.get(l.kind);d||t.set(l.kind,d=om[l.kind].geo());const p=new $t(d,pf);ue(h,l.lat,0,i),p.position.set(i.x,tn(i.x,i.z),i.z),p.rotation.y=mn(h)+(l.turn??0),p.scale.setScalar(om[l.kind].scale),p.matrixAutoUpdate=!1,p.updateMatrix(),n.add(p),e.set(f,p)});for(const[c,l]of e)o.has(c)||(n.remove(l),e.delete(c))}}}const lv={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},uv=.18;function Bl(n,t,e,i=0){const[s,r,o,a]=lv[n],c=Math.min(1,Math.max(0,t));return c<.5?e.set(s).lerp(new ct(r),c*2):e.set(r).lerp(new ct(o),(c-.5)*2),i>0?e.lerp(new ct(a),Math.min(1,i)):e}function fR(n,t,e=0){const i=n.y+(-.07-n.y)*Math.min(1,Math.max(0,t)*1.25)+uv*e,s=Math.hypot(n.x,i,n.z);return{x:n.x/s,y:i/s,z:n.z/s}}const zl=900,dR=15e-6,pR=14e-5;function mR(n){const t=new ct(n);return`vec3(${t.r.toFixed(4)}, ${t.g.toFixed(4)}, ${t.b.toFixed(4)})`}function gR(){return Object.entries(lv).map(([n,t])=>`#define ATM_${n.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${t.map(mR).join(", ")})`).join(`
`)}function hv(n,t="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${t})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${gR()}
#define ATM_SUN_DIR normalize(vec3(${n.x.toFixed(5)}, mix(${n.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${uv.toFixed(3)} * atmMorn(), ${n.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${zl.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${zl.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${zl.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${dR.toExponential(3)} + density * avg);
}
`}function vR(n,t){qt.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,qt.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,qt.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${hv(t)}
#endif`,qt.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,n.fog=new Xh(new ct(0,0,0),pR)}function xR(n,t,e=0){n.fog.color.setRGB(t,e,0)}const _R=`
#include <fog_pars_vertex>
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,MR=`
#include <fog_pars_fragment>
${wc}
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
}`;function yR(n){const t=new N,e=new ae({vertexShader:_R,fragmentShader:MR,defines:n?{CLOUD_LITE:1}:{},uniforms:_n.merge([lt.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new ot(0,1)}}]),transparent:!0,depthWrite:!1,fog:!0}),i=new $t(new Zn(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return i.frustumCulled=!1,i.renderOrder=1,{mesh:i,update(s,r,o){const a=s.position;s.getWorldDirection(t),e.uniforms.uFwd.value.set(t.x,t.z).normalize();const c=o+250,l=Dn(c);i.position.set(a.x,au(c)+20+(Yn(c)-170-au(c)-20)*l,a.z),e.uniforms.uTime.value=r,e.uniforms.uCover.value=.62-.1*l+.5*(1-le.cloud(We(c)))}}}const am=120,fv=30,dv=7,bR=dv*(fv+2);function SR(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");for(let i=0;i<18;i++){const s=30+34*ut(i,4,7),r=128+(ut(i*1.7,1,3)-.5)*(240-2*s-20),o=140+(ut(1,i*2.3,5)-.5)*60-(s-30)*.6,a=t.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.fillRect(0,0,256,256)}const e=new Jh(n);return e.colorSpace=Xe,e}const wR=`
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
}`,TR=`
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
}`;function ER(n){const t=Math.max(10,Math.round(fv*n)),e=new ae({vertexShader:wR,fragmentShader:TR,uniforms:_n.merge([lt.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:Ee,fog:!0});e.uniforms.uMap.value=SR();const i=new Ve(new Zn(1,1),e,bR);i.frustumCulled=!1,i.count=0;const s=new Bt,r=new Ce,o=new N,a=new N;let c=Number.NaN;return{mesh:i,update(l){const u=Math.floor(l/am)-1;if(u===c)return;c=u;let h=0;for(let f=u;f<u+t+2;f++)for(let d=0;d<dv;d++){const p=(f+ut(d*.7,f,91))*am,v=Dn(p),m=ut(f,d*1.3,92)<.5?-1:1,g=ut(d,f*1.9,93);let y,_,x;if(d<2)x=12+14*g,y=m*(16+x*.5+g*30*v),_=Ne(p)-10+ut(f,d,94)*12+16*qn(p);else{if(v<.5||d>3)continue;y=m*(120+g*500),_=Yn(p)-210-ut(f,d,95)*60,x=60+80*g}ue(p,y,0,o),ah(o.x,o.z,p,y)&&(s.compose(o.set(o.x,_,o.z),r,a.set(x*1.6,x*.75,1)),i.setMatrixAt(h++,s))}i.count=h,i.instanceMatrix.needsUpdate=!0}}}const AR=`
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
}`,RR=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function xf(n,t={}){const e=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*4),r=new Yt;r.setAttribute("position",new St(e,3)),r.setAttribute("aSize",new St(i,1)),r.setAttribute("aColor",new St(s,4));const o=new ae({vertexShader:AR,fragmentShader:RR,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:t.core??2.4}},transparent:!0,depthWrite:!1,blending:xn}),a=new lc(r,o);return a.frustumCulled=!1,a.renderOrder=4,{points:a,set(c,l,u,h,f,d,p,v,m){e[c*3]=l,e[c*3+1]=u,e[c*3+2]=h,i[c]=f,s[c*4]=d,s[c*4+1]=p,s[c*4+2]=v,s[c*4+3]=m},commit(c){r.setDrawRange(0,c);for(const l of["position","aSize","aColor"])r.getAttribute(l).needsUpdate=!0},setViewport(c,l){o.uniforms.uScale.value=c/(2*Math.tan(l*Math.PI/360)),t.maxFrac&&(o.uniforms.uMaxPx.value=Math.max(4,c*t.maxFrac))}}}const $i=5,Hl=3,CR=.08,PR=3,LR=new ct("#ffd27a"),NR=new ct("#9b8cff");function IR(){const n={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},t=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new Yt;return e.setAttribute("position",new Jt(t.flat().flatMap(i=>n[i]),3)),e}function DR(){const n=new cn({color:"#ffffff",blending:xn,transparent:!0,depthWrite:!1,side:Ee,fog:!1}),t=new Ve(IR(),n,$i);t.frustumCulled=!1,t.count=0;const e=xf($i*(Hl+1),{maxFrac:.025,core:1.1}),i={z:0,x:0,v:0,ended:!1,after:0},s=new Fe;s.add(t,e.points);const r=Array.from({length:$i},()=>new N),o=new Array($i).fill(0),a=new Array($i).fill(0),c=new Array($i).fill(0),l=new Array($i).fill(0),u=new Bt,h=new Ce,f=new di(0,0,0,"YXZ"),d=new N,p={x:0,y:0,z:0},v=new N(1.25,1.25,1.25),m=new ct,g={group:s,setViewport:(y,_)=>e.setViewport(y,_),heads:r,alphas:o,owner:a,count:0,mode:"on",update(y,_,x,M,b){let w=0,S=0;const T=g.mode==="off"?[]:y.slice(0,$i),R=Fg(T),A=new Set(T.map((I,L)=>[Math.abs(I.at.z-_.z),L]).filter(([,I])=>sh(I,_.z,R)>0).sort((I,L)=>I[0]-L[0]).slice(0,PR).map(([,I])=>I)),P=g.mode==="dim"?.5:1;T.forEach((I,L)=>{const{z:O,x:B,v:X,ended:J,after:H}=I.at,$=O-_.z,j=M>0?(B-c[L])/M:0;if(c[L]=B,l[L]+=(Math.max(-.8,Math.min(.8,j*.03))-l[L])*Math.min(1,M*10),$<-4)return;ue(O,B,X,d);const vt=J&&I.run.crash?H/.8:J?1:0,gt=Math.abs($)<10&&Math.abs(B-_.x)<3.2&&Math.abs(X-_.v)<3?.25:1,Rt=1-Math.min(1,Math.max(0,(Math.abs($)-220)/80)),Ft=Math.min(1,($+4)/4),zt=.15+.85*Math.min(1,Math.max(0,(d.distanceTo(b)-9)/6)),V=(I.self?.45:.3)*P*sh(L,_.z,R)*gt*Rt*Ft*zt*Math.max(0,1-vt);if(!(V<=.01)){f.set(-Math.atan(Pi(O))+(J?H*9:0),mn(O),l[L]+(J?H*13:0)),u.compose(d,h.setFromEuler(f),v),t.setMatrixAt(w,u),m.copy(I.self?LR:NR),A.has(L)&&e.set(S++,d.x,d.y,d.z,2.5,m.r,m.g,m.b,V*.9);for(let Y=1;Y<=Hl&&!J&&P===1&&A.has(L);Y++){Ug(I.track,x-Y*CR,i),ue(i.z,i.x,i.v,p);const yt=1-Y/(Hl+1);e.set(S++,p.x,p.y,p.z,1.8*yt,m.r,m.g,m.b,V*.55*yt)}t.setColorAt(w,m.multiplyScalar(V*1.6)),r[w].set(d.x,d.y+1.6,d.z),o[w]=V,a[w]=L,w++}}),t.count=w,e.commit(S),g.count=w,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}};return g}function UR(){const n=new lg;for(let t=0;t<10;t++){const e=t%2?.11:.28,i=t/10*Math.PI*2+Math.PI/2;t?n.lineTo(Math.cos(i)*e,Math.sin(i)*e):n.moveTo(Math.cos(i)*e,Math.sin(i)*e)}return new rf(n)}function kR(){const n=new cn({color:new ct("#ffd76a").multiplyScalar(2.2),blending:xn,transparent:!0,depthWrite:!1,fog:!1}),t=new Ve(UR(),n,3);t.frustumCulled=!1,t.count=0;const e=new Bt,i=new N,s=new N,r=new Ce;return{mesh:t,update(o,a,c,l){if(a<=0){t.count=0;return}const u=Math.min(1,a*3);l.getWorldQuaternion(r);for(let h=0;h<3;h++){const f=c*6+h*Math.PI*2/3;i.set(o.x+Math.cos(f)*.8,o.y+.9+Math.sin(f*2)*.1,o.z+.45+Math.sin(f)*.5),s.setScalar(u*(1+.25*Math.sin(c*14+h*2))),e.compose(i,r,s),t.setMatrixAt(h,e)}t.count=3,t.instanceMatrix.needsUpdate=!0}}}const lh=6,Js=3,Qs=28,ps=Qs+1,Fr=lh*Js*ps*2,FR=[1.2,1.75,2.2],OR=Math.PI*2*.45,BR=2.4,zR=`
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
  }`,HR=`
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
  }`;function VR(){const n=new Yt,t=new Float32Array(Fr*3),e=new Float32Array(Fr*3),i=new Float32Array(Fr),s=new Float32Array(Fr),r=new Float32Array(Fr),o=[];for(let f=0;f<lh*Js;f++)for(let d=0;d<ps;d++){const p=(f*ps+d)*2;s[p]=-1,s[p+1]=1,r[p]=r[p+1]=d/Qs,d<Qs&&o.push(p,p+1,p+2,p+1,p+3,p+2)}n.setAttribute("position",new St(t,3)),n.setAttribute("aTan",new St(e,3)),n.setAttribute("aGlow",new St(i,1)),n.setAttribute("aSide",new St(s,1)),n.setAttribute("aU",new St(r,1)),n.setIndex(o);const a=new ae({vertexShader:zR,fragmentShader:HR,uniforms:{uTime:{value:0},uWidth:{value:.16}},blending:xn,transparent:!0,depthWrite:!1,side:Ee}),c=new $t(n,a);c.frustumCulled=!1,c.renderOrder=2;const l=new Map,u=new Float32Array(ps*3),h={x:0,y:0,z:0};return{mesh:c,update(f,d,p){a.uniforms.uTime.value=d;const v=e_(f),m=f.gusts.find(y=>!y.taken&&!y.missed);let g=0;for(const y of f.gusts){if(g>=lh||y.z+y.len<p-5||y.z>p+320)continue;y.taken&&!l.has(y.id)&&l.set(y.id,d);const _=y.taken?d-l.get(y.id):0,x=y.taken?Math.max(0,2.4*(1-_/.4)):y.missed?.18:y===m?1.5:.9;if(!(x<=0)){for(let M=0;M<Js;M++){for(let w=0;w<ps;w++){const S=w/Qs,T=M/Js*Math.PI*2+S*OR+d*BR,R=FR[M];ue(y.z+S*y.len,pn(y.lane)+R*Math.cos(T),y.v+v+R*Math.sin(T),h),u[w*3]=h.x,u[w*3+1]=h.y,u[w*3+2]=h.z}const b=g*Js+M;for(let w=0;w<ps;w++){const S=Math.max(0,w-1),T=Math.min(Qs,w+1);for(let R=0;R<2;R++){const A=(b*ps+w)*2+R;for(let P=0;P<3;P++)t[A*3+P]=u[w*3+P],e[A*3+P]=u[T*3+P]-u[S*3+P];i[A]=x}}}g++}}for(const y of l.keys())f.gusts.some(_=>_.id===y)||l.delete(y);n.setDrawRange(0,g*Js*Qs*6);for(const y of["position","aTan","aGlow"])n.getAttribute(y).needsUpdate=!0;c.visible=g>0}}}function GR(){const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Jh(n)}const pv=new Zn(1,1).rotateX(-Math.PI/2),mv=new cn({map:GR(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function WR(n){const t=new Ve(pv,mv,n);return t.count=0,t.frustumCulled=!1,t.renderOrder=1,t}function XR(n,t,e){const i=new $t(pv,mv);return i.scale.set(n,1,t),i.position.y=e,i.renderOrder=1,i.updateMatrix(),i}const _f=[.86,.66,.36],gv=[.78,.58,.32],Rc=[.36,.34,.35],vv=[.3,.29,.3],Vl=[.58,.56,.53],$R={pillar:[.52,.5,.48],wall:_f,tile:Rc},qR={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},KR=()=>av(qR);function YR(){const n=[Eo(te(new Vt(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let t=0;t<2;t++)for(let e=0;e<12;e++){const i=ut(e*.73,t*1.9,61),s=-4.6+(e+.5*t)*.76,r=new Vt(.95,.4+.22*i,.62+.3*i).rotateX((i-.5)*.35).rotateY((i-.5)*.4),o=.78+.34*ut(e,t,62);n.push(te(r.translate(0,.25+t*.46,s),[Vl[0]*o,Vl[1]*o,Vl[2]*o],.12,e+t*13))}return Qn(n)}const ZR=[.3,.22,.19],Gl=[.92,.9,.84],JR=[.8,.82,.85];function xv(n,t){const e=[],i=new Vt(n.len,n.wallH+n.sink,n.width).translate(0,(n.wallH-n.sink)/2,0);e.push(Eo(te(i,n.wall,.14,t),0,2.5,.72)),e.push(te(new Vt(n.len+.08,.7,n.width+.08).translate(0,.25,0),[.5,.44,.36],.1,t)),e.push(te(new Vt(n.len+.06,.45,n.width+.06).translate(0,n.wallH-.2,0),ZR,.08,t)),e.push(eR(n.len,n.width,n.wallH,n.rise,n.wall)),e.push(Ac(n.len+.6,n.width/2+.35,n.rise+.25,n.tile,0,n.crest?ov:void 0).translate(0,n.wallH-.2,0));const s=-n.width/2-.04;e.push(te(new Vt(1.3,2.3,.08).translate(0,1.15,s+.01),Gl,.06,t)),e.push(te(new Vt(1,2,.1).translate(0,1,s-.02),vf,.1,t)),e.push(te(new Vt(1.8,.25,.34).translate(0,.12,s-.17),[.62,.58,.52],.08,t));for(let r=0;r<n.floors;r++){const o=1.5+r*3.1;for(const a of r===0?[-n.len/2+.85,n.len/2-.85]:[-.9,.9])e.push(te(new Vt(.8,1,.1).translate(a,o,s),tR,.12,t+a));if(r>0&&n.balcony){const a=n.len*.78;e.push(te(new Vt(a,.18,.4).translate(0,o-1.05,s-.2),[.7,.66,.6],.08,t)),e.push(te(new Vt(a,.08,.08).translate(0,o-.15,s-.32),Gl,.05,t));for(let c=0;c<=6;c++)e.push(te(new Vt(.06,.82,.06).translate(-a/2+a*c/6,o-.55,s-.32),Gl,.05,t))}}if(n.tank){const r=n.wallH+n.rise+.1;e.push(te(new en(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(n.len*.22,r+.45,0),JR,.12,t)),e.push(te(new Vt(.9,.2,.7).translate(n.len*.22,r,0),[.4,.38,.36],.08,t))}return Qn(e)}function QR(n,t,e=!1){const s=e?n%2?gv:_f:n%2?sv:gf,r=e?n%3===2?vv:Rc:n%3===2?iv:Oo;return xv({len:4.4,width:5.2,wallH:t-3.2-.3,rise:3.2,wall:s,tile:r,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},n*7.1)}function Aa(n,t=!1){const e=t?n?gv:_f:n?sv:gf,i=t?n?vv:Rc:n?iv:Oo;return xv({len:8-n,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:i,floors:1,sink:2.5,tank:!t,crest:!1,balcony:!t},3+n)}const ms=250,cm=1,jR=6,Mf={value:1},tC=Ec({lift:Mf,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),eC=Ec({lift:Mf,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function Wl(n,t,e){return ue(n,t,0,e),e.y=tn(e.x,e.z),e}function nC(n,t){const e=[],i=n*ms;if(Math.max(qn(i),qn(i+ms/2),qn(i+ms))===0)return e;const s=new N,r=Io()>.5?4:0,o=(a,c)=>qn(a)>.3&&c.y<Ne(a)-6&&c.y>Ne(a)-14;for(let a=0;a<t;a++){const c=i+ut(a*.77,n,81)*ms,u=(ut(n,a*.41,82)<.5?-1:1)*(18+Math.pow(ut(a*.53,n*1.3,83),1.8)*190);o(c,Wl(c,u,s))&&e.push({p:s.clone(),r:ut(a,n,84)*6.28,s:.8+.5*ut(n,a,85),kind:r})}for(let a=0;a<2;a++){const c=i+(.25+.5*a)*ms+(ut(n,a,86)-.5)*60,u=(ut(n*1.7,a,87)<.5?-1:1)*(24+ut(n,a*3.1,88)*90);for(let h=0;h<7;h++){const f=c+(ut(h,n+a,89)-.5)*70,d=u+(ut(h*1.9,n+a,90)-.5)*50;if(Math.abs(d)<17||!o(f,Wl(f,d,s)))continue;const p=mn(f)+(d>0?Math.PI/2:-Math.PI/2)+(ut(h,a,91)-.5)*.5;e.push({p:s.clone(),r:p,s:1,kind:r+1+h%2})}}for(let a=0;a<2;a++){const c=a?1:-1,l=i+ut(n,a,92)*(ms-60),u=3+Math.floor(ut(n,a*2.3,93)*4);for(let h=0;h<u;h++){const f=l+h*10.2;o(f,Wl(f,c*13.5,s))&&e.push({p:s.clone(),r:mn(f),s:1,kind:r+3})}}return e}function iC(n){const t=cm+Math.max(3,Math.round(jR*n))+1,e=Math.round(34*Math.max(.5,n)),i=new Fe,s=[av(),Aa(0),Aa(1),sR(),KR(),Aa(0,!0),Aa(1,!0),YR()],r=[34,7,7,12,34,7,7,12].map(g=>g*t),o=s.map((g,y)=>{const _=new Ve(g,tC,r[y]);return _.count=0,_.frustumCulled=!1,i.add(_),_}),a=WR(r.reduce((g,y)=>g+y,0));i.add(a);const c=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11]],l=new Map,u=new Bt,h=new Ce,f=new N(0,1,0),d=new N,p=new N;let v=Number.NaN;const m=()=>{const g=s.map(()=>0);let y=0;for(let _=v;_<v+t;_++){let x=l.get(_);x||l.set(_,x=nC(_,e));for(const M of x){const b=o[M.kind];if(g[M.kind]>=r[M.kind])continue;u.compose(M.p,h.setFromAxisAngle(f,M.r),d.set(M.s,M.s,M.s)),b.setMatrixAt(g[M.kind]++,u);const[w,S]=c[M.kind];u.compose(d.set(M.p.x,M.p.y+.12,M.p.z),h,p.set(w*M.s,1,S*M.s)),a.setMatrixAt(y++,u)}}for(const _ of[...l.keys()])(_<v-1||_>v+t)&&l.delete(_);o.forEach((_,x)=>{_.count=g[x],_.visible=_.count>0,_.instanceMatrix.needsUpdate=!0}),a.count=y,a.instanceMatrix.needsUpdate=!0};return{group:i,update(g,y){const _=Math.floor(g/ms)-cm;_!==v&&(v=_,m()),Mf.value=1-.6*Math.min(1,Math.max(0,(y-.4)/.5))}}}const lm=le.tower.phase,sC=1,rC=2600;function um(n,t,e){const i=[],s=o=>{const a=Math.PI/2+o*Math.PI/5,c=o%2?.382:1;return[Math.cos(a)*n*c,Math.sin(a)*n*c]};for(let o=0;o<10;o++){const[a,c]=s(o),[l,u]=s(o+1);i.push(0,0,t,a,c,t,l,u,t)}const r=new Yt;return r.setAttribute("position",new St(new Float32Array(i),3)),r.computeVertexNormals(),te(r,e,.04)}function oC(){const n=[.62,.6,.56],t=[te(new en(3.6,4.6,28,8).translate(0,8,0),n,.12,2),te(new en(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),te(new en(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=te(new Vt(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return Qn([...t,e,um(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),um(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function hm(n){const t=uu(n)+(n===1?uu(2):Lo);let e=Math.floor((t+hi-lm)/$e)*$e+lm-hi;for(e>=t&&(e-=$e);qn(e)>0;)e-=$e;return e}function aC(){const n=new $t(oC(),pf);n.visible=!1,n.matrixAutoUpdate=!1;let t=Number.NaN;const e=new N,i=new N,s=r=>{const{latMin:o,latMax:a,mirror:c}=le.tower,l=sC*(c&&is(r)%2!==0?-1:1);i.set(0,-1/0,0);for(let u=-80;u<=80;u+=20)for(let h=o;h<=a;h+=20)ue(r+u,l*h,0,e),e.y=tn(e.x,e.z),e.y>i.y&&i.copy(e);n.position.copy(i),n.rotation.y=-.6,n.scale.setScalar(2),n.updateMatrix()};return{mesh:n,update(r){if(tc()!=="ha-giang"){n.visible=!1;return}const o=C0(r),a=hm(o),c=hm(o+1),l=Math.abs(r-a)<Math.abs(r-c)?a:c;n.visible=Math.abs(r-l)<rC,n.visible&&l!==t&&(t=l,s(l))}}}const Ao=12,dc={uPools:{value:Array.from({length:Ao},()=>new me)},uPoolCount:{value:0},uPoolNight:{value:0}},cC=`
uniform vec4 uPools[${Ao}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${Ao}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let pc=0,_v=Ao;function lC(n){_v=Math.max(0,Math.min(Ao,Math.round(n)))}function uC(){pc=0}function uh(n,t,e,i,s){pc>=_v||s>330||t-tn(n,e)>28||dc.uPools.value[pc++].set(n,t,e,i)}function hC(n){dc.uPoolCount.value=pc,dc.uPoolNight.value=n}const Ks=14,Xl=9.5,$l=3.4,fC=.9,Ra=7,fm=4,ql=13,dm=30,pm=420,mm=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],dC=[-1,1];function pC(n,t){for(const e of n.obstacles)if(Math.abs(e.z-t)<9)return!0;return!1}function mC(){const n=Math.ceil((pm+dm)/Ks)+2,t=xf(n*(2*Ra)+Math.ceil(n/fm)*ql),e={x:0,y:0,z:0};return{points:t.points,setViewport:(i,s)=>t.setViewport(i,s),update(i,s,r,o){const a=Math.min(1,Math.max(0,(r-.38)/.35));let c=0,l=0;if(a>.01){const u=Math.floor((i.z-dm)/Ks),h=Math.floor((i.z+pm)/Ks);for(let f=u;f<=h;f++){const d=f*Ks;if(!(qn(d)<.97||qn(d+Ks)<.97)){for(const p of dC)for(let v=0;v<Ra;v++){const m=(v+.5)/Ra;ue(d+m*Ks,p*Xl,-Jr+$l-4*m*(1-m)*fC,e);const g=mm[((f*Ra+v)%3+3)%3],y=.82+.18*Math.sin(s*3.1+f*1.7+v*2.3+p);t.set(c++,e.x,e.y,e.z,.6,g[0],g[1],g[2],a*y)}if(!(f%fm!==0||pC(i,d))){l<3&&d>i.z-10&&(ue(d,0,-Jr+$l,e),uh(e.x,e.y,e.z,1.5,d-o),l++);for(let p=0;p<ql;p++){const v=(p+.5)/ql;ue(d,-Xl+v*2*Xl,-Jr+$l+.3-4*v*(1-v)*1.3,e);const m=mm[p%3];t.set(c++,e.x,e.y,e.z,.6,m[0],m[1],m[2],a*(.85+.15*Math.sin(s*2.7+p)))}}}}}t.commit(c)}}}function gC(){const n=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([t,e])=>new ot(t,e));return new ko(n,16)}function vC(){return new Zn(1,1,1,6).translate(0,.5,0)}function xC(n){return new ae({uniforms:{uTime:n},side:Ee,vertexShader:`
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
}`})}function _C(n){return new ae({uniforms:{..._n.merge([lt.fog]),uTime:n},transparent:!0,depthWrite:!1,side:Ee,fog:!0,vertexShader:`
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
}`})}function MC(){const n=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([t,e])=>new ot(t*1.45,e*1.45));return new ko(n,14)}function yC(){const n=[];for(let t=0;t<=8;t++){const e=t/8*Math.PI*.5;n.push(new ot(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new ko(n,16)}const Mv=`
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
}`,bC=`
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
}`,SC=`
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
}`;function wC(){return new ae({vertexShader:Mv,fragmentShader:bC,side:Ee,uniforms:{uTime:{value:0}}})}function TC(){return new ae({vertexShader:Mv,fragmentShader:SC,side:Ee})}function oo(n,t,e){return e.setRGB(n,t%1,0)}const Kl=2.1,mc=8,qi=8,EC=46,AC=n=>new ae({uniforms:{uTime:n},vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1});function RC(n){const t=new Ve(new of(Kl,.12,6,36),new cn({color:new ct("#ffb04a").multiplyScalar(.95)}),qi),e=new Ve(yC(),TC(),qi),i=new Ve(new en(1,.55,1,12,1,!0).translate(0,.5,0),AC(n),qi*3),s=new Ve(gC(),xC(n),qi),r=new Ve(vC(),_C(n),qi),o=new ct,a=[t,e,i,s,r];for(const _ of a)_.frustumCulled=!1,_.count=0;e.setColorAt(0,oo(1,0,o)),i.setColorAt(0,o.setRGB(0,0,0)),r.setColorAt(0,o),r.renderOrder=3;const c=new Bt,l=new Ce,u=new Ce,h=new Ce,f=new N,d=new N;let p=0,v=0,m=0,g=0;const y=(_,x,M,b,w,S,T,R)=>{if(m>=i.instanceMatrix.count)return;const A=1-Math.min(1,Math.max(0,(w-450)/150));c.compose(f.set(_,x,M),l.identity(),d.set(b,EC,b)),i.setMatrixAt(m,c),i.setColorAt(m++,o.setRGB(S*A,T*A,R*A))};return{meshes:a,begin(){p=v=m=g=0},draw(_,x,M,b,w,S,T,R){const A=1+1.6*Math.min(1,Math.max(0,(w-30)/90));if(_.kind==="thermal"&&p<qi){u.setFromAxisAngle(f.set(0,1,0),Math.sin(S*1.3+_.id)*.45),c.compose(f.set(x,M,b),u,d.set(A,A,A)),t.setMatrixAt(p++,c);for(let P=0;P<mc;P++){const I=S*1.8+P/mc*Math.PI*2;f.set(Math.cos(I)*Kl*A,Math.sin(I)*Kl*A,0).applyQuaternion(u),R.body(x+f.x,M+f.y-.5*A,b+f.z,.36*A,1.15,P*.31+_.id*.1),R.glow(x+f.x,M+f.y-.85,b+f.z,.8+1.4*T,1,.7,.28,.85)}R.glow(x,M,b,(6+6*T)*A*.8,1,.7,.25,.45),y(x,M-1,b,1.5*A,w,1.4,.95,.38);for(let P=0;P<6;P++){const I=(S*.9+P/6)%1,L=P*2.1+_.id;R.glow(x+Math.cos(L)*1.1*A,M-2.4+I*4.8*A,b+Math.sin(L)*.6,.9*A,1,.8,.35,Math.sin(I*Math.PI)*.9)}}else if(_.kind==="shield"&&v<qi){l.setFromAxisAngle(f.set(0,0,1),Math.sin(S*1.7+_.id)*.3),c.compose(f.set(x,M+.9*A+.5*Math.sin(S*2.3+_.id),b),l,d.set(1.5*A,1.5*A,1.5*A)),e.setColorAt(v,oo(1,0,o)),e.setMatrixAt(v++,c),R.glow(x,M,b,(3+5*T)*A*.8,.3,.95,.9,.55),y(x,M+.4,b,1.3*A,w,.25,1.1,.95);for(let P=0;P<6;P++){const I=(S*.6+P/6)%1,L=S*2+P*1.05;R.glow(x+Math.cos(L)*.9*A,M+1+I*16*A,b+Math.sin(L)*.9*A,1.1*A,.35,1,.92,Math.sin(I*Math.PI)*.85)}}else if(_.kind==="smoke"&&g<qi){l.setFromAxisAngle(f.set(0,1,0),S*1.6+_.id).premultiply(u.setFromAxisAngle(f.set(0,0,1),Math.sin(S*2.1+_.id)*.22));const P=1.6*A,I=M+.5*A+.35*Math.sin(S*2.6+_.id);c.compose(f.set(x,I,b),l,d.set(P,P,P)),s.setMatrixAt(g,c),f.set(0,P,0).applyQuaternion(l);const L=x+f.x,O=I+f.y,B=b+f.z;c.compose(f.set(L,O,B),h,d.set(6*A,13*A,1)),r.setMatrixAt(g,c),r.setColorAt(g++,o.setRGB(1-Math.min(1,Math.max(0,(w-450)/150)),_.id*.137%1,0)),R.glow(L,O,B,(1.2+2*T)*A,1,.55,.42,.9),R.glow(x,M,b,(3+5*T)*A*.8,1,.3,.62,.5),y(x,M+.4,b,.9*A,w,1.15,.22,.55);for(let X=0;X<5;X++){const J=(S*2.4+X/5)%1,H=X*2.4+_.id;R.glow(L+Math.cos(H)*J*.8*A,O+J*2.2*A,B+Math.sin(H)*J*.8*A,.5*A,1,.75,.4,(1-J)*.9)}}},commit(){t.count=p,e.count=v,i.count=m,s.count=r.count=g;for(const _ of a)_.instanceMatrix.needsUpdate=!0,_.instanceColor&&(_.instanceColor.needsUpdate=!0)}}}const Hn={x:0,y:0,z:0},Yl=260,gm=1600,vm=220,Ca=3200;function CC(n){const t=Math.round(gm*n),e=new Fe,i=wC(),s=new Ve(MC(),i,Yl+8*mc);s.frustumCulled=!1;const r=RC(i.uniforms.uTime),o=xf(Yl+gm+vm+8*(mc+7)+56);e.add(s,...r.meshes,o.points);const a=new ct;s.setColorAt(0,oo(1,0,a));const c=[],l=new Map,u=new Bt,h=new Ce,f=new N,d=new N(1,1,1),p=new Ce;let v=0,m=0;const g={body(y,_,x,M,b,w){v>=s.instanceMatrix.count||(u.compose(f.set(y,_,x),h.identity(),d.set(M,M,M)),s.setColorAt(v,oo(b,w,a)),s.setMatrixAt(v++,u))},glow:(y,_,x,M,b,w,S,T)=>o.set(m++,y,_,x,M,b,w,S,T)};return{group:e,setViewport:(y,_)=>o.setViewport(y,_),burst(y,_,x,M,b){for(let w=0;w<M&&c.length<vm;w++){const S=Math.random()*Math.PI*2,T=Math.random()*2-1,R=6+Math.random()*10;c.push({x:y,y:_,z:x,vx:Math.cos(S)*R*Math.sqrt(1-T*T),vy:T*R+3,vz:Math.sin(S)*R*Math.sqrt(1-T*T),life:b?.7:1})}},update(y,_,x,M,b){v=0,m=0,i.uniforms.uTime.value=_,r.begin();for(const T of y.pickups){if(T.z-y.z>600||v>=Yl)continue;ue(T.z,pn(T.lane),T.v+Math.sin(_*2.4+T.id)*.45,Hn);let R=Hn.x,A=Hn.y,P=Hn.z,I=T.z,L=1;if(T.taken){const B=l.get(T.id)??_;l.set(T.id,B);const X=(_-B)/.6;if(X>=1)continue;I=y.z+4+X*10,ue(I,pn(T.lane),T.v,Hn),R=Hn.x,P=Hn.z,A=Hn.y+X*X*14,L=1-X}const O=Math.min(1,Math.max(0,(T.z-y.z-40)/210));L*=Math.min(1,Math.max(0,(I-b-2)/6)),!(L<=0)&&(T.kind==="lantern"?(h.setFromAxisAngle(f.set(0,1,0),_*.8+T.id).multiply(p.setFromAxisAngle(f.set(0,0,1),Math.sin(_*1.9+T.id)*.12)),u.compose(f.set(R,A,P),h,d.set(L,L,L)),s.setColorAt(v,oo(1,T.id*.137,a)),s.setMatrixAt(v++,u),o.set(m++,R,A-.9*L,P,1.4+3.2*O+1.2*M,1,.62,.22,(.75+.25*M)*L),!T.taken&&T.z>y.z-15&&uh(R,A-.9,P,1,T.z-b)):T.taken||(T.kind==="thermal"&&uh(R,A,P,1.6,T.z-b),r.draw(T,R,A,P,T.z-y.z,_,O,g)))}for(const T of l.keys())y.pickups.some(R=>R.id===T)||l.delete(T);s.count=v,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.commit();const w=Math.min(t,Math.floor(t*(.12+.88*M)));for(let T=0;T<w;T++){const R=ut(T*.37,1.7,81)*Ca,A=b-300+((R-b+300)%Ca+Ca)%Ca,P=Dn(A);if(P<.35)continue;const I=ut(T,2.9,82)<.5?-1:1;ue(A,I*(30+Math.pow(ut(T,3.3,83),1.5)*1400),0,Hn);const L=(_*(2+3*ut(T,4.1,84))+ut(T,5.3,85)*700)%700,O=Yn(A)-380+L+Math.sin(_*.5+T)*2,B=P*Math.min(1,L/60)*(1-Math.max(0,L-600)/100);o.set(m++,Hn.x,O,Hn.z,2.6,1,.5+.1*Math.sin(T),.16,B*(.35+.65*M))}const S=mn(y.z);for(let T=c.length-1;T>=0;T--){const R=c[T];if(R.life-=x*1.6,R.life<=0){c.splice(T,1);continue}R.vy-=9*x,R.x+=R.vx*x,R.y+=R.vy*x,R.x+=Math.sin(S)*y.speed*.85*x,R.z+=(R.vz+Math.cos(S)*y.speed*.85)*x,o.set(m++,R.x,R.y,R.z,.7*R.life+.2,1,.7,.3,R.life)}o.commit(m)}}}const bn=40;function PC(n){const t=[];for(let e=n.bottom;e<n.top;){t.push(e);const i=Math.min(Math.abs(e-n.bandLo),Math.abs(e-n.bandHi),e>n.bandLo&&e<n.bandHi?0:99);e+=Math.min(10,1.2+i*.12)}return t.push(n.top),t}function LC(n){const t=PC(n),e=[],i=[],s=[];for(const l of t){const u=l>=n.bandLo-.01&&l<=n.bandHi+.01,h=u?n.rc:n.radius(l),f=Math.min(1,Math.max(0,(n.radius(l+6)-h)/(h*.6)));for(let d=0;d<bn;d++){const p=d/bn*Math.PI*2,v=Math.cos(p),m=Math.sin(p),g=ut(v*1.4+n.seed*7.1,m*1.4+l/26,31)-.5,y=ut(v*4+n.seed,m*4+l/5,32)-.5,_=Math.max(0,Math.sin((l/7+ut(v,m,n.seed)*2)*Math.PI))**6*.12;let x=h*(1+.42*g+.12*y+_);u&&(x=n.rc*(.9+.1*(y+.5)));const M=Math.pow(.5+.5*Math.sin(p*9+g*5+n.seed+l/40),5),b=Math.pow(Math.max(0,Math.sin((l/4.6+ut(v*2,m*2,n.seed+9)*1.5)*Math.PI)),10),w=.1*M+.09*b;x*=1-w,e.push(v*x,l,m*x),s.push(Math.min(.85,Math.max(0,(1-x/h)*1.6)+w*2.5+f*.55)),i.push(n.crest&&l>n.top-.7?1:0)}}e.push(0,n.top+(n.crest?0:2.5),0),i.push(n.crest?1:0),s.push(0);const r=[];for(let l=0;l<t.length-1;l++)for(let u=0;u<bn;u++){const h=l*bn+u,f=l*bn+(u+1)%bn;r.push(h,h+bn,f,f,h+bn,f+bn)}const o=t.length*bn,a=(t.length-1)*bn;for(let l=0;l<bn;l++)r.push(a+l,o,a+(l+1)%bn);const c=new Yt;return c.setAttribute("position",new St(new Float32Array(e),3)),c.setAttribute("aCrest",new St(new Float32Array(i),1)),c.setAttribute("aShade",new St(new Float32Array(s),1)),c.setIndex(r),c.computeVertexNormals(),c}function NC(n,t){const e=[],i=new ct;for(let s=0;s<t;s++){const r=s<Math.ceil(t*.6),o=r?n.top-1.5-3*ut(s,n.seed,41):n.bandLo-6-40*ut(n.seed,s,42),a=n.seed*2.3+s*2.39,c=r?n.radius(o)*.75*ut(s,n.seed,43):n.radius(o)*.95,l=.35+.35*ut(s*1.3,n.seed,44),u=(ut(s,n.seed*3,45)<.45?tv():ev()).clone();u.scale(l,l*1.1,l).rotateY(a).translate(Math.cos(a)*c,o,Math.sin(a)*c),i.setHSL(.24+.06*ut(s,7,n.seed),.3,.55);const h=u.getAttribute("color");if(h)for(let f=0;f<h.count;f++)h.setXYZ(f,h.getX(f)*i.r*2,h.getY(f)*i.g*2,h.getZ(f)*i.b*2);e.push(u)}return gi(e)}function IC(n,t){const e=46+10*ut(n,1,51);return{seed:n,rc:t,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:i=>i<-6.5?t+.3*Math.pow(-6.5-i,.9):(t+.32*(i-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-i)/7)))}}function DC(n,t){return{seed:n,rc:t,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,radius:e=>t+.28*Math.pow(Math.max(0,-6.5-e),.92)}}const Si=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2];function xm(n,t,e){const i=new Vt(n,1,7.6,Math.max(10,Math.round(n/2)),36,4).translate(0,.5,0),s=i.getAttribute("position"),r=new Float32Array(s.count);for(let a=0;a<s.count;a++){const c=s.getX(a),l=s.getY(a),u=s.getZ(a),h=Math.min(1,Math.max(0,(Math.abs(c)-9)/4)),f=t(c)-(1-h)*.6*ut(c*.5,u,3)-h*1.6*(ut(c*.3,u*.2,3)-.3),d=e(c)-10*ut(c*.06,1,4),p=d+(f-d)*l,v=1+.6*Math.max(0,Math.min(1,-p/40)),m=((p+3*ut(c*.04,0,7))/5.5%1+1)%1,g=2.4*(Gn(c*.07,p*.06,3,9)-.5),y=Math.min(1,Math.max(0,(f-p-.6)/2.4),Math.max(0,(p-d)/3)),_=(1.3*(1-m)-.65+g)*y;r[a]=y*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(m-.5)/.5)+.35*Math.max(0,-g));const x=u*v*(1+.3*(ut(c*.2,p*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*_;s.setXYZ(a,c*(1+.04*(ut(p*.1,u,6)-.5)),p,x)}const o=new Float32Array(s.count);for(let a=0;a<s.count;a++)o[a]=Math.abs(s.getX(a))<12&&s.getY(a)>.3?1:0;return i.setAttribute("aCrest",new St(o,1)),i.setAttribute("aShade",new St(r,1)),i.computeVertexNormals(),i}function hs(n,t,e=()=>0){const i=n.getAttribute("position"),s=new Float32Array(i.count*3),r=new Float32Array(i.count);for(let o=0;o<i.count;o++)s.set(t,o*3),r[o]=e(i.getY(o));return n.setAttribute("color",new St(s,3)),n.setAttribute("aSway",new St(r,1)),n}function UC(n,t){const e=[],i=Si([.6,.42,.27]),s=c=>10.2-2.2*(1-(2*c/n)**2);for(let c=-n/2;c<n/2;c+=.9)e.push(hs(new Vt(.8,.22,3).translate(c,-.55,0).toNonIndexed(),i));if(t)for(const c of[-n/2,n/2])e.push(hs(new Vt(1.2,260,1.2).translate(c,-118,0).toNonIndexed(),i));for(const c of[-1.5,1.5]){e.push(hs(new Vt(n,.08,.08).translate(0,1.2,c).toNonIndexed(),i));const l=Array.from({length:13},(u,h)=>new N(-n/2+h/12*n,0,c*.3)).map(u=>u.setY(s(u.x)));e.push(hs(new Mc(new nf(l),24,.07,4).toNonIndexed(),i))}const r=[Si([.86,.12,.1]),Si([.98,.72,.12]),Si([.86,.12,.1]),Si([.95,.88,.7]),Si([.2,.55,.3]),Si([.2,.4,.75])];let o=0;for(let c=-n/2+.6;c<n/2;c+=1.15,o++){const l=s(c)-.05,u=Math.min(l-1.5,5.4+2.2*ut(c,2,8)+(o%3===0?1.3:0)),h=new Zn(.62,u,2,6),f=h.getAttribute("position");for(let p=0;p<f.count;p++){const v=(u/2-f.getY(p))/u;f.setX(p,f.getX(p)*(1-.15*v)),v>.99&&Math.abs(f.getX(p))<.01&&f.setY(p,f.getY(p)+.5)}h.rotateY((ut(c,5,9)-.5)*.9).translate(c,l-u/2,o%2?.25:-.25);const d=r[Math.floor(ut(c*1.7,3,10)*r.length*.999)];e.push(hs(h.toNonIndexed(),d,p=>Math.min(1,Math.max(0,(l-p)/u))))}for(let c=-n/2+2.3;c<n/2-1;c+=4.6){const l=s(c)-.75;e.push(hs(new en(.34,.34,.66,8).translate(c,l,-.6).toNonIndexed(),Si([.95,.16,.08]),()=>.3)),e.push(hs(new en(.2,.2,.1,8).translate(c,l+.38,-.6).toNonIndexed(),Si([.98,.75,.25]),()=>.3))}const a=gi(e);return a.computeVertexNormals(),a}const Or=2.9,kC=-1.25;function FC(n,t,e,i){const s=Or+t,r=new Vt(s,1,6.8,Math.max(6,Math.round(s/3)),8,3).translate(s/2-Or,.5,0),o=r.getAttribute("position"),a=new Float32Array(o.count);for(let c=0;c<o.count;c++){const l=o.getX(c),u=o.getY(c),h=o.getZ(c),f=Math.min(1,Math.max(0,(l+Or)/Math.max(1,s))),d=9+(e-9)*Math.pow(f,.7)+6*(Gn(l*.08,h*.1+i,3,31)-.5),p=l>Or?(l-Or)*.35+.8*ut(l*.4,h*.5+i,5):0,v=kC+p,m=v+(d-v)*u,g=1.6*(Gn(l*.09+i,m*.07,3,37)-.5)*Math.min(1,u*6);a[c]=Math.max(0,.6-u*3)*.8,o.setXYZ(c,l*n,m,h*(1+.15*Math.min(1,m/30))+Math.sign(h)*g)}if(r.setAttribute("aShade",new St(a,1)),r.setAttribute("aCrest",new St(new Float32Array(o.count),1)),n<0){const c=r.getIndex();for(let l=0;l<c.count;l+=3){const u=c.getX(l+1);c.setX(l+1,c.getX(l+2)),c.setX(l+2,u)}}return r.computeVertexNormals(),r}const OC=new ae({uniforms:{...hr},vertexShader:`
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
${Tc}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:nn,transparent:!0,depthWrite:!1}),_m=(n,t,e)=>`${Math.round(n*50)},${Math.round(t*50)},${Math.round(e*50)}`;function BC(n){if(n.getAttribute("aOutline"))return n;const t=n.getAttribute("position"),e=n.getAttribute("normal"),i=new Map;for(let r=0;r<t.count;r++){const o=_m(t.getX(r),t.getY(r),t.getZ(r)),a=i.get(o)??[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),i.set(o,a)}const s=new Float32Array(t.count*3);for(let r=0;r<t.count;r++){const o=i.get(_m(t.getX(r),t.getY(r),t.getZ(r))),a=Math.hypot(o[0],o[1],o[2]);s.set(a>1e-6?[o[0]/a,o[1]/a,o[2]/a]:[0,1,0],r*3)}return n.setAttribute("aOutline",new St(s,3)),n}function Kr(n){const t=new $t(BC(n),OC);return t.userData.hazardHull=!0,t}function zC(n,t){n&&(n.visible=t>5&&t<105)}const Pa=x3(),HC=pf,yv={value:1},bv={value:0},yf=new dr({vertexColors:!0,side:Ee});yf.onBeforeCompile=n=>{n.uniforms.uLift=yv,n.uniforms.uTime=bv,Object.assign(n.uniforms,hr),n.vertexShader=`attribute float aSway;
uniform float uTime;
${n.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),n.fragmentShader=`uniform float uLift;
${Tc}${n.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};yf.customProgramCacheKey=()=>"cloth-hazard";const Sv=(n,t)=>({rock:LC(n),trees:NC(n,t)}),Mm=[0,1,2,3,4,5,6,7].map(n=>Sv(IC(n*1.7+.3,ns.pillar.halfX),9)),ym=[0,1,2].map(n=>Sv(DC(n*2.3+.7,ns.spike.halfX),4)),bm=new Map;function VC(n,t){const e=Math.ceil(n/4)*4,i=`${e}:${t}`;let s=bm.get(i);return s||bm.set(i,s=UC(e,t)),s}const Sm=new Map;function Zl(n,t){let e=Sm.get(n);return e||Sm.set(n,e=t()),e}function GC(n,t){const e=Ne(n.z),i=n.kind==="ridge"||n.kind==="bridge";ue(n.z,i?0:pn(n.lane),0,t);const s=Math.round((tn(t.x,t.z)-e)*2)/2,r=u=>new $t(u,eC).add(Kr(u)),o=Io()>.5,a=o?"hg":"";if(n.kind==="ridge")return r(Zl(`${a}d${s}`,()=>nR(26,1,s,o?Rc:void 0)));if(n.kind==="bridge")return r(Zl(`${a}g${s}`,()=>iR(s,o?$R:void 0)));const c=n.id%3,l=r(Zl(`${a}h${c}:${s}`,()=>QR(c,1-s,o)));return l.position.y=s,l.updateMatrix(),new Fe().add(l,XR(8,9,s+.12))}function WC(){const n=new Fe,t=new Map,e={x:0,y:0,z:0},i=s=>{const r=rr(s.z);let o;if(es(s.z))o=GC(s,e);else if(s.kind==="pillar"||s.kind==="spike"){const l=(s.kind==="pillar"?Mm:ym)[s.id%(s.kind==="pillar"?Mm.length:ym.length)];o=new Fe().add(new $t(l.rock,Pa).add(Kr(l.rock)),new $t(l.trees,HC))}else if(s.kind==="ridge"){const l=Ne(s.z),u=s.open?64:2*r+18,h=new Map,f=m=>{let g=h.get(m);return g===void 0&&h.set(m,g=tn(ue(s.z,m,0,e).x,e.z)-l),g},d=u/2-20,p=m=>Math.min(1,Math.abs(m)/d),v=s.open?xm(u,m=>1+Math.max(0,Math.abs(m)-d)*2.2,m=>Math.abs(m)<d?-16-70*p(m)**6:f(m)-12):xm(u,m=>Math.abs(m)<10?1:Math.max(1,f(m)+3),m=>f(m)-12);o=new $t(v,Pa).add(Kr(v)),o.userData.own=!0}else if(s.kind==="overhang"){const l=s.lane!==0?-Math.sign(s.lane):s.id%2?1:-1,u=FC(l,Math.max(8,r+18-Math.abs(pn(s.lane))),70,s.id%97);o=new $t(u,Pa).add(Kr(u)),o.userData.own=!0}else{const l=VC(s.open?46:2*r+18,s.open);o=new $t(l,yf).add(Kr(l))}const a=s.kind==="ridge"||s.kind==="bridge";ue(s.z,a?0:pn(s.lane),0,e),o.position.set(e.x,e.y,e.z);const c=a||es(s.z)||s.kind==="overhang";return o.rotation.y=mn(s.z)+(c?0:s.id*2.39),c||o.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),o.matrixAutoUpdate=!1,o.updateMatrix(),o.traverse(l=>{l.matrixAutoUpdate=!1,l.updateMatrixWorld(),l.userData.hazardHull&&(o.userData.hull=l)}),n.add(o),o};return{group:n,update(s,r,o){bv.value=r;const a=Math.min(1,Math.max(0,(o-.4)/.5));yv.value=1-.75*a,Pa.uniforms.uLift.value=1-.45*a;const c=new Set;for(const l of s.obstacles){c.add(l.id);let u=t.get(l.id);u||t.set(l.id,u=i(l)),zC(u.userData.hull,l.z-s.z)}for(const[l,u]of t)c.has(l)||(n.remove(u),u.userData.own&&u.geometry.dispose(),t.delete(l))}}}function XC(n){const t=new Fi({map:n,roughness:.8,side:Ee}),e={uTime:{value:0},uFlutter:{value:1}};return t.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},t.userData.setTime=(i,s)=>{e.uTime.value=i,e.uFlutter.value=s},t}const La=new Fi({color:"#a8141c",roughness:.55}),$C=new Fi({color:"#f6f4ef",roughness:.18,metalness:.05}),qC=new Fi({color:"#15161c",roughness:.08,metalness:.6}),Jl=new Fi({color:"#1c1d22",roughness:.75});function Na(n,t,e,i){const s=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=new $t(new Qh(e,s,4,10),i);return r.position.set((n[0]+t[0])/2,(n[1]+t[1])/2,(n[2]+t[2])/2),r.lookAt(r.position.x+t[0]-n[0],r.position.y+t[1]-n[1],r.position.z+t[2]-n[2]),r.rotateX(Math.PI/2),r}function KC(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");t.fillStyle="#efe2c8",t.fillRect(0,0,256,256);for(let i=-8;i<16;i++)for(const[s,r]of[[1,1],[1,-1]])t.strokeStyle="rgba(120,80,50,0.28)",t.lineWidth=2,t.beginPath(),t.moveTo(i*32,r>0?0:256),t.lineTo(i*32+256*s,r>0?256:0),t.stroke();t.fillStyle="#2bb5ad",t.fillRect(0,18,256,14),t.fillStyle="#a8141c",t.fillRect(0,0,256,10),t.fillRect(0,226,256,30);const e=new Jh(n);return e.colorSpace=Xe,e.anisotropy=4,e}function wm(n,t,e,i,s,r){const c=[],l=[],u=[];for(let f=0;f<=6;f++){const d=f/6;for(let p=0;p<=10;p++){const v=p/10,m=[0,1,2].map(g=>(1-d)*((1-v)*n[g]+v*t[g])+d*((1-v)*i[g]+v*e[g]));m[2]=m[2]+.12*d*Math.sin(Math.PI*v),m[1]=m[1]+s*Math.sin(Math.PI*v)*Math.sin(Math.PI*d)+.025*Math.abs(Math.sin(Math.PI*v*4)),c.push(...m),l.push(v*2,d)}}for(let f=0;f<6;f++)for(let d=0;d<10;d++){const p=f*11+d;r?u.push(p,p+1,p+10+1,p+1,p+10+2,p+10+1):u.push(p,p+10+1,p+1,p+1,p+10+1,p+10+2)}const h=new Yt;return h.setAttribute("position",new St(new Float32Array(c),3)),h.setAttribute("uv",new St(new Float32Array(l),2)),h.setIndex(u),h.computeVertexNormals(),h}function YC(){const n=new Fe,t=new Fe;n.add(t);const e=KC(),i=XC(e);t.add(Na([0,0,-.32],[0,.02,.5],.18,La));const s=new $t(new Ms(.15,20,14),$C);s.position.set(0,.07,.78);const r=new $t(new Ms(.152,20,10,-1.1,2.2,1.35,.6),qC);r.position.copy(s.position),r.rotation.x=-.3,t.add(s,r);const o=new $t(new Vt(.26,.1,.4,2,1,2),Jl);o.position.set(0,.19,.1),t.add(o);const a=[],c=[];for(const p of[1,-1]){const v=new Fe,m=[.17*p,.05,.44],g=[1.02*p,.07,.3];v.add(Na(m,g,.06,La));const y=new $t(new Ms(.06,8,6),Jl);y.position.set(g[0]+.05*p,g[1],g[2]+.02),v.add(y),c.push(y),v.add(new $t(wm(m,g,[.62*p,.02,-.2],[.2*p,0,-.42],.07,p<0),i)),a.push(v),t.add(v)}const l=[.14,0,-.34],u=[-.14,0,-.34],h=[.33,-.03,-1.18],f=[-.33,-.03,-1.18];t.add(Na(l,h,.075,La),Na(u,f,.075,La)),t.add(new $t(wm([.13,0,-.36],[-.13,0,-.36],f,h,.05,!1),i));const d=[];for(const p of[h,f]){const v=new $t(new Vt(.12,.17,.13),Jl);v.position.set(p[0],p[1]-.04,p[2]-.06),t.add(v),d.push(v)}return{root:n,body:t,feet:d,tips:c,ankles:d,animate(p,v,m){for(const g of a)g.scale.x=v;i.userData.setTime?.(p,m)}}}const ZC={roll:.62,flip:.9,split:3,spiral:1.5},Tm=le.edge-10,Br=n=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,n)));function JC(){const n={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let t=null,e=0,i=1,s=0,r=!1,o=Number.NaN,a=0;const c=(l,u)=>{t=l,e=0,i=u,r=!0};return{trick(l,u){return t!==null?!1:(c(l,u),!0)},update(l,u){if(n.roll=n.pitch=n.dx=n.dv=n.cam=0,n.spread=null,l.mode!=="run")return t=null,o=Number.NaN,n;const h=We(l.z);if(o<Tm&&h>=Tm&&h-o<200?c("split",is(l.z)%2===0?1:-1):t===null&&l.thermalT>0&&a<=0&&c("spiral",l.x>=0?-1:1),o=h,a=l.thermalT,t===null)return n;r&&(r=!1,s=l.obstacles.some(v=>v.z>l.z-2&&v.z<l.z+l.speed)?1:3),e+=u;const f=e/ZC[t];if(f>=1)return t=null,n;const d=c0(l.z);if(t==="roll")n.roll=i*2*Math.PI*Br(f),n.spread=1.06;else if(t==="flip"){const p=2*Math.PI*Br(f);n.pitch=-p,n.dv=s*.5*(1-Math.cos(p)),n.spread=.82}else if(t==="split")n.roll=i*Math.PI*(Br(f/.15)+Br((f-.7)/.22)),n.spread=1.04;else{const p=4*Math.PI*Br(f),v=Math.sin(Math.PI*f);n.roll=i*p,n.dx=i*v*Math.sin(p),n.dv=v*(1-Math.cos(p))}return(t==="roll"||t==="split")&&(n.cam=i*Math.sin(Math.abs(n.roll)/2)*(.12+.3*d)),n}}}const wv=n=>2.5*(1-Math.exp(-n*6)),QC=n=>4.5*Math.min(n,1.4)**2,Ia={x:0,y:0,z:0};function Tv(n){return ue(n.z-wv(n.crashT),n.x,n.v,Ia),Math.max(0,Math.min(QC(n.crashT),Ia.y-tn(Ia.x,Ia.z)-.6))}function jC(){let n=0,t=0,e=0,i=0,s=0,r=0,o=0,a=1;const c=JC();let l=0;return{lateralSpeed:()=>e,trick:(u,h)=>c.trick(u,h),camRoll:()=>l,apply(u,h,f,d){const{root:p,body:v}=u;if(d>0){const w=1-Math.exp(-d*14);e+=((h.x-n)/d-e)*w,i+=((h.v-t)/d-i)*w}n=h.x,t=h.v;const m=c.update(h,d);if(l=m.cam,ue(h.z,h.x+m.dx,h.v+m.dv,p.position),p.rotation.order="YXZ",p.rotation.set(-Math.atan(Pi(h.z)),mn(h.z),0),v.rotation.order="ZXY",h.mode==="crash"||h.mode==="over"){ue(h.z-wv(h.crashT),h.x,h.v-Tv(h),p.position),v.rotation.set(Math.sin(f*9)*1.6,f*4,f*13),u.animate(f,.7,2.5,0,d);return}const g=1-Math.exp(-d*10);s+=(Math.max(-1.1,Math.min(1.1,e*.027+a0(h.z,h.speed)))-s)*g;const y=-(Math.atan(Pi(h.z+18))-Math.atan(Pi(h.z)))*.9;r+=(Math.max(-.45,Math.min(.5,-i*.045+y))-r)*g,o+=(Math.max(-.2,Math.min(.2,e*.006))-o)*g;const _=m.spread??(h.vert==="dive"?.8:h.vert==="flare"?1.06:1);a+=(_-a)*g;const x=Math.sin(f*23)*.012+Math.sin(f*7.3)*.018,M=(h.stunT/it.stunTime)**2;v.rotation.set(r+m.pitch+x+.3*M*Math.sin(f*9.3+1),o+.28*M*Math.sin(f*6.1),s+m.roll+x*.6+.6*M*Math.sin(f*13));const b=(h.vert==="dive"?1.8:h.thermalT>0?1.4:1)+1.6*M;u.animate(f,a-.22*M,b,Math.max(-1,Math.min(1,e/35+Math.sin(f*11)*M)),d)}}}function tP(n){const t=new Map,e=new Map,i=n.clone();return Ev(n,i,function(s,r){t.set(r,s),e.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Ev(n,t,e){e(n,t);for(let i=0;i<n.children.length;i++)Ev(n.children[i],t.children[i],e)}class eP extends vr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new oP(e)}),this.register(function(e){return new aP(e)}),this.register(function(e){return new gP(e)}),this.register(function(e){return new vP(e)}),this.register(function(e){return new xP(e)}),this.register(function(e){return new lP(e)}),this.register(function(e){return new uP(e)}),this.register(function(e){return new hP(e)}),this.register(function(e){return new fP(e)}),this.register(function(e){return new rP(e)}),this.register(function(e){return new dP(e)}),this.register(function(e){return new cP(e)}),this.register(function(e){return new mP(e)}),this.register(function(e){return new pP(e)}),this.register(function(e){return new iP(e)}),this.register(function(e){return new Em(e,re.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Em(e,re.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new _P(e)})}load(t,e,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ro.extractUrlBase(t);o=ro.resolveURL(l,this.path)}else o=ro.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new xg(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,i,s){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Av){try{o[re.KHR_BINARY_GLTF]=new MP(t)}catch(h){s&&s(h);return}r=JSON.parse(o[re.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new IP(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case re.KHR_MATERIALS_UNLIT:o[h]=new sP;break;case re.KHR_DRACO_MESH_COMPRESSION:o[h]=new yP(r,this.dracoLoader);break;case re.KHR_TEXTURE_TRANSFORM:o[h]=new bP;break;case re.KHR_MESH_QUANTIZATION:o[h]=new SP;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,s)}parseAsync(t,e){const i=this;return new Promise(function(s,r){i.parse(t,e,s,r)})}}function nP(){let n={};return{get:function(t){return n[t]},add:function(t,e){n[t]=e},remove:function(t){delete n[t]},removeAll:function(){n={}}}}function Be(n,t,e){const i=n.json.materials[t];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const re={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class iP{constructor(t){this.parser=t,this.name=re.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let i=0,s=e.length;i<s;i++){const r=e[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,i="light:"+t;let s=e.cache.get(i);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new ct(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Tn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Mg(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ey(u),l.distance=h;break;case"spot":l=new wy(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(i,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,i=this.parser,r=i.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(e.cache,a,c)})}}class sP{constructor(){this.name=re.KHR_MATERIALS_UNLIT}getMaterialType(){return cn}extendParams(t,e,i){const s=[];t.color=new ct(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Tn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(t,"map",r.baseColorTexture,Xe))}return Promise.all(s)}}class rP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class oP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ot(r,r)}return Promise.all(s)}}class aP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class cP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class lP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_SHEEN}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(e.sheenColor=new ct(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],Tn)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,Xe)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class uP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class hP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_VOLUME}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return e.attenuationColor=new ct().setRGB(r[0],r[1],r[2],Tn),Promise.all(s)}}class fP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_IOR}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class dP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return e.specularColor=new ct().setRGB(r[0],r[1],r[2],Tn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,Xe)),Promise.all(s)}}class pP{constructor(t){this.parser=t,this.name=re.EXT_MATERIALS_BUMP}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(s)}}class mP{constructor(t){this.parser=t,this.name=re.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Be(this.parser,t,this.name)!==null?mi:null}extendMaterialParams(t,e){const i=Be(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class gP{constructor(t){this.parser=t,this.name=re.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,i=e.json,s=i.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class vP{constructor(t){this.parser=t,this.name=re.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class xP{constructor(t){this.parser=t,this.name=re.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class Em{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,i=e.bufferViews[t];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,s.mode,s.filter),d})})}else return null}}class _P{constructor(t){this.name=re.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,i=e.nodes[t];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=e.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Cn.TRIANGLES&&l.mode!==Cn.TRIANGLE_STRIP&&l.mode!==Cn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const p of h){const v=new Bt,m=new N,g=new Ce,y=new N(1,1,1),_=new Ve(p.geometry,p.material,f);for(let M=0;M<f;M++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&y.fromBufferAttribute(c.SCALE,M),_.setMatrixAt(M,v.compose(m,g,y));let x=null;for(const M in c)if(M==="_COLOR_0"){const b=c[M];_.instanceColor=new xo(b.array,b.itemSize,b.normalized)}else if(M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"){if(x===null){const w=_.geometry;x=new Yt,x.name=w.name;for(const S in w.attributes)x.setAttribute(S,w.attributes[S]);for(const S in w.morphAttributes)x.morphAttributes[S]=w.morphAttributes[S];w.index!==null&&x.setIndex(w.index),x.morphTargetsRelative=w.morphTargetsRelative;for(const S of w.groups)x.addGroup(S.start,S.count,S.materialIndex);w.boundingBox!==null&&(x.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(x.boundingSphere=w.boundingSphere.clone()),x.drawRange.start=w.drawRange.start,x.drawRange.count=w.drawRange.count,x.userData=Object.assign({},w.userData),_.geometry=x}const b=c[M];x.setAttribute(M,new xo(b.array,b.itemSize,b.normalized))}Ie.prototype.copy.call(_,p),this.parser.assignFinalMaterial(_),d.push(_)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Av="glTF",zr=12,Am={JSON:1313821514,BIN:5130562};class MP{constructor(t){this.name=re.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,zr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Av)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-zr,r=new DataView(t,zr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Am.JSON){const l=new Uint8Array(t,zr+o,a);this.content=i.decode(l)}else if(c===Am.BIN){const l=zr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class yP{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=re.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const i=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=hh[u]||u.toLowerCase();a[h]=o[u]}for(const u in t.attributes){const h=hh[u]||u.toLowerCase();if(o[u]!==void 0){const f=i.accessors[t.attributes[u]],d=nr[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],m=c[p];m!==void 0&&(v.normalized=m)}h(d)},a,l,Tn,f)})})}}class bP{constructor(){this.name=re.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const i=Math.cos(t.rotation),s=Math.sin(t.rotation);t.matrix.set(t.repeat.x*i,t.repeat.y*s,t.offset.x,-t.repeat.x*s,t.repeat.y*i,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class SP{constructor(){this.name=re.KHR_MESH_QUANTIZATION}}class Rv extends pr{constructor(t,e,i,s){super(t,e,i,s)}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=i[r+o];return e}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-e,h=(i-e)/u,f=h*h,d=f*h,p=t*l,v=p-l,m=-2*d+3*f,g=d-f,y=1-m,_=g-f+h;for(let x=0;x!==a;x++){const M=o[v+x+a],b=o[v+x+c]*u,w=o[p+x+a],S=o[p+x]*u;r[x]=y*M+_*b+m*w+g*S}return r}}const wP=new Ce;class TP extends Rv{interpolate_(t,e,i,s){const r=super.interpolate_(t,e,i,s);return wP.fromArray(r).normalize().toArray(r),r}}const Cn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Rm={9728:qe,9729:Ke,9984:F0,9985:Oa,9986:Xr,9987:Ei},Cm={33071:oi,33648:ec,10497:ar},Ql={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},hh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},EP={CUBICSPLINE:void 0,LINEAR:mo,STEP:po},jl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function AP(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Fi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Di})),n.DefaultMaterial}function fs(n,t,e){for(const i in e.extensions)n[i]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=e.extensions[i])}function si(n,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(n.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function RP(n,t,e){let i=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(i){const f=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):n.attributes.position;o.push(f)}if(s){const f=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):n.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=h),r&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function CP(n,t){if(n.updateMorphTargets(),t.weights!==void 0)for(let e=0,i=t.weights.length;e<i;e++)n.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(n.morphTargetInfluences.length===e.length){n.morphTargetDictionary={};for(let i=0,s=e.length;i<s;i++)n.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function PP(n){let t;const e=n.extensions&&n.extensions[re.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+tu(e.attributes):t=n.indices+":"+tu(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)t+=":"+tu(n.targets[i]);return t}function tu(n){let t="";const e=Object.keys(n).sort();for(let i=0,s=e.length;i<s;i++)t+=e[i]+":"+n[e[i]]+";";return t}function fh(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function LP(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const NP=new Bt;class IP{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new nP,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new yy(this.options.manager):this.textureLoader=new Ry(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return fs(r,a,s),si(a,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,i){if(t.refs[e]<=1)return i;const s=i.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(i,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const s=t(e[i]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&i.push(r)}return i}getDependency(t,e){const i=t+":"+e;let s=this.cache.get(i);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(i,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const i=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return i.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[re.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(ro.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(i){const s=e.byteLength||0,r=e.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(t){const e=this,i=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=Ql[s.type],a=nr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new St(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Ql[s.type],l=nr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,d=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let v,m;if(d&&d!==h){const g=Math.floor(f/d),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let _=e.cache.get(y);_||(v=new l(a,g*d,s.count*d/u),_=new d1(v,d/u),e.cache.add(y,_)),m=new $h(_,c,f%d/u,p)}else a===null?v=new l(s.count*c):v=new l(a,f,s.count*c),m=new St(v,c,p);if(s.sparse!==void 0){const g=Ql.SCALAR,y=nr[s.sparse.indices.componentType],_=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,M=new y(o[1],_,s.sparse.count*g),b=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new St(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,S=M.length;w<S;w++){const T=M[w];if(m.setX(T,b[w*c]),c>=2&&m.setY(T,b[w*c+1]),c>=3&&m.setZ(T,b[w*c+2]),c>=4&&m.setW(T,b[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(t){const e=this.json,i=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,i){const s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Rm[f.magFilter]||Ke,u.minFilter=Rm[f.minFilter]||Ei,u.wrapS=Cm[f.wrapS]||ar,u.wrapT=Cm[f.wrapT]||ar,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qe&&u.minFilter!==Ke,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const i=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const o=s.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let p=f;e.isImageBitmapLoader===!0&&(p=function(v){const m=new Ye(v);m.needsUpdate=!0,f(m)}),e.load(ro.resolveURL(h,r.path),p,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),si(h,o),h.userData.mimeType=o.mimeType||LP(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[re.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[re.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[re.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let i=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new eg,Kn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(t.isLine){const a="LineBasicMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new Yh,Kn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}t.material=i}getMaterialType(){return Fi}loadMaterial(t){const e=this,i=this.json,s=this.extensions,r=i.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[re.KHR_MATERIALS_UNLIT]){const h=s[re.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,e))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new ct(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Tn),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",h.baseColorTexture,Xe)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Ee);const u=r.alphaMode||jl.OPAQUE;if(u===jl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===jl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==cn&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ot(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==cn&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==cn){const h=r.emissiveFactor;a.emissive=new ct().setRGB(h[0],h[1],h[2],Tn)}return r.emissiveTexture!==void 0&&o!==cn&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Xe)),Promise.all(l).then(function(){const h=new o(a);return r.name&&(h.name=r.name),si(h,r),e.associations.set(h,{materials:t}),r.extensions&&fs(s,h,r),h})}createUniqueName(t){const e=_e.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[re.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Pm(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=PP(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[re.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Pm(new Yt,l,e),l.mode===Cn.TRIANGLE_STRIP?f=f.then(d=>im(d,W0)):l.mode===Cn.TRIANGLE_FAN&&(f=f.then(d=>im(d,Ku))),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){const e=this,i=this.json,s=this.extensions,r=i.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?AP(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,p=u.length;d<p;d++){const v=u[d],m=o[d];let g;const y=l[d];if(m.mode===Cn.TRIANGLES||m.mode===Cn.TRIANGLE_STRIP||m.mode===Cn.TRIANGLE_FAN||m.mode===void 0){const _=r.isSkinnedMesh===!0,x=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");_&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=_&&x?new Q0(v,y):new $t(v,y),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(m.mode===Cn.LINES)g=new tg(v,y);else if(m.mode===Cn.LINE_STRIP)g=new Zh(v,y);else if(m.mode===Cn.LINE_LOOP)g=new b1(v,y);else if(m.mode===Cn.POINTS)g=new lc(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&CP(g,r),g.name=e.createUniqueName(r.name||"mesh_"+t),si(g,r),m.extensions&&fs(s,g,m),e.assignFinalMaterial(g),h.push(g)}for(let d=0,p=h.length;d<p;d++)e.associations.set(h[d],{meshes:t,primitives:d});if(h.length===1)return r.extensions&&fs(s,h[0],r),h[0];const f=new Fe;r.extensions&&fs(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,p=h.length;d<p;d++)f.add(h[d]);return f})}loadCamera(t){let e;const i=this.json.cameras[t],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new fn(YM.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(e=new Fo(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),si(e,i),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],i=[];for(let s=0,r=e.joints.length;s<r;s++)i.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new Bt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Kh(a,c)})}loadAnimation(t){const e=this.json,i=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){const d=s.channels[h],p=s.samplers[d.sampler],v=d.target,m=v.node,g=s.parameters!==void 0?s.parameters[p.input]:p.input,y=s.parameters!==void 0?s.parameters[p.output]:p.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",y)),l.push(p),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],p=h[2],v=h[3],m=h[4],g=[];for(let _=0,x=f.length;_<x;_++){const M=f[_],b=d[_],w=p[_],S=v[_],T=m[_];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const R=i._createAnimationTracks(M,b,w,S,T);if(R)for(let A=0;A<R.length;A++)g.push(R[A])}const y=new py(r,void 0,g);return si(y,s),y})}createNodeMesh(t){const e=this.json,i=this,s=e.nodes[t];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){const e=this.json,i=this,s=e.nodes[t],r=i._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,NP)});for(let d=0,p=h.length;d<p;d++)u.add(h[d]);if(u.userData.pivot!==void 0&&h.length>0){const d=u.userData.pivot,p=h[0];u.pivot=new N().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(t){const e=this.json,i=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new j0:l.length>1?u=new Fe:l.length===1?u=l[0]:u=new Ie,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),si(u,r),r.extensions&&fs(i,u,r),r.matrix!==void 0){const h=new Bt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,i=this.json.scenes[t],s=this,r=new Fe;i.name&&(r.name=s.createUniqueName(i.name)),si(r,i),i.extensions&&fs(e,r,i);const o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++){const f=c[u];f.parent!==null?r.add(tP(f)):r.add(f)}const l=u=>{const h=new Map;for(const[f,d]of s.associations)(f instanceof Kn||f instanceof Ye)&&h.set(f,d);return u.traverse(f=>{const d=s.associations.get(f);d!=null&&h.set(f,d)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,i,s,r){const o=[],a=t.name?t.name:t.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Ki[r.path]===Ki.weights?(l(t),t.isGroup&&t.children.forEach(l)):c.push(a);let u;switch(Ki[r.path]){case Ki.weights:u=So;break;case Ki.rotation:u=wo;break;case Ki.translation:case Ki.scale:u=uc;break;default:i.itemSize===1?u=So:u=uc;break}const h=s.interpolation!==void 0?EP[s.interpolation]:mo,f=this._getArrayFromAccessor(i);for(let d=0,p=c.length;d<p;d++){const v=new u(c[d]+"."+Ki[r.path],e.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),o.push(v)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const i=fh(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*i;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(i){const s=this instanceof wo?TP:Rv;return new s(this.times,this.values,this.getValueSize()/3,i)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function DP(n,t,e){const i=t.attributes,s=new ki;if(i.POSITION!==void 0){const a=e.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),a.normalized){const u=fh(nr[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new N,c=new N;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=e.json.accessors[h.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const v=fh(nr[f.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new Un;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function Pm(n,t,e){const i=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(const o in i){const a=hh[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(t.indices!==void 0&&!n.index){const o=e.getDependency("accessor",t.indices).then(function(a){n.setIndex(a)});s.push(o)}return se.workingColorSpace!==Tn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${se.workingColorSpace}" not supported.`),si(n,t),DP(n,t,e),Promise.all(s).then(function(){return t.targets!==void 0?RP(n,t.targets,e):n})}const UP=2.15,kP=[Math.PI/2,0,0],FP=[new N(1,0,0),new N(0,1,0),new N(0,0,1)];class ir{static q=new Ce;bone;rest;axes;cur=[0,0,0];constructor(t){this.bone=t,this.rest=t.quaternion.clone();const e=t.getWorldQuaternion(new Ce).invert();this.axes=FP.map(i=>i.clone().applyQuaternion(e))}static t=[0,0,0];set(t,e,i,s){const r=ir.t;r[0]=t,r[1]=e,r[2]=i,this.bone.quaternion.copy(this.rest);for(let o=0;o<3;o++)this.cur[o]+=(r[o]-this.cur[o])*s,this.cur[o]&&this.bone.quaternion.multiply(ir.q.setFromAxisAngle(this.axes[o],this.cur[o]))}}function OP(n){const t=f=>f.getWorldPosition(new N),e=f=>f.children.filter(d=>d.isBone),i=f=>{const d=[f];for(let p=e(f);p.length===1;p=e(p[0]))d.push(p[0]);return d},s=[];n.traverse(f=>{f.isBone&&s.push(f)});const r=s[0];if(!r)return null;const o=e(r).sort((f,d)=>t(d).z-t(f).z);if(o.length<3)return null;const a=i(o[0]),c=a[a.length-1],l=e(c).sort((f,d)=>Math.abs(t(f).x)-Math.abs(t(d).x));if(l.length<3)return null;const u=(f,d)=>({side:Math.sign(t(f).x),j:d(i(f)).map(p=>new ir(p))}),h=o.slice(-2);return{spine:a.map(f=>new ir(f)),neck:i(l[0]).slice(0,2).map(f=>new ir(f)),arms:l.slice(-2).map(f=>u(f,d=>d.length>=4?d.slice(1,4):d.slice(0,3))),legs:h.map(f=>u(f,d=>d.slice(0,3))),toes:h.map(f=>i(f).at(-1)),ankles:h.map(f=>i(f)[2]??i(f).at(-1)),hands:l.slice(-2).map(f=>i(f).at(-1))}}const Cv={value:0};function BP(n){const t=new Fi({map:n.map,roughness:.78,metalness:0,side:Ee});return t.onBeforeCompile=e=>{e.uniforms.uHurt=Cv,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},t}function zP(){const n=new cn({color:new ct(.06,.02,.05),side:nn});return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * 0.011;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function HP(n,t=!0){return new eP().loadAsync("models/pilot.glb").then(e=>{const i=e.scene,s=[];i.traverse(a=>{const c=a;c.isSkinnedMesh&&(c.material=BP(c.material),c.frustumCulled=!1,s.push(c))});for(const a of t?s:[]){const c=new Q0(a.geometry,zP());c.bind(a.skeleton,a.bindMatrix),c.frustumCulled=!1,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent?.add(c)}const r=new Fe;r.rotation.set(...kP),r.scale.setScalar(UP),r.position.set(0,0,.12),r.add(i),r.updateMatrixWorld(!0);const o=OP(i);for(const a of n.body.children)a.visible=!1;if(n.body.add(r),!o){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}n.feet=o.toes,n.ankles=o.ankles,n.tips=o.hands,n.animate=(a,c,l,u,h)=>{const f=1-Math.exp(-h*12),d=Math.min(1,Math.max(0,(1-c)/.2)),p=Math.min(1,Math.max(0,(c-1)/.06)),v=7*l;for(const{side:m,j:g}of o.arms){const y=.07+.16*p-.08*d;g.forEach((_,x)=>{const M=Math.sin(a*v-x*.8+(m>0?.4:0))*(.025+.02*x),b=x===0?.5*d-.12*p:x===1?.18*d:.08*d;_.set(0,m*b,m*((x===0?y:0)+M),f)})}for(const{side:m,j:g}of o.legs){const[y,_,x]=g;y?.set(-.05*p,-m*(.06+.08*p-.14*d)+.07*u,0,f),_?.set(-(.08+.3*p+Math.sin(a*v*.5+m)*.03),0,0,f),x?.set(1.15,0,0,f)}o.spine.forEach((m,g)=>m.set(Math.sin(a*1.7+g)*.015-.06*p,.07*u,0,f)),o.neck.forEach((m,g)=>m.set(g===0?-(.3+.1*d):-.22,g===0?.05*u:0,0,f))}}).catch(e=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",e))}const Yi=18,Lm=.075,VP=.035;function GP(){const n=new Float32Array(2*Yi*2*3),t=new Float32Array(2*Yi*2*4),e=new Uint16Array(2*(Yi-1)*6);for(let u=0,h=0;u<2;u++)for(let f=0;f<Yi-1;f++){const d=(u*Yi+f)*2;e.set([d,d+1,d+2,d+1,d+3,d+2],h),h+=6}const i=new Yt;i.setAttribute("position",new St(n,3)),i.setAttribute("color",new St(t,4)),i.setIndex(new St(e,1));const s=new $t(i,new cn({vertexColors:!0,transparent:!0,blending:xn,depthWrite:!1,fog:!1}));s.frustumCulled=!1,s.renderOrder=5;const r=[[],[]],o=[],a=new N,c=new N,l=new N;return{mesh:s,update(u,h,f,d,p){for(let v=0;v<2;v++){const m=r[v],g=u[v];if(f&&g){const _=(m.length>=Yi?m.pop():o.pop())??{p:new N,t:0};g.getWorldPosition(_.p),_.t=h,m.unshift(_)}for(;m.length&&h-m[m.length-1].t>Lm;)o.push(m.pop());const y=m.length;for(let _=0;_<Yi;_++){const x=(v*Yi+_)*2;if(_>=y||y<2){x>=2&&n.copyWithin(x*3,(x-2)*3,x*3),t.fill(0,x*4,x*4+8);continue}const M=m[_],b=Math.min(1,(h-M.t)/Lm);_+1<y?a.subVectors(M.p,m[_+1].p):a.subVectors(m[_-1].p,M.p),l.subVectors(p,M.p),c.crossVectors(a,l).normalize().multiplyScalar(VP*(1-.85*b));const w=x*3;n[w]=M.p.x+c.x,n[w+1]=M.p.y+c.y,n[w+2]=M.p.z+c.z,n[w+3]=M.p.x-c.x,n[w+4]=M.p.y-c.y,n[w+5]=M.p.z-c.z;const S=(1-b)**2*Math.min(1,b*8+.35)*(.22+.3*d),T=x*4;t[T]=t[T+4]=1,t[T+1]=t[T+5]=.95,t[T+2]=t[T+6]=.86,t[T+3]=t[T+7]=S}}i.attributes.position.needsUpdate=!0,i.attributes.color.needsUpdate=!0}}}const Ka={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class _r{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const WP=new Fo(-1,1,1,-1,0,1);class XP extends Yt{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const $P=new XP;class bf{constructor(t){this._mesh=new $t($P,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,WP)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class dh extends _r{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof ae?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_n.clone(t.uniforms),this.material=new ae({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new bf(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Nm extends _r{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class qP extends _r{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class KP{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ot);this._width=i.width,this._height=i.height,e=new dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new dh(Ka),this.copyPass.material.blending=li,this.timer=new Ly}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Nm!==void 0&&(o instanceof Nm?i=!0:o instanceof qP&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Da={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class YP extends _r{constructor(){super(),this.isOutputPass=!0,this.uniforms=_n.clone(Da.uniforms),this.material=new mg({name:Da.name,uniforms:this.uniforms,vertexShader:Da.vertexShader,fragmentShader:Da.fragmentShader}),this._fsQuad=new bf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},se.getTransfer(this._outputColorSpace)===pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Rh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ch?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ph?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===vc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Nh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ih?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ZP extends _r{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ct}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const JP={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class fr extends _r{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new ot(t.x,t.y):new ot(256,256),this.clearColor=new ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new dn(r,o,{type:vn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new dn(r,o,{type:vn,depthBuffer:!1});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new dn(r,o,{type:vn,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=JP;this.highPassUniforms=_n.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ae({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ot(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=_n.clone(Ka.uniforms),this.blendMaterial=new ae({uniforms:this.copyUniforms,vertexShader:Ka.vertexShader,fragmentShader:Ka.fragmentShader,premultipliedAlpha:!0,blending:xn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ct,this._oldClearAlpha=1,this._basic=new cn,this._fsQuad=new bf(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ot(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=fr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=fr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],c=o+1<t?e[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new ae({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new ae({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}fr.BlurDirectionX=new ot(1,0);fr.BlurDirectionY=new ot(0,1);const Pv=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,QP={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new ot(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0}},vertexShader:Pv,fragmentShader:`
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
}`},jP={uniforms:{tDiffuse:{value:null},uTexel:{value:new ot(1/1280,1/720)}},vertexShader:Pv,fragmentShader:`
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
}`};function tL(n,t,e,i,s){n.toneMapping=vc,n.toneMappingExposure=1;const r=new KP(n);r.addPass(new ZP(t,e));const o=new fr(new ot(256,256),.35,.5,1.4);r.addPass(o);const a=new dh(QP);r.addPass(a);const c=new YP;r.addPass(c);let l=!1;const u=(m,g)=>{l=g,o.enabled=m.bloom&&!g,c.enabled=o.enabled,a.material.defines.SHAFT_N=g?Math.min(m.shafts,8):m.shafts,a.material.defines.SPEED_BLUR=m.speedBlur&&!g?1:0,a.material.needsUpdate=!0};u(s,!1);const h=new dh(jP);h.enabled=!1,r.addPass(h);const f=new N(i.x,i.y,i.z);let d=1;const p=new N,v=new N;return{render(){e.getWorldDirection(v),p.copy(f).multiplyScalar(1e4).add(e.position).project(e);const m=v.dot(f);a.uniforms.uSun.value.set(p.x*.5+.5,p.y*.5+.5),a.uniforms.uSunVisible.value=d*Math.max(0,Math.min(1,(m-.2)/.4)),r.render()},setSize(m,g){r.setSize(m,g),o.resolution.set(m/2,g/2),a.uniforms.uAspect.value=m/g;const y=n.getPixelRatio();h.uniforms.uTexel.value.set(1/(m*y),1/(g*y))},setPixelRatio(m){r.setPixelRatio(m)},setLite(){return l||!s.bloom&&s.shafts<=8&&!s.speedBlur?!1:(u(s,!0),!0)},togglePainterly(){return h.enabled=!h.enabled,h.enabled},painterly:()=>h.enabled,setSpeed(m){a.uniforms.uSpeed.value=m},setDanger(m){a.uniforms.uDanger.value=m},setSun(m,g){f.set(m.x,m.y,m.z),d=g}}}function eL(n,t){const e=new B2({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,t)),e.setSize(n.clientWidth,n.clientHeight),e.info.autoReset=!1,n.appendChild(e.domElement);const i=new l1,s=new fn(60,n.clientWidth/n.clientHeight,.5,7e4),r=new Mg(16777215,2.4),o=new by(16777215,16777215,1.3);return i.add(r,r.target,o),{renderer:e,scene:i,camera:s,sun:r,hemi:o}}const nL=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function iL(n){return`
uniform float uDusk;
uniform float uMorn;
${hv(n,"uDusk","uMorn")}
${wc}
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
}`}function sL(n){const t=new ae({vertexShader:nL,fragmentShader:iL(n),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:nn,depthWrite:!1,depthTest:!1,fog:!1}),e=new $t(new Ms(1e3,48,24),t);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(i,s,r,o){e.position.copy(i.position),t.uniforms.uTime.value=s,t.uniforms.uDusk.value=r,t.uniforms.uMorn.value=o}}}function rL(){return new ae({vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1})}function oL(){return new ae({vertexShader:`
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
}`,transparent:!0,blending:xn,depthWrite:!1})}const ph=12,Im=new ct(1,.72,.28),aL=new ct(1,.86,.5);function eu(n,t){const e=new Ve(n,t,ph);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new ct(0,0,0)),e}function cL(){const n=eu(new sf(.82,1,40),new cn({transparent:!0,blending:xn,depthWrite:!1,fog:!1,side:Ee})),t=eu(new Zn(2,2),oL()),e=eu(new As(1,2),rL()),i={ring:n,flare:t,shell:e},s=[],r=new Bt,o=new Ce,a=new N,c=new N,l=new ct,u=new N(0,0,1),h=f=>{s.length>=ph*3&&s.shift(),s.push(f)};return{mesh:n,star:t,shell:e,spawn(f,d,p){h({part:"ring",x:f,y:d,z:p,t:0,dur:.35,r0:.6,r1:3.4,color:Im}),h({part:"shell",x:f,y:d,z:p,t:0,dur:.45,r0:.4,r1:3.2,color:Im}),h({part:"flare",x:f,y:d,z:p,t:0,dur:.42,r0:.6,r1:3,color:aL})},update(f,d){const p={ring:0,flare:0,shell:0};for(let v=s.length-1;v>=0;v--){const m=s[v];if(m.t+=f,m.t>=m.dur||p[m.part]>=ph){s.splice(v,1);continue}m.z+=d*f;const g=m.t/m.dur,y=m.r0+(m.r1-m.r0)*(1-(1-g)*(1-g)),_=(1-g)*(1-g)*1.1,x=m.part==="flare"?o.setFromAxisAngle(u,g*2.2):o.identity();r.compose(a.set(m.x,m.y,m.z),x,c.set(y,y,y));const M=i[m.part];M.setMatrixAt(p[m.part],r),M.setColorAt(p[m.part]++,l.copy(m.color).multiplyScalar(_))}for(const v of["ring","flare","shell"]){const m=i[v];m.count=p[v],m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0)}}}}const Dm=4,Um=36,lL={rock:[new ct(.42,.33,.36),new ct(.3,.24,.28),new ct(.24,.3,.16)],cloth:[new ct(.8,.1,.08),new ct(.95,.66,.1),new ct(.5,.33,.2)],village:[new ct(.62,.22,.12),new ct(.55,.3,.2),new ct(.85,.7,.35)]},uL=()=>new ae({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function hL(){const n=new Ve(new Zn(2,2),uL(),Dm),t=new Ve(new As(1,0),new dr,Um);for(const u of[n,t])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new ct);n.renderOrder=8;const e=[],i=[];let s=0;const r=new Bt,o=new Ce,a=new N,c=new N,l=new ct;return{stars:n,chips:t,danger:()=>s,spawn(u,h,f,d,p){e.length>=Dm&&e.shift(),e.push({x:u,y:h,z:f,t:0,dur:p?.42:.3,r0:p?1.4:.9,r1:p?5.2:3.2,seed:Math.random(),follow:!p});const v=p?22:10;for(let m=0;m<v;m++){i.length>=Um&&i.shift();const g=Math.random()*Math.PI*2,y=(p?7:5)+Math.random()*7,_=lL[d];i.push({x:u,y:h,z:f,t:0,life:.9+Math.random()*.6,size:(p?.22:.16)+Math.random()*(p?.38:.22),vx:Math.cos(g)*y,vy:Math.sin(g)*y*.8+4,vz:-(3+Math.random()*8),spin:new N(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:_[m%_.length]})}s=Math.max(s,p?1:.75)},update(u,h){s=Math.max(0,s-u*1.4);let f=0;for(let d=e.length-1;d>=0;d--){const p=e[d];p.t+=u;const v=p.t/p.dur;if(v>=1){e.splice(d,1);continue}p.follow&&(p.z+=h*u);const m=p.r0+(p.r1-p.r0)*(1-(1-v)**3);r.compose(a.set(p.x,p.y,p.z),o.identity(),c.set(m,m,m)),n.setMatrixAt(f,r),n.setColorAt(f++,l.setRGB(Math.min(1,(1-v)*1.6),p.seed,v))}n.count=f,f=0;for(let d=i.length-1;d>=0;d--){const p=i[d];if(p.t+=u,p.t>=p.life){i.splice(d,1);continue}p.vy-=16*u,p.x+=p.vx*u,p.y+=p.vy*u,p.z+=p.vz*u;const v=p.size*Math.min(1,(p.life-p.t)/.25);o.setFromAxisAngle(p.spin,p.t*9),r.compose(a.set(p.x,p.y,p.z),o,c.set(v,v*.7,v*1.2)),t.setMatrixAt(f,r),t.setColorAt(f++,p.color)}t.count=f;for(const d of[n,t])d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0)}}}const Vn=90,fL=1.4,dL=`
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
}`,pL=`
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
}`;function mL(){const n=[0,1].map(()=>({p:Array.from({length:Vn},()=>new N),age:new Float32Array(Vn).fill(1)})),t=2*Vn*2,e=new Float32Array(t*3),i=new Float32Array(t).fill(1),s=new Float32Array(t),r=[];for(let f=0;f<2;f++)for(let d=0;d<Vn;d++){const p=(f*Vn+d)*2;s[p]=-1,s[p+1]=1,d<Vn-1&&r.push(p,p+1,p+2,p+1,p+3,p+2)}const o=new Yt;o.setAttribute("position",new St(e,3)),o.setAttribute("aAge",new St(i,1)),o.setAttribute("aSide",new St(s,1)),o.setIndex(r);const a=new ae({vertexShader:dL,fragmentShader:pL,uniforms:_n.merge([lt.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:Ee,fog:!0}),c=new $t(o,a);c.frustumCulled=!1,c.renderOrder=3;const l=new N,u=new N,h=new N;return{points:c,update(f,d,p,v){n.forEach((m,g)=>{for(let y=0;y<Vn;y++)m.age[y]=Math.min(1,m.age[y]+d/fL);if(p&&d>0){const y=m.p.pop();m.p.unshift(y.copy(f[g])),m.age.copyWithin(1,0,Vn-1),m.age[0]=0}for(let y=0;y<Vn;y++){const _=m.p[y],x=m.p[Math.min(Vn-1,y+1)];l.subVectors(_,x),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(v,_),h.crossVectors(l,u).normalize();const M=.06+.5*m.age[y],b=(g*Vn+y)*2;e.set([_.x-h.x*M,_.y-h.y*M,_.z-h.z*M],b*3),e.set([_.x+h.x*M,_.y+h.y*M,_.z+h.z*M],(b+1)*3),i[b]=i[b+1]=m.age[y]}}),o.getAttribute("position").needsUpdate=!0,o.getAttribute("aAge").needsUpdate=!0}}}const ds=120,gL=40,vL=120,xL=9,_L=30,nu=.11;function ML(){const n=new Float32Array(ds*3),t=new Float32Array(ds*6),e=new Yt;e.setAttribute("position",new St(t,3));const i=new Float32Array(ds*6);for(let f=0;f<ds;f++)i.set([1,1,1,0,0,0],f*6);e.setAttribute("color",new St(i,3));const s=new Yh({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:xn,depthWrite:!1,fog:!1}),r=new tg(e,s);r.frustumCulled=!1,r.renderOrder=5;let o=!1;const a=new N,c=new N,l=new N,u=new N,h=(f,d,p)=>{const v=gL+Math.random()*vL*p,m=xL+(1-Math.random()**2)*_L,g=Math.random()*Math.PI*2;u.copy(d).addScaledVector(a,v).addScaledVector(c,Math.cos(g)*m).addScaledVector(l,Math.sin(g)*m),n[f*3]=u.x,n[f*3+1]=u.y,n[f*3+2]=u.z};return{object:r,update(f,d,p){if(s.opacity=Math.min(.5,.42*p),r.visible=p>.02,e.setDrawRange(0,2*Math.round(ds*Math.min(1,p))),!r.visible)return;const v=d.length();if(v<1)return;a.copy(d).divideScalar(v),c.set(a.z,0,-a.x).normalize(),l.crossVectors(c,a);const m=f.position;if(!o){for(let g=0;g<ds;g++)h(g,m,1);o=!0}for(let g=0;g<ds;g++){u.set(n[g*3]-m.x,n[g*3+1]-m.y,n[g*3+2]-m.z),(u.dot(a)<-4||u.lengthSq()>36100)&&h(g,m,1);const _=g*6,x=n[g*3],M=n[g*3+1],b=n[g*3+2];t[_]=x,t[_+1]=M,t[_+2]=b,t[_+3]=x-d.x*nu,t[_+4]=M-d.y*nu,t[_+5]=b-d.z*nu}e.attributes.position.needsUpdate=!0}}}const Hr=256,km=5,yL=-2e3,bL=400;function SL(n,t,e){let i=0;for(const[s,r]of[[1,41],[1.37,43]]){const o=Math.max(12,Math.round(2*Math.PI*e/((1800+700*t)*s))),a=n/(2*Math.PI)*o,c=Math.floor(a),l=.5+.3*(ut(c,t,r)-.5),u=Math.max(0,1-Math.abs(a-c-l)*2.2),h=(220+140*t)*(.45+.55*ut(c,t,r+1));i=Math.max(i,h*u*u*(3-2*u))}return i}const wL=`
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
}`,TL=`
#include <fog_pars_fragment>
uniform float uFar;
${Th}
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
}`;class EL{rings=[];next=0;heightAt;constructor(t,e,i){this.heightAt=e;for(let s=0;s<i.length-1;s++){const r=s/(i.length-2),o=new ae({vertexShader:wL,fragmentShader:TL,uniforms:_n.merge([lt.fog,{uFar:{value:.25+.6*r}}]),fog:!0});o.uniforms.uRegionHg=No;const a=new $t(new Yt,o);a.frustumCulled=!1,t.add(a),this.rings.push({inner:i[s],outer:i[s+1],mesh:a,anchorX:NaN,anchorZ:NaN})}}update(t,e,i=!1){for(let s=0;s<this.rings.length;s++){const r=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,(Math.hypot(t-r.anchorX,e-r.anchorZ)>bL||Number.isNaN(r.anchorX))&&(this.rebuild(r,t,e),!i))return}}rebuild(t,e,i){const s=new Float32Array((Hr+1)*2*3),r=new Float32Array((Hr+1)*2);for(let c=0;c<=Hr;c++){const l=c/Hr*Math.PI*2,u=Math.sin(l),h=Math.cos(l);let f=-1/0;for(let p=0;p<km;p++){const v=t.inner+(t.outer-t.inner)*p/km;f=Math.max(f,this.heightAt(e+u*v,i+h*v))}Io()>.5&&(f+=SL(l,this.rings.indexOf(t),t.inner));const d=t.inner;s.set([u*d,f,h*d,u*d,yL,h*d],c*6),r[c*2]=f,r[c*2+1]=f}const o=[];for(let c=0;c<Hr;c++){const l=c*2;o.push(l,l+2,l+1,l+2,l+3,l+1)}const a=new Yt;a.setAttribute("position",new St(s,3)),a.setAttribute("aTop",new St(r,1)),a.setIndex(o),t.mesh.geometry.dispose(),t.mesh.geometry=a,t.mesh.position.set(e,0,i),t.anchorX=e,t.anchorZ=i}}const Vr={h:0,s:0,lat:0,vil:0};function AL(n,t,e,i,s){const r=i/s,o=s+3,a=new Float32Array(o*o),c=new Float32Array(o*o*3);for(let M=0;M<o;M++)for(let b=0;b<o;b++)n(t+(b-1)*r,e+(M-1)*r,Vr),a[M*o+b]=Vr.h,c.set([Vr.s,Vr.lat,Vr.vil],(M*o+b)*3);const l=(M,b)=>a[(b+1)*o+(M+1)],u=s+1,h=s*4,f=u*u+h,d=new Float32Array(f*3),p=new Float32Array(f*3),v=new Float32Array(f*3),m=(M,b,w,S)=>{v.set(c.subarray(((w+1)*o+(b+1))*3,((w+1)*o+(b+2))*3),M*3);const T=(l(b+1,w)-l(b-1,w))/(2*r),R=(l(b,w+1)-l(b,w-1))/(2*r),A=1/Math.hypot(T,1,R);d[M*3]=b*r,d[M*3+1]=l(b,w)-S,d[M*3+2]=w*r,p[M*3]=-T*A,p[M*3+1]=A,p[M*3+2]=-R*A};for(let M=0;M<u;M++)for(let b=0;b<u;b++)m(M*u+b,b,M,0);const g=[];for(let M=0;M<s;M++)g.push(M);for(let M=0;M<s;M++)g.push(M*u+s);for(let M=s;M>0;M--)g.push(s*u+M);for(let M=s;M>0;M--)g.push(M*u);const y=r*3+25;g.forEach((M,b)=>m(u*u+b,M%u,Math.floor(M/u),y));const _=[];for(let M=0;M<s;M++)for(let b=0;b<s;b++){const w=M*u+b;_.push(w,w+u,w+1,w+1,w+u,w+u+1)}for(let M=0;M<h;M++){const b=g[M],w=g[(M+1)%h],S=u*u+M,T=u*u+(M+1)%h;_.push(b,w,S,w,T,S)}const x=new Yt;return x.setAttribute("position",new St(d,3)),x.setAttribute("normal",new St(p,3)),x.setAttribute("aTrack",new St(v,3)),x.setIndex(f>65535?new St(new Uint32Array(_),1):new St(new Uint16Array(_),1)),x.computeBoundingSphere(),x}class RL{cache=new Map;shown=new Set;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(t,e,i,s){this.scene=t,this.sample=e,this.material=i,this.cfg=s}update(t,e,i=!1){this.computeWanted(t,e);const s=performance.now();for(const r of this.wanted)if(!this.cache.has(r.key)){if(!i&&performance.now()-s>this.cfg.buildBudgetMs)return;this.cache.set(r.key,this.build(r))}this.shown.size===this.wanted.length&&this.wanted.every(r=>this.shown.has(r.key))||this.swap()}stats(){let t=0;for(const s of this.shown)t+=this.cache.get(s)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(s=>!this.cache.has(s.key)).length,i=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,vertices:t,reach:i}}computeWanted(t,e){const i=[];for(let r=0;r<this.cfg.levels;r++){const o=this.cfg.baseSize*2**r,a=Math.floor(t/(2*o)),c=Math.floor(e/(2*o)),l=Math.floor(t/o),u=Math.floor(e/o);for(let h=2*c-2;h<=2*c+3;h++)for(let f=2*a-2;f<=2*a+3;f++)r>0&&Math.abs(f-l)<=1&&Math.abs(h-u)<=1||i.push({key:`${r}:${f}:${h}`,level:r,ix:f,iz:h})}const s=i.map(r=>r.key).join("|");s!==this.wantedSig&&(this.wantedSig=s,this.wanted=i)}build(t){const e=this.cfg.baseSize*2**t.level,i=t.ix*e,s=t.iz*e,r=t.level>=2?this.cfg.farSegs:this.cfg.segs,o=new $t(AL(this.sample,i,s,e,r),this.material);return o.position.set(i,0,s),o.matrixAutoUpdate=!1,o.updateMatrix(),o}swap(){const t=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)t.has(e)||this.scene.remove(this.cache.get(e));for(const e of t)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,i]of this.cache)t.has(e)||(i.geometry.dispose(),this.cache.delete(e));this.shown=t}}const CL=`
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
`,PL=`
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
`,LL=`
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
}`,NL=`
#include <fog_pars_fragment>
${wc}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;

${Th}
${PL}
${CL}
${cC}

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
}`;function IL(n=1e9,t=!1){return new ae({vertexShader:LL,fragmentShader:NL,defines:t?{TERRAIN_LITE:1}:{},uniforms:{..._n.merge([lt.fog,{uMaxDist:{value:n}}]),...dc,uRegionHg:No},fog:!0})}const DL=6e3,UL=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function kL(n,t){const e=new RL(n,Zg,IL(DL,t.lite),{baseSize:t.baseSize,segs:t.segs,farSegs:t.farSegs,levels:t.levels,buildBudgetMs:5}),i=new EL(n,tn,UL);return{update(s,r){e.update(s.x,s.z,r),i.update(s.x,s.z,r)},statsLine(){const s=e.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const Fm=16,Om=3,Gr=1.8,Bm=2.2,wi={x:0,v:0};function FL(n,t,e,i){wi.x=0,wi.v=0;for(const s of n.obstacles){const r=ns[s.kind],o=s.z-t;if(o+r.halfZ+1<0||o-r.halfZ>Fm)continue;const a=Math.min(1,Math.max(0,1-(o-r.halfZ)/Fm)),c=pn(s.lane);let l=0,u=0;if(s.kind==="ridge")u=Math.max(0,r.hi+Om-i);else if(s.kind==="bridge")i>r.lo-Gr&&i<r.hi+Gr&&(u=n.v<r.lo?r.lo-Gr-i:r.hi+Gr-i);else if(Math.abs(e-c)<r.halfX+Bm){const h=n.x-c;Math.abs(h)>=r.halfX?l=c+Math.sign(h)*(r.halfX+Bm)-e:s.kind==="spike"?u=Math.max(0,r.hi+Om-i):s.kind==="overhang"&&(u=Math.min(0,r.lo-Gr-i))}u>0?wi.v=Math.max(wi.v,u*a):u<0&&(wi.v=Math.min(wi.v,u*a)),Math.abs(l*a)>Math.abs(wi.x)&&(wi.x=l*a)}return wi}function OL(n,t,e){const i=Math.sin(e),s=Math.cos(e);return Math.max(tn(n,t),tn(n+4*i,t+4*s),tn(n+8*i,t+8*s))}const Ti={bankShare:0,bankCap:0,slideRoll:0,rollRate:0,trick:0,rollCap:0,shake:0,diveFov:0};function BL(n){const t=n.mode==="run"?mh(yh(n.z,n.diff),46,64):0,e=(i,s)=>i+(s-i)*t;return Ti.bankShare=e(.45,.25),Ti.bankCap=e(.3,.16),Ti.slideRoll=e(.0022,9e-4),Ti.rollRate=e(3,1.8),Ti.trick=e(1,.4),Ti.rollCap=e(.6,.35),Ti.shake=e(1,.5),Ti.diveFov=e(4,1.5),Ti}function mh(n,t,e){const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)}const zL={back:7.5,up:2.6,fov:58,look:34,lookDown:3.6},HL={back:11,up:4.5,fov:70,look:60,lookDown:5},VL={back:6.5,up:2.2,fov:64,look:40,lookDown:4},zm={back:13,up:4.5,fov:62,look:60,lookDown:6};function iu(n,t,e){const i=(s,r)=>s+(r-s)*e;return{back:i(n.back,t.back),up:i(n.up,t.up),fov:i(n.fov,t.fov),look:i(n.look,t.look),lookDown:i(n.lookDown,t.lookDown)}}class GL{rig={...zm};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(t){this.camera=t,this.aspect=Number.isFinite(t.aspect)&&t.aspect>0?t.aspect:16/9}setAspect(t){Number.isFinite(t)&&t>0&&(this.aspect=t,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(t){this.shakeA=Math.max(this.shakeA,t)}update(t,e,i,s,r=!1){const o=Math.min(1,Math.max(0,(t.speed-42)/22)),a=t.mode==="run"?c0(t.z):0,c=J=>r?1:1-Math.exp(-i*J),l=BL(t),u=a>0?Math.max(.4,Math.min(2,Ox(t.z,t.speed))):1;this.g+=(1+(u-1)*a-this.g)*c(3);const h=Math.max(0,this.g-1),f=Math.max(0,1-this.g),d=this.portrait();let p=t.mode==="ready"?zm:iu(iu(zL,VL,Fx(t.z)),HL,kx(t.z)*(1-.8*d));p={...p,fov:p.fov+10*o+.5*Math.max(0,t.surge)+.34*t.tailwind+(t.vert==="dive"?l.diveFov:0)+(t.thermalT>0?8:0)-2.5*h+5*f,up:p.up-.8*h},t.thermalV>1&&(p={...p,up:p.up+1.5,lookDown:p.lookDown+2}),this.rig=iu(this.rig,p,c(2.4)),this.mv+=(t.v-t.thermalV-t.windLift-this.mv)*c(9+5*d);const v=this.mv,m=t.low&&t.vert==="cruise";this.fv+=((m?1:t.vert==="dive"?.6+.2*d:.45)-this.fv)*c(m?3:10),this.fl+=((m?1:t.vert==="dive"?.9:.35)-this.fl)*c(m?3:10);const g=t.speed*Pi(t.z);this.lag+=(5*(1-.7*d)*Math.tanh(-g/40)*a-this.lag)*c(3),this.x+=(t.x*(.55+.3*d)-this.x)*(r?1:1-Math.exp(-i*(6+4*d)));const y=1.6+20*(1-d);this.x=Math.min(t.x+y,Math.max(t.x-y,this.x));const _=t.mode==="run"?Math.max(-l.bankCap,Math.min(l.bankCap,l.bankShare*a0(t.z,t.speed))):0;this.roll+=(_-e*l.slideRoll-this.roll)*(r?1:1-Math.exp(-i*l.rollRate)),this.shakeA=Math.max(0,this.shakeA-i*2.5);const x=t.mode==="crash"||t.mode==="over",M=this.rig.back*(1-.12*d)-.3*d*Math.max(0,this.rig.back-7.5),b=t.z-M*(x?1.6:1);this.s=b;const w=this.camera,S=this.shakeA*l.shake,T=Math.max(0,Ne(b)-Ne(t.z))*.7*d,R=this.rig.up+.6*d-T+t.thermalV*.8+t.windLift*.85+v*this.fv+this.lag+(x?4:0),A=FL(t,b,this.x,R);this.clrX=Math.abs(A.x)>=Math.abs(this.clrX)?A.x:this.clrX+(A.x-this.clrX)*c(5),this.clrV=Math.abs(A.v)>=Math.abs(this.clrV)?A.v:this.clrV+(A.v-this.clrV)*c(5);const P=ue(b,this.x+this.clrX,R+this.clrV,this.tmp);w.position.set(P.x+S*Math.sin(s*37.1),Math.max(P.y,OL(P.x,P.z,mn(b))+3)+S*Math.sin(s*41.3+2),P.z),this.crashK+=((x?1:0)-this.crashK)*c(4);const I=t.z+this.rig.look*(1-.75*this.crashK),L=.6*t.speed,O=(Ne(I+L)-Ne(I)-Pi(I)*L)*a,B=We(t.z),X=Math.tan(.14)*this.rig.look*mh(B,le.edge-20,le.edge+80)*(1-mh(B,le.pullOut-80,le.pullOut))*a;ue(I,t.x*(.4+.2*d),t.thermalV*.8+t.windLift*.85+v*this.fl+O-this.rig.lookDown-X-Tv(t)*this.crashK,this.tmp),w.up.set(0,1,0),w.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),w.rotateZ(Math.max(-l.rollCap,Math.min(l.rollCap,this.roll+this.trickRoll*l.trick))),this.applyLens()}applyLens(){const t=this.camera,e=this.aspect,i=this.portrait();let s=this.rig.fov,r=1;if(e<1){const a=Math.min(64+60*(1-i),this.rig.fov*(1-.15*i))*Math.PI/180;r=1+.1*i,s=Math.min(118,2*Math.atan(Math.tan(a/2)*r/e)*180/Math.PI)}const o=`${s.toFixed(2)}|${r.toFixed(3)}|${e.toFixed(4)}`;o!==this.lensKey&&(this.lensKey=o,this.viewScale=r,t.fov=s,r>1.001?t.setViewOffset(e,r,0,0,e,1):(t.clearViewOffset(),t.aspect=e,t.updateProjectionMatrix()))}}const su=new ct;function WL(n,t,e,i){let s=i;return{sunDir:()=>s,apply(r,o){xR(n,r,o),s=fR(i,r,o);const a=At(.55,1,r);t.position.set(s.x*1e3,Math.max(s.y,.35*a)*1e3,s.z*1e3),t.color.copy(Bl("sunLight",r,su,o)),t.intensity=2.4*(1-.7*a),e.color.copy(Bl("skyAmbient",r,su,o)),e.groundColor.copy(Bl("bounce",r,su,o)),e.intensity=1.3*(1+.35*a)}}}const Ua={x:-.32,y:.1,z:1};function XL(n,t){const{renderer:e,scene:i,camera:s,sun:r,hemi:o}=eL(n,t.maxDpr);vR(i,Ua);const a=WL(i,r,o,Ua),c=sL(Ua),l=kL(i,t.terrain),u=j3(t.foliage),h=iC(t.ambient),f=aC(),d=ER(t.ambient),p=yR(t.name!=="high"),v=b3(),m=N3(),g=D3(),y=F3(),_=hR(),x=WC(),M=CC(t.ambient),b=YC();jv(HP(b,t.name==="high"));const w=jC(),S=mL(),T=Z2(t.name==="low"),R=GP(),A=ML(),P=VR(),I=DR(),L=kR(),O=cL(),B=hL(),X=mC();i.add(c.mesh,u.group,h.group,f.mesh,v.group,m.group,g.group,y.mesh,_.group,p.mesh,d.mesh,x.group,M.group,b.root,S.points,R.mesh,A.object,P.mesh,I.group,L.mesh,O.mesh,O.star,O.shell,B.stars,B.chips,X.points,T.mesh);const J=tL(e,i,s,Ua,t.post),H=new GL(s);lC(t.ambient>=1?12:t.ambient>=.7?9:6);const $=[new N,new N],j=[new N,new N],vt=new N,gt=new ot,Rt={};let Ft=null;return{renderer:e,scene:i,camera:s,post:J,cam:H,lanterns:M,flashes:O,impacts:B,world:l,ghosts:I,trick:w.trick,pilot:b.root,present(zt,V,Y,yt,Lt=!1){const{dusk:st,morn:Xt}=yt;zt.mode==="crash"||zt.mode==="over"?Ft??=zt.z:Ft=null;let rt=zt;Ft!==null&&zt.z>Ft+.4&&(rt=Object.assign(Rt,zt),rt.z=Ft+.4),a.apply(st,Xt),w.apply(b,rt,V,Y),L.update(b.root.position,rt.stunT/it.stunTime,V,s),H.trickRoll=w.camRoll(),H.update(rt,w.lateralSpeed(),Y,V,Lt),c.update(s,V,st,Xt),l.update(s.position,Lt),u.update(rt.z,st,s),h.update(rt.z,st),f.update(rt.z),uC(),X.update(rt,V,st,H.s),d.update(rt.z),p.update(s,V,H.s),d3(b.root.position.x,b.root.position.z,mn(rt.z),V),O.update(Y,rt.mode==="run"?rt.speed:0),B.update(Y,rt.mode==="run"?rt.speed:0);const Gt=rt.mode==="run"&&rt.hp===1?.14+.08*Math.sin(V*5.5):0;J.setDanger(Math.max(B.danger(),Gt,rt.mode==="crash"?.55:rt.mode==="over"?.25:0)),x.update(rt,V,st),v.update(rt.z),m.update(H.s,V,st),g.update(rt.z,V),y.update(H.s),_.update(rt.z),M.update(rt,V,Y,st,H.s),hC(Math.min(1,Math.max(0,(st-.45)/.4))),P.update(rt,V,H.s),b.root.updateMatrixWorld(),b.feet.forEach((Le,k)=>Le.getWorldPosition($[k])),S.update($,Y,rt.mode==="run"||rt.mode==="ready",s.position),b.ankles.forEach((Le,k)=>Le.getWorldPosition(j[k])),T.update(rt,j,V,Y,s.position);const he=rt.mode==="run"||rt.mode==="ready";R.update(b.tips,V,he,Math.min(1,Math.max(0,(rt.speed-40)/26)+(rt.vert==="dive"?.4:0)),s.position);const ne=rt.stunT/it.stunTime;Cv.value=Math.max(ne*ne*(.6+.4*Math.sin(V*28)),rt.mode==="run"&&rt.hp===1?.18+.12*Math.sin(V*5.5):0);const be=mn(rt.z);vt.set(Math.sin(be),Pi(rt.z),Math.cos(be)).normalize().multiplyScalar(rt.speed);const Ue=Math.min(1,Math.max(0,(rt.speed-40)/26)),Qe=rt.mode==="run"?Math.max(0,rt.surge)/12+rt.tailwind/16:0,Ae=1-.45*Math.min(1,Math.max(0,(st-.5)/.4));return A.update(s,vt,rt.mode==="run"?Ae*(.1+.4*Ue+.55*Qe+(rt.thermalT>0?.35:0)):0),J.setSpeed(rt.mode==="run"?.05*Ue+.16*Qe+(rt.vert==="dive"?.04:0)+(rt.thermalT>0?.1:0):0),J.setSun(a.sunDir(),1-Math.min(1,st*1.6)),M.setViewport(e.getDrawingBufferSize(gt).y*H.viewScale,s.fov),I.setViewport(gt.y*H.viewScale,s.fov),X.setViewport(gt.y*H.viewScale,s.fov),Math.min(1.4,Ue+.5*Qe)},resize(zt,V){e.setSize(zt,V),J.setSize(zt,V),H.setAspect(zt/V)}}}function $L(){const n={z:0,x:0,v:0,thermalV:0,windLift:0},t={};return{capture(e){n.z=e.z,n.x=e.x,n.v=e.v,n.thermalV=e.thermalV,n.windLift=e.windLift},view(e,i){if(i>=1)return e;const s=(r,o)=>r+(o-r)*i;return Object.assign(t,e),t.z=s(n.z,e.z),t.x=s(n.x,e.x),t.v=s(n.v,e.v),t.thermalV=s(n.thermalV,e.thermalV),t.windLift=s(n.windLift,e.windLift),t}}}const Lv=`skyrun.tut.${Pn}`,qL=2e3,KL=.7,YL=.45,ZL=.3,JL=.15;function QL(){try{return new Set(JSON.parse(localStorage.getItem(Lv)??"[]"))}catch{return new Set}}function jL(n){const t=n.obstacles.filter(h=>!h.passed&&h.z-n.z>-ns[h.kind].halfZ);if(!t.length)return null;const e=t.reduce((h,f)=>f.z<h.z?f:h),i=t.filter(h=>h.row===e.row),s=e.kind;if(n.thermalV>8&&s!=="pillar")return null;if(i.some(h=>h.kind==="bridge"))return n.vert==="dive"||n.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(i.some(h=>h.kind==="ridge"))return n.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const r=new Set(i.map(h=>h.lane));if(!r.has(n.lane))return null;const o=i.filter(h=>h.lane===n.lane),a=o.every(h=>h.kind==="spike");if(a&&n.vert==="flare")return null;const c=o.every(h=>h.kind==="overhang");if(c&&(n.vert==="dive"||n.low))return null;const l=[];return[-1,0,1].some(h=>h<n.lane&&!r.has(h))&&l.push("left"),[-1,0,1].some(h=>h>n.lane&&!r.has(h))&&l.push("right"),a&&l.push("up"),c&&l.push("down"),{lesson:l.length===1&&a?"up":l.length===1&&c?"down":"lane",kind:o[0].kind,accept:l,row:e.row,z:e.z}}const Hm={left:"←",right:"→",up:"↑",down:"↓"};function tN(n,t){const e=t?new Set:QL(),i=matchMedia("(pointer: coarse)").matches,s=document.createElement("div");s.className=i?"tut touch":"tut",n.appendChild(s);let r=null,o=1;const a=(l,u)=>{const h=l.accept.filter(y=>l.lesson!=="lane"||y!=="up"&&y!=="down"),f=es(l.z),d=l.kind==="bridge"?f?"chui qua cổng làng":"chui dưới cầu":l.kind==="overhang"?"chui dưới mái đá":l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",p=h.length===1?h[0]==="left"?"sang trái":"sang phải":"sang trái / phải",v=l.lesson==="lane"?`ngón ${p}`:l.lesson==="up"?"lên":"xuống",m=i?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${v} để ${d}`:`Bấm ${h.map(y=>Hm[y]).join(" / ")} để ${d}`,g=l.lesson==="lane"?Et.dragSide:l.lesson==="up"?Et.swipeUp:Et.swipeDown;s.classList.toggle("flip",u>0),s.innerHTML=`<div class="tut-text">${i?g:""}<span>${m}</span></div><div class="tut-arrows">${h.map(y=>`<span class="tut-arrow ${y}">${Hm[y]}</span>`).join("")}</div>`,s.classList.add("on")},c=l=>{e.add(l);try{localStorage.setItem(Lv,JSON.stringify([...e]))}catch{}};return{frozen:()=>r!==null&&o===0,update(l,u){if(l.mode!=="run"||e.size===3)return r=null,s.classList.remove("on"),o=1,1;const h=jL(l);if(r&&(!h||h.row!==r.row)&&(c(r.lesson),r=null,s.classList.remove("on")),!r&&h&&!e.has(h.lesson)&&l.z<qL){const p=(l.obstacles.find(v=>v.row===h.row).z-l.z)/l.speed;p<=KL&&p>=YL&&(r=h,a(h,l.lane))}else r&&h&&(r=h);const f=r!==null&&l.buffered!==null&&r.accept.includes(l.buffered);return o=r&&!f?Math.max(0,o-u/ZL):Math.min(1,o+u/JL),o},offer(l){const u=r?l.find(h=>r.accept.includes(h)):void 0;return u?(o=.4,u):null}}}const gh=`skyrun.progress.s${sr}`,vh="skyrun.meters",Nv=sr,xh=n=>Math.floor(n).toLocaleString("vi-VN"),Iv=n=>(Math.floor(n/100)/10).toLocaleString("vi-VN");function gc(n){try{const t=JSON.parse(localStorage.getItem(n)??"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function Vm(n,t){try{localStorage.setItem(n,JSON.stringify(t))}catch{}}const Sf=n=>gc(gh)[n]??0,Dv=n=>gc(vh)[n]??0;function Cc(n){const t=n.unlock;return!t||Sf(t.from)>=t.score||Dv(t.from)>=t.meters}const eN=()=>Object.values($n).filter(n=>!Cc(n));function Uv(n){const t=eN(),e=gc(gh),i=gc(vh);return n(e,i),Vm(gh,e),Vm(vh,i),t.filter(s=>Cc(s))}const _h=(n,t,e)=>{Number.isFinite(e)&&e>(n[t]??0)&&(n[t]=Math.floor(e))},nN=(n,t,e)=>Uv((i,s)=>{_h(i,n,t),Number.isFinite(e)&&e>0&&(s[n]=Math.floor((s[n]??0)+e))});function Gm(n){return Uv((t,e)=>{for(const i of Object.keys($n))typeof n.score[i]=="number"&&_h(t,i,n.score[i]),typeof n.meters[i]=="number"&&_h(e,i,n.meters[i])})}const kv="skyrun.unlockSeen";function Fv(){try{const n=JSON.parse(localStorage.getItem(kv)??"[]");return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch{return[]}}function Wm(){const n=Fv();return Object.values($n).filter(t=>t.unlock&&Cc(t)&&!n.includes(t.id))}function iN(n){try{localStorage.setItem(kv,JSON.stringify([...new Set([...Fv(),n])]))}catch{}}const Ov={1:"Dễ",2:"Trung bình",3:"Hơi khó",4:"Khó"},Ii={"mu-cang-chai":{difficulty:1,newbie:!0,moments:[{icon:"terrace",text:"Ruộng bậc thang"},{icon:"mountain",text:"Đèo nối dài"}]},"khau-pha":{difficulty:2,moments:[{icon:"gorge",text:"Khe đá uốn lượn",at:"gorge"},{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"house",text:"Làng mái ngói",at:"valley"}]},"ha-giang":{difficulty:3,moments:[{icon:"dive",text:"Lao {dive} m",at:"drop"},{icon:"river",text:"Sát mặt sông",at:"river"},{icon:"cave",text:"Chui hang",at:"cave"},{icon:"thermal",text:"Leo cột gió",at:"climb"}]},fansipan:{difficulty:4,moments:[{icon:"cloud",text:"Trên biển mây"},{icon:"river",text:"Thác Bạc"}]}},Bv={"mu-cang-chai":{name:"Mù Cang Chải",tagline:"Ruộng bậc thang vàng óng, đèo Khau Phạ nối dài."},fansipan:{name:"Fansipan",tagline:"Fansipan trên biển mây, rừng thông và thác Bạc."}},sN=Object.keys(Ii).sort((n,t)=>Ii[n].difficulty-Ii[t].difficulty),rN=n=>n in Bv,ru=120,oN=340,Xm=18,aN=84,$m=new Map;function zv(n){const t=$m.get(n);if(t)return t;const{cycle:e,offset:i}=$n[n],s=Cx(n),r=[],o=new Map,a=new Set;let c=0,l=[];for(let f=0;f<=ru;f++){const d=(i+f/ru*e)%e,p=s.dive(d);c=Math.max(c,p),r.push([f/ru*100,Xm+(aN-Xm)*Math.min(1,p/oN)]);const v=[s.zone(d,!1),...s.drop(d)>.5?["drop"]:[]];for(const m of v){if(a.has(m))continue;const g=o.get(m);g?g[1]=f:o.set(m,[f,f])}for(const m of l)!v.includes(m)&&o.has(m)&&a.add(m);l=v}const u=new Map;for(const[f,[d,p]]of o)u.set(f,r[Math.round((d+p)/2)]);const h={pts:r,dive:Math.round(c/10)*10,anchors:u};return $m.set(n,h),h}const Hv=n=>Ov[Ii[n].difficulty];function Vv(n){const t=Ii[n].difficulty;return`<span class="pc-diff lv${t}"><span class="pc-pips">${"<i></i>".repeat(4)}</span>${Ov[t]}</span>`}const Gv=n=>Ii[n].newbie?`<span class="pc-badge newbie">${Et.star}Hợp người mới</span>`:"";function cN(n){const t=zv(n),e=t.pts.map(([s,r],o)=>`${o?"L":"M"}${s.toFixed(1)} ${r.toFixed(1)}`).join(""),i=Ii[n].moments.map(s=>{const r=s.at&&t.anchors.get(s.at);return r?`<span class="pc-mark" style="left:${r[0].toFixed(1)}%;top:${r[1].toFixed(1)}%">${Et[s.icon]}</span>`:""}).join("");return`<span class="pc-flight" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="area" d="${e}L100 100L0 100Z"/><path class="glow" d="${e}"/><path class="line" d="${e}"/></svg>${i}</span>`}function Wv(n){const t=Ii[n].moments.some(e=>e.text.includes("{dive}"))?zv(n).dive:0;return`<span class="pc-moments">${Ii[n].moments.map(e=>`<span>${Et[e.icon]}${e.text.replace("{dive}",t.toLocaleString("vi-VN"))}</span>`).join("")}</span>`}const Mh=21,qm=2*Math.PI*Mh;function Km(n,t,e,i){const s=Math.min(t,e),r=e>0?s/e:1;return`<span class="pc-ring${r>=1?" done":""}"><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="bg" cx="25" cy="25" r="${Mh}"/><circle class="arc" cx="25" cy="25" r="${Mh}" stroke-dasharray="${qm.toFixed(1)}" stroke-dashoffset="${(qm*(1-r)).toFixed(1)}"/></svg><b>${Math.floor(r*100)}%</b><small>${n}<br>${i(s)} / ${i(e)}</small></span>`}function lN(n,t){const e=t==="locked"?null:Vg(n.id),i=t==="current"?`<span class="pc-badge">${Et.wingsuit}Đang bay</span>`:t==="fresh"?`<span class="pc-badge fresh">${Et.star}Mới mở!</span>`:Gv(n.id),s=t==="locked"?n.unlock:null,r=s?`<span class="pc-goals"><span class="pc-goal-head">Mở khi đạt 1 trong 2 ở ${$n[s.from].name}</span><span class="pc-rings">`+Km(`Điểm mùa ${Nv}`,Sf(s.from),s.score,xh)+'<i class="pc-or">hoặc</i>'+Km("Tổng quãng bay",Dv(s.from),s.meters,o=>`${Iv(o)} km`)+"</span></span>":"";return`<button type="button" class="postcard ${t} map-${n.region}" data-map="${n.id}" aria-label="${n.name}, độ khó ${Hv(n.id)}" title="${n.tagline}">
    <span class="pc-art" style="background-image:url(ui/map-${n.id}.webp)">${cN(n.id)}${t==="locked"?`<span class="pc-lock">${Et.lock}</span>`:""}${Vv(n.id)}</span>
    <span class="pc-body">${i}<b class="pc-name">${n.name}</b>${Wv(n.id)}
      ${e&&e.m>0?`<span class="ui-chip gold pc-best">${Et.trophy}<span>Kỷ lục ${xh(e.m)} m</span></span>`:""}${r}</span>
  </button>`}function uN(n){const{name:t,tagline:e}=Bv[n];return`<div class="postcard soon" data-soon="${n}" role="button" aria-disabled="true" tabindex="-1" aria-label="${t}, độ khó ${Hv(n)}, sắp có" title="${e}">
    <span class="pc-art ink">${Et.mountain}<span class="ui-stamp">Sắp có</span>${Vv(n)}</span>
    <span class="pc-body">${Gv(n)}<b class="pc-name">${t}</b>${Wv(n)}</span>
  </div>`}const hN=[[12,.1,30],[26,.7,22],[72,.3,34],[86,.9,24],[50,1.3,20]];function fN(n,t,e){iN(t.id);const i=t.unlock,s=i?Sf(i.from)>=i.score?`${xh(i.score)} điểm mùa ${Nv}`:`${Iv(i.meters)} km tổng quãng bay`:"",r=document.createElement("div");r.className="unlock-pop",r.setAttribute("role","dialog"),r.setAttribute("aria-label",`Đã mở khoá ${t.name}`),r.innerHTML=`<div class="unlock-sky" aria-hidden="true">${hN.map(([u,h,f])=>`<i style="left:${u}%;animation-delay:${h}s;width:${f}px;height:${f}px">${Et.lantern}</i>`).join("")}</div>
    <div class="unlock-card ui-paper map-${t.region}">
      <div class="unlock-art" style="background-image:url(ui/map-${t.id}.webp)"><span class="ui-stamp unlock-stamp">Mở khoá</span></div>
      <div class="unlock-kicker">${Et.star}Map mới!</div>
      <h2 class="unlock-name">${t.name}</h2>
      <p class="unlock-sub">${t.tagline}</p>
      ${s?`<span class="ui-chip unlock-goal">${Et.check}${s} ở ${$n[i.from].name}</span>`:""}
      <div class="unlock-actions">
        <button type="button" class="ui-btn-lacquer" data-go>${Et.check}Chọn ${t.name}</button>
        <button type="button" class="ui-btn-cloth" data-later>Để sau</button>
      </div>
    </div>`,wn(r);const o=r.querySelector("[data-go]"),a=r.querySelector("[data-later]"),c=()=>r.remove();r.addEventListener("click",u=>{u.stopPropagation();const h=u.target instanceof Element?u.target:null;h?.closest("[data-go]")?(c(),e(t)):(h===r||h?.closest("[data-later]"))&&c()});const l=u=>{if(!r.isConnected)return void window.removeEventListener("keydown",l,!0);if(u.key==="Escape")a.click();else if(u.key==="Enter"||u.key===" ")(document.activeElement===a?a:o).click();else return;u.stopPropagation(),u.preventDefault()};window.addEventListener("keydown",l,!0),n.appendChild(r)}const dN=".unlock-pop, .board-panel:not([hidden]), .settings-panel:not([hidden]), .help-panel:not([hidden])";function Ym(n){try{localStorage.setItem(n0,n.id)}catch{}const t=new URLSearchParams(location.search);t.set("map",n.id),location.search=t.toString()}function pN(n,t){const e=document.createElement("div");e.className="lobby-panel",e.hidden=!0,e.innerHTML=`<div class="lobby-card ui-indigo ui-trim" role="dialog" aria-label="Sảnh chọn map">
      <div class="panel-head">${Et.mountain}<b>Chọn map</b></div>
      <button type="button" class="ui-badge ui-close" data-close aria-label="Đóng">${Et.close}</button>
      <div class="lobby-scroll"><div class="lobby-track" data-track></div><div class="lobby-dots" data-dots></div></div>
      <button type="button" class="ui-btn-lacquer lobby-go" data-go></button>
    </div>`,n.appendChild(e),wn(e);const i=e.querySelector("[data-track]"),s=e.querySelector("[data-dots]"),r=e.querySelector("[data-go]");let o=[],a,c=Pn,l=0;const u=_=>_.id===Pn?"current":Cc(_)?o.includes(_)?"fresh":"open":"locked",h=()=>[...i.querySelectorAll(".postcard")],f=()=>{h().forEach((b,w)=>{const S=(b.dataset.map??b.dataset.soon)===c;b.classList.toggle("selected",S),s.children[w]?.classList.toggle("on",S)});const x=$n[c],M=x?u(x):"soon";r.disabled=M==="locked"||M==="soon",r.innerHTML=M==="locked"?`${Et.lock}Chưa mở khoá`:M==="soon"?"Sắp có":`${Et.check}Chọn ${x.name}`},d=(_,x)=>{i.scrollTo({left:_.offsetLeft-(i.clientWidth-_.offsetWidth)/2,behavior:x?"smooth":"auto"})},p=()=>{i.innerHTML=sN.map(_=>rN(_)?uN(_):lN($n[_],u($n[_]))).join(""),s.innerHTML=h().map(()=>"<i></i>").join(""),f()},v=()=>{const _=$n[c];!_||r.disabled||(_.id===Pn?m():Ym(_))},m=()=>{e.hidden=!0};e.addEventListener("click",_=>{const x=_.target instanceof Element?_.target:null;if(x===e||x?.closest("[data-close]"))return m();if(x?.closest("[data-go]"))return v();const M=x?.closest(".postcard");if(!M)return;const b=M.dataset.map??M.dataset.soon;if(b===c)return v();c=b,f(),d(M,!0)}),i.addEventListener("scroll",()=>{clearTimeout(l),l=window.setTimeout(()=>{const _=i.scrollLeft+i.clientWidth/2,x=h().reduce((b,w)=>Math.abs(w.offsetLeft+w.offsetWidth/2-_)<Math.abs(b.offsetLeft+b.offsetWidth/2-_)?w:b),M=x.dataset.map??x.dataset.soon;M!==c&&i.scrollWidth>i.clientWidth+4&&(c=M,f())},140)},{passive:!0}),window.addEventListener("keydown",_=>{_.code==="Escape"&&!e.hidden&&m()}),window.addEventListener("keydown",_=>{e.hidden||_.code!=="Space"&&_.code!=="Enter"||n.querySelector(dN)||(_.stopImmediatePropagation(),_.preventDefault(),v())},!0);const g=()=>{const _=Wm().length>0||o.length>0;for(const x of n.querySelectorAll("[data-lobby]"))x.classList.toggle("has-news",_)},y=(_=[])=>{_.length&&(o=[...new Set([...o,..._])]),e.hidden||p(),g()};return{open(){const _=Wm()[0];c=o[0]?.id??_?.id??Pn,p(),e.hidden=!1;const x=h().find(M=>M.dataset.map===c);x&&requestAnimationFrame(()=>d(x,!1)),_&&!n.querySelector(".unlock-pop")&&fN(n,_,Ym),o=[],g(),t?.().then(M=>M.length&&y(M))},setScreen(_){_!==a&&(a=_,_?g():m())},refresh:y}}function mN(){let n=null;return t=>{if(!le.zoneNames||t.mode!=="run")return n=null,null;const e=t.z+t.speed*1.5,i=le.zone(We(e),es(e));return i===n?null:(n=i,le.zoneNames[i]?i:null)}}const Zi=1/60;function gN(n){const t=new URLSearchParams(location.search),e=cE(t),i=XL(n,e),{renderer:s,post:r}=i,o=W_(),a=ME(n),c=J2(n,i.cam,i.lanterns,o,a,i.flashes,i.impacts,i.camera),l=AE(n,()=>g.mode==="run"&&!L.paused(),()=>g.steerX),u=pE(Number(t.get("seed")??0));let h=u();const f=H_(t);let d=t.get("auto")==="1",p=d||t.has("z");const v=mN(),m=t.has("alt");let g=Oc(h.seed,m);g.z=Number(t.get("z")??0);let y=0,_=null;const x=$L();x.capture(g);const M=tN(n,t.get("tut")==="1"),b=($,j=!1,vt=1)=>{const gt=f.at(g.z),Rt=x.view(g,vt),Ft=i.present(Rt,y-Zi*(1-vt),$,gt,j);P.present(g,Rt,vt,$),a.update(g,gt),a.setPilotBox(g.mode==="run"?Op(i.pilot,i.camera,n):null),o.update(Ft,g.mode==="run",gt);const zt=v(g);zt&&(a.zone(zt),o.zone(zt));const V=T.visible();R.setScreen(V),A.setScreen(V)},w=()=>{g.mode==="run"||g.mode==="crash"||n.querySelector(".unlock-pop")||(g.mode==="over"&&(h=u()),g=Oc(h.seed,m),p=d||t.has("z"),g.z=Number(t.get("z")??0),x.capture(g),b(0,!0),v_(g),P.runStart(g,h.route),_=null,o.runStart(),T.hide(),a.setVisible(!0))},S=()=>{h=u(),g=Oc(h.seed,m),g.z=Number(t.get("z")??0),p=d||t.has("z"),_=null,x.capture(g),b(0,!0),T.showTitle(),a.setVisible(!1)},T=YA(n,w,()=>{T.visible()==="over"&&S(),R.open()}),R=pN(n,async()=>{const $=await P.progress();return $?Gm($):[]}),A=$_(n),P=CA({root:n,params:t,hud:a,screens:T,view:i.ghosts,camera:i.camera,route:h.route,quality:()=>({tier:e.name,scale:H.scale}),rv:m?2:Ge.logRvBase+Lg});P.progress().then($=>$&&R.refresh(Gm($)));const I=PA(n,o),L=NA(n,I.el,{touch:matchMedia("(pointer: coarse)").matches,onHome:()=>(P.runAbandon(g),S(),R.open())});QA(n,I,o,i.ghosts,L),l.onAction($=>{L.paused()?L.resume():T.visible()&&T.tapReady()?w():$==="Space"&&L.pause()}),l.onKey("KeyM",()=>I.toggle("sfx")),l.onKey("KeyN",()=>I.toggle("music")),l.onKey("KeyH",()=>a.setVisible(n.querySelector(".hud.hidden")!==null)),l.onTrick(i.trick),T.showTitle(),a.setVisible(!1);const O=$=>{x.capture(g),__(g,d?mx(g):$,l.holdDown(),Zi,d?null:l.steer()),P.afterStep(g,d),c.handle(g.events,g);for(const j of g.events)j.type==="crash"&&(_=j.kind);y+=Zi,g.mode==="over"&&!T.visible()&&(!p&&!g.alt&&R.refresh(nN(Ge.id,_s(g),g.z)),o.over(T.showOver(g,_,!p&&!g.alt)),P.runOver(g,_),a.setVisible(!1))};let B=0;const X=$=>{L.setRunning(g.mode==="run",g.mode==="crash");const j=(g.mode==="crash"&&g.crashT<.9?.35:1)*L.factor($)*(d?1:M.update(g,$));if(M.frozen()&&!L.paused()){const vt=l.take(),gt=l.steer(),Rt=gt===null?g.lane:v0(g.lane,gt),Ft=M.offer(Rt!==g.lane?[...vt,Rt<g.lane?"left":"right"]:vt);Ft&&O(vt.includes(Ft)?[Ft]:[])}for(B+=$*j;B>=Zi;)O(l.take()),B-=Zi;b($*j,!1,B/Zi)},J=()=>i.resize(n.clientWidth,n.clientHeight);window.addEventListener("resize",J),J(),b(0,!0),V2(s,r,{state:()=>g,advance($){for(let j=0;j<$/Zi;j++)O(l.take()),b(Zi)},play($,j=60){for(let vt=0;vt<$*j;vt++)X(1/j)},autopilot($){d=$,$&&(p=!0)},jump($){p=!0,g.z=$,g.nextChunkZ=$+200,g.obstacles=[],g.pickups=[],x.capture(g),b(0,!0)},dusk:f.forceDusk,clock:f.forceU,render:()=>{b(0),r.render()},pilotBox:()=>Op(i.pilot,i.camera,n),hurt(){g.mode!=="run"||g.hp<=1||(g.hp--,c.handle([{type:"hurt",hp:g.hp,kind:"pillar"}],g))}},i);const H=hE({renderer:s,post:r,tier:e,resize:J,tick:X,stats:t.has("stats")?$=>a.setStats($):null,worldLine:()=>i.world.statsLine()});window.__skyrunQuality={tier:e,governor:H}}O_(Ge.region);document.title=`Sky Run · ${R0[Ge.region]}`;gN(document.getElementById("app"));ex();
