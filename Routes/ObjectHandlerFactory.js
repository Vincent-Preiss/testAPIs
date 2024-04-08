const ObjectHandler = require("./ObjectHandler");
function objectHandlerFactory(app, path, objectName) {
  let objectHandler = new ObjectHandler(path);
  const createObject = objectHandler.createObject.bind(objectHandler);
  const getAllObjects = objectHandler.getAllObjects.bind(objectHandler);
  const getSpecificObject = objectHandler.getSpecificObject.bind(objectHandler);
  const updateObject = objectHandler.updateObject.bind(objectHandler);
  const deleteObject = objectHandler.deleteObject.bind(objectHandler);

  app.route(`/api/v1/${objectName}`).post(createObject).get(getAllObjects);
  app
    .route(`/api/v1/${objectName}/:id`)
    .get(getSpecificObject)
    .patch(updateObject)
    .delete(deleteObject);
}

module.exports = objectHandlerFactory;
