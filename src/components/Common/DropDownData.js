import React,{useEffect, useState} from 'react'


const DropDownData = (data, Loading) =>{
    const [dropdown,setDropDown] = useState(0)
    // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in data) {
      options.push({
        label: data[key].Name,
        value: data[key].Name,
        Id: data[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setDropDown(optionGroup);
  }, [Loading]);
  // useEffect to set Terminal Dropdown End
  return dropdown
}

export default DropDownData