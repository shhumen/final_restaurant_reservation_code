import { StaticDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import TimePicker from './TimePicker'
import { useAddReservationMutation } from '@/redux/api/reservation'
import { useAppSelector } from '@/redux/store'

interface ReservationCardProps {
  restaurantId: string | undefined
}

const ReservationCard: React.FC<ReservationCardProps> = ({ restaurantId }) => {
  const { user_id } = useAppSelector((state) => state.auth)
  const [addReservation] = useAddReservationMutation()
  const [step, setStep] = useState<number>(1)
  const [selectedDate, setSelectedDate] = useState<
    dayjs.Dayjs | null | undefined
  >(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date)
  }

  const handleNextStep = () => {
    if (step === 1 && !selectedDate) return
    if (step === 2 && !selectedTime) return
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const peopleOptions = []
  for (let i = 1; i <= 12; i++) {
    peopleOptions.push(i)
  }

  const handleAddReservation = async () => {
    try {
      await addReservation({
        date: selectedDate!.toISOString(),
        timeSlot: selectedTime,
        guests: numberOfPeople,
        userId: user_id,
        restaurantId: restaurantId!,
        notes: 'Lorem',
      })
    } catch (error) {
      console.error('Error adding reservation:', error)
    }
  }

  return (
    <div className='my-3 reservation-card br-sm ml-4 position-sticky bg-white'>
      <div className=' py-2 px-1'>
        <div className='card-header'>
          <h2 className='fw-500 px-1'>Find Table</h2>
          <p className='text-gray px-1'>Book for free</p>
        </div>
        <div className='reserv-filter'>
          <div className='calendar'>
            {step === 1 && (
              <>
                <StaticDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </>
            )}
            {step === 2 && selectedDate && (
              <TimePicker
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                restaurantId={restaurantId}
              />
            )}
            {step === 3 && selectedTime && (
              <div className='people-picker'>
                <h2 className='fw-400 mx-1 mt-2'> Choose your time</h2>
                <div className='people-buttons'>
                  {peopleOptions.map((people: any) => (
                    <button
                      key={people}
                      onClick={() => setNumberOfPeople(people)}
                      className={`border-none bg-transparent  m-1 br-sm ${
                        numberOfPeople === people ? 'selected' : ''
                      }`}
                    >
                      {people}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className='navigation-buttons my-1'>
              {step !== 1 && (
                <button
                  className='border-none bg-transparent p-1 m-1 br-md'
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
              )}
              {step !== 3 && (
                <button
                  className='border-none bg-transparent p-1 m-1 br-md'
                  onClick={handleNextStep}
                >
                  Next
                </button>
              )}

              {step === 3 && (
                <button
                  className='border-none bg-transparent p-1 m-1 br-md'
                  onClick={handleAddReservation}
                >
                  Reserv
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard
