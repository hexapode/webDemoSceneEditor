export const TUTORIALS = [
  {
    id:"torus-basics",title:"Torus Fundamentals",level:"BEGINNER",duration:"4 MIN",accent:"#5da7ff",
    description:"Build a procedural hero object, tune its material, and orbit the live camera.",
    project:{name:"TUTORIAL · TORUS STUDY",bpm:128,mode:"scene",params:{color:"#ff583e",accent:"#20bed0",scale:1,twist:.35,metallic:.88,roughness:.2,bloom:.42,pulse:.18,exposure:1.12}},
    steps:[
      {title:"The scene graph",body:"Every box is a live operator. Data flows left to right into Main Output.",mode:"scene",node:"GEO_02",target:"#graphCanvas"},
      {title:"Shape the primitive",body:"Torus Field is the geometry source. Use Scale and Detail in the inspector to change its silhouette.",mode:"scene",node:"GEO_02",target:"#inspectorContent"},
      {title:"Add deformation",body:"Select Infinite Twist and adjust Amount. The viewport responds every frame.",mode:"scene",node:"MOD_03",target:'.node[data-id="MOD_03"]'},
      {title:"Navigate the viewport",body:"Drag in the viewport to orbit and use the wheel to zoom. Your project is autosaved.",mode:"scene",target:"#glCanvas"}
    ]
  },
  {
    id:"liquid-texture",title:"Animated Liquid Texture",level:"INTERMEDIATE",duration:"6 MIN",accent:"#25c9cd",
    description:"Create flowing GPU noise, fold it radially, and map it onto the scene material.",
    project:{name:"TUTORIAL · LIQUID SIGNAL",bpm:122,mode:"textures",params:{color:"#ff426d",accent:"#25d9d3",texScale:5.4,texSpeed:.48,texWarp:1.85,texContrast:1.72,texKaleido:7,texMix:.86,bloom:.68,vignette:.12,exposure:1.08}},
    steps:[
      {title:"Texture workspace",body:"This independent graph generates a texture entirely on the GPU.",mode:"textures",node:"TEX_01",target:"#graphCanvas"},
      {title:"Animate the noise",body:"Frequency controls detail; Speed advances the field using global demo time.",mode:"textures",node:"TEX_01",target:"#inspectorContent"},
      {title:"Warp the domain",body:"Liquid Warp feeds noise back into its own coordinates, producing fluid motion.",mode:"textures",node:"TEX_02",target:'.node[data-id="TEX_02"]'},
      {title:"Map it to material",body:"Material Map sends the final animated texture into the Scene material. Return to Scene to see it on the torus.",mode:"textures",node:"TEX_05",target:'.node[data-id="TEX_05"]'}
    ]
  },
  {
    id:"cinematic-post",title:"Cinematic Post Stack",level:"INTERMEDIATE",duration:"5 MIN",accent:"#9b7bff",
    description:"Balance bloom, grading, exposure and vignette in a dedicated post-processing graph.",
    project:{name:"TUTORIAL · AFTERIMAGE",bpm:136,mode:"post",params:{color:"#ff7a3d",accent:"#6c4dff",bloom:1.05,vignette:.38,exposure:.82,texContrast:1.8,roughness:.32,pulse:.28}},
    steps:[
      {title:"Post-processing chain",body:"Scene Color enters on the left. Each operator modifies the rendered frame before Final Image.",mode:"post",node:"POST_01",target:"#graphCanvas"},
      {title:"Bloom highlights",body:"Hot Bloom spreads energy from bright pixels. Keep it intentional to preserve contrast.",mode:"post",node:"POST_02",target:"#inspectorContent"},
      {title:"Filmic grade",body:"Color Grade balances exposure and contrast after lighting and material evaluation.",mode:"post",node:"POST_03",target:'.node[data-id="POST_03"]'},
      {title:"Frame with vignette",body:"Vignette darkens the perimeter and guides attention toward the procedural form.",mode:"post",node:"POST_04",target:"#inspectorContent"}
    ]
  },
  {
    id:"beat-audio",title:"Beat-Synced Audio",level:"ADVANCED",duration:"7 MIN",accent:"#55d887",
    description:"Sequence procedural drums and bass, then use the same beat signal to drive the visuals.",
    project:{name:"TUTORIAL · PULSE ENGINE",bpm:110,mode:"audio",params:{color:"#ff365f",accent:"#36ffd1",pulse:.86,twist:1.9,bloom:.82,audioCutoff:680,audioDecay:.42,audioDrive:.72,exposure:1.2}},
    steps:[
      {title:"Audio graph",body:"Beat Clock drives both the Drum Machine and Demo Bass at the project BPM.",mode:"audio",node:"AUDIO_01",target:"#graphCanvas"},
      {title:"Shape the rhythm",body:"Drum decay and drive change the procedural transient synthesis in real time.",mode:"audio",node:"AUDIO_02",target:"#inspectorContent"},
      {title:"Sculpt the bass",body:"The bass low-pass cutoff and resonance are exposed as live operator parameters.",mode:"audio",node:"AUDIO_03",target:"#inspectorContent"},
      {title:"Unlock Web Audio",body:"Click SOUND OFF once. Browsers require this gesture before audio can play.",mode:"audio",target:"#audioToggle"},
      {title:"Shared beat signal",body:"Return to Scene and inspect Beat Pulse. Audio and visuals now share the same clock.",mode:"scene",node:"SIG_01",target:'.node[data-id="SIG_01"]'}
    ]
  }
];
