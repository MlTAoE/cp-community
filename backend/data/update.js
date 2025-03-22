const Data = require("../models/Data");

exports.updateData = async (req, res) => {
    try {
        const { title, description, tags, date, time, links } = req.body;

        const data = await Data.findOneAndUpdate({ title }, { description, tags, date, time, links }, { new: true });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json({ message: "Data updated successfully", data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
