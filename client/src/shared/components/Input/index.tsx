import React from 'react'
import { IInput } from '@/shared/models'
import { eyeOpen, eyeClosed } from '@/shared/media'
import styles from './style.module.scss'

const InputComponent: React.FC<IInput> = ({
  type,
  placeholder,
  icon,
  label,
  id,
  name,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(true)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const showSuffix = type === 'password'

  return (
    <div className='position-relative w-60 text-center'>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <button className='position-absolute top-1 right-1 border-none bg-transparent'>
          <img src={icon} alt='icon' />
        </button>
      )}
      <input
        className={styles.input}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        {...rest}
      />
      {showSuffix && (
        <img
          src={showPassword ? eyeOpen : eyeClosed}
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  )
}

export default InputComponent
