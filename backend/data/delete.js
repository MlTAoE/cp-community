const Data = require("../models/Data");


exports.deleteData = async (req, res) => {
    try {
        const title = req.body.title;
        console.log("Title:", title);
        const data = await Data.findOneAndDelete({ title });
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json({ message: "Data deleted successfully", data });
    }
    catch (err) {
        console.log("Delete Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}