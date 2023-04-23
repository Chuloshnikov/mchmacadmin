import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { BsUpload } from 'react-icons/bs';

const ProductsForm = ({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    images: existingImages,
}) => {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const createProduct = async (e) => {
        e.preventDefault();
        const data = {title, description, price, images};
        if (_id) {
            //create
            await axios.put('/api/products', {...data, _id});
        } else {
            //update
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    if(goToProducts) {
      router.push('/products');
    };

    const uploadImages = async (e) => {
      const files = e.target?.files;
      if(files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        for (const file of files) {
          data.append('file', file);
        }
        const res = await axios.post('/api/upload', data);
        setImages(oldImages => {
          return [...oldImages, ...res.data.links]
        });
        setIsUploading(false);
      }
    }

  return (
    <form onSubmit={createProduct}>
        <label>Product name</label>
        <input 
            type="text" 
            placeholder='product name...' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        <label>Photos</label>
        <div className='mb-2 flex flex-wrap gap-2'>
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24">
              <img src={link} alt="productImg" className='rounded-lg'/>
            </div>
          ))}
          {isUploading && (
            <div className='h-24'>
              Uploading...
            </div>
          )}
          <label className='w-24 h-24 border text-center 
          flex items-center justify-center text-sm cursor-pointer 
          gap-1 text-gray-500 rounded-lg bg-gray-200'
          >
            <BsUpload/>
            <span>Upload</span>
            <input 
            onChange={uploadImages}
            type="file" 
            className='hidden'
            />
          </label>
          
        </div>
        <label>Description</label>
        <textarea
            placeholder='description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        <label>Price (in USD)</label>
        <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        <button type="submit" className='btn-primary'>Save</button>
    </form>
  )
}

export default ProductsForm;