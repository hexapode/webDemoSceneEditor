import { WZ4_OPERATORS, WZ4_OPERATOR_COUNT } from "./operator-manifest.js";
import { exportExecutableJpeg } from "./exporter.js";
import { TUTORIALS } from "./tutorials.js";
import { BUILTIN_DEMOS } from "./demos.js";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const coreOperatorCatalog = [
  { category: "GENERATORS", items: [["Primitive", "◇", "scene"], ["Text", "T", "scene"], ["Grid Array", "▦", "scene"], ["Fractal", "✣", "scene"]] },
  { category: "MODIFIERS", items: [["Transform", "⌖", "scene"], ["Twist", "⟲", "scene"], ["Displace", "≋", "scene"], ["Mirror", "◫", "scene"]] },
  { category: "MATERIALS", items: [["Iridescent", "◈", "material"], ["Emission", "✦", "material"], ["Glass", "♢", "material"], ["Normal Map", "↗", "material"]] },
  { category: "TEXTURE LAB", items: [["Animated Noise", "≈", "texture"], ["Domain Warp", "⌁", "texture"], ["Kaleidoscope", "✣", "texture"], ["Palette Map", "◈", "texture"], ["Texture Output", "▣", "texture"]] },
  { category: "SIGNALS", items: [["Beat", "⌁", "signal"], ["Sine", "∿", "signal"], ["Envelope", "⌁", "signal"], ["Noise", "⌇", "signal"]] },
  { category: "AUDIO", items: [["Drum Machine", "◫", "audio"], ["Bass Synth", "≋", "audio"], ["Lowpass", "∿", "audio"], ["Delay", "↻", "audio"]] },
  { category: "POST PROCESS", items: [["Bloom", "✺", "post"], ["Chromatic", "◉", "post"], ["Vignette", "◌", "post"], ["Film Grain", "⠿", "post"]] }
];
const operatorById=new Map(WZ4_OPERATORS.map(op=>[op.id,op]));
const familyStyle={"Bitmap & Texture":["▧","texture"],"Mesh & Geometry":["◇","scene"],"Particles & Simulation":["✣","post"],"Material & Shading":["◈","material"],"Scene & Render":["◉","scene"],"Animation & Control":["⌁","signal"],"Audio Analysis":["♪","audio"],"Utility & Project FX":["⌘","post"]};
const compatibilityCatalog=[...new Set(WZ4_OPERATORS.map(op=>op.family))].map(family=>({category:`WZ4 • ${family.toUpperCase()}`,compat:true,items:WZ4_OPERATORS.filter(op=>op.family===family).map(op=>[op.name,...familyStyle[family],"schema",op.id])}));
const operatorCatalog=[...coreOperatorCatalog,...compatibilityCatalog];

const defaultNodes = [
  { id:"SIG_01", name:"Beat Pulse", type:"SIGNAL OPERATOR", kind:"Beat", x:35,y:40,color:"#55d887", value:"128 BPM", enabled:true },
  { id:"GEO_02", name:"Torus Field", type:"GEOMETRY OPERATOR", kind:"Primitive", x:205,y:28,color:"#5da7ff", value:"48 × 16 SEG", enabled:true },
  { id:"MOD_03", name:"Infinite Twist", type:"MODIFIER OPERATOR", kind:"Twist", x:375,y:54,color:"#25c9cd", value:"1.40 RAD", enabled:true },
  { id:"MAT_04", name:"Iridescent Metal", type:"MATERIAL OPERATOR", kind:"Iridescent", x:545,y:35,color:"#ff6d42", value:"METALLIC", enabled:true },
  { id:"CAM_06", name:"Orbit Camera", type:"SCENE OPERATOR", kind:"Camera", x:375,y:145,color:"#f1b85b", value:"35 MM", enabled:true },
  { id:"OUT_07", name:"Main Output", type:"OUTPUT OPERATOR", kind:"Output", x:715,y:152,color:"#ff5a36", value:"1280 × 720", enabled:true }
];
const defaultConnections = [["SIG_01","MOD_03"],["GEO_02","MOD_03"],["MOD_03","MAT_04"],["MAT_04","OUT_07"],["CAM_06","OUT_07"]];
const defaultPostNodes=[
  {id:"POST_01",name:"Scene Color",type:"RENDER INPUT",kind:"Scene Input",x:35,y:58,color:"#5da7ff",value:"HDR",enabled:true},
  {id:"POST_02",name:"Hot Bloom",type:"POST FX OPERATOR",kind:"Bloom",x:195,y:34,color:"#9b7bff",value:"0.72 INT",enabled:true},
  {id:"POST_03",name:"Color Grade",type:"POST FX OPERATOR",kind:"Color Grade",x:355,y:62,color:"#ff6d42",value:"FILMIC",enabled:true},
  {id:"POST_04",name:"Vignette",type:"POST FX OPERATOR",kind:"Vignette",x:515,y:40,color:"#9b7bff",value:"0.17",enabled:true},
  {id:"POST_05",name:"Final Image",type:"RENDER OUTPUT",kind:"Output",x:675,y:68,color:"#55d887",value:"DISPLAY",enabled:true}
];
const defaultPostConnections=[["POST_01","POST_02"],["POST_02","POST_03"],["POST_03","POST_04"],["POST_04","POST_05"]];
const defaultAudioNodes=[
  {id:"AUDIO_01",name:"Beat Clock",type:"AUDIO CONTROL",kind:"Beat",x:35,y:58,color:"#55d887",value:"128 BPM",enabled:true},
  {id:"AUDIO_02",name:"Drum Machine",type:"AUDIO OPERATOR",kind:"Drum Machine",x:195,y:34,color:"#55d887",value:"16 STEPS",enabled:true},
  {id:"AUDIO_03",name:"Demo Bass",type:"AUDIO OPERATOR",kind:"Bass Synth",x:355,y:62,color:"#25c9cd",value:"C MINOR",enabled:true},
  {id:"AUDIO_04",name:"Lowpass",type:"AUDIO OPERATOR",kind:"Lowpass",x:515,y:40,color:"#f1b85b",value:"920 HZ",enabled:true},
  {id:"AUDIO_05",name:"Master Output",type:"AUDIO OUTPUT",kind:"Audio Output",x:675,y:68,color:"#ff6d42",value:"-7.5 DB",enabled:true}
];
const defaultAudioConnections=[["AUDIO_01","AUDIO_02"],["AUDIO_01","AUDIO_03"],["AUDIO_02","AUDIO_04"],["AUDIO_03","AUDIO_04"],["AUDIO_04","AUDIO_05"]];
const defaultTextureNodes = [
  { id:"TEX_01", name:"Flow Noise", type:"TEXTURE GENERATOR", kind:"Animated Noise", x:35,y:54,color:"#25c9cd",value:"5 OCT",enabled:true },
  { id:"TEX_02", name:"Liquid Warp", type:"TEXTURE MODIFIER", kind:"Domain Warp", x:195,y:32,color:"#5da7ff",value:"1.15 AMT",enabled:true },
  { id:"TEX_03", name:"Radial Fold", type:"TEXTURE MODIFIER", kind:"Kaleidoscope", x:355,y:60,color:"#9b7bff",value:"6 SIDES",enabled:true },
  { id:"TEX_04", name:"Neon Palette", type:"TEXTURE COLOR", kind:"Palette Map", x:515,y:38,color:"#ff6d42",value:"2 COLORS",enabled:true },
  { id:"TEX_05", name:"Material Map", type:"TEXTURE OUTPUT", kind:"Texture Output", x:675,y:72,color:"#55d887",value:"ANIMATED",enabled:true }
];
const defaultTextureConnections=[["TEX_01","TEX_02"],["TEX_02","TEX_03"],["TEX_03","TEX_04"],["TEX_04","TEX_05"]];
const defaults = { shapeMode:0,color:"#ff583e", accent:"#20bed0", metallic:0.91, roughness:0.24, twist:1.4, bloom:0.72, vignette:.17, pulse:0.34, scale:1, exposure:1.15, texScale:3.8, texSpeed:.32, texWarp:1.15, texContrast:1.45, texKaleido:6, texMix:.72, audioCutoff:920, audioDecay:0.32, audioDelay:0.18, audioDrive:0.4 };
let state = { nodes: structuredClone(defaultNodes), connections: structuredClone(defaultConnections),textureNodes:structuredClone(defaultTextureNodes),textureConnections:structuredClone(defaultTextureConnections),postNodes:structuredClone(defaultPostNodes),postConnections:structuredClone(defaultPostConnections),audioNodes:structuredClone(defaultAudioNodes),audioConnections:structuredClone(defaultAudioConnections),graphMode:"scene",params:{...defaults}, audio:{enabled:false,volume:.42}, selected:"MAT_04", playing:true, looping:true, duration:12, time:0, bpm:128, zoom:1, history:[] };
let glState = null, lastFrame = performance.now(), fpsSmooth = 60, orbit = { yaw:0.15, pitch:0.1, distance:4.5 }, draggingNode = null, connectingPort = null;
const audioEngine = { ctx:null, master:null, analyser:null, noise:null, nextTime:0, step:0, spectrum:null };
let activeTutorial=null,tutorialStep=0,tutorialNavTime=0;

