import FormInput from "../ui/FormInput.jsx";
import { COUNTRIES } from "../../utils/shipping.js";

const ShippingForm = ({ shipping, errors, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormInput
        id="fullName"
        label="Full name"
        value={shipping.fullName}
        onChange={handleChange("fullName")}
        error={errors.fullName}
        placeholder="John Smith"
        className="sm:col-span-2"
        required
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={shipping.email}
        onChange={handleChange("email")}
        error={errors.email}
        placeholder="you@example.com"
        required
      />

      <FormInput
        id="phone"
        label="Phone number"
        type="tel"
        value={shipping.phone}
        onChange={handleChange("phone")}
        error={errors.phone}
        placeholder="+1 555 123 4567"
        required
      />

      <FormInput
        id="addressLine1"
        label="Street address"
        value={shipping.addressLine1}
        onChange={handleChange("addressLine1")}
        error={errors.addressLine1}
        placeholder="123 Main Street"
        className="sm:col-span-2"
        required
      />

      <FormInput
        id="addressLine2"
        label="Apartment, suite, etc. (optional)"
        value={shipping.addressLine2}
        onChange={handleChange("addressLine2")}
        placeholder="Apt 4B"
        className="sm:col-span-2"
      />

      <FormInput
        id="city"
        label="City"
        value={shipping.city}
        onChange={handleChange("city")}
        error={errors.city}
        required
      />

      <FormInput
        id="state"
        label="State / Province"
        value={shipping.state}
        onChange={handleChange("state")}
        error={errors.state}
        required
      />

      <FormInput
        id="zipCode"
        label="ZIP / Postal code"
        value={shipping.zipCode}
        onChange={handleChange("zipCode")}
        error={errors.zipCode}
        required
      />

      <FormInput
        id="country"
        label="Country"
        as="select"
        value={shipping.country}
        onChange={handleChange("country")}
        error={errors.country}
        required
      >
        {COUNTRIES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </FormInput>
    </div>
  );
};

export default ShippingForm;
