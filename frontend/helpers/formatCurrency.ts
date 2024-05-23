export default function formatCurrency(value) {
  const currency = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });

  return currency.format(value / 100);
}
