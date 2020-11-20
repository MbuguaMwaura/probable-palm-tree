import React from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {dataComboDefaultPageSize, servicePath} from "../../constants/defaultValues";
import {getRequestOptions} from "../../helpers/DataManagement";
import axios from "axios";

const categoryUrl = servicePath + "commodity-category/";


async function loadOptions(search, loadedOptions, { page }) {

    console.log(page);
    const paginationUrl = `${categoryUrl}?query=${search}&page=${page}&size=${dataComboDefaultPageSize}`;
    const response = await axios(getRequestOptions('get',paginationUrl));
    const responseJSON = response.data;

    const optionsData = responseJSON.data;
    const totalData = responseJSON.total;
    const options = optionsData.map(option => ({
        "value": option.id,
        "label": option.name
    }))
    console.log('totalData',totalData)
    console.log('loadedOptionsLength',loadedOptions.length)

    const hasMoreData = loadedOptions.length+dataComboDefaultPageSize < totalData ? true:false;

    return {
        options: options,
        hasMore: hasMoreData,
        additional: {
            page: page + 1,
        }
    };
}

const shouldLoadMore = (scrollHeight,clientHeight,scrollTop) => {
    console.log('scrollHeight',scrollHeight)
    console.log('clientHeight',clientHeight)
    console.log('scrollTop',scrollTop)
    return false; //loadedOptions.length + dataComboDefaultPageSize < totalData ? true : false;
}

const FormikPaginationSelect = (props) =>{
    return (<AsyncPaginate
            loadOptions={loadOptions}
            shouldLoadMore={shouldLoadMore}
            additional={{
                page: 1,
            }}

         />)

}
export default FormikPaginationSelect;