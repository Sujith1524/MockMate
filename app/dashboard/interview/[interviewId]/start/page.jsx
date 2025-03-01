// "use client"
// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import QuestionsSection from './_components/QuestionsSection'
// import RecordAnswerSection from './_components/RecordAnswerSection'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// const StartInterview = ({ params }) => {


//     const [interviewData, setInterviewData] = useState()
//     const [mockInterviewQuestion, setmockInterviewQuestion] = useState()
//     const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

//     const resolvedParams = useParams();


//     useEffect(() => {
//         if (resolvedParams?.interviewId) {
//             getInterviewDetails();
//         }
//     }, [resolvedParams?.interviewId]);


//     const getInterviewDetails = async () => {
//         const result = await db.select().from(MockInterview)
//             .where(eq(MockInterview.mockId, resolvedParams?.interviewId))

//         console.log(result, "result");


//         const jsonMockResp = JSON.parse(result[0]?.jsonMockResp)

//         console.log(jsonMockResp, "jsonmock resp");

//         setmockInterviewQuestion(jsonMockResp)
//         setInterviewData(result[0])


//         if (jsonMockResp?.questions && jsonMockResp?.answers) {
//             const mockArray = jsonMockResp.questions.map((question, index) => ({
//                 question,
//                 answer: jsonMockResp.answers[index] || "No answer provided",
//             }));

//             console.log(mockArray, "mockarray"); // Array of objects
//             setmockInterviewQuestion(mockArray)
//         } else {
//             console.error("Invalid JSON structure: Missing 'questions' or 'answers' keys");
//         }



//     }



//     return (
//         <div className='pt-28'>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
//                 <QuestionsSection
//                     mockInterviewQuestion={mockInterviewQuestion}
//                     activeQuestionIndex={activeQuestionIndex}
//                 />
//                 <RecordAnswerSection
//                     mockInterviewQuestion={mockInterviewQuestion}
//                     activeQuestionIndex={activeQuestionIndex}
//                     interviewData={interviewData}
//                 />
//             </div>
//             <div className='flex justify-end gap-6 '>
//                 {/* {
//                     activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>
//                 } */}
//                 {
//                     activeQuestionIndex !== mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
//                 }

//                 {
//                     activeQuestionIndex === mockInterviewQuestion?.length - 1 && <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}> <Button>End Interview</Button></Link>
//                 }

//             </div>
//         </div>
//     )
// }

// export default StartInterview


"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const StartInterview = () => {
    const [interviewData, setInterviewData] = useState(null)
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getInterviewDetails()
        }
    }, [interviewId])

    const getInterviewDetails = async () => {
        setLoading(true)
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId))

            if (!result.length) {
                console.error("No interview found")
                return
            }

            const interview = result[0]
            setInterviewData(interview)

            // Parse JSON safely
            let jsonMockResp
            try {
                jsonMockResp = JSON.parse(interview.jsonMockResp)
            } catch (error) {
                console.error("Error parsing JSON:", error)
                return
            }

            if (jsonMockResp?.questions && jsonMockResp?.answers) {
                const formattedQuestions = jsonMockResp.questions.map((question, index) => ({
                    question,
                    answer: jsonMockResp.answers[index] || "No answer provided",
                }))
                setMockInterviewQuestion(formattedQuestions)
            } else {
                console.error("Invalid JSON structure: Missing 'questions' or 'answers' keys")
            }
        } catch (error) {
            console.error("Error fetching interview details:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='pt-28'>
            {loading ? (
                <div className="flex flex-col justify-center h-[60vh] items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading interview...</p>
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <QuestionsSection
                            mockInterviewQuestion={mockInterviewQuestion}
                            activeQuestionIndex={activeQuestionIndex}
                        />
                        <RecordAnswerSection
                            mockInterviewQuestion={mockInterviewQuestion}
                            activeQuestionIndex={activeQuestionIndex}
                            interviewData={interviewData}
                        />
                    </div>
                    <div className='flex justify-end gap-6'>
                        {activeQuestionIndex < mockInterviewQuestion.length - 1 ? (
                            <Button onClick={() => setActiveQuestionIndex(prev => prev + 1)}>
                                Next Question
                            </Button>
                        ) : (
                            <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                                <Button>End Interview</Button>
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default StartInterview
