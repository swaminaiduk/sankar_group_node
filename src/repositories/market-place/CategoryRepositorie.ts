import { MarketPlaceCategory } from "../../models";
import { generateUniqueNumber } from "../../utils";
import { BaseRepositorie } from "../BaseRepositorie";

class CategoryRepositorie extends BaseRepositorie {
    constructor() {
        super(MarketPlaceCategory);
    }

    public findByCategoryId = async (category_id) => {
        return await this.model.findOne({
            category_id: category_id
        });
    }

    public generateUniqueCategoryId = async () => {
        const category_id = 'CAT' + generateUniqueNumber().toString();
        const category = await this.findByCategoryId(category_id);
        if (category === null) {
            return category_id;
        } else {
            return this.generateUniqueCategoryId();
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

export default new CategoryRepositorie();