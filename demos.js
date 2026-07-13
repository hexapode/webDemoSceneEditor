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

export const BUILTIN_DEMOS = [
  {id:"void-bloom",title:"Void Bloom",tag:"FULL PROJECT",description:"A 24-second signal garden of recursive petals, molten interference and breathing WebAudio.",colors:["#ff6846","#6df7ff"],bpm:132,project:VOID_BLOOM_PROJECT,params:VOID_BLOOM_PROJECT.params},
  {id:"procedural-city",title:"Night Transit",tag:"PROCEDURAL CITY",description:"A 30-second forward journey through five infinite generated districts, from neon night to compiled dawn.",colors:["#ff2f8e","#42ecff"],bpm:126,project:PROCEDURAL_CITY_PROJECT,params:PROCEDURAL_CITY_PROJECT.params},
  {id:"neon-cathedral",title:"Neon Cathedral",tag:"64K STUDY",description:"Iridescent orbital architecture with a warm cinematic bloom.",colors:["#ff583e","#20bed0"],bpm:128,params:{shapeMode:0,color:"#ff583e",accent:"#20bed0",twist:1.4,scale:1,roughness:.24,bloom:.72,vignette:.17,exposure:1.15,pulse:.34,texScale:3.8,texSpeed:.32,texWarp:1.15,texContrast:1.45,texKaleido:6,texMix:.72,audioCutoff:920,audioDecay:.32,audioDrive:.4}},
  {id:"crystal-reactor",title:"Crystal Reactor",tag:"PROCEDURAL",description:"A faceted energy core driven by sharp cyan and violet interference.",colors:["#62f5ff","#7851ff"],bpm:142,params:{shapeMode:1,color:"#62f5ff",accent:"#7851ff",twist:2.25,scale:.84,roughness:.08,bloom:1.05,vignette:.32,exposure:1.28,pulse:.7,texScale:7.2,texSpeed:.62,texWarp:2.1,texContrast:2.2,texKaleido:9,texMix:.9,audioCutoff:1450,audioDecay:.22,audioDrive:.76}},
  {id:"solar-organism",title:"Solar Organism",tag:"AUDIOVISUAL",description:"Soft metaball motion, molten gradients and a slow breathing bass clock.",colors:["#ffb52d","#ff315f"],bpm:96,params:{shapeMode:2,color:"#ffb52d",accent:"#ff315f",twist:.62,scale:1.15,roughness:.38,bloom:.88,vignette:.28,exposure:1.05,pulse:.92,texScale:2.6,texSpeed:.21,texWarp:2.65,texContrast:1.3,texKaleido:5,texMix:.82,audioCutoff:540,audioDecay:.58,audioDrive:.54}},
  {id:"monolith-array",title:"Monolith Array",tag:"HARD SURFACE",description:"A rotating geometric signal with restrained grain and deep contrast.",colors:["#d8f2ff","#2779ff"],bpm:118,params:{shapeMode:3,color:"#d8f2ff",accent:"#2779ff",twist:.18,scale:.92,roughness:.31,bloom:.36,vignette:.46,exposure:.78,pulse:.25,texScale:4.6,texSpeed:.12,texWarp:.48,texContrast:2.45,texKaleido:4,texMix:.55,audioCutoff:760,audioDecay:.28,audioDrive:.64}},
  {id:"acid-kaleido",title:"Acid Kaleido",tag:"TEXTURE TRIP",description:"High-frequency radial folding mapped across a liquid orbital form.",colors:["#d5ff28","#ff23ba"],bpm:150,params:{shapeMode:0,color:"#d5ff28",accent:"#ff23ba",twist:2.8,scale:1.08,roughness:.15,bloom:.96,vignette:.08,exposure:1.3,pulse:.62,texScale:8.4,texSpeed:1.1,texWarp:2.8,texContrast:2.6,texKaleido:13,texMix:1,audioCutoff:2100,audioDecay:.16,audioDrive:.88}},
  {id:"deep-field",title:"Deep Field",tag:"AMBIENT",description:"A quiet blue particle-like cluster suspended in a soft nocturnal grade.",colors:["#5b8cff","#40f0ce"],bpm:74,params:{shapeMode:2,color:"#5b8cff",accent:"#40f0ce",twist:.35,scale:.72,roughness:.5,bloom:.62,vignette:.55,exposure:.72,pulse:.48,texScale:1.8,texSpeed:.08,texWarp:1.4,texContrast:.92,texKaleido:3,texMix:.66,audioCutoff:380,audioDecay:.7,audioDrive:.22}}
];
