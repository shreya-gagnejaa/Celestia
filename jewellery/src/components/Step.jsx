import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import s1 from "../assets/images/aneet/rings.jpeg"
import s2 from "../assets/images/aneet/necklace.jpeg"
import s3 from "../assets/images/aneet/bracelet.jpeg"
import s4 from "../assets/images/aneet/ring1.jpeg"
import s5 from "../assets/images/aneet/ring2.png"
import s6 from "../assets/images/aneet/ring3.png"
import s7 from "../assets/images/aneet/ring4.png"
import s8 from "../assets/images/aneet/necklace1.png"
import s9 from "../assets/images/aneet/necklace2.png"
import s10 from "../assets/images/aneet/necklace3.png"
import s11 from "../assets/images/aneet/necklace4.png"
import s12 from "../assets/images/aneet/b1.png"
import s13 from "../assets/images/aneet/b2.png"
import s14 from "../assets/images/aneet/b3.png"
import s15 from "../assets/images/aneet/b4.png"
import s16 from "../assets/images/aneet/r1.jpeg"
import s17 from "../assets/images/aneet/r2.jpeg"
import s18 from "../assets/images/aneet/r3.jpeg"
import s19 from "../assets/images/aneet/n1.jpeg"
import s20 from "../assets/images/aneet/n2.jpeg"
import s21 from "../assets/images/aneet/n3.jpeg"
import s22 from "../assets/images/aneet/br1.jpeg"
import s23 from "../assets/images/aneet/br2.jpeg"
import s24 from "../assets/images/aneet/br3.jpeg"
export default function Step() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [selectedBase, setSelectedBase] = useState('')
  const [selectedDangler, setSelectedDangler] = useState('')


  const progressWidth = {
    1: 'w-1/3',
    2: 'w-2/3',
    3: 'w-full'
  }

  const jewelryTypes = [
    { name: 'Rings', image: s1 },
    { name: 'Necklace', image: s2 },
    { name: 'Bracelet', image: s3 }
  ]

  const baseJewelry = {
    Rings: [s4, s5, s6, s7],
    Necklace: [s8, s9, s10, s11],
    Bracelet: [s12, s13, s14, s15]
  }

  const danglers = {
    Rings: [s16, s17, s18],
    Necklace: [s19, s20, s21],
    Bracelet: [s22, s23, s24]
  }
  const prices = {
    Rings: 10.99,
    Necklace: 11.99,
    Bracelet: 12.99
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      addToCart()
    }
  }

  const addToCart = () => {
    const customJewelry = {
      id: Date.now(),
      name: `Custom ${selectedType}`,
      price: prices[selectedType],
      images: [selectedBase, selectedDangler],
    }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [...existingCart, customJewelry]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success(`Custom ${selectedType} added to cart!`)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center">Let's Start</h2>
            <p className="text-xl text-center">SELECT YOUR JEWELRY</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jewelryTypes.map((type) => (
                <div
                  key={type.name}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedType(type.name)
                    handleNext()
                  }}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <p className="text-center text-lg mt-2">{type.name}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center">Base Jewelry</h2>
            <p className="text-xl text-center">SELECT YOUR BASE JEWELRY</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {baseJewelry[selectedType].map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer border border-gray-300 rounded-lg"
                  onClick={() => {
                    setSelectedBase(image)
                    handleNext()
                  }}
                >
                  <img
                    src={image}
                    alt={`Base ${selectedType} ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center">
              {selectedType === 'Rings' ? 'Engrave' : 'Danglers'}
            </h2>
            <p className="text-xl text-center">
              Select any one {selectedType === 'Rings' ? 'type of engraving' : 'for'} base JEWELRY
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {danglers[selectedType].map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedDangler(image)}
                >
                  <img
                    src={image}
                    alt={`Dangler ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <p className="text-right text-lg mt-2">${prices[selectedType]}</p>
                </div>
              ))}
            </div>
            <div className="text-right text-2xl font-bold text-gray-700">
              Total: ${prices[selectedType]}
            </div>
            <button
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300"
              onClick={handleNext}
            >
              Add to Cart
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-600 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full bg-orange-600 rounded-full transition-all duration-500 ${progressWidth[step]}`}
            ></div>
          </div>
        </div>
        <div className="text-center mb-8">
          <p className="text-orange-600">STEP {step}/3</p>
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              className="ml-auto bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300 flex items-center"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}