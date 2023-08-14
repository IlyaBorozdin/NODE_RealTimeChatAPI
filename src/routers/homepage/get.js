function getHandler(path) {
    return (req, res, next) => {
        try {
            res.status(200).sendFile(path);
        } catch (err) {
            res.status(404).json({ error: 'Page Not Found' });
        }
    };    
}

module.exports = getHandler;