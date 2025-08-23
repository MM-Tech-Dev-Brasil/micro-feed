# 🚀 Micro Feed

A modern social media feed application built with Next.js 15 and NestJS, featuring posts, likes, user authentication, and a dark-themed UI.

## ✨ Features

- 🔐 User authentication (login/register) with JWT
- 📝 Create, read, edit, and delete posts
- ❤️ Like/unlike posts with real-time updates
- 👤 User profiles with post filtering
- 🔍 Search functionality
- 🎨 Modern dark UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend**: Next.js 15, TypeScript, Tailwind CSS, Radix UI
**Backend**: NestJS 11, TypeScript, TypeORM, PostgreSQL
**Authentication**: JWT with Passport.js

## 🚀 Quick Start

### 📋 Prerequisites
- Node.js 22
- PostgreSQL 12+
- npm

### 2️⃣ Backend Setup
```bash
cd server
npm install

# Create .env file with:
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USER=your_username
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=micro_feed
# JWT_SECRET=your_secret_key
# PORT=8080

npm run start:dev
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

**Backend**: http://localhost:8080
**Frontend**: http://localhost:3000

## 🌐 API Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /posts` - Get all posts
- `GET /posts/author/:author_id` - Get posts from author
- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /likes` - Like post
- `DELETE /likes/:id` - Unlike post
- `GET /api` - Swagger documentation

## 📁 Project Structure

```
micro-feed/
├── client/          # Next.js frontend
│   ├── src/app/     # Pages and routing
│   ├── src/components/ # UI components
│   └── src/api/     # API client
└── server/          # NestJS backend
    ├── src/domain/  # Database entities
    ├── src/application/ # Business logic
    └── src/infrastructure/ # Controllers & persistence
```

## 🗄️ Database Schema

```sql
-- Profiles table for user accounts
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  username text NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  password_hash character varying(255) NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_username_key UNIQUE (username)
) TABLESPACE pg_default;

-- Posts table for user content
CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles (id) ON DELETE CASCADE,
  CONSTRAINT posts_content_check CHECK ((char_length(content) <= 280))
) TABLESPACE pg_default;

-- Likes table for post interactions
CREATE TABLE public.likes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT likes_pkey PRIMARY KEY (id),
  CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;
```

## 💡 Why Next.js & NestJS?

### 🎯 Next.js Benefits
- **App Router**: Modern file-based routing with React Server Components
- **TypeScript First**: Excellent TypeScript support out of the box
- **Performance**: Built-in optimizations, code splitting, and image optimization
- **Developer Experience**: Hot reload, error boundaries, and excellent debugging
- **SEO Friendly**: Server-side rendering and static generation capabilities
- **Vercel Integration**: Seamless deployment and hosting

### 🚀 NestJS Benefits
- **Enterprise Ready**: Built with enterprise applications in mind
- **TypeScript Native**: First-class TypeScript support with decorators
- **Modular Architecture**: Clean separation of concerns with modules
- **Built-in Validation**: Class-validator and class-transformer integration
- **Testing Support**: Comprehensive testing utilities and mocking
- **OpenAPI/Swagger**: Automatic API documentation generation
- **Dependency Injection**: Robust DI container for better testability

## 📜 Available Scripts

**Backend:**
- `npm run start:dev` - Development server

**Frontend:**
- `npm run dev` - Development server

## ⚙️ Environment Variables

Create `.env` file in `server/` directory:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=micro_feed
JWT_SECRET=your_secret_key
PORT=8080
```

---

**📝 Note**: This is a technical test project for Integral demonstrating modern full-stack development practices. 