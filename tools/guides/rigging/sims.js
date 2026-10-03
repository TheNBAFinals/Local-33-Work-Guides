/* ═══════════ rigging · build the bridle ═══════════ */
(function(){
  var host=document.getElementById("bridleSim"); if(!host) return;
  var NS="http://www.w3.org/2000/svg", svg=document.getElementById("brSvg");
  function m(t,a,x){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);
    if(x!=null)e.appendChild(document.createTextNode(x));return e;}
  function r1(x){return Math.round(x*10)/10}
  function lb(x){return Math.round(x).toLocaleString("en-US")+" lb"}
  function ft(x){return r1(x).toFixed(1)+" ft"}

  /* W load, h1/h2 horizontal from apex to beam A/B, v drop from beams to apex, tag = steel leg WLL */
  var JOBS=[
   {cs:{show:"Rock concert",venue:"Arena, downstage truss",boss:"Head Rigger",manner:"checks every point twice",clock:"Motors on in 40 min"},
    say:"Point 4 is a straight bridle, nice and steep. Build it to the plot and tell me it'll hold before it goes up.",
    W:1000,h1:6,h2:6,v:8,tag:2000},
   {cs:{show:"Sports · halftime show",venue:"Arena, centre-hung clear of the scoreboard",boss:"Head Rigger",manner:"in a hurry, still careful",clock:"Points up in 30 min"},
    say:"Wide beams on this one, so the legs run flat. Steel in the bin is tagged fifteen hundred. Your call.",
    W:1800,h1:9,h2:9,v:6,tag:1500},
   {cs:{show:"Corporate · product launch",venue:"Convention centre hall",boss:"Venue Rigger",manner:"by the book",clock:"Doors in 3 hrs"},
    say:"Point sits closer to the A beam. Work out both legs — I want the heavy one.",
    W:1200,h1:4,h2:8,v:6,tag:2000},
   {cs:{show:"Concert · side-hung PA",venue:"Arena, low steel",boss:"Head Rigger",manner:"has seen this go wrong",clock:"Hang in 20 min"},
    say:"Steel's low in this building and the beams are a long way apart. Tell me what the angle does to this one.",
    W:800,h1:12,h2:12,v:5,tag:2000},
   {cs:{show:"Festival · indoor second stage",venue:"Expo hall",boss:"Head Rigger",manner:"wants the math, not a guess",clock:"Points up in 45 min"},
    say:"Two thousand pounds, apex three feet off A. The steel says fifteen hundred and the share on A is fifteen hundred. Is that close enough?",
    W:2000,h1:3,h2:9,v:6,tag:1500}
  ];

  var ji=0, J, step, wrong, calc;

  function solve(j){
    var L1=Math.sqrt(j.h1*j.h1+j.v*j.v), L2=Math.sqrt(j.h2*j.h2+j.v*j.v);
    var V1=j.W*j.h2/(j.h1+j.h2), V2=j.W*j.h1/(j.h1+j.h2);
    var T1=V1*L1/j.v, T2=V2*L2/j.v;
    var inc=(Math.atan(j.h1/j.v)+Math.atan(j.h2/j.v))*180/Math.PI;
    var heavy = T1>=T2 ? "A" : "B";
    return {L1:L1,L2:L2,V1:V1,V2:V2,T1:T1,T2:T2,inc:inc,heavy:heavy,Tmax:Math.max(T1,T2),
            Vheavy: heavy==="A"?V1:V2, Lheavy: heavy==="A"?L1:L2};
  }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[k];a[k]=t} return a }
  function uniq(opts){ /* opts: [{t,ok}] ; drop duplicate labels, keep the correct one */
    var seen={}, out=[];
    opts.forEach(function(o){ if(!seen[o.t] || o.ok){ if(seen[o.t]) out=out.filter(function(p){return p.t!==o.t}); seen[o.t]=1; out.push(o);} });
    return shuffle(out);
  }

  function buildSteps(){
    var c=calc, j=J, steps=[];
    var symm = j.h1===j.h2;
    steps.push({q:"Leg lengths? (h is horizontal to each beam, v is the drop)",
      opts:uniq([
        {t:"A "+ft(c.L1)+" · B "+ft(c.L2), ok:true},
        {t:"A "+ft(j.h1+j.v)+" · B "+ft(j.h2+j.v)},
        {t:"A "+ft(j.v)+" · B "+ft(j.v)},
        {t:"A "+ft(Math.max(j.h1,j.v))+" · B "+ft(Math.max(j.h2,j.v))}
      ]),
      why:"L = √(h² + v²). A: √("+j.h1+"² + "+j.v+"²) = <b>"+ft(c.L1)+"</b>. B: √("+j.h2+"² + "+j.v+"²) = <b>"+ft(c.L2)+"</b>. Adding h and v together overstates it; the leg is the hypotenuse."});
    steps.push({q:symm?"Tension in each leg?":"Tension in the heavier leg?",
      opts:uniq([
        {t:(symm?"":"Leg "+c.heavy+" · ")+lb(c.Tmax), ok:true},
        {t:(symm?"":"Leg "+c.heavy+" · ")+lb(c.Vheavy)},
        {t:(symm?"":"Leg "+c.heavy+" · ")+lb(j.W)},
        {t:(symm?"":"Leg "+(c.heavy==="A"?"B":"A")+" · ")+lb(Math.min(c.T1,c.T2)*(symm?2:1))}
      ]),
      why:(symm
        ? "Each leg's share is W ÷ 2 = "+lb(j.W/2)+". "
        : "The leg <b>closer</b> to the load carries more weight. Share "+c.heavy+" = "+lb(j.W)+" × "+(c.heavy==="A"?j.h2:j.h1)+" ÷ "+(j.h1+j.h2)+" = "+lb(c.Vheavy)+". ")+
        "Tension = share × L ÷ v = "+lb(c.Vheavy)+" × "+ft(c.Lheavy)+" ÷ "+j.v+" ft = <b>"+lb(c.Tmax)+"</b>. Tension is always more than the leg's share of the weight."});
    var incOk = c.inc<=120;
    var wrongInc = 180-c.inc;
    steps.push({q:"Included angle at the apex — and can it hang?",
      opts:uniq([
        {t:Math.round(c.inc)+"° — "+(incOk?"inside 120°, fine":"over 120°, don't hang it"), ok:true},
        {t:Math.round(c.inc)+"° — "+(incOk?"over 120°, don't hang it":"inside 120°, fine")},
        {t:Math.round(wrongInc)+"° — "+(wrongInc<=120?"inside 120°, fine":"over 120°, don't hang it")},
        {t:"Angle doesn't matter if the steel is big enough"}
      ]),
      why:"Each leg's angle from vertical is atan(h ÷ v): "+Math.round(Math.atan(j.h1/j.v)*180/Math.PI)+"° + "+Math.round(Math.atan(j.h2/j.v)*180/Math.PI)+"° = <b>"+Math.round(c.inc)+"°</b>. "+
        (incOk ? "That's inside the 120° limit." : "That's <b>past 120°</b> — each leg is carrying more than the whole load and pulling the beams sideways hard. It goes back to the head rigger: lower the apex, or find closer steel."),
      stop:!incOk});
    if(incOk){
      var over = c.Tmax>j.tag;
      steps.push({q:"Steel legs are tagged "+lb(j.tag)+" WLL. Load is "+lb(j.W)+". Hang it?",
        opts:uniq([
          {t:"Tension "+lb(c.Tmax)+" — "+(over?"over the tag, don't hang it":"under the tag, hang it"), ok:true},
          {t:"Tension "+lb(c.Tmax)+" — "+(over?"under the tag, hang it":"over the tag, don't hang it")},
          {t:"Yes — each leg only carries half the load"},
          {t:(j.W<=j.tag?"Yes — the load is under the tag":"No — the load is over the tag")}
        ]),
        why:"Check hardware against the <b>leg tension</b>, not the load. Heaviest leg = "+lb(c.Tmax)+" against a "+lb(j.tag)+" tag: "+
          (over ? "<b>over</b>. Bigger steel, or change the geometry so the legs are steeper." : "<b>under</b>, so the steel is fine on capacity. Shackles get the same check.")});
    }
    return steps;
  }

  function draw(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var j=J, s=Math.min(360/(j.h1+j.h2), 150/j.v);
    var ax=50+j.h1*s, by=34, ay=by+j.v*s, xA=ax-j.h1*s, xB=ax+j.h2*s;
    var off=(460-(xB-xA))/2-xA; xA+=off; xB+=off; ax+=off;
    svg.appendChild(m("rect",{class:"sf",x:xA-26,y:by-14,width:52,height:14,rx:2}));
    svg.appendChild(m("rect",{class:"sf",x:xB-26,y:by-14,width:52,height:14,rx:2}));
    svg.appendChild(m("text",{class:"lbl",x:xA,y:by-18,"text-anchor":"middle"},"BEAM A"));
    svg.appendChild(m("text",{class:"lbl",x:xB,y:by-18,"text-anchor":"middle"},"BEAM B"));
    svg.appendChild(m("path",{class:"s",style:"stroke:#484f58;stroke-dasharray:4 4",d:"M"+xA+" "+by+" V"+ay+" H"+xB+" V"+by}));
    svg.appendChild(m("path",{class:"s",style:"stroke:#484f58;stroke-dasharray:4 4",d:"M"+ax+" "+by+" V"+ay}));
    svg.appendChild(m("path",{class:"s",style:"stroke:#bc8cff;stroke-width:3",d:"M"+xA+" "+by+" L"+ax+" "+ay+" L"+xB+" "+by}));
    svg.appendChild(m("text",{class:"lbl f-warn",x:(xA+ax)/2,y:ay+15,"text-anchor":"middle"},"h1 = "+j.h1+" ft"));
    svg.appendChild(m("text",{class:"lbl f-warn",x:(ax+xB)/2,y:ay+15,"text-anchor":"middle"},"h2 = "+j.h2+" ft"));
    svg.appendChild(m("text",{class:"lbl f-warn",x:ax+6,y:(by+ay)/2},"v = "+j.v+" ft"));
    svg.appendChild(m("circle",{cx:ax,cy:ay,r:6,fill:"#0d1117",stroke:"#e3b341","stroke-width":2.5}));
    svg.appendChild(m("path",{class:"s",d:"M"+ax+" "+(ay+6)+" V"+(ay+26)}));
    svg.appendChild(m("rect",{class:"sf",x:ax-22,y:ay+26,width:44,height:20,rx:3}));
    svg.appendChild(m("text",{class:"lbl",x:ax,y:ay+40,"text-anchor":"middle",style:"font-size:9.5px;fill:#c9d1d9"},lb(j.W)));
  }

  function fb(cls,h,msg){document.getElementById("brFeed").innerHTML='<div class="fb '+cls+'"><b class="h">'+h+'</b>'+msg+'</div>'}

  function render(){
    var steps=J.steps, el=document.getElementById("brSteps");
    document.getElementById("brStatus").textContent="Point "+(ji+1)+" of "+JOBS.length+" · step "+Math.min(step+1,steps.length)+" of "+steps.length;
    if(step>=steps.length){ el.innerHTML=""; return; }
    var S=steps[step];
    var h='<p class="rgq">'+S.q+'</p><div class="rgopts">';
    S.opts.forEach(function(o,i){ h+='<div class="camb" data-i="'+i+'">'+o.t+'</div>' });
    el.innerHTML=h+'</div>';
    el.querySelectorAll(".camb").forEach(function(b){ b.onclick=function(){ pick(+b.dataset.i) } });
  }

  function pick(i){
    var S=J.steps[step], o=S.opts[i];
    if(!o.ok){ wrong++; fb("no","“Run that again”",S.why); return; }
    step++;
    var done = step>=J.steps.length || S.stop;
    if(!done){ fb("ok","“Right”",S.why); render(); return; }
    step=J.steps.length; render();
    CallSheet.stop("brBrief");
    var g=CallSheet.grade("brBrief");
    var c=calc, hangs = c.inc<=120 && c.Tmax<=J.tag;
    fb(wrong?"warn":"ok", wrong?"“Got there — check your working next time”":"“That's the math I wanted”",
      S.why+"<br><br><b>Verdict:</b> "+(hangs?"this point hangs as plotted.":"this point does <b>not</b> hang as plotted — it goes back to the head rigger with your numbers.")+
      (wrong?" "+wrong+" wrong answer"+(wrong>1?"s":"")+" on the way.":"")+g.html);
  }

  function reset(){
    J=JOBS[ji]; calc=solve(J); J.steps=buildSteps(); step=0; wrong=0;
    CallSheet.render("brBrief",{show:J.cs.show,venue:J.cs.venue,role:"Down rigger",boss:J.cs.boss,
      manner:J.cs.manner,clock:J.cs.clock,target:3,say:J.say,
      reqs:["Leg lengths from the plot geometry.","Tension in the leg that carries the most.","Angle check, then hardware check against <b>tension</b>."]});
    document.getElementById("brFeed").innerHTML="";
    draw(); render();
  }
  document.getElementById("brNext").onclick=function(){ ji=(ji+1)%JOBS.length; reset() };
  reset();
})();

