export interface User {
    firstName:string;
    lastName:string;
    userAddress:string;
    userEmail:string;
    userContact:string | number;
    id?:string;
}