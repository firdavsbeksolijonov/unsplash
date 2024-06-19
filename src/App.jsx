import React, { useRef, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import "./index.css"

const API_URL = "https://api.unsplash.com/search/photos"
const IMAGES_PER_PAGE = 30
const App = () => {
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const searchInputRef = useRef(null)
  
  useEffect(() => { 
    fetchImage()
  },[page])

  const fetchImage = async () => {
    try{
    const {data} = await axios.get(`${API_URL}?query=${searchInputRef.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}8&client_id=${import.meta.env.VITE_API_KEY}`)
      setImages(data.results)
      setTotalPages(data.total_pages)
    }catch(error){
      console.log(error);
    }
  }

  const ResetSearch = () => {
    fetchImage();
    setPage(1)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchInputRef.current.value)
    ResetSearch()
  }

  const handleSelection = (selection) => {
    searchInputRef.current.value = selection;
    ResetSearch()
  }


  return (
    <div className='container '>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control type="search" placeholder="Search..." className='search-input'
          ref={searchInputRef}
          />
        </Form>
      </div>
      <div className='filters'>
        <div onClick={()=> handleSelection("nature")}>Nature</div>
        <div onClick={()=> handleSelection("birds")}>Birds</div>
        <div onClick={()=> handleSelection("cats")}>Cats</div>
        <div onClick={()=> handleSelection("shoes")}>Shoes</div>
      </div>
      <div className="images">
          {
            images.map((image) => (
              <div key={image.id} className="image">
                <img src={image.urls.small} alt={image.alt_description} className="image" />
              </div>
            ))
          }
      </div>
      <div className='buttons'>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            {page < totalPages && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </div>
    </div>
  )
}

export default App