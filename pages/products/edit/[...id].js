import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductsForm from '@/components/ProductsForm';

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/api/products?id=${id}`).then(response => {
        setProductInfo(response.data);
      })
    }, [id])

  return (
    <Layout>
        <h1>Edit Product</h1>
        {productInfo && <ProductsForm {...productInfo}/>}
        
    </Layout>
  )
}

export default EditProductPage;