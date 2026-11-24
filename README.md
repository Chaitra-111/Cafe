# ☕ Brew & Bites Café — Premium Mobile-First Ordering App

A mobile-first restaurant food ordering web application designed for **Brew & Bites Café**. Customers scan physical QR code stands on their restaurant table to directly open a fresh menu, customize items, and place their order directly to the café owner via WhatsApp.

---

## 🪑 Table QR Code Stands (Table 1 & Table 2)

Scan these QR codes with any smartphone camera or tap the links below:

### 🌐 1. Live Website QR Codes (Production / GitHub Pages)

| Table Stand | Scannable Live Website QR | Direct Website Link |
| :---: | :---: | :--- |
| **Table 01** | ![Table 01 Web QR](public/assets/table-01-web-qr.png) | [👉 Open Table 01 (Live Website)](https://chaitra-111.github.io/Cafe/?table=01&fresh=1) |
| **Table 02** | ![Table 02 Web QR](public/assets/table-02-web-qr.png) | [👉 Open Table 02 (Live Website)](https://chaitra-111.github.io/Cafe/?table=02&fresh=1) |

---

### 📶 2. Local Wi-Fi Network QR Codes (Local Testing on Same Wi-Fi)

| Table Stand | Scannable Wi-Fi QR | Local Wi-Fi Network Link |
| :---: | :---: | :--- |
| **Table 01** | ![Table 01 Wi-Fi QR](public/assets/table-01-qr.png) | `http://192.168.0.103:3000/?table=01&fresh=1` |
| **Table 02** | ![Table 02 Wi-Fi QR](public/assets/table-02-qr.png) | `http://192.168.0.103:3000/?table=02&fresh=1` |

> 📁 **Direct QR Image Asset Files in Repo:**
> - [Table 01 Website QR Image](public/assets/table-01-web-qr.png)
> - [Table 02 Website QR Image](public/assets/table-02-web-qr.png)
> - [Table 01 Local Wi-Fi QR Image](public/assets/table-01-qr.png)
> - [Table 02 Local Wi-Fi QR Image](public/assets/table-02-qr.png)

---

## 📱 Fully Responsive on All Devices

The application is engineered to automatically scale and adapt to any device without feeling zoomed-in:
- **Small & Standard Mobiles (320px – 480px):** Fluid edge-to-edge layout, responsive font scaling (`clamp()`), and optimized 2-column food cards.
- **Tablets & iPads (641px – 1024px):** Comfortable 3-column menu grid, expanded hero card, and centered controls.
- **Laptops & Desktops (> 1024px):** Premium cafe web application layout with a 4-column menu grid and centered bottom navigation.

---

## 🔄 Fresh Ordering & Cart Isolation Flow

1. **Automatic Cart Clearing on Order Placement:**
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
