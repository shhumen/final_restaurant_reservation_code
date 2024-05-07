import CardComponents from '@/shared/components/Card'
import { bestDeals } from '@/shared/media'

const BestDeals = () => {
  return (
    <section className='best-deals container'>
      <h1 className='text-start mt-4 text-primary p-1 fw-700'>Best Deals</h1>
      <div className='best-cards my-2 d-flex justify-space-between align-items-center'>
        <CardComponents img={bestDeals} />
        <CardComponents img={bestDeals} />
        <CardComponents img={bestDeals} />
        <CardComponents img={bestDeals} />
      </div>
    </section>
  )
}

export default BestDeals
