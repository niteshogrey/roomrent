import React, { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneLogin = () => {
    const [phoneNumber, setPhoneNUmber] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)

    const handlePhoneNumber = (e)=>{
        setPhoneNUmber(e.target.value)
    }

    const handlePhoneSubmit = (e) =>{
        e.preventDefault()

        //phone validation
         const regex = /[^0-9]/g
         if((phoneNumber.length<10) || regex.test(phoneNumber)){
            alert("Invalid Phone Number")
            return
         }

         //call be api 
         //show OTP Field
         setShowOtpInput(true)
    }

    const onOtpSubmit = (otp) =>{
        console.log("Login Successfull" , otp);
        
    }

  return (
    <div className='flex justify-center'>
        {!showOtpInput? <form className='flex flex-col justify-center items-center' onSubmit={handlePhoneSubmit}>
            <input 
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                placeholder='Enter Phone Number'
            />
            <button type='submit'>Submit</button>
        </form>: <div className='flexx justify-center'>
           Enter otp sent to {phoneNumber}
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div> }
    </div>
  )
}

export default PhoneLogin