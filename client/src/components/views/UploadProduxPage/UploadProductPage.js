import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Select } from 'antd'
import FileUpload from '../utils/FileUpload'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input
const {Option} = Select;

const Continents = [
  { key: 1, value: 'africa' },
  { key: 2, value: 'europe' },
  { key: 3, value: 'asia' },
  { key: 4, value: 'north america' },
  { key: 5, value: 'south america' },
  { key: 6, value: 'australia' },
  { key: 7, value: 'antarctica' },
]

function UploadProductPage (props) {
  
  const [TitleValue, setTitleValue] = useState('')
  const [DescriptionValue, setDescriptionValue] = useState('')
  const [PriceValue, setPriceValue] = useState(0)
  const [ContinentValue, setContinentValue] = useState(1)
  
  const [Images, setImages] = useState([])
  
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  
  const onDescriptionChange = (e) => {
    setDescriptionValue(e.currentTarget.value)
  }
  
  const onPriceChange = (e) => {
    setPriceValue(e.currentTarget.value)
  }
  
  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value)
  }
  
  const updateImages = (newImages) => {
    setImages(newImages)
  }
  
  const onSubmit = (event) => {
    event.preventDefault()
    
    if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
      return alert('fill all the input')
    }
    
    //크롬 리덕스 익스텐션에서 state 정보들
    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    }
    
    Axios.post('/api/product/uploadProduct', variables)
    .then(response => {
      if (response.data.success) {
        alert('Product successfully uploaded')
        props.history.push('/')
      } else {
        alert('failed to upload product')
      }
    })
  }
  
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      
      <Form onSubmit={onSubmit}>
        
        {/*dropzone*/}
        
        <FileUpload
          refreshFunction={updateImages}/>
        
        <br/>
        <br/>
        
        <label>title</label>
        <Input
          onChange={onTitleChange}
          value={TitleValue}
        />
        
        <br/>
        <br/>
        
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={DescriptionValue}
        />
        
        <br/>
        <br/>
        <label>price</label>
        <Input
          onChange={onPriceChange}
          value={PriceValue}
          type="number"
        />
        
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value} </option>
          ))}
        </select>
        
        <br/>
        <br/>
        
        <Button
          onClick={onSubmit}>
          submit
        </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage
