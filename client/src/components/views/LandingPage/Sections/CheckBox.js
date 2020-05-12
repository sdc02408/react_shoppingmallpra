import React, { useState } from 'react'
import {Checkbox,Collapse} from 'antd'
const {Panel} =Collapse



function CheckBox (props) {
  
  const [Checked, setChecked] =useState([])
  
  const handleToggle = (value) => {
    //indexOf 문자열에서 원하는 문자열이 있는지 없으면 -1, 있으면 문자열의 시작위치에 해당하는 index
   //splice()는 배열에서 특정 범위의 값들을 추출하고, 그 자리에 새로운 값을 넣는다.
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    
    if(currentIndex === -1){
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex,1)
    }
    
    setChecked(newChecked)
    props.handleFilters(newChecked)
  }
  
  const renderCheckboxLists = () => props.list && props.list.map((value,index) => (
    <React.Fragment key={index}>
      <Checkbox
        onChange={() => handleToggle(value._id)}
        type="checkbox"
        //1시간 46
        checked={Checked.indexOf(value._id) === -1 ? false: true}
      />
      <span>{value.name}</span>
    </React.Fragment>
  ))

  
  return (
    <div>
    
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox
