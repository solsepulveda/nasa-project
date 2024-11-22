import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [image, setImage] = useState('')
  const [explanation, setExplanation] = useState('')
  const [savedDate, setSavedDate] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedText, setSelectedText] = useState('')
  const [yesterday, setYesterday] = useState(1)

  /*   useEffect(() => {
  
      const getActualDay = () => {
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
        const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
        fetch(url).then(response => response.json())
          .then(data => {
            console.log('datos', data); 
            setImage(data.hdurl)
            setExplanation(data.explanation)
          })
          .catch(error => {
            console.error("Hubo un error al hacer el fetch:", error);
          });
      }
  
      getActualDay()
  
    }, []) */

  const date = savedDate
  const getAnyDay = () => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}&`;
    fetch(url).then(response => response.json())
      .then(data => {
        setSelectedImage(data.hdurl)
        setSelectedText(data.explanation)
        /* console.log('cierta fecha', data); */ // Muestra los datos en la consola
      })
      .catch(error => {
        console.error("Hubo un error al hacer el fetch:", error);
      });
  }

  useEffect(() => {
    getAnyDay()
  }, [savedDate])





  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() - yesterday);
  //formatear fecha
  const formattedDate = tomorrow.getFullYear() + "-" +
    String(tomorrow.getMonth() + 1).padStart(2, '0') + "-" +
    String(tomorrow.getDate()).padStart(2, '0');
  console.log(savedDate);

  const handleClickBack = () => {
    setSavedDate(formattedDate)
    setYesterday(yesterday + 1)
  }

  const handleClickNext = () => {
    setSavedDate(formattedDate)
    setYesterday(yesterday - 1)
  }



  return (
    <>
      <h1>Astronomy picture of the Day</h1>
      {/*      <div className='daily-image-container'>
        <img className='daily-image' src={image}></img>
        <p className='explanation'>{explanation}</p>
      </div> */}
      <div className='daily-image-container'>
        <img className='daily-image' src={selectedImage}></img>
        <p className='explanation'>{selectedText}</p>
      </div>
      <div className='back-next'>
        <button onClick={handleClickBack}>Back</button>
       { yesterday >= 1 &&<button onClick={handleClickNext}>Next</button>}
      </div>
    </>
  )
}

export default App
