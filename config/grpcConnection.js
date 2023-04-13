// Import necessary packages and modules
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const cfg = require("./index");
const log = require("./logger");
const userService = require("../service/user");

// Define path to user service proto file
const PROTO_URL = __dirname + "/../protos/user_service/user_service.proto";

// Load user service proto file using protoLoader
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
    keepCase:true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// create a Javascript object from the packageDefinition
const userProto =
    grpc.loadPackageDefinition(packageDefinition).user_service;

// create a new gRPC server instance and add user service implementation to it
let server = new grpc.Server();
server.addService(userProto.UserService.service,userService);

// Bind server to specified port and start it
server.bindAsync(
    "0.0.0.0:" + cfg.RPCPort, // Bind server to specified port
    grpc.ServerCredentials.createInsecure(), // Use insecure credentials
    (err,bindPort) => { // Callback function to execute when server is bound to port
        if(err) {
            throw new Error("Error while binding grpc server to the port")
        }

        // log message indicating that server is running
        log.info("grpc server is running at %s",bindPort);
        // start the server
        server.start()
    }
)
