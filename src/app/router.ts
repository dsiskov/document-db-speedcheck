import express, { Request, Response } from 'express'
import {
  find as findPrjSettings,
  insertBulk,
  update,
} from './controller/projectSettings'
import { ProjectSettings } from './model/project-settings'

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

router.put('/pm/:projectId', async (req: Request, res: Response) => {
  await update(req.params.projectId, req.body as ProjectSettings)
  return res.status(200).json({
    message: `Document for project ${req.params.projectId} was updated successfully!`,
  })
})

export default router
