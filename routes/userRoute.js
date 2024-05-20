const { VerifyTokenAuth } = require("./VerifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

router.put("/:id", VerifyTokenAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(CryptoJS.enc.Utf8);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;