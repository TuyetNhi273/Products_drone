import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate từ react-router-dom
import "./RFSeller.css";
import { useDispatch } from "react-redux";
import { sellerStart, sellerFalse, sellerSuccess } from "../../../redux/authSlice";

function Seller() {
  const [shopName, setShopName] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [pickupAddresses, setPickupAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [agree, setAgree] = useState(false);
  const [tax, setTax] = useState([""]);
  const [ID, setID] = useState([""]);
  const [currentStep, setCurrentStep] = useState(1); 
  const [saved, setSaved] = useState(false);  

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khai báo navigate

  const handleAddPickupAddress = () => {
    const newAddress = prompt("Enter pickup address:");
    if (newAddress) {
      setPickupAddresses([...pickupAddresses, newAddress]);
    }
  };

  const onButtonClick = () => {
    dispatch(sellerStart());
    setEmailError("");
    setShopNameError("");
    setPhoneNumberError("");
    
    if ("" === shopName) {
      dispatch(sellerFalse());
      setShopNameError("Please enter your shop name");
      return;
    }
    
    if ("" === email) {
      dispatch(sellerFalse());
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      dispatch(sellerFalse());
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === phoneNumber) {
      dispatch(sellerFalse());
      setPhoneNumberError("Please enter your PhoneNumber");
      return;
    }

    if (phoneNumber.length > 10) {
      dispatch(sellerFalse());
      setPhoneNumberError("The PhoneNumber must be 10 characters");
      return;
    }

    // Set saved flag to true after successfully saving
    setSaved(true);
  };

  const handleNext = () => {
    if (!saved) {
      alert("You need to save the data first before proceeding to the next step!");
      return; // Prevent progressing if data is not saved
    }
    
    if (currentStep < 4) {
      dispatch(sellerSuccess());
      setCurrentStep(currentStep + 1); // Move to the next step
      setSaved(false);
    } else {
      // Khi đến bước cuối, điều hướng tới trang sản phẩm
      navigate("/products/purchase-order/seller/seller");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };

  return (
    <div className="seller-container">
      <div className="progress-bar">
        <div className={`progress-step ${currentStep === 1 ? 'active' : ''}`}>Shop Information</div>
        <div className={`progress-step ${currentStep === 2 ? 'active' : ''}`}>Tax Information</div>
        <div className={`progress-step ${currentStep === 3 ? 'active' : ''}`}>Identification Information</div>
        <div className={`progress-step ${currentStep === 4 ? 'active' : ''}`}>Complete</div>
      </div>

      <div className="for-container">
        {/* Conditionally render the forms based on the current step */}
        {currentStep === 1 && (
          <div>
            <div className="form-group">
              <label htmlFor="shop-name">* Shop Name</label>
              <input
                type="text"
                id="shop-name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                maxLength={30}
                placeholder="Enter your shop name"
              />
              <p className="errorShopName">{shopNameError}</p>
              <span className="character-count">{shopName.length}/30</span>
            </div>

            <div className="form-group">
              <label htmlFor="email">* Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <p className="errorEmail">{emailError}</p>
            </div>

            <div className="form-group">
              <label>* Phone Number</label>
              <input
                type="number"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
              <p className="phoneNumberError">{phoneNumberError}</p>
            </div>

            <div className="form-group">
              <label>* Pickup Address</label>
              <button className="add-address-btn" onClick={handleAddPickupAddress}>
                + Add
              </button>

              <ul className="address-list">
                {pickupAddresses.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="form-group">
              <label htmlFor="tax">*  Tax Identification Number</label>
              <input
                type="text"
                id="tax"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                placeholder="Enter your Tax Identification Number"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="form-group">
              <label htmlFor="ID">*   National ID Card</label>
              <input
                type="number"
                id="ID"
                value={ID}
                onChange={(e) => setID(e.target.value)}
                placeholder="Enter your  National ID Card"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3>Thank you! Your information has been submitted. The policies are listed below:</h3>
            <div className="agreement">
              <input 
              className="agreement-checkbox"
              type="checkbox"
              name="agreement"
              value="agreement"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              />
              <h3>I agree to the terms and conditions</h3>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="form-buttons">
          <button 
            className="previous-btn" 
            onClick={handlePrevious} 
            disabled={currentStep === 1} // Disable on the first step
          >
            Previous
          </button>
          <button className="save-btn" onClick={onButtonClick}>
            Save
          </button>
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Seller;
