"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionItem = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Base_entity_1 = require("./base/Base.entity");
const user_entity_1 = require("./user.entity");
const bid_entity_1 = require("./bid.entity");
let AuctionItem = class AuctionItem extends Base_entity_1.Base {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuctionItem.prototype, "itemName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuctionItem.prototype, "itemCatagory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AuctionItem.prototype, "startingPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AuctionItem.prototype, "minOffer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Date)
], AuctionItem.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Date)
], AuctionItem.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], AuctionItem.prototype, "WinnerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Number)
], AuctionItem.prototype, "reviewScore", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AuctionItem.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.auctionItems),
    tslib_1.__metadata("design:type", user_entity_1.User)
], AuctionItem.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => bid_entity_1.Bid, (bid) => bid.auctionItem),
    tslib_1.__metadata("design:type", Array)
], AuctionItem.prototype, "bids", void 0);
AuctionItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('auctionItem')
], AuctionItem);
exports.AuctionItem = AuctionItem;
//# sourceMappingURL=auctionItem.entity.js.map