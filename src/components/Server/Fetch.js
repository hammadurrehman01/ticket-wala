import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

export const Fetch = (Link,search, pageIndex, isDelete, city,secondDropdownValue,maxFilterOneValue,maxFilterTwoValue,maxFilterThreeValue,maxFilterFourValue) =>{
    const [Loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')
    

    const dispatcher = useDispatch()
    useEffect(() => {
        const fetchTerminals = async () => {
          try {
            setLoading(true);
              await dispatcher(Link);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            setIsError(err);
          }
        };
        fetchTerminals();
      }, [search, pageIndex, isDelete, city,secondDropdownValue,maxFilterOneValue,maxFilterTwoValue,maxFilterThreeValue,maxFilterFourValue]);
      return {isError, Loading}
}