# URU Furniture

Static website for URU Furniture, hosted on GitHub Pages.

```
index.html          Home
customise.html      Customise your own sofa
sofas/*.html        Product pages (neel, mustard, manam, moss, hq)
assets/css/         Styles (desktop ≥1200px, tablet 810–1199px, phone <810px)
assets/js/main.js   Mobile menu + image carousels
assets/             Fonts, images, video
```

No build step. Pages are served at clean URLs (`/customise`, `/sofas/neel`) by GitHub Pages.

## Custom domain

Add a `CNAME` file containing the domain (e.g. `www.example.com`), then point the domain's DNS at GitHub Pages:
`CNAME www → uru-furnitures.github.io`, or `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
