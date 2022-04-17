import classes from "./CheckOutForm.module.css";
import { useRef, useState } from "react";

const isEmpty = value => value.trim() ==='';
const isFiveChars = value => value.trim().length === 5;
const CheckoutForm = (props) => {
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const pincodeRef = useRef();

    
    const [formValidity, setFormValidity] = useState({
      name: true,
      street: true,
      city: true,
      pincode: true,
    });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPincode = pincodeRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const pincodeIsValid = isFiveChars(enteredPincode);

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && pincodeIsValid;

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      pincode: pincodeIsValid
    });

    if(!formIsValid){
        return;
    }
    props.onSubmit({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        pincode:enteredPincode
    })
    
  };
  const nameControlclasses = `${classes.control} ${formValidity.name ? '': classes.invalid}`;
  const streetControlclasses = `${classes.control} ${formValidity.street ? "" : classes.invalid}`;
  const pincodeControlclasses = `${classes.control} ${formValidity.pincode ? "" : classes.invalid}`;
  const cityControlclasses = `${classes.control} ${formValidity.city ? "" : classes.invalid}`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlclasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlclasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={pincodeControlclasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pincodeRef} />
        {!formValidity.pincode && (
          <p>Please enter a valid Pincode of atleast 5 characters.</p>
        )}
      </div>
      <div className={cityControlclasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
