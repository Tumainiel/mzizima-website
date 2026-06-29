# CMS Implementation Checklist

## Build Blockers To Confirm

- Hosting supports Node.js, or choose PHP/MySQL CMS instead.
- Database credentials are available.
- SMTP credentials are available.
- Initial admin account details are approved.
- Upload storage path and size limits are known.

## Minimum Production CMS Release

- Admin login
- User roles
- Site settings
- Contact info management
- Property CRUD
- Property feature CRUD
- Media upload and reuse
- Contact inquiry storage
- Basic SEO editor
- Audit logs

## Public Website Dynamic Conversion

- Load homepage hero from database.
- Load statistics from database.
- Load featured locations from database.
- Load property listings from database.
- Load contact info from database.
- Generate route metadata from database.
- Generate sitemap from database.

## Security Requirements

- Password hashing with bcrypt or argon2.
- CSRF protection.
- Server-side validation.
- File upload MIME/type validation.
- Role and permission checks on every admin action.
- No secrets exposed to the browser.
- HTTPS enforced in production.

## Suggested First Sprint

1. Set up Next.js, Prisma, Tailwind, and auth.
2. Create database tables from `prisma/schema.prisma`.
3. Seed current Mzizima Estate website content.
4. Build admin login and dashboard shell.
5. Build property management.
6. Convert public properties page to database data.

