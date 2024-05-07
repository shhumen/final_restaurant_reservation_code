import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '@/redux/api/users'
import { logout } from '@/redux/features/auth/authSlice'
import { IUserProfile, RegisterForm } from '@/shared/models'
import { updateUserSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

interface PersonalInfoProps {
  profile: IUserProfile
  updateProfileData: Function
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  profile,
  updateProfileData,
}) => {
  const dispatch = useDispatch()
  const user_id = profile?.user?._id
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const { data: userDetails } = useGetUserQuery(profile?.user?._id)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(updateUserSchema),
  })

  useEffect(() => {
    if (userDetails) {
      const { firstname, lastname, email, password, phone } = userDetails
      reset({ firstname, lastname, email, password, phone })
    }
  }, [userDetails, reset])

  const onSubmit = (data: any) => {
    updateUser({ user_id, data }).then(() => {
      updateProfileData()
    })
  }

  const deleteAccount = async () => {
    try {
      await deleteUser(user_id)
      dispatch(logout())
    } catch (error) {}
  }

  return (
    <div className='personalContent'>
      <div className='title m-4'>
        <h1 className='fw-600'>My Profile</h1>
      </div>
      <div className='personalInfo m-3 px-2 py-1 br-sm'>
        <div>
          <h3 className='fw-600 py-1 text-primary'>
            Manage my personal information
          </h3>
          <span className='fw-500'>
            Your contact information will be sent to the restaurant when you
            make a reservation.
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            defaultValue={undefined}
            name='email'
            control={control}
            render={({ field }) => (
              <div className='d-flex flex-column justify-between my-4'>
                <label className='label fw-400 text-primary'>Email</label>
                <input
                  disabled
                  type='email'
                  className='personInput fw-500 br-none pb-1'
                  {...field}
                />
              </div>
            )}
          />
          {errors.email && (
            <span className='error'>{errors.email.message}</span>
          )}
          <Controller
            defaultValue={undefined}
            name='firstname'
            control={control}
            render={({ field }) => (
              <div className='d-flex flex-column justify-between my-4'>
                <label className='label fw-400 text-primary'>First name</label>
                <input
                  type='text'
                  className='personInput fw-500 br-none pb-1'
                  {...field}
                />
              </div>
            )}
          />
          {errors.firstname && (
            <span className='error'>{errors.firstname.message}</span>
          )}
          <Controller
            defaultValue={undefined}
            name='lastname'
            control={control}
            render={({ field }) => (
              <div className='d-flex flex-column justify-between my-4'>
                <label className='label fw-400 text-primary'>Last name</label>
                <input
                  type='text'
                  className='personInput fw-500 br-none pb-1'
                  {...field}
                />
              </div>
            )}
          />
          {errors.lastname && (
            <span className='error'>{errors.lastname.message}</span>
          )}

          <Controller
            defaultValue={undefined}
            name='phone'
            control={control}
            render={({ field }) => (
              <div className='d-flex flex-column justify-between my-4'>
                <label className='label fw-400 text-primary'>Phone</label>
                <input
                  type='tel'
                  className='personInput fw-500 br-none pb-1'
                  {...field}
                />
              </div>
            )}
          />
          {errors.phone && (
            <span className='error'>{errors.phone.message}</span>
          )}

          <button
            type='submit'
            className='border-none bg-primary px-2 py-1 br-sm text-white fw-500'
          >
            Update
          </button>
        </form>
        <div className='my-4 d-flex flex-column'>
          <hr />
          <h3 className='fw-600 text-primary mt-4 mb-2'>Delete Account</h3>
          <span className='fw-500 '>
            If you really want to leave us.. You will lose access to all
          </span>
          <button
            type='submit'
            className='border-none mt-3 w-30 bg-primary px-2 py-1 br-sm text-white fw-500'
            onClick={deleteAccount}
          >
            Close my account
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
