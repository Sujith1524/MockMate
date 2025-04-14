"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Headings } from '@/app/layoutcomponents/Heading'
import { cn } from '@/lib/utils'
import { Bot, ChevronLeft, CircleCheck, Star, UserCheck } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const Feedback = () => {
    const { interviewId } = useParams()
    const [feedbackList, setFeedbackList] = useState([])
    const [activeFeed, setActiveFeed] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (interviewId) {
            getFeedback()
        }
    }, [interviewId])

    const getFeedback = async () => {
        setIsLoading(true)
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, interviewId))
                .orderBy(UserAnswer.id)
            setFeedbackList(result)
        } catch (error) {
            console.error("Error fetching feedback:", error)
        } finally {
            setIsLoading(false)
        }
    }


    const overAllRating = useMemo(() => {
        if (feedbackList.length === 0) return "0.0";

        // Convert string ratings to numbers and calculate total ratings
        const totalRatings = feedbackList.reduce((acc, feedback) => acc + parseFloat(feedback.rating || "0"), 0);

        // Calculate average rating out of 10
        return (totalRatings / feedbackList.length).toFixed(1);
    }, [feedbackList]);




    return (
        <div className='pt-36 px-10 flex flex-col w-full gap-8 container'>
            <Link href={'/dashboard'}>
                <div className='flex items-center gap-3 cursor-pointer hover:underline'>
                    <ChevronLeft className='w-6 h-6' />
                    <p className='font-medium'>Back to dashboard</p>
                </div>
            </Link>

            <Headings
                title="Congratulations!"
                description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
            />
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[20vh] bg-gray-100 space-y-3">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-gray-600 text-base font-normal">
                        Loading Feedbacks, please wait...
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-base text-muted-foreground">
                        Your overall interview rating:
                        <span className="text-emerald-500 font-semibold text-xl"> {overAllRating} / 10</span>
                    </p>
                    <Headings title="Interview Feedback" isSubHeading />
                    {feedbackList.length === 0 ? (
                        <p className='text-center font-bold text-xl'>No Feedback Found</p>
                    ) : (
                        <Accordion type="single" collapsible className="space-y-6 mb-6">
                            {feedbackList.map((feed) => (
                                <AccordionItem key={feed.id} value={feed.id} className="border rounded-lg shadow-md">
                                    <AccordionTrigger
                                        onClick={() => setActiveFeed(feed.id)}
                                        className={cn(
                                            "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
                                            activeFeed === feed.id ? "bg-gradient-to-r from-purple-50 to-blue-50" : "hover:bg-gray-50"
                                        )}
                                    >
                                        <span>{feed.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                                        <div className="text-lg font-semibold text-gray-700">
                                            <Star className="inline mr-2 text-yellow-500" />
                                            Rating: {feed.rating}
                                        </div>
                                        <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                                            <CardTitle className="flex items-center text-lg">
                                                <CircleCheck className="mr-2 text-green-600" />
                                                Expected Answer
                                            </CardTitle>
                                            <CardDescription className="font-medium text-gray-700">
                                                {feed.correctAns}
                                            </CardDescription>
                                        </Card>
                                        <Card className="border-none space-y-3 p-4 bg-yellow-50 rounded-lg shadow-md">
                                            <CardTitle className="flex items-center text-lg">
                                                <UserCheck className="mr-2 text-yellow-600" />
                                                Your Answer
                                            </CardTitle>
                                            <CardDescription className="font-medium text-gray-700">
                                                {feed.userAns}
                                            </CardDescription>
                                        </Card>
                                        <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
                                            <CardTitle className="flex items-center text-lg">
                                                <Bot className="mr-2 text-red-600" />
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
                </>
            )}
        </div>
    )
}

export default Feedback
