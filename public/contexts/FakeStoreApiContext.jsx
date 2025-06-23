import { createContext, useContext, useState } from "react";

const FakeStoreApiContext = createContext();
const baseUrl = 'https://fakestoreapi.com/products/';

export function FakeStoreApiProvider({ children }) {

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

    return (
        <FakeStoreApiContext.Provider value={{ getFakeProduct, getFakeProducts }}>
            {children}
        </FakeStoreApiContext.Provider>
    );
}

export const useFakeStoreApi = () => useContext(FakeStoreApiContext);