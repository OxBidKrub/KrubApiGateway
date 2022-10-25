"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Base_entity_1 = require("./base/Base.entity");
const user_entity_1 = require("./user.entity");
const auctionItem_entity_1 = require("./auctionItem.entity");
let Bid = class Bid extends Base_entity_1.Base {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], Bid.prototype, "Price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Date)
], Bid.prototype, "time", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.bids),
    tslib_1.__metadata("design:type", user_entity_1.User)
], Bid.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => auctionItem_entity_1.AuctionItem, (auctionItem) => auctionItem.bids),
    tslib_1.__metadata("design:type", auctionItem_entity_1.AuctionItem)
], Bid.prototype, "auctionItem", void 0);
Bid = tslib_1.__decorate([
    (0, typeorm_1.Entity)('bid')
], Bid);
exports.Bid = Bid;
//# sourceMappingURL=bid.entity.js.map