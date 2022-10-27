const textarea = document.querySelector(".textarea");
const btnResult = document.querySelector(".btnResult");
const btnClear = document.querySelector(".btnClear");
const btnCopy = document.querySelector(".btnCopy");
const textareaResult = document.querySelector(".textareaResult");

class Main {
  inputValue = "";
  readyValues = "";

  constructor() {}

  // functions

  // генерация сеттеров из нескольких значений типа:
  // isLoad: boolean = false;
  generate(manyValues) {
    this.clearReadyValues();
    let arrValues = manyValues.split(";");

    // массив не пустых строк
    let _arrValues = [];
    arrValues.forEach((value) => {
      if (value.length) {
        _arrValues.push(value);
      }
    });

    _arrValues.map((value) => {
      if (value.length > 0) {
        this.addStringInnerHtml(this.generateSetter(value));
      }
    });

    return this.readyValues;
  }

  generateSetter(value) {
    let splitArr = value.split(":");
    let prop = splitArr[0].trim();
    let type = splitArr[1].split("=")[0].trim();
    let propBigChars =
      prop.split("")[0].toUpperCase() + prop.slice(1, prop.length);
    let setName = "set" + propBigChars;

    return `${setName}(value: ${type}) {this.${prop} = value;}`;
  }

  addStringInnerHtml(value) {
    this.readyValues = this.readyValues + "  " + value;
  }

  clearReadyValues() {
    this.readyValues = "";
  }

  // setters

  setValue(value) {
    this.inputValue = value;
  }
}

let main = new Main();

btnResult.addEventListener("click", () => {
  main.setValue(textarea.value);
  textareaResult.value = "";

  if (main.inputValue) {
    let result = main.generate(main.inputValue);

    textareaResult.value = result;
  }
});

btnClear.addEventListener("click", () => {
  textarea.value = "";
  textareaResult.value = "";
});

btnCopy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(main.readyValues)
    .then(() => {
      // Получилось!
      console.log("yes");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});
