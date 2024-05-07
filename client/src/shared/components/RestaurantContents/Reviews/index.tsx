import { Flex, Progress } from 'antd'
import IRestaurant from '../../SingleRestaurantCard/types'
import { useGetReviewQuery, useUpdateReviewMutation } from '@/redux/api/reviews'
import { useGetUsersQuery } from '@/redux/api/users'
import { useEffect, useState } from 'react'
import { avatar } from '@/shared/media'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import UpdateReviewForm from './UpdateReviewForm'
import { useAppSelector } from '@/redux/store'

interface ReviewsProps {
  restaurant: IRestaurant
  reviewOfUser?: any
}

const Reviews: React.FC<ReviewsProps> = ({ restaurant }) => {
  const { id } = useParams()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { data: reviews } = useGetReviewQuery(id)
  const { data: users } = useGetUsersQuery(null)

  const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<any[]>([])

  useEffect(() => {
    if (reviews && users) {
      const combinedData = reviews?.map((review: any) => {
        const user = users?.find((user: any) => user?._id === review?.userId)
        return {
          user,
          rating: review?.rating,
          comment: review?.reviewText,
          createdAt: review?.createdAt,
        }
      })
      setCommentsWithUserInfo(combinedData)
    }
  }, [reviews, users])

  const getRatingDescription = (averageRating: number | undefined): string => {
    if (averageRating === undefined) return ''
    if (averageRating >= 9) return 'Outstanding'
    if (averageRating >= 8) return 'Excellent'
    if (averageRating >= 7) return 'Very Good'
    if (averageRating >= 6) return 'Good'
    if (averageRating >= 5) return 'Above Average'
    if (averageRating >= 4) return 'Average'
    if (averageRating >= 3) return 'Below Average'
    if (averageRating >= 2) return 'Poor'
    return 'Very Poor'
  }

  const ratingDescription = getRatingDescription(restaurant?.averageRating)

  const ratingRanges = [
    { range: '1-2', min: 1, max: 2 },
    { range: '3-4', min: 3, max: 4 },
    { range: '5-6', min: 5, max: 6 },
    { range: '7-8', min: 7, max: 8 },
    { range: '9-10', min: 9, max: 10 },
  ]

  const getRatingCountInRange = (min: number, max: number): number => {
    return (
      restaurant?.reviews.filter(
        (review: any) => review.rating >= min && review.rating <= max
      ).length ?? 0
    )
  }

  console.log(commentsWithUserInfo)

  return (
    <div className='reviews'>
      <h1 className='fw-600 my-2'>Reviews</h1>
      <Flex
        className='rating-statics p-4 br-sm my-3 d-flex align-items-center justify-center'
        gap='small'
        wrap='wrap'
      >
        <Flex gap='small' wrap='wrap'>
          <Progress
            className='thin-progress'
            strokeColor='rgb(0, 102, 92)'
            trailColor='rgb(188, 189, 190)'
            strokeLinecap='butt'
            type='circle'
            percent={restaurant?.averageRating * 10}
            format={(percent) => (
              <span className='fw-600 fs-md'>
                {(percent ?? 0) * 0.1}
                <span className='special-black fw-500'>/10</span>
              </span>
            )}
          />
        </Flex>
        <Flex vertical className='mx-3'>
          <p className='fw-500 fs-sm'>{ratingDescription}</p>
          <p>{restaurant?.reviews?.length} reviews</p>
        </Flex>
        <div>
          {ratingRanges.map((range, index) => (
            <Progress
              key={index}
              strokeColor='rgb(0, 102, 92)'
              percent={getRatingCountInRange(range.min, range.max) * 10}
              format={() => <span className='fw-500'>{range.range}</span>}
            />
          ))}
        </div>
      </Flex>
      <div className='comments'>
        <h2 className='my-2'>User reviews</h2>
        {commentsWithUserInfo?.map((comment, index) => (
          <div className='comment pt-2 my-2' key={index}>
            <div className='d-flex justify-space-between'>
              <div className='user d-flex align-items-center'>
                <div className='user-avatar'>
                  <span>
                    <img src={avatar} style={{ width: '30px' }} alt='' />
                  </span>
                </div>
                <div className='userinfo d-flex flex-column  justify-space-between'>
                  <p className='fw-500 mx-1'>
                    {comment.user?.firstname}
                    {comment.user?.lastname.slice(0, 1)}.
                  </p>
                  <span className='createdAt mx-1 text-gray'>
                    {moment(comment?.createdAt).format('LL')}
                  </span>
                </div>
              </div>
              <p className='fs-sm'>
                {comment.rating}
                <span className='special-black text-gray'>/10</span>
              </p>
            </div>
            <p className='mb-2 mt-1 text-dark'> {comment.comment}</p>
          </div>
        ))}
      </div>
      {isAuthenticated && (
        <UpdateReviewForm
          commentsWithUserInfo={commentsWithUserInfo}
          restaurantId={restaurant?._id}
        />
      )}
    </div>
  )
}
export default Reviews
