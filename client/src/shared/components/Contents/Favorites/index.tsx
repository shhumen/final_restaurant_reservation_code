import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAddListMutation, useGetFavListsQuery } from '@/redux/api/favorites'
import { IListCreate, IUserProfile } from '@/shared/models'
import NoResult from '../../NoResult'
import ModalComponent from '../../Modal'
import List from './List'
import { add } from '@/shared/media'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFavListSchema } from '@/validations'
import { Link } from 'react-router-dom'

interface FavoritesProps {
  profile: IUserProfile
  setOpen: Function
}

const Favorites: React.FC<FavoritesProps> = ({ profile, setOpen }) => {
  profile
  const { data: favLists } = useGetFavListsQuery(profile?.user?._id)
  const [addlist] = useAddListMutation()

  const { control, getValues } = useForm<IListCreate>({
    resolver: zodResolver(createFavListSchema),
  })

  const hanldeOnOk = () => {
    addlist({
      userId: profile?.user?._id,
      listName: getValues().listName,
    })
  }

  return (
    <div className='favorites m-3'>
      <div className='favorites-header'>
        <h1 className='fw-500'>My Lists </h1>
        <p className='my-1'>{favLists?.length} lists</p>
      </div>
      <div className='fav-lists my-4'>
        <ModalComponent
          title='Create List'
          onOkFunction={hanldeOnOk}
          button={
            <div className='create-list p-1 br-md d-flex align-items-center'>
              <img style={{ width: '30px' }} src={add} className='w-100' />
              <p className='fw-500 px-1'>Create a new favorite list</p>
            </div>
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
        {favLists?.length === 0 && <NoResult />}
        <div className='lists container'>
          <div className='row'>
            {favLists?.map((list: any) => (
              <div
                key={list?._id}
                className='list p-3 col-12 col-sm-12 col-xl-6'
              >
                <Link
                  to={`/favorites/${list?._id}`}
                  onClick={() => setOpen(false)}
                  className='text-dark'
                >
                  <List list={list} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites
