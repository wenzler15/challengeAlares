function validateFieldsMiddleware(fieldNames) {
    return function (req, res, next) {
        const missingFields = fieldNames.filter(fieldName => !req.body[fieldName]);

        if (missingFields.length === 0) {
            next();
        } else {
            res.status(400).json({ error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
        }
    };
}

module.exports = validateFieldsMiddleware;