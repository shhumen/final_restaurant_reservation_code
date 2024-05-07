import { useGetRestaurantsQuery } from '@/redux/api/restaurants'
import { useDeleteReviewMutation } from '@/redux/api/reviews'
import { avatar } from '@/shared/media'
import moment from 'moment'
import React from 'react'
import IRestaurant from '../../SingleRestaurantCard/types'
import { Popconfirm } from 'antd'
import NoResult from '../../NoResult'
import { DeleteOutlined } from '@ant-design/icons'

interface ReviewOfUserProps {
  reviewOfUser: any
}

const ReviewOfUser: React.FC<ReviewOfUserProps> = ({ reviewOfUser }) => {
  const { data: restaurants } = useGetRestaurantsQuery(null)
  const [deleteReview] = useDeleteReviewMutation()

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  return (
    <div className='comments'>
      <h2 className='m-3'>My reviews</h2>
      {!reviewOfUser && (
        <>
          <p className='fw-500 mx-4 text-gray'>
            No reviews found for this user...
          </p>
          <NoResult />
        </>
      )}
      {reviewOfUser?.map((comment: any, index: number) => {
        const restaurant = restaurants?.find(
          (rest: IRestaurant) => rest._id === comment.restaurantId
        )
        const restaurantName =
          restaurant?.restaurantName || 'Unknown Restaurant'
        return (
          <div className='comment px-2 pt-2' key={index}>
            <div className='d-flex justify-space-between'>
              <div className='user d-flex align-items-center justify-space-between'>
                <div className='user-avatar'>
                  <span>
                    <img src={avatar} style={{ width: '30px' }} alt='' />
                  </span>
                </div>
                <div className='userinfo d-flex flex-column  justify-space-between'>
                  <span className='createdAt mx-1 text-gray'>
                    {moment(comment?.createdAt).format('LL')}
                  </span>
                </div>
              </div>
            </div>
            <p className='mb-2 mx-2 mt-1 text-dark'> {comment.reviewText}</p>
            <div className='d-flex align-items-center justify-space-between'>
              <div className='rest'>
                <p
                  style={{ fontSize: '14px' }}
                  className='mb-2 w-100 mx-2 mt-1 text-dark'
                >
                  You reviewed : <span>{restaurantName}</span>
                </p>
              </div>
              <div className='delete'>
                <Popconfirm
                  title='Delete the review'
                  description='Are you sure to delete this review?'
                  onConfirm={() => handleDeleteReview(comment._id)}
                  okText='Yes'
                  cancelText='No'
                >
                  <button className='border-none mx-2 br-sm py-1 px-1 bg-transparent'>
                    <DeleteOutlined />
                    Delete my review
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReviewOfUser
