# Werkkzeug4 compatibility

Reference: Farbrausch `fr_public/altona_wz4`, audited from all `.ops` declarations.

| Operator family | Declarations |
| --- | ---: |
| Animation & Control | 41 |
| Bitmap & Texture | 66 |
| Utility & Project FX | 74 |
| Material & Shading | 44 |
| Mesh & Geometry | 81 |
| Particles & Simulation | 24 |
| Audio Analysis | 2 |
| Scene & Render | 42 |
| **Total** | **374** |

## Compatibility levels

- **Web-native:** implemented by the WebGL/Web Audio runtime and usable in rendered output.
- **Schema compatible:** the exact original operator identity, display name, output type, input signature, module and source location are registered. The node can be searched, instantiated, connected, saved and exported.
- **Runtime port required:** the original C++/DirectX behavior has not yet been reimplemented for the browser. These nodes are visibly marked and are never silently treated as working effects.

The current release guarantees complete schema coverage, not complete execution parity. Production-specific operators such as `FR063_Mandelbulb`, SPH simulation, custom shader text compilation, legacy XSI import/export and DirectX render nodes require individual browser runtime ports or explicit web replacements.

## Regenerating the audit

```bash
npm run extract:wz4 -- /path/to/altona_wz4 operator-manifest.js
```

The extractor preserves overloaded operators by including their source line in the generated identifier and verifies 374 unique declarations.
