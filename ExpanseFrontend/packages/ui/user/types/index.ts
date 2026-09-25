import { User } from ".."

export * from "./interfaces"

export type UserProviderProps = {
  children: React.ReactNode;
  accountNavRoute: string;
};

export type UserContextProps = {
  // todo, is there a better way to provide accountNavRoute when the value may differ from application to application?
  // this may not be a url in mobile apps? thinking about a url or route provider but thats app specific?
  accountNavRoute: string;

  user: User | null;
  initializeUser: (user: User) => void;
  updateUser: (userUpdates: Partial<User>) => void;
  clearUser: () => void;
};
