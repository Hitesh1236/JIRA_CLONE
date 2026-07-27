class AppError extends Error {
    constructor (message,status){
        super(message)
        this.statusCode = status
        this.status = `${status}`.startsWith('4') ? "fail" : "error"
        this.isOperational = true
    }
}

export default AppError