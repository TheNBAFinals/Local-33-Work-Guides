/* ═══════════ backline · drum sub figure inputs ═══════════ */
(function(){
  var g=document.getElementById("vsInputs"); if(!g) return;
  var NS="http://www.w3.org/2000/svg";
  for(var i=0;i<10;i++){
    var x=56+i*44, c=document.createElementNS(NS,"circle");
    c.setAttribute("cx",x);c.setAttribute("cy",66);c.setAttribute("r",14);
    c.setAttribute("fill","#0d1117");c.setAttribute("stroke",[0,4,8,9].indexOf(i)>=0?"#58a6ff":"#3fb950");
    c.setAttribute("stroke-width","2.5");g.appendChild(c);
    var t=document.createElementNS(NS,"text");
    t.setAttribute("x",x);t.setAttribute("y",70);t.setAttribute("text-anchor","middle");
    t.setAttribute("class","lbl");t.setAttribute("style","font-size:10px;font-weight:800;fill:#e6edf3");
    t.textContent=i+1;g.appendChild(t);
  }
})();

/* ═══════════ backline · drum kit map ═══════════ */
(function(){
  var svg=document.getElementById("kitSvg"); if(!svg) return;
  var NS="http://www.w3.org/2000/svg";
  function m(t,a,x){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);
    if(x!=null)e.appendChild(document.createTextNode(x));return e;}
  var DR=[
   {k:"kick",x:320,y:250,r:62,cym:false,lab:"KICK",n:"Kick drum",ch:"1 (in) · 2 (out)",
    mic:"Beta 91A boundary condenser inside (48 V) · Beta 52A / D112 / D6 dynamic outside",
    pl:"Inside: flat on the pillow or shell aimed at the beater. Outside: at the port, angled toward the beater impact.",
    note:"Two mics blended at the console: inside for click, outside for body."},
   {k:"snare",x:228,y:178,r:34,cym:false,lab:"SNARE",n:"Snare",ch:"3 (top) · 4 (bottom)",
    mic:"SM57 top · SM57 or e604 bottom",
    pl:"Top: 1–2″ above the head, 2″ in from the rim, about 45°, back of the mic toward the hi-hat. Bottom: under the drum aimed at the wires.",
    note:"Bottom mic faces the other way — FOH flips its polarity."},
   {k:"hat",x:136,y:150,r:30,cym:true,lab:"HI-HAT",n:"Hi-hat",ch:"5",
    mic:"Small condenser — C451 / SM81 / e614 (48 V)",
    pl:"About 4″ above the top cymbal between bell and edge, angled away from the snare.",
    note:"Keep the stand clear of the drummer's left foot and the clutch."},
   {k:"t1",x:270,y:96,r:28,cym:false,lab:"TOM 1",n:"Rack tom 1",ch:"6",
    mic:"Clip-on dynamic — e604 / e904 / D2",
    pl:"Clipped to the rim, 1–2″ above the head, aimed toward the centre.",note:"Keep the capsule out of the stick path."},
   {k:"t2",x:370,y:96,r:30,cym:false,lab:"TOM 2",n:"Rack tom 2",ch:"7",
    mic:"Clip-on dynamic — e604 / e904 / D4",
    pl:"Same as tom 1.",note:"Bigger drum, more low end, same technique."},
   {k:"ft",x:450,y:200,r:40,cym:false,lab:"FLOOR",n:"Floor tom",ch:"8",
    mic:"Dynamic — e604 / MD421 / D4",
    pl:"Clip or short boom from the side, 1–2″ up, aimed at the centre.",note:"Watch the drummer's right hand on fills."},
   {k:"crash",x:170,y:62,r:36,cym:true,lab:"CRASH",n:"Crash",ch:"Overheads",
    mic:"Usually no close mic — the overheads cover it",pl:"—",note:"Only close-mic it if the input list asks."},
   {k:"ride",x:520,y:110,r:42,cym:true,lab:"RIDE",n:"Ride",ch:"Overheads, sometimes its own",
    mic:"If listed: small condenser (48 V)",pl:"6–8″ above, between bell and edge.",note:"Common on jazz and some pop lists."},
   {k:"ohl",x:110,y:290,r:20,cym:false,oh:true,lab:"OH L",n:"Overhead left",ch:"9",
    mic:"Condenser — C451 / SM81 / C414 (48 V), matched pair",
    pl:"Roughly 3–4 ft above the kit, stage-right side from the drummer's view.",
    note:"Same distance from the snare as OH R. Measure it."},
   {k:"ohr",x:530,y:290,r:20,cym:false,oh:true,lab:"OH R",n:"Overhead right",ch:"10",
    mic:"Condenser — matched to OH L (48 V)",pl:"Mirror of OH L.",
    note:"Even 6″ of difference to the snare makes it thin and phasey."}
  ];
  var sel=null, info=document.getElementById("kitInfo");
  function draw(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    svg.appendChild(m("text",{x:320,y:322,"text-anchor":"middle",class:"lbl",style:"font-size:9px"},"DRUMMER'S SEAT ↓  ·  audience is up the page"));
    DR.forEach(function(d){
      var on=sel===d.k, col=d.oh?"#58a6ff":(d.cym?"#e3b341":"#3fb950");
      var g=m("g",{class:"fx",style:"cursor:pointer"});
      g.appendChild(m("circle",{cx:d.x,cy:d.y,r:d.r,fill:on?"#16241a":(d.cym?"#211d10":"#1c2430"),
        stroke:on?"#e6edf3":col,"stroke-width":on?3:2,"stroke-dasharray":d.oh?"4 3":""}));
      g.appendChild(m("text",{x:d.x,y:d.y+4,"text-anchor":"middle",style:"font-size:10px;font-weight:800;fill:"+col},d.lab));
      g.onclick=function(){sel=d.k;draw();show(d)};
      svg.appendChild(g);
    });
  }
  function show(d){
    info.className="verdict ok";
    info.innerHTML='<b>'+d.n+' · ch '+d.ch+'</b>'+
      '<div><span style="color:var(--dim)">Mic:</span> '+d.mic+'</div>'+
      '<div><span style="color:var(--dim)">Placement:</span> '+d.pl+'</div>'+
      '<div style="color:var(--dim);margin-top:6px">'+d.note+'</div>';
  }
  draw();
})();

