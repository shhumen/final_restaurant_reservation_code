import React from 'react'

export interface RenderIF {
  conditions: boolean | null
  renderElse?: React.ReactNode
  children?: React.ReactNode
}

export interface IFormElement {
  label?: string
  id?: string
  placeholder: string
  rest?: any[]
}

export interface IUserProfile {
  user: {
    _id: string
    email: string
    password: string
    confirmPassword: string
    active: boolean
    firstname: string
    lastname: string
    phone: string
    favoriteRestaurants: string[]
    role: string
    createdAt: string
  } | null
  expirationDate: string
  token: string
}

export interface Cuisine {
  _id: string
  cuisineName: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface IListCreate {
  listName: string
}

export interface RegisterRestaurantForm {
  firstname: string
  lastname: string
  email: string
  restaurantName: string
  phone: string
  password: string
  confirmPassword: string
  address: string
}
export interface RegisterForm {
  firstname: string
  lastname: string
  phone: string
  email: string
  role?: string
  password: string
  confirmPassword?: string
  otp?: string
}

export interface IERROR {
  message: string
  code: number
}

export interface IVisible {
  isVisible: boolean
}

export interface HeaderProps {
  variant: string
  isVisible: boolean
  isAuthenticated: boolean | null
}

export interface IInput extends IFormElement {
  icon?: string
  type?: any
  suffix?: any
  name: string
}

export interface IProp {
  children: React.ReactNode
  theme: string
}

export interface ISelect extends IFormElement {
  onChange?: (label: string[]) => void
  options: {
    value?: string
    label?: string
  }[]
  mode?: 'multiple' | 'tags'
}

export interface IDrawer {
  title: string
  children: React.ReactNode
  open: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  setOpen: Function
  button: string
  width?: string | number
}

export interface SliderSettings {
  dots?: boolean
  infinite?: boolean
  speed?: number
  slidesToShow?: number
  slidesToScroll?: number
  arrows?: boolean
  autoplay?: boolean
  autoplaySpeed?: number
  responsive?: Array<{
    breakpoint: number
    settings: SliderSettings
  }>
}

export interface IFavList {
  _id: string
  userId: string
  listName: string
  restaurants: string[]
  createdAt: string
  updatedAt: string
}

// export interface IRestaurant {
//   _id: string
//   restaurantName: string
//   description: string
//   address: {
//     city: string
//     street: string
//     _id: string
//   }
//   cuisines: { _id: string; cuisineName: string }[]
//   openingHours: {
//     day: string
//     openTime: string
//     closeTime: string
//     _id: string
//   }[]
//   features: string[]
//   promotions: any[]
//   paymentMethods: any[]
//   dietaryOptions: string[]
//   awards: any[]
//   acceptsYums: boolean
//   createdAt: string
//   reservations?: any[] // Update the type accordingly
//   menu?: any[] // Update the type accordingly
//   availableTimes?: any[] // Update the type accordingly
//   reviews: {
//     _id: string
//     userId: string
//     restaurantId: string
//     rating?: number
//     reviewText: string
//     createdAt: string
//   }[]
//   ratingsCount?: number
//   totalRating?: number
//   averageRating: number
// }

/*
 * import React, { ReactNode } from "react";

[
  {
    "_id": "662f5034fc38052a23785728",
    "restaurantId": "661bceb1b16fbcaaed3197fb",
    "menuDescription": [
      {
        "dishName": "Spagetti Shumennn salam",
        "dishPrice": "12$",
        "_id": "662f50f9147796937abfeea3"
      },
      {
        "dishName": "Ceaser Salad",
        "dishPrice": "12$",
        "_id": "662f50f9147796937abfeea4"
      },
      {
        "dishName": "Fetuccino",
        "dishPrice": "12$",
        "_id": "662f50f9147796937abfeea5"
      }
    ],
    "menuImages": [
      "http://shumen.etuttakvimi.com/footer.png"
    ]
  }
]

export interface ISelect extends IFormElement {
  onChange?: (label: string[]) => void;
  options: {
    value?: string;
    label?: string;
  }[];
  mode?: "multiple" | "tags";
}



export interface RenderIF {
  condition: boolean;
  renderElse?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IEmployee {
  key: string;
  name: string;
  surname: string;
  email: string;
  status: boolean;
  role: string;
  teams: string;
}

export interface IDailyReport {
  key: string;
  employee: string;
  projectName: string;
  createdDate: string;
  note: string;
}

export interface ButtonType {
  children?: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  rest?: any;
}

export interface IModal {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: Function;
  buttons?: Buttons[];
}

export interface IModals {
  isOpen: boolean;
  setIsOpen: Function;
  actionType?: string;
}

export interface IFilter {
  buttons: Buttons[];
  title: string;
  className: string;
}

interface Buttons extends ButtonType {
  label: string | ReactNode;
  onClick?: Function;
  text?: string;
}

export interface ActionButton {
  icon: "detail" | "edit" | "delete" | "password";
  to?: string;
  onClick?: VoidFunction;
}

export interface ITextEditor {
  content: string;
  onChange: (value: string) => void;
}

 * 
 * 
 */
