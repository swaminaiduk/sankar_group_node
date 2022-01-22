import { Merchant } from "../models/brand";
import { BaseRepositorie } from "./BaseRepositorie";

class MerchantRepositorie extends BaseRepositorie {
    constructor() {
        super(Merchant);
    }

    public findByCode = async (code) => {
        return await this.model.findOne({
            code: code
        });
    }
}

export default new MerchantRepositorie();