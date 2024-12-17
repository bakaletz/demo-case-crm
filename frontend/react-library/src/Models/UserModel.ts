import { stat } from "fs";

class UserModel {
   id: number;
   firstName: string;
   lastName: string;
   email?:string;
   phone?:string;
 
   constructor(id:number, firstName:string,lastName:string,email:string,phone:string){
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.phone=phone;
   }
 }
 
 export default UserModel;
 