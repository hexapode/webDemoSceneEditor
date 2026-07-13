const VOID_BLOOM_PROJECT = {
  name:"VOID BLOOM · A SIGNAL GARDEN",duration:24,bpm:132,showcase:false,visualMode:"voidBloom",selected:"VB_MATERIAL",
  params:{shapeMode:2,color:"#ff6846",accent:"#6df7ff",metallic:.94,roughness:.09,twist:1.92,bloom:1.12,vignette:.36,pulse:.88,scale:.92,exposure:1.16,texScale:6.6,texSpeed:.74,texWarp:2.35,texContrast:2.25,texKaleido:11,texMix:.92,multiplyCount:12,multiplySpread:1.35,audioCutoff:1150,audioDecay:.36,audioDelay:.42,audioDrive:.78,showMix:0},
  audio:{volume:.46},
  nodes:[
    {id:"VB_TITLE",name:"Story Chapters",type:"TEXT OPERATOR",kind:"Text",x:20,y:8,color:"#ff6846",value:"4 CHAPTERS",enabled:true,params:{text:"I. THE SEED REMEMBERS",textColor:"#fff2df",textSize:42,textX:50,textY:18,textRotation:-2,textWave:.34,sequenceStep:6,sequence:["I. THE SEED REMEMBERS","II. THE GARDEN WAKES","III. ROOTS EAT THE SIGNAL","IV. WE BECOME LIGHT"]},bindings:{textWave:{source:"sine",amount:.2},textRotation:{source:"bar",amount:.04}}},
    {id:"VB_TAG",name:"Story Subtitle",type:"TEXT OPERATOR",kind:"Text",x:20,y:102,color:"#6df7ff",value:"4 LINES",enabled:true,params:{text:"ONE MACHINE PLANTED A MEMORY",textColor:"#6df7ff",textSize:12,textX:50,textY:88,textRotation:0,textWave:.08,sequenceStep:6,sequence:["ONE MACHINE PLANTED A MEMORY","IT LEARNED THE SHAPE OF HUNGER","THE ROOTS FOUND OUR SIGNAL","WE ANSWERED BY BECOMING LIGHT"]}},
    {id:"VB_BEAT",name:"Root Pulse",type:"SIGNAL OPERATOR",kind:"Beat",x:165,y:8,color:"#55d887",value:"132 BPM",enabled:true,bindings:{pulse:{source:"beat",amount:.26}}},
    {id:"VB_SEED",name:"Metaball Seed",type:"GEOMETRY OPERATOR",kind:"Primitive",x:310,y:8,color:"#5da7ff",value:"ORGANIC",enabled:true,bindings:{scale:{source:"envelope",amount:.18}}},
    {id:"VB_FRACTAL",name:"Bloom Recursion",type:"GEOMETRY OPERATOR",kind:"Fractal",x:455,y:8,color:"#9b7bff",value:"11 FOLDS",enabled:true,bindings:{texWarp:{source:"sine",amount:.22},texScale:{source:"bar",amount:.08}}},
    {id:"VB_MULTIPLY",name:"Petal Multiplication",type:"GEOMETRY OPERATOR",kind:"Multiply",x:600,y:8,color:"#25c9cd",value:"12 PETALS",enabled:true,bindings:{multiplySpread:{source:"half",amount:.2},multiplyCount:{source:"bar",amount:.12}}},
    {id:"VB_ARRAY",name:"Orbital Garden",type:"GEOMETRY OPERATOR",kind:"Grid Array",x:745,y:8,color:"#5da7ff",value:"POLAR",enabled:true,bindings:{twist:{source:"bar",amount:.14}}},
    {id:"VB_MIRROR",name:"Event Horizon Mirror",type:"MODIFIER OPERATOR",kind:"Mirror",x:165,y:102,color:"#9b7bff",value:"11 AXES",enabled:true,bindings:{texKaleido:{source:"act",amount:.16}}},
    {id:"VB_DISPLACE",name:"Breathing Field",type:"MODIFIER OPERATOR",kind:"Displace",x:310,y:102,color:"#25c9cd",value:"LIQUID",enabled:true,bindings:{texWarp:{source:"envelope",amount:.26},texSpeed:{source:"sine",amount:.12}}},
    {id:"VB_MATERIAL",name:"Molten Aurora",type:"MATERIAL OPERATOR",kind:"Emission",x:455,y:102,color:"#ff6846",value:"BEAT LIT",enabled:true,bindings:{bloom:{source:"beat",amount:.2},exposure:{source:"half",amount:.08},pulse:{source:"envelope",amount:.22}}},
    {id:"VB_CAMERA",name:"Spiral Witness",type:"SCENE OPERATOR",kind:"Camera",x:600,y:102,color:"#f1b85b",value:"ORBIT",enabled:true,bindings:{cameraYaw:{source:"sine",amount:.18},cameraPitch:{source:"bar",amount:.12},cameraDistance:{source:"envelope",amount:-.08}}},
    {id:"VB_OUT",name:"Void Bloom Output",type:"OUTPUT OPERATOR",kind:"Output",x:745,y:102,color:"#ff5a36",value:"00:24 LOOP",enabled:true,bindings:{exposure:{source:"event",amount:.12}}}
  ],
  connections:[["VB_TITLE","VB_OUT"],["VB_TAG","VB_OUT"],["VB_BEAT","VB_DISPLACE"],["VB_SEED","VB_FRACTAL"],["VB_FRACTAL","VB_MULTIPLY"],["VB_MULTIPLY","VB_ARRAY"],["VB_ARRAY","VB_MIRROR"],["VB_MIRROR","VB_DISPLACE"],["VB_DISPLACE","VB_MATERIAL"],["VB_MATERIAL","VB_OUT"],["VB_CAMERA","VB_OUT"]],
  textureNodes:[
    {id:"VBT_01",name:"Black Sun Noise",type:"TEXTURE GENERATOR",kind:"Animated Noise",x:35,y:38,color:"#25c9cd",value:"6.6 FREQ",enabled:true,bindings:{texScale:{source:"bar",amount:.12},texSpeed:{source:"sine",amount:.16}}},
    {id:"VBT_02",name:"Gravitational Warp",type:"TEXTURE MODIFIER",kind:"Domain Warp",x:190,y:68,color:"#5da7ff",value:"2.35 AMT",enabled:true,bindings:{texWarp:{source:"envelope",amount:.28}}},
    {id:"VBT_03",name:"Elevenfold Iris",type:"TEXTURE MODIFIER",kind:"Kaleidoscope",x:345,y:36,color:"#9b7bff",value:"11 SIDES",enabled:true,bindings:{texSpeed:{source:"half",amount:.18},texKaleido:{source:"event",amount:.12}}},
    {id:"VBT_04",name:"Solarize Veins",type:"TEXTURE MODIFIER",kind:"Noise",x:500,y:68,color:"#55d887",value:"STEP NOISE",enabled:true,bindings:{texContrast:{source:"noise",amount:.16}}},
    {id:"VBT_05",name:"Aurora Palette",type:"TEXTURE COLOR",kind:"Palette Map",x:655,y:36,color:"#ff6846",value:"CORAL / CYAN",enabled:true,bindings:{texMix:{source:"beat",amount:.1}}},
    {id:"VBT_06",name:"Living Skin",type:"TEXTURE OUTPUT",kind:"Texture Output",x:810,y:68,color:"#55d887",value:"MATERIAL",enabled:true}
  ],
  textureConnections:[["VBT_01","VBT_02"],["VBT_02","VBT_03"],["VBT_03","VBT_04"],["VBT_04","VBT_05"],["VBT_05","VBT_06"]],
  postNodes:[
    {id:"VBP_01",name:"Garden Input",type:"RENDER INPUT",kind:"Scene Input",x:25,y:60,color:"#5da7ff",value:"HDR",enabled:true},
    {id:"VBP_02",name:"Prism Tear",type:"POST FX OPERATOR",kind:"Chromatic",x:165,y:34,color:"#9b7bff",value:"PULSE",enabled:true,bindings:{texMix:{source:"half",amount:.12}}},
    {id:"VBP_03",name:"Hot Pollen",type:"POST FX OPERATOR",kind:"Bloom",x:305,y:68,color:"#ff6846",value:"1.12",enabled:true,bindings:{bloom:{source:"beat",amount:.24}}},
    {id:"VBP_04",name:"Coral Grade",type:"POST FX OPERATOR",kind:"Color Grade",x:445,y:34,color:"#f1b85b",value:"FILMIC",enabled:true,bindings:{exposure:{source:"bar",amount:.08},texContrast:{source:"sine",amount:.1}}},
    {id:"VBP_05",name:"Dream Grain",type:"POST FX OPERATOR",kind:"Film Grain",x:585,y:68,color:"#9b7bff",value:"NOISE",enabled:true,bindings:{roughness:{source:"noise",amount:.08}}},
    {id:"VBP_06",name:"Deep Vignette",type:"POST FX OPERATOR",kind:"Vignette",x:725,y:34,color:"#9b7bff",value:"0.36",enabled:true},
    {id:"VBP_07",name:"Final Flower",type:"RENDER OUTPUT",kind:"Output",x:865,y:68,color:"#55d887",value:"DISPLAY",enabled:true}
  ],
  postConnections:[["VBP_01","VBP_02"],["VBP_02","VBP_03"],["VBP_03","VBP_04"],["VBP_04","VBP_05"],["VBP_05","VBP_06"],["VBP_06","VBP_07"]],
  audioNodes:[
    {id:"VBA_01",name:"Garden Clock",type:"AUDIO CONTROL",kind:"Beat",x:25,y:58,color:"#55d887",value:"132 BPM",enabled:true},
    {id:"VBA_02",name:"Root Drums",type:"AUDIO OPERATOR",kind:"Drum Machine",x:165,y:30,color:"#55d887",value:"BROKEN 16",enabled:true,bindings:{audioDrive:{source:"bar",amount:.16},audioDecay:{source:"half",amount:.08}}},
    {id:"VBA_03",name:"Subterranean Bass",type:"AUDIO OPERATOR",kind:"Bass Synth",x:305,y:74,color:"#25c9cd",value:"C MINOR",enabled:true,bindings:{audioCutoff:{source:"envelope",amount:.46},audioDrive:{source:"beat",amount:.1}}},
    {id:"VBA_04",name:"Breathing Filter",type:"AUDIO OPERATOR",kind:"Lowpass",x:445,y:30,color:"#f1b85b",value:"1150 HZ",enabled:true,bindings:{audioCutoff:{source:"sine",amount:.2}}},
    {id:"VBA_05",name:"Memory Echo",type:"AUDIO OPERATOR",kind:"Delay",x:585,y:74,color:"#9b7bff",value:"42%",enabled:true,bindings:{audioDelay:{source:"bar",amount:.12}}},
    {id:"VBA_06",name:"Bloom Master",type:"AUDIO OUTPUT",kind:"Audio Output",x:725,y:42,color:"#ff6846",value:"-6.7 DB",enabled:true}
  ],
  audioConnections:[["VBA_01","VBA_02"],["VBA_01","VBA_03"],["VBA_02","VBA_04"],["VBA_03","VBA_04"],["VBA_04","VBA_05"],["VBA_05","VBA_06"]]
};

