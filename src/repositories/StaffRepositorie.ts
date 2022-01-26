import { Staff } from "../models/staff";
import { BaseRepositorie } from "./BaseRepositorie";

class StaffRepositorie extends BaseRepositorie {
    constructor() {
        super(Staff);
    } 
    
    
    public getAllEmployeeList = async () => {
        return await this.model.find({status: true}) .select('name')
    }
    public getEmpName = async (id) => {
        return await this.model.findOne({id: id}).select('name')
    }
    public emoployeeCount = async () => {
        return await this.model.count()
    }
    public checkLogin = async (mobile, mpin) => {
        return await this.model.find({status: true,mobile: mobile,mpin: mpin}).exec() 
    }
    public companyBrandEmployees = async (company, brand) => {
        // const data = await this.model.find({company1: company},{brand1: brand}).select('name').exec()
        const data = await this.model.find({statu:true}).select('name').exec()
         
            return data.map((c) => {
                if(c.name){
                    return {
                        value: c._id,
                        label: `${c.name}`
                    };
                }
            })
    }
    public getUnGroupPemployees = async (assignedEmp) => {
        const data = await this.model.find({ _id : { $nin :assignedEmp } }).select('name').exec()
            return data.map((c) => {
                if(c.name){
                    return {
                        value: c._id,
                        label: `${c.name}`
                    };
                }
            })
    }
    
}
export default new StaffRepositorie();