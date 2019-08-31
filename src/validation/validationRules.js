const hebrewRegex = new RegExp("^[א-תa-zA-Z\\s\"'\\-]*$");
const hebrewNumRegex = new RegExp("^[0-9\\א-תa-zA-Z\\s\"'\\-]*$");
const heAlphaNumSpecielCharsRegex = new RegExp("^[a-zA-Z\u0590-\u05fe\\d\\n ,.'\"()-]+$");
const dateRegex = new RegExp("^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$");

const rules = {
    uniqueId: {
        getMessage(field, args) {
            return 'Field ' + field + ' already exists';
        },
        validate(value, args) {
            return !args.productsIds.includes(Number(value)) && args.id !== Number(value);
        }
    },
    positiveNumber: {
        getMessage(field, args) {
            return "Field " + field + " can't be negative number";
        },
        validate(value, args) {
            return value > 0;
        }
    },
    dateValidation: {
        getMessage(field, args) {
            return "Field " + field + " not valid";
        },
        validate(value, args) {
            return dateRegex.test(value);
        }
    }
};

// export an 'install' function.
export default (Validator) => {
    Object.keys(rules).forEach(rule => {
        Validator.extend(rule, rules[rule]);
    });
};