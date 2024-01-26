import { useState } from 'react';
import './PostReview.css';

const StarReviewInput = ({stars, onChange}) => {
    const [activeRating, setActiveRating] = useState(stars);

    function starsReview(num) {
        return (
            <div className={`star ${activeRating >= num ? "filled" : "empty"}`}>
                <i id="star" className="fa-solid fa-star" 
                onMouseEnter={() => setActiveRating(num)} 
                onMouseLeave={() => setActiveRating(stars) } 
                onClick={() => onChange(num)} ></i>
            </div>
        )
    }

    return (
        <>
            {starsReview(1)}
            {starsReview(2)}
            {starsReview(3)}
            {starsReview(4)}
            {starsReview(5)}
        </>
    )
}

export default StarReviewInput;