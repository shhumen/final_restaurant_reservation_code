import React from 'react'
import PersonalInfo from './PersonalInfo'
import { IUserProfile } from '@/shared/models'
import Yums from './Yums'
import Favorites from './Favorites'
import ReviewOfUser from './ReviewsUser'
import { useGetReviewOfUserQuery } from '@/redux/api/reviews'
import Booking from './Bookings'

interface ContentsProps {
  actionType: { type: string } | null
  profile: IUserProfile
  updateProfileData: Function
  open: boolean
  setOpen: Function
}

const Contents: React.FC<ContentsProps> = ({
  actionType,
  profile,
  updateProfileData,
  open,
  setOpen,
}) => {
  const userId = profile?.user?._id
  const { data: reviewOfUser } = useGetReviewOfUserQuery(userId)

  const contentActions: { [key: string]: React.ReactNode } = {
    profile: (
      <PersonalInfo updateProfileData={updateProfileData} profile={profile} />
    ),
    bookings: <Booking profile={profile} />,
    favorites: <Favorites profile={profile} setOpen={setOpen} />,
    reviews: <ReviewOfUser reviewOfUser={reviewOfUser} />,
    // yums: <Yums />,
  }
  if (!actionType) {
    return null
  }

  return (
    <div className={`contents ${open ? 'open' : ' '}`}>
      {contentActions[actionType.type] || null}
    </div>
  )
}

export default Contents
