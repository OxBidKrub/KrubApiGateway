"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class Base extends typeorm_1.BaseEntity {
}
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], Base.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Base.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Base.prototype, "updatedAt", void 0);
exports.Base = Base;
//# sourceMappingURL=Base.entity.js.map