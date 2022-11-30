const { Parkir } = require("../models");

class indexController {
  static async input(req, res, next) {
    try {
      let body = {
        type: req.body.type,
        entrance: req.body.entrance,
        exit: req.body.exit,
      };
      console.log(body);
      const ent = new Date(body.entrance);
      const ext = new Date(body.exit);
      const parkTime = ext.getTime() - ent.getTime();
      const seconds = Math.floor((parkTime / 1000) % 60);
      const minutes = Math.floor(parkTime / 1000 / 60);
      const minute = Math.floor((parkTime / 1000 / 60) % 60);
      const hours = Math.floor(minutes / 60);
      const hour = hours % 24;
      const days = Math.floor(hours / 24);
      const waktu = `${days} Hari : ${hour} Jam : ${minute} Menit : ${seconds} Detik `;
      let fee = 0;

      if (body.type == "Car") {
        if (days > 0) {
          fee = days * 80000 + hour * 5000;
        } else {
          if (hour == 0) {
            fee = 5000;
          } else if (hour > 0 && minute < 1) {
            fee = hour * 5000;
          } else if (hour > 0 && minute > 0) {
            fee = hour * 5000 + 5000;
          }
        }
      } else if (body.type == "Motorcycle") {
        if (days > 0) {
          fee = days * 40000 + hour * 2000;
        } else {
          if (hour == 0) {
            fee = 2000;
          } else if (hour > 0 && minute < 1) {
            fee = hour * 2000;
          } else if (hour > 0 && minute > 0) {
            fee = hour * 2000 + 2000;
          }
        }
      }

      console.log(fee);
      let { data } = await Parkir.create({
        type: body.type,
        entrance: body.entrance,
        exit: body.exit,
        time: waktu,
        fee,
      });
      res.status(201).json({
        message: `Success create data`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getData(req, res, next) {
    try {
      let type = req.query.type;
      const options = {};
      if (type) options.where = { type };
      const data = await Parkir.findAll(options);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = indexController;
