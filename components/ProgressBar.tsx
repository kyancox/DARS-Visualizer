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
            <div className='flex flex-row justify-between w-2/3 mx-auto mt-2'>
                <p className='text-green-400 font-medium'>Earned credits: <span className="font-bold">{earned}</span></p>
                <p className='text-yellow-400 font-medium'>In progress credits: <span className="font-bold">{inProgress}</span></p>
                <p className='text-red-500 font-medium'>Needed credits: <span className="font-bold">{needed}</span></p>
            </div>
            <ProgressBar className='my-2'>
                <ProgressBar animated striped variant="success" now={earned ?? undefined} key={1} />
                <ProgressBar animated striped variant="warning" now={inProgress ?? undefined} key={2} />
                <ProgressBar animated striped variant="danger" now={needed ?? undefined} key={3} />
            </ProgressBar>
            <p className='text-center font-medium'>Total credits to graduate: <span className="font-bold">{total}</span></p>
        </>
    );
}

export default StackedProgressBar;