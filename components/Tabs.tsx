import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { useData } from '@/providers/DataContext';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function JustifiedTabs() {
    const [key, setKey] = useState('courses')
    const { data } = useData()
    const [openAccordions, setOpenAccordions] = useState<string[]>([]);
    const [openCompletedAccordions, setOpenCompletedAccordions] = useState<string[]>([]);
    const [openIncompleteAccordions, setOpenIncompleteAccordions] = useState<string[]>([]);

    if (!data) return null

    const handleOpenAll = () => {
        const allKeys = [
            ...data.completed_requirements.map((_, index) => index.toString()),
            ...data.unfulfilled_requirements.map((_, index) => index.toString())
        ];
        setOpenAccordions(allKeys);
    };

    const handleCloseAll = () => {
        setOpenAccordions([]);
    };

    const handleOpenAllCompleted = () => {
        const allKeys = data.completed_requirements.map((_, index) => index.toString());
        setOpenCompletedAccordions(allKeys);
    };

    const handleCloseAllCompleted = () => {
        setOpenCompletedAccordions([]);
    };

    const handleOpenAllIncomplete = () => {
        const allKeys = data.unfulfilled_requirements.map((_, index) => index.toString());
        setOpenIncompleteAccordions(allKeys);
    };

    const handleCloseAllIncomplete = () => {
        setOpenIncompleteAccordions([]);
    };

    return (
        <>
            <div className='lg:block hidden'>
                <Tabs
                    defaultActiveKey="home"
                    id="justify-tab-example"
                    className="mb-3"
                    onSelect={(k) => k !== null && setKey(k)}
                    justify
                >
                    <Tab eventKey="courses" title={<span className="text-blue-500 ">All Courses</span>} className="" />
                    <Tab eventKey="completed" title={<span className="text-green-500  ">Completed Requirements</span>} className="" />
                    <Tab eventKey="incomplete" title={<span className="text-red-500 ">Incomplete Requirements</span>} className="" />
                    <Tab eventKey="inprogress" title={<span className="text-yellow-500 ">In Progress Courses</span>} className="" />
                </Tabs>
            </div>

            <div className='lg:hidden h-16 flex overflow-x-auto whitespace-nowrap '>
                <div className='flex flex-row items-center justify-center self-start mx-auto'>
                    <div className={`m-1 py-2 px-4 border border-border rounded-xl flex-shrink-0 transition ${key === 'courses' && 'bg-red-700 text-white'}`}
                        onClick={() => setKey('courses')}
                    >
                        All Courses
                    </div>
                    <div className={`m-1 py-2 px-4 border border-border rounded-xl flex-shrink-0 transition ${key === 'completed' && 'bg-red-700 text-white'}`}
                        onClick={() => setKey('completed')}
                    >
                        Completed Requirements
                    </div>
                    <div className={`m-1 py-2 px-4 border border-border rounded-xl flex-shrink-0 transition ${key === 'incomplete' && 'bg-red-700 text-white'}`}
                        onClick={() => setKey('incomplete')}
                    >
                        Incomplete Requirements
                    </div>
                    <div className={`m-1 py-2 px-4 border border-border rounded-xl flex-shrink-0 transition ${key === 'inprogress' && 'bg-red-700 text-white'}`}
                        onClick={() => setKey('inprogress')}
                    >
                        In Progress Courses
                    </div>
                </div>
            </div>

            <div className='border rounded-lg shadow-xl p-4'>
                {(() => {
                    switch (key) {
                        case 'courses':
                            return (
                                <div className='lg:w-2/3 mx-auto'>
                                    <p className='text-center text-xl md:text-2xl font-bold'>All Recorded Courses from DARS</p>
                                    <div className={`flex flex-row items-center justify-between mx-4 my-2`}>
                                        <p className='sm:text-lg text-sm w-1/3 font-bold'>Course Code</p>
                                        <p className='sm:text-lg text-sm w-1/3 text-center font-bold'>Course Name</p>
                                        <p className='sm:text-lg text-sm w-1/3 text-right font-bold'># Credits (Status)</p>
                                    </div>
                                    {data && (

                                        data.all_courses.map((course, index) => (
                                            <div key={course.course_name} className={`flex flex-row items-center justify-between space-x-1 border border-gray-200 px-4 py-3 hover:opacity-60 transition duration-100 ${index == 0 ? 'rounded-t-md' : ''} ${index === data.all_courses.length - 1 ? 'rounded-b-md' : ''}`}>
                                                <p className='sm:text-lg text-sm w-1/3'>{course.course_code}</p>
                                                <p className='sm:text-lg text-sm w-1/3 text-center'>
                                                    {course.course_name.includes('&')
                                                        ? course.course_name.split('&').join(' & ')
                                                        : course.course_name
                                                    }
                                                </p>
                                                <p className='sm:text-lg text-sm w-1/3 text-right'>{course.credits}.00 credits ({course.status})</p>
                                            </div>
                                        ))

                                    )}
                                </div>
                            );
                        case 'completed':
                            return (
                                <div className='lg:w-2/3 mx-auto'>
                                    <p className='text-center text-xl md:text-2xl font-bold'>Completed Requirements from DARS</p>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Button variant="outline-primary" onClick={handleOpenAllCompleted} className="mr-2">Open All</Button>
                                        <Button variant="outline-secondary" onClick={handleCloseAllCompleted}>Close All</Button>
                                    </div>
                                    <Accordion activeKey={openCompletedAccordions}>
                                        {data && (
                                            data.completed_requirements.map((req, index) => (
                                                <Accordion.Item key={index} eventKey={index.toString()}>
                                                    <Accordion.Header onClick={() => {
                                                        setOpenCompletedAccordions(prev =>
                                                            prev.includes(index.toString())
                                                                ? prev.filter(key => key !== index.toString())
                                                                : [...prev, index.toString()]
                                                        );
                                                    }}>
                                                        {req.category}
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        {req.earned && <p className='text-center'>Earned: <span className='font-bold'>{req.earned}</span></p>}
                                                        {req.details.length === 0 && <p>No details for this category.</p>}
                                                        {req.details.map(detail => (
                                                            <p className={(detail.includes('IP') || detail.includes('IN-P') || detail.toLowerCase().includes('in-progress') || /\d+\)\s[A-Z]/.test(detail)) ? 'font-bold' : detail.includes('SELECT FROM:') ? 'font-semibold' : ''}>{detail}</p>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))
                                        )}
                                    </Accordion>
                                </div>
                            );
                        case 'incomplete':
                            return (
                                <div className='lg:w-2/3 mx-auto'>
                                    <p className='text-center text-xl md:text-2xl font-bold'>Incomplete Requirements from DARS</p>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Button variant="outline-primary" onClick={handleOpenAllIncomplete} className="mr-2">Open All</Button>
                                        <Button variant="outline-secondary" onClick={handleCloseAllIncomplete}>Close All</Button>
                                    </div>
                                    <Accordion activeKey={openIncompleteAccordions}>
                                        {data && (
                                            data.unfulfilled_requirements.map((req, index) => (
                                                <Accordion.Item key={index} eventKey={index.toString()}>
                                                    <Accordion.Header onClick={() => {
                                                        setOpenIncompleteAccordions(prev =>
                                                            prev.includes(index.toString())
                                                                ? prev.filter(key => key !== index.toString())
                                                                : [...prev, index.toString()]
                                                        );
                                                    }}>
                                                        {req.category}
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className='flex flex-row items-center justify-around'>
                                                            {req.earned && <p>Earned: <span className='font-bold'>{req.earned}</span></p>}
                                                            {req.needs && <p>Needs: <span className='font-bold'>{req.needs}</span></p>}
                                                        </div>
                                                        {req.details.length === 0 && <p>No details for this category.</p>}
                                                        {req.details.map((detail, detailIndex) => (
                                                            <p key={detailIndex} className={(detail.includes('IP') || detail.includes('IN-P') || detail.toLowerCase().includes('in-progress') || /\d+\)\s[A-Z]/.test(detail)) ? 'font-bold' : detail.includes('SELECT FROM:') ? 'font-semibold' : ''}>{detail}</p>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))
                                        )}
                                    </Accordion>
                                </div>
                            );
                        case 'inprogress':
                            return (
                                <div className='lg:w-2/3 mx-auto'>
                                    <p className='text-center text-xl md:text-2xl font-bold'>All Recorded Courses from DARS</p>
                                    <div className={`flex flex-row items-center justify-between mx-4 my-2`}>
                                        <p className='sm:text-lg text-sm w-1/3 font-bold'>Course Code</p>
                                        <p className='sm:text-lg text-sm w-1/3 text-center font-bold'>Course Name</p>
                                        <p className='sm:text-lg text-sm w-1/3 text-right font-bold'># Credits (Status)</p>
                                    </div>
                                    {data && (

                                        data.in_progress_courses.map((course, index) => (
                                            <div key={course.course_name} className={`flex flex-row items-center justify-between space-x-1 border border-gray-200 px-4 py-3 hover:opacity-60 transition duration-100 ${index == 0 ? 'rounded-t-md' : ''} ${index === data.all_courses.length - 1 ? 'rounded-b-md' : ''}`}>
                                                <p className='sm:text-lg text-sm w-1/3'>{course.course_code}</p>
                                                <p className='sm:text-lg text-sm w-1/3 text-center'>
                                                    {course.course_name.includes('&')
                                                        ? course.course_name.split('&').join(' & ')
                                                        : course.course_name
                                                    }
                                                </p>
                                                <p className='sm:text-lg text-sm w-1/3 text-right'>{course.credits}.00 credits ({course.status})</p>
                                            </div>
                                        ))

                                    )}
                                </div>
                            );
                        default:
                            return <div>Select a tab</div>;
                    }
                })()}

                <div className='lg:w-2/3 mx-auto mt-4'>
                    <p className='text-center text-xl md:text-2xl font-bold mb-4'>Legend</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 text-center'>
                        <div>
                            <h3 className='text-lg font-semibold mb-2 text-center'>Course Symbols</h3>
                            <ul className='space-y-1'>
                                <li><span className='font-bold'>D</span> - Duplicate course - retains GPA effect</li>
                                <li><span className='font-bold'>R</span> - Repeatable course</li>
                                <li><span className='font-bold'>S</span> - Credit split between requirements</li>
                                <li><span className='font-bold'>X</span> - Repeated course - no course credit or GPA effect</li>
                                <li><span className='font-bold'>(R)</span> - Required course</li>
                                <li><span className='font-bold'>(X)</span> - Original course value</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold mb-2 text-center'>Grade Symbols</h3>
                            <ul className='space-y-1'>
                                <li><span className='font-bold'>EI</span> - Extended incomplete</li>
                                <li><span className='font-bold'>CR</span> - Credit (credit/no credit courses)</li>
                                <li><span className='font-bold'>HS</span> - High school unit</li>
                                <li><span className='font-bold'>IN</span> - Incomplete (credit/no credit courses)</li>
                                <li><span className='font-bold'>INP</span> - In-progress course (current term)</li>
                                <li><span className='font-bold'>I</span> - Incomplete</li>
                                {/* Add more grade symbols as needed */}
                            </ul>
                        </div>
                        <div className=''>
                            <h3 className='text-lg font-semibold mb-2 text-center'>Requirement/Sub-requirement Information</h3>
                            <ul className='space-y-1'>
                                <li><span className='font-bold'>OK</span> - Requirement complete</li>
                                <li><span className='font-bold'>NO</span> - Requirement not complete</li>
                                <li><span className='font-bold'>IP</span> - Requirement uses in-progress credit/courses</li>
                                <li><span className='font-bold'>IN-P</span> - Sub-requirement uses in progress credit/courses</li>
                                <li><span className='font-bold'>PL</span> - Requirement/sub-requirement uses planned course</li>
                                <li><span className='font-bold'>R</span> - Required sub-requirement (mandatory)</li>
                                {/* Add more requirement information as needed */}
                            </ul>
                        </div>
                        <div className=' p'>
                            <h3 className='text-lg font-semibold mb-2 text-center'>Exception Symbols</h3>
                            <ul className='space-y-1'>
                                <li><span className='font-bold'>AC</span> - Course approved for requirement/sub-requirement</li>
                                <li><span className='font-bold'>IC</span> - Course inserted into requirement/sub-requirement</li>
                                <li><span className='font-bold'>EC</span> - Course exchanged for specified course</li>
                                <li><span className='font-bold'>FC</span> - Course forced into requirement/sub-requirement</li>
                                <li><span className='font-bold'>CM</span> - Course modified</li>
                                {/* Add more exception symbols as needed */}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default JustifiedTabs;