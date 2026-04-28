//asyncHandler catches async errors automatically and sends them to Express error middleware
//or try/catch bar bar use nhi krna padta

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
export default asyncHandler

//this is another method of using try catch
// const asyncHandle = (fn) => async (req, res, next) => {
//     try {
//         await fu(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: err.message
//         })

//     }

// }
