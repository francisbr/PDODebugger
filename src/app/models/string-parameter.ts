export interface StringParameter {
  literal: string;
  type: 'string'|'int'|'bool';
  value: string|number;
}
