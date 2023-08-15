const getHandler = (req, res, next) => {
    try {
        res.status(200).render('chat/chat', req.query);
    }
    catch (err) {
        return res.status(404).json({ error: 'Page Not Found' });
    }
};

module.exports = getHandler;