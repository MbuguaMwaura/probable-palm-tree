import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";

import { servicePath } from "../../../../constants/defaultValues";

// import FinanceProviderDataListView from "../../../../containers/pages/FinanceProviderDataListView";
import Pagination from "../../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../../containers/pages/ContextMenuContainer";
// import financeProviders from "../../../../data/finance-providers";

import ForumHeading from "./ForumHeading";

import {getRequestOptions} from "../../../../helpers/DataManagement";


const apiUrl = servicePath + "forum/topics";

class Forum extends Component {
    constructor(props) {
        super(props);
        this.mouseTrap = require("mousetrap");

        this.state = {
            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "pending", label: "Pending Action" },
                { column: "approved", label: "Approved" },
                { column: "disapproved", label: "Disapproved" }
            ],
            pageSizes: [10, 20, 30, 50, 100],

            selectedOrderOption: { column: "pending", label: "Pending Action" },
            dropdownSplitOpen: false,
            modalOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],
            lastChecked: null,
            isLoading: false,
            localeData: {
                heading: "menu.forum", button1: "users.approve", button2: "users.disapprove",
                modalTitle1: "users.approve-user-title", modalTitle2: "users.disapprove-user-title"
            },
            dropDownData: ["users.approve", "users.disapprove"],
            financeProviders: []
        };
      
    }

    getForumTopics = async () =>{
        const requestOptions = getRequestOptions('get', apiUrl)
        const forumResponse = await axios(requestOptions)

        const optionsData = forumResponse.data.data

        this.setState({
            isLoading: true
        })
  
        console.log(optionsData)
   
   } 

    componentDidMount() {
        this.dataListRender();
        this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
            this.handleChangeSelectAll(false)
        );
        this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
            this.setState({
                selectedItems: []
            });
            return false;
        });
    }

    componentWillUnmount() {
        this.mouseTrap.unbind("ctrl+a");
        this.mouseTrap.unbind("command+a");
        this.mouseTrap.unbind("ctrl+d");
        this.mouseTrap.unbind("command+d");
    }

    toggleModal = (modalTitle) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalTitle: modalTitle
        });
    };

    changeOrderBy = column => {
        this.setState(
            {
                selectedOrderOption: this.state.orderOptions.find(
                    x => x.column === column
                )
            },
            () => this.dataListRender()
        );
    };
    changePageSize = size => {
        this.setState(
            {
                selectedPageSize: size,
                currentPage: 1
            },
            () => this.dataListRender()
        );
    };
    changeDisplayMode = mode => {
        this.setState({
            displayMode: mode
        });
        return false;
    };
    onChangePage = page => {
        this.setState(
            {
                currentPage: page
            },
            () => this.dataListRender()
        );
    };

    onSearchKey = e => {
        if (e.key === "Enter") {
            this.setState(
                {
                    search: e.target.value.toLowerCase()
                },
                () => this.dataListRender()
            );
        }
    };

    onCheckItem = (event, id) => {
        if (
            event.target.tagName === "A" ||
            (event.target.parentElement && event.target.parentElement.tagName === "A")
        ) {
            return true;
        }
        if (this.state.lastChecked === null) {
            this.setState({
                lastChecked: id
            });
        }

        let selectedItems = this.state.selectedItems;
        if (selectedItems.includes(id)) {
            selectedItems = selectedItems.filter(x => x !== id);
        } else {
            selectedItems.push(id);
        }
        this.setState({
            selectedItems
        });

        if (event.shiftKey) {
            var items = this.state.items;
            var start = this.getIndex(id, items, "id");
            var end = this.getIndex(this.state.lastChecked, items, "id");
            items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
            selectedItems.push(
                ...items.map(item => {
                    return item.id;
                })
            );
            selectedItems = Array.from(new Set(selectedItems));
            this.setState({
                selectedItems
            });
        }
        document.activeElement.blur();
    };

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }
    handleChangeSelectAll = isToggle => {
        if (this.state.selectedItems.length >= this.state.items.length) {
            if (isToggle) {
                this.setState({
                    selectedItems: []
                });
            }
        } else {
            this.setState({
                selectedItems: this.state.items.map(x => x.id)
            });
        }
        document.activeElement.blur();
        return false;
    };

    dataListRender() {
        this.getForumTopics()


    }

    onContextMenuClick = (e, data, target) => {
        console.log(
            "onContextMenuClick - selected items",
            this.state.selectedItems
        );
        console.log("onContextMenuClick - action : ", data.action);
    };

    onContextMenu = (e, data) => {
        const clickedProductId = data.data;
        if (!this.state.selectedItems.includes(clickedProductId)) {
            this.setState({
                selectedItems: [clickedProductId]
            });
        }

        return true;
    };

    render() {
        const {
            localeData,
            // eslint-disable-next-line
            financeProviders
        } = this.state;
        const { match } = this.props;

        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>
                    <div className="disable-text-selection">
                        <ForumHeading
                            localeData={localeData}
                            match={match}
                            toggleModal={this.toggleModal}
                            refreshCurrencies={this.handleRefreshData}
                        />

                        <Row>
                            {this.state.financeProviders.map(financeProvider => {
                                console.log(financeProvider);
                                return (
                                    <></>
                                    // <FinanceProviderDataListView
                                    //     key={financeProvider.id}
                                    //     financeProvider={financeProvider}
                                    // // isSelect={this.state.selectedItems.includes(user.id)}
                                    // // onCheckUser={this.onCheckItem}
                                    // // collect={collect}
                                    // />
                                );
                            })}{" "}
                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPage={this.state.totalPage}
                                onChangePage={i => this.onChangePage(i)}
                            />
                            <ContextMenuContainer
                                onContextMenuClick={this.onContextMenuClick}
                                onContextMenu={this.onContextMenu}
                            />
                        </Row>
                    </div>
                </Fragment>
            );
    }
}
export default Forum;
