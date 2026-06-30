# Mzizima Estate Limited Website Deployment

This is a static website. Deploy these files and folders to the live web root for `mel.co.tz`:

- `index.html`
- `about/`
- `properties/`
- `mbweni/`
- `magomeni/`
- `kariakoo/`
- `kariakoo-uhuru/`
- `kariakoo-msimbazi/`
- `contact/`
- `src/`
- `404.html`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

Do not deploy local workspace metadata such as `.agents/`, `.codex/`, or `node_modules/`.

## StackCP Git Version Control

1. Push this repository to GitHub.
2. In StackCP, open `Git Version Control`.
3. Clone the GitHub repository into the web root for `mel.co.tz`.
4. After future updates, push changes to GitHub and use StackCP to pull/update from the remote repository.

## StackCP public_html deployment

If StackCP clones the repository into a folder such as:

`/home/sites/42b/e/eef35a6799/mzizima-website`

but the domain document root is:

`/home/sites/42b/e/eef35a6799/public_html`

then add this Deployment Script in StackCP Git Version Control:

```bash
rsync -av --delete --exclude ".git" --exclude ".gitignore" --exclude "DEPLOYMENT.md" /home/sites/42b/e/eef35a6799/mzizima-website/ /home/sites/42b/e/eef35a6799/public_html/
```

After clicking Deploy, confirm that `public_html` contains `index.html`, `src/`, `kariakoo/`, `kariakoo-uhuru/`, and `kariakoo-msimbazi/`.

If the GitHub repository is private, add the StackCP SSH public key as a GitHub deploy key.
