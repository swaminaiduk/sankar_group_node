export class BaseRepositorie {
    public model: any = {};

    constructor(model) {
        this.model = model;
    }

    public query = async (filter, options) => {
        return await this.model.paginate(filter, options);
    }

    public findById = async (id) => {
        return await this.model.findOne(id);
    } 
    public create = async (data) => {
        return await this.model.create(data);
    }

    public updateById = async (id, data) => {
        return await this.model.updateOne(id, data);
    }

    public deleteById = async (id) => {
        return await this.model.deleteOne(id);
    }
}
