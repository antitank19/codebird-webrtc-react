import { Join } from "../components/CreateButton";

export const Home = () => {
    return (
        <div className="App flex items-center justify-center w-screen h-screen">
            <div className="container ">
                <div className="row flex items-center justify-center">
                    <Join/>
                     {/* className="flex items-center justify-center" /> */}
                </div>
                <div className="row flex items-center justify-center">
                    <Join roomId={1} />
                    <Join roomId={2} />
                    <Join roomId={3} />
                    <Join roomId={4} />
                </div>

            </div>
        </div>
    );
};
