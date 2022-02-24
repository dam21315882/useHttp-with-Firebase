import Section from '../Ul/Section'
import TaskForm from './TaskForm'
import useHttp from '../hooks/use-http'


const NewTask = (props) => {
    const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

    const createTask = (taskText, taskData) => {
        const generatedId = taskData.name;
        const createdTask = {id: generatedId, text: taskText};

        props.onAddTask(createdTask);
    }

    const enterTaskHandler = async (taskText) => {
        sendTaskRequest(
            {
                url: `https://react-http-5bb96-default-rtdb.firebaseio.com/tasks.json`,
                method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                body: {text: taskText},
            },
            createTask.bind(null, taskText)
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    )
}


export default NewTask;