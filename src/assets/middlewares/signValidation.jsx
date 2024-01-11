import * as Yup from 'yup'

export const signValidation = Yup.object({
    name: Yup.string().max(50, 'الرجاء ادخال اقل من 50 حرف')
    .min(3, "الرجاء ادخال اكثر من 3 حروف")
    .required("الرجاء ادخال كلمة المرور"),
    email: Yup.string().email("الرجاء ادخال بريد الكتروني صحيح")
    .required("الرجاء ادخال البريد الاكتروني"),
    password: Yup.string().min(6, "الرجاء ادخال اكثر من 6 خانات")
    .required('الرجاء ادخال الرمز'),
    confirmPassword: Yup.string().required('الرجاء اعادة كتابة الرمز').oneOf([Yup.ref('password')], 'كلمة المرور غير مطابقة')
})