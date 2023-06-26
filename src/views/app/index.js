import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, useParams, Switch } from 'react-router-dom'
import { useHistory } from 'react-router'
import Header from '../../components/Header'
import Panel from '../../components/Panel'
import Profile from '../../components/Profile'
import UserDatabaseComponent from '../../components/UserDatabaseComponent'
import QuestionDatabaseComponent from '../../components/QuestionDatabaseComponent'
import Footer from '../../components/Footer'
import QuestionSetComponent from '../../components/QuestionSetComponent'
import Quiz from '../../components/Quiz'
import LearningTree from '../../components/LearningTree'
import KnowledgePoint from '../../components/KnowledgePoint'
import './index.css'
import Comments from '../../components/Comments'
import root from '../../root'

class User {
    constructor(id, name, email='', phone='', bio='', admin=false) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.bio = bio
        this.admin = admin
    }
}

class Question {
    constructor(id, question, answer) {
        this.id = id
        this.question = question
        this.answer = answer
    }
}

class QuestionSet {
    constructor(id, name, length, difficulty, questions=[]) {
        this.id = id
        this.name = name
        this.length = length
        this.difficulty = difficulty
        this.questions = questions
    }
    add(question) {
        if (question instanceof Question) {
            this.questions.push(question)
        }
    }
    remove(id) {
        this.questions = this.questions.filter(e => e.id !== id)
    }
}

class Module {
    constructor(id, name, questionSetList=[], nextModules=[]) {
        this.id = id
        this.name = name
        if (questionSetList instanceof Array) {
            this.questionSetList = [...questionSetList].filter(e => e instanceof QuestionSet)
        }
        this.nextModules = nextModules
    }
    add(questionSet) {
        if (questionSet instanceof QuestionSet) {
            this.questionSetList.push(questionSet)
        }
    }
    remove(id) {
        this.questionSetList = this.questionSetList.filter(e => e.id !== id)
    }
    setNext(module) {
        if (module instanceof Module) {
            this.nextModules.push(module)
        }
    }
}

let usersReady = false, questionSetsReady = false, commentsReady = false, renderReady = false

