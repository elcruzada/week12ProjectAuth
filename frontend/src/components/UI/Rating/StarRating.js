import { useState, useEffect } from "react";
import './StarRating.css'

const StarRating = ({ rating, disabled, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
      setActiveRating(rating);
    }, [rating]);

    const starIcon = (number) => {
      const functions = {};
      if (!disabled) {
        functions.onClick = () => onChange(number);
        functions.onMouseEnter = () => setActiveRating(number);
        functions.onMouseLeave = () => setActiveRating(rating);
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
      <div className="rating-input"> {[1, 2, 3, 4, 5].map((number) => starIcon(number))} </div>
    );
  };

  export default StarRating;
