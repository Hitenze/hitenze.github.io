# Font, icon and third-party licenses

## Fonts

- **STIX Two Text** (serif, normal + italic, Latin and Latin Extended subsets): SIL Open Font License 1.1. Self-hosted WOFF2 files and the full license are in `stix-two-text/` (`OFL.txt`). Used by `assets/css/tokens.css` (all content pages) and by the HPC workshop pages and slides.
- **IBM Plex Mono**: SIL Open Font License 1.1, see `ibm-plex-mono/OFL.txt`. Used by the HPC workshop pages and slides (`utilities/hpc-workshop/assets/`); the content pages do not load it.
- **Sans-serif and monospace text** on the content pages, tools, playgrounds and GP Explorer use the visitor's installed system fonts; no font files are downloaded for them.
- Third-party font services are not used. GP Explorer previously loaded Satoshi/General Sans (Fontshare) and JetBrains Mono (Google Fonts); those requests were removed and it now uses the system stacks.

## Icons and artwork

- The moon, sun and menu icons and the sparse-matrix watermark on the home page are original hand-written inline SVG (no icon library or third-party artwork). They are dedicated to the public domain under **CC0 1.0 Universal** (https://creativecommons.org/publicdomain/zero/1.0/).

## Scripts and styles

Vendored in the repository:

- **reveal.js 5.2.1** (HPC workshop slides): MIT, see `utilities/hpc-workshop/assets/vendor/reveal/LICENSE` and `utilities/hpc-workshop/THIRD_PARTY_LICENSES.md`.
- **QRCode.js 1.0.0** (URL to QR tool): MIT, see `utilities/vendor/qrcodejs.LICENSE`.

Loaded from public CDNs at runtime (kept by decision; the pages say "Interactive demo requires JavaScript" or show their static text when they are unavailable):

- **KaTeX 0.16.11** (GP Explorer, from cdn.jsdelivr.net): MIT.
- **D3 v3** (Neural network playground, from d3js.org): BSD 3-Clause.
- **seedrandom 3.0.5** (Neural network playground, from cdnjs.cloudflare.com): MIT.
