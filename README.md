# StockEasy

> **Pharmaceutical stock management for medicine shops.**
> Track stock by batch and expiry, sell the right medicine to the right customer, and stop losing money to expired stock.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-Private-lightgrey)

---

## What StockEasy does

- **Records every purchase** with batch number, manufacture date, expiry date, quantity and buy price — per item
- **Sells from the right batch** — oldest expiry first (FEFO), except for regular customers who get the freshest batch
- **Auto-discounts** near-expiry batches (20% ≤ 7 days · 10% ≤ 15 · 5% ≤ 30) so they clear before they expire
- **Tracks each customer** by phone, counts their orders, marks them as regular after a threshold
- **Alerts on low stock** so you know what to rebuy, per medicine
- **Reports expired stock** with the rupee value lost
- **Generates bills** that can be returned (which automatically restocks the batch)
- **Enforces roles** — ADMIN manages suppliers, reports, users; STAFF runs the counter
- **Reports** — top medicines, top customers, daily revenue, totals, all by date range

---

## Architecture

```
                    ┌──────────────────────────────┐
                    │       Browser (port 8080)    │
                    │   React 18 + TypeScript 5     │
                    │   Vite dev server             │
                    └──────────────┬───────────────┘
                                   │  fetch + JWT
                                   │  (Authorization: Bearer)
                                   ▼
                    ┌──────────────────────────────┐
                    │    Spring Boot 3.4.1         │
                    │      (port 8082)             │
                    │  ┌────────────────────────┐  │
                    │  │  JwtAuthFilter         │  │
                    │  ├────────────────────────┤  │
                    │  │  @RestController       │  │
                    │  │  /api/auth             │  │
                    │  │  /api/users            │  │
                    │  │  /api/medicines        │  │
                    │  │  /api/suppliers        │  │
                    │  │  /api/customers        │  │
                    │  │  /api/purchases        │  │
                    │  │  /api/sales            │  │
                    │  │  /api/batch-items      │  │
                    │  │  /api/dashboard        │  │
                    │  │  /api/discounts        │  │
                    │  │  /api/reports          │  │
                    │  └────────┬───────────────┘  │
                    └───────────┼───────────────────┘
                                │  Spring Data JPA
                                │  (Hibernate, ddl-auto=update)
                                ▼
                    ┌──────────────────────────────┐
                    │        MySQL 8               │
                    │    Database: stockeasy_db    │
                    └──────────────────────────────┘
```

---

## Domain model

```
  ┌──────────┐        ┌───────────────┐         ┌──────────────┐
  │   User   │        │ PurchaseBatch │         │   Supplier   │
  │──────────│        │───────────────│         │──────────────│
  │ id (PK)  │        │ batchId (PK)  │◄────────│ supplierId   │
  │ username  │  1   * │ batchNumber   │         │ name         │
  │ password  │        │ invoiceNo     │         │ phone        │
  │ role      │        │ purchaseDate  │         │ email        │
  │ profile…  │        │ supplierId FK │         └──────────────┘
  └────┬─────┘        └───────┬───────┘
       │ 1                    1 │
       │ creates              │ contains
       │                      ▼ *
       │             ┌────────────────┐
       │             │   BatchItem    │
       │             │────────────────│
       │             │ batchItemId(PK)│
       │             │ batchId FK     │
       │             │ medicineId FK  │◄──┐
       │             │ qtyAvailable   │   │
       │             │ mfgDate        │   │
       │             │ expiryDate     │   │
       │             │ buyPrice       │   │
       │             └────────┬───────┘   │
       │                      │ 1         │
       │                      │ sold in   │
       │                      ▼ *        │
       │             ┌────────────────┐  │
       │             │   SaleItem     │  │
       │             │────────────────│  │
       │             │ saleItemId(PK) │  │
       │             │ saleId FK      │  │
       │             │ batchItemId FK │  │
       │             │ qtySold        │  │
       │             │ sellPrice      │  │
       │             └────────┬───────┘  │
       │                      │ *        │
       │                      │ belongs  │
       │                      ▼ 1        │
       │  *              ┌──────────┐    │
       └────────────────►│   Sale   │    │
            creates      │──────────│    │
                        │ saleId   │    │
                        │ saleDate │    │
                        │ total    │    │
                        │ returned │    │
                        │ customerId FK  ───┐
                        │ createdById FK ───┤
                        └──────────┘       │
                                             │
                        ┌──────────┐        │
                        │ Customer │◄───────┘
                        │──────────│
                        │ customerId(PK)
                        │ name     │
                        │ phone    │
                        │ email    │
                        │ totalOrders
                        │ regularThreshold
                        └──────────┘

                        ┌──────────┐
                        │ Medicine │ (also referenced by BatchItem)
                        │──────────│
                        │ medicineId(PK)
                        │ name     │
                        │ brand    │
                        │ category │
                        │ defaultSellPrice
                        └──────────┘
```

