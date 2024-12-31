'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'

const products = [
  {
    id: 1,
    name: "Minimalist Diamond Necklace",
    price: 10.12,
    mainImage: "https://i.pinimg.com/564x/59/d0/b1/59d0b18ff31067212b7f2245eb3aac45.jpg",
    overlayImages: [
      "https://i.etsystatic.com/38097059/r/il/a2d4cf/4401625722/il_794xN.4401625722_5t4a.jpg",
      "https://i.etsystatic.com/38097059/r/il/5070b5/4449015065/il_794xN.4449015065_ew5y.jpg",
      "https://i.etsystatic.com/38097059/r/il/d14d10/4449015053/il_794xN.4449015053_9zsx.jpg"
    ]
  },
  {
    id: 2,
    name: "The 2in1 Golden Heart Necklace",
    price: 10.12,
    mainImage: "https://crescentjewelrydesigns.com/cdn/shop/files/image_e0de44dd-e0d3-4a66-80db-f7e0a81fac1b.png?v=1682556714&width=493",
    overlayImages: [
      "https://crescentjewelrydesigns.com/cdn/shop/files/7B8909F5-1190-4F33-9043-BE88244EDBC0.png?v=1693492608&width=823",
      "https://crescentjewelrydesigns.com/cdn/shop/files/image_15acf4f1-00a7-4b7d-bdb8-1cec324fb6a2.png?v=1693492608&width=823",
      "https://crescentjewelrydesigns.com/cdn/shop/files/image_15e32cbe-2e03-4056-92b3-179b333a1235.png?v=1693492608&width=823"
    ]
  },
  {
    id: 3,
    name: "Sapphire Teardrop Necklace",
    price: 10.12,
    mainImage: "https://i.pinimg.com/736x/6e/04/7c/6e047cc604120a28e8156efd49f2f2e6.jpg",
    overlayImages: [
      "https://i.pinimg.com/736x/5c/e6/3a/5ce63ac6c98a9d2c678e0b2209e95d1a.jpg",
      "https://i.pinimg.com/736x/b8/f0/d1/b8f0d1e442c2f6deef9af7a8dd47a6af.jpg",
      "https://i.pinimg.com/736x/db/2d/81/db2d8171ebec0dba1b3ff722d8c813c7.jpg"
    ]
  },
  {
    id: 4,
    name: "Moonstone Bracelets/Necklace",
    price: 10.12,
    mainImage: "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/6.Braclets_figure2_3_x1280.jpg?v=1572409770",
    overlayImages: [
      "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/11.Chain_3_1_x1280.jpg?v=1572409789",
      "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/6.Braclets_figure2_2_2fa42c51-62a1-4251-9ef8-a824c3740a27_x1280.jpg?v=1574725655",
      "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/DC_LIM_ECM_001_HOL1564_2-2_x1280.jpg?v=1574725655"
    ]
  }
]

export default function JewelryShop() {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentImageIndices, setCurrentImageIndices] = useState({})

  useEffect(() => {
    let intervalId
    if (hoveredProduct !== null) {
      intervalId = setInterval(() => {
        setCurrentImageIndices(prev => ({
          ...prev,
          [hoveredProduct]: (prev[hoveredProduct] + 1) % products[hoveredProduct].overlayImages.length
        }))
      }, 2000)
    }
    return () => clearInterval(intervalId)
  }, [hoveredProduct])

  const addToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      images: [product.mainImage, ...product.overlayImages], // Include all images
      quantity: 1
    }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id)
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    toast.success(`${product.name} added to cart!`)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <div className="min-h-screen bg-white text-gray-600 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Jewelry Collection</h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="relative overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={product.mainImage} alt={product.name} className="w-full h-64 object-cover" />
              <AnimatePresence>
                {hoveredProduct === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={product.overlayImages[currentImageIndices[index] || 0]}
                      alt={`${product.name} - View ${currentImageIndices[index] + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 flex justify-between items-center"
                initial={{ y: '100%' }}
                animate={{ y: hoveredProduct === index ? 0 : '100%' }}
              >
                <span className="text-gray-800 font-semibold">{product.name}</span>
                <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
              </motion.div>
              <motion.button
                className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: hoveredProduct === index ? 1 : 0, scale: hoveredProduct === index ? 1 : 0.8 }}
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="/shop"
            className="inline-block text-orange-600 text-2xl font-bold font-prospectus hover:text-orange-700 transition-colors duration-300"
          >
            Shop Collection →
          </a>
        </motion.div>
      </div>
    </div>
  )
}