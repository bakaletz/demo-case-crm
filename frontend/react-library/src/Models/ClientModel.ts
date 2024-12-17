import { stat } from "fs";

class ClientModel {
   id: number;
   firstName: string;
   lastName: string;
   email?:string;
   phone?:string;
   contactInfo?:string;
   additionalInfo?:string;
   status:string;

 
   constructor(id:number, firstName:string,lastName:string,email:string,phone:string,contactInfo:string, additionalInfo:string,status:string){
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.phone=phone;
    this.contactInfo = contactInfo;
    this.additionalInfo = additionalInfo;
    this.status = status;
   }
 }
 
 export default ClientModel;
 