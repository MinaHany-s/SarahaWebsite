
const dataMethods = ["body", "query", "params", "headers", "file", "files"];


const validate = (schema) => {
    return (req, res, next) => {
        dataMethods.forEach((key) => {
            if (schema[key]) {
                const { error } = schema[key].validate(req[key] || {}, { abortEarly: false })
                if (error) {
                    console.log(req.path)
                    return res.redirect(`${req.path}?error=${error}`)
                }
            }
        })

        next()
    }

}
export default validate