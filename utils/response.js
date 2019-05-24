class sendResponse {
    
    errorMsg(res, status, message, error) {
        console.log(error)
        return res.status(status).json({ message: message })
    }
    
    successMsg (res, status, data, message) {
        return res.status(status).json({ message: message, data: data })
    }
    
    customMsg (res, status, message){
     return res.status(status).json({ message: message })
    }
}
module.exports = new sendResponse();