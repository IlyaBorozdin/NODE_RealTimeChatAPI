const getHandler = (req, res, next) => {
    try {
        return res.status(200).render('chat', req.params);
    }
    catch (err) {
        return res.status(404).json({ error: 'Page Not Found' });
    }
};

module.exports = getHandler;