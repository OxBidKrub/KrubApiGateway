import { User } from "./entity/user.entity"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: 3306,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Watcha49265",
    database: process.env.MYSQL_DATABASE || "oxbidKrub",
    entities: [User],
    logging: true,
    synchronize: true,
})