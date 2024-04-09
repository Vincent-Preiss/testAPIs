const ObjectHandler = require("./ObjectHandler");
function objectHandlerFactory(path, objectRouter) {
  let objectHandler = new ObjectHandler(path);
  const createObject = objectHandler.createObject.bind(objectHandler);
  const getAllObjects = objectHandler.getAllObjects.bind(objectHandler);
  const getSpecificObject = objectHandler.getSpecificObject.bind(objectHandler);
  const updateObject = objectHandler.updateObject.bind(objectHandler);
  const deleteObject = objectHandler.deleteObject.bind(objectHandler);

  objectRouter.route("/").post(createObject).get(getAllObjects);
  objectRouter
    .route("/:id")
    .get(getSpecificObject)
    .patch(updateObject)
    .delete(deleteObject);
}

module.exports = objectHandlerFactory;
