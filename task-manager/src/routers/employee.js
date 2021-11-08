const express = require('express')
const Employee = require('../models/employee')

const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/employee', auth, async(req, res) => {
    
    const employee = new Employee({
        ...req.body,
        owner: req.user._id
    })

    try {
        await employee.save()
        res.status(201).send(employee)
    } catch (e) {
        res.status(400).send(error)
    }
})


// GET  /employee?completed=true
// GET  /employee?limit=10&skip=0
// GET  /employee?sortBy=createdAt:desc
router.get('/employee', auth, async(req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }

    try {
        await req.user.populate({
            path: 'employee',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.employee)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/employee/:id', auth, async(req, res) => {

    try {
        const employee = await Employee.findOne({ _id: req.params.id, owner: req.user._id })

        if (!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/employee/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpadtes = ['completed', 'name']
    const isValidOperation = updates.every((update) => allowedUpadtes.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const employee = await Employee.findOne({ _id: req.params.id, owner: req.user._id })

        if (!employee) {
            return res.status(404).send()
        }
        updates.forEach(update => { employee[update] = req.body[update] })
        await employee.save()
        res.send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/employee/:id', auth, async(req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router