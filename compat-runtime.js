export const COMPAT_FAMILIES=[
  "Animation & Control","Bitmap & Texture","Utility & Project FX","Material & Shading",
  "Mesh & Geometry","Particles & Simulation","Audio Analysis","Scene & Render"
];

export const COMPAT_COLORS={
  "Animation & Control":"#55d887","Bitmap & Texture":"#25c9cd","Utility & Project FX":"#9b7bff",
  "Material & Shading":"#ff6d42","Mesh & Geometry":"#5da7ff","Particles & Simulation":"#9b7bff",
  "Audio Analysis":"#55d887","Scene & Render":"#f1b85b"
};

export const COMPAT_MODES={
  "Bitmap & Texture":"textures","Audio Analysis":"audio","Utility & Project FX":"post"
};

export const COMPAT_PARAM_DEFINITIONS=[
  ["Intensity","compatIntensity",0,1,.01,.64],
  ["Rate","compatRate",.05,3,.01,1],
  ["Scale","compatScale",.25,6,.05,2],
  ["Mix","compatMix",0,1,.01,.72]
];

const FAMILY_GUIDES={
  "Animation & Control":["a deterministic GPU control signal","Use it to phase, pulse, or gate downstream browser equivalents."],
  "Bitmap & Texture":["an animated procedural WebGL texture transform","Place it in Textures and combine it with other bitmap equivalents before Texture Output."],
  "Utility & Project FX":["a full-frame WebGL utility or post transform","Place it in Post FX; Mix blends the processed frame with the incoming scene."],
  "Material & Shading":["a procedural WebGL material response","Connect geometry through it; Intensity and Mix control its lighting and palette contribution."],
  "Mesh & Geometry":["a signed-distance WebGL geometry transform","Connect it after a geometry source; Scale changes the generated or modified spatial field."],
  "Particles & Simulation":["a deterministic GPU particle-field approximation","Use it for sparks, dust, trails, and simulation-like layers without CPU particles."],
  "Audio Analysis":["a WebAudio-reactive GPU visual signal","Place it in Audio; the equivalent converts transport/audio energy into a render modulation source."],
  "Scene & Render":["a WebGL camera, lighting, or scene-composition transform","Use it near Scene Output to change the final view and spatial presentation."]
};

export function compatHash(value){
  let hash=2166136261;for(const char of String(value)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619);}return (hash>>>0)/4294967295;
}

export function compatRuntimeFor(spec){
  const seed=compatHash(spec.id),familyIndex=Math.max(0,COMPAT_FAMILIES.indexOf(spec.family)),guide=FAMILY_GUIDES[spec.family]||FAMILY_GUIDES["Utility & Project FX"];
  return {engine:"webgl-equivalent",familyIndex,seed,params:{compatIntensity:.48+seed*.38,compatRate:.35+seed*1.65,compatScale:.8+seed*3.4,compatMix:.58+seed*.32},summary:`${spec.name} is represented in the browser as ${guide[0]}.`,usage:`${guide[1]} Rate animates the equivalent and the operator-specific seed keeps ${spec.symbol} visually distinct.`};
}

export function compatModeFor(spec){return COMPAT_MODES[spec.family]||"scene";}

