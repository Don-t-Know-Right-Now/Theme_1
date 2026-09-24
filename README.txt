Loam — handicraft storefront (HTML / CSS / JS)

Open index.html in a browser. No build step and no dependencies.

index.html        Page markup (inside <template id="app-template">)
css/styles.css    Global styles (per-element styles are inline in the markup)
js/renderer.js    Small template renderer: {{ holes }}, <sc-for>, <sc-if>, events
js/app.js         Store data and logic: products, categories, cart, checkout, search

Settings: edit PROPS at the top of js/app.js (accent colour, image shape, announcement bar, start screen).
Product photos are loaded from Pexels (free to use). Replace the PX(...) ids in js/app.js with your own images.
