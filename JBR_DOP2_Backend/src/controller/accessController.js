class accessController {
    getRole (req, res) {
        try {
            return res.json({message: `ok`});
        } catch (e) {
            console.info(e);
            res.status(400).json({message: `not ok`});
        }
    }

    hello (req, res) {
        try {
            return res.json({message: 'Hello!'});
        } catch (e) {
            console.info(e);
            res.status(400).json({message: `Couldn't get main page`});
        }
    }
}

module.exports = new accessController();
