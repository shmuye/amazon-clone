export const EMPTY_SHIPPING = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
};

export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "ET", label: "Ethiopia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
];

export const validateShipping = (shipping) => {
  const errors = {};

  if (!shipping.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!shipping.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!shipping.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!shipping.addressLine1.trim()) {
    errors.addressLine1 = "Street address is required";
  }

  if (!shipping.city.trim()) {
    errors.city = "City is required";
  }

  if (!shipping.state.trim()) {
    errors.state = "State / province is required";
  }

  if (!shipping.zipCode.trim()) {
    errors.zipCode = "ZIP / postal code is required";
  }

  if (!shipping.country) {
    errors.country = "Country is required";
  }

  return errors;
};

export const formatShippingAddress = (shipping) => {
  if (!shipping) return "";

  const lines = [
    shipping.fullName,
    shipping.addressLine1,
    shipping.addressLine2,
    [shipping.city, shipping.state, shipping.zipCode].filter(Boolean).join(", "),
    COUNTRIES.find((c) => c.value === shipping.country)?.label ?? shipping.country,
  ].filter(Boolean);

  return lines;
};
