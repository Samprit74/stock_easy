# StockEasy

Pharmaceutical stock management system for medicine shops.

Track stock by batch and expiry, sell the right medicine to the right customer, and stop losing money to expired stock. Built for pharmacy owners and their staff.

## What's inside

A monorepo with two apps:

```
stock_easy/
├── StockEasy-backend/   Spring Boot 3.4.1 + Java 21
├── StockEasy-frontend/  Vite + React 18 + TypeScript
└── README.md
```

## What StockEasy does

- **Records every purchase** with batch number, manufacture date, expiry date, quantity and buy price — per item
- **Sells from the right batch** — oldest expiry first, except for regular customers who get the freshest batch
- **Auto-discounts** near-expiry batches (20% ≤ 7 days, 10% ≤ 15, 5% ≤ 30) so they clear before they expire
- **Tracks each customer** by phone, counts their orders, marks them as regular after a threshold
- **Alerts on low stock** so you know what to rebuy, per medicine
- **Reports expired stock** with the rupee value lost
- **Generates bills** that can be returned (which automatically restocks the batch)
- **Enforces roles** — ADMIN manages suppliers, reports, users; STAFF runs the counter
- **Reports** — top medicines, top customers, daily revenue, totals, all by date range

## Tech stack

**Backend**
- Spring Boot 3.4.1, Java 21
- Spring Web, Spring Data JPA, Spring Security
- JWT auth
- Hibernate validation
- MySQL connector (configurable)
- Lombok 1.18.40
- springdoc OpenAPI (Swagger UI at `/swagger-ui.html`)

**Frontend**
- Vite 7 + React 18 + TypeScript 5
- React Router 6
- TanStack Query (installed)
- shadcn/ui + Radix + Tailwind CSS
- lucide-react icons
- recharts (charts)

## API overview

51 REST endpoints under `/api/`, grouped into 10 services:

| Service | Purpose | Endpoints |
|---|---|---|
| **Auth** | Register, login (returns JWT) | 2 |
| **User** | Profile CRUD + admin user management | 5 |
| **Medicine** | Catalog CRUD + filters (category, brand, search) | 8 |
| **Supplier** | Vendor CRUD (ADMIN only) | 5 |
| **Customer** | Customer CRUD + by-phone lookup + search | 7 |
| **Purchase** | Create purchase batches + history queries | 5 |
| **Sale** | Create sale + paginated history + by-customer + my-bills + return | 6 |
| **Stock** | Expired / expiring / by-medicine / by-batch / low-stock + dashboard summary | 7 |
| **Discount** | Preview discount for a batch or by expiry | 2 |
| **Report** | Top medicines, top customers, daily revenue, revenue summary (ADMIN) | 4 |

All endpoints return JSON. The frontend has a typed client (`src/services/`) that maps 1:1 to these endpoints.

## Quick start

### Backend

```bash
cd StockEasy-backend/stockeasy
./mvnw spring-boot:run
```

Runs on `http://localhost:8082`.

### Frontend

```bash
cd StockEasy-frontend
npm install
npm run dev
```

Runs on `http://localhost:8080` and talks to the backend on `8082`.

### Default admin

Register through the UI at `/register` and pick the `ADMIN` role. Login takes you to the dashboard.

## Project layout

```
src/main/java/com/stockeasy/stockeasy/
├── auth/                  auth, JWT, register/login
├── user/                  user accounts, roles, profiles
├── pharmacy/
│   ├── medicine/          medicine catalog
│   ├── supplier/          vendors
│   ├── customer/          pharmacy customers (regular tracking)
│   ├── purchase/          buy stock from vendor
│   ├── stock/             batches + dashboard + discount
│   └── sale/              sell to customer, FEFO, history
├── report/                admin-only reports
└── shared/                exceptions, utilities, config
```

```
StockEasy-frontend/src/
├── pages/                 13 routed pages
├── components/            UI components, dashboard widgets
├── services/              typed API client (one file per service)
├── types/                 shared TypeScript types
├── context/AuthContext.tsx
└── routes/ProtectedRoute.tsx
```

## Roles and access

| Resource | ADMIN | STAFF |
|---|---|---|
| Auth (login, register) | yes | yes |
| Medicines, customers, sales, stock, discount | yes | yes |
| Suppliers, reports, user management | **yes** | no |
| Medicines — delete / update | **yes** | no |
| Customers — delete | **yes** | no |

ProtectedRoute in the frontend and SecurityConfig in the backend both enforce the same rules.

## License

Private project, all rights reserved.
