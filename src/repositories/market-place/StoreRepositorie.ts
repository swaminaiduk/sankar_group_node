import { MarketPlaceCategory, MarketPlaceStore } from "../../models";
import { generateUniqueNumber } from "../../utils";
import { BaseRepositorie } from "../BaseRepositorie";

class StoreRepositorie extends BaseRepositorie {
    constructor() {
        super(MarketPlaceStore);
    }

    public findByStoreId = async (store_id) => {
        return await this.model.findOne({
            store_id: store_id
        });
    }

    public generateUniqueStoreId = async () => {
        const store_id = 'STR' + generateUniqueNumber().toString();
        const store = await this.findByStoreId(store_id);
        if (store === null) {
            return store_id;
        } else {
            return this.generateUniqueStoreId();
        }
    }

    public dropdown = async () => {
        const categorySetting = await MarketPlaceCategory.find({ status: true }).select('title').exec();
        return categorySetting.map((category) => {
            return {
                value: category.title,
                label: category.title
            };
        })
    }
}

export default new StoreRepositorie();