const PROCEDURAL_CITY_PROJECT={
  name:"NIGHT TRANSIT · PROCEDURAL CITY",duration:30,bpm:126,showcase:false,visualMode:"proceduralCity",selected:"CITY_CAMERA",
  params:{shapeMode:3,color:"#ff2f8e",accent:"#42ecff",metallic:.82,roughness:.28,twist:.28,bloom:.58,vignette:.34,pulse:.56,scale:1,exposure:.86,texScale:6.4,texSpeed:.62,texWarp:1.75,texContrast:2.2,texKaleido:7,texMix:.72,multiplyCount:12,multiplySpread:1.4,audioCutoff:1380,audioDecay:.3,audioDelay:.38,audioDrive:.68,showMix:0},audio:{volume:.44},
  nodes:[
    {id:"CITY_TITLE",name:"District Titles",type:"TEXT OPERATOR",kind:"Text",x:20,y:8,color:"#ff2f8e",value:"5 DISTRICTS",enabled:true,params:{text:"I. ARRIVAL GATE",textColor:"#fff2e6",textSize:38,textX:50,textY:17,textRotation:0,textWave:.08,sequenceStep:6,sequence:["I. ARRIVAL GATE","II. NEON BLOCKS","III. DATA CANYON","IV. SKYBRIDGE CORE","V. DAWN EXIT"]}},
    {id:"CITY_TAG",name:"Travel Log",type:"TEXT OPERATOR",kind:"Text",x:20,y:102,color:"#42ecff",value:"NARRATION",enabled:true,params:{text:"THE ROAD GENERATED ITSELF",textColor:"#42ecff",textSize:11,textX:50,textY:88,textRotation:0,textWave:.05,sequenceStep:6,sequence:["THE ROAD GENERATED ITSELF","EVERY WINDOW DREAMED IN COLOR","THE BUILDINGS LEARNED OUR SPEED","WE CROSSED THE MACHINE'S HEART","MORNING COMPILED ON THE HORIZON"]}},
    {id:"CITY_CLOCK",name:"Transit Clock",type:"SIGNAL OPERATOR",kind:"Beat",x:165,y:8,color:"#55d887",value:"126 BPM",enabled:true,bindings:{pulse:{source:"beat",amount:.2}}},
    {id:"CITY_BLOCK",name:"Building Seed",type:"GEOMETRY OPERATOR",kind:"Primitive",runtimeRole:"cityBuildings",x:310,y:8,color:"#5da7ff",value:"SDF BLOCK",enabled:true},
    {id:"CITY_REPEAT",name:"Infinite Blocks",type:"GEOMETRY OPERATOR",kind:"Grid Array",runtimeRole:"cityRepeat",x:455,y:8,color:"#25c9cd",value:"INFINITE Z",enabled:true,bindings:{twist:{source:"bar",amount:.06}}},
    {id:"CITY_HEIGHT",name:"Seeded Skyline",type:"GEOMETRY OPERATOR",kind:"Fractal",runtimeRole:"cityHeight",x:600,y:8,color:"#9b7bff",value:"HASH HEIGHT",enabled:true,bindings:{texScale:{source:"bar",amount:.08}}},
    {id:"CITY_ROAD",name:"Procedural Road",type:"GEOMETRY OPERATOR",kind:"Grid Array",runtimeRole:"cityRoad",x:745,y:8,color:"#5da7ff",value:"LANES",enabled:true},
    {id:"CITY_LIGHT",name:"Window Emission",type:"MATERIAL OPERATOR",kind:"Emission",runtimeRole:"cityLights",x:165,y:102,color:"#ff2f8e",value:"BEAT WINDOWS",enabled:true,bindings:{bloom:{source:"beat",amount:.14},pulse:{source:"envelope",amount:.18}}},
    {id:"CITY_BRIDGE",name:"District Bridges",type:"GEOMETRY OPERATOR",kind:"Multiply",runtimeRole:"cityBridges",x:310,y:102,color:"#9b7bff",value:"SKY LINKS",enabled:true},
    {id:"CITY_CAMERA",name:"Forward Travel",type:"SCENE OPERATOR",kind:"Camera",runtimeRole:"cityCamera",x:455,y:102,color:"#f1b85b",value:"30 SEC PATH",enabled:true,bindings:{cameraPitch:{source:"bar",amount:.06}}},
    {id:"CITY_OUT",name:"Transit Output",type:"OUTPUT OPERATOR",kind:"Output",runtimeRole:"cityOutput",x:745,y:102,color:"#ff5a36",value:"00:30 LOOP",enabled:true}
  ],
  connections:[["CITY_TITLE","CITY_OUT"],["CITY_TAG","CITY_OUT"],["CITY_CLOCK","CITY_LIGHT"],["CITY_BLOCK","CITY_REPEAT"],["CITY_REPEAT","CITY_HEIGHT"],["CITY_HEIGHT","CITY_LIGHT"],["CITY_HEIGHT","CITY_BRIDGE"],["CITY_LIGHT","CITY_OUT"],["CITY_BRIDGE","CITY_OUT"],["CITY_ROAD","CITY_OUT"],["CITY_CAMERA","CITY_OUT"]],
  textureNodes:[
    {id:"CITY_T1",name:"Animated Noise · Asphalt",type:"NATIVE TEXTURE GENERATOR",kind:"Animated Noise",runtimeRole:"cityAsphaltTexture",x:25,y:34,color:"#25c9cd",value:"3 OCTAVES",enabled:true},
    {id:"CITY_T2",name:"Animated Noise · Facade",type:"NATIVE TEXTURE GENERATOR",kind:"Animated Noise",runtimeRole:"cityFacadeTexture",x:170,y:74,color:"#25c9cd",value:"FINE FBM",enabled:true,bindings:{texScale:{source:"bar",amount:.08}}},
    {id:"CITY_T3",name:"Domain Warp · Grime",type:"NATIVE TEXTURE MODIFIER",kind:"Domain Warp",runtimeRole:"cityGrimeTexture",x:315,y:38,color:"#5da7ff",value:"MULTISCALE",enabled:true,bindings:{texWarp:{source:"sine",amount:.1}}},
    {id:"CITY_T4",name:"Kaleidoscope · Windows",type:"NATIVE TEXTURE MODIFIER",kind:"Kaleidoscope",runtimeRole:"cityWindowMask",x:460,y:72,color:"#9b7bff",value:"FLOORS / BAYS",enabled:true},
    {id:"CITY_T5",name:"Palette Map · District",type:"NATIVE TEXTURE COLOR",kind:"Palette Map",runtimeRole:"cityPaletteTexture",x:605,y:36,color:"#ff2f8e",value:"5 GRADES",enabled:true,bindings:{texMix:{source:"beat",amount:.06}}},
    {id:"CITY_T6",name:"Texture Output · Facade",type:"NATIVE TEXTURE OUTPUT",kind:"Texture Output",runtimeRole:"cityTextureOutput",x:750,y:68,color:"#55d887",value:"PBR-LIKE",enabled:true}
  ],textureConnections:[["CITY_T1","CITY_T3"],["CITY_T2","CITY_T3"],["CITY_T3","CITY_T4"],["CITY_T4","CITY_T5"],["CITY_T5","CITY_T6"]],
  postNodes:[
    {id:"CITY_P1",name:"City Input",type:"RENDER INPUT",kind:"Scene Input",x:25,y:58,color:"#5da7ff",value:"HDR",enabled:true},
    {id:"CITY_P2",name:"Velocity Split",type:"POST FX OPERATOR",kind:"Chromatic",x:175,y:34,color:"#9b7bff",value:"MOTION",enabled:true},
    {id:"CITY_P3",name:"Neon Bloom",type:"POST FX OPERATOR",kind:"Bloom",x:325,y:66,color:"#ff2f8e",value:"WINDOW GLOW",enabled:true,bindings:{bloom:{source:"beat",amount:.16}}},
    {id:"CITY_P4",name:"District Grade",type:"POST FX OPERATOR",kind:"Color Grade",x:475,y:34,color:"#f1b85b",value:"5 PALETTES",enabled:true},
    {id:"CITY_P5",name:"Transit Grain",type:"POST FX OPERATOR",kind:"Film Grain",x:625,y:66,color:"#9b7bff",value:"NIGHT FILM",enabled:true},
    {id:"CITY_P6",name:"Final Window",type:"RENDER OUTPUT",kind:"Output",x:775,y:42,color:"#55d887",value:"DISPLAY",enabled:true}
  ],postConnections:[["CITY_P1","CITY_P2"],["CITY_P2","CITY_P3"],["CITY_P3","CITY_P4"],["CITY_P4","CITY_P5"],["CITY_P5","CITY_P6"]],
  audioNodes:[
    {id:"CITY_A1",name:"Motor Clock",type:"AUDIO CONTROL",kind:"Beat",x:25,y:58,color:"#55d887",value:"126 BPM",enabled:true},
    {id:"CITY_A2",name:"Garage Drums",type:"AUDIO OPERATOR",kind:"Drum Machine",x:175,y:32,color:"#55d887",value:"NIGHT DRIVE",enabled:true,bindings:{audioDrive:{source:"bar",amount:.12}}},
    {id:"CITY_A3",name:"Engine Bass",type:"AUDIO OPERATOR",kind:"Bass Synth",x:325,y:72,color:"#25c9cd",value:"C MINOR",enabled:true,bindings:{audioCutoff:{source:"envelope",amount:.38}}},
    {id:"CITY_A4",name:"Tunnel Filter",type:"AUDIO OPERATOR",kind:"Lowpass",x:475,y:32,color:"#f1b85b",value:"1380 HZ",enabled:true,bindings:{audioCutoff:{source:"sine",amount:.16}}},
    {id:"CITY_A5",name:"Street Echo",type:"AUDIO OPERATOR",kind:"Delay",x:625,y:72,color:"#9b7bff",value:"38%",enabled:true},
    {id:"CITY_A6",name:"Transit Master",type:"AUDIO OUTPUT",kind:"Audio Output",x:775,y:42,color:"#ff2f8e",value:"-7 DB",enabled:true}
  ],audioConnections:[["CITY_A1","CITY_A2"],["CITY_A1","CITY_A3"],["CITY_A2","CITY_A4"],["CITY_A3","CITY_A4"],["CITY_A4","CITY_A5"],["CITY_A5","CITY_A6"]]
};

