"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: 3306,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Watcha49265",
    database: process.env.MYSQL_DATABASE || "oxbidKrub",
    entities: [user_entity_1.User],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map