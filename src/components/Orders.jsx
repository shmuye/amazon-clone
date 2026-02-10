
import { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider.jsx'
import Order from './Order.jsx' 
import { db } from '../firebase.js'
import { collection , query , orderBy, onSnapshot} from "firebase/firestore";



const Orders = () => {
  const [{ basket, user }, dispatch ] = useStateValue();
  const [ orders, setOrders ] = useState([])

  useEffect(() => {

    let unsubscribe ;

    if(user){
         
      const ordersRef = collection(db, 'users', user?.uid, 'orders');

      const ordersQuery = query(ordersRef, orderBy('created', 'desc'));
      
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    });
  } else {
      setOrders([])
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [user])    

  return (
    <div className="max-w-[1200px] mx-auto my-0 py-[30px] px-5">
        <h1 className='mb-[30px] text-[28px] font-medium'>Your Orders</h1>

        <div className='flex flex-col gap-[25px]'>
          {
            orders.map(order => (
            
              <Order order={order} />
              
            ))
          }
        </div>
    </div>
  )
}

export default Orders