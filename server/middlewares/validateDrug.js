function validateDrug(req, res, next) {
    const { name, dosage, card, pack, perDay } = req.body;

    let errorMessage = null;

    if (!name || name.length <= 5) {
        errorMessage = "Drug name must be more than 5 characters";
    } else if (!/^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/.test(dosage)) {
        errorMessage = "Dosage must follow format: XX-morning,XX-afternoon,XX-night";
    } else if (!card || Number(card) <= 1000) {
        errorMessage = "Card must be more than 1000";
    } else if (!pack || Number(pack) <= 0) {
        errorMessage = "Pack must be more than 0";
    } else if (!perDay || Number(perDay) <= 0 || Number(perDay) >= 90) {
        errorMessage = "Per Day must be between 1 and 89";
    }

    if (errorMessage) {
        // Trả về JSON + status lỗi để Ajax bên client bắt được trong error()
        return res.status(400).json({ error: errorMessage });
    }

    next();
}

module.exports = validateDrug;
