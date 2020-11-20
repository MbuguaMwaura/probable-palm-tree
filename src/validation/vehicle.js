import * as Yup from "yup";

export const vehicleTypeSchema = Yup.object().shape({
    vehicleTypeName: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, " Description must not be longer that 100 characters")
        .required("Please enter vehicle type name")
});