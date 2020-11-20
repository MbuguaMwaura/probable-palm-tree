import {getAccessToken,getItemIndexByProp} from "./Utils";

import axios from "axios";
import {dataGridDefaultPageSize, dataGridPageSizeOptions} from "../constants/defaultValues";
import NotificationManager from "../components/common/react-notifications/NotificationManager";
import { message } from "antd"

export function changePageSize (size){
    this.setState(
        {
            selectedPageSize: size,
            currentPage: 1
        },
        () => this.dataListRender()
    )
}

export function onChangePage (page) {
    this.setState(
        {
            currentPage: page
        },
         () => this.dataListRender()
    )
}

export function changeDisplayMode (mode) {
    this.setState({
        displayMode: mode
    })
    return false
}

export function onSearchKey (e) {

    if (e.key === "Enter" || e.key==='Down' ) {
        this.setState(
            {
                search: e.target.value.toLowerCase()
            },
            () => this.dataListRender()
        )
    }
}

export function dataDetailsRender () {
    this.setState({isLoading:false})
    const {
        apiUrl
    } = this.state;

    const options = {
        headers: {
            'Authorization': 'Bearer '+ getAccessToken()
        }
    }
    axios
        .get( apiUrl, options)
            .then(res => {
                return res.data
            })
            .then(data => {
                var itemData = data.data ? data.data : []
                var firstRecord = itemData ? itemData[0] : []
                var dataStatus = firstRecord ? {status: false, message: null} : {status: true, message: 'No data'}
                this.setState({
                    item: itemData,
                    isLoading: true,
                    error: dataStatus
                })
            },(error) => {
                createNotification('error', 'filled', 'Could not fetch data', 'Error')
                this.setState({
                    item:[],
                    isLoading: true,
                    error: {status: true, message: error.message}
                })
            })
}

export function dataListRender() {
    this.setState({isLoading:false})
    const {
        selectedPageSize,
        currentPage,
        status,
        fetchDataUrl,
        search
    } = this.state;

    const options = {
        headers: {
            'Authorization': 'Bearer '+ getAccessToken()
        }
    }
    axios
        .get(
            `${fetchDataUrl}?size=${selectedPageSize}&page=${currentPage}&status=${status}&query=${search}`,
            options
        )
        .then(res => {
            return res.data
        })
        .then(data => {
            var itemData = data.data ? data.data : []
            var firstRecord = itemData ? itemData[0] : []
            var dataStatus = firstRecord ? {status: false, message: null} : {status: true, message: 'No data'}
            this.setState({
                items: itemData,
                selectedItems: [],
                totalItemCount: data.total,
                isLoading: true,
                error: dataStatus
            })
        },(error) => {
            createNotification('error', 'filled', 'Could not fetch data', 'Error')
            this.setState({
                items:[],
                isLoading: true,
                error: {status: true, message: error.message},
            })
        })
}

