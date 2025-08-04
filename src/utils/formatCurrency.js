/**
 * Formats a number as a currency string (USD by default)
 * @param {number} amount - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} Formatted price string (e.g., "$19.99")
 */
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export default formatCurrency;