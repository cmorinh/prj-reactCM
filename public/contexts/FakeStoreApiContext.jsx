import { createContext, useContext, useState, useEffect } from "react";

const FakeStoreApiContext = createContext();
const baseUrl = 'https://fakestoreapi.com/products/';

export function FakeStoreApiProvider({ children }) {
    const [products, setProducts] = useState([])

    // Cargar productos automáticamente al inicializar
    useEffect(() => {
        getFakeProducts();
    }, []);

    const getFakeProducts = async () => {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            data.forEach(product => {
                product.origin = 'fake';
            });
            setProducts(data);

            return data;
        } catch (error) {
            console.error('Error fetching fake products:', error);
           return [];
        }
    };

    const getFakeProduct = async (id) => {
        try {
            const response = await fetch(`${baseUrl}${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.origin = 'fake';
            return data;
        } catch (error) {
            console.error('Error fetching fake product:', error);
           return null;
        }
    };

    const searchFakeProducts = (text) => {  
        if (!text || text.trim() === '') return [];
        if (products.length === 0) return [];
        
        return products.filter((product) => 
            product?.title?.toLowerCase().includes(text.toLowerCase()) ||
            product?.description?.toLowerCase().includes(text.toLowerCase()) ||
            product?.category?.toLowerCase().includes(text.toLowerCase())
        );
    };

    return (
        <FakeStoreApiContext.Provider value={{ getFakeProduct, getFakeProducts, searchFakeProducts }}>
            {children}
        </FakeStoreApiContext.Provider>
    );
}

export const useFakeStoreApi = () => useContext(FakeStoreApiContext);