import ClaimModel from "./ClaimModel";

class DocumentModel {
   id: number;
   name: string;
   text: string;
   claim:ClaimModel;
 
   constructor(id:number, name:string,text:string,claim:ClaimModel){
    this.id=id;
    this.name=name;
    this.text=text;
    this.claim=claim;
   }
 }
 
 export default DocumentModel;
 