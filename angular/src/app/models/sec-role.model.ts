import { SecPrivilege } from "./sec-privilege.model";
import { SecUser } from "./sec-user.model";


export class SecRole {
/**
id: 
*/
id?: number;
/**
name: 
*/
name?: string;
/**
SecPrivilege Relation: 
*/
secPrivileges?: SecPrivilege[];
/**
SecUser Relation: 
*/
secUsers?: SecUser[];
 	
  }
