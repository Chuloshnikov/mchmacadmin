import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';

import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

const Products = () => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    })
  }, [])

  return (
    <Layout>
        <Link 
        className='bg-gray-800 rounded-md text-white py-1 px-2 inline-block hover:scale-105 duration-300' 
        href={'/products/new'}
        >
          Add new product
        </Link>
        <table className='basic mt-2'>
            <thead>
                <tr>
                  <td>Product name</td>
                  <td></td>

                </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.title} </td>
                  <td>
                    <Link href={`/products/edit/${product._id}`}>
                    <BsPencilSquare/>
                      <span>Edit</span>
                    </Link>
                    <Link href={`/products/delete/${product._id}`}>
                    <BsFillTrashFill/>
                      <span>Delete</span>
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    </Layout>
  )
}

export default Products;