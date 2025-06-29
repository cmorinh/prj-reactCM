import { createContext, useContext, useState, useEffect } from "react";

const MockupApiContext = createContext();
const baseUrl = 'https://685879c1138a18086dfb0aba.mockapi.io/store/api/product/';

export function MockupApiProvider({ children }) {
    const [products, setProducts] = useState([]);

    const getProduct = async (id) => {
        try 
        {
            const response = await fetch(`${baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            data.origin = 'oulet';
            setProducts(data);

            return data;
        } catch (error) {
            console.error('Error fetching fake products:', error);
           return [];
        }
    };

    const getProducts = async () => {
        try 
        {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            data.forEach(product => {
                product.origin = 'oulet';
            });
            setProducts(data);

            return data;
        } catch (error) {
            console.error('Error fetching fake products:', error);
           return [];
        }
    };

    const addProduct = async (product) => {
        try 
        {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            setProducts([...products, data]);

            return true;
        } catch (error) {
            console.error('Error adding product:', error);
            return false;
        }
    };

    const updateProduct = async (product) => {
        try
        {
            const response = await fetch(`${baseUrl}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            setProducts(products.map(p => p.id === product.id ? data : p));

            return true;
        } catch (error) {
            console.error('Error updating product:', error);
            return false;
        }
    };

    const deleteProduct = async (id) => {
        try
        {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            setProducts(products.filter(p => p.id !== id));

            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    };  

    return (
        <MockupApiContext.Provider value={{ products, getProduct, getProducts, addProduct, updateProduct, deleteProduct }}>
            {children}
        </MockupApiContext.Provider>
    );
}

export const useMockupApi = () => useContext(MockupApiContext);