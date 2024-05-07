import { Triangle } from 'react-loader-spinner'

const Preloader = () => {
  return (
    <Triangle
      visible={true}
      height='80'
      width='80'
      color='#4fa94d'
      ariaLabel='triangle-loading'
      wrapperStyle={{}}
      wrapperClass='spinner'
    />
  )
}

export default Preloader
