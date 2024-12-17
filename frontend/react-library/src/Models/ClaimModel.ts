import { stat } from "fs";

class ClaimModel {
   id: number;
   name: string;
   description?: string;
   deadline?:number;
   status?:string;
   user?:string;
   client?:string;
 
   constructor(id:number, name:string,description:string,deadline:number,status:string, user:string, client:string){
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
 