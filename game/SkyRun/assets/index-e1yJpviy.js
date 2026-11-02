(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const tg=6e3,Ap=[];function eg(n){return Ap.push(n),n}const Rp=new Promise(n=>{const t=()=>{Promise.allSettled(Ap).then(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>n(),{timeout:1500}):setTimeout(n,100)})};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0}),setTimeout(n,tg)}),ng=n=>fetch(n,{priority:"low"}).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null);function ig(){const n=window.SR_SW,t=/\.github\.io$/.test(location.hostname)||location.hostname==="localhost";!n||!t||!("serviceWorker"in navigator)||Rp.then(()=>navigator.serviceWorker.register(n).catch(e=>console.warn("[skyrun] sw",e)))}const sg={d0:0,hardAt:5e3},Fh=400,la=n=>Math.max(0,Math.min(1,n));function Zr(n,t){return n<=t.hardAt?t.d0+(1-t.d0)*la((n-Fh)/(t.hardAt-Fh)):1+.15*la((n-t.hardAt)/3e3)}const rg=[0,.12,.3,.5,.75];function og(n){let t=0;return rg.forEach((e,i)=>{n>=e&&(t=i)}),t}function ag(n){return Math.max(-.2,.35-.55*n)}function cg(n){return n<=1?1-.28*la((n-.3)/.7):.72-.06*la((n-1)/.15)}const lg=[[.05,0,0],[.25,.5,0],[.55,.75,.08],[1,.7,.28],[1.15,.6,.4]];function ug(n,t){return n<.5||t%2===0}const st={laneGap:6,laneTime:.2,laneOmega:30,steerMax:7,bufferTime:.25,speedStart:42,speedMax:64,vertIn:.2,vertHold:.4,vertOut:.25,flareHeight:5.5,vertOmegaIn:24,vertOmegaOut:11,diveSpeedMul:1.08,flareSpeedMul:.95,surgeTau:2.5,surgeTauNearRow:.6,surgeMin:-6,surgeMax:12,cellSeconds:.29,spawnAheadMeters:640,despawnBehind:40,hitHalfWidth:.5,hitHalfHeight:.4,nearMissWindow:.3,comboBreak:4,multStep:.1,multMax:3,thermalTime:4,thermalHeight:16,tailwindPerGust:6,tailwindMax:24,tailwindTau:1.6,gustLift:8,gustLiftTime:.9,gustLen:50,gustRadiusX:2.2,gustRadiusV:3,gustScore:10,gustChainScore:50,maxHp:2,stunTime:1,hitstop:.07,crashSeconds:1.8,lanternPickRadius:1.6,lanternScore:20,lanternMultStep:.04,lanternMultTau:1.5,lowTransition:.5,smokeTime:6,smokeLanternMul:2},Fa=2;function mn(n){return-n*st.laneGap}function Cp(n,t){const e=Math.min(1,Zr(n,t));return st.speedStart+(st.speedMax-st.speedStart)*(1-(1-e)*(1-e))}const Vi={pillar:{halfX:3,halfZ:3,lo:-400,hi:45},spike:{halfX:2.4,halfZ:3,lo:-400,hi:1},ridge:{halfX:1/0,halfZ:4,lo:-400,hi:1},bridge:{halfX:1/0,halfZ:2.2,lo:-1,hi:10}};function ua(n,t,e,i){const s=Vi[n.kind];return Math.abs(i)>s.halfZ||Math.abs(t-mn(n.lane))>=s.halfX+st.hitHalfWidth?!1:e-st.hitHalfHeight<s.hi&&e+st.hitHalfHeight>s.lo}function hg(n,t,e){return Math.abs(t-mn(n.lane))>=Vi[n.kind].halfX+st.hitHalfWidth?!0:e==="flare"?n.kind==="spike"||n.kind==="ridge":e==="dive"?n.kind==="bridge":!1}function fg(n,t){return n.z+Vi[n.kind].halfZ<t}const dg=[st.flareHeight,0,-5.5],pg=0,Pp=1,mg=2;function br(n,t,e){return!n.some(i=>ua(i,mn(t),dg[e],0))}function gg(n){const t=[];for(let e=-1;e<=1;e++)for(let i=0;i<3;i++)br(n,e,i)&&t.push({lane:e,tier:i});return t}function Oh(n){return gg(n).length}function ec(n,t,e){return e?n.some(i=>i.kind==="pillar"&&i.lane===t)?"none":"any":br(n,t,Pp)?"any":br(n,t,pg)?"high":br(n,t,mg)?"low":"none"}function vg(n,t,e,i,s){const r=n.thermalV>8,o=n.low&&!r,a=(t[0].z-n.z)/n.speed,c=d=>{const m=ec(t,d,r);if(m==="none")return 1/0;const v=m==="any"?0:m==="low"&&o?.3:1.5;return Math.abs(d-n.lane)+v+(e&&ec(e,d,r)==="none"?.6:0)},l=[-1,0,1].filter(d=>c(d)<1/0).sort((d,m)=>c(d)-c(m))[0];if(l===void 0)return a<i+.12&&n.vert!=="flare"?["up"]:[];const u=ec(t,l,r);if(l===n.lane&&u==="any")return null;const f=[],h=s&&l===n.lane&&n.pickups.some(d=>!d.taken&&d.lane===n.lane&&d.z>n.z&&d.z<t[0].z&&(u==="low"?d.v<-2:d.v>2)&&(d.z-n.z)/n.speed<.2);if(u==="high"){const d=n.vert!=="flare"||n.vertT>=st.vertIn+st.vertHold;(a<i+.12+(o?.06:0)||h)&&d&&f.push("up")}else u==="low"&&(a<i+.12||h)&&((n.alt?n.low:n.vert==="dive"&&n.vertT<st.vertIn+st.vertHold)||f.push("down"));if(l!==n.lane){const d=i+(Math.abs(l-n.lane)-1)*st.laneTime*1.3;a<=d&&f.push(l<n.lane?"left":"right")}return f}function Lp(n,t){const e=new Map;for(const i of n.obstacles){const s=i.z-n.z;if(i.passed||s<-Vi[i.kind].halfZ||s>t)continue;const r=e.get(i.row)??[];r.push(i),e.set(i.row,r)}return[...e.values()].sort((i,s)=>i[0].z-s[0].z)}function kh(n){return new Set(n.filter(t=>t.kind==="pillar"||t.kind==="spike").map(t=>t.lane))}function xg(n,t=.27,e=!0){if(n.mode!=="run")return[];const i=Lp(n,n.speed*2.2),s=i[0],r=o=>e?Mg(n,o):[];return s?vg(n,s,i[1],t,e)??r(s):_g(n)??r()}function _g(n){const t=n.gusts.find(i=>!i.taken&&!i.missed&&i.z+i.len>n.z);if(!t||t.z-n.z>n.speed*1.5)return null;if(t.lane!==n.lane)return n.laneT<1?[]:[t.lane<n.lane?"left":"right"];const e=(t.z-n.z)/n.speed;return Ip(n,t.v,e)?["up"]:e>.25?[]:t.v>2&&n.vert!=="flare"?["up"]:t.v<-2&&!Np(n)?["down"]:[]}function Np(n){return n.alt?n.low:n.vert==="dive"}function Ip(n,t,e){return n.alt&&n.low&&n.vert==="cruise"&&Math.abs(t)<=2&&e<.9}function Mg(n,t){const e=n.pickups.find(o=>!o.taken&&o.kind==="lantern"&&o.lane===n.lane&&o.z>n.z);if(e&&n.thermalV<2){const o=(e.z-n.z)/n.speed;if(Ip(n,e.v,o))return["up"];if(e.v>2&&n.vert!=="flare"&&o<.2)return["up"];if(e.v<-2&&!Np(n)&&o<.2)return["down"]}const i=n.pickups.find(o=>!o.taken&&o.z-n.z>n.speed*.35&&o.z-n.z<n.speed*1.2);if(!i||i.lane===n.lane||n.laneT<1)return[];const s=i.lane<n.lane?-1:1;return t&&kh(t).has(n.lane+s)?[]:Lp(n,i.z-n.z).some(o=>kh(o).has(n.lane+s))?[]:[s<0?"left":"right"]}function oo(n,t,e){let i=Math.imul(n,374761393)^Math.imul(t,668265263)^Math.imul(e+1,2246822519);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function Bh(n){return n*n*n*(n*(n*6-15)+10)}function _t(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=Bh(n-i),o=Bh(t-s),a=oo(i,s,e),c=oo(i+1,s,e),l=oo(i,s+1,e),u=oo(i+1,s+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+u)*r*o}function hi(n,t,e,i){let s=0,r=1,o=0,a=1;for(let c=0;c<e;c++)s+=_t(n*a,t*a,i+c*31)*r,o+=r,r*=.5,a*=2.03;return s/o}function zh(n,t,e,i){let s=0,r=1,o=0,a=1,c=1;for(let l=0;l<e;l++){const u=1-Math.abs(_t(n*a,t*a,i+l*17)*2-1),f=u*u*c;c=Math.min(1,f*1.6),s+=f*r,o+=r,r*=.5,a*=2.1}return s/o}function ha(n){return n<0?0:n>1?1:n}function se(n,t,e){const i=ha((e-n)/(t-n));return i*i*(3-2*i)}function We(n,t,e){return n+(t-n)*e}const qe=2700,is=1700,yg=[[120,45,220],[292.8,-90,220],[638.4,45,220],[1120,180,170],[1820,-90,250]],mi=2*qe,Zn=is;function Ir(n,t){if(n.k===0)return{x:n.x+t*Math.sin(n.th),z:n.z+t*Math.cos(n.th),th:n.th};const e=n.th+n.k*t;return{x:n.x+(Math.cos(n.th)-Math.cos(e))/n.k,z:n.z+(Math.sin(e)-Math.sin(n.th))/n.k,th:e}}function Hh(n,t){const e=[];let i=0,s=0,r=t,o=0;const a=(c,l)=>{if(c<.5)return;const u={k:l,x:i,z:s,th:r},f=Ir(u,c),h=Ir(u,c/2),d=Math.max(Math.hypot(h.x-i,h.z-s),Math.hypot(h.x-f.x,h.z-f.z));e.push({u0:o,len:c,k:l,x:i,z:s,th:r,bx:h.x,bz:h.z,br:d}),i=f.x,s=f.z,r=f.th,o+=c};for(const c of[1,-1]){const l=c===1?0:qe;for(const[u,f,h]of n)a(l+u-o,0),a(Math.abs(f)*Math.PI/180*h,c*Math.sign(f)/h);a(l+qe-o,0)}return{segs:e,x:i,z:s}}function Sg(n){const t=Hh(n,0),{segs:e,x:i,z:s}=Hh(n,-Math.atan2(t.x,t.z));let r=e.length-1;for(;r>0&&e[r].u0>Zn;)r--;const o=Ir(e[r],Zn-e[r].u0),a=e.reduce((u,f)=>u+f.bx,0)/e.length,c=e.reduce((u,f)=>u+f.bz,0)/e.length,l=Math.max(...e.map(u=>Math.hypot(u.bx-a,u.bz-c)+u.br));return{segs:e,endX:i,endZ:s,ox:o.x,oz:o.z,bx:a,bz:c,br:l}}const Jr=Sg(yg);function fa(n,t,e=Jr){const i=n+Zn,s=Math.floor(i/mi),r=i-s*mi;let o=e.segs.length-1;for(;o>0&&e.segs[o].u0>r;)o--;const a=Ir(e.segs[o],r-e.segs[o].u0);return t.x=a.x+s*e.endX-e.ox,t.z=a.z+s*e.endZ-e.oz,t.yaw=a.th,t}const bg={x:0,z:0,yaw:0},wg={x:0,z:0,yaw:0};function Tg(n,t=30){return(fa(n+t,wg).yaw-fa(n-t,bg).yaw)/(2*t)}function Eg(n,t,e,i,s,r){let o;if(n.k===0)o=t*Math.sin(n.th)+e*Math.cos(n.th);else{const f=Math.sign(n.k);let d=Math.atan2(f*(e+Math.sin(n.th)/n.k),-f*(t-Math.cos(n.th)/n.k))-n.th;d-=2*Math.PI*Math.round((d-n.k*n.len/2)/(2*Math.PI)),o=d/n.k}const a=o>=i-.01&&o<=s+.01;o=Math.min(s,Math.max(i,o));const c=Ir(n,o),l=t-(c.x-n.x),u=e-(c.z-n.z);return r.s=o,r.dist=Math.hypot(l,u),r.lat=l*Math.cos(c.th)-u*Math.sin(c.th),a}const js={s:0,lat:0,dist:0};function Ag(n,t,e,i,s,r=Jr){s.dist=1/0;const o=Math.floor((e+Zn)/mi),a=Math.floor((i+Zn)/mi);for(let c=o;c<=a;c++){const l=c*mi-Zn;for(const u of r.segs){const f=l+u.u0;f>i||f+u.len<e||(Eg(u,n-c*r.endX+r.ox-u.x,t-c*r.endZ+r.oz-u.z,Math.max(0,e-f),Math.min(u.len,i-f),js),js.dist<s.dist&&(s.dist=js.dist,s.s=f+js.s,s.lat=js.lat))}}return s}const cn=1100,Dp=1320,Sl=2450;function un(n){return((n+is)%qe+qe)%qe}function Qr(n){return Math.floor((n+is)/qe)}const wr=9.5;function Fn(n){if(Qr(n)%2!==0)return 0;const t=un(n);return se(1600,1720,t)*(1-se(2380,2500,t))}function zi(n){return Fn(n)>.97}function kn(n){const t=un(n);return t<cn?0:t<Sl?se(cn,Dp,t):1-se(Sl,qe,t)}function xi(n){return 260+30*Math.sin(n/1700)}function Pe(n){const t=un(n),e=se(cn+40,cn+380,t)-se(Sl-650,qe-60,t);return xi(n)-Rg*e}const Rg=150;function Up(n){const t=un(n);return se(760,940,t)*(1-se(1092,1108,t))}const da=1480;function gi(n){return(Pe(n+2)-Pe(n-2))/4}function Fp(n,t){return Math.max(-1.1,Math.min(1.1,Math.atan(t*t*Tg(n)/9.8)))}const Ps={x:0,z:0,yaw:0};function En(n){return fa(n,Ps).yaw}function Se(n,t,e,i){return fa(n,Ps),i.x=Ps.x+t*Math.cos(Ps.yaw),i.y=Pe(n)+e,i.z=Ps.z-t*Math.sin(Ps.yaw),i}const Cg=[320,640,930];function Pg(n){let t=0;for(const e of Cg)t=Math.max(t,1-se(0,70,Math.abs(n-e)));return t}function Dr(n){const t=un(n),e=We(64,30,t<cn?Pg(t):0);return We(e,430,kn(n))}function Lg(n){const t=un(n);return ha(se(da-20,da+60,t)*(1-se(1640,1760,t)))}const ao=1770;function Ng(n){const t=un(n);return se(cn-25,cn+10,t)*(1-se(da-40,da+20,t))}function Op(n){const t=un(n);return se(cn-40,cn-10,t)*(1-se(1600,1690,t))}function Ig(n,t){const e=(Pe(n+4)-Pe(n-4))/8,i=(Pe(n+4)-2*Pe(n)+Pe(n-4))/16;return 1+t*t*i/(Math.pow(1+e*e,1.5)*9.8)}const Dg=[{id:"cot-le",tier:0,cells:"... ... B.. .o. .o. .o. ..B ... ..."},{id:"den-thang",tier:0,cells:"... ... .o. .o. .o. .o. .o. .o. ... ..."},{id:"cau-mot",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"song-mot",tier:0,cells:"... ... ... ... .u. .u. LLL .o. ... ..."},{id:"cong-giua",tier:0,cells:"... ... .o. B.B .o. ... ... ... ..."},{id:"cot-giua",tier:0,cells:"... ... .B. o.o ... ... .B. ... ..."},{id:"zic-zac",tier:1,cells:"... ... B.o ... ... ... o.B ... ... ... B.o ... ..."},{id:"cong-lech",tier:1,cells:"... ... BB. ... ..o ... .BB ... ..."},{id:"mom-da",tier:1,cells:"... ... L.L .u. ... ... .L. ... ..."},{id:"song-cong",tier:1,cells:"... ... ... .u. .u. .u. LLL ... ... ... B.B ... ..."},{id:"cau-cot",tier:2,cells:"... ... ... ... .d. .d. HHH ... ... ... .B. ... ..."},{id:"ong-da",tier:2,cells:"... ... B.B .o. B.B .o. B.B ... ..."},{id:"cong-zic",tier:2,cells:"... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"mom-song",tier:2,cells:"... ... L.L ... ... ... ... .u. LLL ... ..."},{id:"doi-doc",tier:3,cells:"... ... ... ... .u. .u. LLL ... ... ... .d. .d. HHH ... ..."},{id:"luon-cot",tier:3,cells:"... ... B.. ... ... ... .B. ... ... ... ..B ... ... ... .B. ... ..."},{id:"cot-cau-cot",tier:3,cells:"... ... ..B ... ... ... ... .d. HHH ... ... ... B.. ... ..."},{id:"zic-zac-gat",tier:4,cells:"... ... B.B ... ... ... .BB ... ... ... BB. ... ... ... .BB ... ..."},{id:"vot-chui-vot",tier:4,cells:"... ... ... ... .u. LLL ... ... ... .d. HHH ... ... ... .u. LLL ... ..."},{id:"cot-cau-mom",tier:4,cells:"... ... B.L ... ... ... .d. HHH ... ... ... LB. ... ... ... ..B ... ..."}],Ug={cells:"... ... .o. .o. ... ... .d. .d. HHH .o. .o. .o. ... ... ... ... ... ..."},Fg=8,Og=[{id:"thap-da",tier:0,cells:"... ... B.. ... ... ... ..B ... ... ... .B. ... ..."},{id:"vong-den",tier:0,cells:"... ... o.. .o. ..o .o. o.. .o. ..o ... ..."},{id:"cua-da",tier:0,cells:"... ... B.B .o. ... ... .B. ... ..."},{id:"song-xa",tier:1,cells:"... ... ... ... .u. .u. LLL ... ... ..."},{id:"cong-lang",tier:0,cells:"... ... ... ... .d. .d. HHH .o. ... ..."},{id:"rung-thap",tier:1,cells:"... ... .B. o.o o.o ... B.B .o. ... ..."},{id:"thap-day",tier:2,cells:"... ... B.B ... ... ... .BB ... ... ... B.. ... ..."}];function bl(n){return n.split(" ")}function Hi(n){let t=n.seed=n.seed+1831565813|0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kg(n,t,e){const i=lg;let s=0;for(;s<i.length-1&&n>i[s+1][0];)s++;const r=i[s],o=i[Math.min(s+1,i.length-1)],a=o[0]>r[0]?Math.max(0,Math.min(1,(n-r[0])/(o[0]-r[0]))):1,c=(e?.5:1)*(t?.6+.3*Math.min(1,n):1);return{p3:(r[1]+(o[1]-r[1])*a)*c,p2:(r[2]+(o[2]-r[2])*a)*c}}const Bg=new Set(["o","u","d"]),zg=/[BLH]/;function Hg(n,t,e,i,s,r,o){if(!t.length)return;for(let p=i-3;p<=i+3;p++)if(p!==i&&zg.test(e[p]??""))return;const{p3:a,p2:c}=kg(Zr(Math.max(0,s),n.diff),r,o),l=Hi(n),u=l<c?2:l<c+a?3:0;if(!u||Oh(t)<=u)return;const f=t.some(p=>p.kind==="bridge"||p.kind==="ridge");if(f&&o)return;const h=p=>t.some(M=>(M.kind==="pillar"||M.kind==="spike")&&M.lane===p),d=[-1,0,1].filter(p=>!h(p)&&(f||e[i][p+1]===".")&&![i-2,i-1,i+1].some(M=>Bg.has(e[M]?.[p+1]??""))),m=f?["pillar"]:o?["spike"]:["pillar","spike"],v=[[]];for(const p of d){const M=[];for(const y of v){M.push(y);for(const x of m)M.push([...y,{kind:x,lane:p}])}v.splice(0,v.length,...M)}const g=v.filter(p=>p.length&&Oh([...t,...p])===u);g.length&&t.push(...g[Math.floor(Hi(n)*g.length)])}function Cu(n){n.mult=Math.min(st.multMax,1+n.multNear+n.multLantern)}function Pu(n,t,e){n.bonus+=e,n.parts[t]+=e}function Vg(n,t){const e=st.lanternMultStep*n.streak;e>=n.multLantern?n.multLantern=e:n.multLantern+=(e-n.multLantern)*(1-Math.exp(-.016666666666666666/st.lanternMultTau)),Cu(n)}function kp(n){n.streak=0}const pa=[1140,1225,1310,1395,1480],Gg=[0,st.flareHeight,-5.5];function Wg(n,t){const e=t+pa[0];if(n.gusts.some(r=>r.z===e))return;let i=Math.floor(Hi(n)*3)-1,s=0;pa.forEach((r,o)=>{const a=Hi(n),c=Hi(n);o>0&&(i=Math.max(-1,Math.min(1,i+(a<.35?-1:a<.7?1:0))));let l=o===0?0:Gg[c<.6?0:c<.8?1:2];n.alt&&l===0&&s<-2&&(l=st.flareHeight),s=l,n.gusts.push({id:n.nextId++,index:o,lane:i,v:l,z:t+r,len:st.gustLen,taken:!1,missed:!1})})}function Xg(n){return n.thermalV+n.windLift}function qg(n,t,e,i){if(!i){n.tailwind=0,n.windLift=0,n.liftT=0;return}n.tailwind*=Math.exp(-t/(e?st.surgeTauNearRow:st.tailwindTau)),e&&(n.liftT=0),n.liftT=Math.max(0,n.liftT-t);const s=n.liftT>0?2.2:e?2.5:1.2;n.windLift+=((n.liftT>0?st.gustLift:0)-n.windLift)*(1-Math.exp(-t*s))}function Kg(n){for(const t of n.gusts){if(t.taken||t.missed)continue;if(n.z<t.z)break;if(n.z>t.z+t.len){t.missed=!0,n.gustChain=0,n.events.push({type:"gust-miss"});continue}if(Math.abs(n.x-mn(t.lane))>st.gustRadiusX||Math.abs(n.moveV-t.v)>st.gustRadiusV)continue;t.taken=!0,t.index===0&&(n.gustChain=0),n.gustChain++,n.gustsTaken++,n.tailwind=Math.min(st.tailwindMax,n.tailwind+st.tailwindPerGust),n.liftT=st.gustLiftTime;const e=t.index===pa.length-1&&n.gustChain===pa.length;Pu(n,"gust",(st.gustScore+(e?st.gustChainScore:0))*n.mult),n.events.push({type:"gust",chain:n.gustChain,full:e})}}function Yg(n,t){n.gusts.length&&n.gusts[0].z+n.gusts[0].len<t&&(n.gusts=n.gusts.filter(e=>e.z+e.len>=t))}const Vh=700;function Bp(n,t){const e=Math.max(0,t);return Cp(e,n.diff)*st.cellSeconds*cg(Zr(e,n.diff))}function Gh(n,t,e){const i=Zr(Math.max(0,e),n.diff),s=og(i),r=t.filter(f=>f.tier<=s&&!n.lastBag.includes(f.id)),o=r.length?r:t.filter(f=>f.tier<=s),a=ag(i),c=o.map(f=>(f.tier===s?1.4:1)/(1+a*f.tier));let l=Hi(n)*c.reduce((f,h)=>f+h,0),u=o[0];for(let f=0;f<o.length;f++)if(l-=c[f],l<=0){u=o[f];break}return n.lastBag.push(u.id),n.lastBag.length>4&&n.lastBag.shift(),u}const Wh={o:0,u:st.flareHeight,d:-5.5},$g={B:"pillar",L:"spike",H:"bridge"};function nc(n,t,e,i){const s=bl(t.cells),r=Bp(n,e);let o=!1;const a=Math.floor((e+s.length*r)/Vh),c=a>Math.floor(e/Vh)&&e>300&&ug(Zr(e,n.diff),a);return s.forEach((l,u)=>{const f=e+(u+.5)*r,h=n.rowId++,d=zi(f),m=[];if(l==="HHH"||l==="LLL")m.push({kind:l==="HHH"?"bridge":"ridge",lane:0});else for(let p=-1;p<=1;p++){const M=$g[l[p+1]];M&&m.push({kind:d&&M==="pillar"?"spike":M,lane:p})}Hg(n,m,s,u,f,i,d);const v=p=>{n.obstacles.push({id:n.nextId++,kind:p.kind,lane:p.lane,z:f,open:i,row:h,passed:!1})};if(l==="HHH"||l==="LLL"){m.forEach(v);return}const g=m.length>0;for(let p=-1;p<=1;p++){const M=l[p+1],y=m.filter(x=>x.lane===p);if(y.forEach(v),!y.length&&M in Wh){const x=s[u-1]==="HHH"||s[u-2]==="HHH",_=n.alt&&M==="o"&&x?st.flareHeight:Wh[M];n.pickups.push({id:n.nextId++,kind:"lantern",lane:p,v:_,z:f,taken:!1})}}if(c&&!o&&g){const p=[-1,0,1].filter(M=>l[M+1]==="."&&br(m,M,Pp));if(p.length){const M=p[Math.floor(Hi(n)*p.length)],y=Hi(n),x=n.alt?y<.45?"thermal":y<.75||n.hp>=st.maxHp?"smoke":"shield":y<.6||n.hp>=st.maxHp?"thermal":"shield";n.pickups.push({id:n.nextId++,kind:x,lane:M,v:0,z:f,taken:!1}),o=!0}}}),n.chunksSpawned++,e+s.length*r}function Zg(n){for(;n.nextChunkZ<n.z+st.spawnAheadMeters;){const e=n.nextChunkZ,i=un(e),s=Bp(n,e),r=cn-30-(Fg+.5)*s;if(i<40)n.nextChunkZ=e+(40-i)+.5;else if(i<r){const o=Gh(n,Dg,e);i+bl(o.cells).length*s>r?n.nextChunkZ=e+(r-i)+.5:n.nextChunkZ=nc(n,o,e,!1)}else if(i<cn){n.nextChunkZ=nc(n,Ug,e,!1),Wg(n,e-i);const o=un(n.nextChunkZ);o>cn&&o<ao&&(n.nextChunkZ+=ao-o+.5)}else if(i<ao)n.nextChunkZ=e+(ao-i)+.5;else{const o=Gh(n,Og,e);i+bl(o.cells).length*s>qe-60?n.nextChunkZ=e+(qe-i)+40:n.nextChunkZ=nc(n,o,e,!0)}}const t=n.z-st.despawnBehind;n.obstacles.length&&n.obstacles[0].z<t&&(n.obstacles=n.obstacles.filter(e=>e.z>=t)),n.pickups.length&&n.pickups[0].z<t&&(n.pickups=n.pickups.filter(e=>e.z>=t)),Yg(n,t)}const zp=1e9;function Jg(n){const t=st.thermalTime-.6;for(let e=.5;e<t;e+=.22){const i=n.z+n.speed*1.08*e,s=new Set(n.obstacles.filter(a=>a.kind==="pillar"&&Math.abs(a.z-i)<12).map(a=>a.lane)),r=[-1,0,1].filter(a=>!s.has(a));if(!r.length)continue;const o=r.includes(n.lane)?n.lane:r[0];n.pickups.push({id:zp+n.trailIds++,kind:"lantern",lane:o,v:st.thermalHeight,z:i,taken:!1})}n.pickups.sort((e,i)=>e.z-i.z)}function Qg(n,t){return n.thermalV>8&&t.id<zp?!1:!n.pickups.some(e=>e!==t&&e.kind==="lantern"&&e.taken&&Math.abs(e.z-t.z)<.5)}function jg(n){for(const t of n.pickups){if(t.taken)continue;const e=t.z-n.z;if(e>3)break;if(e<-3){t.kind==="lantern"&&e>-3-n.speed/60&&Qg(n,t)&&kp(n);continue}Math.abs(n.x-mn(t.lane))<st.lanternPickRadius&&Math.abs(n.v-t.v)<st.lanternPickRadius&&(t.taken=!0,t.kind==="lantern"?(n.lanterns++,n.streak++,n.bestStreak=Math.max(n.bestStreak,n.streak),Pu(n,"lantern",st.lanternScore*n.mult*(n.smokeT>0?st.smokeLanternMul:1)),n.events.push({type:"lantern",streak:n.streak,id:t.id})):(t.kind==="thermal"?(n.thermalT=st.thermalTime,n.low=!1,Jg(n)):t.kind==="smoke"?(n.smokeT=st.smokeTime,n.smokes++):n.hp=Math.min(st.maxHp,n.hp+1),n.events.push({type:"booster",kind:t.kind})))}}function Hp(n,t){const e=Math.sign(t-n.lane);n.lane=t,n.laneT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert=n.vert,n.events.push({type:"lane",dir:e})}function tv(n,t){n.steerX=Math.max(-7,Math.min(st.steerMax,t));const e=Vp(n.lane,n.steerX);e!==n.lane&&Hp(n,e)}function Vp(n,t){return Math.abs(t-mn(n))<=st.laneGap*.57?n:Math.max(-1,Math.min(1,Math.round(-t/st.laneGap)))}function Gp(n,t,e,i,s,r){const o=n-e,a=t+i*o,c=Math.exp(-i*s);return r.x=e+(o+a*s)*c,r.vel=(t-i*a*s)*c,r}function Wp(){return st.vertIn+st.vertHold+st.vertOut}const ic={x:0,vel:0};function ev(n,t){n.vert!=="cruise"&&(!n.alt&&n.holdDive&&n.vertT>st.vertIn&&n.vertT<st.vertIn+st.vertHold&&(n.vertT=st.vertIn+.01),n.vertT+=t,n.vertT>=(n.alt&&n.vert==="dive"?st.lowTransition:Wp())&&(n.vert="cruise",n.vertT=0));const e=n.vert!=="cruise"&&n.vertT<st.vertIn+st.vertHold,i=n.low?-5.5:0,s=e?n.vert==="flare"?st.flareHeight:-5.5:i;Gp(n.moveV,n.moveVel,s,e||n.low?st.vertOmegaIn:st.vertOmegaOut,t,ic),n.moveV=ic.x,n.moveVel=ic.vel}const sc={x:0,vel:0};function Xh(n,t=!1,e=sg){return{mode:"ready",seed:n,alt:t,diff:e,low:!1,smokeT:0,smokes:0,time:0,z:0,speed:24,surge:0,lane:0,laneT:1,x:0,xVel:0,steerX:0,vert:"cruise",vertT:0,holdDive:!1,v:0,thermalT:0,thermalV:0,moveV:0,moveVel:0,tailwind:0,windLift:0,liftT:0,gustChain:0,gustsTaken:0,gusts:[],hp:st.maxHp,stunT:0,hurtRow:-1,trailIds:0,hitstopT:0,crashT:0,dodgeTime:-9,dodgeX:0,dodgeV:0,dodgeVert:"cruise",combo:0,comboT:0,mult:1,multNear:0,multLantern:0,lanterns:0,streak:0,bestStreak:0,parts:{lantern:0,nearMiss:0,gust:0},bonus:0,score:0,buffered:null,bufferT:0,obstacles:[],pickups:[],nextChunkZ:0,nextId:1,rowId:1,chunksSpawned:0,sectionIndex:Qr(0)*2+1,lastBag:[],events:[]}}function nv(n){n.mode="run",n.nextChunkZ=Math.max(n.nextChunkZ,n.z+220)}function qh(n,t){if(t==="left"||t==="right"){const i=t==="left"?-1:1;if(n.laneT<st.laneTime*.6)return!1;const s=Math.max(-1,Math.min(1,n.lane+i));return n.steerX=mn(s),s!==n.lane&&Hp(n,s),!0}const e=t==="up"?"flare":"dive";return n.alt&&e==="dive"&&n.low?!0:n.vert===e&&n.vertT<Wp()-st.vertOut?!1:(n.alt&&(n.low=e==="dive"),n.vert=e,n.vertT=0,n.dodgeTime=n.time,n.dodgeX=n.x,n.dodgeV=n.thermalV+n.moveV,n.dodgeVert="cruise",n.events.push({type:"vert",kind:e}),!0)}function iv(n,t){if(t.row!==n.hurtRow){if(n.hp-=hg(t,n.steerX,n.low?"dive":n.vert)?1:n.hp,n.hp>0){n.hurtRow=t.row,n.stunT=st.stunTime,n.hitstopT=st.hitstop,n.surge=st.surgeMin,n.combo=0,n.multNear=0,kp(n),Cu(n),n.events.push({type:"hurt",hp:n.hp,kind:t.kind});return}n.hp=0,n.mode="crash",n.crashT=0,n.hitstopT=st.hitstop*2,n.events.push({type:"crash",kind:t.kind})}}function sv(n,t,e,i,s=null){if(n.events.length=0,n.time+=i,n.mode==="over")return;if(n.mode==="crash"){n.crashT+=i,n.z+=n.speed*i*Math.max(0,1-n.crashT*1.5),n.crashT>=st.crashSeconds&&(n.mode="over");return}if(n.hitstopT>0){n.hitstopT-=i;return}const r=n.mode==="run";r&&s!==null&&tv(n,s);for(const d of r?t:[])qh(n,d)||(n.buffered=d,n.bufferT=st.bufferTime);n.buffered&&(n.bufferT-=i,(qh(n,n.buffered)||n.bufferT<=0)&&(n.buffered=null)),n.holdDive=e&&n.vert==="dive";const o=n.vert==="dive"?st.diveSpeedMul:n.vert==="flare"?st.flareSpeedMul:1,a=Math.sin(Math.atan(gi(n.z))),c=n.obstacles.some(d=>!d.passed&&d.z>n.z&&d.z<n.z+n.speed*2.5),l=n.surge>0&&c?st.surgeTauNearRow:st.surgeTau;n.surge+=(-9.8*a-n.surge/l)*i,n.surge=r?Math.max(st.surgeMin,Math.min(st.surgeMax,n.surge)):0,qg(n,i,c,r);const u=r?Cp(n.z,n.diff)*o+n.surge+n.tailwind:24;n.speed+=(u-n.speed)*(1-Math.exp(-i*3)),n.z+=n.speed*i,r&&Zg(n);const f=Qr(n.z)*2+(kn(n.z)>.5?1:0);f!==n.sectionIndex&&(n.sectionIndex=f,n.events.push({type:"section",open:f%2===1,index:f})),n.laneT=Math.min(1,n.laneT+i/st.laneTime),Gp(n.x,n.xVel,n.steerX,st.laneOmega,i,sc),n.x=sc.x,n.xVel=sc.vel,ev(n,i),n.thermalT>0&&n.thermalT<=i&&n.obstacles.some(d=>(d.kind==="bridge"||d.kind==="ridge")&&d.z>n.z&&d.z<n.z+n.speed*2.2)&&(n.thermalT=i*2),n.thermalT=Math.max(0,n.thermalT-i);const h=n.thermalT>0?st.thermalHeight:0;if(n.thermalV+=(h-n.thermalV)*(1-Math.exp(-i*(n.thermalT>0?2.5:1.8))),n.v=n.thermalV+n.windLift+n.moveV,n.stunT=Math.max(0,n.stunT-i),r&&(n.smokeT=Math.max(0,n.smokeT-i)),r){for(const d of n.obstacles)if(!(d.passed||d.z-n.z>6)){if(ua(d,n.x,n.v,d.z-n.z)){if(d.passed=!0,iv(n,d),n.mode==="crash")return;continue}fg(d,n.z)&&(d.passed=!0,n.time-n.dodgeTime<=st.nearMissWindow+.1&&ua(d,n.dodgeX,n.alt?n.dodgeV:n.thermalV,0)&&(n.combo++,n.comboT=0,n.multNear=st.multStep*n.combo,Cu(n),Pu(n,"nearMiss",25*n.mult),n.events.push({type:"near-miss",combo:n.combo,kind:d.kind})))}jg(n),Kg(n),n.comboT+=i,n.comboT>st.comboBreak&&n.combo>0&&(n.combo=0,n.multNear=0),Vg(n),n.score+=n.speed*i*n.mult}}function Oa(n){return Math.floor(n.score+n.bonus)}const rv=["wind-loop","lane-whoosh","dive-whoosh","flare-whoosh","near-miss","lantern-chime","thermal-boost","shield-pickup","shield-hit","crash","run-start","reveal-stinger","game-over","smoke-hiss"],Xp=["cat-canh","suot-dep","qua-dinh","den-troi-chuoi","luong-nhiet","du-du-phong","du-cuu","khe-da","thung-lung","chang-vang","dem-hoi","ha-canh","ky-luc"],Kh={"wind-loop":.6},rc=new URLSearchParams(location.search).get("voice"),ov=rc&&/^[a-z_]+$/.test(rc)?`audio-opts/voice/${rc}`:"audio/voice",av=n=>Xp.includes(n)?`${ov}/${n}.mp3`:`audio/${n}.mp3`,qp=new Map;for(const n of[...rv,...Xp])qp.set(n,fetch(av(n)).then(t=>t.ok?t.arrayBuffer():null).catch(()=>null));function cv(n){const t=new Map;for(const[e,i]of qp)i.then(async s=>{if(!s)return;const r=await n.decodeAudioData(s.slice(0)).catch(()=>null);r&&t.set(e,Kh[e]?Kp(n,r,Kh[e]):r)});return{get:e=>t.get(e),play(e,i,s={}){const r=t.get(e);if(!r)return null;const o=n.createBufferSource();o.buffer=r,o.loop=s.loop??!1,o.playbackRate.value=s.rate??1;const a=n.createGain();a.gain.value=s.vol??1;let c=o.connect(a);if(s.pan){const l=n.createStereoPanner();l.pan.value=s.pan,c=c.connect(l)}return c.connect(i),o.start(),o}}}function Kp(n,t,e){const i=Math.floor(e*t.sampleRate),s=t.length-i;if(s<=i)return t;const r=n.createBuffer(t.numberOfChannels,s,t.sampleRate);for(let o=0;o<t.numberOfChannels;o++){const a=t.getChannelData(o),c=r.getChannelData(o);c.set(a.subarray(0,s));for(let l=0;l<i;l++){const u=l/i;c[l]=a[l]*Math.sqrt(u)+a[s+l]*Math.sqrt(1-u)}}return r}const ma=[{id:"music-flight",label:"Tây Bắc",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music-flight.mp3",lufs:-13.1},{id:"vinahouse-1",label:"Vinahouse khèn",style:"Vinahouse · khèn Mông · 136 bpm",file:"audio/music/vinahouse-1.mp3",lufs:-15.2},{id:"vinahouse-2",label:"Vinahouse sáo",style:"Vinahouse · sáo Mông · 138 bpm",file:"audio/music/vinahouse-2.mp3",lufs:-13.7},{id:"taybac-2",label:"Tây Bắc chiều",style:"Pop/EDM · khèn, sáo · 118 bpm",file:"audio/music/taybac-2.mp3",lufs:-14.5},{id:"kpop-trap-1",label:"K-pop đêm",style:"K-pop trap · 808, khèn · 170 bpm",file:"audio/music/kpop-trap-1.mp3",lufs:-13.7},{id:"kpop-vocal-1",label:"Sky High",style:"K-pop dance-pop · có hát · 128 bpm",file:"audio/music/kpop-vocal-1.mp3",lufs:-13.8},{id:"kpop-dance-1",label:"Dance in the Air",style:"K-pop dance · có hát, khèn · 120 bpm",file:"audio/music/kpop-dance-1.mp3",lufs:-14.8},{id:"kpop-dance-2",label:"Dance in the Air (bản 2)",style:"K-pop dance · có hát, sáo · 120 bpm",file:"audio/music/kpop-dance-2.mp3",lufs:-13.6},{id:"edm-vocal-1",label:"Bay như cánh chim",style:"EDM pop · hát tiếng Việt, khèn, sáo · 128 bpm",file:"audio/music/edm-vocal-1.mp3",lufs:-14.2},{id:"taybac-3",label:"Tây Bắc lên đèo",style:"Pop/EDM · khèn, sáo, đàn môi · 112 bpm",file:"audio/music/taybac-3.mp3",lufs:-13.9}],oc=n=>ma.find(t=>t.id===n),Yp="skyrun.settings",$p="skyrun.sound";function Zp(){try{const n=JSON.parse(localStorage.getItem($p)??"{}");if(n.v===2)return{sfx:n.sfx!==!1,music:n.music!==!1};const t=n.muted===!0;return{sfx:!t,music:!t&&n.music!==!1}}catch{return{sfx:!0,music:!0}}}function lv(n){try{localStorage.setItem($p,JSON.stringify({v:2,...n}))}catch{}}const uv=["on","dim","off"];function Ur(){try{const n=JSON.parse(localStorage.getItem(Yp)??"{}");return{music:typeof n.music=="string"?n.music:"shuffle",ghosts:uv.includes(n.ghosts)?n.ghosts:"on"}}catch{return{music:"shuffle",ghosts:"on"}}}function Jp(n){try{localStorage.setItem(Yp,JSON.stringify({...Ur(),...n}))}catch{}}const tr=3,hv=-13.1,fv=20,ac=n=>{const t=ma.filter(e=>e.id!==n);return t[Math.floor(Math.random()*t.length)]??ma[0]};function dv(n,t){const e=new Map;let i=!1;Rp.then(()=>i=!0);let s=!1,r=Ur().music,o=ac(null),a=null;const c=d=>{let m=e.get(d.id);return m||e.set(d.id,m={bytes:ng(d.file),buf:null,decoding:!1}),m},l=(...d)=>{for(const m of e.keys())d.includes(m)||e.delete(m)},u=(d,m)=>{const v=c(d);return v.buf?!0:(m&&!v.decoding&&(v.decoding=!0,v.bytes.then(async g=>{const p=g&&await n.decodeAudioData(g).catch(()=>null);p&&e.get(d.id)===v&&(v.buf=Kp(n,p,tr))})),!1)},f=d=>Math.min(1.6,10**((hv-d.lufs)/20)),h=(d,m)=>{const v=n.currentTime,g=n.createBufferSource();g.buffer=e.get(d.id).buf,g.loop=!0;const p=n.createGain();if(p.gain.setValueAtTime(0,v),p.gain.linearRampToValueAtTime(f(d),v+m),g.connect(p).connect(t),g.start(v,tr),a){const M=a.gain.gain;M.cancelScheduledValues(v),M.setValueAtTime(M.value,v),M.linearRampToValueAtTime(0,v+m),a.src.stop(v+m+.05)}a={t:d,src:g,gain:p,at:v-tr},o=r==="shuffle"?ac(d.id):d,l(d.id,o.id),c(o)};return{tick(d,m){if(!d)return;const v=r==="shuffle"?null:oc(r)??null;if(!a||v&&v.id!==a.t.id){const M=v??o;(a||i||s)&&u(M,!0)&&h(M,1);return}if(v||o.id===a.t.id)return;const g=a.src.buffer.duration,p=g-(n.currentTime-a.at)%g;u(o,m||p<fv)&&p<tr&&h(o,tr)},choice:()=>r,setChoice(d){r=d==="shuffle"||oc(d)?d:"shuffle",Jp({music:r}),s=!0,!(r!=="shuffle"||!a)&&(o=ac(a.t.id),l(a.t.id,o.id),c(o))},playing:()=>a?.t??null,loading:()=>{const d=r==="shuffle"?a?null:o:oc(r)??null;return d&&d.id!==a?.t.id&&!e.get(d.id)?.buf?d:null},held:()=>[...e].map(([d,m])=>m.buf?`${d}:pcm`:d)}}const pv=1300,jr=qe*3,ga=pv-is+jr,Qp={"khau-pha":"Khau Phạ","ha-giang":"Hà Giang"};function jp(n){return n<ga?1:2+Math.floor((n-ga)/jr)}function wl(n){return n<=1?0:ga+(n-2)*jr}const ka={value:0};let tm="khau-pha";function mv(n){tm=n,ka.value=n==="ha-giang"?1:0}const va=()=>tm,Ba=()=>ka.value;function gv(n){return n==="ha-giang"?"ha-giang":"khau-pha"}const em="uniform float uRegionHg;";function nm(n,t=!1){return{dusk:(t?.34:.62)*(1-se(0,.08,n))+.5*se(.52,.66,n)+.5*se(.68,.78,n)-.38*se(.95,1,n),morn:se(.03,.14,n)*(1-se(.3,.45,n))}}function vv(n){const t=jp(n),e=wl(t),i=Math.min(1,Math.max(0,(n-e)/(t===1?ga:jr)));return{day:t,region:va(),u:i,...nm(i,t===1)}}function xv(n){return n.u>=.95?"Rạng sáng":n.u>=.74?"Đêm đèn trời":n.u>=.56?"Hoàng hôn":n.u<.1?"Bình minh":n.u<.4?"Buổi sáng":"Chiều vàng"}function im(n){const t=n.u<.5?0:n.dusk>=.98?2:n.dusk>=.48?1:0;return(n.day-1)*3+t}function _v(n){let t=null;const e=s=>{t=s===null?null:{day:1,region:va(),u:s,...nm(s,!0)}},i=s=>{t=s===null?null:{day:1,region:va(),u:.52+.26*s,dusk:s,morn:0}};return n.has("dusk")&&i(Number(n.get("dusk"))),n.has("clock")&&e(Number(n.get("clock"))),{at:s=>t??vv(s),forceU:e,forceDusk:i}}const Yh=[0,2,4,7,9],co=.32,$h=.85,Mv=.6;function yv(){let n=null,t=null,e=null,i=null,s=null,r=null,o=null,a=null,c=null,l=null;const u=Zp();let f=u.sfx,h=u.music;const d=()=>lv({sfx:f,music:h});let m=0,v=0,g=null,p=0;const M=()=>{if(n){n.state==="suspended"&&n.resume();return}n=new AudioContext,t=cv(n);const S=n.createDynamicsCompressor();S.threshold.value=-10,S.ratio.value=4,S.connect(n.destination),e=n.createGain(),e.gain.value=.9,e.connect(S);const T=b=>{const w=n.createGain();return w.gain.value=b,w.connect(e),w};i=T(f?1:0),s=T(f?$h:0),r=T(h?co:0),l=dv(n,r),a=n.createBiquadFilter(),a.type="lowpass",o=n.createGain(),o.gain.value=0,a.connect(o).connect(i)};M();for(const S of["keydown","pointerdown","touchstart","touchend","click"])window.addEventListener(S,M);const y=(S,T)=>{t&&i&&t.play(S,i,T)},x=(S,T)=>{if(!n||!t||!s||!r||!f)return;const b=n.currentTime;if(b<m&&T<=v)return;const w=t.get(S);w&&(g?.stop(),g=t.play(S,s),m=b+w.duration,v=T,h&&(r.gain.setTargetAtTime(co*Mv,b,.05),r.gain.setTargetAtTime(co,b+w.duration,.3)))},_=S=>1+(Math.random()*2-1)*S;return{update(S,T,b){if(!n||!t||!o||!a)return;!c&&t.get("wind-loop")&&(c=t.play("wind-loop",a,{loop:!0})),l?.tick(h,!T);const w=n.currentTime;c&&c.playbackRate.setTargetAtTime(.85+.35*S,w,.2),a.frequency.setTargetAtTime(900+6e3*S,w,.15),o.gain.setTargetAtTime(T?.35+1.1*S*S:.2,w,.25);const R=im(b);T&&R>p&&R%3&&x(R%3===1?"chang-vang":"dem-hoi",1),p=T?Math.max(p,R):0},events(S,T){for(const b of S)if(b.type==="lantern"){const w=Yh[(b.streak-1)%Yh.length];y("lantern-chime",{vol:.55,rate:Math.pow(2,w/12)}),b.streak===10&&x("den-troi-chuoi",1)}else if(b.type==="near-miss")y("near-miss",{vol:.8,rate:_(.08)*(1+.02*Math.min(10,b.combo))}),b.combo===3?x("suot-dep",1):b.combo===6&&x("qua-dinh",1);else if(b.type==="lane")y("lane-whoosh",{vol:.25,rate:_(.1),pan:.5*b.dir});else if(b.type==="vert")y(b.kind==="dive"?"dive-whoosh":"flare-whoosh",{vol:.4,rate:_(.05)});else if(b.type==="gust")y("flare-whoosh",{vol:.65,rate:Math.pow(2,Math.min(8,2*(b.chain-1))/12)}),b.full&&y("thermal-boost",{vol:.7});else if(b.type==="booster"){const[w,R,C]=b.kind==="thermal"?["thermal-boost",.8,"luong-nhiet"]:b.kind==="smoke"?["smoke-hiss",.75,null]:["shield-pickup",1.4,"du-du-phong"];y(w,{vol:R}),C&&x(C,2)}else b.type==="hurt"?y("shield-hit",{vol:1.2,rate:_(.05)}):b.type==="crash"?y("crash",{vol:1.3}):b.type==="section"&&T&&!b.open&&x("khe-da",1)},reveal(){y("reveal-stinger",{vol:.6}),x("thung-lung",1)},runStart(){M(),y("run-start",{vol:.8}),x("cat-canh",2)},over(S){y("game-over",{vol:.5}),x(S?"ky-luc":"ha-canh",3)},toggleSfx(){return M(),f=!f,i&&s&&n&&(i.gain.setTargetAtTime(f?1:0,n.currentTime,.05),s.gain.setTargetAtTime(f?$h:0,n.currentTime,.05)),d(),f},toggleMusic(){return M(),h=!h,r&&n&&(r.gain.cancelScheduledValues(n.currentTime),r.gain.setTargetAtTime(h?co:0,n.currentTime,.3)),d(),h},prefs:()=>({sfx:f,music:h}),music:()=>l}}const Lu="186",Sv=0,Zh=1,bv=2,Jo=1,wv=2,_r=3,_i=0,Ye=1,be=2,Jn=0,Tr=1,gn=2,Jh=3,Qh=4,Tv=5,Ls=100,Ev=101,Av=102,Rv=103,Cv=104,Pv=200,Lv=201,Nv=202,Iv=203,sm=204,rm=205,Dv=206,Uv=207,Fv=208,Ov=209,kv=210,Bv=211,zv=212,Hv=213,Vv=214,Tl=0,El=1,Al=2,Fr=3,Rl=4,Cl=5,Pl=6,Ll=7,Nu=0,Gv=1,Wv=2,Qn=0,Iu=1,Du=2,Uu=3,za=4,Fu=5,Ou=6,ku=7,jh="attached",Xv="detached",om=300,ss=301,zs=302,cc=303,lc=304,Ha=306,Hs=1e3,Yn=1001,xa=1002,Oe=1003,am=1004,Mr=1005,ke=1006,Qo=1007,di=1008,pn=1009,cm=1010,lm=1011,Or=1012,Bu=1013,jn=1014,bn=1015,ln=1016,zu=1017,Hu=1018,kr=1020,um=35902,hm=35899,fm=1021,dm=1022,wn=1023,Mi=1026,es=1027,Vu=1028,Gu=1029,rs=1030,Wu=1031,Xu=1033,jo=33776,ta=33777,ea=33778,na=33779,Nl=35840,Il=35841,Dl=35842,Ul=35843,Fl=36196,Ol=37492,kl=37496,Bl=37488,zl=37489,_a=37490,Hl=37491,Vl=37808,Gl=37809,Wl=37810,Xl=37811,ql=37812,Kl=37813,Yl=37814,$l=37815,Zl=37816,Jl=37817,Ql=37818,jl=37819,tu=37820,eu=37821,nu=36492,iu=36494,su=36495,ru=36283,ou=36284,Ma=36285,au=36286,Br=2300,zr=2301,uc=2302,tf=2303,ef=2400,nf=2401,sf=2402,qv=2500,Kv=0,pm=1,cu=2,Yv=3200,ya=0,$v=1,Bi="",Fe="srgb",vn="srgb-linear",Sa="linear",ue="srgb",hc=7680,Zv=519,Jv=512,Qv=513,jv=514,qu=515,tx=516,ex=517,Ku=518,nx=519,mm=35044,rf="300 es",$n=2e3,Hr=2001;function ix(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function sx(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Vr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function rx(){const n=Vr("canvas");return n.style.display="block",n}const of={};function ba(...n){const t="THREE."+n.shift();console.log(t,...n)}function gm(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ct(...n){n=gm(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Bt(...n){n=gm(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Us(...n){const t=n.join(" ");t in of||(of[t]=!0,Ct(...n))}function ox(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const ax={[Tl]:El,[Al]:Pl,[Rl]:Ll,[Fr]:Cl,[El]:Tl,[Pl]:Al,[Ll]:Rl,[Cl]:Fr};class as{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let af=1234567;const Er=Math.PI/180,Vs=180/Math.PI;function Tn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function Zt(n,t,e){return Math.max(t,Math.min(e,n))}function Yu(n,t){return(n%t+t)%t}function cx(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function lx(n,t,e){return n!==t?(e-n)/(t-n):0}function Ar(n,t,e){return(1-e)*n+e*t}function ux(n,t,e,i){return Ar(n,t,1-Math.exp(-e*i))}function hx(n,t=1){return t-Math.abs(Yu(n,t*2)-t)}function fx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function dx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function px(n,t){return n+Math.floor(Math.random()*(t-n+1))}function mx(n,t){return n+Math.random()*(t-n)}function gx(n){return n*(.5-Math.random())}function vx(n){n!==void 0&&(af=n);let t=af+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xx(n){return n*Er}function _x(n){return n*Vs}function Mx(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function yx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Sx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function bx(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),h=o((t-i)/2),d=r((i-t)/2),m=o((i-t)/2);switch(s){case"XYX":n.set(a*u,c*f,c*h,a*l);break;case"YZY":n.set(c*h,a*u,c*f,a*l);break;case"ZXZ":n.set(c*f,c*h,a*u,a*l);break;case"XZX":n.set(a*u,c*m,c*d,a*l);break;case"YXY":n.set(c*d,a*u,c*m,a*l);break;case"ZYZ":n.set(c*m,c*d,a*u,a*l);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function de(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const wx={DEG2RAD:Er,RAD2DEG:Vs,generateUUID:Tn,clamp:Zt,euclideanModulo:Yu,mapLinear:cx,inverseLerp:lx,lerp:Ar,damp:ux,pingpong:hx,smoothstep:fx,smootherstep:dx,randInt:px,randFloat:mx,randFloatSpread:gx,seededRandom:vx,degToRad:xx,radToDeg:_x,isPowerOfTwo:Mx,ceilPowerOfTwo:yx,floorPowerOfTwo:Sx,setQuaternionFromProperEuler:bx,normalize:de,denormalize:Dn};class rt{static{rt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ae{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],d=r[o+1],m=r[o+2],v=r[o+3];if(f!==v||c!==h||l!==d||u!==m){let g=c*h+l*d+u*m+f*v;g<0&&(h=-h,d=-d,m=-m,v=-v,g=-g);let p=1-a;if(g<.9995){const M=Math.acos(g),y=Math.sin(M);p=Math.sin(p*M)/y,a=Math.sin(a*M)/y,c=c*p+h*a,l=l*p+d*a,u=u*p+m*a,f=f*p+v*a}else{c=c*p+h*a,l=l*p+d*a,u=u*p+m*a,f=f*p+v*a;const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+u*f+c*d-l*h,t[e+1]=c*m+u*h+l*f-a*d,t[e+2]=l*m+u*d+a*h-c*f,t[e+3]=u*m-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),h=c(i/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"YXZ":this._x=h*u*f+l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"ZXY":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f-h*d*m;break;case"ZYX":this._x=h*u*f-l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f+h*d*m;break;case"YZX":this._x=h*u*f+l*d*m,this._y=l*d*f+h*u*m,this._z=l*u*m-h*d*f,this._w=l*u*f-h*d*m;break;case"XZY":this._x=h*u*f-l*d*m,this._y=l*d*f-h*u*m,this._z=l*u*m+h*d*f,this._w=l*u*f+h*d*m;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{static{P.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return fc.copy(this).projectOnVector(t),this.sub(fc)}reflect(t){return this.sub(fc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fc=new P,cf=new Ae;class Gt{static{Gt.prototype.isMatrix3=!0}constructor(t,e,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],d=i[5],m=i[8],v=s[0],g=s[3],p=s[6],M=s[1],y=s[4],x=s[7],_=s[2],S=s[5],T=s[8];return r[0]=o*v+a*M+c*_,r[3]=o*g+a*y+c*S,r[6]=o*p+a*x+c*T,r[1]=l*v+u*M+f*_,r[4]=l*g+u*y+f*S,r[7]=l*p+u*x+f*T,r[2]=h*v+d*M+m*_,r[5]=h*g+d*y+m*S,r[8]=h*p+d*x+m*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*r,d=l*r-o*c,m=e*f+i*h+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=f*v,t[1]=(s*l-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=h*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Us("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dc.makeScale(t,e)),this}rotate(t){return Us("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dc.makeRotation(-t)),this}translate(t,e){return Us("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const dc=new Gt,lf=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uf=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Tx(){const n={enabled:!0,workingColorSpace:vn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?Sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Us("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Us("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vn]:{primaries:t,whitePoint:i,transfer:Sa,toXYZ:lf,fromXYZ:uf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:i,transfer:ue,toXYZ:lf,fromXYZ:uf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),n}const te=Tx();function vi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hs;class Ex{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hs===void 0&&(hs=Vr("canvas")),hs.width=t.width,hs.height=t.height;const s=hs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=hs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Vr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vi(e[i]/255)*255):e[i]=vi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ax=0;class $u{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ax++}),this.uuid=Tn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(pc(s[o].image)):r.push(pc(s[o]))}else r=pc(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function pc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ex.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}let Rx=0;const mc=new P;class ze extends as{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,i=Yn,s=Yn,r=ke,o=di,a=wn,c=pn,l=ze.DEFAULT_ANISOTROPY,u=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=Tn(),this.name="",this.source=new $u(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==om)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hs:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hs:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=om;ze.DEFAULT_ANISOTROPY=1;class he{static{he.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],m=c[9],v=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,x=(d+1)/2,_=(p+1)/2,S=(u+h)/4,T=(f+v)/4,b=(m+g)/4;return y>x&&y>_?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=S/i,r=T/i):x>_?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=S/s,r=b/s):_<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(_),i=T/r,s=b/r),this.set(i,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(f-v)/M,this.z=(h-u)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cx extends as{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new ze(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new $u(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class on extends Cx{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vm extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Px extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Dt{static{Dt.prototype.isMatrix4=!0}constructor(t,e,i,s,r,o,a,c,l,u,f,h,d,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,u,f,h,d,m,v,g)}set(t,e,i,s,r,o,a,c,l,u,f,h,d,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/fs.setFromMatrixColumn(t,0).length(),r=1/fs.setFromMatrixColumn(t,1).length(),o=1/fs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,m=a*u,v=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+m*l,e[5]=h-v*l,e[9]=-a*c,e[2]=v-h*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,m=l*u,v=l*f;e[0]=h+v*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-m,e[6]=v+h*a,e[10]=o*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,m=l*u,v=l*f;e[0]=h-v*a,e[4]=-o*f,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const h=o*u,d=o*f,m=a*u,v=a*f;e[0]=c*u,e[4]=m*l-d,e[8]=h*l+v,e[1]=c*f,e[5]=v*l+h,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const h=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*u,e[4]=v-h*f,e[8]=m*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+m,e[10]=h-v*f}else if(t.order==="XZY"){const h=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+v,e[5]=o*u,e[9]=d*f-m,e[2]=m*f-d,e[6]=a*u,e[10]=v*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lx,t,Nx)}lookAt(t,e,i){const s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ai.crossVectors(i,hn),Ai.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ai.crossVectors(i,hn)),Ai.normalize(),lo.crossVectors(hn,Ai),s[0]=Ai.x,s[4]=lo.x,s[8]=hn.x,s[1]=Ai.y,s[5]=lo.y,s[9]=hn.y,s[2]=Ai.z,s[6]=lo.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],d=i[13],m=i[2],v=i[6],g=i[10],p=i[14],M=i[3],y=i[7],x=i[11],_=i[15],S=s[0],T=s[4],b=s[8],w=s[12],R=s[1],C=s[5],N=s[9],D=s[13],I=s[2],U=s[6],z=s[10],H=s[14],Q=s[3],W=s[7],Y=s[11],tt=s[15];return r[0]=o*S+a*R+c*I+l*Q,r[4]=o*T+a*C+c*U+l*W,r[8]=o*b+a*N+c*z+l*Y,r[12]=o*w+a*D+c*H+l*tt,r[1]=u*S+f*R+h*I+d*Q,r[5]=u*T+f*C+h*U+d*W,r[9]=u*b+f*N+h*z+d*Y,r[13]=u*w+f*D+h*H+d*tt,r[2]=m*S+v*R+g*I+p*Q,r[6]=m*T+v*C+g*U+p*W,r[10]=m*b+v*N+g*z+p*Y,r[14]=m*w+v*D+g*H+p*tt,r[3]=M*S+y*R+x*I+_*Q,r[7]=M*T+y*C+x*U+_*W,r[11]=M*b+y*N+x*z+_*Y,r[15]=M*w+y*D+x*H+_*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],m=t[3],v=t[7],g=t[11],p=t[15],M=c*d-l*h,y=a*d-l*f,x=a*h-c*f,_=o*d-l*u,S=o*h-c*u,T=o*f-a*u;return e*(v*M-g*y+p*x)-i*(m*M-g*_+p*S)+s*(m*y-v*_+p*T)-r*(m*x-v*S+g*T)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],m=t[12],v=t[13],g=t[14],p=t[15],M=e*a-i*o,y=e*c-s*o,x=e*l-r*o,_=i*c-s*a,S=i*l-r*a,T=s*l-r*c,b=u*v-f*m,w=u*g-h*m,R=u*p-d*m,C=f*g-h*v,N=f*p-d*v,D=h*p-d*g,I=M*D-y*N+x*C+_*R-S*w+T*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/I;return t[0]=(a*D-c*N+l*C)*U,t[1]=(s*N-i*D-r*C)*U,t[2]=(v*T-g*S+p*_)*U,t[3]=(h*S-f*T-d*_)*U,t[4]=(c*R-o*D-l*w)*U,t[5]=(e*D-s*R+r*w)*U,t[6]=(g*x-m*T-p*y)*U,t[7]=(u*T-h*x+d*y)*U,t[8]=(o*N-a*R+l*b)*U,t[9]=(i*R-e*N-r*b)*U,t[10]=(m*S-v*x+p*M)*U,t[11]=(f*x-u*S-d*M)*U,t[12]=(a*w-o*C-c*b)*U,t[13]=(e*C-i*w+s*b)*U,t[14]=(v*y-m*_-g*M)*U,t[15]=(u*_-f*y+h*M)*U,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,f=a+a,h=r*l,d=r*u,m=r*f,v=o*u,g=o*f,p=a*f,M=c*l,y=c*u,x=c*f,_=i.x,S=i.y,T=i.z;return s[0]=(1-(v+p))*_,s[1]=(d+x)*_,s[2]=(m-y)*_,s[3]=0,s[4]=(d-x)*S,s[5]=(1-(h+p))*S,s[6]=(g+M)*S,s[7]=0,s[8]=(m+y)*T,s[9]=(g-M)*T,s[10]=(1-(h+v))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=fs.set(s[0],s[1],s[2]).length();const a=fs.set(s[4],s[5],s[6]).length(),c=fs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Rn.copy(this);const l=1/o,u=1/a,f=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,e.setFromRotationMatrix(Rn),i.x=o,i.y=a,i.z=c,this}makePerspective(t,e,i,s,r,o,a=$n,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s);let m,v;if(c)m=r/(o-r),v=o*r/(o-r);else if(a===$n)m=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Hr)m=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=$n,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s);let m,v;if(c)m=1/(o-r),v=o/(o-r);else if(a===$n)m=-2/(o-r),v=-(o+r)/(o-r);else if(a===Hr)m=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fs=new P,Rn=new Dt,Lx=new P(0,0,0),Nx=new P(1,1,1),Ai=new P,lo=new P,hn=new P,hf=new Dt,ff=new Ae;class ti{constructor(t=0,e=0,i=0,s=ti.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Zt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return hf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ff.setFromEuler(this),this.setFromQuaternion(ff,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ti.DEFAULT_ORDER="XYZ";class xm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ix=0;const df=new P,ds=new Ae,ii=new Dt,uo=new P,er=new P,Dx=new P,Ux=new Ae,pf=new P(1,0,0),mf=new P(0,1,0),gf=new P(0,0,1),vf={type:"added"},Fx={type:"removed"},ps={type:"childadded",child:null},gc={type:"childremoved",child:null};class we extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new P,e=new ti,i=new Ae,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Dt},normalMatrix:{value:new Gt}}),this.matrix=new Dt,this.matrixWorld=new Dt,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ds.setFromAxisAngle(t,e),this.quaternion.multiply(ds),this}rotateOnWorldAxis(t,e){return ds.setFromAxisAngle(t,e),this.quaternion.premultiply(ds),this}rotateX(t){return this.rotateOnAxis(pf,t)}rotateY(t){return this.rotateOnAxis(mf,t)}rotateZ(t){return this.rotateOnAxis(gf,t)}translateOnAxis(t,e){return df.copy(t).applyQuaternion(this.quaternion),this.position.add(df.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pf,t)}translateY(t){return this.translateOnAxis(mf,t)}translateZ(t){return this.translateOnAxis(gf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?uo.copy(t):uo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(er,uo,this.up):ii.lookAt(uo,er,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(ii),this.quaternion.premultiply(ds.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Bt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vf),ps.child=t,this.dispatchEvent(ps),ps.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fx),gc.child=t,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vf),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,t,Dx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Ux,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),m.length>0&&(i.nodes=m)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}we.DEFAULT_UP=new P(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Be extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ox={type:"move"};class vc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),p=this._getHandJoint(l,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,m=.005;l.inputState.pinching&&h>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ox)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Be;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const _m={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},ho={h:0,s:0,l:0};function xc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=i,te.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=te.workingColorSpace){if(t=Yu(t,1),e=Zt(e,0,1),i=Zt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=xc(o,r,t+1/3),this.g=xc(o,r,t),this.b=xc(o,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=Fe){function i(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const i=_m[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vi(t.r),this.g=vi(t.g),this.b=vi(t.b),this}copyLinearToSRGB(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return te.workingToColorSpace(Qe.copy(this),t),Math.round(Zt(Qe.r*255,0,255))*65536+Math.round(Zt(Qe.g*255,0,255))*256+Math.round(Zt(Qe.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Qe.copy(this),e);const i=Qe.r,s=Qe.g,r=Qe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=Fe){te.workingToColorSpace(Qe.copy(this),t);const e=Qe.r,i=Qe.g,s=Qe.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ri),this.setHSL(Ri.h+t,Ri.s+e,Ri.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ri),t.getHSL(ho);const i=Ar(Ri.h,ho.h,e),s=Ar(Ri.s,ho.s,e),r=Ar(Ri.l,ho.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qe=new ct;ct.NAMES=_m;class Zu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new Zu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kx extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Cn=new P,si=new P,_c=new P,ri=new P,ms=new P,gs=new P,xf=new P,Mc=new P,yc=new P,Sc=new P,bc=new he,wc=new he,Tc=new he;class Un{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Cn.subVectors(t,e),s.cross(Cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Cn.subVectors(s,e),si.subVectors(i,e),_c.subVectors(t,e);const o=Cn.dot(Cn),a=Cn.dot(si),c=Cn.dot(_c),l=si.dot(si),u=si.dot(_c),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,m=(o*u-a*c)*h;return r.set(1-d-m,m,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ri.x),c.addScaledVector(o,ri.y),c.addScaledVector(a,ri.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return bc.setScalar(0),wc.setScalar(0),Tc.setScalar(0),bc.fromBufferAttribute(t,e),wc.fromBufferAttribute(t,i),Tc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(bc,r.x),o.addScaledVector(wc,r.y),o.addScaledVector(Tc,r.z),o}static isFrontFacing(t,e,i,s){return Cn.subVectors(i,e),si.subVectors(t,e),Cn.cross(si).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Cn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Cn.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Un.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ms.subVectors(s,i),gs.subVectors(r,i),Mc.subVectors(t,i);const c=ms.dot(Mc),l=gs.dot(Mc);if(c<=0&&l<=0)return e.copy(i);yc.subVectors(t,s);const u=ms.dot(yc),f=gs.dot(yc);if(u>=0&&f<=u)return e.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(i).addScaledVector(ms,o);Sc.subVectors(t,r);const d=ms.dot(Sc),m=gs.dot(Sc);if(m>=0&&d<=m)return e.copy(r);const v=d*l-c*m;if(v<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(i).addScaledVector(gs,a);const g=u*m-d*f;if(g<=0&&f-u>=0&&d-m>=0)return xf.subVectors(r,s),a=(f-u)/(f-u+(d-m)),e.copy(s).addScaledVector(xf,a);const p=1/(g+v+h);return o=v*p,a=h*p,e.copy(i).addScaledVector(ms,o).addScaledVector(gs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class yi{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Pn):Pn.fromBufferAttribute(r,o),Pn.applyMatrix4(t.matrixWorld),this.expandByPoint(Pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fo.copy(i.boundingBox)),fo.applyMatrix4(t.matrixWorld),this.union(fo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pn),Pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(nr),po.subVectors(this.max,nr),vs.subVectors(t.a,nr),xs.subVectors(t.b,nr),_s.subVectors(t.c,nr),Ci.subVectors(xs,vs),Pi.subVectors(_s,xs),Xi.subVectors(vs,_s);let e=[0,-Ci.z,Ci.y,0,-Pi.z,Pi.y,0,-Xi.z,Xi.y,Ci.z,0,-Ci.x,Pi.z,0,-Pi.x,Xi.z,0,-Xi.x,-Ci.y,Ci.x,0,-Pi.y,Pi.x,0,-Xi.y,Xi.x,0];return!Ec(e,vs,xs,_s,po)||(e=[1,0,0,0,1,0,0,0,1],!Ec(e,vs,xs,_s,po))?!1:(mo.crossVectors(Ci,Pi),e=[mo.x,mo.y,mo.z],Ec(e,vs,xs,_s,po))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const oi=[new P,new P,new P,new P,new P,new P,new P,new P],Pn=new P,fo=new yi,vs=new P,xs=new P,_s=new P,Ci=new P,Pi=new P,Xi=new P,nr=new P,po=new P,mo=new P,qi=new P;function Ec(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){qi.fromArray(n,r);const a=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),c=t.dot(qi),l=e.dot(qi),u=i.dot(qi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const De=new P,go=new rt;let Bx=0;class Nt extends as{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=mm,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)go.fromBufferAttribute(this,e),go.applyMatrix3(t),this.setXY(e,go.x,go.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Mm extends Nt{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ym extends Nt{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class qt extends Nt{constructor(t,e,i){super(new Float32Array(t),e,i)}}const zx=new yi,ir=new P,Ac=new P;class Bn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ir.subVectors(t,this.center);const e=ir.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ir,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ac.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ir.copy(t.center).add(Ac)),this.expandByPoint(ir.copy(t.center).sub(Ac))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Hx=0;const Mn=new Dt,Rc=new we,Ms=new P,fn=new yi,sr=new yi,Ge=new P;class Qt extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ix(t)?ym:Mm)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Gt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mn.makeRotationFromQuaternion(t),this.applyMatrix4(Mn),this}rotateX(t){return Mn.makeRotationX(t),this.applyMatrix4(Mn),this}rotateY(t){return Mn.makeRotationY(t),this.applyMatrix4(Mn),this}rotateZ(t){return Mn.makeRotationZ(t),this.applyMatrix4(Mn),this}translate(t,e,i){return Mn.makeTranslation(t,e,i),this.applyMatrix4(Mn),this}scale(t,e,i){return Mn.makeScale(t,e,i),this.applyMatrix4(Mn),this}lookAt(t){return Rc.lookAt(t),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ge.addVectors(fn.min,sr.min),fn.expandByPoint(Ge),Ge.addVectors(fn.max,sr.max),fn.expandByPoint(Ge)):(fn.expandByPoint(sr.min),fn.expandByPoint(sr.max))}fn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ge));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ge.fromBufferAttribute(a,l),c&&(Ms.fromBufferAttribute(t,l),Ge.add(Ms)),s=Math.max(s,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Nt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let b=0;b<i.count;b++)a[b]=new P,c[b]=new P;const l=new P,u=new P,f=new P,h=new rt,d=new rt,m=new rt,v=new P,g=new P;function p(b,w,R){l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,w),f.fromBufferAttribute(i,R),h.fromBufferAttribute(r,b),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,R),u.sub(l),f.sub(l),d.sub(h),m.sub(h);const C=1/(d.x*m.y-m.x*d.y);isFinite(C)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(C),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(C),a[b].add(v),a[w].add(v),a[R].add(v),c[b].add(g),c[w].add(g),c[R].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let b=0,w=M.length;b<w;++b){const R=M[b],C=R.start,N=R.count;for(let D=C,I=C+N;D<I;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const y=new P,x=new P,_=new P,S=new P;function T(b){_.fromBufferAttribute(s,b),S.copy(_);const w=a[b];y.copy(w),y.sub(_.multiplyScalar(_.dot(w))).normalize(),x.crossVectors(S,w);const C=x.dot(c[b])<0?-1:1;o.setXYZW(b,y.x,y.y,y.z,C)}for(let b=0,w=M.length;b<w;++b){const R=M[b],C=R.start,N=R.count;for(let D=C,I=C+N;D<I;D+=3)T(t.getX(D+0)),T(t.getX(D+1)),T(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Nt(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,u=new P,f=new P;if(t)for(let h=0,d=t.count;h<d;h+=3){const m=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,m=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let p=0;p<u;p++)h[m++]=l[d++]}return new Nt(h,u,f)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=mm,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const nn=new P;class Ju{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)nn.fromBufferAttribute(this,e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)nn.fromBufferAttribute(this,e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Dn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ba("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Nt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ju(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ba("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Cc=new P,Gx=new P,Wx=new Gt;class Oi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Cc.subVectors(i,e).cross(Gx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(Cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Wx.getNormalMatrix(t),s=this.coplanarPoint(Cc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Xx=0;class On extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xx++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Tr,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sm,this.blendDst=rm,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=Fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hc,this.stencilZFail=hc,this.stencilZPass=hc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Oi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new rt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ai=new P,Pc=new P,vo=new P,xo=new P;class Va{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Pc.copy(t).add(e).multiplyScalar(.5),vo.copy(e).sub(t).normalize(),xo.copy(this.origin).sub(Pc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(vo),a=xo.dot(this.direction),c=-xo.dot(vo),l=xo.lengthSq(),u=Math.abs(1-o*o);let f,h,d,m;if(u>0)if(f=o*c-a,h=o*a-c,m=r*u,f>=0)if(h>=-m)if(h<=m){const v=1/u;f*=v,h*=v,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-m?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=m?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Pc).addScaledVector(vo,h),d}intersectSphere(t,e){if(t.radius<0)return null;ai.subVectors(t.center,this.origin);const i=ai.dot(this.direction),s=ai.dot(ai)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,i,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=t.x-o.x,h=t.y-o.y,d=t.z-o.z,m=e.x-o.x,v=e.y-o.y,g=e.z-o.z,p=i.x-o.x,M=i.y-o.y,y=i.z-o.z,x=Math.abs(c),_=Math.abs(l),S=Math.abs(u);let T,b,w,R,C,N,D,I,U,z,H,Q;if(x>=_&&x>=S?(w=c,N=f,U=m,Q=p,c>=0?(T=l,b=u,R=h,C=d,D=v,I=g,z=M,H=y):(T=u,b=l,R=d,C=h,D=g,I=v,z=y,H=M)):_>=S?(w=l,N=h,U=v,Q=M,l>=0?(T=u,b=c,R=d,C=f,D=g,I=m,z=y,H=p):(T=c,b=u,R=f,C=d,D=m,I=g,z=p,H=y)):(w=u,N=d,U=g,Q=y,u>=0?(T=c,b=l,R=f,C=h,D=m,I=v,z=p,H=M):(T=l,b=c,R=h,C=f,D=v,I=m,z=M,H=p)),w===0)return null;const W=T/w,Y=b/w,tt=1/w,St=R-W*N,ut=C-Y*N,kt=D-W*U,zt=I-Y*U,Wt=z-W*Q,q=H-Y*Q,J=Wt*zt-q*kt,yt=St*q-ut*Wt,it=kt*ut-zt*St;if(s){if(J<0||yt<0||it<0)return null}else if((J<0||yt<0||it<0)&&(J>0||yt>0||it>0))return null;const ot=J+yt+it;if(ot===0)return null;const Ht=tt*(J*N+yt*U+it*Q);return(ot>0?Ht<0:Ht>0)?null:this.at(Ht/ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class je extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _f=new Dt,Ki=new Va,_o=new Bn,Mf=new P,Mo=new P,yo=new P,So=new P,Lc=new P,bo=new P,yf=new P,wo=new P;class Jt extends we{constructor(t=new Qt,e=new je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){bo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],f=r[c];u!==0&&(Lc.fromBufferAttribute(f,t),o?bo.addScaledVector(Lc,u):bo.addScaledVector(Lc.sub(e),u))}e.add(bo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_o.copy(i.boundingSphere),_o.applyMatrix4(r),Ki.copy(t.ray).recast(t.near),!(_o.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(_o,Mf)===null||Ki.origin.distanceToSquared(Mf)>(t.far-t.near)**2))&&(_f.copy(r).invert(),Ki.copy(t.ray).applyMatrix4(_f),!(i.boundingBox!==null&&Ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ki)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=h.length;m<v;m++){const g=h[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,_=y;x<_;x+=3){const S=a.getX(x),T=a.getX(x+1),b=a.getX(x+2);s=To(this,p,t,i,l,u,f,S,T,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);s=To(this,o,t,i,l,u,f,M,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,v=h.length;m<v;m++){const g=h[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),y=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,_=y;x<_;x+=3){const S=x,T=x+1,b=x+2;s=To(this,p,t,i,l,u,f,S,T,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=g,y=g+1,x=g+2;s=To(this,o,t,i,l,u,f,M,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function qx(n,t,e,i,s,r,o,a){let c;if(t.side===Ye?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===_i,a),c===null)return null;wo.copy(a),wo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(wo);return l<e.near||l>e.far?null:{distance:l,point:wo.clone(),object:n}}function To(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Mo),n.getVertexPosition(c,yo),n.getVertexPosition(l,So);const u=qx(n,t,e,i,Mo,yo,So,yf);if(u){const f=new P;Un.getBarycoord(yf,Mo,yo,So,f),s&&(u.uv=Un.getInterpolatedAttribute(s,a,c,l,f,new rt)),r&&(u.uv1=Un.getInterpolatedAttribute(r,a,c,l,f,new rt)),o&&(u.normal=Un.getInterpolatedAttribute(o,a,c,l,f,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new P,materialIndex:0};Un.getNormal(Mo,yo,So,h.normal),u.face=h,u.barycoord=f}return u}const rr=new he,Sf=new he,bf=new he,Kx=new he,wf=new Dt,Eo=new P,Nc=new Bn,Tf=new Dt,Ic=new Va;class Sm extends Jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jh,this.bindMatrix=new Dt,this.bindMatrixInverse=new Dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new yi),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Eo),this.boundingBox.expandByPoint(Eo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Eo),this.boundingSphere.expandByPoint(Eo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nc.copy(this.boundingSphere),Nc.applyMatrix4(s),t.ray.intersectsSphere(Nc)!==!1&&(Tf.copy(s).invert(),Ic.copy(t.ray).applyMatrix4(Tf),!(this.boundingBox!==null&&Ic.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ic)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new he,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===jh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xv?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ct("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;Sf.fromBufferAttribute(s.attributes.skinIndex,t),bf.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(rr.copy(e),e.set(0,0,0,0)):(rr.set(...e,1),e.set(0,0,0)),rr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=bf.getComponent(r);if(o!==0){const a=Sf.getComponent(r);wf.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(Kx.copy(rr).applyMatrix4(wf),o)}}return e.isVector4&&(e.w=rr.w),e.applyMatrix4(this.bindMatrixInverse)}}class bm extends we{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qu extends ze{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Oe,u=Oe,f,h){super(null,o,a,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ef=new Dt,Yx=new Dt;class ju{constructor(t=[],e=[]){this.uuid=Tn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Ct("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Dt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const i=new Dt;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Yx;Ef.multiplyMatrices(a,e[r]),Ef.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new ju(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new Qu(e,t,t,wn,bn);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const r=t.bones[i];let o=e[r];o===void 0&&(Ct("Skeleton: No bone found with UUID:",r),o=new bm),this.bones.push(o),this.boneInverses.push(new Dt().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=i[s];t.boneInverses.push(a.toArray())}return t}}class wa extends Nt{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ys=new Dt,Af=new Dt,Ao=[],Rf=new yi,$x=new Dt,or=new Jt,ar=new Bn;class Xe extends Jt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new wa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,$x)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ys),Rf.copy(t.boundingBox).applyMatrix4(ys),this.boundingBox.union(Rf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ys),ar.copy(t.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(ar)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ar.copy(this.boundingSphere),ar.applyMatrix4(i),t.ray.intersectsSphere(ar)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ys),Af.multiplyMatrices(i,ys),or.matrixWorld=Af,or.raycast(t,Ao);for(let o=0,a=Ao.length;o<a;o++){const c=Ao[o];c.instanceId=r,c.object=this,e.push(c)}Ao.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new wa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Qu(new Float32Array(s*this.count),s,this.count,Vu,bn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Yi=new Bn,Zx=new rt(.5,.5),Ro=new P;class Ga{constructor(t=new Oi,e=new Oi,i=new Oi,s=new Oi,r=new Oi,o=new Oi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=$n,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],m=r[8],v=r[9],g=r[10],p=r[11],M=r[12],y=r[13],x=r[14],_=r[15];if(s[0].setComponents(l-o,d-u,p-m,_-M).normalize(),s[1].setComponents(l+o,d+u,p+m,_+M).normalize(),s[2].setComponents(l+a,d+f,p+v,_+y).normalize(),s[3].setComponents(l-a,d-f,p-v,_-y).normalize(),i)s[4].setComponents(c,h,g,x).normalize(),s[5].setComponents(l-c,d-h,p-g,_-x).normalize();else if(s[4].setComponents(l-c,d-h,p-g,_-x).normalize(),e===$n)s[5].setComponents(l+c,d+h,p+g,_+x).normalize();else if(e===Hr)s[5].setComponents(c,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(t){Yi.center.set(0,0,0);const e=Zx.distanceTo(t.center);return Yi.radius=.7071067811865476+e,Yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Ro.x=s.normal.x>0?t.max.x:t.min.x,Ro.y=s.normal.y>0?t.max.y:t.min.y,Ro.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ro)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class th extends On{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ta=new P,Ea=new P,Cf=new Dt,cr=new Va,Co=new Bn,Dc=new P,Pf=new P;class eh extends we{constructor(t=new Qt,e=new th){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ta.fromBufferAttribute(e,s-1),Ea.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ta.distanceTo(Ea);t.setAttribute("lineDistance",new qt(i,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Co.copy(i.boundingSphere),Co.applyMatrix4(s),Co.radius+=r,t.ray.intersectsSphere(Co)===!1)return;Cf.copy(s).invert(),cr.copy(t.ray).applyMatrix4(Cf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=l){const p=u.getX(v),M=u.getX(v+1),y=Po(this,t,cr,c,p,M,v);y&&e.push(y)}if(this.isLineLoop){const v=u.getX(m-1),g=u.getX(d),p=Po(this,t,cr,c,v,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=l){const p=Po(this,t,cr,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=Po(this,t,cr,c,m-1,d,m-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Po(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Ta.fromBufferAttribute(a,s),Ea.fromBufferAttribute(a,r),e.distanceSqToSegment(Ta,Ea,Dc,Pf)>i)return;Dc.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Dc);if(!(l<t.near||l>t.far))return{distance:l,point:Pf.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Lf=new P,Nf=new P;class wm extends eh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Lf.fromBufferAttribute(e,s),Nf.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Lf.distanceTo(Nf);t.setAttribute("lineDistance",new qt(i,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jx extends eh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Tm extends On{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const If=new Dt,lu=new Va,Lo=new Bn,No=new P;class Aa extends we{constructor(t=new Qt,e=new Tm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Lo.copy(i.boundingSphere),Lo.applyMatrix4(s),Lo.radius+=r,t.ray.intersectsSphere(Lo)===!1)return;If.copy(s).invert(),lu.copy(t.ray).applyMatrix4(If);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=h,v=d;m<v;m++){const g=l.getX(m);No.fromBufferAttribute(f,g),Df(No,g,c,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let m=h,v=d;m<v;m++)No.fromBufferAttribute(f,m),Df(No,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Df(n,t,e,i,s,r,o){const a=lu.distanceSqToPoint(n);if(a<e){const c=new P;lu.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Em extends ze{constructor(t=[],e=ss,i,s,r,o,a,c,l,u){super(t,e,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nh extends ze{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gr extends ze{constructor(t,e,i=jn,s,r,o,a=Oe,c=Oe,l,u=Mi,f=1){if(u!==Mi&&u!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new $u(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Qx extends Gr{constructor(t,e=jn,i=ss,s,r,o=Oe,a=Oe,c,l=Mi){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Am extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class $t extends Qt{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;m("z","y","x",-1,-1,i,e,t,o,r,0),m("z","y","x",1,-1,i,e,-t,o,r,1),m("x","z","y",1,1,t,i,e,s,o,2),m("x","z","y",1,-1,t,i,-e,s,o,3),m("x","y","z",1,-1,t,e,i,s,r,4),m("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(f,2));function m(v,g,p,M,y,x,_,S,T,b,w){const R=x/T,C=_/b,N=x/2,D=_/2,I=S/2,U=T+1,z=b+1;let H=0,Q=0;const W=new P;for(let Y=0;Y<z;Y++){const tt=Y*C-D;for(let St=0;St<U;St++){const ut=St*R-N;W[v]=ut*M,W[g]=tt*y,W[p]=I,l.push(W.x,W.y,W.z),W[v]=0,W[g]=0,W[p]=S>0?1:-1,u.push(W.x,W.y,W.z),f.push(St/T),f.push(1-Y/b),H+=1}}for(let Y=0;Y<b;Y++)for(let tt=0;tt<T;tt++){const St=h+tt+U*Y,ut=h+tt+U*(Y+1),kt=h+(tt+1)+U*(Y+1),zt=h+(tt+1)+U*Y;c.push(St,ut,zt),c.push(ut,kt,zt),Q+=6}a.addGroup(d,Q,w),d+=Q,h+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $t(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ih extends Qt{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=e/2,f=Math.PI/2*t,h=e,d=2*f+h,m=i*2+r,v=s+1,g=new P,p=new P;for(let M=0;M<=m;M++){let y=0,x=0,_=0,S=0;if(M<=i){const w=M/i,R=w*Math.PI/2;x=-u-t*Math.cos(R),_=t*Math.sin(R),S=-t*Math.cos(R),y=w*f}else if(M<=i+r){const w=(M-i)/r;x=-u+w*e,_=t,S=0,y=f+w*h}else{const w=(M-i-r)/i,R=w*Math.PI/2;x=u+t*Math.sin(R),_=t*Math.cos(R),S=t*Math.sin(R),y=f+h+w*f}const T=Math.max(0,Math.min(1,y/d));let b=0;M===0?b=.5/s:M===m&&(b=-.5/s);for(let w=0;w<=s;w++){const R=w/s,C=R*Math.PI*2,N=Math.sin(C),D=Math.cos(C);p.x=-_*D,p.y=x,p.z=_*N,a.push(p.x,p.y,p.z),g.set(-_*D,S,_*N),g.normalize(),c.push(g.x,g.y,g.z),l.push(R+b,T)}if(M>0){const w=(M-1)*v;for(let R=0;R<s;R++){const C=w+R,N=w+R+1,D=M*v+R,I=M*v+R+1;o.push(C,N,D),o.push(N,I,D)}}}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ih(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class tn extends Qt{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let m=0;const v=[],g=i/2;let p=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(d,2));function M(){const x=new P,_=new P;let S=0;const T=(e-t)/i;for(let b=0;b<=r;b++){const w=[],R=b/r,C=R*(e-t)+t;for(let N=0;N<=s;N++){const D=N/s,I=D*c+a,U=Math.sin(I),z=Math.cos(I);_.x=C*U,_.y=-R*i+g,_.z=C*z,f.push(_.x,_.y,_.z),x.set(U,T,z).normalize(),h.push(x.x,x.y,x.z),d.push(D,1-R),w.push(m++)}v.push(w)}for(let b=0;b<s;b++)for(let w=0;w<r;w++){const R=v[w][b],C=v[w+1][b],N=v[w+1][b+1],D=v[w][b+1];(t>0||w!==0)&&(u.push(R,C,D),S+=3),(e>0||w!==r-1)&&(u.push(C,N,D),S+=3)}l.addGroup(p,S,0),p+=S}function y(x){const _=m,S=new rt,T=new P;let b=0;const w=x===!0?t:e,R=x===!0?1:-1;for(let N=1;N<=s;N++)f.push(0,g*R,0),h.push(0,R,0),d.push(.5,.5),m++;const C=m;for(let N=0;N<=s;N++){const I=N/s*c+a,U=Math.cos(I),z=Math.sin(I);T.x=w*z,T.y=g*R,T.z=w*U,f.push(T.x,T.y,T.z),h.push(0,R,0),S.x=U*.5+.5,S.y=z*.5*R+.5,d.push(S.x,S.y),m++}for(let N=0;N<s;N++){const D=_+N,I=C+N;x===!0?u.push(I,I+1,D):u.push(I+1,I,D),b+=3}l.addGroup(p,b,x===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class to extends tn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new to(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sh extends Qt{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new P,x=new P,_=new P;for(let S=0;S<e.length;S+=3)d(e[S+0],y),d(e[S+1],x),d(e[S+2],_),c(y,x,_,M)}function c(M,y,x,_){const S=_+1,T=[];for(let b=0;b<=S;b++){T[b]=[];const w=M.clone().lerp(x,b/S),R=y.clone().lerp(x,b/S),C=S-b;for(let N=0;N<=C;N++)N===0&&b===S?T[b][N]=w:T[b][N]=w.clone().lerp(R,N/C)}for(let b=0;b<S;b++)for(let w=0;w<2*(S-b)-1;w++){const R=Math.floor(w/2);w%2===0?(h(T[b][R+1]),h(T[b+1][R]),h(T[b][R])):(h(T[b][R+1]),h(T[b+1][R+1]),h(T[b+1][R]))}}function l(M){const y=new P;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const M=new P;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=g(M)/2/Math.PI+.5,_=p(M)/Math.PI+.5;o.push(x,1-_)}m(),f()}function f(){for(let M=0;M<o.length;M+=6){const y=o[M+0],x=o[M+2],_=o[M+4],S=Math.max(y,x,_),T=Math.min(y,x,_);S>.9&&T<.1&&(y<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),_<.2&&(o[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,y){const x=M*3;y.x=t[x+0],y.y=t[x+1],y.z=t[x+2]}function m(){const M=new P,y=new P,x=new P,_=new P,S=new rt,T=new rt,b=new rt;for(let w=0,R=0;w<r.length;w+=9,R+=6){M.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),S.set(o[R+0],o[R+1]),T.set(o[R+2],o[R+3]),b.set(o[R+4],o[R+5]),_.copy(M).add(y).add(x).divideScalar(3);const C=g(_);v(S,R+0,M,C),v(T,R+2,y,C),v(b,R+4,x,C)}}function v(M,y,x,_){_<0&&M.x===1&&(o[y]=M.x-1),x.x===0&&x.z===0&&(o[y]=_/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sh(t.vertices,t.indices,t.radius,t.detail)}}class ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ct("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const u=i[s],h=i[s+1]-u,d=(o-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new rt:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new P,s=[],r=[],o=[],a=new P,c=new Dt;for(let d=0;d<=t;d++){const m=d/t;s[d]=this.getTangentAt(m,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Zt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Zt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class rh extends ei{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new rt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class jx extends rh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function oh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,f){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,s(o,a,h,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const Uf=new P,Ff=new P,Uc=new oh,Fc=new oh,Oc=new oh;class ah extends ei{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Ff.subVectors(s[0],s[1]).add(s[0]),l=Ff);const f=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Uf.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Uf),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Uc.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,m,v,g),Fc.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,m,v,g),Oc.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(Uc.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),Fc.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),Oc.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return i.set(Uc.calc(c),Fc.calc(c),Oc.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Of(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function t_(n,t){const e=1-n;return e*e*t}function e_(n,t){return 2*(1-n)*n*t}function n_(n,t){return n*n*t}function Rr(n,t,e,i){return t_(n,t)+e_(n,e)+n_(n,i)}function i_(n,t){const e=1-n;return e*e*e*t}function s_(n,t){const e=1-n;return 3*e*e*n*t}function r_(n,t){return 3*(1-n)*n*n*t}function o_(n,t){return n*n*n*t}function Cr(n,t,e,i,s){return i_(n,t)+s_(n,e)+r_(n,i)+o_(n,s)}class Rm extends ei{constructor(t=new rt,e=new rt,i=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new rt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Cr(t,s.x,r.x,o.x,a.x),Cr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class a_ extends ei{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Cr(t,s.x,r.x,o.x,a.x),Cr(t,s.y,r.y,o.y,a.y),Cr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Cm extends ei{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class c_ extends ei{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pm extends ei{constructor(t=new rt,e=new rt,i=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new rt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Rr(t,s.x,r.x,o.x),Rr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lm extends ei{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Rr(t,s.x,r.x,o.x),Rr(t,s.y,r.y,o.y),Rr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nm extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return i.set(Of(a,c.x,l.x,u.x,f.x),Of(a,c.y,l.y,u.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var uu=Object.freeze({__proto__:null,ArcCurve:jx,CatmullRomCurve3:ah,CubicBezierCurve:Rm,CubicBezierCurve3:a_,EllipseCurve:rh,LineCurve:Cm,LineCurve3:c_,QuadraticBezierCurve:Pm,QuadraticBezierCurve3:Lm,SplineCurve:Nm});class l_ extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uu[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new uu[s.type]().fromJSON(s))}return this}}class kf extends l_{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Cm(this.currentPoint.clone(),new rt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Pm(this.currentPoint.clone(),new rt(t,e),new rt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new Rm(this.currentPoint.clone(),new rt(t,e),new rt(i,s),new rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Nm(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new rh(t,e,i,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Im extends kf{constructor(t){super(t),this.uuid=Tn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new kf().fromJSON(s))}return this}}function u_(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Dm(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=m_(n,t,r,e)),n.length>80*e){a=n[0],c=n[1];let u=a,f=c;for(let h=e;h<s;h+=e){const d=n[h],m=n[h+1];d<a&&(a=d),m<c&&(c=m),d>u&&(u=d),m>f&&(f=m)}l=Math.max(u-a,f-c),l=l!==0?32767/l:0}return Wr(r,o,e,a,c,l,0),o}function Dm(n,t,e,i,s){let r;if(s===E_(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Bf(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Bf(o/i|0,n[o],n[o+1],r);return r&&Gs(r,r.next)&&(qr(r),r=r.next),r}function os(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Gs(e,e.next)||Ee(e.prev,e,e.next)===0)){if(qr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Wr(n,t,e,i,s,r,o){if(!n)return;!o&&r&&M_(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?f_(n,i,s,r):h_(n)){t.push(c.i,n.i,l.i),qr(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=d_(os(n),t),Wr(n,t,e,i,s,r,2)):o===2&&p_(n,t,e,i,s,r):Wr(os(n),t,e,i,s,r,1);break}}}function h_(n){const t=n.prev,e=n,i=n.next;if(Ee(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(s,r,o),f=Math.min(a,c,l),h=Math.max(s,r,o),d=Math.max(a,c,l);let m=i.next;for(;m!==t;){if(m.x>=u&&m.x<=h&&m.y>=f&&m.y<=d&&yr(s,a,r,c,o,l,m.x,m.y)&&Ee(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function f_(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Ee(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,h=o.y,d=Math.min(a,c,l),m=Math.min(u,f,h),v=Math.max(a,c,l),g=Math.max(u,f,h),p=hu(d,m,t,e,i),M=hu(v,g,t,e,i);let y=n.prevZ,x=n.nextZ;for(;y&&y.z>=p&&x&&x.z<=M;){if(y.x>=d&&y.x<=v&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&yr(a,u,c,f,l,h,y.x,y.y)&&Ee(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&yr(a,u,c,f,l,h,x.x,x.y)&&Ee(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=v&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&yr(a,u,c,f,l,h,y.x,y.y)&&Ee(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&yr(a,u,c,f,l,h,x.x,x.y)&&Ee(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function d_(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Gs(i,s)&&Fm(i,e,e.next,s)&&Xr(i,s)&&Xr(s,i)&&(t.push(i.i,e.i,s.i),qr(e),qr(e.next),e=n=s),e=e.next}while(e!==n);return os(e)}function p_(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&b_(o,a)){let c=Om(o,a);o=os(o,o.next),c=os(c,c.next),Wr(o,t,e,i,s,r,0),Wr(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function m_(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Dm(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(S_(l))}s.sort(g_);for(let r=0;r<s.length;r++)e=v_(s[r],e);return e}function g_(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function v_(n,t){const e=x_(n,t);if(!e)return t;const i=Om(e,n);return os(i,i.next),os(e,e.next)}function x_(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(Gs(n,e))return e;do{if(Gs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,o=e.x<e.next.x?e:e.next,f===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&Um(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const f=Math.abs(s-e.y)/(i-e.x);Xr(e,n)&&(f<u||f===u&&(e.x>o.x||e.x===o.x&&__(o,e)))&&(o=e,u=f)}e=e.next}while(e!==a);return o}function __(n,t){return Ee(n.prev,n,t.prev)<0&&Ee(t.next,n,n.next)<0}function M_(n,t,e,i){let s=n;do s.z===0&&(s.z=hu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,y_(s)}function y_(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function hu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function S_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Um(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function yr(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&Um(n,t,e,i,s,r,o,a)}function b_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!w_(n,t)&&(Xr(n,t)&&Xr(t,n)&&T_(n,t)&&(Ee(n.prev,n,t.prev)||Ee(n,t.prev,t))||Gs(n,t)&&Ee(n.prev,n,n.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Gs(n,t){return n.x===t.x&&n.y===t.y}function Fm(n,t,e,i){const s=Do(Ee(n,t,e)),r=Do(Ee(n,t,i)),o=Do(Ee(e,i,n)),a=Do(Ee(e,i,t));return!!(s!==r&&o!==a||s===0&&Io(n,e,t)||r===0&&Io(n,i,t)||o===0&&Io(e,n,i)||a===0&&Io(e,t,i))}function Io(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Do(n){return n>0?1:n<0?-1:0}function w_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Fm(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Xr(n,t){return Ee(n.prev,n,n.next)<0?Ee(n,t,n.next)>=0&&Ee(n,n.prev,t)>=0:Ee(n,t,n.prev)<0||Ee(n,n.next,t)<0}function T_(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Om(n,t){const e=fu(n.i,n.x,n.y),i=fu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Bf(n,t,e,i){const s=fu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function qr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function fu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function E_(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class A_{static triangulate(t,e,i=2){return u_(t,e,i)}}class Pr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return Pr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];zf(t),Hf(i,t);let o=t.length;e.forEach(zf);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Hf(i,e[c]);const a=A_.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function zf(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Hf(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class cs extends sh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cs(t.radius,t.detail)}}class eo extends Qt{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Zt(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,f=new P,h=new rt,d=new P,m=new P,v=new P;let g=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-g,d.z=p*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(m)}for(let M=0;M<=e;M++){const y=i+M*u*s,x=Math.sin(y),_=Math.cos(y);for(let S=0;S<=t.length-1;S++){f.x=t[S].x*x,f.y=t[S].y,f.z=t[S].x*_,o.push(f.x,f.y,f.z),h.x=M/e,h.y=S/(t.length-1),a.push(h.x,h.y);const T=c[3*S+0]*x,b=c[3*S+1],w=c[3*S+0]*_;l.push(T,b,w)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){const x=y+M*t.length,_=x,S=x+t.length,T=x+t.length+1,b=x+1;r.push(_,S,b),r.push(T,b,S)}this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("uv",new qt(a,2)),this.setAttribute("normal",new qt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eo(t.points,t.segments,t.phiStart,t.phiLength)}}class zn extends Qt{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=t/a,h=e/c,d=[],m=[],v=[],g=[];for(let p=0;p<u;p++){const M=p*h-o;for(let y=0;y<l;y++){const x=y*f-r;m.push(x,-M,0),v.push(0,0,1),g.push(y/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const y=M+l*p,x=M+l*(p+1),_=M+1+l*(p+1),S=M+1+l*p;d.push(y,x,S),d.push(x,_,S)}this.setIndex(d),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(v,3)),this.setAttribute("uv",new qt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zn(t.width,t.height,t.widthSegments,t.heightSegments)}}class ch extends Qt{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let f=t;const h=(e-t)/s,d=new P,m=new rt;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){const p=r+g/i*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,u.push(m.x,m.y)}f+=h}for(let v=0;v<s;v++){const g=v*(i+1);for(let p=0;p<i;p++){const M=p+g,y=M,x=M+i+1,_=M+i+2,S=M+1;a.push(y,x,S),a.push(x,_,S)}}this.setIndex(a),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ch(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class lh extends Qt{constructor(t=new Im([new rt(0,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(o,2));function l(u){const f=s.length/3,h=u.extractPoints(e);let d=h.shape;const m=h.holes;Pr.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){const M=m[g];Pr.isClockWise(M)===!0&&(m[g]=M.reverse())}const v=Pr.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){const M=m[g];d=d.concat(M)}for(let g=0,p=d.length;g<p;g++){const M=d[g];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let g=0,p=v.length;g<p;g++){const M=v[g],y=M[0]+f,x=M[1]+f,_=M[2]+f;i.push(y,x,_),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return R_(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new lh(i,t.curveSegments)}}function R_(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Os extends Qt{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new P,h=new P,d=[],m=[],v=[],g=[];for(let p=0;p<=i;p++){const M=[],y=p/i,x=o+y*a,_=t*Math.cos(x),S=Math.sqrt(t*t-_*_);let T=0;p===0&&o===0?T=.5/e:p===i&&c===Math.PI&&(T=-.5/e);for(let b=0;b<=e;b++){const w=b/e,R=s+w*r;f.x=-S*Math.cos(R),f.y=_,f.z=S*Math.sin(R),m.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),g.push(w+T,1-y),M.push(l++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){const y=u[p][M+1],x=u[p][M],_=u[p+1][M],S=u[p+1][M+1];(p!==0||o>0)&&d.push(y,x,S),(p!==i-1||c<Math.PI)&&d.push(x,_,S)}this.setIndex(d),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(v,3)),this.setAttribute("uv",new qt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Os(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class uh extends Qt{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],f=[],h=new P,d=new P,m=new P;for(let v=0;v<=i;v++){const g=o+v/i*a;for(let p=0;p<=s;p++){const M=p/s*r;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),l.push(d.x,d.y,d.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),m.subVectors(d,h).normalize(),u.push(m.x,m.y,m.z),f.push(p/s),f.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=s;g++){const p=(s+1)*v+g-1,M=(s+1)*(v-1)+g-1,y=(s+1)*(v-1)+g,x=(s+1)*v+g;c.push(p,M,x),c.push(M,y,x)}this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Wa extends Qt{constructor(t=new Lm(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,c=new P,l=new rt;let u=new P;const f=[],h=[],d=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(d,2));function v(){for(let y=0;y<e;y++)g(y);g(r===!1?e:0),M(),p()}function g(y){u=t.getPointAt(y/e,u);const x=o.normals[y],_=o.binormals[y];for(let S=0;S<=s;S++){const T=S/s*Math.PI*2,b=Math.sin(T),w=-Math.cos(T);c.x=w*x.x+b*_.x,c.y=w*x.y+b*_.y,c.z=w*x.z+b*_.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+i*c.x,a.y=u.y+i*c.y,a.z=u.z+i*c.z,f.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let x=1;x<=s;x++){const _=(s+1)*(y-1)+(x-1),S=(s+1)*y+(x-1),T=(s+1)*y+x,b=(s+1)*(y-1)+x;m.push(_,S,b),m.push(S,T,b)}}function M(){for(let y=0;y<=e;y++)for(let x=0;x<=s;x++)l.x=y/e,l.y=x/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Wa(new uu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Ws(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Vf(s))s.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Vf(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function sn(n){const t={};for(let e=0;e<n.length;e++){const i=Ws(n[e]);for(const s in i)t[s]=i[s]}return t}function Vf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function C_(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function km(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const xn={clone:Ws,merge:sn};var P_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,L_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ie extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=P_,this.fragmentShader=L_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=C_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(s.value);break;case"v2":this.uniforms[i].value=new rt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new he().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Gt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Dt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Bm extends ie{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Si extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ya,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ni extends Si{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new rt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class hh extends On{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ya,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Nu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class N_ extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class I_ extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function ki(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function ia(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function D_(n){function t(s,r){return n[s]-n[r]}const e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function Gf(n,t,e){const i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=n[a+c]}return s}function U_(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}class Ks{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){const a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class F_ extends Ks{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ef,endingEnd:ef}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case nf:r=t,a=2*e-i;break;case sf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case nf:o=t,c=2*i-e;break;case sf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}const l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,m=(i-e)/(s-e),v=m*m,g=v*m,p=-h*g+2*h*v-h*m,M=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*m+1,y=(-1-d)*g+(1.5+d)*v+.5*m,x=d*g-d*v;for(let _=0;_!==a;++_)r[_]=p*o[u+_]+M*o[l+_]+y*o[c+_]+x*o[f+_];return r}}class O_ extends Ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(s-e),f=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*f+o[c+h]*u;return r}}class k_ extends Ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class B_ extends Ks{interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){const m=(i-e)/(s-e),v=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*v+o[c+g]*m;return r}const h=a*2,d=t-1;for(let m=0;m!==a;++m){const v=o[l+m],g=o[c+m],p=d*h+m*2,M=f[p],y=f[p+1],x=t*h+m*2,_=u[x],S=u[x+1],T=H_(i,e,M,_,s);r[m]=zm(T,v,y,S,g)}return r}}function zm(n,t,e,i,s){const r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function z_(n,t,e,i,s){const r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function H_(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){const a=zm(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;const c=z_(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Hn{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ki(e,this.TimeBufferType),this.values=ki(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ki(t.times,Array),values:ki(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),ia(t.settings)&&(i.settings={inTangents:ki(t.settings.inTangents,Array),outTangents:ki(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new k_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new O_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new F_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new B_(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Br:e=this.InterpolantFactoryMethodDiscrete;break;case zr:e=this.InterpolantFactoryMethodLinear;break;case uc:e=this.InterpolantFactoryMethodSmooth;break;case tf:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ct("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return zr;case this.InterpolantFactoryMethodSmooth:return uc;case this.InterpolantFactoryMethodBezier:return tf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;ia(this.settings)&&(Wf(this.settings.inTangents,t),Wf(this.settings.outTangents,t))}return this}trim(t,e){const i=this.times,s=i.length;let r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Bt("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Bt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=i[a];if(typeof c=="number"&&isNaN(c)){Bt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Bt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&sx(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){Bt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===uc,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{const f=a*i,h=f-i,d=f+i;for(let m=0;m!==i;++m){const v=e[f+m];if(v!==e[h+m]||v!==e[d+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const f=a*i,h=o*i;for(let d=0;d!==i;++d)e[h+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,ia(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function Wf(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Hn.prototype.ValueTypeName="";Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=zr;class Ys extends Hn{constructor(t,e,i){super(t,e,i)}}Ys.prototype.ValueTypeName="bool";Ys.prototype.ValueBufferType=Array;Ys.prototype.DefaultInterpolation=Br;Ys.prototype.InterpolantFactoryMethodLinear=void 0;Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Hm extends Hn{constructor(t,e,i,s){super(t,e,i,s)}}Hm.prototype.ValueTypeName="color";class Kr extends Hn{constructor(t,e,i,s){super(t,e,i,s)}}Kr.prototype.ValueTypeName="number";class V_ extends Ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Ae.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Yr extends Hn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new V_(this.times,this.values,this.getValueSize(),t)}}Yr.prototype.ValueTypeName="quaternion";Yr.prototype.InterpolantFactoryMethodSmooth=void 0;class $s extends Hn{constructor(t,e,i){super(t,e,i)}}$s.prototype.ValueTypeName="string";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=Br;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class Ra extends Hn{constructor(t,e,i,s){super(t,e,i,s)}}Ra.prototype.ValueTypeName="vector";class G_{constructor(t="",e=-1,i=[],s=qv){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=Tn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(X_(i[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=i.length;r!==o;++r)e.push(Hn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=D_(c);c=Gf(c,1,u),l=Gf(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Kr(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const f=u[1];let h=s[f];h||(s[f]=h=[]),h.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}resetDuration(){const t=this.tracks;let e=0;for(let i=0,s=t.length;i!==s;++i){const r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let i=0;i<this.tracks.length;i++)t.push(this.tracks[i].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function W_(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Kr;case"vector":case"vector2":case"vector3":case"vector4":return Ra;case"color":return Hm;case"quaternion":return Yr;case"bool":case"boolean":return Ys;case"string":return $s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function X_(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=W_(n.type);if(n.times===void 0){const i=[],s=[];U_(n.keys,i,s,"value"),n.times=i,n.values=s}let e;return t.parse!==void 0?e=t.parse(n):e=new t(n.name,n.times,n.values,n.interpolation),ia(n.settings)&&(e.settings={inTangents:ki(n.settings.inTangents,Float32Array),outTangents:ki(n.settings.outTangents,Float32Array)}),e}const pi={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Xf(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Xf(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Xf(n){try{const t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class q_{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const d=l[f],m=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const K_=new q_;class Zs{constructor(t){this.manager=t!==void 0?t:K_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Zs.DEFAULT_MATERIAL_NAME="__DEFAULT";const ci={};class Y_ extends Error{constructor(t,e){super(t),this.response=e}}class Vm extends Zs{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=pi.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(ci[t]!==void 0){ci[t].push({onLoad:e,onProgress:i,onError:s});return}ci[t]=[],ci[t].push({onLoad:e,onProgress:i,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ct("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ci[t],f=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=h?parseInt(h):0,m=d!==0;let v=0;const g=new ReadableStream({start(p){M();function M(){f.read().then(({done:y,value:x})=>{if(y)p.close();else{v+=x.byteLength;const _=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:d});for(let S=0,T=u.length;S<T;S++){const b=u[S];b.onProgress&&b.onProgress(_)}p.enqueue(x),M()}},y=>{p.error(y)})}}});return new Response(g)}else throw new Y_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{pi.add(`file:${t}`,l);const u=ci[t];delete ci[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=ci[t];if(u===void 0)throw this.manager.itemError(t),l;delete ci[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ss=new WeakMap;class $_ extends Zs{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let f=Ss.get(o);f===void 0&&(f=[],Ss.set(o,f)),f.push({onLoad:e,onError:s})}return o}const a=Vr("img");function c(){u(),e&&e(this);const f=Ss.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Ss.delete(this),r.manager.itemEnd(t)}function l(f){u(),s&&s(f),pi.remove(`image:${t}`);const h=Ss.get(this)||[];for(let d=0;d<h.length;d++){const m=h[d];m.onError&&m.onError(f)}Ss.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),pi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class Z_ extends Zs{constructor(t){super(t)}load(t,e,i,s){const r=new ze,o=new $_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class Xa extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class J_ extends Xa{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const kc=new Dt,qf=new P,Kf=new P;class fh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new Dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;qf.setFromMatrixPosition(t.matrixWorld),e.position.copy(qf),Kf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kf),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(kc,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Hr||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(kc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Uo=new P,Fo=new Ae,Wn=new P;class Gm extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dt,this.projectionMatrix=new Dt,this.projectionMatrixInverse=new Dt,this.coordinateSystem=$n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Uo,Fo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,Fo,Wn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Uo,Fo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,Fo,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Li=new P,Yf=new rt,$f=new rt;class rn extends Gm{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Li.x,Li.y).multiplyScalar(-t/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Li.x,Li.y).multiplyScalar(-t/Li.z)}getViewSize(t,e){return this.getViewBounds(t,Yf,$f),e.subVectors($f,Yf)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Er*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Q_ extends fh{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=Vs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class j_ extends Xa{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Q_}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class tM extends fh{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}}class eM extends Xa{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new tM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class no extends Gm{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class nM extends fh{constructor(){super(new no(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wm extends Xa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new nM}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Lr{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const Bc=new WeakMap;class iM extends Zs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ct("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ct("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{Bc.has(o)===!0?(s&&s(Bc.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(l),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return pi.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Bc.set(c,l),pi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});pi.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const bs=-90,ws=1;class sM extends we{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(bs,ws,t,e);s.layers=this.layers,this.add(s);const r=new rn(bs,ws,t,e);r.layers=this.layers,this.add(r);const o=new rn(bs,ws,t,e);o.layers=this.layers,this.add(o);const a=new rn(bs,ws,t,e);a.layers=this.layers,this.add(a);const c=new rn(bs,ws,t,e);c.layers=this.layers,this.add(c);const l=new rn(bs,ws,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===$n)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class rM extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class oM{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=aM.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function aM(){this._document.hidden===!1&&this.reset()}const dh="\\[\\]\\.:\\/",cM=new RegExp("["+dh+"]","g"),ph="[^"+dh+"]",lM="[^"+dh.replace("\\.","")+"]",uM=/((?:WC+[\/:])*)/.source.replace("WC",ph),hM=/(WCOD+)?/.source.replace("WCOD",lM),fM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ph),dM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ph),pM=new RegExp("^"+uM+hM+fM+dM+"$"),mM=["material","materials","bones","map"];class gM{constructor(t,e,i){const s=i||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}}class pe{constructor(t,e,i){this.path=e,this.parsedPath=i||pe.parseTrackName(e),this.node=pe.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new pe.Composite(t,e,i):new pe(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cM,"")}static parseTrackName(t){const e=pM.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);mM.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=pe.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Bt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Bt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Bt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Bt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Bt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;Bt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pe.Composite=gM;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Xm{static{Xm.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}function Zf(n,t,e,i){const s=vM(i);switch(e){case fm:return n*t;case Vu:return n*t/s.components*s.byteLength;case Gu:return n*t/s.components*s.byteLength;case rs:return n*t*2/s.components*s.byteLength;case Wu:return n*t*2/s.components*s.byteLength;case dm:return n*t*3/s.components*s.byteLength;case wn:return n*t*4/s.components*s.byteLength;case Xu:return n*t*4/s.components*s.byteLength;case jo:case ta:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ea:case na:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Il:case Ul:return Math.max(n,16)*Math.max(t,8)/4;case Nl:case Dl:return Math.max(n,8)*Math.max(t,8)/2;case Fl:case Ol:case Bl:case zl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case kl:case _a:case Hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Vl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Gl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Wl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Xl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ql:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Kl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Yl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case $l:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Zl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Jl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ql:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case jl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case tu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case eu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case nu:case iu:case su:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ru:case ou:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ma:case au:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vM(n){switch(n){case pn:case cm:return{byteLength:1,components:1};case Or:case lm:case ln:return{byteLength:2,components:1};case zu:case Hu:return{byteLength:2,components:4};case jn:case Bu:case bn:return{byteLength:4,components:1};case um:case hm:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lu}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lu);function qm(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function xM(n){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((d,m)=>d.start-m.start);let h=0;for(let d=1;d<f.length;d++){const m=f[h],v=f[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,m=f.length;d<m;d++){const v=f[d];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var _M=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,MM=`#ifdef USE_ALPHAHASH
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
#endif`,yM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,TM=`#ifdef USE_AOMAP
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
#endif`,EM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,AM=`#ifdef USE_BATCHING
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
#endif`,RM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,CM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,PM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,LM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,NM=`#ifdef USE_IRIDESCENCE
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
#endif`,IM=`#ifdef USE_BUMPMAP
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
#endif`,DM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,UM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,FM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,BM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,HM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,VM=`#define PI 3.141592653589793
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
} // validated`,GM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,WM=`vec3 transformedNormal = objectNormal;
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
#endif`,XM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,KM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,YM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$M="gl_FragColor = linearToOutputTexel( gl_FragColor );",ZM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,JM=`#ifdef USE_ENVMAP
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
#endif`,QM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jM=`#ifdef USE_ENVMAP
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
#endif`,ty=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ey=`#ifdef USE_ENVMAP
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
#endif`,ny=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ry=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,oy=`#ifdef USE_GRADIENTMAP
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
}`,ay=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ly=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,hy=`#ifdef USE_ENVMAP
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
#endif`,fy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,py=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,my=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gy=`PhysicalMaterial material;
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
#endif`,vy=`uniform sampler2D dfgLUT;
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
}`,xy=`
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
#endif`,_y=`#if defined( RE_IndirectDiffuse )
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
#endif`,My=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yy=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,by=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ty=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ey=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ay=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ry=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cy=`#if defined( USE_POINTS_UV )
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
#endif`,Py=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ly=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ny=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uy=`#ifdef USE_MORPHTARGETS
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
#endif`,Fy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Oy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ky=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,By=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vy=`#ifdef USE_NORMALMAP
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
#endif`,Gy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$y=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,t1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,e1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,n1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,i1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,s1=`float getShadowMask() {
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
}`,r1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o1=`#ifdef USE_SKINNING
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
#endif`,a1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,c1=`#ifdef USE_SKINNING
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
#endif`,l1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,h1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,d1=`#ifdef USE_TRANSMISSION
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
#endif`,p1=`#ifdef USE_TRANSMISSION
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
#endif`,m1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,g1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M1=`uniform sampler2D t2D;
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
}`,y1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,b1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T1=`#include <common>
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
}`,E1=`#if DEPTH_PACKING == 3200
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
}`,A1=`#define DISTANCE
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
}`,R1=`#define DISTANCE
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
}`,C1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L1=`uniform float scale;
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
}`,N1=`uniform vec3 diffuse;
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
}`,I1=`#include <common>
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
}`,D1=`uniform vec3 diffuse;
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
}`,U1=`#define LAMBERT
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
}`,F1=`#define LAMBERT
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
}`,O1=`#define MATCAP
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
}`,k1=`#define MATCAP
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
}`,B1=`#define NORMAL
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
}`,z1=`#define NORMAL
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
}`,H1=`#define PHONG
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
}`,V1=`#define PHONG
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
}`,G1=`#define STANDARD
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
}`,W1=`#define STANDARD
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
}`,X1=`#define TOON
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
}`,q1=`#define TOON
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
}`,K1=`uniform float size;
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
}`,Y1=`uniform vec3 diffuse;
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
}`,$1=`#include <common>
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
}`,Z1=`uniform vec3 color;
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
}`,J1=`uniform float rotation;
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
}`,Q1=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:_M,alphahash_pars_fragment:MM,alphamap_fragment:yM,alphamap_pars_fragment:SM,alphatest_fragment:bM,alphatest_pars_fragment:wM,aomap_fragment:TM,aomap_pars_fragment:EM,batching_pars_vertex:AM,batching_vertex:RM,begin_vertex:CM,beginnormal_vertex:PM,bsdfs:LM,iridescence_fragment:NM,bumpmap_pars_fragment:IM,clipping_planes_fragment:DM,clipping_planes_pars_fragment:UM,clipping_planes_pars_vertex:FM,clipping_planes_vertex:OM,color_fragment:kM,color_pars_fragment:BM,color_pars_vertex:zM,color_vertex:HM,common:VM,cube_uv_reflection_fragment:GM,defaultnormal_vertex:WM,displacementmap_pars_vertex:XM,displacementmap_vertex:qM,emissivemap_fragment:KM,emissivemap_pars_fragment:YM,colorspace_fragment:$M,colorspace_pars_fragment:ZM,envmap_fragment:JM,envmap_common_pars_fragment:QM,envmap_pars_fragment:jM,envmap_pars_vertex:ty,envmap_physical_pars_fragment:hy,envmap_vertex:ey,fog_vertex:ny,fog_pars_vertex:iy,fog_fragment:sy,fog_pars_fragment:ry,gradientmap_pars_fragment:oy,lightmap_pars_fragment:ay,lights_lambert_fragment:cy,lights_lambert_pars_fragment:ly,lights_pars_begin:uy,lights_toon_fragment:fy,lights_toon_pars_fragment:dy,lights_phong_fragment:py,lights_phong_pars_fragment:my,lights_physical_fragment:gy,lights_physical_pars_fragment:vy,lights_fragment_begin:xy,lights_fragment_maps:_y,lights_fragment_end:My,lightprobes_pars_fragment:yy,logdepthbuf_fragment:Sy,logdepthbuf_pars_fragment:by,logdepthbuf_pars_vertex:wy,logdepthbuf_vertex:Ty,map_fragment:Ey,map_pars_fragment:Ay,map_particle_fragment:Ry,map_particle_pars_fragment:Cy,metalnessmap_fragment:Py,metalnessmap_pars_fragment:Ly,morphinstance_vertex:Ny,morphcolor_vertex:Iy,morphnormal_vertex:Dy,morphtarget_pars_vertex:Uy,morphtarget_vertex:Fy,normal_fragment_begin:Oy,normal_fragment_maps:ky,normal_pars_fragment:By,normal_pars_vertex:zy,normal_vertex:Hy,normalmap_pars_fragment:Vy,clearcoat_normal_fragment_begin:Gy,clearcoat_normal_fragment_maps:Wy,clearcoat_pars_fragment:Xy,iridescence_pars_fragment:qy,opaque_fragment:Ky,packing:Yy,premultiplied_alpha_fragment:$y,project_vertex:Zy,dithering_fragment:Jy,dithering_pars_fragment:Qy,roughnessmap_fragment:jy,roughnessmap_pars_fragment:t1,shadowmap_pars_fragment:e1,shadowmap_pars_vertex:n1,shadowmap_vertex:i1,shadowmask_pars_fragment:s1,skinbase_vertex:r1,skinning_pars_vertex:o1,skinning_vertex:a1,skinnormal_vertex:c1,specularmap_fragment:l1,specularmap_pars_fragment:u1,tonemapping_fragment:h1,tonemapping_pars_fragment:f1,transmission_fragment:d1,transmission_pars_fragment:p1,uv_pars_fragment:m1,uv_pars_vertex:g1,uv_vertex:v1,worldpos_vertex:x1,background_vert:_1,background_frag:M1,backgroundCube_vert:y1,backgroundCube_frag:S1,cube_vert:b1,cube_frag:w1,depth_vert:T1,depth_frag:E1,distance_vert:A1,distance_frag:R1,equirect_vert:C1,equirect_frag:P1,linedashed_vert:L1,linedashed_frag:N1,meshbasic_vert:I1,meshbasic_frag:D1,meshlambert_vert:U1,meshlambert_frag:F1,meshmatcap_vert:O1,meshmatcap_frag:k1,meshnormal_vert:B1,meshnormal_frag:z1,meshphong_vert:H1,meshphong_frag:V1,meshphysical_vert:G1,meshphysical_frag:W1,meshtoon_vert:X1,meshtoon_frag:q1,points_vert:K1,points_frag:Y1,shadow_vert:$1,shadow_frag:Z1,sprite_vert:J1,sprite_frag:Q1},lt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Kn={basic:{uniforms:sn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:sn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:sn([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:sn([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:sn([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new ct(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:sn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:sn([lt.points,lt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:sn([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:sn([lt.common,lt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:sn([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:sn([lt.sprite,lt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:sn([lt.common,lt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:sn([lt.lights,lt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Kn.physical={uniforms:sn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Oo={r:0,b:0,g:0},j1=new Dt,Km=new Gt;Km.set(-1,0,0,0,1,0,0,0,1);function tS(n,t,e,i,s,r){const o=new ct(0);let a=s===!0?0:1,c,l,u=null,f=0,h=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const x=M.backgroundBlurriness>0;y=t.get(y,x)}return y}function m(M){let y=!1;const x=d(M);x===null?g(o,a):x&&x.isColor&&(g(x,1),y=!0);const _=n.xr.getEnvironmentBlendMode();_==="additive"?e.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,y){const x=d(y);x&&(x.isCubeTexture||x.mapping===Ha)?(l===void 0&&(l=new Jt(new $t(1,1,1),new ie({name:"BackgroundCubeMaterial",uniforms:Ws(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(j1.makeRotationFromEuler(y.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Km),l.material.toneMapped=te.getTransfer(x.colorSpace)!==ue,(u!==x||f!==x.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Jt(new zn(2,2),new ie({name:"BackgroundMaterial",uniforms:Ws(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=te.getTransfer(x.colorSpace)!==ue,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,y){M.getRGB(Oo,km(n)),e.buffers.color.setClear(Oo.r,Oo.g,Oo.b,y,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),a=y,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:m,addToRenderList:v,dispose:p}}function eS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(C,N,D,I,U){let z=!1;const H=f(C,I,D,N);r!==H&&(r=H,l(r.object)),z=d(C,I,D,U),z&&m(C,I,D,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(C,N,D,I),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,N,D,I){const U=I.wireframe===!0;let z=i[N.id];z===void 0&&(z={},i[N.id]=z);const H=C.isInstancedMesh===!0?C.id:0;let Q=z[H];Q===void 0&&(Q={},z[H]=Q);let W=Q[D.id];W===void 0&&(W={},Q[D.id]=W);let Y=W[U];return Y===void 0&&(Y=h(c()),W[U]=Y),Y}function h(C){const N=[],D=[],I=[];for(let U=0;U<e;U++)N[U]=0,D[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:D,attributeDivisors:I,object:C,attributes:{},index:null}}function d(C,N,D,I){const U=r.attributes,z=N.attributes;let H=0;const Q=D.getAttributes();for(const W in Q)if(Q[W].location>=0){const tt=U[W];let St=z[W];if(St===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(St=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(St=C.instanceColor)),tt===void 0||tt.attribute!==St||St&&tt.data!==St.data)return!0;H++}return r.attributesNum!==H||r.index!==I}function m(C,N,D,I){const U={},z=N.attributes;let H=0;const Q=D.getAttributes();for(const W in Q)if(Q[W].location>=0){let tt=z[W];tt===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(tt=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(tt=C.instanceColor));const St={};St.attribute=tt,tt&&tt.data&&(St.data=tt.data),U[W]=St,H++}r.attributes=U,r.attributesNum=H,r.index=I}function v(){const C=r.newAttributes;for(let N=0,D=C.length;N<D;N++)C[N]=0}function g(C){p(C,0)}function p(C,N){const D=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;D[C]=1,I[C]===0&&(n.enableVertexAttribArray(C),I[C]=1),U[C]!==N&&(n.vertexAttribDivisor(C,N),U[C]=N)}function M(){const C=r.newAttributes,N=r.enabledAttributes;for(let D=0,I=N.length;D<I;D++)N[D]!==C[D]&&(n.disableVertexAttribArray(D),N[D]=0)}function y(C,N,D,I,U,z,H){H===!0?n.vertexAttribIPointer(C,N,D,U,z):n.vertexAttribPointer(C,N,D,I,U,z)}function x(C,N,D,I){v();const U=I.attributes,z=D.getAttributes(),H=N.defaultAttributeValues;for(const Q in z){const W=z[Q];if(W.location>=0){let Y=U[Q];if(Y===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(Y=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(Y=C.instanceColor)),Y!==void 0){const tt=Y.normalized,St=Y.itemSize,ut=t.get(Y);if(ut===void 0)continue;const kt=ut.buffer,zt=ut.type,Wt=ut.bytesPerElement,q=zt===n.INT||zt===n.UNSIGNED_INT||Y.gpuType===Bu;if(Y.isInterleavedBufferAttribute){const J=Y.data,yt=J.stride,it=Y.offset;if(J.isInstancedInterleavedBuffer){for(let ot=0;ot<W.locationSize;ot++)p(W.location+ot,J.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ot=0;ot<W.locationSize;ot++)g(W.location+ot);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let ot=0;ot<W.locationSize;ot++)y(W.location+ot,St/W.locationSize,zt,tt,yt*Wt,(it+St/W.locationSize*ot)*Wt,q)}else{if(Y.isInstancedBufferAttribute){for(let J=0;J<W.locationSize;J++)p(W.location+J,Y.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let J=0;J<W.locationSize;J++)g(W.location+J);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let J=0;J<W.locationSize;J++)y(W.location+J,St/W.locationSize,zt,tt,St*Wt,St/W.locationSize*J*Wt,q)}}else if(H!==void 0){const tt=H[Q];if(tt!==void 0)switch(tt.length){case 2:n.vertexAttrib2fv(W.location,tt);break;case 3:n.vertexAttrib3fv(W.location,tt);break;case 4:n.vertexAttrib4fv(W.location,tt);break;default:n.vertexAttrib1fv(W.location,tt)}}}}M()}function _(){w();for(const C in i){const N=i[C];for(const D in N){const I=N[D];for(const U in I){const z=I[U];for(const H in z)u(z[H].object),delete z[H];delete I[U]}}delete i[C]}}function S(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const D in N){const I=N[D];for(const U in I){const z=I[U];for(const H in z)u(z[H].object),delete z[H];delete I[U]}}delete i[C.id]}function T(C){for(const N in i){const D=i[N];for(const I in D){const U=D[I];if(U[C.id]===void 0)continue;const z=U[C.id];for(const H in z)u(z[H].object),delete z[H];delete U[C.id]}}}function b(C){for(const N in i){const D=i[N],I=C.isInstancedMesh===!0?C.id:0,U=D[I];if(U!==void 0){for(const z in U){const H=U[z];for(const Q in H)u(H[Q].object),delete H[Q];delete U[z]}delete D[I],Object.keys(D).length===0&&delete i[N]}}}function w(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:R,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function nS(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function iS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==wn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const b=T===ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==pn&&T!==bn&&!b&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Ct("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,maxSamples:_,samples:S}}function sS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Oi,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const m=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const M=r?0:i,y=M*4;let x=p.clippingState||null;c.value=x,x=u(m,h,y,d);for(let _=0;_!==y;++_)x[_]=e[_];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,m){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const p=d+v*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,x=d;y!==v;++y,x+=4)o.copy(f[y]).applyMatrix4(M,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const Ds=4,rS=6,oS=20,aS=256,lr=new no,Jf=new ct;let zc=null,Hc=0,Vc=0,Gc=!1;const cS=new P,$i=new P;class Qf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=cS}=r;zc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Vc=this._renderer.getActiveMipmapLevel(),Gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(zc,Hc,Vc),this._renderer.xr.enabled=Gc,t.scissorTest=!1,Ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ss||t.mapping===zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Vc=this._renderer.getActiveMipmapLevel(),Gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ke,minFilter:ke,generateMipmaps:!1,type:ln,format:wn,colorSpace:vn,depthBuffer:!1},s=jf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jf(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lS(r)),this._blurMaterial=hS(r,t,e),this._ggxMaterial=uS(r,t,e)}return s}_compileMaterial(t){const e=new Jt(new Qt,t);this._renderer.compile(e,lr)}_sceneToCubeUV(t,e,i,s,r){const c=new rn(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Jf),f.toneMapping=Qn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new $t,new je({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,p=!0):(g.color.copy(Jf),p=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[y],r.y,r.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[y]));const _=this._cubeSize;Ts(s,x*_,y>2?_:0,_,_),f.setRenderTarget(s),p&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ss||t.mapping===zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=td());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ts(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,lr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:m}=this,v=this._sizeLods[i],g=3*v*(i>m-Ds?i-m+Ds:0),p=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=m-e,Ts(r,g,p,3*v,2*v),s.setRenderTarget(r),s.render(a,lr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-i,Ts(t,g,p,3*v,2*v),s.setRenderTarget(t),s.render(a,lr)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Ds?s-this._lodMax+Ds:0),h=4*(this._cubeSize-u);Ts(e,f,h,3*u,2*u),o.setRenderTarget(e),o.render(c,lr)}}function lS(n){const t=[],e=[];let i=n;const s=n-Ds+1+rS;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);const a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,m=new Float32Array(d*h*f),v=new Float32Array(d*h*f);for(let p=0;p<f;p++){const M=p%3*2/3-1,y=p>2?0:-1,x=[M,y,0,M+2/3,y,0,M+2/3,y+1,0,M,y,0,M+2/3,y+1,0,M,y+1,0];m.set(x,d*h*p);for(let _=0;_<h;_++){const S=u[_*2]*2-1,T=u[_*2+1]*2-1;p===0?$i.set(1,T,S):p===1?$i.set(-S,1,-T):p===2?$i.set(-S,T,1):p===3?$i.set(-1,T,-S):p===4?$i.set(-S,-1,T):$i.set(S,T,-1),$i.toArray(v,(p*h+_)*d)}}const g=new Qt;g.setAttribute("position",new Nt(m,d)),g.setAttribute("outputDirection",new Nt(v,d)),e.push(new Jt(g,null)),i>Ds&&i--}return{lodMeshes:e,sizeLods:t}}function jf(n,t,e){const i=new on(n,t,e);return i.texture.mapping=Ha,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ts(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function uS(n,t,e){return new ie({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:aS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function hS(n,t,e){return new ie({name:"SphericalGaussianBlur",defines:{SAMPLES:oS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function td(){return new ie({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function ed(){return new ie({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function qa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ym extends on{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Em(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $t(5,5,5),r=new ie({name:"CubemapFromEquirect",uniforms:Ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ye,blending:Jn});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===di&&(e.minFilter=ke),new sM(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function fS(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===cc||d===lc)if(t.has(h)){const m=t.get(h).texture;return a(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const v=new Ym(m.height);return v.fromEquirectangularTexture(n,h),t.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const d=h.mapping,m=d===cc||d===lc,v=d===ss||d===zs;if(m||v){let g=e.get(h);const p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Qf(n)),g=m?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return m&&M&&M.height>0||v&&M&&c(M)?(i===null&&(i=new Qf(n)),g=m?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,d){return d===cc?h.mapping=ss:d===lc&&(h.mapping=zs),h}function c(h){let d=0;const m=6;for(let v=0;v<m;v++)h[v]!==void 0&&d++;return d===m}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function dS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Us("WebGLRenderer: "+i+" extension not supported."),s}}}function pS(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)t.update(h[d],n.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,m=f.attributes.position;let v=0;if(m===void 0)return;if(d!==null){const M=d.array;v=d.version;for(let y=0,x=M.length;y<x;y+=3){const _=M[y+0],S=M[y+1],T=M[y+2];h.push(_,S,S,T,T,_)}}else{const M=m.array;v=m.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const _=y+0,S=y+1,T=y+2;h.push(_,S,S,T,T,_)}}const g=new(m.count>=65535?ym:Mm)(h,1);g.version=v;const p=r.get(f);p&&t.remove(p),r.set(f,g)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function mS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*o),e.update(h,i,1)}function l(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*o,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=h[g];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function gS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Bt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function vS(n,t,e){const i=new WeakMap,s=new he;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let w=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let y=0;d===!0&&(y=1),m===!0&&(y=2),v===!0&&(y=3);let x=a.attributes.position.count*y,_=1;x>t.maxTextureSize&&(_=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const S=new Float32Array(x*_*4*f),T=new vm(S,x,_,f);T.type=bn,T.needsUpdate=!0;const b=y*4;for(let R=0;R<f;R++){const C=g[R],N=p[R],D=M[R],I=x*_*4*R;for(let U=0;U<C.count;U++){const z=U*b;d===!0&&(s.fromBufferAttribute(C,U),S[I+z+0]=s.x,S[I+z+1]=s.y,S[I+z+2]=s.z,S[I+z+3]=0),m===!0&&(s.fromBufferAttribute(N,U),S[I+z+4]=s.x,S[I+z+5]=s.y,S[I+z+6]=s.z,S[I+z+7]=0),v===!0&&(s.fromBufferAttribute(D,U),S[I+z+8]=s.x,S[I+z+9]=s.y,S[I+z+10]=s.z,S[I+z+11]=D.itemSize===4?s.w:1)}}h={count:f,texture:T,size:new rt(x,_)},i.set(a,h),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",m),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function xS(n,t,e,i,s){let r=new WeakMap;function o(l){const u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const _S={[Iu]:"LINEAR_TONE_MAPPING",[Du]:"REINHARD_TONE_MAPPING",[Uu]:"CINEON_TONE_MAPPING",[za]:"ACES_FILMIC_TONE_MAPPING",[Ou]:"AGX_TONE_MAPPING",[ku]:"NEUTRAL_TONE_MAPPING",[Fu]:"CUSTOM_TONE_MAPPING"};function MS(n,t,e,i,s,r){const o=new on(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Qt;l.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new qt([0,2,0,0,2,0],2));const u=new Bm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Jt(l,u),h=new no(-1,1,1,-1,0,1);let d=null,m=null,v=!1,g,p=null,M=[],y=!1;this.setSize=function(x,_){o.setSize(x,_),a!==null&&a.setSize(x,_),c!==null&&c.setSize(x,_);for(let S=0;S<M.length;S++){const T=M[S];T.setSize&&T.setSize(x,_)}},this.setEffects=function(x){M=x,y=M.length>0&&M[0].isRenderPass===!0;const _=o.width,S=o.height;M.length>0&&a===null&&(a=new on(_,S,{type:ln,depthBuffer:!1,stencilBuffer:!1}),c=new on(_,S,{type:ln,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<M.length;T++){const b=M[T];b.setSize&&b.setSize(_,S)}},this.begin=function(x,_){if(v||x.toneMapping===Qn&&M.length===0)return!1;if(p=_,_!==null){const S=_.width,T=_.height;(o.width!==S||o.height!==T)&&this.setSize(S,T)}return y===!1&&x.setRenderTarget(o),g=x.toneMapping,x.toneMapping=Qn,!0},this.hasRenderPass=function(){return y},this.end=function(x,_){x.toneMapping=g,v=!0;let S=o,T=a;for(let b=0;b<M.length;b++){const w=M[b];w.enabled!==!1&&(w.render(x,T,S,_),w.needsSwap!==!1&&(S=T,T=T===a?c:a))}if(d!==x.outputColorSpace||m!==x.toneMapping){d=x.outputColorSpace,m=x.toneMapping,u.defines={},te.getTransfer(d)===ue&&(u.defines.SRGB_TRANSFER="");const b=_S[m];b&&(u.defines[b]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,x.setRenderTarget(p),x.render(f,h),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const $m=new ze,du=new Gr(1,1),Zm=new vm,Jm=new Px,Qm=new Em,nd=[],id=[],sd=new Float32Array(16),rd=new Float32Array(9),od=new Float32Array(4);function Js(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=nd[s];if(r===void 0&&(r=new Float32Array(s),nd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function He(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ka(n,t){let e=id[t];e===void 0&&(e=new Int32Array(t),id[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function yS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function SS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function bS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function wS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function TS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;od.set(i),n.uniformMatrix2fv(this.addr,!1,od),Ve(e,i)}}function ES(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;rd.set(i),n.uniformMatrix3fv(this.addr,!1,rd),Ve(e,i)}}function AS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,i))return;sd.set(i),n.uniformMatrix4fv(this.addr,!1,sd),Ve(e,i)}}function RS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function CS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function PS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function LS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function NS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function IS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function DS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function US(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function FS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(du.compareFunction=e.isReversedDepthBuffer()?Ku:qu,r=du):r=$m,e.setTexture2D(t||r,s)}function OS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Jm,s)}function kS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Qm,s)}function BS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Zm,s)}function zS(n){switch(n){case 5126:return yS;case 35664:return SS;case 35665:return bS;case 35666:return wS;case 35674:return TS;case 35675:return ES;case 35676:return AS;case 5124:case 35670:return RS;case 35667:case 35671:return CS;case 35668:case 35672:return PS;case 35669:case 35673:return LS;case 5125:return NS;case 36294:return IS;case 36295:return DS;case 36296:return US;case 35678:case 36198:case 36298:case 36306:case 35682:return FS;case 35679:case 36299:case 36307:return OS;case 35680:case 36300:case 36308:case 36293:return kS;case 36289:case 36303:case 36311:case 36292:return BS}}function HS(n,t){n.uniform1fv(this.addr,t)}function VS(n,t){const e=Js(t,this.size,2);n.uniform2fv(this.addr,e)}function GS(n,t){const e=Js(t,this.size,3);n.uniform3fv(this.addr,e)}function WS(n,t){const e=Js(t,this.size,4);n.uniform4fv(this.addr,e)}function XS(n,t){const e=Js(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function qS(n,t){const e=Js(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function KS(n,t){const e=Js(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function YS(n,t){n.uniform1iv(this.addr,t)}function $S(n,t){n.uniform2iv(this.addr,t)}function ZS(n,t){n.uniform3iv(this.addr,t)}function JS(n,t){n.uniform4iv(this.addr,t)}function QS(n,t){n.uniform1uiv(this.addr,t)}function jS(n,t){n.uniform2uiv(this.addr,t)}function tb(n,t){n.uniform3uiv(this.addr,t)}function eb(n,t){n.uniform4uiv(this.addr,t)}function nb(n,t,e){const i=this.cache,s=t.length,r=Ka(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=du:o=$m;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function ib(n,t,e){const i=this.cache,s=t.length,r=Ka(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Jm,r[o])}function sb(n,t,e){const i=this.cache,s=t.length,r=Ka(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Qm,r[o])}function rb(n,t,e){const i=this.cache,s=t.length,r=Ka(e,s);He(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Zm,r[o])}function ob(n){switch(n){case 5126:return HS;case 35664:return VS;case 35665:return GS;case 35666:return WS;case 35674:return XS;case 35675:return qS;case 35676:return KS;case 5124:case 35670:return YS;case 35667:case 35671:return $S;case 35668:case 35672:return ZS;case 35669:case 35673:return JS;case 5125:return QS;case 36294:return jS;case 36295:return tb;case 36296:return eb;case 35678:case 36198:case 36298:case 36306:case 35682:return nb;case 35679:case 36299:case 36307:return ib;case 35680:case 36300:case 36308:case 36293:return sb;case 36289:case 36303:case 36311:case 36292:return rb}}class ab{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=zS(e.type)}}class cb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ob(e.type)}}class lb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Wc=/(\w+)(\])?(\[|\.)?/g;function ad(n,t){n.seq.push(t),n.map[t.id]=t}function ub(n,t,e){const i=n.name,s=i.length;for(Wc.lastIndex=0;;){const r=Wc.exec(i),o=Wc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ad(e,l===void 0?new ab(a,n,t):new cb(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new lb(a),ad(e,f)),e=f}}}class sa{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);ub(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function cd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const hb=37297;let fb=0;function db(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const ld=new Gt;function pb(n){te._getMatrix(ld,te.workingColorSpace,n);const t=`mat3( ${ld.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(n)){case Sa:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ud(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+db(n.getShaderSource(t),a)}else return r}function mb(n,t){const e=pb(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const gb={[Iu]:"Linear",[Du]:"Reinhard",[Uu]:"Cineon",[za]:"ACESFilmic",[Ou]:"AgX",[ku]:"Neutral",[Fu]:"Custom"};function vb(n,t){const e=gb[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ko=new P;function xb(){te.getLuminanceCoefficients(ko);const n=ko.x.toFixed(4),t=ko.y.toFixed(4),e=ko.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _b(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function Mb(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yb(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Sr(n){return n!==""}function hd(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Sb=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(n){return n.replace(Sb,wb)}const bb=new Map;function wb(n,t){let e=Vt[t];if(e===void 0){const i=bb.get(t);if(i!==void 0)e=Vt[i],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return pu(e)}const Tb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dd(n){return n.replace(Tb,Eb)}function Eb(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pd(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const Ab={[Jo]:"SHADOWMAP_TYPE_PCF",[_r]:"SHADOWMAP_TYPE_VSM"};function Rb(n){return Ab[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Cb={[ss]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE",[Ha]:"ENVMAP_TYPE_CUBE_UV"};function Pb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Cb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lb={[zs]:"ENVMAP_MODE_REFRACTION"};function Nb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Lb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ib={[Nu]:"ENVMAP_BLENDING_MULTIPLY",[Gv]:"ENVMAP_BLENDING_MIX",[Wv]:"ENVMAP_BLENDING_ADD"};function Db(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ib[n.combine]||"ENVMAP_BLENDING_NONE"}function Ub(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Fb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Rb(e),l=Pb(e),u=Nb(e),f=Db(e),h=Ub(e),d=_b(e),m=Mb(r),v=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Sr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Sr).join(`
`),p.length>0&&(p+=`
`)):(g=[pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),p=[pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qn?"#define TONE_MAPPING":"",e.toneMapping!==Qn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Qn?vb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,mb("linearToOutputTexel",e.outputColorSpace),xb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Sr).join(`
`)),o=pu(o),o=hd(o,e),o=fd(o,e),a=pu(a),a=hd(a,e),a=fd(a,e),o=dd(o),a=dd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===rf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+g+o,x=M+p+a,_=cd(s,s.VERTEX_SHADER,y),S=cd(s,s.FRAGMENT_SHADER,x);s.attachShader(v,_),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(C){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(v)||"",D=s.getShaderInfoLog(_)||"",I=s.getShaderInfoLog(S)||"",U=N.trim(),z=D.trim(),H=I.trim();let Q=!0,W=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,_,S);else{const Y=ud(s,_,"vertex"),tt=ud(s,S,"fragment");Bt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+Y+`
`+tt)}else U!==""?Ct("WebGLProgram: Program Info Log:",U):(z===""||H==="")&&(W=!1);W&&(C.diagnostics={runnable:Q,programLog:U,vertexShader:{log:z,prefix:g},fragmentShader:{log:H,prefix:p}})}s.deleteShader(_),s.deleteShader(S),b=new sa(s,v),w=yb(s,v)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,hb)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fb++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=_,this.fragmentShader=S,this}let Ob=0;class kb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Bb(t),e.set(t,i)),i}}class Bb{constructor(t){this.id=Ob++,this.code=t,this.usedTimes=0}}function zb(n){return n===rs||n===_a||n===Ma}function Hb(n,t,e,i,s,r){const o=new xm,a=new kb,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return c.add(b),b===0?"uv":`uv${b}`}function v(b,w,R,C,N,D){const I=C.fog,U=N.geometry,z=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,Q=t.get(b.envMap||z,H),W=Q&&Q.mapping===Ha?Q.image.height:null,Y=d[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&Ct("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const tt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,St=tt!==void 0?tt.length:0;let ut=0;U.morphAttributes.position!==void 0&&(ut=1),U.morphAttributes.normal!==void 0&&(ut=2),U.morphAttributes.color!==void 0&&(ut=3);let kt,zt,Wt,q;if(Y){const _e=Kn[Y];kt=_e.vertexShader,zt=_e.fragmentShader}else{kt=b.vertexShader,zt=b.fragmentShader;const _e=a.getVertexShaderStage(b),ce=a.getFragmentShaderStage(b);a.update(b,_e,ce),Wt=_e.id,q=ce.id}const J=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),it=N.isInstancedMesh===!0,ot=N.isBatchedMesh===!0,Ht=!!b.map,xe=!!b.matcap,Ot=!!Q,Ut=!!b.aoMap,re=!!b.lightMap,jt=!!b.bumpMap&&b.wireframe===!1,me=!!b.normalMap,Re=!!b.displacementMap,an=!!b.emissiveMap,Te=!!b.metalnessMap,Ne=!!b.roughnessMap,k=b.anisotropy>0,$e=b.clearcoat>0,fe=b.dispersion>0,L=b.retroreflectivity>0,E=b.iridescence>0,B=b.sheen>0,X=b.transmission>0,$=k&&!!b.anisotropyMap,at=$e&&!!b.clearcoatMap,ht=$e&&!!b.clearcoatNormalMap,Z=$e&&!!b.clearcoatRoughnessMap,et=E&&!!b.iridescenceMap,ft=E&&!!b.iridescenceThicknessMap,Pt=B&&!!b.sheenColorMap,gt=B&&!!b.sheenRoughnessMap,dt=!!b.specularMap,Lt=!!b.specularColorMap,Ft=!!b.specularIntensityMap,Xt=X&&!!b.transmissionMap,O=X&&!!b.thicknessMap,pt=!!b.gradientMap,j=!!b.alphaMap,mt=b.alphaTest>0,Mt=!!b.alphaHash,nt=!!b.extensions;let It=Qn;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(It=n.toneMapping);const At={shaderID:Y,shaderType:b.type,shaderName:b.name,vertexShader:kt,fragmentShader:zt,defines:b.defines,customVertexShaderID:Wt,customFragmentShaderID:q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:ot,batchingColor:ot&&N._colorsTexture!==null,instancing:it,instancingColor:it&&N.instanceColor!==null,instancingMorph:it&&N.morphTexture!==null,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:te.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ht,matcap:xe,envMap:Ot,envMapMode:Ot&&Q.mapping,envMapCubeUVHeight:W,aoMap:Ut,lightMap:re,bumpMap:jt,normalMap:me,displacementMap:Re,emissiveMap:an,normalMapObjectSpace:me&&b.normalMapType===$v,normalMapTangentSpace:me&&b.normalMapType===ya,packedNormalMap:me&&b.normalMapType===ya&&zb(b.normalMap.format),metalnessMap:Te,roughnessMap:Ne,anisotropy:k,anisotropyMap:$,clearcoat:$e,clearcoatMap:at,clearcoatNormalMap:ht,clearcoatRoughnessMap:Z,dispersion:fe,retroreflection:L,iridescence:E,iridescenceMap:et,iridescenceThicknessMap:ft,sheen:B,sheenColorMap:Pt,sheenRoughnessMap:gt,specularMap:dt,specularColorMap:Lt,specularIntensityMap:Ft,transmission:X,transmissionMap:Xt,thicknessMap:O,gradientMap:pt,opaque:b.transparent===!1&&b.blending===Tr&&b.alphaToCoverage===!1,alphaMap:j,alphaTest:mt,alphaHash:Mt,combine:b.combine,mapUv:Ht&&m(b.map.channel),aoMapUv:Ut&&m(b.aoMap.channel),lightMapUv:re&&m(b.lightMap.channel),bumpMapUv:jt&&m(b.bumpMap.channel),normalMapUv:me&&m(b.normalMap.channel),displacementMapUv:Re&&m(b.displacementMap.channel),emissiveMapUv:an&&m(b.emissiveMap.channel),metalnessMapUv:Te&&m(b.metalnessMap.channel),roughnessMapUv:Ne&&m(b.roughnessMap.channel),anisotropyMapUv:$&&m(b.anisotropyMap.channel),clearcoatMapUv:at&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:ht&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:gt&&m(b.sheenRoughnessMap.channel),specularMapUv:dt&&m(b.specularMap.channel),specularColorMapUv:Lt&&m(b.specularColorMap.channel),specularIntensityMapUv:Ft&&m(b.specularIntensityMap.channel),transmissionMapUv:Xt&&m(b.transmissionMap.channel),thicknessMapUv:O&&m(b.thicknessMap.channel),alphaMapUv:j&&m(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(me||k),vertexNormals:!!U.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(Ht||j),fog:!!I,useFog:b.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||U.attributes.normal===void 0&&me===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:yt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:ut,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:It,decodeVideoTexture:Ht&&b.map.isVideoTexture===!0&&te.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:an&&b.emissiveMap.isVideoTexture===!0&&te.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===be,flipSided:b.side===Ye,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:nt&&b.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&b.extensions.multiDraw===!0||ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function g(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const R in b.defines)w.push(R),w.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(p(w,b),M(w,b),w.push(n.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function p(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numSunLights),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numSunLightShadows),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function M(b,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),b.push(o.mask)}function y(b){const w=d[b.type];let R;if(w){const C=Kn[w];R=xn.clone(C.uniforms)}else R=b.uniforms;return R}function x(b,w){let R=u.get(w);return R!==void 0?++R.usedTimes:(R=new Fb(n,w,b,s),l.push(R),u.set(w,R)),R}function _(b){if(--b.usedTimes===0){const w=l.indexOf(b);l[w]=l[l.length-1],l.pop(),u.delete(b.cacheKey),b.destroy()}}function S(b){a.remove(b)}function T(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:y,acquireProgram:x,releaseProgram:_,releaseShaderCache:S,programs:l,dispose:T}}function Vb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Gb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function md(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function gd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,m,v,g,p){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:m,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:p},n[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=m,M.materialVariant=o(h),M.groupOrder=v,M.renderOrder=h.renderOrder,M.z=g,M.group=p),t++,M}function c(h,d,m,v,g,p,M){M.reversedDepth===!0&&(g=-g);const y=a(h,d,m,v,g,p);m.transmission>0?i.push(y):m.transparent===!0?s.push(y):e.push(y)}function l(h,d,m,v,g,p){const M=a(h,d,m,v,g,p);m.transmission>0?i.unshift(M):m.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,d){e.length>1&&e.sort(h||Gb),i.length>1&&i.sort(d||md),s.length>1&&s.sort(d||md)}function f(){for(let h=t,d=n.length;h<d;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function Wb(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new gd,n.set(i,[o])):s>=r.length?(o=new gd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Xb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new ct};break;case"SpotLight":e={position:new P,direction:new P,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function qb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Kb=0;function Yb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function $b(n){const t=new Xb,e=qb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);const s=new P,r=new Dt,o=new Dt;function a(l){let u=0,f=0,h=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let d=0,m=0,v=0,g=0,p=0,M=0,y=0,x=0,_=0,S=0,T=0,b=0,w=0,R=0;l.sort(Yb);for(let N=0,D=l.length;N<D;N++){const I=l[N],U=I.color,z=I.intensity,H=I.distance;let Q=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===rs?Q=I.shadow.map.texture:Q=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=U.r*z,f+=U.g*z,h+=U.b*z;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],z);R++}else if(I.isSunLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Y=I.shadow,tt=e.get(I);tt.shadowIntensity=Y.intensity,tt.shadowBias=Y.bias,tt.shadowNormalBias=Y.normalBias,tt.shadowRadius=Y.radius,tt.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),i.sunShadow[m]=tt,i.sunShadowMap[m]=Q;const St=Y.getViewportCount();for(let ut=0;ut<St;ut++)i.sunShadowMatrix[v+ut]=Y.getMatrix(ut),i.sunShadowCascade[v+ut]=Y._cascadeData[ut];v+=St,m++}i.sun[d]=W,d++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Y=I.shadow,tt=e.get(I);tt.shadowIntensity=Y.intensity,tt.shadowBias=Y.bias,tt.shadowNormalBias=Y.normalBias,tt.shadowRadius=Y.radius,tt.shadowMapSize=Y.mapSize,i.directionalShadow[g]=tt,i.directionalShadowMap[g]=Q,i.directionalShadowMatrix[g]=I.shadow.matrix,_++}i.directional[g]=W,g++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(U).multiplyScalar(z),W.distance=H,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[M]=W;const Y=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,Y.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[M]=Y.matrix,I.castShadow){const tt=e.get(I);tt.shadowIntensity=Y.intensity,tt.shadowBias=Y.bias,tt.shadowNormalBias=Y.normalBias,tt.shadowRadius=Y.radius,tt.shadowMapSize=Y.mapSize,i.spotShadow[M]=tt,i.spotShadowMap[M]=Q,T++}M++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(U).multiplyScalar(z),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[y]=W,y++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const Y=I.shadow,tt=e.get(I);tt.shadowIntensity=Y.intensity,tt.shadowBias=Y.bias,tt.shadowNormalBias=Y.normalBias,tt.shadowRadius=Y.radius,tt.shadowMapSize=Y.mapSize,tt.shadowCameraNear=Y.camera.near,tt.shadowCameraFar=Y.camera.far,i.pointShadow[p]=tt,i.pointShadowMap[p]=Q,i.pointShadowMatrix[p]=I.shadow.matrix,S++}i.point[p]=W,p++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(z),W.groundColor.copy(I.groundColor).multiplyScalar(z),i.hemi[x]=W,x++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const C=i.hash;(C.sunLength!==d||C.directionalLength!==g||C.pointLength!==p||C.spotLength!==M||C.rectAreaLength!==y||C.hemiLength!==x||C.numSunShadows!==m||C.numDirectionalShadows!==_||C.numPointShadows!==S||C.numSpotShadows!==T||C.numSpotMaps!==b||C.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=y,i.point.length=p,i.hemi.length=x,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.directionalShadowMatrix.length=_,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,C.sunLength=d,C.directionalLength=g,C.pointLength=p,C.spotLength=M,C.rectAreaLength=y,C.hemiLength=x,C.numSunShadows=m,C.numDirectionalShadows=_,C.numPointShadows=S,C.numSpotShadows=T,C.numSpotMaps=b,C.numLightProbes=R,i.version=Kb++)}function c(l,u){let f=0,h=0,d=0,m=0,v=0,g=0;const p=u.matrixWorldInverse;for(let M=0,y=l.length;M<y;M++){const x=l[M];if(x.isSunLight){const _=i.sun[f];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(p),f++}else if(x.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),h++}else if(x.isSpotLight){const _=i.spot[m];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),m++}else if(x.isRectAreaLight){const _=i.rectArea[v];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const _=i.hemi[g];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:i}}function vd(n){const t=new $b(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function o(h){e.push(h)}function a(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Zb(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new vd(n),t.set(s,[a])):r>=o.length?(a=new vd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Jb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qb=`uniform sampler2D shadow_pass;
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
}`,jb=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],tw=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],xd=new Dt,ur=new P,Xc=new P;function ew(n,t,e){let i=new Ga;const s=new rt,r=new rt,o=new he,a=new N_,c=new I_,l={},u=e.maxTextureSize,f={[_i]:Ye,[Ye]:_i,[be]:be},h=new ie({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Jb,fragmentShader:Qb}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const m=new Qt;m.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Jt(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let p=this.type;this.render=function(S,T,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===wv&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jo);const w=n.getRenderTarget(),R=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Jn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const D=p!==this.type;D&&T.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=S.length;I<U;I++){const z=S[I],H=z.shadow;if(H===void 0){Ct("WebGLShadowMap:",z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const Q=H.getFrameExtents();s.multiply(Q),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,H.mapSize.y=r.y));const W=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=W,H.map===null||D===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===_r){if(z.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new on(s.x,s.y,{format:rs,type:ln,minFilter:ke,magFilter:ke,generateMipmaps:!1}),H.map.texture.name=z.name+".shadowMap",H.map.depthTexture=new Gr(s.x,s.y,bn),H.map.depthTexture.name=z.name+".shadowMapDepth",H.map.depthTexture.format=Mi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Oe,H.map.depthTexture.magFilter=Oe}else z.isPointLight?(H.map=new Ym(s.x),H.map.depthTexture=new Qx(s.x,jn)):(H.map=new on(s.x,s.y),H.map.depthTexture=new Gr(s.x,s.y,jn)),H.map.depthTexture.name=z.name+".shadowMap",H.map.depthTexture.format=Mi,this.type===Jo?(H.map.depthTexture.compareFunction=W?Ku:qu,H.map.depthTexture.minFilter=ke,H.map.depthTexture.magFilter=ke):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Oe,H.map.depthTexture.magFilter=Oe);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);const Y=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();z.isPointLight!==!0&&H.updateMatrices(z,b);for(let tt=0;tt<Y;tt++){const St=H.getCamera(tt);if(z.isPointLight){const ut=H.camera,kt=H.matrix,zt=z.distance||ut.far;zt!==ut.far&&(ut.far=zt,ut.updateProjectionMatrix()),ur.setFromMatrixPosition(z.matrixWorld),ut.position.copy(ur),Xc.copy(ut.position),Xc.add(jb[tt]),ut.up.copy(tw[tt]),ut.lookAt(Xc),ut.updateMatrixWorld(),kt.makeTranslation(-ur.x,-ur.y,-ur.z),xd.multiplyMatrices(ut.projectionMatrix,ut.matrixWorldInverse),H._frustum.setFromProjectionMatrix(xd,ut.coordinateSystem,ut.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,tt),n.clear();else{tt===0&&(n.setRenderTarget(H.map),n.clear());const ut=H.getViewport(tt);o.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),N.viewport(o)}i=H.getFrustum(tt),x(T,b,St,z,this.type)}H.isPointLightShadow!==!0&&this.type===_r&&M(H,b),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(w,R,C)};function M(S,T){const b=t.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new on(s.x,s.y,{format:rs,type:ln}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(T,null,b,h,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(T,null,b,d,v,null)}function y(S,T,b,w){let R=null;const C=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)R=C;else if(R=b.isPointLight===!0?c:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=R.uuid,D=T.uuid;let I=l[N];I===void 0&&(I={},l[N]=I);let U=I[D];U===void 0&&(U=R.clone(),I[D]=U,T.addEventListener("dispose",_)),R=U}if(R.visible=T.visible,R.wireframe=T.wireframe,w===_r?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:f[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const N=n.properties.get(R);N.light=b}return R}function x(S,T,b,w,R){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===_r)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);const D=t.update(S),I=S.material;if(Array.isArray(I)){const U=D.groups;for(let z=0,H=U.length;z<H;z++){const Q=U[z],W=I[Q.materialIndex];if(W&&W.visible){const Y=y(S,W,w,R);S.onBeforeShadow(n,S,T,b,D,Y,Q),n.renderBufferDirect(b,null,D,Y,S,Q),S.onAfterShadow(n,S,T,b,D,Y,Q)}}}else if(I.visible){const U=y(S,I,w,R);S.onBeforeShadow(n,S,T,b,D,U,null),n.renderBufferDirect(b,null,D,U,S,null),S.onAfterShadow(n,S,T,b,D,U,null)}}const N=S.children;for(let D=0,I=N.length;D<I;D++)x(N[D],T,b,w,R)}function _(S){S.target.removeEventListener("dispose",_);for(const b in l){const w=l[b],R=S.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function nw(n,t){function e(){let O=!1;const pt=new he;let j=null;const mt=new he(0,0,0,0);return{setMask:function(Mt){j!==Mt&&!O&&(n.colorMask(Mt,Mt,Mt,Mt),j=Mt)},setLocked:function(Mt){O=Mt},setClear:function(Mt,nt,It,At,_e){_e===!0&&(Mt*=At,nt*=At,It*=At),pt.set(Mt,nt,It,At),mt.equals(pt)===!1&&(n.clearColor(Mt,nt,It,At),mt.copy(pt))},reset:function(){O=!1,j=null,mt.set(-1,0,0,0)}}}function i(){let O=!1,pt=!1,j=null,mt=null,Mt=null;return{setReversed:function(nt){if(pt!==nt){const It=t.get("EXT_clip_control");nt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),pt=nt;const At=Mt;Mt=null,this.setClear(At)}},getReversed:function(){return pt},setTest:function(nt){nt?J(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(nt){j!==nt&&!O&&(n.depthMask(nt),j=nt)},setFunc:function(nt){if(pt&&(nt=ax[nt]),mt!==nt){switch(nt){case Tl:n.depthFunc(n.NEVER);break;case El:n.depthFunc(n.ALWAYS);break;case Al:n.depthFunc(n.LESS);break;case Fr:n.depthFunc(n.LEQUAL);break;case Rl:n.depthFunc(n.EQUAL);break;case Cl:n.depthFunc(n.GEQUAL);break;case Pl:n.depthFunc(n.GREATER);break;case Ll:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}mt=nt}},setLocked:function(nt){O=nt},setClear:function(nt){Mt!==nt&&(Mt=nt,pt&&(nt=1-nt),n.clearDepth(nt))},reset:function(){O=!1,j=null,mt=null,Mt=null,pt=!1}}}function s(){let O=!1,pt=null,j=null,mt=null,Mt=null,nt=null,It=null,At=null,_e=null;return{setTest:function(ce){O||(ce?J(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(ce){pt!==ce&&!O&&(n.stencilMask(ce),pt=ce)},setFunc:function(ce,An,Vn){(j!==ce||mt!==An||Mt!==Vn)&&(n.stencilFunc(ce,An,Vn),j=ce,mt=An,Mt=Vn)},setOp:function(ce,An,Vn){(nt!==ce||It!==An||At!==Vn)&&(n.stencilOp(ce,An,Vn),nt=ce,It=An,At=Vn)},setLocked:function(ce){O=ce},setClear:function(ce){_e!==ce&&(n.clearStencil(ce),_e=ce)},reset:function(){O=!1,pt=null,j=null,mt=null,Mt=null,nt=null,It=null,At=null,_e=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,m=[],v=null,g=!1,p=null,M=null,y=null,x=null,_=null,S=null,T=null,b=new ct(0,0,0),w=0,R=!1,C=null,N=null,D=null,I=null,U=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Q=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=Q>=2);let Y=null,tt={};const St=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),kt=new he().fromArray(St),zt=new he().fromArray(ut);function Wt(O,pt,j,mt){const Mt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(O,nt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let It=0;It<j;It++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,mt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(pt+It,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return nt}const q={};q[n.TEXTURE_2D]=Wt(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=Wt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=Wt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=Wt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(Fr),jt(!1),me(Zh),J(n.CULL_FACE),Ut(Jn);function J(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function yt(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function it(O,pt){return h[O]!==pt?(n.bindFramebuffer(O,pt),h[O]=pt,O===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=pt),O===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function ot(O,pt){let j=m,mt=!1;if(O){j=d.get(pt),j===void 0&&(j=[],d.set(pt,j));const Mt=O.textures;if(j.length!==Mt.length||j[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,It=Mt.length;nt<It;nt++)j[nt]=n.COLOR_ATTACHMENT0+nt;j.length=Mt.length,mt=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,mt=!0);mt&&n.drawBuffers(j)}function Ht(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const xe={[Ls]:n.FUNC_ADD,[Ev]:n.FUNC_SUBTRACT,[Av]:n.FUNC_REVERSE_SUBTRACT};xe[Rv]=n.MIN,xe[Cv]=n.MAX;const Ot={[Pv]:n.ZERO,[Lv]:n.ONE,[Nv]:n.SRC_COLOR,[sm]:n.SRC_ALPHA,[kv]:n.SRC_ALPHA_SATURATE,[Fv]:n.DST_COLOR,[Dv]:n.DST_ALPHA,[Iv]:n.ONE_MINUS_SRC_COLOR,[rm]:n.ONE_MINUS_SRC_ALPHA,[Ov]:n.ONE_MINUS_DST_COLOR,[Uv]:n.ONE_MINUS_DST_ALPHA,[Bv]:n.CONSTANT_COLOR,[zv]:n.ONE_MINUS_CONSTANT_COLOR,[Hv]:n.CONSTANT_ALPHA,[Vv]:n.ONE_MINUS_CONSTANT_ALPHA};function Ut(O,pt,j,mt,Mt,nt,It,At,_e,ce){if(O===Jn){g===!0&&(yt(n.BLEND),g=!1);return}if(g===!1&&(J(n.BLEND),g=!0),O!==Tv){if(O!==p||ce!==R){if((M!==Ls||_!==Ls)&&(n.blendEquation(n.FUNC_ADD),M=Ls,_=Ls),ce)switch(O){case Tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gn:n.blendFunc(n.ONE,n.ONE);break;case Jh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Bt("WebGLState: Invalid blending: ",O);break}else switch(O){case Tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jh:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qh:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",O);break}y=null,x=null,S=null,T=null,b.set(0,0,0),w=0,p=O,R=ce}return}Mt=Mt||pt,nt=nt||j,It=It||mt,(pt!==M||Mt!==_)&&(n.blendEquationSeparate(xe[pt],xe[Mt]),M=pt,_=Mt),(j!==y||mt!==x||nt!==S||It!==T)&&(n.blendFuncSeparate(Ot[j],Ot[mt],Ot[nt],Ot[It]),y=j,x=mt,S=nt,T=It),(At.equals(b)===!1||_e!==w)&&(n.blendColor(At.r,At.g,At.b,_e),b.copy(At),w=_e),p=O,R=!1}function re(O,pt){O.side===be?yt(n.CULL_FACE):J(n.CULL_FACE);let j=O.side===Ye;pt&&(j=!j),jt(j),O.blending===Tr&&O.transparent===!1?Ut(Jn):Ut(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const mt=O.stencilWrite;a.setTest(mt),mt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),an(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function jt(O){C!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),C=O)}function me(O){O!==Sv?(J(n.CULL_FACE),O!==N&&(O===Zh?n.cullFace(n.BACK):O===bv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),N=O}function Re(O){O!==D&&(H&&n.lineWidth(O),D=O)}function an(O,pt,j){O?(J(n.POLYGON_OFFSET_FILL),(I!==pt||U!==j)&&(I=pt,U=j,o.getReversed()&&(pt=-pt),n.polygonOffset(pt,j))):yt(n.POLYGON_OFFSET_FILL)}function Te(O){O?J(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Ne(O){O===void 0&&(O=n.TEXTURE0+z-1),Y!==O&&(n.activeTexture(O),Y=O)}function k(O,pt,j){j===void 0&&(Y===null?j=n.TEXTURE0+z-1:j=Y);let mt=tt[j];mt===void 0&&(mt={type:void 0,texture:void 0},tt[j]=mt),(mt.type!==O||mt.texture!==pt)&&(Y!==j&&(n.activeTexture(j),Y=j),n.bindTexture(O,pt||q[O]),mt.type=O,mt.texture=pt)}function $e(){const O=tt[Y];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function fe(){try{n.compressedTexImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function L(){try{n.compressedTexImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function E(){try{n.texSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function B(){try{n.texSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function $(){try{n.compressedTexSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function at(){try{n.texStorage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ht(){try{n.texStorage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function Z(){try{n.texImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function et(){try{n.texImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ft(O){return f[O]!==void 0?f[O]:n.getParameter(O)}function Pt(O,pt){f[O]!==pt&&(n.pixelStorei(O,pt),f[O]=pt)}function gt(O){kt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),kt.copy(O))}function dt(O){zt.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),zt.copy(O))}function Lt(O,pt){let j=l.get(pt);j===void 0&&(j=new WeakMap,l.set(pt,j));let mt=j.get(O);mt===void 0&&(mt=n.getUniformBlockIndex(pt,O.name),j.set(O,mt))}function Ft(O,pt){const mt=l.get(pt).get(O);c.get(pt)!==mt&&(n.uniformBlockBinding(pt,mt,O.__bindingPointIndex),c.set(pt,mt))}function Xt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},Y=null,tt={},h={},d=new WeakMap,m=[],v=null,g=!1,p=null,M=null,y=null,x=null,_=null,S=null,T=null,b=new ct(0,0,0),w=0,R=!1,C=null,N=null,D=null,I=null,U=null,kt.set(0,0,n.canvas.width,n.canvas.height),zt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:yt,bindFramebuffer:it,drawBuffers:ot,useProgram:Ht,setBlending:Ut,setMaterial:re,setFlipSided:jt,setCullFace:me,setLineWidth:Re,setPolygonOffset:an,setScissorTest:Te,activeTexture:Ne,bindTexture:k,unbindTexture:$e,compressedTexImage2D:fe,compressedTexImage3D:L,texImage2D:Z,texImage3D:et,pixelStorei:Pt,getParameter:ft,updateUBOMapping:Lt,uniformBlockBinding:Ft,texStorage2D:at,texStorage3D:ht,texSubImage2D:E,texSubImage3D:B,compressedTexSubImage2D:X,compressedTexSubImage3D:$,scissor:gt,viewport:dt,reset:Xt}}function iw(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,E){return m?new OffscreenCanvas(L,E):Vr("canvas")}function g(L,E,B){let X=1;const $=fe(L);if(($.width>B||$.height>B)&&(X=B/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const at=Math.floor(X*$.width),ht=Math.floor(X*$.height);h===void 0&&(h=v(at,ht));const Z=E?v(at,ht):h;return Z.width=at,Z.height=ht,Z.getContext("2d").drawImage(L,0,0,at,ht),Ct("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+at+"x"+ht+")."),Z}else return"data"in L&&Ct("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),L;return L}function p(L){return L.generateMipmaps}function M(L){n.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(L,E,B,X,$,at=!1){if(L!==null){if(n[L]!==void 0)return n[L];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ht;X&&(ht=t.get("EXT_texture_norm16"),ht||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=E;if(E===n.RED&&(B===n.FLOAT&&(Z=n.R32F),B===n.HALF_FLOAT&&(Z=n.R16F),B===n.UNSIGNED_BYTE&&(Z=n.R8),B===n.UNSIGNED_SHORT&&ht&&(Z=ht.R16_EXT),B===n.SHORT&&ht&&(Z=ht.R16_SNORM_EXT)),E===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.R8UI),B===n.UNSIGNED_SHORT&&(Z=n.R16UI),B===n.UNSIGNED_INT&&(Z=n.R32UI),B===n.BYTE&&(Z=n.R8I),B===n.SHORT&&(Z=n.R16I),B===n.INT&&(Z=n.R32I)),E===n.RG&&(B===n.FLOAT&&(Z=n.RG32F),B===n.HALF_FLOAT&&(Z=n.RG16F),B===n.UNSIGNED_BYTE&&(Z=n.RG8),B===n.UNSIGNED_SHORT&&ht&&(Z=ht.RG16_EXT),B===n.SHORT&&ht&&(Z=ht.RG16_SNORM_EXT)),E===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RG8UI),B===n.UNSIGNED_SHORT&&(Z=n.RG16UI),B===n.UNSIGNED_INT&&(Z=n.RG32UI),B===n.BYTE&&(Z=n.RG8I),B===n.SHORT&&(Z=n.RG16I),B===n.INT&&(Z=n.RG32I)),E===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),B===n.UNSIGNED_INT&&(Z=n.RGB32UI),B===n.BYTE&&(Z=n.RGB8I),B===n.SHORT&&(Z=n.RGB16I),B===n.INT&&(Z=n.RGB32I)),E===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),B===n.UNSIGNED_INT&&(Z=n.RGBA32UI),B===n.BYTE&&(Z=n.RGBA8I),B===n.SHORT&&(Z=n.RGBA16I),B===n.INT&&(Z=n.RGBA32I)),E===n.RGB&&(B===n.UNSIGNED_SHORT&&ht&&(Z=ht.RGB16_EXT),B===n.SHORT&&ht&&(Z=ht.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),E===n.RGBA){const et=at?Sa:te.getTransfer($);B===n.FLOAT&&(Z=n.RGBA32F),B===n.HALF_FLOAT&&(Z=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Z=et===ue?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ht&&(Z=ht.RGBA16_EXT),B===n.SHORT&&ht&&(Z=ht.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(L,E){let B;return L?E===null||E===jn||E===kr?B=n.DEPTH24_STENCIL8:E===bn?B=n.DEPTH32F_STENCIL8:E===Or&&(B=n.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===jn||E===kr?B=n.DEPTH_COMPONENT24:E===bn?B=n.DEPTH_COMPONENT32F:E===Or&&(B=n.DEPTH_COMPONENT16),B}function S(L,E){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==Oe&&L.minFilter!==ke?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function T(L){const E=L.target;E.removeEventListener("dispose",T),w(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&f.delete(E)}function b(L){const E=L.target;E.removeEventListener("dispose",b),C(E)}function w(L){const E=i.get(L);if(E.__webglInit===void 0)return;const B=L.source,X=d.get(B);if(X){const $=X[E.__cacheKey];$.usedTimes--,$.usedTimes===0&&R(L),Object.keys(X).length===0&&d.delete(B)}i.remove(L)}function R(L){const E=i.get(L);n.deleteTexture(E.__webglTexture);const B=L.source,X=d.get(B);delete X[E.__cacheKey],o.memory.textures--}function C(L){const E=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(E.__webglFramebuffer[X]))for(let $=0;$<E.__webglFramebuffer[X].length;$++)n.deleteFramebuffer(E.__webglFramebuffer[X][$]);else n.deleteFramebuffer(E.__webglFramebuffer[X]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[X])}else{if(Array.isArray(E.__webglFramebuffer))for(let X=0;X<E.__webglFramebuffer.length;X++)n.deleteFramebuffer(E.__webglFramebuffer[X]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let X=0;X<E.__webglColorRenderbuffer.length;X++)E.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[X]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const B=L.textures;for(let X=0,$=B.length;X<$;X++){const at=i.get(B[X]);at.__webglTexture&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(B[X])}i.remove(L)}let N=0;function D(){N=0}function I(){return N}function U(L){N=L}function z(){const L=N;return L>=s.maxTextures&&Ct("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,L}function H(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function Q(L,E){const B=i.get(L);if(L.isVideoTexture&&k(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&B.__version!==L.version){const X=L.image;if(X===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(B,L,E);return}}else L.isExternalTexture&&(B.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+E)}function W(L,E){const B=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&B.__version!==L.version){yt(B,L,E);return}else L.isExternalTexture&&(B.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+E)}function Y(L,E){const B=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&B.__version!==L.version){yt(B,L,E);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+E)}function tt(L,E){const B=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&B.__version!==L.version){it(B,L,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+E)}const St={[Hs]:n.REPEAT,[Yn]:n.CLAMP_TO_EDGE,[xa]:n.MIRRORED_REPEAT},ut={[Oe]:n.NEAREST,[am]:n.NEAREST_MIPMAP_NEAREST,[Mr]:n.NEAREST_MIPMAP_LINEAR,[ke]:n.LINEAR,[Qo]:n.LINEAR_MIPMAP_NEAREST,[di]:n.LINEAR_MIPMAP_LINEAR},kt={[Jv]:n.NEVER,[nx]:n.ALWAYS,[Qv]:n.LESS,[qu]:n.LEQUAL,[jv]:n.EQUAL,[Ku]:n.GEQUAL,[tx]:n.GREATER,[ex]:n.NOTEQUAL};function zt(L,E){if(E.type===bn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===ke||E.magFilter===Qo||E.magFilter===Mr||E.magFilter===di||E.minFilter===ke||E.minFilter===Qo||E.minFilter===Mr||E.minFilter===di)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,St[E.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,St[E.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,St[E.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,ut[E.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,ut[E.minFilter]),E.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,kt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Oe||E.minFilter!==Mr&&E.minFilter!==di||E.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(L,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Wt(L,E){let B=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",T));const X=E.source;let $=d.get(X);$===void 0&&($={},d.set(X,$));const at=H(E);if(at!==L.__cacheKey){$[at]===void 0&&($[at]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),$[at].usedTimes++;const ht=$[L.__cacheKey];ht!==void 0&&($[L.__cacheKey].usedTimes--,ht.usedTimes===0&&R(E)),L.__cacheKey=at,L.__webglTexture=$[at].texture}return B}function q(L,E,B){return Math.floor(Math.floor(L/B)/E)}function J(L,E,B,X){const at=L.updateRanges;if(at.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,B,X,E.data);else{at.sort((Pt,gt)=>Pt.start-gt.start);let ht=0;for(let Pt=1;Pt<at.length;Pt++){const gt=at[ht],dt=at[Pt],Lt=gt.start+gt.count,Ft=q(dt.start,E.width,4),Xt=q(gt.start,E.width,4);dt.start<=Lt+1&&Ft===Xt&&q(dt.start+dt.count-1,E.width,4)===Ft?gt.count=Math.max(gt.count,dt.start+dt.count-gt.start):(++ht,at[ht]=dt)}at.length=ht+1;const Z=e.getParameter(n.UNPACK_ROW_LENGTH),et=e.getParameter(n.UNPACK_SKIP_PIXELS),ft=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let Pt=0,gt=at.length;Pt<gt;Pt++){const dt=at[Pt],Lt=Math.floor(dt.start/4),Ft=Math.ceil(dt.count/4),Xt=Lt%E.width,O=Math.floor(Lt/E.width),pt=Ft,j=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,Xt,O,pt,j,B,X,E.data)}L.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Z),e.pixelStorei(n.UNPACK_SKIP_PIXELS,et),e.pixelStorei(n.UNPACK_SKIP_ROWS,ft)}}function yt(L,E,B){let X=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(X=n.TEXTURE_3D);const $=Wt(L,E),at=E.source;e.bindTexture(X,L.__webglTexture,n.TEXTURE0+B);const ht=i.get(at);if(at.version!==ht.__version||$===!0){if(e.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const j=te.getPrimaries(te.workingColorSpace),mt=E.colorSpace===Bi?null:te.getPrimaries(E.colorSpace),Mt=E.colorSpace===Bi||j===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment);let et=g(E.image,!1,s.maxTextureSize);et=$e(E,et);const ft=r.convert(E.format,E.colorSpace),Pt=r.convert(E.type);let gt=x(E.internalFormat,ft,Pt,E.normalized,E.colorSpace,E.isVideoTexture);zt(X,E);let dt;const Lt=E.mipmaps,Ft=E.isVideoTexture!==!0,Xt=ht.__version===void 0||$===!0,O=at.dataReady,pt=S(E,et);if(E.isDepthTexture)gt=_(E.format===es,E.type),Xt&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,gt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,gt,et.width,et.height,0,ft,Pt,null));else if(E.isDataTexture)if(Lt.length>0){Ft&&Xt&&e.texStorage2D(n.TEXTURE_2D,pt,gt,Lt[0].width,Lt[0].height);for(let j=0,mt=Lt.length;j<mt;j++)dt=Lt[j],Ft?O&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,dt.width,dt.height,ft,Pt,dt.data):e.texImage2D(n.TEXTURE_2D,j,gt,dt.width,dt.height,0,ft,Pt,dt.data);E.generateMipmaps=!1}else Ft?(Xt&&e.texStorage2D(n.TEXTURE_2D,pt,gt,et.width,et.height),O&&J(E,et,ft,Pt)):e.texImage2D(n.TEXTURE_2D,0,gt,et.width,et.height,0,ft,Pt,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ft&&Xt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,gt,Lt[0].width,Lt[0].height,et.depth);for(let j=0,mt=Lt.length;j<mt;j++)if(dt=Lt[j],E.format!==wn)if(ft!==null)if(Ft){if(O)if(E.layerUpdates.size>0){const Mt=Zf(dt.width,dt.height,E.format,E.type);for(const nt of E.layerUpdates){const It=dt.data.subarray(nt*Mt/dt.data.BYTES_PER_ELEMENT,(nt+1)*Mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,nt,dt.width,dt.height,1,ft,It)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,dt.width,dt.height,et.depth,ft,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,gt,dt.width,dt.height,et.depth,0,dt.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,dt.width,dt.height,et.depth,ft,Pt,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,j,gt,dt.width,dt.height,et.depth,0,ft,Pt,dt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ft&&Xt&&e.texStorage2D(n.TEXTURE_2D,pt,gt,Lt[0].width,Lt[0].height);for(let j=0,mt=Lt.length;j<mt;j++)dt=Lt[j],E.format!==wn?ft!==null?Ft?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,j,gt,dt.width,dt.height,0,dt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?O&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,dt.width,dt.height,ft,Pt,dt.data):e.texImage2D(n.TEXTURE_2D,j,gt,dt.width,dt.height,0,ft,Pt,dt.data)}else if(E.isDataArrayTexture)if(Ft){if(Xt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,gt,et.width,et.height,et.depth),O)if(E.layerUpdates.size>0){const j=Zf(et.width,et.height,E.format,E.type);for(const mt of E.layerUpdates){const Mt=et.data.subarray(mt*j/et.data.BYTES_PER_ELEMENT,(mt+1)*j/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,mt,et.width,et.height,1,ft,Pt,Mt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,Pt,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,gt,et.width,et.height,et.depth,0,ft,Pt,et.data);else if(E.isData3DTexture)Ft?(Xt&&e.texStorage3D(n.TEXTURE_3D,pt,gt,et.width,et.height,et.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,Pt,et.data)):e.texImage3D(n.TEXTURE_3D,0,gt,et.width,et.height,et.depth,0,ft,Pt,et.data);else if(E.isFramebufferTexture){if(Xt)if(Ft)e.texStorage2D(n.TEXTURE_2D,pt,gt,et.width,et.height);else{let j=et.width,mt=et.height;for(let Mt=0;Mt<pt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,gt,j,mt,0,ft,Pt,null),j>>=1,mt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),et.parentNode!==j){j.appendChild(et),f.add(E),j.onpaint=mt=>{const Mt=mt.changedElements;for(const nt of f)Mt.includes(nt.image)&&(nt.needsUpdate=!0)},j.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,et);else{const Mt=n.RGBA,nt=n.RGBA,It=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Mt,nt,It,et)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Ft&&Xt){const j=fe(Lt[0]);e.texStorage2D(n.TEXTURE_2D,pt,gt,j.width,j.height)}for(let j=0,mt=Lt.length;j<mt;j++)dt=Lt[j],Ft?O&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,ft,Pt,dt):e.texImage2D(n.TEXTURE_2D,j,gt,ft,Pt,dt);E.generateMipmaps=!1}else if(Ft){if(Xt){const j=fe(et);e.texStorage2D(n.TEXTURE_2D,pt,gt,j.width,j.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Pt,et)}else e.texImage2D(n.TEXTURE_2D,0,gt,ft,Pt,et);p(E)&&M(X),ht.__version=at.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function it(L,E,B){if(E.image.length!==6)return;const X=Wt(L,E),$=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+B);const at=i.get($);if($.version!==at.__version||X===!0){e.activeTexture(n.TEXTURE0+B);const ht=te.getPrimaries(te.workingColorSpace),Z=E.colorSpace===Bi?null:te.getPrimaries(E.colorSpace),et=E.colorSpace===Bi||ht===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const ft=E.isCompressedTexture||E.image[0].isCompressedTexture,Pt=E.image[0]&&E.image[0].isDataTexture,gt=[];for(let nt=0;nt<6;nt++)!ft&&!Pt?gt[nt]=g(E.image[nt],!0,s.maxCubemapSize):gt[nt]=Pt?E.image[nt].image:E.image[nt],gt[nt]=$e(E,gt[nt]);const dt=gt[0],Lt=r.convert(E.format,E.colorSpace),Ft=r.convert(E.type),Xt=x(E.internalFormat,Lt,Ft,E.normalized,E.colorSpace),O=E.isVideoTexture!==!0,pt=at.__version===void 0||X===!0,j=$.dataReady;let mt=S(E,dt);zt(n.TEXTURE_CUBE_MAP,E);let Mt;if(ft){O&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Xt,dt.width,dt.height);for(let nt=0;nt<6;nt++){Mt=gt[nt].mipmaps;for(let It=0;It<Mt.length;It++){const At=Mt[It];E.format!==wn?Lt!==null?O?j&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,At.width,At.height,Lt,At.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,Xt,At.width,At.height,0,At.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,At.width,At.height,Lt,Ft,At.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,Xt,At.width,At.height,0,Lt,Ft,At.data)}}}else{if(Mt=E.mipmaps,O&&pt){Mt.length>0&&mt++;const nt=fe(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Xt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Pt){O?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,gt[nt].width,gt[nt].height,Lt,Ft,gt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Xt,gt[nt].width,gt[nt].height,0,Lt,Ft,gt[nt].data);for(let It=0;It<Mt.length;It++){const _e=Mt[It].image[nt].image;O?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,_e.width,_e.height,Lt,Ft,_e.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,Xt,_e.width,_e.height,0,Lt,Ft,_e.data)}}else{O?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Lt,Ft,gt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Xt,Lt,Ft,gt[nt]);for(let It=0;It<Mt.length;It++){const At=Mt[It];O?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,Lt,Ft,At.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,Xt,Lt,Ft,At.image[nt])}}}p(E)&&M(n.TEXTURE_CUBE_MAP),at.__version=$.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ot(L,E,B,X,$,at){const ht=r.convert(B.format,B.colorSpace),Z=r.convert(B.type),et=x(B.internalFormat,ht,Z,B.normalized,B.colorSpace),ft=i.get(E),Pt=i.get(B);if(Pt.__renderTarget=E,!ft.__hasExternalTextures){const gt=Math.max(1,E.width>>at),dt=Math.max(1,E.height>>at);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?e.texImage3D($,at,et,gt,dt,E.depth,0,ht,Z,null):e.texImage2D($,at,et,gt,dt,0,ht,Z,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),Ne(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,$,Pt.__webglTexture,0,Te(E)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,$,Pt.__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ht(L,E,B){if(n.bindRenderbuffer(n.RENDERBUFFER,L),E.depthBuffer){const X=E.depthTexture,$=X&&X.isDepthTexture?X.type:null,at=_(E.stencilBuffer,$),ht=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ne(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),at,E.width,E.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),at,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,at,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,L)}else{const X=E.textures;for(let $=0;$<X.length;$++){const at=X[$],ht=r.convert(at.format,at.colorSpace),Z=r.convert(at.type),et=x(at.internalFormat,ht,Z,at.normalized,at.colorSpace);Ne(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(E),et,E.width,E.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(E),et,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,et,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function xe(L,E,B){const X=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=i.get(E.depthTexture);if($.__renderTarget=E,(!$.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),X){if($.__webglInit===void 0&&($.__webglInit=!0,E.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),zt(n.TEXTURE_CUBE_MAP,E.depthTexture);const ft=r.convert(E.depthTexture.format),Pt=r.convert(E.depthTexture.type);let gt;E.depthTexture.format===Mi?gt=n.DEPTH_COMPONENT24:E.depthTexture.format===es&&(gt=n.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,gt,E.width,E.height,0,ft,Pt,null)}}else Q(E.depthTexture,0);const at=$.__webglTexture,ht=Te(E),Z=X?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,et=E.depthTexture.format===es?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===Mi)Ne(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Z,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Z,at,0);else if(E.depthTexture.format===es)Ne(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,Z,at,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,et,Z,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ot(L){const E=i.get(L),B=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){const X=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),X){const $=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),E.__depthDisposeCallback=$}E.__boundDepthTexture=X}if(L.depthTexture&&!E.__autoAllocateDepthBuffer)if(B)for(let X=0;X<6;X++)xe(E.__webglFramebuffer[X],L,X);else{const X=L.texture.mipmaps;X&&X.length>0?xe(E.__webglFramebuffer[0],L,0):xe(E.__webglFramebuffer,L,0)}else if(B){E.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[X]),E.__webglDepthbuffer[X]===void 0)E.__webglDepthbuffer[X]=n.createRenderbuffer(),Ht(E.__webglDepthbuffer[X],L,!1);else{const $=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,at)}}else{const X=L.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),Ht(E.__webglDepthbuffer,L,!1);else{const $=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,at)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(L,E,B){const X=i.get(L);E!==void 0&&ot(X.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ot(L)}function re(L){const E=L.texture,B=i.get(L),X=i.get(E);L.addEventListener("dispose",b);const $=L.textures,at=L.isWebGLCubeRenderTarget===!0,ht=$.length>1;if(ht||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=E.version,o.memory.textures++),at){B.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[Z]=[];for(let et=0;et<E.mipmaps.length;et++)B.__webglFramebuffer[Z][et]=n.createFramebuffer()}else B.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let Z=0;Z<E.mipmaps.length;Z++)B.__webglFramebuffer[Z]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Z=0,et=$.length;Z<et;Z++){const ft=i.get($[Z]);ft.__webglTexture===void 0&&(ft.__webglTexture=n.createTexture(),o.memory.textures++)}if(L.samples>0&&Ne(L)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Z=0;Z<$.length;Z++){const et=$[Z];B.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[Z]);const ft=r.convert(et.format,et.colorSpace),Pt=r.convert(et.type),gt=x(et.internalFormat,ft,Pt,et.normalized,et.colorSpace,L.isXRRenderTarget===!0),dt=Te(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,gt,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,B.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ht(B.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),zt(n.TEXTURE_CUBE_MAP,E);for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)ot(B.__webglFramebuffer[Z][et],L,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et);else ot(B.__webglFramebuffer[Z],L,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(E)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Z=0,et=$.length;Z<et;Z++){const ft=$[Z],Pt=i.get(ft);let gt=n.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(gt=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,Pt.__webglTexture),zt(gt,ft),ot(B.__webglFramebuffer,L,ft,n.COLOR_ATTACHMENT0+Z,gt,0),p(ft)&&M(gt)}e.unbindTexture()}else{let Z=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Z=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Z,X.__webglTexture),zt(Z,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)ot(B.__webglFramebuffer[et],L,E,n.COLOR_ATTACHMENT0,Z,et);else ot(B.__webglFramebuffer,L,E,n.COLOR_ATTACHMENT0,Z,0);p(E)&&M(Z),e.unbindTexture()}L.depthBuffer&&Ot(L)}function jt(L){const E=L.textures;for(let B=0,X=E.length;B<X;B++){const $=E[B];if(p($)){const at=y(L),ht=i.get($).__webglTexture;e.bindTexture(at,ht),M(at),e.unbindTexture()}}}const me=[],Re=[];function an(L){if(L.samples>0){if(Ne(L)===!1){const E=L.textures,B=L.width,X=L.height;let $=n.COLOR_BUFFER_BIT;const at=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(L),Z=E.length>1;if(Z)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const et=L.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(L.resolveDepthBuffer&&(L.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Pt=i.get(E[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,B,X,0,0,B,X,$,n.NEAREST),c===!0&&(me.length=0,Re.length=0,me.push(n.COLOR_ATTACHMENT0+ft),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(me.push(at),Re.push(at),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,ht.__webglColorRenderbuffer[ft]);const Pt=i.get(E[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const E=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Te(L){return Math.min(s.maxSamples,L.samples)}function Ne(L){const E=i.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function k(L){const E=o.render.frame;u.get(L)!==E&&(u.set(L,E),L.update())}function $e(L,E){const B=L.colorSpace,X=L.format,$=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||B!==vn&&B!==Bi&&(te.getTransfer(B)===ue?(X!==wn||$!==pn)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",B)),E}function fe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=D,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=Q,this.setTexture2DArray=W,this.setTexture3D=Y,this.setTextureCube=tt,this.rebindTextures=Ut,this.setupRenderTarget=re,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=an,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function sw(n,t){function e(i,s=Bi){let r;const o=te.getTransfer(s);if(i===pn)return n.UNSIGNED_BYTE;if(i===zu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Hu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===um)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===hm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===cm)return n.BYTE;if(i===lm)return n.SHORT;if(i===Or)return n.UNSIGNED_SHORT;if(i===Bu)return n.INT;if(i===jn)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===ln)return n.HALF_FLOAT;if(i===fm)return n.ALPHA;if(i===dm)return n.RGB;if(i===wn)return n.RGBA;if(i===Mi)return n.DEPTH_COMPONENT;if(i===es)return n.DEPTH_STENCIL;if(i===Vu)return n.RED;if(i===Gu)return n.RED_INTEGER;if(i===rs)return n.RG;if(i===Wu)return n.RG_INTEGER;if(i===Xu)return n.RGBA_INTEGER;if(i===jo||i===ta||i===ea||i===na)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Nl||i===Il||i===Dl||i===Ul)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Nl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Dl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fl||i===Ol||i===kl||i===Bl||i===zl||i===_a||i===Hl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fl||i===Ol)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===kl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Bl)return r.COMPRESSED_R11_EAC;if(i===zl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_a)return r.COMPRESSED_RG11_EAC;if(i===Hl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Vl||i===Gl||i===Wl||i===Xl||i===ql||i===Kl||i===Yl||i===$l||i===Zl||i===Jl||i===Ql||i===jl||i===tu||i===eu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Vl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Gl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Wl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Xl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ql)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Kl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$l)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Zl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Jl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ql)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===jl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===tu)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===eu)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===nu||i===iu||i===su)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===nu)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===iu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===su)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ru||i===ou||i===Ma||i===au)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ru)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ou)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===au)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===kr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const rw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ow=`
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

}`;class aw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Am(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ie({vertexShader:rw,fragmentShader:ow,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new zn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cw extends as{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,m=null;const v=typeof XRWebGLBinding<"u",g=new aw,p={},M=e.getContextAttributes();let y=null,x=null;const _=[],S=[],T=new rt;let b=null,w=null;const R=new rn;R.viewport=new he;const C=new rn;C.viewport=new he;const N=[R,C],D=new rM;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=_[q];return J===void 0&&(J=new vc,_[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=_[q];return J===void 0&&(J=new vc,_[q]=J),J.getGripSpace()},this.getHand=function(q){let J=_[q];return J===void 0&&(J=new vc,_[q]=J),J.getHandSpace()};function z(q){const J=S.indexOf(q.inputSource);if(J===-1)return;const yt=_[J];yt!==void 0&&(yt.update(q.inputSource,q.frame,l||o),yt.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",Q);for(let q=0;q<_.length;q++){const J=S[q];J!==null&&(S[q]=null,_[q].disconnect(J))}I=null,U=null,g.reset();for(const q in p)delete p[q];if(t.setRenderTarget(y),d=null,h=null,f=null,s=null,x=null,Wt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(T.width,T.height,!1),w!==null){const q=w.camera;q.fov=w.fov,q.zoom=w.zoom,q.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",H),s.addEventListener("inputsourceschange",Q),M.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,it=null,ot=null;M.depth&&(ot=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=M.stencil?es:Mi,it=M.stencil?kr:jn);const Ht={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ht),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),x=new on(h.textureWidth,h.textureHeight,{format:wn,type:pn,depthTexture:new Gr(h.textureWidth,h.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const yt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new on(d.framebufferWidth,d.framebufferHeight,{format:wn,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Wt.setContext(s),Wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(q){for(let J=0;J<q.removed.length;J++){const yt=q.removed[J],it=S.indexOf(yt);it>=0&&(S[it]=null,_[it].disconnect(yt))}for(let J=0;J<q.added.length;J++){const yt=q.added[J];let it=S.indexOf(yt);if(it===-1){for(let Ht=0;Ht<_.length;Ht++)if(Ht>=S.length){S.push(yt),it=Ht;break}else if(S[Ht]===null){S[Ht]=yt,it=Ht;break}if(it===-1)break}const ot=_[it];ot&&ot.connect(yt)}}const W=new P,Y=new P;function tt(q,J,yt){W.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(yt.matrixWorld);const it=W.distanceTo(Y),ot=J.projectionMatrix.elements,Ht=yt.projectionMatrix.elements,xe=ot[14]/(ot[10]-1),Ot=ot[14]/(ot[10]+1),Ut=(ot[9]+1)/ot[5],re=(ot[9]-1)/ot[5],jt=(ot[8]-1)/ot[0],me=(Ht[8]+1)/Ht[0],Re=xe*jt,an=xe*me,Te=it/(-jt+me),Ne=Te*-jt;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ne),q.translateZ(Te),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ot[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const k=xe+Te,$e=Ot+Te,fe=Re-Ne,L=an+(it-Ne),E=Ut*Ot/$e*k,B=re*Ot/$e*k;q.projectionMatrix.makePerspective(fe,L,E,B,k,$e),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function St(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let J=q.near,yt=q.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),D.near=C.near=R.near=J,D.far=C.far=R.far=yt,(I!==D.near||U!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,U=D.far),D.layers.mask=q.layers.mask|6,R.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const it=q.parent,ot=D.cameras;St(D,it);for(let Ht=0;Ht<ot.length;Ht++)St(ot[Ht],it);ot.length===2?tt(D,R,C):D.projectionMatrix.copy(R.projectionMatrix),w===null&&q.isPerspectiveCamera&&(w={camera:q,fov:q.fov,zoom:q.zoom}),ut(q,D,it)};function ut(q,J,yt){yt===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(yt.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Vs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(q){return p[q]};let kt=null;function zt(q,J){if(u=J.getViewerPose(l||o),m=J,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let it=!1;yt.length!==D.cameras.length&&(D.cameras.length=0,it=!0);for(let Ot=0;Ot<yt.length;Ot++){const Ut=yt[Ot];let re=null;if(d!==null)re=d.getViewport(Ut);else{const me=f.getViewSubImage(h,Ut);re=me.viewport,Ot===0&&(t.setRenderTargetTextures(x,me.colorTexture,me.depthStencilTexture),t.setRenderTarget(x))}let jt=N[Ot];jt===void 0&&(jt=new rn,jt.layers.enable(Ot),jt.viewport=new he,N[Ot]=jt),jt.matrix.fromArray(Ut.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(Ut.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(re.x,re.y,re.width,re.height),Ot===0&&(D.matrix.copy(jt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),it===!0&&D.cameras.push(jt)}const ot=s.enabledFeatures;if(ot&&ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const Ot=f.getDepthInformation(yt[0]);Ot&&Ot.isValid&&Ot.texture&&g.init(Ot,s.renderState)}if(ot&&ot.includes("camera-access")&&v){t.state.unbindTexture(),f=i.getBinding();for(let Ot=0;Ot<yt.length;Ot++){const Ut=yt[Ot].camera;if(Ut){let re=p[Ut];re||(re=new Am,p[Ut]=re);const jt=f.getCameraImage(Ut);re.sourceTexture=jt}}}}for(let yt=0;yt<_.length;yt++){const it=S[yt],ot=_[yt];it!==null&&ot!==void 0&&ot.update(it,J,l||o)}kt&&kt(q,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),m=null}const Wt=new qm;Wt.setAnimationLoop(zt),this.setAnimationLoop=function(q){kt=q},this.dispose=function(){}}}const lw=new Dt,jm=new Gt;jm.set(-1,0,0,0,1,0,0,0,1);function uw(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,km(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,y,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&d(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,y):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ye&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ye&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,x=M.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(lw.makeRotationFromEuler(x)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(jm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function hw(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,_){const S=_.program;i.uniformBlockBinding(x,S)}function l(x,_){let S=s[x.id];S===void 0&&(g(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",M));const T=_.program;i.updateUBOMapping(x,T);const b=t.render.frame;r[x.id]!==b&&(h(x),r[x.id]=b)}function u(x){const _=f();x.__bindingPointIndex=_;const S=n.createBuffer(),T=x.__size,b=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,T,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,S),S}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const _=s[x.id],S=x.uniforms,T=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let b=0,w=S.length;b<w;b++){const R=S[b];if(Array.isArray(R))for(let C=0,N=R.length;C<N;C++)d(R[C],b,C,T);else d(R,b,0,T)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,_,S,T){if(v(x,_,S,T)===!0){const b=x.__offset,w=x.value;if(Array.isArray(w)){let R=0;for(let C=0;C<w.length;C++){const N=w[C],D=p(N);m(N,x.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,x.__data)}}function m(x,_,S){typeof x=="number"||typeof x=="boolean"?_[0]=x:x.isMatrix3?(_[0]=x.elements[0],_[1]=x.elements[1],_[2]=x.elements[2],_[3]=0,_[4]=x.elements[3],_[5]=x.elements[4],_[6]=x.elements[5],_[7]=0,_[8]=x.elements[6],_[9]=x.elements[7],_[10]=x.elements[8],_[11]=0):ArrayBuffer.isView(x)?_.set(new x.constructor(x.buffer,x.byteOffset,_.length)):x.toArray(_,S)}function v(x,_,S,T){const b=x.value,w=_+"_"+S;if(T[w]===void 0)return typeof b=="number"||typeof b=="boolean"?T[w]=b:ArrayBuffer.isView(b)?T[w]=b.slice():T[w]=b.clone(),!0;{const R=T[w];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return T[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(R.equals(b)===!1)return R.copy(b),!0}}return!1}function g(x){const _=x.uniforms;let S=0;const T=16;for(let w=0,R=_.length;w<R;w++){const C=Array.isArray(_[w])?_[w]:[_[w]];for(let N=0,D=C.length;N<D;N++){const I=C[N],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,H=U.length;z<H;z++){const Q=U[z],W=p(Q),Y=S%T,tt=Y%W.boundary,St=Y+tt;S+=tt,St!==0&&T-St<W.storage&&(S+=T-St),I.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=W.storage}}}const b=S%T;return b>0&&(S+=T-b),x.__size=S,x.__cache={},this}function p(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(_.boundary=16,_.storage=x.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",x),_}function M(x){const _=x.target;_.removeEventListener("dispose",M);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function y(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:y}}const fw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xn=null;function dw(){return Xn===null&&(Xn=new Qu(fw,16,16,rs,ln),Xn.name="DFG_LUT",Xn.minFilter=ke,Xn.magFilter=ke,Xn.wrapS=Yn,Xn.wrapT=Yn,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}class pw{constructor(t={}){const{canvas:e=rx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=pn}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const v=d,g=new Set([Xu,Wu,Gu]),p=new Set([pn,jn,Or,kr,zu,Hu]),M=new Uint32Array(4),y=new Int32Array(4),x=new P;let _=null,S=null;const T=[],b=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let C=!1,N=null,D=null,I=null,U=null;this._outputColorSpace=Fe;let z=0,H=0,Q=null,W=-1,Y=null;const tt=new he,St=new he;let ut=null;const kt=new ct(0);let zt=0,Wt=e.width,q=e.height,J=1,yt=null,it=null;const ot=new he(0,0,Wt,q),Ht=new he(0,0,Wt,q);let xe=!1;const Ot=new Ga;let Ut=!1,re=!1;const jt=new Dt,me=new P,Re=new he,an={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function Ne(){return Q===null?J:1}let k=i;function $e(A,F){return e.getContext(A,F)}let fe,L,E,B,X,$,at,ht,Z,et,ft,Pt,gt,dt,Lt,Ft,Xt,O,pt,j,mt,Mt,nt;try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Lu}`),e.addEventListener("webglcontextlost",_e,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",An,!1),k===null){const F="webgl2";if(k=$e(F,A),k===null)throw $e(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(A){throw e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",An,!1),Bt("WebGLRenderer: "+A.message),A}function It(){fe=new dS(k),fe.init(),mt=new sw(k,fe),L=new iS(k,fe,t,mt),E=new nw(k,fe),L.reversedDepthBuffer&&h&&E.buffers.depth.setReversed(!0),D=k.createFramebuffer(),I=k.createFramebuffer(),U=k.createFramebuffer(),B=new gS(k),X=new Vb,$=new iw(k,fe,E,X,L,mt,B),at=new fS(R),ht=new xM(k),Mt=new eS(k,ht),Z=new pS(k,ht,B,Mt),et=new xS(k,Z,ht,Mt,B),O=new vS(k,L,$),Lt=new sS(X),ft=new Hb(R,at,fe,L,Mt,Lt),Pt=new uw(R,X),gt=new Wb,dt=new Zb(fe),Xt=new tS(R,at,E,et,m,c),Ft=new ew(R,et,L),nt=new hw(k,B,L,E),pt=new nS(k,fe,B),j=new mS(k,fe,B),B.programs=ft.programs,R.capabilities=L,R.extensions=fe,R.properties=X,R.renderLists=gt,R.shadowMap=Ft,R.state=E,R.info=B}v!==pn&&(w=new MS(v,e.width,e.height,a,s,r));const At=new cw(R,k);this.xr=At,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const A=fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(A){A!==void 0&&(J=A,this.setSize(Wt,q,!1))},this.getSize=function(A){return A.set(Wt,q)},this.setSize=function(A,F,K=!0){if(At.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}Wt=A,q=F,e.width=Math.floor(A*J),e.height=Math.floor(F*J),K===!0&&(e.style.width=A+"px",e.style.height=F+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(Wt*J,q*J).floor()},this.setDrawingBufferSize=function(A,F,K){Wt=A,q=F,J=K,e.width=Math.floor(A*K),e.height=Math.floor(F*K),this.setViewport(0,0,A,F)},this.setEffects=function(A){if(v===pn){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let F=0;F<A.length;F++)if(A[F].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(tt)},this.getViewport=function(A){return A.copy(ot)},this.setViewport=function(A,F,K,V){A.isVector4?ot.set(A.x,A.y,A.z,A.w):ot.set(A,F,K,V),E.viewport(tt.copy(ot).multiplyScalar(J).round())},this.getScissor=function(A){return A.copy(Ht)},this.setScissor=function(A,F,K,V){A.isVector4?Ht.set(A.x,A.y,A.z,A.w):Ht.set(A,F,K,V),E.scissor(St.copy(Ht).multiplyScalar(J).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(A){E.setScissorTest(xe=A)},this.setOpaqueSort=function(A){yt=A},this.setTransparentSort=function(A){it=A},this.getClearColor=function(A){return A.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(A=!0,F=!0,K=!0){let V=0;if(A){let G=!1;if(Q!==null){const xt=Q.texture.format;G=g.has(xt)}if(G){const xt=Q.texture.type,wt=p.has(xt),vt=Xt.getClearColor(),Tt=Xt.getClearAlpha(),Rt=vt.r,Kt=vt.g,ne=vt.b;wt?(M[0]=Rt,M[1]=Kt,M[2]=ne,M[3]=Tt,k.clearBufferuiv(k.COLOR,0,M)):(y[0]=Rt,y[1]=Kt,y[2]=ne,y[3]=Tt,k.clearBufferiv(k.COLOR,0,y))}else V|=k.COLOR_BUFFER_BIT}F&&(V|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(V|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&k.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),N=A},this.dispose=function(){e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",An,!1),Xt.dispose(),gt.dispose(),dt.dispose(),X.dispose(),at.dispose(),et.dispose(),Mt.dispose(),nt.dispose(),ft.dispose(),At.dispose(),At.removeEventListener("sessionstart",Ah),At.removeEventListener("sessionend",Rh),Wi.stop()};function _e(A){A.preventDefault(),ba("WebGLRenderer: Context Lost."),C=!0}function ce(){ba("WebGLRenderer: Context Restored."),C=!1;const A=B.autoReset,F=Ft.enabled,K=Ft.autoUpdate,V=Ft.needsUpdate,G=Ft.type;It(),B.autoReset=A,Ft.enabled=F,Ft.autoUpdate=K,Ft.needsUpdate=V,Ft.type=G}function An(A){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Vn(A){const F=A.target;F.removeEventListener("dispose",Vn),K0(F)}function K0(A){Y0(A),X.remove(A)}function Y0(A){const F=X.get(A).programs;F!==void 0&&(F.forEach(function(K){ft.releaseProgram(K)}),A.isShaderMaterial&&ft.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,K,V,G,xt){F===null&&(F=an);const wt=G.isMesh&&G.matrixWorld.determinantAffine()<0,vt=J0(A,F,K,V,G);E.setMaterial(V,wt);let Tt=K.index,Rt=1;if(V.wireframe===!0){if(Tt=Z.getWireframeAttribute(K),Tt===void 0)return;Rt=2}const Kt=K.drawRange,ne=K.attributes.position;let Et=Kt.start*Rt,le=(Kt.start+Kt.count)*Rt;xt!==null&&(Et=Math.max(Et,xt.start*Rt),le=Math.min(le,(xt.start+xt.count)*Rt)),Tt!==null?(Et=Math.max(Et,0),le=Math.min(le,Tt.count)):ne!=null&&(Et=Math.max(Et,0),le=Math.min(le,ne.count));const Ie=le-Et;if(Ie<0||Ie===1/0)return;Mt.setup(G,V,vt,K,Tt);let ye,ve=pt;if(Tt!==null&&(ye=ht.get(Tt),ve=j,ve.setIndex(ye)),G.isMesh)V.wireframe===!0?(E.setLineWidth(V.wireframeLinewidth*Ne()),ve.setMode(k.LINES)):ve.setMode(k.TRIANGLES);else if(G.isLine){let Ze=V.linewidth;Ze===void 0&&(Ze=1),E.setLineWidth(Ze*Ne()),G.isLineSegments?ve.setMode(k.LINES):G.isLineLoop?ve.setMode(k.LINE_LOOP):ve.setMode(k.LINE_STRIP)}else G.isPoints?ve.setMode(k.POINTS):G.isSprite&&ve.setMode(k.TRIANGLES);if(G.isBatchedMesh)if(fe.get("WEBGL_multi_draw"))ve.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ze=G._multiDrawStarts,bt=G._multiDrawCounts,en=G._multiDrawCount,oe=Tt?ht.get(Tt).bytesPerElement:1,_n=X.get(V).currentProgram.getUniforms();for(let Gn=0;Gn<en;Gn++)_n.setValue(k,"_gl_DrawID",Gn),ve.render(Ze[Gn]/oe,bt[Gn])}else if(G.isInstancedMesh)ve.renderInstances(Et,Ie,G.count);else if(K.isInstancedBufferGeometry){const Ze=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,bt=Math.min(K.instanceCount,Ze);ve.renderInstances(Et,Ie,bt)}else ve.render(Et,Ie)};function Eh(A,F,K,V){N!==null&&A.isNodeMaterial&&N.setObject(V,A),Ut===!0&&Lt.setState(A,K,!1),A.transparent===!0&&A.side===be&&A.forceSinglePass===!1?(A.side=Ye,A.needsUpdate=!0,ro(A,F,V),A.side=_i,A.needsUpdate=!0,ro(A,F,V),A.side=be):ro(A,F,V)}this.compile=function(A,F,K=null){K===null&&(K=A),N!==null&&N.renderStart(A,F,K),S=dt.get(K),S.init(F),b.push(S),K.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),A!==K&&A.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),re=this.localClippingEnabled,Ut=Lt.init(this.clippingPlanes,re),Ut===!0&&Lt.setGlobalState(this.clippingPlanes,F),N!==null&&Ft.render(S.state.shadowsArray,K,F);const V=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const xt=G.material;if(xt)if(Array.isArray(xt))for(let wt=0;wt<xt.length;wt++){const vt=xt[wt];Eh(vt,K,F,G),V.add(vt)}else Eh(xt,K,F,G),V.add(xt)}),S=b.pop(),N!==null&&N.renderEnd(),V},this.compileAsync=function(A,F,K=null){const V=this.compile(A,F,K);return new Promise(G=>{function xt(){if(V.forEach(function(wt){const Tt=X.get(wt).currentProgram;(Tt===void 0||Tt.isReady())&&V.delete(wt)}),V.size===0){G(A);return}setTimeout(xt,10)}fe.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ja=null;function $0(A){ja&&ja(A)}function Ah(){Wi.stop()}function Rh(){Wi.start()}const Wi=new qm;Wi.setAnimationLoop($0),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(A){ja=A,At.setAnimationLoop(A),A===null?Wi.stop():Wi.start()},At.addEventListener("sessionstart",Ah),At.addEventListener("sessionend",Rh),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(A,F);const K=At.enabled===!0&&At.isPresenting===!0,V=w!==null&&(Q===null||K)&&w.begin(R,Q);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(F),F=At.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,F,Q),S=dt.get(A,b.length),S.init(F),S.state.textureUnits=$.getTextureUnits(),b.push(S),jt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ot.setFromProjectionMatrix(jt,$n,F.reversedDepth),re=this.localClippingEnabled,Ut=Lt.init(this.clippingPlanes,re),_=gt.get(A,T.length),_.init(),T.push(_),At.enabled===!0&&At.isPresenting===!0){const wt=R.xr.getDepthSensingMesh();wt!==null&&tc(wt,F,-1/0,R.sortObjects)}tc(A,F,0,R.sortObjects),_.finish(),N!==null&&N.updateLights(S.state.lightsArray),R.sortObjects===!0&&_.sort(yt,it),Te=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,Te&&Xt.addToRenderList(_,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ut===!0&&Lt.beginShadows();const G=S.state.shadowsArray;if(Ft.render(G,A,F),Ut===!0&&Lt.endShadows(),(V&&w.hasRenderPass())===!1){const wt=_.opaque,vt=_.transmissive;if(S.setupLights(),F.isArrayCamera){const Tt=F.cameras;if(vt.length>0)for(let Rt=0,Kt=Tt.length;Rt<Kt;Rt++){const ne=Tt[Rt];Ph(wt,vt,A,ne)}Te&&Xt.render(A);for(let Rt=0,Kt=Tt.length;Rt<Kt;Rt++){const ne=Tt[Rt];Ch(_,A,ne,ne.viewport)}}else vt.length>0&&Ph(wt,vt,A,F),Te&&Xt.render(A),Ch(_,A,F)}Q!==null&&H===0&&($.updateMultisampleRenderTarget(Q),$.updateRenderTargetMipmap(Q)),V&&w.end(R),A.isScene===!0&&A.onAfterRender(R,A,F),Mt.resetDefaultState(),W=-1,Y=null,b.pop(),b.length>0?(S=b[b.length-1],$.setTextureUnits(S.state.textureUnits),Ut===!0&&Lt.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?_=T[T.length-1]:_=null,N!==null&&N.renderEnd()};function tc(A,F,K,V){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Ot)){V&&Re.setFromMatrixPosition(A.matrixWorld).applyMatrix4(jt);const wt=et.update(A),vt=A.material;vt.visible&&_.push(A,wt,vt,K,Re.z,null,F)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Ot))){const wt=et.update(A),vt=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Re.copy(A.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Re.copy(wt.boundingSphere.center)),Re.applyMatrix4(A.matrixWorld).applyMatrix4(jt)),Array.isArray(vt)){const Tt=wt.groups;for(let Rt=0,Kt=Tt.length;Rt<Kt;Rt++){const ne=Tt[Rt],Et=vt[ne.materialIndex];Et&&Et.visible&&_.push(A,wt,Et,K,Re.z,ne,F)}}else vt.visible&&_.push(A,wt,vt,K,Re.z,null,F)}}const xt=A.children;for(let wt=0,vt=xt.length;wt<vt;wt++)tc(xt[wt],F,K,V)}function Ch(A,F,K,V){const{opaque:G,transmissive:xt,transparent:wt}=A;S.setupLightsView(K),Ut===!0&&Lt.setGlobalState(R.clippingPlanes,K),V&&E.viewport(tt.copy(V)),G.length>0&&so(G,F,K),xt.length>0&&so(xt,F,K),wt.length>0&&so(wt,F,K),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function Ph(A,F,K,V){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[V.id]===void 0){const Et=fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[V.id]=new on(1,1,{generateMipmaps:!0,type:Et?ln:pn,minFilter:di,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:te.workingColorSpace})}const xt=S.state.transmissionRenderTarget[V.id],wt=V.viewport||tt;xt.setSize(wt.z*R.transmissionResolutionScale,wt.w*R.transmissionResolutionScale);const vt=R.getRenderTarget(),Tt=R.getActiveCubeFace(),Rt=R.getActiveMipmapLevel();R.setRenderTarget(xt),R.getClearColor(kt),zt=R.getClearAlpha(),zt<1&&R.setClearColor(16777215,.5),R.clear(),Te&&Xt.render(K);const Kt=R.toneMapping;R.toneMapping=Qn;const ne=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),Ut===!0&&Lt.setGlobalState(R.clippingPlanes,V),so(A,K,V),$.updateMultisampleRenderTarget(xt),$.updateRenderTargetMipmap(xt),fe.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let le=0,Ie=F.length;le<Ie;le++){const ye=F[le],{object:ve,geometry:Ze,material:bt,group:en}=ye;if(bt.side===be&&ve.layers.test(V.layers)){const oe=bt.side;bt.side=Ye,bt.needsUpdate=!0,Lh(ve,K,V,Ze,bt,en),bt.side=oe,bt.needsUpdate=!0,Et=!0}}Et===!0&&($.updateMultisampleRenderTarget(xt),$.updateRenderTargetMipmap(xt))}R.setRenderTarget(vt,Tt,Rt),R.setClearColor(kt,zt),ne!==void 0&&(V.viewport=ne),R.toneMapping=Kt}function so(A,F,K){const V=F.isScene===!0?F.overrideMaterial:null;for(let G=0,xt=A.length;G<xt;G++){const wt=A[G],{object:vt,geometry:Tt,group:Rt}=wt;let Kt=wt.material;Kt.allowOverride===!0&&V!==null&&(Kt=V),vt.layers.test(K.layers)&&Lh(vt,F,K,Tt,Kt,Rt)}}function Lh(A,F,K,V,G,xt){N!==null&&G.isNodeMaterial&&N.setObject(A,G),A.onBeforeRender(R,F,K,V,G,xt),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(R,F,K,V,A,xt),G.transparent===!0&&G.side===be&&G.forceSinglePass===!1?(G.side=Ye,G.needsUpdate=!0,R.renderBufferDirect(K,F,V,G,A,xt),G.side=_i,G.needsUpdate=!0,R.renderBufferDirect(K,F,V,G,A,xt),G.side=be):R.renderBufferDirect(K,F,V,G,A,xt),A.onAfterRender(R,F,K,V,G,xt)}function ro(A,F,K){F.isScene!==!0&&(F=an);const V=X.get(A),G=S.state.lights,xt=S.state.shadowsArray,wt=G.state.version,vt=ft.getParameters(A,G.state,xt,F,K,S.state.lightProbeGridArray),Tt=ft.getProgramCacheKey(vt);let Rt=V.programs;V.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;const Kt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;V.envMap=at.get(A.envMap||V.environment,Kt),V.envMapRotation=V.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Rt===void 0&&(A.addEventListener("dispose",Vn),Rt=new Map,V.programs=Rt);let ne=Rt.get(Tt);if(ne!==void 0){if(V.currentProgram===ne&&V.lightsStateVersion===wt)return Ih(A,vt),ne}else vt.uniforms=ft.getUniforms(A),N!==null&&A.isNodeMaterial&&N.build(A,K,vt),A.onBeforeCompile(vt,R),ne=ft.acquireProgram(vt,Tt),Rt.set(Tt,ne),V.uniforms=vt.uniforms;const Et=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Et.clippingPlanes=Lt.uniform),Ih(A,vt),V.needsLights=j0(A),V.lightsStateVersion=wt,V.needsLights&&(Et.ambientLightColor.value=G.state.ambient,Et.lightProbe.value=G.state.probe,Et.sunLights.value=G.state.sun,Et.sunLightShadows.value=G.state.sunShadow,Et.directionalLights.value=G.state.directional,Et.directionalLightShadows.value=G.state.directionalShadow,Et.spotLights.value=G.state.spot,Et.spotLightShadows.value=G.state.spotShadow,Et.rectAreaLights.value=G.state.rectArea,Et.ltc_1.value=G.state.rectAreaLTC1,Et.ltc_2.value=G.state.rectAreaLTC2,Et.pointLights.value=G.state.point,Et.pointLightShadows.value=G.state.pointShadow,Et.hemisphereLights.value=G.state.hemi,Et.sunShadowMatrix.value=G.state.sunShadowMatrix,Et.sunShadowCascade.value=G.state.sunShadowCascade,Et.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Et.spotLightMatrix.value=G.state.spotLightMatrix,Et.spotLightMap.value=G.state.spotLightMap,Et.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=S.state.lightProbeGridArray.length>0,V.currentProgram=ne,V.uniformsList=null,ne}function Nh(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=sa.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Ih(A,F){const K=X.get(A);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function Z0(A,F){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let K=0,V=A.length;K<V;K++){const G=A[K];if(G.texture!==null&&G.boundingBox.containsPoint(x))return G}return null}function J0(A,F,K,V,G){F.isScene!==!0&&(F=an),$.resetTextureUnits();const xt=F.fog,wt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,vt=Q===null?R.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:te.workingColorSpace,Tt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Rt=at.get(V.envMap||wt,Tt),Kt=V.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ne=!!K.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Et=!!K.morphAttributes.position,le=!!K.morphAttributes.normal,Ie=!!K.morphAttributes.color;let ye=Qn;V.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ye=R.toneMapping);const ve=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Ze=ve!==void 0?ve.length:0,bt=X.get(V),en=S.state.lights;if(Ut===!0&&(re===!0||A!==Y)){const Me=A===Y&&V.id===W;Lt.setState(V,A,Me)}let oe=!1;V.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==en.state.version||bt.outputColorSpace!==vt||G.isBatchedMesh&&bt.batching===!1||!G.isBatchedMesh&&bt.batching===!0||G.isBatchedMesh&&bt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&bt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&bt.instancing===!1||!G.isInstancedMesh&&bt.instancing===!0||G.isSkinnedMesh&&bt.skinning===!1||!G.isSkinnedMesh&&bt.skinning===!0||G.isInstancedMesh&&bt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&bt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&bt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&bt.instancingMorph===!1&&G.morphTexture!==null||bt.envMap!==Rt||V.fog===!0&&bt.fog!==xt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Lt.numPlanes||bt.numIntersection!==Lt.numIntersection)||bt.vertexAlphas!==Kt||bt.vertexTangents!==ne||bt.morphTargets!==Et||bt.morphNormals!==le||bt.morphColors!==Ie||bt.toneMapping!==ye||bt.morphTargetsCount!==Ze||!!bt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,bt.__version=V.version);let _n=bt.currentProgram;oe===!0&&(_n=ro(V,F,G),N&&V.isNodeMaterial&&N.onUpdateProgram(V,_n,bt));let Gn=!1,wi=!1,ls=!1;const ge=_n.getUniforms(),Ce=bt.uniforms;if(E.useProgram(_n.program)&&(Gn=!0,wi=!0,ls=!0),V.id!==W&&(W=V.id,wi=!0),bt.needsLights){const Me=Z0(S.state.lightProbeGridArray,G);bt.lightProbeGrid!==Me&&(bt.lightProbeGrid=Me,wi=!0)}if(Gn||Y!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ge.setValue(k,"projectionMatrix",A.projectionMatrix),ge.setValue(k,"viewMatrix",A.matrixWorldInverse);const Ei=ge.map.cameraPosition;Ei!==void 0&&Ei.setValue(k,me.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&ge.setValue(k,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ge.setValue(k,"isOrthographic",A.isOrthographicCamera===!0),Y!==A&&(Y=A,wi=!0,ls=!0)}if(bt.needsLights&&(en.state.sunShadowMap.length>0&&ge.setValue(k,"sunShadowMap",en.state.sunShadowMap,$),en.state.directionalShadowMap.length>0&&ge.setValue(k,"directionalShadowMap",en.state.directionalShadowMap,$),en.state.spotShadowMap.length>0&&ge.setValue(k,"spotShadowMap",en.state.spotShadowMap,$),en.state.pointShadowMap.length>0&&ge.setValue(k,"pointShadowMap",en.state.pointShadowMap,$)),G.isSkinnedMesh){ge.setOptional(k,G,"bindMatrix"),ge.setOptional(k,G,"bindMatrixInverse");const Me=G.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),ge.setValue(k,"boneTexture",Me.boneTexture,$))}G.isBatchedMesh&&(ge.setOptional(k,G,"batchingTexture"),ge.setValue(k,"batchingTexture",G._matricesTexture,$),ge.setOptional(k,G,"batchingIdTexture"),ge.setValue(k,"batchingIdTexture",G._indirectTexture,$),ge.setOptional(k,G,"batchingColorTexture"),G._colorsTexture!==null&&ge.setValue(k,"batchingColorTexture",G._colorsTexture,$));const Ti=K.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&O.update(G,K,_n),(wi||bt.receiveShadow!==G.receiveShadow)&&(bt.receiveShadow=G.receiveShadow,ge.setValue(k,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Ce.envMapIntensity.value=F.environmentIntensity),Ce.dfgLUT!==void 0&&(Ce.dfgLUT.value=dw()),wi){if(ge.setValue(k,"toneMappingExposure",R.toneMappingExposure),bt.needsLights&&Q0(Ce,ls),xt&&V.fog===!0&&Pt.refreshFogUniforms(Ce,xt),Pt.refreshMaterialUniforms(Ce,V,J,q,S.state.transmissionRenderTarget[A.id]),bt.needsLights&&bt.lightProbeGrid){const Me=bt.lightProbeGrid;Ce.probesSH.value=Me.texture,Ce.probesMin.value.copy(Me.boundingBox.min),Ce.probesMax.value.copy(Me.boundingBox.max),Ce.probesResolution.value.copy(Me.resolution)}sa.upload(k,Nh(bt),Ce,$)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(sa.upload(k,Nh(bt),Ce,$),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ge.setValue(k,"center",G.center),ge.setValue(k,"modelViewMatrix",G.modelViewMatrix),ge.setValue(k,"normalMatrix",G.normalMatrix),ge.setValue(k,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){const Me=V.uniformsGroups;for(let Ei=0,us=Me.length;Ei<us;Ei++){const Uh=Me[Ei];nt.update(Uh,_n),nt.bind(Uh,_n)}}return _n}function Q0(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.sunLights.needsUpdate=F,A.sunLightShadows.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function j0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(A,F,K){const V=X.get(A);V.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),X.get(A.texture).__webglTexture=F,X.get(A.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:K,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,F){const K=X.get(A);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,K=0){Q=A,z=F,H=K;let V=null,G=!1,xt=!1;if(A){const vt=X.get(A);if(vt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(k.FRAMEBUFFER,vt.__webglFramebuffer),tt.copy(A.viewport),St.copy(A.scissor),ut=A.scissorTest,E.viewport(tt),E.scissor(St),E.setScissorTest(ut),W=-1;return}else if(vt.__webglFramebuffer===void 0)$.setupRenderTarget(A);else if(vt.__hasExternalTextures)$.rebindTextures(A,X.get(A.texture).__webglTexture,X.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Kt=A.depthTexture;if(vt.__boundDepthTexture!==Kt){if(Kt!==null&&X.has(Kt)&&(A.width!==Kt.image.width||A.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(A)}}const Tt=A.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(xt=!0);const Rt=X.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Rt[F])?V=Rt[F][K]:V=Rt[F],G=!0):A.samples>0&&$.useMultisampledRTT(A)===!1?V=X.get(A).__webglMultisampledFramebuffer:Array.isArray(Rt)?V=Rt[K]:V=Rt,tt.copy(A.viewport),St.copy(A.scissor),ut=A.scissorTest}else tt.copy(ot).multiplyScalar(J).floor(),St.copy(Ht).multiplyScalar(J).floor(),ut=xe;if(K!==0&&(V=D),E.bindFramebuffer(k.FRAMEBUFFER,V)&&E.drawBuffers(A,V),E.viewport(tt),E.scissor(St),E.setScissorTest(ut),G){const vt=X.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,K)}else if(xt){const vt=F;for(let Tt=0;Tt<A.textures.length;Tt++){const Rt=X.get(A.textures[Tt]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Tt,Rt.__webglTexture,K,vt)}}else if(A!==null&&K!==0){const vt=X.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,vt.__webglTexture,K)}W=-1};function Dh(A){const F=X.get(A);return(F.__readFormat!==A.format||F.__readType!==A.type)&&(F.__readFormat=A.format,F.__readType=A.type,F.__formatReadable=L.textureFormatReadable(A.format),F.__typeReadable=L.textureTypeReadable(A.type)),F}this.readRenderTargetPixels=function(A,F,K,V,G,xt,wt,vt=0){if(!(A&&A.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Tt=Tt[wt]),Tt){E.bindFramebuffer(k.FRAMEBUFFER,Tt);try{const Rt=A.textures[vt],Kt=Rt.format,ne=Rt.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+vt);const Et=Dh(Rt);if(Et.__formatReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-V&&K>=0&&K<=A.height-G&&k.readPixels(F,K,V,G,mt.convert(Kt),mt.convert(ne),xt)}finally{const Rt=Q!==null?X.get(Q).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(A,F,K,V,G,xt,wt,vt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=X.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Tt=Tt[wt]),Tt)if(F>=0&&F<=A.width-V&&K>=0&&K<=A.height-G){E.bindFramebuffer(k.FRAMEBUFFER,Tt);const Rt=A.textures[vt],Kt=Rt.format,ne=Rt.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+vt);const Et=Dh(Rt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const le=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,le),k.bufferData(k.PIXEL_PACK_BUFFER,xt.byteLength,k.STREAM_READ),k.readPixels(F,K,V,G,mt.convert(Kt),mt.convert(ne),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Ie=Q!==null?X.get(Q).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,Ie);const ye=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await ox(k,ye,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,le),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,xt),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(le),k.deleteSync(ye),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,F=null,K=0){const V=Math.pow(2,-K),G=Math.floor(A.image.width*V),xt=Math.floor(A.image.height*V),wt=F!==null?F.x:0,vt=F!==null?F.y:0;$.setTexture2D(A,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,wt,vt,G,xt),E.unbindTexture()},this.copyTextureToTexture=function(A,F,K=null,V=null,G=0,xt=0){let wt,vt,Tt,Rt,Kt,ne,Et,le,Ie;const ye=A.isCompressedTexture?A.mipmaps[xt]:A.image;if(K!==null)wt=K.max.x-K.min.x,vt=K.max.y-K.min.y,Tt=K.isBox3?K.max.z-K.min.z:1,Rt=K.min.x,Kt=K.min.y,ne=K.isBox3?K.min.z:0;else{const Ce=Math.pow(2,-G);wt=Math.floor(ye.width*Ce),vt=Math.floor(ye.height*Ce),A.isDataArrayTexture?Tt=ye.depth:A.isData3DTexture?Tt=Math.floor(ye.depth*Ce):Tt=1,Rt=0,Kt=0,ne=0}V!==null?(Et=V.x,le=V.y,Ie=V.z):(Et=0,le=0,Ie=0);const ve=mt.convert(F.format),Ze=mt.convert(F.type);let bt;F.isData3DTexture?($.setTexture3D(F,0),bt=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?($.setTexture2DArray(F,0),bt=k.TEXTURE_2D_ARRAY):($.setTexture2D(F,0),bt=k.TEXTURE_2D),E.activeTexture(k.TEXTURE0),E.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),E.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),E.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);const en=E.getParameter(k.UNPACK_ROW_LENGTH),oe=E.getParameter(k.UNPACK_IMAGE_HEIGHT),_n=E.getParameter(k.UNPACK_SKIP_PIXELS),Gn=E.getParameter(k.UNPACK_SKIP_ROWS),wi=E.getParameter(k.UNPACK_SKIP_IMAGES);E.pixelStorei(k.UNPACK_ROW_LENGTH,ye.width),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ye.height),E.pixelStorei(k.UNPACK_SKIP_PIXELS,Rt),E.pixelStorei(k.UNPACK_SKIP_ROWS,Kt),E.pixelStorei(k.UNPACK_SKIP_IMAGES,ne);const ls=A.isDataArrayTexture||A.isData3DTexture,ge=F.isDataArrayTexture||F.isData3DTexture;if(A.isDepthTexture){const Ce=X.get(A),Ti=X.get(F),Me=X.get(Ce.__renderTarget),Ei=X.get(Ti.__renderTarget);E.bindFramebuffer(k.READ_FRAMEBUFFER,Me.__webglFramebuffer),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ei.__webglFramebuffer);for(let us=0;us<Tt;us++)ls&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,X.get(A).__webglTexture,G,ne+us),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,X.get(F).__webglTexture,xt,Ie+us)),k.blitFramebuffer(Rt,Kt,wt,vt,Et,le,wt,vt,k.DEPTH_BUFFER_BIT,k.NEAREST);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(G!==0||A.isRenderTargetTexture||X.has(A)){const Ce=X.get(A),Ti=X.get(F);E.bindFramebuffer(k.READ_FRAMEBUFFER,I),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,U);for(let Me=0;Me<Tt;Me++)ls?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ce.__webglTexture,G,ne+Me):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ce.__webglTexture,G),ge?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ti.__webglTexture,xt,Ie+Me):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ti.__webglTexture,xt),G!==0?k.blitFramebuffer(Rt,Kt,wt,vt,Et,le,wt,vt,k.COLOR_BUFFER_BIT,k.NEAREST):ge?k.copyTexSubImage3D(bt,xt,Et,le,Ie+Me,Rt,Kt,wt,vt):k.copyTexSubImage2D(bt,xt,Et,le,Rt,Kt,wt,vt);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ge?A.isDataTexture||A.isData3DTexture?k.texSubImage3D(bt,xt,Et,le,Ie,wt,vt,Tt,ve,Ze,ye.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(bt,xt,Et,le,Ie,wt,vt,Tt,ve,ye.data):k.texSubImage3D(bt,xt,Et,le,Ie,wt,vt,Tt,ve,Ze,ye):A.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,xt,Et,le,wt,vt,ve,Ze,ye.data):A.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,xt,Et,le,ye.width,ye.height,ve,ye.data):k.texSubImage2D(k.TEXTURE_2D,xt,Et,le,wt,vt,ve,Ze,ye);E.pixelStorei(k.UNPACK_ROW_LENGTH,en),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,oe),E.pixelStorei(k.UNPACK_SKIP_PIXELS,_n),E.pixelStorei(k.UNPACK_SKIP_ROWS,Gn),E.pixelStorei(k.UNPACK_SKIP_IMAGES,wi),xt===0&&F.generateMipmaps&&k.generateMipmap(bt),E.unbindTexture()},this.initRenderTarget=function(A){X.get(A).__webglFramebuffer===void 0&&$.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?$.setTextureCube(A,0):A.isData3DTexture?$.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?$.setTexture2DArray(A,0):$.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){z=0,H=0,Q=null,E.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}function mw(n){if(n.name)return n.name;if(n.parent?.name)return n.parent.name;const t=n.geometry;return`${n.type}:${t.type}:${t.getAttribute("position")?.count??0}`}function gw(n,t,e=14){t.updateMatrixWorld();const i=new Ga().setFromProjectionMatrix(new Dt().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse)),s=new Bn,r=new Map;n.traverseVisible(a=>{if(!(a instanceof Jt)&&!(a instanceof Aa))return;const c=a.geometry;if(a.frustumCulled&&(c.boundingSphere||c.computeBoundingSphere(),s.copy(c.boundingSphere).applyMatrix4(a.matrixWorld),!(a instanceof Xe)&&!i.intersectsSphere(s)))return;const l=a instanceof Aa?0:(c.index?c.index.count:c.getAttribute("position")?.count??0)/3,u=a instanceof Xe?a.count:1,f=mw(a),h=r.get(f)??{meshes:0,triangles:0};h.meshes+=1,h.triangles+=Math.round(l*u),r.set(f,h)});const o=[...r.entries()].map(([a,c])=>({source:a,...c})).sort((a,c)=>c.triangles-a.triangles);return{rows:o.slice(0,e),total:o.reduce((a,c)=>a+c.triangles,0)}}function vw(n,t,e){const i=async r=>{t.render();const o=await new Promise(c=>n.domElement.toBlob(c,"image/png"));if(!o)return"khong chup duoc";const a=await fetch(`/__shot?name=${encodeURIComponent(r)}`,{method:"POST",body:o});return a.ok?`shots/${r}.png`:`loi ${a.status}`},s=r=>gw(e.scene,e.camera,r);window.__skyrun={...t,shot:i,diag:s}}const xw=5,_w=450;function Mw(n,t){let e=0;return{spawn(i,s,r){const o=t();if(!o||e>=xw||!Number.isFinite(i)||!Number.isFinite(s)){r();return}const a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),l=a.left+a.width*.25-c.left,u=a.top+a.height*.5-c.top,f=document.createElement("div");f.className="collect-streak",f.style.left=`${i}px`,f.style.top=`${s}px`,n.appendChild(f),e++;const h=(i+l)/2-(l-i)*.15,d=Math.min(s,u)-60,m=f.animate([{transform:"translate(-50%, -50%) scale(1.4)",opacity:1},{transform:`translate(calc(-50% + ${h-i}px), calc(-50% + ${d-s}px)) scale(1)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${l-i}px), calc(-50% + ${u-s}px)) scale(0.55)`,opacity:.9}],{duration:_w,easing:"cubic-bezier(.5,0,.9,.6)"});m.onfinish=m.oncancel=()=>{f.remove(),e--,r()}}}}const yw=`
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
}`,Sw=`
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
}`,hr=1.1,bw=1.3,ww=[[.95,.05,.04],[1,.5,.02],[.02,.62,.5]],ra={request:0};function Tw(n){const t=n?.041666666666666664:.025,e=Math.ceil(hr/t)+2,i=[0,1].map(()=>Array.from({length:e},()=>({p:new P,t:-99,k:0,c:0}))),s=2*e*2,r=new Float32Array(s*3),o=new Float32Array(s*3),a=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),f=[];for(let C=0;C<2;C++)for(let N=0;N<e;N++){const D=(C*e+N)*2;l[D]=-1,l[D+1]=1,N<e-1&&f.push(D,D+1,D+2,D+1,D+3,D+2)}const h=new Qt,d={position:[r,3],aCol:[o,3],aAge:[a,1],aK:[c,1],aSide:[l,1],aAlong:[u,1]};for(const[C,[N,D]]of Object.entries(d))h.setAttribute(C,new Nt(N,D));h.setIndex(f),h.setDrawRange(0,0);const m=["position","aCol","aAge","aK","aAlong"].map(C=>h.getAttribute(C)),v=new ie({vertexShader:yw,fragmentShader:Sw,uniforms:xn.merge([lt.fog]),transparent:!0,depthWrite:!1,side:be,fog:!0}),g=new Jt(h,v);g.frustumCulled=!1,g.renderOrder=3;const p=new P,M=new P,y=new P,x=new P,_=new P,S=new P;let T=0,b=-99,w=-99,R=!1;return{mesh:g,update(C,N,D,I,U){ra.request>0&&(T=ra.request,ra.request=0),I>0&&(T=Math.max(0,T-I));const z=C.mode==="run",H=z&&C.smokeT>0?Math.min(1,C.smokeT/bw):0,Q=z&&T>0?.75*Math.min(1,T/.8):0,W=Math.max(H,Q);if(W>0)D-w>hr&&i.forEach((kt,zt)=>kt.forEach(Wt=>(Wt.p.copy(N[zt]),Wt.t=-99,Wt.k=0))),w=D;else if(D-w>hr){R&&h.setDrawRange(0,0),R=!1;return}R=!0,h.setDrawRange(0,1/0);const Y=En(C.z);p.set(Math.sin(Y),gi(C.z),Math.cos(Y)).normalize(),M.set(Math.cos(Y),0,-Math.sin(Y));const tt=z?C.speed:0,St=Math.sign((N[0].x-N[1].x)*M.x+(N[0].z-N[1].z)*M.z)||1,ut=I>0&&D-b>=t;ut&&(b=D),i.forEach((kt,zt)=>{const Wt=W*(W+(1-W)*Math.max(0,Math.sin(D*21+zt*2))),q=H>0?(C.smokes+2)%3:zt===0?1:2;if(ut){const it=kt.pop();kt.unshift(it)}const J=kt[0];J.p.copy(N[zt]),ut&&(J.t=D),J.k=Wt,J.c=q;const yt=zt===0?St:-St;for(let it=1;it<e&&I>0;it++){const ot=kt[it],Ht=Math.min(hr,D-ot.t),xe=Math.max(0,tt-5-18*Ht),Ot=Math.sin(D*7+ot.t*13);ot.p.addScaledVector(p,xe*I).addScaledVector(M,(yt*1.6+Ot*.7)*I),ot.p.y+=(-1+Math.cos(D*6+ot.t*11)*.5)*I}S.copy(M);for(let it=0;it<e;it++){const ot=kt[it],Ht=D-ot.t,xe=Math.min(1,Ht/hr);y.subVectors(kt[Math.max(0,it-1)].p,kt[Math.min(e-1,it+1)].p),y.lengthSq()<1e-6&&y.copy(p),x.subVectors(U,ot.p),_.crossVectors(y,x),_.lengthSq()<.03*y.lengthSq()*x.lengthSq()?_.copy(S):_.normalize(),_.dot(S)<0&&_.negate(),S.copy(_);const Ot=(.14+.9*(1-Math.exp(-Ht/.4)))*(.45+.55*ot.k),Ut=(zt*e+it)*2;r[Ut*3]=ot.p.x-_.x*Ot,r[Ut*3+1]=ot.p.y-_.y*Ot,r[Ut*3+2]=ot.p.z-_.z*Ot,r[Ut*3+3]=ot.p.x+_.x*Ot,r[Ut*3+4]=ot.p.y+_.y*Ot,r[Ut*3+5]=ot.p.z+_.z*Ot;const re=ww[ot.c];o.set(re,Ut*3),o.set(re,Ut*3+3),a[Ut]=a[Ut+1]=xe,c[Ut]=c[Ut+1]=ot.t<0?0:ot.k,u[Ut]=u[Ut+1]=ot.t}});for(const kt of m)kt.needsUpdate=!0}}}function Ew(n,t,e,i,s,r,o,a){const c=Mw(n,()=>n.querySelector(".hud-lantern")),l=new P,u=document.createElement("div");u.className="flash",n.appendChild(u);const f=()=>{u.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>u.classList.remove("on")))};return{handle(h,d){if(!h.length)return;i.events(h,d.mode==="run"),s.events(h,d);const{x:m,y:v}=Se(d.z,d.x,d.v,{x:0,y:0,z:0});for(const g of h)if(g.type==="lantern")e.burst(m,v+.5,d.z+3,16,!0),r.spawn(m,v+.2,d.z+.6),l.set(m,v+.3,d.z+3).project(a),c.spawn((l.x*.5+.5)*n.clientWidth,(.5-l.y*.5)*n.clientHeight,()=>s.bumpLantern());else if(g.type==="near-miss")t.shake(.06),f();else if(g.type==="hurt"||g.type==="crash"){const p=g.type==="crash";t.shake(p?.9:.45),o.spawn(m,v,d.z+.3,zi(d.z)?"village":g.kind==="bridge"?"cloth":"rock",p),p||f()}else g.type==="booster"?e.burst(m,v,d.z+3,40,!0):g.type==="gust"&&g.full?ra.request=1.5:g.type==="section"&&g.open&&d.mode==="run"&&i.reveal()}}}const _d=20.5,Aw=17.5,Md=.1,Rw=.05,Cw=3,Pw=.5,Lw=2.5,Nw=8;class Iw{scale=1;ema=16.7;seeded=!1;clock=0;warm=0;sinceChange=0;fastFor=0;slowFor=0;floorSlowFor=0;blockDownUntil=0;blockSeconds=20;blockedUpUntil=new Map;verify=null;minScale;hooks;constructor(t,e){this.minScale=t,this.hooks=e}sample(t){if(t<=0||t>.1||(this.clock+=t,this.warm+=t,this.sinceChange+=t,this.warm<Cw||this.sinceChange<Pw)||(this.seeded||(this.ema=t*1e3,this.seeded=!0),this.ema+=(t*1e3-this.ema)*.05,this.verify&&this.sinceChange>=Lw&&this.checkVerify(),this.verify))return;this.slowFor=this.ema>_d?this.slowFor+t:0,this.fastFor=this.ema<Aw?this.fastFor+t:0;const e=this.scale<=this.minScale+1e-6;this.floorSlowFor=e&&this.ema>_d?this.floorSlowFor+t:0,this.slowFor>1.2&&this.sinceChange>1.5&&this.clock>=this.blockDownUntil?this.down(e):this.fastFor>6&&this.sinceChange>6&&this.up()}frameMs(){return this.ema}checkVerify(){const t=this.verify;this.verify=null,!(this.ema<t.emaBefore*.92)&&(this.blockDownUntil=this.clock+30,this.apply(t.prev))}down(t){if(this.slowFor=0,!t){this.blockedUpUntil.set(this.key(this.scale),this.clock+this.blockSeconds),this.blockSeconds=Math.min(160,this.blockSeconds*2),this.verify={prev:this.scale,emaBefore:this.ema},this.apply(Math.max(this.minScale,this.scale-Md));return}this.floorSlowFor<Nw||(this.floorSlowFor=0,this.hooks.degrade()?this.apply(Math.min(1,this.scale+Md)):this.blockDownUntil=this.clock+60)}up(){this.fastFor=0;const t=Math.min(1,this.scale+Rw);t<=this.scale||this.clock<(this.blockedUpUntil.get(this.key(t))??0)||this.apply(t)}key(t){return Math.round(t*100)}apply(t){this.scale=Math.round(t*100)/100,this.sinceChange=0,this.hooks.setScale(this.scale)}}const qc={high:{name:"high",maxDpr:1.5,minScale:.75,terrain:{baseSize:200,levels:5,segs:40,farSegs:32,lite:!1},foliage:{density:.8,ahead:9,near:2},post:{bloom:!0,shafts:40,speedBlur:!0},ambient:1},mid:{name:"mid",maxDpr:1.25,minScale:.7,terrain:{baseSize:200,levels:5,segs:36,farSegs:24,lite:!1},foliage:{density:.4,ahead:6,near:2},post:{bloom:!1,shafts:16,speedBlur:!0},ambient:.7},low:{name:"low",maxDpr:1,minScale:.6,terrain:{baseSize:300,levels:4,segs:32,farSegs:20,lite:!0},foliage:{density:.3,ahead:4,near:2},post:{bloom:!1,shafts:0,speedBlur:!1},ambient:.45}},t0="skyrun.quality",Dw=/mali-(4|t|g3|g5)|adreno \(tm\) ([345]\d\d|6(0\d|1[0-3])\b)|powervr|sgx|intel\(r\) hd graphics|swiftshader|llvmpipe/i;function Uw(){try{const n=document.createElement("canvas").getContext("webgl2");if(!n)return"no-webgl2";const t=n.getExtension("WEBGL_debug_renderer_info"),e=String(t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER));return n.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function Fw(n){const t=navigator;return n==="no-webgl2"||Dw.test(n)||(t.deviceMemory??8)<=2?"low":matchMedia("(pointer: coarse)").matches?"mid":"high"}function yd(n){return n==="low"||n==="mid"||n==="high"}function Ow(n){const t=Uw(),e=n.get("q");if(yd(e))return{...qc[e],gpu:t,source:"url"};let i=null;try{const[s,r]=(localStorage.getItem(t0)??"").split("|");Date.now()-Number(r)<3*864e5&&(i=s??null)}catch{}return yd(i)?{...qc[i],gpu:t,source:"saved"}:{...qc[Fw(t)],gpu:t,source:"guess"}}function kw(n){try{localStorage.setItem(t0,`${n}|${Date.now()}`)}catch{}}function Bw(n){return n==="high"?"mid":n==="mid"?"low":null}function zw(n){const t=()=>Math.min(window.devicePixelRatio,n.tier.maxDpr);let e=!1;const i=new Iw(n.tier.minScale,{setScale(c){const l=t()*c;n.renderer.setPixelRatio(l),n.post.setPixelRatio(l),n.resize()},degrade(){const c=Bw(n.tier.name);return c&&!e&&n.tier.source!=="url"&&(kw(c),e=!0),n.post.setLite()}});let s=performance.now(),r=0,o=s;const a=c=>{const l=(c-s)/1e3;if(n.tick(Math.min(.1,l)),s=c,n.renderer.info.reset(),n.post.render(),i.sample(l),r++,c-o>500){const u=n.renderer.info.render,f=(r*1e3/(c-o)).toFixed(0);n.stats?.(`${f} FPS · ${u.calls} lượt vẽ · ${(u.triangles/1e6).toFixed(2)}M △
tầng ${n.tier.name} (${n.tier.source}) · độ phân giải ${Math.round(i.scale*100)}% · ${i.frameMs().toFixed(1)} ms
${n.worldLine()}`),r=0,o=c}requestAnimationFrame(a)};return requestAnimationFrame(a),i}const e0=3,Hw=7*3600*1e3;function mu(n){const t=new Date(n.getTime()+Hw);return`${`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}.v${e0}`}function Vw(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0||1}function Gw(n){let t=n;return()=>{const e=mu(new Date);return{route:e,seed:n?t++:Vw(e)}}}function n0(n){const t=/^\d{4}-(\d{2})-(\d{2})/.exec(n);return t?`${t[2]}/${t[1]}`:n}const gu=20,i0=2*Math.PI*gu,Ww=`<svg class="hud-smoke-ring" viewBox="0 0 48 48" aria-hidden="true">
  <circle cx="24" cy="24" r="23" class="bg"/>
  <circle cx="24" cy="24" r="${gu}" class="track"/>
  <circle cx="24" cy="24" r="${gu}" class="arc" stroke-dasharray="${i0.toFixed(2)}" transform="rotate(-90 24 24)"/>
  <g class="can">
    <circle cx="19.5" cy="16" r="4" fill="#ff3b30"/><circle cx="24" cy="12.5" r="4.4" fill="#ffc21a"/><circle cx="28.5" cy="16" r="4" fill="#1fc9b0"/>
    <rect x="19.5" y="19" width="9" height="15" rx="1.6" fill="#ff4f9a" stroke="#2a0c1e" stroke-width="1.2"/>
    <path d="M19.5 25.5 L28.5 21.5 M19.5 31 L28.5 27" stroke="#ffd166" stroke-width="2"/>
  </g>
</svg>`;function Xw(n,t){const e=document.createElement("div");e.className="hud-smoke",e.innerHTML=`${Ww}<b>Đèn ×2</b>`,n.appendChild(e);const i=e.querySelector(".arc");let s=!1,r=!1,o="";return{update(a){const c=a.smokeT>0&&a.mode!=="over";if(c!==s&&(s=c,e.classList.toggle("on",s),t.classList.toggle("x2",s)),!s)return;const l=(i0*(1-a.smokeT/st.smokeTime)).toFixed(1);l!==o&&i.setAttribute("stroke-dashoffset",o=l);const u=a.smokeT<1.5;u!==r&&e.classList.toggle("ending",r=u)}}}const qw={thermal:"Luồng nhiệt — lên tầng cao!",shield:"Dù dự phòng: +1 tim",smoke:`Bình khói! Đèn ×${st.smokeLanternMul} trong ${st.smokeTime} giây`},Kw='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l1 2.2c2 1.4 3 3.6 3 6.3 0 3.9-2.6 7-6 7.9V21h-4v-1.6c-3.4-.9-6-4-6-7.9 0-2.7 1-4.9 3-6.3z" fill="currentColor"/></svg>',Yw='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>',Kc=n=>Math.floor(n).toLocaleString("vi-VN");function $w(n){const t=document.createElement("div");t.className="hud",t.innerHTML=`
    <div class="hud-dist">
      <div class="hud-dist-num"><span data-k="dist">0</span><small>m</small></div>
      <div class="hud-score">Điểm <b data-k="score">0</b></div>
      <div class="hud-day" title="Bay từ bình minh tới đêm đèn trời — qua ngày mới là vùng mới">
        <div class="hud-day-track"><i data-k="sun"></i></div>
        <div class="hud-day-labels"><span data-k="dayNo">Ngày 1</span><span data-k="period">Bình minh</span></div>
      </div>
    </div>
    <div class="hud-right">
      <div class="hud-hearts" data-k="hearts" aria-label="Tim">${Yw.repeat(st.maxHp)}</div>
      <div class="hud-lantern">${Kw}<span data-k="lanterns">0</span></div>
      <div class="hud-mult" data-k="multBox"><span data-k="mult">×1,0</span><i data-k="combo"></i></div>
    </div>
    <div class="hud-boost">
      <div class="hud-pill thermal" data-k="thermal"><b>Luồng nhiệt</b><i data-k="thermalBar"></i></div>
    </div>
    <div class="hud-sections" data-k="sections"></div>
    <div class="hud-toasts" data-k="toasts"></div>
    <div class="hud-stats" data-k="stats"></div>`,n.appendChild(t);const e=S=>t.querySelector(`[data-k="${S}"]`),i=e("dist"),s=e("score"),r=e("sun"),o=e("dayNo"),a=e("period"),c=e("lanterns"),l=t.querySelector(".hud-lantern"),u=e("mult"),f=e("multBox"),h=e("combo"),d=e("thermal"),m=e("thermalBar"),v=[...e("hearts").children],g=e("toasts"),p=e("sections"),M=e("stats"),y=Xw(t.querySelector(".hud-right"),l);let x=0;const _=(S,T,b)=>{const w=document.createElement("div");w.className=`hud-toast ${T}${b?` ${b}`:""}`,w.textContent=S;const R=T==="section"?p:g;for(R.appendChild(w);R.children.length>(T==="section"?1:3);)R.firstChild.remove();setTimeout(()=>w.remove(),T==="section"?2600:1100)};return{toast:_,setVisible(S){t.classList.toggle("hidden",!S)},bumpLantern(){l.classList.remove("got"),l.getBoundingClientRect(),l.classList.add("got")},setStats(S){M.textContent=S},update(S,T){i.textContent=Kc(S.z),s.textContent=Kc(Oa(S)),r.style.left=`${(T.u*100).toFixed(1)}%`;const b=`Ngày ${T.day}`;o.textContent!==b&&(o.textContent=b);const w=xv(T);a.textContent!==w&&(a.textContent=w),c.textContent=Kc(S.lanterns),u.textContent=`×${S.mult.toFixed(1).replace(".",",")}`,f.classList.toggle("hot",S.mult>1.05),h.style.transform=`scaleX(${S.combo>0?Math.max(0,1-S.comboT/st.comboBreak):0})`,d.classList.toggle("on",S.thermalT>0),m.style.transform=`scaleX(${S.thermalT/st.thermalTime})`,v.forEach((C,N)=>C.classList.toggle("lost",N>=S.hp)),y.update(S);const R=im(T);R>x&&S.mode==="run"&&_(R%3===0?`Ngày ${T.day} · ${Qp[T.region]}`:R%3===1?"Chạng vạng":"Đêm hội đèn trời","section"),x=S.mode==="run"?Math.max(x,R):0},events(S,T){for(const b of S)b.type==="near-miss"?_(b.combo>1?`SƯỢT! ×${T.mult.toFixed(1).replace(".",",")}`:"SƯỢT!","combo"):b.type==="hurt"?(_(b.hp>1?"Va quệt!":"Va quệt! Còn 1 tim","big","hurt"),v[b.hp]?.classList.remove("hit"),v[b.hp]?.getBoundingClientRect(),v[b.hp]?.classList.add("hit")):b.type==="booster"&&b.kind!=="lantern"?_(qw[b.kind],"big",b.kind):b.type==="gust"?_(b.full?`Trọn chuỗi gió! +${st.gustChainScore}`:`Gió xuôi ×${b.chain}`,b.full?"big":"combo"):b.type==="section"&&T.mode==="run"&&_(b.open?Fn(T.z+500)>0?"Làng quê mùa phượng":"Thung lũng mở":"Khe đá","section")}}}const Zw=30,Sd={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down"},Jw=10,Qw=34,jw=260,tT=180,eT=.26,bd=300;function nT(n,t,e){const i=[],s=[],r=new Map;let o=!1;const a=new Map;let c=null,l=0,u=0,f=-1,h=0;const d=[],m=(y,x)=>{t()&&d.forEach(_=>_(y,x))};let v=null,g=0,p=0;window.addEventListener("keydown",y=>{if(y.repeat)return;const x=Sd[y.code];if(x){i.push(x),x==="down"&&(o=!0),y.preventDefault();const _=performance.now();x===v&&x!=="down"&&_-g<bd?(m(x==="up"?"flip":"roll",x==="right"?-1:1),v=null):(v=x,g=_)}(y.code==="Space"||y.code==="Enter")&&(s.forEach(_=>_()),y.preventDefault()),r.get(y.code)?.()}),window.addEventListener("keyup",y=>{Sd[y.code]==="down"&&(o=!1)}),n.addEventListener("touchstart",y=>{const x=performance.now();for(const _ of Array.from(y.changedTouches))a.set(_.identifier,{x0:_.clientX,y0:_.clientY,t0:x,hist:[{y:_.clientY,t:x}],hx:[{x:_.clientX,t:x}],cool:0,rollCool:0,dragX:null,flicked:!1,down:!1})},{passive:!0}),n.addEventListener("touchmove",y=>{y.preventDefault();const x=performance.now();for(const _ of Array.from(y.changedTouches)){const S=a.get(_.identifier);if(!S)continue;for(S.hist.push({y:_.clientY,t:x});S.hist.length>1&&x-S.hist[0].t>jw;)S.hist.shift();const T=_.clientY-S.hist[0].y;for(x>=S.cool&&Math.abs(T)>=Qw&&(i.push(T<0?"up":"down"),T<0&&x-p<bd+150?(m("flip",1),p=0):T<0&&(p=x),S.down=T>0&&c!==_.identifier,S.flicked=!0,S.cool=x+150,S.hist=[{y:_.clientY,t:x}]),S.hx.push({x:_.clientX,t:x});S.hx.length>1&&x-S.hx[0].t>tT;)S.hx.shift();const b=_.clientX-S.hx[0].x;x>=S.rollCool&&Math.abs(b)>=n.clientWidth*eT&&(m("roll",b>0?-1:1),S.rollCool=x+700,S.hx=[{x:_.clientX,t:x}]);const w=_.clientX-S.x0;S.dragX===null&&Math.abs(w)>=Jw&&Math.abs(w)>=Math.abs(_.clientY-S.y0)*.8&&(S.dragX=_.clientX,c===null&&(c=_.identifier,S.down=!1,u++,l=0)),c===_.identifier&&S.dragX!==null&&(l=(_.clientX-S.dragX)/Math.max(1,n.clientWidth))}},{passive:!1});const M=y=>{const x=performance.now();for(const _ of Array.from(y.changedTouches)){const S=a.get(_.identifier);if(a.delete(_.identifier),c===_.identifier&&(c=null),!S||S.flicked||S.dragX!==null||y.type==="touchcancel")continue;Math.hypot(_.clientX-S.x0,_.clientY-S.y0)<=14&&x-S.t0<=350&&t()?i.push(_.clientX<n.clientWidth/2?"left":"right"):t()||s.forEach(b=>b())}};return n.addEventListener("touchend",M),n.addEventListener("touchcancel",M),n.addEventListener("mousedown",()=>s.forEach(y=>y())),{take(){return i.splice(0,i.length)},holdDown:()=>o||Array.from(a.values()).some(y=>y.down),steer(){if(c===null)return null;f!==u&&(f=u,h=e());let y=h-l*Zw;const x=Math.abs(y)-st.steerMax;return x>0&&(h-=Math.sign(y)*x,y-=Math.sign(y)*x),y},onAction(y){s.push(y)},onKey(y,x){r.set(y,x)},onTrick(y){d.push(y)}}}function s0(n){return/\.github\.io$/.test(location.hostname)||n.has("portal")}function r0(n){return n.has("seed")||n.has("z")||n.get("auto")==="1"?!1:s0(n)||/(^|\.)zingplay\.dev$/.test(location.hostname)}function iT(n){return r0(n)&&!n.has("alt")}function sT(n){const t={};let e=null;async function i(o,a={}){try{const c={...t,accept:"application/json"};a.body&&(c["content-type"]="application/json");const l=await fetch(o,{...a,headers:c,credentials:"include",redirect:"manual",cache:"no-store"});if(l.type==="opaqueredirect"||l.status===401)return{fail:{kind:"auth",status:l.status}};if(!l.ok){const u=await l.json().catch(()=>null);return{fail:{kind:l.status>=500?"network":"rejected",status:l.status,why:u?.why??u?.error}}}return{ok:await l.json()}}catch{return{fail:{kind:"network",status:0}}}}async function s(o,a={}){const c=await i(o,a);return e="fail"in c?c.fail:null,"ok"in c?c.ok:null}const r=encodeURIComponent;return{board:o=>s(`api/ghosts?route=${r(o)}`),async paths(o,a){return a.length?(await s(`api/ghosts/paths?route=${r(o)}&pids=${a.map(r).join(",")}`))?.paths??{}:{}},leaderboard:(o="score")=>i(`api/leaderboard?by=${o}`),submit:(o,a)=>s("api/ghosts",{method:"POST",body:JSON.stringify({route:o,...a})}),lastFailure:()=>e,async logRun(o){return!!(await fetch("api/runs",{method:"POST",body:JSON.stringify(o),headers:{...t,"content-type":"application/json"},credentials:"include",redirect:"manual",cache:"no-store",keepalive:!0}).catch(()=>null))?.ok},async ping(){const o=await fetch("healthz",{credentials:"include",redirect:"manual",cache:"no-store"}).catch(()=>null);return o?o.type==="opaqueredirect"||o.status===401?"auth":o.ok?"ok":"network":"network"}}}const Ca=10,rT=60/Ca,vu=900*Ca,Yc=n=>Math.max(-32768,Math.min(32767,Math.round(n*100)));function oT(n){const t=Math.min(vu,Math.floor(n.length/3)),e=new DataView(new ArrayBuffer(4+t*6)),i=n[0]??0;e.setFloat32(0,i,!0);let s=e.getFloat32(0,!0);for(let a=0;a<t;a++){const c=Yc(n[a*3]-s);s+=c/100,e.setInt16(4+a*6,c,!0),e.setInt16(6+a*6,Yc(n[a*3+1]),!0),e.setInt16(8+a*6,Yc(n[a*3+2]),!0)}let r="";const o=new Uint8Array(e.buffer);for(let a=0;a<o.length;a+=32768)r+=String.fromCharCode(...o.subarray(a,a+32768));return btoa(r)}function aT(n){let t;try{t=atob(n)}catch{return null}const e=Math.floor((t.length-4)/6);if(e<2)return null;const i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);const s=new DataView(i.buffer),r={n:e,z:new Float32Array(e),x:new Float32Array(e),v:new Float32Array(e)};let o=s.getFloat32(0,!0);if(!Number.isFinite(o))return null;for(let a=0;a<e;a++)o+=s.getInt16(4+a*6,!0)/100,r.z[a]=o,r.x[a]=s.getInt16(6+a*6,!0)/100,r.v[a]=s.getInt16(8+a*6,!0)/100;return r}function o0(n,t,e){const i=Math.max(0,t*Ca),s=n.n-1,r=Math.min(s,Math.floor(i)),o=Math.min(s,r+1),a=Math.min(1,i-r);return e.z=n.z[r]+(n.z[o]-n.z[r])*a,e.x=n.x[r]+(n.x[o]-n.x[r])*a,e.v=n.v[r]+(n.v[o]-n.v[r])*a,e.ended=i>=s,e.after=Math.max(0,(i-s)/Ca),e}const a0=5,$c=4,cT=1500,lT=200,uT=120;function xu(n,t,e=!1){return e?1:Math.min(1,Math.max(0,(t-cT-n*lT)/uT))}const c0=n=>n.length===1&&n[0].self;function hT(n){const t=n.runs.find(o=>o.pid===n.me),e=n.runs.filter(o=>o.pid!==n.me),i=t?.dist??0,s=o=>o.dist>=i?o.dist-i:(i-o.dist)*2,r=[];t&&r.push(t),e[0]&&r.push(e[0]);for(const o of e.slice(1).sort((a,c)=>s(a)-s(c))){if(r.length>=a0)break;r.push(o)}return r}function fT(){let n=[];const t=[];return{ghosts:()=>n,set(e){n=[];for(const i of e){const s=aT(i.path);s&&n.push({run:i.run,self:i.self,track:s,at:{z:0,x:0,v:0,ended:!1,after:0},ahead:null,downSaid:!1})}},reset(){for(const e of n)e.ahead=null,e.downSaid=!1},update(e,i){t.length=0;const s=c0(n);return n.forEach((r,o)=>{o0(r.track,e,r.at);const a=r.at.z-i,c=r.run.name,l=xu(o,i,s)>0;l&&a>$c&&r.ahead===!1&&t.push({type:"passed",name:c,self:r.self}),l&&a<-$c&&r.ahead===!0&&t.push({type:"pass",name:c,self:r.self}),Math.abs(a)>$c&&(r.ahead=a>0),r.at.ended&&!r.downSaid&&(r.downSaid=!0,l&&r.run.crash&&Math.abs(a)<300&&t.push({type:"down",name:c,self:r.self,dist:r.run.dist}))}),t},rank(e){return 1+n.filter(i=>i.at.z>e).length}}}function dT(){let n=[],t=0,e=!1;const i=s=>{n.length<vu*3&&n.push(s.z,s.x,s.v)};return{start(s){n=[],t=0,e=!0,i(s)},afterStep(s){e&&(t++,t%rT===0&&i(s),s.mode==="over"&&(e=!1))},seconds:()=>t/60,truncated:()=>n.length>=vu*3,finish:()=>oT(n)}}const Zc="skyrun.myGhost",Bo="me";function pT(n){let t=null;const e=(r,o)=>!!r&&r.route===o&&typeof r.path=="string"&&Number.isFinite(r.dist);function i(r){let o=null;try{o=JSON.parse(localStorage.getItem(Zc)??"null")}catch{}const a=e(o,r)?o:null,c=e(t,r)?t:null;return a&&c?c.dist>a.dist?c:a:a??c}function s(r){const o=i(r);return{me:Bo,myName:null,total:o?1:0,runs:o?[{pid:Bo,name:"Bạn",dist:o.dist,score:o.score,dur:o.dur,crash:o.crash}]:[]}}return{board:async r=>s(r),async paths(r,o){const a=i(r);return a&&o.includes(Bo)?{[Bo]:a.path}:{}},leaderboard:async()=>({fail:{kind:"rejected",status:0,why:"offline"}}),async submit(r,o){const a=i(r),c=!a||o.dist>a.dist;if(c){t={route:r,dist:o.dist,score:o.score,dur:o.dur,crash:o.crash,path:o.path};try{localStorage.removeItem(Zc),localStorage.setItem(Zc,JSON.stringify(t))}catch{}}return{saved:c,best:c?o.dist:a.dist,rank:1,total:1,bestScore:o.score,scoreRank:1}},lastFailure:()=>null,logRun:n,ping:async()=>"ok"}}const mT="modulepreload",gT=function(n,t){return new URL(n,t).href},wd={},vT=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=gT(u,i),u in wd)return;wd[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(i)for(let m=o.length-1;m>=0;m--){const v=o[m];if(v.href===u&&(!f||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":mT,f||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((m,v)=>{d.addEventListener("load",m),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},xT="skyRuns",Td="sr-tele",Ed="../../shared/",Jc=new Map;function Ad(n){let t=Jc.get(n);return t||(t=new Promise((e,i)=>{const s=document.createElement("script");s.src=n,s.onload=()=>e(),s.onerror=()=>i(new Error(`không tải được ${n}`)),document.head.appendChild(s)}),t.catch(()=>Jc.delete(n)),Jc.set(n,t)),t}function _T(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function MT(n,t,e,i){const{route:s,rv:r,sv:o,alt:a,dist:c,dur:l,score:u,crash:f,tainted:h,...d}=n;return{v:1,ch:t,pk:e,at:i,route:s,rv:r,sv:o,alt:a,dist:Math.round(c*10)/10,dur:Math.round(l*100)/100,score:Math.round(u),crash:f??null,tainted:h,detail:JSON.stringify(d)}}let Es=null;function yT(){return Es||(Es=(async()=>{await Ad(`${Ed}portal-config.js`),await Ad(`${Ed}portal-firebase.js`);const n=window.Portal,t=n?.FB;if(!t?.configured())throw new Error("chưa cấu hình Firebase");const e=await t.load(),i=await vT(()=>import(`${t.SDK}/firebase-app.js`),[],import.meta.url),s=i.getApps().find(a=>a.name===Td)??i.initializeApp(n.CONFIG,Td),r=e.authM.getAuth(s);await r.authStateReady(),r.currentUser||await e.authM.signInAnonymously(r);let o;try{o=e.fsM.initializeFirestore(s,{experimentalAutoDetectLongPolling:!0,useFetchStreams:!1})}catch{o=e.fsM.getFirestore(s)}return{fsM:e.fsM,db:o,uid:r.currentUser.uid,limit:t.limit.bind(t)}})(),Es.catch(()=>Es=null),Es)}function ST(){const n=/\.github\.io$/.test(location.hostname)?"portal":"dev";return async t=>{try{const e=await yT();return await e.limit(e.fsM.addDoc(e.fsM.collection(e.db,xT),MT(t,n,_T(e.uid),Date.now())),"ghi log ván"),!0}catch(e){return console.warn("[skyrun] log ván Firestore hỏng",e),!1}}}const bT=1e9,wT=Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0"),TT=[...document.scripts].map(n=>/assets\/index-([\w-]+)\.js/.exec(n.src)?.[1]).find(Boolean)??"dev",Rd=n=>n.thermalV>8?"thermal":n.v<-2?"low":n.v>2?"high":"zero",ET=(n,t)=>n>=bT?"trail":t>2?"u":t<-2?"d":"o",AT=n=>{const t=un(n);return t<cn-60?"gorge":t<Dp?"mouth":zi(n)?"village":"valley"},zo=(n,t)=>n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:0,Ln=n=>Math.round(n*100)/100;function RT(){try{return JSON.parse(localStorage.getItem("skyrun.tut")??"[]").length}catch{return 0}}function CT(n){let t={touch:!1,key:!1};addEventListener("keydown",()=>t.key=!0),addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(t.touch=!0)});let e="",i=!1,s=0,r=-1,o=null,a=c();function c(){const l=u=>Object.fromEntries(u.map(f=>[f,0]));return{tiers:l(["low","zero","high","thermal"]),lSpawn:l(["o","u","d","trail"]),lTaken:l(["o","u","d","trail"]),bSpawn:l(["thermal","shield","smoke"]),bTaken:l(["thermal","shield","smoke"]),seen:new Set,rows:new Set,swipes:{up:0,down:0,lane:0},leads:[],frames:[],scaleSum:0,multSum:0,lowSince:-1,bridgesFromLow:0,lastCmd:0,hurts:0,shown:0,deathNear:!1,near:!1}}return{start(l,u,f){e=u,i=f,s++,o=r<0?null:Ln((performance.now()-r)/1e3),t={touch:!1,key:!1},a=c(),a.lastCmd=l.time},frame(l,u,f){l>0&&l<.5&&(a.frames.length<3e4&&a.frames.push(l),a.scaleSum+=n.quality().scale*l),a.shown=Math.max(a.shown,u),a.near=f},afterStep(l,u){if(l.mode!=="run"&&l.mode!=="crash")return;const f=Rd(l);a.tiers[f]+=u,a.multSum+=l.mult*u,f!=="low"?a.lowSince=-1:a.lowSince<0&&(a.lowSince=l.time);for(const h of l.events)h.type==="lane"?a.swipes.lane++:h.type==="vert"?a.swipes[h.kind==="flare"?"up":"down"]++:h.type==="hurt"?a.hurts++:h.type==="crash"&&(a.deathNear=a.near),(h.type==="lane"||h.type==="vert")&&(a.lastCmd=l.time);for(const h of l.pickups){if(h.z>l.z-3.5)break;if(!a.seen.has(h.id))if(a.seen.add(h.id),h.kind==="lantern"){const d=ET(h.id,h.v);a.lSpawn[d]++,h.taken&&a.lTaken[d]++}else a.bSpawn[h.kind]++,h.taken&&a.bTaken[h.kind]++}for(const h of l.obstacles){if(!h.passed||a.rows.has(h.row)||(a.rows.add(h.row),l.hurtRow===h.row||l.mode!=="run"))continue;const d=l.time-l.dodgeTime;d<1.5&&ua(h,l.dodgeX,l.thermalV,0)&&a.leads.push(d),h.kind==="bridge"&&a.lowSince>=0&&l.time-a.lowSince>=.5&&a.bridgesFromLow++}},finish(l,u,f,h){r=performance.now();const d=[...a.frames].sort((y,x)=>y-x),m=a.frames.reduce((y,x)=>y+x,0),v=[...a.leads].sort((y,x)=>y-x),g=Zp(),p=Ur(),M=n.quality();return{lv:1,route:e,rv:h,sv:Fa,alt:i,build:TT,session:wT,runNo:s,wait:o,dist:Math.floor(l.z),dur:Ln(l.time),score:Oa(l),crash:u,tainted:f,hurts:a.hurts,device:{tier:M.tier,gov:Ln(m>0?a.scaleSum/m:M.scale),fps50:Math.round(d.length?1/zo(d,.5):0),fps5:Math.round(d.length?1/zo(d,.95):0),input:t.touch&&t.key?"mixed":t.touch?"touch":"key",portrait:innerHeight>innerWidth},prefs:{ghosts:p.ghosts,music:g.music?p.music:"off",tutorial:RT()},death:u?{phase:Math.round(un(l.z)),zone:AT(l.z),tier:Rd(l),sinceCmd:Ln(l.time-a.lastCmd)}:null,parts:{meters:Math.round(l.score),lantern:Math.round(l.parts.lantern),nearMiss:Math.round(l.parts.nearMiss),gust:Math.round(l.parts.gust)},lanterns:{spawned:a.lSpawn,taken:a.lTaken,bestStreak:l.bestStreak,avgMult:Ln(l.time>0?a.multSum/l.time:1)},tiers:{low:Ln(a.tiers.low),zero:Ln(a.tiers.zero),high:Ln(a.tiers.high),thermal:Ln(a.tiers.thermal)},swipes:a.swipes,bridgesFromLow:a.bridgesFromLow,boosters:{spawned:a.bSpawn,taken:a.bTaken},lead:{p10:Ln(zo(v,.1)),p50:Ln(zo(v,.5)),n:v.length},ghosts:{shown:a.shown,deathNear:a.deathNear}}}}}const _u="skyrun.pending",PT=12e4,Cd=[1500,4e3];function Qc(){try{const n=JSON.parse(localStorage.getItem(_u)??"[]");return Array.isArray(n)?n:[]}catch{return[]}}function Pd(n){try{n.length?localStorage.setItem(_u,JSON.stringify(n)):localStorage.removeItem(_u)}catch{}}function Ld(n){const t=Date.now(),e=[mu(new Date(t)),mu(new Date(t-864e5))].map(i=>i.slice(0,10));return typeof n.route=="string"&&e.includes(n.route.slice(0,10))&&!!n.run}function LT(n){let t=performance.now(),e=!1;const i=r=>new Promise(o=>setTimeout(o,r));async function s(r,o){for(let a=0;;a++){const c=await n.submit(r,o);if(c)return{ok:c};const l=n.lastFailure()??{kind:"network",status:0};if(l.kind!=="network"||a>=Cd.length)return{fail:l};await i(Cd[a])}}return{keepAlive(r){const o=performance.now();o-t<PT||(t=o,n.ping().then(a=>{a!=="auth"||e||(e=!0,r())}))},async submit(r,o){t=performance.now();const a=await s(r,o);return"fail"in a&&a.fail.kind!=="rejected"&&Pd([...Qc().filter(Ld),{route:r,run:o,at:Date.now()}].slice(-3)),a},async flush(){const r=Qc().filter(Ld),o=[],a=[];for(const c of r)await n.submit(c.route,c.run)?o.push(c.run.dist):n.lastFailure()?.kind!=="rejected"&&a.push(c);return(r.length||Qc().length)&&Pd(a),o}}}const NT=160;function IT(n,t){const e=document.createElement("div");e.className="ghost-layer";const i=Array.from({length:t},()=>{const a=document.createElement("div");return a.className="ghost-tag",e.appendChild(a),a}),s=document.createElement("div");s.className="ghost-rank",e.appendChild(s),n.appendChild(e);const r=new P;let o="";return{update(a,c,l,u,f,h){if(e.classList.toggle("on",h&&l.length>0),!h)return;const d=n.clientWidth,m=n.clientHeight;i.forEach((g,p)=>{const M=p<c.count?l[c.owner[p]]:void 0,y=c.alphas[p]??0;if(!M||y<.15||Math.abs(M.at.z-f)>NT){g.style.opacity="0";return}if(r.copy(c.heads[p]).project(a),r.z>1){g.style.opacity="0";return}const x=M.self?"Kỷ lục của bạn":M.run.name;g.textContent!==x&&(g.textContent=x),g.classList.toggle("self",M.self),g.style.opacity=Math.min(1,y*1.6).toFixed(2),g.style.transform=`translate(${((r.x+1)*.5*d).toFixed(1)}px, ${((1-r.y)*.5*m).toFixed(1)}px) translate(-50%, -100%)`});const v=l.every(g=>g.self)?"":`Hạng ${u}/${l.length+1}`;v!==o&&(s.textContent=v,o=v)}}}const Pa=n=>Math.floor(n).toLocaleString("vi-VN"),DT=[1500,4e3],oa={score:{tab:"Điểm",sub:"Điểm cao nhất một ván · mọi ngày",unit:"",count:"người đã có điểm",empty:"Chưa ai có điểm mùa này — bay ván đầu tiên!",best:"điểm cao nhất"},lanterns:{tab:"Đèn trời",sub:"Nhiều đèn nhất một ván · mọi ngày",unit:" đèn",count:"người đã nhặt đèn",empty:"Chưa ai lên bảng đèn mùa này — bay ván đầu tiên!",best:"số đèn nhiều nhất"}},UT=["score","lanterns"];function FT(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — tải lại trang (F5) để xem bảng.":n.kind==="network"?`Chưa tải được bảng (${n.status?`máy chủ báo lỗi ${n.status}`:"mất kết nối"}).`:`Máy chủ từ chối (${n.why??n.status}).`}function Nd(n,t,e,i){const s=document.createElement("li");s.className=i?"me":"";const r=(o,a)=>{const c=document.createElement("span");c.className=o,c.textContent=a,s.appendChild(c)};return r("board-rank",`#${e}`),r("board-name",i?`${n.name} (bạn)`:n.name),r("board-score",Pa(n[t]??0)+oa[t].unit),r("board-meta",`${Pa(n.dist)} m · ${n0(n.route)}`),s}function OT(n,t){const e=document.createElement("button");e.type="button",e.className="board-btn",e.setAttribute("aria-label","Bảng xếp hạng"),e.textContent="🏆",e.hidden=!0;const i=document.createElement("div");i.className="board-panel",i.hidden=!0;const s=UT.map(p=>`<button type="button" role="tab" data-by="${p}">${oa[p].tab}</button>`).join("");i.innerHTML=`
    <div class="board-card" role="dialog" aria-label="Bảng xếp hạng">
      <div class="board-head"><div><b>Bảng xếp hạng <span class="board-season"></span></b><small class="board-sub"></small></div>
        <button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <div class="board-tabs" role="tablist">${s}</div>
      <p class="board-status"></p>
      <button type="button" class="board-retry" hidden>Thử lại</button>
      <ol class="board-list"></ol>
    </div>`,n.append(e,i);const r=i.querySelector(".board-season"),o=i.querySelector(".board-sub"),a=i.querySelector(".board-status"),c=i.querySelector(".board-retry"),l=i.querySelector(".board-list"),u=[...i.querySelectorAll(".board-tabs button")];r.textContent=`Mùa ${Fa}`;let f="score";const h={};for(const p of[e,i]){for(const M of["touchstart","touchend","touchmove","pointerdown"])p.addEventListener(M,y=>y.stopPropagation(),{passive:!0});p.addEventListener("mousedown",M=>{M.stopPropagation(),M.target instanceof Element&&M.target.closest("button")&&M.preventDefault()})}let d=0;const m=()=>{i.hidden=!0,d++};function v(){for(const p of u)p.setAttribute("aria-selected",String(p.dataset.by===f));o.textContent=oa[f].sub}async function g(){i.hidden=!1,v(),c.hidden=!0,a.textContent="Đang tải…",l.replaceChildren();const p=++d,M=f,y=oa[M];let x=await t.leaderboard(M);for(const S of DT){if(p!==d||"ok"in x||x.fail.kind!=="network")break;await new Promise(T=>setTimeout(T,S)),p===d&&(x=await t.leaderboard(M))}if(p!==d)return;if("fail"in x){const S=h[M];a.textContent=FT(x.fail)+(S?` Bảng ĐÃ ghi ${y.best} của bạn: ${Pa(S.best)}${y.unit} — hạng #${S.rank}.`:""),c.hidden=x.fail.kind==="auth";return}const _=x.ok;if(r.textContent=`Mùa ${_.season}`,!_.top.length){a.textContent=y.empty;return}if(a.textContent=`${Pa(_.total)} ${y.count}`,l.replaceChildren(..._.top.map((S,T)=>Nd(S,M,T+1,S.pid===_.me))),_.mine&&!_.top.some(S=>S.pid===_.me)){const S=document.createElement("li");S.className="board-gap",S.textContent="…",l.append(S,Nd(_.mine,M,_.mine.rank,!0))}}e.addEventListener("click",()=>{g()}),c.addEventListener("click",()=>{g()});for(const p of u)p.addEventListener("click",()=>{f=p.dataset.by==="lanterns"?"lanterns":"score",g()});return i.querySelector(".board-close").addEventListener("click",m),i.addEventListener("click",p=>{p.target===i&&m()}),window.addEventListener("keydown",p=>{p.code==="Escape"&&!i.hidden&&m()}),{setAvailable(p){e.hidden!==!p&&(e.hidden=!p,p||m())},close:m,remember(p){h.score={best:p.bestScore,rank:p.scoreRank},p.lanternRank!==void 0&&(h.lanterns={best:p.bestLanterns??0,rank:p.lanternRank})}}}const fi=n=>Math.floor(n).toLocaleString("vi-VN");function kT(n,t,e){const i=t.runs[0],s=`Đường bay hôm nay ${n0(n)}`;if(e)return i?`${s} · bóng vàng là kỷ lục hôm nay của bạn ${fi(i.dist)} m — bay vượt nó!`:`${s} · bay một ván trên 200 m để có bóng của chính bạn`;if(!i)return`${s} · chưa ai bay — bạn mở đường!`;const r=i.pid===t.me?"bạn":i.name;return`${s} · ${t.total} người đã bay · dẫn đầu ${r} ${fi(i.dist)} m`}function BT(n,t){if(t)return n.saved?`Kỷ lục hôm nay mới ${fi(n.best)} m — ván sau bóng vàng của bạn bay đúng đường này`:`Kỷ lục hôm nay ${fi(n.best)} m — bóng vàng vẫn là ván đó, bay vượt nó!`;const e=n.saved?`kỷ lục ngày mới ${fi(n.best)} m`:`kỷ lục ngày ${fi(n.best)} m`,i=n.lanternRank?` · đèn #${n.lanternRank}`:"";return`BXH điểm mùa ${Fa} #${n.scoreRank} (cao nhất ${fi(n.bestScore)})${i} · hôm nay hạng ${n.rank}/${n.total}, ${e}`}const zT=n=>`Ván có bot lái hoặc nhảy quãng — ${n?"không lưu làm bóng của bạn":"không gửi lên bảng hôm nay"}.`;function HT(n){return n.kind==="auth"?"Phiên đăng nhập đã hết hạn — ván đã được giữ lại, tải lại trang (F5) để gửi lên bảng.":n.kind==="network"?"Mất kết nối tới máy chủ — ván đã được giữ lại, sẽ tự gửi ở lần kết nối sau.":`Máy chủ không nhận ván (${n.why??n.status}).`}function VT(n){return n.type==="pass"?n.self?["Vượt kỷ lục của bạn!","big"]:[`Vượt ${n.name}!`,"combo"]:n.type==="passed"?[n.self?"Kỷ lục của bạn vượt lên":`${n.name} vượt lên`,"big"]:[n.self?`Kỷ lục của bạn dừng ở ${fi(n.dist)} m`:`${n.name} rơi ở ${fi(n.dist)} m`,"big"]}const GT=200,WT=1.2,XT=n=>Math.floor(n).toLocaleString("vi-VN");function qT(n){const t=iT(n.params),e=s0(n.params),i=e?pT(ST()):sT(n.params),s=r0(n.params)?CT({quality:n.quality}):null,r=dT(),o=LT(i),a=fT(),c=IT(n.root,a0),l=t&&!e?OT(n.root,i):null;let u="",f=0,h=!1,d=-9,m=null,v=0,g=!1,p=0,M="";const y=_=>{M=_,n.screens.setOnline(_)};async function x(_,S){u=_;const T=++f,b=await o.flush(),w=await i.board(_);if(T!==f||!w)return;const R=b.length?` · đã gửi bù ván ${XT(Math.max(...b))} m`:"";S?y(kT(_,w,e)+R):R&&y(M+R);const C=hT(w),N=await i.paths(_,C.map(I=>I.pid));if(T!==f)return;const D=C.filter(I=>N[I.pid]).map(I=>({run:I,self:I.pid===w.me,path:N[I.pid]}));h?m=D:a.set(D)}return t&&x(n.route,!0),{runStart(_,S){t&&S!==u&&(a.set([]),m=null,x(S,!1)),m&&a.set(m),m=null,r.start(_),a.reset(),h=!0,l?.close(),d=-9,v++,g=!1,p=_.z,s?.start(_,S,n.params.has("alt"))},afterStep(_,S){(S||Math.abs(_.z-p)>10)&&(g=!0),p=_.z,r.afterStep(_),s?.afterStep(_,1/60)},present(_,S,T,b){const w=h&&(_.mode==="run"||_.mode==="crash"),R=r.seconds()-(1-T)/60;if(w)for(const C of a.update(R,S.z))_.mode!=="run"||R-d<WT||(d=R,n.hud.toast(...VT(C)));if(t&&!e&&o.keepAlive(()=>w?n.hud.toast("Phiên đăng nhập hết hạn — ván vẫn được giữ, bay xong tải lại trang (F5)","big","hurt"):y(`${M?`${M} · `:""}Phiên đăng nhập đã hết hạn — tải lại trang (F5).`)),n.view.update(w?a.ghosts():[],S,R,b,n.camera.position),s&&_.mode==="run"){let C=!1;for(let N=0;N<n.view.count;N++)C||=n.view.heads[N].distanceTo(n.camera.position)<15;s.frame(b,n.view.count,C)}c.update(n.camera,n.view,a.ghosts(),a.rank(S.z),S.z,w),l?.setAvailable(n.screens.visible()!==null)},async runOver(_,S){if(h=!1,s&&i.logRun(s.finish(_,S,g,n.rv)),!t||!u||_.z<GT)return;if(g)return y(zT(e));const T=v;e||y("Đang gửi ván lên bảng hôm nay…");const b=await o.submit(u,{sv:Fa,lanterns:_.lanterns,dist:Math.floor(_.z),score:Oa(_),dur:Math.min(3600,Math.round(r.seconds()*10)/10),crash:r.truncated()?null:S,path:r.finish()});T===v&&y("fail"in b?HT(b.fail):BT(b.ok,e)),"ok"in b&&l?.remember(b.ok),"ok"in b&&await x(u,!1)}}}const KT=.8;function YT(n,t,e){const i=document.createElement("button");i.type="button",i.className="pause-btn",i.setAttribute("aria-label","Tạm dừng"),i.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',t.prepend(i);const s=document.createElement("div");s.className="pause-screen",s.innerHTML=`<div class="pause-card"><div class="pause-title">Đang tạm dừng</div>
    <button type="button" class="btn-play" data-resume>Bay tiếp</button>
    <div class="pause-hint">${e?"Hoặc chạm bất kỳ đâu":"Hoặc bấm Space"}</div></div>`,n.appendChild(s);let r=!1,o=!1,a=1;const c=()=>{s.classList.toggle("on",r),i.classList.toggle("on",o&&!r)},l={paused:()=>r,pause(){!o||r||(r=!0,c())},resume(){r&&(r=!1,a=.15,c())},setRunning(u){o!==u&&(o=u,u||(r=!1),c())},factor(u){return r?0:(a=Math.min(1,a+u/KT),a)}};return i.addEventListener("click",()=>l.pause()),s.querySelector("[data-resume]").addEventListener("click",u=>{u.stopPropagation(),l.resume()}),document.addEventListener("visibilitychange",()=>{document.hidden&&l.pause()}),window.addEventListener("keydown",u=>{!u.repeat&&(u.code==="KeyP"||u.code==="Escape")&&(r?l.resume:l.pause)()}),l}const l0="skyrun.best",$T=800,ZT={pillar:"Đâm cột đá — lần sau kéo ngón (hoặc chạm) sang bên trống để né.",spike:"Đâm mỏm đá — vuốt lên để vọt qua, hoặc sang làn khác.",ridge:"Sống đá chắn cả khe — vuốt lên để vọt qua.",bridge:"Cầu treo chắn ngang — vuốt xuống để chui qua."},JT={spike:"Đâm mái nhà — vuốt lên để vọt qua nóc, hoặc kéo sang làn trống.",ridge:"Mái đình chắn ngang — vuốt lên để vọt qua.",bridge:"Cổng làng chắn ngang — vuốt xuống để chui qua cửa cổng."};function QT(){try{return Number(localStorage.getItem(l0)??0)||0}catch{return 0}}function jT(n){try{localStorage.setItem(l0,String(n))}catch{}}function tE(n,t){const e=document.createElement("div");e.className="screens",n.appendChild(e);let i=null,s=QT(),r=0,o="";const a=()=>{const l=e.querySelector("[data-online]");l&&(l.textContent=o,l.hidden=!o)},c=()=>{e.querySelector("[data-play]")?.addEventListener("click",l=>{l.stopPropagation(),t()})};return{visible:()=>i,tapReady:()=>i!=="over"||performance.now()-r>$T,showTitle(){i="title",e.className="screens title",e.innerHTML=`
        <div class="title-card">
          <div class="title-kicker">Khau Phạ · Wingsuit</div>
          <h1 class="title-word">Sky Run</h1>
          <p class="title-sub">Lao qua khe đá, chui dưới cầu phướn, bay tới đêm hội đèn trời.</p>
          <button class="btn-play" data-play>Bay <kbd>Space</kbd></button>
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
          ${s>0?`<div class="title-best">Kỷ lục <b>${s.toLocaleString("vi-VN")}</b></div>`:""}
          <div class="screen-online" data-online hidden></div>
          <div class="rotate-hint">Mẹo: xoay ngang máy để thấy rộng hơn</div>
        </div>`,c(),a()},setOnline(l){o=l??"",a()},showOver(l,u){i="over",r=performance.now();const f=Oa(l),h=f>s;return h&&(s=f,jT(s)),e.className="screens over",e.innerHTML=`
        <div class="over-card">
          <div class="over-kicker">${h?"Kỷ lục mới!":"Hạ cánh khẩn cấp"}</div>
          <div class="over-score">${f.toLocaleString("vi-VN")}</div>
          <div class="over-stats">
            <div><b>${Math.floor(l.z).toLocaleString("vi-VN")} m</b><span>quãng bay</span></div>
            <div><b>${l.lanterns}</b><span>đèn trời</span></div>
            <div><b>${s.toLocaleString("vi-VN")}</b><span>kỷ lục</span></div>
          </div>
          ${u?`<p class="over-tip">${zi(l.z)&&JT[u]||ZT[u]}</p>`:""}
          <div class="screen-online" data-online hidden></div>
          <button class="btn-play" data-play>Bay lại <kbd>Space</kbd></button>
        </div>`,c(),o="",a(),h},hide(){i=null,e.className="screens",e.innerHTML=""}}}const eE='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',nE=[["on","Hiện"],["dim","Mờ"],["off","Tắt"]],iE={id:"shuffle",label:"Ngẫu nhiên",style:"Cả danh sách — hết bài tự sang bài khác"};function sE(n,t,e,i,s){i.mode=Ur().ghosts;const r=document.createElement("button");r.type="button",r.setAttribute("aria-label","Cài đặt"),r.innerHTML=eE,t.el.insertBefore(r,t.el.querySelector('[data-k="mute"]'));const o=document.createElement("div");o.className="settings-panel",o.hidden=!0,o.innerHTML=`
    <div class="settings-card" role="dialog" aria-label="Cài đặt">
      <div class="board-head"><div><b>Cài đặt</b></div><button type="button" class="board-close" aria-label="Đóng">×</button></div>
      <h3>Âm thanh</h3>
      <div class="settings-row"><span>Tiếng hiệu ứng + giọng dẫn</span><div class="settings-seg two" data-sw="sfx"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <div class="settings-row"><span>Nhạc nền</span><div class="settings-seg two" data-sw="music"><button type="button" data-on="1">Bật</button><button type="button" data-on="0">Tắt</button></div></div>
      <h3>Chọn nhạc nền</h3><p class="settings-note"></p><div class="settings-music"></div>
      <h3>Bóng ma <small>người đã bay route hôm nay</small></h3><div class="settings-seg"></div>
    </div>`,n.append(o);const a=o.querySelector(".settings-note"),c=o.querySelector(".settings-music"),l=o.querySelector(".settings-seg"),u=[iE,...ma].map(g=>{const p=document.createElement("button");return p.type="button",p.className="settings-opt",p.dataset.music=g.id,p.innerHTML='<b></b><small></small><span class="now">♪ đang phát</span>',p.querySelector("b").textContent=g.label,p.querySelector("small").textContent=g.style,c.append(p),p}),f=nE.map(([g,p])=>{const M=document.createElement("button");return M.type="button",M.dataset.ghost=g,M.textContent=p,l.append(M),M}),h=()=>{const g=e.music(),p=g?.choice()??Ur().music,M=g?.playing()?.id,y=g?.loading()?.id;for(const _ of u){const S=_.dataset.music;_.classList.toggle("on",S===p),_.classList.toggle("playing",S===M||S===y),_.querySelector(".now").textContent=S===y?"… đang tải":"♪ đang phát"}const x=e.prefs();a.textContent=x.music?"":"Nhạc đang tắt — chọn một mục là bật lại.";for(const _ of f)_.classList.toggle("on",_.dataset.ghost===i.mode);for(const _ of o.querySelectorAll("[data-sw] [data-on]")){const S=_.parentElement.dataset.sw;_.classList.toggle("on",x[S]===(_.dataset.on==="1"))}};let d=0;const m=()=>{o.hidden=!0,clearInterval(d)},v=()=>{s.pause(),o.hidden=!1,h(),d=window.setInterval(h,1e3)};for(const g of[r,o]){for(const p of["touchstart","touchend","touchmove","pointerdown"])g.addEventListener(p,M=>M.stopPropagation(),{passive:!0});g.addEventListener("mousedown",p=>{p.stopPropagation(),p.target instanceof Element&&p.target.closest("button")&&p.preventDefault()})}r.addEventListener("click",v),o.querySelector(".board-close").addEventListener("click",m),o.addEventListener("click",g=>{if(g.target===o)return m();const p=g.target instanceof Element?g.target.closest("[data-music],[data-ghost],[data-on]"):null;if(p){if(p.dataset.on){const M=p.parentElement.dataset.sw;e.prefs()[M]!==(p.dataset.on==="1")&&(M==="sfx"?e.toggleSfx:e.toggleMusic)(),t.sync()}else p.dataset.music?(e.prefs().music||e.toggleMusic(),e.music()?.setChoice(p.dataset.music),t.sync()):(i.mode=p.dataset.ghost,Jp({ghosts:i.mode}));h()}}),window.addEventListener("keydown",g=>{o.hidden||(g.stopPropagation(),g.code==="Escape"&&m())},{capture:!0})}const rE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="off" d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',oE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17.5V6l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/><path class="off" d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function aE(n,t){const e=document.createElement("div");e.className="sound-btns",e.innerHTML=`<button type="button" data-k="mute" aria-label="Tắt/bật tiếng hiệu ứng">${rE}</button><button type="button" data-k="music" aria-label="Tắt/bật nhạc nền">${oE}</button>`,n.appendChild(e);const i=e.querySelector('[data-k="mute"]'),s=e.querySelector('[data-k="music"]'),r=()=>{const o=t.prefs();i.classList.toggle("off",!o.sfx),s.classList.toggle("off",!o.music)};for(const o of["touchstart","touchend","touchmove","pointerdown"])e.addEventListener(o,a=>a.stopPropagation(),{passive:!0});return e.addEventListener("mousedown",o=>{o.stopPropagation(),o.preventDefault()}),i.addEventListener("click",()=>{t.toggleSfx(),r()}),s.addEventListener("click",()=>{t.toggleMusic(),r()}),r(),{sync:r,el:e}}const cE=2.6,lE=60,u0=[];for(const n of Jr.segs)n.k===0||Math.abs(n.k*n.len)<cE||u0.push({x:n.x+Math.cos(n.th)/n.k,z:n.z-Math.sin(n.th)/n.k,r:Math.abs(1/n.k)-lE,u:n.u0});function uE(n,t,e){const i=Jr,s=Math.round((t+i.oz-i.bz)/i.endZ);for(let r=s-1;r<=s+1;r++)for(const o of u0){const a=r*i.endX-i.ox+o.x,c=r*i.endZ-i.oz+o.z,l=Math.hypot(n-a,t-c)/o.r;if(l>=1)continue;const u=r*mi-Zn+o.u,f=xi(u)-We(150,240,kn(u+300)),h=xi(u)+70+50*(hi(n/70,t/70,3,91)-.5);let d=f+(h-f)*Math.pow(1-l*l,.6)+40*(hi(n/45,t/45,3,94)-.5)*(1-l);const m=(d-f)/45+.8*(hi(n/90,t/90,2,93)-.5);d=We(d,f+(Math.floor(m)+se(.55,1,m-Math.floor(m)))*45,.85),d>e&&(e=We(e,d,1-se(.75,1,l)))}return e}const hE=128,fE=1024,Id=new Map,jc={s:0,lat:0,dist:0};function dE(n,t,e,i,s){const r=i*Math.SQRT2/2,o=(t+.5)*i,a=(e+.5)*i,c=Math.round((a+n.oz-n.bz)/n.endZ);Ag(o,a,(c-3)*mi-Zn,(c+4)*mi-Zn,jc,n);const l=jc.dist+2*r+s,u=[];for(let h=c-3;h<=c+4;h++){const d=h*n.endX-n.ox,m=h*n.endZ-n.oz;if(Math.hypot(o-d-n.bx,a-m-n.bz)-n.br>l)continue;const v=n.segs.length-1;for(let g=0;g<=v;g++){const p=n.segs[g];if(Math.hypot(o-d-p.bx,a-m-p.bz)-p.br>l)continue;const M=d+p.x,y=m+p.z,x=Math.sin(p.th),_=Math.cos(p.th),S={x:M,z:y,s0:h*mi-Zn+p.u0,len:p.len,k:p.k,th:p.th,sin:x,cos:_,cx:p.k===0?0:M+_/p.k,cz:p.k===0?0:y-x/p.k,r:p.k===0?0:Math.abs(1/p.k),sg:Math.sign(p.k),bx:d+p.bx,bz:m+p.bz,br:p.br,pcx:0,pcz:0,pr:0,ncx:0,ncz:0,nr:0};Dd(n,h,g,-1,S,"p",p.k===0),Dd(n,h,g,1,S,"n",p.k===0),u.push(S)}}const f=h=>Math.hypot(o-h.bx,a-h.bz)-h.br;return u.sort((h,d)=>f(h)-f(d)),{far:jc.dist-r>600,cands:u}}function Dd(n,t,e,i,s,r,o){const a=n.segs.length-1;for(let c=0;c<=a;c++){e+=i,e<0?(e=a,t--):e>a&&(e=0,t++);const l=n.segs[e];if(l.k===0){if(o)continue;return}const u=t*n.endX-n.ox+l.x+Math.cos(l.th)/l.k,f=t*n.endZ-n.oz+l.z-Math.sin(l.th)/l.k;r==="p"?(s.pcx=u,s.pcz=f,s.pr=Math.abs(1/l.k)):(s.ncx=u,s.ncz=f,s.nr=Math.abs(1/l.k));return}}function Ud(n,t,e,i,s,r,o){const a=Math.floor(e/s),c=Math.floor(i/s),l=(a*1000003+c)*2+r;let u=n.get(l);return u||n.set(l,u=dE(t,a,c,s,o)),u}function pE(n,t,e,i){const s=`${e}`;let r=Id.get(s);(!r||r.size>4e4)&&Id.set(s,r=new Map);const o=Ud(r,i,n,t,fE,1,e);return o.far?o.cands:Ud(r,i,n,t,hE,0,e).cands}const Ho=30;function mh(n,t,e,i,s=Jr){const r=pE(n,t,e,s);let o=1/0,a=0,c=0;for(const u of r){if(Math.hypot(n-u.bx,t-u.bz)-u.br>o+e)continue;let f,h,d=1/0;if(u.k===0){const y=n-u.x,x=t-u.z;f=y*u.sin+x*u.cos,h=y*u.cos-x*u.sin}else{const y=n-u.cx,x=t-u.cz;let S=Math.atan2(u.sg*x,-u.sg*y)-u.th;if(S-=2*Math.PI*Math.round((S-u.k*u.len/2)/(2*Math.PI)),f=S/u.k,d=Math.hypot(y,x),h=u.sg*(u.r-d),d<Ho){const T=Fd[c++]??={s:0,lat:0,dist:0,prom:0,core:0};T.s=u.s0+u.len/2,T.lat=0,T.dist=u.r-d,T.prom=0,T.core=1-d/Ho*(d/Ho)*(3-2*d/Ho)}d+=u.r}if(f<-.01||f>u.len+.01)continue;const m=Math.abs(h);if(m>o+e)continue;m<o&&(o=m);const v=u.s0+Math.min(u.len,Math.max(0,f));let g=!1;for(let y=0;y<a;y++)Math.abs(i[y].s-v)<.5&&(g=!0);if(g)continue;let p=d-m;u.pr>0&&(p=Math.min(p,Math.hypot(n-u.pcx,t-u.pcz)+u.pr-m)),u.nr>0&&(p=Math.min(p,Math.hypot(n-u.ncx,t-u.ncz)+u.nr-m));const M=i[a]??={s:0,lat:0,dist:0,prom:0,core:0};M.s=v,M.lat=h,M.dist=m,M.prom=Math.max(0,p),M.core=0,a++}let l=0;for(let u=0;u<a;u++){if(i[u].dist>o+e)continue;const f=i[l],h=i[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=0,l++}for(let u=0;u<c;u++){const f=i[l++]??={s:0,lat:0,dist:0,prom:0,core:0},h=Fd[u];f.s=h.s,f.lat=h.lat,f.dist=h.dist,f.prom=h.prom,f.core=h.core}return l}const Fd=[],Od=[];function Mu(n,t,e,i){const s=mh(n,t,0,Od);for(let r=0;r<s;r++){const o=Od[r];if(o.core===0&&Math.abs(o.s-e)<=Math.abs(i)+80)return!0}return!1}const kd=24,La=520,fr=15,mE=14,Bd=200,gE=60,Yt={x:0,z:0,n210:NaN,n700:NaN,n500:NaN,out:NaN,far:NaN,n90:NaN},As={n210:()=>Number.isNaN(Yt.n210)?Yt.n210=hi(Yt.x/210,Yt.z/210,3,21):Yt.n210,n700:()=>Number.isNaN(Yt.n700)?Yt.n700=hi(Yt.x/700,Yt.z/700,3,5):Yt.n700,n500:()=>Number.isNaN(Yt.n500)?Yt.n500=hi(Yt.x/500,Yt.z/500,2,3):Yt.n500,out:()=>Number.isNaN(Yt.out)?Yt.out=90*zh(Yt.x/800,Yt.z/800,4,7)+30*(hi(Yt.x/160,Yt.z/160,3,11)-.5):Yt.out,far:()=>Number.isNaN(Yt.far)?Yt.far=250+1150*zh(Yt.x/3200,Yt.z/3200,5,9):Yt.far,n90:()=>Number.isNaN(Yt.n90)?Yt.n90=hi(Yt.x/90,Yt.z/90,2,71):Yt.n90},Ue={o:0,ty:0,w:0,sill:0,fly:0,vil:0};function vE(n){const{o:t,ty:e,w:i,sill:s,fly:r,vil:o}=Ue,a=We(e-We(150,240,t),r-13,s),c=e-a;let l;if(n<=i){const g=i*We(.2,.55,t),p=ha((n-g)/(i-g));l=a+c*We(Math.pow(p,1.5),p*p*(3-2*p),t),t>0&&(l+=t*34*(As.n210()-.35)*se(25,110,n))}else{const g=ha((n-i)/We(280,700,t));l=e+(We(400,-50,t)+140*(As.n700()-.5))*(1-(1-g)*(1-g))}const u=se(i*.9,i*1.25,n),f=se(fr+8,fr+22,n)*(1-u)*(1-t),h=We(kd,kd*.5,f),d=Math.max(.7*u,.85*f);if(d>0){const g=(l+30*(As.n500()-.5))/h;l=We(l,(Math.floor(g)+se(.45,1,g-Math.floor(g)))*h,d)}u>0&&(l+=u*As.out());const m=se(i+900,i+5e3,n);m>0&&(l+=m*As.far());const v=o*(1-se(240,380,n));if(v>0&&(l=We(l,r-wr+1.6*(As.n90()-.5)-.012*Math.max(0,n-40),v)),l-=6*(1-se(0,18,n))*(l<a+20?1-s:0),n<fr){const g=We(mE+(fr-n)*2,11+(fr-n)*.3,s);l=Math.min(l,r-We(g,wr+.4,o))}return l}const tl=[],zd=[],Hd=new Map;function xE(n,t){const e=n*100003+t;let i=Hd.get(e);if(i!==void 0)return i;const s=(n+.2+.6*_t(n,t,61))*La,r=(t+.2+.6*_t(n,t,62))*La,o=70+110*_t(n,t,63),a=mh(s,r,0,zd)>0?zd[0]:null;if(!a||kn(a.s)<.6||a.dist<o+45)i=null;else{const c=yu(a.s);i={ox:s,oz:r,r:o,floor:c,peak:xi(a.s)-200+230*_t(n,t,64)}}return Hd.set(e,i),i}function _E(n,t,e){const i=Math.floor(n/La),s=Math.floor(t/La);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=xE(i+o,s+r);if(!a)continue;const c=Math.hypot(n-a.ox,t-a.oz)/a.r;if(c>=1)continue;const l=a.floor+(a.peak-a.floor)*Math.pow(1-c*c,.6);l>e&&(e=We(e,l,1-se(.8,1,c)))}return e}function h0(n,t,e){if(!Number.isFinite(n+t))return e.h=e.s=e.lat=e.vil=NaN,e;Yt.x=n,Yt.z=t,Yt.n210=Yt.n700=Yt.n500=Yt.out=Yt.far=Yt.n90=NaN;const i=mh(n,t,Bd,tl);let s=1/0;for(let o=0;o<i;o++){const a=tl[o];a.core===0&&a.dist<s&&(s=a.dist,e.s=a.s,e.lat=a.lat)}Ue.o=Ue.ty=Ue.w=Ue.sill=Ue.fly=Ue.vil=0;let r=0;for(let o=0;o<i;o++){const a=tl[o],c=(1-se(0,Bd,a.dist-s))*(a.core>0?a.core:se(0,gE,a.prom)+1e-4);c<=0||(r+=c,Ue.o+=c*kn(a.s),Ue.ty+=c*xi(a.s),Ue.w+=c*Dr(a.s),Ue.sill+=c*Up(a.s),Ue.fly+=c*Pe(a.s),Ue.vil+=c*Fn(a.s))}return Ue.o/=r,Ue.ty/=r,Ue.w/=r,Ue.sill/=r,Ue.fly/=r,Ue.vil/=r,e.vil=Ue.vil,e.h=uE(n,t,_E(n,t,vE(s))),e}const ME={h:0,s:0,lat:0,vil:0};function Ke(n,t){return h0(n,t,ME).h}function yu(n){return xi(n)-We(150,240,kn(n))}const Ya=`
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
`,Xs={uPilot:{value:new he(0,0,0,1)},uHazTime:{value:0}},$a=`
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
`;function yE(n,t,e,i){Xs.uPilot.value.set(n,t,Math.sin(e),Math.cos(e)),Xs.uHazTime.value=i}const SE=`
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
}`,bE=`
#include <fog_pars_fragment>
${Ya}
${em}
#ifdef HAZARD
${$a}
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
}`;let wE=null,TE=null;function f0(n,t){const e=new ie({vertexShader:SE,fragmentShader:bE,defines:n?{HAZARD:1}:{},uniforms:xn.merge([lt.fog]),fog:!0});return e.uniforms.uLift=t,e.uniforms.uRegionHg=ka,n&&Object.assign(e.uniforms,Xs),e}const d0={value:1};function EE(){return wE??=f0(!0,d0)}function AE(){return TE??=f0(!1,d0)}const RE=[260,800,1760,2230],CE=1600;function PE(n,t){const e=Pe(n),i=kn(n),s=i>.5?90+50*_t(t,1,71):Dr(n)+22,r=(i>.5?58:46)+18*_t(t,2,72),o={x:0,y:0,z:0},a=d=>Ke(Se(n,d,0,o).x,o.z)-e,c=[];for(let d=0;d<=24;d++){const m=d/24*Math.PI,v=-s*Math.cos(m),g=Math.min(a(v)-15,r),p=g+(r-g)*Math.pow(Math.sin(m),.55)+6*Math.sin(m*3+t);c.push(new P(v,p,4*Math.sin(m*2+t)))}const l=(i>.5?13:9)+4*_t(t,3,73),u=new Wa(new ah(c),90,l,14,!1),f=u.getAttribute("position"),h=u.getAttribute("normal");for(let d=0;d<f.count;d++){const v=(_t(f.getX(d)*.08+t,f.getY(d)*.08+f.getZ(d)*.05,74)-.5)*l*.7;f.setXYZ(d,f.getX(d)+h.getX(d)*v,f.getY(d)+h.getY(d)*v*1.3,f.getZ(d)+h.getZ(d)*v)}return u.setAttribute("aCrest",new Nt(new Float32Array(f.count),1)),u.computeVertexNormals(),u}function LE(){const n=new Be,t=AE(),e=new Map,i={x:0,y:0,z:0};return{group:n,update(s){const r=new Set,o=Qr(s);for(let a=o;a<=o+1;a++)RE.forEach((c,l)=>{const u=a*qe+c-is;if(u<s-60||u>s+CE)return;const f=a*10+l;if(r.add(f),e.has(f))return;const h=new Jt(PE(u,f*1.37),t);Se(u,0,0,i),h.position.set(i.x,i.y,i.z),h.rotation.y=En(u),h.matrixAutoUpdate=!1,h.updateMatrix(),n.add(h),e.set(f,h)});for(const[a,c]of e)r.has(a)||(n.remove(c),c.geometry.dispose(),e.delete(a))}}}const p0={zenith:["#7d8fc9","#4d5a9c","#22306a","#3f7bd6"],hazeAway:["#9d94c4","#7a6ca6","#323870","#8eaad6"],hazeSun:["#c99aa6","#c27a8e","#62407c","#d6c3b6"],skyHorizonSun:["#ffad5e","#ff7440","#a8466a","#ffd6a0"],skyHorizonAway:["#eba59a","#c47a94","#4e5290","#9dc0ec"],glow:["#ffbd5c","#ff8a48","#ff9a50","#ffe2a8"],sunDisk:["#fff2c4","#ffcf90","#000000","#fffbe6"],sunLight:["#ffcf8a","#ff9a5c","#5a6ab0","#fff1d6"],skyAmbient:["#9fb0d8","#7f86c2","#46559a","#a9c3ea"],bounce:["#c98f5a","#a8664a","#5e3c34","#b39a6c"]},m0=.18;function el(n,t,e,i=0){const[s,r,o,a]=p0[n],c=Math.min(1,Math.max(0,t));return c<.5?e.set(s).lerp(new ct(r),c*2):e.set(r).lerp(new ct(o),(c-.5)*2),i>0?e.lerp(new ct(a),Math.min(1,i)):e}function NE(n,t,e=0){const i=n.y+(-.07-n.y)*Math.min(1,Math.max(0,t)*1.25)+m0*e,s=Math.hypot(n.x,i,n.z);return{x:n.x/s,y:i/s,z:n.z/s}}const nl=900,IE=15e-6,DE=14e-5;function UE(n){const t=new ct(n);return`vec3(${t.r.toFixed(4)}, ${t.g.toFixed(4)}, ${t.b.toFixed(4)})`}function FE(){return Object.entries(p0).map(([n,t])=>`#define ATM_${n.replace(/[A-Z]/g,e=>`_${e}`).toUpperCase()} atmPal(${t.map(UE).join(", ")})`).join(`
`)}function g0(n,t="fogColor.r",e="fogColor.g"){return`
#define ATM_TIME (${t})
float atmT() { return clamp(ATM_TIME, 0.0, 1.0); }
float atmMorn() { return clamp(${e}, 0.0, 1.0); }
vec3 atmPal(vec3 a, vec3 b, vec3 c, vec3 m) {
  float t = atmT();
  return mix(t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, t * 2.0 - 1.0), m, atmMorn());
}
${FE()}
#define ATM_SUN_DIR normalize(vec3(${n.x.toFixed(5)}, mix(${n.y.toFixed(5)}, -0.07, min(1.0, atmT() * 1.25)) + ${m0.toFixed(3)} * atmMorn(), ${n.z.toFixed(5)}))

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
  float e0 = exp(-max(y0, -200.0) / ${nl.toFixed(1)});
  float e1 = exp(-max(y1, -200.0) / ${nl.toFixed(1)});
  float dy = y1 - y0;
  float avg = abs(dy) > 1.0 ? ${nl.toFixed(1)} * (e0 - e1) / dy : e0;
  return dist * (${IE.toExponential(3)} + density * avg);
}
`}function OE(n,t){Vt.fog_pars_vertex=`#ifdef USE_FOG
 varying vec3 vFogWorld;
#endif`,Vt.fog_vertex=`#ifdef USE_FOG
 vFogWorld = cameraPosition + transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`,Vt.fog_pars_fragment=`#ifdef USE_FOG
uniform vec3 fogColor;
uniform float fogDensity;
varying vec3 vFogWorld;
${g0(t)}
#endif`,Vt.fog_fragment=`#ifdef USE_FOG
  vec3 fogRay = vFogWorld - cameraPosition;
  float fogDist = length(fogRay);
  float fogTau = atmOpticalDepth(cameraPosition.y, vFogWorld.y, fogDist, fogDensity);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, atmHazeColor(fogRay / max(fogDist, 0.001)), 1.0 - exp(-fogTau));
#endif`,n.fog=new Zu(new ct(0,0,0),DE)}function kE(n,t,e=0){n.fog.color.setRGB(t,e,0)}const BE=`
#include <fog_pars_vertex>
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,zE=`
#include <fog_pars_fragment>
${Ya}
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
}`;function HE(n){const t=new P,e=new ie({vertexShader:BE,fragmentShader:zE,defines:n?{CLOUD_LITE:1}:{},uniforms:xn.merge([lt.fog,{uTime:{value:0},uCover:{value:.55},uFwd:{value:new rt(0,1)}}]),transparent:!0,depthWrite:!1,fog:!0}),i=new Jt(new zn(9e3,9e3,1,1).rotateX(-Math.PI/2),e);return i.frustumCulled=!1,i.renderOrder=1,{mesh:i,update(s,r,o){const a=s.position;s.getWorldDirection(t),e.uniforms.uFwd.value.set(t.x,t.z).normalize();const c=o+250,l=kn(c);i.position.set(a.x,yu(c)+20+(xi(c)-170-yu(c)-20)*l,a.z),e.uniforms.uTime.value=r,e.uniforms.uCover.value=.62-.1*l}}}const Vd=120,v0=30,x0=7,VE=x0*(v0+2);function GE(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");for(let i=0;i<18;i++){const s=30+34*_t(i,4,7),r=128+(_t(i*1.7,1,3)-.5)*(240-2*s-20),o=140+(_t(1,i*2.3,5)-.5)*60-(s-30)*.6,a=t.createRadialGradient(r,o,0,r,o,s);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.fillRect(0,0,256,256)}const e=new nh(n);return e.colorSpace=Fe,e}const WE=`
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
}`,XE=`
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
}`;function qE(n){const t=Math.max(10,Math.round(v0*n)),e=new ie({vertexShader:WE,fragmentShader:XE,uniforms:xn.merge([lt.fog,{uMap:{value:null}}]),transparent:!0,depthWrite:!1,side:be,fog:!0});e.uniforms.uMap.value=GE();const i=new Xe(new zn(1,1),e,VE);i.frustumCulled=!1,i.count=0;const s=new Dt,r=new Ae,o=new P,a=new P;let c=Number.NaN;return{mesh:i,update(l){const u=Math.floor(l/Vd)-1;if(u===c)return;c=u;let f=0;for(let h=u;h<u+t+2;h++)for(let d=0;d<x0;d++){const m=(h+_t(d*.7,h,91))*Vd,v=kn(m),g=_t(h,d*1.3,92)<.5?-1:1,p=_t(d,h*1.9,93);let M,y,x;if(d<2)x=12+14*p,M=g*(16+x*.5+p*30*v),y=Pe(m)-10+_t(h,d,94)*12+16*Fn(m);else{if(v<.5||d>3)continue;M=g*(120+p*500),y=xi(m)-210-_t(h,d,95)*60,x=60+80*p}Se(m,M,0,o),Mu(o.x,o.z,m,M)&&(s.compose(o.set(o.x,y,o.z),r,a.set(x*1.6,x*.75,1)),i.setMatrixAt(f++,s))}i.count=f,i.instanceMatrix.needsUpdate=!0}}}const KE=`{
      float shut = step(2.5 * vColor.r, vColor.g) * step(0.45 * vColor.g, vColor.b) * step(vColor.g, 0.3);
      totalEmissiveRadiance += vec3(1.0, 0.58, 0.22) * shut * clamp((1.0 - uLift) / 0.6, 0.0, 1.0) * 1.6;
    }`;function Za(n){const t=new hh({vertexColors:!0,side:n.doubleSide?be:_i});return t.onBeforeCompile=e=>{e.uniforms.uLift=n.lift,n.hazard&&Object.assign(e.uniforms,Xs),e.fragmentShader=`uniform float uLift;
${n.hazard?$a:""}${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * ${n.selfLit.toFixed(3)} * uLift;
  #ifdef USE_FOG
  {
    vec3 toCam = normalize(cameraPosition - vFogWorld);
    float facing = pow(max(dot(-toCam, ATM_SUN_DIR), 0.0), 2.0);
    float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);
    totalEmissiveRadiance += ATM_GLOW * fres * facing * ${n.rim.toFixed(3)} * uLift;
    ${n.hazard?"totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));":""}
    ${n.windows?KE:""}
  }
  #endif`)},t.customProgramCacheKey=()=>`backlit-${n.selfLit}-${n.rim}-${n.doubleSide?2:1}-${n.hazard?"h":""}${n.windows?"w":""}`,t}function bi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Qt;let l=0;for(let u=0;u<n.length;++u){const f=n[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const f=[];for(let h=0;h<n.length;++h){const d=n[h].index;for(let m=0;m<d.count;++m)f.push(d.getX(m)+u);u+=n[h].attributes.position.count}c.setIndex(f)}for(const u in r){const f=Gd(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][h]);const m=Gd(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function Gd(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Nt(o,e,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let h=0,d=u.count;h<d;h++)for(let m=0;m<e;m++){const v=u.getComponent(h,m);a.setComponent(h+f,m,v)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function Wd(n,t){if(t===Kv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(t===cu||t===pm){let e=n.getIndex();if(e===null){const r=[],o=n.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);n.setIndex(r),e=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=e.count-2,s=[];if(t===cu)for(let r=1;r<=i;r++)s.push(e.getX(0)),s.push(e.getX(r)),s.push(e.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(s.push(e.getX(r)),s.push(e.getX(r+1)),s.push(e.getX(r+2))):(s.push(e.getX(r+2)),s.push(e.getX(r+1)),s.push(e.getX(r)));return s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),n}function ns(n,t,e,i,s){const r=n.getAttribute("position"),o=new Float32Array(r.count*3);for(let a=0;a<r.count;a++){const c=Math.min(1,Math.max(0,(r.getY(a)-i)/(s-i))),l=.85+.3*_t(r.getX(a)*.7,r.getZ(a)*.7+r.getY(a),5);for(let u=0;u<3;u++)o[a*3+u]=Math.pow(t[u]+(e[u]-t[u])*c*c,2.2)*l}return n.setAttribute("color",new Nt(o,3)),n}function gh(n,t,e){const i=n.getAttribute("position");for(let s=0;s<i.count;s++){const r=i.getX(s),o=i.getY(s),a=i.getZ(s),c=(_t(r*1.3+e,a*1.3,9)-.5)*t;i.setXYZ(s,r*(1+c),o+c*.6,a*(1+c))}return n.computeVertexNormals(),n}function _0(){const n=[new tn(.35,.55,4,5).translate(0,2,0)];[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]].forEach(([i,s,r],o)=>n.push(gh(new to(i,s,7,1).toNonIndexed().translate(0,r+s/2,0),.25,o)));const e=bi(n.map(i=>i.index?i.toNonIndexed():i));return e.computeVertexNormals(),ns(e,[.05,.12,.07],[.42,.52,.2],1,14)}function M0(){const n=[new tn(.4,.7,5,5,1,!0).translate(0,2.5,0).toNonIndexed()];[[0,8.5,0,4.2,1],[2.6,7.2,1.2,3.1,0],[-2.4,7.4,-.8,3.2,1],[.4,10.6,-.6,2.8,0]].forEach(([i,s,r,o,a],c)=>n.push(gh(new cs(o,a).translate(i,s,r),.35,c*3)));const e=bi(n);return e.computeVertexNormals(),ns(e,[.07,.13,.05],[.62,.6,.18],3,13)}function YE(){const n=[new tn(.35,.55,4,4,1,!0).translate(0,2,0).toNonIndexed()];for(const[e,i,s]of[[4.2,6,3.5],[3.3,5.2,6.8],[2.3,4.4,9.6]])n.push(new to(e,i,5,1).toNonIndexed().translate(0,s+i/2,0));const t=bi(n);return t.computeVertexNormals(),ns(t,[.05,.12,.07],[.42,.52,.2],1,14)}function $E(){const n=[new tn(.4,.7,5,4,1,!0).translate(0,2.5,0).toNonIndexed()];for(const[e,i,s,r,o]of[[0,8.5,0,4.2,0],[2.6,7.2,1.2,3.1,1],[-2.4,7.4,-.8,3.2,2],[.4,10.6,-.6,2.8,3]])n.push(gh(new cs(r,0).translate(e,i,s),.35,o*3));const t=bi(n);return t.computeVertexNormals(),ns(t,[.07,.13,.05],[.62,.6,.18],3,13)}function ZE(){const n=[];for(const[i,s]of[[-3.6,-2.4],[3.6,-2.4],[-3.6,2.4],[3.6,2.4]])n.push(new $t(.4,3,.4).translate(i,1.5,s).toNonIndexed());n.push(ns(new $t(8.4,3.2,5.6).translate(0,4.6,0).toNonIndexed(),[.3,.19,.1],[.5,.33,.18],3,6.2));const t=new to(7.2,4.6,4,1).rotateY(Math.PI/4).scale(1.3,1,.95).translate(0,8.4,0).toNonIndexed();n.push(ns(t,[.42,.3,.14],[.78,.6,.3],6.2,10.7));for(const i of n)i.getAttribute("color")||ns(i,[.22,.15,.09],[.3,.2,.12],0,3);const e=bi(n);return e.computeVertexNormals(),e}function JE(){const n=[];for(const t of[-2.4,0,2.4])n.push(new $t(1.1,1,.1).translate(t,4.8,2.85).toNonIndexed()),n.push(new $t(1.1,1,.1).translate(t,4.8,-2.85).toNonIndexed());return bi(n)}const Su=250,QE=40,dr=1,y0=650,yn={x:0,y:0,z:0};function Xd(n,t){return Math.hypot(Ke(n+3,t)-Ke(n-3,t),Ke(n,t+3)-Ke(n,t-3))/6}function jE(n,t){const e=[],i=[],s=Ba()>.5?Math.round(t*.6):t;for(let r=0;r<y0*2.2&&e.length<s;r++){const o=(n+_t(r*.71,n,41))*Su,a=_t(n,r*.37,42)<.5?-1:1,c=Dr(o),l=Math.pow(_t(r*.53,n*1.7,43),2.6)*(240+560*kn(o)),u=Math.max(c*.7,17)+l;Se(o,a*u,0,yn);const f=yn.x,h=yn.z;if(!Mu(f,h,o,u))continue;const d=Ke(f,h),m=Pe(o);if(u<24&&d>m-(Up(o)>.5?12:22)||Xd(f,h)>3.2||d<m-200)continue;const v=.7+.9*_t(r,n*3.1,44);e.push({p:new P(f,d-.5,h),s:v,r:_t(r,n,45)*6.28,kind:_t(f/90,h/90,46)<.55?0:1})}for(let r=0;r<40&&i.length<7;r++){const o=(n+_t(r*1.31,n,51))*Su,a=_t(n,r*.91,52)<.5?-1:1,c=Math.max(Dr(o)*.7,30)+_t(r,n*2.3,53)*220;if(Se(o,a*c,0,yn),!Mu(yn.x,yn.z,o,c))continue;const l=Ke(yn.x,yn.z);Xd(yn.x,yn.z)>.45||l>Pe(o)-18||i.push({p:new P(yn.x,l,yn.z),s:1,r:En(o)-a*(Math.PI/2)+(_t(r,n,54)-.5),kind:0})}return{trees:e,houses:i}}const vh={value:1},tA=Za({lift:vh,selfLit:.2,rim:.85}),S0=Za({lift:vh,selfLit:.2,rim:.85});function Rs(n,t,e=!1){const i=e?new je({color:"#ffb35a"}):tA,s=new Xe(n,i,t);return s.count=0,s.frustumCulled=!1,s}function eA(n){const t=n.ahead,e=Math.round(y0*n.density),i=e*(dr+t+1),s=new Be,r=Rs(_0(),i),o=Rs(M0(),i),a=Rs(YE(),i),c=Rs($E(),i),l=Rs(ZE(),8*(dr+t+1)),u=Rs(JE(),8*(dr+t+1),!0);s.add(r,o,a,c,l,u);const f=new Map;let h=Number.NaN;const d=new Dt,m=new Ae,v=new P(0,1,0),g=new P,p=new ct,M=new ct,y=()=>{const x=[0,0,0,0],_=[r,o,a,c];let S=0;for(let T=h;T<=h+dr+t;T++){let b=f.get(T);b||f.set(T,b=jE(T,e));const w=T-h>n.near-1?2:0;for(const R of b.trees){m.setFromAxisAngle(v,R.r),d.compose(R.p,m,g.set(R.s,R.s*(.9+.25*Math.sin(R.r*3)),R.s));const C=w+R.kind,N=_[C],D=x[C]++;N.setMatrixAt(D,d);const I=Ba();p.setHSL(.22-.05*I+.06*Math.sin(R.r*5),.25,.5-.07*I+.12*Math.cos(R.r*7)),N.setColorAt(D,p.multiplyScalar(2))}for(const R of b.houses)m.setFromAxisAngle(v,R.r),d.compose(R.p,m,g.set(1,1,1)),l.setMatrixAt(S,d),u.setMatrixAt(S++,d)}for(const T of[...f.keys()])(T<h-1||T>h+dr+t+1)&&f.delete(T);_.forEach((T,b)=>T.count=x[b]),l.count=S,u.count=S;for(const T of[..._,l,u])T.instanceMatrix.needsUpdate=!0,T.instanceColor&&(T.instanceColor.needsUpdate=!0)};return{group:s,update(x,_){const S=Math.floor((x-QE)/Su);S!==h&&(h=S,y()),vh.value=1-.55*Math.min(1,Math.max(0,(_-.4)/.5)),u.material.color.copy(M.set("#ffb35a").multiplyScalar(.25+3.2*_*_))}}}const nA=`
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
}`,iA=`
uniform float uCore;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 9.0);
  float halo = exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(vColor.rgb * (core * uCore + halo), (core + halo) * vColor.a);
}`;function xh(n,t={}){const e=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*4),r=new Qt;r.setAttribute("position",new Nt(e,3)),r.setAttribute("aSize",new Nt(i,1)),r.setAttribute("aColor",new Nt(s,4));const o=new ie({vertexShader:nA,fragmentShader:iA,uniforms:{uScale:{value:600},uMaxPx:{value:1e5},uCore:{value:t.core??2.4}},transparent:!0,depthWrite:!1,blending:gn}),a=new Aa(r,o);return a.frustumCulled=!1,a.renderOrder=4,{points:a,set(c,l,u,f,h,d,m,v,g){e[c*3]=l,e[c*3+1]=u,e[c*3+2]=f,i[c]=h,s[c*4]=d,s[c*4+1]=m,s[c*4+2]=v,s[c*4+3]=g},commit(c){r.setDrawRange(0,c);for(const l of["position","aSize","aColor"])r.getAttribute(l).needsUpdate=!0},setViewport(c,l){o.uniforms.uScale.value=c/(2*Math.tan(l*Math.PI/360)),t.maxFrac&&(o.uniforms.uMaxPx.value=Math.max(4,c*t.maxFrac))}}}const Ni=5,il=3,sA=.08,rA=3,oA=new ct("#ffd27a"),aA=new ct("#9b8cff");function cA(){const n={head:[0,.08,1],sl:[.26,0,.6],sr:[-.26,0,.6],hl:[1.1,0,.38],hr:[-1.1,0,.38],pl:[.22,0,-.3],pr:[-.22,0,-.3],fl:[.36,0,-1],fr:[-.36,0,-1],cr:[0,0,-.6]},t=[["head","sl","sr"],["sl","pl","sr"],["sr","pl","pr"],["sl","hl","pl"],["hl","fl","pl"],["sr","pr","hr"],["hr","pr","fr"],["pl","fl","cr"],["pr","cr","fr"],["pl","cr","pr"]],e=new Qt;return e.setAttribute("position",new qt(t.flat().flatMap(i=>n[i]),3)),e}function lA(){const n=new je({color:"#ffffff",blending:gn,transparent:!0,depthWrite:!1,side:be,fog:!1}),t=new Xe(cA(),n,Ni);t.frustumCulled=!1,t.count=0;const e=xh(Ni*(il+1),{maxFrac:.025,core:1.1}),i={z:0,x:0,v:0,ended:!1,after:0},s=new Be;s.add(t,e.points);const r=Array.from({length:Ni},()=>new P),o=new Array(Ni).fill(0),a=new Array(Ni).fill(0),c=new Array(Ni).fill(0),l=new Array(Ni).fill(0),u=new Dt,f=new Ae,h=new ti(0,0,0,"YXZ"),d=new P,m={x:0,y:0,z:0},v=new P(1.25,1.25,1.25),g=new ct,p={group:s,setViewport:(M,y)=>e.setViewport(M,y),heads:r,alphas:o,owner:a,count:0,mode:"on",update(M,y,x,_,S){let T=0,b=0;const w=p.mode==="off"?[]:M.slice(0,Ni),R=c0(w),C=new Set(w.map((D,I)=>[Math.abs(D.at.z-y.z),I]).filter(([,D])=>xu(D,y.z,R)>0).sort((D,I)=>D[0]-I[0]).slice(0,rA).map(([,D])=>D)),N=p.mode==="dim"?.5:1;w.forEach((D,I)=>{const{z:U,x:z,v:H,ended:Q,after:W}=D.at,Y=U-y.z,tt=_>0?(z-c[I])/_:0;if(c[I]=z,l[I]+=(Math.max(-.8,Math.min(.8,tt*.03))-l[I])*Math.min(1,_*10),Y<-4)return;Se(U,z,H,d);const St=Q&&D.run.crash?W/.8:Q?1:0,ut=Math.abs(Y)<10&&Math.abs(z-y.x)<3.2&&Math.abs(H-y.v)<3?.25:1,kt=1-Math.min(1,Math.max(0,(Math.abs(Y)-220)/80)),zt=Math.min(1,(Y+4)/4),Wt=.15+.85*Math.min(1,Math.max(0,(d.distanceTo(S)-9)/6)),q=(D.self?.45:.3)*N*xu(I,y.z,R)*ut*kt*zt*Wt*Math.max(0,1-St);if(!(q<=.01)){h.set(-Math.atan(gi(U))+(Q?W*9:0),En(U),l[I]+(Q?W*13:0)),u.compose(d,f.setFromEuler(h),v),t.setMatrixAt(T,u),g.copy(D.self?oA:aA),C.has(I)&&e.set(b++,d.x,d.y,d.z,2.5,g.r,g.g,g.b,q*.9);for(let J=1;J<=il&&!Q&&N===1&&C.has(I);J++){o0(D.track,x-J*sA,i),Se(i.z,i.x,i.v,m);const yt=1-J/(il+1);e.set(b++,m.x,m.y,m.z,1.8*yt,g.r,g.g,g.b,q*.55*yt)}t.setColorAt(T,g.multiplyScalar(q*1.6)),r[T].set(d.x,d.y+1.6,d.z),o[T]=q,a[T]=I,T++}}),t.count=T,e.commit(b),p.count=T,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}};return p}function uA(){const n=new Im;for(let t=0;t<10;t++){const e=t%2?.11:.28,i=t/10*Math.PI*2+Math.PI/2;t?n.lineTo(Math.cos(i)*e,Math.sin(i)*e):n.moveTo(Math.cos(i)*e,Math.sin(i)*e)}return new lh(n)}function hA(){const n=new je({color:new ct("#ffd76a").multiplyScalar(2.2),blending:gn,transparent:!0,depthWrite:!1,fog:!1}),t=new Xe(uA(),n,3);t.frustumCulled=!1,t.count=0;const e=new Dt,i=new P,s=new P,r=new Ae;return{mesh:t,update(o,a,c,l){if(a<=0){t.count=0;return}const u=Math.min(1,a*3);l.getWorldQuaternion(r);for(let f=0;f<3;f++){const h=c*6+f*Math.PI*2/3;i.set(o.x+Math.cos(h)*.8,o.y+.9+Math.sin(h*2)*.1,o.z+.45+Math.sin(h)*.5),s.setScalar(u*(1+.25*Math.sin(c*14+f*2))),e.compose(i,r,s),t.setMatrixAt(f,e)}t.count=3,t.instanceMatrix.needsUpdate=!0}}}const bu=6,Ns=3,Is=28,ji=Is+1,pr=bu*Ns*ji*2,fA=[1.2,1.75,2.2],dA=Math.PI*2*.45,pA=2.4,mA=`
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
  }`,gA=`
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
  }`;function vA(){const n=new Qt,t=new Float32Array(pr*3),e=new Float32Array(pr*3),i=new Float32Array(pr),s=new Float32Array(pr),r=new Float32Array(pr),o=[];for(let h=0;h<bu*Ns;h++)for(let d=0;d<ji;d++){const m=(h*ji+d)*2;s[m]=-1,s[m+1]=1,r[m]=r[m+1]=d/Is,d<Is&&o.push(m,m+1,m+2,m+1,m+3,m+2)}n.setAttribute("position",new Nt(t,3)),n.setAttribute("aTan",new Nt(e,3)),n.setAttribute("aGlow",new Nt(i,1)),n.setAttribute("aSide",new Nt(s,1)),n.setAttribute("aU",new Nt(r,1)),n.setIndex(o);const a=new ie({vertexShader:mA,fragmentShader:gA,uniforms:{uTime:{value:0},uWidth:{value:.16}},blending:gn,transparent:!0,depthWrite:!1,side:be}),c=new Jt(n,a);c.frustumCulled=!1,c.renderOrder=2;const l=new Map,u=new Float32Array(ji*3),f={x:0,y:0,z:0};return{mesh:c,update(h,d,m){a.uniforms.uTime.value=d;const v=Xg(h),g=h.gusts.find(M=>!M.taken&&!M.missed);let p=0;for(const M of h.gusts){if(p>=bu||M.z+M.len<m-5||M.z>m+320)continue;M.taken&&!l.has(M.id)&&l.set(M.id,d);const y=M.taken?d-l.get(M.id):0,x=M.taken?Math.max(0,2.4*(1-y/.4)):M.missed?.18:M===g?1.5:.9;if(!(x<=0)){for(let _=0;_<Ns;_++){for(let T=0;T<ji;T++){const b=T/Is,w=_/Ns*Math.PI*2+b*dA+d*pA,R=fA[_];Se(M.z+b*M.len,mn(M.lane)+R*Math.cos(w),M.v+v+R*Math.sin(w),f),u[T*3]=f.x,u[T*3+1]=f.y,u[T*3+2]=f.z}const S=p*Ns+_;for(let T=0;T<ji;T++){const b=Math.max(0,T-1),w=Math.min(Is,T+1);for(let R=0;R<2;R++){const C=(S*ji+T)*2+R;for(let N=0;N<3;N++)t[C*3+N]=u[T*3+N],e[C*3+N]=u[w*3+N]-u[b*3+N];i[C]=x}}}p++}}for(const M of l.keys())h.gusts.some(y=>y.id===M)||l.delete(M);n.setDrawRange(0,p*Ns*Is*6);for(const M of["position","aTan","aGlow"])n.getAttribute(M).needsUpdate=!0;c.visible=p>0}}}function xA(){const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(18,10,22,0.78)"),e.addColorStop(.6,"rgba(18,10,22,0.4)"),e.addColorStop(1,"rgba(18,10,22,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new nh(n)}const b0=new zn(1,1).rotateX(-Math.PI/2),w0=new je({map:xA(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});function _A(n){const t=new Xe(b0,w0,n);return t.count=0,t.frustumCulled=!1,t.renderOrder=1,t}function MA(n,t,e){const i=new Jt(b0,w0);return i.scale.set(n,1,t),i.position.y=e,i.renderOrder=1,i.updateMatrix(),i}const _h=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2],io=[.8,.3,.16],T0=[.6,.32,.22],Mh=[.9,.76,.45],E0=[.88,.84,.76],yA=[.2,.45,.36],yh=[.45,.25,.14],A0=[.58,.33,.24];function ae(n,t,e=.1,i=1){const s=n.index?n.toNonIndexed():n;s.deleteAttribute("uv"),s.getAttribute("normal")||s.computeVertexNormals();const r=s.getAttribute("position"),o=new Float32Array(r.count*3),a=_h(t);for(let c=0;c<r.count;c++){const l=1-e/2+e*_t(r.getX(c)*.8+i,r.getY(c)*.8+r.getZ(c)*.6,17);for(let u=0;u<3;u++)o[c*3+u]=a[u]*l}return s.setAttribute("color",new Nt(o,3)),s}const Gi=n=>bi(n);function Na(n,t,e,i){const s=n.getAttribute("position"),r=n.getAttribute("color");for(let o=0;o<s.count;o++){const a=i+(1-i)*Math.min(1,Math.max(0,(s.getY(o)-t)/(e-t)));r.setXYZ(o,r.getX(o)*a,r.getY(o)*a,r.getZ(o)*a)}return n}const R0=[1,.7,.32];function Ja(n,t,e,i,s=0,r=[.55,.2,.12]){const o=[],a=Math.max(6,Math.round(n/.45)),c=Math.max(4,Math.round(Math.hypot(t,e)/.42)),l=_h(i);for(const u of[-1,1]){const f=[],h=[],d=[];for(let v=0;v<=c;v++){const g=v/c;for(let p=0;p<=a;p++){const M=(p/a-.5)*n,y=Math.pow(Math.abs(M)/(n/2),5);f.push(M,e*(1-g)+s*y*(.35+.65*g),u*t*g*(1+.06*y));const x=(p%2?1:.72)*(v%2?1:.88)*(.8+.35*_t(M*.3,g*4+u,23));h.push(l[0]*x,l[1]*x,l[2]*x)}}for(let v=0;v<c;v++)for(let g=0;g<a;g++){const p=v*(a+1)+g;u>0?d.push(p,p+a+1,p+1,p+1,p+a+1,p+a+2):d.push(p,p+1,p+a+1,p+1,p+a+2,p+a+1)}const m=new Qt;m.setAttribute("position",new Nt(new Float32Array(f),3)),m.setAttribute("color",new Nt(new Float32Array(h),3)),m.setIndex(d),m.computeVertexNormals(),o.push(m.toNonIndexed())}return o.push(ae(new $t(n+.3,.32,.42).translate(0,e+.05,0),r,.05)),Gi(o)}function SA(n,t,e,i,s){const r=t/2,o=[];for(const c of[-1,1]){const l=c*n/2;c>0?o.push(l,e,-r,l,e+i,0,l,e,r):o.push(l,e,-r,l,e,r,l,e+i,0)}const a=new Qt;return a.setAttribute("position",new Nt(new Float32Array(o),3)),a.computeVertexNormals(),ae(a,s,.08)}function bA(n,t,e,i=io){const r=t-4.4-.25,o=[Ja(n,3.8,4.4,i,2.2,R0).translate(0,r,0)];for(let a=-n/2+2;a<=n/2-2;a+=3.2)for(const c of[-2.6,2.6])o.push(ae(new tn(.26,.3,r-e+6,6).translate(a,(r+e-6)/2,c),yh,.15,a));return o.push(ae(new $t(n-3,1,5.6).translate(0,e+.2,0),[.62,.5,.4],.1)),Gi(o)}function wA(n,t={pillar:A0,wall:Mh,tile:io}){const e=[];for(const i of[-1,1])e.push(ae(new $t(2.4,7-n+6,2.4).translate(i*11.2,(7+n-6)/2,0),t.pillar,.2,i)),e.push(ae(new $t(3,.5,3).translate(i*11.2,7.2,0),[.85,.8,.7],.08,i));return e.push(ae(new $t(22.4,1.6,1.6).translate(0,-.2,0),yh,.12)),e.push(ae(new $t(20,3.6,1.1).translate(0,2.4,0),t.wall,.1)),e.push(ae(new $t(7,1.8,1.25).translate(0,2.5,0),[.25,.12,.08],.05)),e.push(ae(new $t(6.4,1.3,1.3).translate(0,2.5,0),[.82,.62,.22],.1)),e.push(Ja(27,2.2,4.4,t.tile,1.6).translate(0,5.3,0)),Gi(e)}function TA(){const n=[Na(ae(new $t(.4,3.2,10).translate(0,0,0),A0,.22),-1.6,.6,.62),Ja(10.2,.45,.35,io).rotateY(Math.PI/2).translate(0,1.6,0)];for(let t=-5;t<=5;t+=2.5)n.push(Na(ae(new $t(.7,3.7,.7).translate(0,.25,t),[.5,.27,.2],.15,t),-1.6,.6,.6)),n.push(ae(new $t(.86,.26,.86).translate(0,2.2,t),[.9,.88,.82],.06,t));return Gi(n)}const EA={flower:[[.86,.17,.09],[.97,.42,.13]],under:[[.22,.34,.12],[.42,.24,.1]],trunk:[.3,.2,.14]};function C0(n=EA){const t=[ae(new tn(.35,.65,5,6).translate(0,2.3,0).rotateZ(.08),n.trunk,.15)];return[[0,6.4,0,3.6],[3.2,5.8,1,2.8],[-3,5.9,-.8,2.9],[.8,5.7,-3,2.6],[-1,5.6,3,2.6],[.3,7.6,.2,2.3]].forEach(([i,s,r,o],a)=>{const c=new cs(o,1).scale(1.15,.62,1.15).translate(i,s,r);c.deleteAttribute("uv"),c.computeVertexNormals();const l=c.getAttribute("position"),u=c.getAttribute("normal"),f=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const d=_t(l.getX(h)*.9+a,l.getZ(h)*.9,l.getY(h)+31),m=u.getY(h)+(d-.5)*.7,v=m<-.05?n.under[0]:m<.12?n.under[1]:d<.6?n.flower[0]:n.flower[1],g=_h(v),p=.75+.35*Math.min(1,Math.max(0,(l.getY(h)-4.5)/4));f.set([g[0]*p,g[1]*p,g[2]*p],h*3)}c.setAttribute("color",new Nt(f,3)),t.push(c)}),Gi(t)}const Sh=[.74,.56,.4],P0=[.66,.5,.37],Qa=[.36,.34,.35],L0=[.3,.29,.3],sl=[.58,.56,.53],AA={pillar:[.52,.5,.48],wall:Sh,tile:Qa},RA={flower:[[.93,.56,.68],[.98,.76,.84]],under:[[.3,.32,.16],[.36,.24,.2]],trunk:[.24,.16,.13]},CA=()=>C0(RA);function PA(){const n=[Na(ae(new $t(.8,2.6,10).translate(0,-.4,0),[.4,.39,.37],.2),-1.7,.6,.6)];for(let t=0;t<2;t++)for(let e=0;e<12;e++){const i=_t(e*.73,t*1.9,61),s=-4.6+(e+.5*t)*.76,r=new $t(.95,.4+.22*i,.62+.3*i).rotateX((i-.5)*.35).rotateY((i-.5)*.4),o=.78+.34*_t(e,t,62);n.push(ae(r.translate(0,.25+t*.46,s),[sl[0]*o,sl[1]*o,sl[2]*o],.12,e+t*13))}return Gi(n)}const LA=[.3,.22,.19],rl=[.92,.9,.84],NA=[.8,.82,.85];function N0(n,t){const e=[],i=new $t(n.len,n.wallH+n.sink,n.width).translate(0,(n.wallH-n.sink)/2,0);e.push(Na(ae(i,n.wall,.14,t),0,2.5,.72)),e.push(ae(new $t(n.len+.08,.7,n.width+.08).translate(0,.25,0),[.5,.44,.36],.1,t)),e.push(ae(new $t(n.len+.06,.45,n.width+.06).translate(0,n.wallH-.2,0),LA,.08,t)),e.push(SA(n.len,n.width,n.wallH,n.rise,n.wall)),e.push(Ja(n.len+.6,n.width/2+.35,n.rise+.25,n.tile,0,n.crest?R0:void 0).translate(0,n.wallH-.2,0));const s=-n.width/2-.04;e.push(ae(new $t(1.3,2.3,.08).translate(0,1.15,s+.01),rl,.06,t)),e.push(ae(new $t(1,2,.1).translate(0,1,s-.02),yh,.1,t)),e.push(ae(new $t(1.8,.25,.34).translate(0,.12,s-.17),[.62,.58,.52],.08,t));for(let r=0;r<n.floors;r++){const o=1.5+r*3.1;for(const a of r===0?[-n.len/2+.85,n.len/2-.85]:[-.9,.9])e.push(ae(new $t(.8,1,.1).translate(a,o,s),yA,.12,t+a));if(r>0&&n.balcony){const a=n.len*.78;e.push(ae(new $t(a,.18,.4).translate(0,o-1.05,s-.2),[.7,.66,.6],.08,t)),e.push(ae(new $t(a,.08,.08).translate(0,o-.15,s-.32),rl,.05,t));for(let c=0;c<=6;c++)e.push(ae(new $t(.06,.82,.06).translate(-a/2+a*c/6,o-.55,s-.32),rl,.05,t))}}if(n.tank){const r=n.wallH+n.rise+.1;e.push(ae(new tn(.42,.42,1.3,10).rotateZ(Math.PI/2).translate(n.len*.22,r+.45,0),NA,.12,t)),e.push(ae(new $t(.9,.2,.7).translate(n.len*.22,r,0),[.4,.38,.36],.08,t))}return Gi(e)}function IA(n,t,e=!1){const s=e?n%2?P0:Sh:n%2?E0:Mh,r=e?n%3===2?L0:Qa:n%3===2?T0:io;return N0({len:4.4,width:5.2,wallH:t-3.2-.3,rise:3.2,wall:s,tile:r,floors:2,sink:6,tank:!1,crest:!0,balcony:!e},n*7.1)}function Vo(n,t=!1){const e=t?n?P0:Sh:n?E0:Mh,i=t?n?L0:Qa:n?T0:io;return N0({len:8-n,width:5.4,wallH:3.3,rise:2.7,wall:e,tile:i,floors:1,sink:2.5,tank:!t,crest:!1,balcony:!t},3+n)}const ts=250,qd=1,DA=6,bh={value:1},UA=Za({lift:bh,selfLit:.3,rim:.6,doubleSide:!0,windows:!0}),FA=Za({lift:bh,selfLit:.3,rim:.6,doubleSide:!0,hazard:!0,windows:!0});function ol(n,t,e){return Se(n,t,0,e),e.y=Ke(e.x,e.z),e}function OA(n,t){const e=[],i=n*ts;if(Math.max(Fn(i),Fn(i+ts/2),Fn(i+ts))===0)return e;const s=new P,r=Ba()>.5?4:0,o=(a,c)=>Fn(a)>.3&&c.y<Pe(a)-6&&c.y>Pe(a)-14;for(let a=0;a<t;a++){const c=i+_t(a*.77,n,81)*ts,u=(_t(n,a*.41,82)<.5?-1:1)*(18+Math.pow(_t(a*.53,n*1.3,83),1.8)*190);o(c,ol(c,u,s))&&e.push({p:s.clone(),r:_t(a,n,84)*6.28,s:.8+.5*_t(n,a,85),kind:r})}for(let a=0;a<2;a++){const c=i+(.25+.5*a)*ts+(_t(n,a,86)-.5)*60,u=(_t(n*1.7,a,87)<.5?-1:1)*(24+_t(n,a*3.1,88)*90);for(let f=0;f<7;f++){const h=c+(_t(f,n+a,89)-.5)*70,d=u+(_t(f*1.9,n+a,90)-.5)*50;if(Math.abs(d)<17||!o(h,ol(h,d,s)))continue;const m=En(h)+(d>0?Math.PI/2:-Math.PI/2)+(_t(f,a,91)-.5)*.5;e.push({p:s.clone(),r:m,s:1,kind:r+1+f%2})}}for(let a=0;a<2;a++){const c=a?1:-1,l=i+_t(n,a,92)*(ts-60),u=3+Math.floor(_t(n,a*2.3,93)*4);for(let f=0;f<u;f++){const h=l+f*10.2;o(h,ol(h,c*13.5,s))&&e.push({p:s.clone(),r:En(h),s:1,kind:r+3})}}return e}function kA(n){const t=qd+Math.max(3,Math.round(DA*n))+1,e=Math.round(34*Math.max(.5,n)),i=new Be,s=[C0(),Vo(0),Vo(1),TA(),CA(),Vo(0,!0),Vo(1,!0),PA()],r=[34,7,7,12,34,7,7,12].map(p=>p*t),o=s.map((p,M)=>{const y=new Xe(p,UA,r[M]);return y.count=0,y.frustumCulled=!1,i.add(y),y}),a=_A(r.reduce((p,M)=>p+M,0));i.add(a);const c=[[11,11],[10,7.5],[9,7.5],[2.6,11.5],[9,9],[10,7.5],[9,7.5],[2.2,11]],l=new Map,u=new Dt,f=new Ae,h=new P(0,1,0),d=new P,m=new P;let v=Number.NaN;const g=()=>{const p=s.map(()=>0);let M=0;for(let y=v;y<v+t;y++){let x=l.get(y);x||l.set(y,x=OA(y,e));for(const _ of x){const S=o[_.kind];if(p[_.kind]>=r[_.kind])continue;u.compose(_.p,f.setFromAxisAngle(h,_.r),d.set(_.s,_.s,_.s)),S.setMatrixAt(p[_.kind]++,u);const[T,b]=c[_.kind];u.compose(d.set(_.p.x,_.p.y+.12,_.p.z),f,m.set(T*_.s,1,b*_.s)),a.setMatrixAt(M++,u)}}for(const y of[...l.keys()])(y<v-1||y>v+t)&&l.delete(y);o.forEach((y,x)=>{y.count=p[x],y.visible=y.count>0,y.instanceMatrix.needsUpdate=!0}),a.count=M,a.instanceMatrix.needsUpdate=!0};return{group:i,update(p,M){const y=Math.floor(p/ts)-qd;y!==v&&(v=y,g()),bh.value=1-.6*Math.min(1,Math.max(0,(M-.4)/.5))}}}const Kd=2200,BA=1,zA=2600;function Yd(n,t,e){const i=[],s=o=>{const a=Math.PI/2+o*Math.PI/5,c=o%2?.382:1;return[Math.cos(a)*n*c,Math.sin(a)*n*c]};for(let o=0;o<10;o++){const[a,c]=s(o),[l,u]=s(o+1);i.push(0,0,t,a,c,t,l,u,t)}const r=new Qt;return r.setAttribute("position",new Nt(new Float32Array(i),3)),r.computeVertexNormals(),ae(r,e,.04)}function HA(){const n=[.62,.6,.56],t=[ae(new tn(3.6,4.6,28,8).translate(0,8,0),n,.12,2),ae(new tn(5.2,5.2,1.4,8).translate(0,22.5,0),[.8,.78,.74],.06,3),ae(new tn(.28,.32,20,6).translate(0,33,0),[.88,.88,.86],.04,4)],e=ae(new $t(15,10,.2).translate(7.8,37.5,0),[.86,.1,.07],.06,5);return Gi([...t,e,Yd(3.4,.12,[1,.84,.12]).translate(7.8,37.5,0),Yd(3.4,.12,[1,.84,.12]).rotateY(Math.PI).translate(7.8,37.5,0)])}function $d(n){const t=wl(n)+(n===1?wl(2):jr);let e=Math.floor((t+is-Kd)/qe)*qe+Kd-is;for(e>=t&&(e-=qe);Fn(e)>0;)e-=qe;return e}function VA(){const n=new Jt(HA(),S0);n.visible=!1,n.matrixAutoUpdate=!1;let t=Number.NaN;const e=new P,i=new P,s=r=>{i.set(0,-1/0,0);for(let o=-80;o<=80;o+=20)for(let a=240;a<=460;a+=20)Se(r+o,BA*a,0,e),e.y=Ke(e.x,e.z),e.y>i.y&&i.copy(e);n.position.copy(i),n.rotation.y=-.6,n.scale.setScalar(2),n.updateMatrix()};return{mesh:n,update(r){if(va()!=="ha-giang"){n.visible=!1;return}const o=jp(r),a=$d(o),c=$d(o+1),l=Math.abs(r-a)<Math.abs(r-c)?a:c;n.visible=Math.abs(r-l)<zA,n.visible&&l!==t&&(t=l,s(l))}}}const $r=12,Ia={uPools:{value:Array.from({length:$r},()=>new he)},uPoolCount:{value:0},uPoolNight:{value:0}},GA=`
uniform vec4 uPools[${$r}];
uniform int uPoolCount;
uniform float uPoolNight;
vec3 lanternPools(vec3 world, vec3 n) {
  // Nguồn chỉ nằm trong ~260 m phía trước camera, vũng rộng ~10 m: điểm đất xa hơn 320 m (nửa trên khung đêm) bỏ vòng lặp.
  if (uPoolNight < 0.01 || distance(world, cameraPosition) > 320.0) return vec3(0.0);
  float acc = 0.0;
  for (int i = 0; i < ${$r}; i++) {
    if (i >= uPoolCount) break;
    vec3 d = uPools[i].xyz - world;
    float r2 = dot(d, d);
    // Gauss σ ≈ 8 m: đèn bay 9,5 m trên ruộng làng → vũng ~10 m, dưới chân đèn ~0,5; cao 40 m+ (đáy thung lũng sâu) ≈ 0.
    // Bản σ 9 m × 2,6: đèn sát camera phủ cam cả mép dưới khung (r7c-5600) — vũng phải là ĐỐM, không phải đèn pha.
    acc += uPools[i].w * exp(-r2 / 128.0) * max(dot(n, d * inversesqrt(r2 + 1e-3)), 0.0);
  }
  return vec3(1.0, 0.56, 0.22) * acc * 2.1 * uPoolNight;
}
`;let Da=0,I0=$r;function WA(n){I0=Math.max(0,Math.min($r,Math.round(n)))}function XA(){Da=0}function wu(n,t,e,i,s){Da>=I0||s>330||t-Ke(n,e)>28||Ia.uPools.value[Da++].set(n,t,e,i)}function qA(n){Ia.uPoolCount.value=Da,Ia.uPoolNight.value=n}const Cs=14,al=9.5,cl=3.4,KA=.9,Go=7,Zd=4,ll=13,Jd=30,Qd=420,jd=[[1,.6,.24],[1,.3,.16],[1,.84,.42]],YA=[-1,1];function $A(n,t){for(const e of n.obstacles)if(Math.abs(e.z-t)<9)return!0;return!1}function ZA(){const n=Math.ceil((Qd+Jd)/Cs)+2,t=xh(n*(2*Go)+Math.ceil(n/Zd)*ll),e={x:0,y:0,z:0};return{points:t.points,setViewport:(i,s)=>t.setViewport(i,s),update(i,s,r,o){const a=Math.min(1,Math.max(0,(r-.38)/.35));let c=0,l=0;if(a>.01){const u=Math.floor((i.z-Jd)/Cs),f=Math.floor((i.z+Qd)/Cs);for(let h=u;h<=f;h++){const d=h*Cs;if(!(Fn(d)<.97||Fn(d+Cs)<.97)){for(const m of YA)for(let v=0;v<Go;v++){const g=(v+.5)/Go;Se(d+g*Cs,m*al,-wr+cl-4*g*(1-g)*KA,e);const p=jd[((h*Go+v)%3+3)%3],M=.82+.18*Math.sin(s*3.1+h*1.7+v*2.3+m);t.set(c++,e.x,e.y,e.z,.6,p[0],p[1],p[2],a*M)}if(!(h%Zd!==0||$A(i,d))){l<3&&d>i.z-10&&(Se(d,0,-wr+cl,e),wu(e.x,e.y,e.z,1.5,d-o),l++);for(let m=0;m<ll;m++){const v=(m+.5)/ll;Se(d,-al+v*2*al,-wr+cl+.3-4*v*(1-v)*1.3,e);const g=jd[m%3];t.set(c++,e.x,e.y,e.z,.6,g[0],g[1],g[2],a*(.85+.15*Math.sin(s*2.7+m)))}}}}}t.commit(c)}}}function JA(){const n=[[0,-1],[.44,-1],[.46,-.93],[.4,-.86],[.4,.5],[.45,.56],[.3,.72],[.19,.77],[.19,.97],[.25,1],[.2,1.03],[.12,.92],[0,.9]].map(([t,e])=>new rt(t,e));return new eo(n,16)}function QA(){return new zn(1,1,1,6).translate(0,.5,0)}function jA(n){return new ie({uniforms:{uTime:n},side:be,vertexShader:`
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
}`})}function t2(n){return new ie({uniforms:{...xn.merge([lt.fog]),uTime:n},transparent:!0,depthWrite:!1,side:be,fog:!0,vertexShader:`
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
}`})}function e2(){const n=[[.42,-.8],[.5,-.45],[.58,-.05],[.62,.3],[.57,.58],[.42,.78],[.2,.88],[0,.9]].map(([t,e])=>new rt(t*1.45,e*1.45));return new eo(n,14)}function n2(){const n=[];for(let t=0;t<=8;t++){const e=t/8*Math.PI*.5;n.push(new rt(Math.cos(e)*1.7,Math.sin(e)*1.05-.3))}return new eo(n,16)}const D0=`
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
}`,i2=`
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
}`,s2=`
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
}`;function r2(){return new ie({vertexShader:D0,fragmentShader:i2,side:be,uniforms:{uTime:{value:0}}})}function o2(){return new ie({vertexShader:D0,fragmentShader:s2,side:be})}function Nr(n,t,e){return e.setRGB(n,t%1,0)}const ul=2.1,Ua=8,Ii=8,a2=46,c2=n=>new ie({uniforms:{uTime:n},vertexShader:`
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
}`,transparent:!0,blending:gn,depthWrite:!1});function l2(n){const t=new Xe(new uh(ul,.12,6,36),new je({color:new ct("#ffb04a").multiplyScalar(.95)}),Ii),e=new Xe(n2(),o2(),Ii),i=new Xe(new tn(1,.55,1,12,1,!0).translate(0,.5,0),c2(n),Ii*3),s=new Xe(JA(),jA(n),Ii),r=new Xe(QA(),t2(n),Ii),o=new ct,a=[t,e,i,s,r];for(const y of a)y.frustumCulled=!1,y.count=0;e.setColorAt(0,Nr(1,0,o)),i.setColorAt(0,o.setRGB(0,0,0)),r.setColorAt(0,o),r.renderOrder=3;const c=new Dt,l=new Ae,u=new Ae,f=new Ae,h=new P,d=new P;let m=0,v=0,g=0,p=0;const M=(y,x,_,S,T,b,w,R)=>{if(g>=i.instanceMatrix.count)return;const C=1-Math.min(1,Math.max(0,(T-450)/150));c.compose(h.set(y,x,_),l.identity(),d.set(S,a2,S)),i.setMatrixAt(g,c),i.setColorAt(g++,o.setRGB(b*C,w*C,R*C))};return{meshes:a,begin(){m=v=g=p=0},draw(y,x,_,S,T,b,w,R){const C=1+1.6*Math.min(1,Math.max(0,(T-30)/90));if(y.kind==="thermal"&&m<Ii){u.setFromAxisAngle(h.set(0,1,0),Math.sin(b*1.3+y.id)*.45),c.compose(h.set(x,_,S),u,d.set(C,C,C)),t.setMatrixAt(m++,c);for(let N=0;N<Ua;N++){const D=b*1.8+N/Ua*Math.PI*2;h.set(Math.cos(D)*ul*C,Math.sin(D)*ul*C,0).applyQuaternion(u),R.body(x+h.x,_+h.y-.5*C,S+h.z,.36*C,1.15,N*.31+y.id*.1),R.glow(x+h.x,_+h.y-.85,S+h.z,.8+1.4*w,1,.7,.28,.85)}R.glow(x,_,S,(6+6*w)*C*.8,1,.7,.25,.45),M(x,_-1,S,1.5*C,T,1.4,.95,.38);for(let N=0;N<6;N++){const D=(b*.9+N/6)%1,I=N*2.1+y.id;R.glow(x+Math.cos(I)*1.1*C,_-2.4+D*4.8*C,S+Math.sin(I)*.6,.9*C,1,.8,.35,Math.sin(D*Math.PI)*.9)}}else if(y.kind==="shield"&&v<Ii){l.setFromAxisAngle(h.set(0,0,1),Math.sin(b*1.7+y.id)*.3),c.compose(h.set(x,_+.9*C+.5*Math.sin(b*2.3+y.id),S),l,d.set(1.5*C,1.5*C,1.5*C)),e.setColorAt(v,Nr(1,0,o)),e.setMatrixAt(v++,c),R.glow(x,_,S,(3+5*w)*C*.8,.3,.95,.9,.55),M(x,_+.4,S,1.3*C,T,.25,1.1,.95);for(let N=0;N<6;N++){const D=(b*.6+N/6)%1,I=b*2+N*1.05;R.glow(x+Math.cos(I)*.9*C,_+1+D*16*C,S+Math.sin(I)*.9*C,1.1*C,.35,1,.92,Math.sin(D*Math.PI)*.85)}}else if(y.kind==="smoke"&&p<Ii){l.setFromAxisAngle(h.set(0,1,0),b*1.6+y.id).premultiply(u.setFromAxisAngle(h.set(0,0,1),Math.sin(b*2.1+y.id)*.22));const N=1.6*C,D=_+.5*C+.35*Math.sin(b*2.6+y.id);c.compose(h.set(x,D,S),l,d.set(N,N,N)),s.setMatrixAt(p,c),h.set(0,N,0).applyQuaternion(l);const I=x+h.x,U=D+h.y,z=S+h.z;c.compose(h.set(I,U,z),f,d.set(6*C,13*C,1)),r.setMatrixAt(p,c),r.setColorAt(p++,o.setRGB(1-Math.min(1,Math.max(0,(T-450)/150)),y.id*.137%1,0)),R.glow(I,U,z,(1.2+2*w)*C,1,.55,.42,.9),R.glow(x,_,S,(3+5*w)*C*.8,1,.3,.62,.5),M(x,_+.4,S,.9*C,T,1.15,.22,.55);for(let H=0;H<5;H++){const Q=(b*2.4+H/5)%1,W=H*2.4+y.id;R.glow(I+Math.cos(W)*Q*.8*C,U+Q*2.2*C,z+Math.sin(W)*Q*.8*C,.5*C,1,.75,.4,(1-Q)*.9)}}},commit(){t.count=m,e.count=v,i.count=g,s.count=r.count=p;for(const y of a)y.instanceMatrix.needsUpdate=!0,y.instanceColor&&(y.instanceColor.needsUpdate=!0)}}}const Nn={x:0,y:0,z:0},hl=260,tp=1600,ep=220,Wo=3200;function u2(n){const t=Math.round(tp*n),e=new Be,i=r2(),s=new Xe(e2(),i,hl+8*Ua);s.frustumCulled=!1;const r=l2(i.uniforms.uTime),o=xh(hl+tp+ep+8*(Ua+7)+56);e.add(s,...r.meshes,o.points);const a=new ct;s.setColorAt(0,Nr(1,0,a));const c=[],l=new Map,u=new Dt,f=new Ae,h=new P,d=new P(1,1,1),m=new Ae;let v=0,g=0;const p={body(M,y,x,_,S,T){v>=s.instanceMatrix.count||(u.compose(h.set(M,y,x),f.identity(),d.set(_,_,_)),s.setColorAt(v,Nr(S,T,a)),s.setMatrixAt(v++,u))},glow:(M,y,x,_,S,T,b,w)=>o.set(g++,M,y,x,_,S,T,b,w)};return{group:e,setViewport:(M,y)=>o.setViewport(M,y),burst(M,y,x,_,S){for(let T=0;T<_&&c.length<ep;T++){const b=Math.random()*Math.PI*2,w=Math.random()*2-1,R=6+Math.random()*10;c.push({x:M,y,z:x,vx:Math.cos(b)*R*Math.sqrt(1-w*w),vy:w*R+3,vz:Math.sin(b)*R*Math.sqrt(1-w*w),life:S?.7:1})}},update(M,y,x,_,S){v=0,g=0,i.uniforms.uTime.value=y,r.begin();for(const w of M.pickups){if(w.z-M.z>600||v>=hl)continue;Se(w.z,mn(w.lane),w.v+Math.sin(y*2.4+w.id)*.45,Nn);let R=Nn.x,C=Nn.y,N=Nn.z,D=w.z,I=1;if(w.taken){const z=l.get(w.id)??y;l.set(w.id,z);const H=(y-z)/.6;if(H>=1)continue;D=M.z+4+H*10,Se(D,mn(w.lane),w.v,Nn),R=Nn.x,N=Nn.z,C=Nn.y+H*H*14,I=1-H}const U=Math.min(1,Math.max(0,(w.z-M.z-40)/210));I*=Math.min(1,Math.max(0,(D-S-2)/6)),!(I<=0)&&(w.kind==="lantern"?(f.setFromAxisAngle(h.set(0,1,0),y*.8+w.id).multiply(m.setFromAxisAngle(h.set(0,0,1),Math.sin(y*1.9+w.id)*.12)),u.compose(h.set(R,C,N),f,d.set(I,I,I)),s.setColorAt(v,Nr(1,w.id*.137,a)),s.setMatrixAt(v++,u),o.set(g++,R,C-.9*I,N,1.4+3.2*U+1.2*_,1,.62,.22,(.75+.25*_)*I),!w.taken&&w.z>M.z-15&&wu(R,C-.9,N,1,w.z-S)):w.taken||(w.kind==="thermal"&&wu(R,C,N,1.6,w.z-S),r.draw(w,R,C,N,w.z-M.z,y,U,p)))}for(const w of l.keys())M.pickups.some(R=>R.id===w)||l.delete(w);s.count=v,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.commit();const T=Math.min(t,Math.floor(t*(.12+.88*_)));for(let w=0;w<T;w++){const R=_t(w*.37,1.7,81)*Wo,C=S-300+((R-S+300)%Wo+Wo)%Wo,N=kn(C);if(N<.35)continue;const D=_t(w,2.9,82)<.5?-1:1;Se(C,D*(30+Math.pow(_t(w,3.3,83),1.5)*1400),0,Nn);const I=(y*(2+3*_t(w,4.1,84))+_t(w,5.3,85)*700)%700,U=xi(C)-380+I+Math.sin(y*.5+w)*2,z=N*Math.min(1,I/60)*(1-Math.max(0,I-600)/100);o.set(g++,Nn.x,U,Nn.z,2.6,1,.5+.1*Math.sin(w),.16,z*(.35+.65*_))}const b=En(M.z);for(let w=c.length-1;w>=0;w--){const R=c[w];if(R.life-=x*1.6,R.life<=0){c.splice(w,1);continue}R.vy-=9*x,R.x+=R.vx*x,R.y+=R.vy*x,R.x+=Math.sin(b)*M.speed*.85*x,R.z+=(R.vz+Math.cos(b)*M.speed*.85)*x,o.set(g++,R.x,R.y,R.z,.7*R.life+.2,1,.7,.3,R.life)}o.commit(g)}}}const dn=40;function h2(n){const t=[];for(let e=n.bottom;e<n.top;){t.push(e);const i=Math.min(Math.abs(e-n.bandLo),Math.abs(e-n.bandHi),e>n.bandLo&&e<n.bandHi?0:99);e+=Math.min(10,1.2+i*.12)}return t.push(n.top),t}function f2(n){const t=h2(n),e=[],i=[],s=[];for(const l of t){const u=l>=n.bandLo-.01&&l<=n.bandHi+.01,f=u?n.rc:n.radius(l),h=Math.min(1,Math.max(0,(n.radius(l+6)-f)/(f*.6)));for(let d=0;d<dn;d++){const m=d/dn*Math.PI*2,v=Math.cos(m),g=Math.sin(m),p=_t(v*1.4+n.seed*7.1,g*1.4+l/26,31)-.5,M=_t(v*4+n.seed,g*4+l/5,32)-.5,y=Math.max(0,Math.sin((l/7+_t(v,g,n.seed)*2)*Math.PI))**6*.12;let x=f*(1+.42*p+.12*M+y);u&&(x=n.rc*(.9+.1*(M+.5)));const _=Math.pow(.5+.5*Math.sin(m*9+p*5+n.seed+l/40),5),S=Math.pow(Math.max(0,Math.sin((l/4.6+_t(v*2,g*2,n.seed+9)*1.5)*Math.PI)),10),T=.1*_+.09*S;x*=1-T,e.push(v*x,l,g*x),s.push(Math.min(.85,Math.max(0,(1-x/f)*1.6)+T*2.5+h*.55)),i.push(n.crest&&l>n.top-.7?1:0)}}e.push(0,n.top+(n.crest?0:2.5),0),i.push(n.crest?1:0),s.push(0);const r=[];for(let l=0;l<t.length-1;l++)for(let u=0;u<dn;u++){const f=l*dn+u,h=l*dn+(u+1)%dn;r.push(f,f+dn,h,h,f+dn,h+dn)}const o=t.length*dn,a=(t.length-1)*dn;for(let l=0;l<dn;l++)r.push(a+l,o,a+(l+1)%dn);const c=new Qt;return c.setAttribute("position",new Nt(new Float32Array(e),3)),c.setAttribute("aCrest",new Nt(new Float32Array(i),1)),c.setAttribute("aShade",new Nt(new Float32Array(s),1)),c.setIndex(r),c.computeVertexNormals(),c}function d2(n,t){const e=[],i=new ct;for(let s=0;s<t;s++){const r=s<Math.ceil(t*.6),o=r?n.top-1.5-3*_t(s,n.seed,41):n.bandLo-6-40*_t(n.seed,s,42),a=n.seed*2.3+s*2.39,c=r?n.radius(o)*.75*_t(s,n.seed,43):n.radius(o)*.95,l=.35+.35*_t(s*1.3,n.seed,44),u=(_t(s,n.seed*3,45)<.45?_0():M0()).clone();u.scale(l,l*1.1,l).rotateY(a).translate(Math.cos(a)*c,o,Math.sin(a)*c),i.setHSL(.24+.06*_t(s,7,n.seed),.3,.55);const f=u.getAttribute("color");if(f)for(let h=0;h<f.count;h++)f.setXYZ(h,f.getX(h)*i.r*2,f.getY(h)*i.g*2,f.getZ(h)*i.b*2);e.push(u)}return bi(e)}function p2(n,t){const e=46+10*_t(n,1,51);return{seed:n,rc:t,bandLo:-6.5,bandHi:22.5,bottom:-320,top:e,crest:!1,radius:i=>i<-6.5?t+.3*Math.pow(-6.5-i,.9):(t+.32*(i-22.5))*Math.sqrt(Math.max(.05,Math.min(1,(e-i)/7)))}}function m2(n,t){return{seed:n,rc:t,bandLo:-6.5,bandHi:1,bottom:-300,top:1,crest:!0,radius:e=>t+.28*Math.pow(Math.max(0,-6.5-e),.92)}}const li=n=>[n[0]**2.2,n[1]**2.2,n[2]**2.2];function np(n,t,e){const i=new $t(n,1,7.6,Math.max(10,Math.round(n/2)),36,4).translate(0,.5,0),s=i.getAttribute("position"),r=new Float32Array(s.count);for(let a=0;a<s.count;a++){const c=s.getX(a),l=s.getY(a),u=s.getZ(a),f=Math.min(1,Math.max(0,(Math.abs(c)-9)/4)),h=t(c)-(1-f)*.6*_t(c*.5,u,3)-f*1.6*(_t(c*.3,u*.2,3)-.3),d=e(c)-10*_t(c*.06,1,4),m=d+(h-d)*l,v=1+.6*Math.max(0,Math.min(1,-m/40)),g=((m+3*_t(c*.04,0,7))/5.5%1+1)%1,p=2.4*(hi(c*.07,m*.06,3,9)-.5),M=Math.min(1,Math.max(0,(h-m-.6)/2.4),Math.max(0,(m-d)/3)),y=(1.3*(1-g)-.65+p)*M;r[a]=M*(Math.abs(u)/3.8)*Math.min(.85,.75*Math.max(0,(g-.5)/.5)+.35*Math.max(0,-p));const x=u*v*(1+.3*(_t(c*.2,m*.1,5)-.5))+Math.sign(u)*(Math.abs(u)/3.8)*y;s.setXYZ(a,c*(1+.04*(_t(m*.1,u,6)-.5)),m,x)}const o=new Float32Array(s.count);for(let a=0;a<s.count;a++)o[a]=Math.abs(s.getX(a))<12&&s.getY(a)>.3?1:0;return i.setAttribute("aCrest",new Nt(o,1)),i.setAttribute("aShade",new Nt(r,1)),i.computeVertexNormals(),i}function Zi(n,t,e=()=>0){const i=n.getAttribute("position"),s=new Float32Array(i.count*3),r=new Float32Array(i.count);for(let o=0;o<i.count;o++)s.set(t,o*3),r[o]=e(i.getY(o));return n.setAttribute("color",new Nt(s,3)),n.setAttribute("aSway",new Nt(r,1)),n}function g2(n,t){const e=[],i=li([.6,.42,.27]),s=c=>10.2-2.2*(1-(2*c/n)**2);for(let c=-n/2;c<n/2;c+=.9)e.push(Zi(new $t(.8,.22,3).translate(c,-.55,0).toNonIndexed(),i));if(t)for(const c of[-n/2,n/2])e.push(Zi(new $t(1.2,260,1.2).translate(c,-118,0).toNonIndexed(),i));for(const c of[-1.5,1.5]){e.push(Zi(new $t(n,.08,.08).translate(0,1.2,c).toNonIndexed(),i));const l=Array.from({length:13},(u,f)=>new P(-n/2+f/12*n,0,c*.3)).map(u=>u.setY(s(u.x)));e.push(Zi(new Wa(new ah(l),24,.07,4).toNonIndexed(),i))}const r=[li([.86,.12,.1]),li([.98,.72,.12]),li([.86,.12,.1]),li([.95,.88,.7]),li([.2,.55,.3]),li([.2,.4,.75])];let o=0;for(let c=-n/2+.6;c<n/2;c+=1.15,o++){const l=s(c)-.05,u=Math.min(l-1.5,5.4+2.2*_t(c,2,8)+(o%3===0?1.3:0)),f=new zn(.62,u,2,6),h=f.getAttribute("position");for(let m=0;m<h.count;m++){const v=(u/2-h.getY(m))/u;h.setX(m,h.getX(m)*(1-.15*v)),v>.99&&Math.abs(h.getX(m))<.01&&h.setY(m,h.getY(m)+.5)}f.rotateY((_t(c,5,9)-.5)*.9).translate(c,l-u/2,o%2?.25:-.25);const d=r[Math.floor(_t(c*1.7,3,10)*r.length*.999)];e.push(Zi(f.toNonIndexed(),d,m=>Math.min(1,Math.max(0,(l-m)/u))))}for(let c=-n/2+2.3;c<n/2-1;c+=4.6){const l=s(c)-.75;e.push(Zi(new tn(.34,.34,.66,8).translate(c,l,-.6).toNonIndexed(),li([.95,.16,.08]),()=>.3)),e.push(Zi(new tn(.2,.2,.1,8).translate(c,l+.38,-.6).toNonIndexed(),li([.98,.75,.25]),()=>.3))}const a=bi(e);return a.computeVertexNormals(),a}const v2=new ie({uniforms:{...Xs},vertexShader:`
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
${$a}
varying vec3 vWorld;
void main() {
  float a = hazardAmount(vWorld);
  if (a < 0.02) discard;
  // TRẮNG ẤM (vòng 8): viền đỏ son trên cổng son / mái ngói / đá hồng là đỏ-trên-đỏ (fresh-eyes vòng 7). Trắng ấm nổi trên
  // mọi nền (trời, ruộng vàng, vách xanh) và không trùng màu nào khác của game (đèn cam, mũ nóc vàng = vọt qua được).
  // Độ đậm 0,85 → 0,38 (02/11): nét mảnh nửa trong, đọc được khi nhìn vào, không phát sáng thành quầng.
  gl_FragColor = vec4(1.0, 0.9, 0.8, a * 0.38);
}`,side:Ye,transparent:!0,depthWrite:!1}),ip=(n,t,e)=>`${Math.round(n*50)},${Math.round(t*50)},${Math.round(e*50)}`;function x2(n){if(n.getAttribute("aOutline"))return n;const t=n.getAttribute("position"),e=n.getAttribute("normal"),i=new Map;for(let r=0;r<t.count;r++){const o=ip(t.getX(r),t.getY(r),t.getZ(r)),a=i.get(o)??[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),i.set(o,a)}const s=new Float32Array(t.count*3);for(let r=0;r<t.count;r++){const o=i.get(ip(t.getX(r),t.getY(r),t.getZ(r))),a=Math.hypot(o[0],o[1],o[2]);s.set(a>1e-6?[o[0]/a,o[1]/a,o[2]/a]:[0,1,0],r*3)}return n.setAttribute("aOutline",new Nt(s,3)),n}function aa(n){const t=new Jt(x2(n),v2);return t.userData.hazardHull=!0,t}function _2(n,t){n&&(n.visible=t>5&&t<105)}const fl=EE(),M2=S0,U0={value:1},F0={value:0},wh=new hh({vertexColors:!0,side:be});wh.onBeforeCompile=n=>{n.uniforms.uLift=U0,n.uniforms.uTime=F0,Object.assign(n.uniforms,Xs),n.vertexShader=`attribute float aSway;
uniform float uTime;
${n.vertexShader}`.replace("#include <begin_vertex>",`#include <begin_vertex>
  float sw = aSway * aSway;
  transformed.z += sw * (0.5 * sin(uTime * 3.1 + position.x * 0.9) + 0.18 * sin(uTime * 7.3 + position.x * 2.3));
  transformed.x += sw * 0.1 * sin(uTime * 2.2 + position.x * 1.7);`),n.fragmentShader=`uniform float uLift;
${$a}${n.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += vColor.rgb * 0.8 * uLift;
  #ifdef USE_FOG
  totalEmissiveRadiance += hazardRim(vFogWorld, pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.0));
  #endif`)};wh.customProgramCacheKey=()=>"cloth-hazard";const O0=(n,t)=>({rock:f2(n),trees:d2(n,t)}),sp=[0,1,2,3,4,5,6,7].map(n=>O0(p2(n*1.7+.3,Vi.pillar.halfX),9)),rp=[0,1,2].map(n=>O0(m2(n*2.3+.7,Vi.spike.halfX),4)),op=new Map;function y2(n,t){const e=Math.ceil(n/4)*4,i=`${e}:${t}`;let s=op.get(i);return s||op.set(i,s=g2(e,t)),s}const ap=new Map;function dl(n,t){let e=ap.get(n);return e||ap.set(n,e=t()),e}function S2(n,t){const e=Pe(n.z),i=n.kind==="ridge"||n.kind==="bridge";Se(n.z,i?0:mn(n.lane),0,t);const s=Math.round((Ke(t.x,t.z)-e)*2)/2,r=u=>new Jt(u,FA).add(aa(u)),o=Ba()>.5,a=o?"hg":"";if(n.kind==="ridge")return r(dl(`${a}d${s}`,()=>bA(26,1,s,o?Qa:void 0)));if(n.kind==="bridge")return r(dl(`${a}g${s}`,()=>wA(s,o?AA:void 0)));const c=n.id%3,l=r(dl(`${a}h${c}:${s}`,()=>IA(c,1-s,o)));return l.position.y=s,l.updateMatrix(),new Be().add(l,MA(8,9,s+.12))}function b2(){const n=new Be,t=new Map,e={x:0,y:0,z:0},i=s=>{const r=Dr(s.z);let o;if(zi(s.z))o=S2(s,e);else if(s.kind==="pillar"||s.kind==="spike"){const c=(s.kind==="pillar"?sp:rp)[s.id%(s.kind==="pillar"?sp.length:rp.length)];o=new Be().add(new Jt(c.rock,fl).add(aa(c.rock)),new Jt(c.trees,M2))}else if(s.kind==="ridge"){const c=Pe(s.z),l=s.open?64:2*r+18,u=new Map,f=v=>{let g=u.get(v);return g===void 0&&u.set(v,g=Ke(Se(s.z,v,0,e).x,e.z)-c),g},h=l/2-20,d=v=>Math.min(1,Math.abs(v)/h),m=s.open?np(l,v=>1+Math.max(0,Math.abs(v)-h)*2.2,v=>Math.abs(v)<h?-16-70*d(v)**6:f(v)-12):np(l,v=>Math.abs(v)<10?1:Math.max(1,f(v)+3),v=>f(v)-12);o=new Jt(m,fl).add(aa(m)),o.userData.own=!0}else{const c=y2(s.open?46:2*r+18,s.open);o=new Jt(c,wh).add(aa(c))}const a=s.kind==="ridge"||s.kind==="bridge";return Se(s.z,a?0:mn(s.lane),0,e),o.position.set(e.x,e.y,e.z),o.rotation.y=En(s.z)+(a||zi(s.z)?0:s.id*2.39),!a&&!zi(s.z)&&o.scale.set(1+.15*(s.id*.618%1),1,1+.15*(s.id*.382%1)),o.matrixAutoUpdate=!1,o.updateMatrix(),o.traverse(c=>{c.matrixAutoUpdate=!1,c.updateMatrixWorld(),c.userData.hazardHull&&(o.userData.hull=c)}),n.add(o),o};return{group:n,update(s,r,o){F0.value=r;const a=Math.min(1,Math.max(0,(o-.4)/.5));U0.value=1-.75*a,fl.uniforms.uLift.value=1-.45*a;const c=new Set;for(const l of s.obstacles){c.add(l.id);let u=t.get(l.id);u||t.set(l.id,u=i(l)),_2(u.userData.hull,l.z-s.z)}for(const[l,u]of t)c.has(l)||(n.remove(u),u.userData.own&&u.geometry.dispose(),t.delete(l))}}}function w2(n){const t=new Si({map:n,roughness:.8,side:be}),e={uTime:{value:0},uFlutter:{value:1}};return t.onBeforeCompile=i=>{Object.assign(i.uniforms,e),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uFlutter;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  float edge = uv.y * uv.y;
  transformed.y += edge * uFlutter * (0.035 * sin(uTime * 31.0 + uv.x * 7.0) + 0.02 * sin(uTime * 17.0 - uv.x * 13.0));`)},t.userData.setTime=(i,s)=>{e.uTime.value=i,e.uFlutter.value=s},t}const Xo=new Si({color:"#a8141c",roughness:.55}),T2=new Si({color:"#f6f4ef",roughness:.18,metalness:.05}),E2=new Si({color:"#15161c",roughness:.08,metalness:.6}),pl=new Si({color:"#1c1d22",roughness:.75});function qo(n,t,e,i){const s=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=new Jt(new ih(e,s,4,10),i);return r.position.set((n[0]+t[0])/2,(n[1]+t[1])/2,(n[2]+t[2])/2),r.lookAt(r.position.x+t[0]-n[0],r.position.y+t[1]-n[1],r.position.z+t[2]-n[2]),r.rotateX(Math.PI/2),r}function A2(){const n=document.createElement("canvas");n.width=n.height=256;const t=n.getContext("2d");t.fillStyle="#efe2c8",t.fillRect(0,0,256,256);for(let i=-8;i<16;i++)for(const[s,r]of[[1,1],[1,-1]])t.strokeStyle="rgba(120,80,50,0.28)",t.lineWidth=2,t.beginPath(),t.moveTo(i*32,r>0?0:256),t.lineTo(i*32+256*s,r>0?256:0),t.stroke();t.fillStyle="#2bb5ad",t.fillRect(0,18,256,14),t.fillStyle="#a8141c",t.fillRect(0,0,256,10),t.fillRect(0,226,256,30);const e=new nh(n);return e.colorSpace=Fe,e.anisotropy=4,e}function cp(n,t,e,i,s,r){const c=[],l=[],u=[];for(let h=0;h<=6;h++){const d=h/6;for(let m=0;m<=10;m++){const v=m/10,g=[0,1,2].map(p=>(1-d)*((1-v)*n[p]+v*t[p])+d*((1-v)*i[p]+v*e[p]));g[2]=g[2]+.12*d*Math.sin(Math.PI*v),g[1]=g[1]+s*Math.sin(Math.PI*v)*Math.sin(Math.PI*d)+.025*Math.abs(Math.sin(Math.PI*v*4)),c.push(...g),l.push(v*2,d)}}for(let h=0;h<6;h++)for(let d=0;d<10;d++){const m=h*11+d;r?u.push(m,m+1,m+10+1,m+1,m+10+2,m+10+1):u.push(m,m+10+1,m+1,m+1,m+10+1,m+10+2)}const f=new Qt;return f.setAttribute("position",new Nt(new Float32Array(c),3)),f.setAttribute("uv",new Nt(new Float32Array(l),2)),f.setIndex(u),f.computeVertexNormals(),f}function R2(){const n=new Be,t=new Be;n.add(t);const e=A2(),i=w2(e);t.add(qo([0,0,-.32],[0,.02,.5],.18,Xo));const s=new Jt(new Os(.15,20,14),T2);s.position.set(0,.07,.78);const r=new Jt(new Os(.152,20,10,-1.1,2.2,1.35,.6),E2);r.position.copy(s.position),r.rotation.x=-.3,t.add(s,r);const o=new Jt(new $t(.26,.1,.4,2,1,2),pl);o.position.set(0,.19,.1),t.add(o);const a=[],c=[];for(const m of[1,-1]){const v=new Be,g=[.17*m,.05,.44],p=[1.02*m,.07,.3];v.add(qo(g,p,.06,Xo));const M=new Jt(new Os(.06,8,6),pl);M.position.set(p[0]+.05*m,p[1],p[2]+.02),v.add(M),c.push(M),v.add(new Jt(cp(g,p,[.62*m,.02,-.2],[.2*m,0,-.42],.07,m<0),i)),a.push(v),t.add(v)}const l=[.14,0,-.34],u=[-.14,0,-.34],f=[.33,-.03,-1.18],h=[-.33,-.03,-1.18];t.add(qo(l,f,.075,Xo),qo(u,h,.075,Xo)),t.add(new Jt(cp([.13,0,-.36],[-.13,0,-.36],h,f,.05,!1),i));const d=[];for(const m of[f,h]){const v=new Jt(new $t(.12,.17,.13),pl);v.position.set(m[0],m[1]-.04,m[2]-.06),t.add(v),d.push(v)}return{root:n,body:t,feet:d,tips:c,ankles:d,animate(m,v,g){for(const p of a)p.scale.x=v;i.userData.setTime?.(m,g)}}}const C2={roll:.62,flip:.9,split:3,spiral:1.5},lp=cn-10,mr=n=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,n)));function P2(){const n={roll:0,pitch:0,dx:0,dv:0,cam:0,spread:null};let t=null,e=0,i=1,s=0,r=!1,o=Number.NaN,a=0;const c=(l,u)=>{t=l,e=0,i=u,r=!0};return{trick(l,u){return t!==null?!1:(c(l,u),!0)},update(l,u){if(n.roll=n.pitch=n.dx=n.dv=n.cam=0,n.spread=null,l.mode!=="run")return t=null,o=Number.NaN,n;const f=un(l.z);if(o<lp&&f>=lp&&f-o<200?c("split",Qr(l.z)%2===0?1:-1):t===null&&l.thermalT>0&&a<=0&&c("spiral",l.x>=0?-1:1),o=f,a=l.thermalT,t===null)return n;r&&(r=!1,s=l.obstacles.some(v=>v.z>l.z-2&&v.z<l.z+l.speed)?1:3),e+=u;const h=e/C2[t];if(h>=1)return t=null,n;const d=Op(l.z);if(t==="roll")n.roll=i*2*Math.PI*mr(h),n.spread=1.06;else if(t==="flip"){const m=2*Math.PI*mr(h);n.pitch=-m,n.dv=s*.5*(1-Math.cos(m)),n.spread=.82}else if(t==="split")n.roll=i*Math.PI*(mr(h/.15)+mr((h-.7)/.22)),n.spread=1.04;else{const m=4*Math.PI*mr(h),v=Math.sin(Math.PI*h);n.roll=i*m,n.dx=i*v*Math.sin(m),n.dv=v*(1-Math.cos(m))}return(t==="roll"||t==="split")&&(n.cam=i*Math.sin(Math.abs(n.roll)/2)*(.12+.3*d)),n}}}const k0=n=>2.5*(1-Math.exp(-n*6)),L2=n=>4.5*Math.min(n,1.4)**2,Ko={x:0,y:0,z:0};function B0(n){return Se(n.z-k0(n.crashT),n.x,n.v,Ko),Math.max(0,Math.min(L2(n.crashT),Ko.y-Ke(Ko.x,Ko.z)-.6))}function N2(){let n=0,t=0,e=0,i=0,s=0,r=0,o=0,a=1;const c=P2();let l=0;return{lateralSpeed:()=>e,trick:(u,f)=>c.trick(u,f),camRoll:()=>l,apply(u,f,h,d){const{root:m,body:v}=u;if(d>0){const T=1-Math.exp(-d*14);e+=((f.x-n)/d-e)*T,i+=((f.v-t)/d-i)*T}n=f.x,t=f.v;const g=c.update(f,d);if(l=g.cam,Se(f.z,f.x+g.dx,f.v+g.dv,m.position),m.rotation.order="YXZ",m.rotation.set(-Math.atan(gi(f.z)),En(f.z),0),v.rotation.order="ZXY",f.mode==="crash"||f.mode==="over"){Se(f.z-k0(f.crashT),f.x,f.v-B0(f),m.position),v.rotation.set(Math.sin(h*9)*1.6,h*4,h*13),u.animate(h,.7,2.5,0,d);return}const p=1-Math.exp(-d*10);s+=(Math.max(-1.1,Math.min(1.1,e*.027+Fp(f.z,f.speed)))-s)*p;const M=-(Math.atan(gi(f.z+18))-Math.atan(gi(f.z)))*.9;r+=(Math.max(-.45,Math.min(.5,-i*.045+M))-r)*p,o+=(Math.max(-.2,Math.min(.2,e*.006))-o)*p;const y=g.spread??(f.vert==="dive"?.8:f.vert==="flare"?1.06:1);a+=(y-a)*p;const x=Math.sin(h*23)*.012+Math.sin(h*7.3)*.018,_=(f.stunT/st.stunTime)**2;v.rotation.set(r+g.pitch+x+.3*_*Math.sin(h*9.3+1),o+.28*_*Math.sin(h*6.1),s+g.roll+x*.6+.6*_*Math.sin(h*13));const S=(f.vert==="dive"?1.8:f.thermalT>0?1.4:1)+1.6*_;u.animate(h,a-.22*_,S,Math.max(-1,Math.min(1,e/35+Math.sin(h*11)*_)),d)}}}function I2(n){const t=new Map,e=new Map,i=n.clone();return z0(n,i,function(s,r){t.set(r,s),e.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function z0(n,t,e){e(n,t);for(let i=0;i<n.children.length;i++)z0(n.children[i],t.children[i],e)}class D2 extends Zs{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new B2(e)}),this.register(function(e){return new z2(e)}),this.register(function(e){return new $2(e)}),this.register(function(e){return new Z2(e)}),this.register(function(e){return new J2(e)}),this.register(function(e){return new V2(e)}),this.register(function(e){return new G2(e)}),this.register(function(e){return new W2(e)}),this.register(function(e){return new X2(e)}),this.register(function(e){return new k2(e)}),this.register(function(e){return new q2(e)}),this.register(function(e){return new H2(e)}),this.register(function(e){return new Y2(e)}),this.register(function(e){return new K2(e)}),this.register(function(e){return new F2(e)}),this.register(function(e){return new up(e,ee.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new up(e,ee.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Q2(e)})}load(t,e,i,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Lr.extractUrlBase(t);o=Lr.resolveURL(l,this.path)}else o=Lr.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Vm(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,i,s){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===H0){try{o[ee.KHR_BINARY_GLTF]=new j2(t)}catch(f){s&&s(f);return}r=JSON.parse(o[ee.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new f3(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const f=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(f){case ee.KHR_MATERIALS_UNLIT:o[f]=new O2;break;case ee.KHR_DRACO_MESH_COMPRESSION:o[f]=new t3(r,this.dracoLoader);break;case ee.KHR_TEXTURE_TRANSFORM:o[f]=new e3;break;case ee.KHR_MESH_QUANTIZATION:o[f]=new n3;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,s)}parseAsync(t,e){const i=this;return new Promise(function(s,r){i.parse(t,e,s,r)})}}function U2(){let n={};return{get:function(t){return n[t]},add:function(t,e){n[t]=e},remove:function(t){delete n[t]},removeAll:function(){n={}}}}function Le(n,t,e){const i=n.json.materials[t];return i.extensions&&i.extensions[e]?i.extensions[e]:null}const ee={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class F2{constructor(t){this.parser=t,this.name=ee.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let i=0,s=e.length;i<s;i++){const r=e[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,i="light:"+t;let s=e.cache.get(i);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new ct(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],vn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Wm(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new eM(u),l.distance=f;break;case"spot":l=new j_(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(i,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,i=this.parser,r=i.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(e.cache,a,c)})}}class O2{constructor(){this.name=ee.KHR_MATERIALS_UNLIT}getMaterialType(){return je}extendParams(t,e,i){const s=[];t.color=new ct(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],vn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(t,"map",r.baseColorTexture,Fe))}return Promise.all(s)}}class k2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);return i===null||i.emissiveStrength!==void 0&&(e.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class B2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(e.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(e,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new rt(r,r)}return Promise.all(s)}}class z2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);return i===null||(e.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class H2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(e.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(e.iridescenceIOR=i.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class V2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_SHEEN}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];if(e.sheenColor=new ct(0,0,0),e.sheenRoughness=0,e.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],vn)}return i.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenColorMap",i.sheenColorTexture,Fe)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(e,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class G2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(e.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(e,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class W2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_VOLUME}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(e,"thicknessMap",i.thicknessTexture)),e.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return e.attenuationColor=new ct().setRGB(r[0],r[1],r[2],vn),Promise.all(s)}}class X2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_IOR}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);return i===null||(e.ior=i.ior!==void 0?i.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class q2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];e.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return e.specularColor=new ct().setRGB(r[0],r[1],r[2],vn),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(e,"specularColorMap",i.specularColorTexture,Fe)),Promise.all(s)}}class K2{constructor(t){this.parser=t,this.name=ee.EXT_MATERIALS_BUMP}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return e.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(e,"bumpMap",i.bumpTexture)),Promise.all(s)}}class Y2{constructor(t){this.parser=t,this.name=ee.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Le(this.parser,t,this.name)!==null?ni:null}extendMaterialParams(t,e){const i=Le(this.parser,t,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(e.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(e.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(e,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class $2{constructor(t){this.parser=t,this.name=ee.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,i=e.json,s=i.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class Z2{constructor(t){this.parser=t,this.name=ee.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class J2{constructor(t){this.parser=t,this.name=ee.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,i=this.parser,s=i.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let c=i.textureLoader;if(a.uri){const l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(t,o.source,c)}}class up{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,i=e.bufferViews[t];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,f=s.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,s.mode,s.filter),d})})}else return null}}class Q2{constructor(t){this.name=ee.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,i=e.nodes[t];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=e.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Sn.TRIANGLES&&l.mode!==Sn.TRIANGLE_STRIP&&l.mode!==Sn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),f=u.isGroup?u.children:[u],h=l[0].count,d=[];for(const m of f){const v=new Dt,g=new P,p=new Ae,M=new P(1,1,1),y=new Xe(m.geometry,m.material,h);for(let _=0;_<h;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,v.compose(g,p,M));let x=null;for(const _ in c)if(_==="_COLOR_0"){const S=c[_];y.instanceColor=new wa(S.array,S.itemSize,S.normalized)}else if(_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"){if(x===null){const T=y.geometry;x=new Qt,x.name=T.name;for(const b in T.attributes)x.setAttribute(b,T.attributes[b]);for(const b in T.morphAttributes)x.morphAttributes[b]=T.morphAttributes[b];T.index!==null&&x.setIndex(T.index),x.morphTargetsRelative=T.morphTargetsRelative;for(const b of T.groups)x.addGroup(b.start,b.count,b.materialIndex);T.boundingBox!==null&&(x.boundingBox=T.boundingBox.clone()),T.boundingSphere!==null&&(x.boundingSphere=T.boundingSphere.clone()),x.drawRange.start=T.drawRange.start,x.drawRange.count=T.drawRange.count,x.userData=Object.assign({},T.userData),y.geometry=x}const S=c[_];x.setAttribute(_,new wa(S.array,S.itemSize,S.normalized))}we.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const H0="glTF",gr=12,hp={JSON:1313821514,BIN:5130562};class j2{constructor(t){this.name=ee.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,gr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==H0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-gr,r=new DataView(t,gr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===hp.JSON){const l=new Uint8Array(t,gr+o,a);this.content=i.decode(l)}else if(c===hp.BIN){const l=gr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class t3{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ee.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const i=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const f=Tu[u]||u.toLowerCase();a[f]=o[u]}for(const u in t.attributes){const f=Tu[u]||u.toLowerCase();if(o[u]!==void 0){const h=i.accessors[t.attributes[u]],d=ks[h.componentType];l[f]=d.name,c[f]=h.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(f,h){s.decodeDracoFile(u,function(d){for(const m in d.attributes){const v=d.attributes[m],g=c[m];g!==void 0&&(v.normalized=g)}f(d)},a,l,vn,h)})})}}class e3{constructor(){this.name=ee.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const i=Math.cos(t.rotation),s=Math.sin(t.rotation);t.matrix.set(t.repeat.x*i,t.repeat.y*s,t.offset.x,-t.repeat.x*s,t.repeat.y*i,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class n3{constructor(){this.name=ee.KHR_MESH_QUANTIZATION}}class V0 extends Ks{constructor(t,e,i,s){super(t,e,i,s)}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=i[r+o];return e}interpolate_(t,e,i,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-e,f=(i-e)/u,h=f*f,d=h*f,m=t*l,v=m-l,g=-2*d+3*h,p=d-h,M=1-g,y=p-h+f;for(let x=0;x!==a;x++){const _=o[v+x+a],S=o[v+x+c]*u,T=o[m+x+a],b=o[m+x]*u;r[x]=M*_+y*S+g*T+p*b}return r}}const i3=new Ae;class s3 extends V0{interpolate_(t,e,i,s){const r=super.interpolate_(t,e,i,s);return i3.fromArray(r).normalize().toArray(r),r}}const Sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fp={9728:Oe,9729:ke,9984:am,9985:Qo,9986:Mr,9987:di},dp={33071:Yn,33648:xa,10497:Hs},ml={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Di={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},r3={CUBICSPLINE:void 0,LINEAR:zr,STEP:Br},gl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function o3(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Si({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_i})),n.DefaultMaterial}function Ji(n,t,e){for(const i in e.extensions)n[i]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[i]=e.extensions[i])}function qn(n,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(n.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function a3(n,t,e){let i=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const f=t[l];if(f.POSITION!==void 0&&(i=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];if(i){const h=f.POSITION!==void 0?e.getDependency("accessor",f.POSITION):n.attributes.position;o.push(h)}if(s){const h=f.NORMAL!==void 0?e.getDependency("accessor",f.NORMAL):n.attributes.normal;a.push(h)}if(r){const h=f.COLOR_0!==void 0?e.getDependency("accessor",f.COLOR_0):n.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],f=l[1],h=l[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=f),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function c3(n,t){if(n.updateMorphTargets(),t.weights!==void 0)for(let e=0,i=t.weights.length;e<i;e++)n.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(n.morphTargetInfluences.length===e.length){n.morphTargetDictionary={};for(let i=0,s=e.length;i<s;i++)n.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function l3(n){let t;const e=n.extensions&&n.extensions[ee.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+vl(e.attributes):t=n.indices+":"+vl(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)t+=":"+vl(n.targets[i]);return t}function vl(n){let t="";const e=Object.keys(n).sort();for(let i=0,s=e.length;i<s;i++)t+=e[i]+":"+n[e[i]]+";";return t}function Eu(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function u3(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const h3=new Dt;class f3{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new U2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=i&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new Z_(this.options.manager):this.textureLoader=new iM(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vm(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return Ji(r,a,s),qn(a,s),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,i){if(t.refs[e]<=1)return i;const s=i.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(i,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const s=t(e[i]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&i.push(r)}return i}getDependency(t,e){const i=t+":"+e;let s=this.cache.get(i);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(i,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const i=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return i.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[ee.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){i.load(Lr.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(i){const s=e.byteLength||0,r=e.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(t){const e=this,i=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=ml[s.type],a=ks[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Nt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=ml[s.type],l=ks[s.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,h=s.byteOffset||0,d=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let v,g;if(d&&d!==f){const p=Math.floor(h/d),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=e.cache.get(M);y||(v=new l(a,p*d,s.count*d/u),y=new Vx(v,d/u),e.cache.add(M,y)),g=new Ju(y,c,h%d/u,m)}else a===null?v=new l(s.count*c):v=new l(a,h,s.count*c),g=new Nt(v,c,m);if(s.sparse!==void 0){const p=ml.SCALAR,M=ks[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,_=new M(o[1],y,s.sparse.count*p),S=new l(o[2],x,s.sparse.count*c);a!==null&&(g=new Nt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,b=_.length;T<b;T++){const w=_[T];if(g.setX(w,S[T*c]),c>=2&&g.setY(w,S[T*c+1]),c>=3&&g.setZ(w,S[T*c+2]),c>=4&&g.setW(w,S[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(t){const e=this.json,i=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,i){const s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=fp[h.magFilter]||ke,u.minFilter=fp[h.minFilter]||di,u.wrapS=dp[h.wrapS]||Hs,u.wrapT=dp[h.wrapT]||Hs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Oe&&u.minFilter!==ke,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const i=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(f=>f.clone());const o=s.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const h=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(f){return new Promise(function(h,d){let m=h;e.isImageBitmapLoader===!0&&(m=function(v){const g=new ze(v);g.needsUpdate=!0,h(g)}),e.load(Lr.resolveURL(f,r.path),m,void 0,d)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),qn(f,o),f.userData.mimeType=o.mimeType||u3(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[t]=u,u}assignTexture(t,e,i,s){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[ee.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[ee.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[ee.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let i=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new Tm,On.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(t.isLine){const a="LineBasicMaterial:"+i.uuid;let c=this.cache.get(a);c||(c=new th,On.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}t.material=i}getMaterialType(){return Si}loadMaterial(t){const e=this,i=this.json,s=this.extensions,r=i.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[ee.KHR_MATERIALS_UNLIT]){const f=s[ee.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,e))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ct(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],vn),a.opacity=h[3]}f.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",f.baseColorTexture,Fe)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=be);const u=r.alphaMode||gl.OPAQUE;if(u===gl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===gl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==je&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new rt(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==je&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==je){const f=r.emissiveFactor;a.emissive=new ct().setRGB(f[0],f[1],f[2],vn)}return r.emissiveTexture!==void 0&&o!==je&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Fe)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),qn(f,r),e.associations.set(f,{materials:t}),r.extensions&&Ji(s,f,r),f})}createUniqueName(t){const e=pe.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[ee.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return pp(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l3(l),f=s[u];if(f)o.push(f.promise);else{let h;l.extensions&&l.extensions[ee.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=pp(new Qt,l,e),l.mode===Sn.TRIANGLE_STRIP?h=h.then(d=>Wd(d,pm)):l.mode===Sn.TRIANGLE_FAN&&(h=h.then(d=>Wd(d,cu))),s[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(t){const e=this,i=this.json,s=this.extensions,r=i.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?o3(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let d=0,m=u.length;d<m;d++){const v=u[d],g=o[d];let p;const M=l[d];if(g.mode===Sn.TRIANGLES||g.mode===Sn.TRIANGLE_STRIP||g.mode===Sn.TRIANGLE_FAN||g.mode===void 0){const y=r.isSkinnedMesh===!0,x=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");y&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=y&&x?new Sm(v,M):new Jt(v,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Sn.LINES)p=new wm(v,M);else if(g.mode===Sn.LINE_STRIP)p=new eh(v,M);else if(g.mode===Sn.LINE_LOOP)p=new Jx(v,M);else if(g.mode===Sn.POINTS)p=new Aa(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&c3(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),qn(p,r),g.extensions&&Ji(s,p,g),e.assignFinalMaterial(p),f.push(p)}for(let d=0,m=f.length;d<m;d++)e.associations.set(f[d],{meshes:t,primitives:d});if(f.length===1)return r.extensions&&Ji(s,f[0],r),f[0];const h=new Be;r.extensions&&Ji(s,h,r),e.associations.set(h,{meshes:t});for(let d=0,m=f.length;d<m;d++)h.add(f[d]);return h})}loadCamera(t){let e;const i=this.json.cameras[t],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new rn(wx.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(e=new no(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),qn(e,i),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],i=[];for(let s=0,r=e.joints.length;s<r;s++)i.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const f=o[l];if(f){a.push(f);const h=new Dt;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new ju(a,c)})}loadAnimation(t){const e=this.json,i=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let f=0,h=s.channels.length;f<h;f++){const d=s.channels[f],m=s.samplers[d.sampler],v=d.target,g=v.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,M=s.parameters!==void 0?s.parameters[m.output]:m.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(m),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],m=f[2],v=f[3],g=f[4],p=[];for(let y=0,x=h.length;y<x;y++){const _=h[y],S=d[y],T=m[y],b=v[y],w=g[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const R=i._createAnimationTracks(_,S,T,b,w);if(R)for(let C=0;C<R.length;C++)p.push(R[C])}const M=new G_(r,void 0,p);return qn(M,s),M})}createNodeMesh(t){const e=this.json,i=this,s=e.nodes[t];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){const e=this.json,i=this,s=e.nodes[t],r=i._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],f=l[1],h=l[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,h3)});for(let d=0,m=f.length;d<m;d++)u.add(f[d]);if(u.userData.pivot!==void 0&&f.length>0){const d=u.userData.pivot,m=f[0];u.pivot=new P().fromArray(d),u.position.x-=d[0],u.position.y-=d[1],u.position.z-=d[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(t){const e=this.json,i=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new bm:l.length>1?u=new Be:l.length===1?u=l[0]:u=new we,u!==l[0])for(let f=0,h=l.length;f<h;f++)u.add(l[f]);if(r.name&&(u.userData.name=r.name,u.name=o),qn(u,r),r.extensions&&Ji(i,u,r),r.matrix!==void 0){const f=new Dt;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,i=this.json.scenes[t],s=this,r=new Be;i.name&&(r.name=s.createUniqueName(i.name)),qn(r,i),i.extensions&&Ji(e,r,i);const o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,f=c.length;u<f;u++){const h=c[u];h.parent!==null?r.add(I2(h)):r.add(h)}const l=u=>{const f=new Map;for(const[h,d]of s.associations)(h instanceof On||h instanceof ze)&&f.set(h,d);return u.traverse(h=>{const d=s.associations.get(h);d!=null&&f.set(h,d)}),f};return s.associations=l(r),r})}_createAnimationTracks(t,e,i,s,r){const o=[],a=t.name?t.name:t.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Di[r.path]===Di.weights?(l(t),t.isGroup&&t.children.forEach(l)):c.push(a);let u;switch(Di[r.path]){case Di.weights:u=Kr;break;case Di.rotation:u=Yr;break;case Di.translation:case Di.scale:u=Ra;break;default:i.itemSize===1?u=Kr:u=Ra;break}const f=s.interpolation!==void 0?r3[s.interpolation]:zr,h=this._getArrayFromAccessor(i);for(let d=0,m=c.length;d<m;d++){const v=new u(c[d]+"."+Di[r.path],e.array,h,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),o.push(v)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const i=Eu(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*i;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(i){const s=this instanceof Yr?s3:V0;return new s(this.times,this.values,this.getValueSize()/3,i)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function d3(n,t,e){const i=t.attributes,s=new yi;if(i.POSITION!==void 0){const a=e.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=Eu(ks[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new P,c=new P;for(let l=0,u=r.length;l<u;l++){const f=r[l];if(f.POSITION!==void 0){const h=e.json.accessors[f.POSITION],d=h.min,m=h.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),h.normalized){const v=Eu(ks[h.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;const o=new Bn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function pp(n,t,e){const i=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(const o in i){const a=Tu[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(t.indices!==void 0&&!n.index){const o=e.getDependency("accessor",t.indices).then(function(a){n.setIndex(a)});s.push(o)}return te.workingColorSpace!==vn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${te.workingColorSpace}" not supported.`),qn(n,t),d3(n,t,e),Promise.all(s).then(function(){return t.targets!==void 0?a3(n,t.targets,e):n})}const p3=2.15,m3=[Math.PI/2,0,0],g3=[new P(1,0,0),new P(0,1,0),new P(0,0,1)];class Bs{static q=new Ae;bone;rest;axes;cur=[0,0,0];constructor(t){this.bone=t,this.rest=t.quaternion.clone();const e=t.getWorldQuaternion(new Ae).invert();this.axes=g3.map(i=>i.clone().applyQuaternion(e))}static t=[0,0,0];set(t,e,i,s){const r=Bs.t;r[0]=t,r[1]=e,r[2]=i,this.bone.quaternion.copy(this.rest);for(let o=0;o<3;o++)this.cur[o]+=(r[o]-this.cur[o])*s,this.cur[o]&&this.bone.quaternion.multiply(Bs.q.setFromAxisAngle(this.axes[o],this.cur[o]))}}function v3(n){const t=h=>h.getWorldPosition(new P),e=h=>h.children.filter(d=>d.isBone),i=h=>{const d=[h];for(let m=e(h);m.length===1;m=e(m[0]))d.push(m[0]);return d},s=[];n.traverse(h=>{h.isBone&&s.push(h)});const r=s[0];if(!r)return null;const o=e(r).sort((h,d)=>t(d).z-t(h).z);if(o.length<3)return null;const a=i(o[0]),c=a[a.length-1],l=e(c).sort((h,d)=>Math.abs(t(h).x)-Math.abs(t(d).x));if(l.length<3)return null;const u=(h,d)=>({side:Math.sign(t(h).x),j:d(i(h)).map(m=>new Bs(m))}),f=o.slice(-2);return{spine:a.map(h=>new Bs(h)),neck:i(l[0]).slice(0,2).map(h=>new Bs(h)),arms:l.slice(-2).map(h=>u(h,d=>d.length>=4?d.slice(1,4):d.slice(0,3))),legs:f.map(h=>u(h,d=>d.slice(0,3))),toes:f.map(h=>i(h).at(-1)),ankles:f.map(h=>i(h)[2]??i(h).at(-1)),hands:l.slice(-2).map(h=>i(h).at(-1))}}const G0={value:0};function x3(n){const t=new Si({map:n.map,roughness:.78,metalness:0,side:be});return t.onBeforeCompile=e=>{e.uniforms.uHurt=G0,e.fragmentShader=`uniform float uHurt;
${e.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rimK = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += mix(vec3(1.0, 0.68, 0.42), vec3(1.0, 0.1, 0.05), uHurt) * rimK * (1.05 + 1.5 * uHurt) + diffuseColor.rgb * 0.16 + vec3(0.9, 0.06, 0.03) * uHurt * 0.6;`)},t}function _3(){const n=new je({color:new ct(.06,.02,.05),side:Ye});return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`transformed += normalize(objectNormal) * 0.011;
#include <project_vertex>`)},n.customProgramCacheKey=()=>"pilot-outline",n}function M3(n,t=!0){return new D2().loadAsync("models/pilot.glb").then(e=>{const i=e.scene,s=[];i.traverse(a=>{const c=a;c.isSkinnedMesh&&(c.material=x3(c.material),c.frustumCulled=!1,s.push(c))});for(const a of t?s:[]){const c=new Sm(a.geometry,_3());c.bind(a.skeleton,a.bindMatrix),c.frustumCulled=!1,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent?.add(c)}const r=new Be;r.rotation.set(...m3),r.scale.setScalar(p3),r.position.set(0,0,.12),r.add(i),r.updateMatrixWorld(!0);const o=v3(i);for(const a of n.body.children)a.visible=!1;if(n.body.add(r),!o){console.warn("[sky-run] khong do duoc cay xuong nguoi bay — hien model, bo dieu khien xuong");return}n.feet=o.toes,n.ankles=o.ankles,n.tips=o.hands,n.animate=(a,c,l,u,f)=>{const h=1-Math.exp(-f*12),d=Math.min(1,Math.max(0,(1-c)/.2)),m=Math.min(1,Math.max(0,(c-1)/.06)),v=7*l;for(const{side:g,j:p}of o.arms){const M=.07+.16*m-.08*d;p.forEach((y,x)=>{const _=Math.sin(a*v-x*.8+(g>0?.4:0))*(.025+.02*x),S=x===0?.5*d-.12*m:x===1?.18*d:.08*d;y.set(0,g*S,g*((x===0?M:0)+_),h)})}for(const{side:g,j:p}of o.legs){const[M,y,x]=p;M?.set(-.05*m,-g*(.06+.08*m-.14*d)+.07*u,0,h),y?.set(-(.08+.3*m+Math.sin(a*v*.5+g)*.03),0,0,h),x?.set(1.15,0,0,h)}o.spine.forEach((g,p)=>g.set(Math.sin(a*1.7+p)*.015-.06*m,.07*u,0,h)),o.neck.forEach((g,p)=>g.set(p===0?-(.3+.1*d):-.22,p===0?.05*u:0,0,h))}}).catch(e=>console.warn("[sky-run] khong tai duoc models/pilot.glb — giu nguoi bay khoi hop",e))}const Ui=18,mp=.075,y3=.035;function S3(){const n=new Float32Array(2*Ui*2*3),t=new Float32Array(2*Ui*2*4),e=new Uint16Array(2*(Ui-1)*6);for(let u=0,f=0;u<2;u++)for(let h=0;h<Ui-1;h++){const d=(u*Ui+h)*2;e.set([d,d+1,d+2,d+1,d+3,d+2],f),f+=6}const i=new Qt;i.setAttribute("position",new Nt(n,3)),i.setAttribute("color",new Nt(t,4)),i.setIndex(new Nt(e,1));const s=new Jt(i,new je({vertexColors:!0,transparent:!0,blending:gn,depthWrite:!1,fog:!1}));s.frustumCulled=!1,s.renderOrder=5;const r=[[],[]],o=[],a=new P,c=new P,l=new P;return{mesh:s,update(u,f,h,d,m){for(let v=0;v<2;v++){const g=r[v],p=u[v];if(h&&p){const y=(g.length>=Ui?g.pop():o.pop())??{p:new P,t:0};p.getWorldPosition(y.p),y.t=f,g.unshift(y)}for(;g.length&&f-g[g.length-1].t>mp;)o.push(g.pop());const M=g.length;for(let y=0;y<Ui;y++){const x=(v*Ui+y)*2;if(y>=M||M<2){x>=2&&n.copyWithin(x*3,(x-2)*3,x*3),t.fill(0,x*4,x*4+8);continue}const _=g[y],S=Math.min(1,(f-_.t)/mp);y+1<M?a.subVectors(_.p,g[y+1].p):a.subVectors(g[y-1].p,_.p),l.subVectors(m,_.p),c.crossVectors(a,l).normalize().multiplyScalar(y3*(1-.85*S));const T=x*3;n[T]=_.p.x+c.x,n[T+1]=_.p.y+c.y,n[T+2]=_.p.z+c.z,n[T+3]=_.p.x-c.x,n[T+4]=_.p.y-c.y,n[T+5]=_.p.z-c.z;const b=(1-S)**2*Math.min(1,S*8+.35)*(.22+.3*d),w=x*4;t[w]=t[w+4]=1,t[w+1]=t[w+5]=.95,t[w+2]=t[w+6]=.86,t[w+3]=t[w+7]=b}}i.attributes.position.needsUpdate=!0,i.attributes.color.needsUpdate=!0}}}const ca={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const b3=new no(-1,1,1,-1,0,1);class w3 extends Qt{constructor(){super(),this.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qt([0,2,0,0,2,0],2))}}const T3=new w3;class Th{constructor(t){this._mesh=new Jt(T3,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,b3)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Au extends Qs{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof ie?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xn.clone(t.uniforms),this.material=new ie({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Th(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class gp extends Qs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class E3 extends Qs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class A3{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new rt);this._width=i.width,this._height=i.height,e=new on(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ln}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Au(ca),this.copyPass.material.blending=Jn,this.timer=new oM}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}gp!==void 0&&(o instanceof gp?i=!0:o instanceof E3&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Yo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class R3 extends Qs{constructor(){super(),this.isOutputPass=!0,this.uniforms=xn.clone(Yo.uniforms),this.material=new Bm({name:Yo.name,uniforms:this.uniforms,vertexShader:Yo.vertexShader,fragmentShader:Yo.fragmentShader}),this._fsQuad=new Th(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},te.getTransfer(this._outputColorSpace)===ue&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Iu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Du?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Uu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===za?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ou?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ku?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Fu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class C3 extends Qs{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ct}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const P3={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class qs extends Qs{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new rt(t.x,t.y):new rt(256,256),this.clearColor=new ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new on(r,o,{type:ln,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new on(r,o,{type:ln,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new on(r,o,{type:ln,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}const a=P3;this.highPassUniforms=xn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ie({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new rt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xn.clone(ca.uniforms),this.blendMaterial=new ie({uniforms:this.copyUniforms,vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader,premultipliedAlpha:!0,blending:gn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ct,this._oldClearAlpha=1,this._basic=new je,this._fsQuad=new Th(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new rt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=qs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=qs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],c=o+1<t?e[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new ie({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new ie({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}qs.BlurDirectionX=new rt(1,0);qs.BlurDirectionY=new rt(0,1);const W0=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,L3={defines:{SHAFT_N:40,SPEED_BLUR:1},uniforms:{tDiffuse:{value:null},uSun:{value:new rt(.5,.5)},uSunVisible:{value:0},uShafts:{value:.9},uAspect:{value:16/9},uSpeed:{value:0},uDanger:{value:0}},vertexShader:W0,fragmentShader:`
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
}`},N3={uniforms:{tDiffuse:{value:null},uTexel:{value:new rt(1/1280,1/720)}},vertexShader:W0,fragmentShader:`
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
}`};function I3(n,t,e,i,s){n.toneMapping=za,n.toneMappingExposure=1;const r=new A3(n);r.addPass(new C3(t,e));const o=new qs(new rt(256,256),.35,.5,1.4);r.addPass(o);const a=new Au(L3);r.addPass(a);const c=new R3;r.addPass(c);let l=!1;const u=(g,p)=>{l=p,o.enabled=g.bloom&&!p,c.enabled=o.enabled,a.material.defines.SHAFT_N=p?Math.min(g.shafts,8):g.shafts,a.material.defines.SPEED_BLUR=g.speedBlur&&!p?1:0,a.material.needsUpdate=!0};u(s,!1);const f=new Au(N3);f.enabled=!1,r.addPass(f);const h=new P(i.x,i.y,i.z);let d=1;const m=new P,v=new P;return{render(){e.getWorldDirection(v),m.copy(h).multiplyScalar(1e4).add(e.position).project(e);const g=v.dot(h);a.uniforms.uSun.value.set(m.x*.5+.5,m.y*.5+.5),a.uniforms.uSunVisible.value=d*Math.max(0,Math.min(1,(g-.2)/.4)),r.render()},setSize(g,p){r.setSize(g,p),o.resolution.set(g/2,p/2),a.uniforms.uAspect.value=g/p;const M=n.getPixelRatio();f.uniforms.uTexel.value.set(1/(g*M),1/(p*M))},setPixelRatio(g){r.setPixelRatio(g)},setLite(){return l||!s.bloom&&s.shafts<=8&&!s.speedBlur?!1:(u(s,!0),!0)},togglePainterly(){return f.enabled=!f.enabled,f.enabled},painterly:()=>f.enabled,setSpeed(g){a.uniforms.uSpeed.value=g},setDanger(g){a.uniforms.uDanger.value=g},setSun(g,p){h.set(g.x,g.y,g.z),d=p}}}function D3(n,t){const e=new pw({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio,t)),e.setSize(n.clientWidth,n.clientHeight),e.info.autoReset=!1,n.appendChild(e.domElement);const i=new kx,s=new rn(60,n.clientWidth/n.clientHeight,.5,7e4),r=new Wm(16777215,2.4),o=new J_(16777215,16777215,1.3);return i.add(r,r.target,o),{renderer:e,scene:i,camera:s,sun:r,hemi:o}}const U3=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function F3(n){return`
uniform float uDusk;
uniform float uMorn;
${g0(n,"uDusk","uMorn")}
${Ya}
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
}`}function O3(n){const t=new ie({vertexShader:U3,fragmentShader:F3(n),uniforms:{uTime:{value:0},uDusk:{value:0},uMorn:{value:0}},side:Ye,depthWrite:!1,depthTest:!1,fog:!1}),e=new Jt(new Os(1e3,48,24),t);return e.renderOrder=-10,e.frustumCulled=!1,{mesh:e,update(i,s,r,o){e.position.copy(i.position),t.uniforms.uTime.value=s,t.uniforms.uDusk.value=r,t.uniforms.uMorn.value=o}}}function k3(){return new ie({vertexShader:`
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
}`,transparent:!0,blending:gn,depthWrite:!1})}function B3(){return new ie({vertexShader:`
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
}`,transparent:!0,blending:gn,depthWrite:!1})}const Ru=12,vp=new ct(1,.72,.28),z3=new ct(1,.86,.5);function xl(n,t){const e=new Xe(n,t,Ru);return e.count=0,e.frustumCulled=!1,e.renderOrder=6,e.setColorAt(0,new ct(0,0,0)),e}function H3(){const n=xl(new ch(.82,1,40),new je({transparent:!0,blending:gn,depthWrite:!1,fog:!1,side:be})),t=xl(new zn(2,2),B3()),e=xl(new cs(1,2),k3()),i={ring:n,flare:t,shell:e},s=[],r=new Dt,o=new Ae,a=new P,c=new P,l=new ct,u=new P(0,0,1),f=h=>{s.length>=Ru*3&&s.shift(),s.push(h)};return{mesh:n,star:t,shell:e,spawn(h,d,m){f({part:"ring",x:h,y:d,z:m,t:0,dur:.35,r0:.6,r1:3.4,color:vp}),f({part:"shell",x:h,y:d,z:m,t:0,dur:.45,r0:.4,r1:3.2,color:vp}),f({part:"flare",x:h,y:d,z:m,t:0,dur:.42,r0:.6,r1:3,color:z3})},update(h,d){const m={ring:0,flare:0,shell:0};for(let v=s.length-1;v>=0;v--){const g=s[v];if(g.t+=h,g.t>=g.dur||m[g.part]>=Ru){s.splice(v,1);continue}g.z+=d*h;const p=g.t/g.dur,M=g.r0+(g.r1-g.r0)*(1-(1-p)*(1-p)),y=(1-p)*(1-p)*1.1,x=g.part==="flare"?o.setFromAxisAngle(u,p*2.2):o.identity();r.compose(a.set(g.x,g.y,g.z),x,c.set(M,M,M));const _=i[g.part];_.setMatrixAt(m[g.part],r),_.setColorAt(m[g.part]++,l.copy(g.color).multiplyScalar(y))}for(const v of["ring","flare","shell"]){const g=i[v];g.count=m[v],g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0)}}}}const xp=4,_p=36,V3={rock:[new ct(.42,.33,.36),new ct(.3,.24,.28),new ct(.24,.3,.16)],cloth:[new ct(.8,.1,.08),new ct(.95,.66,.1),new ct(.5,.33,.2)],village:[new ct(.62,.22,.12),new ct(.55,.3,.2),new ct(.85,.7,.35)]},G3=()=>new ie({vertexShader:`
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
}`,transparent:!0,depthTest:!1,depthWrite:!1});function W3(){const n=new Xe(new zn(2,2),G3(),xp),t=new Xe(new cs(1,0),new hh,_p);for(const u of[n,t])u.count=0,u.frustumCulled=!1,u.setColorAt(0,new ct);n.renderOrder=8;const e=[],i=[];let s=0;const r=new Dt,o=new Ae,a=new P,c=new P,l=new ct;return{stars:n,chips:t,danger:()=>s,spawn(u,f,h,d,m){e.length>=xp&&e.shift(),e.push({x:u,y:f,z:h,t:0,dur:m?.42:.3,r0:m?1.4:.9,r1:m?5.2:3.2,seed:Math.random(),follow:!m});const v=m?22:10;for(let g=0;g<v;g++){i.length>=_p&&i.shift();const p=Math.random()*Math.PI*2,M=(m?7:5)+Math.random()*7,y=V3[d];i.push({x:u,y:f,z:h,t:0,life:.9+Math.random()*.6,size:(m?.22:.16)+Math.random()*(m?.38:.22),vx:Math.cos(p)*M,vy:Math.sin(p)*M*.8+4,vz:-(3+Math.random()*8),spin:new P(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),color:y[g%y.length]})}s=Math.max(s,m?1:.75)},update(u,f){s=Math.max(0,s-u*1.4);let h=0;for(let d=e.length-1;d>=0;d--){const m=e[d];m.t+=u;const v=m.t/m.dur;if(v>=1){e.splice(d,1);continue}m.follow&&(m.z+=f*u);const g=m.r0+(m.r1-m.r0)*(1-(1-v)**3);r.compose(a.set(m.x,m.y,m.z),o.identity(),c.set(g,g,g)),n.setMatrixAt(h,r),n.setColorAt(h++,l.setRGB(Math.min(1,(1-v)*1.6),m.seed,v))}n.count=h,h=0;for(let d=i.length-1;d>=0;d--){const m=i[d];if(m.t+=u,m.t>=m.life){i.splice(d,1);continue}m.vy-=16*u,m.x+=m.vx*u,m.y+=m.vy*u,m.z+=m.vz*u;const v=m.size*Math.min(1,(m.life-m.t)/.25);o.setFromAxisAngle(m.spin,m.t*9),r.compose(a.set(m.x,m.y,m.z),o,c.set(v,v*.7,v*1.2)),t.setMatrixAt(h,r),t.setColorAt(h++,m.color)}t.count=h;for(const d of[n,t])d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0)}}}const In=90,X3=1.4,q3=`
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
}`,K3=`
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
}`;function Y3(){const n=[0,1].map(()=>({p:Array.from({length:In},()=>new P),age:new Float32Array(In).fill(1)})),t=2*In*2,e=new Float32Array(t*3),i=new Float32Array(t).fill(1),s=new Float32Array(t),r=[];for(let h=0;h<2;h++)for(let d=0;d<In;d++){const m=(h*In+d)*2;s[m]=-1,s[m+1]=1,d<In-1&&r.push(m,m+1,m+2,m+1,m+3,m+2)}const o=new Qt;o.setAttribute("position",new Nt(e,3)),o.setAttribute("aAge",new Nt(i,1)),o.setAttribute("aSide",new Nt(s,1)),o.setIndex(r);const a=new ie({vertexShader:q3,fragmentShader:K3,uniforms:xn.merge([lt.fog,{uColor:{value:[1,.36,.32]}}]),transparent:!0,depthWrite:!1,side:be,fog:!0}),c=new Jt(o,a);c.frustumCulled=!1,c.renderOrder=3;const l=new P,u=new P,f=new P;return{points:c,update(h,d,m,v){n.forEach((g,p)=>{for(let M=0;M<In;M++)g.age[M]=Math.min(1,g.age[M]+d/X3);if(m&&d>0){const M=g.p.pop();g.p.unshift(M.copy(h[p])),g.age.copyWithin(1,0,In-1),g.age[0]=0}for(let M=0;M<In;M++){const y=g.p[M],x=g.p[Math.min(In-1,M+1)];l.subVectors(y,x),l.lengthSq()<1e-6&&l.set(0,0,1),u.subVectors(v,y),f.crossVectors(l,u).normalize();const _=.06+.5*g.age[M],S=(p*In+M)*2;e.set([y.x-f.x*_,y.y-f.y*_,y.z-f.z*_],S*3),e.set([y.x+f.x*_,y.y+f.y*_,y.z+f.z*_],(S+1)*3),i[S]=i[S+1]=g.age[M]}}),o.getAttribute("position").needsUpdate=!0,o.getAttribute("aAge").needsUpdate=!0}}}const Qi=120,$3=40,Z3=120,J3=9,Q3=30,_l=.11;function j3(){const n=new Float32Array(Qi*3),t=new Float32Array(Qi*6),e=new Qt;e.setAttribute("position",new Nt(t,3));const i=new Float32Array(Qi*6);for(let h=0;h<Qi;h++)i.set([1,1,1,0,0,0],h*6);e.setAttribute("color",new Nt(i,3));const s=new th({color:16773590,vertexColors:!0,transparent:!0,opacity:0,blending:gn,depthWrite:!1,fog:!1}),r=new wm(e,s);r.frustumCulled=!1,r.renderOrder=5;let o=!1;const a=new P,c=new P,l=new P,u=new P,f=(h,d,m)=>{const v=$3+Math.random()*Z3*m,g=J3+(1-Math.random()**2)*Q3,p=Math.random()*Math.PI*2;u.copy(d).addScaledVector(a,v).addScaledVector(c,Math.cos(p)*g).addScaledVector(l,Math.sin(p)*g),n[h*3]=u.x,n[h*3+1]=u.y,n[h*3+2]=u.z};return{object:r,update(h,d,m){if(s.opacity=Math.min(.5,.42*m),r.visible=m>.02,e.setDrawRange(0,2*Math.round(Qi*Math.min(1,m))),!r.visible)return;const v=d.length();if(v<1)return;a.copy(d).divideScalar(v),c.set(a.z,0,-a.x).normalize(),l.crossVectors(c,a);const g=h.position;if(!o){for(let p=0;p<Qi;p++)f(p,g,1);o=!0}for(let p=0;p<Qi;p++){u.set(n[p*3]-g.x,n[p*3+1]-g.y,n[p*3+2]-g.z),(u.dot(a)<-4||u.lengthSq()>36100)&&f(p,g,1);const y=p*6,x=n[p*3],_=n[p*3+1],S=n[p*3+2];t[y]=x,t[y+1]=_,t[y+2]=S,t[y+3]=x-d.x*_l,t[y+4]=_-d.y*_l,t[y+5]=S-d.z*_l}e.attributes.position.needsUpdate=!0}}}const vr=256,Mp=5,tR=-2e3,eR=400,nR=`
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
}`,iR=`
#include <fog_pars_fragment>
uniform float uFar;
varying float vTop;
varying float vY;
void main() {
  float below = vTop - vY;
  // Màu lớp theo giờ: lớp gần xanh rừng tối, lớp xa tan vào sương — đọc ATM_* nên trời tối thì núi tối theo.
  vec3 nearCol = mix(vec3(0.012, 0.042, 0.025), vec3(0.004, 0.006, 0.02), smoothstep(0.4, 1.0, atmT()));
  vec3 uColor = mix(nearCol, ATM_HAZE_AWAY, uFar);
  vec3 uFoot = mix(ATM_HAZE_AWAY, vec3(1.0), 0.15);
  vec3 col = mix(uColor, uFoot, smoothstep(0.0, 700.0, below) * 0.7);
  // Viền mép trên: sống núi phía mặt trời sáng rực (backlight), phía kia chỉ hơi sáng.
  vec3 dir = normalize(vFogWorld - cameraPosition);
  float edge = 1.0 - smoothstep(0.0, 30.0, below);
  col += ATM_GLOW * edge * (0.15 + 1.4 * pow(max(dot(dir, ATM_SUN_DIR), 0.0), 4.0));
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;class sR{rings=[];next=0;heightAt;constructor(t,e,i){this.heightAt=e;for(let s=0;s<i.length-1;s++){const r=s/(i.length-2),o=new ie({vertexShader:nR,fragmentShader:iR,uniforms:xn.merge([lt.fog,{uFar:{value:.25+.6*r}}]),fog:!0}),a=new Jt(new Qt,o);a.frustumCulled=!1,t.add(a),this.rings.push({inner:i[s],outer:i[s+1],mesh:a,anchorX:NaN,anchorZ:NaN})}}update(t,e,i=!1){for(let s=0;s<this.rings.length;s++){const r=this.rings[this.next];if(this.next=(this.next+1)%this.rings.length,(Math.hypot(t-r.anchorX,e-r.anchorZ)>eR||Number.isNaN(r.anchorX))&&(this.rebuild(r,t,e),!i))return}}rebuild(t,e,i){const s=new Float32Array((vr+1)*2*3),r=new Float32Array((vr+1)*2);for(let c=0;c<=vr;c++){const l=c/vr*Math.PI*2,u=Math.sin(l),f=Math.cos(l);let h=-1/0;for(let m=0;m<Mp;m++){const v=t.inner+(t.outer-t.inner)*m/Mp;h=Math.max(h,this.heightAt(e+u*v,i+f*v))}const d=t.inner;s.set([u*d,h,f*d,u*d,tR,f*d],c*6),r[c*2]=h,r[c*2+1]=h}const o=[];for(let c=0;c<vr;c++){const l=c*2;o.push(l,l+2,l+1,l+2,l+3,l+1)}const a=new Qt;a.setAttribute("position",new Nt(s,3)),a.setAttribute("aTop",new Nt(r,1)),a.setIndex(o),t.mesh.geometry.dispose(),t.mesh.geometry=a,t.mesh.position.set(e,0,i),t.anchorX=e,t.anchorZ=i}}const xr={h:0,s:0,lat:0,vil:0};function rR(n,t,e,i,s){const r=i/s,o=s+3,a=new Float32Array(o*o),c=new Float32Array(o*o*3);for(let _=0;_<o;_++)for(let S=0;S<o;S++)n(t+(S-1)*r,e+(_-1)*r,xr),a[_*o+S]=xr.h,c.set([xr.s,xr.lat,xr.vil],(_*o+S)*3);const l=(_,S)=>a[(S+1)*o+(_+1)],u=s+1,f=s*4,h=u*u+f,d=new Float32Array(h*3),m=new Float32Array(h*3),v=new Float32Array(h*3),g=(_,S,T,b)=>{v.set(c.subarray(((T+1)*o+(S+1))*3,((T+1)*o+(S+2))*3),_*3);const w=(l(S+1,T)-l(S-1,T))/(2*r),R=(l(S,T+1)-l(S,T-1))/(2*r),C=1/Math.hypot(w,1,R);d[_*3]=S*r,d[_*3+1]=l(S,T)-b,d[_*3+2]=T*r,m[_*3]=-w*C,m[_*3+1]=C,m[_*3+2]=-R*C};for(let _=0;_<u;_++)for(let S=0;S<u;S++)g(_*u+S,S,_,0);const p=[];for(let _=0;_<s;_++)p.push(_);for(let _=0;_<s;_++)p.push(_*u+s);for(let _=s;_>0;_--)p.push(s*u+_);for(let _=s;_>0;_--)p.push(_*u);const M=r*3+25;p.forEach((_,S)=>g(u*u+S,_%u,Math.floor(_/u),M));const y=[];for(let _=0;_<s;_++)for(let S=0;S<s;S++){const T=_*u+S;y.push(T,T+u,T+1,T+1,T+u,T+u+1)}for(let _=0;_<f;_++){const S=p[_],T=p[(_+1)%f],b=u*u+_,w=u*u+(_+1)%f;y.push(S,T,b,T,w,b)}const x=new Qt;return x.setAttribute("position",new Nt(d,3)),x.setAttribute("normal",new Nt(m,3)),x.setAttribute("aTrack",new Nt(v,3)),x.setIndex(h>65535?new Nt(new Uint32Array(y),1):new Nt(new Uint16Array(y),1)),x.computeBoundingSphere(),x}class oR{cache=new Map;shown=new Set;wanted=[];wantedSig="";scene;sample;material;cfg;constructor(t,e,i,s){this.scene=t,this.sample=e,this.material=i,this.cfg=s}update(t,e,i=!1){this.computeWanted(t,e);const s=performance.now();for(const r of this.wanted)if(!this.cache.has(r.key)){if(!i&&performance.now()-s>this.cfg.buildBudgetMs)return;this.cache.set(r.key,this.build(r))}this.shown.size===this.wanted.length&&this.wanted.every(r=>this.shown.has(r.key))||this.swap()}stats(){let t=0;for(const s of this.shown)t+=this.cache.get(s)?.geometry.getAttribute("position").count??0;const e=this.wanted.filter(s=>!this.cache.has(s.key)).length,i=this.cfg.baseSize*2**this.cfg.levels;return{visible:this.shown.size,pending:e,vertices:t,reach:i}}computeWanted(t,e){const i=[];for(let r=0;r<this.cfg.levels;r++){const o=this.cfg.baseSize*2**r,a=Math.floor(t/(2*o)),c=Math.floor(e/(2*o)),l=Math.floor(t/o),u=Math.floor(e/o);for(let f=2*c-2;f<=2*c+3;f++)for(let h=2*a-2;h<=2*a+3;h++)r>0&&Math.abs(h-l)<=1&&Math.abs(f-u)<=1||i.push({key:`${r}:${h}:${f}`,level:r,ix:h,iz:f})}const s=i.map(r=>r.key).join("|");s!==this.wantedSig&&(this.wantedSig=s,this.wanted=i)}build(t){const e=this.cfg.baseSize*2**t.level,i=t.ix*e,s=t.iz*e,r=t.level>=2?this.cfg.farSegs:this.cfg.segs,o=new Jt(rR(this.sample,i,s,e,r),this.material);return o.position.set(i,0,s),o.matrixAutoUpdate=!1,o.updateMatrix(),o}swap(){const t=new Set(this.wanted.map(e=>e.key));for(const e of this.shown)t.has(e)||this.scene.remove(this.cache.get(e));for(const e of t)this.shown.has(e)||this.scene.add(this.cache.get(e));for(const[e,i]of this.cache)t.has(e)||(i.geometry.dispose(),this.cache.delete(e));this.shown=t}}const aR=`
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
    vec3 bloom = mix(srgb(mix(HG_BUCKWHEAT, HG_SPROUT, 0.12)), srgb(mix(HG_BUCKWHEAT_DEEP, HG_SPROUT, 0.12)), step(0.58, id));
    bloom = mix(bloom, srgb(HG_SPROUT), step(0.84, id)) * (0.88 + 0.2 * gnNoise(xz / 140.0));
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
`,cR=`
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
vec2 riverMask(float s, float lat, float rfw, float floorK) {
  float rl = abs(lat - 6.0 * sin(s / 140.0) - 2.5 * sin(s / 47.0 + 1.7));
  float hw = 3.2 + 1.6 * gnNoise(vec2(s / 80.0, 7.0));
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
  vec3 deep = srgb(mix(vec3(0.06, 0.14, 0.15), vec3(0.16, 0.52, 0.5), hg)) * (ATM_SKY_AMBIENT + ATM_SUN_LIGHT * 0.35);
  float glint = pow(max(dot(reflect(-V, nr), ATM_SUN_DIR), 0.0), 60.0);
  return mix(deep, sky, fres) + ATM_SUN_LIGHT * glint * 2.5 + pools * 0.6;
}
`,lR=`
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
}`,uR=`
#include <fog_pars_fragment>
${Ya}
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vTrack;
uniform float uMaxDist;

${em}
${cR}
${aR}
${GA}

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
  vec2 river = riverMask(ts, lat, fwidth(lat), (1.0 - smoothstep(0.02, 0.05, slope)) * (1.0 - vil) * (1.0 - smoothstep(600.0, 900.0, dist)));
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
}`;function hR(n=1e9,t=!1){return new ie({vertexShader:lR,fragmentShader:uR,defines:t?{TERRAIN_LITE:1}:{},uniforms:{...xn.merge([lt.fog,{uMaxDist:{value:n}}]),...Ia,uRegionHg:ka},fog:!0})}const fR=6e3,dR=[6500,9e3,13e3,18e3,25e3,35e3,48e3];function pR(n,t){const e=new oR(n,h0,hR(fR,t.lite),{baseSize:t.baseSize,segs:t.segs,farSegs:t.farSegs,levels:t.levels,buildBudgetMs:5}),i=new sR(n,Ke,dR);return{update(s,r){e.update(s.x,s.z,r),i.update(s.x,s.z,r)},statsLine(){const s=e.stats();return`địa hình ${s.visible} ô (chờ ${s.pending}) · ${(s.vertices/1e3).toFixed(0)}k đỉnh`}}}const yp=16,Sp=3,$o=1.8,bp=2.2,ui={x:0,v:0};function mR(n,t,e,i){ui.x=0,ui.v=0;for(const s of n.obstacles){const r=Vi[s.kind],o=s.z-t;if(o+r.halfZ+1<0||o-r.halfZ>yp)continue;const a=Math.min(1,Math.max(0,1-(o-r.halfZ)/yp)),c=mn(s.lane);let l=0,u=0;if(s.kind==="ridge")u=Math.max(0,r.hi+Sp-i);else if(s.kind==="bridge")i>r.lo-$o&&i<r.hi+$o&&(u=n.v<r.lo?r.lo-$o-i:r.hi+$o-i);else if(Math.abs(e-c)<r.halfX+bp){const f=n.x-c;Math.abs(f)>=r.halfX?l=c+Math.sign(f)*(r.halfX+bp)-e:s.kind==="spike"&&(u=Math.max(0,r.hi+Sp-i))}u>0?ui.v=Math.max(ui.v,u*a):u<0&&(ui.v=Math.min(ui.v,u*a)),Math.abs(l*a)>Math.abs(ui.x)&&(ui.x=l*a)}return ui}function gR(n,t,e){const i=Math.sin(e),s=Math.cos(e);return Math.max(Ke(n,t),Ke(n+4*i,t+4*s),Ke(n+8*i,t+8*s))}const vR={back:7.5,up:2.6,fov:58,look:34,lookDown:3.6},xR={back:11,up:4.5,fov:70,look:60,lookDown:5},_R={back:6.5,up:2.2,fov:64,look:40,lookDown:4},wp={back:13,up:4.5,fov:62,look:60,lookDown:6};function Ml(n,t,e){const i=(s,r)=>s+(r-s)*e;return{back:i(n.back,t.back),up:i(n.up,t.up),fov:i(n.fov,t.fov),look:i(n.look,t.look),lookDown:i(n.lookDown,t.lookDown)}}class MR{rig={...wp};x=0;roll=0;trickRoll=0;s=0;shakeA=0;fv=.45;fl=.35;lag=0;mv=0;g=1;clrX=0;clrV=0;crashK=0;tmp={x:0,y:0,z:0};camera;aspect;lensKey="";viewScale=1;constructor(t){this.camera=t,this.aspect=Number.isFinite(t.aspect)&&t.aspect>0?t.aspect:16/9}setAspect(t){Number.isFinite(t)&&t>0&&(this.aspect=t,this.applyLens())}portrait(){return Math.min(1,Math.max(0,(1-this.aspect)/.25))}shake(t){this.shakeA=Math.max(this.shakeA,t)}update(t,e,i,s,r=!1){const o=Math.min(1,Math.max(0,(t.speed-42)/22)),a=t.mode==="run"?Op(t.z):0,c=H=>r?1:1-Math.exp(-i*H),l=a>0?Math.max(.4,Math.min(2,Ig(t.z,t.speed))):1;this.g+=(1+(l-1)*a-this.g)*c(3);const u=Math.max(0,this.g-1),f=Math.max(0,1-this.g),h=this.portrait();let d=t.mode==="ready"?wp:Ml(Ml(vR,_R,Ng(t.z)),xR,Lg(t.z)*(1-.8*h));d={...d,fov:d.fov+10*o+.5*Math.max(0,t.surge)+.34*t.tailwind+(t.vert==="dive"?4:0)+(t.thermalT>0?8:0)-2.5*u+5*f,up:d.up-.8*u},t.thermalV>1&&(d={...d,up:d.up+1.5,lookDown:d.lookDown+2}),this.rig=Ml(this.rig,d,c(2.4)),this.mv+=(t.v-t.thermalV-t.windLift-this.mv)*c(9+5*h);const m=this.mv,v=t.low&&t.vert==="cruise";this.fv+=((v?1:t.vert==="dive"?.6+.2*h:.45)-this.fv)*c(v?3:10),this.fl+=((v?1:t.vert==="dive"?.9:.35)-this.fl)*c(v?3:10);const g=t.speed*gi(t.z);this.lag+=(5*(1-.7*h)*Math.tanh(-g/40)*a-this.lag)*c(3),this.x+=(t.x*(.55+.3*h)-this.x)*(r?1:1-Math.exp(-i*(6+4*h)));const p=1.6+20*(1-h);this.x=Math.min(t.x+p,Math.max(t.x-p,this.x));const M=t.mode==="run"?Math.max(-.3,Math.min(.3,.45*Fp(t.z,t.speed))):0;this.roll+=(M-e*.0022-this.roll)*(r?1:1-Math.exp(-i*3)),this.shakeA=Math.max(0,this.shakeA-i*2.5);const y=t.mode==="crash"||t.mode==="over",x=this.rig.back*(1-.12*h)-.3*h*Math.max(0,this.rig.back-7.5),_=t.z-x*(y?1.6:1);this.s=_;const S=this.camera,T=this.shakeA,b=Math.max(0,Pe(_)-Pe(t.z))*.7*h,w=this.rig.up+.6*h-b+t.thermalV*.8+t.windLift*.85+m*this.fv+this.lag+(y?4:0),R=mR(t,_,this.x,w);this.clrX=Math.abs(R.x)>=Math.abs(this.clrX)?R.x:this.clrX+(R.x-this.clrX)*c(5),this.clrV=Math.abs(R.v)>=Math.abs(this.clrV)?R.v:this.clrV+(R.v-this.clrV)*c(5);const C=Se(_,this.x+this.clrX,w+this.clrV,this.tmp);S.position.set(C.x+T*Math.sin(s*37.1),Math.max(C.y,gR(C.x,C.z,En(_))+3)+T*Math.sin(s*41.3+2),C.z),this.crashK+=((y?1:0)-this.crashK)*c(4);const N=t.z+this.rig.look*(1-.75*this.crashK),D=.6*t.speed,I=(Pe(N+D)-Pe(N)-gi(N)*D)*a,U=un(t.z),z=Math.tan(.14)*this.rig.look*Tp(U,1080,1180)*(1-Tp(U,1400,1480))*a;Se(N,t.x*(.4+.2*h),t.thermalV*.8+t.windLift*.85+m*this.fl+I-this.rig.lookDown-z-B0(t)*this.crashK,this.tmp),S.up.set(0,1,0),S.lookAt(this.tmp.x,this.tmp.y,this.tmp.z),S.rotateZ(Math.max(-.6,Math.min(.6,this.roll+this.trickRoll))),this.applyLens()}applyLens(){const t=this.camera,e=this.aspect,i=this.portrait();let s=this.rig.fov,r=1;if(e<1){const a=Math.min(64+60*(1-i),this.rig.fov*(1-.15*i))*Math.PI/180;r=1+.1*i,s=Math.min(118,2*Math.atan(Math.tan(a/2)*r/e)*180/Math.PI)}const o=`${s.toFixed(2)}|${r.toFixed(3)}|${e.toFixed(4)}`;o!==this.lensKey&&(this.lensKey=o,this.viewScale=r,t.fov=s,r>1.001?t.setViewOffset(e,r,0,0,e,1):(t.clearViewOffset(),t.aspect=e,t.updateProjectionMatrix()))}}function Tp(n,t,e){const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)}const yl=new ct;function yR(n,t,e,i){let s=i;return{sunDir:()=>s,apply(r,o){kE(n,r,o),s=NE(i,r,o);const a=se(.55,1,r);t.position.set(s.x*1e3,Math.max(s.y,.35*a)*1e3,s.z*1e3),t.color.copy(el("sunLight",r,yl,o)),t.intensity=2.4*(1-.7*a),e.color.copy(el("skyAmbient",r,yl,o)),e.groundColor.copy(el("bounce",r,yl,o)),e.intensity=1.3*(1+.35*a)}}}const Zo={x:-.32,y:.1,z:1};function SR(n,t){const{renderer:e,scene:i,camera:s,sun:r,hemi:o}=D3(n,t.maxDpr);OE(i,Zo);const a=yR(i,r,o,Zo),c=O3(Zo),l=pR(i,t.terrain),u=eA(t.foliage),f=kA(t.ambient),h=VA(),d=qE(t.ambient),m=HE(t.name!=="high"),v=LE(),g=b2(),p=u2(t.ambient),M=R2();eg(M3(M,t.name==="high"));const y=N2(),x=Y3(),_=Tw(t.name==="low"),S=S3(),T=j3(),b=vA(),w=lA(),R=hA(),C=H3(),N=W3(),D=ZA();i.add(c.mesh,u.group,f.group,h.mesh,v.group,m.mesh,d.mesh,g.group,p.group,M.root,x.points,S.mesh,T.object,b.mesh,w.group,R.mesh,C.mesh,C.star,C.shell,N.stars,N.chips,D.points,_.mesh);const I=I3(e,i,s,Zo,t.post),U=new MR(s);WA(t.ambient>=1?12:t.ambient>=.7?9:6);const z=[new P,new P],H=[new P,new P],Q=new P,W=new rt,Y={};let tt=null;return{renderer:e,scene:i,camera:s,post:I,cam:U,lanterns:p,flashes:C,impacts:N,world:l,ghosts:w,trick:y.trick,present(St,ut,kt,zt,Wt=!1){const{dusk:q,morn:J}=zt;St.mode==="crash"||St.mode==="over"?tt??=St.z:tt=null;let it=St;tt!==null&&St.z>tt+.4&&(it=Object.assign(Y,St),it.z=tt+.4),a.apply(q,J),y.apply(M,it,ut,kt),R.update(M.root.position,it.stunT/st.stunTime,ut,s),U.trickRoll=y.camRoll(),U.update(it,y.lateralSpeed(),kt,ut,Wt),c.update(s,ut,q,J),l.update(s.position,Wt),u.update(it.z,q),f.update(it.z,q),h.update(it.z),XA(),D.update(it,ut,q,U.s),d.update(it.z),m.update(s,ut,U.s),yE(M.root.position.x,M.root.position.z,En(it.z),ut),C.update(kt,it.mode==="run"?it.speed:0),N.update(kt,it.mode==="run"?it.speed:0);const ot=it.mode==="run"&&it.hp===1?.14+.08*Math.sin(ut*5.5):0;I.setDanger(Math.max(N.danger(),ot,it.mode==="crash"?.55:it.mode==="over"?.25:0)),g.update(it,ut,q),v.update(it.z),p.update(it,ut,kt,q,U.s),qA(Math.min(1,Math.max(0,(q-.45)/.4))),b.update(it,ut,U.s),M.root.updateMatrixWorld(),M.feet.forEach((me,Re)=>me.getWorldPosition(z[Re])),x.update(z,kt,it.mode==="run"||it.mode==="ready",s.position),M.ankles.forEach((me,Re)=>me.getWorldPosition(H[Re])),_.update(it,H,ut,kt,s.position);const Ht=it.mode==="run"||it.mode==="ready";S.update(M.tips,ut,Ht,Math.min(1,Math.max(0,(it.speed-40)/26)+(it.vert==="dive"?.4:0)),s.position);const xe=it.stunT/st.stunTime;G0.value=Math.max(xe*xe*(.6+.4*Math.sin(ut*28)),it.mode==="run"&&it.hp===1?.18+.12*Math.sin(ut*5.5):0);const Ot=En(it.z);Q.set(Math.sin(Ot),gi(it.z),Math.cos(Ot)).normalize().multiplyScalar(it.speed);const Ut=Math.min(1,Math.max(0,(it.speed-40)/26)),re=it.mode==="run"?Math.max(0,it.surge)/12+it.tailwind/16:0,jt=1-.45*Math.min(1,Math.max(0,(q-.5)/.4));return T.update(s,Q,it.mode==="run"?jt*(.1+.4*Ut+.55*re+(it.thermalT>0?.35:0)):0),I.setSpeed(it.mode==="run"?.05*Ut+.16*re+(it.vert==="dive"?.04:0)+(it.thermalT>0?.1:0):0),I.setSun(a.sunDir(),1-Math.min(1,q*1.6)),p.setViewport(e.getDrawingBufferSize(W).y*U.viewScale,s.fov),w.setViewport(W.y*U.viewScale,s.fov),D.setViewport(W.y*U.viewScale,s.fov),Math.min(1.4,Ut+.5*re)},resize(St,ut){e.setSize(St,ut),I.setSize(St,ut),U.setAspect(St/ut)}}}function bR(){const n={z:0,x:0,v:0,thermalV:0,windLift:0},t={};return{capture(e){n.z=e.z,n.x=e.x,n.v=e.v,n.thermalV=e.thermalV,n.windLift=e.windLift},view(e,i){if(i>=1)return e;const s=(r,o)=>r+(o-r)*i;return Object.assign(t,e),t.z=s(n.z,e.z),t.x=s(n.x,e.x),t.v=s(n.v,e.v),t.thermalV=s(n.thermalV,e.thermalV),t.windLift=s(n.windLift,e.windLift),t}}}const X0="skyrun.tut",wR=.7,TR=.45,ER=.3,AR=.15;function RR(){try{return new Set(JSON.parse(localStorage.getItem(X0)??"[]"))}catch{return new Set}}function CR(n){const t=n.obstacles.filter(l=>!l.passed&&l.z-n.z>-Vi[l.kind].halfZ);if(!t.length)return null;const e=t.reduce((l,u)=>u.z<l.z?u:l),i=t.filter(l=>l.row===e.row),s=e.kind;if(n.thermalV>8&&s!=="pillar")return null;if(i.some(l=>l.kind==="bridge"))return n.vert==="dive"||n.low?null:{lesson:"down",kind:"bridge",accept:["down"],row:e.row,z:e.z};if(i.some(l=>l.kind==="ridge"))return n.vert==="flare"?null:{lesson:"up",kind:"ridge",accept:["up"],row:e.row,z:e.z};const r=new Set(i.map(l=>l.lane));if(!r.has(n.lane))return null;const o=i.filter(l=>l.lane===n.lane),a=o.every(l=>l.kind==="spike");if(a&&n.vert==="flare")return null;const c=[];return[-1,0,1].some(l=>l<n.lane&&!r.has(l))&&c.push("left"),[-1,0,1].some(l=>l>n.lane&&!r.has(l))&&c.push("right"),a&&c.push("up"),{lesson:c.length===1&&a?"up":"lane",kind:o[0].kind,accept:c,row:e.row,z:e.z}}const Ep={left:"←",right:"→",up:"↑",down:"↓"};function PR(n,t){const e=t?new Set:RR(),i=matchMedia("(pointer: coarse)").matches,s=document.createElement("div");s.className="tut",n.appendChild(s);let r=null,o=1;const a=l=>{const u=l.accept.filter(g=>l.lesson!=="lane"||g!=="up"),f=zi(l.z),h=l.kind==="bridge"?f?"chui qua cổng làng":"chui dưới cầu":l.kind==="ridge"?f?"vọt qua mái đình":"vọt qua sống đá":l.lesson==="up"?f?"vọt qua mái nhà":"vọt qua mỏm đá":f?"né nhà":"né cột đá",d=u.length===1?u[0]==="left"?"sang trái":"sang phải":"sang trái / phải",m=l.lesson==="lane"?`ngón ${d}`:l.lesson==="up"?"lên":"xuống",v=i?`${l.lesson==="lane"?"Kéo":"Vuốt"} ${m} để ${h}`:`Bấm ${u.map(g=>Ep[g]).join(" / ")} để ${h}`;s.innerHTML=`<div class="tut-arrows">${u.map(g=>`<span class="tut-arrow ${g}">${Ep[g]}</span>`).join("")}</div><div class="tut-text">${v}</div>`,s.classList.add("on")},c=l=>{e.add(l);try{localStorage.setItem(X0,JSON.stringify([...e]))}catch{}};return{frozen:()=>r!==null&&o===0,update(l,u){if(l.mode!=="run"||e.size===3)return r=null,s.classList.remove("on"),o=1,1;const f=CR(l);if(r&&(!f||f.row!==r.row)&&(c(r.lesson),r=null,s.classList.remove("on")),!r&&f&&!e.has(f.lesson)){const m=(l.obstacles.find(v=>v.row===f.row).z-l.z)/l.speed;m<=wR&&m>=TR&&(r=f,a(f))}else r&&f&&(r=f);const h=r!==null&&l.buffered!==null&&r.accept.includes(l.buffered);return o=r&&!h?Math.max(0,o-u/ER):Math.min(1,o+u/AR),o},offer(l){const u=r?l.find(f=>r.accept.includes(f)):void 0;return u?(o=.4,u):null}}}const Fi=1/60;function LR(n){const t=new URLSearchParams(location.search),e=Ow(t),i=SR(n,e),{renderer:s,post:r}=i,o=yv(),a=$w(n),c=Ew(n,i.cam,i.lanterns,o,a,i.flashes,i.impacts,i.camera),l=nT(n,()=>v.mode==="run"&&!w.paused(),()=>v.steerX),u=Gw(Number(t.get("seed")??0));let f=u();const h=_v(t);let d=t.get("auto")==="1";const m=t.has("alt");let v=Xh(f.seed,m);v.z=Number(t.get("z")??0);let g=0,p=null;const M=bR();M.capture(v);const y=PR(n,t.get("tut")==="1"),x=(U,z=!1,H=1)=>{const Q=h.at(v.z),W=M.view(v,H),Y=i.present(W,g-Fi*(1-H),U,Q,z);T.present(v,W,H,U),a.update(v,Q),o.update(Y,v.mode==="run",Q)},_=()=>{v.mode==="run"||v.mode==="crash"||(v.mode==="over"&&(f=u()),v=Xh(f.seed,m),v.z=Number(t.get("z")??0),M.capture(v),x(0,!0),nv(v),T.runStart(v,f.route),p=null,o.runStart(),S.hide(),a.setVisible(!0))},S=tE(n,_),T=qT({root:n,params:t,hud:a,screens:S,view:i.ghosts,camera:i.camera,route:f.route,quality:()=>({tier:e.name,scale:I.scale}),rv:m?2:e0}),b=aE(n,o),w=YT(n,b.el,matchMedia("(pointer: coarse)").matches);sE(n,b,o,i.ghosts,w),l.onAction(()=>{w.paused()?w.resume():S.visible()&&S.tapReady()&&_()}),l.onKey("KeyM",()=>(o.toggleSfx(),b.sync())),l.onKey("KeyN",()=>(o.toggleMusic(),b.sync())),l.onKey("KeyH",()=>a.setVisible(n.querySelector(".hud.hidden")!==null)),l.onTrick(i.trick),S.showTitle(),a.setVisible(!1);const R=U=>{M.capture(v),sv(v,d?xg(v):U,l.holdDown(),Fi,d?null:l.steer()),T.afterStep(v,d),c.handle(v.events,v);for(const z of v.events)z.type==="crash"&&(p=z.kind);g+=Fi,v.mode==="over"&&!S.visible()&&(o.over(S.showOver(v,p)),T.runOver(v,p),a.setVisible(!1))};let C=0;const N=U=>{w.setRunning(v.mode==="run");const z=(v.mode==="crash"&&v.crashT<.9?.35:1)*w.factor(U)*(d?1:y.update(v,U));if(y.frozen()&&!w.paused()){const H=l.take(),Q=l.steer(),W=Q===null?v.lane:Vp(v.lane,Q),Y=y.offer(W!==v.lane?[...H,W<v.lane?"left":"right"]:H);Y&&R(H.includes(Y)?[Y]:[])}for(C+=U*z;C>=Fi;)R(l.take()),C-=Fi;x(U*z,!1,C/Fi)},D=()=>i.resize(n.clientWidth,n.clientHeight);window.addEventListener("resize",D),D(),x(0,!0),vw(s,{state:()=>v,advance(U){for(let z=0;z<U/Fi;z++)R(l.take()),x(Fi)},play(U,z=60){for(let H=0;H<U*z;H++)N(1/z)},autopilot(U){d=U},jump(U){v.z=U,v.nextChunkZ=U+200,v.obstacles=[],v.pickups=[],M.capture(v),x(0,!0)},dusk:h.forceDusk,clock:h.forceU,render:()=>{x(0),r.render()},bench(U){const z=s.getContext(),H=new Uint8Array(4),Q=performance.now();for(let tt=0;tt<U;tt++)s.info.reset(),r.render(),z.readPixels(0,0,1,1,z.RGBA,z.UNSIGNED_BYTE,H);const{geometries:W,textures:Y}=s.info.memory;return{msPerFrame:(performance.now()-Q)/U,calls:s.info.render.calls,triangles:s.info.render.triangles,geometries:W,textures:Y,programs:s.info.programs?.length??0}}},i);const I=zw({renderer:s,post:r,tier:e,resize:D,tick:N,stats:t.has("stats")?U=>a.setStats(U):null,worldLine:()=>i.world.statsLine()});window.__skyrunQuality={tier:e,governor:I}}const q0=gv(new URLSearchParams(location.search).get("map"));mv(q0);document.title=`Sky Run · ${Qp[q0]}`;LR(document.getElementById("app"));ig();
