import { useGetRestaurantQuery } from '@/redux/api/restaurants'
import BreadCrumbComponent from '@/shared/components/Breadcrumb'
import SliderComponent from '@/shared/components/Silder'
import { restaurantImg } from '@/shared/media'
import { useParams } from 'react-router-dom'
import RestaurantDetails from './RestaurantDetails'

const RestaurantPage = () => {
  const { id } = useParams()
  const { data: restaurant } = useGetRestaurantQuery(id)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
  }
  return (
    <section className='restaurant'>
      <div className='breadcrumb'>
        <BreadCrumbComponent
          pathname={location.pathname}
          restaurantName={restaurant?.restaurantName}
        />
      </div>
      <div className='restaurant-img-slider'>
        <SliderComponent settings={settings}>
          <div>
            <img className='w-100' src={restaurantImg} alt='' />
          </div>
          <div>
            <img className='w-100' src={restaurantImg} alt='' />
          </div>
          <div>
            <img className='w-100' src={restaurantImg} alt='' />
          </div>
          <div>
            <img className='w-100' src={restaurantImg} alt='' />
          </div>
          <div>
            <img className='w-100' src={restaurantImg} alt='' />
          </div>
        </SliderComponent>
      </div>
      <RestaurantDetails restaurant={restaurant} />
    </section>
  )
}

// restaurants link will be go to filtering part

export default RestaurantPage
