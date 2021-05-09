import React, {Component} from "react"
import Layout from "./hoc/Layout/Layout";
import Quiz from "./Containers/Quiz/Quiz";
import {Switch,Route} from "react-router-dom"
import Auth from "./Containers/Auth/Auth";
import QuizCreate from "./Containers/QuizCreate/QuizCreate";
import QuizList from "./Containers/QuizList/QuizList";

class App extends Component {
  render() {
    return (
        <Layout>
          <Switch>
              <Route path={"/auth"} component={Auth}/>
              <Route path={"/quiz-create"} component={QuizCreate}/>
              <Route path={"/quiz/:id"} component={Quiz}/>
              <Route path={"/"} component={QuizList}/>

          </Switch>
        </Layout>
    )
  }
}


export default App;
