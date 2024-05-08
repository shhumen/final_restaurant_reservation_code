import {
  useAddRestaurantToFavListMutation,
  useUpdateFavListMutation,
} from '@/redux/api/favorites'
import { favstar } from '@/shared/media'
import { IFavList } from '@/shared/models'
import moment from 'moment'

interface FavListProps {
  list: IFavList
  restaurantId?: string | undefined
}

const FavList: React.FC<FavListProps> = ({ restaurantId, list }) => {
  const [addRestaurantToFavList] = useAddRestaurantToFavListMutation()
  const [updateFavList] = useUpdateFavListMutation()

  const addRestaurantToList = () => {
    addRestaurantToFavList({ listId: list?._id, restaurantId: restaurantId })
  }

  const isRestaurantInList = () => {
    return list?.restaurants?.includes(restaurantId!)
  }

  const handleDeleteRestaurantFromList = async (listId: string) => {
    try {
      await updateFavList({
        listId: listId,
        data: { action: 'removeRestaurant', restaurantId: restaurantId },
      }).unwrap()
    } catch (error) {
      console.error('Failed to update list name:', error)
    }
  }

  return (
    <>
      <div
        onClick={restaurantId ? addRestaurantToList : undefined}
        className='list-card'
      >
        <div className='list-image py-2 d-flex justify-center'>
          <img src={favstar} alt='favorite' />
        </div>
        <div className='list-name px-1 pt-2 fw-500 d-flex justify-center'>
          <p>{list?.listName}</p>
        </div>
        <div className='list-footer'>
          <p className='py-2 updated text-gray d-flex justify-center'>
            <span className='text-gray mx-1'>
              {list?.restaurants?.length} restaurants |
            </span>
            Updated {moment(list?.updatedAt).format('LL')}
          </p>
          {/* <p>{isSuccess && 'added ✔'}</p> */}
          {isRestaurantInList() && <p className='text-primary p-2'>added ✔</p>}
        </div>
      </div>
      {isRestaurantInList() && (
        <button
          className='remove_restaurant bg-transparent br-sm border-none'
          onClick={() => handleDeleteRestaurantFromList(list?._id)}
        >
          <p className='text-primary py-1'>Remove from list ❌</p>
        </button>
      )}
    </>
  )
}

export default FavList
