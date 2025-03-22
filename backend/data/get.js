const Data = require("../models/Data");

exports.getData = async (req, res) => {
    try {
        const title = req.query.title;
        const data = await Data.findOne({ name: title });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json({ data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllData = async (req, res) => {
    try {
        const data = await Data.find({}) || [{ title: "No Data Found" }];
        // console.log(data);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}