import { useState ,useEffect ,useRef } from 'react'
import './App.css'



function App() {

  const API_id = "ec0d9392"
  const API_key = "6310541f21a76e0dccb4fb8e9d267355"

  // process.env.REACT_APP_API_ID
  // process.env.REACT_APP_API_KEY

  const[ingredientList,updateIngredientList] = useState([]);
  const inputRef = useRef(null);

  const Search = ()=>{
    searchForRecipe(inputRef.current.value)
  }

  const searchForRecipe = (query)=>{
    let url = `https://api.edamam.com/search?q=${query}&app_id=${API_id}&app_key=${API_key}`
     fetch(url)
     .then((response)=>{
      return response.json();
     })
     .then((res)=>{
      updateIngredientList(res.hits)
     })
     .catch((err)=>{
       console.log("err",err);
     })
  }
  
  useEffect(()=>{
    searchForRecipe(inputRef)
  },[])
  
  return (
  
      <div className='App'>
        <header className='App-header'>
          <div className='title'>
          FlavorFinder
          </div>
          <div>
            <input ref={inputRef} placeholder="Search for Recipe" />
            <button onClick={Search}>Search</button>
          </div>
          <div className='Wrapper'>
            {
              ingredientList.map((item,index)=>{
                return(
                  <div className='ingredients' key={index}>
                    <span>{item.recipe.label}</span>
                    <img src={item.recipe.image}/>
                    <div className='ingredients-content'>
                    {item.recipe.ingredientLines.map((step,stepindex)=>{
                      return <p key={stepindex}>{step}</p>
                    })}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </header>
        <footer className='footer'>
          @created by Pratush Sinha
        </footer>
      </div>
     
  )
}



export default App