const rainMeshSpecs=[
  ["ROOM_SHELL","Architectural Shell","roomShell",[["Primitive","Outer House Box","BOX",14],["Boolean Subtract","Carve Shared Interior","HOUSE VOID"],["Boolean Union","Add Cross Partition Walls","2 × 2 ROOMS"],["Boolean Subtract","Cut Traversal Door Openings","4 OPEN DOORS"],["Bevel","Finish Door Reveals","HOUSE SHELL"]]],
  ["ROOM_WINDOW","Rain Window Frame","roomWindow",[["Primitive","Window Bar Box","RECT PRISM",16],["Multiply","Repeat Mullions","3 BARS"],["Transform","Place Window Frame","BACK WALL"]]],
  ["ROOM_SOFA","Linen Sectional","roomSofa",[["Primitive","Rounded Cushion","ROUNDED BOX",11],["Multiply","Repeat Sofa Modules","2 MODULES"],["Smooth Union","Fuse Sectional Cushions","LINEN SOFA"]]],
  ["ROOM_RUG","Woven House Rugs","roomRug",[["Primitive","Thin Rug Plane","PLANE",15],["Multiply","Living + Bedroom Rugs","2 ROOMS"],["Transform","Place Floor Rugs","FLOOR"]]],
  ["ROOM_SHELF","Library Shelves","roomShelves",[["Primitive","Shelf Board","RECT PRISM",16],["Multiply","Repeat Shelf Boards","4 SHELVES"],["Transform","Place Library Assembly","BACK WALL"]]],
  ["ROOM_BOOKS","Library Books","roomBooks",[["Primitive","Book Block","BOX",14],["Multiply","Repeat Book Volumes","7 BOOKS"],["Transform","Vary Book Placement","LIBRARY"]]],
  ["ROOM_CERAMIC","Thrown Ceramic","roomCeramic",[["Primitive","Ceramic Cylinder","CYLINDER",7],["Boolean Subtract","Hollow Vessel Interior","HOLLOW"],["Bevel","Round Ceramic Lip","VASE"]]],
  ["ROOM_PLANT","Procedural Foliage","roomPlant",[["Primitive","Plant Stem Cylinder","CYLINDER",7],["Radial Repeat","Repeat Leaves","7 LEAVES"],["Smooth Union","Fuse Plant Mesh","POT + FOLIAGE"]]],
  ["ROOM_KITCHEN","Kitchen Cabinet Run","roomKitchenCabinets",[["Primitive","Cabinet Box","BOX",14],["Grid Array","Repeat Cabinets","5 CABINETS"],["Transform","Place Cabinet Run","KITCHEN WALL"]]],
  ["ROOM_ISLAND","Quartz Stone Island","roomIsland",[["Primitive","Island Base Box","BOX",14],["Boolean Union","Add Stone Worktop","QUARTZ TOP"],["Bevel","Bevel Island Edges","VEINED ISLAND"]]],
  ["ROOM_SINK","Brushed Steel Sink","roomSink",[["Primitive","Sink Rounded Box","ROUNDED BOX",11],["Boolean Subtract","Carve Sink Basin","BASIN"],["Bevel","Round Steel Rim","STEEL SINK"]]],
  ["ROOM_STOOLS","Walnut Stool Set","roomStools",[["Primitive","Stool Seat Disc","DISC",17],["Multiply","Repeat Stool Parts","3 STOOLS"],["Transform","Place Island Stools","COUNTER"]]],
  ["ROOM_BED","Linen Bed Frame","roomBed",[["Primitive","Mattress Box","BOX",14],["Smooth Union","Fuse Base + Headboard","BED FRAME"],["Bevel","Soften Bed Edges","LINEN BED"]]],
  ["ROOM_PILLOWS","Four Linen Pillows","roomPillows",[["Primitive","Rounded Pillow","ROUNDED BOX",11],["Multiply","Repeat Pillow Layers","4 PILLOWS"],["Transform","Place Pillow Stack","HEADBOARD"]]],
  ["ROOM_NIGHTSTANDS","Walnut Nightstands","roomNightstands",[["Primitive","Nightstand Box","BOX",14],["Multiply","Mirror Nightstands","PAIR"],["Bevel","Bevel Walnut Blocks","BEDSIDE"]]],
  ["ROOM_STUDIO","Studio Workbench","roomDesk",[["Primitive","Desk Top Rectangular Prism","RECT PRISM",16],["Multiply","Repeat Desk Legs","4 LEGS"],["Boolean Union","Fuse Desk Assembly","WORKBENCH"],["Bevel","Finish Desk Edges","STUDIO DESK"]]],
  ["ROOM_MONITOR","Studio Display","roomMonitor",[["Primitive","Monitor Rectangular Prism","RECT PRISM",16],["Boolean Subtract","Inset Glass Screen","SCREEN"],["Bevel","Round Display Bezel","MONITOR"]]],
  ["ROOM_CHAIR","Upholstered Chair","roomChair",[["Primitive","Chair Rounded Box","ROUNDED BOX",11],["Smooth Union","Fuse Seat + Back","CHAIR BODY"],["Transform","Place Studio Chair","STUDIO"]]],
  ["ROOM_ART","Three Wall Studies","roomArt",[["Primitive","Art Panel Plane","PLANE",15],["Multiply","Repeat Framed Studies","TRIPTYCH"],["Transform","Place Wall Art","STUDIO WALL"]]],
  ["ROOM_LIGHT","Warm Pendant Lights","roomPendant",[["Primitive","Pendant Cone Shade","CONE",8],["Boolean Union","Add Cylinder Cable","SHADE + CABLE"],["Multiply","Repeat Room Pendants","2700 K"]]],
  ["ROOM_LIVING_DETAILS","Living Room Detail Set","roomLivingDetails",[["Primitive","Ellipsoid Throw Cushion","ELLIPSOID",19],["Multiply","Repeat Cushions + Side Objects","DETAIL COPIES"],["Boolean Union","Add Tube Lamp + Disc Table","PRIMITIVE ASSEMBLY"],["Bevel","Finish Living Details","LIVING DETAIL SET"]]],
  ["ROOM_KITCHEN_DETAILS","Kitchen Detail Set","roomKitchenDetails",[["Primitive","Appliance Box","BOX",14],["Multiply","Repeat Fridge + Oven Volumes","APPLIANCE BLOCKS"],["Boolean Subtract","Cut Oven Glass + Door Seams","INSETS"],["Bevel","Finish Kitchen Details","KITCHEN DETAIL SET"]]],
  ["ROOM_BEDROOM_DETAILS","Bedroom Detail Set","roomBedroomDetails",[["Primitive","Bench Rectangular Prism","RECT PRISM",16],["Multiply","Repeat Bench + Wardrobe Parts","ROOM STORAGE"],["Boolean Union","Add Cylinder Legs + Tube Lamp","PRIMITIVE ASSEMBLY"],["Bevel","Finish Bedroom Details","BEDROOM DETAIL SET"]]],
  ["ROOM_STUDIO_DETAILS","Studio Detail Set","roomStudioDetails",[["Primitive","Speaker Box","BOX",14],["Multiply","Repeat Speakers + Keyboard Keys","STUDIO PARTS"],["Boolean Union","Add Disc Drivers + Tube Lamp","PRIMITIVE ASSEMBLY"],["Bevel","Finish Studio Details","STUDIO DETAIL SET"]]]
];
const RAIN_MESH_NODES=[],RAIN_MESH_CONNECTIONS=[],RAIN_MESH_OUTPUTS=[];
rainMeshSpecs.forEach(([finalId,label,role,stages],assemblyIndex)=>{let previous=null;stages.forEach(([kind,name,value,shape],stageIndex)=>{const last=stageIndex===stages.length-1,id=last?finalId:`${finalId}_S${stageIndex+1}`,node={id,name:`${label} · ${name}`,type:"GEOMETRY OPERATOR",kind,x:165+stageIndex*155,y:12+assemblyIndex*94,color:kind==="Primitive"?"#5da7ff":kind.includes("Union")||kind.includes("Subtract")?"#9b7bff":"#25c9cd",value,enabled:true,...(shape!==undefined?{params:{shapeMode:shape}}:{}),...(last?{runtimeRole:role}:{})};RAIN_MESH_NODES.push(node);if(previous)RAIN_MESH_CONNECTIONS.push([previous,id]);previous=id;});RAIN_MESH_OUTPUTS.push(finalId);});
RAIN_MESH_NODES.push(
  {id:"ROOM_TABLE_LEG",name:"Walnut Table · Cylinder Leg",type:"GEOMETRY OPERATOR",kind:"Primitive",x:165,y:1900,color:"#5da7ff",value:"CYLINDER",enabled:true,params:{shapeMode:7}},
  {id:"ROOM_TABLE_LEG_X",name:"Walnut Table · Scale + Translate Leg",type:"GEOMETRY OPERATOR",kind:"Transform",x:320,y:1900,color:"#25c9cd",value:"NARROW / DOWN",enabled:true},
  {id:"ROOM_TABLE_LEGS",name:"Walnut Table · Four Legs",type:"GEOMETRY OPERATOR",kind:"Multiply",x:475,y:1900,color:"#25c9cd",value:"4 COPIES",enabled:true},
  {id:"ROOM_TABLE_TOP",name:"Walnut Table · Rectangular Top",type:"GEOMETRY OPERATOR",kind:"Primitive",x:165,y:1994,color:"#5da7ff",value:"RECT PRISM",enabled:true,params:{shapeMode:16}},
  {id:"ROOM_TABLE_TOP_X",name:"Walnut Table · Scale + Translate Top",type:"GEOMETRY OPERATOR",kind:"Transform",x:320,y:1994,color:"#25c9cd",value:"WIDE / THIN",enabled:true},
  {id:"ROOM_TABLE_APRON",name:"Walnut Table · Rectangular Apron",type:"GEOMETRY OPERATOR",kind:"Primitive",x:165,y:2088,color:"#5da7ff",value:"RECT PRISM",enabled:true,params:{shapeMode:16}},
  {id:"ROOM_TABLE_APRON_X",name:"Walnut Table · Scale Apron Rails",type:"GEOMETRY OPERATOR",kind:"Transform",x:320,y:2088,color:"#25c9cd",value:"LONG / NARROW",enabled:true},
  {id:"ROOM_TABLE_APRONS",name:"Walnut Table · Four Apron Rails",type:"GEOMETRY OPERATOR",kind:"Multiply",x:475,y:2088,color:"#25c9cd",value:"4 RAILS",enabled:true},
  {id:"ROOM_TABLE_FUSE",name:"Walnut Table · Fuse Top + Legs",type:"GEOMETRY OPERATOR",kind:"Boolean Union",x:630,y:1947,color:"#9b7bff",value:"MESH FUSION",enabled:true},
  {id:"ROOM_TABLE",name:"Walnut Table · Final Bevel",type:"GEOMETRY OPERATOR",kind:"Bevel",runtimeRole:"roomTable",x:785,y:1947,color:"#f1b85b",value:"FINAL TABLE",enabled:true}
);
RAIN_MESH_CONNECTIONS.push(["ROOM_TABLE_LEG","ROOM_TABLE_LEG_X"],["ROOM_TABLE_LEG_X","ROOM_TABLE_LEGS"],["ROOM_TABLE_LEGS","ROOM_TABLE_FUSE"],["ROOM_TABLE_TOP","ROOM_TABLE_TOP_X"],["ROOM_TABLE_TOP_X","ROOM_TABLE_FUSE"],["ROOM_TABLE_APRON","ROOM_TABLE_APRON_X"],["ROOM_TABLE_APRON_X","ROOM_TABLE_APRONS"],["ROOM_TABLE_APRONS","ROOM_TABLE_FUSE"],["ROOM_TABLE_FUSE","ROOM_TABLE"]);RAIN_MESH_OUTPUTS.push("ROOM_TABLE");

