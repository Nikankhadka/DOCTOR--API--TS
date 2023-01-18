import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authVerification = async (req:Request, res:Response, next:NextFunction) => {
    const{ authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'You must be logged in' });
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'test', async (err, payload) => {
        if (err) return res.status(401).json({ error: 'You must be logged in' });
        const { id } = payload;
        const user = await User.findById(id);
        req.user = user;
        next();
    }
    )
}

