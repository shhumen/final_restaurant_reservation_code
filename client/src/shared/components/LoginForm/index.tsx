import React from 'react'
import { useLoginMutation } from '@/redux/api/auth'
import { useGetUsersQuery } from '@/redux/api/users'
import { LoginForm } from '@/shared/models'
import { loginSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

interface LoginFormProps {
  setStep: Function
  setEmail: Function
}
const LoginFormComponent: React.FC<LoginFormProps> = ({
  setEmail,
  setStep,
}) => {
  const [login] = useLoginMutation()
  const { data: users } = useGetUsersQuery(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async () => {
    getValues()
    const emails = users?.map((user: any) => user.email)
    setEmail(getValues().email)
    if (emails && emails.includes(getValues().email)) {
      await login(getValues())
      setStep('login')
    } else {
      toast.info('You dont have an account')
      setStep('register')
    }
  }

  return (
    <form className='w-100 mx-2' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue={undefined}
        name='email'
        control={control}
        render={({ field }) => (
          <div className='form-element d-flex flex-column my-2'>
            <label htmlFor='email' className='py-1 fw-600 text-primary'>
              Email
            </label>
            <input
              type='text'
              placeholder='email'
              className='input'
              {...field}
            />
          </div>
        )}
      />
      {errors.email && <span className='error'>{errors.email.message}</span>}
      <Controller
        defaultValue={undefined}
        name='password'
        control={control}
        render={({ field }) => (
          <div className='form-element d-flex flex-column  my-1'>
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

      <Link to='restaurant-register'>
        <p className='my-2 px-2 py-2 w-60 text-primary fw-600 register-restaurant'>
          Register my restaurant
        </p>
      </Link>
      <button
        type='submit'
        className='form-btn bg-primary text-white fw-500 border-none px-3 pt-1 pb-1 my-2 br-sm'
      >
        Continue
      </button>
    </form>
  )
}

export default LoginFormComponent
