import { RegisterRestaurantForm } from '@/shared/models'
import { restaurantRegisterSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const RestaurantLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterRestaurantForm>({
    resolver: zodResolver(restaurantRegisterSchema),
  })

  console.log(getValues())

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <form className='restaurant-register' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='fw-500 text-center mt-4 mb-1 text-dark'>
        Restaurant Registration
      </h2>
      <div className='row justify-center align-items-start'>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6 px-2'>
          <Controller
            defaultValue={undefined}
            name='firstname'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='firstname' className='py-1 fw-600 text-primary'>
                  First Name
                </label>
                <input
                  type='text'
                  placeholder='firstname'
                  className='input'
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
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='lastname' className='py-1 fw-600 text-primary'>
                  Last Name
                </label>
                <input
                  type='text'
                  placeholder='lastname'
                  className='input'
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
            name='email'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='email' className='py-1 fw-600 text-primary'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='email'
                  className='input'
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
            name='phone'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='phone' className='py-1 fw-600 text-primary'>
                  Phone
                </label>
                <input
                  type='text'
                  placeholder='phone'
                  className='input'
                  {...field}
                />
              </div>
            )}
          />
          {errors.phone && (
            <span className='error'>{errors.phone.message}</span>
          )}
        </div>

        <div className='col-12 col-sm-12 col-md-6 col-lg-6 px-2'>
          <Controller
            defaultValue={undefined}
            name='restaurantName'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label
                  htmlFor='restaurantName'
                  className='py-1 fw-600 text-primary'
                >
                  Restaurant Name
                </label>
                <input
                  type='text'
                  placeholder='restaurantName'
                  className='input'
                  {...field}
                />
              </div>
            )}
          />
          {errors.restaurantName && (
            <span className='error'>{errors.restaurantName.message}</span>
          )}

          <Controller
            defaultValue={undefined}
            name='address'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='address' className='py-1 fw-600 text-primary'>
                  Address
                </label>
                <input
                  type='text'
                  placeholder='address'
                  className='input'
                  {...field}
                />
              </div>
            )}
          />
          {errors.address && (
            <span className='error'>{errors.address.message}</span>
          )}

          <Controller
            defaultValue={undefined}
            name='password'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label htmlFor='password' className='py-1 fw-600 text-primary'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  className='input py-1 px-2'
                  {...field}
                />
              </div>
            )}
          />
          {errors.password && (
            <span className='error'>{errors.password.message}</span>
          )}
          <Controller
            defaultValue={undefined}
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <div className='form-element d-flex flex-column mt-2'>
                <label
                  htmlFor='confirmPassword'
                  className='py-1 fw-600 text-primary'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  placeholder='confirmPassword'
                  className='input py-1 px-2'
                  {...field}
                />
              </div>
            )}
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword.message}</span>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='form-btn bg-primary text-white fw-500 border-none px-3 pt-1 pb-1 mx-2 my-4 br-sm'
      >
        Register
      </button>
    </form>
  )
}

export default RestaurantLogin
