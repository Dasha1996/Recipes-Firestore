import { createContext, useReducer } from "react"; //createContext allows to create new context object
//retuns a new context object and it has context provider component
export const ThemeContext = createContext();
//doesn't need to be inside a component and recreated every time component is evaluated
const themeReducer = (state, action) => { // up to date state and actiopn object from dispatch
      switch (action.type) {
        case 'CHANGE_COLOR':
            //need to spread to keep mode property
            return {...state, color: action.payload};
            case 'CHANGE_MODE':
                //need to spread to keep color property
                return {...state, mode: action.payload}
        default:
            return state;
      }
}
//children compoennt represents all the children compponenys that hese compoent might wrap in the future
export function ThemeProvider ({ children}) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#E95127', //second argument is initial state
        mode: 'light'
    })
 
    //call this function to change the color
    const changeColor = (color) => {
        dispatch({ type: "CHANGE_COLOR", payload: color}) //- object as an rgument refered as dispatch action
                                    //type specifies the type of change we want to make 
                                    //payload is any data we eant to make change with 
    }

    const changeMode = (mode) => {
        dispatch({type: "CHANGE_MODE", payload: mode })
    }

    return (
        <ThemeContext.Provider value = {{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
