import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    setIsLoading(true);
    const result = await axios.get('products');
    setProducts(await result.data);
    setIsLoading(false);
  }

  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.id === product.id
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Añadido ${newItem.name} al carrito`,toastOptions)

    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'peso': product.peso,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Añadido ${product.name} al carrito`, toastOptions)
    }

  }

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

  useEffect(() => {
    fetchProducts();
  },[]);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  },[cart])



  return (
    <MainLayout>
      <div className='row'>
        <div className='col-lg-7'>
          {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                  <p style={{transform: 'translate(0, 10px)'}}>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p style={{transform: 'translate(0, 10px)', fontSize: '14px'}}>CANTIDAD: {product.peso}</p>
                      <p style={{transform: 'translate(0, 10px)', fontSize: '14px'}}>PRECIO: {product.price}€ </p>
                  </div>

                </div>
              )}
            </div>}
       
        </div>
        <div className='col-lg-5'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>Nombre</td>
                      <td>Precio</td>
                      <td>Gramos</td>
                      <td>Cant.</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}€</td>
                      <td>{cartProduct.peso}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}€</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Borrar</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Aportación: {totalAmount}€</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                  Aportar ahora
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>


        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage