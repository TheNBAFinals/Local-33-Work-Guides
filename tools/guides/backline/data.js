var TABS=[["p-start","Start"],["p-kit","Drum Kit"],["p-sub","Drum Sub"],["p-inst","Instruments & DI"],["p-xlr","XLR Runs"],["p-sim","Simulator"],["p-drills","Drills"],["p-scen","Scenarios"]];

var CARDS=[
["What channel does kick usually go on?","<b>Channel 1.</b> It is the near-universal touring convention and the rest of the kit works outward from it. But the <b>input list</b> is the authority — if it says otherwise, it wins."],
["Standard 10-channel drum order?","1 Kick In · 2 Kick Out · 3 Snare Top · 4 Snare Bottom · 5 Hi-Hat · 6 Tom 1 · 7 Tom 2 · 8 Floor Tom · 9 OH L · 10 OH R."],
["What is a Veam box / drum sub?","A box of <b>numbered female XLR inputs</b> on or near the riser. Every drum mic lands in it and one <b>multipin</b> carries them all to the stage rack or FOH."],
["Inputs vs returns on a drum sub?","<b>Inputs are female</b> — mics plug in. <b>Returns are male</b> — they send signal back out to a drum fill or IEM pack."],
["What does a DI do?","Turns an instrument's <b>unbalanced, high-impedance ¼″</b> signal into a <b>balanced, low-impedance, mic-level XLR</b> signal that runs long distances cleanly."],
["The three connections on a DI?","<b>¼″ IN</b> from the instrument, <b>¼″ THRU</b> to the amp, <b>XLR OUT</b> to the stage box."],
["Passive vs active DI?","<b>Passive:</b> transformer, no power, rugged — bass, hot keys. <b>Active:</b> electronics, needs phantom or a battery — weak or piezo sources like acoustic pickups."],
["What does phantom power do and who needs it?","48 V DC from the console down pins 2 and 3. <b>Condensers and active DIs need it.</b> Dynamics don't care either way."],
["Is the Beta 91A a dynamic?","<b>No — it's a boundary condenser.</b> It needs phantom. People forget because it lives inside the kick."],
["Why flag ribbon mics to FOH?","Ribbons — especially vintage ones — can be damaged by phantom if a cable is miswired or shorted. Tell FOH and let them decide."],
["XLR pinout?","<b>Pin 1</b> shield/ground · <b>Pin 2</b> hot (+) · <b>Pin 3</b> cold (−). The console takes the difference of 2 and 3, so noise picked up on the run cancels."],
["Why is the snare bottom mic polarity-flipped?","It faces up while the top mic faces down, so they're in opposite polarity. Flipping the bottom (FOH does it) makes them add instead of cancel."],
["Overheads must be equidistant from what?","<b>The snare.</b> Unequal distance puts the two overheads out of time with each other on the snare and it goes thin and phasey. Measure it."],
["Why do keys need two channels?","Most keyboards are <b>stereo</b>. L and R each need a DI and a channel, always <b>adjacent</b>. Patch one side and half the sound is gone."],
["How do you mic a guitar cab?","<b>SM57</b>, 1–2″ off the grille, aimed at the cone. Centre = brighter and more bite; toward the edge = warmer."],
["First move on a hum from a DI'd instrument?","<b>Ground lift on the DI.</b> It breaks pin 1 on the XLR side. Never lift the safety ground on a power cord."],
["How do you coil XLR?","<b>Over-under.</b> Alternating loops lie flat and throw out straight. Coiling one direction twists the conductors and kills the cable."],
["Where does excess cable go?","<b>At the mic end.</b> Never as a loop in the middle of a walkway."],
["Line check finds a dead channel. Cheapest first?","Seat both ends → swap to a known-good cable → condenser? phantom on? → DI? ¼″ cable and instrument volume → move to a spare channel to split mic / cable / input."],
["A channel cuts in and out. What is it?","Almost always a <b>partly seated connector or a broken conductor</b>. Wiggle each end while FOH listens. If the fault follows the cable, bin and tag it."],
["Who sets gain, EQ and phantom?","<b>FOH / the audio department.</b> Your job ends at the stage box — but you tell them which channels need phantom."],
["Most common live tom mic?","<b>Sennheiser e604 / e904</b> clip-ons. Fast, no stand, stay in place. No phantom needed."]
];

