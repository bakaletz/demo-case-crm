import UserModel from "./UserModel";
import ClientModel from "./ClientModel";

class ClaimModel {
   id: number;
   name: string;
   description?: string;
   deadline?:string;
   status?:string;
   user?:UserModel;
   client?: ClientModel;
 
   constructor(id:number, name:string,description:string,deadline:string,status:string, user:UserModel, client:ClientModel){
    this.id=id;
    this.name=name;
    this.description=description;
    this.deadline=deadline;
    this.status=status;
    this.user=user;
    this.client=client;
   }
 }
 
 export default ClaimModel;
 