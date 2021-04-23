//A super-simple framework to implement the basics of MVC, using only the properties you care about!
//Array that holds *true* var values
DL = {};
//Array subset that holds recomputation for rerenders of templates strands
DL._template = {};

class DeepLink {
  varNames;
  elemId;
  elem;
  varValues;
  constructor(varName, elem, varValue) {
    DL[varName] = varValue;
    elemId = varName + "-DL";
    DL._template[this.elemId].render = () => {
      //something lazy load here
    };
  }

  //sync with html edits
  htmlSync(event = "input") {
    this.elem.addEventListener(event, DL[this.varname]);
  }
  //sync with javascript edits
  //watches variable changes
  sync(varName) {
    Object.defineProperty(this, varName, {
      get: function () {
        return DL[varName];
      },
      set: function (v) {
        DL[varName] = v;
        DL._template[elemId].render();
      },
    });
  }
  /**
   * @param {Object} obj An object as the result of doing {{AnyVar}}
   * @returns {List} [the variable name, the variable value]
   */
  static extractVarName(obj) {
    return [Object.keys(obj)[0], obj[Object.keys(obj)[0]]];
  }
  //turns a string into a documentFragment
  static toFrag(str) {
    return range.createContextualFragment(str);
  }
  destroy() {}
}

function noEditDL(strings, ...keys) {
  string = "";
  strings.forEach((element, i) => {
    string += element;
    if ((keys[i] ?? false) !== false) {
      if (keys[i] instanceof Object) {
        //turns variable name into string
        [varName, value] = DeepLink.extractVarName(keys[i]);
        string += value;
      } else string += keys[i];
    }
  });
  return string;
}

test = 0;
console.log({ test });
f = noEditDL`testing, should put out zero: ${{ test }}`;
f;
function usereditabledeeplink(
  starttag,
  variable,
  endtag = starttag,
  contenteditable = false
) {
  return `<${starttag} contenteditable=${contenteditable}>${variable}</${endtag}>`;
}

function deepLink(variable, element) {
  return new Proxy(variable, {
    set: function (target, prop, value, receiver) {
      element[prop] = value;
      return true;
    },
    deleteProperty: function (target, property) {
      if (property != "Proxy")
        console.log("Please delete the object reference by first revoking it");
      return false;
    },
    get: function (target, property, receiver) {
      return element[prop];
    },
  });
}

function removeDeepLink(variable, element) {
  //removes element
  element.parentNode.removeChild(element);
  //removes variable
  delete DL[variable];
  console.log("You can now delete the object reference");
}
