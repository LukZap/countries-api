import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCountry } from '../actions';

const useCountry = () => {
    const { countryName } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCountry(countryName))
    }, [countryName])
}

export default useCountry;