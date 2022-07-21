module.exports = {
    // Get all users
    getData(req, res, model) {
        model.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }
}