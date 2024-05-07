import { tray } from '@/shared/media'
import React, { useState } from 'react'
import IRestaurant from '@/shared/components/SingleRestaurantCard/types'
import Menu from '../Menu'
import Reviews from '../Reviews'
import YandexMap from '@/shared/components/Map'
// import { useGetAddressesQuery } from '@/redux/api/restaurants'
import OpeningHours from '../OpeningHours'

interface AboutProps {
  restaurant: IRestaurant
  setStep: Function
  step: number
}
const About: React.FC<AboutProps> = ({ restaurant }) => {
  const [step, setStep] = useState(3)

  // const { data: addresses } = useGetAddressesQuery(null)

  // const mapAddresses = addresses?.map(
  //   (address: any) => address?.address?.street
  // )

  // i will use it in restaurants filter page
  return (
    <div className='about'>
      <h1 className='fw-600 my-2'>Restaurant Menu</h1>
      <div className='food-requirements w-100 d-flex align-items-center'>
        <span>
          <img src={tray} alt='tray' />
        </span>
        <h4 className='px-1'>Dietary options:</h4>
        <p>
          {restaurant?.dietaryOptions?.map((option: any) => option).join(', ')}
        </p>
      </div>
      <Menu restaurant={restaurant} setStep={setStep} step={step} />
      <Reviews restaurant={restaurant} />
      <YandexMap
        addresses={[restaurant?.address?.street]}
        restaurant={restaurant}
      />
      <OpeningHours restaurant={restaurant} />
    </div>
  )
}

export default About
