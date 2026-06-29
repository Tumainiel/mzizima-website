# Initial Admin Account

Use this account for the first CMS administrator:

- Email: `info@mel.co.tz`
- Role: `SUPER_ADMIN`

## Password Handling

The owner supplied the initial password separately. Do not store that plaintext password in GitHub, source files, SQL dumps, or documentation.

For a Next.js/Prisma CMS, set it as an environment variable during the first seed:

```text
ADMIN_EMAIL=info@mel.co.tz
ADMIN_PASSWORD=<owner-supplied-password>
```

The seed script should hash the password using bcrypt or argon2 before saving it to the database.

## Security Recommendation

After the first login, change the password to a stronger password and store it in a password manager. The CMS should require authenticated users to update weak initial passwords before managing live content.

