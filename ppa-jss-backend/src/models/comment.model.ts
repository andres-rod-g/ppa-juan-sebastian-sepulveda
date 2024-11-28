
import { prop, getModelForClass } from '@typegoose/typegoose';

class Comment {
    @prop({ required: true })
    public text!: String;
    
    @prop({ required: true })
    public authorUserId!: String; // UserId
    
    @prop({ required: true })
    public productId!: String; // UserId
    
    @prop({ required: true })
    public createdAt!: Date;
    
    @prop({ required: true })
    public updatedAt!: Date;
}
  
const CommentModel = getModelForClass(Comment);
export default CommentModel;