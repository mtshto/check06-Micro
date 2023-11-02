let erros = []

function ValidationContract() {
    erros = []
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.lengh <= 0)
        errors.push({
            message: message
        })
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if(!value || value.lengh < min)
    errors.push({
        message: message
    })
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if(!value || value.lengh > max)
    errors.push({
        message: message
    })
}

ValidationContract.prototype.isValid = () => {
    return erros.length == 0;
}

module.exports = ValidationContract