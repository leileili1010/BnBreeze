import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import StarReviewInput from "./StarReviewInput";
import { thunkCreateReview } from "../../store/reviews";
import { thunkGetSpot } from '../../store/spots';

const PostReview = ({spot, sessionUser}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [disable, setDisable] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});

    const editReview = (e) => setReview(e.target.value);

    const onChange = (num) => {
        setStars(parseInt(num));
    }

    useEffect(() => {
        if(stars>0 && review.length >= 10) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [stars, review])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        }

        const createdReview = await dispatch(thunkCreateReview(newReview, spot.id, sessionUser))
        if (createdReview?.errors) {
            setValidationErrors(createdReview.errors)
        } else {
            dispatch(thunkGetSpot(spot.id));
            setReview("");
            setStars(0);
            setDisable(true);
            setValidationErrors({});
            closeModal();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                {validationErrors.length && Object.values(validationErrors).map(error=>(
                    <p key="">{error}</p>
                ))}
                <textarea 
                    placeholder="Leave your review here..."
                    type="text"
                    value={review}
                    onChange={editReview}
                ></textarea>
                <div className='stars-review-container'>
                    <StarReviewInput stars={stars} onChange={onChange}/>
                    <span>Stars</span>
                </div>
                <button type='submit' disabled={disable}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default PostReview;