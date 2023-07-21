"use client"

import {useState, createContext} from 'react';

// Initialise my context
export const MyContext = createContext();

export default function Context({children}) {
    // Context to pass on
  const [userName, setUserName] = useState(null)
  const updateUserName = (newUserName) => setUserName(newUserName)
  
  const [loggedIn, setLoggedIn] = useState(false)
  const updateLoggedIn = (bool) => setLoggedIn(bool)


    return (
      <MyContext.Provider value={{userName, updateUserName, loggedIn, updateLoggedIn}}>
        {children}
      </MyContext.Provider>
    )
  }
