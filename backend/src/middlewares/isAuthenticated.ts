import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface PayLoad{
  sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(" ")
  const JWT_SECRET = 'dc02b67afa24d3cd376fab5605d6b22d'

  try {
    const { sub } = verify(
      token,
     JWT_SECRET
    ) as PayLoad

    req.user_id = sub

    return next()
    
  } catch (error) {
    res.status(401).end()    
  }
 

}