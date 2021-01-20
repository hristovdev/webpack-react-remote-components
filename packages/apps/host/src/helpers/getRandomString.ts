import getRandomInteger from "./getRandomInteger";

const getRandomString = () => {
  const nameLength = getRandomInteger(3, 10);

  let result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < nameLength; i++) {
    const letterPosition = getRandomInteger(0, characters.length - 1);
    let letter = characters.charAt(letterPosition);

    if (i === 0) {
      letter = letter.toLocaleUpperCase();
    }

    result += letter;
  }

  return result;
};

export default getRandomString;
