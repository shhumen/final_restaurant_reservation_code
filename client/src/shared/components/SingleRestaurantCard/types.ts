interface IAddress {
  _id: string
  city: string
  street: string
}

interface IOpeningHour {
  day: string
  openTime: string
  closeTime: string
}

export interface MenuItem {
  _id: string
  restaurantId: string
  menuDescription: MenuDescription[]
  menuImages: string[]
}

export interface MenuDescription {
  dishName: string
  dishPrice: string
  dishDescription: string
  _id: string
}

interface IRestaurant {
  menu: MenuItem[]
  reviews: any
  _id: string
  restaurantName: string
  description: string
  address: IAddress
  cuisines: string[]
  openingHours: IOpeningHour[]
  table: any[]
  images: any[]
  features: any[]
  promotions: any[]
  paymentMethods: any[]
  dietaryOptions: any[]
  awards: any[]
  acceptsYums: boolean
  createdAt: string
  averageRating: number
}

export default IRestaurant
