import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SinglePage'));
const Page404 = lazy(() => import('../pages/Page404'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));





const App = () => {


    return (
        <Router>
            <div className="app">
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route element={<AppHeader />}>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage />} />
                                <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
                                <Route path="/character/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
                                <Route path="*" element={< Page404 />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router >
    )
}

export default App;