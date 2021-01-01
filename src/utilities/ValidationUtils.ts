import Log from './Logger';

export const isValidEmail = (email: string): boolean => {
  if (email) {
    const regex: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const string: string = String(email).toLowerCase().trim();
    const match =
      regex.test(string) && string.includes('.') && string.includes('@');
    return match;
  } else {
    return false;
  }
};

export enum PasswordHardeningLevels {
  zero = 0, // zero is an invalid password
  first = 1,
  second = 2,
  third = 3,
}

export const isHardenPassword = (
  psswd: string,
  passwordHardeningLevel?: PasswordHardeningLevels
): PasswordHardeningLevels | boolean => {

  const minLowerCaseCharCount = 6;
  const minUpperCaseCharCount = 2;
  const minSpecialCharCount = 2;
  const minNumberCharCount = 2;
  const minPasswordCharLength =
    minLowerCaseCharCount +
    minUpperCaseCharCount +
    minSpecialCharCount +
    minNumberCharCount;
  const maxPsswdLength = minPasswordCharLength * 3;
  const lowercaseCharRegex: RegExp = new RegExp(
    `(?=.{${minLowerCaseCharCount},${maxPsswdLength}}[a-z])`,
    'g'
  );
  const uppercaseCharRegex: RegExp = new RegExp(
    `(?=.{${minUpperCaseCharCount},${maxPsswdLength}}[A-Z])`,
    'g'
  );
  const numberCharRegex: RegExp = new RegExp(
    `(?=.{${minNumberCharCount},${maxPsswdLength}}[0-9])`,
    'g'
  );
  const specialCharRegex: RegExp = new RegExp(
    `(?=.{${minSpecialCharCount},${maxPsswdLength}}[~!@#$%^&*|\\/;:"'><,.?\-_=+{}()\`])`,
    'g'
  );
  const string: string = String(psswd || '').trim();

  const lowercaseMatch: boolean = lowercaseCharRegex.test(string);
  const uppercaseMatch: boolean = uppercaseCharRegex.test(string);
  const numberMatch: boolean = numberCharRegex.test(string);
  const specialMatch: boolean = specialCharRegex.test(string);

  const strongMatch: boolean =
    lowercaseMatch && uppercaseMatch && numberMatch && specialMatch;
  const mediumMatch: boolean =
    lowercaseMatch && uppercaseMatch && (numberMatch || specialMatch);
  const weakMatch: boolean = lowercaseMatch || uppercaseMatch;

  //Eval function
  const evaluate = (): PasswordHardeningLevels => {
    if (string.length < minPasswordCharLength) {
      // if less than required amount it should be an invalid password
      Log.debug("isHardenPassword: zero 0");
      return PasswordHardeningLevels.zero;
    } else if (weakMatch && !mediumMatch && !strongMatch) {
      //Weak Password
      Log.debug("isHardenPassword: first");
      return PasswordHardeningLevels.first;
    } else if (weakMatch && mediumMatch && !strongMatch) {
      //Medium Password
      Log.debug("isHardenPassword: second");
      return PasswordHardeningLevels.second;
    } else if (weakMatch && mediumMatch && strongMatch) {
      //Strong Password
      Log.debug("isHardenPassword: third");
      return PasswordHardeningLevels.third;
    } else {
      //Invalid Password
      Log.debug("isHardenPassword: zero 1");
      return PasswordHardeningLevels.zero;
    }
  };
  if (typeof passwordHardeningLevel === 'undefined') {
    //return password level
    return evaluate();
  } else {
    //Does the password meet this level??? return value boolean;
    return evaluate() >= passwordHardeningLevel;
  }
};
