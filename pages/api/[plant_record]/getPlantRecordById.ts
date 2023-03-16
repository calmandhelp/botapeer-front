// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreatePostFormData, PlantRecordResponse } from 'botapeer-openapi/typescript-axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, {errors as formidableErrors} from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlantRecordResponse>
) {

  const { plant_record } = req.query;
  const plantRecordId = plant_record?.toString() ?? "";

  if (req.method?.toLowerCase() === 'get') {

      const plantRecordResponse = {
        id: 1,
        title: "開発用生育記録",
        alive: 1,
        endDate: undefined,
        createdAt: "2023-02-17T15:46:35+09:00",
        updatedAt: "2023-02-17T15:46:35+09:00",
        place: {
            id: 1,
            name: "リビング"
        },
        posts: [
            {
                id: 1,
                plantRecordId: Number(plantRecordId),
                title: "初めての投稿",
                article: "初めての投稿です。よろしくお願いします。",
                imageUrl: "/images/green.jpg",
                status: 1,
                createdAt: "2023-02-17T15:46:35+09:00",
                updatedAt: "2023-02-17T15:46:35+09:00"
            },
            {
              id: 2,
              plantRecordId: Number(plantRecordId),
              title: "芽が出ました",
              article: "徐々に芽がでてきましたー",
              imageUrl: "/images/fairy.jpg",
              status: 1,
              createdAt: "2023-02-17T15:46:35+09:00",
              updatedAt: "2023-02-17T15:46:35+09:00"
          },
          {
            id: 3,
            plantRecordId: Number(plantRecordId),
            title: "芽が出ました",
            article: "徐々に芽がでてきましたー",
            imageUrl: "/images/image1.jpg",
            status: 1,
            createdAt: "2023-02-17T15:46:35+09:00",
            updatedAt: "2023-02-17T15:46:35+09:00"
        },
        {
          id: 4,
          plantRecordId: Number(plantRecordId),
          title: "芽が出ました",
          article: "徐々に芽がでてきましたー",
          imageUrl: "/images/kiiro.jpg",
          status: 1,
          createdAt: "2023-02-17T15:46:35+09:00",
          updatedAt: "2023-02-17T15:46:35+09:00"
      }
          ]
      };

      res.status(200).json(plantRecordResponse)
  }
}