import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import Swal from 'sweetalert2';

const Categories = () => {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);

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
        const data = {
          name, 
          parentCategory,
          properties: properties.map(p => ({
            name:p.name,
            values:p.values.split(','),
          }))
        };
        if (editedCategory) {
          data._id = editedCategory._id;
          await axios.put('/api/categories',  data);
          setEditedCategory(null);
        } else {
          await axios.post('/api/categories',  data);
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    const editCategory = (category) => {
      setEditedCategory(category);
      setName(category.name);
      setParentCategory(category.parent?._id)
    }
    
    const deleteCategory = (category) => {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name} category?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d55',
        cancelButtonColor: '#1F2937',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        if (result.isConfirmed) {
          const {_id} = category;
          await axios.delete(`/api/categories?_id=${_id}`);
          fetchCategories();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }

    function addProperty() {
      setProperties(prev => {
        return [...prev, {name:'',values:''}];
      });
    }
    function handlePropertyNameChange(index,property,newName) {
      setProperties(prev => {
        const properties = [...prev];
        properties[index].name = newName;
        return properties;
      });
    }
    function handlePropertyValuesChange(index,property,newValues) {
      setProperties(prev => {
        const properties = [...prev];
        properties[index].values = newValues;
        return properties;
      });
    }
    function removeProperty(indexToRemove) {
      setProperties(prev => {
        return [...prev].filter((p,pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    }
    
  return (
    <Layout>
        <h1>Categories</h1>
        <label>{editedCategory 
        ? `Edit category ${editedCategory.name}` 
        : 'Create new category'}
          </label>
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
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <button className='btn-primary'>Save</button>
        </form>
        <table className='basic mt-4'>
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td>Edit/Delete</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
                  <tr key={category.name}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      <button 
                      onClick={() => editCategory(category)}
                      className='btn-primary mr-1'
                      >
                        Edit
                      </button>
                      <button 
                      onClick={() => deleteCategory(category)}
                      className='btn-primary'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default Categories;