interface ICard {
  title?: string
  text?: string
  img?: string
}

const CardComponents: React.FC<ICard> = ({ text, img, title }) => {
  return (
    <div className='card_ br-sm mx-1 d-flex'>
      <div className='card-content d-flex justify-space-between align-items-center'>
        <div className='card-img w-100'>
          <img className='w-100' src={img} alt='cuisines' />
        </div>
        {title && (
          <div className='card-title fw-700'>
            <h4>{title}</h4>
          </div>
        )}
        {text && <p className='card-text mt-1'>{text}</p>}
      </div>
    </div>
  )
}

export default CardComponents
