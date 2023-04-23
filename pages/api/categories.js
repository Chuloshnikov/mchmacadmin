import mongoose from 'mongoose';
import { mongooseConnect } from "@/lib/mongooseConnect";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const {method} = req;

    mongooseConnect();

    if(method === 'POST') {
        const {name} = req.body;
        const categoryDoc = await Category.create({name});
        res.json(categoryDoc);
    }
}