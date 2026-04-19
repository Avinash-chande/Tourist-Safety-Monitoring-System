//asyncHandler catches async errors automatically and sends them to Express error middleware
//or try/catch bar bar use nhi krna padta

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
export default asyncHandler
