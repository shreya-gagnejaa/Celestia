'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(storedCart)
  }, [])

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) + change, 1) } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success('Item removed from cart')
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'thapa') {
      setDiscount(10)
      toast.success('Coupon applied successfully!')
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const shipping = 50.0
  const total = subtotal + shipping - discount

  const handleCheckout = () => {
    navigate('/payment', { 
      state: { 
        cart: cartItems,
        totalCost: total.toFixed(2)
      } 
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-8 border-b border-gray-200">
                <h1 className="text-3xl font-serif text-gray-900">Shopping Cart</h1>
                <p className="mt-2 text-sm text-gray-500">{cartItems.length} items</p>
              </div>
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <div className="flex items-center">
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                          {item.images && item.images.length > 0 ? (
                            <motion.img
                              src={item.images[0]}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              whileHover={{ scale: 1.05 }}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">Gold</p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="rounded-full p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </motion.button>
                              <span className="text-gray-600">{item.quantity || 1}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="rounded-full p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p className="text-sm">Discount</p>
                    <p className="text-sm font-medium">-${discount.toFixed(2)}</p>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyCoupon}
                    className="absolute right-2 top-2 px-4 py-1 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
                  >
                    Apply
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-lg text-base font-medium text-white bg-gray-900 hover:bg-gray-800"
              >
                Proceed to Checkout
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}