import { Switch, Route } from 'react-router-dom';
import { view as Demo2 } from './features/demo2';
import { view as Demo3 } from './features/demo3';
import { view as Demo4 } from './features/demo4';
import { view as Demo5 } from './features/demo5';
import { view as Demo6 } from './features/demo6';
import { view as Demo7 } from './features/demo7';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Demo3} />
            <Route path='/demo/threedemo2' component={Demo2} />
            <Route path='/demo/threedemo3' component={Demo3} />
            <Route path='/demo/threedemo4' component={Demo4} />
            <Route path='/demo/threedemo5' component={Demo5} />
            <Route path='/demo/threedemo6' component={Demo6} />
            <Route path='/demo/threedemo7' component={Demo7} />
        </Switch>
    );
};

export default Routes;