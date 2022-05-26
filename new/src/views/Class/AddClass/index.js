import React, { Component } from 'react';
import {
    Col,
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
    CardFooter
} from "reactstrap";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select"
import { DatePicker, Switch } from 'antd';
import 'rc-slider/assets/index.css';
import strings from "../../../locals/string.json";
import { File } from 'react-feather'
import Files from 'react-files'
import Button from "reactstrap/es/Button"
import { StopCircle, Save } from 'react-feather'
import ReactFlagsSelect from "react-flags-select";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Countries from "../../../locals/countries.json";
import { isPossiblePhoneNumber, } from 'react-phone-number-input';
import { createClass, notifyMessage, getCountryCode, getCountryName } from '../../../constants/commonFunc';
import Service from '../../../service/class'
import * as DropDownConst from "../../../constants/DropDown-Const";
import moment from "moment"
import * as config from '../../../constants/constants'
import { validateCreateClass } from '../../../constants/validation'
import { connect } from "react-redux";
import TimeRange from 'react-time-range';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const classString = strings.Class;
const student = strings.Student;


class Class extends Component {
    state = {
        classStatus: 'ACTIVE',
        className: '',
        classSubject: 'ENGLISH',
        date: moment(),
        classDay: 'MONDAY',
        classStartTime: moment(),
        classEndTime: moment().add(1, 'hour'),
        UTCStartTime: '',
        UTCEndTime: '',
        fee: '',
        duration: '',
        maxLimit: '',
        description: '',
        educationMeterial: '',
        ageRange: [5, 10],
        video: '',
        link: '',
        feedBackFormUrl: '',
        teacherID: {},
        teacherFirstName: '',
        teacherLastName: '',
        teacherEmail: '',
        teacherContact: '',
        education: '',
        country: '',
        image: '',
        filePreview: '',
        tempImage: '',
        countryCode: 'LK',
        countryName: 'Sri Lanka',
        base64: '',
        teachers: [
            {
                "id": 1,
                "firstName": "Reshan",
                "lastName": "Maduka",
                "country": null,
                "mobileNumber": null,
                "registerDate": "2022-02-28T09:07:18.000+05:30",
                "email": "reshanmaduka615@gmail.com",
                "status": "ACTIVE",
                "emailVerified": true
            }
        ],
        machineName: '',
        machineCode: '',
        rental: ''
    }

    componentDidMount() {
        // this.findTeacherByNameHandler()
    }

    validateHandler = (status) => {
        // if (validateCreateClass(this.state)) {
            this.formSubmit(status);
        // }
    }

    formSubmit = async (status) => {
        this.props.loader(true)
        await Service.create_class(createClass(this.state))
            .then(response => {
                if (response.data.success) {
                    notifyMessage(response.data.body, 2, 3);
                } else {
                    notifyMessage(response.data.body, 0, 3);
                }
            })
            .finally(fin => {
                this.props.loader(false)
            })
    }