---

## Tech stack

| Layer | Stack |
|---|---|
| **Backend** | Spring Boot 3.4.1 · Java 21 · Spring Web · Spring Data JPA · Spring Security · JWT (jjwt 0.11.5) · Hibernate Validator · MySQL Connector · Lombok 1.18.40 · springdoc OpenAPI |
| **Frontend** | Vite 7 · React 18 · TypeScript 5 · React Router 6 · TanStack Query · shadcn/ui · Radix UI · Tailwind CSS · lucide-react · recharts |
| **Database** | MySQL 8 (auto-schema via Hibernate `ddl-auto=update`) |

---

## API overview

**51 endpoints** under `/api/`, grouped into 10 service modules:

| Service | Purpose | Endpoints |
|---|---|---|
| `auth` | Register, login (returns JWT) | 2 |
| `users` | Profile CRUD + admin user management | 5 |
| `medicines` | Catalog CRUD + filters (category, brand, search) | 8 |
| `suppliers` | Vendor CRUD (ADMIN) | 5 |
| `customers` | CustomerCRUD + by-phone lookup + search | 7 |
| `purchases` | Create purchase batches + history | 5 |
| `sales` | Create sale + history + by-customer + my-bills + return | 6 |
| `batch-items` | Expired / expiring / by-medicine / by-batch / low-stock | 6 |
| `dashboard` | Summary cards | 1 |
| `discounts` | Preview discount for a batch or by expiry | 2 |
| `reports` | Top medicines, top customers, daily revenue, summary (ADMIN) | 4 |

All endpoints return JSON. Swagger UI: **`http://localhost:8082/swagger-ui.html`**

---

## Quick start

### 1. Database

```sql
CREATE DATABASE stockeasy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend configuration

Edit `StockEasy-backend/stockeasy/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/stockeasy_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
server.port=8082
```

### 3. Run the backend

```bash
cd StockEasy-backend/stockeasy
./mvnw spring-boot:run
```

→ `http://localhost:8082`

### 4. Run the frontend

```bash
cd StockEasy-frontend
npm install
npm run dev
```

→ `http://localhost:8080`

### 5. Create your first user

Open `http://localhost:8080`, click **Get Started**, register with role **ADMIN**. You'll land on the dashboard.

---

## Project layout

```
stock_easy/
├── StockEasy-backend/                      Spring Boot 3.4.1 + Java 21
│   └── src/main/java/com/stockeasy/stockeasy/
│       ├── auth/                           auth, JWT, register/login
│       ├── user/                           user accounts, roles, profiles
│       ├── pharmacy/
│       │   ├── medicine/                   medicine catalog
│       │   ├── supplier/                   vendors
│       │   ├── customer/                   pharmacy customers (regular tracking)
│       │   ├── purchase/                   buy stock from vendor
│       │   ├── stock/                      batches + dashboard + discount
│       │   └── sale/                       sell to customer, FEFO, history
│       ├── report/                         admin-only reports
│       └── shared/                         exceptions, utilities, config
│
├── StockEasy-frontend/                     Vite 7 + React 18 + TypeScript 5
│   └── src/
│       ├── pages/                          13 routed pages
│       ├── components/                     UI components, dashboard widgets
│       ├── services/                       typed API client (one file per service)
│       ├── types/                          shared TypeScript types
│       ├── context/AuthContext.tsx          JWT-aware auth state
│       └── routes/ProtectedRoute.tsx       role-based route guard
│
└── README.md
```

---

## Roles and access

| Resource | ADMIN | STAFF |
|---|:---:|:---:|
| Login / Register | ✓ | ✓ |
| Dashboard, Medicines, Customers, Sales, Stock, Discounts | ✓ | ✓ |
| Suppliers, Reports, User management | **✓** | ✗ |
| Medicines — delete / update | **✓** | ✗ |
| Customers — delete | **✓** | ✗ |

`ProtectedRoute` (frontend) and `SecurityConfig` (backend) both enforce the same rules.

---

## License

Private project, all rights reserved.
