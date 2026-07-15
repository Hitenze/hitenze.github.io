# Third-Party Assets and Licenses

## STIX Two Text

- Use: Workshop headings and body text.
- License: SIL Open Font License 1.1.
- Local license: `../../assets/fonts/stix-two-text/OFL.txt`.

## IBM Plex Mono

- Use: Technical labels, metadata, commands, and code.
- License: SIL Open Font License 1.1.
- Local license: `../../assets/fonts/ibm-plex-mono/OFL.txt`.

## Reveal.js 5.2.1

- Use: Local slide runtime, base styles, and syntax-highlighting plugin.
- License: MIT.
- Local license: `assets/vendor/reveal/LICENSE`.
- Source package: `reveal.js@5.2.1`.

## Tailwind CSS 3.4.17

- Use: Build-time generation of `assets/workshop.css`; no runtime CDN or installed project dependency.
- License: MIT.
- Source package: `tailwindcss@3.4.17` invoked through `npx` with a temporary npm cache.
- Regeneration command is recorded at the top of `assets/workshop.input.css`.
