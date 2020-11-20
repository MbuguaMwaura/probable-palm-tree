import * as Yup from "yup";

export const subCategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, "Name must not be longer that 100 characters")
        .required("Please enter sub-category name"),
    description: Yup.string()
        .min(3, "Description must  contain 3 or more characters")
        .max(200, "Description must not be longer that 100 characters")
        .required("Please enter sub-category description"),
    commodityCategoryId: Yup.number()
        .min(1, "Category not selected")
        .required("Please select a category"),
    image: Yup.mixed()
        .required("Please set a sub-category image")
        .test('fileFormat','File not a valid image. Accepted types(gif,jpeg,png)',(value)=>{
            return value && ['image/gif', 'image/jpeg', 'image/png','image.jpg'].includes(value.type)
        })
});