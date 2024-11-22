import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [image, setImage] = useState('')
  const [explanation, setExplanation] = useState('')
  const [savedDate, setSavedDate] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedText, setSelectedText] = useState('')

  useEffect(() => {

    const getActualDay = () => {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      fetch(url).then(response => response.json())
        .then(data => {
          console.log('datos', data); // Muestra los datos en la consola
          setImage(data.hdurl)
          setExplanation(data.explanation)
        })
        .catch(error => {
          console.error("Hubo un error al hacer el fetch:", error);
        });
    }

    getActualDay()



    console.log('imagen', image)
  }, [])

  const date = savedDate
  const getAnyDay = () => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}&`;
    fetch(url).then(response => response.json())
      .then(data => {
        setSelectedImage(data.hdurl)
        setSelectedText(data.explanation)
        console.log('cierta fecha', data); // Muestra los datos en la consola
      })
      .catch(error => {
        console.error("Hubo un error al hacer el fetch:", error);
      });
  }

  useEffect(() => {
    getAnyDay()
  }, [savedDate])

  const handleChange=(e)=>{
setSavedDate(e.target.value)
  }

  return (
    <>
      <h1>Astronomy picture of the Day</h1>
      <div className='daily-image-container'>
        <img className='daily-image' src={image}></img>
        <p className='explanation'>{explanation}</p>
      </div>
{/*       <select onChange={handleChange}>
        <option value="2011-11-01" >2011-11-01</option>
        <option value="2022-02-02">2022-02-02</option>
      </select>
      <div className='daily-image-container'>
        <img className='daily-image' src={selectedImage}></img>
        <p className='explanation'>{selectedText}</p>
      </div> */}
    </>
  )
}

export default App
