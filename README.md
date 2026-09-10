# Nimshi Nasayao — CV Website

A static, single-page CV site. No build step, no dependencies — just `index.html`, `style.css`, and `script.js`.

## Files

- `index.html` — page content and structure
- `style.css` — all styling
- `script.js` — the "Download as PDF" button and one entrance animation

## Publish it on GitHub Pages (free)

1. **Create a repository.** On GitHub, click **New repository**. Name it anything (e.g. `cv-website`), keep it Public, and create it without a README (you already have this folder's files).
2. **Upload these files.** Either:
   - Drag `index.html`, `style.css`, and `script.js` into the repo via GitHub's web UI ("Add file" → "Upload files"), or
   - Use git from your computer:
     ```
     git init
     git add index.html style.css script.js README.md
     git commit -m "Initial CV site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```
3. **Turn on Pages.** In the repo, go to **Settings → Pages**. Under "Build and deployment", set **Source** to "Deploy from a branch", pick the **main** branch and the **/(root)** folder, then **Save**.
4. **Wait a minute**, then refresh that Pages settings page — it will show your live URL, something like:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

That URL works immediately with no domain purchase needed.

## Adding a custom domain later

When you're ready:
1. Buy a domain from any registrar (Namecheap, Google Domains successor Squarespace Domains, Cloudflare, etc.).
2. In the registrar's DNS settings, add either:
   - A **CNAME** record pointing your subdomain (e.g. `www`) to `<your-username>.github.io`, or
   - Four **A** records (for the root domain) pointing to GitHub's Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Back in **Settings → Pages** on GitHub, enter your domain under "Custom domain" and save. GitHub will create a `CNAME` file in your repo automatically and can auto-provision HTTPS for you — just check "Enforce HTTPS" once it's available.

DNS changes can take anywhere from a few minutes to 24 hours to propagate.

## Editing the content

Everything is plain HTML in `index.html`, split into clearly labeled `<section>` blocks (About, Experience, Projects, Skills, Certifications, Education, Contact). To update your CV later, just edit the text inside the matching section and push the change — Pages redeploys automatically within a minute or two.

The `mailto:` link in the Contact section is a placeholder — replace `[email protected]` with your real email address if you want it public.