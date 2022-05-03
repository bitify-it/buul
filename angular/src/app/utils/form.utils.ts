export class FormUtils {
    static getValidationMessage(userValidationField){
        let errorType=userValidationField.errors;
        if(errorType.required)
           return "Questo Campo è obbligatorio";
        if(errorType.email)
           return "Email non valida";
        return "Campo invalido"
      }
}
