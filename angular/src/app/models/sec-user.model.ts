import { SecRole } from "./sec-role.model";


export class SecUser {
/**
id: 
*/
id?: number;
/**
username: 
*/
username?: string;
/**
email: 
*/
email?: string;
/**
password: 
*/
password?: string;
/**
pin: 
*/
pin?: string;
/**
SecRole Relation: 
*/
secRoles?: SecRole[];
 	
  }
