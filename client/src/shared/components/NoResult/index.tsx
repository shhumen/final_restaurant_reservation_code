import { noresult } from '@/shared/media'

const NoResult = () => {
  return (
    <div className='text-center'>
      <img className='w-70' src={noresult} alt='no result' />
    </div>
  )
}

export default NoResult
