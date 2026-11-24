import { CAFE_CONFIG } from '../config/cafeConfig';

/**
 * Format the order details into the customer's WhatsApp message
 * Exactly adhering to user specifications and sample prompt.
 */
export function buildWhatsAppMessage({ items, total, tableNumber, specialNote }) {
  const lines = [];

  lines.push(`Hello ${CAFE_CONFIG.cafeName}!`);
  lines.push('');
  lines.push('I would like to place an order.');
  lines.push('');
  lines.push(`Table Number: ${tableNumber}`);
  lines.push('');

  // Item lines: "1 × Cappuccino – ₹120"
  items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    lines.push(`${item.quantity} × ${item.name} – ${CAFE_CONFIG.currencySymbol}${itemTotal}`);
  });

  lines.push('');
  lines.push(`Total: ${CAFE_CONFIG.currencySymbol}${total}`);

  if (specialNote && specialNote.trim().length > 0) {
    lines.push('');
    lines.push(`Special Note: ${specialNote.trim()}`);
  }

  lines.push('');
  lines.push(`Payment: ${CAFE_CONFIG.paymentMethod}.`);
  lines.push('');
  lines.push('Please confirm my order.');

  return lines.join('\n');
}

/**
 * Creates the full click-to-chat WhatsApp link
 */
export function generateWhatsAppLink({ items, total, tableNumber, specialNote }) {
  const message = buildWhatsAppMessage({ items, total, tableNumber, specialNote });
  const encodedText = encodeURIComponent(message);
  const phoneNumber = CAFE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
