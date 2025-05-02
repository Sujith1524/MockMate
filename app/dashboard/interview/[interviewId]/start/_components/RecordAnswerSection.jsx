"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Save } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAImodal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const { user } = useUser();

    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAnswerSaved, setIsAnswerSaved] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    // Capture spoken words into state
    useEffect(() => {
        if (!results.length) return; // Prevent unnecessary updates

        const combineTranscripts = results
            .filter((result) => typeof result !== "string" && result?.transcript)
            .map((result) => result.transcript)
            .join(" ");

        setUserAnswer(combineTranscripts);
    }, [results]);

    // Reset answer when user switches to a new question
    useEffect(() => {
        setUserAnswer("");     // ✅ Clear recorded response
        setResults([]);        // ✅ Clear previous results
        setIsAnswerSaved(false); // ✅ Re-enable save button
    }, [activeQuestionIndex]);

    console.log(userAnswer, "User Answer");

    console.log(mockInterviewQuestion, "mockintervie@@@@@@@");


    // 🎯 Start/Stop Recording
    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
            setIsAnswerSaved(false); // Reset save status
        }
    };

    // 🎯 Save Answer - Only when button is clicked
    const updateUserAnswer = async () => {
        if (!userAnswer.trim()) {
            toast("Error: No answer recorded!");
            return;
        }
        if (isAnswerSaved) {
            toast("Answer already saved!");
            return;
        }

        setLoading(true);

        const feedbackPrompt = `Question: ${mockInterviewQuestion?.[activeQuestionIndex]?.question}, 
        User Answer: ${userAnswer}, 
        Give a JSON response with fields: rating (1-10) and feedback (3-5 lines of improvement).`;

        console.log(feedbackPrompt, "feedback prompt");


        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const MockResponse = result.response
                .text()
                .replace("```json", "")
                .replace("```", "");

            console.log(MockResponse, "Mock Response");
            const JsonFeedbackResp = JSON.parse(MockResponse);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion?.[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion?.[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-yyyy"),
            });

            console.log(resp, "resp");


            if (resp) {
                toast("Answer saved successfully!");
                setIsAnswerSaved(true); // ✅ Prevent duplicate save
            }
        } catch (error) {
            console.error("Error saving answer:", error);
            toast("Failed to save answer, please try again.");
        } finally {
            setLoading(false);
        }
    };

    console.log(interviewData, "datainterview");



    // const updateUserAnswer = async () => {
    //     if (!userAnswer.trim()) {
    //         toast("⚠️ No answer recorded! Please start recording and speak.");
    //         return;
    //     }
    //     if (isAnswerSaved) {
    //         toast("✔️ Answer already saved! Please proceed to the next question.");
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         // ❗ Check if the answer already exists in the DB
    //         const existingAnswer = await db
    //             .select()
    //             .from(UserAnswer)
    //             .where({
    //                 mockIdRef: interviewData?.mockId,
    //                 question: mockInterviewQuestion?.[activeQuestionIndex],
    //                 userEmail: user?.primaryEmailAddress?.emailAddress,
    //             });

    //         if (existingAnswer.length > 0) {
    //             toast("⚠️ Answer already recorded! Please take the next question.");
    //             setIsAnswerSaved(true);
    //             setLoading(false);
    //             return;
    //         }

    //         // 🎯 If no duplicate, insert answer
    //         const feedbackPrompt = `Question: ${mockInterviewQuestion?.[activeQuestionIndex]?.question}, 
    //         User Answer: ${userAnswer}, 
    //         Give a JSON response with fields: rating (1-10) and feedback (3-5 lines of improvement).`;

    //         const result = await chatSession.sendMessage(feedbackPrompt);
    //         const MockResponse = result.response
    //             .text()
    //             .replace("```json", "")
    //             .replace("```", "");

    //         console.log(MockResponse, "Mock Response");
    //         const JsonFeedbackResp = JSON.parse(MockResponse);

    //         await db.insert(UserAnswer).values({
    //             mockIdRef: interviewData?.mockId,
    //             question: mockInterviewQuestion?.[activeQuestionIndex]?.question,
    //             correctAns: mockInterviewQuestion?.[activeQuestionIndex]?.answer,
    //             userAns: userAnswer,
    //             feedback: JsonFeedbackResp?.feedback,
    //             rating: JsonFeedbackResp?.rating,
    //             userEmail: user?.primaryEmailAddress?.emailAddress,
    //             createdAt: moment().format("DD-MM-yyyy"),
    //         });

    //         toast("✅ Answer saved successfully!");
    //         setIsAnswerSaved(true);
    //     } catch (error) {
    //         console.error("Error saving answer:", error);
    //         toast("❌ Failed to save answer, please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // 🎯 Reset Answer
    const resetAnswer = () => {
        setUserAnswer("");
        setResults([]);
        setIsAnswerSaved(false); // ✅ Ensures save button re-enables
    };

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-col justify-center items-center rounded-md relative">
                <Image src="/web-cam3.avif" alt="webcam" width={300} height={300} className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10,
                    }}


                />
            </div>

            <div className="flex gap-4 my-6">
                {/* Start/Stop Recording Button */}
                <Button variant="outline" onClick={StartStopRecording} disabled={loading}>
                    {isRecording ? (
                        <h2 className="text-red-600 flex gap-2">
                            <Mic /> Stop Recording
                        </h2>
                    ) : (
                        "Record Answer"
                    )}
                </Button>

                {/* Save Answer Button */}
                <Button variant="outline" onClick={updateUserAnswer} disabled={loading || isAnswerSaved || !userAnswer.trim()}>
                    <Save className="mr-2" /> Save Answer
                </Button>

                {/* Reset Answer Button */}
                {/* <Button variant="outline" onClick={resetAnswer}>
                    <RotateCcw className="mr-2" /> Reset
                </Button> */}

                {/* Refresh Page Button */}
                {/* <Button variant="outline" onClick={() => window.location.reload()}>
                    <RefreshCw className="mr-2" /> Refresh
                </Button> */}
                {/* {interimResult} */}
            </div>
            {interimResult && (
                <p className="text-sm text-gray-500 mt-2">
                    <strong>Current Speech:</strong>
                    {interimResult}
                </p>
            )}
        </div>
    );
};

export default RecordAnswerSection;
