// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import { mongooseConnect } from "@/lib/mongooseConnect";
import Product from "@/models/Product";




export default async function handler(req, res) {

    const {method} = req;

    mongooseConnect();

    if (method === 'GET') {
      if (req.query?.id) {
        res.json(await Product.findOne({_id: req.query.id}))
      } else {
        const products = await Product.find();
        res.json(products);
      }  
    }

    if(method === 'POST') {

      const { title, description, price, images } = req.body;

      const productDoc = await Product.create({
        title, description, price, images,
      });
      res.json(productDoc);
    }

    if(method === 'PUT') {
      const { title, description, price, images, _id} = req.body;
      await Product.updateOne({_id}, {title, description, price, images});
      res.json(true);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        await Product.deleteOne({_id: req.query?.id});
        res.json(true);
      }
    }
  }