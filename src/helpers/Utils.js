import { defaultDirection } from "../constants/defaultValues";
import _ from "lodash";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key], B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

export const getItemIndexByProp = (value, arr, prop) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i
    }
  }
  return -1;
}

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '.' + mm + '.' + yyyy;
}

export const getCurrentTime=()=>{
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes()
}

export const getDirection = () => {
  let direction = defaultDirection;
  if (localStorage.getItem("direction")) {
    const localValue = localStorage.getItem("direction");
    if (localValue === "rtl" || localValue === "ltr") {
      direction = localValue;
    }
  }
  return {
    direction,
    isRtl: direction === "rtl"
  };
};

export const setDirection = localValue => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  localStorage.setItem("direction", direction);
};

export const getAccessToken = () =>{
  const token = '9df31524-596b-46e2-97fa-180ff5bde67f';
  return token;
}

export const setFormValues = (selectedItems, items, modalState) =>{
  let id = selectedItems[0]
  const filteredItem = _.filter(items, function (o){return o.id === id})
  const selectedItem = filteredItem ? filteredItem[0]: null

  return selectedItem
}

export const handleChange = (option, form, field) =>{
  form.setFieldValue(field.name, option.value)
  form.setFieldTouched(field.name, true)
}

export const convertImageToBase64 = (image) =>{
  const img = new Image()
  img.src = image
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  canvas.height = image.width
  canvas.width = image.height
  ctx.drawImage(image, 0, 0)
  const base64Image = canvas.toDataURL(image.type)
  return base64Image
}

export const getBase64 = (file,callback) =>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result)
  };
  reader.onerror = function (error) {
    //return null
    console.log("Error:" + error)
  };
}