function renderLibrary(filter="") {
  $("#operatorList").innerHTML = operatorCatalog.map(group => {
    const items = group.items.filter(i => i[0].toLowerCase().includes(filter.toLowerCase()));
    if (!items.length) return "";
    return `<section class="op-category ${group.compat?"compat-category":""}"><button><span>⌄ ${group.category}</span><span>${items.length}</span></button><div class="op-items" ${group.compat&&!filter?"hidden":""}>${items.map(i=>{const spec=i[4]?operatorById.get(i[4]):null;return `<button class="op" draggable="false" data-drag="operator" data-kind="${i[0]}" ${i[4]?`data-opid="${i[4]}"`:""} title="${spec?`${spec.output} ${spec.symbol}(${spec.inputs}) · ${spec.module}`:i[0]}"><span class="op-icon ${i[2]}">${i[1]}</span><span>${i[0]}</span>${i[3]?`<small>${i[3]}</small>`:""}</button>`}).join("")}</div></section>`;
  }).join("");
  $$(".op", $("#operatorList")).forEach(bindOperatorCard);
  $$(".op-category>button").forEach(b=>b.onclick=()=>b.nextElementSibling.hidden=!b.nextElementSibling.hidden);
  $("#operatorCount").textContent=`${WZ4_OPERATOR_COUNT} WZ4 OPS`;
}

function currentNodes(){return state.graphMode==="textures"?state.textureNodes:state.graphMode==="post"?state.postNodes:state.graphMode==="audio"?state.audioNodes:state.nodes;}
function currentConnections(){return state.graphMode==="textures"?state.textureConnections:state.graphMode==="post"?state.postConnections:state.graphMode==="audio"?state.audioConnections:state.connections;}
function allNodes(){return [...state.nodes,...state.textureNodes,...state.postNodes,...state.audioNodes];}
function nodeMarkup(n) { return `<div class="node ${n.id===state.selected?"selected":""}" data-id="${n.id}" style="left:${n.x}px;top:${n.y}px;--node-color:${n.color};opacity:${n.enabled?1:.45}"><i class="port in" title="Input · drag to connect"></i><i class="port out" title="Output · drag to connect"></i><div class="node-head"><i></i><span>${n.name.toUpperCase()}</span></div><div class="node-preview">${n.kind.toUpperCase()}</div><div class="node-meta"><span>${n.id}</span><span>${n.value}</span></div></div>`; }
function setCurrentConnections(connections){
  if(state.graphMode==="textures")state.textureConnections=connections;
  else if(state.graphMode==="post")state.postConnections=connections;
  else if(state.graphMode==="audio")state.audioConnections=connections;
  else state.connections=connections;
}
function constrainGraphNodes(){
  const canvas=$("#graphCanvas");if(!canvas)return;
  $$(".node",canvas).forEach(element=>{const node=currentNodes().find(item=>item.id===element.dataset.id);if(!node)return;const maxX=Math.max(0,canvas.clientWidth/state.zoom-element.offsetWidth),maxY=Math.max(0,canvas.clientHeight/state.zoom-element.offsetHeight);node.x=Math.max(0,Math.min(maxX,node.x));node.y=Math.max(0,Math.min(maxY,node.y));element.style.left=`${node.x}px`;element.style.top=`${node.y}px`;});
}
function finishConnection(event){
  if(!connectingPort||event.pointerId!==connectingPort.pointerId)return;
  const source=connectingPort,target=event.type==="pointercancel"?null:document.elementFromPoint(event.clientX,event.clientY)?.closest(".port");
  const targetNode=target?.closest(".node")?.dataset.id,targetDirection=target?.classList.contains("out")?"out":"in";
  if(target&&targetNode&&targetNode!==source.nodeId&&targetDirection!==source.direction){
    const from=source.direction==="out"?source.nodeId:targetNode,to=source.direction==="in"?source.nodeId:targetNode;
    const existing=currentConnections(),duplicate=existing.some(([a,b])=>a===from&&b===to);
    if(!duplicate){setCurrentConnections([...existing.filter(([,b])=>b!==to),[from,to]]);autosave();}
  }
  window.removeEventListener("pointermove",moveConnection);window.removeEventListener("pointerup",finishConnection);window.removeEventListener("pointercancel",finishConnection);
  $("#graphCanvas").classList.remove("connecting");connectingPort=null;drawWires();
}
function moveConnection(event){if(!connectingPort||event.pointerId!==connectingPort.pointerId)return;connectingPort.clientX=event.clientX;connectingPort.clientY=event.clientY;drawWires();}
function startConnection(event,nodeId,direction){
  if(event.button!==0)return;event.preventDefault();event.stopPropagation();connectingPort={nodeId,direction,pointerId:event.pointerId,clientX:event.clientX,clientY:event.clientY};
  $("#graphCanvas").classList.add("connecting");window.addEventListener("pointermove",moveConnection);window.addEventListener("pointerup",finishConnection);window.addEventListener("pointercancel",finishConnection);drawWires();
}
function renderGraph() {
  $("#nodes").innerHTML = currentNodes().map(nodeMarkup).join("");
  $$(".node").forEach(el => {
    el.onpointerdown = e => {
      selectNode(el.dataset.id);
      if(e.button!==0||e.target.closest(".port"))return;
      e.preventDefault();const n=currentNodes().find(x=>x.id===el.dataset.id),pointerId=e.pointerId,canvas=$("#graphCanvas");draggingNode={n,startX:n.x,startY:n.y,pointerX:e.clientX,pointerY:e.clientY,el};el.classList.add("dragging");
      const move=event=>{if(!draggingNode||event.pointerId!==pointerId)return;const maxX=Math.max(0,canvas.clientWidth/state.zoom-el.offsetWidth),maxY=Math.max(0,canvas.clientHeight/state.zoom-el.offsetHeight);draggingNode.n.x=Math.max(0,Math.min(maxX,draggingNode.startX+(event.clientX-draggingNode.pointerX)/state.zoom));draggingNode.n.y=Math.max(0,Math.min(maxY,draggingNode.startY+(event.clientY-draggingNode.pointerY)/state.zoom));el.style.left=draggingNode.n.x+"px";el.style.top=draggingNode.n.y+"px";drawWires();};
      const up=event=>{if(!draggingNode||event.pointerId!==pointerId)return;el.classList.remove("dragging");draggingNode=null;window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up);window.removeEventListener("pointercancel",up);autosave();};window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);window.addEventListener("pointercancel",up);
    };
    $$(".port",el).forEach(port=>port.onpointerdown=event=>startConnection(event,el.dataset.id,port.classList.contains("out")?"out":"in"));
  });
  requestAnimationFrame(()=>{constrainGraphNodes();drawWires();});
}
function drawWires() {
  const area=$("#graphCanvas").getBoundingClientRect();
  const paths=currentConnections().map(([a,b],i)=>{
    const from=$(`.node[data-id="${a}"] .port.out`), to=$(`.node[data-id="${b}"] .port.in`); if(!from||!to)return"";
    const ar=from.getBoundingClientRect(), br=to.getBoundingClientRect(), x1=ar.left-area.left+4,y1=ar.top-area.top+4,x2=br.left-area.left+4,y2=br.top-area.top+4, d=Math.max(35,Math.abs(x2-x1)*.48);
    return `<path class="wire ${i>2?"hot":""}" data-wire="${i}" d="M${x1},${y1} C${x1+d},${y1} ${x2-d},${y2} ${x2},${y2}"/>`;
  });
  if(connectingPort){const port=$(`.node[data-id="${connectingPort.nodeId}"] .port.${connectingPort.direction}`),rect=port?.getBoundingClientRect();if(rect){const px=rect.left-area.left+4,py=rect.top-area.top+4,cx=connectingPort.clientX-area.left,cy=connectingPort.clientY-area.top,x1=connectingPort.direction==="out"?px:cx,y1=connectingPort.direction==="out"?py:cy,x2=connectingPort.direction==="out"?cx:px,y2=connectingPort.direction==="out"?cy:py,d=Math.max(35,Math.abs(x2-x1)*.48);paths.push(`<path class="wire preview" d="M${x1},${y1} C${x1+d},${y1} ${x2-d},${y2} ${x2},${y2}"/>`);}}
  $("#wires").innerHTML=paths.join("");
  $$('[data-wire]',$("#wires")).forEach(path=>path.ondblclick=event=>{event.stopPropagation();const index=Number(path.dataset.wire),next=currentConnections().filter((_,i)=>i!==index);setCurrentConnections(next);drawWires();autosave();});
}
function selectNode(id){state.selected=id;$$('.node').forEach(node=>node.classList.toggle('selected',node.dataset.id===id));renderInspector();}

