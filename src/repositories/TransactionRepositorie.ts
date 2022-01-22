import Transaction from "../models/task";
import { BaseRepositorie } from "./BaseRepositorie";

class TransactionRepositorie extends BaseRepositorie {
    constructor() {
        super(Transaction);
    }
}

export default new TransactionRepositorie();