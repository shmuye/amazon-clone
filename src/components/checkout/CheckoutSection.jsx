const CheckoutSection = ({ step, title, children }) => (
  <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div className="bg-[#f7fafa] border-b border-gray-200 px-4 sm:px-6 py-3">
      <h2 className="text-lg font-semibold text-gray-900">
        {step && (
          <span className="text-[#c45500] mr-2">{step}.</span>
        )}
        {title}
      </h2>
    </div>
    <div className="p-4 sm:p-6">{children}</div>
  </section>
);

export default CheckoutSection;
