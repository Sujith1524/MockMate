import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Popconfirm } from "antd";

const InterviewListCard = ({ interviewList, count, setCount }) => {
    const router = useRouter();

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interviewList?.mockId}/feedback`);
    };

    const handleDelete = async () => {
        try {
            await db
                .delete(MockInterview)
                .where(eq(MockInterview.mockId, interviewList?.mockId));
            toast.success("Mock Interview Deleted Successfully");
            setCount(count + 1);
        } catch (error) {
            console.error("Error deleting interview:", error);
            toast.error("Error deleting interview");
        } finally {
        }
    };

    return (
        <div className="border shadow-sm rounded-lg p-3">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-bold text-sm text-primary">
                        {interviewList?.jobPosition}
                    </h2>
                    <h2 className="text-sm text-gray-600">
                        {interviewList?.jobExperience} Years of Experience
                    </h2>
                </div>
                <Popconfirm
                    title="Are you sure you want to delete this interview?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                >
                    <div>
                        <Trash2 className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" />
                    </div>
                </Popconfirm>
            </div>

            <h2 className="text-xs text-gray-500">{interviewList?.createdAt}</h2>
            <div className="flex justify-between w-full mt-3 gap-3">
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-black text-white"
                    onClick={onFeedback}
                >
                    Feedback
                </Button>
            </div>
        </div>
    );
};

export default InterviewListCard;