const rainTextureSpecs=[
  ["Plaster + Ceiling","Speckles","Animated Noise","#aaa297","Domain Warp"],
  ["Window Frames","Stripes","Speckles","#343331","Edge Wear"],
  ["Linen Upholstery","Fabric Weave","Animated Noise","#718073","Domain Warp"],
  ["Brushed Metal","Stripes","Speckles","#8f9898","Domain Warp"],
  ["Walnut Wood","Wood Grain","Rings","#8c3e18","Edge Wear"],
  ["Books + Wall Art","Checker","Speckles","#b35b32","Edge Wear"],
  ["Thrown Ceramic","Rings","Speckles","#b8a78e","Domain Warp"],
  ["Plant Leaves","Voronoi","Gradient","#397447","Domain Warp"],
  ["Pendant Emission","Gradient","Animated Noise","#ffad5c","Texture Blend"],
  ["Quartz Stone","Stone Veins","Speckles","#aaa9a1","Domain Warp"],
  ["Tile + Cabinets","Masonry","Speckles","#8d8980","Edge Wear"],
  ["Bed Linen","Fabric Weave","Animated Noise","#d1c8b5","Domain Warp"],
  ["Monitor Glass","Gradient","Speckles","#18313a","Texture Blend"],
  ["Woven Rugs","Fabric Weave","Stripes","#a84926","Edge Wear"],
  ["Rain Glass","Speckles","Gradient","#7896a5","Domain Warp"]
];
const RAIN_TEXTURE_NODES=[],RAIN_TEXTURE_CONNECTIONS=[];
rainTextureSpecs.forEach(([label,kindA,kindB,accentColor,detailKind="Domain Warp"],index)=>{const row=index*96+18,prefix=`ROOM_TX${String(index+1).padStart(2,"0")}`,a=`${prefix}_A`,b=`${prefix}_B`,blend=`${prefix}_BLEND`,detail=`${prefix}_DETAIL`,palette=`${prefix}_PALETTE`,output=`${prefix}_OUT`;RAIN_TEXTURE_NODES.push(
  {id:a,name:`${label} · Primary Primitive`,type:"TEXTURE PRIMITIVE",kind:kindA,x:25,y:row,color:"#25c9cd",value:kindA.toUpperCase(),enabled:true},
  {id:b,name:`${label} · Detail Primitive`,type:"TEXTURE PRIMITIVE",kind:kindB,x:170,y:row,color:"#5da7ff",value:kindB.toUpperCase(),enabled:true},
  {id:blend,name:`${label} · Generic Blend`,type:"TEXTURE COMPOSITION",kind:"Texture Blend",x:315,y:row,color:"#9b7bff",value:"TWO INPUTS",enabled:true},
  {id:detail,name:`${label} · ${detailKind}`,type:"TEXTURE COMPOSITION",kind:detailKind,x:460,y:row,color:"#5da7ff",value:detailKind==="Edge Wear"?"RESTRAINED EDGES":"WEATHER / MICRO",enabled:true},
  {id:palette,name:`${label} · Surface Palette`,type:"TEXTURE COLOR",kind:"Palette Map",x:605,y:row,color:accentColor,value:"ALBEDO / ROUGHNESS",enabled:true,params:{accentColor}},
  {id:output,name:`${label} · Material Output`,type:"TEXTURE OUTPUT",kind:"Texture Output",runtimeRole:`roomTextureMat${index+1}`,x:750,y:row,color:"#55d887",value:`SURFACE ${index+1} / 15`,enabled:true}
);RAIN_TEXTURE_CONNECTIONS.push([a,blend],[b,blend],[blend,detail],[detail,palette],[palette,output]);});

