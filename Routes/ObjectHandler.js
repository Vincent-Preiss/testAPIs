const fs = require("fs");
class ObjectHandler {
  constructor(path) {
    this.path = path;
    this.objects = JSON.parse(fs.readFileSync(`./data/${path}`));

    this.findNewId = () => {
      let newId = 1;
      while (true) {
        let isWorkingId = true;
        for (let object of this.objects) {
          if (object.id === newId) {
            isWorkingId = false;
          }
        }
        if (isWorkingId) {
          return newId;
        } else {
          newId += 1;
        }
      }
    };
  }

  createObject(req, res) {
    const newId = this.findNewId();
    const newObject = Object.assign({ id: newId }, req.body);
    this.objects.push(newObject);
    return fs.writeFile(
      `./data/${this.path}`,
      JSON.stringify(this.objects),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            object: newObject,
          },
        });
      }
    );
  }

  getAllObjects(req, res) {
    res.status(200).json({
      status: "success",
      results: this.objects.length,
      data: {
        objects: this.objects,
      },
    });
  }

  getSpecificObject(req, res) {
    const id = req.params.id * 1;
    const object = this.objects.find((el) => el.id === id);
    if (!object) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        object,
      },
    });
  }

  updateObject(req, res) {
    const id = req.params.id * 1;

    const object = this.objects.find((el) => el.id === id);
    if (!object) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id",
      });
    }
    const updatedObject = { ...object, ...req.body };
    const indexOfObject = this.objects.indexOf(object);
    if (indexOfObject > -1) {
      this.objects.splice(indexOfObject, 1);
    }
    this.objects.push(updatedObject);
    fs.writeFile(`./data/${this.path}`, JSON.stringify(this.objects), (err) => {
      res.status(200).json({
        status: "success",
        data: {
          updatedObject,
        },
      });
    });
  }

  deleteObject(req, res) {
    const id = req.params.id * 1;
    const object = this.objects.find((el) => el.id === id);
    if (!object) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id",
      });
    }
    const indexOfObject = this.objects.indexOf(object);
    if (indexOfObject > -1) {
      this.objects.splice(indexOfObject, 1);
    }
    fs.writeFile(`./data/${this.path}`, JSON.stringify(this.objects), (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    });
  }
}

module.exports = ObjectHandler;
