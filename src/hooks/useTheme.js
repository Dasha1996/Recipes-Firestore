//to use context
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
    //returns the value prop from themecontext.provider, the prop wraps application but it is themecontext we are using
    const context = useContext(ThemeContext);
   //will be undefined if we use it outside the scope of it
    if(context === undefined) {
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }

    return context;
}