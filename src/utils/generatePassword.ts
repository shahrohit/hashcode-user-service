function generatePassword(length: number) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:<>,.?/";
  const allCharacters = upperCase + lowerCase + numbers + specialChars;

  // Ensure the password includes at least one of each character type
  const password = [
    upperCase[Math.floor(Math.random() * upperCase.length)],
    lowerCase[Math.floor(Math.random() * lowerCase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the remaining characters with random selections from allCharacters
  for (let i = password.length; i < length; i++) {
    password.push(
      allCharacters[Math.floor(Math.random() * allCharacters.length)],
    );
  }

  // Shuffle the password to avoid predictable patterns
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

export default generatePassword;
