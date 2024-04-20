let numberChoice = document.getElementById("number_choice");

let passwordLength = document.getElementById("password_length");
passwordLength.addEventListener("input", () => {
	numberChoice.innerHTML = passwordLength.value;
	if (passwordLength.value > 12) {
		passwordLength.style.accentColor = "#437571";
	} else {
		passwordLength.style.accentColor = "#f76c79";
	}
});

function UpdateRangeColor() {
	if (passwordLength.value > 12) {
		passwordLength.style.accentColor = "#437571";
	}
}
if (passwordLength.value > 12) {
	passwordLength.style.accentColor = "#437571";
}

let generatePassword = document.getElementById("generate_button");
generatePassword.addEventListener("click", () => {
	GeneratePassword();
});

let password = document.getElementById("password");

let copyButton = document.getElementById("copy_button");
copyButton.addEventListener("click", CopyPassword);

function CopyPassword() {
	navigator.clipboard.writeText(password.textContent);
	password.style.color = "#437571";
}

function GeneratePassword() {
	let charactersToInclude = "";
	let regexParts = "^";
	let lowercase = document.getElementById("lowercase");
	let uppercase = document.getElementById("uppercase");
	let numbers = document.getElementById("numbers");
	let symbols = document.getElementById("symbols");
	let strongPassword = "";
	let passwordIsValid = false;

	if (
		!lowercase.checked &&
		!uppercase.checked &&
		!numbers.checked &&
		!symbols.checked
	) {
		passwordLength.value = 16;
		numberChoice.innerHTML = 16;
		charactersToInclude =
			"abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!\";#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
		regexParts =
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[2-9])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_{|}~]).{16,}$";
	} else {
		if (lowercase.checked) {
			charactersToInclude += "abcdefghijkmnpqrstuvwxyz";
			regexParts += "(?=.*[a-z])";
		}
		if (uppercase.checked) {
			charactersToInclude += "ABCDEFGHJKLMNPQRSTUVWXYZ";
			regexParts += "(?=.*[A-Z])";
		}
		if (numbers.checked) {
			charactersToInclude += "23456789";
			regexParts += "(?=.*[2-9])";
		}
		if (symbols.checked) {
			charactersToInclude += "!\";#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
			regexParts += "(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_{|}~])";
		}
		regexParts += `.{${passwordLength.value},}$`;
	}

	while (!passwordIsValid) {
		strongPassword = "";
		for (let i = 0; i < passwordLength.value; i++) {
			const pos = Math.floor(Math.random() * charactersToInclude.length);
			strongPassword += charactersToInclude[pos];
		}
		passwordIsValid =
			new RegExp(regexParts).test(strongPassword) &&
			!hasSequentialCharacters(strongPassword);
	}
	console.log(regexParts);
	console.log(passwordIsValid);
	console.log(charactersToInclude);
	password.textContent = strongPassword;
	console.log(strongPassword);
	console.log(strongPassword.length);
      UpdateRangeColor();
}

function hasSequentialCharacters(str) {
	for (let i = 0; i < str.length - 1; i++) {
		if (str.charCodeAt(i) + 1 === str.charCodeAt(i + 1)) {
			return true;
		}
	}
	return false;
}
 

