let entry=0,exit=0,unknown=0;

const cams=["Front Door","Parking","Office"];
const people=["John","Alice","Unknown"];

function add(id,text){
  const div=document.createElement("div");
  div.className="alert";
  div.innerText=text;
  const el=document.getElementById(id);
  el.prepend(div);
  if(el.children.length>10) el.removeChild(el.lastChild);
}

function log(type,src,time){
  const row=document.createElement("tr");
  row.innerHTML=`<td>${time}</td><td>${type}</td><td>${src}</td>`;
  const table=document.querySelector("#ledger tbody");
  table.prepend(row);
  if(table.children.length>10) table.removeChild(table.lastChild);
}

setInterval(()=>{
  const cam=cams[Math.floor(Math.random()*3)];
  const time=new Date().toLocaleTimeString();
  const mode=Math.floor(Math.random()*4);

  if(mode===0){
    const name=people[Math.floor(Math.random()*3)];
    const type=Math.random()>0.5?"entry":"exit";

    add("home",`${name} ${type} - ${cam}`);

    if(type==="entry"){entry++;document.getElementById("entry").innerText=entry;}
    else{exit++;document.getElementById("exit").innerText=exit;}

    if(name==="Unknown"){unknown++;document.getElementById("unknown").innerText=unknown;}

    log(type,name,time);
  }

  if(mode===1){add("threat","Fire - "+cam);log("fire",cam,time);}
  if(mode===2){add("dash","Crash - "+cam);log("crash",cam,time);}
  if(mode===3){add("asset","Object - "+cam);log("object",cam,time);}

},2000);