const RAIN_ROOM_PROJECT={
  name:"RAIN ROOM · REALISTIC INTERIOR",duration:30,bpm:108,showcase:false,visualMode:"realisticRoom",selected:"ROOM_CAMERA",
  params:{shapeMode:11,color:"#b35b32",accent:"#55745f",metallic:.18,roughness:.62,twist:.08,bloom:.24,vignette:.05,pulse:.18,scale:1,exposure:1.08,texScale:5.2,texSpeed:.38,texWarp:1.1,texContrast:1.45,texKaleido:4,texMix:.78,multiplyCount:8,multiplySpread:1,audioCutoff:940,audioDecay:.46,audioDelay:.3,audioDrive:.22,synthAttack:.72,synthRelease:2.4,synthDetune:.28,padLevel:.46,arpRate:2,arpOctaves:2,reverbMix:.34,chorusMix:.2,drumTone:.62,mixerGain:.72,showMix:0},audio:{volume:.34},
  nodes:[
    {id:"ROOM_TITLE",name:"Room Captions",type:"TEXT OPERATOR",kind:"Text",x:20,y:12,color:"#b35b32",value:"4 ROOMS",enabled:true,params:{text:"I. RAIN LIVING ROOM",textColor:"#e8dfd2",textSize:18,textX:18,textY:14,textRotation:0,textWave:.02,sequenceStep:7.5,sequence:["I. RAIN LIVING ROOM","II. STONE KITCHEN","III. CREATIVE STUDIO","IV. LINEN BEDROOM"]}},
    {id:"ROOM_CLOCK",name:"Quiet Pulse",type:"SIGNAL OPERATOR",kind:"Sine",x:165,y:12,color:"#55d887",value:"108 BPM",enabled:true,bindings:{pulse:{source:"half",amount:.08}}},
    ...RAIN_MESH_NODES,
    {id:"ROOM_CAM_ANCHOR",name:"House Camera Anchor",type:"SCENE OPERATOR",kind:"Mesh Anchor",x:165,y:396,color:"#5da7ff",value:"SHELL LOCAL",enabled:true,params:{anchorX:0,anchorY:0,anchorZ:0}},
    {id:"ROOM_CAM_PARENT",name:"Twelve-Point Door-Safe Route",type:"SCENE OPERATOR",kind:"Spline Path",x:310,y:396,color:"#55d887",value:"ROOM ↔ OPEN DOOR",enabled:true,params:{p0x:-5.8,p0y:.3,p0z:-5.8,p1x:-5.25,p1y:.36,p1z:-4.95,p2x:0,p2y:.28,p2z:-4,p3x:5.8,p3y:.34,p3z:-5.8,p4x:5.25,p4y:.4,p4z:-4.95,p5x:4,p5y:.3,p5z:0,p6x:5.8,p6y:.4,p6z:2.05,p7x:5.2,p7y:.46,p7z:2.8,p8x:0,p8y:.32,p8z:4,p9x:-5.8,p9y:.38,p9z:2.05,p10x:-5.2,p10y:.44,p10z:2.8,p11x:-4,p11y:.3,p11z:0,splinePointCount:12,splineDuration:30,splinePhase:0}},
    {id:"ROOM_CAM_PATH",name:"Per-Room Gentle Dolly",type:"SCENE OPERATOR",kind:"Spline Path",x:455,y:396,color:"#55d887",value:"SAFE 7.5 SEC LAYER",enabled:true,params:{p0x:-.06,p0y:-.015,p0z:0,p1x:.05,p1y:.035,p1z:.04,p2x:.07,p2y:0,p2z:-.025,p3x:-.04,p3y:-.02,p3z:.035,splineDuration:7.5,splinePhase:0}},
    {id:"ROOM_CAM_PORTAL",name:"Doorway Ease",type:"SCENE OPERATOR",kind:"Spline Path",x:520,y:588,color:"#f1b85b",value:"CLEARANCE-SAFE",enabled:true,params:{p0x:-.015,p0y:-.01,p0z:.025,p1x:.015,p1y:.018,p1z:-.015,p2x:.012,p2y:.005,p2z:.02,p3x:-.012,p3y:.018,p3z:-.015,splineDuration:3.75,splinePhase:.02}},
    {id:"ROOM_CAM_MICRO",name:"Camera Crane + Sway",type:"SCENE OPERATOR",kind:"Spline Path",x:600,y:684,color:"#42ecff",value:"2.5 SEC MOTION LAYER",enabled:true,params:{p0x:-.045,p0y:-.025,p0z:.02,p1x:.055,p1y:.045,p1z:-.025,p2x:.04,p2y:-.015,p2z:.035,p3x:-.05,p3y:.03,p3z:-.02,splineDuration:2.5,splinePhase:.08},bindings:{splinePhase:{source:"sine",amount:.015}}},
    {id:"ROOM_CAM_ROT",name:"Camera Look Spline",type:"SCENE OPERATOR",kind:"Spline Rotation",x:600,y:396,color:"#9b7bff",value:"YAW + PITCH",enabled:true,params:{splineYaw:.07,splinePitch:.08,splineRoll:0,splinePhase:.1}},
    {id:"ROOM_CAM_TARGET_PATH",name:"Twelve-Point Occlusion-Safe Look Route",type:"SCENE OPERATOR",kind:"Spline Path",x:745,y:588,color:"#55d887",value:"DETAIL ↔ OPEN DOOR",enabled:true,params:{p0x:-4.35,p0y:-.24,p0z:-3.5,p1x:-4.9,p1y:-.16,p1z:-3.15,p2x:4.05,p2y:-.22,p2z:-3.55,p3x:4.15,p3y:-.28,p3z:-3.55,p4x:4.8,p4y:-.12,p4z:-3.05,p5x:3.8,p5y:-.12,p5z:4.4,p6x:3.65,p6y:-.16,p6z:4.65,p7x:4.7,p7y:-.08,p7z:4.35,p8x:-4.05,p8y:-.22,p8z:4.5,p9x:-4.05,p9y:-.28,p9z:4.55,p10x:-4.75,p10y:-.1,p10z:4.35,p11x:-4.35,p11y:-.18,p11z:-3.4,splinePointCount:12,splineDuration:30,splinePhase:0}},
    {id:"ROOM_CAM_TRACK",name:"Track Room Details",type:"SCENE OPERATOR",kind:"Spline Target",x:890,y:588,color:"#ff6d42",value:"CAMERA LOOK-AT",enabled:true,params:{trackAhead:.04,trackX:0,trackY:0,trackZ:0,trackStrength:1},bindings:{trackAhead:{source:"sine",amount:.025}}},
    {id:"ROOM_PARTICLE_RAIN",name:"Window Rain Streaks",type:"PARTICLE OPERATOR",kind:"Particle Emitter",runtimeRole:"roomRainParticles",x:165,y:780,color:"#5da7ff",value:"20 GPU PARTICLES",enabled:true,params:{particleStyle:0,particleCount:20,particleSize:.012,particleSpeed:.82,particleLife:1.15,particleSpread:1.35,particleTurbulence:.22,particleGravity:1.2,particleOpacity:.32},bindings:{particleOpacity:{source:"sine",amount:.08}}},
    {id:"ROOM_PARTICLE_MIST",name:"Window Mist Drift",type:"PARTICLE OPERATOR",kind:"Particle Emitter",runtimeRole:"roomMistParticles",x:310,y:780,color:"#25c9cd",value:"8 SOFT MOTES",enabled:true,params:{particleStyle:1,particleCount:8,particleSize:.025,particleSpeed:.12,particleLife:2.4,particleSpread:1.05,particleTurbulence:.55,particleGravity:.12,particleOpacity:.055}},
    {id:"ROOM_PARTICLE_DUST",name:"Warm Interior Dust",type:"PARTICLE OPERATOR",kind:"Particle Emitter",runtimeRole:"roomDustParticles",x:455,y:780,color:"#f1b85b",value:"12 DUST MOTES",enabled:true,params:{particleStyle:2,particleCount:12,particleSize:.01,particleSpeed:.09,particleLife:2.8,particleSpread:1.25,particleTurbulence:.7,particleGravity:.18,particleOpacity:.16},bindings:{particleOpacity:{source:"bar",amount:.06}}},
    {id:"ROOM_CER_ANCHOR",name:"Walnut Table Anchor",type:"SCENE OPERATOR",kind:"Mesh Anchor",x:745,y:396,color:"#b35b32",value:"TABLE LOCAL",enabled:true,params:{anchorX:0,anchorY:.17,anchorZ:0}},
    {id:"ROOM_CER_PATH",name:"Ceramic Orbit Spline",type:"SCENE OPERATOR",kind:"Spline Path",x:890,y:396,color:"#55d887",value:"MESH-RELATIVE",enabled:true,params:{p0x:-.16,p0y:0,p0z:0,p1x:0,p1y:.08,p1z:.12,p2x:.16,p2y:0,p2z:0,p3x:0,p3y:.04,p3z:-.1,splineDuration:7.5,splinePhase:.2}},
    {id:"ROOM_CER_ROT",name:"Ceramic Turn Spline",type:"SCENE OPERATOR",kind:"Spline Rotation",x:165,y:492,color:"#9b7bff",value:"ONE TURN",enabled:true,params:{splineYaw:.5,splinePitch:0,splineRoll:0,splinePhase:0}},
    {id:"ROOM_CER_ATTACH",name:"Ceramic Spline Attachment",type:"SCENE OPERATOR",kind:"Attach to Spline",x:310,y:492,color:"#f1b85b",value:"OBJECT + PATH",enabled:true,params:{attachX:0,attachY:0,attachZ:0,attachStart:0,attachSpeed:1,attachOrient:1}},
    {id:"ROOM_CHAIR_ANCHOR",name:"Studio Desk Anchor",type:"SCENE OPERATOR",kind:"Mesh Anchor",x:455,y:492,color:"#5da7ff",value:"DESK LOCAL",enabled:true,params:{anchorX:2.2,anchorY:-.04,anchorZ:-.17}},
    {id:"ROOM_CHAIR_PATH",name:"Chair Glide Spline",type:"SCENE OPERATOR",kind:"Spline Path",x:600,y:492,color:"#55d887",value:"MESH-RELATIVE",enabled:true,params:{p0x:-.18,p0y:0,p0z:0,p1x:.08,p1y:0,p1z:.12,p2x:.18,p2y:0,p2z:0,p3x:-.06,p3y:0,p3z:-.1,splineDuration:7.5,splinePhase:.5}},
    {id:"ROOM_CHAIR_ATTACH",name:"Chair Spline Attachment",type:"SCENE OPERATOR",kind:"Attach to Spline",x:745,y:492,color:"#f1b85b",value:"CHAIR + PATH",enabled:true,params:{attachX:0,attachY:0,attachZ:0,attachStart:.1,attachSpeed:.7,attachOrient:.7}},
    {id:"ROOM_SURFACES",name:"Layered Real Materials",type:"MATERIAL OPERATOR",kind:"Normal Map",runtimeRole:"roomMaterials",x:600,y:108,color:"#b35b32",value:"PLASTER / WOOD / LINEN",enabled:true},
    {id:"ROOM_CAMERA",name:"Four-Room Camera Tour",type:"SCENE OPERATOR",kind:"Camera",runtimeRole:"roomCamera",x:745,y:300,color:"#f1b85b",value:"4 × 7.5 SEC",enabled:true,bindings:{cameraPitch:{source:"sine",amount:.035}}},
    {id:"ROOM_OUT",name:"House Tour Output",type:"OUTPUT OPERATOR",kind:"Output",runtimeRole:"roomOutput",x:890,y:300,color:"#ff5a36",value:"00:30 LOOP",enabled:true}
  ],
  connections:[
    ["ROOM_TITLE","ROOM_OUT"],["ROOM_CLOCK","ROOM_LIGHT"],
    ...RAIN_MESH_CONNECTIONS,
    ...RAIN_MESH_OUTPUTS.filter(id=>!["ROOM_CERAMIC","ROOM_CHAIR","ROOM_LIGHT"].includes(id)).map(id=>[id,"ROOM_SURFACES"]),
    ["ROOM_SHELL","ROOM_CAM_ANCHOR"],["ROOM_CAM_ANCHOR","ROOM_CAM_PARENT"],["ROOM_CAM_PARENT","ROOM_CAM_PATH"],["ROOM_CAM_PATH","ROOM_CAM_PORTAL"],["ROOM_CAM_PORTAL","ROOM_CAM_MICRO"],["ROOM_CAM_MICRO","ROOM_CAMERA"],["ROOM_CAM_ROT","ROOM_CAMERA"],["ROOM_CAM_ANCHOR","ROOM_CAM_TARGET_PATH"],["ROOM_CAM_TARGET_PATH","ROOM_CAM_TRACK"],["ROOM_CAM_TRACK","ROOM_CAMERA"],
    ["ROOM_TABLE","ROOM_CER_ANCHOR"],["ROOM_CER_ANCHOR","ROOM_CER_PATH"],["ROOM_CERAMIC","ROOM_CER_ATTACH"],["ROOM_CER_PATH","ROOM_CER_ATTACH"],["ROOM_CER_ROT","ROOM_CER_ATTACH"],["ROOM_CER_ATTACH","ROOM_SURFACES"],
    ["ROOM_STUDIO","ROOM_CHAIR_ANCHOR"],["ROOM_CHAIR_ANCHOR","ROOM_CHAIR_PATH"],["ROOM_CHAIR","ROOM_CHAIR_ATTACH"],["ROOM_CHAIR_PATH","ROOM_CHAIR_ATTACH"],["ROOM_CHAIR_ATTACH","ROOM_SURFACES"],
    ["ROOM_SURFACES","ROOM_LIGHT"],["ROOM_LIGHT","ROOM_OUT"],["ROOM_CAMERA","ROOM_OUT"],["ROOM_PARTICLE_RAIN","ROOM_OUT"],["ROOM_PARTICLE_MIST","ROOM_OUT"],["ROOM_PARTICLE_DUST","ROOM_OUT"]
  ],
  textureNodes:[...RAIN_TEXTURE_NODES],textureConnections:[...RAIN_TEXTURE_CONNECTIONS],
  postNodes:[
    {id:"ROOM_P1",name:"Interior HDR",type:"RENDER INPUT",kind:"Scene Input",x:25,y:58,color:"#5da7ff",value:"LINEAR",enabled:true},
    {id:"ROOM_P2",name:"Window Highlight Bloom",type:"POST FX OPERATOR",kind:"Bloom",x:175,y:32,color:"#f1b85b",value:"SUBTLE",enabled:true},
    {id:"ROOM_P3",name:"Warm Film Grade",type:"POST FX OPERATOR",kind:"Color Grade",x:325,y:72,color:"#b35b32",value:"PORTRA 400",enabled:true},
    {id:"ROOM_P4",name:"Fine Sensor Grain",type:"POST FX OPERATOR",kind:"Film Grain",x:475,y:32,color:"#9b7bff",value:"1.2%",enabled:true},
    {id:"ROOM_P5",name:"Lens Vignette",type:"POST FX OPERATOR",kind:"Vignette",x:625,y:72,color:"#9b7bff",value:"0.05",enabled:true},
    {id:"ROOM_P6",name:"Final Interior",type:"RENDER OUTPUT",kind:"Output",x:775,y:42,color:"#55d887",value:"DISPLAY",enabled:true}
  ],postConnections:[["ROOM_P1","ROOM_P2"],["ROOM_P2","ROOM_P3"],["ROOM_P3","ROOM_P4"],["ROOM_P4","ROOM_P5"],["ROOM_P5","ROOM_P6"]],
  audioNodes:[
    {id:"ROOM_A1",name:"Room Clock",type:"AUDIO CONTROL",kind:"Beat",x:20,y:22,color:"#55d887",value:"108 BPM",enabled:true},
    {id:"ROOM_A2",name:"Brush Kit",type:"AUDIO OPERATOR",kind:"Noise Percussion",x:165,y:8,color:"#55d887",value:"BRUSH / RAIN",enabled:true},
    {id:"ROOM_A3",name:"Soft Kick",type:"AUDIO OPERATOR",kind:"Drum Machine",x:165,y:102,color:"#55d887",value:"HALF TIME",enabled:true},
    {id:"ROOM_A4",name:"Warm Sub",type:"AUDIO OPERATOR",kind:"Bass Synth",x:310,y:8,color:"#25c9cd",value:"D MINOR",enabled:true},
    {id:"ROOM_A5",name:"Felt Poly",type:"AUDIO OPERATOR",kind:"Poly Synth",x:310,y:102,color:"#b35b32",value:"Dm7 · Bb · F · C",enabled:true},
    {id:"ROOM_A6",name:"Window Pad",type:"AUDIO OPERATOR",kind:"Pad Synth",x:455,y:8,color:"#55745f",value:"4 BAR AIR",enabled:true},
    {id:"ROOM_A7",name:"Glass Arpeggio",type:"AUDIO OPERATOR",kind:"Arpeggiator",x:455,y:102,color:"#42ecff",value:"1/8 · 2 OCT",enabled:true},
    {id:"ROOM_A8",name:"Tape Chorus",type:"AUDIO OPERATOR",kind:"Chorus",x:600,y:8,color:"#9b7bff",value:"20%",enabled:true},
    {id:"ROOM_A9",name:"Rain Delay",type:"AUDIO OPERATOR",kind:"Delay",x:600,y:102,color:"#9b7bff",value:"30%",enabled:true},
    {id:"ROOM_A10",name:"Concrete Reverb",type:"AUDIO OPERATOR",kind:"Reverb",x:745,y:8,color:"#f1b85b",value:"2.8 SEC",enabled:true},
    {id:"ROOM_A11",name:"Room Mixer",type:"AUDIO OPERATOR",kind:"Mixer",x:745,y:102,color:"#ff6d42",value:"-2.8 DB",enabled:true},
    {id:"ROOM_A12",name:"Room Master",type:"AUDIO OUTPUT",kind:"Audio Output",x:890,y:54,color:"#b35b32",value:"-9.4 DB",enabled:true}
  ],audioConnections:[["ROOM_A1","ROOM_A2"],["ROOM_A1","ROOM_A3"],["ROOM_A1","ROOM_A4"],["ROOM_A1","ROOM_A5"],["ROOM_A1","ROOM_A6"],["ROOM_A1","ROOM_A7"],["ROOM_A2","ROOM_A11"],["ROOM_A3","ROOM_A11"],["ROOM_A4","ROOM_A11"],["ROOM_A5","ROOM_A8"],["ROOM_A6","ROOM_A8"],["ROOM_A7","ROOM_A9"],["ROOM_A8","ROOM_A10"],["ROOM_A9","ROOM_A10"],["ROOM_A10","ROOM_A11"],["ROOM_A11","ROOM_A12"]]
};

