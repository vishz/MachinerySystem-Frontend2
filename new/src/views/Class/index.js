import React, { Component } from 'react';
import {
    Col,
    Row,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    Badge,
    FormGroup
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import * as TableColConst from '../../constants/Table-Const'
import { Trash, Edit, Plus, Eye } from 'react-feather'
import { Link } from "react-router-dom"
import { DatePicker, Switch } from 'antd';
import Select from "react-select"
import Service from '../../service/class'
import moment from "moment"
import * as DropDownConst from "../../constants/DropDown-Const";
import * as config from '../../constants/constants'
import { classStatusChange, alert, notifyMessage, classFilter } from '../../constants/commonFunc';
import { validateSearch } from '../../constants/validation'
import { CommonMessage } from '../../constants/commonMessage';
import { connect } from "react-redux";
import Cookies from 'js-cookie'
import { Cookie } from '../../constants/Storage-Cookie/Cookie';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as userActions from '../../store/domain/student/action';
import strings from "../../locals/string.json";
import Pagination from '../../components/pagination/Pagination'
const MySwal = withReactContent(Swal);
const classString = strings.Class;

class Class extends Component {
    state = {
        data: [],
        pageNo: 0,
        pageSize: 10,
        searchValue: 0,
        classLanguage: 0,
        classDay: 0,
        classStatus: 0,
        totalPageCount: 0,
        currentPage: 0,
        totalElements: 0,
        totalPages: 0,
        startElement: 0,
        numberOfElements: 0
    }

    componentDidMount() {
        this.classSummery()
    }

    classSummery = async () => {
        this.props.loader(true)
        await Service.classsummary()
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        data: response.data.body
                    })
                }
            })
            .finally(fin => {
                this.props.loader(false)
            })
    }

    classSummeryFilter = async () => {
        this.props.loader(true)
        const { pageNo, pageSize } = this.state
        await Service.class_summery_filter(pageNo, pageSize, classFilter(this.state))
            .then(response => {
                // if (response.data.success) {
                //     this.setState({
                //         data: response.data.body.content,
                //         totalPageCount: response.data.body.totalPages,
                //         currentPage: response.data.body.number,
                //         totalElements: response.data.body.totalElements,
                //         totalPages: response.data.body.totalPages,
                //         startElement: response.data.body.pageable.offset,
                //         numberOfElements: response.data.body.numberOfElements
                //     })
                // }
            })
            .finally(fin => {
                this.props.loader(false)
            })
    }

    onDropDownHandler = (elem, data) => {
        if (elem.value !== null) {
            const obj = {
                value: elem.value,
                id: data.id
            }
            this.classStatusChangeHandler(obj)
        }
    };

    onDropDownHandlerFilter = (elem, type) => {
        if (elem !== null) {
            let value = elem.value;
            this.setState({
                ...this.state,
                [type]: value
            });
        }
    }

    onInputHandler = (elem, type) => {
        let value = elem.target.value;
        this.setState({
            ...this.state,
            [elem.target.name]: value
        })
    }

    filterHandler = async (type) => {
        if (type === config.SEARCH) {
            if (validateSearch(this.state)) {
                await this.setState({
                    pageNo: 0,
                    pageSize: 10,
                })
                this.classSummeryFilter()
            }
        } else {
            await this.setState({
                pageNo: 0,
                pageSize: 10,
            })
            this.classSummeryFilter()
        }
    }

    classStatusChangeHandler = async (data) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!",
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn btn-outline-secondary ml-1",
            },
            buttonsStyling: false,
        }).then(async (result) => {
            if (result.value) {
                console.log(data)
                this.props.loader(true)
                await Service.change_status(classStatusChange(data))
                    .then(async response => {
                        if (response.data.success) {
                            notifyMessage(response.data.body, 2, 3);
                            this.classSummery();
                        } else {
                            notifyMessage(response.data.body, 0, 3)
                        }
                    })
                    .finally(fin => {
                        this.props.loader(false)
                    })
            }
        })
    }

    updateHandler = (val) => {
        this.props.setClassData(val);
    }

    badgeStatusHandler(status) {
        switch (status) {
            case 'ACTIVE':
                return { color: 'success', text: 'Inactive', title: 'INACTIVE' };
                break;
            case 'INACTIVE':
                return { color: 'secondary', text: 'Active', title: 'ACTIVE' };
                break;
            case 'DELETED':
                return { color: 'danger', text: '', title: '' };
                break;
            default:
                return { color: '', text: '', title: '' }
                break;
        }
    }


    paginationRowsChange = async (e) => {
        await this.setState({
            ...this.state,
            pageSize: parseInt(e.target.value),
            pageNo: 0
        })

        this.classSummeryFilter();
    }

    handlePagination = async (val) => {
        await this.setState({
            ...this.state,
            pageNo: (val - 1)

        })
        this.classSummeryFilter();
    };

    clearAll = async () => {
        await this.setState({
            pageNo: 0,
            pageSize: 10,
            searchValue: 0,
            classLanguage: 0,
            classDay: 0,
            classStatus: 0
        })
        this.classSummeryFilter();
    }

    render() {
        const { classDay, classLanguage, searchValue, classStatus } = this.state
        let allData = []
        this.state.data.map((val, index) => {
            allData.push({
                machineName: val.name,
                machineCode: val.code,
                rental: val.dailyRentalFee,
                actions: (<div style={{ display: 'flex' }}>
                    <Button className='btn-icon mr-1' color='primary' tag={Link} to={'class-update'} onClick={() => this.updateHandler(val)}>
                        <Edit size={16} />
                    </Button>
                    <Button className='btn-icon mr-1' color='primary' onClick={() => this.classStatusChangeHandler(val)}>
                        <Trash size={16} />
                    </Button>
                </div>)
            })
        })
        return (
            <>
                <Card>
                    <div className={"ml-2 mt-1"}>
                        <Row>
                            {/* <Col md="2" className={'mt-1'}>
                                <Label for='title'>Language</Label>
                                <br />
                                <Select
                                    classNamePrefix="select"
                                    name="userId"
                                    options={DropDownConst.classSubjectFilter}
                                    isLoading={false}
                                    defaultValue={DropDownConst.classSubjectFilter[0]}
                                    onChange={(e) => this.onDropDownHandlerFilter(e, 'classLanguage')}
                                    placeholder={'Select Language'}
                                    value={[{
                                        label: classLanguage === 0 ? 'All' : classLanguage,
                                        value: classLanguage === 0 ? 'All' : classLanguage
                                    }]}
                                />
                            </Col>
                            <Col md="2" className={'mt-1'}>
                                <Label>Class Day</Label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    name="loading"
                                    options={DropDownConst.dayFilter}
                                    isLoading={false}
                                    defaultValue={DropDownConst.dayFilter[0]}
                                    value={[{
                                        label: classDay === 0 ? 'All' : classDay,
                                        value: classDay === 0 ? 'All' : classDay
                                    }]}
                                    onChange={(e) => this.onDropDownHandlerFilter(e, 'classDay')}
                                    placeholder={'Type'}
                                // isClearable={true}
                                />
                            </Col>
                            <Col md="2" className={'mt-1'}>
                                <Label>Status</Label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    name="loading"
                                    options={DropDownConst.allClassStatus}
                                    isLoading={false}
                                    defaultValue={DropDownConst.allClassStatus[0]}
                                    value={[{
                                        label: classStatus === 0 ? 'All' : classStatus,
                                        value: classStatus === 0 ? 'All' : classStatus
                                    }]}
                                    onChange={(e) => this.onDropDownHandlerFilter(e, 'classStatus')}
                                    placeholder={'Type'}
                                // isClearable={true}
                                />
                            </Col>
                            <Col md="1" className="mt-4 pt-2">
                                <Button
                                    color={"primary"}
                                    // className={"btn-tender-filter"}
                                    onClick={() => this.filterHandler(config.SELECT)}
                                >
                                    &nbsp;Filter&nbsp;
                                </Button>
                            </Col> */}
                            <div className='mt-4' style={{ }}>
                                <Button
                                    color={"primary"}
                                    // className={"btn-tender-filter"}
                                    onClick={() => console.log("press")}
                                    tag={Link}
                                    to={'class-add'}
                                >
                                    <Plus
                                        size={15} />   Add
                                </Button>
                            </div>
                        </Row>
                    </div>
                    {/* <div className={"ml-2 mt-2"}>
                        <Row className={"mt-1"}>
                            <Col md="6" xs="6">
                                <Input
                                    type="text"
                                    placeholder={classString.enterClassName}
                                    name={'searchValue'}
                                    value={searchValue === 0 ? '' : searchValue}
                                    onChange={this.onInputHandler}
                                    autocomplete="off"
                                />
                            </Col>
                            <Col md="1">
                                <Button
                                    color={"primary"}
                                    onClick={() => this.filterHandler(config.SEARCH)}
                                >
                                    Search
                                </Button>
                            </Col>
                            <Col md="1">
                                <Button
                                    color={"secondary"}
                                    onClick={() => this.clearAll()}
                                >
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </div> */}
                    <CardBody className="tbl">
                        <MDBDataTableV5
                            hover
                            entriesOptions={[10, 25, 50, 100]}
                            entries={10}
                            data={{
                                columns: TableColConst.classColumns,
                                rows: allData
                            }}
                            searchBottom={false}
                            paging={false}
                            responsive
                            responsiveLg
                            responsiveMd
                            responsiveSm
                            responsiveXl
                            sortable={false}
                        // onPageChange={(e) => this.paginationChange(e)}
                        />
                    </CardBody>
                </Card>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setClassData: data => dispatch(userActions.setClassData(data)),
    loader: (data) => dispatch({ type: "LOADER", value: data })
});

export default connect(null, mapDispatchToProps)(Class);
