const Picto = require("../models/picture");

exports.create = (req, res) => {
    const picture = new Picto({
        ...req.body
    });
    picture
        .save()
        .then(() => {
            res.status(201).json({message: "Picture created"});
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.getAll = (req, res) => {
    Picto
        .find()
        .then((pictos) => {
            res.status(200).json(pictos);
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.getOne = (req, res) => {
    Picto
        .findOne({
            id: req.params._id
        })
        .then((picto) => {
            res.status(200).json(picto);
        })
        .catch(error => console.error(error));
};

exports.modifyOne = (req, res) => {
    Picto
        .updateOne({
            _id: req.params._id,
            ...req.body
        })
        .then(() => {
            res.status(200).json({message: "Picture Updated"});
        })
        .catch(error => console.error(error));
};

exports.deleteOne = (req,res) => {
    Picto
        .deleteOne({
            _id: req.params._id
        })
        .then(() => {
            res.status(200).jeson({message:"Picture deleted"});
        })
        .catch(error => console.error(error));
};