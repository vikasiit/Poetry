/* ====== यहाँ अपना नाम और social links बदलें ====== */
const SITE={name:"आपका नाम",title:"Metaphors Mein Fasa Hua",instagram:"",youtube:"",linkedin:""};
/* ================================================= */
const $=(s,r=document)=>r.querySelector(s),enc=encodeURIComponent,D={},R={};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const page=document.body.dataset.page,today=new Date().toISOString().slice(0,10);
const live=a=>(a||[]).filter(x=>!x.draft&&(x.date||"")<=today).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
const j=u=>fetch(u).then(r=>r.json()).catch(()=>[]);
const fmt=d=>d?new Date(d+"T00:00").toLocaleDateString("hi-IN",{day:"numeric",month:"long",year:"numeric"}):"";
const lines=p=>Array.isArray(p.content)?p.content:String(p.content||"").split("\n");
const stz=p=>{const o=[[]];lines(p).forEach(l=>l.trim()?o.at(-1).push(l):o.push([]));return o.filter(s=>s.length)};
const body=p=>stz(p).map(s=>`<p class="st">${s.map(esc).join("<br>")}</p>`).join("");
const imgs=p=>p.images||(p.image?[p.image]:[]);
const ex=p=>p.excerpt||lines(p).filter(l=>l.trim()).slice(0,2).join(" ");
const hay=p=>[p.title,p.category,(p.tags||[]).join(" "),lines(p).join(" ")].join(" ").toLowerCase();
const link=p=>"poems.html?p="+enc(p.title);
const card=p=>`<a class="card" href="${link(p)}">${imgs(p)[0]?`<img src="${esc(imgs(p)[0])}" alt="${esc(p.title)}" loading="lazy">`:""}<div><small>${fmt(p.date)} · ${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(ex(p))}</p><span>पढ़ें →</span></div></a>`;
const chips=(cats,c,lab=k=>k)=>["",...cats].map(k=>`<button class="${k===c?"on":""}" data-k="${esc(k)}">${k?lab(k):"सभी"}</button>`).join("");
const PC=[["फूल","🌸"],["प्रकृति","🌿"],["बारिश","🌧"],["आसमान","🌅"],["पेड़","🌳"],["रास्ते","🛣"],["पुराने स्थान","🏚"],["रात","🌙"],["छोटे-छोटे पल","☕"]];

function shell(){
 const N=[["index.html","होम","home"],["poems.html","कविताएँ","poems"],["photography.html","तस्वीरें","photos"],["thoughts.html","विचार","thoughts"],["about.html","मेरे बारे में","about"]];
 const soc=[["Instagram",SITE.instagram],["YouTube",SITE.youtube],["LinkedIn",SITE.linkedin]].filter(s=>s[1]).map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener">${s[0]}</a>`).join("");
 document.body.insertAdjacentHTML("afterbegin",`<header class="bar"><a class="brand" href="index.html">${SITE.title}</a><button class="burger" id="bg" aria-label="मेन्यू">☰</button><nav id="nav">${N.map(n=>`<a href="${n[0]}"${n[2]==page?' class="on"':""}>${n[1]}</a>`).join("")}<button id="sb" aria-label="खोजें"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button></nav></header><div id="sr" hidden><div><button id="sx">बंद करें ✕</button><input id="q" placeholder="खोजें… जैसे: बारिश" autocomplete="off"><div id="res"></div></div></div>`);
 document.body.insertAdjacentHTML("beforeend",`<footer><p class="q">शब्दों में जो बच गया,<br>शायद वही मैं हूँ।</p><p>© ${esc(SITE.name)}<br><small>Poetry · Photography · Philosophy</small></p><p>${soc}</p></footer>`);
 $("#bg").onclick=()=>$("#nav").classList.toggle("open");
 const sr=$("#sr"),q=$("#q"),open=()=>{sr.hidden=false;q.focus()},shut=()=>{sr.hidden=true};
 $("#sb").onclick=open;$("#sx").onclick=shut;addEventListener("keydown",e=>e.key=="Escape"&&shut());
 q.oninput=()=>{const t=q.value.trim().toLowerCase();if(!t){$("#res").innerHTML="";return}
  const r=[...D.P.filter(p=>hay(p).includes(t)).map(p=>[link(p),p.title,"कविता"]),...D.T.filter(x=>hay(x).includes(t)).map(x=>["thoughts.html",x.title,"विचार"]),...D.G.filter(g=>hay({...g,content:g.caption}).includes(t)).map(g=>["photography.html",g.title||g.caption,"तस्वीर"])];
  $("#res").innerHTML=r.map(x=>`<a href="${x[0]}">${esc(x[1])} <small>${x[2]}</small></a>`).join("")||"<p>कुछ नहीं मिला।</p>"};
}

