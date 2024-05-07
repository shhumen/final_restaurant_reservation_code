import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import IRestaurant from '@/shared/components/SingleRestaurantCard/types'
import {
  useDeleteFavListMutation,
  useGetFavListQuery,
  useUpdateFavListMutation,
} from '@/redux/api/favorites'
import { useGetRestaurantsQuery } from '@/redux/api/restaurants'
import SingleRestaurantCard from '@/shared/components/SingleRestaurantCard'
import ModalComponent from '@/shared/components/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFavListSchema } from '@/validations'
import { IListCreate } from '@/shared/models'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { deleteIcon, edit } from '@/shared/media'
import { Popconfirm, Tooltip } from 'antd'
import NoResult from '@/shared/components/NoResult'

const FavoritesPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: list, refetch } = useGetFavListQuery(id)
  const { data: restaurants } = useGetRestaurantsQuery(null)
  const [updateFavList] = useUpdateFavListMutation()
  const [deleteFavList] = useDeleteFavListMutation()

  const favRestaurants = list?.restaurants?.map((restaurant: IRestaurant) =>
    restaurants?.filter((rest: any) => rest._id === restaurant)
  )

  const { control, reset, getValues } = useForm<IListCreate>({
    resolver: zodResolver(createFavListSchema),
  })

  useEffect(() => {
    if (list) {
      const { listName } = list
      reset({ listName })
    }
  }, [list, reset])

  const onSubmit = async () => {
    const formData = getValues()
    try {
      await updateFavList({
        listId: id,
        data: { action: 'changeName', newName: formData.listName },
      }).unwrap()
      refetch()
    } catch (error) {
      console.error('Failed to update list name:', error)
    }
  }

  const deleteList = async () => {
    try {
      await deleteFavList(id).then(() => navigate('/'))
    } catch (error) {
      toast.error(`Failed to delete list: ${id}`)
    }
  }

  return (
    <div className='fav-page my-4 mx-2'>
      <div className='container'>
        <div className=' list d-flex justify-space-between align-items-center'>
          <div className='list-name'>
            <h3 className='fw-500'>{list?.listName}</h3>
          </div>
          <div className='list-footer'>
            <p className='py-2 updated text-gray d-flex'>
              <p className='text-gray'>
                {list?.restaurants?.length} restaurants |
              </p>
              Updated {moment(list?.updatedAt).format('LL')}
            </p>
          </div>
          <div className='actions'>
            <ModalComponent
              title='Update List'
              okText='Update'
              onOkFunction={onSubmit}
              button={
                <Tooltip title='Update list'>
                  <p className='update fw-500 px-1'>
                    <img src={edit} alt='edit' />
                  </p>
                </Tooltip>
              }
            >
              <form className='my-4'>
                <Controller
                  defaultValue={undefined}
                  name='listName'
                  control={control}
                  render={({ field }) => (
                    <div className='d-flex flex-column fw-600 '>
                      <label>
                        List name <span className='text-primary'>*</span>
                      </label>
                      <input
                        type='text'
                        className='list-input p-1 mb-2 text-dark'
                        {...field}
                      />
                    </div>
                  )}
                />
              </form>
            </ModalComponent>
            <Tooltip title='Delete list'>
              <Popconfirm
                title='Delete the list'
                description='Are you sure to delete this list?'
                onConfirm={deleteList}
                okText='Yes'
                cancelText='No'
              >
                <button className='delete border-none bg-transparent'>
                  <img src={deleteIcon} alt='delete' />
                </button>
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
        <div className='restaurants row d-flex w-100'>
          {favRestaurants?.length === 0 && <NoResult />}
          {favRestaurants?.map((restaurant: any) => (
            <div className='singleRestaurant card col-12 col-sm-6 col-md-6 col-lg-3'>
              <SingleRestaurantCard restaurantInfo={restaurant?.[0]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage
