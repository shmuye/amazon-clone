const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

export const formatCurrency = (amount) => currencyFormatter.format(amount);
