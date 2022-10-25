import { Base } from "./base/Base.entity";
import { User } from "./user.entity";
import { Bid } from "./bid.entity";
export declare class AuctionItem extends Base {
    itemName: string;
    itemCatagory: string;
    startingPrice: number;
    minOffer: number;
    startDate: Date;
    endDate: Date;
    WinnerId: string;
    reviewScore: number;
    status: number;
    user: User;
    bids: Bid[];
}
