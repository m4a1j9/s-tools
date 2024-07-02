
export const integerNumberRegex = /^([+-]?([1-9]\d*)|0)$/i;
export const unsignedIntegerNumberRegex = /^(([1-9]\d*)|0)$/i;
export const negativeIntegerNumberRegex = /^(-([1-9]\d*)|0)$/i;

export const floatNumberRegex = /^(([+-]?(0(?!\d)|[1-9]\d*))\.?\d*)$/i;
export const unsignedFloatNumberRegex = /^((0(?!\d)|[1-9]\d*)\.?\d*)$/i;
export const negativeFloatingPointNumberRegex = /^(-(0(?!\d)|[1-9]\d*)\.?\d*)$/i;

export const exponentialNumberFormatRegex = /^((([+-]?(0(?!\d)|[1-9]\d*))\.?\d*)([eE])(-?([1-9]\d*)|0))$/i;