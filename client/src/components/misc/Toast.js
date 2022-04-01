import React,  {useState, useEffect} from 'react';
import {Toast, ToastContainer} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

/**
 * Component for displaying erros nicely.
 * [prop] error {object} The error state.
 * [prop] setError {function} The function to set error state.
 */
export default function ErrorToast({error, setError}){
    const [show, setShow]=useState(false)
    /**Method for toggling the toast*/
    const toggleShow=()=>{
        // If the toast is visible we delete the error on a toggle
        if(show){
            setError(null)
        }
        setShow(!show)
    }
   /**
    * Displaying toast on error state change, but only if error is defined.
    * 
    */
    useEffect(()=>{
        
        if(error){
        toggleShow();
        }
    }, [error])
    /**
     * Return the toast
     */
    return(
        <ToastContainer className="position-fixed p-3" position={"bottom-center"}>

            <Toast bg={"danger"} show={show} onClose={toggleShow}>
             <Toast.Header>
             
               
            </Toast.Header>
            <Toast.Body>{error?error.message:""}</Toast.Body>
            </Toast>
            </ToastContainer >
    );
}