var QS=[
{q:"The tour's input list puts Kick In on channel 2 and Kick Out on 1. What do you patch?",
  o:["Kick In on 1 — kick in always goes first","Exactly what the list says: Kick Out on 1, Kick In on 2","Whatever is quicker, then tell FOH","Both kicks on 1 with a Y-cable"],a:1,
  e:"<b>The input list is the law.</b> Kick-on-1 is a convention, and the order of the two kick mics varies tour to tour. FOH's console file is built on <i>their</i> list — patch to anything else and every channel is wrong."},
{q:"Hi-hat and both overheads come up dead at line check. Everything else works. Most likely?",
  o:["Three bad cables","Phantom is off on those channels","The drum sub has failed","The multipin is unseated"],a:1,
  e:"<b>Those are your three condensers.</b> A shared cause across exactly the mics that need 48 V points straight at phantom. A failed sub or multipin would take every channel, and three bad cables at once is unlikely. Tell FOH: “5, 9 and 10 are condensers — is phantom on?”"},
{q:"Which drum-sub connection is male?",
  o:["The inputs","The returns","Both","Neither — drum subs use TRS"],a:1,
  e:"<b>Returns are male</b> because they send signal <i>out</i>. Inputs are female so a mic cable's male end plugs into them."},
{q:"The bass player wants to hear their amp and FOH wants a DI. How is it cabled?",
  o:["Bass → amp → DI","Bass → DI IN, DI THRU → amp, DI XLR OUT → stage box","Bass → DI, amp gets an SM57 only","A Y-cable from the bass to both"],a:1,
  e:"<b>THRU exists for exactly this.</b> The DI sits between the instrument and the amp, the THRU passes the untouched signal on to the amp, and the balanced XLR goes to FOH."},
{q:"A DI'd keyboard has a steady hum. FOH asks you to sort it. First move?",
  o:["Lift the ground pin on the keyboard's power cord","Flip the ground lift switch on the DI","Swap the keyboard","Turn the channel down"],a:1,
  e:"<b>Ground lift on the DI</b> breaks the loop on the audio side and is safe. Defeating the safety ground on a power cord removes the fault path for the whole instrument — never do it."},
{q:"Snare sounds thin and hollow out front. Placement looks right. What do you ask FOH?",
  o:["Is the hi-hat mic too close?","Is the snare bottom polarity flipped?","Is the kick gated?","Is the snare mic a condenser?"],a:1,
  e:"<b>Top and bottom snare mics face opposite ways</b>, so un-flipped they cancel. The flip is FOH's job, but asking the question is yours. Also check the overheads are equidistant from the snare."},
{q:"Why must the two overheads be the same distance from the snare?",
  o:["So they look symmetrical on camera","So the snare arrives at both mics at the same time and doesn't cancel","Because condensers need matched cable lengths","So both share a mic stand"],a:1,
  e:"Sound travels about a foot per millisecond. If one overhead is further from the snare, its arrival is late relative to the other and frequencies cancel when they're summed. <b>Measure it.</b>"},
{q:"A keyboard player has one stereo keyboard. How many DIs and channels?",
  o:["One DI, one channel","Two DIs, two adjacent channels","One stereo DI, one channel","Two DIs, any two free channels"],a:1,
  e:"<b>Stereo means two.</b> L and R each need a DI and a channel, and they go on adjacent channels so FOH can link them as a pair."},
{q:"Which of these needs phantom power?",
  o:["SM57","Beta 52A","Beta 91A","e604"],a:2,
  e:"The <b>Beta 91A</b> is a boundary <b>condenser</b>. The other three are dynamics and don't need it."},
{q:"A channel crackles every time the drummer hits the floor tom. Most likely?",
  o:["The floor tom mic is overloading","A loose connector or damaged cable being knocked","Phantom is fluctuating","The multipin is too long"],a:1,
  e:"A fault that tracks <b>physical movement</b> is mechanical. Re-seat and lock both ends, and swap the cable if it continues. Then dress it so the drummer can't knock it."},
{q:"Where should spare XLR length be left?",
  o:["Coiled at the stage box","Coiled at the mic end","In a loop mid-run so it's easy to grab","Under the drum rug"],a:1,
  e:"<b>At the mic end.</b> Mid-run loops are trip hazards and snag points, and slack at the mic lets the drum tech move a stand without re-running cable."},
{q:"You're about to call ready for line check. What do you tell FOH first?",
  o:["Nothing — they'll find any problems","Which channels are condensers or active DIs and need phantom","Which cables are new","How long the multipin is"],a:1,
  e:"<b>Phantom first.</b> It saves the most common line-check failure before it happens and shows you know your patch."}
];

