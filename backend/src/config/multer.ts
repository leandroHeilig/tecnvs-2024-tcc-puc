import crypto from 'crypto'
import { extname, resolve } from 'path'
import multer from 'multer'

export default {
  upload(folder: string) {
    return {
      Storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (reques, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const filename = `${fileHash}-${file.originalname}`

          return callback(null,filename)
        }
      })
    }
  }
}


