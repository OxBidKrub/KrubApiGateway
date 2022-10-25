"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Base_entity_1 = require("./base/Base.entity");
let User = class User extends Base_entity_1.Base {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(6, 20),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "money", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(10, 10),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "address", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map