import { NextFunction, Request, Response } from "express";
import { HOST, PORT } from "../config/config";
import { Item } from "../models/Item";

class ItemsController {
  async index(request: Request, response: Response, next: NextFunction) {
    Item.find()
      .then((items) => {
        // return response.json(items);
        const serializedItems = items.map((item) => {
          return {
            id: item._id,
            title: item.title,
            image_url: `http://${HOST}:${PORT}/uploads/${item.image}`,
          };
        });

        // console.log('returning items', serializedItems);

        return response.json(serializedItems);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default ItemsController;
