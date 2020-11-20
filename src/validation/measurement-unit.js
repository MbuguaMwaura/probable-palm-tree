import * as Yup from "yup";

export const measurementUnitSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, "Name must not be longer that 100 characters")
        .required("Please enter category name"),
    description: Yup.string()
        .min(3, "Description must  contain 3 or more characters")
        .max(200, "Description must not be longer that 100 characters")
        .required("Please category description"),
    measurementMetricId: Yup.number()
        .min(1, "Measurement metric not selected")
        .required("Please select a measurement metric"),
});