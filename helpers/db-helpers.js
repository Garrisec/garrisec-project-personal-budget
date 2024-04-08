// This modules check user input

// Empty value
exports.checkUserInputEmpty = (input) => {
    if (Object.keys(input).length === 0) {
        return false;
    } else {
        return true;
    }
}
