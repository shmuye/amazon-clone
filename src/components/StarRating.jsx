const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: rating }, (_, i) => (
      <span key={i} aria-hidden="true">
        ⭐
      </span>
    ))}
  </div>
);

export default StarRating;
