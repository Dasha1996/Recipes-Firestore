import { useTheme } from "../hooks/useTheme";
import modeIcon from '../assets/mode-icon.svg';
// styles 
import './ThemeSelector.css'

import React from 'react'
const themeColors = ['#E95127', '#503EC9', '#359CAE']

export default function ThemeSelector() {
    const { changeColor, changeMode, mode} = useTheme();

    const toggleMode = () => {
        changeMode(mode ==='dark' ? "light": "dark")
    }

    console.log(mode);
  return (
    <div className = "theme-selector">
    <div className = "mode-toggle">
        <img 
            src={modeIcon}
            onClick= {toggleMode}
            alt = "icon for changing modes to darlk or light"
            style = {{ filter: mode === "dark"? 'invert(100%)' : 'invert(20%)'}} />
    </div>
        <div className = "theme-buttons">
            {themeColors.map(color => (
                <div
                key = {color}
                onClick={() => changeColor(color)}
                style = {{background: color}}
                />
            ))}
        </div>  
    </div>
  )
}
