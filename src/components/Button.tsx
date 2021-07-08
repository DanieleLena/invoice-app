import React from 'react';
import { useInvoiceContext } from "../context/invoice_context";


const Button = () => {

        const {isDark,switchTheme} = useInvoiceContext()!;
        
        console.log(isDark);

        
        

        


    const handleClick = () => {
    
        document.body.classList.add("dark-theme");
        console.log("ciaoo");
        
        
    }

    return <button onClick={switchTheme}>click me</button>;
}

export default Button
