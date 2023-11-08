let erros = [];

function ValidationContract() {
    erros = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        erros.push({
            message: message
        });
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        erros.push({
            message: message
        });
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        erros.push({
            message: message
        });
};

ValidationContract.prototype.isValid = () => {
    return erros.length == 0;
};

module.exports = ValidationContract;
