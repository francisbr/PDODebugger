import {Component, OnInit} from '@angular/core';
import {StringParameter} from '../../models/string-parameter';

@Component({
  selector: 'app-string-parser',
  templateUrl: './string-parser.component.html',
  styleUrls: ['./string-parser.component.css']
})
export class StringParserComponent implements OnInit {

  rawString = '';
  convertedString = '';

  stringVariables: StringParameter[] = [];

  constructor() {}

  ngOnInit() {

    this.onStringChange();
  }

  onStringChange() {
    let variables = this.rawString.match(/:[a-zA-Z]+/g);
    if (variables == null) {
      variables = [];
    }

    const newParams: StringParameter[] = [];
    variables.forEach((variable) => {
      const newStringParameters: StringParameter = {
        type: 'string',
        literal: variable,
        value: variable.toString().replace(/:/g, '')
      };

      this.pushVariableNoDuplicate(newParams, newStringParameters);
    });
    this.updateParametersArray(newParams);

    this.updateParsedString();
  }

  updateParsedString() {

    this.convertedString = this.rawString.replace(/\\n/g, '').replace(/\\r/g, '') + ' ';

    this.stringVariables.forEach((variable) => {
      const reg = new RegExp('(' + variable.literal + ')(\\s|;|\\))', 'g');

      if (variable.type === 'string') {
        this.convertedString = this.convertedString.replace(reg, '"' + variable.value.toString() + '"$2');
      } else if (variable.type === 'int') {
        this.convertedString = this.convertedString.replace(reg, variable.value.toString() + '$2');
      } else if (variable.type === 'bool') {
        this.convertedString = this.convertedString.replace(reg, variable.value.toString().toUpperCase() + '$2');
      }
    });

    this.convertedString = this.convertedString.trim();
    if (this.convertedString.substr(this.convertedString.length - 1) !== ';' && this.convertedString !== '') {
      this.convertedString += ';';
    }
  }

  clearValue(parameter: StringParameter) {
    parameter.value = '';
    this.updateParsedString();
  }

  updateParametersArray(newParameters: StringParameter[]) {
    const newArray: StringParameter[] = [];

    for (let i = 0; i < newParameters.length; i++) {
      let toAdd = null;
      for (let j = 0; j < this.stringVariables.length; j++) {
        if (this.stringVariables[j].literal === newParameters[i].literal) {
          toAdd = this.stringVariables[j];
          break;
        }
      }

      if (toAdd != null) {
        newArray.push(toAdd);
      } else {
        newArray.push(newParameters[i]);
      }
    }

    this.stringVariables = newArray;
  }

  pushVariableNoDuplicate(array: StringParameter[], element: StringParameter) {
    let add = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i].literal === element.literal) {
        add = false;
        break;
      }
    }

    if (add) {
      array.push(element);
    }
  }
}
