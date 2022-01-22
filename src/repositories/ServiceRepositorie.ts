import { Service } from "../models/service";
import { BaseRepositorie } from "./BaseRepositorie";

class ServiceRepositorie extends BaseRepositorie {
    constructor() {
        super(Service);
    }
    public dropdown = async () => {
        const service = await Service.find({ status: true }).select(['name']).exec();
        return service.map((service) => {
            return {
                value: service.name,
                // value: service.id,
                label: `${service.name}`
            };
        })
    }
}

export default new ServiceRepositorie();