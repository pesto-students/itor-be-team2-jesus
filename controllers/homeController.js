//this all is for testing purpose

exports.home = async (req, res) => {
    // const db = await something()
    try {
        // const db = await something()

        res.status(200).json({
            success: true,
            greeting: "this is another home route",
        });
    } catch (error) {
        console.log(error);
    }
};

exports.homeDummy = async (req, res) => {
    try {
        // const db = await something()

        res.status(200).json({
            success: true,
            greeting: "this is another dummy route",
        });
    } catch (error) {
        console.log(error);
    }
};
