import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const Page404 = lazy(() => import('../pages/Page404'));





const App = () => {


    return (
        <Router>
            <div className="app">
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route element={<AppHeader />}>
                                <Route path="/" element={<MainPage />} />
                                <Route element={<AppBanner />}>
                                    <Route path="/comics" element={<ComicsPage />} />
                                    <Route path="/comics/:comicId" element={<SingleComicPage />} />
                                </Route>
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