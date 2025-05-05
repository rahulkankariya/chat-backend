module.exports = {
    successResponse: (res, data, message = "Success") => {
        res.status(200).json({ status: 200, message, data });
    },
    failedResponse: (res, data, message = "failed") => {
        res.status(200).json({ status: 200, message, data });
    },
    errorResponse: (res, message = "Something went wrong", status = 500, data = null) => {
        res.status(status).json({ status, message, data });
    }
};
