const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const cfg = require("./index");
const log = require("./logger");

const userService = require("../service/user");
const PROTO_URL = __dirname + "/../protos/user_service/user_service.proto";

const packageDefinition = protoLoader.loadSync(PROTO_URL, {
    keepCase:true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const userProto =
    grpc.loadPackageDefinition(packageDefinition).user_service;

let server = new grpc.Server();
server.addService(userProto.UserService.service,userService);

server.bindAsync(
    "0.0.0.0:" + cfg.RPCPort,
    grpc.ServerCredentials.createInsecure(),
    (err,bindPort) => {
        if(err) {
            throw new Error("Error while binding grpc server to the port")
        }

        log.info("grpc server is running at %s",bindPort);
        server.start()
    }
)
