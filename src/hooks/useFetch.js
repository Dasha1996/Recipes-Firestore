import { useState, useEffect } from "react"
//edits to make it send form data to json server
//1. useFetchneed to accept method in its argument
//2. postData()
//3. trigger fetch request after options were set in postData.
//if it is GET we can instantly fetch the data in useEffect, but with POST we need to wait till options are set in postData
//we can add options as an argument to fetchData function
export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null);
  
  //it creates fetch object options to store it in state, not making request
  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        //the type of data we are sending in post request
        "Content-Type": "application/json"
      },
      //the recipe data
      body: JSON.stringify(postData)
    })


  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if(method === 'GET') {
      fetchData()
    }
    if (method==="POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData }
}