import { getAuth, validatePassword } from "firebase/auth";

const status = await validatePassword(getAuth(), passwordFromUser);
    if (!status.isValid) {
    const needsLowerCase = status.containsLowercaseLetter !== true;
    const needsUpperCase = status.containsUppercaseLetter !== true;
    const needsNumber = status.containsDigit !== true;
    }
