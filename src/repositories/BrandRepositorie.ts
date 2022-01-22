import { Brand } from "../models/brand";
import { BaseRepositorie } from "./BaseRepositorie";
class BrandRepositorie extends BaseRepositorie {
    constructor() {
        super(Brand);
    }
    public brandOptions = async () => {
        const brandOptions = await Brand.find({ status: true }).select(['brand']).exec();
        return brandOptions.map((c) => {
            return {
                value: c._id,
                label: `${c.brand}`
            };
        })
    }
    public getBrandName = async (filter) => {
        const brandName = await this.model.find(filter).select('brand').exec()
        return brandName[0]?.brand
    }
    public brandCount = async () => {
        return await this.model.count()
    }

}

export default new BrandRepositorie();