import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import PostReview from './PostReview';
import DeleteReview from './DeleteReview';

const SpotReviews = ({spot, reviewsArr}) => {
    const sessionUser = useSelector(state => state.session.user)
    const ifOwner = spot.Owner?.id === sessionUser?.id;
    const sortedReviews = reviewsArr.sort((a, b) => b.id - a.id);
    const hasReviews = reviewsArr.length > 0;
    let curUserReview = false;
    
    if (hasReviews && sessionUser) {
        for (let review of sortedReviews) {
            if(sessionUser.id === review.userId) {
                curUserReview = true;
                break;
            }
        }
    }
    
    const ifPostReview = sessionUser && !ifOwner &&(!hasReviews || !curUserReview);

    if(!spot) return null; 
    
    return (
        <div className="spot-reviews-container">
            <div className='rating-review-container'>
                {
                    spot.avgStarRating !== "No ratings yet." ?
                    (<span><i className="fa-solid fa-star"></i>{parseFloat(spot.avgStarRating).toFixed(1)}</span>) :
                    (<span><i className="fa-solid fa-star"></i>New</span>)
                }
                <span>{spot.numReviews !== "No reviews yet." ? (spot.numReviews > 1 ? ` · ${spot.numReviews} Reviews` : ` · ${spot.numReviews} Review`) : null}</span>
            </div>

            {ifPostReview && 
                <OpenModalButton
                    buttonText='Post Your Review'
                    modalComponent={<PostReview spot={spot} sessionUser={sessionUser}/>}
                />
            }
            {sessionUser && !hasReviews && !ifOwner && <h3>Be the first to post a review</h3> }

            {reviewsArr.length > 0 && 
                <div className="spot-reveiws">
                    {sortedReviews.map(review => (
                        <div key={review.id}>
                            <div>{review.User.firstName}</div>
                            <div>{new Date(review.updatedAt).toLocaleDateString('en-US', { month: 'long' })} {new Date(review.updatedAt).getFullYear()}</div>
                            <p>{review.review}</p>
                            {review.userId === sessionUser?.id && 
                                <OpenModalButton 
                                    buttonText='Delete'
                                    modalComponent={<DeleteReview review={review} />}
                                />
                            }
                        </div>
                    ))}
              
                </div>
            }
        </div>
    )
}

export default SpotReviews;