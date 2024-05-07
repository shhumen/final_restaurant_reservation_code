import React from 'react'
import { useGetCuisinesQuery } from '@/redux/api/cuisines'
import { cuisineImg } from '@/shared/media'
import { Cuisine } from '@/shared/models'
import CardComponents from '@/shared/components/Card'
import SliderComponent from '@/shared/components/Silder'

const Cuisines: React.FC = () => {
  const { data: cuisines } = useGetCuisinesQuery(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <section className='cuisines container'>
      <h1 className='text-start mt-4 text-primary p-1 fw-700'>Cuisines</h1>
      <div className='my-2 d-flex justify-space-between'>
        <SliderComponent settings={settings}>
          {cuisines?.map((cuisine: Cuisine) => {
            return (
              <CardComponents
                key={cuisine?._id}
                img={cuisineImg}
                text={cuisine?.cuisineName.substr(0, 10)}
              />
            )
          })}
        </SliderComponent>
      </div>
    </section>
  )
}

export default Cuisines
