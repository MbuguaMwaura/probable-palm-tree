import * as Yup from "yup";

export const nameDescriptionSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, "Name must not be longer that 100 characters")
        .required("Please enter name"),
    description: Yup.string()
        .min(3, "Description must  contain 3 or more characters")
        .max(200, "Description must not be longer that 100 characters")
        .required("Please enter description")
});