/* ═══════════ backline · patch the drum sub ═══════════ */
(function(){
  var host=document.getElementById("patchSim"); if(!host) return;
  var MIC={
    kin:{n:"Kick In",t:"Beta 91A",c:true}, kout:{n:"Kick Out",t:"Beta 52A",c:false},
    snt:{n:"Snare Top",t:"SM57",c:false}, snb:{n:"Snare Btm",t:"SM57",c:false},
    hat:{n:"Hi-Hat",t:"SM81",c:true}, t1:{n:"Tom 1",t:"e604",c:false}, t2:{n:"Tom 2",t:"e604",c:false},
    ft:{n:"Floor Tom",t:"e604",c:false}, ft2:{n:"Floor Tom 2",t:"e604",c:false},
    ride:{n:"Ride",t:"C451",c:true}, ohl:{n:"OH L",t:"C414",c:true}, ohr:{n:"OH R",t:"C414",c:true},
    kd:{n:"Kick Sub",t:"Subkick",c:false}
  };
  var SHOWS=[
   {cs:{show:"Rock concert",venue:"Theatre, house PA, tour A1",boss:"Tour A1",manner:"has done 200 of these",clock:"Line check in 20 min"},
    say:"Standard list, nothing clever. Patch it, label it, and tell me what needs phantom before I ask.",
    list:["kin","kout","snt","snb","hat","t1","t2","ft","ohl","ohr"]},
   {cs:{show:"Jazz trio",venue:"Hotel ballroom, corporate gala",boss:"House A1",manner:"quiet room, client nearby",clock:"Doors in 45 min"},
    say:"No kick in, no hat mic. The ride matters on this one. Follow my list, not your habits.",
    list:["kout","snt","ride","t1","ft","ohl","ohr"]},
   {cs:{show:"Pop · arena support act",venue:"Arena, festival-style changeover",boss:"Tour A1",manner:"changeover clock running",clock:"Changeover 15 min"},
    say:"Kick out on one, kick in on two on this tour. Two floors. Overheads at the end. Don't patch from memory.",
    list:["kout","kin","snt","snb","hat","t1","ft","ft2","ohl","ohr"]},
   {cs:{show:"Hip-hop · live band",venue:"Club, low stage",boss:"House A1",manner:"wants the low end huge",clock:"Soundcheck in 30 min"},
    say:"Subkick on three, after both kicks. Single rack tom. I'll take the hat on its own.",
    list:["kin","kout","kd","snt","snb","hat","t1","ft","ohl","ohr"]}
  ];
  var si=0, S, patched, pickMic, phase, wrong, chosen;
  function reset(){
    S=SHOWS[si]; patched={}; pickMic=null; phase="patch"; wrong=0; chosen={};
    CallSheet.render("psBrief",{show:S.cs.show,venue:S.cs.venue,role:"Backline hand",boss:S.cs.boss,
      manner:S.cs.manner,clock:S.cs.clock,target:3,say:S.say,
      reqs:["Patch every mic to the channel on <b>this</b> list.","Then call out every channel that needs <b>phantom</b>.","Nothing patched from memory."]});
    document.getElementById("psFeed").innerHTML="";
    render();
  }
  function listHtml(){
    var h='<table class="tbl" style="margin:0 0 10px"><tr><th>Ch</th><th>Source</th><th>Mic</th></tr>';
    S.list.forEach(function(k,i){h+='<tr><td>'+(i+1)+'</td><td>'+MIC[k].n+'</td><td>'+MIC[k].t+'</td></tr>'});
    return h+'</table>';
  }
  function render(){
    var n=Object.keys(patched).length, tot=S.list.length;
    document.getElementById("psStatus").textContent = phase==="patch"
      ? "Patched "+n+" / "+tot+(pickMic?" · holding "+MIC[pickMic].n:"")
      : "Tap every channel that needs phantom, then call it";
    document.getElementById("psList").innerHTML=listHtml();
    var mh="";
    /* riser mics: the list's mics plus one decoy that isn't on it */
    var pool=S.list.slice(); if(pool.indexOf("hat")<0) pool.push("hat"); else if(pool.indexOf("ride")<0) pool.push("ride");
    pool.sort();
    pool.forEach(function(k){
      var done=Object.keys(patched).some(function(c){return patched[c]===k});
      mh+='<div class="camb'+(done?" done":"")+'" data-m="'+k+'" style="'+(pickMic===k?"border-color:#e3b341":"")+'">'+
        '<span class="dot" style="border-color:'+(MIC[k].c?"#58a6ff":"#3fb950")+'"></span>'+MIC[k].n+'<small>'+MIC[k].t+'</small></div>';
    });
    document.getElementById("psMics").innerHTML=phase==="patch"?mh:'<p style="color:var(--dim);font-size:13px">All patched.</p>';
    var ch="";
    for(var c=1;c<=Math.max(10,tot);c++){
      var k=patched[c], on=!!chosen[c];
      ch+='<div class="camb" data-c="'+c+'" style="'+(phase==="phantom"&&on?"border-color:#58a6ff;background:rgba(88,166,255,.12)":"")+'">'+
        '<span class="dot" style="border-color:'+(k?"#3fb950":"#30363d")+'"></span>IN '+c+'<small>'+(k?MIC[k].n:"empty")+'</small></div>';
    }
    document.getElementById("psChans").innerHTML=ch;
    document.getElementById("psCallRow").innerHTML = phase==="phantom"
      ? '<div class="row"><button class="btn pri" id="psCall" style="margin-left:auto">Call phantom to FOH</button></div>' : "";
    host.querySelectorAll("[data-m]").forEach(function(b){b.onclick=function(){pickMic=b.dataset.m;render()}});
    host.querySelectorAll("[data-c]").forEach(function(b){b.onclick=function(){chan(+b.dataset.c)}});
    var call=document.getElementById("psCall"); if(call) call.onclick=grade;
  }
  function fb(cls,h,msg){document.getElementById("psFeed").innerHTML='<div class="fb '+cls+'"><b class="h">'+h+'</b>'+msg+'</div>'}
  function chan(c){
    if(phase==="phantom"){ chosen[c]=!chosen[c]; render(); return; }
    if(!pickMic){ fb("no","“Pick up a mic first”","Tap a mic on the riser, then the input it belongs on."); return; }
    var want=S.list.indexOf(pickMic)+1;
    if(want===0){ wrong++; fb("no","“That one's not on my list”","<b>"+MIC[pickMic].n+"</b> isn't on this show's input list. Leave it unpatched — ask before you strike the stand."); pickMic=null; render(); return; }
    if(c!==want){ wrong++; fb("no","“Check the list”","<b>"+MIC[pickMic].n+"</b> is on <b>"+want+"</b> on this list, not "+c+". Read the list, don't patch from habit."); return; }
    patched[c]=pickMic; pickMic=null; document.getElementById("psFeed").innerHTML="";
    if(Object.keys(patched).length===S.list.length){ phase="phantom"; fb("ok","“Good. Now what needs phantom?”","Tap every input that has a condenser on it, then call it."); }
    render();
  }
  function grade(){
    var need=[],miss=[],extra=[];
    S.list.forEach(function(k,i){ if(MIC[k].c) need.push(i+1) });
    need.forEach(function(c){ if(!chosen[c]) miss.push(c) });
    Object.keys(chosen).forEach(function(c){ if(chosen[c] && need.indexOf(+c)<0) extra.push(+c) });
    CallSheet.stop("psBrief");
    var g=CallSheet.grade("psBrief");
    if(!miss.length && !extra.length){
      fb(wrong?"warn":"ok", wrong?"“Right in the end”":"“That's a clean patch”",
        "Phantom on <b>"+need.join(", ")+"</b>. "+(wrong?wrong+" mis-patch"+(wrong>1?"es":"")+" on the way — run it again cold.":"No mis-patches.")+g.html);
    } else {
      fb("no","“Line check would have caught that”",
        (miss.length?"Missed phantom on <b>"+miss.join(", ")+"</b> — those are condensers and will come up dead. ":"")+
        (extra.length?"<b>"+extra.join(", ")+"</b> "+(extra.length>1?"are":"is")+" dynamic or empty — no phantom needed. ":"")+
        "Phantom belongs on <b>"+need.join(", ")+"</b>."+g.html);
    }
  }
  document.getElementById("psNext").onclick=function(){si=(si+1)%SHOWS.length;reset()};
  reset();
})();