export function onCheckItem (event, id) {
    if (
        event.target.tagName === "A" ||
        (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
        return true
    }
    if (this.state.lastChecked === null) {
        this.setState({
            lastChecked: id
        })
    }

    let selectedItems = this.state.selectedItems
    if (selectedItems.includes(id)) {
        selectedItems = selectedItems.filter(x => x !== id)
    } else {
        selectedItems.push(id)
    }
    this.setState({
        selectedItems
    })

    if (event.shiftKey) {
        var items = this.state.items
        var start = getItemIndexByProp(id, items, "id")
        var end = getItemIndexByProp(this.state.lastChecked, items, "id")
        items = items.slice(Math.min(start, end), Math.max(start, end) + 1)
        selectedItems.push(
            ...items.map(item => {
                return item.id
            })
        );
        selectedItems = Array.from(new Set(selectedItems))
        this.setState({
            selectedItems
        })
    }

    var selectedItemId = this.state.selectedItems[0]
    var selectedItemDetails = this.state.items.filter( item => item.id === selectedItemId)

    if(this.state.dataContainsIsActive !== undefined){
        var selectedItemStatus = selectedItemDetails[0].isActive
        this.setState({ selectedItemStatus})
    }
    if(this.state.dataContainsIsInStock !== undefined){
        var selectedItemIsInStock = selectedItemDetails[0].isInStock
        this.setState({ selectedItemIsInStock})
    }
    if(this.state.dataContainsIsPublished !== undefined){
        var selectedItemIsPublished = selectedItemDetails[0].isPublished
        this.setState({ selectedItemIsPublished})
    }
    if(this.state.dataContainsIsFeatured !== undefined){
        var selectedItemIsFeatured = selectedItemDetails[0].isFeatured
        this.setState({ selectedItemIsFeatured})
    }
    document.activeElement.blur()
}

export function handleChangeSelectAll (isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
        if (isToggle) {
            this.setState({
                selectedItems: []
            })
        }
    } else {
        this.setState({
            selectedItems: this.state.items.map(x => x.id)
        })
    }
    document.activeElement.blur()
    return false
}

export function bindMouseTrapCommands(){
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
        this.handleChangeSelectAll(false)
    )
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
        this.setState({
            selectedItems: []
        })
        return false
    });
}

export function unBindMouseTrapCommands(){
    this.mouseTrap.unbind("ctrl+a")
    this.mouseTrap.unbind("command+a")
    this.mouseTrap.unbind("ctrl+d")
    this.mouseTrap.unbind("command+d")
}

export function collect(props) {
    return { data: props.data };
}

export function toggleModal (modalTitle, modalState ){
    this.setState({
        modalOpen: !this.state.modalOpen,
        modalTitle: modalTitle,
        modalState:modalState
    })
}

export function toggleCrudModal (modalTitle, modalState, selectedItemsLength, multipleRecordWarningMessage, selectSingleRecordWarningMessage){
    let modalStateValue = modalState
    let modalOpenState = !this.state.modalOpen
    let errorMessage = {status:false, message: ''}
    if(modalState.includes("edit") || modalState.includes("cancel") || modalState.includes("update")){
        if(selectedItemsLength > 1){
            modalOpenState = this.state.modalOpen
            modalStateValue = '';
            createNotification(
                'warning',
                "filled",
                multipleRecordWarningMessage ? multipleRecordWarningMessage :"Only one record can be updated at a time",
                "Select single record!!"
            )
        }else if(selectedItemsLength < 1 ){
            modalOpenState = this.state.modalOpen
            modalStateValue = ''
            createNotification(
                'warning',
                "filled",
                selectSingleRecordWarningMessage ? selectSingleRecordWarningMessage : "Please select a record to update",
                "Select Record!!"
            )
        }
    }

    this.setState({
        modalOpen: modalOpenState,
        modalTitle: modalTitle,
        modalState:modalStateValue,
        error: errorMessage
    })
}

export function onDismiss (){
    this.setState({error: {status:true, message: null}})
}

export function onContextMenu (e, data){
    const clickedProductId = data.data
    if (!this.state.selectedItems.includes(clickedProductId)) {
        this.setState({
            selectedItems: [clickedProductId]
        })
    }
    return true
}

