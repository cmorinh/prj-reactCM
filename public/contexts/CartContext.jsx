import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [content, setContent] = useState([]);

    // Cargar el carrito desde localStorage al iniciar
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Actualizar `content` cada vez que `cart` cambie
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => {
                const products = data.filter(item => cart.includes(item.id));
                setContent(products);
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error);
            });
    }, [cart]); // Dependencia cart: actualiza la lista cuando se modifica el carrito

    const addToCart = (id) => {
        setCart(prevCart => {
            if (!prevCart.includes(id)) {
                const updatedCart = [...prevCart, id];
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar en localStorage
                return updatedCart;
            }
            return prevCart; // Evita duplicados
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item !== id));

        setCart(prevCart => {
            const updatedCart = prevCart.filter(cartItem => cartItem !== id);
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
