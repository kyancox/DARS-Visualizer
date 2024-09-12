import ProgressBar from 'react-bootstrap/ProgressBar';
import { useData } from '@/providers/DataContext';
import { useState, useEffect } from 'react';

function StackedProgressBar() {

    const { data } = useData()
    const [earned, setEarned] = useState<number>(0)
    const [inProgress, setInProgress] = useState<number>(0)
    const [needed, setNeeded] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (data) {
            const earnedCredits = data.credits.earned_credits ?? 0
            const inProgressCredits = data.credits.in_progress_credits ?? 0
            const neededCredits = data.credits.needed_credits ?? 0

            setEarned(earnedCredits)
            setInProgress(inProgressCredits)
            setNeeded(neededCredits)
            setTotal(earnedCredits + inProgressCredits + neededCredits)
        }
    }, [data])

    if (!data) return null

    return (
        <>
            <p className='text-green-400'>Earned credits: {earned}</p>
            <p className='text-yellow-400'>In progress credits: {inProgress}</p>
            <p className='text-red-500'>Needed credits: {needed}</p>
            <p>Total credits to graduate: {total}</p>
            <ProgressBar>
                <ProgressBar animated striped variant="success" now={earned ?? undefined} key={1} />
                <ProgressBar animated striped variant="warning" now={inProgress ?? undefined} key={2} />
                <ProgressBar animated striped variant="danger" now={needed ?? undefined} key={3} />
            </ProgressBar>
        </>
    );
}

export default StackedProgressBar;