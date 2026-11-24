# ☕ Brew & Bites Café — Premium Mobile-First Ordering App

A mobile-first restaurant food ordering web application designed for **Brew & Bites Café**. Customers scan physical QR code stands on restaurant tables to browse the menu, customize items, and place orders directly to the café owner via WhatsApp.

---

## 🎯 Corrected QR Code & Customer Flow

### 1. Physical Table QR Scanning (Customer Journey)
- **Scanning a Table QR**: When a customer scans a table QR code stand (e.g. `https://yourwebsite.com/?table=01`), the app **opens the menu directly**.
- **Table Identification**: The menu immediately identifies the table and displays:
  ```text
  Brew & Bites Café
  Ordering from Table 01
  ```
- **Cart & Checkout Persistence**: The table number is preserved throughout the shopping cart, special cooking notes, and final checkout.
- **WhatsApp Order Prefilled Message**:
  ```text
  Hello Brew & Bites Café!

  I would like to place an order.

  Table Number: 01

  1 × Cappuccino – ₹120
  2 × Chocolate Croissant – ₹300

  Total: ₹420

  Payment: Pay at Restaurant.

  Please confirm my order.
  ```

### 2. Website Opened Without Table Number (`/`)
- If a visitor opens the website directly without a table parameter (e.g., typing the URL directly):
  - A friendly welcome modal appears:
    > *"Welcome to Brew & Bites! Please scan the QR code located on your table to view our menu and place your order."*
  - Provides a helpful **"Already at a Table? Select Table"** option for manual selection (Tables 01–10).
  - Once chosen, it opens the menu immediately for that table.

### 3. Clean Customer-Facing Homepage
- **No QR codes are displayed on the customer interface**.
- Bottom mobile navigation bar cleanly mirrors the reference design:
  - 🏠 **Home**
  - 🍽️ **Menu**
  - 🛍️ **Cart** *(with real-time count badge)*
  - 📞 **Contact** *(cafe hours, Wi-Fi info, location, and helpline)*

### 4. Separate Admin / Owner QR Code Portal (`?admin=qr`)
- Dedicated Owner Portal: access via `http://localhost:3000/?admin=qr` or via the discrete link at the bottom of the **Contact** page.
- **Features**:
  - Generates high-contrast QR codes for **Tables 01 through 10** using the actual deployed website URL.
  - **Editable Deployed Base URL**: Enter your live domain (e.g. `https://brewandbites.cafe/`) before printing.
  - **Batch Print**: `"Print All 10 Tables"` formats printable sheets for tabletop acrylic stands or stickers.
  - **Individual Download**: `"Download Table XX Stand (PNG)"` generates high-resolution 300-DPI branded table cards.
  - **Simulate Scan**: `"Simulate Customer Scan"` tests any table flow in one click.

---

## 🎨 Design Palette

- **Dark Espresso**: `#2A160C`
- **Warm Coffee Brown**: `#3D2314`
- **Caramel Accents**: `#C78248`
- **Cream & Beige**: `#FAF4EB`, `#FFF9F3`, `#EADBCB`
- **Soft White**: `#FFFFFF`
- **Typography**: *Playfair Display* & *Plus Jakarta Sans*

---

## ⚙️ Configuration Files

- **Café Settings & Owner WhatsApp**: [`src/config/cafeConfig.js`](src/config/cafeConfig.js)
  - Configurable WhatsApp number: `+91 7995531535` (`917995531535`).
  - Tax, currency, and available tables (`01` to `10`).
- **Menu Data**: [`src/config/menuData.js`](src/config/menuData.js)
  - Categories: *All*, *Coffee*, *Burgers & Sandwiches*, *Croissants & Bakery*, *Desserts*, *Coolers*.
  - Full items with pricing, descriptions, and photography.

---

## 🚀 Running Locally

```bash
cd "C:\Users\HELLO\.gemini\antigravity\scratch\brew-and-bites"
npm run dev
```

- **Customer Table 01 Link**: [http://localhost:3000/?table=01](http://localhost:3000/?table=01)
- **Customer Table 05 Link**: [http://localhost:3000/?table=05](http://localhost:3000/?table=05)
- **Owner QR Stand Portal**: [http://localhost:3000/?admin=qr](http://localhost:3000/?admin=qr)
