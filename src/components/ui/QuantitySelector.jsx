const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
  readOnly = false,
}) => {
  if (readOnly) {
    return (
      <p className="text-sm text-gray-600 mt-2">
        Quantity: <span className="font-medium text-gray-900">{quantity}</span>
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-3">
      <div className="inline-flex items-center rounded-md border border-gray-300 overflow-hidden">
        <button
          type="button"
          onClick={onDecrease}
          aria-label="Decrease quantity"
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer transition-colors"
        >
          −
        </button>
        <span className="px-4 py-1.5 text-sm font-medium min-w-[2.5rem] text-center border-x border-gray-300">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default QuantitySelector;
