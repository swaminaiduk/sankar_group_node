import { Group } from "../models/group";
import { BaseRepositorie } from "./BaseRepositorie";
class GroupRepositorie extends BaseRepositorie {
    constructor() {
        super(Group);
    }  
    public distinctGroups = async () => {
        const groupData = await this.model.aggregate(
            [
                {"$group":  { "_id": { id: '$group_id', group: "$group" } }  }
            ]
        )
        const data = []
        groupData.map(function(r,i){
            data.push(r._id)
        })
        return data; 
    }

    public distinctGroupOptions = async () => {
        const groupData = await this.model.aggregate(
            [
                {"$group":  { "_id": { id: '$group_id', label: "$group" } }  }
            ]
        )
        const data = []
        groupData.map(function(r,i){
            data.push(r._id)
        })
        return data 
    }
    
    public getGroupPemployees = async (groupId) => {
        const empData = await this.model.find({group_id: groupId})
        const data = [];
        empData.map((r,i)=>{
            data.push({value: r.employee_id, label: r.employee_name})
        })
        return data;
    }
}
export default new GroupRepositorie();
