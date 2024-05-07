// import { useGetPeriodTimesQuery } from '@/redux/api/restaurants'
// import dayjs from 'dayjs'
// import React from 'react'

// interface TimePickerProps {
//   restaurantId: string | undefined
//   selectedTime: string
//   setSelectedTime: Function
// }

// const TimePicker: React.FC<TimePickerProps> = ({
//   restaurantId,
//   selectedTime,
//   setSelectedTime,
// }) => {
//   const { data: availableTimes } = useGetPeriodTimesQuery(restaurantId)

//   const handleTimeChange = (time: dayjs.Dayjs | null) => {
//     setSelectedTime(time)
//   }

//   return (
//     <div>
//       {availableTimes?.[0]?.periods?.map((timeslot: any) => (
//         <>
//           <p>{timeslot?.periodName}</p>
//           {timeslot?.timeSlots?.map((slot: any) => (
//             <button>{slot}</button>
//           ))}
//         </>
//       ))}
//     </div>
//   )
// }

// export default TimePicker

import { useGetPeriodTimesQuery } from '@/redux/api/restaurants'
import dayjs from 'dayjs'
import React from 'react'

interface TimePickerProps {
  restaurantId: string | undefined
  selectedTime: string
  setSelectedTime: Function
}

const TimePicker: React.FC<TimePickerProps> = ({
  restaurantId,
  selectedTime,
  setSelectedTime,
}) => {
  const { data: availableTimes } = useGetPeriodTimesQuery(restaurantId)

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <div className='time-picker'>
      <h2 className='fw-400 mx-1 mt-2'> Choose your time</h2>
      {availableTimes?.[0]?.periods?.map((timeslot: any) => (
        <div key={timeslot.periodName}>
          <h3 className='fw-500 text-primary mx-1 my-1'>
            {timeslot.periodName}
          </h3>
          <div className='timeslot-buttons'>
            {timeslot?.timeSlots?.map((slot: any) => (
              <button
                key={slot}
                onClick={() => handleTimeSelect(slot)}
                className={`border-none bg-transparent m-1 br-sm ${
                  selectedTime === slot ? 'selected' : ''
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimePicker
