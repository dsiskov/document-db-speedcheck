import express, { Request, Response } from 'express'
import find from './controller/find'

const router = express.Router()

router.get(
  '/project-settings/:projectId',
  async (req: Request, res: Response) => {
    const { data } = await find({ projectId: req.params.projectId })
    res.json({ data: data })
  }
)

export default router
