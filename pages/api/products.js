// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import { mongooseConnect } from "@/lib/mongooseConnect";
import Product from "@/models/Product";




export default async function handler(req, res) {

    const {method} = req;

    mongooseConnect();

    if (method === 'GET') {
      const products = await Product.find();
      res.json(products);
    }

    if(method === 'POST') {

      const { title, description, price } = req.body;

      const productDoc = await Product.create({
        title, description, price,
      });
      res.json(productDoc);
    }

   
  }