const paramDefinitions = {
  Iridescent:[["Metallic","metallic",0,1,.01],["Roughness","roughness",0,1,.01],["Pulse","pulse",0,1,.01],["Exposure","exposure",.2,2,.01]],
  Twist:[["Amount","twist",0,3,.01],["Scale","scale",.4,2,.01],["Pulse","pulse",0,1,.01]],
  Bloom:[["Intensity","bloom",0,1.5,.01],["Exposure","exposure",.2,2,.01]],
  "Color Grade":[["Exposure","exposure",.2,2,.01],["Contrast","texContrast",.4,3,.01]],
  Vignette:[["Amount","vignette",0,.8,.01],["Exposure","exposure",.2,2,.01]],
  Beat:[["Amplitude","pulse",0,1,.01],["Rate","twist",0,3,.01]],
  Primitive:[["Scale","scale",.4,2,.01],["Detail","roughness",0,1,.01]],
  "Drum Machine":[["Decay","audioDecay",.08,.8,.01],["Drive","audioDrive",0,1,.01]],
  "Bass Synth":[["Cutoff","audioCutoff",120,4800,10],["Decay","audioDecay",.08,.8,.01],["Drive","audioDrive",0,1,.01]],
  Lowpass:[["Cutoff","audioCutoff",120,4800,10],["Resonance","audioDrive",0,1,.01]],
  Delay:[["Feedback","audioDelay",0,.75,.01],["Mix","audioDrive",0,1,.01]]
  ,"Animated Noise":[["Frequency","texScale",.5,10,.05],["Speed","texSpeed",-.5,2,.01],["Contrast","texContrast",.4,3,.01]]
  ,"Domain Warp":[["Amount","texWarp",0,3,.01],["Frequency","texScale",.5,10,.05],["Speed","texSpeed",-.5,2,.01]]
  ,Kaleidoscope:[["Segments","texKaleido",2,16,1],["Rotation","texSpeed",-.5,2,.01],["Warp","texWarp",0,3,.01]]
  ,"Palette Map":[["Contrast","texContrast",.4,3,.01],["Material mix","texMix",0,1,.01],["Speed","texSpeed",-.5,2,.01]]
  ,"Texture Output":[["Material mix","texMix",0,1,.01],["Scale","texScale",.5,10,.05]]
};
function renderInspector(){
  const n=allNodes().find(x=>x.id===state.selected)||currentNodes()[0]; if(!n)return;
  $("#nodeId").textContent=n.id; $("#inspectorName").textContent=n.name; $("#inspectorType").textContent=n.type;
  $("#enableNode").classList.toggle("active",n.enabled);
  const params=paramDefinitions[n.kind]||(n.compat?[]:paramDefinitions.Iridescent);
  const textureOperator=state.textureNodes.some(x=>x.id===n.id),accentRow=textureOperator&&!n.compat?`<div class="param-row"><span>Accent</span><div class="color-row" style="grid-column:2/4"><input id="accentColor" type="color" value="${state.params.accent}"><input class="color-code" value="${state.params.accent.toUpperCase()}" readonly></div></div>`:"";
  const compatibility=n.compat?`<div class="compat-banner"><strong>SCHEMA COMPATIBLE · RUNTIME PORT REQUIRED</strong><code>${n.compat.output} ${n.compat.symbol}(${n.compat.inputs})</code>${n.compat.module} · ${n.compat.source}:${n.compat.line}</div>`:"",baseRow=n.compat?"":`<div class="param-row"><span>Base color</span><div class="color-row" style="grid-column:2/4"><input id="baseColor" type="color" value="${state.params.color}"><input class="color-code" value="${state.params.color.toUpperCase()}" readonly></div></div>`;
  $("#inspectorContent").innerHTML=`${compatibility}<section class="inspector-section"><button class="section-head"><span>${n.compat?"OPERATOR SCHEMA":textureOperator?"TEXTURE PARAMETERS":"APPEARANCE"}</span><span>⌃</span></button><div class="section-content">${baseRow}${accentRow}${params.map(([label,key,min,max,step])=>`<label class="param-row"><span>${label}</span><input type="range" data-param="${key}" min="${min}" max="${max}" step="${step}" value="${state.params[key]}"><input class="param-value" data-value="${key}" value="${Number(state.params[key]).toFixed(2)}"></label>`).join("")}${n.compat?`<div class="param-row"><span>Output</span><div class="param-value" style="grid-column:2/4;text-align:left">${n.compat.output}</div></div><div class="param-row"><span>Inputs</span><div class="param-value" style="grid-column:2/4;text-align:left;overflow:hidden">${n.compat.inputs||"none"}</div></div>`:""}</div></section><section class="inspector-section"><button class="section-head"><span>ANIMATION</span><span>⌃</span></button><div class="section-content"><div class="param-row"><span>Time source</span><div class="param-value" style="grid-column:2/4;text-align:left">GLOBAL / BEAT</div></div><div class="param-row"><span>Phase</span><input type="range" min="0" max="1" step=".01" value=".25"><span class="param-value">0.25</span></div></div></section>`;
  if($("#baseColor"))$("#baseColor").oninput=e=>{state.params.color=e.target.value;e.target.nextElementSibling.value=e.target.value.toUpperCase();autosave();};
  if($("#accentColor"))$("#accentColor").oninput=e=>{state.params.accent=e.target.value;e.target.nextElementSibling.value=e.target.value.toUpperCase();autosave();};
  $$('[data-param]').forEach(r=>r.oninput=e=>{const k=e.target.dataset.param;state.params[k]=Number(e.target.value);$(`[data-value="${k}"]`).value=Number(e.target.value).toFixed(2);autosave();});
}

