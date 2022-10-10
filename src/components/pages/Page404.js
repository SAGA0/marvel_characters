import ErrorMessage from "../errorMessage/ErrorMessage"
import { Helmet } from "react-helmet";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content={`Something went wrong`}
                />
                <title>Error Page</title>
            </Helmet>
            <ErrorMessage />

        </div>
    )
}

export default Page404