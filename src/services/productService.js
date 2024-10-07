// src/services/productService.js
import supabase from '../supabaseClient';

/**
 * Fetch all products from the database.
 */
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      throw new Error('Error fetching products: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Add a new product to the database.
 * @param {Object} product - The product to add.
 */
export const addProduct = async (product) => {
  try {
    const { data, error } = await supabase.from('products').insert([product]);

    if (error) {
      throw new Error('Error adding product: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Update an existing product in the database.
 * @param {Number} id - The ID of the product to update.
 * @param {Object} updates - The updated fields of the product.
 */
export const updateProduct = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw new Error('Error updating product: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Delete a product from the database.
 * @param {Number} id - The ID of the product to delete.
 */
export const deleteProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error('Error deleting product: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
