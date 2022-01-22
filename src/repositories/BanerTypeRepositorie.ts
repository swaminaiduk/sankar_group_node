import BanerType from "../models/BanerType";
import { BaseRepositorie } from "./BaseRepositorie";

class BanerTypeRepositorie extends BaseRepositorie {
    constructor() {
        super(BanerType);
    }
}

export default new BanerTypeRepositorie();