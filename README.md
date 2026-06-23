# Peace College of Management Website

A production-ready full-stack website for **Peace College of Management** built using Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, Neon Postgres, Cloudinary, and Custom Admin Authentication.

---

## 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Navy Blue, Maroon, Gold theme)
- **Database:** Neon Postgres (postgresql provider)
- **ORM:** Prisma
- **Auth:** Custom JWT-based Authentication (bcryptjs, http-only cookie)
- **Storage:** Cloudinary SDK (for course & placement images)

---

## 🛠️ Environmental Setup

Create a `.env` file at the root of the project using the structure defined in `.env.example`:

```env
# Database Connection (Neon Postgres)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# JWT Secret for Custom Admin Authentication
JWT_SECRET="your_jwt_secret_key_here_must_be_long_and_secure"

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

---

## 💻 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database Schema:**
   Ensure `DATABASE_URL` is set in your `.env` file, then push the schema:
   ```bash
   npx prisma db push
   ```

3. **Seed Database:**
   Populates the initial 8 MBA specialization courses and creates the first admin account (`admin@peacecollege.site` / `PeaceAdmin2026!`):
   ```bash
   npx prisma db seed
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🌟 Admin Portal Credentials
- **Login URL:** `/admin/login`
- **Username:** `admin@peacecollege.site`
- **Password:** `PeaceAdmin2026!`
*You can add, edit, and delete courses/placements and view student inquiries in this panel.*

---

## 📤 Deployment Guide (GitHub & Vercel)

### Step 1: Push Project to GitHub

1. Initialize git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initialize Peace College Website"
   ```

2. Create a new repository on your GitHub account.
3. Link your local project to GitHub and push:
   ```bash
   git remote add origin https://github.com/your-username/peace-college.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Log into your **Vercel** dashboard and click **Add New** > **Project**.
2. Select your imported GitHub repository.
3. In the **Environment Variables** section, add all five keys from your `.env` file:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Expand the **Build and Development Settings** and add the following as your **Install Command** (so that Prisma generates its client on every Vercel build automatically):
   ```bash
   npm install && npx prisma generate
   ```
5. Click **Deploy**. Vercel will build and launch your site.

### Step 3: Run Database Migrations in Production
Once deployed, if you haven't pushed the database schema yet, run the following command from your local terminal against the production database URL (temporarily paste the production Neon connection URL in your local `.env`):
```bash
npx prisma db push
npx prisma db seed
```
Your database is now fully populated, and the admin user is active!
