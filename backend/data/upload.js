const Data = require("../models/Data");

exports.uploadData = async (req, res) => {
    try {
        const { title, description, tags, date, time, links } = req.body;

        const existingData = await Data.findOne({ title });
        if (existingData) {
            return res.status(400).json({ message: "Title already exists" });
        }

        const data = new Data({ title, description, tags, date, time, links });
        await data.save();
        // console.log("Data Added: ", data);
        res.status(201).json({
            message: "Data Added successfully",
            data: { id: data._id, title: data.title, description: data.description, tags: data.tags, date: data.date, time: data.time, links: data.links }
        });
    }
    catch (err) {
        console.log("Upload Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}