# Werkkzeug WebGL

**[Open the live demo](https://hexapode.github.io/webDemoSceneEditor/)**

A browser-native procedural demo editor inspired by Farbrausch's Werkkzeug.

The default project is **HAHAHACK · ABSURD MACHINE**, a finished 30-second
audiovisual loop made for *hahahack — a hackathon for absurd + fun things with
Codex*. Its six five-second worlds are an orbital cathedral, recursive crystal,
solar metaball organism, multiplied monolith field, polar acid fractal, and
dense finale swarm. The editable graph includes Fractal, Multiply, Grid Array,
modulation, animated title, camera, material and output stages, backed by a
WebAudio score with evolving drums, bass, chords, and lead. Click **SOUND OFF**
once to start the music.

The built-in gallery also includes **VOID BLOOM · A SIGNAL GARDEN**, a second
complete project authored from an empty graph. Its four-part story—*The Seed
Remembers*, *The Garden Wakes*, *Roots Eat the Signal*, and *We Become Light*—
uses a dedicated WebGL signed-distance field for each chapter rather than the
default demo geometry. The 24-second piece adds animated interference textures,
a six-effect post chain, evolving WebAudio, chapter navigation, and paired title
and subtitle narration. Open **Demos → Void Bloom** to load it.

Use the act selector above the viewport (or `[` and `]`) to jump between the six
HAHAHACK worlds. The **SCENE**, **TEXTURES**, **POST FX**, and **AUDIO** tabs switch
between the four operator graph workspaces; they do not change timeline acts.

## Run locally

```bash
npm start
```

Open `http://127.0.0.1:4173`.

## Publish the editor with GitHub Pages

The editor is fully static and supports repository subpaths such as
`https://username.github.io/werkkzeug/`.

1. Push the repository to GitHub with the default branch named `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`, or run **Deploy editor to GitHub Pages** from the Actions tab.

The workflow builds and deploys only the browser runtime from `dist/`; the local
development server and extraction tooling are excluded. To verify that artifact
locally before pushing:

```bash
npm run build
```

The build also emits `.nojekyll` and a `404.html` fallback. All application
assets use relative URLs, so no repository-name or base-path configuration is
required.

## Executable demo export

**Export Demo** creates one executable `project-name.html` file. Every project uses the same primitive renderer; the exporter retains only connected audio/spline features, used parameters, text, and reachable graph data. It minifies the shared GLSL/runtime, chooses the smaller of gzip and raw deflate, and embeds that compressed player in a tiny HTML inflater.

JPEG packing inspired by `demolishedcompressor` remains available as an opt-in carrier. It is accepted only when it beats plain compressed HTML by at least 5% and 512 bytes; otherwise export skips canvas/JPEG encoding entirely.

## Included

- WebGL 2 ray-marched live viewport with orbit and zoom controls
- Animated GPU texture lab with noise, domain warp, kaleidoscope and palette operators
- Texture preview mode with live material mapping on the 3D scene
- Procedural Web Audio soundtrack with drums, bass, pad, filtering and dynamics
- Beat-synchronized audio/visual transport, master volume and live spectrum meter
- Per-property modulation sockets with Beat, Half-beat, Bar, Sine, Envelope,
  Noise, five-second Act events, and external/pointer Event sources
- Draggable procedural operator graph with collision-aware gutters and a one-click **SPACE** layout tool
- Reliable inspector/keyboard node deletion with automatic wire cleanup
- Per-node `(i)` guides covering purpose, usage, inputs, outputs, and runtime status
- Independent Scene, Textures, Post FX and Audio graph workspaces
- Resizable library, inspector, timeline and viewport/graph panels with persistent layout
- Library-to-graph drag-and-drop plus zoom-correct node movement
- Four complete guided projects, nine authored texture-building workshops (including realistic composition studies), and 417 isolated contextual sessions—one for every core node and WZ4 WebGL equivalent
- Edge-to-edge UV texture preview without vignette attenuation, suitable for spotting scale, repetition, seams, and corner imbalance
- Eight built-in audiovisual showcase demos assembled from the same native primitive, composition, material, camera, texture, post-FX, and audio operators available in the editor
- Context-sensitive parameter inspector
- 12-second looping demo timeline with beat-synced animation
- Local autosave with versioned project state
- Tree-shaken single-file `.html` export with minified, compressed JavaScript and an optional size-gated JPEG carrier
- Animated 2D fallback for browsers without an available GPU context

Click **SOUND OFF** once to enable audio (browsers require a user gesture). Keyboard shortcuts: `Space` play/pause, `M` mute, `Delete` remove an operator, `F` frame the graph, and `Cmd/Ctrl+S` save locally.

Every numeric inspector property has a modulation source and bipolar depth. A
canvas click or keyboard event fires the **EVENT** source. External integrations
can trigger it with `window.werkkzeugTrigger()` or by dispatching a
`werkkzeug-trigger` event on `window`.

## Werkkzeug4 compatibility

See [COMPATIBILITY.md](COMPATIBILITY.md) for the audited coverage matrix and precise compatibility-level definitions.

`operator-manifest.js` is generated from the 374 operator declarations in Farbrausch's public `altona_wz4` source tree. All original operators are searchable, instantiable, connectable, serializable and exportable. Each declaration receives a deterministic family-specific WebGL equivalent with four animatable controls. The editor labels these as browser substitutes rather than claiming instruction-identical parity with the original DirectX/C++ implementation.

Regenerate the catalog against a local copy of `altona_wz4`:

```bash
npm run extract:wz4 -- /path/to/altona_wz4 operator-manifest.js
```
