var Values = {
    unit: 1,
    tens: 2,
    hundred: 3,
    thousand: 4
};
var RomanSymbols = {
    unit: {
        special: { 4: 'IV', 9: 'IX' },
        normal: { 1: 'I', 5: 'V' }
    },
    tens: {
        special: { 4: 'XL', 9: 'XC' },
        normal: { 1: 'X', 5: 'L' }
    },
    hundred: {
        special: { 4: 'CD', 9: 'CM' },
        normal: { 5: 'D', 1: 'C' }
    },
    thousand: {
        special: { 4: '', 9: '' },
        normal: { 1: 'M', 5: '' }
    }
};
var splitInDigits = function (number) {
    return number
        .toString()
        .split('')
        .map(function (n) { return Number(n); });
};
var repeat = function (str, times) {
    var result = '';
    for (var i = 0; i < times; i++)
        result += str;
    return result;
};
var getDigit = function (value, digits) {
    if (digits.length < value)
        return 0;
    var index = digits.length - value;
    return digits[index];
};
var isSpecialCase = function (digit) { return digit === 4 || digit === 9; };
var parseSpecialCase = function (digit, map) { return map[digit]; };
var parseNormalCase = function (digit, map) {
    var romanDigit = '';
    if (digit >= 5) {
        romanDigit += map[5];
        digit -= 5;
    }
    return romanDigit + repeat(map[1], digit);
};
var parseRoman = function (placeValue, digits) {
    var _a = RomanSymbols[placeValue], special = _a.special, normal = _a.normal;
    var digit = getDigit(Values[placeValue], digits);
    if (isSpecialCase(digit)) {
        var key = digit;
        return parseSpecialCase(key, special);
    }
    return parseNormalCase(digit, normal);
};
var parseThousand = function (digits) {
    return parseRoman('thousand', digits);
};
var parseHundred = function (digits) {
    return parseRoman('hundred', digits);
};
var parseTens = function (digits) {
    return parseRoman('tens', digits);
};
var parseUnit = function (digits) {
    return parseRoman('unit', digits);
};
var getInRomans = function (number) {
    var digits = splitInDigits(number);
    var numberInRomans = parseThousand(digits) +
        parseHundred(digits) +
        parseTens(digits) +
        parseUnit(digits);
    return numberInRomans;
};
function solution(number) {
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
