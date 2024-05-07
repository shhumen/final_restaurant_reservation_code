import { useRegisterUserMutation, useVerifyOTPMutation } from '@/redux/api/auth'
import { RegisterForm } from '@/shared/models'
import { registerSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from 'antd'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface RegisterFormComponentProp {
  email: string | null
  verifyOTP: Function
}

const RegisterFormComponent: React.FC<RegisterFormComponentProp> = ({
  email,
  verifyOTP,
}) => {
  const navigate = useNavigate()

  const [role, setRole] = useState('user')
  const [registerUser, { isSuccess: registerSuccess }] =
    useRegisterUserMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'user',
    },
  })

  const onSubmit = async (data: RegisterForm) => {
    registerUser({
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      role: data.role,
      password: data.password,
      confirmPassword: data.password,
      email,
    })
  }

  const verifyOtpSubmit = async (data: RegisterForm) => {
    const { otp } = data
    verifyOTP({ email, otp })
  }

  return !registerSuccess ? (
    <form className='p-3 w-80' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue={undefined}
        name='firstname'
        control={control}
        render={({ field }) => (
          <div className='form-element d-flex flex-column justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
              Firstname
            </label>
            <input
              type='text'
              placeholder='Firstname'
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
          <div className='form-element d-flex flex-column justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
              Lastname
            </label>
            <input
              type='text'
              placeholder='Lastname'
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
        name='phone'
        control={control}
        render={({ field }) => (
          <div className='form-element d-flex flex-column justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
              Phone
            </label>
            <input
              type='text'
              placeholder='Phone'
              className='input'
              {...field}
            />
          </div>
        )}
      />
      {errors.phone && <span className='error'>{errors.phone.message}</span>}

      <Controller
        defaultValue={undefined}
        name='password'
        control={control}
        render={({ field }) => (
          <div className=' form-element d-flex flex-column  justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
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
          <div className='form-element d-flex flex-column  justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
              Confirm Password
            </label>
            <input
              type='password'
              placeholder='Confirm password'
              className='input py-1 px-2'
              {...field}
            />
          </div>
        )}
      />
      {errors.confirmPassword && (
        <span className='error'>{errors.confirmPassword.message}</span>
      )}
      <Controller
        defaultValue={undefined}
        name='role'
        control={control}
        render={({ field }) => (
          <Checkbox
            className='role-checkbox'
            {...field}
            checked={role === 'restaurant'}
            onChange={(e) => {
              const newValue = e.target.checked ? 'restaurant' : 'user'
              setRole(newValue)
              field.onChange(newValue)
            }}
          >
            {role}
          </Checkbox>
        )}
      />

      <button
        type='submit'
        className='bg-primary text-white fw-500 border-none  px-3 pt-1 pb-1 my-2 br-sm d-flex align-items-end w-100 d-flex justify-center'
      >
        Register
      </button>
    </form>
  ) : (
    <form onSubmit={handleSubmit(verifyOtpSubmit)}>
      <Controller
        defaultValue={undefined}
        name='otp'
        control={control}
        render={({ field }) => (
          <div className='d-flex flex-column  justify-between my-1'>
            <label htmlFor='' className='py-1 fw-600 text-primary'>
              Verify OTP
            </label>
            <input
              type='text'
              placeholder='OTP'
              className='input py-1 px-2'
              {...field}
            />
          </div>
        )}
      />
      <button
        type='submit'
        className='form-btn bg-primary text-white fw-500 border-none px-3 pt-1 pb-1 my-2 br-sm'
      >
        Complete register
      </button>
    </form>
  )
}

/*

*/

export default RegisterFormComponent
