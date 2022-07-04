import db from "./mongo.js";
import joi from 'joi';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    
    try {
        const user = req.body;

        /* VALIDAÇÃO (JOI) */

        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required().min(6)
        });

        const { error } = userSchema.validate(user);

        if (error) {
            return res.sendStatus(400);
        }

        /* VERIFICAÇÃO DUPLICIDADE */

        const emailExist = await db.collection("users").findOne({ email: user.email });

        if (emailExist) {
            return res.sendStatus(409);
        }

        /* CRIPTOGRAFAR SENHA */

        user.password = bcrypt.hashSync(user.password, 10);

        /* GERAR TOKEN */

        user.token = uuid();

        /* ADICIONAR NO BANCO DE DADOS */

        await db.collection("users").insertOne(user)
        res.sendStatus(201);


    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function loginToken(req, res) {

    const user = res.locals.user;

    try {

        delete user.password;
        delete user.token;
        delete user._id;

        res.send(user)

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


export async function loginEmail(req, res) {

    try {
        const login = req.body;

        /* VALIDAÇÃO (JOI) */

        const userSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required().min(8)
        });

        const { error } = userSchema.validate(login);

        if (error) {
            return res.sendStatus(400);
        }

        /* VERIFICAR NO BANCO DE DADOS */

        const user = await db.collection("users").findOne({ email: login.email });
        
        if (!user) {
            return res.sendStatus(401);
        }
        
        const passwordCompare = bcrypt.compareSync(login.password, user.password);

        if (!passwordCompare) {
            return res.sendStatus(401);
        }

        /* ENVIO DOS DADOS */

        delete user.password;
        delete user._id;

        res.send(user)

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}