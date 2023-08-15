function getHandler(path) {
    return (req, res, next) => {
        const { name, room } = req.query;

        if (name && room) {
            return next();
        }
        
        try {
            return res.status(200).sendFile(path);
        } catch (err) {
            return res.status(404).json({ error: 'Page Not Found' });
        }
    };    
}

module.exports = getHandler;