export function onContextMenuClick(e, data, target){
    createNotification('warning')
    console.log(
        "onContextMenuClick - selected items",
        this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
}

export function changeOrderBy(column) {
    this.setState(
        {
            selectedOrderOption: this.state.orderOptions.find(
                x => x.column === column
            )
        }
        // () => this.dataListRender()
    )
}

export function createNotification (type, className, message, title) {

    let cName = className || "";
    switch (type) {
        case "primary":
            NotificationManager.primary(
                message,
                title,
                3000,
                null,
                null,
                cName
            );
            break;
        case "secondary":
            NotificationManager.secondary(
                message,
                title,
                3000,
                null,
                null,
                cName
            );
            break;
        case "info":
            NotificationManager.info(message, title, 3000, null, null, cName);
            break;
        case "success":
            NotificationManager.success(
                message,
                title,
                3000,
                null,
                null,
                cName
            );
            break;
        case "warning":
            NotificationManager.warning(
                message,
                title,
                3000,
                null,
                null,
                cName
            );
            break;
        case "error":
            NotificationManager.error(
                message,
                title,
                5000,
                () => {
                    alert("callback");
                },
                null,
                cName
            );
            break;
        default:
            NotificationManager.info("Info message");
            break;
    }

}

export const getRequestOptions = (method, requestUrl) =>{
    const requestOptions = {
        method: method,
        url: requestUrl,
        headers: {'Authorization': 'Bearer '+ getAccessToken()}
    }
    return requestOptions
}

export const getPostAndPutRequestOptions = (method, requestUrl, data) =>{
    const requestOptions = {
        method: method,
        url: requestUrl,
        data: data,
        headers: {'Authorization': 'Bearer '+ getAccessToken()}
    }
    return requestOptions
}

/*const checkRequestStatus = response => {
    if(response.ok){
        return response
    }else{
        let error = new Error(response.statusText)
        error.response = response
        response.json().then(e => {
            error.error = e
        })
        return Promise.reject(error)
    }
}

const sendRequest = (options, checkStatus) => axios(options).then(checkStatus)*/

const sendUpdateRequest = (selectedItemsLength, requestUrl, body, dataListRender, httpMethod) => {
    if(selectedItemsLength > 1){
        createNotification('warning', "filled","Only one record can be updated at a time", "Select single record!!")
    }else if(selectedItemsLength < 1 ){
        createNotification('warning', "filled","Please select a record to update status", "Select Record!!")
    }

    let method = 'PUT'
    if(httpMethod){
        method = httpMethod
    }

    const options = getPostAndPutRequestOptions(method,requestUrl, body)

    const hideLoader = message.loading('Updating status..', 120);
    axios(options)
        .then(res => {
            let responseData = res.data
            dataListRender()
            hideLoader();
            createNotification('success', 'filled', responseData.message, 'Success');
            return res.data
        }, error => {
            console.log(error)
            hideLoader();
            createNotification('error', 'filled', 'failed to update', 'Error');
        })
}

export function onUpdateStatus () {

    const selectedItems = this.state.selectedItems
    const selectedItemsLength = selectedItems ? selectedItems.length : 0
    if(selectedItemsLength > 1){
        createNotification('warning', "filled","Only one record can be updated at a time", "Select single record!!")
        return
    }else if(selectedItemsLength < 1 ){
        createNotification('warning', "filled","Please select a record to update status", "Select Record!!")
        return
    }
    const apiUrl = this.state.apiUrl
    const id = this.state.selectedItems[0]
    const selectedItemDetails = this.state.items.filter( item => item.id === id )[0]
    const value =  !selectedItemDetails.isActive
    const body = {status: value ? "active" : "inactive"}

    const requestUrl = apiUrl + "/status/" + id

    sendUpdateRequest(selectedItemsLength, requestUrl, body, this.dataListRender)
}

export function onUpdateCustomStatus (apiUrl, status, statusBody, httpMethod) {
    const selectedItems = this.state.selectedItems
    const selectedItemsLength = selectedItems ? selectedItems.length : 0
    if(selectedItemsLength > 1){
        createNotification('warning', "filled","Only one record can be updated at a time", "Select single record!!")
        return
    }else if(selectedItemsLength < 1 ){
        createNotification('warning', "filled","Please select a record to update status", "Select Record!!")
        return
    }
    const id = this.state.selectedItems[0]
    let body = {status: status }
    if(statusBody){
        body = statusBody
    }
    console.log(body)
    const requestUrl = apiUrl + "/"+ id
    sendUpdateRequest(selectedItemsLength, requestUrl, body, this.dataListRender, httpMethod)
}

export function onFormSubmit (value, modalState, apiUrl, id, formikActions, pageType) {
    let method = 'post'
    if(modalState.includes('edit')){
        method = 'put'
    }else if (modalState === 'add'){
        method = 'post'
        id = ''
    }else{
        id = ''
    }
    const requestUrl = apiUrl + "/" + id
    const options = getPostAndPutRequestOptions(method,requestUrl, value)

    axios(options)
        .then(res => {
            formikActions.resetForm();
            formikActions.setSubmitting(false)
            this.toggleCrudModal('pages.add', '', 0)
            let responseData = res.data

            if(responseData.status === 200){
                createNotification('success', 'filled', responseData.message, 'Success');

            }else{
                createNotification('error', 'filled', responseData.message, 'Error');
            }
            if(pageType === 'details'){
                this.dataDetailsRender();
            }else{
                this.dataListRender()
            }

            return res.data
        }, error => {
            formikActions.setSubmitting(false)
            createNotification('error', 'filled', 'Error' ,'Error');

        })
}

export const loadFormSelectOptions = async (url, setOption) =>{
    const requestOptions = getRequestOptions('get', url)
    const optionsResponse = await axios(requestOptions)

    const optionsData = optionsResponse.data.data
    const options = mapResponseDataToSelectOptionsFormat(optionsData)
    setOption(options)
}

export const mapResponseDataToSelectOptionsFormat = responseData =>{
    return responseData.map(optionsData => ({
        "value": optionsData.id,
        "label": optionsData.name
    }))
}

export const mapImageDataToLibraryFormat = images => {
    return images.map((image, index) => ({
        key: ""+ index,
        src: image.url,
        width: 4,
        height: 3,
        id: image.id
    }))
}

export function initComponent(baseApiUrl,fetchDataUrl,heading,titleButtonsData,dropDownData, formErrorMessage){
    this.mouseTrap = require("mousetrap");
    this.changePageSize = changePageSize.bind(this);
    this.changeDisplayMode = changeDisplayMode.bind(this);
    this.onChangePage = onChangePage.bind(this);
    this.dataListRender = dataListRender.bind(this);
    this.onSearchKey = onSearchKey.bind(this);
    this.onCheckItem = onCheckItem.bind(this);
    this.handleChangeSelectAll = handleChangeSelectAll.bind(this);
    this.toggleModal = toggleModal.bind(this);
    this.onDismiss = onDismiss.bind(this);
    this.onContextMenu = onContextMenu.bind(this);
    this.onContextMenuClick = onContextMenuClick.bind(this);
    this.changeOrderBy = changeOrderBy.bind(this);
    this.toggleCrudModal = toggleCrudModal.bind(this);
    this.onFormSubmit = onFormSubmit.bind(this);
    this.onUpdateStatus = onUpdateStatus.bind(this);
    this.onUpdateCustomStatus = onUpdateCustomStatus.bind(this);

    this.state = {
        apiUrl:baseApiUrl,
        fetchDataUrl: fetchDataUrl,
        selectedPageSize: dataGridDefaultPageSize,
        pageSizes: dataGridPageSizeOptions,
        orderOptions: [
            { column: "status", label: "Status" }
        ],
        selectedOrderOption: { column: "status", label: "Status" },
        dropdownSplitOpen: false,
        modalOpen: false,
        currentPage: 1,
        totalItemCount: 10,
        totalPage: 1,
        search: "",
        status: '',
        selectedItems: [],
        selectedSubCategoryItems: [],
        lastChecked: null,
        isLoading: false,
        modalState: 0,
        titleButtonsData: titleButtonsData,
        heading: heading,
        dropDownData: dropDownData,
        error: {status: false, message:''},
        formErrorMessage : formErrorMessage,
        selectedItemStatus: null,
        displayMode: "list"
    }
}