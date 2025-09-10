type Color = {
  red: number;
  green: number;
  blue: number;
};

const getColourGradient = (
  color1: Color,
  color2: Color,
  percentage: number
) => {
  const resultRed = color1.red + percentage * (color2.red - color1.red);
  const resultGreen = color1.green + percentage * (color2.green - color1.green);
  const resultBlue = color1.blue + percentage * (color2.blue - color1.blue);

  const resultColor: Color = {
    red: resultRed,
    green: resultGreen,
    blue: resultBlue,
  };

  return resultColor;
};

// bg-gray-200 background-color: rgb(229 231 235);
export const ArmourStartColor: Color = {
  red: 229,
  green: 231,
  blue: 235,
};

// bg-gray-500 background-color: rgb(107 114 128);
export const ArmourEndColor: Color = {
  red: 107,
  green: 114,
  blue: 128,
};

// bg-blue-200 background-color: rgb(191 219 254);
export const BodyStartColor: Color = {
  red: 191,
  green: 219,
  blue: 254,
};

// bg-blue-500 background-color: rgb(59 130 246);
export const BodyEndColor: Color = {
  red: 59,
  green: 130,
  blue: 246,
};

export const loop100 = (
  color1: Color,
  color2: Color,
  prefix?: 'from' | 'to'
) => {
  const result = [];

  for (let i = 0; i <= 100; i++) {
    const { red, green, blue } = getColourGradient(color1, color2, i / 100);
    const rgb = `[rgb(${red},${green},${blue})]`;
    const taildwindString = prefix ? `${prefix}-${rgb} to-80%` : `bg-${rgb}`;
    result.push({ [i]: taildwindString });
  }

  const stringify = JSON.stringify(result);
  const replacedChars = stringify.replace(/[{}]/g, '');
  // const addStartBracket = replacedChars.substring(0, 0) + 'const a = {' + replacedChars.substring(0);
  // const addEndBracket = addStartBracket.substring(0, addStartBracket.length) + '} as const;' + addStartBracket.substring(addStartBracket.length);

  console.log(replacedChars);
};

// loop100(ArmourStartColor, ArmourEndColor);
// loop100(BodyStartColor, BodyEndColor);
