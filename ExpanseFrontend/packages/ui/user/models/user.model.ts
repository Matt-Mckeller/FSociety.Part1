// todo?

import { JwtAuthData } from "expanse.ui/auth"
import { RoleInterface, SessionInterface, UserInterface } from "../types"

// User model class
export class User implements Partial<UserInterface> {
  id?: number

  fullName?: string

  email?: string

  phone?: string

  role?: RoleInterface

  session?: SessionInterface

  lastLogIn?: string

  createdAt?: string

  updatedAt?: string

  constructor(user?: {
    id: number
    fullName: string
    active: boolean
    email: string
    phone?: string
    lastLogIn: string
    createdAt: string
    updatedAt: string
    sessions?: { expires: number | string; createdAt: number | string }
    // agreements?: any[],
    role?: any
  }) {
    this.id = undefined
    this.fullName = ""
    this.email = ""
    this.phone = ""
    this.role = undefined
    this.session = undefined
    this.lastLogIn = "" // timestamp
    this.createdAt = "" // timestamp
    this.updatedAt = "" // timestamp
    if (user) {
      this.id = user?.id
      this.fullName = user?.fullName
      this.phone = user?.phone
      this.email = user?.email
      this.session = user?.sessions
      this.lastLogIn = user?.lastLogIn
      this.createdAt = user?.createdAt
      this.role = user?.role
    }
  }

  static createUserFromJwtResponse(jwtResponse: JwtAuthData): User {
    /* tslint:disable */
    const { user: jwtUser } = jwtResponse
    const userConstruct: any = { ...jwtUser }
    userConstruct.sessions = {
      expires: jwtResponse.exp,
      createdAt: jwtResponse.iat,
    }
    const user = new User(userConstruct)

    /* tslint:e enable */
    return user
  }
}
