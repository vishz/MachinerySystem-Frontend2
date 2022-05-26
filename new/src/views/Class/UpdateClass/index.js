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
import { createClass, notifyMessage, getCountryCode, getCountryName, updateClass } from '../../../constants/commonFunc';
import Service from '../../../service/class'
import * as DropDownConst from "../../../constants/DropDown-Const";
import moment from "moment"
import * as config from '../../../constants/constants'
import { validateUpdateClass } from '../../../constants/validation'
import { connect } from "react-redux";
import TimeRange from 'react-time-range';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const classString = strings.Class;
const student = strings.Student;


class UpdateClass extends Component {
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
        teacherID: '',
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
        teachers: [],
        classId: '',
        selectedTeacherID: ''
    }

    componentDidMount() {
        let ageRange = []
        let one = this.props.classData.ageRange.split(",")[0]
        let two = this.props.classData.ageRange.split(",")[1]
        ageRange.push(parseInt(one))
        ageRange.push(parseInt(two))
        this.setState({
            classId: this.props.classData.id,
            selectedTeacherID: this.props.classData.teacher.id,
            className: this.props.classData.className,
            classSubject: this.props.classData.language,
            date: moment(),
            classDay: this.props.classData.day,
            classStartTime: moment(this.props.classData.startTime),
            classEndTime: moment(this.props.classData.endTime),
            classStartTime: this.props.classData.startTime,
            UTCEndTime: this.props.classData.endTime,
            fee: this.props.classData.fee,
            maxLimit: this.props.classData.maxLimit,
            description: this.props.classData.description,
            educationMeterial: this.props.classData.educationMaterial,
            ageRange: ageRange,
            video: this.props.classData.videoUrl,
            link: this.props.classData.zoomLink === null ? '' : this.props.classData.zoomLink,
            feedBackFormUrl: this.props.classData.feedBackFormUrl === undefined ? '' : this.props.classData.feedBackFormUrl === null ? '' : this.props.classData.feedBackFormUrl,
            teacherID: this.props.classData.teacher.firstName + " " + this.props.classData.teacher.lastName,
            teacherFirstName: this.props.classData.teacher.firstName,
            teacherLastName: this.props.classData.teacher.lastName,
            teacherEmail: this.props.classData.teacher.email,
            teacherContact: this.props.classData.teacher.mobileNumber,
            education: this.props.classData.teacher.education,
            country: this.props.classData.teacher.country,
            image: this.props.classData.teacher.profileImage,
            filePreview: this.props.classData.teacher.profileImage,
            tempImage: this.props.classData.teacher.profileImage,
            countryCode: getCountryCode(this.props.classData.teacher.country,)
        })
    }

    validateHandler = (status) => {
        if (validateUpdateClass(this.state)) {
            this.formSubmit(status);
        }
    }

    formSubmit = async (status) => {
        this.props.loader(true)
        await Service.update_class(updateClass(this.state))
            .then(response => {
                if (response.data.success) {
                    // this.props.history.push(config.BASE_URL +`class`)
                    this.props.history.goBack()
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
            ...this.state.search,
            [elem.target.name]: value
        })
    }

    onDropDownHandler = (elem, type) => {
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
                        tempImage: value.profileImage
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
                teacherFirstName: '',
                teacherLastName: '',
                teacherEmail: '',
                teacherContact: '',
                country: '',
                education: '',
                image: '',
                tempImage: ''
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
            classEndTime: elem.endTime
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
            feedBackFormUrl

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
                        <Label className={"headline"} >Class Information</Label>
                        {/* <Row>
                            <Col>
                                <FormGroup>
                                    <Label className="subHeadline" for='location'>Class Status</Label>
                                    <Select
                                        classNamePrefix='select'
                                        options={DropDownConst.classStatus}
                                        defaultValue={DropDownConst.classStatus[0]}
                                        onChange={(e) => this.onDropDownHandler(e, 'status')}
                                        isLoading={false}
                                        isClearable={false}
                                        placeholder={'Select status'}
                                        value={[{
                                            label: classStatus,
                                            value: classStatus
                                        }]}
                                    />
                                </FormGroup>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.name} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.name}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={className}
                                        name={'className'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='location'>{classString.subject}</Label>
                                    <Select
                                        classNamePrefix='select'
                                        options={DropDownConst.classSubject}
                                        defaultValue={DropDownConst.classSubject[0]}
                                        onChange={(e) => this.onDropDownHandler(e, 'classSubject')}
                                        isLoading={false}
                                        isClearable={false}
                                        placeholder={'Select subject'}
                                        value={[{
                                            label: classSubject,
                                            value: classSubject
                                        }]}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Label className={"headline mt-4"} >Shedule Date</Label>
                        <Row>
                            <Col xl='6' md='6' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='location'>Day <span className={'requiredStar'}>*</span></Label>
                                    <Select
                                        classNamePrefix='select'
                                        options={DropDownConst.day}
                                        defaultValue={DropDownConst.day[0]}
                                        onChange={(e) => this.onDropDownHandler(e, 'classDay')}
                                        isLoading={false}
                                        isClearable={false}
                                        placeholder={'Select Day'}
                                        value={[{
                                            label: classDay,
                                            value: classDay
                                        }]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='6' md='6' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='location'>Time (Indian Standard Time (IST) <span className={'requiredStar'}>*</span></Label>
                                    <TimeRange
                                        className='time-range-picker'
                                        startMoment={classStartTime}
                                        endMoment={classEndTime}
                                        onChange={(elem) => this.timeRangeHandler(elem)}
                                        minuteIncrement={1}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col xl='6' md='6' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='closing date'>{classString.date} <span
                                        className={'requiredStar'}>*</span></Label>
                                    <br />
                                    <DatePicker
                                        className={'date-picker'}
                                        onChange={(e) => this.onDateHandler(e, 'date')}
                                        // disabledDate={this.disabledDate}
                                        value={moment(date)}
                                        placeholder={classString.date}
                                        allowClear={false}
                                    />
                                </FormGroup>
                            </Col> */}

                        </Row>
                        <Row>
                            {/* <Col xl='6' md='6' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.duration}<span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.duration}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={duration}
                                        name={'duration'}

                                    />
                                </FormGroup>
                            </Col> */}
                            <Col xl='4' md='4' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.fee} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='number'
                                        id='title'
                                        placeholder={classString.fee}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={fee}
                                        name={'fee'}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='4' md='4' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.max}<span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='number'
                                        id='title'
                                        placeholder={classString.max}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={maxLimit}
                                        name={'maxLimit'}
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
                                        value={educationMeterial}
                                        name={'educationMeterial'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col xl='12' md='12' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.educationMeterial}<span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.educationMeterial}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={educationMeterial}
                                        name={'educationMeterial'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col xl='12' md='12' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='product description'>{classString.description} <span className={'requiredStar'}>*</span></Label>
                                    <Input type='textarea' name='productDescription' id='product description' rows='5'
                                        placeholder={classString.description} name={'description'}
                                        // value={form.description} onChange={this.onInputHandler}
                                        // className={form.description.length >= config.WORD_LIMIT || state.validation.description ? 'input-error' : ''}
                                        maxLength={250}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={description}
                                        name={'description'}
                                    />
                                    <span
                                        className={`description-text-limit ${description.length >= config.WORD_LIMIT ? 'description-text-limit-error' : null}`}>{description.length}/250</span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl='12' md='12' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{classString.age} {ageRange[0] + `-` + ageRange[1]}<span className={'requiredStar'}> *</span></Label>
                                    <Range
                                        allowCross
                                        draggableTrack
                                        value={ageRange}
                                        onChange={(e) => this.onRangeHandler(e)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <Label className="subHeadline" for='closing date'>{classString.video} <span
                                    className={'requiredStar'}>*</span></Label>
                                <a target={'_blank'} href={video}>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={classString.video}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={video}
                                        name={'video'}
                                        className='video-tag'
                                    // value={this.state.updateData.fname}
                                    />
                                </a>
                            </Col>
                        </Row>
                        < br />
                        <Row>
                            <Col md='12'>
                                <Label className="subHeadline" for='closing date'>{classString.link} <span
                                    className={'requiredStar'}>*</span></Label>
                                <Input
                                    type='text'
                                    id='title'
                                    placeholder={classString.link}
                                    autoComplete="off"
                                    onChange={this.onInputHandler}
                                    value={link}
                                    name={'link'}
                                // value={this.state.updateData.fname}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md='12'>
                                <Label className="subHeadline" for='closing date'>{classString.feedBackFormUrl} <span
                                    className={'requiredStar'}>*</span></Label>
                                <Input
                                    type='text'
                                    id='title'
                                    placeholder={classString.feedBackFormUrl}
                                    autoComplete="off"
                                    onChange={this.onInputHandler}
                                    value={feedBackFormUrl}
                                    name={'feedBackFormUrl'}
                                />
                            </Col>
                        </Row>
                        <Label className={"headline mt-4"} >Teacher Information</Label>
                        <Row>
                            <Col xl='12' md='12' sm='12'>
                                <FormGroup>
                                    <Label className="subHeadline" for='company'>{classString.teacher} </Label>
                                    <Select
                                        classNamePrefix='select'
                                        options={teacherList}
                                        // defaultValue={DropDownConst.classSubject[0]}
                                        onChange={(e) => this.onDropDownHandler(e, 'teacherID')}
                                        isLoading={false}
                                        isClearable={true}
                                        placeholder={'Select teacher'}
                                        value={[{
                                            label: teacherID,
                                            value: teacherID
                                        }]}
                                        name={'teacherID'}
                                        isDisabled={true}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr ></hr>
                        <Row>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{student.fname} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={student.fname}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={teacherFirstName}
                                        name={'teacherFirstName'}
                                    // value={this.state.updateData.fname}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{student.lname} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={student.lname}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={teacherLastName}
                                        name={'teacherLastName'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{student.email} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={student.email}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        value={teacherEmail}
                                        // value={this.state.updateData.fname}
                                        name={'teacherEmail'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{student.number} <span className={'requiredStar'}>*</span></Label>
                                    <PhoneInput
                                        placeholder="Mobile number"
                                        value={teacherContact}
                                        onChange={(e) => this.newPhoneNumberHandler(e, 'teacherContact')}
                                        defaultCountry={'LK'}
                                        className={''}
                                        international
                                        countryCallingCodeEditable={false}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{"Education"} <span className={'requiredStar'}>*</span></Label>
                                    <Input
                                        type='text'
                                        id='title'
                                        placeholder={"Education"}
                                        autoComplete="off"
                                        onChange={this.onInputHandler}
                                        name={'education'}
                                        value={education}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                                <FormGroup>
                                    <Label className="subHeadline" for='title'>{"Country"} <span className={'requiredStar'}>*</span></Label>
                                    <ReactFlagsSelect
                                        selected={this.state.countryCode}
                                        onSelect={countryCode => this.countryDropDownSelector(countryCode)}
                                        className="react-select"
                                        showSelectedLabel={true}
                                        selectedSize={15.5}
                                        fullWidth={false}
                                        showSecondarySelectedLabel={true}
                                        selectButtonClassName={"CountryDropdown"}
                                        showSecondaryOptionLabel={true}
                                    // placeholder={'All Countries'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6'>
                                <Label className="subHeadline" for='closing date'>{classString.image} <span
                                    className={'requiredStar'}>*</span></Label>
                                <Files
                                    className='file-browser files-dropzone-file'
                                    onChange={this.onFilesChange}
                                    accepts={["image/png", "image/jpg", "image/jpeg"]}
                                    multiple={false}
                                    maxFileSize={10485760}
                                    minFileSize={0}
                                    // onError={error => {
                                    //     common.notifyMessage(error.msg, 0, 3)
                                    // }}
                                    clickable
                                >
                                    <File size={15} className={'selected-file-preview'} />
                                    <span className={'selected-add-file-preview'}>
                                        {
                                            // state.form.filePreview !== '' ? '...' + state.form.filePreview.substring (state.form.filePreview.length - 15) : ' Choose file or Drag and drop here'
                                            this.state.image !== '' ? <>
                                                <a href={this.state.tempImage} target={'_blank'}>View
                                                    File</a>
                                                <span
                                                    className={'remove-add-file'}
                                                    onClick={() => this.removeAttachment("image")}>Remove</span></> : ' Choose file'
                                        }
                                    </span>
                                </Files>
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
                                size={15} /> Update</Button>
                    </CardFooter>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    classData: state.user.classData
});

const mapDispatchToProps = (dispatch) => ({
    loader: (data) => dispatch({ type: "LOADER", value: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClass);
