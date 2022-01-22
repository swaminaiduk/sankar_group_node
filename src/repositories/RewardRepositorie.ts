import { Reward } from "../models/reward";
import { generateUniqueNumber } from "../utils";
import { BaseRepositorie } from "./BaseRepositorie";

class RewardRepositorie extends BaseRepositorie {
    constructor() {
        super(Reward);
    }

    public findByRewardId = async (reward_id) => {
        return await this.model.findOne({
            reward_id: reward_id
        });
    }

    public generateUniqueRewardId = async () => {
        const reward_id = 'RID' + generateUniqueNumber().toString();
        const reward = await this.findByRewardId(reward_id);
        if (reward === null) {
            return reward_id;
        } else {
            return this.generateUniqueRewardId();
        }
    }
}

export default new RewardRepositorie();