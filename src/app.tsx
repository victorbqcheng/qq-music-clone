import { observer } from "mobx-react-lite"
import Page1 from "./Page1/Page1"
import Page2 from "./Page2/Page2"
import stateStore from "./store/stateStore"


const App = observer(() => {
    return (
        <div>
            <Page1 /> 
            {stateStore.mountPage2 && <Page2 />}     {/*防止程序启动时Page2渐隐*/}
        </div>
    )
});

export default App