module.exports = {
    // Get all users
    // getData(req, res, model) {
    //     model.find()
    //         .then((thoughts) => res.json(thoughts))
    //         .catch((err) => res.status(500).json(err));
    // }

    getData(req, res, modelAction, optionalErrorMessage, optionalSuccessMessage, optionalUpdate) {
        if (optionalUpdate) {
            modelAction
                .then((req) => {
                    // console.log(req._id.valueOf());
                    let originalData = req._id.valueOf();
                    // console.log(need);
                    return originalData;
                })
                .then((originalData) => {
                    // console.log(need);
                    return optionalUpdate;
                })
                .then((data) =>
                    !data
                        ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
                        : res.json({ message: optionalSuccessMessage, data })
                )
                .catch((err) => res.status(500).json(err));
        } else {
            modelAction
                .then((data) =>
                    !data
                        ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
                        : res.json({ message: optionalSuccessMessage, data })
                )
                .catch((err) => res.status(500).json(err));

        }
    }
}