R.home=()=>{const f=D.P.find(p=>p.featured)||D.P[0];
 $("#x").innerHTML=`<section class="hero"><h1>मैं पेशे से Engineer हूँ,<br>पर जाने क्यों<br>हर चीज़ में एक कविता ढूँढ लेता हूँ।</h1><p>कभी शब्दों में,<br>कभी फूलों में,<br>कभी बारिश में,<br>और कभी अपने ही भीतर।</p><div class="btns"><a class="btn" href="poems.html">कविताएँ पढ़ें</a><a class="btn" href="photography.html">तस्वीरों में देखें</a></div></section>
 <section><h2>हाल ही में लिखा…</h2><div class="grid">${D.P.slice(0,6).map(card).join("")}</div></section>
 ${f?`<section class="feat">${imgs(f)[0]?`<img src="${esc(imgs(f)[0])}" alt="${esc(f.title)}" loading="lazy">`:""}<div><small>आज की कविता</small><h2>${esc(f.title)}</h2>${body(f)}<a class="btn" href="${link(f)}">पूरी कविता →</a></div></section>`:""}
 <section class="duo"><div><h3>ENGINEER</h3><p>Logic<br>Numbers<br>Algorithms<br>Systems<br>Equations</p></div><b>×</b><div><h3>POET</h3><p>Emotions<br>Metaphors<br>Silence<br>Memories<br>Questions</p></div></section>
 <p class="q">शायद मैं दोनों के बीच कहीं हूँ।</p><p class="q"><small>अगर आपके पास थोड़ा समय है, तो बैठिए…<br>कुछ बातें करनी हैं।</small></p>`};

const arch=()=>{const y={};D.P.forEach(p=>{const[a,m]=p.date.split("-");((y[a]??={})[m]??=[]).push(p)});
 return Object.keys(y).sort().reverse().map(a=>`<details open><summary>${a}</summary>${Object.keys(y[a]).sort().reverse().map(m=>`<h4>${new Date(a+"-"+m+"-01T00:00").toLocaleDateString("hi-IN",{month:"long"})}</h4><ul>${y[a][m].map(p=>`<li><a href="${link(p)}">${esc(p.title)}</a></li>`).join("")}</ul>`).join("")}</details>`).join("")};

function list(){let c="",t="";const cats=[...new Set(D.P.map(p=>p.category))];
 $("#x").innerHTML=`<input id="f" placeholder="कविताओं में खोजें…"><div class="chips" id="ch"></div><div class="grid" id="gr"></div><section><h2>मेरी डायरी</h2>${arch()}</section>`;
 const draw=()=>{$("#ch").innerHTML=chips(cats,c);$("#gr").innerHTML=D.P.filter(p=>(!c||p.category===c)&&hay(p).includes(t)).map(card).join("")||"<p>कुछ नहीं मिला।</p>"};
 $("#ch").onclick=e=>{const b=e.target.closest("button");if(b){c=b.dataset.k;draw()}};
 $("#f").oninput=e=>{t=e.target.value.trim().toLowerCase();draw()};draw()}

async function makeCard(p){
 const c=document.createElement("canvas");c.width=1080;c.height=1350;const x=c.getContext("2d");
 x.fillStyle="#f4ede0";x.fillRect(0,0,1080,1350);let top=70;
 if(imgs(p)[0]){try{const i=await new Promise((ok,no)=>{const m=new Image();m.onload=()=>ok(m);m.onerror=no;m.src=imgs(p)[0]});
  const h=560,s=Math.max(1080/i.width,h/i.height);x.drawImage(i,(1080-i.width*s)/2,(h-i.height*s)/2,i.width*s,i.height*s);top=h+70}catch(e){}}
 try{await document.fonts.load('46px "Tiro Devanagari Hindi"')}catch(e){}
 x.fillStyle="#2a211b";x.textAlign="center";x.font='46px "Tiro Devanagari Hindi",serif';
 lines(p).filter(l=>l.trim()).slice(0,8).forEach((l,k)=>x.fillText(l,540,top+60+k*76,940));
 x.fillStyle="#7b6c5c";x.font='28px "Hind",sans-serif';x.fillText("— "+SITE.name,540,1240);x.fillText(SITE.title,540,1290);
 const a=document.createElement("a");a.download=p.title+".png";
 try{a.href=c.toDataURL("image/png");a.click()}catch(e){alert("Card सिर्फ़ वेबसाइट पर (GitHub Pages) बनेगा।")}}

