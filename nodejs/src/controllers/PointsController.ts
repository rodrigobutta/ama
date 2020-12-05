import { NextFunction, Request, Response } from "express";
import { HOST, PORT } from "../config/config";
import ElementNotFoundError from "../exceptions/ElementNotFoundError";
import { Point } from "../models/Point";

class PointsController {
  async index(request: Request, response: Response, next: NextFunction) {
    const { city, uf, items } = request.query;

    // const parsedItems = String(points)
    // .split(',')
    // .map(item => Number(item.trim()));

    Point.find()
      .then((points) => {
        const serializedPoints = points.map((point: any) => {
          return {
            id: point._id,
            ...point.toJSON(),
            image_url: `http://${HOST}:${PORT}/uploads/${point.image}`,
          };
        });

        return response.json(serializedPoints);
      })
      .catch((err) => {
        next(err);
      });
  }

  async show(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    Point.findById(id, (err, point) => {
      if (point) {
        const res = {
          id: point._id,
          ...point.toJSON(),
          image_url: `http://${HOST}:${PORT}/uploads/${point.image}`,
        };
        return response.json(res);
      }
      return next(new ElementNotFoundError());
    }).catch((err) => {
      next(err);
    });
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    try {
      const point = new Point({
        image: request.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      });

      point
        .save()
        .then(() => {
          return response.status(201).json({
            status: "Created",
            _id: point._id,
          });
        })
        .catch((err) => {
          return next(err);
        });
    } catch (error) {
      return next(error);
    }
  }
}

export default PointsController;
