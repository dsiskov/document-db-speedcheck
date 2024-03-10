import express, { Request, Response } from 'express'
import {
  find as findPrjSettings,
  insertBulk,
} from './controller/projectSettings'

const router = express.Router()

router.get(
  '/project-settings/:projectId',
  async (req: Request, res: Response) => {
    const { data } = await findPrjSettings({ projectId: req.params.projectId })
    res.json({ data: data })
  }
)

router.post(
  '/project-settings/insertBulk',
  async (req: Request, res: Response) => {
    const { idOffset, count, batchSize } = req.body

    await insertBulk(idOffset, count, batchSize)
    return res
      .status(200)
      .json({ message: `Bulk insert ${count} records performed successfully!` })
  }
)

export default router
