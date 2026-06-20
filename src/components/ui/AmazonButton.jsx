const AMAZON_BUTTON_CLASS =
  "bg-[#f0c14b] rounded-sm border border-t-[#a88734] border-l-[#9c7e31] border-b-[#846a29] border-r-[#9c7e31] text-[#111] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const AmazonButton = ({ className = "", children, ...props }) => (
  <button className={`${AMAZON_BUTTON_CLASS} ${className}`} {...props}>
    {children}
  </button>
);

export default AmazonButton;
