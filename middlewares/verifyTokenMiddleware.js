import db from "./../controllers/mongo.js";

export default async function verifyToken(req, res, next) {

    try {
        const { authorization } = req.headers;

        const token = authorization?.replace('Bearer ', '');
        const user = await db.collection("users").findOne({ token });

        if (!token || !user) {
            return res.sendStatus(401);
        }

        res.locals.user = user;

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}