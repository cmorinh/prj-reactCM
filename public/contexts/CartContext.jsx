import { createContext, useContext, useState, useEffect } from "react";
import { useMockupApi } from "../contexts/MockupApiContext"
import { useFakeStoreApi } from "../contexts/FakeStoreApiContext"

const CartContext = createContext();

export function CartProvider({ children }) {
    const {getFakeProduct, getFakeProducts} = useFakeStoreApi();
    const {product, products, getProduct, getProducts} = useMockupApi();   
    const [cart, setCart] = useState([]);
    const [content, setContent] = useState([]); 

    // Cargar el carrito desde localStorage al iniciar
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Actualizar `content` cada vez que `cart` cambie
    useEffect(() => {
        const fetchContents = async () => {
            let contents = [];
            
            for (const item of cart) {
                try {
                    if(item.origin === 'oulet'){
                        contents.push(await getProduct(item.id));
                    } else {
                        contents.push(await getFakeProduct(item.id));
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            
            setContent(contents);
        };

        if (cart.length > 0) {
            fetchContents();
        } else {
            setContent([]);
        }
    }, [cart]);

    const addToCart = (id, origin) => {
        setCart(prevCart => {
            // Verificar si el producto ya existe en el carrito
            const exists = prevCart.some(item => item.id === id && item.origin === origin);
            
            if (!exists) {
                const updatedCart = [...prevCart, {id, origin}];
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar en localStorage
                return updatedCart;
            }
            return prevCart; // Evita duplicados
        });
    };

    const removeFromCart = (id, origin) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(cartItem => !(cartItem.id === id && cartItem.origin === origin));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const countCart = () => {
        return cart.length;
    };

    return (
        <CartContext.Provider value={{ cart, content, addToCart, removeFromCart, countCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
