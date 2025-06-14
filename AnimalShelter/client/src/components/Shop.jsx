import React, { useState, useEffect , useRef } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import styles from "./shop.module.css"

const Shop = () => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [products,setProducts] = useState([]);
    const [cart, setCart] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);


const paymentSectionRef = useRef(null);

// Function to add product to the cart
const addToCart = (product) => {
  setCart([...cart, product]);
  setTotalPrice(totalPrice + product.price);
};


const removeFromCart = (index) => {
  const updatedCart = [...cart];
  const itemPrice = updatedCart[index].price;
  updatedCart.splice(index, 1);
  setCart(updatedCart);
  setTotalPrice(totalPrice - itemPrice);
};



  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLoggedInUser(res.data.user); 

        axios.get("http://localhost:8000/api/product",{withCredentials:true})
        .then((res)=>{
          console.log(res.data)
          setProducts(res.data);
        })
        .catch((err)=>{
          console.log("Error fetching products",err)
        })
      })
      .catch((err) => {
        console.log("Unauthorized access:", err);
        navigate("/login"); // Redirect to login page if error
      });
  }, [navigate]);

  

 
  const handlePayment = (e) => {
    e.preventDefault();
    // Clear the payment form
    document.getElementById('bankName').value = '';
    document.getElementById('accountNumber').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('expiryDate').value = '';
    document.getElementById('cvv').value = '';

    setCart([]);
    setTotalPrice(0);
  
    
    alert('Payment successful!');
  };

  const scrollToPayment = () => {
    paymentSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.shopContainer}>
    {loggedInUser ? (
      <div>
        <div className="container mt-4">
          <div className="row">
            {products.map((oneproduct) => (
              <div className="col-md-4 mb-4" key={oneproduct._id}>
                <div className={styles.productCard}>
                  <h5 className={styles.productTitle}>{oneproduct.title}</h5>

                  <img
                    src={oneproduct.image}
                    alt={oneproduct.name}
                    className={styles.productImage}
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />

                  <p className={styles.productPrice}>{oneproduct.price} TND</p>

                  <button
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(oneproduct)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cartSidebar}>
          <h3>Shopping Cart</h3>
          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <p>{item.title}</p>
                <p>{item.price} TND</p>
                <button
                  className={styles.deleteBtn}
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cartDivider}></div>
          <div className={styles.cartTotal}>
            <h4>Total: {totalPrice} TND</h4>
          </div>
          <button
            className={styles.payBtn}
            onClick={scrollToPayment}
          >
            Proceed to Payment
          </button>
        </div>

        {/* Payment Check Section */}
        <div className={styles.paymentCheck} ref={paymentSectionRef}>
          <h3>Payment Information</h3>
          <div className={styles.bankLogo}>
            <img
              src="/pay.jpeg"
              alt="Bank Logo"
              className={styles.bankLogoImage}
            />
          </div>

          <form className={styles.paymentForm} onSubmit={handlePayment}>
            <div className={styles.formGroup}>
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                placeholder="Enter your bank name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                placeholder="Enter your account number"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter your card number"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="month" id="expiryDate" name="expiryDate" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="Enter your CVV"
                required
              />
            </div>

            <button type="submit" className={styles.payBtn}>
              Pay
            </button>
          </form>
        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )}
  </div>
);

};

export default Shop