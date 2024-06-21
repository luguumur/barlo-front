import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import https from "https";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
    try {
        if (req.method === 'POST'){
            try {
              const secretKey = process.env.capchakey;
          
              const { gRecaptchaToken } = req.body;
            
              let response;
          
              const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
              try {
                response = await axios.post(
                    "https://www.google.com/recaptcha/api/siteverify",
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
                console.log(response)
                if (response && response.data?.success && response.data?.score > 0.5) {
                    console.log("res.data?.score:", response.data?.score);
                    return res.json({
                        success: true,
                        score: response.data.score,
                    });
                } else {
                    return res.json({ success: false });
                }
                } catch (e) {
                    return res.status(400).json({ success: false })
                }
            
            } catch (error) {
              console.log(error)
              res.status(500).json({ message: 'Internal Server Error.', error: error });
            }
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error:any) {
        const erroradetail = new Error(error);
        res.status(400).json({ success: false, error: erroradetail.message });
    }
}