var CHAINS=[
{t:"Drum mic to console",
  s:["Mic on the drum","XLR (male end at the box)","Drum sub input","Multipin","Stage rack / splitter","Console channel"],
  w:"Every link is a place a fault can live. Line check walks this path one channel at a time."},
{t:"Bass with DI and amp",
  s:["Bass guitar","¼″ cable","DI IN","DI THRU → bass amp","DI XLR OUT","Stage box channel"],
  w:"The THRU keeps the player's rig working; the XLR gives FOH a clean balanced feed."},
{t:"Cabling a drum sub",
  s:["Get the input list","Find the box position","Place mics and DIs","Run XLR to the box","Patch to the list","Label the box end","Tell FOH which need phantom","Call ready for line check"],
  w:"Mics first, then cable, then patch — and phantom is called out before the check, not discovered during it."},
{t:"Dead channel — cheapest check first",
  s:["Seat both ends","Swap to a known-good cable","Condenser? Ask about phantom","DI? Check the ¼″ and instrument volume","Move to a spare channel","Swap the mic"],
  w:"Every step costs more than the one before it. Swapping hardware confirms a diagnosis; it doesn't make one."}
];

var CK=[];

var SCN=[
{w:"Club show · line check in 10 minutes",
  q:"You've patched the drum sub from memory using the standard order. The A1 hands you their input list: no hi-hat mic, a ride on 5, and two floor toms on 8 and 9 with overheads on 10 and 11. What now?",
  a:"<b>Re-patch to their list before line check — not during it.</b><br><br><b>1.</b> Ride goes on 5, so the hi-hat mic stand comes out entirely (ask before you strike it — sometimes it stays for a later act).<br><b>2.</b> Floor tom 2 lands on 9, so the overheads move up to 10 and 11. On a 10-input sub that means one overhead has to go on the next box or a spare snake line — <b>ask the A1 where they want 11</b>.<br><b>3.</b> Re-label the box end. Old labels on moved channels are worse than no labels.<br><b>4.</b> Tell FOH: “Ride on 5 and overheads on 10 and 11 are condensers.”<br><br><b>The lesson:</b> the standard order is where you start when there's no list. When there is one, it's the only thing that matters."},
{w:"Festival changeover · 15 minutes",
  q:"The kit rolls on a riser pre-mic'd from the side stage. Line check: 1 through 4 fine, 6 dead, everything else fine. FOH is staring at you.",
  a:"<b>One channel dead with neighbours alive means the fault is on that one path.</b><br><br><b>1. Look at it.</b> Rolling risers knock connectors loose. Re-seat both ends of the cable on 6 and lock the latch at the mic.<br><b>2. Still dead? Swap the cable</b> for a known-good one — have spares coiled at the riser before every changeover.<br><b>3. Still dead?</b> Plug the tom mic into a spare input. If it works there, input 6 on the sub is the problem — tell FOH it's moved and tape over the bad input.<br><b>4. Dead everywhere?</b> It's the mic — swap it.<br><br><b>Talk while you work:</b> “Re-seating 6… swapping cable on 6…” keeps FOH from guessing and lets them check other channels meanwhile."},
{w:"Corporate band · hotel ballroom",
  q:"The keyboard player shows up with two keyboards. The input list has Keys on 15 and 16. You have four DIs. What do you check before you patch?",
  a:"<b>Two keyboards that are each stereo is four channels, not two.</b><br><br>Ask the A1 straight away: <b>“Two boards — do you want both in stereo, or are they summed on a sub-mixer on stage?”</b><br><br>• If the player brought a <b>small keys mixer</b>, it outputs one stereo pair — two DIs on 15 and 16 as listed.<br>• If not, you need <b>four adjacent channels</b>: Keys 1 L/R and Keys 2 L/R. That means the A1 has to free up two inputs, and they'll want to know now, not at line check.<br><br>Either way, patch L before R on adjacent channels so FOH can link them."},
{w:"Rock show · doors in an hour",
  q:"Soundcheck: FOH reports a 60-cycle hum on the bass DI that goes away when the player touches the strings.",
  a:"<b>Classic ground loop between the bass rig and the audio system.</b><br><br><b>1. Ground lift on the DI.</b> Breaks pin 1 on the XLR side — safe, and usually the fix.<br><b>2. Check the bass amp's power.</b> If it's on a different circuit or a lighting stinger, move it to the audio power drop.<br><b>3. Re-route the XLR</b> away from any power runs — cross at 90°.<br><br><b>What you never do:</b> cheat the safety ground on the amp's power cord with a ground-lift adapter. That removes the fault path for the whole amp, and the player is holding metal strings connected to it."}
];
