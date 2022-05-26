import { message } from "antd"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Countries from "../locals/countries.json";
import moment from "moment"
import Cookies from 'js-cookie'
import { Cookie } from '../constants/Storage-Cookie/Cookie';

const MySwal = withReactContent(Swal);

export const notifyMessage = (msg, type, duration) => {
  let msgType = "error"
  if (type === 0) {
    msgType = "error"
  } else if (type === 1) {
    msgType = "warning"
  } else if (type === 2) {
    msgType = "success"
  }

  message[msgType](msg === undefined || msg === null ? "Something went wrong !" : msg, duration === undefined ? 2 : duration)
}

export const loginAdmin = (data) => {
  return {
    username: data.email,
    password: data.password,
    grant_type: 'password'
  }
}

export const createClass = (data) => {
  return {
    code: data.machineCode ,
    name: data.machineName,
    dailyRentalFee: data.rental
  }
}

export const updateClass = (data) => {
  return {
    id: data.classId,
    className: data.className,
    language: data.classSubject,
    classStatus: data.classStatus,
    day: data.classDay,
    startTime: data.UTCStartTime,
    endTime: data.UTCEndTime,
    fee: data.fee,
    videoUrl: data.video,
    zoomLink: data.link,
    feedBackFormUrl: data.feedBackFormUrl,
    educationMaterial: data.educationMeterial,
    description: data.description,
    ageRange: data.ageRange.join(),
    maxLimit: data.maxLimit,
    teacher: {
      id: data.selectedTeacherID,
      profileImage: (data.image === null || data.image.preview === undefined) ? "" : data.base64,
      firstName: data.teacherFirstName,
      lastName: data.teacherLastName,
      email: data.teacherEmail,
      mobileNumber: data.teacherContact,
      education: data.education,
      country: data.countryName
    }
  }
}

export const classStatusChange = (data) => {
  return {
    id: data.id
  }
}

export const dashboardDateFilter = (data) => {
  return {
    from: moment(data.dateStart)._i,
    to: moment(data.dateEnd)._i
  }
}

export const classFilter = (data) => {
  return {
    className: data.searchValue,
    classStatus: data.classStatus,
    language: data.classLanguage,
    day: data.classDay
  }
}

export const studentFilter = (data) => {
  return {
    name: data.searchValue,
    country: data.studentCountry,
    status: data.studentStatus,
    from: data.studentStartDate,
    to: data.studentEndDate
  }
}

export const alert = (e) => {
  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-outline-secondary ml-1",
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.value) {
      Cookies.remove(Cookie.ACCESSTOKEN, '')
      Cookies.remove(Cookie.REFRESHTOKEN, '')
      Cookies.remove(Cookie.ADMINOBJECT, '')
      Cookies.remove(Cookie.USERROLE, '')
      Cookies.remove(Cookie.ALERT, '')
      this.props.onLogout(e);
    }
  })
}

export const getCountryName = (countryCode) => {
  const countries = Countries;
  for (const c of countries) {
    if (c.alpha2Code === countryCode) {
      return c.name;
    }
  }
}

export const getCountryCode = (country) => {
  const countries = Countries;
  for (const c of countries) {
    if (c.name === country) {
      return c.alpha2Code;
    }
  }
}

export const removeCookiesValues = async () => {
  await Cookies.remove(Cookie.ACCESSTOKEN, '')
  await Cookies.remove(Cookie.REFRESHTOKEN, '')
  await Cookies.remove(Cookie.ADMINOBJECT, '')
  await Cookies.remove(Cookie.USERROLE, '')
  await Cookies.remove(Cookie.ALERT, '')
};



