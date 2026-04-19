const cameras=["Front Door","Parking","Office"];
const people=["John","Alice","Unknown"];
const homeDiv=document.getElementById("homeSecurity");
const ledger=document.querySelector("#ledger tbody");

let entry=0, exit=0, unknown=0;

function add(id,text,time){
  const div=document.createElement("div");
  div.className="alert";
  div.innerHTML=`${text}<div class="time">${time}</div>`;
  const el=document.getElementById(id);
  el.prepend(div);
  if(el.children.length>10) el.removeChild(el.lastChild);
}

function log(e){
  const row=document.createElement("tr");
  row.innerHTML=`<td>${e.time}</td><td>${e.type}</td><td>${e.source}</td>`;
  ledger.prepend(row);
  if(ledger.children.length>10) ledger.removeChild(ledger.lastChild);
}

setInterval(()=>{
  const cam=cameras[Math.floor(Math.random()*cameras.length)];
  const time=new Date().toLocaleTimeString();
  const mode=Math.floor(Math.random()*4);

  if(mode===0){
    const name=people[Math.floor(Math.random()*people.length)];
    const known=name!=="Unknown";
    const type=Math.random()>0.5?"entry":"exit";

    add("homeSecurity",`<b>${name}</b> (${known?"Known":"Unknown"})<br>${type} | ${cam}`,time);
    add("entryExit",`${name} ${type} - ${cam}`,time);

    if(type==="entry"){entry++; document.getElementById("totalEntry").innerText=entry;}
    else{exit++; document.getElementById("totalExit").innerText=exit;}

    if(!known){unknown++; document.getElementById("unknownCount").innerText=unknown;}

    log({time,type,source:name});
  }

  if(mode===1){
    const t=["fire","fight","crowd"];
    const type=t[Math.floor(Math.random()*t.length)];
    add("threats",`${type} - ${cam}`,time);
    log({time,type,source:cam});
  }

  if(mode===2){
    const t=["crash","distance"];
    const type=t[Math.floor(Math.random()*t.length)];
    add("dashcam",`${type} - ${cam}`,time);
    log({time,type,source:cam});
  }

  if(mode===3){
    const t=["object","missing","unattended"];
    const type=t[Math.floor(Math.random()*t.length)];
    add("assets",`${type} - ${cam}`,time);
    log({time,type,source:cam});
  }

},2000);
