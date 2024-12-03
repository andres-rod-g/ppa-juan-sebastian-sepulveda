import CommentModel from "@/models/comment.model";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

const getComments = async (req: Request, res: Response) => {
    const { authorUserId, productId } = req.query;

    if (!authorUserId && !productId)
        return res.status(400).json({
            message: "Bad request! Must send 'authorUserId' or 'productId'",
        });
    
    console.log("Getting comment of product", productId)
    
    const temp = await CommentModel.aggregate(
        [
            {
                $match: {
                    $or: [
                        {
                            productId,
                        },
                        {
                            authorUserId,
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorUserId",
                    foreignField: "_id",
                    as: "user"
                }
            },
        ],
    )
        .then((v) => {
            console.log(v)
            return v
        })
        .catch((err) => {
            console.log("Error while getting comments!", err);
            return false;
        });

    const temp2 = await CommentModel.aggregate([

        {
            $match: {
                productId
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                "cantidad": { $sum: 1 },
            },
        },
        {
            $sort: { _id: -1 },
        },
        {
            $limit: 15,
        },
    ])

    if (!temp)
        return res
            .status(400)
            .json({ message: "Something bad while trying to ifnd comments" });

    return res.status(200).json({ data: temp, graphData: temp2 });
};

const postComment = async (req: Request, res: Response) => {
    const { text, productId } = req.body;

    const temp = await CommentModel.create({
        text,
        authorUserId: req.userId,
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
        .then((v) => true)
        .catch((err) => false);

    if (!temp)
        return res
            .status(500)
            .json({
                message: "Something wrong when trying to create comment.",
            });

    return res.status(200).json({ message: "Done" });
};

const removeComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    if (!commentId)
        return res.status(400).json({ message: "Missing 'commentId'" });

    try {
        const val = await CommentModel.findById(new ObjectId(commentId));

        if (!val) return res.status(404).json({});
        console.log(val.authorUserId, req.userId);
        if (val.authorUserId !== req.userId) return res.status(403).json({});

        const temp = await CommentModel.findByIdAndDelete(
            new ObjectId(commentId)
        );

        return res.status(200).json({ message: "Done" });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Couldn't remove comment", commentId });
    }
};

const updateComment = async (req: Request, res: Response) => {
    const { text } = req.body;
    const { commentId } = req.params;

    if (!commentId)
        return res.status(400).json({ message: "Missing 'commentId'" });

    try {
        const temp = await CommentModel.findByIdAndUpdate(
            new ObjectId(commentId),
            {
                text,
                updatedAt: new Date(),
            },
            {
                lean: true,
                new: true,
            }
        );

        return res.status(200).json({ data: temp });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Couldn't update comment", commentId });
    }
};

export default {
    getComments,
    postComment,
    removeComment,
    updateComment,
};
