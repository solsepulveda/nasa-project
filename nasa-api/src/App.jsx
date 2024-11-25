import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/footer'

function App() {


  const [savedDate, setSavedDate] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [imageDate, setImageDate] = useState('')
  const [selectedText, setSelectedText] = useState('')
  const [counter, setCounter] = useState(0)
  const [video, setVideo]=useState('')
  const [type, setType] =useState('')

  /*   useEffect(() => {
      getAnyDay
    }, []) */

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
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSelectedImage(data.hdurl)
        setSelectedText(data.explanation)
        setImageDate(data.date)
        setVideo(data.url)
        setType(data.media_type)
        /* console.log('cierta fecha', data); */ // Muestra los datos en la consola
      })
      .catch(error => {
        console.error("Hubo un error al hacer el fetch:", error);
      });
  }

  useEffect(() => {
    getAnyDay();
    console.log('video',video)
  }, [savedDate]);

  /*  const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(today.getDate() - counter);
   
   //formatear fecha
   const formattedDate = tomorrow.getFullYear() + "-" +
     String(tomorrow.getMonth() + 1).padStart(2, '0') + "-" +
     String(tomorrow.getDate()).padStart(2, '0');
   console.log(savedDate); */

  const handleClickBack = () => {
    const today = new Date()
    // Calcula la fecha retrocediendo con base en el contador
    today.setDate(today.getDate() - (counter + 1))
    const formattedDate = today.toISOString().split('T')[0]
    setSavedDate(formattedDate)
    setCounter(prevCounter => prevCounter + 1)  // Actualiza el contador después
  }

  const handleClickNext = () => {
    const today = new Date()
    // Calcula la fecha avanzando con base en el contador
    today.setDate(today.getDate() - (counter - 1))
    const formattedDate = today.toISOString().split('T')[0]
    setSavedDate(formattedDate)
    setCounter(prevCounter => prevCounter - 1)  // Actualiza el contador después
  }

  const todayDate = new Date().toISOString().split('T')[0];


  return (
    <div className='container'>
      <h1>Astronomy picture of the Day</h1>

      <div className='daily-image-container'>
       { type=='image'?(<a className='daily-image' href={selectedImage} target='_blank'>
          <img className='daily-image' src={selectedImage}></img>
        </a>):
        <iframe className='daily-image' width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      }

        <p className='explanation'>{imageDate} <br />{selectedText}</p>
      </div>
      <div className='back-next'>
        <button onClick={handleClickBack}>Back</button>
        {imageDate != todayDate && <button onClick={handleClickNext}>Next</button>}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
