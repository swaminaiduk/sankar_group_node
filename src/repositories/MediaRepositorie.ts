import { Media } from "../models/media";
import { BaseRepositorie } from "./BaseRepositorie";

class MediaRepositorie extends BaseRepositorie {
    constructor() {
        super(Media);
    } 

    
}

export default new MediaRepositorie();