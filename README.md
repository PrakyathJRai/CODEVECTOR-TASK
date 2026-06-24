# CodeVector Backend Task

## Overview

Backend service for browsing 200,000 products with:

- Cursor-based pagination
- Category filtering
- PostgreSQL database
- Prisma ORM
- Express.js API

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Supabase)
- Prisma

## Features

- 200,000 seeded products
- Fast cursor-based pagination
- Category filtering
- Indexed queries
- Consistent ordering by created_at and id

## API

### Get Products

GET /products

Query Parameters:

- limit
- category
- cursorCreatedAt
- cursorId

Example:

GET /products?limit=20

GET /products?category=Electronics

## Why Cursor Pagination?

Offset pagination becomes slower as offsets increase and can produce duplicates or missing results when records are inserted during browsing.

Cursor pagination uses indexed columns (created_at, id) and provides efficient and stable pagination.

## Setup

```bash
npm install
npx prisma migrate dev
node prisma/seed.js
npm start
```