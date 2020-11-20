import * as Yup from "yup";

export const commoditySchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must  contain 3 or more characters")
        .max(100, "Name must not be longer that 100 characters")
        .required("Please enter commodity name"),
    description: Yup.string()
        .min(3, "Description must  contain 3 or more characters")
        .max(200, "Description must not be longer that 100 characters")
        .required("Please enter commodity description"),
    commoditySubCategoryId: Yup.number()
        .min(1, "Sub-Category not selected")
        .required("Please select a sub-category"),
    marketPriceMeasurementUnitId: Yup.number()
        .min(1, "Market price measurement unit not selected")
        .required("Please select a market price measurement unit"),
    tradeStatisticsMeasurementUnitId: Yup.number()
        .min(1, "Trade Statistics measurement unit not selected"),
    image: Yup.mixed()
        .required("Please set a commodity image")
        .test('fileFormat','File not a valid image. Accepted types(gif,jpeg,png)',(value)=>{
            return value && ['image/gif', 'image/jpeg', 'image/png','image.jpg'].includes(value.type)
        })
});