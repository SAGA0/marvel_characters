
import ComicsList from "../comicsList/ComicsList";
import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel Comics Page"
                />
                <title>Marvel Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage

