import Banner from '@/shared/components/Banner'
import Restaurants from './Restaurants'
import Cuisines from './Cuisines'
import BestDeals from './BestDeals'
import Services from './Services'
import { IVisible } from '@/shared/models'

const Home: React.FC<IVisible> = ({ isVisible }) => {
  return (
    <main>
      <Banner isVisible={isVisible} />
      <Restaurants />
      <Cuisines />
      <BestDeals />
      <Services />
    </main>
  )
}

export default Home
