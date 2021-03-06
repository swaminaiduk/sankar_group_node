import { Group } from "../models/group";
import { BaseRepositorie } from "./BaseRepositorie";
var mongodb = require('mongodb');
class GroupRepositorie extends BaseRepositorie {
    constructor() {
        super(Group);
    }  
    public distinctGroups = async (emp_id) => {
        const groupData = await this.model.aggregate(
            [
                { $match: { employee_id: emp_id} },
                {"$group":  { "_id": { id: '$group_id', group: "$group", logo: "$logo", about: "$about", description: "$description" } }  }
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
            data.push({value: r.employee_id, label: r.employee_name, assigned: true})
        })
        return data;
    }

    public deleteGroupPemployees = async (groupId, staffId) => {
        return await this.model.deleteOne({group_id: groupId}, {employee_id: staffId})
    }
    public getCount = async () => {
        return await this.model.distinct('group_id').count()
    } 
    public getName = async (groupId) => {
        const groupDet = await this.model.findOne({group_id: groupId}).select('group')
        return groupDet?.group
    }
    public getCompanyName = async (groupId) => {
        const groupDet = await this.model.findOne({group_id: groupId}).select('company_name')
        return groupDet?.company_name
    }
    public getCompanyId = async (groupId) => {
        return await this.model.findOne({group_id: groupId}).select('company')
    } 
}
export default new GroupRepositorie();