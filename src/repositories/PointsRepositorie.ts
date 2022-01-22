import Points from "../models/Points";
import { BaseRepositorie } from "./BaseRepositorie";

class PointsRepositorie extends BaseRepositorie {
    constructor() {
        super(Points);
    }
}

export default new PointsRepositorie();