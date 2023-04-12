const catchWrapDb = require("../helper/catchWrapDb");
const User = require("../models/user");

let NAMESPACE = "storage.user";

let userStore = {
    create: catchWrapDb(`${NAMESPACE}.create`, async(data) => {
        const user = new User(data);
        const response = await user.save()

        return response;
    }),
    update: catchWrapDb(`${NAMESPACE}.update`,async(data) => {
        const user = await User.updateOne(
            {
                id: data.id
            },
            {
                $set: data
            }
        );
        return user;
    }),
    getById: catchWrapDb(`${NAMESPACE}.getById`,async(data) => {
        const user = await User.findOne({id: data.id});
        return user;
    }),
    delete: catchWrapDb(`${NAMESPACE}.delete`,async(data) => {
        const user = await User.findByIdAndDelete(data.id);
        return user;
    })
};

module.exports = userStore;