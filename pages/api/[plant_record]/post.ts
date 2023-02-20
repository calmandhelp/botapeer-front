// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreatePostFormData, PostResponse } from 'botapeer-openapi/typescript-axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, {errors as formidableErrors} from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {

  const { plant_record } = req.query;
  const plantRecordId = plant_record?.toString() ?? "";

  if (req.method?.toLowerCase() === 'post') {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        if (err.code === formidableErrors.maxFieldsExceeded) {

        }
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }

      const {formData} = fields;

      const parsedFormData: CreatePostFormData = JSON.parse(formData.toString());

      const post = {
        id: 100,
        plantRecordId: parseInt(plantRecordId),
        title: parsedFormData.title,
        article: parsedFormData.article,
        image_url: "/images/green.jpg",
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      res.status(200).json(post)
    });
  }
}