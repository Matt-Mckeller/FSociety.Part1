// import { Role as EdLinkRole } from "@edlink/typescript"; // Likely will incorporate these somehow
export enum Role {
  ExpanseGuest = 'ExpanseGuest', // Role given to all users including unauthenticated users
  ExpanseUser = 'ExpanseUser', // Authenticated users
  ExpanseAdmin = 'ExpanseAdmin',
  ExpanseParent = 'ExpanseParent',

  // EdLink roles
  Student = 'Student',
  Teacher = 'Teacher',
}
