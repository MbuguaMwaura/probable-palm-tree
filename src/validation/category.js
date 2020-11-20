import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, "Name must not be longer that 100 characters")
        .required("Please enter category name"),
    description: Yup.string()
        .min(3, "Description must  contain 3 or more characters")
        .max(200, "Description must not be longer that 100 characters")
        .required("Please category description"),
    image: Yup.mixed()
        .required("Please set a category image")
        .test('fileFormat','File not a valid image. Accepted types(gif,jpeg,png)',(value)=>{
            return value && ['image/gif', 'image/jpeg', 'image/png','image.jpg'].includes(value.type)
        })
});