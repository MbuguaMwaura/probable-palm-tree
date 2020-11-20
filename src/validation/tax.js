import * as Yup from "yup";

export const taxSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, " Description must not be longer that 100 characters")
        .required("Please enter tax name"),
    value: Yup.number()
        .min(1, "Must not be less than 1")
        .max(100, "Value must not be greater than 100")
        .required("Please enter tax value"),
    chargeModeId: Yup.number()
        .min(1, "Please select charging mode")
        .required("Please select type of charging mode")
});