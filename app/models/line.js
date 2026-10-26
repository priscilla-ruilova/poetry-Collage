const mongoose = require('mongoose')

const LineSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: false
        },
        line: {
            type: String,
            required: true
        }
    }
)

const PoetryLine = mongoose.model("line", LineSchema);

module.exports = PoetryLine;