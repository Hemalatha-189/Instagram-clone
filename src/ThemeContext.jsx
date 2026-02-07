import { Children, createContext, useEffect, useState } from "react";
import { useContext } from "react";
export const  ThemeContext  = createContext();
export const ThemeProvider = ({children})=>{
    const[theme,setTheme]=useState(()=>{
        try{
             return localStorage.getItem('theme') || 'light';
        }
        catch{
            return 'light';
        }
       

    })
    

useEffect(()=>{
    
    localStorage.setItem('theme', theme);
    document.body.className= theme;
},[theme]);

const toggleClass =()=>{
    setTheme(prev => (prev === 'light' ? 'dark' : 'light' ));
}

return(
    <ThemeContext.Provider value={{theme,toggleClass}}>
        {children}
    </ThemeContext.Provider>
)
}