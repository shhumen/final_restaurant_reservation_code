import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderSettings } from '@/shared/models'

interface SliderComponentProps {
  children: React.ReactNode
  settings: SliderSettings
}

const SliderComponent: React.FC<SliderComponentProps> = ({
  children,
  settings,
}) => {
  return (
    <div className='slider-container w-100'>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default SliderComponent