function addNode(kind,position){
  const all=operatorCatalog.flatMap(g=>g.items), item=all.find(x=>x[0]===kind)||[kind,"◇","scene"],mode=item[2]==="texture"?"textures":item[2]==="post"?"post":item[2]==="audio"?"audio":"scene",target=mode==="textures"?state.textureNodes:mode==="post"?state.postNodes:mode==="audio"?state.audioNodes:state.nodes,idx=target.length+1;
  if(mode!==state.graphMode)switchGraphMode(mode);
  const colors={material:"#ff6d42",post:"#9b7bff",signal:"#55d887",scene:"#5da7ff",audio:"#55d887",texture:"#25c9cd"};
  const id=`OP_${String(allNodes().length+1).padStart(3,"0")}`, n={id,name:kind,type:`${item[2].toUpperCase()} OPERATOR`,kind,x:position?.x??120+(idx*47)%480,y:position?.y??45+(idx*31)%120,color:colors[item[2]],value:"LIVE",enabled:true};
  target.push(n);state.selected=id;$("#addMenu").hidden=true;renderGraph();renderInspector();autosave();
}
function addCompatibilityNode(spec,position){
  if(!spec)return;const mode=spec.family==="Bitmap & Texture"?"textures":spec.family==="Audio Analysis"?"audio":"scene",target=mode==="textures"?state.textureNodes:mode==="audio"?state.audioNodes:state.nodes,idx=allNodes().length+1;if(mode!==state.graphMode)switchGraphMode(mode);
  const colors={"Bitmap & Texture":"#25c9cd","Mesh & Geometry":"#5da7ff","Particles & Simulation":"#9b7bff","Material & Shading":"#ff6d42","Scene & Render":"#f1b85b","Animation & Control":"#55d887","Audio Analysis":"#55d887","Utility & Project FX":"#9b7bff"};
  const id=`WZ_${String(idx).padStart(3,"0")}`,n={id,name:spec.name,type:`${spec.output} OPERATOR`,kind:spec.symbol,x:position?.x??80+(idx*43)%540,y:position?.y??35+(idx*29)%125,color:colors[spec.family],value:"SCHEMA",enabled:true,compat:{...spec}};
  target.push(n);state.selected=id;$("#addMenu").hidden=true;renderGraph();renderInspector();autosave();
}
function removeSelected(){const list=currentNodes();if(list.length<2)return;const filtered=list.filter(n=>n.id!==state.selected);if(state.graphMode==="textures"){state.textureNodes=filtered;state.textureConnections=state.textureConnections.filter(c=>!c.includes(state.selected));}else if(state.graphMode==="post"){state.postNodes=filtered;state.postConnections=state.postConnections.filter(c=>!c.includes(state.selected));}else if(state.graphMode==="audio"){state.audioNodes=filtered;state.audioConnections=state.audioConnections.filter(c=>!c.includes(state.selected));}else{state.nodes=filtered;state.connections=state.connections.filter(c=>!c.includes(state.selected));}state.selected=currentNodes()[0].id;renderGraph();renderInspector();autosave();}

function switchGraphMode(mode){
  state.graphMode=["scene","textures","post","audio"].includes(mode)?mode:"scene";state.selected=currentNodes()[0]?.id;const badge=$("#textureModeBadge"),labels={textures:["TEXTURE OUTPUT","ANIMATED · GPU"],post:["POST PROCESS","LIVE · GPU"],audio:["AUDIO GRAPH","WEB AUDIO · 128 BPM"]};badge.hidden=state.graphMode==="scene";if(labels[state.graphMode]){$("span",badge).textContent=labels[state.graphMode][0];$("b",badge).textContent=labels[state.graphMode][1];}renderGraph();renderInspector();
}

function initTimeline(){
  const tracks=[["CAMERA / ORBIT","#f1b85b"],["AUDIO / DEMO SYNTH","#55d887"],["MATERIAL / PULSE","#ff6d42"],["POST / BLOOM","#9b7bff"]];
  $("#trackNames").innerHTML=tracks.map(t=>`<div class="track-name" style="--track-color:${t[1]}"><i></i>${t[0]}<span>◆</span></div>`).join("");
  $("#ruler").innerHTML=Array.from({length:13},(_,i)=>`<span>${String(i).padStart(2,"0")}</span>`).join("");
  $("#clips").innerHTML=tracks.map((t,i)=>`<div class="clip" style="--track-color:${t[1]};left:${i*7+2}%;width:${82-i*8}%">${["ORBIT_01","DRUMS + BASS","BEAT MOD","BLOOM RISE"][i]}<b></b></div>`).join("");
  $("#trackArea").onpointerdown=e=>{const r=e.currentTarget.getBoundingClientRect();state.time=Math.max(0,Math.min(state.duration,(e.clientX-r.left)/r.width*state.duration));updateTransport();};
}
function updateTransport(){
  const totalFrames=Math.floor(state.time*60), sec=Math.floor(totalFrames/60), frame=totalFrames%60;
  $("#timecode").textContent=`00:${String(sec).padStart(2,"0")}:${String(frame).padStart(2,"0")}`;$("#playhead").style.left=`${state.time/state.duration*100}%`;
}
function togglePlay(force){
  state.playing=force??!state.playing;
  $("#playBtn").textContent=state.playing?"❚❚":"▶";$("#runBtn .play-symbol").textContent=state.playing?"■":"▶";
  if(audioEngine.ctx){
    if(state.playing&&state.audio.enabled){audioEngine.ctx.resume();resetAudioClock();setAudioGain(state.audio.volume);}
    else setAudioGain(0);
  }
}

async function ensureAudio(){
  if(audioEngine.ctx)return audioEngine.ctx;
  const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return null;
  const ctx=new AudioContext(),master=ctx.createGain(),compressor=ctx.createDynamicsCompressor(),analyser=ctx.createAnalyser();
  compressor.threshold.value=-18;compressor.knee.value=14;compressor.ratio.value=5;compressor.attack.value=.004;compressor.release.value=.2;
  analyser.fftSize=64;analyser.smoothingTimeConstant=.72;master.gain.value=0;master.connect(compressor).connect(analyser).connect(ctx.destination);
  const noise=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const channel=noise.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=Math.random()*2-1;
  Object.assign(audioEngine,{ctx,master,analyser,noise,nextTime:ctx.currentTime+.04,step:0,spectrum:new Uint8Array(analyser.frequencyBinCount)});
  const reportState=()=>{$("#audioToggle").dataset.context=ctx.state;$("#audioToggle").title=ctx.state==="running"?"Web Audio is running":"Click to unlock Web Audio";};ctx.onstatechange=reportState;reportState();
  return ctx;
}
function setAudioGain(value){if(!audioEngine.ctx)return;audioEngine.master.gain.cancelScheduledValues(audioEngine.ctx.currentTime);audioEngine.master.gain.setTargetAtTime(value,audioEngine.ctx.currentTime,.025);}
function resetAudioClock(){if(!audioEngine.ctx)return;const stepDuration=60/state.bpm/4;audioEngine.step=Math.floor(state.time/stepDuration)%64;audioEngine.nextTime=audioEngine.ctx.currentTime+.04;}
function tone(time,freq,duration,gain=.1,type="sine",destination=audioEngine.master){
  const {ctx}=audioEngine,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,time);g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(gain,time+.008);g.gain.exponentialRampToValueAtTime(.0001,time+duration);o.connect(g).connect(destination);o.start(time);o.stop(time+duration+.02);
}
function kick(time){const {ctx}=audioEngine,o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(145,time);o.frequency.exponentialRampToValueAtTime(42,time+.15);g.gain.setValueAtTime(.7,time);g.gain.exponentialRampToValueAtTime(.0001,time+.2+state.params.audioDecay*.18);o.connect(g).connect(audioEngine.master);o.start(time);o.stop(time+.5);}
function noiseHit(time,duration,gain,frequency){const {ctx}=audioEngine,s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=audioEngine.noise;f.type="bandpass";f.frequency.value=frequency;f.Q.value=.8;g.gain.setValueAtTime(gain,time);g.gain.exponentialRampToValueAtTime(.0001,time+duration);s.connect(f).connect(g).connect(audioEngine.master);s.start(time);s.stop(time+duration+.02);}
function bass(time,step){const notes=[36,36,43,36,39,36,46,43],midi=notes[Math.floor(step/2)%notes.length],freq=440*Math.pow(2,(midi-69)/12),ctx=audioEngine.ctx,filter=ctx.createBiquadFilter();filter.type="lowpass";filter.frequency.setValueAtTime(state.params.audioCutoff,time);filter.frequency.exponentialRampToValueAtTime(Math.max(120,state.params.audioCutoff*.35),time+.22);filter.Q.value=4+state.params.audioDrive*10;tone(time,freq,.24+state.params.audioDecay*.3,.13,"sawtooth",filter);filter.connect(audioEngine.master);}
function scheduleStep(step,time){
  const s=step%16;if([0,7,8,11].includes(s))kick(time);if(s===4||s===12){noiseHit(time,.14,.18,1500);tone(time,180,.1,.07,"triangle");}if(s%2===0)noiseHit(time,.045,s%4===0?.055:.035,7800);if(s%2===0)bass(time,step);
  if(step%16===0){const chord=[48,51,55];chord.forEach((m,i)=>tone(time+i*.015,440*Math.pow(2,(m-69)/12),1.6,.018,"sine"));}
}
function scheduleAudio(){
  if(!audioEngine.ctx||!state.audio.enabled||!state.playing||audioEngine.ctx.state!=="running")return;
  const stepDuration=60/state.bpm/4;while(audioEngine.nextTime<audioEngine.ctx.currentTime+.1){scheduleStep(audioEngine.step,audioEngine.nextTime);audioEngine.nextTime+=stepDuration;audioEngine.step=(audioEngine.step+1)%64;}
}
function updateAudioMeter(){
  const bars=$$("#audioMeter i");if(!audioEngine.analyser||!state.audio.enabled){bars.forEach(b=>b.style.height="2px");return;}
  audioEngine.analyser.getByteFrequencyData(audioEngine.spectrum);bars.forEach((b,i)=>{const v=audioEngine.spectrum[Math.min(audioEngine.spectrum.length-1,i+1)]/255;b.style.height=`${2+v*23}px`;b.style.opacity=.25+v*.75;});
}

