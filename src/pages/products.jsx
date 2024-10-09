import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setIsDrawerOpen(true);
    };

    const handleConfirm = () => {
        console.log("Cart confirmed with products:", cart);
        setIsDrawerOpen(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="products-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="product-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <h3>{truncateText(product.title, 30)}</h3>
                            <p>{truncateText(product.description, 100)}</p>
                            <p className='product-price'>${product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <div>No products found</div>
                )}
            </div>

            <div className={`slider-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={() => setIsDrawerOpen(false)}>Close</button>
                {cart.length > 0 && (
                    <div className="product-details">
                        {cart.map((item, index) => (
                            <div key={index} className="drawer-item">
                                <img src={item.image} alt={item.title} className="drawer-image" />
                                <h3 className="drawer-title">{truncateText(item.title, 20)}</h3>
                                <p className="drawer-price">${item.price}</p>
                            </div>
                        ))}
                        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
