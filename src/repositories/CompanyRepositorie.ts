import { Company } from "../models";
import { BaseRepositorie } from "./BaseRepositorie";

class CompanyRepositorie extends BaseRepositorie {
    constructor() {
        super(Company);
    }
    public companyNames = async () => {
        const compList = await Company.find({ status: true }).select(['company']).exec();
        return compList.map((c) => {
            return {
                value: c._id,
                label: `${c.company}`
            };
        })
    }
    public getCompanyName = async (filter) => {
        const companyName = await this.model.find(filter).select('company').exec()
        return companyName[0]?.company
    }
}
export default new CompanyRepositorie();