    findTeacherByNameHandler = async () => {
        await Service.find_teacher_by_name()
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        teachers: response.data.body
                    })
                }
            })
    }

    onDateHandler = async (elem, type) => {
        if (elem !== null) {
            let value = elem._d
            this.setState({
                ...this.state,
                [type]: moment(value),
            })
        }
    }

    onInputHandler = (elem, type) => {
        let value = elem.target.value;
        this.setState({
            ...this.state,
            [elem.target.name]: value
        })
    }

    onDropDownHandler = (elem, type) => {
        console.log(elem, type)
        if (elem !== null) {
            if (elem.value !== null) {
                let value = elem.value;
                if (type === "teacherID") {
                    this.setState({
                        ...this.state,
                        [type]: value,
                        teacherFirstName: value.firstName,
                        teacherLastName: value.lastName,
                        teacherEmail: value.email,
                        teacherContact: value.mobileNumber === null ? '' : value.mobileNumber,
                        country: value.country === null ? '' : value.country,
                        education: value.education,
                        image: value.profileImage,
                        tempImage: value.profileImage,
                        base64: value.profileImage
                    });
                } else {
                    this.setState({
                        ...this.state,
                        [type]: value
                    });
                }
            }
        }

        if (elem === null && type === "teacherID") {
            this.setState({
                ...this.state,
                teacherID: {},
                teacherFirstName: '',
                teacherLastName: '',
                teacherEmail: '',
                teacherContact: '',
                country: '',
                education: '',
                image: '',
                tempImage: '',
                base64: ''
            });
        }
    };

    newPhoneNumberHandler = (e, type) => {
        if (e !== undefined) {
            this.setState({
                ...this.state,
                [type]: e
            })
        } else {
            this.setState({
                ...this.state,
                [type]: ''
            })
        }
    }

    onFilesChange = async files => {
        if (files.length !== 0) {
            const file = files[0];
            this.getBase64(file).then((data) => {
                this.setState({
                    ...this.state,
                    image: file,
                    filePreview: file.name,
                    tempImage: file.preview.url,
                    base64: data
                });
            });
        }
    };

    timeRangeHandler = async (elem) => {
        this.setState({
            ...this.state,
            classStartTime: elem.startTime,
            classEndTime: elem.endTime,
            UTCStartTime: moment(moment() + ' ' + elem.startTime)._i.split(" ")[1],
            UTCEndTime: moment(moment() + ' ' + elem.endTime)._i.split(" ")[1]
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }



    fileReader = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        // this.setState({
        //     ...this.state,
        //     base64: reader.result
        // });
    }


    removeAttachment = (status) => {
        if (status === "image") {
            this.setState({
                ...this.state,
                image: ''
            })
        }
    }

    countryDropDownSelector = (countryCode) => {
        let countryName;
        if (countryCode !== '') {
            countryName = getCountryName(countryCode);
            this.setState({
                countryCode: countryCode,
                countryName: countryName
            })
        } else {
            countryName = '';
            this.setState({
                countryCode: countryCode,
                countryName: countryName
            })
        }
    }

    onRangeHandler = (e) => {
        this.setState({
            ...this.state,
            ageRange: e
        })
    }

    onInputHandlerTeacher = async (elem) => {
        await this.setState({
            teacherID: elem,
        })

        // this.findTeacherByNameHandler(elem)
    }

    render() {
        const {
            classStatus,
            className,
            classSubject,
            date,
            fee,
            duration,
            maxLimit,
            description,
            ageRange,
            video,
            teacherID,
            teacherFirstName,
            teacherLastName,
            teacherEmail,
            teacherContact,
            country,
            image,
            education,
            educationMeterial,
            teachers,
            classDay,
            classStartTime,
            classEndTime,
            link,
            feedBackFormUrl,
            machineCode,machineName,rental
        } = this.state
        let teacherList = [];
        teachers.map((val, index) => {
            teacherList.push({
                value: val,
                label: val.firstName
            })
        })
        console.log(this.state)
        return (
            <>
                <Card>
                    <CardBody>
                        <Label className={"headline"} >Machine Information</Label>
                        <Row>
                            <Col xl='4' md='4' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.fee} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.fee}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={machineName}
                                        name={'machineName'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='4' md='4' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.max}<span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.max}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={machineCode}
                                        name={'machineCode'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='4' md='4' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.educationMeterial}<span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.educationMeterial}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={rental}
                                        name={'rental'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter align={'right'}>
                        <Button color={'secondary'}
                            onClick={() => this.props.history.goBack()}
                        >
                            <StopCircle
                                size={15} /> Cancel</Button>
                        <Button
                            color={'primary'}
                            className={'ml-1'}
                            onClick={() => this.validateHandler(config.CLOSE)}
                        ><Save
                                size={15} /> Save</Button>
                       
                    </CardFooter>
                </Card>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loader: (data) => dispatch({ type: "LOADER", value: data })
});

export default connect(null, mapDispatchToProps)(Class);
