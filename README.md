# Running Math — multilingual logarithm practice

Languages: 繁體中文 / English. The switcher appears in the upper-right corner, remembers the choice in localStorage, and defaults to the browser language.

## Deploy
Upload all seven files to the root of the published GitHub Pages branch: `index.html`, `style.css`, `config.js`, `engine.js`, `app.js`, `i18n.js`, `README.md`. Keep all files together. GitHub Pages → Settings → Pages.

GA4 stays configured in `config.js` as `G-G1WHKV3K5K`. Events also include a `language` parameter; seeing this dimension in GA4 standard reports may require registering a custom dimension and a processing wait.

## Important
- Browser locale selects Chinese only for `zh`; other browsers default to English.
- This release also fixes an existing product-rule generator issue where the displayed logarithm base and sampled values could differ.
- Test in both languages, including switching languages after answering, before using in class.
