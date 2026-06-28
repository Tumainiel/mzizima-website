# Mzizima Estate Limited Website Deployment

This is a static website. Deploy these files and folders to the live web root for `mel.co.tz`:

- `index.html`
- `about/`
- `properties/`
- `mbweni/`
- `magomeni/`
- `contact/`
- `src/`

Do not deploy local workspace metadata such as `.agents/`, `.codex/`, or `node_modules/`.

## StackCP Git Version Control

1. Push this repository to GitHub.
2. In StackCP, open `Git Version Control`.
3. Clone the GitHub repository into the web root for `mel.co.tz`.
4. After future updates, push changes to GitHub and use StackCP to pull/update from the remote repository.

If the GitHub repository is private, add the StackCP SSH public key as a GitHub deploy key.
