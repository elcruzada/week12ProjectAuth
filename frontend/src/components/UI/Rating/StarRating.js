import { useState, useEffect } from "react";

const StarRating = ({ rating, disabled, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
      setActiveRating(rating);
    }, [rating]);
    // NOTE: This useEffect isn't necessary to have for this scenario, but if you
    // have a scenario which requires this input to be re-rendered with an updated
    // rating prop instead of unmounted and remounted with an updated rating, then
    // this useEffect is necessary.

    const starIcon = (number) => {
      const functions = {};
      if (!disabled) {
        functions.onMouseEnter = () => setActiveRating(number);
        functions.onMouseLeave = () => setActiveRating(rating);
        functions.onClick = () => onChange(number);
      }
      return (
        <div
          key={number}
          className={activeRating >= number ? "filled" : "empty"}
          {...functions}
        >
          <i className="fa fa-star"></i>
        </div>
      );
    };

    return (
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((number) => starIcon(number))}
      </div>
    );
  };

  export default StarRating;
