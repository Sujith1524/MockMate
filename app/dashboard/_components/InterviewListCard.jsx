import React from 'react'
import { format, parseISO } from "date-fns";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const InterviewListCard = ({ interviewList }) => {

    console.log(interviewList, "inteviwlist");



    const router = useRouter()

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interviewList?.mockId}/feedback`)
    }


    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-sm text-primary'>{interviewList?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interviewList?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-500'>{interviewList?.createdAt}</h2>
            <div className='flex justify-between w-full mt-3 gap-3'>
                <Button size="sm" variant="outline" className="w-full bg-violet-500" onClick={onFeedback}>
                    Feedback
                </Button>
                {/* <Button size="sm" variant="outline" className="w-full">
                    Start
                </Button> */}
            </div>
        </div>
    )
}

export default InterviewListCard