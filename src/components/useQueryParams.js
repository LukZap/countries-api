import queryString from 'query-string'
import { useLocation } from "react-router";
import { useMemo } from 'react'
import _ from 'lodash'


const useQueryParams = () => {
    const {search} = useLocation();
    const params = useMemo(() => {
        const values = queryString.parse(search);

        if (_.isEmpty(values)) {
            return null;
        }
        
        return { 
            country: values.country, 
            region: values.region 
        }
    }, [search]);

    return params;
}

export default useQueryParams;