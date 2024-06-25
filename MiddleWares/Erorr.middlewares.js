const error = async (req, res, next,err) => {
    console.error(err.message);
    res.status(500).json({data: null, message: "Internal Server Error", errors: null});
}
module.exports = { error }
 