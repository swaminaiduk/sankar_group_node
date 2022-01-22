export const generateUniqueNumber = (min = 1, max = 99999999) => {
    return String(Math.floor((Math.random() * (max - min + 1) + min))).padStart(8, '0');
}