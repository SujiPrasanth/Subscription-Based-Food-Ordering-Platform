import express from 'express'
import { dashboarddetails } from '../controllers/dashboardcontoller.js'

const router =express.Router()

router.get('/dashboarddetails',dashboarddetails)

export default router