/* ═══════════ rigging · tag it out ═══════════ */
(function(){
  var host=document.getElementById("tagSim"); if(!host) return;
  var ITEMS=[
   {g:"5/8″ screw-pin anchor shackle",f:"Bow stamped 3¼ t. Pin threads clean and seats fully. Light surface rust on the bow.",keep:true,
    why:"Markings readable, pin seats, no distortion. Light surface rust is cosmetic — wipe it and it goes back in the case."},
   {g:"3/4″ anchor shackle",f:"The original pin is missing. Someone has put a hardware-store bolt and nut through it.",keep:false,
    why:"A bolt is not a rated pin. The shackle's rating depends on its own pin. <b>Tag it out</b> — and pull the bolt so nobody 'fixes' it again."},
   {g:"5/8″ anchor shackle",f:"The size and WLL markings on the bow have been ground off.",keep:false,
    why:"No markings, no rating, no use. You can't prove what it is."},
   {g:"Purple round sling",f:"Dusty and scuffed from the last tour. No cuts, no melted spots. Tag present and readable.",keep:true,
    why:"Dirt and scuffing on an intact cover are cosmetic. Cover whole, tag readable — it goes back."},
   {g:"Green round sling",f:"Cover in perfect shape. The tag is missing.",keep:false,
    why:"<b>The tag is the rating.</b> Without it, nobody can say what it's rated for. Out of service."},
   {g:"Yellow round sling",f:"A shiny, hard, glazed patch on the cover where it was dragged across steel.",keep:false,
    why:"Glazing means the fibres melted from friction heat. That's damage, not dirt. Tag it out."},
   {g:"10 ft steel (wire rope sling)",f:"One broken wire, right where the rope goes into the swaged sleeve.",keep:false,
    why:"Any broken wire at a fitting retires the sling — that's where the load concentrates and where failure starts."},
   {g:"20 ft steel",f:"A sharp kink about halfway along, from being folded into the case.",keep:false,
    why:"A kink permanently damages wire rope. It does not get straightened and reused."},
   {g:"5 ft steel",f:"Some grease and dirt. Tag readable. No broken wires, kinks or crushing you can find.",keep:true,
    why:"Grease is fine — wire rope is supposed to be lubricated. No damage and a readable tag: it goes back."},
   {g:"Deck chain",f:"Grade 80 stamp on the links. Gauged — within limits. No nicks or gouges.",keep:true,
    why:"Right grade, in gauge, undamaged. Keep it."},
   {g:"Chain in the rigging bin",f:"Links stamped G43. It looks heavier than the Grade 80 deck chain.",keep:false,
    why:"Grade 43 is transport chain — <b>not for overhead lifting</b>, however thick. Get it out of the rigging bin entirely."},
   {g:"1-ton chain motor",f:"The hook's safety latch spring is broken — the latch flops open.",keep:false,
    why:"Out of service until the latch is repaired. A hook without a working latch can shed its load."},
   {g:"12″ box truss, 10 ft section",f:"A dent in one main chord right next to a diagonal joint.",keep:false,
    why:"A dented chord changes how the section carries load, and it sits at a joint. Out of service until the manufacturer or an engineer says otherwise."},
   {g:"12″ box truss, 8 ft section",f:"Scratches and scuffed paint along the chords. No dents, no bends, welds look clean.",keep:true,
    why:"Scratched finish is cosmetic. Straight members and clean welds: it goes back on the truck."}
  ];
  var order, idx, right, wrong, answered;
  function fb(cls,h,msg){document.getElementById("tgFeed").innerHTML='<div class="fb '+cls+'"><b class="h">'+h+'</b>'+msg+'</div>'}
  function start(){
    order=ITEMS.map(function(_,i){return i}); for(var i=order.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1)),t=order[i];order[i]=order[k];order[k]=t}
    idx=0; right=0; wrong=0; answered=false;
    CallSheet.render("tgBrief",{show:"Tour · shop prep",venue:"Vendor shop, before the load-out",role:"Rigging hand",
      boss:"Head Rigger",manner:"would rather lose a sling than a person",clock:"Truck loads in 2 hrs",target:4,
      say:"Everything in this pile goes on the truck or gets tagged. Make the call on each one and tell me why.",
      reqs:["A decision on every piece.","Cosmetic stays, structural goes.","When in doubt, tag it out."]});
    document.getElementById("tgFeed").innerHTML="";
    show();
  }
  function show(){
    document.getElementById("tgStatus").textContent="Piece "+Math.min(idx+1,ITEMS.length)+" of "+ITEMS.length+" · "+right+" right";
    var el=document.getElementById("tgCard");
    if(idx>=ITEMS.length){
      CallSheet.stop("tgBrief");
      var g=CallSheet.grade("tgBrief");
      el.innerHTML="";
      fb(wrong?"warn":"ok", wrong?"“Good pile — a few to think about”":"“Clean sort”",
        right+" of "+ITEMS.length+" right."+(wrong?" Run it again and watch for the difference between <b>dirty</b> and <b>damaged</b>.":"")+g.html);
      return;
    }
    var it=ITEMS[order[idx]];
    answered=false;
    el.innerHTML='<div class="tagcard"><div class="tgear">'+it.g+'</div><p class="tfind">'+it.f+'</p></div>'+
      '<div class="rgopts"><div class="camb" data-k="1"><span class="dot" style="border-color:#3fb950"></span>Back in the case</div>'+
      '<div class="camb" data-k="0"><span class="dot" style="border-color:#f85149"></span>Tag it out</div></div>';
    el.querySelectorAll(".camb").forEach(function(b){ b.onclick=function(){ pick(b.dataset.k==="1") } });
  }
  function pick(keep){
    if(answered) return; answered=true;
    var it=ITEMS[order[idx]], ok=(keep===it.keep);
    if(ok) right++; else wrong++;
    fb(ok?"ok":"no", ok?(it.keep?"“Yep, it goes back”":"“Good catch”"):(it.keep?"“That one's fine”":"“That one doesn't go on the truck”"),
      it.why+'<div class="row" style="margin:12px 0 0"><button class="btn pri" id="tgGo" style="margin-left:auto">Next piece →</button></div>');
    document.getElementById("tgGo").onclick=function(){ idx++; document.getElementById("tgFeed").innerHTML=""; show(); };
  }
  document.getElementById("tgRestart").onclick=start;
  start();
})();
