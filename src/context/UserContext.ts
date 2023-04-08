import { createContext } from 'react'
import { UserContextType } from '../types'

const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = UserContext.Provider

export default UserContext