R.poems=()=>{const i=D.P.findIndex(p=>p.title===new URLSearchParams(location.search).get("p"));
 if(i<0)return list();
 const p=D.P[i],old=D.P[i+1],nw=D.P[i-1],u=location.href,tx=p.title+"\n\n"+lines(p).join("\n")+"\n\n"+u;
 $("h1").remove();document.title=p.title+" — "+SITE.title;
 $("#x").innerHTML=`<article class="poem"><a class="back" href="poems.html">← सभी कविताएँ</a><h1>${esc(p.title)}</h1><small>${fmt(p.date)} · ${esc(p.category)}</small>${imgs(p).map(s=>`<img src="${esc(s)}" alt="${esc(p.title)}">`).join("")}<div>${body(p)}</div>${p.english?`<p class="en">${esc(p.english).replace(/\n/g,"<br>")}</p>`:""}<p class="tags">${(p.tags||[]).map(t=>"#"+esc(t)).join("  ")}</p>
 <div class="share"><a target="_blank" rel="noopener" href="https://wa.me/?text=${enc(tx)}">WhatsApp</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${enc(u)}">Facebook</a><a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${enc(p.title)}&url=${enc(u)}">X</a><button id="cp">Link copy करें</button><button id="cd">Poetry Card बनाएँ</button></div>
 <div class="pager"><span>${old?`<a href="${link(old)}">← ${esc(old.title)}</a>`:""}</span><span>${nw?`<a href="${link(nw)}">${esc(nw.title)} →</a>`:""}</span></div></article>`;
 $("#cp").onclick=e=>navigator.clipboard.writeText(u).then(()=>e.target.textContent="Copy हो गया ✓");
 $("#cd").onclick=()=>makeCard(p)};

R.photos=()=>{let c="",cur=[];
 $("#x").innerHTML=`<div class="chips" id="ch"></div><div class="mas" id="ms"></div><div id="lb" hidden><button id="lx" aria-label="बंद">×</button><img alt=""><div></div></div>`;
 const lb=$("#lb"),lab=k=>(PC.find(x=>x[0]==k)||["","" ])[1]+" "+k;
 const draw=()=>{$("#ch").innerHTML=chips(PC.map(x=>x[0]),c,lab);cur=D.G.filter(g=>!c||g.category===c);
  $("#ms").innerHTML=cur.map((g,i)=>`<figure data-i="${i}"><img src="${esc(g.src)}" alt="${esc(g.title||g.caption||"")}" loading="lazy"><figcaption>${esc(g.title||"")}</figcaption></figure>`).join("")||"<p>जल्द ही…</p>"};
 $("#ch").onclick=e=>{const b=e.target.closest("button");if(b){c=b.dataset.k;draw()}};
 $("#ms").onclick=e=>{const f=e.target.closest("figure");if(!f)return;const g=cur[+f.dataset.i];
  $("img",lb).src=g.src;$("div",lb).innerHTML=`<h3>${esc(g.title||"")}</h3><small>${fmt(g.date)}${g.place?" · "+esc(g.place):""}</small><p>${esc(g.caption||"")}</p>${g.poem?`<a class="btn" href="poems.html?p=${enc(g.poem)}">संबंधित कविता</a>`:""}`;lb.hidden=false};
 lb.onclick=e=>{if(e.target===lb||e.target.id=="lx")lb.hidden=true};addEventListener("keydown",e=>e.key=="Escape"&&(lb.hidden=true));draw()};

R.thoughts=()=>{$("#x").innerHTML=D.T.map(t=>`<article class="th"><small>${fmt(t.date)}${t.topic?" · "+esc(t.topic):""}</small><h2>${esc(t.title)}</h2>${body(t)}</article>`).join("")||"<p>जल्द ही…</p>"};

(async()=>{const a=await Promise.all([j("data/poems.json"),j("data/thoughts.json"),j("data/photos.json")]);[D.P,D.T,D.G]=a.map(live);shell();R[page]&&R[page]()})();
