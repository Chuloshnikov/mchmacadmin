import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';

const Categories = () => {

    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories = () => {
      axios.get('/api/categories').then(result => {
        setCategories(result.data);
      });
    }

    const saveCategory = async (e) => {
        e.preventDefault();
        await axios.post('/api/categories', {name, parentCategory});
        setName('');
        fetchCategories();
    }

  return (
    <Layout>
        <h1>Categories</h1>
        <label>New category name</label>
        <form onSubmit={saveCategory} className='flex gap-1'>
            <input 
            className='mb-0' 
            type="text" 
            placeholder={'Category name'} 
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <select className='mb-0'
            onChange={e => setParentCategory(e.target.value)}
            >
              <option value="">No parent category</option>
                {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
            </select>
            <button className='btn-primary'>Save</button>
        </form>
        <table className='basic mt-4'>
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
                  <tr key={category.name}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                  </tr>
              ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default Categories;