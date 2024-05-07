import React, { useEffect, useState } from 'react'
import { Rate, Input, Button } from 'antd'
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
} from '@/redux/api/reviews'
import { useAppSelector } from '@/redux/store'

interface UpdateReviewFormProps {
  restaurantId: string
  commentsWithUserInfo: any[]
}

const UpdateReviewForm: React.FC<UpdateReviewFormProps> = ({
  restaurantId,
  commentsWithUserInfo,
}) => {
  const [updateReview] = useUpdateReviewMutation()
  const [addReview] = useAddReviewMutation()
  const { user_id } = useAppSelector((state) => state.auth)

  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  useEffect(() => {
    const userReview = commentsWithUserInfo.find(
      (comment: any) => comment.user?._id === user_id
    )

    if (userReview) {
      setRating(userReview.rating)
      setReviewText(userReview.comment)
      setIsUpdating(true)
    }
  }, [commentsWithUserInfo, user_id])

  const handleUpdateReview = async () => {
    try {
      await updateReview({
        userId: user_id,
        data: {
          restaurantId,
          rating,
          reviewText,
        },
      })

      setRating(0)
      setReviewText('')
    } catch (error) {
      console.error('Failed to update review:', error)
    }
  }

  const handleAddReview = async () => {
    try {
      await addReview({
        userId: user_id,
        restaurantId: restaurantId,
        rating: rating,
        reviewText: reviewText,
      })

      setRating(0)
      setReviewText('')
      setIsUpdating(true)
    } catch (error) {
      console.error('Failed to add review:', error)
    }
  }

  return (
    <div className='update-review-form my-2'>
      <h3 className='fw-500 mt-3'>
        {`${isUpdating ? 'Edit' : 'Add'}`} Your Review
      </h3>
      <div>
        <p className='text-dark my-1 fw-500'>Rating:</p>
        <Rate count={10} value={rating} allowHalf onChange={setRating} />
      </div>
      <div>
        <p className='text-dark my-1 fw-500'>Review:</p>
        <Input.TextArea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>

      {isUpdating ? (
        <button
          className='my-2 update-review p-1 br-sm bg-transparent fw-500'
          onClick={handleUpdateReview}
        >
          Update Review
        </button>
      ) : (
        <button
          className='my-2 update-review p-1 br-sm bg-transparent fw-500'
          onClick={handleAddReview}
        >
          Add Review
        </button>
      )}
    </div>
  )
}

export default UpdateReviewForm
