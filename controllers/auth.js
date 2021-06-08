const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// eslint-disable-next-line no-undef
const ENV = process.env;

exports.singup = (req, res) => {
    console.log("register enter ok");
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo : req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            console.log("type password", typeof user.password);
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => {
                    let messageError= "";
                    // console.log("error singup",error.errors);
                    if (error.errors.email) {
                        messageError += "Cette email existe déjà.";
                    }
                    if (error.errors.pseudo) {
                        messageError += " Ce peudo existe déjà.";
                    }
                    if (messageError !== "") {
                        res.status(400).json({ message : messageError });
                    } else {
                        res.status(400).json({ message : error });
                    }
                    res.status(500).json({error});
                });
        })
        .catch(error => res.status(500).json({ message : error }));
};

exports.login = (req, res) => {
    console.log("logo enter", req.body.username, req.body.password);
    //fonction interne de comparaison de mot de passe crypté
    const bcriptCompare = (user) => {
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                console.log("admin : user", user);
                res.status(200).json({
                    userId: user._id,
                    pseudo: user.pseudo,
                    email: user.email,
                    token: jwt.sign(
                        { userId: user._id },
                        ENV.RANDOM_TOKEN_SECRET,
                        { expiresIn: "1h" }
                    )
                });
            })
            .catch(error => res.status(500).json(error));
    };

    User.findOne({ pseudo: req.body.username})
        .then(user => {
            console.log("user",user);
            if (!user) {
                User.findOne({ email: req.body.userName})
                    .then(user => {
                        if(!user) {
                            return res.status(401).json({ error: "Utilisateur non trouvé !" });
                        }else {
                            bcriptCompare(user);
                        }

                    })
                    .catch(error => res.status(500).json(error));
            }else {
                bcriptCompare(user);
            }
        })
        .catch(error => res.status(500).json(error));
};

exports.getUser = (req, res) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId})
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: "Utilisateur non trouvé !" });
            }else {
                res.status(200).json({
                    userId: user._id,
                    pseudo: user.pseudo,
                    email: user.email,
                });
            }
  
        })
        .catch(error => res.status(500).json(error));
}; 