function App() {

    function getProfile() {
        let user
        fetch(root + "/GetProfile", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.hasOwnProperty("teacher_id")) {
                user = new User(data.teacher_id, `${data.firstName} ${data.lastName}`, data.email, data.phone, data.bio, true)
            } else {
                user = new User(data.student_id, `${data.firstName} ${data.lastName}`, data.email, data.phone, data.bio, false)
            }
            setMainUser(user)
        }).catch(err => {
            alert("Please sign in first.")
            history.push('/signin')
        })
    }

    function getUsers() {
        let users = []
        if (mainUser.admin) {
            fetch(root + "/GetRelationshipByTeacherEmail", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                for (let i in data) {
                    users.push(new User(0, data[i].student_email))
                }
                setUserDatabase(users)
            })
        } else {
            fetch(root + "/GetRelationshipByStudentEmail", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                for (let i in data) {
                    users.push(new User(0, data[i].teacher_email))
                }
                setUserDatabase(users)
            })
        }
    }
    
    function getQuestionSets() {
        fetch(root + "/GetAllQuizs")
        .then(res => {
            return res.json()
        }).then(data => {
            let questionSets = []
            for (let i in data) {
                let qs = data[i]
                let qso = new QuestionSet(qs.id, `${qs.subject} (${qs.name})`, qs.length, qs.difficulty)
                fetch(root + `/GetAllQuestionsByQuizID/${qs.id}`)
                .then(res => res.json()).then(data => {
                    for (let k in data) {
                        let q = data[k]
                        qso.add(new Question(q.id, q.label, q.answer))
                    }
                    qso.length = qso.questions.length
                })
                questionSets.push(qso)
            }
            setQuestionDatabase(questionSets)
        })
    }

    function getModules() {
        let modules = []
        let module
        fetch(root + "/GetAllModules")
        .then(res => {
            return res.json()
        }).then(data => {
            for (let i in data) {
                let m = data[i]
                module = new Module(m.id, `${m.subject}: ${m.difficulty}`, [], m.nextModules)
                for (let j in m.quizs) {
                    let qs = m.quizs[j]
                    let qso = new QuestionSet(qs.id, `${qs.subject} (${qs.name})`, qs.length, qs.difficulty)
                    fetch(root + `/GetAllQuestionsByQuizID/${qs.id}`)
                    .then(res => res.json())
                    .then(data => {
                        for (let k in data) {
                            let q = data[k]
                            qso.add(new Question(q.id, q.label, q.answer))
                        }
                        qso.length = qso.questions.length
                    })
                    module.add(qso)
                }
                modules.push(module)
            }
            if (!mainUser.admin) {
                fetch(root + `/GetProgressByStudentEmail/${mainUser.email}`)
                .then(res => res.json())
                .then(data => {
                    let unlockedModules = [1]
                    for (let l in data) {
                        if (!(data[l].module_id in unlockedModules)) {
                            unlockedModules.push(data[l].module_id)
                        }
                    }
                    console.log(unlockedModules)
                    modules = modules.filter(m => unlockedModules.some(u => u === m.id))
                    linkModules(modules)
                    setModuleDatabase(modules)
                })
            } else {
                linkModules(modules)
                setModuleDatabase(modules)
            }
        })
    }

    function linkModules(modules) {
        if (modules.length !== 0) {
            let module = modules[0]
            let nextModuleIds = []
            fetch(root + `/GetNextModuleByCurrentId/${module.id}`)
            .then(res => res.json())
            .then(data => {
                for (let i in data) {
                    let link = data[i]
                    if (!(link.nextModule_Id in nextModuleIds)) {
                        nextModuleIds.push(link.nextModule_Id)
                    }
                }
                return nextModuleIds
            }).then(nextModuleIds => {
                for (let j in nextModuleIds) {
                    module.setNext(modules.find(m => m.id === nextModuleIds[j]))
                }
                linkModules(modules.slice(1))
            })
        } else {
            setModulesReady(true)
        }
    }

    function getComments() {
        fetch(root + "/GetAllComments")
        .then(res => res.json())
        .then(data => {
            setComments(data)
        })
    }

    const history = useHistory()

    const token = window.localStorage.getItem('jwt')

    const [mainUser, setMainUser] = useState(new User())
    const [userDatabase, setUserDatabase] = useState(undefined)
    const [questionDatabase, setQuestionDatabase] = useState(undefined)
    const [moduleDatabase, setModuleDatabase] = useState([new Module()])
    const [modulesReady, setModulesReady] = useState(false)

    const [page, setPage] = useState(1)
    const [showComments, setShowComments] = useState([])
    const [comments, setComments] = useState(undefined)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        if (mainUser.name !== undefined) {
            getUsers()
            getQuestionSets()
            getModules()
            getComments()
        }
    }, [mainUser])

    useEffect(() => {
        if (userDatabase !== undefined) {
            setShowComments(new Array(userDatabase.length).fill(false))
        }
    }, [userDatabase])

    useEffect(() => {
        if (userDatabase !== undefined) {
            usersReady = true;
        }
        if (questionDatabase !== undefined) {
            questionSetsReady = true;
        }
        if (comments !== undefined) {
            commentsReady = true;
        }
        if (!ready) {
            renderReady = usersReady && questionSetsReady && modulesReady && commentsReady
            setReady(renderReady)
        }
    }, [userDatabase, questionDatabase, moduleDatabase, comments, modulesReady])

    function changePage(pageId) {
        setPage(pageId)
    }

    function DynamicProfile() {
        let { name } = useParams()
        return (<Profile pendingUser={name} admin={mainUser.admin} />)
    }

    function DynamicQuestionDatabase() {
        let { id } = useParams()
        return (<QuestionSetComponent questionSet = {questionDatabase.find(e => e.id === parseInt(id))} />)
    }
    
    function DynamicModule() {
        let { id } = useParams()
        return <KnowledgePoint module={moduleDatabase.find(m => m.id === parseInt(id)).questionSetList} admin={mainUser.admin} />
    }
    
    function DynamicQuiz() {
        let { id } = useParams()
        return <Quiz questionSet={questionDatabase.find(qs => qs.id === parseInt(id))} email={mainUser.email} qsetId={id} />
    }

    function DynamicComments() {
        let { name } = useParams()
        return <Comments name={name} commentList={comments.filter(c => (c.studuent_Receiver === name || c.teacher_Sender === name))} /> // Intentional Misspelling
    }

    function toggleComment(id) {
        setShowComments([...showComments.slice(0, id), !showComments[id], ...showComments.slice(id+1)])
    }

    function addComment(comment, user) {
        fetch(root + "/Communication", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "Teacher_Sender":`${mainUser.email}`,
                "Student_Receiver":`${user.name}`,
                "Text":`${comment}`
            })
        }).then(alert("Comment sent!"))
    }  

    return (
        <Router>
            {(ready) && 
            <>
                <Header />
                <Route path='/app' render={(props) => (
                    <>
                        <Panel admin={mainUser.admin} onClick={changePage} />
                        {(page === 0) && <Profile pendingUser = {mainUser} admin={mainUser.admin} />}
                        {(page === 1 && mainUser.admin) && <UserDatabaseComponent
                            database={userDatabase}
                            toggleComment={toggleComment}
                            showComments={showComments}
                            addComment={addComment}
                        />}
                        {(page === 2 && mainUser.admin) && <QuestionDatabaseComponent modules={moduleDatabase} questionSets={questionDatabase} />}
                        {(page === 1 && !mainUser.admin) && <LearningTree modules={moduleDatabase} />}
                        {(page === 2 && !mainUser.admin) && <UserDatabaseComponent
                            database={userDatabase}
                            toggleComment={toggleComment}
                            showComments={showComments}
                            addComment={addComment}
                        />}
                    </>
                )} />
                <Switch>
                    <Route path='/user/:name' children={<DynamicProfile />} />
                    <Route path='/qset/:id' children={<DynamicQuestionDatabase />} />
                    <Route path="/kp/:id" children={<DynamicModule />} />
                    <Route path="/quiz/:id" children={<DynamicQuiz />} />
                    <Route path="/comments/:name" children={<DynamicComments />} />
                </Switch>
                <Footer />
            </>
            }
        </Router>
    )
}

export default App
