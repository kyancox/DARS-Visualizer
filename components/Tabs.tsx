import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import { useData } from '@/providers/DataContext';

function JustifiedTabs() {
    const [key, setKey] = useState('courses')
    const { data } = useData()

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
                    <Tab eventKey="courses" title={<span className="text-blue-500 ">All Courses</span>} className="p-4" />
                    <Tab eventKey="completed" title={<span className="text-green-500  ">Completed Requirements</span>} className="p-4" />
                    <Tab eventKey="incomplete" title={<span className="text-red-500 ">Incomplete Requirements</span>} className="p-4" />
                    <Tab eventKey="inprogress" title={<span className="text-yellow-500 ">In Progress Courses</span>} className="p-4" />
                </Tabs>
            </div>

            <div className='lg:hidden h-16 flex overflow-x-auto whitespace-nowrap'>
                <div className='flex flex-row items-center justify-center'>
                    <div className={`m-1 py-2 px-3 border border-border rounded-full flex-shrink-0`}
                        onClick={() => setKey('courses')}
                    >
                        All Courses
                    </div>
                    <div className={`m-1 py-2 px-3 border border-border rounded-full flex-shrink-0`}
                        onClick={() => setKey('completed')}
                    >
                        Completed Requirements
                    </div>
                    <div className={`m-1 py-2 px-3 border border-border rounded-full flex-shrink-0`}
                        onClick={() => setKey('incomplete')}
                    >
                        Incomplete Requirements
                    </div>
                    <div className={`m-1 py-2 px-3 border border-border rounded-full flex-shrink-0`}
                        onClick={() => setKey('inprogress')}
                    >
                        In Progress Courses
                    </div>
                </div>
            </div>

            <div className='border'>
                {(() => {
                    switch (key) {
                        case 'courses':
                            return (
                                <div>
                                    {data && (

                                        data.all_courses.map((course) => (
                                            <div key={course.course_name}>
                                                <p>{course.course_name}</p>
                                                <p>{course.course_code}</p>
                                            </div>
                                        ))

                                    )}
                                </div>
                            );
                        case 'completed':
                            return <div>Completed Requirements Content</div>;
                        case 'incomplete':
                            return <div>Incomplete Requirements Content</div>;
                        case 'inprogress':
                            return <div>In Progress Courses Content</div>;
                        default:
                            return <div>Select a tab</div>;
                    }
                })()}
            </div>

        </>
    );
}

export default JustifiedTabs;