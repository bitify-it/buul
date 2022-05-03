export class DataUtils {

    static authArrayToHashmap(input) : Map<String,boolean>{
        let map = new Map();
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            map.set(element.authority,true);           
        }
        return map;
    }
    
    static removeSameCommonElements(first: any[], second: any[]){
        /*Rimuovo elementi uguali dal first che sono presenti nel second */
        var result = new Map(first.map(i => [i.id, i]));
        for (let i = 0; i < second.length; i++) {
        result.delete(second[i].id);
        }
        return Array.from( result.values() );
    }
}
