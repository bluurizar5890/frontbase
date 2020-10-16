import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Configuration from './Configuration';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";

//import '../../../app.scss';

class AdminLayout extends Component {
    constructor(props) {
        super(props);
        console.log("Props en constructor", props);
    }
    state = {
        logged: false,
        cargado: false
    };
    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };
    componentDidMount() {
        this.setState({ ...this.state, logged: this.props.logged });
        console.log("componentDidMount", this.props.logged);
    }
    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount", this.props.logged);
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onUNSAFE_componentWillMount();
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onUNSAFE_componentWillMount();
        }
    }

    render() {
        console.log(this.props);

        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        let mainClass = ['pcoded-wrapper'];
        if (this.props.layout === 'horizontal' && this.props.subLayout === 'horizontal-2') {
            mainClass = [...mainClass, 'container'];
        }
        return (

            <Aux>
                {
                    this.props.logged !=false &&

                    <Fullscreen enabled={this.props.isFullScreen}>
                        <Navigation />
                        <NavBar />
                        <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                            <div className={mainClass.join(' ')}>
                                <div className="pcoded-content">
                                    <div className="pcoded-inner-content">
                                        <Breadcrumb menu={this.props.menu || []} />
                                        <div className="main-body">
                                            <div className="page-wrapper">
                                                <Suspense fallback={<Loader />}>
                                                    <Switch>
                                                        {
                                                            this.props.logged === true ?
                                                                <>
                                                                    {menu}
                                                                </>
                                                                : <>
                                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                                </>
                                                        }
                                                        {/* {menu}
                                                     <Redirect from="/" to={this.props.defaultPath} /> */}
                                                    </Switch>
                                                </Suspense>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Configuration />
                    </Fullscreen>
                }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        layout: state.layout,
        subLayout: state.subLayout,
        menu: state.menu,
        logged: state.logged
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
        onUNSAFE_componentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(AdminLayout));
