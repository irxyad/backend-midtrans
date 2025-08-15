# 🚀 Midtrans Backend Server

Backend server for Midtrans payments to retrieve a payment token

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm install i
```

### 2. Environment Configuration

Create `.env` file:

```env
PORT=3000
SERVER_KEY=your_midtrans_server_key_here
```

Get SERVER_KEY from [Midtrans Dashboard > Access Keys](https://dashboard.sandbox.midtrans.com/settings/access-keys)

### 3. Run Server

```bash
npm run dev
```

## 📡 API Endpoint

### POST `/get-snap-token`

**Request:**

```json
{
  "orderId": "ORDER-001",
  "grossAmount": 100000,
  "firstName": "John",
  "email": "john@example.com",
  "phone": "+6281234567890"
}
```

**Response:**

```json
{
  "token": "aa895fb1-ef7b-4199-9c5b-817b33a06b73"
}
```

## 🧪 Test with cURL

```bash
curl -X POST http://localhost:3000/get-snap-token \
  -H "Content-Type: application/json" \
  -d '{"orderId":"TEST-001","grossAmount":100000,"firstName":"John","email":"john@example.com","phone":"+6281234567890"}'
```

---
