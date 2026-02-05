import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { products } from './products.js'

const uploadProducts = async () => {
   for(const product of products) {
    await setDoc(doc(db,'products', product.id), {
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
        image: product.image
    })
   }

   console.log("Products uploaded")
}

uploadProducts()