const express = require('express')
const mongoose = require('mongoose')
const Report = mongoose.model('Reports')
const router = express.Router()

router.post('/report',(req,res) => {
    const {reporter_id, reporter_name, message, subject, product_id} = req.body
    const report = new Report({
        reporter_id,
        reporter_name,
        message,
        subject,
        product_id
    })
    report.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})
module.exports = router