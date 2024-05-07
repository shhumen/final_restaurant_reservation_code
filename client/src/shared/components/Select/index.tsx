import { location, search } from '@/shared/media'
import { Select, SelectProps } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectComponentShcema } from '@/validations'
import { useGetAddressesQuery } from '@/redux/api/restaurants'
import { useNavigate } from 'react-router-dom'

interface selectForm {
  location: string
  restaurant: string
}

interface addressProps {
  address: {
    _id: string
    street: string
  }
}

const SelectComponent: React.FC = () => {
  const navigate = useNavigate()
  const { data: addresses } = useGetAddressesQuery(null)

  const options: SelectProps['options'] = addresses?.map(
    (address: addressProps) => ({
      value: address?.address?._id,
      label: address?.address?.street,
    })
  )

  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<selectForm>({
    resolver: zodResolver(SelectComponentShcema),
  })

  const onSubmit = () => {
    const { location, restaurant } = getValues()
    if (!addresses) {
      return
    }
    const selectedAddress = addresses.find(
      (address: any) => address?.address?._id === location
    )
    const streetName = selectedAddress?.address?.street || ''
    const searchText = restaurant || '' // Get the search text

    navigate(`/restaurants?street=${streetName}&search=${searchText}`)
  }

  return (
    <div className='search py-2 px-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='searchContainer d-flex br-md'>
          <div className='selectLocation d-flex justify-center align-items-center'>
            <img
              src={location}
              alt='location'
              style={{ marginRight: 8, marginLeft: 8, color: '#666' }}
            />
            <Controller
              defaultValue={undefined}
              name='location'
              control={control}
              render={({ field }) =>
                addresses?.length > 0 ? (
                  <Select
                    style={{
                      width: 220,
                      height: '50px',
                      fontSize: '25px',
                      outline: 'none',
                      border: 'none',
                    }}
                    {...field}
                    options={options}
                    allowClear
                    showSearch
                    placeholder='Near me, exact address, station...'
                  />
                ) : (
                  <span className='text-gray'>Loading addresses...</span>
                )
              }
            />

            {errors.location && (
              <span className='error'>{errors.location.message}</span>
            )}
          </div>
          <div className='searchRestaurant d-flex justify-space-between align-items-center w-100'>
            <div className='d-flex align-items-center'>
              <img src={search} alt='search_icon' />
              <Controller
                defaultValue={undefined}
                name='restaurant'
                control={control}
                render={({ field }) => (
                  <input
                    type='text'
                    placeholder='Search restaurants'
                    {...field}
                  />
                )}
              />
              {errors.restaurant && (
                <span className='error'>{errors.restaurant.message}</span>
              )}
            </div>
            <button
              className='find-table-btn border-none p-2 br-sm fw-500'
              type='submit'
            >
              Find Table
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SelectComponent
