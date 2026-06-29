# Mzizima Estate Limited CMS Blueprint

This folder defines the recommended migration path from the current static website to a full dynamic CMS.

The current live site is a static HTML/React site deployed on StackCP. A full CMS with authentication, roles, media uploads, database-backed properties, audit logs, inquiries, analytics, backups, and rich text editing requires a backend runtime and database.

## Recommended Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL, or MySQL if StackCP only provides MySQL
- Auth.js or Lucia-style session authentication
- Tiptap rich text editor
- Server Actions or REST API routes
- Role-based access control
- Secure media uploads to local storage, S3-compatible storage, or the hosting provider's file system

## Important Hosting Note

Most StackCP shared hosting accounts are designed for static/PHP sites, not long-running Node.js applications. Before building the full CMS, confirm whether the hosting account supports:

- Node.js apps
- PostgreSQL or MySQL
- Persistent server-side uploads
- Scheduled jobs or cron
- HTTPS
- SMTP

If Node.js is not supported, there are two practical options:

1. Keep the public website on StackCP and host the CMS/API elsewhere.
2. Build the CMS backend in PHP/MySQL to match StackCP hosting.

## Migration Phases

### Phase 1: Data Model and Admin Foundation

- Create database schema.
- Add secure admin login.
- Add user roles and permissions.
- Add site settings.
- Add contact information management.
- Add property management.
- Add media library foundation.

### Phase 2: Dynamic Public Website

- Replace hardcoded website content with CMS data.
- Add dynamic property pages.
- Add dynamic SEO tags.
- Add sitemap generation.
- Add inquiry form submission to database.

### Phase 3: Advanced CMS

- Rich text page editor.
- Homepage section ordering.
- News and events.
- Testimonials.
- Team members.
- Gallery albums.
- Analytics dashboard.
- Audit logs.
- Backup and restore.

## Required Inputs Before Build

- Hosting decision: Next.js hosting or PHP/MySQL StackCP-compatible CMS.
- Database type and credentials.
- Admin email.
- Initial admin password.
- Upload storage location.
- SMTP details for inquiry notifications.
- Whether inquiries should be stored, emailed, or both.

