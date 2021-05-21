//A super-simple framework to implement the basics of MVC, using only the properties you care about!
//By TinyTinfoil (https://github.com/TinyTinfoil)


class DeepLink {
  static DL = {
  //Array that holds *true* var values
  origin:{},
  //Array subset that holds reactive functions
  reactive:[],
  //Contains indexies of reactive declarations
  updateTable:{}
  };
  constructor(packedVar) {
    let [varName , varValue] = DeepLink.extractVarName(packedVar);
    DeepLink.DL.origin[varName] = varValue;
    DeepLink.DL.updateTable[varName] = [];
    this.watch(varName);
  }
  //watches variable changes
  watch(varName) {
    Object.defineProperty(globalThis, varName, {
      get: function () {
        return DeepLink.DL.origin[varName];
      },
      configurable: true,
      set: function (v) {
        DeepLink.DL.origin[varName] = v;
        for(let i of DeepLink.DL.updateTable[varName]){
          (DeepLink.DL.reactive[i])();
        };
      },
    });
  }
  /**
   * @param {Object} varNames The names of the DeepLinked variables that will trigger the function on change
   * @param {Function} func The lazily evaluated function that will run
   */
  static react(varNames,func){
    let index = DeepLink.DL.reactive.push(func) - 1;
    for(let v in varNames){
      DeepLink.DL.updateTable[v].push(index)
    }
  }
  /**
   * An internal function for extracting string repersentations of variable names, along with the variable itself
   * @param {Object} obj An object as the result of doing {AnyVar}
   * @returns {List} [the variable name, the variable value]
   */
  static extractVarName(obj) {
    return [Object.keys(obj)[0], obj[Object.keys(obj)[0]]];
  }
  /**
   * Removes the variable (both from DeepLink and from the window)
   * @param {Object} varNames the names of all the variables, encapuslated in an object
   */
  static remove(varNames) {
    for (let n in varNames){
      //removes variable
      delete DeepLink.DL.origin[n];
      delete DeepLink.DL.updateTable[n];
      delete globalThis[n];
    }
  }  
}





