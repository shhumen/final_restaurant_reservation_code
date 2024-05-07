import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import IRestaurant from '../SingleRestaurantCard/types'

interface GeocodedPlacemark {
  address: string
  coordinates: string[]
}

interface IYandexMap {
  addresses: string[]
  restaurant?: IRestaurant
  width?: string
  height?: string
}

const YandexMap: React.FC<IYandexMap> = ({
  addresses,
  restaurant,
  width,
  height,
}) => {
  const [placemarks, setPlacemarks] = useState<GeocodedPlacemark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const geocodeAddresses = async () => {
      try {
        const geocodedPlacemarks = await Promise.all(
          addresses?.map(async (address: string) => {
            const response = await fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=9dc13c3e-fc3e-4646-a11e-77fdb342e622&format=json&geocode=${encodeURIComponent(
                address
              )}`
            )
            const data = await response.json()
            const coordinatesStr =
              data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
                ?.Point.pos
            const [longitude, latitude] = coordinatesStr.split(' ').map(Number)
            return { address, coordinates: [latitude, longitude] }
          })
        )

        setPlacemarks(geocodedPlacemarks)
      } catch (error) {
        console.error('Error fetching geocoded placemarks:', error)
      } finally {
        setLoading(false)
      }
    }

    geocodeAddresses()
  }, [addresses])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <YMaps query={{ lang: 'en_US' }}>
      <Map
        defaultState={{ center: [40.402683, 49.870413], zoom: 12 }}
        width={width || '100%'}
        height={height || '400px'}
      >
        {placemarks.map((placemark, index) => (
          <Placemark
            key={index}
            geometry={placemark.coordinates}
            properties={{
              hintContent: placemark.address,
              balloonContent: restaurant?.restaurantName || placemark?.address,
              balloonPanelMaxMapArea: 0,
              draggable: 'true',
              preset: 'islands#blueStretchyIcon',
              openEmptyBalloon: true,
            }}
            options={{
              preset: 'islands#icon',
              iconColor: 'rgb(0, 102, 92)',
            }}
          />
        ))}
      </Map>
    </YMaps>
  )
}

export default YandexMap
