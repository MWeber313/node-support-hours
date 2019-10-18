module.exports = (req, res, next) => {
    if (req.user.department === "administration") {
        next();
    } else {
        res.status(403).json({message: "You do not have administrative privileges to view this endpoint!"})
    }
}