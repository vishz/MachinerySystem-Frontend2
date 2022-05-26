import { notifyMessage } from '../constants/commonFunc';
import { CommonMessage } from '../constants/commonMessage';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import * as EmailValidator from 'email-validator'

const WEB_SITE_REGEX = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const ZOOM_REGEX = /^https:\/\/company\.zoom\.us\/j\/\S*\?pwd=[^\s;]*$/;
const WEB_ADDRESS_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const validateLogin = (state) => {
  if (state.email.trim() === '') {
    return false;
  }
  if (state.password.trim() === '') {
    return false;
  }
  return true;
}

export async function getConvertedUTCDateTIme(dateStart, dateEnd) {
  if (dateStart !== null && dateEnd !== null) {
    let pub = (new Date((dateStart).format().toString().split('T')[0] + " 00:00:00").toISOString()).split('.')[0] + "Z";
    let ex = (new Date((dateEnd).format().toString().split('T')[0] + " 23:59:59").toISOString()).split('.')[0] + "Z";
    return {
      dateStart: pub,
      dateEnd: ex
    }
  }
  return null
}

export async function getConvertedUTCEndDateTIme(dateEnd) {
  if (dateEnd !== null) {
    let ex = (new Date((dateEnd).format().toString().split('T')[0] + " 23:59:59").toISOString()).split('.')[0] + "Z";
    return ex
  }
  return null
}

export async function getConvertedUTCStartDateTIme(dateStart) {
  if (dateStart !== null) {
    let ex = (new Date((dateStart).format().toString().split('T')[0] + " 00:00:00").toISOString()).split('.')[0] + "Z";
    return ex
  }
  return null
}

export const getTimeDifferenceWithUTC = () => {
  let timezoneOffset = new Date().getTimezoneOffset();
  let hours = (Math.abs(timezoneOffset) / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  if (timezoneOffset < 0) {
    let time_difference = "+" + rhours + ":" + rminutes;
    return time_difference;
  } else {
    let time_difference = "-" + rhours + ":" + rminutes;
    return time_difference;
  }
};

export const validateCreateClass = (state) => {
  console.log(state)
  if (state.className.trim() === '') {
    notifyMessage(CommonMessage.CLASS_NAME_EMPTY, 0, 3);
    return false;
  }
  if (state.fee.trim() === '' || state.fee < 1) {
    notifyMessage(CommonMessage.CLASS_FEE_EMPTY, 0, 3);
    return false;
  }
  if (state.maxLimit.trim() === '' || state.maxLimit < 1) {
    notifyMessage(CommonMessage.CLASS_LIMIT_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.educationMeterial)) {
    notifyMessage(CommonMessage.CLASS_EDUCATION_METERIAL_EMPTY, 0, 3);
    return false;
  }
  if (state.description.trim() === '') {
    notifyMessage(CommonMessage.CLASS_DESCRIPTION_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.video)) {
    notifyMessage(CommonMessage.CLASS_VIDEO_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.link)) {
    notifyMessage(CommonMessage.CLASS_LINK_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.feedBackFormUrl)) {
    notifyMessage(CommonMessage.CLASS_FEEDBACK_URL_EMPTY, 0, 3);
    return false;
  }
  if (state.teacherFirstName.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_FIRST_NAME_EMPTY, 0, 3);
    return false;
  }
  if (state.teacherLastName.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_LAST_NAME_EMPTY, 0, 3);
    return false;
  }
  if (!EmailValidator.validate(state.teacherEmail)) {
    notifyMessage(CommonMessage.TEACHER_EMAIL_EMPTY, 0, 3);
    return false;
  }
  if (!isPossiblePhoneNumber(state.teacherContact)) {
    notifyMessage(CommonMessage.TEACHER_MOBILE_NUMBER_EMPTY, 0, 3);
    return false;
  }
  if (state.education.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_EDUCATION_EMPTY, 0, 3);
    return false;
  }
  if (state.base64.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_IMAGE_EMPTY, 0, 3);
    return false;
  }
  return true
}

export const validateUpdateClass = (state) => {
  if (state.className.trim() === '') {
    notifyMessage(CommonMessage.CLASS_NAME_EMPTY, 0, 3);
    return false;
  }
  if (state.fee === '' || state.fee < 1) {
    notifyMessage(CommonMessage.CLASS_FEE_EMPTY, 0, 3);
    return false;
  }
  if (state.maxLimit === '' || state.maxLimit < 1) {
    notifyMessage(CommonMessage.CLASS_LIMIT_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.educationMeterial)) {
    notifyMessage(CommonMessage.CLASS_EDUCATION_METERIAL_EMPTY, 0, 3);
    return false;
  }
  if (state.description.trim() === '') {
    notifyMessage(CommonMessage.CLASS_DESCRIPTION_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.video)) {
    notifyMessage(CommonMessage.CLASS_VIDEO_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.link)) {
    notifyMessage(CommonMessage.CLASS_LINK_EMPTY, 0, 3);
    return false;
  }
  if (!WEB_ADDRESS_REGEX.test(state.feedBackFormUrl)) {
    notifyMessage(CommonMessage.CLASS_FEEDBACK_URL_EMPTY, 0, 3);
    return false;
  }
  if (state.teacherFirstName.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_FIRST_NAME_EMPTY, 0, 3);
    return false;
  }
  if (state.teacherLastName.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_LAST_NAME_EMPTY, 0, 3);
    return false;
  }
  if (!EmailValidator.validate(state.teacherEmail)) {
    notifyMessage(CommonMessage.TEACHER_EMAIL_EMPTY, 0, 3);
    return false;
  }
  if (!isPossiblePhoneNumber(state.teacherContact)) {
    notifyMessage(CommonMessage.TEACHER_MOBILE_NUMBER_EMPTY, 0, 3);
    return false;
  }
  if (state.education.trim() === '') {
    notifyMessage(CommonMessage.TEACHER_EDUCATION_EMPTY, 0, 3);
    return false;
  }
  if (state.image === '') {
    notifyMessage(CommonMessage.TEACHER_IMAGE_EMPTY, 0, 3);
    return false;
  }
  return true
}

export const validateSearch = (state) => {
  if (state.searchValue === 0) {
    notifyMessage(CommonMessage.SEARCH_EMPTY, 0, 3);
    return false;
  }
  return true;
}


