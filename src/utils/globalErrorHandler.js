const globalErrorHandler = (err, _, res) => {
    res.status(err.status || 500).json({ message: err.message, error: err.errors });
};

export default globalErrorHandler;
