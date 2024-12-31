'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import "./css/Shop.css"

const products = [
    {
      id: 1,
      name: "Gold Chain Ring",
      price: 34.56,
      images: [
        "https://mamoriginals.com/cdn/shop/products/30-VIV1349_ctyzgx_dc2c6f50-79e1-43cf-a3a0-5a7121a8a038_1000x.jpg?v=1662046166",
        "https://mamoriginals.com/cdn/shop/products/31-VIV1354_sqrxgl_9527704d-9a4e-4e5b-b59e-ce9f0aee3045_600x.jpg?v=1662046166",
      ]
    },
    {
      id: 2,
      name: "Petite Travel Jewellery Box",
      price: 30.45,
      images: [
        "https://i.pinimg.com/564x/bf/61/71/bf6171b30dbe976c2147bf860de87c8a.jpg",
        "https://www.farrar-tanner.co.uk/media/catalog/product/7/5/75341_petitetaupe_2_1.jpg",
      ]
    },
    {
      id: 3,
      name: "Carazon Figure- Sterling Silver",
      price: 22.45,
      images: [
        "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/DC_LIM_CAM_001_HOL2476_1_2af34143-b2b6-4ad6-8d7a-7411105a2848_x1280.jpg?v=1572417927",
        "https://cdn.shopify.com/s/files/1/0075/4050/6671/products/DC_LIM_CAM_001_HOL3096_B_x1280.jpg?v=1573707585",
      ]
    },
    {
      id: 4,
      name: "Gold Chain set",
      price: 50.23,
      images: [
        "https://i.etsystatic.com/39066948/r/il/f0ba10/4826032362/il_794xN.4826032362_kvx4.jpg",
        "https://i.etsystatic.com/39066948/r/il/246a30/4874295039/il_794xN.4874295039_hp9r.jpg",
      ]
    },
    {
      id: 5,
      name: "Heart Anatomy Pendant ",
      price: 12.50,
      images: [
        "https://i.pinimg.com/736x/9d/94/68/9d9468a83a6a6bb809627688ed648379.jpg",
        "https://i.pinimg.com/736x/21/df/e9/21dfe934781b06a6379f8bb0c3f890d4.jpg",
      ]
    },
    {
      id: 6,
      name: "Wing Shell Tear Drop Pendant",
      price: 10.50,
      images: [
        "https://pristti.shop/cdn/shop/files/MG_8444.jpg?v=1692298363&width=600",
        "https://pristti.shop/cdn/shop/files/4L9A6804copy.jpg?v=1692298344&width=600",
      ]
    },
    {
      id: 7,
      name: "Paperclip Cable Chain",
      price: 9.30,
      images: [
        "https://i.etsystatic.com/21704808/r/il/4fddc4/4362093835/il_794xN.4362093835_sdn3.jpg",
        "https://i.etsystatic.com/21704808/r/il/9470c0/4032240291/il_794xN.4032240291_ddjs.jpg",
      ]
    },
    {
      id: 8,
      name: "Minimalist Ear Cuff With Chain",
      price: 8.12,
      images: [
        "https://theshejewelry.com/cdn/shop/products/080976bc64e539ca59531de02bfa82bf_1024x1024.jpg?v=1638862267",
        "https://theshejewelry.com/cdn/shop/products/81123955bb15e9c55a0f7dc7a6e37456_1024x1024.jpg?v=1638862272",
      ]
    },
    {
      id: 9,
      name: "Gold Threader Earrings",
      price: 22.45,
      images: [
        "https://i.etsystatic.com/11466881/r/il/a84d32/1175240972/il_794xN.1175240972_3ddw.jpg",
        "https://i.etsystatic.com/11466881/r/il/74d670/1543781078/il_794xN.1543781078_axzr.jpg",
      ]
    },
    {
      id: 10,
      name: "Chain Stud Earrings with Zirconia",
      price: 18.90,
      images: [
        "https://i.etsystatic.com/13096247/r/il/47b7f1/3171982407/il_794xN.3171982407_hvmn.jpg",
        "https://i.etsystatic.com/13096247/r/il/02556f/3195831141/il_794xN.3195831141_ewjf.jpg",
      ]
    },
    
  ];
  

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentImageIndices, setCurrentImageIndices] = useState({})
  const intervalRefs = useRef({})

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (priceFilter === '' || 
       (priceFilter === 'under25' && product.price < 25) ||
       (priceFilter === '25to50' && product.price >= 25 && product.price <= 50) ||
       (priceFilter === 'over50' && product.price > 50))
    )
    setFilteredProducts(filtered)
  }, [searchQuery, priceFilter])

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [...existingCart, product]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success(`${product.name} added to cart!`)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const startImageRotation = (productId) => {
    setCurrentImageIndices(prev => ({ ...prev, [productId]: 0 }))
    intervalRefs.current[productId] = setInterval(() => {
      setCurrentImageIndices(prev => {
        const currentIndex = prev[productId] || 0
        const product = products.find(p => p.id === productId)
        return { ...prev, [productId]: (currentIndex + 1) % product.images.length }
      })
    }, 600)
  }

  const stopImageRotation = (productId) => {
    clearInterval(intervalRefs.current[productId])
    setCurrentImageIndices(prev => ({ ...prev, [productId]: 0 }))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="">All prices</option>
            <option value="under25">Under $25</option>
            <option value="25to50">$25 - $50</option>
            <option value="over50">Over $50</option>
          </select>
        </div>
      </div>

      <motion.div 
        layout
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative flex flex-col"
              >
                <div 
                  className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4"
                  onMouseEnter={() => startImageRotation(product.id)}
                  onMouseLeave={() => stopImageRotation(product.id)}
                >
                  {product.images.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300"
                      initial={false}
                      animate={{ 
                        opacity: index === (currentImageIndices[product.id] || 0) ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-2 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex z-10 p-3 bg-[#ffffff92]  justify-between items-center">
                  <h3 className="text-xl text-gray-700">{product.name}</h3>
                  <p className="text-xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}