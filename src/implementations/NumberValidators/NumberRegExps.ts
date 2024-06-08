
export const integerNumberRegex = /^([+-]?([1-9]\d*)|0)$/gi;
export const unsignedIntegerNumberRegex = /^(([1-9]\d*)|0)$/gi;
export const negativeIntegerNumberRegex = /^(-([1-9]\d*)|0)$/gi;

export const floatNumberRegex = /^(([+-]?(0(?!\d)|[1-9]\d*))\.?\d*)$/gi;
export const unsignedFloatNumberRegex = /^((0(?!\d)|[1-9]\d*)\.?\d*)$/gi;
export const negativeFloatingPointNumberRegex = /^(-(0(?!\d)|[1-9]\d*)\.?\d*)$/gi;


export const exponentialNumberFormatRegex = /^((([+-]?(0(?!\d)|[1-9]\d*))\.?\d*)([eE])(-?([1-9]\d*)|0))$/gi;