function initGL(){
  const canvas=$("#glCanvas"), gl=canvas.getContext("webgl2",{antialias:true});
  if(!gl){
    const ctx=canvas.getContext("2d");
    if(ctx){
      glState={fallback:true,ctx};
      $(".viewport-hud span:last-child").textContent="CANVAS FALLBACK";
      return;
    }
    $("#webglError").hidden=false;
    return;
  }
  const vert=`#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const frag=`#version 300 es
precision highp float;out vec4 o;uniform vec2 r;uniform float t,yaw,pitch,dist,twist,bloom,vignette,pulse,scale,rough,exposure,shapeMode,textureView,texScale,texSpeed,texWarp,texContrast,texKaleido,texMix;uniform vec3 color,accent;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);} float sdTorus(vec3 p,vec2 q){vec2 x=vec2(length(p.xz)-q.x,p.y);return length(x)-q.y;}float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float map(vec3 p){p.xz*=rot(twist*.26*sin(p.y*1.4+t*.22));if(shapeMode<.5){float d=sdTorus(p,vec2(1.12*scale,.26));vec3 q=p;q.xy*=rot(1.57);d=min(d,sdTorus(q,vec2(.7*scale,.16)));float orb=length(p-vec3(sin(t*.7)*1.65,.25,cos(t*.7)*1.65))-.12;return min(d,orb);}if(shapeMode<1.5){p.xy*=rot(t*.3);p.yz*=rot(t*.21);float core=sdBox(p,vec3(.62*scale))-.1;float cut=sdBox(p,vec3(.22,1.2,.22));return max(core,-cut);}if(shapeMode<2.5){float d=length(p)-.52*scale;for(int i=0;i<5;i++){float a=float(i)*1.256+t*.25;vec3 q=vec3(cos(a),sin(a*1.7)*.45,sin(a))*1.05*scale;d=min(d,length(p-q)-(.18+.06*sin(t+float(i))));}return d;}p.xy*=rot(t*.17);p.xz*=rot(t*.11);float outer=sdBox(p,vec3(.72,.95,.48)*scale)-.08,inner=-sdBox(p,vec3(.42,.72,.7)*scale);return max(outer,inner);}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p*2.03+11.7;a*=.5;}return v;}
vec3 texturePattern(vec2 uv){uv-=.5;float seg=max(2.,floor(texKaleido+.5)),ang=atan(uv.y,uv.x),rad=length(uv);float slice=6.283185/seg;ang=abs(mod(ang+t*texSpeed*.08,slice)-slice*.5);uv=vec2(cos(ang),sin(ang))*rad;vec2 flow=vec2(fbm(uv*texScale+vec2(0,t*texSpeed)),fbm(uv*texScale+vec2(5.2,-t*texSpeed*.7)));float n=fbm(uv*texScale+texWarp*(flow-.5)*2.+t*texSpeed*.14);n=clamp((n-.5)*texContrast+.5,0.,1.);float bands=.5+.5*sin(n*12.+rad*22.-t*texSpeed*2.);vec3 pal=mix(color,accent,smoothstep(.15,.85,n));pal=mix(pal,vec3(1.,.65,.3),pow(bands,8.)*.5);return pal*(.35+n*1.15);}
vec3 normal(vec3 p){vec2 e=vec2(.002,0);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
void main(){vec2 uv=(gl_FragCoord.xy*2.-r)/r.y;if(textureView>.5){vec3 tx=texturePattern(uv*.62);float v=1.-smoothstep(.65,1.35,length(uv));o=vec4(pow(tx*v,vec3(.4545)),1);return;}vec3 ro=vec3(0,0,dist);ro.yz*=rot(-pitch);ro.xz*=rot(yaw);vec3 ta=vec3(0);vec3 ww=normalize(ta-ro),uu=normalize(cross(ww,vec3(0,1,0))),vv=cross(uu,ww),rd=normalize(uv.x*uu+uv.y*vv+1.75*ww);float d=0.,m=0.;vec3 p;for(int i=0;i<96;i++){p=ro+rd*d;m=map(p);if(abs(m)<.001||d>12.)break;d+=m*.72;}vec3 col=vec3(.008,.012,.016);float beat=.5+.5*sin(t*6.283*(128./60.));if(d<12.){vec3 n=normal(p),l=normalize(vec3(-.5,.8,.4));float dif=max(dot(n,l),0.),rim=pow(1.-max(dot(n,-rd),0.),2.3);float spec=pow(max(dot(reflect(-l,n),-rd),0.),mix(12.,80.,1.-rough));vec3 proc=texturePattern(p.xz*.28+n.xy*.08);vec3 ir=mix(color,proc,texMix);col=ir*(.08+dif*.55)+spec*vec3(1.,.65,.4)*2.+rim*ir*(1.1+pulse*beat*2.);}
float gridY=(-1.15-ro.y)/rd.y;if(gridY>0.){vec3 gp=ro+rd*gridY;float g=pow(max(0.,1.-min(abs(fract(gp.x)-.5),abs(fract(gp.z)-.5))*22.),4.)*.08;col+=g*vec3(.15,.3,.35)*exp(-gridY*.08);}float glow=bloom*.014/(abs(m)+.02);col+=glow*mix(color,vec3(.2,.7,1.),.5);col*=exposure;col*=1.-vignette*dot(uv,uv);col+=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5)/255.;o=vec4(pow(col,vec3(.4545)),1);}`;
  const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
  try{const prog=gl.createProgram();gl.attachShader(prog,compile(gl.VERTEX_SHADER,vert));gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,frag));gl.linkProgram(prog);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.useProgram(prog);const loc=gl.getAttribLocation(prog,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);glState={gl,prog,uniform:n=>gl.getUniformLocation(prog,n)};}catch(e){$("#webglError").hidden=false;$("#webglError").textContent=e.message;}
  let drag=null;canvas.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY,yaw:orbit.yaw,pitch:orbit.pitch};canvas.setPointerCapture(e.pointerId)};canvas.onpointermove=e=>{if(drag){orbit.yaw=drag.yaw+(e.clientX-drag.x)*.008;orbit.pitch=Math.max(-1.2,Math.min(1.2,drag.pitch+(e.clientY-drag.y)*.006));}};canvas.onpointerup=()=>drag=null;canvas.onwheel=e=>{e.preventDefault();orbit.distance=Math.max(2.5,Math.min(8,orbit.distance+e.deltaY*.004));};
}
function frame(now){
  const dt=Math.min(.05,(now-lastFrame)/1000);lastFrame=now;if(state.playing){state.time+=dt;if(state.time>=state.duration){if(state.looping)state.time%=state.duration;else{state.time=state.duration;togglePlay(false)}}}updateTransport();
  scheduleAudio();updateAudioMeter();
  fpsSmooth=fpsSmooth*.94+(1/Math.max(dt,.001))*.06;$("#fps").textContent=`${Math.round(fpsSmooth)} FPS`;$("#renderTime").textContent=`${(dt*1000*.14).toFixed(1)} MS`;
  const audioStatus=!state.audio.enabled?"WEB AUDIO READY":audioEngine.ctx?.state==="running"?"WEB AUDIO LIVE":"WEB AUDIO ARMED";$("#statusMetrics").firstChild.textContent=`${allNodes().length} OPERATORS · ${audioStatus} · `;
  if(glState?.fallback) renderCanvasFallback(glState.ctx);
  else if(glState){const {gl,prog,uniform}=glState,c=gl.canvas,dpr=Math.min(devicePixelRatio,2),w=Math.floor(c.clientWidth*dpr),h=Math.floor(c.clientHeight*dpr);if(c.width!==w||c.height!==h){c.width=w;c.height=h;gl.viewport(0,0,w,h);$("#resolution").textContent=`${w} × ${h}`;}gl.useProgram(prog);gl.uniform2f(uniform("r"),w,h);gl.uniform1f(uniform("t"),state.time);gl.uniform1f(uniform("yaw"),orbit.yaw);gl.uniform1f(uniform("pitch"),orbit.pitch);gl.uniform1f(uniform("dist"),orbit.distance);for(const [u,k] of [["shapeMode","shapeMode"],["twist","twist"],["bloom","bloom"],["vignette","vignette"],["pulse","pulse"],["scale","scale"],["rough","roughness"],["exposure","exposure"],["texScale","texScale"],["texSpeed","texSpeed"],["texWarp","texWarp"],["texContrast","texContrast"],["texKaleido","texKaleido"],["texMix","texMix"]])gl.uniform1f(uniform(u),state.params[k]);gl.uniform1f(uniform("textureView"),state.graphMode==="textures"?1:0);const hex=state.params.color.match(/\w\w/g).map(x=>parseInt(x,16)/255),accent=state.params.accent.match(/\w\w/g).map(x=>parseInt(x,16)/255);gl.uniform3f(uniform("color"),...hex);gl.uniform3f(uniform("accent"),...accent);gl.drawArrays(gl.TRIANGLES,0,3);}
  requestAnimationFrame(frame);
}

function renderCanvasFallback(ctx){
  const c=ctx.canvas,dpr=Math.min(devicePixelRatio,2),w=Math.floor(c.clientWidth*dpr),h=Math.floor(c.clientHeight*dpr);
  if(c.width!==w||c.height!==h){c.width=w;c.height=h;$("#resolution").textContent=`${w} × ${h}`;}
  ctx.setTransform(1,0,0,1,0,0);const bg=ctx.createRadialGradient(w*.5,h*.48,0,w*.5,h*.48,w*.65);bg.addColorStop(0,"#182126");bg.addColorStop(.35,"#090d10");bg.addColorStop(1,"#030405");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  if(state.graphMode==="textures"){ctx.save();ctx.translate(w/2,h/2);ctx.globalCompositeOperation="lighter";for(let i=0;i<80;i++){const a=i/80*Math.PI*2+state.time*state.params.texSpeed,radius=(40+120*Math.sin(i*12.3+state.time)*.5)*dpr,sz=(4+8*Math.sin(i*7.1+state.time*2)**2)*dpr;ctx.rotate(Math.PI*2/state.params.texKaleido);ctx.fillStyle=i%2?state.params.color:state.params.accent;ctx.globalAlpha=.08+.2*Math.sin(i+state.time)**2;ctx.fillRect(radius,-sz/2,sz*5,sz);}ctx.restore();ctx.globalCompositeOperation="source-over";ctx.globalAlpha=1;return;}
  const beat=.5+.5*Math.sin(state.time*Math.PI*2*(state.bpm/60)), s=Math.min(w,h)*(.23+beat*state.params.pulse*.018)*state.params.scale;
  ctx.save();ctx.translate(w*.5,h*.48);ctx.rotate(orbit.yaw+state.time*.045);ctx.globalCompositeOperation="lighter";
  for(let i=10;i>=0;i--){const a=i/10, hue=10+a*180+state.time*8;ctx.strokeStyle=`hsla(${hue},90%,${48+a*20}%,${.025+a*.055*state.params.bloom})`;ctx.lineWidth=(14+i*2)*dpr;ctx.beginPath();ctx.ellipse(0,0,s*1.35,s*(.34+Math.abs(Math.sin(orbit.pitch))*.2),state.params.twist*.3,0,Math.PI*2);ctx.stroke();}
  ctx.strokeStyle=state.params.color;ctx.globalAlpha=.82;ctx.lineWidth=3*dpr;ctx.beginPath();ctx.ellipse(0,0,s*1.35,s*.34,state.params.twist*.3,0,Math.PI*2);ctx.stroke();ctx.rotate(Math.PI/2.2);ctx.strokeStyle="#25c9cd";ctx.globalAlpha=.55;ctx.beginPath();ctx.ellipse(0,0,s*.88,s*.23,-state.params.twist*.2,0,Math.PI*2);ctx.stroke();ctx.restore();
  ctx.globalCompositeOperation="source-over";ctx.globalAlpha=.22;ctx.strokeStyle="#31505a";ctx.lineWidth=1;const horizon=h*.78;for(let i=-10;i<=10;i++){ctx.beginPath();ctx.moveTo(w*.5+i*w*.05,horizon);ctx.lineTo(w*.5+i*w*.16,h);ctx.stroke();}for(let i=0;i<6;i++){const yy=horizon+(i*i)*h*.009;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(w,yy);ctx.stroke();}ctx.globalAlpha=1;
}
function autosave(){clearTimeout(autosave.t);$("#saveState").textContent="UNSAVED";autosave.t=setTimeout(()=>{localStorage.setItem("werkkzeug-project",JSON.stringify({nodes:state.nodes,connections:state.connections,textureNodes:state.textureNodes,textureConnections:state.textureConnections,postNodes:state.postNodes,postConnections:state.postConnections,audioNodes:state.audioNodes,audioConnections:state.audioConnections,params:state.params,audio:state.audio,bpm:state.bpm,name:$("#projectName").value}));$("#saveState").textContent="AUTOSAVED";},350);}
async function exportProject(){
  const button=$("[data-action=export]"),label=button.textContent;button.disabled=true;button.textContent="Packing…";$("#saveState").textContent="BUILDING JPEG";
  const data={format:"werkkzeug-web/5",name:$("#projectName").value,bpm:state.bpm,duration:state.duration,scene:{nodes:state.nodes,connections:state.connections},textures:{engine:"gpu-procedural",nodes:state.textureNodes,connections:state.textureConnections},post:{engine:"webgl-post",nodes:state.postNodes,connections:state.postConnections},audio:{engine:"webaudio-procedural",nodes:state.audioNodes,connections:state.audioConnections,settings:state.audio},parameters:state.params};
  try{const result=await exportExecutableJpeg(data);$("#saveState").textContent=`EXPORTED ${(result.blob.size/1024).toFixed(1)} KB`;$("#saveState").dataset.preview=result.previewUrl;}
  catch(error){console.error(error);$("#saveState").textContent="EXPORT FAILED";alert(`Could not build executable demo: ${error.message}`);}
  finally{button.disabled=false;button.textContent=label;}
}
function newProject(){if(!confirm("Start a new project? Your current work is saved locally."))return;state.nodes=structuredClone(defaultNodes);state.connections=structuredClone(defaultConnections);state.textureNodes=structuredClone(defaultTextureNodes);state.textureConnections=structuredClone(defaultTextureConnections);state.postNodes=structuredClone(defaultPostNodes);state.postConnections=structuredClone(defaultPostConnections);state.audioNodes=structuredClone(defaultAudioNodes);state.audioConnections=structuredClone(defaultAudioConnections);state.graphMode="scene";state.params={...defaults};state.audio={enabled:false,volume:.42};state.time=0;state.selected="MAT_04";setAudioGain(0);updateAudioUI();$("#projectName").value="UNTITLED DEMO";renderGraph();renderInspector();autosave();}

function updateAudioUI(){
  $("#audioToggle").classList.toggle("active",state.audio.enabled);$("#audioToggle b").textContent=state.audio.enabled?"SOUND ON":"SOUND OFF";$("#masterVolume").value=state.audio.volume;
}

function placeDroppedOperator(payload,clientX,clientY){
  const canvas=$("#graphCanvas"),rect=canvas.getBoundingClientRect();if(clientX<rect.left||clientX>rect.right||clientY<rect.top||clientY>rect.bottom)return false;const position={x:Math.max(0,(clientX-rect.left)/state.zoom-63),y:Math.max(0,(clientY-rect.top)/state.zoom-35)};payload.opid?addCompatibilityNode(operatorById.get(payload.opid),position):addNode(payload.kind,position);return true;
}

function bindOperatorCard(button){
  const payload={kind:button.dataset.kind,opid:button.dataset.opid||""};let drag=null,suppressClick=false;
  button.onclick=()=>{if(suppressClick){suppressClick=false;return;}payload.opid?addCompatibilityNode(operatorById.get(payload.opid)):addNode(payload.kind);};
  button.onpointerdown=e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,active:false,ghost:null};const move=event=>{if(!drag||event.pointerId!==drag.id)return;if(!drag.active&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6){drag.active=true;drag.ghost=document.createElement("div");drag.ghost.className="operator-drag-ghost";drag.ghost.textContent=payload.kind;document.body.append(drag.ghost);}if(drag.active){drag.ghost.style.transform=`translate(${event.clientX+12}px,${event.clientY+12}px)`;const r=$("#graphCanvas").getBoundingClientRect(),inside=event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;$("#graphCanvas").classList.toggle("drop-ready",inside);}};const up=event=>{if(!drag||event.pointerId!==drag.id)return;if(drag.active){suppressClick=true;placeDroppedOperator(payload,event.clientX,event.clientY);drag.ghost?.remove();$("#graphCanvas").classList.remove("drop-ready");}drag=null;window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up);window.removeEventListener("pointercancel",up);};window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);window.addEventListener("pointercancel",up);};
}

function setupGraphDrop(){
  const canvas=$("#graphCanvas");
  canvas.ondragenter=e=>{if(e.dataTransfer.types.includes("application/x-werkkzeug-op")){e.preventDefault();canvas.classList.add("drop-ready");}};
  canvas.ondragover=e=>{if(e.dataTransfer.types.includes("application/x-werkkzeug-op")){e.preventDefault();e.dataTransfer.dropEffect="copy";}};
  canvas.ondragleave=e=>{if(!canvas.contains(e.relatedTarget))canvas.classList.remove("drop-ready");};
  canvas.ondrop=e=>{e.preventDefault();canvas.classList.remove("drop-ready");let payload;try{payload=JSON.parse(e.dataTransfer.getData("application/x-werkkzeug-op"));}catch{return;}placeDroppedOperator(payload,e.clientX,e.clientY);};
}

function setupResizablePanels(){
  const root=document.documentElement,defaults={library:216,inspector:250,timeline:166,viewport:null};let layout={...defaults};try{layout={...layout,...JSON.parse(localStorage.getItem("werkkzeug-layout")||"{}")};}catch{}
  const apply=()=>{root.style.setProperty("--library-width",`${layout.library}px`);root.style.setProperty("--inspector-width",`${layout.inspector}px`);root.style.setProperty("--timeline-height",`${layout.timeline}px`);root.style.setProperty("--viewport-height",layout.viewport?`${layout.viewport}px`:"58%");requestAnimationFrame(()=>{constrainGraphNodes();drawWires();});};
  const bind=(selector,move)=>{const handle=$(selector);let active=false,pointerId=-1;const onMove=e=>{if(!active||e.pointerId!==pointerId)return;move(e);apply();};const finish=e=>{if(!active||(e.pointerId!==undefined&&e.pointerId!==pointerId))return;active=false;handle.classList.remove("active");document.body.classList.remove("resizing");window.removeEventListener("pointermove",onMove);window.removeEventListener("pointerup",finish);window.removeEventListener("pointercancel",finish);localStorage.setItem("werkkzeug-layout",JSON.stringify(layout));};handle.onpointerdown=e=>{e.preventDefault();active=true;pointerId=e.pointerId;handle.classList.add("active");document.body.classList.add("resizing");window.addEventListener("pointermove",onMove);window.addEventListener("pointerup",finish);window.addEventListener("pointercancel",finish);};handle.onlostpointercapture=finish;handle.ondblclick=()=>{layout={...defaults};apply();localStorage.removeItem("werkkzeug-layout");};};
  bind("#resizeLibrary",e=>layout.library=Math.max(150,Math.min(400,e.clientX)));
  bind("#resizeInspector",e=>layout.inspector=Math.max(200,Math.min(460,innerWidth-e.clientX)));
  bind("#resizeTimeline",e=>layout.timeline=Math.max(120,Math.min(360,innerHeight-e.clientY-24)));
  bind("#resizeViewport",e=>{const rect=$(".center-stage").getBoundingClientRect();layout.viewport=Math.max(120,Math.min(rect.height-120,e.clientY-rect.top));});
  apply();
}

function projectSnapshot(){return {nodes:state.nodes,connections:state.connections,textureNodes:state.textureNodes,textureConnections:state.textureConnections,postNodes:state.postNodes,postConnections:state.postConnections,audioNodes:state.audioNodes,audioConnections:state.audioConnections,params:state.params,audio:state.audio,bpm:state.bpm,name:$("#projectName").value};}
function activateWorkspace(mode){const labels={scene:"SCENE",textures:"TEXTURES",post:"POST FX",audio:"AUDIO"};$$("#graphTabs button").forEach(button=>button.classList.toggle("active",button.textContent.trim()===labels[mode]));switchGraphMode(mode);}
function clearTutorialFocus(){$$(".tutorial-focus").forEach(element=>element.classList.remove("tutorial-focus"));}
function renderTutorialGallery(){$("#tutorialGrid").innerHTML=TUTORIALS.map(tutorial=>`<button class="tutorial-card" data-tutorial="${tutorial.id}" style="--tutorial-accent:${tutorial.accent}"><small>${tutorial.level}</small><b>${tutorial.duration}</b><strong>${tutorial.title}</strong><p>${tutorial.description}</p><span>LOAD TUTORIAL →</span></button>`).join("");$$("[data-tutorial]").forEach(button=>button.onclick=()=>loadTutorial(button.dataset.tutorial));}
function renderDemoGallery(){$("#demoGrid").innerHTML=BUILTIN_DEMOS.map(demo=>`<button class="demo-card" data-demo="${demo.id}" style="--demo-a:${demo.colors[0]};--demo-b:${demo.colors[1]}"><div class="demo-thumb"></div><div class="demo-card-content"><small>${demo.tag} · ${demo.bpm} BPM</small><strong>${demo.title}</strong><p>${demo.description}</p><span>LOAD & REMIX →</span></div></button>`).join("");$$("[data-demo]").forEach(button=>button.onclick=()=>loadBuiltInDemo(button.dataset.demo));}
function loadBuiltInDemo(id){
  const demo=BUILTIN_DEMOS.find(item=>item.id===id);if(!demo)return;localStorage.setItem("werkkzeug-project-before-demo",JSON.stringify(projectSnapshot()));exitTutorial();setAudioGain(0);state.nodes=structuredClone(defaultNodes);state.connections=structuredClone(defaultConnections);state.textureNodes=structuredClone(defaultTextureNodes);state.textureConnections=structuredClone(defaultTextureConnections);state.postNodes=structuredClone(defaultPostNodes);state.postConnections=structuredClone(defaultPostConnections);state.audioNodes=structuredClone(defaultAudioNodes);state.audioConnections=structuredClone(defaultAudioConnections);state.params={...defaults,...demo.params};state.audio={enabled:false,volume:.42};state.bpm=demo.bpm;state.time=0;$("#projectName").value=`DEMO · ${demo.title.toUpperCase()}`;$("#bpm").value=state.bpm;$("#demoModal").hidden=true;updateAudioUI();initTimeline();activateWorkspace("scene");selectNode("MAT_04");togglePlay(true);autosave();
}
function loadTutorial(id){
  const tutorial=TUTORIALS.find(item=>item.id===id);if(!tutorial)return;localStorage.setItem("werkkzeug-project-before-tutorial",JSON.stringify(projectSnapshot()));setAudioGain(0);state.nodes=structuredClone(defaultNodes);state.connections=structuredClone(defaultConnections);state.textureNodes=structuredClone(defaultTextureNodes);state.textureConnections=structuredClone(defaultTextureConnections);state.postNodes=structuredClone(defaultPostNodes);state.postConnections=structuredClone(defaultPostConnections);state.audioNodes=structuredClone(defaultAudioNodes);state.audioConnections=structuredClone(defaultAudioConnections);state.params={...defaults,...tutorial.project.params};state.audio={enabled:false,volume:.42};state.bpm=tutorial.project.bpm;state.time=0;$("#projectName").value=tutorial.project.name;$("#bpm").value=state.bpm;activeTutorial=tutorial;tutorialStep=0;$("#tutorialModal").hidden=true;$("#tutorialGuide").hidden=false;updateAudioUI();initTimeline();activateWorkspace(tutorial.project.mode);showTutorialStep();autosave();
}
function showTutorialStep(){
  if(!activeTutorial)return;clearTutorialFocus();const step=activeTutorial.steps[tutorialStep];if(step.mode)activateWorkspace(step.mode);if(step.node&&allNodes().some(node=>node.id===step.node))selectNode(step.node);$("#tutorialProgress").textContent=`${activeTutorial.title.toUpperCase()} · STEP ${tutorialStep+1} / ${activeTutorial.steps.length}`;$("#tutorialStepTitle").textContent=step.title;$("#tutorialStepBody").textContent=step.body;$("#tutorialPrev").disabled=tutorialStep===0;$("#tutorialNext").textContent=tutorialStep===activeTutorial.steps.length-1?"FINISH ✓":"NEXT →";requestAnimationFrame(()=>{const target=$(step.target);if(target)target.classList.add("tutorial-focus");});
}
function exitTutorial(){clearTutorialFocus();$("#tutorialGuide").hidden=true;activeTutorial=null;tutorialStep=0;}
function navigateTutorial(direction){const now=performance.now();if(!activeTutorial||now-tutorialNavTime<300)return;tutorialNavTime=now;if(direction<0&&tutorialStep>0){tutorialStep--;showTutorialStep();}else if(direction>0&&tutorialStep>=activeTutorial.steps.length-1)exitTutorial();else if(direction>0){tutorialStep++;showTutorialStep();}}

function bindUI(){
  renderLibrary();renderGraph();renderInspector();initTimeline();
  setupGraphDrop();setupResizablePanels();renderTutorialGallery();renderDemoGallery();
  $("#nodeSearch").oninput=e=>renderLibrary(e.target.value);$("#projectName").oninput=autosave;
  $("#audioToggle").onclick=async()=>{const ctx=await ensureAudio();if(!ctx)return;state.audio.enabled=!state.audio.enabled;updateAudioUI();autosave();if(state.audio.enabled){ctx.resume().then(()=>{resetAudioClock();setAudioGain(state.playing?state.audio.volume:0);$("#audioToggle").dataset.context=ctx.state;});}else setAudioGain(0);};
  $("#masterVolume").oninput=e=>{state.audio.volume=Number(e.target.value);if(state.audio.enabled&&state.playing)setAudioGain(state.audio.volume);autosave();};
  $("[data-action=new]").onclick=newProject;$("[data-action=save]").onclick=autosave;$("[data-action=export]").onclick=exportProject;
  $("#playBtn").onclick=()=>togglePlay();$("#runBtn").onclick=()=>togglePlay();$("#toStart").onclick=()=>{state.time=0;updateTransport()};$("#prevFrame").onclick=()=>{state.time=Math.max(0,state.time-1/60)};$("#nextFrame").onclick=()=>{state.time=Math.min(state.duration,state.time+1/60)};
  $("#loopBtn").onclick=e=>{state.looping=!state.looping;e.currentTarget.classList.toggle("active",state.looping)};$("#bpm").onchange=e=>{state.bpm=Number(e.target.value);resetAudioClock();autosave();};
  $("#enableNode").onclick=()=>{const n=allNodes().find(x=>x.id===state.selected);n.enabled=!n.enabled;renderGraph();renderInspector();autosave()};
  $("#addNodeBtn").onclick=e=>{const m=$("#addMenu");m.hidden=!m.hidden;m.style.top="7px";m.style.right="7px";m.innerHTML=operatorCatalog.flatMap(g=>g.items).map(i=>`<button data-kind="${i[0]}" ${i[4]?`data-opid="${i[4]}"`:""}><span class="op-icon ${i[2]}">${i[1]}</span>${i[0]}${i[3]?`<small>${i[3]}</small>`:""}</button>`).join("");$$('button',m).forEach(b=>b.onclick=()=>b.dataset.opid?addCompatibilityNode(operatorById.get(b.dataset.opid)):addNode(b.dataset.kind));};
  $("#zoomIn").onclick=()=>setZoom(state.zoom+.1);$("#zoomOut").onclick=()=>setZoom(state.zoom-.1);$("#frameBtn").onclick=()=>setZoom(1);$("#fullscreenBtn").onclick=()=>$(".viewport").requestFullscreen?.();
  $("#gridBtn").onclick=e=>{e.currentTarget.classList.toggle("active");$("#graphCanvas").style.backgroundImage=e.currentTarget.classList.contains("active")?"":"none"};
  $$("#viewMode button").forEach(b=>b.onclick=()=>{$$("#viewMode button").forEach(x=>x.classList.remove("active"));b.classList.add("active");if(b.dataset.view==="camera")orbit={yaw:.15,pitch:.1,distance:4.5};});
  $$("#graphTabs button").forEach(b=>b.onclick=()=>{$$("#graphTabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const label=b.textContent.trim();switchGraphMode(label==="TEXTURES"?"textures":label==="POST FX"?"post":label==="AUDIO"?"audio":"scene")});
  $("#aboutBtn").onclick=()=>$("#aboutModal").hidden=false;$("#compatBtn").onclick=()=>{const counts=new Map();WZ4_OPERATORS.forEach(op=>counts.set(op.family,(counts.get(op.family)||0)+1));$("#compatFamilies").innerHTML=[...counts].map(([family,count])=>`<div class="compat-family"><span>${family}</span><b>${count}</b></div>`).join("");$("#compatModal").hidden=false;};$$('.modal-close').forEach(b=>b.onclick=()=>b.closest('.modal').hidden=true);$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)m.hidden=true});
  $("#tutorialsBtn").onclick=()=>$("#tutorialModal").hidden=false;$("#tutorialExit").onclick=exitTutorial;$("#tutorialPrev").onclick=()=>navigateTutorial(-1);$("#tutorialNext").onclick=()=>navigateTutorial(1);
  $("#demosBtn").onclick=()=>$("#demoModal").hidden=false;
  window.onresize=drawWires;document.onkeydown=e=>{if(e.target.matches("input"))return;if(e.code==="Space"){e.preventDefault();togglePlay()}if(e.key.toLowerCase()==="m")$("#audioToggle").click();if(e.key==="Delete"||e.key==="Backspace")removeSelected();if(e.key.toLowerCase()==="f")setZoom(1);if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault();autosave()}};
  updateAudioUI();
}
function setZoom(z){state.zoom=Math.max(.6,Math.min(1.4,z));$("#nodes").style.transform=`scale(${state.zoom})`;$("#nodes").style.transformOrigin="0 0";$("#zoomLabel").textContent=Math.round(state.zoom*100)+"%";drawWires();}

window.scrollTo(0,0);
const saved=localStorage.getItem("werkkzeug-project");if(saved){try{const s=JSON.parse(saved),legacyNodes=(s.nodes||state.nodes).filter(n=>!n.type?.includes("POST FX")&&!n.type?.includes("AUDIO OPERATOR"));Object.assign(state,{nodes:legacyNodes,connections:s.connections||state.connections,textureNodes:s.textureNodes||state.textureNodes,textureConnections:s.textureConnections||state.textureConnections,postNodes:s.postNodes||state.postNodes,postConnections:s.postConnections||state.postConnections,audioNodes:s.audioNodes||state.audioNodes,audioConnections:s.audioConnections||state.audioConnections,params:{...state.params,...s.params},audio:{...state.audio,...s.audio},bpm:s.bpm||state.bpm});state.audio.enabled=false;if(s.name)$("#projectName").value=s.name;$("#bpm").value=state.bpm;}catch{}}
bindUI();initGL();togglePlay(true);requestAnimationFrame(frame);
