# AI Political Poster Maker — Frontend

A modern, responsive frontend for **AI Political Poster Maker**, a web application that helps users create professional posters using predefined templates, uploaded images, exact user-provided text, and AI-assisted layout suggestions.

## 🚀 Overview

The frontend provides a simple workflow:

```text
Choose Template
      ↓
Add Information & Photos
      ↓
Generate Poster
      ↓
Preview
      ↓
Regenerate / Download
```

The application is built with **Next.js, React, TypeScript, Tailwind CSS, and TanStack Query**.

---

## ✨ Features

* 🔐 User registration and login
* 📧 Login with email
* 📱 Login with phone number
* 🛡️ Protected dashboard routes
* 🎨 Template browsing
* 🖼️ Image upload with preview
* 🤖 AI-assisted poster generation workflow
* 📋 Poster information form
* 🖼️ Generated poster preview
* 🔄 Poster regeneration
* ⬇️ PNG poster download
* 📚 My Posters history
* 📊 Dashboard statistics
* 📱 Fully responsive UI
* 🌙 Dark-first modern design

---

## 🛠️ Tech Stack

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| Next.js 16     | React framework         |
| React 19       | UI development          |
| TypeScript     | Type safety             |
| Tailwind CSS 4 | Styling                 |
| TanStack Query | Server state management |
| Axios          | API requests            |
| Lucide React   | Icons                   |
| Biome          | Formatting & linting    |

---

## 📁 Project Structure

```text
frontend/
├── public/
│
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── login-form.tsx
│   │   │
│   │   ├── register/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   ├── posters/
│   │   │   └── templates/
│   │   │
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── poster/
│   │   └── ui/
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-posters.ts
│   │   └── use-templates.ts
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── providers/
│   │   └── query-provider.tsx
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── poster.service.ts
│   │   ├── template.service.ts
│   │   └── upload.service.ts
│   │
│   └── types/
│       ├── auth.ts
│       ├── poster.ts
│       └── template.ts
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

Clone the project and open the frontend directory:

```bash
git clone <repository-url>
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the frontend root to connect to your live backend API:

```env
NEXT_PUBLIC_API_URL=https://ai-political-poster-maker-backend.vercel.app/api
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 🧹 Code Quality

Run Biome:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

---

## 🔑 Authentication

Authentication uses JWT.

After successful login, the access token is stored in:

```text
localStorage
```

with the key:

```text
accessToken
```

The Axios API client automatically attaches the token to authenticated requests:

```text
Authorization: Bearer <token>
```

Protected dashboard pages require a valid authenticated session.

---

## 🛡️ Protected Routes

Dashboard pages are protected using a client-side authentication guard.

Protected areas include:

```text
/dashboard
/dashboard/create
/dashboard/templates
/dashboard/posters
/dashboard/posters/[id]
```

If a user is not authenticated, they are redirected to the login page.

After successful login, the user can be redirected back to the originally requested dashboard page.

---

## 🎨 Main Pages

### Home

```text
/
```

Landing page containing:

* Hero section
* Features
* How it works
* Template preview
* Call-to-action
* Footer

### Login

```text
/login
```

Supports:

* Email login
* Phone login
* Password authentication
* Error handling
* Redirect after authentication

### Register

```text
/register
```

Allows users to create an account.

### Dashboard

```text
/dashboard
```

Provides:

* Poster statistics
* Recent posters
* Quick actions

### Templates

```text
/dashboard/templates
```

Users can browse available poster templates.

### Create Poster

```text
/dashboard/create?template=<templateId>
```

Users can:

* Enter poster information
* Add headline
* Add location
* Upload photos
* Generate a poster

### My Posters

```text
/dashboard/posters
```

Displays previously generated posters.

### Poster Preview

```text
/dashboard/posters/<posterId>
```

Provides:

* Poster preview
* Poster details
* Generation status
* Generation count
* Regenerate option
* PNG download

---

## 🖼️ Poster Creation Flow

The frontend communicates with the backend through REST APIs.

```text
User
 │
 ▼
Select Template
 │
 ▼
Poster Form
 │
 ├── Personal Information
 ├── Organization
 ├── Location
 ├── Headline
 └── Photos
 │
 ▼
Upload Images
 │
 ▼
Create Poster API
 │
 ▼
AI-assisted Generation
 │
 ▼
Generated Poster
 │
 ▼
Preview
 │
 ├── Regenerate
 └── Download PNG
```

---

## 📡 API Integration

The frontend uses Axios for API communication.

Base URL:

```text
NEXT_PUBLIC_API_URL
```

Example:

```text
https://ai-political-poster-maker-backend.vercel.app/api
```

Main API resources:

```text
POST   /auth/register
POST   /auth/login
GET    /auth/me

GET    /templates
GET    /templates/:id

POST   /upload/images

GET    /posters
POST   /posters
GET    /posters/:id
POST   /posters/:id/regenerate
```

---

## 📦 State Management

**TanStack Query** is used for server state management.

Examples:

```text
useAuth()
useTemplates()
usePosters()
usePoster()
useCreatePoster()
useRegeneratePoster()
```

This provides:

* API caching
* Loading states
* Error handling
* Query invalidation
* Mutation management

---

## 📱 Responsive Design

The UI is designed for:

* Mobile
* Tablet
* Laptop
* Desktop

The dashboard includes a responsive sidebar and mobile navigation.

---

## 🔒 Security Considerations

The frontend:

* Uses authenticated API requests
* Protects dashboard pages
* Does not expose backend secrets
* Uses environment variables for API configuration
* Validates basic form input before submission
* Limits uploaded image count and file size on the client

> Backend validation remains the source of truth for security and data validation.

---

## 🧩 Backend

This frontend connects to the deployed backend API:

```text
https://ai-political-poster-maker-backend.vercel.app
```

Configure it through your `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://ai-political-poster-maker-backend.vercel.app/api
```

---

## 📌 Project Status

### Completed

* [x] Landing page
* [x] Authentication
* [x] Protected dashboard
* [x] Template listing
* [x] Poster creation form
* [x] Image upload
* [x] AI-assisted generation workflow
* [x] Poster preview
* [x] Poster regeneration
* [x] Poster history
* [x] PNG download
* [x] Responsive UI
* [x] Loading and error states

### Future Improvements

* [ ] More poster templates
* [ ] Advanced poster editor
* [ ] Better image editing controls
* [ ] Poster sharing
* [ ] Admin dashboard
* [ ] Usage analytics
* [ ] PDF export

---

## 👨‍💻 Author

**Nakibul Islam**

Full Stack Developer

* GitHub: `nakib-code`
* Portfolio: `ahmed-nakib-portfolio.vercel.app`

---

