import { Request, Response, Router } from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils/utils'
const router = Router()

router.get('/', (_req, res: Response) => {
  res.send(diaryServices.getEntriesWithouSensitiveInfo())
})

router.get('/:id', (req: Request, res: Response) => {
  const diary = diaryServices.findById(+req.params.id)

  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);

    res.json(addedDiaryEntry);
  } catch (error) {
   res.status(400).send(error.message || 'Error Desconocido');  
  }
});

export { router }
