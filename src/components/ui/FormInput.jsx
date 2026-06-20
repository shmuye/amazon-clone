const FormInput = ({
  id,
  label,
  error,
  className = "",
  as: Component = "input",
  children,
  ...props
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <Component
      id={id}
      className={`w-full rounded-md border px-3 py-2 text-sm bg-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#f0c14b] focus:border-[#a88734]
        ${error ? "border-red-400" : "border-gray-300"}`}
      {...props}
    >
      {children}
    </Component>
    {error && (
      <p className="text-red-600 text-xs mt-1" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default FormInput;
