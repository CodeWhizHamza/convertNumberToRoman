const Values = {
    unit: 1,
    tens: 2,
    hundred: 3,
    thousand: 4,
};
interface ISpecialSymbols {
    4: string;
    9: string;
}
interface INormalSymbols {
    1: string;
    5: string;
}
interface IRomanSymbols {
    unit: {
        special: ISpecialSymbols;
        normal: INormalSymbols;
    };
    tens: {
        special: ISpecialSymbols;
        normal: INormalSymbols;
    };
    hundred: {
        special: ISpecialSymbols;
        normal: INormalSymbols;
    };
    thousand: {
        special: ISpecialSymbols;
        normal: INormalSymbols;
    };
}
type SpecialSymbolKey = keyof ISpecialSymbols;
type ParseType = 'unit' | 'tens' | 'hundred' | 'thousand';

const RomanSymbols: IRomanSymbols = {
    unit: {
        special: { 4: 'IV', 9: 'IX' },
        normal: { 1: 'I', 5: 'V' },
    },
    tens: {
        special: { 4: 'XL', 9: 'XC' },
        normal: { 1: 'X', 5: 'L' },
    },
    hundred: {
        special: { 4: 'CD', 9: 'CM' },
        normal: { 5: 'D', 1: 'C' },
    },
    thousand: {
        special: { 4: '', 9: '' },
        normal: { 1: 'M', 5: '' },
    },
};

const splitInDigits = (number: number) =>
    number
        .toString()
        .split('')
        .map((n) => Number(n));
const repeat = (str: string, times: number) => {
    let result = '';
    for (let i = 0; i < times; i++) result += str;
    return result;
};
const getDigit = (value: number, digits: number[]) => {
    if (digits.length < value) return 0;
    const index = digits.length - value;
    return digits[index];
};
const isSpecialCase = (digit: number) => digit === 4 || digit === 9;
const parseSpecialCase = (
    digit: SpecialSymbolKey,
    map: ISpecialSymbols,
): string => map[digit];
const parseNormalCase = (digit: number, map: INormalSymbols) => {
    let romanDigit = '';
    if (digit >= 5) {
        romanDigit += map[5];
        digit -= 5;
    }
    return romanDigit + repeat(map[1], digit);
};
const parseRoman = (placeValue: ParseType, digits: number[]) => {
    const { special, normal } = RomanSymbols[placeValue];

    const digit = getDigit(Values[placeValue], digits);
    if (isSpecialCase(digit)) {
        const key = digit as SpecialSymbolKey;
        return parseSpecialCase(key, special as ISpecialSymbols);
    }
    return parseNormalCase(digit, normal);
};
const parseThousand = (digits: number[]): string => {
    return parseRoman('thousand', digits);
};
const parseHundred = (digits: number[]): string => {
    return parseRoman('hundred', digits);
};
const parseTens = (digits: number[]): string => {
    return parseRoman('tens', digits);
};
const parseUnit = (digits: number[]): string => {
    return parseRoman('unit', digits);
};
const getInRomans = (number: number) => {
    const digits = splitInDigits(number);
    const numberInRomans =
        parseThousand(digits) +
        parseHundred(digits) +
        parseTens(digits) +
        parseUnit(digits);
    return numberInRomans;
};

function solution(number: number): string {
    return getInRomans(number);
}

console.log(solution(4));
console.log(solution(5));
console.log(solution(1));
console.log(solution(1200));
console.log(solution(1990));
console.log(solution(2008));
console.log(solution(1444));
console.log(solution(144));
