import { identity } from '@fullcalendar/core'
import {useEffect, useState} from 'react'

export const EditDropdown = (route,data,Id) =>{
    const [dropdownData, setDropdown] = useState({})
        
    useEffect(()=>{
        if(route && data !== undefined) {
          let dropdownBusCat = data.find(item=>item.Id === Id)
          if(dropdownBusCat !== undefined) {
            setDropdown({
              name:dropdownBusCat.Name,
              label:dropdownBusCat.Name,
              Id: Id
            })
          }
        }
      },[route, data, Id])
      return {dropdownData}
}