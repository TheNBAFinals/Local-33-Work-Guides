/* ═══════════ room finder — kits transcribed from the AAO–CPG gear list ═══════════ */
(function(){
"use strict";
var sel=document.getElementById("rfSel"), out=document.getElementById("rfOut");
if(!sel||!out) return;

function k(a){ return a.join(" | "); }

var LZ=k(["2 - 7' Tripod Screen w/Skirt","2 - 3k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","5 - 50' XLR","1 - 25' XLR","4 - 50' Edison","3 - 25' Edison"]);
var LZ9=k(["1 - 7' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","2 - Wireless Combo RF Mic","2 - 10' XLR","2 - 50' XLR","2 - 25' Edison","2 - 50' Edison"]);
var SMALL=k(["1 - 7' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","1 - 50' HDMI","5 - 50' XLR","1 - 25' XLR","4 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var SMALL404B=k(["2 - 7' Tripod Screen w/Skirt","2 - 3k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","7 - 50' XLR","1 - 25' XLR","4 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var LARGEA=k(["2 - 7'x12' FF Screen FP w/Skirt","2 - 6k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","4 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","7 - 50' XLR","1 - 25' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var LARGEB1=k(["2 - 8' Tripod Screen w/Skirt","2 - 3k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","7 - 50' XLR","1 - 25' XLR","4 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var LARGEB2=k(["2 - 8' Tripod Screen w/Skirt","2 - 3k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","4 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","9 - 50' XLR","1 - 25' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var THEATER=k(["1 - 10k Projector","2 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","4 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","4 - 12″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","9 - 50' XLR","1 - 25' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"]);
var COMM306=k(["1 - 7' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","3 - Wireless Combo RF Mic","1 - 25' HDMI","2 - 50' XLR","1 - 25' XLR","3 - 10' XLR","1 - 50' Edison","3 - 25' Edison"]);
function comm(x10){ return k(["1 - 7' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","2 - Wireless Combo RF Mic","1 - 25' HDMI","2 - 50' XLR","1 - 25' XLR"].concat(x10?["2 - 10' XLR"]:[]).concat(["1 - 50' Edison","3 - 25' Edison","1 - Tritap"])); }

var ROOMS=[
 ["GS West Hall","Opening Ceremony — see the Video, Lighting, Audio, Comms and Rig/Power tabs",""],
 ["Learning Zones 1–8","Same kit in each room",LZ],
 ["Learning Zone 9 (Black OTO)","",LZ9],
 ["306AB","Committee Meeting Setup",COMM306],
 ["308AB","Speaker Ready Room",k(["24 - Windows Laptop w/PPT","4 - Macbook","2 - Laser Printer","1 - WiFi Access Point"])+"|NOTE:Sheet says: Need to order access point"],
 ["309","CPG Production Office","1 - Laser Printer"],
 ["402A / 404A / 406A / 406B / 518","EDU Room Small",SMALL],
 ["404B","EDU Room Small — bigger kit than the other small rooms",SMALL404B],
 ["403A (ENT Pulse) / 403B / 408A / 408B / 409AB","EDU Room Large",LARGEA],
 ["411","Theater",THEATER+"|NOTE:No screen listed on the sheet — ask the production lead if there's a house screen"],
 ["501ABC","EDU Room Large",LARGEB1],
 ["502A / 502B / 511ABC / 515A / 515B","EDU Room Large",LARGEB2],
 ["507 / 512","Committee with Screen",comm(true)],
 ["510","Committee with Screen (no 10' XLR on the sheet)",comm(false)],
 ["Concourse Hall 150-151","Academic Bowl",k(["2 - 7'x12' FF Screen FP w/Skirt","2 - 6k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","4 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","4 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - Wireless Combo RF Mic","2 - Straight Round Base Mic Stand","6 - 8″ Powered Speaker w/Speaker Stand","1 - 12 Channel Audio Mixer","1 - HDMI DA 1x8","1 - Roland V160","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","1 - 100' 6 Channel XLR Snake","2 - 10' XLR","12 - 50' XLR","1 - 25' XLR","2 - 100' XLR","8 - 50' Edison","3 - 25' Edison","1 - Tritap"])+"|NOTE:Sheet note: Video Switcher"],
 ["Concourse Hall 152","Crucial Conversations, Great Debates, IAB General Assembly",k(["2 - 7'x12' FF Screen FP w/Skirt","2 - 6k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","4 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","1 - Wireless Combo RF Mic","1 - Straight Round Base Mic Stand","4 - 8″ Powered Speaker w/Speaker Stand","1 - 12 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","1 - 100' 6 Channel XLR Snake","1 - 10' XLR","10 - 50' XLR","1 - 25' XLR","2 - 100' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"])],
 ["Concourse Hall 153AB","Global Connections Lounge",k(["1 - 7'x12' FF Screen FP w/Skirt","1 - 6k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","2 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - 6 Channel Audio Mixer","1 - 50' HDMI","5 - 50' XLR","1 - 25' XLR","4 - 50' Edison","3 - 25' Edison","1 - Tritap"])],
 ["Petree Hall C","Education Sessions, Myers Lecture, Neel Lecture",k(["2 - 9'x16' FF Screen FP w/Skirt","2 - 8k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","4 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","4 - 8″ Powered Speaker w/Speaker Stand","1 - 12 Channel Audio Mixer","1 - HDMI DA 1x4","1 - Roland V160","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","1 - 150' 6 Channel XLR Snake","1 - 10' XLR","10 - 50' XLR","1 - 25' XLR","2 - 100' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"])],
 ["Petree Hall D","CME Enthusiast (no Roland V160 on the sheet)",k(["2 - 9'x16' FF Screen FP w/Skirt","2 - 8k Short Throw Projector","3 - AV Cart/Projector Stand w/Skirt","1 - 40″ Confidence Monitor w/Stand","1 - Windows Laptop w/PPT","1 - MX412 Podium Mic","4 - MX412 Table Mic/Wired TT Mic","1 - Laptop Audio DI","4 - 8″ Powered Speaker w/Speaker Stand","1 - 12 Channel Audio Mixer","1 - HDMI DA 1x4","1 - 15' HDMI","1 - 25' HDMI","2 - 50' HDMI","1 - 150' 6 Channel XLR Snake","1 - 10' XLR","10 - 50' XLR","1 - 25' XLR","2 - 100' XLR","6 - 50' Edison","3 - 25' Edison","1 - Tritap"])],
 ["South Lobby","Talking Point · Academy Central · Main Registration · Info Desk · Donor Lounge",k(["Talking Point: 32″ w/ Bracket","Academy Central: 3 x 32″ w/ Bracket","Main Registration: 1 Laser Printer with copying (due 10:00 AM Thu Oct 15)","South Information Desk: Power for IT equipment","Millennium Society Donor Lounge: 1 - 65″ on pole stand"])],
 ["Simulation Room 1 (651)","",k(["1 - 8' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Windows Laptop w/PPT","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","2 - Wireless Combo RF Mic","1 - 6 Channel Audio Mixer","1 - 25' HDMI","1 - 50' HDMI","3 - 50' XLR","1 - 100' XLR","2 - 10' XLR","3 - 50' Edison","2 - 25' Edison","1 - Tritap"])],
 ["Simulation Room 2 (651)","",k(["1 - 8' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Windows Laptop w/PPT","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - MX412 Podium Mic","1 - 6 Channel Audio Mixer","1 - 25' HDMI","1 - 50' HDMI","3 - 50' XLR","3 - 100' XLR","3 - 50' Edison","2 - 25' Edison","1 - Tritap"])],
 ["OTO Pavilion 1258","",k(["1 - 8' Tripod Screen w/Skirt","1 - 3k Short Throw Projector","2 - AV Cart/Projector Stand w/Skirt","1 - Windows Laptop w/PPT","1 - Laptop Audio DI","2 - 8″ Powered Speaker w/Speaker Stand","1 - MX412 Podium Mic","1 - MX412 Table Mic","1 - 6 Channel Audio Mixer","1 - 25' HDMI","1 - 50' HDMI","3 - 50' XLR","4 - 100' XLR","3 - 50' Edison","2 - 25' Edison","1 - Tritap"])],
 ["Innovation Park","",k(["12 - 32″ Monitor w/Wall Mount/Bracket","12 - 10' HDMI"])],
 ["Booth 541","",k(["2 - Windows Laptop w/Mouse","1 - Laser Printer"])],
 ["Booth 2233","",k(["1 - 65″ TV w/Pole Stand","3 - 24″ Monitor w/TT Stand","1 - 25' HDMI","3 - 10' HDMI"])],
 ["Booth 641","",k(["2 - 8″ Powered Speaker w/Tripod Stand","1 - 6 Channel Mixer","1 - Wireless Combo RF Mic","2 - 25' HDMI","2 - 25' XLR","1 - 10' XLR","4 - 25' Edison","1 - Tritap"])]
];

function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

ROOMS.forEach(function(r,i){
  var o=document.createElement("option"); o.value=i; o.textContent=r[0]; sel.appendChild(o);
});

function show(i){
  var r=ROOMS[i], parts=(r[2]||"").split("|NOTE:"), items=parts[0]?parts[0].split(" | "):[], note=parts[1]||"";
  var h='<div class="card L sdi"><h4>'+esc(r[0])+'</h4>'+(r[1]?'<p>'+esc(r[1])+'</p>':'')+'</div>';
  if(items.length){
    h+='<div class="card">';
    items.forEach(function(t){
      var m=t.match(/^(\d+)\s*(?:x|-)\s+(.*)$/);
      if(m) h+='<div class="rfitem"><span class="rfqty">'+m[1]+'</span><span>'+esc(m[2])+'</span></div>';
      else h+='<div class="rfitem"><span class="rfqty"></span><span>'+esc(t)+'</span></div>';
    });
    h+='</div>';
  }
  if(note) h+='<p class="rfnote">⚠ '+esc(note)+'</p>';
  out.innerHTML=h;
}
sel.addEventListener("change",function(){show(+sel.value)});
show(0);
})();
