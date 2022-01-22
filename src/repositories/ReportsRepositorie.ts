import Reports from "../models/Reports";
import { BaseRepositorie } from "./BaseRepositorie";

class ReportsRepositorie extends BaseRepositorie {
    constructor() {
        super(Reports);
    }
}

export default new ReportsRepositorie();