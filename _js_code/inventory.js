class Inventory {
      constructor() {
        this.inventory = new Map();
      }
      
/*has prüft ob item mit dem namen im inv ist */ 
      has(name){
        return this.inventory.has(name);
      }
/*get holt das mit namen aus inv raus */ 
      get(name){
         return this.inventory.get(name);
      }
/*holt alle items als array*/ 
      getItems(){
        return [...this.inventory.values()] 
      }
      
      getBestWeapon(){
      		let bestItem = null;
      		for (let [key, item] of this.inventory) {
    			if (item.isWaffe){
                	if(item.isGuteWaffe) {
                    	return item;
                    } 
                    if (!bestItem) {
                    	bestItem = item
                    } else {
                    	if (item.isMittlereWaffe && bestItem.isSchlechteWaffe){
                        	bestItem = item
                        }
                    }
                }
			}
            return bestItem
      }

      add(
              name,
              {
                  isWaffe=false,
                  isGuteWaffe = false, 
                  isSchlechteWaffe = false, 
                  isMittlereWaffe = false, 
                  wert=5,
                  anzahl = 1, 
                  regeneration =0,
                  isFrucht = false
              } = {}
            ){
               if (this.inventory.has(name)) {
                  const item = this.inventory.get(name)
                  item.anzahl += anzahl;
                  return item;
               }

               const item = {
                  name,
                  isGuteWaffe, 
                  isSchlechteWaffe, 
                  isMittlereWaffe, 
                  isWaffe,
                  wert,
                  anzahl, 
                  isFrucht
               }

               this.inventory.set(name, item);
               State.variables.inventoryItems.push(item);

               return item;
            }

/*remove löscht das item*/ 
      remove(name, anzahl = 1){
        const item = this.inventory.get(name);
         item.anzahl -= anzahl;

         if(item.anzahl <= 0) {
            this.inventory.delete(name);
            return null;
         }

         return item;
      }
      
      length(){
        return this.inventory.size
      }
  
}
