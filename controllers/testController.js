module.exports = {

    getData(req, res, modelAction, optionalErrorMessage, optionalSuccessMessage, optionalUpdate) {
        if (optionalUpdate) {
            modelAction
                .then(function (response) {
                    // console.log(response);
                    console.log("req", response._id);
                    console.log("req.body.userId: " + req.body.userId);
                    // console.log("optional", optionalUpdate)

                    return optionalUpdate
                        .then((data) =>
                            !data
                                ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
                                : res.json({ message: optionalSuccessMessage, data })
                        )
                })
                .catch((err) => res.status(500).json(err));
        } else {
            modelAction
                .then((data) =>
                    !data
                        ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
                        : res.json(!optionalSuccessMessage ? data : { message: optionalSuccessMessage, data })
                )
                .catch((err) => res.status(500).json(err));

        }
    }




    // Get all users
    // getData(req, res, model) {
    //     model.find()
    //         .then((thoughts) => res.json(thoughts))
    //         .catch((err) => res.status(500).json(err));
    // }

    // getData(req, res, modelAction, optionalErrorMessage, optionalSuccessMessage, optionalUpdate) {
    //     if (optionalUpdate) {
    //         modelAction
    //             .then(function (dbData) {
    //                 // console.log(response);
    //                 console.log("req", dbData);
    //                 console.log("req.body.userId: " + req.body.userId);
    //                 console.log("optional", optionalUpdate)

    //                 return optionalUpdate
    //                 // .then(function (data) {
    //                 //     console.log("optionalUpdated", data)
    //                 //     res.json(data);
    //                 // }).catch(function (err) {
    //                 //     console.log("optionalUpdated", err)
    //                 //     res.status(500).json(err);
    //                 // })
    //             })
    //             // let id = res._id.valueOf();
    //             // User.findOneAndUpdate(
    //             //     { _id: req.body.userId },
    //             //     { $addToSet: { thoughts: } },
    //             //     { runValidators: true, new: true }
    //             // )
    //             // console.log(req._id.valueOf());
    //             // let originalData = req._id.valueOf();
    //             // console.log(need);
    //             // optionalUpdate;
    //             // return response;


    //             // .then((originalData) => {
    //             //     // console.log(need);
    //             //     return optionalUpdate;
    //             // })
    //             .then((data) =>
    //                 console.log(data)
    //                 // !data
    //                 //     ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
    //                 //     : res.json({ message: optionalSuccessMessage, data })
    //             )
    //             .catch((err) => res.status(500).json(err));
    //     } else {
    //         modelAction
    //             .then((data) =>
    //                 !data
    //                     ? res.status(404).json({ message: optionalErrorMessage || 'Could not find data with that ID' })
    //                     : res.json(!optionalSuccessMessage ? data : { message: optionalSuccessMessage, data })
    //             )
    //             .catch((err) => res.status(500).json(err));

    //     }
    // }
}