export const BUILTIN_DEMOS = [
  {id:"rain-room",title:"Rain House",tag:"REALISTIC HOUSE TOUR",description:"A four-room cinematic journey through a detailed living room, stone kitchen, linen bedroom and creative studio with eight procedural material layers.",colors:["#b35b32","#55745f"],bpm:108,project:RAIN_ROOM_PROJECT,params:RAIN_ROOM_PROJECT.params},
  {id:"void-bloom",title:"Void Bloom",tag:"FULL PROJECT",description:"A 24-second signal garden of recursive petals, molten interference and breathing WebAudio.",colors:["#ff6846","#6df7ff"],bpm:132,project:VOID_BLOOM_PROJECT,params:VOID_BLOOM_PROJECT.params},
  {id:"procedural-city",title:"Night Transit",tag:"PROCEDURAL CITY",description:"A 30-second forward journey through five infinite generated districts, from neon night to compiled dawn.",colors:["#ff2f8e","#42ecff"],bpm:126,project:PROCEDURAL_CITY_PROJECT,params:PROCEDURAL_CITY_PROJECT.params},
  {id:"neon-cathedral",title:"Neon Cathedral",tag:"64K STUDY",description:"Iridescent orbital architecture with a warm cinematic bloom.",colors:["#ff583e","#20bed0"],bpm:128,params:{shapeMode:0,color:"#ff583e",accent:"#20bed0",twist:1.4,scale:1,roughness:.24,bloom:.72,vignette:.17,exposure:1.15,pulse:.34,texScale:3.8,texSpeed:.32,texWarp:1.15,texContrast:1.45,texKaleido:6,texMix:.72,audioCutoff:920,audioDecay:.32,audioDrive:.4}},
  {id:"crystal-reactor",title:"Crystal Reactor",tag:"PROCEDURAL",description:"A faceted energy core driven by sharp cyan and violet interference.",colors:["#62f5ff","#7851ff"],bpm:142,params:{shapeMode:1,color:"#62f5ff",accent:"#7851ff",twist:2.25,scale:.84,roughness:.08,bloom:1.05,vignette:.32,exposure:1.28,pulse:.7,texScale:7.2,texSpeed:.62,texWarp:2.1,texContrast:2.2,texKaleido:9,texMix:.9,audioCutoff:1450,audioDecay:.22,audioDrive:.76}},
  {id:"solar-organism",title:"Solar Organism",tag:"AUDIOVISUAL",description:"Soft metaball motion, molten gradients and a slow breathing bass clock.",colors:["#ffb52d","#ff315f"],bpm:96,params:{shapeMode:2,color:"#ffb52d",accent:"#ff315f",twist:.62,scale:1.15,roughness:.38,bloom:.88,vignette:.28,exposure:1.05,pulse:.92,texScale:2.6,texSpeed:.21,texWarp:2.65,texContrast:1.3,texKaleido:5,texMix:.82,audioCutoff:540,audioDecay:.58,audioDrive:.54}},
  {id:"monolith-array",title:"Monolith Array",tag:"HARD SURFACE",description:"A rotating geometric signal with restrained grain and deep contrast.",colors:["#d8f2ff","#2779ff"],bpm:118,params:{shapeMode:3,color:"#d8f2ff",accent:"#2779ff",twist:.18,scale:.92,roughness:.31,bloom:.36,vignette:.46,exposure:.78,pulse:.25,texScale:4.6,texSpeed:.12,texWarp:.48,texContrast:2.45,texKaleido:4,texMix:.55,audioCutoff:760,audioDecay:.28,audioDrive:.64}},
  {id:"acid-kaleido",title:"Acid Kaleido",tag:"TEXTURE TRIP",description:"High-frequency radial folding mapped across a liquid orbital form.",colors:["#d5ff28","#ff23ba"],bpm:150,params:{shapeMode:0,color:"#d5ff28",accent:"#ff23ba",twist:2.8,scale:1.08,roughness:.15,bloom:.96,vignette:.08,exposure:1.3,pulse:.62,texScale:8.4,texSpeed:1.1,texWarp:2.8,texContrast:2.6,texKaleido:13,texMix:1,audioCutoff:2100,audioDecay:.16,audioDrive:.88}},
  {id:"deep-field",title:"Deep Field",tag:"AMBIENT",description:"A quiet blue particle-like cluster suspended in a soft nocturnal grade.",colors:["#5b8cff","#40f0ce"],bpm:74,params:{shapeMode:2,color:"#5b8cff",accent:"#40f0ce",twist:.35,scale:.72,roughness:.5,bloom:.62,vignette:.55,exposure:.72,pulse:.48,texScale:1.8,texSpeed:.08,texWarp:1.4,texContrast:.92,texKaleido:3,texMix:.66,audioCutoff:380,audioDecay:.7,audioDrive:.22}}
];
