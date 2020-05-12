import React, { useEffect, useState } from 'react'
import { FaCode } from 'react-icons/fa'
import Axios from 'axios'
import ImageSlider from '../utils/ImageSlider'
import { Row, Card, Col } from 'antd'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { continents,  price } from './Sections/Data'
import SearchFeature from './Sections/SearchFeature'

const { Meta } = Card

function LandingPage () {
  
  const [Products, setProducts] = useState([])
  const [Skip,setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState(0)
  const [Filters,setFilters] = useState({
    continents: [],
    price: []
  })
  const [SearchTerms, setSearchTerms] = useState("")
  
  useEffect(() => {
  
    const variables = {
      skip: Skip,
      limit: Limit,
    
    }
    
  getProducts(variables)
  }, [])
  
  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts',variables)
    .then(response => {
      if (response.data.success) {
        if(variables.loadMore){
          setProducts( [...Products, ...response.data.products])
        } else{
          setProducts( response.data.products)
        }
        
       setPostSize(response.data.postSize)
      } else {
        alert('failed to fetch product datas')
      }
    })
  }
  
  
  //mongodb의 skip과 limit이있어
  //skip은 the position from wherer you start fetching the prodduct data  start 0 next one will be if limit is 6 2rd skip = 0 + 6
  //limit- how many produc datas will you fetch data to the maximum whenever you click load more button
  const onLoadMore = () => {
  let skip =Skip + Limit;  //  0   8
  
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }
    
  getProducts(variables)
  
    setSkip(skip)
  }
  
  
  const renderCards = Products.map((product, index) => {
    
    return <Col lg={6} md={8} xs={24}>
      <Card
        hoverable={true}
        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
      >
        
        <Meta
          title={product.title}
          description={`$${product.price}`}
        />
      </Card>
    </Col>
  })
  
  
  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    }
    getProducts(variables)
setSkip(0)
  }
  
  const handlePrice = (value) => {
    const data = price;
    let array = [];
    
    for(let key in data){
    
    console.log('key',key)
  if(data[key]._id === parseInt(value,10)) {
    array = data[key].array;
  }
  }
    console.log('array', array)
    return array
  }
  
  const handleFilters = (filters, category)=> {
  console.log(filters)
    
    const newFilters = {...Filters}
    
    newFilters[category] = filters
  
    if(category === "price" ){
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues
    }
    console.log(newFilters)
    showFilteredResults(newFilters)
    setFilters(newFilters)
  }
  
  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerms(newSearchTerm)
    console.log(newSearchTerm)
   
   //이게 server product 라우터로 보내주는거야
    
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }
    setSkip(0)
    setSearchTerms(newSearchTerm)
    getProducts(variables)
  
  }
  
  return (
    <div style={{ width: '75%', margin: ' 3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel 'Anywhere</h2>
      </div>
      
      <Row gutter ={[16,16]}>
        <Col lg={12} xs={24}>
      <CheckBox
        list={continents}
        handleFilters = {filters => handleFilters(filters, "continents")}
      />
        </Col>
        <Col lg={12} xs={24}>
      <RadioBox
        list={price}
      handleFilters = {filters => handleFilters(filters, "price")}
      />
        </Col>
      </Row>
      {/*  search*/}
      
      
      <div style={{display:'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
      
      <SearchFeature
        refreshFunction={updateSearchTerm}
      />
      
    </div>
    
    
    
      {Products.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
          <h2>no post yer...</h2>
        </div> :
        <div>
          <Row gutter={[16, 16]}>
            {renderCards}
          </Row>
        
        </div>
      }
      <br/><br/>
      
      {PostSize >= Limit &&
      
      <div style={{display:'flex', justifyContent:'center'}}>
        <button onClick={onLoadMore}>load more</button>
      </div>
      
      }
      
      
    </div>
  )
}

export default LandingPage
