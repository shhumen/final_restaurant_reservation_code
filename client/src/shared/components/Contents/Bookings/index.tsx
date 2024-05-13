import {
  useGetReservationsQuery,
  useUpdateReservationMutation,
} from '@/redux/api/reservation'
// import { useGetRestaurantQuery } from '@/redux/api/restaurants'
import { IUserProfile } from '@/shared/models'
import React from 'react'
import { toast } from 'sonner'
import NoResult from '../../NoResult'

interface BookingProps {
  profile: IUserProfile
}

const Booking: React.FC<BookingProps> = ({ profile }) => {
  const { data: reservations } = useGetReservationsQuery(null)
  const [updateReservation] = useUpdateReservationMutation()

  const myReservations = reservations?.filter(
    (reserv: any) => reserv?.userId === profile?.user?._id
  )

  const handleCancelReservation = (reservationId: string) => {
    updateReservation({
      reservationId,
      data: { status: 'Cancelled' },
    }).then(() => {
      toast.success('Reservation Cancelled')
    })
  }

  return (
    <div>
      <h2 className='m-3'>My reservations</h2>

      {myReservations?.length === 0 && (
        <>
          <p className='fw-500 mx-4 my-4 text-gray'>
            No reservation found for this user...
          </p>
          <NoResult />
        </>
      )}
      {myReservations?.map((reservation: any) => (
        <div key={reservation?._id} className='mx-2 my-2'>
          {/* <h2>Restaurant: {reservation?.restaurantId.name}</h2> */}
          <p className='fw-500 text-primary'>
            Date:
            <span className='fw-400 text-dark mx-1'>
              {new Date(reservation?.date).toLocaleDateString()}
            </span>
          </p>
          <p className='fw-600 text-primary'>
            Time:
            <span className='fw-400 text-dark mx-1'>
              {reservation?.timeSlot}
            </span>
          </p>
          <p className='fw-600 text-primary'>
            Guests:
            <span className='fw-400 text-dark mx-1'>
              {reservation?.guests} people
            </span>
          </p>
          <p className='fw-600 text-primary'>
            Status:
            <span className='fw-400 text-dark mx-1'>{reservation?.status}</span>
          </p>
          <button
            className={`cancel-btn my-2 br-sm ${
              reservation?.status !== 'Pending' ? 'bg-gray' : 'bg-primary'
            }`}
            onClick={() => handleCancelReservation(reservation?._id)}
            disabled={reservation?.status !== 'Pending'}
          >
            Cancel
          </button>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Booking
