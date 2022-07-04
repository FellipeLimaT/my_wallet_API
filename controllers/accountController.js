import db from "./mongo.js";
import joi from 'joi';
import { ObjectId } from "mongodb";

export async function allTransactions(req, res) {

    const user = res.locals.user;

    try {

        /* ENVIAR TRANSAÇÕES */

        const transactions = await db.collection("transactions").find({ userID: user._id }).toArray();
        res.send(transactions);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function addTransaction(req, res) {

    const user = res.locals.user;

    try {
        const transaction = req.body

        /* VALIDAÇÃO (JOI) */

        const transactionSchema = joi.object({
            entry: joi.string().required().pattern(new RegExp('^(credit|debit)$')),
            value: joi.number().required().min(0),
            description: joi.string().required()
        });

        const { error } = transactionSchema.validate(transaction);

        if (error) {
            return res.sendStatus(400);
        }

        /* ADICIONAR NO BANCO DE DADOS */

        transaction.userID = user._id;
        transaction.date = new Date();

        await db.collection("transactions").insertOne(transaction);
        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {

    try {
        const { _id } = req.body;

        /* APAGAR TRANSAÇÃO */

        await db.collection("transactions").deleteOne({ _id: ObjectId(_id) });
        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}