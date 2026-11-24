# ☕ Brew & Bites Café — Premium Mobile-First Ordering App

A mobile-first restaurant food ordering web application designed for **Brew & Bites Café**. Customers scan physical QR code stands on their restaurant table to directly open a fresh menu, customize items, and place their order directly to the café owner via WhatsApp.

---

## 🪑 Table QR Code Stands (Table 1 & Table 2)

Scan these QR codes with any smartphone camera to test or print them for physical restaurant tables:

| Table Stand | Scannable QR Image | Scan Target Link |
| :---: | :---: | :--- |
| **Table 01** | ![Table 01 QR](public/assets/table-01-qr.png) | [Open Table 01 (Fresh Home)](http://localhost:3000/?table=01&fresh=1)<br>`http://192.168.0.103:3000/?table=01&fresh=1` |
| **Table 02** | ![Table 02 QR](public/assets/table-02-qr.png) | [Open Table 02 (Fresh Home)](http://localhost:3000/?table=02&fresh=1)<br>`http://192.168.0.103:3000/?table=02&fresh=1` |

> 📁 **Direct Image Asset Links in Repo:**
> - [Table 01 QR Image](public/assets/table-01-qr.png)
> - [Table 02 QR Image](public/assets/table-02-qr.png)

---

## 🔄 Fresh Ordering & Cart Isolation Flow

1. **Automatic Cart Clearing on Order:**
   - When a customer clicks **"Place Order on WhatsApp"** and confirms in the summary modal:
     - The prefilled order is opened in WhatsApp.
     - The customer's cart is **immediately cleared** (`cartCount = 0`).
     - Special dietary/cooking notes are cleared.
     - The customer is automatically returned to a **fresh Home page**.

2. **Per-Table Cart Isolation (No Shared Carts):**
   - Table 01 and Table 02 have independent local storage keys (`brew_cart_table_01` vs `brew_cart_table_02`).
   - Adding items to Table 01 will **never** appear on Table 02, ensuring accurate bill separation.

3. **Fresh Start for New Customers (`?fresh=1`):**
   - Each physical QR code includes `?fresh=1`. Whenever a new diner sits down and scans:
     - The app identifies the table number on the top navigation bar (`Table 01` / `Table 02`).
     - Clears any previous customer's leftover cart for that table.
     - Opens the clean **Home Page** directly.

---

## 📱 Customer Experience & Design Highlights

- **Visual Theme:** Warm coffee brown (`#3D2314`), dark espresso (`#2A160C`), golden caramel (`#C78248`), cream (`#FAF4EB`, `#FFF9F3`), and soft white.
- **Top Navigation Bar:** Displays brand *"Brew & Bites Café"* with fixed table badge (`Table 01` / `Table 02`) with no confusing dropdowns.
- **Hero Section:** Features headline *"Good Coffee. Great Food. Better Moments."*, an *"Explore Menu →"* action button, and a high-resolution iced coffee mug topped with vanilla ice cream and chocolate drizzle (`public/assets/hero-coffee.jpg`).
- **Product Cards:** 2-column mobile cards with appetizing photography (Cappuccino, Classic Burger, Chocolate Croissant, Chocolate Brownie) and interactive `[-] 1 [+]` quantity steppers.
- **Sticky Bottom Cart Bar:** Displays `View Cart · X Items · ₹XYZ` as soon as items are added.
- **WhatsApp Order Format:**
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

---

## ⚙️ Configuration Files

- **Café Settings & Owner WhatsApp**: [`src/config/cafeConfig.js`](src/config/cafeConfig.js)
  - Configurable WhatsApp number: `+91 7995531535` (`917995531535`).
  - Tax (GST 5%), currency (₹), and tables.
- **Menu Data**: [`src/config/menuData.js`](src/config/menuData.js)
  - Categories: *All*, *Coffee*, *Burgers & Sandwiches*, *Croissants & Bakery*, *Desserts*, *Coolers*.
  - Full items with pricing, descriptions, and photography.

---

## 🚀 Running Locally

```bash
cd "C:\Users\HELLO\.gemini\antigravity\scratch\brew-and-bites"
npm run dev
```

- **Table 01 Fresh Link**: [http://localhost:3000/?table=01&fresh=1](http://localhost:3000/?table=01&fresh=1)
- **Table 02 Fresh Link**: [http://localhost:3000/?table=02&fresh=1](http://localhost:3000/?table=02&fresh=1)
- **Mobile on Wi-Fi**: `http://192.168.0.103:3000/?table=01&fresh=1`
