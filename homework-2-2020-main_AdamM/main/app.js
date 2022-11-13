function addTokens(input, tokens){

    if (typeof input == 'object') {
		if (!(input instanceof String)) {
			throw new Error('Invalid input');
		}
	} else {
		if (typeof input != 'string') {
			throw new Error('Invalid input');
		}
	}
    if (input.length < 6) {
		throw new Error('Input should have at least 6 characters');
	}
	if (typeof tokens != 'object' || !(tokens instanceof Array)) {
		throw new Error('Invalid array format');
	}
    tokens.forEach((tkn) => {
        if (typeof tkn.tokenName != 'string') {
			throw new Error('Invalid array format');
		}
		if (Object.keys(tkn).length > 1 || tkn.hasOwnProperty('tokenName') == false) {
			throw new Error('Invalid array format');
		}
	});

    if (!input.includes('...')) {
		return input;
	}

	tokens.forEach((tkn) => {
		input = input.replace('...', `\${${tkn.tokenName}}`);
	});

	return input;
}

const app = {
    addTokens: addTokens
}

module.exports = app;