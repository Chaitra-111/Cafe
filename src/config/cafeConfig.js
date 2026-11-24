/**
 * Cafe Settings and WhatsApp Configuration
 * Edit this file to customize cafe details, WhatsApp phone number, and table settings.
 */

export const CAFE_CONFIG = {
  cafeName: "Brew & Bites Café",
  shortName: "Brew & Bites",
  tagline: "Good Coffee. Great Food. Better Moments.",
  subtitle: "Freshly brewed. Delicious bites.",
  
  // WhatsApp ordering recipient (Indian country code +91 without '+' or spaces for wa.me API)
  whatsappNumber: "917995531535", 
  displayWhatsApp: "+91 7995531535",
  
  // Currency and Tax Settings
  currencySymbol: "₹",
  currencyCode: "INR",
  taxPercentage: 5, // 5% GST
  taxLabel: "GST (5%)",
  
  // Payment terms
  paymentMethod: "Pay at Restaurant",
  paymentNotice: "Payment: Pay at Restaurant",
  
  // Restaurant Tables configuration
  availableTables: [
    "01", "02", "03", "04", "05", 
    "06", "07", "08", "09", "10"
  ],
  defaultTable: "01",

  // Social & Contact
  address: "Ground Floor, Artisan Promenade, Café Lane",
  timing: "8:00 AM – 11:00 PM"
};
