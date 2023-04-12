const catchWrapServiceDb = require("../helper/catchWrapService");
const userStore = require("../storage/user");

const userService = {
    Create: catchWrapServiceDb(`service.user.create`,userStore.create),
    Update: catchWrapServiceDb(`service.user.update`,userStore.update),
    GetById: catchWrapServiceDb(`service.user.getById`,userStore.getById),
    Delete: catchWrapServiceDb(`service.user.delete`,userStore.delete)
}

module.exports = userService;