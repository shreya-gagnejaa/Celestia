'use client'

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Smartphone, Building2, ChevronLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

const PaymentMethod = ({ icon: Icon, name, selected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 border rounded-xl cursor-pointer transition-colors ${
      selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center space-x-4">
      <div className={`${selected ? 'text-gray-900' : 'text-gray-400'}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className={`font-medium ${selected ? 'text-gray-900' : 'text-gray-600'}`}>{name}</span>
    </div>
  </motion.div>
)

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { cart = [], totalCost = 0 } = location.state || {}
  const [paymentMethod, setPaymentMethod] = useState('')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [upiId, setUpiId] = useState('')
  const [bankAccount, setBankAccount] = useState({
    number: '',
    ifsc: '',
    name: ''
  })

  const handlePayment = (e) => {
    e.preventDefault()
    toast.success('Payment successful!')
    alert("Payment Succesfull");
    localStorage.removeItem('cart');
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#f8f5f1] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cart
            </button>
            <h1 className="mt-6 text-3xl font-serif text-gray-900">Checkout</h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-lg font-medium text-gray-900">
                      Total: ${totalCost}
                    </p>
                  </div>
                </div>
              </div>

              
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <PaymentMethod
                    icon={CreditCard}
                    name="Card Payment"
                    selected={paymentMethod === 'card'}
                    onSelect={() => setPaymentMethod('card')}
                  />
                  <PaymentMethod
                    icon={Smartphone}
                    name="UPI"
                    selected={paymentMethod === 'upi'}
                    onSelect={() => setPaymentMethod('upi')}
                  />
                  <PaymentMethod
                    icon={Building2}
                    name="Net Banking"
                    selected={paymentMethod === 'netbanking'}
                    onSelect={() => setPaymentMethod('netbanking')}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 space-y-6"
                      onSubmit={handlePayment}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                      >
                        Pay ${totalCost}
                      </motion.button>
                    </motion.form>
                  )}

                  {paymentMethod === 'upi' && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 space-y-6"
                      onSubmit={handlePayment}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          placeholder="username@upi"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                      >
                        Pay ${totalCost}
                      </motion.button>
                    </motion.form>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 space-y-6"
                      onSubmit={handlePayment}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Account Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={bankAccount.number}
                          onChange={(e) =>
                            setBankAccount({ ...bankAccount, number: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={bankAccount.ifsc}
                          onChange={(e) =>
                            setBankAccount({ ...bankAccount, ifsc: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                          value={bankAccount.name}
                          onChange={(e) =>
                            setBankAccount({ ...bankAccount, name: e.target.value })
                          }
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                      >
                        Pay ${totalCost}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}