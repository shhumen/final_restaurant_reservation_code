import { useModal } from '@/hooks'
import Drawer_ from '../Drawer'
import { useGetMeQuery } from '@/redux/api/auth'
import { logout } from '@/redux/features/auth/authSlice'
import { useAppDispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import Contents from '../Contents'
import ActionButtons from '../ActionButtons'
import { avatar, logoutImg } from '@/shared/media'
import { ActionTypes } from '@/shared/constants'
import { Link } from 'react-router-dom'

const Profile = () => {
  const dispatch = useAppDispatch()
  const [actionType, setActionType] = useState<{ type: string } | null>(null)
  // const [childrenDrawer, setChildrenDrawer] = useState(false)
  const { data: profile, refetch } = useGetMeQuery(null)

  const { open, setOpen } = useModal()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    profile
  }, [profile])

  const actions = ['profile', 'bookings', 'favorites', 'reviews']

  const handleAction = (action: string) => {
    const actionConfig = {
      [ActionTypes.personalInfo]: { type: ActionTypes.personalInfo },
      [ActionTypes.bookings]: { type: ActionTypes.bookings },
      [ActionTypes.favorites]: { type: ActionTypes.favorites },
      [ActionTypes.reviews]: { type: ActionTypes.reviews },
      // [ActionTypes.yums]: { type: ActionTypes.yums },
    }
    const config = actionConfig[action]
    if (config) {
      setActionType(config)
    }
  }

  const updateProfileData = () => {
    refetch()
  }

  return (
    <div className='profile'>
      <Drawer_ title='' button='Profile' setOpen={setOpen} open={open}>
        <div className='profile-nav h-100 pl-3 py-3'>
          <div className='profile_info'>
            <div className='profile_img text-center'>
              <img
                src={avatar}
                style={{ width: '5.625rem', height: '5.625rem' }}
                alt='avatar'
              />
            </div>
            <div className='profile_content text-center fs-sm py-2 px-4'>{`${profile?.user?.firstname} ${profile?.user?.lastname}`}</div>
          </div>
          <div className='nav-links text-center'>
            <ActionButtons actions={actions} handleAction={handleAction} />
            <Link to='restaurant-register' onClick={() => setOpen(false)}>
              <p className='my-2 py-2 d-flex align-items-flex-start w-70 text-primary fw-600 register-restaurant'>
                Register my restaurant
              </p>
            </Link>
            <button
              onClick={handleLogout}
              className='logout bg-transparent border-none d-flex my-2 justify-center align-items-center'
            >
              <img src={logoutImg} alt='logout' />
              <p className='px-1 fs-sm text-primary'>Logout</p>
            </button>
          </div>
        </div>
        <Contents
          setOpen={setOpen}
          open={open}
          profile={profile}
          actionType={actionType}
          updateProfileData={updateProfileData}
        />
      </Drawer_>
    </div>
  )
}

export default Profile
