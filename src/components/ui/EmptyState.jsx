import { Link } from "react-router-dom";
import AmazonButton from "./AmazonButton.jsx";
import { ROUTES } from "../../constants/routes.js";

const EmptyState = ({ title, description, actionLabel, actionTo = ROUTES.HOME }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-lg border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 mb-6 max-w-md">{description}</p>
    <Link to={actionTo}>
      <AmazonButton className="px-6 py-2">{actionLabel}</AmazonButton>
    </Link>
  </div>
);

export default EmptyState;
