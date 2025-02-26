"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Headings } from '@/app/layoutcomponents/Heading'
import { cn } from '@/lib/utils'
import { CircleCheck, Star } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

const Feedback = ({ params }) => {


    const router = useParams()

    const { interviewId } = router

    console.log(router, interviewId, "router");


    const [feedbackList, setFeedbackList] = useState([])
    const [activeFeed, setActiveFeed] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const getFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer?.mockIdRef, interviewId))
            .orderBy(UserAnswer?.id)

        console.log(result, "result");
        setFeedbackList(result)

    }

    useEffect(() => {
        if (interviewId) {
            getFeedback()
        }
    }, [interviewId])

    const overAllRating = useMemo(() => {
        if (feedbackList.length === 0) return "0.0";

        const totalRatings = feedbackList.reduce(
            (acc, feedback) => acc + feedback.rating,
            0
        );

        return (totalRatings / feedbackList.length).toFixed(1);
    }, [feedbackList]);




    return (
        <div className='p-36 flex flex-col w-full gap-8'>

            <Headings
                title="Congratulations !"
                description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
            />
            <p className="text-base text-muted-foreground">
                Your overall interview ratings :{" "}
                <span className="text-emerald-500 font-semibold text-xl">
                    {overAllRating} / 10
                </span>

            </p>
            <Headings title="Interview Feedback" isSubHeading />
            {
                feedbackList?.length === 0 && <p className='text-center font-bold text-xl'>No Feedback Found</p>
            }

            {feedbackList && (
                <Accordion type="single" collapsible className="space-y-6">
                    {feedbackList?.map((feed) => (
                        <AccordionItem
                            key={feed.id}
                            value={feed.id}
                            className="border rounded-lg shadow-md"
                        >
                            <AccordionTrigger
                                onClick={() => setActiveFeed(feed.id)}
                                className={cn(
                                    "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
                                    activeFeed === feed.id
                                        ? "bg-gradient-to-r from-purple-50 to-blue-50"
                                        : "hover:bg-gray-50"
                                )}
                            >
                                <span>{feed.question}</span>
                            </AccordionTrigger>

                            <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                                <div className="text-lg font-semibold to-gray-700">
                                    <Star className="inline mr-2 text-yellow" />
                                    Rating : {feed.rating}
                                </div>

                                <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                                    <CardTitle className="flex items-center text-lg">
                                        <CircleCheck className="mr-2 text-green-600" />
                                        Expected Answer
                                    </CardTitle>

                                    <CardDescription className="font-medium text-gray-700">
                                        {feed.correctAns
                                        }
                                    </CardDescription>
                                </Card>

                                <Card className="border-none space-y-3 p-4 bg-yellow-50 rounded-lg shadow-md">
                                    <CardTitle className="flex items-center text-lg">
                                        <CircleCheck className="mr-2 text-yellow-600" />
                                        Your Answer
                                    </CardTitle>

                                    <CardDescription className="font-medium text-gray-700">
                                        {feed.userAns}
                                    </CardDescription>
                                </Card>

                                <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
                                    <CardTitle className="flex items-center text-lg">
                                        <CircleCheck className="mr-2 text-red-600" />
                                        Feedback
                                    </CardTitle>

                                    <CardDescription className="font-medium text-gray-700">
                                        {feed.feedback}
                                    </CardDescription>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>


    )
}

export default Feedback