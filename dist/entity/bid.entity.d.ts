import { Base } from "./base/Base.entity";
import { User } from "./user.entity";
import { AuctionItem } from "./auctionItem.entity";
export declare class Bid extends Base {
    Price: number;
    time: Date;
    user: User;
    auctionItem: AuctionItem;
}
