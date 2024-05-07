import CardComponents from '@/shared/components/Card'
import { star, percentage, calender, review } from '@/shared/media'
const Services = () => {
  return (
    <section className='container'>
      <div className='services py-4 mb-3'>
        <h1 className='text-start mt-4 text-primary p-1 fw-700'>
          How does it works?
        </h1>
        <div className='my-2 row'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-3'>
            <CardComponents
              img={star}
              title='Best Choice'
              text='An unrivaled selection of restaurants forwhatever you want'
            />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-3'>
            <CardComponents
              img={review}
              title='User reviews'
              text='Recommendations and reviews from apowerful community'
            />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-3'>
            <CardComponents
              img={percentage}
              title='Exclusive benefits'
              text='Offers for many restaurants and lots odother benefits with our loyalty program'
            />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-3'>
            <CardComponents
              img={calender}
              title='Easy reservation'
              text='Instant, free, everywhere. 24/7 , Lorem ipsum vistum fastimd vast '
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
