import React, { useState } from 'react'
import Drawer_ from '@/shared/components/Drawer'
import { useModal } from '@/hooks'
import LoginFormComponent from '@/shared/components/LoginForm'
import RegisterFormComponent from '@/shared/components/RegisterForm'
import { useVerifyOTPMutation } from '@/redux/api/auth'

const Login: React.FC = () => {
  const [step, setStep] = useState<string>('login')
  const [email, setEmail] = useState<null>(null)

  const { open, setOpen } = useModal()
  const [verifyOTP] = useVerifyOTPMutation()

  return (
    <Drawer_
      width={'500px'}
      open={open}
      setOpen={setOpen}
      title={''}
      button={'Login'}
    >
      {step === 'login' && (
        <LoginFormComponent setEmail={setEmail} setStep={setStep} />
      )}
      {step === 'register' && (
        <RegisterFormComponent verifyOTP={verifyOTP} email={email} />
      )}
    </Drawer_>
  )
}

export default Login
